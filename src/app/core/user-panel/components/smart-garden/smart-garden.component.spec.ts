import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartGardenComponent } from './smart-garden.component';

describe('SmartGardenComponent', () => {
  let component: SmartGardenComponent;
  let fixture: ComponentFixture<SmartGardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartGardenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
