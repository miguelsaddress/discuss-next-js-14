import FormButton from '@/components/common/form-button';
import PostCreateForm from '@/components/posts/post-create-from';

type Props = {
  params: {
    slug: string;
  };
};

export default function TopicShowPage({ params: { slug } }: Props) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
      </div>
      <div>
        <PostCreateForm topicSlug={slug} />
      </div>
    </div>
  );
}
