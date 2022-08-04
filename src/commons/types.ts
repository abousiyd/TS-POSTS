export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type TPosts = IPost[];

type TUserId = number;

export type TUserIds = TUserId[];
