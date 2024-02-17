import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-logout.component.html',
  styleUrl: './customer-logout.component.scss'
})
export class CustomerLogoutComponent implements OnInit {

  constructor(private router: Router,
    private service: AuthService,
    private _ngZone: NgZone) {

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public logout(){
    this.service.signOutExternal();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then(() => window.location.reload());
    })
  }
}
