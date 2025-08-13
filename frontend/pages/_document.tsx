import { Html, Head, Main, NextScript } from "next/document";
import { nunito } from "@/helpers/fonts";

export default function Document() {
  return (
    <Html lang="en" >
      <Head />
      <body className={nunito.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
