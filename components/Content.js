import { useState } from 'react'
import {
	Text,
	Button,
	Input,
	Switch,
	Checkbox,
	HStack,
	VStack,
	useToast,
} from '@chakra-ui/react'

import PerkDisplay from './PerkDisplay'

import perkData from '../public/dbd_perks.json'
import { sampleSize } from 'lodash'

const Content = () => {
	const toast = useToast()
	const [role, setRole] = useState('Survivor')
	const [input, setInput] = useState('')
	const [perks, setPerks] = useState(perkData.survivor_perks)

	const [toggled, setToggled] = useState(false)
	const [perkSet1, setPerkSet1] = useState([])
	const [perkSet2, setPerkSet2] = useState([])

	const [checkList, setCheckList] = useState(
		perkData.survivor_perks.map((perk) => ({
			perk_name: perk.perk_name,
			isChecked: true,
		}))
	)

	const allChecked = checkList.every((item) => item.isChecked)
	const isIndeterminate =
		checkList.some((item) => item.isChecked) && !allChecked

	// by default, toggled is false and shows perkSet1
	// if toggled is true, it will show perkSet2
	const updatePerkSet = () => {
		// go through checkList and pick 4 perks
		const filteredCheckList = checkList.filter((element) => element.isChecked)
		if (filteredCheckList.length < 4) {
			toast({
				title: 'Pick at least 4 perks!',
				status: 'error',
				isClosable: true,
			})
		} else {
			let selected = sampleSize(filteredCheckList, 4)

			// make array of relevant information
			selected = selected.map((perk) => {
				return perks.find((el) => el.perk_name === perk.perk_name)
			})

			console.log('Selected', selected)

			if (toggled) {
				setPerkSet1(selected)
			} else {
				setPerkSet2(selected)
			}
			setToggled(!toggled)
		}
	}

	const swapRole = () => {
		if (role === 'Survivor') {
			setRole('Killer')
			setPerks(perkData.killer_perks)
			setCheckList(
				perkData.killer_perks.map((perk) => ({
					perk_name: perk.perk_name,
					isChecked: true,
				}))
			)
		} else {
			setRole('Survivor')
			setPerks(perkData.survivor_perks)
			setCheckList(
				perkData.survivor_perks.map((perk) => ({
					perk_name: perk.perk_name,
					isChecked: true,
				}))
			)
		}
		setInput('')
		setToggled(!toggled)

		if (toggled) {
			setPerkSet1([])
		} else {
			setPerkSet2([])
		}

		return
	}

	const filter = (e) => {
		const keyword = e.target.value

		if (keyword !== '') {
			if (role === 'Survivor') {
				setPerks(
					perkData.survivor_perks.filter((perk) =>
						perk.perk_name.toLowerCase().startsWith(keyword.toLowerCase())
					)
				)
			} else {
				setPerks(
					perkData.killer_perks.filter((perk) =>
						perk.perk_name.toLowerCase().startsWith(keyword.toLowerCase())
					)
				)
			}
		} else {
			role === 'Survivor'
				? setPerks(perkData.survivor_perks)
				: setPerks(perkData.killer_perks)
		}
	}

	return (
		<>
			<HStack spacing="15px">
				<Text fontSize="xl">Survivor</Text>
				<Switch colorScheme="red" size="md" onChange={swapRole} />
				<Text fontSize="xl">Killer</Text>
			</HStack>

			<HStack spacing={10} align="start">
				<VStack width="260px" height="100%" padding="10px">
					<Input
						placeholder="Search"
						size="md"
						value={input}
						onChange={(e) => {
							setInput(e.target.value)
							filter(e)
						}}
					/>

					<VStack
						width="100%"
						maxHeight="500px"
						align="start"
						padding="5px"
						overflow="auto"
					>
						<Checkbox
							isChecked={allChecked}
							isIndeterminate={isIndeterminate}
							onChange={(e) => {
								let newArr = checkList.map((item) => ({
									...item,
									isChecked: e.target.checked,
								}))
								setCheckList(newArr)
							}}
						>
							All
						</Checkbox>
						{perks.map((perk) => (
							<Checkbox
								key={perk.perk_name}
								pl="15px"
								isChecked={
									checkList.find((el) => el.perk_name === perk.perk_name)
										.isChecked
								}
								onChange={(e) => {
									let newArr = checkList.map((item) => {
										if (item.perk_name === perk.perk_name) {
											return {
												perk_name: perk.perk_name,
												isChecked: e.target.checked,
											}
										} else {
											return item
										}
									})

									setCheckList(newArr)
								}}
							>
								{perk.perk_name}
							</Checkbox>
						))}
					</VStack>
					<Button
						colorScheme="red"
						marginTop="15px"
						onClick={() => updatePerkSet()}
					>
						Decide My Fate
					</Button>
				</VStack>

				<PerkDisplay
					toggled={toggled}
					perkSet1={perkSet1}
					perkSet2={perkSet2}
				/>
			</HStack>
		</>
	)
}

export default Content

// toggled with alternate between true and false
