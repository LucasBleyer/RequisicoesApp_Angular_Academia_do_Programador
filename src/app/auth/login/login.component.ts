import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public formRecuperacao: FormGroup;

  constructor(
    private FormBuilder: FormBuilder,
    private AuthService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.form = this.FormBuilder.group({
      email: new FormControl(""),
      password: new FormControl(""),
    })

    this.formRecuperacao = this.FormBuilder.group({
      emailRecuperacao: new FormControl("")
    })
  }

  get email(): AbstractControl | null{
    return this.form.get("email");
  }

  get password(): AbstractControl | null{
    return this.form.get("password");
  }

  get emailRecuperacao(){
    return this.formRecuperacao.get("emailRecuperacao");
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

  public abrirModalRecuperacao(modal: TemplateRef<any>){
    this.modalService.open(modal)
      .result
      .then(resultado => {
        if(resultado === "enviar"){
          this.AuthService.resetarSenha(this.emailRecuperacao?.value)
        }
      })
      .catch(() => {
        this.formRecuperacao.get("emailRecuperacao")?.reset();
      });
  }
}
