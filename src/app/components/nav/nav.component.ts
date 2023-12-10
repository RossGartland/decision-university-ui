import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import jwt_decode from 'jwt-decode';

@Component({
selector: 'navigation',
templateUrl: './nav.component.html',
styleUrls: ['./nav.component.css']
})
export class NavComponent { 
    
    currentUser: any;
    isLoggedIn = false;
    
    constructor( private authService: AuthService, private storageService: StorageService, public router: Router) {}

    ngOnInit(): void {
        this.isLoggedIn = this.storageService.isLoggedIn();

        if (this.isLoggedIn) {
            this.currentUser = jwt_decode(this.storageService.getUser());
          }
        
      }

      logout(): void {
        this.authService.logout().subscribe({
          next: res => {
            this.storageService.clean();
    
            this.router.navigate(['login']).then(() => {
                window.location.reload();
              });
          },
          error: err => {
            console.log(err);
          }
        });
    }
}