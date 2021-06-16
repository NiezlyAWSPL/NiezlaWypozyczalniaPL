import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {UserService} from "../app/service/user.service";
import {HeaderConstants, RoleConstants} from "../app/dto/constants";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.getCurrentUser().pipe(map(loggedUser => {
      if (loggedUser.authorities.some(a => a.includes(RoleConstants.ROLE_LIBRARIAN))) {
        return true;
      }
      this.router.navigate(['start']);
      return false;
    }));
  }

}
