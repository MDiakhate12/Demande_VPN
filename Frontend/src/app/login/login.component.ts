import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: '#app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  input = {};
  key: String;

  constructor(private _loginService:LoginService) { }

  ngOnInit() {
    this.input = {
      username: '',
      password: ''
    };

    
  }
  onLogin(){
    this._loginService.loginUser(this.input)
    .subscribe(response => {this.key=response;
      console.log(response);
    },
    error =>{
      console.log('error',error);
      console.log("Wrong credentials !");
    } 
    );
  };

}
