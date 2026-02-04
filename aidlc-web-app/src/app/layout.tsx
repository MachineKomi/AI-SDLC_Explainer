import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { ProgressProvider } from '@/context/ProgressContext';
import Sidebar from '@/components/Sidebar';
import GlobalKeyboardShortcuts from '@/components/GlobalKeyboardShortcuts';
import GlobalXPHeader from '@/components/GlobalXPHeader';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'AI-SDLC Explainer',
  description: 'Learn the AI-Driven Software Development Lifecycle methodology through interactive lessons, quizzes, and simulations.',
  keywords: ['AI-SDLC', 'AI-Driven Software Development Lifecycle', 'software development', 'methodology', 'AI engineering', 'learning'],
  authors: [{ name: 'AI-SDLC Community' }],
  openGraph: {
    title: 'AI-SDLC Explainer',
    description: 'Interactive learning platform for AI-Driven Software Development Lifecycle',
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
            <GlobalKeyboardShortcuts />
            <div className="flex min-h-screen">
              <Sidebar />
              <GlobalXPHeader />

              <main className="flex-1 w-full min-h-screen transition-all duration-300 md:pl-[80px] pt-16 md:pt-0">
                {children}
              </main>
            </div>
            <Toaster position="bottom-right" theme="dark" />
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
