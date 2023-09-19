import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Cost } from 'src/app/models/cost.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit{

  @Input()
  costs!: Cost[];

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'left',
      }
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };

  public pieChartType: ChartType = 'pie';

  ngOnInit(): void {
    this.generatePie()
  }


  generatePie() {
    if (this.costs.length > 0) {
      const labels: any[] = []
      const datasets: any[] = []
      this.costs.forEach(item => {
        labels.push(item.title);
        datasets.push(item.amount);
      })
      this.pieChartData.labels = [...labels];
      this.pieChartData.datasets = [{
        data: [...datasets]
      }]
    }

  }

}
