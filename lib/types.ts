export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  address?: string;
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
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
}
