export class User {
  constructor(id, username, email, passwordHash, role = 'user') {
    this.id = id;
    this.username = username;
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role; // e.g., 'user', 'admin'
  }
}