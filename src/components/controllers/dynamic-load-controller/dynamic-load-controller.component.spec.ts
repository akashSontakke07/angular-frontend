import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicLoadControllerComponent } from './dynamic-load-controller.component';

describe('DynamicLoadControllerComponent', () => {
  let component: DynamicLoadControllerComponent;
  let fixture: ComponentFixture<DynamicLoadControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicLoadControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicLoadControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
