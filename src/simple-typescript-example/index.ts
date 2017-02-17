"use strict";
declare let require: any;
require("./index.html");

import ViewAbility from "../../lib/ViewAbility.ts";

new ViewAbility(
    document.getElementById("test-block"),
    {
        percentage: 0.5,
        time: 2000,
    },
    () => {
        window.document.write("Div was seen.");
    }
);
