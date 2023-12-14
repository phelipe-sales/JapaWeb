import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffUnauthorizedComponent } from './staff-unauthorized.component';

describe('StaffUnauthorizedComponent', () => {
  let component: StaffUnauthorizedComponent;
  let fixture: ComponentFixture<StaffUnauthorizedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffUnauthorizedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
