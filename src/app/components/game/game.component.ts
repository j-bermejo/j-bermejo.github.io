import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  @ViewChild('autoMergerBtn') autoMergerBtn: any;

  public userName = this.route.snapshot.paramMap.get('userName');
  public score: number = 0;
  public autoClickers: number = 0;
  public autoClickerCost: number = 50;
  public canBuyAutoClicker: boolean = false;
  public scoreView: string = `${this.score}`;
  public upgradeCostView: string = `${this.autoClickerCost}`;
  public hasAnyUpgrade: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private render: Renderer2) { }

  ngOnInit() { }

  public exit() {
    this.router.navigate(['/']);
  }

  public addSingleMerge() {
    this.score += 1;
    this.formatScore();
    this.formatPrice();

    if (this.score >= this.autoClickerCost) this.canBuyAutoClicker = true;
    else this.canBuyAutoClicker = false;
  }

  public buyAutoMerger() {
    if (this.canBuyAutoClicker) {
      this.hasAnyUpgrade = true;
      this.score=this.score-this.autoClickerCost;
      setInterval(() => {
        this.score += 1;
        this.formatScore();
        this.formatPrice();

        if (this.score >= this.autoClickerCost) {
          this.canBuyAutoClicker = true;
          this.render.setStyle(this.autoMergerBtn.nativeElement, 'background-color', 'skyblue');
        }
      }, 100);

      this.canBuyAutoClicker = false;
      this.autoClickers += 1;
      this.autoClickerCost = this.autoClickerCost + this.autoClickerCost * this.autoClickers;
      this.render.setStyle(this.autoMergerBtn.nativeElement, 'background-color', 'rgb(50, 50, 50)');
    }
  }

  public formatScore() {
    switch (true) {
      case this.score < 1000:
        this.scoreView = `${this.score}`;
        break;

      case this.score >= 1000:
        this.scoreView = Math.round((this.score / 1000)*100)/100 + 'k';
        break;

      case this.score >= 1000000:
        this.scoreView = Math.round(this.score / 1000000) + 'M';
        break;
    }
  }

  public formatPrice() {
    switch (true) {
      case this.autoClickerCost < 1000:
        this.upgradeCostView = `${this.autoClickerCost}`;
        break;

      case this.autoClickerCost >= 1000:
        this.upgradeCostView = Math.round((this.autoClickerCost / 1000)*100)/100 + 'k';
        break;

      case this.autoClickerCost >= 1000000:
        this.upgradeCostView = Math.round(this.autoClickerCost / 1000000) + 'M';
        break;
    }
  }

}
