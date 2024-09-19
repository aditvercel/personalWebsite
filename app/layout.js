import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/utils/Navbar";
import ChakraWrapper from "./components/utils/ChakraWrapper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "adityamms",
  description: "Personal portfolio website adityamms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <ChakraWrapper>
            <Navbar />
            <div className="lg:py-16 lg:px-[150px] p-4">{children}</div>
          </ChakraWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
