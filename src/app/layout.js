import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext"; // Importa il provider del contesto

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "CLEOPE | Fashion Party",
  description: "The Fashion Party in the City.",
  openGraph: {
    title: "CLEOPE | Fashion Party",
    description: "The Fashion Party in the City.",
    url: "https://cleope-sigma.vercel.app",
    type: "website",
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/myvibe-63d6d.appspot.com/o/29DicStory.PNG?alt=media&token=e10489c9-9447-42df-a9a5-f0c1a0c3bac4",
        width: 1200,
        height: 630,
        alt: "CLEOPE Fashion Party",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{overflowY:'scroll'}}
      >
        {/* Avvolgi il contenuto del layout con AuthProvider */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
