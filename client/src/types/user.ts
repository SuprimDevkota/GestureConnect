export interface IUser {
  token: {
    refresh: string;
    access: string;
  };
  info: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
  };
}
