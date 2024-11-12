import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { AiOutlineLoading } from "react-icons/ai";
import ArtistCard from "./ArtistCard";
import { frontend } from "../api/routeConfig";
import { Link } from "react-router-dom";

const Artists = () => {
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchArtists = async () => {
		setLoading(true);
		setError(false);
		await frontend
			.get("/artists/top")  //.get("/artists/") thisis bcoz the backend route already has the "/top"
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
		<Box mt={8}>
			<Flex align="center" justify="space-between" mb={3}>
				<Heading as="h3" fontSize={{ base: "lg", md: "xl" }} fontWeight={500}>
					You May Like
				</Heading>
				<Link to="/artists">
					<Button
						variant="unstyled"
						color="accent.light"
						fontSize={{ base: "sm", md: "md" }}
						fontWeight={500}>
						See more
					</Button>
				</Link>
			</Flex>

			{loading ? (
				<Flex align="center" justify="center" color="accent.main" minH="20rem">
					<AiOutlineLoading className="spin" size={36} />
				</Flex>
			) : error ? (
				<Box my={2}>
					<Text>Sorry, an error occured</Text>
				</Box>
			) : (
				<Flex
					align="stretch"
					overflowX="scroll"
					gap={5}
					mt={3}
					pb={4}
					px={2}
					className="scrollbar_style">
					{artists?.map((artist) => (
						<ArtistCard key={artist._id} artiste={artist} />
					))}
				</Flex>
			)}
		</Box>
	);
};

export default Artists;