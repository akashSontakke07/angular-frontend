import { QueryAdapter } from "../adapters/query-adapter";
import { QueryBuilder } from "../builders/query-builder";


export interface QueryFactory {
    createAdapter(): QueryAdapter;
    createQueryBuilder(): QueryBuilder;
}
