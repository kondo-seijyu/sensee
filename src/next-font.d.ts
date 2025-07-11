import 'next/font/google';

declare module 'next/font/google' {
  type Subset =
    | 'latin'
    | 'latin-ext'
    | 'cyrillic'
    | 'vietnamese'
    | 'japanese';

  interface FontLoaderOptions {
    subsets?: Subset[];
  }
}