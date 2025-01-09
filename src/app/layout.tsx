import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header/Header";
import { SessionProviderWrapper } from "@/context/session-provider";

export const metadata: Metadata = {
  title: "Ideas Generator",
  description: "Generate new ideas for your projects",
};

const inter = Inter({
  weight: ['400', '500', '600'],
  style: 'normal',
  display: 'swap',
  subsets: ['latin-ext']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico"  />
      </head>
      <body
        className={`${inter.className}  antialiased`}
      >
        <SessionProviderWrapper>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen sm:px-4">
              <Header />
              {children}
              <div className="text-center mt-6 border-t border-border shadow">
                <h1 className="text-muted-foreground py-2">Desgined by Valentino Copperi</h1>
              </div>
            </div>
            <Toaster />
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
