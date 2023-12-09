'use server';

import { auth } from '@/auth';
import { createNewComment } from '@/db/queries/comment';
import { paths } from '@/paths';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { MAX_COMMENT_CONTENT_LENGTH, MIN_COMMENT_CONTENT_LENGTH } from './create-comment-constants';

type Args = {
  topicSlug: string;
  postId: string;
  parentId: string | undefined;
};

type CreateCommentFormState = {
  success?: boolean;
  errors: {
    content?: string[];
    _form?: string[];
  };
};

const createCommentSchema = z.object({
  content: z.string().min(MIN_COMMENT_CONTENT_LENGTH).max(MAX_COMMENT_CONTENT_LENGTH),
});

export async function createComment(
  args: Args,
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const validation = createCommentSchema.safeParse({
    content: formData.get('content'),
  });

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      success: false,
      errors: {
        _form: ['You must be signed in to do this'],
      },
    };
  }

  const comment = createNewComment({
    content: validation.data.content,
    parentId: args.parentId || null,
    postId: args.postId,
    userId: session?.user?.id,
  });
  revalidatePath(paths.postShow(args.topicSlug, args.postId));
  // revalidate
  // - post show, so the post appears in the list
  // Time based revalidation
  // - home page after creation because the number of comments of a post is shown there
  // Users don't probably have the expectation to see immediately the real number of
  // comments of a post when visiting the Home Page (or will even notice if
  // the number mismatches)
  return {
    success: true,
    errors: {},
  };
}
