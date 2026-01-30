import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { ProgressProvider } from '@/context/ProgressContext';
import Navigation from '@/components/Navigation';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'AI-DLC Explainer',
  description: 'Learn the AI-Driven Development Lifecycle methodology through interactive lessons, quizzes, and simulations.',
  keywords: ['AI-DLC', 'AI-SDLC', 'software development', 'methodology', 'AI engineering', 'learning'],
  authors: [{ name: 'AI-DLC Community' }],
  openGraph: {
    title: 'AI-DLC Explainer',
    description: 'Interactive learning platform for AI-Driven Development Lifecycle',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground min-h-screen selection:bg-accent-primary/30`}>
        <ThemeProvider>
          <ProgressProvider>
            <Navigation />
            <main className="relative z-0 min-h-screen pt-16">
              {children}
            </main>
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
