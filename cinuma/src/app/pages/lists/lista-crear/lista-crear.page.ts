import {Component, Input, OnInit} from '@angular/core';
import {Elemento} from "../../../core/models/Elemento";
import {Usuario} from "../../../core/models/Usuario";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {ElementoService} from "../../../core/services/elemento.service";
import {ElementoEnlistadoService} from "../../../core/services/elemento-enlistado.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {ElementoEnlistado} from "../../../core/models/ElementoEnlistado";
import {Lista} from "../../../core/models/Lista";
import {ListaService} from "../../../core/services/lista.service";

@Component({
  selector: 'app-lista-crear',
  templateUrl: './lista-crear.page.html',
  styleUrls: ['./lista-crear.page.scss'],
})
export class ListaCrearPage implements OnInit {
//Input
  @Input() elementos: Elemento[];

  elementosAgregados: Elemento[] = [];


  constructor(
    private userService: UserService,
    private elementoService: ElementoService,
    private listaService: ListaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
  }

  ionViewDidEnter(){
  }

  ionViewDidLeave(){
  }

  async agregarElemento(elemento: Elemento) {
    console.log("agregado a lista");
    this.elementosAgregados.push(elemento);
  }



  private async asignacionValorElemento() {
    let nuevaLista: Lista;

    nuevaLista  = {
        listaId: null,
        perfilId: this.getPerfil(),
        elementos: this.elementosAgregados,
        votos: 0,
        creador: this.getUsuario()
      };
      this.listaService.addLista(nuevaLista);
  }

  getUsuario() {
    return sessionStorage.usuario;
  }

  getPerfil() {
    return sessionStorage.getItem('perfilId');
  }
}
