interface JasonPrime {
	nextStartWith?: string;
	objects: { name: string }[];
}

/**convert stuff from an Oracle Object Storage bucket into some beep-able strings */
export async function ListObjects2fnames(bucketBoard:BucketBoard) {
	const {bucket, query} = bucketBoard;
	let fnames:string[] = [];
	try{
		const allNames: string[] = [];
		let nextStartWith:string | undefined;
		do{
			const qaram = `${query}${nextStartWith ? `&start=${encodeURIComponent(nextStartWith)}` : ''}`;
			const res = await fetch(bucket + qaram);
			const jason = await res.json() as JasonPrime;
			allNames.push(...(jason.objects.map((obj) => obj.name).filter(n=>n.endsWith('.opus'))));
			nextStartWith = jason.nextStartWith;
		} while (nextStartWith);

		fnames = allNames.sort((a,b)=>a.localeCompare(b,undefined,{sensitivity:'base'})).map(n=>`[extern]${bucket}${n}`);
	} catch(er){
		console.error(er);
	}
	return fnames;
}

