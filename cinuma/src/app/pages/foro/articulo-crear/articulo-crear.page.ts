import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NavController, PopoverController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuarioService} from "../../../core/services/usuario.service";
import {Articulo} from "../../../core/models/Articulo";
import { ArticuloService } from 'src/app/core/services/articulo.service';
import {Generos} from "../../../core/models/Generos";

@Component({
  selector: 'app-articulo-crear',
  templateUrl: './articulo-crear.page.html',
  styleUrls: ['./articulo-crear.page.scss'],
})
export class ArticuloCrearPage implements OnInit {
  generosAgregados: string[] = [];
  generos: Array<string> = Object.keys(Generos).filter(key => isNaN(+key));

  crearArticuloForm: FormGroup;

  constructor(
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public userService: UsuarioService,
    public articuloService: ArticuloService,
    private router: Router,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter(){

  }

  ionViewWillEnter(){

    if(this.getUsername() != undefined){
      this.buildForm();
    }else{
      this.router.navigate(['/user-login']);
    }

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
}
