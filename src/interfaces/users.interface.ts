export interface User {
  id: string;
  email: string;
  password: string;
  name: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}
