# ViewAbility
[![npm version](https://badge.fury.io/js/ViewAbility.svg)](https://github.com/CrazySquirrel/ViewAbility)
[![Github All Releases](https://img.shields.io/github/downloads/CrazySquirrel/ViewAbility/total.svg)](https://github.com/CrazySquirrel/ViewAbility)
[![Travis branch](https://img.shields.io/travis/CrazySquirrel/ViewAbility/master.svg)](https://github.com/CrazySquirrel/ViewAbility)
[![license](https://img.shields.io/github/license/CrazySquirrel/ViewAbility.svg)](https://github.com/CrazySquirrel/ViewAbility)
[![npm version](https://img.shields.io/badge/donate-%E2%99%A5-red.svg)](http://crazysquirrel.ru/support/)

Class to determine the visibility of the block.
 
## Build
The repository contains pre-compiled files, but if you want to add your files and compile, then run the following commands in the repository folder.
* npm install
* npm run production

or

* npm run development

The build required NodeJs version 6 or higher.

## Usage

```TypeScript
import ViewAbility from "ViewAbility.ts";

new ViewAbility(
    domBannerObject,
    {
        percentage: 0.5,
        time: 2000,
    },
    callback
);
```

or

```JavaScript
let ViewAbility = required("ViewAbility.js");

new ViewAbility(
    domBannerObject,
    {
        percentage: 0.5,
        time: 2000,
    },
    callback
);
```

 - domBannerObject - DOM element
 - percentage - How much of the object should be visible (0-1)
 - time - The amount of time the object must be visible to called callback.
 - callback - A function which will be called after the object is seen.