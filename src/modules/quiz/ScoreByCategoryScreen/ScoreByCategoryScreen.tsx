import React from 'react';
import { Button, Text } from 'react-native';
import { ScreenArea, ScrollArea } from '@/components/Screen/Screen.styles';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Score } from '../types/Quiz.types';
import { AppScreensEnum } from '@/types/AppScreensEnum';

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
