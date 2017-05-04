"use strict";
/**
 * Import interfaces
 */
import IWindow from "../interfaces/IWindow";
/**
 * Declare window interface
 */
declare let window: IWindow;
declare let module: any;

/**
 * Import interface
 */
import IViewAbility from "../interfaces/IViewAbility";

/**
 * Import Animation frame
 */
declare var require: any;
/**
 * Add submodules
 */
import AnimationFrame from "AnimationFrame/lib/AnimationFrame";
import UtilsDocument from "Utils/lib/UtilsDocument";
import UtilsDOM from "Utils/lib/UtilsDOM";
import UtilsMain from "Utils/lib/UtilsMain";
import UtilsWindow from "Utils/lib/UtilsWindow";
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
export default class ViewAbility implements IViewAbility {

  public static numDocumentWidth: number|boolean;
  public static numDocumentHeight: number|boolean;
  public static numWindowWidth: number|boolean;
  public static numWindowHeight: number|boolean;
  public static arrDomStyle: Object = {};

  /**
   * Событие ресайза для сброса временных кешев размеров окна, документа и высчитанных стилей элементов
   */
  public static resizeEvent(): void {
    ViewAbility.numDocumentWidth = false;
    ViewAbility.numDocumentHeight = false;
    ViewAbility.numWindowWidth = false;
    ViewAbility.numWindowHeight = false;
    ViewAbility.arrDomStyle = {};
  };

  /**
   * Метод для генерации UID
   * @returns {string}
   */
  public static getID(): string {
    return "v_" + (Date.now()) + "_" + (~~(Math.random() * 1e6));
  };

  /**
   * Расчет стилей элемента
   * @param domNode
   * @returns {CSSStyleDeclaration}
   */
  public static getComputedStyle(domNode: any): CSSStyleDeclaration {
    if (
        !domNode.viewability || !ViewAbility.arrDomStyle[domNode.viewability]
    ) {
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
  public static getWindowHeight(): number | boolean {
    if (!ViewAbility.numWindowHeight) {
      ViewAbility.numWindowHeight = UtilsWindow.getHeight();
    }
    return ViewAbility.numWindowHeight || 0;
  };

  /**
   * Определение высоты документа
   *
   * @returns {number} - Высота документа
   */
  public static getDocumentHeight(): number | boolean {
    if (!ViewAbility.numDocumentHeight) {
      ViewAbility.numDocumentHeight = UtilsDocument.getHeight();
    }
    return ViewAbility.numDocumentHeight || 0;
  };

  /**
   * Определение ширины окна
   *
   * @returns {number} - Ширина окна
   */
  public static getWindowWidth(): number | boolean {
    if (!ViewAbility.numWindowWidth) {
      ViewAbility.numWindowWidth = UtilsWindow.getWidth();
    }
    return ViewAbility.numWindowWidth || 0;
  };

  /**
   * Определение ширины документа
   *
   * @returns {number} - Ширина документа
   */
  public static getDocumentWidth(): number | boolean {
    if (!ViewAbility.numDocumentWidth) {
      ViewAbility.numDocumentWidth = UtilsDocument.getWidth();
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
  public static getBoundingClientRect(domNode: any): {
    bottom: number,
    height: number,
    left: number,
    right: number,
    top: number,
    width: number
  } {
    return UtilsDOM.getBoundingClientRect(domNode);
  };

  /**
   * Метод для определения процента видимой части баннера на экране пользователя
   *
   * @param objSizes {{left: number, right: number, top: number, bottom: number, width: number, height: number}} -
   * Массив с параметрами размеров и положения
   * @returns {number} - Коэффициент видимости элемента от 0 до 1
   */
  public static calcVisibility(objSizes: {
    left: number,
    right: number,
    top: number,
    bottom: number,
    width: number,
    height: number
  }): number {
    /**
     * Определяем высоту окна
     * @type {number}
     */
    let _numWindowHeight = ViewAbility.getWindowHeight();
    let numWindowHeight = typeof _numWindowHeight === "number" ? _numWindowHeight : 0;
    /**
     * Определяем верхнюю и нижнюю видимые границы элемента
     */
    let numElementScrollTopFrom = objSizes.top < 0 ? 0 : objSizes.top;
    let numElementScrollTopTo = objSizes.bottom > numWindowHeight ? numWindowHeight : objSizes.bottom;
    /**
     * Определяем видимую и максимально возможную видимую области элемента по высоте
     * @type {number}
     */
    let numElementViewHeight = numElementScrollTopTo - numElementScrollTopFrom;
    let numElementMaxViewHeight = objSizes.height < numWindowHeight ? objSizes.height : numWindowHeight;
    /**
     * Вычисляем процент видимой части по высоте
     * @type {number}
     */
    let numElementViewHeightPath = numElementViewHeight / numElementMaxViewHeight;
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
    let _numWindowWidth = ViewAbility.getWindowWidth();
    let numWindowWidth = typeof _numWindowWidth === "number" ? _numWindowWidth : 0;
    /**
     * Определяем левую и правую видимые границы элемента
     */
    let numElementScrollLeftFrom = objSizes.left < 0 ? 0 : objSizes.left;
    let numElementScrollLeftTo = objSizes.right > numWindowWidth ? numWindowWidth : objSizes.right;
    /**
     * Определяем видимую и максимально возможную видимую области элемента по ширине
     * @type {number}
     */
    let numElementViewWidth = numElementScrollLeftTo - numElementScrollLeftFrom;
    let numElementMaxViewWidth = objSizes.width < numWindowWidth ? objSizes.width : numWindowWidth;
    /**
     * Вычисляем процент видимой части по ширине
     * @type {number}
     */
    let numElementViewWidthPath = numElementViewWidth / numElementMaxViewWidth;
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
    let numElementViewPath = numElementViewHeightPath * numElementViewWidthPath;
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
  public static isVisible(domNode: HTMLElement,
                          booElement: boolean,
                          numDocumentWidth: number,
                          numDocumentHeight: number): boolean {
    /**
     * TODO: не учитывать родителей если position fixed
     */
    /**
     * Устанавливаем флаг видимости и вычисляем размеры элемента
     * @type {boolean}
     */
    let booVisible = !!UtilsDOM.getDOMNode(domNode);
    /**
     * Check if element still visible
     */
    if (booVisible) {
      let objSizes = ViewAbility.getBoundingClientRect(domNode);
      /**
       * Если у элемента нет ширины или высоты то он или скрыт или у него нет размеров
       */
      if (
          !(objSizes.width && objSizes.height) &&
          (booElement || domNode.style.overflow !== "")
      ) {
        booVisible = false;
      } else if (
          booElement &&
          (
              objSizes.bottom < 0 ||
              objSizes.right < 0 ||
              objSizes.left > numDocumentWidth ||
              objSizes.top > numDocumentHeight
          )
      ) {
        booVisible = false;
      } else if (!!window.getComputedStyle) {
        /**
         * Check dom node existens
         */
        if (domNode) {
          /**
           * Вычисляем стили элемента
           * @type {CSSStyleDeclaration}
           */
          let objStyle = ViewAbility.getComputedStyle(domNode);
          /**
           * Если элемент имеет нулевую прозрачность или скрыт или не имеет отображения
           */
          if (
              objStyle.opacity === "0" ||
              objStyle.display === "none" ||
              objStyle.visibility === "hidden"
          ) {
            booVisible = false;
          }
        } else {
          booVisible = false;
        }
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
  public static checkTotalVisibility(domBanner: HTMLElement): number {
    /**
     * Устанавливаем флаг видимости элемента
     * Записываем элемент во временную переменную дял перебора по родителям
     * Устанавливаем флаг соответствия элемента исходному
     * @type {boolean}
     */
    let booVisible = true;
    let domNode: any = domBanner;
    let booElement = true;
    let _numDocumentWidth = ViewAbility.getDocumentWidth();
    let numDocumentWidth = typeof _numDocumentWidth === "number" ? _numDocumentWidth : 0;
    let _numDocumentHeight = ViewAbility.getDocumentHeight();
    let numDocumentHeight = typeof _numDocumentHeight === "number" ? _numDocumentHeight : 0;
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
    let numVisibility = 0;
    /**
     * Если элемент вообще виден, то высчитываем процент его видимости, если нет, то видимость нулевая
     */
    if (booVisible) {
      /**
       * Вычисляем стили элемента
       * @type {number}
       */
      let opacity: any = 1;
      /**
       * Check dom element existens
       */
      if (domBanner) {
        if (!!window.getComputedStyle) {
          let objStyle = ViewAbility.getComputedStyle(domBanner);
          opacity = objStyle.opacity;
        }
      } else {
        opacity = 0;
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
  public static checkVisibility(domBanner: HTMLElement): number {
    let numVisibility = ViewAbility.checkTotalVisibility(domBanner);
    if (numVisibility) {
      /**
       * Определяем положение и размеры элемента
       * @type {Object}
       */
      let objSizes = ViewAbility.getBoundingClientRect(domBanner);
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

  public ID: string;
  public domElement: any;
  public objSetting: any;
  public funCallBack: Function;
  public booTimerFlag: boolean;
  public watchID: any;
  public numTimerFrom: any;

  /**
   * Init
   * @param domElement
   * @param objSetting
   * @param funCallBack
   * @param SubscriptionID
   */
  constructor(domElement: any,
              objSetting: any,
              funCallBack: Function = () => {
              },
              SubscriptionID?: string) {
    /**
     * Если передан DOM элемент
     */
    if (
        domElement &&
        typeof domElement === "object" &&
        domElement.nodeType === 1 &&
        domElement.parentElement &&
        domElement.parentElement.nodeName !== "HTML"
    ) {
      domElement.id = this.ID = domElement.id || ViewAbility.getID();
    } else if (
        domElement &&
        typeof domElement === "string" &&
        domElement.length > 0
    ) {
      this.ID = domElement.toString();
      domElement = document.getElementById("" + this.ID);
    } else {
      domElement = null;
    }

    /**
     * Если вторым параметром переданы не параметры
     */
    if (
        !objSetting ||
        typeof(objSetting) !== "object"
    ) {
      objSetting = {
        percentage: 0.5,
        time: 1000,
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
    if (
        !funCallBack ||
        typeof(funCallBack) !== "function"
    ) {
      funCallBack = () => {

      };
    }

    /**
     * Если DOM элемент передан или найден
     */
    if (
        (
            domElement ||
            typeof this.ID === "string"
        ) &&
        typeof objSetting === "object" &&
        typeof objSetting.percentage === "number" &&
        typeof objSetting.time === "number" &&
        typeof funCallBack === "function"
    ) {
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
      setInterval(
          () => {
            ViewAbility.resizeEvent();
          },
          1000
      );
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

      /**
       * Get element ID
       */
      if (
          typeof this.ID !== "string" &&
          this.domElement &&
          typeof this.domElement === "object" &&
          this.domElement.nodeType === 1 &&
          this.domElement.parentElement &&
          this.domElement.parentElement.nodeName !== "HTML"
      ) {
        this.ID = this.domElement.id;
      }

      /**
       * Get subscription id from adf or element
       */
      if (typeof SubscriptionID === "string") {
        this.watchID = SubscriptionID;
      } else if (typeof this.ID === "string") {
        this.watchID = this.ID;
      } else {
        this.watchID = "";
      }

      /**
       * Subscript watcher for passed id or for a new one
       */
      if (this.watchID) {
        this.watchID = AnimationFrame.subscribe(
            this,
            this.watch,
            [],
            this.watchID
        );
      } else {
        this.watchID = AnimationFrame.subscribe(
            this,
            this.watch,
            []
        );
      }

      UtilsMain.implementationStaticMethods(this, "ViewAbility");
    }
  }

  /**
   * Watcher
   */
  public watch() {
    if (
        this.domElement &&
        typeof this.domElement === "object"
    ) {
      if (this.domElement.parentNode) {
        /**
         * Определение видимости баннера
         */
        let numVisibility = ViewAbility.checkVisibility(this.domElement);
        /**
         * Если видимость больше требуемой
         */
        if (
            numVisibility > this.objSetting.percentage
        ) {
          /**
           * Если флаг отсчета был выключен, то сбрасываем таймер
           */
          if (this.booTimerFlag === false) {
            this.numTimerFrom = Date.now();
          }
          this.booTimerFlag = true;
        } else {
          if (this.booTimerFlag === true) {
          }
          this.booTimerFlag = false;
        }
        /**
         * Флаг вызова callback
         * @type {boolean}
         */
        let booCallCallback = false;
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
          AnimationFrame.unsubscribe(this.watchID);
          this.funCallBack(this.ID);
        }
      } else {
        AnimationFrame.unsubscribe(this.watchID);
      }
    } else if (this.ID) {
      this.domElement = document.getElementById(this.ID);
    }
  };
}
/**
 * Export ViewAbility
 */
module.exports = ViewAbility;
