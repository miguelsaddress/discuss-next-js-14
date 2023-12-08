type Props = {
  params: {
    slug: string;
  };
};

export default function CreatePostPage({ params: { slug } }: Props) {
  return `Create Post Page, Topic Slug: ${slug}`;
}
