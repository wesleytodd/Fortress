#Password Meter (fortress)

Formerly at https://github.com/wesleytodd/Form-FX/tree/master/fortress

**Version 1.2.1**

This plugin adds a password strength meter after a password field.  You can customize the look of the meter with css.

##Example
	$('input[type=password]').fortress({
		'strengthMeterWraper'    : false,                     //Wraper object or false if you want the plugin to create it
		'strengthMeterIndicator' : false,                     //Strength indicator object or false if you want the plugin to create it
		'strengthMeterText'      : false,                     //Text wraper of false if you want the plugin to create it
		'textST0'                : 'Password Strength',       //Text to show when field is empty
		'textST1'                : 'Very Weak',               //Text to show on a level 1 password
		'textST2'                : 'Weak',                    //Text to show on a level 2 password
		'textST3'                : 'Average',                 //Text to show on a level 3 password
		'textST4'                : 'Strong',                  //Text to show on a level 4 password
		'textST5'                : 'Very Strong',             //Text to show on a level 5 password
		'regexST1'               : /^.*(?=.{5,}…………………[A-Z\d\W]).*$/,       // Regex of passwords. .I will probably post 
		'regexST2'               : /^.*(.*(?=…………………(?=.{10,}).*).*$/,      // a longer description of how these work somewhere else.
		'regexST3'               : /^.*((?=.{5,})…………………(?=.{15,}).*$/,
		'regexST4'               : /^.*((?=.{7,})…………………[A-Z\d\W])).*$/,
	});

###Version History

1.2.1:  Check existing password value on page load