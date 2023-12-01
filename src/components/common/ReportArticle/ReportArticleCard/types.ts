import { ImageSourcePropType } from 'react-native';

export interface ReportArticleType {
  id: number;
  created_at: string;
  view: number;
  like: number;
  title: string;
  tags: string[];
}

export interface ReportArticleDetailType {
  id: number;
  time: string;
  view: number;
  like: number;
  title: string;
  userName: string;
  tags: string[];
  content: string;
  isLike: boolean;
}
