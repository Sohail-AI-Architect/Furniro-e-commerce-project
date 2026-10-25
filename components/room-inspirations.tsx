"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { roomInspirations } from "@/lib/products";

export function RoomInspirations() {
  const [active, setActive] = useState(0);
  const total = roomInspirations.length;
  const current = roomInspirations[active];
  const previews = [1, 2].map((offset) => roomInspirations[(active + offset) % total]);

  const next = () => setActive((index) => (index + 1) % total);

  return (
    <section className="overflow-hidden bg-cream-soft py-14 lg:py-11">
      <div className="container-page flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-10">
        <div className="max-w-[422px] shrink-0">
          <h2 className="text-[32px] font-bold leading-tight text-ink lg:text-[40px]">
            50+ Beautiful rooms inspiration
          </h2>
          <p className="mt-4 max-w-[368px] text-base font-medium leading-6 text-muted-dark">
            Our designer already made a lot of beautiful prototipe of rooms that
            inspire you
          </p>
          <Link href="/shop" className="btn-gold mt-6">
            Explore More
          </Link>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex gap-6">
            <div
              key={current.id}
              className="animate-slide-fade relative h-[420px] w-full max-w-[320px] shrink-0 overflow-hidden sm:max-w-[404px] lg:h-[582px] lg:w-[404px] lg:max-w-none"
            >
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(max-width: 1024px) 100vw, 404px"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 p-4 pr-6 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:p-6 sm:pr-8">
                <p className="text-sm font-medium text-muted-dark sm:text-base">
                  {current.id} �?" {current.label}
                </p>
                <p className="mt-1 text-[22px] font-semibold text-ink sm:mt-2 sm:text-[28px]">
                  {current.title}
                </p>
              </div>
              <button
                type="button"
                onClick={next}
                aria-label="Next room inspiration"
                className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center bg-gold text-white transition-colors hover:bg-[#a17a26] sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>

            {previews.map((room, index) => (
              <div
                key={`${room.id}-${index}`}
                className={`relative shrink-0 overflow-hidden ${
                  index === 0
                    ? "hidden h-[486px] w-[372px] self-start lg:block"
                    : "hidden h-[486px] w-[372px] self-start xl:block"
                }`}
              >
                <Image
                  src={room.image}
                  alt={room.title}
                  fill
                  sizes="372px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-5 lg:pl-[428px]">
            {roomInspirations.map((room, index) => (
              <button
                key={room.id}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${room.title}`}
                aria-current={index === active}
                className={`flex h-[27px] w-[27px] items-center justify-center rounded-full border transition-colors ${
                  index === active ? "border-gold" : "border-transparent"
                }`}
              >
                <span
                  className={`h-[11px] w-[11px] rounded-full transition-colors ${
                    index === active ? "bg-gold" : "bg-[#D8D8D8]"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
