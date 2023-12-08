type Props = {
  params: {
    slug: string;
    postId: string;
  };
};

export default function ShowPostPage({ params: { slug, postId } }: Props) {
  return `Show Post Page, Topic Slug: ${slug} - Post Id: ${postId}`;
}
