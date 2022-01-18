/* @flow */
import * as React from 'react';
import styled from 'styled-components';
import autobind from 'autobind-decorator';
import {
	storiesOf,
	withDocs,
	withKnobs,
	select,
	boolean,
	text
} from 'base-storybook';

import {
	Dropdown
} from './';

import README from './README.md';

const DescriptionWrapper = styled.div`
	text-align: left;
`;

const ExampleWrapper = styled.div`
	border: 1px dashed rgba(0, 0, 0, 0.5);
	padding: 0 5px;
`;

const CenterWrapper = styled.div`
	text-align: center;
`;

const SmolContainer = styled.div`
	display: inline-block;
`;

const Button = styled.div`
	color: #f0f0f0;
	background: #666;
	border-radius: 5px;
	margin: 2px;
	padding: 5px;
`;

const RoundedBorderDiv = styled.div`
	background: white;
	border: 1px solid #666;
	border-radius: 5px;
	margin: 3px;
	padding: 2px;
`;

const RectangularBorderDiv = styled.div`
	background: white;
	border: 1px solid #666;
	padding: 5px;
`;

const MenuBarContainer = styled.div`
	display: flex;
	width: 100%;
	background: #444;
`;

const MenuBarButton = styled.div`
	color: #f0f0f0;
	background: #666;
	padding: 5px;
	border-right: 5px solid #444;
`;

const FluoDiv = styled.div`
	padding: 5px;
	background: lime;
	border: 5px red dashed;
`;

class ConfigurableExample extends React.Component<{}, { message?: string }> {

	constructor(props) {
		super(props);
	}

	@autobind
	setMessage(message) {
		this.setState({ message });
	}

	render() {
		const alignment = select('Dropdown alignment', ['left', 'right', 'center', 'fullwidth'], 'right');
		const triggerLabel = text('Trigger label', 'I am a very long button that you should edit and/or click!');
		const containerType = select('DropdownContainer', ['Rounded Border', 'Rectangular Border', 'FLUO', 'none'], 'Rounded Border');
		const useHover = boolean('Toggle by hovering', false);
		const useClick = boolean('Toggle by clicking', true);
		const upwards = boolean('Open upward', false);

		let dropdownContainer;

		switch (containerType) {
			case 'Rounded Border':
				dropdownContainer = RoundedBorderDiv;
				break;
			case 'Rectangular Border':
				dropdownContainer = RectangularBorderDiv;
				break;
			case 'FLUO':
				dropdownContainer = FluoDiv;
				break;
		}
		return (
			<ExampleWrapper>
				<p>
					{this.state && this.state.message
						? `You clicked ${this.state.message}`
						: 'Use the Dropdown, Luke!'}
				</p>
				<CenterWrapper>
					<SmolContainer>
						<Dropdown
							trigger={<Button>{triggerLabel}</Button>}
							dropdownContainer={dropdownContainer}
							options={{
								align: alignment,
								useHover,
								useClick,
								upwards
							}}
						>
							<Button onClick={() => this.setMessage('Woopty')}>Woopty</Button>
							<Button onClick={() => this.setMessage('Doopty')}>Doopty</Button>
							<Button onClick={() => this.setMessage('Doo')}>Doo</Button>
						</Dropdown>
					</SmolContainer>
				</CenterWrapper>

			</ExampleWrapper>
		);
	}
}

const FakeMenuBar = ({ openDropdown, toggleDropdown, setContent }: {
	openDropdown: (event?: SyntheticEvent<*>) => void,
	toggleDropdown: (event?: SyntheticEvent<*>) => void,
	setContent: (index: number) => void
}) => (
	<MenuBarContainer>
		<MenuBarButton
			onClick={() => { setContent(0); toggleDropdown(); }}
			onMouseEnter={() => { setContent(0); }}
		>
			#0 Click me or hover me while open!
		</MenuBarButton>
		<MenuBarButton
			onMouseEnter={() => { setContent(1); openDropdown(); }}
		>
			#1 Hover me!
		</MenuBarButton>
		<MenuBarButton
			onMouseEnter={() => { setContent(2); openDropdown(); }}
		>
			#2 Hover me!
		</MenuBarButton>
	</MenuBarContainer>
);

class ComplexExample extends React.PureComponent<{}, { message?: string, isOpen: boolean }> {

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};

	}
	@autobind setDropdownContent(id: number) {
		this.setState({ message: `Let's pretend we're showing the contents of the entinty identified by this id: ${id}` });
	}

	@autobind
	open(e?: SyntheticEvent<*>) {
		e && e.stopPropagation();
		this.setState({
			isOpen: true
		});
	}

	@autobind
	close(e?: SyntheticEvent<*> | MouseEvent) {
		e && e.stopPropagation();
		this.setState({
			isOpen: false
		});
	}

	@autobind
	toggle(e?: SyntheticEvent<*>) {
		this.state.isOpen ? this.close(e) : this.open(e);
	}

	render() {

		return (
			<ExampleWrapper>
				<CenterWrapper>
					<FakeMenuBar
						setContent={this.setDropdownContent}
						openDropdown={this.open}
						toggleDropdown={this.toggle}
					/>
					<Dropdown
						isOpen={this.state.isOpen}
						onClose={this.close}
						onOpen={this.open}
						onClickOutside={this.close}
						dropdownContainer={RectangularBorderDiv}
						options={{
							useHover: true,
							useClick: false
						}}
					>
						<p>{this.state.message}</p>
						<a href='//www.catipsum.com/'>Cat Ipsum is best.</a>
						<p>
							Find a way to fit in tiny box find something else more interesting. Go into a room to decide you didn&apos;t want to be in there
							anyway this human feeds me, i should be a god swat at dog, but cats are fats i like to pets them they like to meow back but
							purrrrrr. Find empty spot in cupboard and sleep all day allways wanting food. Lies down chase mice, or i&apos;m going to lap some
							water out of my master&apos;s cup meow eat too much then proceed to regurgitate all over living room carpet while humans eat dinner
							but thinking longingly about tuna brine but thinking longingly about tuna brine and my cat stared at me he was sipping his tea,
							too.
						</p>
					</Dropdown>
				</CenterWrapper>

			</ExampleWrapper>
		);
	}
}


storiesOf('3. Elements|Dropdown', module)
	.addDecorator(withKnobs)
	.addDecorator(withDocs(README))
	.add('Dropdown', () => {
		return (
			<div>
				<DescriptionWrapper>
					<h3>Configurable Example</h3>
					<p>Use the knobs to experiment with different widths, alignments, borders and click/hover behaviour.</p>
				</DescriptionWrapper>
				<ConfigurableExample />

				<DescriptionWrapper>
					<h3>Complex Example</h3>
					<p>
						This example is not configurable, but showcases something a bit more complex and
						makes use of overriding the internal state of the component.
					</p>
					<p>
						It would probably confuse the hell out of users, but it&apos;s an example of mixed usage
						of hover and click behaviours.
					</p>

				</DescriptionWrapper>
				<ComplexExample />
			</div>
		);
	});
