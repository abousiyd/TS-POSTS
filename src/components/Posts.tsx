import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import PostCard from "./Post";
import Search from "./Search";
import { USER_HOME } from "../commons/constants";
import Feedback from "./Feedback";
import BottomBar from "./BottomBar";
import { Post } from "../services";
import storage from "../utils/storage";
import { TPosts, IPost } from "../commons/types";
const TOTAL_POSTS_TO_SHOW = 14;

const Posts: React.FC = (): JSX.Element => {
  const [userId, setUserId] = useState<number | null>(null);
  const [posts, setPosts] = useState<TPosts>([]);
  const [postsCopy, setPostsCopy] = useState<TPosts>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const _userId = storage.getItem("userId");
    const _allPosts = storage.getItem("posts") || [];

    if (!_userId) navigate("/");
    else setUserId(Number(_userId));

    async function loadPosts() {
      try {
        const data: TPosts = await Post.all();
        setPosts(data);
        storage.setItem("posts", data);
        const firstTeenPosts = data.slice(0, TOTAL_POSTS_TO_SHOW);
        setPostsCopy(firstTeenPosts);
      } catch (error: Error | unknown) {
        if (error instanceof Error) setFeedback(error.message);
      }
    }
    if (_allPosts.length) {
      setPosts(_allPosts);
      setPostsCopy(_allPosts.slice(0, TOTAL_POSTS_TO_SHOW));
    } else loadPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      const data: TPosts = !!searchQuery ? postsCopy : posts;
      const nextPosts: TPosts = data.slice(
        0,
        postsCopy.length + TOTAL_POSTS_TO_SHOW
      );
      setPostsCopy(nextPosts);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [postsCopy]);

  const handleSearch = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const query: string = value.toLocaleLowerCase();
    filterPosts(query);
    setSearchQuery(query);
  };

  const filterPosts = (value: string, filtredPost?: any) => {
    const query: string = value.toLocaleLowerCase();

    if (!query) {
      const firstTeenPosts = posts.slice(0, TOTAL_POSTS_TO_SHOW);
      setPostsCopy(firstTeenPosts);
      setFeedback("");
      setSearchQuery("");
      return;
    }

    const filtredPosts: TPosts = (filtredPost || posts).filter(
      ({ userId, title, body }: IPost) =>
        userId === Number(query) ||
        title.toLocaleLowerCase().includes(query) ||
        body.toLocaleLowerCase().includes(query)
    );

    setPostsCopy(filtredPosts);
    if (filtredPosts.length) {
      setFeedback("");
    } else setFeedback(USER_HOME.PostsNotFound);
  };

  const handleRemovePost = (id: number) => {
    const filtredPosts = posts.filter((post: IPost) => post.id !== id);
    setPosts(filtredPosts);
    setPostsCopy(filtredPosts);
    storage.setItem("posts", filtredPosts);
    if (Number(searchQuery)) filterPosts(searchQuery, filtredPosts);
  };

  return (
    <>
      <Search handleSearch={handleSearch} />
      <Feedback message={feedback} />
      {!feedback && (
        <h3 className="title">
          Welcome user 
          <Link className="title__id" to="/profile">
            {userId}
          </Link>
          , you can see and filter all the posts also delete the ones that
          belong to you.
        </h3>
      )}
      <div className="posts">
        {postsCopy?.map(
          (post: IPost): JSX.Element => (
            <PostCard
              key={post.id}
              currentUserId={userId}
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
