import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";

const CopyToClipboard = ({ text }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000); // Reset the feedback after 2 seconds
		} catch (err) {
			console.error("Failed to copy text:", err);
		}
	};

	return (
		<Box p={2}>
			<Typography mb={3} variant="h6" fontWeight={600}>
				Share below link
			</Typography>
			<Stack
				direction="row"
				p={1}
				alignItems="center"
				gap={3}
				sx={{
					border: "1px solid grey",
					borderRadius: 30
				}}>
				<Typography>{text}</Typography>
				<Tooltip title={copied ? "Copied!" : "Copy to clipboard"} arrow>
					<Button
						variant="contained"
						color="primary"
						onClick={handleCopy}
						sx={{
							textTransform: "none",
							backgroundColor: copied
								? "success.main"
								: "primary.main",
							borderRadius: 30
						}}>
						{copied ? "Copied" : "Copy"}
					</Button>
				</Tooltip>
			</Stack>
		</Box>
	);
};

export default CopyToClipboard;
