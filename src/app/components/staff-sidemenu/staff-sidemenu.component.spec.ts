import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSidemenuComponent } from './staff-sidemenu.component';

describe('StaffSidemenuComponent', () => {
  let component: StaffSidemenuComponent;
  let fixture: ComponentFixture<StaffSidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffSidemenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
