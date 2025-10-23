import { google } from 'googleapis';

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
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=google-mail',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Gmail not connected');
  }
  return accessToken;
}

export async function getUncachableGmailClient() {
  const accessToken = await getAccessToken();

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: accessToken
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

export async function sendBookingConfirmation(
  to: string,
  bookingId: string,
  customerName: string,
  activityType: string,
  checkInDate: string,
  checkOutDate: string,
  numberOfGuests: number
) {
  try {
    const gmail = await getUncachableGmailClient();
    
    const subject = `Booking Confirmation - Rapids Roosts Dandeli - ${bookingId}`;
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: 'Open Sans', Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #2F5D62 0%, #3A95A9 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .header h1 { margin: 0; font-family: 'Montserrat', sans-serif; font-size: 28px; }
            .content { background: #F7F7F7; padding: 30px; border-radius: 0 0 8px 8px; }
            .booking-id { background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 2px dashed #2F5D62; }
            .booking-id strong { font-family: 'Courier New', monospace; font-size: 24px; color: #2F5D62; }
            .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .details h3 { color: #2F5D62; margin-top: 0; font-family: 'Montserrat', sans-serif; }
            .detail-row { padding: 8px 0; border-bottom: 1px solid #eee; }
            .detail-row:last-child { border-bottom: none; }
            .detail-label { font-weight: 600; color: #7A5C3A; }
            .status-badge { background: #7A5C3A; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-size: 14px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .button { display: inline-block; background: #1ABC9C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏞️ Rapids Roosts Dandeli</h1>
              <p>Adventure Awaits!</p>
            </div>
            <div class="content">
              <h2 style="color: #2F5D62; font-family: 'Montserrat', sans-serif;">Booking Received Successfully!</h2>
              <p>Dear ${customerName},</p>
              <p>Thank you for choosing Rapids Roosts Dandeli for your adventure! We're excited to host you in the beautiful wilderness of Karnataka.</p>
              
              <div class="booking-id">
                <p style="margin: 0 0 10px 0; color: #7A5C3A;">Your Booking ID</p>
                <strong>${bookingId}</strong>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">Save this ID to track your booking status</p>
              </div>

              <div style="text-align: center; margin: 20px 0;">
                <span class="status-badge">⏳ Pending Confirmation</span>
              </div>

              <div class="details">
                <h3>Booking Details</h3>
                <div class="detail-row">
                  <span class="detail-label">Activity:</span> ${activityType.charAt(0).toUpperCase() + activityType.slice(1).replace(/-/g, ' ')}
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-in Date:</span> ${checkInDate}
                </div>
                <div class="detail-row">
                  <span class="detail-label">Check-out Date:</span> ${checkOutDate}
                </div>
                <div class="detail-row">
                  <span class="detail-label">Number of Guests:</span> ${numberOfGuests}
                </div>
              </div>

              <div style="background: #E8F4F5; border-left: 4px solid #3A95A9; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <h4 style="margin-top: 0; color: #2F5D62;">What happens next?</h4>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>Our team will review your booking details</li>
                  <li>You'll receive a confirmation email within 24 hours</li>
                  <li>Check your booking status anytime using your Booking ID</li>
                </ul>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}/status` : 'https://your-domain.com/status'}" class="button">
                  Track Your Booking Status
                </a>
              </div>

              <p>If you have any questions or need to make changes to your booking, please don't hesitate to contact us.</p>
              
              <p>We look forward to providing you with an unforgettable adventure!</p>
              
              <p style="margin-top: 30px;">
                Best regards,<br>
                <strong>The Rapids Roosts Dandeli Team</strong>
              </p>
            </div>
            <div class="footer">
              <p>Rapids Roosts Dandeli | Dandeli, Karnataka, India</p>
              <p>Email: info@rapidsroosts.com | Phone: +91 XXXXXXXXXX</p>
              <p style="font-size: 12px; color: #999;">This is an automated email. Please do not reply to this message.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const textBody = `
Rapids Roosts Dandeli - Booking Confirmation

Dear ${customerName},

Thank you for choosing Rapids Roosts Dandeli for your adventure!

Your Booking ID: ${bookingId}
Status: Pending Confirmation

Booking Details:
- Activity: ${activityType.charAt(0).toUpperCase() + activityType.slice(1).replace(/-/g, ' ')}
- Check-in Date: ${checkInDate}
- Check-out Date: ${checkOutDate}
- Number of Guests: ${numberOfGuests}

What happens next?
- Our team will review your booking details
- You'll receive a confirmation email within 24 hours
- Check your booking status anytime using your Booking ID

Track your booking: ${process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}/status` : 'https://your-domain.com/status'}

Best regards,
The Rapids Roosts Dandeli Team

Rapids Roosts Dandeli | Dandeli, Karnataka, India
Email: info@rapidsroosts.com | Phone: +91 XXXXXXXXXX
    `;

    const message = [
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `To: ${to}`,
      `Subject: ${subject}`,
      '',
      htmlBody
    ].join('\n');

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log(`Booking confirmation email sent to ${to} for booking ${bookingId}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send confirmation email');
  }
}
