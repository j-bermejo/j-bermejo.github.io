import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public registeredUsers = ['Squid', 'Javi', 'BBVA']
  public userName:string="";
  public errorMessage:string="";
  public incorrectUser:boolean=false;

@ViewChild('userInput') isWrongUser:any;
@ViewChild('placeholder') placeholder:any;

  constructor(private render: Renderer2, private router:Router) { }

  ngOnInit() {console.log(this.userName);}

  public saveUser(userInput: string) {
    this.userName = userInput;

  }

  public validateUser(){
    if(this.registeredUsers.includes(this.userName)){
      this.incorrectUser = false;
      this.router.navigate(['/autoclicker', this.userName]);
    }
    else if(this.userName == ''){
      this.incorrectUser = true;
      this.errorMessage = 'Required field';
      this.render.setStyle(this.isWrongUser.nativeElement, 'border-color', 'red');
      this.render.setStyle(this.placeholder.nativeElement, 'color', 'red');
    }
    else{
      this.incorrectUser = true;
      this.errorMessage = 'Invalid user, try some of this(Squid, Javi, BBVA)'
      this.render.setStyle(this.isWrongUser.nativeElement, 'border-color', 'red');
      this.render.setStyle(this.placeholder.nativeElement, 'color', 'red');
      this.isWrongUser.nativeElement.value='';
    }
  }

}
