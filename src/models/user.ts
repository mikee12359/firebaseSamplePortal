export class User {
  // Auth Given
  uid: string;
  anonymous: boolean;
  providers: string[];
  profileImageURL: string;
  email: string;
  emailVerified: boolean;
  name: string;
  refreshToken: string;

  // Server
  createdAt: number; // Timestamp
  updatedAt: number;

  // App Needs
  password: string;
  firstName: string;
  lastName: string;
  userName: string;
  isAdmin: boolean;
}