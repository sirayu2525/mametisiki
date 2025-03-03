"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SearchParamsHandler({
  onTagChange,
  onPageChange,
}: {
  onTagChange: (tag: string) => void;
  onPageChange: (page: number) => void;
}) {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    onTagChange(tag);
    onPageChange(page);
  }, [tag, page, onTagChange, onPageChange]);

  return null;
}
