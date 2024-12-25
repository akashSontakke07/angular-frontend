import { Component, ElementRef, inject, Input, OnInit } from '@angular/core';
import { ColumnsConfig, TableDataFlowContrpller } from '../table/table.component';
import { ComponentConfigs, destroyComponentCore, executeAfterViewInitConfigsCore, getPropertiesCore, initializeComponentCore } from 'src/ts-files/component-config-processing';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { ComponentNames } from 'src/constants/constant-enums';
import { TableHeaderCellComponent } from "./table-header-cell/table-header-cell.component";

@Component({
  selector: '[table-header]',
  standalone: true,
  imports: [NgIf, NgFor,NgStyle,NgClass, TableHeaderCellComponent],
  templateUrl: './table-header.component.html',
  styleUrl: './table-header.component.scss'
})
export class TableHeaderComponent implements OnInit {
  elementRef: ElementRef = inject(ElementRef);

  @Input() configs: ComponentConfigs | undefined;
  @Input() dataFlowContrpller!: TableDataFlowContrpller;
  properties!: ColumnsConfig;

  ngOnInit(): void {
    this.getComponentConfigs();
  }

  ngAfterViewInit(): void {
    executeAfterViewInitConfigsCore(this.configs!, ComponentNames.TableHeaderComponent, this, this.elementRef.nativeElement);
  }

  getComponentConfigs() {
    this.setProperties();
    this.configs = initializeComponentCore(this.configs!, ComponentNames.TableHeaderComponent, this, this.elementRef.nativeElement, null);
  }

  setProperties() {
    this.properties = getPropertiesCore(this.configs!, this);
  }

  ngOnDestroy(): void {
    destroyComponentCore(this.configs!, ComponentNames.TableHeaderComponent, this, this.elementRef.nativeElement);
  }
}
