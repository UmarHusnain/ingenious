import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimateControlComponent } from './climate-control.component';

describe('ClimateControlComponent', () => {
  let component: ClimateControlComponent;
  let fixture: ComponentFixture<ClimateControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClimateControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClimateControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
