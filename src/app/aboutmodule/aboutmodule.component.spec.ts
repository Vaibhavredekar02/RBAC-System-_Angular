import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutmoduleComponent } from './aboutmodule.component';

describe('AboutmoduleComponent', () => {
  let component: AboutmoduleComponent;
  let fixture: ComponentFixture<AboutmoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutmoduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
