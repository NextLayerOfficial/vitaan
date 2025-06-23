export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  address?: string;
  username: string;
  displayUsername: string;
  banned?: boolean; // default is false
  banReason?: string;
  banExpires?: Date;
  graduationYear?: number;
  department?: string;
  socials?: Record<string, any>; // or a more specific object type if known
  currentCompany?: string;
  jobTitle?: string;
  phone?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
}
