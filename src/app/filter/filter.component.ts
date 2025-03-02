import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QueryExecutor, QueryType } from '@local/library/SmartQuery';
import { ActionEventNames } from 'src/constants/constant-enums';
import { ActionEventConfigs, executeActionEventsByNameCore, executeActionEventsCore } from 'src/ts-files/component-config-processing';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {

  queryExecutor!: QueryExecutor;
  formController!: FormGroup;
  properties!: FilterComponentInterface ;
  constructor() {

  }
  ngOnInit(): void {
    this.queryExecutor = new QueryExecutor(QueryType.SQLJS);
  }

  setFormControle(formController: any) {
    this.formController = formController;
  }


  async createTable(data: CreateTable) {
    await this.queryExecutor.createTable(data.dataBaseName, data.tableName,data.data)
  }

  applyFilterById(input: { id: string }) {
    let filters: DatabaseFilterConfig[] = this.properties.filters;
    let selectedFilter: DatabaseFilterConfig | undefined = filters?.find((filter: DatabaseFilterConfig) => filter.id === input.id);

    if (selectedFilter) {
      let query = this.queryExecutor.buildQueryByFilters(selectedFilter.tableName, {}, selectedFilter.columnFilters);
      let filteredData = this.queryExecutor.executeQuery(selectedFilter.databaseName, query);
      executeActionEventsCore(selectedFilter.eventsConfig, ActionEventNames.onChange, this, null, filteredData)
    }

    return null;
  }

  private extractFormValues(formValueKeys: string[]): Record<string, any> {
    let values: Record<string, any> = {};
    formValueKeys.forEach((key) => {
      if (this.formController.controls[key]) {
        values[key] = this.formController.controls[key].value;
      }
    });
    return values;
  }
}


interface FilterComponentInterface {
  queryType: QueryType;
  filters: DatabaseFilterConfig[];
}

interface DatabaseFilterConfig {
  id: string;
  databaseName: string;
  tableName: string;
  columnFilters: ColumnFilter[];
  queryString?: string;
  eventsConfig : ActionEventConfigs;
}

interface ColumnFilter {
  columnName: string;
  constraints?: string;
  mappedInputKey: string;
  operationType: "and" | "or";
}












interface CreateTable {
  dataBaseName: string,
  tableName: string,
  data: any[],
  // tableDefinition?: TableDefinition
}


