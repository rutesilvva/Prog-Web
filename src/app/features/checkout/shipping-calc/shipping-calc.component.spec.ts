import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingCalcComponent } from './shipping-calc.component';

describe('ShippingCalcComponent', () => {
  let component: ShippingCalcComponent;
  let fixture: ComponentFixture<ShippingCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingCalcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
