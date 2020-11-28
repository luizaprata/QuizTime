import React from 'react';
import { Text } from 'react-native';
import { ScreenArea, ScrollArea } from '@/components/Screen/Screen.styles';
import { useRoute } from '@react-navigation/native';
import { Score } from '../types/Quiz.types';
import { Category } from '../types/Trivia.types';

const ScoreByCategoryScreen: React.FC = () => {
  const route = useRoute();

  const { score, category } = route.params as {
    score: Score;
    category: Category;
  };

  return (
    <ScreenArea>
      <ScrollArea>
        <Text>{JSON.stringify(score, null, ' ')}</Text>
        <Text>{JSON.stringify(category, null, ' ')}</Text>
      </ScrollArea>
    </ScreenArea>
  );
};

export default ScoreByCategoryScreen;
