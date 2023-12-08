'use server';

export async function createComment() {
  // revalidate
  // - post show, so the post appears in the list
  // Time based revalidation
  // - home page after creation because the number of comments of a post is shown there
  // Users don't probably have the expectation to see immediately the real number of
  // comments of a post when visiting the Home Page (or will even notice if
  // the number mismatches)
}
