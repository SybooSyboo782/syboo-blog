// lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMetadata = {
  title: string;
  date: string;
  desc: string;
  image: string;
  category: string;
  readingTime: string;
};

export type Post = {
  slug: string;
  metadata: PostMetadata;
  content: string;
};

const postsDirectory = path.join(process.cwd(), "src/posts");

// 모든 게시글 가져오기
export function getPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);

  // 파일 생성 시간 기준으로 정렬
  const sortedFileNames = fileNames.toSorted((a, b) => {
    const aStat = fs.statSync(path.join(postsDirectory, a));
    const bStat = fs.statSync(path.join(postsDirectory, b));
    return aStat.birthtimeMs - bStat.birthtimeMs; // 생성 시간 오름차순
  });

  return sortedFileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      metadata: data as PostMetadata,
      content,
    };
  });
}

// 특정 게시글 가져오기
export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    metadata: data as PostMetadata,
    content,
  };
}
