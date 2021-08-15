import Head from 'next/head'
import Image from 'next/image'
import { VStack, Text, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import Content from '../components/Content'
import mainLogo from '../public/logo.png'

export default function Home() {
	return (
		<>
			<Head>
				<title>Dead by Daylight - Ultimate Bravery</title>
			</Head>

			<VStack align="center" w="100vw" h="100vh">
				<div className="title">
					<Image
						src={mainLogo}
						width={3840 / 20}
						height={2160 / 20}
						alt="logo"
					/>
					<Text fontSize="4xl">Dead by Daylight Ultimate Bravery</Text>
				</div>
				<Content />
				<footer>
					A personal project by &nbsp;
					<Link isExternal color="teal.500" href="https://github.com/cxnld">
						github.com/cxnld
					</Link>
					. This site is not associated with Behaviour Interactive Inc.
				</footer>
			</VStack>
		</>
	)
}
