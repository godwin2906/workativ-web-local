import type { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import BlogPostLayout from "~/components/BlogPost/blogpostlayout";
import client from "~/utils/contentful";

type Category = { fields: { name: string } };
type ContentItem = { fields: { subtitle: string; content: any } };
type AuthorData = {
  authorName: string;
  authorDescOne: string;
  authorDescTwo: string;
  authorDesignation: string;
  authorImage: { fields: { file: { url: string } } };
};

type Blog = {
  sys: { id: string };
  fields: {
    blogtitle: string;
    author: Array<{ fields: AuthorData }>;
    publishdate: string;
    categories: Category[] | null;
    blogurl: string;
    content: ContentItem[] | null;
  };
};

type LoaderData = {
  currentBlog: {
    authorData: AuthorData;
    fields: {
      blogtitle: string;
      authorname: string;
      publishdate: string;
      categories: Category[] | null;
      blogurl: string;
      content: ContentItem[] | null;
    };
    sys: { id: string };
    contentItems: { subtitle: string; content: any }[];
  };
  relatedBlogs: Array<{
    fields: {
      blogtitle: string;
      blogurl: string;
      categories: Category[] | null;
      image?: { fields: { file: { url: string } } };
    };
    sys: { id: string };
  }>;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  const blogResponse = await client.getEntries({
    content_type: "blog",
    "fields.blogurl": slug,
  });

  if (blogResponse.items.length === 0) {
    throw new Response("Blog not found", { status: 404 });
  }

  const currentBlog = blogResponse.items[0] as unknown as Blog;

  if (!currentBlog || !currentBlog.fields) {
    throw new Response("Blog data is incomplete", { status: 500 });
  }

  const authorData = currentBlog.fields.author[0]?.fields;

  const currentBlogCategories = Array.isArray(currentBlog.fields.categories)
    ? currentBlog.fields.categories.map((category) => category.fields.name)
    : [];

  const allBlogsResponse = await client.getEntries({
    content_type: "blog",
    "fields.blogurl[ne]": slug,
    limit: 100,
  });

  const allBlogs = allBlogsResponse.items as unknown as Blog[];

  const sameCategoryBlogs: Blog[] = [];
  const otherCategoryBlogs: Blog[] = [];

  allBlogs.forEach((blog) => {
    const blogCategories = Array.isArray(blog.fields.categories)
      ? blog.fields.categories.map((category) => category.fields.name)
      : [];

    const hasSameCategory = blogCategories.some((category) =>
      currentBlogCategories.includes(category)
    );

    if (hasSameCategory) {
      sameCategoryBlogs.push(blog);
    } else {
      otherCategoryBlogs.push(blog);
    }
  });

  const totalNeeded = 3;
  const relatedBlogs = [
    ...sameCategoryBlogs.slice(0, totalNeeded),
    ...otherCategoryBlogs.slice(0, totalNeeded - sameCategoryBlogs.length),
  ].slice(0, totalNeeded);

  return json({
    currentBlog: {
      ...currentBlog,
      authorData,
      contentItems: Array.isArray(currentBlog.fields.content)
        ? currentBlog.fields.content.map((item) => ({
            subtitle: item.fields.subtitle,
            content: item.fields.content,
          }))
        : [],
    },
    relatedBlogs,
  });
};


export default function BlogSlug() {
  const { currentBlog, relatedBlogs } = useLoaderData<LoaderData>();

  return (
    <div>
      <BlogPostLayout
        blogPost={currentBlog}
        relatedBlogs={relatedBlogs}
        authorData={currentBlog.authorData} 
      />
    </div>
  );
}
