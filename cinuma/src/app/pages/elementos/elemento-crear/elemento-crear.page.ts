import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../../core/models/Usuario";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Autenticacion} from "../../../core/models/Autenticacion";
import {Elemento} from "../../../core/models/Elemento";
import {ElementoService} from "../../../core/services/elemento.service";

@Component({
  selector: 'app-elemento-crear',
  templateUrl: './elemento-crear.page.html',
  styleUrls: ['./elemento-crear.page.scss'],
})
export class ElementoCrearPage implements OnInit {
  user: Usuario;
  elemento: Elemento
  crearElementoForm: FormGroup;
  generosAgregados: string[] = [];
  actoresAgregados: string[] = [];


  constructor(
    private userService: UserService,
    private elementoService: ElementoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.buildForm();
  }

  ionViewDidEnter(){
  }

  ionViewDidLeave(){
  }

  agregarGeneroALista(){
    const genero = this.crearElementoForm.value.genero;
    this.generosAgregados.push(genero);
    this.crearElementoForm.controls.genero.setValue('');
    console.log(this.generosAgregados);
  }

  agregarActorALista(){
    const actor = this.crearElementoForm.value.actores;
    this.actoresAgregados.push(actor);
    this.crearElementoForm.controls.actores.setValue('');
  }

  async crearElemento() {
    if (!this.crearElementoForm.valid){
      console.log('Form has errors. Please provide all the required values!');
    }
    else {
      this.asignacionValorElemento();
    }
  }

  private buildForm() {
    this.crearElementoForm = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(2)]),
      duracion: new FormControl('', [Validators.required]),
      genero: new FormControl(''),
      idioma: new FormControl('', [Validators.required, Validators.minLength(2)]),
      director: new FormControl('', [Validators.required, Validators.minLength(2)]),
      actores: new FormControl(''),
      tipo: new FormControl('', [Validators.required, Validators.max(1), Validators.min(0)]),
      capitulos: new FormControl('', [Validators.minLength(2)]),
      estreno: new FormControl('', [Validators.minLength(2)]),
      estrenoTaquilla: new FormControl('', [Validators.minLength(2)])
    });
  }

  private async asignacionValorElemento() {
    let nuevoElemento: Elemento;
    if(this.crearElementoForm.controls.tipo.value == 1){
      nuevoElemento = {
        elementoId: null,
        titulo: this.crearElementoForm.value.titulo,
        calificacionPromedio: 0,
        calificacionPersonal: 0,
        duracion: this.crearElementoForm.value.duracion,
        genero: this.generosAgregados,
        idioma: this.crearElementoForm.value.idioma,
        director: this.crearElementoForm.value.director,
        actores: this.actoresAgregados,
        tipo: this.crearElementoForm.value.tipo,
        estrenoTaquilla: this.crearElementoForm.value.estrenoTaquilla
      };
      this.elementoService.addPelicula(nuevoElemento).subscribe(() => {
        this.router.navigate(['/elemento-listado']);
      });
    } else{
        nuevoElemento  = {
          elementoId: null,
          titulo: this.crearElementoForm.value.titulo,
          calificacionPromedio: 0,
          calificacionPersonal: 0,
          duracion: this.crearElementoForm.value.duracion,
          genero: this.generosAgregados,
          idioma: this.crearElementoForm.value.idioma,
          director: this.crearElementoForm.value.director,
          actores: this.actoresAgregados,
          tipo: this.crearElementoForm.value.tipo,
          capitulos: this.crearElementoForm.value.capitulos,
          estreno: this.crearElementoForm.value.estreno,
        };
      this.elementoService.addSerie(nuevoElemento).subscribe(() => {
        this.router.navigate(['/elemento-listado']);
      });
    }


  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  getRol() {
    return sessionStorage.getItem('rol');
  }

}
