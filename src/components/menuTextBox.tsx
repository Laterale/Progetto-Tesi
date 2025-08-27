import React, { FC, useState } from "react";
import cn from "~/lib/cn";
import { useDictionary } from "~/lib/i18n";
import TextType from "./spokenText";

const MenuTextBox: FC<{ className?: string }> = ({ className }) => {
  const { menu: dictionary } = useDictionary();
  const page = [dictionary.p1, dictionary.p2, dictionary.p3, dictionary.p4];

  const [currentPage, setCurrentPage] = useState(0);
  const [shownPages, setShownPages] = useState(new Set<number>())

  const prevPage = () => {
    setShownPages(prev => new Set(prev).add(currentPage))
    if (currentPage > 0) setCurrentPage(currentPage - 1);

  };

  const nextPage = () => {
    setShownPages(prev => new Set(prev).add(currentPage))
    if (currentPage < page.length - 1) setCurrentPage(currentPage + 1);
  };

  const wasShown = shownPages.has(currentPage)

  return (
    <div
      className={cn(
        "text-center text-balance",
        className
      )}
    >
      {wasShown ?(
      <p className="text-lg tracking-wide break-words mb-4">
        {page[currentPage] ?? ""}
      </p>
      ) : (
      <TextType
        key={currentPage}
        className="text-lg tracking-wide break-words mb-4"
        text={page[currentPage] ?? ""}
        typingSpeed={50}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter=""
        textColors={["black"]}
      />
      )
    }
      <div className="flex justify-evenly items-end">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="disabled:opacity-50 text-black animate-bounce-slight disabled:animate-none"
        >
          {"<"}
        </button>

        <span className="text-sm text-black pl-3 pr-3">
          {currentPage + 1} / {page.length}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === page.length - 1}
          className="rounded text-black disabled:opacity-50 animate-bounce-slight disabled:animate-none"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default MenuTextBox;
