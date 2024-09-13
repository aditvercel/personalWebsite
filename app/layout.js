import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/utils/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "adityamms",
  description: "Personal portofolio website adityamms",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" class="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        <div className=" lg:py-16 lg:px-[150px] p-4">{children}</div>
      </body>
    </html>
  );
}
