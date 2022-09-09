import {Component, ElementRef, OnInit} from '@angular/core';
import {Perfil} from "../../../core/models/Perfil";
import {Articulo} from "../../../core/models/Articulo";
import {ElementoService} from "../../../core/services/elemento.service";
import {PerfilService} from "../../../core/services/perfil.service";
import {ArticuloService} from "../../../core/services/articulo.service";
import {ModalController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ArticuloCrearPage} from "../../foro/articulo-crear/articulo-crear.page";
import {Mensaje} from "../../../core/models/Mensaje";
import {MensajeService} from "../../../core/services/mensaje.service";
import {Grupo} from "../../../core/models/Grupo";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-mensaje-listado',
  templateUrl: './mensaje-listado.page.html',
  styleUrls: ['./mensaje-listado.page.scss'],
})
export class MensajeListadoPage implements OnInit {
  mensajes: Mensaje[];

  crearMensajeForm: FormGroup = new FormGroup({
    contenido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    receptor: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  constructor(public  elementoService: ElementoService,
              public  mensajeService: MensajeService,
              public  articuloService: ArticuloService,
              private modalController: ModalController,
              private elementRef: ElementRef,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadMensajes();
  }

  private loadMensajes(){
    this.mensajeService.getAllMensajesDeUsuario(this.getUserId()).subscribe(mensajes => {
      this.mensajes = mensajes;
      console.log("mensajes todos");
      console.log(this.mensajes);
    });
  }

  crearMensaje() {
    if (!this.crearMensajeForm.valid){
      const firstNgInvalid: HTMLElement = this.elementRef.nativeElement.querySelector('form .ng-invalid');
      this.crearMensajeForm.markAllAsTouched();
      (firstNgInvalid as HTMLIonInputElement).setFocus().then();
    }
    else {
      const mensaje: Mensaje = {
        mensajeId: null,
        autor: this.getUsername(),
        autorId: this.getUserId(),
        receptor: this.crearMensajeForm.get('receptor').value,
        receptorId: null,
        fechaDeCreacion: new Date(),
        contenido: this.crearMensajeForm.get('contenido').value,
      };
      this.mensajeService.enviarMensaje(mensaje);
    }
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  getUserId():string {
    return sessionStorage.getItem('userId');
  }

  eliminarMensaje(mensajeId: string) {
    this.mensajeService.eliminarMensaje(mensajeId);
  }
}
