import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { ScreenArea, ScrollArea } from '@/components/Screen/Screen.styles';
import {
  DifficultyEnum,
  QuestionTypeEnum,
} from '@/modules/quiz/types/Trivia.types';
import useQuestionByCategoryApi from './useQuestionByCategoryApi';
import { useRoute } from '@react-navigation/native';
import MultipleAnswersList from './MultipleAnswersList';
import changeQuizStatus, { DIFFICULTY_ORDER, QuizStatus } from './quiz-status';
import { useNavigation } from '@react-navigation/native';
import { AppScreensEnum } from '@/types/AppScreensEnum';
import { DifficultyScore, IScore } from '@/modules/quiz/types/Quiz.types';
import DatabaseContext from '@/infrastructure/database/DatabaseContext';
import cuid from 'cuid';
import { ScoreSchema, WorkspaceSchema } from '../schema/Quiz.scheme';
import DifficultyStars from './DifficultyStars';
import useRealmQuery from '@/hooks/useRealmQuery';
import { XmlEntities } from 'html-entities';

export const MAX_AMOUNT_QUESTION = 1;
export const QUESTION_TYPE = QuestionTypeEnum.multiple;
export const MAX_ANSWERS = 10;

const QuizByCategoryScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { realm } = useContext(DatabaseContext);

  const { scoreId } = route.params as {
    scoreId: number;
  };

  const workspaces = useRealmQuery<IScore>({
    source: WorkspaceSchema.name,
    filter: `id = ${scoreId}`,
    isFocused: true,
  });

  const workspace = useMemo(() => (workspaces ? workspaces[0] : undefined), [
    workspaces,
  ]);

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
    currentQuizStatus.difficulty,
    workspace,
  );

  const entities = useMemo(() => new XmlEntities(), []);

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
            workspace: workspace,
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
              <Text testID="Question">{entities.decode(quest.question)}</Text>
              <MultipleAnswersList
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
