export default {
	form: {
		data: {
			name: 'updateGuessForm',
		},
		style: {
			display: 'flex',
			minHeight: ['25em'],
			justifyContent: 'space-between',
			flexDirection: 'column',
			width: [1],
			zIndex: 20,
		},
	},
	inputs: [
		{
			data: {
				type: 'select',
				name: 'player',
				label: 'player',
				initialValue: '',
				required: true,
				inputData: {
					display: 'name',
					value: 'id',
					options: null,
				},
			},
			fieldStyle: {
				width: [1, 2],
				height: [1],
				justifyContent: 'space-between',
				flexDirection: 'column',
			},
			inputStyle: {
				background: 'white',
				color: 'black',
				borderRadius: '1em',
				height: ['5em'],
			},
		},
		{
			data: {
				type: 'password',
				name: 'guess',
				label: 'guess',
				placeholder: 'enter guess A, B, C, D',
				initialValue: '',
				required: true,
			},
			fieldStyle: {
				width: [1, 2],
				height: [1],
				justifyContent: 'space-between',
				flexDirection: 'column',
			},
			inputStyle: {
				themeStyle: 'inputMain',
				height: ['4em'],
			},
		},
	],
	buttons: [
		{
			text: 'Submit',
			type: 'submit',
			cb: null,
			style: {
				themeStyle: 'squareButton',
				mr: [3],
				my: [3]
			},
			disabledStyle: { themeStyle: 'disabledSquareButton', mr: [3] },
		},
		{
			text: 'Cancel',
			type: 'cancel',
			cb: null,
			style: {
				themeStyle: 'squareButton',
				my: [3]
			},
		},
	],
};
