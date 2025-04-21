export interface User {
    _id?: string;
    name?: string;
    email: string;
    passwordHash: string;
    createdAt?:string;
    updatedAt?:string;
    __v?: number;
  }
  

export interface UserLogin {
  token: string;
  user: User;
}
  