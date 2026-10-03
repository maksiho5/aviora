import { NotFoundView } from "@/views/not-found/not-found-view";
import { SiteFooter } from "@/widgets/site-footer";
import { SiteHeader } from "@/widgets/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <NotFoundView />
      </main>
      <SiteFooter />
    </>
  );
}
