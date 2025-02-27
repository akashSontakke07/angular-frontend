export interface QueryBuilder {
    select(table: string): QueryBuilder;
    where(column: string, value: string): QueryBuilder;
    build(): string;
}

