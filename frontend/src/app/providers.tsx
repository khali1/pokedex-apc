"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { MantineProvider } from "@mantine/core";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <MantineProvider>{children}</MantineProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  );
}
