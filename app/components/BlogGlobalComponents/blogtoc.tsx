import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const TableOfContents: React.FC<{ contentItems: any }> = ({ contentItems }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-blue-500 rounded-lg bg-white">
      <div
        className="flex justify-between items-center p-4 border-b-0 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        role="button"
      >
        <h3 className="text-blue-500 font-semibold text-lg">In this Blog</h3>
        <span
          className={`text-blue-500 transform ${
            isOpen ? "rotate-180" : ""
          } transition-transform duration-[600ms] ease-in-out`}
        >
          <ChevronDown />
        </span>
      </div>

      {isOpen && (
        <ul
          className="p-4 border-t border-neutral-400 toc-blog-scroll overflow-y-auto scroll-smooth"
          style={{
            maxHeight: "200px",
          }}
        >
          {contentItems.map(
            (
              item: {
                subtitle: string;
              },
              index: React.Key | null | undefined
            ) =>
              item.subtitle !== "Introduction" ? (
                <li key={index} className="mb-2">
                  <a
                    href={`#subtitle-${index}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.subtitle}
                  </a>
                </li>
              ) : null
          )}
        </ul>
      )}
    </div>
  );
};

export default TableOfContents;
