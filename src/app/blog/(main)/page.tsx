// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getPosts, Post } from "@/lib/posts";
export const metadata = {
  title: {
    template: "%s | Syboo Blog",
    default: "Syboo Blog",
  },
  description: "Syboo Blog",
};
const HomePage = async () => {
  const posts: Post[] = getPosts();
  getPosts();

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      {/* 카드 리스트 */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {posts.map(({ slug, metadata }) => (
          <Link
            href={`/posts/${slug}`}
            key={slug}
            className="block rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <div className="relative w-full h-64">
                {/* 부모 컨테이너 */}
                {/* 이미지가 있을 경우 렌더링 */}
                {metadata.image && (
                  <Image
                    src={metadata.image}
                    alt={metadata.title}
                    fill
                    className="mx-auto mb-0 rounded-md"
                  />
                )}
              </div>
              <div className="mt-4">
                <span className="text-sm text-red-500 font-medium">
                  {metadata.category}
                </span>
                <h2 className="text-lg font-semibold mt-2">{metadata.title}</h2>
                <p className="text-gray-500 text-sm mt-1">{metadata.desc}</p>
                <div className="flex items-center justify-between mt-4 text-gray-400 text-xs">
                  <span>{metadata.date}</span>
                  {metadata.readingTime && (
                    <span>{metadata.readingTime}분</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
