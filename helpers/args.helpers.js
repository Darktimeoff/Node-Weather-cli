const isArgName = (arg) => arg?.startsWith('-'); 

export function getArgs(args){
	const [executer,  file, ...rest]  = args;

	const res = rest.reduce((prev, cur, i, arr) => {
		if(!isArgName(cur)) return prev;
	
		if(i == arr.length - 1) prev[cur.slice(1)] = true; 
		else prev[cur.slice(1)] = isArgName(arr[i + 1]) ? true : arr[i + 1];

		return prev;
	}, {});

	return res;
}