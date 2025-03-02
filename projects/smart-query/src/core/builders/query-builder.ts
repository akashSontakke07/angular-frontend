export interface QueryBuilder {
    select(table: string): QueryBuilder;
    where(column: string, operator: string, value: string | number | string[], logicalOperator: "AND" | "OR"): QueryBuilder;
    or(): QueryBuilder; 
    and(): QueryBuilder;
    build(): string;
}

