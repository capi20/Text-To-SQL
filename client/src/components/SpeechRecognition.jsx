import { useEffect, useRef, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import { IconButton } from "@mui/material";

const SpeechRecognition = ({ handleUserQuery }) => {
	const recognitionRef = useRef(null); // Reference to the SpeechRecognition instance
	const [listening, setListening] = useState(false); // To track if mic is active

	useEffect(() => {
		// Initialize SpeechRecognition only once
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;

		if (SpeechRecognition) {
			const recognition = new SpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = false;
			recognition.lang = "en-US";

			// Handle results
			recognition.onresult = (event) => {
				const transcript = Array.from(event.results)
					.map((result) => result[0].transcript)
					.join(" ");

				handleUserQuery(transcript);
			};

			// Handle errors
			recognition.onerror = (error) => {
				console.error("Speech recognition error:", error);
				setListening(false);
			};

			// Handle recognition end
			recognition.onend = () => {
				setListening(false); // Reset listening state when recognition ends
			};

			recognitionRef.current = recognition; // Store instance in ref
		} else {
			alert("Speech recognition is not supported in this browser.");
		}
	}, []); // Only initialize once on component mount

	const startListening = () => {
		if (recognitionRef.current) {
			setListening(true);
			recognitionRef.current.start();
		}
	};

	const stopListening = () => {
		if (recognitionRef.current) {
			setListening(false);
			recognitionRef.current.stop();
		}
	};
	return (
		<IconButton
			onClick={listening ? stopListening : startListening}
			color={listening ? "error" : "primary"}
			sx={{
				width: 50,
				height: 50,
				backgroundColor: listening ? "lightcoral" : "lightblue",
				borderRadius: "50%"
			}}>
			{listening ? <MicOffIcon /> : <MicIcon />}
		</IconButton>
	);
};
export default SpeechRecognition;
