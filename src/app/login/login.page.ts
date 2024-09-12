import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  userTest = { username: 'administrador1', password: 'admin123' };

  constructor(public formBuilder: FormBuilder, public router: Router) {
    this.formularioLogin = this.formBuilder.group({
      usuario: new FormControl('', [Validators.required, Validators.max(15)]),
      contrasena: new FormControl('', Validators.required),
    });
  }

  async guardar() {
    if (this.formularioLogin.valid) {
      const datosForm = this.formularioLogin.value;
      const datos = {
        usuario: datosForm.usuario,
        pass: datosForm.contrasena,
      };
      if (
        datos.usuario === this.userTest.username &&
        datos.pass === this.userTest.password
      ) {
        const navigationExtras: NavigationExtras = {
          state: {
            user: datos.usuario,
          },
        };
        this.router.navigate(['/home'], navigationExtras);
      } else {
        alert('Usuario y/o contraseña incorrectos');
      }
    }
  }

  ngOnInit() {}
}
