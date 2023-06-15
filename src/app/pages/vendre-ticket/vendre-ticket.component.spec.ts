import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendreTicketComponent } from './vendre-ticket.component';

describe('VendreTicketComponent', () => {
  let component: VendreTicketComponent;
  let fixture: ComponentFixture<VendreTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendreTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendreTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
