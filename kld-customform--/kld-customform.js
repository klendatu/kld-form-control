/*
 * Kld customForm v1.0
 * https://github.com/klendatu
 *
 * Copyright 2017
 * Free to use under the GPLv3 license.
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 * Author: Klendatu
 */

 
 
+(function($, global){

	"use strict"; 
	 
	// CHECKBOX CLASS DEFINITION
	// ==========================
	var Checkbox = function(el){
		this.$this 		= $(el);
		this.$inputs 	= this.$this.find('input[type="checkbox"]');
		this.className 	= 'kldcf-checkbox';
		this.selector 	= '.' + this.className;
		this.wrapperClassName = this.className + '-wrapper';
			
		if (this.$inputs.length == 0)
			return;	
		
		this.init();
		this.setEvents();
	}

	Checkbox.prototype.init = function(){
		var that = this;
		var $this = this.$this;
		
		this.$inputs.each(function(event){
			var $input 			= $(this);
			var inputClasses 	= $input.attr('class');
			
			$input.wrap('<div></div>');
			var $wrapper = $input.parent();		
			$wrapper.addClass(that.wrapperClassName);
			
			if (inputClasses != undefined)
				$wrapper.addClass(inputClasses);					
			
			// Changement d'état au chargement
			if ( $input.prop('checked') ){
				$wrapper.addClass('on');
			}else{
				$wrapper.removeClass('on');
			}			
		});
	}
		
	Checkbox.prototype.setEvents = function(){
		var that = this;
		var $this = this.$this;
		
		this.$inputs.each(function(event){
			var $input = $(this);
			var $wrapper = $input.parent();		
			
			$wrapper.click(function(event){
				$input.trigger('click');
				event.stopPropagation();	// On empeche de lancer un second click sur LABEL
				return false;				// On empeche de lancer un second click sur LABEL
			});
			
			$input.click(function(event){
				event.stopPropagation();	// On empeche de lancer un second click sur .radioWrapper
				that.checked($(this));
			})
		});
	}

	Checkbox.prototype.checked = function($input){
		var that = this;
		var $this = this.$this;			
		var $wrapper = $input.parent();		
		if ($input.prop('checked')){
			$input.prop('checked', true);
			$input.attr('checked', 'checked');			
			$wrapper.addClass('on');
		}else{
			$input.prop('checked', false);
			$input.removeAttr('checked');			
			$wrapper.removeClass('on');
		}
	}




	// RADIO CLASS DEFINITION
	// ==========================
	var Radio = function(el){
		this.$this 		= $(el);
		this.$inputs 	= this.$this.find('input[type="radio"]');
		this.className 	= 'kldcf-radio';
		this.selector 	= '.' + this.className;
		this.wrapperClassName = this.className + '-wrapper';
		
		if (this.$inputs.length == 0)
			return;	
		
		this.init();
		this.setEvents();
	}

	Radio.prototype.init = function(){
		var that = this;
		var $this = this.$this;
		
		this.$inputs.each(function(event){
			var $input 			= $(this);
			var inputClasses 	= $input.attr('class');
			
			$input.wrap('<div></div>');
			var $wrapper = $input.parent();		
			$wrapper.addClass(that.wrapperClassName);
			
			if (inputClasses != undefined)
				$wrapper.addClass(inputClasses);					
			
			// Changement d'état au chargement
			if ( $input.prop('checked') ){
				$wrapper.addClass('on');
			}else{
				$wrapper.removeClass('on');
			}			
		});
	}
	
	Radio.prototype.setEvents = function(){
		var that = this;
		var $this = this.$this;
		
		this.$inputs.each(function(event){
			var $input = $(this);
			var $wrapper = $input.parent();		
			
			$wrapper.click(function(event){
				$input.trigger('click');
				event.stopPropagation();	// On empeche de lancer un second click sur LABEL
				return false;				// On empeche de lancer un second click sur LABEL
			});
			
			// input
			$input.click(function(event){
				event.stopPropagation();	// On empeche de lancer un second click sur .radioWrapper
				that.checked($(this));
			})
		});
	}

	Radio.prototype.checked = function($input){
		var that = this;
		var $this = this.$this;
		var $wrapper = $input.parent();			
		$this.find('input[type="radio"]').each(function(){
			$(this).prop('checked', false);
			$(this).removeAttr('checked');
			$(this).parent().removeClass('on');
		});			
		$input.prop('checked', true);
		$input.attr('checked', 'checked');			
		$wrapper.addClass('on');
	}



	// FILE CLASS DEFINITION
	// ==========================
	var File = function(el){
		this.$this 		= $(el);
		this.className 	= 'kldcf-file';
		this.selector 	= '.' + this.className;
		this.actionClassName 	= this.className + '-action';
		this.sourceClassName 	= this.className + '-source';
		this.inputClassName 	= this.className + '-input';
		this.init();
		// this.setEvents();
	}

	File.prototype.init = function(){
		var that = this;
		var $this = this.$this;
		
		var inputClasses = $this.attr('class');
		
		$this.wrap('<div class="'+ inputClasses +'"></div>');
		
		$this
			.removeClass(this.className)
			.addClass(this.inputClassName);
		
		this.$wrapper = $this.parent();
		this.$wrapper.append('<span class="'+ this.sourceClassName +'"></span>');
		this.$wrapper.append('<span class="'+ this.actionClassName +'"></span>');		
		
		this.$source = this.$wrapper.find('.' + this.sourceClassName);
		this.$action = this.$wrapper.find('.' + this.actionClassName);
		this.$action.text('+ Ajouter...');
		
		this.setEvents();
	}
	
	File.prototype.setEvents = function(){
		var that = this;
		
		var currentInputFile = $(this);
		
		this.$action.click(function(event){
			that.triggerBox(event);
		});
		
		this.$source.click(function(event){
			that.triggerBox(event);
		});
		
		this.$this.change(function(){
			that.$source.text($(this).val());
		});
	}
	
	File.prototype.triggerBox = function(event){
		this.$this.trigger('click');
		event.stopPropagation();
	}
	
	

	
	
	// SELECT CLASS DEFINITION
	// ==========================
	var Select = function(el){
		this.$node 		= $(el);
		this.className 	= 'kldcf-select';
		this.selector 	= '.' + this.className;
				
		var htmlWrapper =  '<div class="'+ this.className +'">';		
			htmlWrapper += '</div>';
		
		this.$wrapper			= $(htmlWrapper);
		this.$options 			= this.$node.find('option');
		this.$optionSelected 	= this.$node.find(':selected');
		this.nodeClasses 		= this.$node.attr('class');		
		this.init();
	}
	
	Select.prototype.init = function(){
		this.$node.wrap(this.$wrapper);
		this.$wrapper = this.$node.parent();	
		this.$wrapper
			.addClass(this.nodeClasses)
			.css({	
				display: 'inline-block',
				overflow: 'hidden'
			});
			
		this.$node.removeClass()
			.removeAttr('class')
			.removeAttr('style')
			.css({
				'width':'100%',						// jamais <110% 
				'border':'0px solid transparent',
				'background':'rgba(0,0,0,0)',		// 'transparent' fait bugger Chrome et Opera
				'height':'100%',					
				'-webkit-appearance': 'none',		// Pour Chrome
				'appearance': 'none',				
				'cursor':'pointer',
				'color':'inherit',
				'font-family':'inherit',
				'font-size':'inherit',
				'font-style':'inherit',
				'font-weight':'inherit',
				'text-decoration':'inherit'
			});
	}
		
	
	// Dropdown class definition
	// ==========================
	var Dropdown = function($el){
		var _this 			= this;
		this.$node 			= $el;
		this.click 			= 'click';
		this.currentValue 	= null;
		this.className	 	= 'kldcf-dropdown';
		this.selector	 	= '.' + this.className;
		
		this.picto	 			= this.$node.find(this.selector + '-picto');
		this.select	 			= this.$node.find(this.selector + '-select');
		this.options 			= this.select.find('li');
		this.optionsSelected 	= this.select.find('[data-selected]');
		this.window	 			= this.$node.find(this.selector + '-window');
		this.label	 			= this.$node.find(this.selector + '-label');
		this.input	 			= this.$node.find(this.selector + '-input');
		this.document 			= $(document);
		
		this.select.hide();
		
		// Events
		this.setOptionEvent();
		
		if (this.optionsSelected.length > 0)
			this.setSelected();
				
		this.$node.on(this.click, function(event){
			if (!_this.$node.hasClass('isOpen')){
				_this.show();
			}else{
				_this.hide();
			}
			event.stopPropagation();
		});
		
		
		this.document.on(this.click, function(event){
			_this.hide();
		});
		
		return this;
	}
	
	Dropdown.defaults = {};
	
	Dropdown.prototype.setOptionEvent = function(){	
		var _this = this;
		this.options.on(this.click, function(event){
			var item = $(this);
			_this.hide();
			_this.label
				.text(item.text())
				.data('value', item.data('value'));
			_this.currentValue = item.data('value');
			_this.input.attr('value', _this.currentValue);
			_this.document.trigger('kld.dropdown.onchange')
			event.stopPropagation();
		});
	},
	
	Dropdown.prototype.setSelected = function(){
		var item = this.optionsSelected;
		item.trigger('click');
	},
	
	Dropdown.prototype.show = function(){
		this.select.slideDown(200);
		this.$node.addClass('isOpen');
	},

	Dropdown.prototype.hide = function(){
		this.select.slideUp(200);
		this.$node.removeClass('isOpen');	
	},
	
	Dropdown.prototype.refresh = function(){
		this.options = this.select.find('li');
		this.setOptionEvent();
	}

	
	
	function module(selector, options) {
		$(selector).each(function () {
			var $this = $(this);
			$this.data('kld.customform', new ScrollBar($this, options));
		});
	}
	
	global.Kld = global.Kld || {};
	
	global.Kld.customForm = {
	
		radio: function(selector){
			$(selector).each(function () {
				var $this = $(this);
				$this.data('kld.customform.radio', new Radio($this));
			});		
		},
	
		checkbox: function(selector){
			$(selector).each(function () {
				var $this = $(this);
				$this.data('kld.customform.checkbox', new Checkbox($this));
			});		
		},
		
		file: function(selector){
			$(selector).each(function () {
				var $this = $(this);
				$this.data('kld.customform.file', new File($this));
			});		
		},
		
		select: function(selector){
			$(selector).each(function () {
				var $this = $(this);
				$this.data('kld.customform.select', new Select($this));
			});		
		},
	
		dropdown: function(selector){
			$(selector).each(function () {
				var $this = $(this);
				$this.data('kld.customform.dropdown', new Dropdown($this));
			});		
		}
	
	}
	
}(jQuery, window));





