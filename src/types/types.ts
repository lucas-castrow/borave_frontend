export type ProfileType = {
  id: string;
  name: string;
  username: string;
  photo: string | null;
  commonFriends: Array<String>;
};

export type PostType = {
  id: string;
  postedBy: string;
  postedUsername: string;
  content: Array<String>;
  sendAt: Date;
  senderPhoto: string;
  friendLevelStories: number;
};
