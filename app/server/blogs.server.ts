import client from "~/utils/contentful";


const stripMetaFields = (data: any) : any => {
  if (Array.isArray(data)) {
    return data.map(stripMetaFields);
  } else if (data && typeof data === 'object') {
    console.log(data);
    data = data.fields || data;
    const { sys, meta, metadata, ...rest } = data;
    return Object.keys(rest).reduce((cleanData: any, key) => {
      cleanData[key] = stripMetaFields(rest[key]);
      return cleanData;
    }, {});
  }
  return data;
};

type ContentfulBlogFields = {

}

export const getSortedBlogs = async () => {
  const blogResponse = await client.getEntries({
    content_type: "blog",
    include: 2,
    order: "-fields.publishdate",
    limit: 10,
  });

  const blogFileds : BlogList = stripMetaFields(blogResponse.items)
  console.log(JSON.stringify(blogResponse), "separator :::: ",JSON.stringify(blogFileds))

  return {
    all : blogResponse.items,
    data : blogFileds
  };
};



export type BlogList = Blog[]

export interface Blog {
  blogtitle: string
  publishdate: string
  blogdescription: string
  blogurl: string
  categories: Category[]
  content?: Content[]
  author?: Author[]
}

export interface Category {
  name: string
  displayName: string
  heroImage: HeroImage[]
}

export interface HeroImage {
  title: string
  file: File
}

export interface File {
  url: string
  details: Details
  fileName: string
  contentType: string
}

export interface Details {
  size: number
  image: Image
}

export interface Image {
  width: number
  height: number
}

export interface Content {
  subtitle: string
  content: any
}



export interface Author {
  authorName: string
  authorDescOne: string
  authorDescTwo: string
  authorDesignation: string
  authorImage: AuthorImage
}

export interface AuthorImage {
  title: string
  file: File
}

// export interface File2 {
//   url: string
//   details: Details2
//   fileName: string
//   contentType: string
// }

// export interface Details2 {
//   size: number
//   image: Image2
// }

// export interface Image2 {
//   width: number
//   height: number
// }
// export interface Content2 {
//   nodeType: string
//   data: Data
//   content: Content3[]
// }

// export interface Data {}

// export interface Content3 {
//   nodeType: string
//   data: Data2
//   content: Content4[]
// }

// export interface Data2 {}

// export interface Content4 {
//   nodeType: string
//   value?: string
//   marks?: any[]
//   data: Data3
//   content?: Content5[]
// }

// export interface Data3 {
//   uri?: string
// }

// export interface Content5 {
//   nodeType: string
//   value: string
//   marks: any[]
//   data: Data4
// }

// export interface Data4 {}