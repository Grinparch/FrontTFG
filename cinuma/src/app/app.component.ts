import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  rol: number;
  usuario: string;

  public appPages = [
    { title: 'Registrar', url: '/user-register', icon: 'mail' },
    { title: 'Lista Personal', url: '/', icon: 'mail' }
  ];

  constructor() {}

  ngOnInit(): void {
        this.rol = Number(this.getRol());
        this.usuario = this.getUsername();
    }

  ionViewDidEnter(){
    this.rol = Number(this.getRol());
    this.usuario = this.getUsername();
  }

  ionViewCanEnter(){
    this.rol = Number(this.getRol());
    this.usuario = this.getUsername();
  }

  saveData(username:string,rol:number) {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('rol', rol.toString());
  }
  getUsername() {
    return sessionStorage.getItem('username');
  }
  getRol() {
    return sessionStorage.getItem('rol');
  }
  removeData() {
    sessionStorage.removeItem('location');
  }
  deleteData() {
    sessionStorage.clear();
  }
}
