import { Component, input, Input, OnInit } from '@angular/core';
import { TableDataFlowContrpller } from '../table/table.component';
import { ComponentConfigs } from 'src/ts-files/component-config-processing';
import { NgbPagination, NgbPaginationPrevious, NgbPaginationNext, NgbPaginationFirst, NgbPaginationLast } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { checkIsNotEmpty, checkIsNotNull } from 'src/ts-files/common-utils';


@Component({
	selector: 'table-pagination',
	standalone: true,
	imports: [NgIf, NgFor, NgbPagination, NgbPaginationPrevious, NgbPaginationNext, NgbPaginationFirst, NgbPaginationLast, FormsModule],
	templateUrl: './table-pagination.component.html',
	styleUrl: './table-pagination.component.scss'
})
export class TablePaginationComponent implements OnInit {

	@Input() configs: ComponentConfigs | undefined;
	@Input() dataFlowContrpller!: TableDataFlowContrpller;
	properties!: TablePaginationComponentInterface;

	test = [{ size: 4 }, { size: 6 }, { size: 10 }];

	ngOnInit(): void {
		this.properties = this.dataFlowContrpller.paginationData;
	}

	// emitData() {
	// 	this.prepareOutputObject();
	// 	this.dataObject = Object.assign(this.dataObject, { tableFooterData: this.tableFooterDataObject })
	// 	this.tableFooterData.emit(this.tableFooterDataObject);
	// }

	setPagination() {
		this.properties.pageSize = checkIsNotNull(this.properties.pageSize) ? this.properties.pageSize : 10;
		this.properties.page = this.properties.page;
		if (checkIsNotEmpty(this.dataFlowContrpller?.dataReceived)) {
			this.properties.collectionSize = this.dataFlowContrpller.dataReceived.length;
		}
		// this.emitData();
	}


}



export interface TablePaginationComponentInterface {
	pageSize: number,
	page: number,
	collectionSize?: number,
	showRowSelector: boolean,
	boundaryLinks: boolean,
	rowSelectorConfigs?: RowSelectorConfigs[]
}

interface RowSelectorConfigs {
	size: number
}