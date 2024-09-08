import { IncomeTaxRatesRec, IncomeTaxRate, IncomeYear } from '../types.js';

export default class TaxRateConfig {
  incomeTaxRates: IncomeTaxRatesRec;

  constructor(incomeTaxRates: IncomeTaxRatesRec) {
    this.incomeTaxRates = incomeTaxRates;
  }

  getIncomeTaxRates(incomeYear: IncomeYear): IncomeTaxRate[] | undefined {
    return this.incomeTaxRates[`${incomeYear.from}-${incomeYear.to}`];
  }

  getIncomeTaxYears(reverse: boolean = false): IncomeYear[] {
    const sortOrder: number = reverse ? -1 : 1;
    return Object.keys(this.incomeTaxRates)
      .sort((a, b) => (a > b ? sortOrder : sortOrder * -1))
      .map(key => {
        const parts: string[] = key.split('-');
        return {
          from: parseInt(parts[0] as string),
          to: parseInt(parts[1] as string),
        };
      });
  }
}
