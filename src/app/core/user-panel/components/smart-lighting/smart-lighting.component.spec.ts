import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartLightingComponent } from './smart-lighting.component';

describe('SmartLightingComponent', () => {
  let component: SmartLightingComponent;
  let fixture: ComponentFixture<SmartLightingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartLightingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartLightingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
