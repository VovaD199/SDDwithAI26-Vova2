import '../globals.css';
import { Box } from '@mui/material';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Mulish, Oswald } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ReactNode } from 'react';

import Footer from '~/components/Footer/Footer';
import ThemeProvider from '~/ds-components/theme/ThemeProvider';

import { styles } from './layout.styles';

import { routing } from '~/i18n/routing';
import EmotionProvider from '~/shared/components/emotion-provider/EmotionProvider';
import Header from '~/shared/components/Header/Header.server';
import { AudioPlayerProvider } from '~/shared/context/AudioPlayerContext';
import QueryProvider from '~/shared/providers/QueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const mulish = Mulish({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-mulish'
});

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
  variable: '--font-oswald'
});

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  setRequestLocale(lang);

  const t = await getTranslations('meta');
  const brand = t('brand');
  const metadataBase = new URL(process.env.CLIENT_BASE_URL || 'http://localhost:3000');

  return {
    metadataBase,
    title: {
      default: brand,
      template: `%s | ${brand}`
    },
    openGraph: {
      siteName: brand,
      title: {
        default: brand,
        template: `%s | ${brand}`
      }
    },
    twitter: {
      title: {
        default: brand,
        template: `%s | ${brand}`
      }
    }
  };
}

interface RootLayoutParams {
  readonly children: ReactNode;
  readonly params: Promise<{ readonly lang: Locale }>;
}

export default async function RootLayout({ children, params }: RootLayoutParams) {
  const { lang } = await params;
  if (!hasLocale(routing.locales, lang)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${mulish.variable} ${oswald.variable}`}>
        <EmotionProvider>
          <NextIntlClientProvider>
            <ThemeProvider>
              <QueryProvider>
                <AudioPlayerProvider>
                  <Box sx={styles.container}>
                    <Header />
                    <Box sx={styles.childrenBox}>{children}</Box>
                    <Footer />
                  </Box>
                </AudioPlayerProvider>
              </QueryProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </EmotionProvider>
      </body>
    </html>
  );
}
