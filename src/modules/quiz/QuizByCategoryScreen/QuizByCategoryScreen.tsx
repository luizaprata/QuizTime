import React, { useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScreenArea, ScrollArea } from '@/components/Screen/Screen.styles';
import {
  DifficultyEnum,
  QuestionTypeEnum,
} from '@/modules/quiz/types/Trivia.types';
import useQuestionByCategoryApi from './useQuestionByCategoryApi';
import { useRoute } from '@react-navigation/native';
import MultipleQuestionsList from './MultipleQuestionsList/MultipleQuestionsList';
import changeQuizStatus, { DIFFICULTY_ORDER, QuizStatus } from './quiz-status';
import { useNavigation } from '@react-navigation/native';
import { AppScreensEnum } from '@/types/AppScreensEnum';
import { DifficultyScore, IWorkspace } from '@/modules/quiz/types/Quiz.types';
import DatabaseContext from '@/infrastructure/database/DatabaseContext';
import cuid from 'cuid';
import { ScoreSchema } from '../schema/Quiz.scheme';
import DifficultyStars from './DifficultyStars';

const MAX_AMOUNT_QUESTION = 1;
const QUESTION_TYPE = QuestionTypeEnum.multiple;
const MAX_ANSWERS = 10;

const QuizByCategoryScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { realm } = useContext(DatabaseContext);

  const { workspace } = route.params as {
    workspace: IWorkspace;
  };

  const [currentQuizStatus, setCurrentQuizStatus] = useState<QuizStatus>({
    difficulty: DifficultyEnum.easy,
    straightPoints: 0,
    totalAnswers: 0,
  });

  const [score, setScore] = useState<Record<DifficultyEnum, DifficultyScore>>({
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
    workspace.id,
    currentQuizStatus.difficulty,
  );

  useEffect(() => {
    if (currentQuizStatus.totalAnswers >= MAX_ANSWERS) {
      if (!realm) {
        return () => {};
      }
      realm.write(() => {
        DIFFICULTY_ORDER.forEach((n) => {
          const dataScore = {
            id: cuid(),
            difficulty: n,
            hits: score[n].hits,
            errors: score[n].errors,
            workspace,
          };

          realm.create(ScoreSchema.name, dataScore);
        });
      });

      navigation.navigate(AppScreensEnum.ScoreByCategory, {
        score,
      });
    } else {
      fetchData();
    }
    return () => {};
  }, [currentQuizStatus, fetchData, navigation, score, realm, workspace]);

  const onHandleAnswer = (isCorrect: boolean) => {
    setCurrentQuizStatus((prevQuizStatus) => {
      const nextQuizStatus = changeQuizStatus(prevQuizStatus, isCorrect);
      setScore((prevScore) => {
        const nextScore = prevScore[prevQuizStatus.difficulty];
        nextScore.hits += isCorrect ? 1 : 0;
        nextScore.errors += isCorrect ? 0 : 1;
        return prevScore;
      });
      return nextQuizStatus;
    });
  };

  if (errorMessage) {
    return <Text>{errorMessage}</Text>;
  }
  return (
    <ScreenArea>
      <ScrollArea>
        <DifficultyStars currentDifficulty={currentQuizStatus.difficulty} />
        {isLoading && <Text>Carregando</Text>}
        {!isLoading &&
          payload?.results.map((quest, idx) => (
            <View key={idx}>
              <Text>{quest.question}</Text>
              <MultipleQuestionsList
                incorrectAnswers={quest.incorrect_answers}
                correctAnswer={quest.correct_answer}
                onHandleAnswer={onHandleAnswer}
              />
            </View>
          ))}
      </ScrollArea>
    </ScreenArea>
  );
};

export default QuizByCategoryScreen;
