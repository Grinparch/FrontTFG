import { Component, OnInit } from '@angular/core';
import {Perfil} from "../../../core/models/Perfil";
import {Lista} from "../../../core/models/Lista";
import {ElementoService} from "../../../core/services/elemento.service";
import {PerfilService} from "../../../core/services/perfil.service";
import {ListaService} from "../../../core/services/lista.service";
import {ModalController} from "@ionic/angular";
import {Router} from "@angular/router";
import {Elemento} from "../../../core/models/Elemento";
import {ListaCrearPage} from "../../lists/lista-crear/lista-crear.page";
import {Grupo} from "../../../core/models/Grupo";
import {GrupoService} from "../../../core/services/grupo.service";
import {GrupoCrearPage} from "../grupo-crear/grupo-crear.page";

@Component({
  selector: 'app-grupo-listado',
  templateUrl: './grupo-listado.page.html',
  styleUrls: ['./grupo-listado.page.scss'],
})
export class GrupoListadoPage implements OnInit {
  perfil: Perfil;
  grupos: Grupo[];
  recomendado: Grupo;

  private listaModal: HTMLIonModalElement;

  constructor(public  elementoService: ElementoService,
              public  perfilService: PerfilService,
              public  grupoService: GrupoService,
              private modalController: ModalController,
              private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){

    if(this.getUsername() != undefined){
      this.grupoService.getGrupoRecomendado(this.getPerfilId()).subscribe(grupo=>{
        this.recomendado = grupo;
        this.loadGrupos(grupo);
      })
    }else{
      this.router.navigate(['/user-login']);
    }

  }

  private loadGrupos(grupoR:Grupo){
    this.grupoService.getAllGrupos().subscribe(grupos => {
      let indice = 0;
      grupos.forEach(grupo=>{
        if(grupo.grupoId==grupoR.grupoId){
          grupos.splice(indice,1)
        }
        indice++;
      })
      this.grupos = grupos;
      console.log("grupos todos");
      console.log(this.grupos);
    });
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  getPerfil() {
    return sessionStorage.getItem('perfilId');
  }

  irADetallesDeGrupo(grupo: Grupo){
    this.router.navigate(['/grupo-detalles'], { queryParams: { grupoId: grupo.grupoId } });
  }

  async crearNuevoGrupo(elementos: Elemento[]){
    this.listaModal = await this.modalController.create({
      componentProps: {
        elementos: elementos
      },
      component: GrupoCrearPage,
      swipeToClose: true
    });
  }

  crearNuevoGrupoModal() {
    this.elementoService.getAllElementos().subscribe(elementos => {
      this.crearNuevoGrupo(elementos).then(() => this.listaModal.present());
    });

  }

  getPerfilId() {
    return sessionStorage.getItem('perfilId');
  }
}
