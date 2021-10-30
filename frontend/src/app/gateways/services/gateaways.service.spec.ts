import { TestBed } from '@angular/core/testing';

import { GatewaysService } from './gateaways.service';

describe('GateawaysService', () => {
  let service: GatewaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GatewaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
