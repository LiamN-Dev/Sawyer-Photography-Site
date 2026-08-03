import "./globals.css";

export const metadata = {
  title: "Studio Portal | Photography Services",
  description: "Book photography sessions and manage appointments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-white/20">{children}</body>
    </html>
  );
}
