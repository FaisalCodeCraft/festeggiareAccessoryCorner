import { Box } from "@mui/material";
import React, { createContext, ReactNode } from "react";

// Define the type of context value
export interface ContextValueType {
  inCart: any[];
  setInCart: React.Dispatch<React.SetStateAction<any[]>>;
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  toggleMode: () => void;
  handleKey: () => void;
  key: number;
  setKey: React.Dispatch<React.SetStateAction<number>>;
}

// Create context with defined type
export const ThemeContext = createContext<ContextValueType>({
  inCart: [],
  setInCart: () => {},
  mode:"light",
  setMode: () => {},
  toggleMode: () => {},
  handleKey: () => {},
  key: 0,
  setKey: () => {},
});

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [inCart, setInCart] = React.useState<any[]>([]);
  const [key, setKey] = React.useState<number>(0);

  const [mode, setMode] = React.useState<React.SetStateAction<"light" | "dark">>("light");
  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };
  const handleKey = () => {
    setKey((prev) => prev + 1);
  };

  // Provide context value
  const contextValue: ContextValueType = {
    inCart,
    setInCart,
    mode:mode === 'light' ? 'light' : "dark",
    setMode,
    toggleMode,
    handleKey,
    key,
    setKey,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <Box
        bgcolor={mode === "light" ? "rgb(248, 248, 255)" : "#212121"}
        color={mode === "light" ? "black" : "white"}
        sx={{ transition: "all .7s ease" }}
      >
        {children}
      </Box>
    </ThemeContext.Provider>
  );
};

export default ContextProvider;
