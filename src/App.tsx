import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NewsSearch } from './features/NewsSearch';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import { NewsFeed } from './features/NewsFeed';
import { UserPreferences } from './features/UserPreferences/UserPreferences';

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
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  News Aggregator
                </h1>
              </div>
              <nav className="flex gap-4 ml-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-lg ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                    }`
                  }
                >
                  Feeds
                </NavLink>
                <NavLink
                  to="/search"
                  className={({ isActive }) =>
                    `text-lg ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400 font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                    }`
                  }
                >
                  Search
                </NavLink>
              </nav>
              <UserPreferences />
            </div>
          </header>
          <main className="container mx-auto py-8">
            <Routes>
              <Route path="/" element={<NewsFeed />} />
              <Route path="/search" element={<NewsSearch />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
