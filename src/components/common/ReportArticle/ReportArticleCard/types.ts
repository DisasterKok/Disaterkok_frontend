export interface ReportArticleType {
  id: number;
  user: string;
  title: string;
  content: string;
  created_at: string;
  view: number;
  like: number;
  tags: string[];
}
