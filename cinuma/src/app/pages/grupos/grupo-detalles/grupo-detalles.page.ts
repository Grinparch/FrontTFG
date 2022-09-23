import {Component, ElementRef, OnInit} from '@angular/core';
import {Grupo} from "../../../core/models/Grupo";
import {Elemento} from "../../../core/models/Elemento";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalController, NavController, PopoverController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../core/services/user.service";
import {GrupoService} from "../../../core/services/grupo.service";
import { ElementoService } from 'src/app/core/services/elemento.service';
import {ElementoDetallesPage} from "../../elementos/elemento-detalles/elemento-detalles.page";
import {Usuario} from "../../../core/models/Usuario";

@Component({
  selector: 'app-grupo-detalles',
  templateUrl: './grupo-detalles.page.html',
  styleUrls: ['./grupo-detalles.page.scss'],
})
export class GrupoDetallesPage implements OnInit {
  grupoId: string;
  elementosAAgregar: Elemento[] = [];
  elementosTodos: Elemento[] = [];
  elementosAgregados: Elemento[] = [];
  miembros: Usuario[] = [];
  grupo: Grupo;
  edicion: boolean = false;
  lider = false;
  rol:number;

  private elementoModal: HTMLIonModalElement;

  crearGrupoForm: FormGroup = new FormGroup({
    descripcion: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public userService: UserService,
    public elementoService: ElementoService,
    public grupoService: GrupoService,
    private elementRef: ElementRef,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if(this.getUsername() != undefined){
      this.rol=Number(this.getRol());
      this.route.queryParams
        .subscribe(params => {
            console.log("params");
            console.log(params);
            if (params.grupoId != undefined) {
              this.grupoId = params.grupoId;
              this.grupoService.getGrupoEspecifico(params.grupoId).subscribe((grupo) => {
                this.grupo = grupo;
                this.crearGrupoForm.get('descripcion').setValue(grupo.descripcion);
                if(this.getUserId()==grupo.lider){
                  this.lider=true;
                }
                this.userService.getAllUsuariosGrupo(grupo.miembros).subscribe( (usuarios) =>{
                  this.miembros = usuarios;
                  console.log("miembros");
                  console.log(usuarios);
                })
                this.elementoService.getAllElementosGrupo(grupo.elementosPreferidos).subscribe( (elementosAgregados) =>{
                  this.elementosAgregados = elementosAgregados;

                })
              });
              this.elementoService.getAllElementos().subscribe( (elementosTodos) =>{
                this.elementosTodos = elementosTodos;
              })
            }
          }
        );
    }else{
      this.router.navigate(['/user-login']);
    }

  }


  editarGrupo() {
    if (!this.crearGrupoForm.valid){
      const firstNgInvalid: HTMLElement = this.elementRef.nativeElement.querySelector('form .ng-invalid');
      this.crearGrupoForm.markAllAsTouched();
      (firstNgInvalid as HTMLIonInputElement).setFocus().then();
    }
    else {
      let arrayElementos: string[] = this.grupo.elementosPreferidos;
      console.log("this.grupo.elementosPreferidos");
      console.log(this.grupo.elementosPreferidos);
      console.log("arrayElementos");
      console.log(arrayElementos);
      this.elementosAAgregar.forEach((elemento)=>{
        console.log("elementosAgregados en bucle");
        console.log(elemento.elementoId);
        arrayElementos.push(elemento.elementoId);
      })
      console.log("arrayElementos post add");
      console.log(arrayElementos);
      const grupo: Grupo = {
        grupoId: this.grupo.grupoId,
        lider: this.grupo.lider,
        nombre: this.grupo.nombre,
        descripcion: this.crearGrupoForm.get('descripcion').value,
        elementosPreferidos: arrayElementos,
        miembros: this.grupo.miembros,
        elementosSinAprobar: null
      };
      this.grupoService.editarGrupo(grupo);
    }
  }

  async crearModalElemento(elemento: Elemento) {
    this.elementoModal = await this.modalController.create({
      componentProps: {
        elemento: elemento
      },
      component: ElementoDetallesPage,
      swipeToClose: true
    });
  }

  elementoDetallesModal(elemento: Elemento) {
    //this.elementoService.getElementoEspecifico(elementoId).subscribe((elemento)=>{
      this.crearModalElemento(elemento).then(() => this.elementoModal.present());
    //})
  }

  seEncuentra(elementoABuscar): boolean{
    let resultado = false;
    this.elementosAgregados.forEach(elemento=>{
      if(elemento.elementoId == elementoABuscar.elementoId){
        resultado = true;
      }
    })
    return resultado;
  }

  async agregarElemento(elemento: Elemento) {
    console.log("agregado a lista");
    this.elementosAAgregar.push(elemento);
    console.log("agregado");
    console.log(elemento);
    console.log("a esta lista");
    console.log(this.elementosAAgregar);
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  getUserId():string {
    return sessionStorage.getItem('userId');
  }

  getRol(){
    return sessionStorage.getItem('rol');
  }

  activarEdicionElemento() {
    this.edicion = !this.edicion;
  }

  unirseAGrupo(){
    console.log(this.getUserId());
    const listaDeUnId: string[] = [this.getUserId()];
    this.grupoService.unirseAGrupo(listaDeUnId, this.grupoId);
  }

  esMiembro():boolean{
    let esMiembro = false;
    const miId = this.getUserId();
    this.grupo.miembros.forEach(miembroId=>{
      if(miembroId == miId){
        esMiembro = true;
      }
    })
    return esMiembro;
  }

  eliminarGrupo(){
    this.grupoService.eliminarGrupo(this.grupoId);
  }
}
