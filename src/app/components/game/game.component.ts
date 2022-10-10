import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public userName = this.route.snapshot.paramMap.get('userName');
  public score:number=0;
  
  constructor(private route: ActivatedRoute, private router:Router) { }
  
  ngOnInit() {}

  public exit(){
    this.router.navigate(['/']);
  }

  public addSingleMerge(){
    this.score+=1;
  }
  
}
