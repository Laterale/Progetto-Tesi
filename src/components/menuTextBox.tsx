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
    <div className={cn("rounded-xl bg-[#ecd89f3f] border-2 border-black shadow-solid p-5", className)}>
      <p className="flex justify-center text-lg mb-4">{page[currentPage]}</p>

      <div className="flex justify-evenly items-end">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="disabled:opacity-50 text-black animate-bounce-slight disabled:animate-none"
        >
          {'<'}
        </button>
        
        <span className="text-sm text-black pl-3 pr-3">
          {currentPage + 1} / {page.length}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === page.length - 1}
          className="rounded text-black disabled:opacity-50 animate-bounce-slight disabled:animate-none"
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}

export default MenuTextBox
