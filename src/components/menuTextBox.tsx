import React, { FC, useState } from "react";
import cn from "~/lib/cn";
import { useDictionary } from "~/lib/i18n"

const MenuTextBox: FC<{
  className?: string
}> = ({ className }) => {

  const { menu: dictionary } = useDictionary()
  const page = [
    dictionary.p1,
    dictionary.p2,
    dictionary.p3,
    dictionary.p4,
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage < page.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  return (
    <div className={cn("p-10 rounded-3xl bg-white border-2 border-black shadow-solid-base", className)}>
      <p className="text-lg mb-4">{page[currentPage]}</p>

      <div className="flex justify-between">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="px-4 py-2 rounded animate-bounce-slight disabled:opacity-50 disabled:animate-none"
        >
          Indietro
        </button>

        <span className="text-sm text-black">
          {currentPage + 1} / {page.length}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === page.length - 1}
          className="px-4 py-2 rounded text-black animate-bounce-slight disabled:opacity-50 disabled:animate-none"
        >
          Avanti
        </button>
      </div>
    </div>
  );
}

export default MenuTextBox
