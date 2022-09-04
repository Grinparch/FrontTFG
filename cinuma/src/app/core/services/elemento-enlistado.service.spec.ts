import { TestBed } from '@angular/core/testing';

import { ElementoEnlistadoService } from './elemento-enlistado.service';

describe('ElementoEnlistadoService', () => {
  let service: ElementoEnlistadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementoEnlistadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
