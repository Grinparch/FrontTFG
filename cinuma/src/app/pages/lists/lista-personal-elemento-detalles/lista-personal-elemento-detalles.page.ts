import {Component, Input, OnInit} from '@angular/core';
import {Elemento} from "../../../core/models/Elemento";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {ElementoService} from "../../../core/services/elemento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import { ElementoEnlistado } from 'src/app/core/models/ElementoEnlistado';
import {ElementoEnlistadoService} from "../../../core/services/elemento-enlistado.service";

@Component({
  selector: 'app-lista-personal-elemento-detalles',
  templateUrl: './lista-personal-elemento-detalles.page.html',
  styleUrls: ['./lista-personal-elemento-detalles.page.scss'],
})
export class ListaPersonalElementoDetallesPage implements OnInit {
//Input
  @Input() elementoEnlistado: ElementoEnlistado;

  editarElementoForm: FormGroup;
  generosAgregados: string[] = [];
  actoresAgregados: string[] = [];
  edicion: boolean = false;


  constructor(
    private userService: UserService,
    private elementoService: ElementoService,
    private elementoEnlistadoService: ElementoEnlistadoService,
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){

    if(this.getUsername() != undefined){
      console.log("elemento");
      console.log(this.elementoEnlistado);
      this.buildForm();
      this.actoresAgregados = this.elementoEnlistado.actores;
      this.generosAgregados = this.elementoEnlistado.genero;
    }else{
      this.router.navigate(['/user-login']);
    }

  }

  ionViewDidEnter(){
  }

  ionViewDidLeave(){
  }

  async eliminarElemento(){
    console.log("elementEnlistId");
    console.log(this.elementoEnlistado);
    console.log("delete elementEnlistId");
    console.log(this.elementoEnlistado.elementoEnlistadoId);
    this.elementoEnlistadoService.eliminarElemento(this.elementoEnlistado.elementoEnlistadoId).subscribe(() => {
      //this.modalController.dismiss();
     // this.router.navigate(['/elemento-listado']);
    });
  }

  activarEdicionElemento(){
    this.edicion= !this.edicion;
  }

  async editarElemento() {
    if (!this.editarElementoForm.valid){
      console.log('Form has errors. Please provide all the required values!');
    }
    else {
      this.asignacionValorElemento();
    }
  }

  private buildForm() {
    let opinion;
    let puntuacionPersonal;

    if(this.elementoEnlistado.opinion != undefined || this.elementoEnlistado.opinion != null){
      opinion = this.elementoEnlistado.opinion;
    }else{
      opinion = '';
    }

    if(this.elementoEnlistado.puntuacionPersonal != undefined || this.elementoEnlistado.puntuacionPersonal != null){
      puntuacionPersonal = this.elementoEnlistado.puntuacionPersonal;
    }else{
      puntuacionPersonal = 0;
    }

    this.editarElementoForm = new FormGroup({
      opinion: new FormControl(opinion, [Validators.minLength(2)]),
      puntuacionPersonal: new FormControl(puntuacionPersonal, [Validators.min(0),Validators.max(10)])
    });
  }

  private async asignacionValorElemento() {
    let nuevoElementoEnlistado: ElementoEnlistado;
    const perfilId = this.getPerfil();
    if(this.elementoEnlistado.tipo == 1){
      nuevoElementoEnlistado = {
        elementoEnlistadoId: this.elementoEnlistado.elementoEnlistadoId,
        elementoId: this.elementoEnlistado.elementoId,
        listaPersonalId: this.elementoEnlistado.listaPersonalId,
        perfilId: perfilId,
        titulo: this.elementoEnlistado.titulo,
        duracion: this.elementoEnlistado.duracion,
        genero: this.elementoEnlistado.genero,
        idioma: this.elementoEnlistado.idioma,
        director: this.elementoEnlistado.director,
        actores: this.elementoEnlistado.actores,
        tipo: this.elementoEnlistado.tipo,
        estrenoTaquilla: this.elementoEnlistado.estrenoTaquilla,
        opinion: this.editarElementoForm.value.opinion,
        puntuacionPersonal: this.editarElementoForm.value.puntuacionPersonal
      };
      console.log("elemento");
      console.log(nuevoElementoEnlistado);
      this.elementoEnlistadoService.editarPelicula(nuevoElementoEnlistado).subscribe(() => {

      });
    } else{
      nuevoElementoEnlistado  = {
        elementoEnlistadoId: this.elementoEnlistado.elementoEnlistadoId,
        elementoId: this.elementoEnlistado.elementoId,
        listaPersonalId: this.elementoEnlistado.listaPersonalId,
        perfilId: perfilId,
        titulo: this.elementoEnlistado.titulo,
        duracion: this.elementoEnlistado.duracion,
        genero: this.elementoEnlistado.genero,
        idioma: this.elementoEnlistado.idioma,
        director: this.elementoEnlistado.director,
        actores: this.elementoEnlistado.actores,
        tipo: this.elementoEnlistado.tipo,
        capitulos: this.elementoEnlistado.capitulos,
        estreno: this.elementoEnlistado.estreno,
        opinion: this.editarElementoForm.value.opinion,
        puntuacionPersonal: this.editarElementoForm.value.puntuacionPersonal
      };
      console.log("elemento");
      console.log(nuevoElementoEnlistado);
      this.elementoEnlistadoService.editarSerie(nuevoElementoEnlistado).subscribe(() => {

      });
    }


  }
  /*
    stringAsDate(date:string){
      return new Date(date);
    }
  */
  getUsername() {
    return sessionStorage.getItem('username');
  }

  getRol() {
    return sessionStorage.getItem('rol');
  }

  getPerfil() {
    return sessionStorage.getItem('perfilId');
  }
}
