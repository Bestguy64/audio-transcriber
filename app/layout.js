export const metadata = {
  title: "AudioScribe Free",
  description: "Transcribe audio using Groq",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
