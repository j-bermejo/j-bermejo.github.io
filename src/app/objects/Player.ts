export class Player{

    userName = '';
    userScore = 0;
    userMaxScore = 0;
    userAutoClickers = 0;
    userAutoClickerUpgrade = 0;
    userMegaClicker=0;

    constructor(name:string, score:number, maxScore:number, autoClickers:number, autoClickerUpgrade:number, megaClicker:number){
        this.userName = name;
        this.userScore = score;
        this.userMaxScore = maxScore;
        this.userAutoClickers = autoClickers;
        this.userAutoClickerUpgrade = autoClickerUpgrade;
        this.userMegaClicker=megaClicker;
    }
}
