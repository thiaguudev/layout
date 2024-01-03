import type { Metadata } from "next";

// import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Analytics } from "@/components/vercel-analytics";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import UserProvider from "@/components/user-provider";
import Script from "next/script";
import { DM_Sans } from "next/font/google";

export const metadata: Metadata = {
  title: "NPS",
  description: "NPS",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const fontSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["500"],
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <Analytics />
      <Script
        id="hotjar"
        dangerouslySetInnerHTML={{
          __html: `(function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:3812238,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
                  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
        }}
      />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>{children}</UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
