// @flow

/**
 * This used to be React.ComponentType until Flow 0.89
 * Accepts any functional or class React component type
 */
export type FunctionOrClassComponent<Props, State> = React.StatelessFunctionalComponent<Props> | Class<React.Component<Props, State>>;