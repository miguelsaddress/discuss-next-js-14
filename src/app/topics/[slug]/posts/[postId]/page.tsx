import Link from 'next/link';
import PostShow from '@/components/posts/post-show';
import CommentList from '@/components/comments/comment-list';
import CommentCreateForm from '@/components/comments/comment-create-form';
import { paths } from '@/paths';
import { findPostById } from '@/db/queries/post';
import { fetchAllCommentsByPostId } from '@/db/queries/comment';

type Props = {
  params: {
    slug: string;
    postId: string;
  };
};

export default async function PostShowPage({ params }: Props) {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {'< '}Back to {slug}
      </Link>
      <PostShow fetchPost={() => findPostById(postId)} />
      <CommentCreateForm postId={postId} topicSlug={slug} startOpen />
      <CommentList fetchData={() => fetchAllCommentsByPostId(postId)} />
    </div>
  );
}
