import type { ReactNode } from "react";

export const metadata = {
  title: "PiArt Exchange",
  description: "Fixed-price NFT marketplace for physical fine art on Pi Network"
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
