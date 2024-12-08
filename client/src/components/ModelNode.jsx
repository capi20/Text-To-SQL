import React from "react";
import { Handle, Position } from "reactflow";

export default function ModelNode({ data }) {
	return (
		<div
			style={{
				borderRadius: "8px",
				minWidth: "250px",
				border: "1px solid #ccc",
				overflow: "hidden"
			}}>
			{data.isChild && (
				<Handle id={data.name} position={Position.Top} type="target" />
			)}
			<div
				style={{
					padding: "8px",
					textAlign: "center",
					borderRadius: "8px 8px 0 0",
					backgroundColor: "#3d5787"
				}}>
				<p
					style={{
						fontWeight: "bold",
						color: "white",
						margin: 0
					}}>
					{data.name}
				</p>
			</div>
			{data.fields.map(({ type, name, hasConnections }, index) => (
				<div
					key={`${name} - ${type}`}
					style={{
						display: "flex",
						justifyContent: "space-between",
						padding: "8px",
						backgroundColor:
							index % 2 === 0 ? "#282828" : "#232323",
						color: "white"
					}}>
					<p style={{ margin: 0 }}>{name}</p>
					<p style={{ margin: 0 }}>{type}</p>
					{hasConnections && (
						<Handle
							position={Position.Right}
							id={`${data.name}-${name}`}
							type="source"
							style={{
								top: 40 + 20 + 40 * index
							}}
						/>
					)}
				</div>
			))}
		</div>
	);
}
