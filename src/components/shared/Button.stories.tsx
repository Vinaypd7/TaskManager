import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from './Button';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onPress: { action: 'pressed' },
  },
  decorators: [
    (Story) => (
      <View style={styles.container}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    title: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Button',
    disabled: true,
  },
};

export const PrimaryDisabled: Story = {
  args: {
    title: 'Primary Disabled',
    variant: 'primary',
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    title: 'Button with very long text that might wrap',
    variant: 'primary',
  },
};

export const CustomStyle: Story = {
  args: {
    title: 'Custom Style',
    variant: 'primary',
    style: {
      backgroundColor: 'purple',
      borderColor: 'purple',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
  },
});