import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as Highcharts from "highcharts";
import { Observable } from "rxjs";

import { StatistiqueAnnuelToken } from "../../models/statistiqueAnnuelToken";
import { StatistiqueAnnuelTokenService } from "../../services/statistiqueAnnuelToken.service";
import { Typetoken } from "../../models/typetoken";
import { TypetokenService } from "../../services/typetoken.service";
import * as echarts from "echarts";
import { EChartsOption } from "echarts";

@Component({
  selector: "app-stat",
  templateUrl: "./statistique.component.html",
  styleUrls: ["./statistique.component.css"],
})
export class StatistiqueComponent implements OnInit {
  statistiqueAnnuelsToken: Observable<StatistiqueAnnuelToken[]>;
  res: any;
  categories = new Array<string>();
  options: any;
  typetokens = new Array<Typetoken>();
  myMap = new Map<string, Array<number>>();

  parsedData: any;
  echartsInstance: any;

  constructor(
    private typeTokensService: TypetokenService,
    private stat: StatistiqueAnnuelTokenService,
    private statistiqueannuelTokenService: StatistiqueAnnuelTokenService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reloadData();

    this.createChart();
  }

  /* extraire différent années */
  extractYears() {
    for (let i = 0, j = 0; i < this.res.length; i++) {
      if (!this.categories.find((element) => element == this.res[i].annee)) {
        this.categories[j] = this.res[i].annee;
        //console.log(this.categories[j]);
        j++;
      }
    }
    // console.log("lentgh categories " + this.categories.length);
  }

  extractMap() {
    for (let t of this.typetokens) {
      var values = new Array<number>(this.categories.length);
      values.fill(0);
      //chercher les valeurs pour le type de token
      var nom_token = t.nom;
      for (let ele of this.res) {
        //console.log(ele.typeToken);
        if (ele.typeToken == nom_token) {

          //It finds the index of the year ele.annee in the categories
          var index = this.categories.findIndex(
            (element) => element == ele.annee
          );
          // console.log("index cat " + index);
          values[index] = ele.nb;
        }
      }
      this.myMap.set(t.nom, values);
    }
  }

  reloadData() {
    this.typeTokensService.getTypeTokenList().subscribe((data) => {
      this.typetokens = data;
      //console.log("Nombre des tokens"+ this.typetokens.length);
    });
    
    this.statistiqueAnnuelsToken =
      this.statistiqueannuelTokenService.getStatistiqueAnnuelsList();
    this.stat.getStatToken().subscribe(
      (data) => {
        this.res = data;
        //console.log("taille du résultat"+ this.res.length);

        this.extractYears();
        this.extractMap();

        this.options = {
          Chart: {
            type: "area",
            height: 700,
          },
          title: {
            text: "Ventes des types de Tokens par année   ",
          },
          credits: {
            enabled: false,
          },
          xAxis: {
            categories: this.categories,
            tickmarkPlacement: "off",
            title: {
              enabled: false,
            },
          },
        };

        Highcharts.chart("container", this.options);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createChart() {
    this.statistiqueannuelTokenService
      .getChartStatsVenteToken()
      .subscribe((res) => {
        const chart = document.getElementById("chart-container");
        const myChart = echarts.init(chart);
        let option: EChartsOption;
        option = {
          title: {
            text: "Ventes des types de Tokens par année    ",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          legend: {},
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            type: "category",
            data: res.axisXData,
          },
          yAxis: {
            type: "value",
            boundaryGap: [0, 0.01],
          },
          series: res.series,
        };
        option && myChart.setOption(option);
      });
  }
  onChartInit(ec) {
    this.echartsInstance = ec;
  }
}
