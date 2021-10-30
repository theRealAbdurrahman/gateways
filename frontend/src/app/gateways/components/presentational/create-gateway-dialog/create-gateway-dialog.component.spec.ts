import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGatewayDialogComponent } from './create-gateway-dialog.component';

describe('CreateGatewayDialogComponent', () => {
  let component: CreateGatewayDialogComponent;
  let fixture: ComponentFixture<CreateGatewayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGatewayDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGatewayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
