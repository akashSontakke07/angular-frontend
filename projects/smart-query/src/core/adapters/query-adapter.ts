export interface QueryAdapter {
    createTable(databaseName: string, tableName: string, tableData: any[]): Promise<void>;
    executeQuery(databaseName: string, queryString: string): any[];
    close(databaseName: string): void;
}
