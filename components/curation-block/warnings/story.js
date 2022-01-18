/* @flow */

import * as React from 'react';
import { storiesOf } from 'base-storybook';
import ConcurrentEditingWarning from './ConcurrentEditingWarning';
import FixedWarningBar from './fixed-warning-bar';
import Button from 'kinja-components/components/button19';
import authorStub from '../../../__stubs__/stubbedAuthorResponse.json';

const author = {
	editor: authorStub,
	lastChangeTimestamp: 1582734928554
};

function WarningWrapper(props) {
	const [showWarning, setShowWarning] = React.useState(true);
	const onShow = () => setShowWarning(true);
	return (
		<>
			<Button label="Show warning" onClick={onShow} />
			<ConcurrentEditingWarning
				type={props.type}
				blogName="Gizmodo"
				editors={[author, author]}
				isOpen={showWarning}
				onSave={() => setShowWarning(false)}
				onCancel={() => setShowWarning(false)}
			/>
		</>
	);
}

storiesOf('4. Components|CurationBlock/ConcurrentEditing', module)
	.add('Fixed Warning Bar: NewHomepageVersionPublished', () => {
		return <FixedWarningBar type='OverwriteWarning' editors={[authorStub]} />;
	})
	.add('Fixed Warning Bar: NewUsersJoined', () => {
		return <FixedWarningBar type='ConcurrentEditingWarning' editors={[authorStub, authorStub, authorStub]} />;
	})
	.add('ConcurrentEditingWarning modal', () => {
		return <WarningWrapper type="ConcurrentEditingWarning" />;
	})
	.add('OverwriteWarning modal', () => {
		return <WarningWrapper type="OverwriteWarning" />;
	});
