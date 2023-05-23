export interface articleInterface {
  author: {
    bio: string;
    following: boolean;
    image: string;
    username: string;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export interface IFetchAllArticlesInterface {
  offset: number;
}

export interface IArticlesResponse {
  articles: articleInterface[];
  articlesCount: number;
}
export interface IExtendArticleResponse {
  article: articleInterface;
}
export interface IEditArticlesResponse {
  data: IExtendArticleResponse;
}

export interface IUserData {
  email: string;
  password: string;
  repeatPassword: string;
  remember: boolean;
  username: string;
  image: string;
}

export interface IUserInterface {
  username?: string;
  email?: string;
  password?: string;
  isLogin?: boolean;
  avatar?: string;
}
export interface ITagInterface {
  tagName: string;
}
