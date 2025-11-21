import React from 'react';
import renderer from 'react-test-renderer';
import { act } from '@testing-library/react-native';
import { Card } from '../Card';
import { Text } from 'react-native';

describe('Card Snapshot Tests', () => {
  it('should match snapshot for basic card', () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <Card>
            <Text>Card Content</Text>
          </Card>
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for card with custom style', () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <Card style={{ marginTop: 20 }}>
            <Text>Styled Card</Text>
          </Card>
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot for card with multiple children', () => {
    let tree: any;
    act(() => {
      tree = renderer
        .create(
          <Card>
            <Text>First Child</Text>
            <Text>Second Child</Text>
          </Card>
        )
        .toJSON();
    });
    expect(tree).toMatchSnapshot();
  });
});

