interface JasonPrime {
	nextStartWith?: string;
	objects: { name: string }[];
}

/**convert stuff from an Oracle Object Storage bucket into some beep-able strings */
export async function ListObjects2fnames(bucketBoard:BucketBoard) {
	const {bucket, query} = bucketBoard;
	let fnames:string[] = [];

	// try to get the list from the server before asking the bucket
	try {
		const ListObjects_maybe = await fetch(`/page/soundboard/opodes/${bucketBoard.name}/ListObjects.json`);
		fnames = await ListObjects_maybe.json() as string[];
	} catch(e){
		// looks like the server doesnt have the json we want
	}

	// gotta poll the bucket to get all of the files
	if (fnames.length === 0) try {
		const allNames: string[] = [];
		let nextStartWith:string | undefined;
		do {
			const qaram = `${query}${nextStartWith ? `&start=${encodeURIComponent(nextStartWith)}` : ''}`;
			const res = await fetch(bucket + qaram);
			const jason = await res.json() as JasonPrime;
			allNames.push(...(jason.objects.map((obj) => obj.name).filter(n=>n.endsWith('.opus'))));
			nextStartWith = jason.nextStartWith;
		} while (nextStartWith);

		fnames = allNames.sort((a,b)=>a.localeCompare(b,undefined,{sensitivity:'base'}));
	} catch(er){
		console.error(er);
	}

	fnames = fnames.map(n=>`[extern]${bucket}${n}`);
	return fnames;
}

