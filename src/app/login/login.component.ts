import { Component, OnInit } from '@angular/core';
import { LoginData } from '../appdata/logindata';
import {Employee} from '../appdata/employee'
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  loginUser: LoginData = {
    username : "",
    password : ""
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }
onSubmit(loginpage: NgForm){
  if((this.loginUser.username === "ganguly") && (this.loginUser.password === "president"))
  {
    localStorage.setItem('username','ganguly');
    console.log("sourav");
    this.router.navigate(['/dashboard']);

  }
  else if((this.loginUser.username == "kohli") && (this.loginUser.password == "captain"))
  {
    localStorage.setItem('username','kohli');
    this.router.navigate(['/employee']);

  }
}

}
