import { Component, OnInit } from '@angular/core';
import { AbstractControl, EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { clippingParents } from '@popperjs/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private AuthService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.FormBuilder.group({
      email: new FormControl(""),
      password: new FormControl(""),
    })
  }

  get email(): AbstractControl | null{
    return this.form.get("email");
  }

  get password(): AbstractControl | null{
    return this.form.get("password");
  }

  public async login(){
    const email = this.email?.value
    const password = this.password?.value;

    try{
      const resposta = await this.AuthService.login(email, password);

      if(resposta?.user){
        this.router.navigate(["/painel"])
      }
    }
    catch(error){
      console.error()
    }
  }
}
