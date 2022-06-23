export interface News {
  title: string;
  link: string;
  source_id: string;
  keywords: string[] | null;
  creator: string[] | null;
  image_url: string | null;
  video_url: string | null;
  description: string;
  full_description: string | null;
  pubDate: string;
  content: string | null;
  country: string[];
  category: string[];
  language: string;
}
export interface NewsInfo {
  status: string;
  nextPage: number;
  totalResults: number;
  results: News[];
}

export interface NewsPayload {
  country: string;
  lang: string;
}
