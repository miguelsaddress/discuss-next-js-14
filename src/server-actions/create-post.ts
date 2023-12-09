'use server';

import { z } from 'zod';

import type { Post, Topic } from '@prisma/client';
import { db } from '@/db';

import { auth } from '@/auth';

import { paths } from '@/paths';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import {
  MAX_POST_CONTENT_LENGTH,
  MAX_POST_TITLE_LENGTH,
  MIN_POST_CONTENT_LENGTH,
  MIN_POST_TITLE_LENGTH,
} from './create-post-constants';

const createPostSchema = z.object({
  title: z.string().min(MIN_POST_TITLE_LENGTH).max(MAX_POST_TITLE_LENGTH),
  content: z.string().min(MIN_POST_CONTENT_LENGTH).max(MAX_POST_CONTENT_LENGTH),
});

type CreatePostFormState = {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
};

export async function createPost(
  topicSlug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const validation = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session?.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this'],
      },
    };
  }

  let topic: Topic;
  try {
    // await new Promise((r) => setTimeout(r, 2500));
    // throw new Error('Failed....');
    topic = await db.topic.findFirstOrThrow({
      where: {
        slug: topicSlug,
      },
    });
  } catch (error) {
    return {
      errors: {
        _form: [`The topic '${topicSlug}' couldn't be found`],
      },
    };
  }

  let post: Post;
  try {
    // await new Promise((r) => setTimeout(r, 2500));
    // throw new Error('Failed....');
    const topic = await db.topic.findFirstOrThrow({
      where: {
        slug: topicSlug,
      },
    });

    post = await db.post.create({
      data: {
        title: validation.data.title,
        content: validation.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    }
    return {
      errors: {
        _form: [`The post couldn't be created`],
      },
    };
  }

  // revalidate
  // - topic show page, so the post appears in the list
  // Time based revalidation
  // - home page after creation because they are listed there
  // Users don't probably have the expectation to see
  // the post in the homepage immediately after creation

  const topicPath = paths.topicShow(topicSlug);
  revalidatePath(topicPath);
  redirect(paths.postShow(topicSlug, post.id));
}
