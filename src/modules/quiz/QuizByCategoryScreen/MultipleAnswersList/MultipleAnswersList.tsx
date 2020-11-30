import React, { useMemo } from 'react';
import { Button, View } from 'react-native';
import { XmlEntities } from 'html-entities';

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
  const entities = useMemo(() => new XmlEntities(), []);

  return (
    <View>
      {incorrectAnswers.map((asw, idx) => (
        <Button
          testID="AnswersIncorrect"
          title={entities.decode(asw)}
          onPress={() => onHandleAnswer(false)}
          key={idx}
        />
      ))}
      <Button
        testID="AnswersCorrect"
        title={entities.decode(correctAnswer)}
        onPress={() => onHandleAnswer(true)}
      />
    </View>
  );
};

export default MultipleAnswersList;
