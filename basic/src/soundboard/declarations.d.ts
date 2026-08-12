/**What is a board?*/
declare interface BoardBase{
	/**the name of the folder that it's in*/
	name: string;
	/**the display name on the website*/
	title?: string;
	/**a virtual path (no spaces)*/
	vpath?: string;
}

/**A typical board*/
declare interface Board extends BoardBase {
	/**the actual sound files that are in the folder*/
	sound: string[];
}

/**A group of boards*/
declare interface BoardGroup extends BoardBase {
	/** the logical boards that are subservient to this one*/
	boards: Boardish[];
}

/**this board gets tacked onto another one*/
declare interface BoardAppend extends BoardBase {
	/**whom to append to*/
	target: string;
	/**the sound files that are being appended*/
	appends: string[];
}

/**The Union */
declare type Boardish = Board | BoardGroup | BoardAppend;

/**The actual board object on the page*/
declare var board: Boardish[];

