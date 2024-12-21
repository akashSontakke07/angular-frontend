import { Component, ElementRef, inject, Input, OnInit } from '@angular/core';
import { ComponentConfigs, destroyComponentCore, executeAfterViewInitConfigsCore, getPropertiesCore, initializeComponentCore } from 'src/ts-files/component-config-processing';
import { TableDataFlowContrpller } from '../table/table.component';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { TableRowCellComponent } from "./table-row-cell/table-row-cell.component";
import { ComponentNames } from 'src/constants/constant-enums';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: '[table-row]',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, NgStyle, NgbCollapseModule, TableRowCellComponent],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.scss'
})
export class TableRowComponent implements OnInit {
  elementRef: ElementRef = inject(ElementRef);

  @Input() configs: ComponentConfigs | undefined;
  @Input() dataObject: any;
  @Input() dataFlowContrpller!: TableDataFlowContrpller;
  properties: TableRowComponentInterface | undefined;

  ngOnInit(): void {
    this.getComponentConfigs();
  }

  ngAfterViewInit(): void {
    executeAfterViewInitConfigsCore(this.configs!, ComponentNames.TableRowComponent, this, this.elementRef.nativeElement);
  }

  getComponentConfigs() {
    this.setProperties();
    this.configs = initializeComponentCore(this.configs!, ComponentNames.TableRowComponent, this, this.elementRef.nativeElement, null);
  }

  setProperties() {
    this.properties = getPropertiesCore(this.configs!, this);
  }


  ngOnDestroy(): void {
    destroyComponentCore(this.configs!, ComponentNames.TableRowComponent, this, this.elementRef.nativeElement);
  }
}

interface TableRowComponentInterface {
  // if collaps row allod
  isCollapsible?: boolean;
  CollapsConfigs: ComponentConfigs;
}
