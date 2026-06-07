export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image?: string;
  readingTime: number;
  lang: "tr" | "en";
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}