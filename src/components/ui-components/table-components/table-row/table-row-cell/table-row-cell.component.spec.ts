import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowCellComponent } from './table-row-cell.component';

describe('TableRowCellComponent', () => {
  let component: TableRowCellComponent;
  let fixture: ComponentFixture<TableRowCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableRowCellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRowCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
