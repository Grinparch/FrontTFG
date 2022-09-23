import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserAdminListadoUsuariosPage } from './user-admin-listado-usuarios.page';

describe('UserAdminListadoUsuariosPage', () => {
  let component: UserAdminListadoUsuariosPage;
  let fixture: ComponentFixture<UserAdminListadoUsuariosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminListadoUsuariosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserAdminListadoUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
