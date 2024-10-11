import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
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
          const user = { id: _id, name: userName };

          // If user is valid, return it to save in the JWT
          if (user) {
            return user;
          }

          return null;
        } catch (error) {
          console.error("Login error:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  // Other configurations...
});

export { handler as GET, handler as POST };
