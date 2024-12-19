import React from "react";
import Blog from "../../Images/Header img.png";

interface BlogHeaderProps {
  blog: any; 
  isHomeBlog?: boolean;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ blog, isHomeBlog }) => {
  const blogData = blog.fields.author.map((author: any) => ({
    authorName: author.fields.authorName,
    authorDesignation: author.fields.authorDesignation,
    authorImage: author?.fields?.authorImage?.fields?.file?.url,
  }));

  return (
    <div>
      <div className="bg-brand-bg_white w-[100%] h-auto p-8 border border-brand-primary rounded-[27px] flex flex-row gap-8 justify-center">
        <div className="w-1/2">
          <img
            src={Blog}
            alt="header"
            className="w-[100%] h-[100%] rounded-[23px]"
          />
        </div>
        <div
          className="flex flex-col gap-5 w-1/2 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${""})` }}
        >
          {isHomeBlog && (
            <div className="flex justify-end text-brand-text_blue font-normal text-[24px] leading-[51px]">
              Featured Blog
            </div>
          )}
          <div className="flex flex-col gap-5">
            <div className="flex justify-between gap-10 items-center">
              <div className="justify-start text-[27px] border font-medium rounded-[27px] px-3 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit">
                {blog.fields.blogtitle}
              </div>
              {isHomeBlog && (
                <div className="flex justify-center items-center py-1 h-fit border px-3 whitespace-nowrap text-center rounded-2xl text-brand-primary border-brand-primary">
                  {blog.fields.publishdate}
                </div>
              )}
            </div>
            <div className="flex">
              <div className="font-bold text-[42px] text-brand-secondary leading-[52px]">
                {blog.fields.blogtitle}
              </div>
            </div>
            {isHomeBlog ? (
              <div className="font-normal text-[20px] leading-[25px] text-brand-secondary">
                {blog.fields.blogdescription}
              </div>
            ) : (
              <div className="">{blog.fields.publishdate}</div>
            )}
            <div className="flex  justify-between">
              {isHomeBlog && (
                <div className="border rounded-[27px] px-3 py-1 h-fit text-[24px] font-medium border-brand-border_black text-brand-primary bg-brand-primary w-fit">
                  Read more
                </div>
              )}
              <div className="flex flex-row gap-3  justify-center items-center">
                {blogData.map((data: any, index: number) => (
                  <div key={index} className="flex gap-4 justify-start">
                    <div className="">
                      <img
                        src={data.authorImage}
                        className="rounded-[100%] w-[50px] h-[50px] border border-brand-border_black  bg-brand-primary"
                      />
                    </div>
                    <div>
                      <div className="text-[24px] font-normal leading-[51px] text-brand-secondary">
                        {data.authorName}
                      </div>
                      <div className="text=[15px] font-normal text-brand-text_gray ">
                        {data.authorDesignation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
