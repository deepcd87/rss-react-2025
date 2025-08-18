import '@/styles/globals.css';
import { QueryClientProviderWrapper } from '@/components/QueryClientProvider/QueryClientProvider';
import { ThemeProvider } from '@/context/ThemeProvider';
import { ThemeManager } from '@/components/ThemeManager/ThemeManager';
import HeaderWrapper from '@/components/Header/HeaderWrapper';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <QueryClientProviderWrapper>
            <ThemeProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </ThemeProvider>
          </QueryClientProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="appContainer">
      <ThemeManager />
      <HeaderWrapper />
      <main role="main">{children}</main>
    </div>
  );
}
