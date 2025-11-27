export interface IStorage {
  // Minimal storage interface for informational website
  // No database operations needed - site is purely informational
}

export class MemStorage implements IStorage {
  // In-memory storage for any future needs
  // Currently the website is purely informational with no data persistence
}

export const storage = new MemStorage();
