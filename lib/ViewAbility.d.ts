/**
 * Import interface
 */
import IViewAbility from "../interfaces/IViewAbility";
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
    /**
     * @deprecated ViewAbility.numDocumentWidth was deprecated, please use UtilsDOMVisibility.numDocumentWidth instead
     */
    static numDocumentWidth: number | boolean;
    /**
     * @deprecated ViewAbility.numDocumentHeight was deprecated, please use UtilsDOMVisibility.numDocumentHeight instead
     */
    /**
     * @deprecated ViewAbility.numDocumentHeight was deprecated, please use UtilsDOMVisibility.numDocumentHeight instead
     */
    static numDocumentHeight: number | boolean;
    /**
     * @deprecated ViewAbility.numWindowWidth was deprecated, please use UtilsDOMVisibility.numWindowWidth instead
     */
    /**
     * @deprecated ViewAbility.numWindowWidth was deprecated, please use UtilsDOMVisibility.numWindowWidth instead
     */
    static numWindowWidth: number | boolean;
    /**
     * @deprecated ViewAbility.numWindowHeight was deprecated, please use UtilsDOMVisibility.numWindowHeight instead
     */
    /**
     * @deprecated ViewAbility.numWindowHeight was deprecated, please use UtilsDOMVisibility.numWindowHeight instead
     */
    static numWindowHeight: number | boolean;
    /**
     * @deprecated ViewAbility.arrDomStyle was deprecated, please use UtilsDOMVisibility.arrDomStyle instead
     */
    /**
     * @deprecated ViewAbility.arrDomStyle was deprecated, please use UtilsDOMVisibility.arrDomStyle instead
     */
    static arrDomStyle: any;
    /**
     * Событие ресайза для сброса временных кешев размеров окна, документа и высчитанных стилей элементов
     *
     * @deprecated ViewAbility.resizeEvent was deprecated, please use UtilsDOMVisibility.resizeEvent instead
     */
    static resizeEvent(): void;
    /**
     * Метод для генерации UID
     *
     * @deprecated ViewAbility.getID was deprecated, please use UtilsDOMVisibility.getID instead
     *
     * @returns {string}
     */
    static getID(): string;
    /**
     * Расчет стилей элемента
     *
     * @deprecated ViewAbility.getComputedStyle was deprecated, please use UtilsDOMVisibility.getComputedStyle instead
     *
     * @param domNode
     * @returns {CSSStyleDeclaration}
     */
    static getComputedStyle(domNode: any): CSSStyleDeclaration;
    /**
     * Определение высоты окна
     *
     * @deprecated ViewAbility.getWindowHeight was deprecated, please use UtilsDOMVisibility.getWindowHeight instead
     *
     * @returns {number} - Высота окна
     */
    static getWindowHeight(): number | boolean;
    /**
     * Определение высоты документа
     *
     * @deprecated ViewAbility.getDocumentHeight was deprecated, please use UtilsDOMVisibility.getDocumentHeight instead
     *
     * @returns {number} - Высота документа
     */
    static getDocumentHeight(): number | boolean;
    /**
     * Определение ширины окна
     *
     * @deprecated ViewAbility.getWindowWidth was deprecated, please use UtilsDOMVisibility.getWindowWidth instead
     *
     * @returns {number} - Ширина окна
     */
    static getWindowWidth(): number | boolean;
    /**
     * Определение ширины документа
     *
     * @deprecated ViewAbility.getDocumentWidth was deprecated, please use UtilsDOMVisibility.getDocumentWidth instead
     *
     * @returns {number} - Ширина документа
     */
    static getDocumentWidth(): number | boolean;
    /**
     * Определение положени и размеров элемента
     *
     * @deprecated ViewAbility.getBoundingClientRect was deprecated, please use UtilsDOM.getBoundingClientRect instead
     *
     * @param domNode {Object} - DOM элемент
     * @returns {{left: number, right: number, top: number, bottom: number, width: number, height: number}} -
     * Массив с параметрами размеров и положения
     */
    static getBoundingClientRect(domNode: any): {
        bottom: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
    };
    /**
     * Метод для определения процента видимой части баннера на экране пользователя
     *
     * @deprecated ViewAbility.calcVisibility was deprecated, please use UtilsDOMVisibility.calcVisibility instead
     *
     * @param objSizes {{left: number, right: number, top: number, bottom: number, width: number, height: number}} -
     * Массив с параметрами размеров и положения
     * @returns {number} - Коэффициент видимости элемента от 0 до 1
     */
    static calcVisibility(objSizes: {
        left: number;
        right: number;
        top: number;
        bottom: number;
        width: number;
        height: number;
    }): number;
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
    static isVisible(domNode: HTMLElement, booElement: boolean, numDocumentWidth: number, numDocumentHeight: number): boolean;
    /**
     * Метод определения видимости баннера вообще
     *
     * @deprecated ViewAbility.checkTotalVisibility was deprecated, please use UtilsDOMVisibility.checkTotalVisibility instead
     *
     * @param domBanner {Object} - Элемент DOM дерева
     * @returns {number} - Коэффициент видимости элемента от 0 до 1
     */
    static checkTotalVisibility(domBanner: HTMLElement): number;
    /**
     * Метод определения видимости баннера
     *
     * @deprecated ViewAbility.checkVisibility was deprecated, please use UtilsDOMVisibility.checkVisibility instead
     *
     * @param domBanner {Object} - Элемент DOM дерева
     * @returns {number} - Коэффициент видимости элемента от 0 до 1
     */
    static checkVisibility(domBanner: HTMLElement): number;
    private static _numDocumentWidth;
    private static _numDocumentHeight;
    private static _numWindowWidth;
    private static _numWindowHeight;
    private static _arrDomStyle;
    ID: string;
    domElement: any;
    objSetting: any;
    funCallBack: any;
    booTimerFlag: boolean;
    watchID: any;
    numTimerFrom: any;
    /**
     * Init
     * @param domElement
     * @param objSetting
     * @param funCallBack
     * @param SubscriptionID
     */
    constructor(domElement: any, objSetting: any, funCallBack?: any, SubscriptionID?: string);
    /**
     * Watcher
     */
    watch(): void;
}
