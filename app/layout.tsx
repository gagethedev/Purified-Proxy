import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Purified",
  description: "The premier method for an unfiltered, untracked internet",
  openGraph: {
    title: "Purified",
    description: "The premier method for an unfiltered, untracked internet",
    url: "https://purified.lol",
    images: [
      {
        url: "/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Purified Logo",
      },
    ],
  },
};

const poppinsRegular = localFont({
  src: "./fonts/Poppins-Regular.ttf",
  variable: "--font-poppins-regular",
  weight: "500",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsRegular.variable} overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
