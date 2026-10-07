import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Restaurant Waitlist",
  description: "A simple starting point for your restaurant waitlist.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <title>Restaurant Waitlist</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
