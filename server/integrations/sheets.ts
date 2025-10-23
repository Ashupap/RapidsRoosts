import { google } from 'googleapis';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-sheet',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Google Sheet not connected');
  }
  return accessToken;
}

export async function getUncachableGoogleSheetClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.sheets({ version: 'v4', auth: oauth2Client });
}

// Persistent storage for spreadsheet ID
const SHEET_ID_FILE = join(process.cwd(), '.sheet_id');
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || '';

function loadPersistedSheetId(): string | null {
  try {
    if (existsSync(SHEET_ID_FILE)) {
      return readFileSync(SHEET_ID_FILE, 'utf-8').trim();
    }
  } catch (error) {
    console.error('Failed to read persisted sheet ID:', error);
  }
  return null;
}

function persistSheetId(sheetId: string): void {
  try {
    writeFileSync(SHEET_ID_FILE, sheetId, 'utf-8');
    console.log('✓ Spreadsheet ID persisted to', SHEET_ID_FILE);
  } catch (error) {
    console.error('Failed to persist sheet ID:', error);
  }
}

export async function ensureSheetExists() {
  try {
    // First priority: environment variable
    if (SPREADSHEET_ID) {
      console.log('✓ Using GOOGLE_SHEET_ID from environment:', SPREADSHEET_ID);
      return SPREADSHEET_ID;
    }

    // Second priority: persisted file
    const persistedId = loadPersistedSheetId();
    if (persistedId) {
      console.log('✓ Using persisted spreadsheet ID:', persistedId);
      return persistedId;
    }

    // Last resort: create new spreadsheet
    const sheets = await getUncachableGoogleSheetClient();
    
    const response = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: 'Rapids Roosts Dandeli Bookings',
        },
        sheets: [
          {
            properties: {
              title: 'Bookings',
            },
          },
        ],
      },
    });

    const newSpreadsheetId = response.data.spreadsheetId;
    
    if (!newSpreadsheetId) {
      throw new Error('Failed to create spreadsheet');
    }

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 NEW GOOGLE SPREADSHEET CREATED');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Spreadsheet ID:', newSpreadsheetId);
    console.log('');
    console.log('✓ This ID has been automatically saved to:', SHEET_ID_FILE);
    console.log('✓ Bookings will now persist across server restarts!');
    console.log('');
    console.log('📝 Optional: You can also set GOOGLE_SHEET_ID in Secrets');
    console.log('   to override the auto-saved ID.');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Persist the ID for future restarts
    persistSheetId(newSpreadsheetId);

    // Set headers
    await sheets.spreadsheets.values.update({
      spreadsheetId: newSpreadsheetId,
      range: 'Bookings!A1:L1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          'ID',
          'Booking ID',
          'Customer Name',
          'Customer Email',
          'Customer Phone',
          'Activity Type',
          'Check-in Date',
          'Check-out Date',
          'Number of Guests',
          'Special Requests',
          'Status',
          'Created At'
        ]],
      },
    });

    return newSpreadsheetId;
  } catch (error) {
    console.error('Error ensuring sheet exists:', error);
    throw error;
  }
}

export async function appendBooking(booking: {
  id: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  activityType: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  specialRequests: string;
  status: string;
  createdAt: Date;
}) {
  try {
    const sheets = await getUncachableGoogleSheetClient();
    const spreadsheetId = await ensureSheetExists();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Bookings!A:L',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          booking.id,
          booking.bookingId,
          booking.customerName,
          booking.customerEmail,
          booking.customerPhone,
          booking.activityType,
          booking.checkInDate,
          booking.checkOutDate,
          booking.numberOfGuests,
          booking.specialRequests || '',
          booking.status,
          booking.createdAt.toISOString()
        ]],
      },
    });

    console.log('Booking appended to sheet:', booking.bookingId);
  } catch (error) {
    console.error('Error appending booking to sheet:', error);
    throw error;
  }
}

export async function getBookingByBookingId(bookingId: string) {
  try {
    const sheets = await getUncachableGoogleSheetClient();
    const spreadsheetId = await ensureSheetExists();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Bookings!A:L',
    });

    const rows = response.data.values || [];
    
    if (rows.length <= 1) {
      return null;
    }

    // Find the row with matching booking ID (column B, index 1)
    const bookingRow = rows.slice(1).find(row => row[1] === bookingId);

    if (!bookingRow) {
      return null;
    }

    return {
      id: bookingRow[0],
      bookingId: bookingRow[1],
      customerName: bookingRow[2],
      customerEmail: bookingRow[3],
      customerPhone: bookingRow[4],
      activityType: bookingRow[5],
      checkInDate: bookingRow[6],
      checkOutDate: bookingRow[7],
      numberOfGuests: parseInt(bookingRow[8]) || 0,
      specialRequests: bookingRow[9] || '',
      status: bookingRow[10] || 'pending',
      createdAt: new Date(bookingRow[11]),
    };
  } catch (error) {
    console.error('Error getting booking from sheet:', error);
    throw error;
  }
}
