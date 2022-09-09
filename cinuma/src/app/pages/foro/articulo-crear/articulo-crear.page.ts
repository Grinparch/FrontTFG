import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NavController, PopoverController} from "@ionic/angular";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../core/services/user.service";
import {Articulo} from "../../../core/models/Articulo";
import { ArticuloService } from 'src/app/core/services/articulo.service';

@Component({
  selector: 'app-articulo-crear',
  templateUrl: './articulo-crear.page.html',
  styleUrls: ['./articulo-crear.page.scss'],
})
export class ArticuloCrearPage implements OnInit {
  generosAgregados: string[] = [];

  crearArticuloForm: FormGroup;

  constructor(
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public userService: UserService,
    public articuloService: ArticuloService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter(){

  }

  ionViewWillEnter(){
    this.buildForm();
  }

  ionViewDidLeave(){
  }

  private buildForm() {
    this.crearArticuloForm = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.minLength(2)]),
      contenido: new FormControl('', [Validators.required, Validators.minLength(2)]),
      tema: new FormControl('', [Validators.required, Validators.minLength(2)]),
      tituloAsociado: new FormControl('', [Validators.required, Validators.minLength(2)]),
      genero: new FormControl(''),
    });
  }

  crearArticulo() {
    const now = new Date();
    if (!this.crearArticuloForm.valid){
      const firstNgInvalid: HTMLElement = this.elementRef.nativeElement.querySelector('form .ng-invalid');
      this.crearArticuloForm.markAllAsTouched();
      (firstNgInvalid as HTMLIonInputElement).setFocus().then();
    }
    else {
      const articulo: Articulo = {
        articuloId: null,
        titulo: this.crearArticuloForm.get('titulo').value,
        contenido: this.crearArticuloForm.get('contenido').value,
        tema: this.crearArticuloForm.get('tema').value,
        autor: this.getUsername(),
        autorId: this.getUserId(),
        generosAsociados: this.generosAgregados,
        tituloAsociado: this.crearArticuloForm.get('tituloAsociado').value,
        fechaCreacion: now
      };
      this.articuloService.crearArticulo(articulo);
    }
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  getUserId():string {
    return sessionStorage.getItem('userId');
  }

  agregarGeneroALista(){
    const genero = this.crearArticuloForm.value.genero;
    if(genero!=''){
      this.generosAgregados.push(genero);
      this.crearArticuloForm.controls.genero.setValue('');
      console.log(this.generosAgregados);
    }else{
      console.log("no se puede agregar vacio")
    }

  }
}