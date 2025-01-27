import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveillanceSecurityComponent } from './surveillance-security.component';

describe('SurveillanceSecurityComponent', () => {
  let component: SurveillanceSecurityComponent;
  let fixture: ComponentFixture<SurveillanceSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveillanceSecurityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveillanceSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
