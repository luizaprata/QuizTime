import React, { useContext, useEffect } from 'react';
import { Button, Text } from 'react-native';
import { ScreenArea, ScrollArea } from '@/components/Screen/Screen.styles';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { IWorkspace, Score } from '../types/Quiz.types';
import { AppScreensEnum } from '@/types/AppScreensEnum';
import DatabaseContext from '@/infrastructure/database/DatabaseContext';
import { ScoreSchema } from '../schema/Quiz.scheme';
import cuid from 'cuid';
import { DIFFICULTY_ORDER } from '../QuizByCategoryScreen/quiz-status';

const ScoreByCategoryScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { score } = route.params as {
    score: Score;
  };

  return (
    <ScreenArea>
      <ScrollArea>
        <Text>{JSON.stringify(score, null, ' ')}</Text>
        <Button
          title="VOLTAR AO INÍCIO"
          onPress={() => {
            navigation.navigate(AppScreensEnum.ListOfCategories);
          }}
        />
      </ScrollArea>
    </ScreenArea>
  );
};

export default ScoreByCategoryScreen;
