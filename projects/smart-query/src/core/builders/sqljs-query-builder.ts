import { QueryBuilder } from './query-builder';



export class SqlJsQueryBuilder implements QueryBuilder {
  private query: string = "";
//   private schema?: TableDefinition;
  private conditions: string[] = []; // Store conditions separately
  private logicalOperator: "AND" | "OR" = "AND"; // Default logical operator

  select(table: string): QueryBuilder {
    this.query = `SELECT * FROM ${table}`;
    return this;
  }


  // where(column: string, operator: string, value: string | number | string[]): QueryBuilder {
  //   let condition = "";
  //   if (Array.isArray(value) && operator.toUpperCase() === "IN") {
  //     condition = `${column} IN (${value.map(v => `'${v}'`).join(", ")})`;
  //   } else if (operator.toUpperCase() === "INCLUDES") {
  //     condition = `${column} LIKE '%${value}%'`; // Simulating an array or text "includes"
  //   } else {
  //     condition = `${column} ${operator} '${value}'`;
  //   }

  //   this.conditions.push(condition);
  //   return this;
  // }


  where(column: string, operator: string, value: string | number | string[], logicalOperator: "AND" | "OR" = "AND"): QueryBuilder {
        let condition = "";
    
        if (Array.isArray(value) && operator.toUpperCase() === "IN") {
          condition = `${column} IN (${value.map(v => `'${v}'`).join(", ")})`;
        } else if (operator.toUpperCase() === "INCLUDES") {
          condition = `${column} LIKE '%${value}%'`;
        } else {
          condition = `${column} ${operator} '${value}'`;
        }
    
        if (this.conditions.length > 0) {
          this.conditions.push(`${logicalOperator} ${condition}`);
        } else {
          this.conditions.push(condition);
        }
    
        return this;
      }

  or(): QueryBuilder {
    this.logicalOperator = "OR"; // Set the next condition to be OR
    return this;
  }

  and(): QueryBuilder {
    this.logicalOperator = "AND"; // Set the next condition to be AND
    return this;
  }


  build(): string {
    if (this.conditions.length > 0) {
      this.query += " WHERE " + this.conditions.join(" ");
    }
    return this.query;
  }

}






// export class SqlJsQueryBuilder implements QueryBuilder {
//   private query: string = "";
//   private conditions: string[] = [];

//   select(table: string): QueryBuilder {
//     this.query = `SELECT * FROM ${table}`;
//     return this;
//   }

//   where(column: string, operator: string, value: string | number | string[], logicalOperator: "AND" | "OR" = "AND"): QueryBuilder {
//     let condition = "";

//     if (Array.isArray(value) && operator.toUpperCase() === "IN") {
//       condition = `${column} IN (${value.map(v => `'${v}'`).join(", ")})`;
//     } else if (operator.toUpperCase() === "INCLUDES") {
//       condition = `${column} LIKE '%${value}%'`;
//     } else {
//       condition = `${column} ${operator} '${value}'`;
//     }

//     if (this.conditions.length > 0) {
//       this.conditions.push(`${logicalOperator} ${condition}`);
//     } else {
//       this.conditions.push(condition);
//     }

//     return this;
//   }

//   build(): string {
//     if (this.conditions.length > 0) {
//       this.query += " WHERE " + this.conditions.join(" ");
//     }
//     return this.query;
//   }

//   buildFromFilters(table: string, filters: ColumnFilter[]): string {
//     this.select(table);

//     filters.forEach((filter, index) => {
//       const logicalOperator = index === 0 ? "AND" : filter.operationType.toUpperCase() as "AND" | "OR";
//       this.where(filter.columnName, filter.constraints || "=", filter.mappedInputKey, logicalOperator);
//     });

//     return this.build();
//   }
// }
