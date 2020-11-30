import React from 'react';
import { Button } from 'react-native';
import { ScreenArea, ScrollArea } from '@/components/Screen/Screen.styles';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { AppScreensEnum } from '@/types/AppScreensEnum';
import { DifficultyEnum } from '../types/Trivia.types';
import { DifficultyScore } from '../types/Quiz.types';
import ScoreDisplay from './ScoreDisplay';
import TotalHitsErrosDisplay from './TotalHitsErrosDisplay';

const ScoreByCategoryScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { score } = route.params as {
    score: Record<DifficultyEnum, DifficultyScore>;
  };

  return (
    <ScreenArea>
      <ScrollArea>
        <TotalHitsErrosDisplay score={score} />
        <ScoreDisplay score={score} />
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
