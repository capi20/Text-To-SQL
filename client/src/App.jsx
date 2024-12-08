import { Navigate, Route, Routes } from "react-router-dom";
import { SchemaVisualizer } from "./pages/SchemaVisualizer";
import AppLayout from "./components/AppLayout";
import { AppProvider } from "./context/appContext";
import { CLIENT_ROUTES } from "./constants";
import Home from "./pages/Home";
import ChatScreen from "./pages/ChatScreen";

function App() {
	return (
		<AppProvider>
			<Routes>
				<Route path={CLIENT_ROUTES.home.path} element={<AppLayout />}>
					<Route path="/" element={<Home />} />
					<Route path={`chat/:id`} element={<ChatScreen />} />
					<Route
						path={CLIENT_ROUTES.schemaVisualizer.path}
						element={<SchemaVisualizer />}
					/>
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</AppProvider>
	);
}

export default App;
