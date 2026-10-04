import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { withBasePath } from "@/shared/config/site";

export const metadata: Metadata = {
  title: "Aviora",
  robots: { index: false, follow: true },
};

const fallback = withBasePath(`/${routing.defaultLocale}/`);

/**
 * On a server the proxy redirects "/" by Accept-Language before this renders.
 * A static host has no proxy, so the browser picks the language here instead.
 */
const pickLocale = `(function(){var l=(navigator.language||"").toLowerCase().indexOf("ru")===0?"ru":"${routing.defaultLocale}";location.replace("${withBasePath("/")}"+l+"/")})()`;

export default function Entry() {
  return (
    <main className="grid min-h-dvh place-items-center">
      <meta httpEquiv="refresh" content={`1; url=${fallback}`} />
      <script dangerouslySetInnerHTML={{ __html: pickLocale }} />
      <a href={fallback} className="font-serif text-3xl italic">
        Aviora
      </a>
    </main>
  );
}
