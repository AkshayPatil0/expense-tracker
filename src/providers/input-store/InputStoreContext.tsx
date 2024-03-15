import { UseInput } from "@/providers/input-store/store/input-store";
import { Context, PropsWithChildren, createContext, useContext } from "react";

const inputStoreContext = createContext<UseInput<any, any>>((key) => {
  throw new Error("This component should be wrapped in InputStoreProvider");
});

export type InputStoreProviderProps<T> = {
  useInput: UseInput<T, keyof T>;
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
) =>
  useContext<UseInput<T, K>>(
    inputStoreContext as unknown as Context<UseInput<T, K>>
  )(key);
