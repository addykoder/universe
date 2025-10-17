'use client';

import { useEffect, useState } from 'react';
import useMediaQuery from './useMediaQuery';

export default function useBreakpoint() {
	const [mobile, setMobile] = useState(false);
	const [tab, setTab] = useState(false);
	const [desktop, setDesktop] = useState(false);

	const isMax500 = useMediaQuery('(max-width:400px');
	const isMin500 = useMediaQuery('(min-width:400px');
	const isMin1200 = useMediaQuery('(min-width:1200px');
	const isMax1200 = useMediaQuery('(max-width:1200px');

	useEffect(() => {
		setMobile(isMax500);
		setDesktop(isMin1200);
		setTab(isMax1200 && isMin500);
	}, [isMax500, isMin500, isMax1200, isMin1200, mobile, desktop, tab])

	return [mobile, tab, desktop];
}
