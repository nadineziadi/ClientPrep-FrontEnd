import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreRechargeListComponent } from './marchand-list.component';

describe('CentreRechargeListComponent', () => {
  let component: CentreRechargeListComponent;
  let fixture: ComponentFixture<CentreRechargeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentreRechargeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentreRechargeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
