import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Elemento} from "../../../core/models/Elemento";
import {UserService} from "../../../core/services/user.service";
import {ElementoService} from "../../../core/services/elemento.service";
import {ListaService} from "../../../core/services/lista.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Lista} from "../../../core/models/Lista";
import {Usuario} from "../../../core/models/Usuario";
import {Perfil} from "../../../core/models/Perfil";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NavController, PopoverController} from "@ionic/angular";
import {PerfilService} from "../../../core/services/perfil.service";
import { Grupo } from 'src/app/core/models/Grupo';
import { GrupoService } from 'src/app/core/services/grupo.service';

@Component({
  selector: 'app-grupo-crear',
  templateUrl: './grupo-crear.page.html',
  styleUrls: ['./grupo-crear.page.scss'],
})
export class GrupoCrearPage implements OnInit {
//Input
  @Input() elementos: Elemento[];

  elementosAgregados: Elemento[] = [];

  crearGrupoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public userService: UserService,
    public grupoService: GrupoService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter(){

  }

  ionViewWillEnter(){
  }

  ionViewDidLeave(){
  }

  crearGrupo() {
    if (!this.crearGrupoForm.valid){
      const firstNgInvalid: HTMLElement = this.elementRef.nativeElement.querySelector('form .ng-invalid');
      this.crearGrupoForm.markAllAsTouched();
      (firstNgInvalid as HTMLIonInputElement).setFocus().then();
    }
    else {
      console.log("perfil en update");
      let arrayMiembros: string[] = [];
      arrayMiembros.push(this.getUserId());
      let arrayElementos: string[] = [];
      this.elementosAgregados.forEach((elemento)=>{
        arrayElementos.push(elemento.elementoId);
      })
      const grupo: Grupo = {
        grupoId: null,
        nombre: this.crearGrupoForm.get('nombre').value,
        descripcion: this.crearGrupoForm.get('descripcion').value,
        elementosPreferidos: arrayElementos,
        miembros: arrayMiembros,
        elementosSinAprobar: null,
        lider: this.getUserId()
      };
      this.grupoService.crearGrupo(grupo);
    }
  }

  async agregarElemento(elemento: Elemento) {
    console.log("agregado a lista");
    this.elementosAgregados.push(elemento);
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  getUserId():string {
    return sessionStorage.getItem('userId');
  }
}
