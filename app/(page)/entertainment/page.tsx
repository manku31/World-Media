"use client";

import { useState, useEffect } from "react";
import NewsGrid, { type Article } from "@/components/NewsCard";
import axios from "axios";

export default function Entertainment() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const newsdata = axios.get(
      "https://newsapi.org/v2/top-headlines?apiKey=941884a072de432bbc62d9261d4d9691&category=entertainment"
    );
    newsdata.then((response) => {
      setArticles(response.data.articles);
      setIsLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 py- ml-16">
          Latest entertainment News
        </h1>
        <NewsGrid articles={articles} isLoading={isLoading} />
      </div>
    </main>
  );
}
