// components/utils/ClientSessionWrapper.js
"use client"; // Mark this file as a client component

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export default function ClientSessionWrapper({ children, session }) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
