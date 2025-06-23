import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { createAuthMiddleware, APIError } from "better-auth/api";
import {
  admin as adminPlugin,
  username as usernamePlugin,
} from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      graduationYear: {
        type: "number",
        defaultValue: null,
      },
      department: {
        type: "string",
        defaultValue: null,
      },
      currentCompany: {
        type: "string",
        defaultValue: null,
      },
      jobTitle: {
        type: "string",
        defaultValue: null,
      },
      address: {
        type: "string",
        defaultValue: null,
      },
      phone: {
        type: "string",
        defaultValue: null,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  rateLimit: {
    window: 60, // time window in seconds
    max: 10,
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const userSecret = ctx.body?.secret;
        const envSecret = process.env.INTERNAL_SECRET;

        if (!userSecret || userSecret !== envSecret) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid or missing company secret code.",
          });
        }
      }
    }),
  },
  plugins: [adminPlugin(), usernamePlugin()],
});
