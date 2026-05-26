// src/utils/tokenBlacklist.ts
class TokenBlacklist {
  private blacklist: Set<string> = new Set();

  add(token: string): void {
    this.blacklist.add(token);
  }

  has(token: string): boolean {
    return this.blacklist.has(token);
  }

  // Optional: Clean up expired tokens (you can call this periodically)
  remove(token: string): void {
    this.blacklist.delete(token);
  }
}

// Export singleton
export const tokenBlacklist = new TokenBlacklist();