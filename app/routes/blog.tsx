import { LoaderFunction } from "@remix-run/node";
import { json, Outlet, useLoaderData } from "@remix-run/react";
import Bloghomelayout from "~/components/BlogHome/bloghomelayout";
import client from "~/utils/contentful";

export const loader: LoaderFunction = async () => {
  const response = await client.getEntries({
    content_type: "blog",
  });


  return json(response.items);
};

function blog() {
  const blogs: [] = useLoaderData();

  return (
    <div>
      <Bloghomelayout blogs={blogs} />
      <Outlet />
    </div>
  );
}

export default blog;
