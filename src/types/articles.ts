import { articleInterface } from "../interfaces/article";

export interface articleState {
  articles: articleInterface[];
  loading: boolean;
  error: null | string;
  offset: number;
}
