import { ThemeMode } from "../enum";

export type ThemeContextType = {
  toggleColorMode: () => void;
  mode: ThemeMode;
};
