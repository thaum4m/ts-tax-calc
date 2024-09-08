import {
  //TaxRateConfigRec,
  IncomeYear,
  IncomeTaxRate,
  IncomeTaxRateRule,
} from '../types.js';
import TaxRateConfig from './tax-rate-config.js';

export default class IncomeTaxCalc {
  taxRateConfig: TaxRateConfig;

  constructor(taxRateConfig: TaxRateConfig) {
    this.taxRateConfig = taxRateConfig;
  }

  taxableIncome(incomeYear: IncomeYear, income: number): number {
    const taxRates: IncomeTaxRate[] =
      this.taxRateConfig.getIncomeTaxRates(incomeYear) ?? [];

    let totalTax: number = 0;
    for (const taxRate of taxRates) {
      const incomeTo: number = taxRate.income_to ?? -1;
      if (
        income >= taxRate.income_from &&
        (income <= incomeTo || incomeTo === -1)
      ) {
        totalTax += taxRate.base_tax; // Initial tax on income range.
        const rules: IncomeTaxRateRule[] = taxRate.rules ?? [];
        for (const rule of rules) {
          // Add additional tax based on rule.
          if (income > rule.income_above) {
            const amountAbove: number = income - rule.income_above;
            totalTax += amountAbove * rule.tax_per_dollar;
          }
        }
        return totalTax;
      }
    }

    return totalTax;
  }
}
