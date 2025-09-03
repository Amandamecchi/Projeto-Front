import "./globals.css";
import Header from "@/Components/Header";

export const metadata = {
  title: "Harry Potter World",
  description: "Explore o universo mágico de Harry Potter",
  icons: {
    icon: "/image/movie.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
