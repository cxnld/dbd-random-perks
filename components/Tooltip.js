import { Text, Heading, VStack } from '@chakra-ui/react'

const Tooltip = ({ data }) => {
	const { perk_name, description } = data
	return (
		<VStack maxWidth="80%" p="20px" bg="gray.700" borderRadius="10px">
			<Heading>{perk_name}</Heading>
			<Text whiteSpace="pre-line">{description}</Text>
		</VStack>
	)
}

export default Tooltip
