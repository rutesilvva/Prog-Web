import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersAdminPageComponent } from './orders-admin-page.component';

describe('OrdersAdminPageComponent', () => {
  let component: OrdersAdminPageComponent;
  let fixture: ComponentFixture<OrdersAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersAdminPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
