import { TestBed } from '@angular/core/testing';

import { ListaPersonalService } from './lista-personal.service';

describe('ListaPersonalService', () => {
  let service: ListaPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
