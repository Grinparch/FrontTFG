import {Component, ElementRef, OnInit} from '@angular/core';
import {Elemento} from "../../../core/models/Elemento";
import {Usuario} from "../../../core/models/Usuario";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalController, NavController, PopoverController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../core/services/user.service";
import {ElementoService} from "../../../core/services/elemento.service";
import {ElementoDetallesPage} from "../../elementos/elemento-detalles/elemento-detalles.page";
import {ArticuloService} from "../../../core/services/articulo.service";
import {Articulo, Comentario} from "../../../core/models/Articulo";

@Component({
  selector: 'app-articulo-detalles',
  templateUrl: './articulo-detalles.page.html',
  styleUrls: ['./articulo-detalles.page.scss'],
})
export class ArticuloDetallesPage implements OnInit {
  articuloId: string;
  comentarios: Comentario[] = [];
  articulo: Articulo;
  contenidoComentarioNuevo: string;
  rol: number;

  constructor(
    private popoverController: PopoverController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    public userService: UserService,
    public articuloService: ArticuloService,
    private elementRef: ElementRef,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {

    if(this.getUsername() != undefined){
      this.route.queryParams
        .subscribe(params => {
            console.log("params");
            console.log(params);
            if (params.articuloId != undefined) {
              this.articuloId = params.articuloId;
              this.articuloService.getArticuloEspecifico(params.articuloId ).subscribe((articulo) => {
                this.articulo = articulo;
                this.articuloService.getAllComentariosDeArticulo(articulo.articuloId).subscribe( (comentarios) =>{
                  this.comentarios = comentarios;
                })
              });
            }
          }
        );
      this.rol=Number(this.getRol());
    }else{
      this.router.navigate(['/user-login']);
    }

  }


  agregarComentario() {
    if(this.contenidoComentarioNuevo != ''){
      const comentario: Comentario = {
        comentarioId: null,
        articuloId: this.articulo.articuloId,
        autor: this.getUsername(),
        autorId: this.getUserId(),
        contenido: this.contenidoComentarioNuevo,
        fechaCreacion: new Date()
      };
      this.articuloService.agregarComentario(comentario);
    }else{
      console.log("toast de que esta vacio")
    }

  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  getUserId():string {
    return sessionStorage.getItem('userId');
  }

  getRol() {
    return sessionStorage.getItem('rol');
  }

  eliminarArticulo(){
    this.articuloService.eliminarArticulo(this.articuloId);
  }
}
