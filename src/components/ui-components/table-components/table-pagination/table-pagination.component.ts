import { Component, input, Input } from '@angular/core';
import { TableDataFlowContrpller } from '../table/table.component';
import { ComponentConfigs } from 'src/ts-files/component-config-processing';
import { NgbPagination, NgbPaginationPrevious, NgbPaginationNext, NgbPaginationFirst, NgbPaginationLast } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

// const FILTER_PAG_REGEX = /[^0-9]/g;


@Component({
  selector: 'table-pagination',
  standalone: true,
  imports: [NgIf, NgFor, NgbPagination, NgbPaginationPrevious, NgbPaginationNext, NgbPaginationFirst, NgbPaginationLast, FormsModule],
  templateUrl: './table-pagination.component.html',
  styleUrl: './table-pagination.component.scss'
})
export class TablePaginationComponent {
  @Input() configs: ComponentConfigs | undefined;
  @Input() dataFlowContrpller!: TableDataFlowContrpller;

  page = 4;

	getPageSymbol(current: number) {
		return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
	}

	selectPage(page: string) {
		this.page = parseInt(page, 10) || 1;
	}

	formatInput(input: HTMLInputElement) {
		input.value = input.value.replace(/[^0-9]/g, '');
	}
}
