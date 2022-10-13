import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/objects/Player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('autoMergerBtn') autoMergerBtn: any;
  @ViewChild('autoMergerUpgradeBtn') autoMergerUpgradeBtn: any;
  @ViewChild('megaClickerBtn') megaClickerBtn: any;

  public userName: string = localStorage.getItem('localUserName') || '';
  public player: Player[] = [];
  public score: number = Number(localStorage.getItem('localUserScore') || '');
  public clickPower: number = 1;
  public gameIsPaused: boolean = false;

  public autoClickers: number = Number(localStorage.getItem('localAutoClicker') || '');
  public autoClickerCost: number = 50;
  public canBuyAutoClicker: boolean = false;

  public autoClickerUpgrade: number = Number(localStorage.getItem('localAutoClickerUpgrade') || '');
  public autoClickerUpgradeCost: number = 2000;
  public canBuyAutoClickerUpgrade: boolean = false;

  public megaClicker: number = Number(localStorage.getItem('localMegaClicker') || '');
  public megaClickerCost: number = 5000;
  public canBuyMegaClicker: boolean = false;

  public scoreView: string = `${this.score}`;
  public autoClickerCostView: string = `${this.autoClickerCost}`;
  public autoClickerUpgradeCostView: string = `${this.autoClickerUpgradeCost}`;
  public megaClickerCostView: string = `${this.megaClickerCost}`;


  constructor(private route: ActivatedRoute, private router: Router, private render: Renderer2) {

  }

  ngOnInit() {
    for (let i = 0; i <= this.autoClickers; i++) {
      this.autoClickerCost = this.autoClickerCost + this.autoClickerCost * i;
      this.autoClickerCostView = this.formatVariables(this.autoClickerCost, this.autoClickerCostView);
    }
    
    for (let i = 0; i <= this.autoClickerUpgrade; i++) {
      this.autoClickerUpgradeCost = this.autoClickerUpgradeCost + this.autoClickerUpgradeCost * i;
      this.autoClickerUpgradeCostView = this.formatVariables(this.autoClickerUpgradeCost, this.autoClickerUpgradeCostView);
    }
    
    for (let i = 0; i <= this.megaClicker; i++) {
      this.megaClickerCost = this.megaClickerCost + this.megaClickerCost * i;
      this.megaClickerCostView = this.formatVariables(this.megaClickerCost, this.megaClickerCostView);
    }

    if (this.autoClickers > 0) {
      for (let i = 0; i < this.autoClickers; i++) {
        let autoClick = setInterval(() => {
          if (this.autoClickerUpgrade != 0) this.score += this.autoClickers + this.autoClickerUpgrade * 10;
          else this.score += 1;

          this.updateUserData();
          this.scoreView = this.formatVariables(this.score, this.scoreView);

          if (this.gameIsPaused) clearInterval(autoClick);
        }, 100);
      }
    }
  }

  public exit() {
    this.router.navigate(['/']);
    this.gameIsPaused = true;
  }

  public updateUserData() {
    this.player = JSON.parse(localStorage.getItem('users') || "[]");
    this.player.map((user) => {
      if (this.userName == user.userName) {
        user.userScore = this.score;
        user.userAutoClickers = this.autoClickers;
        user.userAutoClickerUpgrade = this.autoClickerUpgrade;
        user.userMegaClicker = this.megaClicker;
        localStorage.setItem('users', JSON.stringify(this.player));
      }
    });
  }

  /*Cambiar el tema del autoclick, con una variable q indique q se ha realizado cada compra cambiando de true a false segun se compre
  añadir otra variable que pause el juego si se sale y ver como cambiar esa variable cuando se cierre ventana */

  public addMerge() {
    this.score += this.clickPower;
    this.updateUserData();

    this.scoreView = this.formatVariables(this.score, this.scoreView);
    this.upgradeButtonsStatus();

  }

  public buyAutoClicker() {
    if (this.canBuyAutoClicker) {
      this.score = this.score - this.autoClickerCost;
      this.autoClickers += 1;
      this.autoClickerCost = this.autoClickerCost + this.autoClickerCost * this.autoClickers;

      let autoClick = setInterval(() => {
        if (this.autoClickerUpgrade != 0) this.score += this.autoClickers + this.autoClickerUpgrade * 10;
        else this.score += 1;

        this.updateUserData();
        this.scoreView = this.formatVariables(this.score, this.scoreView);

        if (this.gameIsPaused) clearInterval(autoClick);
      }, 100);
      this.updateUserData();

      this.autoClickerCostView = this.formatVariables(this.autoClickerCost, this.autoClickerCostView);
      this.upgradeButtonsStatus();
    }
  }

  public buyAutoClickerUpgrade() {
    if (this.canBuyAutoClickerUpgrade) {
      this.score = this.score - this.autoClickerUpgradeCost;
      this.autoClickerUpgrade += 1;
      this.autoClickerUpgradeCost = this.autoClickerUpgradeCost + this.autoClickerUpgradeCost * this.autoClickerUpgrade;

      this.updateUserData();

      this.autoClickerUpgradeCostView = this.formatVariables(this.autoClickerUpgradeCost, this.autoClickerUpgradeCostView);
      this.upgradeButtonsStatus();
    }
  }

  public buyMegaClicker() {
    if (this.canBuyMegaClicker) {
      this.score = this.score - this.megaClickerCost;
      this.megaClicker += 1;
      this.clickPower = Math.pow(10, this.megaClicker);
      this.megaClickerCost = this.megaClickerCost + this.megaClickerCost * this.megaClicker;

      this.updateUserData();

      this.megaClickerCostView = this.formatVariables(this.megaClickerCost, this.megaClickerCostView);
      this.upgradeButtonsStatus();
    }
  }

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
    const suffixes = ["", "k", "M", "B", "T", "C", "Q", "S", "MM", "MB", "MT", "MC", "MQ", "MS"];
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
