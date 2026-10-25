import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const help = ["Payment Options", "Returns", "Privacy Policies"];

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] lg:gap-8 lg:py-[76px]">
        <div>
          <Link href="/" className="text-2xl font-bold text-black">
            Furniro.
          </Link>
          <p className="mt-9 max-w-[285px] text-sm leading-6 text-muted-light">
            400 University Drive Suite 200 Coral Gables,
            <br />
            FL 33134 USA
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-light">Links</p>
          <ul className="mt-6 space-y-7">
            {links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-sm font-medium text-black hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-light">Help</p>
          <ul className="mt-6 space-y-7">
            {help.map((item) => (
              <li key={item}>
                <Link href="/contact" className="text-sm font-medium text-black hover:text-gold">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-muted-light">Newsletter</p>
          <NewsletterForm />
        </div>
      </div>

      <div className="container-page border-t border-black/10 py-9">
        <p className="text-sm text-black">2023 furino. All rights reverved</p>
      </div>
    </footer>
  );
}
