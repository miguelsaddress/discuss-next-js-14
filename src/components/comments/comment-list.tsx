import CommentShow from '@/components/comments/comment-show';
import { CommentWithData } from '@/db/queries/comment';
import type { Comment } from '@prisma/client';

type Props = {
  comments: CommentWithData[];
  topicSlug: string;
};

// TODO: Get a list of comments from somewhere
export default function CommentList({ comments, topicSlug }: Props) {
  const topLevelComments = comments.filter((comment) => comment.parentId === null);
  const renderedComments = topLevelComments.map((comment) => {
    return <CommentShow key={comment.id} commentId={comment.id} comments={comments} topicSlug={topicSlug} />;
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
