export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  address?: string;
  imageKey?: string; // S3 object key for the profile image
  username: string;
  displayUsername: string;
  banned?: boolean; // default is false
  banReason?: string | null; // null if not banned
  banExpires?: Date | null; // null if not banned
  graduationYear?: number;
  department?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socials?: Record<string, any> | null; // or a more specific object type if known
  currentCompany?: string;
  jobTitle?: string;
  phone?: string;
  status?: string; // "pending", "approved", "rejected"
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
}
