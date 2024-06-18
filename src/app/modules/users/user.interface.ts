export type Tuser = {
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Tuserlogin = {
  email: string;
  password: string;
};
