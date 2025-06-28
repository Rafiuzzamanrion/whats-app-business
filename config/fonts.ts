import {
  Fira_Code as FontMono,
  Geologica,
  Inter as FontSans,
  Lato
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const MonoSans = FontMono({
  subsets: ["latin"],
  variable: "--font-mono-sans",
});
export const fontGeologica = Geologica({
  subsets: ["latin"],
  variable: "--font-geologica",
});
