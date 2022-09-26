import {Component, Input, OnInit} from '@angular/core';
import {Elemento} from "../../../core/models/Elemento";
import {Usuario} from "../../../core/models/Usuario";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../../core/services/usuario.service";
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
  rol: number;


  constructor(
    private userService: UsuarioService,
    private elementoService: ElementoService,
    private listaService: ListaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter(){
    if(this.getUsername() != undefined){
      this.rol = Number(this.getRol());
      if(this.rol == 1 || this.rol == 0){

      }else{
        this.router.navigate(['/user-login']);
      }
    }else{
      this.router.navigate(['/user-login']);
    }
  }

  ionViewDidEnter(){
  }

  ionViewDidLeave(){
  }

  async agregarElemento(elemento: Elemento) {
    this.elementosAgregados.push(elemento);
  }

  removerElementoDeLista(elementoId:string){
    let index = 0;
    if(this.elementosAgregados.length>0){
      this.elementosAgregados.forEach(elementoAgregado =>{
        if(elementoAgregado.elementoId==elementoId){
          this.elementosAgregados.splice(index,1);
        }
        index++;
      })
    }
  }



  private async asignacionValorElemento() {
    let nuevaLista: Lista;

    nuevaLista  = {
        listaId: null,
        perfilId: this.getPerfil(),
        elementos: this.elementosAgregados,
        votos: 0,
        creador: this.getUsername()
      };
      this.listaService.addLista(nuevaLista);
  }

  getUsername() {
    return sessionStorage.username;
  }

  getPerfil() {
    return sessionStorage.getItem('perfilId');
  }

  getRol() {
    return sessionStorage.getItem('rol');
  }
}
