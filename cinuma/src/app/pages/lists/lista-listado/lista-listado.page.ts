import { Component, OnInit } from '@angular/core';
import {Perfil} from "../../../core/models/Perfil";
import {ElementoService} from "../../../core/services/elemento.service";
import {PerfilService} from "../../../core/services/perfil.service";
import {ListaService} from "../../../core/services/lista.service";
import {Lista} from "../../../core/models/Lista";
import {Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {Elemento} from "../../../core/models/Elemento";
import {ListaCrearPage} from "../lista-crear/lista-crear.page";
import {AutenticacionService} from "../../../core/services/autenticacion.service";

@Component({
  selector: 'app-lista-listado',
  templateUrl: './lista-listado.page.html',
  styleUrls: ['./lista-listado.page.scss'],
})
export class ListaListadoPage implements OnInit {
  perfil: Perfil;
  listas: Lista[];
  username: string;

  private listaModal: HTMLIonModalElement;

  constructor(public  elementoService: ElementoService,
              public  perfilService: PerfilService,
              public  listaService: ListaService,
              private modalController: ModalController,
              private autenticacionService: AutenticacionService,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadListas();
    if(this.getUsername()!=undefined && this.getUsername()!=null)
      this.username = this.getUsername();
  }

  private loadListas(){
    this.listaService.getAllListas().subscribe(listas => {
      this.listas = listas;
    });
  }

  irADetallesDeLista(lista: Lista){
    this.router.navigate(['/lista-detalles'], { queryParams: { listaId: lista.listaId } });
  }

  async crearNuevaLista(elementos: Elemento[]){
    this.listaModal = await this.modalController.create({
      componentProps: {
        elementos: elementos
      },
      component: ListaCrearPage,
      swipeToClose: true
    });
  }

  crearNuevaListaModal() {
    this.elementoService.getAllElementos().subscribe(elementos => {
      this.crearNuevaLista(elementos).then(() => this.listaModal.present());
    });

  }

  getRol() {
    return sessionStorage.getItem('rol');
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

}
