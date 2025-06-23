import localFont from 'next/font/local';

export const eras = localFont({
  src: [
    {
      path: '../../public/fonts/ITC-Eras-Light-Regular.otf',
      weight: '300',
      style: 'light',
    },
    {
      path: '../../public/fonts/ITC-Eras-Book-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ITC-Eras-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ITC-Eras-Demi-Regular.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/ITC-Eras-Bold.otf',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../../public/fonts/ITC-Eras-Ultra-Regular.otf',
      weight: '800',
      style: 'bolder',
    },
  ],
  variable: '--font-eras', // Asigna una variable CSS
  display: 'swap',
});