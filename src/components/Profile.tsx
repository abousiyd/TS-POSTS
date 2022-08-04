import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostCard from "./Post";
import { USER_PROFILE } from "../commons/constants";
import Feedback from "./Feedback";
import BottomBar from "./BottomBar";
import { Post } from "../services";
import storage from "../utils/storage";
import { TPosts, IPost } from "../commons/types";

const Posts: React.FC = (): JSX.Element => {
  const [userId, setUserId] = useState<string | null>(null);
  const [posts, setPosts] = useState<TPosts>([]);
  const [feedback, setFeedback] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const _userId = storage.getItem("userId");
    const _allPosts = storage.getItem("posts") || [];
    const _userPosts = _allPosts.filter(
      (post: IPost) => post.userId === _userId
    );

    if (!_userId) navigate("/");
    else setUserId(_userId);

    async function loadPosts() {
      try {
        const data: TPosts = await Post.all();
        const userPosts = data.filter((post) => post.userId === _userId);
        setPosts(userPosts);
        storage.setItem("posts", data);
      } catch (error: Error | unknown) {
        if (error instanceof Error) setFeedback(error.message);
      }
    }

    if (_userPosts.length) setPosts(_userPosts);
    else loadPosts();
  }, []);

  const handleRemovePost = (id: number) => {
    const filtredUserPosts = posts.filter((post: IPost) => post.id !== id);
    setPosts(filtredUserPosts);
    if (!filtredUserPosts.length) setFeedback(USER_PROFILE.PostsRemoved);
    
    const _allPosts = storage.getItem("posts") || [];
    const allPostsFiltred = _allPosts.filter((post: IPost) => post.id !== id);
    storage.setItem("posts", allPostsFiltred);
  };

  return (
    <>
      <Feedback message={feedback} />
      {!feedback && (
        <h3 className="title">
          Welcome user <span className="title__id">{userId}</span>, your posts:
        </h3>
      )}
      <div className="posts">
        {posts?.map(
          (post: IPost): JSX.Element => (
            <PostCard
              key={post.id}
              currentUserId={Number(userId)}
              handleRemovePost={handleRemovePost}
              {...post}
            />
          )
        )}
      </div>
      <BottomBar />
    </>
  );
};

export default Posts;
