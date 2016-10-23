"use strict";
/**
 * Import sub interfaces
 */
import IAnimationFrame from "./IAnimationFrame";
import IDebug from "./IDebug";
import IViewAbility from "./IViewAbility";
/**
 * The storage interface
 */
interface IWindow {
    document: any;
    Utils: any;

    eventListenerAdded: boolean;

    innerHeight: number;
    innerWidth: number;
    pageXOffset: number;
    pageYOffset: number;

    requestAnimationFrame: Function;
    webkitRequestAnimationFrame: Function;
    mozRequestAnimationFrame: Function;
    oRequestAnimationFrame: Function;
    msRequestAnimationFrame: Function;
    addEventListener: Function;
    attachEvent: Function;
    getComputedStyle: Function;
    onerror: Function;

    AnimationFrame: IAnimationFrame;
    Debug: IDebug;
    ViewAbility: IViewAbility;

    setTimeout(callback: Function, time: number): number;
}
/**
 * Declare window interface
 */
declare var window: IWindow;
/**
 * Export the window interface
 */
export default IWindow;
