import { Post } from ".";
import { TPosts, IPost, TUserIds } from "../commons/types";
import { DEFAULT_ERROR_MESSAGE } from "../commons/constants";

const User = {
  async all(): Promise<TUserIds> {
    try {
      const posts: TPosts = await Post.all();
      return posts.map((post: IPost) => post.userId);
    } catch (error) {
      console.log(error);
      throw new Error(DEFAULT_ERROR_MESSAGE);
    }
  },
};

export default User;
