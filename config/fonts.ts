import {Fira_Code as FontMono, Inter as FontSans, Lato} from "next/font/google";

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
export const fontLato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
});
