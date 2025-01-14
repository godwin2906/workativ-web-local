import { useState, useMemo, useEffect } from "react";
import BlogHeader from "../BlogGlobalComponents/blogheader";
import { Link, Outlet } from "@remix-run/react";
import {
  Author,
  Category,
  BlogList as BlogListT,
  Blog,
  BlogWithImage,
} from "~/server/blogs.server";
import { useMedia } from "use-media";
import { MoveLeft, MoveRight } from "lucide-react";
import "./../../styles/responsiveStyle/responsive.css";

export type HeroBlog = {
  blogtitle: string;
  blogdescription: string;
  publishdate: string;
  readTime: string;
  author: Author[];
  categories: {
    name: string;
    displayName: string;
  }[];
  blogurl: string;
  image: string;
};

interface BlogListProps {
  blogs: any[];
  categories: any[];
  heroBlog: HeroBlog;
  category: Category[];
}

const allBlogCategory = {
  name: "All",
  displayName: "All Blogs",
  heroImage: [],
};

interface BlogListProps_UPDATED {
  blogs: any[];
  categories: any[];
  heroBlog: HeroBlog;
  category: Category[];
  blogList: BlogWithImage[];
}

function splitArrayByCounts<T>(inputArray: T[], counts: number[]): T[][] {
  const result: T[][] = [];
  let startIndex = 0;

  for (const count of counts) {
    if (startIndex >= inputArray.length) break;
    const endIndex = startIndex + count;
    result.push(inputArray.slice(startIndex, endIndex));
    startIndex = endIndex;
  }

  return result;
}

function useCategories(categories: Category[], chunks: Array<number>) {
  const allCategories = [allBlogCategory, ...categories];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categoriesWithSelectedFlag = allCategories.map(
    (category: Category) => ({
      ...category,
      isSelected: selectedCategory === category.name,
    })
  );

  const chunkedCategoriesWithSeletedFlag = splitArrayByCounts(
    categoriesWithSelectedFlag,
    chunks
  );

  return [
    categoriesWithSelectedFlag,
    chunkedCategoriesWithSeletedFlag,
    setSelectedCategory,
    selectedCategory,
  ] as const;
}

function useBlogsPaginated(
  blogs: BlogWithImage[],
  selectedCategory: string,
  blogsPerPage: number
) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((data) =>
          data.categories.some((category) => category.name === selectedCategory)
        );
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const currentBlogs = useMemo(() => {
    const firstBlogIndex = (currentPage - 1) * blogsPerPage;
    const lastBlogIndex = firstBlogIndex + blogsPerPage;
    return filteredBlogs.slice(firstBlogIndex, lastBlogIndex);
  }, [filteredBlogs, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return [
    currentBlogs,
    totalPages,
    currentPage,
    setCurrentPage,
    handlePageChange,
  ] as const;
}

const BlogListUpdated: React.FC<BlogListProps_UPDATED> = ({
  heroBlog,
  blogList,
  category,
}) => {
  const filteredBlogList = useMemo(
    () => blogList.filter((blog) => blog.blogurl !== heroBlog.blogurl),
    [blogList, heroBlog.blogurl]
  );
  const isMobile = useMedia({ maxWidth: "520px" });
  const isTablet = useMedia("(min-width: 521px) and (max-width: 1024px)");
  const categoryChunks = isMobile ? [3, 2, 2, 1] : [4, 4];
  const blogsPerPage = isMobile ? 2 : 6;

  const [
    ,
    chunkedCategoriesWithSeletedFlag,
    setSelectedCategory,
    selectedCategory,
  ] = useCategories(category, categoryChunks);

  const [
    currentBlogs,
    totalPages,
    currentPage,
    setCurrentPage,
    handlePageChange,
  ] = useBlogsPaginated(filteredBlogList, selectedCategory, blogsPerPage);

  return (
    <>
      <div
        className={`flex flex-col  w-full mt-5 mb-5 justify-center items-center overflow-x-hidden1 ${
          isMobile ? "px-4 gap-8" : "px-20 gap-12"
        }`}
      >
        {isMobile ? (
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-black text-center font-dm-sans text-[26px] font-bold leading-[46px] font-page-header sans-bold">
              Workativ Blogs
            </h1>
          </div>
        ) : (
          <div className="mb-[40px]">
            <div className="flex flex-col justify-center items-center gap-4 mb-[65px]">
              <h1 className="text-black text-center font-dm-sans text-[54px] font-bold leading-[80px]">
                Workativ Blogs
              </h1>
              <p className="text-[#21243D] text-center  font-heebo text-[17.39px] font-normal leading-normal w-2/3">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>
            </div>
            <BlogHeader blog={heroBlog} isHomeBlog={true} />
          </div>
        )}

        <div
          className={`flex flex-col categoryItemsMain w-full mb-5 overflow-x-hidden ${
            isMobile ? "gap-5" : "px-20 gap-10"
          }`}
        >
          {!isMobile && (
            <h3 className="text-center font-medium text-[30px]">Categories</h3>
          )}
          {chunkedCategoriesWithSeletedFlag.map((chunk, index) => (
            <div
              key={index}
              className="flex gap-4 w-full justify-center items-center"
            >
              {chunk.map((category, categoryIndex: number) => {
                const isHighlighted =
                  category.displayName === "Conversational AI" ||
                  category.displayName === "Generative AI";
                const isSelected = selectedCategory === category.name;
                return (
                  <button
                    key={categoryIndex}
                    className={`border font-medium category_list_Items ${
                      isSelected
                        ? "bg-brand-secondary text-brand-text_blue"
                        : "hover:bg-brand-secondary text-brand-text_blue"
                    } border-brand-primary ${
                      isMobile
                        ? "text-[11px] rounded-[29px] flex px-5 py-2"
                        : "text-[24px] rounded-[61px] px-5 py-3 leading-[31px]"
                    } ${isHighlighted ? "px-8" : ""}`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.displayName}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div
          className={`grid gap-10 w-full justify-center items-center ${
            isMobile ? "grid-cols-1" : isTablet ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {currentBlogs.map((data, index: number) => (
            <div
              key={index}
              className="flex flex-col w-full transform transition-transform duration-200 hover:-translate-y-3 rounded-[27px]  bg-white shadow-[0px_4px_0px_0px_#1C5CFF]"
            >
              <Link to={`/blog/${data.blogurl}`}>
                <div className="border border-black rounded-tl-[27px] rounded-tr-[27px] rounded-bl-0 rounded-br-0 flex items-center justify-center">
                  <img
                    src={data.image}
                    alt={`Blog Image ${index}`}
                    className="object-cover w-full h-full rounded-tl-[26px] rounded-tr-[26px]"
                  />
                </div>

                <div
                  className={`flex flex-col justify-between  gap-5 rounded-bl-[27px] rounded-br-[27px] rounded-tl-0 rounded-tr-0 border-l border-r border-[#1C5CFF] ${
                    isMobile ? "pt-4 px-3 pb-4" : "pt-9 px-6 pb-7"
                  }`}
                >
                  <div className="font-bold text-[20px] leading-[25px] line-clamp-2">
                    {data.blogtitle}
                  </div>

                  <div className="flex justify-between categoryList_Section items-center">
                    <div className="flex gap-2">
                      {data.categories.map((category, index: number) => (
                        <div
                          key={index}
                          className="border rounded-[15px] px-5 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit text-[15px] font-medium"
                        >
                          {category.displayName}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center items-center text-sm font-medium text-brand-text_lightGray border px-5 py-1 rounded-[27px] bg-brand-bg_white border-brand-primary whitespace-nowrap">
                      {data.publishdate}
                    </div>
                  </div>

                  <div className="line-clamp-3 text-sm text-brand-secondary leading-[24px] font-normal">
                    {data.blogdescription}
                  </div>
                  <div className="flex justify-end text-sm font-medium text-gray-500">
                    {data.author && (
                      <div
                        key={index}
                        className="flex gap-4 justify-center items-center"
                      >
                        <img
                          src={data.author[0].authorImage.file.url}
                          className="rounded-[100%] w-12 h-12  border border-brand-border_black  bg-brand-primary"
                        />
                        <div className="text-[16px] font-medium leading-[51px] text-brand-secondary">
                          {data.author[0].authorName}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`pt-0 pb-0 border rounded-full font-medium text-[24px] text-brand-primary border-brand-primary flex items-center justify-center ${
                !isMobile ? "pr-[30px] pl-[30px]" : "pr-[20px] pl-[20px]"
              }`}
            >
              <MoveLeft />
            </button>
          )}

          {[...Array(3).keys()]
            .map((i) => {
              const startPage =
                currentPage === totalPages && totalPages > 3
                  ? totalPages - 2
                  : Math.max(1, Math.min(currentPage - 1, totalPages - 2));

              const page = startPage + i;

              return page <= totalPages ? page : null;
            })
            .filter((page) => page !== null)
            .map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-6 border rounded-full w-14 h-14 text-2xl font-medium text-brand-primary border-brand-primary flex items-center justify-center ${
                  currentPage === page
                    ? "bg-brand-primary text-brand-primary border-brand-border_black"
                    : ""
                } `}
              >
                {page}
              </button>
            ))}

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`pt-0 pb-0 border rounded-full font-medium text-[24px]  text-brand-primary border-brand-primary flex items-center justify-center ${
                !isMobile ? "pr-[30px] pl-[30px]" : "pr-[20px] pl-[20px]"
              }`}
            >
              <MoveRight />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogListUpdated;
