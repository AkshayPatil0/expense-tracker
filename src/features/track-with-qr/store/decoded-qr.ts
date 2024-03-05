import { create } from "zustand";
import { DecodedUpiQr } from "../services/upiQrService";

export interface DecodedQrStore {
  decodedQr: DecodedUpiQr | null;
  setDecodedQr: (decodedQr: DecodedUpiQr | null) => void;
}

export const useDecodedQr = create<DecodedQrStore>()((set) => ({
  decodedQr: null,
  setDecodedQr: (decodedQr: DecodedUpiQr | null) =>
    set((state) => ({ decodedQr })),
}));
