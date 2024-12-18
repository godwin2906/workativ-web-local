import type { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import BlogPostLayout from "~/components/BlogPost/blogpostlayout";
import client from "~/utils/contentful";

type LoaderData = {
  fields: {
    blogtitle: string;
    authorname: string;
    publishdate: string;
    content: Array<{
      fields: {
        subtitle: string;
        content: any;
      };
    }>;
  };
  sys: {
    id: string;
  };
  contentItems: Array<{
    subtitle: string;
    content: any;
  }>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  const response = await client.getEntries({
    content_type: "blog",
    "fields.blogurl": slug,
  });

  if (response.items.length === 0) {
    throw new Response("Blog not found", { status: 404 });
  }

  const blogPost = response.items[0];

  const contentItems = Array.isArray(blogPost.fields.content)
    ? blogPost.fields.content.map((item: any) => {
        const subtitle = item.fields.subtitle;
        const content = item.fields.content;
        return { subtitle, content };
      })
    : [];

  return json({ ...blogPost, contentItems });
};

export default function BlogSlug() {
  const blogPost = useLoaderData<LoaderData>();
  return (
    <div>
      <BlogPostLayout blogPost={blogPost} />
    </div>
  );
}
