import { type User, type InsertUser, type Booking, type InsertBooking, bookings, users } from "@shared/schema";
import { randomUUID } from "crypto";
import { customAlphabet } from "nanoid";
import { db } from "./db";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

// Generate alphanumeric booking IDs
const generateBookingId = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingByBookingId(bookingId: string): Promise<Booking | null>;
  getAllBookings(): Promise<Booking[]>;
  updateBookingStatus(bookingId: string, status: string): Promise<Booking | null>;
}

export class PostgresStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const user: User = { ...insertUser, id, password: hashedPassword };
    await db.insert(users).values(user);
    return user;
  }

  async verifyPassword(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (!user) {
      return null;
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return null;
    }
    
    return user;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const bookingId = `RRD-${generateBookingId()}`;
    const createdAt = new Date();
    
    const booking: Booking = {
      ...insertBooking,
      id,
      bookingId,
      status: "pending",
      createdAt,
      specialRequests: insertBooking.specialRequests || null,
    };

    try {
      await db.insert(bookings).values(booking);
      return booking;
    } catch (error) {
      console.error('Database error creating booking:', error);
      throw new Error('Failed to create booking in database');
    }
  }

  async getBookingByBookingId(bookingId: string): Promise<Booking | null> {
    const result = await db.select().from(bookings).where(eq(bookings.bookingId, bookingId));
    return result[0] || null;
  }

  async getAllBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async updateBookingStatus(bookingId: string, status: string): Promise<Booking | null> {
    try {
      const result = await db
        .update(bookings)
        .set({ status })
        .where(eq(bookings.bookingId, bookingId))
        .returning();
      return result[0] || null;
    } catch (error) {
      console.error('Database error updating booking status:', error);
      throw new Error('Failed to update booking status in database');
    }
  }
}

export const storage = new PostgresStorage();
