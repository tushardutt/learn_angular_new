import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  users: any;
visible:boolean=false;
popup:boolean=false;
userResult:any
  editForm!: FormGroup;
submitted: any;

  constructor(private userdata:UserService,private router:Router,private toast:NgToastService,private fb: FormBuilder) {
    userdata.getUser().subscribe((data)=>{
      console.warn(data);
      this.users=data})
  }
  ngOnInit(): void {
    this.editForm = this.fb.group({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    });
  }
  
  get email(){
    return this.editForm.get('email');
    }
  submit(register: any) {

    console.log("Form Submitted !",register);
    this.userdata.saveUser(register).subscribe((result)=>{
      // this.router.navigate(['/registration']);
      // window.location.reload();
      this.toast.success({detail:'Success Message',summary:'Record Entered Successfully',duration:5000});
      console.warn(result);
      return false;
    })

  }
  deleteUser(userid:any){
    if(confirm("delete")){
    this.userdata.deleteUser(userid).subscribe((result)=>{
      console.warn(result);
      window.location.reload();
    })
  }
  }

  getUserById(userid:any){
    this.userdata.getUserById(userid).subscribe((result)=>{
      // console.warn(result);
      this.userResult = result;
      console.log("result"+this.userResult.password);
      this.popup=true;
    })
  }

  editUser(form:FormGroup){
    console.warn("test data"+form);
    var data = {
      id: this.userResult.id,
      password: this.userResult.password,
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      email: form.value.email
    }
    console.log("result pwd"+this.userResult.password);
    this.userdata.editUser(this.userResult.id,data);
  }

  closePopUp(){
    this.popup=false;
    window.location.reload();
  }

    
}
