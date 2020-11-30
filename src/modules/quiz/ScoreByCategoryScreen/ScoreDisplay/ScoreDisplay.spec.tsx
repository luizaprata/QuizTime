import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import ScoreDisplay from '.';

describe('ScoreDisplay', () => {
  let component: RenderAPI;

  describe('Rendering', () => {
    test('SHOULD render easy medium and hard scores', () => {
      component = render(
        <ScoreDisplay
          score={{
            easy: { hits: 1, errors: 3 },
            medium: { hits: 4, errors: 2 },
            hard: { hits: 0, errors: 1 },
          }}
        />,
      );

      const easy = component.queryByTestId('Score easy');
      const medium = component.queryByTestId('Score medim');
      const hard = component.queryByTestId('Score hard');

      expect(easy).toBeDefined();
      expect(medium).toBeDefined();
      expect(hard).toBeDefined();
    });

    describe('render hits and erros', () => {
      beforeEach(() => {
        component = render(
          <ScoreDisplay
            score={{
              easy: { hits: 1, errors: 3 },
              medium: { hits: 4, errors: 2 },
              hard: { hits: 0, errors: 1 },
            }}
          />,
        );
      });

      test('SHOULD render erros and hits of easy score', () => {
        const easyHit = component.queryByTestId('Score hit easy');
        const easyError = component.queryByTestId('Score error easy');

        expect(easyHit).toBeDefined();
        expect(easyHit?.children).toEqual(['Acertos:', '1']);
        expect(easyError).toBeDefined();
        expect(easyError?.children).toEqual(['Erros:', '3']);
      });

      test('SHOULD render erros and hits of medium score', () => {
        const mediumHit = component.queryByTestId('Score hit medium');
        const mediumError = component.queryByTestId('Score error medium');

        expect(mediumHit).toBeDefined();
        expect(mediumHit?.children).toEqual(['Acertos:', '4']);
        expect(mediumError).toBeDefined();
        expect(mediumError?.children).toEqual(['Erros:', '2']);
      });

      test('SHOULD render erros and hits of hard score', () => {
        const hardHit = component.queryByTestId('Score hit hard');
        const hardError = component.queryByTestId('Score error hard');

        expect(hardHit).toBeDefined();
        expect(hardHit?.children).toEqual(['Acertos:', '0']);
        expect(hardError).toBeDefined();
        expect(hardError?.children).toEqual(['Erros:', '1']);
      });
    });
  });
});
