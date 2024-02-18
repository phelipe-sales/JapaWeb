import { Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.scss'
})
export class CustomerLoginComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<CustomerLoginComponent>,
    private router: Router,
    private _ngZone: NgZone,
    private service: AuthService) {

  }

  ngOnInit(): void {
    //@ts-ignore
    window.onGoogleLibraryLoad = () =>{
      //@ts-ignore
      google.accounts.id.initialize({
        client_id: '116632478825-hdno7o6bt86a87il6jhs1qemsbedh52j.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      //@ts-ignore
      google.accounts.id.renderButton(
        //@ts-ignore
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", width: "100%" }
      );
      //@ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    }
  }

  async handleCredentialResponse(response: CredentialResponse){
    this.service.LoginWithGoogle(response.credential)
    .subscribe({
      next: (response) => {
        localStorage.setItem('jwtToken',response.data.jwt);
        console.log('Login response: ', response);
        window.location.reload();

      },
      error: (error) => {
        console.log('Error response: ', error);
      }
    })
  }

}