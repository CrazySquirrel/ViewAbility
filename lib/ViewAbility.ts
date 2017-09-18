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
 * Add submodules
 */
import AnimationFrame from "AnimationFrame/lib/AnimationFrame";
import UtilsDOM from "Utils/lib/UtilsDOM";
import UtilsDOMVisibility from "Utils/lib/UtilsDOMVisibility";
import UtilsMain from "Utils/lib/UtilsMain";

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

  /**
   * @deprecated ViewAbility.numDocumentWidth was deprecated, please use UtilsDOMVisibility.numDocumentWidth instead
   */
  public static get numDocumentWidth() {
    UtilsMain.warn("ViewAbility.numDocumentWidth was deprecated, please use UtilsDOMVisibility.numDocumentWidth instead");
    return ViewAbility._numDocumentWidth;
  }

  /**
   * @deprecated ViewAbility.numDocumentWidth was deprecated, please use UtilsDOMVisibility.numDocumentWidth instead
   */
  public static set numDocumentWidth(v) {
    UtilsMain.warn("ViewAbility.numDocumentWidth was deprecated, please use UtilsDOMVisibility.numDocumentWidth instead");
    ViewAbility._numDocumentWidth = v;
  }

  /**
   * @deprecated ViewAbility.numDocumentHeight was deprecated, please use UtilsDOMVisibility.numDocumentHeight instead
   */
  public static get numDocumentHeight() {
    UtilsMain.warn("ViewAbility.numDocumentHeight was deprecated, please use UtilsDOMVisibility.numDocumentHeight instead");
    return ViewAbility._numDocumentHeight;
  }

  /**
   * @deprecated ViewAbility.numDocumentHeight was deprecated, please use UtilsDOMVisibility.numDocumentHeight instead
   */
  public static set numDocumentHeight(v) {
    UtilsMain.warn("ViewAbility.numDocumentHeight was deprecated, please use UtilsDOMVisibility.numDocumentHeight instead");
    ViewAbility._numDocumentHeight = v;
  }

  /**
   * @deprecated ViewAbility.numWindowWidth was deprecated, please use UtilsDOMVisibility.numWindowWidth instead
   */
  public static get numWindowWidth() {
    UtilsMain.warn("ViewAbility.numWindowWidth was deprecated, please use UtilsDOMVisibility.numWindowWidth instead");
    return ViewAbility._numWindowWidth;
  }

  /**
   * @deprecated ViewAbility.numWindowWidth was deprecated, please use UtilsDOMVisibility.numWindowWidth instead
   */
  public static set numWindowWidth(v) {
    UtilsMain.warn("ViewAbility.numWindowWidth was deprecated, please use UtilsDOMVisibility.numWindowWidth instead");
    ViewAbility._numWindowWidth = v;
  }

  /**
   * @deprecated ViewAbility.numWindowHeight was deprecated, please use UtilsDOMVisibility.numWindowHeight instead
   */
  public static get numWindowHeight() {
    UtilsMain.warn("ViewAbility.numWindowHeight was deprecated, please use UtilsDOMVisibility.numWindowHeight instead");
    return ViewAbility._numWindowHeight;
  }

  /**
   * @deprecated ViewAbility.numWindowHeight was deprecated, please use UtilsDOMVisibility.numWindowHeight instead
   */
  public static set numWindowHeight(v) {
    UtilsMain.warn("ViewAbility.numWindowHeight was deprecated, please use UtilsDOMVisibility.numWindowHeight instead");
    ViewAbility._numWindowHeight = v;
  }

  /**
   * @deprecated ViewAbility.arrDomStyle was deprecated, please use UtilsDOMVisibility.arrDomStyle instead
   */
  public static get arrDomStyle() {
    UtilsMain.warn("ViewAbility.arrDomStyle was deprecated, please use UtilsDOMVisibility.arrDomStyle instead");
    return ViewAbility._arrDomStyle;
  }

  /**
   * @deprecated ViewAbility.arrDomStyle was deprecated, please use UtilsDOMVisibility.arrDomStyle instead
   */
  public static set arrDomStyle(v) {
    UtilsMain.warn("ViewAbility.arrDomStyle was deprecated, please use UtilsDOMVisibility.arrDomStyle instead");
    ViewAbility._arrDomStyle = v;
  }

  /**
   * Событие ресайза для сброса временных кешев размеров окна, документа и высчитанных стилей элементов
   *
   * @deprecated ViewAbility.resizeEvent was deprecated, please use UtilsDOMVisibility.resizeEvent instead
   */
  public static resizeEvent(): void {
    UtilsMain.warn("ViewAbility.resizeEvent was deprecated, please use UtilsDOMVisibility.resizeEvent instead");
    return UtilsDOMVisibility.resizeEvent();
  }

  /**
   * Метод для генерации UID
   *
   * @deprecated ViewAbility.getID was deprecated, please use UtilsDOMVisibility.getID instead
   *
   * @returns {string}
   */
  public static getID(): string {
    UtilsMain.warn("ViewAbility.getID was deprecated, please use UtilsDOMVisibility.getID instead");
    return UtilsDOMVisibility.getID();
  }

  /**
   * Расчет стилей элемента
   *
   * @deprecated ViewAbility.getComputedStyle was deprecated, please use UtilsDOMVisibility.getComputedStyle instead
   *
   * @param domNode
   * @returns {CSSStyleDeclaration}
   */
  public static getComputedStyle(domNode: any): CSSStyleDeclaration {
    UtilsMain.warn("ViewAbility.getComputedStyle was deprecated, please use UtilsDOMVisibility.getComputedStyle instead");
    return UtilsDOMVisibility.getComputedStyle(domNode);
  }

  /**
   * Определение высоты окна
   *
   * @deprecated ViewAbility.getWindowHeight was deprecated, please use UtilsDOMVisibility.getWindowHeight instead
   *
   * @returns {number} - Высота окна
   */
  public static getWindowHeight(): number | boolean {
    UtilsMain.warn("ViewAbility.getWindowHeight was deprecated, please use UtilsDOMVisibility.getWindowHeight instead");
    return UtilsDOMVisibility.getWindowHeight();
  }

  /**
   * Определение высоты документа
   *
   * @deprecated ViewAbility.getDocumentHeight was deprecated, please use UtilsDOMVisibility.getDocumentHeight instead
   *
   * @returns {number} - Высота документа
   */
  public static getDocumentHeight(): number | boolean {
    UtilsMain.warn("ViewAbility.getDocumentHeight was deprecated, please use UtilsDOMVisibility.getDocumentHeight instead");
    return UtilsDOMVisibility.getDocumentHeight();
  }

  /**
   * Определение ширины окна
   *
   * @deprecated ViewAbility.getWindowWidth was deprecated, please use UtilsDOMVisibility.getWindowWidth instead
   *
   * @returns {number} - Ширина окна
   */
  public static getWindowWidth(): number | boolean {
    UtilsMain.warn("ViewAbility.getWindowWidth was deprecated, please use UtilsDOMVisibility.getWindowWidth instead");
    return UtilsDOMVisibility.getWindowWidth();
  }

  /**
   * Определение ширины документа
   *
   * @deprecated ViewAbility.getDocumentWidth was deprecated, please use UtilsDOMVisibility.getDocumentWidth instead
   *
   * @returns {number} - Ширина документа
   */
  public static getDocumentWidth(): number | boolean {
    UtilsMain.warn("ViewAbility.getDocumentWidth was deprecated, please use UtilsDOMVisibility.getDocumentWidth instead");
    return UtilsDOMVisibility.getDocumentWidth();
  }

  /**
   * Определение положени и размеров элемента
   *
   * @deprecated ViewAbility.getBoundingClientRect was deprecated, please use UtilsDOM.getBoundingClientRect instead
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
    width: number,
  } {
    UtilsMain.warn("ViewAbility.getBoundingClientRect was deprecated, please use UtilsDOM.getBoundingClientRect instead");
    return UtilsDOM.getBoundingClientRect(domNode);
  }

  /**
   * Метод для определения процента видимой части баннера на экране пользователя
   *
   * @deprecated ViewAbility.calcVisibility was deprecated, please use UtilsDOMVisibility.calcVisibility instead
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
    height: number,
  }): number {
    UtilsMain.warn("ViewAbility.calcVisibility was deprecated, please use UtilsDOMVisibility.calcVisibility instead");
    return UtilsDOMVisibility.calcVisibility(objSizes);
  }

  /**
   * * Определение видимости элемента вообще
   *
   * @deprecated ViewAbility.isVisible was deprecated, please use UtilsDOMVisibility.isVisible instead
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
    UtilsMain.warn("ViewAbility.isVisible was deprecated, please use UtilsDOMVisibility.isVisible instead");
    return UtilsDOMVisibility.isVisible(domNode, booElement, numDocumentWidth, numDocumentHeight);
  }

  /**
   * Метод определения видимости баннера вообще
   *
   * @deprecated ViewAbility.checkTotalVisibility was deprecated, please use UtilsDOMVisibility.checkTotalVisibility instead
   *
   * @param domBanner {Object} - Элемент DOM дерева
   * @returns {number} - Коэффициент видимости элемента от 0 до 1
   */
  public static checkTotalVisibility(domBanner: HTMLElement): number {
    UtilsMain.warn("ViewAbility.checkTotalVisibility was deprecated, please use UtilsDOMVisibility.checkTotalVisibility instead");
    return UtilsDOMVisibility.checkTotalVisibility(domBanner);
  }

  /**
   * Метод определения видимости баннера
   *
   * @deprecated ViewAbility.checkVisibility was deprecated, please use UtilsDOMVisibility.checkVisibility instead
   *
   * @param domBanner {Object} - Элемент DOM дерева
   * @returns {number} - Коэффициент видимости элемента от 0 до 1
   */
  public static checkVisibility(domBanner: HTMLElement): number {
    UtilsMain.warn("ViewAbility.checkVisibility was deprecated, please use UtilsDOMVisibility.checkVisibility instead");
    return UtilsDOMVisibility.checkVisibility(domBanner);
  }

  private static _numDocumentWidth: number | boolean;
  private static _numDocumentHeight: number | boolean;
  private static _numWindowWidth: number | boolean;
  private static _numWindowHeight: number | boolean;
  private static _arrDomStyle: any = {};

  public ID: string;
  public domElement: any;
  public objSetting: any;
  public funCallBack: any;
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
              funCallBack: any = () => {
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
      domElement.id = this.ID = domElement.id || UtilsDOMVisibility.getID();
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
            this.watchID,
        );
      } else {
        this.watchID = AnimationFrame.subscribe(
            this,
            this.watch,
            [],
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
        const numVisibility = UtilsDOMVisibility.checkVisibility(this.domElement);
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
  }
}
/**
 * Export ViewAbility
 */
module.exports = ViewAbility;
