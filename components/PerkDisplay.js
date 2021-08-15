import { useState } from 'react'
import { HStack, Image, Img, VStack } from '@chakra-ui/react'
import Tooltip from './Tooltip'

const PerkDisplay = ({ toggled, perkSet1, perkSet2 }) => {
	const [tooltip, setTooltip] = useState(null)

	const configTooltip = (index) => {
		if (!toggled) {
			if (perkSet1.length) {
				setTooltip(perkSet1[index])
			}
		} else {
			if (perkSet2.length) {
				setTooltip(perkSet2[index])
			}
		}
	}

	const trimURL = (url) => {
		return url.split('/revision')[0]
	}

	const perkFormater = (url) => {
		const imgLink = trimURL(url)
		return (
			<div className="format">
				<div className="element bg">
					<Image src="/perk_bg.png" alt="backgrond" />
				</div>
				<div className="element cover">
					<Image src={imgLink} alt="perk-cover" />
				</div>
			</div>
		)
	}

	const defaultDice = () => <Img src="/dice.png" />

	// Handles perkSet1
	const front = (index) => {
		return perkSet1.length
			? perkFormater(perkSet1[index].icon_url)
			: defaultDice()
	}

	// Handles perkSet2
	const back = (index) => {
		return perkSet2.length
			? perkFormater(perkSet2[index].icon_url)
			: defaultDice()
	}

	return (
		<VStack
			bg="gray.600"
			w="750px"
			h="100%"
			p="20px"
			borderRightRadius="10px"
			spacing={5}
		>
			<HStack bg="gray.700" p="10px" borderRadius="10px">
				{[0, 1, 2, 3].map((index) => (
					<div
						className={`card ${toggled ? 'is-flipped' : ''}`}
						key={index}
						onMouseEnter={() => configTooltip(index)}
						onMouseLeave={() => setTooltip(null)}
					>
						<div className="card-face card-face-front">{front(index)}</div>
						<div className="card-face card-face-back">{back(index)}</div>
					</div>
				))}
			</HStack>
			{tooltip && <Tooltip data={tooltip} />}
		</VStack>
	)
}

export default PerkDisplay
