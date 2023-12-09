import { db } from '@/db';
import type { Comment } from '@prisma/client';

export type CreateCommentArgs = Pick<Comment, 'content' | 'postId' | 'userId' | 'parentId'>;
export async function createNewComment(args: CreateCommentArgs): Promise<Comment> {
  return db.comment.create({
    data: {
      content: args.content,
      postId: args.postId,
      userId: args.userId,
      parentId: args.parentId,
    },
  });
}

export type CommentWithData = Comment & {
  user: {
    name: string | null;
    image: string | null;
  };
  post: { topic: { slug: string } };
};

export async function fetchAllCommentsByPostId(postId: string): Promise<CommentWithData[]> {
  return db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      post: {
        select: {
          topic: {
            select: {
              slug: true,
            },
          },
        },
      },
    },
  });
}
