import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalRunComponent } from './local-run.component';

describe('LocalRunComponent', () => {
  let component: LocalRunComponent;
  let fixture: ComponentFixture<LocalRunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalRunComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalRunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
