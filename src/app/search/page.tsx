import PostList from '@/components/posts/post-list';
import { fetchPostByTerm } from '@/db/queries/post';
import { paths } from '@/paths';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: {
    term: string;
  };
};
export default function SearchPage({ searchParams: { term } }: Props) {
  if (!term) {
    redirect(paths.home());
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">Results for: {term}</h1>
        <PostList fetchData={() => fetchPostByTerm(term)} />
      </div>
    </div>
  );
}
