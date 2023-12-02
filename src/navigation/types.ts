export type HomeStackParamList = {
  Home: undefined;
  ReportList: undefined;
  ReportArticleDetail: {
    id: number;
    user: string;
    title: string;
    content: string;
    created_at: string;
    view: number;
    like: number;
    tags: string[];
    isLike: boolean;
  };
  Notification: undefined;
  Setting: undefined;
  Search: undefined;
};

export type LoggedOutStackParamList = {
  Onboarding: undefined;
  DisasterNotiSettings: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SetName: { usename: string; email: string; password: string };
  SelectLocation: undefined;
  CompleteLogin: undefined;
};

export type RootStackParamList = {
  MainTabNavigator: undefined;
};

export type RootTabParamList = {
  Main: undefined;
  Report: undefined;
  Solution: undefined;
};
