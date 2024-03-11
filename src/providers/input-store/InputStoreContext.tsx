import { UseInput } from "@/store/utils/input-store";
import { PropsWithChildren, createContext, useContext } from "react";

const inputStoreContext = createContext<UseInput<any>>((key) => {
  throw new Error("This component should be wrapped in InputStoreProvider");
});

export type InputStoreProviderProps<T> = {
  useInput: UseInput<T>;
};

export function InputStoreProvider<T extends object>(
  props: PropsWithChildren<InputStoreProviderProps<T>>
) {
  return (
    <inputStoreContext.Provider value={props.useInput}>
      {props.children}
    </inputStoreContext.Provider>
  );
}

export const useInputFromStore = <T extends unknown, K extends keyof T>(
  key: K
) => useContext<UseInput<T>>(inputStoreContext)(key);
