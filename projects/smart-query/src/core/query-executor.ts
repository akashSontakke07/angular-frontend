import { QueryAdapter } from "./adapters/query-adapter";
import { QueryBuilder } from "./builders/query-builder";
import { QueryFactory } from "./factories/query-factory";
import { SqlJsQueryFactory } from "./factories/sqljs-query-factory";


type TableData = Record<string, string | number>[]; // Support numbers as well
type DatabaseSchema = Record<string, TableData>;
type QueryType = "SQLJS" | "TS";




export class QueryExecutor {
    private adapter: QueryAdapter;
    private queryBuilder: QueryBuilder;


    constructor(type: QueryType) {
        const factory = QueryExecutor.getFactory(type);
        this.adapter = factory.createAdapter();
        this.queryBuilder = factory.createQueryBuilder();
    }


    async initialize(databaseName: string, schema: DatabaseSchema): Promise<void> {
        await this.adapter.initialize(databaseName, schema);
    }


    runQuery(databaseName: string, table: string, condition?: { column: string; value: string }): any[][] {
        let query = this.queryBuilder.select(table);
        if (condition) {
            query = query.where(condition.column, condition.value);
        }
        return this.adapter.executeQuery(databaseName, query.build());
    }


    close(databaseName: string): void {
        this.adapter.close(databaseName);
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
