'use server';

import { paths } from '@/paths';
import { redirect } from 'next/navigation';
import { PostWithData, fetchPostByTerm } from '@/db/queries/post';

type CreatePostFormState = {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
};

export async function searchPosts(formData: FormData): Promise<CreatePostFormState> {
  const term = formData.get('term') as string;
  if (!term || typeof term !== 'string') {
    redirect(paths.home());
  }

  redirect(paths.postSearch(term));
}
