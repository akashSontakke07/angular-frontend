import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartQueryComponent } from './smart-query.component';

describe('SmartQueryComponent', () => {
  let component: SmartQueryComponent;
  let fixture: ComponentFixture<SmartQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartQueryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
