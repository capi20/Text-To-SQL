export function parseSQLSchema(schema) {
	const models = [];
	const foreignKeys = {};

	// Split schema into individual table definitions
	const tables = schema.split(/CREATE TABLE/i).slice(1);

	tables.forEach((tableDef) => {
		const lines = tableDef.trim().split("\n");

		// Extract the table name
		const tableNameMatch = lines[0].match(/(\w+)\s*\(/);
		if (!tableNameMatch) return;
		const tableName = tableNameMatch[1];

		const fields = [];
		let isChild = false;

		lines.slice(1).forEach((line) => {
			line = line.trim();

			// Handle FOREIGN KEY lines
			if (line.startsWith("FOREIGN KEY")) {
				const fkMatch = line.match(
					/FOREIGN KEY\s*\((\w+)\)\s*REFERENCES\s*(\w+)\s*\((\w+)\)/
				);
				if (fkMatch) {
					const [, fkField, refTable] = fkMatch;

					// Add a foreign key field to the model
					fields.push({
						name: fkField,
						type: refTable,
						hasConnections: true
					});

					foreignKeys[`${tableName}.${fkField}`] = refTable;
					isChild = true;
				}
				return; // Proceed to the next line
			}

			// Match field definitions
			const fieldMatch = line.match(/^(\w+)\s+(\w+.*?)(?:,|$)/);
			if (fieldMatch) {
				const [, fieldName, fieldType] = fieldMatch;
				fields.push({
					name: fieldName,
					type: mapSQLTypeToJS(fieldType),
					hasConnections: false
				});
			}
		});

		models.push({ name: tableName, fields, isChild });
	});

	return models;
}

// Helper: Map SQL data types to JavaScript data types
function mapSQLTypeToJS(sqlType) {
	sqlType = sqlType.toLowerCase();
	if (sqlType.startsWith("int")) return "number";
	if (sqlType.startsWith("varchar") || sqlType.startsWith("text"))
		return "string";
	if (sqlType.startsWith("date")) return "Date";
	if (sqlType.startsWith("decimal") || sqlType.startsWith("float"))
		return "number";
	if (sqlType.startsWith("enum")) return "string";
	if (sqlType.startsWith("boolean")) return "boolean";
	return "unknown";
}

export function generateEdgesFromSchema(schema) {
	const edges = [];

	// Split schema into individual table definitions
	const tables = schema.split(/CREATE TABLE/i).slice(1);

	tables.forEach((tableDef) => {
		const lines = tableDef.trim().split("\n");

		// Extract the table name
		const tableNameMatch = lines[0].match(/(\w+)\s*\(/);
		if (!tableNameMatch) return;
		const tableName = tableNameMatch[1];

		lines.slice(1).forEach((line) => {
			line = line.trim();

			// Match foreign key definitions
			const fkMatch = line.match(
				/FOREIGN KEY\s*\((\w+)\)\s*REFERENCES\s*(\w+)\s*\((\w+)\)/
			);
			if (fkMatch) {
				const [, fkField, refTable] = fkMatch;

				// Create an edge for the relationship
				edges.push({
					id: `${tableName}-${fkField}`,
					source: tableName,
					target: refTable,
					sourceHandle: `${tableName}-${fkField}`,
					targetHandle: refTable,
					animated: true
				});
			}
		});
	});

	return edges;
}
