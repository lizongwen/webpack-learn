import lodash from "lodash-es";
// import {isArray} from "lodash-es";
import item from "./sync.css";
import help from "../common/help.js";
console.log("async引用",help.version);
const sync = function(){
	console.log("sync");
	console.log(process.env.ctx);
	document.getElementById("app").innerHTML = `<h1 class="${item.test}">Hello Webpack</h1>`;
	fetch('/api/test').then(resp=>resp.json()).then(data=>{
		console.log("data",data);
	})
}
const isArrayFun = function(args){
    console.log(lodash.isArray(args));
    // console.log(isArray(args));
}
export {
    sync,
    isArrayFun
}