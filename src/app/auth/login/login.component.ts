import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { clippingParents } from '@popperjs/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(""),
      password: new FormControl(""),
    })
  }

  public login(): void{
    const email: AbstractControl | null = this.form.get("email");
    const password: AbstractControl | null = this.form.get("password");

    console.log(email?.value);
    console.log(password?.value);
  }
}
