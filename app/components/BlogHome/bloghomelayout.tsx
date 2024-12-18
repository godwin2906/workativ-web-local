import { useState } from "react";

interface BlogListProps {
  blogs: any[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  const categories = [
    "Chatbot",
    "ItSupport",
    "HR Support",
    "Employee Support",
    "Conversational AI",
    "Generative AI",
    "Knowladge AI",
  ];
  if (!Array.isArray(blogs)) {
    return <div>No blogs available</div>; // Handle the case where it's not an array
  }
  return (
    <div className="flex flex-col gap-12 w-full justify-center items-center">
      <div>
        {blogs.map((data: any, index: number) => (
          <>
            <div
              key={index}
              className="blog-contaniner w-[100%] flex flex-row gap-3 ml-auto mr-auto justify-center"
            >
              <div className="w-1/2">1</div>
              <div className="flex flex-col gap-7 w-1/2">
                <div className="flex justify-end text-brand-secondary font-medium">
                  Featured Blog
                </div>
                <div className="topic-title border rounded-2xl px-3 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit">
                  topic
                </div>
                <div className="flex justify-between gap-6">
                  <div className="font-bold">{data.fields.blogtitle}</div>
                  <div className="flex justify-center items-center py-1 h-fit border px-3 whitespace-nowrap text-center rounded-2xl text-brand-primary border-brand-primary">
                    {data.fields.publishdate}
                  </div>
                </div>
                <div className="font-medium">{data.fields.blogdescription}</div>
                <div className="flex justify-between">
                  <div className=" border rounded-2xl px-3 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit">
                    Read more
                  </div>
                  <div>{data.fields.authorname}</div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 w-1/2 justify-center items-center">
        {categories.map((item: string, index: number) => (
          <button
            key={index}
            className="border hover:bg-brand-secondary rounded-2xl px-3 py-1 border-brand-primary text-brand-secondary "
          >
            {item}
          </button>
        ))}
      </div>

      {blogs.map((data: any, index: number) => (
        <div className="flex flex-col">
          <div>1</div>
          <div className="flex flex-col gap-6">
            <div>{data.fields.blogtitle}</div>
            <div className="flex justify-between">
              <div className="border rounded-2xl px-3 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit">
                IT
              </div>
              <div>{data.fields.publishdate}</div>
            </div>
            <div>{data.fields.blogdescription}</div>
            <div className="flex justify-end">{data.fields.authorname}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
