import { TPosts } from "../commons/types";
import { DOMAIN_API, DEFAULT_ERROR_MESSAGE } from "../commons/constants";

const Post = {
  async all(): Promise<TPosts> {
    try {
      const response = await fetch(`${DOMAIN_API}/posts`);
      const posts: TPosts = await response.json();
      return posts;
    } catch (error) {
      console.log(error);
      throw new Error(DEFAULT_ERROR_MESSAGE);
    }
  },
  async find(userId: string | null): Promise<TPosts> {
    try {
      const response = await fetch(`${DOMAIN_API}/posts?userId=${userId}`);
      const posts: TPosts = await response.json();
      return posts;
    } catch (error) {
      console.log(error);
      throw new Error(DEFAULT_ERROR_MESSAGE);
    }
  },
};

export default Post;
