import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // Import Google provider
import axios from "axios";
import { use } from "react";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          // Send credentials to the login API
          const res = await axios.post(
            `${process.env.NEXTAUTH_URL}/api/Login`,
            {
              userName: credentials.userName,
              password: credentials.password,
            }
          );
          // Get user data from the response
          const { userName, _id } = res.data.user;
          const user = { id: _id, name: userName, isAdmin: true };

          // If user is valid, return it to save in the JWT
          if (user) {
            console.log(user);
            return user;
          }

          return null;
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signOut: `${process.env.NEXTAUTH_URL}/cms`, // Redirect here after logout
    // Add custom sign-in page if necessary
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user exists, add it to the token
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      // Add the user ID to the session object
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  // Other configurations...
});

export { handler as GET, handler as POST };
