"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
  itemName?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  itemName = "entitas",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = pageSize ? (currentPage - 1) * pageSize + 1 : undefined;
  const endItem = pageSize && totalItems ? Math.min(currentPage * pageSize, totalItems) : undefined;

  // Build page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
      // Smooth scroll to top of list
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-mk-border/70 pt-6 sm:flex-row">
      {/* Item range info */}
      <div className="text-xs text-mk-muted">
        {totalItems !== undefined && startItem !== undefined && endItem !== undefined ? (
          <span>
            Menampilkan <strong className="text-mk-text">{startItem}–{endItem}</strong> dari{" "}
            <strong className="text-mk-text">{totalItems}</strong> {itemName}
          </span>
        ) : (
          <span>
            Halaman <strong className="text-mk-text">{currentPage}</strong> dari{" "}
            <strong className="text-mk-text">{totalPages}</strong>
          </span>
        )}
      </div>

      {/* Navigation buttons */}
      <nav aria-label="Navigasi halaman" className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-label="Halaman sebelumnya"
          className="flex h-9 items-center gap-1 rounded-sm border border-mk-border bg-mk-bg2 px-3 text-xs font-medium text-mk-text transition hover:border-mk-gold hover:text-mk-gold disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span>←</span>
          <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((p, idx) => {
            if (p === "...") {
              return (
                <span key={`dots-${idx}`} className="px-2 text-xs text-mk-muted">
                  …
                </span>
              );
            }

            const pageNum = p as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => handlePageClick(pageNum)}
                aria-current={isActive ? "page" : undefined}
                className={`grid h-9 min-w-9 place-items-center rounded-sm px-2 text-xs font-medium transition ${
                  isActive
                    ? "border border-mk-red bg-mk-red text-white shadow-sm font-bold"
                    : "border border-mk-border bg-mk-bg2 text-mk-muted hover:border-mk-gold hover:text-mk-text"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Halaman berikutnya"
          className="flex h-9 items-center gap-1 rounded-sm border border-mk-border bg-mk-bg2 px-3 text-xs font-medium text-mk-text transition hover:border-mk-gold hover:text-mk-gold disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="hidden sm:inline">Berikutnya</span>
          <span>→</span>
        </button>
      </nav>
    </div>
  );
}
