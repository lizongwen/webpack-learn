//var greeter = require('./Greeter.js');
//document.getElementById('root').appendChild(greeter());

import React from 'react';
import {render} from 'react-dom';
import GreeterComponent from './Greeter';
import mainStyle from './main.css';
import main2 from './main2';
main2.init();
render(<GreeterComponent />, document.getElementById('main'));