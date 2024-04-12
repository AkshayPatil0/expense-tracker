import { PropsWithChildren, createContext, useContext, useMemo } from "react";

export interface GraphStore {
  height: number;
  width: number;
}

const graphContext = createContext<GraphStore>({
  height: 0,
  width: 0,
});

export function GraphProvider({
  children,
  height,
  width,
}: PropsWithChildren<GraphStore>) {
  const store = useMemo(() => {
    return {
      height,
      width,
    };
  }, [height, width]);
  return (
    <graphContext.Provider value={store}>{children}</graphContext.Provider>
  );
}

export const useGraphStore = () => useContext(graphContext);
