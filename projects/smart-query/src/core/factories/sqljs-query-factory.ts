import { QueryAdapter } from "../adapters/query-adapter";
import { SqlJsQueryAdapter } from "../adapters/sqljs-query-adapter";
import { QueryBuilder } from "../builders/query-builder";
import { SqlJsQueryBuilder } from "../builders/sqljs-query-builder";
import { QueryFactory } from "./query-factory";

export class SqlJsQueryFactory implements QueryFactory {
    createAdapter(): QueryAdapter {
        return new SqlJsQueryAdapter();
    }


    createQueryBuilder(): QueryBuilder {
        return new SqlJsQueryBuilder();
    }
}
