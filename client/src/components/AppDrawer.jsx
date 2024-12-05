import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { CLIENT_ROUTES, DRAWER_WIDTH } from "../constants";

const AppDrawer = ({ open }) => {
	const theme = useTheme();
	const [activeIndex, setActiveIndex] = useState(0);
	const navigate = useNavigate();

	return (
		<Drawer
			sx={{
				width: DRAWER_WIDTH,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: DRAWER_WIDTH,
					boxSizing: "border-box",
					marginTop: "64px"
				}
			}}
			variant="persistent"
			anchor="left"
			open={open}>
			<Divider />
			<List>
				{Object.keys(CLIENT_ROUTES).map((route, index) => {
					return (
						<ListItem
							key={route}
							disablePadding
							sx={{
								backgroundColor:
									activeIndex === index
										? "primary.light"
										: "inherit", // Active background
								color:
									activeIndex === index ? "white" : "inherit" // Active text color
							}}>
							<ListItemButton
								onClick={() => {
									setActiveIndex(index);
									navigate(CLIENT_ROUTES[route]["path"]);
								}}>
								<ListItemText
									primary={CLIENT_ROUTES[route]["label"]}
								/>
							</ListItemButton>
						</ListItem>
					);
				})}
			</List>
		</Drawer>
	);
};

export default AppDrawer;
