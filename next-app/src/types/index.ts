export type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  createdAt: Date;
  file?: Blob;
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
  lastname: "string";
  serial: string;
  number: string;
  date: null | Date;
  emailVerified: boolean | null;
  umage: null;
  posts: Post[];
};
