import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from './Card';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Button } from './Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <Text style={styles.cardTitle}>Default Card</Text>
      <Text style={styles.cardContent}>
        This is a basic card component with default styling.
      </Text>
    </Card>
  ),
};

export const WithButtons: Story = {
  render: (args) => (
    <Card {...args}>
      <Text style={styles.cardTitle}>Card with Actions</Text>
      <Text style={styles.cardContent}>
        This card contains interactive elements like buttons.
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Primary Action"
          onPress={() => console.log('Primary action')}
          variant="primary"
          style={styles.button}
        />
        <Button
          title="Secondary Action"
          onPress={() => console.log('Secondary action')}
          variant="secondary"
          style={styles.button}
        />
      </View>
    </Card>
  ),
};

export const CustomStyled: Story = {
  render: (args) => (
    <Card style={styles.customCard}>
      <Text style={styles.cardTitle}>Custom Styled Card</Text>
      <Text style={styles.cardContent}>
        This card has custom background color and border.
      </Text>
    </Card>
  ),
};

export const MultipleCards: Story = {
  render: (args) => (
    <View style={styles.multipleContainer}>
      <Card style={styles.smallCard}>
        <Text style={styles.cardTitle}>Card 1</Text>
        <Text style={styles.cardContent}>First card in a list</Text>
      </Card>
      <Card style={styles.smallCard}>
        <Text style={styles.cardTitle}>Card 2</Text>
        <Text style={styles.cardContent}>Second card in a list</Text>
      </Card>
      <Card style={styles.smallCard}>
        <Text style={styles.cardTitle}>Card 3</Text>
        <Text style={styles.cardContent}>Third card in a list</Text>
      </Card>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
  },
  multipleContainer: {
    gap: 12,
    width: '100%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  button: {
    flex: 1,
  },
  customCard: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
    borderWidth: 1,
  },
  smallCard: {
    marginVertical: 0,
  },
});