import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreindsComponent } from './freinds.component';

describe('FreindsComponent', () => {
  let component: FreindsComponent;
  let fixture: ComponentFixture<FreindsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreindsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreindsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
