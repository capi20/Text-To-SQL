import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import AppDrawer from "./AppDrawer";
import { useState } from "react";
import { styled } from "@mui/material/styles";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme }) => ({
		minHeight: "100vh",
		flexGrow: 1,
		padding: theme.spacing(8, 0, 0, 0),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginLeft: 0,
		variants: [
			{
				props: ({ open }) => open,
				style: {
					transition: theme.transitions.create("margin", {
						easing: theme.transitions.easing.easeOut,
						duration: theme.transitions.duration.enteringScreen
					}),
					marginLeft: "240px"
				}
			}
		]
	})
);

const AppLayout = () => {
	const [open, setOpen] = useState(true);

	const handleDrawer = () => {
		setOpen(!open);
	};

	// const handleDrawerClose = () => {
	// 	setOpen(false);
	// };
	return (
		<>
			<Header open={open} handleDrawer={handleDrawer} />
			<AppDrawer open={open} />
			<Main open={open}>
				<Outlet />
			</Main>
		</>
	);
};
export default AppLayout;
