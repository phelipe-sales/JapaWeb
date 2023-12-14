import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRodizioComponent } from './customer-rodizio.component';

describe('CustomerRodizioComponent', () => {
  let component: CustomerRodizioComponent;
  let fixture: ComponentFixture<CustomerRodizioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerRodizioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerRodizioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
