import './globals.css';
import { Noto_Sans_JP, Kosugi_Maru } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollRestorer from '../components/ScrollRestorer';

const noto = Noto_Sans_JP({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const kosugi = Kosugi_Maru({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-rounded' });

export const metadata = {
  title: 'Sensee - 先生のための画像素材',
  description: '生成AIでつくる、安心して使える教育画像素材サイト',
  openGraph: {
    title: 'Sensee - 先生のための画像素材',
    description: '生成AIでつくる、安心して使える教育画像素材サイト',
    url: 'https://sensee.site',
    siteName: 'Sensee',
    images: [
      {
        url: 'https://sensee.site/logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${noto.variable} ${kosugi.variable}`}>
      <body className="font-sans text-gray-800">
        <ScrollRestorer />
        <Header />
        <main className="layout-main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}