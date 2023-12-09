import { db } from '@/db';
import type { Post } from '@prisma/client';
import { notFound } from 'next/navigation';

type Props = {
  fetchPost: () => Promise<Post | null>;
};

export default async function PostShow({ fetchPost }: Props) {
  const post = await fetchPost();

  if (!post) {
    notFound();
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{post.title}</h1>
      <p className="p-4 border rounded">{post.content}</p>
    </div>
  );
}
