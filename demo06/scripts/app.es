require('../style/app');
import $ from 'jquery';
const app = (data) => {
	console.log(data)
}
function dd() {
	var num = 5;
	var str = String(num);
	console.log(str)
}
app("init app", $)