import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
})
export class RecuperarContrasenaPage implements OnInit {
  formularioRecuperacion: FormGroup;

  userTest = { username: 'administrador1' };
  alertButtons = ['Action'];
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private alertController: AlertController
  ) {
    this.formularioRecuperacion = this.formBuilder.group({
      usuario: new FormControl('', [Validators.required, Validators.max(15)]),
    });
  }

  async enviarSolicitud() {
    if (this.formularioRecuperacion.valid) {
      const usuario = this.formularioRecuperacion.value.usuario;
      if (usuario === this.userTest.username) {
        // Mostrar alerta de solicitud enviada correctamente
        const alert = await this.alertController.create({
          header: 'Solicitud enviada correctamente!',
          message:
            'Le hemos enviado un mensaje a su correo con las indicaciones para recuperar su contraseña.',
          buttons: ['Continuar'],
        });
        await alert.present();
        await alert.onDidDismiss();
        setTimeout(async () => {
          this.router.navigate(['/login']);
        }, 1000);
      } else {
        const alert = await this.alertController.create({
          message: 'El usuario ingresado no se encuentra registrado',
          buttons: ['Entendido'],
        });

        await alert.present();
      }
    }
  }

  volverHome() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {}
}
