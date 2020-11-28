import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ButtonContainer } from './ListOfCategoriesScreen.styles';
import useAllCategoriesApi from './useAllCategoriesApi';
import { Button, Text } from 'react-native';
import { Category } from '@/modules/quiz/types/Trivia.types';
import { ScreenArea, ScrollArea } from '@/components/Screen/Screen.styles';
import { AppScreensEnum } from '@/types/AppScreensEnum';

const ListOfCategoriesScreen: React.FC = () => {
  const navigation = useNavigation();

  const { payload, isLoading, errorMessage } = useAllCategoriesApi();

  const onCategorySelected = (category: Category) => {
    navigation.navigate(AppScreensEnum.QuizByCategory, {
      category,
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
          <ButtonContainer>
            {payload?.trivia_categories?.map((category) => {
              return (
                <Button
                  key={category.id}
                  title={category.name}
                  onPress={() => onCategorySelected(category)}
                />
              );
            })}
          </ButtonContainer>
        )}
      </ScrollArea>
    </ScreenArea>
  );
};

export default ListOfCategoriesScreen;
