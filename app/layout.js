// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/utils/Navbar";
import ChakraWrapper from "./components/utils/ChakraWrapper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import ClientSessionWrapper from "./components/utils/ClientSessionWrapper"; // Import the client wrapper

export const metadata = {
  title: "adityamms",
  description: "Personal portfolio website adityamms",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientSessionWrapper>
          {" "}
          {/* Use client-side session wrapper */}
          <ThemeProvider theme={theme}>
            <ChakraWrapper>
              <Navbar />
              <div className="lg:py-16 lg:px-[150px] p-4">{children}</div>
            </ChakraWrapper>
          </ThemeProvider>
        </ClientSessionWrapper>
      </body>
    </html>
  );
}
