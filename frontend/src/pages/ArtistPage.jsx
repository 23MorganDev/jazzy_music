import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	Image,
	Text,
} from "@chakra-ui/react";
import { frontend } from "../api/routeConfig";
import ArtistSong from "../components/ArtistSong";
import { BsFillPlayFill } from "react-icons/bs";
import { MdErrorOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { playTrack, setTrackList } from "../redux/slices/playerSlice";
import LoaderSkeleton from "../components/LoaderSkeleton";

const ArtistPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const [artist, setArtist] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchArtist = async () => {
		setLoading(true);
		setError(false);
		await frontend
			.get(`/artists/${id}`)
			.then((res) => {
				setArtist(res.data);
				setLoading(false);
			})
			.catch(() => {
				setError(true);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchArtist();
	}, []);

	const handlePlay = () => {
		dispatch(setTrackList({ list: artist?.songs }));
		dispatch(playTrack(artist?.songs[0]));
	};

	const onSongPlay = (song) => {
		const index = artist?.songs.findIndex((s) => s._id == song._id);

		dispatch(setTrackList({ list: artist?.songs, index }));
		dispatch(playTrack(song));
	};

	if (loading) {
		return <LoaderSkeleton   />;
	}

	if (error) {
		return (
			<Flex align="center" justify="center" minH="100vh">
				<Flex direction="column" align="center" color="accent.light">
					<MdErrorOutline color="inherit" size={32} />
					<Text color="zinc.400" textAlign="center">
						An error occured
					</Text>
				</Flex>
			</Flex>
		);
	}

	return (
		<Box minH="100vh" p={4} pb={32} pt={{ base: 16, md: 4 }}>
			<Box pt={6}>
				<Flex
					maxW="full"
					direction={{ base: "column", md: "row" }}
					align="flex-start"
					justify="flex-start"
					gap={5}>
					<Box minWidth="14rem" h="14rem">
						<Image
							src={artist?.image}
							alt={artist?.name}
							w="full"
							h="full"
							objectFit="cover"
							rounded="lg"
						/>
					</Box>
					<Box>
						<Heading
							as="h1"
							fontSize={{ base: "lg", md: "3xl" }}
							color="accent.light"
							mb={4}
							fontWeight={600}>
							{artist?.name}
						</Heading>
						<Text
							fontSize={{ base: "sm", md: "md" }}
							maxW="full"
							color="zinc.300">
							{artist?.bio}
						</Text>
					</Box>
				</Flex>
				<Box mt={12}>
					<Flex align="center" gap={6} mb={4}>
						<Heading
							as="h3"
							fontSize={{ base: "lg", md: "xl" }}
							fontWeight={600}>
							Songs
						</Heading>
						<Button
							onClick={handlePlay}
							display="inline-flex"
							alignItems="center"
							variant="unstyled"
							bg="accent.light"
							fontSize={{ base: "sm", md: "md" }}
							color="white"
							rounded="2rem"
							py={1}
							px={4}
							leftIcon={<BsFillPlayFill size={20} />}>
							Play All
						</Button>
					</Flex>
					<Divider w="full" h="1px" border="0" bg="zinc.600" mb={3} />

					<Flex direction="column" gap={4}>
						{artist?.songs?.map((song) => (
							<ArtistSong
								key={song?._id}
								song={song}
								handlePlay={onSongPlay}
							/>
						))}
					</Flex>
				</Box>
			</Box>
		</Box>
	);
};

export default ArtistPage;