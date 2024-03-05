import { useDecodedQr } from "../store/decoded-qr";

export const usePayTo = () => {
  const { decodedQr } = useDecodedQr();

  if (!decodedQr) return "";
  return `${decodedQr.pn} [${decodedQr.pa}]`;
};
