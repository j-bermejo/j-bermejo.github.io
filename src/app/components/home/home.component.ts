import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { Player } from '../../objects/Player';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public inputUserName: string = "";
  public registeredUsers: Player[] = [new Player('Squid', 0, 0, 0, 0, 0), new Player('Foo', 0, 0, 0, 0, 0), new Player('Javi', 0, 0, 0, 0, 0)];
  public namesList: String[] = [];
  public players: Player[] = [];

  public errorMessage: string = "";
  public incorrectUser: boolean = false;

  @ViewChild('userInput') isWrongUser: any;
  @ViewChild('placeholder') placeholder: any;

  constructor(private render: Renderer2, private router: Router) {
    if (window.localStorage.hasOwnProperty('users') == false) {
      localStorage.setItem('users', JSON.stringify(this.registeredUsers));
    }

    this.players = JSON.parse(localStorage.getItem('users') || '[]');
    this.players.map(user => {
      this.namesList.push(user.userName);
    });
  }

  ngOnInit() {
   }

  public saveUser(userInput: string) {
    this.inputUserName = userInput;

  }

  public validateUser() {
    if (this.namesList.includes(this.inputUserName)) {
      this.players.map(user => {
        if (this.inputUserName == user.userName) {
          // this.currentPlayer = user;
          localStorage.setItem('localUserName', user.userName);
          localStorage.setItem('localUserScore', user.userScore.toString());
          localStorage.setItem('localUserMaxScore', user.userMaxScore.toString());
          localStorage.setItem('localAutoClicker', user.userAutoClickers.toString());
          localStorage.setItem('localAutoClickerUpgrade', user.userAutoClickerUpgrade.toString());
          localStorage.setItem('localMegaClicker', user.userMegaClicker.toString());
        }
      });
      this.router.navigate(['/autoclicker']);
    }
    else if (this.inputUserName == '') {
      this.incorrectUser = true;
      this.errorMessage = 'Required field';
      this.render.setStyle(this.isWrongUser.nativeElement, 'border-color', 'red');
      this.render.setStyle(this.placeholder.nativeElement, 'color', 'red');
    }
    else {
      this.incorrectUser = true;
      this.errorMessage = 'Invalid user, try some of this ' + this.namesList.map(user => { return user })
      this.render.setStyle(this.isWrongUser.nativeElement, 'border-color', 'red');
      this.render.setStyle(this.placeholder.nativeElement, 'color', 'red');
      this.isWrongUser.nativeElement.value = '';
    }
  }

}
