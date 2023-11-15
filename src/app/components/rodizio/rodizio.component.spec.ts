import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RodizioComponent } from './rodizio.component';

describe('RodizioComponent', () => {
  let component: RodizioComponent;
  let fixture: ComponentFixture<RodizioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RodizioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RodizioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
