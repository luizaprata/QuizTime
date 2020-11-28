import { ScreenArea, ScrollArea } from '@/components/Screen/Screen.styles';
import {
  Category,
  DifficultyEnum,
  QuestionTypeEnum,
} from '@/modules/quiz/types/Trivia.types';
import React, { useEffect, useState } from 'react';
import useQuestionByCategoryApi from './useQuestionByCategoryApi';
import { useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import MultipleQuestionsList from './MultipleQuestionsList/MultipleQuestionsList';
import quizStatus, { QuizStatus } from './quiz-status';
import { useNavigation } from '@react-navigation/native';
import { AppScreensEnum } from '@/types/AppScreensEnum';

const MAX_AMOUNT_QUESTION = 1;
const QUESTION_TYPE = QuestionTypeEnum.multiple;
const MAX_ANSWERS = 10;

type DifficultyScore = { hits: number; errors: number };
type Score = {
  [DifficultyEnum.easy]: DifficultyScore;
  [DifficultyEnum.medium]: DifficultyScore;
  [DifficultyEnum.hard]: DifficultyScore;
};

const QuizByCategoryScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { category } = route.params as {
    category: Category;
  };

  const [currentQuizStatus, setCurrentQuizStatus] = useState<QuizStatus>({
    difficulty: DifficultyEnum.easy,
    straightPoints: 0,
    totalAnswers: 0,
  });

  const [score, setScore] = useState<Score>({
    [DifficultyEnum.easy]: { hits: 0, errors: 0 },
    [DifficultyEnum.medium]: { hits: 0, errors: 0 },
    [DifficultyEnum.hard]: { hits: 0, errors: 0 },
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
    currentQuizStatus.difficulty,
  );

  useEffect(() => {
    if (currentQuizStatus.totalAnswers >= MAX_ANSWERS) {
      navigation.navigate(AppScreensEnum.ScoreByCategory, {
        score,
      });
    } else {
      fetchData();
    }
    return () => {};
  }, [currentQuizStatus, fetchData, navigation, score]);

  const onHandleAnswer = (isCorrect: boolean) => {
    setCurrentQuizStatus((prevQuiz) => {
      const nextDiff = quizStatus(prevQuiz, isCorrect);
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

            <Text>{JSON.stringify(currentQuizStatus, null, ' ')}</Text>
            <Text>{JSON.stringify(score, null, ' ')}</Text>
          </>
        )}
      </ScrollArea>
    </ScreenArea>
  );
};

export default QuizByCategoryScreen;
