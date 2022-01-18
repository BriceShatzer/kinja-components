import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@babel/polyfill';
import 'raf/polyfill'; // https://reactjs.org/docs/javascript-environment-requirements.html

Enzyme.configure({ adapter: new Adapter() });

window.matchMedia =
	window.matchMedia ||
	function () {
		return {
			matches: false,
			addListener() {},
			removeListener() {}
		};
	};

window.requestAnimationFrame =
  window.requestAnimationFrame ||
	function (callback) {
		setTimeout(callback, 0);
	};

