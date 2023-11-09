import { ReportArticleDetailType, ReportArticleType } from '../components/ReportArticle/types';

export const ARTICLE_LIST: ReportArticleType[] = [
  {
    id: 1,
    elapsedTime: '15',
    viewCount: 12345,
    likeCount: 1234,
    title: '제목입니다제목입니다제목입니다',
    tags: ['태그1', '태그123123', '태그1111'],
  },
  {
    id: 2,
    elapsedTime: '12',
    viewCount: 1234,
    likeCount: 1234,
    title: '제목입니다제목입니다제목입니다',
    tags: ['택~', '태그z', '태그1111'],
  },
  {
    id: 3,
    elapsedTime: '12',
    viewCount: 1234,
    likeCount: 1234,
    title: '제목입니다제목입니다제목입니다',
    tags: ['태그1', '태그123123123', '태그1111'],
  },
];

export const ARTICLE: ReportArticleDetailType = {
  id: 1,
  time: '2023년 11월 7일 17시 50분 12초',
  viewCount: 12345,
  likeCount: 1234,
  title: '제목입니다제목입니다제목입니다',
  userName: '익명12',
  tags: ['태그1', '태그123123', '태그1111'],
  content: '내용입니다내용입니다내용입니다',
  isLike: true,
};
