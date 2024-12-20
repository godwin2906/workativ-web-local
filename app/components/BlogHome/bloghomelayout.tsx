import { useState, useMemo } from "react";
import BlogHeader from "../BlogGlobalComponents/blogheader";
import bgImg from "../../Images/Ellipse.png";
import cateory from "../../Images/category.svg";
import { getRandomImagesForPage } from "~/utils/image";
import { Link, Outlet } from "@remix-run/react";

interface BlogListProps {
  blogs: any[];
  categories: any[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const allBlogsButton = {
    fields: { name: "All Blogs", displayName: "All Blogs" },
  };
  const allCategories = [allBlogsButton, ...categories];
  const buttonsPerRow = [4, 4];

  let categoryChunks: any[] = [];
  let currentIndex = 0;

  buttonsPerRow.forEach((count) => {
    categoryChunks.push(
      allCategories.slice(currentIndex, currentIndex + count)
    );
    currentIndex += count;
  });

  const blogsPerPage = 6;

  const sortedBlogs = useMemo(() => {
    return blogs.sort((a: any, b: any) => {
      const dateA = new Date(a.fields.publishdate);
      const dateB = new Date(b.fields.publishdate);
      return dateB.getTime() - dateA.getTime();
    });
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return selectedCategory && selectedCategory !== "All Blogs"
      ? sortedBlogs.filter((data: any) =>
          data.fields.categories.some(
            (category: any) => category.fields.name === selectedCategory
          )
        )
      : sortedBlogs;
  }, [selectedCategory, sortedBlogs]);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const currentBlogs: any = useMemo(() => {
    const firstBlogIndex = (currentPage - 1) * blogsPerPage;
    const lastBlogIndex = firstBlogIndex + blogsPerPage;
    return filteredBlogs.slice(firstBlogIndex, lastBlogIndex);
  }, [filteredBlogs, currentPage]);

  const featuredBlog = sortedBlogs[0];

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const randomImages = getRandomImagesForPage(currentPage);

  return (
    <>
      <div className="flex flex-col gap-12 w-full mt-5 mb-5 px-20 justify-center items-center overflow-x-hidden">
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
          <BlogHeader blog={featuredBlog} isHomeBlog={true} />
        </div>

        <div className="flex flex-col gap-10 w-full mb-5 px-20 overflow-x-hidden">
          <h3 className="text-center font-medium text-[30px]">Categories</h3>
          {categoryChunks.map((chunk, index) => (
            <div
              key={index}
              className="flex gap-4 w-full justify-center items-center"
            >
              {chunk.map((category: any, categoryIndex: number) => (
                <button
                  key={categoryIndex}
                  className={`border hover:bg-brand-secondary rounded-[61px] px-5 py-3 text-[24px] font-medium leading-[31px] border-brand-primary text-brand-text_blue ${
                    selectedCategory === category.fields.name
                      ? "bg-brand-secondary text-brand-text_blue"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.fields.name ||
                        category.fields.name === "All Blogs"
                        ? null
                        : category.fields.name
                    )
                  }
                >
                  {category.fields.displayName}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-10 w-full justify-center items-center">
          {currentBlogs.map((data: any, index: number) => (
            <div
              key={index}
              className="flex flex-col w-full transform transition-transform duration-200 hover:-translate-y-3 rounded-[27px]  bg-white shadow-[0px_4px_0px_0px_#1C5CFF]"
            >
              <Link to={`/blog/${data.fields?.blogurl}`}>
                <div className="border border-black rounded-tl-[27px] rounded-tr-[27px] rounded-bl-0 rounded-br-0 flex items-center justify-center">
                  <img
                    src={randomImages[index]}
                    alt={`Blog Image ${index}`}
                    className="object-cover w-full h-full rounded-tl-[26px] rounded-tr-[26px]"
                  />
                </div>

                <div className="flex flex-col justify-between pt-9 px-7 pb-7 gap-5 rounded-bl-[27px] rounded-br-[27px] rounded-tl-0 rounded-tr-0 border-l border-r border-[#1C5CFF]">
                  <div className="font-bold text-[20px] leading-[25px] line-clamp-2">
                    {data.fields.blogtitle}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {data.fields.categories.map(
                        (category: any, index: number) => (
                          <div
                            key={index}
                            className="border rounded-[15px] px-5 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit text-[15px] font-medium"
                          >
                            {category.fields.displayName}
                          </div>
                        )
                      )}
                    </div>
                    <div className="flex justify-center items-center text-sm font-medium text-brand-text_lightGray border px-5 py-1 rounded-[27px] bg-brand-bg_white border-brand-primary whitespace-nowrap">
                      {data.fields.publishdate}
                    </div>
                  </div>

                  <div className="line-clamp-3 text-sm text-brand-secondary leading-[24px] font-normal">
                    {data.fields.blogdescription}
                  </div>
                  <div className="flex justify-end text-sm font-medium text-gray-500">
                    {data.fields.author && (
                      <div
                        key={index}
                        className="flex gap-4 justify-center items-center"
                      >
                        <img
                          src={
                            data?.fields?.author[0]?.fields.authorImage.fields
                              .file.url
                          }
                          className="rounded-[100%] w-12 h-12  border border-brand-border_black  bg-brand-primary"
                        />
                        <div className="text-[16px] font-medium leading-[51px] text-brand-secondary">
                          {data?.fields?.author[0]?.fields.authorName}
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
              className="px-3 py-1 border rounded-[100%] w-[66px] h-[66px] font-medium text-[24px] text-brand-primary border-brand-primary"
            >
              &lt;
            </button>
          )}

          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page + 1)}
              className={`px-3 py-1 border rounded-[100%] w-[66px] h-[66px] text-2xl font-medium text-brand-primary border-brand-primary ${
                currentPage === page + 1
                  ? "bg-brand-primary text-brand-primary border-brand-border_black"
                  : ""
              }`}
            >
              {page + 1}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 py-1 border rounded-[100%] w-[66px] h-[66px] text-brand-primary font-medium text-[24px] border-brand-primary"
            >
              &gt;
            </button>
          )}
        </div>
      </div>

    </>
  );
};

export default BlogList;
