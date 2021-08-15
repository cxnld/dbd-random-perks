import { Text, Heading, VStack } from '@chakra-ui/react'

const Tooltip = ({ data }) => {
	const { perk_name, description } = data
	return (
		<VStack maxWidth="70%">
			<Heading>{perk_name}</Heading>
			<Text whiteSpace="pre-line">{description}</Text>
		</VStack>
	)
}

export default Tooltip
