import Head from 'next/head'
import Image from 'next/image'
import { Text } from '@chakra-ui/react'

import Content from '../components/Content'

import mainLogo from '../public/logo.png'

export default function Home() {
	return (
		<>
			<Head>
				<title>Dead by Daylight</title>
			</Head>

			<div className="container">
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
				<footer>A personal project by github/cxnld</footer>
			</div>
		</>
	)
}
