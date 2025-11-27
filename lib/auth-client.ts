import { createAuthClient } from "better-auth/react";
import {
  adminClient,
  usernameClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,

  plugins: [
    adminClient(),
    usernameClient(),
    inferAdditionalFields({
      user: {
        graduationYear: {
          type: "number",
          defaultValue: null,
        },
        address: {
          type: "string",
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
        status: {
          type: "string",
          defaultValue: "pending",
        },
        phone: {
          type: "string",
          defaultValue: null,
        },
        imageKey: {
          type: "string",
          defaultValue: null,
        },
      },
    }),
  ],
});
