import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/users';
  constructor(private http:HttpClient) { }
  result:any;
  getUser(){
    return this.http.get(this.url);
  }
  public saveUser(data:any){
     return this.http.post(this.url,data);
  }
  public authenticate(data:any){
     if(data){
      this.result = "success";
      return this.result ;
     }
     else{
      this.result = "fail";
      return this.result;
     }
  }
  public deleteUser(userid:any){
    return this.http.delete(this.url+'/'+userid);
  }

  public getUserById(userid: any): Observable<any> {
    return this.http.get(this.url + '/' + userid);
  }

  public editUser(userid:any,userdata: Object){
    return this.http.put(this.url + '/'+userid,userdata).subscribe(data => {
      console.log(data);
    });
  }
}
