import { useState } from "react";
import BlogHeader from "../BlogComp/blogheader";

interface BlogListProps {
  blogs: any[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories: { title: string; value: string }[] = [
    { title: "Chatbot", value: "Chatbot" },
    { title: "IT Support", value: "IT" },
    { title: "HR Support", value: "HR" },
    { title: "Employee Support", value: 'Employee Support"' },
    { title: "Conversational AI", value: "Conversational AI" },
    { title: "Generative AI", value: "Generative AI" },
    { title: "Knowladge AI", value: "Knowladge AI" },
  ];
  const filteredBlogs = selectedCategory
    ? blogs.filter((data: any) => data.fields.category === selectedCategory)
    : blogs;

  const sortedBlogs = filteredBlogs.sort((a: any, b: any) => {
    const dateA = new Date(a.fields.publishdate);
    const dateB = new Date(b.fields.publishdate);
    return dateB.getTime() - dateA.getTime(); // Descending order
  });

  return (
    <div className="flex flex-col gap-12 w-full mt-5 mb-5 px-20 justify-center items-center overflow-x-hidden">
      <BlogHeader blogs={blogs} />
      <div className="flex flex-wrap gap-4 w-1/2 justify-center items-center">
        {categories.map((item: any, index: number) => (
          <button
            key={index}
            className={`border hover:bg-brand-secondary rounded-2xl px-3 py-1 border-brand-primary text-brand-text_blue ${
              selectedCategory === item?.value
                ? "bg-brand-secondary text-brand-text_blue"
                : ""
            }`}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === item?.value ? null : item?.value
              )
            }
          >
            {item?.title}
          </button>
        ))}
      </div>
      <div className="flex flex-row gap-12 w-full justify-center items-center">
        {sortedBlogs.map((data: any, index: number) => (
          <div
            key={index}
            className="flex flex-col w-[25%] min-h-[500px] max-h-[37rem] maxgap-5 border border-brand-border_blue rounded-[27px]"
          >
            <div className="bg-brand-card rounded-tl-[26px] rounded-tr-[26px] border border-brand-card flex items-center justify-center h-[300px]">
              image
            </div>

            <div className="flex flex-col justify-between flex-1 gap-4 px-5 py-3 ">
              <div className="font-bold text-lg line-clamp-3">
                {data.fields.blogtitle}
              </div>

              <div className="flex justify-between items-center">
                <div className="border rounded-2xl px-3 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit">
                  {data.fields.category}
                </div>
                <div className="flex justify-center items-center border px-3 py-1 rounded-2xl text-brand-primary border-brand-primary whitespace-nowrap">
                  {data.fields.publishdate}
                </div>
              </div>

              <div className=" line-clamp-3 text-sm text-gray-600">
                {data.fields.blogdescription}
              </div>
              <div className="flex justify-end text-sm font-medium text-gray-500">
                {data.fields.authorname}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
