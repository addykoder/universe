import { useEffect } from 'react';

// conditions is an array of booleans which all must be true to enable scroll
export default function useDisableScroll(...conditions: boolean[]) {
	// Scroll disabling mechanism for various variables
	useEffect(() => {
		// allow scroll only when all variables allow
		if (conditions.every(v => v === true)) {
			document.body.classList.remove('overflow-y-hidden');
		}
		// otherwise disable scroll
		else {
			document.body.classList.add('overflow-y-hidden');
		}
	}, [conditions]);
}
