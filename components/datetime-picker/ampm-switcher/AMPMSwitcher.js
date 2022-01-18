/* @flow */

import * as React from 'react';
import { DateTime } from 'luxon';
import styled from 'styled-components';

import { EnsureDefaultTheme } from 'kinja-components/components/theme';


export const Container = styled.div`
	width: 22px;
`;

export const TextBox = styled.div`
	padding: 0;
	border-bottom: 1px solid ${props => props.theme.color.black};
	font-size: 18px;
	line-height: 23px;
	user-select: none;
	cursor: pointer;
`;


type Props = {
	timemillis: number,
	timezone: string,
	onChange: (meridiem: string) => void
}

type DefaultProps = {
	timezone: string
}

type State = {
	meridiem: string
}


class DateTimePicker extends React.Component<Props, State> {
	static defaultProps: DefaultProps = {
		timezone: 'America/New_York'
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			...this.resolveStateFromMillis(props.timemillis, props.timezone)
		};
	}

	componentDidUpdate(prevProps: Props) {
		const { timemillis, timezone } = this.props;
		if (prevProps.timemillis !== this.props.timemillis) {
			this.setState(this.resolveStateFromMillis(timemillis, timezone));
		}
	}

	resolveStateFromMillis(timemillis: number, timezone: string) {
		const meridiem = DateTime.fromMillis(timemillis, { zone: timezone }).toFormat('a').toLowerCase();

		return {
			meridiem
		};
	}

	onClick = (e: SyntheticMouseEvent<HTMLDivElement>) => {
		const nextMeridiem = e.currentTarget.innerText === 'am' ? 'pm' : 'am';
		this.setState({ meridiem: nextMeridiem }, () => {
			this.props.onChange(nextMeridiem);
		});
	}

	render() {
		return (
			<EnsureDefaultTheme>
				<Container>
					<TextBox onClick={this.onClick}>{this.state.meridiem}</TextBox>
				</Container>
			</EnsureDefaultTheme>
		);
	}
}


export default DateTimePicker;