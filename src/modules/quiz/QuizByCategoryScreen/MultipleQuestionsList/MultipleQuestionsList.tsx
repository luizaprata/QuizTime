import React from 'react';
import { Button, View } from 'react-native';

type Props = {
  incorrectAnswers: string[];
  correctAnswer: string;
  onHandleAnswer: (isCorrect: boolean) => void;
};

const MultipleQuestionsList = ({
  incorrectAnswers,
  correctAnswer,
  onHandleAnswer,
}: Props) => {
  return (
    <View>
      {incorrectAnswers.map((asw, idx) => (
        <Button title={asw} onPress={() => onHandleAnswer(false)} key={idx} />
      ))}
      <Button title={correctAnswer} onPress={() => onHandleAnswer(true)} />
    </View>
  );
};

export default MultipleQuestionsList;
