/*
 * Password Meter (fortress)
 * http://wesleytodd.com/
 *
 * Version 1.2.1
 * 
 * Requires     jQuery > 1.7
 * 
 * Basic Usage:
 * $('form').fortress({
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
		'regexST4'               : /^.*((?=.{7,})…………………[A-Z\d\W])).*$/
	});
 */
(function($){
	$.fortress = function(el, options){
		var base = this;
		base.$el = $(el);
		base.el = el;
		base.$el.data("fortress", base);
		
		base.init = function(){
			base.options = $.extend({},$.fortress.defaultOptions, options);
			
			if(!base.options.strengthMeterText){
				base.options.strengthMeterText = $('<span class="fortress-strength-text">'+base.options.textST0+'</span>');
			}
			if(!base.options.strengthMeterIndicator){
				base.options.strengthMeterIndicator = $('<a class="fortress-strength-indicator"></a>');
			}
			if(!base.options.strengthMeterWraper){
				base.options.strengthMeterWraper = $('<div class="fortress-strength-wraper st-0"></div>');
				base.options.strengthMeterWraper.append(base.options.strengthMeterIndicator).append(base.options.strengthMeterText);
				base.$el.after(base.options.strengthMeterWraper);
			}
			
			base.attacheListener(base.$el);
			base.checkPass(base.$el.val());
		};
		
		base.attacheListener = function($el){
			$el.on({
				'keyup' : function(e){
					if($(this).val() != base.curVal){
						base.curVal = $(this).val();
						base.refresh(base.checkPass($(this).val()));
					}
				},
				'unmaskreplace' : function(e, $newel){
					base.attacheListener($newel);
					base.$el = $newel;
					base.el = $newel.get(0);
				}
			});
		}
		
		base.checkPass = function(pass){
			base.$el.trigger('checkpass', [pass]);
			if(pass.length < 1)
				return 0;
			if(!pass.match(base.options.regexST1))
				return 1;
			if(!pass.match(base.options.regexST2))
				return 2;
			if(!pass.match(base.options.regexST3))
				return 3;
			if(!pass.match(base.options.regexST4))
				return 4;
			return 5;
		}
		
		base.refresh = function(strength){
			base.options.strengthMeterText.html(base.options['textST'+strength]);
			base.options.strengthMeterWraper.removeClass('st-0 st-1 st-2 st-3 st-4 st-5').addClass('st-'+strength);
			base.$el.addClass('st-'+strength);
		}
		
		base.init();
	};
	
	$.fortress.defaultOptions = {
		'strengthMeterWraper'    : false,
		'strengthMeterIndicator' : false,
		'strengthMeterText'      : false,
		'textST0'                : 'Password Strength',
		'textST1'                : 'Very Weak',
		'textST2'                : 'Weak',
		'textST3'                : 'Average',
		'textST4'                : 'Strong',
		'textST5'                : 'Very Strong',
		'regexST1'               : /^.*(?=.{5,})|(?=.{4,})(?=.*[A-Z\d\W]).*$/,
		'regexST2'               : /^.*(.*(?=.{5,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).*|.*(?=.{7,})(?=.*[A-Z\d\W]).*|.*(?=.{10,}).*).*$/,
		'regexST3'               : /^.*((?=.{5,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W])|(?=.{10,})(?=.*[a-z])(?=.*[A-Z\d\W]))|(?=.{15,}).*$/,
		'regexST4'               : /^.*((?=.{7,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W])|(?=.{12,})(?=.*[a-z])(?=.*[A-Z\d\W])).*$/
	};
	
	$.fn.fortress = function(options){
		return this.each(function(){
			(new $.fortress(this, options));
		});
	};
})(jQuery);