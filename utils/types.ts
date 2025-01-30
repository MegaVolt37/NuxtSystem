import { FetchOptions } from "ohmyfetch";
export interface IUser {
  // id: number;
  // name: string;
  // email: string;
  // role: string;
  // created_at: Date;
  // updated_at: Date;
  // getUser(): IUser;
  getUserId(): number;
}

export interface IRequestToken {
  access: string;
  refresh: string;
}

export type ApiFunction<T = any> = (options: FetchOptions) => T;

export interface iApi {
  [key: string]: ApiFunction;
}

export type Themes = 'dark' | 'light';

export interface URLLink {
	type?: number
	value?: string
}

export interface UUID {
	uuid: string
}

export interface PickItem<T> extends UUID {
	item: T | null
}