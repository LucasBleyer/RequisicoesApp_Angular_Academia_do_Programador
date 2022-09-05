import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    ){ }

  canActivate(): Observable<boolean>{
    return this.authService.usuarioLogado
      .pipe(
        take(1),
        map(usuario => {
          if(!usuario)
            return true;

            this.router.navigate(["/painel"]);
            return false;

        })
      )
  }

}
