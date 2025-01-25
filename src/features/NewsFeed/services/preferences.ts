interface UserPreferences {
  preferredSources: string[];
  preferredCategories: string[];
  preferredAuthors: string[];
}

const STORAGE_KEY = 'userPreferences';

const initialState: UserPreferences = {
  preferredSources: [],
  preferredCategories: [],
  preferredAuthors: [],
};

export const preferencesService = {
  getPreferences(): UserPreferences {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialState;
  },

  setPreferences(preferences: UserPreferences) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  },

  addSource(source: string) {
    const prefs = this.getPreferences();
    if (!prefs.preferredSources.includes(source)) {
      prefs.preferredSources.push(source);
      this.setPreferences(prefs);
    }
  },

  removeSource(source: string) {
    const prefs = this.getPreferences();
    prefs.preferredSources = prefs.preferredSources.filter((s) => s !== source);
    this.setPreferences(prefs);
  },

  addCategory(category: string) {
    const prefs = this.getPreferences();
    if (!prefs.preferredCategories.includes(category)) {
      prefs.preferredCategories.push(category);
      this.setPreferences(prefs);
    }
  },

  removeCategory(category: string) {
    const prefs = this.getPreferences();
    prefs.preferredCategories = prefs.preferredCategories.filter(
      (c) => c !== category
    );
    this.setPreferences(prefs);
  },

  addAuthor(author: string) {
    const prefs = this.getPreferences();
    if (!prefs.preferredAuthors.includes(author)) {
      prefs.preferredAuthors.push(author);
      this.setPreferences(prefs);
    }
  },

  removeAuthor(author: string) {
    const prefs = this.getPreferences();
    prefs.preferredAuthors = prefs.preferredAuthors.filter((a) => a !== author);
    this.setPreferences(prefs);
  },

  reset() {
    this.setPreferences(initialState);
  },
};

export type { UserPreferences };
