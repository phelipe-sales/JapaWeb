import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaCarteComponent } from './lacarte.component';

describe('LacarteComponent', () => {
  let component: LaCarteComponent;
  let fixture: ComponentFixture<LaCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaCarteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
