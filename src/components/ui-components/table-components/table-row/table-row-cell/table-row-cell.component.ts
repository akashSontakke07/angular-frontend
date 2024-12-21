import { Component, ElementRef, inject, Input, OnInit } from '@angular/core';
import { ComponentConfigs, destroyComponentCore, executeAfterViewInitConfigsCore, getPropertiesCore, initializeComponentCore } from 'src/ts-files/component-config-processing';
import { ColumnsConfig, TableDataFlowContrpller } from '../../table/table.component';
import { ComponentNames } from 'src/constants/constant-enums';

@Component({
  selector: 'table-row-cell',
  standalone: true,
  imports: [],
  templateUrl: './table-row-cell.component.html',
  styleUrl: './table-row-cell.component.scss'
})
export class TableRowCellComponent implements OnInit {
  elementRef: ElementRef = inject(ElementRef);
  
  @Input() configs: ComponentConfigs | undefined;
  @Input() dataObject: any;
  @Input() column!: ColumnsConfig;
  @Input() dataFlowContrpller!: TableDataFlowContrpller;
  properties: any;

  ngOnInit(): void {
    this.getComponentConfigs();
  }

  ngAfterViewInit(): void {
    executeAfterViewInitConfigsCore(this.configs!, ComponentNames.TableRowCellComponent, this, this.elementRef.nativeElement);
  }

  getComponentConfigs() {
    this.setProperties();
    this.configs = initializeComponentCore(this.configs!, ComponentNames.TableRowCellComponent, this, this.elementRef.nativeElement, null);
  }

  setProperties() {
    this.properties = getPropertiesCore(this.configs!, this);
  }


  ngOnDestroy(): void {
    destroyComponentCore(this.configs!, ComponentNames.TableRowCellComponent, this, this.elementRef.nativeElement);
  }

}
