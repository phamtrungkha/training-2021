import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../../core/service/basic-authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('username')){
      this.authService.logout();
      window.location.reload();
    }
  }

}
