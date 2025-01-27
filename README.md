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
- pnpm
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
using NPM: npm install
using pnpm: pnpm install
using yarn: yarn install
```

3. Start the development server:

```bash
using NPM: npm run dev
using pnpm: pnpm run dev
using yarn: yarn run dev
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
