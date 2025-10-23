import { type User, type InsertUser, type Booking, type InsertBooking } from "@shared/schema";
import { randomUUID } from "crypto";
import { nanoid } from "nanoid";
import { appendBooking, getBookingByBookingId } from "./integrations/sheets";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingByBookingId(bookingId: string): Promise<Booking | null>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private bookings: Map<string, Booking>;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const bookingId = `RRD-${nanoid(6).toUpperCase()}`;
    const createdAt = new Date();
    
    const booking: Booking = {
      ...insertBooking,
      id,
      bookingId,
      status: "pending",
      createdAt,
    };

    this.bookings.set(bookingId, booking);

    // Also save to Google Sheets
    try {
      await appendBooking({
        ...booking,
        specialRequests: booking.specialRequests || '',
      });
    } catch (error) {
      console.error('Failed to save booking to Google Sheets:', error);
      // Continue even if Sheets save fails
    }

    return booking;
  }

  async getBookingByBookingId(bookingId: string): Promise<Booking | null> {
    // First try memory storage
    const memBooking = this.bookings.get(bookingId);
    if (memBooking) {
      return memBooking;
    }

    // Then try Google Sheets
    try {
      const sheetBooking = await getBookingByBookingId(bookingId);
      if (sheetBooking) {
        // Cache in memory for future requests
        this.bookings.set(bookingId, sheetBooking);
        return sheetBooking;
      }
    } catch (error) {
      console.error('Failed to get booking from Google Sheets:', error);
    }

    return null;
  }
}

export const storage = new MemStorage();
