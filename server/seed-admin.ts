import { storage } from "./storage";

async function seedAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await storage.getUserByUsername("admin");
    
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Create default admin user
    // In production, this password should be hashed
    await storage.createUser({
      username: "admin",
      password: "admin123" // CHANGE THIS IN PRODUCTION!
    });

    console.log("Admin user created successfully");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("IMPORTANT: Change this password in production!");
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
  process.exit(0);
}

seedAdmin();
