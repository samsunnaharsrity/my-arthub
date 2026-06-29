import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({

  emailAndPassword: { 
        enabled: true, 
  },

    socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
    session: {
    expiresIn: 60 * 60 * 24 * 7, 
    updateAge: 60 * 60 * 24,
  },

user: {
  additionalFields: {
    role: {
      type: "string",
      required: false,
      defaultValue: "user",
    },
    planId: {
      type: "string",
      required: false,
      defaultValue: "user_free",
    },
  },
},

plugins: [admin]

});