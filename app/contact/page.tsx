import type { Metadata } from "next";
import { PageBanner } from "@/components/page-banner";
import { ContactForm } from "@/components/contact-form";
import { Features } from "@/components/features";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact — Furniro",
  description: "Get in touch with the Furniro team.",
};

const bannerImage =
  "/images/banner-clean.jpg";

const details = [
  {
    icon: PinIcon,
    title: "Address",
    lines: ["236 5th SE Avenue, New York NY10000, United States"],
  },
  {
    icon: PhoneIcon,
    title: "Phone",
    lines: ["Mobile: +(84) 546-6789", "Hotline: +(84) 456-6789"],
  },
  {
    icon: ClockIcon,
    title: "Working Time",
    lines: ["Monday-Friday: 9:00 - 22:00", "Saturday-Sunday: 9:00 - 21:00"],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="Contact"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image={bannerImage}
      />

      <section className="py-12 lg:py-[100px]">
        <div className="container-page">
          <h2 className="text-center text-[28px] font-semibold text-black lg:text-[36px]">
            Get In Touch With Us
          </h2>
          <p className="mx-auto mt-2 max-w-[644px] text-center text-base leading-6 text-muted-light">
            For More Information About Our Product &amp; Services. Please Feel Free To
            Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
            Hesitate!
          </p>

          <div className="mt-12 grid gap-10 lg:grid-cols-[393px_1fr] lg:gap-[110px] lg:px-[80px]">
            <div className="space-y-10 py-2">
              {details.map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex gap-6">
                  <Icon className="mt-1 h-7 w-7 shrink-0 text-black" />
                  <div>
                    <h3 className="text-2xl font-medium text-black">{title}</h3>
                    <div className="mt-2 space-y-1 text-base leading-6 text-black">
                      {lines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <Features />
    </>
  );
}

