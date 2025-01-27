interface PaginationProps {
  currentPage: number;
  totalResults: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalResults,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalResults / pageSize);
  const maxVisiblePages = 5;

  const getPageNumbers = () => {
    const pages: number[] = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center space-x-2 mt-8">
      <button
        className="px-3 py-1 rounded  disabled:opacity-50 disabled:hover:bg-gray-500 bg-gray-500 hover:bg-gray-700 text-gray-100"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {`< Previous`}
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded cursor-pointer text-gray-100 ${
            page === currentPage
              ? 'bg-gray-700 '
              : 'bg-gray-500 hover:bg-gray-700 '
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="px-3 py-1 rounded  disabled:opacity-50 disabled:hover:bg-gray-500 bg-gray-500 hover:bg-gray-700 text-gray text-gray-100 cursor-pointer"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {`Next >`}
      </button>
    </div>
  );
};
