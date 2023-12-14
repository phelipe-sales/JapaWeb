import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffListMenuitemsComponent } from './staff-list-menuitems.component';

describe('StaffListMenuitemsComponent', () => {
  let component: StaffListMenuitemsComponent;
  let fixture: ComponentFixture<StaffListMenuitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffListMenuitemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StaffListMenuitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
