import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { RoomInspirations } from "@/components/room-inspirations";
import { categories, funiroGallery, products } from "@/lib/products";

const heroImage =
  "/images/hero-clean.jpg";

export default function HomePage() {
  return (
    <>
      <section className="w-full overflow-hidden bg-[#F5F5F5]">
        <div className="relative mx-auto w-full max-w-[1440px]">
          <Image
            src={heroImage}
            alt="Modern living room with warm neutral furniture"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="relative z-10 mx-auto flex min-h-[540px] w-full items-start justify-end px-5 py-10 sm:min-h-[620px] sm:px-8 lg:h-[717px] lg:min-h-0 lg:px-[58px] lg:pb-0 lg:pt-[157px]">
            <div className="w-full max-w-[643px] rounded-[10px] bg-cream p-6 sm:p-10 lg:px-[39px] lg:pb-[37px] lg:pt-[62px]">
              <p className="text-base font-semibold text-[#333333]">
                New Arrival
              </p>
              <h1 className="mt-1 text-[34px] font-bold leading-[1.22] text-gold sm:text-[44px] lg:text-[52px]">
                Discover Our
                <br />
                New Collection
              </h1>
              <p className="mt-4 max-w-[546px] text-base font-medium leading-6 text-[#333333] lg:text-lg lg:leading-[26px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis.
              </p>
              <Link
                href="/shop"
                className="mt-10 inline-flex h-[74px] w-[222px] items-center justify-center bg-gold text-base font-bold text-white transition-colors hover:bg-[#a17a26] lg:mt-[46px]"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14 lg:py-[56px]">
        <h2 className="text-center text-[28px] font-bold text-ink sm:text-[32px]">
          Browse The Range
        </h2>
        <p className="mx-auto mt-2 max-w-[559px] text-center text-base text-muted-dark lg:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-3 lg:mt-[62px] lg:gap-5">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/shop?category=${category.name}`}
              className="group"
            >
              <div className="relative aspect-[381/480] overflow-hidden rounded-[10px] bg-mist">
                <Image
                  src={category.image}
                  alt={`${category.name} room`}
                  fill
                  sizes="(max-width: 640px) 90vw, 381px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-5 text-center text-2xl font-semibold text-ink group-hover:text-gold">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page pb-14 lg:pb-[69px]">
        <h2 className="text-center text-[32px] font-bold text-ink lg:text-[40px]">
          Our Products
        </h2>

        <div className="mt-8 grid gap-8 min-[480px]:grid-cols-2 min-[1025px]:grid-cols-4 lg:mt-10 lg:gap-8">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 flex justify-center lg:mt-8">
          <Link href="/shop" className="btn-outline-gold min-w-[245px]">
            Show More
          </Link>
        </div>
      </section>

      <RoomInspirations />


      <section className="py-14 lg:py-[67px]">
        <div className="text-center">
          <p className="text-base font-semibold text-muted-dark lg:text-xl">
            Share your setup with
          </p>
          <h2 className="mt-1 text-[32px] font-bold text-ink lg:text-[40px]">
            #FuniroFurniture
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4 lg:px-4">
          {funiroGallery.map((image, index) => (
            <div
              key={image}
              className={`relative overflow-hidden ${
                index % 5 === 0 ? "aspect-[3/4]" : "aspect-square"
              } ${index === 4 ? "sm:row-span-2 sm:aspect-auto" : ""}`}
            >
              <Image
                src={image}
                alt={`Furniture inspiration ${index + 1}`}
                fill
                sizes="(max-width: 640px) 45vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

