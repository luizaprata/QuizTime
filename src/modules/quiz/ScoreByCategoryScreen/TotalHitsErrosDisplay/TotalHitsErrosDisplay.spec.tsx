import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';
import TotalHitsErrosDisplay from '.';

describe('TotalHitsErrosDisplay', () => {
  let component: RenderAPI;

  describe('Rendering', () => {
    test('SHOULD render total of 6 erros', () => {
      component = render(
        <TotalHitsErrosDisplay
          score={{
            easy: { hits: 1, errors: 3 },
            medium: { hits: 4, errors: 2 },
            hard: { hits: 0, errors: 1 },
          }}
        />,
      );

      const totalHits = component.getByTestId('TotalErros');

      expect(totalHits.children[0]).toEqual('6');
    });

    test('SHOULD render total of 5 hits', () => {
      component = render(
        <TotalHitsErrosDisplay
          score={{
            easy: { hits: 1, errors: 3 },
            medium: { hits: 4, errors: 2 },
            hard: { hits: 0, errors: 1 },
          }}
        />,
      );

      const totalHits = component.getByTestId('TotalHits');

      expect(totalHits.children[0]).toEqual('5');
    });
  });
});
