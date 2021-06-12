export interface User {
  nickname: string,
  gameId: string,
  userId: string,
};

export type UserJoinRequest = Omit<User, "userId">;

export type UserContextContent = {
  user?: User,
  setUser: (user: User) => void
};