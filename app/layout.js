import './globals.css';

export const metadata = {
  title: 'Vernefargar',
  description: 'Utforsk og samanlikn vernefargar - ein interaktiv fargeutforskar',
  keywords: ['fargar', 'NCS', 'vernefargar', 'fargeutforskar'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
