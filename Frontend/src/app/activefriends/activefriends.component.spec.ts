import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivefriendsComponent } from './activefriends.component';

describe('ActivefriendsComponent', () => {
  let component: ActivefriendsComponent;
  let fixture: ComponentFixture<ActivefriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivefriendsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivefriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
