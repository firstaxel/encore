import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const keys = () =>
  createEnv({
     server: {
      STACK_SERVER_SECRET_KEY: z.string().min(1),
    },
    client: {
      NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: z.string().min(1),
      NEXT_PUBLIC_STACK_PROJECT_ID: z.string().min(1),
      NEXT_PUBLIC_STACK_SIGN_IN_URL: z.string().min(1).startsWith('/'),
      NEXT_PUBLIC_STACK_SIGN_UP_URL: z.string().min(1).startsWith('/'),
      NEXT_PUBLIC_STACK_AFTER_SIGN_IN_URL: z.string().min(1).startsWith('/'),
      NEXT_PUBLIC_STACK_AFTER_SIGN_UP_URL: z.string().min(1).startsWith('/'),
    },
    runtimeEnv: {
      STACK_SERVER_SECRET_KEY: process.env.STACK_SERVER_SECRET_KEY,
      NEXT_PUBLIC_STACK_PROJECT_ID: process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
      NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY:
        process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
      NEXT_PUBLIC_STACK_SIGN_IN_URL: process.env.NEXT_PUBLIC_STACK_SIGN_IN_URL,
      NEXT_PUBLIC_STACK_SIGN_UP_URL: process.env.NEXT_PUBLIC_STACK_SIGN_UP_URL,
      NEXT_PUBLIC_STACK_AFTER_SIGN_IN_URL:
        process.env.NEXT_PUBLIC_STACK_AFTER_SIGN_IN_URL,
      NEXT_PUBLIC_STACK_AFTER_SIGN_UP_URL:
        process.env.NEXT_PUBLIC_STACK_AFTER_SIGN_UP_URL,
    },
  });
