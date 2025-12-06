"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ListItem, type PathFilterItem } from ".";
import Link from "next/link";
import { createUrl } from "@/lib/utils";
import type { SortFilterItem } from "@/lib/constants";
import clsx from "clsx";

function PathItem({ item }: { item: PathFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = pathname === item.path;
  const newParams = new URLSearchParams(searchParams.toString());
  const DynamicTag = active ? "p" : Link;

  newParams.delete("q");

  return (
    <li className="mt-2 flex text-white md:text-black" key={item.title}>
  <DynamicTag
    href={createUrl(item.path, newParams)}
    className={clsx(
      "w-full text-sm underline-offset-4 hover:underline text-white md:text-black",
      {
        "underline underline-offset-4": active,
      }
    )}
  >
    {item.title}
  </DynamicTag>
</li>

  );
}

function SortItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("sort") === item.slug;
  const q = searchParams.get("q");

  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug }),
    })
  );
  const DynamicTag = active ? "p" : Link;

  return (
    <li className="mt-2 flex text-sm text-white md:text-black" key={item.title}>
  <DynamicTag
    prefetch={!active ? false : undefined}
    href={href}
    className={clsx(
      "w-full hover:underline hover:underline-offset-4 text-white md:text-black",
      {
        "underline underline-offset-4": active,
      }
    )}
  >
    {item.title}
  </DynamicTag>
</li>

  );
}


export function FilterItem({ item }: { item: ListItem }) {
  // Path Filter (has `path`)
  if ("path" in item) {
    return (
      <PathItem item={item} />
    );
  }

  // Sort Filter (has `slug`)
  if ("slug" in item) {
    return (
      <SortItem item={item} />
    );
  }

  return null;
}
