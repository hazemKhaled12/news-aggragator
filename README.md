# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

# News Aggregator App

A modern news aggregation application built with React, TypeScript, and TailwindCSS.

## Features

- Multi-source news aggregation (NewsAPI, NYT, The Guardian)
- Advanced search and filtering
- Personalized news preferences
- Mobile-responsive design
- Real-time updates with React Query

## Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_NEWS_API_KEY=your_newsapi_key
VITE_NYT_API_KEY=your_nyt_key
VITE_GUARDIAN_API_KEY=your_guardian_key
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/news-aggregator.git
cd news-aggregator
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Docker Deployment

1. Build the Docker image:

```bash
docker-compose build
```

2. Run the container:

```bash
docker-compose up -d
```

## Project Structure
