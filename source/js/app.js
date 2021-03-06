'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var body = document.querySelector('body');
  var callbackOpenButton = document.querySelector('.page-header__callback-button');
  var overlay = document.querySelector('.modal-position');
  var callbackModal = overlay.querySelector('.modal-order-callback');
  var callbackCloseButton = overlay.querySelector('.modal-order-callback__close-button');
  var pageFooterTitles = document.querySelectorAll('.page-footer__title');
  var pageFooterLists = document.querySelectorAll('.page-footer__list');
  var phoneInputAskForm = document.querySelector('#ask-form__phone-input');
  var phoneInputModal = document.querySelector('#modal-phone-input');
  var nameInputModal = document.querySelector('#modal-name-input');

  // логика открытия и закрытия модального окна формы обратной связи
  var openCallbackModal = function () {
    if (callbackModal) {
      overlay.classList.add('modal-open');
      callbackModal.classList.add('modal-open');
      document.addEventListener('keydown', openCallbackModalPressEscHandler);
      overlay.addEventListener('click', overlayClickHandler);
      body.classList.add('fix-body');
      nameInputModal.focus();
    }
  };
  var closeCallbackModal = function () {
    if (callbackModal) {
      overlay.classList.remove('modal-open');
      callbackModal.classList.remove('modal-open');
      document.removeEventListener('keydown', openCallbackModalPressEscHandler);
      overlay.removeEventListener('click', overlayClickHandler);
      body.classList.remove('fix-body');
    }
  };
  var openCallbackModalPressEscHandler = function (evt) {
    if (callbackModal) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeCallbackModal();
      }
    }
  };
  var callbackOpenButtonClickHandler = function () {
    if (callbackModal) {
      openCallbackModal();
    }
  };
  var callbackOpenButtonPressEnterHandler = function (evt) {
    if (callbackModal) {
      if (evt.keyCode === ENTER_KEYCODE) {
        openCallbackModal();
      }
    }
  };
  var callbackCloseButtonClickHandler = function () {
    if (callbackModal) {
      closeCallbackModal();
    }
  };
  var callbackCloseButtonPressEnterHandler = function (evt) {
    if (callbackModal) {
      if (evt.keyCode === ENTER_KEYCODE) {
        closeCallbackModal();
      }
    }
  };
  var overlayClickHandler = function (evt) {
    if (overlay) {
      if (callbackModal.classList.contains('modal-open') && evt.target === overlay) {
        closeCallbackModal();
      }
    }
  };

  var getWindowWidth = function () {
    return window.innerWidth || document.body.clientWidth;
  };

  // аккордеон в футере
  var removeFooterTitlesAndListsActiveClass = function () {
    if (pageFooterTitles && pageFooterLists) {
      for (var i = 0; i < pageFooterTitles.length; i++) {
        if (pageFooterTitles[i].classList.contains('page-footer__title--active')) {
          pageFooterTitles[i].classList.remove('page-footer__title--active');
        }
      }
      for (var j = 0; j < pageFooterLists.length; j++) {
        if (pageFooterLists[j].classList.contains('page-footer__list--active')) {
          pageFooterLists[j].classList.remove('page-footer__list--active');
        }
      }
    }
  };
  var footerTitlesClickHandler = function (evt) {
    if (pageFooterTitles) {
      if (evt.currentTarget.classList.contains('page-footer__title--active')) {
        removeFooterTitlesAndListsActiveClass();
      } else {
        removeFooterTitlesAndListsActiveClass();
        evt.currentTarget.classList.add('page-footer__title--active');
        evt.currentTarget.nextElementSibling.classList.add('page-footer__list--active');
      }
    }
  };
  var footerTitlesPressEnterHandler = function (evt) {
    if (pageFooterTitles) {
      if (evt.keyCode === ENTER_KEYCODE) {
        if (evt.currentTarget.classList.contains('page-footer__title--active')) {
          removeFooterTitlesAndListsActiveClass();
        } else {
          removeFooterTitlesAndListsActiveClass();
          evt.currentTarget.classList.add('page-footer__title--active');
          evt.currentTarget.nextElementSibling.classList.add('page-footer__list--active');
        }
      }
    }
  };
  var switchFooterTitlesAndLists = function () {
    if (getWindowWidth() < 768) {
      if (pageFooterTitles) {
        for (var i = 0; i < pageFooterTitles.length; i++) {
          pageFooterTitles[i].addEventListener('click', footerTitlesClickHandler);
          pageFooterTitles[i].addEventListener('keydown', footerTitlesPressEnterHandler);
        }
      }
    }
  };

  // валидация полей ввода
  var validatePhoneInputHandler = function (field) {
    if (field) {
      if (field.value.length > 4 && field.value.length < 17) {
        field.setCustomValidity('Неверный формат!');
      } else if (field.value.length <= 3 && field.value.length >= 1) {
        field.setCustomValidity('Введите номер телефона!');
      } else {
        field.setCustomValidity('');
      }
    }
  };

  // валидация инпута в модальном окне
  phoneInputModal.addEventListener('change', function () {
    validatePhoneInputHandler(phoneInputModal);
  });
  phoneInputModal.addEventListener('focus', function () {
    validatePhoneInputHandler(phoneInputModal);
  });
  phoneInputModal.addEventListener('blur', function () {
    validatePhoneInputHandler(phoneInputModal);
  });

  // валидация инпута в секции c формой
  phoneInputAskForm.addEventListener('change', function () {
    validatePhoneInputHandler(phoneInputAskForm);
  });
  phoneInputAskForm.addEventListener('focus', function () {
    validatePhoneInputHandler(phoneInputAskForm);
  });
  phoneInputAskForm.addEventListener('blur', function () {
    validatePhoneInputHandler(phoneInputAskForm);
  });

  callbackOpenButton.addEventListener('click', callbackOpenButtonClickHandler);
  callbackCloseButton.addEventListener('click', callbackCloseButtonClickHandler);
  callbackOpenButton.addEventListener('keydown', callbackOpenButtonPressEnterHandler);
  callbackCloseButton.addEventListener('keydown', callbackCloseButtonPressEnterHandler);

  switchFooterTitlesAndLists();

})();
