"use strict";

declare let describe: any;
declare let it: any;
declare let expect: any;

import ViewAbility from "../lib/ViewAbility";

describe("ViewAbility", () => {

  it("ViewAbility", (done) => {
    expect(typeof(ViewAbility)).toEqual("function");

    const div1 = window.document.createElement("div");
    div1.id = "div1";
    div1.style.width = "100px";
    div1.style.height = "100px";

    const div2 = window.document.createElement("div");
    div2.id = "div2";
    div2.style.width = "100px";
    div2.style.height = "100px";
    window.document.body.appendChild(div2);

    const div3 = window.document.createElement("div");
    div3.id = "div3";
    div3.style.width = "100px";
    div3.style.height = "100px";

    const iframe = window.document.createElement("iframe");
    iframe.src = "javascript:;";
    window.document.body.appendChild(iframe);
    iframe.contentWindow.document.body.appendChild(div3);

    const paramsValues = [
      undefined,
      null,
      false,
      true,
      0,
      "",
      "div4",
      div1,
      div2,
      div3,
      window,
      window.document,
      iframe.contentWindow,
      iframe.contentWindow.document,
      window.document.body,
      {},
      {
        percentage: false,
        time: "2000",
      },
      {
        percentage: 0.5,
        time: 2000,
      },
      () => {
      },
    ];

    const dataSet = [];

    for (let i1 = 0; i1 < paramsValues.length; i1++) {
      const x1 = paramsValues[i1];

      for (let i2 = 0; i2 < paramsValues.length; i2++) {
        const x2 = paramsValues[i2];

        for (let i3 = 0; i3 < paramsValues.length; i3++) {
          const x3 = paramsValues[i3];

          if (
              [x2, x3].indexOf(x1) === -1 &&
              [x1, x3].indexOf(x2) === -1 &&
              [x1, x2].indexOf(x3) === -1
          ) {
            const cond = (
                (
                    x1 === "div4" ||
                    x1 === div2 ||
                    x1 === div3
                ) &&
                (
                    typeof x2 === "object" ||
                    x2 === undefined
                ) &&
                (
                    typeof x3 === "function" ||
                    x3 === undefined
                )
            );
            dataSet.push({
              params: [x1, x2, x3],
              result: cond,
            });
          }
        }
      }
    }

    for (let j = 0; j < dataSet.length; j++) {
      const set = dataSet[j];

      const result = new ViewAbility(set.params[0], set.params[1], set.params[2]);

      expect(typeof result).toEqual("object");

      if (set.result) {
        expect(Object.keys(result)).toBeArray([
          "ID",
          "domElement",
          "objSetting",
          "funCallBack",
          "booTimerFlag",
          "watchID",
          "resizeEvent",
          "getID",
          "getComputedStyle",
          "getWindowHeight",
          "getDocumentHeight",
          "getWindowWidth",
          "getDocumentWidth",
          "getBoundingClientRect",
          "calcVisibility",
          "isVisible",
          "checkVisibility",
          "numDocumentWidth",
          "numDocumentHeight",
          "numWindowWidth",
          "numWindowHeight",
          "arrDomStyle",
        ]);

        expect(result.domElement === div2 || result.domElement === div3 || result.ID === "div4").toEqual(true);
      }
    }

    const div4 = window.document.createElement("div");
    div4.id = "div4";
    div4.style.width = "100px";
    div4.style.height = "100px";
    window.document.body.appendChild(div4);

    setTimeout(
        () => {
          window.document.body.removeChild(div2);
          window.document.body.removeChild(div4);
          window.document.body.removeChild(iframe);

          done();
        },
        3000,
    );
  });
});
