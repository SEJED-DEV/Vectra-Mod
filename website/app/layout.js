import "./globals.css";

export const metadata = {
  title: "Vectra Mod Documentation",
  description: "Next-generation moderation infrastructure for high-concurrency environments.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
