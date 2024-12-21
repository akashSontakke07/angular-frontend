import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSidebarControllerComponent } from './sub-sidebar-controller.component';

describe('SubSidebarControllerComponent', () => {
  let component: SubSidebarControllerComponent;
  let fixture: ComponentFixture<SubSidebarControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubSidebarControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubSidebarControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
