import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-waffles-menu',
  templateUrl: './waffles-menu.component.html',
  styleUrls: ['./waffles-menu.component.css']
})
export class WafflesMenuComponent {
  constructor(private router: Router){}
  navigateWaffles(){
    this.router.navigate(['waffle']); 
  }
  navigateWafflesCanasta(){
    this.router.navigate(['waffleCanasta']); 
  }
}
