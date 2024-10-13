// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/utils/Navbar";
import ChakraWrapper from "./components/utils/ChakraWrapper";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import ClientSessionWrapper from "./components/utils/ClientSessionWrapper"; // Import the client wrapper
import photosaya from "@/public/images/photo_saya.png";
export const metadata = {
  title: "Adityamms | Full-Stack Developer & Portfolio",
  description:
    "Explore the personal portfolio of Adityamms, a full-stack developer specializing in web development, Next.js, React, and Node.js. Check out projects, skills, and blog posts.",
  keywords:
    "Adityamms, portfolio, full-stack developer, web development, Next.js, React, JavaScript, Node.js, Frontend Developer",
  author: "Adityamms",
  robots: "index, follow",
  openGraph: {
    title:
      "Adityamms | Full-Stack Developer & Portfolio | Frontend Developer | Web Development",
    description:
      "Explore the portfolio of Adityamms, a skilled full-stack developer.",
    url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`, // Replace with your domain
    siteName: "Adityamms Portfolio",
    images: [
      {
        url: photosaya.src, // Use the imported photoSaya image for Open Graph
        width: 800,
        height: 600,
        alt: "Adityamms Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="QTiLHSrvnJ1_wkv_3q4mvRoCCCXAr9ubkKTRJ3z_bTM"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ClientSessionWrapper>
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
