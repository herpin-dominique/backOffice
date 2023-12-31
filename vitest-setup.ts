import '@testing-library/jest-dom';
import 'vitest-dom/extend-expect';
import { isMatch } from 'lodash';
import { expect } from 'vitest';

expect.extend({
	toContainMatchingObject: (array, object) => {
		if (Array.isArray(array) && typeof object === 'object' && object !== null) {
			const pass = array.some((value) => isMatch(value, object));
			return {
				pass,
				message: () => `expected ${array} ${pass ? 'not ' : ''}to be included`
			};
		} else {
			return {
				pass: false,
				message: () => 'received invalid data types'
			};
		}
	}
});
