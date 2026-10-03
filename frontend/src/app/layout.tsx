import type { Metadata } from "next";
import { Fraunces, Courier_Prime, Inter } from "next/font/google";
import "./globals.css";
import { PersonaProvider } from "@/components/layout/PersonaSwitcher";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier-prime",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://levelfolio.app"),
  title: {
    default: "Levelfolio — The Archive | Corporate LMS",
    template: "%s | Levelfolio",
  },
  description:
    "Levelfolio turns employee onboarding and compliance training into an interactive personal archive.",
  keywords: [
    "LMS",
    "Employee Onboarding",
    "Compliance Tracking",
    "The Archive",
    "Corporate Training",
  ],
  authors: [{ name: "Levelfolio Systems" }],
  creator: "Levelfolio",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://levelfolio.app",
    siteName: "Levelfolio",
    title: "Levelfolio — Learn it. File it. Level up.",
    description:
      "Corporate onboarding and compliance reimagined as a personal archive. Clear for admins, calm for managers, rewarding for everyone.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Levelfolio — The Archive",
    description:
      "Corporate onboarding and compliance training reimagined as a personal archive.",
    creator: "@levelfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${courierPrime.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-[var(--bg)] text-[var(--ink)] font-sans antialiased">
        <PersonaProvider>{children}</PersonaProvider>
      </body>
    </html>
  );
}