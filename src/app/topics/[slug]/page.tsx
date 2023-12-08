type Props = {
  params: {
    slug: string;
  };
};

export default function TopicShowPage({ params: { slug } }: Props) {
  return `Topic Show Page: ${slug}`;
}
