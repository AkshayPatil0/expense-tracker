export const isEmoji = (value: string) => {
  const regex = /\p{Extended_Pictographic}$/gu;
  return regex.test(value);
};
