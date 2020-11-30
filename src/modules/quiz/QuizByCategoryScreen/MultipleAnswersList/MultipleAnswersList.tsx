import React from 'react';
import { Button, View } from 'react-native';

type Props = {
  incorrectAnswers: string[];
  correctAnswer: string;
  onHandleAnswer: (isCorrect: boolean) => void;
};

const MultipleAnswersList = ({
  incorrectAnswers,
  correctAnswer,
  onHandleAnswer,
}: Props) => {
  return (
    <View>
      {incorrectAnswers.map((asw, idx) => (
        <Button
          testID="AnswersIncorrect"
          title={asw}
          onPress={() => onHandleAnswer(false)}
          key={idx}
        />
      ))}
      <Button
        testID="AnswersCorrect"
        title={correctAnswer}
        onPress={() => onHandleAnswer(true)}
      />
    </View>
  );
};

export default MultipleAnswersList;
