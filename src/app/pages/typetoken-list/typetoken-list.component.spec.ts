import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypetokenListComponent } from './typetoken-list.component';

describe('TypetokenListComponent', () => {
  let component: TypetokenListComponent;
  let fixture: ComponentFixture<TypetokenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypetokenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypetokenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
