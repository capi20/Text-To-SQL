import ReactFlow, { Background, BackgroundVariant, Controls } from "reactflow";
import "reactflow/dist/style.css";
import ModelNode from "../components/ModelNode";
import { generateEdgesFromSchema, parseSQLSchema } from "../utils/schemaParser";
import { Schema } from "../utils/SQLSchema";

const modelTypes = {
	model: ModelNode
};

const models = parseSQLSchema(Schema);
const edges = generateEdgesFromSchema(Schema);

console.log(models);
// const models = [
// 	{
// 		name: "Post",
// 		fields: [
// 			{
// 				name: "id",
// 				type: "number",
// 				hasConnections: false
// 			},
// 			{
// 				name: "title",
// 				type: "string",
// 				hasConnections: false
// 			},
// 			{
// 				name: "author",
// 				type: "User",
// 				hasConnections: true
// 			},
// 			{
// 				name: "comments",
// 				type: "Comment",
// 				hasConnections: true
// 			},
// 			{
// 				name: "createdAt",
// 				type: "Date",
// 				hasConnections: false
// 			}
// 		],
// 		isChild: false
// 	},
// 	{
// 		name: "Comment",
// 		fields: [
// 			{
// 				name: "id",
// 				type: "number",
// 				hasConnections: false
// 			},
// 			{
// 				name: "text",
// 				type: "string",
// 				hasConnections: false
// 			}
// 		],
// 		isChild: true
// 	},
// 	{
// 		name: "User",
// 		fields: [
// 			{
// 				name: "id",
// 				type: "number",
// 				hasConnections: false
// 			},
// 			{
// 				name: "name",
// 				type: "string",
// 				hasConnections: false
// 			},
// 			{
// 				name: "email",
// 				type: "string",
// 				hasConnections: false
// 			}
// 		],
// 		isChild: true
// 	}
// ];

let row = 0;
let column = 0;
const numModels = models.length;
let numGrid = 1;

while (1) {
	if (numGrid ** 2 >= numModels) {
		break;
	}
	numGrid++;
}

const nodes = models.map((model, index) => {
	const x = row * 300;
	const y = column * 300;

	if (numGrid % index === 0) {
		column = 0;
		row += 1;
	} else {
		column += 1;
	}

	return {
		id: model.name,
		position: { x, y },
		data: model,
		type: "model"
	};
});

// const edges = [
// 	{
// 		id: "Post-author",
// 		source: "Post",
// 		target: "User",
// 		sourceHandle: "Post-author",
// 		targetHandle: "User",
// 		animated: true
// 	},
// 	{
// 		id: "Post-comments",
// 		source: "Post",
// 		target: "Comment",
// 		sourceHandle: "Post-comments",
// 		targetHandle: "Comment",
// 		animated: true
// 	}
// ];

console.log("node", nodes, edges);

export const SchemaVisualizer = () => {
	return (
		<div
			style={{
				height: "100vh",
				width: "100%",
				background: "#1C1c1c"
			}}>
			<ReactFlow
				defaultNodes={nodes}
				defaultEdges={edges}
				nodeTypes={modelTypes}
				fitView
				fitViewOptions={{ padding: 0.4 }}>
				<Background color="#222" variant={BackgroundVariant.Lines} />
				<Controls />
			</ReactFlow>
		</div>
	);
};
