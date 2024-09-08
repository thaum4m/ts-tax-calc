import { IncomeTaxRatesRec, IncomeTaxRate, IncomeYear } from './types.js';
import prompts from 'prompts';
import commaNumber from 'comma-number';
import { loadJsonFile } from './helpers/file-helper.js';
import TaxRateConfig from './helpers/tax-rate-config.js';
import IncomeTaxCalc from './helpers/income-tax-calc.js';
import { taxRatesCliTable } from './helpers/tax-rate-table-helper.js';

(async () => {
  const incomeTaxRatesAll: IncomeTaxRatesRec = await loadJsonFile(
    new URL('./config/au-income-tax-rates.json', import.meta.url),
  );
  const config: TaxRateConfig = new TaxRateConfig(incomeTaxRatesAll);
  const incomeYears: IncomeYear[] = await config.getIncomeTaxYears(true);

  const answers: prompts.Answers<string> = await prompts([
    {
      type: 'select',
      name: 'incomeYearIndex',
      message: 'Please enter the income year (e.g. 2020-2021)',
      choices: incomeYears.map(incomeYear => ({
        title: `${incomeYear.from}-${incomeYear.to}`,
      })),
    },
    {
      type: 'number',
      name: 'taxableIncome',
      message:
        'Please enter your total taxable income for the full income year',
      validate: value =>
        value <= 0 || isNaN(value)
          ? `Income must be a number greater than 0`
          : true,
    },
  ]);

  // CTRL-C can exit out of the prompt here, so ignore undefined input.
  if (
    typeof answers.incomeYearIndex !== 'undefined' &&
    typeof answers.taxableIncome !== 'undefined'
  ) {
    const taxCalc: IncomeTaxCalc = new IncomeTaxCalc(config);
    const incomeYear: IncomeYear = incomeYears[
      answers.incomeYearIndex
    ] as IncomeYear;
    const totalTax: number = taxCalc.taxableIncome(
      incomeYear,
      answers.taxableIncome,
    );
    console.log(
      `The estimated tax on your taxable income is: ${totalTax === 0 ? 'Nil' : '$' + commaNumber(totalTax.toFixed(2))}\n`,
    );

    console.log(`Resident tax rates ${incomeYear.from}-${incomeYear.to}:\n`);
    const incomeTaxRates: IncomeTaxRate[] =
      config.getIncomeTaxRates(incomeYear) ?? [];
    const tableContent: string = taxRatesCliTable(incomeTaxRates);
    console.log(tableContent);
  }
})();
