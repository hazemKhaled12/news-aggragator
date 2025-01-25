import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NewsFeed } from './features/NewsFeed/NewsFeed';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              News Aggregator
            </h1>
          </div>
        </header>
        <main className="container mx-auto py-8">
          <NewsFeed />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
