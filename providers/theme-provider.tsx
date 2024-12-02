"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProviders } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProviders>) {
  return <NextThemesProviders {...props}>{children}</NextThemesProviders>;
}
