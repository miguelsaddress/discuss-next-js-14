'use server';

import { z } from 'zod';
import { MIN_TOPIC_NAME_LENGTH, MAX_TOPIC_NAME_LENGTH } from './create-topic-constants';
import { auth } from '@/auth';

const createTopicSchema = z.object({
  name: z
    .string({ description: 'Name' })
    .min(MIN_TOPIC_NAME_LENGTH)
    .max(MAX_TOPIC_NAME_LENGTH)
    .regex(/^[a-z-]+$/, { message: 'A topic name must be all lowercase and can include dashes, but no spaces' }),
  description: z.string().min(10).max(250),
});

export type CreateTopicFormState = {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
};

export async function createTopic(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {
  const session = await auth();

  if (!session?.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this'],
      },
    };
  }

  const validation = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  return { errors: {} };
  // revalidate home page after creation because
  // they are listed there
}
