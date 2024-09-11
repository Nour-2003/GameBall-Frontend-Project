import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepostComponent } from './createpost.component';

describe('CreatepostComponent', () => {
  let component: CreatepostComponent;
  let fixture: ComponentFixture<CreatepostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatepostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
