/**
 * Represents user data within the application.
 *
 * @remarks
 * The `User` interface is designed to capture a broad range of user-related information in a realistic and complex
 * structure. It includes standard user identifiers, personal information, and nested objects to reflect real-world
 * data modeling scenarios.
 */
export interface User {
  id: string;
  name?: string | null;
  email: string;
  password: string;
  isActive: boolean;
  age?: number;
  tags: string[];
  profile: {
    bio: string;
    url?: string | null;
    social: {
      facebook?: string;
      instagram?: string;
    };
  };
  createdAt: Date;
  updatedAt?: Date | null;
  metadata?: {
    lastLogin: Date | null;
    preferences?: {
      notifications: boolean;
    };
  };
}
