import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersbyidComponent } from './admin-ordersbyid.component';

describe('AdminOrdersbyidComponent', () => {
  let component: AdminOrdersbyidComponent;
  let fixture: ComponentFixture<AdminOrdersbyidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersbyidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
