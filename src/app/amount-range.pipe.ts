import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountRange',
  standalone: true
})
export class AmountRangePipe implements PipeTransform {


  transform(customers: any[], range: [number, number]): any[] {
    if (!customers || customers.length === 0) {
      return [];
    }
    const [minAmount, maxAmount] = range;
    return customers
    .map(customer => {
      return {
        ...customer,
        transactions: customer.transactions.filter((transaction:any) =>
          transaction.amount >= minAmount && transaction.amount <= maxAmount
        )
      };
    })
    .filter(customer => customer.transactions.length > 0);
  }

}
