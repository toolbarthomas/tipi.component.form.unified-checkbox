/*
	Tipi Component - Unified Checkbox

	Created by: ToolbarThomas
	Build: 18.04.16
*/

function setUnifiedCheckbox() {
	var unifiedCheckboxElements = {
		root 		: 'checkbox',
		label		: 'label',
		input		: 'input[type="checkbox"]',
		form		: 'form',
	};

	var unifiedCheckboxStates = {
		ready 		: '__checkbox--ready',
		focus 		: '__checkbox--focus',
		checked 	: '__checkbox--checked',
		disabled 	: '__checkbox--disabled',
		placeholder : '__checkbox--placeholder'
	};

	var unifiedCheckbox = $('.' + unifiedCheckboxElements.root).not('.' + unifiedCheckboxStates.ready);
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