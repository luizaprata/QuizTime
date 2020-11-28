import { ScreenArea, ScrollArea } from '@/components/Screen/Screen.styles';
import {
  Category,
  DifficultyEnum,
  QuestionTypeEnum,
} from '@/types/Trivia.types';
import React, { useEffect, useState } from 'react';
import useQuestionByCategoryApi from './useQuestionByCategoryApi';
import { useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import MultipleQuestionsList from './MultipleQuestionsList/MultipleQuestionsList';
import tryChangeDifficulty, { QuizStatus } from './try-change-difficulty-level';

const MAX_AMOUNT_QUESTION = 1;
const QUESTION_TYPE = QuestionTypeEnum.multiple;

type DifficultyScore = { hits: number; errors: number };
type Score = {
  easy: DifficultyScore;
  medium: DifficultyScore;
  hard: DifficultyScore;
};

const QuizByCategoryScreen: React.FC = () => {
  const route = useRoute();

  const { category } = route.params as {
    category: Category;
  };

  const [quizStatus, setQuizStatus] = useState<QuizStatus>({
    difficulty: DifficultyEnum.easy,
    straightPoints: 0,
  });
  const [score, setScore] = useState<Score>({
    easy: { hits: 0, errors: 0 },
    medium: { hits: 0, errors: 0 },
    hard: { hits: 0, errors: 0 },
  });

  const {
    payload,
    isLoading,
    errorMessage,
    fetchData,
  } = useQuestionByCategoryApi(
    MAX_AMOUNT_QUESTION,
    QUESTION_TYPE,
    category.id,
    quizStatus.difficulty,
  );

  useEffect(() => {
    fetchData();
    return () => {};
  }, [quizStatus, fetchData]);

  const onHandleAnswer = (isCorrect: boolean) => {
    setQuizStatus((prevQuiz) => {
      const nextDiff = tryChangeDifficulty(prevQuiz, isCorrect);
      setScore((prevScore) => {
        const nextScore = prevScore[nextDiff.difficulty];
        nextScore.hits += isCorrect ? 1 : 0;
        nextScore.errors += isCorrect ? 0 : 1;
        return prevScore;
      });
      return nextDiff;
    });
  };

  if (errorMessage) {
    return <Text>{errorMessage}</Text>;
  }
  return (
    <ScreenArea>
      <ScrollArea>
        {isLoading && <Text>Carregando</Text>}
        {!isLoading && (
          <>
            {payload?.results.map((quest, idx) => {
              return (
                <View key={idx}>
                  <Text>{quest.question}</Text>
                  <MultipleQuestionsList
                    incorrectAnswers={quest.incorrect_answers}
                    correctAnswer={quest.correct_answer}
                    onHandleAnswer={onHandleAnswer}
                  />
                </View>
              );
            })}

            <Text>{JSON.stringify(quizStatus, null, ' ')}</Text>
            <Text>{JSON.stringify(score, null, ' ')}</Text>
          </>
        )}
      </ScrollArea>
    </ScreenArea>
  );
};

export default QuizByCategoryScreen;
