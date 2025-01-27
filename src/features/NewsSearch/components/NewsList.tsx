import { StandardArticle } from '../../../services/types';
import { NewsCard } from '../../../components/blocks/NewsCard';

export const NewsList = ({ articles }: { articles: StandardArticle[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <NewsCard key={article.url} article={article} />
      ))}
    </div>
  );
};
