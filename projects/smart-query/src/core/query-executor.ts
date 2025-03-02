import { QueryAdapter } from "./adapters/query-adapter";
import { QueryBuilder } from "./builders/query-builder";
import { QueryFactory } from "./factories/query-factory";
import { SqlJsQueryFactory } from "./factories/sqljs-query-factory";


type TableData = Record<string, string | number>[]; // Support numbers as well
type DatabaseSchema = Record<string, TableData>;
export enum QueryType {
    SQLJS = "SQLJS",
}  

interface ColumnFilter {
    columnName: string;
    constraints?: string;
    mappedInputKey: string;
    operationType : "and" | "or"
  }


export class QueryExecutor {
    private adapter: QueryAdapter;
    private queryBuilder: QueryBuilder;


    constructor(type: QueryType) {
        const factory = QueryExecutor.getFactory(type);
        this.adapter = factory.createAdapter();
        this.queryBuilder = factory.createQueryBuilder();
    }


    async createTable(databaseName: string, tableName: string, tableData: any[]): Promise<void> {
        await this.adapter.createTable(databaseName, tableName, tableData);
    }


    executeQuery(databaseName: string, queryString: string): any[] {
        return this.adapter.executeQuery(databaseName, queryString);
    }


    close(databaseName: string): void {
        this.adapter.close(databaseName);
    }

    buildQueryByFilters(tableName: string, inputData: any, filters: ColumnFilter[]): string {
        this.queryBuilder.select(tableName);
    
        filters.forEach((filter, index) => {
          const logicalOperator = index === 0 ? "AND" : filter.operationType.toUpperCase() as "AND" | "OR";
          this.queryBuilder.where(filter.columnName, filter.constraints || "=", filter.mappedInputKey, logicalOperator);
        });
    
        return this.queryBuilder.build();
      }


    // Factory Method to return the correct Factory based on type
    private static getFactory(type: QueryType): QueryFactory {
        switch (type) {
            case "SQLJS":
                return new SqlJsQueryFactory();
            default:
                throw new Error(`Unknown Query Type: ${type}`);
        }
    }
}
