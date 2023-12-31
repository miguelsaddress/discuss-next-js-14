'use server';

import { z } from 'zod';

import type { Topic } from '@prisma/client';
import { db } from '@/db';

import {
  MIN_TOPIC_NAME_LENGTH,
  MAX_TOPIC_NAME_LENGTH,
  MIN_TOPIC_DESCRIPTION_LENGTH,
  MAX_TOPIC_DESCRIPTION_LENGTH,
} from './create-topic-constants';
import { auth } from '@/auth';

import { paths } from '@/paths';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
  name: z
    .string({ description: 'Name' })
    .min(MIN_TOPIC_NAME_LENGTH)
    .max(MAX_TOPIC_NAME_LENGTH)
    .regex(/^[a-z-]+$/, { message: 'A topic name must be all lowercase and can include dashes, but no spaces' }),
  description: z.string().min(MIN_TOPIC_DESCRIPTION_LENGTH).max(MAX_TOPIC_DESCRIPTION_LENGTH),
});

type CreateTopicFormState = {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
};

export async function createTopic(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {
  const validation = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
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
    topic = await db.topic.create({
      data: {
        slug: validation.data.name,
        description: validation.data.description,
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
        _form: [`The topic couldn't be created`],
      },
    };
  }

  // revalidate home page after creation because
  // they are listed there
  revalidatePath(paths.home());
  redirect(paths.topicShow(topic.slug));
}
