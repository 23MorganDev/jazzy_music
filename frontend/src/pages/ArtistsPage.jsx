import { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";
import { AiOutlineLoading } from "react-icons/ai";
import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { frontend } from "../api/routeConfig";

const ArtistsPage = () => {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchArtists = async () => {
		setLoading(true);
		setError(false);
		await frontend
			.get("/artists/all")
			.then((res) => {
				setArtists(res.data);
				setLoading(false);
			})
			.catch(() => {
				setError(true);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchArtists();
	}, []);

	return (
		<Box
			p={6}
			pb={32}
			minH="100vh"
			pt={{ base: 20, md: 6 }}
			pl={{ base: 4, md: 14, xl: 0 }}>
			<Box mb={6}>
				<Heading
					fontSize={{ base: "xl", md: "2xl" }}
					fontWeight="semibold"
					mb={{ base: 1, md: 3 }}>
					Artistes
				</Heading>
				<Text fontSize="sm" color="zinc.400">
					Discover new artistes
				</Text>
			</Box>
			{loading && artists.length < 1 && (
				<Flex align="center" justify="center" color="accent.main" minH="20rem">
					<AiOutlineLoading className="spin" size={36} />
				</Flex>
			)}
			<Grid
				templateColumns={{
					base: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
					lg: "repeat(4, 1fr)",
					xl: "repeat(5, 1fr)",
				}}
				gap={6}>
				{artists.map((artiste) => (
					<ArtistCard key={artiste._id} artist={artist} />
				))}
			</Grid>
			{error && (
				<Box>
					<Text>Sorry, an error occured</Text>
				</Box>
			)}
		</Box>
	);
};

export default ArtistsPage;