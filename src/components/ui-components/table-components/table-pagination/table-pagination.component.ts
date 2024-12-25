import { Component, Input, OnInit } from '@angular/core';
import { TableDataFlowContrpller } from '../table/table.component';
import { ComponentConfigs } from 'src/ts-files/component-config-processing';
import { NgbPagination, NgbPaginationPrevious, NgbPaginationNext, NgbPaginationFirst, NgbPaginationLast } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


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


	ngOnInit(): void {
		this.properties = this.dataFlowContrpller.paginationData;
		this.onPageChange();
	}

	onPageChange() {
		this.dataFlowContrpller.onPageChange(this.properties);
	}

}



export interface TablePaginationComponentInterface {
	pageSize: number,
	page: number,
	collectionSize: number,
	boundaryLinks: boolean,
	showRowSelector?: boolean,
	rowSelectorConfigs?: RowSelectorConfigs[]
}

interface RowSelectorConfigs {
	size: number
}