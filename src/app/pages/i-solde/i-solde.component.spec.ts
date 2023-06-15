import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorteMonnaieComponent } from './i-solde.component';

describe('PorteMonnaieComponent', () => {
  let component: PorteMonnaieComponent;
  let fixture: ComponentFixture<PorteMonnaieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorteMonnaieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorteMonnaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
