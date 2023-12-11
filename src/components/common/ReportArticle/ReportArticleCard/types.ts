interface ImageData {
  id: number;
  image: string;
}

export interface ReportArticleType {
  id: number;
  user: string;
  title: string;
  content: string;
  created_at: string;
  images: ImageData[];
  view: number;
  like: number;
  tags: string[];
}
