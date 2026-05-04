/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export type Category = 
  | 'India' 
  | 'World' 
  | 'Politics' 
  | 'Economy' 
  | 'Tech' 
  | 'Science' 
  | 'Culture' 
  | 'Opinion' 
  | 'Sports' 
  | 'Entertainment' 
  | 'Education' 
  | 'Environment'
  | 'Health'
  | 'Lifestyle';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: Category;
  date: string;
  image: string;
  featured?: boolean;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
