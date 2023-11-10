export type HomeStackParamList = {
  Home: undefined;
  ReportList: undefined;
  ReportArticleDetail: undefined;
};

export type LoggedOutStackParamList = {
  Onboarding: undefined;
  DisasterNotiSettings: undefined;
  SignIn: undefined;
  SignUp: undefined;
  SetName: { id: string; email: string; password: string };
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