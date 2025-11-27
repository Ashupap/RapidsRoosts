import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      service: "Rapids & Roosts Dandeli - Informational Website"
    });
  });

  app.get("/api/contact-info", (req, res) => {
    res.json({
      phone: "+91 94839 40400",
      email: "info@rapidsroosts.com",
      address: "Dandeli, Karnataka, India - 581325",
      whatsapp: "https://wa.me/919483940400",
      social: {
        facebook: "https://facebook.com/rapidsroosts",
        instagram: "https://instagram.com/rapidsroosts",
        twitter: "https://twitter.com/rapidsroosts",
        youtube: "https://youtube.com/rapidsroosts"
      }
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
