"use client";

import { useRouter } from "next/navigation";

export default function Pagination({
  totalPages,
  currentPage,
}) {
  const router = useRouter();

  const handlePage = (pageNum) => {
    router.push(`?page=${pageNum}`);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-8 flex justify-center gap-2">
      {Array.from({ length: totalPages }).map((_, idx) => {
        const pageNum = idx + 1;

        return (
          <button
            key={pageNum}
            onClick={() => handlePage(pageNum)}
            className={`rounded-lg border px-4 py-2 ${
              pageNum === currentPage
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {pageNum}
          </button>
        );
      })}
    </div>
  );
}