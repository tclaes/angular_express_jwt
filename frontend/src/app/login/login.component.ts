import { Component, OnInit } from '@angular/core';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private jwtService: JwtService, private router: Router ) { }

  email = '';
  password = '';
  error = '';

  public login() {
    this.jwtService.login(this.email, this.password)
    .subscribe(
      res => this.router.navigate(['contact-list']),
      err => this.error = 'Authentication error'
    );
  }

  ngOnInit() {
  }




}
