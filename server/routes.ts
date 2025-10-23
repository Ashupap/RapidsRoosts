import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import passport from "passport";
import { storage } from "./storage";
import { insertBookingSchema } from "@shared/schema";
import { sendBookingConfirmation, sendStatusUpdateEmail } from "./integrations/gmail";

// Middleware to check if user is authenticated
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin authentication routes
  app.post("/api/admin/login", passport.authenticate("local"), (req, res) => {
    res.json({ success: true, user: req.user });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.json({ success: true });
    });
  });

  app.get("/api/admin/check", (req, res) => {
    res.json({ authenticated: req.isAuthenticated(), user: req.user });
  });

  // Get all bookings (admin only)
  app.get("/api/admin/bookings", isAuthenticated, async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching all bookings:', error);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  });

  // Update booking status (admin only)
  app.patch("/api/admin/bookings/:bookingId/status", isAuthenticated, async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { status } = req.body;

      if (!["pending", "confirmed", "rejected"].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const updatedBooking = await storage.updateBookingStatus(bookingId, status);
      
      if (!updatedBooking) {
        return res.status(404).json({ error: 'Booking not found' });
      }

      // Send status update email asynchronously
      sendStatusUpdateEmail(
        updatedBooking.customerEmail,
        updatedBooking.bookingId,
        updatedBooking.customerName,
        updatedBooking.status,
        updatedBooking.activityType,
        updatedBooking.checkInDate,
        updatedBooking.checkOutDate
      ).catch(error => {
        console.error('Failed to send status update email:', error);
      });

      res.json(updatedBooking);
    } catch (error) {
      console.error('Error updating booking status:', error);
      res.status(500).json({ error: 'Failed to update booking status' });
    }
  });

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
