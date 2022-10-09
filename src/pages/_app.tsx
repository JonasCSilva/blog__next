import "../styles/globals.scss";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

import "@fontsource/inter/100.css"
import "@fontsource/inter/200.css"
import "@fontsource/inter/300.css"
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"
import "@fontsource/inter/700.css"
import "@fontsource/inter/800.css"
import "@fontsource/inter/900.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme='light'>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
