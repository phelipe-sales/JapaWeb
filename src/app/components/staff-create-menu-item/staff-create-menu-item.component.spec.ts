import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCreateMenuItemComponent } from './staff-create-menu-item.component';

describe('StaffCreateMenuItemComponent', () => {
  let component: StaffCreateMenuItemComponent;
  let fixture: ComponentFixture<StaffCreateMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffCreateMenuItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffCreateMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
