import { LoaderFunction } from "@remix-run/node";
import { json, Outlet, redirect, useLoaderData } from "@remix-run/react";
import Bloghomelayout from "~/components/BlogHome/bloghomelayout";
import { Blog, getSortedBlogs } from "~/server/blogs.server";
import client from "~/utils/contentful";


const makeHeroBlogEntity = (blog: Blog) => {
  const images = blog.categories.map((category) => category.heroImage.map((image) => image.file.url)).flat()
  const randomElement = images[Math.floor(Math.random() * images.length)];

  return {
    blogtitle: blog.blogtitle,
    blogdescription: blog.blogdescription,
    publishdate: blog.publishdate,
    readTime: blog.blogdescription,
    author: blog.author != undefined ? blog.author : [],
    categories: blog.categories.map((category) => ({ name: category.name, displayName: category.displayName })),
    blogurl: blog.blogurl,
    image: randomElement,
  }

};

export const loader = async () => {
  const blogResponse = await getSortedBlogs()


  const blogData = blogResponse.data

  const latestBlog = blogData[0]

  if (latestBlog) {
    const heroBlog = makeHeroBlogEntity(latestBlog)
    const categoryResponse = await client.getEntries({
      content_type: "categories",
    });
    return json({
      blogs: blogResponse.all,
      categories: categoryResponse.items,
      heroBlog,
      blog: blogData,
    });
  }

  return redirect("/")
};

function blog() {
  const { blogs, categories, heroBlog, blog } = useLoaderData<typeof loader>();

  console.log("blogs", blog);

  return (
    <Bloghomelayout blogs={blogs} categories={categories} heroBlog={heroBlog} />
  );
}

export default blog;
