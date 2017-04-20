"use strict";
import hljs from 'highlightjs'
let exports = module.exports = {};

exports.init = function() {
  let y = document.querySelectorAll("pre code");
  for(let i = 0; i < y.length; i++) {
    y[i].innerHTML = y[i].innerHTML.replace("\n", "");
  }
  $('pre code').each(function(i, e) {
  	hljs.highlightBlock(e);
  	let code = $(this);
  	let lines = code.html().split(/\n/).length;
  	let numbers = [];
  	for (i = 1; i < lines; i++) {
  		numbers += '<span class="line">' + i + '</span>';
  	}
  	code.parent().addClass('codeblock').append('<div class="lines">' + numbers + '</div>');
  });
};