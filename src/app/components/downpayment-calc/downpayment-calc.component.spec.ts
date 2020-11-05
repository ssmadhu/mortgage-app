import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownpaymentCalcComponent } from './downpayment-calc.component';

describe('DownpaymentCalcComponent', () => {
  let component: DownpaymentCalcComponent;
  let fixture: ComponentFixture<DownpaymentCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownpaymentCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownpaymentCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
