import type { Meta, StoryObj } from "@storybook/react";

import UserList from "./UserList";
import { withQueryClient } from "utils/decorators";
import { http, HttpResponse } from "msw";
import { mockUsersResponse } from "utils/mocks/users";

const meta = {
  title: "UserList",
  component: UserList,
  decorators: [withQueryClient],
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: [
        http.get("**/users", () => HttpResponse.json(mockUsersResponse)),
      ],
    },
  },
} satisfies Meta<typeof UserList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
