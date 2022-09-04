import {Component, Input, OnInit} from '@angular/core';
import {Elemento} from "../../../core/models/Elemento";
import {UserService} from "../../../core/services/user.service";
import {ElementoService} from "../../../core/services/elemento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-elemento-detalles',
  templateUrl: './elemento-detalles.page.html',
  styleUrls: ['./elemento-detalles.page.scss'],
})
export class ElementoDetallesPage implements OnInit {
//Input
  @Input() elemento: Elemento;

  editarElementoForm: FormGroup;
  generosAgregados: string[] = [];
  actoresAgregados: string[] = [];
  edicion: boolean = false;


  constructor(
    private userService: UserService,
    private elementoService: ElementoService,
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    console.log("elemento");
    console.log(this.elemento);
    this.buildForm();
    this.actoresAgregados = this.elemento.actores;
    this.generosAgregados = this.elemento.genero;
  }

  ionViewDidEnter(){
  }

  ionViewDidLeave(){
  }

  async eliminarElemento(){
    this.elementoService.eliminarElemento(this.elemento.elementoId).subscribe(() => {
      this.modalController.dismiss();
      this.router.navigate(['/elemento-listado']);
    });
  }

  activarEdicionElemento(){
    this.edicion= !this.edicion;
  }

  agregarGeneroALista(){
    const genero = this.editarElementoForm.value.genero;
    this.generosAgregados.push(genero);
    this.editarElementoForm.controls.genero.setValue('');
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
      this.elementoService.editarPelicula(nuevoElemento).subscribe(() => {
        this.router.navigate(['/elemento-listado']);
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
      this.elementoService.editarSerie(nuevoElemento).subscribe(() => {
        this.router.navigate(['/elemento-listado']);
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


}
