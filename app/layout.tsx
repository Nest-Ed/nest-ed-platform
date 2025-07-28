// /app/layout.tsx
export const metadata = {
  title: 'Nest-Ed',
  description: 'AI-powered student learning',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
