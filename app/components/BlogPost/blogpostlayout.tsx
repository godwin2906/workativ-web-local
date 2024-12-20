import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, Block, Inline } from "@contentful/rich-text-types";
import BlogCta from "../BlogGlobalComponents/blogcta";
import TableOfContents from "../BlogGlobalComponents/blogtoc";
import { getPageRandomImages } from "~/utils/relatedImages";
import BlogHeader from "../BlogGlobalComponents/blogheader";
import graphics from "../../assets/blogImages/author_graphics.png";
import { Link } from "@remix-run/react";
import Clientcta from "../BlogGlobalComponents/clientcta";

type ContentItem = {
  subtitle: string;
  content: any;
};

type BlogPostProps = {
  blogPost: {
    contentItems: ContentItem[];
  };
  relatedBlogs: Array<{
    fields: {
      blogtitle: string;
      blogurl: string;
      image?: { fields: { file: { url: string } } };
      categories?: Array<{ fields: { displayName: string } }>;
      publishdate?: string;
      blogdescription?: string;
      author?: Array<{
        fields: {
          authorName: string;
          authorImage?: { fields: { file: { url: string } } };
        };
      }>;
    };
    sys: { id: string };
  }>;
  authorData: {
    authorName: string;
    authorDescOne: string;
    authorDescTwo: string;
    authorDesignation: string;
    authorImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
};

const options: any = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: Block, children: React.ReactNode) => (
      <p className="mb-4">{children}</p>
    ),
    [BLOCKS.HEADING_3]: (node: Block, children: React.ReactNode) => (
      <h3 className="text-xl font-bold mb-2">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (node: Block, children: React.ReactNode) => (
      <ul className="list-disc ml-4 mb-4">{children}</ul>
    ),
    [INLINES.HYPERLINK]: (node: Inline, children: React.ReactNode) => (
      <a href={node.data.uri} className="text-blue-500 hover:underline">
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: Block) => {
      const file = node.data?.target?.fields?.file;
      const description = node.data?.target?.fields?.description;
      return (
        <img src={file?.url} alt={description} className="w-full h-auto mb-4" />
      );
    },
  },
};

export default function BlogPostLayout({
  blogPost,
  relatedBlogs,
  authorData,
}: BlogPostProps) {
  const contentItems = blogPost.contentItems;
  const pageRandomImages = getPageRandomImages(3);
  return (
    <section className="p-[80px]">
      <div className="pb-[30px]">
        <BlogHeader blog={blogPost} isHomeBlog={false} />
      </div>
      <div className="flex pt-[30px] pb-[30px]">
        <div className="w-3/4 p-4">
          {contentItems.map((item, index) => (
            <div key={index} id={`subtitle-${index}`}>
              {item.subtitle !== "Introduction" && (
                <h3 className="text-2xl font-semibold">{item.subtitle}</h3>
              )}
              <div>{documentToReactComponents(item.content, options)}</div>
            </div>
          ))}
        </div>
        <div className="w-1/4 p-4">
          <TableOfContents contentItems={contentItems} />
          <div className="mt-5">
            <Clientcta />
          </div>
        </div>
      </div>

      <div className="mt-5 w-[80%]">
        <BlogCta
          title="Auto-resolve 60% of Your Employee Queries With Generative AI Chatbot & Automation."
          buttonText="Book a Demo"
          backgroundColor="#F7F4ED"
        />
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">About the Author</h2>
        <div
          className="py-14 pl-20 pr-0  w-[90%] rounded-[21.749px] border-[2.289px] border-[#1C5CFF] shadow-[0px_2.103px_0px_0px_#000]"
          style={{
            backgroundColor: "#FFDEFC;",
          }}
        >
          <div className="flex items-center">
            {authorData?.authorImage && (
              <div className="rounded-full bg-white flex items-center justify-center mr-6 border-2 border-black">
                <img
                  src={authorData?.authorImage.fields?.file?.url}
                  alt={authorData?.authorName}
                  className="object-cover rounded-full w-[36rem]"
                />
              </div>
            )}
            <div className="pl-20">
              <h3 className="text-2xl font-bold mb-1">
                {authorData?.authorName}
              </h3>
              <p className="text-lg font-medium text-gray-600 mb-4">
                {authorData?.authorDesignation}
              </p>
              <p className="text-md text-gray-800 leading-relaxed">
                {authorData?.authorDescOne}
              </p>
              <p className="text-md text-gray-800 leading-relaxed mt-2">
                {authorData?.authorDescTwo}
              </p>
            </div>

            <img src={graphics} className="w-40 h-40" />
          </div>
        </div>
      </div>
      <div className="mt-12 w-[90%]">
        <h2 className="text-2xl font-semibold mb-6">More to Read</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full justify-center items-center">
          {relatedBlogs.map((blog, index) => {
            const image = pageRandomImages[index];
            return (
              <div
                key={index}
                className="flex flex-col w-full transform transition-transform duration-200 hover:-translate-y-3 rounded-[27px]  bg-white shadow-[0px_4px_0px_0px_#1C5CFF]"
              >
                <Link to={`/blog/${blog.fields?.blogurl}`}>
                  <div className="border border-black rounded-tl-[27px] rounded-tr-[27px] rounded-bl-0 rounded-br-0 flex items-center justify-center">
                    <img
                      src={image}
                      alt={`Blog Image ${index + 1}`}
                      className="object-cover w-full h-full rounded-tl-[26px] rounded-tr-[26px]"
                    />
                  </div>

                  <div className="flex flex-col justify-between pt-9 px-7 pb-7 gap-5 rounded-bl-[27px] rounded-br-[27px] rounded-tl-0 rounded-tr-0 border-l border-r border-[#1C5CFF]">
                    <div className="font-bold text-[20px] leading-[25px] line-clamp-2">
                      {" "}
                      {blog.fields.blogtitle}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        {blog.fields.categories?.map(
                          (category, categoryIndex) => (
                            <div
                              key={categoryIndex}
                              className="border rounded-[15px] px-5 py-1 border-brand-primary text-brand-primary bg-brand-primary w-fit text-[15px] font-medium"
                            >
                              {category.fields.displayName}
                            </div>
                          )
                        )}
                      </div>
                      <div className="flex justify-center items-center text-sm font-medium text-brand-text_lightGray border px-5 py-1 rounded-[27px] bg-brand-bg_white border-brand-primary whitespace-nowrap">
                        {blog.fields.publishdate}
                      </div>
                    </div>
                    <div className="line-clamp-3 text-sm text-brand-secondary leading-[24px] font-normal">
                      {blog.fields.blogdescription}
                    </div>
                    {/* <div className="flex justify-end text-sm font-medium text-gray-500">
                      {blog.fields.author && (
                        <div
                          key={index}
                          className="flex gap-4 justify-center items-center"
                        >
                          <img
                            src={
                              blog?.fields?.author[0]?.fields.authorImage.fields
                                .file.url
                            }
                            className="rounded-[100%] w-12 h-12  border border-brand-border_black  bg-brand-primary"
                          />
                          <div className="text-[16px] font-medium leading-[51px] text-brand-secondary">
                            {blog?.fields?.author[0]?.fields.authorName}
                          </div>
                        </div>
                      )}
                    </div> */}
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
