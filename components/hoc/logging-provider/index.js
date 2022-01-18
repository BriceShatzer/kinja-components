// @flow
import type { FunctionOrClassComponent } from '../../../utils/types';
import * as React from 'react';

export type Logger = {
	debug: (message: string) => void,
	info: (message: string) => void,
	warning: (message: string) => void,
	error: (message: string) => void,
	critical: (message: string) => void
}

export const defaultLogger = {
	debug: console.info,
	info: console.info,
	warning: console.log,
	error: console.error,
	critical: console.error
};

const LoggingContext: React.Context<Logger> = React.createContext(defaultLogger);

export const LoggingProvider = LoggingContext.Provider;
export const LoggingConsumer = LoggingContext.Consumer;

export type LoggerInjectedProps = {
	logger: Logger
}

export const withLogger = <Props: LoggerInjectedProps, State>(
	Component: FunctionOrClassComponent<Props, State>
): React.StatelessFunctionalComponent<$Diff<Props, LoggerInjectedProps>> => {
	const WithLogger = (props: $Diff<Props, LoggerInjectedProps>) => (
		<LoggingConsumer>
			{(logger: Logger) => <Component {...props} logger={logger} />}
		</LoggingConsumer>
	);
	return WithLogger;
};