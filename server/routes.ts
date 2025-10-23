import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";
import { sendBookingConfirmation } from "./integrations/gmail";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create a new booking
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      
      const booking = await storage.createBooking(validatedData);
      
      // Send confirmation email asynchronously
      sendBookingConfirmation(
        booking.customerEmail,
        booking.bookingId,
        booking.customerName,
        booking.activityType,
        booking.checkInDate,
        booking.checkOutDate,
        booking.numberOfGuests
      ).catch(error => {
        console.error('Failed to send confirmation email:', error);
      });

      res.json({ bookingId: booking.bookingId });
    } catch (error) {
      console.error('Error creating booking:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to create booking' });
      }
    }
  });

  // Get booking by booking ID
  app.get("/api/bookings/:bookingId", async (req, res) => {
    try {
      const { bookingId } = req.params;
      
      const booking = await storage.getBookingByBookingId(bookingId);
      
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      res.json(booking);
    } catch (error) {
      console.error('Error fetching booking:', error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to fetch booking' });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
