import React from "react";
import Blog from "../../assets/blogImages/Header img.png";
import { HeroBlog } from "../BlogHome/bloghomelayout";

interface BlogHeaderProps {
  blog: HeroBlog;
  isHomeBlog?: boolean;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ blog, isHomeBlog }) => {
  const authors = blog.author.map((author) => ({
    authorName: author.authorName,
    authorDesignation: author.authorDesignation,
    authorImage: author?.authorImage?.file?.url,
  }));

  return (
    <div>
      <div className="bg-brand-bg_white w-[100%] h-auto p-8 border border-brand-primary rounded-[27px] flex flex-row gap-8 justify-center shadow-[0px_4px_0px_0px_#000]">
        <div className="w-1/2">
          <img
            src={blog.image}
            alt="header"
            className="w-[100%] h-[100%] rounded-[23px]"
          />
        </div>
        <div
          className={`flex flex-col gap-5 w-1/2 bg-cover bg-center bg-no-repeat ${
            !isHomeBlog ? "justify-center" : ""
          }`}
          style={{ backgroundImage: `url(${""})` }}
        >
          {isHomeBlog ? (
            <>
              <div className="flex justify-end text-brand-text_blue font-normal text-[24px] leading-[51px]">
                Featured Blog
              </div>

              <div className="flex flex-col gap-5 pr-14">
                <div className="flex justify-between gap-10 items-center mb-8">
                  <div className="justify-start text-[27px] border font-medium rounded-[27px] px-5 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit">
                    {blog.categories?.map(
                      (category: any, index: number) => (
                        <span key={index} className="mr-2">
                          {category.displayName}
                        </span>
                      )
                    )}
                  </div>
                  <div className="flex justify-center items-center py-1 h-fit border px-5 whitespace-nowrap text-center rounded-[27px] text-brand-primary border-brand-primary">
                    {blog.publishdate}
                  </div>
                </div>

                <div className="flex">
                  <div className="font-bold text-[42px] text-brand-secondary leading-[52px]">
                    {blog.blogtitle}
                  </div>
                </div>

                <div className="font-normal text-[20px] leading-[25px] text-brand-secondary">
                  {blog.blogdescription}
                </div>

                <div className="flex justify-between mt-8">
                  <div className="border rounded-[27px] px-5 py-1 h-fit text-[24px] font-medium border-brand-border_black text-brand-primary bg-brand-primary w-fit">
                    Read more
                  </div>

                  <div className="flex flex-row gap-3 justify-center items-center">
                    {authors.map((data: any, index: number) => (
                      <div key={index} className="flex gap-4 justify-start items-center">
                        <div className="">
                          <img
                            src={data.authorImage}
                            className="rounded-[100%] w-[50px] h-[50px] border border-brand-border_black bg-brand-primary"
                          />
                        </div>
                        <div>
                          <div className="text-[24px] font-normal leading-[51px] text-brand-secondary">
                            {data.authorName}
                          </div>
                          <div className="text=[15px] font-normal text-brand-text_gray">
                            {data.authorDesignation}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-5">
                <div className="flex justify-between gap-10 items-center">
                  <div className="justify-start text-[27px] border font-medium rounded-[27px] px-5 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit">
                    {blog.categories?.map(
                      (category: any, index: number) => (
                        <span key={index} className="mr-2">
                          {category.displayName}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="flex">
                  <div className="font-bold text-[42px] text-brand-secondary">
                    {blog.blogtitle}
                  </div>
                </div>

                <div className="flex gap-4">
                  <span>{blog.publishdate}</span>
                  <span>{blog.readTime}</span>
                </div>

                <div className="flex flex-row gap-3">
                  {authors.map((data: any, index: number) => (
                    <div key={index} className="flex gap-4 justify-start items-center">
                      <div className="">
                        <img
                          src={data.authorImage}
                          className="rounded-[100%] w-[50px] h-[50px] border border-brand-border_black bg-brand-primary"
                        />
                      </div>
                      <div>
                        <div className="text-[24px] font-normal leading-[51px] text-brand-secondary">
                          {data.authorName}
                        </div>
                        <div className="text=[15px] font-normal text-brand-text_gray">
                          {data.authorDesignation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
