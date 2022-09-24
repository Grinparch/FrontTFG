import {Component, Input, OnInit} from '@angular/core';
import {Usuario} from "../../../core/models/Usuario";
import {Elemento} from "../../../core/models/Elemento";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {ElementoService} from "../../../core/services/elemento.service";
import {ActivatedRoute, Router} from "@angular/router";
import { ElementoEnlistado } from 'src/app/core/models/ElementoEnlistado';
import {ElementoEnlistadoService} from "../../../core/services/elemento-enlistado.service";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-lista-personal-agregar',
  templateUrl: './lista-personal-agregar.page.html',
  styleUrls: ['./lista-personal-agregar.page.scss'],
})
export class ListaPersonalAgregarPage implements OnInit {
  //Input
  @Input() todosElementos: Elemento[];
  @Input() listaPersonalId: string;

  user: Usuario;
  elemento: Elemento
  agregarElementoForm: FormGroup;


  constructor(
    private userService: UserService,
    private elementoService: ElementoService,
    private elementoEnlistadoService: ElementoEnlistadoService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){

    if(this.getUsername() != undefined){
      console.log("todos los elementos agregar lista");
      console.log(this.todosElementos);
      this.buildForm();
    }else{
      this.router.navigate(['/user-login']);
    }

  }

  ionViewDidEnter(){
  }

  ionViewDidLeave(){
  }

  async agregarElemento() {
    if (!this.agregarElementoForm.valid){
      console.log('Form has errors. Please provide all the required values!');
    }
    else {
      this.asignacionValorElemento();
    }
  }

  private buildForm() {
    this.agregarElementoForm = new FormGroup({
      opinion: new FormControl('', [Validators.minLength(2)]),
      puntuacionPersonal: new FormControl('', [Validators.min(0),Validators.max(10)])
    })
  }

  private async asignacionValorElemento() {
    let nuevoElementoEnlistado: ElementoEnlistado;
    const perfilId = this.getPerfil();
    if(this.elemento.tipo == 1){
      nuevoElementoEnlistado = {
        elementoEnlistadoId: null,
        elementoId: this.elemento.elementoId,
        listaPersonalId: this.listaPersonalId,
        perfilId: perfilId,
        titulo: this.elemento.titulo,
        duracion: this.elemento.duracion,
        genero: this.elemento.genero,
        idioma: this.elemento.idioma,
        director: this.elemento.director,
        actores: this.elemento.actores,
        tipo: this.elemento.tipo,
        estrenoTaquilla: this.elemento.estrenoTaquilla,
        opinion: this.agregarElementoForm.value.opinion,
        puntuacionPersonal: this.agregarElementoForm.value.puntuacionPersonal
      };
      this.elementoEnlistadoService.addPelicula(nuevoElementoEnlistado).subscribe(() => {
        this.router.navigate(['/lista-personal']);
        window.location.reload();
      });
    } else{
      nuevoElementoEnlistado  = {
        elementoEnlistadoId: null,
        elementoId: this.elemento.elementoId,
        listaPersonalId: this.listaPersonalId,
        perfilId: perfilId,
        titulo: this.elemento.titulo,
        duracion: this.elemento.duracion,
        genero: this.elemento.genero,
        idioma: this.elemento.idioma,
        director: this.elemento.director,
        actores: this.elemento.actores,
        tipo: this.elemento.tipo,
        capitulos: this.elemento.capitulos,
        estreno: this.elemento.estreno,
        opinion: this.agregarElementoForm.value.opinion,
        puntuacionPersonal: this.agregarElementoForm.value.puntuacionPersonal
      };
      this.elementoEnlistadoService.addSerie(nuevoElementoEnlistado).subscribe(() => {
        this.router.navigate(['/lista-personal']);
        window.location.reload();
      });
    }


  }

  guardarElemento(elemento: Elemento){
    console.log("elemento guardado")
    this.elemento=elemento;
  }

  getPerfil() {
    return sessionStorage.getItem('perfilId');
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }
}
