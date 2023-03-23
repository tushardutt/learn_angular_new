import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
data:any
constructor(private router:Router){
  this.data=this.router.getCurrentNavigation()?.extras.state?.['response'];
    if (!this.data) {
      this.router.navigate(['']);
    }
}
}
