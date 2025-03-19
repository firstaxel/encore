import { relations } from 'drizzle-orm';
import {
  boolean,
  customType,
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const customBytes = customType<{ data: Buffer }>({
  dataType() {
    return 'bytea';
  },
  fromDriver(value: unknown) {
    if (Buffer.isBuffer(value)) {
      return value;
    }
    throw new Error('Expected Buffer');
  },
  toDriver(value: Buffer) {
    return value;
  },
});

export const experienceLevelEnum = pgEnum('ExperienceLevel', [
  'Beginner',
  'Intermediate',
  'Expert',
]);

export const users = pgTable('User', {
  id: text('id').primaryKey(),
  stackId: text('stackId').notNull(),
  email: text('email').notNull(),
  username: text('username').notNull(),
  createdAt: timestamp('createdAt', { mode: 'date', precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date', precision: 3 }).notNull(),
});

export const profiles = pgTable('Profile', {
  id: text('id').primaryKey(),
  userId: text('userId').notNull(),
  fullName: text('fullName').notNull(),
  phone: text('phone'),
  bio: text('bio'),
  skills: text('skills').array().notNull(),
  experienceLevel: experienceLevelEnum('experienceLevel').notNull(),
  portfolio: text('portfolio').array(),
  hourlyRate: doublePrecision('hourlyRate'),
  categories: text('categories').array().notNull(),
  availability: boolean('availability').default(true).notNull(),
  location: text('location'),
  languages: text('languages').array().notNull(),
  rating: doublePrecision('rating').default(0).notNull(),
  reviewsCount: integer('reviewsCount').default(0).notNull(),
  isVerified: boolean('isVerified').default(false).notNull(),
  socialLinks: text('socialLinks').array(),
  createdAt: timestamp('createdAt', { mode: 'date', precision: 3 })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date', precision: 3 })
    .notNull()
    .$onUpdateFn(() => new Date()),
});

export const usersRelations = relations(users, (helpers) => ({
  freelancerProfile: helpers.one(profiles),
}));

export const profilesRelations = relations(profiles, (helpers) => ({
  user: helpers.one(users, {
    relationName: 'ProfileToUser',
    fields: [profiles.userId],
    references: [users.stackId],
  }),
}));
