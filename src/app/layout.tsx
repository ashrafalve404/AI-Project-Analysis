import type { Metadata } from 'next';
import '@/app/globals.css';
import '@/lib/appInit';

export const metadata: Metadata = {
  title: 'AI Client Project Assistant - Transform Client Requirements into Action',
  description: 'The intelligent project management tool that uses AI to summarize requirements, extract tasks, identify risks, and generate project notes.',
  keywords: ['AI', 'project management', 'client requirements', 'task extraction', 'agency tool'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}