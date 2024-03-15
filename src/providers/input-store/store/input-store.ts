import { useMemo } from "react";
import { SetState, StoreApi, UseBoundStore, create } from "zustand";

export interface InputStore<I> {
  input: I;
  isDirty: boolean;
  setInput: <K extends keyof I>(key: K, value: I[K]) => void;
  resetInput: (input?: Partial<I>) => void;
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
    resetInput: (input?: Partial<I>) => {
      set((state) => ({
        input: input
          ? { ...getInitialInputState(), ...input }
          : getInitialInputState(),
        isDirty: false,
      }));
    },
  });

export type UseInput<
  T,
  K extends keyof T,
  R = K extends undefined
    ? [T, (value: T) => void]
    : [T[K], (value: T[K]) => void]
> = (key: K | undefined) => R;

export const useInput =
  <
    T,
    K extends keyof T,
    R = K extends undefined
      ? [T, (value: T) => void]
      : [T[K], (value: T[K]) => void]
  >(
    useInputStore: UseBoundStore<StoreApi<InputStore<T>>>
  ) =>
  (key?: K): R => {
    const { input, setInput, resetInput } = useInputStore();

    if (typeof key === "undefined")
      return [input, (value: T) => resetInput(value)] as R;

    const state = useMemo(() => input[key], [input[key]]);
    if (typeof key === "string") {
      return [
        state,
        (value: T[K]) => {
          setInput(key, value);
        },
      ] as R;
    }

    throw new Error();
  };
