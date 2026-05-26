// src/utils/tokenBlacklist.ts
class TokenBlacklist {
    constructor() {
        this.blacklist = new Set();
    }
    add(token) {
        this.blacklist.add(token);
    }
    has(token) {
        return this.blacklist.has(token);
    }
    // Optional: Clean up expired tokens (you can call this periodically)
    remove(token) {
        this.blacklist.delete(token);
    }
}
// Export singleton
export const tokenBlacklist = new TokenBlacklist();
