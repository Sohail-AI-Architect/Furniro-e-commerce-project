import { GuaranteeIcon, ShippingIcon, SupportIcon, TrophyIcon } from "@/components/icons";

const features = [
  {
    icon: TrophyIcon,
    title: "High Quality",
    copy: "Crafted from top materials",
  },
  {
    icon: GuaranteeIcon,
    title: "Warranty Protection",
    copy: "Over 2 years",
  },
  {
    icon: ShippingIcon,
    title: "Free Shipping",
    copy: "Order over 150 $",
  },
  {
    icon: SupportIcon,
    title: "24 / 7 Support",
    copy: "Dedicated support",
  },
];

export function Features() {
  return (
    <section className="bg-[#FAF3EA] py-12 lg:py-[100px]">
      <div className="mx-auto flex w-full max-w-[1334px] flex-col gap-8 px-5 sm:gap-10 lg:grid lg:grid-cols-2 lg:gap-x-[55px] lg:gap-y-10 lg:px-0 xl:flex xl:flex-row xl:items-center xl:justify-between xl:gap-0">
        {features.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex items-center gap-3">
            <Icon className="h-[60px] w-[60px] shrink-0 text-[#242424]" />
            <div>
              <h3 className="whitespace-nowrap text-xl font-semibold leading-[30px] text-[#242424] lg:text-[25px] lg:leading-[37.5px]">
                {title}
              </h3>
              <p className="whitespace-nowrap text-base font-medium leading-6 text-[#898989] lg:text-xl lg:leading-[30px]">
                {copy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
