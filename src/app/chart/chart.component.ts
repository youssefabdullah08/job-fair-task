import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { GetDataService } from '../get-data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, ChartModule,RouterLink],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  chartData: any;
  chartOptions: any;
  customerId: any;
  customerData:any
  CustmorName:string=''
  transes!: any[];
TotalAmount!:number
Avg:number=0
  constructor(
    private route: ActivatedRoute,
    private _GetDataService: GetDataService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.customerId = +params.get('id')!;
      this.fetchData();
    });
    this.initializeChartOptions();
    this.getCustmorname()
  }

  fetchData(): void {
    this._GetDataService.getTrans().subscribe({
      next: (res) => {
        const x = [];
        let y =0
        let z=0
        for (let i = 0; i < res.length; i++) {
          if (res[i].customer_id == this.customerId) {
            ;
            x.push(res[i]);
            y+=res[i].amount
            z++
          }
        }
        this.transes = x;
        this.TotalAmount=y
        this.Avg=y/z
        this.prepareChartData(this.transes);
        
      },
    });
  }
  getCustmorname():void{
this._GetDataService.getCustomers(`?id=${this.customerId}`).subscribe({
  next:(res)=>{
    console.log(res);
    this.CustmorName=res[0].name
  }
})
  }

  prepareChartData(transactions: any[]): void {
    const labels = transactions.map((transaction) => transaction.date);
    const data = transactions.map((transaction) => transaction.amount);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Transaction Amount',
          data: data,
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          fill: false,
          tension: 0.4,
        },
      ],
    };
  }

  initializeChartOptions(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
