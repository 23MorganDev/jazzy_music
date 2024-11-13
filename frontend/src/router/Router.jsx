import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import HomeLayout from "../layout/HomeLayout";
import LibraryPage from "../pages/LibraryPage";
import PlaylistsPage from "../pages/PlaylistsPage";
import ErrorPage from "../pages/ErrorPage";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ArtistPage from "../pages/ArtistPage";
import ArtistsPage from "../pages/ArtistsPage";
import FavoritesPage from "../pages/FavoritesPage";
import PlaylistPage from "../pages/PlaylistPage";
import CreatePlaylistPage from "../pages/CreatePlaylistPage";
import EditPlaylistPage from "../pages/EditPlayListPage";

export const Router = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <Navigate to="/home" replace /> },
			{
				path: "/home",
				element: <HomePage />,
			},
			{
				path: "library",
				element: <LibraryPage />,
			},
			{
				path: "playlists",
				element: <PlaylistsPage />,
			},
			{
				path: "playlists/:id",
				element: <PlaylistPage />,
			},
			{
				path: "playlists/create",
				element: <CreatePlaylistPage />,
			},
			{
				path: "playlists/edit/:id",
				element: <EditPlaylistPage />,
			},
			{
				path: "artists",
				element: <ArtistsPage />,
			},
			{
				path: "artist/:id",
				element: <ArtistPage />,
			},
			{
				path: "favorites",
				element: <FavoritesPage />,
			},
		],
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "login",
				element: <LoginPage />,
			},
			{
				path: "register",
				element: <RegisterPage />,
			},
		],
	},
]);
