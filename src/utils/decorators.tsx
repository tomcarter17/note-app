import { type Decorator } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const withQueryClient: Decorator = (Story) => {
  return (
    <QueryClientProvider client={client}>
      <Story />
    </QueryClientProvider>
  );
};
