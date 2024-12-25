import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { TableHeaderComponent } from "../table-header/table-header.component";
import { NgFor, NgIf } from '@angular/common';
import { TableRowComponent } from "../table-row/table-row.component";
import { TableFooterComponent } from "../table-footer/table-footer.component";
import { TablePaginationComponent, TablePaginationComponentInterface } from "../table-pagination/table-pagination.component";
import { ComponentConfigs, destroyComponentCore, executeAfterViewInitConfigsCore, getChildConfigsCore, getPropertiesCore, initializeComponentCore } from 'src/ts-files/component-config-processing';
import { ComponentNames } from 'src/constants/constant-enums';
import _ from "lodash";
import { checkIsNotNull } from 'src/ts-files/common-utils';
// Remove this once testing is over
import { tableExampleData } from './table-example-data';
import demoConfigs from "./tabel-configs.json"



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgIf, TableHeaderComponent, TableRowComponent, TableFooterComponent, TablePaginationComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {

  elementRef: ElementRef = inject(ElementRef);
  changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  @Input() configs: any = demoConfigs;
  @Input() dataObject: any;

  isCollapsed = true;   // Tracks collapse state


  properties!: TableComponentInterface;
  dataFlowContrpller!: TableDataFlowContrpller;
  childConfigs: Record<string, ComponentConfigs> = {};
  // Remove this once testing is ove
  data() {
    setTimeout(() => {
      this.setData(tableExampleData)
    }, 4000);
  }

  constructor() {
    this.dataFlowContrpller = new TableDataFlowContrpller(this.DataFlowContrpllerCallBack);
  }

  ngOnInit(): void {
    this.data();
    this.getComponentConfigs();
  }

  ngAfterViewInit(): void {
    executeAfterViewInitConfigsCore(this.configs!, ComponentNames.TableComponent, this, this.elementRef.nativeElement);
  }

  getComponentConfigs() {
    this.setProperties();
    this.configs = initializeComponentCore(this.configs!, ComponentNames.TableComponent, this, this.elementRef.nativeElement, null);
  }

  setProperties() {
    this.properties = getPropertiesCore(this.configs!, this);
    this.childConfigs = getChildConfigsCore(this.configs!);
    this.dataFlowContrpller.setproperties(this.properties);
  }

  /**
   * @author Akash Sontakke
   * Updates the main data and triggers change detection.
   *
   * Sets the received data into the `TableDataFlowContrpller` and ensures
   * the component reflects the changes by invoking change detection.
   *
   * @param data - An array containing the new data to be set.
   * @returns void
   */
  setData(data: any) {
    this.dataFlowContrpller.setDataReceived(data);
    this.changeDetectorRef.detectChanges();
  }


  /**
  * @author Akash Sontakke
  * Callback to handle data changes from `TableDataFlowContrpller`.
  *
  * Triggered when the controller detects data changes. Used to update 
  * component data or trigger change detection.
  *
  * @returns void
  */
  DataFlowContrpllerCallBack = () => {
    console.log('Callback executed', this);
    this.changeDetectorRef.detectChanges();
  };




  setPaginationData(data: any) {
    this.dataFlowContrpller.setPaginationData(data);
    this.dataFlowContrpller.setPagination();
  }



  ngOnDestroy(): void {
    destroyComponentCore(this.configs!, ComponentNames.TableComponent, this, this.elementRef.nativeElement);
  }

}


interface TableComponentInterface {
  columnsConfigs: ColumnsConfig[];
  showpagination: boolean;
  showFooter: boolean;

  rowConfigs?: ComponentConfigs;
  headerConfigs?: ComponentConfigs;
  footerConfigs?: ComponentConfigs;
  paginationConfigs?: ComponentConfigs;
}

export interface ColumnsConfig {
  columnName?: string,
  placeholder?: string,
  childHeaderConfigs?: ColumnsConfig[],
  headerCellConfigs?: ComponentConfigs,
  rowCellConfigs?: ComponentConfigs,



  iconClass?: string,
  showSearchFilter?: boolean,
  showSearchFilterSort?: boolean,
  showToolTip?: boolean,
  wrapText?: boolean,
  isSmartActions?: boolean,
  showActionButton?: boolean,
  columnStyles?: any,
  isDynamicColumn?: boolean,
  isDynamicRow: boolean,
  maxSelectionAllowed: number,
  rowWrapText: boolean;
  isStickyColumn?: boolean,
  wrapTextRow?: boolean,
  isStatus?: boolean;
  isCheckBoxAllowed?: boolean,
}

/**
 * @author Akash Sontakke
 * Manages communication and data flow between components in the table.
 *
 * This class is responsible for handling and propagating data changes, 
 * pagination settings, and other configurations across the table's components. 
 * It ensures that updates are communicated effectively while maintaining 
 * a clear flow of data.
 *
 * Usage:
 * - Callbacks are executed to notify parent components of data changes.
 * - Use provided methods to update or retrieve data (`setDataReceived`, `setPaginationData`, etc.).
 *
 * @remarks
 * - Always pass a callback during initialization for change detection or updates.
 * - Do not directly manipulate properties; always use the provided functions.
 */
export class TableDataFlowContrpller {
  // VIMP :- Do not directly manipulate properties directly; always use the provided functions.
  dataReceived: any[] = [];
  paginationData: TablePaginationComponentInterface = { pageSize: 10, page: 1, showRowSelector: false, boundaryLinks: false, };
  dataToPresent: any;
  properties !: TableComponentInterface;
  private callback: () => void;

  constructor(callback: () => void) {
    this.callback = callback;
  }

  executeCallback() {
    try {
      this.callback();
    } catch { }
  }

  setproperties(data: TableComponentInterface) {
    this.properties = data;
  }

  setDataReceived(data: any[]) {
    this.dataReceived = data;
  }


  setPaginationData(data: any) {
    this.paginationData = data;
  }

  setPagination() {
    setPagination(this);
  }

  onSort(sortableHeaders: any) {
    onSort(sortableHeaders, this);
  }
}


/*
 * this function simple set pagination for table data 
 */
function setPagination(thisObject: TableDataFlowContrpller) {
  try {
    thisObject.dataToPresent = thisObject.dataReceived.slice(
      (thisObject.paginationData.page - 1) * thisObject.paginationData.pageSize,
      (thisObject.paginationData.page - 1) * thisObject.paginationData.pageSize + thisObject.paginationData.pageSize
    );
    thisObject.paginationData.collectionSize = thisObject.dataReceived.length;
  } catch {
    thisObject.dataToPresent = thisObject.dataReceived
  }
}




function onSort(sortableHeaders: any, thisObject: TableDataFlowContrpller) {
  //   if ( sortableHeaders.length === 1 && sortableHeaders[0].direction === '' || sortableHeaders.column === '') {
  //     thisObject.dataToPresent = thisObject.dataReceived.slice(
  //       (thisObject.paginationData.rowConfig.page - 1) * thisObject.paginationData.rowConfig.pageSize,
  //       (thisObject.paginationData.rowConfig.page - 1) * thisObject.paginationData.rowConfig.pageSize + thisObject.paginationData.rowConfig.pageSize
  //     );
  //   } else {
  //     let directionArr = sortableHeaders.map(function (obj: { direction: any; }) {
  //       return obj.direction;
  //   });
  //   let columnArr = sortableHeaders.map(function (obj: { column: any; }) {
  //     return obj.column;
  // });
  //     thisObject.dataReceived = _.orderBy(thisObject.dataReceived, [(element: { [x: string]: any; }) => {
  //       for (let column of columnArr) {
  //         let config = this.dataObject.tableHeaderData.columnsConfig.find((e: { columnName: any; }) => e.columnName === column);
  //         if(checkIsNotNull(config)){
  //           let fieldType = config.fieldType ? config.fieldType : "text"
  //           if (fieldType === "date" || column === "createdAt" || column === "updatedAt") { 
  //             var date = new Date(element[column].replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
  //             //let date = new Date(element[column])
  //             return date;
  //           }
  //           else {
  //             return element[column]
  //           }
  //         }
  //         }
  //     }]
  //       , directionArr)

  //     thisObject.dataToPresent = thisObject.dataReceived.slice(
  //       (thisObject.paginationData.rowConfig.page - 1) * thisObject.paginationData.rowConfig.pageSize,
  //       (thisObject.paginationData.rowConfig.page - 1) * thisObject.paginationData.rowConfig.pageSize + thisObject.paginationData.rowConfig.pageSize
  //     );
  //   }
}