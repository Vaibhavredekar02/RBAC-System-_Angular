import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpportalComponent } from './empportal.component';

describe('EmpportalComponent', () => {
  let component: EmpportalComponent;
  let fixture: ComponentFixture<EmpportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpportalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
