import {Component, Input, OnInit} from '@angular/core';
import {Elemento} from "../../../core/models/Elemento";
import {UsuarioService} from "../../../core/services/usuario.service";
import {ElementoService} from "../../../core/services/elemento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalController} from "@ionic/angular";
import {AutenticacionService} from "../../../core/services/autenticacion.service";
import {Generos} from "../../../core/models/Generos";

@Component({
  selector: 'app-elemento-detalles',
  templateUrl: './elemento-detalles.page.html',
  styleUrls: ['./elemento-detalles.page.scss'],
})
export class ElementoDetallesPage implements OnInit {
//Input
  @Input() elemento: Elemento;

  generos: Array<string> = Object.keys(Generos).filter(key => isNaN(+key));
  editarElementoForm: FormGroup;
  generosAgregados: string[] = [];
  actoresAgregados: string[] = [];
  edicion: boolean = false;
  username: string;


  constructor(
    private userService: UsuarioService,
    private elementoService: ElementoService,
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController,
    private autenticacionService: AutenticacionService,
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log("elemento");
    console.log(this.elemento);
    this.buildForm();
    this.actoresAgregados = this.elemento.actores;
    this.generosAgregados = this.elemento.genero;
    this.username = this.getUsername();
  }

  ionViewDidEnter(){
  }

  ionViewDidLeave(){
  }

  async eliminarElemento(){
    this.elementoService.eliminarElemento(this.elemento.elementoId).subscribe(() => {
      this.router.navigate(['/elemento-crear']);
      this.modalController.dismiss();
    });
  }

  activarEdicionElemento(){
    this.edicion= !this.edicion;
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

  agregarActorALista(){
    const actor = this.editarElementoForm.value.actores;
    this.actoresAgregados.push(actor);
    this.editarElementoForm.controls.actores.setValue('');
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
    if(this.elemento.tipo == 0){
      this.editarElementoForm = new FormGroup({
        titulo: new FormControl(this.elemento.titulo, [Validators.required, Validators.minLength(2)]),
        duracion: new FormControl(this.elemento.duracion, [Validators.required]),
        genero: new FormControl(this.elemento.genero),
        idioma: new FormControl(this.elemento.idioma, [Validators.required, Validators.minLength(2)]),
        director: new FormControl(this.elemento.director, [Validators.required, Validators.minLength(2)]),
        actores: new FormControl(this.elemento.actores),
        capitulos: new FormControl(this.elemento.capitulos, [Validators.minLength(2)])
      });
    }else{
      this.editarElementoForm = new FormGroup({
        titulo: new FormControl(this.elemento.titulo, [Validators.required, Validators.minLength(2)]),
        duracion: new FormControl(this.elemento.duracion, [Validators.required]),
        genero: new FormControl(this.elemento.genero),
        idioma: new FormControl(this.elemento.idioma, [Validators.required, Validators.minLength(2)]),
        director: new FormControl(this.elemento.director, [Validators.required, Validators.minLength(2)]),
        actores: new FormControl(this.elemento.actores)
      });
    }

  }

  private async asignacionValorElemento() {
    let nuevoElemento: Elemento;
    if(this.elemento.tipo == 1){
      nuevoElemento = {
        elementoId: this.elemento.elementoId,
        titulo: this.editarElementoForm.value.titulo,
        calificacionPromedio: 0,
        duracion: this.editarElementoForm.value.duracion,
        genero: this.generosAgregados,
        idioma: this.editarElementoForm.value.idioma,
        director: this.editarElementoForm.value.director,
        actores: this.actoresAgregados,
        tipo: this.elemento.tipo,
        estrenoTaquilla: this.elemento.estrenoTaquilla
      };
      console.log("elemento");
      console.log(nuevoElemento);
      this.elementoService.editarPelicula(nuevoElemento).subscribe(pelicula => {
        this.router.navigate(['/elemento-listado']);
        window.location.reload();
        this.modalController.dismiss();
      });
    } else{
      nuevoElemento  = {
        elementoId: this.elemento.elementoId,
        titulo: this.editarElementoForm.value.titulo,
        calificacionPromedio: 0,
        duracion: this.editarElementoForm.value.duracion,
        genero: this.generosAgregados,
        idioma: this.editarElementoForm.value.idioma,
        director: this.editarElementoForm.value.director,
        actores: this.actoresAgregados,
        tipo: this.elemento.tipo,
        capitulos: this.editarElementoForm.value.capitulos,
        estreno: this.elemento.estreno,
      };
      console.log("elemento");
      console.log(nuevoElemento);
      this.elementoService.editarSerie(nuevoElemento).subscribe(serie => {
        this.router.navigate(['/elemento-listado']);
        window.location.reload();
        this.modalController.dismiss();
      });
    }


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

  getRol() {
    return Number(sessionStorage.getItem('rol'));
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }
/*
  stringAsDate(date:string){
    return new Date(date);
  }
*/

}
