import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  url = 'http://localhost:3000/users';
  user: any;
  result:any;
  constructor(private http:HttpClient,private userdata:UserService,private router:Router) { }
submit(login: any) {
  this.http.get<any>(this.url)
    .subscribe(res=>{
      this.user = res.find((a:any)=>{
        return a.email === login.email && a.password === login.password
      });
      this.result = this.userdata.authenticate(this.user);
      console.warn(this.result);
      if(this.result==='success'){
        //login.reset();
        // $('.form-box').css('display','none');
        this.router.navigate(['dashboard'], {
          state: {
            response: this.user,
          },
        });
      }else{
        alert('User Not Found');
        this.router.navigate(['login']);
      }
    });
    // this.userdata.authenticate(this.user).subscribe((result: string)=>{
    //   // this.router.navigate(['/registration']);
    //   console.warn("result"+result);
    // })

    // this.result = this.userdata.authenticate(this.user);
    // console.warn(this.result);
}
}
