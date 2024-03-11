import { useMemo } from "react";
import { SetState, StoreApi, UseBoundStore, create } from "zustand";

export interface InputStore<I> {
  input: I;
  isDirty: boolean;
  setInput: <K extends keyof I>(key: K, value: I[K]) => void;
  resetInput: (input?: I) => void;
}

export const inputStoreFactory =
  <I>(getInitialInputState: () => I) =>
  (
    set: StoreApi<InputStore<I>>["setState"],
    get: StoreApi<InputStore<I>>["getState"]
  ): InputStore<I> => ({
    input: getInitialInputState(),
    isDirty: false,
    setInput: <K extends keyof I>(key: K, value: I[K]) => {
      set((state) => ({
        input: { ...state.input, [key]: value },
        isDirty: true,
      }));
    },
    resetInput: (input?: I) =>
      set((state) => ({
        input: input ?? getInitialInputState(),
        isDirty: false,
      })),
  });

export type UseInput<
  T,
  K extends keyof T,
  R = [T[K], (value: T[K]) => void] | [T, (value: T) => void]
> = (key?: K) => R;

export const useInput =
  <T, K extends keyof T>(
    useInputStore: UseBoundStore<StoreApi<InputStore<T>>>
  ): UseInput<T, K> =>
  (key?: K) => {
    const { input, setInput, resetInput } = useInputStore();

    if (typeof key === "undefined")
      return [input, (value: T) => resetInput(value)] as [
        T,
        (value: T) => void
      ];

    const state = useMemo(() => input[key], [input[key]]);

    return [
      state,
      (value: T[K]) => {
        setInput(key, value);
      },
    ] as [T[K], (value: T[K]) => void];
  };
