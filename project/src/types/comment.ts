import { User } from './user';

export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
}

export type NewComment = {
  comment: string;
  rating: number;
  id: number;
}
