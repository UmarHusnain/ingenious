import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyManagementComponent } from './energy-management.component';

describe('EnergyManagementComponent', () => {
  let component: EnergyManagementComponent;
  let fixture: ComponentFixture<EnergyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
