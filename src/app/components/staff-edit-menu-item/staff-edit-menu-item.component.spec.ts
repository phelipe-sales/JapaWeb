import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffEditMenuItemComponent } from './staff-edit-menu-item.component';

describe('StaffEditMenuItemComponent', () => {
  let component: StaffEditMenuItemComponent;
  let fixture: ComponentFixture<StaffEditMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffEditMenuItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffEditMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
