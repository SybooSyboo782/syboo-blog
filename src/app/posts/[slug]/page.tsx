// app/posts/[slug]/page.tsx
import { getPosts, getPostBySlug, Post } from "../../../lib/posts";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

export const metadata = {
  title: {
    template: "%s | Syboo Blog",
    default: "Syboo Blog",
  },
  description: "Syboo Blog",
};

// 동적 경로를 생성하는 함수
export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const slug = (await params).slug;
  const post: Post = getPostBySlug(slug);

  return (
    <div className="mt-8 mx-auto w-full max-w-5xl">
      <h1 className="text-4xl font-bold mb-4">{post.metadata.title}</h1>
      <p className="text-gray-500 mb-8">{post.metadata.date}</p>
      <div className="relative w-full h-64">
        {/* 부모 컨테이너 */}
        {/* 이미지가 있을 경우 렌더링 */}
        {post.metadata.image && (
          <Image
            src={post.metadata.image}
            alt={post.metadata.title}
            fill
            className="mx-auto mb-0 rounded-md"
          />
        )}
      </div>
      <article className="prose pt-4">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
}
