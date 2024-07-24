import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDataService } from '../get-data.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FillterbynamePipe } from '../fillterbyname.pipe';
import { HttpClientModule } from '@angular/common/http';
import { SliderModule } from 'primeng/slider';
import { AmountRangePipe } from '../amount-range.pipe';
@Component({
  selector: 'app-landpage',
  standalone: true,
  imports: [
    CommonModule,
    AmountRangePipe,
    HttpClientModule,
    SliderModule,
    TableModule,
    ButtonModule,
    RouterLink,
    FormsModule,
    FillterbynamePipe,
  ],
  templateUrl: './landpage.component.html',
  styleUrls: ['./landpage.component.css'],
})
export class LandpageComponent implements OnInit {
  constructor(private _GetDataService: GetDataService) {}
  customers: any[] = [];
  transactions: any[] = [];
  value!: string;
  minAmount: number = 0;
  maxAmount: number = 2000;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this._GetDataService.getCustomers().subscribe((customers) => {
      this.customers = customers;
      this._GetDataService.getTrans().subscribe((transactions) => {
        this.transactions = transactions;
        this.aggregateData();
        console.log(this.customers);
      });
    });
  }
  

  aggregateData(): void {
    this.customers = this.customers.map((customer) => ({
      ...customer,
      transactions: this.transactions.filter(
        (transaction: any) => transaction.customer_id == customer.id
      ),

    }));
  }
}
