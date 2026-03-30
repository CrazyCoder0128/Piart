import assert from "node:assert/strict";
import test from "node:test";

import { PLATFORM_FEE_RATE, calculateFees } from "./fees";

const PI_TOLERANCE = 0.000001;

test("Fee split always sums to original price", () => {
  const prices = [0.1, 1, 5.123456, 99.999999, 12345.678901];

  for (const price of prices) {
    const result = calculateFees(price);
    assert.ok(Math.abs(result.platformFee + result.sellerAmount - result.priceInPi) <= PI_TOLERANCE);
  }
});

test("7.5% is always exact to 6 decimal places", () => {
  const prices = [0.2, 1.333333, 5, 19.999999, 1000.123456];

  for (const price of prices) {
    const result = calculateFees(price);
    const expectedPlatformFee = Number((result.priceInPi * PLATFORM_FEE_RATE).toFixed(6));
    assert.equal(result.platformFee, expectedPlatformFee);
    assert.equal(result.platformFee.toString(), expectedPlatformFee.toString());
  }
});

test("Throws on zero price", () => {
  assert.throws(() => calculateFees(0), /finite number greater than zero/);
});

test("Throws on negative price", () => {
  assert.throws(() => calculateFees(-1), /finite number greater than zero/);
});

test("Throws on Infinity", () => {
  assert.throws(() => calculateFees(Number.POSITIVE_INFINITY), /finite number greater than zero/);
});
