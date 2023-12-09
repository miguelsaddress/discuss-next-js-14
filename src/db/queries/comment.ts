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
