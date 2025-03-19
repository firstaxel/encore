CREATE TYPE "public"."ExperienceLevel" AS ENUM('Beginner', 'Intermediate', 'Expert');--> statement-breakpoint
CREATE TABLE "Profile" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"fullName" text NOT NULL,
	"phone" text,
	"bio" text,
	"skills" text[] NOT NULL,
	"experienceLevel" "ExperienceLevel" NOT NULL,
	"portfolio" text[],
	"hourlyRate" double precision,
	"categories" text[] NOT NULL,
	"availability" boolean DEFAULT true NOT NULL,
	"location" text,
	"languages" text[] NOT NULL,
	"rating" double precision DEFAULT 0 NOT NULL,
	"reviewsCount" integer DEFAULT 0 NOT NULL,
	"isVerified" boolean DEFAULT false NOT NULL,
	"socialLinks" text[],
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY NOT NULL,
	"stackId" text NOT NULL,
	"email" text NOT NULL,
	"username" text NOT NULL,
	"createdAt" timestamp (3) DEFAULT now() NOT NULL,
	"updatedAt" timestamp (3) NOT NULL
);
