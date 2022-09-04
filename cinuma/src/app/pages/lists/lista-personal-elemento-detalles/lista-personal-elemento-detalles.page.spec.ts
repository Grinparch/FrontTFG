import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaPersonalElementoDetallesPage } from './lista-personal-elemento-detalles.page';

describe('ListaPersonalElementoDetallesPage', () => {
  let component: ListaPersonalElementoDetallesPage;
  let fixture: ComponentFixture<ListaPersonalElementoDetallesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPersonalElementoDetallesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPersonalElementoDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
