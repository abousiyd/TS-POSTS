import { IPost } from "../commons/types";

interface IPostCardProps extends IPost {
  handleRemovePost: (postId: number) => void;
  currentUserId: number | null;
}

const PostCard = ({
  userId,
  title,
  body,
  id,
  currentUserId,
  handleRemovePost,
}: IPostCardProps): JSX.Element => {
  const isMyPost = currentUserId === userId;
  const imageModifier = isMyPost ? "post__user__image--admin" : "";
  const postModifier = isMyPost ? "post--admin" : "";

  return (
    <div className={`post ${postModifier}`} key={id}>
      {isMyPost && (
        <span
          className="post__delete"
          role="button"
          onClick={() => handleRemovePost(id)}
        >
          &#215;
        </span>
      )}
      <div className="post__user">
        <img
          className={`post__user__image ${imageModifier}`}
          src={`https://eu.ui-avatars.com/api/?name=${userId}`}
        />
      </div>
      <h1 className="post__title">{title}</h1>
      <p className="post__body">{body}</p>
    </div>
  );
};

export default PostCard;
