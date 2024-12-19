import React, { useState } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, Block, Inline } from "@contentful/rich-text-types";

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

const TableOfContents: React.FC<{ contentItems: ContentItem[] }> = ({
  contentItems,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-blue-500 rounded-lg bg-white">
      {/* Header Section */}
      <div
        className="flex justify-between items-center p-4 border-b border-blue-500 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        role="button"
      >
        <h3 className="text-blue-500 font-semibold text-lg">In this Blog</h3>
        <span
          className={`text-blue-500 transform ${
            isOpen ? "rotate-180" : ""
          } transition-transform`}
        >
          ⌄
        </span>
      </div>

      {/* Content Section */}
      {isOpen && (
        <ul
          className="p-4 overflow-y-auto"
          style={{
            maxHeight: "200px", // Set the height of the box
          }}
        >
          {contentItems.map((item, index) =>
            item.subtitle !== "Introduction" ? (
              <li key={index} className="mb-2">
                <a
                  href={`#subtitle-${index}`}
                  className="text-blue-500 hover:underline"
                >
                  {item.subtitle}
                </a>
              </li>
            ) : null
          )}
        </ul>
      )}
    </div>
  );
};


export default function BlogPostLayout({
  blogPost,
  relatedBlogs,
  authorData,
}: BlogPostProps) {
  const contentItems = blogPost.contentItems;

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="w-3/4 p-4">
        {contentItems.map((item, index) => (
          <div key={index} id={`subtitle-${index}`}>
            {item.subtitle !== "Introduction" && (
              <h3 className="text-2xl font-semibold">{item.subtitle}</h3>
            )}
            <div>{documentToReactComponents(item.content, options)}</div>
          </div>
        ))}

        {/* Author Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">About the Author</h2>
          <div className="flex items-center">
            {authorData?.authorImage && (
              <img
                src={authorData?.authorImage.fields?.file?.url}
                alt={authorData?.authorName}
                className="w-16 h-16 rounded-full mr-4"
              />
            )}
            <div>
              <h3 className="text-xl font-semibold">{authorData?.authorName}</h3>
              <p className="text-md">{authorData?.authorDesignation}</p>
              <p className="mt-2">{authorData?.authorDescOne}</p>
              <p className="mt-2">{authorData?.authorDescTwo}</p>
            </div>
          </div>
        </div>

        {/* Related Blogs Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Read More</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs.map((blog) => (
              <div
                key={blog.sys.id}
                className="border rounded-lg p-4 hover:shadow-lg transition"
              >
                {blog.fields.image && (
                  <img
                    src={blog.fields.image.fields.file.url}
                    alt={blog.fields.blogtitle}
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                )}
                <h3 className="mt-4 text-lg font-semibold">
                  {blog.fields.blogtitle}
                </h3>
                <a
                  href={`/blog/${blog.fields.blogurl}`}
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  Read More
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="w-1/4 p-4 border-l">
        <TableOfContents contentItems={contentItems} />
      </div>
    </div>
  );
}
