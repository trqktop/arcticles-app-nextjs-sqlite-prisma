export type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  file?: File;
  fileId?: string
  updatedAt: Date;
  deletedAt: null | Date;
  authorId: null | string;
  author: null | User[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  surname: string;
  password: string;
  role: "1" | "2";
  lastname: string;
  serial: string;
  number: string;
  date: null | Date;
  emailVerified: boolean | null;
  image: null;
  posts: Post[];
  accounts: null
  sessions: null
};

export type File = {
  id?: string
  name: string
  content?: string
  posts?: Post[]
}
export type UpdatedPost = {
  title: string
  content: string
  type: 'update' | 'create'
  fileId: string
  id?: string
  authorId: string
}