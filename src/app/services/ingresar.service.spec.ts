import { TestBed } from '@angular/core/testing';

import { IngresarService } from './ingresar.service';

describe('IngresarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngresarService = TestBed.get(IngresarService);
    expect(service).toBeTruthy();
  });
});
