import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ButtonContainer} from './HomeScreen.styles';
import useAllCategoriesApi from './useAllCategoriesApi';
import {Button, Text} from 'react-native';
import {Category} from './types/Trivia.types';
import {Container} from '@/components/Container/Container.styles';

const HomeScreen: React.FC = () => {
  //const navigation = useNavigation();

  const {payload, isLoading, errorMessage} = useAllCategoriesApi();

  const onCategorySelected = (category: Category) => {
    console.log(category);
    //navigation.navigate();
  };

  if (errorMessage) {
    return null;
  }
  return (
    <Container>
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
    </Container>
  );
};

export default HomeScreen;
