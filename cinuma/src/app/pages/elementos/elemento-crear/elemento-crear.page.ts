import { Component, OnInit } from '@angular/core';
import {Usuario} from "../../../core/models/Usuario";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Autenticacion} from "../../../core/models/Autenticacion";
import {Elemento} from "../../../core/models/Elemento";
import {ElementoService} from "../../../core/services/elemento.service";
import {Generos} from "../../../core/models/Generos";

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
  generos: Array<string> = Object.keys(Generos).filter(key => isNaN(+key));


  constructor(
    private userService: UserService,
    private elementoService: ElementoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){

    if(this.getUsername() != undefined){
      if(Number(this.getRol())<2){
        this.buildForm();
        this.actoresAgregados =[];
        this.generosAgregados = [];
      }else{
        this.router.navigate(['/elemento-listado']);
      }
    }else{
      this.router.navigate(['/user-login']);
    }

  }

  ionViewDidEnter(){
  }

  ionViewDidLeave(){
  }

  agregarGeneroALista(genero:string){
    let yaExiste = false;
    if(this.generosAgregados.length>0){
      this.generosAgregados.forEach(generoIteracion =>{
        if(generoIteracion==genero){
          yaExiste=true;
        }
      })
    }
    if(!yaExiste)
      this.generosAgregados.push(genero);
    console.log(this.generosAgregados);
  }

  removerGeneroDeLista(genero:string){
    let index = 0;
    if(this.generosAgregados.length>0){
      this.generosAgregados.forEach(generoIteracion =>{
        if(generoIteracion==genero){
          this.generosAgregados.splice(index,1);
        }
        index++;
      })
    }
    console.log(this.generosAgregados);
  }

  removerActorDeLista(actor:string){
    let index = 0;
    if(this.actoresAgregados.length>0){
      this.actoresAgregados.forEach(actorIteracion =>{
        if(actorIteracion==actor){
          this.actoresAgregados.splice(index,1);
        }
        index++;
      })
    }
    console.log(this.actoresAgregados);
  }

  agregarActorALista(){
    const actor = this.crearElementoForm.value.actores;
    if (actor != '')
      this.actoresAgregados.push(actor);
    this.crearElementoForm.controls.actores.setValue('');
  }

  async crearElemento() {
    if (!this.crearElementoForm.valid){
      this.crearElementoForm.markAllAsTouched();
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
      actores: new FormControl('', [Validators.minLength(2)]),
      tipo: new FormControl(0, [Validators.required, Validators.max(1), Validators.min(0)]),
      capitulos: new FormControl('', [Validators.minLength(1)]),
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
