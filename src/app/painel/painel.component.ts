import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth/services/authentication.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  emailUsuario?: string | null;

  constructor(
    private authService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.authService.usuarioLogado?.subscribe(usuario => this.emailUsuario = usuario?.email)
  }

  public sair(){
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }
}
