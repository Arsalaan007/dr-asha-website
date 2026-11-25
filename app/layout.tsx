import type { Metadata, Viewport } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/dm-serif-display";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Asha Menon — Back, Neck & Joint Pain Specialist | McKenzie Clinic Mumbai",
  description:
    "Certified McKenzie Clinic in Mira Road and Juhu, Mumbai. Non-surgical treatment for back, neck and joint pain by Dr. Asha Menon (P.T.), Dip. MDT.",
};

export const viewport: Viewport = {
  themeColor: "#0b2a3c",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
