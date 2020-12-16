import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessagesbyidComponent } from './admin-messagesbyid.component';

describe('AdminMessagesbyidComponent', () => {
  let component: AdminMessagesbyidComponent;
  let fixture: ComponentFixture<AdminMessagesbyidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMessagesbyidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMessagesbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
