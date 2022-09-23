import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserAdminCrearAvanzadoPage } from './user-admin-crear-avanzado.page';

describe('UserAdminCrearModeradorPage', () => {
  let component: UserAdminCrearAvanzadoPage;
  let fixture: ComponentFixture<UserAdminCrearAvanzadoPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdminCrearAvanzadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserAdminCrearAvanzadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
