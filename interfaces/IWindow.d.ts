/**
 * Import sub interfaces
 */
import IViewAbility from "./IViewAbility";
/**
 * The storage interface
 */
interface IWindow {
    console: any;
    document: any;
    eventListenerAdded: boolean;
    innerHeight: number;
    innerWidth: number;
    pageXOffset: number;
    pageYOffset: number;
    addEventListener: Function;
    attachEvent: Function;
    getComputedStyle: Function;
    onerror: Function;
    ViewAbility: IViewAbility;
}
export default IWindow;
