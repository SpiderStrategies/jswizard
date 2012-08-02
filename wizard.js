
var CURRENT_PAGE_CLASS = "wizard-current-page";
var WIZARD_FINISH_CLASS = 'wizard-finish';

var WIZARD_PAGE_DISABLED_CLASS = 'wizard-page-disabled';

var WIZARD_PAGE_CLASS = 'wizard-page';
var WIZARD_PAGE_SELECTOR = '.' + WIZARD_PAGE_CLASS;

var WIZARD_PAGE_INVALID_CLASS = 'wizard-page-invalid';

function wizardInit() {
	
	// set the first page to be the current page
	$(WIZARD_PAGE_SELECTOR).first().addClass(CURRENT_PAGE_CLASS);
	
	makeOnlyCurrentPageVisible();
	
	// make sure we can press finish on the last page
	$(WIZARD_PAGE_SELECTOR).last().addClass(WIZARD_FINISH_CLASS);
	
	configureWizardButtons();
	
	// show the major sections
	$('.wizard-content-area').removeClass('hidden');
	$('.wizard-buttons-box').removeClass('hidden');

}

function configureWizardButtons() {
	enableOrDisableButton($('.wizard-back'), isBackPageAvailable());
	enableOrDisableButton($('.wizard-next'), isNextPageAvailable());
	enableOrDisableButton($('.wizard-finish'), canFinishOnThisPage());
}

function wizardAdvance() {
	var markNextAvailablePage = false;
	for(var index = 0; index < $(WIZARD_PAGE_SELECTOR).length; index++){
		
		var loopPage = $(WIZARD_PAGE_SELECTOR).eq(index); 
	    if(loopPage.hasClass(CURRENT_PAGE_CLASS)) {
	    	loopPage.removeClass(CURRENT_PAGE_CLASS);
	    	markNextAvailablePage = true;
	    }
	    else if(markNextAvailablePage) {
	    	if(!isPageDisabled(loopPage)) {
	    		loopPage.addClass(CURRENT_PAGE_CLASS);
	    		break;
	    	}
	    }
	}
	
	makeOnlyCurrentPageVisible();
	configureWizardButtons();
}

function wizardRecede() {
	var markNextAvailablePage = false;
	for(var index = $(WIZARD_PAGE_SELECTOR).length - 1; index >= 0 ; index--){
		
		var loopPage = $(WIZARD_PAGE_SELECTOR).eq(index); 
	    if(loopPage.hasClass(CURRENT_PAGE_CLASS)) {
	    	loopPage.removeClass(CURRENT_PAGE_CLASS);
	    	markNextAvailablePage = true;
	    }
	    else if(markNextAvailablePage) {
	    	if(!isPageDisabled(loopPage)) {
	    		loopPage.addClass(CURRENT_PAGE_CLASS);
	    		break;
	    	}
	    }
	}
	
	makeOnlyCurrentPageVisible();
	configureWizardButtons();
}

function wizardCurrentPageIsInvalid() {
	getCurrentWizardPage().addClass(WIZARD_PAGE_INVALID_CLASS);
	configureWizardButtons();
}

function wizardCurrentPageIsValid() {
	getCurrentWizardPage().removeClass(WIZARD_PAGE_INVALID_CLASS);
	configureWizardButtons();
}

function disableWizardPage(pageId) {
	$('#' + pageId).addClass(WIZARD_PAGE_DISABLED_CLASS);
	configureWizardButtons();
}

function enableWizardPage(pageId) {
	$('#' + pageId).removeClass(WIZARD_PAGE_DISABLED_CLASS);
	configureWizardButtons();
}


function isBackPageAvailable() {
	for(var index = 0; index < $(WIZARD_PAGE_SELECTOR).length; index++){
	    // if we've gotten to the current page without encountering a page which wasn't disabled
		// then there is no back page available
	    if($(WIZARD_PAGE_SELECTOR).eq(index).hasClass(CURRENT_PAGE_CLASS)) {
	    	return false;
	    }
	    
	    // We've got a page which is not disabled which is not the current page, so there is a back page
	    if(! ($(WIZARD_PAGE_SELECTOR).eq(index).hasClass(WIZARD_PAGE_DISABLED_CLASS))) {
	    	return true;
	    }
	}
}

function isNextPageAvailable() {
	if(isPageInvalid(getCurrentWizardPage())) {
		return false;
	}
	
	for(var index = $(WIZARD_PAGE_SELECTOR).length - 1 ; index >= 0 ; index--){
	    // if we've gotten to the current page without encountering a page which wasn't disabled
		// then there is no next page available
	    if($(WIZARD_PAGE_SELECTOR).eq(index).hasClass(CURRENT_PAGE_CLASS)) {
	    	return false;
	    }
	    
	    // We've got a page which is not disabled which is not the current page, so there is a next page
	    if(! ($(WIZARD_PAGE_SELECTOR).eq(index).hasClass(WIZARD_PAGE_DISABLED_CLASS))) {
	    	return true;
	    }
	}
}

function makeOnlyCurrentPageVisible() {
	// hide all of the pages
	hideWizardPages();

	// make first page visible
	makeCurrentWizardPageVisible();
}

function canFinishOnThisPage() {
	var currentPage = getCurrentWizardPage();
	
	if(isPageInvalid(currentPage)) {
		return false;
	}
	
	if(currentPage.hasClass(WIZARD_FINISH_CLASS)) {
		return true;
	}
}

function isPageInvalid(page) {
	return page.hasClass(WIZARD_PAGE_INVALID_CLASS);
}

function isPageDisabled(page) {
	return page.hasClass(WIZARD_PAGE_DISABLED_CLASS);
}

function getCurrentWizardPage() {
	return $('.wizard-current-page');
}

function enableOrDisableButton(button, enabled) {
	if(enabled) {
		enableButton(button);
	}
	else {
		disableButton(button);
	}
}

function enableButton(button) {
	$(button).removeAttr('disabled');
}

function disableButton(button) {
	$(button).attr('disabled', 'disabled');
}
function hideWizardPages() {
	$(WIZARD_PAGE_SELECTOR).addClass("hidden");
}

function makeCurrentWizardPageVisible() {
	$('.wizard-current-page').removeClass("hidden");
}


