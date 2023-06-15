import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModerateurLayoutComponent } from './marchand-layout.component';

describe('ModerateurLayoutComponent', () => {
  let component: ModerateurLayoutComponent;
  let fixture: ComponentFixture<ModerateurLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModerateurLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModerateurLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
