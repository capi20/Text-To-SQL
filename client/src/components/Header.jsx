import {
	AppBar,
	Box,
	IconButton,
	Stack,
	Toolbar,
	Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Header = ({ open, handleDrawer }) => {
	return (
		<AppBar position="fixed" open={open} sx={{ zIndex: 9999 }}>
			<Toolbar>
				<Stack flex={1} direction="row" alignItems="center">
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawer}
						edge="start"
						sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						SQLGenie
					</Typography>
				</Stack>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					color="inherit">
					<AccountCircle />
				</IconButton>
			</Toolbar>
		</AppBar>
	);
};
export default Header;
