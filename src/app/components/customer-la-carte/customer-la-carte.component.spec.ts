import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLaCarteComponent } from './customer-la-carte.component';

describe('CustomerLaCarteComponent', () => {
  let component: CustomerLaCarteComponent;
  let fixture: ComponentFixture<CustomerLaCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerLaCarteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerLaCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
