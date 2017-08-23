(function (win, doc, $){
	var unifiedCheckboxElements = {
		root: 'checkbox',
		label: 'label',
		input: 'input[type="checkbox"]',
		form: 'form',
	};

	var unifiedCheckboxStates = {
		ready: '__checkbox--ready',
		focus: '__checkbox--focus',
		checked: '__checkbox--checked',
		disabled: '__checkbox--disabled',
		placeholder: '__checkbox--placeholder'
	};

	window.setUnifiedCheckbox = function()
	{
		var unified_checkbox = $('.' + unifiedCheckboxElements.root).not('.' + unifiedCheckboxStates.ready);

		if(unified_checkbox.length === 0)
		{
			return;
		}

		$(document).trigger({
			'tipi.unified-checkbox.reset': function (event, unified_switch) {
				setUnifiedCheckboxDisabledState(unified_checkbox, data);
				setUnifiedCheckboxCheckedState(unified_checkbox, data);
			},
			'tipi.unified-checkbox.toggle': function (event, unified_checkbox) {
				toggleUnifiedCheckbox(unified_checkbox, data);
			},
			'tipi.unified-checkbox.focus': function (event, unified_checkbox) {
				focusUnifiedCheckbox(unified_checkbox, data);
			},
			'tipi.unified-checkbox.blur': function (event, unified_checkbox) {
				blurUnifiedCheckbox(unified_checkbox, data);
			},
			'tipi.unified-checkbox.change': function (event, unified_checkbox) {
				setUnifiedCheckboxCheckedState(unified_checkbox, data);
			}
		});

		unified_checkbox.each(function() {
			var unified_switch = $(this);
			var unified_switch_control = getUnifiedSwitchElement(unified_switch, 'control', data);
			var input = getUnifiedSwitchElement(unified_switch, 'input', data);

			if (input.length === 0) {
				return;
			}

			unified_switch.on({
				click: function (event) {
					event.preventDefault();

					//Toggle the checked state on the wrapped input
					unified_switch.trigger('tipi.unified-switch.toggle', [$(this)]);
				}
			});

			input.on({
				click: function (event) {
					//Cancels out the click event that is being triggerd by clicking on the corresponding label or controlling the input with the keyboard.
					event.stopImmediatePropagation();
				},
				focus: function (event) {
					event.preventDefault();

					var unified_switch = getUnifiedSwitchElement($(this), 'switch', data);
					if (unified_switch.length === 0) {
						return;
					}

					//Set the focus state while focusing the input
					unified_switch.trigger('tipi.unified-switch.focus', [unified_switch]);
				},
				blur: function (event) {
					event.preventDefault();

					var unified_switch = getUnifiedSwitchElement($(this), 'switch', data);
					if (unified_switch.length === 0) {
						return;
					}

					//Remove the focus state while focusing the input
					unified_switch.trigger('tipi.unified-switch.blur', [unified_switch]);
				},
				change: function (event) {
					var unified_switch = getUnifiedSwitchElement($(this), 'switch', data);
					if (unified_switch.length === 0) {
						return;
					}

					//Toggle the active state on the root container when the input has changed
					unified_switch.trigger('tipi.unified-switch.change', [unified_switch]);
				}
			});

			//Set the corresponding states based on the given attributes on the input
			unified_switch.trigger('tipi.unified-switch.reset', [unified_switch]);

			//Our switch is ready!
			unified_switch.addClass(data.states.ready);
		});
	}

	function toggleUnifiedCheckbox(unified_switch, data) {
		var input = getUnifiedCheckboxElement(unified_switch, 'input', data);

		if (input.length === 0) {
			return;
		}

		if (input.prop(data.attributes.disabled)) {
			return;
		}

		var checked = true;
		if (input.prop(data.attributes.checked)) {
			checked = false;
		}

		input.prop(data.attributes.checked, checked);

		input.trigger('change');
	}

	function setUnifiedCheckboxCheckedState(unified_switch, data) {
		var input = getUnifiedCheckboxElement(unified_switch, 'input', data);

		if (input.length === 0) {
			return;
		}

		if (input.prop(data.attributes.checked)) {
			unified_switch.addClass(data.states.active);
		}
		else {
			unified_switch.removeClass(data.states.active);
		}
	}

	function focusUnifiedCheckbox(unified_switch, data) {
		var input = getUnifiedCheckboxElement(unified_switch, 'input', data);

		if (input.length === 0) {
			return;
		}

		unified_switch.addClass(data.states.focus);
	}

	function blurUnifiedCheckbox(unified_switch, data) {
		var input = getUnifiedCheckboxElement(unified_switch, 'input', data);

		if (input.length === 0) {
			return;
		}

		unified_switch.removeClass(data.states.focus);
	}

	function setUnifiedCheckboxDisabledState(unified_switch, data) {
		var input = getUnifiedCheckboxElement(unified_switch, 'input', data);

		if (input.length === 0) {
			return;
		}

		if (input.prop(data.attributes.disabled)) {
			unified_switch.addClass(data.states.disabled);
		}
		else {
			unified_switch.removeClass(data.states.disabled);
		}
	}

})(window.jQuery(window), window.jQuery(document), window.jQuery);

/*
	Tipi Component - Unified Checkbox

	Created by: ToolbarThomas
	Build: 18.04.16
*/

function setUnifiedCheckbox() {


	if(unifiedCheckbox.length > 0) {
		unifiedCheckbox.each(function() {
			var unifiedCheckboxEach = $(this);
			var unifiedCheckboxLabel = getUnifiedCheckboxElement(unifiedCheckboxEach, 'label', unifiedCheckboxElements);
			var unifiedCheckboxInput = getUnifiedCheckboxElement(unifiedCheckboxEach, 'input', unifiedCheckboxElements);
			var unifiedCheckboxForm = getUnifiedCheckboxElement(unifiedCheckboxEach, 'form', unifiedCheckboxElements);

			if(unifiedCheckboxLabel.length > 0 && unifiedCheckboxInput.length > 0) {

				//Set the disabled state on the .checkbox container.
				if(unifiedCheckboxInput.prop('disabled') === true) {
					unifiedCheckboxEach.addClass(unifiedCheckboxStates.disabled);
				} else {
					unifiedCheckboxEach.removeClass(unifiedCheckboxStates.disabled);
				}

				if(typeof unifiedCheckboxForm != 'undefined') {
					unifiedCheckboxForm.on({
						reset : function() {
							unifiedCheckboxInput.not('[disabled]').prop('checked', false).trigger('change');
						}
					});
				}

				unifiedCheckboxInput.on({
					click : function(event) {
						event.stopImmediatePropagation();
					},
					focus : function(event) {
						var unifiedCheckbox = getUnifiedCheckboxElement($(this), 'root', unifiedCheckboxElements);
						unifiedCheckbox.addClass(unifiedCheckboxStates.focus);
					},
					blur : function(event) {
						var unifiedCheckbox = getUnifiedCheckboxElement($(this), 'root', unifiedCheckboxElements);
						unifiedCheckbox.removeClass(unifiedCheckboxStates.focus);
					},
					change : function(event)  {
						changeUnifiedCheckbox($(this), unifiedCheckboxElements, unifiedCheckboxStates);
					}
				});

				unifiedCheckboxEach.on({
					click : function(event) {
						event.preventDefault();
						event.stopPropagation();

						var unifiedCheckboxInput = getUnifiedCheckboxElement($(this), 'input', unifiedCheckboxElements);

						if(unifiedCheckboxInput.prop('disabled') === false) {
							if(unifiedCheckboxInput.prop('checked')) {
								unifiedCheckboxInput.prop('checked', false);
							}
							else {
								unifiedCheckboxInput.prop('checked', true);
							}

							unifiedCheckboxInput.trigger('change');
						}
					}
				});

				unifiedCheckboxEach.addClass(unifiedCheckboxStates.ready);
				setUnifiedCheckboxAttributes(unifiedCheckboxEach, unifiedCheckboxInput, unifiedCheckboxStates);
			}
		});
	}
}

function setUnifiedCheckboxAttributes(unifiedCheckbox, unifiedCheckboxInput, unifiedCheckboxStates) {
	if(unifiedCheckboxInput.prop('checked') === true) {
		unifiedCheckbox.addClass(unifiedCheckboxStates.checked);
	}
}

function changeUnifiedCheckbox(unifiedCheckboxInput, unifiedCheckboxElements, unifiedCheckboxStates) {
	var unifiedCheckbox = getUnifiedCheckboxElement(unifiedCheckboxInput, 'root', unifiedCheckboxElements);

	if(unifiedCheckboxInput.prop('checked')) {
		unifiedCheckbox.addClass(unifiedCheckboxStates.checked);
	} else {
		unifiedCheckbox.removeClass(unifiedCheckboxStates.checked);
	}

}

function getUnifiedCheckboxElement(origin, unifiedCheckboxType, unifiedCheckboxElements) {
	if(typeof origin != 'undefined' && typeof unifiedCheckboxType != 'undefined') {
		var element;

		switch(unifiedCheckboxType) {
			case 'root':
				element = origin.parents('.' + unifiedCheckboxElements.root).first();
			break;
			case 'roots':
				element = origin.parents('.' + unifiedCheckboxElements.container).first().find('.' + unifiedCheckboxElements.root);
			break;
			case 'label':
				element = origin.find(unifiedCheckboxElements.label).first();
			break;
			case 'input':
				element = origin.find(unifiedCheckboxElements.input).first();
			break;
			case 'form':
				element = origin.parents(unifiedCheckboxElements.form).first();
			break;
			default:
				element = undefined;
		}

		return element;
	}
}