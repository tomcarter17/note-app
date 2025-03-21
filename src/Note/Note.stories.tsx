import type { Meta, StoryObj } from "@storybook/react";

import Note from "./Note";

const meta = {
  title: "Note",
  component: Note,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Note>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 1,
    initialBody: "This is a note",
    onDelete: () => {},
  },
};

export const LongText: Story = {
  args: {
    id: 1,
    initialBody: "This is a note with long text that should wrap",
    onDelete: () => {},
  },
};
