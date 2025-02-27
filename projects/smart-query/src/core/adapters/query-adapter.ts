export interface QueryAdapter {
    initialize(databaseName: string, schema: Record<string, any[]>): Promise<void>;
    executeQuery(databaseName: string, query: string): any[][];
    close(databaseName: string): void;
}
