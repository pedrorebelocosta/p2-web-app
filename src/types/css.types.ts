export interface CssClassMap {
	[className: string]: boolean;
}

export type CustomCssClass = string | string[] | CssClassMap;
