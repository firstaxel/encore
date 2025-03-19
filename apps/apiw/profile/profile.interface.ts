export interface ProfileResponse {
  /** Indicates if the request was successful */
  success: boolean;
  /** Error message if the request was not successful */
  message?: string;
  /** User data */
  result?: string | number | PrismaProfile;
}

export interface Response {
  /** Indicates if the request was successful */
  success: boolean;
  /** Error message if the request was not successful */
  message?: string;
  /** The result of the request */
  result?: string | number;
}

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Expert';

export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  freelancerProfile?: UserProfile | null;
};

export type UserProfile = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  bio?: string;

  skills: string[];
  experienceLevel: ExperienceLevel;
  portfolio?: string[];

  hourlyRate?: number;
  categories: string[];
  availability: boolean;
  location?: string;
  languages: string[];

  rating: number;
  reviewsCount: number;

  isVerified: boolean;
  socialLinks?: string[];

  createdAt: Date;
};

export type PrismaUser = {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  freelancerProfile?: PrismaProfile | null;
};

// Freelancer Profile Type
export type PrismaProfile = {
  id: string;
  userId: string;
  user?: User; // Optional to avoid circular dependency

  fullName: string;
  phone: string | null;
  bio: string | null;

  skills: string[] | null;
  experienceLevel: ExperienceLevel;
  portfolio: string[] | null;

  hourlyRate: number | null;
  categories: string[] | null;
  availability: boolean;
  location?: string | null;
  languages: string[] | null;

  rating: number;
  reviewsCount: number;

  isVerified: boolean;
  socialLinks?: string[] | null;

  createdAt: Date;
  updatedAt: Date;
};
