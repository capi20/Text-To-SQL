import {
	Box,
	Button,
	Dialog,
	IconButton,
	Stack,
	Typography
} from "@mui/material";
import CopyToClipboard from "../components/CopyToClipboard";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useEffect, useRef, useState } from "react";
import SpeechRecognition from "../components/SpeechRecognition";
import { useAppContext } from "../context/appContext";
import { useNavigate, useParams } from "react-router-dom";
import AssistantOutlinedIcon from "@mui/icons-material/AssistantOutlined";

const ChatScreen = () => {
	const [query, setQuery] = useState("");
	const [chats, setChats] = useState([]);
	const [open, setOpen] = useState(false);
	const [recommend, setRecommend] = useState("");
	const queryRef = useRef(null);
	const newChatRef = useRef(null);
	const { firstQuery } = useAppContext();
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (!firstQuery) navigate("/");
		if (chats.length > 0) return;
		setChats([
			...chats,
			{
				query: firstQuery,
				answer: null
			}
		]);
		setTimeout(() => {
			setChats((prevChats) =>
				prevChats.map(
					(chat) =>
						chat.query === firstQuery
							? { ...chat, answer: "abcdef" } // Update answer for matching query
							: chat // Keep other chats unchanged
				)
			);
			setRecommend(
				"List all students in the Computer Science department."
			);
		}, 2000);
	}, []);

	useEffect(() => {
		if (newChatRef.current) {
			newChatRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [chats]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleUserQuery = (transcript) => {
		setQuery((prev) => `${prev} ${transcript}`.trim());
		queryRef.current.focus();
	};

	const handleQuery = (event) => {
		if (event.key === "Enter" && query.trim()) {
			setChats([
				...chats,
				{
					query: query,
					answer: null
				}
			]);
			setRecommend("");
			setTimeout(() => {
				setChats((prevChats) =>
					prevChats.map((chat) =>
						chat.query === query
							? { ...chat, answer: "abcdef" }
							: chat
					)
				);
				setRecommend(
					"List all students in the Computer Science department."
				);
			}, 2000);
			setQuery("");
		}
	};

	const recommendHandler = () => {
		setQuery(recommend);
		queryRef.current.focus();
	};

	return (
		<Box maxWidth="1000px" margin="auto">
			<Stack
				justifyContent="space-between"
				alignItems="center"
				p={3}
				pt={0}
				className="full-height">
				<Stack width="100%" className="hide-scrollbar" gap={4} py={4}>
					{chats.map((chat, index) => {
						return (
							<Stack key={index} gap={3}>
								<Box
									component="p"
									alignSelf="flex-end"
									p={2}
									sx={{
										backgroundColor: "grey.200",
										borderRadius: "20px",
										maxWidth: "50vw"
									}}>
									{chat.query}
								</Box>
								<Box
									component="p"
									sx={{
										maxWidth: "50vw"
									}}
									ref={
										index === chats.length - 1
											? newChatRef
											: null
									}>
									{chat.answer ? (
										chat.answer
									) : (
										<div className="wave-loader">
											<span>.</span>
											<span>.</span>
											<span>.</span>
										</div>
									)}
								</Box>
							</Stack>
						);
					})}
					{recommend && (
						<Button
							disableRipple
							sx={{
								"&:hover": { background: "none" },
								width: "fit-content",
								padding: 0
							}}
							color="primary"
							onClick={recommendHandler}>
							<AssistantOutlinedIcon />
							{recommend}
						</Button>
					)}
				</Stack>
				<Stack direction="row" gap={2} alignItems="center" width="100%">
					<input
						ref={queryRef}
						type="text"
						className="dashboard-input"
						placeholder="Type your query..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={handleQuery}
					/>
					<SpeechRecognition handleUserQuery={handleUserQuery} />
					<IconButton onClick={handleClickOpen}>
						<IosShareIcon />
					</IconButton>
				</Stack>
			</Stack>
			<Dialog onClose={handleClose} open={open}>
				<CopyToClipboard
					text={`${window.location.origin}/share/${params.id}`}
				/>
			</Dialog>
		</Box>
	);
};
export default ChatScreen;
