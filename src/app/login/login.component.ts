import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild ('form') loginForm: NgForm

  validationErros = {
    email: null,
    password: null
  }
  constructor(private userService: UserService,  private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password).then(resp => {
      this.router.navigate(['dashboard']);
    }, (err) => {
      if (err.code === 1) {
        this.validationErros.email = err.text;
      } else if (err.code === 2) {
        this.validationErros.password = err.text;
      } else {
        this.validationErros.email = err.text;
        this.validationErros.password = err.text;
      }
    });
  }

}
