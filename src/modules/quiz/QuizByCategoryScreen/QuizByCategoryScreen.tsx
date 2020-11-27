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
import tryChangeDifficulty, { Difficulty } from './try-change-difficulty-level';

const MAX_AMOUNT_QUESTION = 1;
const QUESTION_TYPE = QuestionTypeEnum.multiple;

const QuizByCategoryScreen: React.FC = () => {
  const route = useRoute();

  const { category } = route.params as {
    category: Category;
  };

  const [difficulty, setDifficulty] = useState<Difficulty>({
    current: DifficultyEnum.easy,
    hitsCount: 0,
  });
  const [hitCount, setHitCount] = useState(0);

  const {
    payload,
    isLoading,
    errorMessage,
    fetchData,
  } = useQuestionByCategoryApi(
    MAX_AMOUNT_QUESTION,
    QUESTION_TYPE,
    category.id,
    difficulty.current,
  );

  useEffect(() => {
    setDifficulty((prv) => tryChangeDifficulty(prv, hitCount));
  }, [hitCount]);

  useEffect(() => {
    fetchData();
    return () => {};
  }, [fetchData]);

  const onHandleAnswer = (isCorrect: boolean) => {
    setHitCount((prv) => prv + (isCorrect ? 1 : -1));
    if (isCorrect) {
      fetchData();
    }
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
          </>
        )}
      </ScrollArea>
    </ScreenArea>
  );
};

export default QuizByCategoryScreen;

// Ao responder a questão, informar ao usuário se ele acertou ou errou. Após isso, mostrar a próxima questão de
// acordo com a seguinte regra:
// O grau de dificuldade das questões segue o padrão: fácil, médio e difícil.
// Caso o usuário acerte 2 seguidas de um mesmo nível, a questão a ser mostrada deve ser de dificuldade
// superior a da questão atual. A dificuldade não deve ser alterada caso já esteja no nível difícil.
// Caso o usuário erre 2 seguidas de um mesmo nível, a questão a ser mostrada deve ser de dificuldade
// inferior a da questão atual. A dificuldade não deve ser alterada caso já esteja no nível fácil.
// A resposta escolhida, a dificuldade, o gabarito, a data/hora da resposta e o indicativo se ele acertou ou errou a
// questão devem ser persistidos. A forma como esses dados serão persistidos fica a seu critério.
