declare interface Board {
	name: string;
	title?:string;
	sound: string[];
}
declare type Boardish = Board | BoardGroup;
declare var board: Boardish[];

declare interface BoardGroup {
	name: string;
	title: string;
	boards: Board[];
}
