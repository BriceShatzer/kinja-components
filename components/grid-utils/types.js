// @flow
export type ScreenName = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge';

export type ScreenConfig = {|
	minWidth?: number,
	maxWidth?: number,
	contentWidth?: number,
	totalColumns: number,
	gutterSize: number
|}

export type GridConfig = {
	[ScreenName]: ScreenConfig
}

export type GridValueExpression = string;
