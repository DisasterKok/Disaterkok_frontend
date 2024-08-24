export interface User {
  username: string;
  token: {
    access: string;
    refresh: string;
  };
  locData: boolean;
}
