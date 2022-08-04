interface IFeedback {
  message: string;
}

const Feedback = ({ message }: IFeedback): JSX.Element => {
  return (
    <div className="feedback">
      <p className="feedback__message">{message}</p>
    </div>
  );
};

export default Feedback;
