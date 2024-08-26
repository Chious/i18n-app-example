import { dir } from "i18next";
import { languages } from "@/app/i18n/setting";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body className="bg-white text-black w-screen h-screen p-8">
        {children}
      </body>
    </html>
  );
}
