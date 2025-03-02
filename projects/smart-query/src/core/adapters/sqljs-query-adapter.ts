import { QueryAdapter } from './query-adapter';


export class SqlJsQueryAdapter implements QueryAdapter {
    private databases: Map<string, any> = new Map();
    private SQL: any = null;


    private async loadSqlJs(): Promise<void> {
        if ((window as any).initSqlJs){
            return;
        }
        await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js";
            script.onload = () => resolve();
            script.onerror = reject;
            document.head.appendChild(script);
        });


        this.SQL = await (window as any).initSqlJs({
            locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        });
    }


    async createTable(databaseName: string, tableName: string, tableData: any[]): Promise<void> {
        await this.loadSqlJs();
        const db = this.getOrCreateDatabase(databaseName);
        this.createTableIfNotExists(db, databaseName, tableName, tableData);
        this.insertData(db, tableName, tableData);
    }
    
    private getOrCreateDatabase(databaseName: string): any {
        if (this.databases.has(databaseName)) {
            return this.databases.get(databaseName);
        }
        
        const db = new this.SQL.Database();
        this.databases.set(databaseName, db);
        return db;
    }
    
    private createTableIfNotExists(db: any, databaseName: string, tableName: string, data: any[]): void {
        if (this.tableExists(db, tableName)) {
            throw new Error(`Table "${tableName}" already exists in database "${databaseName}".`);
        }
    
        const columns = Object.keys(data[0]).map(col => `${col} TEXT`).join(", ");
        db.run(`CREATE TABLE ${tableName} (${columns})`);
    }
    
    private tableExists(db: any, tableName: string): boolean {
        const result = db.exec(`SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`);
        return result.length > 0;
    }
    
    private insertData(db: any, tableName: string, data: any[]): void {
        const placeholders = Object.keys(data[0]).map(() => "?").join(", ");
        const stmt = db.prepare(`INSERT INTO ${tableName} VALUES (${placeholders})`);
        
        data.forEach(row => stmt.run(Object.values(row)));
        
        stmt.free();
    }
    


    executeQuery(databaseName: string, queryString: string): any[] {
        const db = this.databases.get(databaseName);
        if (!db) throw new Error(`Database "${databaseName}" not initialized`);


        const result = db.exec(queryString);
        return result.length ? result[0].values : [];
    }


    close(databaseName: string): void {
        const db = this.databases.get(databaseName);
        if (db) {
            db.close();
            this.databases.delete(databaseName);
        }
    }
}



interface TableDefinition {
    databaseName: string;
    tableName: string;
    data: Record<string, any>[];
    columns?: ColumnDefinition[];
    indexes?: IndexDefinition[]; // Optional indexes for performance
    constraints?: TableConstraints; // Table-level constraints
  }
  
  interface ColumnDefinition {
    name: string;
    type: ColumnType;
    length?: number; // Optional length for types like VARCHAR
    default?: ColumnDefault | string | number; // Default value, can be a system constant or literal
    primaryKey?: boolean;
    autoIncrement?: boolean;
    notNull?: boolean;
    unique?: boolean;
    foreignKey?: ForeignKeyDefinition; // Optional foreign key reference
  }
  
  interface ForeignKeyDefinition {
    referenceTable: string;
    referenceColumn: string;
    onDelete?: ReferentialAction; // Action on deletion (CASCADE, SET NULL, etc.)
    onUpdate?: ReferentialAction; // Action on update (CASCADE, SET NULL, etc.)
  }
  
  interface IndexDefinition {
    name: string;
    columns: string[];
    unique?: boolean;
  }
  
  interface TableConstraints {
    checkConstraints?: string[]; // SQL check constraints (e.g., "age > 18")
    uniqueConstraints?: string[][]; // List of unique column combinations
  }
  
  enum ColumnType {
    INT = "INT",
    BIGINT = "BIGINT",
    VARCHAR = "VARCHAR",
    TEXT = "TEXT",
    BOOLEAN = "BOOLEAN",
    DATE = "DATE",
    TIMESTAMP = "TIMESTAMP",
    DECIMAL = "DECIMAL",
    FLOAT = "FLOAT",
    DOUBLE = "DOUBLE",
    JSON = "JSON",
  }
  
  enum ColumnDefault {
    CURRENT_TIMESTAMP = "CURRENT_TIMESTAMP",
    NULL = "NULL",
  }
  
  enum ReferentialAction {
    CASCADE = "CASCADE",
    SET_NULL = "SET NULL",
    RESTRICT = "RESTRICT",
    NO_ACTION = "NO ACTION",
  }
  