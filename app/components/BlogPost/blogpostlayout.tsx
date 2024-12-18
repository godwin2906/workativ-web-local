import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  INLINES,
  Block,
  Inline,
  Text,
} from "@contentful/rich-text-types";

type BlogPostProps = {
  blogPost: any;
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
    [BLOCKS.OL_LIST]: (node: Block, children: React.ReactNode) => (
      <ol className="list-disc ml-4 mb-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: Block, children: React.ReactNode) => (
      <li className="mb-2">{children}</li>
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

export default function BlogPostLayout({ blogPost }: BlogPostProps) {
  const contentItems = blogPost.contentItems;

  const tocItems = contentItems
    .filter((item: any) => item.subtitle !== "Introduction")
    .map((item: any, index: number) => (
      <li key={index}>
        <a
          href={`#subtitle-${index}`}
          className="text-blue-500 hover:underline"
        >
          {item.subtitle}
        </a>
      </li>
    ));

  return (
    <div className="flex">

      <div className="w-3/4 p-4">
        {contentItems.map((item: any, index: number) => (
          <div key={index} id={`subtitle-${index}`}>
            {item.subtitle !== "Introduction" && (
              <h3 className="text-2xl font-semibold">{item.subtitle}</h3>
            )}
            <div>{documentToReactComponents(item.content, options)}</div>
          </div>
        ))}
      </div>


      <div className="w-1/4 p-4 border-l">
        <h3 className="text-lg font-semibold mb-2">Table of Contents</h3>
        <ul className="list-disc ml-4">{tocItems}</ul>
      </div>
    </div>
  );
}
