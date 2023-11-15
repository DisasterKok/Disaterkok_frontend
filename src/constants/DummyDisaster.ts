import {
  DisasterCategoryType,
  DisasterType,
} from '../components/ReportList/FilterDisaster/SelectDisaster/types';

export const DISASTER_CATEGORY: DisasterCategoryType[] = [
  { id: 1, text: '자연재난' },
  { id: 2, text: '사회재난' },
];

export const NATURAL_DISASTER: DisasterType[] = [
  { id: 1, text: '태풍' },
  { id: 2, text: '호우' },
  { id: 3, text: '폭설' },
  { id: 4, text: '지진/해일' },
  { id: 5, text: '산사태' },
  { id: 6, text: '우박' },
  { id: 7, text: '낙뢰/뇌우' },
  { id: 8, text: '황사/미세먼지' },
  { id: 9, text: '한파' },
  { id: 10, text: '강풍' },
  { id: 11, text: '가뭄' },
  { id: 12, text: '산불' },
  { id: 13, text: '폭염' },
];

export const SOCIAL_DISASTER: DisasterType[] = [
  { id: 14, text: '화재' },
  { id: 15, text: '건축물붕괴' },
  { id: 16, text: '폭발' },
  { id: 17, text: '도로교통사고' },
  { id: 18, text: '철도/지하철 사고' },
  { id: 19, text: '정전/전력부족' },
  { id: 20, text: '감염병' },
  { id: 21, text: '테러사고' },
  { id: 22, text: '인파사고' },
];
