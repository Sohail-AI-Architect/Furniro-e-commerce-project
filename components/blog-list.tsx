"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BlogPostMeta } from "@/components/blog-post-meta";
import { CloseIcon, SearchIcon } from "@/components/icons";
import {
  blogCategories,
  blogCategoryNames,
  blogPosts,
  recentBlogPosts,
} from "@/lib/blog-posts";

export function BlogList({
  initialQuery = "",
  initialCategory = "",
}: {
  initialQuery?: string;
  initialCategory?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rawQuery = searchParams?.get("q") ?? initialQuery;
  const rawCategory = searchParams?.get("category") ?? initialCategory;
  const categoryQuery = rawCategory.toLowerCase();
  const [query, setQuery] = useState(rawQuery);

  useEffect(() => {
    setQuery(rawQuery);
  }, [rawQuery]);

  const filteredPosts = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    const exactCategory = blogCategoryNames.find(
      (name) => name.toLowerCase() === searchTerm,
    );

    return blogPosts.filter((post) => {
      const matchesCategory =
        !categoryQuery || post.category.toLowerCase() === categoryQuery;
      if (!matchesCategory) return false;

      if (!searchTerm) return true;

      if (exactCategory) {
        return post.category.toLowerCase() === exactCategory.toLowerCase();
      }

      return (
        post.title.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm) ||
        post.content.join(" ").toLowerCase().includes(searchTerm)
      );
    });
  }, [query, categoryQuery]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    const term = query.trim();

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  const handleClearSearch = () => {
    setQuery("");
    router.replace("/blog");
  };

  const handleCategoryClick = (categoryName: string) => {
    setQuery(categoryName);
    router.push(`/blog?q=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="w-full pb-12 pt-12 lg:pb-[58px] lg:pt-[106px]">
      <div className="container-page">
        <div className="grid gap-12 xl:grid-cols-[817px_393px] xl:items-start xl:gap-[30px]">
          <div className="mx-auto w-full max-w-[817px] space-y-12 lg:space-y-[54px] xl:mx-0">
            <p className="sr-only" role="status" aria-live="polite">
              {filteredPosts.length} blog post
              {filteredPosts.length === 1 ? "" : "s"} found
            </p>

            {filteredPosts.length === 0 ? (
              <div className="rounded-[10px] bg-[#F9F1E7] px-6 py-16 text-center">
                <h2 className="text-2xl font-medium text-black">
                  No posts found for &ldquo;
                  {query.trim() || rawCategory}&rdquo;
                </h2>
                <p className="mt-2 text-base leading-6 text-muted-light">
                  Try a different keyword, category or browse all stories.
                </p>
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="mt-6 border-b border-black pb-1 text-base text-black transition-colors hover:border-gold hover:text-gold"
                >
                  Clear search
                </button>
              </div>
            ) : (
              filteredPosts.map((post, index) => (
                <article key={post.slug}>
                  <div className="relative aspect-[817/500] w-full overflow-hidden rounded-[10px] bg-mist">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1279px) 100vw, 817px"
                      className="object-cover"
                    />
                  </div>

                  <BlogPostMeta
                    date={post.date}
                    dateTime={post.dateTime}
                    category={post.category}
                    className="-ml-[3px] mt-[17px]"
                  />

                  <h2 className="mt-[15px] text-[26px] font-medium leading-[39px] text-black sm:text-[30px] sm:leading-[45px]">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-justify text-[15px] leading-[22.5px] text-muted-light lg:h-[115px]">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="group relative mt-[30px] inline-block w-[89px] pb-3 text-base leading-6 text-black"
                  >
                    Read more
                    <span className="absolute bottom-0 left-1/2 h-px w-[77px] -translate-x-1/2 bg-black transition-colors group-hover:bg-gold" />
                  </Link>
                </article>
              ))
            )}
          </div>

          <aside className="mx-auto w-full max-w-[393px] space-y-10 xl:mx-0 xl:-mt-[22px] xl:space-y-[41px]">
            <div className="bg-white pb-[61px] pt-[22px]">
              <form
                action="/blog"
                role="search"
                onSubmit={handleSearch}
                className="mx-auto flex h-[58px] w-[calc(100%-82px)] max-w-[311px] items-center rounded-[10px] bg-white pl-4 pr-[10px]"
              >
                <label htmlFor="blog-search" className="sr-only">
                  Search the blog
                </label>
                <input
                  id="blog-search"
                  name="q"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-base text-black outline-none"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                    className="mr-2 flex h-5 w-5 shrink-0 items-center justify-center text-muted-light transition-colors hover:text-gold"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                ) : null}
                <button
                  type="submit"
                  aria-label="Search"
                  className="flex h-6 w-6 shrink-0 items-center justify-center text-black transition-colors hover:text-gold"
                >
                  <SearchIcon className="h-6 w-6" />
                </button>
              </form>

              <div className="ml-[77px] mr-[65px] mt-[43px]">
                <h2 className="text-2xl font-medium leading-9 text-black">
                  Categories
                </h2>
                <ul className="mt-[33px] space-y-[41px]">
                  {blogCategories.map((category) => (
                    <li key={category.label}>
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(category.label)}
                        className="flex w-full items-center justify-between text-left text-base leading-6 text-muted-light transition-colors hover:text-gold"
                      >
                        <span>{category.label}</span>
                        <span>{category.count}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white px-5 pb-4 pt-4 sm:pl-[76px] sm:pr-[65px]">
              <h2 className="text-2xl font-medium leading-9 text-black">
                Recent Posts
              </h2>
              <ul className="mt-[26px] space-y-[39px]">
                {recentBlogPosts.map((post) => (
                  <li key={post.title} className="flex gap-3">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[10px] bg-[#D9D9D9]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 pt-2">
                      <p className="line-clamp-2 min-h-[42px] text-sm leading-[21px] text-black">
                        {post.title}
                      </p>
                      <p className="mt-[5px] text-xs leading-[18px] text-muted-light">
                        {post.date}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <nav
          aria-label="Blog pagination"
          className="mt-12 flex items-center justify-center gap-3 sm:gap-[38px] lg:mt-[54px]"
        >
          <button
            type="button"
            aria-current="page"
            className="flex h-[46px] w-[46px] items-center justify-center rounded-[10px] bg-gold text-lg leading-[30px] text-white sm:h-[60px] sm:w-[60px] sm:text-xl"
          >
            1
          </button>
          <button
            type="button"
            className="flex h-[46px] w-[46px] items-center justify-center rounded-[10px] bg-[#F9F1E7] text-lg leading-[30px] text-black transition-colors hover:bg-gold/20 sm:h-[60px] sm:w-[60px] sm:text-xl"
          >
            2
          </button>
          <button
            type="button"
            className="flex h-[46px] w-[46px] items-center justify-center rounded-[10px] bg-[#F9F1E7] text-lg leading-[30px] text-black transition-colors hover:bg-gold/20 sm:h-[60px] sm:w-[60px] sm:text-xl"
          >
            3
          </button>
          <button
            type="button"
            className="flex h-[46px] w-[68px] items-center justify-center rounded-[10px] bg-[#F9F1E7] text-lg font-light leading-[30px] text-black transition-colors hover:bg-gold/20 sm:h-[60px] sm:w-[98px] sm:text-xl"
          >
            Next
          </button>
        </nav>
      </div>
    </section>
  );
}
