export type HomeStackParamList = {
  Home: undefined;
  ReportList: undefined;
  ReportArticleDetail: {
    id: number;
  };
  CompleteReportPost: {
    id: number;
  };
  Notification: undefined;
  Setting: undefined;
  Search:
    | undefined
    | {
        keywordInput?: string;
      };
};

export type UserInputStackParamList = {
  SelectLocation: undefined;
  DisasterNotiSettings: undefined;
};

export type LoggedOutStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SetName: { usename: string; email: string; password: string };
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
