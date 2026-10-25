import { AdminIcon, CalendarIcon, TagIcon } from "@/components/icons";

export function BlogPostMeta({
  date,
  dateTime,
  category,
  className = "",
}: {
  date: string;
  dateTime: string;
  category: string;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-6 flex-wrap items-center gap-x-5 gap-y-2 text-base leading-6 text-muted-light sm:gap-x-[35px] lg:h-6 lg:flex-nowrap lg:gap-y-0 ${className}`}
    >
      <span className="flex items-center gap-[7px]">
        <AdminIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>Admin</span>
      </span>
      <span className="flex items-center gap-[11px]">
        <CalendarIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
        <time dateTime={dateTime}>{date}</time>
      </span>
      <span className="flex items-center gap-[7px]">
        <TagIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
        <span>{category}</span>
      </span>
    </div>
  );
}
