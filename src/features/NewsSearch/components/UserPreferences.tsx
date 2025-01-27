import React from 'react';

export const UserPreferences: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Your Preferences
        </h2>
        <button
          // onClick={reset}
          className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Preferred Sources</h3>
          <div className="flex flex-wrap gap-2">
            {/* {preferences.preferredSources.map((source) => (
              <span
                key={source}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {source}
                <button
                  onClick={() => removeSource(source)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))} */}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Preferred Categories</h3>
          <div className="flex flex-wrap gap-2">
            {/* {preferences.preferredCategories.map((category) => (
              <span
                key={category}
                className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {category}
                <button
                  onClick={() => removeCategory(category)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};
