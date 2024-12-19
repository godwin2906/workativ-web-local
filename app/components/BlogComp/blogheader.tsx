import React from "react";

interface BlogHeaderProps {
  blog: any; // The featured blog passed from the parent component
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ blog }) => {
  return (
    <div>
      <div className="bg-brand-bg_white w-[100%] h-auto p-10 border border-brand-primary rounded-[27px] flex flex-row gap-5 justify-center">
        <div className="w-1/2 border border-brand-card bg-brand-card rounded-[23px] flex justify-center items-center">
          Image
        </div>
        <div className="flex flex-col gap-7 w-1/2">
          <div className="flex justify-end text-brand-text_blue font-medium">Featured Blog</div>
          <div className="text-28px border font-medium rounded-2xl px-3 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit">
            {blog.fields.blogtitle}
          </div>
          <div className="flex justify-between gap-6">
            <div className="font-bold">{blog.fields.blogtitle}</div>
            <div className="flex justify-center items-center py-1 h-fit border px-3 whitespace-nowrap text-center rounded-2xl text-brand-primary border-brand-primary">
              {blog.fields.publishdate}
            </div>
          </div>
          <div className="font-medium">{blog.fields.blogdescription}</div>
          <div className="flex justify-between">
            <div className="border rounded-2xl px-3 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit">
              Read more
            </div>
            <div>{blog.fields.authorname}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
