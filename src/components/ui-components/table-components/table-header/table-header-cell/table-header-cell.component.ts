import { Component, ElementRef, inject, Input } from '@angular/core';
import { ComponentConfigs, destroyComponentCore, executeAfterViewInitConfigsCore, getPropertiesCore, initializeComponentCore } from 'src/ts-files/component-config-processing';
import { ColumnsConfig, TableDataFlowContrpller } from '../../table/table.component';
import { ComponentNames } from 'src/constants/constant-enums';

@Component({
  selector: 'table-header-cell',
  standalone: true,
  imports: [],
  templateUrl: './table-header-cell.component.html',
  styleUrl: './table-header-cell.component.scss'
})
export class TableHeaderCellComponent {
  elementRef: ElementRef = inject(ElementRef);

  @Input() configs: ComponentConfigs | undefined;
  @Input() ColumnConfig!: ColumnsConfig;
  @Input() dataFlowContrpller!: TableDataFlowContrpller;
  
  properties: any;

  ngOnInit(): void {
    this.getComponentConfigs();
  }

  ngAfterViewInit(): void {
    executeAfterViewInitConfigsCore(this.configs!, ComponentNames.TableHeaderCellComponent, this, this.elementRef.nativeElement);
  }

  getComponentConfigs() {
    this.setProperties();
    this.configs = initializeComponentCore(this.configs!, ComponentNames.TableHeaderCellComponent, this, this.elementRef.nativeElement, null);
  }

  setProperties() {
    this.properties = getPropertiesCore(this.configs!, this);
  }


  ngOnDestroy(): void {
    destroyComponentCore(this.configs!, ComponentNames.TableHeaderCellComponent, this, this.elementRef.nativeElement);
  }
}