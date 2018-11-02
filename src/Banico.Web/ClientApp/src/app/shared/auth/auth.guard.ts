import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfigsService } from '../services/configs.service';
import { Config } from '../../entities/config';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private configsService: ConfigsService,
    private router: Router) {
  }

  public async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let url: string = state.url;

    let configValue: string = await this.getConfig(url).first().toPromise();

    switch (configValue) {
      case '': return true;
      case 'public': return true;
      case 'user': return this.checkLogin(url);
      case 'admin': return await this.checkAdmin();
    }

    return true;
  }

  private getConfig(module: string): Observable<string> {
    return this.configsService.get('', 'canActivate', module)
      .map(config => {if (config) {
        return config.value
      } else {
        return '';
      }
    });
  }

  private checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { 
      return true; 
    }

    // Navigate to the login page with extras
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: url } });
    return false;
  }

  private async checkAdmin(): Promise<boolean> {
    let result: boolean = await this.authService.isSuperAdmin().first().toPromise();
    return result;
  }
}