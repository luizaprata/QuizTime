import React, { useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ButtonContainer } from './ListOfCategoriesScreen.styles';
import useAllCategoriesApi from './useAllCategoriesApi';
import { Button, Text } from 'react-native';
import { ScreenArea, ScrollArea } from '@/components/Screen/Screen.styles';
import { AppScreensEnum } from '@/types/AppScreensEnum';
import useRealmQuery from '@/hooks/useRealmQuery';
import { IWorkspace } from '../types/Quiz.types';
import { WorkspaceSchema } from '../schema/Quiz.scheme';
import DatabaseContext from '@/infrastructure/database/DatabaseContext';

const ListOfCategoriesScreen: React.FC = () => {
  const navigation = useNavigation();

  const workspaces = useRealmQuery<IWorkspace>({
    source: WorkspaceSchema.name,
  });
  const { realm } = useContext(DatabaseContext);

  const { payload, isLoading, errorMessage } = useAllCategoriesApi();

  useEffect(() => {
    if (!payload || !realm) {
      return () => {};
    }
    payload.trivia_categories.forEach((item) => {
      const workspace = workspaces?.find((w) => w.id === item.id);
      if (!workspace) {
        realm.write(() => {
          realm.create(WorkspaceSchema.name, { id: item.id, name: item.name });
        });
      }
    });

    return () => {};
  }, [payload, realm, workspaces]);

  const onCategorySelected = (workspace: IWorkspace) => {
    navigation.navigate(AppScreensEnum.QuizByCategory, {
      workspace,
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
            {workspaces?.map((workspace) => (
              <Button
                key={workspace.id}
                title={workspace.name}
                disabled={workspace.scores.length > 0}
                onPress={() => onCategorySelected(workspace)}
              />
            ))}
          </ButtonContainer>
        )}
      </ScrollArea>
    </ScreenArea>
  );
};

export default ListOfCategoriesScreen;
