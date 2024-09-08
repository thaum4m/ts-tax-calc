export type IncomeTaxRateRule = {
  income_above: number;
  tax_per_dollar: number;
};

export type IncomeTaxRate = {
  income_from: number;
  income_to?: number;
  base_tax: number;
  rules?: IncomeTaxRateRule[];
};

export type IncomeTaxRatesRec = Record<string, IncomeTaxRate[]>;

export type IncomeYear = {
  from: number;
  to: number;
};
