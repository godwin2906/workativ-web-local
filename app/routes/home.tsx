import { LoaderFunction } from "@remix-run/node";
import { json, Outlet, redirect, useLoaderData } from "@remix-run/react";
import Bloghomelayout from "~/components/BlogHome/bloghomelayout";
import { Blog, BlogList, getCategories, getSortedBlogs } from "~/server/blogs.server";
import client from "~/utils/contentful";
import { getRandomImagesForPage, getRandomImage } from "~/utils/image";


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
  const randomImages = getRandomImagesForPage(1);
  console.log("randomImages", randomImages);

  const blogData = blogResponse.data

  const latestBlog = blogData[0]

  if (latestBlog) {
    const heroBlog = makeHeroBlogEntity(latestBlog)
    const categoryResponse = await client.getEntries({
      content_type: "categories",
    });

    const categoryData = await getCategories()
    return json({
      blogs: blogResponse.all,
      categories: categoryResponse.items,
      heroBlog,
      blogData: blogData.map((blog) => ({ ...blog, image: getRandomImage() })),
      category: categoryData,
    });
  }


  return redirect("/")
};

function blog() {
  const { blogs, categories, heroBlog, category, blogData } = useLoaderData<typeof loader>();

  return (
    <Bloghomelayout blogs={blogs} categories={categories} heroBlog={heroBlog} blogList={blogData as (Blog & { image: string })[]} category={category} />
  );
}

export default blog;
