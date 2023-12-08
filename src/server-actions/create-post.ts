'use server';

export async function createPost() {
  // revalidate
  // - topic show page, so the post appears in the list
  // Time based revalidation
  // - home page after creation because they are listed there
  // Users don't probably have the expectation to see
  // the post in the homepage immediately after creation
}
