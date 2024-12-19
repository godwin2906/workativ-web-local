import { useState, useMemo } from "react";
import BlogHeader from "../BlogComp/blogheader";

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
  const currentBlogs = useMemo(() => {
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

  return (
    <div className="flex flex-col gap-12 w-full mt-5 mb-5 px-20 justify-center items-center overflow-x-hidden">
      <BlogHeader blog={featuredBlog} />

      <div className="flex flex-col gap-12 w-full mt-5 mb-5 px-20 justify-center items-center overflow-x-hidden">
        {categoryChunks.map((chunk, index) => (
          <div
            key={index}
            className="flex gap-4 w-full justify-center items-center"
          >
            {chunk.map((category: any, categoryIndex: number) => (
              <button
                key={categoryIndex}
                className={`border hover:bg-brand-secondary rounded-2xl px-3 py-1 border-brand-primary text-brand-text_blue ${
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

      <div className="grid grid-cols-3 gap-12 w-full justify-center items-center">
        {currentBlogs.map((data: any, index: number) => (
          <div
            key={index}
            className="flex flex-col w-full min-h-[500px] max-h-[37rem] maxgap-5 border border-brand-border_blue rounded-[27px]"
          >
            <div className="bg-brand-card rounded-tl-[26px] rounded-tr-[26px] border border-brand-card flex items-center justify-center h-[300px]">
              image
            </div>

            <div className="flex flex-col justify-between flex-1 gap-4 px-5 py-3">
              <div className="font-bold text-lg line-clamp-3">
                {data.fields.blogtitle}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {data.fields.categories.map(
                    (category: any, index: number) => (
                      <div
                        key={index}
                        className="border rounded-2xl px-3 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit"
                      >
                        {category.fields.name}
                      </div>
                    )
                  )}
                </div>
                <div className="flex justify-center items-center border px-3 py-1 rounded-2xl text-brand-primary border-brand-primary whitespace-nowrap">
                  {data.fields.publishdate}
                </div>
              </div>

              <div className="line-clamp-3 text-sm text-gray-600">
                {data.fields.blogdescription}
              </div>
              <div className="flex justify-end text-sm font-medium text-gray-500">
                {data.fields.authorname}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 border rounded-2xl text-brand-primary border-brand-primary"
          >
            &lt;
          </button>
        )}

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page + 1)}
            className={`px-3 py-1 border rounded-2xl text-brand-primary border-brand-primary ${
              currentPage === page + 1
                ? "bg-brand-secondary text-brand-text_blue"
                : ""
            }`}
          >
            {page + 1}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 border rounded-2xl text-brand-primary border-brand-primary"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogList;
