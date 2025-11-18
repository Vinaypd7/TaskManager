import React from 'react';
import { render } from '@testing-library/react-native';
import { Card } from '../Card';
import { Text } from 'react-native';

describe('Card', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>
    );

    expect(getByText('Card Content')).toBeTruthy();
  });

  it('should apply custom style', () => {
    const customStyle = { marginTop: 20 };
    const { getByText } = render(
      <Card style={customStyle}>
        <Text>Styled Card</Text>
      </Card>
    );

    expect(getByText('Styled Card')).toBeTruthy();
  });

  it('should render multiple children', () => {
    const { getByText } = render(
      <Card>
        <Text>First</Text>
        <Text>Second</Text>
      </Card>
    );

    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
  });
});

