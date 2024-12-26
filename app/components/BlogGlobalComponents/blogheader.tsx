import React from "react";
import { HeroBlog } from "../BlogHome/bloghomelayout_updated";
import "../../styles/responsiveStyle/responsive.css";

interface BlogHeaderProps {
  blog: any;
  isHomeBlog?: boolean;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ blog, isHomeBlog }) => {
  const authors = Array.isArray(blog.author)
    ? blog.author.map(
        (author: {
          authorName: any;
          authorDesignation: any;
          authorImage: { file: { url: any } };
        }) => ({
          authorName: author.authorName,
          authorDesignation: author.authorDesignation,
          authorImage: author?.authorImage?.file?.url,
        })
      )
    : blog.fields?.author?.map(
        (author: {
          fields: {
            authorName: string;
            authorDesignation: string;
            authorImage: { fields: { file: { url: string } } };
          };
        }) => ({
          authorName: author.fields.authorName,
          authorDesignation: author.fields.authorDesignation,
          authorImage: author?.fields?.authorImage?.fields?.file?.url,
        })
      ) || [];

  const categories = isHomeBlog
    ? blog.categories?.map((category: any) => category.displayName)
    : blog.fields?.categories?.map(
        (category: { fields: { displayName: string } }) =>
          category.fields.displayName
      );

  const heroImages = blog.fields?.categories[0]?.fields.heroImage || [];
  const randomHeroImage = heroImages.length
    ? heroImages[Math.floor(Math.random() * heroImages.length)].fields.file.url
    : null;

  return (
    <div>
      <div className="main_Blog bg-brand-bg_white w-[100%] h-auto p-8 border border-brand-primary rounded-[27px] flex flex-row gap-8 justify-center shadow-[0px_4px_0px_0px_#000]">
        <div className="w-1/2 blogHome_leftBox">
          {isHomeBlog ? (
            <img src={blog.image} alt="header" className="w-[100%] h-[100%]" />
          ) : (
            <img src={randomHeroImage} />
          )}
        </div>
        <div
          className={`flex flex-col gap-5 w-1/2 blogHome_rightBox bg-cover bg-center bg-no-repeat ${
            !isHomeBlog ? "justify-center" : ""
          }`}
          style={{ backgroundImage: `url(${""})` }}
        >
          {isHomeBlog ? (
            <>
              <div className="flex FeaturedBlog justify-end text-brand-text_blue font-normal text-[24px] leading-[51px]">
                Featured Blog
              </div>

              <div className="flex flex-col gap-5 pr-14">
                <div className="flex justify-between gap-10 items-center mb-8">
                  <div className="justify-start text-[27px] border font-medium rounded-[27px] px-5 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit">
                    {categories?.map((category: any, index: any) => (
                      <span key={index} className="mr-2">
                        {category}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-center items-center py-1 h-fit border px-5 whitespace-nowrap text-center rounded-[27px] text-brand-primary border-brand-primary">
                    {blog.publishdate}
                  </div>
                </div>

                <div className="flex">
                  <div className="font-bold text-[2rem] text-brand-secondary leading-[52px]">
                    {blog.blogtitle}
                  </div>
                </div>

                <div className="font-normal text-[20px] leading-[25px] text-brand-secondary">
                  {blog.blogdescription}
                </div>

                <div className="flex author_Section justify-between">
                  <div className="border rounded-[27px] px-5 py-1 h-fit text-[24px] font-medium border-brand-border_black text-brand-primary bg-brand-primary w-fit">
                    Read more
                  </div>

                  <div className="flex flex-row gap-3 justify-center items-center">
                    {authors.map((data: any, index: any) => (
                      <div
                        key={index}
                        className="flex gap-4 justify-start items-center"
                      >
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
                    {categories?.map((category: any, index: any) => (
                      <span key={index} className="mr-2">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex">
                  <div className="font-bold text-[42px] text-brand-secondary">
                    {blog.fields.blogtitle}
                  </div>
                </div>

                <div className="flex gap-4">
                  <span>{blog.fields.publishdate}</span>
                  <span>{blog.fields.readTime}</span>
                </div>

                <div className="flex flex-row gap-3">
                  {authors.map((data: any, index: any) => (
                    <div
                      key={index}
                      className="flex gap-4 justify-start items-center"
                    >
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
