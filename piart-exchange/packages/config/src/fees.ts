export const PLATFORM_FEE_RATE = 0.075;

export interface FeeBreakdown {
  priceInPi: number;
  platformFee: number;
  sellerAmount: number;
}

const PI_PRECISION = 6;
const PI_TOLERANCE = 0.000001;

function roundToPiPrecision(value: number): number {
  return Number(value.toFixed(PI_PRECISION));
}

export function calculateFees(priceInPi: number): FeeBreakdown {
  if (!Number.isFinite(priceInPi) || priceInPi <= 0) {
    throw new Error("priceInPi must be a finite number greater than zero");
  }

  const roundedPriceInPi = roundToPiPrecision(priceInPi);
  const platformFee = roundToPiPrecision(roundedPriceInPi * PLATFORM_FEE_RATE);
  const sellerAmount = roundToPiPrecision(roundedPriceInPi - platformFee);
  const sum = roundToPiPrecision(platformFee + sellerAmount);

  if (Math.abs(sum - roundedPriceInPi) > PI_TOLERANCE) {
    throw new Error("Fee calculation invariant violated: platformFee + sellerAmount must equal priceInPi");
  }

  return {
    priceInPi: roundedPriceInPi,
    platformFee,
    sellerAmount
  };
}
