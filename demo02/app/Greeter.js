import React, { Component } from 'react';
var config = require('./config.json');
import greeterstyles from './Greeter.css';

//module.exports = function() {
//var greet = document.createElement('div');
//greet.textContent = config.greetText;
//return greet;
//};
class GreeterClass extends Component {
    render() {
        return ( <
            div className = { greeterstyles.conotent } > { config.greetText } <
            /div>
        );
    }
}
export default GreeterClass