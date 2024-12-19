import { LoaderFunction } from "@remix-run/node";
import { json, Outlet, useLoaderData } from "@remix-run/react";
import Bloghomelayout from "~/components/BlogHome/bloghomelayout";
import client from "~/utils/contentful";

export const loader: LoaderFunction = async () => {
  const blogResponse = await client.getEntries({
    content_type: "blog",
    include: 2, 
  });

  const categoryResponse = await client.getEntries({
    content_type: "categories",
  });

  return json({
    blogs: blogResponse.items,
    categories: categoryResponse.items,
  });
};

function blog() {
  const { blogs, categories }: { blogs: any[]; categories: any[] } = useLoaderData();

  return (
    <div>
      <Bloghomelayout blogs={blogs} categories={categories} />
      <Outlet />
    </div>
  );
}

export default blog;
