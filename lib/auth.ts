import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { createAuthMiddleware, APIError } from "better-auth/api";
import {
  admin as adminPlugin,
  username as usernamePlugin,
} from "better-auth/plugins";
import { sendEmail } from "./send-email";

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
      // socials: {
      //   type: "",
      //   defaultValue: null,
      // },
      instagram: { type: "string", defaultValue: "" },
      facebook: { type: "string", defaultValue: "" },
      linkedin: { type: "string", defaultValue: "" },
      // github: { type: "string", defaultValue: "" },
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
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb; color: #111827;">
        <h2 style="color: #4f46e5;">Reset your password</h2>
        <p style="font-size: 16px;">Click the button below to reset your password:</p>
        <a href="${url}" 
           style="display: inline-block; margin-top: 12px; padding: 12px 20px; background-color: #4f46e5; color: #fff; text-decoration: none; border-radius: 6px;">
          Reset Password
        </a>
        <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
          Or copy and paste this URL into your browser:<br/>
          <a href="${url}">${url}</a>
        </p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #e5e7eb;" />
        <p style="font-size: 12px; color: #9ca3af;">If you did not request this, you can safely ignore this email.</p>
      </div>
    `,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }, request) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}profileComplete`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
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
