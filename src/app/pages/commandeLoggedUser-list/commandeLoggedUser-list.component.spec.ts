import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeLoggedUserListComponent } from './commandeLoggedUser-list.component';

describe('CommandeLoggedUserListComponent', () => {
  let component: CommandeLoggedUserListComponent;
  let fixture: ComponentFixture<CommandeLoggedUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandeLoggedUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeLoggedUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
