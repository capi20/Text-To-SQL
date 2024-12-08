import { Box, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import SpeechRecognition from "../components/SpeechRecognition";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const [query, setQuery] = useState("");
	const queryRef = useRef(null);
	const { setFirstQuery } = useAppContext();
	const navigate = useNavigate();

	const handleUserQuery = (transcript) => {
		setQuery((prev) => `${prev} ${transcript}`.trim());
		queryRef.current.focus();
	};

	const handleQuery = (event) => {
		if (event.key === "Enter" && query.trim()) {
			setFirstQuery(query.trim());
			navigate(`/chat/${Date.now()}`);
		}
	};

	return (
		<Box maxWidth="1000px" margin="auto">
			<Stack
				justifyContent="center"
				alignItems="center"
				gap={2}
				p={3}
				className="full-height">
				<Typography variant="h5" fontWeight={600}>
					Type it, and we'll speak SQL for you!
				</Typography>
				<Stack direction="row" gap={2} alignItems="center" width="100%">
					<input
						ref={queryRef}
						type="text"
						className="dashboard-input"
						placeholder="Ex: How many students are enrolled in the database?"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={handleQuery}
					/>
					<SpeechRecognition handleUserQuery={handleUserQuery} />
				</Stack>
			</Stack>
		</Box>
	);
};
export default Home;
