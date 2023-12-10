import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

/**
 * - gets the type of what the function returns
 * - [number] => take one element inside the returned array
 * - wraps it in a Promise type (awaited)
 *
 * export type PostWithData = Awaited<ReturnType<typeof fetchPostsByTopicSlug>>[number];
 * */

export async function fetchPostsByTopicSlug(topicSlug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: {
      topic: {
        slug: topicSlug,
      },
    },
    include: {
      user: { select: { name: true } },
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
    },
  });
}

export async function findPostById(postId: string): Promise<Post | null> {
  return await db.post.findFirst({
    where: { id: postId },
  });
}

export async function fetchTopPosts(): Promise<PostWithData[]> {
  return db.post.findMany({
    // order by comment count desc, take top 5
    orderBy: {
      comments: {
        _count: 'desc',
      },
    },
    include: {
      user: { select: { name: true } },
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
    },
    take: 5,
  });
}
