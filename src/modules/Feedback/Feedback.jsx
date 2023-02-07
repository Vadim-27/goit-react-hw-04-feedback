import { useState } from 'react';

import FeedbackBlock from 'modules/FeedbackBlocK/FeedbackBlock';
import FeedbackVariants from './FeetbackVariants/FeedbackVariants';
import FeedbackStatistics from './FeedbackStatistics/FeedbackStatistics';
import Notification from 'shared/components/Notification/Notification';

import css from './feedback.module.css';

const voteOptions = ['good', 'neutral', 'bad'];

const Feedback = name => {
  const [Feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const leaveFeedback = name => {
    setFeedbacks(prevState => {
      return { ...prevState, [name]: prevState[name] + 1 };
    });
  };

  const calcAllTotal = () => {
    const { good, neutral, bad } = Feedbacks;
    const allTotal = good + neutral + bad;
    return allTotal;
  };

  const calcFeedback = nameProps => {
    const total = calcAllTotal();
    if (!total) return 0;
    const value = Feedbacks[nameProps];
    const result = ((value / total) * 100).toFixed(2);
    return Number(result);
  };

  const allTotal = calcAllTotal();
  const goodTotal = Feedbacks.good;

  const neutralTotal = Feedbacks.neutral;
  const badTotal = Feedbacks.bad;
  const positivePercentage = calcFeedback('good');

  return (
    <div className={css.wrapper}>
      <FeedbackBlock titie="Please leave feedback">
        <FeedbackVariants options={voteOptions} leaveFeedback={leaveFeedback} />
      </FeedbackBlock>
      <FeedbackBlock titie="Statistics">
        {allTotal ? (
          <FeedbackStatistics
            allTotal={allTotal}
            goodTotal={goodTotal}
            neutralTotal={neutralTotal}
            badTotal={badTotal}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </FeedbackBlock>
    </div>
  );
};

export default Feedback;
