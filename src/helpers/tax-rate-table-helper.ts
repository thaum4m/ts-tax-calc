import { IncomeTaxRate, IncomeTaxRateRule } from '../types.js';
import Table from 'cli-table3';
import commaNumber from 'comma-number';

export const taxRatesCliTable = (incomeTaxRates: IncomeTaxRate[]): string => {
  const rateTable = new Table({
    head: ['Taxable income', 'Tax on this income'],
  });

  incomeTaxRates.forEach(taxRate => {
    const fromAmount: string =
      taxRate.income_from > 0
        ? `$${commaNumber(taxRate.income_from)}`
        : taxRate.income_from + '';
    const toAmount: string =
      typeof taxRate.income_to === 'undefined'
        ? 'over'
        : `$${commaNumber(taxRate.income_to)}`;

    const isRule: boolean =
      taxRate.rules instanceof Array && taxRate.rules.length > 0;
    let taxDesc: string = '';
    if (!isRule && taxRate.base_tax === 0) {
      taxDesc = 'Nil';
    } else if (!isRule && taxRate.base_tax > 0) {
      taxDesc = `$${commaNumber(taxRate.base_tax)}`;
    } else {
      // isRule should be true here.
      if (taxRate.base_tax) {
        taxDesc = `$${commaNumber(taxRate.base_tax)} plus `;
      }
      // Only one rule currently supported.
      const rule: IncomeTaxRateRule = taxRate?.rules?.[0] as IncomeTaxRateRule;
      taxDesc += `${rule.tax_per_dollar * 100}c for each $1 over $${commaNumber(rule.income_above)}`;
    }
    rateTable.push([
      `${fromAmount} ${toAmount === 'over' ? 'and' : '-'} ${toAmount}`,
      `${taxDesc}`,
    ]);
  });

  return rateTable.toString();
};
