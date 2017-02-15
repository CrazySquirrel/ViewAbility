(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ViewAbility", [], factory);
	else if(typeof exports === 'object')
		exports["ViewAbility"] = factory();
	else
		root["ViewAbility"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _AnimationFrame = __webpack_require__(6);
	
	var _AnimationFrame2 = _interopRequireDefault(_AnimationFrame);
	
	var _Utils = __webpack_require__(7);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @class
	 *
	 * @name Viewability
	 *
	 * @summary Класс для оценки показа баннеров
	 *
	 * @description Класс принимает ID или DOM элемент и запускает watcher который проверяет видимость элемента
	 * как такового, что он или его родители не скрыты, что он есть в документе и т.д. Затем, для видимых элементов,
	 * рассчитывается процент видимой области от 0 до 1. Если процент видимой области больше percentage из objSetting,
	 * тогда запускается отсчет таймера.
	 * Если процент видимой области стал меньше порогового значения, то таймер отключается. Как только таймер превышает по
	 * времени time из objSetting вызывается funCallBack и watcher убивается.
	 *
	 * Если в класс передан ID, а не DOM элемент, то класс сам пытается найти такой элемент в DOM. Если элемента нет, то
	 * вешается watcher, который пытается найти элемент спустя какое-то время. Это позволяет повесить watcher для элементов,
	 * которых еще нет в DOM и которые появятся потом.
	 *
	 * Если в класс передан DOM элемент, то в параметры записывается или его ID или сгенерированный ID для дальнейшей
	 * обработки.
	 * ID также передается в funCallBack.
	 *
	 * @param domElement {Object} - Элемент DOM или ID
	 * @param objSetting {Object} - Объект с параметрами отслеживания вида
	 * {
	 *  percentage: 0.5, - Процент видимой части баннера, при которой он будет засчитан (от 0 до 1)
	 *  time: 1000 - Время в течении которого должна быть видна видимая часть баннера (в миллисекундах от 0 до 60 000)
	 * }
	 * @param funCallBack {Function} - Функция Callback, которая вызывается после того как пользователь увидел определенную
	 * часть банера определенное время
	 */
	var ViewAbility = function () {
	  /**
	   * Init
	   * @param domElement
	   * @param objSetting
	   * @param funCallBack
	   */
	  function ViewAbility(domElement, objSetting) {
	    var funCallBack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};
	
	    _classCallCheck(this, ViewAbility);
	
	    /**
	     * Если передан DOM элемент
	     */
	    if (domElement && (typeof domElement === "undefined" ? "undefined" : _typeof(domElement)) === "object" && domElement.nodeType === 1 && domElement.parentElement && domElement.parentElement.nodeName !== "HTML") {
	      domElement.id = this.ID = domElement.id || ViewAbility.getID();
	    } else if (domElement && typeof domElement === "string" && domElement.length > 0) {
	      this.ID = domElement.toString();
	      domElement = document.getElementById("" + this.ID);
	    } else {
	      domElement = null;
	    }
	    /**
	     * Если вторым параметром переданы не параметры
	     */
	    if (!objSetting || (typeof objSetting === "undefined" ? "undefined" : _typeof(objSetting)) !== "object") {
	      objSetting = {
	        percentage: 0.5,
	        time: 1000
	      };
	    } else {
	      /**
	       * Парсим процент видемой части и присваиваем значение по умолчанию, если передано
	       * не валидное значение
	       * @type {Number}
	       */
	      if (objSetting.percentage) {
	        objSetting.percentage = parseFloat(objSetting.percentage);
	        if (objSetting.percentage) {
	          objSetting.percentage = objSetting.percentage < 0 ? 0 : objSetting.percentage;
	          objSetting.percentage = objSetting.percentage > 1 ? 1 : objSetting.percentage;
	        } else {
	          objSetting.percentage = 0.5;
	        }
	      } else {
	        objSetting.percentage = 0.5;
	      }
	      /**
	       * Парсим время видимости и присваиваем значение по умолчанию, если передано не валидное значение
	       * @type {Number}
	       */
	      if (objSetting.time) {
	        objSetting.time = parseInt(objSetting.time, 10);
	        if (objSetting.time) {
	          objSetting.time = objSetting.time < 0 ? 0 : objSetting.time;
	          objSetting.time = objSetting.time > 60000 ? 60000 : objSetting.time;
	        } else {
	          objSetting.time = 1000;
	        }
	      } else {
	        objSetting.time = 1000;
	      }
	    }
	    /**
	     * Проверяем, что в качестве колбека передана функция
	     */
	    if (!funCallBack || typeof funCallBack !== "function") {
	      funCallBack = function funCallBack(ID) {};
	    }
	    /**
	     * Если DOM элемент передан или найден
	     */
	    if ((domElement || typeof this.ID === "string") && (typeof objSetting === "undefined" ? "undefined" : _typeof(objSetting)) === "object" && typeof objSetting.percentage === "number" && typeof objSetting.time === "number" && typeof funCallBack === "function") {
	      /**
	       * Подписки на события окна
	       */
	      if (window.addEventListener) {
	        window.addEventListener("resize", ViewAbility.resizeEvent);
	        window.addEventListener("orientationchange", ViewAbility.resizeEvent);
	      } else if (window.attachEvent) {
	        window.attachEvent("onresize", ViewAbility.resizeEvent);
	      }
	      /**
	       * Хак для ручного сброса ресайзного кеша раз в секкунду, на всякий случай
	       */
	      setInterval(function () {
	        ViewAbility.resizeEvent();
	      }, 1000);
	      /**
	       * Ручной снос кеша для переинициализации переменных кеша
	       */
	      ViewAbility.resizeEvent();
	      /**
	       * Задаем параметры и начинаем отслеживать
	       */
	      this.domElement = domElement;
	      this.objSetting = objSetting;
	      this.funCallBack = funCallBack;
	      this.booTimerFlag = false;
	      this.watchID = _AnimationFrame2.default.subscribe(this, this.watch, []);
	      _Utils2.default.implementationStaticMethods(this, "ViewAbility");
	    }
	  }
	  /**
	   * Событие ресайза для сброса временных кешев размеров окна, документа и высчитанных стилей элементов
	   */
	
	
	  ViewAbility.resizeEvent = function resizeEvent() {
	    ViewAbility.numDocumentWidth = false;
	    ViewAbility.numDocumentHeight = false;
	    ViewAbility.numWindowWidth = false;
	    ViewAbility.numWindowHeight = false;
	    ViewAbility.arrDomStyle = [];
	  };
	
	  /**
	   * Метод для генерации UID
	   * @returns {string}
	   */
	  ViewAbility.getID = function getID() {
	    return "v_" + Date.now() + "_" + ~~(Math.random() * 1e6);
	  };
	
	  /**
	   * Расчет стилей элемента
	   * @param domNode
	   * @returns {CSSStyleDeclaration}
	   */
	  ViewAbility.getComputedStyle = function getComputedStyle(domNode) {
	    if (!domNode.viewability || !ViewAbility.arrDomStyle[domNode.viewability]) {
	      if (!domNode.viewability) {
	        domNode.viewability = this.getID();
	      }
	      ViewAbility.arrDomStyle[domNode.viewability] = window.getComputedStyle(domNode);
	    }
	    return ViewAbility.arrDomStyle[domNode.viewability];
	  };
	
	  /**
	   * Определение высоты окна
	   *
	   * @returns {number} - Высота окна
	   */
	  ViewAbility.getWindowHeight = function getWindowHeight() {
	    if (!ViewAbility.numWindowHeight) {
	      ViewAbility.numWindowHeight = _Utils2.default.Window.getHeight();
	    }
	    return ViewAbility.numWindowHeight || 0;
	  };
	
	  /**
	   * Определение высоты документа
	   *
	   * @returns {number} - Высота документа
	   */
	  ViewAbility.getDocumentHeight = function getDocumentHeight() {
	    if (!ViewAbility.numDocumentHeight) {
	      ViewAbility.numDocumentHeight = _Utils2.default.Document.getHeight();
	    }
	    return ViewAbility.numDocumentHeight || 0;
	  };
	
	  /**
	   * Определение ширины окна
	   *
	   * @returns {number} - Ширина окна
	   */
	  ViewAbility.getWindowWidth = function getWindowWidth() {
	    if (!ViewAbility.numWindowWidth) {
	      ViewAbility.numWindowWidth = _Utils2.default.Window.getWidth();
	    }
	    return ViewAbility.numWindowWidth || 0;
	  };
	
	  /**
	   * Определение ширины документа
	   *
	   * @returns {number} - Ширина документа
	   */
	  ViewAbility.getDocumentWidth = function getDocumentWidth() {
	    if (!ViewAbility.numDocumentWidth) {
	      ViewAbility.numDocumentWidth = _Utils2.default.Document.getWidth();
	    }
	    return ViewAbility.numDocumentWidth || 0;
	  };
	
	  /**
	   * Определение положени и размеров элемента
	   *
	   * @param domNode {Object} - DOM элемент
	   * @returns {{left: number, right: number, top: number, bottom: number, width: number, height: number}} -
	   * Массив с параметрами размеров и положения
	   */
	  ViewAbility.getBoundingClientRect = function getBoundingClientRect(domNode) {
	    return _Utils2.default.DOM.getBoundingClientRect(domNode);
	  };
	
	  /**
	   * Метод для определения процента видимой части баннера на экране пользователя
	   *
	   * @param objSizes {{left: number, right: number, top: number, bottom: number, width: number, height: number}} -
	   * Массив с параметрами размеров и положения
	   * @returns {number} - Коэффициент видимости элемента от 0 до 1
	   */
	  ViewAbility.calcVisibility = function calcVisibility(objSizes) {
	    /**
	     * Определяем высоту окна
	     * @type {number}
	     */
	    var _numWindowHeight = ViewAbility.getWindowHeight();
	    var numWindowHeight = typeof _numWindowHeight === "number" ? _numWindowHeight : 0;
	    /**
	     * Определяем верхнюю и нижнюю видимые границы элемента
	     */
	    var numElementScrollTopFrom = objSizes.top < 0 ? 0 : objSizes.top;
	    var numElementScrollTopTo = objSizes.bottom > numWindowHeight ? numWindowHeight : objSizes.bottom;
	    /**
	     * Определяем видимую и максимально возможную видимую области элемента по высоте
	     * @type {number}
	     */
	    var numElementViewHeight = numElementScrollTopTo - numElementScrollTopFrom;
	    var numElementMaxViewHeight = objSizes.height < numWindowHeight ? objSizes.height : numWindowHeight;
	    /**
	     * Вычисляем процент видимой части по высоте
	     * @type {number}
	     */
	    var numElementViewHeightPath = numElementViewHeight / numElementMaxViewHeight;
	    /**
	     * Обрезаем значение видимости в диапазоне от 0 до 1
	     * @type {number}
	     */
	    numElementViewHeightPath = numElementViewHeightPath < 0 ? 0 : numElementViewHeightPath;
	    numElementViewHeightPath = numElementViewHeightPath > 1 ? 1 : numElementViewHeightPath;
	    /**
	     * Определяем ширину окна
	     * @type {number}
	     */
	    var _numWindowWidth = ViewAbility.getWindowWidth();
	    var numWindowWidth = typeof _numWindowWidth === "number" ? _numWindowWidth : 0;
	    /**
	     * Определяем левую и правую видимые границы элемента
	     */
	    var numElementScrollLeftFrom = objSizes.left < 0 ? 0 : objSizes.left;
	    var numElementScrollLeftTo = objSizes.right > numWindowWidth ? numWindowWidth : objSizes.right;
	    /**
	     * Определяем видимую и максимально возможную видимую области элемента по ширине
	     * @type {number}
	     */
	    var numElementViewWidth = numElementScrollLeftTo - numElementScrollLeftFrom;
	    var numElementMaxViewWidth = objSizes.width < numWindowWidth ? objSizes.width : numWindowWidth;
	    /**
	     * Вычисляем процент видимой части по ширине
	     * @type {number}
	     */
	    var numElementViewWidthPath = numElementViewWidth / numElementMaxViewWidth;
	    /**
	     * Обрезаем значение видимости в диапазоне от 0 до 1
	     * @type {number}
	     */
	    numElementViewWidthPath = numElementViewWidthPath < 0 ? 0 : numElementViewWidthPath;
	    numElementViewWidthPath = numElementViewWidthPath > 1 ? 1 : numElementViewWidthPath;
	    /**
	     * Вычисляем процент видимой пощади
	     * @type {number}
	     */
	    var numElementViewPath = numElementViewHeightPath * numElementViewWidthPath;
	    /**
	     * Обрезаем значение видимости в диапазоне от 0 до 1
	     * @type {number}
	     */
	    numElementViewPath = numElementViewPath < 0 ? 0 : numElementViewPath;
	    numElementViewPath = numElementViewPath > 1 ? 1 : numElementViewPath;
	    /**
	     * Возвращаем процент видимой площади в диапазоне от 0 до 1
	     */
	    return numElementViewPath;
	  };
	
	  /**
	   * * Определение видимости элемента вообще
	   *
	   * @param domNode {Object} - Элемент DOM дерева
	   * @param booElement {boolean} - Если это сам баннер, а не родитель
	   * @param numDocumentWidth - Ширина документа
	   * @param numDocumentHeight - Высота документа
	   * @returns {boolean} - Флаг видимости элемента
	   */
	  ViewAbility.isVisible = function isVisible(domNode, booElement, numDocumentWidth, numDocumentHeight) {
	    /**
	     * TODO: не учитывать родителей если position fixed
	     */
	    /**
	     * Устанавливаем флаг видимости и вычисляем размеры элемента
	     * @type {boolean}
	     */
	    var booVisible = true;
	    var objSizes = ViewAbility.getBoundingClientRect(domNode);
	    /**
	     * Если у элемента нет ширины или высоты то он или скрыт или у него нет размеров
	     */
	    if (!(objSizes.width && objSizes.height) && (booElement || domNode.style.overflow !== "")) {
	      booVisible = false;
	    } else if (booElement && (objSizes.bottom < 0 || objSizes.right < 0 || objSizes.left > numDocumentWidth || objSizes.top > numDocumentHeight)) {
	      booVisible = false;
	    } else if (!!window.getComputedStyle) {
	      /**
	       * Вычисляем стили элемента
	       * @type {CSSStyleDeclaration}
	       */
	      var objStyle = ViewAbility.getComputedStyle(domNode);
	      /**
	       * Если элемент имеет нулевую прозрачность или скрыт или не имеет отображения
	       */
	      if (objStyle.opacity === "0" || objStyle.display === "none" || objStyle.visibility === "hidden") {
	        booVisible = false;
	      }
	    }
	    /**
	     * Возвращаем флаг видимости
	     */
	    return booVisible;
	  };
	
	  /**
	   * Метод определения видимости баннера вообще
	   *
	   * @param domBanner {Object} - Элемент DOM дерева
	   * @returns {number} - Коэффициент видимости элемента от 0 до 1
	   */
	  ViewAbility.checkTotalVisibility = function checkTotalVisibility(domBanner) {
	    /**
	     * Устанавливаем флаг видимости элемента
	     * Записываем элемент во временную переменную дял перебора по родителям
	     * Устанавливаем флаг соответствия элемента исходному
	     * @type {boolean}
	     */
	    var booVisible = true;
	    var domNode = domBanner;
	    var booElement = true;
	    var _numDocumentWidth = ViewAbility.getDocumentWidth();
	    var numDocumentWidth = typeof _numDocumentWidth === "number" ? _numDocumentWidth : 0;
	    var _numDocumentHeight = ViewAbility.getDocumentHeight();
	    var numDocumentHeight = typeof _numDocumentHeight === "number" ? _numDocumentHeight : 0;
	    /**
	     * Перебираем от элемента до родителей, пока текущей элемент не равен body
	     */
	    while (domNode && domNode !== document.body) {
	      /**
	       * Если элемент не виден, то устанавливаем флаг и выходим из перебора
	       */
	      if (!ViewAbility.isVisible(domNode, booElement, numDocumentWidth, numDocumentHeight)) {
	        booVisible = false;
	        break;
	      }
	      if (domNode.style.position === "fixed") {
	        break;
	      }
	      /**
	       * Записываем во временную переменную родительский элемент
	       * @type {domElement}
	       */
	      domNode = domNode.parentNode;
	      /**
	       * Сбрасываем флаг принадлежности к исходному элементу
	       * @type {boolean}
	       */
	      booElement = false;
	    }
	    /**
	     * Объевляем переменную для определения процента видимости элемента
	     * @type {number}
	     */
	    var numVisibility = 0;
	    /**
	     * Если элемент вообще виден, то высчитываем процент его видимости, если нет, то видимость нулевая
	     */
	    if (booVisible) {
	      /**
	       * Вычисляем стили элемента
	       * @type {number}
	       */
	      var opacity = 1;
	      if (!!window.getComputedStyle) {
	        var objStyle = ViewAbility.getComputedStyle(domBanner);
	        opacity = objStyle.opacity;
	      }
	      /**
	       * Рассчитываем процент видимости элемента
	       * @type {number}
	       */
	      numVisibility = opacity;
	    }
	    /**
	     * Возвращаем процент видимости
	     */
	    return numVisibility;
	  };
	
	  /**
	   * Метод определения видимости баннера
	   *
	   * @param domBanner {Object} - Элемент DOM дерева
	   * @returns {number} - Коэффициент видимости элемента от 0 до 1
	   */
	  ViewAbility.checkVisibility = function checkVisibility(domBanner) {
	    var numVisibility = ViewAbility.checkTotalVisibility(domBanner);
	    if (numVisibility) {
	      /**
	       * Определяем положение и размеры элемента
	       * @type {Object}
	       */
	      var objSizes = ViewAbility.getBoundingClientRect(domBanner);
	      /**
	       * Рассчитываем процент видимости элемента
	       * @type {number}
	       */
	      numVisibility = ViewAbility.calcVisibility(objSizes) * numVisibility;
	    }
	    /**
	     * Возвращаем процент видимости
	     */
	    return numVisibility;
	  };
	
	  /**
	   * Watcher
	   */
	  ViewAbility.prototype.watch = function watch() {
	    if (this.domElement && _typeof(this.domElement) === "object") {
	      if (this.domElement.parentNode) {
	        /**
	         * Определение видимости баннера
	         */
	        var numVisibility = ViewAbility.checkVisibility(this.domElement);
	        /**
	         * Если видимость больше требуемой
	         */
	        if (numVisibility > this.objSetting.percentage) {
	          /**
	           * Если флаг отсчета был выключен, то сбрасываем таймер
	           */
	          if (this.booTimerFlag === false) {
	            this.numTimerFrom = Date.now();
	          }
	          this.booTimerFlag = true;
	        } else {
	          if (this.booTimerFlag === true) {}
	          this.booTimerFlag = false;
	        }
	        /**
	         * Флаг вызова callback
	         * @type {boolean}
	         */
	        var booCallCallback = false;
	        /**
	         * Если установлен флаг отсчета
	         */
	        if (this.booTimerFlag === true) {
	          /**
	           * Если прошло больше времени, чем предполагалось
	           */
	          if (Date.now() - this.numTimerFrom > this.objSetting.time) {
	            booCallCallback = true;
	          }
	        }
	        /**
	         * Если банер был виден достаточно долго, то вызываем callback, иначе продолжаем смотреть
	         */
	        if (booCallCallback) {
	          _AnimationFrame2.default.unsubscribe(this.watchID);
	          this.funCallBack(this.ID);
	        }
	      } else {
	        _AnimationFrame2.default.unsubscribe(this.watchID);
	      }
	    } else if (this.ID) {
	      this.domElement = document.getElementById(this.ID);
	    }
	  };
	
	  return ViewAbility;
	}();
	/**
	 * Export ViewAbility
	 */
	
	
	exports.default = ViewAbility;
	module.exports = ViewAbility;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var root = void 0;
	if (typeof window === "undefined") {
	    if (typeof global !== "undefined") {
	        root = global;
	    } else {
	        root = {};
	    }
	} else {
	    root = window;
	}
	/**
	 * requestAnimationFrame polyfill
	 */
	root.requestAnimationFrame = function () {
	    return typeof root !== "undefined" && (root.requestAnimationFrame || root.webkitRequestAnimationFrame || root.mozRequestAnimationFrame || root.oRequestAnimationFrame || root.msRequestAnimationFrame) || function (callback) {
	        root.setTimeout(callback, 1000 / 60);
	    };
	}();
	/**
	 * Bind polyfill
	 */
	function bind(b) {
	    /**
	     * If try bind variable that not a function, then throw error
	     */
	    if (typeof this !== "function") {
	        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
	    }
	    /**
	     * let Array slice function
	     */
	    var a = Array.prototype.slice;
	    var f = a.call(arguments, 1);
	    var e = this;
	    function c() {
	        /*
	         if (
	         typeof root !== "undefined" &&
	         typeof root.console === "object" &&
	         typeof root.console.log === "function"
	         ) {
	         root.console.log("Bind polyfill");
	         }
	         */
	    }
	    function d() {
	        return e.apply(this instanceof c ? this : b || root, f.concat(a.call(arguments)));
	    }
	    /**
	     * Registered this prototype as prototype to bind implementation functions
	     */
	    c.prototype = this.prototype;
	    d.prototype = new c();
	    /**
	     * Return bind polyfill
	     */
	    return d;
	}
	Function.prototype.bind = Function.prototype.bind || bind;
	/**
	 * Object.keys polyfill
	 */
	function keys() {
	    var hasDoNotEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
	    var doNotEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];
	    var doNotEnumsLength = doNotEnums.length;
	    return function (obj) {
	        if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object" && (typeof obj !== "function" || obj === null)) {
	            throw new TypeError("Object.keys called on non-object");
	        }
	        var result = [];
	        for (var prop in obj) {
	            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	                result.push(prop);
	            }
	        }
	        if (hasDoNotEnumBug) {
	            for (var i = 0; i < doNotEnumsLength; i++) {
	                if (Object.prototype.hasOwnProperty.call(obj, doNotEnums[i])) {
	                    result.push(doNotEnums[i]);
	                }
	            }
	        }
	        return result;
	    };
	}
	Object.keys = Object.keys || keys();
	/**
	 * Request animation frame call stack class
	 */
	
	var AnimationFrame = function () {
	    /**
	     * Create request animation frame
	     */
	    function AnimationFrame() {
	        _classCallCheck(this, AnimationFrame);
	
	        /**
	         * Subscribed methods
	         */
	        this.stack = {};
	        /**
	         * Start requestAnimationFrame watcher
	         */
	        this.watch();
	    }
	    /**
	     * Subscribe method to watch
	     * @param context
	     * @param callback
	     * @param params
	     * @param ID
	     * @return {boolean|string}
	     */
	
	
	    AnimationFrame.prototype.subscribe = function subscribe() {
	        var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : root;
	        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
	            return null;
	        };
	        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
	        var ID = arguments[3];
	
	        /**
	         * If context and callback passed and they are object and function
	         */
	        if ((typeof context === "undefined" ? "undefined" : _typeof(context)) === "object" && typeof callback === "function" && (typeof params === "undefined" ? "undefined" : _typeof(params)) === "object" && Array.isArray(params) && (ID === undefined || typeof ID === "string")) {
	            /**
	             * Create UID
	             */
	            var d = new Date();
	            var localID = ID || "x-" + d.getTime() + "-" + Math.round(Math.random() * 1e6);
	            /**
	             * Add method to the stack
	             */
	            this.stack[localID] = {
	                context: context,
	                callback: callback,
	                params: params
	            };
	            /**
	             * Write to console count of the subscribed methods
	             */
	            /**
	             * Return UID
	             */
	            return localID;
	        } else {
	            return false;
	        }
	    };
	    /**
	     * Unsubscribe method by ID
	     * @param ID
	     */
	
	
	    AnimationFrame.prototype.unsubscribe = function unsubscribe(ID) {
	        if (typeof ID === "string") {
	            /**
	             * If required method exist in the stack
	             */
	            if (this.stack[ID]) {
	                /**
	                 * Nullify method in the stack and destroy it
	                 */
	                this.stack[ID] = false;
	                delete this.stack[ID];
	            }
	        }
	    };
	    /**
	     * Watch and call methods
	     */
	
	
	    AnimationFrame.prototype.watch = function watch() {
	        try {
	            /**
	             * If stack exist, it is an object and it is contains methods
	             */
	            if (this.stack && _typeof(this.stack) === "object" && Object.keys(this.stack).length > 0) {
	                /**
	                 * Loop all methods in stack
	                 */
	                for (var ID in this.stack) {
	                    /**
	                     * Process only methods without extended properties
	                     */
	                    if (this.stack.hasOwnProperty(ID)) {
	                        try {
	                            /**
	                             * If ID exist and it is a string
	                             */
	                            if (ID && typeof ID === "string") {
	                                /**
	                                 * Get subscribed method params by ID
	                                 */
	                                var objCall = this.stack[ID];
	                                /**
	                                 * If params exist, it is an object, and it is contains call context,
	                                 * callback, and parameters which is array
	                                 */
	                                if (objCall && (typeof objCall === "undefined" ? "undefined" : _typeof(objCall)) === "object" && objCall.context && objCall.callback && objCall.params && _typeof(objCall.context) === "object" && typeof objCall.callback === "function" && Array.isArray(objCall.params)) {
	                                    /**
	                                     * Call subscribed method
	                                     */
	                                    objCall.callback.apply(objCall.context, objCall.params);
	                                }
	                            }
	                        } catch (e) {}
	                    }
	                }
	            }
	        } catch (e) {}
	        /**
	         * Recall watcher
	         */
	        root.requestAnimationFrame(this.watch.bind(this));
	    };
	
	    return AnimationFrame;
	}();
	/**
	 * Create single request animation frame object
	 * @type {AnimationFrame}
	 */
	
	
	root.AnimationFrame = root.AnimationFrame || new AnimationFrame();
	/**
	 * Export single AnimationFrame instance
	 */
	var _AnimationFrame = root.AnimationFrame;
	exports.default = _AnimationFrame;
	
	module.exports = _AnimationFrame;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Import subclasses
	 */
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _UtilsAnimation = __webpack_require__(8);
	
	var _UtilsAnimation2 = _interopRequireDefault(_UtilsAnimation);
	
	var _UtilsBrowser = __webpack_require__(10);
	
	var _UtilsBrowser2 = _interopRequireDefault(_UtilsBrowser);
	
	var _UtilsCookie = __webpack_require__(11);
	
	var _UtilsCookie2 = _interopRequireDefault(_UtilsCookie);
	
	var _UtilsDocument = __webpack_require__(18);
	
	var _UtilsDocument2 = _interopRequireDefault(_UtilsDocument);
	
	var _UtilsDOM = __webpack_require__(20);
	
	var _UtilsDOM2 = _interopRequireDefault(_UtilsDOM);
	
	var _UtilsMouse = __webpack_require__(21);
	
	var _UtilsMouse2 = _interopRequireDefault(_UtilsMouse);
	
	var _UtilsScreen = __webpack_require__(22);
	
	var _UtilsScreen2 = _interopRequireDefault(_UtilsScreen);
	
	var _UtilsSystem = __webpack_require__(23);
	
	var _UtilsSystem2 = _interopRequireDefault(_UtilsSystem);
	
	var _UtilsUser = __webpack_require__(24);
	
	var _UtilsUser2 = _interopRequireDefault(_UtilsUser);
	
	var _UtilsWindow = __webpack_require__(19);
	
	var _UtilsWindow2 = _interopRequireDefault(_UtilsWindow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Global Utils class
	 */
	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }
	
	    Utils.warn = function warn(messange) {
	        if ((typeof console === "undefined" ? "undefined" : _typeof(console)) === "object") {
	            if (typeof console.warn === "function") {
	                //console.warn(messange);
	                return messange;
	            } else if (typeof console.log === "function") {
	                //console.log(messange);
	                return messange;
	            }
	        }
	    };
	    /**
	     * @deprecated Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method.
	     */
	
	
	    Utils.getBoundingClientRect = function getBoundingClientRect(domNode) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	        var showForce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	        Utils.warn("Utils.getBoundingClientRect method was deprecated and soon will be removed. Please use Utils.DOM.getBoundingClientRect method.");
	        return Utils.DOM.getBoundingClientRect(domNode, domDocument, showForce);
	    };
	
	    /**
	     * @deprecated Utils.findElementPosition method was deprecated and soon will be removed. Please use Utils.DOM.findElementPosition method.
	     */
	    Utils.findElementPosition = function findElementPosition(domNode) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	        var showForce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	        Utils.warn("Utils.findElementPosition method was deprecated and soon will be removed. Please use Utils.DOM.findElementPosition method.");
	        return Utils.DOM.findElementPosition(domNode, domDocument, showForce);
	    };
	    /**
	     * Transfer static methods into the object
	     * @param realObject
	     * @param className
	     */
	
	
	    Utils.implementationStaticMethods = function implementationStaticMethods(realObject, className) {
	        if (!!realObject && (typeof realObject === "undefined" ? "undefined" : _typeof(realObject)) === "object") {
	            (function () {
	                var staticClass = realObject.constructor;
	                if (typeof staticClass === "function") {
	                    var methods = Object.keys(staticClass);
	                    if (methods && methods.length > 0) {
	                        var _loop = function _loop() {
	                            if (_isArray) {
	                                if (_i >= _iterator.length) return "break";
	                                _ref = _iterator[_i++];
	                            } else {
	                                _i = _iterator.next();
	                                if (_i.done) return "break";
	                                _ref = _i.value;
	                            }
	
	                            var method = _ref;
	
	                            if (typeof realObject[method] === "undefined") {
	                                realObject[method] = function () {
	                                    if (typeof staticClass !== "undefined") {
	                                        Utils.warn("That method was deprecated and soon will be removed. Please use " + (className || staticClass && staticClass.name || "Unknown") + "." + method + " method.");
	                                    }
	                                    return staticClass[method].apply(staticClass, arguments);
	                                };
	                            }
	                        };
	
	                        for (var _iterator = methods, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                            var _ref;
	
	                            var _ret2 = _loop();
	
	                            if (_ret2 === "break") break;
	                        }
	                    }
	                }
	            })();
	        }
	    };
	    /**
	     * Get call stack trace
	     * @return Array<Object>
	     */
	
	
	    Utils.stack = function stack() {
	        var e = new Error();
	        return e && e.stack && e.stack.split("\n").slice(5).map(function (s) {
	            if (!s) {
	                return {};
	            }
	            var match = /^(.*)@(.*)\.js:([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                if (match[1]) {
	                    match[1] = /([^\/<]+)/ig.exec(match[1]);
	                    if (match[1]) {
	                        match[1] = match[1][0];
	                    }
	                }
	                return {
	                    column: match[4] || "",
	                    file: match[2] || "",
	                    line: match[3] || "",
	                    method: match[1] || ""
	                };
	            }
	            match = /^(.*)@(http|https):([^:]+):([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[5] || "",
	                    file: match[3] || "",
	                    line: match[4] || "",
	                    method: match[1] + ":" + match[2] || ""
	                };
	            }
	            match = /^(.*)@(.*):([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[4] || "",
	                    file: match[2] || "",
	                    line: match[3] || "",
	                    method: match[1] || ""
	                };
	            }
	            match = /^\s+at\s([^(]+)\s\((.*):([0-9]+):([0-9]+)\)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[4] || "",
	                    file: match[2] || "",
	                    line: match[3] || "",
	                    method: match[1] || ""
	                };
	            }
	            match = /^\s+at\s(.*):([0-9]+):([0-9]+)$/ig.exec(s);
	            if (match) {
	                return {
	                    column: match[3] || "",
	                    file: match[1] || "",
	                    line: match[2] || "",
	                    method: ""
	                };
	            }
	            return s;
	        }) || [];
	    };
	    /**
	     * Get random ID
	     * @return {string}
	     */
	
	
	    Utils.getUID = function getUID() {
	        return Math.random().toString(36).substring(2);
	    };
	
	    return Utils;
	}();
	
	exports.default = Utils;
	
	Utils.Animation = _UtilsAnimation2.default;
	Utils.Browser = _UtilsBrowser2.default;
	Utils.Cookie = _UtilsCookie2.default;
	Utils.DOM = _UtilsDOM2.default;
	Utils.Document = _UtilsDocument2.default;
	Utils.Mouse = _UtilsMouse2.default;
	Utils.Screen = _UtilsScreen2.default;
	Utils.System = _UtilsSystem2.default;
	Utils.User = _UtilsUser2.default;
	Utils.Window = _UtilsWindow2.default;
	module.exports = Utils;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Import subclasses
	 */
	
	exports.__esModule = true;
	
	var _UtilsAnimationEasing = __webpack_require__(9);
	
	var _UtilsAnimationEasing2 = _interopRequireDefault(_UtilsAnimationEasing);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Animation = function Animation() {
	  _classCallCheck(this, Animation);
	};
	
	exports.default = Animation;
	
	Animation.Easing = _UtilsAnimationEasing2.default;

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Different time animation functions
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Easing = function () {
	    function Easing() {
	        _classCallCheck(this, Easing);
	    }
	
	    Easing.isValidParams = function isValidParams(t, b, c, d, s) {
	        return typeof t === "number" && typeof b === "number" && typeof c === "number" && typeof d === "number" && (typeof s === "undefined" || typeof s === "number") && t < d;
	    };
	
	    Easing.swing = function swing(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return Easing[Easing.def](t, b, c, d);
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInQuad = function easeInQuad(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * (t /= d) * t + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutQuad = function easeOutQuad(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return -c * (t /= d) * (t - 2) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutQuad = function easeInOutQuad(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if ((t /= d / 2) < 1) {
	                return c / 2 * t * t + b;
	            }
	            return -c / 2 * (--t * (t - 2) - 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInCubic = function easeInCubic(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * (t /= d) * t * t + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutCubic = function easeOutCubic(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * ((t = t / d - 1) * t * t + 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutCubic = function easeInOutCubic(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if ((t /= d / 2) < 1) {
	                return c / 2 * t * t * t + b;
	            }
	            return c / 2 * ((t -= 2) * t * t + 2) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInQuart = function easeInQuart(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * (t /= d) * t * t * t + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutQuart = function easeOutQuart(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutQuart = function easeInOutQuart(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if ((t /= d / 2) < 1) {
	                return c / 2 * t * t * t * t + b;
	            }
	            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInQuint = function easeInQuint(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * (t /= d) * t * t * t * t + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutQuint = function easeOutQuint(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutQuint = function easeInOutQuint(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if ((t /= d / 2) < 1) {
	                return c / 2 * t * t * t * t * t + b;
	            }
	            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInSine = function easeInSine(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutSine = function easeOutSine(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * Math.sin(t / d * (Math.PI / 2)) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutSine = function easeInOutSine(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInExpo = function easeInExpo(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutExpo = function easeOutExpo(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutExpo = function easeInOutExpo(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if (t === 0) {
	                return b;
	            }
	            if (t === d) {
	                return b + c;
	            }
	            if ((t /= d / 2) < 1) {
	                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	            }
	            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInCirc = function easeInCirc(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutCirc = function easeOutCirc(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutCirc = function easeInOutCirc(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if ((t /= d / 2) < 1) {
	                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	            }
	            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInElastic = function easeInElastic(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            var s = 1.70158;
	            var p = 0;
	            var a = c;
	            if (t === 0) {
	                return b;
	            }
	            if ((t /= d) === 1) {
	                return b + c;
	            }
	            if (!p) {
	                p = d * .3;
	            }
	            if (a < Math.abs(c)) {
	                a = c;
	                s = p / 4;
	            } else {
	                s = p / (2 * Math.PI) * Math.asin(c / a);
	            }
	            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutElastic = function easeOutElastic(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            var s = 1.70158;
	            var p = 0;
	            var a = c;
	            if (t === 0) {
	                return b;
	            }
	            if ((t /= d) === 1) {
	                return b + c;
	            }
	            if (!p) {
	                p = d * .3;
	            }
	            if (a < Math.abs(c)) {
	                a = c;
	                s = p / 4;
	            } else {
	                s = p / (2 * Math.PI) * Math.asin(c / a);
	            }
	            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutElastic = function easeInOutElastic(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            var s = 1.70158;
	            var p = 0;
	            var a = c;
	            if (t === 0) {
	                return b;
	            }
	            if ((t /= d / 2) === 2) {
	                return b + c;
	            }
	            if (!p) {
	                p = d * (.3 * 1.5);
	            }
	            if (a < Math.abs(c)) {
	                a = c;
	                s = p / 4;
	            } else {
	                s = p / (2 * Math.PI) * Math.asin(c / a);
	            }
	            if (t < 1) {
	                return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	            }
	            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInBack = function easeInBack(t, b, c, d, s) {
	        if (Easing.isValidParams(t, b, c, d, s)) {
	            if (s === undefined) {
	                s = 1.70158;
	            }
	            return c * (t /= d) * t * ((s + 1) * t - s) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutBack = function easeOutBack(t, b, c, d, s) {
	        if (Easing.isValidParams(t, b, c, d, s)) {
	            if (s === undefined) {
	                s = 1.70158;
	            }
	            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutBack = function easeInOutBack(t, b, c, d, s) {
	        if (Easing.isValidParams(t, b, c, d, s)) {
	            if (s === undefined) {
	                s = 1.70158;
	            }
	            if ((t /= d / 2) < 1) {
	                return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	            }
	            return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInBounce = function easeInBounce(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            return c - Easing.easeOutBounce(d - t, 0, c, d) + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeOutBounce = function easeOutBounce(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if ((t /= d) < 1 / 2.75) {
	                return c * (7.5625 * t * t) + b;
	            } else if (t < 2 / 2.75) {
	                return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
	            } else if (t < 2.5 / 2.75) {
	                return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
	            } else {
	                return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
	            }
	        } else {
	            return NaN;
	        }
	    };
	
	    Easing.easeInOutBounce = function easeInOutBounce(t, b, c, d) {
	        if (Easing.isValidParams(t, b, c, d)) {
	            if (t < d / 2) {
	                return Easing.easeInBounce(t * 2, 0, c, d) * .5 + b;
	            }
	            return Easing.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	        } else {
	            return NaN;
	        }
	    };
	
	    return Easing;
	}();
	
	exports.default = Easing;
	
	Easing.def = "easeOutQuad";

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with browser
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Browser = function () {
	    function Browser() {
	        _classCallCheck(this, Browser);
	    }
	
	    /**
	     * Get browser info
	     * @return {{browser: string, mobile: boolean, version: string}}
	     */
	    Browser.getInfo = function getInfo() {
	        return {
	            browser: Browser.getName(),
	            mobile: Browser.isMobile(),
	            version: Browser.getVersion()
	        };
	    };
	    /**
	     * Get browser name
	     * @return {string}
	     */
	
	
	    Browser.getName = function getName() {
	        var browser = void 0;
	        if (Browser.isOpera()) {
	            browser = "Opera";
	        } else if (Browser.isOperaNew()) {
	            browser = "Opera";
	        } else if (Browser.isMSIE()) {
	            browser = "Microsoft Internet Explorer";
	        } else if (Browser.isMSIENew()) {
	            browser = "Microsoft Internet Explorer";
	        } else if (Browser.isChrome()) {
	            browser = "Chrome";
	        } else if (Browser.isFirefox()) {
	            browser = "Firefox";
	        } else if (Browser.isSafari()) {
	            browser = "Safari";
	        } else if (Browser.isOther()) {
	            browser = Browser.getOtherName();
	        }
	        return browser;
	    };
	    /**
	     * Get browser version
	     * @return {string}
	     */
	
	
	    Browser.getVersion = function getVersion() {
	        var version = void 0;
	        if (Browser.isOpera()) {
	            version = Browser.getOperaVersion();
	        } else if (Browser.isOperaNew()) {
	            version = Browser.getOperaNewVersion();
	        } else if (Browser.isMSIE()) {
	            version = Browser.getMSIEVersion();
	        } else if (Browser.isMSIENew()) {
	            version = Browser.getMSIENewVersion();
	        } else if (Browser.isChrome()) {
	            version = Browser.getChromeVersion();
	        } else if (Browser.isFirefox()) {
	            version = Browser.getFirefoxVersion();
	        } else if (Browser.isSafari()) {
	            version = Browser.getSafariVersion();
	        } else if (Browser.isOther()) {
	            version = Browser.getOtherVersion();
	        }
	        return version;
	    };
	    /**
	     * Trim browser version
	     * @param version
	     * @return {string}
	     */
	
	
	    Browser.trimVersion = function trimVersion(version) {
	        if (typeof version === "string") {
	            var chars = [";", " ", ")"];
	            for (var _iterator = chars, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                var _ref;
	
	                if (_isArray) {
	                    if (_i >= _iterator.length) break;
	                    _ref = _iterator[_i++];
	                } else {
	                    _i = _iterator.next();
	                    if (_i.done) break;
	                    _ref = _i.value;
	                }
	
	                var char = _ref;
	
	                var ix = version.indexOf(char);
	                if (ix !== -1) {
	                    version = version.substring(0, ix);
	                }
	            }
	            return version;
	        } else {
	            return "";
	        }
	    };
	    /**
	     * Check if it is mobile
	     * @return {boolean}
	     */
	
	
	    Browser.isMobile = function isMobile() {
	        return (/Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(navigator.appVersion)
	        );
	    };
	    /**
	     * Check if it is opera browser
	     * @return {boolean}
	     */
	
	
	    Browser.isOpera = function isOpera() {
	        return navigator.userAgent.indexOf("Opera") !== -1;
	    };
	    /**
	     * Get opera browser version
	     * @return {string}
	     */
	
	
	    Browser.getOperaVersion = function getOperaVersion() {
	        var verOffset = navigator.userAgent.indexOf("Opera");
	        var version = navigator.userAgent.substring(verOffset + 6);
	        verOffset = navigator.userAgent.indexOf("Version");
	        if (verOffset !== -1) {
	            version = navigator.userAgent.substring(verOffset + 8);
	        }
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is opera new browser
	     * @return {boolean}
	     */
	
	
	    Browser.isOperaNew = function isOperaNew() {
	        return navigator.userAgent.indexOf("OPR") !== -1;
	    };
	    /**
	     * Get opera new browser version
	     * @return {string}
	     */
	
	
	    Browser.getOperaNewVersion = function getOperaNewVersion() {
	        var verOffset = navigator.userAgent.indexOf("OPR");
	        var version = navigator.userAgent.substring(verOffset + 4);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is msie browser
	     * @return {boolean}
	     */
	
	
	    Browser.isMSIE = function isMSIE() {
	        return navigator.userAgent.indexOf("MSIE") !== -1;
	    };
	    /**
	     * Get msie browser version
	     * @return {string}
	     */
	
	
	    Browser.getMSIEVersion = function getMSIEVersion() {
	        var verOffset = navigator.userAgent.indexOf("MSIE");
	        var version = navigator.userAgent.substring(verOffset + 5);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is msie new browser
	     * @return {boolean}
	     */
	
	
	    Browser.isMSIENew = function isMSIENew() {
	        return navigator.userAgent.indexOf("Trident/") !== -1;
	    };
	    /**
	     * Get msie new browser version
	     * @return {string}
	     */
	
	
	    Browser.getMSIENewVersion = function getMSIENewVersion() {
	        var version = navigator.userAgent.substring(navigator.userAgent.indexOf("rv:") + 3);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is chrome browser
	     * @return {boolean}
	     */
	
	
	    Browser.isChrome = function isChrome() {
	        return navigator.userAgent.indexOf("Chrome") !== -1;
	    };
	    /**
	     * Get chrome browser version
	     * @return {string}
	     */
	
	
	    Browser.getChromeVersion = function getChromeVersion() {
	        var verOffset = navigator.userAgent.indexOf("Chrome");
	        var version = navigator.userAgent.substring(verOffset + 7);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is safari browser
	     * @return {boolean}
	     */
	
	
	    Browser.isSafari = function isSafari() {
	        return navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("Chrome") === -1;
	    };
	    /**
	     * Get safari browser version
	     * @return {string}
	     */
	
	
	    Browser.getSafariVersion = function getSafariVersion() {
	        var verOffset = navigator.userAgent.indexOf("Safari");
	        var version = navigator.userAgent.substring(verOffset + 7);
	        verOffset = navigator.userAgent.indexOf("Version");
	        if (verOffset !== -1) {
	            version = navigator.userAgent.substring(verOffset + 8);
	        }
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is firefox browser
	     * @return {boolean}
	     */
	
	
	    Browser.isFirefox = function isFirefox() {
	        return navigator.userAgent.indexOf("Firefox") !== -1;
	    };
	    /**
	     * Get firefox browser version
	     * @return {string}
	     */
	
	
	    Browser.getFirefoxVersion = function getFirefoxVersion() {
	        var verOffset = navigator.userAgent.indexOf("Firefox");
	        var version = navigator.userAgent.substring(verOffset + 8);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check if it is other browser
	     * @return {boolean}
	     */
	
	
	    Browser.isOther = function isOther() {
	        var nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
	        var verOffset = navigator.userAgent.lastIndexOf("/");
	        return nameOffset < verOffset;
	    };
	    /**
	     * Get other browser name
	     * @return {string}
	     */
	
	
	    Browser.getOtherName = function getOtherName() {
	        var nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
	        var verOffset = navigator.userAgent.lastIndexOf("/");
	        var browser = navigator.userAgent.substring(nameOffset, verOffset);
	        if (browser.toLowerCase() === browser.toUpperCase()) {
	            browser = navigator.appName;
	        }
	        return browser;
	    };
	    /**
	     * Get other browser version
	     * @return {string}
	     */
	
	
	    Browser.getOtherVersion = function getOtherVersion() {
	        var nameOffset = navigator.userAgent.lastIndexOf(" ") + 1;
	        var verOffset = navigator.userAgent.lastIndexOf("/");
	        var version = navigator.userAgent.substring(verOffset + 1);
	        return Browser.trimVersion(version);
	    };
	    /**
	     * Check browser support
	     * @return {boolean}
	     */
	
	
	    Browser.isSupported = function isSupported() {
	        return !Browser.isMSIE() || parseInt(Browser.getMSIEVersion(), 10) > 8;
	    };
	    /**
	     * Check if it is WebKit browser
	     * @return {boolean}
	     */
	
	
	    Browser.isWebKit = function isWebKit() {
	        return navigator.userAgent.indexOf("AppleWebKit/") !== -1;
	    };
	    /**
	     * Check if it is Gecko browser
	     * @return {boolean}
	     */
	
	
	    Browser.isGecko = function isGecko() {
	        return navigator.userAgent.indexOf("Gecko") > -1 && navigator.userAgent.indexOf("KHTML") === -1;
	    };
	    /**
	     * Check if it is Android browser
	     * @return {boolean}
	     */
	
	
	    Browser.isAndroid = function isAndroid() {
	        return navigator.userAgent.indexOf("Android") > -1;
	    };
	    /**
	     * Check if it is Linux browser
	     * @return {boolean}
	     */
	
	
	    Browser.isLinux = function isLinux() {
	        return navigator.userAgent.indexOf("Linux") > -1;
	    };
	    /**
	     * Check if it is iPad browser
	     * @return {boolean}
	     */
	
	
	    Browser.isTabletPC = function isTabletPC() {
	        return navigator.userAgent.indexOf("iPad") > -1;
	    };
	
	    return Browser;
	}();
	
	exports.default = Browser;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var URL = __webpack_require__(12);
	/**
	 * Class for working with cookie
	 */
	
	var Cookie = function () {
	    function Cookie() {
	        _classCallCheck(this, Cookie);
	    }
	
	    /**
	     * The method returns the flag whether supported this storage type or not
	     * @returns {boolean}
	     */
	    Cookie.isSupported = function isSupported() {
	        return (typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" && typeof document.cookie === "string";
	    };
	    /**
	     * The method sets the value and returns true if it has been set
	     * @param checkSupport {boolean}
	     * @param key {string}
	     * @param value {string}
	     * @param expires {number}
	     * @param path {string}
	     * @param domain {string}
	     * @param secure {boolean}
	     * @return {boolean}
	     */
	
	
	    Cookie.setItem = function setItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	        var value = arguments[2];
	        var expires = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
	        var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "/";
	        var domain = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : location.hostname;
	        var secure = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : location.protocol === "https:";
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && Cookie.regValidKey.test(key) && typeof value === "string" && (value === "" || Cookie.regValidKey.test(value)) && typeof expires === "number" && expires < 365 && typeof path === "string" && typeof domain === "string" && domain.indexOf(location.hostname) !== -1 && typeof secure === "boolean" && secure === (location.protocol === "https:")) {
	                /**
	                 * Validate input data
	                 */
	                var u = URL.parse("http://" + domain + path);
	                if (u.hostname === domain || u.path === path) {
	                    /**
	                     * If that store is supported
	                     */
	                    if (!checkSupport || Cookie.isSupported()) {
	                        /**
	                         * Save cookies for 30 days
	                         * @type {Date}
	                         */
	                        var date = new Date();
	                        date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
	                        var exp = date.toUTCString();
	                        /**
	                         * Encode value for store
	                         * @type {string}
	                         */
	                        value = encodeURIComponent(value);
	                        /**
	                         * Writing value to the document cookie storage
	                         * @type {string}
	                         */
	                        document.cookie = key + "=" + value + (exp ? "; expires=" + exp : "") + (path ? "; path=" + path : "") + (domain ? "; domain=" + domain : "") + (secure ? "; secure" : "");
	                        /**
	                         * If all ok return true
	                         */
	                        return this.getItem(checkSupport, key) === decodeURIComponent(value);
	                    } else {
	                        /**
	                         * If cookie does not supported return false
	                         */
	                        return false;
	                    }
	                } else {
	                    /**
	                     * If input data is not valid
	                     */
	                    return false;
	                }
	            } else {
	                /**
	                 * If input data is not valid
	                 */
	                return false;
	            }
	        } catch (e) {
	            /**
	             * If something goes wrong return false
	             */
	            return false;
	        }
	    };
	    /**
	     * The method reads the value and returns it or returns false if the value does not exist
	     * @param checkSupport {boolean}
	     * @param key {string}
	     * @returns {string|boolean}
	     */
	
	
	    Cookie.getItem = function getItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && Cookie.regValidKey.test(key)) {
	                /**
	                 * If that store is supported
	                 */
	                if (!checkSupport || Cookie.isSupported()) {
	                    /**
	                     * Get the array from document cookie split by ;
	                     * @type {string[]}
	                     */
	                    var arrCookie = document.cookie.split(";");
	                    /**
	                     * Iterate through the cookies
	                     */
	                    for (var _iterator = arrCookie, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	                        var _ref;
	
	                        if (_isArray) {
	                            if (_i >= _iterator.length) break;
	                            _ref = _iterator[_i++];
	                        } else {
	                            _i = _iterator.next();
	                            if (_i.done) break;
	                            _ref = _i.value;
	                        }
	
	                        var i = _ref;
	
	                        /**
	                         * Trim and split each cookie by = for key value pare
	                         * @type {string[]}
	                         */
	                        var v = i.trim().split("=", 2);
	                        /**
	                         * If it is correct cookie key return the value
	                         */
	                        if (v[0] === key) {
	                            /**
	                             * If the value was found return the value
	                             */
	                            return decodeURIComponent(v[1]);
	                        }
	                    }
	                    /**
	                     * If the value was not found return false
	                     */
	                    return false;
	                } else {
	                    /**
	                     * If cookie does not supported return false
	                     */
	                    return false;
	                }
	            } else {
	                /**
	                 * If input data is not valid
	                 */
	                return false;
	            }
	        } catch (e) {
	            /**
	             * If something goes wrong return false
	             */
	            return false;
	        }
	    };
	    /**
	     * The method removes the value and return true if the value does not exist
	     * @param checkSupport {boolean}
	     * @param key {string}
	     * @returns {boolean}
	     */
	
	
	    Cookie.removeItem = function removeItem() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	        var key = arguments[1];
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean" && typeof key === "string" && Cookie.regValidKey.test(key)) {
	                /**
	                 * If that store is supported
	                 */
	                if (!checkSupport || Cookie.isSupported()) {
	                    /**
	                     * Set empty overdue value by key
	                     */
	                    Cookie.setItem(checkSupport, key, "", -1 * 24 * 60 * 60);
	                    /**
	                     * If all ok return true
	                     */
	                    return Cookie.getItem(checkSupport, key) === false;
	                } else {
	                    /**
	                     * If cookie does not supported return false
	                     */
	                    return false;
	                }
	            } else {
	                /**
	                 * If input data is not valid
	                 */
	                return false;
	            }
	        } catch (e) {
	            /**
	             * If something goes wrong return false
	             */
	            return false;
	        }
	    };
	    /**
	     * The method returns the array of string of available keys
	     * @param checkSupport {boolean}
	     * @returns {string[]}
	     */
	
	
	    Cookie.getKeys = function getKeys() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean") {
	                /**
	                 * If that store is supported
	                 */
	                if (!checkSupport || Cookie.isSupported()) {
	                    /**
	                     * The array of available keys
	                     * @type {Array}
	                     */
	                    var arrKeys = [];
	                    /**
	                     * Get the array from document cookie split by ;
	                     * @type {string[]}
	                     */
	                    var arrCookie = document.cookie.split(";");
	                    /**
	                     * Iterate through the cookies
	                     */
	                    for (var _iterator2 = arrCookie, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	                        var _ref2;
	
	                        if (_isArray2) {
	                            if (_i2 >= _iterator2.length) break;
	                            _ref2 = _iterator2[_i2++];
	                        } else {
	                            _i2 = _iterator2.next();
	                            if (_i2.done) break;
	                            _ref2 = _i2.value;
	                        }
	
	                        var i = _ref2;
	
	                        /**
	                         * Trim and split each cookie by = for key value pare
	                         * @type {string[]}
	                         */
	                        var v = i.trim().split("=", 2);
	                        /**
	                         * Add key to the list
	                         */
	                        if (v[0]) {
	                            arrKeys.push(v[0]);
	                        }
	                    }
	                    return arrKeys;
	                } else {
	                    /**
	                     * If cookie does not supported return false
	                     */
	                    return [];
	                }
	            } else {
	                /**
	                 * If input data is not valid
	                 */
	                return [];
	            }
	        } catch (e) {
	            /**
	             * If something goes wrong return false
	             */
	            return [];
	        }
	    };
	    /**
	     * The method cleans the storage and return true if it is empty
	     * @param checkSupport {boolean}
	     * @returns {boolean}
	     */
	
	
	    Cookie.clear = function clear() {
	        var checkSupport = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
	
	        try {
	            /**
	             * Validate input data
	             */
	            if (typeof checkSupport === "boolean") {
	                /**
	                 * If that store is supported
	                 */
	                if (!checkSupport || Cookie.isSupported()) {
	                    var arrKeys = Cookie.getKeys(checkSupport);
	                    if (arrKeys) {
	                        for (var _iterator3 = arrKeys, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	                            var _ref3;
	
	                            if (_isArray3) {
	                                if (_i3 >= _iterator3.length) break;
	                                _ref3 = _iterator3[_i3++];
	                            } else {
	                                _i3 = _iterator3.next();
	                                if (_i3.done) break;
	                                _ref3 = _i3.value;
	                            }
	
	                            var i = _ref3;
	
	                            Cookie.removeItem(checkSupport, i);
	                        }
	                    }
	                    /**
	                     * If all ok return true
	                     */
	                    return Cookie.getKeys(checkSupport).length === 0;
	                } else {
	                    /**
	                     * If cookie does not supported return false
	                     */
	                    return true;
	                }
	            } else {
	                /**
	                 * If input data is not valid
	                 */
	                return false;
	            }
	        } catch (e) {
	            /**
	             * If something goes wrong return false
	             */
	            return false;
	        }
	    };
	
	    return Cookie;
	}();
	
	exports.default = Cookie;
	
	Cookie.regValidKey = new RegExp("([a-zA-Z0-9_-]{1,})", "i");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var punycode = __webpack_require__(13);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(15);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;
	
	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
	            'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query &&
	      isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || (query && ('?' + query)) || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function(relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  Object.keys(this).forEach(function(k) {
	    result[k] = this[k];
	  }, this);
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function(k) {
	      if (k !== 'protocol')
	        result[k] = relative[k];
	    });
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function(k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especialy happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host) && (last === '.' || last === '..') ||
	      last === '');
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};
	
	function isString(arg) {
	  return typeof arg === "string";
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return  arg == null;
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {
	
		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}
	
		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
	
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
	
			}
	
			return ucs2encode(output);
		}
	
		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
	
			}
			return output.join('');
		}
	
		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}
	
		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)(module), (function() { return this; }())))

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(16);
	exports.encode = exports.stringify = __webpack_require__(17);


/***/ },
/* 16 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _UtilsWindow = __webpack_require__(19);
	
	var _UtilsWindow2 = _interopRequireDefault(_UtilsWindow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Class for working with document
	 */
	var Document = function () {
	    function Document() {
	        _classCallCheck(this, Document);
	    }
	
	    /**
	     * Get document height
	     * @returns {number}
	     */
	    Document.getHeight = function getHeight() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        if (_UtilsWindow2.default.isWindow(objWindow)) {
	            return Math.max(objWindow.document.body.scrollHeight, objWindow.document.documentElement.scrollHeight, objWindow.document.body.offsetHeight, objWindow.document.documentElement.offsetHeight, objWindow.document.body.clientHeight, objWindow.document.documentElement.clientHeight);
	        } else {
	            return NaN;
	        }
	    };
	    /**
	     * Get document width
	     * @returns {number}
	     */
	
	
	    Document.getWidth = function getWidth() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        if (_UtilsWindow2.default.isWindow(objWindow)) {
	            return Math.max(objWindow.document.body.scrollWidth, objWindow.document.documentElement.scrollWidth, objWindow.document.body.offsetWidth, objWindow.document.documentElement.offsetWidth, objWindow.document.body.clientWidth, objWindow.document.documentElement.clientWidth);
	        } else {
	            return NaN;
	        }
	    };
	    /**
	     * Get document top scroll
	     * @param objWindow
	     * @return {number}
	     */
	
	
	    Document.getScrollTop = function getScrollTop() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        if (_UtilsWindow2.default.isWindow(objWindow)) {
	            return objWindow.pageYOffset || objWindow.document.documentElement && objWindow.document.documentElement.scrollTop || objWindow.document.body && objWindow.document.body.scrollTop;
	        } else {
	            return NaN;
	        }
	    };
	    /**
	     * Get document left scroll
	     * @param objWindow
	     * @return {number}
	     */
	
	
	    Document.getScrollLeft = function getScrollLeft() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        if (_UtilsWindow2.default.isWindow(objWindow)) {
	            return objWindow.pageXOffset || objWindow.document.documentElement && objWindow.document.documentElement.scrollLeft || objWindow.document.body && objWindow.document.body.scrollLeft;
	        } else {
	            return NaN;
	        }
	    };
	    /**
	     * Get document scrolls
	     * @param objWindow
	     * @return {{left: number, top: number}}
	     */
	
	
	    Document.getScroll = function getScroll() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        if (_UtilsWindow2.default.isWindow(objWindow)) {
	            return {
	                left: Document.getScrollLeft(objWindow),
	                top: Document.getScrollTop(objWindow)
	            };
	        } else {
	            return {
	                left: NaN,
	                top: NaN
	            };
	        }
	    };
	
	    return Document;
	}();
	
	exports.default = Document;

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with window
	 */
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Window = function () {
	    function Window() {
	        _classCallCheck(this, Window);
	    }
	
	    /**
	     * Check if it is window
	     * @param objWindow
	     * @return {boolean}
	     */
	    Window.isWindow = function isWindow(objWindow) {
	        return objWindow && (typeof objWindow === "undefined" ? "undefined" : _typeof(objWindow)) === "object" && objWindow.document && _typeof(objWindow.document) === "object";
	    };
	    /**
	     * Get window height
	     * @param objWindow
	     * @return {number}
	     */
	
	
	    Window.getHeight = function getHeight() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        if (Window.isWindow(objWindow)) {
	            return objWindow.innerHeight || objWindow.document.documentElement.clientHeight || objWindow.document.body.clientHeight;
	        } else {
	            return NaN;
	        }
	    };
	    /**
	     * Get window width
	     * @param objWindow
	     * @return {number}
	     */
	
	
	    Window.getWidth = function getWidth() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        if (Window.isWindow(objWindow)) {
	            return objWindow.innerWidth || objWindow.document.documentElement.clientWidth || objWindow.document.body.clientWidth;
	        } else {
	            return NaN;
	        }
	    };
	    /**
	     * Get window sizes
	     * @return {{height: number, width: number}}
	     */
	
	
	    Window.getSizes = function getSizes() {
	        var objWindow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
	
	        return {
	            height: Window.getHeight(objWindow),
	            width: Window.getWidth(objWindow)
	        };
	    };
	
	    return Window;
	}();
	
	exports.default = Window;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _Utils = __webpack_require__(7);
	
	var _Utils2 = _interopRequireDefault(_Utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Class for working with DOM
	 */
	var DOM = function () {
	    function DOM() {
	        _classCallCheck(this, DOM);
	    }
	
	    /**
	     * Check if variable is dom document
	     * @param domDocument
	     * @return {boolean}
	     */
	    DOM.isDOMDocument = function isDOMDocument(domDocument) {
	        return !(!domDocument || typeof domDocument === "boolean" || typeof domDocument === "number" || typeof domDocument === "string" || domDocument.nodeType !== 9);
	    };
	    /**
	     * Find and validate Node in DOM Document
	     * @param domNode
	     * @param domDocument
	     * @return {Element | boolean}
	     */
	
	
	    DOM.getDOMNode = function getDOMNode(domNode) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	
	        /**
	         * Check if domDocument is a valid variable
	         */
	        if (!DOM.isDOMDocument(domDocument)) {
	            return false;
	        }
	        /**
	         * Check if domNode is a valid variable
	         */
	        if (!domNode || typeof domNode === "boolean" || typeof domNode === "number" || typeof domNode === "undefined") {
	            return false;
	        }
	        /**
	         * If domNode is a string it might be an ID
	         */
	        if (typeof domNode === "string") {
	            domNode = domDocument.getElementById(domNode);
	        }
	        /**
	         * Check if domNode is a valid variable
	         */
	        if (!domNode || domNode.nodeType !== 1 || !domNode.parentNode || domNode.parentNode.nodeName === "HTML" || !domDocument.contains(domNode)) {
	            return false;
	        }
	        return domNode;
	    };
	    /**
	     * Get element sizes and position
	     * @param domNode
	     * @param domDocument
	     * @param showForce
	     * @return {{bottom: number, height: number, left: number, right: number, top: number, width: number}}
	     */
	
	
	    DOM.getBoundingClientRect = function getBoundingClientRect(domNode) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	        var showForce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	        /**
	         * Create result size and position object
	         */
	        var objRet = {
	            bottom: 0,
	            height: 0,
	            left: 0,
	            right: 0,
	            top: 0,
	            width: 0
	        };
	        domNode = DOM.getDOMNode(domNode, domDocument);
	        if (!domNode) {
	            _Utils2.default.warn("Utils.DOM.getBoundingClientRect: DOM element doesn't exist in that DOM Document");
	            return objRet;
	        }
	        showForce = !!showForce;
	        var styles = void 0;
	        if (showForce) {
	            styles = getComputedStyle(domNode);
	            if (styles && styles.display === "none") {
	                domNode.style.display = "block";
	            }
	        }
	        /**
	         * If default method is supported than use it
	         */
	        if (domNode.getBoundingClientRect) {
	            objRet = domNode.getBoundingClientRect();
	            /**
	             * IE hack
	             */
	            objRet = {
	                bottom: objRet.bottom,
	                height: objRet.height || domNode.clientHeight,
	                left: objRet.left,
	                right: objRet.right,
	                top: objRet.top,
	                width: objRet.width || domNode.clientWidth
	            };
	        } else {
	            /**
	             * Write the element in a temporary variable
	             */
	            var domElement = domNode;
	            /**
	             * Calculated basic parameters of the element
	             * @type {Object}
	             */
	            var objCoordinates = {
	                height: domElement.offsetHeight,
	                width: domElement.offsetWidth,
	                x: 0,
	                y: 0
	            };
	            /**
	             * Are passed on to all parents and take into account their offsets
	             */
	            while (domElement) {
	                objCoordinates.x += domElement.offsetLeft;
	                objCoordinates.y += domElement.offsetTop;
	                domElement = domElement.offsetParent;
	            }
	            /**
	             *
	             * @type {Object}
	             */
	            objRet = {
	                bottom: objCoordinates.y + objCoordinates.height,
	                height: objCoordinates.height,
	                left: objCoordinates.x,
	                right: objCoordinates.x + objCoordinates.width,
	                top: objCoordinates.y,
	                width: objCoordinates.width
	            };
	        }
	        if (showForce && domNode) {
	            domNode.style.display = "";
	        }
	        /**
	         * Return size and position of the element
	         */
	        return objRet;
	    };
	
	    /**
	     * Find element position
	     * @param domNode
	     * @param domDocument
	     * @param showForce
	     * @return {{top: number, left: number}}
	     */
	    DOM.findElementPosition = function findElementPosition(domNode) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	        var showForce = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
	        var objRet = {
	            left: 0,
	            top: 0
	        };
	        domNode = DOM.getDOMNode(domNode, domDocument);
	        if (!domNode) {
	            _Utils2.default.warn("Utils.DOM.findElementPosition: DOM element doesn't exist in that DOM Document");
	            return objRet;
	        }
	        showForce = !!showForce;
	        while (domNode) {
	            var styles = void 0;
	            if (showForce) {
	                styles = window.getComputedStyle(domNode);
	                if (styles && styles.display === "none") {
	                    domNode.style.display = "block";
	                }
	            }
	            objRet.left += domNode.offsetLeft;
	            objRet.top += domNode.offsetTop;
	            domNode = domNode.offsetParent;
	            if (showForce && domNode) {
	                domNode.style.display = "";
	            }
	        }
	        return objRet;
	    };
	    /**
	     * Add event listener
	     * @param obj
	     * @param name
	     * @param func
	     */
	
	
	    DOM.addEvent = function addEvent(obj, name, func) {
	        if (obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj.nodeType === 1 && typeof name === "string" && typeof func === "function") {
	            if (obj.addEventListener) {
	                obj.addEventListener(name, func, false);
	            } else if (obj.attachEvent) {
	                obj.attachEvent("on" + name, func);
	            }
	            return true;
	        } else {
	            return false;
	        }
	    };
	    /**
	     * Remove event listener
	     * @param obj
	     * @param name
	     * @param func
	     */
	
	
	    DOM.removeEvent = function removeEvent(obj, name, func) {
	        if (obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj.nodeType === 1 && typeof name === "string" && typeof func === "function") {
	            if (obj.removeEventListener) {
	                obj.removeEventListener(name, func, false);
	            } else if (obj.detachEvent) {
	                obj.detachEvent("on" + name, func);
	            }
	            return true;
	        } else {
	            return false;
	        }
	    };
	    /**
	     * Check if element has class name
	     * @param element
	     * @param className
	     * @return {boolean}
	     */
	
	
	    DOM.hasClassName = function hasClassName(element, className) {
	        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof className === "string" && element.nodeType === 1) {
	            className = className.trim();
	            return (" " + element.className + " ").indexOf(" " + className + " ") !== -1;
	        } else {
	            return false;
	        }
	    };
	    /**
	     * Add class name
	     * @param element
	     * @param className
	     * @return {HTMLElement}
	     */
	
	
	    DOM.addClassName = function addClassName(element, className) {
	        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof className === "string" && element.nodeType === 1) {
	            className = className.trim();
	            if (!DOM.hasClassName(element, className)) {
	                var cl = element.className;
	                element.className = cl ? cl + " " + className : className;
	            }
	            return element;
	        } else {
	            return null;
	        }
	    };
	    /**
	     * Remove class name
	     * @param element
	     * @param className
	     * @return {HTMLElement}
	     */
	
	
	    DOM.removeClassName = function removeClassName(element, className) {
	        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof className === "string" && element.nodeType === 1 && typeof element.className === "string") {
	            className = className.trim();
	            var classes = element.className.trim().split(" ");
	            for (var i = classes.length - 1; i >= 0; i--) {
	                classes[i] = classes[i].trim();
	                if (!classes[i] || classes[i] === className) {
	                    classes.splice(i, 1);
	                }
	            }
	            element.className = classes.join(" ");
	            return element;
	        } else {
	            return null;
	        }
	    };
	    /**
	     * Toggle class name
	     * @param element
	     * @param className
	     * @param toggle
	     * @return {HTMLElement}
	     */
	
	
	    DOM.toggleClassName = function toggleClassName(element, className, toggle) {
	        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof className === "string" && typeof toggle === "boolean" && element.nodeType === 1) {
	            className = className.trim();
	            if (toggle) {
	                DOM.addClassName(element, className);
	            } else {
	                DOM.removeClassName(element, className);
	            }
	            return element;
	        } else {
	            return null;
	        }
	    };
	    /**
	     * Replace class name
	     * @param element
	     * @param oldClassName
	     * @param newClassName
	     * @return {HTMLElement}
	     */
	
	
	    DOM.replaceClass = function replaceClass(element, oldClassName, newClassName) {
	        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof oldClassName === "string" && typeof newClassName === "string" && element.nodeType === 1) {
	            oldClassName = oldClassName.trim();
	            newClassName = newClassName.trim();
	            DOM.removeClassName(element, oldClassName);
	            DOM.addClassName(element, newClassName);
	            return element;
	        } else {
	            return null;
	        }
	    };
	    /**
	     * Get element by tag name and index
	     * @param tn
	     * @param domDocument
	     * @param index
	     * @return {Node}
	     */
	
	
	    DOM.getElementByTagName = function getElementByTagName(tn) {
	        var domDocument = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
	        var index = arguments[2];
	
	        if (typeof tn === "string" && DOM.isDOMDocument(domDocument) && typeof index === "number") {
	            var els = domDocument.getElementsByTagName(tn);
	            return els[index] || null;
	        } else {
	            return null;
	        }
	    };
	    /**
	     * Get line height
	     * @return {number}
	     */
	
	
	    DOM.getLineHeight = function getLineHeight() {
	        var styles = getComputedStyle(document.body);
	        var lineHeight = styles.lineHeight;
	        var lineHeightDig = parseInt(lineHeight, 10);
	        var fontSize = styles.fontSize;
	        var fontSizeDig = parseInt(fontSize, 10);
	        if (isFinite(lineHeightDig)) {
	            return lineHeightDig;
	        } else {
	            return fontSizeDig;
	        }
	    };
	
	    return DOM;
	}();
	
	exports.default = DOM;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Import additional classes
	 */
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _UtilsDOM = __webpack_require__(20);
	
	var _UtilsDOM2 = _interopRequireDefault(_UtilsDOM);
	
	var _UtilsWindow = __webpack_require__(19);
	
	var _UtilsWindow2 = _interopRequireDefault(_UtilsWindow);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Mouse = function () {
	    function Mouse() {
	        _classCallCheck(this, Mouse);
	    }
	
	    /**
	     * Normalise mouse delta
	     * @param e
	     * @return {number}
	     */
	    Mouse.getWheelDelta = function getWheelDelta(e) {
	        if (e && (typeof e === "undefined" ? "undefined" : _typeof(e)) === "object" && ("detail" in e || "wheelDelta" in e || "wheelDeltaY" in e || "wheelDeltaX" in e || "deltaY" in e || "deltaX" in e || "axis" in e || "deltaMode" in e)) {
	            var delta = void 0;
	            var deltaX = void 0;
	            var deltaY = void 0;
	            // Old school scrollwheel delta
	            if ("detail" in e) {
	                deltaY = e.detail * -1;
	            }
	            if ("wheelDelta" in e) {
	                deltaY = e.wheelDelta;
	            }
	            if ("wheelDeltaY" in e) {
	                deltaY = e.wheelDeltaY;
	            }
	            if ("wheelDeltaX" in e) {
	                deltaX = e.wheelDeltaX * -1;
	            }
	            // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
	            if ("axis" in e && e.axis === e.HORIZONTAL_AXIS) {
	                deltaX = deltaY * -1;
	                deltaY = 0;
	            }
	            // New school wheel delta (wheel event)
	            if ("deltaY" in e) {
	                deltaY = e.deltaY * -1;
	            }
	            if ("deltaX" in e) {
	                deltaX = e.deltaX;
	            }
	            // Need to convert lines and pages to pixels if we aren"t already in pixels
	            // There are three delta modes:
	            //   * deltaMode 0 is by pixels, nothing to do
	            //   * deltaMode 1 is by lines
	            //   * deltaMode 2 is by pages
	            if (e.deltaMode === 1) {
	                var lineHeight = _UtilsDOM2.default.getLineHeight();
	                deltaY = deltaY * lineHeight;
	                deltaX = deltaX * lineHeight;
	            } else if (e.deltaMode === 2) {
	                var windowhegiht = _UtilsWindow2.default.getHeight();
	                deltaY = deltaY * windowhegiht;
	                deltaX = deltaX * windowhegiht;
	            }
	            delta = deltaY === 0 ? deltaX : deltaY;
	            return delta;
	        } else {
	            return NaN;
	        }
	    };
	
	    return Mouse;
	}();
	
	exports.default = Mouse;

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with screen
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Screen = function () {
	    function Screen() {
	        _classCallCheck(this, Screen);
	    }
	
	    /**
	     * Get screen info
	     * @return {{availableSize: {height: number, width: number}, colorDepth: number, pixelRatio: number, size: {height: number, width: number}}}
	     */
	    Screen.getInfo = function getInfo() {
	        return {
	            availableSize: Screen.getAvailableSizes(),
	            colorDepth: Screen.getColorDepth(),
	            pixelRatio: Screen.getPixelRatio(),
	            size: Screen.getSizes()
	        };
	    };
	    /**
	     * Get screen height
	     * @returns {number}
	     */
	
	
	    Screen.getHeight = function getHeight() {
	        return screen.height;
	    };
	    /**
	     * Get screen width
	     * @returns {number}
	     */
	
	
	    Screen.getWidth = function getWidth() {
	        return screen.width;
	    };
	    /**
	     * Get screen sizes
	     * @return {{height: number, width: number}}
	     */
	
	
	    Screen.getSizes = function getSizes() {
	        return {
	            height: Screen.getHeight(),
	            width: Screen.getWidth()
	        };
	    };
	    /**
	     * Get screen height
	     * @returns {number}
	     */
	
	
	    Screen.getAvailableHeight = function getAvailableHeight() {
	        return screen.availHeight;
	    };
	    /**
	     * Get screen width
	     * @returns {number}
	     */
	
	
	    Screen.getAvailableWidth = function getAvailableWidth() {
	        return screen.availWidth;
	    };
	    /**
	     * Get screen sizes
	     * @return {{height: number, width: number}}
	     */
	
	
	    Screen.getAvailableSizes = function getAvailableSizes() {
	        return {
	            height: Screen.getAvailableHeight(),
	            width: Screen.getAvailableWidth()
	        };
	    };
	    /**
	     * Get screen pixel ratio
	     * @return {number}
	     */
	
	
	    Screen.getPixelRatio = function getPixelRatio() {
	        var ratio = 1;
	        if (typeof window.screen.systemXDPI !== "undefined" && typeof window.screen.logicalXDPI !== "undefined" && window.screen.systemXDPI > window.screen.logicalXDPI) {
	            ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
	        } else if (typeof window.devicePixelRatio !== "undefined") {
	            ratio = window.devicePixelRatio;
	        }
	        return ratio;
	    };
	    /**
	     * Get screen color depth
	     * @return {number}
	     */
	
	
	    Screen.getColorDepth = function getColorDepth() {
	        return screen.colorDepth;
	    };
	
	    return Screen;
	}();
	
	exports.default = Screen;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Class for working with system
	 */
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var System = function () {
	    function System() {
	        _classCallCheck(this, System);
	    }
	
	    /**
	     * Get system info
	     * @return {{name: string, version: string}}
	     */
	    System.getInfo = function getInfo() {
	        return {
	            name: System.getName(),
	            version: System.getVersion()
	        };
	    };
	    /**
	     * Get OS name
	     * @return {string}
	     */
	
	
	    System.getName = function getName() {
	        var os = "";
	        var clientStrings = [{
	            r: /(Windows 10.0|Windows NT 10.0)/,
	            s: "Windows 10"
	        }, {
	            r: /(Windows 8.1|Windows NT 6.3)/,
	            s: "Windows 8.1"
	        }, {
	            r: /(Windows 8|Windows NT 6.2)/,
	            s: "Windows 8"
	        }, {
	            r: /(Windows 7|Windows NT 6.1)/,
	            s: "Windows 7"
	        }, {
	            r: /Windows NT 6.0/,
	            s: "Windows Vista"
	        }, {
	            r: /Windows NT 5.2/,
	            s: "Windows Server 2003"
	        }, {
	            r: /(Windows NT 5.1|Windows XP)/,
	            s: "Windows XP"
	        }, {
	            r: /(Windows NT 5.0|Windows 2000)/,
	            s: "Windows 2000"
	        }, {
	            r: /(Win 9x 4.90|Windows ME)/,
	            s: "Windows ME"
	        }, {
	            r: /(Windows 98|Win98)/,
	            s: "Windows 98"
	        }, {
	            r: /(Windows 95|Win95|Windows_95)/,
	            s: "Windows 95"
	        }, {
	            r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
	            s: "Windows NT 4.0"
	        }, {
	            r: /Windows CE/,
	            s: "Windows CE"
	        }, {
	            r: /Win16/,
	            s: "Windows 3.11"
	        }, {
	            r: /Android/,
	            s: "Android"
	        }, {
	            r: /OpenBSD/,
	            s: "Open BSD"
	        }, {
	            r: /SunOS/,
	            s: "Sun OS"
	        }, {
	            r: /(Linux|X11)/,
	            s: "Linux"
	        }, {
	            r: /(iPhone|iPad|iPod)/,
	            s: "iOS"
	        }, {
	            r: /Mac OS X/,
	            s: "Mac OS X"
	        }, {
	            r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,
	            s: "Mac OS"
	        }, {
	            r: /QNX/,
	            s: "QNX"
	        }, {
	            r: /UNIX/,
	            s: "UNIX"
	        }, {
	            r: /BeOS/,
	            s: "BeOS"
	        }, {
	            r: /OS\/2/,
	            s: "OS/2"
	        }, {
	            r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
	            s: "Search Bot"
	        }];
	        for (var _iterator = clientStrings, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	            var _ref;
	
	            if (_isArray) {
	                if (_i >= _iterator.length) break;
	                _ref = _iterator[_i++];
	            } else {
	                _i = _iterator.next();
	                if (_i.done) break;
	                _ref = _i.value;
	            }
	
	            var cs = _ref;
	
	            if (cs.r.test(navigator.userAgent)) {
	                os = cs.s;
	                break;
	            }
	        }
	        return os;
	    };
	    /**
	     * Get OS version
	     * @return {string}
	     */
	
	
	    System.getVersion = function getVersion() {
	        var os = System.getName();
	        var osVersion = "";
	        if (/Windows/.test(os)) {
	            osVersion = /Windows (.*)/.exec(os)[1];
	            os = "Windows";
	        }
	        switch (os) {
	            case "Mac OS X":
	                osVersion = /Mac OS X (10[._\d]+)/.exec(navigator.userAgent)[1];
	                break;
	            case "Android":
	                osVersion = /Android ([._\d]+)/.exec(navigator.userAgent)[1];
	                break;
	            case "iOS":
	                var reg = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion);
	                osVersion = reg[1] + "." + reg[2] + "." + (reg[3] || 0);
	                break;
	            default:
	        }
	        return osVersion;
	    };
	
	    return System;
	}();
	
	exports.default = System;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Class for working with user
	 */
	
	exports.__esModule = true;
	
	var _UtilsBrowser = __webpack_require__(10);
	
	var _UtilsBrowser2 = _interopRequireDefault(_UtilsBrowser);
	
	var _UtilsScreen = __webpack_require__(22);
	
	var _UtilsScreen2 = _interopRequireDefault(_UtilsScreen);
	
	var _UtilsSystem = __webpack_require__(23);
	
	var _UtilsSystem2 = _interopRequireDefault(_UtilsSystem);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var User = function () {
	    function User() {
	        _classCallCheck(this, User);
	    }
	
	    /**
	     * Get user info
	     * @return {{browser: {browser: string, mobile: boolean, version: string}, screen: {availableSize: {height: number, width: number}, colorDepth: number, pixelRatio: number, size: {height: number, width: number}}, system: {name: string, version: string}}}
	     */
	    User.getInfo = function getInfo() {
	        return {
	            browser: _UtilsBrowser2.default.getInfo(),
	            screen: _UtilsScreen2.default.getInfo(),
	            system: _UtilsSystem2.default.getInfo()
	        };
	    };
	
	    return User;
	}();
	
	exports.default = User;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uPzVjYTYqKiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzE4YjE2N2NhNWI4MmRmMDY5Njg/ZGMzYioqIiwid2VicGFjazovLy8uL2xpYi9WaWV3QWJpbGl0eS50cz80MjkyKiIsIndlYnBhY2s6Ly8vLi9+L0FuaW1hdGlvbkZyYW1lL2xpYi9BbmltYXRpb25GcmFtZS50cz8xNGZiKiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlscy50cz8wMzgwKiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc0FuaW1hdGlvbi50cz8zODFkKiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc0FuaW1hdGlvbkVhc2luZy50cz9kOTNlKiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc0Jyb3dzZXIudHM/Y2ZmNSoiLCJ3ZWJwYWNrOi8vLy4vfi9VdGlscy9saWIvVXRpbHNDb29raWUudHM/MjYwYioiLCJ3ZWJwYWNrOi8vLy4vfi91cmwvdXJsLmpzP2Q2YTQqIiwid2VicGFjazovLy8uL34vdXJsL34vcHVueWNvZGUvcHVueWNvZGUuanM/ODdkZSoiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcz9jM2MyKiIsIndlYnBhY2s6Ly8vLi9+L3F1ZXJ5c3RyaW5nL2luZGV4LmpzP2ZjZTgqIiwid2VicGFjazovLy8uL34vcXVlcnlzdHJpbmcvZGVjb2RlLmpzP2MyNTAqIiwid2VicGFjazovLy8uL34vcXVlcnlzdHJpbmcvZW5jb2RlLmpzP2U4NmIqIiwid2VicGFjazovLy8uL34vVXRpbHMvbGliL1V0aWxzRG9jdW1lbnQudHM/MGZjOSoiLCJ3ZWJwYWNrOi8vLy4vfi9VdGlscy9saWIvVXRpbHNXaW5kb3cudHM/Y2JlZSoiLCJ3ZWJwYWNrOi8vLy4vfi9VdGlscy9saWIvVXRpbHNET00udHM/OWZiZSoiLCJ3ZWJwYWNrOi8vLy4vfi9VdGlscy9saWIvVXRpbHNNb3VzZS50cz9lNDI2KiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc1NjcmVlbi50cz8zMjk1KiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc1N5c3RlbS50cz84YWFmKiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlsc1VzZXIudHM/Zjk0NCoiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FBRUEscUdBQW9HLG1CQUFtQixFQUFFLG1CQUFtQiw4SEFBOEg7O0FBRTFROztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RixrREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUFzQixPQUFPO0FBQzdCLHVCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFDOztBQUVEOztBQUVBLDRCOzs7Ozs7QUN2WEE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsa0RBQWlELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFdko7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBLDRCQUEyQjtBQUMzQix1SkFBc0o7QUFDdEo7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsd0JBQXdCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQyxPQUFPO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBOEIsUUFBUTtBQUN0QztBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVSxNQUFNO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7bUNDbHNCQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBWSxPQUFPO0FBQ25CLGVBQWMsTUFBTTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLE1BQU07QUFDbEIs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Q0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDL0RBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RixrREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFDOztBQUVELDRCOzs7Ozs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUdBQW9HLG1CQUFtQixFQUFFLG1CQUFtQiw4SEFBOEg7O0FBRTFRLGtEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQsMEI7Ozs7OztBQzFFQTs7QUFFQTs7QUFFQSxxR0FBb0csbUJBQW1CLEVBQUUsbUJBQW1CLDhIQUE4SDs7QUFFMVE7O0FBRUE7O0FBRUEsdUNBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGLGtEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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VDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsMkpBQTBKO0FBQzFKOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBQzs7QUFFRCwwQjs7Ozs7O0FDcEtBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RixrREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCLFVBQVUsa0RBQWtELFdBQVcsZ0JBQWdCLDhCQUE4QixpREFBaUQsK0JBQStCLFdBQVc7QUFDak87QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQsd0IiLCJmaWxlIjoiLi9saWIvVmlld0FiaWxpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIlZpZXdBYmlsaXR5XCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlZpZXdBYmlsaXR5XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlZpZXdBYmlsaXR5XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDMxOGIxNjdjYTViODJkZjA2OTY4IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9BbmltYXRpb25GcmFtZSA9IHJlcXVpcmUoXCJBbmltYXRpb25GcmFtZVwiKTtcblxudmFyIF9BbmltYXRpb25GcmFtZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BbmltYXRpb25GcmFtZSk7XG5cbnZhciBfVXRpbHMgPSByZXF1aXJlKFwiVXRpbHNcIik7XG5cbnZhciBfVXRpbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEBjbGFzc1xuICpcbiAqIEBuYW1lIFZpZXdhYmlsaXR5XG4gKlxuICogQHN1bW1hcnkg0JrQu9Cw0YHRgSDQtNC70Y8g0L7RhtC10L3QutC4INC/0L7QutCw0LfQsCDQsdCw0L3QvdC10YDQvtCyXG4gKlxuICogQGRlc2NyaXB0aW9uINCa0LvQsNGB0YEg0L/RgNC40L3QuNC80LDQtdGCIElEINC40LvQuCBET00g0Y3Qu9C10LzQtdC90YIg0Lgg0LfQsNC/0YPRgdC60LDQtdGCIHdhdGNoZXIg0LrQvtGC0L7RgNGL0Lkg0L/RgNC+0LLQtdGA0Y/QtdGCINCy0LjQtNC40LzQvtGB0YLRjCDRjdC70LXQvNC10L3RgtCwXG4gKiDQutCw0Log0YLQsNC60L7QstC+0LPQviwg0YfRgtC+INC+0L0g0LjQu9C4INC10LPQviDRgNC+0LTQuNGC0LXQu9C4INC90LUg0YHQutGA0YvRgtGLLCDRh9GC0L4g0L7QvSDQtdGB0YLRjCDQsiDQtNC+0LrRg9C80LXQvdGC0LUg0Lgg0YIu0LQuINCX0LDRgtC10LwsINC00LvRjyDQstC40LTQuNC80YvRhSDRjdC70LXQvNC10L3RgtC+0LIsXG4gKiDRgNCw0YHRgdGH0LjRgtGL0LLQsNC10YLRgdGPINC/0YDQvtGG0LXQvdGCINCy0LjQtNC40LzQvtC5INC+0LHQu9Cw0YHRgtC4INC+0YIgMCDQtNC+IDEuINCV0YHQu9C4INC/0YDQvtGG0LXQvdGCINCy0LjQtNC40LzQvtC5INC+0LHQu9Cw0YHRgtC4INCx0L7Qu9GM0YjQtSBwZXJjZW50YWdlINC40Lcgb2JqU2V0dGluZyxcbiAqINGC0L7Qs9C00LAg0LfQsNC/0YPRgdC60LDQtdGC0YHRjyDQvtGC0YHRh9C10YIg0YLQsNC50LzQtdGA0LAuXG4gKiDQldGB0LvQuCDQv9GA0L7RhtC10L3RgiDQstC40LTQuNC80L7QuSDQvtCx0LvQsNGB0YLQuCDRgdGC0LDQuyDQvNC10L3RjNGI0LUg0L/QvtGA0L7Qs9C+0LLQvtCz0L4g0LfQvdCw0YfQtdC90LjRjywg0YLQviDRgtCw0LnQvNC10YAg0L7RgtC60LvRjtGH0LDQtdGC0YHRjy4g0JrQsNC6INGC0L7Qu9GM0LrQviDRgtCw0LnQvNC10YAg0L/RgNC10LLRi9GI0LDQtdGCINC/0L5cbiAqINCy0YDQtdC80LXQvdC4IHRpbWUg0LjQtyBvYmpTZXR0aW5nINCy0YvQt9GL0LLQsNC10YLRgdGPIGZ1bkNhbGxCYWNrINC4IHdhdGNoZXIg0YPQsdC40LLQsNC10YLRgdGPLlxuICpcbiAqINCV0YHQu9C4INCyINC60LvQsNGB0YEg0L/QtdGA0LXQtNCw0L0gSUQsINCwINC90LUgRE9NINGN0LvQtdC80LXQvdGCLCDRgtC+INC60LvQsNGB0YEg0YHQsNC8INC/0YvRgtCw0LXRgtGB0Y8g0L3QsNC50YLQuCDRgtCw0LrQvtC5INGN0LvQtdC80LXQvdGCINCyIERPTS4g0JXRgdC70Lgg0Y3Qu9C10LzQtdC90YLQsCDQvdC10YIsINGC0L5cbiAqINCy0LXRiNCw0LXRgtGB0Y8gd2F0Y2hlciwg0LrQvtGC0L7RgNGL0Lkg0L/Ri9GC0LDQtdGC0YHRjyDQvdCw0LnRgtC4INGN0LvQtdC80LXQvdGCINGB0L/Rg9GB0YLRjyDQutCw0LrQvtC1LdGC0L4g0LLRgNC10LzRjy4g0K3RgtC+INC/0L7Qt9Cy0L7Qu9GP0LXRgiDQv9C+0LLQtdGB0LjRgtGMIHdhdGNoZXIg0LTQu9GPINGN0LvQtdC80LXQvdGC0L7QsixcbiAqINC60L7RgtC+0YDRi9GFINC10YnQtSDQvdC10YIg0LIgRE9NINC4INC60L7RgtC+0YDRi9C1INC/0L7Rj9Cy0Y/RgtGB0Y8g0L/QvtGC0L7QvC5cbiAqXG4gKiDQldGB0LvQuCDQsiDQutC70LDRgdGBINC/0LXRgNC10LTQsNC9IERPTSDRjdC70LXQvNC10L3Rgiwg0YLQviDQsiDQv9Cw0YDQsNC80LXRgtGA0Ysg0LfQsNC/0LjRgdGL0LLQsNC10YLRgdGPINC40LvQuCDQtdCz0L4gSUQg0LjQu9C4INGB0LPQtdC90LXRgNC40YDQvtCy0LDQvdC90YvQuSBJRCDQtNC70Y8g0LTQsNC70YzQvdC10LnRiNC10LlcbiAqINC+0LHRgNCw0LHQvtGC0LrQuC5cbiAqIElEINGC0LDQutC20LUg0L/QtdGA0LXQtNCw0LXRgtGB0Y8g0LIgZnVuQ2FsbEJhY2suXG4gKlxuICogQHBhcmFtIGRvbUVsZW1lbnQge09iamVjdH0gLSDQrdC70LXQvNC10L3RgiBET00g0LjQu9C4IElEXG4gKiBAcGFyYW0gb2JqU2V0dGluZyB7T2JqZWN0fSAtINCe0LHRitC10LrRgiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4INC+0YLRgdC70LXQttC40LLQsNC90LjRjyDQstC40LTQsFxuICoge1xuICogIHBlcmNlbnRhZ2U6IDAuNSwgLSDQn9GA0L7RhtC10L3RgiDQstC40LTQuNC80L7QuSDRh9Cw0YHRgtC4INCx0LDQvdC90LXRgNCwLCDQv9GA0Lgg0LrQvtGC0L7RgNC+0Lkg0L7QvSDQsdGD0LTQtdGCINC30LDRgdGH0LjRgtCw0L0gKNC+0YIgMCDQtNC+IDEpXG4gKiAgdGltZTogMTAwMCAtINCS0YDQtdC80Y8g0LIg0YLQtdGH0LXQvdC40Lgg0LrQvtGC0L7RgNC+0LPQviDQtNC+0LvQttC90LAg0LHRi9GC0Ywg0LLQuNC00L3QsCDQstC40LTQuNC80LDRjyDRh9Cw0YHRgtGMINCx0LDQvdC90LXRgNCwICjQsiDQvNC40LvQu9C40YHQtdC60YPQvdC00LDRhSDQvtGCIDAg0LTQviA2MCAwMDApXG4gKiB9XG4gKiBAcGFyYW0gZnVuQ2FsbEJhY2sge0Z1bmN0aW9ufSAtINCk0YPQvdC60YbQuNGPIENhbGxiYWNrLCDQutC+0YLQvtGA0LDRjyDQstGL0LfRi9Cy0LDQtdGC0YHRjyDQv9C+0YHQu9C1INGC0L7Qs9C+INC60LDQuiDQv9C+0LvRjNC30L7QstCw0YLQtdC70Ywg0YPQstC40LTQtdC7INC+0L/RgNC10LTQtdC70LXQvdC90YPRjlxuICog0YfQsNGB0YLRjCDQsdCw0L3QtdGA0LAg0L7Qv9GA0LXQtNC10LvQtdC90L3QvtC1INCy0YDQtdC80Y9cbiAqL1xudmFyIFZpZXdBYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogSW5pdFxuICAgKiBAcGFyYW0gZG9tRWxlbWVudFxuICAgKiBAcGFyYW0gb2JqU2V0dGluZ1xuICAgKiBAcGFyYW0gZnVuQ2FsbEJhY2tcbiAgICovXG4gIGZ1bmN0aW9uIFZpZXdBYmlsaXR5KGRvbUVsZW1lbnQsIG9ialNldHRpbmcpIHtcbiAgICB2YXIgZnVuQ2FsbEJhY2sgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFZpZXdBYmlsaXR5KTtcblxuICAgIC8qKlxuICAgICAqINCV0YHQu9C4INC/0LXRgNC10LTQsNC9IERPTSDRjdC70LXQvNC10L3RglxuICAgICAqL1xuICAgIGlmIChkb21FbGVtZW50ICYmICh0eXBlb2YgZG9tRWxlbWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGRvbUVsZW1lbnQpKSA9PT0gXCJvYmplY3RcIiAmJiBkb21FbGVtZW50Lm5vZGVUeXBlID09PSAxICYmIGRvbUVsZW1lbnQucGFyZW50RWxlbWVudCAmJiBkb21FbGVtZW50LnBhcmVudEVsZW1lbnQubm9kZU5hbWUgIT09IFwiSFRNTFwiKSB7XG4gICAgICBkb21FbGVtZW50LmlkID0gdGhpcy5JRCA9IGRvbUVsZW1lbnQuaWQgfHwgVmlld0FiaWxpdHkuZ2V0SUQoKTtcbiAgICB9IGVsc2UgaWYgKGRvbUVsZW1lbnQgJiYgdHlwZW9mIGRvbUVsZW1lbnQgPT09IFwic3RyaW5nXCIgJiYgZG9tRWxlbWVudC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLklEID0gZG9tRWxlbWVudC50b1N0cmluZygpO1xuICAgICAgZG9tRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiXCIgKyB0aGlzLklEKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9tRWxlbWVudCA9IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqINCV0YHQu9C4INCy0YLQvtGA0YvQvCDQv9Cw0YDQsNC80LXRgtGA0L7QvCDQv9C10YDQtdC00LDQvdGLINC90LUg0L/QsNGA0LDQvNC10YLRgNGLXG4gICAgICovXG4gICAgaWYgKCFvYmpTZXR0aW5nIHx8ICh0eXBlb2Ygb2JqU2V0dGluZyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9ialNldHRpbmcpKSAhPT0gXCJvYmplY3RcIikge1xuICAgICAgb2JqU2V0dGluZyA9IHtcbiAgICAgICAgcGVyY2VudGFnZTogMC41LFxuICAgICAgICB0aW1lOiAxMDAwXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAvKipcbiAgICAgICAqINCf0LDRgNGB0LjQvCDQv9GA0L7RhtC10L3RgiDQstC40LTQtdC80L7QuSDRh9Cw0YHRgtC4INC4INC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0LfQvdCw0YfQtdC90LjQtSDQv9C+INGD0LzQvtC70YfQsNC90LjRjiwg0LXRgdC70Lgg0L/QtdGA0LXQtNCw0L3QvlxuICAgICAgICog0L3QtSDQstCw0LvQuNC00L3QvtC1INC30L3QsNGH0LXQvdC40LVcbiAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgKi9cbiAgICAgIGlmIChvYmpTZXR0aW5nLnBlcmNlbnRhZ2UpIHtcbiAgICAgICAgb2JqU2V0dGluZy5wZXJjZW50YWdlID0gcGFyc2VGbG9hdChvYmpTZXR0aW5nLnBlcmNlbnRhZ2UpO1xuICAgICAgICBpZiAob2JqU2V0dGluZy5wZXJjZW50YWdlKSB7XG4gICAgICAgICAgb2JqU2V0dGluZy5wZXJjZW50YWdlID0gb2JqU2V0dGluZy5wZXJjZW50YWdlIDwgMCA/IDAgOiBvYmpTZXR0aW5nLnBlcmNlbnRhZ2U7XG4gICAgICAgICAgb2JqU2V0dGluZy5wZXJjZW50YWdlID0gb2JqU2V0dGluZy5wZXJjZW50YWdlID4gMSA/IDEgOiBvYmpTZXR0aW5nLnBlcmNlbnRhZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqU2V0dGluZy5wZXJjZW50YWdlID0gMC41O1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmpTZXR0aW5nLnBlcmNlbnRhZ2UgPSAwLjU7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqINCf0LDRgNGB0LjQvCDQstGA0LXQvNGPINCy0LjQtNC40LzQvtGB0YLQuCDQuCDQv9GA0LjRgdCy0LDQuNCy0LDQtdC8INC30L3QsNGH0LXQvdC40LUg0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4sINC10YHQu9C4INC/0LXRgNC10LTQsNC90L4g0L3QtSDQstCw0LvQuNC00L3QvtC1INC30L3QsNGH0LXQvdC40LVcbiAgICAgICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAgICAgKi9cbiAgICAgIGlmIChvYmpTZXR0aW5nLnRpbWUpIHtcbiAgICAgICAgb2JqU2V0dGluZy50aW1lID0gcGFyc2VJbnQob2JqU2V0dGluZy50aW1lLCAxMCk7XG4gICAgICAgIGlmIChvYmpTZXR0aW5nLnRpbWUpIHtcbiAgICAgICAgICBvYmpTZXR0aW5nLnRpbWUgPSBvYmpTZXR0aW5nLnRpbWUgPCAwID8gMCA6IG9ialNldHRpbmcudGltZTtcbiAgICAgICAgICBvYmpTZXR0aW5nLnRpbWUgPSBvYmpTZXR0aW5nLnRpbWUgPiA2MDAwMCA/IDYwMDAwIDogb2JqU2V0dGluZy50aW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ialNldHRpbmcudGltZSA9IDEwMDA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialNldHRpbmcudGltZSA9IDEwMDA7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqINCf0YDQvtCy0LXRgNGP0LXQvCwg0YfRgtC+INCyINC60LDRh9C10YHRgtCy0LUg0LrQvtC70LHQtdC60LAg0L/QtdGA0LXQtNCw0L3QsCDRhNGD0L3QutGG0LjRj1xuICAgICAqL1xuICAgIGlmICghZnVuQ2FsbEJhY2sgfHwgdHlwZW9mIGZ1bkNhbGxCYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGZ1bkNhbGxCYWNrID0gZnVuY3Rpb24gZnVuQ2FsbEJhY2soSUQpIHt9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDQldGB0LvQuCBET00g0Y3Qu9C10LzQtdC90YIg0L/QtdGA0LXQtNCw0L0g0LjQu9C4INC90LDQudC00LXQvVxuICAgICAqL1xuICAgIGlmICgoZG9tRWxlbWVudCB8fCB0eXBlb2YgdGhpcy5JRCA9PT0gXCJzdHJpbmdcIikgJiYgKHR5cGVvZiBvYmpTZXR0aW5nID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqU2V0dGluZykpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmpTZXR0aW5nLnBlcmNlbnRhZ2UgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIG9ialNldHRpbmcudGltZSA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgZnVuQ2FsbEJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgLyoqXG4gICAgICAgKiDQn9C+0LTQv9C40YHQutC4INC90LAg0YHQvtCx0YvRgtC40Y8g0L7QutC90LBcbiAgICAgICAqL1xuICAgICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIFZpZXdBYmlsaXR5LnJlc2l6ZUV2ZW50KTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBWaWV3QWJpbGl0eS5yZXNpemVFdmVudCk7XG4gICAgICB9IGVsc2UgaWYgKHdpbmRvdy5hdHRhY2hFdmVudCkge1xuICAgICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbnJlc2l6ZVwiLCBWaWV3QWJpbGl0eS5yZXNpemVFdmVudCk7XG4gICAgICB9XG4gICAgICAvKipcbiAgICAgICAqINCl0LDQuiDQtNC70Y8g0YDRg9GH0L3QvtCz0L4g0YHQsdGA0L7RgdCwINGA0LXRgdCw0LnQt9C90L7Qs9C+INC60LXRiNCwINGA0LDQtyDQsiDRgdC10LrQutGD0L3QtNGDLCDQvdCwINCy0YHRj9C60LjQuSDRgdC70YPRh9Cw0LlcbiAgICAgICAqL1xuICAgICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBWaWV3QWJpbGl0eS5yZXNpemVFdmVudCgpO1xuICAgICAgfSwgMTAwMCk7XG4gICAgICAvKipcbiAgICAgICAqINCg0YPRh9C90L7QuSDRgdC90L7RgSDQutC10YjQsCDQtNC70Y8g0L/QtdGA0LXQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCDQv9C10YDQtdC80LXQvdC90YvRhSDQutC10YjQsFxuICAgICAgICovXG4gICAgICBWaWV3QWJpbGl0eS5yZXNpemVFdmVudCgpO1xuICAgICAgLyoqXG4gICAgICAgKiDQl9Cw0LTQsNC10Lwg0L/QsNGA0LDQvNC10YLRgNGLINC4INC90LDRh9C40L3QsNC10Lwg0L7RgtGB0LvQtdC20LjQstCw0YLRjFxuICAgICAgICovXG4gICAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuICAgICAgdGhpcy5vYmpTZXR0aW5nID0gb2JqU2V0dGluZztcbiAgICAgIHRoaXMuZnVuQ2FsbEJhY2sgPSBmdW5DYWxsQmFjaztcbiAgICAgIHRoaXMuYm9vVGltZXJGbGFnID0gZmFsc2U7XG4gICAgICB0aGlzLndhdGNoSUQgPSBfQW5pbWF0aW9uRnJhbWUyLmRlZmF1bHQuc3Vic2NyaWJlKHRoaXMsIHRoaXMud2F0Y2gsIFtdKTtcbiAgICAgIF9VdGlsczIuZGVmYXVsdC5pbXBsZW1lbnRhdGlvblN0YXRpY01ldGhvZHModGhpcywgXCJWaWV3QWJpbGl0eVwiKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqINCh0L7QsdGL0YLQuNC1INGA0LXRgdCw0LnQt9CwINC00LvRjyDRgdCx0YDQvtGB0LAg0LLRgNC10LzQtdC90L3Ri9GFINC60LXRiNC10LIg0YDQsNC30LzQtdGA0L7QsiDQvtC60L3QsCwg0LTQvtC60YPQvNC10L3RgtCwINC4INCy0YvRgdGH0LjRgtCw0L3QvdGL0YUg0YHRgtC40LvQtdC5INGN0LvQtdC80LXQvdGC0L7QslxuICAgKi9cblxuXG4gIFZpZXdBYmlsaXR5LnJlc2l6ZUV2ZW50ID0gZnVuY3Rpb24gcmVzaXplRXZlbnQoKSB7XG4gICAgVmlld0FiaWxpdHkubnVtRG9jdW1lbnRXaWR0aCA9IGZhbHNlO1xuICAgIFZpZXdBYmlsaXR5Lm51bURvY3VtZW50SGVpZ2h0ID0gZmFsc2U7XG4gICAgVmlld0FiaWxpdHkubnVtV2luZG93V2lkdGggPSBmYWxzZTtcbiAgICBWaWV3QWJpbGl0eS5udW1XaW5kb3dIZWlnaHQgPSBmYWxzZTtcbiAgICBWaWV3QWJpbGl0eS5hcnJEb21TdHlsZSA9IFtdO1xuICB9O1xuXG4gIC8qKlxuICAgKiDQnNC10YLQvtC0INC00LvRjyDQs9C10L3QtdGA0LDRhtC40LggVUlEXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBWaWV3QWJpbGl0eS5nZXRJRCA9IGZ1bmN0aW9uIGdldElEKCkge1xuICAgIHJldHVybiBcInZfXCIgKyBEYXRlLm5vdygpICsgXCJfXCIgKyB+fihNYXRoLnJhbmRvbSgpICogMWU2KTtcbiAgfTtcblxuICAvKipcbiAgICog0KDQsNGB0YfQtdGCINGB0YLQuNC70LXQuSDRjdC70LXQvNC10L3RgtCwXG4gICAqIEBwYXJhbSBkb21Ob2RlXG4gICAqIEByZXR1cm5zIHtDU1NTdHlsZURlY2xhcmF0aW9ufVxuICAgKi9cbiAgVmlld0FiaWxpdHkuZ2V0Q29tcHV0ZWRTdHlsZSA9IGZ1bmN0aW9uIGdldENvbXB1dGVkU3R5bGUoZG9tTm9kZSkge1xuICAgIGlmICghZG9tTm9kZS52aWV3YWJpbGl0eSB8fCAhVmlld0FiaWxpdHkuYXJyRG9tU3R5bGVbZG9tTm9kZS52aWV3YWJpbGl0eV0pIHtcbiAgICAgIGlmICghZG9tTm9kZS52aWV3YWJpbGl0eSkge1xuICAgICAgICBkb21Ob2RlLnZpZXdhYmlsaXR5ID0gdGhpcy5nZXRJRCgpO1xuICAgICAgfVxuICAgICAgVmlld0FiaWxpdHkuYXJyRG9tU3R5bGVbZG9tTm9kZS52aWV3YWJpbGl0eV0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb21Ob2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIFZpZXdBYmlsaXR5LmFyckRvbVN0eWxlW2RvbU5vZGUudmlld2FiaWxpdHldO1xuICB9O1xuXG4gIC8qKlxuICAgKiDQntC/0YDQtdC00LXQu9C10L3QuNC1INCy0YvRgdC+0YLRiyDQvtC60L3QsFxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSAtINCS0YvRgdC+0YLQsCDQvtC60L3QsFxuICAgKi9cbiAgVmlld0FiaWxpdHkuZ2V0V2luZG93SGVpZ2h0ID0gZnVuY3Rpb24gZ2V0V2luZG93SGVpZ2h0KCkge1xuICAgIGlmICghVmlld0FiaWxpdHkubnVtV2luZG93SGVpZ2h0KSB7XG4gICAgICBWaWV3QWJpbGl0eS5udW1XaW5kb3dIZWlnaHQgPSBfVXRpbHMyLmRlZmF1bHQuV2luZG93LmdldEhlaWdodCgpO1xuICAgIH1cbiAgICByZXR1cm4gVmlld0FiaWxpdHkubnVtV2luZG93SGVpZ2h0IHx8IDA7XG4gIH07XG5cbiAgLyoqXG4gICAqINCe0L/RgNC10LTQtdC70LXQvdC40LUg0LLRi9GB0L7RgtGLINC00L7QutGD0LzQtdC90YLQsFxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSAtINCS0YvRgdC+0YLQsCDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICovXG4gIFZpZXdBYmlsaXR5LmdldERvY3VtZW50SGVpZ2h0ID0gZnVuY3Rpb24gZ2V0RG9jdW1lbnRIZWlnaHQoKSB7XG4gICAgaWYgKCFWaWV3QWJpbGl0eS5udW1Eb2N1bWVudEhlaWdodCkge1xuICAgICAgVmlld0FiaWxpdHkubnVtRG9jdW1lbnRIZWlnaHQgPSBfVXRpbHMyLmRlZmF1bHQuRG9jdW1lbnQuZ2V0SGVpZ2h0KCk7XG4gICAgfVxuICAgIHJldHVybiBWaWV3QWJpbGl0eS5udW1Eb2N1bWVudEhlaWdodCB8fCAwO1xuICB9O1xuXG4gIC8qKlxuICAgKiDQntC/0YDQtdC00LXQu9C10L3QuNC1INGI0LjRgNC40L3RiyDQvtC60L3QsFxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSAtINCo0LjRgNC40L3QsCDQvtC60L3QsFxuICAgKi9cbiAgVmlld0FiaWxpdHkuZ2V0V2luZG93V2lkdGggPSBmdW5jdGlvbiBnZXRXaW5kb3dXaWR0aCgpIHtcbiAgICBpZiAoIVZpZXdBYmlsaXR5Lm51bVdpbmRvd1dpZHRoKSB7XG4gICAgICBWaWV3QWJpbGl0eS5udW1XaW5kb3dXaWR0aCA9IF9VdGlsczIuZGVmYXVsdC5XaW5kb3cuZ2V0V2lkdGgoKTtcbiAgICB9XG4gICAgcmV0dXJuIFZpZXdBYmlsaXR5Lm51bVdpbmRvd1dpZHRoIHx8IDA7XG4gIH07XG5cbiAgLyoqXG4gICAqINCe0L/RgNC10LTQtdC70LXQvdC40LUg0YjQuNGA0LjQvdGLINC00L7QutGD0LzQtdC90YLQsFxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSAtINCo0LjRgNC40L3QsCDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICovXG4gIFZpZXdBYmlsaXR5LmdldERvY3VtZW50V2lkdGggPSBmdW5jdGlvbiBnZXREb2N1bWVudFdpZHRoKCkge1xuICAgIGlmICghVmlld0FiaWxpdHkubnVtRG9jdW1lbnRXaWR0aCkge1xuICAgICAgVmlld0FiaWxpdHkubnVtRG9jdW1lbnRXaWR0aCA9IF9VdGlsczIuZGVmYXVsdC5Eb2N1bWVudC5nZXRXaWR0aCgpO1xuICAgIH1cbiAgICByZXR1cm4gVmlld0FiaWxpdHkubnVtRG9jdW1lbnRXaWR0aCB8fCAwO1xuICB9O1xuXG4gIC8qKlxuICAgKiDQntC/0YDQtdC00LXQu9C10L3QuNC1INC/0L7Qu9C+0LbQtdC90Lgg0Lgg0YDQsNC30LzQtdGA0L7QsiDRjdC70LXQvNC10L3RgtCwXG4gICAqXG4gICAqIEBwYXJhbSBkb21Ob2RlIHtPYmplY3R9IC0gRE9NINGN0LvQtdC80LXQvdGCXG4gICAqIEByZXR1cm5zIHt7bGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyLCB0b3A6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfX0gLVxuICAgKiDQnNCw0YHRgdC40LIg0YEg0L/QsNGA0LDQvNC10YLRgNCw0LzQuCDRgNCw0LfQvNC10YDQvtCyINC4INC/0L7Qu9C+0LbQtdC90LjRj1xuICAgKi9cbiAgVmlld0FiaWxpdHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID0gZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGRvbU5vZGUpIHtcbiAgICByZXR1cm4gX1V0aWxzMi5kZWZhdWx0LkRPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoZG9tTm9kZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqINCc0LXRgtC+0LQg0LTQu9GPINC+0L/RgNC10LTQtdC70LXQvdC40Y8g0L/RgNC+0YbQtdC90YLQsCDQstC40LTQuNC80L7QuSDRh9Cw0YHRgtC4INCx0LDQvdC90LXRgNCwINC90LAg0Y3QutGA0LDQvdC1INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRj1xuICAgKlxuICAgKiBAcGFyYW0gb2JqU2l6ZXMge3tsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIHRvcDogbnVtYmVyLCBib3R0b206IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9fSAtXG4gICAqINCc0LDRgdGB0LjQsiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4INGA0LDQt9C80LXRgNC+0LIg0Lgg0L/QvtC70L7QttC10L3QuNGPXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IC0g0JrQvtGN0YTRhNC40YbQuNC10L3RgiDQstC40LTQuNC80L7RgdGC0Lgg0Y3Qu9C10LzQtdC90YLQsCDQvtGCIDAg0LTQviAxXG4gICAqL1xuICBWaWV3QWJpbGl0eS5jYWxjVmlzaWJpbGl0eSA9IGZ1bmN0aW9uIGNhbGNWaXNpYmlsaXR5KG9ialNpemVzKSB7XG4gICAgLyoqXG4gICAgICog0J7Qv9GA0LXQtNC10LvRj9C10Lwg0LLRi9GB0L7RgtGDINC+0LrQvdCwXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB2YXIgX251bVdpbmRvd0hlaWdodCA9IFZpZXdBYmlsaXR5LmdldFdpbmRvd0hlaWdodCgpO1xuICAgIHZhciBudW1XaW5kb3dIZWlnaHQgPSB0eXBlb2YgX251bVdpbmRvd0hlaWdodCA9PT0gXCJudW1iZXJcIiA/IF9udW1XaW5kb3dIZWlnaHQgOiAwO1xuICAgIC8qKlxuICAgICAqINCe0L/RgNC10LTQtdC70Y/QtdC8INCy0LXRgNGF0L3RjtGOINC4INC90LjQttC90Y7RjiDQstC40LTQuNC80YvQtSDQs9GA0LDQvdC40YbRiyDRjdC70LXQvNC10L3RgtCwXG4gICAgICovXG4gICAgdmFyIG51bUVsZW1lbnRTY3JvbGxUb3BGcm9tID0gb2JqU2l6ZXMudG9wIDwgMCA/IDAgOiBvYmpTaXplcy50b3A7XG4gICAgdmFyIG51bUVsZW1lbnRTY3JvbGxUb3BUbyA9IG9ialNpemVzLmJvdHRvbSA+IG51bVdpbmRvd0hlaWdodCA/IG51bVdpbmRvd0hlaWdodCA6IG9ialNpemVzLmJvdHRvbTtcbiAgICAvKipcbiAgICAgKiDQntC/0YDQtdC00LXQu9GP0LXQvCDQstC40LTQuNC80YPRjiDQuCDQvNCw0LrRgdC40LzQsNC70YzQvdC+INCy0L7Qt9C80L7QttC90YPRjiDQstC40LTQuNC80YPRjiDQvtCx0LvQsNGB0YLQuCDRjdC70LXQvNC10L3RgtCwINC/0L4g0LLRi9GB0L7RgtC1XG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB2YXIgbnVtRWxlbWVudFZpZXdIZWlnaHQgPSBudW1FbGVtZW50U2Nyb2xsVG9wVG8gLSBudW1FbGVtZW50U2Nyb2xsVG9wRnJvbTtcbiAgICB2YXIgbnVtRWxlbWVudE1heFZpZXdIZWlnaHQgPSBvYmpTaXplcy5oZWlnaHQgPCBudW1XaW5kb3dIZWlnaHQgPyBvYmpTaXplcy5oZWlnaHQgOiBudW1XaW5kb3dIZWlnaHQ7XG4gICAgLyoqXG4gICAgICog0JLRi9GH0LjRgdC70Y/QtdC8INC/0YDQvtGG0LXQvdGCINCy0LjQtNC40LzQvtC5INGH0LDRgdGC0Lgg0L/QviDQstGL0YHQvtGC0LVcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHZhciBudW1FbGVtZW50Vmlld0hlaWdodFBhdGggPSBudW1FbGVtZW50Vmlld0hlaWdodCAvIG51bUVsZW1lbnRNYXhWaWV3SGVpZ2h0O1xuICAgIC8qKlxuICAgICAqINCe0LHRgNC10LfQsNC10Lwg0LfQvdCw0YfQtdC90LjQtSDQstC40LTQuNC80L7RgdGC0Lgg0LIg0LTQuNCw0L/QsNC30L7QvdC1INC+0YIgMCDQtNC+IDFcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIG51bUVsZW1lbnRWaWV3SGVpZ2h0UGF0aCA9IG51bUVsZW1lbnRWaWV3SGVpZ2h0UGF0aCA8IDAgPyAwIDogbnVtRWxlbWVudFZpZXdIZWlnaHRQYXRoO1xuICAgIG51bUVsZW1lbnRWaWV3SGVpZ2h0UGF0aCA9IG51bUVsZW1lbnRWaWV3SGVpZ2h0UGF0aCA+IDEgPyAxIDogbnVtRWxlbWVudFZpZXdIZWlnaHRQYXRoO1xuICAgIC8qKlxuICAgICAqINCe0L/RgNC10LTQtdC70Y/QtdC8INGI0LjRgNC40L3RgyDQvtC60L3QsFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdmFyIF9udW1XaW5kb3dXaWR0aCA9IFZpZXdBYmlsaXR5LmdldFdpbmRvd1dpZHRoKCk7XG4gICAgdmFyIG51bVdpbmRvd1dpZHRoID0gdHlwZW9mIF9udW1XaW5kb3dXaWR0aCA9PT0gXCJudW1iZXJcIiA/IF9udW1XaW5kb3dXaWR0aCA6IDA7XG4gICAgLyoqXG4gICAgICog0J7Qv9GA0LXQtNC10LvRj9C10Lwg0LvQtdCy0YPRjiDQuCDQv9GA0LDQstGD0Y4g0LLQuNC00LjQvNGL0LUg0LPRgNCw0L3QuNGG0Ysg0Y3Qu9C10LzQtdC90YLQsFxuICAgICAqL1xuICAgIHZhciBudW1FbGVtZW50U2Nyb2xsTGVmdEZyb20gPSBvYmpTaXplcy5sZWZ0IDwgMCA/IDAgOiBvYmpTaXplcy5sZWZ0O1xuICAgIHZhciBudW1FbGVtZW50U2Nyb2xsTGVmdFRvID0gb2JqU2l6ZXMucmlnaHQgPiBudW1XaW5kb3dXaWR0aCA/IG51bVdpbmRvd1dpZHRoIDogb2JqU2l6ZXMucmlnaHQ7XG4gICAgLyoqXG4gICAgICog0J7Qv9GA0LXQtNC10LvRj9C10Lwg0LLQuNC00LjQvNGD0Y4g0Lgg0LzQsNC60YHQuNC80LDQu9GM0L3QviDQstC+0LfQvNC+0LbQvdGD0Y4g0LLQuNC00LjQvNGD0Y4g0L7QsdC70LDRgdGC0Lgg0Y3Qu9C10LzQtdC90YLQsCDQv9C+INGI0LjRgNC40L3QtVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdmFyIG51bUVsZW1lbnRWaWV3V2lkdGggPSBudW1FbGVtZW50U2Nyb2xsTGVmdFRvIC0gbnVtRWxlbWVudFNjcm9sbExlZnRGcm9tO1xuICAgIHZhciBudW1FbGVtZW50TWF4Vmlld1dpZHRoID0gb2JqU2l6ZXMud2lkdGggPCBudW1XaW5kb3dXaWR0aCA/IG9ialNpemVzLndpZHRoIDogbnVtV2luZG93V2lkdGg7XG4gICAgLyoqXG4gICAgICog0JLRi9GH0LjRgdC70Y/QtdC8INC/0YDQvtGG0LXQvdGCINCy0LjQtNC40LzQvtC5INGH0LDRgdGC0Lgg0L/QviDRiNC40YDQuNC90LVcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHZhciBudW1FbGVtZW50Vmlld1dpZHRoUGF0aCA9IG51bUVsZW1lbnRWaWV3V2lkdGggLyBudW1FbGVtZW50TWF4Vmlld1dpZHRoO1xuICAgIC8qKlxuICAgICAqINCe0LHRgNC10LfQsNC10Lwg0LfQvdCw0YfQtdC90LjQtSDQstC40LTQuNC80L7RgdGC0Lgg0LIg0LTQuNCw0L/QsNC30L7QvdC1INC+0YIgMCDQtNC+IDFcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIG51bUVsZW1lbnRWaWV3V2lkdGhQYXRoID0gbnVtRWxlbWVudFZpZXdXaWR0aFBhdGggPCAwID8gMCA6IG51bUVsZW1lbnRWaWV3V2lkdGhQYXRoO1xuICAgIG51bUVsZW1lbnRWaWV3V2lkdGhQYXRoID0gbnVtRWxlbWVudFZpZXdXaWR0aFBhdGggPiAxID8gMSA6IG51bUVsZW1lbnRWaWV3V2lkdGhQYXRoO1xuICAgIC8qKlxuICAgICAqINCS0YvRh9C40YHQu9GP0LXQvCDQv9GA0L7RhtC10L3RgiDQstC40LTQuNC80L7QuSDQv9C+0YnQsNC00LhcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHZhciBudW1FbGVtZW50Vmlld1BhdGggPSBudW1FbGVtZW50Vmlld0hlaWdodFBhdGggKiBudW1FbGVtZW50Vmlld1dpZHRoUGF0aDtcbiAgICAvKipcbiAgICAgKiDQntCx0YDQtdC30LDQtdC8INC30L3QsNGH0LXQvdC40LUg0LLQuNC00LjQvNC+0YHRgtC4INCyINC00LjQsNC/0LDQt9C+0L3QtSDQvtGCIDAg0LTQviAxXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICBudW1FbGVtZW50Vmlld1BhdGggPSBudW1FbGVtZW50Vmlld1BhdGggPCAwID8gMCA6IG51bUVsZW1lbnRWaWV3UGF0aDtcbiAgICBudW1FbGVtZW50Vmlld1BhdGggPSBudW1FbGVtZW50Vmlld1BhdGggPiAxID8gMSA6IG51bUVsZW1lbnRWaWV3UGF0aDtcbiAgICAvKipcbiAgICAgKiDQktC+0LfQstGA0LDRidCw0LXQvCDQv9GA0L7RhtC10L3RgiDQstC40LTQuNC80L7QuSDQv9C70L7RidCw0LTQuCDQsiDQtNC40LDQv9Cw0LfQvtC90LUg0L7RgiAwINC00L4gMVxuICAgICAqL1xuICAgIHJldHVybiBudW1FbGVtZW50Vmlld1BhdGg7XG4gIH07XG5cbiAgLyoqXG4gICAqICog0J7Qv9GA0LXQtNC10LvQtdC90LjQtSDQstC40LTQuNC80L7RgdGC0Lgg0Y3Qu9C10LzQtdC90YLQsCDQstC+0L7QsdGJ0LVcbiAgICpcbiAgICogQHBhcmFtIGRvbU5vZGUge09iamVjdH0gLSDQrdC70LXQvNC10L3RgiBET00g0LTQtdGA0LXQstCwXG4gICAqIEBwYXJhbSBib29FbGVtZW50IHtib29sZWFufSAtINCV0YHQu9C4INGN0YLQviDRgdCw0Lwg0LHQsNC90L3QtdGALCDQsCDQvdC1INGA0L7QtNC40YLQtdC70YxcbiAgICogQHBhcmFtIG51bURvY3VtZW50V2lkdGggLSDQqNC40YDQuNC90LAg0LTQvtC60YPQvNC10L3RgtCwXG4gICAqIEBwYXJhbSBudW1Eb2N1bWVudEhlaWdodCAtINCS0YvRgdC+0YLQsCDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0g0KTQu9Cw0LMg0LLQuNC00LjQvNC+0YHRgtC4INGN0LvQtdC80LXQvdGC0LBcbiAgICovXG4gIFZpZXdBYmlsaXR5LmlzVmlzaWJsZSA9IGZ1bmN0aW9uIGlzVmlzaWJsZShkb21Ob2RlLCBib29FbGVtZW50LCBudW1Eb2N1bWVudFdpZHRoLCBudW1Eb2N1bWVudEhlaWdodCkge1xuICAgIC8qKlxuICAgICAqIFRPRE86INC90LUg0YPRh9C40YLRi9Cy0LDRgtGMINGA0L7QtNC40YLQtdC70LXQuSDQtdGB0LvQuCBwb3NpdGlvbiBmaXhlZFxuICAgICAqL1xuICAgIC8qKlxuICAgICAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INGE0LvQsNCzINCy0LjQtNC40LzQvtGB0YLQuCDQuCDQstGL0YfQuNGB0LvRj9C10Lwg0YDQsNC30LzQtdGA0Ysg0Y3Qu9C10LzQtdC90YLQsFxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHZhciBib29WaXNpYmxlID0gdHJ1ZTtcbiAgICB2YXIgb2JqU2l6ZXMgPSBWaWV3QWJpbGl0eS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoZG9tTm9kZSk7XG4gICAgLyoqXG4gICAgICog0JXRgdC70Lgg0YMg0Y3Qu9C10LzQtdC90YLQsCDQvdC10YIg0YjQuNGA0LjQvdGLINC40LvQuCDQstGL0YHQvtGC0Ysg0YLQviDQvtC9INC40LvQuCDRgdC60YDRi9GCINC40LvQuCDRgyDQvdC10LPQviDQvdC10YIg0YDQsNC30LzQtdGA0L7QslxuICAgICAqL1xuICAgIGlmICghKG9ialNpemVzLndpZHRoICYmIG9ialNpemVzLmhlaWdodCkgJiYgKGJvb0VsZW1lbnQgfHwgZG9tTm9kZS5zdHlsZS5vdmVyZmxvdyAhPT0gXCJcIikpIHtcbiAgICAgIGJvb1Zpc2libGUgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGJvb0VsZW1lbnQgJiYgKG9ialNpemVzLmJvdHRvbSA8IDAgfHwgb2JqU2l6ZXMucmlnaHQgPCAwIHx8IG9ialNpemVzLmxlZnQgPiBudW1Eb2N1bWVudFdpZHRoIHx8IG9ialNpemVzLnRvcCA+IG51bURvY3VtZW50SGVpZ2h0KSkge1xuICAgICAgYm9vVmlzaWJsZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoISF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgLyoqXG4gICAgICAgKiDQktGL0YfQuNGB0LvRj9C10Lwg0YHRgtC40LvQuCDRjdC70LXQvNC10L3RgtCwXG4gICAgICAgKiBAdHlwZSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn1cbiAgICAgICAqL1xuICAgICAgdmFyIG9ialN0eWxlID0gVmlld0FiaWxpdHkuZ2V0Q29tcHV0ZWRTdHlsZShkb21Ob2RlKTtcbiAgICAgIC8qKlxuICAgICAgICog0JXRgdC70Lgg0Y3Qu9C10LzQtdC90YIg0LjQvNC10LXRgiDQvdGD0LvQtdCy0YPRjiDQv9GA0L7Qt9GA0LDRh9C90L7RgdGC0Ywg0LjQu9C4INGB0LrRgNGL0YIg0LjQu9C4INC90LUg0LjQvNC10LXRgiDQvtGC0L7QsdGA0LDQttC10L3QuNGPXG4gICAgICAgKi9cbiAgICAgIGlmIChvYmpTdHlsZS5vcGFjaXR5ID09PSBcIjBcIiB8fCBvYmpTdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fCBvYmpTdHlsZS52aXNpYmlsaXR5ID09PSBcImhpZGRlblwiKSB7XG4gICAgICAgIGJvb1Zpc2libGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10Lwg0YTQu9Cw0LMg0LLQuNC00LjQvNC+0YHRgtC4XG4gICAgICovXG4gICAgcmV0dXJuIGJvb1Zpc2libGU7XG4gIH07XG5cbiAgLyoqXG4gICAqINCc0LXRgtC+0LQg0L7Qv9GA0LXQtNC10LvQtdC90LjRjyDQstC40LTQuNC80L7RgdGC0Lgg0LHQsNC90L3QtdGA0LAg0LLQvtC+0LHRidC1XG4gICAqXG4gICAqIEBwYXJhbSBkb21CYW5uZXIge09iamVjdH0gLSDQrdC70LXQvNC10L3RgiBET00g0LTQtdGA0LXQstCwXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IC0g0JrQvtGN0YTRhNC40YbQuNC10L3RgiDQstC40LTQuNC80L7RgdGC0Lgg0Y3Qu9C10LzQtdC90YLQsCDQvtGCIDAg0LTQviAxXG4gICAqL1xuICBWaWV3QWJpbGl0eS5jaGVja1RvdGFsVmlzaWJpbGl0eSA9IGZ1bmN0aW9uIGNoZWNrVG90YWxWaXNpYmlsaXR5KGRvbUJhbm5lcikge1xuICAgIC8qKlxuICAgICAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INGE0LvQsNCzINCy0LjQtNC40LzQvtGB0YLQuCDRjdC70LXQvNC10L3RgtCwXG4gICAgICog0JfQsNC/0LjRgdGL0LLQsNC10Lwg0Y3Qu9C10LzQtdC90YIg0LLQviDQstGA0LXQvNC10L3QvdGD0Y4g0L/QtdGA0LXQvNC10L3QvdGD0Y4g0LTRj9C7INC/0LXRgNC10LHQvtGA0LAg0L/QviDRgNC+0LTQuNGC0LXQu9GP0LxcbiAgICAgKiDQo9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDRhNC70LDQsyDRgdC+0L7RgtCy0LXRgtGB0YLQstC40Y8g0Y3Qu9C10LzQtdC90YLQsCDQuNGB0YXQvtC00L3QvtC80YNcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICB2YXIgYm9vVmlzaWJsZSA9IHRydWU7XG4gICAgdmFyIGRvbU5vZGUgPSBkb21CYW5uZXI7XG4gICAgdmFyIGJvb0VsZW1lbnQgPSB0cnVlO1xuICAgIHZhciBfbnVtRG9jdW1lbnRXaWR0aCA9IFZpZXdBYmlsaXR5LmdldERvY3VtZW50V2lkdGgoKTtcbiAgICB2YXIgbnVtRG9jdW1lbnRXaWR0aCA9IHR5cGVvZiBfbnVtRG9jdW1lbnRXaWR0aCA9PT0gXCJudW1iZXJcIiA/IF9udW1Eb2N1bWVudFdpZHRoIDogMDtcbiAgICB2YXIgX251bURvY3VtZW50SGVpZ2h0ID0gVmlld0FiaWxpdHkuZ2V0RG9jdW1lbnRIZWlnaHQoKTtcbiAgICB2YXIgbnVtRG9jdW1lbnRIZWlnaHQgPSB0eXBlb2YgX251bURvY3VtZW50SGVpZ2h0ID09PSBcIm51bWJlclwiID8gX251bURvY3VtZW50SGVpZ2h0IDogMDtcbiAgICAvKipcbiAgICAgKiDQn9C10YDQtdCx0LjRgNCw0LXQvCDQvtGCINGN0LvQtdC80LXQvdGC0LAg0LTQviDRgNC+0LTQuNGC0LXQu9C10LksINC/0L7QutCwINGC0LXQutGD0YnQtdC5INGN0LvQtdC80LXQvdGCINC90LUg0YDQsNCy0LXQvSBib2R5XG4gICAgICovXG4gICAgd2hpbGUgKGRvbU5vZGUgJiYgZG9tTm9kZSAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgLyoqXG4gICAgICAgKiDQldGB0LvQuCDRjdC70LXQvNC10L3RgiDQvdC1INCy0LjQtNC10L0sINGC0L4g0YPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YTQu9Cw0LMg0Lgg0LLRi9GF0L7QtNC40Lwg0LjQtyDQv9C10YDQtdCx0L7RgNCwXG4gICAgICAgKi9cbiAgICAgIGlmICghVmlld0FiaWxpdHkuaXNWaXNpYmxlKGRvbU5vZGUsIGJvb0VsZW1lbnQsIG51bURvY3VtZW50V2lkdGgsIG51bURvY3VtZW50SGVpZ2h0KSkge1xuICAgICAgICBib29WaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKGRvbU5vZGUuc3R5bGUucG9zaXRpb24gPT09IFwiZml4ZWRcIikge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICog0JfQsNC/0LjRgdGL0LLQsNC10Lwg0LLQviDQstGA0LXQvNC10L3QvdGD0Y4g0L/QtdGA0LXQvNC10L3QvdGD0Y4g0YDQvtC00LjRgtC10LvRjNGB0LrQuNC5INGN0LvQtdC80LXQvdGCXG4gICAgICAgKiBAdHlwZSB7ZG9tRWxlbWVudH1cbiAgICAgICAqL1xuICAgICAgZG9tTm9kZSA9IGRvbU5vZGUucGFyZW50Tm9kZTtcbiAgICAgIC8qKlxuICAgICAgICog0KHQsdGA0LDRgdGL0LLQsNC10Lwg0YTQu9Cw0LMg0L/RgNC40L3QsNC00LvQtdC20L3QvtGB0YLQuCDQuiDQuNGB0YXQvtC00L3QvtC80YMg0Y3Qu9C10LzQtdC90YLRg1xuICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgKi9cbiAgICAgIGJvb0VsZW1lbnQgPSBmYWxzZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog0J7QsdGK0LXQstC70Y/QtdC8INC/0LXRgNC10LzQtdC90L3Rg9GOINC00LvRjyDQvtC/0YDQtdC00LXQu9C10L3QuNGPINC/0YDQvtGG0LXQvdGC0LAg0LLQuNC00LjQvNC+0YHRgtC4INGN0LvQtdC80LXQvdGC0LBcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHZhciBudW1WaXNpYmlsaXR5ID0gMDtcbiAgICAvKipcbiAgICAgKiDQldGB0LvQuCDRjdC70LXQvNC10L3RgiDQstC+0L7QsdGJ0LUg0LLQuNC00LXQvSwg0YLQviDQstGL0YHRh9C40YLRi9Cy0LDQtdC8INC/0YDQvtGG0LXQvdGCINC10LPQviDQstC40LTQuNC80L7RgdGC0LgsINC10YHQu9C4INC90LXRgiwg0YLQviDQstC40LTQuNC80L7RgdGC0Ywg0L3Rg9C70LXQstCw0Y9cbiAgICAgKi9cbiAgICBpZiAoYm9vVmlzaWJsZSkge1xuICAgICAgLyoqXG4gICAgICAgKiDQktGL0YfQuNGB0LvRj9C10Lwg0YHRgtC40LvQuCDRjdC70LXQvNC10L3RgtCwXG4gICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICovXG4gICAgICB2YXIgb3BhY2l0eSA9IDE7XG4gICAgICBpZiAoISF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgICB2YXIgb2JqU3R5bGUgPSBWaWV3QWJpbGl0eS5nZXRDb21wdXRlZFN0eWxlKGRvbUJhbm5lcik7XG4gICAgICAgIG9wYWNpdHkgPSBvYmpTdHlsZS5vcGFjaXR5O1xuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiDQoNCw0YHRgdGH0LjRgtGL0LLQsNC10Lwg0L/RgNC+0YbQtdC90YIg0LLQuNC00LjQvNC+0YHRgtC4INGN0LvQtdC80LXQvdGC0LBcbiAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgKi9cbiAgICAgIG51bVZpc2liaWxpdHkgPSBvcGFjaXR5O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDQktC+0LfQstGA0LDRidCw0LXQvCDQv9GA0L7RhtC10L3RgiDQstC40LTQuNC80L7RgdGC0LhcbiAgICAgKi9cbiAgICByZXR1cm4gbnVtVmlzaWJpbGl0eTtcbiAgfTtcblxuICAvKipcbiAgICog0JzQtdGC0L7QtCDQvtC/0YDQtdC00LXQu9C10L3QuNGPINCy0LjQtNC40LzQvtGB0YLQuCDQsdCw0L3QvdC10YDQsFxuICAgKlxuICAgKiBAcGFyYW0gZG9tQmFubmVyIHtPYmplY3R9IC0g0K3Qu9C10LzQtdC90YIgRE9NINC00LXRgNC10LLQsFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSAtINCa0L7RjdGE0YTQuNGG0LjQtdC90YIg0LLQuNC00LjQvNC+0YHRgtC4INGN0LvQtdC80LXQvdGC0LAg0L7RgiAwINC00L4gMVxuICAgKi9cbiAgVmlld0FiaWxpdHkuY2hlY2tWaXNpYmlsaXR5ID0gZnVuY3Rpb24gY2hlY2tWaXNpYmlsaXR5KGRvbUJhbm5lcikge1xuICAgIHZhciBudW1WaXNpYmlsaXR5ID0gVmlld0FiaWxpdHkuY2hlY2tUb3RhbFZpc2liaWxpdHkoZG9tQmFubmVyKTtcbiAgICBpZiAobnVtVmlzaWJpbGl0eSkge1xuICAgICAgLyoqXG4gICAgICAgKiDQntC/0YDQtdC00LXQu9GP0LXQvCDQv9C+0LvQvtC20LXQvdC40LUg0Lgg0YDQsNC30LzQtdGA0Ysg0Y3Qu9C10LzQtdC90YLQsFxuICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAqL1xuICAgICAgdmFyIG9ialNpemVzID0gVmlld0FiaWxpdHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGRvbUJhbm5lcik7XG4gICAgICAvKipcbiAgICAgICAqINCg0LDRgdGB0YfQuNGC0YvQstCw0LXQvCDQv9GA0L7RhtC10L3RgiDQstC40LTQuNC80L7RgdGC0Lgg0Y3Qu9C10LzQtdC90YLQsFxuICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAqL1xuICAgICAgbnVtVmlzaWJpbGl0eSA9IFZpZXdBYmlsaXR5LmNhbGNWaXNpYmlsaXR5KG9ialNpemVzKSAqIG51bVZpc2liaWxpdHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqINCS0L7Qt9Cy0YDQsNGJ0LDQtdC8INC/0YDQvtGG0LXQvdGCINCy0LjQtNC40LzQvtGB0YLQuFxuICAgICAqL1xuICAgIHJldHVybiBudW1WaXNpYmlsaXR5O1xuICB9O1xuXG4gIC8qKlxuICAgKiBXYXRjaGVyXG4gICAqL1xuICBWaWV3QWJpbGl0eS5wcm90b3R5cGUud2F0Y2ggPSBmdW5jdGlvbiB3YXRjaCgpIHtcbiAgICBpZiAodGhpcy5kb21FbGVtZW50ICYmIF90eXBlb2YodGhpcy5kb21FbGVtZW50KSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgaWYgKHRoaXMuZG9tRWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiDQntC/0YDQtdC00LXQu9C10L3QuNC1INCy0LjQtNC40LzQvtGB0YLQuCDQsdCw0L3QvdC10YDQsFxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIG51bVZpc2liaWxpdHkgPSBWaWV3QWJpbGl0eS5jaGVja1Zpc2liaWxpdHkodGhpcy5kb21FbGVtZW50KTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqINCV0YHQu9C4INCy0LjQtNC40LzQvtGB0YLRjCDQsdC+0LvRjNGI0LUg0YLRgNC10LHRg9C10LzQvtC5XG4gICAgICAgICAqL1xuICAgICAgICBpZiAobnVtVmlzaWJpbGl0eSA+IHRoaXMub2JqU2V0dGluZy5wZXJjZW50YWdlKSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICog0JXRgdC70Lgg0YTQu9Cw0LMg0L7RgtGB0YfQtdGC0LAg0LHRi9C7INCy0YvQutC70Y7Rh9C10L0sINGC0L4g0YHQsdGA0LDRgdGL0LLQsNC10Lwg0YLQsNC50LzQtdGAXG4gICAgICAgICAgICovXG4gICAgICAgICAgaWYgKHRoaXMuYm9vVGltZXJGbGFnID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5udW1UaW1lckZyb20gPSBEYXRlLm5vdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmJvb1RpbWVyRmxhZyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHRoaXMuYm9vVGltZXJGbGFnID09PSB0cnVlKSB7fVxuICAgICAgICAgIHRoaXMuYm9vVGltZXJGbGFnID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCk0LvQsNCzINCy0YvQt9C+0LLQsCBjYWxsYmFja1xuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIHZhciBib29DYWxsQ2FsbGJhY2sgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqINCV0YHQu9C4INGD0YHRgtCw0L3QvtCy0LvQtdC9INGE0LvQsNCzINC+0YLRgdGH0LXRgtCwXG4gICAgICAgICAqL1xuICAgICAgICBpZiAodGhpcy5ib29UaW1lckZsYWcgPT09IHRydWUpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiDQldGB0LvQuCDQv9GA0L7RiNC70L4g0LHQvtC70YzRiNC1INCy0YDQtdC80LXQvdC4LCDRh9C10Lwg0L/RgNC10LTQv9C+0LvQsNCz0LDQu9C+0YHRjFxuICAgICAgICAgICAqL1xuICAgICAgICAgIGlmIChEYXRlLm5vdygpIC0gdGhpcy5udW1UaW1lckZyb20gPiB0aGlzLm9ialNldHRpbmcudGltZSkge1xuICAgICAgICAgICAgYm9vQ2FsbENhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqINCV0YHQu9C4INCx0LDQvdC10YAg0LHRi9C7INCy0LjQtNC10L0g0LTQvtGB0YLQsNGC0L7Rh9C90L4g0LTQvtC70LPQviwg0YLQviDQstGL0LfRi9Cy0LDQtdC8IGNhbGxiYWNrLCDQuNC90LDRh9C1INC/0YDQvtC00L7Qu9C20LDQtdC8INGB0LzQvtGC0YDQtdGC0YxcbiAgICAgICAgICovXG4gICAgICAgIGlmIChib29DYWxsQ2FsbGJhY2spIHtcbiAgICAgICAgICBfQW5pbWF0aW9uRnJhbWUyLmRlZmF1bHQudW5zdWJzY3JpYmUodGhpcy53YXRjaElEKTtcbiAgICAgICAgICB0aGlzLmZ1bkNhbGxCYWNrKHRoaXMuSUQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfQW5pbWF0aW9uRnJhbWUyLmRlZmF1bHQudW5zdWJzY3JpYmUodGhpcy53YXRjaElEKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuSUQpIHtcbiAgICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuSUQpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gVmlld0FiaWxpdHk7XG59KCk7XG4vKipcbiAqIEV4cG9ydCBWaWV3QWJpbGl0eVxuICovXG5cblxuZXhwb3J0cy5kZWZhdWx0ID0gVmlld0FiaWxpdHk7XG5tb2R1bGUuZXhwb3J0cyA9IFZpZXdBYmlsaXR5O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGliL1ZpZXdBYmlsaXR5LnRzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgcm9vdCA9IHZvaWQgMDtcbmlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcm9vdCA9IGdsb2JhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290ID0ge307XG4gICAgfVxufSBlbHNlIHtcbiAgICByb290ID0gd2luZG93O1xufVxuLyoqXG4gKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGxcbiAqL1xucm9vdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiByb290ICE9PSBcInVuZGVmaW5lZFwiICYmIChyb290LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcm9vdC5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSkgfHwgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHJvb3Quc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICB9O1xufSgpO1xuLyoqXG4gKiBCaW5kIHBvbHlmaWxsXG4gKi9cbmZ1bmN0aW9uIGJpbmQoYikge1xuICAgIC8qKlxuICAgICAqIElmIHRyeSBiaW5kIHZhcmlhYmxlIHRoYXQgbm90IGEgZnVuY3Rpb24sIHRoZW4gdGhyb3cgZXJyb3JcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIHRoaXMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGVcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGxldCBBcnJheSBzbGljZSBmdW5jdGlvblxuICAgICAqL1xuICAgIHZhciBhID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgIHZhciBmID0gYS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGUgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGMoKSB7XG4gICAgICAgIC8qXG4gICAgICAgICBpZiAoXG4gICAgICAgICB0eXBlb2Ygcm9vdCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgdHlwZW9mIHJvb3QuY29uc29sZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgdHlwZW9mIHJvb3QuY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgKSB7XG4gICAgICAgICByb290LmNvbnNvbGUubG9nKFwiQmluZCBwb2x5ZmlsbFwiKTtcbiAgICAgICAgIH1cbiAgICAgICAgICovXG4gICAgfVxuICAgIGZ1bmN0aW9uIGQoKSB7XG4gICAgICAgIHJldHVybiBlLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBjID8gdGhpcyA6IGIgfHwgcm9vdCwgZi5jb25jYXQoYS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJlZCB0aGlzIHByb3RvdHlwZSBhcyBwcm90b3R5cGUgdG8gYmluZCBpbXBsZW1lbnRhdGlvbiBmdW5jdGlvbnNcbiAgICAgKi9cbiAgICBjLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuICAgIGQucHJvdG90eXBlID0gbmV3IGMoKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYmluZCBwb2x5ZmlsbFxuICAgICAqL1xuICAgIHJldHVybiBkO1xufVxuRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCB8fCBiaW5kO1xuLyoqXG4gKiBPYmplY3Qua2V5cyBwb2x5ZmlsbFxuICovXG5mdW5jdGlvbiBrZXlzKCkge1xuICAgIHZhciBoYXNEb05vdEVudW1CdWcgPSAheyB0b1N0cmluZzogbnVsbCB9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIik7XG4gICAgdmFyIGRvTm90RW51bXMgPSBbXCJ0b1N0cmluZ1wiLCBcInRvTG9jYWxlU3RyaW5nXCIsIFwidmFsdWVPZlwiLCBcImhhc093blByb3BlcnR5XCIsIFwiaXNQcm90b3R5cGVPZlwiLCBcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsIFwiY29uc3RydWN0b3JcIl07XG4gICAgdmFyIGRvTm90RW51bXNMZW5ndGggPSBkb05vdEVudW1zLmxlbmd0aDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBpZiAoKHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopKSAhPT0gXCJvYmplY3RcIiAmJiAodHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiIHx8IG9iaiA9PT0gbnVsbCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qua2V5cyBjYWxsZWQgb24gbm9uLW9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwcm9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzRG9Ob3RFbnVtQnVnKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvTm90RW51bXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBkb05vdEVudW1zW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChkb05vdEVudW1zW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufVxuT2JqZWN0LmtleXMgPSBPYmplY3Qua2V5cyB8fCBrZXlzKCk7XG4vKipcbiAqIFJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lIGNhbGwgc3RhY2sgY2xhc3NcbiAqL1xuXG52YXIgQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lXG4gICAgICovXG4gICAgZnVuY3Rpb24gQW5pbWF0aW9uRnJhbWUoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBbmltYXRpb25GcmFtZSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN1YnNjcmliZWQgbWV0aG9kc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdGFjayA9IHt9O1xuICAgICAgICAvKipcbiAgICAgICAgICogU3RhcnQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdhdGNoZXJcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud2F0Y2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIG1ldGhvZCB0byB3YXRjaFxuICAgICAqIEBwYXJhbSBjb250ZXh0XG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHBhcmFtc1xuICAgICAqIEBwYXJhbSBJRFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW58c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBBbmltYXRpb25GcmFtZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKCkge1xuICAgICAgICB2YXIgY29udGV4dCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogcm9vdDtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBhcmFtcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG4gICAgICAgIHZhciBJRCA9IGFyZ3VtZW50c1szXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgY29udGV4dCBhbmQgY2FsbGJhY2sgcGFzc2VkIGFuZCB0aGV5IGFyZSBvYmplY3QgYW5kIGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoKHR5cGVvZiBjb250ZXh0ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoY29udGV4dCkpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiICYmICh0eXBlb2YgcGFyYW1zID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YocGFyYW1zKSkgPT09IFwib2JqZWN0XCIgJiYgQXJyYXkuaXNBcnJheShwYXJhbXMpICYmIChJRCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBJRCA9PT0gXCJzdHJpbmdcIikpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ3JlYXRlIFVJRFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB2YXIgbG9jYWxJRCA9IElEIHx8IFwieC1cIiArIGQuZ2V0VGltZSgpICsgXCItXCIgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxZTYpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBZGQgbWV0aG9kIHRvIHRoZSBzdGFja1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnN0YWNrW2xvY2FsSURdID0ge1xuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBXcml0ZSB0byBjb25zb2xlIGNvdW50IG9mIHRoZSBzdWJzY3JpYmVkIG1ldGhvZHNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXR1cm4gVUlEXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBsb2NhbElEO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBVbnN1YnNjcmliZSBtZXRob2QgYnkgSURcbiAgICAgKiBAcGFyYW0gSURcbiAgICAgKi9cblxuXG4gICAgQW5pbWF0aW9uRnJhbWUucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdW5zdWJzY3JpYmUoSUQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBJRCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiByZXF1aXJlZCBtZXRob2QgZXhpc3QgaW4gdGhlIHN0YWNrXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrW0lEXSkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE51bGxpZnkgbWV0aG9kIGluIHRoZSBzdGFjayBhbmQgZGVzdHJveSBpdFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tbSURdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3RhY2tbSURdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBXYXRjaCBhbmQgY2FsbCBtZXRob2RzXG4gICAgICovXG5cblxuICAgIEFuaW1hdGlvbkZyYW1lLnByb3RvdHlwZS53YXRjaCA9IGZ1bmN0aW9uIHdhdGNoKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzdGFjayBleGlzdCwgaXQgaXMgYW4gb2JqZWN0IGFuZCBpdCBpcyBjb250YWlucyBtZXRob2RzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrICYmIF90eXBlb2YodGhpcy5zdGFjaykgPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0LmtleXModGhpcy5zdGFjaykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIExvb3AgYWxsIG1ldGhvZHMgaW4gc3RhY2tcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBJRCBpbiB0aGlzLnN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBQcm9jZXNzIG9ubHkgbWV0aG9kcyB3aXRob3V0IGV4dGVuZGVkIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrLmhhc093blByb3BlcnR5KElEKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBJZiBJRCBleGlzdCBhbmQgaXQgaXMgYSBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSUQgJiYgdHlwZW9mIElEID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBHZXQgc3Vic2NyaWJlZCBtZXRob2QgcGFyYW1zIGJ5IElEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqQ2FsbCA9IHRoaXMuc3RhY2tbSURdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogSWYgcGFyYW1zIGV4aXN0LCBpdCBpcyBhbiBvYmplY3QsIGFuZCBpdCBpcyBjb250YWlucyBjYWxsIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGNhbGxiYWNrLCBhbmQgcGFyYW1ldGVycyB3aGljaCBpcyBhcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iakNhbGwgJiYgKHR5cGVvZiBvYmpDYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqQ2FsbCkpID09PSBcIm9iamVjdFwiICYmIG9iakNhbGwuY29udGV4dCAmJiBvYmpDYWxsLmNhbGxiYWNrICYmIG9iakNhbGwucGFyYW1zICYmIF90eXBlb2Yob2JqQ2FsbC5jb250ZXh0KSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqQ2FsbC5jYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiICYmIEFycmF5LmlzQXJyYXkob2JqQ2FsbC5wYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIENhbGwgc3Vic2NyaWJlZCBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqQ2FsbC5jYWxsYmFjay5hcHBseShvYmpDYWxsLmNvbnRleHQsIG9iakNhbGwucGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNhbGwgd2F0Y2hlclxuICAgICAgICAgKi9cbiAgICAgICAgcm9vdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy53YXRjaC5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFuaW1hdGlvbkZyYW1lO1xufSgpO1xuLyoqXG4gKiBDcmVhdGUgc2luZ2xlIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lIG9iamVjdFxuICogQHR5cGUge0FuaW1hdGlvbkZyYW1lfVxuICovXG5cblxucm9vdC5BbmltYXRpb25GcmFtZSA9IHJvb3QuQW5pbWF0aW9uRnJhbWUgfHwgbmV3IEFuaW1hdGlvbkZyYW1lKCk7XG4vKipcbiAqIEV4cG9ydCBzaW5nbGUgQW5pbWF0aW9uRnJhbWUgaW5zdGFuY2VcbiAqL1xudmFyIF9BbmltYXRpb25GcmFtZSA9IHJvb3QuQW5pbWF0aW9uRnJhbWU7XG5leHBvcnRzLmRlZmF1bHQgPSBfQW5pbWF0aW9uRnJhbWU7XG5cbm1vZHVsZS5leHBvcnRzID0gX0FuaW1hdGlvbkZyYW1lO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9BbmltYXRpb25GcmFtZS9saWIvQW5pbWF0aW9uRnJhbWUudHNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBJbXBvcnQgc3ViY2xhc3Nlc1xuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9VdGlsc0FuaW1hdGlvbiA9IHJlcXVpcmUoXCIuL1V0aWxzQW5pbWF0aW9uXCIpO1xuXG52YXIgX1V0aWxzQW5pbWF0aW9uMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzQW5pbWF0aW9uKTtcblxudmFyIF9VdGlsc0Jyb3dzZXIgPSByZXF1aXJlKFwiLi9VdGlsc0Jyb3dzZXJcIik7XG5cbnZhciBfVXRpbHNCcm93c2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzQnJvd3Nlcik7XG5cbnZhciBfVXRpbHNDb29raWUgPSByZXF1aXJlKFwiLi9VdGlsc0Nvb2tpZVwiKTtcblxudmFyIF9VdGlsc0Nvb2tpZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0Nvb2tpZSk7XG5cbnZhciBfVXRpbHNEb2N1bWVudCA9IHJlcXVpcmUoXCIuL1V0aWxzRG9jdW1lbnRcIik7XG5cbnZhciBfVXRpbHNEb2N1bWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0RvY3VtZW50KTtcblxudmFyIF9VdGlsc0RPTSA9IHJlcXVpcmUoXCIuL1V0aWxzRE9NXCIpO1xuXG52YXIgX1V0aWxzRE9NMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzRE9NKTtcblxudmFyIF9VdGlsc01vdXNlID0gcmVxdWlyZShcIi4vVXRpbHNNb3VzZVwiKTtcblxudmFyIF9VdGlsc01vdXNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzTW91c2UpO1xuXG52YXIgX1V0aWxzU2NyZWVuID0gcmVxdWlyZShcIi4vVXRpbHNTY3JlZW5cIik7XG5cbnZhciBfVXRpbHNTY3JlZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTY3JlZW4pO1xuXG52YXIgX1V0aWxzU3lzdGVtID0gcmVxdWlyZShcIi4vVXRpbHNTeXN0ZW1cIik7XG5cbnZhciBfVXRpbHNTeXN0ZW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTeXN0ZW0pO1xuXG52YXIgX1V0aWxzVXNlciA9IHJlcXVpcmUoXCIuL1V0aWxzVXNlclwiKTtcblxudmFyIF9VdGlsc1VzZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNVc2VyKTtcblxudmFyIF9VdGlsc1dpbmRvdyA9IHJlcXVpcmUoXCIuL1V0aWxzV2luZG93XCIpO1xuXG52YXIgX1V0aWxzV2luZG93MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzV2luZG93KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBHbG9iYWwgVXRpbHMgY2xhc3NcbiAqL1xudmFyIFV0aWxzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFV0aWxzKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVXRpbHMpO1xuICAgIH1cblxuICAgIFV0aWxzLndhcm4gPSBmdW5jdGlvbiB3YXJuKG1lc3NhbmdlKSB7XG4gICAgICAgIGlmICgodHlwZW9mIGNvbnNvbGUgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihjb25zb2xlKSkgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUud2FybihtZXNzYW5nZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhbmdlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobWVzc2FuZ2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYW5nZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgVXRpbHMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1ldGhvZCB3YXMgZGVwcmVjYXRlZCBhbmQgc29vbiB3aWxsIGJlIHJlbW92ZWQuIFBsZWFzZSB1c2UgVXRpbHMuRE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdCBtZXRob2QuXG4gICAgICovXG5cblxuICAgIFV0aWxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChkb21Ob2RlKSB7XG4gICAgICAgIHZhciBkb21Eb2N1bWVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZG9jdW1lbnQ7XG4gICAgICAgIHZhciBzaG93Rm9yY2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuXG4gICAgICAgIFV0aWxzLndhcm4oXCJVdGlscy5nZXRCb3VuZGluZ0NsaWVudFJlY3QgbWV0aG9kIHdhcyBkZXByZWNhdGVkIGFuZCBzb29uIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSBVdGlscy5ET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1ldGhvZC5cIik7XG4gICAgICAgIHJldHVybiBVdGlscy5ET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGRvbU5vZGUsIGRvbURvY3VtZW50LCBzaG93Rm9yY2UpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBVdGlscy5maW5kRWxlbWVudFBvc2l0aW9uIG1ldGhvZCB3YXMgZGVwcmVjYXRlZCBhbmQgc29vbiB3aWxsIGJlIHJlbW92ZWQuIFBsZWFzZSB1c2UgVXRpbHMuRE9NLmZpbmRFbGVtZW50UG9zaXRpb24gbWV0aG9kLlxuICAgICAqL1xuICAgIFV0aWxzLmZpbmRFbGVtZW50UG9zaXRpb24gPSBmdW5jdGlvbiBmaW5kRWxlbWVudFBvc2l0aW9uKGRvbU5vZGUpIHtcbiAgICAgICAgdmFyIGRvbURvY3VtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudDtcbiAgICAgICAgdmFyIHNob3dGb3JjZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgICAgICAgVXRpbHMud2FybihcIlV0aWxzLmZpbmRFbGVtZW50UG9zaXRpb24gbWV0aG9kIHdhcyBkZXByZWNhdGVkIGFuZCBzb29uIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSBVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2QuXCIpO1xuICAgICAgICByZXR1cm4gVXRpbHMuRE9NLmZpbmRFbGVtZW50UG9zaXRpb24oZG9tTm9kZSwgZG9tRG9jdW1lbnQsIHNob3dGb3JjZSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUcmFuc2ZlciBzdGF0aWMgbWV0aG9kcyBpbnRvIHRoZSBvYmplY3RcbiAgICAgKiBAcGFyYW0gcmVhbE9iamVjdFxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICAgKi9cblxuXG4gICAgVXRpbHMuaW1wbGVtZW50YXRpb25TdGF0aWNNZXRob2RzID0gZnVuY3Rpb24gaW1wbGVtZW50YXRpb25TdGF0aWNNZXRob2RzKHJlYWxPYmplY3QsIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoISFyZWFsT2JqZWN0ICYmICh0eXBlb2YgcmVhbE9iamVjdCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKHJlYWxPYmplY3QpKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGljQ2xhc3MgPSByZWFsT2JqZWN0LmNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhdGljQ2xhc3MgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0aG9kcyA9IE9iamVjdC5rZXlzKHN0YXRpY0NsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1ldGhvZHMgJiYgbWV0aG9kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgX2xvb3AgPSBmdW5jdGlvbiBfbG9vcCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pID49IF9pdGVyYXRvci5sZW5ndGgpIHJldHVybiBcImJyZWFrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2kgPSBfaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2kuZG9uZSkgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBfcmVmO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZWFsT2JqZWN0W21ldGhvZF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhbE9iamVjdFttZXRob2RdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGF0aWNDbGFzcyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFV0aWxzLndhcm4oXCJUaGF0IG1ldGhvZCB3YXMgZGVwcmVjYXRlZCBhbmQgc29vbiB3aWxsIGJlIHJlbW92ZWQuIFBsZWFzZSB1c2UgXCIgKyAoY2xhc3NOYW1lIHx8IHN0YXRpY0NsYXNzICYmIHN0YXRpY0NsYXNzLm5hbWUgfHwgXCJVbmtub3duXCIpICsgXCIuXCIgKyBtZXRob2QgKyBcIiBtZXRob2QuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRpY0NsYXNzW21ldGhvZF0uYXBwbHkoc3RhdGljQ2xhc3MsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gbWV0aG9kcywgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvciksIF9pID0gMCwgX2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmV0MiA9IF9sb29wKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3JldDIgPT09IFwiYnJlYWtcIikgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgY2FsbCBzdGFjayB0cmFjZVxuICAgICAqIEByZXR1cm4gQXJyYXk8T2JqZWN0PlxuICAgICAqL1xuXG5cbiAgICBVdGlscy5zdGFjayA9IGZ1bmN0aW9uIHN0YWNrKCkge1xuICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcigpO1xuICAgICAgICByZXR1cm4gZSAmJiBlLnN0YWNrICYmIGUuc3RhY2suc3BsaXQoXCJcXG5cIikuc2xpY2UoNSkubWFwKGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICBpZiAoIXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSAvXiguKilAKC4qKVxcLmpzOihbMC05XSspOihbMC05XSspJC9pZy5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoWzFdID0gLyhbXlxcLzxdKykvaWcuZXhlYyhtYXRjaFsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbMV0gPSBtYXRjaFsxXVswXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1hdGNoWzRdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IG1hdGNoWzJdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpbmU6IG1hdGNoWzNdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWF0Y2hbMV0gfHwgXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXRjaCA9IC9eKC4qKUAoaHR0cHxodHRwcyk6KFteOl0rKTooWzAtOV0rKTooWzAtOV0rKSQvaWcuZXhlYyhzKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogbWF0Y2hbNV0gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogbWF0Y2hbM10gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbGluZTogbWF0Y2hbNF0gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtYXRjaFsxXSArIFwiOlwiICsgbWF0Y2hbMl0gfHwgXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXRjaCA9IC9eKC4qKUAoLiopOihbMC05XSspOihbMC05XSspJC9pZy5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtYXRjaFs0XSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBmaWxlOiBtYXRjaFsyXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsaW5lOiBtYXRjaFszXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1hdGNoWzFdIHx8IFwiXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0Y2ggPSAvXlxccythdFxccyhbXihdKylcXHNcXCgoLiopOihbMC05XSspOihbMC05XSspXFwpJC9pZy5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtYXRjaFs0XSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBmaWxlOiBtYXRjaFsyXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsaW5lOiBtYXRjaFszXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1hdGNoWzFdIHx8IFwiXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWF0Y2ggPSAvXlxccythdFxccyguKik6KFswLTldKyk6KFswLTldKykkL2lnLmV4ZWMocyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1hdGNoWzNdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IG1hdGNoWzFdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpbmU6IG1hdGNoWzJdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfSkgfHwgW107XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgcmFuZG9tIElEXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBVdGlscy5nZXRVSUQgPSBmdW5jdGlvbiBnZXRVSUQoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMik7XG4gICAgfTtcblxuICAgIHJldHVybiBVdGlscztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gVXRpbHM7XG5cblV0aWxzLkFuaW1hdGlvbiA9IF9VdGlsc0FuaW1hdGlvbjIuZGVmYXVsdDtcblV0aWxzLkJyb3dzZXIgPSBfVXRpbHNCcm93c2VyMi5kZWZhdWx0O1xuVXRpbHMuQ29va2llID0gX1V0aWxzQ29va2llMi5kZWZhdWx0O1xuVXRpbHMuRE9NID0gX1V0aWxzRE9NMi5kZWZhdWx0O1xuVXRpbHMuRG9jdW1lbnQgPSBfVXRpbHNEb2N1bWVudDIuZGVmYXVsdDtcblV0aWxzLk1vdXNlID0gX1V0aWxzTW91c2UyLmRlZmF1bHQ7XG5VdGlscy5TY3JlZW4gPSBfVXRpbHNTY3JlZW4yLmRlZmF1bHQ7XG5VdGlscy5TeXN0ZW0gPSBfVXRpbHNTeXN0ZW0yLmRlZmF1bHQ7XG5VdGlscy5Vc2VyID0gX1V0aWxzVXNlcjIuZGVmYXVsdDtcblV0aWxzLldpbmRvdyA9IF9VdGlsc1dpbmRvdzIuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzID0gVXRpbHM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlscy50c1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEltcG9ydCBzdWJjbGFzc2VzXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9VdGlsc0FuaW1hdGlvbkVhc2luZyA9IHJlcXVpcmUoXCIuL1V0aWxzQW5pbWF0aW9uRWFzaW5nXCIpO1xuXG52YXIgX1V0aWxzQW5pbWF0aW9uRWFzaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzQW5pbWF0aW9uRWFzaW5nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEFuaW1hdGlvbiA9IGZ1bmN0aW9uIEFuaW1hdGlvbigpIHtcbiAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFuaW1hdGlvbik7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBbmltYXRpb247XG5cbkFuaW1hdGlvbi5FYXNpbmcgPSBfVXRpbHNBbmltYXRpb25FYXNpbmcyLmRlZmF1bHQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc0FuaW1hdGlvbi50c1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIERpZmZlcmVudCB0aW1lIGFuaW1hdGlvbiBmdW5jdGlvbnNcbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRWFzaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEVhc2luZygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEVhc2luZyk7XG4gICAgfVxuXG4gICAgRWFzaW5nLmlzVmFsaWRQYXJhbXMgPSBmdW5jdGlvbiBpc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQsIHMpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0ID09PSBcIm51bWJlclwiICYmIHR5cGVvZiBiID09PSBcIm51bWJlclwiICYmIHR5cGVvZiBjID09PSBcIm51bWJlclwiICYmIHR5cGVvZiBkID09PSBcIm51bWJlclwiICYmICh0eXBlb2YgcyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgcyA9PT0gXCJudW1iZXJcIikgJiYgdCA8IGQ7XG4gICAgfTtcblxuICAgIEVhc2luZy5zd2luZyA9IGZ1bmN0aW9uIHN3aW5nKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gRWFzaW5nW0Vhc2luZy5kZWZdKHQsIGIsIGMsIGQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluUXVhZCA9IGZ1bmN0aW9uIGVhc2VJblF1YWQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRRdWFkID0gZnVuY3Rpb24gZWFzZU91dFF1YWQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiAtYyAqICh0IC89IGQpICogKHQgLSAyKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5PdXRRdWFkID0gZnVuY3Rpb24gZWFzZUluT3V0UXVhZCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gLWMgLyAyICogKC0tdCAqICh0IC0gMikgLSAxKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5DdWJpYyA9IGZ1bmN0aW9uIGVhc2VJbkN1YmljKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dEN1YmljID0gZnVuY3Rpb24gZWFzZU91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCArIDEpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dEN1YmljID0gZnVuY3Rpb24gZWFzZUluT3V0Q3ViaWModCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICsgMikgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluUXVhcnQgPSBmdW5jdGlvbiBlYXNlSW5RdWFydCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICogdCArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0UXVhcnQgPSBmdW5jdGlvbiBlYXNlT3V0UXVhcnQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiAtYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCAqIHQgLSAxKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5PdXRRdWFydCA9IGZ1bmN0aW9uIGVhc2VJbk91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIC1jIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJblF1aW50ID0gZnVuY3Rpb24gZWFzZUluUXVpbnQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKiB0ICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRRdWludCA9IGZ1bmN0aW9uIGVhc2VPdXRRdWludCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0ICogdCArIDEpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dFF1aW50ID0gZnVuY3Rpb24gZWFzZUluT3V0UXVpbnQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCAqIHQgKyBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJblNpbmUgPSBmdW5jdGlvbiBlYXNlSW5TaW5lKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gLWMgKiBNYXRoLmNvcyh0IC8gZCAqIChNYXRoLlBJIC8gMikpICsgYyArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0U2luZSA9IGZ1bmN0aW9uIGVhc2VPdXRTaW5lKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqIE1hdGguc2luKHQgLyBkICogKE1hdGguUEkgLyAyKSkgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0U2luZSA9IGZ1bmN0aW9uIGVhc2VJbk91dFNpbmUodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiAtYyAvIDIgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQgLyBkKSAtIDEpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbkV4cG8gPSBmdW5jdGlvbiBlYXNlSW5FeHBvKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gdCA9PT0gMCA/IGIgOiBjICogTWF0aC5wb3coMiwgMTAgKiAodCAvIGQgLSAxKSkgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dEV4cG8gPSBmdW5jdGlvbiBlYXNlT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHQgPT09IGQgPyBiICsgYyA6IGMgKiAoLU1hdGgucG93KDIsIC0xMCAqIHQgLyBkKSArIDEpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dEV4cG8gPSBmdW5jdGlvbiBlYXNlSW5PdXRFeHBvKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHQgPT09IGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIE1hdGgucG93KDIsIDEwICogKHQgLSAxKSkgKyBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogKC1NYXRoLnBvdygyLCAtMTAgKiAtLXQpICsgMikgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluQ2lyYyA9IGZ1bmN0aW9uIGVhc2VJbkNpcmModCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiAtYyAqIChNYXRoLnNxcnQoMSAtICh0IC89IGQpICogdCkgLSAxKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0Q2lyYyA9IGZ1bmN0aW9uIGVhc2VPdXRDaXJjKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqIE1hdGguc3FydCgxIC0gKHQgPSB0IC8gZCAtIDEpICogdCkgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0Q2lyYyA9IGZ1bmN0aW9uIGVhc2VJbk91dENpcmModCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIC1jIC8gMiAqIChNYXRoLnNxcnQoMSAtIHQgKiB0KSAtIDEpICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIChNYXRoLnNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5FbGFzdGljID0gZnVuY3Rpb24gZWFzZUluRWxhc3RpYyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgdmFyIHAgPSAwO1xuICAgICAgICAgICAgdmFyIGEgPSBjO1xuICAgICAgICAgICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodCAvPSBkKSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiICsgYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcCkge1xuICAgICAgICAgICAgICAgIHAgPSBkICogLjM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYSA8IE1hdGguYWJzKGMpKSB7XG4gICAgICAgICAgICAgICAgYSA9IGM7XG4gICAgICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIC0oYSAqIE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRFbGFzdGljID0gZnVuY3Rpb24gZWFzZU91dEVsYXN0aWModCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIHZhciBwID0gMDtcbiAgICAgICAgICAgIHZhciBhID0gYztcbiAgICAgICAgICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXApIHtcbiAgICAgICAgICAgICAgICBwID0gZCAqIC4zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgICAgICAgICAgICAgIGEgPSBjO1xuICAgICAgICAgICAgICAgIHMgPSBwIC8gNDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogdCkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSArIGMgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0RWxhc3RpYyA9IGZ1bmN0aW9uIGVhc2VJbk91dEVsYXN0aWModCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIHZhciBwID0gMDtcbiAgICAgICAgICAgIHZhciBhID0gYztcbiAgICAgICAgICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpID09PSAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwKSB7XG4gICAgICAgICAgICAgICAgcCA9IGQgKiAoLjMgKiAxLjUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgICAgICAgICAgICAgIGEgPSBjO1xuICAgICAgICAgICAgICAgIHMgPSBwIC8gNDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0IDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtLjUgKiAoYSAqIE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKiAuNSArIGMgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluQmFjayA9IGZ1bmN0aW9uIGVhc2VJbkJhY2sodCwgYiwgYywgZCwgcykge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCwgcykpIHtcbiAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogKChzICsgMSkgKiB0IC0gcykgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dEJhY2sgPSBmdW5jdGlvbiBlYXNlT3V0QmFjayh0LCBiLCBjLCBkLCBzKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkLCBzKSkge1xuICAgICAgICAgICAgaWYgKHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHMgPSAxLjcwMTU4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqICgocyArIDEpICogdCArIHMpICsgMSkgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0QmFjayA9IGZ1bmN0aW9uIGVhc2VJbk91dEJhY2sodCwgYiwgYywgZCwgcykge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCwgcykpIHtcbiAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogKHQgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgLSBzKSkgKyBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0ICsgcykgKyAyKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5Cb3VuY2UgPSBmdW5jdGlvbiBlYXNlSW5Cb3VuY2UodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjIC0gRWFzaW5nLmVhc2VPdXRCb3VuY2UoZCAtIHQsIDAsIGMsIGQpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRCb3VuY2UgPSBmdW5jdGlvbiBlYXNlT3V0Qm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCkgPCAxIC8gMi43NSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqIHQgKiB0KSArIGI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHQgPCAyIC8gMi43NSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDEuNSAvIDIuNzUpICogdCArIC43NSkgKyBiO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0IDwgMi41IC8gMi43NSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDIuMjUgLyAyLjc1KSAqIHQgKyAuOTM3NSkgKyBiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjYyNSAvIDIuNzUpICogdCArIC45ODQzNzUpICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dEJvdW5jZSA9IGZ1bmN0aW9uIGVhc2VJbk91dEJvdW5jZSh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgaWYgKHQgPCBkIC8gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBFYXNpbmcuZWFzZUluQm91bmNlKHQgKiAyLCAwLCBjLCBkKSAqIC41ICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBFYXNpbmcuZWFzZU91dEJvdW5jZSh0ICogMiAtIGQsIDAsIGMsIGQpICogLjUgKyBjICogLjUgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gRWFzaW5nO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBFYXNpbmc7XG5cbkVhc2luZy5kZWYgPSBcImVhc2VPdXRRdWFkXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc0FuaW1hdGlvbkVhc2luZy50c1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggYnJvd3NlclxuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBCcm93c2VyID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJyb3dzZXIoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCcm93c2VyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgYnJvd3NlciBpbmZvXG4gICAgICogQHJldHVybiB7e2Jyb3dzZXI6IHN0cmluZywgbW9iaWxlOiBib29sZWFuLCB2ZXJzaW9uOiBzdHJpbmd9fVxuICAgICAqL1xuICAgIEJyb3dzZXIuZ2V0SW5mbyA9IGZ1bmN0aW9uIGdldEluZm8oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBicm93c2VyOiBCcm93c2VyLmdldE5hbWUoKSxcbiAgICAgICAgICAgIG1vYmlsZTogQnJvd3Nlci5pc01vYmlsZSgpLFxuICAgICAgICAgICAgdmVyc2lvbjogQnJvd3Nlci5nZXRWZXJzaW9uKClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBicm93c2VyIG5hbWVcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0TmFtZSA9IGZ1bmN0aW9uIGdldE5hbWUoKSB7XG4gICAgICAgIHZhciBicm93c2VyID0gdm9pZCAwO1xuICAgICAgICBpZiAoQnJvd3Nlci5pc09wZXJhKCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBcIk9wZXJhXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc09wZXJhTmV3KCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBcIk9wZXJhXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc01TSUUoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IFwiTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc01TSUVOZXcoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IFwiTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc0Nocm9tZSgpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gXCJDaHJvbWVcIjtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzRmlyZWZveCgpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gXCJGaXJlZm94XCI7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc1NhZmFyaSgpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gXCJTYWZhcmlcIjtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzT3RoZXIoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IEJyb3dzZXIuZ2V0T3RoZXJOYW1lKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJyb3dzZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgYnJvd3NlciB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmdldFZlcnNpb24gPSBmdW5jdGlvbiBnZXRWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyc2lvbiA9IHZvaWQgMDtcbiAgICAgICAgaWYgKEJyb3dzZXIuaXNPcGVyYSgpKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRPcGVyYVZlcnNpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzT3BlcmFOZXcoKSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IEJyb3dzZXIuZ2V0T3BlcmFOZXdWZXJzaW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc01TSUUoKSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IEJyb3dzZXIuZ2V0TVNJRVZlcnNpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzTVNJRU5ldygpKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRNU0lFTmV3VmVyc2lvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNDaHJvbWUoKSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IEJyb3dzZXIuZ2V0Q2hyb21lVmVyc2lvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNGaXJlZm94KCkpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldEZpcmVmb3hWZXJzaW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc1NhZmFyaSgpKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRTYWZhcmlWZXJzaW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc090aGVyKCkpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldE90aGVyVmVyc2lvbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVHJpbSBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcGFyYW0gdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci50cmltVmVyc2lvbiA9IGZ1bmN0aW9uIHRyaW1WZXJzaW9uKHZlcnNpb24pIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB2YXIgY2hhcnMgPSBbXCI7XCIsIFwiIFwiLCBcIilcIl07XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBjaGFycywgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvciksIF9pID0gMCwgX2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgICAgICB2YXIgX3JlZjtcblxuICAgICAgICAgICAgICAgIGlmIChfaXNBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgX2kgPSBfaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2kuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIF9yZWYgPSBfaS52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgY2hhciA9IF9yZWY7XG5cbiAgICAgICAgICAgICAgICB2YXIgaXggPSB2ZXJzaW9uLmluZGV4T2YoY2hhcik7XG4gICAgICAgICAgICAgICAgaWYgKGl4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uID0gdmVyc2lvbi5zdWJzdHJpbmcoMCwgaXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIG1vYmlsZVxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNNb2JpbGUgPSBmdW5jdGlvbiBpc01vYmlsZSgpIHtcbiAgICAgICAgcmV0dXJuICgvTW9iaWxlfG1pbml8RmVubmVjfEFuZHJvaWR8aVAoYWR8b2R8aG9uZSkvLnRlc3QobmF2aWdhdG9yLmFwcFZlcnNpb24pXG4gICAgICAgICk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBvcGVyYSBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc09wZXJhID0gZnVuY3Rpb24gaXNPcGVyYSgpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk9wZXJhXCIpICE9PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBvcGVyYSBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0T3BlcmFWZXJzaW9uID0gZnVuY3Rpb24gZ2V0T3BlcmFWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT3BlcmFcIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNik7XG4gICAgICAgIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlZlcnNpb25cIik7XG4gICAgICAgIGlmICh2ZXJPZmZzZXQgIT09IC0xKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEJyb3dzZXIudHJpbVZlcnNpb24odmVyc2lvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBvcGVyYSBuZXcgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNPcGVyYU5ldyA9IGZ1bmN0aW9uIGlzT3BlcmFOZXcoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPUFJcIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IG9wZXJhIG5ldyBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0T3BlcmFOZXdWZXJzaW9uID0gZnVuY3Rpb24gZ2V0T3BlcmFOZXdWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT1BSXCIpO1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDQpO1xuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIG1zaWUgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNNU0lFID0gZnVuY3Rpb24gaXNNU0lFKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKSAhPT0gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgbXNpZSBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0TVNJRVZlcnNpb24gPSBmdW5jdGlvbiBnZXRNU0lFVmVyc2lvbigpIHtcbiAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSk7XG4gICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgbXNpZSBuZXcgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNNU0lFTmV3ID0gZnVuY3Rpb24gaXNNU0lFTmV3KCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiVHJpZGVudC9cIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IG1zaWUgbmV3IGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRNU0lFTmV3VmVyc2lvbiA9IGZ1bmN0aW9uIGdldE1TSUVOZXdWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcInJ2OlwiKSArIDMpO1xuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIGNocm9tZSBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc0Nocm9tZSA9IGZ1bmN0aW9uIGlzQ2hyb21lKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpICE9PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBjaHJvbWUgYnJvd3NlciB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmdldENocm9tZVZlcnNpb24gPSBmdW5jdGlvbiBnZXRDaHJvbWVWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQ2hyb21lXCIpO1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDcpO1xuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIHNhZmFyaSBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc1NhZmFyaSA9IGZ1bmN0aW9uIGlzU2FmYXJpKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiU2FmYXJpXCIpICE9PSAtMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIikgPT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNhZmFyaSBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0U2FmYXJpVmVyc2lvbiA9IGZ1bmN0aW9uIGdldFNhZmFyaVZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJTYWZhcmlcIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNyk7XG4gICAgICAgIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlZlcnNpb25cIik7XG4gICAgICAgIGlmICh2ZXJPZmZzZXQgIT09IC0xKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEJyb3dzZXIudHJpbVZlcnNpb24odmVyc2lvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBmaXJlZm94IGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzRmlyZWZveCA9IGZ1bmN0aW9uIGlzRmlyZWZveCgpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGZpcmVmb3ggYnJvd3NlciB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmdldEZpcmVmb3hWZXJzaW9uID0gZnVuY3Rpb24gZ2V0RmlyZWZveFZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJGaXJlZm94XCIpO1xuICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIG90aGVyIGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzT3RoZXIgPSBmdW5jdGlvbiBpc090aGVyKCkge1xuICAgICAgICB2YXIgbmFtZU9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIgXCIpICsgMTtcbiAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIvXCIpO1xuICAgICAgICByZXR1cm4gbmFtZU9mZnNldCA8IHZlck9mZnNldDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBvdGhlciBicm93c2VyIG5hbWVcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0T3RoZXJOYW1lID0gZnVuY3Rpb24gZ2V0T3RoZXJOYW1lKCkge1xuICAgICAgICB2YXIgbmFtZU9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIgXCIpICsgMTtcbiAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIvXCIpO1xuICAgICAgICB2YXIgYnJvd3NlciA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKG5hbWVPZmZzZXQsIHZlck9mZnNldCk7XG4gICAgICAgIGlmIChicm93c2VyLnRvTG93ZXJDYXNlKCkgPT09IGJyb3dzZXIudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBicm93c2VyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IG90aGVyIGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRPdGhlclZlcnNpb24gPSBmdW5jdGlvbiBnZXRPdGhlclZlcnNpb24oKSB7XG4gICAgICAgIHZhciBuYW1lT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5sYXN0SW5kZXhPZihcIiBcIikgKyAxO1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5sYXN0SW5kZXhPZihcIi9cIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgMSk7XG4gICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgYnJvd3NlciBzdXBwb3J0XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgICAgICByZXR1cm4gIUJyb3dzZXIuaXNNU0lFKCkgfHwgcGFyc2VJbnQoQnJvd3Nlci5nZXRNU0lFVmVyc2lvbigpLCAxMCkgPiA4O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgV2ViS2l0IGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzV2ViS2l0ID0gZnVuY3Rpb24gaXNXZWJLaXQoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJBcHBsZVdlYktpdC9cIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgR2Vja28gYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNHZWNrbyA9IGZ1bmN0aW9uIGlzR2Vja28oKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJHZWNrb1wiKSA+IC0xICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIktIVE1MXCIpID09PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIEFuZHJvaWQgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNBbmRyb2lkID0gZnVuY3Rpb24gaXNBbmRyb2lkKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQW5kcm9pZFwiKSA+IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgTGludXggYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNMaW51eCA9IGZ1bmN0aW9uIGlzTGludXgoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJMaW51eFwiKSA+IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgaVBhZCBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc1RhYmxldFBDID0gZnVuY3Rpb24gaXNUYWJsZXRQQygpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcImlQYWRcIikgPiAtMTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEJyb3dzZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEJyb3dzZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc0Jyb3dzZXIudHNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgVVJMID0gcmVxdWlyZShcInVybFwiKTtcbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBjb29raWVcbiAqL1xuXG52YXIgQ29va2llID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvb2tpZSgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENvb2tpZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCByZXR1cm5zIHRoZSBmbGFnIHdoZXRoZXIgc3VwcG9ydGVkIHRoaXMgc3RvcmFnZSB0eXBlIG9yIG5vdFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIENvb2tpZS5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uIGlzU3VwcG9ydGVkKCkge1xuICAgICAgICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGRvY3VtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGRvY3VtZW50LmNvb2tpZSA9PT0gXCJzdHJpbmdcIjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXRob2Qgc2V0cyB0aGUgdmFsdWUgYW5kIHJldHVybnMgdHJ1ZSBpZiBpdCBoYXMgYmVlbiBzZXRcbiAgICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gdmFsdWUge3N0cmluZ31cbiAgICAgKiBAcGFyYW0gZXhwaXJlcyB7bnVtYmVyfVxuICAgICAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9XG4gICAgICogQHBhcmFtIGRvbWFpbiB7c3RyaW5nfVxuICAgICAqIEBwYXJhbSBzZWN1cmUge2Jvb2xlYW59XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQ29va2llLnNldEl0ZW0gPSBmdW5jdGlvbiBzZXRJdGVtKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuICAgICAgICB2YXIga2V5ID0gYXJndW1lbnRzWzFdO1xuICAgICAgICB2YXIgdmFsdWUgPSBhcmd1bWVudHNbMl07XG4gICAgICAgIHZhciBleHBpcmVzID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiAzMDtcbiAgICAgICAgdmFyIHBhdGggPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IFwiL1wiO1xuICAgICAgICB2YXIgZG9tYWluID0gYXJndW1lbnRzLmxlbmd0aCA+IDUgJiYgYXJndW1lbnRzWzVdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNV0gOiBsb2NhdGlvbi5ob3N0bmFtZTtcbiAgICAgICAgdmFyIHNlY3VyZSA9IGFyZ3VtZW50cy5sZW5ndGggPiA2ICYmIGFyZ3VtZW50c1s2XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzZdIDogbG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCI7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiAmJiBDb29raWUucmVnVmFsaWRLZXkudGVzdChrZXkpICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiAodmFsdWUgPT09IFwiXCIgfHwgQ29va2llLnJlZ1ZhbGlkS2V5LnRlc3QodmFsdWUpKSAmJiB0eXBlb2YgZXhwaXJlcyA9PT0gXCJudW1iZXJcIiAmJiBleHBpcmVzIDwgMzY1ICYmIHR5cGVvZiBwYXRoID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBkb21haW4gPT09IFwic3RyaW5nXCIgJiYgZG9tYWluLmluZGV4T2YobG9jYXRpb24uaG9zdG5hbWUpICE9PSAtMSAmJiB0eXBlb2Ygc2VjdXJlID09PSBcImJvb2xlYW5cIiAmJiBzZWN1cmUgPT09IChsb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIikpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgdmFyIHUgPSBVUkwucGFyc2UoXCJodHRwOi8vXCIgKyBkb21haW4gKyBwYXRoKTtcbiAgICAgICAgICAgICAgICBpZiAodS5ob3N0bmFtZSA9PT0gZG9tYWluIHx8IHUucGF0aCA9PT0gcGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IENvb2tpZS5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIFNhdmUgY29va2llcyBmb3IgMzAgZGF5c1xuICAgICAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge0RhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIGV4cGlyZXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBleHAgPSBkYXRlLnRvVVRDU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIEVuY29kZSB2YWx1ZSBmb3Igc3RvcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogV3JpdGluZyB2YWx1ZSB0byB0aGUgZG9jdW1lbnQgY29va2llIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGtleSArIFwiPVwiICsgdmFsdWUgKyAoZXhwID8gXCI7IGV4cGlyZXM9XCIgKyBleHAgOiBcIlwiKSArIChwYXRoID8gXCI7IHBhdGg9XCIgKyBwYXRoIDogXCJcIikgKyAoZG9tYWluID8gXCI7IGRvbWFpbj1cIiArIGRvbWFpbiA6IFwiXCIpICsgKHNlY3VyZSA/IFwiOyBzZWN1cmVcIiA6IFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBJZiBhbGwgb2sgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSkgPT09IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCByZWFkcyB0aGUgdmFsdWUgYW5kIHJldHVybnMgaXQgb3IgcmV0dXJucyBmYWxzZSBpZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfGJvb2xlYW59XG4gICAgICovXG5cblxuICAgIENvb2tpZS5nZXRJdGVtID0gZnVuY3Rpb24gZ2V0SXRlbSgpIHtcbiAgICAgICAgdmFyIGNoZWNrU3VwcG9ydCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcbiAgICAgICAgdmFyIGtleSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tTdXBwb3J0ID09PSBcImJvb2xlYW5cIiAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICYmIENvb2tpZS5yZWdWYWxpZEtleS50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IENvb2tpZS5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBHZXQgdGhlIGFycmF5IGZyb20gZG9jdW1lbnQgY29va2llIHNwbGl0IGJ5IDtcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyckNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggdGhlIGNvb2tpZXNcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGFyckNvb2tpZSwgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvciksIF9pID0gMCwgX2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmVmO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZiA9IF9pdGVyYXRvcltfaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2kgPSBfaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVmID0gX2kudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpID0gX3JlZjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBUcmltIGFuZCBzcGxpdCBlYWNoIGNvb2tpZSBieSA9IGZvciBrZXkgdmFsdWUgcGFyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IGkudHJpbSgpLnNwbGl0KFwiPVwiLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogSWYgaXQgaXMgY29ycmVjdCBjb29raWUga2V5IHJldHVybiB0aGUgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZbMF0gPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIElmIHRoZSB2YWx1ZSB3YXMgZm91bmQgcmV0dXJuIHRoZSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQodlsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIHRoZSB2YWx1ZSB3YXMgbm90IGZvdW5kIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCByZW1vdmVzIHRoZSB2YWx1ZSBhbmQgcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0XG4gICAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIENvb2tpZS5yZW1vdmVJdGVtID0gZnVuY3Rpb24gcmVtb3ZlSXRlbSgpIHtcbiAgICAgICAgdmFyIGNoZWNrU3VwcG9ydCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogdHJ1ZTtcbiAgICAgICAgdmFyIGtleSA9IGFyZ3VtZW50c1sxXTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY2hlY2tTdXBwb3J0ID09PSBcImJvb2xlYW5cIiAmJiB0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiICYmIENvb2tpZS5yZWdWYWxpZEtleS50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IENvb2tpZS5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBTZXQgZW1wdHkgb3ZlcmR1ZSB2YWx1ZSBieSBrZXlcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIENvb2tpZS5zZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5LCBcIlwiLCAtMSAqIDI0ICogNjAgKiA2MCk7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBhbGwgb2sgcmV0dXJuIHRydWVcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBDb29raWUuZ2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSkgPT09IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhlIG1ldGhvZCByZXR1cm5zIHRoZSBhcnJheSBvZiBzdHJpbmcgb2YgYXZhaWxhYmxlIGtleXNcbiAgICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICAgKi9cblxuXG4gICAgQ29va2llLmdldEtleXMgPSBmdW5jdGlvbiBnZXRLZXlzKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCBDb29raWUuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogVGhlIGFycmF5IG9mIGF2YWlsYWJsZSBrZXlzXG4gICAgICAgICAgICAgICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHZhciBhcnJLZXlzID0gW107XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBHZXQgdGhlIGFycmF5IGZyb20gZG9jdW1lbnQgY29va2llIHNwbGl0IGJ5IDtcbiAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyckNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJdGVyYXRlIHRocm91Z2ggdGhlIGNvb2tpZXNcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBhcnJDb29raWUsIF9pc0FycmF5MiA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yMiksIF9pMiA9IDAsIF9pdGVyYXRvcjIgPSBfaXNBcnJheTIgPyBfaXRlcmF0b3IyIDogX2l0ZXJhdG9yMltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pMiA+PSBfaXRlcmF0b3IyLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZjIgPSBfaXRlcmF0b3IyW19pMisrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2kyID0gX2l0ZXJhdG9yMi5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pMi5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVmMiA9IF9pMi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBfcmVmMjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBUcmltIGFuZCBzcGxpdCBlYWNoIGNvb2tpZSBieSA9IGZvciBrZXkgdmFsdWUgcGFyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdiA9IGkudHJpbSgpLnNwbGl0KFwiPVwiLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogQWRkIGtleSB0byB0aGUgbGlzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodlswXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFycktleXMucHVzaCh2WzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyS2V5cztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIElmIGlucHV0IGRhdGEgaXMgbm90IHZhbGlkXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRoZSBtZXRob2QgY2xlYW5zIHRoZSBzdG9yYWdlIGFuZCByZXR1cm4gdHJ1ZSBpZiBpdCBpcyBlbXB0eVxuICAgICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIENvb2tpZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgICB2YXIgY2hlY2tTdXBwb3J0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB0cnVlO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCBDb29raWUuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyS2V5cyA9IENvb2tpZS5nZXRLZXlzKGNoZWNrU3VwcG9ydCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhcnJLZXlzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gYXJyS2V5cywgX2lzQXJyYXkzID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IzKSwgX2kzID0gMCwgX2l0ZXJhdG9yMyA9IF9pc0FycmF5MyA/IF9pdGVyYXRvcjMgOiBfaXRlcmF0b3IzW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZWYzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pc0FycmF5Mykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2kzID49IF9pdGVyYXRvcjMubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZjMgPSBfaXRlcmF0b3IzW19pMysrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaTMgPSBfaXRlcmF0b3IzLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pMy5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZjMgPSBfaTMudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBfcmVmMztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvb2tpZS5yZW1vdmVJdGVtKGNoZWNrU3VwcG9ydCwgaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIENvb2tpZS5nZXRLZXlzKGNoZWNrU3VwcG9ydCkubGVuZ3RoID09PSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBDb29raWU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IENvb2tpZTtcblxuQ29va2llLnJlZ1ZhbGlkS2V5ID0gbmV3IFJlZ0V4cChcIihbYS16QS1aMC05Xy1dezEsfSlcIiwgXCJpXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9VdGlscy9saWIvVXRpbHNDb29raWUudHNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIHB1bnljb2RlID0gcmVxdWlyZSgncHVueWNvZGUnKTtcblxuZXhwb3J0cy5wYXJzZSA9IHVybFBhcnNlO1xuZXhwb3J0cy5yZXNvbHZlID0gdXJsUmVzb2x2ZTtcbmV4cG9ydHMucmVzb2x2ZU9iamVjdCA9IHVybFJlc29sdmVPYmplY3Q7XG5leHBvcnRzLmZvcm1hdCA9IHVybEZvcm1hdDtcblxuZXhwb3J0cy5VcmwgPSBVcmw7XG5cbmZ1bmN0aW9uIFVybCgpIHtcbiAgdGhpcy5wcm90b2NvbCA9IG51bGw7XG4gIHRoaXMuc2xhc2hlcyA9IG51bGw7XG4gIHRoaXMuYXV0aCA9IG51bGw7XG4gIHRoaXMuaG9zdCA9IG51bGw7XG4gIHRoaXMucG9ydCA9IG51bGw7XG4gIHRoaXMuaG9zdG5hbWUgPSBudWxsO1xuICB0aGlzLmhhc2ggPSBudWxsO1xuICB0aGlzLnNlYXJjaCA9IG51bGw7XG4gIHRoaXMucXVlcnkgPSBudWxsO1xuICB0aGlzLnBhdGhuYW1lID0gbnVsbDtcbiAgdGhpcy5wYXRoID0gbnVsbDtcbiAgdGhpcy5ocmVmID0gbnVsbDtcbn1cblxuLy8gUmVmZXJlbmNlOiBSRkMgMzk4NiwgUkZDIDE4MDgsIFJGQyAyMzk2XG5cbi8vIGRlZmluZSB0aGVzZSBoZXJlIHNvIGF0IGxlYXN0IHRoZXkgb25seSBoYXZlIHRvIGJlXG4vLyBjb21waWxlZCBvbmNlIG9uIHRoZSBmaXJzdCBtb2R1bGUgbG9hZC5cbnZhciBwcm90b2NvbFBhdHRlcm4gPSAvXihbYS16MC05ListXSs6KS9pLFxuICAgIHBvcnRQYXR0ZXJuID0gLzpbMC05XSokLyxcblxuICAgIC8vIFJGQyAyMzk2OiBjaGFyYWN0ZXJzIHJlc2VydmVkIGZvciBkZWxpbWl0aW5nIFVSTHMuXG4gICAgLy8gV2UgYWN0dWFsbHkganVzdCBhdXRvLWVzY2FwZSB0aGVzZS5cbiAgICBkZWxpbXMgPSBbJzwnLCAnPicsICdcIicsICdgJywgJyAnLCAnXFxyJywgJ1xcbicsICdcXHQnXSxcblxuICAgIC8vIFJGQyAyMzk2OiBjaGFyYWN0ZXJzIG5vdCBhbGxvd2VkIGZvciB2YXJpb3VzIHJlYXNvbnMuXG4gICAgdW53aXNlID0gWyd7JywgJ30nLCAnfCcsICdcXFxcJywgJ14nLCAnYCddLmNvbmNhdChkZWxpbXMpLFxuXG4gICAgLy8gQWxsb3dlZCBieSBSRkNzLCBidXQgY2F1c2Ugb2YgWFNTIGF0dGFja3MuICBBbHdheXMgZXNjYXBlIHRoZXNlLlxuICAgIGF1dG9Fc2NhcGUgPSBbJ1xcJyddLmNvbmNhdCh1bndpc2UpLFxuICAgIC8vIENoYXJhY3RlcnMgdGhhdCBhcmUgbmV2ZXIgZXZlciBhbGxvd2VkIGluIGEgaG9zdG5hbWUuXG4gICAgLy8gTm90ZSB0aGF0IGFueSBpbnZhbGlkIGNoYXJzIGFyZSBhbHNvIGhhbmRsZWQsIGJ1dCB0aGVzZVxuICAgIC8vIGFyZSB0aGUgb25lcyB0aGF0IGFyZSAqZXhwZWN0ZWQqIHRvIGJlIHNlZW4sIHNvIHdlIGZhc3QtcGF0aFxuICAgIC8vIHRoZW0uXG4gICAgbm9uSG9zdENoYXJzID0gWyclJywgJy8nLCAnPycsICc7JywgJyMnXS5jb25jYXQoYXV0b0VzY2FwZSksXG4gICAgaG9zdEVuZGluZ0NoYXJzID0gWycvJywgJz8nLCAnIyddLFxuICAgIGhvc3RuYW1lTWF4TGVuID0gMjU1LFxuICAgIGhvc3RuYW1lUGFydFBhdHRlcm4gPSAvXlthLXowLTlBLVpfLV17MCw2M30kLyxcbiAgICBob3N0bmFtZVBhcnRTdGFydCA9IC9eKFthLXowLTlBLVpfLV17MCw2M30pKC4qKSQvLFxuICAgIC8vIHByb3RvY29scyB0aGF0IGNhbiBhbGxvdyBcInVuc2FmZVwiIGFuZCBcInVud2lzZVwiIGNoYXJzLlxuICAgIHVuc2FmZVByb3RvY29sID0ge1xuICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuICAgICAgJ2phdmFzY3JpcHQ6JzogdHJ1ZVxuICAgIH0sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgbmV2ZXIgaGF2ZSBhIGhvc3RuYW1lLlxuICAgIGhvc3RsZXNzUHJvdG9jb2wgPSB7XG4gICAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG4gICAgfSxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBhbHdheXMgY29udGFpbiBhIC8vIGJpdC5cbiAgICBzbGFzaGVkUHJvdG9jb2wgPSB7XG4gICAgICAnaHR0cCc6IHRydWUsXG4gICAgICAnaHR0cHMnOiB0cnVlLFxuICAgICAgJ2Z0cCc6IHRydWUsXG4gICAgICAnZ29waGVyJzogdHJ1ZSxcbiAgICAgICdmaWxlJzogdHJ1ZSxcbiAgICAgICdodHRwOic6IHRydWUsXG4gICAgICAnaHR0cHM6JzogdHJ1ZSxcbiAgICAgICdmdHA6JzogdHJ1ZSxcbiAgICAgICdnb3BoZXI6JzogdHJ1ZSxcbiAgICAgICdmaWxlOic6IHRydWVcbiAgICB9LFxuICAgIHF1ZXJ5c3RyaW5nID0gcmVxdWlyZSgncXVlcnlzdHJpbmcnKTtcblxuZnVuY3Rpb24gdXJsUGFyc2UodXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCkge1xuICBpZiAodXJsICYmIGlzT2JqZWN0KHVybCkgJiYgdXJsIGluc3RhbmNlb2YgVXJsKSByZXR1cm4gdXJsO1xuXG4gIHZhciB1ID0gbmV3IFVybDtcbiAgdS5wYXJzZSh1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KTtcbiAgcmV0dXJuIHU7XG59XG5cblVybC5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbih1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KSB7XG4gIGlmICghaXNTdHJpbmcodXJsKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQYXJhbWV0ZXIgJ3VybCcgbXVzdCBiZSBhIHN0cmluZywgbm90IFwiICsgdHlwZW9mIHVybCk7XG4gIH1cblxuICB2YXIgcmVzdCA9IHVybDtcblxuICAvLyB0cmltIGJlZm9yZSBwcm9jZWVkaW5nLlxuICAvLyBUaGlzIGlzIHRvIHN1cHBvcnQgcGFyc2Ugc3R1ZmYgbGlrZSBcIiAgaHR0cDovL2Zvby5jb20gIFxcblwiXG4gIHJlc3QgPSByZXN0LnRyaW0oKTtcblxuICB2YXIgcHJvdG8gPSBwcm90b2NvbFBhdHRlcm4uZXhlYyhyZXN0KTtcbiAgaWYgKHByb3RvKSB7XG4gICAgcHJvdG8gPSBwcm90b1swXTtcbiAgICB2YXIgbG93ZXJQcm90byA9IHByb3RvLnRvTG93ZXJDYXNlKCk7XG4gICAgdGhpcy5wcm90b2NvbCA9IGxvd2VyUHJvdG87XG4gICAgcmVzdCA9IHJlc3Quc3Vic3RyKHByb3RvLmxlbmd0aCk7XG4gIH1cblxuICAvLyBmaWd1cmUgb3V0IGlmIGl0J3MgZ290IGEgaG9zdFxuICAvLyB1c2VyQHNlcnZlciBpcyAqYWx3YXlzKiBpbnRlcnByZXRlZCBhcyBhIGhvc3RuYW1lLCBhbmQgdXJsXG4gIC8vIHJlc29sdXRpb24gd2lsbCB0cmVhdCAvL2Zvby9iYXIgYXMgaG9zdD1mb28scGF0aD1iYXIgYmVjYXVzZSB0aGF0J3NcbiAgLy8gaG93IHRoZSBicm93c2VyIHJlc29sdmVzIHJlbGF0aXZlIFVSTHMuXG4gIGlmIChzbGFzaGVzRGVub3RlSG9zdCB8fCBwcm90byB8fCByZXN0Lm1hdGNoKC9eXFwvXFwvW15AXFwvXStAW15AXFwvXSsvKSkge1xuICAgIHZhciBzbGFzaGVzID0gcmVzdC5zdWJzdHIoMCwgMikgPT09ICcvLyc7XG4gICAgaWYgKHNsYXNoZXMgJiYgIShwcm90byAmJiBob3N0bGVzc1Byb3RvY29sW3Byb3RvXSkpIHtcbiAgICAgIHJlc3QgPSByZXN0LnN1YnN0cigyKTtcbiAgICAgIHRoaXMuc2xhc2hlcyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFob3N0bGVzc1Byb3RvY29sW3Byb3RvXSAmJlxuICAgICAgKHNsYXNoZXMgfHwgKHByb3RvICYmICFzbGFzaGVkUHJvdG9jb2xbcHJvdG9dKSkpIHtcblxuICAgIC8vIHRoZXJlJ3MgYSBob3N0bmFtZS5cbiAgICAvLyB0aGUgZmlyc3QgaW5zdGFuY2Ugb2YgLywgPywgOywgb3IgIyBlbmRzIHRoZSBob3N0LlxuICAgIC8vXG4gICAgLy8gSWYgdGhlcmUgaXMgYW4gQCBpbiB0aGUgaG9zdG5hbWUsIHRoZW4gbm9uLWhvc3QgY2hhcnMgKmFyZSogYWxsb3dlZFxuICAgIC8vIHRvIHRoZSBsZWZ0IG9mIHRoZSBsYXN0IEAgc2lnbiwgdW5sZXNzIHNvbWUgaG9zdC1lbmRpbmcgY2hhcmFjdGVyXG4gICAgLy8gY29tZXMgKmJlZm9yZSogdGhlIEAtc2lnbi5cbiAgICAvLyBVUkxzIGFyZSBvYm5veGlvdXMuXG4gICAgLy9cbiAgICAvLyBleDpcbiAgICAvLyBodHRwOi8vYUBiQGMvID0+IHVzZXI6YUBiIGhvc3Q6Y1xuICAgIC8vIGh0dHA6Ly9hQGI/QGMgPT4gdXNlcjphIGhvc3Q6YyBwYXRoOi8/QGNcblxuICAgIC8vIHYwLjEyIFRPRE8oaXNhYWNzKTogVGhpcyBpcyBub3QgcXVpdGUgaG93IENocm9tZSBkb2VzIHRoaW5ncy5cbiAgICAvLyBSZXZpZXcgb3VyIHRlc3QgY2FzZSBhZ2FpbnN0IGJyb3dzZXJzIG1vcmUgY29tcHJlaGVuc2l2ZWx5LlxuXG4gICAgLy8gZmluZCB0aGUgZmlyc3QgaW5zdGFuY2Ugb2YgYW55IGhvc3RFbmRpbmdDaGFyc1xuICAgIHZhciBob3N0RW5kID0gLTE7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBob3N0RW5kaW5nQ2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBoZWMgPSByZXN0LmluZGV4T2YoaG9zdEVuZGluZ0NoYXJzW2ldKTtcbiAgICAgIGlmIChoZWMgIT09IC0xICYmIChob3N0RW5kID09PSAtMSB8fCBoZWMgPCBob3N0RW5kKSlcbiAgICAgICAgaG9zdEVuZCA9IGhlYztcbiAgICB9XG5cbiAgICAvLyBhdCB0aGlzIHBvaW50LCBlaXRoZXIgd2UgaGF2ZSBhbiBleHBsaWNpdCBwb2ludCB3aGVyZSB0aGVcbiAgICAvLyBhdXRoIHBvcnRpb24gY2Fubm90IGdvIHBhc3QsIG9yIHRoZSBsYXN0IEAgY2hhciBpcyB0aGUgZGVjaWRlci5cbiAgICB2YXIgYXV0aCwgYXRTaWduO1xuICAgIGlmIChob3N0RW5kID09PSAtMSkge1xuICAgICAgLy8gYXRTaWduIGNhbiBiZSBhbnl3aGVyZS5cbiAgICAgIGF0U2lnbiA9IHJlc3QubGFzdEluZGV4T2YoJ0AnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYXRTaWduIG11c3QgYmUgaW4gYXV0aCBwb3J0aW9uLlxuICAgICAgLy8gaHR0cDovL2FAYi9jQGQgPT4gaG9zdDpiIGF1dGg6YSBwYXRoOi9jQGRcbiAgICAgIGF0U2lnbiA9IHJlc3QubGFzdEluZGV4T2YoJ0AnLCBob3N0RW5kKTtcbiAgICB9XG5cbiAgICAvLyBOb3cgd2UgaGF2ZSBhIHBvcnRpb24gd2hpY2ggaXMgZGVmaW5pdGVseSB0aGUgYXV0aC5cbiAgICAvLyBQdWxsIHRoYXQgb2ZmLlxuICAgIGlmIChhdFNpZ24gIT09IC0xKSB7XG4gICAgICBhdXRoID0gcmVzdC5zbGljZSgwLCBhdFNpZ24pO1xuICAgICAgcmVzdCA9IHJlc3Quc2xpY2UoYXRTaWduICsgMSk7XG4gICAgICB0aGlzLmF1dGggPSBkZWNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgfVxuXG4gICAgLy8gdGhlIGhvc3QgaXMgdGhlIHJlbWFpbmluZyB0byB0aGUgbGVmdCBvZiB0aGUgZmlyc3Qgbm9uLWhvc3QgY2hhclxuICAgIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vbkhvc3RDaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihub25Ib3N0Q2hhcnNbaV0pO1xuICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgIH1cbiAgICAvLyBpZiB3ZSBzdGlsbCBoYXZlIG5vdCBoaXQgaXQsIHRoZW4gdGhlIGVudGlyZSB0aGluZyBpcyBhIGhvc3QuXG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKVxuICAgICAgaG9zdEVuZCA9IHJlc3QubGVuZ3RoO1xuXG4gICAgdGhpcy5ob3N0ID0gcmVzdC5zbGljZSgwLCBob3N0RW5kKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZShob3N0RW5kKTtcblxuICAgIC8vIHB1bGwgb3V0IHBvcnQuXG4gICAgdGhpcy5wYXJzZUhvc3QoKTtcblxuICAgIC8vIHdlJ3ZlIGluZGljYXRlZCB0aGF0IHRoZXJlIGlzIGEgaG9zdG5hbWUsXG4gICAgLy8gc28gZXZlbiBpZiBpdCdzIGVtcHR5LCBpdCBoYXMgdG8gYmUgcHJlc2VudC5cbiAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcblxuICAgIC8vIGlmIGhvc3RuYW1lIGJlZ2lucyB3aXRoIFsgYW5kIGVuZHMgd2l0aCBdXG4gICAgLy8gYXNzdW1lIHRoYXQgaXQncyBhbiBJUHY2IGFkZHJlc3MuXG4gICAgdmFyIGlwdjZIb3N0bmFtZSA9IHRoaXMuaG9zdG5hbWVbMF0gPT09ICdbJyAmJlxuICAgICAgICB0aGlzLmhvc3RuYW1lW3RoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMV0gPT09ICddJztcblxuICAgIC8vIHZhbGlkYXRlIGEgbGl0dGxlLlxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICB2YXIgaG9zdHBhcnRzID0gdGhpcy5ob3N0bmFtZS5zcGxpdCgvXFwuLyk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGhvc3RwYXJ0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnQgPSBob3N0cGFydHNbaV07XG4gICAgICAgIGlmICghcGFydCkgY29udGludWU7XG4gICAgICAgIGlmICghcGFydC5tYXRjaChob3N0bmFtZVBhcnRQYXR0ZXJuKSkge1xuICAgICAgICAgIHZhciBuZXdwYXJ0ID0gJyc7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGsgPSBwYXJ0Lmxlbmd0aDsgaiA8IGs7IGorKykge1xuICAgICAgICAgICAgaWYgKHBhcnQuY2hhckNvZGVBdChqKSA+IDEyNykge1xuICAgICAgICAgICAgICAvLyB3ZSByZXBsYWNlIG5vbi1BU0NJSSBjaGFyIHdpdGggYSB0ZW1wb3JhcnkgcGxhY2Vob2xkZXJcbiAgICAgICAgICAgICAgLy8gd2UgbmVlZCB0aGlzIHRvIG1ha2Ugc3VyZSBzaXplIG9mIGhvc3RuYW1lIGlzIG5vdFxuICAgICAgICAgICAgICAvLyBicm9rZW4gYnkgcmVwbGFjaW5nIG5vbi1BU0NJSSBieSBub3RoaW5nXG4gICAgICAgICAgICAgIG5ld3BhcnQgKz0gJ3gnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3cGFydCArPSBwYXJ0W2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB3ZSB0ZXN0IGFnYWluIHdpdGggQVNDSUkgY2hhciBvbmx5XG4gICAgICAgICAgaWYgKCFuZXdwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgICB2YXIgdmFsaWRQYXJ0cyA9IGhvc3RwYXJ0cy5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIHZhciBub3RIb3N0ID0gaG9zdHBhcnRzLnNsaWNlKGkgKyAxKTtcbiAgICAgICAgICAgIHZhciBiaXQgPSBwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFN0YXJ0KTtcbiAgICAgICAgICAgIGlmIChiaXQpIHtcbiAgICAgICAgICAgICAgdmFsaWRQYXJ0cy5wdXNoKGJpdFsxXSk7XG4gICAgICAgICAgICAgIG5vdEhvc3QudW5zaGlmdChiaXRbMl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vdEhvc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJlc3QgPSAnLycgKyBub3RIb3N0LmpvaW4oJy4nKSArIHJlc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmhvc3RuYW1lID0gdmFsaWRQYXJ0cy5qb2luKCcuJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5ob3N0bmFtZS5sZW5ndGggPiBob3N0bmFtZU1heExlbikge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBob3N0bmFtZXMgYXJlIGFsd2F5cyBsb3dlciBjYXNlLlxuICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbiAgICBpZiAoIWlwdjZIb3N0bmFtZSkge1xuICAgICAgLy8gSUROQSBTdXBwb3J0OiBSZXR1cm5zIGEgcHVueSBjb2RlZCByZXByZXNlbnRhdGlvbiBvZiBcImRvbWFpblwiLlxuICAgICAgLy8gSXQgb25seSBjb252ZXJ0cyB0aGUgcGFydCBvZiB0aGUgZG9tYWluIG5hbWUgdGhhdFxuICAgICAgLy8gaGFzIG5vbiBBU0NJSSBjaGFyYWN0ZXJzLiBJLmUuIGl0IGRvc2VudCBtYXR0ZXIgaWZcbiAgICAgIC8vIHlvdSBjYWxsIGl0IHdpdGggYSBkb21haW4gdGhhdCBhbHJlYWR5IGlzIGluIEFTQ0lJLlxuICAgICAgdmFyIGRvbWFpbkFycmF5ID0gdGhpcy5ob3N0bmFtZS5zcGxpdCgnLicpO1xuICAgICAgdmFyIG5ld091dCA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb21haW5BcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgcyA9IGRvbWFpbkFycmF5W2ldO1xuICAgICAgICBuZXdPdXQucHVzaChzLm1hdGNoKC9bXkEtWmEtejAtOV8tXS8pID9cbiAgICAgICAgICAgICd4bi0tJyArIHB1bnljb2RlLmVuY29kZShzKSA6IHMpO1xuICAgICAgfVxuICAgICAgdGhpcy5ob3N0bmFtZSA9IG5ld091dC5qb2luKCcuJyk7XG4gICAgfVxuXG4gICAgdmFyIHAgPSB0aGlzLnBvcnQgPyAnOicgKyB0aGlzLnBvcnQgOiAnJztcbiAgICB2YXIgaCA9IHRoaXMuaG9zdG5hbWUgfHwgJyc7XG4gICAgdGhpcy5ob3N0ID0gaCArIHA7XG4gICAgdGhpcy5ocmVmICs9IHRoaXMuaG9zdDtcblxuICAgIC8vIHN0cmlwIFsgYW5kIF0gZnJvbSB0aGUgaG9zdG5hbWVcbiAgICAvLyB0aGUgaG9zdCBmaWVsZCBzdGlsbCByZXRhaW5zIHRoZW0sIHRob3VnaFxuICAgIGlmIChpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lLnN1YnN0cigxLCB0aGlzLmhvc3RuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgaWYgKHJlc3RbMF0gIT09ICcvJykge1xuICAgICAgICByZXN0ID0gJy8nICsgcmVzdDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBub3cgcmVzdCBpcyBzZXQgdG8gdGhlIHBvc3QtaG9zdCBzdHVmZi5cbiAgLy8gY2hvcCBvZmYgYW55IGRlbGltIGNoYXJzLlxuICBpZiAoIXVuc2FmZVByb3RvY29sW2xvd2VyUHJvdG9dKSB7XG5cbiAgICAvLyBGaXJzdCwgbWFrZSAxMDAlIHN1cmUgdGhhdCBhbnkgXCJhdXRvRXNjYXBlXCIgY2hhcnMgZ2V0XG4gICAgLy8gZXNjYXBlZCwgZXZlbiBpZiBlbmNvZGVVUklDb21wb25lbnQgZG9lc24ndCB0aGluayB0aGV5XG4gICAgLy8gbmVlZCB0byBiZS5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGF1dG9Fc2NhcGUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgYWUgPSBhdXRvRXNjYXBlW2ldO1xuICAgICAgdmFyIGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudChhZSk7XG4gICAgICBpZiAoZXNjID09PSBhZSkge1xuICAgICAgICBlc2MgPSBlc2NhcGUoYWUpO1xuICAgICAgfVxuICAgICAgcmVzdCA9IHJlc3Quc3BsaXQoYWUpLmpvaW4oZXNjKTtcbiAgICB9XG4gIH1cblxuXG4gIC8vIGNob3Agb2ZmIGZyb20gdGhlIHRhaWwgZmlyc3QuXG4gIHZhciBoYXNoID0gcmVzdC5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoICE9PSAtMSkge1xuICAgIC8vIGdvdCBhIGZyYWdtZW50IHN0cmluZy5cbiAgICB0aGlzLmhhc2ggPSByZXN0LnN1YnN0cihoYXNoKTtcbiAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBoYXNoKTtcbiAgfVxuICB2YXIgcW0gPSByZXN0LmluZGV4T2YoJz8nKTtcbiAgaWYgKHFtICE9PSAtMSkge1xuICAgIHRoaXMuc2VhcmNoID0gcmVzdC5zdWJzdHIocW0pO1xuICAgIHRoaXMucXVlcnkgPSByZXN0LnN1YnN0cihxbSArIDEpO1xuICAgIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlzdHJpbmcucGFyc2UodGhpcy5xdWVyeSk7XG4gICAgfVxuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIHFtKTtcbiAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG4gICAgLy8gbm8gcXVlcnkgc3RyaW5nLCBidXQgcGFyc2VRdWVyeVN0cmluZyBzdGlsbCByZXF1ZXN0ZWRcbiAgICB0aGlzLnNlYXJjaCA9ICcnO1xuICAgIHRoaXMucXVlcnkgPSB7fTtcbiAgfVxuICBpZiAocmVzdCkgdGhpcy5wYXRobmFtZSA9IHJlc3Q7XG4gIGlmIChzbGFzaGVkUHJvdG9jb2xbbG93ZXJQcm90b10gJiZcbiAgICAgIHRoaXMuaG9zdG5hbWUgJiYgIXRoaXMucGF0aG5hbWUpIHtcbiAgICB0aGlzLnBhdGhuYW1lID0gJy8nO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICBpZiAodGhpcy5wYXRobmFtZSB8fCB0aGlzLnNlYXJjaCkge1xuICAgIHZhciBwID0gdGhpcy5wYXRobmFtZSB8fCAnJztcbiAgICB2YXIgcyA9IHRoaXMuc2VhcmNoIHx8ICcnO1xuICAgIHRoaXMucGF0aCA9IHAgKyBzO1xuICB9XG5cbiAgLy8gZmluYWxseSwgcmVjb25zdHJ1Y3QgdGhlIGhyZWYgYmFzZWQgb24gd2hhdCBoYXMgYmVlbiB2YWxpZGF0ZWQuXG4gIHRoaXMuaHJlZiA9IHRoaXMuZm9ybWF0KCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZm9ybWF0IGEgcGFyc2VkIG9iamVjdCBpbnRvIGEgdXJsIHN0cmluZ1xuZnVuY3Rpb24gdXJsRm9ybWF0KG9iaikge1xuICAvLyBlbnN1cmUgaXQncyBhbiBvYmplY3QsIGFuZCBub3QgYSBzdHJpbmcgdXJsLlxuICAvLyBJZiBpdCdzIGFuIG9iaiwgdGhpcyBpcyBhIG5vLW9wLlxuICAvLyB0aGlzIHdheSwgeW91IGNhbiBjYWxsIHVybF9mb3JtYXQoKSBvbiBzdHJpbmdzXG4gIC8vIHRvIGNsZWFuIHVwIHBvdGVudGlhbGx5IHdvbmt5IHVybHMuXG4gIGlmIChpc1N0cmluZyhvYmopKSBvYmogPSB1cmxQYXJzZShvYmopO1xuICBpZiAoIShvYmogaW5zdGFuY2VvZiBVcmwpKSByZXR1cm4gVXJsLnByb3RvdHlwZS5mb3JtYXQuY2FsbChvYmopO1xuICByZXR1cm4gb2JqLmZvcm1hdCgpO1xufVxuXG5VcmwucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgYXV0aCA9IHRoaXMuYXV0aCB8fCAnJztcbiAgaWYgKGF1dGgpIHtcbiAgICBhdXRoID0gZW5jb2RlVVJJQ29tcG9uZW50KGF1dGgpO1xuICAgIGF1dGggPSBhdXRoLnJlcGxhY2UoLyUzQS9pLCAnOicpO1xuICAgIGF1dGggKz0gJ0AnO1xuICB9XG5cbiAgdmFyIHByb3RvY29sID0gdGhpcy5wcm90b2NvbCB8fCAnJyxcbiAgICAgIHBhdGhuYW1lID0gdGhpcy5wYXRobmFtZSB8fCAnJyxcbiAgICAgIGhhc2ggPSB0aGlzLmhhc2ggfHwgJycsXG4gICAgICBob3N0ID0gZmFsc2UsXG4gICAgICBxdWVyeSA9ICcnO1xuXG4gIGlmICh0aGlzLmhvc3QpIHtcbiAgICBob3N0ID0gYXV0aCArIHRoaXMuaG9zdDtcbiAgfSBlbHNlIGlmICh0aGlzLmhvc3RuYW1lKSB7XG4gICAgaG9zdCA9IGF1dGggKyAodGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgPT09IC0xID9cbiAgICAgICAgdGhpcy5ob3N0bmFtZSA6XG4gICAgICAgICdbJyArIHRoaXMuaG9zdG5hbWUgKyAnXScpO1xuICAgIGlmICh0aGlzLnBvcnQpIHtcbiAgICAgIGhvc3QgKz0gJzonICsgdGhpcy5wb3J0O1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aGlzLnF1ZXJ5ICYmXG4gICAgICBpc09iamVjdCh0aGlzLnF1ZXJ5KSAmJlxuICAgICAgT2JqZWN0LmtleXModGhpcy5xdWVyeSkubGVuZ3RoKSB7XG4gICAgcXVlcnkgPSBxdWVyeXN0cmluZy5zdHJpbmdpZnkodGhpcy5xdWVyeSk7XG4gIH1cblxuICB2YXIgc2VhcmNoID0gdGhpcy5zZWFyY2ggfHwgKHF1ZXJ5ICYmICgnPycgKyBxdWVyeSkpIHx8ICcnO1xuXG4gIGlmIChwcm90b2NvbCAmJiBwcm90b2NvbC5zdWJzdHIoLTEpICE9PSAnOicpIHByb3RvY29sICs9ICc6JztcblxuICAvLyBvbmx5IHRoZSBzbGFzaGVkUHJvdG9jb2xzIGdldCB0aGUgLy8uICBOb3QgbWFpbHRvOiwgeG1wcDosIGV0Yy5cbiAgLy8gdW5sZXNzIHRoZXkgaGFkIHRoZW0gdG8gYmVnaW4gd2l0aC5cbiAgaWYgKHRoaXMuc2xhc2hlcyB8fFxuICAgICAgKCFwcm90b2NvbCB8fCBzbGFzaGVkUHJvdG9jb2xbcHJvdG9jb2xdKSAmJiBob3N0ICE9PSBmYWxzZSkge1xuICAgIGhvc3QgPSAnLy8nICsgKGhvc3QgfHwgJycpO1xuICAgIGlmIChwYXRobmFtZSAmJiBwYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJykgcGF0aG5hbWUgPSAnLycgKyBwYXRobmFtZTtcbiAgfSBlbHNlIGlmICghaG9zdCkge1xuICAgIGhvc3QgPSAnJztcbiAgfVxuXG4gIGlmIChoYXNoICYmIGhhc2guY2hhckF0KDApICE9PSAnIycpIGhhc2ggPSAnIycgKyBoYXNoO1xuICBpZiAoc2VhcmNoICYmIHNlYXJjaC5jaGFyQXQoMCkgIT09ICc/Jykgc2VhcmNoID0gJz8nICsgc2VhcmNoO1xuXG4gIHBhdGhuYW1lID0gcGF0aG5hbWUucmVwbGFjZSgvWz8jXS9nLCBmdW5jdGlvbihtYXRjaCkge1xuICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQobWF0Y2gpO1xuICB9KTtcbiAgc2VhcmNoID0gc2VhcmNoLnJlcGxhY2UoJyMnLCAnJTIzJyk7XG5cbiAgcmV0dXJuIHByb3RvY29sICsgaG9zdCArIHBhdGhuYW1lICsgc2VhcmNoICsgaGFzaDtcbn07XG5cbmZ1bmN0aW9uIHVybFJlc29sdmUoc291cmNlLCByZWxhdGl2ZSkge1xuICByZXR1cm4gdXJsUGFyc2Uoc291cmNlLCBmYWxzZSwgdHJ1ZSkucmVzb2x2ZShyZWxhdGl2ZSk7XG59XG5cblVybC5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uKHJlbGF0aXZlKSB7XG4gIHJldHVybiB0aGlzLnJlc29sdmVPYmplY3QodXJsUGFyc2UocmVsYXRpdmUsIGZhbHNlLCB0cnVlKSkuZm9ybWF0KCk7XG59O1xuXG5mdW5jdGlvbiB1cmxSZXNvbHZlT2JqZWN0KHNvdXJjZSwgcmVsYXRpdmUpIHtcbiAgaWYgKCFzb3VyY2UpIHJldHVybiByZWxhdGl2ZTtcbiAgcmV0dXJuIHVybFBhcnNlKHNvdXJjZSwgZmFsc2UsIHRydWUpLnJlc29sdmVPYmplY3QocmVsYXRpdmUpO1xufVxuXG5VcmwucHJvdG90eXBlLnJlc29sdmVPYmplY3QgPSBmdW5jdGlvbihyZWxhdGl2ZSkge1xuICBpZiAoaXNTdHJpbmcocmVsYXRpdmUpKSB7XG4gICAgdmFyIHJlbCA9IG5ldyBVcmwoKTtcbiAgICByZWwucGFyc2UocmVsYXRpdmUsIGZhbHNlLCB0cnVlKTtcbiAgICByZWxhdGl2ZSA9IHJlbDtcbiAgfVxuXG4gIHZhciByZXN1bHQgPSBuZXcgVXJsKCk7XG4gIE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goZnVuY3Rpb24oaykge1xuICAgIHJlc3VsdFtrXSA9IHRoaXNba107XG4gIH0sIHRoaXMpO1xuXG4gIC8vIGhhc2ggaXMgYWx3YXlzIG92ZXJyaWRkZW4sIG5vIG1hdHRlciB3aGF0LlxuICAvLyBldmVuIGhyZWY9XCJcIiB3aWxsIHJlbW92ZSBpdC5cbiAgcmVzdWx0Lmhhc2ggPSByZWxhdGl2ZS5oYXNoO1xuXG4gIC8vIGlmIHRoZSByZWxhdGl2ZSB1cmwgaXMgZW1wdHksIHRoZW4gdGhlcmUncyBub3RoaW5nIGxlZnQgdG8gZG8gaGVyZS5cbiAgaWYgKHJlbGF0aXZlLmhyZWYgPT09ICcnKSB7XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGhyZWZzIGxpa2UgLy9mb28vYmFyIGFsd2F5cyBjdXQgdG8gdGhlIHByb3RvY29sLlxuICBpZiAocmVsYXRpdmUuc2xhc2hlcyAmJiAhcmVsYXRpdmUucHJvdG9jb2wpIHtcbiAgICAvLyB0YWtlIGV2ZXJ5dGhpbmcgZXhjZXB0IHRoZSBwcm90b2NvbCBmcm9tIHJlbGF0aXZlXG4gICAgT2JqZWN0LmtleXMocmVsYXRpdmUpLmZvckVhY2goZnVuY3Rpb24oaykge1xuICAgICAgaWYgKGsgIT09ICdwcm90b2NvbCcpXG4gICAgICAgIHJlc3VsdFtrXSA9IHJlbGF0aXZlW2tdO1xuICAgIH0pO1xuXG4gICAgLy91cmxQYXJzZSBhcHBlbmRzIHRyYWlsaW5nIC8gdG8gdXJscyBsaWtlIGh0dHA6Ly93d3cuZXhhbXBsZS5jb21cbiAgICBpZiAoc2xhc2hlZFByb3RvY29sW3Jlc3VsdC5wcm90b2NvbF0gJiZcbiAgICAgICAgcmVzdWx0Lmhvc3RuYW1lICYmICFyZXN1bHQucGF0aG5hbWUpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gcmVzdWx0LnBhdGhuYW1lID0gJy8nO1xuICAgIH1cblxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAocmVsYXRpdmUucHJvdG9jb2wgJiYgcmVsYXRpdmUucHJvdG9jb2wgIT09IHJlc3VsdC5wcm90b2NvbCkge1xuICAgIC8vIGlmIGl0J3MgYSBrbm93biB1cmwgcHJvdG9jb2wsIHRoZW4gY2hhbmdpbmdcbiAgICAvLyB0aGUgcHJvdG9jb2wgZG9lcyB3ZWlyZCB0aGluZ3NcbiAgICAvLyBmaXJzdCwgaWYgaXQncyBub3QgZmlsZTosIHRoZW4gd2UgTVVTVCBoYXZlIGEgaG9zdCxcbiAgICAvLyBhbmQgaWYgdGhlcmUgd2FzIGEgcGF0aFxuICAgIC8vIHRvIGJlZ2luIHdpdGgsIHRoZW4gd2UgTVVTVCBoYXZlIGEgcGF0aC5cbiAgICAvLyBpZiBpdCBpcyBmaWxlOiwgdGhlbiB0aGUgaG9zdCBpcyBkcm9wcGVkLFxuICAgIC8vIGJlY2F1c2UgdGhhdCdzIGtub3duIHRvIGJlIGhvc3RsZXNzLlxuICAgIC8vIGFueXRoaW5nIGVsc2UgaXMgYXNzdW1lZCB0byBiZSBhYnNvbHV0ZS5cbiAgICBpZiAoIXNsYXNoZWRQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIE9iamVjdC5rZXlzKHJlbGF0aXZlKS5mb3JFYWNoKGZ1bmN0aW9uKGspIHtcbiAgICAgICAgcmVzdWx0W2tdID0gcmVsYXRpdmVba107XG4gICAgICB9KTtcbiAgICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXN1bHQucHJvdG9jb2wgPSByZWxhdGl2ZS5wcm90b2NvbDtcbiAgICBpZiAoIXJlbGF0aXZlLmhvc3QgJiYgIWhvc3RsZXNzUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdKSB7XG4gICAgICB2YXIgcmVsUGF0aCA9IChyZWxhdGl2ZS5wYXRobmFtZSB8fCAnJykuc3BsaXQoJy8nKTtcbiAgICAgIHdoaWxlIChyZWxQYXRoLmxlbmd0aCAmJiAhKHJlbGF0aXZlLmhvc3QgPSByZWxQYXRoLnNoaWZ0KCkpKTtcbiAgICAgIGlmICghcmVsYXRpdmUuaG9zdCkgcmVsYXRpdmUuaG9zdCA9ICcnO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0bmFtZSkgcmVsYXRpdmUuaG9zdG5hbWUgPSAnJztcbiAgICAgIGlmIChyZWxQYXRoWzBdICE9PSAnJykgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIGlmIChyZWxQYXRoLmxlbmd0aCA8IDIpIHJlbFBhdGgudW5zaGlmdCgnJyk7XG4gICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxQYXRoLmpvaW4oJy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0LnBhdGhuYW1lID0gcmVsYXRpdmUucGF0aG5hbWU7XG4gICAgfVxuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgcmVzdWx0Lmhvc3QgPSByZWxhdGl2ZS5ob3N0IHx8ICcnO1xuICAgIHJlc3VsdC5hdXRoID0gcmVsYXRpdmUuYXV0aDtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSByZWxhdGl2ZS5ob3N0bmFtZSB8fCByZWxhdGl2ZS5ob3N0O1xuICAgIHJlc3VsdC5wb3J0ID0gcmVsYXRpdmUucG9ydDtcbiAgICAvLyB0byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmIChyZXN1bHQucGF0aG5hbWUgfHwgcmVzdWx0LnNlYXJjaCkge1xuICAgICAgdmFyIHAgPSByZXN1bHQucGF0aG5hbWUgfHwgJyc7XG4gICAgICB2YXIgcyA9IHJlc3VsdC5zZWFyY2ggfHwgJyc7XG4gICAgICByZXN1bHQucGF0aCA9IHAgKyBzO1xuICAgIH1cbiAgICByZXN1bHQuc2xhc2hlcyA9IHJlc3VsdC5zbGFzaGVzIHx8IHJlbGF0aXZlLnNsYXNoZXM7XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHZhciBpc1NvdXJjZUFicyA9IChyZXN1bHQucGF0aG5hbWUgJiYgcmVzdWx0LnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSxcbiAgICAgIGlzUmVsQWJzID0gKFxuICAgICAgICAgIHJlbGF0aXZlLmhvc3QgfHxcbiAgICAgICAgICByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJ1xuICAgICAgKSxcbiAgICAgIG11c3RFbmRBYnMgPSAoaXNSZWxBYnMgfHwgaXNTb3VyY2VBYnMgfHxcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdC5ob3N0ICYmIHJlbGF0aXZlLnBhdGhuYW1lKSksXG4gICAgICByZW1vdmVBbGxEb3RzID0gbXVzdEVuZEFicyxcbiAgICAgIHNyY1BhdGggPSByZXN1bHQucGF0aG5hbWUgJiYgcmVzdWx0LnBhdGhuYW1lLnNwbGl0KCcvJykgfHwgW10sXG4gICAgICByZWxQYXRoID0gcmVsYXRpdmUucGF0aG5hbWUgJiYgcmVsYXRpdmUucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHBzeWNob3RpYyA9IHJlc3VsdC5wcm90b2NvbCAmJiAhc2xhc2hlZFByb3RvY29sW3Jlc3VsdC5wcm90b2NvbF07XG5cbiAgLy8gaWYgdGhlIHVybCBpcyBhIG5vbi1zbGFzaGVkIHVybCwgdGhlbiByZWxhdGl2ZVxuICAvLyBsaW5rcyBsaWtlIC4uLy4uIHNob3VsZCBiZSBhYmxlXG4gIC8vIHRvIGNyYXdsIHVwIHRvIHRoZSBob3N0bmFtZSwgYXMgd2VsbC4gIFRoaXMgaXMgc3RyYW5nZS5cbiAgLy8gcmVzdWx0LnByb3RvY29sIGhhcyBhbHJlYWR5IGJlZW4gc2V0IGJ5IG5vdy5cbiAgLy8gTGF0ZXIgb24sIHB1dCB0aGUgZmlyc3QgcGF0aCBwYXJ0IGludG8gdGhlIGhvc3QgZmllbGQuXG4gIGlmIChwc3ljaG90aWMpIHtcbiAgICByZXN1bHQuaG9zdG5hbWUgPSAnJztcbiAgICByZXN1bHQucG9ydCA9IG51bGw7XG4gICAgaWYgKHJlc3VsdC5ob3N0KSB7XG4gICAgICBpZiAoc3JjUGF0aFswXSA9PT0gJycpIHNyY1BhdGhbMF0gPSByZXN1bHQuaG9zdDtcbiAgICAgIGVsc2Ugc3JjUGF0aC51bnNoaWZ0KHJlc3VsdC5ob3N0KTtcbiAgICB9XG4gICAgcmVzdWx0Lmhvc3QgPSAnJztcbiAgICBpZiAocmVsYXRpdmUucHJvdG9jb2wpIHtcbiAgICAgIHJlbGF0aXZlLmhvc3RuYW1lID0gbnVsbDtcbiAgICAgIHJlbGF0aXZlLnBvcnQgPSBudWxsO1xuICAgICAgaWYgKHJlbGF0aXZlLmhvc3QpIHtcbiAgICAgICAgaWYgKHJlbFBhdGhbMF0gPT09ICcnKSByZWxQYXRoWzBdID0gcmVsYXRpdmUuaG9zdDtcbiAgICAgICAgZWxzZSByZWxQYXRoLnVuc2hpZnQocmVsYXRpdmUuaG9zdCk7XG4gICAgICB9XG4gICAgICByZWxhdGl2ZS5ob3N0ID0gbnVsbDtcbiAgICB9XG4gICAgbXVzdEVuZEFicyA9IG11c3RFbmRBYnMgJiYgKHJlbFBhdGhbMF0gPT09ICcnIHx8IHNyY1BhdGhbMF0gPT09ICcnKTtcbiAgfVxuXG4gIGlmIChpc1JlbEFicykge1xuICAgIC8vIGl0J3MgYWJzb2x1dGUuXG4gICAgcmVzdWx0Lmhvc3QgPSAocmVsYXRpdmUuaG9zdCB8fCByZWxhdGl2ZS5ob3N0ID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgcmVsYXRpdmUuaG9zdCA6IHJlc3VsdC5ob3N0O1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IChyZWxhdGl2ZS5ob3N0bmFtZSB8fCByZWxhdGl2ZS5ob3N0bmFtZSA9PT0gJycpID9cbiAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0bmFtZSA6IHJlc3VsdC5ob3N0bmFtZTtcbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIHNyY1BhdGggPSByZWxQYXRoO1xuICAgIC8vIGZhbGwgdGhyb3VnaCB0byB0aGUgZG90LWhhbmRsaW5nIGJlbG93LlxuICB9IGVsc2UgaWYgKHJlbFBhdGgubGVuZ3RoKSB7XG4gICAgLy8gaXQncyByZWxhdGl2ZVxuICAgIC8vIHRocm93IGF3YXkgdGhlIGV4aXN0aW5nIGZpbGUsIGFuZCB0YWtlIHRoZSBuZXcgcGF0aCBpbnN0ZWFkLlxuICAgIGlmICghc3JjUGF0aCkgc3JjUGF0aCA9IFtdO1xuICAgIHNyY1BhdGgucG9wKCk7XG4gICAgc3JjUGF0aCA9IHNyY1BhdGguY29uY2F0KHJlbFBhdGgpO1xuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gIH0gZWxzZSBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKHJlbGF0aXZlLnNlYXJjaCkpIHtcbiAgICAvLyBqdXN0IHB1bGwgb3V0IHRoZSBzZWFyY2guXG4gICAgLy8gbGlrZSBocmVmPSc/Zm9vJy5cbiAgICAvLyBQdXQgdGhpcyBhZnRlciB0aGUgb3RoZXIgdHdvIGNhc2VzIGJlY2F1c2UgaXQgc2ltcGxpZmllcyB0aGUgYm9vbGVhbnNcbiAgICBpZiAocHN5Y2hvdGljKSB7XG4gICAgICByZXN1bHQuaG9zdG5hbWUgPSByZXN1bHQuaG9zdCA9IHNyY1BhdGguc2hpZnQoKTtcbiAgICAgIC8vb2NjYXRpb25hbHkgdGhlIGF1dGggY2FuIGdldCBzdHVjayBvbmx5IGluIGhvc3RcbiAgICAgIC8vdGhpcyBlc3BlY2lhbHkgaGFwcGVucyBpbiBjYXNlcyBsaWtlXG4gICAgICAvL3VybC5yZXNvbHZlT2JqZWN0KCdtYWlsdG86bG9jYWwxQGRvbWFpbjEnLCAnbG9jYWwyQGRvbWFpbjInKVxuICAgICAgdmFyIGF1dGhJbkhvc3QgPSByZXN1bHQuaG9zdCAmJiByZXN1bHQuaG9zdC5pbmRleE9mKCdAJykgPiAwID9cbiAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmhvc3Quc3BsaXQoJ0AnKSA6IGZhbHNlO1xuICAgICAgaWYgKGF1dGhJbkhvc3QpIHtcbiAgICAgICAgcmVzdWx0LmF1dGggPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICAgIHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuICAgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAoIWlzTnVsbChyZXN1bHQucGF0aG5hbWUpIHx8ICFpc051bGwocmVzdWx0LnNlYXJjaCkpIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcbiAgICB9XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmICghc3JjUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBubyBwYXRoIGF0IGFsbC4gIGVhc3kuXG4gICAgLy8gd2UndmUgYWxyZWFkeSBoYW5kbGVkIHRoZSBvdGhlciBzdHVmZiBhYm92ZS5cbiAgICByZXN1bHQucGF0aG5hbWUgPSBudWxsO1xuICAgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3RcbiAgICBpZiAocmVzdWx0LnNlYXJjaCkge1xuICAgICAgcmVzdWx0LnBhdGggPSAnLycgKyByZXN1bHQuc2VhcmNoO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aCA9IG51bGw7XG4gICAgfVxuICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvLyBpZiBhIHVybCBFTkRzIGluIC4gb3IgLi4sIHRoZW4gaXQgbXVzdCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cbiAgLy8gaG93ZXZlciwgaWYgaXQgZW5kcyBpbiBhbnl0aGluZyBlbHNlIG5vbi1zbGFzaHksXG4gIC8vIHRoZW4gaXQgbXVzdCBOT1QgZ2V0IGEgdHJhaWxpbmcgc2xhc2guXG4gIHZhciBsYXN0ID0gc3JjUGF0aC5zbGljZSgtMSlbMF07XG4gIHZhciBoYXNUcmFpbGluZ1NsYXNoID0gKFxuICAgICAgKHJlc3VsdC5ob3N0IHx8IHJlbGF0aXZlLmhvc3QpICYmIChsYXN0ID09PSAnLicgfHwgbGFzdCA9PT0gJy4uJykgfHxcbiAgICAgIGxhc3QgPT09ICcnKTtcblxuICAvLyBzdHJpcCBzaW5nbGUgZG90cywgcmVzb2x2ZSBkb3VibGUgZG90cyB0byBwYXJlbnQgZGlyXG4gIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG4gIHZhciB1cCA9IDA7XG4gIGZvciAodmFyIGkgPSBzcmNQYXRoLmxlbmd0aDsgaSA+PSAwOyBpLS0pIHtcbiAgICBsYXN0ID0gc3JjUGF0aFtpXTtcbiAgICBpZiAobGFzdCA9PSAnLicpIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHNyY1BhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgcGF0aCBpcyBhbGxvd2VkIHRvIGdvIGFib3ZlIHRoZSByb290LCByZXN0b3JlIGxlYWRpbmcgLi5zXG4gIGlmICghbXVzdEVuZEFicyAmJiAhcmVtb3ZlQWxsRG90cykge1xuICAgIGZvciAoOyB1cC0tOyB1cCkge1xuICAgICAgc3JjUGF0aC51bnNoaWZ0KCcuLicpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtdXN0RW5kQWJzICYmIHNyY1BhdGhbMF0gIT09ICcnICYmXG4gICAgICAoIXNyY1BhdGhbMF0gfHwgc3JjUGF0aFswXS5jaGFyQXQoMCkgIT09ICcvJykpIHtcbiAgICBzcmNQYXRoLnVuc2hpZnQoJycpO1xuICB9XG5cbiAgaWYgKGhhc1RyYWlsaW5nU2xhc2ggJiYgKHNyY1BhdGguam9pbignLycpLnN1YnN0cigtMSkgIT09ICcvJykpIHtcbiAgICBzcmNQYXRoLnB1c2goJycpO1xuICB9XG5cbiAgdmFyIGlzQWJzb2x1dGUgPSBzcmNQYXRoWzBdID09PSAnJyB8fFxuICAgICAgKHNyY1BhdGhbMF0gJiYgc3JjUGF0aFswXS5jaGFyQXQoMCkgPT09ICcvJyk7XG5cbiAgLy8gcHV0IHRoZSBob3N0IGJhY2tcbiAgaWYgKHBzeWNob3RpYykge1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlc3VsdC5ob3N0ID0gaXNBYnNvbHV0ZSA/ICcnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNyY1BhdGgubGVuZ3RoID8gc3JjUGF0aC5zaGlmdCgpIDogJyc7XG4gICAgLy9vY2NhdGlvbmFseSB0aGUgYXV0aCBjYW4gZ2V0IHN0dWNrIG9ubHkgaW4gaG9zdFxuICAgIC8vdGhpcyBlc3BlY2lhbHkgaGFwcGVucyBpbiBjYXNlcyBsaWtlXG4gICAgLy91cmwucmVzb2x2ZU9iamVjdCgnbWFpbHRvOmxvY2FsMUBkb21haW4xJywgJ2xvY2FsMkBkb21haW4yJylcbiAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmhvc3Quc3BsaXQoJ0AnKSA6IGZhbHNlO1xuICAgIGlmIChhdXRoSW5Ib3N0KSB7XG4gICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgIHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgIH1cbiAgfVxuXG4gIG11c3RFbmRBYnMgPSBtdXN0RW5kQWJzIHx8IChyZXN1bHQuaG9zdCAmJiBzcmNQYXRoLmxlbmd0aCk7XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBzcmNQYXRoLnVuc2hpZnQoJycpO1xuICB9XG5cbiAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG4gICAgcmVzdWx0LnBhdGggPSBudWxsO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdC5wYXRobmFtZSA9IHNyY1BhdGguam9pbignLycpO1xuICB9XG5cbiAgLy90byBzdXBwb3J0IHJlcXVlc3QuaHR0cFxuICBpZiAoIWlzTnVsbChyZXN1bHQucGF0aG5hbWUpIHx8ICFpc051bGwocmVzdWx0LnNlYXJjaCkpIHtcbiAgICByZXN1bHQucGF0aCA9IChyZXN1bHQucGF0aG5hbWUgPyByZXN1bHQucGF0aG5hbWUgOiAnJykgK1xuICAgICAgICAgICAgICAgICAgKHJlc3VsdC5zZWFyY2ggPyByZXN1bHQuc2VhcmNoIDogJycpO1xuICB9XG4gIHJlc3VsdC5hdXRoID0gcmVsYXRpdmUuYXV0aCB8fCByZXN1bHQuYXV0aDtcbiAgcmVzdWx0LnNsYXNoZXMgPSByZXN1bHQuc2xhc2hlcyB8fCByZWxhdGl2ZS5zbGFzaGVzO1xuICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cblVybC5wcm90b3R5cGUucGFyc2VIb3N0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBob3N0ID0gdGhpcy5ob3N0O1xuICB2YXIgcG9ydCA9IHBvcnRQYXR0ZXJuLmV4ZWMoaG9zdCk7XG4gIGlmIChwb3J0KSB7XG4gICAgcG9ydCA9IHBvcnRbMF07XG4gICAgaWYgKHBvcnQgIT09ICc6Jykge1xuICAgICAgdGhpcy5wb3J0ID0gcG9ydC5zdWJzdHIoMSk7XG4gICAgfVxuICAgIGhvc3QgPSBob3N0LnN1YnN0cigwLCBob3N0Lmxlbmd0aCAtIHBvcnQubGVuZ3RoKTtcbiAgfVxuICBpZiAoaG9zdCkgdGhpcy5ob3N0bmFtZSA9IGhvc3Q7XG59O1xuXG5mdW5jdGlvbiBpc1N0cmluZyhhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCI7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuICBhcmcgPT0gbnVsbDtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi91cmwvdXJsLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiLyohIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZSB2MS4zLjIgYnkgQG1hdGhpYXMgKi9cbjsoZnVuY3Rpb24ocm9vdCkge1xuXG5cdC8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgKi9cblx0dmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJlxuXHRcdCFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cdHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiZcblx0XHQhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0aWYgKFxuXHRcdGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsIHx8XG5cdFx0ZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwgfHxcblx0XHRmcmVlR2xvYmFsLnNlbGYgPT09IGZyZWVHbG9iYWxcblx0KSB7XG5cdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIGBwdW55Y29kZWAgb2JqZWN0LlxuXHQgKiBAbmFtZSBwdW55Y29kZVxuXHQgKiBAdHlwZSBPYmplY3Rcblx0ICovXG5cdHZhciBwdW55Y29kZSxcblxuXHQvKiogSGlnaGVzdCBwb3NpdGl2ZSBzaWduZWQgMzItYml0IGZsb2F0IHZhbHVlICovXG5cdG1heEludCA9IDIxNDc0ODM2NDcsIC8vIGFrYS4gMHg3RkZGRkZGRiBvciAyXjMxLTFcblxuXHQvKiogQm9vdHN0cmluZyBwYXJhbWV0ZXJzICovXG5cdGJhc2UgPSAzNixcblx0dE1pbiA9IDEsXG5cdHRNYXggPSAyNixcblx0c2tldyA9IDM4LFxuXHRkYW1wID0gNzAwLFxuXHRpbml0aWFsQmlhcyA9IDcyLFxuXHRpbml0aWFsTiA9IDEyOCwgLy8gMHg4MFxuXHRkZWxpbWl0ZXIgPSAnLScsIC8vICdcXHgyRCdcblxuXHQvKiogUmVndWxhciBleHByZXNzaW9ucyAqL1xuXHRyZWdleFB1bnljb2RlID0gL154bi0tLyxcblx0cmVnZXhOb25BU0NJSSA9IC9bXlxceDIwLVxceDdFXS8sIC8vIHVucHJpbnRhYmxlIEFTQ0lJIGNoYXJzICsgbm9uLUFTQ0lJIGNoYXJzXG5cdHJlZ2V4U2VwYXJhdG9ycyA9IC9bXFx4MkVcXHUzMDAyXFx1RkYwRVxcdUZGNjFdL2csIC8vIFJGQyAzNDkwIHNlcGFyYXRvcnNcblxuXHQvKiogRXJyb3IgbWVzc2FnZXMgKi9cblx0ZXJyb3JzID0ge1xuXHRcdCdvdmVyZmxvdyc6ICdPdmVyZmxvdzogaW5wdXQgbmVlZHMgd2lkZXIgaW50ZWdlcnMgdG8gcHJvY2VzcycsXG5cdFx0J25vdC1iYXNpYyc6ICdJbGxlZ2FsIGlucHV0ID49IDB4ODAgKG5vdCBhIGJhc2ljIGNvZGUgcG9pbnQpJyxcblx0XHQnaW52YWxpZC1pbnB1dCc6ICdJbnZhbGlkIGlucHV0J1xuXHR9LFxuXG5cdC8qKiBDb252ZW5pZW5jZSBzaG9ydGN1dHMgKi9cblx0YmFzZU1pbnVzVE1pbiA9IGJhc2UgLSB0TWluLFxuXHRmbG9vciA9IE1hdGguZmxvb3IsXG5cdHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUsXG5cblx0LyoqIFRlbXBvcmFyeSB2YXJpYWJsZSAqL1xuXHRrZXk7XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBlcnJvciB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgZXJyb3IgdHlwZS5cblx0ICogQHJldHVybnMge0Vycm9yfSBUaHJvd3MgYSBgUmFuZ2VFcnJvcmAgd2l0aCB0aGUgYXBwbGljYWJsZSBlcnJvciBtZXNzYWdlLlxuXHQgKi9cblx0ZnVuY3Rpb24gZXJyb3IodHlwZSkge1xuXHRcdHRocm93IFJhbmdlRXJyb3IoZXJyb3JzW3R5cGVdKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIGdlbmVyaWMgYEFycmF5I21hcGAgdXRpbGl0eSBmdW5jdGlvbi5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5IGFycmF5XG5cdCAqIGl0ZW0uXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gQSBuZXcgYXJyYXkgb2YgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFjayBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcChhcnJheSwgZm4pIHtcblx0XHR2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXHRcdHZhciByZXN1bHQgPSBbXTtcblx0XHR3aGlsZSAobGVuZ3RoLS0pIHtcblx0XHRcdHJlc3VsdFtsZW5ndGhdID0gZm4oYXJyYXlbbGVuZ3RoXSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblxuXHQvKipcblx0ICogQSBzaW1wbGUgYEFycmF5I21hcGAtbGlrZSB3cmFwcGVyIHRvIHdvcmsgd2l0aCBkb21haW4gbmFtZSBzdHJpbmdzIG9yIGVtYWlsXG5cdCAqIGFkZHJlc3Nlcy5cblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGRvbWFpbiBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcy5cblx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgZm9yIGV2ZXJ5XG5cdCAqIGNoYXJhY3Rlci5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBzdHJpbmcgb2YgY2hhcmFjdGVycyByZXR1cm5lZCBieSB0aGUgY2FsbGJhY2tcblx0ICogZnVuY3Rpb24uXG5cdCAqL1xuXHRmdW5jdGlvbiBtYXBEb21haW4oc3RyaW5nLCBmbikge1xuXHRcdHZhciBwYXJ0cyA9IHN0cmluZy5zcGxpdCgnQCcpO1xuXHRcdHZhciByZXN1bHQgPSAnJztcblx0XHRpZiAocGFydHMubGVuZ3RoID4gMSkge1xuXHRcdFx0Ly8gSW4gZW1haWwgYWRkcmVzc2VzLCBvbmx5IHRoZSBkb21haW4gbmFtZSBzaG91bGQgYmUgcHVueWNvZGVkLiBMZWF2ZVxuXHRcdFx0Ly8gdGhlIGxvY2FsIHBhcnQgKGkuZS4gZXZlcnl0aGluZyB1cCB0byBgQGApIGludGFjdC5cblx0XHRcdHJlc3VsdCA9IHBhcnRzWzBdICsgJ0AnO1xuXHRcdFx0c3RyaW5nID0gcGFydHNbMV07XG5cdFx0fVxuXHRcdC8vIEF2b2lkIGBzcGxpdChyZWdleClgIGZvciBJRTggY29tcGF0aWJpbGl0eS4gU2VlICMxNy5cblx0XHRzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShyZWdleFNlcGFyYXRvcnMsICdcXHgyRScpO1xuXHRcdHZhciBsYWJlbHMgPSBzdHJpbmcuc3BsaXQoJy4nKTtcblx0XHR2YXIgZW5jb2RlZCA9IG1hcChsYWJlbHMsIGZuKS5qb2luKCcuJyk7XG5cdFx0cmV0dXJuIHJlc3VsdCArIGVuY29kZWQ7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlcyBhbiBhcnJheSBjb250YWluaW5nIHRoZSBudW1lcmljIGNvZGUgcG9pbnRzIG9mIGVhY2ggVW5pY29kZVxuXHQgKiBjaGFyYWN0ZXIgaW4gdGhlIHN0cmluZy4gV2hpbGUgSmF2YVNjcmlwdCB1c2VzIFVDUy0yIGludGVybmFsbHksXG5cdCAqIHRoaXMgZnVuY3Rpb24gd2lsbCBjb252ZXJ0IGEgcGFpciBvZiBzdXJyb2dhdGUgaGFsdmVzIChlYWNoIG9mIHdoaWNoXG5cdCAqIFVDUy0yIGV4cG9zZXMgYXMgc2VwYXJhdGUgY2hhcmFjdGVycykgaW50byBhIHNpbmdsZSBjb2RlIHBvaW50LFxuXHQgKiBtYXRjaGluZyBVVEYtMTYuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZW5jb2RlYFxuXHQgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0ICogQG5hbWUgZGVjb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIFVuaWNvZGUgaW5wdXQgc3RyaW5nIChVQ1MtMikuXG5cdCAqIEByZXR1cm5zIHtBcnJheX0gVGhlIG5ldyBhcnJheSBvZiBjb2RlIHBvaW50cy5cblx0ICovXG5cdGZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKSB7XG5cdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdCAgICBjb3VudGVyID0gMCxcblx0XHQgICAgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcblx0XHQgICAgdmFsdWUsXG5cdFx0ICAgIGV4dHJhO1xuXHRcdHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHR2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRpZiAodmFsdWUgPj0gMHhEODAwICYmIHZhbHVlIDw9IDB4REJGRiAmJiBjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHRcdC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuXHRcdFx0XHRleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRcdGlmICgoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCkgeyAvLyBsb3cgc3Vycm9nYXRlXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGUgbmV4dFxuXHRcdFx0XHRcdC8vIGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpclxuXHRcdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdFx0XHRjb3VudGVyLS07XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgc3RyaW5nIGJhc2VkIG9uIGFuIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdCAqIEBzZWUgYHB1bnljb2RlLnVjczIuZGVjb2RlYFxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBlbmNvZGVcblx0ICogQHBhcmFtIHtBcnJheX0gY29kZVBvaW50cyBUaGUgYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIG5ldyBVbmljb2RlIHN0cmluZyAoVUNTLTIpLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmVuY29kZShhcnJheSkge1xuXHRcdHJldHVybiBtYXAoYXJyYXksIGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0XHRpZiAodmFsdWUgPiAweEZGRkYpIHtcblx0XHRcdFx0dmFsdWUgLT0gMHgxMDAwMDtcblx0XHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7XG5cdFx0XHRcdHZhbHVlID0gMHhEQzAwIHwgdmFsdWUgJiAweDNGRjtcblx0XHRcdH1cblx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUpO1xuXHRcdFx0cmV0dXJuIG91dHB1dDtcblx0XHR9KS5qb2luKCcnKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIGJhc2ljIGNvZGUgcG9pbnQgaW50byBhIGRpZ2l0L2ludGVnZXIuXG5cdCAqIEBzZWUgYGRpZ2l0VG9CYXNpYygpYFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge051bWJlcn0gY29kZVBvaW50IFRoZSBiYXNpYyBudW1lcmljIGNvZGUgcG9pbnQgdmFsdWUuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludCAoZm9yIHVzZSBpblxuXHQgKiByZXByZXNlbnRpbmcgaW50ZWdlcnMpIGluIHRoZSByYW5nZSBgMGAgdG8gYGJhc2UgLSAxYCwgb3IgYGJhc2VgIGlmXG5cdCAqIHRoZSBjb2RlIHBvaW50IGRvZXMgbm90IHJlcHJlc2VudCBhIHZhbHVlLlxuXHQgKi9cblx0ZnVuY3Rpb24gYmFzaWNUb0RpZ2l0KGNvZGVQb2ludCkge1xuXHRcdGlmIChjb2RlUG9pbnQgLSA0OCA8IDEwKSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gMjI7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA2NSA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gNjU7XG5cdFx0fVxuXHRcdGlmIChjb2RlUG9pbnQgLSA5NyA8IDI2KSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50IC0gOTc7XG5cdFx0fVxuXHRcdHJldHVybiBiYXNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgZGlnaXQvaW50ZWdlciBpbnRvIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHNlZSBgYmFzaWNUb0RpZ2l0KClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBkaWdpdCBUaGUgbnVtZXJpYyB2YWx1ZSBvZiBhIGJhc2ljIGNvZGUgcG9pbnQuXG5cdCAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBiYXNpYyBjb2RlIHBvaW50IHdob3NlIHZhbHVlICh3aGVuIHVzZWQgZm9yXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaXMgYGRpZ2l0YCwgd2hpY2ggbmVlZHMgdG8gYmUgaW4gdGhlIHJhbmdlXG5cdCAqIGAwYCB0byBgYmFzZSAtIDFgLiBJZiBgZmxhZ2AgaXMgbm9uLXplcm8sIHRoZSB1cHBlcmNhc2UgZm9ybSBpc1xuXHQgKiB1c2VkOyBlbHNlLCB0aGUgbG93ZXJjYXNlIGZvcm0gaXMgdXNlZC4gVGhlIGJlaGF2aW9yIGlzIHVuZGVmaW5lZFxuXHQgKiBpZiBgZmxhZ2AgaXMgbm9uLXplcm8gYW5kIGBkaWdpdGAgaGFzIG5vIHVwcGVyY2FzZSBmb3JtLlxuXHQgKi9cblx0ZnVuY3Rpb24gZGlnaXRUb0Jhc2ljKGRpZ2l0LCBmbGFnKSB7XG5cdFx0Ly8gIDAuLjI1IG1hcCB0byBBU0NJSSBhLi56IG9yIEEuLlpcblx0XHQvLyAyNi4uMzUgbWFwIHRvIEFTQ0lJIDAuLjlcblx0XHRyZXR1cm4gZGlnaXQgKyAyMiArIDc1ICogKGRpZ2l0IDwgMjYpIC0gKChmbGFnICE9IDApIDw8IDUpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEJpYXMgYWRhcHRhdGlvbiBmdW5jdGlvbiBhcyBwZXIgc2VjdGlvbiAzLjQgb2YgUkZDIDM0OTIuXG5cdCAqIGh0dHA6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzM0OTIjc2VjdGlvbi0zLjRcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGZ1bmN0aW9uIGFkYXB0KGRlbHRhLCBudW1Qb2ludHMsIGZpcnN0VGltZSkge1xuXHRcdHZhciBrID0gMDtcblx0XHRkZWx0YSA9IGZpcnN0VGltZSA/IGZsb29yKGRlbHRhIC8gZGFtcCkgOiBkZWx0YSA+PiAxO1xuXHRcdGRlbHRhICs9IGZsb29yKGRlbHRhIC8gbnVtUG9pbnRzKTtcblx0XHRmb3IgKC8qIG5vIGluaXRpYWxpemF0aW9uICovOyBkZWx0YSA+IGJhc2VNaW51c1RNaW4gKiB0TWF4ID4+IDE7IGsgKz0gYmFzZSkge1xuXHRcdFx0ZGVsdGEgPSBmbG9vcihkZWx0YSAvIGJhc2VNaW51c1RNaW4pO1xuXHRcdH1cblx0XHRyZXR1cm4gZmxvb3IoayArIChiYXNlTWludXNUTWluICsgMSkgKiBkZWx0YSAvIChkZWx0YSArIHNrZXcpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMgdG8gYSBzdHJpbmcgb2YgVW5pY29kZVxuXHQgKiBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0XHQvLyBEb24ndCB1c2UgVUNTLTJcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHRcdCAgICBvdXQsXG5cdFx0ICAgIGkgPSAwLFxuXHRcdCAgICBuID0gaW5pdGlhbE4sXG5cdFx0ICAgIGJpYXMgPSBpbml0aWFsQmlhcyxcblx0XHQgICAgYmFzaWMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIGluZGV4LFxuXHRcdCAgICBvbGRpLFxuXHRcdCAgICB3LFxuXHRcdCAgICBrLFxuXHRcdCAgICBkaWdpdCxcblx0XHQgICAgdCxcblx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0ICAgIGJhc2VNaW51c1Q7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzOiBsZXQgYGJhc2ljYCBiZSB0aGUgbnVtYmVyIG9mIGlucHV0IGNvZGVcblx0XHQvLyBwb2ludHMgYmVmb3JlIHRoZSBsYXN0IGRlbGltaXRlciwgb3IgYDBgIGlmIHRoZXJlIGlzIG5vbmUsIHRoZW4gY29weVxuXHRcdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXG5cdFx0YmFzaWMgPSBpbnB1dC5sYXN0SW5kZXhPZihkZWxpbWl0ZXIpO1xuXHRcdGlmIChiYXNpYyA8IDApIHtcblx0XHRcdGJhc2ljID0gMDtcblx0XHR9XG5cblx0XHRmb3IgKGogPSAwOyBqIDwgYmFzaWM7ICsraikge1xuXHRcdFx0Ly8gaWYgaXQncyBub3QgYSBiYXNpYyBjb2RlIHBvaW50XG5cdFx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRcdGVycm9yKCdub3QtYmFzaWMnKTtcblx0XHRcdH1cblx0XHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZGVjb2RpbmcgbG9vcDogc3RhcnQganVzdCBhZnRlciB0aGUgbGFzdCBkZWxpbWl0ZXIgaWYgYW55IGJhc2ljIGNvZGVcblx0XHQvLyBwb2ludHMgd2VyZSBjb3BpZWQ7IHN0YXJ0IGF0IHRoZSBiZWdpbm5pbmcgb3RoZXJ3aXNlLlxuXG5cdFx0Zm9yIChpbmRleCA9IGJhc2ljID4gMCA/IGJhc2ljICsgMSA6IDA7IGluZGV4IDwgaW5wdXRMZW5ndGg7IC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi8pIHtcblxuXHRcdFx0Ly8gYGluZGV4YCBpcyB0aGUgaW5kZXggb2YgdGhlIG5leHQgY2hhcmFjdGVyIHRvIGJlIGNvbnN1bWVkLlxuXHRcdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdFx0Ly8gd2hpY2ggZ2V0cyBhZGRlZCB0byBgaWAuIFRoZSBvdmVyZmxvdyBjaGVja2luZyBpcyBlYXNpZXJcblx0XHRcdC8vIGlmIHdlIGluY3JlYXNlIGBpYCBhcyB3ZSBnbywgdGhlbiBzdWJ0cmFjdCBvZmYgaXRzIHN0YXJ0aW5nXG5cdFx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdFx0Zm9yIChvbGRpID0gaSwgdyA9IDEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXG5cdFx0XHRcdGlmIChpbmRleCA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRcdGVycm9yKCdpbnZhbGlkLWlucHV0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkaWdpdCA9IGJhc2ljVG9EaWdpdChpbnB1dC5jaGFyQ29kZUF0KGluZGV4KyspKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpICs9IGRpZ2l0ICogdztcblx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cblx0XHRcdFx0aWYgKGRpZ2l0IDwgdCkge1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YmFzZU1pbnVzVCA9IGJhc2UgLSB0O1xuXHRcdFx0XHRpZiAodyA+IGZsb29yKG1heEludCAvIGJhc2VNaW51c1QpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3ICo9IGJhc2VNaW51c1Q7XG5cblx0XHRcdH1cblxuXHRcdFx0b3V0ID0gb3V0cHV0Lmxlbmd0aCArIDE7XG5cdFx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblxuXHRcdFx0Ly8gYGlgIHdhcyBzdXBwb3NlZCB0byB3cmFwIGFyb3VuZCBmcm9tIGBvdXRgIHRvIGAwYCxcblx0XHRcdC8vIGluY3JlbWVudGluZyBgbmAgZWFjaCB0aW1lLCBzbyB3ZSdsbCBmaXggdGhhdCBub3c6XG5cdFx0XHRpZiAoZmxvb3IoaSAvIG91dCkgPiBtYXhJbnQgLSBuKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRuICs9IGZsb29yKGkgLyBvdXQpO1xuXHRcdFx0aSAlPSBvdXQ7XG5cblx0XHRcdC8vIEluc2VydCBgbmAgYXQgcG9zaXRpb24gYGlgIG9mIHRoZSBvdXRwdXRcblx0XHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB1Y3MyZW5jb2RlKG91dHB1dCk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzIChlLmcuIGEgZG9tYWluIG5hbWUgbGFiZWwpIHRvIGFcblx0ICogUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKi9cblx0ZnVuY3Rpb24gZW5jb2RlKGlucHV0KSB7XG5cdFx0dmFyIG4sXG5cdFx0ICAgIGRlbHRhLFxuXHRcdCAgICBoYW5kbGVkQ1BDb3VudCxcblx0XHQgICAgYmFzaWNMZW5ndGgsXG5cdFx0ICAgIGJpYXMsXG5cdFx0ICAgIGosXG5cdFx0ICAgIG0sXG5cdFx0ICAgIHEsXG5cdFx0ICAgIGssXG5cdFx0ICAgIHQsXG5cdFx0ICAgIGN1cnJlbnRWYWx1ZSxcblx0XHQgICAgb3V0cHV0ID0gW10sXG5cdFx0ICAgIC8qKiBgaW5wdXRMZW5ndGhgIHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIGluIGBpbnB1dGAuICovXG5cdFx0ICAgIGlucHV0TGVuZ3RoLFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgaGFuZGxlZENQQ291bnRQbHVzT25lLFxuXHRcdCAgICBiYXNlTWludXNULFxuXHRcdCAgICBxTWludXNUO1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgaW5wdXQgaW4gVUNTLTIgdG8gVW5pY29kZVxuXHRcdGlucHV0ID0gdWNzMmRlY29kZShpbnB1dCk7XG5cblx0XHQvLyBDYWNoZSB0aGUgbGVuZ3RoXG5cdFx0aW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGg7XG5cblx0XHQvLyBJbml0aWFsaXplIHRoZSBzdGF0ZVxuXHRcdG4gPSBpbml0aWFsTjtcblx0XHRkZWx0YSA9IDA7XG5cdFx0YmlhcyA9IGluaXRpYWxCaWFzO1xuXG5cdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50c1xuXHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCAweDgwKSB7XG5cdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShjdXJyZW50VmFsdWUpKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRoYW5kbGVkQ1BDb3VudCA9IGJhc2ljTGVuZ3RoID0gb3V0cHV0Lmxlbmd0aDtcblxuXHRcdC8vIGBoYW5kbGVkQ1BDb3VudGAgaXMgdGhlIG51bWJlciBvZiBjb2RlIHBvaW50cyB0aGF0IGhhdmUgYmVlbiBoYW5kbGVkO1xuXHRcdC8vIGBiYXNpY0xlbmd0aGAgaXMgdGhlIG51bWJlciBvZiBiYXNpYyBjb2RlIHBvaW50cy5cblxuXHRcdC8vIEZpbmlzaCB0aGUgYmFzaWMgc3RyaW5nIC0gaWYgaXQgaXMgbm90IGVtcHR5IC0gd2l0aCBhIGRlbGltaXRlclxuXHRcdGlmIChiYXNpY0xlbmd0aCkge1xuXHRcdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0XHR9XG5cblx0XHQvLyBNYWluIGVuY29kaW5nIGxvb3A6XG5cdFx0d2hpbGUgKGhhbmRsZWRDUENvdW50IDwgaW5wdXRMZW5ndGgpIHtcblxuXHRcdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdFx0Ly8gbGFyZ2VyIG9uZTpcblx0XHRcdGZvciAobSA9IG1heEludCwgaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID49IG4gJiYgY3VycmVudFZhbHVlIDwgbSkge1xuXHRcdFx0XHRcdG0gPSBjdXJyZW50VmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0Ly8gYnV0IGd1YXJkIGFnYWluc3Qgb3ZlcmZsb3dcblx0XHRcdGhhbmRsZWRDUENvdW50UGx1c09uZSA9IGhhbmRsZWRDUENvdW50ICsgMTtcblx0XHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0fVxuXG5cdFx0XHRkZWx0YSArPSAobSAtIG4pICogaGFuZGxlZENQQ291bnRQbHVzT25lO1xuXHRcdFx0biA9IG07XG5cblx0XHRcdGZvciAoaiA9IDA7IGogPCBpbnB1dExlbmd0aDsgKytqKSB7XG5cdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCBuICYmICsrZGVsdGEgPiBtYXhJbnQpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPT0gbikge1xuXHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyXG5cdFx0XHRcdFx0Zm9yIChxID0gZGVsdGEsIGsgPSBiYXNlOyAvKiBubyBjb25kaXRpb24gKi87IGsgKz0gYmFzZSkge1xuXHRcdFx0XHRcdFx0dCA9IGsgPD0gYmlhcyA/IHRNaW4gOiAoayA+PSBiaWFzICsgdE1heCA/IHRNYXggOiBrIC0gYmlhcyk7XG5cdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdFx0XHRvdXRwdXQucHVzaChcblx0XHRcdFx0XHRcdFx0c3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHEgPSBmbG9vcihxTWludXNUIC8gYmFzZU1pbnVzVCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyhxLCAwKSkpO1xuXHRcdFx0XHRcdGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PSBiYXNpY0xlbmd0aCk7XG5cdFx0XHRcdFx0ZGVsdGEgPSAwO1xuXHRcdFx0XHRcdCsraGFuZGxlZENQQ291bnQ7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0KytkZWx0YTtcblx0XHRcdCsrbjtcblxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3Ncblx0ICogdG8gVW5pY29kZS4gT25seSB0aGUgUHVueWNvZGVkIHBhcnRzIG9mIHRoZSBpbnB1dCB3aWxsIGJlIGNvbnZlcnRlZCwgaS5lLlxuXHQgKiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCBvbiBhIHN0cmluZyB0aGF0IGhhcyBhbHJlYWR5IGJlZW5cblx0ICogY29udmVydGVkIHRvIFVuaWNvZGUuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlZCBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvXG5cdCAqIGNvbnZlcnQgdG8gVW5pY29kZS5cblx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFVuaWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIFB1bnljb2RlXG5cdCAqIHN0cmluZy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvVW5pY29kZShpbnB1dCkge1xuXHRcdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0cmV0dXJuIHJlZ2V4UHVueWNvZGUudGVzdChzdHJpbmcpXG5cdFx0XHRcdD8gZGVjb2RlKHN0cmluZy5zbGljZSg0KS50b0xvd2VyQ2FzZSgpKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIFVuaWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogUHVueWNvZGUuIE9ubHkgdGhlIG5vbi1BU0NJSSBwYXJ0cyBvZiB0aGUgZG9tYWluIG5hbWUgd2lsbCBiZSBjb252ZXJ0ZWQsXG5cdCAqIGkuZS4gaXQgZG9lc24ndCBtYXR0ZXIgaWYgeW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0J3MgYWxyZWFkeSBpblxuXHQgKiBBU0NJSS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgZG9tYWluIG5hbWUgb3IgZW1haWwgYWRkcmVzcyB0byBjb252ZXJ0LCBhcyBhXG5cdCAqIFVuaWNvZGUgc3RyaW5nLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgUHVueWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIGRvbWFpbiBuYW1lIG9yXG5cdCAqIGVtYWlsIGFkZHJlc3MuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b0FTQ0lJKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhOb25BU0NJSS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyAneG4tLScgKyBlbmNvZGUoc3RyaW5nKVxuXHRcdFx0XHQ6IHN0cmluZztcblx0XHR9KTtcblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdC8qKiBEZWZpbmUgdGhlIHB1YmxpYyBBUEkgKi9cblx0cHVueWNvZGUgPSB7XG5cdFx0LyoqXG5cdFx0ICogQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IFB1bnljb2RlLmpzIHZlcnNpb24gbnVtYmVyLlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEB0eXBlIFN0cmluZ1xuXHRcdCAqL1xuXHRcdCd2ZXJzaW9uJzogJzEuMy4yJyxcblx0XHQvKipcblx0XHQgKiBBbiBvYmplY3Qgb2YgbWV0aG9kcyB0byBjb252ZXJ0IGZyb20gSmF2YVNjcmlwdCdzIGludGVybmFsIGNoYXJhY3RlclxuXHRcdCAqIHJlcHJlc2VudGF0aW9uIChVQ1MtMikgdG8gVW5pY29kZSBjb2RlIHBvaW50cywgYW5kIGJhY2suXG5cdFx0ICogQHNlZSA8aHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtZW5jb2Rpbmc+XG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgT2JqZWN0XG5cdFx0ICovXG5cdFx0J3VjczInOiB7XG5cdFx0XHQnZGVjb2RlJzogdWNzMmRlY29kZSxcblx0XHRcdCdlbmNvZGUnOiB1Y3MyZW5jb2RlXG5cdFx0fSxcblx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdCdlbmNvZGUnOiBlbmNvZGUsXG5cdFx0J3RvQVNDSUknOiB0b0FTQ0lJLFxuXHRcdCd0b1VuaWNvZGUnOiB0b1VuaWNvZGVcblx0fTtcblxuXHQvKiogRXhwb3NlIGBwdW55Y29kZWAgKi9cblx0Ly8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG5cdC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcblx0aWYgKFxuXHRcdHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJlxuXHRcdHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmXG5cdFx0ZGVmaW5lLmFtZFxuXHQpIHtcblx0XHRkZWZpbmUoJ3B1bnljb2RlJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gcHVueWNvZGU7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cykgeyAvLyBpbiBOb2RlLmpzIG9yIFJpbmdvSlMgdjAuOC4wK1xuXHRcdFx0ZnJlZU1vZHVsZS5leHBvcnRzID0gcHVueWNvZGU7XG5cdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdGZvciAoa2V5IGluIHB1bnljb2RlKSB7XG5cdFx0XHRcdHB1bnljb2RlLmhhc093blByb3BlcnR5KGtleSkgJiYgKGZyZWVFeHBvcnRzW2tleV0gPSBwdW55Y29kZVtrZXldKTtcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7IC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcblx0XHRyb290LnB1bnljb2RlID0gcHVueWNvZGU7XG5cdH1cblxufSh0aGlzKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdXJsL34vcHVueWNvZGUvcHVueWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xuXHR9XG5cdHJldHVybiBtb2R1bGU7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9xdWVyeXN0cmluZy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbi8vIElmIG9iai5oYXNPd25Qcm9wZXJ0eSBoYXMgYmVlbiBvdmVycmlkZGVuLCB0aGVuIGNhbGxpbmdcbi8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvaXNzdWVzLzE3MDdcbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIHZhciBvYmogPSB7fTtcblxuICBpZiAodHlwZW9mIHFzICE9PSAnc3RyaW5nJyB8fCBxcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcbiAgcXMgPSBxcy5zcGxpdChzZXApO1xuXG4gIHZhciBtYXhLZXlzID0gMTAwMDtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWF4S2V5cyA9PT0gJ251bWJlcicpIHtcbiAgICBtYXhLZXlzID0gb3B0aW9ucy5tYXhLZXlzO1xuICB9XG5cbiAgdmFyIGxlbiA9IHFzLmxlbmd0aDtcbiAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG4gIGlmIChtYXhLZXlzID4gMCAmJiBsZW4gPiBtYXhLZXlzKSB7XG4gICAgbGVuID0gbWF4S2V5cztcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG4gICAgICAgIGlkeCA9IHguaW5kZXhPZihlcSksXG4gICAgICAgIGtzdHIsIHZzdHIsIGssIHY7XG5cbiAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgIGtzdHIgPSB4LnN1YnN0cigwLCBpZHgpO1xuICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBrc3RyID0geDtcbiAgICAgIHZzdHIgPSAnJztcbiAgICB9XG5cbiAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuICAgIHYgPSBkZWNvZGVVUklDb21wb25lbnQodnN0cik7XG5cbiAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcbiAgICAgIG9ialtrXSA9IHY7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9ialtrXSkpIHtcbiAgICAgIG9ialtrXS5wdXNoKHYpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvYmpba10gPSBbb2JqW2tdLCB2XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9xdWVyeXN0cmluZy9kZWNvZGUuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3RyaW5naWZ5UHJpbWl0aXZlID0gZnVuY3Rpb24odikge1xuICBzd2l0Y2ggKHR5cGVvZiB2KSB7XG4gICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIHJldHVybiB2O1xuXG4gICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICByZXR1cm4gdiA/ICd0cnVlJyA6ICdmYWxzZSc7XG5cbiAgICBjYXNlICdudW1iZXInOlxuICAgICAgcmV0dXJuIGlzRmluaXRlKHYpID8gdiA6ICcnO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnJztcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIHNlcCwgZXEsIG5hbWUpIHtcbiAgc2VwID0gc2VwIHx8ICcmJztcbiAgZXEgPSBlcSB8fCAnPSc7XG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICBvYmogPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoZnVuY3Rpb24oaykge1xuICAgICAgdmFyIGtzID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShrKSkgKyBlcTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtrXSkpIHtcbiAgICAgICAgcmV0dXJuIG9ialtrXS5tYXAoZnVuY3Rpb24odikge1xuICAgICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUodikpO1xuICAgICAgICB9KS5qb2luKHNlcCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG9ialtrXSkpO1xuICAgICAgfVxuICAgIH0pLmpvaW4oc2VwKTtcblxuICB9XG5cbiAgaWYgKCFuYW1lKSByZXR1cm4gJyc7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG5hbWUpKSArIGVxICtcbiAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqKSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3F1ZXJ5c3RyaW5nL2VuY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX1V0aWxzV2luZG93ID0gcmVxdWlyZShcIi4vVXRpbHNXaW5kb3dcIik7XG5cbnZhciBfVXRpbHNXaW5kb3cyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNXaW5kb3cpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggZG9jdW1lbnRcbiAqL1xudmFyIERvY3VtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERvY3VtZW50KCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRG9jdW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBkb2N1bWVudCBoZWlnaHRcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIERvY3VtZW50LmdldEhlaWdodCA9IGZ1bmN0aW9uIGdldEhlaWdodCgpIHtcbiAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXG4gICAgICAgIGlmIChfVXRpbHNXaW5kb3cyLmRlZmF1bHQuaXNXaW5kb3cob2JqV2luZG93KSkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KG9ialdpbmRvdy5kb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCwgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsIG9ialdpbmRvdy5kb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCwgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQsIG9ialdpbmRvdy5kb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCwgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGRvY3VtZW50IHdpZHRoXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgRG9jdW1lbnQuZ2V0V2lkdGggPSBmdW5jdGlvbiBnZXRXaWR0aCgpIHtcbiAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXG4gICAgICAgIGlmIChfVXRpbHNXaW5kb3cyLmRlZmF1bHQuaXNXaW5kb3cob2JqV2luZG93KSkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWF4KG9ialdpbmRvdy5kb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoLCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoLCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aCwgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRXaWR0aCwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsIG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGRvY3VtZW50IHRvcCBzY3JvbGxcbiAgICAgKiBAcGFyYW0gb2JqV2luZG93XG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBEb2N1bWVudC5nZXRTY3JvbGxUb3AgPSBmdW5jdGlvbiBnZXRTY3JvbGxUb3AoKSB7XG4gICAgICAgIHZhciBvYmpXaW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdztcblxuICAgICAgICBpZiAoX1V0aWxzV2luZG93Mi5kZWZhdWx0LmlzV2luZG93KG9ialdpbmRvdykpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmpXaW5kb3cucGFnZVlPZmZzZXQgfHwgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keSAmJiBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZG9jdW1lbnQgbGVmdCBzY3JvbGxcbiAgICAgKiBAcGFyYW0gb2JqV2luZG93XG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBEb2N1bWVudC5nZXRTY3JvbGxMZWZ0ID0gZnVuY3Rpb24gZ2V0U2Nyb2xsTGVmdCgpIHtcbiAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXG4gICAgICAgIGlmIChfVXRpbHNXaW5kb3cyLmRlZmF1bHQuaXNXaW5kb3cob2JqV2luZG93KSkge1xuICAgICAgICAgICAgcmV0dXJuIG9ialdpbmRvdy5wYWdlWE9mZnNldCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keSAmJiBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGRvY3VtZW50IHNjcm9sbHNcbiAgICAgKiBAcGFyYW0gb2JqV2luZG93XG4gICAgICogQHJldHVybiB7e2xlZnQ6IG51bWJlciwgdG9wOiBudW1iZXJ9fVxuICAgICAqL1xuXG5cbiAgICBEb2N1bWVudC5nZXRTY3JvbGwgPSBmdW5jdGlvbiBnZXRTY3JvbGwoKSB7XG4gICAgICAgIHZhciBvYmpXaW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdztcblxuICAgICAgICBpZiAoX1V0aWxzV2luZG93Mi5kZWZhdWx0LmlzV2luZG93KG9ialdpbmRvdykpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbGVmdDogRG9jdW1lbnQuZ2V0U2Nyb2xsTGVmdChvYmpXaW5kb3cpLFxuICAgICAgICAgICAgICAgIHRvcDogRG9jdW1lbnQuZ2V0U2Nyb2xsVG9wKG9ialdpbmRvdylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGxlZnQ6IE5hTixcbiAgICAgICAgICAgICAgICB0b3A6IE5hTlxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gRG9jdW1lbnQ7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERvY3VtZW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9VdGlscy9saWIvVXRpbHNEb2N1bWVudC50c1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBDbGFzcyBmb3Igd29ya2luZyB3aXRoIHdpbmRvd1xuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFdpbmRvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXaW5kb3coKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXaW5kb3cpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIHdpbmRvd1xuICAgICAqIEBwYXJhbSBvYmpXaW5kb3dcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIFdpbmRvdy5pc1dpbmRvdyA9IGZ1bmN0aW9uIGlzV2luZG93KG9ialdpbmRvdykge1xuICAgICAgICByZXR1cm4gb2JqV2luZG93ICYmICh0eXBlb2Ygb2JqV2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqV2luZG93KSkgPT09IFwib2JqZWN0XCIgJiYgb2JqV2luZG93LmRvY3VtZW50ICYmIF90eXBlb2Yob2JqV2luZG93LmRvY3VtZW50KSA9PT0gXCJvYmplY3RcIjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCB3aW5kb3cgaGVpZ2h0XG4gICAgICogQHBhcmFtIG9ialdpbmRvd1xuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgV2luZG93LmdldEhlaWdodCA9IGZ1bmN0aW9uIGdldEhlaWdodCgpIHtcbiAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXG4gICAgICAgIGlmIChXaW5kb3cuaXNXaW5kb3cob2JqV2luZG93KSkge1xuICAgICAgICAgICAgcmV0dXJuIG9ialdpbmRvdy5pbm5lckhlaWdodCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgd2luZG93IHdpZHRoXG4gICAgICogQHBhcmFtIG9ialdpbmRvd1xuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgV2luZG93LmdldFdpZHRoID0gZnVuY3Rpb24gZ2V0V2lkdGgoKSB7XG4gICAgICAgIHZhciBvYmpXaW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdztcblxuICAgICAgICBpZiAoV2luZG93LmlzV2luZG93KG9ialdpbmRvdykpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmpXaW5kb3cuaW5uZXJXaWR0aCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IG9ialdpbmRvdy5kb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHdpbmRvdyBzaXplc1xuICAgICAqIEByZXR1cm4ge3toZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn19XG4gICAgICovXG5cblxuICAgIFdpbmRvdy5nZXRTaXplcyA9IGZ1bmN0aW9uIGdldFNpemVzKCkge1xuICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlaWdodDogV2luZG93LmdldEhlaWdodChvYmpXaW5kb3cpLFxuICAgICAgICAgICAgd2lkdGg6IFdpbmRvdy5nZXRXaWR0aChvYmpXaW5kb3cpXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiBXaW5kb3c7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFdpbmRvdztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vVXRpbHMvbGliL1V0aWxzV2luZG93LnRzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxudmFyIF9VdGlscyA9IHJlcXVpcmUoXCIuL1V0aWxzXCIpO1xuXG52YXIgX1V0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLyoqXG4gKiBDbGFzcyBmb3Igd29ya2luZyB3aXRoIERPTVxuICovXG52YXIgRE9NID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERPTSgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERPTSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdmFyaWFibGUgaXMgZG9tIGRvY3VtZW50XG4gICAgICogQHBhcmFtIGRvbURvY3VtZW50XG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBET00uaXNET01Eb2N1bWVudCA9IGZ1bmN0aW9uIGlzRE9NRG9jdW1lbnQoZG9tRG9jdW1lbnQpIHtcbiAgICAgICAgcmV0dXJuICEoIWRvbURvY3VtZW50IHx8IHR5cGVvZiBkb21Eb2N1bWVudCA9PT0gXCJib29sZWFuXCIgfHwgdHlwZW9mIGRvbURvY3VtZW50ID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiBkb21Eb2N1bWVudCA9PT0gXCJzdHJpbmdcIiB8fCBkb21Eb2N1bWVudC5ub2RlVHlwZSAhPT0gOSk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGaW5kIGFuZCB2YWxpZGF0ZSBOb2RlIGluIERPTSBEb2N1bWVudFxuICAgICAqIEBwYXJhbSBkb21Ob2RlXG4gICAgICogQHBhcmFtIGRvbURvY3VtZW50XG4gICAgICogQHJldHVybiB7RWxlbWVudCB8IGJvb2xlYW59XG4gICAgICovXG5cblxuICAgIERPTS5nZXRET01Ob2RlID0gZnVuY3Rpb24gZ2V0RE9NTm9kZShkb21Ob2RlKSB7XG4gICAgICAgIHZhciBkb21Eb2N1bWVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZG9jdW1lbnQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIGRvbURvY3VtZW50IGlzIGEgdmFsaWQgdmFyaWFibGVcbiAgICAgICAgICovXG4gICAgICAgIGlmICghRE9NLmlzRE9NRG9jdW1lbnQoZG9tRG9jdW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIGRvbU5vZGUgaXMgYSB2YWxpZCB2YXJpYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCFkb21Ob2RlIHx8IHR5cGVvZiBkb21Ob2RlID09PSBcImJvb2xlYW5cIiB8fCB0eXBlb2YgZG9tTm9kZSA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgZG9tTm9kZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBkb21Ob2RlIGlzIGEgc3RyaW5nIGl0IG1pZ2h0IGJlIGFuIElEXG4gICAgICAgICAqL1xuICAgICAgICBpZiAodHlwZW9mIGRvbU5vZGUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGRvbU5vZGUgPSBkb21Eb2N1bWVudC5nZXRFbGVtZW50QnlJZChkb21Ob2RlKTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgaWYgZG9tTm9kZSBpcyBhIHZhbGlkIHZhcmlhYmxlXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIWRvbU5vZGUgfHwgZG9tTm9kZS5ub2RlVHlwZSAhPT0gMSB8fCAhZG9tTm9kZS5wYXJlbnROb2RlIHx8IGRvbU5vZGUucGFyZW50Tm9kZS5ub2RlTmFtZSA9PT0gXCJIVE1MXCIgfHwgIWRvbURvY3VtZW50LmNvbnRhaW5zKGRvbU5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRvbU5vZGU7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZWxlbWVudCBzaXplcyBhbmQgcG9zaXRpb25cbiAgICAgKiBAcGFyYW0gZG9tTm9kZVxuICAgICAqIEBwYXJhbSBkb21Eb2N1bWVudFxuICAgICAqIEBwYXJhbSBzaG93Rm9yY2VcbiAgICAgKiBAcmV0dXJuIHt7Ym90dG9tOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIHRvcDogbnVtYmVyLCB3aWR0aDogbnVtYmVyfX1cbiAgICAgKi9cblxuXG4gICAgRE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChkb21Ob2RlKSB7XG4gICAgICAgIHZhciBkb21Eb2N1bWVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZG9jdW1lbnQ7XG4gICAgICAgIHZhciBzaG93Rm9yY2UgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDcmVhdGUgcmVzdWx0IHNpemUgYW5kIHBvc2l0aW9uIG9iamVjdFxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIG9ialJldCA9IHtcbiAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIHdpZHRoOiAwXG4gICAgICAgIH07XG4gICAgICAgIGRvbU5vZGUgPSBET00uZ2V0RE9NTm9kZShkb21Ob2RlLCBkb21Eb2N1bWVudCk7XG4gICAgICAgIGlmICghZG9tTm9kZSkge1xuICAgICAgICAgICAgX1V0aWxzMi5kZWZhdWx0Lndhcm4oXCJVdGlscy5ET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0OiBET00gZWxlbWVudCBkb2Vzbid0IGV4aXN0IGluIHRoYXQgRE9NIERvY3VtZW50XCIpO1xuICAgICAgICAgICAgcmV0dXJuIG9ialJldDtcbiAgICAgICAgfVxuICAgICAgICBzaG93Rm9yY2UgPSAhIXNob3dGb3JjZTtcbiAgICAgICAgdmFyIHN0eWxlcyA9IHZvaWQgMDtcbiAgICAgICAgaWYgKHNob3dGb3JjZSkge1xuICAgICAgICAgICAgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShkb21Ob2RlKTtcbiAgICAgICAgICAgIGlmIChzdHlsZXMgJiYgc3R5bGVzLmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XG4gICAgICAgICAgICAgICAgZG9tTm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBkZWZhdWx0IG1ldGhvZCBpcyBzdXBwb3J0ZWQgdGhhbiB1c2UgaXRcbiAgICAgICAgICovXG4gICAgICAgIGlmIChkb21Ob2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgICAgICAgICAgb2JqUmV0ID0gZG9tTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogSUUgaGFja1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBvYmpSZXQgPSB7XG4gICAgICAgICAgICAgICAgYm90dG9tOiBvYmpSZXQuYm90dG9tLFxuICAgICAgICAgICAgICAgIGhlaWdodDogb2JqUmV0LmhlaWdodCB8fCBkb21Ob2RlLmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgICAgICBsZWZ0OiBvYmpSZXQubGVmdCxcbiAgICAgICAgICAgICAgICByaWdodDogb2JqUmV0LnJpZ2h0LFxuICAgICAgICAgICAgICAgIHRvcDogb2JqUmV0LnRvcCxcbiAgICAgICAgICAgICAgICB3aWR0aDogb2JqUmV0LndpZHRoIHx8IGRvbU5vZGUuY2xpZW50V2lkdGhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFdyaXRlIHRoZSBlbGVtZW50IGluIGEgdGVtcG9yYXJ5IHZhcmlhYmxlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBkb21FbGVtZW50ID0gZG9tTm9kZTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ2FsY3VsYXRlZCBiYXNpYyBwYXJhbWV0ZXJzIG9mIHRoZSBlbGVtZW50XG4gICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgb2JqQ29vcmRpbmF0ZXMgPSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBkb21FbGVtZW50Lm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgICAgICB3aWR0aDogZG9tRWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEFyZSBwYXNzZWQgb24gdG8gYWxsIHBhcmVudHMgYW5kIHRha2UgaW50byBhY2NvdW50IHRoZWlyIG9mZnNldHNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgd2hpbGUgKGRvbUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBvYmpDb29yZGluYXRlcy54ICs9IGRvbUVsZW1lbnQub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgICAgICBvYmpDb29yZGluYXRlcy55ICs9IGRvbUVsZW1lbnQub2Zmc2V0VG9wO1xuICAgICAgICAgICAgICAgIGRvbUVsZW1lbnQgPSBkb21FbGVtZW50Lm9mZnNldFBhcmVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIG9ialJldCA9IHtcbiAgICAgICAgICAgICAgICBib3R0b206IG9iakNvb3JkaW5hdGVzLnkgKyBvYmpDb29yZGluYXRlcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBvYmpDb29yZGluYXRlcy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgbGVmdDogb2JqQ29vcmRpbmF0ZXMueCxcbiAgICAgICAgICAgICAgICByaWdodDogb2JqQ29vcmRpbmF0ZXMueCArIG9iakNvb3JkaW5hdGVzLndpZHRoLFxuICAgICAgICAgICAgICAgIHRvcDogb2JqQ29vcmRpbmF0ZXMueSxcbiAgICAgICAgICAgICAgICB3aWR0aDogb2JqQ29vcmRpbmF0ZXMud2lkdGhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNob3dGb3JjZSAmJiBkb21Ob2RlKSB7XG4gICAgICAgICAgICBkb21Ob2RlLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm4gc2l6ZSBhbmQgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnRcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBvYmpSZXQ7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZpbmQgZWxlbWVudCBwb3NpdGlvblxuICAgICAqIEBwYXJhbSBkb21Ob2RlXG4gICAgICogQHBhcmFtIGRvbURvY3VtZW50XG4gICAgICogQHBhcmFtIHNob3dGb3JjZVxuICAgICAqIEByZXR1cm4ge3t0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyfX1cbiAgICAgKi9cbiAgICBET00uZmluZEVsZW1lbnRQb3NpdGlvbiA9IGZ1bmN0aW9uIGZpbmRFbGVtZW50UG9zaXRpb24oZG9tTm9kZSkge1xuICAgICAgICB2YXIgZG9tRG9jdW1lbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGRvY3VtZW50O1xuICAgICAgICB2YXIgc2hvd0ZvcmNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblxuICAgICAgICB2YXIgb2JqUmV0ID0ge1xuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHRvcDogMFxuICAgICAgICB9O1xuICAgICAgICBkb21Ob2RlID0gRE9NLmdldERPTU5vZGUoZG9tTm9kZSwgZG9tRG9jdW1lbnQpO1xuICAgICAgICBpZiAoIWRvbU5vZGUpIHtcbiAgICAgICAgICAgIF9VdGlsczIuZGVmYXVsdC53YXJuKFwiVXRpbHMuRE9NLmZpbmRFbGVtZW50UG9zaXRpb246IERPTSBlbGVtZW50IGRvZXNuJ3QgZXhpc3QgaW4gdGhhdCBET00gRG9jdW1lbnRcIik7XG4gICAgICAgICAgICByZXR1cm4gb2JqUmV0O1xuICAgICAgICB9XG4gICAgICAgIHNob3dGb3JjZSA9ICEhc2hvd0ZvcmNlO1xuICAgICAgICB3aGlsZSAoZG9tTm9kZSkge1xuICAgICAgICAgICAgdmFyIHN0eWxlcyA9IHZvaWQgMDtcbiAgICAgICAgICAgIGlmIChzaG93Rm9yY2UpIHtcbiAgICAgICAgICAgICAgICBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb21Ob2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoc3R5bGVzICYmIHN0eWxlcy5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xuICAgICAgICAgICAgICAgICAgICBkb21Ob2RlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqUmV0LmxlZnQgKz0gZG9tTm9kZS5vZmZzZXRMZWZ0O1xuICAgICAgICAgICAgb2JqUmV0LnRvcCArPSBkb21Ob2RlLm9mZnNldFRvcDtcbiAgICAgICAgICAgIGRvbU5vZGUgPSBkb21Ob2RlLm9mZnNldFBhcmVudDtcbiAgICAgICAgICAgIGlmIChzaG93Rm9yY2UgJiYgZG9tTm9kZSkge1xuICAgICAgICAgICAgICAgIGRvbU5vZGUuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ialJldDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEFkZCBldmVudCBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSBvYmpcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSBmdW5jXG4gICAgICovXG5cblxuICAgIERPTS5hZGRFdmVudCA9IGZ1bmN0aW9uIGFkZEV2ZW50KG9iaiwgbmFtZSwgZnVuYykge1xuICAgICAgICBpZiAob2JqICYmICh0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKSkgPT09IFwib2JqZWN0XCIgJiYgb2JqLm5vZGVUeXBlID09PSAxICYmIHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBmdW5jID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGlmIChvYmouYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIG9iai5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmMsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgb2JqLmF0dGFjaEV2ZW50KFwib25cIiArIG5hbWUsIGZ1bmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZSBldmVudCBsaXN0ZW5lclxuICAgICAqIEBwYXJhbSBvYmpcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSBmdW5jXG4gICAgICovXG5cblxuICAgIERPTS5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50KG9iaiwgbmFtZSwgZnVuYykge1xuICAgICAgICBpZiAob2JqICYmICh0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKSkgPT09IFwib2JqZWN0XCIgJiYgb2JqLm5vZGVUeXBlID09PSAxICYmIHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBmdW5jID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGlmIChvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIG9iai5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmMsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqLmRldGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgb2JqLmRldGFjaEV2ZW50KFwib25cIiArIG5hbWUsIGZ1bmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGNsYXNzIG5hbWVcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBET00uaGFzQ2xhc3NOYW1lID0gZnVuY3Rpb24gaGFzQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoZWxlbWVudCAmJiAodHlwZW9mIGVsZW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihlbGVtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xuICAgICAgICAgICAgcmV0dXJuIChcIiBcIiArIGVsZW1lbnQuY2xhc3NOYW1lICsgXCIgXCIpLmluZGV4T2YoXCIgXCIgKyBjbGFzc05hbWUgKyBcIiBcIikgIT09IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGQgY2xhc3MgbmFtZVxuICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuXG5cbiAgICBET00uYWRkQ2xhc3NOYW1lID0gZnVuY3Rpb24gYWRkQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoZWxlbWVudCAmJiAodHlwZW9mIGVsZW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihlbGVtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xuICAgICAgICAgICAgaWYgKCFET00uaGFzQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2wgPSBlbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsID8gY2wgKyBcIiBcIiArIGNsYXNzTmFtZSA6IGNsYXNzTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZSBjbGFzcyBuYW1lXG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG5cblxuICAgIERPTS5yZW1vdmVDbGFzc05hbWUgPSBmdW5jdGlvbiByZW1vdmVDbGFzc05hbWUoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmIChlbGVtZW50ICYmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGVsZW1lbnQpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgY2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEgJiYgdHlwZW9mIGVsZW1lbnQuY2xhc3NOYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmNsYXNzTmFtZS50cmltKCkuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGNsYXNzZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzW2ldID0gY2xhc3Nlc1tpXS50cmltKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFjbGFzc2VzW2ldIHx8IGNsYXNzZXNbaV0gPT09IGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbihcIiBcIik7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUb2dnbGUgY2xhc3MgbmFtZVxuICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqIEBwYXJhbSB0b2dnbGVcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cblxuXG4gICAgRE9NLnRvZ2dsZUNsYXNzTmFtZSA9IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzTmFtZShlbGVtZW50LCBjbGFzc05hbWUsIHRvZ2dsZSkge1xuICAgICAgICBpZiAoZWxlbWVudCAmJiAodHlwZW9mIGVsZW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihlbGVtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgdG9nZ2xlID09PSBcImJvb2xlYW5cIiAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xuICAgICAgICAgICAgaWYgKHRvZ2dsZSkge1xuICAgICAgICAgICAgICAgIERPTS5hZGRDbGFzc05hbWUoZWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgRE9NLnJlbW92ZUNsYXNzTmFtZShlbGVtZW50LCBjbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVwbGFjZSBjbGFzcyBuYW1lXG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2xkQ2xhc3NOYW1lXG4gICAgICogQHBhcmFtIG5ld0NsYXNzTmFtZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuXG5cbiAgICBET00ucmVwbGFjZUNsYXNzID0gZnVuY3Rpb24gcmVwbGFjZUNsYXNzKGVsZW1lbnQsIG9sZENsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSB7XG4gICAgICAgIGlmIChlbGVtZW50ICYmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGVsZW1lbnQpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2xkQ2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBuZXdDbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgb2xkQ2xhc3NOYW1lID0gb2xkQ2xhc3NOYW1lLnRyaW0oKTtcbiAgICAgICAgICAgIG5ld0NsYXNzTmFtZSA9IG5ld0NsYXNzTmFtZS50cmltKCk7XG4gICAgICAgICAgICBET00ucmVtb3ZlQ2xhc3NOYW1lKGVsZW1lbnQsIG9sZENsYXNzTmFtZSk7XG4gICAgICAgICAgICBET00uYWRkQ2xhc3NOYW1lKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZWxlbWVudCBieSB0YWcgbmFtZSBhbmQgaW5kZXhcbiAgICAgKiBAcGFyYW0gdG5cbiAgICAgKiBAcGFyYW0gZG9tRG9jdW1lbnRcbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKiBAcmV0dXJuIHtOb2RlfVxuICAgICAqL1xuXG5cbiAgICBET00uZ2V0RWxlbWVudEJ5VGFnTmFtZSA9IGZ1bmN0aW9uIGdldEVsZW1lbnRCeVRhZ05hbWUodG4pIHtcbiAgICAgICAgdmFyIGRvbURvY3VtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudDtcbiAgICAgICAgdmFyIGluZGV4ID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdG4gPT09IFwic3RyaW5nXCIgJiYgRE9NLmlzRE9NRG9jdW1lbnQoZG9tRG9jdW1lbnQpICYmIHR5cGVvZiBpbmRleCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgdmFyIGVscyA9IGRvbURvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRuKTtcbiAgICAgICAgICAgIHJldHVybiBlbHNbaW5kZXhdIHx8IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGxpbmUgaGVpZ2h0XG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBET00uZ2V0TGluZUhlaWdodCA9IGZ1bmN0aW9uIGdldExpbmVIZWlnaHQoKSB7XG4gICAgICAgIHZhciBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB2YXIgbGluZUhlaWdodCA9IHN0eWxlcy5saW5lSGVpZ2h0O1xuICAgICAgICB2YXIgbGluZUhlaWdodERpZyA9IHBhcnNlSW50KGxpbmVIZWlnaHQsIDEwKTtcbiAgICAgICAgdmFyIGZvbnRTaXplID0gc3R5bGVzLmZvbnRTaXplO1xuICAgICAgICB2YXIgZm9udFNpemVEaWcgPSBwYXJzZUludChmb250U2l6ZSwgMTApO1xuICAgICAgICBpZiAoaXNGaW5pdGUobGluZUhlaWdodERpZykpIHtcbiAgICAgICAgICAgIHJldHVybiBsaW5lSGVpZ2h0RGlnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZvbnRTaXplRGlnO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBET007XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERPTTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vVXRpbHMvbGliL1V0aWxzRE9NLnRzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEltcG9ydCBhZGRpdGlvbmFsIGNsYXNzZXNcbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfVXRpbHNET00gPSByZXF1aXJlKFwiLi9VdGlsc0RPTVwiKTtcblxudmFyIF9VdGlsc0RPTTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0RPTSk7XG5cbnZhciBfVXRpbHNXaW5kb3cgPSByZXF1aXJlKFwiLi9VdGlsc1dpbmRvd1wiKTtcblxudmFyIF9VdGlsc1dpbmRvdzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc1dpbmRvdyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBNb3VzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNb3VzZSgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1vdXNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOb3JtYWxpc2UgbW91c2UgZGVsdGFcbiAgICAgKiBAcGFyYW0gZVxuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cbiAgICBNb3VzZS5nZXRXaGVlbERlbHRhID0gZnVuY3Rpb24gZ2V0V2hlZWxEZWx0YShlKSB7XG4gICAgICAgIGlmIChlICYmICh0eXBlb2YgZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGUpKSA9PT0gXCJvYmplY3RcIiAmJiAoXCJkZXRhaWxcIiBpbiBlIHx8IFwid2hlZWxEZWx0YVwiIGluIGUgfHwgXCJ3aGVlbERlbHRhWVwiIGluIGUgfHwgXCJ3aGVlbERlbHRhWFwiIGluIGUgfHwgXCJkZWx0YVlcIiBpbiBlIHx8IFwiZGVsdGFYXCIgaW4gZSB8fCBcImF4aXNcIiBpbiBlIHx8IFwiZGVsdGFNb2RlXCIgaW4gZSkpIHtcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IHZvaWQgMDtcbiAgICAgICAgICAgIHZhciBkZWx0YVggPSB2b2lkIDA7XG4gICAgICAgICAgICB2YXIgZGVsdGFZID0gdm9pZCAwO1xuICAgICAgICAgICAgLy8gT2xkIHNjaG9vbCBzY3JvbGx3aGVlbCBkZWx0YVxuICAgICAgICAgICAgaWYgKFwiZGV0YWlsXCIgaW4gZSkge1xuICAgICAgICAgICAgICAgIGRlbHRhWSA9IGUuZGV0YWlsICogLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXCJ3aGVlbERlbHRhXCIgaW4gZSkge1xuICAgICAgICAgICAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcIndoZWVsRGVsdGFZXCIgaW4gZSkge1xuICAgICAgICAgICAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YVk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXCJ3aGVlbERlbHRhWFwiIGluIGUpIHtcbiAgICAgICAgICAgICAgICBkZWx0YVggPSBlLndoZWVsRGVsdGFYICogLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBGaXJlZm94IDwgMTcgaG9yaXpvbnRhbCBzY3JvbGxpbmcgcmVsYXRlZCB0byBET01Nb3VzZVNjcm9sbCBldmVudFxuICAgICAgICAgICAgaWYgKFwiYXhpc1wiIGluIGUgJiYgZS5heGlzID09PSBlLkhPUklaT05UQUxfQVhJUykge1xuICAgICAgICAgICAgICAgIGRlbHRhWCA9IGRlbHRhWSAqIC0xO1xuICAgICAgICAgICAgICAgIGRlbHRhWSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOZXcgc2Nob29sIHdoZWVsIGRlbHRhICh3aGVlbCBldmVudClcbiAgICAgICAgICAgIGlmIChcImRlbHRhWVwiIGluIGUpIHtcbiAgICAgICAgICAgICAgICBkZWx0YVkgPSBlLmRlbHRhWSAqIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFwiZGVsdGFYXCIgaW4gZSkge1xuICAgICAgICAgICAgICAgIGRlbHRhWCA9IGUuZGVsdGFYO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTmVlZCB0byBjb252ZXJ0IGxpbmVzIGFuZCBwYWdlcyB0byBwaXhlbHMgaWYgd2UgYXJlblwidCBhbHJlYWR5IGluIHBpeGVsc1xuICAgICAgICAgICAgLy8gVGhlcmUgYXJlIHRocmVlIGRlbHRhIG1vZGVzOlxuICAgICAgICAgICAgLy8gICAqIGRlbHRhTW9kZSAwIGlzIGJ5IHBpeGVscywgbm90aGluZyB0byBkb1xuICAgICAgICAgICAgLy8gICAqIGRlbHRhTW9kZSAxIGlzIGJ5IGxpbmVzXG4gICAgICAgICAgICAvLyAgICogZGVsdGFNb2RlIDIgaXMgYnkgcGFnZXNcbiAgICAgICAgICAgIGlmIChlLmRlbHRhTW9kZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBsaW5lSGVpZ2h0ID0gX1V0aWxzRE9NMi5kZWZhdWx0LmdldExpbmVIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICBkZWx0YVkgPSBkZWx0YVkgKiBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgICAgIGRlbHRhWCA9IGRlbHRhWCAqIGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuZGVsdGFNb2RlID09PSAyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdpbmRvd2hlZ2lodCA9IF9VdGlsc1dpbmRvdzIuZGVmYXVsdC5nZXRIZWlnaHQoKTtcbiAgICAgICAgICAgICAgICBkZWx0YVkgPSBkZWx0YVkgKiB3aW5kb3doZWdpaHQ7XG4gICAgICAgICAgICAgICAgZGVsdGFYID0gZGVsdGFYICogd2luZG93aGVnaWh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsdGEgPSBkZWx0YVkgPT09IDAgPyBkZWx0YVggOiBkZWx0YVk7XG4gICAgICAgICAgICByZXR1cm4gZGVsdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBNb3VzZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gTW91c2U7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc01vdXNlLnRzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggc2NyZWVuXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFNjcmVlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY3JlZW4oKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTY3JlZW4pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gaW5mb1xuICAgICAqIEByZXR1cm4ge3thdmFpbGFibGVTaXplOiB7aGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXJ9LCBjb2xvckRlcHRoOiBudW1iZXIsIHBpeGVsUmF0aW86IG51bWJlciwgc2l6ZToge2hlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyfX19XG4gICAgICovXG4gICAgU2NyZWVuLmdldEluZm8gPSBmdW5jdGlvbiBnZXRJbmZvKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYXZhaWxhYmxlU2l6ZTogU2NyZWVuLmdldEF2YWlsYWJsZVNpemVzKCksXG4gICAgICAgICAgICBjb2xvckRlcHRoOiBTY3JlZW4uZ2V0Q29sb3JEZXB0aCgpLFxuICAgICAgICAgICAgcGl4ZWxSYXRpbzogU2NyZWVuLmdldFBpeGVsUmF0aW8oKSxcbiAgICAgICAgICAgIHNpemU6IFNjcmVlbi5nZXRTaXplcygpXG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2NyZWVuIGhlaWdodFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRIZWlnaHQgPSBmdW5jdGlvbiBnZXRIZWlnaHQoKSB7XG4gICAgICAgIHJldHVybiBzY3JlZW4uaGVpZ2h0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiB3aWR0aFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRXaWR0aCA9IGZ1bmN0aW9uIGdldFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gc2NyZWVuLndpZHRoO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiBzaXplc1xuICAgICAqIEByZXR1cm4ge3toZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn19XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRTaXplcyA9IGZ1bmN0aW9uIGdldFNpemVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVpZ2h0OiBTY3JlZW4uZ2V0SGVpZ2h0KCksXG4gICAgICAgICAgICB3aWR0aDogU2NyZWVuLmdldFdpZHRoKClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gaGVpZ2h0XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgU2NyZWVuLmdldEF2YWlsYWJsZUhlaWdodCA9IGZ1bmN0aW9uIGdldEF2YWlsYWJsZUhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbi5hdmFpbEhlaWdodDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gd2lkdGhcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBTY3JlZW4uZ2V0QXZhaWxhYmxlV2lkdGggPSBmdW5jdGlvbiBnZXRBdmFpbGFibGVXaWR0aCgpIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbi5hdmFpbFdpZHRoO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiBzaXplc1xuICAgICAqIEByZXR1cm4ge3toZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn19XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRBdmFpbGFibGVTaXplcyA9IGZ1bmN0aW9uIGdldEF2YWlsYWJsZVNpemVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVpZ2h0OiBTY3JlZW4uZ2V0QXZhaWxhYmxlSGVpZ2h0KCksXG4gICAgICAgICAgICB3aWR0aDogU2NyZWVuLmdldEF2YWlsYWJsZVdpZHRoKClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gcGl4ZWwgcmF0aW9cbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRQaXhlbFJhdGlvID0gZnVuY3Rpb24gZ2V0UGl4ZWxSYXRpbygpIHtcbiAgICAgICAgdmFyIHJhdGlvID0gMTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuc2NyZWVuLnN5c3RlbVhEUEkgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvdy5zY3JlZW4ubG9naWNhbFhEUEkgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LnNjcmVlbi5zeXN0ZW1YRFBJID4gd2luZG93LnNjcmVlbi5sb2dpY2FsWERQSSkge1xuICAgICAgICAgICAgcmF0aW8gPSB3aW5kb3cuc2NyZWVuLnN5c3RlbVhEUEkgLyB3aW5kb3cuc2NyZWVuLmxvZ2ljYWxYRFBJO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmF0aW87XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2NyZWVuIGNvbG9yIGRlcHRoXG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBTY3JlZW4uZ2V0Q29sb3JEZXB0aCA9IGZ1bmN0aW9uIGdldENvbG9yRGVwdGgoKSB7XG4gICAgICAgIHJldHVybiBzY3JlZW4uY29sb3JEZXB0aDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFNjcmVlbjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU2NyZWVuO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9VdGlscy9saWIvVXRpbHNTY3JlZW4udHNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBzeXN0ZW1cbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgU3lzdGVtID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN5c3RlbSgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN5c3RlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHN5c3RlbSBpbmZvXG4gICAgICogQHJldHVybiB7e25hbWU6IHN0cmluZywgdmVyc2lvbjogc3RyaW5nfX1cbiAgICAgKi9cbiAgICBTeXN0ZW0uZ2V0SW5mbyA9IGZ1bmN0aW9uIGdldEluZm8oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBTeXN0ZW0uZ2V0TmFtZSgpLFxuICAgICAgICAgICAgdmVyc2lvbjogU3lzdGVtLmdldFZlcnNpb24oKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IE9TIG5hbWVcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIFN5c3RlbS5nZXROYW1lID0gZnVuY3Rpb24gZ2V0TmFtZSgpIHtcbiAgICAgICAgdmFyIG9zID0gXCJcIjtcbiAgICAgICAgdmFyIGNsaWVudFN0cmluZ3MgPSBbe1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDEwLjB8V2luZG93cyBOVCAxMC4wKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgMTBcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKFdpbmRvd3MgOC4xfFdpbmRvd3MgTlQgNi4zKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgOC4xXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDh8V2luZG93cyBOVCA2LjIpLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyA4XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDd8V2luZG93cyBOVCA2LjEpLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyA3XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL1dpbmRvd3MgTlQgNi4wLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyBWaXN0YVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9XaW5kb3dzIE5UIDUuMi8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgU2VydmVyIDIwMDNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKFdpbmRvd3MgTlQgNS4xfFdpbmRvd3MgWFApLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyBYUFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oV2luZG93cyBOVCA1LjB8V2luZG93cyAyMDAwKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgMjAwMFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oV2luIDl4IDQuOTB8V2luZG93cyBNRSkvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIE1FXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDk4fFdpbjk4KS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgOThcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKFdpbmRvd3MgOTV8V2luOTV8V2luZG93c185NSkvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIDk1XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgTlQgNC4wXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL1dpbmRvd3MgQ0UvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIENFXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL1dpbjE2LyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyAzLjExXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL0FuZHJvaWQvLFxuICAgICAgICAgICAgczogXCJBbmRyb2lkXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL09wZW5CU0QvLFxuICAgICAgICAgICAgczogXCJPcGVuIEJTRFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9TdW5PUy8sXG4gICAgICAgICAgICBzOiBcIlN1biBPU1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oTGludXh8WDExKS8sXG4gICAgICAgICAgICBzOiBcIkxpbnV4XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhpUGhvbmV8aVBhZHxpUG9kKS8sXG4gICAgICAgICAgICBzOiBcImlPU1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9NYWMgT1MgWC8sXG4gICAgICAgICAgICBzOiBcIk1hYyBPUyBYXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhNYWNQUEN8TWFjSW50ZWx8TWFjX1Bvd2VyUEN8TWFjaW50b3NoKS8sXG4gICAgICAgICAgICBzOiBcIk1hYyBPU1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9RTlgvLFxuICAgICAgICAgICAgczogXCJRTlhcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvVU5JWC8sXG4gICAgICAgICAgICBzOiBcIlVOSVhcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvQmVPUy8sXG4gICAgICAgICAgICBzOiBcIkJlT1NcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvT1NcXC8yLyxcbiAgICAgICAgICAgIHM6IFwiT1MvMlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8obnVoa3xHb29nbGVib3R8WWFtbXlib3R8T3BlbmJvdHxTbHVycHxNU05Cb3R8QXNrIEplZXZlc1xcL1Rlb21hfGlhX2FyY2hpdmVyKS8sXG4gICAgICAgICAgICBzOiBcIlNlYXJjaCBCb3RcIlxuICAgICAgICB9XTtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gY2xpZW50U3RyaW5ncywgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvciksIF9pID0gMCwgX2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgIHZhciBfcmVmO1xuXG4gICAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgX3JlZiA9IF9pdGVyYXRvcltfaSsrXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX2kgPSBfaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICBfcmVmID0gX2kudmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjcyA9IF9yZWY7XG5cbiAgICAgICAgICAgIGlmIChjcy5yLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgICAgICAgICBvcyA9IGNzLnM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9zO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IE9TIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIFN5c3RlbS5nZXRWZXJzaW9uID0gZnVuY3Rpb24gZ2V0VmVyc2lvbigpIHtcbiAgICAgICAgdmFyIG9zID0gU3lzdGVtLmdldE5hbWUoKTtcbiAgICAgICAgdmFyIG9zVmVyc2lvbiA9IFwiXCI7XG4gICAgICAgIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9XaW5kb3dzICguKikvLmV4ZWMob3MpWzFdO1xuICAgICAgICAgICAgb3MgPSBcIldpbmRvd3NcIjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKG9zKSB7XG4gICAgICAgICAgICBjYXNlIFwiTWFjIE9TIFhcIjpcbiAgICAgICAgICAgICAgICBvc1ZlcnNpb24gPSAvTWFjIE9TIFggKDEwWy5fXFxkXSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkFuZHJvaWRcIjpcbiAgICAgICAgICAgICAgICBvc1ZlcnNpb24gPSAvQW5kcm9pZCAoWy5fXFxkXSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImlPU1wiOlxuICAgICAgICAgICAgICAgIHZhciByZWcgPSAvT1MgKFxcZCspXyhcXGQrKV8/KFxcZCspPy8uZXhlYyhuYXZpZ2F0b3IuYXBwVmVyc2lvbik7XG4gICAgICAgICAgICAgICAgb3NWZXJzaW9uID0gcmVnWzFdICsgXCIuXCIgKyByZWdbMl0gKyBcIi5cIiArIChyZWdbM10gfHwgMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvc1ZlcnNpb247XG4gICAgfTtcblxuICAgIHJldHVybiBTeXN0ZW07XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN5c3RlbTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vVXRpbHMvbGliL1V0aWxzU3lzdGVtLnRzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggdXNlclxuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfVXRpbHNCcm93c2VyID0gcmVxdWlyZShcIi4vVXRpbHNCcm93c2VyXCIpO1xuXG52YXIgX1V0aWxzQnJvd3NlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0Jyb3dzZXIpO1xuXG52YXIgX1V0aWxzU2NyZWVuID0gcmVxdWlyZShcIi4vVXRpbHNTY3JlZW5cIik7XG5cbnZhciBfVXRpbHNTY3JlZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTY3JlZW4pO1xuXG52YXIgX1V0aWxzU3lzdGVtID0gcmVxdWlyZShcIi4vVXRpbHNTeXN0ZW1cIik7XG5cbnZhciBfVXRpbHNTeXN0ZW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTeXN0ZW0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgVXNlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBVc2VyKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVXNlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHVzZXIgaW5mb1xuICAgICAqIEByZXR1cm4ge3ticm93c2VyOiB7YnJvd3Nlcjogc3RyaW5nLCBtb2JpbGU6IGJvb2xlYW4sIHZlcnNpb246IHN0cmluZ30sIHNjcmVlbjoge2F2YWlsYWJsZVNpemU6IHtoZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn0sIGNvbG9yRGVwdGg6IG51bWJlciwgcGl4ZWxSYXRpbzogbnVtYmVyLCBzaXplOiB7aGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXJ9fSwgc3lzdGVtOiB7bmFtZTogc3RyaW5nLCB2ZXJzaW9uOiBzdHJpbmd9fX1cbiAgICAgKi9cbiAgICBVc2VyLmdldEluZm8gPSBmdW5jdGlvbiBnZXRJbmZvKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYnJvd3NlcjogX1V0aWxzQnJvd3NlcjIuZGVmYXVsdC5nZXRJbmZvKCksXG4gICAgICAgICAgICBzY3JlZW46IF9VdGlsc1NjcmVlbjIuZGVmYXVsdC5nZXRJbmZvKCksXG4gICAgICAgICAgICBzeXN0ZW06IF9VdGlsc1N5c3RlbTIuZGVmYXVsdC5nZXRJbmZvKClcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFVzZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFVzZXI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L1V0aWxzL2xpYi9VdGlsc1VzZXIudHNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiXSwic291cmNlUm9vdCI6IiJ9