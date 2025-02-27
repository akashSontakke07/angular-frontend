import { QueryAdapter } from './query-adapter';

export class SqlJsQueryAdapter implements QueryAdapter {
    private databases = new Map<string, any>();
    private SQL: any = null;

    private async loadSqlJs(): Promise<void> {
        if ((window as any).initSqlJs) return;
        this.SQL = await (window as any).initSqlJs({
            locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });
    }

    async initialize(databaseName: string, schema: Record<string, any[]>): Promise<void> {
        await this.loadSqlJs();
        if (this.databases.has(databaseName)) return;

        const db = new this.SQL.Database();
        for (const [tableName, data] of Object.entries(schema)) {
            if (!data.length) continue;
            const columns = Object.keys(data[0]).map(col => `${col} TEXT`).join(", ");
            db.run(`CREATE TABLE ${tableName} (${columns})`);
        }
        this.databases.set(databaseName, db);
    }

    executeQuery(databaseName: string, query: string): any[][] {
        const db = this.databases.get(databaseName);
        if (!db) throw new Error(`Database "${databaseName}" not initialized`);
        return db.exec(query)[0]?.values || [];
    }

    close(databaseName: string): void {
        this.databases.get(databaseName)?.close();
        this.databases.delete(databaseName);
    }
}
