import { useWindowSize } from '../../hooks';

export const determineBreakPoint = (theme = {}) => {
	const { width: windowWidth } = useWindowSize();
	let breakpointIndex = 1;

	theme.breakpoints.some((breakpoint, idx) => {
		const breakpointInt = parseInt(breakpoint.match(/^[\d]+/));
		if (windowWidth < breakpointInt) breakpointIndex = breakpointIndex + idx;

		return true;
	});

	return breakpointIndex;
};
