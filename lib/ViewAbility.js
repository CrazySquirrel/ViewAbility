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
	    var numWindowHeight = ViewAbility.getWindowHeight();
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
	    var numWindowWidth = ViewAbility.getWindowWidth();
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
	   * Метод определения видимости баннера
	   *
	   * @param domBanner {Object} - Элемент DOM дерева
	   * @returns {number} - Коэффициент видимости элемента от 0 до 1
	   */
	  ViewAbility.checkVisibility = function checkVisibility(domBanner) {
	    /**
	     * Устанавливаем флаг видимости элемента
	     * Записываем элемент во временную переменную дял перебора по родителям
	     * Устанавливаем флаг соответствия элемента исходному
	     * @type {boolean}
	     */
	    var booVisible = true;
	    var domNode = domBanner;
	    var booElement = true;
	    var numDocumentWidth = ViewAbility.getDocumentWidth();
	    var numDocumentHeight = ViewAbility.getDocumentHeight();
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
	       * Определяем положение и размеры элемента
	       * @type {Object}
	       */
	      var objSizes = ViewAbility.getBoundingClientRect(domBanner);
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
	      numVisibility = ViewAbility.calcVisibility(objSizes) * opacity;
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
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define("AnimationFrame", [], factory);
		else if(typeof exports === 'object')
			exports["AnimationFrame"] = factory();
		else
			root["AnimationFrame"] = factory();
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
	/******/ ({
	
	/***/ 0:
	/***/ function(module, exports, __webpack_require__) {
	
		module.exports = __webpack_require__(5);
	
	
	/***/ },
	
	/***/ 5:
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
	
	/***/ }
	
	/******/ })
	});
	;
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uPzVjYTYqKiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTBiZTM5YzljMTlkNTcwOGQ2MDc/MjQ4ZSoqIiwid2VicGFjazovLy8uL2xpYi9BbmltYXRpb25GcmFtZS50cz80MTQzKiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7O0FBRUE7O0FBRUEscUdBQW9HLG1CQUFtQixFQUFFLG1CQUFtQiw4SEFBOEg7O0FBRTFRLGtEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsc0JBQXNCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQyIsImZpbGUiOiIuL2xpYi9BbmltYXRpb25GcmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiQW5pbWF0aW9uRnJhbWVcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQW5pbWF0aW9uRnJhbWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQW5pbWF0aW9uRnJhbWVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTBiZTM5YzljMTlkNTcwOGQ2MDciLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgcm9vdCA9IHZvaWQgMDtcbmlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcm9vdCA9IGdsb2JhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByb290ID0ge307XG4gICAgfVxufSBlbHNlIHtcbiAgICByb290ID0gd2luZG93O1xufVxuLyoqXG4gKiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGxcbiAqL1xucm9vdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiByb290ICE9PSBcInVuZGVmaW5lZFwiICYmIChyb290LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCByb290Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcm9vdC5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSkgfHwgZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHJvb3Quc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcbiAgICB9O1xufSgpO1xuLyoqXG4gKiBCaW5kIHBvbHlmaWxsXG4gKi9cbmZ1bmN0aW9uIGJpbmQoYikge1xuICAgIC8qKlxuICAgICAqIElmIHRyeSBiaW5kIHZhcmlhYmxlIHRoYXQgbm90IGEgZnVuY3Rpb24sIHRoZW4gdGhyb3cgZXJyb3JcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIHRoaXMgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgLSB3aGF0IGlzIHRyeWluZyB0byBiZSBib3VuZCBpcyBub3QgY2FsbGFibGVcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIGxldCBBcnJheSBzbGljZSBmdW5jdGlvblxuICAgICAqL1xuICAgIHZhciBhID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuICAgIHZhciBmID0gYS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGUgPSB0aGlzO1xuICAgIGZ1bmN0aW9uIGMoKSB7XG4gICAgICAgIC8qXG4gICAgICAgICBpZiAoXG4gICAgICAgICB0eXBlb2Ygcm9vdCAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgdHlwZW9mIHJvb3QuY29uc29sZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgdHlwZW9mIHJvb3QuY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgKSB7XG4gICAgICAgICByb290LmNvbnNvbGUubG9nKFwiQmluZCBwb2x5ZmlsbFwiKTtcbiAgICAgICAgIH1cbiAgICAgICAgICovXG4gICAgfVxuICAgIGZ1bmN0aW9uIGQoKSB7XG4gICAgICAgIHJldHVybiBlLmFwcGx5KHRoaXMgaW5zdGFuY2VvZiBjID8gdGhpcyA6IGIgfHwgcm9vdCwgZi5jb25jYXQoYS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJlZCB0aGlzIHByb3RvdHlwZSBhcyBwcm90b3R5cGUgdG8gYmluZCBpbXBsZW1lbnRhdGlvbiBmdW5jdGlvbnNcbiAgICAgKi9cbiAgICBjLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuICAgIGQucHJvdG90eXBlID0gbmV3IGMoKTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYmluZCBwb2x5ZmlsbFxuICAgICAqL1xuICAgIHJldHVybiBkO1xufVxuRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgPSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZCB8fCBiaW5kO1xuLyoqXG4gKiBPYmplY3Qua2V5cyBwb2x5ZmlsbFxuICovXG5mdW5jdGlvbiBrZXlzKCkge1xuICAgIHZhciBoYXNEb05vdEVudW1CdWcgPSAheyB0b1N0cmluZzogbnVsbCB9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIik7XG4gICAgdmFyIGRvTm90RW51bXMgPSBbXCJ0b1N0cmluZ1wiLCBcInRvTG9jYWxlU3RyaW5nXCIsIFwidmFsdWVPZlwiLCBcImhhc093blByb3BlcnR5XCIsIFwiaXNQcm90b3R5cGVPZlwiLCBcInByb3BlcnR5SXNFbnVtZXJhYmxlXCIsIFwiY29uc3RydWN0b3JcIl07XG4gICAgdmFyIGRvTm90RW51bXNMZW5ndGggPSBkb05vdEVudW1zLmxlbmd0aDtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBpZiAoKHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopKSAhPT0gXCJvYmplY3RcIiAmJiAodHlwZW9mIG9iaiAhPT0gXCJmdW5jdGlvblwiIHx8IG9iaiA9PT0gbnVsbCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJPYmplY3Qua2V5cyBjYWxsZWQgb24gbm9uLW9iamVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwcm9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzRG9Ob3RFbnVtQnVnKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvTm90RW51bXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBkb05vdEVudW1zW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChkb05vdEVudW1zW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xufVxuT2JqZWN0LmtleXMgPSBPYmplY3Qua2V5cyB8fCBrZXlzKCk7XG4vKipcbiAqIFJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lIGNhbGwgc3RhY2sgY2xhc3NcbiAqL1xuXG52YXIgQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lXG4gICAgICovXG4gICAgZnVuY3Rpb24gQW5pbWF0aW9uRnJhbWUoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBbmltYXRpb25GcmFtZSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN1YnNjcmliZWQgbWV0aG9kc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdGFjayA9IHt9O1xuICAgICAgICAvKipcbiAgICAgICAgICogU3RhcnQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHdhdGNoZXJcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud2F0Y2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIG1ldGhvZCB0byB3YXRjaFxuICAgICAqIEBwYXJhbSBjb250ZXh0XG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHBhcmFtc1xuICAgICAqIEBwYXJhbSBJRFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW58c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBBbmltYXRpb25GcmFtZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKCkge1xuICAgICAgICB2YXIgY29udGV4dCA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogcm9vdDtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBhcmFtcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG4gICAgICAgIHZhciBJRCA9IGFyZ3VtZW50c1szXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgY29udGV4dCBhbmQgY2FsbGJhY2sgcGFzc2VkIGFuZCB0aGV5IGFyZSBvYmplY3QgYW5kIGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoKHR5cGVvZiBjb250ZXh0ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoY29udGV4dCkpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiICYmICh0eXBlb2YgcGFyYW1zID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YocGFyYW1zKSkgPT09IFwib2JqZWN0XCIgJiYgQXJyYXkuaXNBcnJheShwYXJhbXMpICYmIChJRCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBJRCA9PT0gXCJzdHJpbmdcIikpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ3JlYXRlIFVJRFxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgICB2YXIgbG9jYWxJRCA9IElEIHx8IFwieC1cIiArIGQuZ2V0VGltZSgpICsgXCItXCIgKyBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAxZTYpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBZGQgbWV0aG9kIHRvIHRoZSBzdGFja1xuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLnN0YWNrW2xvY2FsSURdID0ge1xuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBXcml0ZSB0byBjb25zb2xlIGNvdW50IG9mIHRoZSBzdWJzY3JpYmVkIG1ldGhvZHNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZXR1cm4gVUlEXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHJldHVybiBsb2NhbElEO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBVbnN1YnNjcmliZSBtZXRob2QgYnkgSURcbiAgICAgKiBAcGFyYW0gSURcbiAgICAgKi9cblxuXG4gICAgQW5pbWF0aW9uRnJhbWUucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdW5zdWJzY3JpYmUoSUQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBJRCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiByZXF1aXJlZCBtZXRob2QgZXhpc3QgaW4gdGhlIHN0YWNrXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrW0lEXSkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIE51bGxpZnkgbWV0aG9kIGluIHRoZSBzdGFjayBhbmQgZGVzdHJveSBpdFxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tbSURdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc3RhY2tbSURdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBXYXRjaCBhbmQgY2FsbCBtZXRob2RzXG4gICAgICovXG5cblxuICAgIEFuaW1hdGlvbkZyYW1lLnByb3RvdHlwZS53YXRjaCA9IGZ1bmN0aW9uIHdhdGNoKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBzdGFjayBleGlzdCwgaXQgaXMgYW4gb2JqZWN0IGFuZCBpdCBpcyBjb250YWlucyBtZXRob2RzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrICYmIF90eXBlb2YodGhpcy5zdGFjaykgPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0LmtleXModGhpcy5zdGFjaykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIExvb3AgYWxsIG1ldGhvZHMgaW4gc3RhY2tcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBJRCBpbiB0aGlzLnN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBQcm9jZXNzIG9ubHkgbWV0aG9kcyB3aXRob3V0IGV4dGVuZGVkIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrLmhhc093blByb3BlcnR5KElEKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBJZiBJRCBleGlzdCBhbmQgaXQgaXMgYSBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoSUQgJiYgdHlwZW9mIElEID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBHZXQgc3Vic2NyaWJlZCBtZXRob2QgcGFyYW1zIGJ5IElEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqQ2FsbCA9IHRoaXMuc3RhY2tbSURdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogSWYgcGFyYW1zIGV4aXN0LCBpdCBpcyBhbiBvYmplY3QsIGFuZCBpdCBpcyBjb250YWlucyBjYWxsIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIGNhbGxiYWNrLCBhbmQgcGFyYW1ldGVycyB3aGljaCBpcyBhcnJheVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iakNhbGwgJiYgKHR5cGVvZiBvYmpDYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqQ2FsbCkpID09PSBcIm9iamVjdFwiICYmIG9iakNhbGwuY29udGV4dCAmJiBvYmpDYWxsLmNhbGxiYWNrICYmIG9iakNhbGwucGFyYW1zICYmIF90eXBlb2Yob2JqQ2FsbC5jb250ZXh0KSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqQ2FsbC5jYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiICYmIEFycmF5LmlzQXJyYXkob2JqQ2FsbC5wYXJhbXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIENhbGwgc3Vic2NyaWJlZCBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqQ2FsbC5jYWxsYmFjay5hcHBseShvYmpDYWxsLmNvbnRleHQsIG9iakNhbGwucGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNhbGwgd2F0Y2hlclxuICAgICAgICAgKi9cbiAgICAgICAgcm9vdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy53YXRjaC5iaW5kKHRoaXMpKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEFuaW1hdGlvbkZyYW1lO1xufSgpO1xuLyoqXG4gKiBDcmVhdGUgc2luZ2xlIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lIG9iamVjdFxuICogQHR5cGUge0FuaW1hdGlvbkZyYW1lfVxuICovXG5cblxucm9vdC5BbmltYXRpb25GcmFtZSA9IHJvb3QuQW5pbWF0aW9uRnJhbWUgfHwgbmV3IEFuaW1hdGlvbkZyYW1lKCk7XG4vKipcbiAqIEV4cG9ydCBzaW5nbGUgQW5pbWF0aW9uRnJhbWUgaW5zdGFuY2VcbiAqL1xudmFyIF9BbmltYXRpb25GcmFtZSA9IHJvb3QuQW5pbWF0aW9uRnJhbWU7XG5leHBvcnRzLmRlZmF1bHQgPSBfQW5pbWF0aW9uRnJhbWU7XG5cbm1vZHVsZS5leHBvcnRzID0gX0FuaW1hdGlvbkZyYW1lO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGliL0FuaW1hdGlvbkZyYW1lLnRzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiXSwic291cmNlUm9vdCI6IiJ9

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define("Utils", [], factory);
		else if(typeof exports === 'object')
			exports["Utils"] = factory();
		else
			root["Utils"] = factory();
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
		/**
		 * Import subclasses
		 */
		
		exports.__esModule = true;
		
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
		
		var _UtilsAnimation = __webpack_require__(6);
		
		var _UtilsAnimation2 = _interopRequireDefault(_UtilsAnimation);
		
		var _UtilsBrowser = __webpack_require__(8);
		
		var _UtilsBrowser2 = _interopRequireDefault(_UtilsBrowser);
		
		var _UtilsCookie = __webpack_require__(9);
		
		var _UtilsCookie2 = _interopRequireDefault(_UtilsCookie);
		
		var _UtilsDocument = __webpack_require__(16);
		
		var _UtilsDocument2 = _interopRequireDefault(_UtilsDocument);
		
		var _UtilsDOM = __webpack_require__(18);
		
		var _UtilsDOM2 = _interopRequireDefault(_UtilsDOM);
		
		var _UtilsMouse = __webpack_require__(19);
		
		var _UtilsMouse2 = _interopRequireDefault(_UtilsMouse);
		
		var _UtilsScreen = __webpack_require__(20);
		
		var _UtilsScreen2 = _interopRequireDefault(_UtilsScreen);
		
		var _UtilsSystem = __webpack_require__(21);
		
		var _UtilsSystem2 = _interopRequireDefault(_UtilsSystem);
		
		var _UtilsUser = __webpack_require__(22);
		
		var _UtilsUser2 = _interopRequireDefault(_UtilsUser);
		
		var _UtilsWindow = __webpack_require__(17);
		
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
	/* 6 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		/**
		 * Import subclasses
		 */
		
		exports.__esModule = true;
		
		var _UtilsAnimationEasing = __webpack_require__(7);
		
		var _UtilsAnimationEasing2 = _interopRequireDefault(_UtilsAnimationEasing);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		var Animation = function Animation() {
		  _classCallCheck(this, Animation);
		};
		
		exports.default = Animation;
		
		Animation.Easing = _UtilsAnimationEasing2.default;
	
	/***/ },
	/* 7 */
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
	/* 8 */
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
	/* 9 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		exports.__esModule = true;
		
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		var URL = __webpack_require__(10);
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
		
		
		  Cookie.setItem = function setItem(checkSupport, key, value) {
		    var expires = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
		    var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "/";
		    var domain = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : location.hostname;
		    var secure = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : location.protocol === "https:";
		
		    try {
		      /**
		       * Validate input data
		       */
		      if (typeof checkSupport === "boolean" && typeof key === "string" && Cookie.regValidKey.test(key) && typeof value === "string" && typeof expires === "number" && expires < 365 && typeof path === "string" && typeof domain === "string" && domain.indexOf(location.hostname) !== -1 && typeof secure === "boolean" && secure === (location.protocol === "https:")) {
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
		            return Cookie.getItem(checkSupport, key) === value;
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
		
		
		  Cookie.getItem = function getItem(checkSupport, key) {
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
		
		
		  Cookie.removeItem = function removeItem(checkSupport, key) {
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
		          Cookie.setItem(checkSupport, key, "", -1);
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
		
		
		  Cookie.getKeys = function getKeys(checkSupport) {
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
		
		
		  Cookie.clear = function clear(checkSupport) {
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
	/* 10 */
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
		
		var punycode = __webpack_require__(11);
		
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
		    querystring = __webpack_require__(13);
		
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
	/* 11 */
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
		
		/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)(module), (function() { return this; }())))
	
	/***/ },
	/* 12 */
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
	/* 13 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		exports.decode = exports.parse = __webpack_require__(14);
		exports.encode = exports.stringify = __webpack_require__(15);
	
	
	/***/ },
	/* 14 */
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
	/* 15 */
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
	/* 16 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		exports.__esModule = true;
		
		var _UtilsWindow = __webpack_require__(17);
		
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
	/* 17 */
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
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		exports.__esModule = true;
		
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
		
		var _Utils = __webpack_require__(5);
		
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
		        if (obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj.nodeType === 1 && obj.parentElement && obj.parentElement.nodeName !== "HTML" && typeof name === "string" && typeof func === "function") {
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
		        if (obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj.nodeType === 1 && obj.parentElement && obj.parentElement.nodeName !== "HTML" && typeof name === "string" && typeof func === "function") {
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
		        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof className === "string" && element.nodeType === 1 && element.parentElement && element.parentElement.nodeName !== "HTML") {
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
		        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof className === "string" && element.nodeType === 1 && element.parentElement && element.parentElement.nodeName !== "HTML") {
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
		        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof className === "string" && element.nodeType === 1 && element.parentElement && element.parentElement.nodeName !== "HTML" && typeof element.className === "string") {
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
		        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof className === "string" && typeof toggle === "boolean" && element.nodeType === 1 && element.parentElement && element.parentElement.nodeName !== "HTML") {
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
		        if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === "object" && typeof oldClassName === "string" && typeof newClassName === "string" && element.nodeType === 1 && element.parentElement && element.parentElement.nodeName !== "HTML") {
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
	/* 19 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		/**
		 * Import additional classes
		 */
		
		exports.__esModule = true;
		
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
		
		var _UtilsDOM = __webpack_require__(18);
		
		var _UtilsDOM2 = _interopRequireDefault(_UtilsDOM);
		
		var _UtilsWindow = __webpack_require__(17);
		
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
	/* 20 */
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
	/* 21 */
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
	/* 22 */
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		/**
		 * Class for working with user
		 */
		
		exports.__esModule = true;
		
		var _UtilsBrowser = __webpack_require__(8);
		
		var _UtilsBrowser2 = _interopRequireDefault(_UtilsBrowser);
		
		var _UtilsScreen = __webpack_require__(20);
		
		var _UtilsScreen2 = _interopRequireDefault(_UtilsScreen);
		
		var _UtilsSystem = __webpack_require__(21);
		
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
	//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uPzVjYTYqKiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGFlOGY5MTBjOTUwYWE0Y2E3NDE/ZWE3ZSoqIiwid2VicGFjazovLy8uL2xpYi9VdGlscy50cz81YjZiKiIsIndlYnBhY2s6Ly8vLi9saWIvVXRpbHNBbmltYXRpb24udHM/OTEzMCoiLCJ3ZWJwYWNrOi8vLy4vbGliL1V0aWxzQW5pbWF0aW9uRWFzaW5nLnRzP2RkNjYqIiwid2VicGFjazovLy8uL2xpYi9VdGlsc0Jyb3dzZXIudHM/MmI0OCoiLCJ3ZWJwYWNrOi8vLy4vbGliL1V0aWxzQ29va2llLnRzP2ExNjUqIiwid2VicGFjazovLy8uL34vdXJsL3VybC5qcz9kNmE0KiIsIndlYnBhY2s6Ly8vLi9+L3VybC9+L3B1bnljb2RlL3B1bnljb2RlLmpzPzg3ZGUqIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanM/YzNjMioiLCJ3ZWJwYWNrOi8vLy4vfi9xdWVyeXN0cmluZy9pbmRleC5qcz9mY2U4KiIsIndlYnBhY2s6Ly8vLi9+L3F1ZXJ5c3RyaW5nL2RlY29kZS5qcz9jMjUwKiIsIndlYnBhY2s6Ly8vLi9+L3F1ZXJ5c3RyaW5nL2VuY29kZS5qcz9lODZiKiIsIndlYnBhY2s6Ly8vLi9saWIvVXRpbHNEb2N1bWVudC50cz84ZmE2KiIsIndlYnBhY2s6Ly8vLi9saWIvVXRpbHNXaW5kb3cudHM/NWNiZioiLCJ3ZWJwYWNrOi8vLy4vbGliL1V0aWxzRE9NLnRzPzZhNDkqIiwid2VicGFjazovLy8uL2xpYi9VdGlsc01vdXNlLnRzP2JlNDYqIiwid2VicGFjazovLy8uL2xpYi9VdGlsc1NjcmVlbi50cz83Y2ZlKiIsIndlYnBhY2s6Ly8vLi9saWIvVXRpbHNTeXN0ZW0udHM/MzVmMioiLCJ3ZWJwYWNrOi8vLy4vbGliL1V0aWxzVXNlci50cz9iN2ViKiJdLCJuYW1lcyI6W10sIm1h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QUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBQzs7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQyxPQUFPO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBOEIsUUFBUTtBQUN0QztBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVSxNQUFNO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDL0RBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RixrREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFDOztBQUVELDRCOzs7Ozs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUdBQW9HLG1CQUFtQixFQUFFLG1CQUFtQiw4SEFBOEg7O0FBRTFRLGtEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQsMEI7Ozs7OztBQzFFQTs7QUFFQTs7QUFFQSxxR0FBb0csbUJBQW1CLEVBQUUsbUJBQW1CLDhIQUE4SDs7QUFFMVE7O0FBRUE7O0FBRUEsdUNBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGLGtEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7OztBQUdBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBQzs7QUFFRCwwQjs7Ozs7O0FDcEtBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLHVDQUFzQyx1Q0FBdUMsZ0JBQWdCOztBQUU3RixrREFBaUQsMENBQTBDLDBEQUEwRCxFQUFFOztBQUV2SjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWlCLFVBQVUsa0RBQWtELFdBQVcsZ0JBQWdCLDhCQUE4QixpREFBaUQsK0JBQStCLFdBQVc7QUFDak87QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQsd0IiLCJmaWxlIjoiLi9saWIvVXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIlV0aWxzXCIsIFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlV0aWxzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlV0aWxzXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDhhZThmOTEwYzk1MGFhNGNhNzQxIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEltcG9ydCBzdWJjbGFzc2VzXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX1V0aWxzQW5pbWF0aW9uID0gcmVxdWlyZShcIi4vVXRpbHNBbmltYXRpb25cIik7XG5cbnZhciBfVXRpbHNBbmltYXRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNBbmltYXRpb24pO1xuXG52YXIgX1V0aWxzQnJvd3NlciA9IHJlcXVpcmUoXCIuL1V0aWxzQnJvd3NlclwiKTtcblxudmFyIF9VdGlsc0Jyb3dzZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNCcm93c2VyKTtcblxudmFyIF9VdGlsc0Nvb2tpZSA9IHJlcXVpcmUoXCIuL1V0aWxzQ29va2llXCIpO1xuXG52YXIgX1V0aWxzQ29va2llMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzQ29va2llKTtcblxudmFyIF9VdGlsc0RvY3VtZW50ID0gcmVxdWlyZShcIi4vVXRpbHNEb2N1bWVudFwiKTtcblxudmFyIF9VdGlsc0RvY3VtZW50MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzRG9jdW1lbnQpO1xuXG52YXIgX1V0aWxzRE9NID0gcmVxdWlyZShcIi4vVXRpbHNET01cIik7XG5cbnZhciBfVXRpbHNET00yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNET00pO1xuXG52YXIgX1V0aWxzTW91c2UgPSByZXF1aXJlKFwiLi9VdGlsc01vdXNlXCIpO1xuXG52YXIgX1V0aWxzTW91c2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNNb3VzZSk7XG5cbnZhciBfVXRpbHNTY3JlZW4gPSByZXF1aXJlKFwiLi9VdGlsc1NjcmVlblwiKTtcblxudmFyIF9VdGlsc1NjcmVlbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc1NjcmVlbik7XG5cbnZhciBfVXRpbHNTeXN0ZW0gPSByZXF1aXJlKFwiLi9VdGlsc1N5c3RlbVwiKTtcblxudmFyIF9VdGlsc1N5c3RlbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc1N5c3RlbSk7XG5cbnZhciBfVXRpbHNVc2VyID0gcmVxdWlyZShcIi4vVXRpbHNVc2VyXCIpO1xuXG52YXIgX1V0aWxzVXNlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc1VzZXIpO1xuXG52YXIgX1V0aWxzV2luZG93ID0gcmVxdWlyZShcIi4vVXRpbHNXaW5kb3dcIik7XG5cbnZhciBfVXRpbHNXaW5kb3cyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNXaW5kb3cpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG4vKipcbiAqIEdsb2JhbCBVdGlscyBjbGFzc1xuICovXG52YXIgVXRpbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVXRpbHMoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBVdGlscyk7XG4gICAgfVxuXG4gICAgVXRpbHMud2FybiA9IGZ1bmN0aW9uIHdhcm4obWVzc2FuZ2UpIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgY29uc29sZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGNvbnNvbGUpKSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS53YXJuKG1lc3NhbmdlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FuZ2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25zb2xlLmxvZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhtZXNzYW5nZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhbmdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBVdGlscy5nZXRCb3VuZGluZ0NsaWVudFJlY3QgbWV0aG9kIHdhcyBkZXByZWNhdGVkIGFuZCBzb29uIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSBVdGlscy5ET00uZ2V0Qm91bmRpbmdDbGllbnRSZWN0IG1ldGhvZC5cbiAgICAgKi9cblxuXG4gICAgVXRpbHMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ID0gZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGRvbU5vZGUpIHtcbiAgICAgICAgdmFyIGRvbURvY3VtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudDtcbiAgICAgICAgdmFyIHNob3dGb3JjZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgICAgICAgVXRpbHMud2FybihcIlV0aWxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCBtZXRob2Qgd2FzIGRlcHJlY2F0ZWQgYW5kIHNvb24gd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlIFV0aWxzLkRPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgbWV0aG9kLlwiKTtcbiAgICAgICAgcmV0dXJuIFV0aWxzLkRPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoZG9tTm9kZSwgZG9tRG9jdW1lbnQsIHNob3dGb3JjZSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBkZXByZWNhdGVkIFV0aWxzLmZpbmRFbGVtZW50UG9zaXRpb24gbWV0aG9kIHdhcyBkZXByZWNhdGVkIGFuZCBzb29uIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSBVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2QuXG4gICAgICovXG4gICAgVXRpbHMuZmluZEVsZW1lbnRQb3NpdGlvbiA9IGZ1bmN0aW9uIGZpbmRFbGVtZW50UG9zaXRpb24oZG9tTm9kZSkge1xuICAgICAgICB2YXIgZG9tRG9jdW1lbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGRvY3VtZW50O1xuICAgICAgICB2YXIgc2hvd0ZvcmNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblxuICAgICAgICBVdGlscy53YXJuKFwiVXRpbHMuZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2Qgd2FzIGRlcHJlY2F0ZWQgYW5kIHNvb24gd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlIFV0aWxzLkRPTS5maW5kRWxlbWVudFBvc2l0aW9uIG1ldGhvZC5cIik7XG4gICAgICAgIHJldHVybiBVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbihkb21Ob2RlLCBkb21Eb2N1bWVudCwgc2hvd0ZvcmNlKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFRyYW5zZmVyIHN0YXRpYyBtZXRob2RzIGludG8gdGhlIG9iamVjdFxuICAgICAqIEBwYXJhbSByZWFsT2JqZWN0XG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqL1xuXG5cbiAgICBVdGlscy5pbXBsZW1lbnRhdGlvblN0YXRpY01ldGhvZHMgPSBmdW5jdGlvbiBpbXBsZW1lbnRhdGlvblN0YXRpY01ldGhvZHMocmVhbE9iamVjdCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmICghIXJlYWxPYmplY3QgJiYgKHR5cGVvZiByZWFsT2JqZWN0ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YocmVhbE9iamVjdCkpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzdGF0aWNDbGFzcyA9IHJlYWxPYmplY3QuY29uc3RydWN0b3I7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdGF0aWNDbGFzcyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZXRob2RzID0gT2JqZWN0LmtleXMoc3RhdGljQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWV0aG9kcyAmJiBtZXRob2RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfbG9vcCA9IGZ1bmN0aW9uIF9sb29wKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaXNBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZiA9IF9pdGVyYXRvcltfaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaSA9IF9pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfaS5kb25lKSByZXR1cm4gXCJicmVha1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVmID0gX2kudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1ldGhvZCA9IF9yZWY7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlYWxPYmplY3RbbWV0aG9kXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWFsT2JqZWN0W21ldGhvZF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0YXRpY0NsYXNzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVXRpbHMud2FybihcIlRoYXQgbWV0aG9kIHdhcyBkZXByZWNhdGVkIGFuZCBzb29uIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSBcIiArIChjbGFzc05hbWUgfHwgc3RhdGljQ2xhc3MgJiYgc3RhdGljQ2xhc3MubmFtZSB8fCBcIlVua25vd25cIikgKyBcIi5cIiArIG1ldGhvZCArIFwiIG1ldGhvZC5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGljQ2xhc3NbbWV0aG9kXS5hcHBseShzdGF0aWNDbGFzcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBtZXRob2RzLCBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yKSwgX2kgPSAwLCBfaXRlcmF0b3IgPSBfaXNBcnJheSA/IF9pdGVyYXRvciA6IF9pdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmVmO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9yZXQyID0gX2xvb3AoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfcmV0MiA9PT0gXCJicmVha1wiKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBjYWxsIHN0YWNrIHRyYWNlXG4gICAgICogQHJldHVybiBBcnJheTxPYmplY3Q+XG4gICAgICovXG5cblxuICAgIFV0aWxzLnN0YWNrID0gZnVuY3Rpb24gc3RhY2soKSB7XG4gICAgICAgIHZhciBlID0gbmV3IEVycm9yKCk7XG4gICAgICAgIHJldHVybiBlICYmIGUuc3RhY2sgJiYgZS5zdGFjay5zcGxpdChcIlxcblwiKS5zbGljZSg1KS5tYXAoZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgICAgIGlmICghcykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtYXRjaCA9IC9eKC4qKUAoLiopXFwuanM6KFswLTldKyk6KFswLTldKykkL2lnLmV4ZWMocyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hbMV0gPSAvKFteXFwvPF0rKS9pZy5leGVjKG1hdGNoWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFsxXSA9IG1hdGNoWzFdWzBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogbWF0Y2hbNF0gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogbWF0Y2hbMl0gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbGluZTogbWF0Y2hbM10gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtYXRjaFsxXSB8fCBcIlwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1hdGNoID0gL14oLiopQChodHRwfGh0dHBzKTooW146XSspOihbMC05XSspOihbMC05XSspJC9pZy5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtYXRjaFs1XSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBmaWxlOiBtYXRjaFszXSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBsaW5lOiBtYXRjaFs0XSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1hdGNoWzFdICsgXCI6XCIgKyBtYXRjaFsyXSB8fCBcIlwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1hdGNoID0gL14oLiopQCguKik6KFswLTldKyk6KFswLTldKykkL2lnLmV4ZWMocyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1hdGNoWzRdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IG1hdGNoWzJdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpbmU6IG1hdGNoWzNdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWF0Y2hbMV0gfHwgXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXRjaCA9IC9eXFxzK2F0XFxzKFteKF0rKVxcc1xcKCguKik6KFswLTldKyk6KFswLTldKylcXCkkL2lnLmV4ZWMocyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1hdGNoWzRdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGZpbGU6IG1hdGNoWzJdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIGxpbmU6IG1hdGNoWzNdIHx8IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWF0Y2hbMV0gfHwgXCJcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtYXRjaCA9IC9eXFxzK2F0XFxzKC4qKTooWzAtOV0rKTooWzAtOV0rKSQvaWcuZXhlYyhzKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbjogbWF0Y2hbM10gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgZmlsZTogbWF0Y2hbMV0gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbGluZTogbWF0Y2hbMl0gfHwgXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9KSB8fCBbXTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCByYW5kb20gSURcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIFV0aWxzLmdldFVJRCA9IGZ1bmN0aW9uIGdldFVJRCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIFV0aWxzO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBVdGlscztcblxuVXRpbHMuQW5pbWF0aW9uID0gX1V0aWxzQW5pbWF0aW9uMi5kZWZhdWx0O1xuVXRpbHMuQnJvd3NlciA9IF9VdGlsc0Jyb3dzZXIyLmRlZmF1bHQ7XG5VdGlscy5Db29raWUgPSBfVXRpbHNDb29raWUyLmRlZmF1bHQ7XG5VdGlscy5ET00gPSBfVXRpbHNET00yLmRlZmF1bHQ7XG5VdGlscy5Eb2N1bWVudCA9IF9VdGlsc0RvY3VtZW50Mi5kZWZhdWx0O1xuVXRpbHMuTW91c2UgPSBfVXRpbHNNb3VzZTIuZGVmYXVsdDtcblV0aWxzLlNjcmVlbiA9IF9VdGlsc1NjcmVlbjIuZGVmYXVsdDtcblV0aWxzLlN5c3RlbSA9IF9VdGlsc1N5c3RlbTIuZGVmYXVsdDtcblV0aWxzLlVzZXIgPSBfVXRpbHNVc2VyMi5kZWZhdWx0O1xuVXRpbHMuV2luZG93ID0gX1V0aWxzV2luZG93Mi5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMgPSBVdGlscztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpYi9VdGlscy50c1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEltcG9ydCBzdWJjbGFzc2VzXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9VdGlsc0FuaW1hdGlvbkVhc2luZyA9IHJlcXVpcmUoXCIuL1V0aWxzQW5pbWF0aW9uRWFzaW5nXCIpO1xuXG52YXIgX1V0aWxzQW5pbWF0aW9uRWFzaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzQW5pbWF0aW9uRWFzaW5nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEFuaW1hdGlvbiA9IGZ1bmN0aW9uIEFuaW1hdGlvbigpIHtcbiAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFuaW1hdGlvbik7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBBbmltYXRpb247XG5cbkFuaW1hdGlvbi5FYXNpbmcgPSBfVXRpbHNBbmltYXRpb25FYXNpbmcyLmRlZmF1bHQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvVXRpbHNBbmltYXRpb24udHNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBEaWZmZXJlbnQgdGltZSBhbmltYXRpb24gZnVuY3Rpb25zXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEVhc2luZyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFYXNpbmcoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFYXNpbmcpO1xuICAgIH1cblxuICAgIEVhc2luZy5pc1ZhbGlkUGFyYW1zID0gZnVuY3Rpb24gaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkLCBzKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdCA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgYiA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgYyA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2YgZCA9PT0gXCJudW1iZXJcIiAmJiAodHlwZW9mIHMgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIHMgPT09IFwibnVtYmVyXCIpICYmIHQgPCBkO1xuICAgIH07XG5cbiAgICBFYXNpbmcuc3dpbmcgPSBmdW5jdGlvbiBzd2luZyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgcmV0dXJuIEVhc2luZ1tFYXNpbmcuZGVmXSh0LCBiLCBjLCBkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJblF1YWQgPSBmdW5jdGlvbiBlYXNlSW5RdWFkKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0UXVhZCA9IGZ1bmN0aW9uIGVhc2VPdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gLWMgKiAodCAvPSBkKSAqICh0IC0gMikgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0UXVhZCA9IGZ1bmN0aW9uIGVhc2VJbk91dFF1YWQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKyBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIC1jIC8gMiAqICgtLXQgKiAodCAtIDIpIC0gMSkgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluQ3ViaWMgPSBmdW5jdGlvbiBlYXNlSW5DdWJpYyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRDdWJpYyA9IGZ1bmN0aW9uIGVhc2VPdXRDdWJpYyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKyAxKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5PdXRDdWJpYyA9IGZ1bmN0aW9uIGVhc2VJbk91dEN1YmljKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCArIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCArIDIpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJblF1YXJ0ID0gZnVuY3Rpb24gZWFzZUluUXVhcnQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dFF1YXJ0ID0gZnVuY3Rpb24gZWFzZU91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gLWMgKiAoKHQgPSB0IC8gZCAtIDEpICogdCAqIHQgKiB0IC0gMSkgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluT3V0UXVhcnQgPSBmdW5jdGlvbiBlYXNlSW5PdXRRdWFydCh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAtYyAvIDIgKiAoKHQgLT0gMikgKiB0ICogdCAqIHQgLSAyKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5RdWludCA9IGZ1bmN0aW9uIGVhc2VJblF1aW50KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICogdCArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0UXVpbnQgPSBmdW5jdGlvbiBlYXNlT3V0UXVpbnQodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAqIHQgKyAxKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5PdXRRdWludCA9IGZ1bmN0aW9uIGVhc2VJbk91dFF1aW50KHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICogdCAqIHQgKiB0ICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5TaW5lID0gZnVuY3Rpb24gZWFzZUluU2luZSh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgcmV0dXJuIC1jICogTWF0aC5jb3ModCAvIGQgKiAoTWF0aC5QSSAvIDIpKSArIGMgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dFNpbmUgPSBmdW5jdGlvbiBlYXNlT3V0U2luZSh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiBNYXRoLnNpbih0IC8gZCAqIChNYXRoLlBJIC8gMikpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dFNpbmUgPSBmdW5jdGlvbiBlYXNlSW5PdXRTaW5lKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gLWMgLyAyICogKE1hdGguY29zKE1hdGguUEkgKiB0IC8gZCkgLSAxKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5FeHBvID0gZnVuY3Rpb24gZWFzZUluRXhwbyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgcmV0dXJuIHQgPT09IDAgPyBiIDogYyAqIE1hdGgucG93KDIsIDEwICogKHQgLyBkIC0gMSkpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRFeHBvID0gZnVuY3Rpb24gZWFzZU91dEV4cG8odCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0ID09PSBkID8gYiArIGMgOiBjICogKC1NYXRoLnBvdygyLCAtMTAgKiB0IC8gZCkgKyAxKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5PdXRFeHBvID0gZnVuY3Rpb24gZWFzZUluT3V0RXhwbyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgaWYgKHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ID09PSBkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYyAvIDIgKiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjIC8gMiAqICgtTWF0aC5wb3coMiwgLTEwICogLS10KSArIDIpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbkNpcmMgPSBmdW5jdGlvbiBlYXNlSW5DaXJjKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gLWMgKiAoTWF0aC5zcXJ0KDEgLSAodCAvPSBkKSAqIHQpIC0gMSkgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZU91dENpcmMgPSBmdW5jdGlvbiBlYXNlT3V0Q2lyYyh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgcmV0dXJuIGMgKiBNYXRoLnNxcnQoMSAtICh0ID0gdCAvIGQgLSAxKSAqIHQpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dENpcmMgPSBmdW5jdGlvbiBlYXNlSW5PdXRDaXJjKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtYyAvIDIgKiAoTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKSArIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYyAvIDIgKiAoTWF0aC5zcXJ0KDEgLSAodCAtPSAyKSAqIHQpICsgMSkgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluRWxhc3RpYyA9IGZ1bmN0aW9uIGVhc2VJbkVsYXN0aWModCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIHZhciBwID0gMDtcbiAgICAgICAgICAgIHZhciBhID0gYztcbiAgICAgICAgICAgIGlmICh0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYiArIGM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXApIHtcbiAgICAgICAgICAgICAgICBwID0gZCAqIC4zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuICAgICAgICAgICAgICAgIGEgPSBjO1xuICAgICAgICAgICAgICAgIHMgPSBwIC8gNDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyA9IHAgLyAoMiAqIE1hdGguUEkpICogTWF0aC5hc2luKGMgLyBhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAtKGEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0RWxhc3RpYyA9IGZ1bmN0aW9uIGVhc2VPdXRFbGFzdGljKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICB2YXIgcCA9IDA7XG4gICAgICAgICAgICB2YXIgYSA9IGM7XG4gICAgICAgICAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh0IC89IGQpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGIgKyBjO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwKSB7XG4gICAgICAgICAgICAgICAgcCA9IGQgKiAuMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhIDwgTWF0aC5hYnMoYykpIHtcbiAgICAgICAgICAgICAgICBhID0gYztcbiAgICAgICAgICAgICAgICBzID0gcCAvIDQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYSAqIE1hdGgucG93KDIsIC0xMCAqIHQpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKyBjICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dEVsYXN0aWMgPSBmdW5jdGlvbiBlYXNlSW5PdXRFbGFzdGljKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICB2YXIgcCA9IDA7XG4gICAgICAgICAgICB2YXIgYSA9IGM7XG4gICAgICAgICAgICBpZiAodCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA9PT0gMikge1xuICAgICAgICAgICAgICAgIHJldHVybiBiICsgYztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcCkge1xuICAgICAgICAgICAgICAgIHAgPSBkICogKC4zICogMS41KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhIDwgTWF0aC5hYnMoYykpIHtcbiAgICAgICAgICAgICAgICBhID0gYztcbiAgICAgICAgICAgICAgICBzID0gcCAvIDQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodCA8IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLS41ICogKGEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKSArIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYSAqIE1hdGgucG93KDIsIC0xMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICogLjUgKyBjICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbkJhY2sgPSBmdW5jdGlvbiBlYXNlSW5CYWNrKHQsIGIsIGMsIGQsIHMpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQsIHMpKSB7XG4gICAgICAgICAgICBpZiAocyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqICgocyArIDEpICogdCAtIHMpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VPdXRCYWNrID0gZnVuY3Rpb24gZWFzZU91dEJhY2sodCwgYiwgYywgZCwgcykge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCwgcykpIHtcbiAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzID0gMS43MDE1ODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDEpICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgRWFzaW5nLmVhc2VJbk91dEJhY2sgPSBmdW5jdGlvbiBlYXNlSW5PdXRCYWNrKHQsIGIsIGMsIGQsIHMpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQsIHMpKSB7XG4gICAgICAgICAgICBpZiAocyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcyA9IDEuNzAxNTg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjIC8gMiAqICh0ICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0IC0gcykpICsgYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCArIHMpICsgMikgKyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBFYXNpbmcuZWFzZUluQm91bmNlID0gZnVuY3Rpb24gZWFzZUluQm91bmNlKHQsIGIsIGMsIGQpIHtcbiAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG4gICAgICAgICAgICByZXR1cm4gYyAtIEVhc2luZy5lYXNlT3V0Qm91bmNlKGQgLSB0LCAwLCBjLCBkKSArIGI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlT3V0Qm91bmNlID0gZnVuY3Rpb24gZWFzZU91dEJvdW5jZSh0LCBiLCBjLCBkKSB7XG4gICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuICAgICAgICAgICAgaWYgKCh0IC89IGQpIDwgMSAvIDIuNzUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiB0ICogdCkgKyBiO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0IDwgMiAvIDIuNzUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAxLjUgLyAyLjc1KSAqIHQgKyAuNzUpICsgYjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodCA8IDIuNSAvIDIuNzUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiAodCAtPSAyLjI1IC8gMi43NSkgKiB0ICsgLjkzNzUpICsgYjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMi42MjUgLyAyLjc1KSAqIHQgKyAuOTg0Mzc1KSArIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIEVhc2luZy5lYXNlSW5PdXRCb3VuY2UgPSBmdW5jdGlvbiBlYXNlSW5PdXRCb3VuY2UodCwgYiwgYywgZCkge1xuICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcbiAgICAgICAgICAgIGlmICh0IDwgZCAvIDIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRWFzaW5nLmVhc2VJbkJvdW5jZSh0ICogMiwgMCwgYywgZCkgKiAuNSArIGI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gRWFzaW5nLmVhc2VPdXRCb3VuY2UodCAqIDIgLSBkLCAwLCBjLCBkKSAqIC41ICsgYyAqIC41ICsgYjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIEVhc2luZztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRWFzaW5nO1xuXG5FYXNpbmcuZGVmID0gXCJlYXNlT3V0UXVhZFwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGliL1V0aWxzQW5pbWF0aW9uRWFzaW5nLnRzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBicm93c2VyXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEJyb3dzZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQnJvd3NlcigpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJyb3dzZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBicm93c2VyIGluZm9cbiAgICAgKiBAcmV0dXJuIHt7YnJvd3Nlcjogc3RyaW5nLCBtb2JpbGU6IGJvb2xlYW4sIHZlcnNpb246IHN0cmluZ319XG4gICAgICovXG4gICAgQnJvd3Nlci5nZXRJbmZvID0gZnVuY3Rpb24gZ2V0SW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJyb3dzZXI6IEJyb3dzZXIuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgbW9iaWxlOiBCcm93c2VyLmlzTW9iaWxlKCksXG4gICAgICAgICAgICB2ZXJzaW9uOiBCcm93c2VyLmdldFZlcnNpb24oKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGJyb3dzZXIgbmFtZVxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXROYW1lID0gZnVuY3Rpb24gZ2V0TmFtZSgpIHtcbiAgICAgICAgdmFyIGJyb3dzZXIgPSB2b2lkIDA7XG4gICAgICAgIGlmIChCcm93c2VyLmlzT3BlcmEoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IFwiT3BlcmFcIjtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzT3BlcmFOZXcoKSkge1xuICAgICAgICAgICAgYnJvd3NlciA9IFwiT3BlcmFcIjtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzTVNJRSgpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gXCJNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXJcIjtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzTVNJRU5ldygpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gXCJNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXJcIjtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzQ2hyb21lKCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBcIkNocm9tZVwiO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNGaXJlZm94KCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBcIkZpcmVmb3hcIjtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzU2FmYXJpKCkpIHtcbiAgICAgICAgICAgIGJyb3dzZXIgPSBcIlNhZmFyaVwiO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNPdGhlcigpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gQnJvd3Nlci5nZXRPdGhlck5hbWUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnJvd3NlcjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0VmVyc2lvbiA9IGZ1bmN0aW9uIGdldFZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gdm9pZCAwO1xuICAgICAgICBpZiAoQnJvd3Nlci5pc09wZXJhKCkpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldE9wZXJhVmVyc2lvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNPcGVyYU5ldygpKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRPcGVyYU5ld1ZlcnNpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzTVNJRSgpKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRNU0lFVmVyc2lvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNNU0lFTmV3KCkpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldE1TSUVOZXdWZXJzaW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc0Nocm9tZSgpKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRDaHJvbWVWZXJzaW9uKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc0ZpcmVmb3goKSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IEJyb3dzZXIuZ2V0RmlyZWZveFZlcnNpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzU2FmYXJpKCkpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldFNhZmFyaVZlcnNpb24oKTtcbiAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzT3RoZXIoKSkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IEJyb3dzZXIuZ2V0T3RoZXJWZXJzaW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZlcnNpb247XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUcmltIGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEBwYXJhbSB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLnRyaW1WZXJzaW9uID0gZnVuY3Rpb24gdHJpbVZlcnNpb24odmVyc2lvbikge1xuICAgICAgICBpZiAodHlwZW9mIHZlcnNpb24gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHZhciBjaGFycyA9IFtcIjtcIiwgXCIgXCIsIFwiKVwiXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGNoYXJzLCBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yKSwgX2kgPSAwLCBfaXRlcmF0b3IgPSBfaXNBcnJheSA/IF9pdGVyYXRvciA6IF9pdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgICAgIHZhciBfcmVmO1xuXG4gICAgICAgICAgICAgICAgaWYgKF9pc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfaSA+PSBfaXRlcmF0b3IubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgX3JlZiA9IF9pdGVyYXRvcltfaSsrXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBfaSA9IF9pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBjaGFyID0gX3JlZjtcblxuICAgICAgICAgICAgICAgIHZhciBpeCA9IHZlcnNpb24uaW5kZXhPZihjaGFyKTtcbiAgICAgICAgICAgICAgICBpZiAoaXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZlcnNpb247XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgbW9iaWxlXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc01vYmlsZSA9IGZ1bmN0aW9uIGlzTW9iaWxlKCkge1xuICAgICAgICByZXR1cm4gKC9Nb2JpbGV8bWluaXxGZW5uZWN8QW5kcm9pZHxpUChhZHxvZHxob25lKS8udGVzdChuYXZpZ2F0b3IuYXBwVmVyc2lvbilcbiAgICAgICAgKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIG9wZXJhIGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzT3BlcmEgPSBmdW5jdGlvbiBpc09wZXJhKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT3BlcmFcIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IG9wZXJhIGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRPcGVyYVZlcnNpb24gPSBmdW5jdGlvbiBnZXRPcGVyYVZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPcGVyYVwiKTtcbiAgICAgICAgdmFyIHZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcbiAgICAgICAgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiVmVyc2lvblwiKTtcbiAgICAgICAgaWYgKHZlck9mZnNldCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIG9wZXJhIG5ldyBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc09wZXJhTmV3ID0gZnVuY3Rpb24gaXNPcGVyYU5ldygpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk9QUlwiKSAhPT0gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgb3BlcmEgbmV3IGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRPcGVyYU5ld1ZlcnNpb24gPSBmdW5jdGlvbiBnZXRPcGVyYU5ld1ZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPUFJcIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNCk7XG4gICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgbXNpZSBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc01TSUUgPSBmdW5jdGlvbiBpc01TSUUoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpICE9PSAtMTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBtc2llIGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRNU0lFVmVyc2lvbiA9IGZ1bmN0aW9uIGdldE1TSUVWZXJzaW9uKCkge1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKTtcbiAgICAgICAgdmFyIHZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA1KTtcbiAgICAgICAgcmV0dXJuIEJyb3dzZXIudHJpbVZlcnNpb24odmVyc2lvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBtc2llIG5ldyBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc01TSUVOZXcgPSBmdW5jdGlvbiBpc01TSUVOZXcoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJUcmlkZW50L1wiKSAhPT0gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgbXNpZSBuZXcgYnJvd3NlciB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmdldE1TSUVOZXdWZXJzaW9uID0gZnVuY3Rpb24gZ2V0TVNJRU5ld1ZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwicnY6XCIpICsgMyk7XG4gICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgY2hyb21lIGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzQ2hyb21lID0gZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIikgIT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGNocm9tZSBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0Q2hyb21lVmVyc2lvbiA9IGZ1bmN0aW9uIGdldENocm9tZVZlcnNpb24oKSB7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJDaHJvbWVcIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNyk7XG4gICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgc2FmYXJpIGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzU2FmYXJpID0gZnVuY3Rpb24gaXNTYWZhcmkoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJTYWZhcmlcIikgIT09IC0xICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKSA9PT0gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2FmYXJpIGJyb3dzZXIgdmVyc2lvblxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRTYWZhcmlWZXJzaW9uID0gZnVuY3Rpb24gZ2V0U2FmYXJpVmVyc2lvbigpIHtcbiAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlNhZmFyaVwiKTtcbiAgICAgICAgdmFyIHZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KTtcbiAgICAgICAgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiVmVyc2lvblwiKTtcbiAgICAgICAgaWYgKHZlck9mZnNldCAhPT0gLTEpIHtcbiAgICAgICAgICAgIHZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIGZpcmVmb3ggYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNGaXJlZm94ID0gZnVuY3Rpb24gaXNGaXJlZm94KCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiRmlyZWZveFwiKSAhPT0gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZmlyZWZveCBicm93c2VyIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuZ2V0RmlyZWZveFZlcnNpb24gPSBmdW5jdGlvbiBnZXRGaXJlZm94VmVyc2lvbigpIHtcbiAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIik7XG4gICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgOCk7XG4gICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgb3RoZXIgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNPdGhlciA9IGZ1bmN0aW9uIGlzT3RoZXIoKSB7XG4gICAgICAgIHZhciBuYW1lT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5sYXN0SW5kZXhPZihcIiBcIikgKyAxO1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5sYXN0SW5kZXhPZihcIi9cIik7XG4gICAgICAgIHJldHVybiBuYW1lT2Zmc2V0IDwgdmVyT2Zmc2V0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IG90aGVyIGJyb3dzZXIgbmFtZVxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5nZXRPdGhlck5hbWUgPSBmdW5jdGlvbiBnZXRPdGhlck5hbWUoKSB7XG4gICAgICAgIHZhciBuYW1lT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5sYXN0SW5kZXhPZihcIiBcIikgKyAxO1xuICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5sYXN0SW5kZXhPZihcIi9cIik7XG4gICAgICAgIHZhciBicm93c2VyID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcobmFtZU9mZnNldCwgdmVyT2Zmc2V0KTtcbiAgICAgICAgaWYgKGJyb3dzZXIudG9Mb3dlckNhc2UoKSA9PT0gYnJvd3Nlci50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgICBicm93c2VyID0gbmF2aWdhdG9yLmFwcE5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJyb3dzZXI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgb3RoZXIgYnJvd3NlciB2ZXJzaW9uXG4gICAgICogQHJldHVybiB7c3RyaW5nfVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmdldE90aGVyVmVyc2lvbiA9IGZ1bmN0aW9uIGdldE90aGVyVmVyc2lvbigpIHtcbiAgICAgICAgdmFyIG5hbWVPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50Lmxhc3RJbmRleE9mKFwiIFwiKSArIDE7XG4gICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50Lmxhc3RJbmRleE9mKFwiL1wiKTtcbiAgICAgICAgdmFyIHZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxKTtcbiAgICAgICAgcmV0dXJuIEJyb3dzZXIudHJpbVZlcnNpb24odmVyc2lvbik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBicm93c2VyIHN1cHBvcnRcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzU3VwcG9ydGVkID0gZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKSB7XG4gICAgICAgIHJldHVybiAhQnJvd3Nlci5pc01TSUUoKSB8fCBwYXJzZUludChCcm93c2VyLmdldE1TSUVWZXJzaW9uKCksIDEwKSA+IDg7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBXZWJLaXQgYnJvd3NlclxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG5cblxuICAgIEJyb3dzZXIuaXNXZWJLaXQgPSBmdW5jdGlvbiBpc1dlYktpdCgpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkFwcGxlV2ViS2l0L1wiKSAhPT0gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBHZWNrbyBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc0dlY2tvID0gZnVuY3Rpb24gaXNHZWNrbygpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkdlY2tvXCIpID4gLTEgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiS0hUTUxcIikgPT09IC0xO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgaXQgaXMgQW5kcm9pZCBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc0FuZHJvaWQgPSBmdW5jdGlvbiBpc0FuZHJvaWQoKSB7XG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJBbmRyb2lkXCIpID4gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBMaW51eCBicm93c2VyXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKi9cblxuXG4gICAgQnJvd3Nlci5pc0xpbnV4ID0gZnVuY3Rpb24gaXNMaW51eCgpIHtcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkxpbnV4XCIpID4gLTE7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBpdCBpcyBpUGFkIGJyb3dzZXJcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBCcm93c2VyLmlzVGFibGV0UEMgPSBmdW5jdGlvbiBpc1RhYmxldFBDKCkge1xuICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiaVBhZFwiKSA+IC0xO1xuICAgIH07XG5cbiAgICByZXR1cm4gQnJvd3Nlcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQnJvd3NlcjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpYi9VdGlsc0Jyb3dzZXIudHNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBVUkwgPSByZXF1aXJlKFwidXJsXCIpO1xuLyoqXG4gKiBDbGFzcyBmb3Igd29ya2luZyB3aXRoIGNvb2tpZVxuICovXG5cbnZhciBDb29raWUgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENvb2tpZSgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29va2llKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHJldHVybnMgdGhlIGZsYWcgd2hldGhlciBzdXBwb3J0ZWQgdGhpcyBzdG9yYWdlIHR5cGUgb3Igbm90XG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgQ29va2llLmlzU3VwcG9ydGVkID0gZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihkb2N1bWVudCkpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBkb2N1bWVudC5jb29raWUgPT09IFwic3RyaW5nXCI7XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHNldHMgdGhlIHZhbHVlIGFuZCByZXR1cm5zIHRydWUgaWYgaXQgaGFzIGJlZW4gc2V0XG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICogQHBhcmFtIHZhbHVlIHtzdHJpbmd9XG4gICAqIEBwYXJhbSBleHBpcmVzIHtudW1iZXJ9XG4gICAqIEBwYXJhbSBwYXRoIHtzdHJpbmd9XG4gICAqIEBwYXJhbSBkb21haW4ge3N0cmluZ31cbiAgICogQHBhcmFtIHNlY3VyZSB7Ym9vbGVhbn1cbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBDb29raWUuc2V0SXRlbSA9IGZ1bmN0aW9uIHNldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXksIHZhbHVlKSB7XG4gICAgdmFyIGV4cGlyZXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IDMwO1xuICAgIHZhciBwYXRoID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiBcIi9cIjtcbiAgICB2YXIgZG9tYWluID0gYXJndW1lbnRzLmxlbmd0aCA+IDUgJiYgYXJndW1lbnRzWzVdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNV0gOiBsb2NhdGlvbi5ob3N0bmFtZTtcbiAgICB2YXIgc2VjdXJlID0gYXJndW1lbnRzLmxlbmd0aCA+IDYgJiYgYXJndW1lbnRzWzZdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNl0gOiBsb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIjtcblxuICAgIHRyeSB7XG4gICAgICAvKipcbiAgICAgICAqIFZhbGlkYXRlIGlucHV0IGRhdGFcbiAgICAgICAqL1xuICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiICYmIHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIgJiYgQ29va2llLnJlZ1ZhbGlkS2V5LnRlc3Qoa2V5KSAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGV4cGlyZXMgPT09IFwibnVtYmVyXCIgJiYgZXhwaXJlcyA8IDM2NSAmJiB0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgZG9tYWluID09PSBcInN0cmluZ1wiICYmIGRvbWFpbi5pbmRleE9mKGxvY2F0aW9uLmhvc3RuYW1lKSAhPT0gLTEgJiYgdHlwZW9mIHNlY3VyZSA9PT0gXCJib29sZWFuXCIgJiYgc2VjdXJlID09PSAobG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgdSA9IFVSTC5wYXJzZShcImh0dHA6Ly9cIiArIGRvbWFpbiArIHBhdGgpO1xuICAgICAgICBpZiAodS5ob3N0bmFtZSA9PT0gZG9tYWluIHx8IHUucGF0aCA9PT0gcGF0aCkge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgICAgICovXG4gICAgICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgQ29va2llLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogU2F2ZSBjb29raWVzIGZvciAzMCBkYXlzXG4gICAgICAgICAgICAgKiBAdHlwZSB7RGF0ZX1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgZXhwaXJlcyAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuICAgICAgICAgICAgdmFyIGV4cCA9IGRhdGUudG9VVENTdHJpbmcoKTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRW5jb2RlIHZhbHVlIGZvciBzdG9yZVxuICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBXcml0aW5nIHZhbHVlIHRvIHRoZSBkb2N1bWVudCBjb29raWUgc3RvcmFnZVxuICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0ga2V5ICsgXCI9XCIgKyB2YWx1ZSArIChleHAgPyBcIjsgZXhwaXJlcz1cIiArIGV4cCA6IFwiXCIpICsgKHBhdGggPyBcIjsgcGF0aD1cIiArIHBhdGggOiBcIlwiKSArIChkb21haW4gPyBcIjsgZG9tYWluPVwiICsgZG9tYWluIDogXCJcIikgKyAoc2VjdXJlID8gXCI7IHNlY3VyZVwiIDogXCJcIik7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gQ29va2llLmdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpID09PSB2YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIGlucHV0IGRhdGEgaXMgbm90IHZhbGlkXG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCByZWFkcyB0aGUgdmFsdWUgYW5kIHJldHVybnMgaXQgb3IgcmV0dXJucyBmYWxzZSBpZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3RcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuICAgKiBAcmV0dXJucyB7c3RyaW5nfGJvb2xlYW59XG4gICAqL1xuXG5cbiAgQ29va2llLmdldEl0ZW0gPSBmdW5jdGlvbiBnZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuICAgICAgICovXG4gICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiAmJiBDb29raWUucmVnVmFsaWRLZXkudGVzdChrZXkpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgQ29va2llLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBHZXQgdGhlIGFycmF5IGZyb20gZG9jdW1lbnQgY29va2llIHNwbGl0IGJ5IDtcbiAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICAgICAgICovXG4gICAgICAgICAgdmFyIGFyckNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSXRlcmF0ZSB0aHJvdWdoIHRoZSBjb29raWVzXG4gICAgICAgICAgICovXG4gICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gYXJyQ29va2llLCBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yKSwgX2kgPSAwLCBfaXRlcmF0b3IgPSBfaXNBcnJheSA/IF9pdGVyYXRvciA6IF9pdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgdmFyIF9yZWY7XG5cbiAgICAgICAgICAgIGlmIChfaXNBcnJheSkge1xuICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfaSA9IF9pdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaSA9IF9yZWY7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVHJpbSBhbmQgc3BsaXQgZWFjaCBjb29raWUgYnkgPSBmb3Iga2V5IHZhbHVlIHBhcmVcbiAgICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFyIHYgPSBpLnRyaW0oKS5zcGxpdChcIj1cIiwgMik7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElmIGl0IGlzIGNvcnJlY3QgY29va2llIGtleSByZXR1cm4gdGhlIHZhbHVlXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh2WzBdID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAqIElmIHRoZSB2YWx1ZSB3YXMgZm91bmQgcmV0dXJuIHRoZSB2YWx1ZVxuICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh2WzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgdGhlIHZhbHVlIHdhcyBub3QgZm91bmQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCByZW1vdmVzIHRoZSB2YWx1ZSBhbmQgcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0XG4gICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG4gICAqIEBwYXJhbSBrZXkge3N0cmluZ31cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgQ29va2llLnJlbW92ZUl0ZW0gPSBmdW5jdGlvbiByZW1vdmVJdGVtKGNoZWNrU3VwcG9ydCwga2V5KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuICAgICAgICovXG4gICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiAmJiBDb29raWUucmVnVmFsaWRLZXkudGVzdChrZXkpKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgQ29va2llLmlzU3VwcG9ydGVkKCkpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiBTZXQgZW1wdHkgb3ZlcmR1ZSB2YWx1ZSBieSBrZXlcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBDb29raWUuc2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSwgXCJcIiwgLTEpO1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIGFsbCBvayByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHJldHVybiBDb29raWUuZ2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSkgPT09IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvKipcbiAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuICAgICAgICovXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogVGhlIG1ldGhvZCByZXR1cm5zIHRoZSBhcnJheSBvZiBzdHJpbmcgb2YgYXZhaWxhYmxlIGtleXNcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgKi9cblxuXG4gIENvb2tpZS5nZXRLZXlzID0gZnVuY3Rpb24gZ2V0S2V5cyhjaGVja1N1cHBvcnQpIHtcbiAgICB0cnkge1xuICAgICAgLyoqXG4gICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG4gICAgICAgKi9cbiAgICAgIGlmICh0eXBlb2YgY2hlY2tTdXBwb3J0ID09PSBcImJvb2xlYW5cIikge1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcbiAgICAgICAgICovXG4gICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IENvb2tpZS5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogVGhlIGFycmF5IG9mIGF2YWlsYWJsZSBrZXlzXG4gICAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHZhciBhcnJLZXlzID0gW107XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogR2V0IHRoZSBhcnJheSBmcm9tIGRvY3VtZW50IGNvb2tpZSBzcGxpdCBieSA7XG4gICAgICAgICAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgICAgICAgICAqL1xuICAgICAgICAgIHZhciBhcnJDb29raWUgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7XCIpO1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIEl0ZXJhdGUgdGhyb3VnaCB0aGUgY29va2llc1xuICAgICAgICAgICAqL1xuICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjIgPSBhcnJDb29raWUsIF9pc0FycmF5MiA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yMiksIF9pMiA9IDAsIF9pdGVyYXRvcjIgPSBfaXNBcnJheTIgPyBfaXRlcmF0b3IyIDogX2l0ZXJhdG9yMltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgdmFyIF9yZWYyO1xuXG4gICAgICAgICAgICBpZiAoX2lzQXJyYXkyKSB7XG4gICAgICAgICAgICAgIGlmIChfaTIgPj0gX2l0ZXJhdG9yMi5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICBfcmVmMiA9IF9pdGVyYXRvcjJbX2kyKytdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgX2kyID0gX2l0ZXJhdG9yMi5uZXh0KCk7XG4gICAgICAgICAgICAgIGlmIChfaTIuZG9uZSkgYnJlYWs7XG4gICAgICAgICAgICAgIF9yZWYyID0gX2kyLnZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaSA9IF9yZWYyO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFRyaW0gYW5kIHNwbGl0IGVhY2ggY29va2llIGJ5ID0gZm9yIGtleSB2YWx1ZSBwYXJlXG4gICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nW119XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciB2ID0gaS50cmltKCkuc3BsaXQoXCI9XCIsIDIpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBZGQga2V5IHRvIHRoZSBsaXN0XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmICh2WzBdKSB7XG4gICAgICAgICAgICAgIGFycktleXMucHVzaCh2WzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFycktleXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgY29va2llIGRvZXMgbm90IHN1cHBvcnRlZCByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgKi9cbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIGNsZWFucyB0aGUgc3RvcmFnZSBhbmQgcmV0dXJuIHRydWUgaWYgaXQgaXMgZW1wdHlcbiAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgQ29va2llLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoY2hlY2tTdXBwb3J0KSB7XG4gICAgdHJ5IHtcbiAgICAgIC8qKlxuICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuICAgICAgICovXG4gICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHRoYXQgc3RvcmUgaXMgc3VwcG9ydGVkXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCBDb29raWUuaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgICAgIHZhciBhcnJLZXlzID0gQ29va2llLmdldEtleXMoY2hlY2tTdXBwb3J0KTtcbiAgICAgICAgICBpZiAoYXJyS2V5cykge1xuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IGFycktleXMsIF9pc0FycmF5MyA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yMyksIF9pMyA9IDAsIF9pdGVyYXRvcjMgPSBfaXNBcnJheTMgPyBfaXRlcmF0b3IzIDogX2l0ZXJhdG9yM1tTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuICAgICAgICAgICAgICB2YXIgX3JlZjM7XG5cbiAgICAgICAgICAgICAgaWYgKF9pc0FycmF5Mykge1xuICAgICAgICAgICAgICAgIGlmIChfaTMgPj0gX2l0ZXJhdG9yMy5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgIF9yZWYzID0gX2l0ZXJhdG9yM1tfaTMrK107XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX2kzID0gX2l0ZXJhdG9yMy5uZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKF9pMy5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICBfcmVmMyA9IF9pMy52YWx1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHZhciBpID0gX3JlZjM7XG5cbiAgICAgICAgICAgICAgQ29va2llLnJlbW92ZUl0ZW0oY2hlY2tTdXBwb3J0LCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLyoqXG4gICAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuIENvb2tpZS5nZXRLZXlzKGNoZWNrU3VwcG9ydCkubGVuZ3RoID09PSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICovXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG4gICAgICAgKi9cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIENvb2tpZTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ29va2llO1xuXG5Db29raWUucmVnVmFsaWRLZXkgPSBuZXcgUmVnRXhwKFwiKFthLXpBLVowLTlfLV17MSx9KVwiLCBcImlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvVXRpbHNDb29raWUudHNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG52YXIgcHVueWNvZGUgPSByZXF1aXJlKCdwdW55Y29kZScpO1xuXG5leHBvcnRzLnBhcnNlID0gdXJsUGFyc2U7XG5leHBvcnRzLnJlc29sdmUgPSB1cmxSZXNvbHZlO1xuZXhwb3J0cy5yZXNvbHZlT2JqZWN0ID0gdXJsUmVzb2x2ZU9iamVjdDtcbmV4cG9ydHMuZm9ybWF0ID0gdXJsRm9ybWF0O1xuXG5leHBvcnRzLlVybCA9IFVybDtcblxuZnVuY3Rpb24gVXJsKCkge1xuICB0aGlzLnByb3RvY29sID0gbnVsbDtcbiAgdGhpcy5zbGFzaGVzID0gbnVsbDtcbiAgdGhpcy5hdXRoID0gbnVsbDtcbiAgdGhpcy5ob3N0ID0gbnVsbDtcbiAgdGhpcy5wb3J0ID0gbnVsbDtcbiAgdGhpcy5ob3N0bmFtZSA9IG51bGw7XG4gIHRoaXMuaGFzaCA9IG51bGw7XG4gIHRoaXMuc2VhcmNoID0gbnVsbDtcbiAgdGhpcy5xdWVyeSA9IG51bGw7XG4gIHRoaXMucGF0aG5hbWUgPSBudWxsO1xuICB0aGlzLnBhdGggPSBudWxsO1xuICB0aGlzLmhyZWYgPSBudWxsO1xufVxuXG4vLyBSZWZlcmVuY2U6IFJGQyAzOTg2LCBSRkMgMTgwOCwgUkZDIDIzOTZcblxuLy8gZGVmaW5lIHRoZXNlIGhlcmUgc28gYXQgbGVhc3QgdGhleSBvbmx5IGhhdmUgdG8gYmVcbi8vIGNvbXBpbGVkIG9uY2Ugb24gdGhlIGZpcnN0IG1vZHVsZSBsb2FkLlxudmFyIHByb3RvY29sUGF0dGVybiA9IC9eKFthLXowLTkuKy1dKzopL2ksXG4gICAgcG9ydFBhdHRlcm4gPSAvOlswLTldKiQvLFxuXG4gICAgLy8gUkZDIDIzOTY6IGNoYXJhY3RlcnMgcmVzZXJ2ZWQgZm9yIGRlbGltaXRpbmcgVVJMcy5cbiAgICAvLyBXZSBhY3R1YWxseSBqdXN0IGF1dG8tZXNjYXBlIHRoZXNlLlxuICAgIGRlbGltcyA9IFsnPCcsICc+JywgJ1wiJywgJ2AnLCAnICcsICdcXHInLCAnXFxuJywgJ1xcdCddLFxuXG4gICAgLy8gUkZDIDIzOTY6IGNoYXJhY3RlcnMgbm90IGFsbG93ZWQgZm9yIHZhcmlvdXMgcmVhc29ucy5cbiAgICB1bndpc2UgPSBbJ3snLCAnfScsICd8JywgJ1xcXFwnLCAnXicsICdgJ10uY29uY2F0KGRlbGltcyksXG5cbiAgICAvLyBBbGxvd2VkIGJ5IFJGQ3MsIGJ1dCBjYXVzZSBvZiBYU1MgYXR0YWNrcy4gIEFsd2F5cyBlc2NhcGUgdGhlc2UuXG4gICAgYXV0b0VzY2FwZSA9IFsnXFwnJ10uY29uY2F0KHVud2lzZSksXG4gICAgLy8gQ2hhcmFjdGVycyB0aGF0IGFyZSBuZXZlciBldmVyIGFsbG93ZWQgaW4gYSBob3N0bmFtZS5cbiAgICAvLyBOb3RlIHRoYXQgYW55IGludmFsaWQgY2hhcnMgYXJlIGFsc28gaGFuZGxlZCwgYnV0IHRoZXNlXG4gICAgLy8gYXJlIHRoZSBvbmVzIHRoYXQgYXJlICpleHBlY3RlZCogdG8gYmUgc2Vlbiwgc28gd2UgZmFzdC1wYXRoXG4gICAgLy8gdGhlbS5cbiAgICBub25Ib3N0Q2hhcnMgPSBbJyUnLCAnLycsICc/JywgJzsnLCAnIyddLmNvbmNhdChhdXRvRXNjYXBlKSxcbiAgICBob3N0RW5kaW5nQ2hhcnMgPSBbJy8nLCAnPycsICcjJ10sXG4gICAgaG9zdG5hbWVNYXhMZW4gPSAyNTUsXG4gICAgaG9zdG5hbWVQYXJ0UGF0dGVybiA9IC9eW2EtejAtOUEtWl8tXXswLDYzfSQvLFxuICAgIGhvc3RuYW1lUGFydFN0YXJ0ID0gL14oW2EtejAtOUEtWl8tXXswLDYzfSkoLiopJC8sXG4gICAgLy8gcHJvdG9jb2xzIHRoYXQgY2FuIGFsbG93IFwidW5zYWZlXCIgYW5kIFwidW53aXNlXCIgY2hhcnMuXG4gICAgdW5zYWZlUHJvdG9jb2wgPSB7XG4gICAgICAnamF2YXNjcmlwdCc6IHRydWUsXG4gICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG4gICAgfSxcbiAgICAvLyBwcm90b2NvbHMgdGhhdCBuZXZlciBoYXZlIGEgaG9zdG5hbWUuXG4gICAgaG9zdGxlc3NQcm90b2NvbCA9IHtcbiAgICAgICdqYXZhc2NyaXB0JzogdHJ1ZSxcbiAgICAgICdqYXZhc2NyaXB0Oic6IHRydWVcbiAgICB9LFxuICAgIC8vIHByb3RvY29scyB0aGF0IGFsd2F5cyBjb250YWluIGEgLy8gYml0LlxuICAgIHNsYXNoZWRQcm90b2NvbCA9IHtcbiAgICAgICdodHRwJzogdHJ1ZSxcbiAgICAgICdodHRwcyc6IHRydWUsXG4gICAgICAnZnRwJzogdHJ1ZSxcbiAgICAgICdnb3BoZXInOiB0cnVlLFxuICAgICAgJ2ZpbGUnOiB0cnVlLFxuICAgICAgJ2h0dHA6JzogdHJ1ZSxcbiAgICAgICdodHRwczonOiB0cnVlLFxuICAgICAgJ2Z0cDonOiB0cnVlLFxuICAgICAgJ2dvcGhlcjonOiB0cnVlLFxuICAgICAgJ2ZpbGU6JzogdHJ1ZVxuICAgIH0sXG4gICAgcXVlcnlzdHJpbmcgPSByZXF1aXJlKCdxdWVyeXN0cmluZycpO1xuXG5mdW5jdGlvbiB1cmxQYXJzZSh1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KSB7XG4gIGlmICh1cmwgJiYgaXNPYmplY3QodXJsKSAmJiB1cmwgaW5zdGFuY2VvZiBVcmwpIHJldHVybiB1cmw7XG5cbiAgdmFyIHUgPSBuZXcgVXJsO1xuICB1LnBhcnNlKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpO1xuICByZXR1cm4gdTtcbn1cblxuVXJsLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKHVybCwgcGFyc2VRdWVyeVN0cmluZywgc2xhc2hlc0Rlbm90ZUhvc3QpIHtcbiAgaWYgKCFpc1N0cmluZyh1cmwpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlBhcmFtZXRlciAndXJsJyBtdXN0IGJlIGEgc3RyaW5nLCBub3QgXCIgKyB0eXBlb2YgdXJsKTtcbiAgfVxuXG4gIHZhciByZXN0ID0gdXJsO1xuXG4gIC8vIHRyaW0gYmVmb3JlIHByb2NlZWRpbmcuXG4gIC8vIFRoaXMgaXMgdG8gc3VwcG9ydCBwYXJzZSBzdHVmZiBsaWtlIFwiICBodHRwOi8vZm9vLmNvbSAgXFxuXCJcbiAgcmVzdCA9IHJlc3QudHJpbSgpO1xuXG4gIHZhciBwcm90byA9IHByb3RvY29sUGF0dGVybi5leGVjKHJlc3QpO1xuICBpZiAocHJvdG8pIHtcbiAgICBwcm90byA9IHByb3RvWzBdO1xuICAgIHZhciBsb3dlclByb3RvID0gcHJvdG8udG9Mb3dlckNhc2UoKTtcbiAgICB0aGlzLnByb3RvY29sID0gbG93ZXJQcm90bztcbiAgICByZXN0ID0gcmVzdC5zdWJzdHIocHJvdG8ubGVuZ3RoKTtcbiAgfVxuXG4gIC8vIGZpZ3VyZSBvdXQgaWYgaXQncyBnb3QgYSBob3N0XG4gIC8vIHVzZXJAc2VydmVyIGlzICphbHdheXMqIGludGVycHJldGVkIGFzIGEgaG9zdG5hbWUsIGFuZCB1cmxcbiAgLy8gcmVzb2x1dGlvbiB3aWxsIHRyZWF0IC8vZm9vL2JhciBhcyBob3N0PWZvbyxwYXRoPWJhciBiZWNhdXNlIHRoYXQnc1xuICAvLyBob3cgdGhlIGJyb3dzZXIgcmVzb2x2ZXMgcmVsYXRpdmUgVVJMcy5cbiAgaWYgKHNsYXNoZXNEZW5vdGVIb3N0IHx8IHByb3RvIHx8IHJlc3QubWF0Y2goL15cXC9cXC9bXkBcXC9dK0BbXkBcXC9dKy8pKSB7XG4gICAgdmFyIHNsYXNoZXMgPSByZXN0LnN1YnN0cigwLCAyKSA9PT0gJy8vJztcbiAgICBpZiAoc2xhc2hlcyAmJiAhKHByb3RvICYmIGhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dKSkge1xuICAgICAgcmVzdCA9IHJlc3Quc3Vic3RyKDIpO1xuICAgICAgdGhpcy5zbGFzaGVzID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dICYmXG4gICAgICAoc2xhc2hlcyB8fCAocHJvdG8gJiYgIXNsYXNoZWRQcm90b2NvbFtwcm90b10pKSkge1xuXG4gICAgLy8gdGhlcmUncyBhIGhvc3RuYW1lLlxuICAgIC8vIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiAvLCA/LCA7LCBvciAjIGVuZHMgdGhlIGhvc3QuXG4gICAgLy9cbiAgICAvLyBJZiB0aGVyZSBpcyBhbiBAIGluIHRoZSBob3N0bmFtZSwgdGhlbiBub24taG9zdCBjaGFycyAqYXJlKiBhbGxvd2VkXG4gICAgLy8gdG8gdGhlIGxlZnQgb2YgdGhlIGxhc3QgQCBzaWduLCB1bmxlc3Mgc29tZSBob3N0LWVuZGluZyBjaGFyYWN0ZXJcbiAgICAvLyBjb21lcyAqYmVmb3JlKiB0aGUgQC1zaWduLlxuICAgIC8vIFVSTHMgYXJlIG9ibm94aW91cy5cbiAgICAvL1xuICAgIC8vIGV4OlxuICAgIC8vIGh0dHA6Ly9hQGJAYy8gPT4gdXNlcjphQGIgaG9zdDpjXG4gICAgLy8gaHR0cDovL2FAYj9AYyA9PiB1c2VyOmEgaG9zdDpjIHBhdGg6Lz9AY1xuXG4gICAgLy8gdjAuMTIgVE9ETyhpc2FhY3MpOiBUaGlzIGlzIG5vdCBxdWl0ZSBob3cgQ2hyb21lIGRvZXMgdGhpbmdzLlxuICAgIC8vIFJldmlldyBvdXIgdGVzdCBjYXNlIGFnYWluc3QgYnJvd3NlcnMgbW9yZSBjb21wcmVoZW5zaXZlbHkuXG5cbiAgICAvLyBmaW5kIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiBhbnkgaG9zdEVuZGluZ0NoYXJzXG4gICAgdmFyIGhvc3RFbmQgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhvc3RFbmRpbmdDaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihob3N0RW5kaW5nQ2hhcnNbaV0pO1xuICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuICAgICAgICBob3N0RW5kID0gaGVjO1xuICAgIH1cblxuICAgIC8vIGF0IHRoaXMgcG9pbnQsIGVpdGhlciB3ZSBoYXZlIGFuIGV4cGxpY2l0IHBvaW50IHdoZXJlIHRoZVxuICAgIC8vIGF1dGggcG9ydGlvbiBjYW5ub3QgZ28gcGFzdCwgb3IgdGhlIGxhc3QgQCBjaGFyIGlzIHRoZSBkZWNpZGVyLlxuICAgIHZhciBhdXRoLCBhdFNpZ247XG4gICAgaWYgKGhvc3RFbmQgPT09IC0xKSB7XG4gICAgICAvLyBhdFNpZ24gY2FuIGJlIGFueXdoZXJlLlxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhdFNpZ24gbXVzdCBiZSBpbiBhdXRoIHBvcnRpb24uXG4gICAgICAvLyBodHRwOi8vYUBiL2NAZCA9PiBob3N0OmIgYXV0aDphIHBhdGg6L2NAZFxuICAgICAgYXRTaWduID0gcmVzdC5sYXN0SW5kZXhPZignQCcsIGhvc3RFbmQpO1xuICAgIH1cblxuICAgIC8vIE5vdyB3ZSBoYXZlIGEgcG9ydGlvbiB3aGljaCBpcyBkZWZpbml0ZWx5IHRoZSBhdXRoLlxuICAgIC8vIFB1bGwgdGhhdCBvZmYuXG4gICAgaWYgKGF0U2lnbiAhPT0gLTEpIHtcbiAgICAgIGF1dGggPSByZXN0LnNsaWNlKDAsIGF0U2lnbik7XG4gICAgICByZXN0ID0gcmVzdC5zbGljZShhdFNpZ24gKyAxKTtcbiAgICAgIHRoaXMuYXV0aCA9IGRlY29kZVVSSUNvbXBvbmVudChhdXRoKTtcbiAgICB9XG5cbiAgICAvLyB0aGUgaG9zdCBpcyB0aGUgcmVtYWluaW5nIHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBub24taG9zdCBjaGFyXG4gICAgaG9zdEVuZCA9IC0xO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9uSG9zdENoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaGVjID0gcmVzdC5pbmRleE9mKG5vbkhvc3RDaGFyc1tpXSk7XG4gICAgICBpZiAoaGVjICE9PSAtMSAmJiAoaG9zdEVuZCA9PT0gLTEgfHwgaGVjIDwgaG9zdEVuZCkpXG4gICAgICAgIGhvc3RFbmQgPSBoZWM7XG4gICAgfVxuICAgIC8vIGlmIHdlIHN0aWxsIGhhdmUgbm90IGhpdCBpdCwgdGhlbiB0aGUgZW50aXJlIHRoaW5nIGlzIGEgaG9zdC5cbiAgICBpZiAoaG9zdEVuZCA9PT0gLTEpXG4gICAgICBob3N0RW5kID0gcmVzdC5sZW5ndGg7XG5cbiAgICB0aGlzLmhvc3QgPSByZXN0LnNsaWNlKDAsIGhvc3RFbmQpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKGhvc3RFbmQpO1xuXG4gICAgLy8gcHVsbCBvdXQgcG9ydC5cbiAgICB0aGlzLnBhcnNlSG9zdCgpO1xuXG4gICAgLy8gd2UndmUgaW5kaWNhdGVkIHRoYXQgdGhlcmUgaXMgYSBob3N0bmFtZSxcbiAgICAvLyBzbyBldmVuIGlmIGl0J3MgZW1wdHksIGl0IGhhcyB0byBiZSBwcmVzZW50LlxuICAgIHRoaXMuaG9zdG5hbWUgPSB0aGlzLmhvc3RuYW1lIHx8ICcnO1xuXG4gICAgLy8gaWYgaG9zdG5hbWUgYmVnaW5zIHdpdGggWyBhbmQgZW5kcyB3aXRoIF1cbiAgICAvLyBhc3N1bWUgdGhhdCBpdCdzIGFuIElQdjYgYWRkcmVzcy5cbiAgICB2YXIgaXB2Nkhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZVswXSA9PT0gJ1snICYmXG4gICAgICAgIHRoaXMuaG9zdG5hbWVbdGhpcy5ob3N0bmFtZS5sZW5ndGggLSAxXSA9PT0gJ10nO1xuXG4gICAgLy8gdmFsaWRhdGUgYSBsaXR0bGUuXG4gICAgaWYgKCFpcHY2SG9zdG5hbWUpIHtcbiAgICAgIHZhciBob3N0cGFydHMgPSB0aGlzLmhvc3RuYW1lLnNwbGl0KC9cXC4vKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaG9zdHBhcnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgcGFydCA9IGhvc3RwYXJ0c1tpXTtcbiAgICAgICAgaWYgKCFwYXJ0KSBjb250aW51ZTtcbiAgICAgICAgaWYgKCFwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG4gICAgICAgICAgdmFyIG5ld3BhcnQgPSAnJztcbiAgICAgICAgICBmb3IgKHZhciBqID0gMCwgayA9IHBhcnQubGVuZ3RoOyBqIDwgazsgaisrKSB7XG4gICAgICAgICAgICBpZiAocGFydC5jaGFyQ29kZUF0KGopID4gMTI3KSB7XG4gICAgICAgICAgICAgIC8vIHdlIHJlcGxhY2Ugbm9uLUFTQ0lJIGNoYXIgd2l0aCBhIHRlbXBvcmFyeSBwbGFjZWhvbGRlclxuICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRoaXMgdG8gbWFrZSBzdXJlIHNpemUgb2YgaG9zdG5hbWUgaXMgbm90XG4gICAgICAgICAgICAgIC8vIGJyb2tlbiBieSByZXBsYWNpbmcgbm9uLUFTQ0lJIGJ5IG5vdGhpbmdcbiAgICAgICAgICAgICAgbmV3cGFydCArPSAneCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdwYXJ0ICs9IHBhcnRbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHdlIHRlc3QgYWdhaW4gd2l0aCBBU0NJSSBjaGFyIG9ubHlcbiAgICAgICAgICBpZiAoIW5ld3BhcnQubWF0Y2goaG9zdG5hbWVQYXJ0UGF0dGVybikpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZFBhcnRzID0gaG9zdHBhcnRzLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgdmFyIG5vdEhvc3QgPSBob3N0cGFydHMuc2xpY2UoaSArIDEpO1xuICAgICAgICAgICAgdmFyIGJpdCA9IHBhcnQubWF0Y2goaG9zdG5hbWVQYXJ0U3RhcnQpO1xuICAgICAgICAgICAgaWYgKGJpdCkge1xuICAgICAgICAgICAgICB2YWxpZFBhcnRzLnB1c2goYml0WzFdKTtcbiAgICAgICAgICAgICAgbm90SG9zdC51bnNoaWZ0KGJpdFsyXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobm90SG9zdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmVzdCA9ICcvJyArIG5vdEhvc3Quam9pbignLicpICsgcmVzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaG9zdG5hbWUgPSB2YWxpZFBhcnRzLmpvaW4oJy4nKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmhvc3RuYW1lLmxlbmd0aCA+IGhvc3RuYW1lTWF4TGVuKSB7XG4gICAgICB0aGlzLmhvc3RuYW1lID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhvc3RuYW1lcyBhcmUgYWx3YXlzIGxvd2VyIGNhc2UuXG4gICAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxuICAgIGlmICghaXB2Nkhvc3RuYW1lKSB7XG4gICAgICAvLyBJRE5BIFN1cHBvcnQ6IFJldHVybnMgYSBwdW55IGNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIFwiZG9tYWluXCIuXG4gICAgICAvLyBJdCBvbmx5IGNvbnZlcnRzIHRoZSBwYXJ0IG9mIHRoZSBkb21haW4gbmFtZSB0aGF0XG4gICAgICAvLyBoYXMgbm9uIEFTQ0lJIGNoYXJhY3RlcnMuIEkuZS4gaXQgZG9zZW50IG1hdHRlciBpZlxuICAgICAgLy8geW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0IGFscmVhZHkgaXMgaW4gQVNDSUkuXG4gICAgICB2YXIgZG9tYWluQXJyYXkgPSB0aGlzLmhvc3RuYW1lLnNwbGl0KCcuJyk7XG4gICAgICB2YXIgbmV3T3V0ID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvbWFpbkFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBzID0gZG9tYWluQXJyYXlbaV07XG4gICAgICAgIG5ld091dC5wdXNoKHMubWF0Y2goL1teQS1aYS16MC05Xy1dLykgP1xuICAgICAgICAgICAgJ3huLS0nICsgcHVueWNvZGUuZW5jb2RlKHMpIDogcyk7XG4gICAgICB9XG4gICAgICB0aGlzLmhvc3RuYW1lID0gbmV3T3V0LmpvaW4oJy4nKTtcbiAgICB9XG5cbiAgICB2YXIgcCA9IHRoaXMucG9ydCA/ICc6JyArIHRoaXMucG9ydCA6ICcnO1xuICAgIHZhciBoID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcbiAgICB0aGlzLmhvc3QgPSBoICsgcDtcbiAgICB0aGlzLmhyZWYgKz0gdGhpcy5ob3N0O1xuXG4gICAgLy8gc3RyaXAgWyBhbmQgXSBmcm9tIHRoZSBob3N0bmFtZVxuICAgIC8vIHRoZSBob3N0IGZpZWxkIHN0aWxsIHJldGFpbnMgdGhlbSwgdGhvdWdoXG4gICAgaWYgKGlwdjZIb3N0bmFtZSkge1xuICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUuc3Vic3RyKDEsIHRoaXMuaG9zdG5hbWUubGVuZ3RoIC0gMik7XG4gICAgICBpZiAocmVzdFswXSAhPT0gJy8nKSB7XG4gICAgICAgIHJlc3QgPSAnLycgKyByZXN0O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIG5vdyByZXN0IGlzIHNldCB0byB0aGUgcG9zdC1ob3N0IHN0dWZmLlxuICAvLyBjaG9wIG9mZiBhbnkgZGVsaW0gY2hhcnMuXG4gIGlmICghdW5zYWZlUHJvdG9jb2xbbG93ZXJQcm90b10pIHtcblxuICAgIC8vIEZpcnN0LCBtYWtlIDEwMCUgc3VyZSB0aGF0IGFueSBcImF1dG9Fc2NhcGVcIiBjaGFycyBnZXRcbiAgICAvLyBlc2NhcGVkLCBldmVuIGlmIGVuY29kZVVSSUNvbXBvbmVudCBkb2Vzbid0IHRoaW5rIHRoZXlcbiAgICAvLyBuZWVkIHRvIGJlLlxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXV0b0VzY2FwZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBhZSA9IGF1dG9Fc2NhcGVbaV07XG4gICAgICB2YXIgZXNjID0gZW5jb2RlVVJJQ29tcG9uZW50KGFlKTtcbiAgICAgIGlmIChlc2MgPT09IGFlKSB7XG4gICAgICAgIGVzYyA9IGVzY2FwZShhZSk7XG4gICAgICB9XG4gICAgICByZXN0ID0gcmVzdC5zcGxpdChhZSkuam9pbihlc2MpO1xuICAgIH1cbiAgfVxuXG5cbiAgLy8gY2hvcCBvZmYgZnJvbSB0aGUgdGFpbCBmaXJzdC5cbiAgdmFyIGhhc2ggPSByZXN0LmluZGV4T2YoJyMnKTtcbiAgaWYgKGhhc2ggIT09IC0xKSB7XG4gICAgLy8gZ290IGEgZnJhZ21lbnQgc3RyaW5nLlxuICAgIHRoaXMuaGFzaCA9IHJlc3Quc3Vic3RyKGhhc2gpO1xuICAgIHJlc3QgPSByZXN0LnNsaWNlKDAsIGhhc2gpO1xuICB9XG4gIHZhciBxbSA9IHJlc3QuaW5kZXhPZignPycpO1xuICBpZiAocW0gIT09IC0xKSB7XG4gICAgdGhpcy5zZWFyY2ggPSByZXN0LnN1YnN0cihxbSk7XG4gICAgdGhpcy5xdWVyeSA9IHJlc3Quc3Vic3RyKHFtICsgMSk7XG4gICAgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAgIHRoaXMucXVlcnkgPSBxdWVyeXN0cmluZy5wYXJzZSh0aGlzLnF1ZXJ5KTtcbiAgICB9XG4gICAgcmVzdCA9IHJlc3Quc2xpY2UoMCwgcW0pO1xuICB9IGVsc2UgaWYgKHBhcnNlUXVlcnlTdHJpbmcpIHtcbiAgICAvLyBubyBxdWVyeSBzdHJpbmcsIGJ1dCBwYXJzZVF1ZXJ5U3RyaW5nIHN0aWxsIHJlcXVlc3RlZFxuICAgIHRoaXMuc2VhcmNoID0gJyc7XG4gICAgdGhpcy5xdWVyeSA9IHt9O1xuICB9XG4gIGlmIChyZXN0KSB0aGlzLnBhdGhuYW1lID0gcmVzdDtcbiAgaWYgKHNsYXNoZWRQcm90b2NvbFtsb3dlclByb3RvXSAmJlxuICAgICAgdGhpcy5ob3N0bmFtZSAmJiAhdGhpcy5wYXRobmFtZSkge1xuICAgIHRoaXMucGF0aG5hbWUgPSAnLyc7XG4gIH1cblxuICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gIGlmICh0aGlzLnBhdGhuYW1lIHx8IHRoaXMuc2VhcmNoKSB7XG4gICAgdmFyIHAgPSB0aGlzLnBhdGhuYW1lIHx8ICcnO1xuICAgIHZhciBzID0gdGhpcy5zZWFyY2ggfHwgJyc7XG4gICAgdGhpcy5wYXRoID0gcCArIHM7XG4gIH1cblxuICAvLyBmaW5hbGx5LCByZWNvbnN0cnVjdCB0aGUgaHJlZiBiYXNlZCBvbiB3aGF0IGhhcyBiZWVuIHZhbGlkYXRlZC5cbiAgdGhpcy5ocmVmID0gdGhpcy5mb3JtYXQoKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBmb3JtYXQgYSBwYXJzZWQgb2JqZWN0IGludG8gYSB1cmwgc3RyaW5nXG5mdW5jdGlvbiB1cmxGb3JtYXQob2JqKSB7XG4gIC8vIGVuc3VyZSBpdCdzIGFuIG9iamVjdCwgYW5kIG5vdCBhIHN0cmluZyB1cmwuXG4gIC8vIElmIGl0J3MgYW4gb2JqLCB0aGlzIGlzIGEgbm8tb3AuXG4gIC8vIHRoaXMgd2F5LCB5b3UgY2FuIGNhbGwgdXJsX2Zvcm1hdCgpIG9uIHN0cmluZ3NcbiAgLy8gdG8gY2xlYW4gdXAgcG90ZW50aWFsbHkgd29ua3kgdXJscy5cbiAgaWYgKGlzU3RyaW5nKG9iaikpIG9iaiA9IHVybFBhcnNlKG9iaik7XG4gIGlmICghKG9iaiBpbnN0YW5jZW9mIFVybCkpIHJldHVybiBVcmwucHJvdG90eXBlLmZvcm1hdC5jYWxsKG9iaik7XG4gIHJldHVybiBvYmouZm9ybWF0KCk7XG59XG5cblVybC5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBhdXRoID0gdGhpcy5hdXRoIHx8ICcnO1xuICBpZiAoYXV0aCkge1xuICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG4gICAgYXV0aCA9IGF1dGgucmVwbGFjZSgvJTNBL2ksICc6Jyk7XG4gICAgYXV0aCArPSAnQCc7XG4gIH1cblxuICB2YXIgcHJvdG9jb2wgPSB0aGlzLnByb3RvY29sIHx8ICcnLFxuICAgICAgcGF0aG5hbWUgPSB0aGlzLnBhdGhuYW1lIHx8ICcnLFxuICAgICAgaGFzaCA9IHRoaXMuaGFzaCB8fCAnJyxcbiAgICAgIGhvc3QgPSBmYWxzZSxcbiAgICAgIHF1ZXJ5ID0gJyc7XG5cbiAgaWYgKHRoaXMuaG9zdCkge1xuICAgIGhvc3QgPSBhdXRoICsgdGhpcy5ob3N0O1xuICB9IGVsc2UgaWYgKHRoaXMuaG9zdG5hbWUpIHtcbiAgICBob3N0ID0gYXV0aCArICh0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSA9PT0gLTEgP1xuICAgICAgICB0aGlzLmhvc3RuYW1lIDpcbiAgICAgICAgJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyk7XG4gICAgaWYgKHRoaXMucG9ydCkge1xuICAgICAgaG9zdCArPSAnOicgKyB0aGlzLnBvcnQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRoaXMucXVlcnkgJiZcbiAgICAgIGlzT2JqZWN0KHRoaXMucXVlcnkpICYmXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLnF1ZXJ5KS5sZW5ndGgpIHtcbiAgICBxdWVyeSA9IHF1ZXJ5c3RyaW5nLnN0cmluZ2lmeSh0aGlzLnF1ZXJ5KTtcbiAgfVxuXG4gIHZhciBzZWFyY2ggPSB0aGlzLnNlYXJjaCB8fCAocXVlcnkgJiYgKCc/JyArIHF1ZXJ5KSkgfHwgJyc7XG5cbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLnN1YnN0cigtMSkgIT09ICc6JykgcHJvdG9jb2wgKz0gJzonO1xuXG4gIC8vIG9ubHkgdGhlIHNsYXNoZWRQcm90b2NvbHMgZ2V0IHRoZSAvLy4gIE5vdCBtYWlsdG86LCB4bXBwOiwgZXRjLlxuICAvLyB1bmxlc3MgdGhleSBoYWQgdGhlbSB0byBiZWdpbiB3aXRoLlxuICBpZiAodGhpcy5zbGFzaGVzIHx8XG4gICAgICAoIXByb3RvY29sIHx8IHNsYXNoZWRQcm90b2NvbFtwcm90b2NvbF0pICYmIGhvc3QgIT09IGZhbHNlKSB7XG4gICAgaG9zdCA9ICcvLycgKyAoaG9zdCB8fCAnJyk7XG4gICAgaWYgKHBhdGhuYW1lICYmIHBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nKSBwYXRobmFtZSA9ICcvJyArIHBhdGhuYW1lO1xuICB9IGVsc2UgaWYgKCFob3N0KSB7XG4gICAgaG9zdCA9ICcnO1xuICB9XG5cbiAgaWYgKGhhc2ggJiYgaGFzaC5jaGFyQXQoMCkgIT09ICcjJykgaGFzaCA9ICcjJyArIGhhc2g7XG4gIGlmIChzZWFyY2ggJiYgc2VhcmNoLmNoYXJBdCgwKSAhPT0gJz8nKSBzZWFyY2ggPSAnPycgKyBzZWFyY2g7XG5cbiAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKC9bPyNdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChtYXRjaCk7XG4gIH0pO1xuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZSgnIycsICclMjMnKTtcblxuICByZXR1cm4gcHJvdG9jb2wgKyBob3N0ICsgcGF0aG5hbWUgKyBzZWFyY2ggKyBoYXNoO1xufTtcblxuZnVuY3Rpb24gdXJsUmVzb2x2ZShzb3VyY2UsIHJlbGF0aXZlKSB7XG4gIHJldHVybiB1cmxQYXJzZShzb3VyY2UsIGZhbHNlLCB0cnVlKS5yZXNvbHZlKHJlbGF0aXZlKTtcbn1cblxuVXJsLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24ocmVsYXRpdmUpIHtcbiAgcmV0dXJuIHRoaXMucmVzb2x2ZU9iamVjdCh1cmxQYXJzZShyZWxhdGl2ZSwgZmFsc2UsIHRydWUpKS5mb3JtYXQoKTtcbn07XG5cbmZ1bmN0aW9uIHVybFJlc29sdmVPYmplY3Qoc291cmNlLCByZWxhdGl2ZSkge1xuICBpZiAoIXNvdXJjZSkgcmV0dXJuIHJlbGF0aXZlO1xuICByZXR1cm4gdXJsUGFyc2Uoc291cmNlLCBmYWxzZSwgdHJ1ZSkucmVzb2x2ZU9iamVjdChyZWxhdGl2ZSk7XG59XG5cblVybC5wcm90b3R5cGUucmVzb2x2ZU9iamVjdCA9IGZ1bmN0aW9uKHJlbGF0aXZlKSB7XG4gIGlmIChpc1N0cmluZyhyZWxhdGl2ZSkpIHtcbiAgICB2YXIgcmVsID0gbmV3IFVybCgpO1xuICAgIHJlbC5wYXJzZShyZWxhdGl2ZSwgZmFsc2UsIHRydWUpO1xuICAgIHJlbGF0aXZlID0gcmVsO1xuICB9XG5cbiAgdmFyIHJlc3VsdCA9IG5ldyBVcmwoKTtcbiAgT2JqZWN0LmtleXModGhpcykuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgcmVzdWx0W2tdID0gdGhpc1trXTtcbiAgfSwgdGhpcyk7XG5cbiAgLy8gaGFzaCBpcyBhbHdheXMgb3ZlcnJpZGRlbiwgbm8gbWF0dGVyIHdoYXQuXG4gIC8vIGV2ZW4gaHJlZj1cIlwiIHdpbGwgcmVtb3ZlIGl0LlxuICByZXN1bHQuaGFzaCA9IHJlbGF0aXZlLmhhc2g7XG5cbiAgLy8gaWYgdGhlIHJlbGF0aXZlIHVybCBpcyBlbXB0eSwgdGhlbiB0aGVyZSdzIG5vdGhpbmcgbGVmdCB0byBkbyBoZXJlLlxuICBpZiAocmVsYXRpdmUuaHJlZiA9PT0gJycpIHtcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLy8gaHJlZnMgbGlrZSAvL2Zvby9iYXIgYWx3YXlzIGN1dCB0byB0aGUgcHJvdG9jb2wuXG4gIGlmIChyZWxhdGl2ZS5zbGFzaGVzICYmICFyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgIC8vIHRha2UgZXZlcnl0aGluZyBleGNlcHQgdGhlIHByb3RvY29sIGZyb20gcmVsYXRpdmVcbiAgICBPYmplY3Qua2V5cyhyZWxhdGl2ZSkuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgICBpZiAoayAhPT0gJ3Byb3RvY29sJylcbiAgICAgICAgcmVzdWx0W2tdID0gcmVsYXRpdmVba107XG4gICAgfSk7XG5cbiAgICAvL3VybFBhcnNlIGFwcGVuZHMgdHJhaWxpbmcgLyB0byB1cmxzIGxpa2UgaHR0cDovL3d3dy5leGFtcGxlLmNvbVxuICAgIGlmIChzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXSAmJlxuICAgICAgICByZXN1bHQuaG9zdG5hbWUgJiYgIXJlc3VsdC5wYXRobmFtZSkge1xuICAgICAgcmVzdWx0LnBhdGggPSByZXN1bHQucGF0aG5hbWUgPSAnLyc7XG4gICAgfVxuXG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmIChyZWxhdGl2ZS5wcm90b2NvbCAmJiByZWxhdGl2ZS5wcm90b2NvbCAhPT0gcmVzdWx0LnByb3RvY29sKSB7XG4gICAgLy8gaWYgaXQncyBhIGtub3duIHVybCBwcm90b2NvbCwgdGhlbiBjaGFuZ2luZ1xuICAgIC8vIHRoZSBwcm90b2NvbCBkb2VzIHdlaXJkIHRoaW5nc1xuICAgIC8vIGZpcnN0LCBpZiBpdCdzIG5vdCBmaWxlOiwgdGhlbiB3ZSBNVVNUIGhhdmUgYSBob3N0LFxuICAgIC8vIGFuZCBpZiB0aGVyZSB3YXMgYSBwYXRoXG4gICAgLy8gdG8gYmVnaW4gd2l0aCwgdGhlbiB3ZSBNVVNUIGhhdmUgYSBwYXRoLlxuICAgIC8vIGlmIGl0IGlzIGZpbGU6LCB0aGVuIHRoZSBob3N0IGlzIGRyb3BwZWQsXG4gICAgLy8gYmVjYXVzZSB0aGF0J3Mga25vd24gdG8gYmUgaG9zdGxlc3MuXG4gICAgLy8gYW55dGhpbmcgZWxzZSBpcyBhc3N1bWVkIHRvIGJlIGFic29sdXRlLlxuICAgIGlmICghc2xhc2hlZFByb3RvY29sW3JlbGF0aXZlLnByb3RvY29sXSkge1xuICAgICAgT2JqZWN0LmtleXMocmVsYXRpdmUpLmZvckVhY2goZnVuY3Rpb24oaykge1xuICAgICAgICByZXN1bHRba10gPSByZWxhdGl2ZVtrXTtcbiAgICAgIH0pO1xuICAgICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHJlc3VsdC5wcm90b2NvbCA9IHJlbGF0aXZlLnByb3RvY29sO1xuICAgIGlmICghcmVsYXRpdmUuaG9zdCAmJiAhaG9zdGxlc3NQcm90b2NvbFtyZWxhdGl2ZS5wcm90b2NvbF0pIHtcbiAgICAgIHZhciByZWxQYXRoID0gKHJlbGF0aXZlLnBhdGhuYW1lIHx8ICcnKS5zcGxpdCgnLycpO1xuICAgICAgd2hpbGUgKHJlbFBhdGgubGVuZ3RoICYmICEocmVsYXRpdmUuaG9zdCA9IHJlbFBhdGguc2hpZnQoKSkpO1xuICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0KSByZWxhdGl2ZS5ob3N0ID0gJyc7XG4gICAgICBpZiAoIXJlbGF0aXZlLmhvc3RuYW1lKSByZWxhdGl2ZS5ob3N0bmFtZSA9ICcnO1xuICAgICAgaWYgKHJlbFBhdGhbMF0gIT09ICcnKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuICAgICAgaWYgKHJlbFBhdGgubGVuZ3RoIDwgMikgcmVsUGF0aC51bnNoaWZ0KCcnKTtcbiAgICAgIHJlc3VsdC5wYXRobmFtZSA9IHJlbFBhdGguam9pbignLycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxhdGl2ZS5wYXRobmFtZTtcbiAgICB9XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgICByZXN1bHQuaG9zdCA9IHJlbGF0aXZlLmhvc3QgfHwgJyc7XG4gICAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoO1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3Q7XG4gICAgcmVzdWx0LnBvcnQgPSByZWxhdGl2ZS5wb3J0O1xuICAgIC8vIHRvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG4gICAgaWYgKHJlc3VsdC5wYXRobmFtZSB8fCByZXN1bHQuc2VhcmNoKSB7XG4gICAgICB2YXIgcCA9IHJlc3VsdC5wYXRobmFtZSB8fCAnJztcbiAgICAgIHZhciBzID0gcmVzdWx0LnNlYXJjaCB8fCAnJztcbiAgICAgIHJlc3VsdC5wYXRoID0gcCArIHM7XG4gICAgfVxuICAgIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdmFyIGlzU291cmNlQWJzID0gKHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpLFxuICAgICAgaXNSZWxBYnMgPSAoXG4gICAgICAgICAgcmVsYXRpdmUuaG9zdCB8fFxuICAgICAgICAgIHJlbGF0aXZlLnBhdGhuYW1lICYmIHJlbGF0aXZlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nXG4gICAgICApLFxuICAgICAgbXVzdEVuZEFicyA9IChpc1JlbEFicyB8fCBpc1NvdXJjZUFicyB8fFxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0Lmhvc3QgJiYgcmVsYXRpdmUucGF0aG5hbWUpKSxcbiAgICAgIHJlbW92ZUFsbERvdHMgPSBtdXN0RW5kQWJzLFxuICAgICAgc3JjUGF0aCA9IHJlc3VsdC5wYXRobmFtZSAmJiByZXN1bHQucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcbiAgICAgIHJlbFBhdGggPSByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuICAgICAgcHN5Y2hvdGljID0gcmVzdWx0LnByb3RvY29sICYmICFzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXTtcblxuICAvLyBpZiB0aGUgdXJsIGlzIGEgbm9uLXNsYXNoZWQgdXJsLCB0aGVuIHJlbGF0aXZlXG4gIC8vIGxpbmtzIGxpa2UgLi4vLi4gc2hvdWxkIGJlIGFibGVcbiAgLy8gdG8gY3Jhd2wgdXAgdG8gdGhlIGhvc3RuYW1lLCBhcyB3ZWxsLiAgVGhpcyBpcyBzdHJhbmdlLlxuICAvLyByZXN1bHQucHJvdG9jb2wgaGFzIGFscmVhZHkgYmVlbiBzZXQgYnkgbm93LlxuICAvLyBMYXRlciBvbiwgcHV0IHRoZSBmaXJzdCBwYXRoIHBhcnQgaW50byB0aGUgaG9zdCBmaWVsZC5cbiAgaWYgKHBzeWNob3RpYykge1xuICAgIHJlc3VsdC5ob3N0bmFtZSA9ICcnO1xuICAgIHJlc3VsdC5wb3J0ID0gbnVsbDtcbiAgICBpZiAocmVzdWx0Lmhvc3QpIHtcbiAgICAgIGlmIChzcmNQYXRoWzBdID09PSAnJykgc3JjUGF0aFswXSA9IHJlc3VsdC5ob3N0O1xuICAgICAgZWxzZSBzcmNQYXRoLnVuc2hpZnQocmVzdWx0Lmhvc3QpO1xuICAgIH1cbiAgICByZXN1bHQuaG9zdCA9ICcnO1xuICAgIGlmIChyZWxhdGl2ZS5wcm90b2NvbCkge1xuICAgICAgcmVsYXRpdmUuaG9zdG5hbWUgPSBudWxsO1xuICAgICAgcmVsYXRpdmUucG9ydCA9IG51bGw7XG4gICAgICBpZiAocmVsYXRpdmUuaG9zdCkge1xuICAgICAgICBpZiAocmVsUGF0aFswXSA9PT0gJycpIHJlbFBhdGhbMF0gPSByZWxhdGl2ZS5ob3N0O1xuICAgICAgICBlbHNlIHJlbFBhdGgudW5zaGlmdChyZWxhdGl2ZS5ob3N0KTtcbiAgICAgIH1cbiAgICAgIHJlbGF0aXZlLmhvc3QgPSBudWxsO1xuICAgIH1cbiAgICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyAmJiAocmVsUGF0aFswXSA9PT0gJycgfHwgc3JjUGF0aFswXSA9PT0gJycpO1xuICB9XG5cbiAgaWYgKGlzUmVsQWJzKSB7XG4gICAgLy8gaXQncyBhYnNvbHV0ZS5cbiAgICByZXN1bHQuaG9zdCA9IChyZWxhdGl2ZS5ob3N0IHx8IHJlbGF0aXZlLmhvc3QgPT09ICcnKSA/XG4gICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0IDogcmVzdWx0Lmhvc3Q7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gKHJlbGF0aXZlLmhvc3RuYW1lIHx8IHJlbGF0aXZlLmhvc3RuYW1lID09PSAnJykgP1xuICAgICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlLmhvc3RuYW1lIDogcmVzdWx0Lmhvc3RuYW1lO1xuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgc3JjUGF0aCA9IHJlbFBhdGg7XG4gICAgLy8gZmFsbCB0aHJvdWdoIHRvIHRoZSBkb3QtaGFuZGxpbmcgYmVsb3cuXG4gIH0gZWxzZSBpZiAocmVsUGF0aC5sZW5ndGgpIHtcbiAgICAvLyBpdCdzIHJlbGF0aXZlXG4gICAgLy8gdGhyb3cgYXdheSB0aGUgZXhpc3RpbmcgZmlsZSwgYW5kIHRha2UgdGhlIG5ldyBwYXRoIGluc3RlYWQuXG4gICAgaWYgKCFzcmNQYXRoKSBzcmNQYXRoID0gW107XG4gICAgc3JjUGF0aC5wb3AoKTtcbiAgICBzcmNQYXRoID0gc3JjUGF0aC5jb25jYXQocmVsUGF0aCk7XG4gICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcbiAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcbiAgfSBlbHNlIGlmICghaXNOdWxsT3JVbmRlZmluZWQocmVsYXRpdmUuc2VhcmNoKSkge1xuICAgIC8vIGp1c3QgcHVsbCBvdXQgdGhlIHNlYXJjaC5cbiAgICAvLyBsaWtlIGhyZWY9Jz9mb28nLlxuICAgIC8vIFB1dCB0aGlzIGFmdGVyIHRoZSBvdGhlciB0d28gY2FzZXMgYmVjYXVzZSBpdCBzaW1wbGlmaWVzIHRoZSBib29sZWFuc1xuICAgIGlmIChwc3ljaG90aWMpIHtcbiAgICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlc3VsdC5ob3N0ID0gc3JjUGF0aC5zaGlmdCgpO1xuICAgICAgLy9vY2NhdGlvbmFseSB0aGUgYXV0aCBjYW4gZ2V0IHN0dWNrIG9ubHkgaW4gaG9zdFxuICAgICAgLy90aGlzIGVzcGVjaWFseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAgIC8vdXJsLnJlc29sdmVPYmplY3QoJ21haWx0bzpsb2NhbDFAZG9tYWluMScsICdsb2NhbDJAZG9tYWluMicpXG4gICAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgICBpZiAoYXV0aEluSG9zdCkge1xuICAgICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcbiAgICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG4gICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmICghaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIWlzTnVsbChyZXN1bHQuc2VhcmNoKSkge1xuICAgICAgcmVzdWx0LnBhdGggPSAocmVzdWx0LnBhdGhuYW1lID8gcmVzdWx0LnBhdGhuYW1lIDogJycpICtcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdC5zZWFyY2ggPyByZXN1bHQuc2VhcmNoIDogJycpO1xuICAgIH1cbiAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuICAgIC8vIG5vIHBhdGggYXQgYWxsLiAgZWFzeS5cbiAgICAvLyB3ZSd2ZSBhbHJlYWR5IGhhbmRsZWQgdGhlIG90aGVyIHN0dWZmIGFib3ZlLlxuICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG4gICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuICAgIGlmIChyZXN1bHQuc2VhcmNoKSB7XG4gICAgICByZXN1bHQucGF0aCA9ICcvJyArIHJlc3VsdC5zZWFyY2g7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5wYXRoID0gbnVsbDtcbiAgICB9XG4gICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8vIGlmIGEgdXJsIEVORHMgaW4gLiBvciAuLiwgdGhlbiBpdCBtdXN0IGdldCBhIHRyYWlsaW5nIHNsYXNoLlxuICAvLyBob3dldmVyLCBpZiBpdCBlbmRzIGluIGFueXRoaW5nIGVsc2Ugbm9uLXNsYXNoeSxcbiAgLy8gdGhlbiBpdCBtdXN0IE5PVCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cbiAgdmFyIGxhc3QgPSBzcmNQYXRoLnNsaWNlKC0xKVswXTtcbiAgdmFyIGhhc1RyYWlsaW5nU2xhc2ggPSAoXG4gICAgICAocmVzdWx0Lmhvc3QgfHwgcmVsYXRpdmUuaG9zdCkgJiYgKGxhc3QgPT09ICcuJyB8fCBsYXN0ID09PSAnLi4nKSB8fFxuICAgICAgbGFzdCA9PT0gJycpO1xuXG4gIC8vIHN0cmlwIHNpbmdsZSBkb3RzLCByZXNvbHZlIGRvdWJsZSBkb3RzIHRvIHBhcmVudCBkaXJcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHNyY1BhdGgubGVuZ3RoOyBpID49IDA7IGktLSkge1xuICAgIGxhc3QgPSBzcmNQYXRoW2ldO1xuICAgIGlmIChsYXN0ID09ICcuJykge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIC8vIGlmIHRoZSBwYXRoIGlzIGFsbG93ZWQgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIHJlc3RvcmUgbGVhZGluZyAuLnNcbiAgaWYgKCFtdXN0RW5kQWJzICYmICFyZW1vdmVBbGxEb3RzKSB7XG4gICAgZm9yICg7IHVwLS07IHVwKSB7XG4gICAgICBzcmNQYXRoLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG11c3RFbmRBYnMgJiYgc3JjUGF0aFswXSAhPT0gJycgJiZcbiAgICAgICghc3JjUGF0aFswXSB8fCBzcmNQYXRoWzBdLmNoYXJBdCgwKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoaGFzVHJhaWxpbmdTbGFzaCAmJiAoc3JjUGF0aC5qb2luKCcvJykuc3Vic3RyKC0xKSAhPT0gJy8nKSkge1xuICAgIHNyY1BhdGgucHVzaCgnJyk7XG4gIH1cblxuICB2YXIgaXNBYnNvbHV0ZSA9IHNyY1BhdGhbMF0gPT09ICcnIHx8XG4gICAgICAoc3JjUGF0aFswXSAmJiBzcmNQYXRoWzBdLmNoYXJBdCgwKSA9PT0gJy8nKTtcblxuICAvLyBwdXQgdGhlIGhvc3QgYmFja1xuICBpZiAocHN5Y2hvdGljKSB7XG4gICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVzdWx0Lmhvc3QgPSBpc0Fic29sdXRlID8gJycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjUGF0aC5sZW5ndGggPyBzcmNQYXRoLnNoaWZ0KCkgOiAnJztcbiAgICAvL29jY2F0aW9uYWx5IHRoZSBhdXRoIGNhbiBnZXQgc3R1Y2sgb25seSBpbiBob3N0XG4gICAgLy90aGlzIGVzcGVjaWFseSBoYXBwZW5zIGluIGNhc2VzIGxpa2VcbiAgICAvL3VybC5yZXNvbHZlT2JqZWN0KCdtYWlsdG86bG9jYWwxQGRvbWFpbjEnLCAnbG9jYWwyQGRvbWFpbjInKVxuICAgIHZhciBhdXRoSW5Ib3N0ID0gcmVzdWx0Lmhvc3QgJiYgcmVzdWx0Lmhvc3QuaW5kZXhPZignQCcpID4gMCA/XG4gICAgICAgICAgICAgICAgICAgICByZXN1bHQuaG9zdC5zcGxpdCgnQCcpIDogZmFsc2U7XG4gICAgaWYgKGF1dGhJbkhvc3QpIHtcbiAgICAgIHJlc3VsdC5hdXRoID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuICAgICAgcmVzdWx0Lmhvc3QgPSByZXN1bHQuaG9zdG5hbWUgPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG4gICAgfVxuICB9XG5cbiAgbXVzdEVuZEFicyA9IG11c3RFbmRBYnMgfHwgKHJlc3VsdC5ob3N0ICYmIHNyY1BhdGgubGVuZ3RoKTtcblxuICBpZiAobXVzdEVuZEFicyAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG4gIH1cblxuICBpZiAoIXNyY1BhdGgubGVuZ3RoKSB7XG4gICAgcmVzdWx0LnBhdGhuYW1lID0gbnVsbDtcbiAgICByZXN1bHQucGF0aCA9IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0LnBhdGhuYW1lID0gc3JjUGF0aC5qb2luKCcvJyk7XG4gIH1cblxuICAvL3RvIHN1cHBvcnQgcmVxdWVzdC5odHRwXG4gIGlmICghaXNOdWxsKHJlc3VsdC5wYXRobmFtZSkgfHwgIWlzTnVsbChyZXN1bHQuc2VhcmNoKSkge1xuICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG4gICAgICAgICAgICAgICAgICAocmVzdWx0LnNlYXJjaCA/IHJlc3VsdC5zZWFyY2ggOiAnJyk7XG4gIH1cbiAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoIHx8IHJlc3VsdC5hdXRoO1xuICByZXN1bHQuc2xhc2hlcyA9IHJlc3VsdC5zbGFzaGVzIHx8IHJlbGF0aXZlLnNsYXNoZXM7XG4gIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuVXJsLnByb3RvdHlwZS5wYXJzZUhvc3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGhvc3QgPSB0aGlzLmhvc3Q7XG4gIHZhciBwb3J0ID0gcG9ydFBhdHRlcm4uZXhlYyhob3N0KTtcbiAgaWYgKHBvcnQpIHtcbiAgICBwb3J0ID0gcG9ydFswXTtcbiAgICBpZiAocG9ydCAhPT0gJzonKSB7XG4gICAgICB0aGlzLnBvcnQgPSBwb3J0LnN1YnN0cigxKTtcbiAgICB9XG4gICAgaG9zdCA9IGhvc3Quc3Vic3RyKDAsIGhvc3QubGVuZ3RoIC0gcG9ydC5sZW5ndGgpO1xuICB9XG4gIGlmIChob3N0KSB0aGlzLmhvc3RuYW1lID0gaG9zdDtcbn07XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gXCJzdHJpbmdcIjtcbn1cblxuZnVuY3Rpb24gaXNPYmplY3QoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gbnVsbDtcbn1cbmZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKGFyZykge1xuICByZXR1cm4gIGFyZyA9PSBudWxsO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3VybC91cmwuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCIvKiEgaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlIHYxLjMuMiBieSBAbWF0aGlhcyAqL1xuOyhmdW5jdGlvbihyb290KSB7XG5cblx0LyoqIERldGVjdCBmcmVlIHZhcmlhYmxlcyAqL1xuXHR2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmXG5cdFx0IWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdCFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXHR2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuXHRpZiAoXG5cdFx0ZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHxcblx0XHRmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCB8fFxuXHRcdGZyZWVHbG9iYWwuc2VsZiA9PT0gZnJlZUdsb2JhbFxuXHQpIHtcblx0XHRyb290ID0gZnJlZUdsb2JhbDtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgYHB1bnljb2RlYCBvYmplY3QuXG5cdCAqIEBuYW1lIHB1bnljb2RlXG5cdCAqIEB0eXBlIE9iamVjdFxuXHQgKi9cblx0dmFyIHB1bnljb2RlLFxuXG5cdC8qKiBIaWdoZXN0IHBvc2l0aXZlIHNpZ25lZCAzMi1iaXQgZmxvYXQgdmFsdWUgKi9cblx0bWF4SW50ID0gMjE0NzQ4MzY0NywgLy8gYWthLiAweDdGRkZGRkZGIG9yIDJeMzEtMVxuXG5cdC8qKiBCb290c3RyaW5nIHBhcmFtZXRlcnMgKi9cblx0YmFzZSA9IDM2LFxuXHR0TWluID0gMSxcblx0dE1heCA9IDI2LFxuXHRza2V3ID0gMzgsXG5cdGRhbXAgPSA3MDAsXG5cdGluaXRpYWxCaWFzID0gNzIsXG5cdGluaXRpYWxOID0gMTI4LCAvLyAweDgwXG5cdGRlbGltaXRlciA9ICctJywgLy8gJ1xceDJEJ1xuXG5cdC8qKiBSZWd1bGFyIGV4cHJlc3Npb25zICovXG5cdHJlZ2V4UHVueWNvZGUgPSAvXnhuLS0vLFxuXHRyZWdleE5vbkFTQ0lJID0gL1teXFx4MjAtXFx4N0VdLywgLy8gdW5wcmludGFibGUgQVNDSUkgY2hhcnMgKyBub24tQVNDSUkgY2hhcnNcblx0cmVnZXhTZXBhcmF0b3JzID0gL1tcXHgyRVxcdTMwMDJcXHVGRjBFXFx1RkY2MV0vZywgLy8gUkZDIDM0OTAgc2VwYXJhdG9yc1xuXG5cdC8qKiBFcnJvciBtZXNzYWdlcyAqL1xuXHRlcnJvcnMgPSB7XG5cdFx0J292ZXJmbG93JzogJ092ZXJmbG93OiBpbnB1dCBuZWVkcyB3aWRlciBpbnRlZ2VycyB0byBwcm9jZXNzJyxcblx0XHQnbm90LWJhc2ljJzogJ0lsbGVnYWwgaW5wdXQgPj0gMHg4MCAobm90IGEgYmFzaWMgY29kZSBwb2ludCknLFxuXHRcdCdpbnZhbGlkLWlucHV0JzogJ0ludmFsaWQgaW5wdXQnXG5cdH0sXG5cblx0LyoqIENvbnZlbmllbmNlIHNob3J0Y3V0cyAqL1xuXHRiYXNlTWludXNUTWluID0gYmFzZSAtIHRNaW4sXG5cdGZsb29yID0gTWF0aC5mbG9vcixcblx0c3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZSxcblxuXHQvKiogVGVtcG9yYXJ5IHZhcmlhYmxlICovXG5cdGtleTtcblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHQvKipcblx0ICogQSBnZW5lcmljIGVycm9yIHV0aWxpdHkgZnVuY3Rpb24uXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIFRoZSBlcnJvciB0eXBlLlxuXHQgKiBAcmV0dXJucyB7RXJyb3J9IFRocm93cyBhIGBSYW5nZUVycm9yYCB3aXRoIHRoZSBhcHBsaWNhYmxlIGVycm9yIG1lc3NhZ2UuXG5cdCAqL1xuXHRmdW5jdGlvbiBlcnJvcih0eXBlKSB7XG5cdFx0dGhyb3cgUmFuZ2VFcnJvcihlcnJvcnNbdHlwZV0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIEEgZ2VuZXJpYyBgQXJyYXkjbWFwYCB1dGlsaXR5IGZ1bmN0aW9uLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnkgYXJyYXlcblx0ICogaXRlbS5cblx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHQgKi9cblx0ZnVuY3Rpb24gbWFwKGFycmF5LCBmbikge1xuXHRcdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xuXHRcdHdoaWxlIChsZW5ndGgtLSkge1xuXHRcdFx0cmVzdWx0W2xlbmd0aF0gPSBmbihhcnJheVtsZW5ndGhdKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHNpbXBsZSBgQXJyYXkjbWFwYC1saWtlIHdyYXBwZXIgdG8gd29yayB3aXRoIGRvbWFpbiBuYW1lIHN0cmluZ3Mgb3IgZW1haWxcblx0ICogYWRkcmVzc2VzLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gZG9tYWluIFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgZnVuY3Rpb24gdGhhdCBnZXRzIGNhbGxlZCBmb3IgZXZlcnlcblx0ICogY2hhcmFjdGVyLlxuXHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IHN0cmluZyBvZiBjaGFyYWN0ZXJzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFja1xuXHQgKiBmdW5jdGlvbi5cblx0ICovXG5cdGZ1bmN0aW9uIG1hcERvbWFpbihzdHJpbmcsIGZuKSB7XG5cdFx0dmFyIHBhcnRzID0gc3RyaW5nLnNwbGl0KCdAJyk7XG5cdFx0dmFyIHJlc3VsdCA9ICcnO1xuXHRcdGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG5cdFx0XHQvLyBJbiBlbWFpbCBhZGRyZXNzZXMsIG9ubHkgdGhlIGRvbWFpbiBuYW1lIHNob3VsZCBiZSBwdW55Y29kZWQuIExlYXZlXG5cdFx0XHQvLyB0aGUgbG9jYWwgcGFydCAoaS5lLiBldmVyeXRoaW5nIHVwIHRvIGBAYCkgaW50YWN0LlxuXHRcdFx0cmVzdWx0ID0gcGFydHNbMF0gKyAnQCc7XG5cdFx0XHRzdHJpbmcgPSBwYXJ0c1sxXTtcblx0XHR9XG5cdFx0Ly8gQXZvaWQgYHNwbGl0KHJlZ2V4KWAgZm9yIElFOCBjb21wYXRpYmlsaXR5LiBTZWUgIzE3LlxuXHRcdHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHJlZ2V4U2VwYXJhdG9ycywgJ1xceDJFJyk7XG5cdFx0dmFyIGxhYmVscyA9IHN0cmluZy5zcGxpdCgnLicpO1xuXHRcdHZhciBlbmNvZGVkID0gbWFwKGxhYmVscywgZm4pLmpvaW4oJy4nKTtcblx0XHRyZXR1cm4gcmVzdWx0ICsgZW5jb2RlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIG51bWVyaWMgY29kZSBwb2ludHMgb2YgZWFjaCBVbmljb2RlXG5cdCAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcblx0ICogdGhpcyBmdW5jdGlvbiB3aWxsIGNvbnZlcnQgYSBwYWlyIG9mIHN1cnJvZ2F0ZSBoYWx2ZXMgKGVhY2ggb2Ygd2hpY2hcblx0ICogVUNTLTIgZXhwb3NlcyBhcyBzZXBhcmF0ZSBjaGFyYWN0ZXJzKSBpbnRvIGEgc2luZ2xlIGNvZGUgcG9pbnQsXG5cdCAqIG1hdGNoaW5nIFVURi0xNi5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5lbmNvZGVgXG5cdCAqIEBzZWUgPGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LWVuY29kaW5nPlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHQgKiBAbmFtZSBkZWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZyBUaGUgVW5pY29kZSBpbnB1dCBzdHJpbmcgKFVDUy0yKS5cblx0ICogQHJldHVybnMge0FycmF5fSBUaGUgbmV3IGFycmF5IG9mIGNvZGUgcG9pbnRzLlxuXHQgKi9cblx0ZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcblx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0ICAgIGNvdW50ZXIgPSAwLFxuXHRcdCAgICBsZW5ndGggPSBzdHJpbmcubGVuZ3RoLFxuXHRcdCAgICB2YWx1ZSxcblx0XHQgICAgZXh0cmE7XG5cdFx0d2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdHZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHRcdFx0Ly8gaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyXG5cdFx0XHRcdGV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdFx0aWYgKChleHRyYSAmIDB4RkMwMCkgPT0gMHhEQzAwKSB7IC8vIGxvdyBzdXJyb2dhdGVcblx0XHRcdFx0XHRvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZSBuZXh0XG5cdFx0XHRcdFx0Ly8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5cdFx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdGNvdW50ZXItLTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZXMgYSBzdHJpbmcgYmFzZWQgb24gYW4gYXJyYXkgb2YgbnVtZXJpYyBjb2RlIHBvaW50cy5cblx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5kZWNvZGVgXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZS51Y3MyXG5cdCAqIEBuYW1lIGVuY29kZVxuXHQgKiBAcGFyYW0ge0FycmF5fSBjb2RlUG9pbnRzIFRoZSBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgbmV3IFVuaWNvZGUgc3RyaW5nIChVQ1MtMikuXG5cdCAqL1xuXHRmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdFx0cmV0dXJuIG1hcChhcnJheSwgZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdHZhciBvdXRwdXQgPSAnJztcblx0XHRcdGlmICh2YWx1ZSA+IDB4RkZGRikge1xuXHRcdFx0XHR2YWx1ZSAtPSAweDEwMDAwO1xuXHRcdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcblx0XHRcdFx0dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7XG5cdFx0XHRyZXR1cm4gb3V0cHV0O1xuXHRcdH0pLmpvaW4oJycpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgYmFzaWMgY29kZSBwb2ludCBpbnRvIGEgZGlnaXQvaW50ZWdlci5cblx0ICogQHNlZSBgZGlnaXRUb0Jhc2ljKClgXG5cdCAqIEBwcml2YXRlXG5cdCAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlUG9pbnQgVGhlIGJhc2ljIG51bWVyaWMgY29kZSBwb2ludCB2YWx1ZS5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50IChmb3IgdXNlIGluXG5cdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaW4gdGhlIHJhbmdlIGAwYCB0byBgYmFzZSAtIDFgLCBvciBgYmFzZWAgaWZcblx0ICogdGhlIGNvZGUgcG9pbnQgZG9lcyBub3QgcmVwcmVzZW50IGEgdmFsdWUuXG5cdCAqL1xuXHRmdW5jdGlvbiBiYXNpY1RvRGlnaXQoY29kZVBvaW50KSB7XG5cdFx0aWYgKGNvZGVQb2ludCAtIDQ4IDwgMTApIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSAyMjtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDY1IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA2NTtcblx0XHR9XG5cdFx0aWYgKGNvZGVQb2ludCAtIDk3IDwgMjYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA5Nztcblx0XHR9XG5cdFx0cmV0dXJuIGJhc2U7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBkaWdpdC9pbnRlZ2VyIGludG8gYSBiYXNpYyBjb2RlIHBvaW50LlxuXHQgKiBAc2VlIGBiYXNpY1RvRGlnaXQoKWBcblx0ICogQHByaXZhdGVcblx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpZ2l0IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludC5cblx0ICogQHJldHVybnMge051bWJlcn0gVGhlIGJhc2ljIGNvZGUgcG9pbnQgd2hvc2UgdmFsdWUgKHdoZW4gdXNlZCBmb3Jcblx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpcyBgZGlnaXRgLCB3aGljaCBuZWVkcyB0byBiZSBpbiB0aGUgcmFuZ2Vcblx0ICogYDBgIHRvIGBiYXNlIC0gMWAuIElmIGBmbGFnYCBpcyBub24temVybywgdGhlIHVwcGVyY2FzZSBmb3JtIGlzXG5cdCAqIHVzZWQ7IGVsc2UsIHRoZSBsb3dlcmNhc2UgZm9ybSBpcyB1c2VkLiBUaGUgYmVoYXZpb3IgaXMgdW5kZWZpbmVkXG5cdCAqIGlmIGBmbGFnYCBpcyBub24temVybyBhbmQgYGRpZ2l0YCBoYXMgbm8gdXBwZXJjYXNlIGZvcm0uXG5cdCAqL1xuXHRmdW5jdGlvbiBkaWdpdFRvQmFzaWMoZGlnaXQsIGZsYWcpIHtcblx0XHQvLyAgMC4uMjUgbWFwIHRvIEFTQ0lJIGEuLnogb3IgQS4uWlxuXHRcdC8vIDI2Li4zNSBtYXAgdG8gQVNDSUkgMC4uOVxuXHRcdHJldHVybiBkaWdpdCArIDIyICsgNzUgKiAoZGlnaXQgPCAyNikgLSAoKGZsYWcgIT0gMCkgPDwgNSk7XG5cdH1cblxuXHQvKipcblx0ICogQmlhcyBhZGFwdGF0aW9uIGZ1bmN0aW9uIGFzIHBlciBzZWN0aW9uIDMuNCBvZiBSRkMgMzQ5Mi5cblx0ICogaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzQ5MiNzZWN0aW9uLTMuNFxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0ZnVuY3Rpb24gYWRhcHQoZGVsdGEsIG51bVBvaW50cywgZmlyc3RUaW1lKSB7XG5cdFx0dmFyIGsgPSAwO1xuXHRcdGRlbHRhID0gZmlyc3RUaW1lID8gZmxvb3IoZGVsdGEgLyBkYW1wKSA6IGRlbHRhID4+IDE7XG5cdFx0ZGVsdGEgKz0gZmxvb3IoZGVsdGEgLyBudW1Qb2ludHMpO1xuXHRcdGZvciAoLyogbm8gaW5pdGlhbGl6YXRpb24gKi87IGRlbHRhID4gYmFzZU1pbnVzVE1pbiAqIHRNYXggPj4gMTsgayArPSBiYXNlKSB7XG5cdFx0XHRkZWx0YSA9IGZsb29yKGRlbHRhIC8gYmFzZU1pbnVzVE1pbik7XG5cdFx0fVxuXHRcdHJldHVybiBmbG9vcihrICsgKGJhc2VNaW51c1RNaW4gKyAxKSAqIGRlbHRhIC8gKGRlbHRhICsgc2tldykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scyB0byBhIHN0cmluZyBvZiBVbmljb2RlXG5cdCAqIHN5bWJvbHMuXG5cdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0ICovXG5cdGZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuXHRcdC8vIERvbid0IHVzZSBVQ1MtMlxuXHRcdHZhciBvdXRwdXQgPSBbXSxcblx0XHQgICAgaW5wdXRMZW5ndGggPSBpbnB1dC5sZW5ndGgsXG5cdFx0ICAgIG91dCxcblx0XHQgICAgaSA9IDAsXG5cdFx0ICAgIG4gPSBpbml0aWFsTixcblx0XHQgICAgYmlhcyA9IGluaXRpYWxCaWFzLFxuXHRcdCAgICBiYXNpYyxcblx0XHQgICAgaixcblx0XHQgICAgaW5kZXgsXG5cdFx0ICAgIG9sZGksXG5cdFx0ICAgIHcsXG5cdFx0ICAgIGssXG5cdFx0ICAgIGRpZ2l0LFxuXHRcdCAgICB0LFxuXHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHQgICAgYmFzZU1pbnVzVDtcblxuXHRcdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHM6IGxldCBgYmFzaWNgIGJlIHRoZSBudW1iZXIgb2YgaW5wdXQgY29kZVxuXHRcdC8vIHBvaW50cyBiZWZvcmUgdGhlIGxhc3QgZGVsaW1pdGVyLCBvciBgMGAgaWYgdGhlcmUgaXMgbm9uZSwgdGhlbiBjb3B5XG5cdFx0Ly8gdGhlIGZpcnN0IGJhc2ljIGNvZGUgcG9pbnRzIHRvIHRoZSBvdXRwdXQuXG5cblx0XHRiYXNpYyA9IGlucHV0Lmxhc3RJbmRleE9mKGRlbGltaXRlcik7XG5cdFx0aWYgKGJhc2ljIDwgMCkge1xuXHRcdFx0YmFzaWMgPSAwO1xuXHRcdH1cblxuXHRcdGZvciAoaiA9IDA7IGogPCBiYXNpYzsgKytqKSB7XG5cdFx0XHQvLyBpZiBpdCdzIG5vdCBhIGJhc2ljIGNvZGUgcG9pbnRcblx0XHRcdGlmIChpbnB1dC5jaGFyQ29kZUF0KGopID49IDB4ODApIHtcblx0XHRcdFx0ZXJyb3IoJ25vdC1iYXNpYycpO1xuXHRcdFx0fVxuXHRcdFx0b3V0cHV0LnB1c2goaW5wdXQuY2hhckNvZGVBdChqKSk7XG5cdFx0fVxuXG5cdFx0Ly8gTWFpbiBkZWNvZGluZyBsb29wOiBzdGFydCBqdXN0IGFmdGVyIHRoZSBsYXN0IGRlbGltaXRlciBpZiBhbnkgYmFzaWMgY29kZVxuXHRcdC8vIHBvaW50cyB3ZXJlIGNvcGllZDsgc3RhcnQgYXQgdGhlIGJlZ2lubmluZyBvdGhlcndpc2UuXG5cblx0XHRmb3IgKGluZGV4ID0gYmFzaWMgPiAwID8gYmFzaWMgKyAxIDogMDsgaW5kZXggPCBpbnB1dExlbmd0aDsgLyogbm8gZmluYWwgZXhwcmVzc2lvbiAqLykge1xuXG5cdFx0XHQvLyBgaW5kZXhgIGlzIHRoZSBpbmRleCBvZiB0aGUgbmV4dCBjaGFyYWN0ZXIgdG8gYmUgY29uc3VtZWQuXG5cdFx0XHQvLyBEZWNvZGUgYSBnZW5lcmFsaXplZCB2YXJpYWJsZS1sZW5ndGggaW50ZWdlciBpbnRvIGBkZWx0YWAsXG5cdFx0XHQvLyB3aGljaCBnZXRzIGFkZGVkIHRvIGBpYC4gVGhlIG92ZXJmbG93IGNoZWNraW5nIGlzIGVhc2llclxuXHRcdFx0Ly8gaWYgd2UgaW5jcmVhc2UgYGlgIGFzIHdlIGdvLCB0aGVuIHN1YnRyYWN0IG9mZiBpdHMgc3RhcnRpbmdcblx0XHRcdC8vIHZhbHVlIGF0IHRoZSBlbmQgdG8gb2J0YWluIGBkZWx0YWAuXG5cdFx0XHRmb3IgKG9sZGkgPSBpLCB3ID0gMSwgayA9IGJhc2U7IC8qIG5vIGNvbmRpdGlvbiAqLzsgayArPSBiYXNlKSB7XG5cblx0XHRcdFx0aWYgKGluZGV4ID49IGlucHV0TGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ2ludmFsaWQtaW5wdXQnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRpZ2l0ID0gYmFzaWNUb0RpZ2l0KGlucHV0LmNoYXJDb2RlQXQoaW5kZXgrKykpO1xuXG5cdFx0XHRcdGlmIChkaWdpdCA+PSBiYXNlIHx8IGRpZ2l0ID4gZmxvb3IoKG1heEludCAtIGkpIC8gdykpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGkgKz0gZGlnaXQgKiB3O1xuXHRcdFx0XHR0ID0gayA8PSBiaWFzID8gdE1pbiA6IChrID49IGJpYXMgKyB0TWF4ID8gdE1heCA6IGsgLSBiaWFzKTtcblxuXHRcdFx0XHRpZiAoZGlnaXQgPCB0KSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRiYXNlTWludXNUID0gYmFzZSAtIHQ7XG5cdFx0XHRcdGlmICh3ID4gZmxvb3IobWF4SW50IC8gYmFzZU1pbnVzVCkpIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHcgKj0gYmFzZU1pbnVzVDtcblxuXHRcdFx0fVxuXG5cdFx0XHRvdXQgPSBvdXRwdXQubGVuZ3RoICsgMTtcblx0XHRcdGJpYXMgPSBhZGFwdChpIC0gb2xkaSwgb3V0LCBvbGRpID09IDApO1xuXG5cdFx0XHQvLyBgaWAgd2FzIHN1cHBvc2VkIHRvIHdyYXAgYXJvdW5kIGZyb20gYG91dGAgdG8gYDBgLFxuXHRcdFx0Ly8gaW5jcmVtZW50aW5nIGBuYCBlYWNoIHRpbWUsIHNvIHdlJ2xsIGZpeCB0aGF0IG5vdzpcblx0XHRcdGlmIChmbG9vcihpIC8gb3V0KSA+IG1heEludCAtIG4pIHtcblx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHR9XG5cblx0XHRcdG4gKz0gZmxvb3IoaSAvIG91dCk7XG5cdFx0XHRpICU9IG91dDtcblxuXHRcdFx0Ly8gSW5zZXJ0IGBuYCBhdCBwb3NpdGlvbiBgaWAgb2YgdGhlIG91dHB1dFxuXHRcdFx0b3V0cHV0LnNwbGljZShpKyssIDAsIG4pO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHVjczJlbmNvZGUob3V0cHV0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDb252ZXJ0cyBhIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMgKGUuZy4gYSBkb21haW4gbmFtZSBsYWJlbCkgdG8gYVxuXHQgKiBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBzdHJpbmcgb2YgVW5pY29kZSBzeW1ib2xzLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgcmVzdWx0aW5nIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMuXG5cdCAqL1xuXHRmdW5jdGlvbiBlbmNvZGUoaW5wdXQpIHtcblx0XHR2YXIgbixcblx0XHQgICAgZGVsdGEsXG5cdFx0ICAgIGhhbmRsZWRDUENvdW50LFxuXHRcdCAgICBiYXNpY0xlbmd0aCxcblx0XHQgICAgYmlhcyxcblx0XHQgICAgaixcblx0XHQgICAgbSxcblx0XHQgICAgcSxcblx0XHQgICAgayxcblx0XHQgICAgdCxcblx0XHQgICAgY3VycmVudFZhbHVlLFxuXHRcdCAgICBvdXRwdXQgPSBbXSxcblx0XHQgICAgLyoqIGBpbnB1dExlbmd0aGAgd2lsbCBob2xkIHRoZSBudW1iZXIgb2YgY29kZSBwb2ludHMgaW4gYGlucHV0YC4gKi9cblx0XHQgICAgaW5wdXRMZW5ndGgsXG5cdFx0ICAgIC8qKiBDYWNoZWQgY2FsY3VsYXRpb24gcmVzdWx0cyAqL1xuXHRcdCAgICBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsXG5cdFx0ICAgIGJhc2VNaW51c1QsXG5cdFx0ICAgIHFNaW51c1Q7XG5cblx0XHQvLyBDb252ZXJ0IHRoZSBpbnB1dCBpbiBVQ1MtMiB0byBVbmljb2RlXG5cdFx0aW5wdXQgPSB1Y3MyZGVjb2RlKGlucHV0KTtcblxuXHRcdC8vIENhY2hlIHRoZSBsZW5ndGhcblx0XHRpbnB1dExlbmd0aCA9IGlucHV0Lmxlbmd0aDtcblxuXHRcdC8vIEluaXRpYWxpemUgdGhlIHN0YXRlXG5cdFx0biA9IGluaXRpYWxOO1xuXHRcdGRlbHRhID0gMDtcblx0XHRiaWFzID0gaW5pdGlhbEJpYXM7XG5cblx0XHQvLyBIYW5kbGUgdGhlIGJhc2ljIGNvZGUgcG9pbnRzXG5cdFx0Zm9yIChqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA8IDB4ODApIHtcblx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGN1cnJlbnRWYWx1ZSkpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGhhbmRsZWRDUENvdW50ID0gYmFzaWNMZW5ndGggPSBvdXRwdXQubGVuZ3RoO1xuXG5cdFx0Ly8gYGhhbmRsZWRDUENvdW50YCBpcyB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIHRoYXQgaGF2ZSBiZWVuIGhhbmRsZWQ7XG5cdFx0Ly8gYGJhc2ljTGVuZ3RoYCBpcyB0aGUgbnVtYmVyIG9mIGJhc2ljIGNvZGUgcG9pbnRzLlxuXG5cdFx0Ly8gRmluaXNoIHRoZSBiYXNpYyBzdHJpbmcgLSBpZiBpdCBpcyBub3QgZW1wdHkgLSB3aXRoIGEgZGVsaW1pdGVyXG5cdFx0aWYgKGJhc2ljTGVuZ3RoKSB7XG5cdFx0XHRvdXRwdXQucHVzaChkZWxpbWl0ZXIpO1xuXHRcdH1cblxuXHRcdC8vIE1haW4gZW5jb2RpbmcgbG9vcDpcblx0XHR3aGlsZSAoaGFuZGxlZENQQ291bnQgPCBpbnB1dExlbmd0aCkge1xuXG5cdFx0XHQvLyBBbGwgbm9uLWJhc2ljIGNvZGUgcG9pbnRzIDwgbiBoYXZlIGJlZW4gaGFuZGxlZCBhbHJlYWR5LiBGaW5kIHRoZSBuZXh0XG5cdFx0XHQvLyBsYXJnZXIgb25lOlxuXHRcdFx0Zm9yIChtID0gbWF4SW50LCBqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPj0gbiAmJiBjdXJyZW50VmFsdWUgPCBtKSB7XG5cdFx0XHRcdFx0bSA9IGN1cnJlbnRWYWx1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJbmNyZWFzZSBgZGVsdGFgIGVub3VnaCB0byBhZHZhbmNlIHRoZSBkZWNvZGVyJ3MgPG4saT4gc3RhdGUgdG8gPG0sMD4sXG5cdFx0XHQvLyBidXQgZ3VhcmQgYWdhaW5zdCBvdmVyZmxvd1xuXHRcdFx0aGFuZGxlZENQQ291bnRQbHVzT25lID0gaGFuZGxlZENQQ291bnQgKyAxO1xuXHRcdFx0aWYgKG0gLSBuID4gZmxvb3IoKG1heEludCAtIGRlbHRhKSAvIGhhbmRsZWRDUENvdW50UGx1c09uZSkpIHtcblx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHR9XG5cblx0XHRcdGRlbHRhICs9IChtIC0gbikgKiBoYW5kbGVkQ1BDb3VudFBsdXNPbmU7XG5cdFx0XHRuID0gbTtcblxuXHRcdFx0Zm9yIChqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA8IG4gJiYgKytkZWx0YSA+IG1heEludCkge1xuXHRcdFx0XHRcdGVycm9yKCdvdmVyZmxvdycpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA9PSBuKSB7XG5cdFx0XHRcdFx0Ly8gUmVwcmVzZW50IGRlbHRhIGFzIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXJcblx0XHRcdFx0XHRmb3IgKHEgPSBkZWx0YSwgayA9IGJhc2U7IC8qIG5vIGNvbmRpdGlvbiAqLzsgayArPSBiYXNlKSB7XG5cdFx0XHRcdFx0XHR0ID0gayA8PSBiaWFzID8gdE1pbiA6IChrID49IGJpYXMgKyB0TWF4ID8gdE1heCA6IGsgLSBiaWFzKTtcblx0XHRcdFx0XHRcdGlmIChxIDwgdCkge1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHFNaW51c1QgPSBxIC0gdDtcblx0XHRcdFx0XHRcdGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdFx0XHRcdG91dHB1dC5wdXNoKFxuXHRcdFx0XHRcdFx0XHRzdHJpbmdGcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHQgKyBxTWludXNUICUgYmFzZU1pbnVzVCwgMCkpXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cSA9IGZsb29yKHFNaW51c1QgLyBiYXNlTWludXNUKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRvdXRwdXQucHVzaChzdHJpbmdGcm9tQ2hhckNvZGUoZGlnaXRUb0Jhc2ljKHEsIDApKSk7XG5cdFx0XHRcdFx0YmlhcyA9IGFkYXB0KGRlbHRhLCBoYW5kbGVkQ1BDb3VudFBsdXNPbmUsIGhhbmRsZWRDUENvdW50ID09IGJhc2ljTGVuZ3RoKTtcblx0XHRcdFx0XHRkZWx0YSA9IDA7XG5cdFx0XHRcdFx0KytoYW5kbGVkQ1BDb3VudDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQrK2RlbHRhO1xuXHRcdFx0KytuO1xuXG5cdFx0fVxuXHRcdHJldHVybiBvdXRwdXQuam9pbignJyk7XG5cdH1cblxuXHQvKipcblx0ICogQ29udmVydHMgYSBQdW55Y29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgb3IgYW4gZW1haWwgYWRkcmVzc1xuXHQgKiB0byBVbmljb2RlLiBPbmx5IHRoZSBQdW55Y29kZWQgcGFydHMgb2YgdGhlIGlucHV0IHdpbGwgYmUgY29udmVydGVkLCBpLmUuXG5cdCAqIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHlvdSBjYWxsIGl0IG9uIGEgc3RyaW5nIHRoYXQgaGFzIGFscmVhZHkgYmVlblxuXHQgKiBjb252ZXJ0ZWQgdG8gVW5pY29kZS5cblx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGVkIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MgdG9cblx0ICogY29udmVydCB0byBVbmljb2RlLlxuXHQgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgVW5pY29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gUHVueWNvZGVcblx0ICogc3RyaW5nLlxuXHQgKi9cblx0ZnVuY3Rpb24gdG9Vbmljb2RlKGlucHV0KSB7XG5cdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRyZXR1cm4gcmVnZXhQdW55Y29kZS50ZXN0KHN0cmluZylcblx0XHRcdFx0PyBkZWNvZGUoc3RyaW5nLnNsaWNlKDQpLnRvTG93ZXJDYXNlKCkpXG5cdFx0XHRcdDogc3RyaW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIENvbnZlcnRzIGEgVW5pY29kZSBzdHJpbmcgcmVwcmVzZW50aW5nIGEgZG9tYWluIG5hbWUgb3IgYW4gZW1haWwgYWRkcmVzcyB0b1xuXHQgKiBQdW55Y29kZS4gT25seSB0aGUgbm9uLUFTQ0lJIHBhcnRzIG9mIHRoZSBkb21haW4gbmFtZSB3aWxsIGJlIGNvbnZlcnRlZCxcblx0ICogaS5lLiBpdCBkb2Vzbid0IG1hdHRlciBpZiB5b3UgY2FsbCBpdCB3aXRoIGEgZG9tYWluIHRoYXQncyBhbHJlYWR5IGluXG5cdCAqIEFTQ0lJLlxuXHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzIHRvIGNvbnZlcnQsIGFzIGFcblx0ICogVW5pY29kZSBzdHJpbmcuXG5cdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBQdW55Y29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gZG9tYWluIG5hbWUgb3Jcblx0ICogZW1haWwgYWRkcmVzcy5cblx0ICovXG5cdGZ1bmN0aW9uIHRvQVNDSUkoaW5wdXQpIHtcblx0XHRyZXR1cm4gbWFwRG9tYWluKGlucHV0LCBmdW5jdGlvbihzdHJpbmcpIHtcblx0XHRcdHJldHVybiByZWdleE5vbkFTQ0lJLnRlc3Qoc3RyaW5nKVxuXHRcdFx0XHQ/ICd4bi0tJyArIGVuY29kZShzdHJpbmcpXG5cdFx0XHRcdDogc3RyaW5nO1xuXHRcdH0pO1xuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0LyoqIERlZmluZSB0aGUgcHVibGljIEFQSSAqL1xuXHRwdW55Y29kZSA9IHtcblx0XHQvKipcblx0XHQgKiBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGN1cnJlbnQgUHVueWNvZGUuanMgdmVyc2lvbiBudW1iZXIuXG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHR5cGUgU3RyaW5nXG5cdFx0ICovXG5cdFx0J3ZlcnNpb24nOiAnMS4zLjInLFxuXHRcdC8qKlxuXHRcdCAqIEFuIG9iamVjdCBvZiBtZXRob2RzIHRvIGNvbnZlcnQgZnJvbSBKYXZhU2NyaXB0J3MgaW50ZXJuYWwgY2hhcmFjdGVyXG5cdFx0ICogcmVwcmVzZW50YXRpb24gKFVDUy0yKSB0byBVbmljb2RlIGNvZGUgcG9pbnRzLCBhbmQgYmFjay5cblx0XHQgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0XHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0XHQgKiBAdHlwZSBPYmplY3Rcblx0XHQgKi9cblx0XHQndWNzMic6IHtcblx0XHRcdCdkZWNvZGUnOiB1Y3MyZGVjb2RlLFxuXHRcdFx0J2VuY29kZSc6IHVjczJlbmNvZGVcblx0XHR9LFxuXHRcdCdkZWNvZGUnOiBkZWNvZGUsXG5cdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHQndG9BU0NJSSc6IHRvQVNDSUksXG5cdFx0J3RvVW5pY29kZSc6IHRvVW5pY29kZVxuXHR9O1xuXG5cdC8qKiBFeHBvc2UgYHB1bnljb2RlYCAqL1xuXHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0Ly8gbGlrZSB0aGUgZm9sbG93aW5nOlxuXHRpZiAoXG5cdFx0dHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmXG5cdFx0dHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiZcblx0XHRkZWZpbmUuYW1kXG5cdCkge1xuXHRcdGRlZmluZSgncHVueWNvZGUnLCBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBwdW55Y29kZTtcblx0XHR9KTtcblx0fSBlbHNlIGlmIChmcmVlRXhwb3J0cyAmJiBmcmVlTW9kdWxlKSB7XG5cdFx0aWYgKG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRmcmVlTW9kdWxlLmV4cG9ydHMgPSBwdW55Y29kZTtcblx0XHR9IGVsc2UgeyAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuXHRcdFx0Zm9yIChrZXkgaW4gcHVueWNvZGUpIHtcblx0XHRcdFx0cHVueWNvZGUuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IHB1bnljb2RlW2tleV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHsgLy8gaW4gUmhpbm8gb3IgYSB3ZWIgYnJvd3NlclxuXHRcdHJvb3QucHVueWNvZGUgPSBwdW55Y29kZTtcblx0fVxuXG59KHRoaXMpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi91cmwvfi9wdW55Y29kZS9wdW55Y29kZS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0bW9kdWxlLnBhdGhzID0gW107XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0bW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLnBhcnNlID0gcmVxdWlyZSgnLi9kZWNvZGUnKTtcbmV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSByZXF1aXJlKCcuL2VuY29kZScpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3F1ZXJ5c3RyaW5nL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3F1ZXJ5c3RyaW5nL2RlY29kZS5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gb2JqW2tdLm1hcChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcXVlcnlzdHJpbmcvZW5jb2RlLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfVXRpbHNXaW5kb3cgPSByZXF1aXJlKFwiLi9VdGlsc1dpbmRvd1wiKTtcblxudmFyIF9VdGlsc1dpbmRvdzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc1dpbmRvdyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBkb2N1bWVudFxuICovXG52YXIgRG9jdW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRG9jdW1lbnQoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBEb2N1bWVudCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGRvY3VtZW50IGhlaWdodFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgRG9jdW1lbnQuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24gZ2V0SGVpZ2h0KCkge1xuICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cbiAgICAgICAgaWYgKF9VdGlsc1dpbmRvdzIuZGVmYXVsdC5pc1dpbmRvdyhvYmpXaW5kb3cpKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgob2JqV2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0LCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZG9jdW1lbnQgd2lkdGhcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBEb2N1bWVudC5nZXRXaWR0aCA9IGZ1bmN0aW9uIGdldFdpZHRoKCkge1xuICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cbiAgICAgICAgaWYgKF9VdGlsc1dpbmRvdzIuZGVmYXVsdC5pc1dpbmRvdyhvYmpXaW5kb3cpKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgob2JqV2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGgsIG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGgsIG9ialdpbmRvdy5kb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoLCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldFdpZHRoLCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCwgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZG9jdW1lbnQgdG9wIHNjcm9sbFxuICAgICAqIEBwYXJhbSBvYmpXaW5kb3dcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIERvY3VtZW50LmdldFNjcm9sbFRvcCA9IGZ1bmN0aW9uIGdldFNjcm9sbFRvcCgpIHtcbiAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXG4gICAgICAgIGlmIChfVXRpbHNXaW5kb3cyLmRlZmF1bHQuaXNXaW5kb3cob2JqV2luZG93KSkge1xuICAgICAgICAgICAgcmV0dXJuIG9ialdpbmRvdy5wYWdlWU9mZnNldCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIHx8IG9ialdpbmRvdy5kb2N1bWVudC5ib2R5ICYmIG9ialdpbmRvdy5kb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBkb2N1bWVudCBsZWZ0IHNjcm9sbFxuICAgICAqIEBwYXJhbSBvYmpXaW5kb3dcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIERvY3VtZW50LmdldFNjcm9sbExlZnQgPSBmdW5jdGlvbiBnZXRTY3JvbGxMZWZ0KCkge1xuICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cbiAgICAgICAgaWYgKF9VdGlsc1dpbmRvdzIuZGVmYXVsdC5pc1dpbmRvdyhvYmpXaW5kb3cpKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JqV2luZG93LnBhZ2VYT2Zmc2V0IHx8IG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0IHx8IG9ialdpbmRvdy5kb2N1bWVudC5ib2R5ICYmIG9ialdpbmRvdy5kb2N1bWVudC5ib2R5LnNjcm9sbExlZnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZG9jdW1lbnQgc2Nyb2xsc1xuICAgICAqIEBwYXJhbSBvYmpXaW5kb3dcbiAgICAgKiBAcmV0dXJuIHt7bGVmdDogbnVtYmVyLCB0b3A6IG51bWJlcn19XG4gICAgICovXG5cblxuICAgIERvY3VtZW50LmdldFNjcm9sbCA9IGZ1bmN0aW9uIGdldFNjcm9sbCgpIHtcbiAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXG4gICAgICAgIGlmIChfVXRpbHNXaW5kb3cyLmRlZmF1bHQuaXNXaW5kb3cob2JqV2luZG93KSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBsZWZ0OiBEb2N1bWVudC5nZXRTY3JvbGxMZWZ0KG9ialdpbmRvdyksXG4gICAgICAgICAgICAgICAgdG9wOiBEb2N1bWVudC5nZXRTY3JvbGxUb3Aob2JqV2luZG93KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbGVmdDogTmFOLFxuICAgICAgICAgICAgICAgIHRvcDogTmFOXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBEb2N1bWVudDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRG9jdW1lbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvVXRpbHNEb2N1bWVudC50c1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBDbGFzcyBmb3Igd29ya2luZyB3aXRoIHdpbmRvd1xuICovXG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFdpbmRvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXaW5kb3coKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBXaW5kb3cpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGl0IGlzIHdpbmRvd1xuICAgICAqIEBwYXJhbSBvYmpXaW5kb3dcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuICAgIFdpbmRvdy5pc1dpbmRvdyA9IGZ1bmN0aW9uIGlzV2luZG93KG9ialdpbmRvdykge1xuICAgICAgICByZXR1cm4gb2JqV2luZG93ICYmICh0eXBlb2Ygb2JqV2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqV2luZG93KSkgPT09IFwib2JqZWN0XCIgJiYgb2JqV2luZG93LmRvY3VtZW50ICYmIF90eXBlb2Yob2JqV2luZG93LmRvY3VtZW50KSA9PT0gXCJvYmplY3RcIjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCB3aW5kb3cgaGVpZ2h0XG4gICAgICogQHBhcmFtIG9ialdpbmRvd1xuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgV2luZG93LmdldEhlaWdodCA9IGZ1bmN0aW9uIGdldEhlaWdodCgpIHtcbiAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXG4gICAgICAgIGlmIChXaW5kb3cuaXNXaW5kb3cob2JqV2luZG93KSkge1xuICAgICAgICAgICAgcmV0dXJuIG9ialdpbmRvdy5pbm5lckhlaWdodCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgd2luZG93IHdpZHRoXG4gICAgICogQHBhcmFtIG9ialdpbmRvd1xuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgV2luZG93LmdldFdpZHRoID0gZnVuY3Rpb24gZ2V0V2lkdGgoKSB7XG4gICAgICAgIHZhciBvYmpXaW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdztcblxuICAgICAgICBpZiAoV2luZG93LmlzV2luZG93KG9ialdpbmRvdykpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmpXaW5kb3cuaW5uZXJXaWR0aCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IG9ialdpbmRvdy5kb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHdpbmRvdyBzaXplc1xuICAgICAqIEByZXR1cm4ge3toZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn19XG4gICAgICovXG5cblxuICAgIFdpbmRvdy5nZXRTaXplcyA9IGZ1bmN0aW9uIGdldFNpemVzKCkge1xuICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhlaWdodDogV2luZG93LmdldEhlaWdodChvYmpXaW5kb3cpLFxuICAgICAgICAgICAgd2lkdGg6IFdpbmRvdy5nZXRXaWR0aChvYmpXaW5kb3cpXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiBXaW5kb3c7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFdpbmRvdztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpYi9VdGlsc1dpbmRvdy50c1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbnZhciBfVXRpbHMgPSByZXF1aXJlKFwiLi9VdGlsc1wiKTtcblxudmFyIF9VdGlsczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlscyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBET01cbiAqL1xudmFyIERPTSA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBET00oKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBET00pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHZhcmlhYmxlIGlzIGRvbSBkb2N1bWVudFxuICAgICAqIEBwYXJhbSBkb21Eb2N1bWVudFxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICovXG4gICAgRE9NLmlzRE9NRG9jdW1lbnQgPSBmdW5jdGlvbiBpc0RPTURvY3VtZW50KGRvbURvY3VtZW50KSB7XG4gICAgICAgIHJldHVybiAhKCFkb21Eb2N1bWVudCB8fCB0eXBlb2YgZG9tRG9jdW1lbnQgPT09IFwiYm9vbGVhblwiIHx8IHR5cGVvZiBkb21Eb2N1bWVudCA9PT0gXCJudW1iZXJcIiB8fCB0eXBlb2YgZG9tRG9jdW1lbnQgPT09IFwic3RyaW5nXCIgfHwgZG9tRG9jdW1lbnQubm9kZVR5cGUgIT09IDkpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRmluZCBhbmQgdmFsaWRhdGUgTm9kZSBpbiBET00gRG9jdW1lbnRcbiAgICAgKiBAcGFyYW0gZG9tTm9kZVxuICAgICAqIEBwYXJhbSBkb21Eb2N1bWVudFxuICAgICAqIEByZXR1cm4ge0VsZW1lbnQgfCBib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBET00uZ2V0RE9NTm9kZSA9IGZ1bmN0aW9uIGdldERPTU5vZGUoZG9tTm9kZSkge1xuICAgICAgICB2YXIgZG9tRG9jdW1lbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGRvY3VtZW50O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiBkb21Eb2N1bWVudCBpcyBhIHZhbGlkIHZhcmlhYmxlXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoIURPTS5pc0RPTURvY3VtZW50KGRvbURvY3VtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGVjayBpZiBkb21Ob2RlIGlzIGEgdmFsaWQgdmFyaWFibGVcbiAgICAgICAgICovXG4gICAgICAgIGlmICghZG9tTm9kZSB8fCB0eXBlb2YgZG9tTm9kZSA9PT0gXCJib29sZWFuXCIgfHwgdHlwZW9mIGRvbU5vZGUgPT09IFwibnVtYmVyXCIgfHwgdHlwZW9mIGRvbU5vZGUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgZG9tTm9kZSBpcyBhIHN0cmluZyBpdCBtaWdodCBiZSBhbiBJRFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKHR5cGVvZiBkb21Ob2RlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBkb21Ob2RlID0gZG9tRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZG9tTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIGRvbU5vZGUgaXMgYSB2YWxpZCB2YXJpYWJsZVxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKCFkb21Ob2RlIHx8IGRvbU5vZGUubm9kZVR5cGUgIT09IDEgfHwgIWRvbU5vZGUucGFyZW50Tm9kZSB8fCBkb21Ob2RlLnBhcmVudE5vZGUubm9kZU5hbWUgPT09IFwiSFRNTFwiIHx8ICFkb21Eb2N1bWVudC5jb250YWlucyhkb21Ob2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkb21Ob2RlO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGVsZW1lbnQgc2l6ZXMgYW5kIHBvc2l0aW9uXG4gICAgICogQHBhcmFtIGRvbU5vZGVcbiAgICAgKiBAcGFyYW0gZG9tRG9jdW1lbnRcbiAgICAgKiBAcGFyYW0gc2hvd0ZvcmNlXG4gICAgICogQHJldHVybiB7e2JvdHRvbTogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgbGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyLCB0b3A6IG51bWJlciwgd2lkdGg6IG51bWJlcn19XG4gICAgICovXG5cblxuICAgIERPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPSBmdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZG9tTm9kZSkge1xuICAgICAgICB2YXIgZG9tRG9jdW1lbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGRvY3VtZW50O1xuICAgICAgICB2YXIgc2hvd0ZvcmNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQ3JlYXRlIHJlc3VsdCBzaXplIGFuZCBwb3NpdGlvbiBvYmplY3RcbiAgICAgICAgICovXG4gICAgICAgIHZhciBvYmpSZXQgPSB7XG4gICAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgICAgICBsZWZ0OiAwLFxuICAgICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICB3aWR0aDogMFxuICAgICAgICB9O1xuICAgICAgICBkb21Ob2RlID0gRE9NLmdldERPTU5vZGUoZG9tTm9kZSwgZG9tRG9jdW1lbnQpO1xuICAgICAgICBpZiAoIWRvbU5vZGUpIHtcbiAgICAgICAgICAgIF9VdGlsczIuZGVmYXVsdC53YXJuKFwiVXRpbHMuRE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdDogRE9NIGVsZW1lbnQgZG9lc24ndCBleGlzdCBpbiB0aGF0IERPTSBEb2N1bWVudFwiKTtcbiAgICAgICAgICAgIHJldHVybiBvYmpSZXQ7XG4gICAgICAgIH1cbiAgICAgICAgc2hvd0ZvcmNlID0gISFzaG93Rm9yY2U7XG4gICAgICAgIHZhciBzdHlsZXMgPSB2b2lkIDA7XG4gICAgICAgIGlmIChzaG93Rm9yY2UpIHtcbiAgICAgICAgICAgIHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZG9tTm9kZSk7XG4gICAgICAgICAgICBpZiAoc3R5bGVzICYmIHN0eWxlcy5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xuICAgICAgICAgICAgICAgIGRvbU5vZGUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgZGVmYXVsdCBtZXRob2QgaXMgc3VwcG9ydGVkIHRoYW4gdXNlIGl0XG4gICAgICAgICAqL1xuICAgICAgICBpZiAoZG9tTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgICAgICAgIG9ialJldCA9IGRvbU5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIElFIGhhY2tcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgb2JqUmV0ID0ge1xuICAgICAgICAgICAgICAgIGJvdHRvbTogb2JqUmV0LmJvdHRvbSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IG9ialJldC5oZWlnaHQgfHwgZG9tTm9kZS5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICAgICAgbGVmdDogb2JqUmV0LmxlZnQsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IG9ialJldC5yaWdodCxcbiAgICAgICAgICAgICAgICB0b3A6IG9ialJldC50b3AsXG4gICAgICAgICAgICAgICAgd2lkdGg6IG9ialJldC53aWR0aCB8fCBkb21Ob2RlLmNsaWVudFdpZHRoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBXcml0ZSB0aGUgZWxlbWVudCBpbiBhIHRlbXBvcmFyeSB2YXJpYWJsZVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2YXIgZG9tRWxlbWVudCA9IGRvbU5vZGU7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENhbGN1bGF0ZWQgYmFzaWMgcGFyYW1ldGVycyBvZiB0aGUgZWxlbWVudFxuICAgICAgICAgICAgICogQHR5cGUge09iamVjdH1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFyIG9iakNvb3JkaW5hdGVzID0ge1xuICAgICAgICAgICAgICAgIGhlaWdodDogZG9tRWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGRvbUVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBBcmUgcGFzc2VkIG9uIHRvIGFsbCBwYXJlbnRzIGFuZCB0YWtlIGludG8gYWNjb3VudCB0aGVpciBvZmZzZXRzXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHdoaWxlIChkb21FbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgb2JqQ29vcmRpbmF0ZXMueCArPSBkb21FbGVtZW50Lm9mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgb2JqQ29vcmRpbmF0ZXMueSArPSBkb21FbGVtZW50Lm9mZnNldFRvcDtcbiAgICAgICAgICAgICAgICBkb21FbGVtZW50ID0gZG9tRWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBvYmpSZXQgPSB7XG4gICAgICAgICAgICAgICAgYm90dG9tOiBvYmpDb29yZGluYXRlcy55ICsgb2JqQ29vcmRpbmF0ZXMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIGhlaWdodDogb2JqQ29vcmRpbmF0ZXMuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIGxlZnQ6IG9iakNvb3JkaW5hdGVzLngsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IG9iakNvb3JkaW5hdGVzLnggKyBvYmpDb29yZGluYXRlcy53aWR0aCxcbiAgICAgICAgICAgICAgICB0b3A6IG9iakNvb3JkaW5hdGVzLnksXG4gICAgICAgICAgICAgICAgd2lkdGg6IG9iakNvb3JkaW5hdGVzLndpZHRoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzaG93Rm9yY2UgJiYgZG9tTm9kZSkge1xuICAgICAgICAgICAgZG9tTm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICogUmV0dXJuIHNpemUgYW5kIHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50XG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gb2JqUmV0O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGaW5kIGVsZW1lbnQgcG9zaXRpb25cbiAgICAgKiBAcGFyYW0gZG9tTm9kZVxuICAgICAqIEBwYXJhbSBkb21Eb2N1bWVudFxuICAgICAqIEBwYXJhbSBzaG93Rm9yY2VcbiAgICAgKiBAcmV0dXJuIHt7dG9wOiBudW1iZXIsIGxlZnQ6IG51bWJlcn19XG4gICAgICovXG4gICAgRE9NLmZpbmRFbGVtZW50UG9zaXRpb24gPSBmdW5jdGlvbiBmaW5kRWxlbWVudFBvc2l0aW9uKGRvbU5vZGUpIHtcbiAgICAgICAgdmFyIGRvbURvY3VtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudDtcbiAgICAgICAgdmFyIHNob3dGb3JjZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgICAgICAgdmFyIG9ialJldCA9IHtcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICB0b3A6IDBcbiAgICAgICAgfTtcbiAgICAgICAgZG9tTm9kZSA9IERPTS5nZXRET01Ob2RlKGRvbU5vZGUsIGRvbURvY3VtZW50KTtcbiAgICAgICAgaWYgKCFkb21Ob2RlKSB7XG4gICAgICAgICAgICBfVXRpbHMyLmRlZmF1bHQud2FybihcIlV0aWxzLkRPTS5maW5kRWxlbWVudFBvc2l0aW9uOiBET00gZWxlbWVudCBkb2Vzbid0IGV4aXN0IGluIHRoYXQgRE9NIERvY3VtZW50XCIpO1xuICAgICAgICAgICAgcmV0dXJuIG9ialJldDtcbiAgICAgICAgfVxuICAgICAgICBzaG93Rm9yY2UgPSAhIXNob3dGb3JjZTtcbiAgICAgICAgd2hpbGUgKGRvbU5vZGUpIHtcbiAgICAgICAgICAgIHZhciBzdHlsZXMgPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAoc2hvd0ZvcmNlKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9tTm9kZSk7XG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlcyAmJiBzdHlsZXMuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tTm9kZS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9ialJldC5sZWZ0ICs9IGRvbU5vZGUub2Zmc2V0TGVmdDtcbiAgICAgICAgICAgIG9ialJldC50b3AgKz0gZG9tTm9kZS5vZmZzZXRUb3A7XG4gICAgICAgICAgICBkb21Ob2RlID0gZG9tTm9kZS5vZmZzZXRQYXJlbnQ7XG4gICAgICAgICAgICBpZiAoc2hvd0ZvcmNlICYmIGRvbU5vZGUpIHtcbiAgICAgICAgICAgICAgICBkb21Ob2RlLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmpSZXQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGQgZXZlbnQgbGlzdGVuZXJcbiAgICAgKiBAcGFyYW0gb2JqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gZnVuY1xuICAgICAqL1xuXG5cbiAgICBET00uYWRkRXZlbnQgPSBmdW5jdGlvbiBhZGRFdmVudChvYmosIG5hbWUsIGZ1bmMpIHtcbiAgICAgICAgaWYgKG9iaiAmJiAodHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaikpID09PSBcIm9iamVjdFwiICYmIG9iai5ub2RlVHlwZSA9PT0gMSAmJiBvYmoucGFyZW50RWxlbWVudCAmJiBvYmoucGFyZW50RWxlbWVudC5ub2RlTmFtZSAhPT0gXCJIVE1MXCIgJiYgdHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGZ1bmMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgaWYgKG9iai5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgb2JqLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuYywgZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmouYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgICAgICBvYmouYXR0YWNoRXZlbnQoXCJvblwiICsgbmFtZSwgZnVuYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGV2ZW50IGxpc3RlbmVyXG4gICAgICogQHBhcmFtIG9ialxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIGZ1bmNcbiAgICAgKi9cblxuXG4gICAgRE9NLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24gcmVtb3ZlRXZlbnQob2JqLCBuYW1lLCBmdW5jKSB7XG4gICAgICAgIGlmIChvYmogJiYgKHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopKSA9PT0gXCJvYmplY3RcIiAmJiBvYmoubm9kZVR5cGUgPT09IDEgJiYgb2JqLnBhcmVudEVsZW1lbnQgJiYgb2JqLnBhcmVudEVsZW1lbnQubm9kZU5hbWUgIT09IFwiSFRNTFwiICYmIHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBmdW5jID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGlmIChvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIG9iai5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmMsIGZhbHNlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqLmRldGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgICAgb2JqLmRldGFjaEV2ZW50KFwib25cIiArIG5hbWUsIGZ1bmMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGVsZW1lbnQgaGFzIGNsYXNzIG5hbWVcbiAgICAgKiBAcGFyYW0gZWxlbWVudFxuICAgICAqIEBwYXJhbSBjbGFzc05hbWVcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgICAqL1xuXG5cbiAgICBET00uaGFzQ2xhc3NOYW1lID0gZnVuY3Rpb24gaGFzQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoZWxlbWVudCAmJiAodHlwZW9mIGVsZW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihlbGVtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxICYmIGVsZW1lbnQucGFyZW50RWxlbWVudCAmJiBlbGVtZW50LnBhcmVudEVsZW1lbnQubm9kZU5hbWUgIT09IFwiSFRNTFwiKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xuICAgICAgICAgICAgcmV0dXJuIChcIiBcIiArIGVsZW1lbnQuY2xhc3NOYW1lICsgXCIgXCIpLmluZGV4T2YoXCIgXCIgKyBjbGFzc05hbWUgKyBcIiBcIikgIT09IC0xO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBZGQgY2xhc3MgbmFtZVxuICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuXG5cbiAgICBET00uYWRkQ2xhc3NOYW1lID0gZnVuY3Rpb24gYWRkQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICAgICAgICBpZiAoZWxlbWVudCAmJiAodHlwZW9mIGVsZW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihlbGVtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxICYmIGVsZW1lbnQucGFyZW50RWxlbWVudCAmJiBlbGVtZW50LnBhcmVudEVsZW1lbnQubm9kZU5hbWUgIT09IFwiSFRNTFwiKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xuICAgICAgICAgICAgaWYgKCFET00uaGFzQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2wgPSBlbGVtZW50LmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsID8gY2wgKyBcIiBcIiArIGNsYXNzTmFtZSA6IGNsYXNzTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlbW92ZSBjbGFzcyBuYW1lXG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gICAgICovXG5cblxuICAgIERPTS5yZW1vdmVDbGFzc05hbWUgPSBmdW5jdGlvbiByZW1vdmVDbGFzc05hbWUoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gICAgICAgIGlmIChlbGVtZW50ICYmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGVsZW1lbnQpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgY2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEgJiYgZWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIGVsZW1lbnQucGFyZW50RWxlbWVudC5ub2RlTmFtZSAhPT0gXCJIVE1MXCIgJiYgdHlwZW9mIGVsZW1lbnQuY2xhc3NOYW1lID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xuICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmNsYXNzTmFtZS50cmltKCkuc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGNsYXNzZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICBjbGFzc2VzW2ldID0gY2xhc3Nlc1tpXS50cmltKCk7XG4gICAgICAgICAgICAgICAgaWYgKCFjbGFzc2VzW2ldIHx8IGNsYXNzZXNbaV0gPT09IGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbihcIiBcIik7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUb2dnbGUgY2xhc3MgbmFtZVxuICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICogQHBhcmFtIGNsYXNzTmFtZVxuICAgICAqIEBwYXJhbSB0b2dnbGVcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cblxuXG4gICAgRE9NLnRvZ2dsZUNsYXNzTmFtZSA9IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzTmFtZShlbGVtZW50LCBjbGFzc05hbWUsIHRvZ2dsZSkge1xuICAgICAgICBpZiAoZWxlbWVudCAmJiAodHlwZW9mIGVsZW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihlbGVtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgdG9nZ2xlID09PSBcImJvb2xlYW5cIiAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxICYmIGVsZW1lbnQucGFyZW50RWxlbWVudCAmJiBlbGVtZW50LnBhcmVudEVsZW1lbnQubm9kZU5hbWUgIT09IFwiSFRNTFwiKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSBjbGFzc05hbWUudHJpbSgpO1xuICAgICAgICAgICAgaWYgKHRvZ2dsZSkge1xuICAgICAgICAgICAgICAgIERPTS5hZGRDbGFzc05hbWUoZWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgRE9NLnJlbW92ZUNsYXNzTmFtZShlbGVtZW50LCBjbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVwbGFjZSBjbGFzcyBuYW1lXG4gICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2xkQ2xhc3NOYW1lXG4gICAgICogQHBhcmFtIG5ld0NsYXNzTmFtZVxuICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuICAgICAqL1xuXG5cbiAgICBET00ucmVwbGFjZUNsYXNzID0gZnVuY3Rpb24gcmVwbGFjZUNsYXNzKGVsZW1lbnQsIG9sZENsYXNzTmFtZSwgbmV3Q2xhc3NOYW1lKSB7XG4gICAgICAgIGlmIChlbGVtZW50ICYmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGVsZW1lbnQpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2xkQ2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBuZXdDbGFzc05hbWUgPT09IFwic3RyaW5nXCIgJiYgZWxlbWVudC5ub2RlVHlwZSA9PT0gMSAmJiBlbGVtZW50LnBhcmVudEVsZW1lbnQgJiYgZWxlbWVudC5wYXJlbnRFbGVtZW50Lm5vZGVOYW1lICE9PSBcIkhUTUxcIikge1xuICAgICAgICAgICAgb2xkQ2xhc3NOYW1lID0gb2xkQ2xhc3NOYW1lLnRyaW0oKTtcbiAgICAgICAgICAgIG5ld0NsYXNzTmFtZSA9IG5ld0NsYXNzTmFtZS50cmltKCk7XG4gICAgICAgICAgICBET00ucmVtb3ZlQ2xhc3NOYW1lKGVsZW1lbnQsIG9sZENsYXNzTmFtZSk7XG4gICAgICAgICAgICBET00uYWRkQ2xhc3NOYW1lKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgZWxlbWVudCBieSB0YWcgbmFtZSBhbmQgaW5kZXhcbiAgICAgKiBAcGFyYW0gdG5cbiAgICAgKiBAcGFyYW0gZG9tRG9jdW1lbnRcbiAgICAgKiBAcGFyYW0gaW5kZXhcbiAgICAgKiBAcmV0dXJuIHtOb2RlfVxuICAgICAqL1xuXG5cbiAgICBET00uZ2V0RWxlbWVudEJ5VGFnTmFtZSA9IGZ1bmN0aW9uIGdldEVsZW1lbnRCeVRhZ05hbWUodG4pIHtcbiAgICAgICAgdmFyIGRvbURvY3VtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudDtcbiAgICAgICAgdmFyIGluZGV4ID0gYXJndW1lbnRzWzJdO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdG4gPT09IFwic3RyaW5nXCIgJiYgRE9NLmlzRE9NRG9jdW1lbnQoZG9tRG9jdW1lbnQpICYmIHR5cGVvZiBpbmRleCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgdmFyIGVscyA9IGRvbURvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHRuKTtcbiAgICAgICAgICAgIHJldHVybiBlbHNbaW5kZXhdIHx8IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IGxpbmUgaGVpZ2h0XG4gICAgICogQHJldHVybiB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBET00uZ2V0TGluZUhlaWdodCA9IGZ1bmN0aW9uIGdldExpbmVIZWlnaHQoKSB7XG4gICAgICAgIHZhciBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpO1xuICAgICAgICB2YXIgbGluZUhlaWdodCA9IHN0eWxlcy5saW5lSGVpZ2h0O1xuICAgICAgICB2YXIgbGluZUhlaWdodERpZyA9IHBhcnNlSW50KGxpbmVIZWlnaHQsIDEwKTtcbiAgICAgICAgdmFyIGZvbnRTaXplID0gc3R5bGVzLmZvbnRTaXplO1xuICAgICAgICB2YXIgZm9udFNpemVEaWcgPSBwYXJzZUludChmb250U2l6ZSwgMTApO1xuICAgICAgICBpZiAoaXNGaW5pdGUobGluZUhlaWdodERpZykpIHtcbiAgICAgICAgICAgIHJldHVybiBsaW5lSGVpZ2h0RGlnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZvbnRTaXplRGlnO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBET007XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERPTTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpYi9VdGlsc0RPTS50c1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBJbXBvcnQgYWRkaXRpb25hbCBjbGFzc2VzXG4gKi9cblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX1V0aWxzRE9NID0gcmVxdWlyZShcIi4vVXRpbHNET01cIik7XG5cbnZhciBfVXRpbHNET00yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNET00pO1xuXG52YXIgX1V0aWxzV2luZG93ID0gcmVxdWlyZShcIi4vVXRpbHNXaW5kb3dcIik7XG5cbnZhciBfVXRpbHNXaW5kb3cyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNXaW5kb3cpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgTW91c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTW91c2UoKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBNb3VzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm9ybWFsaXNlIG1vdXNlIGRlbHRhXG4gICAgICogQHBhcmFtIGVcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgTW91c2UuZ2V0V2hlZWxEZWx0YSA9IGZ1bmN0aW9uIGdldFdoZWVsRGVsdGEoZSkge1xuICAgICAgICBpZiAoZSAmJiAodHlwZW9mIGUgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihlKSkgPT09IFwib2JqZWN0XCIgJiYgKFwiZGV0YWlsXCIgaW4gZSB8fCBcIndoZWVsRGVsdGFcIiBpbiBlIHx8IFwid2hlZWxEZWx0YVlcIiBpbiBlIHx8IFwid2hlZWxEZWx0YVhcIiBpbiBlIHx8IFwiZGVsdGFZXCIgaW4gZSB8fCBcImRlbHRhWFwiIGluIGUgfHwgXCJheGlzXCIgaW4gZSB8fCBcImRlbHRhTW9kZVwiIGluIGUpKSB7XG4gICAgICAgICAgICB2YXIgZGVsdGEgPSB2b2lkIDA7XG4gICAgICAgICAgICB2YXIgZGVsdGFYID0gdm9pZCAwO1xuICAgICAgICAgICAgdmFyIGRlbHRhWSA9IHZvaWQgMDtcbiAgICAgICAgICAgIC8vIE9sZCBzY2hvb2wgc2Nyb2xsd2hlZWwgZGVsdGFcbiAgICAgICAgICAgIGlmIChcImRldGFpbFwiIGluIGUpIHtcbiAgICAgICAgICAgICAgICBkZWx0YVkgPSBlLmRldGFpbCAqIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFwid2hlZWxEZWx0YVwiIGluIGUpIHtcbiAgICAgICAgICAgICAgICBkZWx0YVkgPSBlLndoZWVsRGVsdGE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoXCJ3aGVlbERlbHRhWVwiIGluIGUpIHtcbiAgICAgICAgICAgICAgICBkZWx0YVkgPSBlLndoZWVsRGVsdGFZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFwid2hlZWxEZWx0YVhcIiBpbiBlKSB7XG4gICAgICAgICAgICAgICAgZGVsdGFYID0gZS53aGVlbERlbHRhWCAqIC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRmlyZWZveCA8IDE3IGhvcml6b250YWwgc2Nyb2xsaW5nIHJlbGF0ZWQgdG8gRE9NTW91c2VTY3JvbGwgZXZlbnRcbiAgICAgICAgICAgIGlmIChcImF4aXNcIiBpbiBlICYmIGUuYXhpcyA9PT0gZS5IT1JJWk9OVEFMX0FYSVMpIHtcbiAgICAgICAgICAgICAgICBkZWx0YVggPSBkZWx0YVkgKiAtMTtcbiAgICAgICAgICAgICAgICBkZWx0YVkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTmV3IHNjaG9vbCB3aGVlbCBkZWx0YSAod2hlZWwgZXZlbnQpXG4gICAgICAgICAgICBpZiAoXCJkZWx0YVlcIiBpbiBlKSB7XG4gICAgICAgICAgICAgICAgZGVsdGFZID0gZS5kZWx0YVkgKiAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcImRlbHRhWFwiIGluIGUpIHtcbiAgICAgICAgICAgICAgICBkZWx0YVggPSBlLmRlbHRhWDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE5lZWQgdG8gY29udmVydCBsaW5lcyBhbmQgcGFnZXMgdG8gcGl4ZWxzIGlmIHdlIGFyZW5cInQgYWxyZWFkeSBpbiBwaXhlbHNcbiAgICAgICAgICAgIC8vIFRoZXJlIGFyZSB0aHJlZSBkZWx0YSBtb2RlczpcbiAgICAgICAgICAgIC8vICAgKiBkZWx0YU1vZGUgMCBpcyBieSBwaXhlbHMsIG5vdGhpbmcgdG8gZG9cbiAgICAgICAgICAgIC8vICAgKiBkZWx0YU1vZGUgMSBpcyBieSBsaW5lc1xuICAgICAgICAgICAgLy8gICAqIGRlbHRhTW9kZSAyIGlzIGJ5IHBhZ2VzXG4gICAgICAgICAgICBpZiAoZS5kZWx0YU1vZGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluZUhlaWdodCA9IF9VdGlsc0RPTTIuZGVmYXVsdC5nZXRMaW5lSGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgZGVsdGFZID0gZGVsdGFZICogbGluZUhlaWdodDtcbiAgICAgICAgICAgICAgICBkZWx0YVggPSBkZWx0YVggKiBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlLmRlbHRhTW9kZSA9PT0gMikge1xuICAgICAgICAgICAgICAgIHZhciB3aW5kb3doZWdpaHQgPSBfVXRpbHNXaW5kb3cyLmRlZmF1bHQuZ2V0SGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgZGVsdGFZID0gZGVsdGFZICogd2luZG93aGVnaWh0O1xuICAgICAgICAgICAgICAgIGRlbHRhWCA9IGRlbHRhWCAqIHdpbmRvd2hlZ2lodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbHRhID0gZGVsdGFZID09PSAwID8gZGVsdGFYIDogZGVsdGFZO1xuICAgICAgICAgICAgcmV0dXJuIGRlbHRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gTW91c2U7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IE1vdXNlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGliL1V0aWxzTW91c2UudHNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBzY3JlZW5cbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgU2NyZWVuID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNjcmVlbigpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNjcmVlbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiBpbmZvXG4gICAgICogQHJldHVybiB7e2F2YWlsYWJsZVNpemU6IHtoZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn0sIGNvbG9yRGVwdGg6IG51bWJlciwgcGl4ZWxSYXRpbzogbnVtYmVyLCBzaXplOiB7aGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXJ9fX1cbiAgICAgKi9cbiAgICBTY3JlZW4uZ2V0SW5mbyA9IGZ1bmN0aW9uIGdldEluZm8oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhdmFpbGFibGVTaXplOiBTY3JlZW4uZ2V0QXZhaWxhYmxlU2l6ZXMoKSxcbiAgICAgICAgICAgIGNvbG9yRGVwdGg6IFNjcmVlbi5nZXRDb2xvckRlcHRoKCksXG4gICAgICAgICAgICBwaXhlbFJhdGlvOiBTY3JlZW4uZ2V0UGl4ZWxSYXRpbygpLFxuICAgICAgICAgICAgc2l6ZTogU2NyZWVuLmdldFNpemVzKClcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gaGVpZ2h0XG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgU2NyZWVuLmdldEhlaWdodCA9IGZ1bmN0aW9uIGdldEhlaWdodCgpIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbi5oZWlnaHQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2NyZWVuIHdpZHRoXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgU2NyZWVuLmdldFdpZHRoID0gZnVuY3Rpb24gZ2V0V2lkdGgoKSB7XG4gICAgICAgIHJldHVybiBzY3JlZW4ud2lkdGg7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2NyZWVuIHNpemVzXG4gICAgICogQHJldHVybiB7e2hlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyfX1cbiAgICAgKi9cblxuXG4gICAgU2NyZWVuLmdldFNpemVzID0gZnVuY3Rpb24gZ2V0U2l6ZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWlnaHQ6IFNjcmVlbi5nZXRIZWlnaHQoKSxcbiAgICAgICAgICAgIHdpZHRoOiBTY3JlZW4uZ2V0V2lkdGgoKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiBoZWlnaHRcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuXG5cbiAgICBTY3JlZW4uZ2V0QXZhaWxhYmxlSGVpZ2h0ID0gZnVuY3Rpb24gZ2V0QXZhaWxhYmxlSGVpZ2h0KCkge1xuICAgICAgICByZXR1cm4gc2NyZWVuLmF2YWlsSGVpZ2h0O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiB3aWR0aFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRBdmFpbGFibGVXaWR0aCA9IGZ1bmN0aW9uIGdldEF2YWlsYWJsZVdpZHRoKCkge1xuICAgICAgICByZXR1cm4gc2NyZWVuLmF2YWlsV2lkdGg7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBHZXQgc2NyZWVuIHNpemVzXG4gICAgICogQHJldHVybiB7e2hlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyfX1cbiAgICAgKi9cblxuXG4gICAgU2NyZWVuLmdldEF2YWlsYWJsZVNpemVzID0gZnVuY3Rpb24gZ2V0QXZhaWxhYmxlU2l6ZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWlnaHQ6IFNjcmVlbi5nZXRBdmFpbGFibGVIZWlnaHQoKSxcbiAgICAgICAgICAgIHdpZHRoOiBTY3JlZW4uZ2V0QXZhaWxhYmxlV2lkdGgoKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiBwaXhlbCByYXRpb1xuICAgICAqIEByZXR1cm4ge251bWJlcn1cbiAgICAgKi9cblxuXG4gICAgU2NyZWVuLmdldFBpeGVsUmF0aW8gPSBmdW5jdGlvbiBnZXRQaXhlbFJhdGlvKCkge1xuICAgICAgICB2YXIgcmF0aW8gPSAxO1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5zY3JlZW4uc3lzdGVtWERQSSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2Ygd2luZG93LnNjcmVlbi5sb2dpY2FsWERQSSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuc2NyZWVuLnN5c3RlbVhEUEkgPiB3aW5kb3cuc2NyZWVuLmxvZ2ljYWxYRFBJKSB7XG4gICAgICAgICAgICByYXRpbyA9IHdpbmRvdy5zY3JlZW4uc3lzdGVtWERQSSAvIHdpbmRvdy5zY3JlZW4ubG9naWNhbFhEUEk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICByYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByYXRpbztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEdldCBzY3JlZW4gY29sb3IgZGVwdGhcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG5cblxuICAgIFNjcmVlbi5nZXRDb2xvckRlcHRoID0gZnVuY3Rpb24gZ2V0Q29sb3JEZXB0aCgpIHtcbiAgICAgICAgcmV0dXJuIHNjcmVlbi5jb2xvckRlcHRoO1xuICAgIH07XG5cbiAgICByZXR1cm4gU2NyZWVuO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTY3JlZW47XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvVXRpbHNTY3JlZW4udHNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSAyIDMiLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBzeXN0ZW1cbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgU3lzdGVtID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN5c3RlbSgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN5c3RlbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHN5c3RlbSBpbmZvXG4gICAgICogQHJldHVybiB7e25hbWU6IHN0cmluZywgdmVyc2lvbjogc3RyaW5nfX1cbiAgICAgKi9cbiAgICBTeXN0ZW0uZ2V0SW5mbyA9IGZ1bmN0aW9uIGdldEluZm8oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lOiBTeXN0ZW0uZ2V0TmFtZSgpLFxuICAgICAgICAgICAgdmVyc2lvbjogU3lzdGVtLmdldFZlcnNpb24oKVxuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IE9TIG5hbWVcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIFN5c3RlbS5nZXROYW1lID0gZnVuY3Rpb24gZ2V0TmFtZSgpIHtcbiAgICAgICAgdmFyIG9zID0gXCJcIjtcbiAgICAgICAgdmFyIGNsaWVudFN0cmluZ3MgPSBbe1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDEwLjB8V2luZG93cyBOVCAxMC4wKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgMTBcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKFdpbmRvd3MgOC4xfFdpbmRvd3MgTlQgNi4zKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgOC4xXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDh8V2luZG93cyBOVCA2LjIpLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyA4XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDd8V2luZG93cyBOVCA2LjEpLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyA3XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL1dpbmRvd3MgTlQgNi4wLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyBWaXN0YVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9XaW5kb3dzIE5UIDUuMi8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgU2VydmVyIDIwMDNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKFdpbmRvd3MgTlQgNS4xfFdpbmRvd3MgWFApLyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyBYUFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oV2luZG93cyBOVCA1LjB8V2luZG93cyAyMDAwKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgMjAwMFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oV2luIDl4IDQuOTB8V2luZG93cyBNRSkvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIE1FXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIDk4fFdpbjk4KS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgOThcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvKFdpbmRvd3MgOTV8V2luOTV8V2luZG93c185NSkvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIDk1XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS8sXG4gICAgICAgICAgICBzOiBcIldpbmRvd3MgTlQgNC4wXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL1dpbmRvd3MgQ0UvLFxuICAgICAgICAgICAgczogXCJXaW5kb3dzIENFXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL1dpbjE2LyxcbiAgICAgICAgICAgIHM6IFwiV2luZG93cyAzLjExXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL0FuZHJvaWQvLFxuICAgICAgICAgICAgczogXCJBbmRyb2lkXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogL09wZW5CU0QvLFxuICAgICAgICAgICAgczogXCJPcGVuIEJTRFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9TdW5PUy8sXG4gICAgICAgICAgICBzOiBcIlN1biBPU1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8oTGludXh8WDExKS8sXG4gICAgICAgICAgICBzOiBcIkxpbnV4XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhpUGhvbmV8aVBhZHxpUG9kKS8sXG4gICAgICAgICAgICBzOiBcImlPU1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9NYWMgT1MgWC8sXG4gICAgICAgICAgICBzOiBcIk1hYyBPUyBYXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcjogLyhNYWNQUEN8TWFjSW50ZWx8TWFjX1Bvd2VyUEN8TWFjaW50b3NoKS8sXG4gICAgICAgICAgICBzOiBcIk1hYyBPU1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC9RTlgvLFxuICAgICAgICAgICAgczogXCJRTlhcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvVU5JWC8sXG4gICAgICAgICAgICBzOiBcIlVOSVhcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvQmVPUy8sXG4gICAgICAgICAgICBzOiBcIkJlT1NcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByOiAvT1NcXC8yLyxcbiAgICAgICAgICAgIHM6IFwiT1MvMlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHI6IC8obnVoa3xHb29nbGVib3R8WWFtbXlib3R8T3BlbmJvdHxTbHVycHxNU05Cb3R8QXNrIEplZXZlc1xcL1Rlb21hfGlhX2FyY2hpdmVyKS8sXG4gICAgICAgICAgICBzOiBcIlNlYXJjaCBCb3RcIlxuICAgICAgICB9XTtcbiAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gY2xpZW50U3RyaW5ncywgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvciksIF9pID0gMCwgX2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcbiAgICAgICAgICAgIHZhciBfcmVmO1xuXG4gICAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgX3JlZiA9IF9pdGVyYXRvcltfaSsrXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX2kgPSBfaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcbiAgICAgICAgICAgICAgICBfcmVmID0gX2kudmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjcyA9IF9yZWY7XG5cbiAgICAgICAgICAgIGlmIChjcy5yLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgICAgICAgICBvcyA9IGNzLnM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9zO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogR2V0IE9TIHZlcnNpb25cbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAgICovXG5cblxuICAgIFN5c3RlbS5nZXRWZXJzaW9uID0gZnVuY3Rpb24gZ2V0VmVyc2lvbigpIHtcbiAgICAgICAgdmFyIG9zID0gU3lzdGVtLmdldE5hbWUoKTtcbiAgICAgICAgdmFyIG9zVmVyc2lvbiA9IFwiXCI7XG4gICAgICAgIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcbiAgICAgICAgICAgIG9zVmVyc2lvbiA9IC9XaW5kb3dzICguKikvLmV4ZWMob3MpWzFdO1xuICAgICAgICAgICAgb3MgPSBcIldpbmRvd3NcIjtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKG9zKSB7XG4gICAgICAgICAgICBjYXNlIFwiTWFjIE9TIFhcIjpcbiAgICAgICAgICAgICAgICBvc1ZlcnNpb24gPSAvTWFjIE9TIFggKDEwWy5fXFxkXSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIkFuZHJvaWRcIjpcbiAgICAgICAgICAgICAgICBvc1ZlcnNpb24gPSAvQW5kcm9pZCAoWy5fXFxkXSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImlPU1wiOlxuICAgICAgICAgICAgICAgIHZhciByZWcgPSAvT1MgKFxcZCspXyhcXGQrKV8/KFxcZCspPy8uZXhlYyhuYXZpZ2F0b3IuYXBwVmVyc2lvbik7XG4gICAgICAgICAgICAgICAgb3NWZXJzaW9uID0gcmVnWzFdICsgXCIuXCIgKyByZWdbMl0gKyBcIi5cIiArIChyZWdbM10gfHwgMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvc1ZlcnNpb247XG4gICAgfTtcblxuICAgIHJldHVybiBTeXN0ZW07XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN5c3RlbTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2xpYi9VdGlsc1N5c3RlbS50c1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBDbGFzcyBmb3Igd29ya2luZyB3aXRoIHVzZXJcbiAqL1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX1V0aWxzQnJvd3NlciA9IHJlcXVpcmUoXCIuL1V0aWxzQnJvd3NlclwiKTtcblxudmFyIF9VdGlsc0Jyb3dzZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNCcm93c2VyKTtcblxudmFyIF9VdGlsc1NjcmVlbiA9IHJlcXVpcmUoXCIuL1V0aWxzU2NyZWVuXCIpO1xuXG52YXIgX1V0aWxzU2NyZWVuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzU2NyZWVuKTtcblxudmFyIF9VdGlsc1N5c3RlbSA9IHJlcXVpcmUoXCIuL1V0aWxzU3lzdGVtXCIpO1xuXG52YXIgX1V0aWxzU3lzdGVtMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzU3lzdGVtKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFVzZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVXNlcigpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFVzZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB1c2VyIGluZm9cbiAgICAgKiBAcmV0dXJuIHt7YnJvd3Nlcjoge2Jyb3dzZXI6IHN0cmluZywgbW9iaWxlOiBib29sZWFuLCB2ZXJzaW9uOiBzdHJpbmd9LCBzY3JlZW46IHthdmFpbGFibGVTaXplOiB7aGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXJ9LCBjb2xvckRlcHRoOiBudW1iZXIsIHBpeGVsUmF0aW86IG51bWJlciwgc2l6ZToge2hlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyfX0sIHN5c3RlbToge25hbWU6IHN0cmluZywgdmVyc2lvbjogc3RyaW5nfX19XG4gICAgICovXG4gICAgVXNlci5nZXRJbmZvID0gZnVuY3Rpb24gZ2V0SW5mbygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJyb3dzZXI6IF9VdGlsc0Jyb3dzZXIyLmRlZmF1bHQuZ2V0SW5mbygpLFxuICAgICAgICAgICAgc2NyZWVuOiBfVXRpbHNTY3JlZW4yLmRlZmF1bHQuZ2V0SW5mbygpLFxuICAgICAgICAgICAgc3lzdGVtOiBfVXRpbHNTeXN0ZW0yLmRlZmF1bHQuZ2V0SW5mbygpXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiBVc2VyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBVc2VyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbGliL1V0aWxzVXNlci50c1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyJdLCJzb3VyY2VSb290IjoiIn0=

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uPzVjYTYqKiIsIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzg0MDMyMmUwOTAxNWVhMTAzOWM/NjA5NSoqIiwid2VicGFjazovLy8uL2xpYi9WaWV3QWJpbGl0eS50cz8yMWMxKiIsIndlYnBhY2s6Ly8vLi9+L0FuaW1hdGlvbkZyYW1lL2xpYi9BbmltYXRpb25GcmFtZS5qcz80ZjAxKiIsIndlYnBhY2s6Ly8vLi9+L1V0aWxzL2xpYi9VdGlscy5qcz80YjYwKiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTs7QUFFQTs7QUFFQSxxR0FBb0csbUJBQW1CLEVBQUUsbUJBQW1CLDhIQUE4SDs7QUFFMVE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsdUNBQXNDLHVDQUF1QyxnQkFBZ0I7O0FBRTdGLGtEQUFpRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXZKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXNCLE9BQU87QUFDN0IsdUJBQXNCLE9BQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQSxlQUFjO0FBQ2Q7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7O0FBRUE7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbURBQWtELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFeEo7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQSxXQUFVO0FBQ1Y7QUFDQSxXQUFVO0FBQ1Y7QUFDQSxXQUFVO0FBQ1Y7QUFDQSxXQUFVO0FBQ1Y7QUFDQSxXQUFVO0FBQ1Y7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBLFdBQVU7QUFDVjtBQUNBLFdBQVU7QUFDVjtBQUNBLFdBQVU7QUFDVjtBQUNBLFdBQVU7QUFDVjtBQUNBLFdBQVU7QUFDVjtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjs7O0FBR0E7QUFDQTtBQUNBLDZCQUE0QjtBQUM1Qix3SkFBdUo7QUFDdko7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDRDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsUUFBUTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFF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QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFrQjtBQUNsQjs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7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Q0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0EsV0FBVTtBQUNWLDRKQUEySjtBQUMzSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7O0FBRUEsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsd0NBQXVDLHVDQUF1QyxnQkFBZ0I7O0FBRTlGLG1EQUFrRCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRXhKO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBa0IsVUFBVSxrREFBa0QsV0FBVyxnQkFBZ0IsOEJBQThCLGlEQUFpRCwrQkFBK0IsV0FBVztBQUNsTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EsNENBQTJDLGNBQWMsdXMxTCIsImZpbGUiOiIuL2xpYi9WaWV3QWJpbGl0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiVmlld0FiaWxpdHlcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiVmlld0FiaWxpdHlcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiVmlld0FiaWxpdHlcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYzg0MDMyMmUwOTAxNWVhMTAzOWMiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX0FuaW1hdGlvbkZyYW1lID0gcmVxdWlyZShcIkFuaW1hdGlvbkZyYW1lXCIpO1xuXG52YXIgX0FuaW1hdGlvbkZyYW1lMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FuaW1hdGlvbkZyYW1lKTtcblxudmFyIF9VdGlscyA9IHJlcXVpcmUoXCJVdGlsc1wiKTtcblxudmFyIF9VdGlsczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlscyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8qKlxuICogQGNsYXNzXG4gKlxuICogQG5hbWUgVmlld2FiaWxpdHlcbiAqXG4gKiBAc3VtbWFyeSDQmtC70LDRgdGBINC00LvRjyDQvtGG0LXQvdC60Lgg0L/QvtC60LDQt9CwINCx0LDQvdC90LXRgNC+0LJcbiAqXG4gKiBAZGVzY3JpcHRpb24g0JrQu9Cw0YHRgSDQv9GA0LjQvdC40LzQsNC10YIgSUQg0LjQu9C4IERPTSDRjdC70LXQvNC10L3RgiDQuCDQt9Cw0L/Rg9GB0LrQsNC10YIgd2F0Y2hlciDQutC+0YLQvtGA0YvQuSDQv9GA0L7QstC10YDRj9C10YIg0LLQuNC00LjQvNC+0YHRgtGMINGN0LvQtdC80LXQvdGC0LBcbiAqINC60LDQuiDRgtCw0LrQvtCy0L7Qs9C+LCDRh9GC0L4g0L7QvSDQuNC70Lgg0LXQs9C+INGA0L7QtNC40YLQtdC70Lgg0L3QtSDRgdC60YDRi9GC0YssINGH0YLQviDQvtC9INC10YHRgtGMINCyINC00L7QutGD0LzQtdC90YLQtSDQuCDRgi7QtC4g0JfQsNGC0LXQvCwg0LTQu9GPINCy0LjQtNC40LzRi9GFINGN0LvQtdC80LXQvdGC0L7QsixcbiAqINGA0LDRgdGB0YfQuNGC0YvQstCw0LXRgtGB0Y8g0L/RgNC+0YbQtdC90YIg0LLQuNC00LjQvNC+0Lkg0L7QsdC70LDRgdGC0Lgg0L7RgiAwINC00L4gMS4g0JXRgdC70Lgg0L/RgNC+0YbQtdC90YIg0LLQuNC00LjQvNC+0Lkg0L7QsdC70LDRgdGC0Lgg0LHQvtC70YzRiNC1IHBlcmNlbnRhZ2Ug0LjQtyBvYmpTZXR0aW5nLFxuICog0YLQvtCz0LTQsCDQt9Cw0L/Rg9GB0LrQsNC10YLRgdGPINC+0YLRgdGH0LXRgiDRgtCw0LnQvNC10YDQsC5cbiAqINCV0YHQu9C4INC/0YDQvtGG0LXQvdGCINCy0LjQtNC40LzQvtC5INC+0LHQu9Cw0YHRgtC4INGB0YLQsNC7INC80LXQvdGM0YjQtSDQv9C+0YDQvtCz0L7QstC+0LPQviDQt9C90LDRh9C10L3QuNGPLCDRgtC+INGC0LDQudC80LXRgCDQvtGC0LrQu9GO0YfQsNC10YLRgdGPLiDQmtCw0Log0YLQvtC70YzQutC+INGC0LDQudC80LXRgCDQv9GA0LXQstGL0YjQsNC10YIg0L/QvlxuICog0LLRgNC10LzQtdC90LggdGltZSDQuNC3IG9ialNldHRpbmcg0LLRi9C30YvQstCw0LXRgtGB0Y8gZnVuQ2FsbEJhY2sg0Lggd2F0Y2hlciDRg9Cx0LjQstCw0LXRgtGB0Y8uXG4gKlxuICog0JXRgdC70Lgg0LIg0LrQu9Cw0YHRgSDQv9C10YDQtdC00LDQvSBJRCwg0LAg0L3QtSBET00g0Y3Qu9C10LzQtdC90YIsINGC0L4g0LrQu9Cw0YHRgSDRgdCw0Lwg0L/Ri9GC0LDQtdGC0YHRjyDQvdCw0LnRgtC4INGC0LDQutC+0Lkg0Y3Qu9C10LzQtdC90YIg0LIgRE9NLiDQldGB0LvQuCDRjdC70LXQvNC10L3RgtCwINC90LXRgiwg0YLQvlxuICog0LLQtdGI0LDQtdGC0YHRjyB3YXRjaGVyLCDQutC+0YLQvtGA0YvQuSDQv9GL0YLQsNC10YLRgdGPINC90LDQudGC0Lgg0Y3Qu9C10LzQtdC90YIg0YHQv9GD0YHRgtGPINC60LDQutC+0LUt0YLQviDQstGA0LXQvNGPLiDQrdGC0L4g0L/QvtC30LLQvtC70Y/QtdGCINC/0L7QstC10YHQuNGC0Ywgd2F0Y2hlciDQtNC70Y8g0Y3Qu9C10LzQtdC90YLQvtCyLFxuICog0LrQvtGC0L7RgNGL0YUg0LXRidC1INC90LXRgiDQsiBET00g0Lgg0LrQvtGC0L7RgNGL0LUg0L/QvtGP0LLRj9GC0YHRjyDQv9C+0YLQvtC8LlxuICpcbiAqINCV0YHQu9C4INCyINC60LvQsNGB0YEg0L/QtdGA0LXQtNCw0L0gRE9NINGN0LvQtdC80LXQvdGCLCDRgtC+INCyINC/0LDRgNCw0LzQtdGC0YDRiyDQt9Cw0L/QuNGB0YvQstCw0LXRgtGB0Y8g0LjQu9C4INC10LPQviBJRCDQuNC70Lgg0YHQs9C10L3QtdGA0LjRgNC+0LLQsNC90L3Ri9C5IElEINC00LvRjyDQtNCw0LvRjNC90LXQudGI0LXQuVxuICog0L7QsdGA0LDQsdC+0YLQutC4LlxuICogSUQg0YLQsNC60LbQtSDQv9C10YDQtdC00LDQtdGC0YHRjyDQsiBmdW5DYWxsQmFjay5cbiAqXG4gKiBAcGFyYW0gZG9tRWxlbWVudCB7T2JqZWN0fSAtINCt0LvQtdC80LXQvdGCIERPTSDQuNC70LggSURcbiAqIEBwYXJhbSBvYmpTZXR0aW5nIHtPYmplY3R9IC0g0J7QsdGK0LXQutGCINGBINC/0LDRgNCw0LzQtdGC0YDQsNC80Lgg0L7RgtGB0LvQtdC20LjQstCw0L3QuNGPINCy0LjQtNCwXG4gKiB7XG4gKiAgcGVyY2VudGFnZTogMC41LCAtINCf0YDQvtGG0LXQvdGCINCy0LjQtNC40LzQvtC5INGH0LDRgdGC0Lgg0LHQsNC90L3QtdGA0LAsINC/0YDQuCDQutC+0YLQvtGA0L7QuSDQvtC9INCx0YPQtNC10YIg0LfQsNGB0YfQuNGC0LDQvSAo0L7RgiAwINC00L4gMSlcbiAqICB0aW1lOiAxMDAwIC0g0JLRgNC10LzRjyDQsiDRgtC10YfQtdC90LjQuCDQutC+0YLQvtGA0L7Qs9C+INC00L7Qu9C20L3QsCDQsdGL0YLRjCDQstC40LTQvdCwINCy0LjQtNC40LzQsNGPINGH0LDRgdGC0Ywg0LHQsNC90L3QtdGA0LAgKNCyINC80LjQu9C70LjRgdC10LrRg9C90LTQsNGFINC+0YIgMCDQtNC+IDYwIDAwMClcbiAqIH1cbiAqIEBwYXJhbSBmdW5DYWxsQmFjayB7RnVuY3Rpb259IC0g0KTRg9C90LrRhtC40Y8gQ2FsbGJhY2ssINC60L7RgtC+0YDQsNGPINCy0YvQt9GL0LLQsNC10YLRgdGPINC/0L7RgdC70LUg0YLQvtCz0L4g0LrQsNC6INC/0L7Qu9GM0LfQvtCy0LDRgtC10LvRjCDRg9Cy0LjQtNC10Lsg0L7Qv9GA0LXQtNC10LvQtdC90L3Rg9GOXG4gKiDRh9Cw0YHRgtGMINCx0LDQvdC10YDQsCDQvtC/0YDQtdC00LXQu9C10L3QvdC+0LUg0LLRgNC10LzRj1xuICovXG52YXIgVmlld0FiaWxpdHkgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBJbml0XG4gICAqIEBwYXJhbSBkb21FbGVtZW50XG4gICAqIEBwYXJhbSBvYmpTZXR0aW5nXG4gICAqIEBwYXJhbSBmdW5DYWxsQmFja1xuICAgKi9cbiAgZnVuY3Rpb24gVmlld0FiaWxpdHkoZG9tRWxlbWVudCwgb2JqU2V0dGluZykge1xuICAgIHZhciBmdW5DYWxsQmFjayA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZnVuY3Rpb24gKCkge307XG5cbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVmlld0FiaWxpdHkpO1xuXG4gICAgLyoqXG4gICAgICog0JXRgdC70Lgg0L/QtdGA0LXQtNCw0L0gRE9NINGN0LvQtdC80LXQvdGCXG4gICAgICovXG4gICAgaWYgKGRvbUVsZW1lbnQgJiYgKHR5cGVvZiBkb21FbGVtZW50ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoZG9tRWxlbWVudCkpID09PSBcIm9iamVjdFwiICYmIGRvbUVsZW1lbnQubm9kZVR5cGUgPT09IDEgJiYgZG9tRWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIGRvbUVsZW1lbnQucGFyZW50RWxlbWVudC5ub2RlTmFtZSAhPT0gXCJIVE1MXCIpIHtcbiAgICAgIGRvbUVsZW1lbnQuaWQgPSB0aGlzLklEID0gZG9tRWxlbWVudC5pZCB8fCBWaWV3QWJpbGl0eS5nZXRJRCgpO1xuICAgIH0gZWxzZSBpZiAoZG9tRWxlbWVudCAmJiB0eXBlb2YgZG9tRWxlbWVudCA9PT0gXCJzdHJpbmdcIiAmJiBkb21FbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuSUQgPSBkb21FbGVtZW50LnRvU3RyaW5nKCk7XG4gICAgICBkb21FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJcIiArIHRoaXMuSUQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb21FbGVtZW50ID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICog0JXRgdC70Lgg0LLRgtC+0YDRi9C8INC/0LDRgNCw0LzQtdGC0YDQvtC8INC/0LXRgNC10LTQsNC90Ysg0L3QtSDQv9Cw0YDQsNC80LXRgtGA0YtcbiAgICAgKi9cbiAgICBpZiAoIW9ialNldHRpbmcgfHwgKHR5cGVvZiBvYmpTZXR0aW5nID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqU2V0dGluZykpICE9PSBcIm9iamVjdFwiKSB7XG4gICAgICBvYmpTZXR0aW5nID0ge1xuICAgICAgICBwZXJjZW50YWdlOiAwLjUsXG4gICAgICAgIHRpbWU6IDEwMDBcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8qKlxuICAgICAgICog0J/QsNGA0YHQuNC8INC/0YDQvtGG0LXQvdGCINCy0LjQtNC10LzQvtC5INGH0LDRgdGC0Lgg0Lgg0L/RgNC40YHQstCw0LjQstCw0LXQvCDQt9C90LDRh9C10L3QuNC1INC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOLCDQtdGB0LvQuCDQv9C10YDQtdC00LDQvdC+XG4gICAgICAgKiDQvdC1INCy0LDQu9C40LTQvdC+0LUg0LfQvdCw0YfQtdC90LjQtVxuICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAqL1xuICAgICAgaWYgKG9ialNldHRpbmcucGVyY2VudGFnZSkge1xuICAgICAgICBvYmpTZXR0aW5nLnBlcmNlbnRhZ2UgPSBwYXJzZUZsb2F0KG9ialNldHRpbmcucGVyY2VudGFnZSk7XG4gICAgICAgIGlmIChvYmpTZXR0aW5nLnBlcmNlbnRhZ2UpIHtcbiAgICAgICAgICBvYmpTZXR0aW5nLnBlcmNlbnRhZ2UgPSBvYmpTZXR0aW5nLnBlcmNlbnRhZ2UgPCAwID8gMCA6IG9ialNldHRpbmcucGVyY2VudGFnZTtcbiAgICAgICAgICBvYmpTZXR0aW5nLnBlcmNlbnRhZ2UgPSBvYmpTZXR0aW5nLnBlcmNlbnRhZ2UgPiAxID8gMSA6IG9ialNldHRpbmcucGVyY2VudGFnZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYmpTZXR0aW5nLnBlcmNlbnRhZ2UgPSAwLjU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialNldHRpbmcucGVyY2VudGFnZSA9IDAuNTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICog0J/QsNGA0YHQuNC8INCy0YDQtdC80Y8g0LLQuNC00LjQvNC+0YHRgtC4INC4INC/0YDQuNGB0LLQsNC40LLQsNC10Lwg0LfQvdCw0YfQtdC90LjQtSDQv9C+INGD0LzQvtC70YfQsNC90LjRjiwg0LXRgdC70Lgg0L/QtdGA0LXQtNCw0L3QviDQvdC1INCy0LDQu9C40LTQvdC+0LUg0LfQvdCw0YfQtdC90LjQtVxuICAgICAgICogQHR5cGUge051bWJlcn1cbiAgICAgICAqL1xuICAgICAgaWYgKG9ialNldHRpbmcudGltZSkge1xuICAgICAgICBvYmpTZXR0aW5nLnRpbWUgPSBwYXJzZUludChvYmpTZXR0aW5nLnRpbWUsIDEwKTtcbiAgICAgICAgaWYgKG9ialNldHRpbmcudGltZSkge1xuICAgICAgICAgIG9ialNldHRpbmcudGltZSA9IG9ialNldHRpbmcudGltZSA8IDAgPyAwIDogb2JqU2V0dGluZy50aW1lO1xuICAgICAgICAgIG9ialNldHRpbmcudGltZSA9IG9ialNldHRpbmcudGltZSA+IDYwMDAwID8gNjAwMDAgOiBvYmpTZXR0aW5nLnRpbWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqU2V0dGluZy50aW1lID0gMTAwMDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JqU2V0dGluZy50aW1lID0gMTAwMDtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog0J/RgNC+0LLQtdGA0Y/QtdC8LCDRh9GC0L4g0LIg0LrQsNGH0LXRgdGC0LLQtSDQutC+0LvQsdC10LrQsCDQv9C10YDQtdC00LDQvdCwINGE0YPQvdC60YbQuNGPXG4gICAgICovXG4gICAgaWYgKCFmdW5DYWxsQmFjayB8fCB0eXBlb2YgZnVuQ2FsbEJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgZnVuQ2FsbEJhY2sgPSBmdW5jdGlvbiBmdW5DYWxsQmFjayhJRCkge307XG4gICAgfVxuICAgIC8qKlxuICAgICAqINCV0YHQu9C4IERPTSDRjdC70LXQvNC10L3RgiDQv9C10YDQtdC00LDQvSDQuNC70Lgg0L3QsNC50LTQtdC9XG4gICAgICovXG4gICAgaWYgKChkb21FbGVtZW50IHx8IHR5cGVvZiB0aGlzLklEID09PSBcInN0cmluZ1wiKSAmJiAodHlwZW9mIG9ialNldHRpbmcgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmpTZXR0aW5nKSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9ialNldHRpbmcucGVyY2VudGFnZSA9PT0gXCJudW1iZXJcIiAmJiB0eXBlb2Ygb2JqU2V0dGluZy50aW1lID09PSBcIm51bWJlclwiICYmIHR5cGVvZiBmdW5DYWxsQmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAvKipcbiAgICAgICAqINCf0L7QtNC/0LjRgdC60Lgg0L3QsCDRgdC+0LHRi9GC0LjRjyDQvtC60L3QsFxuICAgICAgICovXG4gICAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgVmlld0FiaWxpdHkucmVzaXplRXZlbnQpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIFZpZXdBYmlsaXR5LnJlc2l6ZUV2ZW50KTtcbiAgICAgIH0gZWxzZSBpZiAod2luZG93LmF0dGFjaEV2ZW50KSB7XG4gICAgICAgIHdpbmRvdy5hdHRhY2hFdmVudChcIm9ucmVzaXplXCIsIFZpZXdBYmlsaXR5LnJlc2l6ZUV2ZW50KTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICog0KXQsNC6INC00LvRjyDRgNGD0YfQvdC+0LPQviDRgdCx0YDQvtGB0LAg0YDQtdGB0LDQudC30L3QvtCz0L4g0LrQtdGI0LAg0YDQsNC3INCyINGB0LXQutC60YPQvdC00YMsINC90LAg0LLRgdGP0LrQuNC5INGB0LvRg9GH0LDQuVxuICAgICAgICovXG4gICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIFZpZXdBYmlsaXR5LnJlc2l6ZUV2ZW50KCk7XG4gICAgICB9LCAxMDAwKTtcbiAgICAgIC8qKlxuICAgICAgICog0KDRg9GH0L3QvtC5INGB0L3QvtGBINC60LXRiNCwINC00LvRjyDQv9C10YDQtdC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4INC/0LXRgNC10LzQtdC90L3Ri9GFINC60LXRiNCwXG4gICAgICAgKi9cbiAgICAgIFZpZXdBYmlsaXR5LnJlc2l6ZUV2ZW50KCk7XG4gICAgICAvKipcbiAgICAgICAqINCX0LDQtNCw0LXQvCDQv9Cw0YDQsNC80LXRgtGA0Ysg0Lgg0L3QsNGH0LjQvdCw0LXQvCDQvtGC0YHQu9C10LbQuNCy0LDRgtGMXG4gICAgICAgKi9cbiAgICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG4gICAgICB0aGlzLm9ialNldHRpbmcgPSBvYmpTZXR0aW5nO1xuICAgICAgdGhpcy5mdW5DYWxsQmFjayA9IGZ1bkNhbGxCYWNrO1xuICAgICAgdGhpcy5ib29UaW1lckZsYWcgPSBmYWxzZTtcbiAgICAgIHRoaXMud2F0Y2hJRCA9IF9BbmltYXRpb25GcmFtZTIuZGVmYXVsdC5zdWJzY3JpYmUodGhpcywgdGhpcy53YXRjaCwgW10pO1xuICAgICAgX1V0aWxzMi5kZWZhdWx0LmltcGxlbWVudGF0aW9uU3RhdGljTWV0aG9kcyh0aGlzLCBcIlZpZXdBYmlsaXR5XCIpO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICog0KHQvtCx0YvRgtC40LUg0YDQtdGB0LDQudC30LAg0LTQu9GPINGB0LHRgNC+0YHQsCDQstGA0LXQvNC10L3QvdGL0YUg0LrQtdGI0LXQsiDRgNCw0LfQvNC10YDQvtCyINC+0LrQvdCwLCDQtNC+0LrRg9C80LXQvdGC0LAg0Lgg0LLRi9GB0YfQuNGC0LDQvdC90YvRhSDRgdGC0LjQu9C10Lkg0Y3Qu9C10LzQtdC90YLQvtCyXG4gICAqL1xuXG5cbiAgVmlld0FiaWxpdHkucmVzaXplRXZlbnQgPSBmdW5jdGlvbiByZXNpemVFdmVudCgpIHtcbiAgICBWaWV3QWJpbGl0eS5udW1Eb2N1bWVudFdpZHRoID0gZmFsc2U7XG4gICAgVmlld0FiaWxpdHkubnVtRG9jdW1lbnRIZWlnaHQgPSBmYWxzZTtcbiAgICBWaWV3QWJpbGl0eS5udW1XaW5kb3dXaWR0aCA9IGZhbHNlO1xuICAgIFZpZXdBYmlsaXR5Lm51bVdpbmRvd0hlaWdodCA9IGZhbHNlO1xuICAgIFZpZXdBYmlsaXR5LmFyckRvbVN0eWxlID0gW107XG4gIH07XG5cbiAgLyoqXG4gICAqINCc0LXRgtC+0LQg0LTQu9GPINCz0LXQvdC10YDQsNGG0LjQuCBVSURcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIFZpZXdBYmlsaXR5LmdldElEID0gZnVuY3Rpb24gZ2V0SUQoKSB7XG4gICAgcmV0dXJuIFwidl9cIiArIERhdGUubm93KCkgKyBcIl9cIiArIH5+KE1hdGgucmFuZG9tKCkgKiAxZTYpO1xuICB9O1xuXG4gIC8qKlxuICAgKiDQoNCw0YHRh9C10YIg0YHRgtC40LvQtdC5INGN0LvQtdC80LXQvdGC0LBcbiAgICogQHBhcmFtIGRvbU5vZGVcbiAgICogQHJldHVybnMge0NTU1N0eWxlRGVjbGFyYXRpb259XG4gICAqL1xuICBWaWV3QWJpbGl0eS5nZXRDb21wdXRlZFN0eWxlID0gZnVuY3Rpb24gZ2V0Q29tcHV0ZWRTdHlsZShkb21Ob2RlKSB7XG4gICAgaWYgKCFkb21Ob2RlLnZpZXdhYmlsaXR5IHx8ICFWaWV3QWJpbGl0eS5hcnJEb21TdHlsZVtkb21Ob2RlLnZpZXdhYmlsaXR5XSkge1xuICAgICAgaWYgKCFkb21Ob2RlLnZpZXdhYmlsaXR5KSB7XG4gICAgICAgIGRvbU5vZGUudmlld2FiaWxpdHkgPSB0aGlzLmdldElEKCk7XG4gICAgICB9XG4gICAgICBWaWV3QWJpbGl0eS5hcnJEb21TdHlsZVtkb21Ob2RlLnZpZXdhYmlsaXR5XSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvbU5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gVmlld0FiaWxpdHkuYXJyRG9tU3R5bGVbZG9tTm9kZS52aWV3YWJpbGl0eV07XG4gIH07XG5cbiAgLyoqXG4gICAqINCe0L/RgNC10LTQtdC70LXQvdC40LUg0LLRi9GB0L7RgtGLINC+0LrQvdCwXG4gICAqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IC0g0JLRi9GB0L7RgtCwINC+0LrQvdCwXG4gICAqL1xuICBWaWV3QWJpbGl0eS5nZXRXaW5kb3dIZWlnaHQgPSBmdW5jdGlvbiBnZXRXaW5kb3dIZWlnaHQoKSB7XG4gICAgaWYgKCFWaWV3QWJpbGl0eS5udW1XaW5kb3dIZWlnaHQpIHtcbiAgICAgIFZpZXdBYmlsaXR5Lm51bVdpbmRvd0hlaWdodCA9IF9VdGlsczIuZGVmYXVsdC5XaW5kb3cuZ2V0SGVpZ2h0KCk7XG4gICAgfVxuICAgIHJldHVybiBWaWV3QWJpbGl0eS5udW1XaW5kb3dIZWlnaHQgfHwgMDtcbiAgfTtcblxuICAvKipcbiAgICog0J7Qv9GA0LXQtNC10LvQtdC90LjQtSDQstGL0YHQvtGC0Ysg0LTQvtC60YPQvNC10L3RgtCwXG4gICAqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IC0g0JLRi9GB0L7RgtCwINC00L7QutGD0LzQtdC90YLQsFxuICAgKi9cbiAgVmlld0FiaWxpdHkuZ2V0RG9jdW1lbnRIZWlnaHQgPSBmdW5jdGlvbiBnZXREb2N1bWVudEhlaWdodCgpIHtcbiAgICBpZiAoIVZpZXdBYmlsaXR5Lm51bURvY3VtZW50SGVpZ2h0KSB7XG4gICAgICBWaWV3QWJpbGl0eS5udW1Eb2N1bWVudEhlaWdodCA9IF9VdGlsczIuZGVmYXVsdC5Eb2N1bWVudC5nZXRIZWlnaHQoKTtcbiAgICB9XG4gICAgcmV0dXJuIFZpZXdBYmlsaXR5Lm51bURvY3VtZW50SGVpZ2h0IHx8IDA7XG4gIH07XG5cbiAgLyoqXG4gICAqINCe0L/RgNC10LTQtdC70LXQvdC40LUg0YjQuNGA0LjQvdGLINC+0LrQvdCwXG4gICAqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IC0g0KjQuNGA0LjQvdCwINC+0LrQvdCwXG4gICAqL1xuICBWaWV3QWJpbGl0eS5nZXRXaW5kb3dXaWR0aCA9IGZ1bmN0aW9uIGdldFdpbmRvd1dpZHRoKCkge1xuICAgIGlmICghVmlld0FiaWxpdHkubnVtV2luZG93V2lkdGgpIHtcbiAgICAgIFZpZXdBYmlsaXR5Lm51bVdpbmRvd1dpZHRoID0gX1V0aWxzMi5kZWZhdWx0LldpbmRvdy5nZXRXaWR0aCgpO1xuICAgIH1cbiAgICByZXR1cm4gVmlld0FiaWxpdHkubnVtV2luZG93V2lkdGggfHwgMDtcbiAgfTtcblxuICAvKipcbiAgICog0J7Qv9GA0LXQtNC10LvQtdC90LjQtSDRiNC40YDQuNC90Ysg0LTQvtC60YPQvNC10L3RgtCwXG4gICAqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IC0g0KjQuNGA0LjQvdCwINC00L7QutGD0LzQtdC90YLQsFxuICAgKi9cbiAgVmlld0FiaWxpdHkuZ2V0RG9jdW1lbnRXaWR0aCA9IGZ1bmN0aW9uIGdldERvY3VtZW50V2lkdGgoKSB7XG4gICAgaWYgKCFWaWV3QWJpbGl0eS5udW1Eb2N1bWVudFdpZHRoKSB7XG4gICAgICBWaWV3QWJpbGl0eS5udW1Eb2N1bWVudFdpZHRoID0gX1V0aWxzMi5kZWZhdWx0LkRvY3VtZW50LmdldFdpZHRoKCk7XG4gICAgfVxuICAgIHJldHVybiBWaWV3QWJpbGl0eS5udW1Eb2N1bWVudFdpZHRoIHx8IDA7XG4gIH07XG5cbiAgLyoqXG4gICAqINCe0L/RgNC10LTQtdC70LXQvdC40LUg0L/QvtC70L7QttC10L3QuCDQuCDRgNCw0LfQvNC10YDQvtCyINGN0LvQtdC80LXQvdGC0LBcbiAgICpcbiAgICogQHBhcmFtIGRvbU5vZGUge09iamVjdH0gLSBET00g0Y3Qu9C10LzQtdC90YJcbiAgICogQHJldHVybnMge3tsZWZ0OiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIHRvcDogbnVtYmVyLCBib3R0b206IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9fSAtXG4gICAqINCc0LDRgdGB0LjQsiDRgSDQv9Cw0YDQsNC80LXRgtGA0LDQvNC4INGA0LDQt9C80LXRgNC+0LIg0Lgg0L/QvtC70L7QttC10L3QuNGPXG4gICAqL1xuICBWaWV3QWJpbGl0eS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPSBmdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZG9tTm9kZSkge1xuICAgIHJldHVybiBfVXRpbHMyLmRlZmF1bHQuRE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdChkb21Ob2RlKTtcbiAgfTtcblxuICAvKipcbiAgICog0JzQtdGC0L7QtCDQtNC70Y8g0L7Qv9GA0LXQtNC10LvQtdC90LjRjyDQv9GA0L7RhtC10L3RgtCwINCy0LjQtNC40LzQvtC5INGH0LDRgdGC0Lgg0LHQsNC90L3QtdGA0LAg0L3QsCDRjdC60YDQsNC90LUg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPXG4gICAqXG4gICAqIEBwYXJhbSBvYmpTaXplcyB7e2xlZnQ6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgdG9wOiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn19IC1cbiAgICog0JzQsNGB0YHQuNCyINGBINC/0LDRgNCw0LzQtdGC0YDQsNC80Lgg0YDQsNC30LzQtdGA0L7QsiDQuCDQv9C+0LvQvtC20LXQvdC40Y9cbiAgICogQHJldHVybnMge251bWJlcn0gLSDQmtC+0Y3RhNGE0LjRhtC40LXQvdGCINCy0LjQtNC40LzQvtGB0YLQuCDRjdC70LXQvNC10L3RgtCwINC+0YIgMCDQtNC+IDFcbiAgICovXG4gIFZpZXdBYmlsaXR5LmNhbGNWaXNpYmlsaXR5ID0gZnVuY3Rpb24gY2FsY1Zpc2liaWxpdHkob2JqU2l6ZXMpIHtcbiAgICAvKipcbiAgICAgKiDQntC/0YDQtdC00LXQu9GP0LXQvCDQstGL0YHQvtGC0YMg0L7QutC90LBcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHZhciBudW1XaW5kb3dIZWlnaHQgPSBWaWV3QWJpbGl0eS5nZXRXaW5kb3dIZWlnaHQoKTtcbiAgICAvKipcbiAgICAgKiDQntC/0YDQtdC00LXQu9GP0LXQvCDQstC10YDRhdC90Y7RjiDQuCDQvdC40LbQvdGO0Y4g0LLQuNC00LjQvNGL0LUg0LPRgNCw0L3QuNGG0Ysg0Y3Qu9C10LzQtdC90YLQsFxuICAgICAqL1xuICAgIHZhciBudW1FbGVtZW50U2Nyb2xsVG9wRnJvbSA9IG9ialNpemVzLnRvcCA8IDAgPyAwIDogb2JqU2l6ZXMudG9wO1xuICAgIHZhciBudW1FbGVtZW50U2Nyb2xsVG9wVG8gPSBvYmpTaXplcy5ib3R0b20gPiBudW1XaW5kb3dIZWlnaHQgPyBudW1XaW5kb3dIZWlnaHQgOiBvYmpTaXplcy5ib3R0b207XG4gICAgLyoqXG4gICAgICog0J7Qv9GA0LXQtNC10LvRj9C10Lwg0LLQuNC00LjQvNGD0Y4g0Lgg0LzQsNC60YHQuNC80LDQu9GM0L3QviDQstC+0LfQvNC+0LbQvdGD0Y4g0LLQuNC00LjQvNGD0Y4g0L7QsdC70LDRgdGC0Lgg0Y3Qu9C10LzQtdC90YLQsCDQv9C+INCy0YvRgdC+0YLQtVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdmFyIG51bUVsZW1lbnRWaWV3SGVpZ2h0ID0gbnVtRWxlbWVudFNjcm9sbFRvcFRvIC0gbnVtRWxlbWVudFNjcm9sbFRvcEZyb207XG4gICAgdmFyIG51bUVsZW1lbnRNYXhWaWV3SGVpZ2h0ID0gb2JqU2l6ZXMuaGVpZ2h0IDwgbnVtV2luZG93SGVpZ2h0ID8gb2JqU2l6ZXMuaGVpZ2h0IDogbnVtV2luZG93SGVpZ2h0O1xuICAgIC8qKlxuICAgICAqINCS0YvRh9C40YHQu9GP0LXQvCDQv9GA0L7RhtC10L3RgiDQstC40LTQuNC80L7QuSDRh9Cw0YHRgtC4INC/0L4g0LLRi9GB0L7RgtC1XG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB2YXIgbnVtRWxlbWVudFZpZXdIZWlnaHRQYXRoID0gbnVtRWxlbWVudFZpZXdIZWlnaHQgLyBudW1FbGVtZW50TWF4Vmlld0hlaWdodDtcbiAgICAvKipcbiAgICAgKiDQntCx0YDQtdC30LDQtdC8INC30L3QsNGH0LXQvdC40LUg0LLQuNC00LjQvNC+0YHRgtC4INCyINC00LjQsNC/0LDQt9C+0L3QtSDQvtGCIDAg0LTQviAxXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICBudW1FbGVtZW50Vmlld0hlaWdodFBhdGggPSBudW1FbGVtZW50Vmlld0hlaWdodFBhdGggPCAwID8gMCA6IG51bUVsZW1lbnRWaWV3SGVpZ2h0UGF0aDtcbiAgICBudW1FbGVtZW50Vmlld0hlaWdodFBhdGggPSBudW1FbGVtZW50Vmlld0hlaWdodFBhdGggPiAxID8gMSA6IG51bUVsZW1lbnRWaWV3SGVpZ2h0UGF0aDtcbiAgICAvKipcbiAgICAgKiDQntC/0YDQtdC00LXQu9GP0LXQvCDRiNC40YDQuNC90YMg0L7QutC90LBcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHZhciBudW1XaW5kb3dXaWR0aCA9IFZpZXdBYmlsaXR5LmdldFdpbmRvd1dpZHRoKCk7XG4gICAgLyoqXG4gICAgICog0J7Qv9GA0LXQtNC10LvRj9C10Lwg0LvQtdCy0YPRjiDQuCDQv9GA0LDQstGD0Y4g0LLQuNC00LjQvNGL0LUg0LPRgNCw0L3QuNGG0Ysg0Y3Qu9C10LzQtdC90YLQsFxuICAgICAqL1xuICAgIHZhciBudW1FbGVtZW50U2Nyb2xsTGVmdEZyb20gPSBvYmpTaXplcy5sZWZ0IDwgMCA/IDAgOiBvYmpTaXplcy5sZWZ0O1xuICAgIHZhciBudW1FbGVtZW50U2Nyb2xsTGVmdFRvID0gb2JqU2l6ZXMucmlnaHQgPiBudW1XaW5kb3dXaWR0aCA/IG51bVdpbmRvd1dpZHRoIDogb2JqU2l6ZXMucmlnaHQ7XG4gICAgLyoqXG4gICAgICog0J7Qv9GA0LXQtNC10LvRj9C10Lwg0LLQuNC00LjQvNGD0Y4g0Lgg0LzQsNC60YHQuNC80LDQu9GM0L3QviDQstC+0LfQvNC+0LbQvdGD0Y4g0LLQuNC00LjQvNGD0Y4g0L7QsdC70LDRgdGC0Lgg0Y3Qu9C10LzQtdC90YLQsCDQv9C+INGI0LjRgNC40L3QtVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdmFyIG51bUVsZW1lbnRWaWV3V2lkdGggPSBudW1FbGVtZW50U2Nyb2xsTGVmdFRvIC0gbnVtRWxlbWVudFNjcm9sbExlZnRGcm9tO1xuICAgIHZhciBudW1FbGVtZW50TWF4Vmlld1dpZHRoID0gb2JqU2l6ZXMud2lkdGggPCBudW1XaW5kb3dXaWR0aCA/IG9ialNpemVzLndpZHRoIDogbnVtV2luZG93V2lkdGg7XG4gICAgLyoqXG4gICAgICog0JLRi9GH0LjRgdC70Y/QtdC8INC/0YDQvtGG0LXQvdGCINCy0LjQtNC40LzQvtC5INGH0LDRgdGC0Lgg0L/QviDRiNC40YDQuNC90LVcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHZhciBudW1FbGVtZW50Vmlld1dpZHRoUGF0aCA9IG51bUVsZW1lbnRWaWV3V2lkdGggLyBudW1FbGVtZW50TWF4Vmlld1dpZHRoO1xuICAgIC8qKlxuICAgICAqINCe0LHRgNC10LfQsNC10Lwg0LfQvdCw0YfQtdC90LjQtSDQstC40LTQuNC80L7RgdGC0Lgg0LIg0LTQuNCw0L/QsNC30L7QvdC1INC+0YIgMCDQtNC+IDFcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIG51bUVsZW1lbnRWaWV3V2lkdGhQYXRoID0gbnVtRWxlbWVudFZpZXdXaWR0aFBhdGggPCAwID8gMCA6IG51bUVsZW1lbnRWaWV3V2lkdGhQYXRoO1xuICAgIG51bUVsZW1lbnRWaWV3V2lkdGhQYXRoID0gbnVtRWxlbWVudFZpZXdXaWR0aFBhdGggPiAxID8gMSA6IG51bUVsZW1lbnRWaWV3V2lkdGhQYXRoO1xuICAgIC8qKlxuICAgICAqINCS0YvRh9C40YHQu9GP0LXQvCDQv9GA0L7RhtC10L3RgiDQstC40LTQuNC80L7QuSDQv9C+0YnQsNC00LhcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIHZhciBudW1FbGVtZW50Vmlld1BhdGggPSBudW1FbGVtZW50Vmlld0hlaWdodFBhdGggKiBudW1FbGVtZW50Vmlld1dpZHRoUGF0aDtcbiAgICAvKipcbiAgICAgKiDQntCx0YDQtdC30LDQtdC8INC30L3QsNGH0LXQvdC40LUg0LLQuNC00LjQvNC+0YHRgtC4INCyINC00LjQsNC/0LDQt9C+0L3QtSDQvtGCIDAg0LTQviAxXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICBudW1FbGVtZW50Vmlld1BhdGggPSBudW1FbGVtZW50Vmlld1BhdGggPCAwID8gMCA6IG51bUVsZW1lbnRWaWV3UGF0aDtcbiAgICBudW1FbGVtZW50Vmlld1BhdGggPSBudW1FbGVtZW50Vmlld1BhdGggPiAxID8gMSA6IG51bUVsZW1lbnRWaWV3UGF0aDtcbiAgICAvKipcbiAgICAgKiDQktC+0LfQstGA0LDRidCw0LXQvCDQv9GA0L7RhtC10L3RgiDQstC40LTQuNC80L7QuSDQv9C70L7RidCw0LTQuCDQsiDQtNC40LDQv9Cw0LfQvtC90LUg0L7RgiAwINC00L4gMVxuICAgICAqL1xuICAgIHJldHVybiBudW1FbGVtZW50Vmlld1BhdGg7XG4gIH07XG5cbiAgLyoqXG4gICAqICog0J7Qv9GA0LXQtNC10LvQtdC90LjQtSDQstC40LTQuNC80L7RgdGC0Lgg0Y3Qu9C10LzQtdC90YLQsCDQstC+0L7QsdGJ0LVcbiAgICpcbiAgICogQHBhcmFtIGRvbU5vZGUge09iamVjdH0gLSDQrdC70LXQvNC10L3RgiBET00g0LTQtdGA0LXQstCwXG4gICAqIEBwYXJhbSBib29FbGVtZW50IHtib29sZWFufSAtINCV0YHQu9C4INGN0YLQviDRgdCw0Lwg0LHQsNC90L3QtdGALCDQsCDQvdC1INGA0L7QtNC40YLQtdC70YxcbiAgICogQHBhcmFtIG51bURvY3VtZW50V2lkdGggLSDQqNC40YDQuNC90LAg0LTQvtC60YPQvNC10L3RgtCwXG4gICAqIEBwYXJhbSBudW1Eb2N1bWVudEhlaWdodCAtINCS0YvRgdC+0YLQsCDQtNC+0LrRg9C80LXQvdGC0LBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IC0g0KTQu9Cw0LMg0LLQuNC00LjQvNC+0YHRgtC4INGN0LvQtdC80LXQvdGC0LBcbiAgICovXG4gIFZpZXdBYmlsaXR5LmlzVmlzaWJsZSA9IGZ1bmN0aW9uIGlzVmlzaWJsZShkb21Ob2RlLCBib29FbGVtZW50LCBudW1Eb2N1bWVudFdpZHRoLCBudW1Eb2N1bWVudEhlaWdodCkge1xuICAgIC8qKlxuICAgICAqIFRPRE86INC90LUg0YPRh9C40YLRi9Cy0LDRgtGMINGA0L7QtNC40YLQtdC70LXQuSDQtdGB0LvQuCBwb3NpdGlvbiBmaXhlZFxuICAgICAqL1xuICAgIC8qKlxuICAgICAqINCj0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INGE0LvQsNCzINCy0LjQtNC40LzQvtGB0YLQuCDQuCDQstGL0YfQuNGB0LvRj9C10Lwg0YDQsNC30LzQtdGA0Ysg0Y3Qu9C10LzQtdC90YLQsFxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqL1xuICAgIHZhciBib29WaXNpYmxlID0gdHJ1ZTtcbiAgICB2YXIgb2JqU2l6ZXMgPSBWaWV3QWJpbGl0eS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoZG9tTm9kZSk7XG4gICAgLyoqXG4gICAgICog0JXRgdC70Lgg0YMg0Y3Qu9C10LzQtdC90YLQsCDQvdC10YIg0YjQuNGA0LjQvdGLINC40LvQuCDQstGL0YHQvtGC0Ysg0YLQviDQvtC9INC40LvQuCDRgdC60YDRi9GCINC40LvQuCDRgyDQvdC10LPQviDQvdC10YIg0YDQsNC30LzQtdGA0L7QslxuICAgICAqL1xuICAgIGlmICghKG9ialNpemVzLndpZHRoICYmIG9ialNpemVzLmhlaWdodCkgJiYgKGJvb0VsZW1lbnQgfHwgZG9tTm9kZS5zdHlsZS5vdmVyZmxvdyAhPT0gXCJcIikpIHtcbiAgICAgIGJvb1Zpc2libGUgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGJvb0VsZW1lbnQgJiYgKG9ialNpemVzLmJvdHRvbSA8IDAgfHwgb2JqU2l6ZXMucmlnaHQgPCAwIHx8IG9ialNpemVzLmxlZnQgPiBudW1Eb2N1bWVudFdpZHRoIHx8IG9ialNpemVzLnRvcCA+IG51bURvY3VtZW50SGVpZ2h0KSkge1xuICAgICAgYm9vVmlzaWJsZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoISF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgLyoqXG4gICAgICAgKiDQktGL0YfQuNGB0LvRj9C10Lwg0YHRgtC40LvQuCDRjdC70LXQvNC10L3RgtCwXG4gICAgICAgKiBAdHlwZSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn1cbiAgICAgICAqL1xuICAgICAgdmFyIG9ialN0eWxlID0gVmlld0FiaWxpdHkuZ2V0Q29tcHV0ZWRTdHlsZShkb21Ob2RlKTtcbiAgICAgIC8qKlxuICAgICAgICog0JXRgdC70Lgg0Y3Qu9C10LzQtdC90YIg0LjQvNC10LXRgiDQvdGD0LvQtdCy0YPRjiDQv9GA0L7Qt9GA0LDRh9C90L7RgdGC0Ywg0LjQu9C4INGB0LrRgNGL0YIg0LjQu9C4INC90LUg0LjQvNC10LXRgiDQvtGC0L7QsdGA0LDQttC10L3QuNGPXG4gICAgICAgKi9cbiAgICAgIGlmIChvYmpTdHlsZS5vcGFjaXR5ID09PSBcIjBcIiB8fCBvYmpTdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fCBvYmpTdHlsZS52aXNpYmlsaXR5ID09PSBcImhpZGRlblwiKSB7XG4gICAgICAgIGJvb1Zpc2libGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10Lwg0YTQu9Cw0LMg0LLQuNC00LjQvNC+0YHRgtC4XG4gICAgICovXG4gICAgcmV0dXJuIGJvb1Zpc2libGU7XG4gIH07XG5cbiAgLyoqXG4gICAqINCc0LXRgtC+0LQg0L7Qv9GA0LXQtNC10LvQtdC90LjRjyDQstC40LTQuNC80L7RgdGC0Lgg0LHQsNC90L3QtdGA0LBcbiAgICpcbiAgICogQHBhcmFtIGRvbUJhbm5lciB7T2JqZWN0fSAtINCt0LvQtdC80LXQvdGCIERPTSDQtNC10YDQtdCy0LBcbiAgICogQHJldHVybnMge251bWJlcn0gLSDQmtC+0Y3RhNGE0LjRhtC40LXQvdGCINCy0LjQtNC40LzQvtGB0YLQuCDRjdC70LXQvNC10L3RgtCwINC+0YIgMCDQtNC+IDFcbiAgICovXG4gIFZpZXdBYmlsaXR5LmNoZWNrVmlzaWJpbGl0eSA9IGZ1bmN0aW9uIGNoZWNrVmlzaWJpbGl0eShkb21CYW5uZXIpIHtcbiAgICAvKipcbiAgICAgKiDQo9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDRhNC70LDQsyDQstC40LTQuNC80L7RgdGC0Lgg0Y3Qu9C10LzQtdC90YLQsFxuICAgICAqINCX0LDQv9C40YHRi9Cy0LDQtdC8INGN0LvQtdC80LXQvdGCINCy0L4g0LLRgNC10LzQtdC90L3Rg9GOINC/0LXRgNC10LzQtdC90L3Rg9GOINC00Y/QuyDQv9C10YDQtdCx0L7RgNCwINC/0L4g0YDQvtC00LjRgtC10LvRj9C8XG4gICAgICog0KPRgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0YTQu9Cw0LMg0YHQvtC+0YLQstC10YLRgdGC0LLQuNGPINGN0LvQtdC80LXQvdGC0LAg0LjRgdGF0L7QtNC90L7QvNGDXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdmFyIGJvb1Zpc2libGUgPSB0cnVlO1xuICAgIHZhciBkb21Ob2RlID0gZG9tQmFubmVyO1xuICAgIHZhciBib29FbGVtZW50ID0gdHJ1ZTtcbiAgICB2YXIgbnVtRG9jdW1lbnRXaWR0aCA9IFZpZXdBYmlsaXR5LmdldERvY3VtZW50V2lkdGgoKTtcbiAgICB2YXIgbnVtRG9jdW1lbnRIZWlnaHQgPSBWaWV3QWJpbGl0eS5nZXREb2N1bWVudEhlaWdodCgpO1xuICAgIC8qKlxuICAgICAqINCf0LXRgNC10LHQuNGA0LDQtdC8INC+0YIg0Y3Qu9C10LzQtdC90YLQsCDQtNC+INGA0L7QtNC40YLQtdC70LXQuSwg0L/QvtC60LAg0YLQtdC60YPRidC10Lkg0Y3Qu9C10LzQtdC90YIg0L3QtSDRgNCw0LLQtdC9IGJvZHlcbiAgICAgKi9cbiAgICB3aGlsZSAoZG9tTm9kZSAmJiBkb21Ob2RlICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAvKipcbiAgICAgICAqINCV0YHQu9C4INGN0LvQtdC80LXQvdGCINC90LUg0LLQuNC00LXQvSwg0YLQviDRg9GB0YLQsNC90LDQstC70LjQstCw0LXQvCDRhNC70LDQsyDQuCDQstGL0YXQvtC00LjQvCDQuNC3INC/0LXRgNC10LHQvtGA0LBcbiAgICAgICAqL1xuICAgICAgaWYgKCFWaWV3QWJpbGl0eS5pc1Zpc2libGUoZG9tTm9kZSwgYm9vRWxlbWVudCwgbnVtRG9jdW1lbnRXaWR0aCwgbnVtRG9jdW1lbnRIZWlnaHQpKSB7XG4gICAgICAgIGJvb1Zpc2libGUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAoZG9tTm9kZS5zdHlsZS5wb3NpdGlvbiA9PT0gXCJmaXhlZFwiKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgLyoqXG4gICAgICAgKiDQl9Cw0L/QuNGB0YvQstCw0LXQvCDQstC+INCy0YDQtdC80LXQvdC90YPRjiDQv9C10YDQtdC80LXQvdC90YPRjiDRgNC+0LTQuNGC0LXQu9GM0YHQutC40Lkg0Y3Qu9C10LzQtdC90YJcbiAgICAgICAqIEB0eXBlIHtkb21FbGVtZW50fVxuICAgICAgICovXG4gICAgICBkb21Ob2RlID0gZG9tTm9kZS5wYXJlbnROb2RlO1xuICAgICAgLyoqXG4gICAgICAgKiDQodCx0YDQsNGB0YvQstCw0LXQvCDRhNC70LDQsyDQv9GA0LjQvdCw0LTQu9C10LbQvdC+0YHRgtC4INC6INC40YHRhdC+0LTQvdC+0LzRgyDRjdC70LXQvNC10L3RgtGDXG4gICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAqL1xuICAgICAgYm9vRWxlbWVudCA9IGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDQntCx0YrQtdCy0LvRj9C10Lwg0L/QtdGA0LXQvNC10L3QvdGD0Y4g0LTQu9GPINC+0L/RgNC10LTQtdC70LXQvdC40Y8g0L/RgNC+0YbQtdC90YLQsCDQstC40LTQuNC80L7RgdGC0Lgg0Y3Qu9C10LzQtdC90YLQsFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgdmFyIG51bVZpc2liaWxpdHkgPSAwO1xuICAgIC8qKlxuICAgICAqINCV0YHQu9C4INGN0LvQtdC80LXQvdGCINCy0L7QvtCx0YnQtSDQstC40LTQtdC9LCDRgtC+INCy0YvRgdGH0LjRgtGL0LLQsNC10Lwg0L/RgNC+0YbQtdC90YIg0LXQs9C+INCy0LjQtNC40LzQvtGB0YLQuCwg0LXRgdC70Lgg0L3QtdGCLCDRgtC+INCy0LjQtNC40LzQvtGB0YLRjCDQvdGD0LvQtdCy0LDRj1xuICAgICAqL1xuICAgIGlmIChib29WaXNpYmxlKSB7XG4gICAgICAvKipcbiAgICAgICAqINCe0L/RgNC10LTQtdC70Y/QtdC8INC/0L7Qu9C+0LbQtdC90LjQtSDQuCDRgNCw0LfQvNC10YDRiyDRjdC70LXQvNC10L3RgtCwXG4gICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAgICovXG4gICAgICB2YXIgb2JqU2l6ZXMgPSBWaWV3QWJpbGl0eS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoZG9tQmFubmVyKTtcbiAgICAgIC8qKlxuICAgICAgICog0JLRi9GH0LjRgdC70Y/QtdC8INGB0YLQuNC70Lgg0Y3Qu9C10LzQtdC90YLQsFxuICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAqL1xuICAgICAgdmFyIG9wYWNpdHkgPSAxO1xuICAgICAgaWYgKCEhd2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcbiAgICAgICAgdmFyIG9ialN0eWxlID0gVmlld0FiaWxpdHkuZ2V0Q29tcHV0ZWRTdHlsZShkb21CYW5uZXIpO1xuICAgICAgICBvcGFjaXR5ID0gb2JqU3R5bGUub3BhY2l0eTtcbiAgICAgIH1cbiAgICAgIC8qKlxuICAgICAgICog0KDQsNGB0YHRh9C40YLRi9Cy0LDQtdC8INC/0YDQvtGG0LXQvdGCINCy0LjQtNC40LzQvtGB0YLQuCDRjdC70LXQvNC10L3RgtCwXG4gICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICovXG4gICAgICBudW1WaXNpYmlsaXR5ID0gVmlld0FiaWxpdHkuY2FsY1Zpc2liaWxpdHkob2JqU2l6ZXMpICogb3BhY2l0eTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog0JLQvtC30LLRgNCw0YnQsNC10Lwg0L/RgNC+0YbQtdC90YIg0LLQuNC00LjQvNC+0YHRgtC4XG4gICAgICovXG4gICAgcmV0dXJuIG51bVZpc2liaWxpdHk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFdhdGNoZXJcbiAgICovXG4gIFZpZXdBYmlsaXR5LnByb3RvdHlwZS53YXRjaCA9IGZ1bmN0aW9uIHdhdGNoKCkge1xuICAgIGlmICh0aGlzLmRvbUVsZW1lbnQgJiYgX3R5cGVvZih0aGlzLmRvbUVsZW1lbnQpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICBpZiAodGhpcy5kb21FbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqINCe0L/RgNC10LTQtdC70LXQvdC40LUg0LLQuNC00LjQvNC+0YHRgtC4INCx0LDQvdC90LXRgNCwXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgbnVtVmlzaWJpbGl0eSA9IFZpZXdBYmlsaXR5LmNoZWNrVmlzaWJpbGl0eSh0aGlzLmRvbUVsZW1lbnQpO1xuICAgICAgICAvKipcbiAgICAgICAgICog0JXRgdC70Lgg0LLQuNC00LjQvNC+0YHRgtGMINCx0L7Qu9GM0YjQtSDRgtGA0LXQsdGD0LXQvNC+0LlcbiAgICAgICAgICovXG4gICAgICAgIGlmIChudW1WaXNpYmlsaXR5ID4gdGhpcy5vYmpTZXR0aW5nLnBlcmNlbnRhZ2UpIHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiDQldGB0LvQuCDRhNC70LDQsyDQvtGC0YHRh9C10YLQsCDQsdGL0Lsg0LLRi9C60LvRjtGH0LXQvSwg0YLQviDRgdCx0YDQsNGB0YvQstCw0LXQvCDRgtCw0LnQvNC10YBcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBpZiAodGhpcy5ib29UaW1lckZsYWcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLm51bVRpbWVyRnJvbSA9IERhdGUubm93KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYm9vVGltZXJGbGFnID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5ib29UaW1lckZsYWcgPT09IHRydWUpIHt9XG4gICAgICAgICAgdGhpcy5ib29UaW1lckZsYWcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICog0KTQu9Cw0LMg0LLRi9C30L7QstCwIGNhbGxiYWNrXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGJvb0NhbGxDYWxsYmFjayA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICog0JXRgdC70Lgg0YPRgdGC0LDQvdC+0LLQu9C10L0g0YTQu9Cw0LMg0L7RgtGB0YfQtdGC0LBcbiAgICAgICAgICovXG4gICAgICAgIGlmICh0aGlzLmJvb1RpbWVyRmxhZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8qKlxuICAgICAgICAgICAqINCV0YHQu9C4INC/0YDQvtGI0LvQviDQsdC+0LvRjNGI0LUg0LLRgNC10LzQtdC90LgsINGH0LXQvCDQv9GA0LXQtNC/0L7Qu9Cw0LPQsNC70L7RgdGMXG4gICAgICAgICAgICovXG4gICAgICAgICAgaWYgKERhdGUubm93KCkgLSB0aGlzLm51bVRpbWVyRnJvbSA+IHRoaXMub2JqU2V0dGluZy50aW1lKSB7XG4gICAgICAgICAgICBib29DYWxsQ2FsbGJhY2sgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICog0JXRgdC70Lgg0LHQsNC90LXRgCDQsdGL0Lsg0LLQuNC00LXQvSDQtNC+0YHRgtCw0YLQvtGH0L3QviDQtNC+0LvQs9C+LCDRgtC+INCy0YvQt9GL0LLQsNC10LwgY2FsbGJhY2ssINC40L3QsNGH0LUg0L/RgNC+0LTQvtC70LbQsNC10Lwg0YHQvNC+0YLRgNC10YLRjFxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGJvb0NhbGxDYWxsYmFjaykge1xuICAgICAgICAgIF9BbmltYXRpb25GcmFtZTIuZGVmYXVsdC51bnN1YnNjcmliZSh0aGlzLndhdGNoSUQpO1xuICAgICAgICAgIHRoaXMuZnVuQ2FsbEJhY2sodGhpcy5JRCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9BbmltYXRpb25GcmFtZTIuZGVmYXVsdC51bnN1YnNjcmliZSh0aGlzLndhdGNoSUQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5JRCkge1xuICAgICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5JRCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBWaWV3QWJpbGl0eTtcbn0oKTtcbi8qKlxuICogRXhwb3J0IFZpZXdBYmlsaXR5XG4gKi9cblxuXG5leHBvcnRzLmRlZmF1bHQgPSBWaWV3QWJpbGl0eTtcbm1vZHVsZS5leHBvcnRzID0gVmlld0FiaWxpdHk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9saWIvVmlld0FiaWxpdHkudHNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyIsIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiQW5pbWF0aW9uRnJhbWVcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiQW5pbWF0aW9uRnJhbWVcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiQW5pbWF0aW9uRnJhbWVcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAvKioqKioqLyAoZnVuY3Rpb24obW9kdWxlcykgeyAvLyB3ZWJwYWNrQm9vdHN0cmFwXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4vKioqKioqLyBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4vKioqKioqLyBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbi8qKioqKiovIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fSxcbi8qKioqKiovIFx0XHRcdGlkOiBtb2R1bGVJZCxcbi8qKioqKiovIFx0XHRcdGxvYWRlZDogZmFsc2Vcbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuLyoqKioqKi8gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuLyoqKioqKi9cbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKHtcblxuLyoqKi8gMDpcbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblxuXG4vKioqLyB9LFxuXG4vKioqLyA1OlxuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0LyogV0VCUEFDSyBWQVIgSU5KRUNUSU9OICovKGZ1bmN0aW9uKGdsb2JhbCkge1widXNlIHN0cmljdFwiO1xuXHRcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblx0XG5cdHZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblx0XG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cdFxuXHR2YXIgcm9vdCA9IHZvaWQgMDtcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0ICAgIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdCAgICAgICAgcm9vdCA9IGdsb2JhbDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgICAgcm9vdCA9IHt9O1xuXHQgICAgfVxuXHR9IGVsc2Uge1xuXHQgICAgcm9vdCA9IHdpbmRvdztcblx0fVxuXHQvKipcblx0ICogcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHBvbHlmaWxsXG5cdCAqL1xuXHRyb290LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgIHJldHVybiB0eXBlb2Ygcm9vdCAhPT0gXCJ1bmRlZmluZWRcIiAmJiAocm9vdC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcm9vdC53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcm9vdC5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgcm9vdC5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHJvb3QubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHx8IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHQgICAgICAgIHJvb3Quc2V0VGltZW91dChjYWxsYmFjaywgMTAwMCAvIDYwKTtcblx0ICAgIH07XG5cdH0oKTtcblx0LyoqXG5cdCAqIEJpbmQgcG9seWZpbGxcblx0ICovXG5cdGZ1bmN0aW9uIGJpbmQoYikge1xuXHQgICAgLyoqXG5cdCAgICAgKiBJZiB0cnkgYmluZCB2YXJpYWJsZSB0aGF0IG5vdCBhIGZ1bmN0aW9uLCB0aGVuIHRocm93IGVycm9yXG5cdCAgICAgKi9cblx0ICAgIGlmICh0eXBlb2YgdGhpcyAhPT0gXCJmdW5jdGlvblwiKSB7XG5cdCAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIC0gd2hhdCBpcyB0cnlpbmcgdG8gYmUgYm91bmQgaXMgbm90IGNhbGxhYmxlXCIpO1xuXHQgICAgfVxuXHQgICAgLyoqXG5cdCAgICAgKiBsZXQgQXJyYXkgc2xpY2UgZnVuY3Rpb25cblx0ICAgICAqL1xuXHQgICAgdmFyIGEgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cdCAgICB2YXIgZiA9IGEuY2FsbChhcmd1bWVudHMsIDEpO1xuXHQgICAgdmFyIGUgPSB0aGlzO1xuXHQgICAgZnVuY3Rpb24gYygpIHtcblx0ICAgICAgICAvKlxuXHQgICAgICAgICBpZiAoXG5cdCAgICAgICAgIHR5cGVvZiByb290ICE9PSBcInVuZGVmaW5lZFwiICYmXG5cdCAgICAgICAgIHR5cGVvZiByb290LmNvbnNvbGUgPT09IFwib2JqZWN0XCIgJiZcblx0ICAgICAgICAgdHlwZW9mIHJvb3QuY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIlxuXHQgICAgICAgICApIHtcblx0ICAgICAgICAgcm9vdC5jb25zb2xlLmxvZyhcIkJpbmQgcG9seWZpbGxcIik7XG5cdCAgICAgICAgIH1cblx0ICAgICAgICAgKi9cblx0ICAgIH1cblx0ICAgIGZ1bmN0aW9uIGQoKSB7XG5cdCAgICAgICAgcmV0dXJuIGUuYXBwbHkodGhpcyBpbnN0YW5jZW9mIGMgPyB0aGlzIDogYiB8fCByb290LCBmLmNvbmNhdChhLmNhbGwoYXJndW1lbnRzKSkpO1xuXHQgICAgfVxuXHQgICAgLyoqXG5cdCAgICAgKiBSZWdpc3RlcmVkIHRoaXMgcHJvdG90eXBlIGFzIHByb3RvdHlwZSB0byBiaW5kIGltcGxlbWVudGF0aW9uIGZ1bmN0aW9uc1xuXHQgICAgICovXG5cdCAgICBjLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xuXHQgICAgZC5wcm90b3R5cGUgPSBuZXcgYygpO1xuXHQgICAgLyoqXG5cdCAgICAgKiBSZXR1cm4gYmluZCBwb2x5ZmlsbFxuXHQgICAgICovXG5cdCAgICByZXR1cm4gZDtcblx0fVxuXHRGdW5jdGlvbi5wcm90b3R5cGUuYmluZCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIHx8IGJpbmQ7XG5cdC8qKlxuXHQgKiBPYmplY3Qua2V5cyBwb2x5ZmlsbFxuXHQgKi9cblx0ZnVuY3Rpb24ga2V5cygpIHtcblx0ICAgIHZhciBoYXNEb05vdEVudW1CdWcgPSAheyB0b1N0cmluZzogbnVsbCB9LnByb3BlcnR5SXNFbnVtZXJhYmxlKFwidG9TdHJpbmdcIik7XG5cdCAgICB2YXIgZG9Ob3RFbnVtcyA9IFtcInRvU3RyaW5nXCIsIFwidG9Mb2NhbGVTdHJpbmdcIiwgXCJ2YWx1ZU9mXCIsIFwiaGFzT3duUHJvcGVydHlcIiwgXCJpc1Byb3RvdHlwZU9mXCIsIFwicHJvcGVydHlJc0VudW1lcmFibGVcIiwgXCJjb25zdHJ1Y3RvclwiXTtcblx0ICAgIHZhciBkb05vdEVudW1zTGVuZ3RoID0gZG9Ob3RFbnVtcy5sZW5ndGg7XG5cdCAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuXHQgICAgICAgIGlmICgodHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaikpICE9PSBcIm9iamVjdFwiICYmICh0eXBlb2Ygb2JqICE9PSBcImZ1bmN0aW9uXCIgfHwgb2JqID09PSBudWxsKSkge1xuXHQgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiT2JqZWN0LmtleXMgY2FsbGVkIG9uIG5vbi1vYmplY3RcIik7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHZhciByZXN1bHQgPSBbXTtcblx0ICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuXHQgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIHtcblx0ICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHByb3ApO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChoYXNEb05vdEVudW1CdWcpIHtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb05vdEVudW1zTGVuZ3RoOyBpKyspIHtcblx0ICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBkb05vdEVudW1zW2ldKSkge1xuXHQgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGRvTm90RW51bXNbaV0pO1xuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiByZXN1bHQ7XG5cdCAgICB9O1xuXHR9XG5cdE9iamVjdC5rZXlzID0gT2JqZWN0LmtleXMgfHwga2V5cygpO1xuXHQvKipcblx0ICogUmVxdWVzdCBhbmltYXRpb24gZnJhbWUgY2FsbCBzdGFjayBjbGFzc1xuXHQgKi9cblx0XG5cdHZhciBBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uICgpIHtcblx0ICAgIC8qKlxuXHQgICAgICogQ3JlYXRlIHJlcXVlc3QgYW5pbWF0aW9uIGZyYW1lXG5cdCAgICAgKi9cblx0ICAgIGZ1bmN0aW9uIEFuaW1hdGlvbkZyYW1lKCkge1xuXHQgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBbmltYXRpb25GcmFtZSk7XG5cdFxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIFN1YnNjcmliZWQgbWV0aG9kc1xuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHRoaXMuc3RhY2sgPSB7fTtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBTdGFydCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgd2F0Y2hlclxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHRoaXMud2F0Y2goKTtcblx0ICAgIH1cblx0ICAgIC8qKlxuXHQgICAgICogU3Vic2NyaWJlIG1ldGhvZCB0byB3YXRjaFxuXHQgICAgICogQHBhcmFtIGNvbnRleHRcblx0ICAgICAqIEBwYXJhbSBjYWxsYmFja1xuXHQgICAgICogQHBhcmFtIHBhcmFtc1xuXHQgICAgICogQHBhcmFtIElEXG5cdCAgICAgKiBAcmV0dXJuIHtib29sZWFufHN0cmluZ31cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBBbmltYXRpb25GcmFtZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gc3Vic2NyaWJlKCkge1xuXHQgICAgICAgIHZhciBjb250ZXh0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiByb290O1xuXHQgICAgICAgIHZhciBjYWxsYmFjayA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICByZXR1cm4gbnVsbDtcblx0ICAgICAgICB9O1xuXHQgICAgICAgIHZhciBwYXJhbXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IFtdO1xuXHQgICAgICAgIHZhciBJRCA9IGFyZ3VtZW50c1szXTtcblx0XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSWYgY29udGV4dCBhbmQgY2FsbGJhY2sgcGFzc2VkIGFuZCB0aGV5IGFyZSBvYmplY3QgYW5kIGZ1bmN0aW9uXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaWYgKCh0eXBlb2YgY29udGV4dCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGNvbnRleHQpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgY2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIiAmJiAodHlwZW9mIHBhcmFtcyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKHBhcmFtcykpID09PSBcIm9iamVjdFwiICYmIEFycmF5LmlzQXJyYXkocGFyYW1zKSAmJiAoSUQgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgSUQgPT09IFwic3RyaW5nXCIpKSB7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBDcmVhdGUgVUlEXG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKCk7XG5cdCAgICAgICAgICAgIHZhciBsb2NhbElEID0gSUQgfHwgXCJ4LVwiICsgZC5nZXRUaW1lKCkgKyBcIi1cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDFlNik7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBBZGQgbWV0aG9kIHRvIHRoZSBzdGFja1xuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgdGhpcy5zdGFja1tsb2NhbElEXSA9IHtcblx0ICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHQsXG5cdCAgICAgICAgICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG5cdCAgICAgICAgICAgICAgICBwYXJhbXM6IHBhcmFtc1xuXHQgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogV3JpdGUgdG8gY29uc29sZSBjb3VudCBvZiB0aGUgc3Vic2NyaWJlZCBtZXRob2RzXG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogUmV0dXJuIFVJRFxuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgcmV0dXJuIGxvY2FsSUQ7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIFVuc3Vic2NyaWJlIG1ldGhvZCBieSBJRFxuXHQgICAgICogQHBhcmFtIElEXG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgQW5pbWF0aW9uRnJhbWUucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24gdW5zdWJzY3JpYmUoSUQpIHtcblx0ICAgICAgICBpZiAodHlwZW9mIElEID09PSBcInN0cmluZ1wiKSB7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBJZiByZXF1aXJlZCBtZXRob2QgZXhpc3QgaW4gdGhlIHN0YWNrXG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBpZiAodGhpcy5zdGFja1tJRF0pIHtcblx0ICAgICAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgICAgICogTnVsbGlmeSBtZXRob2QgaW4gdGhlIHN0YWNrIGFuZCBkZXN0cm95IGl0XG5cdCAgICAgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgICAgIHRoaXMuc3RhY2tbSURdID0gZmFsc2U7XG5cdCAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5zdGFja1tJRF07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBXYXRjaCBhbmQgY2FsbCBtZXRob2RzXG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgQW5pbWF0aW9uRnJhbWUucHJvdG90eXBlLndhdGNoID0gZnVuY3Rpb24gd2F0Y2goKSB7XG5cdCAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIElmIHN0YWNrIGV4aXN0LCBpdCBpcyBhbiBvYmplY3QgYW5kIGl0IGlzIGNvbnRhaW5zIG1ldGhvZHNcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGlmICh0aGlzLnN0YWNrICYmIF90eXBlb2YodGhpcy5zdGFjaykgPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0LmtleXModGhpcy5zdGFjaykubGVuZ3RoID4gMCkge1xuXHQgICAgICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAgICAgKiBMb29wIGFsbCBtZXRob2RzIGluIHN0YWNrXG5cdCAgICAgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgICAgIGZvciAodmFyIElEIGluIHRoaXMuc3RhY2spIHtcblx0ICAgICAgICAgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICAgICAgICAgKiBQcm9jZXNzIG9ubHkgbWV0aG9kcyB3aXRob3V0IGV4dGVuZGVkIHByb3BlcnRpZXNcblx0ICAgICAgICAgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGFjay5oYXNPd25Qcm9wZXJ0eShJRCkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogSWYgSUQgZXhpc3QgYW5kIGl0IGlzIGEgc3RyaW5nXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChJRCAmJiB0eXBlb2YgSUQgPT09IFwic3RyaW5nXCIpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBHZXQgc3Vic2NyaWJlZCBtZXRob2QgcGFyYW1zIGJ5IElEXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iakNhbGwgPSB0aGlzLnN0YWNrW0lEXTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBJZiBwYXJhbXMgZXhpc3QsIGl0IGlzIGFuIG9iamVjdCwgYW5kIGl0IGlzIGNvbnRhaW5zIGNhbGwgY29udGV4dCxcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBjYWxsYmFjaywgYW5kIHBhcmFtZXRlcnMgd2hpY2ggaXMgYXJyYXlcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqQ2FsbCAmJiAodHlwZW9mIG9iakNhbGwgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmpDYWxsKSkgPT09IFwib2JqZWN0XCIgJiYgb2JqQ2FsbC5jb250ZXh0ICYmIG9iakNhbGwuY2FsbGJhY2sgJiYgb2JqQ2FsbC5wYXJhbXMgJiYgX3R5cGVvZihvYmpDYWxsLmNvbnRleHQpID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBvYmpDYWxsLmNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIgJiYgQXJyYXkuaXNBcnJheShvYmpDYWxsLnBhcmFtcykpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIENhbGwgc3Vic2NyaWJlZCBtZXRob2Rcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iakNhbGwuY2FsbGJhY2suYXBwbHkob2JqQ2FsbC5jb250ZXh0LCBvYmpDYWxsLnBhcmFtcyk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuXHQgICAgICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogUmVjYWxsIHdhdGNoZXJcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByb290LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLndhdGNoLmJpbmQodGhpcykpO1xuXHQgICAgfTtcblx0XG5cdCAgICByZXR1cm4gQW5pbWF0aW9uRnJhbWU7XG5cdH0oKTtcblx0LyoqXG5cdCAqIENyZWF0ZSBzaW5nbGUgcmVxdWVzdCBhbmltYXRpb24gZnJhbWUgb2JqZWN0XG5cdCAqIEB0eXBlIHtBbmltYXRpb25GcmFtZX1cblx0ICovXG5cdFxuXHRcblx0cm9vdC5BbmltYXRpb25GcmFtZSA9IHJvb3QuQW5pbWF0aW9uRnJhbWUgfHwgbmV3IEFuaW1hdGlvbkZyYW1lKCk7XG5cdC8qKlxuXHQgKiBFeHBvcnQgc2luZ2xlIEFuaW1hdGlvbkZyYW1lIGluc3RhbmNlXG5cdCAqL1xuXHR2YXIgX0FuaW1hdGlvbkZyYW1lID0gcm9vdC5BbmltYXRpb25GcmFtZTtcblx0ZXhwb3J0cy5kZWZhdWx0ID0gX0FuaW1hdGlvbkZyYW1lO1xuXHRcblx0bW9kdWxlLmV4cG9ydHMgPSBfQW5pbWF0aW9uRnJhbWU7XG5cdC8qIFdFQlBBQ0sgVkFSIElOSkVDVElPTiAqL30uY2FsbChleHBvcnRzLCAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KCkpKSlcblxuLyoqKi8gfVxuXG4vKioqKioqLyB9KVxufSk7XG47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTkxYm1sMlpYSnpZV3hOYjJSMWJHVkVaV1pwYm1sMGFXOXVQelZqWVRZcUtpSXNJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFnT1RCaVpUTTVZemxqTVRsa05UY3dPR1EyTURjL01qUTRaU29xSWl3aWQyVmljR0ZqYXpvdkx5OHVMMnhwWWk5QmJtbHRZWFJwYjI1R2NtRnRaUzUwY3o4ME1UUXpLaUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4RFFVRkRPMEZCUTBRc1R6dEJRMVpCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxIVkNRVUZsTzBGQlEyWTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3T3p0QlFVZEJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3T3pzN096czdPenM3T3pzN096czdRVU4wUTBFN08wRkJSVUU3TzBGQlJVRXNjVWRCUVc5SExHMUNRVUZ0UWl4RlFVRkZMRzFDUVVGdFFpdzRTRUZCT0VnN08wRkJSVEZSTEd0RVFVRnBSQ3d3UTBGQk1FTXNNRVJCUVRCRUxFVkJRVVU3TzBGQlJYWktPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVFVGQlN6dEJRVU5NTzBGQlEwRTdRVUZEUVN4RlFVRkRPMEZCUTBRN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1JVRkJRenRCUVVORU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxEWkNRVUUwUWl4cFFrRkJhVUk3UVVGRE4wTTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3cwUWtGQk1rSXNjMEpCUVhOQ08wRkJRMnBFTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNhVUpCUVdkQ08wRkJRMmhDT3pzN1FVRkhRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4VlFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPenRCUVVkQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN096dEJRVWRCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzTUVKQlFYbENPMEZCUTNwQ08wRkJRMEU3UVVGRFFUdEJRVU5CTEZWQlFWTTdRVUZEVkR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNSVUZCUXp0QlFVTkVPMEZCUTBFN1FVRkRRU3hYUVVGVk8wRkJRMVk3T3p0QlFVZEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVN4clF5SXNJbVpwYkdVaU9pSXVMMnhwWWk5QmJtbHRZWFJwYjI1R2NtRnRaUzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpaG1kVzVqZEdsdmJpQjNaV0p3WVdOclZXNXBkbVZ5YzJGc1RXOWtkV3hsUkdWbWFXNXBkR2x2YmloeWIyOTBMQ0JtWVdOMGIzSjVLU0I3WEc1Y2RHbG1LSFI1Y0dWdlppQmxlSEJ2Y25SeklEMDlQU0FuYjJKcVpXTjBKeUFtSmlCMGVYQmxiMllnYlc5a2RXeGxJRDA5UFNBbmIySnFaV04wSnlsY2JseDBYSFJ0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1poWTNSdmNua29LVHRjYmx4MFpXeHpaU0JwWmloMGVYQmxiMllnWkdWbWFXNWxJRDA5UFNBblpuVnVZM1JwYjI0bklDWW1JR1JsWm1sdVpTNWhiV1FwWEc1Y2RGeDBaR1ZtYVc1bEtGd2lRVzVwYldGMGFXOXVSbkpoYldWY0lpd2dXMTBzSUdaaFkzUnZjbmtwTzF4dVhIUmxiSE5sSUdsbUtIUjVjR1Z2WmlCbGVIQnZjblJ6SUQwOVBTQW5iMkpxWldOMEp5bGNibHgwWEhSbGVIQnZjblJ6VzF3aVFXNXBiV0YwYVc5dVJuSmhiV1ZjSWwwZ1BTQm1ZV04wYjNKNUtDazdYRzVjZEdWc2MyVmNibHgwWEhSeWIyOTBXMXdpUVc1cGJXRjBhVzl1Um5KaGJXVmNJbDBnUFNCbVlXTjBiM0o1S0NrN1hHNTlLU2gwYUdsekxDQm1kVzVqZEdsdmJpZ3BJSHRjYm5KbGRIVnliaUJjYmx4dVhHNHZMeUJYUlVKUVFVTkxJRVpQVDFSRlVpQXZMMXh1THk4Z2QyVmljR0ZqYXk5MWJtbDJaWEp6WVd4TmIyUjFiR1ZFWldacGJtbDBhVzl1SWl3aUlGeDBMeThnVkdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MGRtRnlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTWdQU0I3ZlR0Y2JseHVJRngwTHk4Z1ZHaGxJSEpsY1hWcGNtVWdablZ1WTNScGIyNWNiaUJjZEdaMWJtTjBhVzl1SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b2JXOWtkV3hsU1dRcElIdGNibHh1SUZ4MFhIUXZMeUJEYUdWamF5QnBaaUJ0YjJSMWJHVWdhWE1nYVc0Z1kyRmphR1ZjYmlCY2RGeDBhV1lvYVc1emRHRnNiR1ZrVFc5a2RXeGxjMXR0YjJSMWJHVkpaRjBwWEc0Z1hIUmNkRngwY21WMGRYSnVJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRMbVY0Y0c5eWRITTdYRzVjYmlCY2RGeDBMeThnUTNKbFlYUmxJR0VnYm1WM0lHMXZaSFZzWlNBb1lXNWtJSEIxZENCcGRDQnBiblJ2SUhSb1pTQmpZV05vWlNsY2JpQmNkRngwZG1GeUlHMXZaSFZzWlNBOUlHbHVjM1JoYkd4bFpFMXZaSFZzWlhOYmJXOWtkV3hsU1dSZElEMGdlMXh1SUZ4MFhIUmNkR1Y0Y0c5eWRITTZJSHQ5TEZ4dUlGeDBYSFJjZEdsa09pQnRiMlIxYkdWSlpDeGNiaUJjZEZ4MFhIUnNiMkZrWldRNklHWmhiSE5sWEc0Z1hIUmNkSDA3WEc1Y2JpQmNkRngwTHk4Z1JYaGxZM1YwWlNCMGFHVWdiVzlrZFd4bElHWjFibU4wYVc5dVhHNGdYSFJjZEcxdlpIVnNaWE5iYlc5a2RXeGxTV1JkTG1OaGJHd29iVzlrZFd4bExtVjRjRzl5ZEhNc0lHMXZaSFZzWlN3Z2JXOWtkV3hsTG1WNGNHOXlkSE1zSUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4cE8xeHVYRzRnWEhSY2RDOHZJRVpzWVdjZ2RHaGxJRzF2WkhWc1pTQmhjeUJzYjJGa1pXUmNiaUJjZEZ4MGJXOWtkV3hsTG14dllXUmxaQ0E5SUhSeWRXVTdYRzVjYmlCY2RGeDBMeThnVW1WMGRYSnVJSFJvWlNCbGVIQnZjblJ6SUc5bUlIUm9aU0J0YjJSMWJHVmNiaUJjZEZ4MGNtVjBkWEp1SUcxdlpIVnNaUzVsZUhCdmNuUnpPMXh1SUZ4MGZWeHVYRzVjYmlCY2RDOHZJR1Y0Y0c5elpTQjBhR1VnYlc5a2RXeGxjeUJ2WW1wbFkzUWdLRjlmZDJWaWNHRmphMTl0YjJSMWJHVnpYMThwWEc0Z1hIUmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZMbTBnUFNCdGIyUjFiR1Z6TzF4dVhHNGdYSFF2THlCbGVIQnZjMlVnZEdobElHMXZaSFZzWlNCallXTm9aVnh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NWpJRDBnYVc1emRHRnNiR1ZrVFc5a2RXeGxjenRjYmx4dUlGeDBMeThnWDE5M1pXSndZV05yWDNCMVlteHBZMTl3WVhSb1gxOWNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dWNDQTlJRndpWENJN1hHNWNiaUJjZEM4dklFeHZZV1FnWlc1MGNua2diVzlrZFd4bElHRnVaQ0J5WlhSMWNtNGdaWGh3YjNKMGMxeHVJRngwY21WMGRYSnVJRjlmZDJWaWNHRmphMTl5WlhGMWFYSmxYMThvTUNrN1hHNWNibHh1WEc0dkx5QlhSVUpRUVVOTElFWlBUMVJGVWlBdkwxeHVMeThnZDJWaWNHRmpheTlpYjI5MGMzUnlZWEFnT1RCaVpUTTVZemxqTVRsa05UY3dPR1EyTURjaUxDSmNJblZ6WlNCemRISnBZM1JjSWp0Y2JseHVaWGh3YjNKMGN5NWZYMlZ6VFc5a2RXeGxJRDBnZEhKMVpUdGNibHh1ZG1GeUlGOTBlWEJsYjJZZ1BTQjBlWEJsYjJZZ1UzbHRZbTlzSUQwOVBTQmNJbVoxYm1OMGFXOXVYQ0lnSmlZZ2RIbHdaVzltSUZONWJXSnZiQzVwZEdWeVlYUnZjaUE5UFQwZ1hDSnplVzFpYjJ4Y0lpQS9JR1oxYm1OMGFXOXVJQ2h2WW1vcElIc2djbVYwZFhKdUlIUjVjR1Z2WmlCdlltbzdJSDBnT2lCbWRXNWpkR2x2YmlBb2IySnFLU0I3SUhKbGRIVnliaUJ2WW1vZ0ppWWdkSGx3Wlc5bUlGTjViV0p2YkNBOVBUMGdYQ0ptZFc1amRHbHZibHdpSUNZbUlHOWlhaTVqYjI1emRISjFZM1J2Y2lBOVBUMGdVM2x0WW05c0lDWW1JRzlpYWlBaFBUMGdVM2x0WW05c0xuQnliM1J2ZEhsd1pTQS9JRndpYzNsdFltOXNYQ0lnT2lCMGVYQmxiMllnYjJKcU95QjlPMXh1WEc1bWRXNWpkR2x2YmlCZlkyeGhjM05EWVd4c1EyaGxZMnNvYVc1emRHRnVZMlVzSUVOdmJuTjBjblZqZEc5eUtTQjdJR2xtSUNnaEtHbHVjM1JoYm1ObElHbHVjM1JoYm1ObGIyWWdRMjl1YzNSeWRXTjBiM0lwS1NCN0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9YQ0pEWVc1dWIzUWdZMkZzYkNCaElHTnNZWE56SUdGeklHRWdablZ1WTNScGIyNWNJaWs3SUgwZ2ZWeHVYRzUyWVhJZ2NtOXZkQ0E5SUhadmFXUWdNRHRjYm1sbUlDaDBlWEJsYjJZZ2QybHVaRzkzSUQwOVBTQmNJblZ1WkdWbWFXNWxaRndpS1NCN1hHNGdJQ0FnYVdZZ0tIUjVjR1Z2WmlCbmJHOWlZV3dnSVQwOUlGd2lkVzVrWldacGJtVmtYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ2NtOXZkQ0E5SUdkc2IySmhiRHRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQnliMjkwSUQwZ2UzMDdYRzRnSUNBZ2ZWeHVmU0JsYkhObElIdGNiaUFnSUNCeWIyOTBJRDBnZDJsdVpHOTNPMXh1ZlZ4dUx5b3FYRzRnS2lCeVpYRjFaWE4wUVc1cGJXRjBhVzl1Um5KaGJXVWdjRzlzZVdacGJHeGNiaUFxTDF4dWNtOXZkQzV5WlhGMVpYTjBRVzVwYldGMGFXOXVSbkpoYldVZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdjbVYwZFhKdUlIUjVjR1Z2WmlCeWIyOTBJQ0U5UFNCY0luVnVaR1ZtYVc1bFpGd2lJQ1ltSUNoeWIyOTBMbkpsY1hWbGMzUkJibWx0WVhScGIyNUdjbUZ0WlNCOGZDQnliMjkwTG5kbFltdHBkRkpsY1hWbGMzUkJibWx0WVhScGIyNUdjbUZ0WlNCOGZDQnliMjkwTG0xdmVsSmxjWFZsYzNSQmJtbHRZWFJwYjI1R2NtRnRaU0I4ZkNCeWIyOTBMbTlTWlhGMVpYTjBRVzVwYldGMGFXOXVSbkpoYldVZ2ZId2djbTl2ZEM1dGMxSmxjWFZsYzNSQmJtbHRZWFJwYjI1R2NtRnRaU2tnZkh3Z1puVnVZM1JwYjI0Z0tHTmhiR3hpWVdOcktTQjdYRzRnSUNBZ0lDQWdJSEp2YjNRdWMyVjBWR2x0Wlc5MWRDaGpZV3hzWW1GamF5d2dNVEF3TUNBdklEWXdLVHRjYmlBZ0lDQjlPMXh1ZlNncE8xeHVMeW9xWEc0Z0tpQkNhVzVrSUhCdmJIbG1hV3hzWEc0Z0tpOWNibVoxYm1OMGFXOXVJR0pwYm1Rb1lpa2dlMXh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRWxtSUhSeWVTQmlhVzVrSUhaaGNtbGhZbXhsSUhSb1lYUWdibTkwSUdFZ1puVnVZM1JwYjI0c0lIUm9aVzRnZEdoeWIzY2daWEp5YjNKY2JpQWdJQ0FnS2k5Y2JpQWdJQ0JwWmlBb2RIbHdaVzltSUhSb2FYTWdJVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpa2dlMXh1SUNBZ0lDQWdJQ0IwYUhKdmR5QnVaWGNnVkhsd1pVVnljbTl5S0Z3aVJuVnVZM1JwYjI0dWNISnZkRzkwZVhCbExtSnBibVFnTFNCM2FHRjBJR2x6SUhSeWVXbHVaeUIwYnlCaVpTQmliM1Z1WkNCcGN5QnViM1FnWTJGc2JHRmliR1ZjSWlrN1hHNGdJQ0FnZlZ4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUd4bGRDQkJjbkpoZVNCemJHbGpaU0JtZFc1amRHbHZibHh1SUNBZ0lDQXFMMXh1SUNBZ0lIWmhjaUJoSUQwZ1FYSnlZWGt1Y0hKdmRHOTBlWEJsTG5Oc2FXTmxPMXh1SUNBZ0lIWmhjaUJtSUQwZ1lTNWpZV3hzS0dGeVozVnRaVzUwY3l3Z01TazdYRzRnSUNBZ2RtRnlJR1VnUFNCMGFHbHpPMXh1SUNBZ0lHWjFibU4wYVc5dUlHTW9LU0I3WEc0Z0lDQWdJQ0FnSUM4cVhHNGdJQ0FnSUNBZ0lDQnBaaUFvWEc0Z0lDQWdJQ0FnSUNCMGVYQmxiMllnY205dmRDQWhQVDBnWENKMWJtUmxabWx1WldSY0lpQW1KbHh1SUNBZ0lDQWdJQ0FnZEhsd1pXOW1JSEp2YjNRdVkyOXVjMjlzWlNBOVBUMGdYQ0p2WW1wbFkzUmNJaUFtSmx4dUlDQWdJQ0FnSUNBZ2RIbHdaVzltSUhKdmIzUXVZMjl1YzI5c1pTNXNiMmNnUFQwOUlGd2lablZ1WTNScGIyNWNJbHh1SUNBZ0lDQWdJQ0FnS1NCN1hHNGdJQ0FnSUNBZ0lDQnliMjkwTG1OdmJuTnZiR1V1Ykc5bktGd2lRbWx1WkNCd2IyeDVabWxzYkZ3aUtUdGNiaUFnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNvdlhHNGdJQ0FnZlZ4dUlDQWdJR1oxYm1OMGFXOXVJR1FvS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCbExtRndjR3g1S0hSb2FYTWdhVzV6ZEdGdVkyVnZaaUJqSUQ4Z2RHaHBjeUE2SUdJZ2ZId2djbTl2ZEN3Z1ppNWpiMjVqWVhRb1lTNWpZV3hzS0dGeVozVnRaVzUwY3lrcEtUdGNiaUFnSUNCOVhHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1VtVm5hWE4wWlhKbFpDQjBhR2x6SUhCeWIzUnZkSGx3WlNCaGN5QndjbTkwYjNSNWNHVWdkRzhnWW1sdVpDQnBiWEJzWlcxbGJuUmhkR2x2YmlCbWRXNWpkR2x2Ym5OY2JpQWdJQ0FnS2k5Y2JpQWdJQ0JqTG5CeWIzUnZkSGx3WlNBOUlIUm9hWE11Y0hKdmRHOTBlWEJsTzF4dUlDQWdJR1F1Y0hKdmRHOTBlWEJsSUQwZ2JtVjNJR01vS1R0Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCU1pYUjFjbTRnWW1sdVpDQndiMng1Wm1sc2JGeHVJQ0FnSUNBcUwxeHVJQ0FnSUhKbGRIVnliaUJrTzF4dWZWeHVSblZ1WTNScGIyNHVjSEp2ZEc5MGVYQmxMbUpwYm1RZ1BTQkdkVzVqZEdsdmJpNXdjbTkwYjNSNWNHVXVZbWx1WkNCOGZDQmlhVzVrTzF4dUx5b3FYRzRnS2lCUFltcGxZM1F1YTJWNWN5QndiMng1Wm1sc2JGeHVJQ292WEc1bWRXNWpkR2x2YmlCclpYbHpLQ2tnZTF4dUlDQWdJSFpoY2lCb1lYTkViMDV2ZEVWdWRXMUNkV2NnUFNBaGV5QjBiMU4wY21sdVp6b2diblZzYkNCOUxuQnliM0JsY25SNVNYTkZiblZ0WlhKaFlteGxLRndpZEc5VGRISnBibWRjSWlrN1hHNGdJQ0FnZG1GeUlHUnZUbTkwUlc1MWJYTWdQU0JiWENKMGIxTjBjbWx1WjF3aUxDQmNJblJ2VEc5allXeGxVM1J5YVc1blhDSXNJRndpZG1Gc2RXVlBabHdpTENCY0ltaGhjMDkzYmxCeWIzQmxjblI1WENJc0lGd2lhWE5RY205MGIzUjVjR1ZQWmx3aUxDQmNJbkJ5YjNCbGNuUjVTWE5GYm5WdFpYSmhZbXhsWENJc0lGd2lZMjl1YzNSeWRXTjBiM0pjSWwwN1hHNGdJQ0FnZG1GeUlHUnZUbTkwUlc1MWJYTk1aVzVuZEdnZ1BTQmtiMDV2ZEVWdWRXMXpMbXhsYm1kMGFEdGNiaUFnSUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0c5aWFpa2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb0tIUjVjR1Z2WmlCdlltb2dQVDA5SUZ3aWRXNWtaV1pwYm1Wa1hDSWdQeUJjSW5WdVpHVm1hVzVsWkZ3aUlEb2dYM1I1Y0dWdlppaHZZbW9wS1NBaFBUMGdYQ0p2WW1wbFkzUmNJaUFtSmlBb2RIbHdaVzltSUc5aWFpQWhQVDBnWENKbWRXNWpkR2x2Ymx3aUlIeDhJRzlpYWlBOVBUMGdiblZzYkNrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb1hDSlBZbXBsWTNRdWEyVjVjeUJqWVd4c1pXUWdiMjRnYm05dUxXOWlhbVZqZEZ3aUtUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0IyWVhJZ2NtVnpkV3gwSUQwZ1cxMDdYRzRnSUNBZ0lDQWdJR1p2Y2lBb2RtRnlJSEJ5YjNBZ2FXNGdiMkpxS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1QySnFaV04wTG5CeWIzUnZkSGx3WlM1b1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tHOWlhaXdnY0hKdmNDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhOMWJIUXVjSFZ6YUNod2NtOXdLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0JwWmlBb2FHRnpSRzlPYjNSRmJuVnRRblZuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUdSdlRtOTBSVzUxYlhOTVpXNW5kR2c3SUdrckt5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b2IySnFMQ0JrYjA1dmRFVnVkVzF6VzJsZEtTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYTjFiSFF1Y0hWemFDaGtiMDV2ZEVWdWRXMXpXMmxkS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhKbGMzVnNkRHRjYmlBZ0lDQjlPMXh1ZlZ4dVQySnFaV04wTG10bGVYTWdQU0JQWW1wbFkzUXVhMlY1Y3lCOGZDQnJaWGx6S0NrN1hHNHZLaXBjYmlBcUlGSmxjWFZsYzNRZ1lXNXBiV0YwYVc5dUlHWnlZVzFsSUdOaGJHd2djM1JoWTJzZ1kyeGhjM05jYmlBcUwxeHVYRzUyWVhJZ1FXNXBiV0YwYVc5dVJuSmhiV1VnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dRM0psWVhSbElISmxjWFZsYzNRZ1lXNXBiV0YwYVc5dUlHWnlZVzFsWEc0Z0lDQWdJQ292WEc0Z0lDQWdablZ1WTNScGIyNGdRVzVwYldGMGFXOXVSbkpoYldVb0tTQjdYRzRnSUNBZ0lDQWdJRjlqYkdGemMwTmhiR3hEYUdWamF5aDBhR2x6TENCQmJtbHRZWFJwYjI1R2NtRnRaU2s3WEc1Y2JpQWdJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdJQ0FxSUZOMVluTmpjbWxpWldRZ2JXVjBhRzlrYzF4dUlDQWdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lDQWdkR2hwY3k1emRHRmpheUE5SUh0OU8xeHVJQ0FnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FnSUNvZ1UzUmhjblFnY21WeGRXVnpkRUZ1YVcxaGRHbHZia1p5WVcxbElIZGhkR05vWlhKY2JpQWdJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQWdJSFJvYVhNdWQyRjBZMmdvS1R0Y2JpQWdJQ0I5WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nVTNWaWMyTnlhV0psSUcxbGRHaHZaQ0IwYnlCM1lYUmphRnh1SUNBZ0lDQXFJRUJ3WVhKaGJTQmpiMjUwWlhoMFhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUdOaGJHeGlZV05yWEc0Z0lDQWdJQ29nUUhCaGNtRnRJSEJoY21GdGMxeHVJQ0FnSUNBcUlFQndZWEpoYlNCSlJGeHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UySnZiMnhsWVc1OGMzUnlhVzVuZlZ4dUlDQWdJQ0FxTDF4dVhHNWNiaUFnSUNCQmJtbHRZWFJwYjI1R2NtRnRaUzV3Y205MGIzUjVjR1V1YzNWaWMyTnlhV0psSUQwZ1puVnVZM1JwYjI0Z2MzVmljMk55YVdKbEtDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ1kyOXVkR1Y0ZENBOUlHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnZ1BpQXdJQ1ltSUdGeVozVnRaVzUwYzFzd1hTQWhQVDBnZFc1a1pXWnBibVZrSUQ4Z1lYSm5kVzFsYm5Seld6QmRJRG9nY205dmREdGNiaUFnSUNBZ0lDQWdkbUZ5SUdOaGJHeGlZV05ySUQwZ1lYSm5kVzFsYm5SekxteGxibWQwYUNBK0lERWdKaVlnWVhKbmRXMWxiblJ6V3pGZElDRTlQU0IxYm1SbFptbHVaV1FnUHlCaGNtZDFiV1Z1ZEhOYk1WMGdPaUJtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdiblZzYkR0Y2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdkbUZ5SUhCaGNtRnRjeUE5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBeUlDWW1JR0Z5WjNWdFpXNTBjMXN5WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pKZElEb2dXMTA3WEc0Z0lDQWdJQ0FnSUhaaGNpQkpSQ0E5SUdGeVozVnRaVzUwYzFzelhUdGNibHh1SUNBZ0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBZ0lDb2dTV1lnWTI5dWRHVjRkQ0JoYm1RZ1kyRnNiR0poWTJzZ2NHRnpjMlZrSUdGdVpDQjBhR1Y1SUdGeVpTQnZZbXBsWTNRZ1lXNWtJR1oxYm1OMGFXOXVYRzRnSUNBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnSUNCcFppQW9LSFI1Y0dWdlppQmpiMjUwWlhoMElEMDlQU0JjSW5WdVpHVm1hVzVsWkZ3aUlEOGdYQ0oxYm1SbFptbHVaV1JjSWlBNklGOTBlWEJsYjJZb1kyOXVkR1Y0ZENrcElEMDlQU0JjSW05aWFtVmpkRndpSUNZbUlIUjVjR1Z2WmlCallXeHNZbUZqYXlBOVBUMGdYQ0ptZFc1amRHbHZibHdpSUNZbUlDaDBlWEJsYjJZZ2NHRnlZVzF6SUQwOVBTQmNJblZ1WkdWbWFXNWxaRndpSUQ4Z1hDSjFibVJsWm1sdVpXUmNJaUE2SUY5MGVYQmxiMllvY0dGeVlXMXpLU2tnUFQwOUlGd2liMkpxWldOMFhDSWdKaVlnUVhKeVlYa3VhWE5CY25KaGVTaHdZWEpoYlhNcElDWW1JQ2hKUkNBOVBUMGdkVzVrWldacGJtVmtJSHg4SUhSNWNHVnZaaUJKUkNBOVBUMGdYQ0p6ZEhKcGJtZGNJaWtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ29nUTNKbFlYUmxJRlZKUkZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnWkNBOUlHNWxkeUJFWVhSbEtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdiRzlqWVd4SlJDQTlJRWxFSUh4OElGd2llQzFjSWlBcklHUXVaMlYwVkdsdFpTZ3BJQ3NnWENJdFhDSWdLeUJOWVhSb0xuSnZkVzVrS0UxaGRHZ3VjbUZ1Wkc5dEtDa2dLaUF4WlRZcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnS2lCQlpHUWdiV1YwYUc5a0lIUnZJSFJvWlNCemRHRmphMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbk4wWVdOclcyeHZZMkZzU1VSZElEMGdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR052Ym5SbGVIUTZJR052Ym5SbGVIUXNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMkZzYkdKaFkyczZJR05oYkd4aVlXTnJMRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEJoY21GdGN6b2djR0Z5WVcxelhHNGdJQ0FnSUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdLaUJYY21sMFpTQjBieUJqYjI1emIyeGxJR052ZFc1MElHOW1JSFJvWlNCemRXSnpZM0pwWW1Wa0lHMWxkR2h2WkhOY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnSUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdLaUJTWlhSMWNtNGdWVWxFWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdLaTljYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCc2IyTmhiRWxFTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHWmhiSE5sTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlR0Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCVmJuTjFZbk5qY21saVpTQnRaWFJvYjJRZ1lua2dTVVJjYmlBZ0lDQWdLaUJBY0dGeVlXMGdTVVJjYmlBZ0lDQWdLaTljYmx4dVhHNGdJQ0FnUVc1cGJXRjBhVzl1Um5KaGJXVXVjSEp2ZEc5MGVYQmxMblZ1YzNWaWMyTnlhV0psSUQwZ1puVnVZM1JwYjI0Z2RXNXpkV0p6WTNKcFltVW9TVVFwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQkpSQ0E5UFQwZ1hDSnpkSEpwYm1kY0lpa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0tpQkpaaUJ5WlhGMWFYSmxaQ0J0WlhSb2IyUWdaWGhwYzNRZ2FXNGdkR2hsSUhOMFlXTnJYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaDBhR2x6TG5OMFlXTnJXMGxFWFNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FxSUU1MWJHeHBabmtnYldWMGFHOWtJR2x1SUhSb1pTQnpkR0ZqYXlCaGJtUWdaR1Z6ZEhKdmVTQnBkRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVjM1JoWTJ0YlNVUmRJRDBnWm1Gc2MyVTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaR1ZzWlhSbElIUm9hWE11YzNSaFkydGJTVVJkTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVHRjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJYWVhSamFDQmhibVFnWTJGc2JDQnRaWFJvYjJSelhHNGdJQ0FnSUNvdlhHNWNibHh1SUNBZ0lFRnVhVzFoZEdsdmJrWnlZVzFsTG5CeWIzUnZkSGx3WlM1M1lYUmphQ0E5SUdaMWJtTjBhVzl1SUhkaGRHTm9LQ2tnZTF4dUlDQWdJQ0FnSUNCMGNua2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0tpQkpaaUJ6ZEdGamF5QmxlR2x6ZEN3Z2FYUWdhWE1nWVc0Z2IySnFaV04wSUdGdVpDQnBkQ0JwY3lCamIyNTBZV2x1Y3lCdFpYUm9iMlJ6WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdLaTljYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxuTjBZV05ySUNZbUlGOTBlWEJsYjJZb2RHaHBjeTV6ZEdGamF5a2dQVDA5SUZ3aWIySnFaV04wWENJZ0ppWWdUMkpxWldOMExtdGxlWE1vZEdocGN5NXpkR0ZqYXlrdWJHVnVaM1JvSUQ0Z01Da2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBcUlFeHZiM0FnWVd4c0lHMWxkR2h2WkhNZ2FXNGdjM1JoWTJ0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQm1iM0lnS0haaGNpQkpSQ0JwYmlCMGFHbHpMbk4wWVdOcktTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnS2lCUWNtOWpaWE56SUc5dWJIa2diV1YwYUc5a2N5QjNhWFJvYjNWMElHVjRkR1Z1WkdWa0lIQnliM0JsY25ScFpYTmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMGFHbHpMbk4wWVdOckxtaGhjMDkzYmxCeWIzQmxjblI1S0VsRUtTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0tpQkpaaUJKUkNCbGVHbHpkQ0JoYm1RZ2FYUWdhWE1nWVNCemRISnBibWRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1NVUWdKaVlnZEhsd1pXOW1JRWxFSUQwOVBTQmNJbk4wY21sdVoxd2lLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnS2lCSFpYUWdjM1ZpYzJOeWFXSmxaQ0J0WlhSb2IyUWdjR0Z5WVcxeklHSjVJRWxFWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2IySnFRMkZzYkNBOUlIUm9hWE11YzNSaFkydGJTVVJkTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNvZ1NXWWdjR0Z5WVcxeklHVjRhWE4wTENCcGRDQnBjeUJoYmlCdlltcGxZM1FzSUdGdVpDQnBkQ0JwY3lCamIyNTBZV2x1Y3lCallXeHNJR052Ym5SbGVIUXNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXFJR05oYkd4aVlXTnJMQ0JoYm1RZ2NHRnlZVzFsZEdWeWN5QjNhR2xqYUNCcGN5QmhjbkpoZVZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHOWlha05oYkd3Z0ppWWdLSFI1Y0dWdlppQnZZbXBEWVd4c0lEMDlQU0JjSW5WdVpHVm1hVzVsWkZ3aUlEOGdYQ0oxYm1SbFptbHVaV1JjSWlBNklGOTBlWEJsYjJZb2IySnFRMkZzYkNrcElEMDlQU0JjSW05aWFtVmpkRndpSUNZbUlHOWlha05oYkd3dVkyOXVkR1Y0ZENBbUppQnZZbXBEWVd4c0xtTmhiR3hpWVdOcklDWW1JRzlpYWtOaGJHd3VjR0Z5WVcxeklDWW1JRjkwZVhCbGIyWW9iMkpxUTJGc2JDNWpiMjUwWlhoMEtTQTlQVDBnWENKdlltcGxZM1JjSWlBbUppQjBlWEJsYjJZZ2IySnFRMkZzYkM1allXeHNZbUZqYXlBOVBUMGdYQ0ptZFc1amRHbHZibHdpSUNZbUlFRnljbUY1TG1selFYSnlZWGtvYjJKcVEyRnNiQzV3WVhKaGJYTXBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FxSUVOaGJHd2djM1ZpYzJOeWFXSmxaQ0J0WlhSb2IyUmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2IySnFRMkZzYkM1allXeHNZbUZqYXk1aGNIQnNlU2h2WW1wRFlXeHNMbU52Ym5SbGVIUXNJRzlpYWtOaGJHd3VjR0Z5WVcxektUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDBnWTJGMFkyZ2dLR1VwSUh0OVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSDBnWTJGMFkyZ2dLR1VwSUh0OVhHNGdJQ0FnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ0FnS2lCU1pXTmhiR3dnZDJGMFkyaGxjbHh1SUNBZ0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUNBZ2NtOXZkQzV5WlhGMVpYTjBRVzVwYldGMGFXOXVSbkpoYldVb2RHaHBjeTUzWVhSamFDNWlhVzVrS0hSb2FYTXBLVHRjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdjbVYwZFhKdUlFRnVhVzFoZEdsdmJrWnlZVzFsTzF4dWZTZ3BPMXh1THlvcVhHNGdLaUJEY21WaGRHVWdjMmx1WjJ4bElISmxjWFZsYzNRZ1lXNXBiV0YwYVc5dUlHWnlZVzFsSUc5aWFtVmpkRnh1SUNvZ1FIUjVjR1VnZTBGdWFXMWhkR2x2YmtaeVlXMWxmVnh1SUNvdlhHNWNibHh1Y205dmRDNUJibWx0WVhScGIyNUdjbUZ0WlNBOUlISnZiM1F1UVc1cGJXRjBhVzl1Um5KaGJXVWdmSHdnYm1WM0lFRnVhVzFoZEdsdmJrWnlZVzFsS0NrN1hHNHZLaXBjYmlBcUlFVjRjRzl5ZENCemFXNW5iR1VnUVc1cGJXRjBhVzl1Um5KaGJXVWdhVzV6ZEdGdVkyVmNiaUFxTDF4dWRtRnlJRjlCYm1sdFlYUnBiMjVHY21GdFpTQTlJSEp2YjNRdVFXNXBiV0YwYVc5dVJuSmhiV1U3WEc1bGVIQnZjblJ6TG1SbFptRjFiSFFnUFNCZlFXNXBiV0YwYVc5dVJuSmhiV1U3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1gwRnVhVzFoZEdsdmJrWnlZVzFsTzF4dVhHNWNiaTh2THk4dkx5OHZMeTh2THk4dkx5OHZMMXh1THk4Z1YwVkNVRUZEU3lCR1QwOVVSVkpjYmk4dklDNHZiR2xpTDBGdWFXMWhkR2x2YmtaeVlXMWxMblJ6WEc0dkx5QnRiMlIxYkdVZ2FXUWdQU0ExWEc0dkx5QnRiMlIxYkdVZ1kyaDFibXR6SUQwZ01TQXlJRE1pWFN3aWMyOTFjbU5sVW05dmRDSTZJaUo5XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L0FuaW1hdGlvbkZyYW1lL2xpYi9BbmltYXRpb25GcmFtZS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiAzIiwiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJVdGlsc1wiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJVdGlsc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJVdGlsc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG5cbi8qKiovIH0sXG4vKiAxICovLFxuLyogMiAqLyxcbi8qIDMgKi8sXG4vKiA0ICovLFxuLyogNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdC8qKlxuXHQgKiBJbXBvcnQgc3ViY2xhc3Nlc1xuXHQgKi9cblx0XG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cdFxuXHR2YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cdFxuXHR2YXIgX1V0aWxzQW5pbWF0aW9uID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcblx0XG5cdHZhciBfVXRpbHNBbmltYXRpb24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNBbmltYXRpb24pO1xuXHRcblx0dmFyIF9VdGlsc0Jyb3dzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXHRcblx0dmFyIF9VdGlsc0Jyb3dzZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNCcm93c2VyKTtcblx0XG5cdHZhciBfVXRpbHNDb29raWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDkpO1xuXHRcblx0dmFyIF9VdGlsc0Nvb2tpZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0Nvb2tpZSk7XG5cdFxuXHR2YXIgX1V0aWxzRG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE2KTtcblx0XG5cdHZhciBfVXRpbHNEb2N1bWVudDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0RvY3VtZW50KTtcblx0XG5cdHZhciBfVXRpbHNET00gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE4KTtcblx0XG5cdHZhciBfVXRpbHNET00yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNET00pO1xuXHRcblx0dmFyIF9VdGlsc01vdXNlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cdFxuXHR2YXIgX1V0aWxzTW91c2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNNb3VzZSk7XG5cdFxuXHR2YXIgX1V0aWxzU2NyZWVuID0gX193ZWJwYWNrX3JlcXVpcmVfXygyMCk7XG5cdFxuXHR2YXIgX1V0aWxzU2NyZWVuMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzU2NyZWVuKTtcblx0XG5cdHZhciBfVXRpbHNTeXN0ZW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIxKTtcblx0XG5cdHZhciBfVXRpbHNTeXN0ZW0yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTeXN0ZW0pO1xuXHRcblx0dmFyIF9VdGlsc1VzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIyKTtcblx0XG5cdHZhciBfVXRpbHNVc2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzVXNlcik7XG5cdFxuXHR2YXIgX1V0aWxzV2luZG93ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cdFxuXHR2YXIgX1V0aWxzV2luZG93MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzV2luZG93KTtcblx0XG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cdFxuXHRmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXHRcblx0LyoqXG5cdCAqIEdsb2JhbCBVdGlscyBjbGFzc1xuXHQgKi9cblx0dmFyIFV0aWxzID0gZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gVXRpbHMoKSB7XG5cdCAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFV0aWxzKTtcblx0ICAgIH1cblx0XG5cdCAgICBVdGlscy53YXJuID0gZnVuY3Rpb24gd2FybihtZXNzYW5nZSkge1xuXHQgICAgICAgIGlmICgodHlwZW9mIGNvbnNvbGUgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihjb25zb2xlKSkgPT09IFwib2JqZWN0XCIpIHtcblx0ICAgICAgICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xuXHQgICAgICAgICAgICAgICAgLy9jb25zb2xlLndhcm4obWVzc2FuZ2UpO1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhbmdlO1xuXHQgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25zb2xlLmxvZyA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdCAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKG1lc3NhbmdlKTtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYW5nZTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIEBkZXByZWNhdGVkIFV0aWxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCBtZXRob2Qgd2FzIGRlcHJlY2F0ZWQgYW5kIHNvb24gd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlIFV0aWxzLkRPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgbWV0aG9kLlxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIFV0aWxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChkb21Ob2RlKSB7XG5cdCAgICAgICAgdmFyIGRvbURvY3VtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudDtcblx0ICAgICAgICB2YXIgc2hvd0ZvcmNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblx0XG5cdCAgICAgICAgVXRpbHMud2FybihcIlV0aWxzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCBtZXRob2Qgd2FzIGRlcHJlY2F0ZWQgYW5kIHNvb24gd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlIFV0aWxzLkRPTS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgbWV0aG9kLlwiKTtcblx0ICAgICAgICByZXR1cm4gVXRpbHMuRE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdChkb21Ob2RlLCBkb21Eb2N1bWVudCwgc2hvd0ZvcmNlKTtcblx0ICAgIH07XG5cdFxuXHQgICAgLyoqXG5cdCAgICAgKiBAZGVwcmVjYXRlZCBVdGlscy5maW5kRWxlbWVudFBvc2l0aW9uIG1ldGhvZCB3YXMgZGVwcmVjYXRlZCBhbmQgc29vbiB3aWxsIGJlIHJlbW92ZWQuIFBsZWFzZSB1c2UgVXRpbHMuRE9NLmZpbmRFbGVtZW50UG9zaXRpb24gbWV0aG9kLlxuXHQgICAgICovXG5cdCAgICBVdGlscy5maW5kRWxlbWVudFBvc2l0aW9uID0gZnVuY3Rpb24gZmluZEVsZW1lbnRQb3NpdGlvbihkb21Ob2RlKSB7XG5cdCAgICAgICAgdmFyIGRvbURvY3VtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudDtcblx0ICAgICAgICB2YXIgc2hvd0ZvcmNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblx0XG5cdCAgICAgICAgVXRpbHMud2FybihcIlV0aWxzLmZpbmRFbGVtZW50UG9zaXRpb24gbWV0aG9kIHdhcyBkZXByZWNhdGVkIGFuZCBzb29uIHdpbGwgYmUgcmVtb3ZlZC4gUGxlYXNlIHVzZSBVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbiBtZXRob2QuXCIpO1xuXHQgICAgICAgIHJldHVybiBVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbihkb21Ob2RlLCBkb21Eb2N1bWVudCwgc2hvd0ZvcmNlKTtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIFRyYW5zZmVyIHN0YXRpYyBtZXRob2RzIGludG8gdGhlIG9iamVjdFxuXHQgICAgICogQHBhcmFtIHJlYWxPYmplY3Rcblx0ICAgICAqIEBwYXJhbSBjbGFzc05hbWVcblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBVdGlscy5pbXBsZW1lbnRhdGlvblN0YXRpY01ldGhvZHMgPSBmdW5jdGlvbiBpbXBsZW1lbnRhdGlvblN0YXRpY01ldGhvZHMocmVhbE9iamVjdCwgY2xhc3NOYW1lKSB7XG5cdCAgICAgICAgaWYgKCEhcmVhbE9iamVjdCAmJiAodHlwZW9mIHJlYWxPYmplY3QgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihyZWFsT2JqZWN0KSkgPT09IFwib2JqZWN0XCIpIHtcblx0ICAgICAgICAgICAgKGZ1bmN0aW9uICgpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBzdGF0aWNDbGFzcyA9IHJlYWxPYmplY3QuY29uc3RydWN0b3I7XG5cdCAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0YXRpY0NsYXNzID09PSBcImZ1bmN0aW9uXCIpIHtcblx0ICAgICAgICAgICAgICAgICAgICB2YXIgbWV0aG9kcyA9IE9iamVjdC5rZXlzKHN0YXRpY0NsYXNzKTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAobWV0aG9kcyAmJiBtZXRob2RzLmxlbmd0aCA+IDApIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2kgPj0gX2l0ZXJhdG9yLmxlbmd0aCkgcmV0dXJuIFwiYnJlYWtcIjtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfcmVmID0gX2l0ZXJhdG9yW19pKytdO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaSA9IF9pdGVyYXRvci5uZXh0KCk7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9pLmRvbmUpIHJldHVybiBcImJyZWFrXCI7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHRcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZXRob2QgPSBfcmVmO1xuXHRcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVhbE9iamVjdFttZXRob2RdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVhbE9iamVjdFttZXRob2RdID0gZnVuY3Rpb24gKCkge1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0YXRpY0NsYXNzICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVdGlscy53YXJuKFwiVGhhdCBtZXRob2Qgd2FzIGRlcHJlY2F0ZWQgYW5kIHNvb24gd2lsbCBiZSByZW1vdmVkLiBQbGVhc2UgdXNlIFwiICsgKGNsYXNzTmFtZSB8fCBzdGF0aWNDbGFzcyAmJiBzdGF0aWNDbGFzcy5uYW1lIHx8IFwiVW5rbm93blwiKSArIFwiLlwiICsgbWV0aG9kICsgXCIgbWV0aG9kLlwiKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGljQ2xhc3NbbWV0aG9kXS5hcHBseShzdGF0aWNDbGFzcywgYXJndW1lbnRzKTtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgICAgICAgICB9O1xuXHRcblx0ICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gbWV0aG9kcywgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvciksIF9pID0gMCwgX2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmVmO1xuXHRcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfcmV0MiA9IF9sb29wKCk7XG5cdFxuXHQgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9yZXQyID09PSBcImJyZWFrXCIpIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB9KSgpO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIEdldCBjYWxsIHN0YWNrIHRyYWNlXG5cdCAgICAgKiBAcmV0dXJuIEFycmF5PE9iamVjdD5cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBVdGlscy5zdGFjayA9IGZ1bmN0aW9uIHN0YWNrKCkge1xuXHQgICAgICAgIHZhciBlID0gbmV3IEVycm9yKCk7XG5cdCAgICAgICAgcmV0dXJuIGUgJiYgZS5zdGFjayAmJiBlLnN0YWNrLnNwbGl0KFwiXFxuXCIpLnNsaWNlKDUpLm1hcChmdW5jdGlvbiAocykge1xuXHQgICAgICAgICAgICBpZiAoIXMpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB7fTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICB2YXIgbWF0Y2ggPSAvXiguKilAKC4qKVxcLmpzOihbMC05XSspOihbMC05XSspJC9pZy5leGVjKHMpO1xuXHQgICAgICAgICAgICBpZiAobWF0Y2gpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChtYXRjaFsxXSkge1xuXHQgICAgICAgICAgICAgICAgICAgIG1hdGNoWzFdID0gLyhbXlxcLzxdKykvaWcuZXhlYyhtYXRjaFsxXSk7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoWzFdID0gbWF0Y2hbMV1bMF07XG5cdCAgICAgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1hdGNoWzRdIHx8IFwiXCIsXG5cdCAgICAgICAgICAgICAgICAgICAgZmlsZTogbWF0Y2hbMl0gfHwgXCJcIixcblx0ICAgICAgICAgICAgICAgICAgICBsaW5lOiBtYXRjaFszXSB8fCBcIlwiLFxuXHQgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogbWF0Y2hbMV0gfHwgXCJcIlxuXHQgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBtYXRjaCA9IC9eKC4qKUAoaHR0cHxodHRwcyk6KFteOl0rKTooWzAtOV0rKTooWzAtOV0rKSQvaWcuZXhlYyhzKTtcblx0ICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogbWF0Y2hbNV0gfHwgXCJcIixcblx0ICAgICAgICAgICAgICAgICAgICBmaWxlOiBtYXRjaFszXSB8fCBcIlwiLFxuXHQgICAgICAgICAgICAgICAgICAgIGxpbmU6IG1hdGNoWzRdIHx8IFwiXCIsXG5cdCAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBtYXRjaFsxXSArIFwiOlwiICsgbWF0Y2hbMl0gfHwgXCJcIlxuXHQgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBtYXRjaCA9IC9eKC4qKUAoLiopOihbMC05XSspOihbMC05XSspJC9pZy5leGVjKHMpO1xuXHQgICAgICAgICAgICBpZiAobWF0Y2gpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtYXRjaFs0XSB8fCBcIlwiLFxuXHQgICAgICAgICAgICAgICAgICAgIGZpbGU6IG1hdGNoWzJdIHx8IFwiXCIsXG5cdCAgICAgICAgICAgICAgICAgICAgbGluZTogbWF0Y2hbM10gfHwgXCJcIixcblx0ICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1hdGNoWzFdIHx8IFwiXCJcblx0ICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgbWF0Y2ggPSAvXlxccythdFxccyhbXihdKylcXHNcXCgoLiopOihbMC05XSspOihbMC05XSspXFwpJC9pZy5leGVjKHMpO1xuXHQgICAgICAgICAgICBpZiAobWF0Y2gpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBtYXRjaFs0XSB8fCBcIlwiLFxuXHQgICAgICAgICAgICAgICAgICAgIGZpbGU6IG1hdGNoWzJdIHx8IFwiXCIsXG5cdCAgICAgICAgICAgICAgICAgICAgbGluZTogbWF0Y2hbM10gfHwgXCJcIixcblx0ICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IG1hdGNoWzFdIHx8IFwiXCJcblx0ICAgICAgICAgICAgICAgIH07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgbWF0Y2ggPSAvXlxccythdFxccyguKik6KFswLTldKyk6KFswLTldKykkL2lnLmV4ZWMocyk7XG5cdCAgICAgICAgICAgIGlmIChtYXRjaCkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG1hdGNoWzNdIHx8IFwiXCIsXG5cdCAgICAgICAgICAgICAgICAgICAgZmlsZTogbWF0Y2hbMV0gfHwgXCJcIixcblx0ICAgICAgICAgICAgICAgICAgICBsaW5lOiBtYXRjaFsyXSB8fCBcIlwiLFxuXHQgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJcIlxuXHQgICAgICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gcztcblx0ICAgICAgICB9KSB8fCBbXTtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIEdldCByYW5kb20gSURcblx0ICAgICAqIEByZXR1cm4ge3N0cmluZ31cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBVdGlscy5nZXRVSUQgPSBmdW5jdGlvbiBnZXRVSUQoKSB7XG5cdCAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyKTtcblx0ICAgIH07XG5cdFxuXHQgICAgcmV0dXJuIFV0aWxzO1xuXHR9KCk7XG5cdFxuXHRleHBvcnRzLmRlZmF1bHQgPSBVdGlscztcblx0XG5cdFV0aWxzLkFuaW1hdGlvbiA9IF9VdGlsc0FuaW1hdGlvbjIuZGVmYXVsdDtcblx0VXRpbHMuQnJvd3NlciA9IF9VdGlsc0Jyb3dzZXIyLmRlZmF1bHQ7XG5cdFV0aWxzLkNvb2tpZSA9IF9VdGlsc0Nvb2tpZTIuZGVmYXVsdDtcblx0VXRpbHMuRE9NID0gX1V0aWxzRE9NMi5kZWZhdWx0O1xuXHRVdGlscy5Eb2N1bWVudCA9IF9VdGlsc0RvY3VtZW50Mi5kZWZhdWx0O1xuXHRVdGlscy5Nb3VzZSA9IF9VdGlsc01vdXNlMi5kZWZhdWx0O1xuXHRVdGlscy5TY3JlZW4gPSBfVXRpbHNTY3JlZW4yLmRlZmF1bHQ7XG5cdFV0aWxzLlN5c3RlbSA9IF9VdGlsc1N5c3RlbTIuZGVmYXVsdDtcblx0VXRpbHMuVXNlciA9IF9VdGlsc1VzZXIyLmRlZmF1bHQ7XG5cdFV0aWxzLldpbmRvdyA9IF9VdGlsc1dpbmRvdzIuZGVmYXVsdDtcblx0bW9kdWxlLmV4cG9ydHMgPSBVdGlscztcblxuLyoqKi8gfSxcbi8qIDYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXHQvKipcblx0ICogSW1wb3J0IHN1YmNsYXNzZXNcblx0ICovXG5cdFxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRcblx0dmFyIF9VdGlsc0FuaW1hdGlvbkVhc2luZyA9IF9fd2VicGFja19yZXF1aXJlX18oNyk7XG5cdFxuXHR2YXIgX1V0aWxzQW5pbWF0aW9uRWFzaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzQW5pbWF0aW9uRWFzaW5nKTtcblx0XG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cdFxuXHRmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXHRcblx0dmFyIEFuaW1hdGlvbiA9IGZ1bmN0aW9uIEFuaW1hdGlvbigpIHtcblx0ICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQW5pbWF0aW9uKTtcblx0fTtcblx0XG5cdGV4cG9ydHMuZGVmYXVsdCA9IEFuaW1hdGlvbjtcblx0XG5cdEFuaW1hdGlvbi5FYXNpbmcgPSBfVXRpbHNBbmltYXRpb25FYXNpbmcyLmRlZmF1bHQ7XG5cbi8qKiovIH0sXG4vKiA3ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblx0LyoqXG5cdCAqIERpZmZlcmVudCB0aW1lIGFuaW1hdGlvbiBmdW5jdGlvbnNcblx0ICovXG5cdFxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRcblx0ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblx0XG5cdHZhciBFYXNpbmcgPSBmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBFYXNpbmcoKSB7XG5cdCAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEVhc2luZyk7XG5cdCAgICB9XG5cdFxuXHQgICAgRWFzaW5nLmlzVmFsaWRQYXJhbXMgPSBmdW5jdGlvbiBpc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQsIHMpIHtcblx0ICAgICAgICByZXR1cm4gdHlwZW9mIHQgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIGIgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIGMgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIGQgPT09IFwibnVtYmVyXCIgJiYgKHR5cGVvZiBzID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBzID09PSBcIm51bWJlclwiKSAmJiB0IDwgZDtcblx0ICAgIH07XG5cdFxuXHQgICAgRWFzaW5nLnN3aW5nID0gZnVuY3Rpb24gc3dpbmcodCwgYiwgYywgZCkge1xuXHQgICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuXHQgICAgICAgICAgICByZXR1cm4gRWFzaW5nW0Vhc2luZy5kZWZdKHQsIGIsIGMsIGQpO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBOYU47XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0XG5cdCAgICBFYXNpbmcuZWFzZUluUXVhZCA9IGZ1bmN0aW9uIGVhc2VJblF1YWQodCwgYiwgYywgZCkge1xuXHQgICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuXHQgICAgICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCArIGI7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHRcblx0ICAgIEVhc2luZy5lYXNlT3V0UXVhZCA9IGZ1bmN0aW9uIGVhc2VPdXRRdWFkKHQsIGIsIGMsIGQpIHtcblx0ICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIC1jICogKHQgLz0gZCkgKiAodCAtIDIpICsgYjtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gTmFOO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdFxuXHQgICAgRWFzaW5nLmVhc2VJbk91dFF1YWQgPSBmdW5jdGlvbiBlYXNlSW5PdXRRdWFkKHQsIGIsIGMsIGQpIHtcblx0ICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcblx0ICAgICAgICAgICAgaWYgKCh0IC89IGQgLyAyKSA8IDEpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIHQgKiB0ICsgYjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gLWMgLyAyICogKC0tdCAqICh0IC0gMikgLSAxKSArIGI7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHRcblx0ICAgIEVhc2luZy5lYXNlSW5DdWJpYyA9IGZ1bmN0aW9uIGVhc2VJbkN1YmljKHQsIGIsIGMsIGQpIHtcblx0ICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGMgKiAodCAvPSBkKSAqIHQgKiB0ICsgYjtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gTmFOO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdFxuXHQgICAgRWFzaW5nLmVhc2VPdXRDdWJpYyA9IGZ1bmN0aW9uIGVhc2VPdXRDdWJpYyh0LCBiLCBjLCBkKSB7XG5cdCAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBjICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICsgMSkgKyBiO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBOYU47XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0XG5cdCAgICBFYXNpbmcuZWFzZUluT3V0Q3ViaWMgPSBmdW5jdGlvbiBlYXNlSW5PdXRDdWJpYyh0LCBiLCBjLCBkKSB7XG5cdCAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG5cdCAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKyBiO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiBjIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICsgMikgKyBiO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBOYU47XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0XG5cdCAgICBFYXNpbmcuZWFzZUluUXVhcnQgPSBmdW5jdGlvbiBlYXNlSW5RdWFydCh0LCBiLCBjLCBkKSB7XG5cdCAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBjICogKHQgLz0gZCkgKiB0ICogdCAqIHQgKyBiO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBOYU47XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0XG5cdCAgICBFYXNpbmcuZWFzZU91dFF1YXJ0ID0gZnVuY3Rpb24gZWFzZU91dFF1YXJ0KHQsIGIsIGMsIGQpIHtcblx0ICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIC1jICogKCh0ID0gdCAvIGQgLSAxKSAqIHQgKiB0ICogdCAtIDEpICsgYjtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gTmFOO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdFxuXHQgICAgRWFzaW5nLmVhc2VJbk91dFF1YXJ0ID0gZnVuY3Rpb24gZWFzZUluT3V0UXVhcnQodCwgYiwgYywgZCkge1xuXHQgICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuXHQgICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogdCAqIHQgKiB0ICogdCArIGI7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIC1jIC8gMiAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAtIDIpICsgYjtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gTmFOO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdFxuXHQgICAgRWFzaW5nLmVhc2VJblF1aW50ID0gZnVuY3Rpb24gZWFzZUluUXVpbnQodCwgYiwgYywgZCkge1xuXHQgICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuXHQgICAgICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqIHQgKiB0ICogdCArIGI7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHRcblx0ICAgIEVhc2luZy5lYXNlT3V0UXVpbnQgPSBmdW5jdGlvbiBlYXNlT3V0UXVpbnQodCwgYiwgYywgZCkge1xuXHQgICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuXHQgICAgICAgICAgICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogdCAqIHQgKiB0ICsgMSkgKyBiO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBOYU47XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0XG5cdCAgICBFYXNpbmcuZWFzZUluT3V0UXVpbnQgPSBmdW5jdGlvbiBlYXNlSW5PdXRRdWludCh0LCBiLCBjLCBkKSB7XG5cdCAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG5cdCAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gYyAvIDIgKiB0ICogdCAqIHQgKiB0ICogdCArIGI7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqIHQgKiB0ICogdCArIDIpICsgYjtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gTmFOO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdFxuXHQgICAgRWFzaW5nLmVhc2VJblNpbmUgPSBmdW5jdGlvbiBlYXNlSW5TaW5lKHQsIGIsIGMsIGQpIHtcblx0ICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIC1jICogTWF0aC5jb3ModCAvIGQgKiAoTWF0aC5QSSAvIDIpKSArIGMgKyBiO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBOYU47XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0XG5cdCAgICBFYXNpbmcuZWFzZU91dFNpbmUgPSBmdW5jdGlvbiBlYXNlT3V0U2luZSh0LCBiLCBjLCBkKSB7XG5cdCAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBjICogTWF0aC5zaW4odCAvIGQgKiAoTWF0aC5QSSAvIDIpKSArIGI7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHRcblx0ICAgIEVhc2luZy5lYXNlSW5PdXRTaW5lID0gZnVuY3Rpb24gZWFzZUluT3V0U2luZSh0LCBiLCBjLCBkKSB7XG5cdCAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG5cdCAgICAgICAgICAgIHJldHVybiAtYyAvIDIgKiAoTWF0aC5jb3MoTWF0aC5QSSAqIHQgLyBkKSAtIDEpICsgYjtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gTmFOO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdFxuXHQgICAgRWFzaW5nLmVhc2VJbkV4cG8gPSBmdW5jdGlvbiBlYXNlSW5FeHBvKHQsIGIsIGMsIGQpIHtcblx0ICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHQgPT09IDAgPyBiIDogYyAqIE1hdGgucG93KDIsIDEwICogKHQgLyBkIC0gMSkpICsgYjtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gTmFOO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdFxuXHQgICAgRWFzaW5nLmVhc2VPdXRFeHBvID0gZnVuY3Rpb24gZWFzZU91dEV4cG8odCwgYiwgYywgZCkge1xuXHQgICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuXHQgICAgICAgICAgICByZXR1cm4gdCA9PT0gZCA/IGIgKyBjIDogYyAqICgtTWF0aC5wb3coMiwgLTEwICogdCAvIGQpICsgMSkgKyBiO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBOYU47XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0XG5cdCAgICBFYXNpbmcuZWFzZUluT3V0RXhwbyA9IGZ1bmN0aW9uIGVhc2VJbk91dEV4cG8odCwgYiwgYywgZCkge1xuXHQgICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuXHQgICAgICAgICAgICBpZiAodCA9PT0gMCkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGI7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKHQgPT09IGQpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBiICsgYztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpIDwgMSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogTWF0aC5wb3coMiwgMTAgKiAodCAtIDEpKSArIGI7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogKC1NYXRoLnBvdygyLCAtMTAgKiAtLXQpICsgMikgKyBiO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBOYU47XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0XG5cdCAgICBFYXNpbmcuZWFzZUluQ2lyYyA9IGZ1bmN0aW9uIGVhc2VJbkNpcmModCwgYiwgYywgZCkge1xuXHQgICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuXHQgICAgICAgICAgICByZXR1cm4gLWMgKiAoTWF0aC5zcXJ0KDEgLSAodCAvPSBkKSAqIHQpIC0gMSkgKyBiO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBOYU47XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0XG5cdCAgICBFYXNpbmcuZWFzZU91dENpcmMgPSBmdW5jdGlvbiBlYXNlT3V0Q2lyYyh0LCBiLCBjLCBkKSB7XG5cdCAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBjICogTWF0aC5zcXJ0KDEgLSAodCA9IHQgLyBkIC0gMSkgKiB0KSArIGI7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHRcblx0ICAgIEVhc2luZy5lYXNlSW5PdXRDaXJjID0gZnVuY3Rpb24gZWFzZUluT3V0Q2lyYyh0LCBiLCBjLCBkKSB7XG5cdCAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG5cdCAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gLWMgLyAyICogKE1hdGguc3FydCgxIC0gdCAqIHQpIC0gMSkgKyBiO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiBjIC8gMiAqIChNYXRoLnNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKSArIGI7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHRcblx0ICAgIEVhc2luZy5lYXNlSW5FbGFzdGljID0gZnVuY3Rpb24gZWFzZUluRWxhc3RpYyh0LCBiLCBjLCBkKSB7XG5cdCAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG5cdCAgICAgICAgICAgIHZhciBzID0gMS43MDE1ODtcblx0ICAgICAgICAgICAgdmFyIHAgPSAwO1xuXHQgICAgICAgICAgICB2YXIgYSA9IGM7XG5cdCAgICAgICAgICAgIGlmICh0ID09PSAwKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gYjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoKHQgLz0gZCkgPT09IDEpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBiICsgYztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoIXApIHtcblx0ICAgICAgICAgICAgICAgIHAgPSBkICogLjM7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuXHQgICAgICAgICAgICAgICAgYSA9IGM7XG5cdCAgICAgICAgICAgICAgICBzID0gcCAvIDQ7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiAtKGEgKiBNYXRoLnBvdygyLCAxMCAqICh0IC09IDEpKSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApKSArIGI7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHRcblx0ICAgIEVhc2luZy5lYXNlT3V0RWxhc3RpYyA9IGZ1bmN0aW9uIGVhc2VPdXRFbGFzdGljKHQsIGIsIGMsIGQpIHtcblx0ICAgICAgICBpZiAoRWFzaW5nLmlzVmFsaWRQYXJhbXModCwgYiwgYywgZCkpIHtcblx0ICAgICAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuXHQgICAgICAgICAgICB2YXIgcCA9IDA7XG5cdCAgICAgICAgICAgIHZhciBhID0gYztcblx0ICAgICAgICAgICAgaWYgKHQgPT09IDApIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBiO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICgodCAvPSBkKSA9PT0gMSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGIgKyBjO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICghcCkge1xuXHQgICAgICAgICAgICAgICAgcCA9IGQgKiAuMztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoYSA8IE1hdGguYWJzKGMpKSB7XG5cdCAgICAgICAgICAgICAgICBhID0gYztcblx0ICAgICAgICAgICAgICAgIHMgPSBwIC8gNDtcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIHMgPSBwIC8gKDIgKiBNYXRoLlBJKSAqIE1hdGguYXNpbihjIC8gYSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIGEgKiBNYXRoLnBvdygyLCAtMTAgKiB0KSAqIE1hdGguc2luKCh0ICogZCAtIHMpICogKDIgKiBNYXRoLlBJKSAvIHApICsgYyArIGI7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHRcblx0ICAgIEVhc2luZy5lYXNlSW5PdXRFbGFzdGljID0gZnVuY3Rpb24gZWFzZUluT3V0RWxhc3RpYyh0LCBiLCBjLCBkKSB7XG5cdCAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG5cdCAgICAgICAgICAgIHZhciBzID0gMS43MDE1ODtcblx0ICAgICAgICAgICAgdmFyIHAgPSAwO1xuXHQgICAgICAgICAgICB2YXIgYSA9IGM7XG5cdCAgICAgICAgICAgIGlmICh0ID09PSAwKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gYjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoKHQgLz0gZCAvIDIpID09PSAyKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gYiArIGM7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKCFwKSB7XG5cdCAgICAgICAgICAgICAgICBwID0gZCAqICguMyAqIDEuNSk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKGEgPCBNYXRoLmFicyhjKSkge1xuXHQgICAgICAgICAgICAgICAgYSA9IGM7XG5cdCAgICAgICAgICAgICAgICBzID0gcCAvIDQ7XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBzID0gcCAvICgyICogTWF0aC5QSSkgKiBNYXRoLmFzaW4oYyAvIGEpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICh0IDwgMSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIC0uNSAqIChhICogTWF0aC5wb3coMiwgMTAgKiAodCAtPSAxKSkgKiBNYXRoLnNpbigodCAqIGQgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSkgKyBiO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgKiBkIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKiAuNSArIGMgKyBiO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBOYU47XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0XG5cdCAgICBFYXNpbmcuZWFzZUluQmFjayA9IGZ1bmN0aW9uIGVhc2VJbkJhY2sodCwgYiwgYywgZCwgcykge1xuXHQgICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkLCBzKSkge1xuXHQgICAgICAgICAgICBpZiAocyA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICBzID0gMS43MDE1ODtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gYyAqICh0IC89IGQpICogdCAqICgocyArIDEpICogdCAtIHMpICsgYjtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gTmFOO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdFxuXHQgICAgRWFzaW5nLmVhc2VPdXRCYWNrID0gZnVuY3Rpb24gZWFzZU91dEJhY2sodCwgYiwgYywgZCwgcykge1xuXHQgICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkLCBzKSkge1xuXHQgICAgICAgICAgICBpZiAocyA9PT0gdW5kZWZpbmVkKSB7XG5cdCAgICAgICAgICAgICAgICBzID0gMS43MDE1ODtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gYyAqICgodCA9IHQgLyBkIC0gMSkgKiB0ICogKChzICsgMSkgKiB0ICsgcykgKyAxKSArIGI7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHRcblx0ICAgIEVhc2luZy5lYXNlSW5PdXRCYWNrID0gZnVuY3Rpb24gZWFzZUluT3V0QmFjayh0LCBiLCBjLCBkLCBzKSB7XG5cdCAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQsIHMpKSB7XG5cdCAgICAgICAgICAgIGlmIChzID09PSB1bmRlZmluZWQpIHtcblx0ICAgICAgICAgICAgICAgIHMgPSAxLjcwMTU4O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmICgodCAvPSBkIC8gMikgPCAxKSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gYyAvIDIgKiAodCAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCAtIHMpKSArIGI7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIGMgLyAyICogKCh0IC09IDIpICogdCAqICgoKHMgKj0gMS41MjUpICsgMSkgKiB0ICsgcykgKyAyKSArIGI7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHRcblx0ICAgIEVhc2luZy5lYXNlSW5Cb3VuY2UgPSBmdW5jdGlvbiBlYXNlSW5Cb3VuY2UodCwgYiwgYywgZCkge1xuXHQgICAgICAgIGlmIChFYXNpbmcuaXNWYWxpZFBhcmFtcyh0LCBiLCBjLCBkKSkge1xuXHQgICAgICAgICAgICByZXR1cm4gYyAtIEVhc2luZy5lYXNlT3V0Qm91bmNlKGQgLSB0LCAwLCBjLCBkKSArIGI7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHRcblx0ICAgIEVhc2luZy5lYXNlT3V0Qm91bmNlID0gZnVuY3Rpb24gZWFzZU91dEJvdW5jZSh0LCBiLCBjLCBkKSB7XG5cdCAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG5cdCAgICAgICAgICAgIGlmICgodCAvPSBkKSA8IDEgLyAyLjc1KSB7XG5cdCAgICAgICAgICAgICAgICByZXR1cm4gYyAqICg3LjU2MjUgKiB0ICogdCkgKyBiO1xuXHQgICAgICAgICAgICB9IGVsc2UgaWYgKHQgPCAyIC8gMi43NSkge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMS41IC8gMi43NSkgKiB0ICsgLjc1KSArIGI7XG5cdCAgICAgICAgICAgIH0gZWxzZSBpZiAodCA8IDIuNSAvIDIuNzUpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBjICogKDcuNTYyNSAqICh0IC09IDIuMjUgLyAyLjc1KSAqIHQgKyAuOTM3NSkgKyBiO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgcmV0dXJuIGMgKiAoNy41NjI1ICogKHQgLT0gMi42MjUgLyAyLjc1KSAqIHQgKyAuOTg0Mzc1KSArIGI7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gTmFOO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdFxuXHQgICAgRWFzaW5nLmVhc2VJbk91dEJvdW5jZSA9IGZ1bmN0aW9uIGVhc2VJbk91dEJvdW5jZSh0LCBiLCBjLCBkKSB7XG5cdCAgICAgICAgaWYgKEVhc2luZy5pc1ZhbGlkUGFyYW1zKHQsIGIsIGMsIGQpKSB7XG5cdCAgICAgICAgICAgIGlmICh0IDwgZCAvIDIpIHtcblx0ICAgICAgICAgICAgICAgIHJldHVybiBFYXNpbmcuZWFzZUluQm91bmNlKHQgKiAyLCAwLCBjLCBkKSAqIC41ICsgYjtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gRWFzaW5nLmVhc2VPdXRCb3VuY2UodCAqIDIgLSBkLCAwLCBjLCBkKSAqIC41ICsgYyAqIC41ICsgYjtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gTmFOO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdFxuXHQgICAgcmV0dXJuIEVhc2luZztcblx0fSgpO1xuXHRcblx0ZXhwb3J0cy5kZWZhdWx0ID0gRWFzaW5nO1xuXHRcblx0RWFzaW5nLmRlZiA9IFwiZWFzZU91dFF1YWRcIjtcblxuLyoqKi8gfSxcbi8qIDggKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXHQvKipcblx0ICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBicm93c2VyXG5cdCAqL1xuXHRcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblx0XG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cdFxuXHR2YXIgQnJvd3NlciA9IGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIEJyb3dzZXIoKSB7XG5cdCAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJyb3dzZXIpO1xuXHQgICAgfVxuXHRcblx0ICAgIC8qKlxuXHQgICAgICogR2V0IGJyb3dzZXIgaW5mb1xuXHQgICAgICogQHJldHVybiB7e2Jyb3dzZXI6IHN0cmluZywgbW9iaWxlOiBib29sZWFuLCB2ZXJzaW9uOiBzdHJpbmd9fVxuXHQgICAgICovXG5cdCAgICBCcm93c2VyLmdldEluZm8gPSBmdW5jdGlvbiBnZXRJbmZvKCkge1xuXHQgICAgICAgIHJldHVybiB7XG5cdCAgICAgICAgICAgIGJyb3dzZXI6IEJyb3dzZXIuZ2V0TmFtZSgpLFxuXHQgICAgICAgICAgICBtb2JpbGU6IEJyb3dzZXIuaXNNb2JpbGUoKSxcblx0ICAgICAgICAgICAgdmVyc2lvbjogQnJvd3Nlci5nZXRWZXJzaW9uKClcblx0ICAgICAgICB9O1xuXHQgICAgfTtcblx0ICAgIC8qKlxuXHQgICAgICogR2V0IGJyb3dzZXIgbmFtZVxuXHQgICAgICogQHJldHVybiB7c3RyaW5nfVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIEJyb3dzZXIuZ2V0TmFtZSA9IGZ1bmN0aW9uIGdldE5hbWUoKSB7XG5cdCAgICAgICAgdmFyIGJyb3dzZXIgPSB2b2lkIDA7XG5cdCAgICAgICAgaWYgKEJyb3dzZXIuaXNPcGVyYSgpKSB7XG5cdCAgICAgICAgICAgIGJyb3dzZXIgPSBcIk9wZXJhXCI7XG5cdCAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzT3BlcmFOZXcoKSkge1xuXHQgICAgICAgICAgICBicm93c2VyID0gXCJPcGVyYVwiO1xuXHQgICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc01TSUUoKSkge1xuXHQgICAgICAgICAgICBicm93c2VyID0gXCJNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXJcIjtcblx0ICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNNU0lFTmV3KCkpIHtcblx0ICAgICAgICAgICAgYnJvd3NlciA9IFwiTWljcm9zb2Z0IEludGVybmV0IEV4cGxvcmVyXCI7XG5cdCAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzQ2hyb21lKCkpIHtcblx0ICAgICAgICAgICAgYnJvd3NlciA9IFwiQ2hyb21lXCI7XG5cdCAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzRmlyZWZveCgpKSB7XG5cdCAgICAgICAgICAgIGJyb3dzZXIgPSBcIkZpcmVmb3hcIjtcblx0ICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNTYWZhcmkoKSkge1xuXHQgICAgICAgICAgICBicm93c2VyID0gXCJTYWZhcmlcIjtcblx0ICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNPdGhlcigpKSB7XG5cdCAgICAgICAgICAgIGJyb3dzZXIgPSBCcm93c2VyLmdldE90aGVyTmFtZSgpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gYnJvd3Nlcjtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIEdldCBicm93c2VyIHZlcnNpb25cblx0ICAgICAqIEByZXR1cm4ge3N0cmluZ31cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBCcm93c2VyLmdldFZlcnNpb24gPSBmdW5jdGlvbiBnZXRWZXJzaW9uKCkge1xuXHQgICAgICAgIHZhciB2ZXJzaW9uID0gdm9pZCAwO1xuXHQgICAgICAgIGlmIChCcm93c2VyLmlzT3BlcmEoKSkge1xuXHQgICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRPcGVyYVZlcnNpb24oKTtcblx0ICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNPcGVyYU5ldygpKSB7XG5cdCAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldE9wZXJhTmV3VmVyc2lvbigpO1xuXHQgICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc01TSUUoKSkge1xuXHQgICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRNU0lFVmVyc2lvbigpO1xuXHQgICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc01TSUVOZXcoKSkge1xuXHQgICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRNU0lFTmV3VmVyc2lvbigpO1xuXHQgICAgICAgIH0gZWxzZSBpZiAoQnJvd3Nlci5pc0Nocm9tZSgpKSB7XG5cdCAgICAgICAgICAgIHZlcnNpb24gPSBCcm93c2VyLmdldENocm9tZVZlcnNpb24oKTtcblx0ICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNGaXJlZm94KCkpIHtcblx0ICAgICAgICAgICAgdmVyc2lvbiA9IEJyb3dzZXIuZ2V0RmlyZWZveFZlcnNpb24oKTtcblx0ICAgICAgICB9IGVsc2UgaWYgKEJyb3dzZXIuaXNTYWZhcmkoKSkge1xuXHQgICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRTYWZhcmlWZXJzaW9uKCk7XG5cdCAgICAgICAgfSBlbHNlIGlmIChCcm93c2VyLmlzT3RoZXIoKSkge1xuXHQgICAgICAgICAgICB2ZXJzaW9uID0gQnJvd3Nlci5nZXRPdGhlclZlcnNpb24oKTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHZlcnNpb247XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBUcmltIGJyb3dzZXIgdmVyc2lvblxuXHQgICAgICogQHBhcmFtIHZlcnNpb25cblx0ICAgICAqIEByZXR1cm4ge3N0cmluZ31cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBCcm93c2VyLnRyaW1WZXJzaW9uID0gZnVuY3Rpb24gdHJpbVZlcnNpb24odmVyc2lvbikge1xuXHQgICAgICAgIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gXCJzdHJpbmdcIikge1xuXHQgICAgICAgICAgICB2YXIgY2hhcnMgPSBbXCI7XCIsIFwiIFwiLCBcIilcIl07XG5cdCAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvciA9IGNoYXJzLCBfaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoX2l0ZXJhdG9yKSwgX2kgPSAwLCBfaXRlcmF0b3IgPSBfaXNBcnJheSA/IF9pdGVyYXRvciA6IF9pdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdKCk7Oykge1xuXHQgICAgICAgICAgICAgICAgdmFyIF9yZWY7XG5cdFxuXHQgICAgICAgICAgICAgICAgaWYgKF9pc0FycmF5KSB7XG5cdCAgICAgICAgICAgICAgICAgICAgaWYgKF9pID49IF9pdGVyYXRvci5sZW5ndGgpIGJyZWFrO1xuXHQgICAgICAgICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG5cdCAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgICAgIF9pID0gX2l0ZXJhdG9yLm5leHQoKTtcblx0ICAgICAgICAgICAgICAgICAgICBpZiAoX2kuZG9uZSkgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICAgICAgX3JlZiA9IF9pLnZhbHVlO1xuXHQgICAgICAgICAgICAgICAgfVxuXHRcblx0ICAgICAgICAgICAgICAgIHZhciBjaGFyID0gX3JlZjtcblx0XG5cdCAgICAgICAgICAgICAgICB2YXIgaXggPSB2ZXJzaW9uLmluZGV4T2YoY2hhcik7XG5cdCAgICAgICAgICAgICAgICBpZiAoaXggIT09IC0xKSB7XG5cdCAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiA9IHZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gdmVyc2lvbjtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gXCJcIjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBDaGVjayBpZiBpdCBpcyBtb2JpbGVcblx0ICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgQnJvd3Nlci5pc01vYmlsZSA9IGZ1bmN0aW9uIGlzTW9iaWxlKCkge1xuXHQgICAgICAgIHJldHVybiAoL01vYmlsZXxtaW5pfEZlbm5lY3xBbmRyb2lkfGlQKGFkfG9kfGhvbmUpLy50ZXN0KG5hdmlnYXRvci5hcHBWZXJzaW9uKVxuXHQgICAgICAgICk7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBDaGVjayBpZiBpdCBpcyBvcGVyYSBicm93c2VyXG5cdCAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIEJyb3dzZXIuaXNPcGVyYSA9IGZ1bmN0aW9uIGlzT3BlcmEoKSB7XG5cdCAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk9wZXJhXCIpICE9PSAtMTtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIEdldCBvcGVyYSBicm93c2VyIHZlcnNpb25cblx0ICAgICAqIEByZXR1cm4ge3N0cmluZ31cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBCcm93c2VyLmdldE9wZXJhVmVyc2lvbiA9IGZ1bmN0aW9uIGdldE9wZXJhVmVyc2lvbigpIHtcblx0ICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT3BlcmFcIik7XG5cdCAgICAgICAgdmFyIHZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA2KTtcblx0ICAgICAgICB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJWZXJzaW9uXCIpO1xuXHQgICAgICAgIGlmICh2ZXJPZmZzZXQgIT09IC0xKSB7XG5cdCAgICAgICAgICAgIHZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIEJyb3dzZXIudHJpbVZlcnNpb24odmVyc2lvbik7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBDaGVjayBpZiBpdCBpcyBvcGVyYSBuZXcgYnJvd3NlclxuXHQgICAgICogQHJldHVybiB7Ym9vbGVhbn1cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBCcm93c2VyLmlzT3BlcmFOZXcgPSBmdW5jdGlvbiBpc09wZXJhTmV3KCkge1xuXHQgICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJPUFJcIikgIT09IC0xO1xuXHQgICAgfTtcblx0ICAgIC8qKlxuXHQgICAgICogR2V0IG9wZXJhIG5ldyBicm93c2VyIHZlcnNpb25cblx0ICAgICAqIEByZXR1cm4ge3N0cmluZ31cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBCcm93c2VyLmdldE9wZXJhTmV3VmVyc2lvbiA9IGZ1bmN0aW9uIGdldE9wZXJhTmV3VmVyc2lvbigpIHtcblx0ICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiT1BSXCIpO1xuXHQgICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNCk7XG5cdCAgICAgICAgcmV0dXJuIEJyb3dzZXIudHJpbVZlcnNpb24odmVyc2lvbik7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBDaGVjayBpZiBpdCBpcyBtc2llIGJyb3dzZXJcblx0ICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgQnJvd3Nlci5pc01TSUUgPSBmdW5jdGlvbiBpc01TSUUoKSB7XG5cdCAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIikgIT09IC0xO1xuXHQgICAgfTtcblx0ICAgIC8qKlxuXHQgICAgICogR2V0IG1zaWUgYnJvd3NlciB2ZXJzaW9uXG5cdCAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgQnJvd3Nlci5nZXRNU0lFVmVyc2lvbiA9IGZ1bmN0aW9uIGdldE1TSUVWZXJzaW9uKCkge1xuXHQgICAgICAgIHZhciB2ZXJPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJNU0lFXCIpO1xuXHQgICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcodmVyT2Zmc2V0ICsgNSk7XG5cdCAgICAgICAgcmV0dXJuIEJyb3dzZXIudHJpbVZlcnNpb24odmVyc2lvbik7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBDaGVjayBpZiBpdCBpcyBtc2llIG5ldyBicm93c2VyXG5cdCAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIEJyb3dzZXIuaXNNU0lFTmV3ID0gZnVuY3Rpb24gaXNNU0lFTmV3KCkge1xuXHQgICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJUcmlkZW50L1wiKSAhPT0gLTE7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgbXNpZSBuZXcgYnJvd3NlciB2ZXJzaW9uXG5cdCAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgQnJvd3Nlci5nZXRNU0lFTmV3VmVyc2lvbiA9IGZ1bmN0aW9uIGdldE1TSUVOZXdWZXJzaW9uKCkge1xuXHQgICAgICAgIHZhciB2ZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcobmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwicnY6XCIpICsgMyk7XG5cdCAgICAgICAgcmV0dXJuIEJyb3dzZXIudHJpbVZlcnNpb24odmVyc2lvbik7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBDaGVjayBpZiBpdCBpcyBjaHJvbWUgYnJvd3NlclxuXHQgICAgICogQHJldHVybiB7Ym9vbGVhbn1cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBCcm93c2VyLmlzQ2hyb21lID0gZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG5cdCAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKSAhPT0gLTE7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgY2hyb21lIGJyb3dzZXIgdmVyc2lvblxuXHQgICAgICogQHJldHVybiB7c3RyaW5nfVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIEJyb3dzZXIuZ2V0Q2hyb21lVmVyc2lvbiA9IGZ1bmN0aW9uIGdldENocm9tZVZlcnNpb24oKSB7XG5cdCAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKTtcblx0ICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDcpO1xuXHQgICAgICAgIHJldHVybiBCcm93c2VyLnRyaW1WZXJzaW9uKHZlcnNpb24pO1xuXHQgICAgfTtcblx0ICAgIC8qKlxuXHQgICAgICogQ2hlY2sgaWYgaXQgaXMgc2FmYXJpIGJyb3dzZXJcblx0ICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgQnJvd3Nlci5pc1NhZmFyaSA9IGZ1bmN0aW9uIGlzU2FmYXJpKCkge1xuXHQgICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJTYWZhcmlcIikgIT09IC0xICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkNocm9tZVwiKSA9PT0gLTE7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgc2FmYXJpIGJyb3dzZXIgdmVyc2lvblxuXHQgICAgICogQHJldHVybiB7c3RyaW5nfVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIEJyb3dzZXIuZ2V0U2FmYXJpVmVyc2lvbiA9IGZ1bmN0aW9uIGdldFNhZmFyaVZlcnNpb24oKSB7XG5cdCAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlNhZmFyaVwiKTtcblx0ICAgICAgICB2YXIgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDcpO1xuXHQgICAgICAgIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlZlcnNpb25cIik7XG5cdCAgICAgICAgaWYgKHZlck9mZnNldCAhPT0gLTEpIHtcblx0ICAgICAgICAgICAgdmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQuc3Vic3RyaW5nKHZlck9mZnNldCArIDgpO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIENoZWNrIGlmIGl0IGlzIGZpcmVmb3ggYnJvd3NlclxuXHQgICAgICogQHJldHVybiB7Ym9vbGVhbn1cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBCcm93c2VyLmlzRmlyZWZveCA9IGZ1bmN0aW9uIGlzRmlyZWZveCgpIHtcblx0ICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiRmlyZWZveFwiKSAhPT0gLTE7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgZmlyZWZveCBicm93c2VyIHZlcnNpb25cblx0ICAgICAqIEByZXR1cm4ge3N0cmluZ31cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBCcm93c2VyLmdldEZpcmVmb3hWZXJzaW9uID0gZnVuY3Rpb24gZ2V0RmlyZWZveFZlcnNpb24oKSB7XG5cdCAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkZpcmVmb3hcIik7XG5cdCAgICAgICAgdmFyIHZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA4KTtcblx0ICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIENoZWNrIGlmIGl0IGlzIG90aGVyIGJyb3dzZXJcblx0ICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgQnJvd3Nlci5pc090aGVyID0gZnVuY3Rpb24gaXNPdGhlcigpIHtcblx0ICAgICAgICB2YXIgbmFtZU9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIgXCIpICsgMTtcblx0ICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5sYXN0SW5kZXhPZihcIi9cIik7XG5cdCAgICAgICAgcmV0dXJuIG5hbWVPZmZzZXQgPCB2ZXJPZmZzZXQ7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgb3RoZXIgYnJvd3NlciBuYW1lXG5cdCAgICAgKiBAcmV0dXJuIHtzdHJpbmd9XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgQnJvd3Nlci5nZXRPdGhlck5hbWUgPSBmdW5jdGlvbiBnZXRPdGhlck5hbWUoKSB7XG5cdCAgICAgICAgdmFyIG5hbWVPZmZzZXQgPSBuYXZpZ2F0b3IudXNlckFnZW50Lmxhc3RJbmRleE9mKFwiIFwiKSArIDE7XG5cdCAgICAgICAgdmFyIHZlck9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIvXCIpO1xuXHQgICAgICAgIHZhciBicm93c2VyID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5zdWJzdHJpbmcobmFtZU9mZnNldCwgdmVyT2Zmc2V0KTtcblx0ICAgICAgICBpZiAoYnJvd3Nlci50b0xvd2VyQ2FzZSgpID09PSBicm93c2VyLnRvVXBwZXJDYXNlKCkpIHtcblx0ICAgICAgICAgICAgYnJvd3NlciA9IG5hdmlnYXRvci5hcHBOYW1lO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gYnJvd3Nlcjtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIEdldCBvdGhlciBicm93c2VyIHZlcnNpb25cblx0ICAgICAqIEByZXR1cm4ge3N0cmluZ31cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBCcm93c2VyLmdldE90aGVyVmVyc2lvbiA9IGZ1bmN0aW9uIGdldE90aGVyVmVyc2lvbigpIHtcblx0ICAgICAgICB2YXIgbmFtZU9mZnNldCA9IG5hdmlnYXRvci51c2VyQWdlbnQubGFzdEluZGV4T2YoXCIgXCIpICsgMTtcblx0ICAgICAgICB2YXIgdmVyT2Zmc2V0ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5sYXN0SW5kZXhPZihcIi9cIik7XG5cdCAgICAgICAgdmFyIHZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyAxKTtcblx0ICAgICAgICByZXR1cm4gQnJvd3Nlci50cmltVmVyc2lvbih2ZXJzaW9uKTtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIENoZWNrIGJyb3dzZXIgc3VwcG9ydFxuXHQgICAgICogQHJldHVybiB7Ym9vbGVhbn1cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBCcm93c2VyLmlzU3VwcG9ydGVkID0gZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKSB7XG5cdCAgICAgICAgcmV0dXJuICFCcm93c2VyLmlzTVNJRSgpIHx8IHBhcnNlSW50KEJyb3dzZXIuZ2V0TVNJRVZlcnNpb24oKSwgMTApID4gODtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIENoZWNrIGlmIGl0IGlzIFdlYktpdCBicm93c2VyXG5cdCAgICAgKiBAcmV0dXJuIHtib29sZWFufVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIEJyb3dzZXIuaXNXZWJLaXQgPSBmdW5jdGlvbiBpc1dlYktpdCgpIHtcblx0ICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiQXBwbGVXZWJLaXQvXCIpICE9PSAtMTtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIENoZWNrIGlmIGl0IGlzIEdlY2tvIGJyb3dzZXJcblx0ICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgQnJvd3Nlci5pc0dlY2tvID0gZnVuY3Rpb24gaXNHZWNrbygpIHtcblx0ICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiR2Vja29cIikgPiAtMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJLSFRNTFwiKSA9PT0gLTE7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBDaGVjayBpZiBpdCBpcyBBbmRyb2lkIGJyb3dzZXJcblx0ICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgQnJvd3Nlci5pc0FuZHJvaWQgPSBmdW5jdGlvbiBpc0FuZHJvaWQoKSB7XG5cdCAgICAgICAgcmV0dXJuIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkFuZHJvaWRcIikgPiAtMTtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIENoZWNrIGlmIGl0IGlzIExpbnV4IGJyb3dzZXJcblx0ICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgQnJvd3Nlci5pc0xpbnV4ID0gZnVuY3Rpb24gaXNMaW51eCgpIHtcblx0ICAgICAgICByZXR1cm4gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTGludXhcIikgPiAtMTtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIENoZWNrIGlmIGl0IGlzIGlQYWQgYnJvd3NlclxuXHQgICAgICogQHJldHVybiB7Ym9vbGVhbn1cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBCcm93c2VyLmlzVGFibGV0UEMgPSBmdW5jdGlvbiBpc1RhYmxldFBDKCkge1xuXHQgICAgICAgIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJpUGFkXCIpID4gLTE7XG5cdCAgICB9O1xuXHRcblx0ICAgIHJldHVybiBCcm93c2VyO1xuXHR9KCk7XG5cdFxuXHRleHBvcnRzLmRlZmF1bHQgPSBCcm93c2VyO1xuXG4vKioqLyB9LFxuLyogOSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdFxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRcblx0dmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXHRcblx0ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblx0XG5cdHZhciBVUkwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcblx0LyoqXG5cdCAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggY29va2llXG5cdCAqL1xuXHRcblx0dmFyIENvb2tpZSA9IGZ1bmN0aW9uICgpIHtcblx0ICBmdW5jdGlvbiBDb29raWUoKSB7XG5cdCAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ29va2llKTtcblx0ICB9XG5cdFxuXHQgIC8qKlxuXHQgICAqIFRoZSBtZXRob2QgcmV0dXJucyB0aGUgZmxhZyB3aGV0aGVyIHN1cHBvcnRlZCB0aGlzIHN0b3JhZ2UgdHlwZSBvciBub3Rcblx0ICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICAgKi9cblx0ICBDb29raWUuaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbiBpc1N1cHBvcnRlZCgpIHtcblx0ICAgIHJldHVybiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2YoZG9jdW1lbnQpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgZG9jdW1lbnQuY29va2llID09PSBcInN0cmluZ1wiO1xuXHQgIH07XG5cdCAgLyoqXG5cdCAgICogVGhlIG1ldGhvZCBzZXRzIHRoZSB2YWx1ZSBhbmQgcmV0dXJucyB0cnVlIGlmIGl0IGhhcyBiZWVuIHNldFxuXHQgICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG5cdCAgICogQHBhcmFtIGtleSB7c3RyaW5nfVxuXHQgICAqIEBwYXJhbSB2YWx1ZSB7c3RyaW5nfVxuXHQgICAqIEBwYXJhbSBleHBpcmVzIHtudW1iZXJ9XG5cdCAgICogQHBhcmFtIHBhdGgge3N0cmluZ31cblx0ICAgKiBAcGFyYW0gZG9tYWluIHtzdHJpbmd9XG5cdCAgICogQHBhcmFtIHNlY3VyZSB7Ym9vbGVhbn1cblx0ICAgKiBAcmV0dXJuIHtib29sZWFufVxuXHQgICAqL1xuXHRcblx0XG5cdCAgQ29va2llLnNldEl0ZW0gPSBmdW5jdGlvbiBzZXRJdGVtKGNoZWNrU3VwcG9ydCwga2V5LCB2YWx1ZSkge1xuXHQgICAgdmFyIGV4cGlyZXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IDMwO1xuXHQgICAgdmFyIHBhdGggPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IFwiL1wiO1xuXHQgICAgdmFyIGRvbWFpbiA9IGFyZ3VtZW50cy5sZW5ndGggPiA1ICYmIGFyZ3VtZW50c1s1XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzVdIDogbG9jYXRpb24uaG9zdG5hbWU7XG5cdCAgICB2YXIgc2VjdXJlID0gYXJndW1lbnRzLmxlbmd0aCA+IDYgJiYgYXJndW1lbnRzWzZdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNl0gOiBsb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIjtcblx0XG5cdCAgICB0cnkge1xuXHQgICAgICAvKipcblx0ICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuXHQgICAgICAgKi9cblx0ICAgICAgaWYgKHR5cGVvZiBjaGVja1N1cHBvcnQgPT09IFwiYm9vbGVhblwiICYmIHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIgJiYgQ29va2llLnJlZ1ZhbGlkS2V5LnRlc3Qoa2V5KSAmJiB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGV4cGlyZXMgPT09IFwibnVtYmVyXCIgJiYgZXhwaXJlcyA8IDM2NSAmJiB0eXBlb2YgcGF0aCA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgZG9tYWluID09PSBcInN0cmluZ1wiICYmIGRvbWFpbi5pbmRleE9mKGxvY2F0aW9uLmhvc3RuYW1lKSAhPT0gLTEgJiYgdHlwZW9mIHNlY3VyZSA9PT0gXCJib29sZWFuXCIgJiYgc2VjdXJlID09PSAobG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCIpKSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogVmFsaWRhdGUgaW5wdXQgZGF0YVxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHZhciB1ID0gVVJMLnBhcnNlKFwiaHR0cDovL1wiICsgZG9tYWluICsgcGF0aCk7XG5cdCAgICAgICAgaWYgKHUuaG9zdG5hbWUgPT09IGRvbWFpbiB8fCB1LnBhdGggPT09IHBhdGgpIHtcblx0ICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcblx0ICAgICAgICAgICAqL1xuXHQgICAgICAgICAgaWYgKCFjaGVja1N1cHBvcnQgfHwgQ29va2llLmlzU3VwcG9ydGVkKCkpIHtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIFNhdmUgY29va2llcyBmb3IgMzAgZGF5c1xuXHQgICAgICAgICAgICAgKiBAdHlwZSB7RGF0ZX1cblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcblx0ICAgICAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgZXhwaXJlcyAqIDI0ICogNjAgKiA2MCAqIDEwMDApO1xuXHQgICAgICAgICAgICB2YXIgZXhwID0gZGF0ZS50b1VUQ1N0cmluZygpO1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogRW5jb2RlIHZhbHVlIGZvciBzdG9yZVxuXHQgICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgdmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogV3JpdGluZyB2YWx1ZSB0byB0aGUgZG9jdW1lbnQgY29va2llIHN0b3JhZ2Vcblx0ICAgICAgICAgICAgICogQHR5cGUge3N0cmluZ31cblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGtleSArIFwiPVwiICsgdmFsdWUgKyAoZXhwID8gXCI7IGV4cGlyZXM9XCIgKyBleHAgOiBcIlwiKSArIChwYXRoID8gXCI7IHBhdGg9XCIgKyBwYXRoIDogXCJcIikgKyAoZG9tYWluID8gXCI7IGRvbWFpbj1cIiArIGRvbWFpbiA6IFwiXCIpICsgKHNlY3VyZSA/IFwiOyBzZWN1cmVcIiA6IFwiXCIpO1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICByZXR1cm4gQ29va2llLmdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpID09PSB2YWx1ZTtcblx0ICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgICAgfVxuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAvKipcblx0ICAgICAgICAgICAqIElmIGlucHV0IGRhdGEgaXMgbm90IHZhbGlkXG5cdCAgICAgICAgICAgKi9cblx0ICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgICB9XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgIH1cblx0ICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgLyoqXG5cdCAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuXHQgICAgICAgKi9cblx0ICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgfVxuXHQgIH07XG5cdCAgLyoqXG5cdCAgICogVGhlIG1ldGhvZCByZWFkcyB0aGUgdmFsdWUgYW5kIHJldHVybnMgaXQgb3IgcmV0dXJucyBmYWxzZSBpZiB0aGUgdmFsdWUgZG9lcyBub3QgZXhpc3Rcblx0ICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuXHQgICAqIEBwYXJhbSBrZXkge3N0cmluZ31cblx0ICAgKiBAcmV0dXJucyB7c3RyaW5nfGJvb2xlYW59XG5cdCAgICovXG5cdFxuXHRcblx0ICBDb29raWUuZ2V0SXRlbSA9IGZ1bmN0aW9uIGdldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpIHtcblx0ICAgIHRyeSB7XG5cdCAgICAgIC8qKlxuXHQgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG5cdCAgICAgICAqL1xuXHQgICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiAmJiBDb29raWUucmVnVmFsaWRLZXkudGVzdChrZXkpKSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCBDb29raWUuaXNTdXBwb3J0ZWQoKSkge1xuXHQgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgKiBHZXQgdGhlIGFycmF5IGZyb20gZG9jdW1lbnQgY29va2llIHNwbGl0IGJ5IDtcblx0ICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cblx0ICAgICAgICAgICAqL1xuXHQgICAgICAgICAgdmFyIGFyckNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XG5cdCAgICAgICAgICAvKipcblx0ICAgICAgICAgICAqIEl0ZXJhdGUgdGhyb3VnaCB0aGUgY29va2llc1xuXHQgICAgICAgICAgICovXG5cdCAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSBhcnJDb29raWUsIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IpLCBfaSA9IDAsIF9pdGVyYXRvciA9IF9pc0FycmF5ID8gX2l0ZXJhdG9yIDogX2l0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG5cdCAgICAgICAgICAgIHZhciBfcmVmO1xuXHRcblx0ICAgICAgICAgICAgaWYgKF9pc0FycmF5KSB7XG5cdCAgICAgICAgICAgICAgaWYgKF9pID49IF9pdGVyYXRvci5sZW5ndGgpIGJyZWFrO1xuXHQgICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgX2kgPSBfaXRlcmF0b3IubmV4dCgpO1xuXHQgICAgICAgICAgICAgIGlmIChfaS5kb25lKSBicmVhaztcblx0ICAgICAgICAgICAgICBfcmVmID0gX2kudmFsdWU7XG5cdCAgICAgICAgICAgIH1cblx0XG5cdCAgICAgICAgICAgIHZhciBpID0gX3JlZjtcblx0XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBUcmltIGFuZCBzcGxpdCBlYWNoIGNvb2tpZSBieSA9IGZvciBrZXkgdmFsdWUgcGFyZVxuXHQgICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nW119XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICB2YXIgdiA9IGkudHJpbSgpLnNwbGl0KFwiPVwiLCAyKTtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIElmIGl0IGlzIGNvcnJlY3QgY29va2llIGtleSByZXR1cm4gdGhlIHZhbHVlXG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBpZiAodlswXSA9PT0ga2V5KSB7XG5cdCAgICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAgICogSWYgdGhlIHZhbHVlIHdhcyBmb3VuZCByZXR1cm4gdGhlIHZhbHVlXG5cdCAgICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh2WzFdKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgfVxuXHQgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgKiBJZiB0aGUgdmFsdWUgd2FzIG5vdCBmb3VuZCByZXR1cm4gZmFsc2Vcblx0ICAgICAgICAgICAqL1xuXHQgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAvKipcblx0ICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG5cdCAgICAgICAgICAgKi9cblx0ICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgICB9XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgIH1cblx0ICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgLyoqXG5cdCAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuXHQgICAgICAgKi9cblx0ICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgfVxuXHQgIH07XG5cdCAgLyoqXG5cdCAgICogVGhlIG1ldGhvZCByZW1vdmVzIHRoZSB2YWx1ZSBhbmQgcmV0dXJuIHRydWUgaWYgdGhlIHZhbHVlIGRvZXMgbm90IGV4aXN0XG5cdCAgICogQHBhcmFtIGNoZWNrU3VwcG9ydCB7Ym9vbGVhbn1cblx0ICAgKiBAcGFyYW0ga2V5IHtzdHJpbmd9XG5cdCAgICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAgICovXG5cdFxuXHRcblx0ICBDb29raWUucmVtb3ZlSXRlbSA9IGZ1bmN0aW9uIHJlbW92ZUl0ZW0oY2hlY2tTdXBwb3J0LCBrZXkpIHtcblx0ICAgIHRyeSB7XG5cdCAgICAgIC8qKlxuXHQgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG5cdCAgICAgICAqL1xuXHQgICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIgJiYgdHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIiAmJiBDb29raWUucmVnVmFsaWRLZXkudGVzdChrZXkpKSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSWYgdGhhdCBzdG9yZSBpcyBzdXBwb3J0ZWRcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpZiAoIWNoZWNrU3VwcG9ydCB8fCBDb29raWUuaXNTdXBwb3J0ZWQoKSkge1xuXHQgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgKiBTZXQgZW1wdHkgb3ZlcmR1ZSB2YWx1ZSBieSBrZXlcblx0ICAgICAgICAgICAqL1xuXHQgICAgICAgICAgQ29va2llLnNldEl0ZW0oY2hlY2tTdXBwb3J0LCBrZXksIFwiXCIsIC0xKTtcblx0ICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICogSWYgYWxsIG9rIHJldHVybiB0cnVlXG5cdCAgICAgICAgICAgKi9cblx0ICAgICAgICAgIHJldHVybiBDb29raWUuZ2V0SXRlbShjaGVja1N1cHBvcnQsIGtleSkgPT09IGZhbHNlO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAvKipcblx0ICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG5cdCAgICAgICAgICAgKi9cblx0ICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgICB9XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSWYgaW5wdXQgZGF0YSBpcyBub3QgdmFsaWRcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgIH1cblx0ICAgIH0gY2F0Y2ggKGUpIHtcblx0ICAgICAgLyoqXG5cdCAgICAgICAqIElmIHNvbWV0aGluZyBnb2VzIHdyb25nIHJldHVybiBmYWxzZVxuXHQgICAgICAgKi9cblx0ICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgfVxuXHQgIH07XG5cdCAgLyoqXG5cdCAgICogVGhlIG1ldGhvZCByZXR1cm5zIHRoZSBhcnJheSBvZiBzdHJpbmcgb2YgYXZhaWxhYmxlIGtleXNcblx0ICAgKiBAcGFyYW0gY2hlY2tTdXBwb3J0IHtib29sZWFufVxuXHQgICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cblx0ICAgKi9cblx0XG5cdFxuXHQgIENvb2tpZS5nZXRLZXlzID0gZnVuY3Rpb24gZ2V0S2V5cyhjaGVja1N1cHBvcnQpIHtcblx0ICAgIHRyeSB7XG5cdCAgICAgIC8qKlxuXHQgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG5cdCAgICAgICAqL1xuXHQgICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIpIHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IENvb2tpZS5pc1N1cHBvcnRlZCgpKSB7XG5cdCAgICAgICAgICAvKipcblx0ICAgICAgICAgICAqIFRoZSBhcnJheSBvZiBhdmFpbGFibGUga2V5c1xuXHQgICAgICAgICAgICogQHR5cGUge0FycmF5fVxuXHQgICAgICAgICAgICovXG5cdCAgICAgICAgICB2YXIgYXJyS2V5cyA9IFtdO1xuXHQgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgKiBHZXQgdGhlIGFycmF5IGZyb20gZG9jdW1lbnQgY29va2llIHNwbGl0IGJ5IDtcblx0ICAgICAgICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cblx0ICAgICAgICAgICAqL1xuXHQgICAgICAgICAgdmFyIGFyckNvb2tpZSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjtcIik7XG5cdCAgICAgICAgICAvKipcblx0ICAgICAgICAgICAqIEl0ZXJhdGUgdGhyb3VnaCB0aGUgY29va2llc1xuXHQgICAgICAgICAgICovXG5cdCAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gYXJyQ29va2llLCBfaXNBcnJheTIgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvcjIpLCBfaTIgPSAwLCBfaXRlcmF0b3IyID0gX2lzQXJyYXkyID8gX2l0ZXJhdG9yMiA6IF9pdGVyYXRvcjJbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcblx0ICAgICAgICAgICAgdmFyIF9yZWYyO1xuXHRcblx0ICAgICAgICAgICAgaWYgKF9pc0FycmF5Mikge1xuXHQgICAgICAgICAgICAgIGlmIChfaTIgPj0gX2l0ZXJhdG9yMi5sZW5ndGgpIGJyZWFrO1xuXHQgICAgICAgICAgICAgIF9yZWYyID0gX2l0ZXJhdG9yMltfaTIrK107XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgX2kyID0gX2l0ZXJhdG9yMi5uZXh0KCk7XG5cdCAgICAgICAgICAgICAgaWYgKF9pMi5kb25lKSBicmVhaztcblx0ICAgICAgICAgICAgICBfcmVmMiA9IF9pMi52YWx1ZTtcblx0ICAgICAgICAgICAgfVxuXHRcblx0ICAgICAgICAgICAgdmFyIGkgPSBfcmVmMjtcblx0XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBUcmltIGFuZCBzcGxpdCBlYWNoIGNvb2tpZSBieSA9IGZvciBrZXkgdmFsdWUgcGFyZVxuXHQgICAgICAgICAgICAgKiBAdHlwZSB7c3RyaW5nW119XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICB2YXIgdiA9IGkudHJpbSgpLnNwbGl0KFwiPVwiLCAyKTtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEFkZCBrZXkgdG8gdGhlIGxpc3Rcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIGlmICh2WzBdKSB7XG5cdCAgICAgICAgICAgICAgYXJyS2V5cy5wdXNoKHZbMF0pO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICB9XG5cdCAgICAgICAgICByZXR1cm4gYXJyS2V5cztcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgKiBJZiBjb29raWUgZG9lcyBub3Qgc3VwcG9ydGVkIHJldHVybiBmYWxzZVxuXHQgICAgICAgICAgICovXG5cdCAgICAgICAgICByZXR1cm4gW107XG5cdCAgICAgICAgfVxuXHQgICAgICB9IGVsc2Uge1xuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIElmIGlucHV0IGRhdGEgaXMgbm90IHZhbGlkXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgcmV0dXJuIFtdO1xuXHQgICAgICB9XG5cdCAgICB9IGNhdGNoIChlKSB7XG5cdCAgICAgIC8qKlxuXHQgICAgICAgKiBJZiBzb21ldGhpbmcgZ29lcyB3cm9uZyByZXR1cm4gZmFsc2Vcblx0ICAgICAgICovXG5cdCAgICAgIHJldHVybiBbXTtcblx0ICAgIH1cblx0ICB9O1xuXHQgIC8qKlxuXHQgICAqIFRoZSBtZXRob2QgY2xlYW5zIHRoZSBzdG9yYWdlIGFuZCByZXR1cm4gdHJ1ZSBpZiBpdCBpcyBlbXB0eVxuXHQgICAqIEBwYXJhbSBjaGVja1N1cHBvcnQge2Jvb2xlYW59XG5cdCAgICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAgICovXG5cdFxuXHRcblx0ICBDb29raWUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhcihjaGVja1N1cHBvcnQpIHtcblx0ICAgIHRyeSB7XG5cdCAgICAgIC8qKlxuXHQgICAgICAgKiBWYWxpZGF0ZSBpbnB1dCBkYXRhXG5cdCAgICAgICAqL1xuXHQgICAgICBpZiAodHlwZW9mIGNoZWNrU3VwcG9ydCA9PT0gXCJib29sZWFuXCIpIHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJZiB0aGF0IHN0b3JlIGlzIHN1cHBvcnRlZFxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGlmICghY2hlY2tTdXBwb3J0IHx8IENvb2tpZS5pc1N1cHBvcnRlZCgpKSB7XG5cdCAgICAgICAgICB2YXIgYXJyS2V5cyA9IENvb2tpZS5nZXRLZXlzKGNoZWNrU3VwcG9ydCk7XG5cdCAgICAgICAgICBpZiAoYXJyS2V5cykge1xuXHQgICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gYXJyS2V5cywgX2lzQXJyYXkzID0gQXJyYXkuaXNBcnJheShfaXRlcmF0b3IzKSwgX2kzID0gMCwgX2l0ZXJhdG9yMyA9IF9pc0FycmF5MyA/IF9pdGVyYXRvcjMgOiBfaXRlcmF0b3IzW1N5bWJvbC5pdGVyYXRvcl0oKTs7KSB7XG5cdCAgICAgICAgICAgICAgdmFyIF9yZWYzO1xuXHRcblx0ICAgICAgICAgICAgICBpZiAoX2lzQXJyYXkzKSB7XG5cdCAgICAgICAgICAgICAgICBpZiAoX2kzID49IF9pdGVyYXRvcjMubGVuZ3RoKSBicmVhaztcblx0ICAgICAgICAgICAgICAgIF9yZWYzID0gX2l0ZXJhdG9yM1tfaTMrK107XG5cdCAgICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICAgIF9pMyA9IF9pdGVyYXRvcjMubmV4dCgpO1xuXHQgICAgICAgICAgICAgICAgaWYgKF9pMy5kb25lKSBicmVhaztcblx0ICAgICAgICAgICAgICAgIF9yZWYzID0gX2kzLnZhbHVlO1xuXHQgICAgICAgICAgICAgIH1cblx0XG5cdCAgICAgICAgICAgICAgdmFyIGkgPSBfcmVmMztcblx0XG5cdCAgICAgICAgICAgICAgQ29va2llLnJlbW92ZUl0ZW0oY2hlY2tTdXBwb3J0LCBpKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgfVxuXHQgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgKiBJZiBhbGwgb2sgcmV0dXJuIHRydWVcblx0ICAgICAgICAgICAqL1xuXHQgICAgICAgICAgcmV0dXJuIENvb2tpZS5nZXRLZXlzKGNoZWNrU3VwcG9ydCkubGVuZ3RoID09PSAwO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAvKipcblx0ICAgICAgICAgICAqIElmIGNvb2tpZSBkb2VzIG5vdCBzdXBwb3J0ZWQgcmV0dXJuIGZhbHNlXG5cdCAgICAgICAgICAgKi9cblx0ICAgICAgICAgIHJldHVybiB0cnVlO1xuXHQgICAgICAgIH1cblx0ICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBJZiBpbnB1dCBkYXRhIGlzIG5vdCB2YWxpZFxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgfVxuXHQgICAgfSBjYXRjaCAoZSkge1xuXHQgICAgICAvKipcblx0ICAgICAgICogSWYgc29tZXRoaW5nIGdvZXMgd3JvbmcgcmV0dXJuIGZhbHNlXG5cdCAgICAgICAqL1xuXHQgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICB9XG5cdCAgfTtcblx0XG5cdCAgcmV0dXJuIENvb2tpZTtcblx0fSgpO1xuXHRcblx0ZXhwb3J0cy5kZWZhdWx0ID0gQ29va2llO1xuXHRcblx0Q29va2llLnJlZ1ZhbGlkS2V5ID0gbmV3IFJlZ0V4cChcIihbYS16QS1aMC05Xy1dezEsfSlcIiwgXCJpXCIpO1xuXG4vKioqLyB9LFxuLyogMTAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdC8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuXHQvL1xuXHQvLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuXHQvLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG5cdC8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuXHQvLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG5cdC8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcblx0Ly8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG5cdC8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXHQvL1xuXHQvLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuXHQvLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblx0Ly9cblx0Ly8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuXHQvLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG5cdC8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cblx0Ly8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG5cdC8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuXHQvLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG5cdC8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cdFxuXHR2YXIgcHVueWNvZGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKTtcblx0XG5cdGV4cG9ydHMucGFyc2UgPSB1cmxQYXJzZTtcblx0ZXhwb3J0cy5yZXNvbHZlID0gdXJsUmVzb2x2ZTtcblx0ZXhwb3J0cy5yZXNvbHZlT2JqZWN0ID0gdXJsUmVzb2x2ZU9iamVjdDtcblx0ZXhwb3J0cy5mb3JtYXQgPSB1cmxGb3JtYXQ7XG5cdFxuXHRleHBvcnRzLlVybCA9IFVybDtcblx0XG5cdGZ1bmN0aW9uIFVybCgpIHtcblx0ICB0aGlzLnByb3RvY29sID0gbnVsbDtcblx0ICB0aGlzLnNsYXNoZXMgPSBudWxsO1xuXHQgIHRoaXMuYXV0aCA9IG51bGw7XG5cdCAgdGhpcy5ob3N0ID0gbnVsbDtcblx0ICB0aGlzLnBvcnQgPSBudWxsO1xuXHQgIHRoaXMuaG9zdG5hbWUgPSBudWxsO1xuXHQgIHRoaXMuaGFzaCA9IG51bGw7XG5cdCAgdGhpcy5zZWFyY2ggPSBudWxsO1xuXHQgIHRoaXMucXVlcnkgPSBudWxsO1xuXHQgIHRoaXMucGF0aG5hbWUgPSBudWxsO1xuXHQgIHRoaXMucGF0aCA9IG51bGw7XG5cdCAgdGhpcy5ocmVmID0gbnVsbDtcblx0fVxuXHRcblx0Ly8gUmVmZXJlbmNlOiBSRkMgMzk4NiwgUkZDIDE4MDgsIFJGQyAyMzk2XG5cdFxuXHQvLyBkZWZpbmUgdGhlc2UgaGVyZSBzbyBhdCBsZWFzdCB0aGV5IG9ubHkgaGF2ZSB0byBiZVxuXHQvLyBjb21waWxlZCBvbmNlIG9uIHRoZSBmaXJzdCBtb2R1bGUgbG9hZC5cblx0dmFyIHByb3RvY29sUGF0dGVybiA9IC9eKFthLXowLTkuKy1dKzopL2ksXG5cdCAgICBwb3J0UGF0dGVybiA9IC86WzAtOV0qJC8sXG5cdFxuXHQgICAgLy8gUkZDIDIzOTY6IGNoYXJhY3RlcnMgcmVzZXJ2ZWQgZm9yIGRlbGltaXRpbmcgVVJMcy5cblx0ICAgIC8vIFdlIGFjdHVhbGx5IGp1c3QgYXV0by1lc2NhcGUgdGhlc2UuXG5cdCAgICBkZWxpbXMgPSBbJzwnLCAnPicsICdcIicsICdgJywgJyAnLCAnXFxyJywgJ1xcbicsICdcXHQnXSxcblx0XG5cdCAgICAvLyBSRkMgMjM5NjogY2hhcmFjdGVycyBub3QgYWxsb3dlZCBmb3IgdmFyaW91cyByZWFzb25zLlxuXHQgICAgdW53aXNlID0gWyd7JywgJ30nLCAnfCcsICdcXFxcJywgJ14nLCAnYCddLmNvbmNhdChkZWxpbXMpLFxuXHRcblx0ICAgIC8vIEFsbG93ZWQgYnkgUkZDcywgYnV0IGNhdXNlIG9mIFhTUyBhdHRhY2tzLiAgQWx3YXlzIGVzY2FwZSB0aGVzZS5cblx0ICAgIGF1dG9Fc2NhcGUgPSBbJ1xcJyddLmNvbmNhdCh1bndpc2UpLFxuXHQgICAgLy8gQ2hhcmFjdGVycyB0aGF0IGFyZSBuZXZlciBldmVyIGFsbG93ZWQgaW4gYSBob3N0bmFtZS5cblx0ICAgIC8vIE5vdGUgdGhhdCBhbnkgaW52YWxpZCBjaGFycyBhcmUgYWxzbyBoYW5kbGVkLCBidXQgdGhlc2Vcblx0ICAgIC8vIGFyZSB0aGUgb25lcyB0aGF0IGFyZSAqZXhwZWN0ZWQqIHRvIGJlIHNlZW4sIHNvIHdlIGZhc3QtcGF0aFxuXHQgICAgLy8gdGhlbS5cblx0ICAgIG5vbkhvc3RDaGFycyA9IFsnJScsICcvJywgJz8nLCAnOycsICcjJ10uY29uY2F0KGF1dG9Fc2NhcGUpLFxuXHQgICAgaG9zdEVuZGluZ0NoYXJzID0gWycvJywgJz8nLCAnIyddLFxuXHQgICAgaG9zdG5hbWVNYXhMZW4gPSAyNTUsXG5cdCAgICBob3N0bmFtZVBhcnRQYXR0ZXJuID0gL15bYS16MC05QS1aXy1dezAsNjN9JC8sXG5cdCAgICBob3N0bmFtZVBhcnRTdGFydCA9IC9eKFthLXowLTlBLVpfLV17MCw2M30pKC4qKSQvLFxuXHQgICAgLy8gcHJvdG9jb2xzIHRoYXQgY2FuIGFsbG93IFwidW5zYWZlXCIgYW5kIFwidW53aXNlXCIgY2hhcnMuXG5cdCAgICB1bnNhZmVQcm90b2NvbCA9IHtcblx0ICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuXHQgICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG5cdCAgICB9LFxuXHQgICAgLy8gcHJvdG9jb2xzIHRoYXQgbmV2ZXIgaGF2ZSBhIGhvc3RuYW1lLlxuXHQgICAgaG9zdGxlc3NQcm90b2NvbCA9IHtcblx0ICAgICAgJ2phdmFzY3JpcHQnOiB0cnVlLFxuXHQgICAgICAnamF2YXNjcmlwdDonOiB0cnVlXG5cdCAgICB9LFxuXHQgICAgLy8gcHJvdG9jb2xzIHRoYXQgYWx3YXlzIGNvbnRhaW4gYSAvLyBiaXQuXG5cdCAgICBzbGFzaGVkUHJvdG9jb2wgPSB7XG5cdCAgICAgICdodHRwJzogdHJ1ZSxcblx0ICAgICAgJ2h0dHBzJzogdHJ1ZSxcblx0ICAgICAgJ2Z0cCc6IHRydWUsXG5cdCAgICAgICdnb3BoZXInOiB0cnVlLFxuXHQgICAgICAnZmlsZSc6IHRydWUsXG5cdCAgICAgICdodHRwOic6IHRydWUsXG5cdCAgICAgICdodHRwczonOiB0cnVlLFxuXHQgICAgICAnZnRwOic6IHRydWUsXG5cdCAgICAgICdnb3BoZXI6JzogdHJ1ZSxcblx0ICAgICAgJ2ZpbGU6JzogdHJ1ZVxuXHQgICAgfSxcblx0ICAgIHF1ZXJ5c3RyaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMyk7XG5cdFxuXHRmdW5jdGlvbiB1cmxQYXJzZSh1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KSB7XG5cdCAgaWYgKHVybCAmJiBpc09iamVjdCh1cmwpICYmIHVybCBpbnN0YW5jZW9mIFVybCkgcmV0dXJuIHVybDtcblx0XG5cdCAgdmFyIHUgPSBuZXcgVXJsO1xuXHQgIHUucGFyc2UodXJsLCBwYXJzZVF1ZXJ5U3RyaW5nLCBzbGFzaGVzRGVub3RlSG9zdCk7XG5cdCAgcmV0dXJuIHU7XG5cdH1cblx0XG5cdFVybC5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbih1cmwsIHBhcnNlUXVlcnlTdHJpbmcsIHNsYXNoZXNEZW5vdGVIb3N0KSB7XG5cdCAgaWYgKCFpc1N0cmluZyh1cmwpKSB7XG5cdCAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUGFyYW1ldGVyICd1cmwnIG11c3QgYmUgYSBzdHJpbmcsIG5vdCBcIiArIHR5cGVvZiB1cmwpO1xuXHQgIH1cblx0XG5cdCAgdmFyIHJlc3QgPSB1cmw7XG5cdFxuXHQgIC8vIHRyaW0gYmVmb3JlIHByb2NlZWRpbmcuXG5cdCAgLy8gVGhpcyBpcyB0byBzdXBwb3J0IHBhcnNlIHN0dWZmIGxpa2UgXCIgIGh0dHA6Ly9mb28uY29tICBcXG5cIlxuXHQgIHJlc3QgPSByZXN0LnRyaW0oKTtcblx0XG5cdCAgdmFyIHByb3RvID0gcHJvdG9jb2xQYXR0ZXJuLmV4ZWMocmVzdCk7XG5cdCAgaWYgKHByb3RvKSB7XG5cdCAgICBwcm90byA9IHByb3RvWzBdO1xuXHQgICAgdmFyIGxvd2VyUHJvdG8gPSBwcm90by50b0xvd2VyQ2FzZSgpO1xuXHQgICAgdGhpcy5wcm90b2NvbCA9IGxvd2VyUHJvdG87XG5cdCAgICByZXN0ID0gcmVzdC5zdWJzdHIocHJvdG8ubGVuZ3RoKTtcblx0ICB9XG5cdFxuXHQgIC8vIGZpZ3VyZSBvdXQgaWYgaXQncyBnb3QgYSBob3N0XG5cdCAgLy8gdXNlckBzZXJ2ZXIgaXMgKmFsd2F5cyogaW50ZXJwcmV0ZWQgYXMgYSBob3N0bmFtZSwgYW5kIHVybFxuXHQgIC8vIHJlc29sdXRpb24gd2lsbCB0cmVhdCAvL2Zvby9iYXIgYXMgaG9zdD1mb28scGF0aD1iYXIgYmVjYXVzZSB0aGF0J3Ncblx0ICAvLyBob3cgdGhlIGJyb3dzZXIgcmVzb2x2ZXMgcmVsYXRpdmUgVVJMcy5cblx0ICBpZiAoc2xhc2hlc0Rlbm90ZUhvc3QgfHwgcHJvdG8gfHwgcmVzdC5tYXRjaCgvXlxcL1xcL1teQFxcL10rQFteQFxcL10rLykpIHtcblx0ICAgIHZhciBzbGFzaGVzID0gcmVzdC5zdWJzdHIoMCwgMikgPT09ICcvLyc7XG5cdCAgICBpZiAoc2xhc2hlcyAmJiAhKHByb3RvICYmIGhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dKSkge1xuXHQgICAgICByZXN0ID0gcmVzdC5zdWJzdHIoMik7XG5cdCAgICAgIHRoaXMuc2xhc2hlcyA9IHRydWU7XG5cdCAgICB9XG5cdCAgfVxuXHRcblx0ICBpZiAoIWhvc3RsZXNzUHJvdG9jb2xbcHJvdG9dICYmXG5cdCAgICAgIChzbGFzaGVzIHx8IChwcm90byAmJiAhc2xhc2hlZFByb3RvY29sW3Byb3RvXSkpKSB7XG5cdFxuXHQgICAgLy8gdGhlcmUncyBhIGhvc3RuYW1lLlxuXHQgICAgLy8gdGhlIGZpcnN0IGluc3RhbmNlIG9mIC8sID8sIDssIG9yICMgZW5kcyB0aGUgaG9zdC5cblx0ICAgIC8vXG5cdCAgICAvLyBJZiB0aGVyZSBpcyBhbiBAIGluIHRoZSBob3N0bmFtZSwgdGhlbiBub24taG9zdCBjaGFycyAqYXJlKiBhbGxvd2VkXG5cdCAgICAvLyB0byB0aGUgbGVmdCBvZiB0aGUgbGFzdCBAIHNpZ24sIHVubGVzcyBzb21lIGhvc3QtZW5kaW5nIGNoYXJhY3RlclxuXHQgICAgLy8gY29tZXMgKmJlZm9yZSogdGhlIEAtc2lnbi5cblx0ICAgIC8vIFVSTHMgYXJlIG9ibm94aW91cy5cblx0ICAgIC8vXG5cdCAgICAvLyBleDpcblx0ICAgIC8vIGh0dHA6Ly9hQGJAYy8gPT4gdXNlcjphQGIgaG9zdDpjXG5cdCAgICAvLyBodHRwOi8vYUBiP0BjID0+IHVzZXI6YSBob3N0OmMgcGF0aDovP0BjXG5cdFxuXHQgICAgLy8gdjAuMTIgVE9ETyhpc2FhY3MpOiBUaGlzIGlzIG5vdCBxdWl0ZSBob3cgQ2hyb21lIGRvZXMgdGhpbmdzLlxuXHQgICAgLy8gUmV2aWV3IG91ciB0ZXN0IGNhc2UgYWdhaW5zdCBicm93c2VycyBtb3JlIGNvbXByZWhlbnNpdmVseS5cblx0XG5cdCAgICAvLyBmaW5kIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiBhbnkgaG9zdEVuZGluZ0NoYXJzXG5cdCAgICB2YXIgaG9zdEVuZCA9IC0xO1xuXHQgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBob3N0RW5kaW5nQ2hhcnMubGVuZ3RoOyBpKyspIHtcblx0ICAgICAgdmFyIGhlYyA9IHJlc3QuaW5kZXhPZihob3N0RW5kaW5nQ2hhcnNbaV0pO1xuXHQgICAgICBpZiAoaGVjICE9PSAtMSAmJiAoaG9zdEVuZCA9PT0gLTEgfHwgaGVjIDwgaG9zdEVuZCkpXG5cdCAgICAgICAgaG9zdEVuZCA9IGhlYztcblx0ICAgIH1cblx0XG5cdCAgICAvLyBhdCB0aGlzIHBvaW50LCBlaXRoZXIgd2UgaGF2ZSBhbiBleHBsaWNpdCBwb2ludCB3aGVyZSB0aGVcblx0ICAgIC8vIGF1dGggcG9ydGlvbiBjYW5ub3QgZ28gcGFzdCwgb3IgdGhlIGxhc3QgQCBjaGFyIGlzIHRoZSBkZWNpZGVyLlxuXHQgICAgdmFyIGF1dGgsIGF0U2lnbjtcblx0ICAgIGlmIChob3N0RW5kID09PSAtMSkge1xuXHQgICAgICAvLyBhdFNpZ24gY2FuIGJlIGFueXdoZXJlLlxuXHQgICAgICBhdFNpZ24gPSByZXN0Lmxhc3RJbmRleE9mKCdAJyk7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICAvLyBhdFNpZ24gbXVzdCBiZSBpbiBhdXRoIHBvcnRpb24uXG5cdCAgICAgIC8vIGh0dHA6Ly9hQGIvY0BkID0+IGhvc3Q6YiBhdXRoOmEgcGF0aDovY0BkXG5cdCAgICAgIGF0U2lnbiA9IHJlc3QubGFzdEluZGV4T2YoJ0AnLCBob3N0RW5kKTtcblx0ICAgIH1cblx0XG5cdCAgICAvLyBOb3cgd2UgaGF2ZSBhIHBvcnRpb24gd2hpY2ggaXMgZGVmaW5pdGVseSB0aGUgYXV0aC5cblx0ICAgIC8vIFB1bGwgdGhhdCBvZmYuXG5cdCAgICBpZiAoYXRTaWduICE9PSAtMSkge1xuXHQgICAgICBhdXRoID0gcmVzdC5zbGljZSgwLCBhdFNpZ24pO1xuXHQgICAgICByZXN0ID0gcmVzdC5zbGljZShhdFNpZ24gKyAxKTtcblx0ICAgICAgdGhpcy5hdXRoID0gZGVjb2RlVVJJQ29tcG9uZW50KGF1dGgpO1xuXHQgICAgfVxuXHRcblx0ICAgIC8vIHRoZSBob3N0IGlzIHRoZSByZW1haW5pbmcgdG8gdGhlIGxlZnQgb2YgdGhlIGZpcnN0IG5vbi1ob3N0IGNoYXJcblx0ICAgIGhvc3RFbmQgPSAtMTtcblx0ICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9uSG9zdENoYXJzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICAgIHZhciBoZWMgPSByZXN0LmluZGV4T2Yobm9uSG9zdENoYXJzW2ldKTtcblx0ICAgICAgaWYgKGhlYyAhPT0gLTEgJiYgKGhvc3RFbmQgPT09IC0xIHx8IGhlYyA8IGhvc3RFbmQpKVxuXHQgICAgICAgIGhvc3RFbmQgPSBoZWM7XG5cdCAgICB9XG5cdCAgICAvLyBpZiB3ZSBzdGlsbCBoYXZlIG5vdCBoaXQgaXQsIHRoZW4gdGhlIGVudGlyZSB0aGluZyBpcyBhIGhvc3QuXG5cdCAgICBpZiAoaG9zdEVuZCA9PT0gLTEpXG5cdCAgICAgIGhvc3RFbmQgPSByZXN0Lmxlbmd0aDtcblx0XG5cdCAgICB0aGlzLmhvc3QgPSByZXN0LnNsaWNlKDAsIGhvc3RFbmQpO1xuXHQgICAgcmVzdCA9IHJlc3Quc2xpY2UoaG9zdEVuZCk7XG5cdFxuXHQgICAgLy8gcHVsbCBvdXQgcG9ydC5cblx0ICAgIHRoaXMucGFyc2VIb3N0KCk7XG5cdFxuXHQgICAgLy8gd2UndmUgaW5kaWNhdGVkIHRoYXQgdGhlcmUgaXMgYSBob3N0bmFtZSxcblx0ICAgIC8vIHNvIGV2ZW4gaWYgaXQncyBlbXB0eSwgaXQgaGFzIHRvIGJlIHByZXNlbnQuXG5cdCAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcblx0XG5cdCAgICAvLyBpZiBob3N0bmFtZSBiZWdpbnMgd2l0aCBbIGFuZCBlbmRzIHdpdGggXVxuXHQgICAgLy8gYXNzdW1lIHRoYXQgaXQncyBhbiBJUHY2IGFkZHJlc3MuXG5cdCAgICB2YXIgaXB2Nkhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZVswXSA9PT0gJ1snICYmXG5cdCAgICAgICAgdGhpcy5ob3N0bmFtZVt0aGlzLmhvc3RuYW1lLmxlbmd0aCAtIDFdID09PSAnXSc7XG5cdFxuXHQgICAgLy8gdmFsaWRhdGUgYSBsaXR0bGUuXG5cdCAgICBpZiAoIWlwdjZIb3N0bmFtZSkge1xuXHQgICAgICB2YXIgaG9zdHBhcnRzID0gdGhpcy5ob3N0bmFtZS5zcGxpdCgvXFwuLyk7XG5cdCAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaG9zdHBhcnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHQgICAgICAgIHZhciBwYXJ0ID0gaG9zdHBhcnRzW2ldO1xuXHQgICAgICAgIGlmICghcGFydCkgY29udGludWU7XG5cdCAgICAgICAgaWYgKCFwYXJ0Lm1hdGNoKGhvc3RuYW1lUGFydFBhdHRlcm4pKSB7XG5cdCAgICAgICAgICB2YXIgbmV3cGFydCA9ICcnO1xuXHQgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGsgPSBwYXJ0Lmxlbmd0aDsgaiA8IGs7IGorKykge1xuXHQgICAgICAgICAgICBpZiAocGFydC5jaGFyQ29kZUF0KGopID4gMTI3KSB7XG5cdCAgICAgICAgICAgICAgLy8gd2UgcmVwbGFjZSBub24tQVNDSUkgY2hhciB3aXRoIGEgdGVtcG9yYXJ5IHBsYWNlaG9sZGVyXG5cdCAgICAgICAgICAgICAgLy8gd2UgbmVlZCB0aGlzIHRvIG1ha2Ugc3VyZSBzaXplIG9mIGhvc3RuYW1lIGlzIG5vdFxuXHQgICAgICAgICAgICAgIC8vIGJyb2tlbiBieSByZXBsYWNpbmcgbm9uLUFTQ0lJIGJ5IG5vdGhpbmdcblx0ICAgICAgICAgICAgICBuZXdwYXJ0ICs9ICd4Jztcblx0ICAgICAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgICBuZXdwYXJ0ICs9IHBhcnRbal07XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgIH1cblx0ICAgICAgICAgIC8vIHdlIHRlc3QgYWdhaW4gd2l0aCBBU0NJSSBjaGFyIG9ubHlcblx0ICAgICAgICAgIGlmICghbmV3cGFydC5tYXRjaChob3N0bmFtZVBhcnRQYXR0ZXJuKSkge1xuXHQgICAgICAgICAgICB2YXIgdmFsaWRQYXJ0cyA9IGhvc3RwYXJ0cy5zbGljZSgwLCBpKTtcblx0ICAgICAgICAgICAgdmFyIG5vdEhvc3QgPSBob3N0cGFydHMuc2xpY2UoaSArIDEpO1xuXHQgICAgICAgICAgICB2YXIgYml0ID0gcGFydC5tYXRjaChob3N0bmFtZVBhcnRTdGFydCk7XG5cdCAgICAgICAgICAgIGlmIChiaXQpIHtcblx0ICAgICAgICAgICAgICB2YWxpZFBhcnRzLnB1c2goYml0WzFdKTtcblx0ICAgICAgICAgICAgICBub3RIb3N0LnVuc2hpZnQoYml0WzJdKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAobm90SG9zdC5sZW5ndGgpIHtcblx0ICAgICAgICAgICAgICByZXN0ID0gJy8nICsgbm90SG9zdC5qb2luKCcuJykgKyByZXN0O1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHRoaXMuaG9zdG5hbWUgPSB2YWxpZFBhcnRzLmpvaW4oJy4nKTtcblx0ICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICB9XG5cdCAgICB9XG5cdFxuXHQgICAgaWYgKHRoaXMuaG9zdG5hbWUubGVuZ3RoID4gaG9zdG5hbWVNYXhMZW4pIHtcblx0ICAgICAgdGhpcy5ob3N0bmFtZSA9ICcnO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgLy8gaG9zdG5hbWVzIGFyZSBhbHdheXMgbG93ZXIgY2FzZS5cblx0ICAgICAgdGhpcy5ob3N0bmFtZSA9IHRoaXMuaG9zdG5hbWUudG9Mb3dlckNhc2UoKTtcblx0ICAgIH1cblx0XG5cdCAgICBpZiAoIWlwdjZIb3N0bmFtZSkge1xuXHQgICAgICAvLyBJRE5BIFN1cHBvcnQ6IFJldHVybnMgYSBwdW55IGNvZGVkIHJlcHJlc2VudGF0aW9uIG9mIFwiZG9tYWluXCIuXG5cdCAgICAgIC8vIEl0IG9ubHkgY29udmVydHMgdGhlIHBhcnQgb2YgdGhlIGRvbWFpbiBuYW1lIHRoYXRcblx0ICAgICAgLy8gaGFzIG5vbiBBU0NJSSBjaGFyYWN0ZXJzLiBJLmUuIGl0IGRvc2VudCBtYXR0ZXIgaWZcblx0ICAgICAgLy8geW91IGNhbGwgaXQgd2l0aCBhIGRvbWFpbiB0aGF0IGFscmVhZHkgaXMgaW4gQVNDSUkuXG5cdCAgICAgIHZhciBkb21haW5BcnJheSA9IHRoaXMuaG9zdG5hbWUuc3BsaXQoJy4nKTtcblx0ICAgICAgdmFyIG5ld091dCA9IFtdO1xuXHQgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRvbWFpbkFycmF5Lmxlbmd0aDsgKytpKSB7XG5cdCAgICAgICAgdmFyIHMgPSBkb21haW5BcnJheVtpXTtcblx0ICAgICAgICBuZXdPdXQucHVzaChzLm1hdGNoKC9bXkEtWmEtejAtOV8tXS8pID9cblx0ICAgICAgICAgICAgJ3huLS0nICsgcHVueWNvZGUuZW5jb2RlKHMpIDogcyk7XG5cdCAgICAgIH1cblx0ICAgICAgdGhpcy5ob3N0bmFtZSA9IG5ld091dC5qb2luKCcuJyk7XG5cdCAgICB9XG5cdFxuXHQgICAgdmFyIHAgPSB0aGlzLnBvcnQgPyAnOicgKyB0aGlzLnBvcnQgOiAnJztcblx0ICAgIHZhciBoID0gdGhpcy5ob3N0bmFtZSB8fCAnJztcblx0ICAgIHRoaXMuaG9zdCA9IGggKyBwO1xuXHQgICAgdGhpcy5ocmVmICs9IHRoaXMuaG9zdDtcblx0XG5cdCAgICAvLyBzdHJpcCBbIGFuZCBdIGZyb20gdGhlIGhvc3RuYW1lXG5cdCAgICAvLyB0aGUgaG9zdCBmaWVsZCBzdGlsbCByZXRhaW5zIHRoZW0sIHRob3VnaFxuXHQgICAgaWYgKGlwdjZIb3N0bmFtZSkge1xuXHQgICAgICB0aGlzLmhvc3RuYW1lID0gdGhpcy5ob3N0bmFtZS5zdWJzdHIoMSwgdGhpcy5ob3N0bmFtZS5sZW5ndGggLSAyKTtcblx0ICAgICAgaWYgKHJlc3RbMF0gIT09ICcvJykge1xuXHQgICAgICAgIHJlc3QgPSAnLycgKyByZXN0O1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHRcblx0ICAvLyBub3cgcmVzdCBpcyBzZXQgdG8gdGhlIHBvc3QtaG9zdCBzdHVmZi5cblx0ICAvLyBjaG9wIG9mZiBhbnkgZGVsaW0gY2hhcnMuXG5cdCAgaWYgKCF1bnNhZmVQcm90b2NvbFtsb3dlclByb3RvXSkge1xuXHRcblx0ICAgIC8vIEZpcnN0LCBtYWtlIDEwMCUgc3VyZSB0aGF0IGFueSBcImF1dG9Fc2NhcGVcIiBjaGFycyBnZXRcblx0ICAgIC8vIGVzY2FwZWQsIGV2ZW4gaWYgZW5jb2RlVVJJQ29tcG9uZW50IGRvZXNuJ3QgdGhpbmsgdGhleVxuXHQgICAgLy8gbmVlZCB0byBiZS5cblx0ICAgIGZvciAodmFyIGkgPSAwLCBsID0gYXV0b0VzY2FwZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0ICAgICAgdmFyIGFlID0gYXV0b0VzY2FwZVtpXTtcblx0ICAgICAgdmFyIGVzYyA9IGVuY29kZVVSSUNvbXBvbmVudChhZSk7XG5cdCAgICAgIGlmIChlc2MgPT09IGFlKSB7XG5cdCAgICAgICAgZXNjID0gZXNjYXBlKGFlKTtcblx0ICAgICAgfVxuXHQgICAgICByZXN0ID0gcmVzdC5zcGxpdChhZSkuam9pbihlc2MpO1xuXHQgICAgfVxuXHQgIH1cblx0XG5cdFxuXHQgIC8vIGNob3Agb2ZmIGZyb20gdGhlIHRhaWwgZmlyc3QuXG5cdCAgdmFyIGhhc2ggPSByZXN0LmluZGV4T2YoJyMnKTtcblx0ICBpZiAoaGFzaCAhPT0gLTEpIHtcblx0ICAgIC8vIGdvdCBhIGZyYWdtZW50IHN0cmluZy5cblx0ICAgIHRoaXMuaGFzaCA9IHJlc3Quc3Vic3RyKGhhc2gpO1xuXHQgICAgcmVzdCA9IHJlc3Quc2xpY2UoMCwgaGFzaCk7XG5cdCAgfVxuXHQgIHZhciBxbSA9IHJlc3QuaW5kZXhPZignPycpO1xuXHQgIGlmIChxbSAhPT0gLTEpIHtcblx0ICAgIHRoaXMuc2VhcmNoID0gcmVzdC5zdWJzdHIocW0pO1xuXHQgICAgdGhpcy5xdWVyeSA9IHJlc3Quc3Vic3RyKHFtICsgMSk7XG5cdCAgICBpZiAocGFyc2VRdWVyeVN0cmluZykge1xuXHQgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnlzdHJpbmcucGFyc2UodGhpcy5xdWVyeSk7XG5cdCAgICB9XG5cdCAgICByZXN0ID0gcmVzdC5zbGljZSgwLCBxbSk7XG5cdCAgfSBlbHNlIGlmIChwYXJzZVF1ZXJ5U3RyaW5nKSB7XG5cdCAgICAvLyBubyBxdWVyeSBzdHJpbmcsIGJ1dCBwYXJzZVF1ZXJ5U3RyaW5nIHN0aWxsIHJlcXVlc3RlZFxuXHQgICAgdGhpcy5zZWFyY2ggPSAnJztcblx0ICAgIHRoaXMucXVlcnkgPSB7fTtcblx0ICB9XG5cdCAgaWYgKHJlc3QpIHRoaXMucGF0aG5hbWUgPSByZXN0O1xuXHQgIGlmIChzbGFzaGVkUHJvdG9jb2xbbG93ZXJQcm90b10gJiZcblx0ICAgICAgdGhpcy5ob3N0bmFtZSAmJiAhdGhpcy5wYXRobmFtZSkge1xuXHQgICAgdGhpcy5wYXRobmFtZSA9ICcvJztcblx0ICB9XG5cdFxuXHQgIC8vdG8gc3VwcG9ydCBodHRwLnJlcXVlc3Rcblx0ICBpZiAodGhpcy5wYXRobmFtZSB8fCB0aGlzLnNlYXJjaCkge1xuXHQgICAgdmFyIHAgPSB0aGlzLnBhdGhuYW1lIHx8ICcnO1xuXHQgICAgdmFyIHMgPSB0aGlzLnNlYXJjaCB8fCAnJztcblx0ICAgIHRoaXMucGF0aCA9IHAgKyBzO1xuXHQgIH1cblx0XG5cdCAgLy8gZmluYWxseSwgcmVjb25zdHJ1Y3QgdGhlIGhyZWYgYmFzZWQgb24gd2hhdCBoYXMgYmVlbiB2YWxpZGF0ZWQuXG5cdCAgdGhpcy5ocmVmID0gdGhpcy5mb3JtYXQoKTtcblx0ICByZXR1cm4gdGhpcztcblx0fTtcblx0XG5cdC8vIGZvcm1hdCBhIHBhcnNlZCBvYmplY3QgaW50byBhIHVybCBzdHJpbmdcblx0ZnVuY3Rpb24gdXJsRm9ybWF0KG9iaikge1xuXHQgIC8vIGVuc3VyZSBpdCdzIGFuIG9iamVjdCwgYW5kIG5vdCBhIHN0cmluZyB1cmwuXG5cdCAgLy8gSWYgaXQncyBhbiBvYmosIHRoaXMgaXMgYSBuby1vcC5cblx0ICAvLyB0aGlzIHdheSwgeW91IGNhbiBjYWxsIHVybF9mb3JtYXQoKSBvbiBzdHJpbmdzXG5cdCAgLy8gdG8gY2xlYW4gdXAgcG90ZW50aWFsbHkgd29ua3kgdXJscy5cblx0ICBpZiAoaXNTdHJpbmcob2JqKSkgb2JqID0gdXJsUGFyc2Uob2JqKTtcblx0ICBpZiAoIShvYmogaW5zdGFuY2VvZiBVcmwpKSByZXR1cm4gVXJsLnByb3RvdHlwZS5mb3JtYXQuY2FsbChvYmopO1xuXHQgIHJldHVybiBvYmouZm9ybWF0KCk7XG5cdH1cblx0XG5cdFVybC5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oKSB7XG5cdCAgdmFyIGF1dGggPSB0aGlzLmF1dGggfHwgJyc7XG5cdCAgaWYgKGF1dGgpIHtcblx0ICAgIGF1dGggPSBlbmNvZGVVUklDb21wb25lbnQoYXV0aCk7XG5cdCAgICBhdXRoID0gYXV0aC5yZXBsYWNlKC8lM0EvaSwgJzonKTtcblx0ICAgIGF1dGggKz0gJ0AnO1xuXHQgIH1cblx0XG5cdCAgdmFyIHByb3RvY29sID0gdGhpcy5wcm90b2NvbCB8fCAnJyxcblx0ICAgICAgcGF0aG5hbWUgPSB0aGlzLnBhdGhuYW1lIHx8ICcnLFxuXHQgICAgICBoYXNoID0gdGhpcy5oYXNoIHx8ICcnLFxuXHQgICAgICBob3N0ID0gZmFsc2UsXG5cdCAgICAgIHF1ZXJ5ID0gJyc7XG5cdFxuXHQgIGlmICh0aGlzLmhvc3QpIHtcblx0ICAgIGhvc3QgPSBhdXRoICsgdGhpcy5ob3N0O1xuXHQgIH0gZWxzZSBpZiAodGhpcy5ob3N0bmFtZSkge1xuXHQgICAgaG9zdCA9IGF1dGggKyAodGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgPT09IC0xID9cblx0ICAgICAgICB0aGlzLmhvc3RuYW1lIDpcblx0ICAgICAgICAnWycgKyB0aGlzLmhvc3RuYW1lICsgJ10nKTtcblx0ICAgIGlmICh0aGlzLnBvcnQpIHtcblx0ICAgICAgaG9zdCArPSAnOicgKyB0aGlzLnBvcnQ7XG5cdCAgICB9XG5cdCAgfVxuXHRcblx0ICBpZiAodGhpcy5xdWVyeSAmJlxuXHQgICAgICBpc09iamVjdCh0aGlzLnF1ZXJ5KSAmJlxuXHQgICAgICBPYmplY3Qua2V5cyh0aGlzLnF1ZXJ5KS5sZW5ndGgpIHtcblx0ICAgIHF1ZXJ5ID0gcXVlcnlzdHJpbmcuc3RyaW5naWZ5KHRoaXMucXVlcnkpO1xuXHQgIH1cblx0XG5cdCAgdmFyIHNlYXJjaCA9IHRoaXMuc2VhcmNoIHx8IChxdWVyeSAmJiAoJz8nICsgcXVlcnkpKSB8fCAnJztcblx0XG5cdCAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLnN1YnN0cigtMSkgIT09ICc6JykgcHJvdG9jb2wgKz0gJzonO1xuXHRcblx0ICAvLyBvbmx5IHRoZSBzbGFzaGVkUHJvdG9jb2xzIGdldCB0aGUgLy8uICBOb3QgbWFpbHRvOiwgeG1wcDosIGV0Yy5cblx0ICAvLyB1bmxlc3MgdGhleSBoYWQgdGhlbSB0byBiZWdpbiB3aXRoLlxuXHQgIGlmICh0aGlzLnNsYXNoZXMgfHxcblx0ICAgICAgKCFwcm90b2NvbCB8fCBzbGFzaGVkUHJvdG9jb2xbcHJvdG9jb2xdKSAmJiBob3N0ICE9PSBmYWxzZSkge1xuXHQgICAgaG9zdCA9ICcvLycgKyAoaG9zdCB8fCAnJyk7XG5cdCAgICBpZiAocGF0aG5hbWUgJiYgcGF0aG5hbWUuY2hhckF0KDApICE9PSAnLycpIHBhdGhuYW1lID0gJy8nICsgcGF0aG5hbWU7XG5cdCAgfSBlbHNlIGlmICghaG9zdCkge1xuXHQgICAgaG9zdCA9ICcnO1xuXHQgIH1cblx0XG5cdCAgaWYgKGhhc2ggJiYgaGFzaC5jaGFyQXQoMCkgIT09ICcjJykgaGFzaCA9ICcjJyArIGhhc2g7XG5cdCAgaWYgKHNlYXJjaCAmJiBzZWFyY2guY2hhckF0KDApICE9PSAnPycpIHNlYXJjaCA9ICc/JyArIHNlYXJjaDtcblx0XG5cdCAgcGF0aG5hbWUgPSBwYXRobmFtZS5yZXBsYWNlKC9bPyNdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG5cdCAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KG1hdGNoKTtcblx0ICB9KTtcblx0ICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZSgnIycsICclMjMnKTtcblx0XG5cdCAgcmV0dXJuIHByb3RvY29sICsgaG9zdCArIHBhdGhuYW1lICsgc2VhcmNoICsgaGFzaDtcblx0fTtcblx0XG5cdGZ1bmN0aW9uIHVybFJlc29sdmUoc291cmNlLCByZWxhdGl2ZSkge1xuXHQgIHJldHVybiB1cmxQYXJzZShzb3VyY2UsIGZhbHNlLCB0cnVlKS5yZXNvbHZlKHJlbGF0aXZlKTtcblx0fVxuXHRcblx0VXJsLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24ocmVsYXRpdmUpIHtcblx0ICByZXR1cm4gdGhpcy5yZXNvbHZlT2JqZWN0KHVybFBhcnNlKHJlbGF0aXZlLCBmYWxzZSwgdHJ1ZSkpLmZvcm1hdCgpO1xuXHR9O1xuXHRcblx0ZnVuY3Rpb24gdXJsUmVzb2x2ZU9iamVjdChzb3VyY2UsIHJlbGF0aXZlKSB7XG5cdCAgaWYgKCFzb3VyY2UpIHJldHVybiByZWxhdGl2ZTtcblx0ICByZXR1cm4gdXJsUGFyc2Uoc291cmNlLCBmYWxzZSwgdHJ1ZSkucmVzb2x2ZU9iamVjdChyZWxhdGl2ZSk7XG5cdH1cblx0XG5cdFVybC5wcm90b3R5cGUucmVzb2x2ZU9iamVjdCA9IGZ1bmN0aW9uKHJlbGF0aXZlKSB7XG5cdCAgaWYgKGlzU3RyaW5nKHJlbGF0aXZlKSkge1xuXHQgICAgdmFyIHJlbCA9IG5ldyBVcmwoKTtcblx0ICAgIHJlbC5wYXJzZShyZWxhdGl2ZSwgZmFsc2UsIHRydWUpO1xuXHQgICAgcmVsYXRpdmUgPSByZWw7XG5cdCAgfVxuXHRcblx0ICB2YXIgcmVzdWx0ID0gbmV3IFVybCgpO1xuXHQgIE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goZnVuY3Rpb24oaykge1xuXHQgICAgcmVzdWx0W2tdID0gdGhpc1trXTtcblx0ICB9LCB0aGlzKTtcblx0XG5cdCAgLy8gaGFzaCBpcyBhbHdheXMgb3ZlcnJpZGRlbiwgbm8gbWF0dGVyIHdoYXQuXG5cdCAgLy8gZXZlbiBocmVmPVwiXCIgd2lsbCByZW1vdmUgaXQuXG5cdCAgcmVzdWx0Lmhhc2ggPSByZWxhdGl2ZS5oYXNoO1xuXHRcblx0ICAvLyBpZiB0aGUgcmVsYXRpdmUgdXJsIGlzIGVtcHR5LCB0aGVuIHRoZXJlJ3Mgbm90aGluZyBsZWZ0IHRvIGRvIGhlcmUuXG5cdCAgaWYgKHJlbGF0aXZlLmhyZWYgPT09ICcnKSB7XG5cdCAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcblx0ICAgIHJldHVybiByZXN1bHQ7XG5cdCAgfVxuXHRcblx0ICAvLyBocmVmcyBsaWtlIC8vZm9vL2JhciBhbHdheXMgY3V0IHRvIHRoZSBwcm90b2NvbC5cblx0ICBpZiAocmVsYXRpdmUuc2xhc2hlcyAmJiAhcmVsYXRpdmUucHJvdG9jb2wpIHtcblx0ICAgIC8vIHRha2UgZXZlcnl0aGluZyBleGNlcHQgdGhlIHByb3RvY29sIGZyb20gcmVsYXRpdmVcblx0ICAgIE9iamVjdC5rZXlzKHJlbGF0aXZlKS5mb3JFYWNoKGZ1bmN0aW9uKGspIHtcblx0ICAgICAgaWYgKGsgIT09ICdwcm90b2NvbCcpXG5cdCAgICAgICAgcmVzdWx0W2tdID0gcmVsYXRpdmVba107XG5cdCAgICB9KTtcblx0XG5cdCAgICAvL3VybFBhcnNlIGFwcGVuZHMgdHJhaWxpbmcgLyB0byB1cmxzIGxpa2UgaHR0cDovL3d3dy5leGFtcGxlLmNvbVxuXHQgICAgaWYgKHNsYXNoZWRQcm90b2NvbFtyZXN1bHQucHJvdG9jb2xdICYmXG5cdCAgICAgICAgcmVzdWx0Lmhvc3RuYW1lICYmICFyZXN1bHQucGF0aG5hbWUpIHtcblx0ICAgICAgcmVzdWx0LnBhdGggPSByZXN1bHQucGF0aG5hbWUgPSAnLyc7XG5cdCAgICB9XG5cdFxuXHQgICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG5cdCAgICByZXR1cm4gcmVzdWx0O1xuXHQgIH1cblx0XG5cdCAgaWYgKHJlbGF0aXZlLnByb3RvY29sICYmIHJlbGF0aXZlLnByb3RvY29sICE9PSByZXN1bHQucHJvdG9jb2wpIHtcblx0ICAgIC8vIGlmIGl0J3MgYSBrbm93biB1cmwgcHJvdG9jb2wsIHRoZW4gY2hhbmdpbmdcblx0ICAgIC8vIHRoZSBwcm90b2NvbCBkb2VzIHdlaXJkIHRoaW5nc1xuXHQgICAgLy8gZmlyc3QsIGlmIGl0J3Mgbm90IGZpbGU6LCB0aGVuIHdlIE1VU1QgaGF2ZSBhIGhvc3QsXG5cdCAgICAvLyBhbmQgaWYgdGhlcmUgd2FzIGEgcGF0aFxuXHQgICAgLy8gdG8gYmVnaW4gd2l0aCwgdGhlbiB3ZSBNVVNUIGhhdmUgYSBwYXRoLlxuXHQgICAgLy8gaWYgaXQgaXMgZmlsZTosIHRoZW4gdGhlIGhvc3QgaXMgZHJvcHBlZCxcblx0ICAgIC8vIGJlY2F1c2UgdGhhdCdzIGtub3duIHRvIGJlIGhvc3RsZXNzLlxuXHQgICAgLy8gYW55dGhpbmcgZWxzZSBpcyBhc3N1bWVkIHRvIGJlIGFic29sdXRlLlxuXHQgICAgaWYgKCFzbGFzaGVkUHJvdG9jb2xbcmVsYXRpdmUucHJvdG9jb2xdKSB7XG5cdCAgICAgIE9iamVjdC5rZXlzKHJlbGF0aXZlKS5mb3JFYWNoKGZ1bmN0aW9uKGspIHtcblx0ICAgICAgICByZXN1bHRba10gPSByZWxhdGl2ZVtrXTtcblx0ICAgICAgfSk7XG5cdCAgICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuXHQgICAgICByZXR1cm4gcmVzdWx0O1xuXHQgICAgfVxuXHRcblx0ICAgIHJlc3VsdC5wcm90b2NvbCA9IHJlbGF0aXZlLnByb3RvY29sO1xuXHQgICAgaWYgKCFyZWxhdGl2ZS5ob3N0ICYmICFob3N0bGVzc1Byb3RvY29sW3JlbGF0aXZlLnByb3RvY29sXSkge1xuXHQgICAgICB2YXIgcmVsUGF0aCA9IChyZWxhdGl2ZS5wYXRobmFtZSB8fCAnJykuc3BsaXQoJy8nKTtcblx0ICAgICAgd2hpbGUgKHJlbFBhdGgubGVuZ3RoICYmICEocmVsYXRpdmUuaG9zdCA9IHJlbFBhdGguc2hpZnQoKSkpO1xuXHQgICAgICBpZiAoIXJlbGF0aXZlLmhvc3QpIHJlbGF0aXZlLmhvc3QgPSAnJztcblx0ICAgICAgaWYgKCFyZWxhdGl2ZS5ob3N0bmFtZSkgcmVsYXRpdmUuaG9zdG5hbWUgPSAnJztcblx0ICAgICAgaWYgKHJlbFBhdGhbMF0gIT09ICcnKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuXHQgICAgICBpZiAocmVsUGF0aC5sZW5ndGggPCAyKSByZWxQYXRoLnVuc2hpZnQoJycpO1xuXHQgICAgICByZXN1bHQucGF0aG5hbWUgPSByZWxQYXRoLmpvaW4oJy8nKTtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICAgIHJlc3VsdC5wYXRobmFtZSA9IHJlbGF0aXZlLnBhdGhuYW1lO1xuXHQgICAgfVxuXHQgICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcblx0ICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuXHQgICAgcmVzdWx0Lmhvc3QgPSByZWxhdGl2ZS5ob3N0IHx8ICcnO1xuXHQgICAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoO1xuXHQgICAgcmVzdWx0Lmhvc3RuYW1lID0gcmVsYXRpdmUuaG9zdG5hbWUgfHwgcmVsYXRpdmUuaG9zdDtcblx0ICAgIHJlc3VsdC5wb3J0ID0gcmVsYXRpdmUucG9ydDtcblx0ICAgIC8vIHRvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG5cdCAgICBpZiAocmVzdWx0LnBhdGhuYW1lIHx8IHJlc3VsdC5zZWFyY2gpIHtcblx0ICAgICAgdmFyIHAgPSByZXN1bHQucGF0aG5hbWUgfHwgJyc7XG5cdCAgICAgIHZhciBzID0gcmVzdWx0LnNlYXJjaCB8fCAnJztcblx0ICAgICAgcmVzdWx0LnBhdGggPSBwICsgcztcblx0ICAgIH1cblx0ICAgIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcblx0ICAgIHJlc3VsdC5ocmVmID0gcmVzdWx0LmZvcm1hdCgpO1xuXHQgICAgcmV0dXJuIHJlc3VsdDtcblx0ICB9XG5cdFxuXHQgIHZhciBpc1NvdXJjZUFicyA9IChyZXN1bHQucGF0aG5hbWUgJiYgcmVzdWx0LnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSxcblx0ICAgICAgaXNSZWxBYnMgPSAoXG5cdCAgICAgICAgICByZWxhdGl2ZS5ob3N0IHx8XG5cdCAgICAgICAgICByZWxhdGl2ZS5wYXRobmFtZSAmJiByZWxhdGl2ZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJ1xuXHQgICAgICApLFxuXHQgICAgICBtdXN0RW5kQWJzID0gKGlzUmVsQWJzIHx8IGlzU291cmNlQWJzIHx8XG5cdCAgICAgICAgICAgICAgICAgICAgKHJlc3VsdC5ob3N0ICYmIHJlbGF0aXZlLnBhdGhuYW1lKSksXG5cdCAgICAgIHJlbW92ZUFsbERvdHMgPSBtdXN0RW5kQWJzLFxuXHQgICAgICBzcmNQYXRoID0gcmVzdWx0LnBhdGhuYW1lICYmIHJlc3VsdC5wYXRobmFtZS5zcGxpdCgnLycpIHx8IFtdLFxuXHQgICAgICByZWxQYXRoID0gcmVsYXRpdmUucGF0aG5hbWUgJiYgcmVsYXRpdmUucGF0aG5hbWUuc3BsaXQoJy8nKSB8fCBbXSxcblx0ICAgICAgcHN5Y2hvdGljID0gcmVzdWx0LnByb3RvY29sICYmICFzbGFzaGVkUHJvdG9jb2xbcmVzdWx0LnByb3RvY29sXTtcblx0XG5cdCAgLy8gaWYgdGhlIHVybCBpcyBhIG5vbi1zbGFzaGVkIHVybCwgdGhlbiByZWxhdGl2ZVxuXHQgIC8vIGxpbmtzIGxpa2UgLi4vLi4gc2hvdWxkIGJlIGFibGVcblx0ICAvLyB0byBjcmF3bCB1cCB0byB0aGUgaG9zdG5hbWUsIGFzIHdlbGwuICBUaGlzIGlzIHN0cmFuZ2UuXG5cdCAgLy8gcmVzdWx0LnByb3RvY29sIGhhcyBhbHJlYWR5IGJlZW4gc2V0IGJ5IG5vdy5cblx0ICAvLyBMYXRlciBvbiwgcHV0IHRoZSBmaXJzdCBwYXRoIHBhcnQgaW50byB0aGUgaG9zdCBmaWVsZC5cblx0ICBpZiAocHN5Y2hvdGljKSB7XG5cdCAgICByZXN1bHQuaG9zdG5hbWUgPSAnJztcblx0ICAgIHJlc3VsdC5wb3J0ID0gbnVsbDtcblx0ICAgIGlmIChyZXN1bHQuaG9zdCkge1xuXHQgICAgICBpZiAoc3JjUGF0aFswXSA9PT0gJycpIHNyY1BhdGhbMF0gPSByZXN1bHQuaG9zdDtcblx0ICAgICAgZWxzZSBzcmNQYXRoLnVuc2hpZnQocmVzdWx0Lmhvc3QpO1xuXHQgICAgfVxuXHQgICAgcmVzdWx0Lmhvc3QgPSAnJztcblx0ICAgIGlmIChyZWxhdGl2ZS5wcm90b2NvbCkge1xuXHQgICAgICByZWxhdGl2ZS5ob3N0bmFtZSA9IG51bGw7XG5cdCAgICAgIHJlbGF0aXZlLnBvcnQgPSBudWxsO1xuXHQgICAgICBpZiAocmVsYXRpdmUuaG9zdCkge1xuXHQgICAgICAgIGlmIChyZWxQYXRoWzBdID09PSAnJykgcmVsUGF0aFswXSA9IHJlbGF0aXZlLmhvc3Q7XG5cdCAgICAgICAgZWxzZSByZWxQYXRoLnVuc2hpZnQocmVsYXRpdmUuaG9zdCk7XG5cdCAgICAgIH1cblx0ICAgICAgcmVsYXRpdmUuaG9zdCA9IG51bGw7XG5cdCAgICB9XG5cdCAgICBtdXN0RW5kQWJzID0gbXVzdEVuZEFicyAmJiAocmVsUGF0aFswXSA9PT0gJycgfHwgc3JjUGF0aFswXSA9PT0gJycpO1xuXHQgIH1cblx0XG5cdCAgaWYgKGlzUmVsQWJzKSB7XG5cdCAgICAvLyBpdCdzIGFic29sdXRlLlxuXHQgICAgcmVzdWx0Lmhvc3QgPSAocmVsYXRpdmUuaG9zdCB8fCByZWxhdGl2ZS5ob3N0ID09PSAnJykgP1xuXHQgICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0IDogcmVzdWx0Lmhvc3Q7XG5cdCAgICByZXN1bHQuaG9zdG5hbWUgPSAocmVsYXRpdmUuaG9zdG5hbWUgfHwgcmVsYXRpdmUuaG9zdG5hbWUgPT09ICcnKSA/XG5cdCAgICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZS5ob3N0bmFtZSA6IHJlc3VsdC5ob3N0bmFtZTtcblx0ICAgIHJlc3VsdC5zZWFyY2ggPSByZWxhdGl2ZS5zZWFyY2g7XG5cdCAgICByZXN1bHQucXVlcnkgPSByZWxhdGl2ZS5xdWVyeTtcblx0ICAgIHNyY1BhdGggPSByZWxQYXRoO1xuXHQgICAgLy8gZmFsbCB0aHJvdWdoIHRvIHRoZSBkb3QtaGFuZGxpbmcgYmVsb3cuXG5cdCAgfSBlbHNlIGlmIChyZWxQYXRoLmxlbmd0aCkge1xuXHQgICAgLy8gaXQncyByZWxhdGl2ZVxuXHQgICAgLy8gdGhyb3cgYXdheSB0aGUgZXhpc3RpbmcgZmlsZSwgYW5kIHRha2UgdGhlIG5ldyBwYXRoIGluc3RlYWQuXG5cdCAgICBpZiAoIXNyY1BhdGgpIHNyY1BhdGggPSBbXTtcblx0ICAgIHNyY1BhdGgucG9wKCk7XG5cdCAgICBzcmNQYXRoID0gc3JjUGF0aC5jb25jYXQocmVsUGF0aCk7XG5cdCAgICByZXN1bHQuc2VhcmNoID0gcmVsYXRpdmUuc2VhcmNoO1xuXHQgICAgcmVzdWx0LnF1ZXJ5ID0gcmVsYXRpdmUucXVlcnk7XG5cdCAgfSBlbHNlIGlmICghaXNOdWxsT3JVbmRlZmluZWQocmVsYXRpdmUuc2VhcmNoKSkge1xuXHQgICAgLy8ganVzdCBwdWxsIG91dCB0aGUgc2VhcmNoLlxuXHQgICAgLy8gbGlrZSBocmVmPSc/Zm9vJy5cblx0ICAgIC8vIFB1dCB0aGlzIGFmdGVyIHRoZSBvdGhlciB0d28gY2FzZXMgYmVjYXVzZSBpdCBzaW1wbGlmaWVzIHRoZSBib29sZWFuc1xuXHQgICAgaWYgKHBzeWNob3RpYykge1xuXHQgICAgICByZXN1bHQuaG9zdG5hbWUgPSByZXN1bHQuaG9zdCA9IHNyY1BhdGguc2hpZnQoKTtcblx0ICAgICAgLy9vY2NhdGlvbmFseSB0aGUgYXV0aCBjYW4gZ2V0IHN0dWNrIG9ubHkgaW4gaG9zdFxuXHQgICAgICAvL3RoaXMgZXNwZWNpYWx5IGhhcHBlbnMgaW4gY2FzZXMgbGlrZVxuXHQgICAgICAvL3VybC5yZXNvbHZlT2JqZWN0KCdtYWlsdG86bG9jYWwxQGRvbWFpbjEnLCAnbG9jYWwyQGRvbWFpbjInKVxuXHQgICAgICB2YXIgYXV0aEluSG9zdCA9IHJlc3VsdC5ob3N0ICYmIHJlc3VsdC5ob3N0LmluZGV4T2YoJ0AnKSA+IDAgP1xuXHQgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ob3N0LnNwbGl0KCdAJykgOiBmYWxzZTtcblx0ICAgICAgaWYgKGF1dGhJbkhvc3QpIHtcblx0ICAgICAgICByZXN1bHQuYXV0aCA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcblx0ICAgICAgICByZXN1bHQuaG9zdCA9IHJlc3VsdC5ob3N0bmFtZSA9IGF1dGhJbkhvc3Quc2hpZnQoKTtcblx0ICAgICAgfVxuXHQgICAgfVxuXHQgICAgcmVzdWx0LnNlYXJjaCA9IHJlbGF0aXZlLnNlYXJjaDtcblx0ICAgIHJlc3VsdC5xdWVyeSA9IHJlbGF0aXZlLnF1ZXJ5O1xuXHQgICAgLy90byBzdXBwb3J0IGh0dHAucmVxdWVzdFxuXHQgICAgaWYgKCFpc051bGwocmVzdWx0LnBhdGhuYW1lKSB8fCAhaXNOdWxsKHJlc3VsdC5zZWFyY2gpKSB7XG5cdCAgICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG5cdCAgICAgICAgICAgICAgICAgICAgKHJlc3VsdC5zZWFyY2ggPyByZXN1bHQuc2VhcmNoIDogJycpO1xuXHQgICAgfVxuXHQgICAgcmVzdWx0LmhyZWYgPSByZXN1bHQuZm9ybWF0KCk7XG5cdCAgICByZXR1cm4gcmVzdWx0O1xuXHQgIH1cblx0XG5cdCAgaWYgKCFzcmNQYXRoLmxlbmd0aCkge1xuXHQgICAgLy8gbm8gcGF0aCBhdCBhbGwuICBlYXN5LlxuXHQgICAgLy8gd2UndmUgYWxyZWFkeSBoYW5kbGVkIHRoZSBvdGhlciBzdHVmZiBhYm92ZS5cblx0ICAgIHJlc3VsdC5wYXRobmFtZSA9IG51bGw7XG5cdCAgICAvL3RvIHN1cHBvcnQgaHR0cC5yZXF1ZXN0XG5cdCAgICBpZiAocmVzdWx0LnNlYXJjaCkge1xuXHQgICAgICByZXN1bHQucGF0aCA9ICcvJyArIHJlc3VsdC5zZWFyY2g7XG5cdCAgICB9IGVsc2Uge1xuXHQgICAgICByZXN1bHQucGF0aCA9IG51bGw7XG5cdCAgICB9XG5cdCAgICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcblx0ICAgIHJldHVybiByZXN1bHQ7XG5cdCAgfVxuXHRcblx0ICAvLyBpZiBhIHVybCBFTkRzIGluIC4gb3IgLi4sIHRoZW4gaXQgbXVzdCBnZXQgYSB0cmFpbGluZyBzbGFzaC5cblx0ICAvLyBob3dldmVyLCBpZiBpdCBlbmRzIGluIGFueXRoaW5nIGVsc2Ugbm9uLXNsYXNoeSxcblx0ICAvLyB0aGVuIGl0IG11c3QgTk9UIGdldCBhIHRyYWlsaW5nIHNsYXNoLlxuXHQgIHZhciBsYXN0ID0gc3JjUGF0aC5zbGljZSgtMSlbMF07XG5cdCAgdmFyIGhhc1RyYWlsaW5nU2xhc2ggPSAoXG5cdCAgICAgIChyZXN1bHQuaG9zdCB8fCByZWxhdGl2ZS5ob3N0KSAmJiAobGFzdCA9PT0gJy4nIHx8IGxhc3QgPT09ICcuLicpIHx8XG5cdCAgICAgIGxhc3QgPT09ICcnKTtcblx0XG5cdCAgLy8gc3RyaXAgc2luZ2xlIGRvdHMsIHJlc29sdmUgZG91YmxlIGRvdHMgdG8gcGFyZW50IGRpclxuXHQgIC8vIGlmIHRoZSBwYXRoIHRyaWVzIHRvIGdvIGFib3ZlIHRoZSByb290LCBgdXBgIGVuZHMgdXAgPiAwXG5cdCAgdmFyIHVwID0gMDtcblx0ICBmb3IgKHZhciBpID0gc3JjUGF0aC5sZW5ndGg7IGkgPj0gMDsgaS0tKSB7XG5cdCAgICBsYXN0ID0gc3JjUGF0aFtpXTtcblx0ICAgIGlmIChsYXN0ID09ICcuJykge1xuXHQgICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcblx0ICAgIH0gZWxzZSBpZiAobGFzdCA9PT0gJy4uJykge1xuXHQgICAgICBzcmNQYXRoLnNwbGljZShpLCAxKTtcblx0ICAgICAgdXArKztcblx0ICAgIH0gZWxzZSBpZiAodXApIHtcblx0ICAgICAgc3JjUGF0aC5zcGxpY2UoaSwgMSk7XG5cdCAgICAgIHVwLS07XG5cdCAgICB9XG5cdCAgfVxuXHRcblx0ICAvLyBpZiB0aGUgcGF0aCBpcyBhbGxvd2VkIHRvIGdvIGFib3ZlIHRoZSByb290LCByZXN0b3JlIGxlYWRpbmcgLi5zXG5cdCAgaWYgKCFtdXN0RW5kQWJzICYmICFyZW1vdmVBbGxEb3RzKSB7XG5cdCAgICBmb3IgKDsgdXAtLTsgdXApIHtcblx0ICAgICAgc3JjUGF0aC51bnNoaWZ0KCcuLicpO1xuXHQgICAgfVxuXHQgIH1cblx0XG5cdCAgaWYgKG11c3RFbmRBYnMgJiYgc3JjUGF0aFswXSAhPT0gJycgJiZcblx0ICAgICAgKCFzcmNQYXRoWzBdIHx8IHNyY1BhdGhbMF0uY2hhckF0KDApICE9PSAnLycpKSB7XG5cdCAgICBzcmNQYXRoLnVuc2hpZnQoJycpO1xuXHQgIH1cblx0XG5cdCAgaWYgKGhhc1RyYWlsaW5nU2xhc2ggJiYgKHNyY1BhdGguam9pbignLycpLnN1YnN0cigtMSkgIT09ICcvJykpIHtcblx0ICAgIHNyY1BhdGgucHVzaCgnJyk7XG5cdCAgfVxuXHRcblx0ICB2YXIgaXNBYnNvbHV0ZSA9IHNyY1BhdGhbMF0gPT09ICcnIHx8XG5cdCAgICAgIChzcmNQYXRoWzBdICYmIHNyY1BhdGhbMF0uY2hhckF0KDApID09PSAnLycpO1xuXHRcblx0ICAvLyBwdXQgdGhlIGhvc3QgYmFja1xuXHQgIGlmIChwc3ljaG90aWMpIHtcblx0ICAgIHJlc3VsdC5ob3N0bmFtZSA9IHJlc3VsdC5ob3N0ID0gaXNBYnNvbHV0ZSA/ICcnIDpcblx0ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjUGF0aC5sZW5ndGggPyBzcmNQYXRoLnNoaWZ0KCkgOiAnJztcblx0ICAgIC8vb2NjYXRpb25hbHkgdGhlIGF1dGggY2FuIGdldCBzdHVjayBvbmx5IGluIGhvc3Rcblx0ICAgIC8vdGhpcyBlc3BlY2lhbHkgaGFwcGVucyBpbiBjYXNlcyBsaWtlXG5cdCAgICAvL3VybC5yZXNvbHZlT2JqZWN0KCdtYWlsdG86bG9jYWwxQGRvbWFpbjEnLCAnbG9jYWwyQGRvbWFpbjInKVxuXHQgICAgdmFyIGF1dGhJbkhvc3QgPSByZXN1bHQuaG9zdCAmJiByZXN1bHQuaG9zdC5pbmRleE9mKCdAJykgPiAwID9cblx0ICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmhvc3Quc3BsaXQoJ0AnKSA6IGZhbHNlO1xuXHQgICAgaWYgKGF1dGhJbkhvc3QpIHtcblx0ICAgICAgcmVzdWx0LmF1dGggPSBhdXRoSW5Ib3N0LnNoaWZ0KCk7XG5cdCAgICAgIHJlc3VsdC5ob3N0ID0gcmVzdWx0Lmhvc3RuYW1lID0gYXV0aEluSG9zdC5zaGlmdCgpO1xuXHQgICAgfVxuXHQgIH1cblx0XG5cdCAgbXVzdEVuZEFicyA9IG11c3RFbmRBYnMgfHwgKHJlc3VsdC5ob3N0ICYmIHNyY1BhdGgubGVuZ3RoKTtcblx0XG5cdCAgaWYgKG11c3RFbmRBYnMgJiYgIWlzQWJzb2x1dGUpIHtcblx0ICAgIHNyY1BhdGgudW5zaGlmdCgnJyk7XG5cdCAgfVxuXHRcblx0ICBpZiAoIXNyY1BhdGgubGVuZ3RoKSB7XG5cdCAgICByZXN1bHQucGF0aG5hbWUgPSBudWxsO1xuXHQgICAgcmVzdWx0LnBhdGggPSBudWxsO1xuXHQgIH0gZWxzZSB7XG5cdCAgICByZXN1bHQucGF0aG5hbWUgPSBzcmNQYXRoLmpvaW4oJy8nKTtcblx0ICB9XG5cdFxuXHQgIC8vdG8gc3VwcG9ydCByZXF1ZXN0Lmh0dHBcblx0ICBpZiAoIWlzTnVsbChyZXN1bHQucGF0aG5hbWUpIHx8ICFpc051bGwocmVzdWx0LnNlYXJjaCkpIHtcblx0ICAgIHJlc3VsdC5wYXRoID0gKHJlc3VsdC5wYXRobmFtZSA/IHJlc3VsdC5wYXRobmFtZSA6ICcnKSArXG5cdCAgICAgICAgICAgICAgICAgIChyZXN1bHQuc2VhcmNoID8gcmVzdWx0LnNlYXJjaCA6ICcnKTtcblx0ICB9XG5cdCAgcmVzdWx0LmF1dGggPSByZWxhdGl2ZS5hdXRoIHx8IHJlc3VsdC5hdXRoO1xuXHQgIHJlc3VsdC5zbGFzaGVzID0gcmVzdWx0LnNsYXNoZXMgfHwgcmVsYXRpdmUuc2xhc2hlcztcblx0ICByZXN1bHQuaHJlZiA9IHJlc3VsdC5mb3JtYXQoKTtcblx0ICByZXR1cm4gcmVzdWx0O1xuXHR9O1xuXHRcblx0VXJsLnByb3RvdHlwZS5wYXJzZUhvc3QgPSBmdW5jdGlvbigpIHtcblx0ICB2YXIgaG9zdCA9IHRoaXMuaG9zdDtcblx0ICB2YXIgcG9ydCA9IHBvcnRQYXR0ZXJuLmV4ZWMoaG9zdCk7XG5cdCAgaWYgKHBvcnQpIHtcblx0ICAgIHBvcnQgPSBwb3J0WzBdO1xuXHQgICAgaWYgKHBvcnQgIT09ICc6Jykge1xuXHQgICAgICB0aGlzLnBvcnQgPSBwb3J0LnN1YnN0cigxKTtcblx0ICAgIH1cblx0ICAgIGhvc3QgPSBob3N0LnN1YnN0cigwLCBob3N0Lmxlbmd0aCAtIHBvcnQubGVuZ3RoKTtcblx0ICB9XG5cdCAgaWYgKGhvc3QpIHRoaXMuaG9zdG5hbWUgPSBob3N0O1xuXHR9O1xuXHRcblx0ZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG5cdCAgcmV0dXJuIHR5cGVvZiBhcmcgPT09IFwic3RyaW5nXCI7XG5cdH1cblx0XG5cdGZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuXHQgIHJldHVybiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiBhcmcgIT09IG51bGw7XG5cdH1cblx0XG5cdGZ1bmN0aW9uIGlzTnVsbChhcmcpIHtcblx0ICByZXR1cm4gYXJnID09PSBudWxsO1xuXHR9XG5cdGZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKGFyZykge1xuXHQgIHJldHVybiAgYXJnID09IG51bGw7XG5cdH1cblxuXG4vKioqLyB9LFxuLyogMTEgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdHZhciBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXzsvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi8oZnVuY3Rpb24obW9kdWxlLCBnbG9iYWwpIHsvKiEgaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlIHYxLjMuMiBieSBAbWF0aGlhcyAqL1xuXHQ7KGZ1bmN0aW9uKHJvb3QpIHtcblx0XG5cdFx0LyoqIERldGVjdCBmcmVlIHZhcmlhYmxlcyAqL1xuXHRcdHZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiZcblx0XHRcdCFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cdFx0dmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJlxuXHRcdFx0IW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cdFx0dmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcblx0XHRpZiAoXG5cdFx0XHRmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fFxuXHRcdFx0ZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwgfHxcblx0XHRcdGZyZWVHbG9iYWwuc2VsZiA9PT0gZnJlZUdsb2JhbFxuXHRcdCkge1xuXHRcdFx0cm9vdCA9IGZyZWVHbG9iYWw7XG5cdFx0fVxuXHRcblx0XHQvKipcblx0XHQgKiBUaGUgYHB1bnljb2RlYCBvYmplY3QuXG5cdFx0ICogQG5hbWUgcHVueWNvZGVcblx0XHQgKiBAdHlwZSBPYmplY3Rcblx0XHQgKi9cblx0XHR2YXIgcHVueWNvZGUsXG5cdFxuXHRcdC8qKiBIaWdoZXN0IHBvc2l0aXZlIHNpZ25lZCAzMi1iaXQgZmxvYXQgdmFsdWUgKi9cblx0XHRtYXhJbnQgPSAyMTQ3NDgzNjQ3LCAvLyBha2EuIDB4N0ZGRkZGRkYgb3IgMl4zMS0xXG5cdFxuXHRcdC8qKiBCb290c3RyaW5nIHBhcmFtZXRlcnMgKi9cblx0XHRiYXNlID0gMzYsXG5cdFx0dE1pbiA9IDEsXG5cdFx0dE1heCA9IDI2LFxuXHRcdHNrZXcgPSAzOCxcblx0XHRkYW1wID0gNzAwLFxuXHRcdGluaXRpYWxCaWFzID0gNzIsXG5cdFx0aW5pdGlhbE4gPSAxMjgsIC8vIDB4ODBcblx0XHRkZWxpbWl0ZXIgPSAnLScsIC8vICdcXHgyRCdcblx0XG5cdFx0LyoqIFJlZ3VsYXIgZXhwcmVzc2lvbnMgKi9cblx0XHRyZWdleFB1bnljb2RlID0gL154bi0tLyxcblx0XHRyZWdleE5vbkFTQ0lJID0gL1teXFx4MjAtXFx4N0VdLywgLy8gdW5wcmludGFibGUgQVNDSUkgY2hhcnMgKyBub24tQVNDSUkgY2hhcnNcblx0XHRyZWdleFNlcGFyYXRvcnMgPSAvW1xceDJFXFx1MzAwMlxcdUZGMEVcXHVGRjYxXS9nLCAvLyBSRkMgMzQ5MCBzZXBhcmF0b3JzXG5cdFxuXHRcdC8qKiBFcnJvciBtZXNzYWdlcyAqL1xuXHRcdGVycm9ycyA9IHtcblx0XHRcdCdvdmVyZmxvdyc6ICdPdmVyZmxvdzogaW5wdXQgbmVlZHMgd2lkZXIgaW50ZWdlcnMgdG8gcHJvY2VzcycsXG5cdFx0XHQnbm90LWJhc2ljJzogJ0lsbGVnYWwgaW5wdXQgPj0gMHg4MCAobm90IGEgYmFzaWMgY29kZSBwb2ludCknLFxuXHRcdFx0J2ludmFsaWQtaW5wdXQnOiAnSW52YWxpZCBpbnB1dCdcblx0XHR9LFxuXHRcblx0XHQvKiogQ29udmVuaWVuY2Ugc2hvcnRjdXRzICovXG5cdFx0YmFzZU1pbnVzVE1pbiA9IGJhc2UgLSB0TWluLFxuXHRcdGZsb29yID0gTWF0aC5mbG9vcixcblx0XHRzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLFxuXHRcblx0XHQvKiogVGVtcG9yYXJ5IHZhcmlhYmxlICovXG5cdFx0a2V5O1xuXHRcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblx0XG5cdFx0LyoqXG5cdFx0ICogQSBnZW5lcmljIGVycm9yIHV0aWxpdHkgZnVuY3Rpb24uXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgZXJyb3IgdHlwZS5cblx0XHQgKiBAcmV0dXJucyB7RXJyb3J9IFRocm93cyBhIGBSYW5nZUVycm9yYCB3aXRoIHRoZSBhcHBsaWNhYmxlIGVycm9yIG1lc3NhZ2UuXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZXJyb3IodHlwZSkge1xuXHRcdFx0dGhyb3cgUmFuZ2VFcnJvcihlcnJvcnNbdHlwZV0pO1xuXHRcdH1cblx0XG5cdFx0LyoqXG5cdFx0ICogQSBnZW5lcmljIGBBcnJheSNtYXBgIHV0aWxpdHkgZnVuY3Rpb24uXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuXHRcdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGZvciBldmVyeSBhcnJheVxuXHRcdCAqIGl0ZW0uXG5cdFx0ICogQHJldHVybnMge0FycmF5fSBBIG5ldyBhcnJheSBvZiB2YWx1ZXMgcmV0dXJuZWQgYnkgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIG1hcChhcnJheSwgZm4pIHtcblx0XHRcdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdFx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0XHR3aGlsZSAobGVuZ3RoLS0pIHtcblx0XHRcdFx0cmVzdWx0W2xlbmd0aF0gPSBmbihhcnJheVtsZW5ndGhdKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHRcblx0XHQvKipcblx0XHQgKiBBIHNpbXBsZSBgQXJyYXkjbWFwYC1saWtlIHdyYXBwZXIgdG8gd29yayB3aXRoIGRvbWFpbiBuYW1lIHN0cmluZ3Mgb3IgZW1haWxcblx0XHQgKiBhZGRyZXNzZXMuXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gZG9tYWluIFRoZSBkb21haW4gbmFtZSBvciBlbWFpbCBhZGRyZXNzLlxuXHRcdCAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0aGF0IGdldHMgY2FsbGVkIGZvciBldmVyeVxuXHRcdCAqIGNoYXJhY3Rlci5cblx0XHQgKiBAcmV0dXJucyB7QXJyYXl9IEEgbmV3IHN0cmluZyBvZiBjaGFyYWN0ZXJzIHJldHVybmVkIGJ5IHRoZSBjYWxsYmFja1xuXHRcdCAqIGZ1bmN0aW9uLlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIG1hcERvbWFpbihzdHJpbmcsIGZuKSB7XG5cdFx0XHR2YXIgcGFydHMgPSBzdHJpbmcuc3BsaXQoJ0AnKTtcblx0XHRcdHZhciByZXN1bHQgPSAnJztcblx0XHRcdGlmIChwYXJ0cy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdC8vIEluIGVtYWlsIGFkZHJlc3Nlcywgb25seSB0aGUgZG9tYWluIG5hbWUgc2hvdWxkIGJlIHB1bnljb2RlZC4gTGVhdmVcblx0XHRcdFx0Ly8gdGhlIGxvY2FsIHBhcnQgKGkuZS4gZXZlcnl0aGluZyB1cCB0byBgQGApIGludGFjdC5cblx0XHRcdFx0cmVzdWx0ID0gcGFydHNbMF0gKyAnQCc7XG5cdFx0XHRcdHN0cmluZyA9IHBhcnRzWzFdO1xuXHRcdFx0fVxuXHRcdFx0Ly8gQXZvaWQgYHNwbGl0KHJlZ2V4KWAgZm9yIElFOCBjb21wYXRpYmlsaXR5LiBTZWUgIzE3LlxuXHRcdFx0c3RyaW5nID0gc3RyaW5nLnJlcGxhY2UocmVnZXhTZXBhcmF0b3JzLCAnXFx4MkUnKTtcblx0XHRcdHZhciBsYWJlbHMgPSBzdHJpbmcuc3BsaXQoJy4nKTtcblx0XHRcdHZhciBlbmNvZGVkID0gbWFwKGxhYmVscywgZm4pLmpvaW4oJy4nKTtcblx0XHRcdHJldHVybiByZXN1bHQgKyBlbmNvZGVkO1xuXHRcdH1cblx0XG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlcyBhbiBhcnJheSBjb250YWluaW5nIHRoZSBudW1lcmljIGNvZGUgcG9pbnRzIG9mIGVhY2ggVW5pY29kZVxuXHRcdCAqIGNoYXJhY3RlciBpbiB0aGUgc3RyaW5nLiBXaGlsZSBKYXZhU2NyaXB0IHVzZXMgVUNTLTIgaW50ZXJuYWxseSxcblx0XHQgKiB0aGlzIGZ1bmN0aW9uIHdpbGwgY29udmVydCBhIHBhaXIgb2Ygc3Vycm9nYXRlIGhhbHZlcyAoZWFjaCBvZiB3aGljaFxuXHRcdCAqIFVDUy0yIGV4cG9zZXMgYXMgc2VwYXJhdGUgY2hhcmFjdGVycykgaW50byBhIHNpbmdsZSBjb2RlIHBvaW50LFxuXHRcdCAqIG1hdGNoaW5nIFVURi0xNi5cblx0XHQgKiBAc2VlIGBwdW55Y29kZS51Y3MyLmVuY29kZWBcblx0XHQgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0XHQgKiBAbWVtYmVyT2YgcHVueWNvZGUudWNzMlxuXHRcdCAqIEBuYW1lIGRlY29kZVxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBzdHJpbmcgVGhlIFVuaWNvZGUgaW5wdXQgc3RyaW5nIChVQ1MtMikuXG5cdFx0ICogQHJldHVybnMge0FycmF5fSBUaGUgbmV3IGFycmF5IG9mIGNvZGUgcG9pbnRzLlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKSB7XG5cdFx0XHR2YXIgb3V0cHV0ID0gW10sXG5cdFx0XHQgICAgY291bnRlciA9IDAsXG5cdFx0XHQgICAgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aCxcblx0XHRcdCAgICB2YWx1ZSxcblx0XHRcdCAgICBleHRyYTtcblx0XHRcdHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHRcdHZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdFx0aWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0XHRcdC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuXHRcdFx0XHRcdGV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdFx0XHRpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHsgLy8gbG93IHN1cnJvZ2F0ZVxuXHRcdFx0XHRcdFx0b3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlIG5leHRcblx0XHRcdFx0XHRcdC8vIGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpclxuXHRcdFx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0XHRcdFx0Y291bnRlci0tO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBvdXRwdXQ7XG5cdFx0fVxuXHRcblx0XHQvKipcblx0XHQgKiBDcmVhdGVzIGEgc3RyaW5nIGJhc2VkIG9uIGFuIGFycmF5IG9mIG51bWVyaWMgY29kZSBwb2ludHMuXG5cdFx0ICogQHNlZSBgcHVueWNvZGUudWNzMi5kZWNvZGVgXG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlLnVjczJcblx0XHQgKiBAbmFtZSBlbmNvZGVcblx0XHQgKiBAcGFyYW0ge0FycmF5fSBjb2RlUG9pbnRzIFRoZSBhcnJheSBvZiBudW1lcmljIGNvZGUgcG9pbnRzLlxuXHRcdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBuZXcgVW5pY29kZSBzdHJpbmcgKFVDUy0yKS5cblx0XHQgKi9cblx0XHRmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdFx0XHRyZXR1cm4gbWFwKGFycmF5LCBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0XHR2YXIgb3V0cHV0ID0gJyc7XG5cdFx0XHRcdGlmICh2YWx1ZSA+IDB4RkZGRikge1xuXHRcdFx0XHRcdHZhbHVlIC09IDB4MTAwMDA7XG5cdFx0XHRcdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7XG5cdFx0XHRcdFx0dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUpO1xuXHRcdFx0XHRyZXR1cm4gb3V0cHV0O1xuXHRcdFx0fSkuam9pbignJyk7XG5cdFx0fVxuXHRcblx0XHQvKipcblx0XHQgKiBDb252ZXJ0cyBhIGJhc2ljIGNvZGUgcG9pbnQgaW50byBhIGRpZ2l0L2ludGVnZXIuXG5cdFx0ICogQHNlZSBgZGlnaXRUb0Jhc2ljKClgXG5cdFx0ICogQHByaXZhdGVcblx0XHQgKiBAcGFyYW0ge051bWJlcn0gY29kZVBvaW50IFRoZSBiYXNpYyBudW1lcmljIGNvZGUgcG9pbnQgdmFsdWUuXG5cdFx0ICogQHJldHVybnMge051bWJlcn0gVGhlIG51bWVyaWMgdmFsdWUgb2YgYSBiYXNpYyBjb2RlIHBvaW50IChmb3IgdXNlIGluXG5cdFx0ICogcmVwcmVzZW50aW5nIGludGVnZXJzKSBpbiB0aGUgcmFuZ2UgYDBgIHRvIGBiYXNlIC0gMWAsIG9yIGBiYXNlYCBpZlxuXHRcdCAqIHRoZSBjb2RlIHBvaW50IGRvZXMgbm90IHJlcHJlc2VudCBhIHZhbHVlLlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGJhc2ljVG9EaWdpdChjb2RlUG9pbnQpIHtcblx0XHRcdGlmIChjb2RlUG9pbnQgLSA0OCA8IDEwKSB7XG5cdFx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSAyMjtcblx0XHRcdH1cblx0XHRcdGlmIChjb2RlUG9pbnQgLSA2NSA8IDI2KSB7XG5cdFx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA2NTtcblx0XHRcdH1cblx0XHRcdGlmIChjb2RlUG9pbnQgLSA5NyA8IDI2KSB7XG5cdFx0XHRcdHJldHVybiBjb2RlUG9pbnQgLSA5Nztcblx0XHRcdH1cblx0XHRcdHJldHVybiBiYXNlO1xuXHRcdH1cblx0XG5cdFx0LyoqXG5cdFx0ICogQ29udmVydHMgYSBkaWdpdC9pbnRlZ2VyIGludG8gYSBiYXNpYyBjb2RlIHBvaW50LlxuXHRcdCAqIEBzZWUgYGJhc2ljVG9EaWdpdCgpYFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICogQHBhcmFtIHtOdW1iZXJ9IGRpZ2l0IFRoZSBudW1lcmljIHZhbHVlIG9mIGEgYmFzaWMgY29kZSBwb2ludC5cblx0XHQgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYmFzaWMgY29kZSBwb2ludCB3aG9zZSB2YWx1ZSAod2hlbiB1c2VkIGZvclxuXHRcdCAqIHJlcHJlc2VudGluZyBpbnRlZ2VycykgaXMgYGRpZ2l0YCwgd2hpY2ggbmVlZHMgdG8gYmUgaW4gdGhlIHJhbmdlXG5cdFx0ICogYDBgIHRvIGBiYXNlIC0gMWAuIElmIGBmbGFnYCBpcyBub24temVybywgdGhlIHVwcGVyY2FzZSBmb3JtIGlzXG5cdFx0ICogdXNlZDsgZWxzZSwgdGhlIGxvd2VyY2FzZSBmb3JtIGlzIHVzZWQuIFRoZSBiZWhhdmlvciBpcyB1bmRlZmluZWRcblx0XHQgKiBpZiBgZmxhZ2AgaXMgbm9uLXplcm8gYW5kIGBkaWdpdGAgaGFzIG5vIHVwcGVyY2FzZSBmb3JtLlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGRpZ2l0VG9CYXNpYyhkaWdpdCwgZmxhZykge1xuXHRcdFx0Ly8gIDAuLjI1IG1hcCB0byBBU0NJSSBhLi56IG9yIEEuLlpcblx0XHRcdC8vIDI2Li4zNSBtYXAgdG8gQVNDSUkgMC4uOVxuXHRcdFx0cmV0dXJuIGRpZ2l0ICsgMjIgKyA3NSAqIChkaWdpdCA8IDI2KSAtICgoZmxhZyAhPSAwKSA8PCA1KTtcblx0XHR9XG5cdFxuXHRcdC8qKlxuXHRcdCAqIEJpYXMgYWRhcHRhdGlvbiBmdW5jdGlvbiBhcyBwZXIgc2VjdGlvbiAzLjQgb2YgUkZDIDM0OTIuXG5cdFx0ICogaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMzQ5MiNzZWN0aW9uLTMuNFxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gYWRhcHQoZGVsdGEsIG51bVBvaW50cywgZmlyc3RUaW1lKSB7XG5cdFx0XHR2YXIgayA9IDA7XG5cdFx0XHRkZWx0YSA9IGZpcnN0VGltZSA/IGZsb29yKGRlbHRhIC8gZGFtcCkgOiBkZWx0YSA+PiAxO1xuXHRcdFx0ZGVsdGEgKz0gZmxvb3IoZGVsdGEgLyBudW1Qb2ludHMpO1xuXHRcdFx0Zm9yICgvKiBubyBpbml0aWFsaXphdGlvbiAqLzsgZGVsdGEgPiBiYXNlTWludXNUTWluICogdE1heCA+PiAxOyBrICs9IGJhc2UpIHtcblx0XHRcdFx0ZGVsdGEgPSBmbG9vcihkZWx0YSAvIGJhc2VNaW51c1RNaW4pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZsb29yKGsgKyAoYmFzZU1pbnVzVE1pbiArIDEpICogZGVsdGEgLyAoZGVsdGEgKyBza2V3KSk7XG5cdFx0fVxuXHRcblx0XHQvKipcblx0XHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyBvZiBBU0NJSS1vbmx5IHN5bWJvbHMgdG8gYSBzdHJpbmcgb2YgVW5pY29kZVxuXHRcdCAqIHN5bWJvbHMuXG5cdFx0ICogQG1lbWJlck9mIHB1bnljb2RlXG5cdFx0ICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHRcdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZXN1bHRpbmcgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scy5cblx0XHQgKi9cblx0XHRmdW5jdGlvbiBkZWNvZGUoaW5wdXQpIHtcblx0XHRcdC8vIERvbid0IHVzZSBVQ1MtMlxuXHRcdFx0dmFyIG91dHB1dCA9IFtdLFxuXHRcdFx0ICAgIGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoLFxuXHRcdFx0ICAgIG91dCxcblx0XHRcdCAgICBpID0gMCxcblx0XHRcdCAgICBuID0gaW5pdGlhbE4sXG5cdFx0XHQgICAgYmlhcyA9IGluaXRpYWxCaWFzLFxuXHRcdFx0ICAgIGJhc2ljLFxuXHRcdFx0ICAgIGosXG5cdFx0XHQgICAgaW5kZXgsXG5cdFx0XHQgICAgb2xkaSxcblx0XHRcdCAgICB3LFxuXHRcdFx0ICAgIGssXG5cdFx0XHQgICAgZGlnaXQsXG5cdFx0XHQgICAgdCxcblx0XHRcdCAgICAvKiogQ2FjaGVkIGNhbGN1bGF0aW9uIHJlc3VsdHMgKi9cblx0XHRcdCAgICBiYXNlTWludXNUO1xuXHRcblx0XHRcdC8vIEhhbmRsZSB0aGUgYmFzaWMgY29kZSBwb2ludHM6IGxldCBgYmFzaWNgIGJlIHRoZSBudW1iZXIgb2YgaW5wdXQgY29kZVxuXHRcdFx0Ly8gcG9pbnRzIGJlZm9yZSB0aGUgbGFzdCBkZWxpbWl0ZXIsIG9yIGAwYCBpZiB0aGVyZSBpcyBub25lLCB0aGVuIGNvcHlcblx0XHRcdC8vIHRoZSBmaXJzdCBiYXNpYyBjb2RlIHBvaW50cyB0byB0aGUgb3V0cHV0LlxuXHRcblx0XHRcdGJhc2ljID0gaW5wdXQubGFzdEluZGV4T2YoZGVsaW1pdGVyKTtcblx0XHRcdGlmIChiYXNpYyA8IDApIHtcblx0XHRcdFx0YmFzaWMgPSAwO1xuXHRcdFx0fVxuXHRcblx0XHRcdGZvciAoaiA9IDA7IGogPCBiYXNpYzsgKytqKSB7XG5cdFx0XHRcdC8vIGlmIGl0J3Mgbm90IGEgYmFzaWMgY29kZSBwb2ludFxuXHRcdFx0XHRpZiAoaW5wdXQuY2hhckNvZGVBdChqKSA+PSAweDgwKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ25vdC1iYXNpYycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG91dHB1dC5wdXNoKGlucHV0LmNoYXJDb2RlQXQoaikpO1xuXHRcdFx0fVxuXHRcblx0XHRcdC8vIE1haW4gZGVjb2RpbmcgbG9vcDogc3RhcnQganVzdCBhZnRlciB0aGUgbGFzdCBkZWxpbWl0ZXIgaWYgYW55IGJhc2ljIGNvZGVcblx0XHRcdC8vIHBvaW50cyB3ZXJlIGNvcGllZDsgc3RhcnQgYXQgdGhlIGJlZ2lubmluZyBvdGhlcndpc2UuXG5cdFxuXHRcdFx0Zm9yIChpbmRleCA9IGJhc2ljID4gMCA/IGJhc2ljICsgMSA6IDA7IGluZGV4IDwgaW5wdXRMZW5ndGg7IC8qIG5vIGZpbmFsIGV4cHJlc3Npb24gKi8pIHtcblx0XG5cdFx0XHRcdC8vIGBpbmRleGAgaXMgdGhlIGluZGV4IG9mIHRoZSBuZXh0IGNoYXJhY3RlciB0byBiZSBjb25zdW1lZC5cblx0XHRcdFx0Ly8gRGVjb2RlIGEgZ2VuZXJhbGl6ZWQgdmFyaWFibGUtbGVuZ3RoIGludGVnZXIgaW50byBgZGVsdGFgLFxuXHRcdFx0XHQvLyB3aGljaCBnZXRzIGFkZGVkIHRvIGBpYC4gVGhlIG92ZXJmbG93IGNoZWNraW5nIGlzIGVhc2llclxuXHRcdFx0XHQvLyBpZiB3ZSBpbmNyZWFzZSBgaWAgYXMgd2UgZ28sIHRoZW4gc3VidHJhY3Qgb2ZmIGl0cyBzdGFydGluZ1xuXHRcdFx0XHQvLyB2YWx1ZSBhdCB0aGUgZW5kIHRvIG9idGFpbiBgZGVsdGFgLlxuXHRcdFx0XHRmb3IgKG9sZGkgPSBpLCB3ID0gMSwgayA9IGJhc2U7IC8qIG5vIGNvbmRpdGlvbiAqLzsgayArPSBiYXNlKSB7XG5cdFxuXHRcdFx0XHRcdGlmIChpbmRleCA+PSBpbnB1dExlbmd0aCkge1xuXHRcdFx0XHRcdFx0ZXJyb3IoJ2ludmFsaWQtaW5wdXQnKTtcblx0XHRcdFx0XHR9XG5cdFxuXHRcdFx0XHRcdGRpZ2l0ID0gYmFzaWNUb0RpZ2l0KGlucHV0LmNoYXJDb2RlQXQoaW5kZXgrKykpO1xuXHRcblx0XHRcdFx0XHRpZiAoZGlnaXQgPj0gYmFzZSB8fCBkaWdpdCA+IGZsb29yKChtYXhJbnQgLSBpKSAvIHcpKSB7XG5cdFx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0XHR9XG5cdFxuXHRcdFx0XHRcdGkgKz0gZGlnaXQgKiB3O1xuXHRcdFx0XHRcdHQgPSBrIDw9IGJpYXMgPyB0TWluIDogKGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXMpO1xuXHRcblx0XHRcdFx0XHRpZiAoZGlnaXQgPCB0KSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFxuXHRcdFx0XHRcdGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdFx0XHRpZiAodyA+IGZsb29yKG1heEludCAvIGJhc2VNaW51c1QpKSB7XG5cdFx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0XHR9XG5cdFxuXHRcdFx0XHRcdHcgKj0gYmFzZU1pbnVzVDtcblx0XG5cdFx0XHRcdH1cblx0XG5cdFx0XHRcdG91dCA9IG91dHB1dC5sZW5ndGggKyAxO1xuXHRcdFx0XHRiaWFzID0gYWRhcHQoaSAtIG9sZGksIG91dCwgb2xkaSA9PSAwKTtcblx0XG5cdFx0XHRcdC8vIGBpYCB3YXMgc3VwcG9zZWQgdG8gd3JhcCBhcm91bmQgZnJvbSBgb3V0YCB0byBgMGAsXG5cdFx0XHRcdC8vIGluY3JlbWVudGluZyBgbmAgZWFjaCB0aW1lLCBzbyB3ZSdsbCBmaXggdGhhdCBub3c6XG5cdFx0XHRcdGlmIChmbG9vcihpIC8gb3V0KSA+IG1heEludCAtIG4pIHtcblx0XHRcdFx0XHRlcnJvcignb3ZlcmZsb3cnKTtcblx0XHRcdFx0fVxuXHRcblx0XHRcdFx0biArPSBmbG9vcihpIC8gb3V0KTtcblx0XHRcdFx0aSAlPSBvdXQ7XG5cdFxuXHRcdFx0XHQvLyBJbnNlcnQgYG5gIGF0IHBvc2l0aW9uIGBpYCBvZiB0aGUgb3V0cHV0XG5cdFx0XHRcdG91dHB1dC5zcGxpY2UoaSsrLCAwLCBuKTtcblx0XG5cdFx0XHR9XG5cdFxuXHRcdFx0cmV0dXJuIHVjczJlbmNvZGUob3V0cHV0KTtcblx0XHR9XG5cdFxuXHRcdC8qKlxuXHRcdCAqIENvbnZlcnRzIGEgc3RyaW5nIG9mIFVuaWNvZGUgc3ltYm9scyAoZS5nLiBhIGRvbWFpbiBuYW1lIGxhYmVsKSB0byBhXG5cdFx0ICogUHVueWNvZGUgc3RyaW5nIG9mIEFTQ0lJLW9ubHkgc3ltYm9scy5cblx0XHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIHN0cmluZyBvZiBVbmljb2RlIHN5bWJvbHMuXG5cdFx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlc3VsdGluZyBQdW55Y29kZSBzdHJpbmcgb2YgQVNDSUktb25seSBzeW1ib2xzLlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGVuY29kZShpbnB1dCkge1xuXHRcdFx0dmFyIG4sXG5cdFx0XHQgICAgZGVsdGEsXG5cdFx0XHQgICAgaGFuZGxlZENQQ291bnQsXG5cdFx0XHQgICAgYmFzaWNMZW5ndGgsXG5cdFx0XHQgICAgYmlhcyxcblx0XHRcdCAgICBqLFxuXHRcdFx0ICAgIG0sXG5cdFx0XHQgICAgcSxcblx0XHRcdCAgICBrLFxuXHRcdFx0ICAgIHQsXG5cdFx0XHQgICAgY3VycmVudFZhbHVlLFxuXHRcdFx0ICAgIG91dHB1dCA9IFtdLFxuXHRcdFx0ICAgIC8qKiBgaW5wdXRMZW5ndGhgIHdpbGwgaG9sZCB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIGluIGBpbnB1dGAuICovXG5cdFx0XHQgICAgaW5wdXRMZW5ndGgsXG5cdFx0XHQgICAgLyoqIENhY2hlZCBjYWxjdWxhdGlvbiByZXN1bHRzICovXG5cdFx0XHQgICAgaGFuZGxlZENQQ291bnRQbHVzT25lLFxuXHRcdFx0ICAgIGJhc2VNaW51c1QsXG5cdFx0XHQgICAgcU1pbnVzVDtcblx0XG5cdFx0XHQvLyBDb252ZXJ0IHRoZSBpbnB1dCBpbiBVQ1MtMiB0byBVbmljb2RlXG5cdFx0XHRpbnB1dCA9IHVjczJkZWNvZGUoaW5wdXQpO1xuXHRcblx0XHRcdC8vIENhY2hlIHRoZSBsZW5ndGhcblx0XHRcdGlucHV0TGVuZ3RoID0gaW5wdXQubGVuZ3RoO1xuXHRcblx0XHRcdC8vIEluaXRpYWxpemUgdGhlIHN0YXRlXG5cdFx0XHRuID0gaW5pdGlhbE47XG5cdFx0XHRkZWx0YSA9IDA7XG5cdFx0XHRiaWFzID0gaW5pdGlhbEJpYXM7XG5cdFxuXHRcdFx0Ly8gSGFuZGxlIHRoZSBiYXNpYyBjb2RlIHBvaW50c1xuXHRcdFx0Zm9yIChqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdFx0Y3VycmVudFZhbHVlID0gaW5wdXRbal07XG5cdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPCAweDgwKSB7XG5cdFx0XHRcdFx0b3V0cHV0LnB1c2goc3RyaW5nRnJvbUNoYXJDb2RlKGN1cnJlbnRWYWx1ZSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFxuXHRcdFx0aGFuZGxlZENQQ291bnQgPSBiYXNpY0xlbmd0aCA9IG91dHB1dC5sZW5ndGg7XG5cdFxuXHRcdFx0Ly8gYGhhbmRsZWRDUENvdW50YCBpcyB0aGUgbnVtYmVyIG9mIGNvZGUgcG9pbnRzIHRoYXQgaGF2ZSBiZWVuIGhhbmRsZWQ7XG5cdFx0XHQvLyBgYmFzaWNMZW5ndGhgIGlzIHRoZSBudW1iZXIgb2YgYmFzaWMgY29kZSBwb2ludHMuXG5cdFxuXHRcdFx0Ly8gRmluaXNoIHRoZSBiYXNpYyBzdHJpbmcgLSBpZiBpdCBpcyBub3QgZW1wdHkgLSB3aXRoIGEgZGVsaW1pdGVyXG5cdFx0XHRpZiAoYmFzaWNMZW5ndGgpIHtcblx0XHRcdFx0b3V0cHV0LnB1c2goZGVsaW1pdGVyKTtcblx0XHRcdH1cblx0XG5cdFx0XHQvLyBNYWluIGVuY29kaW5nIGxvb3A6XG5cdFx0XHR3aGlsZSAoaGFuZGxlZENQQ291bnQgPCBpbnB1dExlbmd0aCkge1xuXHRcblx0XHRcdFx0Ly8gQWxsIG5vbi1iYXNpYyBjb2RlIHBvaW50cyA8IG4gaGF2ZSBiZWVuIGhhbmRsZWQgYWxyZWFkeS4gRmluZCB0aGUgbmV4dFxuXHRcdFx0XHQvLyBsYXJnZXIgb25lOlxuXHRcdFx0XHRmb3IgKG0gPSBtYXhJbnQsIGogPSAwOyBqIDwgaW5wdXRMZW5ndGg7ICsraikge1xuXHRcdFx0XHRcdGN1cnJlbnRWYWx1ZSA9IGlucHV0W2pdO1xuXHRcdFx0XHRcdGlmIChjdXJyZW50VmFsdWUgPj0gbiAmJiBjdXJyZW50VmFsdWUgPCBtKSB7XG5cdFx0XHRcdFx0XHRtID0gY3VycmVudFZhbHVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcblx0XHRcdFx0Ly8gSW5jcmVhc2UgYGRlbHRhYCBlbm91Z2ggdG8gYWR2YW5jZSB0aGUgZGVjb2RlcidzIDxuLGk+IHN0YXRlIHRvIDxtLDA+LFxuXHRcdFx0XHQvLyBidXQgZ3VhcmQgYWdhaW5zdCBvdmVyZmxvd1xuXHRcdFx0XHRoYW5kbGVkQ1BDb3VudFBsdXNPbmUgPSBoYW5kbGVkQ1BDb3VudCArIDE7XG5cdFx0XHRcdGlmIChtIC0gbiA+IGZsb29yKChtYXhJbnQgLSBkZWx0YSkgLyBoYW5kbGVkQ1BDb3VudFBsdXNPbmUpKSB7XG5cdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdH1cblx0XG5cdFx0XHRcdGRlbHRhICs9IChtIC0gbikgKiBoYW5kbGVkQ1BDb3VudFBsdXNPbmU7XG5cdFx0XHRcdG4gPSBtO1xuXHRcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IGlucHV0TGVuZ3RoOyArK2opIHtcblx0XHRcdFx0XHRjdXJyZW50VmFsdWUgPSBpbnB1dFtqXTtcblx0XG5cdFx0XHRcdFx0aWYgKGN1cnJlbnRWYWx1ZSA8IG4gJiYgKytkZWx0YSA+IG1heEludCkge1xuXHRcdFx0XHRcdFx0ZXJyb3IoJ292ZXJmbG93Jyk7XG5cdFx0XHRcdFx0fVxuXHRcblx0XHRcdFx0XHRpZiAoY3VycmVudFZhbHVlID09IG4pIHtcblx0XHRcdFx0XHRcdC8vIFJlcHJlc2VudCBkZWx0YSBhcyBhIGdlbmVyYWxpemVkIHZhcmlhYmxlLWxlbmd0aCBpbnRlZ2VyXG5cdFx0XHRcdFx0XHRmb3IgKHEgPSBkZWx0YSwgayA9IGJhc2U7IC8qIG5vIGNvbmRpdGlvbiAqLzsgayArPSBiYXNlKSB7XG5cdFx0XHRcdFx0XHRcdHQgPSBrIDw9IGJpYXMgPyB0TWluIDogKGsgPj0gYmlhcyArIHRNYXggPyB0TWF4IDogayAtIGJpYXMpO1xuXHRcdFx0XHRcdFx0XHRpZiAocSA8IHQpIHtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRxTWludXNUID0gcSAtIHQ7XG5cdFx0XHRcdFx0XHRcdGJhc2VNaW51c1QgPSBiYXNlIC0gdDtcblx0XHRcdFx0XHRcdFx0b3V0cHV0LnB1c2goXG5cdFx0XHRcdFx0XHRcdFx0c3RyaW5nRnJvbUNoYXJDb2RlKGRpZ2l0VG9CYXNpYyh0ICsgcU1pbnVzVCAlIGJhc2VNaW51c1QsIDApKVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRxID0gZmxvb3IocU1pbnVzVCAvIGJhc2VNaW51c1QpO1xuXHRcdFx0XHRcdFx0fVxuXHRcblx0XHRcdFx0XHRcdG91dHB1dC5wdXNoKHN0cmluZ0Zyb21DaGFyQ29kZShkaWdpdFRvQmFzaWMocSwgMCkpKTtcblx0XHRcdFx0XHRcdGJpYXMgPSBhZGFwdChkZWx0YSwgaGFuZGxlZENQQ291bnRQbHVzT25lLCBoYW5kbGVkQ1BDb3VudCA9PSBiYXNpY0xlbmd0aCk7XG5cdFx0XHRcdFx0XHRkZWx0YSA9IDA7XG5cdFx0XHRcdFx0XHQrK2hhbmRsZWRDUENvdW50O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcblx0XHRcdFx0KytkZWx0YTtcblx0XHRcdFx0KytuO1xuXHRcblx0XHRcdH1cblx0XHRcdHJldHVybiBvdXRwdXQuam9pbignJyk7XG5cdFx0fVxuXHRcblx0XHQvKipcblx0XHQgKiBDb252ZXJ0cyBhIFB1bnljb2RlIHN0cmluZyByZXByZXNlbnRpbmcgYSBkb21haW4gbmFtZSBvciBhbiBlbWFpbCBhZGRyZXNzXG5cdFx0ICogdG8gVW5pY29kZS4gT25seSB0aGUgUHVueWNvZGVkIHBhcnRzIG9mIHRoZSBpbnB1dCB3aWxsIGJlIGNvbnZlcnRlZCwgaS5lLlxuXHRcdCAqIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHlvdSBjYWxsIGl0IG9uIGEgc3RyaW5nIHRoYXQgaGFzIGFscmVhZHkgYmVlblxuXHRcdCAqIGNvbnZlcnRlZCB0byBVbmljb2RlLlxuXHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdCAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dCBUaGUgUHVueWNvZGVkIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MgdG9cblx0XHQgKiBjb252ZXJ0IHRvIFVuaWNvZGUuXG5cdFx0ICogQHJldHVybnMge1N0cmluZ30gVGhlIFVuaWNvZGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIFB1bnljb2RlXG5cdFx0ICogc3RyaW5nLlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHRvVW5pY29kZShpbnB1dCkge1xuXHRcdFx0cmV0dXJuIG1hcERvbWFpbihpbnB1dCwgZnVuY3Rpb24oc3RyaW5nKSB7XG5cdFx0XHRcdHJldHVybiByZWdleFB1bnljb2RlLnRlc3Qoc3RyaW5nKVxuXHRcdFx0XHRcdD8gZGVjb2RlKHN0cmluZy5zbGljZSg0KS50b0xvd2VyQ2FzZSgpKVxuXHRcdFx0XHRcdDogc3RyaW5nO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcblx0XHQvKipcblx0XHQgKiBDb252ZXJ0cyBhIFVuaWNvZGUgc3RyaW5nIHJlcHJlc2VudGluZyBhIGRvbWFpbiBuYW1lIG9yIGFuIGVtYWlsIGFkZHJlc3MgdG9cblx0XHQgKiBQdW55Y29kZS4gT25seSB0aGUgbm9uLUFTQ0lJIHBhcnRzIG9mIHRoZSBkb21haW4gbmFtZSB3aWxsIGJlIGNvbnZlcnRlZCxcblx0XHQgKiBpLmUuIGl0IGRvZXNuJ3QgbWF0dGVyIGlmIHlvdSBjYWxsIGl0IHdpdGggYSBkb21haW4gdGhhdCdzIGFscmVhZHkgaW5cblx0XHQgKiBBU0NJSS5cblx0XHQgKiBAbWVtYmVyT2YgcHVueWNvZGVcblx0XHQgKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIGRvbWFpbiBuYW1lIG9yIGVtYWlsIGFkZHJlc3MgdG8gY29udmVydCwgYXMgYVxuXHRcdCAqIFVuaWNvZGUgc3RyaW5nLlxuXHRcdCAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBQdW55Y29kZSByZXByZXNlbnRhdGlvbiBvZiB0aGUgZ2l2ZW4gZG9tYWluIG5hbWUgb3Jcblx0XHQgKiBlbWFpbCBhZGRyZXNzLlxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIHRvQVNDSUkoaW5wdXQpIHtcblx0XHRcdHJldHVybiBtYXBEb21haW4oaW5wdXQsIGZ1bmN0aW9uKHN0cmluZykge1xuXHRcdFx0XHRyZXR1cm4gcmVnZXhOb25BU0NJSS50ZXN0KHN0cmluZylcblx0XHRcdFx0XHQ/ICd4bi0tJyArIGVuY29kZShzdHJpbmcpXG5cdFx0XHRcdFx0OiBzdHJpbmc7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXHRcblx0XHQvKiogRGVmaW5lIHRoZSBwdWJsaWMgQVBJICovXG5cdFx0cHVueWNvZGUgPSB7XG5cdFx0XHQvKipcblx0XHRcdCAqIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgY3VycmVudCBQdW55Y29kZS5qcyB2ZXJzaW9uIG51bWJlci5cblx0XHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdFx0ICogQHR5cGUgU3RyaW5nXG5cdFx0XHQgKi9cblx0XHRcdCd2ZXJzaW9uJzogJzEuMy4yJyxcblx0XHRcdC8qKlxuXHRcdFx0ICogQW4gb2JqZWN0IG9mIG1ldGhvZHMgdG8gY29udmVydCBmcm9tIEphdmFTY3JpcHQncyBpbnRlcm5hbCBjaGFyYWN0ZXJcblx0XHRcdCAqIHJlcHJlc2VudGF0aW9uIChVQ1MtMikgdG8gVW5pY29kZSBjb2RlIHBvaW50cywgYW5kIGJhY2suXG5cdFx0XHQgKiBAc2VlIDxodHRwczovL21hdGhpYXNieW5lbnMuYmUvbm90ZXMvamF2YXNjcmlwdC1lbmNvZGluZz5cblx0XHRcdCAqIEBtZW1iZXJPZiBwdW55Y29kZVxuXHRcdFx0ICogQHR5cGUgT2JqZWN0XG5cdFx0XHQgKi9cblx0XHRcdCd1Y3MyJzoge1xuXHRcdFx0XHQnZGVjb2RlJzogdWNzMmRlY29kZSxcblx0XHRcdFx0J2VuY29kZSc6IHVjczJlbmNvZGVcblx0XHRcdH0sXG5cdFx0XHQnZGVjb2RlJzogZGVjb2RlLFxuXHRcdFx0J2VuY29kZSc6IGVuY29kZSxcblx0XHRcdCd0b0FTQ0lJJzogdG9BU0NJSSxcblx0XHRcdCd0b1VuaWNvZGUnOiB0b1VuaWNvZGVcblx0XHR9O1xuXHRcblx0XHQvKiogRXhwb3NlIGBwdW55Y29kZWAgKi9cblx0XHQvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcblx0XHQvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG5cdFx0aWYgKFxuXHRcdFx0dHJ1ZVxuXHRcdCkge1xuXHRcdFx0IShfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gcHVueWNvZGU7XG5cdFx0XHR9LmNhbGwoZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXywgZXhwb3J0cywgbW9kdWxlKSwgX19XRUJQQUNLX0FNRF9ERUZJTkVfUkVTVUxUX18gIT09IHVuZGVmaW5lZCAmJiAobW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfQU1EX0RFRklORV9SRVNVTFRfXykpO1xuXHRcdH0gZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSkge1xuXHRcdFx0aWYgKG1vZHVsZS5leHBvcnRzID09IGZyZWVFeHBvcnRzKSB7IC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG5cdFx0XHRcdGZyZWVNb2R1bGUuZXhwb3J0cyA9IHB1bnljb2RlO1xuXHRcdFx0fSBlbHNlIHsgLy8gaW4gTmFyd2hhbCBvciBSaW5nb0pTIHYwLjcuMC1cblx0XHRcdFx0Zm9yIChrZXkgaW4gcHVueWNvZGUpIHtcblx0XHRcdFx0XHRwdW55Y29kZS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gcHVueWNvZGVba2V5XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2UgeyAvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG5cdFx0XHRyb290LnB1bnljb2RlID0gcHVueWNvZGU7XG5cdFx0fVxuXHRcblx0fSh0aGlzKSk7XG5cdFxuXHQvKiBXRUJQQUNLIFZBUiBJTkpFQ1RJT04gKi99LmNhbGwoZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXygxMikobW9kdWxlKSwgKGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSgpKSkpXG5cbi8qKiovIH0sXG4vKiAxMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0XHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XG5cdFx0XHRtb2R1bGUucGF0aHMgPSBbXTtcblx0XHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdFx0bW9kdWxlLmNoaWxkcmVuID0gW107XG5cdFx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0XHR9XG5cdFx0cmV0dXJuIG1vZHVsZTtcblx0fVxuXG5cbi8qKiovIH0sXG4vKiAxMyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXHRcblx0ZXhwb3J0cy5kZWNvZGUgPSBleHBvcnRzLnBhcnNlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNCk7XG5cdGV4cG9ydHMuZW5jb2RlID0gZXhwb3J0cy5zdHJpbmdpZnkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE1KTtcblxuXG4vKioqLyB9LFxuLyogMTQgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdC8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuXHQvL1xuXHQvLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuXHQvLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG5cdC8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuXHQvLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG5cdC8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcblx0Ly8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG5cdC8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXHQvL1xuXHQvLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuXHQvLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblx0Ly9cblx0Ly8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuXHQvLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG5cdC8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cblx0Ly8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG5cdC8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuXHQvLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG5cdC8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cdFxuXHQndXNlIHN0cmljdCc7XG5cdFxuXHQvLyBJZiBvYmouaGFzT3duUHJvcGVydHkgaGFzIGJlZW4gb3ZlcnJpZGRlbiwgdGhlbiBjYWxsaW5nXG5cdC8vIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSB3aWxsIGJyZWFrLlxuXHQvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuXHRmdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcblx0ICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG5cdH1cblx0XG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocXMsIHNlcCwgZXEsIG9wdGlvbnMpIHtcblx0ICBzZXAgPSBzZXAgfHwgJyYnO1xuXHQgIGVxID0gZXEgfHwgJz0nO1xuXHQgIHZhciBvYmogPSB7fTtcblx0XG5cdCAgaWYgKHR5cGVvZiBxcyAhPT0gJ3N0cmluZycgfHwgcXMubGVuZ3RoID09PSAwKSB7XG5cdCAgICByZXR1cm4gb2JqO1xuXHQgIH1cblx0XG5cdCAgdmFyIHJlZ2V4cCA9IC9cXCsvZztcblx0ICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cdFxuXHQgIHZhciBtYXhLZXlzID0gMTAwMDtcblx0ICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuXHQgICAgbWF4S2V5cyA9IG9wdGlvbnMubWF4S2V5cztcblx0ICB9XG5cdFxuXHQgIHZhciBsZW4gPSBxcy5sZW5ndGg7XG5cdCAgLy8gbWF4S2V5cyA8PSAwIG1lYW5zIHRoYXQgd2Ugc2hvdWxkIG5vdCBsaW1pdCBrZXlzIGNvdW50XG5cdCAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcblx0ICAgIGxlbiA9IG1heEtleXM7XG5cdCAgfVxuXHRcblx0ICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG5cdCAgICB2YXIgeCA9IHFzW2ldLnJlcGxhY2UocmVnZXhwLCAnJTIwJyksXG5cdCAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcblx0ICAgICAgICBrc3RyLCB2c3RyLCBrLCB2O1xuXHRcblx0ICAgIGlmIChpZHggPj0gMCkge1xuXHQgICAgICBrc3RyID0geC5zdWJzdHIoMCwgaWR4KTtcblx0ICAgICAgdnN0ciA9IHguc3Vic3RyKGlkeCArIDEpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAga3N0ciA9IHg7XG5cdCAgICAgIHZzdHIgPSAnJztcblx0ICAgIH1cblx0XG5cdCAgICBrID0gZGVjb2RlVVJJQ29tcG9uZW50KGtzdHIpO1xuXHQgICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblx0XG5cdCAgICBpZiAoIWhhc093blByb3BlcnR5KG9iaiwgaykpIHtcblx0ICAgICAgb2JqW2tdID0gdjtcblx0ICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmpba10pKSB7XG5cdCAgICAgIG9ialtrXS5wdXNoKHYpO1xuXHQgICAgfSBlbHNlIHtcblx0ICAgICAgb2JqW2tdID0gW29ialtrXSwgdl07XG5cdCAgICB9XG5cdCAgfVxuXHRcblx0ICByZXR1cm4gb2JqO1xuXHR9O1xuXG5cbi8qKiovIH0sXG4vKiAxNSAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0Ly8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG5cdC8vXG5cdC8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG5cdC8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcblx0Ly8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG5cdC8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcblx0Ly8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuXHQvLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcblx0Ly8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cdC8vXG5cdC8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG5cdC8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXHQvL1xuXHQvLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG5cdC8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcblx0Ly8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuXHQvLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcblx0Ly8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG5cdC8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcblx0Ly8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblx0XG5cdCd1c2Ugc3RyaWN0Jztcblx0XG5cdHZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG5cdCAgc3dpdGNoICh0eXBlb2Ygdikge1xuXHQgICAgY2FzZSAnc3RyaW5nJzpcblx0ICAgICAgcmV0dXJuIHY7XG5cdFxuXHQgICAgY2FzZSAnYm9vbGVhbic6XG5cdCAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblx0XG5cdCAgICBjYXNlICdudW1iZXInOlxuXHQgICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cdFxuXHQgICAgZGVmYXVsdDpcblx0ICAgICAgcmV0dXJuICcnO1xuXHQgIH1cblx0fTtcblx0XG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqLCBzZXAsIGVxLCBuYW1lKSB7XG5cdCAgc2VwID0gc2VwIHx8ICcmJztcblx0ICBlcSA9IGVxIHx8ICc9Jztcblx0ICBpZiAob2JqID09PSBudWxsKSB7XG5cdCAgICBvYmogPSB1bmRlZmluZWQ7XG5cdCAgfVxuXHRcblx0ICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcblx0ICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChmdW5jdGlvbihrKSB7XG5cdCAgICAgIHZhciBrcyA9IGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUoaykpICsgZXE7XG5cdCAgICAgIGlmIChBcnJheS5pc0FycmF5KG9ialtrXSkpIHtcblx0ICAgICAgICByZXR1cm4gb2JqW2tdLm1hcChmdW5jdGlvbih2KSB7XG5cdCAgICAgICAgICByZXR1cm4ga3MgKyBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKHYpKTtcblx0ICAgICAgICB9KS5qb2luKHNlcCk7XG5cdCAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmpba10pKTtcblx0ICAgICAgfVxuXHQgICAgfSkuam9pbihzZXApO1xuXHRcblx0ICB9XG5cdFxuXHQgIGlmICghbmFtZSkgcmV0dXJuICcnO1xuXHQgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKG5hbWUpKSArIGVxICtcblx0ICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcblx0fTtcblxuXG4vKioqLyB9LFxuLyogMTYgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXHRcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblx0XG5cdHZhciBfVXRpbHNXaW5kb3cgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE3KTtcblx0XG5cdHZhciBfVXRpbHNXaW5kb3cyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNXaW5kb3cpO1xuXHRcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblx0XG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cdFxuXHQvKipcblx0ICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBkb2N1bWVudFxuXHQgKi9cblx0dmFyIERvY3VtZW50ID0gZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gRG9jdW1lbnQoKSB7XG5cdCAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERvY3VtZW50KTtcblx0ICAgIH1cblx0XG5cdCAgICAvKipcblx0ICAgICAqIEdldCBkb2N1bWVudCBoZWlnaHRcblx0ICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAgICAgKi9cblx0ICAgIERvY3VtZW50LmdldEhlaWdodCA9IGZ1bmN0aW9uIGdldEhlaWdodCgpIHtcblx0ICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cdFxuXHQgICAgICAgIGlmIChfVXRpbHNXaW5kb3cyLmRlZmF1bHQuaXNXaW5kb3cob2JqV2luZG93KSkge1xuXHQgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgob2JqV2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0LCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCk7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgZG9jdW1lbnQgd2lkdGhcblx0ICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgRG9jdW1lbnQuZ2V0V2lkdGggPSBmdW5jdGlvbiBnZXRXaWR0aCgpIHtcblx0ICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cdFxuXHQgICAgICAgIGlmIChfVXRpbHNXaW5kb3cyLmRlZmF1bHQuaXNXaW5kb3cob2JqV2luZG93KSkge1xuXHQgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgob2JqV2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGgsIG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGgsIG9ialdpbmRvdy5kb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoLCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldFdpZHRoLCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCwgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCk7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgZG9jdW1lbnQgdG9wIHNjcm9sbFxuXHQgICAgICogQHBhcmFtIG9ialdpbmRvd1xuXHQgICAgICogQHJldHVybiB7bnVtYmVyfVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIERvY3VtZW50LmdldFNjcm9sbFRvcCA9IGZ1bmN0aW9uIGdldFNjcm9sbFRvcCgpIHtcblx0ICAgICAgICB2YXIgb2JqV2luZG93ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB3aW5kb3c7XG5cdFxuXHQgICAgICAgIGlmIChfVXRpbHNXaW5kb3cyLmRlZmF1bHQuaXNXaW5kb3cob2JqV2luZG93KSkge1xuXHQgICAgICAgICAgICByZXR1cm4gb2JqV2luZG93LnBhZ2VZT2Zmc2V0IHx8IG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgb2JqV2luZG93LmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkgJiYgb2JqV2luZG93LmRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBOYU47XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIC8qKlxuXHQgICAgICogR2V0IGRvY3VtZW50IGxlZnQgc2Nyb2xsXG5cdCAgICAgKiBAcGFyYW0gb2JqV2luZG93XG5cdCAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgRG9jdW1lbnQuZ2V0U2Nyb2xsTGVmdCA9IGZ1bmN0aW9uIGdldFNjcm9sbExlZnQoKSB7XG5cdCAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXHRcblx0ICAgICAgICBpZiAoX1V0aWxzV2luZG93Mi5kZWZhdWx0LmlzV2luZG93KG9ialdpbmRvdykpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG9ialdpbmRvdy5wYWdlWE9mZnNldCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keSAmJiBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0O1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBOYU47XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIC8qKlxuXHQgICAgICogR2V0IGRvY3VtZW50IHNjcm9sbHNcblx0ICAgICAqIEBwYXJhbSBvYmpXaW5kb3dcblx0ICAgICAqIEByZXR1cm4ge3tsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyfX1cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBEb2N1bWVudC5nZXRTY3JvbGwgPSBmdW5jdGlvbiBnZXRTY3JvbGwoKSB7XG5cdCAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXHRcblx0ICAgICAgICBpZiAoX1V0aWxzV2luZG93Mi5kZWZhdWx0LmlzV2luZG93KG9ialdpbmRvdykpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgICAgIGxlZnQ6IERvY3VtZW50LmdldFNjcm9sbExlZnQob2JqV2luZG93KSxcblx0ICAgICAgICAgICAgICAgIHRvcDogRG9jdW1lbnQuZ2V0U2Nyb2xsVG9wKG9ialdpbmRvdylcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICAgICAgbGVmdDogTmFOLFxuXHQgICAgICAgICAgICAgICAgdG9wOiBOYU5cblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHRcblx0ICAgIHJldHVybiBEb2N1bWVudDtcblx0fSgpO1xuXHRcblx0ZXhwb3J0cy5kZWZhdWx0ID0gRG9jdW1lbnQ7XG5cbi8qKiovIH0sXG4vKiAxNyAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdC8qKlxuXHQgKiBDbGFzcyBmb3Igd29ya2luZyB3aXRoIHdpbmRvd1xuXHQgKi9cblx0XG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cdFxuXHR2YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cdFxuXHRmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXHRcblx0dmFyIFdpbmRvdyA9IGZ1bmN0aW9uICgpIHtcblx0ICAgIGZ1bmN0aW9uIFdpbmRvdygpIHtcblx0ICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgV2luZG93KTtcblx0ICAgIH1cblx0XG5cdCAgICAvKipcblx0ICAgICAqIENoZWNrIGlmIGl0IGlzIHdpbmRvd1xuXHQgICAgICogQHBhcmFtIG9ialdpbmRvd1xuXHQgICAgICogQHJldHVybiB7Ym9vbGVhbn1cblx0ICAgICAqL1xuXHQgICAgV2luZG93LmlzV2luZG93ID0gZnVuY3Rpb24gaXNXaW5kb3cob2JqV2luZG93KSB7XG5cdCAgICAgICAgcmV0dXJuIG9ialdpbmRvdyAmJiAodHlwZW9mIG9ialdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9ialdpbmRvdykpID09PSBcIm9iamVjdFwiICYmIG9ialdpbmRvdy5kb2N1bWVudCAmJiBfdHlwZW9mKG9ialdpbmRvdy5kb2N1bWVudCkgPT09IFwib2JqZWN0XCI7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgd2luZG93IGhlaWdodFxuXHQgICAgICogQHBhcmFtIG9ialdpbmRvd1xuXHQgICAgICogQHJldHVybiB7bnVtYmVyfVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIFdpbmRvdy5nZXRIZWlnaHQgPSBmdW5jdGlvbiBnZXRIZWlnaHQoKSB7XG5cdCAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXHRcblx0ICAgICAgICBpZiAoV2luZG93LmlzV2luZG93KG9ialdpbmRvdykpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG9ialdpbmRvdy5pbm5lckhlaWdodCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCBvYmpXaW5kb3cuZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgd2luZG93IHdpZHRoXG5cdCAgICAgKiBAcGFyYW0gb2JqV2luZG93XG5cdCAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgV2luZG93LmdldFdpZHRoID0gZnVuY3Rpb24gZ2V0V2lkdGgoKSB7XG5cdCAgICAgICAgdmFyIG9ialdpbmRvdyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDogd2luZG93O1xuXHRcblx0ICAgICAgICBpZiAoV2luZG93LmlzV2luZG93KG9ialdpbmRvdykpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG9ialdpbmRvdy5pbm5lcldpZHRoIHx8IG9ialdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgb2JqV2luZG93LmRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIE5hTjtcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgd2luZG93IHNpemVzXG5cdCAgICAgKiBAcmV0dXJuIHt7aGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXJ9fVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIFdpbmRvdy5nZXRTaXplcyA9IGZ1bmN0aW9uIGdldFNpemVzKCkge1xuXHQgICAgICAgIHZhciBvYmpXaW5kb3cgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHdpbmRvdztcblx0XG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgaGVpZ2h0OiBXaW5kb3cuZ2V0SGVpZ2h0KG9ialdpbmRvdyksXG5cdCAgICAgICAgICAgIHdpZHRoOiBXaW5kb3cuZ2V0V2lkdGgob2JqV2luZG93KVxuXHQgICAgICAgIH07XG5cdCAgICB9O1xuXHRcblx0ICAgIHJldHVybiBXaW5kb3c7XG5cdH0oKTtcblx0XG5cdGV4cG9ydHMuZGVmYXVsdCA9IFdpbmRvdztcblxuLyoqKi8gfSxcbi8qIDE4ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblx0XG5cdGV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cdFxuXHR2YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cdFxuXHR2YXIgX1V0aWxzID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcblx0XG5cdHZhciBfVXRpbHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHMpO1xuXHRcblx0ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblx0XG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cdFxuXHQvKipcblx0ICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBET01cblx0ICovXG5cdHZhciBET00gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBET00oKSB7XG5cdCAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERPTSk7XG5cdCAgICB9XG5cdFxuXHQgICAgLyoqXG5cdCAgICAgKiBDaGVjayBpZiB2YXJpYWJsZSBpcyBkb20gZG9jdW1lbnRcblx0ICAgICAqIEBwYXJhbSBkb21Eb2N1bWVudFxuXHQgICAgICogQHJldHVybiB7Ym9vbGVhbn1cblx0ICAgICAqL1xuXHQgICAgRE9NLmlzRE9NRG9jdW1lbnQgPSBmdW5jdGlvbiBpc0RPTURvY3VtZW50KGRvbURvY3VtZW50KSB7XG5cdCAgICAgICAgcmV0dXJuICEoIWRvbURvY3VtZW50IHx8IHR5cGVvZiBkb21Eb2N1bWVudCA9PT0gXCJib29sZWFuXCIgfHwgdHlwZW9mIGRvbURvY3VtZW50ID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiBkb21Eb2N1bWVudCA9PT0gXCJzdHJpbmdcIiB8fCBkb21Eb2N1bWVudC5ub2RlVHlwZSAhPT0gOSk7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBGaW5kIGFuZCB2YWxpZGF0ZSBOb2RlIGluIERPTSBEb2N1bWVudFxuXHQgICAgICogQHBhcmFtIGRvbU5vZGVcblx0ICAgICAqIEBwYXJhbSBkb21Eb2N1bWVudFxuXHQgICAgICogQHJldHVybiB7RWxlbWVudCB8IGJvb2xlYW59XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgRE9NLmdldERPTU5vZGUgPSBmdW5jdGlvbiBnZXRET01Ob2RlKGRvbU5vZGUpIHtcblx0ICAgICAgICB2YXIgZG9tRG9jdW1lbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGRvY3VtZW50O1xuXHRcblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDaGVjayBpZiBkb21Eb2N1bWVudCBpcyBhIHZhbGlkIHZhcmlhYmxlXG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaWYgKCFET00uaXNET01Eb2N1bWVudChkb21Eb2N1bWVudCkpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBDaGVjayBpZiBkb21Ob2RlIGlzIGEgdmFsaWQgdmFyaWFibGVcblx0ICAgICAgICAgKi9cblx0ICAgICAgICBpZiAoIWRvbU5vZGUgfHwgdHlwZW9mIGRvbU5vZGUgPT09IFwiYm9vbGVhblwiIHx8IHR5cGVvZiBkb21Ob2RlID09PSBcIm51bWJlclwiIHx8IHR5cGVvZiBkb21Ob2RlID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgICAgICB9XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSWYgZG9tTm9kZSBpcyBhIHN0cmluZyBpdCBtaWdodCBiZSBhbiBJRFxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGlmICh0eXBlb2YgZG9tTm9kZSA9PT0gXCJzdHJpbmdcIikge1xuXHQgICAgICAgICAgICBkb21Ob2RlID0gZG9tRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZG9tTm9kZSk7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIC8qKlxuXHQgICAgICAgICAqIENoZWNrIGlmIGRvbU5vZGUgaXMgYSB2YWxpZCB2YXJpYWJsZVxuXHQgICAgICAgICAqL1xuXHQgICAgICAgIGlmICghZG9tTm9kZSB8fCBkb21Ob2RlLm5vZGVUeXBlICE9PSAxIHx8ICFkb21Ob2RlLnBhcmVudE5vZGUgfHwgZG9tTm9kZS5wYXJlbnROb2RlLm5vZGVOYW1lID09PSBcIkhUTUxcIiB8fCAhZG9tRG9jdW1lbnQuY29udGFpbnMoZG9tTm9kZSkpIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gZG9tTm9kZTtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIEdldCBlbGVtZW50IHNpemVzIGFuZCBwb3NpdGlvblxuXHQgICAgICogQHBhcmFtIGRvbU5vZGVcblx0ICAgICAqIEBwYXJhbSBkb21Eb2N1bWVudFxuXHQgICAgICogQHBhcmFtIHNob3dGb3JjZVxuXHQgICAgICogQHJldHVybiB7e2JvdHRvbTogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgbGVmdDogbnVtYmVyLCByaWdodDogbnVtYmVyLCB0b3A6IG51bWJlciwgd2lkdGg6IG51bWJlcn19XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgRE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdCA9IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChkb21Ob2RlKSB7XG5cdCAgICAgICAgdmFyIGRvbURvY3VtZW50ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiBkb2N1bWVudDtcblx0ICAgICAgICB2YXIgc2hvd0ZvcmNlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcblx0XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogQ3JlYXRlIHJlc3VsdCBzaXplIGFuZCBwb3NpdGlvbiBvYmplY3Rcblx0ICAgICAgICAgKi9cblx0ICAgICAgICB2YXIgb2JqUmV0ID0ge1xuXHQgICAgICAgICAgICBib3R0b206IDAsXG5cdCAgICAgICAgICAgIGhlaWdodDogMCxcblx0ICAgICAgICAgICAgbGVmdDogMCxcblx0ICAgICAgICAgICAgcmlnaHQ6IDAsXG5cdCAgICAgICAgICAgIHRvcDogMCxcblx0ICAgICAgICAgICAgd2lkdGg6IDBcblx0ICAgICAgICB9O1xuXHQgICAgICAgIGRvbU5vZGUgPSBET00uZ2V0RE9NTm9kZShkb21Ob2RlLCBkb21Eb2N1bWVudCk7XG5cdCAgICAgICAgaWYgKCFkb21Ob2RlKSB7XG5cdCAgICAgICAgICAgIF9VdGlsczIuZGVmYXVsdC53YXJuKFwiVXRpbHMuRE9NLmdldEJvdW5kaW5nQ2xpZW50UmVjdDogRE9NIGVsZW1lbnQgZG9lc24ndCBleGlzdCBpbiB0aGF0IERPTSBEb2N1bWVudFwiKTtcblx0ICAgICAgICAgICAgcmV0dXJuIG9ialJldDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgc2hvd0ZvcmNlID0gISFzaG93Rm9yY2U7XG5cdCAgICAgICAgdmFyIHN0eWxlcyA9IHZvaWQgMDtcblx0ICAgICAgICBpZiAoc2hvd0ZvcmNlKSB7XG5cdCAgICAgICAgICAgIHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZG9tTm9kZSk7XG5cdCAgICAgICAgICAgIGlmIChzdHlsZXMgJiYgc3R5bGVzLmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XG5cdCAgICAgICAgICAgICAgICBkb21Ob2RlLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICB9XG5cdCAgICAgICAgLyoqXG5cdCAgICAgICAgICogSWYgZGVmYXVsdCBtZXRob2QgaXMgc3VwcG9ydGVkIHRoYW4gdXNlIGl0XG5cdCAgICAgICAgICovXG5cdCAgICAgICAgaWYgKGRvbU5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG5cdCAgICAgICAgICAgIG9ialJldCA9IGRvbU5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdCAgICAgICAgICAgIC8qKlxuXHQgICAgICAgICAgICAgKiBJRSBoYWNrXG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBvYmpSZXQgPSB7XG5cdCAgICAgICAgICAgICAgICBib3R0b206IG9ialJldC5ib3R0b20sXG5cdCAgICAgICAgICAgICAgICBoZWlnaHQ6IG9ialJldC5oZWlnaHQgfHwgZG9tTm9kZS5jbGllbnRIZWlnaHQsXG5cdCAgICAgICAgICAgICAgICBsZWZ0OiBvYmpSZXQubGVmdCxcblx0ICAgICAgICAgICAgICAgIHJpZ2h0OiBvYmpSZXQucmlnaHQsXG5cdCAgICAgICAgICAgICAgICB0b3A6IG9ialJldC50b3AsXG5cdCAgICAgICAgICAgICAgICB3aWR0aDogb2JqUmV0LndpZHRoIHx8IGRvbU5vZGUuY2xpZW50V2lkdGhcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAvKipcblx0ICAgICAgICAgICAgICogV3JpdGUgdGhlIGVsZW1lbnQgaW4gYSB0ZW1wb3JhcnkgdmFyaWFibGVcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIHZhciBkb21FbGVtZW50ID0gZG9tTm9kZTtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIENhbGN1bGF0ZWQgYmFzaWMgcGFyYW1ldGVycyBvZiB0aGUgZWxlbWVudFxuXHQgICAgICAgICAgICAgKiBAdHlwZSB7T2JqZWN0fVxuXHQgICAgICAgICAgICAgKi9cblx0ICAgICAgICAgICAgdmFyIG9iakNvb3JkaW5hdGVzID0ge1xuXHQgICAgICAgICAgICAgICAgaGVpZ2h0OiBkb21FbGVtZW50Lm9mZnNldEhlaWdodCxcblx0ICAgICAgICAgICAgICAgIHdpZHRoOiBkb21FbGVtZW50Lm9mZnNldFdpZHRoLFxuXHQgICAgICAgICAgICAgICAgeDogMCxcblx0ICAgICAgICAgICAgICAgIHk6IDBcblx0ICAgICAgICAgICAgfTtcblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqIEFyZSBwYXNzZWQgb24gdG8gYWxsIHBhcmVudHMgYW5kIHRha2UgaW50byBhY2NvdW50IHRoZWlyIG9mZnNldHNcblx0ICAgICAgICAgICAgICovXG5cdCAgICAgICAgICAgIHdoaWxlIChkb21FbGVtZW50KSB7XG5cdCAgICAgICAgICAgICAgICBvYmpDb29yZGluYXRlcy54ICs9IGRvbUVsZW1lbnQub2Zmc2V0TGVmdDtcblx0ICAgICAgICAgICAgICAgIG9iakNvb3JkaW5hdGVzLnkgKz0gZG9tRWxlbWVudC5vZmZzZXRUb3A7XG5cdCAgICAgICAgICAgICAgICBkb21FbGVtZW50ID0gZG9tRWxlbWVudC5vZmZzZXRQYXJlbnQ7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgLyoqXG5cdCAgICAgICAgICAgICAqXG5cdCAgICAgICAgICAgICAqIEB0eXBlIHtPYmplY3R9XG5cdCAgICAgICAgICAgICAqL1xuXHQgICAgICAgICAgICBvYmpSZXQgPSB7XG5cdCAgICAgICAgICAgICAgICBib3R0b206IG9iakNvb3JkaW5hdGVzLnkgKyBvYmpDb29yZGluYXRlcy5oZWlnaHQsXG5cdCAgICAgICAgICAgICAgICBoZWlnaHQ6IG9iakNvb3JkaW5hdGVzLmhlaWdodCxcblx0ICAgICAgICAgICAgICAgIGxlZnQ6IG9iakNvb3JkaW5hdGVzLngsXG5cdCAgICAgICAgICAgICAgICByaWdodDogb2JqQ29vcmRpbmF0ZXMueCArIG9iakNvb3JkaW5hdGVzLndpZHRoLFxuXHQgICAgICAgICAgICAgICAgdG9wOiBvYmpDb29yZGluYXRlcy55LFxuXHQgICAgICAgICAgICAgICAgd2lkdGg6IG9iakNvb3JkaW5hdGVzLndpZHRoXG5cdCAgICAgICAgICAgIH07XG5cdCAgICAgICAgfVxuXHQgICAgICAgIGlmIChzaG93Rm9yY2UgJiYgZG9tTm9kZSkge1xuXHQgICAgICAgICAgICBkb21Ob2RlLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuXHQgICAgICAgIH1cblx0ICAgICAgICAvKipcblx0ICAgICAgICAgKiBSZXR1cm4gc2l6ZSBhbmQgcG9zaXRpb24gb2YgdGhlIGVsZW1lbnRcblx0ICAgICAgICAgKi9cblx0ICAgICAgICByZXR1cm4gb2JqUmV0O1xuXHQgICAgfTtcblx0XG5cdCAgICAvKipcblx0ICAgICAqIEZpbmQgZWxlbWVudCBwb3NpdGlvblxuXHQgICAgICogQHBhcmFtIGRvbU5vZGVcblx0ICAgICAqIEBwYXJhbSBkb21Eb2N1bWVudFxuXHQgICAgICogQHBhcmFtIHNob3dGb3JjZVxuXHQgICAgICogQHJldHVybiB7e3RvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9fVxuXHQgICAgICovXG5cdCAgICBET00uZmluZEVsZW1lbnRQb3NpdGlvbiA9IGZ1bmN0aW9uIGZpbmRFbGVtZW50UG9zaXRpb24oZG9tTm9kZSkge1xuXHQgICAgICAgIHZhciBkb21Eb2N1bWVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZG9jdW1lbnQ7XG5cdCAgICAgICAgdmFyIHNob3dGb3JjZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cdFxuXHQgICAgICAgIHZhciBvYmpSZXQgPSB7XG5cdCAgICAgICAgICAgIGxlZnQ6IDAsXG5cdCAgICAgICAgICAgIHRvcDogMFxuXHQgICAgICAgIH07XG5cdCAgICAgICAgZG9tTm9kZSA9IERPTS5nZXRET01Ob2RlKGRvbU5vZGUsIGRvbURvY3VtZW50KTtcblx0ICAgICAgICBpZiAoIWRvbU5vZGUpIHtcblx0ICAgICAgICAgICAgX1V0aWxzMi5kZWZhdWx0Lndhcm4oXCJVdGlscy5ET00uZmluZEVsZW1lbnRQb3NpdGlvbjogRE9NIGVsZW1lbnQgZG9lc24ndCBleGlzdCBpbiB0aGF0IERPTSBEb2N1bWVudFwiKTtcblx0ICAgICAgICAgICAgcmV0dXJuIG9ialJldDtcblx0ICAgICAgICB9XG5cdCAgICAgICAgc2hvd0ZvcmNlID0gISFzaG93Rm9yY2U7XG5cdCAgICAgICAgd2hpbGUgKGRvbU5vZGUpIHtcblx0ICAgICAgICAgICAgdmFyIHN0eWxlcyA9IHZvaWQgMDtcblx0ICAgICAgICAgICAgaWYgKHNob3dGb3JjZSkge1xuXHQgICAgICAgICAgICAgICAgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9tTm9kZSk7XG5cdCAgICAgICAgICAgICAgICBpZiAoc3R5bGVzICYmIHN0eWxlcy5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xuXHQgICAgICAgICAgICAgICAgICAgIGRvbU5vZGUuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBvYmpSZXQubGVmdCArPSBkb21Ob2RlLm9mZnNldExlZnQ7XG5cdCAgICAgICAgICAgIG9ialJldC50b3AgKz0gZG9tTm9kZS5vZmZzZXRUb3A7XG5cdCAgICAgICAgICAgIGRvbU5vZGUgPSBkb21Ob2RlLm9mZnNldFBhcmVudDtcblx0ICAgICAgICAgICAgaWYgKHNob3dGb3JjZSAmJiBkb21Ob2RlKSB7XG5cdCAgICAgICAgICAgICAgICBkb21Ob2RlLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHJldHVybiBvYmpSZXQ7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBBZGQgZXZlbnQgbGlzdGVuZXJcblx0ICAgICAqIEBwYXJhbSBvYmpcblx0ICAgICAqIEBwYXJhbSBuYW1lXG5cdCAgICAgKiBAcGFyYW0gZnVuY1xuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIERPTS5hZGRFdmVudCA9IGZ1bmN0aW9uIGFkZEV2ZW50KG9iaiwgbmFtZSwgZnVuYykge1xuXHQgICAgICAgIGlmIChvYmogJiYgKHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopKSA9PT0gXCJvYmplY3RcIiAmJiBvYmoubm9kZVR5cGUgPT09IDEgJiYgb2JqLnBhcmVudEVsZW1lbnQgJiYgb2JqLnBhcmVudEVsZW1lbnQubm9kZU5hbWUgIT09IFwiSFRNTFwiICYmIHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBmdW5jID09PSBcImZ1bmN0aW9uXCIpIHtcblx0ICAgICAgICAgICAgaWYgKG9iai5hZGRFdmVudExpc3RlbmVyKSB7XG5cdCAgICAgICAgICAgICAgICBvYmouYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jLCBmYWxzZSk7XG5cdCAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqLmF0dGFjaEV2ZW50KSB7XG5cdCAgICAgICAgICAgICAgICBvYmouYXR0YWNoRXZlbnQoXCJvblwiICsgbmFtZSwgZnVuYyk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIFJlbW92ZSBldmVudCBsaXN0ZW5lclxuXHQgICAgICogQHBhcmFtIG9ialxuXHQgICAgICogQHBhcmFtIG5hbWVcblx0ICAgICAqIEBwYXJhbSBmdW5jXG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgRE9NLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24gcmVtb3ZlRXZlbnQob2JqLCBuYW1lLCBmdW5jKSB7XG5cdCAgICAgICAgaWYgKG9iaiAmJiAodHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaikpID09PSBcIm9iamVjdFwiICYmIG9iai5ub2RlVHlwZSA9PT0gMSAmJiBvYmoucGFyZW50RWxlbWVudCAmJiBvYmoucGFyZW50RWxlbWVudC5ub2RlTmFtZSAhPT0gXCJIVE1MXCIgJiYgdHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGZ1bmMgPT09IFwiZnVuY3Rpb25cIikge1xuXHQgICAgICAgICAgICBpZiAob2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcblx0ICAgICAgICAgICAgICAgIG9iai5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmMsIGZhbHNlKTtcblx0ICAgICAgICAgICAgfSBlbHNlIGlmIChvYmouZGV0YWNoRXZlbnQpIHtcblx0ICAgICAgICAgICAgICAgIG9iai5kZXRhY2hFdmVudChcIm9uXCIgKyBuYW1lLCBmdW5jKTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIC8qKlxuXHQgICAgICogQ2hlY2sgaWYgZWxlbWVudCBoYXMgY2xhc3MgbmFtZVxuXHQgICAgICogQHBhcmFtIGVsZW1lbnRcblx0ICAgICAqIEBwYXJhbSBjbGFzc05hbWVcblx0ICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgRE9NLmhhc0NsYXNzTmFtZSA9IGZ1bmN0aW9uIGhhc0NsYXNzTmFtZShlbGVtZW50LCBjbGFzc05hbWUpIHtcblx0ICAgICAgICBpZiAoZWxlbWVudCAmJiAodHlwZW9mIGVsZW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihlbGVtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGNsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiBlbGVtZW50Lm5vZGVUeXBlID09PSAxICYmIGVsZW1lbnQucGFyZW50RWxlbWVudCAmJiBlbGVtZW50LnBhcmVudEVsZW1lbnQubm9kZU5hbWUgIT09IFwiSFRNTFwiKSB7XG5cdCAgICAgICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZS50cmltKCk7XG5cdCAgICAgICAgICAgIHJldHVybiAoXCIgXCIgKyBlbGVtZW50LmNsYXNzTmFtZSArIFwiIFwiKS5pbmRleE9mKFwiIFwiICsgY2xhc3NOYW1lICsgXCIgXCIpICE9PSAtMTtcblx0ICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIC8qKlxuXHQgICAgICogQWRkIGNsYXNzIG5hbWVcblx0ICAgICAqIEBwYXJhbSBlbGVtZW50XG5cdCAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG5cdCAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBET00uYWRkQ2xhc3NOYW1lID0gZnVuY3Rpb24gYWRkQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuXHQgICAgICAgIGlmIChlbGVtZW50ICYmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGVsZW1lbnQpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgY2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEgJiYgZWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIGVsZW1lbnQucGFyZW50RWxlbWVudC5ub2RlTmFtZSAhPT0gXCJIVE1MXCIpIHtcblx0ICAgICAgICAgICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lLnRyaW0oKTtcblx0ICAgICAgICAgICAgaWYgKCFET00uaGFzQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSkpIHtcblx0ICAgICAgICAgICAgICAgIHZhciBjbCA9IGVsZW1lbnQuY2xhc3NOYW1lO1xuXHQgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBjbCA/IGNsICsgXCIgXCIgKyBjbGFzc05hbWUgOiBjbGFzc05hbWU7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIC8qKlxuXHQgICAgICogUmVtb3ZlIGNsYXNzIG5hbWVcblx0ICAgICAqIEBwYXJhbSBlbGVtZW50XG5cdCAgICAgKiBAcGFyYW0gY2xhc3NOYW1lXG5cdCAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH1cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBET00ucmVtb3ZlQ2xhc3NOYW1lID0gZnVuY3Rpb24gcmVtb3ZlQ2xhc3NOYW1lKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuXHQgICAgICAgIGlmIChlbGVtZW50ICYmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGVsZW1lbnQpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgY2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEgJiYgZWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIGVsZW1lbnQucGFyZW50RWxlbWVudC5ub2RlTmFtZSAhPT0gXCJIVE1MXCIgJiYgdHlwZW9mIGVsZW1lbnQuY2xhc3NOYW1lID09PSBcInN0cmluZ1wiKSB7XG5cdCAgICAgICAgICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZS50cmltKCk7XG5cdCAgICAgICAgICAgIHZhciBjbGFzc2VzID0gZWxlbWVudC5jbGFzc05hbWUudHJpbSgpLnNwbGl0KFwiIFwiKTtcblx0ICAgICAgICAgICAgZm9yICh2YXIgaSA9IGNsYXNzZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcblx0ICAgICAgICAgICAgICAgIGNsYXNzZXNbaV0gPSBjbGFzc2VzW2ldLnRyaW0oKTtcblx0ICAgICAgICAgICAgICAgIGlmICghY2xhc3Nlc1tpXSB8fCBjbGFzc2VzW2ldID09PSBjbGFzc05hbWUpIHtcblx0ICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLnNwbGljZShpLCAxKTtcblx0ICAgICAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbihcIiBcIik7XG5cdCAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBudWxsO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIFRvZ2dsZSBjbGFzcyBuYW1lXG5cdCAgICAgKiBAcGFyYW0gZWxlbWVudFxuXHQgICAgICogQHBhcmFtIGNsYXNzTmFtZVxuXHQgICAgICogQHBhcmFtIHRvZ2dsZVxuXHQgICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgRE9NLnRvZ2dsZUNsYXNzTmFtZSA9IGZ1bmN0aW9uIHRvZ2dsZUNsYXNzTmFtZShlbGVtZW50LCBjbGFzc05hbWUsIHRvZ2dsZSkge1xuXHQgICAgICAgIGlmIChlbGVtZW50ICYmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGVsZW1lbnQpKSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgY2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiB0b2dnbGUgPT09IFwiYm9vbGVhblwiICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEgJiYgZWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIGVsZW1lbnQucGFyZW50RWxlbWVudC5ub2RlTmFtZSAhPT0gXCJIVE1MXCIpIHtcblx0ICAgICAgICAgICAgY2xhc3NOYW1lID0gY2xhc3NOYW1lLnRyaW0oKTtcblx0ICAgICAgICAgICAgaWYgKHRvZ2dsZSkge1xuXHQgICAgICAgICAgICAgICAgRE9NLmFkZENsYXNzTmFtZShlbGVtZW50LCBjbGFzc05hbWUpO1xuXHQgICAgICAgICAgICB9IGVsc2Uge1xuXHQgICAgICAgICAgICAgICAgRE9NLnJlbW92ZUNsYXNzTmFtZShlbGVtZW50LCBjbGFzc05hbWUpO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBudWxsO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIFJlcGxhY2UgY2xhc3MgbmFtZVxuXHQgICAgICogQHBhcmFtIGVsZW1lbnRcblx0ICAgICAqIEBwYXJhbSBvbGRDbGFzc05hbWVcblx0ICAgICAqIEBwYXJhbSBuZXdDbGFzc05hbWVcblx0ICAgICAqIEByZXR1cm4ge0hUTUxFbGVtZW50fVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIERPTS5yZXBsYWNlQ2xhc3MgPSBmdW5jdGlvbiByZXBsYWNlQ2xhc3MoZWxlbWVudCwgb2xkQ2xhc3NOYW1lLCBuZXdDbGFzc05hbWUpIHtcblx0ICAgICAgICBpZiAoZWxlbWVudCAmJiAodHlwZW9mIGVsZW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihlbGVtZW50KSkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG9sZENsYXNzTmFtZSA9PT0gXCJzdHJpbmdcIiAmJiB0eXBlb2YgbmV3Q2xhc3NOYW1lID09PSBcInN0cmluZ1wiICYmIGVsZW1lbnQubm9kZVR5cGUgPT09IDEgJiYgZWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIGVsZW1lbnQucGFyZW50RWxlbWVudC5ub2RlTmFtZSAhPT0gXCJIVE1MXCIpIHtcblx0ICAgICAgICAgICAgb2xkQ2xhc3NOYW1lID0gb2xkQ2xhc3NOYW1lLnRyaW0oKTtcblx0ICAgICAgICAgICAgbmV3Q2xhc3NOYW1lID0gbmV3Q2xhc3NOYW1lLnRyaW0oKTtcblx0ICAgICAgICAgICAgRE9NLnJlbW92ZUNsYXNzTmFtZShlbGVtZW50LCBvbGRDbGFzc05hbWUpO1xuXHQgICAgICAgICAgICBET00uYWRkQ2xhc3NOYW1lKGVsZW1lbnQsIG5ld0NsYXNzTmFtZSk7XG5cdCAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBudWxsO1xuXHQgICAgICAgIH1cblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIEdldCBlbGVtZW50IGJ5IHRhZyBuYW1lIGFuZCBpbmRleFxuXHQgICAgICogQHBhcmFtIHRuXG5cdCAgICAgKiBAcGFyYW0gZG9tRG9jdW1lbnRcblx0ICAgICAqIEBwYXJhbSBpbmRleFxuXHQgICAgICogQHJldHVybiB7Tm9kZX1cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBET00uZ2V0RWxlbWVudEJ5VGFnTmFtZSA9IGZ1bmN0aW9uIGdldEVsZW1lbnRCeVRhZ05hbWUodG4pIHtcblx0ICAgICAgICB2YXIgZG9tRG9jdW1lbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGRvY3VtZW50O1xuXHQgICAgICAgIHZhciBpbmRleCA9IGFyZ3VtZW50c1syXTtcblx0XG5cdCAgICAgICAgaWYgKHR5cGVvZiB0biA9PT0gXCJzdHJpbmdcIiAmJiBET00uaXNET01Eb2N1bWVudChkb21Eb2N1bWVudCkgJiYgdHlwZW9mIGluZGV4ID09PSBcIm51bWJlclwiKSB7XG5cdCAgICAgICAgICAgIHZhciBlbHMgPSBkb21Eb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0bik7XG5cdCAgICAgICAgICAgIHJldHVybiBlbHNbaW5kZXhdIHx8IG51bGw7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0ICAgIC8qKlxuXHQgICAgICogR2V0IGxpbmUgaGVpZ2h0XG5cdCAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgRE9NLmdldExpbmVIZWlnaHQgPSBmdW5jdGlvbiBnZXRMaW5lSGVpZ2h0KCkge1xuXHQgICAgICAgIHZhciBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpO1xuXHQgICAgICAgIHZhciBsaW5lSGVpZ2h0ID0gc3R5bGVzLmxpbmVIZWlnaHQ7XG5cdCAgICAgICAgdmFyIGxpbmVIZWlnaHREaWcgPSBwYXJzZUludChsaW5lSGVpZ2h0LCAxMCk7XG5cdCAgICAgICAgdmFyIGZvbnRTaXplID0gc3R5bGVzLmZvbnRTaXplO1xuXHQgICAgICAgIHZhciBmb250U2l6ZURpZyA9IHBhcnNlSW50KGZvbnRTaXplLCAxMCk7XG5cdCAgICAgICAgaWYgKGlzRmluaXRlKGxpbmVIZWlnaHREaWcpKSB7XG5cdCAgICAgICAgICAgIHJldHVybiBsaW5lSGVpZ2h0RGlnO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBmb250U2l6ZURpZztcblx0ICAgICAgICB9XG5cdCAgICB9O1xuXHRcblx0ICAgIHJldHVybiBET007XG5cdH0oKTtcblx0XG5cdGV4cG9ydHMuZGVmYXVsdCA9IERPTTtcblxuLyoqKi8gfSxcbi8qIDE5ICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblx0LyoqXG5cdCAqIEltcG9ydCBhZGRpdGlvbmFsIGNsYXNzZXNcblx0ICovXG5cdFxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRcblx0dmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXHRcblx0dmFyIF9VdGlsc0RPTSA9IF9fd2VicGFja19yZXF1aXJlX18oMTgpO1xuXHRcblx0dmFyIF9VdGlsc0RPTTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc0RPTSk7XG5cdFxuXHR2YXIgX1V0aWxzV2luZG93ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyk7XG5cdFxuXHR2YXIgX1V0aWxzV2luZG93MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzV2luZG93KTtcblx0XG5cdGZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cdFxuXHRmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXHRcblx0dmFyIE1vdXNlID0gZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gTW91c2UoKSB7XG5cdCAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIE1vdXNlKTtcblx0ICAgIH1cblx0XG5cdCAgICAvKipcblx0ICAgICAqIE5vcm1hbGlzZSBtb3VzZSBkZWx0YVxuXHQgICAgICogQHBhcmFtIGVcblx0ICAgICAqIEByZXR1cm4ge251bWJlcn1cblx0ICAgICAqL1xuXHQgICAgTW91c2UuZ2V0V2hlZWxEZWx0YSA9IGZ1bmN0aW9uIGdldFdoZWVsRGVsdGEoZSkge1xuXHQgICAgICAgIGlmIChlICYmICh0eXBlb2YgZSA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKGUpKSA9PT0gXCJvYmplY3RcIiAmJiAoXCJkZXRhaWxcIiBpbiBlIHx8IFwid2hlZWxEZWx0YVwiIGluIGUgfHwgXCJ3aGVlbERlbHRhWVwiIGluIGUgfHwgXCJ3aGVlbERlbHRhWFwiIGluIGUgfHwgXCJkZWx0YVlcIiBpbiBlIHx8IFwiZGVsdGFYXCIgaW4gZSB8fCBcImF4aXNcIiBpbiBlIHx8IFwiZGVsdGFNb2RlXCIgaW4gZSkpIHtcblx0ICAgICAgICAgICAgdmFyIGRlbHRhID0gdm9pZCAwO1xuXHQgICAgICAgICAgICB2YXIgZGVsdGFYID0gdm9pZCAwO1xuXHQgICAgICAgICAgICB2YXIgZGVsdGFZID0gdm9pZCAwO1xuXHQgICAgICAgICAgICAvLyBPbGQgc2Nob29sIHNjcm9sbHdoZWVsIGRlbHRhXG5cdCAgICAgICAgICAgIGlmIChcImRldGFpbFwiIGluIGUpIHtcblx0ICAgICAgICAgICAgICAgIGRlbHRhWSA9IGUuZGV0YWlsICogLTE7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKFwid2hlZWxEZWx0YVwiIGluIGUpIHtcblx0ICAgICAgICAgICAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YTtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBpZiAoXCJ3aGVlbERlbHRhWVwiIGluIGUpIHtcblx0ICAgICAgICAgICAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YVk7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgaWYgKFwid2hlZWxEZWx0YVhcIiBpbiBlKSB7XG5cdCAgICAgICAgICAgICAgICBkZWx0YVggPSBlLndoZWVsRGVsdGFYICogLTE7XG5cdCAgICAgICAgICAgIH1cblx0ICAgICAgICAgICAgLy8gRmlyZWZveCA8IDE3IGhvcml6b250YWwgc2Nyb2xsaW5nIHJlbGF0ZWQgdG8gRE9NTW91c2VTY3JvbGwgZXZlbnRcblx0ICAgICAgICAgICAgaWYgKFwiYXhpc1wiIGluIGUgJiYgZS5heGlzID09PSBlLkhPUklaT05UQUxfQVhJUykge1xuXHQgICAgICAgICAgICAgICAgZGVsdGFYID0gZGVsdGFZICogLTE7XG5cdCAgICAgICAgICAgICAgICBkZWx0YVkgPSAwO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIC8vIE5ldyBzY2hvb2wgd2hlZWwgZGVsdGEgKHdoZWVsIGV2ZW50KVxuXHQgICAgICAgICAgICBpZiAoXCJkZWx0YVlcIiBpbiBlKSB7XG5cdCAgICAgICAgICAgICAgICBkZWx0YVkgPSBlLmRlbHRhWSAqIC0xO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIGlmIChcImRlbHRhWFwiIGluIGUpIHtcblx0ICAgICAgICAgICAgICAgIGRlbHRhWCA9IGUuZGVsdGFYO1xuXHQgICAgICAgICAgICB9XG5cdCAgICAgICAgICAgIC8vIE5lZWQgdG8gY29udmVydCBsaW5lcyBhbmQgcGFnZXMgdG8gcGl4ZWxzIGlmIHdlIGFyZW5cInQgYWxyZWFkeSBpbiBwaXhlbHNcblx0ICAgICAgICAgICAgLy8gVGhlcmUgYXJlIHRocmVlIGRlbHRhIG1vZGVzOlxuXHQgICAgICAgICAgICAvLyAgICogZGVsdGFNb2RlIDAgaXMgYnkgcGl4ZWxzLCBub3RoaW5nIHRvIGRvXG5cdCAgICAgICAgICAgIC8vICAgKiBkZWx0YU1vZGUgMSBpcyBieSBsaW5lc1xuXHQgICAgICAgICAgICAvLyAgICogZGVsdGFNb2RlIDIgaXMgYnkgcGFnZXNcblx0ICAgICAgICAgICAgaWYgKGUuZGVsdGFNb2RlID09PSAxKSB7XG5cdCAgICAgICAgICAgICAgICB2YXIgbGluZUhlaWdodCA9IF9VdGlsc0RPTTIuZGVmYXVsdC5nZXRMaW5lSGVpZ2h0KCk7XG5cdCAgICAgICAgICAgICAgICBkZWx0YVkgPSBkZWx0YVkgKiBsaW5lSGVpZ2h0O1xuXHQgICAgICAgICAgICAgICAgZGVsdGFYID0gZGVsdGFYICogbGluZUhlaWdodDtcblx0ICAgICAgICAgICAgfSBlbHNlIGlmIChlLmRlbHRhTW9kZSA9PT0gMikge1xuXHQgICAgICAgICAgICAgICAgdmFyIHdpbmRvd2hlZ2lodCA9IF9VdGlsc1dpbmRvdzIuZGVmYXVsdC5nZXRIZWlnaHQoKTtcblx0ICAgICAgICAgICAgICAgIGRlbHRhWSA9IGRlbHRhWSAqIHdpbmRvd2hlZ2lodDtcblx0ICAgICAgICAgICAgICAgIGRlbHRhWCA9IGRlbHRhWCAqIHdpbmRvd2hlZ2lodDtcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgICAgICBkZWx0YSA9IGRlbHRhWSA9PT0gMCA/IGRlbHRhWCA6IGRlbHRhWTtcblx0ICAgICAgICAgICAgcmV0dXJuIGRlbHRhO1xuXHQgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgIHJldHVybiBOYU47XG5cdCAgICAgICAgfVxuXHQgICAgfTtcblx0XG5cdCAgICByZXR1cm4gTW91c2U7XG5cdH0oKTtcblx0XG5cdGV4cG9ydHMuZGVmYXVsdCA9IE1vdXNlO1xuXG4vKioqLyB9LFxuLyogMjAgKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXHQvKipcblx0ICogQ2xhc3MgZm9yIHdvcmtpbmcgd2l0aCBzY3JlZW5cblx0ICovXG5cdFxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRcblx0ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblx0XG5cdHZhciBTY3JlZW4gPSBmdW5jdGlvbiAoKSB7XG5cdCAgICBmdW5jdGlvbiBTY3JlZW4oKSB7XG5cdCAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNjcmVlbik7XG5cdCAgICB9XG5cdFxuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgc2NyZWVuIGluZm9cblx0ICAgICAqIEByZXR1cm4ge3thdmFpbGFibGVTaXplOiB7aGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXJ9LCBjb2xvckRlcHRoOiBudW1iZXIsIHBpeGVsUmF0aW86IG51bWJlciwgc2l6ZToge2hlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyfX19XG5cdCAgICAgKi9cblx0ICAgIFNjcmVlbi5nZXRJbmZvID0gZnVuY3Rpb24gZ2V0SW5mbygpIHtcblx0ICAgICAgICByZXR1cm4ge1xuXHQgICAgICAgICAgICBhdmFpbGFibGVTaXplOiBTY3JlZW4uZ2V0QXZhaWxhYmxlU2l6ZXMoKSxcblx0ICAgICAgICAgICAgY29sb3JEZXB0aDogU2NyZWVuLmdldENvbG9yRGVwdGgoKSxcblx0ICAgICAgICAgICAgcGl4ZWxSYXRpbzogU2NyZWVuLmdldFBpeGVsUmF0aW8oKSxcblx0ICAgICAgICAgICAgc2l6ZTogU2NyZWVuLmdldFNpemVzKClcblx0ICAgICAgICB9O1xuXHQgICAgfTtcblx0ICAgIC8qKlxuXHQgICAgICogR2V0IHNjcmVlbiBoZWlnaHRcblx0ICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgU2NyZWVuLmdldEhlaWdodCA9IGZ1bmN0aW9uIGdldEhlaWdodCgpIHtcblx0ICAgICAgICByZXR1cm4gc2NyZWVuLmhlaWdodDtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIEdldCBzY3JlZW4gd2lkdGhcblx0ICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgU2NyZWVuLmdldFdpZHRoID0gZnVuY3Rpb24gZ2V0V2lkdGgoKSB7XG5cdCAgICAgICAgcmV0dXJuIHNjcmVlbi53aWR0aDtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIEdldCBzY3JlZW4gc2l6ZXNcblx0ICAgICAqIEByZXR1cm4ge3toZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn19XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgU2NyZWVuLmdldFNpemVzID0gZnVuY3Rpb24gZ2V0U2l6ZXMoKSB7XG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgaGVpZ2h0OiBTY3JlZW4uZ2V0SGVpZ2h0KCksXG5cdCAgICAgICAgICAgIHdpZHRoOiBTY3JlZW4uZ2V0V2lkdGgoKVxuXHQgICAgICAgIH07XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgc2NyZWVuIGhlaWdodFxuXHQgICAgICogQHJldHVybnMge251bWJlcn1cblx0ICAgICAqL1xuXHRcblx0XG5cdCAgICBTY3JlZW4uZ2V0QXZhaWxhYmxlSGVpZ2h0ID0gZnVuY3Rpb24gZ2V0QXZhaWxhYmxlSGVpZ2h0KCkge1xuXHQgICAgICAgIHJldHVybiBzY3JlZW4uYXZhaWxIZWlnaHQ7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgc2NyZWVuIHdpZHRoXG5cdCAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIFNjcmVlbi5nZXRBdmFpbGFibGVXaWR0aCA9IGZ1bmN0aW9uIGdldEF2YWlsYWJsZVdpZHRoKCkge1xuXHQgICAgICAgIHJldHVybiBzY3JlZW4uYXZhaWxXaWR0aDtcblx0ICAgIH07XG5cdCAgICAvKipcblx0ICAgICAqIEdldCBzY3JlZW4gc2l6ZXNcblx0ICAgICAqIEByZXR1cm4ge3toZWlnaHQ6IG51bWJlciwgd2lkdGg6IG51bWJlcn19XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgU2NyZWVuLmdldEF2YWlsYWJsZVNpemVzID0gZnVuY3Rpb24gZ2V0QXZhaWxhYmxlU2l6ZXMoKSB7XG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgaGVpZ2h0OiBTY3JlZW4uZ2V0QXZhaWxhYmxlSGVpZ2h0KCksXG5cdCAgICAgICAgICAgIHdpZHRoOiBTY3JlZW4uZ2V0QXZhaWxhYmxlV2lkdGgoKVxuXHQgICAgICAgIH07XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgc2NyZWVuIHBpeGVsIHJhdGlvXG5cdCAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG5cdCAgICAgKi9cblx0XG5cdFxuXHQgICAgU2NyZWVuLmdldFBpeGVsUmF0aW8gPSBmdW5jdGlvbiBnZXRQaXhlbFJhdGlvKCkge1xuXHQgICAgICAgIHZhciByYXRpbyA9IDE7XG5cdCAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuc2NyZWVuLnN5c3RlbVhEUEkgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHdpbmRvdy5zY3JlZW4ubG9naWNhbFhEUEkgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LnNjcmVlbi5zeXN0ZW1YRFBJID4gd2luZG93LnNjcmVlbi5sb2dpY2FsWERQSSkge1xuXHQgICAgICAgICAgICByYXRpbyA9IHdpbmRvdy5zY3JlZW4uc3lzdGVtWERQSSAvIHdpbmRvdy5zY3JlZW4ubG9naWNhbFhEUEk7XG5cdCAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93LmRldmljZVBpeGVsUmF0aW8gIT09IFwidW5kZWZpbmVkXCIpIHtcblx0ICAgICAgICAgICAgcmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcblx0ICAgICAgICB9XG5cdCAgICAgICAgcmV0dXJuIHJhdGlvO1xuXHQgICAgfTtcblx0ICAgIC8qKlxuXHQgICAgICogR2V0IHNjcmVlbiBjb2xvciBkZXB0aFxuXHQgICAgICogQHJldHVybiB7bnVtYmVyfVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIFNjcmVlbi5nZXRDb2xvckRlcHRoID0gZnVuY3Rpb24gZ2V0Q29sb3JEZXB0aCgpIHtcblx0ICAgICAgICByZXR1cm4gc2NyZWVuLmNvbG9yRGVwdGg7XG5cdCAgICB9O1xuXHRcblx0ICAgIHJldHVybiBTY3JlZW47XG5cdH0oKTtcblx0XG5cdGV4cG9ydHMuZGVmYXVsdCA9IFNjcmVlbjtcblxuLyoqKi8gfSxcbi8qIDIxICovXG4vKioqLyBmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuXHRcInVzZSBzdHJpY3RcIjtcblx0LyoqXG5cdCAqIENsYXNzIGZvciB3b3JraW5nIHdpdGggc3lzdGVtXG5cdCAqL1xuXHRcblx0ZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblx0XG5cdGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cdFxuXHR2YXIgU3lzdGVtID0gZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gU3lzdGVtKCkge1xuXHQgICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTeXN0ZW0pO1xuXHQgICAgfVxuXHRcblx0ICAgIC8qKlxuXHQgICAgICogR2V0IHN5c3RlbSBpbmZvXG5cdCAgICAgKiBAcmV0dXJuIHt7bmFtZTogc3RyaW5nLCB2ZXJzaW9uOiBzdHJpbmd9fVxuXHQgICAgICovXG5cdCAgICBTeXN0ZW0uZ2V0SW5mbyA9IGZ1bmN0aW9uIGdldEluZm8oKSB7XG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgbmFtZTogU3lzdGVtLmdldE5hbWUoKSxcblx0ICAgICAgICAgICAgdmVyc2lvbjogU3lzdGVtLmdldFZlcnNpb24oKVxuXHQgICAgICAgIH07XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgT1MgbmFtZVxuXHQgICAgICogQHJldHVybiB7c3RyaW5nfVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIFN5c3RlbS5nZXROYW1lID0gZnVuY3Rpb24gZ2V0TmFtZSgpIHtcblx0ICAgICAgICB2YXIgb3MgPSBcIlwiO1xuXHQgICAgICAgIHZhciBjbGllbnRTdHJpbmdzID0gW3tcblx0ICAgICAgICAgICAgcjogLyhXaW5kb3dzIDEwLjB8V2luZG93cyBOVCAxMC4wKS8sXG5cdCAgICAgICAgICAgIHM6IFwiV2luZG93cyAxMFwiXG5cdCAgICAgICAgfSwge1xuXHQgICAgICAgICAgICByOiAvKFdpbmRvd3MgOC4xfFdpbmRvd3MgTlQgNi4zKS8sXG5cdCAgICAgICAgICAgIHM6IFwiV2luZG93cyA4LjFcIlxuXHQgICAgICAgIH0sIHtcblx0ICAgICAgICAgICAgcjogLyhXaW5kb3dzIDh8V2luZG93cyBOVCA2LjIpLyxcblx0ICAgICAgICAgICAgczogXCJXaW5kb3dzIDhcIlxuXHQgICAgICAgIH0sIHtcblx0ICAgICAgICAgICAgcjogLyhXaW5kb3dzIDd8V2luZG93cyBOVCA2LjEpLyxcblx0ICAgICAgICAgICAgczogXCJXaW5kb3dzIDdcIlxuXHQgICAgICAgIH0sIHtcblx0ICAgICAgICAgICAgcjogL1dpbmRvd3MgTlQgNi4wLyxcblx0ICAgICAgICAgICAgczogXCJXaW5kb3dzIFZpc3RhXCJcblx0ICAgICAgICB9LCB7XG5cdCAgICAgICAgICAgIHI6IC9XaW5kb3dzIE5UIDUuMi8sXG5cdCAgICAgICAgICAgIHM6IFwiV2luZG93cyBTZXJ2ZXIgMjAwM1wiXG5cdCAgICAgICAgfSwge1xuXHQgICAgICAgICAgICByOiAvKFdpbmRvd3MgTlQgNS4xfFdpbmRvd3MgWFApLyxcblx0ICAgICAgICAgICAgczogXCJXaW5kb3dzIFhQXCJcblx0ICAgICAgICB9LCB7XG5cdCAgICAgICAgICAgIHI6IC8oV2luZG93cyBOVCA1LjB8V2luZG93cyAyMDAwKS8sXG5cdCAgICAgICAgICAgIHM6IFwiV2luZG93cyAyMDAwXCJcblx0ICAgICAgICB9LCB7XG5cdCAgICAgICAgICAgIHI6IC8oV2luIDl4IDQuOTB8V2luZG93cyBNRSkvLFxuXHQgICAgICAgICAgICBzOiBcIldpbmRvd3MgTUVcIlxuXHQgICAgICAgIH0sIHtcblx0ICAgICAgICAgICAgcjogLyhXaW5kb3dzIDk4fFdpbjk4KS8sXG5cdCAgICAgICAgICAgIHM6IFwiV2luZG93cyA5OFwiXG5cdCAgICAgICAgfSwge1xuXHQgICAgICAgICAgICByOiAvKFdpbmRvd3MgOTV8V2luOTV8V2luZG93c185NSkvLFxuXHQgICAgICAgICAgICBzOiBcIldpbmRvd3MgOTVcIlxuXHQgICAgICAgIH0sIHtcblx0ICAgICAgICAgICAgcjogLyhXaW5kb3dzIE5UIDQuMHxXaW5OVDQuMHxXaW5OVHxXaW5kb3dzIE5UKS8sXG5cdCAgICAgICAgICAgIHM6IFwiV2luZG93cyBOVCA0LjBcIlxuXHQgICAgICAgIH0sIHtcblx0ICAgICAgICAgICAgcjogL1dpbmRvd3MgQ0UvLFxuXHQgICAgICAgICAgICBzOiBcIldpbmRvd3MgQ0VcIlxuXHQgICAgICAgIH0sIHtcblx0ICAgICAgICAgICAgcjogL1dpbjE2Lyxcblx0ICAgICAgICAgICAgczogXCJXaW5kb3dzIDMuMTFcIlxuXHQgICAgICAgIH0sIHtcblx0ICAgICAgICAgICAgcjogL0FuZHJvaWQvLFxuXHQgICAgICAgICAgICBzOiBcIkFuZHJvaWRcIlxuXHQgICAgICAgIH0sIHtcblx0ICAgICAgICAgICAgcjogL09wZW5CU0QvLFxuXHQgICAgICAgICAgICBzOiBcIk9wZW4gQlNEXCJcblx0ICAgICAgICB9LCB7XG5cdCAgICAgICAgICAgIHI6IC9TdW5PUy8sXG5cdCAgICAgICAgICAgIHM6IFwiU3VuIE9TXCJcblx0ICAgICAgICB9LCB7XG5cdCAgICAgICAgICAgIHI6IC8oTGludXh8WDExKS8sXG5cdCAgICAgICAgICAgIHM6IFwiTGludXhcIlxuXHQgICAgICAgIH0sIHtcblx0ICAgICAgICAgICAgcjogLyhpUGhvbmV8aVBhZHxpUG9kKS8sXG5cdCAgICAgICAgICAgIHM6IFwiaU9TXCJcblx0ICAgICAgICB9LCB7XG5cdCAgICAgICAgICAgIHI6IC9NYWMgT1MgWC8sXG5cdCAgICAgICAgICAgIHM6IFwiTWFjIE9TIFhcIlxuXHQgICAgICAgIH0sIHtcblx0ICAgICAgICAgICAgcjogLyhNYWNQUEN8TWFjSW50ZWx8TWFjX1Bvd2VyUEN8TWFjaW50b3NoKS8sXG5cdCAgICAgICAgICAgIHM6IFwiTWFjIE9TXCJcblx0ICAgICAgICB9LCB7XG5cdCAgICAgICAgICAgIHI6IC9RTlgvLFxuXHQgICAgICAgICAgICBzOiBcIlFOWFwiXG5cdCAgICAgICAgfSwge1xuXHQgICAgICAgICAgICByOiAvVU5JWC8sXG5cdCAgICAgICAgICAgIHM6IFwiVU5JWFwiXG5cdCAgICAgICAgfSwge1xuXHQgICAgICAgICAgICByOiAvQmVPUy8sXG5cdCAgICAgICAgICAgIHM6IFwiQmVPU1wiXG5cdCAgICAgICAgfSwge1xuXHQgICAgICAgICAgICByOiAvT1NcXC8yLyxcblx0ICAgICAgICAgICAgczogXCJPUy8yXCJcblx0ICAgICAgICB9LCB7XG5cdCAgICAgICAgICAgIHI6IC8obnVoa3xHb29nbGVib3R8WWFtbXlib3R8T3BlbmJvdHxTbHVycHxNU05Cb3R8QXNrIEplZXZlc1xcL1Rlb21hfGlhX2FyY2hpdmVyKS8sXG5cdCAgICAgICAgICAgIHM6IFwiU2VhcmNoIEJvdFwiXG5cdCAgICAgICAgfV07XG5cdCAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gY2xpZW50U3RyaW5ncywgX2lzQXJyYXkgPSBBcnJheS5pc0FycmF5KF9pdGVyYXRvciksIF9pID0gMCwgX2l0ZXJhdG9yID0gX2lzQXJyYXkgPyBfaXRlcmF0b3IgOiBfaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSgpOzspIHtcblx0ICAgICAgICAgICAgdmFyIF9yZWY7XG5cdFxuXHQgICAgICAgICAgICBpZiAoX2lzQXJyYXkpIHtcblx0ICAgICAgICAgICAgICAgIGlmIChfaSA+PSBfaXRlcmF0b3IubGVuZ3RoKSBicmVhaztcblx0ICAgICAgICAgICAgICAgIF9yZWYgPSBfaXRlcmF0b3JbX2krK107XG5cdCAgICAgICAgICAgIH0gZWxzZSB7XG5cdCAgICAgICAgICAgICAgICBfaSA9IF9pdGVyYXRvci5uZXh0KCk7XG5cdCAgICAgICAgICAgICAgICBpZiAoX2kuZG9uZSkgYnJlYWs7XG5cdCAgICAgICAgICAgICAgICBfcmVmID0gX2kudmFsdWU7XG5cdCAgICAgICAgICAgIH1cblx0XG5cdCAgICAgICAgICAgIHZhciBjcyA9IF9yZWY7XG5cdFxuXHQgICAgICAgICAgICBpZiAoY3Muci50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG5cdCAgICAgICAgICAgICAgICBvcyA9IGNzLnM7XG5cdCAgICAgICAgICAgICAgICBicmVhaztcblx0ICAgICAgICAgICAgfVxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gb3M7XG5cdCAgICB9O1xuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgT1MgdmVyc2lvblxuXHQgICAgICogQHJldHVybiB7c3RyaW5nfVxuXHQgICAgICovXG5cdFxuXHRcblx0ICAgIFN5c3RlbS5nZXRWZXJzaW9uID0gZnVuY3Rpb24gZ2V0VmVyc2lvbigpIHtcblx0ICAgICAgICB2YXIgb3MgPSBTeXN0ZW0uZ2V0TmFtZSgpO1xuXHQgICAgICAgIHZhciBvc1ZlcnNpb24gPSBcIlwiO1xuXHQgICAgICAgIGlmICgvV2luZG93cy8udGVzdChvcykpIHtcblx0ICAgICAgICAgICAgb3NWZXJzaW9uID0gL1dpbmRvd3MgKC4qKS8uZXhlYyhvcylbMV07XG5cdCAgICAgICAgICAgIG9zID0gXCJXaW5kb3dzXCI7XG5cdCAgICAgICAgfVxuXHQgICAgICAgIHN3aXRjaCAob3MpIHtcblx0ICAgICAgICAgICAgY2FzZSBcIk1hYyBPUyBYXCI6XG5cdCAgICAgICAgICAgICAgICBvc1ZlcnNpb24gPSAvTWFjIE9TIFggKDEwWy5fXFxkXSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpWzFdO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgXCJBbmRyb2lkXCI6XG5cdCAgICAgICAgICAgICAgICBvc1ZlcnNpb24gPSAvQW5kcm9pZCAoWy5fXFxkXSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpWzFdO1xuXHQgICAgICAgICAgICAgICAgYnJlYWs7XG5cdCAgICAgICAgICAgIGNhc2UgXCJpT1NcIjpcblx0ICAgICAgICAgICAgICAgIHZhciByZWcgPSAvT1MgKFxcZCspXyhcXGQrKV8/KFxcZCspPy8uZXhlYyhuYXZpZ2F0b3IuYXBwVmVyc2lvbik7XG5cdCAgICAgICAgICAgICAgICBvc1ZlcnNpb24gPSByZWdbMV0gKyBcIi5cIiArIHJlZ1syXSArIFwiLlwiICsgKHJlZ1szXSB8fCAwKTtcblx0ICAgICAgICAgICAgICAgIGJyZWFrO1xuXHQgICAgICAgICAgICBkZWZhdWx0OlxuXHQgICAgICAgIH1cblx0ICAgICAgICByZXR1cm4gb3NWZXJzaW9uO1xuXHQgICAgfTtcblx0XG5cdCAgICByZXR1cm4gU3lzdGVtO1xuXHR9KCk7XG5cdFxuXHRleHBvcnRzLmRlZmF1bHQgPSBTeXN0ZW07XG5cbi8qKiovIH0sXG4vKiAyMiAqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdC8qKlxuXHQgKiBDbGFzcyBmb3Igd29ya2luZyB3aXRoIHVzZXJcblx0ICovXG5cdFxuXHRleHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXHRcblx0dmFyIF9VdGlsc0Jyb3dzZXIgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgpO1xuXHRcblx0dmFyIF9VdGlsc0Jyb3dzZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNCcm93c2VyKTtcblx0XG5cdHZhciBfVXRpbHNTY3JlZW4gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIwKTtcblx0XG5cdHZhciBfVXRpbHNTY3JlZW4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVXRpbHNTY3JlZW4pO1xuXHRcblx0dmFyIF9VdGlsc1N5c3RlbSA9IF9fd2VicGFja19yZXF1aXJlX18oMjEpO1xuXHRcblx0dmFyIF9VdGlsc1N5c3RlbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlsc1N5c3RlbSk7XG5cdFxuXHRmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXHRcblx0ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblx0XG5cdHZhciBVc2VyID0gZnVuY3Rpb24gKCkge1xuXHQgICAgZnVuY3Rpb24gVXNlcigpIHtcblx0ICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVXNlcik7XG5cdCAgICB9XG5cdFxuXHQgICAgLyoqXG5cdCAgICAgKiBHZXQgdXNlciBpbmZvXG5cdCAgICAgKiBAcmV0dXJuIHt7YnJvd3Nlcjoge2Jyb3dzZXI6IHN0cmluZywgbW9iaWxlOiBib29sZWFuLCB2ZXJzaW9uOiBzdHJpbmd9LCBzY3JlZW46IHthdmFpbGFibGVTaXplOiB7aGVpZ2h0OiBudW1iZXIsIHdpZHRoOiBudW1iZXJ9LCBjb2xvckRlcHRoOiBudW1iZXIsIHBpeGVsUmF0aW86IG51bWJlciwgc2l6ZToge2hlaWdodDogbnVtYmVyLCB3aWR0aDogbnVtYmVyfX0sIHN5c3RlbToge25hbWU6IHN0cmluZywgdmVyc2lvbjogc3RyaW5nfX19XG5cdCAgICAgKi9cblx0ICAgIFVzZXIuZ2V0SW5mbyA9IGZ1bmN0aW9uIGdldEluZm8oKSB7XG5cdCAgICAgICAgcmV0dXJuIHtcblx0ICAgICAgICAgICAgYnJvd3NlcjogX1V0aWxzQnJvd3NlcjIuZGVmYXVsdC5nZXRJbmZvKCksXG5cdCAgICAgICAgICAgIHNjcmVlbjogX1V0aWxzU2NyZWVuMi5kZWZhdWx0LmdldEluZm8oKSxcblx0ICAgICAgICAgICAgc3lzdGVtOiBfVXRpbHNTeXN0ZW0yLmRlZmF1bHQuZ2V0SW5mbygpXG5cdCAgICAgICAgfTtcblx0ICAgIH07XG5cdFxuXHQgICAgcmV0dXJuIFVzZXI7XG5cdH0oKTtcblx0XG5cdGV4cG9ydHMuZGVmYXVsdCA9IFVzZXI7XG5cbi8qKiovIH1cbi8qKioqKiovIF0pXG59KTtcbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OTFibWwyWlhKellXeE5iMlIxYkdWRVpXWnBibWwwYVc5dVB6VmpZVFlxS2lJc0luZGxZbkJoWTJzNkx5OHZkMlZpY0dGamF5OWliMjkwYzNSeVlYQWdPR0ZsT0dZNU1UQmpPVFV3WVdFMFkyRTNOREUvWldFM1pTb3FJaXdpZDJWaWNHRmphem92THk4dUwyeHBZaTlWZEdsc2N5NTBjejgxWWpaaUtpSXNJbmRsWW5CaFkyczZMeTh2TGk5c2FXSXZWWFJwYkhOQmJtbHRZWFJwYjI0dWRITS9PVEV6TUNvaUxDSjNaV0p3WVdOck9pOHZMeTR2YkdsaUwxVjBhV3h6UVc1cGJXRjBhVzl1UldGemFXNW5MblJ6UDJSa05qWXFJaXdpZDJWaWNHRmphem92THk4dUwyeHBZaTlWZEdsc2MwSnliM2R6WlhJdWRITS9NbUkwT0NvaUxDSjNaV0p3WVdOck9pOHZMeTR2YkdsaUwxVjBhV3h6UTI5dmEybGxMblJ6UDJFeE5qVXFJaXdpZDJWaWNHRmphem92THk4dUwzNHZkWEpzTDNWeWJDNXFjejlrTm1FMEtpSXNJbmRsWW5CaFkyczZMeTh2TGk5K0wzVnliQzkrTDNCMWJubGpiMlJsTDNCMWJubGpiMlJsTG1welB6ZzNaR1VxSWl3aWQyVmljR0ZqYXpvdkx5OG9kMlZpY0dGamF5a3ZZblZwYkdScGJpOXRiMlIxYkdVdWFuTS9Zek5qTWlvaUxDSjNaV0p3WVdOck9pOHZMeTR2Zmk5eGRXVnllWE4wY21sdVp5OXBibVJsZUM1cWN6OW1ZMlU0S2lJc0luZGxZbkJoWTJzNkx5OHZMaTkrTDNGMVpYSjVjM1J5YVc1bkwyUmxZMjlrWlM1cWN6OWpNalV3S2lJc0luZGxZbkJoWTJzNkx5OHZMaTkrTDNGMVpYSjVjM1J5YVc1bkwyVnVZMjlrWlM1cWN6OWxPRFppS2lJc0luZGxZbkJoWTJzNkx5OHZMaTlzYVdJdlZYUnBiSE5FYjJOMWJXVnVkQzUwY3o4NFptRTJLaUlzSW5kbFluQmhZMnM2THk4dkxpOXNhV0l2VlhScGJITlhhVzVrYjNjdWRITS9OV05pWmlvaUxDSjNaV0p3WVdOck9pOHZMeTR2YkdsaUwxVjBhV3h6UkU5TkxuUnpQelpoTkRrcUlpd2lkMlZpY0dGamF6b3ZMeTh1TDJ4cFlpOVZkR2xzYzAxdmRYTmxMblJ6UDJKbE5EWXFJaXdpZDJWaWNHRmphem92THk4dUwyeHBZaTlWZEdsc2MxTmpjbVZsYmk1MGN6ODNZMlpsS2lJc0luZGxZbkJoWTJzNkx5OHZMaTlzYVdJdlZYUnBiSE5UZVhOMFpXMHVkSE0vTXpWbU1pb2lMQ0ozWldKd1lXTnJPaTh2THk0dmJHbGlMMVYwYVd4elZYTmxjaTUwY3o5aU4yVmlLaUpkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4RFFVRkRPMEZCUTBRc1R6dEJRMVpCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxIVkNRVUZsTzBGQlEyWTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3T3p0QlFVZEJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3T3pzN096czdPenM3T3pzN096czdPenRCUTNSRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFTeHhSMEZCYjBjc2JVSkJRVzFDTEVWQlFVVXNiVUpCUVcxQ0xEaElRVUU0U0RzN1FVRkZNVkU3TzBGQlJVRTdPMEZCUlVFN08wRkJSVUU3TzBGQlJVRTdPMEZCUlVFN08wRkJSVUU3TzBGQlJVRTdPMEZCUlVFN08wRkJSVUU3TzBGQlJVRTdPMEZCUlVFN08wRkJSVUU3TzBGQlJVRTdPMEZCUlVFN08wRkJSVUU3TzBGQlJVRTdPMEZCUlVFN08wRkJSVUU3TzBGQlJVRTdPMEZCUlVFc2RVTkJRWE5ETEhWRFFVRjFReXhuUWtGQlowSTdPMEZCUlRkR0xHdEVRVUZwUkN3d1EwRkJNRU1zTUVSQlFUQkVMRVZCUVVVN08wRkJSWFpLTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hqUVVGaE8wRkJRMkk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3TzBGQlIwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPMEZCUjBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxEaENRVUUyUWp0QlFVTTNRanRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUVzY1V0QlFXOUxPMEZCUTNCTE96dEJRVVZCT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzWTBGQllUdEJRVU5pTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3TzBGQlIwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CTzBGQlEwRXNhVUpCUVdkQ08wRkJRMmhDT3pzN1FVRkhRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4RlFVRkRPenRCUVVWRU96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNkMEk3T3pzN096dEJRekZQUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUczdRVUZGUVRzN1FVRkZRVHM3UVVGRlFTeDFRMEZCYzBNc2RVTkJRWFZETEdkQ1FVRm5RanM3UVVGRk4wWXNhMFJCUVdsRUxEQkRRVUV3UXl3d1JFRkJNRVFzUlVGQlJUczdRVUZGZGtvN1FVRkRRVHRCUVVOQk96dEJRVVZCT3p0QlFVVkJMRzFFT3pzN096czdRVU55UWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFc2EwUkJRV2xFTERCRFFVRXdReXd3UkVGQk1FUXNSVUZCUlRzN1FVRkZka283UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRlZCUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1ZVRkJVenRCUVVOVU8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZWQlFWTTdRVUZEVkR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWVUZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4VlFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGVkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFZRVUZUTzBGQlExUTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRlZCUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1ZVRkJVenRCUVVOVU8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZWQlFWTTdRVUZEVkR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWVUZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4VlFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRlZCUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1ZVRkJVenRCUVVOVU8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGVkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFZRVUZUTzBGQlExUTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRlZCUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdOQlFXRTdRVUZEWWp0QlFVTkJPMEZCUTBFN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4alFVRmhPMEZCUTJJN1FVRkRRVHRCUVVOQk8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1kwRkJZVHRCUVVOaU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRlZCUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4VlFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZWQlFWTTdRVUZEVkR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWVUZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMR05CUVdFN1FVRkRZanRCUVVOQkxHTkJRV0U3UVVGRFlqdEJRVU5CTEdOQlFXRTdRVUZEWWp0QlFVTkJPMEZCUTBFc1ZVRkJVenRCUVVOVU8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFZRVUZUTzBGQlExUTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEVzUlVGQlF6czdRVUZGUkRzN1FVRkZRU3cwUWpzN096czdPMEZEZGxoQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQkxHdEVRVUZwUkN3d1EwRkJNRU1zTUVSQlFUQkVMRVZCUVVVN08wRkJSWFpLTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeHJRa0ZCYVVJN1FVRkRha0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHBRa0ZCWjBJN1FVRkRhRUk3T3p0QlFVZEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRXNWVUZCVXp0QlFVTlVPMEZCUTBFc1ZVRkJVenRCUVVOVU8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRXNWVUZCVXp0QlFVTlVPMEZCUTBFc1ZVRkJVenRCUVVOVU8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHbENRVUZuUWp0QlFVTm9RanM3TzBGQlIwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFTeFZRVUZUTzBGQlExUTdRVUZEUVN4VlFVRlRPMEZCUTFRN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFTeFZRVUZUTzBGQlExUTdRVUZEUVN4VlFVRlRPMEZCUTFRN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hwUWtGQlowSTdRVUZEYUVJN096dEJRVWRCTzBGQlEwRTdRVUZEUVN3MFFrRkJNa0k3UVVGRE0wSXNkVXBCUVhOS08wRkJRM1JLT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHdENRVUZwUWp0QlFVTnFRanRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4VlFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdsQ1FVRm5RanRCUVVOb1FqczdPMEZCUjBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNhVUpCUVdkQ08wRkJRMmhDT3pzN1FVRkhRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNhVUpCUVdkQ08wRkJRMmhDT3pzN1FVRkhRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzYVVKQlFXZENPMEZCUTJoQ096czdRVUZIUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzYVVKQlFXZENPMEZCUTJoQ096czdRVUZIUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdsQ1FVRm5RanRCUVVOb1FqczdPMEZCUjBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdsQ1FVRm5RanRCUVVOb1FqczdPMEZCUjBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4cFFrRkJaMEk3UVVGRGFFSTdPenRCUVVkQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4cFFrRkJaMEk3UVVGRGFFSTdPenRCUVVkQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMR2xDUVVGblFqdEJRVU5vUWpzN08wRkJSMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMR2xDUVVGblFqdEJRVU5vUWpzN08wRkJSMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hwUWtGQlowSTdRVUZEYUVJN096dEJRVWRCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hwUWtGQlowSTdRVUZEYUVJN096dEJRVWRCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4cFFrRkJaMEk3UVVGRGFFSTdPenRCUVVkQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4cFFrRkJaMEk3UVVGRGFFSTdPenRCUVVkQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2FVSkJRV2RDTzBGQlEyaENPenM3UVVGSFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHbENRVUZuUWp0QlFVTm9RanM3TzBGQlIwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMR2xDUVVGblFqdEJRVU5vUWpzN08wRkJSMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHbENRVUZuUWp0QlFVTm9RanM3TzBGQlIwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHbENRVUZuUWp0QlFVTm9RanM3TzBGQlIwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHbENRVUZuUWp0QlFVTm9RanM3TzBGQlIwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHbENRVUZuUWp0QlFVTm9RanM3TzBGQlIwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHbENRVUZuUWp0QlFVTm9RanM3TzBGQlIwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHbENRVUZuUWp0QlFVTm9RanM3TzBGQlIwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEVzUlVGQlF6czdRVUZGUkN3eVFqczdPenM3TzBGRE9WZEJPenRCUVVWQk96dEJRVVZCTEhGSFFVRnZSeXh0UWtGQmJVSXNSVUZCUlN4dFFrRkJiVUlzT0VoQlFUaElPenRCUVVVeFVTeHJSRUZCYVVRc01FTkJRVEJETERCRVFVRXdSQ3hGUVVGRk96dEJRVVYyU2p0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzWjBKQlFXVTdRVUZEWmp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTd3lRa0ZCTUVJN1FVRkRNVUlzYTBKQlFXbENPMEZCUTJwQ0xHOUNRVUZ0UWp0QlFVTnVRaXh6UWtGQmNVSTdRVUZEY2tJc2JVSkJRV3RDTzBGQlEyeENMSEZDUVVGdlFqdEJRVU53UWl4eFFrRkJiMEk3UVVGRGNFSXNaVUZCWXp0QlFVTmtPenM3UVVGSFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2RVSkJRWE5DTzBGQlEzUkNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEhWQ1FVRnpRanRCUVVOMFFqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMSFZDUVVGelFqdEJRVU4wUWp0QlFVTkJMRFJFUVVFeVJDeHRRMEZCYlVNc2JVTkJRVzFETEhWRFFVRjFRenRCUVVONFN6dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRmxCUVZjN1FVRkRXRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWVUZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFJRVUZQTzBGQlExQTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFMUJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzTWtKQlFUQkNPMEZCUXpGQ0xHdENRVUZwUWp0QlFVTnFRaXhuUWtGQlpUdEJRVU5tT3pzN1FVRkhRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHhRa0ZCYjBJN1FVRkRjRUk3UVVGRFFTeHRSRUZCYTBRN1FVRkRiRVE3UVVGRFFUdEJRVU5CTzBGQlEwRXNlVXBCUVhkS08wRkJRM2hLT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHTkJRV0U3UVVGRFlqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNkVUpCUVhOQ08wRkJRM1JDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hSUVVGUE8wRkJRMUE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTFCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc01rSkJRVEJDTzBGQlF6RkNMR3RDUVVGcFFqdEJRVU5xUWl4blFrRkJaVHRCUVVObU96czdRVUZIUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4VlFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZGQlFVODdRVUZEVUR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVFVGQlN6dEJRVU5NTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTd3lRa0ZCTUVJN1FVRkRNVUlzWjBKQlFXVTdRVUZEWmpzN08wRkJSMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNjVUpCUVc5Q08wRkJRM0JDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2NVSkJRVzlDTzBGQlEzQkNPMEZCUTBFc2JVUkJRV3RFTzBGQlEyeEVPMEZCUTBFN1FVRkRRVHRCUVVOQkxHbExRVUZuU3p0QlFVTm9TenM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4alFVRmhPMEZCUTJJN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxIVkNRVUZ6UWp0QlFVTjBRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGVkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1VVRkJUenRCUVVOUU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TlFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMREpDUVVFd1FqdEJRVU14UWl4blFrRkJaVHRCUVVObU96czdRVUZIUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hwUzBGQlowczdRVUZEYUVzN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRXNaMEpCUVdVN1FVRkRaanRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRlZCUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNVVUZCVHp0QlFVTlFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeE5RVUZMTzBGQlEwdzdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNSVUZCUXpzN1FVRkZSRHM3UVVGRlFTeHBSRUZCWjBRc1IwRkJSeXhUT3pzN096czdRVU5vV0c1RU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFTeHBRa0ZCWjBJc1MwRkJTenM3UVVGRmNrSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzYzBOQlFYRkRPMEZCUTNKRE8wRkJRMEU3UVVGRFFTd3lRMEZCTUVNc1MwRkJTenRCUVVNdlF5d3dRMEZCZVVNc1MwRkJTenRCUVVNNVF6dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTFCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEUxQlFVczdRVUZEVER0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hOUVVGTE8wRkJRMHc3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEVzY1VOQlFXOURPMEZCUTNCRE8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRU3h2UWtGQmJVSXNORUpCUVRSQ08wRkJReTlETzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTFCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc2IwSkJRVzFDTEhsQ1FVRjVRanRCUVVNMVF6dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJMRFJEUVVFeVF5eFBRVUZQTzBGQlEyeEVPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzTWtOQlFUQkRMRTlCUVU4N1FVRkRha1E3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMR05CUVdFN1FVRkRZanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMRTFCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHpRa0ZCY1VJc2QwSkJRWGRDTzBGQlF6ZERPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTERKRFFVRXdReXhQUVVGUE8wRkJRMnBFTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3p0QlFVZEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVsQlFVYzdRVUZEU0R0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJMRWxCUVVjN1FVRkRTRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFbEJRVWM3UVVGRFNEdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTEVsQlFVYzdRVUZEU0RzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEVsQlFVYzdPMEZCUlVnN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1RVRkJTenM3UVVGRlREdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hSUVVGUE8wRkJRMUE3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRTFCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SlFVRkhPMEZCUTBnN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SlFVRkhPMEZCUTBnN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4TlFVRkxPMEZCUTB3N1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3dyUWtGQk9FSXNVVUZCVVR0QlFVTjBRenRCUVVOQk8wRkJRMEU3UVVGRFFTeE5RVUZMTzBGQlEwdzdRVUZEUVR0QlFVTkJMRTFCUVVzN1FVRkRURHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFc1YwRkJWU3hOUVVGTk8wRkJRMmhDTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SlFVRkhPMEZCUTBnN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN096czdPenM3YlVORGJITkNRVHRCUVVOQkxFVkJRVU03TzBGQlJVUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hIUVVGRk96dEJRVVZHTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEVzWVVGQldTeFBRVUZQTzBGQlEyNUNMR1ZCUVdNc1RVRkJUVHRCUVVOd1FqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeGhRVUZaTEUxQlFVMDdRVUZEYkVJc1lVRkJXU3hUUVVGVE8wRkJRM0pDTzBGQlEwRXNaVUZCWXl4TlFVRk5PMEZCUTNCQ08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMR0ZCUVZrc1QwRkJUenRCUVVOdVFpeGhRVUZaTEZOQlFWTTdRVUZEY2tJN1FVRkRRU3hsUVVGakxFMUJRVTA3UVVGRGNFSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMR0ZCUVZrc1QwRkJUenRCUVVOdVFpeGxRVUZqTEUxQlFVMDdRVUZEY0VJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzYzBOQlFYRkRPMEZCUTNKRE8wRkJRMEVzVFVGQlN6dEJRVU5NTERaQ1FVRTBRanRCUVVNMVFqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRXRCUVVrN1FVRkRTanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeGhRVUZaTEUxQlFVMDdRVUZEYkVJc1pVRkJZeXhQUVVGUE8wRkJRM0pDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4SlFVRkhPMEZCUTBnN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4aFFVRlpMRTlCUVU4N1FVRkRia0lzWlVGQll5eFBRVUZQTzBGQlEzSkNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHRkJRVmtzVDBGQlR6dEJRVU51UWl4bFFVRmpMRTlCUVU4N1FVRkRja0k3UVVGRFFUdEJRVU5CTEZWQlFWTTdRVUZEVkR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4blEwRkJLMElzYlVOQlFXMURPMEZCUTJ4Rk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzWVVGQldTeFBRVUZQTzBGQlEyNUNMR1ZCUVdNc1QwRkJUenRCUVVOeVFqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFc1kwRkJZU3hYUVVGWE8wRkJRM2hDTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTEhsQ1FVRjNRanM3UVVGRmVFSXNNRU5CUVhsRExIRkNRVUZ4UWpzN1FVRkZPVVE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRzFEUVVGclF5eHZRa0ZCYjBJN08wRkJSWFJFTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNZVUZCV1N4UFFVRlBPMEZCUTI1Q0xHVkJRV01zVDBGQlR6dEJRVU55UWp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJMR05CUVdFc2FVSkJRV2xDTzBGQlF6bENPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVN3eVFrRkJNRUlzYVVKQlFXbENPMEZCUXpORE8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUVzWlVGQll5eHBRa0ZCYVVJN1FVRkRMMEk3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTd3JRa0ZCT0VJc2IwSkJRVzlDTzBGQlEyeEVPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMR0ZCUVZrc1QwRkJUenRCUVVOdVFqdEJRVU5CTEdWQlFXTXNUMEZCVHp0QlFVTnlRanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRWxCUVVjN1FVRkRTRHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hoUVVGWkxFOUJRVTg3UVVGRGJrSTdRVUZEUVN4bFFVRmpMRTlCUVU4N1FVRkRja0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hKUVVGSE8wRkJRMGc3TzBGQlJVRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1NVRkJSenRCUVVOSU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeFBRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1NVRkJSenRCUVVOSUxFZEJRVVU3UVVGRFJpeDFRMEZCYzBNN1FVRkRkRU03UVVGRFFTeEpRVUZITEU5QlFVODdRVUZEVmp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFZEJRVVVzVDBGQlR6dEJRVU5VTzBGQlEwRTdPMEZCUlVFc1JVRkJRenM3T3pzN096czdRVU5xYUVKRU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdPenM3TzBGRFZFRTdPMEZCUlVFN1FVRkRRVHM3T3pzN096dEJRMGhCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUVzYTBKQlFXbENMRk5CUVZNN1FVRkRNVUk3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxFMUJRVXM3UVVGRFREdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNUVUZCU3p0QlFVTk1PMEZCUTBFc1RVRkJTenRCUVVOTU8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenM3T3pzN08wRkRMMFZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN08wRkJSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hWUVVGVE8wRkJRMVFzVVVGQlR6dEJRVU5RTzBGQlEwRTdRVUZEUVN4TlFVRkxPenRCUVVWTU96dEJRVVZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenM3T3pzN08wRkRMMFJCT3p0QlFVVkJPenRCUVVWQk96dEJRVVZCT3p0QlFVVkJMSFZEUVVGelF5eDFRMEZCZFVNc1owSkJRV2RDT3p0QlFVVTNSaXhyUkVGQmFVUXNNRU5CUVRCRExEQkVRVUV3UkN4RlFVRkZPenRCUVVWMlNqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNhMEpCUVdsQ08wRkJRMnBDTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hyUWtGQmFVSTdRVUZEYWtJN096dEJRVWRCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxGVkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hwUWtGQlowSTdRVUZEYUVJN096dEJRVWRCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxGVkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hwUWtGQlowSTdRVUZEYUVJN096dEJRVWRCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxGVkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hyUWtGQmFVSTdRVUZEYWtJN096dEJRVWRCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEZWQlFWTTdRVUZEVkR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVN4RlFVRkRPenRCUVVWRUxEUkNPenM3T3pzN1FVTXhSMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN08wRkJSVUVzY1VkQlFXOUhMRzFDUVVGdFFpeEZRVUZGTEcxQ1FVRnRRaXc0U0VGQk9FZzdPMEZCUlRGUkxHdEVRVUZwUkN3d1EwRkJNRU1zTUVSQlFUQkVMRVZCUVVVN08wRkJSWFpLTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdsQ1FVRm5RanRCUVVOb1FqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHbENRVUZuUWp0QlFVTm9RanM3TzBGQlIwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHbENRVUZuUWp0QlFVTm9RanM3TzBGQlIwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hyUWtGQmFVSTdRVUZEYWtJN096dEJRVWRCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJMRVZCUVVNN08wRkJSVVFzTUVJN096czdPenRCUXpGRlFUczdRVUZGUVRzN1FVRkZRU3h4UjBGQmIwY3NiVUpCUVcxQ0xFVkJRVVVzYlVKQlFXMUNMRGhJUVVFNFNEczdRVUZGTVZFN08wRkJSVUU3TzBGQlJVRXNkVU5CUVhORExIVkRRVUYxUXl4blFrRkJaMEk3TzBGQlJUZEdMR3RFUVVGcFJDd3dRMEZCTUVNc01FUkJRVEJFTEVWQlFVVTdPMEZCUlhaS08wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdsQ1FVRm5RanRCUVVOb1FqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzYVVKQlFXZENPMEZCUTJoQ096czdRVUZIUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNhMEpCUVdsQ08wRkJRMnBDT3pzN1FVRkhRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2RVSkJRWE5DTzBGQlEzUkNPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4MVFrRkJjMEk3UVVGRGRFSTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHJRa0ZCYVVJN1FVRkRha0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3pzN1FVRkhRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdOQlFXRTdRVUZEWWp0QlFVTkJPMEZCUTBFN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96czdRVUZIUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHTkJRV0U3UVVGRFlqdEJRVU5CTzBGQlEwRTdRVUZEUVN4VlFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4cFFrRkJaMEk3UVVGRGFFSTdPenRCUVVkQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWVUZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNhVUpCUVdkQ08wRkJRMmhDT3pzN1FVRkhRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1ZVRkJVenRCUVVOVU8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc2FVSkJRV2RDTzBGQlEyaENPenM3UVVGSFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMRFpEUVVFMFF5eFJRVUZSTzBGQlEzQkVPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWVUZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4cFFrRkJaMEk3UVVGRGFFSTdPenRCUVVkQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4alFVRmhPMEZCUTJJN1FVRkRRVHRCUVVOQk8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHBRa0ZCWjBJN1FVRkRhRUk3T3p0QlFVZEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWVUZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4cFFrRkJaMEk3UVVGRGFFSTdPenRCUVVkQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJMR2xDUVVGblFqdEJRVU5vUWpzN08wRkJSMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxGVkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRU3hGUVVGRE96dEJRVVZFTEhWQ096czdPenM3UVVOdVdVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUU3TzBGQlJVRXNjVWRCUVc5SExHMUNRVUZ0UWl4RlFVRkZMRzFDUVVGdFFpdzRTRUZCT0VnN08wRkJSVEZST3p0QlFVVkJPenRCUVVWQk96dEJRVVZCT3p0QlFVVkJMSFZEUVVGelF5eDFRMEZCZFVNc1owSkJRV2RDT3p0QlFVVTNSaXhyUkVGQmFVUXNNRU5CUVRCRExEQkVRVUV3UkN4RlFVRkZPenRCUVVWMlNqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHBRa0ZCWjBJN1FVRkRhRUk3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4alFVRmhPMEZCUTJJN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWVUZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTEVWQlFVTTdPMEZCUlVRc2VVSTdPenM3T3p0QlEzSkdRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVRzN1FVRkZRU3hyUkVGQmFVUXNNRU5CUVRCRExEQkVRVUV3UkN4RlFVRkZPenRCUVVWMlNqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEVzYTBKQlFXbENMR2RDUVVGblFpdzRRa0ZCT0VJc2FVUkJRV2xFTzBGQlEyaElPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hyUWtGQmFVSTdRVUZEYWtJN096dEJRVWRCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hyUWtGQmFVSTdRVUZEYWtJN096dEJRVWRCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU3hyUWtGQmFVSTdRVUZEYWtJN096dEJRVWRCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHJRa0ZCYVVJN1FVRkRha0k3T3p0QlFVZEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHJRa0ZCYVVJN1FVRkRha0k3T3p0QlFVZEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHJRa0ZCYVVJN1FVRkRha0k3T3p0QlFVZEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4cFFrRkJaMEk3UVVGRGFFSTdPenRCUVVkQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNWVUZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTEdsQ1FVRm5RanRCUVVOb1FqczdPMEZCUjBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNSVUZCUXpzN1FVRkZSQ3d3UWpzN096czdPMEZEYkVoQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQkxHdEVRVUZwUkN3d1EwRkJNRU1zTUVSQlFUQkVMRVZCUVVVN08wRkJSWFpLTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3UVVGRFFTeHJRa0ZCYVVJN1FVRkRha0k3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzYVVKQlFXZENPMEZCUTJoQ096czdRVUZIUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVN4VlFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQkxGVkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRXNWVUZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CTEZWQlFWTTdRVUZEVkR0QlFVTkJPMEZCUTBFc1ZVRkJVenRCUVVOVU8wRkJRMEU3UVVGRFFTeFZRVUZUTzBGQlExUTdRVUZEUVR0QlFVTkJMRlZCUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVN4VlFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQkxGVkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRXNWVUZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CTEZWQlFWTTdRVUZEVkR0QlFVTkJPMEZCUTBFc1ZVRkJVenRCUVVOVU8wRkJRMEU3UVVGRFFTeFZRVUZUTzBGQlExUTdRVUZEUVR0QlFVTkJMRlZCUVZNN1FVRkRWRHRCUVVOQk8wRkJRMEVzVlVGQlV6dEJRVU5VTzBGQlEwRTdRVUZEUVN4VlFVRlRPMEZCUTFRN1FVRkRRVHRCUVVOQkxGVkJRVk03UVVGRFZEdEJRVU5CTzBGQlEwRXNWVUZCVXp0QlFVTlVPMEZCUTBFN1FVRkRRU3hWUVVGVE8wRkJRMVE3UVVGRFFUdEJRVU5CTEZWQlFWTTdRVUZEVkR0QlFVTkJPMEZCUTBFc1ZVRkJVenRCUVVOVU8wRkJRMEU3UVVGRFFTeFZRVUZUTzBGQlExUXNNa3BCUVRCS08wRkJRekZLT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQkxHTkJRV0U3UVVGRFlqdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVRkZRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFTeHBRa0ZCWjBJN1FVRkRhRUk3T3p0QlFVZEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTzBGQlEwRXNSVUZCUXpzN1FVRkZSQ3d3UWpzN096czdPMEZEY0V0Qk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPenRCUVVWQk96dEJRVVZCT3p0QlFVVkJPenRCUVVWQk96dEJRVVZCT3p0QlFVVkJPenRCUVVWQkxIVkRRVUZ6UXl4MVEwRkJkVU1zWjBKQlFXZENPenRCUVVVM1JpeHJSRUZCYVVRc01FTkJRVEJETERCRVFVRXdSQ3hGUVVGRk96dEJRVVYyU2p0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRXNhMEpCUVdsQ0xGVkJRVlVzYTBSQlFXdEVMRmRCUVZjc1owSkJRV2RDTERoQ1FVRTRRaXhwUkVGQmFVUXNLMEpCUVN0Q0xGZEJRVmM3UVVGRGFrODdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVUZGUVR0QlFVTkJMRVZCUVVNN08wRkJSVVFzZDBJaUxDSm1hV3hsSWpvaUxpOXNhV0l2VlhScGJITXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJb1puVnVZM1JwYjI0Z2QyVmljR0ZqYTFWdWFYWmxjbk5oYkUxdlpIVnNaVVJsWm1sdWFYUnBiMjRvY205dmRDd2dabUZqZEc5eWVTa2dlMXh1WEhScFppaDBlWEJsYjJZZ1pYaHdiM0owY3lBOVBUMGdKMjlpYW1WamRDY2dKaVlnZEhsd1pXOW1JRzF2WkhWc1pTQTlQVDBnSjI5aWFtVmpkQ2NwWEc1Y2RGeDBiVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1ZV04wYjNKNUtDazdYRzVjZEdWc2MyVWdhV1lvZEhsd1pXOW1JR1JsWm1sdVpTQTlQVDBnSjJaMWJtTjBhVzl1SnlBbUppQmtaV1pwYm1VdVlXMWtLVnh1WEhSY2RHUmxabWx1WlNoY0lsVjBhV3h6WENJc0lGdGRMQ0JtWVdOMGIzSjVLVHRjYmx4MFpXeHpaU0JwWmloMGVYQmxiMllnWlhod2IzSjBjeUE5UFQwZ0oyOWlhbVZqZENjcFhHNWNkRngwWlhod2IzSjBjMXRjSWxWMGFXeHpYQ0pkSUQwZ1ptRmpkRzl5ZVNncE8xeHVYSFJsYkhObFhHNWNkRngwY205dmRGdGNJbFYwYVd4elhDSmRJRDBnWm1GamRHOXllU2dwTzF4dWZTa29kR2hwY3l3Z1puVnVZM1JwYjI0b0tTQjdYRzV5WlhSMWNtNGdYRzVjYmx4dUx5OGdWMFZDVUVGRFN5QkdUMDlVUlZJZ0x5OWNiaTh2SUhkbFluQmhZMnN2ZFc1cGRtVnljMkZzVFc5a2RXeGxSR1ZtYVc1cGRHbHZiaUlzSWlCY2RDOHZJRlJvWlNCdGIyUjFiR1VnWTJGamFHVmNiaUJjZEhaaGNpQnBibk4wWVd4c1pXUk5iMlIxYkdWeklEMGdlMzA3WEc1Y2JpQmNkQzh2SUZSb1pTQnlaWEYxYVhKbElHWjFibU4wYVc5dVhHNGdYSFJtZFc1amRHbHZiaUJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS0cxdlpIVnNaVWxrS1NCN1hHNWNiaUJjZEZ4MEx5OGdRMmhsWTJzZ2FXWWdiVzlrZFd4bElHbHpJR2x1SUdOaFkyaGxYRzRnWEhSY2RHbG1LR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRLVnh1SUZ4MFhIUmNkSEpsZEhWeWJpQnBibk4wWVd4c1pXUk5iMlIxYkdWelcyMXZaSFZzWlVsa1hTNWxlSEJ2Y25Sek8xeHVYRzRnWEhSY2RDOHZJRU55WldGMFpTQmhJRzVsZHlCdGIyUjFiR1VnS0dGdVpDQndkWFFnYVhRZ2FXNTBieUIwYUdVZ1kyRmphR1VwWEc0Z1hIUmNkSFpoY2lCdGIyUjFiR1VnUFNCcGJuTjBZV3hzWldSTmIyUjFiR1Z6VzIxdlpIVnNaVWxrWFNBOUlIdGNiaUJjZEZ4MFhIUmxlSEJ2Y25Sek9pQjdmU3hjYmlCY2RGeDBYSFJwWkRvZ2JXOWtkV3hsU1dRc1hHNGdYSFJjZEZ4MGJHOWhaR1ZrT2lCbVlXeHpaVnh1SUZ4MFhIUjlPMXh1WEc0Z1hIUmNkQzh2SUVWNFpXTjFkR1VnZEdobElHMXZaSFZzWlNCbWRXNWpkR2x2Ymx4dUlGeDBYSFJ0YjJSMWJHVnpXMjF2WkhWc1pVbGtYUzVqWVd4c0tHMXZaSFZzWlM1bGVIQnZjblJ6TENCdGIyUjFiR1VzSUcxdlpIVnNaUzVsZUhCdmNuUnpMQ0JmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmS1R0Y2JseHVJRngwWEhRdkx5QkdiR0ZuSUhSb1pTQnRiMlIxYkdVZ1lYTWdiRzloWkdWa1hHNGdYSFJjZEcxdlpIVnNaUzVzYjJGa1pXUWdQU0IwY25WbE8xeHVYRzRnWEhSY2RDOHZJRkpsZEhWeWJpQjBhR1VnWlhod2IzSjBjeUJ2WmlCMGFHVWdiVzlrZFd4bFhHNGdYSFJjZEhKbGRIVnliaUJ0YjJSMWJHVXVaWGh3YjNKMGN6dGNiaUJjZEgxY2JseHVYRzRnWEhRdkx5QmxlSEJ2YzJVZ2RHaGxJRzF2WkhWc1pYTWdiMkpxWldOMElDaGZYM2RsWW5CaFkydGZiVzlrZFd4bGMxOWZLVnh1SUZ4MFgxOTNaV0p3WVdOclgzSmxjWFZwY21WZlh5NXRJRDBnYlc5a2RXeGxjenRjYmx4dUlGeDBMeThnWlhod2IzTmxJSFJvWlNCdGIyUjFiR1VnWTJGamFHVmNiaUJjZEY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4dVl5QTlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTTdYRzVjYmlCY2RDOHZJRjlmZDJWaWNHRmphMTl3ZFdKc2FXTmZjR0YwYUY5ZlhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG5BZ1BTQmNJbHdpTzF4dVhHNGdYSFF2THlCTWIyRmtJR1Z1ZEhKNUlHMXZaSFZzWlNCaGJtUWdjbVYwZFhKdUlHVjRjRzl5ZEhOY2JpQmNkSEpsZEhWeWJpQmZYM2RsWW5CaFkydGZjbVZ4ZFdseVpWOWZLREFwTzF4dVhHNWNibHh1THk4Z1YwVkNVRUZEU3lCR1QwOVVSVklnTHk5Y2JpOHZJSGRsWW5CaFkyc3ZZbTl2ZEhOMGNtRndJRGhoWlRobU9URXdZemsxTUdGaE5HTmhOelF4SWl3aVhDSjFjMlVnYzNSeWFXTjBYQ0k3WEc0dktpcGNiaUFxSUVsdGNHOXlkQ0J6ZFdKamJHRnpjMlZ6WEc0Z0tpOWNibHh1Wlhod2IzSjBjeTVmWDJWelRXOWtkV3hsSUQwZ2RISjFaVHRjYmx4dWRtRnlJRjkwZVhCbGIyWWdQU0IwZVhCbGIyWWdVM2x0WW05c0lEMDlQU0JjSW1aMWJtTjBhVzl1WENJZ0ppWWdkSGx3Wlc5bUlGTjViV0p2YkM1cGRHVnlZWFJ2Y2lBOVBUMGdYQ0p6ZVcxaWIyeGNJaUEvSUdaMWJtTjBhVzl1SUNodlltb3BJSHNnY21WMGRYSnVJSFI1Y0dWdlppQnZZbW83SUgwZ09pQm1kVzVqZEdsdmJpQW9iMkpxS1NCN0lISmxkSFZ5YmlCdlltb2dKaVlnZEhsd1pXOW1JRk41YldKdmJDQTlQVDBnWENKbWRXNWpkR2x2Ymx3aUlDWW1JRzlpYWk1amIyNXpkSEoxWTNSdmNpQTlQVDBnVTNsdFltOXNJQ1ltSUc5aWFpQWhQVDBnVTNsdFltOXNMbkJ5YjNSdmRIbHdaU0EvSUZ3aWMzbHRZbTlzWENJZ09pQjBlWEJsYjJZZ2IySnFPeUI5TzF4dVhHNTJZWElnWDFWMGFXeHpRVzVwYldGMGFXOXVJRDBnY21WeGRXbHlaU2hjSWk0dlZYUnBiSE5CYm1sdFlYUnBiMjVjSWlrN1hHNWNiblpoY2lCZlZYUnBiSE5CYm1sdFlYUnBiMjR5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmVlhScGJITkJibWx0WVhScGIyNHBPMXh1WEc1MllYSWdYMVYwYVd4elFuSnZkM05sY2lBOUlISmxjWFZwY21Vb1hDSXVMMVYwYVd4elFuSnZkM05sY2x3aUtUdGNibHh1ZG1GeUlGOVZkR2xzYzBKeWIzZHpaWEl5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmVlhScGJITkNjbTkzYzJWeUtUdGNibHh1ZG1GeUlGOVZkR2xzYzBOdmIydHBaU0E5SUhKbGNYVnBjbVVvWENJdUwxVjBhV3h6UTI5dmEybGxYQ0lwTzF4dVhHNTJZWElnWDFWMGFXeHpRMjl2YTJsbE1pQTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gxVjBhV3h6UTI5dmEybGxLVHRjYmx4dWRtRnlJRjlWZEdsc2MwUnZZM1Z0Wlc1MElEMGdjbVZ4ZFdseVpTaGNJaTR2VlhScGJITkViMk4xYldWdWRGd2lLVHRjYmx4dWRtRnlJRjlWZEdsc2MwUnZZM1Z0Wlc1ME1pQTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gxVjBhV3h6Ukc5amRXMWxiblFwTzF4dVhHNTJZWElnWDFWMGFXeHpSRTlOSUQwZ2NtVnhkV2x5WlNoY0lpNHZWWFJwYkhORVQwMWNJaWs3WEc1Y2JuWmhjaUJmVlhScGJITkVUMDB5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmVlhScGJITkVUMDBwTzF4dVhHNTJZWElnWDFWMGFXeHpUVzkxYzJVZ1BTQnlaWEYxYVhKbEtGd2lMaTlWZEdsc2MwMXZkWE5sWENJcE8xeHVYRzUyWVhJZ1gxVjBhV3h6VFc5MWMyVXlJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZWWFJwYkhOTmIzVnpaU2s3WEc1Y2JuWmhjaUJmVlhScGJITlRZM0psWlc0Z1BTQnlaWEYxYVhKbEtGd2lMaTlWZEdsc2MxTmpjbVZsYmx3aUtUdGNibHh1ZG1GeUlGOVZkR2xzYzFOamNtVmxiaklnUFNCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRjlWZEdsc2MxTmpjbVZsYmlrN1hHNWNiblpoY2lCZlZYUnBiSE5UZVhOMFpXMGdQU0J5WlhGMWFYSmxLRndpTGk5VmRHbHNjMU41YzNSbGJWd2lLVHRjYmx4dWRtRnlJRjlWZEdsc2MxTjVjM1JsYlRJZ1BTQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0Y5VmRHbHNjMU41YzNSbGJTazdYRzVjYm5aaGNpQmZWWFJwYkhOVmMyVnlJRDBnY21WeGRXbHlaU2hjSWk0dlZYUnBiSE5WYzJWeVhDSXBPMXh1WEc1MllYSWdYMVYwYVd4elZYTmxjaklnUFNCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRjlWZEdsc2MxVnpaWElwTzF4dVhHNTJZWElnWDFWMGFXeHpWMmx1Wkc5M0lEMGdjbVZ4ZFdseVpTaGNJaTR2VlhScGJITlhhVzVrYjNkY0lpazdYRzVjYm5aaGNpQmZWWFJwYkhOWGFXNWtiM2N5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmVlhScGJITlhhVzVrYjNjcE8xeHVYRzVtZFc1amRHbHZiaUJmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtHOWlhaWtnZXlCeVpYUjFjbTRnYjJKcUlDWW1JRzlpYWk1ZlgyVnpUVzlrZFd4bElEOGdiMkpxSURvZ2V5QmtaV1poZFd4ME9pQnZZbW9nZlRzZ2ZWeHVYRzVtZFc1amRHbHZiaUJmWTJ4aGMzTkRZV3hzUTJobFkyc29hVzV6ZEdGdVkyVXNJRU52Ym5OMGNuVmpkRzl5S1NCN0lHbG1JQ2doS0dsdWMzUmhibU5sSUdsdWMzUmhibU5sYjJZZ1EyOXVjM1J5ZFdOMGIzSXBLU0I3SUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb1hDSkRZVzV1YjNRZ1kyRnNiQ0JoSUdOc1lYTnpJR0Z6SUdFZ1puVnVZM1JwYjI1Y0lpazdJSDBnZlZ4dVhHNHZLaXBjYmlBcUlFZHNiMkpoYkNCVmRHbHNjeUJqYkdGemMxeHVJQ292WEc1MllYSWdWWFJwYkhNZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdablZ1WTNScGIyNGdWWFJwYkhNb0tTQjdYRzRnSUNBZ0lDQWdJRjlqYkdGemMwTmhiR3hEYUdWamF5aDBhR2x6TENCVmRHbHNjeWs3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdWWFJwYkhNdWQyRnliaUE5SUdaMWJtTjBhVzl1SUhkaGNtNG9iV1Z6YzJGdVoyVXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tDaDBlWEJsYjJZZ1kyOXVjMjlzWlNBOVBUMGdYQ0oxYm1SbFptbHVaV1JjSWlBL0lGd2lkVzVrWldacGJtVmtYQ0lnT2lCZmRIbHdaVzltS0dOdmJuTnZiR1VwS1NBOVBUMGdYQ0p2WW1wbFkzUmNJaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUJqYjI1emIyeGxMbmRoY200Z1BUMDlJRndpWm5WdVkzUnBiMjVjSWlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZZMjl1YzI5c1pTNTNZWEp1S0cxbGMzTmhibWRsS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYldWemMyRnVaMlU3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2FXWWdLSFI1Y0dWdlppQmpiMjV6YjJ4bExteHZaeUE5UFQwZ1hDSm1kVzVqZEdsdmJsd2lLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnTHk5amIyNXpiMnhsTG14dlp5aHRaWE56WVc1blpTazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHMWxjM05oYm1kbE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlR0Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCQVpHVndjbVZqWVhSbFpDQlZkR2xzY3k1blpYUkNiM1Z1WkdsdVowTnNhV1Z1ZEZKbFkzUWdiV1YwYUc5a0lIZGhjeUJrWlhCeVpXTmhkR1ZrSUdGdVpDQnpiMjl1SUhkcGJHd2dZbVVnY21WdGIzWmxaQzRnVUd4bFlYTmxJSFZ6WlNCVmRHbHNjeTVFVDAwdVoyVjBRbTkxYm1ScGJtZERiR2xsYm5SU1pXTjBJRzFsZEdodlpDNWNiaUFnSUNBZ0tpOWNibHh1WEc0Z0lDQWdWWFJwYkhNdVoyVjBRbTkxYm1ScGJtZERiR2xsYm5SU1pXTjBJRDBnWm5WdVkzUnBiMjRnWjJWMFFtOTFibVJwYm1kRGJHbGxiblJTWldOMEtHUnZiVTV2WkdVcElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUdSdmJVUnZZM1Z0Wlc1MElEMGdZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQStJREVnSmlZZ1lYSm5kVzFsYm5Seld6RmRJQ0U5UFNCMWJtUmxabWx1WldRZ1B5QmhjbWQxYldWdWRITmJNVjBnT2lCa2IyTjFiV1Z1ZER0Y2JpQWdJQ0FnSUNBZ2RtRnlJSE5vYjNkR2IzSmpaU0E5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBeUlDWW1JR0Z5WjNWdFpXNTBjMXN5WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pKZElEb2dabUZzYzJVN1hHNWNiaUFnSUNBZ0lDQWdWWFJwYkhNdWQyRnliaWhjSWxWMGFXeHpMbWRsZEVKdmRXNWthVzVuUTJ4cFpXNTBVbVZqZENCdFpYUm9iMlFnZDJGeklHUmxjSEpsWTJGMFpXUWdZVzVrSUhOdmIyNGdkMmxzYkNCaVpTQnlaVzF2ZG1Wa0xpQlFiR1ZoYzJVZ2RYTmxJRlYwYVd4ekxrUlBUUzVuWlhSQ2IzVnVaR2x1WjBOc2FXVnVkRkpsWTNRZ2JXVjBhRzlrTGx3aUtUdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlGVjBhV3h6TGtSUFRTNW5aWFJDYjNWdVpHbHVaME5zYVdWdWRGSmxZM1FvWkc5dFRtOWtaU3dnWkc5dFJHOWpkVzFsYm5Rc0lITm9iM2RHYjNKalpTazdYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRUJrWlhCeVpXTmhkR1ZrSUZWMGFXeHpMbVpwYm1SRmJHVnRaVzUwVUc5emFYUnBiMjRnYldWMGFHOWtJSGRoY3lCa1pYQnlaV05oZEdWa0lHRnVaQ0J6YjI5dUlIZHBiR3dnWW1VZ2NtVnRiM1psWkM0Z1VHeGxZWE5sSUhWelpTQlZkR2xzY3k1RVQwMHVabWx1WkVWc1pXMWxiblJRYjNOcGRHbHZiaUJ0WlhSb2IyUXVYRzRnSUNBZ0lDb3ZYRzRnSUNBZ1ZYUnBiSE11Wm1sdVpFVnNaVzFsYm5SUWIzTnBkR2x2YmlBOUlHWjFibU4wYVc5dUlHWnBibVJGYkdWdFpXNTBVRzl6YVhScGIyNG9aRzl0VG05a1pTa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ1pHOXRSRzlqZFcxbGJuUWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9JRDRnTVNBbUppQmhjbWQxYldWdWRITmJNVjBnSVQwOUlIVnVaR1ZtYVc1bFpDQS9JR0Z5WjNWdFpXNTBjMXN4WFNBNklHUnZZM1Z0Wlc1ME8xeHVJQ0FnSUNBZ0lDQjJZWElnYzJodmQwWnZjbU5sSUQwZ1lYSm5kVzFsYm5SekxteGxibWQwYUNBK0lESWdKaVlnWVhKbmRXMWxiblJ6V3pKZElDRTlQU0IxYm1SbFptbHVaV1FnUHlCaGNtZDFiV1Z1ZEhOYk1sMGdPaUJtWVd4elpUdGNibHh1SUNBZ0lDQWdJQ0JWZEdsc2N5NTNZWEp1S0Z3aVZYUnBiSE11Wm1sdVpFVnNaVzFsYm5SUWIzTnBkR2x2YmlCdFpYUm9iMlFnZDJGeklHUmxjSEpsWTJGMFpXUWdZVzVrSUhOdmIyNGdkMmxzYkNCaVpTQnlaVzF2ZG1Wa0xpQlFiR1ZoYzJVZ2RYTmxJRlYwYVd4ekxrUlBUUzVtYVc1a1JXeGxiV1Z1ZEZCdmMybDBhVzl1SUcxbGRHaHZaQzVjSWlrN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCVmRHbHNjeTVFVDAwdVptbHVaRVZzWlcxbGJuUlFiM05wZEdsdmJpaGtiMjFPYjJSbExDQmtiMjFFYjJOMWJXVnVkQ3dnYzJodmQwWnZjbU5sS1R0Y2JpQWdJQ0I5TzF4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUZSeVlXNXpabVZ5SUhOMFlYUnBZeUJ0WlhSb2IyUnpJR2x1ZEc4Z2RHaGxJRzlpYW1WamRGeHVJQ0FnSUNBcUlFQndZWEpoYlNCeVpXRnNUMkpxWldOMFhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUdOc1lYTnpUbUZ0WlZ4dUlDQWdJQ0FxTDF4dVhHNWNiaUFnSUNCVmRHbHNjeTVwYlhCc1pXMWxiblJoZEdsdmJsTjBZWFJwWTAxbGRHaHZaSE1nUFNCbWRXNWpkR2x2YmlCcGJYQnNaVzFsYm5SaGRHbHZibE4wWVhScFkwMWxkR2h2WkhNb2NtVmhiRTlpYW1WamRDd2dZMnhoYzNOT1lXMWxLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDZ2hJWEpsWVd4UFltcGxZM1FnSmlZZ0tIUjVjR1Z2WmlCeVpXRnNUMkpxWldOMElEMDlQU0JjSW5WdVpHVm1hVzVsWkZ3aUlEOGdYQ0oxYm1SbFptbHVaV1JjSWlBNklGOTBlWEJsYjJZb2NtVmhiRTlpYW1WamRDa3BJRDA5UFNCY0ltOWlhbVZqZEZ3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCemRHRjBhV05EYkdGemN5QTlJSEpsWVd4UFltcGxZM1F1WTI5dWMzUnlkV04wYjNJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQnpkR0YwYVdORGJHRnpjeUE5UFQwZ1hDSm1kVzVqZEdsdmJsd2lLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ0WlhSb2IyUnpJRDBnVDJKcVpXTjBMbXRsZVhNb2MzUmhkR2xqUTJ4aGMzTXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9iV1YwYUc5a2N5QW1KaUJ0WlhSb2IyUnpMbXhsYm1kMGFDQStJREFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQmZiRzl2Y0NBOUlHWjFibU4wYVc5dUlGOXNiMjl3S0NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoZmFYTkJjbkpoZVNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9YMmtnUGowZ1gybDBaWEpoZEc5eUxteGxibWQwYUNrZ2NtVjBkWEp1SUZ3aVluSmxZV3RjSWp0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWDNKbFppQTlJRjlwZEdWeVlYUnZjbHRmYVNzclhUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmZhU0E5SUY5cGRHVnlZWFJ2Y2k1dVpYaDBLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoZmFTNWtiMjVsS1NCeVpYUjFjbTRnWENKaWNtVmhhMXdpTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JmY21WbUlEMGdYMmt1ZG1Gc2RXVTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUcxbGRHaHZaQ0E5SUY5eVpXWTdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlISmxZV3hQWW1wbFkzUmJiV1YwYUc5a1hTQTlQVDBnWENKMWJtUmxabWx1WldSY0lpa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaV0ZzVDJKcVpXTjBXMjFsZEdodlpGMGdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvZEhsd1pXOW1JSE4wWVhScFkwTnNZWE56SUNFOVBTQmNJblZ1WkdWbWFXNWxaRndpS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnVlhScGJITXVkMkZ5YmloY0lsUm9ZWFFnYldWMGFHOWtJSGRoY3lCa1pYQnlaV05oZEdWa0lHRnVaQ0J6YjI5dUlIZHBiR3dnWW1VZ2NtVnRiM1psWkM0Z1VHeGxZWE5sSUhWelpTQmNJaUFySUNoamJHRnpjMDVoYldVZ2ZId2djM1JoZEdsalEyeGhjM01nSmlZZ2MzUmhkR2xqUTJ4aGMzTXVibUZ0WlNCOGZDQmNJbFZ1YTI1dmQyNWNJaWtnS3lCY0lpNWNJaUFySUcxbGRHaHZaQ0FySUZ3aUlHMWxkR2h2WkM1Y0lpazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYzNSaGRHbGpRMnhoYzNOYmJXVjBhRzlrWFM1aGNIQnNlU2h6ZEdGMGFXTkRiR0Z6Y3l3Z1lYSm5kVzFsYm5SektUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5TzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbWIzSWdLSFpoY2lCZmFYUmxjbUYwYjNJZ1BTQnRaWFJvYjJSekxDQmZhWE5CY25KaGVTQTlJRUZ5Y21GNUxtbHpRWEp5WVhrb1gybDBaWEpoZEc5eUtTd2dYMmtnUFNBd0xDQmZhWFJsY21GMGIzSWdQU0JmYVhOQmNuSmhlU0EvSUY5cGRHVnlZWFJ2Y2lBNklGOXBkR1Z5WVhSdmNsdFRlVzFpYjJ3dWFYUmxjbUYwYjNKZEtDazdPeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJmY21WbU8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlGOXlaWFF5SUQwZ1gyeHZiM0FvS1R0Y2JseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoZmNtVjBNaUE5UFQwZ1hDSmljbVZoYTF3aUtTQmljbVZoYXp0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMHBLQ2s3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0I5TzF4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVkbGRDQmpZV3hzSUhOMFlXTnJJSFJ5WVdObFhHNGdJQ0FnSUNvZ1FISmxkSFZ5YmlCQmNuSmhlVHhQWW1wbFkzUStYRzRnSUNBZ0lDb3ZYRzVjYmx4dUlDQWdJRlYwYVd4ekxuTjBZV05ySUQwZ1puVnVZM1JwYjI0Z2MzUmhZMnNvS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUJsSUQwZ2JtVjNJRVZ5Y205eUtDazdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQmxJQ1ltSUdVdWMzUmhZMnNnSmlZZ1pTNXpkR0ZqYXk1emNHeHBkQ2hjSWx4Y2Jsd2lLUzV6YkdsalpTZzFLUzV0WVhBb1puVnVZM1JwYjI0Z0tITXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2doY3lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCN2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCdFlYUmphQ0E5SUM5ZUtDNHFLVUFvTGlvcFhGd3Vhbk02S0Zzd0xUbGRLeWs2S0Zzd0xUbGRLeWtrTDJsbkxtVjRaV01vY3lrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2JXRjBZMmdwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9iV0YwWTJoYk1WMHBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JXRjBZMmhiTVYwZ1BTQXZLRnRlWEZ3dlBGMHJLUzlwWnk1bGVHVmpLRzFoZEdOb1d6RmRLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLRzFoZEdOb1d6RmRLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J0WVhSamFGc3hYU0E5SUcxaGRHTm9XekZkV3pCZE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZiSFZ0YmpvZ2JXRjBZMmhiTkYwZ2ZId2dYQ0pjSWl4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdabWxzWlRvZ2JXRjBZMmhiTWwwZ2ZId2dYQ0pjSWl4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiR2x1WlRvZ2JXRjBZMmhiTTEwZ2ZId2dYQ0pjSWl4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiV1YwYUc5a09pQnRZWFJqYUZzeFhTQjhmQ0JjSWx3aVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJRzFoZEdOb0lEMGdMMTRvTGlvcFFDaG9kSFJ3ZkdoMGRIQnpLVG9vVzE0NlhTc3BPaWhiTUMwNVhTc3BPaWhiTUMwNVhTc3BKQzlwWnk1bGVHVmpLSE1wTzF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0cxaGRHTm9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXNkVzF1T2lCdFlYUmphRnMxWFNCOGZDQmNJbHdpTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQm1hV3hsT2lCdFlYUmphRnN6WFNCOGZDQmNJbHdpTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnNhVzVsT2lCdFlYUmphRnMwWFNCOGZDQmNJbHdpTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnRaWFJvYjJRNklHMWhkR05vV3pGZElDc2dYQ0k2WENJZ0t5QnRZWFJqYUZzeVhTQjhmQ0JjSWx3aVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJRzFoZEdOb0lEMGdMMTRvTGlvcFFDZ3VLaWs2S0Zzd0xUbGRLeWs2S0Zzd0xUbGRLeWtrTDJsbkxtVjRaV01vY3lrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2JXRjBZMmdwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpiMngxYlc0NklHMWhkR05vV3pSZElIeDhJRndpWENJc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1pwYkdVNklHMWhkR05vV3pKZElIeDhJRndpWENJc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR3hwYm1VNklHMWhkR05vV3pOZElIeDhJRndpWENJc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRzFsZEdodlpEb2diV0YwWTJoYk1WMGdmSHdnWENKY0lseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0J0WVhSamFDQTlJQzllWEZ4eksyRjBYRnh6S0Z0ZUtGMHJLVnhjYzF4Y0tDZ3VLaWs2S0Zzd0xUbGRLeWs2S0Zzd0xUbGRLeWxjWENra0wybG5MbVY0WldNb2N5azdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9iV0YwWTJncElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjJ4MWJXNDZJRzFoZEdOb1d6UmRJSHg4SUZ3aVhDSXNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdacGJHVTZJRzFoZEdOb1d6SmRJSHg4SUZ3aVhDSXNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUd4cGJtVTZJRzFoZEdOb1d6TmRJSHg4SUZ3aVhDSXNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUcxbGRHaHZaRG9nYldGMFkyaGJNVjBnZkh3Z1hDSmNJbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCdFlYUmphQ0E5SUM5ZVhGeHpLMkYwWEZ4ektDNHFLVG9vV3pBdE9WMHJLVG9vV3pBdE9WMHJLU1F2YVdjdVpYaGxZeWh6S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNodFlYUmphQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZiSFZ0YmpvZ2JXRjBZMmhiTTEwZ2ZId2dYQ0pjSWl4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdabWxzWlRvZ2JXRjBZMmhiTVYwZ2ZId2dYQ0pjSWl4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiR2x1WlRvZ2JXRjBZMmhiTWwwZ2ZId2dYQ0pjSWl4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiV1YwYUc5a09pQmNJbHdpWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCek8xeHVJQ0FnSUNBZ0lDQjlLU0I4ZkNCYlhUdGNiaUFnSUNCOU8xeHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFZGxkQ0J5WVc1a2IyMGdTVVJjYmlBZ0lDQWdLaUJBY21WMGRYSnVJSHR6ZEhKcGJtZDlYRzRnSUNBZ0lDb3ZYRzVjYmx4dUlDQWdJRlYwYVd4ekxtZGxkRlZKUkNBOUlHWjFibU4wYVc5dUlHZGxkRlZKUkNncElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlFMWhkR2d1Y21GdVpHOXRLQ2t1ZEc5VGRISnBibWNvTXpZcExuTjFZbk4wY21sdVp5Z3lLVHRjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdjbVYwZFhKdUlGVjBhV3h6TzF4dWZTZ3BPMXh1WEc1bGVIQnZjblJ6TG1SbFptRjFiSFFnUFNCVmRHbHNjenRjYmx4dVZYUnBiSE11UVc1cGJXRjBhVzl1SUQwZ1gxVjBhV3h6UVc1cGJXRjBhVzl1TWk1a1pXWmhkV3gwTzF4dVZYUnBiSE11UW5KdmQzTmxjaUE5SUY5VmRHbHNjMEp5YjNkelpYSXlMbVJsWm1GMWJIUTdYRzVWZEdsc2N5NURiMjlyYVdVZ1BTQmZWWFJwYkhORGIyOXJhV1V5TG1SbFptRjFiSFE3WEc1VmRHbHNjeTVFVDAwZ1BTQmZWWFJwYkhORVQwMHlMbVJsWm1GMWJIUTdYRzVWZEdsc2N5NUViMk4xYldWdWRDQTlJRjlWZEdsc2MwUnZZM1Z0Wlc1ME1pNWtaV1poZFd4ME8xeHVWWFJwYkhNdVRXOTFjMlVnUFNCZlZYUnBiSE5OYjNWelpUSXVaR1ZtWVhWc2REdGNibFYwYVd4ekxsTmpjbVZsYmlBOUlGOVZkR2xzYzFOamNtVmxiakl1WkdWbVlYVnNkRHRjYmxWMGFXeHpMbE41YzNSbGJTQTlJRjlWZEdsc2MxTjVjM1JsYlRJdVpHVm1ZWFZzZER0Y2JsVjBhV3h6TGxWelpYSWdQU0JmVlhScGJITlZjMlZ5TWk1a1pXWmhkV3gwTzF4dVZYUnBiSE11VjJsdVpHOTNJRDBnWDFWMGFXeHpWMmx1Wkc5M01pNWtaV1poZFd4ME8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQlZkR2xzY3p0Y2JseHVYRzR2THk4dkx5OHZMeTh2THk4dkx5OHZMeTljYmk4dklGZEZRbEJCUTBzZ1JrOVBWRVZTWEc0dkx5QXVMMnhwWWk5VmRHbHNjeTUwYzF4dUx5OGdiVzlrZFd4bElHbGtJRDBnTlZ4dUx5OGdiVzlrZFd4bElHTm9kVzVyY3lBOUlERWdNaUF6SWl3aVhDSjFjMlVnYzNSeWFXTjBYQ0k3WEc0dktpcGNiaUFxSUVsdGNHOXlkQ0J6ZFdKamJHRnpjMlZ6WEc0Z0tpOWNibHh1Wlhod2IzSjBjeTVmWDJWelRXOWtkV3hsSUQwZ2RISjFaVHRjYmx4dWRtRnlJRjlWZEdsc2MwRnVhVzFoZEdsdmJrVmhjMmx1WnlBOUlISmxjWFZwY21Vb1hDSXVMMVYwYVd4elFXNXBiV0YwYVc5dVJXRnphVzVuWENJcE8xeHVYRzUyWVhJZ1gxVjBhV3h6UVc1cGJXRjBhVzl1UldGemFXNW5NaUE5SUY5cGJuUmxjbTl3VW1WeGRXbHlaVVJsWm1GMWJIUW9YMVYwYVd4elFXNXBiV0YwYVc5dVJXRnphVzVuS1R0Y2JseHVablZ1WTNScGIyNGdYMmx1ZEdWeWIzQlNaWEYxYVhKbFJHVm1ZWFZzZENodlltb3BJSHNnY21WMGRYSnVJRzlpYWlBbUppQnZZbW91WDE5bGMwMXZaSFZzWlNBL0lHOWlhaUE2SUhzZ1pHVm1ZWFZzZERvZ2IySnFJSDA3SUgxY2JseHVablZ1WTNScGIyNGdYMk5zWVhOelEyRnNiRU5vWldOcktHbHVjM1JoYm1ObExDQkRiMjV6ZEhKMVkzUnZjaWtnZXlCcFppQW9JU2hwYm5OMFlXNWpaU0JwYm5OMFlXNWpaVzltSUVOdmJuTjBjblZqZEc5eUtTa2dleUIwYUhKdmR5QnVaWGNnVkhsd1pVVnljbTl5S0Z3aVEyRnVibTkwSUdOaGJHd2dZU0JqYkdGemN5QmhjeUJoSUdaMWJtTjBhVzl1WENJcE95QjlJSDFjYmx4dWRtRnlJRUZ1YVcxaGRHbHZiaUE5SUdaMWJtTjBhVzl1SUVGdWFXMWhkR2x2YmlncElIdGNiaUFnWDJOc1lYTnpRMkZzYkVOb1pXTnJLSFJvYVhNc0lFRnVhVzFoZEdsdmJpazdYRzU5TzF4dVhHNWxlSEJ2Y25SekxtUmxabUYxYkhRZ1BTQkJibWx0WVhScGIyNDdYRzVjYmtGdWFXMWhkR2x2Ymk1RllYTnBibWNnUFNCZlZYUnBiSE5CYm1sdFlYUnBiMjVGWVhOcGJtY3lMbVJsWm1GMWJIUTdYRzVjYmx4dUx5OHZMeTh2THk4dkx5OHZMeTh2THk4dlhHNHZMeUJYUlVKUVFVTkxJRVpQVDFSRlVseHVMeThnTGk5c2FXSXZWWFJwYkhOQmJtbHRZWFJwYjI0dWRITmNiaTh2SUcxdlpIVnNaU0JwWkNBOUlEWmNiaTh2SUcxdlpIVnNaU0JqYUhWdWEzTWdQU0F4SURJZ015SXNJbHdpZFhObElITjBjbWxqZEZ3aU8xeHVMeW9xWEc0Z0tpQkVhV1ptWlhKbGJuUWdkR2x0WlNCaGJtbHRZWFJwYjI0Z1puVnVZM1JwYjI1elhHNGdLaTljYmx4dVpYaHdiM0owY3k1ZlgyVnpUVzlrZFd4bElEMGdkSEoxWlR0Y2JseHVablZ1WTNScGIyNGdYMk5zWVhOelEyRnNiRU5vWldOcktHbHVjM1JoYm1ObExDQkRiMjV6ZEhKMVkzUnZjaWtnZXlCcFppQW9JU2hwYm5OMFlXNWpaU0JwYm5OMFlXNWpaVzltSUVOdmJuTjBjblZqZEc5eUtTa2dleUIwYUhKdmR5QnVaWGNnVkhsd1pVVnljbTl5S0Z3aVEyRnVibTkwSUdOaGJHd2dZU0JqYkdGemN5QmhjeUJoSUdaMWJtTjBhVzl1WENJcE95QjlJSDFjYmx4dWRtRnlJRVZoYzJsdVp5QTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0JtZFc1amRHbHZiaUJGWVhOcGJtY29LU0I3WEc0Z0lDQWdJQ0FnSUY5amJHRnpjME5oYkd4RGFHVmpheWgwYUdsekxDQkZZWE5wYm1jcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUVWaGMybHVaeTVwYzFaaGJHbGtVR0Z5WVcxeklEMGdablZ1WTNScGIyNGdhWE5XWVd4cFpGQmhjbUZ0Y3loMExDQmlMQ0JqTENCa0xDQnpLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwZVhCbGIyWWdkQ0E5UFQwZ1hDSnVkVzFpWlhKY0lpQW1KaUIwZVhCbGIyWWdZaUE5UFQwZ1hDSnVkVzFpWlhKY0lpQW1KaUIwZVhCbGIyWWdZeUE5UFQwZ1hDSnVkVzFpWlhKY0lpQW1KaUIwZVhCbGIyWWdaQ0E5UFQwZ1hDSnVkVzFpWlhKY0lpQW1KaUFvZEhsd1pXOW1JSE1nUFQwOUlGd2lkVzVrWldacGJtVmtYQ0lnZkh3Z2RIbHdaVzltSUhNZ1BUMDlJRndpYm5WdFltVnlYQ0lwSUNZbUlIUWdQQ0JrTzF4dUlDQWdJSDA3WEc1Y2JpQWdJQ0JGWVhOcGJtY3VjM2RwYm1jZ1BTQm1kVzVqZEdsdmJpQnpkMmx1WnloMExDQmlMQ0JqTENCa0tTQjdYRzRnSUNBZ0lDQWdJR2xtSUNoRllYTnBibWN1YVhOV1lXeHBaRkJoY21GdGN5aDBMQ0JpTENCakxDQmtLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlFVmhjMmx1WjF0RllYTnBibWN1WkdWbVhTaDBMQ0JpTENCakxDQmtLVHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCT1lVNDdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdSV0Z6YVc1bkxtVmhjMlZKYmxGMVlXUWdQU0JtZFc1amRHbHZiaUJsWVhObFNXNVJkV0ZrS0hRc0lHSXNJR01zSUdRcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0VWaGMybHVaeTVwYzFaaGJHbGtVR0Z5WVcxektIUXNJR0lzSUdNc0lHUXBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1l5QXFJQ2gwSUM4OUlHUXBJQ29nZENBcklHSTdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnVG1GT08xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lFVmhjMmx1Wnk1bFlYTmxUM1YwVVhWaFpDQTlJR1oxYm1OMGFXOXVJR1ZoYzJWUGRYUlJkV0ZrS0hRc0lHSXNJR01zSUdRcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0VWaGMybHVaeTVwYzFaaGJHbGtVR0Z5WVcxektIUXNJR0lzSUdNc0lHUXBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z0xXTWdLaUFvZENBdlBTQmtLU0FxSUNoMElDMGdNaWtnS3lCaU8xeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRTVoVGp0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwN1hHNWNiaUFnSUNCRllYTnBibWN1WldGelpVbHVUM1YwVVhWaFpDQTlJR1oxYm1OMGFXOXVJR1ZoYzJWSmJrOTFkRkYxWVdRb2RDd2dZaXdnWXl3Z1pDa2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb1JXRnphVzVuTG1selZtRnNhV1JRWVhKaGJYTW9kQ3dnWWl3Z1l5d2daQ2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNnb2RDQXZQU0JrSUM4Z01pa2dQQ0F4S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdNZ0x5QXlJQ29nZENBcUlIUWdLeUJpTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUMxaklDOGdNaUFxSUNndExYUWdLaUFvZENBdElESXBJQzBnTVNrZ0t5QmlPMXh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUU1aFRqdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMDdYRzVjYmlBZ0lDQkZZWE5wYm1jdVpXRnpaVWx1UTNWaWFXTWdQU0JtZFc1amRHbHZiaUJsWVhObFNXNURkV0pwWXloMExDQmlMQ0JqTENCa0tTQjdYRzRnSUNBZ0lDQWdJR2xtSUNoRllYTnBibWN1YVhOV1lXeHBaRkJoY21GdGN5aDBMQ0JpTENCakxDQmtLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHTWdLaUFvZENBdlBTQmtLU0FxSUhRZ0tpQjBJQ3NnWWp0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQk9ZVTQ3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0I5TzF4dVhHNGdJQ0FnUldGemFXNW5MbVZoYzJWUGRYUkRkV0pwWXlBOUlHWjFibU4wYVc5dUlHVmhjMlZQZFhSRGRXSnBZeWgwTENCaUxDQmpMQ0JrS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hGWVhOcGJtY3VhWE5XWVd4cFpGQmhjbUZ0Y3loMExDQmlMQ0JqTENCa0tTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdNZ0tpQW9LSFFnUFNCMElDOGdaQ0F0SURFcElDb2dkQ0FxSUhRZ0t5QXhLU0FySUdJN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdUbUZPTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlR0Y2JseHVJQ0FnSUVWaGMybHVaeTVsWVhObFNXNVBkWFJEZFdKcFl5QTlJR1oxYm1OMGFXOXVJR1ZoYzJWSmJrOTFkRU4xWW1saktIUXNJR0lzSUdNc0lHUXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tFVmhjMmx1Wnk1cGMxWmhiR2xrVUdGeVlXMXpLSFFzSUdJc0lHTXNJR1FwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb0tIUWdMejBnWkNBdklESXBJRHdnTVNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCaklDOGdNaUFxSUhRZ0tpQjBJQ29nZENBcklHSTdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdZeUF2SURJZ0tpQW9LSFFnTFQwZ01pa2dLaUIwSUNvZ2RDQXJJRElwSUNzZ1lqdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJPWVU0N1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOU8xeHVYRzRnSUNBZ1JXRnphVzVuTG1WaGMyVkpibEYxWVhKMElEMGdablZ1WTNScGIyNGdaV0Z6WlVsdVVYVmhjblFvZEN3Z1lpd2dZeXdnWkNrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvUldGemFXNW5MbWx6Vm1Gc2FXUlFZWEpoYlhNb2RDd2dZaXdnWXl3Z1pDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCaklDb2dLSFFnTHowZ1pDa2dLaUIwSUNvZ2RDQXFJSFFnS3lCaU8xeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRTVoVGp0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwN1hHNWNiaUFnSUNCRllYTnBibWN1WldGelpVOTFkRkYxWVhKMElEMGdablZ1WTNScGIyNGdaV0Z6WlU5MWRGRjFZWEowS0hRc0lHSXNJR01zSUdRcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0VWaGMybHVaeTVwYzFaaGJHbGtVR0Z5WVcxektIUXNJR0lzSUdNc0lHUXBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z0xXTWdLaUFvS0hRZ1BTQjBJQzhnWkNBdElERXBJQ29nZENBcUlIUWdLaUIwSUMwZ01Ta2dLeUJpTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlFNWhUanRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDA3WEc1Y2JpQWdJQ0JGWVhOcGJtY3VaV0Z6WlVsdVQzVjBVWFZoY25RZ1BTQm1kVzVqZEdsdmJpQmxZWE5sU1c1UGRYUlJkV0Z5ZENoMExDQmlMQ0JqTENCa0tTQjdYRzRnSUNBZ0lDQWdJR2xtSUNoRllYTnBibWN1YVhOV1lXeHBaRkJoY21GdGN5aDBMQ0JpTENCakxDQmtLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NoMElDODlJR1FnTHlBeUtTQThJREVwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWXlBdklESWdLaUIwSUNvZ2RDQXFJSFFnS2lCMElDc2dZanRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUF0WXlBdklESWdLaUFvS0hRZ0xUMGdNaWtnS2lCMElDb2dkQ0FxSUhRZ0xTQXlLU0FySUdJN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdUbUZPTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlR0Y2JseHVJQ0FnSUVWaGMybHVaeTVsWVhObFNXNVJkV2x1ZENBOUlHWjFibU4wYVc5dUlHVmhjMlZKYmxGMWFXNTBLSFFzSUdJc0lHTXNJR1FwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLRVZoYzJsdVp5NXBjMVpoYkdsa1VHRnlZVzF6S0hRc0lHSXNJR01zSUdRcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWXlBcUlDaDBJQzg5SUdRcElDb2dkQ0FxSUhRZ0tpQjBJQ29nZENBcklHSTdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnVG1GT08xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lFVmhjMmx1Wnk1bFlYTmxUM1YwVVhWcGJuUWdQU0JtZFc1amRHbHZiaUJsWVhObFQzVjBVWFZwYm5Rb2RDd2dZaXdnWXl3Z1pDa2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb1JXRnphVzVuTG1selZtRnNhV1JRWVhKaGJYTW9kQ3dnWWl3Z1l5d2daQ2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQmpJQ29nS0NoMElEMGdkQ0F2SUdRZ0xTQXhLU0FxSUhRZ0tpQjBJQ29nZENBcUlIUWdLeUF4S1NBcklHSTdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnVG1GT08xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lFVmhjMmx1Wnk1bFlYTmxTVzVQZFhSUmRXbHVkQ0E5SUdaMWJtTjBhVzl1SUdWaGMyVkpiazkxZEZGMWFXNTBLSFFzSUdJc0lHTXNJR1FwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLRVZoYzJsdVp5NXBjMVpoYkdsa1VHRnlZVzF6S0hRc0lHSXNJR01zSUdRcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9LSFFnTHowZ1pDQXZJRElwSUR3Z01Ta2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQmpJQzhnTWlBcUlIUWdLaUIwSUNvZ2RDQXFJSFFnS2lCMElDc2dZanRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJqSUM4Z01pQXFJQ2dvZENBdFBTQXlLU0FxSUhRZ0tpQjBJQ29nZENBcUlIUWdLeUF5S1NBcklHSTdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnVG1GT08xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lFVmhjMmx1Wnk1bFlYTmxTVzVUYVc1bElEMGdablZ1WTNScGIyNGdaV0Z6WlVsdVUybHVaU2gwTENCaUxDQmpMQ0JrS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hGWVhOcGJtY3VhWE5XWVd4cFpGQmhjbUZ0Y3loMExDQmlMQ0JqTENCa0tTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUMxaklDb2dUV0YwYUM1amIzTW9kQ0F2SUdRZ0tpQW9UV0YwYUM1UVNTQXZJRElwS1NBcklHTWdLeUJpTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlFNWhUanRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDA3WEc1Y2JpQWdJQ0JGWVhOcGJtY3VaV0Z6WlU5MWRGTnBibVVnUFNCbWRXNWpkR2x2YmlCbFlYTmxUM1YwVTJsdVpTaDBMQ0JpTENCakxDQmtLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaEZZWE5wYm1jdWFYTldZV3hwWkZCaGNtRnRjeWgwTENCaUxDQmpMQ0JrS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR01nS2lCTllYUm9Mbk5wYmloMElDOGdaQ0FxSUNoTllYUm9MbEJKSUM4Z01pa3BJQ3NnWWp0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQk9ZVTQ3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0I5TzF4dVhHNGdJQ0FnUldGemFXNW5MbVZoYzJWSmJrOTFkRk5wYm1VZ1BTQm1kVzVqZEdsdmJpQmxZWE5sU1c1UGRYUlRhVzVsS0hRc0lHSXNJR01zSUdRcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0VWaGMybHVaeTVwYzFaaGJHbGtVR0Z5WVcxektIUXNJR0lzSUdNc0lHUXBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z0xXTWdMeUF5SUNvZ0tFMWhkR2d1WTI5ektFMWhkR2d1VUVrZ0tpQjBJQzhnWkNrZ0xTQXhLU0FySUdJN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdUbUZPTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlR0Y2JseHVJQ0FnSUVWaGMybHVaeTVsWVhObFNXNUZlSEJ2SUQwZ1puVnVZM1JwYjI0Z1pXRnpaVWx1Ulhod2J5aDBMQ0JpTENCakxDQmtLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaEZZWE5wYm1jdWFYTldZV3hwWkZCaGNtRnRjeWgwTENCaUxDQmpMQ0JrS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSFFnUFQwOUlEQWdQeUJpSURvZ1l5QXFJRTFoZEdndWNHOTNLRElzSURFd0lDb2dLSFFnTHlCa0lDMGdNU2twSUNzZ1lqdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJPWVU0N1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOU8xeHVYRzRnSUNBZ1JXRnphVzVuTG1WaGMyVlBkWFJGZUhCdklEMGdablZ1WTNScGIyNGdaV0Z6WlU5MWRFVjRjRzhvZEN3Z1lpd2dZeXdnWkNrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvUldGemFXNW5MbWx6Vm1Gc2FXUlFZWEpoYlhNb2RDd2dZaXdnWXl3Z1pDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCMElEMDlQU0JrSUQ4Z1lpQXJJR01nT2lCaklDb2dLQzFOWVhSb0xuQnZkeWd5TENBdE1UQWdLaUIwSUM4Z1pDa2dLeUF4S1NBcklHSTdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnVG1GT08xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lFVmhjMmx1Wnk1bFlYTmxTVzVQZFhSRmVIQnZJRDBnWm5WdVkzUnBiMjRnWldGelpVbHVUM1YwUlhod2J5aDBMQ0JpTENCakxDQmtLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaEZZWE5wYm1jdWFYTldZV3hwWkZCaGNtRnRjeWgwTENCaUxDQmpMQ0JrS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tIUWdQVDA5SURBcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1lqdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMElEMDlQU0JrS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdJZ0t5QmpPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tDaDBJQzg5SUdRZ0x5QXlLU0E4SURFcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1l5QXZJRElnS2lCTllYUm9MbkJ2ZHlneUxDQXhNQ0FxSUNoMElDMGdNU2twSUNzZ1lqdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQmpJQzhnTWlBcUlDZ3RUV0YwYUM1d2IzY29NaXdnTFRFd0lDb2dMUzEwS1NBcklESXBJQ3NnWWp0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQk9ZVTQ3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0I5TzF4dVhHNGdJQ0FnUldGemFXNW5MbVZoYzJWSmJrTnBjbU1nUFNCbWRXNWpkR2x2YmlCbFlYTmxTVzVEYVhKaktIUXNJR0lzSUdNc0lHUXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tFVmhjMmx1Wnk1cGMxWmhiR2xrVUdGeVlXMXpLSFFzSUdJc0lHTXNJR1FwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdMV01nS2lBb1RXRjBhQzV6Y1hKMEtERWdMU0FvZENBdlBTQmtLU0FxSUhRcElDMGdNU2tnS3lCaU8xeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRTVoVGp0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwN1hHNWNiaUFnSUNCRllYTnBibWN1WldGelpVOTFkRU5wY21NZ1BTQm1kVzVqZEdsdmJpQmxZWE5sVDNWMFEybHlZeWgwTENCaUxDQmpMQ0JrS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hGWVhOcGJtY3VhWE5XWVd4cFpGQmhjbUZ0Y3loMExDQmlMQ0JqTENCa0tTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdNZ0tpQk5ZWFJvTG5OeGNuUW9NU0F0SUNoMElEMGdkQ0F2SUdRZ0xTQXhLU0FxSUhRcElDc2dZanRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCT1lVNDdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdSV0Z6YVc1bkxtVmhjMlZKYms5MWRFTnBjbU1nUFNCbWRXNWpkR2x2YmlCbFlYTmxTVzVQZFhSRGFYSmpLSFFzSUdJc0lHTXNJR1FwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLRVZoYzJsdVp5NXBjMVpoYkdsa1VHRnlZVzF6S0hRc0lHSXNJR01zSUdRcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9LSFFnTHowZ1pDQXZJRElwSUR3Z01Ta2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQXRZeUF2SURJZ0tpQW9UV0YwYUM1emNYSjBLREVnTFNCMElDb2dkQ2tnTFNBeEtTQXJJR0k3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWXlBdklESWdLaUFvVFdGMGFDNXpjWEowS0RFZ0xTQW9kQ0F0UFNBeUtTQXFJSFFwSUNzZ01Ta2dLeUJpTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlFNWhUanRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDA3WEc1Y2JpQWdJQ0JGWVhOcGJtY3VaV0Z6WlVsdVJXeGhjM1JwWXlBOUlHWjFibU4wYVc5dUlHVmhjMlZKYmtWc1lYTjBhV01vZEN3Z1lpd2dZeXdnWkNrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvUldGemFXNW5MbWx6Vm1Gc2FXUlFZWEpoYlhNb2RDd2dZaXdnWXl3Z1pDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ6SUQwZ01TNDNNREUxT0R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCd0lEMGdNRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJoSUQwZ1l6dGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaDBJRDA5UFNBd0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHSTdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb0tIUWdMejBnWkNrZ1BUMDlJREVwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWWlBcklHTTdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb0lYQXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J3SUQwZ1pDQXFJQzR6TzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR0VnUENCTllYUm9MbUZpY3loaktTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR0VnUFNCak8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITWdQU0J3SUM4Z05EdGNiaUFnSUNBZ0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY3lBOUlIQWdMeUFvTWlBcUlFMWhkR2d1VUVrcElDb2dUV0YwYUM1aGMybHVLR01nTHlCaEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQXRLR0VnS2lCTllYUm9MbkJ2ZHlneUxDQXhNQ0FxSUNoMElDMDlJREVwS1NBcUlFMWhkR2d1YzJsdUtDaDBJQ29nWkNBdElITXBJQ29nS0RJZ0tpQk5ZWFJvTGxCSktTQXZJSEFwS1NBcklHSTdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnVG1GT08xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lFVmhjMmx1Wnk1bFlYTmxUM1YwUld4aGMzUnBZeUE5SUdaMWJtTjBhVzl1SUdWaGMyVlBkWFJGYkdGemRHbGpLSFFzSUdJc0lHTXNJR1FwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLRVZoYzJsdVp5NXBjMVpoYkdsa1VHRnlZVzF6S0hRc0lHSXNJR01zSUdRcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjeUE5SURFdU56QXhOVGc3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnY0NBOUlEQTdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdZU0E5SUdNN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2RDQTlQVDBnTUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCaU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NoMElDODlJR1FwSUQwOVBTQXhLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR0lnS3lCak8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NGd0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjQ0E5SUdRZ0tpQXVNenRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaGhJRHdnVFdGMGFDNWhZbk1vWXlrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmhJRDBnWXp0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeklEMGdjQ0F2SURRN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE1nUFNCd0lDOGdLRElnS2lCTllYUm9MbEJKS1NBcUlFMWhkR2d1WVhOcGJpaGpJQzhnWVNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1lTQXFJRTFoZEdndWNHOTNLRElzSUMweE1DQXFJSFFwSUNvZ1RXRjBhQzV6YVc0b0tIUWdLaUJrSUMwZ2N5a2dLaUFvTWlBcUlFMWhkR2d1VUVrcElDOGdjQ2tnS3lCaklDc2dZanRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCT1lVNDdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdSV0Z6YVc1bkxtVmhjMlZKYms5MWRFVnNZWE4wYVdNZ1BTQm1kVzVqZEdsdmJpQmxZWE5sU1c1UGRYUkZiR0Z6ZEdsaktIUXNJR0lzSUdNc0lHUXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tFVmhjMmx1Wnk1cGMxWmhiR2xrVUdGeVlXMXpLSFFzSUdJc0lHTXNJR1FwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2N5QTlJREV1TnpBeE5UZzdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjQ0E5SURBN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1lTQTlJR003WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvZENBOVBUMGdNQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJpTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ2gwSUM4OUlHUWdMeUF5S1NBOVBUMGdNaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJpSUNzZ1l6dGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNnaGNDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEFnUFNCa0lDb2dLQzR6SUNvZ01TNDFLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaGhJRHdnVFdGMGFDNWhZbk1vWXlrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmhJRDBnWXp0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeklEMGdjQ0F2SURRN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE1nUFNCd0lDOGdLRElnS2lCTllYUm9MbEJKS1NBcUlFMWhkR2d1WVhOcGJpaGpJQzhnWVNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvZENBOElERXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdMUzQxSUNvZ0tHRWdLaUJOWVhSb0xuQnZkeWd5TENBeE1DQXFJQ2gwSUMwOUlERXBLU0FxSUUxaGRHZ3VjMmx1S0NoMElDb2daQ0F0SUhNcElDb2dLRElnS2lCTllYUm9MbEJKS1NBdklIQXBLU0FySUdJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1lTQXFJRTFoZEdndWNHOTNLRElzSUMweE1DQXFJQ2gwSUMwOUlERXBLU0FxSUUxaGRHZ3VjMmx1S0NoMElDb2daQ0F0SUhNcElDb2dLRElnS2lCTllYUm9MbEJKS1NBdklIQXBJQ29nTGpVZ0t5QmpJQ3NnWWp0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQk9ZVTQ3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0I5TzF4dVhHNGdJQ0FnUldGemFXNW5MbVZoYzJWSmJrSmhZMnNnUFNCbWRXNWpkR2x2YmlCbFlYTmxTVzVDWVdOcktIUXNJR0lzSUdNc0lHUXNJSE1wSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLRVZoYzJsdVp5NXBjMVpoYkdsa1VHRnlZVzF6S0hRc0lHSXNJR01zSUdRc0lITXBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvY3lBOVBUMGdkVzVrWldacGJtVmtLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY3lBOUlERXVOekF4TlRnN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1l5QXFJQ2gwSUM4OUlHUXBJQ29nZENBcUlDZ29jeUFySURFcElDb2dkQ0F0SUhNcElDc2dZanRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCT1lVNDdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdSV0Z6YVc1bkxtVmhjMlZQZFhSQ1lXTnJJRDBnWm5WdVkzUnBiMjRnWldGelpVOTFkRUpoWTJzb2RDd2dZaXdnWXl3Z1pDd2djeWtnZTF4dUlDQWdJQ0FnSUNCcFppQW9SV0Z6YVc1bkxtbHpWbUZzYVdSUVlYSmhiWE1vZEN3Z1lpd2dZeXdnWkN3Z2N5a3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2h6SUQwOVBTQjFibVJsWm1sdVpXUXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6SUQwZ01TNDNNREUxT0R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCaklDb2dLQ2gwSUQwZ2RDQXZJR1FnTFNBeEtTQXFJSFFnS2lBb0tITWdLeUF4S1NBcUlIUWdLeUJ6S1NBcklERXBJQ3NnWWp0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQk9ZVTQ3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0I5TzF4dVhHNGdJQ0FnUldGemFXNW5MbVZoYzJWSmJrOTFkRUpoWTJzZ1BTQm1kVzVqZEdsdmJpQmxZWE5sU1c1UGRYUkNZV05yS0hRc0lHSXNJR01zSUdRc0lITXBJSHRjYmlBZ0lDQWdJQ0FnYVdZZ0tFVmhjMmx1Wnk1cGMxWmhiR2xrVUdGeVlXMXpLSFFzSUdJc0lHTXNJR1FzSUhNcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9jeUE5UFQwZ2RXNWtaV1pwYm1Wa0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjeUE5SURFdU56QXhOVGc3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9LSFFnTHowZ1pDQXZJRElwSUR3Z01Ta2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQmpJQzhnTWlBcUlDaDBJQ29nZENBcUlDZ29LSE1nS2owZ01TNDFNalVwSUNzZ01Ta2dLaUIwSUMwZ2N5a3BJQ3NnWWp0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCaklDOGdNaUFxSUNnb2RDQXRQU0F5S1NBcUlIUWdLaUFvS0NoeklDbzlJREV1TlRJMUtTQXJJREVwSUNvZ2RDQXJJSE1wSUNzZ01pa2dLeUJpTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlFNWhUanRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDA3WEc1Y2JpQWdJQ0JGWVhOcGJtY3VaV0Z6WlVsdVFtOTFibU5sSUQwZ1puVnVZM1JwYjI0Z1pXRnpaVWx1UW05MWJtTmxLSFFzSUdJc0lHTXNJR1FwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLRVZoYzJsdVp5NXBjMVpoYkdsa1VHRnlZVzF6S0hRc0lHSXNJR01zSUdRcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWXlBdElFVmhjMmx1Wnk1bFlYTmxUM1YwUW05MWJtTmxLR1FnTFNCMExDQXdMQ0JqTENCa0tTQXJJR0k3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1RtRk9PMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVHRjYmx4dUlDQWdJRVZoYzJsdVp5NWxZWE5sVDNWMFFtOTFibU5sSUQwZ1puVnVZM1JwYjI0Z1pXRnpaVTkxZEVKdmRXNWpaU2gwTENCaUxDQmpMQ0JrS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hGWVhOcGJtY3VhWE5XWVd4cFpGQmhjbUZ0Y3loMExDQmlMQ0JqTENCa0tTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ2gwSUM4OUlHUXBJRHdnTVNBdklESXVOelVwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWXlBcUlDZzNMalUyTWpVZ0tpQjBJQ29nZENrZ0t5QmlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaDBJRHdnTWlBdklESXVOelVwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWXlBcUlDZzNMalUyTWpVZ0tpQW9kQ0F0UFNBeExqVWdMeUF5TGpjMUtTQXFJSFFnS3lBdU56VXBJQ3NnWWp0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvZENBOElESXVOU0F2SURJdU56VXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdZeUFxSUNnM0xqVTJNalVnS2lBb2RDQXRQU0F5TGpJMUlDOGdNaTQzTlNrZ0tpQjBJQ3NnTGprek56VXBJQ3NnWWp0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHTWdLaUFvTnk0MU5qSTFJQ29nS0hRZ0xUMGdNaTQyTWpVZ0x5QXlMamMxS1NBcUlIUWdLeUF1T1RnME16YzFLU0FySUdJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1RtRk9PMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVHRjYmx4dUlDQWdJRVZoYzJsdVp5NWxZWE5sU1c1UGRYUkNiM1Z1WTJVZ1BTQm1kVzVqZEdsdmJpQmxZWE5sU1c1UGRYUkNiM1Z1WTJVb2RDd2dZaXdnWXl3Z1pDa2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb1JXRnphVzVuTG1selZtRnNhV1JRWVhKaGJYTW9kQ3dnWWl3Z1l5d2daQ2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoMElEd2daQ0F2SURJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1JXRnphVzVuTG1WaGMyVkpia0p2ZFc1alpTaDBJQ29nTWl3Z01Dd2dZeXdnWkNrZ0tpQXVOU0FySUdJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1JXRnphVzVuTG1WaGMyVlBkWFJDYjNWdVkyVW9kQ0FxSURJZ0xTQmtMQ0F3TENCakxDQmtLU0FxSUM0MUlDc2dZeUFxSUM0MUlDc2dZanRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCT1lVNDdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdjbVYwZFhKdUlFVmhjMmx1Wnp0Y2JuMG9LVHRjYmx4dVpYaHdiM0owY3k1a1pXWmhkV3gwSUQwZ1JXRnphVzVuTzF4dVhHNUZZWE5wYm1jdVpHVm1JRDBnWENKbFlYTmxUM1YwVVhWaFpGd2lPMXh1WEc1Y2JpOHZMeTh2THk4dkx5OHZMeTh2THk4dkwxeHVMeThnVjBWQ1VFRkRTeUJHVDA5VVJWSmNiaTh2SUM0dmJHbGlMMVYwYVd4elFXNXBiV0YwYVc5dVJXRnphVzVuTG5SelhHNHZMeUJ0YjJSMWJHVWdhV1FnUFNBM1hHNHZMeUJ0YjJSMWJHVWdZMmgxYm10eklEMGdNU0F5SURNaUxDSmNJblZ6WlNCemRISnBZM1JjSWp0Y2JpOHFLbHh1SUNvZ1EyeGhjM01nWm05eUlIZHZjbXRwYm1jZ2QybDBhQ0JpY205M2MyVnlYRzRnS2k5Y2JseHVaWGh3YjNKMGN5NWZYMlZ6VFc5a2RXeGxJRDBnZEhKMVpUdGNibHh1Wm5WdVkzUnBiMjRnWDJOc1lYTnpRMkZzYkVOb1pXTnJLR2x1YzNSaGJtTmxMQ0JEYjI1emRISjFZM1J2Y2lrZ2V5QnBaaUFvSVNocGJuTjBZVzVqWlNCcGJuTjBZVzVqWlc5bUlFTnZibk4wY25WamRHOXlLU2tnZXlCMGFISnZkeUJ1WlhjZ1ZIbHdaVVZ5Y205eUtGd2lRMkZ1Ym05MElHTmhiR3dnWVNCamJHRnpjeUJoY3lCaElHWjFibU4wYVc5dVhDSXBPeUI5SUgxY2JseHVkbUZ5SUVKeWIzZHpaWElnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ1puVnVZM1JwYjI0Z1FuSnZkM05sY2lncElIdGNiaUFnSUNBZ0lDQWdYMk5zWVhOelEyRnNiRU5vWldOcktIUm9hWE1zSUVKeWIzZHpaWElwTzF4dUlDQWdJSDFjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVkbGRDQmljbTkzYzJWeUlHbHVabTljYmlBZ0lDQWdLaUJBY21WMGRYSnVJSHQ3WW5KdmQzTmxjam9nYzNSeWFXNW5MQ0J0YjJKcGJHVTZJR0p2YjJ4bFlXNHNJSFpsY25OcGIyNDZJSE4wY21sdVozMTlYRzRnSUNBZ0lDb3ZYRzRnSUNBZ1FuSnZkM05sY2k1blpYUkpibVp2SUQwZ1puVnVZM1JwYjI0Z1oyVjBTVzVtYnlncElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdKeWIzZHpaWEk2SUVKeWIzZHpaWEl1WjJWMFRtRnRaU2dwTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdiVzlpYVd4bE9pQkNjbTkzYzJWeUxtbHpUVzlpYVd4bEtDa3NYRzRnSUNBZ0lDQWdJQ0FnSUNCMlpYSnphVzl1T2lCQ2NtOTNjMlZ5TG1kbGRGWmxjbk5wYjI0b0tWeHVJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lIMDdYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dSMlYwSUdKeWIzZHpaWElnYm1GdFpWeHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UzTjBjbWx1WjMxY2JpQWdJQ0FnS2k5Y2JseHVYRzRnSUNBZ1FuSnZkM05sY2k1blpYUk9ZVzFsSUQwZ1puVnVZM1JwYjI0Z1oyVjBUbUZ0WlNncElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUdKeWIzZHpaWElnUFNCMmIybGtJREE3WEc0Z0lDQWdJQ0FnSUdsbUlDaENjbTkzYzJWeUxtbHpUM0JsY21Fb0tTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1luSnZkM05sY2lBOUlGd2lUM0JsY21GY0lqdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2hDY205M2MyVnlMbWx6VDNCbGNtRk9aWGNvS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWW5KdmQzTmxjaUE5SUZ3aVQzQmxjbUZjSWp0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaENjbTkzYzJWeUxtbHpUVk5KUlNncEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCaWNtOTNjMlZ5SUQwZ1hDSk5hV055YjNOdlpuUWdTVzUwWlhKdVpYUWdSWGh3Ykc5eVpYSmNJanRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNoQ2NtOTNjMlZ5TG1selRWTkpSVTVsZHlncEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCaWNtOTNjMlZ5SUQwZ1hDSk5hV055YjNOdlpuUWdTVzUwWlhKdVpYUWdSWGh3Ykc5eVpYSmNJanRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNoQ2NtOTNjMlZ5TG1selEyaHliMjFsS0NrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdKeWIzZHpaWElnUFNCY0lrTm9jbTl0WlZ3aU8xeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2FXWWdLRUp5YjNkelpYSXVhWE5HYVhKbFptOTRLQ2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR0p5YjNkelpYSWdQU0JjSWtacGNtVm1iM2hjSWp0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaENjbTkzYzJWeUxtbHpVMkZtWVhKcEtDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHSnliM2R6WlhJZ1BTQmNJbE5oWm1GeWFWd2lPMXh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0VKeWIzZHpaWEl1YVhOUGRHaGxjaWdwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JpY205M2MyVnlJRDBnUW5KdmQzTmxjaTVuWlhSUGRHaGxjazVoYldVb0tUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdZbkp2ZDNObGNqdGNiaUFnSUNCOU8xeHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFZGxkQ0JpY205M2MyVnlJSFpsY25OcGIyNWNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlIdHpkSEpwYm1kOVhHNGdJQ0FnSUNvdlhHNWNibHh1SUNBZ0lFSnliM2R6WlhJdVoyVjBWbVZ5YzJsdmJpQTlJR1oxYm1OMGFXOXVJR2RsZEZabGNuTnBiMjRvS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUIyWlhKemFXOXVJRDBnZG05cFpDQXdPMXh1SUNBZ0lDQWdJQ0JwWmlBb1FuSnZkM05sY2k1cGMwOXdaWEpoS0NrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhabGNuTnBiMjRnUFNCQ2NtOTNjMlZ5TG1kbGRFOXdaWEpoVm1WeWMybHZiaWdwTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tFSnliM2R6WlhJdWFYTlBjR1Z5WVU1bGR5Z3BLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJaWEp6YVc5dUlEMGdRbkp2ZDNObGNpNW5aWFJQY0dWeVlVNWxkMVpsY25OcGIyNG9LVHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNoQ2NtOTNjMlZ5TG1selRWTkpSU2dwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWlhKemFXOXVJRDBnUW5KdmQzTmxjaTVuWlhSTlUwbEZWbVZ5YzJsdmJpZ3BPMXh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0VKeWIzZHpaWEl1YVhOTlUwbEZUbVYzS0NrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhabGNuTnBiMjRnUFNCQ2NtOTNjMlZ5TG1kbGRFMVRTVVZPWlhkV1pYSnphVzl1S0NrN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9Rbkp2ZDNObGNpNXBjME5vY205dFpTZ3BLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJaWEp6YVc5dUlEMGdRbkp2ZDNObGNpNW5aWFJEYUhKdmJXVldaWEp6YVc5dUtDazdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvUW5KdmQzTmxjaTVwYzBacGNtVm1iM2dvS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZG1WeWMybHZiaUE5SUVKeWIzZHpaWEl1WjJWMFJtbHlaV1p2ZUZabGNuTnBiMjRvS1R0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaENjbTkzYzJWeUxtbHpVMkZtWVhKcEtDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmxjbk5wYjI0Z1BTQkNjbTkzYzJWeUxtZGxkRk5oWm1GeWFWWmxjbk5wYjI0b0tUdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2hDY205M2MyVnlMbWx6VDNSb1pYSW9LU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkbVZ5YzJsdmJpQTlJRUp5YjNkelpYSXVaMlYwVDNSb1pYSldaWEp6YVc5dUtDazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFpsY25OcGIyNDdYRzRnSUNBZ2ZUdGNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQlVjbWx0SUdKeWIzZHpaWElnZG1WeWMybHZibHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjJaWEp6YVc5dVhHNGdJQ0FnSUNvZ1FISmxkSFZ5YmlCN2MzUnlhVzVuZlZ4dUlDQWdJQ0FxTDF4dVhHNWNiaUFnSUNCQ2NtOTNjMlZ5TG5SeWFXMVdaWEp6YVc5dUlEMGdablZ1WTNScGIyNGdkSEpwYlZabGNuTnBiMjRvZG1WeWMybHZiaWtnZTF4dUlDQWdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlIWmxjbk5wYjI0Z1BUMDlJRndpYzNSeWFXNW5YQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCamFHRnljeUE5SUZ0Y0lqdGNJaXdnWENJZ1hDSXNJRndpS1Z3aVhUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdadmNpQW9kbUZ5SUY5cGRHVnlZWFJ2Y2lBOUlHTm9ZWEp6TENCZmFYTkJjbkpoZVNBOUlFRnljbUY1TG1selFYSnlZWGtvWDJsMFpYSmhkRzl5S1N3Z1gya2dQU0F3TENCZmFYUmxjbUYwYjNJZ1BTQmZhWE5CY25KaGVTQS9JRjlwZEdWeVlYUnZjaUE2SUY5cGRHVnlZWFJ2Y2x0VGVXMWliMnd1YVhSbGNtRjBiM0pkS0NrN095a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCZmNtVm1PMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tGOXBjMEZ5Y21GNUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaGZhU0ErUFNCZmFYUmxjbUYwYjNJdWJHVnVaM1JvS1NCaWNtVmhhenRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1gzSmxaaUE5SUY5cGRHVnlZWFJ2Y2x0ZmFTc3JYVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCZmFTQTlJRjlwZEdWeVlYUnZjaTV1WlhoMEtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaGZhUzVrYjI1bEtTQmljbVZoYXp0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdYM0psWmlBOUlGOXBMblpoYkhWbE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCamFHRnlJRDBnWDNKbFpqdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCcGVDQTlJSFpsY25OcGIyNHVhVzVrWlhoUFppaGphR0Z5S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9hWGdnSVQwOUlDMHhLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIWmxjbk5wYjI0Z1BTQjJaWEp6YVc5dUxuTjFZbk4wY21sdVp5Z3dMQ0JwZUNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlIWmxjbk5wYjI0N1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdYQ0pjSWp0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwN1hHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1EyaGxZMnNnYVdZZ2FYUWdhWE1nYlc5aWFXeGxYRzRnSUNBZ0lDb2dRSEpsZEhWeWJpQjdZbTl2YkdWaGJuMWNiaUFnSUNBZ0tpOWNibHh1WEc0Z0lDQWdRbkp2ZDNObGNpNXBjMDF2WW1sc1pTQTlJR1oxYm1OMGFXOXVJR2x6VFc5aWFXeGxLQ2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnS0M5TmIySnBiR1Y4YldsdWFYeEdaVzV1WldOOFFXNWtjbTlwWkh4cFVDaGhaSHh2Wkh4b2IyNWxLUzh1ZEdWemRDaHVZWFpwWjJGMGIzSXVZWEJ3Vm1WeWMybHZiaWxjYmlBZ0lDQWdJQ0FnS1R0Y2JpQWdJQ0I5TzF4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVOb1pXTnJJR2xtSUdsMElHbHpJRzl3WlhKaElHSnliM2R6WlhKY2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0aWIyOXNaV0Z1ZlZ4dUlDQWdJQ0FxTDF4dVhHNWNiaUFnSUNCQ2NtOTNjMlZ5TG1selQzQmxjbUVnUFNCbWRXNWpkR2x2YmlCcGMwOXdaWEpoS0NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2JtRjJhV2RoZEc5eUxuVnpaWEpCWjJWdWRDNXBibVJsZUU5bUtGd2lUM0JsY21GY0lpa2dJVDA5SUMweE8xeHVJQ0FnSUgwN1hHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1IyVjBJRzl3WlhKaElHSnliM2R6WlhJZ2RtVnljMmx2Ymx4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnZTNOMGNtbHVaMzFjYmlBZ0lDQWdLaTljYmx4dVhHNGdJQ0FnUW5KdmQzTmxjaTVuWlhSUGNHVnlZVlpsY25OcGIyNGdQU0JtZFc1amRHbHZiaUJuWlhSUGNHVnlZVlpsY25OcGIyNG9LU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQjJaWEpQWm1aelpYUWdQU0J1WVhacFoyRjBiM0l1ZFhObGNrRm5aVzUwTG1sdVpHVjRUMllvWENKUGNHVnlZVndpS1R0Y2JpQWdJQ0FnSUNBZ2RtRnlJSFpsY25OcGIyNGdQU0J1WVhacFoyRjBiM0l1ZFhObGNrRm5aVzUwTG5OMVluTjBjbWx1WnloMlpYSlBabVp6WlhRZ0t5QTJLVHRjYmlBZ0lDQWdJQ0FnZG1WeVQyWm1jMlYwSUQwZ2JtRjJhV2RoZEc5eUxuVnpaWEpCWjJWdWRDNXBibVJsZUU5bUtGd2lWbVZ5YzJsdmJsd2lLVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIWmxjazltWm5ObGRDQWhQVDBnTFRFcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhabGNuTnBiMjRnUFNCdVlYWnBaMkYwYjNJdWRYTmxja0ZuWlc1MExuTjFZbk4wY21sdVp5aDJaWEpQWm1aelpYUWdLeUE0S1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1FuSnZkM05sY2k1MGNtbHRWbVZ5YzJsdmJpaDJaWEp6YVc5dUtUdGNiaUFnSUNCOU8xeHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFTm9aV05ySUdsbUlHbDBJR2x6SUc5d1pYSmhJRzVsZHlCaWNtOTNjMlZ5WEc0Z0lDQWdJQ29nUUhKbGRIVnliaUI3WW05dmJHVmhibjFjYmlBZ0lDQWdLaTljYmx4dVhHNGdJQ0FnUW5KdmQzTmxjaTVwYzA5d1pYSmhUbVYzSUQwZ1puVnVZM1JwYjI0Z2FYTlBjR1Z5WVU1bGR5Z3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJRzVoZG1sbllYUnZjaTUxYzJWeVFXZGxiblF1YVc1a1pYaFBaaWhjSWs5UVVsd2lLU0FoUFQwZ0xURTdYRzRnSUNBZ2ZUdGNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQkhaWFFnYjNCbGNtRWdibVYzSUdKeWIzZHpaWElnZG1WeWMybHZibHh1SUNBZ0lDQXFJRUJ5WlhSMWNtNGdlM04wY21sdVozMWNiaUFnSUNBZ0tpOWNibHh1WEc0Z0lDQWdRbkp2ZDNObGNpNW5aWFJQY0dWeVlVNWxkMVpsY25OcGIyNGdQU0JtZFc1amRHbHZiaUJuWlhSUGNHVnlZVTVsZDFabGNuTnBiMjRvS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUIyWlhKUFptWnpaWFFnUFNCdVlYWnBaMkYwYjNJdWRYTmxja0ZuWlc1MExtbHVaR1Y0VDJZb1hDSlBVRkpjSWlrN1hHNGdJQ0FnSUNBZ0lIWmhjaUIyWlhKemFXOXVJRDBnYm1GMmFXZGhkRzl5TG5WelpYSkJaMlZ1ZEM1emRXSnpkSEpwYm1jb2RtVnlUMlptYzJWMElDc2dOQ2s3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJDY205M2MyVnlMblJ5YVcxV1pYSnphVzl1S0habGNuTnBiMjRwTzF4dUlDQWdJSDA3WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUTJobFkyc2dhV1lnYVhRZ2FYTWdiWE5wWlNCaWNtOTNjMlZ5WEc0Z0lDQWdJQ29nUUhKbGRIVnliaUI3WW05dmJHVmhibjFjYmlBZ0lDQWdLaTljYmx4dVhHNGdJQ0FnUW5KdmQzTmxjaTVwYzAxVFNVVWdQU0JtZFc1amRHbHZiaUJwYzAxVFNVVW9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ1WVhacFoyRjBiM0l1ZFhObGNrRm5aVzUwTG1sdVpHVjRUMllvWENKTlUwbEZYQ0lwSUNFOVBTQXRNVHRjYmlBZ0lDQjlPMXh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRWRsZENCdGMybGxJR0p5YjNkelpYSWdkbVZ5YzJsdmJseHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UzTjBjbWx1WjMxY2JpQWdJQ0FnS2k5Y2JseHVYRzRnSUNBZ1FuSnZkM05sY2k1blpYUk5VMGxGVm1WeWMybHZiaUE5SUdaMWJtTjBhVzl1SUdkbGRFMVRTVVZXWlhKemFXOXVLQ2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdkbVZ5VDJabWMyVjBJRDBnYm1GMmFXZGhkRzl5TG5WelpYSkJaMlZ1ZEM1cGJtUmxlRTltS0Z3aVRWTkpSVndpS1R0Y2JpQWdJQ0FnSUNBZ2RtRnlJSFpsY25OcGIyNGdQU0J1WVhacFoyRjBiM0l1ZFhObGNrRm5aVzUwTG5OMVluTjBjbWx1WnloMlpYSlBabVp6WlhRZ0t5QTFLVHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJRUp5YjNkelpYSXVkSEpwYlZabGNuTnBiMjRvZG1WeWMybHZiaWs3WEc0Z0lDQWdmVHRjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJEYUdWamF5QnBaaUJwZENCcGN5QnRjMmxsSUc1bGR5QmljbTkzYzJWeVhHNGdJQ0FnSUNvZ1FISmxkSFZ5YmlCN1ltOXZiR1ZoYm4xY2JpQWdJQ0FnS2k5Y2JseHVYRzRnSUNBZ1FuSnZkM05sY2k1cGMwMVRTVVZPWlhjZ1BTQm1kVzVqZEdsdmJpQnBjMDFUU1VWT1pYY29LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ1WVhacFoyRjBiM0l1ZFhObGNrRm5aVzUwTG1sdVpHVjRUMllvWENKVWNtbGtaVzUwTDF3aUtTQWhQVDBnTFRFN1hHNGdJQ0FnZlR0Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCSFpYUWdiWE5wWlNCdVpYY2dZbkp2ZDNObGNpQjJaWEp6YVc5dVhHNGdJQ0FnSUNvZ1FISmxkSFZ5YmlCN2MzUnlhVzVuZlZ4dUlDQWdJQ0FxTDF4dVhHNWNiaUFnSUNCQ2NtOTNjMlZ5TG1kbGRFMVRTVVZPWlhkV1pYSnphVzl1SUQwZ1puVnVZM1JwYjI0Z1oyVjBUVk5KUlU1bGQxWmxjbk5wYjI0b0tTQjdYRzRnSUNBZ0lDQWdJSFpoY2lCMlpYSnphVzl1SUQwZ2JtRjJhV2RoZEc5eUxuVnpaWEpCWjJWdWRDNXpkV0p6ZEhKcGJtY29ibUYyYVdkaGRHOXlMblZ6WlhKQloyVnVkQzVwYm1SbGVFOW1LRndpY25ZNlhDSXBJQ3NnTXlrN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCQ2NtOTNjMlZ5TG5SeWFXMVdaWEp6YVc5dUtIWmxjbk5wYjI0cE8xeHVJQ0FnSUgwN1hHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1EyaGxZMnNnYVdZZ2FYUWdhWE1nWTJoeWIyMWxJR0p5YjNkelpYSmNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlIdGliMjlzWldGdWZWeHVJQ0FnSUNBcUwxeHVYRzVjYmlBZ0lDQkNjbTkzYzJWeUxtbHpRMmh5YjIxbElEMGdablZ1WTNScGIyNGdhWE5EYUhKdmJXVW9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ1WVhacFoyRjBiM0l1ZFhObGNrRm5aVzUwTG1sdVpHVjRUMllvWENKRGFISnZiV1ZjSWlrZ0lUMDlJQzB4TzF4dUlDQWdJSDA3WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUjJWMElHTm9jbTl0WlNCaWNtOTNjMlZ5SUhabGNuTnBiMjVjYmlBZ0lDQWdLaUJBY21WMGRYSnVJSHR6ZEhKcGJtZDlYRzRnSUNBZ0lDb3ZYRzVjYmx4dUlDQWdJRUp5YjNkelpYSXVaMlYwUTJoeWIyMWxWbVZ5YzJsdmJpQTlJR1oxYm1OMGFXOXVJR2RsZEVOb2NtOXRaVlpsY25OcGIyNG9LU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQjJaWEpQWm1aelpYUWdQU0J1WVhacFoyRjBiM0l1ZFhObGNrRm5aVzUwTG1sdVpHVjRUMllvWENKRGFISnZiV1ZjSWlrN1hHNGdJQ0FnSUNBZ0lIWmhjaUIyWlhKemFXOXVJRDBnYm1GMmFXZGhkRzl5TG5WelpYSkJaMlZ1ZEM1emRXSnpkSEpwYm1jb2RtVnlUMlptYzJWMElDc2dOeWs3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJDY205M2MyVnlMblJ5YVcxV1pYSnphVzl1S0habGNuTnBiMjRwTzF4dUlDQWdJSDA3WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUTJobFkyc2dhV1lnYVhRZ2FYTWdjMkZtWVhKcElHSnliM2R6WlhKY2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0aWIyOXNaV0Z1ZlZ4dUlDQWdJQ0FxTDF4dVhHNWNiaUFnSUNCQ2NtOTNjMlZ5TG1selUyRm1ZWEpwSUQwZ1puVnVZM1JwYjI0Z2FYTlRZV1poY21rb0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnVZWFpwWjJGMGIzSXVkWE5sY2tGblpXNTBMbWx1WkdWNFQyWW9YQ0pUWVdaaGNtbGNJaWtnSVQwOUlDMHhJQ1ltSUc1aGRtbG5ZWFJ2Y2k1MWMyVnlRV2RsYm5RdWFXNWtaWGhQWmloY0lrTm9jbTl0WlZ3aUtTQTlQVDBnTFRFN1hHNGdJQ0FnZlR0Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCSFpYUWdjMkZtWVhKcElHSnliM2R6WlhJZ2RtVnljMmx2Ymx4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnZTNOMGNtbHVaMzFjYmlBZ0lDQWdLaTljYmx4dVhHNGdJQ0FnUW5KdmQzTmxjaTVuWlhSVFlXWmhjbWxXWlhKemFXOXVJRDBnWm5WdVkzUnBiMjRnWjJWMFUyRm1ZWEpwVm1WeWMybHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJSFpsY2s5bVpuTmxkQ0E5SUc1aGRtbG5ZWFJ2Y2k1MWMyVnlRV2RsYm5RdWFXNWtaWGhQWmloY0lsTmhabUZ5YVZ3aUtUdGNiaUFnSUNBZ0lDQWdkbUZ5SUhabGNuTnBiMjRnUFNCdVlYWnBaMkYwYjNJdWRYTmxja0ZuWlc1MExuTjFZbk4wY21sdVp5aDJaWEpQWm1aelpYUWdLeUEzS1R0Y2JpQWdJQ0FnSUNBZ2RtVnlUMlptYzJWMElEMGdibUYyYVdkaGRHOXlMblZ6WlhKQloyVnVkQzVwYm1SbGVFOW1LRndpVm1WeWMybHZibHdpS1R0Y2JpQWdJQ0FnSUNBZ2FXWWdLSFpsY2s5bVpuTmxkQ0FoUFQwZ0xURXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmxjbk5wYjI0Z1BTQnVZWFpwWjJGMGIzSXVkWE5sY2tGblpXNTBMbk4xWW5OMGNtbHVaeWgyWlhKUFptWnpaWFFnS3lBNEtUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdRbkp2ZDNObGNpNTBjbWx0Vm1WeWMybHZiaWgyWlhKemFXOXVLVHRjYmlBZ0lDQjlPMXh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRU5vWldOcklHbG1JR2wwSUdseklHWnBjbVZtYjNnZ1luSnZkM05sY2x4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnZTJKdmIyeGxZVzU5WEc0Z0lDQWdJQ292WEc1Y2JseHVJQ0FnSUVKeWIzZHpaWEl1YVhOR2FYSmxabTk0SUQwZ1puVnVZM1JwYjI0Z2FYTkdhWEpsWm05NEtDa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdibUYyYVdkaGRHOXlMblZ6WlhKQloyVnVkQzVwYm1SbGVFOW1LRndpUm1seVpXWnZlRndpS1NBaFBUMGdMVEU3WEc0Z0lDQWdmVHRjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJIWlhRZ1ptbHlaV1p2ZUNCaWNtOTNjMlZ5SUhabGNuTnBiMjVjYmlBZ0lDQWdLaUJBY21WMGRYSnVJSHR6ZEhKcGJtZDlYRzRnSUNBZ0lDb3ZYRzVjYmx4dUlDQWdJRUp5YjNkelpYSXVaMlYwUm1seVpXWnZlRlpsY25OcGIyNGdQU0JtZFc1amRHbHZiaUJuWlhSR2FYSmxabTk0Vm1WeWMybHZiaWdwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJSFpsY2s5bVpuTmxkQ0E5SUc1aGRtbG5ZWFJ2Y2k1MWMyVnlRV2RsYm5RdWFXNWtaWGhQWmloY0lrWnBjbVZtYjNoY0lpazdYRzRnSUNBZ0lDQWdJSFpoY2lCMlpYSnphVzl1SUQwZ2JtRjJhV2RoZEc5eUxuVnpaWEpCWjJWdWRDNXpkV0p6ZEhKcGJtY29kbVZ5VDJabWMyVjBJQ3NnT0NrN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCQ2NtOTNjMlZ5TG5SeWFXMVdaWEp6YVc5dUtIWmxjbk5wYjI0cE8xeHVJQ0FnSUgwN1hHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1EyaGxZMnNnYVdZZ2FYUWdhWE1nYjNSb1pYSWdZbkp2ZDNObGNseHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UySnZiMnhsWVc1OVhHNGdJQ0FnSUNvdlhHNWNibHh1SUNBZ0lFSnliM2R6WlhJdWFYTlBkR2hsY2lBOUlHWjFibU4wYVc5dUlHbHpUM1JvWlhJb0tTQjdYRzRnSUNBZ0lDQWdJSFpoY2lCdVlXMWxUMlptYzJWMElEMGdibUYyYVdkaGRHOXlMblZ6WlhKQloyVnVkQzVzWVhOMFNXNWtaWGhQWmloY0lpQmNJaWtnS3lBeE8xeHVJQ0FnSUNBZ0lDQjJZWElnZG1WeVQyWm1jMlYwSUQwZ2JtRjJhV2RoZEc5eUxuVnpaWEpCWjJWdWRDNXNZWE4wU1c1a1pYaFBaaWhjSWk5Y0lpazdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnVZVzFsVDJabWMyVjBJRHdnZG1WeVQyWm1jMlYwTzF4dUlDQWdJSDA3WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUjJWMElHOTBhR1Z5SUdKeWIzZHpaWElnYm1GdFpWeHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UzTjBjbWx1WjMxY2JpQWdJQ0FnS2k5Y2JseHVYRzRnSUNBZ1FuSnZkM05sY2k1blpYUlBkR2hsY2s1aGJXVWdQU0JtZFc1amRHbHZiaUJuWlhSUGRHaGxjazVoYldVb0tTQjdYRzRnSUNBZ0lDQWdJSFpoY2lCdVlXMWxUMlptYzJWMElEMGdibUYyYVdkaGRHOXlMblZ6WlhKQloyVnVkQzVzWVhOMFNXNWtaWGhQWmloY0lpQmNJaWtnS3lBeE8xeHVJQ0FnSUNBZ0lDQjJZWElnZG1WeVQyWm1jMlYwSUQwZ2JtRjJhV2RoZEc5eUxuVnpaWEpCWjJWdWRDNXNZWE4wU1c1a1pYaFBaaWhjSWk5Y0lpazdYRzRnSUNBZ0lDQWdJSFpoY2lCaWNtOTNjMlZ5SUQwZ2JtRjJhV2RoZEc5eUxuVnpaWEpCWjJWdWRDNXpkV0p6ZEhKcGJtY29ibUZ0WlU5bVpuTmxkQ3dnZG1WeVQyWm1jMlYwS1R0Y2JpQWdJQ0FnSUNBZ2FXWWdLR0p5YjNkelpYSXVkRzlNYjNkbGNrTmhjMlVvS1NBOVBUMGdZbkp2ZDNObGNpNTBiMVZ3Y0dWeVEyRnpaU2dwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JpY205M2MyVnlJRDBnYm1GMmFXZGhkRzl5TG1Gd2NFNWhiV1U3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdKeWIzZHpaWEk3WEc0Z0lDQWdmVHRjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJIWlhRZ2IzUm9aWElnWW5KdmQzTmxjaUIyWlhKemFXOXVYRzRnSUNBZ0lDb2dRSEpsZEhWeWJpQjdjM1J5YVc1bmZWeHVJQ0FnSUNBcUwxeHVYRzVjYmlBZ0lDQkNjbTkzYzJWeUxtZGxkRTkwYUdWeVZtVnljMmx2YmlBOUlHWjFibU4wYVc5dUlHZGxkRTkwYUdWeVZtVnljMmx2YmlncElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUc1aGJXVlBabVp6WlhRZ1BTQnVZWFpwWjJGMGIzSXVkWE5sY2tGblpXNTBMbXhoYzNSSmJtUmxlRTltS0Z3aUlGd2lLU0FySURFN1hHNGdJQ0FnSUNBZ0lIWmhjaUIyWlhKUFptWnpaWFFnUFNCdVlYWnBaMkYwYjNJdWRYTmxja0ZuWlc1MExteGhjM1JKYm1SbGVFOW1LRndpTDF3aUtUdGNiaUFnSUNBZ0lDQWdkbUZ5SUhabGNuTnBiMjRnUFNCdVlYWnBaMkYwYjNJdWRYTmxja0ZuWlc1MExuTjFZbk4wY21sdVp5aDJaWEpQWm1aelpYUWdLeUF4S1R0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUVKeWIzZHpaWEl1ZEhKcGJWWmxjbk5wYjI0b2RtVnljMmx2YmlrN1hHNGdJQ0FnZlR0Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCRGFHVmpheUJpY205M2MyVnlJSE4xY0hCdmNuUmNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlIdGliMjlzWldGdWZWeHVJQ0FnSUNBcUwxeHVYRzVjYmlBZ0lDQkNjbTkzYzJWeUxtbHpVM1Z3Y0c5eWRHVmtJRDBnWm5WdVkzUnBiMjRnYVhOVGRYQndiM0owWldRb0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQWhRbkp2ZDNObGNpNXBjMDFUU1VVb0tTQjhmQ0J3WVhKelpVbHVkQ2hDY205M2MyVnlMbWRsZEUxVFNVVldaWEp6YVc5dUtDa3NJREV3S1NBK0lEZzdYRzRnSUNBZ2ZUdGNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQkRhR1ZqYXlCcFppQnBkQ0JwY3lCWFpXSkxhWFFnWW5KdmQzTmxjbHh1SUNBZ0lDQXFJRUJ5WlhSMWNtNGdlMkp2YjJ4bFlXNTlYRzRnSUNBZ0lDb3ZYRzVjYmx4dUlDQWdJRUp5YjNkelpYSXVhWE5YWldKTGFYUWdQU0JtZFc1amRHbHZiaUJwYzFkbFlrdHBkQ2dwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUc1aGRtbG5ZWFJ2Y2k1MWMyVnlRV2RsYm5RdWFXNWtaWGhQWmloY0lrRndjR3hsVjJWaVMybDBMMXdpS1NBaFBUMGdMVEU3WEc0Z0lDQWdmVHRjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJEYUdWamF5QnBaaUJwZENCcGN5QkhaV05yYnlCaWNtOTNjMlZ5WEc0Z0lDQWdJQ29nUUhKbGRIVnliaUI3WW05dmJHVmhibjFjYmlBZ0lDQWdLaTljYmx4dVhHNGdJQ0FnUW5KdmQzTmxjaTVwYzBkbFkydHZJRDBnWm5WdVkzUnBiMjRnYVhOSFpXTnJieWdwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUc1aGRtbG5ZWFJ2Y2k1MWMyVnlRV2RsYm5RdWFXNWtaWGhQWmloY0lrZGxZMnR2WENJcElENGdMVEVnSmlZZ2JtRjJhV2RoZEc5eUxuVnpaWEpCWjJWdWRDNXBibVJsZUU5bUtGd2lTMGhVVFV4Y0lpa2dQVDA5SUMweE8xeHVJQ0FnSUgwN1hHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1EyaGxZMnNnYVdZZ2FYUWdhWE1nUVc1a2NtOXBaQ0JpY205M2MyVnlYRzRnSUNBZ0lDb2dRSEpsZEhWeWJpQjdZbTl2YkdWaGJuMWNiaUFnSUNBZ0tpOWNibHh1WEc0Z0lDQWdRbkp2ZDNObGNpNXBjMEZ1WkhKdmFXUWdQU0JtZFc1amRHbHZiaUJwYzBGdVpISnZhV1FvS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCdVlYWnBaMkYwYjNJdWRYTmxja0ZuWlc1MExtbHVaR1Y0VDJZb1hDSkJibVJ5YjJsa1hDSXBJRDRnTFRFN1hHNGdJQ0FnZlR0Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCRGFHVmpheUJwWmlCcGRDQnBjeUJNYVc1MWVDQmljbTkzYzJWeVhHNGdJQ0FnSUNvZ1FISmxkSFZ5YmlCN1ltOXZiR1ZoYm4xY2JpQWdJQ0FnS2k5Y2JseHVYRzRnSUNBZ1FuSnZkM05sY2k1cGMweHBiblY0SUQwZ1puVnVZM1JwYjI0Z2FYTk1hVzUxZUNncElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHNWhkbWxuWVhSdmNpNTFjMlZ5UVdkbGJuUXVhVzVrWlhoUFppaGNJa3hwYm5WNFhDSXBJRDRnTFRFN1hHNGdJQ0FnZlR0Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCRGFHVmpheUJwWmlCcGRDQnBjeUJwVUdGa0lHSnliM2R6WlhKY2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0aWIyOXNaV0Z1ZlZ4dUlDQWdJQ0FxTDF4dVhHNWNiaUFnSUNCQ2NtOTNjMlZ5TG1selZHRmliR1YwVUVNZ1BTQm1kVzVqZEdsdmJpQnBjMVJoWW14bGRGQkRLQ2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYm1GMmFXZGhkRzl5TG5WelpYSkJaMlZ1ZEM1cGJtUmxlRTltS0Z3aWFWQmhaRndpS1NBK0lDMHhPMXh1SUNBZ0lIMDdYRzVjYmlBZ0lDQnlaWFIxY200Z1FuSnZkM05sY2p0Y2JuMG9LVHRjYmx4dVpYaHdiM0owY3k1a1pXWmhkV3gwSUQwZ1FuSnZkM05sY2p0Y2JseHVYRzR2THk4dkx5OHZMeTh2THk4dkx5OHZMeTljYmk4dklGZEZRbEJCUTBzZ1JrOVBWRVZTWEc0dkx5QXVMMnhwWWk5VmRHbHNjMEp5YjNkelpYSXVkSE5jYmk4dklHMXZaSFZzWlNCcFpDQTlJRGhjYmk4dklHMXZaSFZzWlNCamFIVnVhM01nUFNBeElESWdNeUlzSWx3aWRYTmxJSE4wY21samRGd2lPMXh1WEc1bGVIQnZjblJ6TGw5ZlpYTk5iMlIxYkdVZ1BTQjBjblZsTzF4dVhHNTJZWElnWDNSNWNHVnZaaUE5SUhSNWNHVnZaaUJUZVcxaWIyd2dQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpQW1KaUIwZVhCbGIyWWdVM2x0WW05c0xtbDBaWEpoZEc5eUlEMDlQU0JjSW5ONWJXSnZiRndpSUQ4Z1puVnVZM1JwYjI0Z0tHOWlhaWtnZXlCeVpYUjFjbTRnZEhsd1pXOW1JRzlpYWpzZ2ZTQTZJR1oxYm1OMGFXOXVJQ2h2WW1vcElIc2djbVYwZFhKdUlHOWlhaUFtSmlCMGVYQmxiMllnVTNsdFltOXNJRDA5UFNCY0ltWjFibU4wYVc5dVhDSWdKaVlnYjJKcUxtTnZibk4wY25WamRHOXlJRDA5UFNCVGVXMWliMndnSmlZZ2IySnFJQ0U5UFNCVGVXMWliMnd1Y0hKdmRHOTBlWEJsSUQ4Z1hDSnplVzFpYjJ4Y0lpQTZJSFI1Y0dWdlppQnZZbW83SUgwN1hHNWNibVoxYm1OMGFXOXVJRjlqYkdGemMwTmhiR3hEYUdWamF5aHBibk4wWVc1alpTd2dRMjl1YzNSeWRXTjBiM0lwSUhzZ2FXWWdLQ0VvYVc1emRHRnVZMlVnYVc1emRHRnVZMlZ2WmlCRGIyNXpkSEoxWTNSdmNpa3BJSHNnZEdoeWIzY2dibVYzSUZSNWNHVkZjbkp2Y2loY0lrTmhibTV2ZENCallXeHNJR0VnWTJ4aGMzTWdZWE1nWVNCbWRXNWpkR2x2Ymx3aUtUc2dmU0I5WEc1Y2JuWmhjaUJWVWt3Z1BTQnlaWEYxYVhKbEtGd2lkWEpzWENJcE8xeHVMeW9xWEc0Z0tpQkRiR0Z6Y3lCbWIzSWdkMjl5YTJsdVp5QjNhWFJvSUdOdmIydHBaVnh1SUNvdlhHNWNiblpoY2lCRGIyOXJhV1VnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUdaMWJtTjBhVzl1SUVOdmIydHBaU2dwSUh0Y2JpQWdJQ0JmWTJ4aGMzTkRZV3hzUTJobFkyc29kR2hwY3l3Z1EyOXZhMmxsS1R0Y2JpQWdmVnh1WEc0Z0lDOHFLbHh1SUNBZ0tpQlVhR1VnYldWMGFHOWtJSEpsZEhWeWJuTWdkR2hsSUdac1lXY2dkMmhsZEdobGNpQnpkWEJ3YjNKMFpXUWdkR2hwY3lCemRHOXlZV2RsSUhSNWNHVWdiM0lnYm05MFhHNGdJQ0FxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlZ4dUlDQWdLaTljYmlBZ1EyOXZhMmxsTG1selUzVndjRzl5ZEdWa0lEMGdablZ1WTNScGIyNGdhWE5UZFhCd2IzSjBaV1FvS1NCN1hHNGdJQ0FnY21WMGRYSnVJQ2gwZVhCbGIyWWdaRzlqZFcxbGJuUWdQVDA5SUZ3aWRXNWtaV1pwYm1Wa1hDSWdQeUJjSW5WdVpHVm1hVzVsWkZ3aUlEb2dYM1I1Y0dWdlppaGtiMk4xYldWdWRDa3BJRDA5UFNCY0ltOWlhbVZqZEZ3aUlDWW1JSFI1Y0dWdlppQmtiMk4xYldWdWRDNWpiMjlyYVdVZ1BUMDlJRndpYzNSeWFXNW5YQ0k3WEc0Z0lIMDdYRzRnSUM4cUtseHVJQ0FnS2lCVWFHVWdiV1YwYUc5a0lITmxkSE1nZEdobElIWmhiSFZsSUdGdVpDQnlaWFIxY201eklIUnlkV1VnYVdZZ2FYUWdhR0Z6SUdKbFpXNGdjMlYwWEc0Z0lDQXFJRUJ3WVhKaGJTQmphR1ZqYTFOMWNIQnZjblFnZTJKdmIyeGxZVzU5WEc0Z0lDQXFJRUJ3WVhKaGJTQnJaWGtnZTNOMGNtbHVaMzFjYmlBZ0lDb2dRSEJoY21GdElIWmhiSFZsSUh0emRISnBibWQ5WEc0Z0lDQXFJRUJ3WVhKaGJTQmxlSEJwY21WeklIdHVkVzFpWlhKOVhHNGdJQ0FxSUVCd1lYSmhiU0J3WVhSb0lIdHpkSEpwYm1kOVhHNGdJQ0FxSUVCd1lYSmhiU0JrYjIxaGFXNGdlM04wY21sdVozMWNiaUFnSUNvZ1FIQmhjbUZ0SUhObFkzVnlaU0I3WW05dmJHVmhibjFjYmlBZ0lDb2dRSEpsZEhWeWJpQjdZbTl2YkdWaGJuMWNiaUFnSUNvdlhHNWNibHh1SUNCRGIyOXJhV1V1YzJWMFNYUmxiU0E5SUdaMWJtTjBhVzl1SUhObGRFbDBaVzBvWTJobFkydFRkWEJ3YjNKMExDQnJaWGtzSUhaaGJIVmxLU0I3WEc0Z0lDQWdkbUZ5SUdWNGNHbHlaWE1nUFNCaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvSUQ0Z015QW1KaUJoY21kMWJXVnVkSE5iTTEwZ0lUMDlJSFZ1WkdWbWFXNWxaQ0EvSUdGeVozVnRaVzUwYzFzelhTQTZJRE13TzF4dUlDQWdJSFpoY2lCd1lYUm9JRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURRZ0ppWWdZWEpuZFcxbGJuUnpXelJkSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTkYwZ09pQmNJaTljSWp0Y2JpQWdJQ0IyWVhJZ1pHOXRZV2x1SUQwZ1lYSm5kVzFsYm5SekxteGxibWQwYUNBK0lEVWdKaVlnWVhKbmRXMWxiblJ6V3pWZElDRTlQU0IxYm1SbFptbHVaV1FnUHlCaGNtZDFiV1Z1ZEhOYk5WMGdPaUJzYjJOaGRHbHZiaTVvYjNOMGJtRnRaVHRjYmlBZ0lDQjJZWElnYzJWamRYSmxJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURZZ0ppWWdZWEpuZFcxbGJuUnpXelpkSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTmwwZ09pQnNiMk5oZEdsdmJpNXdjbTkwYjJOdmJDQTlQVDBnWENKb2RIUndjenBjSWp0Y2JseHVJQ0FnSUhSeWVTQjdYRzRnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FxSUZaaGJHbGtZWFJsSUdsdWNIVjBJR1JoZEdGY2JpQWdJQ0FnSUNBcUwxeHVJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQmphR1ZqYTFOMWNIQnZjblFnUFQwOUlGd2lZbTl2YkdWaGJsd2lJQ1ltSUhSNWNHVnZaaUJyWlhrZ1BUMDlJRndpYzNSeWFXNW5YQ0lnSmlZZ1EyOXZhMmxsTG5KbFoxWmhiR2xrUzJWNUxuUmxjM1FvYTJWNUtTQW1KaUIwZVhCbGIyWWdkbUZzZFdVZ1BUMDlJRndpYzNSeWFXNW5YQ0lnSmlZZ2RIbHdaVzltSUdWNGNHbHlaWE1nUFQwOUlGd2liblZ0WW1WeVhDSWdKaVlnWlhod2FYSmxjeUE4SURNMk5TQW1KaUIwZVhCbGIyWWdjR0YwYUNBOVBUMGdYQ0p6ZEhKcGJtZGNJaUFtSmlCMGVYQmxiMllnWkc5dFlXbHVJRDA5UFNCY0luTjBjbWx1WjF3aUlDWW1JR1J2YldGcGJpNXBibVJsZUU5bUtHeHZZMkYwYVc5dUxtaHZjM1J1WVcxbEtTQWhQVDBnTFRFZ0ppWWdkSGx3Wlc5bUlITmxZM1Z5WlNBOVBUMGdYQ0ppYjI5c1pXRnVYQ0lnSmlZZ2MyVmpkWEpsSUQwOVBTQW9iRzlqWVhScGIyNHVjSEp2ZEc5amIyd2dQVDA5SUZ3aWFIUjBjSE02WENJcEtTQjdYRzRnSUNBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNBZ0tpQldZV3hwWkdGMFpTQnBibkIxZENCa1lYUmhYRzRnSUNBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnSUNCMllYSWdkU0E5SUZWU1RDNXdZWEp6WlNoY0ltaDBkSEE2THk5Y0lpQXJJR1J2YldGcGJpQXJJSEJoZEdncE8xeHVJQ0FnSUNBZ0lDQnBaaUFvZFM1b2IzTjBibUZ0WlNBOVBUMGdaRzl0WVdsdUlIeDhJSFV1Y0dGMGFDQTlQVDBnY0dGMGFDa2dlMXh1SUNBZ0lDQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDQWdJQ0FxSUVsbUlIUm9ZWFFnYzNSdmNtVWdhWE1nYzNWd2NHOXlkR1ZrWEc0Z0lDQWdJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tDRmphR1ZqYTFOMWNIQnZjblFnZkh3Z1EyOXZhMmxsTG1selUzVndjRzl5ZEdWa0tDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDb2dVMkYyWlNCamIyOXJhV1Z6SUdadmNpQXpNQ0JrWVhselhHNGdJQ0FnSUNBZ0lDQWdJQ0FnS2lCQWRIbHdaU0I3UkdGMFpYMWNiaUFnSUNBZ0lDQWdJQ0FnSUNBcUwxeHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHUmhkR1VnUFNCdVpYY2dSR0YwWlNncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWkdGMFpTNXpaWFJVYVcxbEtHUmhkR1V1WjJWMFZHbHRaU2dwSUNzZ1pYaHdhWEpsY3lBcUlESTBJQ29nTmpBZ0tpQTJNQ0FxSURFd01EQXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR1Y0Y0NBOUlHUmhkR1V1ZEc5VlZFTlRkSEpwYm1jb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNvZ1JXNWpiMlJsSUhaaGJIVmxJR1p2Y2lCemRHOXlaVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDb2dRSFI1Y0dVZ2UzTjBjbWx1WjMxY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZzZFdVZ1BTQmxibU52WkdWVlVrbERiMjF3YjI1bGJuUW9kbUZzZFdVcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnS2lCWGNtbDBhVzVuSUhaaGJIVmxJSFJ2SUhSb1pTQmtiMk4xYldWdWRDQmpiMjlyYVdVZ2MzUnZjbUZuWlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ29nUUhSNWNHVWdlM04wY21sdVozMWNiaUFnSUNBZ0lDQWdJQ0FnSUNBcUwxeHVJQ0FnSUNBZ0lDQWdJQ0FnWkc5amRXMWxiblF1WTI5dmEybGxJRDBnYTJWNUlDc2dYQ0k5WENJZ0t5QjJZV3gxWlNBcklDaGxlSEFnUHlCY0lqc2daWGh3YVhKbGN6MWNJaUFySUdWNGNDQTZJRndpWENJcElDc2dLSEJoZEdnZ1B5QmNJanNnY0dGMGFEMWNJaUFySUhCaGRHZ2dPaUJjSWx3aUtTQXJJQ2hrYjIxaGFXNGdQeUJjSWpzZ1pHOXRZV2x1UFZ3aUlDc2daRzl0WVdsdUlEb2dYQ0pjSWlrZ0t5QW9jMlZqZFhKbElEOGdYQ0k3SUhObFkzVnlaVndpSURvZ1hDSmNJaWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FnSUNBZ0lDQXFJRWxtSUdGc2JDQnZheUJ5WlhSMWNtNGdkSEoxWlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1EyOXZhMmxsTG1kbGRFbDBaVzBvWTJobFkydFRkWEJ3YjNKMExDQnJaWGtwSUQwOVBTQjJZV3gxWlR0Y2JpQWdJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnS2lCSlppQmpiMjlyYVdVZ1pHOWxjeUJ1YjNRZ2MzVndjRzl5ZEdWa0lISmxkSFZ5YmlCbVlXeHpaVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ0FnSUNBcUlFbG1JR2x1Y0hWMElHUmhkR0VnYVhNZ2JtOTBJSFpoYkdsa1hHNGdJQ0FnSUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBZ0lDb2dTV1lnYVc1d2RYUWdaR0YwWVNCcGN5QnViM1FnZG1Gc2FXUmNiaUFnSUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOUlHTmhkR05vSUNobEtTQjdYRzRnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FxSUVsbUlITnZiV1YwYUdsdVp5Qm5iMlZ6SUhkeWIyNW5JSEpsZEhWeWJpQm1ZV3h6WlZ4dUlDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUNBZ2ZWeHVJQ0I5TzF4dUlDQXZLaXBjYmlBZ0lDb2dWR2hsSUcxbGRHaHZaQ0J5WldGa2N5QjBhR1VnZG1Gc2RXVWdZVzVrSUhKbGRIVnlibk1nYVhRZ2IzSWdjbVYwZFhKdWN5Qm1ZV3h6WlNCcFppQjBhR1VnZG1Gc2RXVWdaRzlsY3lCdWIzUWdaWGhwYzNSY2JpQWdJQ29nUUhCaGNtRnRJR05vWldOclUzVndjRzl5ZENCN1ltOXZiR1ZoYm4xY2JpQWdJQ29nUUhCaGNtRnRJR3RsZVNCN2MzUnlhVzVuZlZ4dUlDQWdLaUJBY21WMGRYSnVjeUI3YzNSeWFXNW5mR0p2YjJ4bFlXNTlYRzRnSUNBcUwxeHVYRzVjYmlBZ1EyOXZhMmxsTG1kbGRFbDBaVzBnUFNCbWRXNWpkR2x2YmlCblpYUkpkR1Z0S0dOb1pXTnJVM1Z3Y0c5eWRDd2dhMlY1S1NCN1hHNGdJQ0FnZEhKNUlIdGNiaUFnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ29nVm1Gc2FXUmhkR1VnYVc1d2RYUWdaR0YwWVZ4dUlDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNCcFppQW9kSGx3Wlc5bUlHTm9aV05yVTNWd2NHOXlkQ0E5UFQwZ1hDSmliMjlzWldGdVhDSWdKaVlnZEhsd1pXOW1JR3RsZVNBOVBUMGdYQ0p6ZEhKcGJtZGNJaUFtSmlCRGIyOXJhV1V1Y21WblZtRnNhV1JMWlhrdWRHVnpkQ2hyWlhrcEtTQjdYRzRnSUNBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNBZ0tpQkpaaUIwYUdGMElITjBiM0psSUdseklITjFjSEJ2Y25SbFpGeHVJQ0FnSUNBZ0lDQWdLaTljYmlBZ0lDQWdJQ0FnYVdZZ0tDRmphR1ZqYTFOMWNIQnZjblFnZkh3Z1EyOXZhMmxsTG1selUzVndjRzl5ZEdWa0tDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ0FnS2lCSFpYUWdkR2hsSUdGeWNtRjVJR1p5YjIwZ1pHOWpkVzFsYm5RZ1kyOXZhMmxsSUhOd2JHbDBJR0o1SUR0Y2JpQWdJQ0FnSUNBZ0lDQWdLaUJBZEhsd1pTQjdjM1J5YVc1blcxMTlYRzRnSUNBZ0lDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNBZ0lDQWdkbUZ5SUdGeWNrTnZiMnRwWlNBOUlHUnZZM1Z0Wlc1MExtTnZiMnRwWlM1emNHeHBkQ2hjSWp0Y0lpazdYRzRnSUNBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQWdJQ29nU1hSbGNtRjBaU0IwYUhKdmRXZG9JSFJvWlNCamIyOXJhV1Z6WEc0Z0lDQWdJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQWdJQ0FnWm05eUlDaDJZWElnWDJsMFpYSmhkRzl5SUQwZ1lYSnlRMjl2YTJsbExDQmZhWE5CY25KaGVTQTlJRUZ5Y21GNUxtbHpRWEp5WVhrb1gybDBaWEpoZEc5eUtTd2dYMmtnUFNBd0xDQmZhWFJsY21GMGIzSWdQU0JmYVhOQmNuSmhlU0EvSUY5cGRHVnlZWFJ2Y2lBNklGOXBkR1Z5WVhSdmNsdFRlVzFpYjJ3dWFYUmxjbUYwYjNKZEtDazdPeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUY5eVpXWTdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hmYVhOQmNuSmhlU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1gya2dQajBnWDJsMFpYSmhkRzl5TG14bGJtZDBhQ2tnWW5KbFlXczdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lGOXlaV1lnUFNCZmFYUmxjbUYwYjNKYlgya3JLMTA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCZmFTQTlJRjlwZEdWeVlYUnZjaTV1WlhoMEtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hmYVM1a2IyNWxLU0JpY21WaGF6dGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ1gzSmxaaUE5SUY5cExuWmhiSFZsTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnYVNBOUlGOXlaV1k3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ29nVkhKcGJTQmhibVFnYzNCc2FYUWdaV0ZqYUNCamIyOXJhV1VnWW5rZ1BTQm1iM0lnYTJWNUlIWmhiSFZsSUhCaGNtVmNiaUFnSUNBZ0lDQWdJQ0FnSUNBcUlFQjBlWEJsSUh0emRISnBibWRiWFgxY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUhZZ1BTQnBMblJ5YVcwb0tTNXpjR3hwZENoY0lqMWNJaXdnTWlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FxSUVsbUlHbDBJR2x6SUdOdmNuSmxZM1FnWTI5dmEybGxJR3RsZVNCeVpYUjFjbTRnZEdobElIWmhiSFZsWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdLaTljYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gyV3pCZElEMDlQU0JyWlhrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXFJRWxtSUhSb1pTQjJZV3gxWlNCM1lYTWdabTkxYm1RZ2NtVjBkWEp1SUhSb1pTQjJZV3gxWlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR1JsWTI5a1pWVlNTVU52YlhCdmJtVnVkQ2gyV3pGZEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQWdJQ29nU1dZZ2RHaGxJSFpoYkhWbElIZGhjeUJ1YjNRZ1ptOTFibVFnY21WMGRYSnVJR1poYkhObFhHNGdJQ0FnSUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDQWdJQ0FxSUVsbUlHTnZiMnRwWlNCa2IyVnpJRzV2ZENCemRYQndiM0owWldRZ2NtVjBkWEp1SUdaaGJITmxYRzRnSUNBZ0lDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHWmhiSE5sTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ29nU1dZZ2FXNXdkWFFnWkdGMFlTQnBjeUJ1YjNRZ2RtRnNhV1JjYmlBZ0lDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBcUlFbG1JSE52YldWMGFHbHVaeUJuYjJWeklIZHliMjVuSUhKbGRIVnliaUJtWVd4elpWeHVJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQnlaWFIxY200Z1ptRnNjMlU3WEc0Z0lDQWdmVnh1SUNCOU8xeHVJQ0F2S2lwY2JpQWdJQ29nVkdobElHMWxkR2h2WkNCeVpXMXZkbVZ6SUhSb1pTQjJZV3gxWlNCaGJtUWdjbVYwZFhKdUlIUnlkV1VnYVdZZ2RHaGxJSFpoYkhWbElHUnZaWE1nYm05MElHVjRhWE4wWEc0Z0lDQXFJRUJ3WVhKaGJTQmphR1ZqYTFOMWNIQnZjblFnZTJKdmIyeGxZVzU5WEc0Z0lDQXFJRUJ3WVhKaGJTQnJaWGtnZTNOMGNtbHVaMzFjYmlBZ0lDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlYRzRnSUNBcUwxeHVYRzVjYmlBZ1EyOXZhMmxsTG5KbGJXOTJaVWwwWlcwZ1BTQm1kVzVqZEdsdmJpQnlaVzF2ZG1WSmRHVnRLR05vWldOclUzVndjRzl5ZEN3Z2EyVjVLU0I3WEc0Z0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDb2dWbUZzYVdSaGRHVWdhVzV3ZFhRZ1pHRjBZVnh1SUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0JwWmlBb2RIbHdaVzltSUdOb1pXTnJVM1Z3Y0c5eWRDQTlQVDBnWENKaWIyOXNaV0Z1WENJZ0ppWWdkSGx3Wlc5bUlHdGxlU0E5UFQwZ1hDSnpkSEpwYm1kY0lpQW1KaUJEYjI5cmFXVXVjbVZuVm1Gc2FXUkxaWGt1ZEdWemRDaHJaWGtwS1NCN1hHNGdJQ0FnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ0FnS2lCSlppQjBhR0YwSUhOMGIzSmxJR2x6SUhOMWNIQnZjblJsWkZ4dUlDQWdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lDQWdhV1lnS0NGamFHVmphMU4xY0hCdmNuUWdmSHdnUTI5dmEybGxMbWx6VTNWd2NHOXlkR1ZrS0NrcElIdGNiaUFnSUNBZ0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBZ0lDQWdLaUJUWlhRZ1pXMXdkSGtnYjNabGNtUjFaU0IyWVd4MVpTQmllU0JyWlhsY2JpQWdJQ0FnSUNBZ0lDQWdLaTljYmlBZ0lDQWdJQ0FnSUNCRGIyOXJhV1V1YzJWMFNYUmxiU2hqYUdWamExTjFjSEJ2Y25Rc0lHdGxlU3dnWENKY0lpd2dMVEVwTzF4dUlDQWdJQ0FnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ0FnSUNBcUlFbG1JR0ZzYkNCdmF5QnlaWFIxY200Z2RISjFaVnh1SUNBZ0lDQWdJQ0FnSUNBcUwxeHVJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQkRiMjlyYVdVdVoyVjBTWFJsYlNoamFHVmphMU4xY0hCdmNuUXNJR3RsZVNrZ1BUMDlJR1poYkhObE8xeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNBZ0lDQXFJRWxtSUdOdmIydHBaU0JrYjJWeklHNXZkQ0J6ZFhCd2IzSjBaV1FnY21WMGRYSnVJR1poYkhObFhHNGdJQ0FnSUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBZ0lDb2dTV1lnYVc1d2RYUWdaR0YwWVNCcGN5QnViM1FnZG1Gc2FXUmNiaUFnSUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOUlHTmhkR05vSUNobEtTQjdYRzRnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FxSUVsbUlITnZiV1YwYUdsdVp5Qm5iMlZ6SUhkeWIyNW5JSEpsZEhWeWJpQm1ZV3h6WlZ4dUlDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUNBZ2ZWeHVJQ0I5TzF4dUlDQXZLaXBjYmlBZ0lDb2dWR2hsSUcxbGRHaHZaQ0J5WlhSMWNtNXpJSFJvWlNCaGNuSmhlU0J2WmlCemRISnBibWNnYjJZZ1lYWmhhV3hoWW14bElHdGxlWE5jYmlBZ0lDb2dRSEJoY21GdElHTm9aV05yVTNWd2NHOXlkQ0I3WW05dmJHVmhibjFjYmlBZ0lDb2dRSEpsZEhWeWJuTWdlM04wY21sdVoxdGRmVnh1SUNBZ0tpOWNibHh1WEc0Z0lFTnZiMnRwWlM1blpYUkxaWGx6SUQwZ1puVnVZM1JwYjI0Z1oyVjBTMlY1Y3loamFHVmphMU4xY0hCdmNuUXBJSHRjYmlBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0tpQldZV3hwWkdGMFpTQnBibkIxZENCa1lYUmhYRzRnSUNBZ0lDQWdLaTljYmlBZ0lDQWdJR2xtSUNoMGVYQmxiMllnWTJobFkydFRkWEJ3YjNKMElEMDlQU0JjSW1KdmIyeGxZVzVjSWlrZ2UxeHVJQ0FnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FnSUNvZ1NXWWdkR2hoZENCemRHOXlaU0JwY3lCemRYQndiM0owWldSY2JpQWdJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQWdJR2xtSUNnaFkyaGxZMnRUZFhCd2IzSjBJSHg4SUVOdmIydHBaUzVwYzFOMWNIQnZjblJsWkNncEtTQjdYRzRnSUNBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQWdJQ29nVkdobElHRnljbUY1SUc5bUlHRjJZV2xzWVdKc1pTQnJaWGx6WEc0Z0lDQWdJQ0FnSUNBZ0lDb2dRSFI1Y0dVZ2UwRnljbUY1ZlZ4dUlDQWdJQ0FnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdJQ0FnSUhaaGNpQmhjbkpMWlhseklEMGdXMTA3WEc0Z0lDQWdJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdJQ0FnSUNvZ1IyVjBJSFJvWlNCaGNuSmhlU0JtY205dElHUnZZM1Z0Wlc1MElHTnZiMnRwWlNCemNHeHBkQ0JpZVNBN1hHNGdJQ0FnSUNBZ0lDQWdJQ29nUUhSNWNHVWdlM04wY21sdVoxdGRmVnh1SUNBZ0lDQWdJQ0FnSUNBcUwxeHVJQ0FnSUNBZ0lDQWdJSFpoY2lCaGNuSkRiMjlyYVdVZ1BTQmtiMk4xYldWdWRDNWpiMjlyYVdVdWMzQnNhWFFvWENJN1hDSXBPMXh1SUNBZ0lDQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDQWdJQ0FxSUVsMFpYSmhkR1VnZEdoeWIzVm5hQ0IwYUdVZ1kyOXZhMmxsYzF4dUlDQWdJQ0FnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdJQ0FnSUdadmNpQW9kbUZ5SUY5cGRHVnlZWFJ2Y2pJZ1BTQmhjbkpEYjI5cmFXVXNJRjlwYzBGeWNtRjVNaUE5SUVGeWNtRjVMbWx6UVhKeVlYa29YMmwwWlhKaGRHOXlNaWtzSUY5cE1pQTlJREFzSUY5cGRHVnlZWFJ2Y2pJZ1BTQmZhWE5CY25KaGVUSWdQeUJmYVhSbGNtRjBiM0l5SURvZ1gybDBaWEpoZEc5eU1sdFRlVzFpYjJ3dWFYUmxjbUYwYjNKZEtDazdPeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUY5eVpXWXlPMXh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWDJselFYSnlZWGt5S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaGZhVElnUGowZ1gybDBaWEpoZEc5eU1pNXNaVzVuZEdncElHSnlaV0ZyTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0JmY21WbU1pQTlJRjlwZEdWeVlYUnZjakpiWDJreUt5dGRPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnWDJreUlEMGdYMmwwWlhKaGRHOXlNaTV1WlhoMEtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hmYVRJdVpHOXVaU2tnWW5KbFlXczdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lGOXlaV1l5SUQwZ1gya3lMblpoYkhWbE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ2FTQTlJRjl5WldZeU8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ0FnSUNBcUlGUnlhVzBnWVc1a0lITndiR2wwSUdWaFkyZ2dZMjl2YTJsbElHSjVJRDBnWm05eUlHdGxlU0IyWVd4MVpTQndZWEpsWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdLaUJBZEhsd1pTQjdjM1J5YVc1blcxMTlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQjJJRDBnYVM1MGNtbHRLQ2t1YzNCc2FYUW9YQ0k5WENJc0lESXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0tpQkJaR1FnYTJWNUlIUnZJSFJvWlNCc2FYTjBYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaDJXekJkS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUdGeWNrdGxlWE11Y0hWemFDaDJXekJkS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHRnlja3RsZVhNN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnSUNBZ0lDb2dTV1lnWTI5dmEybGxJR1J2WlhNZ2JtOTBJSE4xY0hCdmNuUmxaQ0J5WlhSMWNtNGdabUZzYzJWY2JpQWdJQ0FnSUNBZ0lDQWdLaTljYmlBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnVzEwN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ0FnS2lCSlppQnBibkIxZENCa1lYUmhJR2x6SUc1dmRDQjJZV3hwWkZ4dUlDQWdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlGdGRPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMGdZMkYwWTJnZ0tHVXBJSHRjYmlBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNvZ1NXWWdjMjl0WlhSb2FXNW5JR2R2WlhNZ2QzSnZibWNnY21WMGRYSnVJR1poYkhObFhHNGdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lISmxkSFZ5YmlCYlhUdGNiaUFnSUNCOVhHNGdJSDA3WEc0Z0lDOHFLbHh1SUNBZ0tpQlVhR1VnYldWMGFHOWtJR05zWldGdWN5QjBhR1VnYzNSdmNtRm5aU0JoYm1RZ2NtVjBkWEp1SUhSeWRXVWdhV1lnYVhRZ2FYTWdaVzF3ZEhsY2JpQWdJQ29nUUhCaGNtRnRJR05vWldOclUzVndjRzl5ZENCN1ltOXZiR1ZoYm4xY2JpQWdJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5WEc0Z0lDQXFMMXh1WEc1Y2JpQWdRMjl2YTJsbExtTnNaV0Z5SUQwZ1puVnVZM1JwYjI0Z1kyeGxZWElvWTJobFkydFRkWEJ3YjNKMEtTQjdYRzRnSUNBZ2RISjVJSHRjYmlBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNvZ1ZtRnNhV1JoZEdVZ2FXNXdkWFFnWkdGMFlWeHVJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQnBaaUFvZEhsd1pXOW1JR05vWldOclUzVndjRzl5ZENBOVBUMGdYQ0ppYjI5c1pXRnVYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdJQ0FxSUVsbUlIUm9ZWFFnYzNSdmNtVWdhWE1nYzNWd2NHOXlkR1ZrWEc0Z0lDQWdJQ0FnSUNBcUwxeHVJQ0FnSUNBZ0lDQnBaaUFvSVdOb1pXTnJVM1Z3Y0c5eWRDQjhmQ0JEYjI5cmFXVXVhWE5UZFhCd2IzSjBaV1FvS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFpoY2lCaGNuSkxaWGx6SUQwZ1EyOXZhMmxsTG1kbGRFdGxlWE1vWTJobFkydFRkWEJ3YjNKMEtUdGNiaUFnSUNBZ0lDQWdJQ0JwWmlBb1lYSnlTMlY1Y3lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnWm05eUlDaDJZWElnWDJsMFpYSmhkRzl5TXlBOUlHRnlja3RsZVhNc0lGOXBjMEZ5Y21GNU15QTlJRUZ5Y21GNUxtbHpRWEp5WVhrb1gybDBaWEpoZEc5eU15a3NJRjlwTXlBOUlEQXNJRjlwZEdWeVlYUnZjak1nUFNCZmFYTkJjbkpoZVRNZ1B5QmZhWFJsY21GMGIzSXpJRG9nWDJsMFpYSmhkRzl5TTF0VGVXMWliMnd1YVhSbGNtRjBiM0pkS0NrN095a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnWDNKbFpqTTdYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0Y5cGMwRnljbUY1TXlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hmYVRNZ1BqMGdYMmwwWlhKaGRHOXlNeTVzWlc1bmRHZ3BJR0p5WldGck8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lGOXlaV1l6SUQwZ1gybDBaWEpoZEc5eU0xdGZhVE1ySzEwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWDJreklEMGdYMmwwWlhKaGRHOXlNeTV1WlhoMEtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0Y5cE15NWtiMjVsS1NCaWNtVmhhenRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JmY21WbU15QTlJRjlwTXk1MllXeDFaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCcElEMGdYM0psWmpNN1hHNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ1EyOXZhMmxsTG5KbGJXOTJaVWwwWlcwb1kyaGxZMnRUZFhCd2IzSjBMQ0JwS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnSUNBZ0lDb2dTV1lnWVd4c0lHOXJJSEpsZEhWeWJpQjBjblZsWEc0Z0lDQWdJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRU52YjJ0cFpTNW5aWFJMWlhsektHTm9aV05yVTNWd2NHOXlkQ2t1YkdWdVozUm9JRDA5UFNBd08xeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNBZ0lDQXFJRWxtSUdOdmIydHBaU0JrYjJWeklHNXZkQ0J6ZFhCd2IzSjBaV1FnY21WMGRYSnVJR1poYkhObFhHNGdJQ0FnSUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSeWRXVTdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNBZ0tpQkpaaUJwYm5CMWRDQmtZWFJoSUdseklHNXZkQ0IyWVd4cFpGeHVJQ0FnSUNBZ0lDQWdLaTljYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNBZ0lDOHFLbHh1SUNBZ0lDQWdJQ29nU1dZZ2MyOXRaWFJvYVc1bklHZHZaWE1nZDNKdmJtY2djbVYwZFhKdUlHWmhiSE5sWEc0Z0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnSUNCOVhHNGdJSDA3WEc1Y2JpQWdjbVYwZFhKdUlFTnZiMnRwWlR0Y2JuMG9LVHRjYmx4dVpYaHdiM0owY3k1a1pXWmhkV3gwSUQwZ1EyOXZhMmxsTzF4dVhHNURiMjlyYVdVdWNtVm5WbUZzYVdSTFpYa2dQU0J1WlhjZ1VtVm5SWGh3S0Z3aUtGdGhMWHBCTFZvd0xUbGZMVjE3TVN4OUtWd2lMQ0JjSW1sY0lpazdYRzVjYmx4dUx5OHZMeTh2THk4dkx5OHZMeTh2THk4dlhHNHZMeUJYUlVKUVFVTkxJRVpQVDFSRlVseHVMeThnTGk5c2FXSXZWWFJwYkhORGIyOXJhV1V1ZEhOY2JpOHZJRzF2WkhWc1pTQnBaQ0E5SURsY2JpOHZJRzF2WkhWc1pTQmphSFZ1YTNNZ1BTQXhJRElnTXlJc0lpOHZJRU52Y0hseWFXZG9kQ0JLYjNsbGJuUXNJRWx1WXk0Z1lXNWtJRzkwYUdWeUlFNXZaR1VnWTI5dWRISnBZblYwYjNKekxseHVMeTljYmk4dklGQmxjbTFwYzNOcGIyNGdhWE1nYUdWeVpXSjVJR2R5WVc1MFpXUXNJR1p5WldVZ2IyWWdZMmhoY21kbExDQjBieUJoYm5rZ2NHVnljMjl1SUc5aWRHRnBibWx1WnlCaFhHNHZMeUJqYjNCNUlHOW1JSFJvYVhNZ2MyOW1kSGRoY21VZ1lXNWtJR0Z6YzI5amFXRjBaV1FnWkc5amRXMWxiblJoZEdsdmJpQm1hV3hsY3lBb2RHaGxYRzR2THlCY0lsTnZablIzWVhKbFhDSXBMQ0IwYnlCa1pXRnNJR2x1SUhSb1pTQlRiMlowZDJGeVpTQjNhWFJvYjNWMElISmxjM1J5YVdOMGFXOXVMQ0JwYm1Oc2RXUnBibWRjYmk4dklIZHBkR2h2ZFhRZ2JHbHRhWFJoZEdsdmJpQjBhR1VnY21sbmFIUnpJSFJ2SUhWelpTd2dZMjl3ZVN3Z2JXOWthV1o1TENCdFpYSm5aU3dnY0hWaWJHbHphQ3hjYmk4dklHUnBjM1J5YVdKMWRHVXNJSE4xWW14cFkyVnVjMlVzSUdGdVpDOXZjaUJ6Wld4c0lHTnZjR2xsY3lCdlppQjBhR1VnVTI5bWRIZGhjbVVzSUdGdVpDQjBieUJ3WlhKdGFYUmNiaTh2SUhCbGNuTnZibk1nZEc4Z2QyaHZiU0IwYUdVZ1UyOW1kSGRoY21VZ2FYTWdablZ5Ym1semFHVmtJSFJ2SUdSdklITnZMQ0J6ZFdKcVpXTjBJSFJ2SUhSb1pWeHVMeThnWm05c2JHOTNhVzVuSUdOdmJtUnBkR2x2Ym5NNlhHNHZMMXh1THk4Z1ZHaGxJR0ZpYjNabElHTnZjSGx5YVdkb2RDQnViM1JwWTJVZ1lXNWtJSFJvYVhNZ2NHVnliV2x6YzJsdmJpQnViM1JwWTJVZ2MyaGhiR3dnWW1VZ2FXNWpiSFZrWldSY2JpOHZJR2x1SUdGc2JDQmpiM0JwWlhNZ2IzSWdjM1ZpYzNSaGJuUnBZV3dnY0c5eWRHbHZibk1nYjJZZ2RHaGxJRk52Wm5SM1lYSmxMbHh1THk5Y2JpOHZJRlJJUlNCVFQwWlVWMEZTUlNCSlV5QlFVazlXU1VSRlJDQmNJa0ZUSUVsVFhDSXNJRmRKVkVoUFZWUWdWMEZTVWtGT1ZGa2dUMFlnUVU1WklFdEpUa1FzSUVWWVVGSkZVMU5jYmk4dklFOVNJRWxOVUV4SlJVUXNJRWxPUTB4VlJFbE9SeUJDVlZRZ1RrOVVJRXhKVFVsVVJVUWdWRThnVkVoRklGZEJVbEpCVGxSSlJWTWdUMFpjYmk4dklFMUZVa05JUVU1VVFVSkpURWxVV1N3Z1JrbFVUa1ZUVXlCR1QxSWdRU0JRUVZKVVNVTlZURUZTSUZCVlVsQlBVMFVnUVU1RUlFNVBUa2xPUmxKSlRrZEZUVVZPVkM0Z1NVNWNiaTh2SUU1UElFVldSVTVVSUZOSVFVeE1JRlJJUlNCQlZWUklUMUpUSUU5U0lFTlBVRmxTU1VkSVZDQklUMHhFUlZKVElFSkZJRXhKUVVKTVJTQkdUMUlnUVU1WklFTk1RVWxOTEZ4dUx5OGdSRUZOUVVkRlV5QlBVaUJQVkVoRlVpQk1TVUZDU1V4SlZGa3NJRmRJUlZSSVJWSWdTVTRnUVU0Z1FVTlVTVTlPSUU5R0lFTlBUbFJTUVVOVUxDQlVUMUpVSUU5U1hHNHZMeUJQVkVoRlVsZEpVMFVzSUVGU1NWTkpUa2NnUmxKUFRTd2dUMVZVSUU5R0lFOVNJRWxPSUVOUFRrNUZRMVJKVDA0Z1YwbFVTQ0JVU0VVZ1UwOUdWRmRCVWtVZ1QxSWdWRWhGWEc0dkx5QlZVMFVnVDFJZ1QxUklSVklnUkVWQlRFbE9SMU1nU1U0Z1ZFaEZJRk5QUmxSWFFWSkZMbHh1WEc1MllYSWdjSFZ1ZVdOdlpHVWdQU0J5WlhGMWFYSmxLQ2R3ZFc1NVkyOWtaU2NwTzF4dVhHNWxlSEJ2Y25SekxuQmhjbk5sSUQwZ2RYSnNVR0Z5YzJVN1hHNWxlSEJ2Y25SekxuSmxjMjlzZG1VZ1BTQjFjbXhTWlhOdmJIWmxPMXh1Wlhod2IzSjBjeTV5WlhOdmJIWmxUMkpxWldOMElEMGdkWEpzVW1WemIyeDJaVTlpYW1WamREdGNibVY0Y0c5eWRITXVabTl5YldGMElEMGdkWEpzUm05eWJXRjBPMXh1WEc1bGVIQnZjblJ6TGxWeWJDQTlJRlZ5YkR0Y2JseHVablZ1WTNScGIyNGdWWEpzS0NrZ2UxeHVJQ0IwYUdsekxuQnliM1J2WTI5c0lEMGdiblZzYkR0Y2JpQWdkR2hwY3k1emJHRnphR1Z6SUQwZ2JuVnNiRHRjYmlBZ2RHaHBjeTVoZFhSb0lEMGdiblZzYkR0Y2JpQWdkR2hwY3k1b2IzTjBJRDBnYm5Wc2JEdGNiaUFnZEdocGN5NXdiM0owSUQwZ2JuVnNiRHRjYmlBZ2RHaHBjeTVvYjNOMGJtRnRaU0E5SUc1MWJHdzdYRzRnSUhSb2FYTXVhR0Z6YUNBOUlHNTFiR3c3WEc0Z0lIUm9hWE11YzJWaGNtTm9JRDBnYm5Wc2JEdGNiaUFnZEdocGN5NXhkV1Z5ZVNBOUlHNTFiR3c3WEc0Z0lIUm9hWE11Y0dGMGFHNWhiV1VnUFNCdWRXeHNPMXh1SUNCMGFHbHpMbkJoZEdnZ1BTQnVkV3hzTzF4dUlDQjBhR2x6TG1oeVpXWWdQU0J1ZFd4c08xeHVmVnh1WEc0dkx5QlNaV1psY21WdVkyVTZJRkpHUXlBek9UZzJMQ0JTUmtNZ01UZ3dPQ3dnVWtaRElESXpPVFpjYmx4dUx5OGdaR1ZtYVc1bElIUm9aWE5sSUdobGNtVWdjMjhnWVhRZ2JHVmhjM1FnZEdobGVTQnZibXg1SUdoaGRtVWdkRzhnWW1WY2JpOHZJR052YlhCcGJHVmtJRzl1WTJVZ2IyNGdkR2hsSUdacGNuTjBJRzF2WkhWc1pTQnNiMkZrTGx4dWRtRnlJSEJ5YjNSdlkyOXNVR0YwZEdWeWJpQTlJQzllS0Z0aExYb3dMVGt1S3kxZEt6b3BMMmtzWEc0Z0lDQWdjRzl5ZEZCaGRIUmxjbTRnUFNBdk9sc3dMVGxkS2lRdkxGeHVYRzRnSUNBZ0x5OGdVa1pESURJek9UWTZJR05vWVhKaFkzUmxjbk1nY21WelpYSjJaV1FnWm05eUlHUmxiR2x0YVhScGJtY2dWVkpNY3k1Y2JpQWdJQ0F2THlCWFpTQmhZM1IxWVd4c2VTQnFkWE4wSUdGMWRHOHRaWE5qWVhCbElIUm9aWE5sTGx4dUlDQWdJR1JsYkdsdGN5QTlJRnNuUENjc0lDYytKeXdnSjF3aUp5d2dKMkFuTENBbklDY3NJQ2RjWEhJbkxDQW5YRnh1Snl3Z0oxeGNkQ2RkTEZ4dVhHNGdJQ0FnTHk4Z1VrWkRJREl6T1RZNklHTm9ZWEpoWTNSbGNuTWdibTkwSUdGc2JHOTNaV1FnWm05eUlIWmhjbWx2ZFhNZ2NtVmhjMjl1Y3k1Y2JpQWdJQ0IxYm5kcGMyVWdQU0JiSjNzbkxDQW5mU2NzSUNkOEp5d2dKMXhjWEZ3bkxDQW5YaWNzSUNkZ0oxMHVZMjl1WTJGMEtHUmxiR2x0Y3lrc1hHNWNiaUFnSUNBdkx5QkJiR3h2ZDJWa0lHSjVJRkpHUTNNc0lHSjFkQ0JqWVhWelpTQnZaaUJZVTFNZ1lYUjBZV05yY3k0Z0lFRnNkMkY1Y3lCbGMyTmhjR1VnZEdobGMyVXVYRzRnSUNBZ1lYVjBiMFZ6WTJGd1pTQTlJRnNuWEZ3bkoxMHVZMjl1WTJGMEtIVnVkMmx6WlNrc1hHNGdJQ0FnTHk4Z1EyaGhjbUZqZEdWeWN5QjBhR0YwSUdGeVpTQnVaWFpsY2lCbGRtVnlJR0ZzYkc5M1pXUWdhVzRnWVNCb2IzTjBibUZ0WlM1Y2JpQWdJQ0F2THlCT2IzUmxJSFJvWVhRZ1lXNTVJR2x1ZG1Gc2FXUWdZMmhoY25NZ1lYSmxJR0ZzYzI4Z2FHRnVaR3hsWkN3Z1luVjBJSFJvWlhObFhHNGdJQ0FnTHk4Z1lYSmxJSFJvWlNCdmJtVnpJSFJvWVhRZ1lYSmxJQ3BsZUhCbFkzUmxaQ29nZEc4Z1ltVWdjMlZsYml3Z2MyOGdkMlVnWm1GemRDMXdZWFJvWEc0Z0lDQWdMeThnZEdobGJTNWNiaUFnSUNCdWIyNUliM04wUTJoaGNuTWdQU0JiSnlVbkxDQW5MeWNzSUNjL0p5d2dKenNuTENBbkl5ZGRMbU52Ym1OaGRDaGhkWFJ2UlhOallYQmxLU3hjYmlBZ0lDQm9iM04wUlc1a2FXNW5RMmhoY25NZ1BTQmJKeThuTENBblB5Y3NJQ2NqSjEwc1hHNGdJQ0FnYUc5emRHNWhiV1ZOWVhoTVpXNGdQU0F5TlRVc1hHNGdJQ0FnYUc5emRHNWhiV1ZRWVhKMFVHRjBkR1Z5YmlBOUlDOWVXMkV0ZWpBdE9VRXRXbDh0WFhzd0xEWXpmU1F2TEZ4dUlDQWdJR2h2YzNSdVlXMWxVR0Z5ZEZOMFlYSjBJRDBnTDE0b1cyRXRlakF0T1VFdFdsOHRYWHN3TERZemZTa29MaW9wSkM4c1hHNGdJQ0FnTHk4Z2NISnZkRzlqYjJ4eklIUm9ZWFFnWTJGdUlHRnNiRzkzSUZ3aWRXNXpZV1psWENJZ1lXNWtJRndpZFc1M2FYTmxYQ0lnWTJoaGNuTXVYRzRnSUNBZ2RXNXpZV1psVUhKdmRHOWpiMndnUFNCN1hHNGdJQ0FnSUNBbmFtRjJZWE5qY21sd2RDYzZJSFJ5ZFdVc1hHNGdJQ0FnSUNBbmFtRjJZWE5qY21sd2REb25PaUIwY25WbFhHNGdJQ0FnZlN4Y2JpQWdJQ0F2THlCd2NtOTBiMk52YkhNZ2RHaGhkQ0J1WlhabGNpQm9ZWFpsSUdFZ2FHOXpkRzVoYldVdVhHNGdJQ0FnYUc5emRHeGxjM05RY205MGIyTnZiQ0E5SUh0Y2JpQWdJQ0FnSUNkcVlYWmhjMk55YVhCMEp6b2dkSEoxWlN4Y2JpQWdJQ0FnSUNkcVlYWmhjMk55YVhCME9pYzZJSFJ5ZFdWY2JpQWdJQ0I5TEZ4dUlDQWdJQzh2SUhCeWIzUnZZMjlzY3lCMGFHRjBJR0ZzZDJGNWN5QmpiMjUwWVdsdUlHRWdMeThnWW1sMExseHVJQ0FnSUhOc1lYTm9aV1JRY205MGIyTnZiQ0E5SUh0Y2JpQWdJQ0FnSUNkb2RIUndKem9nZEhKMVpTeGNiaUFnSUNBZ0lDZG9kSFJ3Y3ljNklIUnlkV1VzWEc0Z0lDQWdJQ0FuWm5Sd0p6b2dkSEoxWlN4Y2JpQWdJQ0FnSUNkbmIzQm9aWEluT2lCMGNuVmxMRnh1SUNBZ0lDQWdKMlpwYkdVbk9pQjBjblZsTEZ4dUlDQWdJQ0FnSjJoMGRIQTZKem9nZEhKMVpTeGNiaUFnSUNBZ0lDZG9kSFJ3Y3pvbk9pQjBjblZsTEZ4dUlDQWdJQ0FnSjJaMGNEb25PaUIwY25WbExGeHVJQ0FnSUNBZ0oyZHZjR2hsY2pvbk9pQjBjblZsTEZ4dUlDQWdJQ0FnSjJacGJHVTZKem9nZEhKMVpWeHVJQ0FnSUgwc1hHNGdJQ0FnY1hWbGNubHpkSEpwYm1jZ1BTQnlaWEYxYVhKbEtDZHhkV1Z5ZVhOMGNtbHVaeWNwTzF4dVhHNW1kVzVqZEdsdmJpQjFjbXhRWVhKelpTaDFjbXdzSUhCaGNuTmxVWFZsY25sVGRISnBibWNzSUhOc1lYTm9aWE5FWlc1dmRHVkliM04wS1NCN1hHNGdJR2xtSUNoMWNtd2dKaVlnYVhOUFltcGxZM1FvZFhKc0tTQW1KaUIxY213Z2FXNXpkR0Z1WTJWdlppQlZjbXdwSUhKbGRIVnliaUIxY213N1hHNWNiaUFnZG1GeUlIVWdQU0J1WlhjZ1ZYSnNPMXh1SUNCMUxuQmhjbk5sS0hWeWJDd2djR0Z5YzJWUmRXVnllVk4wY21sdVp5d2djMnhoYzJobGMwUmxibTkwWlVodmMzUXBPMXh1SUNCeVpYUjFjbTRnZFR0Y2JuMWNibHh1VlhKc0xuQnliM1J2ZEhsd1pTNXdZWEp6WlNBOUlHWjFibU4wYVc5dUtIVnliQ3dnY0dGeWMyVlJkV1Z5ZVZOMGNtbHVaeXdnYzJ4aGMyaGxjMFJsYm05MFpVaHZjM1FwSUh0Y2JpQWdhV1lnS0NGcGMxTjBjbWx1WnloMWNtd3BLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRlI1Y0dWRmNuSnZjaWhjSWxCaGNtRnRaWFJsY2lBbmRYSnNKeUJ0ZFhOMElHSmxJR0VnYzNSeWFXNW5MQ0J1YjNRZ1hDSWdLeUIwZVhCbGIyWWdkWEpzS1R0Y2JpQWdmVnh1WEc0Z0lIWmhjaUJ5WlhOMElEMGdkWEpzTzF4dVhHNGdJQzh2SUhSeWFXMGdZbVZtYjNKbElIQnliMk5sWldScGJtY3VYRzRnSUM4dklGUm9hWE1nYVhNZ2RHOGdjM1Z3Y0c5eWRDQndZWEp6WlNCemRIVm1aaUJzYVd0bElGd2lJQ0JvZEhSd09pOHZabTl2TG1OdmJTQWdYRnh1WENKY2JpQWdjbVZ6ZENBOUlISmxjM1F1ZEhKcGJTZ3BPMXh1WEc0Z0lIWmhjaUJ3Y205MGJ5QTlJSEJ5YjNSdlkyOXNVR0YwZEdWeWJpNWxlR1ZqS0hKbGMzUXBPMXh1SUNCcFppQW9jSEp2ZEc4cElIdGNiaUFnSUNCd2NtOTBieUE5SUhCeWIzUnZXekJkTzF4dUlDQWdJSFpoY2lCc2IzZGxjbEJ5YjNSdklEMGdjSEp2ZEc4dWRHOU1iM2RsY2tOaGMyVW9LVHRjYmlBZ0lDQjBhR2x6TG5CeWIzUnZZMjlzSUQwZ2JHOTNaWEpRY205MGJ6dGNiaUFnSUNCeVpYTjBJRDBnY21WemRDNXpkV0p6ZEhJb2NISnZkRzh1YkdWdVozUm9LVHRjYmlBZ2ZWeHVYRzRnSUM4dklHWnBaM1Z5WlNCdmRYUWdhV1lnYVhRbmN5Qm5iM1FnWVNCb2IzTjBYRzRnSUM4dklIVnpaWEpBYzJWeWRtVnlJR2x6SUNwaGJIZGhlWE1xSUdsdWRHVnljSEpsZEdWa0lHRnpJR0VnYUc5emRHNWhiV1VzSUdGdVpDQjFjbXhjYmlBZ0x5OGdjbVZ6YjJ4MWRHbHZiaUIzYVd4c0lIUnlaV0YwSUM4dlptOXZMMkpoY2lCaGN5Qm9iM04wUFdadmJ5eHdZWFJvUFdKaGNpQmlaV05oZFhObElIUm9ZWFFuYzF4dUlDQXZMeUJvYjNjZ2RHaGxJR0p5YjNkelpYSWdjbVZ6YjJ4MlpYTWdjbVZzWVhScGRtVWdWVkpNY3k1Y2JpQWdhV1lnS0hOc1lYTm9aWE5FWlc1dmRHVkliM04wSUh4OElIQnliM1J2SUh4OElISmxjM1F1YldGMFkyZ29MMTVjWEM5Y1hDOWJYa0JjWEM5ZEswQmJYa0JjWEM5ZEt5OHBLU0I3WEc0Z0lDQWdkbUZ5SUhOc1lYTm9aWE1nUFNCeVpYTjBMbk4xWW5OMGNpZ3dMQ0F5S1NBOVBUMGdKeTh2Snp0Y2JpQWdJQ0JwWmlBb2MyeGhjMmhsY3lBbUppQWhLSEJ5YjNSdklDWW1JR2h2YzNSc1pYTnpVSEp2ZEc5amIyeGJjSEp2ZEc5ZEtTa2dlMXh1SUNBZ0lDQWdjbVZ6ZENBOUlISmxjM1F1YzNWaWMzUnlLRElwTzF4dUlDQWdJQ0FnZEdocGN5NXpiR0Z6YUdWeklEMGdkSEoxWlR0Y2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCcFppQW9JV2h2YzNSc1pYTnpVSEp2ZEc5amIyeGJjSEp2ZEc5ZElDWW1YRzRnSUNBZ0lDQW9jMnhoYzJobGN5QjhmQ0FvY0hKdmRHOGdKaVlnSVhOc1lYTm9aV1JRY205MGIyTnZiRnR3Y205MGIxMHBLU2tnZTF4dVhHNGdJQ0FnTHk4Z2RHaGxjbVVuY3lCaElHaHZjM1J1WVcxbExseHVJQ0FnSUM4dklIUm9aU0JtYVhKemRDQnBibk4wWVc1alpTQnZaaUF2TENBL0xDQTdMQ0J2Y2lBaklHVnVaSE1nZEdobElHaHZjM1F1WEc0Z0lDQWdMeTljYmlBZ0lDQXZMeUJKWmlCMGFHVnlaU0JwY3lCaGJpQkFJR2x1SUhSb1pTQm9iM04wYm1GdFpTd2dkR2hsYmlCdWIyNHRhRzl6ZENCamFHRnljeUFxWVhKbEtpQmhiR3h2ZDJWa1hHNGdJQ0FnTHk4Z2RHOGdkR2hsSUd4bFpuUWdiMllnZEdobElHeGhjM1FnUUNCemFXZHVMQ0IxYm14bGMzTWdjMjl0WlNCb2IzTjBMV1Z1WkdsdVp5QmphR0Z5WVdOMFpYSmNiaUFnSUNBdkx5QmpiMjFsY3lBcVltVm1iM0psS2lCMGFHVWdRQzF6YVdkdUxseHVJQ0FnSUM4dklGVlNUSE1nWVhKbElHOWlibTk0YVc5MWN5NWNiaUFnSUNBdkwxeHVJQ0FnSUM4dklHVjRPbHh1SUNBZ0lDOHZJR2gwZEhBNkx5OWhRR0pBWXk4Z1BUNGdkWE5sY2pwaFFHSWdhRzl6ZERwalhHNGdJQ0FnTHk4Z2FIUjBjRG92TDJGQVlqOUFZeUE5UGlCMWMyVnlPbUVnYUc5emREcGpJSEJoZEdnNkx6OUFZMXh1WEc0Z0lDQWdMeThnZGpBdU1USWdWRTlFVHlocGMyRmhZM01wT2lCVWFHbHpJR2x6SUc1dmRDQnhkV2wwWlNCb2IzY2dRMmh5YjIxbElHUnZaWE1nZEdocGJtZHpMbHh1SUNBZ0lDOHZJRkpsZG1sbGR5QnZkWElnZEdWemRDQmpZWE5sSUdGbllXbHVjM1FnWW5KdmQzTmxjbk1nYlc5eVpTQmpiMjF3Y21Wb1pXNXphWFpsYkhrdVhHNWNiaUFnSUNBdkx5Qm1hVzVrSUhSb1pTQm1hWEp6ZENCcGJuTjBZVzVqWlNCdlppQmhibmtnYUc5emRFVnVaR2x1WjBOb1lYSnpYRzRnSUNBZ2RtRnlJR2h2YzNSRmJtUWdQU0F0TVR0Y2JpQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUdodmMzUkZibVJwYm1kRGFHRnljeTVzWlc1bmRHZzdJR2tyS3lrZ2UxeHVJQ0FnSUNBZ2RtRnlJR2hsWXlBOUlISmxjM1F1YVc1a1pYaFBaaWhvYjNOMFJXNWthVzVuUTJoaGNuTmJhVjBwTzF4dUlDQWdJQ0FnYVdZZ0tHaGxZeUFoUFQwZ0xURWdKaVlnS0dodmMzUkZibVFnUFQwOUlDMHhJSHg4SUdobFl5QThJR2h2YzNSRmJtUXBLVnh1SUNBZ0lDQWdJQ0JvYjNOMFJXNWtJRDBnYUdWak8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4dklHRjBJSFJvYVhNZ2NHOXBiblFzSUdWcGRHaGxjaUIzWlNCb1lYWmxJR0Z1SUdWNGNHeHBZMmwwSUhCdmFXNTBJSGRvWlhKbElIUm9aVnh1SUNBZ0lDOHZJR0YxZEdnZ2NHOXlkR2x2YmlCallXNXViM1FnWjI4Z2NHRnpkQ3dnYjNJZ2RHaGxJR3hoYzNRZ1FDQmphR0Z5SUdseklIUm9aU0JrWldOcFpHVnlMbHh1SUNBZ0lIWmhjaUJoZFhSb0xDQmhkRk5wWjI0N1hHNGdJQ0FnYVdZZ0tHaHZjM1JGYm1RZ1BUMDlJQzB4S1NCN1hHNGdJQ0FnSUNBdkx5QmhkRk5wWjI0Z1kyRnVJR0psSUdGdWVYZG9aWEpsTGx4dUlDQWdJQ0FnWVhSVGFXZHVJRDBnY21WemRDNXNZWE4wU1c1a1pYaFBaaWduUUNjcE8xeHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0F2THlCaGRGTnBaMjRnYlhWemRDQmlaU0JwYmlCaGRYUm9JSEJ2Y25ScGIyNHVYRzRnSUNBZ0lDQXZMeUJvZEhSd09pOHZZVUJpTDJOQVpDQTlQaUJvYjNOME9tSWdZWFYwYURwaElIQmhkR2c2TDJOQVpGeHVJQ0FnSUNBZ1lYUlRhV2R1SUQwZ2NtVnpkQzVzWVhOMFNXNWtaWGhQWmlnblFDY3NJR2h2YzNSRmJtUXBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHZJRTV2ZHlCM1pTQm9ZWFpsSUdFZ2NHOXlkR2x2YmlCM2FHbGphQ0JwY3lCa1pXWnBibWwwWld4NUlIUm9aU0JoZFhSb0xseHVJQ0FnSUM4dklGQjFiR3dnZEdoaGRDQnZabVl1WEc0Z0lDQWdhV1lnS0dGMFUybG5iaUFoUFQwZ0xURXBJSHRjYmlBZ0lDQWdJR0YxZEdnZ1BTQnlaWE4wTG5Oc2FXTmxLREFzSUdGMFUybG5iaWs3WEc0Z0lDQWdJQ0J5WlhOMElEMGdjbVZ6ZEM1emJHbGpaU2hoZEZOcFoyNGdLeUF4S1R0Y2JpQWdJQ0FnSUhSb2FYTXVZWFYwYUNBOUlHUmxZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaGhkWFJvS1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCMGFHVWdhRzl6ZENCcGN5QjBhR1VnY21WdFlXbHVhVzVuSUhSdklIUm9aU0JzWldaMElHOW1JSFJvWlNCbWFYSnpkQ0J1YjI0dGFHOXpkQ0JqYUdGeVhHNGdJQ0FnYUc5emRFVnVaQ0E5SUMweE8xeHVJQ0FnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z2JtOXVTRzl6ZEVOb1lYSnpMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnSUNCMllYSWdhR1ZqSUQwZ2NtVnpkQzVwYm1SbGVFOW1LRzV2YmtodmMzUkRhR0Z5YzF0cFhTazdYRzRnSUNBZ0lDQnBaaUFvYUdWaklDRTlQU0F0TVNBbUppQW9hRzl6ZEVWdVpDQTlQVDBnTFRFZ2ZId2dhR1ZqSUR3Z2FHOXpkRVZ1WkNrcFhHNGdJQ0FnSUNBZ0lHaHZjM1JGYm1RZ1BTQm9aV003WEc0Z0lDQWdmVnh1SUNBZ0lDOHZJR2xtSUhkbElITjBhV3hzSUdoaGRtVWdibTkwSUdocGRDQnBkQ3dnZEdobGJpQjBhR1VnWlc1MGFYSmxJSFJvYVc1bklHbHpJR0VnYUc5emRDNWNiaUFnSUNCcFppQW9hRzl6ZEVWdVpDQTlQVDBnTFRFcFhHNGdJQ0FnSUNCb2IzTjBSVzVrSUQwZ2NtVnpkQzVzWlc1bmRHZzdYRzVjYmlBZ0lDQjBhR2x6TG1odmMzUWdQU0J5WlhOMExuTnNhV05sS0RBc0lHaHZjM1JGYm1RcE8xeHVJQ0FnSUhKbGMzUWdQU0J5WlhOMExuTnNhV05sS0dodmMzUkZibVFwTzF4dVhHNGdJQ0FnTHk4Z2NIVnNiQ0J2ZFhRZ2NHOXlkQzVjYmlBZ0lDQjBhR2x6TG5CaGNuTmxTRzl6ZENncE8xeHVYRzRnSUNBZ0x5OGdkMlVuZG1VZ2FXNWthV05oZEdWa0lIUm9ZWFFnZEdobGNtVWdhWE1nWVNCb2IzTjBibUZ0WlN4Y2JpQWdJQ0F2THlCemJ5QmxkbVZ1SUdsbUlHbDBKM01nWlcxd2RIa3NJR2wwSUdoaGN5QjBieUJpWlNCd2NtVnpaVzUwTGx4dUlDQWdJSFJvYVhNdWFHOXpkRzVoYldVZ1BTQjBhR2x6TG1odmMzUnVZVzFsSUh4OElDY25PMXh1WEc0Z0lDQWdMeThnYVdZZ2FHOXpkRzVoYldVZ1ltVm5hVzV6SUhkcGRHZ2dXeUJoYm1RZ1pXNWtjeUIzYVhSb0lGMWNiaUFnSUNBdkx5QmhjM04xYldVZ2RHaGhkQ0JwZENkeklHRnVJRWxRZGpZZ1lXUmtjbVZ6Y3k1Y2JpQWdJQ0IyWVhJZ2FYQjJOa2h2YzNSdVlXMWxJRDBnZEdocGN5NW9iM04wYm1GdFpWc3dYU0E5UFQwZ0oxc25JQ1ltWEc0Z0lDQWdJQ0FnSUhSb2FYTXVhRzl6ZEc1aGJXVmJkR2hwY3k1b2IzTjBibUZ0WlM1c1pXNW5kR2dnTFNBeFhTQTlQVDBnSjEwbk8xeHVYRzRnSUNBZ0x5OGdkbUZzYVdSaGRHVWdZU0JzYVhSMGJHVXVYRzRnSUNBZ2FXWWdLQ0ZwY0hZMlNHOXpkRzVoYldVcElIdGNiaUFnSUNBZ0lIWmhjaUJvYjNOMGNHRnlkSE1nUFNCMGFHbHpMbWh2YzNSdVlXMWxMbk53YkdsMEtDOWNYQzR2S1R0Y2JpQWdJQ0FnSUdadmNpQW9kbUZ5SUdrZ1BTQXdMQ0JzSUQwZ2FHOXpkSEJoY25SekxteGxibWQwYURzZ2FTQThJR3c3SUdrckt5a2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2NHRnlkQ0E5SUdodmMzUndZWEowYzF0cFhUdGNiaUFnSUNBZ0lDQWdhV1lnS0NGd1lYSjBLU0JqYjI1MGFXNTFaVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tDRndZWEowTG0xaGRHTm9LR2h2YzNSdVlXMWxVR0Z5ZEZCaGRIUmxjbTRwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkbUZ5SUc1bGQzQmhjblFnUFNBbkp6dGNiaUFnSUNBZ0lDQWdJQ0JtYjNJZ0tIWmhjaUJxSUQwZ01Dd2dheUE5SUhCaGNuUXViR1Z1WjNSb095QnFJRHdnYXpzZ2Fpc3JLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvY0dGeWRDNWphR0Z5UTI5a1pVRjBLR29wSUQ0Z01USTNLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUhkbElISmxjR3hoWTJVZ2JtOXVMVUZUUTBsSklHTm9ZWElnZDJsMGFDQmhJSFJsYlhCdmNtRnllU0J3YkdGalpXaHZiR1JsY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0F2THlCM1pTQnVaV1ZrSUhSb2FYTWdkRzhnYldGclpTQnpkWEpsSUhOcGVtVWdiMllnYUc5emRHNWhiV1VnYVhNZ2JtOTBYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZJR0p5YjJ0bGJpQmllU0J5WlhCc1lXTnBibWNnYm05dUxVRlRRMGxKSUdKNUlHNXZkR2hwYm1kY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnYm1WM2NHRnlkQ0FyUFNBbmVDYzdYRzRnSUNBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0J1Wlhkd1lYSjBJQ3M5SUhCaGNuUmJhbDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDOHZJSGRsSUhSbGMzUWdZV2RoYVc0Z2QybDBhQ0JCVTBOSlNTQmphR0Z5SUc5dWJIbGNiaUFnSUNBZ0lDQWdJQ0JwWmlBb0lXNWxkM0JoY25RdWJXRjBZMmdvYUc5emRHNWhiV1ZRWVhKMFVHRjBkR1Z5YmlrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQjJZV3hwWkZCaGNuUnpJRDBnYUc5emRIQmhjblJ6TG5Oc2FXTmxLREFzSUdrcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHNXZkRWh2YzNRZ1BTQm9iM04wY0dGeWRITXVjMnhwWTJVb2FTQXJJREVwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZ5SUdKcGRDQTlJSEJoY25RdWJXRjBZMmdvYUc5emRHNWhiV1ZRWVhKMFUzUmhjblFwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0dKcGRDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZV3hwWkZCaGNuUnpMbkIxYzJnb1ltbDBXekZkS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnYm05MFNHOXpkQzUxYm5Ob2FXWjBLR0pwZEZzeVhTazdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2JtOTBTRzl6ZEM1c1pXNW5kR2dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WemRDQTlJQ2N2SnlBcklHNXZkRWh2YzNRdWFtOXBiaWduTGljcElDc2djbVZ6ZER0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11YUc5emRHNWhiV1VnUFNCMllXeHBaRkJoY25SekxtcHZhVzRvSnk0bktUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdKeVpXRnJPMXh1SUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVJQ0FnSUdsbUlDaDBhR2x6TG1odmMzUnVZVzFsTG14bGJtZDBhQ0ErSUdodmMzUnVZVzFsVFdGNFRHVnVLU0I3WEc0Z0lDQWdJQ0IwYUdsekxtaHZjM1J1WVcxbElEMGdKeWM3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDOHZJR2h2YzNSdVlXMWxjeUJoY21VZ1lXeDNZWGx6SUd4dmQyVnlJR05oYzJVdVhHNGdJQ0FnSUNCMGFHbHpMbWh2YzNSdVlXMWxJRDBnZEdocGN5NW9iM04wYm1GdFpTNTBiMHh2ZDJWeVEyRnpaU2dwTzF4dUlDQWdJSDFjYmx4dUlDQWdJR2xtSUNnaGFYQjJOa2h2YzNSdVlXMWxLU0I3WEc0Z0lDQWdJQ0F2THlCSlJFNUJJRk4xY0hCdmNuUTZJRkpsZEhWeWJuTWdZU0J3ZFc1NUlHTnZaR1ZrSUhKbGNISmxjMlZ1ZEdGMGFXOXVJRzltSUZ3aVpHOXRZV2x1WENJdVhHNGdJQ0FnSUNBdkx5QkpkQ0J2Ym14NUlHTnZiblpsY25SeklIUm9aU0J3WVhKMElHOW1JSFJvWlNCa2IyMWhhVzRnYm1GdFpTQjBhR0YwWEc0Z0lDQWdJQ0F2THlCb1lYTWdibTl1SUVGVFEwbEpJR05vWVhKaFkzUmxjbk11SUVrdVpTNGdhWFFnWkc5elpXNTBJRzFoZEhSbGNpQnBabHh1SUNBZ0lDQWdMeThnZVc5MUlHTmhiR3dnYVhRZ2QybDBhQ0JoSUdSdmJXRnBiaUIwYUdGMElHRnNjbVZoWkhrZ2FYTWdhVzRnUVZORFNVa3VYRzRnSUNBZ0lDQjJZWElnWkc5dFlXbHVRWEp5WVhrZ1BTQjBhR2x6TG1odmMzUnVZVzFsTG5Od2JHbDBLQ2N1SnlrN1hHNGdJQ0FnSUNCMllYSWdibVYzVDNWMElEMGdXMTA3WEc0Z0lDQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUdSdmJXRnBia0Z5Y21GNUxteGxibWQwYURzZ0t5dHBLU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQnpJRDBnWkc5dFlXbHVRWEp5WVhsYmFWMDdYRzRnSUNBZ0lDQWdJRzVsZDA5MWRDNXdkWE5vS0hNdWJXRjBZMmdvTDF0ZVFTMWFZUzE2TUMwNVh5MWRMeWtnUDF4dUlDQWdJQ0FnSUNBZ0lDQWdKM2h1TFMwbklDc2djSFZ1ZVdOdlpHVXVaVzVqYjJSbEtITXBJRG9nY3lrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCMGFHbHpMbWh2YzNSdVlXMWxJRDBnYm1WM1QzVjBMbXB2YVc0b0p5NG5LVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQjJZWElnY0NBOUlIUm9hWE11Y0c5eWRDQS9JQ2M2SnlBcklIUm9hWE11Y0c5eWRDQTZJQ2NuTzF4dUlDQWdJSFpoY2lCb0lEMGdkR2hwY3k1b2IzTjBibUZ0WlNCOGZDQW5KenRjYmlBZ0lDQjBhR2x6TG1odmMzUWdQU0JvSUNzZ2NEdGNiaUFnSUNCMGFHbHpMbWh5WldZZ0t6MGdkR2hwY3k1b2IzTjBPMXh1WEc0Z0lDQWdMeThnYzNSeWFYQWdXeUJoYm1RZ1hTQm1jbTl0SUhSb1pTQm9iM04wYm1GdFpWeHVJQ0FnSUM4dklIUm9aU0JvYjNOMElHWnBaV3hrSUhOMGFXeHNJSEpsZEdGcGJuTWdkR2hsYlN3Z2RHaHZkV2RvWEc0Z0lDQWdhV1lnS0dsd2RqWkliM04wYm1GdFpTa2dlMXh1SUNBZ0lDQWdkR2hwY3k1b2IzTjBibUZ0WlNBOUlIUm9hWE11YUc5emRHNWhiV1V1YzNWaWMzUnlLREVzSUhSb2FYTXVhRzl6ZEc1aGJXVXViR1Z1WjNSb0lDMGdNaWs3WEc0Z0lDQWdJQ0JwWmlBb2NtVnpkRnN3WFNBaFBUMGdKeThuS1NCN1hHNGdJQ0FnSUNBZ0lISmxjM1FnUFNBbkx5Y2dLeUJ5WlhOME8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lDOHZJRzV2ZHlCeVpYTjBJR2x6SUhObGRDQjBieUIwYUdVZ2NHOXpkQzFvYjNOMElITjBkV1ptTGx4dUlDQXZMeUJqYUc5d0lHOW1aaUJoYm5rZ1pHVnNhVzBnWTJoaGNuTXVYRzRnSUdsbUlDZ2hkVzV6WVdabFVISnZkRzlqYjJ4YmJHOTNaWEpRY205MGIxMHBJSHRjYmx4dUlDQWdJQzh2SUVacGNuTjBMQ0J0WVd0bElERXdNQ1VnYzNWeVpTQjBhR0YwSUdGdWVTQmNJbUYxZEc5RmMyTmhjR1ZjSWlCamFHRnljeUJuWlhSY2JpQWdJQ0F2THlCbGMyTmhjR1ZrTENCbGRtVnVJR2xtSUdWdVkyOWtaVlZTU1VOdmJYQnZibVZ1ZENCa2IyVnpiaWQwSUhSb2FXNXJJSFJvWlhsY2JpQWdJQ0F2THlCdVpXVmtJSFJ2SUdKbExseHVJQ0FnSUdadmNpQW9kbUZ5SUdrZ1BTQXdMQ0JzSUQwZ1lYVjBiMFZ6WTJGd1pTNXNaVzVuZEdnN0lHa2dQQ0JzT3lCcEt5c3BJSHRjYmlBZ0lDQWdJSFpoY2lCaFpTQTlJR0YxZEc5RmMyTmhjR1ZiYVYwN1hHNGdJQ0FnSUNCMllYSWdaWE5qSUQwZ1pXNWpiMlJsVlZKSlEyOXRjRzl1Wlc1MEtHRmxLVHRjYmlBZ0lDQWdJR2xtSUNobGMyTWdQVDA5SUdGbEtTQjdYRzRnSUNBZ0lDQWdJR1Z6WXlBOUlHVnpZMkZ3WlNoaFpTazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQnlaWE4wSUQwZ2NtVnpkQzV6Y0d4cGRDaGhaU2t1YW05cGJpaGxjMk1wTzF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzVjYmlBZ0x5OGdZMmh2Y0NCdlptWWdabkp2YlNCMGFHVWdkR0ZwYkNCbWFYSnpkQzVjYmlBZ2RtRnlJR2hoYzJnZ1BTQnlaWE4wTG1sdVpHVjRUMllvSnlNbktUdGNiaUFnYVdZZ0tHaGhjMmdnSVQwOUlDMHhLU0I3WEc0Z0lDQWdMeThnWjI5MElHRWdabkpoWjIxbGJuUWdjM1J5YVc1bkxseHVJQ0FnSUhSb2FYTXVhR0Z6YUNBOUlISmxjM1F1YzNWaWMzUnlLR2hoYzJncE8xeHVJQ0FnSUhKbGMzUWdQU0J5WlhOMExuTnNhV05sS0RBc0lHaGhjMmdwTzF4dUlDQjlYRzRnSUhaaGNpQnhiU0E5SUhKbGMzUXVhVzVrWlhoUFppZ25QeWNwTzF4dUlDQnBaaUFvY1cwZ0lUMDlJQzB4S1NCN1hHNGdJQ0FnZEdocGN5NXpaV0Z5WTJnZ1BTQnlaWE4wTG5OMVluTjBjaWh4YlNrN1hHNGdJQ0FnZEdocGN5NXhkV1Z5ZVNBOUlISmxjM1F1YzNWaWMzUnlLSEZ0SUNzZ01TazdYRzRnSUNBZ2FXWWdLSEJoY25ObFVYVmxjbmxUZEhKcGJtY3BJSHRjYmlBZ0lDQWdJSFJvYVhNdWNYVmxjbmtnUFNCeGRXVnllWE4wY21sdVp5NXdZWEp6WlNoMGFHbHpMbkYxWlhKNUtUdGNiaUFnSUNCOVhHNGdJQ0FnY21WemRDQTlJSEpsYzNRdWMyeHBZMlVvTUN3Z2NXMHBPMXh1SUNCOUlHVnNjMlVnYVdZZ0tIQmhjbk5sVVhWbGNubFRkSEpwYm1jcElIdGNiaUFnSUNBdkx5QnVieUJ4ZFdWeWVTQnpkSEpwYm1jc0lHSjFkQ0J3WVhKelpWRjFaWEo1VTNSeWFXNW5JSE4wYVd4c0lISmxjWFZsYzNSbFpGeHVJQ0FnSUhSb2FYTXVjMlZoY21Ob0lEMGdKeWM3WEc0Z0lDQWdkR2hwY3k1eGRXVnllU0E5SUh0OU8xeHVJQ0I5WEc0Z0lHbG1JQ2h5WlhOMEtTQjBhR2x6TG5CaGRHaHVZVzFsSUQwZ2NtVnpkRHRjYmlBZ2FXWWdLSE5zWVhOb1pXUlFjbTkwYjJOdmJGdHNiM2RsY2xCeWIzUnZYU0FtSmx4dUlDQWdJQ0FnZEdocGN5NW9iM04wYm1GdFpTQW1KaUFoZEdocGN5NXdZWFJvYm1GdFpTa2dlMXh1SUNBZ0lIUm9hWE11Y0dGMGFHNWhiV1VnUFNBbkx5YzdYRzRnSUgxY2JseHVJQ0F2TDNSdklITjFjSEJ2Y25RZ2FIUjBjQzV5WlhGMVpYTjBYRzRnSUdsbUlDaDBhR2x6TG5CaGRHaHVZVzFsSUh4OElIUm9hWE11YzJWaGNtTm9LU0I3WEc0Z0lDQWdkbUZ5SUhBZ1BTQjBhR2x6TG5CaGRHaHVZVzFsSUh4OElDY25PMXh1SUNBZ0lIWmhjaUJ6SUQwZ2RHaHBjeTV6WldGeVkyZ2dmSHdnSnljN1hHNGdJQ0FnZEdocGN5NXdZWFJvSUQwZ2NDQXJJSE03WEc0Z0lIMWNibHh1SUNBdkx5Qm1hVzVoYkd4NUxDQnlaV052Ym5OMGNuVmpkQ0IwYUdVZ2FISmxaaUJpWVhObFpDQnZiaUIzYUdGMElHaGhjeUJpWldWdUlIWmhiR2xrWVhSbFpDNWNiaUFnZEdocGN5NW9jbVZtSUQwZ2RHaHBjeTVtYjNKdFlYUW9LVHRjYmlBZ2NtVjBkWEp1SUhSb2FYTTdYRzU5TzF4dVhHNHZMeUJtYjNKdFlYUWdZU0J3WVhKelpXUWdiMkpxWldOMElHbHVkRzhnWVNCMWNtd2djM1J5YVc1blhHNW1kVzVqZEdsdmJpQjFjbXhHYjNKdFlYUW9iMkpxS1NCN1hHNGdJQzh2SUdWdWMzVnlaU0JwZENkeklHRnVJRzlpYW1WamRDd2dZVzVrSUc1dmRDQmhJSE4wY21sdVp5QjFjbXd1WEc0Z0lDOHZJRWxtSUdsMEozTWdZVzRnYjJKcUxDQjBhR2x6SUdseklHRWdibTh0YjNBdVhHNGdJQzh2SUhSb2FYTWdkMkY1TENCNWIzVWdZMkZ1SUdOaGJHd2dkWEpzWDJadmNtMWhkQ2dwSUc5dUlITjBjbWx1WjNOY2JpQWdMeThnZEc4Z1kyeGxZVzRnZFhBZ2NHOTBaVzUwYVdGc2JIa2dkMjl1YTNrZ2RYSnNjeTVjYmlBZ2FXWWdLR2x6VTNSeWFXNW5LRzlpYWlrcElHOWlhaUE5SUhWeWJGQmhjbk5sS0c5aWFpazdYRzRnSUdsbUlDZ2hLRzlpYWlCcGJuTjBZVzVqWlc5bUlGVnliQ2twSUhKbGRIVnliaUJWY213dWNISnZkRzkwZVhCbExtWnZjbTFoZEM1allXeHNLRzlpYWlrN1hHNGdJSEpsZEhWeWJpQnZZbW91Wm05eWJXRjBLQ2s3WEc1OVhHNWNibFZ5YkM1d2NtOTBiM1I1Y0dVdVptOXliV0YwSUQwZ1puVnVZM1JwYjI0b0tTQjdYRzRnSUhaaGNpQmhkWFJvSUQwZ2RHaHBjeTVoZFhSb0lIeDhJQ2NuTzF4dUlDQnBaaUFvWVhWMGFDa2dlMXh1SUNBZ0lHRjFkR2dnUFNCbGJtTnZaR1ZWVWtsRGIyMXdiMjVsYm5Rb1lYVjBhQ2s3WEc0Z0lDQWdZWFYwYUNBOUlHRjFkR2d1Y21Wd2JHRmpaU2d2SlROQkwya3NJQ2M2SnlrN1hHNGdJQ0FnWVhWMGFDQXJQU0FuUUNjN1hHNGdJSDFjYmx4dUlDQjJZWElnY0hKdmRHOWpiMndnUFNCMGFHbHpMbkJ5YjNSdlkyOXNJSHg4SUNjbkxGeHVJQ0FnSUNBZ2NHRjBhRzVoYldVZ1BTQjBhR2x6TG5CaGRHaHVZVzFsSUh4OElDY25MRnh1SUNBZ0lDQWdhR0Z6YUNBOUlIUm9hWE11YUdGemFDQjhmQ0FuSnl4Y2JpQWdJQ0FnSUdodmMzUWdQU0JtWVd4elpTeGNiaUFnSUNBZ0lIRjFaWEo1SUQwZ0p5YzdYRzVjYmlBZ2FXWWdLSFJvYVhNdWFHOXpkQ2tnZTF4dUlDQWdJR2h2YzNRZ1BTQmhkWFJvSUNzZ2RHaHBjeTVvYjNOME8xeHVJQ0I5SUdWc2MyVWdhV1lnS0hSb2FYTXVhRzl6ZEc1aGJXVXBJSHRjYmlBZ0lDQm9iM04wSUQwZ1lYVjBhQ0FySUNoMGFHbHpMbWh2YzNSdVlXMWxMbWx1WkdWNFQyWW9Kem9uS1NBOVBUMGdMVEVnUDF4dUlDQWdJQ0FnSUNCMGFHbHpMbWh2YzNSdVlXMWxJRHBjYmlBZ0lDQWdJQ0FnSjFzbklDc2dkR2hwY3k1b2IzTjBibUZ0WlNBcklDZGRKeWs3WEc0Z0lDQWdhV1lnS0hSb2FYTXVjRzl5ZENrZ2UxeHVJQ0FnSUNBZ2FHOXpkQ0FyUFNBbk9pY2dLeUIwYUdsekxuQnZjblE3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnYVdZZ0tIUm9hWE11Y1hWbGNua2dKaVpjYmlBZ0lDQWdJR2x6VDJKcVpXTjBLSFJvYVhNdWNYVmxjbmtwSUNZbVhHNGdJQ0FnSUNCUFltcGxZM1F1YTJWNWN5aDBhR2x6TG5GMVpYSjVLUzVzWlc1bmRHZ3BJSHRjYmlBZ0lDQnhkV1Z5ZVNBOUlIRjFaWEo1YzNSeWFXNW5Mbk4wY21sdVoybG1lU2gwYUdsekxuRjFaWEo1S1R0Y2JpQWdmVnh1WEc0Z0lIWmhjaUJ6WldGeVkyZ2dQU0IwYUdsekxuTmxZWEpqYUNCOGZDQW9jWFZsY25rZ0ppWWdLQ2MvSnlBcklIRjFaWEo1S1NrZ2ZId2dKeWM3WEc1Y2JpQWdhV1lnS0hCeWIzUnZZMjlzSUNZbUlIQnliM1J2WTI5c0xuTjFZbk4wY2lndE1Ta2dJVDA5SUNjNkp5a2djSEp2ZEc5amIyd2dLejBnSnpvbk8xeHVYRzRnSUM4dklHOXViSGtnZEdobElITnNZWE5vWldSUWNtOTBiMk52YkhNZ1oyVjBJSFJvWlNBdkx5NGdJRTV2ZENCdFlXbHNkRzg2TENCNGJYQndPaXdnWlhSakxseHVJQ0F2THlCMWJteGxjM01nZEdobGVTQm9ZV1FnZEdobGJTQjBieUJpWldkcGJpQjNhWFJvTGx4dUlDQnBaaUFvZEdocGN5NXpiR0Z6YUdWeklIeDhYRzRnSUNBZ0lDQW9JWEJ5YjNSdlkyOXNJSHg4SUhOc1lYTm9aV1JRY205MGIyTnZiRnR3Y205MGIyTnZiRjBwSUNZbUlHaHZjM1FnSVQwOUlHWmhiSE5sS1NCN1hHNGdJQ0FnYUc5emRDQTlJQ2N2THljZ0t5QW9hRzl6ZENCOGZDQW5KeWs3WEc0Z0lDQWdhV1lnS0hCaGRHaHVZVzFsSUNZbUlIQmhkR2h1WVcxbExtTm9ZWEpCZENnd0tTQWhQVDBnSnk4bktTQndZWFJvYm1GdFpTQTlJQ2N2SnlBcklIQmhkR2h1WVcxbE8xeHVJQ0I5SUdWc2MyVWdhV1lnS0NGb2IzTjBLU0I3WEc0Z0lDQWdhRzl6ZENBOUlDY25PMXh1SUNCOVhHNWNiaUFnYVdZZ0tHaGhjMmdnSmlZZ2FHRnphQzVqYUdGeVFYUW9NQ2tnSVQwOUlDY2pKeWtnYUdGemFDQTlJQ2NqSnlBcklHaGhjMmc3WEc0Z0lHbG1JQ2h6WldGeVkyZ2dKaVlnYzJWaGNtTm9MbU5vWVhKQmRDZ3dLU0FoUFQwZ0p6OG5LU0J6WldGeVkyZ2dQU0FuUHljZ0t5QnpaV0Z5WTJnN1hHNWNiaUFnY0dGMGFHNWhiV1VnUFNCd1lYUm9ibUZ0WlM1eVpYQnNZV05sS0M5YlB5TmRMMmNzSUdaMWJtTjBhVzl1S0cxaGRHTm9LU0I3WEc0Z0lDQWdjbVYwZFhKdUlHVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaHRZWFJqYUNrN1hHNGdJSDBwTzF4dUlDQnpaV0Z5WTJnZ1BTQnpaV0Z5WTJndWNtVndiR0ZqWlNnbkl5Y3NJQ2NsTWpNbktUdGNibHh1SUNCeVpYUjFjbTRnY0hKdmRHOWpiMndnS3lCb2IzTjBJQ3NnY0dGMGFHNWhiV1VnS3lCelpXRnlZMmdnS3lCb1lYTm9PMXh1ZlR0Y2JseHVablZ1WTNScGIyNGdkWEpzVW1WemIyeDJaU2h6YjNWeVkyVXNJSEpsYkdGMGFYWmxLU0I3WEc0Z0lISmxkSFZ5YmlCMWNteFFZWEp6WlNoemIzVnlZMlVzSUdaaGJITmxMQ0IwY25WbEtTNXlaWE52YkhabEtISmxiR0YwYVhabEtUdGNibjFjYmx4dVZYSnNMbkJ5YjNSdmRIbHdaUzV5WlhOdmJIWmxJRDBnWm5WdVkzUnBiMjRvY21Wc1lYUnBkbVVwSUh0Y2JpQWdjbVYwZFhKdUlIUm9hWE11Y21WemIyeDJaVTlpYW1WamRDaDFjbXhRWVhKelpTaHlaV3hoZEdsMlpTd2dabUZzYzJVc0lIUnlkV1VwS1M1bWIzSnRZWFFvS1R0Y2JuMDdYRzVjYm1aMWJtTjBhVzl1SUhWeWJGSmxjMjlzZG1WUFltcGxZM1FvYzI5MWNtTmxMQ0J5Wld4aGRHbDJaU2tnZTF4dUlDQnBaaUFvSVhOdmRYSmpaU2tnY21WMGRYSnVJSEpsYkdGMGFYWmxPMXh1SUNCeVpYUjFjbTRnZFhKc1VHRnljMlVvYzI5MWNtTmxMQ0JtWVd4elpTd2dkSEoxWlNrdWNtVnpiMngyWlU5aWFtVmpkQ2h5Wld4aGRHbDJaU2s3WEc1OVhHNWNibFZ5YkM1d2NtOTBiM1I1Y0dVdWNtVnpiMngyWlU5aWFtVmpkQ0E5SUdaMWJtTjBhVzl1S0hKbGJHRjBhWFpsS1NCN1hHNGdJR2xtSUNocGMxTjBjbWx1WnloeVpXeGhkR2wyWlNrcElIdGNiaUFnSUNCMllYSWdjbVZzSUQwZ2JtVjNJRlZ5YkNncE8xeHVJQ0FnSUhKbGJDNXdZWEp6WlNoeVpXeGhkR2wyWlN3Z1ptRnNjMlVzSUhSeWRXVXBPMXh1SUNBZ0lISmxiR0YwYVhabElEMGdjbVZzTzF4dUlDQjlYRzVjYmlBZ2RtRnlJSEpsYzNWc2RDQTlJRzVsZHlCVmNtd29LVHRjYmlBZ1QySnFaV04wTG10bGVYTW9kR2hwY3lrdVptOXlSV0ZqYUNobWRXNWpkR2x2YmlocktTQjdYRzRnSUNBZ2NtVnpkV3gwVzJ0ZElEMGdkR2hwYzF0clhUdGNiaUFnZlN3Z2RHaHBjeWs3WEc1Y2JpQWdMeThnYUdGemFDQnBjeUJoYkhkaGVYTWdiM1psY25KcFpHUmxiaXdnYm04Z2JXRjBkR1Z5SUhkb1lYUXVYRzRnSUM4dklHVjJaVzRnYUhKbFpqMWNJbHdpSUhkcGJHd2djbVZ0YjNabElHbDBMbHh1SUNCeVpYTjFiSFF1YUdGemFDQTlJSEpsYkdGMGFYWmxMbWhoYzJnN1hHNWNiaUFnTHk4Z2FXWWdkR2hsSUhKbGJHRjBhWFpsSUhWeWJDQnBjeUJsYlhCMGVTd2dkR2hsYmlCMGFHVnlaU2R6SUc1dmRHaHBibWNnYkdWbWRDQjBieUJrYnlCb1pYSmxMbHh1SUNCcFppQW9jbVZzWVhScGRtVXVhSEpsWmlBOVBUMGdKeWNwSUh0Y2JpQWdJQ0J5WlhOMWJIUXVhSEpsWmlBOUlISmxjM1ZzZEM1bWIzSnRZWFFvS1R0Y2JpQWdJQ0J5WlhSMWNtNGdjbVZ6ZFd4ME8xeHVJQ0I5WEc1Y2JpQWdMeThnYUhKbFpuTWdiR2xyWlNBdkwyWnZieTlpWVhJZ1lXeDNZWGx6SUdOMWRDQjBieUIwYUdVZ2NISnZkRzlqYjJ3dVhHNGdJR2xtSUNoeVpXeGhkR2wyWlM1emJHRnphR1Z6SUNZbUlDRnlaV3hoZEdsMlpTNXdjbTkwYjJOdmJDa2dlMXh1SUNBZ0lDOHZJSFJoYTJVZ1pYWmxjbmwwYUdsdVp5QmxlR05sY0hRZ2RHaGxJSEJ5YjNSdlkyOXNJR1p5YjIwZ2NtVnNZWFJwZG1WY2JpQWdJQ0JQWW1wbFkzUXVhMlY1Y3loeVpXeGhkR2wyWlNrdVptOXlSV0ZqYUNobWRXNWpkR2x2YmlocktTQjdYRzRnSUNBZ0lDQnBaaUFvYXlBaFBUMGdKM0J5YjNSdlkyOXNKeWxjYmlBZ0lDQWdJQ0FnY21WemRXeDBXMnRkSUQwZ2NtVnNZWFJwZG1WYmExMDdYRzRnSUNBZ2ZTazdYRzVjYmlBZ0lDQXZMM1Z5YkZCaGNuTmxJR0Z3Y0dWdVpITWdkSEpoYVd4cGJtY2dMeUIwYnlCMWNteHpJR3hwYTJVZ2FIUjBjRG92TDNkM2R5NWxlR0Z0Y0d4bExtTnZiVnh1SUNBZ0lHbG1JQ2h6YkdGemFHVmtVSEp2ZEc5amIyeGJjbVZ6ZFd4MExuQnliM1J2WTI5c1hTQW1KbHh1SUNBZ0lDQWdJQ0J5WlhOMWJIUXVhRzl6ZEc1aGJXVWdKaVlnSVhKbGMzVnNkQzV3WVhSb2JtRnRaU2tnZTF4dUlDQWdJQ0FnY21WemRXeDBMbkJoZEdnZ1BTQnlaWE4xYkhRdWNHRjBhRzVoYldVZ1BTQW5MeWM3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdjbVZ6ZFd4MExtaHlaV1lnUFNCeVpYTjFiSFF1Wm05eWJXRjBLQ2s3WEc0Z0lDQWdjbVYwZFhKdUlISmxjM1ZzZER0Y2JpQWdmVnh1WEc0Z0lHbG1JQ2h5Wld4aGRHbDJaUzV3Y205MGIyTnZiQ0FtSmlCeVpXeGhkR2wyWlM1d2NtOTBiMk52YkNBaFBUMGdjbVZ6ZFd4MExuQnliM1J2WTI5c0tTQjdYRzRnSUNBZ0x5OGdhV1lnYVhRbmN5QmhJR3R1YjNkdUlIVnliQ0J3Y205MGIyTnZiQ3dnZEdobGJpQmphR0Z1WjJsdVoxeHVJQ0FnSUM4dklIUm9aU0J3Y205MGIyTnZiQ0JrYjJWeklIZGxhWEprSUhSb2FXNW5jMXh1SUNBZ0lDOHZJR1pwY25OMExDQnBaaUJwZENkeklHNXZkQ0JtYVd4bE9pd2dkR2hsYmlCM1pTQk5WVk5VSUdoaGRtVWdZU0JvYjNOMExGeHVJQ0FnSUM4dklHRnVaQ0JwWmlCMGFHVnlaU0IzWVhNZ1lTQndZWFJvWEc0Z0lDQWdMeThnZEc4Z1ltVm5hVzRnZDJsMGFDd2dkR2hsYmlCM1pTQk5WVk5VSUdoaGRtVWdZU0J3WVhSb0xseHVJQ0FnSUM4dklHbG1JR2wwSUdseklHWnBiR1U2TENCMGFHVnVJSFJvWlNCb2IzTjBJR2x6SUdSeWIzQndaV1FzWEc0Z0lDQWdMeThnWW1WallYVnpaU0IwYUdGMEozTWdhMjV2ZDI0Z2RHOGdZbVVnYUc5emRHeGxjM011WEc0Z0lDQWdMeThnWVc1NWRHaHBibWNnWld4elpTQnBjeUJoYzNOMWJXVmtJSFJ2SUdKbElHRmljMjlzZFhSbExseHVJQ0FnSUdsbUlDZ2hjMnhoYzJobFpGQnliM1J2WTI5c1czSmxiR0YwYVhabExuQnliM1J2WTI5c1hTa2dlMXh1SUNBZ0lDQWdUMkpxWldOMExtdGxlWE1vY21Wc1lYUnBkbVVwTG1admNrVmhZMmdvWm5WdVkzUnBiMjRvYXlrZ2UxeHVJQ0FnSUNBZ0lDQnlaWE4xYkhSYmExMGdQU0J5Wld4aGRHbDJaVnRyWFR0Y2JpQWdJQ0FnSUgwcE8xeHVJQ0FnSUNBZ2NtVnpkV3gwTG1oeVpXWWdQU0J5WlhOMWJIUXVabTl5YldGMEtDazdYRzRnSUNBZ0lDQnlaWFIxY200Z2NtVnpkV3gwTzF4dUlDQWdJSDFjYmx4dUlDQWdJSEpsYzNWc2RDNXdjbTkwYjJOdmJDQTlJSEpsYkdGMGFYWmxMbkJ5YjNSdlkyOXNPMXh1SUNBZ0lHbG1JQ2doY21Wc1lYUnBkbVV1YUc5emRDQW1KaUFoYUc5emRHeGxjM05RY205MGIyTnZiRnR5Wld4aGRHbDJaUzV3Y205MGIyTnZiRjBwSUh0Y2JpQWdJQ0FnSUhaaGNpQnlaV3hRWVhSb0lEMGdLSEpsYkdGMGFYWmxMbkJoZEdodVlXMWxJSHg4SUNjbktTNXpjR3hwZENnbkx5Y3BPMXh1SUNBZ0lDQWdkMmhwYkdVZ0tISmxiRkJoZEdndWJHVnVaM1JvSUNZbUlDRW9jbVZzWVhScGRtVXVhRzl6ZENBOUlISmxiRkJoZEdndWMyaHBablFvS1NrcE8xeHVJQ0FnSUNBZ2FXWWdLQ0Z5Wld4aGRHbDJaUzVvYjNOMEtTQnlaV3hoZEdsMlpTNW9iM04wSUQwZ0p5YzdYRzRnSUNBZ0lDQnBaaUFvSVhKbGJHRjBhWFpsTG1odmMzUnVZVzFsS1NCeVpXeGhkR2wyWlM1b2IzTjBibUZ0WlNBOUlDY25PMXh1SUNBZ0lDQWdhV1lnS0hKbGJGQmhkR2hiTUYwZ0lUMDlJQ2NuS1NCeVpXeFFZWFJvTG5WdWMyaHBablFvSnljcE8xeHVJQ0FnSUNBZ2FXWWdLSEpsYkZCaGRHZ3ViR1Z1WjNSb0lEd2dNaWtnY21Wc1VHRjBhQzUxYm5Ob2FXWjBLQ2NuS1R0Y2JpQWdJQ0FnSUhKbGMzVnNkQzV3WVhSb2JtRnRaU0E5SUhKbGJGQmhkR2d1YW05cGJpZ25MeWNwTzF4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQnlaWE4xYkhRdWNHRjBhRzVoYldVZ1BTQnlaV3hoZEdsMlpTNXdZWFJvYm1GdFpUdGNiaUFnSUNCOVhHNGdJQ0FnY21WemRXeDBMbk5sWVhKamFDQTlJSEpsYkdGMGFYWmxMbk5sWVhKamFEdGNiaUFnSUNCeVpYTjFiSFF1Y1hWbGNua2dQU0J5Wld4aGRHbDJaUzV4ZFdWeWVUdGNiaUFnSUNCeVpYTjFiSFF1YUc5emRDQTlJSEpsYkdGMGFYWmxMbWh2YzNRZ2ZId2dKeWM3WEc0Z0lDQWdjbVZ6ZFd4MExtRjFkR2dnUFNCeVpXeGhkR2wyWlM1aGRYUm9PMXh1SUNBZ0lISmxjM1ZzZEM1b2IzTjBibUZ0WlNBOUlISmxiR0YwYVhabExtaHZjM1J1WVcxbElIeDhJSEpsYkdGMGFYWmxMbWh2YzNRN1hHNGdJQ0FnY21WemRXeDBMbkJ2Y25RZ1BTQnlaV3hoZEdsMlpTNXdiM0owTzF4dUlDQWdJQzh2SUhSdklITjFjSEJ2Y25RZ2FIUjBjQzV5WlhGMVpYTjBYRzRnSUNBZ2FXWWdLSEpsYzNWc2RDNXdZWFJvYm1GdFpTQjhmQ0J5WlhOMWJIUXVjMlZoY21Ob0tTQjdYRzRnSUNBZ0lDQjJZWElnY0NBOUlISmxjM1ZzZEM1d1lYUm9ibUZ0WlNCOGZDQW5KenRjYmlBZ0lDQWdJSFpoY2lCeklEMGdjbVZ6ZFd4MExuTmxZWEpqYUNCOGZDQW5KenRjYmlBZ0lDQWdJSEpsYzNWc2RDNXdZWFJvSUQwZ2NDQXJJSE03WEc0Z0lDQWdmVnh1SUNBZ0lISmxjM1ZzZEM1emJHRnphR1Z6SUQwZ2NtVnpkV3gwTG5Oc1lYTm9aWE1nZkh3Z2NtVnNZWFJwZG1VdWMyeGhjMmhsY3p0Y2JpQWdJQ0J5WlhOMWJIUXVhSEpsWmlBOUlISmxjM1ZzZEM1bWIzSnRZWFFvS1R0Y2JpQWdJQ0J5WlhSMWNtNGdjbVZ6ZFd4ME8xeHVJQ0I5WEc1Y2JpQWdkbUZ5SUdselUyOTFjbU5sUVdKeklEMGdLSEpsYzNWc2RDNXdZWFJvYm1GdFpTQW1KaUJ5WlhOMWJIUXVjR0YwYUc1aGJXVXVZMmhoY2tGMEtEQXBJRDA5UFNBbkx5Y3BMRnh1SUNBZ0lDQWdhWE5TWld4QlluTWdQU0FvWEc0Z0lDQWdJQ0FnSUNBZ2NtVnNZWFJwZG1VdWFHOXpkQ0I4ZkZ4dUlDQWdJQ0FnSUNBZ0lISmxiR0YwYVhabExuQmhkR2h1WVcxbElDWW1JSEpsYkdGMGFYWmxMbkJoZEdodVlXMWxMbU5vWVhKQmRDZ3dLU0E5UFQwZ0p5OG5YRzRnSUNBZ0lDQXBMRnh1SUNBZ0lDQWdiWFZ6ZEVWdVpFRmljeUE5SUNocGMxSmxiRUZpY3lCOGZDQnBjMU52ZFhKalpVRmljeUI4ZkZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQW9jbVZ6ZFd4MExtaHZjM1FnSmlZZ2NtVnNZWFJwZG1VdWNHRjBhRzVoYldVcEtTeGNiaUFnSUNBZ0lISmxiVzkyWlVGc2JFUnZkSE1nUFNCdGRYTjBSVzVrUVdKekxGeHVJQ0FnSUNBZ2MzSmpVR0YwYUNBOUlISmxjM1ZzZEM1d1lYUm9ibUZ0WlNBbUppQnlaWE4xYkhRdWNHRjBhRzVoYldVdWMzQnNhWFFvSnk4bktTQjhmQ0JiWFN4Y2JpQWdJQ0FnSUhKbGJGQmhkR2dnUFNCeVpXeGhkR2wyWlM1d1lYUm9ibUZ0WlNBbUppQnlaV3hoZEdsMlpTNXdZWFJvYm1GdFpTNXpjR3hwZENnbkx5Y3BJSHg4SUZ0ZExGeHVJQ0FnSUNBZ2NITjVZMmh2ZEdsaklEMGdjbVZ6ZFd4MExuQnliM1J2WTI5c0lDWW1JQ0Z6YkdGemFHVmtVSEp2ZEc5amIyeGJjbVZ6ZFd4MExuQnliM1J2WTI5c1hUdGNibHh1SUNBdkx5QnBaaUIwYUdVZ2RYSnNJR2x6SUdFZ2JtOXVMWE5zWVhOb1pXUWdkWEpzTENCMGFHVnVJSEpsYkdGMGFYWmxYRzRnSUM4dklHeHBibXR6SUd4cGEyVWdMaTR2TGk0Z2MyaHZkV3hrSUdKbElHRmliR1ZjYmlBZ0x5OGdkRzhnWTNKaGQyd2dkWEFnZEc4Z2RHaGxJR2h2YzNSdVlXMWxMQ0JoY3lCM1pXeHNMaUFnVkdocGN5QnBjeUJ6ZEhKaGJtZGxMbHh1SUNBdkx5QnlaWE4xYkhRdWNISnZkRzlqYjJ3Z2FHRnpJR0ZzY21WaFpIa2dZbVZsYmlCelpYUWdZbmtnYm05M0xseHVJQ0F2THlCTVlYUmxjaUJ2Yml3Z2NIVjBJSFJvWlNCbWFYSnpkQ0J3WVhSb0lIQmhjblFnYVc1MGJ5QjBhR1VnYUc5emRDQm1hV1ZzWkM1Y2JpQWdhV1lnS0hCemVXTm9iM1JwWXlrZ2UxeHVJQ0FnSUhKbGMzVnNkQzVvYjNOMGJtRnRaU0E5SUNjbk8xeHVJQ0FnSUhKbGMzVnNkQzV3YjNKMElEMGdiblZzYkR0Y2JpQWdJQ0JwWmlBb2NtVnpkV3gwTG1odmMzUXBJSHRjYmlBZ0lDQWdJR2xtSUNoemNtTlFZWFJvV3pCZElEMDlQU0FuSnlrZ2MzSmpVR0YwYUZzd1hTQTlJSEpsYzNWc2RDNW9iM04wTzF4dUlDQWdJQ0FnWld4elpTQnpjbU5RWVhSb0xuVnVjMmhwWm5Rb2NtVnpkV3gwTG1odmMzUXBPMXh1SUNBZ0lIMWNiaUFnSUNCeVpYTjFiSFF1YUc5emRDQTlJQ2NuTzF4dUlDQWdJR2xtSUNoeVpXeGhkR2wyWlM1d2NtOTBiMk52YkNrZ2UxeHVJQ0FnSUNBZ2NtVnNZWFJwZG1VdWFHOXpkRzVoYldVZ1BTQnVkV3hzTzF4dUlDQWdJQ0FnY21Wc1lYUnBkbVV1Y0c5eWRDQTlJRzUxYkd3N1hHNGdJQ0FnSUNCcFppQW9jbVZzWVhScGRtVXVhRzl6ZENrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvY21Wc1VHRjBhRnN3WFNBOVBUMGdKeWNwSUhKbGJGQmhkR2hiTUYwZ1BTQnlaV3hoZEdsMlpTNW9iM04wTzF4dUlDQWdJQ0FnSUNCbGJITmxJSEpsYkZCaGRHZ3VkVzV6YUdsbWRDaHlaV3hoZEdsMlpTNW9iM04wS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhKbGJHRjBhWFpsTG1odmMzUWdQU0J1ZFd4c08xeHVJQ0FnSUgxY2JpQWdJQ0J0ZFhOMFJXNWtRV0p6SUQwZ2JYVnpkRVZ1WkVGaWN5QW1KaUFvY21Wc1VHRjBhRnN3WFNBOVBUMGdKeWNnZkh3Z2MzSmpVR0YwYUZzd1hTQTlQVDBnSnljcE8xeHVJQ0I5WEc1Y2JpQWdhV1lnS0dselVtVnNRV0p6S1NCN1hHNGdJQ0FnTHk4Z2FYUW5jeUJoWW5OdmJIVjBaUzVjYmlBZ0lDQnlaWE4xYkhRdWFHOXpkQ0E5SUNoeVpXeGhkR2wyWlM1b2IzTjBJSHg4SUhKbGJHRjBhWFpsTG1odmMzUWdQVDA5SUNjbktTQS9YRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5Wld4aGRHbDJaUzVvYjNOMElEb2djbVZ6ZFd4MExtaHZjM1E3WEc0Z0lDQWdjbVZ6ZFd4MExtaHZjM1J1WVcxbElEMGdLSEpsYkdGMGFYWmxMbWh2YzNSdVlXMWxJSHg4SUhKbGJHRjBhWFpsTG1odmMzUnVZVzFsSUQwOVBTQW5KeWtnUDF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsYkdGMGFYWmxMbWh2YzNSdVlXMWxJRG9nY21WemRXeDBMbWh2YzNSdVlXMWxPMXh1SUNBZ0lISmxjM1ZzZEM1elpXRnlZMmdnUFNCeVpXeGhkR2wyWlM1elpXRnlZMmc3WEc0Z0lDQWdjbVZ6ZFd4MExuRjFaWEo1SUQwZ2NtVnNZWFJwZG1VdWNYVmxjbms3WEc0Z0lDQWdjM0pqVUdGMGFDQTlJSEpsYkZCaGRHZzdYRzRnSUNBZ0x5OGdabUZzYkNCMGFISnZkV2RvSUhSdklIUm9aU0JrYjNRdGFHRnVaR3hwYm1jZ1ltVnNiM2N1WEc0Z0lIMGdaV3h6WlNCcFppQW9jbVZzVUdGMGFDNXNaVzVuZEdncElIdGNiaUFnSUNBdkx5QnBkQ2R6SUhKbGJHRjBhWFpsWEc0Z0lDQWdMeThnZEdoeWIzY2dZWGRoZVNCMGFHVWdaWGhwYzNScGJtY2dabWxzWlN3Z1lXNWtJSFJoYTJVZ2RHaGxJRzVsZHlCd1lYUm9JR2x1YzNSbFlXUXVYRzRnSUNBZ2FXWWdLQ0Z6Y21OUVlYUm9LU0J6Y21OUVlYUm9JRDBnVzEwN1hHNGdJQ0FnYzNKalVHRjBhQzV3YjNBb0tUdGNiaUFnSUNCemNtTlFZWFJvSUQwZ2MzSmpVR0YwYUM1amIyNWpZWFFvY21Wc1VHRjBhQ2s3WEc0Z0lDQWdjbVZ6ZFd4MExuTmxZWEpqYUNBOUlISmxiR0YwYVhabExuTmxZWEpqYUR0Y2JpQWdJQ0J5WlhOMWJIUXVjWFZsY25rZ1BTQnlaV3hoZEdsMlpTNXhkV1Z5ZVR0Y2JpQWdmU0JsYkhObElHbG1JQ2doYVhOT2RXeHNUM0pWYm1SbFptbHVaV1FvY21Wc1lYUnBkbVV1YzJWaGNtTm9LU2tnZTF4dUlDQWdJQzh2SUdwMWMzUWdjSFZzYkNCdmRYUWdkR2hsSUhObFlYSmphQzVjYmlBZ0lDQXZMeUJzYVd0bElHaHlaV1k5Sno5bWIyOG5MbHh1SUNBZ0lDOHZJRkIxZENCMGFHbHpJR0ZtZEdWeUlIUm9aU0J2ZEdobGNpQjBkMjhnWTJGelpYTWdZbVZqWVhWelpTQnBkQ0J6YVcxd2JHbG1hV1Z6SUhSb1pTQmliMjlzWldGdWMxeHVJQ0FnSUdsbUlDaHdjM2xqYUc5MGFXTXBJSHRjYmlBZ0lDQWdJSEpsYzNWc2RDNW9iM04wYm1GdFpTQTlJSEpsYzNWc2RDNW9iM04wSUQwZ2MzSmpVR0YwYUM1emFHbG1kQ2dwTzF4dUlDQWdJQ0FnTHk5dlkyTmhkR2x2Ym1Gc2VTQjBhR1VnWVhWMGFDQmpZVzRnWjJWMElITjBkV05ySUc5dWJIa2dhVzRnYUc5emRGeHVJQ0FnSUNBZ0x5OTBhR2x6SUdWemNHVmphV0ZzZVNCb1lYQndaVzV6SUdsdUlHTmhjMlZ6SUd4cGEyVmNiaUFnSUNBZ0lDOHZkWEpzTG5KbGMyOXNkbVZQWW1wbFkzUW9KMjFoYVd4MGJ6cHNiMk5oYkRGQVpHOXRZV2x1TVNjc0lDZHNiMk5oYkRKQVpHOXRZV2x1TWljcFhHNGdJQ0FnSUNCMllYSWdZWFYwYUVsdVNHOXpkQ0E5SUhKbGMzVnNkQzVvYjNOMElDWW1JSEpsYzNWc2RDNW9iM04wTG1sdVpHVjRUMllvSjBBbktTQStJREFnUDF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhOMWJIUXVhRzl6ZEM1emNHeHBkQ2duUUNjcElEb2dabUZzYzJVN1hHNGdJQ0FnSUNCcFppQW9ZWFYwYUVsdVNHOXpkQ2tnZTF4dUlDQWdJQ0FnSUNCeVpYTjFiSFF1WVhWMGFDQTlJR0YxZEdoSmJraHZjM1F1YzJocFpuUW9LVHRjYmlBZ0lDQWdJQ0FnY21WemRXeDBMbWh2YzNRZ1BTQnlaWE4xYkhRdWFHOXpkRzVoYldVZ1BTQmhkWFJvU1c1SWIzTjBMbk5vYVdaMEtDazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0FnSUhKbGMzVnNkQzV6WldGeVkyZ2dQU0J5Wld4aGRHbDJaUzV6WldGeVkyZzdYRzRnSUNBZ2NtVnpkV3gwTG5GMVpYSjVJRDBnY21Wc1lYUnBkbVV1Y1hWbGNuazdYRzRnSUNBZ0x5OTBieUJ6ZFhCd2IzSjBJR2gwZEhBdWNtVnhkV1Z6ZEZ4dUlDQWdJR2xtSUNnaGFYTk9kV3hzS0hKbGMzVnNkQzV3WVhSb2JtRnRaU2tnZkh3Z0lXbHpUblZzYkNoeVpYTjFiSFF1YzJWaGNtTm9LU2tnZTF4dUlDQWdJQ0FnY21WemRXeDBMbkJoZEdnZ1BTQW9jbVZ6ZFd4MExuQmhkR2h1WVcxbElEOGdjbVZ6ZFd4MExuQmhkR2h1WVcxbElEb2dKeWNwSUN0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdLSEpsYzNWc2RDNXpaV0Z5WTJnZ1B5QnlaWE4xYkhRdWMyVmhjbU5vSURvZ0p5Y3BPMXh1SUNBZ0lIMWNiaUFnSUNCeVpYTjFiSFF1YUhKbFppQTlJSEpsYzNWc2RDNW1iM0p0WVhRb0tUdGNiaUFnSUNCeVpYUjFjbTRnY21WemRXeDBPMXh1SUNCOVhHNWNiaUFnYVdZZ0tDRnpjbU5RWVhSb0xteGxibWQwYUNrZ2UxeHVJQ0FnSUM4dklHNXZJSEJoZEdnZ1lYUWdZV3hzTGlBZ1pXRnplUzVjYmlBZ0lDQXZMeUIzWlNkMlpTQmhiSEpsWVdSNUlHaGhibVJzWldRZ2RHaGxJRzkwYUdWeUlITjBkV1ptSUdGaWIzWmxMbHh1SUNBZ0lISmxjM1ZzZEM1d1lYUm9ibUZ0WlNBOUlHNTFiR3c3WEc0Z0lDQWdMeTkwYnlCemRYQndiM0owSUdoMGRIQXVjbVZ4ZFdWemRGeHVJQ0FnSUdsbUlDaHlaWE4xYkhRdWMyVmhjbU5vS1NCN1hHNGdJQ0FnSUNCeVpYTjFiSFF1Y0dGMGFDQTlJQ2N2SnlBcklISmxjM1ZzZEM1elpXRnlZMmc3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lISmxjM1ZzZEM1d1lYUm9JRDBnYm5Wc2JEdGNiaUFnSUNCOVhHNGdJQ0FnY21WemRXeDBMbWh5WldZZ1BTQnlaWE4xYkhRdVptOXliV0YwS0NrN1hHNGdJQ0FnY21WMGRYSnVJSEpsYzNWc2REdGNiaUFnZlZ4dVhHNGdJQzh2SUdsbUlHRWdkWEpzSUVWT1JITWdhVzRnTGlCdmNpQXVMaXdnZEdobGJpQnBkQ0J0ZFhOMElHZGxkQ0JoSUhSeVlXbHNhVzVuSUhOc1lYTm9MbHh1SUNBdkx5Qm9iM2RsZG1WeUxDQnBaaUJwZENCbGJtUnpJR2x1SUdGdWVYUm9hVzVuSUdWc2MyVWdibTl1TFhOc1lYTm9lU3hjYmlBZ0x5OGdkR2hsYmlCcGRDQnRkWE4wSUU1UFZDQm5aWFFnWVNCMGNtRnBiR2x1WnlCemJHRnphQzVjYmlBZ2RtRnlJR3hoYzNRZ1BTQnpjbU5RWVhSb0xuTnNhV05sS0MweEtWc3dYVHRjYmlBZ2RtRnlJR2hoYzFSeVlXbHNhVzVuVTJ4aGMyZ2dQU0FvWEc0Z0lDQWdJQ0FvY21WemRXeDBMbWh2YzNRZ2ZId2djbVZzWVhScGRtVXVhRzl6ZENrZ0ppWWdLR3hoYzNRZ1BUMDlJQ2N1SnlCOGZDQnNZWE4wSUQwOVBTQW5MaTRuS1NCOGZGeHVJQ0FnSUNBZ2JHRnpkQ0E5UFQwZ0p5Y3BPMXh1WEc0Z0lDOHZJSE4wY21sd0lITnBibWRzWlNCa2IzUnpMQ0J5WlhOdmJIWmxJR1J2ZFdKc1pTQmtiM1J6SUhSdklIQmhjbVZ1ZENCa2FYSmNiaUFnTHk4Z2FXWWdkR2hsSUhCaGRHZ2dkSEpwWlhNZ2RHOGdaMjhnWVdKdmRtVWdkR2hsSUhKdmIzUXNJR0IxY0dBZ1pXNWtjeUIxY0NBK0lEQmNiaUFnZG1GeUlIVndJRDBnTUR0Y2JpQWdabTl5SUNoMllYSWdhU0E5SUhOeVkxQmhkR2d1YkdWdVozUm9PeUJwSUQ0OUlEQTdJR2t0TFNrZ2UxeHVJQ0FnSUd4aGMzUWdQU0J6Y21OUVlYUm9XMmxkTzF4dUlDQWdJR2xtSUNoc1lYTjBJRDA5SUNjdUp5a2dlMXh1SUNBZ0lDQWdjM0pqVUdGMGFDNXpjR3hwWTJVb2FTd2dNU2s3WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2hzWVhOMElEMDlQU0FuTGk0bktTQjdYRzRnSUNBZ0lDQnpjbU5RWVhSb0xuTndiR2xqWlNocExDQXhLVHRjYmlBZ0lDQWdJSFZ3S3lzN1hHNGdJQ0FnZlNCbGJITmxJR2xtSUNoMWNDa2dlMXh1SUNBZ0lDQWdjM0pqVUdGMGFDNXpjR3hwWTJVb2FTd2dNU2s3WEc0Z0lDQWdJQ0IxY0MwdE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lDOHZJR2xtSUhSb1pTQndZWFJvSUdseklHRnNiRzkzWldRZ2RHOGdaMjhnWVdKdmRtVWdkR2hsSUhKdmIzUXNJSEpsYzNSdmNtVWdiR1ZoWkdsdVp5QXVMbk5jYmlBZ2FXWWdLQ0Z0ZFhOMFJXNWtRV0p6SUNZbUlDRnlaVzF2ZG1WQmJHeEViM1J6S1NCN1hHNGdJQ0FnWm05eUlDZzdJSFZ3TFMwN0lIVndLU0I3WEc0Z0lDQWdJQ0J6Y21OUVlYUm9MblZ1YzJocFpuUW9KeTR1SnlrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ2FXWWdLRzExYzNSRmJtUkJZbk1nSmlZZ2MzSmpVR0YwYUZzd1hTQWhQVDBnSnljZ0ppWmNiaUFnSUNBZ0lDZ2hjM0pqVUdGMGFGc3dYU0I4ZkNCemNtTlFZWFJvV3pCZExtTm9ZWEpCZENnd0tTQWhQVDBnSnk4bktTa2dlMXh1SUNBZ0lITnlZMUJoZEdndWRXNXphR2xtZENnbkp5azdYRzRnSUgxY2JseHVJQ0JwWmlBb2FHRnpWSEpoYVd4cGJtZFRiR0Z6YUNBbUppQW9jM0pqVUdGMGFDNXFiMmx1S0Njdkp5a3VjM1ZpYzNSeUtDMHhLU0FoUFQwZ0p5OG5LU2tnZTF4dUlDQWdJSE55WTFCaGRHZ3VjSFZ6YUNnbkp5azdYRzRnSUgxY2JseHVJQ0IyWVhJZ2FYTkJZbk52YkhWMFpTQTlJSE55WTFCaGRHaGJNRjBnUFQwOUlDY25JSHg4WEc0Z0lDQWdJQ0FvYzNKalVHRjBhRnN3WFNBbUppQnpjbU5RWVhSb1d6QmRMbU5vWVhKQmRDZ3dLU0E5UFQwZ0p5OG5LVHRjYmx4dUlDQXZMeUJ3ZFhRZ2RHaGxJR2h2YzNRZ1ltRmphMXh1SUNCcFppQW9jSE41WTJodmRHbGpLU0I3WEc0Z0lDQWdjbVZ6ZFd4MExtaHZjM1J1WVcxbElEMGdjbVZ6ZFd4MExtaHZjM1FnUFNCcGMwRmljMjlzZFhSbElEOGdKeWNnT2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MzSmpVR0YwYUM1c1pXNW5kR2dnUHlCemNtTlFZWFJvTG5Ob2FXWjBLQ2tnT2lBbkp6dGNiaUFnSUNBdkwyOWpZMkYwYVc5dVlXeDVJSFJvWlNCaGRYUm9JR05oYmlCblpYUWdjM1IxWTJzZ2IyNXNlU0JwYmlCb2IzTjBYRzRnSUNBZ0x5OTBhR2x6SUdWemNHVmphV0ZzZVNCb1lYQndaVzV6SUdsdUlHTmhjMlZ6SUd4cGEyVmNiaUFnSUNBdkwzVnliQzV5WlhOdmJIWmxUMkpxWldOMEtDZHRZV2xzZEc4NmJHOWpZV3d4UUdSdmJXRnBiakVuTENBbmJHOWpZV3d5UUdSdmJXRnBiakluS1Z4dUlDQWdJSFpoY2lCaGRYUm9TVzVJYjNOMElEMGdjbVZ6ZFd4MExtaHZjM1FnSmlZZ2NtVnpkV3gwTG1odmMzUXVhVzVrWlhoUFppZ25RQ2NwSUQ0Z01DQS9YRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYTjFiSFF1YUc5emRDNXpjR3hwZENnblFDY3BJRG9nWm1Gc2MyVTdYRzRnSUNBZ2FXWWdLR0YxZEdoSmJraHZjM1FwSUh0Y2JpQWdJQ0FnSUhKbGMzVnNkQzVoZFhSb0lEMGdZWFYwYUVsdVNHOXpkQzV6YUdsbWRDZ3BPMXh1SUNBZ0lDQWdjbVZ6ZFd4MExtaHZjM1FnUFNCeVpYTjFiSFF1YUc5emRHNWhiV1VnUFNCaGRYUm9TVzVJYjNOMExuTm9hV1owS0NrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ2JYVnpkRVZ1WkVGaWN5QTlJRzExYzNSRmJtUkJZbk1nZkh3Z0tISmxjM1ZzZEM1b2IzTjBJQ1ltSUhOeVkxQmhkR2d1YkdWdVozUm9LVHRjYmx4dUlDQnBaaUFvYlhWemRFVnVaRUZpY3lBbUppQWhhWE5CWW5OdmJIVjBaU2tnZTF4dUlDQWdJSE55WTFCaGRHZ3VkVzV6YUdsbWRDZ25KeWs3WEc0Z0lIMWNibHh1SUNCcFppQW9JWE55WTFCaGRHZ3ViR1Z1WjNSb0tTQjdYRzRnSUNBZ2NtVnpkV3gwTG5CaGRHaHVZVzFsSUQwZ2JuVnNiRHRjYmlBZ0lDQnlaWE4xYkhRdWNHRjBhQ0E5SUc1MWJHdzdYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdjbVZ6ZFd4MExuQmhkR2h1WVcxbElEMGdjM0pqVUdGMGFDNXFiMmx1S0Njdkp5azdYRzRnSUgxY2JseHVJQ0F2TDNSdklITjFjSEJ2Y25RZ2NtVnhkV1Z6ZEM1b2RIUndYRzRnSUdsbUlDZ2hhWE5PZFd4c0tISmxjM1ZzZEM1d1lYUm9ibUZ0WlNrZ2ZId2dJV2x6VG5Wc2JDaHlaWE4xYkhRdWMyVmhjbU5vS1NrZ2UxeHVJQ0FnSUhKbGMzVnNkQzV3WVhSb0lEMGdLSEpsYzNWc2RDNXdZWFJvYm1GdFpTQS9JSEpsYzNWc2RDNXdZWFJvYm1GdFpTQTZJQ2NuS1NBclhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQW9jbVZ6ZFd4MExuTmxZWEpqYUNBL0lISmxjM1ZzZEM1elpXRnlZMmdnT2lBbkp5azdYRzRnSUgxY2JpQWdjbVZ6ZFd4MExtRjFkR2dnUFNCeVpXeGhkR2wyWlM1aGRYUm9JSHg4SUhKbGMzVnNkQzVoZFhSb08xeHVJQ0J5WlhOMWJIUXVjMnhoYzJobGN5QTlJSEpsYzNWc2RDNXpiR0Z6YUdWeklIeDhJSEpsYkdGMGFYWmxMbk5zWVhOb1pYTTdYRzRnSUhKbGMzVnNkQzVvY21WbUlEMGdjbVZ6ZFd4MExtWnZjbTFoZENncE8xeHVJQ0J5WlhSMWNtNGdjbVZ6ZFd4ME8xeHVmVHRjYmx4dVZYSnNMbkJ5YjNSdmRIbHdaUzV3WVhKelpVaHZjM1FnUFNCbWRXNWpkR2x2YmlncElIdGNiaUFnZG1GeUlHaHZjM1FnUFNCMGFHbHpMbWh2YzNRN1hHNGdJSFpoY2lCd2IzSjBJRDBnY0c5eWRGQmhkSFJsY200dVpYaGxZeWhvYjNOMEtUdGNiaUFnYVdZZ0tIQnZjblFwSUh0Y2JpQWdJQ0J3YjNKMElEMGdjRzl5ZEZzd1hUdGNiaUFnSUNCcFppQW9jRzl5ZENBaFBUMGdKem9uS1NCN1hHNGdJQ0FnSUNCMGFHbHpMbkJ2Y25RZ1BTQndiM0owTG5OMVluTjBjaWd4S1R0Y2JpQWdJQ0I5WEc0Z0lDQWdhRzl6ZENBOUlHaHZjM1F1YzNWaWMzUnlLREFzSUdodmMzUXViR1Z1WjNSb0lDMGdjRzl5ZEM1c1pXNW5kR2dwTzF4dUlDQjlYRzRnSUdsbUlDaG9iM04wS1NCMGFHbHpMbWh2YzNSdVlXMWxJRDBnYUc5emREdGNibjA3WEc1Y2JtWjFibU4wYVc5dUlHbHpVM1J5YVc1bktHRnlaeWtnZTF4dUlDQnlaWFIxY200Z2RIbHdaVzltSUdGeVp5QTlQVDBnWENKemRISnBibWRjSWp0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnYVhOUFltcGxZM1FvWVhKbktTQjdYRzRnSUhKbGRIVnliaUIwZVhCbGIyWWdZWEpuSUQwOVBTQW5iMkpxWldOMEp5QW1KaUJoY21jZ0lUMDlJRzUxYkd3N1hHNTlYRzVjYm1aMWJtTjBhVzl1SUdselRuVnNiQ2hoY21jcElIdGNiaUFnY21WMGRYSnVJR0Z5WnlBOVBUMGdiblZzYkR0Y2JuMWNibVoxYm1OMGFXOXVJR2x6VG5Wc2JFOXlWVzVrWldacGJtVmtLR0Z5WnlrZ2UxeHVJQ0J5WlhSMWNtNGdJR0Z5WnlBOVBTQnVkV3hzTzF4dWZWeHVYRzVjYmx4dUx5OHZMeTh2THk4dkx5OHZMeTh2THk4dlhHNHZMeUJYUlVKUVFVTkxJRVpQVDFSRlVseHVMeThnTGk5K0wzVnliQzkxY213dWFuTmNiaTh2SUcxdlpIVnNaU0JwWkNBOUlERXdYRzR2THlCdGIyUjFiR1VnWTJoMWJtdHpJRDBnTVNBeUlETWlMQ0l2S2lFZ2FIUjBjSE02THk5dGRHaHpMbUpsTDNCMWJubGpiMlJsSUhZeExqTXVNaUJpZVNCQWJXRjBhR2xoY3lBcUwxeHVPeWhtZFc1amRHbHZiaWh5YjI5MEtTQjdYRzVjYmx4MEx5b3FJRVJsZEdWamRDQm1jbVZsSUhaaGNtbGhZbXhsY3lBcUwxeHVYSFIyWVhJZ1puSmxaVVY0Y0c5eWRITWdQU0IwZVhCbGIyWWdaWGh3YjNKMGN5QTlQU0FuYjJKcVpXTjBKeUFtSmlCbGVIQnZjblJ6SUNZbVhHNWNkRngwSVdWNGNHOXlkSE11Ym05a1pWUjVjR1VnSmlZZ1pYaHdiM0owY3p0Y2JseDBkbUZ5SUdaeVpXVk5iMlIxYkdVZ1BTQjBlWEJsYjJZZ2JXOWtkV3hsSUQwOUlDZHZZbXBsWTNRbklDWW1JRzF2WkhWc1pTQW1KbHh1WEhSY2RDRnRiMlIxYkdVdWJtOWtaVlI1Y0dVZ0ppWWdiVzlrZFd4bE8xeHVYSFIyWVhJZ1puSmxaVWRzYjJKaGJDQTlJSFI1Y0dWdlppQm5iRzlpWVd3Z1BUMGdKMjlpYW1WamRDY2dKaVlnWjJ4dlltRnNPMXh1WEhScFppQW9YRzVjZEZ4MFpuSmxaVWRzYjJKaGJDNW5iRzlpWVd3Z1BUMDlJR1p5WldWSGJHOWlZV3dnZkh4Y2JseDBYSFJtY21WbFIyeHZZbUZzTG5kcGJtUnZkeUE5UFQwZ1puSmxaVWRzYjJKaGJDQjhmRnh1WEhSY2RHWnlaV1ZIYkc5aVlXd3VjMlZzWmlBOVBUMGdabkpsWlVkc2IySmhiRnh1WEhRcElIdGNibHgwWEhSeWIyOTBJRDBnWm5KbFpVZHNiMkpoYkR0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQlVhR1VnWUhCMWJubGpiMlJsWUNCdlltcGxZM1F1WEc1Y2RDQXFJRUJ1WVcxbElIQjFibmxqYjJSbFhHNWNkQ0FxSUVCMGVYQmxJRTlpYW1WamRGeHVYSFFnS2k5Y2JseDBkbUZ5SUhCMWJubGpiMlJsTEZ4dVhHNWNkQzhxS2lCSWFXZG9aWE4wSUhCdmMybDBhWFpsSUhOcFoyNWxaQ0F6TWkxaWFYUWdabXh2WVhRZ2RtRnNkV1VnS2k5Y2JseDBiV0Y0U1c1MElEMGdNakUwTnpRNE16WTBOeXdnTHk4Z1lXdGhMaUF3ZURkR1JrWkdSa1pHSUc5eUlESmVNekV0TVZ4dVhHNWNkQzhxS2lCQ2IyOTBjM1J5YVc1bklIQmhjbUZ0WlhSbGNuTWdLaTljYmx4MFltRnpaU0E5SURNMkxGeHVYSFIwVFdsdUlEMGdNU3hjYmx4MGRFMWhlQ0E5SURJMkxGeHVYSFJ6YTJWM0lEMGdNemdzWEc1Y2RHUmhiWEFnUFNBM01EQXNYRzVjZEdsdWFYUnBZV3hDYVdGeklEMGdOeklzWEc1Y2RHbHVhWFJwWVd4T0lEMGdNVEk0TENBdkx5QXdlRGd3WEc1Y2RHUmxiR2x0YVhSbGNpQTlJQ2N0Snl3Z0x5OGdKMXhjZURKRUoxeHVYRzVjZEM4cUtpQlNaV2QxYkdGeUlHVjRjSEpsYzNOcGIyNXpJQ292WEc1Y2RISmxaMlY0VUhWdWVXTnZaR1VnUFNBdlhuaHVMUzB2TEZ4dVhIUnlaV2RsZUU1dmJrRlRRMGxKSUQwZ0wxdGVYRng0TWpBdFhGeDROMFZkTHl3Z0x5OGdkVzV3Y21sdWRHRmliR1VnUVZORFNVa2dZMmhoY25NZ0t5QnViMjR0UVZORFNVa2dZMmhoY25OY2JseDBjbVZuWlhoVFpYQmhjbUYwYjNKeklEMGdMMXRjWEhneVJWeGNkVE13TURKY1hIVkdSakJGWEZ4MVJrWTJNVjB2Wnl3Z0x5OGdVa1pESURNME9UQWdjMlZ3WVhKaGRHOXljMXh1WEc1Y2RDOHFLaUJGY25KdmNpQnRaWE56WVdkbGN5QXFMMXh1WEhSbGNuSnZjbk1nUFNCN1hHNWNkRngwSjI5MlpYSm1iRzkzSnpvZ0owOTJaWEptYkc5M09pQnBibkIxZENCdVpXVmtjeUIzYVdSbGNpQnBiblJsWjJWeWN5QjBieUJ3Y205alpYTnpKeXhjYmx4MFhIUW5ibTkwTFdKaGMybGpKem9nSjBsc2JHVm5ZV3dnYVc1d2RYUWdQajBnTUhnNE1DQW9ibTkwSUdFZ1ltRnphV01nWTI5a1pTQndiMmx1ZENrbkxGeHVYSFJjZENkcGJuWmhiR2xrTFdsdWNIVjBKem9nSjBsdWRtRnNhV1FnYVc1d2RYUW5YRzVjZEgwc1hHNWNibHgwTHlvcUlFTnZiblpsYm1sbGJtTmxJSE5vYjNKMFkzVjBjeUFxTDF4dVhIUmlZWE5sVFdsdWRYTlVUV2x1SUQwZ1ltRnpaU0F0SUhSTmFXNHNYRzVjZEdac2IyOXlJRDBnVFdGMGFDNW1iRzl2Y2l4Y2JseDBjM1J5YVc1blJuSnZiVU5vWVhKRGIyUmxJRDBnVTNSeWFXNW5MbVp5YjIxRGFHRnlRMjlrWlN4Y2JseHVYSFF2S2lvZ1ZHVnRjRzl5WVhKNUlIWmhjbWxoWW14bElDb3ZYRzVjZEd0bGVUdGNibHh1WEhRdktpMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRLaTljYmx4dVhIUXZLaXBjYmx4MElDb2dRU0JuWlc1bGNtbGpJR1Z5Y205eUlIVjBhV3hwZEhrZ1puVnVZM1JwYjI0dVhHNWNkQ0FxSUVCd2NtbDJZWFJsWEc1Y2RDQXFJRUJ3WVhKaGJTQjdVM1J5YVc1bmZTQjBlWEJsSUZSb1pTQmxjbkp2Y2lCMGVYQmxMbHh1WEhRZ0tpQkFjbVYwZFhKdWN5QjdSWEp5YjNKOUlGUm9jbTkzY3lCaElHQlNZVzVuWlVWeWNtOXlZQ0IzYVhSb0lIUm9aU0JoY0hCc2FXTmhZbXhsSUdWeWNtOXlJRzFsYzNOaFoyVXVYRzVjZENBcUwxeHVYSFJtZFc1amRHbHZiaUJsY25KdmNpaDBlWEJsS1NCN1hHNWNkRngwZEdoeWIzY2dVbUZ1WjJWRmNuSnZjaWhsY25KdmNuTmJkSGx3WlYwcE8xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRUVnWjJWdVpYSnBZeUJnUVhKeVlYa2piV0Z3WUNCMWRHbHNhWFI1SUdaMWJtTjBhVzl1TGx4dVhIUWdLaUJBY0hKcGRtRjBaVnh1WEhRZ0tpQkFjR0Z5WVcwZ2UwRnljbUY1ZlNCaGNuSmhlU0JVYUdVZ1lYSnlZWGtnZEc4Z2FYUmxjbUYwWlNCdmRtVnlMbHh1WEhRZ0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQmpZV3hzWW1GamF5QlVhR1VnWm5WdVkzUnBiMjRnZEdoaGRDQm5aWFJ6SUdOaGJHeGxaQ0JtYjNJZ1pYWmxjbmtnWVhKeVlYbGNibHgwSUNvZ2FYUmxiUzVjYmx4MElDb2dRSEpsZEhWeWJuTWdlMEZ5Y21GNWZTQkJJRzVsZHlCaGNuSmhlU0J2WmlCMllXeDFaWE1nY21WMGRYSnVaV1FnWW5rZ2RHaGxJR05oYkd4aVlXTnJJR1oxYm1OMGFXOXVMbHh1WEhRZ0tpOWNibHgwWm5WdVkzUnBiMjRnYldGd0tHRnljbUY1TENCbWJpa2dlMXh1WEhSY2RIWmhjaUJzWlc1bmRHZ2dQU0JoY25KaGVTNXNaVzVuZEdnN1hHNWNkRngwZG1GeUlISmxjM1ZzZENBOUlGdGRPMXh1WEhSY2RIZG9hV3hsSUNoc1pXNW5kR2d0TFNrZ2UxeHVYSFJjZEZ4MGNtVnpkV3gwVzJ4bGJtZDBhRjBnUFNCbWJpaGhjbkpoZVZ0c1pXNW5kR2hkS1R0Y2JseDBYSFI5WEc1Y2RGeDBjbVYwZFhKdUlISmxjM1ZzZER0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQkJJSE5wYlhCc1pTQmdRWEp5WVhramJXRndZQzFzYVd0bElIZHlZWEJ3WlhJZ2RHOGdkMjl5YXlCM2FYUm9JR1J2YldGcGJpQnVZVzFsSUhOMGNtbHVaM01nYjNJZ1pXMWhhV3hjYmx4MElDb2dZV1JrY21WemMyVnpMbHh1WEhRZ0tpQkFjSEpwZG1GMFpWeHVYSFFnS2lCQWNHRnlZVzBnZTFOMGNtbHVaMzBnWkc5dFlXbHVJRlJvWlNCa2IyMWhhVzRnYm1GdFpTQnZjaUJsYldGcGJDQmhaR1J5WlhOekxseHVYSFFnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCallXeHNZbUZqYXlCVWFHVWdablZ1WTNScGIyNGdkR2hoZENCblpYUnpJR05oYkd4bFpDQm1iM0lnWlhabGNubGNibHgwSUNvZ1kyaGhjbUZqZEdWeUxseHVYSFFnS2lCQWNtVjBkWEp1Y3lCN1FYSnlZWGw5SUVFZ2JtVjNJSE4wY21sdVp5QnZaaUJqYUdGeVlXTjBaWEp6SUhKbGRIVnlibVZrSUdKNUlIUm9aU0JqWVd4c1ltRmphMXh1WEhRZ0tpQm1kVzVqZEdsdmJpNWNibHgwSUNvdlhHNWNkR1oxYm1OMGFXOXVJRzFoY0VSdmJXRnBiaWh6ZEhKcGJtY3NJR1p1S1NCN1hHNWNkRngwZG1GeUlIQmhjblJ6SUQwZ2MzUnlhVzVuTG5Od2JHbDBLQ2RBSnlrN1hHNWNkRngwZG1GeUlISmxjM1ZzZENBOUlDY25PMXh1WEhSY2RHbG1JQ2h3WVhKMGN5NXNaVzVuZEdnZ1BpQXhLU0I3WEc1Y2RGeDBYSFF2THlCSmJpQmxiV0ZwYkNCaFpHUnlaWE56WlhNc0lHOXViSGtnZEdobElHUnZiV0ZwYmlCdVlXMWxJSE5vYjNWc1pDQmlaU0J3ZFc1NVkyOWtaV1F1SUV4bFlYWmxYRzVjZEZ4MFhIUXZMeUIwYUdVZ2JHOWpZV3dnY0dGeWRDQW9hUzVsTGlCbGRtVnllWFJvYVc1bklIVndJSFJ2SUdCQVlDa2dhVzUwWVdOMExseHVYSFJjZEZ4MGNtVnpkV3gwSUQwZ2NHRnlkSE5iTUYwZ0t5QW5RQ2M3WEc1Y2RGeDBYSFJ6ZEhKcGJtY2dQU0J3WVhKMGMxc3hYVHRjYmx4MFhIUjlYRzVjZEZ4MEx5OGdRWFp2YVdRZ1lITndiR2wwS0hKbFoyVjRLV0FnWm05eUlFbEZPQ0JqYjIxd1lYUnBZbWxzYVhSNUxpQlRaV1VnSXpFM0xseHVYSFJjZEhOMGNtbHVaeUE5SUhOMGNtbHVaeTV5WlhCc1lXTmxLSEpsWjJWNFUyVndZWEpoZEc5eWN5d2dKMXhjZURKRkp5azdYRzVjZEZ4MGRtRnlJR3hoWW1Wc2N5QTlJSE4wY21sdVp5NXpjR3hwZENnbkxpY3BPMXh1WEhSY2RIWmhjaUJsYm1OdlpHVmtJRDBnYldGd0tHeGhZbVZzY3l3Z1ptNHBMbXB2YVc0b0p5NG5LVHRjYmx4MFhIUnlaWFIxY200Z2NtVnpkV3gwSUNzZ1pXNWpiMlJsWkR0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQkRjbVZoZEdWeklHRnVJR0Z5Y21GNUlHTnZiblJoYVc1cGJtY2dkR2hsSUc1MWJXVnlhV01nWTI5a1pTQndiMmx1ZEhNZ2IyWWdaV0ZqYUNCVmJtbGpiMlJsWEc1Y2RDQXFJR05vWVhKaFkzUmxjaUJwYmlCMGFHVWdjM1J5YVc1bkxpQlhhR2xzWlNCS1lYWmhVMk55YVhCMElIVnpaWE1nVlVOVExUSWdhVzUwWlhKdVlXeHNlU3hjYmx4MElDb2dkR2hwY3lCbWRXNWpkR2x2YmlCM2FXeHNJR052Ym5abGNuUWdZU0J3WVdseUlHOW1JSE4xY25KdloyRjBaU0JvWVd4MlpYTWdLR1ZoWTJnZ2IyWWdkMmhwWTJoY2JseDBJQ29nVlVOVExUSWdaWGh3YjNObGN5QmhjeUJ6WlhCaGNtRjBaU0JqYUdGeVlXTjBaWEp6S1NCcGJuUnZJR0VnYzJsdVoyeGxJR052WkdVZ2NHOXBiblFzWEc1Y2RDQXFJRzFoZEdOb2FXNW5JRlZVUmkweE5pNWNibHgwSUNvZ1FITmxaU0JnY0hWdWVXTnZaR1V1ZFdOek1pNWxibU52WkdWZ1hHNWNkQ0FxSUVCelpXVWdQR2gwZEhCek9pOHZiV0YwYUdsaGMySjVibVZ1Y3k1aVpTOXViM1JsY3k5cVlYWmhjMk55YVhCMExXVnVZMjlrYVc1blBseHVYSFFnS2lCQWJXVnRZbVZ5VDJZZ2NIVnVlV052WkdVdWRXTnpNbHh1WEhRZ0tpQkFibUZ0WlNCa1pXTnZaR1ZjYmx4MElDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlITjBjbWx1WnlCVWFHVWdWVzVwWTI5a1pTQnBibkIxZENCemRISnBibWNnS0ZWRFV5MHlLUzVjYmx4MElDb2dRSEpsZEhWeWJuTWdlMEZ5Y21GNWZTQlVhR1VnYm1WM0lHRnljbUY1SUc5bUlHTnZaR1VnY0c5cGJuUnpMbHh1WEhRZ0tpOWNibHgwWm5WdVkzUnBiMjRnZFdOek1tUmxZMjlrWlNoemRISnBibWNwSUh0Y2JseDBYSFIyWVhJZ2IzVjBjSFYwSUQwZ1cxMHNYRzVjZEZ4MElDQWdJR052ZFc1MFpYSWdQU0F3TEZ4dVhIUmNkQ0FnSUNCc1pXNW5kR2dnUFNCemRISnBibWN1YkdWdVozUm9MRnh1WEhSY2RDQWdJQ0IyWVd4MVpTeGNibHgwWEhRZ0lDQWdaWGgwY21FN1hHNWNkRngwZDJocGJHVWdLR052ZFc1MFpYSWdQQ0JzWlc1bmRHZ3BJSHRjYmx4MFhIUmNkSFpoYkhWbElEMGdjM1J5YVc1bkxtTm9ZWEpEYjJSbFFYUW9ZMjkxYm5SbGNpc3JLVHRjYmx4MFhIUmNkR2xtSUNoMllXeDFaU0ErUFNBd2VFUTRNREFnSmlZZ2RtRnNkV1VnUEQwZ01IaEVRa1pHSUNZbUlHTnZkVzUwWlhJZ1BDQnNaVzVuZEdncElIdGNibHgwWEhSY2RGeDBMeThnYUdsbmFDQnpkWEp5YjJkaGRHVXNJR0Z1WkNCMGFHVnlaU0JwY3lCaElHNWxlSFFnWTJoaGNtRmpkR1Z5WEc1Y2RGeDBYSFJjZEdWNGRISmhJRDBnYzNSeWFXNW5MbU5vWVhKRGIyUmxRWFFvWTI5MWJuUmxjaXNyS1R0Y2JseDBYSFJjZEZ4MGFXWWdLQ2hsZUhSeVlTQW1JREI0UmtNd01Da2dQVDBnTUhoRVF6QXdLU0I3SUM4dklHeHZkeUJ6ZFhKeWIyZGhkR1ZjYmx4MFhIUmNkRngwWEhSdmRYUndkWFF1Y0hWemFDZ29LSFpoYkhWbElDWWdNSGd6UmtZcElEdzhJREV3S1NBcklDaGxlSFJ5WVNBbUlEQjRNMFpHS1NBcklEQjRNVEF3TURBcE8xeHVYSFJjZEZ4MFhIUjlJR1ZzYzJVZ2UxeHVYSFJjZEZ4MFhIUmNkQzh2SUhWdWJXRjBZMmhsWkNCemRYSnliMmRoZEdVN0lHOXViSGtnWVhCd1pXNWtJSFJvYVhNZ1kyOWtaU0IxYm1sMExDQnBiaUJqWVhObElIUm9aU0J1WlhoMFhHNWNkRngwWEhSY2RGeDBMeThnWTI5a1pTQjFibWwwSUdseklIUm9aU0JvYVdkb0lITjFjbkp2WjJGMFpTQnZaaUJoSUhOMWNuSnZaMkYwWlNCd1lXbHlYRzVjZEZ4MFhIUmNkRngwYjNWMGNIVjBMbkIxYzJnb2RtRnNkV1VwTzF4dVhIUmNkRngwWEhSY2RHTnZkVzUwWlhJdExUdGNibHgwWEhSY2RGeDBmVnh1WEhSY2RGeDBmU0JsYkhObElIdGNibHgwWEhSY2RGeDBiM1YwY0hWMExuQjFjMmdvZG1Gc2RXVXBPMXh1WEhSY2RGeDBmVnh1WEhSY2RIMWNibHgwWEhSeVpYUjFjbTRnYjNWMGNIVjBPMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUVOeVpXRjBaWE1nWVNCemRISnBibWNnWW1GelpXUWdiMjRnWVc0Z1lYSnlZWGtnYjJZZ2JuVnRaWEpwWXlCamIyUmxJSEJ2YVc1MGN5NWNibHgwSUNvZ1FITmxaU0JnY0hWdWVXTnZaR1V1ZFdOek1pNWtaV052WkdWZ1hHNWNkQ0FxSUVCdFpXMWlaWEpQWmlCd2RXNTVZMjlrWlM1MVkzTXlYRzVjZENBcUlFQnVZVzFsSUdWdVkyOWtaVnh1WEhRZ0tpQkFjR0Z5WVcwZ2UwRnljbUY1ZlNCamIyUmxVRzlwYm5SeklGUm9aU0JoY25KaGVTQnZaaUJ1ZFcxbGNtbGpJR052WkdVZ2NHOXBiblJ6TGx4dVhIUWdLaUJBY21WMGRYSnVjeUI3VTNSeWFXNW5mU0JVYUdVZ2JtVjNJRlZ1YVdOdlpHVWdjM1J5YVc1bklDaFZRMU10TWlrdVhHNWNkQ0FxTDF4dVhIUm1kVzVqZEdsdmJpQjFZM015Wlc1amIyUmxLR0Z5Y21GNUtTQjdYRzVjZEZ4MGNtVjBkWEp1SUcxaGNDaGhjbkpoZVN3Z1puVnVZM1JwYjI0b2RtRnNkV1VwSUh0Y2JseDBYSFJjZEhaaGNpQnZkWFJ3ZFhRZ1BTQW5KenRjYmx4MFhIUmNkR2xtSUNoMllXeDFaU0ErSURCNFJrWkdSaWtnZTF4dVhIUmNkRngwWEhSMllXeDFaU0F0UFNBd2VERXdNREF3TzF4dVhIUmNkRngwWEhSdmRYUndkWFFnS3owZ2MzUnlhVzVuUm5KdmJVTm9ZWEpEYjJSbEtIWmhiSFZsSUQ0K1BpQXhNQ0FtSURCNE0wWkdJSHdnTUhoRU9EQXdLVHRjYmx4MFhIUmNkRngwZG1Gc2RXVWdQU0F3ZUVSRE1EQWdmQ0IyWVd4MVpTQW1JREI0TTBaR08xeHVYSFJjZEZ4MGZWeHVYSFJjZEZ4MGIzVjBjSFYwSUNzOUlITjBjbWx1WjBaeWIyMURhR0Z5UTI5a1pTaDJZV3gxWlNrN1hHNWNkRngwWEhSeVpYUjFjbTRnYjNWMGNIVjBPMXh1WEhSY2RIMHBMbXB2YVc0b0p5Y3BPMXh1WEhSOVhHNWNibHgwTHlvcVhHNWNkQ0FxSUVOdmJuWmxjblJ6SUdFZ1ltRnphV01nWTI5a1pTQndiMmx1ZENCcGJuUnZJR0VnWkdsbmFYUXZhVzUwWldkbGNpNWNibHgwSUNvZ1FITmxaU0JnWkdsbmFYUlViMEpoYzJsaktDbGdYRzVjZENBcUlFQndjbWwyWVhSbFhHNWNkQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0JqYjJSbFVHOXBiblFnVkdobElHSmhjMmxqSUc1MWJXVnlhV01nWTI5a1pTQndiMmx1ZENCMllXeDFaUzVjYmx4MElDb2dRSEpsZEhWeWJuTWdlMDUxYldKbGNuMGdWR2hsSUc1MWJXVnlhV01nZG1Gc2RXVWdiMllnWVNCaVlYTnBZeUJqYjJSbElIQnZhVzUwSUNobWIzSWdkWE5sSUdsdVhHNWNkQ0FxSUhKbGNISmxjMlZ1ZEdsdVp5QnBiblJsWjJWeWN5a2dhVzRnZEdobElISmhibWRsSUdBd1lDQjBieUJnWW1GelpTQXRJREZnTENCdmNpQmdZbUZ6WldBZ2FXWmNibHgwSUNvZ2RHaGxJR052WkdVZ2NHOXBiblFnWkc5bGN5QnViM1FnY21Wd2NtVnpaVzUwSUdFZ2RtRnNkV1V1WEc1Y2RDQXFMMXh1WEhSbWRXNWpkR2x2YmlCaVlYTnBZMVJ2UkdsbmFYUW9ZMjlrWlZCdmFXNTBLU0I3WEc1Y2RGeDBhV1lnS0dOdlpHVlFiMmx1ZENBdElEUTRJRHdnTVRBcElIdGNibHgwWEhSY2RISmxkSFZ5YmlCamIyUmxVRzlwYm5RZ0xTQXlNanRjYmx4MFhIUjlYRzVjZEZ4MGFXWWdLR052WkdWUWIybHVkQ0F0SURZMUlEd2dNallwSUh0Y2JseDBYSFJjZEhKbGRIVnliaUJqYjJSbFVHOXBiblFnTFNBMk5UdGNibHgwWEhSOVhHNWNkRngwYVdZZ0tHTnZaR1ZRYjJsdWRDQXRJRGszSUR3Z01qWXBJSHRjYmx4MFhIUmNkSEpsZEhWeWJpQmpiMlJsVUc5cGJuUWdMU0E1Tnp0Y2JseDBYSFI5WEc1Y2RGeDBjbVYwZFhKdUlHSmhjMlU3WEc1Y2RIMWNibHh1WEhRdktpcGNibHgwSUNvZ1EyOXVkbVZ5ZEhNZ1lTQmthV2RwZEM5cGJuUmxaMlZ5SUdsdWRHOGdZU0JpWVhOcFl5QmpiMlJsSUhCdmFXNTBMbHh1WEhRZ0tpQkFjMlZsSUdCaVlYTnBZMVJ2UkdsbmFYUW9LV0JjYmx4MElDb2dRSEJ5YVhaaGRHVmNibHgwSUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUdScFoybDBJRlJvWlNCdWRXMWxjbWxqSUhaaGJIVmxJRzltSUdFZ1ltRnphV01nWTI5a1pTQndiMmx1ZEM1Y2JseDBJQ29nUUhKbGRIVnlibk1nZTA1MWJXSmxjbjBnVkdobElHSmhjMmxqSUdOdlpHVWdjRzlwYm5RZ2QyaHZjMlVnZG1Gc2RXVWdLSGRvWlc0Z2RYTmxaQ0JtYjNKY2JseDBJQ29nY21Wd2NtVnpaVzUwYVc1bklHbHVkR1ZuWlhKektTQnBjeUJnWkdsbmFYUmdMQ0IzYUdsamFDQnVaV1ZrY3lCMGJ5QmlaU0JwYmlCMGFHVWdjbUZ1WjJWY2JseDBJQ29nWURCZ0lIUnZJR0JpWVhObElDMGdNV0F1SUVsbUlHQm1iR0ZuWUNCcGN5QnViMjR0ZW1WeWJ5d2dkR2hsSUhWd2NHVnlZMkZ6WlNCbWIzSnRJR2x6WEc1Y2RDQXFJSFZ6WldRN0lHVnNjMlVzSUhSb1pTQnNiM2RsY21OaGMyVWdabTl5YlNCcGN5QjFjMlZrTGlCVWFHVWdZbVZvWVhacGIzSWdhWE1nZFc1a1pXWnBibVZrWEc1Y2RDQXFJR2xtSUdCbWJHRm5ZQ0JwY3lCdWIyNHRlbVZ5YnlCaGJtUWdZR1JwWjJsMFlDQm9ZWE1nYm04Z2RYQndaWEpqWVhObElHWnZjbTB1WEc1Y2RDQXFMMXh1WEhSbWRXNWpkR2x2YmlCa2FXZHBkRlJ2UW1GemFXTW9aR2xuYVhRc0lHWnNZV2NwSUh0Y2JseDBYSFF2THlBZ01DNHVNalVnYldGd0lIUnZJRUZUUTBsSklHRXVMbm9nYjNJZ1FTNHVXbHh1WEhSY2RDOHZJREkyTGk0ek5TQnRZWEFnZEc4Z1FWTkRTVWtnTUM0dU9WeHVYSFJjZEhKbGRIVnliaUJrYVdkcGRDQXJJREl5SUNzZ056VWdLaUFvWkdsbmFYUWdQQ0F5TmlrZ0xTQW9LR1pzWVdjZ0lUMGdNQ2tnUER3Z05TazdYRzVjZEgxY2JseHVYSFF2S2lwY2JseDBJQ29nUW1saGN5QmhaR0Z3ZEdGMGFXOXVJR1oxYm1OMGFXOXVJR0Z6SUhCbGNpQnpaV04wYVc5dUlETXVOQ0J2WmlCU1JrTWdNelE1TWk1Y2JseDBJQ29nYUhSMGNEb3ZMM1J2YjJ4ekxtbGxkR1l1YjNKbkwyaDBiV3d2Y21aak16UTVNaU56WldOMGFXOXVMVE11TkZ4dVhIUWdLaUJBY0hKcGRtRjBaVnh1WEhRZ0tpOWNibHgwWm5WdVkzUnBiMjRnWVdSaGNIUW9aR1ZzZEdFc0lHNTFiVkJ2YVc1MGN5d2dabWx5YzNSVWFXMWxLU0I3WEc1Y2RGeDBkbUZ5SUdzZ1BTQXdPMXh1WEhSY2RHUmxiSFJoSUQwZ1ptbHljM1JVYVcxbElEOGdabXh2YjNJb1pHVnNkR0VnTHlCa1lXMXdLU0E2SUdSbGJIUmhJRDQrSURFN1hHNWNkRngwWkdWc2RHRWdLejBnWm14dmIzSW9aR1ZzZEdFZ0x5QnVkVzFRYjJsdWRITXBPMXh1WEhSY2RHWnZjaUFvTHlvZ2JtOGdhVzVwZEdsaGJHbDZZWFJwYjI0Z0tpODdJR1JsYkhSaElENGdZbUZ6WlUxcGJuVnpWRTFwYmlBcUlIUk5ZWGdnUGo0Z01Uc2dheUFyUFNCaVlYTmxLU0I3WEc1Y2RGeDBYSFJrWld4MFlTQTlJR1pzYjI5eUtHUmxiSFJoSUM4Z1ltRnpaVTFwYm5WelZFMXBiaWs3WEc1Y2RGeDBmVnh1WEhSY2RISmxkSFZ5YmlCbWJHOXZjaWhySUNzZ0tHSmhjMlZOYVc1MWMxUk5hVzRnS3lBeEtTQXFJR1JsYkhSaElDOGdLR1JsYkhSaElDc2djMnRsZHlrcE8xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRU52Ym5abGNuUnpJR0VnVUhWdWVXTnZaR1VnYzNSeWFXNW5JRzltSUVGVFEwbEpMVzl1YkhrZ2MzbHRZbTlzY3lCMGJ5QmhJSE4wY21sdVp5QnZaaUJWYm1samIyUmxYRzVjZENBcUlITjViV0p2YkhNdVhHNWNkQ0FxSUVCdFpXMWlaWEpQWmlCd2RXNTVZMjlrWlZ4dVhIUWdLaUJBY0dGeVlXMGdlMU4wY21sdVozMGdhVzV3ZFhRZ1ZHaGxJRkIxYm5samIyUmxJSE4wY21sdVp5QnZaaUJCVTBOSlNTMXZibXg1SUhONWJXSnZiSE11WEc1Y2RDQXFJRUJ5WlhSMWNtNXpJSHRUZEhKcGJtZDlJRlJvWlNCeVpYTjFiSFJwYm1jZ2MzUnlhVzVuSUc5bUlGVnVhV052WkdVZ2MzbHRZbTlzY3k1Y2JseDBJQ292WEc1Y2RHWjFibU4wYVc5dUlHUmxZMjlrWlNocGJuQjFkQ2tnZTF4dVhIUmNkQzh2SUVSdmJpZDBJSFZ6WlNCVlExTXRNbHh1WEhSY2RIWmhjaUJ2ZFhSd2RYUWdQU0JiWFN4Y2JseDBYSFFnSUNBZ2FXNXdkWFJNWlc1bmRHZ2dQU0JwYm5CMWRDNXNaVzVuZEdnc1hHNWNkRngwSUNBZ0lHOTFkQ3hjYmx4MFhIUWdJQ0FnYVNBOUlEQXNYRzVjZEZ4MElDQWdJRzRnUFNCcGJtbDBhV0ZzVGl4Y2JseDBYSFFnSUNBZ1ltbGhjeUE5SUdsdWFYUnBZV3hDYVdGekxGeHVYSFJjZENBZ0lDQmlZWE5wWXl4Y2JseDBYSFFnSUNBZ2FpeGNibHgwWEhRZ0lDQWdhVzVrWlhnc1hHNWNkRngwSUNBZ0lHOXNaR2tzWEc1Y2RGeDBJQ0FnSUhjc1hHNWNkRngwSUNBZ0lHc3NYRzVjZEZ4MElDQWdJR1JwWjJsMExGeHVYSFJjZENBZ0lDQjBMRnh1WEhSY2RDQWdJQ0F2S2lvZ1EyRmphR1ZrSUdOaGJHTjFiR0YwYVc5dUlISmxjM1ZzZEhNZ0tpOWNibHgwWEhRZ0lDQWdZbUZ6WlUxcGJuVnpWRHRjYmx4dVhIUmNkQzh2SUVoaGJtUnNaU0IwYUdVZ1ltRnphV01nWTI5a1pTQndiMmx1ZEhNNklHeGxkQ0JnWW1GemFXTmdJR0psSUhSb1pTQnVkVzFpWlhJZ2IyWWdhVzV3ZFhRZ1kyOWtaVnh1WEhSY2RDOHZJSEJ2YVc1MGN5QmlaV1p2Y21VZ2RHaGxJR3hoYzNRZ1pHVnNhVzFwZEdWeUxDQnZjaUJnTUdBZ2FXWWdkR2hsY21VZ2FYTWdibTl1WlN3Z2RHaGxiaUJqYjNCNVhHNWNkRngwTHk4Z2RHaGxJR1pwY25OMElHSmhjMmxqSUdOdlpHVWdjRzlwYm5SeklIUnZJSFJvWlNCdmRYUndkWFF1WEc1Y2JseDBYSFJpWVhOcFl5QTlJR2x1Y0hWMExteGhjM1JKYm1SbGVFOW1LR1JsYkdsdGFYUmxjaWs3WEc1Y2RGeDBhV1lnS0dKaGMybGpJRHdnTUNrZ2UxeHVYSFJjZEZ4MFltRnphV01nUFNBd08xeHVYSFJjZEgxY2JseHVYSFJjZEdadmNpQW9haUE5SURBN0lHb2dQQ0JpWVhOcFl6c2dLeXRxS1NCN1hHNWNkRngwWEhRdkx5QnBaaUJwZENkeklHNXZkQ0JoSUdKaGMybGpJR052WkdVZ2NHOXBiblJjYmx4MFhIUmNkR2xtSUNocGJuQjFkQzVqYUdGeVEyOWtaVUYwS0dvcElENDlJREI0T0RBcElIdGNibHgwWEhSY2RGeDBaWEp5YjNJb0oyNXZkQzFpWVhOcFl5Y3BPMXh1WEhSY2RGeDBmVnh1WEhSY2RGeDBiM1YwY0hWMExuQjFjMmdvYVc1d2RYUXVZMmhoY2tOdlpHVkJkQ2hxS1NrN1hHNWNkRngwZlZ4dVhHNWNkRngwTHk4Z1RXRnBiaUJrWldOdlpHbHVaeUJzYjI5d09pQnpkR0Z5ZENCcWRYTjBJR0ZtZEdWeUlIUm9aU0JzWVhOMElHUmxiR2x0YVhSbGNpQnBaaUJoYm5rZ1ltRnphV01nWTI5a1pWeHVYSFJjZEM4dklIQnZhVzUwY3lCM1pYSmxJR052Y0dsbFpEc2djM1JoY25RZ1lYUWdkR2hsSUdKbFoybHVibWx1WnlCdmRHaGxjbmRwYzJVdVhHNWNibHgwWEhSbWIzSWdLR2x1WkdWNElEMGdZbUZ6YVdNZ1BpQXdJRDhnWW1GemFXTWdLeUF4SURvZ01Ec2dhVzVrWlhnZ1BDQnBibkIxZEV4bGJtZDBhRHNnTHlvZ2JtOGdabWx1WVd3Z1pYaHdjbVZ6YzJsdmJpQXFMeWtnZTF4dVhHNWNkRngwWEhRdkx5QmdhVzVrWlhoZ0lHbHpJSFJvWlNCcGJtUmxlQ0J2WmlCMGFHVWdibVY0ZENCamFHRnlZV04wWlhJZ2RHOGdZbVVnWTI5dWMzVnRaV1F1WEc1Y2RGeDBYSFF2THlCRVpXTnZaR1VnWVNCblpXNWxjbUZzYVhwbFpDQjJZWEpwWVdKc1pTMXNaVzVuZEdnZ2FXNTBaV2RsY2lCcGJuUnZJR0JrWld4MFlXQXNYRzVjZEZ4MFhIUXZMeUIzYUdsamFDQm5aWFJ6SUdGa1pHVmtJSFJ2SUdCcFlDNGdWR2hsSUc5MlpYSm1iRzkzSUdOb1pXTnJhVzVuSUdseklHVmhjMmxsY2x4dVhIUmNkRngwTHk4Z2FXWWdkMlVnYVc1amNtVmhjMlVnWUdsZ0lHRnpJSGRsSUdkdkxDQjBhR1Z1SUhOMVluUnlZV04wSUc5bVppQnBkSE1nYzNSaGNuUnBibWRjYmx4MFhIUmNkQzh2SUhaaGJIVmxJR0YwSUhSb1pTQmxibVFnZEc4Z2IySjBZV2x1SUdCa1pXeDBZV0F1WEc1Y2RGeDBYSFJtYjNJZ0tHOXNaR2tnUFNCcExDQjNJRDBnTVN3Z2F5QTlJR0poYzJVN0lDOHFJRzV2SUdOdmJtUnBkR2x2YmlBcUx6c2dheUFyUFNCaVlYTmxLU0I3WEc1Y2JseDBYSFJjZEZ4MGFXWWdLR2x1WkdWNElENDlJR2x1Y0hWMFRHVnVaM1JvS1NCN1hHNWNkRngwWEhSY2RGeDBaWEp5YjNJb0oybHVkbUZzYVdRdGFXNXdkWFFuS1R0Y2JseDBYSFJjZEZ4MGZWeHVYRzVjZEZ4MFhIUmNkR1JwWjJsMElEMGdZbUZ6YVdOVWIwUnBaMmwwS0dsdWNIVjBMbU5vWVhKRGIyUmxRWFFvYVc1a1pYZ3JLeWtwTzF4dVhHNWNkRngwWEhSY2RHbG1JQ2hrYVdkcGRDQStQU0JpWVhObElIeDhJR1JwWjJsMElENGdabXh2YjNJb0tHMWhlRWx1ZENBdElHa3BJQzhnZHlrcElIdGNibHgwWEhSY2RGeDBYSFJsY25KdmNpZ25iM1psY21ac2IzY25LVHRjYmx4MFhIUmNkRngwZlZ4dVhHNWNkRngwWEhSY2RHa2dLejBnWkdsbmFYUWdLaUIzTzF4dVhIUmNkRngwWEhSMElEMGdheUE4UFNCaWFXRnpJRDhnZEUxcGJpQTZJQ2hySUQ0OUlHSnBZWE1nS3lCMFRXRjRJRDhnZEUxaGVDQTZJR3NnTFNCaWFXRnpLVHRjYmx4dVhIUmNkRngwWEhScFppQW9aR2xuYVhRZ1BDQjBLU0I3WEc1Y2RGeDBYSFJjZEZ4MFluSmxZV3M3WEc1Y2RGeDBYSFJjZEgxY2JseHVYSFJjZEZ4MFhIUmlZWE5sVFdsdWRYTlVJRDBnWW1GelpTQXRJSFE3WEc1Y2RGeDBYSFJjZEdsbUlDaDNJRDRnWm14dmIzSW9iV0Y0U1c1MElDOGdZbUZ6WlUxcGJuVnpWQ2twSUh0Y2JseDBYSFJjZEZ4MFhIUmxjbkp2Y2lnbmIzWmxjbVpzYjNjbktUdGNibHgwWEhSY2RGeDBmVnh1WEc1Y2RGeDBYSFJjZEhjZ0tqMGdZbUZ6WlUxcGJuVnpWRHRjYmx4dVhIUmNkRngwZlZ4dVhHNWNkRngwWEhSdmRYUWdQU0J2ZFhSd2RYUXViR1Z1WjNSb0lDc2dNVHRjYmx4MFhIUmNkR0pwWVhNZ1BTQmhaR0Z3ZENocElDMGdiMnhrYVN3Z2IzVjBMQ0J2YkdScElEMDlJREFwTzF4dVhHNWNkRngwWEhRdkx5QmdhV0FnZDJGeklITjFjSEJ2YzJWa0lIUnZJSGR5WVhBZ1lYSnZkVzVrSUdaeWIyMGdZRzkxZEdBZ2RHOGdZREJnTEZ4dVhIUmNkRngwTHk4Z2FXNWpjbVZ0Wlc1MGFXNW5JR0J1WUNCbFlXTm9JSFJwYldVc0lITnZJSGRsSjJ4c0lHWnBlQ0IwYUdGMElHNXZkenBjYmx4MFhIUmNkR2xtSUNobWJHOXZjaWhwSUM4Z2IzVjBLU0ErSUcxaGVFbHVkQ0F0SUc0cElIdGNibHgwWEhSY2RGeDBaWEp5YjNJb0oyOTJaWEptYkc5M0p5azdYRzVjZEZ4MFhIUjlYRzVjYmx4MFhIUmNkRzRnS3owZ1pteHZiM0lvYVNBdklHOTFkQ2s3WEc1Y2RGeDBYSFJwSUNVOUlHOTFkRHRjYmx4dVhIUmNkRngwTHk4Z1NXNXpaWEowSUdCdVlDQmhkQ0J3YjNOcGRHbHZiaUJnYVdBZ2IyWWdkR2hsSUc5MWRIQjFkRnh1WEhSY2RGeDBiM1YwY0hWMExuTndiR2xqWlNocEt5c3NJREFzSUc0cE8xeHVYRzVjZEZ4MGZWeHVYRzVjZEZ4MGNtVjBkWEp1SUhWamN6SmxibU52WkdVb2IzVjBjSFYwS1R0Y2JseDBmVnh1WEc1Y2RDOHFLbHh1WEhRZ0tpQkRiMjUyWlhKMGN5QmhJSE4wY21sdVp5QnZaaUJWYm1samIyUmxJSE41YldKdmJITWdLR1V1Wnk0Z1lTQmtiMjFoYVc0Z2JtRnRaU0JzWVdKbGJDa2dkRzhnWVZ4dVhIUWdLaUJRZFc1NVkyOWtaU0J6ZEhKcGJtY2diMllnUVZORFNVa3RiMjVzZVNCemVXMWliMnh6TGx4dVhIUWdLaUJBYldWdFltVnlUMllnY0hWdWVXTnZaR1ZjYmx4MElDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlHbHVjSFYwSUZSb1pTQnpkSEpwYm1jZ2IyWWdWVzVwWTI5a1pTQnplVzFpYjJ4ekxseHVYSFFnS2lCQWNtVjBkWEp1Y3lCN1UzUnlhVzVuZlNCVWFHVWdjbVZ6ZFd4MGFXNW5JRkIxYm5samIyUmxJSE4wY21sdVp5QnZaaUJCVTBOSlNTMXZibXg1SUhONWJXSnZiSE11WEc1Y2RDQXFMMXh1WEhSbWRXNWpkR2x2YmlCbGJtTnZaR1VvYVc1d2RYUXBJSHRjYmx4MFhIUjJZWElnYml4Y2JseDBYSFFnSUNBZ1pHVnNkR0VzWEc1Y2RGeDBJQ0FnSUdoaGJtUnNaV1JEVUVOdmRXNTBMRnh1WEhSY2RDQWdJQ0JpWVhOcFkweGxibWQwYUN4Y2JseDBYSFFnSUNBZ1ltbGhjeXhjYmx4MFhIUWdJQ0FnYWl4Y2JseDBYSFFnSUNBZ2JTeGNibHgwWEhRZ0lDQWdjU3hjYmx4MFhIUWdJQ0FnYXl4Y2JseDBYSFFnSUNBZ2RDeGNibHgwWEhRZ0lDQWdZM1Z5Y21WdWRGWmhiSFZsTEZ4dVhIUmNkQ0FnSUNCdmRYUndkWFFnUFNCYlhTeGNibHgwWEhRZ0lDQWdMeW9xSUdCcGJuQjFkRXhsYm1kMGFHQWdkMmxzYkNCb2IyeGtJSFJvWlNCdWRXMWlaWElnYjJZZ1kyOWtaU0J3YjJsdWRITWdhVzRnWUdsdWNIVjBZQzRnS2k5Y2JseDBYSFFnSUNBZ2FXNXdkWFJNWlc1bmRHZ3NYRzVjZEZ4MElDQWdJQzhxS2lCRFlXTm9aV1FnWTJGc1kzVnNZWFJwYjI0Z2NtVnpkV3gwY3lBcUwxeHVYSFJjZENBZ0lDQm9ZVzVrYkdWa1ExQkRiM1Z1ZEZCc2RYTlBibVVzWEc1Y2RGeDBJQ0FnSUdKaGMyVk5hVzUxYzFRc1hHNWNkRngwSUNBZ0lIRk5hVzUxYzFRN1hHNWNibHgwWEhRdkx5QkRiMjUyWlhKMElIUm9aU0JwYm5CMWRDQnBiaUJWUTFNdE1pQjBieUJWYm1samIyUmxYRzVjZEZ4MGFXNXdkWFFnUFNCMVkzTXlaR1ZqYjJSbEtHbHVjSFYwS1R0Y2JseHVYSFJjZEM4dklFTmhZMmhsSUhSb1pTQnNaVzVuZEdoY2JseDBYSFJwYm5CMWRFeGxibWQwYUNBOUlHbHVjSFYwTG14bGJtZDBhRHRjYmx4dVhIUmNkQzh2SUVsdWFYUnBZV3hwZW1VZ2RHaGxJSE4wWVhSbFhHNWNkRngwYmlBOUlHbHVhWFJwWVd4T08xeHVYSFJjZEdSbGJIUmhJRDBnTUR0Y2JseDBYSFJpYVdGeklEMGdhVzVwZEdsaGJFSnBZWE03WEc1Y2JseDBYSFF2THlCSVlXNWtiR1VnZEdobElHSmhjMmxqSUdOdlpHVWdjRzlwYm5SelhHNWNkRngwWm05eUlDaHFJRDBnTURzZ2FpQThJR2x1Y0hWMFRHVnVaM1JvT3lBcksyb3BJSHRjYmx4MFhIUmNkR04xY25KbGJuUldZV3gxWlNBOUlHbHVjSFYwVzJwZE8xeHVYSFJjZEZ4MGFXWWdLR04xY25KbGJuUldZV3gxWlNBOElEQjRPREFwSUh0Y2JseDBYSFJjZEZ4MGIzVjBjSFYwTG5CMWMyZ29jM1J5YVc1blJuSnZiVU5vWVhKRGIyUmxLR04xY25KbGJuUldZV3gxWlNrcE8xeHVYSFJjZEZ4MGZWeHVYSFJjZEgxY2JseHVYSFJjZEdoaGJtUnNaV1JEVUVOdmRXNTBJRDBnWW1GemFXTk1aVzVuZEdnZ1BTQnZkWFJ3ZFhRdWJHVnVaM1JvTzF4dVhHNWNkRngwTHk4Z1lHaGhibVJzWldSRFVFTnZkVzUwWUNCcGN5QjBhR1VnYm5WdFltVnlJRzltSUdOdlpHVWdjRzlwYm5SeklIUm9ZWFFnYUdGMlpTQmlaV1Z1SUdoaGJtUnNaV1E3WEc1Y2RGeDBMeThnWUdKaGMybGpUR1Z1WjNSb1lDQnBjeUIwYUdVZ2JuVnRZbVZ5SUc5bUlHSmhjMmxqSUdOdlpHVWdjRzlwYm5SekxseHVYRzVjZEZ4MEx5OGdSbWx1YVhOb0lIUm9aU0JpWVhOcFl5QnpkSEpwYm1jZ0xTQnBaaUJwZENCcGN5QnViM1FnWlcxd2RIa2dMU0IzYVhSb0lHRWdaR1ZzYVcxcGRHVnlYRzVjZEZ4MGFXWWdLR0poYzJsalRHVnVaM1JvS1NCN1hHNWNkRngwWEhSdmRYUndkWFF1Y0hWemFDaGtaV3hwYldsMFpYSXBPMXh1WEhSY2RIMWNibHh1WEhSY2RDOHZJRTFoYVc0Z1pXNWpiMlJwYm1jZ2JHOXZjRHBjYmx4MFhIUjNhR2xzWlNBb2FHRnVaR3hsWkVOUVEyOTFiblFnUENCcGJuQjFkRXhsYm1kMGFDa2dlMXh1WEc1Y2RGeDBYSFF2THlCQmJHd2dibTl1TFdKaGMybGpJR052WkdVZ2NHOXBiblJ6SUR3Z2JpQm9ZWFpsSUdKbFpXNGdhR0Z1Wkd4bFpDQmhiSEpsWVdSNUxpQkdhVzVrSUhSb1pTQnVaWGgwWEc1Y2RGeDBYSFF2THlCc1lYSm5aWElnYjI1bE9seHVYSFJjZEZ4MFptOXlJQ2h0SUQwZ2JXRjRTVzUwTENCcUlEMGdNRHNnYWlBOElHbHVjSFYwVEdWdVozUm9PeUFySzJvcElIdGNibHgwWEhSY2RGeDBZM1Z5Y21WdWRGWmhiSFZsSUQwZ2FXNXdkWFJiYWwwN1hHNWNkRngwWEhSY2RHbG1JQ2hqZFhKeVpXNTBWbUZzZFdVZ1BqMGdiaUFtSmlCamRYSnlaVzUwVm1Gc2RXVWdQQ0J0S1NCN1hHNWNkRngwWEhSY2RGeDBiU0E5SUdOMWNuSmxiblJXWVd4MVpUdGNibHgwWEhSY2RGeDBmVnh1WEhSY2RGeDBmVnh1WEc1Y2RGeDBYSFF2THlCSmJtTnlaV0Z6WlNCZ1pHVnNkR0ZnSUdWdWIzVm5hQ0IwYnlCaFpIWmhibU5sSUhSb1pTQmtaV052WkdWeUozTWdQRzRzYVQ0Z2MzUmhkR1VnZEc4Z1BHMHNNRDRzWEc1Y2RGeDBYSFF2THlCaWRYUWdaM1ZoY21RZ1lXZGhhVzV6ZENCdmRtVnlabXh2ZDF4dVhIUmNkRngwYUdGdVpHeGxaRU5RUTI5MWJuUlFiSFZ6VDI1bElEMGdhR0Z1Wkd4bFpFTlFRMjkxYm5RZ0t5QXhPMXh1WEhSY2RGeDBhV1lnS0cwZ0xTQnVJRDRnWm14dmIzSW9LRzFoZUVsdWRDQXRJR1JsYkhSaEtTQXZJR2hoYm1Sc1pXUkRVRU52ZFc1MFVHeDFjMDl1WlNrcElIdGNibHgwWEhSY2RGeDBaWEp5YjNJb0oyOTJaWEptYkc5M0p5azdYRzVjZEZ4MFhIUjlYRzVjYmx4MFhIUmNkR1JsYkhSaElDczlJQ2h0SUMwZ2Jpa2dLaUJvWVc1a2JHVmtRMUJEYjNWdWRGQnNkWE5QYm1VN1hHNWNkRngwWEhSdUlEMGdiVHRjYmx4dVhIUmNkRngwWm05eUlDaHFJRDBnTURzZ2FpQThJR2x1Y0hWMFRHVnVaM1JvT3lBcksyb3BJSHRjYmx4MFhIUmNkRngwWTNWeWNtVnVkRlpoYkhWbElEMGdhVzV3ZFhSYmFsMDdYRzVjYmx4MFhIUmNkRngwYVdZZ0tHTjFjbkpsYm5SV1lXeDFaU0E4SUc0Z0ppWWdLeXRrWld4MFlTQStJRzFoZUVsdWRDa2dlMXh1WEhSY2RGeDBYSFJjZEdWeWNtOXlLQ2R2ZG1WeVpteHZkeWNwTzF4dVhIUmNkRngwWEhSOVhHNWNibHgwWEhSY2RGeDBhV1lnS0dOMWNuSmxiblJXWVd4MVpTQTlQU0J1S1NCN1hHNWNkRngwWEhSY2RGeDBMeThnVW1Wd2NtVnpaVzUwSUdSbGJIUmhJR0Z6SUdFZ1oyVnVaWEpoYkdsNlpXUWdkbUZ5YVdGaWJHVXRiR1Z1WjNSb0lHbHVkR1ZuWlhKY2JseDBYSFJjZEZ4MFhIUm1iM0lnS0hFZ1BTQmtaV3gwWVN3Z2F5QTlJR0poYzJVN0lDOHFJRzV2SUdOdmJtUnBkR2x2YmlBcUx6c2dheUFyUFNCaVlYTmxLU0I3WEc1Y2RGeDBYSFJjZEZ4MFhIUjBJRDBnYXlBOFBTQmlhV0Z6SUQ4Z2RFMXBiaUE2SUNocklENDlJR0pwWVhNZ0t5QjBUV0Y0SUQ4Z2RFMWhlQ0E2SUdzZ0xTQmlhV0Z6S1R0Y2JseDBYSFJjZEZ4MFhIUmNkR2xtSUNoeElEd2dkQ2tnZTF4dVhIUmNkRngwWEhSY2RGeDBYSFJpY21WaGF6dGNibHgwWEhSY2RGeDBYSFJjZEgxY2JseDBYSFJjZEZ4MFhIUmNkSEZOYVc1MWMxUWdQU0J4SUMwZ2REdGNibHgwWEhSY2RGeDBYSFJjZEdKaGMyVk5hVzUxYzFRZ1BTQmlZWE5sSUMwZ2REdGNibHgwWEhSY2RGeDBYSFJjZEc5MWRIQjFkQzV3ZFhOb0tGeHVYSFJjZEZ4MFhIUmNkRngwWEhSemRISnBibWRHY205dFEyaGhja052WkdVb1pHbG5hWFJVYjBKaGMybGpLSFFnS3lCeFRXbHVkWE5VSUNVZ1ltRnpaVTFwYm5WelZDd2dNQ2twWEc1Y2RGeDBYSFJjZEZ4MFhIUXBPMXh1WEhSY2RGeDBYSFJjZEZ4MGNTQTlJR1pzYjI5eUtIRk5hVzUxYzFRZ0x5QmlZWE5sVFdsdWRYTlVLVHRjYmx4MFhIUmNkRngwWEhSOVhHNWNibHgwWEhSY2RGeDBYSFJ2ZFhSd2RYUXVjSFZ6YUNoemRISnBibWRHY205dFEyaGhja052WkdVb1pHbG5hWFJVYjBKaGMybGpLSEVzSURBcEtTazdYRzVjZEZ4MFhIUmNkRngwWW1saGN5QTlJR0ZrWVhCMEtHUmxiSFJoTENCb1lXNWtiR1ZrUTFCRGIzVnVkRkJzZFhOUGJtVXNJR2hoYm1Sc1pXUkRVRU52ZFc1MElEMDlJR0poYzJsalRHVnVaM1JvS1R0Y2JseDBYSFJjZEZ4MFhIUmtaV3gwWVNBOUlEQTdYRzVjZEZ4MFhIUmNkRngwS3l0b1lXNWtiR1ZrUTFCRGIzVnVkRHRjYmx4MFhIUmNkRngwZlZ4dVhIUmNkRngwZlZ4dVhHNWNkRngwWEhRcksyUmxiSFJoTzF4dVhIUmNkRngwS3l0dU8xeHVYRzVjZEZ4MGZWeHVYSFJjZEhKbGRIVnliaUJ2ZFhSd2RYUXVhbTlwYmlnbkp5azdYRzVjZEgxY2JseHVYSFF2S2lwY2JseDBJQ29nUTI5dWRtVnlkSE1nWVNCUWRXNTVZMjlrWlNCemRISnBibWNnY21Wd2NtVnpaVzUwYVc1bklHRWdaRzl0WVdsdUlHNWhiV1VnYjNJZ1lXNGdaVzFoYVd3Z1lXUmtjbVZ6YzF4dVhIUWdLaUIwYnlCVmJtbGpiMlJsTGlCUGJteDVJSFJvWlNCUWRXNTVZMjlrWldRZ2NHRnlkSE1nYjJZZ2RHaGxJR2x1Y0hWMElIZHBiR3dnWW1VZ1kyOXVkbVZ5ZEdWa0xDQnBMbVV1WEc1Y2RDQXFJR2wwSUdSdlpYTnVKM1FnYldGMGRHVnlJR2xtSUhsdmRTQmpZV3hzSUdsMElHOXVJR0VnYzNSeWFXNW5JSFJvWVhRZ2FHRnpJR0ZzY21WaFpIa2dZbVZsYmx4dVhIUWdLaUJqYjI1MlpYSjBaV1FnZEc4Z1ZXNXBZMjlrWlM1Y2JseDBJQ29nUUcxbGJXSmxjazltSUhCMWJubGpiMlJsWEc1Y2RDQXFJRUJ3WVhKaGJTQjdVM1J5YVc1bmZTQnBibkIxZENCVWFHVWdVSFZ1ZVdOdlpHVmtJR1J2YldGcGJpQnVZVzFsSUc5eUlHVnRZV2xzSUdGa1pISmxjM01nZEc5Y2JseDBJQ29nWTI5dWRtVnlkQ0IwYnlCVmJtbGpiMlJsTGx4dVhIUWdLaUJBY21WMGRYSnVjeUI3VTNSeWFXNW5mU0JVYUdVZ1ZXNXBZMjlrWlNCeVpYQnlaWE5sYm5SaGRHbHZiaUJ2WmlCMGFHVWdaMmwyWlc0Z1VIVnVlV052WkdWY2JseDBJQ29nYzNSeWFXNW5MbHh1WEhRZ0tpOWNibHgwWm5WdVkzUnBiMjRnZEc5VmJtbGpiMlJsS0dsdWNIVjBLU0I3WEc1Y2RGeDBjbVYwZFhKdUlHMWhjRVJ2YldGcGJpaHBibkIxZEN3Z1puVnVZM1JwYjI0b2MzUnlhVzVuS1NCN1hHNWNkRngwWEhSeVpYUjFjbTRnY21WblpYaFFkVzU1WTI5a1pTNTBaWE4wS0hOMGNtbHVaeWxjYmx4MFhIUmNkRngwUHlCa1pXTnZaR1VvYzNSeWFXNW5Mbk5zYVdObEtEUXBMblJ2VEc5M1pYSkRZWE5sS0NrcFhHNWNkRngwWEhSY2REb2djM1J5YVc1bk8xeHVYSFJjZEgwcE8xeHVYSFI5WEc1Y2JseDBMeW9xWEc1Y2RDQXFJRU52Ym5abGNuUnpJR0VnVlc1cFkyOWtaU0J6ZEhKcGJtY2djbVZ3Y21WelpXNTBhVzVuSUdFZ1pHOXRZV2x1SUc1aGJXVWdiM0lnWVc0Z1pXMWhhV3dnWVdSa2NtVnpjeUIwYjF4dVhIUWdLaUJRZFc1NVkyOWtaUzRnVDI1c2VTQjBhR1VnYm05dUxVRlRRMGxKSUhCaGNuUnpJRzltSUhSb1pTQmtiMjFoYVc0Z2JtRnRaU0IzYVd4c0lHSmxJR052Ym5abGNuUmxaQ3hjYmx4MElDb2dhUzVsTGlCcGRDQmtiMlZ6YmlkMElHMWhkSFJsY2lCcFppQjViM1VnWTJGc2JDQnBkQ0IzYVhSb0lHRWdaRzl0WVdsdUlIUm9ZWFFuY3lCaGJISmxZV1I1SUdsdVhHNWNkQ0FxSUVGVFEwbEpMbHh1WEhRZ0tpQkFiV1Z0WW1WeVQyWWdjSFZ1ZVdOdlpHVmNibHgwSUNvZ1FIQmhjbUZ0SUh0VGRISnBibWQ5SUdsdWNIVjBJRlJvWlNCa2IyMWhhVzRnYm1GdFpTQnZjaUJsYldGcGJDQmhaR1J5WlhOeklIUnZJR052Ym5abGNuUXNJR0Z6SUdGY2JseDBJQ29nVlc1cFkyOWtaU0J6ZEhKcGJtY3VYRzVjZENBcUlFQnlaWFIxY201eklIdFRkSEpwYm1kOUlGUm9aU0JRZFc1NVkyOWtaU0J5WlhCeVpYTmxiblJoZEdsdmJpQnZaaUIwYUdVZ1oybDJaVzRnWkc5dFlXbHVJRzVoYldVZ2IzSmNibHgwSUNvZ1pXMWhhV3dnWVdSa2NtVnpjeTVjYmx4MElDb3ZYRzVjZEdaMWJtTjBhVzl1SUhSdlFWTkRTVWtvYVc1d2RYUXBJSHRjYmx4MFhIUnlaWFIxY200Z2JXRndSRzl0WVdsdUtHbHVjSFYwTENCbWRXNWpkR2x2YmloemRISnBibWNwSUh0Y2JseDBYSFJjZEhKbGRIVnliaUJ5WldkbGVFNXZia0ZUUTBsSkxuUmxjM1FvYzNSeWFXNW5LVnh1WEhSY2RGeDBYSFEvSUNkNGJpMHRKeUFySUdWdVkyOWtaU2h6ZEhKcGJtY3BYRzVjZEZ4MFhIUmNkRG9nYzNSeWFXNW5PMXh1WEhSY2RIMHBPMXh1WEhSOVhHNWNibHgwTHlvdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTMHRMUzB0TFMwdExTb3ZYRzVjYmx4MEx5b3FJRVJsWm1sdVpTQjBhR1VnY0hWaWJHbGpJRUZRU1NBcUwxeHVYSFJ3ZFc1NVkyOWtaU0E5SUh0Y2JseDBYSFF2S2lwY2JseDBYSFFnS2lCQklITjBjbWx1WnlCeVpYQnlaWE5sYm5ScGJtY2dkR2hsSUdOMWNuSmxiblFnVUhWdWVXTnZaR1V1YW5NZ2RtVnljMmx2YmlCdWRXMWlaWEl1WEc1Y2RGeDBJQ29nUUcxbGJXSmxjazltSUhCMWJubGpiMlJsWEc1Y2RGeDBJQ29nUUhSNWNHVWdVM1J5YVc1blhHNWNkRngwSUNvdlhHNWNkRngwSjNabGNuTnBiMjRuT2lBbk1TNHpMakluTEZ4dVhIUmNkQzhxS2x4dVhIUmNkQ0FxSUVGdUlHOWlhbVZqZENCdlppQnRaWFJvYjJSeklIUnZJR052Ym5abGNuUWdabkp2YlNCS1lYWmhVMk55YVhCMEozTWdhVzUwWlhKdVlXd2dZMmhoY21GamRHVnlYRzVjZEZ4MElDb2djbVZ3Y21WelpXNTBZWFJwYjI0Z0tGVkRVeTB5S1NCMGJ5QlZibWxqYjJSbElHTnZaR1VnY0c5cGJuUnpMQ0JoYm1RZ1ltRmpheTVjYmx4MFhIUWdLaUJBYzJWbElEeG9kSFJ3Y3pvdkwyMWhkR2hwWVhOaWVXNWxibk11WW1VdmJtOTBaWE12YW1GMllYTmpjbWx3ZEMxbGJtTnZaR2x1Wno1Y2JseDBYSFFnS2lCQWJXVnRZbVZ5VDJZZ2NIVnVlV052WkdWY2JseDBYSFFnS2lCQWRIbHdaU0JQWW1wbFkzUmNibHgwWEhRZ0tpOWNibHgwWEhRbmRXTnpNaWM2SUh0Y2JseDBYSFJjZENka1pXTnZaR1VuT2lCMVkzTXlaR1ZqYjJSbExGeHVYSFJjZEZ4MEoyVnVZMjlrWlNjNklIVmpjekpsYm1OdlpHVmNibHgwWEhSOUxGeHVYSFJjZENka1pXTnZaR1VuT2lCa1pXTnZaR1VzWEc1Y2RGeDBKMlZ1WTI5a1pTYzZJR1Z1WTI5a1pTeGNibHgwWEhRbmRHOUJVME5KU1NjNklIUnZRVk5EU1Vrc1hHNWNkRngwSjNSdlZXNXBZMjlrWlNjNklIUnZWVzVwWTI5a1pWeHVYSFI5TzF4dVhHNWNkQzhxS2lCRmVIQnZjMlVnWUhCMWJubGpiMlJsWUNBcUwxeHVYSFF2THlCVGIyMWxJRUZOUkNCaWRXbHNaQ0J2Y0hScGJXbDZaWEp6TENCc2FXdGxJSEl1YW5Nc0lHTm9aV05ySUdadmNpQnpjR1ZqYVdacFl5QmpiMjVrYVhScGIyNGdjR0YwZEdWeWJuTmNibHgwTHk4Z2JHbHJaU0IwYUdVZ1ptOXNiRzkzYVc1bk9seHVYSFJwWmlBb1hHNWNkRngwZEhsd1pXOW1JR1JsWm1sdVpTQTlQU0FuWm5WdVkzUnBiMjRuSUNZbVhHNWNkRngwZEhsd1pXOW1JR1JsWm1sdVpTNWhiV1FnUFQwZ0oyOWlhbVZqZENjZ0ppWmNibHgwWEhSa1pXWnBibVV1WVcxa1hHNWNkQ2tnZTF4dVhIUmNkR1JsWm1sdVpTZ25jSFZ1ZVdOdlpHVW5MQ0JtZFc1amRHbHZiaWdwSUh0Y2JseDBYSFJjZEhKbGRIVnliaUJ3ZFc1NVkyOWtaVHRjYmx4MFhIUjlLVHRjYmx4MGZTQmxiSE5sSUdsbUlDaG1jbVZsUlhod2IzSjBjeUFtSmlCbWNtVmxUVzlrZFd4bEtTQjdYRzVjZEZ4MGFXWWdLRzF2WkhWc1pTNWxlSEJ2Y25SeklEMDlJR1p5WldWRmVIQnZjblJ6S1NCN0lDOHZJR2x1SUU1dlpHVXVhbk1nYjNJZ1VtbHVaMjlLVXlCMk1DNDRMakFyWEc1Y2RGeDBYSFJtY21WbFRXOWtkV3hsTG1WNGNHOXlkSE1nUFNCd2RXNTVZMjlrWlR0Y2JseDBYSFI5SUdWc2MyVWdleUF2THlCcGJpQk9ZWEozYUdGc0lHOXlJRkpwYm1kdlNsTWdkakF1Tnk0d0xWeHVYSFJjZEZ4MFptOXlJQ2hyWlhrZ2FXNGdjSFZ1ZVdOdlpHVXBJSHRjYmx4MFhIUmNkRngwY0hWdWVXTnZaR1V1YUdGelQzZHVVSEp2Y0dWeWRIa29hMlY1S1NBbUppQW9abkpsWlVWNGNHOXlkSE5iYTJWNVhTQTlJSEIxYm5samIyUmxXMnRsZVYwcE8xeHVYSFJjZEZ4MGZWeHVYSFJjZEgxY2JseDBmU0JsYkhObElIc2dMeThnYVc0Z1VtaHBibThnYjNJZ1lTQjNaV0lnWW5KdmQzTmxjbHh1WEhSY2RISnZiM1F1Y0hWdWVXTnZaR1VnUFNCd2RXNTVZMjlrWlR0Y2JseDBmVnh1WEc1OUtIUm9hWE1wS1R0Y2JseHVYRzVjYmk4dkx5OHZMeTh2THk4dkx5OHZMeTh2TDF4dUx5OGdWMFZDVUVGRFN5QkdUMDlVUlZKY2JpOHZJQzR2Zmk5MWNtd3ZmaTl3ZFc1NVkyOWtaUzl3ZFc1NVkyOWtaUzVxYzF4dUx5OGdiVzlrZFd4bElHbGtJRDBnTVRGY2JpOHZJRzF2WkhWc1pTQmphSFZ1YTNNZ1BTQXhJRElnTXlJc0ltMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0b2JXOWtkV3hsS1NCN1hHNWNkR2xtS0NGdGIyUjFiR1V1ZDJWaWNHRmphMUJ2YkhsbWFXeHNLU0I3WEc1Y2RGeDBiVzlrZFd4bExtUmxjSEpsWTJGMFpTQTlJR1oxYm1OMGFXOXVLQ2tnZTMwN1hHNWNkRngwYlc5a2RXeGxMbkJoZEdoeklEMGdXMTA3WEc1Y2RGeDBMeThnYlc5a2RXeGxMbkJoY21WdWRDQTlJSFZ1WkdWbWFXNWxaQ0JpZVNCa1pXWmhkV3gwWEc1Y2RGeDBiVzlrZFd4bExtTm9hV3hrY21WdUlEMGdXMTA3WEc1Y2RGeDBiVzlrZFd4bExuZGxZbkJoWTJ0UWIyeDVabWxzYkNBOUlERTdYRzVjZEgxY2JseDBjbVYwZFhKdUlHMXZaSFZzWlR0Y2JuMWNibHh1WEc1Y2JpOHZMeTh2THk4dkx5OHZMeTh2THk4dkwxeHVMeThnVjBWQ1VFRkRTeUJHVDA5VVJWSmNiaTh2SUNoM1pXSndZV05yS1M5aWRXbHNaR2x1TDIxdlpIVnNaUzVxYzF4dUx5OGdiVzlrZFd4bElHbGtJRDBnTVRKY2JpOHZJRzF2WkhWc1pTQmphSFZ1YTNNZ1BTQXhJRElnTXlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmx4dVpYaHdiM0owY3k1a1pXTnZaR1VnUFNCbGVIQnZjblJ6TG5CaGNuTmxJRDBnY21WeGRXbHlaU2duTGk5a1pXTnZaR1VuS1R0Y2JtVjRjRzl5ZEhNdVpXNWpiMlJsSUQwZ1pYaHdiM0owY3k1emRISnBibWRwWm5rZ1BTQnlaWEYxYVhKbEtDY3VMMlZ1WTI5a1pTY3BPMXh1WEc1Y2JseHVMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZYRzR2THlCWFJVSlFRVU5MSUVaUFQxUkZVbHh1THk4Z0xpOStMM0YxWlhKNWMzUnlhVzVuTDJsdVpHVjRMbXB6WEc0dkx5QnRiMlIxYkdVZ2FXUWdQU0F4TTF4dUx5OGdiVzlrZFd4bElHTm9kVzVyY3lBOUlERWdNaUF6SWl3aUx5OGdRMjl3ZVhKcFoyaDBJRXB2ZVdWdWRDd2dTVzVqTGlCaGJtUWdiM1JvWlhJZ1RtOWtaU0JqYjI1MGNtbGlkWFJ2Y25NdVhHNHZMMXh1THk4Z1VHVnliV2x6YzJsdmJpQnBjeUJvWlhKbFlua2daM0poYm5SbFpDd2dabkpsWlNCdlppQmphR0Z5WjJVc0lIUnZJR0Z1ZVNCd1pYSnpiMjRnYjJKMFlXbHVhVzVuSUdGY2JpOHZJR052Y0hrZ2IyWWdkR2hwY3lCemIyWjBkMkZ5WlNCaGJtUWdZWE56YjJOcFlYUmxaQ0JrYjJOMWJXVnVkR0YwYVc5dUlHWnBiR1Z6SUNoMGFHVmNiaTh2SUZ3aVUyOW1kSGRoY21WY0lpa3NJSFJ2SUdSbFlXd2dhVzRnZEdobElGTnZablIzWVhKbElIZHBkR2h2ZFhRZ2NtVnpkSEpwWTNScGIyNHNJR2x1WTJ4MVpHbHVaMXh1THk4Z2QybDBhRzkxZENCc2FXMXBkR0YwYVc5dUlIUm9aU0J5YVdkb2RITWdkRzhnZFhObExDQmpiM0I1TENCdGIyUnBabmtzSUcxbGNtZGxMQ0J3ZFdKc2FYTm9MRnh1THk4Z1pHbHpkSEpwWW5WMFpTd2djM1ZpYkdsalpXNXpaU3dnWVc1a0wyOXlJSE5sYkd3Z1kyOXdhV1Z6SUc5bUlIUm9aU0JUYjJaMGQyRnlaU3dnWVc1a0lIUnZJSEJsY20xcGRGeHVMeThnY0dWeWMyOXVjeUIwYnlCM2FHOXRJSFJvWlNCVGIyWjBkMkZ5WlNCcGN5Qm1kWEp1YVhOb1pXUWdkRzhnWkc4Z2MyOHNJSE4xWW1wbFkzUWdkRzhnZEdobFhHNHZMeUJtYjJ4c2IzZHBibWNnWTI5dVpHbDBhVzl1Y3pwY2JpOHZYRzR2THlCVWFHVWdZV0p2ZG1VZ1kyOXdlWEpwWjJoMElHNXZkR2xqWlNCaGJtUWdkR2hwY3lCd1pYSnRhWE56YVc5dUlHNXZkR2xqWlNCemFHRnNiQ0JpWlNCcGJtTnNkV1JsWkZ4dUx5OGdhVzRnWVd4c0lHTnZjR2xsY3lCdmNpQnpkV0p6ZEdGdWRHbGhiQ0J3YjNKMGFXOXVjeUJ2WmlCMGFHVWdVMjltZEhkaGNtVXVYRzR2TDF4dUx5OGdWRWhGSUZOUFJsUlhRVkpGSUVsVElGQlNUMVpKUkVWRUlGd2lRVk1nU1ZOY0lpd2dWMGxVU0U5VlZDQlhRVkpTUVU1VVdTQlBSaUJCVGxrZ1MwbE9SQ3dnUlZoUVVrVlRVMXh1THk4Z1QxSWdTVTFRVEVsRlJDd2dTVTVEVEZWRVNVNUhJRUpWVkNCT1QxUWdURWxOU1ZSRlJDQlVUeUJVU0VVZ1YwRlNVa0ZPVkVsRlV5QlBSbHh1THk4Z1RVVlNRMGhCVGxSQlFrbE1TVlJaTENCR1NWUk9SVk5USUVaUFVpQkJJRkJCVWxSSlExVk1RVklnVUZWU1VFOVRSU0JCVGtRZ1RrOU9TVTVHVWtsT1IwVk5SVTVVTGlCSlRseHVMeThnVGs4Z1JWWkZUbFFnVTBoQlRFd2dWRWhGSUVGVlZFaFBVbE1nVDFJZ1EwOVFXVkpKUjBoVUlFaFBURVJGVWxNZ1FrVWdURWxCUWt4RklFWlBVaUJCVGxrZ1EweEJTVTBzWEc0dkx5QkVRVTFCUjBWVElFOVNJRTlVU0VWU0lFeEpRVUpKVEVsVVdTd2dWMGhGVkVoRlVpQkpUaUJCVGlCQlExUkpUMDRnVDBZZ1EwOU9WRkpCUTFRc0lGUlBVbFFnVDFKY2JpOHZJRTlVU0VWU1YwbFRSU3dnUVZKSlUwbE9SeUJHVWs5TkxDQlBWVlFnVDBZZ1QxSWdTVTRnUTA5T1RrVkRWRWxQVGlCWFNWUklJRlJJUlNCVFQwWlVWMEZTUlNCUFVpQlVTRVZjYmk4dklGVlRSU0JQVWlCUFZFaEZVaUJFUlVGTVNVNUhVeUJKVGlCVVNFVWdVMDlHVkZkQlVrVXVYRzVjYmlkMWMyVWdjM1J5YVdOMEp6dGNibHh1THk4Z1NXWWdiMkpxTG1oaGMwOTNibEJ5YjNCbGNuUjVJR2hoY3lCaVpXVnVJRzkyWlhKeWFXUmtaVzRzSUhSb1pXNGdZMkZzYkdsdVoxeHVMeThnYjJKcUxtaGhjMDkzYmxCeWIzQmxjblI1S0hCeWIzQXBJSGRwYkd3Z1luSmxZV3N1WEc0dkx5QlRaV1U2SUdoMGRIQnpPaTh2WjJsMGFIVmlMbU52YlM5cWIzbGxiblF2Ym05a1pTOXBjM04xWlhNdk1UY3dOMXh1Wm5WdVkzUnBiMjRnYUdGelQzZHVVSEp2Y0dWeWRIa29iMkpxTENCd2NtOXdLU0I3WEc0Z0lISmxkSFZ5YmlCUFltcGxZM1F1Y0hKdmRHOTBlWEJsTG1oaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b2IySnFMQ0J3Y205d0tUdGNibjFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmloeGN5d2djMlZ3TENCbGNTd2diM0IwYVc5dWN5a2dlMXh1SUNCelpYQWdQU0J6WlhBZ2ZId2dKeVluTzF4dUlDQmxjU0E5SUdWeElIeDhJQ2M5Snp0Y2JpQWdkbUZ5SUc5aWFpQTlJSHQ5TzF4dVhHNGdJR2xtSUNoMGVYQmxiMllnY1hNZ0lUMDlJQ2R6ZEhKcGJtY25JSHg4SUhGekxteGxibWQwYUNBOVBUMGdNQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQnZZbW83WEc0Z0lIMWNibHh1SUNCMllYSWdjbVZuWlhod0lEMGdMMXhjS3k5bk8xeHVJQ0J4Y3lBOUlIRnpMbk53YkdsMEtITmxjQ2s3WEc1Y2JpQWdkbUZ5SUcxaGVFdGxlWE1nUFNBeE1EQXdPMXh1SUNCcFppQW9iM0IwYVc5dWN5QW1KaUIwZVhCbGIyWWdiM0IwYVc5dWN5NXRZWGhMWlhseklEMDlQU0FuYm5WdFltVnlKeWtnZTF4dUlDQWdJRzFoZUV0bGVYTWdQU0J2Y0hScGIyNXpMbTFoZUV0bGVYTTdYRzRnSUgxY2JseHVJQ0IyWVhJZ2JHVnVJRDBnY1hNdWJHVnVaM1JvTzF4dUlDQXZMeUJ0WVhoTFpYbHpJRHc5SURBZ2JXVmhibk1nZEdoaGRDQjNaU0J6YUc5MWJHUWdibTkwSUd4cGJXbDBJR3RsZVhNZ1kyOTFiblJjYmlBZ2FXWWdLRzFoZUV0bGVYTWdQaUF3SUNZbUlHeGxiaUErSUcxaGVFdGxlWE1wSUh0Y2JpQWdJQ0JzWlc0Z1BTQnRZWGhMWlhsek8xeHVJQ0I5WEc1Y2JpQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JzWlc0N0lDc3JhU2tnZTF4dUlDQWdJSFpoY2lCNElEMGdjWE5iYVYwdWNtVndiR0ZqWlNoeVpXZGxlSEFzSUNjbE1qQW5LU3hjYmlBZ0lDQWdJQ0FnYVdSNElEMGdlQzVwYm1SbGVFOW1LR1Z4S1N4Y2JpQWdJQ0FnSUNBZ2EzTjBjaXdnZG5OMGNpd2dheXdnZGp0Y2JseHVJQ0FnSUdsbUlDaHBaSGdnUGowZ01Da2dlMXh1SUNBZ0lDQWdhM04wY2lBOUlIZ3VjM1ZpYzNSeUtEQXNJR2xrZUNrN1hHNGdJQ0FnSUNCMmMzUnlJRDBnZUM1emRXSnpkSElvYVdSNElDc2dNU2s3WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lHdHpkSElnUFNCNE8xeHVJQ0FnSUNBZ2RuTjBjaUE5SUNjbk8xeHVJQ0FnSUgxY2JseHVJQ0FnSUdzZ1BTQmtaV052WkdWVlVrbERiMjF3YjI1bGJuUW9hM04wY2lrN1hHNGdJQ0FnZGlBOUlHUmxZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaDJjM1J5S1R0Y2JseHVJQ0FnSUdsbUlDZ2hhR0Z6VDNkdVVISnZjR1Z5ZEhrb2IySnFMQ0JyS1NrZ2UxeHVJQ0FnSUNBZ2IySnFXMnRkSUQwZ2RqdGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tFRnljbUY1TG1selFYSnlZWGtvYjJKcVcydGRLU2tnZTF4dUlDQWdJQ0FnYjJKcVcydGRMbkIxYzJnb2RpazdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUc5aWFsdHJYU0E5SUZ0dlltcGJhMTBzSUhaZE8xeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCdlltbzdYRzU5TzF4dVhHNWNibHh1THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2WEc0dkx5QlhSVUpRUVVOTElFWlBUMVJGVWx4dUx5OGdMaTkrTDNGMVpYSjVjM1J5YVc1bkwyUmxZMjlrWlM1cWMxeHVMeThnYlc5a2RXeGxJR2xrSUQwZ01UUmNiaTh2SUcxdlpIVnNaU0JqYUhWdWEzTWdQU0F4SURJZ015SXNJaTh2SUVOdmNIbHlhV2RvZENCS2IzbGxiblFzSUVsdVl5NGdZVzVrSUc5MGFHVnlJRTV2WkdVZ1kyOXVkSEpwWW5WMGIzSnpMbHh1THk5Y2JpOHZJRkJsY20xcGMzTnBiMjRnYVhNZ2FHVnlaV0o1SUdkeVlXNTBaV1FzSUdaeVpXVWdiMllnWTJoaGNtZGxMQ0IwYnlCaGJua2djR1Z5YzI5dUlHOWlkR0ZwYm1sdVp5QmhYRzR2THlCamIzQjVJRzltSUhSb2FYTWdjMjltZEhkaGNtVWdZVzVrSUdGemMyOWphV0YwWldRZ1pHOWpkVzFsYm5SaGRHbHZiaUJtYVd4bGN5QW9kR2hsWEc0dkx5QmNJbE52Wm5SM1lYSmxYQ0lwTENCMGJ5QmtaV0ZzSUdsdUlIUm9aU0JUYjJaMGQyRnlaU0IzYVhSb2IzVjBJSEpsYzNSeWFXTjBhVzl1TENCcGJtTnNkV1JwYm1kY2JpOHZJSGRwZEdodmRYUWdiR2x0YVhSaGRHbHZiaUIwYUdVZ2NtbG5hSFJ6SUhSdklIVnpaU3dnWTI5d2VTd2diVzlrYVdaNUxDQnRaWEpuWlN3Z2NIVmliR2x6YUN4Y2JpOHZJR1JwYzNSeWFXSjFkR1VzSUhOMVlteHBZMlZ1YzJVc0lHRnVaQzl2Y2lCelpXeHNJR052Y0dsbGN5QnZaaUIwYUdVZ1UyOW1kSGRoY21Vc0lHRnVaQ0IwYnlCd1pYSnRhWFJjYmk4dklIQmxjbk52Ym5NZ2RHOGdkMmh2YlNCMGFHVWdVMjltZEhkaGNtVWdhWE1nWm5WeWJtbHphR1ZrSUhSdklHUnZJSE52TENCemRXSnFaV04wSUhSdklIUm9aVnh1THk4Z1ptOXNiRzkzYVc1bklHTnZibVJwZEdsdmJuTTZYRzR2TDF4dUx5OGdWR2hsSUdGaWIzWmxJR052Y0hseWFXZG9kQ0J1YjNScFkyVWdZVzVrSUhSb2FYTWdjR1Z5YldsemMybHZiaUJ1YjNScFkyVWdjMmhoYkd3Z1ltVWdhVzVqYkhWa1pXUmNiaTh2SUdsdUlHRnNiQ0JqYjNCcFpYTWdiM0lnYzNWaWMzUmhiblJwWVd3Z2NHOXlkR2x2Ym5NZ2IyWWdkR2hsSUZOdlpuUjNZWEpsTGx4dUx5OWNiaTh2SUZSSVJTQlRUMFpVVjBGU1JTQkpVeUJRVWs5V1NVUkZSQ0JjSWtGVElFbFRYQ0lzSUZkSlZFaFBWVlFnVjBGU1VrRk9WRmtnVDBZZ1FVNVpJRXRKVGtRc0lFVllVRkpGVTFOY2JpOHZJRTlTSUVsTlVFeEpSVVFzSUVsT1EweFZSRWxPUnlCQ1ZWUWdUazlVSUV4SlRVbFVSVVFnVkU4Z1ZFaEZJRmRCVWxKQlRsUkpSVk1nVDBaY2JpOHZJRTFGVWtOSVFVNVVRVUpKVEVsVVdTd2dSa2xVVGtWVFV5QkdUMUlnUVNCUVFWSlVTVU5WVEVGU0lGQlZVbEJQVTBVZ1FVNUVJRTVQVGtsT1JsSkpUa2RGVFVWT1ZDNGdTVTVjYmk4dklFNVBJRVZXUlU1VUlGTklRVXhNSUZSSVJTQkJWVlJJVDFKVElFOVNJRU5QVUZsU1NVZElWQ0JJVDB4RVJWSlRJRUpGSUV4SlFVSk1SU0JHVDFJZ1FVNVpJRU5NUVVsTkxGeHVMeThnUkVGTlFVZEZVeUJQVWlCUFZFaEZVaUJNU1VGQ1NVeEpWRmtzSUZkSVJWUklSVklnU1U0Z1FVNGdRVU5VU1U5T0lFOUdJRU5QVGxSU1FVTlVMQ0JVVDFKVUlFOVNYRzR2THlCUFZFaEZVbGRKVTBVc0lFRlNTVk5KVGtjZ1JsSlBUU3dnVDFWVUlFOUdJRTlTSUVsT0lFTlBUazVGUTFSSlQwNGdWMGxVU0NCVVNFVWdVMDlHVkZkQlVrVWdUMUlnVkVoRlhHNHZMeUJWVTBVZ1QxSWdUMVJJUlZJZ1JFVkJURWxPUjFNZ1NVNGdWRWhGSUZOUFJsUlhRVkpGTGx4dVhHNG5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JuWmhjaUJ6ZEhKcGJtZHBabmxRY21sdGFYUnBkbVVnUFNCbWRXNWpkR2x2YmloMktTQjdYRzRnSUhOM2FYUmphQ0FvZEhsd1pXOW1JSFlwSUh0Y2JpQWdJQ0JqWVhObElDZHpkSEpwYm1jbk9seHVJQ0FnSUNBZ2NtVjBkWEp1SUhZN1hHNWNiaUFnSUNCallYTmxJQ2RpYjI5c1pXRnVKenBjYmlBZ0lDQWdJSEpsZEhWeWJpQjJJRDhnSjNSeWRXVW5JRG9nSjJaaGJITmxKenRjYmx4dUlDQWdJR05oYzJVZ0oyNTFiV0psY2ljNlhHNGdJQ0FnSUNCeVpYUjFjbTRnYVhOR2FXNXBkR1VvZGlrZ1B5QjJJRG9nSnljN1hHNWNiaUFnSUNCa1pXWmhkV3gwT2x4dUlDQWdJQ0FnY21WMGRYSnVJQ2NuTzF4dUlDQjlYRzU5TzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUtHOWlhaXdnYzJWd0xDQmxjU3dnYm1GdFpTa2dlMXh1SUNCelpYQWdQU0J6WlhBZ2ZId2dKeVluTzF4dUlDQmxjU0E5SUdWeElIeDhJQ2M5Snp0Y2JpQWdhV1lnS0c5aWFpQTlQVDBnYm5Wc2JDa2dlMXh1SUNBZ0lHOWlhaUE5SUhWdVpHVm1hVzVsWkR0Y2JpQWdmVnh1WEc0Z0lHbG1JQ2gwZVhCbGIyWWdiMkpxSUQwOVBTQW5iMkpxWldOMEp5a2dlMXh1SUNBZ0lISmxkSFZ5YmlCUFltcGxZM1F1YTJWNWN5aHZZbW9wTG0xaGNDaG1kVzVqZEdsdmJpaHJLU0I3WEc0Z0lDQWdJQ0IyWVhJZ2EzTWdQU0JsYm1OdlpHVlZVa2xEYjIxd2IyNWxiblFvYzNSeWFXNW5hV1o1VUhKcGJXbDBhWFpsS0dzcEtTQXJJR1Z4TzF4dUlDQWdJQ0FnYVdZZ0tFRnljbUY1TG1selFYSnlZWGtvYjJKcVcydGRLU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYjJKcVcydGRMbTFoY0NobWRXNWpkR2x2YmloMktTQjdYRzRnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR3R6SUNzZ1pXNWpiMlJsVlZKSlEyOXRjRzl1Wlc1MEtITjBjbWx1WjJsbWVWQnlhVzFwZEdsMlpTaDJLU2s3WEc0Z0lDQWdJQ0FnSUgwcExtcHZhVzRvYzJWd0tUdGNiaUFnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCcmN5QXJJR1Z1WTI5a1pWVlNTVU52YlhCdmJtVnVkQ2h6ZEhKcGJtZHBabmxRY21sdGFYUnBkbVVvYjJKcVcydGRLU2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU2t1YW05cGJpaHpaWEFwTzF4dVhHNGdJSDFjYmx4dUlDQnBaaUFvSVc1aGJXVXBJSEpsZEhWeWJpQW5KenRjYmlBZ2NtVjBkWEp1SUdWdVkyOWtaVlZTU1VOdmJYQnZibVZ1ZENoemRISnBibWRwWm5sUWNtbHRhWFJwZG1Vb2JtRnRaU2twSUNzZ1pYRWdLMXh1SUNBZ0lDQWdJQ0FnWlc1amIyUmxWVkpKUTI5dGNHOXVaVzUwS0hOMGNtbHVaMmxtZVZCeWFXMXBkR2wyWlNodlltb3BLVHRjYm4wN1hHNWNibHh1WEc0dkx5OHZMeTh2THk4dkx5OHZMeTh2THk5Y2JpOHZJRmRGUWxCQlEwc2dSazlQVkVWU1hHNHZMeUF1TDM0dmNYVmxjbmx6ZEhKcGJtY3ZaVzVqYjJSbExtcHpYRzR2THlCdGIyUjFiR1VnYVdRZ1BTQXhOVnh1THk4Z2JXOWtkV3hsSUdOb2RXNXJjeUE5SURFZ01pQXpJaXdpWENKMWMyVWdjM1J5YVdOMFhDSTdYRzVjYm1WNGNHOXlkSE11WDE5bGMwMXZaSFZzWlNBOUlIUnlkV1U3WEc1Y2JuWmhjaUJmVlhScGJITlhhVzVrYjNjZ1BTQnlaWEYxYVhKbEtGd2lMaTlWZEdsc2MxZHBibVJ2ZDF3aUtUdGNibHh1ZG1GeUlGOVZkR2xzYzFkcGJtUnZkeklnUFNCZmFXNTBaWEp2Y0ZKbGNYVnBjbVZFWldaaGRXeDBLRjlWZEdsc2MxZHBibVJ2ZHlrN1hHNWNibVoxYm1OMGFXOXVJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb2IySnFLU0I3SUhKbGRIVnliaUJ2WW1vZ0ppWWdiMkpxTGw5ZlpYTk5iMlIxYkdVZ1B5QnZZbW9nT2lCN0lHUmxabUYxYkhRNklHOWlhaUI5T3lCOVhHNWNibVoxYm1OMGFXOXVJRjlqYkdGemMwTmhiR3hEYUdWamF5aHBibk4wWVc1alpTd2dRMjl1YzNSeWRXTjBiM0lwSUhzZ2FXWWdLQ0VvYVc1emRHRnVZMlVnYVc1emRHRnVZMlZ2WmlCRGIyNXpkSEoxWTNSdmNpa3BJSHNnZEdoeWIzY2dibVYzSUZSNWNHVkZjbkp2Y2loY0lrTmhibTV2ZENCallXeHNJR0VnWTJ4aGMzTWdZWE1nWVNCbWRXNWpkR2x2Ymx3aUtUc2dmU0I5WEc1Y2JpOHFLbHh1SUNvZ1EyeGhjM01nWm05eUlIZHZjbXRwYm1jZ2QybDBhQ0JrYjJOMWJXVnVkRnh1SUNvdlhHNTJZWElnUkc5amRXMWxiblFnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ1puVnVZM1JwYjI0Z1JHOWpkVzFsYm5Rb0tTQjdYRzRnSUNBZ0lDQWdJRjlqYkdGemMwTmhiR3hEYUdWamF5aDBhR2x6TENCRWIyTjFiV1Z1ZENrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1IyVjBJR1J2WTNWdFpXNTBJR2hsYVdkb2RGeHVJQ0FnSUNBcUlFQnlaWFIxY201eklIdHVkVzFpWlhKOVhHNGdJQ0FnSUNvdlhHNGdJQ0FnUkc5amRXMWxiblF1WjJWMFNHVnBaMmgwSUQwZ1puVnVZM1JwYjI0Z1oyVjBTR1ZwWjJoMEtDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2IySnFWMmx1Wkc5M0lEMGdZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQStJREFnSmlZZ1lYSm5kVzFsYm5Seld6QmRJQ0U5UFNCMWJtUmxabWx1WldRZ1B5QmhjbWQxYldWdWRITmJNRjBnT2lCM2FXNWtiM2M3WEc1Y2JpQWdJQ0FnSUNBZ2FXWWdLRjlWZEdsc2MxZHBibVJ2ZHpJdVpHVm1ZWFZzZEM1cGMxZHBibVJ2ZHlodlltcFhhVzVrYjNjcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnVFdGMGFDNXRZWGdvYjJKcVYybHVaRzkzTG1SdlkzVnRaVzUwTG1KdlpIa3VjMk55YjJ4c1NHVnBaMmgwTENCdlltcFhhVzVrYjNjdVpHOWpkVzFsYm5RdVpHOWpkVzFsYm5SRmJHVnRaVzUwTG5OamNtOXNiRWhsYVdkb2RDd2diMkpxVjJsdVpHOTNMbVJ2WTNWdFpXNTBMbUp2WkhrdWIyWm1jMlYwU0dWcFoyaDBMQ0J2WW1wWGFXNWtiM2N1Wkc5amRXMWxiblF1Wkc5amRXMWxiblJGYkdWdFpXNTBMbTltWm5ObGRFaGxhV2RvZEN3Z2IySnFWMmx1Wkc5M0xtUnZZM1Z0Wlc1MExtSnZaSGt1WTJ4cFpXNTBTR1ZwWjJoMExDQnZZbXBYYVc1a2IzY3VaRzlqZFcxbGJuUXVaRzlqZFcxbGJuUkZiR1Z0Wlc1MExtTnNhV1Z1ZEVobGFXZG9kQ2s3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1RtRk9PMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVHRjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJIWlhRZ1pHOWpkVzFsYm5RZ2QybGtkR2hjYmlBZ0lDQWdLaUJBY21WMGRYSnVjeUI3Ym5WdFltVnlmVnh1SUNBZ0lDQXFMMXh1WEc1Y2JpQWdJQ0JFYjJOMWJXVnVkQzVuWlhSWGFXUjBhQ0E5SUdaMWJtTjBhVzl1SUdkbGRGZHBaSFJvS0NrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnYjJKcVYybHVaRzkzSUQwZ1lYSm5kVzFsYm5SekxteGxibWQwYUNBK0lEQWdKaVlnWVhKbmRXMWxiblJ6V3pCZElDRTlQU0IxYm1SbFptbHVaV1FnUHlCaGNtZDFiV1Z1ZEhOYk1GMGdPaUIzYVc1a2IzYzdYRzVjYmlBZ0lDQWdJQ0FnYVdZZ0tGOVZkR2xzYzFkcGJtUnZkekl1WkdWbVlYVnNkQzVwYzFkcGJtUnZkeWh2WW1wWGFXNWtiM2NwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdUV0YwYUM1dFlYZ29iMkpxVjJsdVpHOTNMbVJ2WTNWdFpXNTBMbUp2WkhrdWMyTnliMnhzVjJsa2RHZ3NJRzlpYWxkcGJtUnZkeTVrYjJOMWJXVnVkQzVrYjJOMWJXVnVkRVZzWlcxbGJuUXVjMk55YjJ4c1YybGtkR2dzSUc5aWFsZHBibVJ2ZHk1a2IyTjFiV1Z1ZEM1aWIyUjVMbTltWm5ObGRGZHBaSFJvTENCdlltcFhhVzVrYjNjdVpHOWpkVzFsYm5RdVpHOWpkVzFsYm5SRmJHVnRaVzUwTG05bVpuTmxkRmRwWkhSb0xDQnZZbXBYYVc1a2IzY3VaRzlqZFcxbGJuUXVZbTlrZVM1amJHbGxiblJYYVdSMGFDd2diMkpxVjJsdVpHOTNMbVJ2WTNWdFpXNTBMbVJ2WTNWdFpXNTBSV3hsYldWdWRDNWpiR2xsYm5SWGFXUjBhQ2s3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1RtRk9PMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVHRjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJIWlhRZ1pHOWpkVzFsYm5RZ2RHOXdJSE5qY205c2JGeHVJQ0FnSUNBcUlFQndZWEpoYlNCdlltcFhhVzVrYjNkY2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0dWRXMWlaWEo5WEc0Z0lDQWdJQ292WEc1Y2JseHVJQ0FnSUVSdlkzVnRaVzUwTG1kbGRGTmpjbTlzYkZSdmNDQTlJR1oxYm1OMGFXOXVJR2RsZEZOamNtOXNiRlJ2Y0NncElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUc5aWFsZHBibVJ2ZHlBOUlHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnZ1BpQXdJQ1ltSUdGeVozVnRaVzUwYzFzd1hTQWhQVDBnZFc1a1pXWnBibVZrSUQ4Z1lYSm5kVzFsYm5Seld6QmRJRG9nZDJsdVpHOTNPMXh1WEc0Z0lDQWdJQ0FnSUdsbUlDaGZWWFJwYkhOWGFXNWtiM2N5TG1SbFptRjFiSFF1YVhOWGFXNWtiM2NvYjJKcVYybHVaRzkzS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRzlpYWxkcGJtUnZkeTV3WVdkbFdVOW1abk5sZENCOGZDQnZZbXBYYVc1a2IzY3VaRzlqZFcxbGJuUXVaRzlqZFcxbGJuUkZiR1Z0Wlc1MElDWW1JRzlpYWxkcGJtUnZkeTVrYjJOMWJXVnVkQzVrYjJOMWJXVnVkRVZzWlcxbGJuUXVjMk55YjJ4c1ZHOXdJSHg4SUc5aWFsZHBibVJ2ZHk1a2IyTjFiV1Z1ZEM1aWIyUjVJQ1ltSUc5aWFsZHBibVJ2ZHk1a2IyTjFiV1Z1ZEM1aWIyUjVMbk5qY205c2JGUnZjRHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCT1lVNDdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlPMXh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRWRsZENCa2IyTjFiV1Z1ZENCc1pXWjBJSE5qY205c2JGeHVJQ0FnSUNBcUlFQndZWEpoYlNCdlltcFhhVzVrYjNkY2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0dWRXMWlaWEo5WEc0Z0lDQWdJQ292WEc1Y2JseHVJQ0FnSUVSdlkzVnRaVzUwTG1kbGRGTmpjbTlzYkV4bFpuUWdQU0JtZFc1amRHbHZiaUJuWlhSVFkzSnZiR3hNWldaMEtDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2IySnFWMmx1Wkc5M0lEMGdZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQStJREFnSmlZZ1lYSm5kVzFsYm5Seld6QmRJQ0U5UFNCMWJtUmxabWx1WldRZ1B5QmhjbWQxYldWdWRITmJNRjBnT2lCM2FXNWtiM2M3WEc1Y2JpQWdJQ0FnSUNBZ2FXWWdLRjlWZEdsc2MxZHBibVJ2ZHpJdVpHVm1ZWFZzZEM1cGMxZHBibVJ2ZHlodlltcFhhVzVrYjNjcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYjJKcVYybHVaRzkzTG5CaFoyVllUMlptYzJWMElIeDhJRzlpYWxkcGJtUnZkeTVrYjJOMWJXVnVkQzVrYjJOMWJXVnVkRVZzWlcxbGJuUWdKaVlnYjJKcVYybHVaRzkzTG1SdlkzVnRaVzUwTG1SdlkzVnRaVzUwUld4bGJXVnVkQzV6WTNKdmJHeE1aV1owSUh4OElHOWlhbGRwYm1SdmR5NWtiMk4xYldWdWRDNWliMlI1SUNZbUlHOWlhbGRwYm1SdmR5NWtiMk4xYldWdWRDNWliMlI1TG5OamNtOXNiRXhsWm5RN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdUbUZPTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlR0Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCSFpYUWdaRzlqZFcxbGJuUWdjMk55YjJ4c2MxeHVJQ0FnSUNBcUlFQndZWEpoYlNCdlltcFhhVzVrYjNkY2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0N2JHVm1kRG9nYm5WdFltVnlMQ0IwYjNBNklHNTFiV0psY24xOVhHNGdJQ0FnSUNvdlhHNWNibHh1SUNBZ0lFUnZZM1Z0Wlc1MExtZGxkRk5qY205c2JDQTlJR1oxYm1OMGFXOXVJR2RsZEZOamNtOXNiQ2dwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJRzlpYWxkcGJtUnZkeUE5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBd0lDWW1JR0Z5WjNWdFpXNTBjMXN3WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pCZElEb2dkMmx1Wkc5M08xeHVYRzRnSUNBZ0lDQWdJR2xtSUNoZlZYUnBiSE5YYVc1a2IzY3lMbVJsWm1GMWJIUXVhWE5YYVc1a2IzY29iMkpxVjJsdVpHOTNLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnNaV1owT2lCRWIyTjFiV1Z1ZEM1blpYUlRZM0p2Ykd4TVpXWjBLRzlpYWxkcGJtUnZkeWtzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEc5d09pQkViMk4xYldWdWRDNW5aWFJUWTNKdmJHeFViM0FvYjJKcVYybHVaRzkzS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JHVm1kRG9nVG1GT0xGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUnZjRG9nVG1GT1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlR0Y2JseHVJQ0FnSUhKbGRIVnliaUJFYjJOMWJXVnVkRHRjYm4wb0tUdGNibHh1Wlhod2IzSjBjeTVrWldaaGRXeDBJRDBnUkc5amRXMWxiblE3WEc1Y2JseHVMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZYRzR2THlCWFJVSlFRVU5MSUVaUFQxUkZVbHh1THk4Z0xpOXNhV0l2VlhScGJITkViMk4xYldWdWRDNTBjMXh1THk4Z2JXOWtkV3hsSUdsa0lEMGdNVFpjYmk4dklHMXZaSFZzWlNCamFIVnVhM01nUFNBeElESWdNeUlzSWx3aWRYTmxJSE4wY21samRGd2lPMXh1THlvcVhHNGdLaUJEYkdGemN5Qm1iM0lnZDI5eWEybHVaeUIzYVhSb0lIZHBibVJ2ZDF4dUlDb3ZYRzVjYm1WNGNHOXlkSE11WDE5bGMwMXZaSFZzWlNBOUlIUnlkV1U3WEc1Y2JuWmhjaUJmZEhsd1pXOW1JRDBnZEhsd1pXOW1JRk41YldKdmJDQTlQVDBnWENKbWRXNWpkR2x2Ymx3aUlDWW1JSFI1Y0dWdlppQlRlVzFpYjJ3dWFYUmxjbUYwYjNJZ1BUMDlJRndpYzNsdFltOXNYQ0lnUHlCbWRXNWpkR2x2YmlBb2IySnFLU0I3SUhKbGRIVnliaUIwZVhCbGIyWWdiMkpxT3lCOUlEb2dablZ1WTNScGIyNGdLRzlpYWlrZ2V5QnlaWFIxY200Z2IySnFJQ1ltSUhSNWNHVnZaaUJUZVcxaWIyd2dQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpQW1KaUJ2WW1vdVkyOXVjM1J5ZFdOMGIzSWdQVDA5SUZONWJXSnZiQ0FtSmlCdlltb2dJVDA5SUZONWJXSnZiQzV3Y205MGIzUjVjR1VnUHlCY0luTjViV0p2YkZ3aUlEb2dkSGx3Wlc5bUlHOWlhanNnZlR0Y2JseHVablZ1WTNScGIyNGdYMk5zWVhOelEyRnNiRU5vWldOcktHbHVjM1JoYm1ObExDQkRiMjV6ZEhKMVkzUnZjaWtnZXlCcFppQW9JU2hwYm5OMFlXNWpaU0JwYm5OMFlXNWpaVzltSUVOdmJuTjBjblZqZEc5eUtTa2dleUIwYUhKdmR5QnVaWGNnVkhsd1pVVnljbTl5S0Z3aVEyRnVibTkwSUdOaGJHd2dZU0JqYkdGemN5QmhjeUJoSUdaMWJtTjBhVzl1WENJcE95QjlJSDFjYmx4dWRtRnlJRmRwYm1SdmR5QTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0JtZFc1amRHbHZiaUJYYVc1a2IzY29LU0I3WEc0Z0lDQWdJQ0FnSUY5amJHRnpjME5oYkd4RGFHVmpheWgwYUdsekxDQlhhVzVrYjNjcE8xeHVJQ0FnSUgxY2JseHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFTm9aV05ySUdsbUlHbDBJR2x6SUhkcGJtUnZkMXh1SUNBZ0lDQXFJRUJ3WVhKaGJTQnZZbXBYYVc1a2IzZGNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlIdGliMjlzWldGdWZWeHVJQ0FnSUNBcUwxeHVJQ0FnSUZkcGJtUnZkeTVwYzFkcGJtUnZkeUE5SUdaMWJtTjBhVzl1SUdselYybHVaRzkzS0c5aWFsZHBibVJ2ZHlrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2IySnFWMmx1Wkc5M0lDWW1JQ2gwZVhCbGIyWWdiMkpxVjJsdVpHOTNJRDA5UFNCY0luVnVaR1ZtYVc1bFpGd2lJRDhnWENKMWJtUmxabWx1WldSY0lpQTZJRjkwZVhCbGIyWW9iMkpxVjJsdVpHOTNLU2tnUFQwOUlGd2liMkpxWldOMFhDSWdKaVlnYjJKcVYybHVaRzkzTG1SdlkzVnRaVzUwSUNZbUlGOTBlWEJsYjJZb2IySnFWMmx1Wkc5M0xtUnZZM1Z0Wlc1MEtTQTlQVDBnWENKdlltcGxZM1JjSWp0Y2JpQWdJQ0I5TzF4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVkbGRDQjNhVzVrYjNjZ2FHVnBaMmgwWEc0Z0lDQWdJQ29nUUhCaGNtRnRJRzlpYWxkcGJtUnZkMXh1SUNBZ0lDQXFJRUJ5WlhSMWNtNGdlMjUxYldKbGNuMWNiaUFnSUNBZ0tpOWNibHh1WEc0Z0lDQWdWMmx1Wkc5M0xtZGxkRWhsYVdkb2RDQTlJR1oxYm1OMGFXOXVJR2RsZEVobGFXZG9kQ2dwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJRzlpYWxkcGJtUnZkeUE5SUdGeVozVnRaVzUwY3k1c1pXNW5kR2dnUGlBd0lDWW1JR0Z5WjNWdFpXNTBjMXN3WFNBaFBUMGdkVzVrWldacGJtVmtJRDhnWVhKbmRXMWxiblJ6V3pCZElEb2dkMmx1Wkc5M08xeHVYRzRnSUNBZ0lDQWdJR2xtSUNoWGFXNWtiM2N1YVhOWGFXNWtiM2NvYjJKcVYybHVaRzkzS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRzlpYWxkcGJtUnZkeTVwYm01bGNraGxhV2RvZENCOGZDQnZZbXBYYVc1a2IzY3VaRzlqZFcxbGJuUXVaRzlqZFcxbGJuUkZiR1Z0Wlc1MExtTnNhV1Z1ZEVobGFXZG9kQ0I4ZkNCdlltcFhhVzVrYjNjdVpHOWpkVzFsYm5RdVltOWtlUzVqYkdsbGJuUklaV2xuYUhRN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdUbUZPTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlR0Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCSFpYUWdkMmx1Wkc5M0lIZHBaSFJvWEc0Z0lDQWdJQ29nUUhCaGNtRnRJRzlpYWxkcGJtUnZkMXh1SUNBZ0lDQXFJRUJ5WlhSMWNtNGdlMjUxYldKbGNuMWNiaUFnSUNBZ0tpOWNibHh1WEc0Z0lDQWdWMmx1Wkc5M0xtZGxkRmRwWkhSb0lEMGdablZ1WTNScGIyNGdaMlYwVjJsa2RHZ29LU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQnZZbXBYYVc1a2IzY2dQU0JoY21kMWJXVnVkSE11YkdWdVozUm9JRDRnTUNBbUppQmhjbWQxYldWdWRITmJNRjBnSVQwOUlIVnVaR1ZtYVc1bFpDQS9JR0Z5WjNWdFpXNTBjMXN3WFNBNklIZHBibVJ2ZHp0Y2JseHVJQ0FnSUNBZ0lDQnBaaUFvVjJsdVpHOTNMbWx6VjJsdVpHOTNLRzlpYWxkcGJtUnZkeWtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnZZbXBYYVc1a2IzY3VhVzV1WlhKWGFXUjBhQ0I4ZkNCdlltcFhhVzVrYjNjdVpHOWpkVzFsYm5RdVpHOWpkVzFsYm5SRmJHVnRaVzUwTG1Oc2FXVnVkRmRwWkhSb0lIeDhJRzlpYWxkcGJtUnZkeTVrYjJOMWJXVnVkQzVpYjJSNUxtTnNhV1Z1ZEZkcFpIUm9PMXh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUU1aFRqdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMDdYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dSMlYwSUhkcGJtUnZkeUJ6YVhwbGMxeHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UzdG9aV2xuYUhRNklHNTFiV0psY2l3Z2QybGtkR2c2SUc1MWJXSmxjbjE5WEc0Z0lDQWdJQ292WEc1Y2JseHVJQ0FnSUZkcGJtUnZkeTVuWlhSVGFYcGxjeUE5SUdaMWJtTjBhVzl1SUdkbGRGTnBlbVZ6S0NrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnYjJKcVYybHVaRzkzSUQwZ1lYSm5kVzFsYm5SekxteGxibWQwYUNBK0lEQWdKaVlnWVhKbmRXMWxiblJ6V3pCZElDRTlQU0IxYm1SbFptbHVaV1FnUHlCaGNtZDFiV1Z1ZEhOYk1GMGdPaUIzYVc1a2IzYzdYRzVjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHaGxhV2RvZERvZ1YybHVaRzkzTG1kbGRFaGxhV2RvZENodlltcFhhVzVrYjNjcExGeHVJQ0FnSUNBZ0lDQWdJQ0FnZDJsa2RHZzZJRmRwYm1SdmR5NW5aWFJYYVdSMGFDaHZZbXBYYVc1a2IzY3BYRzRnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJSEpsZEhWeWJpQlhhVzVrYjNjN1hHNTlLQ2s3WEc1Y2JtVjRjRzl5ZEhNdVpHVm1ZWFZzZENBOUlGZHBibVJ2ZHp0Y2JseHVYRzR2THk4dkx5OHZMeTh2THk4dkx5OHZMeTljYmk4dklGZEZRbEJCUTBzZ1JrOVBWRVZTWEc0dkx5QXVMMnhwWWk5VmRHbHNjMWRwYm1SdmR5NTBjMXh1THk4Z2JXOWtkV3hsSUdsa0lEMGdNVGRjYmk4dklHMXZaSFZzWlNCamFIVnVhM01nUFNBeElESWdNeUlzSWx3aWRYTmxJSE4wY21samRGd2lPMXh1WEc1bGVIQnZjblJ6TGw5ZlpYTk5iMlIxYkdVZ1BTQjBjblZsTzF4dVhHNTJZWElnWDNSNWNHVnZaaUE5SUhSNWNHVnZaaUJUZVcxaWIyd2dQVDA5SUZ3aVpuVnVZM1JwYjI1Y0lpQW1KaUIwZVhCbGIyWWdVM2x0WW05c0xtbDBaWEpoZEc5eUlEMDlQU0JjSW5ONWJXSnZiRndpSUQ4Z1puVnVZM1JwYjI0Z0tHOWlhaWtnZXlCeVpYUjFjbTRnZEhsd1pXOW1JRzlpYWpzZ2ZTQTZJR1oxYm1OMGFXOXVJQ2h2WW1vcElIc2djbVYwZFhKdUlHOWlhaUFtSmlCMGVYQmxiMllnVTNsdFltOXNJRDA5UFNCY0ltWjFibU4wYVc5dVhDSWdKaVlnYjJKcUxtTnZibk4wY25WamRHOXlJRDA5UFNCVGVXMWliMndnSmlZZ2IySnFJQ0U5UFNCVGVXMWliMnd1Y0hKdmRHOTBlWEJsSUQ4Z1hDSnplVzFpYjJ4Y0lpQTZJSFI1Y0dWdlppQnZZbW83SUgwN1hHNWNiblpoY2lCZlZYUnBiSE1nUFNCeVpYRjFhWEpsS0Z3aUxpOVZkR2xzYzF3aUtUdGNibHh1ZG1GeUlGOVZkR2xzY3pJZ1BTQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0Y5VmRHbHNjeWs3WEc1Y2JtWjFibU4wYVc5dUlGOXBiblJsY205d1VtVnhkV2x5WlVSbFptRjFiSFFvYjJKcUtTQjdJSEpsZEhWeWJpQnZZbW9nSmlZZ2IySnFMbDlmWlhOTmIyUjFiR1VnUHlCdlltb2dPaUI3SUdSbFptRjFiSFE2SUc5aWFpQjlPeUI5WEc1Y2JtWjFibU4wYVc5dUlGOWpiR0Z6YzBOaGJHeERhR1ZqYXlocGJuTjBZVzVqWlN3Z1EyOXVjM1J5ZFdOMGIzSXBJSHNnYVdZZ0tDRW9hVzV6ZEdGdVkyVWdhVzV6ZEdGdVkyVnZaaUJEYjI1emRISjFZM1J2Y2lrcElIc2dkR2h5YjNjZ2JtVjNJRlI1Y0dWRmNuSnZjaWhjSWtOaGJtNXZkQ0JqWVd4c0lHRWdZMnhoYzNNZ1lYTWdZU0JtZFc1amRHbHZibHdpS1RzZ2ZTQjlYRzVjYmk4cUtseHVJQ29nUTJ4aGMzTWdabTl5SUhkdmNtdHBibWNnZDJsMGFDQkVUMDFjYmlBcUwxeHVkbUZ5SUVSUFRTQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0JtZFc1amRHbHZiaUJFVDAwb0tTQjdYRzRnSUNBZ0lDQWdJRjlqYkdGemMwTmhiR3hEYUdWamF5aDBhR2x6TENCRVQwMHBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRU5vWldOcklHbG1JSFpoY21saFlteGxJR2x6SUdSdmJTQmtiMk4xYldWdWRGeHVJQ0FnSUNBcUlFQndZWEpoYlNCa2IyMUViMk4xYldWdWRGeHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UySnZiMnhsWVc1OVhHNGdJQ0FnSUNvdlhHNGdJQ0FnUkU5TkxtbHpSRTlOUkc5amRXMWxiblFnUFNCbWRXNWpkR2x2YmlCcGMwUlBUVVJ2WTNWdFpXNTBLR1J2YlVSdlkzVnRaVzUwS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlBaEtDRmtiMjFFYjJOMWJXVnVkQ0I4ZkNCMGVYQmxiMllnWkc5dFJHOWpkVzFsYm5RZ1BUMDlJRndpWW05dmJHVmhibHdpSUh4OElIUjVjR1Z2WmlCa2IyMUViMk4xYldWdWRDQTlQVDBnWENKdWRXMWlaWEpjSWlCOGZDQjBlWEJsYjJZZ1pHOXRSRzlqZFcxbGJuUWdQVDA5SUZ3aWMzUnlhVzVuWENJZ2ZId2daRzl0Ukc5amRXMWxiblF1Ym05a1pWUjVjR1VnSVQwOUlEa3BPMXh1SUNBZ0lIMDdYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dSbWx1WkNCaGJtUWdkbUZzYVdSaGRHVWdUbTlrWlNCcGJpQkVUMDBnUkc5amRXMWxiblJjYmlBZ0lDQWdLaUJBY0dGeVlXMGdaRzl0VG05a1pWeHVJQ0FnSUNBcUlFQndZWEpoYlNCa2IyMUViMk4xYldWdWRGeHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UwVnNaVzFsYm5RZ2ZDQmliMjlzWldGdWZWeHVJQ0FnSUNBcUwxeHVYRzVjYmlBZ0lDQkVUMDB1WjJWMFJFOU5UbTlrWlNBOUlHWjFibU4wYVc5dUlHZGxkRVJQVFU1dlpHVW9aRzl0VG05a1pTa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ1pHOXRSRzlqZFcxbGJuUWdQU0JoY21kMWJXVnVkSE11YkdWdVozUm9JRDRnTVNBbUppQmhjbWQxYldWdWRITmJNVjBnSVQwOUlIVnVaR1ZtYVc1bFpDQS9JR0Z5WjNWdFpXNTBjMXN4WFNBNklHUnZZM1Z0Wlc1ME8xeHVYRzRnSUNBZ0lDQWdJQzhxS2x4dUlDQWdJQ0FnSUNBZ0tpQkRhR1ZqYXlCcFppQmtiMjFFYjJOMWJXVnVkQ0JwY3lCaElIWmhiR2xrSUhaaGNtbGhZbXhsWEc0Z0lDQWdJQ0FnSUNBcUwxeHVJQ0FnSUNBZ0lDQnBaaUFvSVVSUFRTNXBjMFJQVFVSdlkzVnRaVzUwS0dSdmJVUnZZM1Z0Wlc1MEtTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUM4cUtseHVJQ0FnSUNBZ0lDQWdLaUJEYUdWamF5QnBaaUJrYjIxT2IyUmxJR2x6SUdFZ2RtRnNhV1FnZG1GeWFXRmliR1ZjYmlBZ0lDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNBZ0lHbG1JQ2doWkc5dFRtOWtaU0I4ZkNCMGVYQmxiMllnWkc5dFRtOWtaU0E5UFQwZ1hDSmliMjlzWldGdVhDSWdmSHdnZEhsd1pXOW1JR1J2YlU1dlpHVWdQVDA5SUZ3aWJuVnRZbVZ5WENJZ2ZId2dkSGx3Wlc5bUlHUnZiVTV2WkdVZ1BUMDlJRndpZFc1a1pXWnBibVZrWENJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBZ0lDb2dTV1lnWkc5dFRtOWtaU0JwY3lCaElITjBjbWx1WnlCcGRDQnRhV2RvZENCaVpTQmhiaUJKUkZ4dUlDQWdJQ0FnSUNBZ0tpOWNiaUFnSUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUJrYjIxT2IyUmxJRDA5UFNCY0luTjBjbWx1WjF3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCa2IyMU9iMlJsSUQwZ1pHOXRSRzlqZFcxbGJuUXVaMlYwUld4bGJXVnVkRUo1U1dRb1pHOXRUbTlrWlNrN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdMeW9xWEc0Z0lDQWdJQ0FnSUNBcUlFTm9aV05ySUdsbUlHUnZiVTV2WkdVZ2FYTWdZU0IyWVd4cFpDQjJZWEpwWVdKc1pWeHVJQ0FnSUNBZ0lDQWdLaTljYmlBZ0lDQWdJQ0FnYVdZZ0tDRmtiMjFPYjJSbElIeDhJR1J2YlU1dlpHVXVibTlrWlZSNWNHVWdJVDA5SURFZ2ZId2dJV1J2YlU1dlpHVXVjR0Z5Wlc1MFRtOWtaU0I4ZkNCa2IyMU9iMlJsTG5CaGNtVnVkRTV2WkdVdWJtOWtaVTVoYldVZ1BUMDlJRndpU0ZSTlRGd2lJSHg4SUNGa2IyMUViMk4xYldWdWRDNWpiMjUwWVdsdWN5aGtiMjFPYjJSbEtTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJrYjIxT2IyUmxPMXh1SUNBZ0lIMDdYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dSMlYwSUdWc1pXMWxiblFnYzJsNlpYTWdZVzVrSUhCdmMybDBhVzl1WEc0Z0lDQWdJQ29nUUhCaGNtRnRJR1J2YlU1dlpHVmNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ1pHOXRSRzlqZFcxbGJuUmNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2MyaHZkMFp2Y21ObFhHNGdJQ0FnSUNvZ1FISmxkSFZ5YmlCN2UySnZkSFJ2YlRvZ2JuVnRZbVZ5TENCb1pXbG5hSFE2SUc1MWJXSmxjaXdnYkdWbWREb2diblZ0WW1WeUxDQnlhV2RvZERvZ2JuVnRZbVZ5TENCMGIzQTZJRzUxYldKbGNpd2dkMmxrZEdnNklHNTFiV0psY24xOVhHNGdJQ0FnSUNvdlhHNWNibHh1SUNBZ0lFUlBUUzVuWlhSQ2IzVnVaR2x1WjBOc2FXVnVkRkpsWTNRZ1BTQm1kVzVqZEdsdmJpQm5aWFJDYjNWdVpHbHVaME5zYVdWdWRGSmxZM1FvWkc5dFRtOWtaU2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdaRzl0Ukc5amRXMWxiblFnUFNCaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvSUQ0Z01TQW1KaUJoY21kMWJXVnVkSE5iTVYwZ0lUMDlJSFZ1WkdWbWFXNWxaQ0EvSUdGeVozVnRaVzUwYzFzeFhTQTZJR1J2WTNWdFpXNTBPMXh1SUNBZ0lDQWdJQ0IyWVhJZ2MyaHZkMFp2Y21ObElEMGdZWEpuZFcxbGJuUnpMbXhsYm1kMGFDQStJRElnSmlZZ1lYSm5kVzFsYm5Seld6SmRJQ0U5UFNCMWJtUmxabWx1WldRZ1B5QmhjbWQxYldWdWRITmJNbDBnT2lCbVlXeHpaVHRjYmx4dUlDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ29nUTNKbFlYUmxJSEpsYzNWc2RDQnphWHBsSUdGdVpDQndiM05wZEdsdmJpQnZZbXBsWTNSY2JpQWdJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQWdJSFpoY2lCdlltcFNaWFFnUFNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JpYjNSMGIyMDZJREFzWEc0Z0lDQWdJQ0FnSUNBZ0lDQm9aV2xuYUhRNklEQXNYRzRnSUNBZ0lDQWdJQ0FnSUNCc1pXWjBPaUF3TEZ4dUlDQWdJQ0FnSUNBZ0lDQWdjbWxuYUhRNklEQXNYRzRnSUNBZ0lDQWdJQ0FnSUNCMGIzQTZJREFzWEc0Z0lDQWdJQ0FnSUNBZ0lDQjNhV1IwYURvZ01GeHVJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdJQ0JrYjIxT2IyUmxJRDBnUkU5TkxtZGxkRVJQVFU1dlpHVW9aRzl0VG05a1pTd2daRzl0Ukc5amRXMWxiblFwTzF4dUlDQWdJQ0FnSUNCcFppQW9JV1J2YlU1dlpHVXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lGOVZkR2xzY3pJdVpHVm1ZWFZzZEM1M1lYSnVLRndpVlhScGJITXVSRTlOTG1kbGRFSnZkVzVrYVc1blEyeHBaVzUwVW1WamREb2dSRTlOSUdWc1pXMWxiblFnWkc5bGMyNG5kQ0JsZUdsemRDQnBiaUIwYUdGMElFUlBUU0JFYjJOMWJXVnVkRndpS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnZZbXBTWlhRN1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdjMmh2ZDBadmNtTmxJRDBnSVNGemFHOTNSbTl5WTJVN1hHNGdJQ0FnSUNBZ0lIWmhjaUJ6ZEhsc1pYTWdQU0IyYjJsa0lEQTdYRzRnSUNBZ0lDQWdJR2xtSUNoemFHOTNSbTl5WTJVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhOMGVXeGxjeUE5SUdkbGRFTnZiWEIxZEdWa1UzUjViR1VvWkc5dFRtOWtaU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvYzNSNWJHVnpJQ1ltSUhOMGVXeGxjeTVrYVhOd2JHRjVJRDA5UFNCY0ltNXZibVZjSWlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHUnZiVTV2WkdVdWMzUjViR1V1WkdsemNHeGhlU0E5SUZ3aVlteHZZMnRjSWp0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBdktpcGNiaUFnSUNBZ0lDQWdJQ29nU1dZZ1pHVm1ZWFZzZENCdFpYUm9iMlFnYVhNZ2MzVndjRzl5ZEdWa0lIUm9ZVzRnZFhObElHbDBYRzRnSUNBZ0lDQWdJQ0FxTDF4dUlDQWdJQ0FnSUNCcFppQW9aRzl0VG05a1pTNW5aWFJDYjNWdVpHbHVaME5zYVdWdWRGSmxZM1FwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJRzlpYWxKbGRDQTlJR1J2YlU1dlpHVXVaMlYwUW05MWJtUnBibWREYkdsbGJuUlNaV04wS0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FxSUVsRklHaGhZMnRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdJQ0FnSUNBZ2IySnFVbVYwSUQwZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHSnZkSFJ2YlRvZ2IySnFVbVYwTG1KdmRIUnZiU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JvWldsbmFIUTZJRzlpYWxKbGRDNW9aV2xuYUhRZ2ZId2daRzl0VG05a1pTNWpiR2xsYm5SSVpXbG5hSFFzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYkdWbWREb2diMkpxVW1WMExteGxablFzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21sbmFIUTZJRzlpYWxKbGRDNXlhV2RvZEN4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGIzQTZJRzlpYWxKbGRDNTBiM0FzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZDJsa2RHZzZJRzlpYWxKbGRDNTNhV1IwYUNCOGZDQmtiMjFPYjJSbExtTnNhV1Z1ZEZkcFpIUm9YRzRnSUNBZ0lDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnS2lCWGNtbDBaU0IwYUdVZ1pXeGxiV1Z1ZENCcGJpQmhJSFJsYlhCdmNtRnllU0IyWVhKcFlXSnNaVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdaRzl0Uld4bGJXVnVkQ0E5SUdSdmJVNXZaR1U3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FnSUNBZ0lDQXFJRU5oYkdOMWJHRjBaV1FnWW1GemFXTWdjR0Z5WVcxbGRHVnljeUJ2WmlCMGFHVWdaV3hsYldWdWRGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNvZ1FIUjVjR1VnZTA5aWFtVmpkSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQXFMMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJRzlpYWtOdmIzSmthVzVoZEdWeklEMGdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2hsYVdkb2REb2daRzl0Uld4bGJXVnVkQzV2Wm1aelpYUklaV2xuYUhRc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2QybGtkR2c2SUdSdmJVVnNaVzFsYm5RdWIyWm1jMlYwVjJsa2RHZ3NYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdlRG9nTUN4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCNU9pQXdYRzRnSUNBZ0lDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnS2lCQmNtVWdjR0Z6YzJWa0lHOXVJSFJ2SUdGc2JDQndZWEpsYm5SeklHRnVaQ0IwWVd0bElHbHVkRzhnWVdOamIzVnVkQ0IwYUdWcGNpQnZabVp6WlhSelhHNGdJQ0FnSUNBZ0lDQWdJQ0FnS2k5Y2JpQWdJQ0FnSUNBZ0lDQWdJSGRvYVd4bElDaGtiMjFGYkdWdFpXNTBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYjJKcVEyOXZjbVJwYm1GMFpYTXVlQ0FyUFNCa2IyMUZiR1Z0Wlc1MExtOW1abk5sZEV4bFpuUTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiMkpxUTI5dmNtUnBibUYwWlhNdWVTQXJQU0JrYjIxRmJHVnRaVzUwTG05bVpuTmxkRlJ2Y0R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa2IyMUZiR1Z0Wlc1MElEMGdaRzl0Uld4bGJXVnVkQzV2Wm1aelpYUlFZWEpsYm5RN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZLaXBjYmlBZ0lDQWdJQ0FnSUNBZ0lDQXFYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0tpQkFkSGx3WlNCN1QySnFaV04wZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ292WEc0Z0lDQWdJQ0FnSUNBZ0lDQnZZbXBTWlhRZ1BTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZbTkwZEc5dE9pQnZZbXBEYjI5eVpHbHVZWFJsY3k1NUlDc2diMkpxUTI5dmNtUnBibUYwWlhNdWFHVnBaMmgwTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdobGFXZG9kRG9nYjJKcVEyOXZjbVJwYm1GMFpYTXVhR1ZwWjJoMExGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHeGxablE2SUc5aWFrTnZiM0prYVc1aGRHVnpMbmdzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21sbmFIUTZJRzlpYWtOdmIzSmthVzVoZEdWekxuZ2dLeUJ2WW1wRGIyOXlaR2x1WVhSbGN5NTNhV1IwYUN4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGIzQTZJRzlpYWtOdmIzSmthVzVoZEdWekxua3NYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkMmxrZEdnNklHOWlha052YjNKa2FXNWhkR1Z6TG5kcFpIUm9YRzRnSUNBZ0lDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJR2xtSUNoemFHOTNSbTl5WTJVZ0ppWWdaRzl0VG05a1pTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1pHOXRUbTlrWlM1emRIbHNaUzVrYVhOd2JHRjVJRDBnWENKY0lqdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0F2S2lwY2JpQWdJQ0FnSUNBZ0lDb2dVbVYwZFhKdUlITnBlbVVnWVc1a0lIQnZjMmwwYVc5dUlHOW1JSFJvWlNCbGJHVnRaVzUwWEc0Z0lDQWdJQ0FnSUNBcUwxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2IySnFVbVYwTzF4dUlDQWdJSDA3WEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCR2FXNWtJR1ZzWlcxbGJuUWdjRzl6YVhScGIyNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ1pHOXRUbTlrWlZ4dUlDQWdJQ0FxSUVCd1lYSmhiU0JrYjIxRWIyTjFiV1Z1ZEZ4dUlDQWdJQ0FxSUVCd1lYSmhiU0J6YUc5M1JtOXlZMlZjYmlBZ0lDQWdLaUJBY21WMGRYSnVJSHQ3ZEc5d09pQnVkVzFpWlhJc0lHeGxablE2SUc1MWJXSmxjbjE5WEc0Z0lDQWdJQ292WEc0Z0lDQWdSRTlOTG1acGJtUkZiR1Z0Wlc1MFVHOXphWFJwYjI0Z1BTQm1kVzVqZEdsdmJpQm1hVzVrUld4bGJXVnVkRkJ2YzJsMGFXOXVLR1J2YlU1dlpHVXBJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlHUnZiVVJ2WTNWdFpXNTBJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURFZ0ppWWdZWEpuZFcxbGJuUnpXekZkSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTVYwZ09pQmtiMk4xYldWdWREdGNiaUFnSUNBZ0lDQWdkbUZ5SUhOb2IzZEdiM0pqWlNBOUlHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdnZ1BpQXlJQ1ltSUdGeVozVnRaVzUwYzFzeVhTQWhQVDBnZFc1a1pXWnBibVZrSUQ4Z1lYSm5kVzFsYm5Seld6SmRJRG9nWm1Gc2MyVTdYRzVjYmlBZ0lDQWdJQ0FnZG1GeUlHOWlhbEpsZENBOUlIdGNiaUFnSUNBZ0lDQWdJQ0FnSUd4bFpuUTZJREFzWEc0Z0lDQWdJQ0FnSUNBZ0lDQjBiM0E2SURCY2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdaRzl0VG05a1pTQTlJRVJQVFM1blpYUkVUMDFPYjJSbEtHUnZiVTV2WkdVc0lHUnZiVVJ2WTNWdFpXNTBLVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tDRmtiMjFPYjJSbEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCZlZYUnBiSE15TG1SbFptRjFiSFF1ZDJGeWJpaGNJbFYwYVd4ekxrUlBUUzVtYVc1a1JXeGxiV1Z1ZEZCdmMybDBhVzl1T2lCRVQwMGdaV3hsYldWdWRDQmtiMlZ6YmlkMElHVjRhWE4wSUdsdUlIUm9ZWFFnUkU5TklFUnZZM1Z0Wlc1MFhDSXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUc5aWFsSmxkRHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNCemFHOTNSbTl5WTJVZ1BTQWhJWE5vYjNkR2IzSmpaVHRjYmlBZ0lDQWdJQ0FnZDJocGJHVWdLR1J2YlU1dlpHVXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ6ZEhsc1pYTWdQU0IyYjJsa0lEQTdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9jMmh2ZDBadmNtTmxLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzNSNWJHVnpJRDBnZDJsdVpHOTNMbWRsZEVOdmJYQjFkR1ZrVTNSNWJHVW9aRzl0VG05a1pTazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hOMGVXeGxjeUFtSmlCemRIbHNaWE11WkdsemNHeGhlU0E5UFQwZ1hDSnViMjVsWENJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWkc5dFRtOWtaUzV6ZEhsc1pTNWthWE53YkdGNUlEMGdYQ0ppYkc5amExd2lPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUc5aWFsSmxkQzVzWldaMElDczlJR1J2YlU1dlpHVXViMlptYzJWMFRHVm1kRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHOWlhbEpsZEM1MGIzQWdLejBnWkc5dFRtOWtaUzV2Wm1aelpYUlViM0E3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmtiMjFPYjJSbElEMGdaRzl0VG05a1pTNXZabVp6WlhSUVlYSmxiblE3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvYzJodmQwWnZjbU5sSUNZbUlHUnZiVTV2WkdVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmtiMjFPYjJSbExuTjBlV3hsTG1ScGMzQnNZWGtnUFNCY0lsd2lPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnZZbXBTWlhRN1hHNGdJQ0FnZlR0Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCQlpHUWdaWFpsYm5RZ2JHbHpkR1Z1WlhKY2JpQWdJQ0FnS2lCQWNHRnlZVzBnYjJKcVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUc1aGJXVmNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ1puVnVZMXh1SUNBZ0lDQXFMMXh1WEc1Y2JpQWdJQ0JFVDAwdVlXUmtSWFpsYm5RZ1BTQm1kVzVqZEdsdmJpQmhaR1JGZG1WdWRDaHZZbW9zSUc1aGJXVXNJR1oxYm1NcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0c5aWFpQW1KaUFvZEhsd1pXOW1JRzlpYWlBOVBUMGdYQ0oxYm1SbFptbHVaV1JjSWlBL0lGd2lkVzVrWldacGJtVmtYQ0lnT2lCZmRIbHdaVzltS0c5aWFpa3BJRDA5UFNCY0ltOWlhbVZqZEZ3aUlDWW1JRzlpYWk1dWIyUmxWSGx3WlNBOVBUMGdNU0FtSmlCdlltb3VjR0Z5Wlc1MFJXeGxiV1Z1ZENBbUppQnZZbW91Y0dGeVpXNTBSV3hsYldWdWRDNXViMlJsVG1GdFpTQWhQVDBnWENKSVZFMU1YQ0lnSmlZZ2RIbHdaVzltSUc1aGJXVWdQVDA5SUZ3aWMzUnlhVzVuWENJZ0ppWWdkSGx3Wlc5bUlHWjFibU1nUFQwOUlGd2lablZ1WTNScGIyNWNJaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0c5aWFpNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiMkpxTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvYm1GdFpTd2dablZ1WXl3Z1ptRnNjMlVwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2h2WW1vdVlYUjBZV05vUlhabGJuUXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J2WW1vdVlYUjBZV05vUlhabGJuUW9YQ0p2Ymx3aUlDc2dibUZ0WlN3Z1puVnVZeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnZEhKMVpUdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMDdYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dVbVZ0YjNabElHVjJaVzUwSUd4cGMzUmxibVZ5WEc0Z0lDQWdJQ29nUUhCaGNtRnRJRzlpYWx4dUlDQWdJQ0FxSUVCd1lYSmhiU0J1WVcxbFhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUdaMWJtTmNiaUFnSUNBZ0tpOWNibHh1WEc0Z0lDQWdSRTlOTG5KbGJXOTJaVVYyWlc1MElEMGdablZ1WTNScGIyNGdjbVZ0YjNabFJYWmxiblFvYjJKcUxDQnVZVzFsTENCbWRXNWpLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaHZZbW9nSmlZZ0tIUjVjR1Z2WmlCdlltb2dQVDA5SUZ3aWRXNWtaV1pwYm1Wa1hDSWdQeUJjSW5WdVpHVm1hVzVsWkZ3aUlEb2dYM1I1Y0dWdlppaHZZbW9wS1NBOVBUMGdYQ0p2WW1wbFkzUmNJaUFtSmlCdlltb3VibTlrWlZSNWNHVWdQVDA5SURFZ0ppWWdiMkpxTG5CaGNtVnVkRVZzWlcxbGJuUWdKaVlnYjJKcUxuQmhjbVZ1ZEVWc1pXMWxiblF1Ym05a1pVNWhiV1VnSVQwOUlGd2lTRlJOVEZ3aUlDWW1JSFI1Y0dWdlppQnVZVzFsSUQwOVBTQmNJbk4wY21sdVoxd2lJQ1ltSUhSNWNHVnZaaUJtZFc1aklEMDlQU0JjSW1aMWJtTjBhVzl1WENJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaHZZbW91Y21WdGIzWmxSWFpsYm5STWFYTjBaVzVsY2lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHOWlhaTV5WlcxdmRtVkZkbVZ1ZEV4cGMzUmxibVZ5S0c1aGJXVXNJR1oxYm1Nc0lHWmhiSE5sS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvYjJKcUxtUmxkR0ZqYUVWMlpXNTBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYjJKcUxtUmxkR0ZqYUVWMlpXNTBLRndpYjI1Y0lpQXJJRzVoYldVc0lHWjFibU1wTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSeWRXVTdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnWm1Gc2MyVTdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlPMXh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRU5vWldOcklHbG1JR1ZzWlcxbGJuUWdhR0Z6SUdOc1lYTnpJRzVoYldWY2JpQWdJQ0FnS2lCQWNHRnlZVzBnWld4bGJXVnVkRnh1SUNBZ0lDQXFJRUJ3WVhKaGJTQmpiR0Z6YzA1aGJXVmNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlIdGliMjlzWldGdWZWeHVJQ0FnSUNBcUwxeHVYRzVjYmlBZ0lDQkVUMDB1YUdGelEyeGhjM05PWVcxbElEMGdablZ1WTNScGIyNGdhR0Z6UTJ4aGMzTk9ZVzFsS0dWc1pXMWxiblFzSUdOc1lYTnpUbUZ0WlNrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvWld4bGJXVnVkQ0FtSmlBb2RIbHdaVzltSUdWc1pXMWxiblFnUFQwOUlGd2lkVzVrWldacGJtVmtYQ0lnUHlCY0luVnVaR1ZtYVc1bFpGd2lJRG9nWDNSNWNHVnZaaWhsYkdWdFpXNTBLU2tnUFQwOUlGd2liMkpxWldOMFhDSWdKaVlnZEhsd1pXOW1JR05zWVhOelRtRnRaU0E5UFQwZ1hDSnpkSEpwYm1kY0lpQW1KaUJsYkdWdFpXNTBMbTV2WkdWVWVYQmxJRDA5UFNBeElDWW1JR1ZzWlcxbGJuUXVjR0Z5Wlc1MFJXeGxiV1Z1ZENBbUppQmxiR1Z0Wlc1MExuQmhjbVZ1ZEVWc1pXMWxiblF1Ym05a1pVNWhiV1VnSVQwOUlGd2lTRlJOVEZ3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCamJHRnpjMDVoYldVZ1BTQmpiR0Z6YzA1aGJXVXVkSEpwYlNncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJQ2hjSWlCY0lpQXJJR1ZzWlcxbGJuUXVZMnhoYzNOT1lXMWxJQ3NnWENJZ1hDSXBMbWx1WkdWNFQyWW9YQ0lnWENJZ0t5QmpiR0Z6YzA1aGJXVWdLeUJjSWlCY0lpa2dJVDA5SUMweE8xeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZUdGNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQkJaR1FnWTJ4aGMzTWdibUZ0WlZ4dUlDQWdJQ0FxSUVCd1lYSmhiU0JsYkdWdFpXNTBYRzRnSUNBZ0lDb2dRSEJoY21GdElHTnNZWE56VG1GdFpWeHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UwaFVUVXhGYkdWdFpXNTBmVnh1SUNBZ0lDQXFMMXh1WEc1Y2JpQWdJQ0JFVDAwdVlXUmtRMnhoYzNOT1lXMWxJRDBnWm5WdVkzUnBiMjRnWVdSa1EyeGhjM05PWVcxbEtHVnNaVzFsYm5Rc0lHTnNZWE56VG1GdFpTa2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb1pXeGxiV1Z1ZENBbUppQW9kSGx3Wlc5bUlHVnNaVzFsYm5RZ1BUMDlJRndpZFc1a1pXWnBibVZrWENJZ1B5QmNJblZ1WkdWbWFXNWxaRndpSURvZ1gzUjVjR1Z2WmlobGJHVnRaVzUwS1NrZ1BUMDlJRndpYjJKcVpXTjBYQ0lnSmlZZ2RIbHdaVzltSUdOc1lYTnpUbUZ0WlNBOVBUMGdYQ0p6ZEhKcGJtZGNJaUFtSmlCbGJHVnRaVzUwTG01dlpHVlVlWEJsSUQwOVBTQXhJQ1ltSUdWc1pXMWxiblF1Y0dGeVpXNTBSV3hsYldWdWRDQW1KaUJsYkdWdFpXNTBMbkJoY21WdWRFVnNaVzFsYm5RdWJtOWtaVTVoYldVZ0lUMDlJRndpU0ZSTlRGd2lLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiR0Z6YzA1aGJXVWdQU0JqYkdGemMwNWhiV1V1ZEhKcGJTZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ0ZFVDAwdWFHRnpRMnhoYzNOT1lXMWxLR1ZzWlcxbGJuUXNJR05zWVhOelRtRnRaU2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdZMndnUFNCbGJHVnRaVzUwTG1Oc1lYTnpUbUZ0WlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGJHVnRaVzUwTG1Oc1lYTnpUbUZ0WlNBOUlHTnNJRDhnWTJ3Z0t5QmNJaUJjSWlBcklHTnNZWE56VG1GdFpTQTZJR05zWVhOelRtRnRaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJsYkdWdFpXNTBPMXh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUc1MWJHdzdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlPMXh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRkpsYlc5MlpTQmpiR0Z6Y3lCdVlXMWxYRzRnSUNBZ0lDb2dRSEJoY21GdElHVnNaVzFsYm5SY2JpQWdJQ0FnS2lCQWNHRnlZVzBnWTJ4aGMzTk9ZVzFsWEc0Z0lDQWdJQ29nUUhKbGRIVnliaUI3U0ZSTlRFVnNaVzFsYm5SOVhHNGdJQ0FnSUNvdlhHNWNibHh1SUNBZ0lFUlBUUzV5WlcxdmRtVkRiR0Z6YzA1aGJXVWdQU0JtZFc1amRHbHZiaUJ5WlcxdmRtVkRiR0Z6YzA1aGJXVW9aV3hsYldWdWRDd2dZMnhoYzNOT1lXMWxLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaGxiR1Z0Wlc1MElDWW1JQ2gwZVhCbGIyWWdaV3hsYldWdWRDQTlQVDBnWENKMWJtUmxabWx1WldSY0lpQS9JRndpZFc1a1pXWnBibVZrWENJZ09pQmZkSGx3Wlc5bUtHVnNaVzFsYm5RcEtTQTlQVDBnWENKdlltcGxZM1JjSWlBbUppQjBlWEJsYjJZZ1kyeGhjM05PWVcxbElEMDlQU0JjSW5OMGNtbHVaMXdpSUNZbUlHVnNaVzFsYm5RdWJtOWtaVlI1Y0dVZ1BUMDlJREVnSmlZZ1pXeGxiV1Z1ZEM1d1lYSmxiblJGYkdWdFpXNTBJQ1ltSUdWc1pXMWxiblF1Y0dGeVpXNTBSV3hsYldWdWRDNXViMlJsVG1GdFpTQWhQVDBnWENKSVZFMU1YQ0lnSmlZZ2RIbHdaVzltSUdWc1pXMWxiblF1WTJ4aGMzTk9ZVzFsSUQwOVBTQmNJbk4wY21sdVoxd2lLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiR0Z6YzA1aGJXVWdQU0JqYkdGemMwNWhiV1V1ZEhKcGJTZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR05zWVhOelpYTWdQU0JsYkdWdFpXNTBMbU5zWVhOelRtRnRaUzUwY21sdEtDa3VjM0JzYVhRb1hDSWdYQ0lwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdabTl5SUNoMllYSWdhU0E5SUdOc1lYTnpaWE11YkdWdVozUm9JQzBnTVRzZ2FTQStQU0F3T3lCcExTMHBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYkdGemMyVnpXMmxkSUQwZ1kyeGhjM05sYzF0cFhTNTBjbWx0S0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ0ZqYkdGemMyVnpXMmxkSUh4OElHTnNZWE56WlhOYmFWMGdQVDA5SUdOc1lYTnpUbUZ0WlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYkdGemMyVnpMbk53YkdsalpTaHBMQ0F4S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQmxiR1Z0Wlc1MExtTnNZWE56VG1GdFpTQTlJR05zWVhOelpYTXVhbTlwYmloY0lpQmNJaWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z1pXeGxiV1Z1ZER0Y2JpQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnVkV3hzTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnZlR0Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCVWIyZG5iR1VnWTJ4aGMzTWdibUZ0WlZ4dUlDQWdJQ0FxSUVCd1lYSmhiU0JsYkdWdFpXNTBYRzRnSUNBZ0lDb2dRSEJoY21GdElHTnNZWE56VG1GdFpWeHVJQ0FnSUNBcUlFQndZWEpoYlNCMGIyZG5iR1ZjYmlBZ0lDQWdLaUJBY21WMGRYSnVJSHRJVkUxTVJXeGxiV1Z1ZEgxY2JpQWdJQ0FnS2k5Y2JseHVYRzRnSUNBZ1JFOU5MblJ2WjJkc1pVTnNZWE56VG1GdFpTQTlJR1oxYm1OMGFXOXVJSFJ2WjJkc1pVTnNZWE56VG1GdFpTaGxiR1Z0Wlc1MExDQmpiR0Z6YzA1aGJXVXNJSFJ2WjJkc1pTa2dlMXh1SUNBZ0lDQWdJQ0JwWmlBb1pXeGxiV1Z1ZENBbUppQW9kSGx3Wlc5bUlHVnNaVzFsYm5RZ1BUMDlJRndpZFc1a1pXWnBibVZrWENJZ1B5QmNJblZ1WkdWbWFXNWxaRndpSURvZ1gzUjVjR1Z2WmlobGJHVnRaVzUwS1NrZ1BUMDlJRndpYjJKcVpXTjBYQ0lnSmlZZ2RIbHdaVzltSUdOc1lYTnpUbUZ0WlNBOVBUMGdYQ0p6ZEhKcGJtZGNJaUFtSmlCMGVYQmxiMllnZEc5bloyeGxJRDA5UFNCY0ltSnZiMnhsWVc1Y0lpQW1KaUJsYkdWdFpXNTBMbTV2WkdWVWVYQmxJRDA5UFNBeElDWW1JR1ZzWlcxbGJuUXVjR0Z5Wlc1MFJXeGxiV1Z1ZENBbUppQmxiR1Z0Wlc1MExuQmhjbVZ1ZEVWc1pXMWxiblF1Ym05a1pVNWhiV1VnSVQwOUlGd2lTRlJOVEZ3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCamJHRnpjMDVoYldVZ1BTQmpiR0Z6YzA1aGJXVXVkSEpwYlNncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tIUnZaMmRzWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lFUlBUUzVoWkdSRGJHRnpjMDVoYldVb1pXeGxiV1Z1ZEN3Z1kyeGhjM05PWVcxbEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUkU5TkxuSmxiVzkyWlVOc1lYTnpUbUZ0WlNobGJHVnRaVzUwTENCamJHRnpjMDVoYldVcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHVnNaVzFsYm5RN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdiblZzYkR0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUgwN1hHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1VtVndiR0ZqWlNCamJHRnpjeUJ1WVcxbFhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUdWc1pXMWxiblJjYmlBZ0lDQWdLaUJBY0dGeVlXMGdiMnhrUTJ4aGMzTk9ZVzFsWEc0Z0lDQWdJQ29nUUhCaGNtRnRJRzVsZDBOc1lYTnpUbUZ0WlZ4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnZTBoVVRVeEZiR1Z0Wlc1MGZWeHVJQ0FnSUNBcUwxeHVYRzVjYmlBZ0lDQkVUMDB1Y21Wd2JHRmpaVU5zWVhOeklEMGdablZ1WTNScGIyNGdjbVZ3YkdGalpVTnNZWE56S0dWc1pXMWxiblFzSUc5c1pFTnNZWE56VG1GdFpTd2dibVYzUTJ4aGMzTk9ZVzFsS1NCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hsYkdWdFpXNTBJQ1ltSUNoMGVYQmxiMllnWld4bGJXVnVkQ0E5UFQwZ1hDSjFibVJsWm1sdVpXUmNJaUEvSUZ3aWRXNWtaV1pwYm1Wa1hDSWdPaUJmZEhsd1pXOW1LR1ZzWlcxbGJuUXBLU0E5UFQwZ1hDSnZZbXBsWTNSY0lpQW1KaUIwZVhCbGIyWWdiMnhrUTJ4aGMzTk9ZVzFsSUQwOVBTQmNJbk4wY21sdVoxd2lJQ1ltSUhSNWNHVnZaaUJ1WlhkRGJHRnpjMDVoYldVZ1BUMDlJRndpYzNSeWFXNW5YQ0lnSmlZZ1pXeGxiV1Z1ZEM1dWIyUmxWSGx3WlNBOVBUMGdNU0FtSmlCbGJHVnRaVzUwTG5CaGNtVnVkRVZzWlcxbGJuUWdKaVlnWld4bGJXVnVkQzV3WVhKbGJuUkZiR1Z0Wlc1MExtNXZaR1ZPWVcxbElDRTlQU0JjSWtoVVRVeGNJaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdiMnhrUTJ4aGMzTk9ZVzFsSUQwZ2IyeGtRMnhoYzNOT1lXMWxMblJ5YVcwb0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUc1bGQwTnNZWE56VG1GdFpTQTlJRzVsZDBOc1lYTnpUbUZ0WlM1MGNtbHRLQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQkVUMDB1Y21WdGIzWmxRMnhoYzNOT1lXMWxLR1ZzWlcxbGJuUXNJRzlzWkVOc1lYTnpUbUZ0WlNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JFVDAwdVlXUmtRMnhoYzNOT1lXMWxLR1ZzWlcxbGJuUXNJRzVsZDBOc1lYTnpUbUZ0WlNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdaV3hsYldWdWREdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJ1ZFd4c08xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ2ZUdGNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQkhaWFFnWld4bGJXVnVkQ0JpZVNCMFlXY2dibUZ0WlNCaGJtUWdhVzVrWlhoY2JpQWdJQ0FnS2lCQWNHRnlZVzBnZEc1Y2JpQWdJQ0FnS2lCQWNHRnlZVzBnWkc5dFJHOWpkVzFsYm5SY2JpQWdJQ0FnS2lCQWNHRnlZVzBnYVc1a1pYaGNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlIdE9iMlJsZlZ4dUlDQWdJQ0FxTDF4dVhHNWNiaUFnSUNCRVQwMHVaMlYwUld4bGJXVnVkRUo1VkdGblRtRnRaU0E5SUdaMWJtTjBhVzl1SUdkbGRFVnNaVzFsYm5SQ2VWUmhaMDVoYldVb2RHNHBJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlHUnZiVVJ2WTNWdFpXNTBJRDBnWVhKbmRXMWxiblJ6TG14bGJtZDBhQ0ErSURFZ0ppWWdZWEpuZFcxbGJuUnpXekZkSUNFOVBTQjFibVJsWm1sdVpXUWdQeUJoY21kMWJXVnVkSE5iTVYwZ09pQmtiMk4xYldWdWREdGNiaUFnSUNBZ0lDQWdkbUZ5SUdsdVpHVjRJRDBnWVhKbmRXMWxiblJ6V3pKZE8xeHVYRzRnSUNBZ0lDQWdJR2xtSUNoMGVYQmxiMllnZEc0Z1BUMDlJRndpYzNSeWFXNW5YQ0lnSmlZZ1JFOU5MbWx6UkU5TlJHOWpkVzFsYm5Rb1pHOXRSRzlqZFcxbGJuUXBJQ1ltSUhSNWNHVnZaaUJwYm1SbGVDQTlQVDBnWENKdWRXMWlaWEpjSWlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHVnNjeUE5SUdSdmJVUnZZM1Z0Wlc1MExtZGxkRVZzWlcxbGJuUnpRbmxVWVdkT1lXMWxLSFJ1S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQmxiSE5iYVc1a1pYaGRJSHg4SUc1MWJHdzdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYm5Wc2JEdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lIMDdYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dSMlYwSUd4cGJtVWdhR1ZwWjJoMFhHNGdJQ0FnSUNvZ1FISmxkSFZ5YmlCN2JuVnRZbVZ5ZlZ4dUlDQWdJQ0FxTDF4dVhHNWNiaUFnSUNCRVQwMHVaMlYwVEdsdVpVaGxhV2RvZENBOUlHWjFibU4wYVc5dUlHZGxkRXhwYm1WSVpXbG5hSFFvS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUJ6ZEhsc1pYTWdQU0JuWlhSRGIyMXdkWFJsWkZOMGVXeGxLR1J2WTNWdFpXNTBMbUp2WkhrcE8xeHVJQ0FnSUNBZ0lDQjJZWElnYkdsdVpVaGxhV2RvZENBOUlITjBlV3hsY3k1c2FXNWxTR1ZwWjJoME8xeHVJQ0FnSUNBZ0lDQjJZWElnYkdsdVpVaGxhV2RvZEVScFp5QTlJSEJoY25ObFNXNTBLR3hwYm1WSVpXbG5hSFFzSURFd0tUdGNiaUFnSUNBZ0lDQWdkbUZ5SUdadmJuUlRhWHBsSUQwZ2MzUjViR1Z6TG1admJuUlRhWHBsTzF4dUlDQWdJQ0FnSUNCMllYSWdabTl1ZEZOcGVtVkVhV2NnUFNCd1lYSnpaVWx1ZENobWIyNTBVMmw2WlN3Z01UQXBPMXh1SUNBZ0lDQWdJQ0JwWmlBb2FYTkdhVzVwZEdVb2JHbHVaVWhsYVdkb2RFUnBaeWtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQnNhVzVsU0dWcFoyaDBSR2xuTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHWnZiblJUYVhwbFJHbG5PMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdmVHRjYmx4dUlDQWdJSEpsZEhWeWJpQkVUMDA3WEc1OUtDazdYRzVjYm1WNGNHOXlkSE11WkdWbVlYVnNkQ0E5SUVSUFRUdGNibHh1WEc0dkx5OHZMeTh2THk4dkx5OHZMeTh2THk5Y2JpOHZJRmRGUWxCQlEwc2dSazlQVkVWU1hHNHZMeUF1TDJ4cFlpOVZkR2xzYzBSUFRTNTBjMXh1THk4Z2JXOWtkV3hsSUdsa0lEMGdNVGhjYmk4dklHMXZaSFZzWlNCamFIVnVhM01nUFNBeElESWdNeUlzSWx3aWRYTmxJSE4wY21samRGd2lPMXh1THlvcVhHNGdLaUJKYlhCdmNuUWdZV1JrYVhScGIyNWhiQ0JqYkdGemMyVnpYRzRnS2k5Y2JseHVaWGh3YjNKMGN5NWZYMlZ6VFc5a2RXeGxJRDBnZEhKMVpUdGNibHh1ZG1GeUlGOTBlWEJsYjJZZ1BTQjBlWEJsYjJZZ1UzbHRZbTlzSUQwOVBTQmNJbVoxYm1OMGFXOXVYQ0lnSmlZZ2RIbHdaVzltSUZONWJXSnZiQzVwZEdWeVlYUnZjaUE5UFQwZ1hDSnplVzFpYjJ4Y0lpQS9JR1oxYm1OMGFXOXVJQ2h2WW1vcElIc2djbVYwZFhKdUlIUjVjR1Z2WmlCdlltbzdJSDBnT2lCbWRXNWpkR2x2YmlBb2IySnFLU0I3SUhKbGRIVnliaUJ2WW1vZ0ppWWdkSGx3Wlc5bUlGTjViV0p2YkNBOVBUMGdYQ0ptZFc1amRHbHZibHdpSUNZbUlHOWlhaTVqYjI1emRISjFZM1J2Y2lBOVBUMGdVM2x0WW05c0lDWW1JRzlpYWlBaFBUMGdVM2x0WW05c0xuQnliM1J2ZEhsd1pTQS9JRndpYzNsdFltOXNYQ0lnT2lCMGVYQmxiMllnYjJKcU95QjlPMXh1WEc1MllYSWdYMVYwYVd4elJFOU5JRDBnY21WeGRXbHlaU2hjSWk0dlZYUnBiSE5FVDAxY0lpazdYRzVjYm5aaGNpQmZWWFJwYkhORVQwMHlJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZWWFJwYkhORVQwMHBPMXh1WEc1MllYSWdYMVYwYVd4elYybHVaRzkzSUQwZ2NtVnhkV2x5WlNoY0lpNHZWWFJwYkhOWGFXNWtiM2RjSWlrN1hHNWNiblpoY2lCZlZYUnBiSE5YYVc1a2IzY3lJRDBnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaGZWWFJwYkhOWGFXNWtiM2NwTzF4dVhHNW1kVzVqZEdsdmJpQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0c5aWFpa2dleUJ5WlhSMWNtNGdiMkpxSUNZbUlHOWlhaTVmWDJWelRXOWtkV3hsSUQ4Z2IySnFJRG9nZXlCa1pXWmhkV3gwT2lCdlltb2dmVHNnZlZ4dVhHNW1kVzVqZEdsdmJpQmZZMnhoYzNORFlXeHNRMmhsWTJzb2FXNXpkR0Z1WTJVc0lFTnZibk4wY25WamRHOXlLU0I3SUdsbUlDZ2hLR2x1YzNSaGJtTmxJR2x1YzNSaGJtTmxiMllnUTI5dWMzUnlkV04wYjNJcEtTQjdJSFJvY205M0lHNWxkeUJVZVhCbFJYSnliM0lvWENKRFlXNXViM1FnWTJGc2JDQmhJR05zWVhOeklHRnpJR0VnWm5WdVkzUnBiMjVjSWlrN0lIMGdmVnh1WEc1MllYSWdUVzkxYzJVZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdablZ1WTNScGIyNGdUVzkxYzJVb0tTQjdYRzRnSUNBZ0lDQWdJRjlqYkdGemMwTmhiR3hEYUdWamF5aDBhR2x6TENCTmIzVnpaU2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nVG05eWJXRnNhWE5sSUcxdmRYTmxJR1JsYkhSaFhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUdWY2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0dWRXMWlaWEo5WEc0Z0lDQWdJQ292WEc0Z0lDQWdUVzkxYzJVdVoyVjBWMmhsWld4RVpXeDBZU0E5SUdaMWJtTjBhVzl1SUdkbGRGZG9aV1ZzUkdWc2RHRW9aU2tnZTF4dUlDQWdJQ0FnSUNCcFppQW9aU0FtSmlBb2RIbHdaVzltSUdVZ1BUMDlJRndpZFc1a1pXWnBibVZrWENJZ1B5QmNJblZ1WkdWbWFXNWxaRndpSURvZ1gzUjVjR1Z2WmlobEtTa2dQVDA5SUZ3aWIySnFaV04wWENJZ0ppWWdLRndpWkdWMFlXbHNYQ0lnYVc0Z1pTQjhmQ0JjSW5kb1pXVnNSR1ZzZEdGY0lpQnBiaUJsSUh4OElGd2lkMmhsWld4RVpXeDBZVmxjSWlCcGJpQmxJSHg4SUZ3aWQyaGxaV3hFWld4MFlWaGNJaUJwYmlCbElIeDhJRndpWkdWc2RHRlpYQ0lnYVc0Z1pTQjhmQ0JjSW1SbGJIUmhXRndpSUdsdUlHVWdmSHdnWENKaGVHbHpYQ0lnYVc0Z1pTQjhmQ0JjSW1SbGJIUmhUVzlrWlZ3aUlHbHVJR1VwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1pHVnNkR0VnUFNCMmIybGtJREE3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjJZWElnWkdWc2RHRllJRDBnZG05cFpDQXdPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnlJR1JsYkhSaFdTQTlJSFp2YVdRZ01EdGNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklFOXNaQ0J6WTJodmIyd2djMk55YjJ4c2QyaGxaV3dnWkdWc2RHRmNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaGNJbVJsZEdGcGJGd2lJR2x1SUdVcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmtaV3gwWVZrZ1BTQmxMbVJsZEdGcGJDQXFJQzB4TzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLRndpZDJobFpXeEVaV3gwWVZ3aUlHbHVJR1VwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa1pXeDBZVmtnUFNCbExuZG9aV1ZzUkdWc2RHRTdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1hDSjNhR1ZsYkVSbGJIUmhXVndpSUdsdUlHVXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JrWld4MFlWa2dQU0JsTG5kb1pXVnNSR1ZzZEdGWk8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0Z3aWQyaGxaV3hFWld4MFlWaGNJaUJwYmlCbEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaR1ZzZEdGWUlEMGdaUzUzYUdWbGJFUmxiSFJoV0NBcUlDMHhPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z1JtbHlaV1p2ZUNBOElERTNJR2h2Y21sNmIyNTBZV3dnYzJOeWIyeHNhVzVuSUhKbGJHRjBaV1FnZEc4Z1JFOU5UVzkxYzJWVFkzSnZiR3dnWlhabGJuUmNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaGNJbUY0YVhOY0lpQnBiaUJsSUNZbUlHVXVZWGhwY3lBOVBUMGdaUzVJVDFKSldrOU9WRUZNWDBGWVNWTXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JrWld4MFlWZ2dQU0JrWld4MFlWa2dLaUF0TVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa1pXeDBZVmtnUFNBd08xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnVG1WM0lITmphRzl2YkNCM2FHVmxiQ0JrWld4MFlTQW9kMmhsWld3Z1pYWmxiblFwWEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWENKa1pXeDBZVmxjSWlCcGJpQmxLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWkdWc2RHRlpJRDBnWlM1a1pXeDBZVmtnS2lBdE1UdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoY0ltUmxiSFJoV0Z3aUlHbHVJR1VwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCa1pXeDBZVmdnUFNCbExtUmxiSFJoV0R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJRTVsWldRZ2RHOGdZMjl1ZG1WeWRDQnNhVzVsY3lCaGJtUWdjR0ZuWlhNZ2RHOGdjR2w0Wld4eklHbG1JSGRsSUdGeVpXNWNJblFnWVd4eVpXRmtlU0JwYmlCd2FYaGxiSE5jYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJRlJvWlhKbElHRnlaU0IwYUhKbFpTQmtaV3gwWVNCdGIyUmxjenBjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJQ0FnS2lCa1pXeDBZVTF2WkdVZ01DQnBjeUJpZVNCd2FYaGxiSE1zSUc1dmRHaHBibWNnZEc4Z1pHOWNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklDQWdLaUJrWld4MFlVMXZaR1VnTVNCcGN5QmllU0JzYVc1bGMxeHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z0lDQXFJR1JsYkhSaFRXOWtaU0F5SUdseklHSjVJSEJoWjJWelhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1pTNWtaV3gwWVUxdlpHVWdQVDA5SURFcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnYkdsdVpVaGxhV2RvZENBOUlGOVZkR2xzYzBSUFRUSXVaR1ZtWVhWc2RDNW5aWFJNYVc1bFNHVnBaMmgwS0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1pHVnNkR0ZaSUQwZ1pHVnNkR0ZaSUNvZ2JHbHVaVWhsYVdkb2REdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmtaV3gwWVZnZ1BTQmtaV3gwWVZnZ0tpQnNhVzVsU0dWcFoyaDBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaGxMbVJsYkhSaFRXOWtaU0E5UFQwZ01pa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCM2FXNWtiM2RvWldkcGFIUWdQU0JmVlhScGJITlhhVzVrYjNjeUxtUmxabUYxYkhRdVoyVjBTR1ZwWjJoMEtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaR1ZzZEdGWklEMGdaR1ZzZEdGWklDb2dkMmx1Wkc5M2FHVm5hV2gwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdSbGJIUmhXQ0E5SUdSbGJIUmhXQ0FxSUhkcGJtUnZkMmhsWjJsb2REdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJR1JsYkhSaElEMGdaR1ZzZEdGWklEMDlQU0F3SUQ4Z1pHVnNkR0ZZSURvZ1pHVnNkR0ZaTzF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHUmxiSFJoTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlFNWhUanRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJSDA3WEc1Y2JpQWdJQ0J5WlhSMWNtNGdUVzkxYzJVN1hHNTlLQ2s3WEc1Y2JtVjRjRzl5ZEhNdVpHVm1ZWFZzZENBOUlFMXZkWE5sTzF4dVhHNWNiaTh2THk4dkx5OHZMeTh2THk4dkx5OHZMMXh1THk4Z1YwVkNVRUZEU3lCR1QwOVVSVkpjYmk4dklDNHZiR2xpTDFWMGFXeHpUVzkxYzJVdWRITmNiaTh2SUcxdlpIVnNaU0JwWkNBOUlERTVYRzR2THlCdGIyUjFiR1VnWTJoMWJtdHpJRDBnTVNBeUlETWlMQ0pjSW5WelpTQnpkSEpwWTNSY0lqdGNiaThxS2x4dUlDb2dRMnhoYzNNZ1ptOXlJSGR2Y210cGJtY2dkMmwwYUNCelkzSmxaVzVjYmlBcUwxeHVYRzVsZUhCdmNuUnpMbDlmWlhOTmIyUjFiR1VnUFNCMGNuVmxPMXh1WEc1bWRXNWpkR2x2YmlCZlkyeGhjM05EWVd4c1EyaGxZMnNvYVc1emRHRnVZMlVzSUVOdmJuTjBjblZqZEc5eUtTQjdJR2xtSUNnaEtHbHVjM1JoYm1ObElHbHVjM1JoYm1ObGIyWWdRMjl1YzNSeWRXTjBiM0lwS1NCN0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9YQ0pEWVc1dWIzUWdZMkZzYkNCaElHTnNZWE56SUdGeklHRWdablZ1WTNScGIyNWNJaWs3SUgwZ2ZWeHVYRzUyWVhJZ1UyTnlaV1Z1SUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lHWjFibU4wYVc5dUlGTmpjbVZsYmlncElIdGNiaUFnSUNBZ0lDQWdYMk5zWVhOelEyRnNiRU5vWldOcktIUm9hWE1zSUZOamNtVmxiaWs3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUjJWMElITmpjbVZsYmlCcGJtWnZYRzRnSUNBZ0lDb2dRSEpsZEhWeWJpQjdlMkYyWVdsc1lXSnNaVk5wZW1VNklIdG9aV2xuYUhRNklHNTFiV0psY2l3Z2QybGtkR2c2SUc1MWJXSmxjbjBzSUdOdmJHOXlSR1Z3ZEdnNklHNTFiV0psY2l3Z2NHbDRaV3hTWVhScGJ6b2diblZ0WW1WeUxDQnphWHBsT2lCN2FHVnBaMmgwT2lCdWRXMWlaWElzSUhkcFpIUm9PaUJ1ZFcxaVpYSjlmWDFjYmlBZ0lDQWdLaTljYmlBZ0lDQlRZM0psWlc0dVoyVjBTVzVtYnlBOUlHWjFibU4wYVc5dUlHZGxkRWx1Wm04b0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCaGRtRnBiR0ZpYkdWVGFYcGxPaUJUWTNKbFpXNHVaMlYwUVhaaGFXeGhZbXhsVTJsNlpYTW9LU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZiRzl5UkdWd2RHZzZJRk5qY21WbGJpNW5aWFJEYjJ4dmNrUmxjSFJvS0Nrc1hHNGdJQ0FnSUNBZ0lDQWdJQ0J3YVhobGJGSmhkR2x2T2lCVFkzSmxaVzR1WjJWMFVHbDRaV3hTWVhScGJ5Z3BMRnh1SUNBZ0lDQWdJQ0FnSUNBZ2MybDZaVG9nVTJOeVpXVnVMbWRsZEZOcGVtVnpLQ2xjYmlBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0I5TzF4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVkbGRDQnpZM0psWlc0Z2FHVnBaMmgwWEc0Z0lDQWdJQ29nUUhKbGRIVnlibk1nZTI1MWJXSmxjbjFjYmlBZ0lDQWdLaTljYmx4dVhHNGdJQ0FnVTJOeVpXVnVMbWRsZEVobGFXZG9kQ0E5SUdaMWJtTjBhVzl1SUdkbGRFaGxhV2RvZENncElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlITmpjbVZsYmk1b1pXbG5hSFE3WEc0Z0lDQWdmVHRjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJIWlhRZ2MyTnlaV1Z1SUhkcFpIUm9YRzRnSUNBZ0lDb2dRSEpsZEhWeWJuTWdlMjUxYldKbGNuMWNiaUFnSUNBZ0tpOWNibHh1WEc0Z0lDQWdVMk55WldWdUxtZGxkRmRwWkhSb0lEMGdablZ1WTNScGIyNGdaMlYwVjJsa2RHZ29LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ6WTNKbFpXNHVkMmxrZEdnN1hHNGdJQ0FnZlR0Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCSFpYUWdjMk55WldWdUlITnBlbVZ6WEc0Z0lDQWdJQ29nUUhKbGRIVnliaUI3ZTJobGFXZG9kRG9nYm5WdFltVnlMQ0IzYVdSMGFEb2diblZ0WW1WeWZYMWNiaUFnSUNBZ0tpOWNibHh1WEc0Z0lDQWdVMk55WldWdUxtZGxkRk5wZW1WeklEMGdablZ1WTNScGIyNGdaMlYwVTJsNlpYTW9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQm9aV2xuYUhRNklGTmpjbVZsYmk1blpYUklaV2xuYUhRb0tTeGNiaUFnSUNBZ0lDQWdJQ0FnSUhkcFpIUm9PaUJUWTNKbFpXNHVaMlYwVjJsa2RHZ29LVnh1SUNBZ0lDQWdJQ0I5TzF4dUlDQWdJSDA3WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUjJWMElITmpjbVZsYmlCb1pXbG5hSFJjYmlBZ0lDQWdLaUJBY21WMGRYSnVjeUI3Ym5WdFltVnlmVnh1SUNBZ0lDQXFMMXh1WEc1Y2JpQWdJQ0JUWTNKbFpXNHVaMlYwUVhaaGFXeGhZbXhsU0dWcFoyaDBJRDBnWm5WdVkzUnBiMjRnWjJWMFFYWmhhV3hoWW14bFNHVnBaMmgwS0NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2MyTnlaV1Z1TG1GMllXbHNTR1ZwWjJoME8xeHVJQ0FnSUgwN1hHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1IyVjBJSE5qY21WbGJpQjNhV1IwYUZ4dUlDQWdJQ0FxSUVCeVpYUjFjbTV6SUh0dWRXMWlaWEo5WEc0Z0lDQWdJQ292WEc1Y2JseHVJQ0FnSUZOamNtVmxiaTVuWlhSQmRtRnBiR0ZpYkdWWGFXUjBhQ0E5SUdaMWJtTjBhVzl1SUdkbGRFRjJZV2xzWVdKc1pWZHBaSFJvS0NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2MyTnlaV1Z1TG1GMllXbHNWMmxrZEdnN1hHNGdJQ0FnZlR0Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCSFpYUWdjMk55WldWdUlITnBlbVZ6WEc0Z0lDQWdJQ29nUUhKbGRIVnliaUI3ZTJobGFXZG9kRG9nYm5WdFltVnlMQ0IzYVdSMGFEb2diblZ0WW1WeWZYMWNiaUFnSUNBZ0tpOWNibHh1WEc0Z0lDQWdVMk55WldWdUxtZGxkRUYyWVdsc1lXSnNaVk5wZW1WeklEMGdablZ1WTNScGIyNGdaMlYwUVhaaGFXeGhZbXhsVTJsNlpYTW9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQm9aV2xuYUhRNklGTmpjbVZsYmk1blpYUkJkbUZwYkdGaWJHVklaV2xuYUhRb0tTeGNiaUFnSUNBZ0lDQWdJQ0FnSUhkcFpIUm9PaUJUWTNKbFpXNHVaMlYwUVhaaGFXeGhZbXhsVjJsa2RHZ29LVnh1SUNBZ0lDQWdJQ0I5TzF4dUlDQWdJSDA3WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUjJWMElITmpjbVZsYmlCd2FYaGxiQ0J5WVhScGIxeHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UyNTFiV0psY24xY2JpQWdJQ0FnS2k5Y2JseHVYRzRnSUNBZ1UyTnlaV1Z1TG1kbGRGQnBlR1ZzVW1GMGFXOGdQU0JtZFc1amRHbHZiaUJuWlhSUWFYaGxiRkpoZEdsdktDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2NtRjBhVzhnUFNBeE8xeHVJQ0FnSUNBZ0lDQnBaaUFvZEhsd1pXOW1JSGRwYm1SdmR5NXpZM0psWlc0dWMzbHpkR1Z0V0VSUVNTQWhQVDBnWENKMWJtUmxabWx1WldSY0lpQW1KaUIwZVhCbGIyWWdkMmx1Wkc5M0xuTmpjbVZsYmk1c2IyZHBZMkZzV0VSUVNTQWhQVDBnWENKMWJtUmxabWx1WldSY0lpQW1KaUIzYVc1a2IzY3VjMk55WldWdUxuTjVjM1JsYlZoRVVFa2dQaUIzYVc1a2IzY3VjMk55WldWdUxteHZaMmxqWVd4WVJGQkpLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlZWFJwYnlBOUlIZHBibVJ2ZHk1elkzSmxaVzR1YzNsemRHVnRXRVJRU1NBdklIZHBibVJ2ZHk1elkzSmxaVzR1Ykc5bmFXTmhiRmhFVUVrN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9kSGx3Wlc5bUlIZHBibVJ2ZHk1a1pYWnBZMlZRYVhobGJGSmhkR2x2SUNFOVBTQmNJblZ1WkdWbWFXNWxaRndpS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WVhScGJ5QTlJSGRwYm1SdmR5NWtaWFpwWTJWUWFYaGxiRkpoZEdsdk8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnlZWFJwYnp0Y2JpQWdJQ0I5TzF4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVkbGRDQnpZM0psWlc0Z1kyOXNiM0lnWkdWd2RHaGNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlIdHVkVzFpWlhKOVhHNGdJQ0FnSUNvdlhHNWNibHh1SUNBZ0lGTmpjbVZsYmk1blpYUkRiMnh2Y2tSbGNIUm9JRDBnWm5WdVkzUnBiMjRnWjJWMFEyOXNiM0pFWlhCMGFDZ3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSE5qY21WbGJpNWpiMnh2Y2tSbGNIUm9PMXh1SUNBZ0lIMDdYRzVjYmlBZ0lDQnlaWFIxY200Z1UyTnlaV1Z1TzF4dWZTZ3BPMXh1WEc1bGVIQnZjblJ6TG1SbFptRjFiSFFnUFNCVFkzSmxaVzQ3WEc1Y2JseHVMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZYRzR2THlCWFJVSlFRVU5MSUVaUFQxUkZVbHh1THk4Z0xpOXNhV0l2VlhScGJITlRZM0psWlc0dWRITmNiaTh2SUcxdlpIVnNaU0JwWkNBOUlESXdYRzR2THlCdGIyUjFiR1VnWTJoMWJtdHpJRDBnTVNBeUlETWlMQ0pjSW5WelpTQnpkSEpwWTNSY0lqdGNiaThxS2x4dUlDb2dRMnhoYzNNZ1ptOXlJSGR2Y210cGJtY2dkMmwwYUNCemVYTjBaVzFjYmlBcUwxeHVYRzVsZUhCdmNuUnpMbDlmWlhOTmIyUjFiR1VnUFNCMGNuVmxPMXh1WEc1bWRXNWpkR2x2YmlCZlkyeGhjM05EWVd4c1EyaGxZMnNvYVc1emRHRnVZMlVzSUVOdmJuTjBjblZqZEc5eUtTQjdJR2xtSUNnaEtHbHVjM1JoYm1ObElHbHVjM1JoYm1ObGIyWWdRMjl1YzNSeWRXTjBiM0lwS1NCN0lIUm9jbTkzSUc1bGR5QlVlWEJsUlhKeWIzSW9YQ0pEWVc1dWIzUWdZMkZzYkNCaElHTnNZWE56SUdGeklHRWdablZ1WTNScGIyNWNJaWs3SUgwZ2ZWeHVYRzUyWVhJZ1UzbHpkR1Z0SUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lHWjFibU4wYVc5dUlGTjVjM1JsYlNncElIdGNiaUFnSUNBZ0lDQWdYMk5zWVhOelEyRnNiRU5vWldOcktIUm9hWE1zSUZONWMzUmxiU2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUjJWMElITjVjM1JsYlNCcGJtWnZYRzRnSUNBZ0lDb2dRSEpsZEhWeWJpQjdlMjVoYldVNklITjBjbWx1Wnl3Z2RtVnljMmx2YmpvZ2MzUnlhVzVuZlgxY2JpQWdJQ0FnS2k5Y2JpQWdJQ0JUZVhOMFpXMHVaMlYwU1c1bWJ5QTlJR1oxYm1OMGFXOXVJR2RsZEVsdVptOG9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnVZVzFsT2lCVGVYTjBaVzB1WjJWMFRtRnRaU2dwTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdkbVZ5YzJsdmJqb2dVM2x6ZEdWdExtZGxkRlpsY25OcGIyNG9LVnh1SUNBZ0lDQWdJQ0I5TzF4dUlDQWdJSDA3WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUjJWMElFOVRJRzVoYldWY2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0emRISnBibWQ5WEc0Z0lDQWdJQ292WEc1Y2JseHVJQ0FnSUZONWMzUmxiUzVuWlhST1lXMWxJRDBnWm5WdVkzUnBiMjRnWjJWMFRtRnRaU2dwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJRzl6SUQwZ1hDSmNJanRjYmlBZ0lDQWdJQ0FnZG1GeUlHTnNhV1Z1ZEZOMGNtbHVaM01nUFNCYmUxeHVJQ0FnSUNBZ0lDQWdJQ0FnY2pvZ0x5aFhhVzVrYjNkeklERXdMakI4VjJsdVpHOTNjeUJPVkNBeE1DNHdLUzhzWEc0Z0lDQWdJQ0FnSUNBZ0lDQnpPaUJjSWxkcGJtUnZkM01nTVRCY0lseHVJQ0FnSUNBZ0lDQjlMQ0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlPaUF2S0ZkcGJtUnZkM01nT0M0eGZGZHBibVJ2ZDNNZ1RsUWdOaTR6S1M4c1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6T2lCY0lsZHBibVJ2ZDNNZ09DNHhYQ0pjYmlBZ0lDQWdJQ0FnZlN3Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY2pvZ0x5aFhhVzVrYjNkeklEaDhWMmx1Wkc5M2N5Qk9WQ0EyTGpJcEx5eGNiaUFnSUNBZ0lDQWdJQ0FnSUhNNklGd2lWMmx1Wkc5M2N5QTRYQ0pjYmlBZ0lDQWdJQ0FnZlN3Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY2pvZ0x5aFhhVzVrYjNkeklEZDhWMmx1Wkc5M2N5Qk9WQ0EyTGpFcEx5eGNiaUFnSUNBZ0lDQWdJQ0FnSUhNNklGd2lWMmx1Wkc5M2N5QTNYQ0pjYmlBZ0lDQWdJQ0FnZlN3Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY2pvZ0wxZHBibVJ2ZDNNZ1RsUWdOaTR3THl4Y2JpQWdJQ0FnSUNBZ0lDQWdJSE02SUZ3aVYybHVaRzkzY3lCV2FYTjBZVndpWEc0Z0lDQWdJQ0FnSUgwc0lIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhJNklDOVhhVzVrYjNkeklFNVVJRFV1TWk4c1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6T2lCY0lsZHBibVJ2ZDNNZ1UyVnlkbVZ5SURJd01ETmNJbHh1SUNBZ0lDQWdJQ0I5TENCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5T2lBdktGZHBibVJ2ZDNNZ1RsUWdOUzR4ZkZkcGJtUnZkM01nV0ZBcEx5eGNiaUFnSUNBZ0lDQWdJQ0FnSUhNNklGd2lWMmx1Wkc5M2N5QllVRndpWEc0Z0lDQWdJQ0FnSUgwc0lIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhJNklDOG9WMmx1Wkc5M2N5Qk9WQ0ExTGpCOFYybHVaRzkzY3lBeU1EQXdLUzhzWEc0Z0lDQWdJQ0FnSUNBZ0lDQnpPaUJjSWxkcGJtUnZkM01nTWpBd01Gd2lYRzRnSUNBZ0lDQWdJSDBzSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEk2SUM4b1YybHVJRGw0SURRdU9UQjhWMmx1Wkc5M2N5Qk5SU2t2TEZ4dUlDQWdJQ0FnSUNBZ0lDQWdjem9nWENKWGFXNWtiM2R6SUUxRlhDSmNiaUFnSUNBZ0lDQWdmU3dnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjam9nTHloWGFXNWtiM2R6SURrNGZGZHBiams0S1M4c1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6T2lCY0lsZHBibVJ2ZDNNZ09UaGNJbHh1SUNBZ0lDQWdJQ0I5TENCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5T2lBdktGZHBibVJ2ZDNNZ09UVjhWMmx1T1RWOFYybHVaRzkzYzE4NU5Ta3ZMRnh1SUNBZ0lDQWdJQ0FnSUNBZ2N6b2dYQ0pYYVc1a2IzZHpJRGsxWENKY2JpQWdJQ0FnSUNBZ2ZTd2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2Nqb2dMeWhYYVc1a2IzZHpJRTVVSURRdU1IeFhhVzVPVkRRdU1IeFhhVzVPVkh4WGFXNWtiM2R6SUU1VUtTOHNYRzRnSUNBZ0lDQWdJQ0FnSUNCek9pQmNJbGRwYm1SdmQzTWdUbFFnTkM0d1hDSmNiaUFnSUNBZ0lDQWdmU3dnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjam9nTDFkcGJtUnZkM01nUTBVdkxGeHVJQ0FnSUNBZ0lDQWdJQ0FnY3pvZ1hDSlhhVzVrYjNkeklFTkZYQ0pjYmlBZ0lDQWdJQ0FnZlN3Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY2pvZ0wxZHBiakUyTHl4Y2JpQWdJQ0FnSUNBZ0lDQWdJSE02SUZ3aVYybHVaRzkzY3lBekxqRXhYQ0pjYmlBZ0lDQWdJQ0FnZlN3Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY2pvZ0wwRnVaSEp2YVdRdkxGeHVJQ0FnSUNBZ0lDQWdJQ0FnY3pvZ1hDSkJibVJ5YjJsa1hDSmNiaUFnSUNBZ0lDQWdmU3dnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjam9nTDA5d1pXNUNVMFF2TEZ4dUlDQWdJQ0FnSUNBZ0lDQWdjem9nWENKUGNHVnVJRUpUUkZ3aVhHNGdJQ0FnSUNBZ0lIMHNJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISTZJQzlUZFc1UFV5OHNYRzRnSUNBZ0lDQWdJQ0FnSUNCek9pQmNJbE4xYmlCUFUxd2lYRzRnSUNBZ0lDQWdJSDBzSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEk2SUM4b1RHbHVkWGg4V0RFeEtTOHNYRzRnSUNBZ0lDQWdJQ0FnSUNCek9pQmNJa3hwYm5WNFhDSmNiaUFnSUNBZ0lDQWdmU3dnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjam9nTHlocFVHaHZibVY4YVZCaFpIeHBVRzlrS1M4c1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6T2lCY0ltbFBVMXdpWEc0Z0lDQWdJQ0FnSUgwc0lIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhJNklDOU5ZV01nVDFNZ1dDOHNYRzRnSUNBZ0lDQWdJQ0FnSUNCek9pQmNJazFoWXlCUFV5QllYQ0pjYmlBZ0lDQWdJQ0FnZlN3Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY2pvZ0x5aE5ZV05RVUVOOFRXRmpTVzUwWld4OFRXRmpYMUJ2ZDJWeVVFTjhUV0ZqYVc1MGIzTm9LUzhzWEc0Z0lDQWdJQ0FnSUNBZ0lDQnpPaUJjSWsxaFl5QlBVMXdpWEc0Z0lDQWdJQ0FnSUgwc0lIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhJNklDOVJUbGd2TEZ4dUlDQWdJQ0FnSUNBZ0lDQWdjem9nWENKUlRsaGNJbHh1SUNBZ0lDQWdJQ0I5TENCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5T2lBdlZVNUpXQzhzWEc0Z0lDQWdJQ0FnSUNBZ0lDQnpPaUJjSWxWT1NWaGNJbHh1SUNBZ0lDQWdJQ0I5TENCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5T2lBdlFtVlBVeThzWEc0Z0lDQWdJQ0FnSUNBZ0lDQnpPaUJjSWtKbFQxTmNJbHh1SUNBZ0lDQWdJQ0I5TENCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5T2lBdlQxTmNYQzh5THl4Y2JpQWdJQ0FnSUNBZ0lDQWdJSE02SUZ3aVQxTXZNbHdpWEc0Z0lDQWdJQ0FnSUgwc0lIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhJNklDOG9iblZvYTN4SGIyOW5iR1ZpYjNSOFdXRnRiWGxpYjNSOFQzQmxibUp2ZEh4VGJIVnljSHhOVTA1Q2IzUjhRWE5ySUVwbFpYWmxjMXhjTDFSbGIyMWhmR2xoWDJGeVkyaHBkbVZ5S1M4c1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6T2lCY0lsTmxZWEpqYUNCQ2IzUmNJbHh1SUNBZ0lDQWdJQ0I5WFR0Y2JpQWdJQ0FnSUNBZ1ptOXlJQ2gyWVhJZ1gybDBaWEpoZEc5eUlEMGdZMnhwWlc1MFUzUnlhVzVuY3l3Z1gybHpRWEp5WVhrZ1BTQkJjbkpoZVM1cGMwRnljbUY1S0Y5cGRHVnlZWFJ2Y2lrc0lGOXBJRDBnTUN3Z1gybDBaWEpoZEc5eUlEMGdYMmx6UVhKeVlYa2dQeUJmYVhSbGNtRjBiM0lnT2lCZmFYUmxjbUYwYjNKYlUzbHRZbTlzTG1sMFpYSmhkRzl5WFNncE96c3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJmY21WbU8xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9YMmx6UVhKeVlYa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1gya2dQajBnWDJsMFpYSmhkRzl5TG14bGJtZDBhQ2tnWW5KbFlXczdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdYM0psWmlBOUlGOXBkR1Z5WVhSdmNsdGZhU3NyWFR0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdYMmtnUFNCZmFYUmxjbUYwYjNJdWJtVjRkQ2dwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaGZhUzVrYjI1bEtTQmljbVZoYXp0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCZmNtVm1JRDBnWDJrdWRtRnNkV1U3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJqY3lBOUlGOXlaV1k3WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoamN5NXlMblJsYzNRb2JtRjJhV2RoZEc5eUxuVnpaWEpCWjJWdWRDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J2Y3lBOUlHTnpMbk03WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWW5KbFlXczdYRzRnSUNBZ0lDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHOXpPMXh1SUNBZ0lIMDdYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dSMlYwSUU5VElIWmxjbk5wYjI1Y2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0emRISnBibWQ5WEc0Z0lDQWdJQ292WEc1Y2JseHVJQ0FnSUZONWMzUmxiUzVuWlhSV1pYSnphVzl1SUQwZ1puVnVZM1JwYjI0Z1oyVjBWbVZ5YzJsdmJpZ3BJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlHOXpJRDBnVTNsemRHVnRMbWRsZEU1aGJXVW9LVHRjYmlBZ0lDQWdJQ0FnZG1GeUlHOXpWbVZ5YzJsdmJpQTlJRndpWENJN1hHNGdJQ0FnSUNBZ0lHbG1JQ2d2VjJsdVpHOTNjeTh1ZEdWemRDaHZjeWtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJRzl6Vm1WeWMybHZiaUE5SUM5WGFXNWtiM2R6SUNndUtpa3ZMbVY0WldNb2IzTXBXekZkTzF4dUlDQWdJQ0FnSUNBZ0lDQWdiM01nUFNCY0lsZHBibVJ2ZDNOY0lqdGNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0J6ZDJsMFkyZ2dLRzl6S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqWVhObElGd2lUV0ZqSUU5VElGaGNJanBjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J2YzFabGNuTnBiMjRnUFNBdlRXRmpJRTlUSUZnZ0tERXdXeTVmWEZ4a1hTc3BMeTVsZUdWaktHNWhkbWxuWVhSdmNpNTFjMlZ5UVdkbGJuUXBXekZkTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdKeVpXRnJPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyRnpaU0JjSWtGdVpISnZhV1JjSWpwY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCdmMxWmxjbk5wYjI0Z1BTQXZRVzVrY205cFpDQW9XeTVmWEZ4a1hTc3BMeTVsZUdWaktHNWhkbWxuWVhSdmNpNTFjMlZ5UVdkbGJuUXBXekZkTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdKeVpXRnJPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kyRnpaU0JjSW1sUFUxd2lPbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCeVpXY2dQU0F2VDFNZ0tGeGNaQ3NwWHloY1hHUXJLVjgvS0Z4Y1pDc3BQeTh1WlhobFl5aHVZWFpwWjJGMGIzSXVZWEJ3Vm1WeWMybHZiaWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYjNOV1pYSnphVzl1SUQwZ2NtVm5XekZkSUNzZ1hDSXVYQ0lnS3lCeVpXZGJNbDBnS3lCY0lpNWNJaUFySUNoeVpXZGJNMTBnZkh3Z01DazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZbkpsWVdzN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JrWldaaGRXeDBPbHh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ2YzFabGNuTnBiMjQ3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJSEpsZEhWeWJpQlRlWE4wWlcwN1hHNTlLQ2s3WEc1Y2JtVjRjRzl5ZEhNdVpHVm1ZWFZzZENBOUlGTjVjM1JsYlR0Y2JseHVYRzR2THk4dkx5OHZMeTh2THk4dkx5OHZMeTljYmk4dklGZEZRbEJCUTBzZ1JrOVBWRVZTWEc0dkx5QXVMMnhwWWk5VmRHbHNjMU41YzNSbGJTNTBjMXh1THk4Z2JXOWtkV3hsSUdsa0lEMGdNakZjYmk4dklHMXZaSFZzWlNCamFIVnVhM01nUFNBeElESWdNeUlzSWx3aWRYTmxJSE4wY21samRGd2lPMXh1THlvcVhHNGdLaUJEYkdGemN5Qm1iM0lnZDI5eWEybHVaeUIzYVhSb0lIVnpaWEpjYmlBcUwxeHVYRzVsZUhCdmNuUnpMbDlmWlhOTmIyUjFiR1VnUFNCMGNuVmxPMXh1WEc1MllYSWdYMVYwYVd4elFuSnZkM05sY2lBOUlISmxjWFZwY21Vb1hDSXVMMVYwYVd4elFuSnZkM05sY2x3aUtUdGNibHh1ZG1GeUlGOVZkR2xzYzBKeWIzZHpaWEl5SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmVlhScGJITkNjbTkzYzJWeUtUdGNibHh1ZG1GeUlGOVZkR2xzYzFOamNtVmxiaUE5SUhKbGNYVnBjbVVvWENJdUwxVjBhV3h6VTJOeVpXVnVYQ0lwTzF4dVhHNTJZWElnWDFWMGFXeHpVMk55WldWdU1pQTlJRjlwYm5SbGNtOXdVbVZ4ZFdseVpVUmxabUYxYkhRb1gxVjBhV3h6VTJOeVpXVnVLVHRjYmx4dWRtRnlJRjlWZEdsc2MxTjVjM1JsYlNBOUlISmxjWFZwY21Vb1hDSXVMMVYwYVd4elUzbHpkR1Z0WENJcE8xeHVYRzUyWVhJZ1gxVjBhV3h6VTNsemRHVnRNaUE5SUY5cGJuUmxjbTl3VW1WeGRXbHlaVVJsWm1GMWJIUW9YMVYwYVd4elUzbHpkR1Z0S1R0Y2JseHVablZ1WTNScGIyNGdYMmx1ZEdWeWIzQlNaWEYxYVhKbFJHVm1ZWFZzZENodlltb3BJSHNnY21WMGRYSnVJRzlpYWlBbUppQnZZbW91WDE5bGMwMXZaSFZzWlNBL0lHOWlhaUE2SUhzZ1pHVm1ZWFZzZERvZ2IySnFJSDA3SUgxY2JseHVablZ1WTNScGIyNGdYMk5zWVhOelEyRnNiRU5vWldOcktHbHVjM1JoYm1ObExDQkRiMjV6ZEhKMVkzUnZjaWtnZXlCcFppQW9JU2hwYm5OMFlXNWpaU0JwYm5OMFlXNWpaVzltSUVOdmJuTjBjblZqZEc5eUtTa2dleUIwYUhKdmR5QnVaWGNnVkhsd1pVVnljbTl5S0Z3aVEyRnVibTkwSUdOaGJHd2dZU0JqYkdGemN5QmhjeUJoSUdaMWJtTjBhVzl1WENJcE95QjlJSDFjYmx4dWRtRnlJRlZ6WlhJZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdablZ1WTNScGIyNGdWWE5sY2lncElIdGNiaUFnSUNBZ0lDQWdYMk5zWVhOelEyRnNiRU5vWldOcktIUm9hWE1zSUZWelpYSXBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRWRsZENCMWMyVnlJR2x1Wm05Y2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0N1luSnZkM05sY2pvZ2UySnliM2R6WlhJNklITjBjbWx1Wnl3Z2JXOWlhV3hsT2lCaWIyOXNaV0Z1TENCMlpYSnphVzl1T2lCemRISnBibWQ5TENCelkzSmxaVzQ2SUh0aGRtRnBiR0ZpYkdWVGFYcGxPaUI3YUdWcFoyaDBPaUJ1ZFcxaVpYSXNJSGRwWkhSb09pQnVkVzFpWlhKOUxDQmpiMnh2Y2tSbGNIUm9PaUJ1ZFcxaVpYSXNJSEJwZUdWc1VtRjBhVzg2SUc1MWJXSmxjaXdnYzJsNlpUb2dlMmhsYVdkb2REb2diblZ0WW1WeUxDQjNhV1IwYURvZ2JuVnRZbVZ5Zlgwc0lITjVjM1JsYlRvZ2UyNWhiV1U2SUhOMGNtbHVaeXdnZG1WeWMybHZiam9nYzNSeWFXNW5mWDE5WEc0Z0lDQWdJQ292WEc0Z0lDQWdWWE5sY2k1blpYUkpibVp2SUQwZ1puVnVZM1JwYjI0Z1oyVjBTVzVtYnlncElIdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdKeWIzZHpaWEk2SUY5VmRHbHNjMEp5YjNkelpYSXlMbVJsWm1GMWJIUXVaMlYwU1c1bWJ5Z3BMRnh1SUNBZ0lDQWdJQ0FnSUNBZ2MyTnlaV1Z1T2lCZlZYUnBiSE5UWTNKbFpXNHlMbVJsWm1GMWJIUXVaMlYwU1c1bWJ5Z3BMRnh1SUNBZ0lDQWdJQ0FnSUNBZ2MzbHpkR1Z0T2lCZlZYUnBiSE5UZVhOMFpXMHlMbVJsWm1GMWJIUXVaMlYwU1c1bWJ5Z3BYRzRnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJSEpsZEhWeWJpQlZjMlZ5TzF4dWZTZ3BPMXh1WEc1bGVIQnZjblJ6TG1SbFptRjFiSFFnUFNCVmMyVnlPMXh1WEc1Y2JpOHZMeTh2THk4dkx5OHZMeTh2THk4dkwxeHVMeThnVjBWQ1VFRkRTeUJHVDA5VVJWSmNiaTh2SUM0dmJHbGlMMVYwYVd4elZYTmxjaTUwYzF4dUx5OGdiVzlrZFd4bElHbGtJRDBnTWpKY2JpOHZJRzF2WkhWc1pTQmphSFZ1YTNNZ1BTQXhJRElnTXlKZExDSnpiM1Z5WTJWU2IyOTBJam9pSW4wPVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9VdGlscy9saWIvVXRpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDIgMyJdLCJzb3VyY2VSb290IjoiIn0=