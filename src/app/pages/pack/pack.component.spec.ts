import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteRechargeListComponent } from './pack.component';

describe('CarteRechargeListComponent', () => {
  let component: CarteRechargeListComponent;
  let fixture: ComponentFixture<CarteRechargeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarteRechargeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarteRechargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
