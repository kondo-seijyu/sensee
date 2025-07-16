import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_JP, Kosugi_Maru } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollRestorer from '../components/ScrollRestorer';

const noto = Noto_Sans_JP({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const kosugi = Kosugi_Maru({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-rounded' });

export const metadata: Metadata = {
  title: 'Sensee - 先生のための画像素材',
  description: '生成AIでつくる、安心して使える教育画像素材サイト',
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