import { QueryBuilder } from './query-builder';


export class SqlJsQueryBuilder implements QueryBuilder {
    private query: string = "";


    select(table: string): QueryBuilder {
        this.query = `SELECT * FROM ${table}`;
        return this;
    }


    where(column: string, value: string): QueryBuilder {
        this.query += ` WHERE ${column} = '${value}'`;
        return this;
    }


    build(): string {
        return this.query;
    }
}
