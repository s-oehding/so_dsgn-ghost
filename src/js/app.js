"use strict";
/*
 import 'font-awesome/css/font-awesome.css'
 import 'font-awesome/css/font-awesome.css'
 load jquery and foundation in the window scope
 */
import 'script!jquery'
import 'script!what-input'
import 'script!foundation-sites'

require('../scss/app.scss');

import NProgress from 'nprogress'
NProgress.configure({
    showSpinner: true
});

// Ajax History.js
import History from './modules/history.js'

History.loadContent();
console.log(`
                                                  _/            _/               
   _/_/_/  _/_/      _/_/    _/_/_/      _/_/    _/    _/_/_/  _/_/_/      _/_/_/
  _/    _/    _/  _/    _/  _/    _/  _/    _/  _/  _/    _/  _/    _/  _/_/     
 _/    _/    _/  _/    _/  _/    _/  _/    _/  _/  _/    _/  _/    _/      _/_/  
_/    _/    _/    _/_/    _/    _/    _/_/    _/    _/_/_/  _/_/_/    _/_/_/     
                                                                                 `);