import CommentShow from '@/components/comments/comment-show';
import type { CommentWithData } from '@/db/queries/comment';

type Props = {
  fetchData: () => Promise<CommentWithData[]>;
};

// TODO: Get a list of comments from somewhere
export default async function CommentList({ fetchData }: Props) {
  const comments = await fetchData();
  const topLevelComments = comments.filter((comment) => comment.parentId === null);
  const renderedComments = topLevelComments.map((comment) => {
    return <CommentShow key={comment.id} commentId={comment.id} comments={comments} />;
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
