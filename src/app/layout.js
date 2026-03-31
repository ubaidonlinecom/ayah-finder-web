import "./globals.css";

export const metadata = {
  title: "Ayah Finder",
  description: "A premium Quran search tool for students of Hifz and researchers. Find matching ayat by Arabic words with instant search and normalization.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-cream-50 min-h-screen islamic-bg">
        {children}
      </body>
    </html>
  );
}
