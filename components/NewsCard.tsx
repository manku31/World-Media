import React from "react";
import { Calendar, ExternalLink } from "lucide-react";

// Type definitions
interface Source {
  id?: string | null;
  name: string;
}

interface Article {
  source: Source;
  author?: string | null;
  title: string;
  description?: string | null;
  url: string;
  urlToImage?: string | null;
  publishedAt: string;
  content?: string | null;
}

interface NewsCardProps {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  publishedAt: string;
  source: string;
  url: string;
}

interface NewsGridProps {
  articles?: Article[];
  isLoading?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description = "No description available",
  imageUrl,
  publishedAt,
  source = "Unknown",
  url,
}) => {
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };
  const imageNotFoundUrl =
    "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=";

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const target = e.target as HTMLImageElement;
    target.src = imageNotFoundUrl;
    target.onerror = null; // Prevent infinite fallback loop
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={imageUrl || imageNotFoundUrl}
          alt={title}
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded-md text-sm">
          {source}
        </span>
      </div>

      {/* Content Container */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formatDate(publishedAt)}</span>
            </div>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            Read More
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </article>
  );
};

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-48 rounded-t-lg"></div>
      <div className="p-4 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
};

const NewsGrid: React.FC<NewsGridProps> = ({
  articles = [],
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-gray-600 p-8 bg-white rounded-lg shadow">
          <p className="text-xl">No articles available at the moment.</p>
          <p className="mt-2">Please check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article: Article, index: number) => (
          <NewsCard
            key={`${article.title}-${index}`}
            title={article.title}
            description={article.description}
            imageUrl={article.urlToImage}
            publishedAt={article.publishedAt}
            source={article.source.name}
            url={article.url}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsGrid;

export type { Article, NewsGridProps };
