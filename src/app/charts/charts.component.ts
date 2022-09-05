import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  name = 'Angular';
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;

    view: any[] = [600, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;
  doughnut = true;

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#bea989', '#bb5a5a', '#5e476d'],
  };
  //pie
  showLabels = true;

  multi = [
    {
      "name": "Alberta",
      "series": [
        {
          "name": "New Cases",
          "value": 539
        },
        {
          "name": "New Deaths",
          "value": 100
        },
        {
          "name": "New Recovered",
          "value": 751
        }
      ]
    },
    {
      "name": "BC",
      "series": [
        {
          "name": "New Cases",
          "value": 391
        },
        {
          "name": "New Deaths",
          "value": 13
        },
        {
          "name": "New Recovered",
          "value": 0
        }
      ]
    },
    {
      "name": "Manitoba",
      "series": [
        {
          "name": "New Cases",
          "value": 162
        },
        {
          "name": "New Deaths",
          "value": 3
        },
        {
          "name": "New Recovered",
          "value": 2967
        }
      ]
    },
    {
      "name": "New Brunswick",
      "series": [
        {
          "name": "New Cases",
          "value": 391
        },
        {
          "name": "New Deaths",
          "value": 2
        },
        {
          "name": "New Recovered",
          "value": 305
        }
      ]
    },
    {
      "name": "NL",
      "series": [
        {
          "name": "New Cases",
          "value": 0
        },
        {
          "name": "New Deaths",
          "value": 0
        },
        {
          "name": "New Recovered",
          "value": 0
        }
      ]
    },
    {
      "name": "Nova Scotia",
      "series": [
        {
          "name": "New Cases",
          "value": 421
        },
        {
          "name": "New Deaths",
          "value": 3
        },
        {
          "name": "New Recovered",
          "value": 151
        }
      ]
    },
    {
      "name": "Nunavut",
      "series": [
        {
          "name": "New Cases",
          "value": 0
        },
        {
          "name": "New Deaths",
          "value": 0
        },
        {
          "name": "New Recovered",
          "value": 0
        }
      ]
    },
    {
      "name": "NWT",
      "series": [
        {
          "name": "New Cases",
          "value": 73
        },
        {
          "name": "New Deaths",
          "value": 0
        },
        {
          "name": "New Recovered",
          "value": 95
        }
      ]
    },
    {
      "name": "Ontario",
      "series": [
        {
          "name": "New Cases",
          "value": 1928
        },
        {
          "name": "New Deaths",
          "value": 11
        },
        {
          "name": "New Recovered",
          "value": 1948
        }
      ]
    },
    {
      "name": "PEI",
      "series": [
        {
          "name": "New Cases",
          "value": 0
        },
        {
          "name": "New Deaths",
          "value": 0
        },
        {
          "name": "New Recovered",
          "value": 0
        }
      ]
    },
    {
      "name": "Quebec",
      "series": [
        {
          "name": "New Cases",
          "value": 1257
        },
        {
          "name": "New Deaths",
          "value": 24
        },
        {
          "name": "New Recovered",
          "value": 1384
        }
      ]
    },
    {
      "name": "Repatriated",
      "series": [
        {
          "name": "New Cases",
          "value": 0
        },
        {
          "name": "New Deaths",
          "value": 0
        },
        {
          "name": "New Recovered",
          "value": 0
        }
      ]
    },
    {
      "name": "Saskatchewan",
      "series": [
        {
          "name": "New Cases",
          "value": 0
        },
        {
          "name": "New Deaths",
          "value": 0
        },
        {
          "name": "New Recovered",
          "value": 0
        }
      ]
    },
    {
      "name": "Yukon",
      "series": [
        {
          "name": "New Cases",
          "value": 2
        },
        {
          "name": "New Deaths",
          "value": 0
        },
        {
          "name": "New Recovered",
          "value": 3
        }
      ]
    },

  ];
  public single = [
    {
      "name": "New Cases",
      "value": 2243772
    },
    {
      "name": "New Deaths",
      "value": 1126000
    },
    {
      "name": "New Hospitalized",
      "value": 296215
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
