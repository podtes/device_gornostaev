'use strict';

// mask

(function () {
  [].forEach.call(document.querySelectorAll('input[type=tel]'), function (input) {
    var keyCode;

    var mask = function (event) {
      keyCode = event.keyCode;
      var pos = input.selectionStart;
      if (pos < 3) {
        event.preventDefault();
      }
      var matrix = '+7 (___) ___ ____';
      var i = 0;
      var def = matrix.replace(/\D/g, '');
      var val = input.value.replace(/\D/g, '');
      var newValue = matrix.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
      i = newValue.indexOf('_');
      if (i !== -1) {
        if (i < 5 && (i = 3)) {
          newValue = newValue;
        }
        newValue = newValue.slice(0, i);
      }
      var reg = matrix.substr(0, input.value.length).replace(/_+/g,
          function (a) {
            return '\\d{1,' + a.length + '}';
          }).replace(/[+()]/g, '\\$&');
      reg = new RegExp('^' + reg + '$');
      if (!reg.test(input.value) || input.value.length < 3 || keyCode > 47 && keyCode < 58) {
        input.value = newValue;
      }
      if (event.type === 'blur' && input.value.length < 2) {
        input.value = '';
        input.style.border = '2px solid #e3e3e3';
      }
    };
    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
    input.addEventListener('keydown', mask, false);
  });

})();
