"use strict";
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

  addEventListener: any;
  attachEvent: any;
  getComputedStyle: any;
  onerror: any;

  ViewAbility: IViewAbility;
}
/**
 * Declare window interface
 */
declare let window: IWindow;
/**
 * Export the window interface
 */
export default IWindow;
