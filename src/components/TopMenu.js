import React, { Fragment } from 'react';
import { Div, FlexDiv, P, Box } from '@cbryant24/styled-react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import { useAuth, useRouter } from 'hooks';
import { DAILY_TRIVIA } from 'localState/Queries';
import query from 'queries/Scores';

function TopMenu(props) {
	const { data } = useQuery(DAILY_TRIVIA);
	const { loading: scoresLoading, data: playerScores } = useQuery(query);
	const { user, signout } = useAuth();
	const { pathname } = useRouter();

	if (scoresLoading) return <div></div>;

	function displayUserOptions() {
		if (user) {
			return (
				<Fragment>
					<P
						className="logout-player"
						color="red"
						cursor="pointer"
						onClick={signout}
					>
						Logout
					</P>
					<P className="player-name">{user.name}</P>
				</Fragment>
			);
		}

		return (
			<Box
				id="login-logout"
				isA={Link}
				animation={{
					continuous: {
						from: { color: 'white' },
						to: { color: 'red' },
					},
					duration_continuous: 1,
					animation_direction: 'alternate-reverse',
				}}
				themeStyle="linkNormal"
				to={pathname === '/register' ? '/' : '/register'}
			>
				{`Click Here To ${pathname === '/register' ? 'Login!' : 'Register!'}`}
			</Box>
		);
	}

	return (
		<Div width={[1]} fontSizeModule={[2, 3]}>
			<FlexDiv
				themeStyle="marginTopSmall"
				justifyContent="space-between"
				flexWrap={['wrap-reverse', 'nowrap']}
			>
				<FlexDiv
					flexDirection="column"
					alignItems="center"
					width={[1, 3]}
					textAlign="center"
				>
					<P color="red">Trivia Topic</P>
					<P className="trivia-topic">
						{data ? data.localTrivia.category : ''}
					</P>
				</FlexDiv>
				<FlexDiv themeStyle={['flexColumnCenter']} width={[2, 3]}>
					<P color="red">HI-Score</P>
					<P className="hi-score">
						{!playerScores || !playerScores.scores.length
							? 0
							: `${playerScores.scores[0].score}0,000`}
					</P>
				</FlexDiv>
				<FlexDiv flexDirection="column" alignItems="center" width={[2, 3]}>
					{displayUserOptions()}
				</FlexDiv>
			</FlexDiv>
		</Div>
	);
}

export default TopMenu;
