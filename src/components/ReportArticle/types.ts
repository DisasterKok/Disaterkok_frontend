import { ImageSourcePropType } from 'react-native';

export interface ReportArticleType {
  id: number;
  elapsedTime: string; // 어떤 시간 형식으로 주는지 확인 후 수정
  viewCount: number;
  likeCount: number;
  title: string;
  tags: string[];
}
