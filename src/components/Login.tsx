import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../services";
import { TUserIds } from "../commons/types";
import Feedback from "./Feedback";
import storage from "../utils/storage";
import { LOGIN } from "../commons/constants";

const Login: React.FC = (): JSX.Element => {
  const [feedback, setFeedback] = useState<string>("");
  const [inputValue, setInputValue] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleOnChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (value) setInputValue(Number(value))
    else setFeedback(LOGIN.invalidInput)
  };

  const validateUser = async () => {
    if (!inputValue) return setFeedback(LOGIN.invalidInput);
    try {
      const userIds: TUserIds = await User.all();
      const userExist = userIds.some((id) => id === inputValue);

      if (userExist) {
        storage.setItem("userId", inputValue);
        navigate("/home");
      } else setFeedback(LOGIN.userNotFound);
    } catch (error: Error | unknown) {
      if (error instanceof Error) setFeedback(error.message);
    }
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateUser();
  };

  return (
    <section className="login">
      <Feedback message={feedback} />
      {!feedback && <h3 className="login__title">{LOGIN.welcome}</h3>}
      <form onSubmit={handleOnSubmit}>
        <input
          className="login__input"
          type="number"
          name="userid"
          placeholder="Enter your user id"
          onChange={handleOnChange}
          min="1"
        />
        <button className="login__button" type="submit">
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
