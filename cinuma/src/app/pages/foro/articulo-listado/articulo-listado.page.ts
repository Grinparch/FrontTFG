import { Component, OnInit } from '@angular/core';
import {Perfil} from "../../../core/models/Perfil";
import {Grupo} from "../../../core/models/Grupo";
import {ElementoService} from "../../../core/services/elemento.service";
import {PerfilService} from "../../../core/services/perfil.service";
import {GrupoService} from "../../../core/services/grupo.service";
import {ModalController} from "@ionic/angular";
import {Router} from "@angular/router";
import {Elemento} from "../../../core/models/Elemento";
import {GrupoCrearPage} from "../../grupos/grupo-crear/grupo-crear.page";
import {Articulo} from "../../../core/models/Articulo";
import {ArticuloService} from "../../../core/services/articulo.service";
import {ArticuloCrearPage} from "../articulo-crear/articulo-crear.page";

@Component({
  selector: 'app-articulo-listado',
  templateUrl: './articulo-listado.page.html',
  styleUrls: ['./articulo-listado.page.scss'],
})
export class ArticuloListadoPage implements OnInit {
  perfil: Perfil;
  articulos: Articulo[];

  private acrarArticuloModal: HTMLIonModalElement;

  constructor(public  elementoService: ElementoService,
              public  perfilService: PerfilService,
              public  articuloService: ArticuloService,
              private modalController: ModalController,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){

    if(this.getUsername() != undefined){
      this.loadArticulos();
    }else{
      this.router.navigate(['/user-login']);
    }

  }

  private loadArticulos(){
    this.articuloService.getAllArticulos().subscribe(articulos => {
      this.articulos = articulos;
    });
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  getUserId():string {
    return sessionStorage.getItem('userId');
  }

  irADetallesDeArticulo(articulo: Articulo){
    this.router.navigate(['/articulo-detalles'], { queryParams: { articuloId: articulo.articuloId } });
  }

  async crearNuevoArticulo(){
    this.acrarArticuloModal = await this.modalController.create({
      component: ArticuloCrearPage,
      swipeToClose: true
    });
  }

  crearNuevoArticuloModal() {
    this.crearNuevoArticulo().then(() => this.acrarArticuloModal.present());

  }

}
