export type DecodedUpiQr = {
  pa: string;
  pn?: string;
  tr?: string;
  mc?: string;
  url?: string;
  mode?: string;
  cu?: string;
};

// pa: Payee's Virtual Payment Address (VPA) (mandatory)
// pn: Payee's Name (optional)
// am: Amount (not allowed)
// tr: Transaction Reference ID (optional)
// mc: Merchant Category Code (optional)
// url: URL for transaction status updates (optional)
// mode: Payment mode (optional)
// cu: Currency (optional)
export type UpiDeepLinkParams = DecodedUpiQr & {
  am: number;
};

export enum UpiApps {
  phonepe = "phonepe",
}

export const decodeUpiQr = (deepLink: string): DecodedUpiQr => {
  const url = new URL(deepLink);

  const pa = url.searchParams.get("pa");

  if (!pa) {
    throw new Error("Invalid link");
  }

  return {
    pa,
    pn: url.searchParams.get("pn") ?? undefined,
    tr: url.searchParams.get("tr") ?? undefined,
    mc: url.searchParams.get("mc") ?? undefined,
    url: url.searchParams.get("url") ?? undefined,
    mode: url.searchParams.get("mode") ?? undefined,
    cu: url.searchParams.get("cu") ?? undefined,
  };
};

// upi://pay?pa=1234567@upi&pn=John%20Doe&tr=ORDER123
export const generateUpiDeepLink = (
  params: UpiDeepLinkParams,
  upiApp: UpiApps
): string => {
  const url = new URL(`${upiApp}://pay`);

  url.searchParams.append("pa", params.pa);
  url.searchParams.append("am", params.am.toString());
  if (params.pn) url.searchParams.append("pn", params.pn);
  if (params.tr) url.searchParams.append("tr", params.tr);
  if (params.mc) url.searchParams.append("mc", params.mc);
  if (params.url) url.searchParams.append("url", params.url);
  if (params.mode) url.searchParams.append("mode", params.mode);
  if (params.cu) url.searchParams.append("cu", params.cu);

  return url.toString();
};
