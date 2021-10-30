import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GateawaysListComponent } from './gateaways-list.component';

describe('GateawaysListComponent', () => {
  let component: GateawaysListComponent;
  let fixture: ComponentFixture<GateawaysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GateawaysListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GateawaysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
