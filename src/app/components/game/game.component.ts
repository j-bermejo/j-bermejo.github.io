import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  @ViewChild('autoMergerBtn') autoMergerBtn: any;
  @ViewChild('autoMergerUpgradeBtn') autoMergerUpgradeBtn: any;
  @ViewChild('megaClickerBtn') megaClickerBtn: any;

  public userName = this.route.snapshot.paramMap.get('userName');
  public score: number = 0;
  public clickPower: number = 1;

  public autoClickers: number = 0;
  public autoClickerCost: number = 50;
  public canBuyAutoClicker: boolean = false;

  public autoClickerUpgrade: number = 0;
  public autoClickerUpgradeCost: number = 2000;
  public canBuyAutoClickerUpgrade: boolean = false;

  public scoreView: string = `${this.score}`;
  public autoClickerCostView: string = `${this.autoClickerCost}`;
  public autoClickerUpgradeCostView: string = '2k';
  public megaClickerCostView: string = '5k';

  public megaClicker: number = 0;
  public megaClickerCost: number = 5000;
  public canBuyMegaClicker: boolean = false; 

  constructor(private route: ActivatedRoute, private router: Router, private render: Renderer2) { }

  ngOnInit() { }

  public buyMegaClicker() {
    if (this.canBuyMegaClicker) {
      this.score = this.score - this.megaClickerCost;
      this.megaClicker += 1;
      this.clickPower = Math.pow(10, this.megaClicker);
      this.megaClickerCost = this.megaClickerCost + this.megaClickerCost * this.megaClicker;

      this.megaClickerCostView = this.formatVariables(this.megaClickerCost, this.megaClickerCostView);
      this.upgradeButtonsStatus();
    }
  }

  public exit() {
    this.router.navigate(['/']);
  }

  public addMerge() {
    this.score += this.clickPower;

    this.scoreView = this.formatVariables(this.score, this.scoreView);
    this.upgradeButtonsStatus();

    console.log('AUTO: '+this.autoClickers + this.autoClickerUpgrade * 5+ '\nPOWER: '+this.clickPower);
    
  }

  public buyAutoClicker() {
    if (this.canBuyAutoClicker) {
      this.score = this.score - this.autoClickerCost;
      this.autoClickers += 1;
      this.autoClickerCost = this.autoClickerCost + this.autoClickerCost * this.autoClickers;

      setInterval(() => {
        if (this.autoClickerUpgrade != 0) this.score += this.autoClickers + this.autoClickerUpgrade * 10;
        else this.score += 1;

        this.scoreView = this.formatVariables(this.score, this.scoreView);
        this.autoClickerCostView = this.formatVariables(this.autoClickerCost, this.autoClickerCostView);
        this.upgradeButtonsStatus();
      }, 100);
    }
  }

  public buyAutoClickerUpgrade() {
    if (this.canBuyAutoClickerUpgrade) {
      this.score = this.score - this.autoClickerUpgradeCost;
      this.autoClickerUpgrade += 1;
      this.autoClickerUpgradeCost = this.autoClickerUpgradeCost + this.autoClickerUpgradeCost * this.autoClickerUpgrade;

      this.autoClickerUpgradeCostView = this.formatVariables(this.autoClickerUpgradeCost, this.autoClickerUpgradeCostView);
      this.upgradeButtonsStatus();
    }
  }

 //

  public upgradeButtonsStatus() {
    if (this.score >= this.autoClickerCost) {
      this.canBuyAutoClicker = true;
      this.render.setStyle(this.autoMergerBtn.nativeElement, 'background-color', 'skyblue');
    } else {
      this.canBuyAutoClicker = false;
      this.render.setStyle(this.autoMergerBtn.nativeElement, 'background-color', 'rgb(50, 50, 50)');
    }

    if (this.score >= this.autoClickerUpgradeCost) {
      this.canBuyAutoClickerUpgrade = true;
      this.render.setStyle(this.autoMergerUpgradeBtn.nativeElement, 'background-color', 'skyblue');
    } else {
      this.canBuyAutoClickerUpgrade = false;
      this.render.setStyle(this.autoMergerUpgradeBtn.nativeElement, 'background-color', 'rgb(50, 50, 50)');
    }

    if (this.score >= this.megaClickerCost) {
      this.canBuyMegaClicker = true;
      this.render.setStyle(this.megaClickerBtn.nativeElement, 'background-color', 'skyblue');
    } else {
      this.canBuyMegaClicker = false;
      this.render.setStyle(this.megaClickerBtn.nativeElement, 'background-color', 'rgb(50, 50, 50)');
    }
  }

  public formatVariables(variableToFormat: number, variableFormatted: string) {
    const suffixes = ["", "k", "M", "B", "T","C","Q","S","MM","MB","MT","MC","MQ","MS"];
    let suffixIndex = 0;

    while (variableToFormat >= 1000) {
      variableToFormat /= 1000;
      suffixIndex++;
    } 

    variableFormatted = variableToFormat.toPrecision(3);
    variableFormatted += suffixes[suffixIndex];

    return variableFormatted;
  }
}
