/** Standard amortized monthly payment (principal + interest). */
export function monthlyPI(
  principal: number,
  annualRatePct: number,
  years: number
): number {
  if (principal <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export interface MortgageBreakdown {
  downPayment: number;
  loanAmount: number;
  pi: number;
  taxMonthly: number;
  insuranceMonthly: number;
  hoaMonthly: number;
  total: number;
}

export function mortgageBreakdown(
  price: number,
  downPct: number,
  ratePct: number,
  years: number,
  taxAnnual: number,
  hoaMonthly: number
): MortgageBreakdown {
  const downPayment = Math.round((price * downPct) / 100);
  const loanAmount = Math.max(0, price - downPayment);
  const pi = monthlyPI(loanAmount, ratePct, years);
  const taxMonthly = taxAnnual / 12;
  const insuranceMonthly = (price * 0.0035) / 12;
  const total =
    pi + taxMonthly + insuranceMonthly + (hoaMonthly || 0);
  return {
    downPayment,
    loanAmount,
    pi,
    taxMonthly,
    insuranceMonthly,
    hoaMonthly: hoaMonthly || 0,
    total,
  };
}

/**
 * Rent affordability: common guideline is rent ≤ 30% of gross monthly income.
 */
export function rentAffordability(
  monthlyRent: number
): { incomeNeededYearly: number; shareOfIncome: number; okAtIncome: boolean } {
  const incomeNeededYearly = (monthlyRent / 0.3) * 12;
  return {
    incomeNeededYearly: incomeNeededYearly,
    shareOfIncome: 0.3,
    okAtIncome: true,
  };
}
