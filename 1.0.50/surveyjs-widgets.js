(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("inputmask"), require("nouislider"), require("signature_pad"), require("sortablejs"), require("bootstrap-slider"));
	else if(typeof define === 'function' && define.amd)
		define("surveyjs-widgets", ["inputmask", "nouislider", "signature_pad", "sortablejs", "bootstrap-slider"], factory);
	else if(typeof exports === 'object')
		exports["surveyjs-widgets"] = factory(require("inputmask"), require("nouislider"), require("signature_pad"), require("sortablejs"), require("bootstrap-slider"));
	else
		root["surveyjs-widgets"] = factory(root["Inputmask"], root["noUiSlider"], root["SignaturePad"], root["Sortable"], root["Slider"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_17__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function init(Survey, $) {
  $ = $ || window.$;
  var widget = {
    className: "iradio_square-blue",
    name: "icheck",
    widgetIsLoaded: function() {
      return typeof $ == "function" && !!$.fn.iCheck;
    },
    isFit: function(question) {
      var t = question.getType();
      return t === "radiogroup" || t === "checkbox" || t === "matrix";
    },
    isDefaultRender: true,
    afterRender: function(question, el) {
      var rootWidget = this;
      var $el = $(el);
      $el.find("input").data({
        iCheck: undefined
      });

      $el.find("input").iCheck({
        checkboxClass: rootWidget.className,
        radioClass: rootWidget.className
      });
      var select = function() {
        if (question.getType() !== "matrix") {
          var values = question.value;
          if (!Array.isArray(values)) {
            values = [values];
          }
          values.forEach(function(value) {
            $el.find("input[value=" + value + "]").iCheck("check");
          });
        } else {
          question.generatedVisibleRows.forEach(function(row, index, rows) {
            if (row.value) {
              $(el)
                .find(
                  "input[name='" + row.fullName + "'][value='" + row.value + "']"
                )
                .iCheck("check");
            }
          });
        }
      };
      $el.find("input").on("ifChecked", function(event) {
        if (question.getType() === "matrix") {
          question.generatedVisibleRows.forEach(function(row, index, rows) {
            if (row.fullName === event.target.name) {
              row.value = event.target.value;
            }
          });
        } else if (question.getType() === "checkbox") {
          var oldValue = question.value || [];
          var index = oldValue.indexOf(event.target.value);
          if (index === -1) {
            question.value = oldValue.concat([event.target.value]);
          }
        } else {
          question.value = event.target.value;
        }
      });
      $el.find("input").on("ifUnchecked", function(event) {
        if (question.getType() === "checkbox") {
          var oldValue = question.value || [];
          var index = oldValue.indexOf(event.target.value);
          if (index >= 0) {
            oldValue.splice(index, 1);
            question.value = oldValue;
          }
        }
      });
      question.valueChangedCallback = select;
      select();
    },
    willUnmount: function(question, el) {
      var $el = $(el);
      $el.find("input").iCheck("destroy");
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

if (typeof Survey !== "undefined") {
  init(Survey, window.$);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function init(Survey, $) {
  $ = $ || window.$;
  var widget = {
    activatedBy: "property",
    name: "select2",
    htmlTemplate: "<select style='width: 100%;'></select>",
    widgetIsLoaded: function() {
      return typeof $ == "function" && !!$.fn.select2;
    },
    isFit: function(question) {
      if (widget.activatedBy == "property")
        return (
          question["renderAs"] === "select2" &&
          question.getType() === "dropdown"
        );
      if (widget.activatedBy == "type")
        return typeof question.getType() === "dropdown";
      if (widget.activatedBy == "customtype")
        return question.getType() === "select2";
      return false;
    },
    activatedByChanged: function(activatedBy) {
      if (!this.widgetIsLoaded()) return;
      widget.activatedBy = activatedBy;
      Survey.JsonObject.metaData.removeProperty("dropdown", "renderAs");
      if (activatedBy == "property") {
        Survey.JsonObject.metaData.addProperty("dropdown", {
          name: "renderAs",
          default: "standard",
          choices: ["standard", "select2"]
        });
        Survey.JsonObject.metaData.addProperty("dropdown", {
          name: "select2Config",
          default: null
        });
      }
      if (activatedBy == "customtype") {
        Survey.JsonObject.metaData.addClass("select2", [], null, "dropdown");
        Survey.JsonObject.metaData.addProperty("select2", {
          name: "select2Config",
          default: null
        });
      }
    },
    afterRender: function(question, el) {
      var settings = question.select2Config;
      var $el = $(el).is("select") ? $(el) : $(el).find("select");
      var othersEl = document.createElement("input");
      othersEl.type = "text";
      othersEl.style.marginTop = "3px";
      othersEl.style.display = "none";
      othersEl.style.width = "100%";
      $el
        .parent()
        .get(0)
        .appendChild(othersEl);

      var updateValueHandler = function() {
        $el.val(question.value).trigger("change");
        othersEl.style.display = !question.isOtherSelected ? "none" : "";
      };
      var updateCommentHandler = function() {
        othersEl.value = question.comment ? question.comment : "";
      };
      var othersElChanged = function() {
        question.comment = othersEl.value;
      };
      var updateChoices = function() {
        $el.select2().empty();

        if (settings) {
          if (settings.ajax) {
            $el.select2(settings);
          } else {
            settings.data = question.visibleChoices.map(function(choice) {
              return {
                id: choice.value,
                text: choice.text
              };
            });
            $el.select2(settings);
          }
        } else {
          $el.select2({
            theme: "classic",
            disabled: question.isReadOnly,
            data: question.visibleChoices.map(function(choice) {
              return {
                id: choice.value,
                text: choice.text
              };
            })
          });
        }

        updateValueHandler();
        updateCommentHandler();
      };

      question.readOnlyChangedCallback = function() {
        $el.prop("disabled", question.isReadOnly);
      };

      question.choicesChangedCallback = updateChoices;
      updateChoices();
      $el.on("select2:select", function(e) {
        question.value = e.target.value;
      });
      $el.on("select2:unselecting", function(e) {
        question.value = null;
      });
      othersEl.onchange = othersElChanged;
      question.valueChangedCallback = updateValueHandler;
      question.commentChangedCallback = updateCommentHandler;
      updateValueHandler();
      updateCommentHandler();
    },
    willUnmount: function(question, el) {
      $(el)
        .find("select")
        .off("select2:select")
        .select2("destroy");
      question.readOnlyChangedCallback = null;
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget);
}

if (typeof Survey !== "undefined") {
  init(Survey, window.$);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inputmask__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_inputmask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_inputmask__);


function init(Survey) {
  var widget = {
    name: "maskedit",
    numericGroupSeparator: ",",
    numericAutoGroup: true,
    numericDigits: 2,
    numericDigitsOptional: false,
    numericPrefix: "$",
    numericPlaceholder: "0",
    autoUnmask: true,
    widgetIsLoaded: function() {
      return typeof __WEBPACK_IMPORTED_MODULE_0_inputmask___default.a != "undefined";
    },
    isFit: function(question) {
      if (question.getType() == "multipletext") return true;
      return (
        question.getType() == "text" &&
        (question.inputMask != "none" || question.inputFormat)
      );
    },
    isDefaultRender: true,
    activatedByChanged: function(activatedBy) {
      if (Survey.JsonObject.metaData.findProperty("text", "inputMask")) return;
      var properties = [
        "inputFormat",
        {
          name: "inputMask",
          default: "none",
          choices: [
            "none",
            "datetime",
            "currency",
            "decimal",
            "email",
            "phone",
            "ip"
          ]
        }
      ];
      Survey.JsonObject.metaData.addProperties("text", properties);
      Survey.JsonObject.metaData.addProperties(
        "matrixdropdowncolumn",
        properties
      );
      Survey.JsonObject.metaData.addProperties("multipletextitem", properties);
    },
    applyInputMask: function(surveyElement, el) {
      var rootWidget = this;
      var mask =
        surveyElement.inputMask != "none"
          ? surveyElement.inputMask
          : surveyElement.inputFormat;
      var options = {
        autoUnmask: rootWidget.autoUnmask
      };
      if (surveyElement.inputMask != "none")
        options.inputFormat = surveyElement.inputFormat;

      if (
        surveyElement.inputMask == "currency" ||
        surveyElement.inputMask == "decimal"
      ) {
        options.groupSeparator = rootWidget.numericGroupSeparator;
        options.autoGroup = rootWidget.numericAutoGroup;
      }
      if (surveyElement.inputMask == "currency") {
        options.digits = rootWidget.numericDigits;
        options.digitsOptional = rootWidget.numericDigitsOptional;
        options.prefix = rootWidget.numericPrefix;
        options.placeholder = rootWidget.numericPlaceholder;
      }
      if (surveyElement.inputMask == "datetime") {
        mask = surveyElement.inputFormat;
      }

      __WEBPACK_IMPORTED_MODULE_0_inputmask___default()(mask, options).mask(el);

      el.oninput = function() {
        surveyElement.customWidgetData.isNeedRender = true;
      };

      var updateHandler = function() {
        el.value =
          typeof surveyElement.value === "undefined" ? "" : surveyElement.value;
      };
      surveyElement.valueChangedCallback = updateHandler;
      updateHandler();
    },
    afterRender: function(question, el) {
      if (question.getType() != "multipletext") {
        var input = el.querySelector("input") || el;
        this.applyInputMask(question, input);
      } else {
        for (var i = 0; i < question.items.length; i++) {
          var item = question.items[i];
          if (item.inputMask != "none" || item.inputFormat) {
            var input = el.querySelector("#" + item.id);
            if (input) {
              this.applyInputMask(item, input);
            }
          }
        }
      }
    },
    willUnmount: function(question, el) {
      var input = el.querySelector("input") || el;
      if (!!input && !!input.inputmask) {
        input.inputmask.remove();
      }
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget);
}

if (typeof Survey !== "undefined") {
  init(Survey);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function init(Survey, $) {
  $ = $ || window.$;
  var widget = {
    name: "barrating",
    title: "Bar rating",
    iconName: "icon-barrating",
    widgetIsLoaded: function() {
      return typeof $ == "function" && !!$.fn.barrating;
    },
    defaultJSON: { choices: [1, 2, 3, 4, 5] },
    isFit: function(question) {
      return question.getType() === "barrating";
    },
    isDefaultRender: true,
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass(
        "barrating",
        [
          { name: "hasOther", visible: false },
          { name: "otherText", visible: false },
          { name: "optionsCaption", visible: false },
          { name: "otherErrorText", visible: false },
          { name: "storeOthersAsComment", visible: false },
          { name: "renderAs", visible: false }
        ],
        null,
        "dropdown"
      );
      Survey.JsonObject.metaData.addProperty("barrating", {
        name: "showValues:boolean",
        default: false
      });
      Survey.JsonObject.metaData.addProperty("barrating", {
        name: "ratingTheme",
        default: "css-stars",
        choices: [
          "fontawesome-stars",
          "css-stars",
          "bars-pill",
          "bars-1to10",
          "bars-movie",
          "bars-square",
          "bars-reversed",
          "bars-horizontal",
          "bootstrap-stars",
          "fontawesome-stars-o"
        ]
      });
    },
    afterRender: function(question, el) {
      var $el = $(el).is("select") ? $(el) : $(el).find("select");
      $el.barrating("show", {
        theme: question.ratingTheme,
        initialRating: question.value,
        showValues: question.showValues,
        showSelectedRating: false,
        onSelect: function(value, text) {
          question.value = value;
        }
      });
      question.valueChangedCallback = function() {
        $(el)
          .find("select")
          .barrating("set", question.value);
      };
    },
    willUnmount: function(question, el) {
      var $el = $(el).find("select");
      $el.barrating("destroy");
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
  init(Survey, window.$);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function init(Survey, $) {
  $ = $ || window.$;
  var widget = {
    name: "datepicker",
    title: "Date picker",
    iconName: "icon-datepicker",
    widgetIsLoaded: function() {
      return !!$ && !!$.fn.datepicker;
    },
    isFit: function(question) {
      return question.getType() === "datepicker";
    },
    htmlTemplate: "<input class='form-control widget-datepicker' type='text'>",
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass(
        "datepicker",
        [
          { name: "inputType", visible: false },
          { name: "inputFormat", visible: false },
          { name: "inputMask", visible: false }
        ],
        null,
        "text"
      );
      Survey.JsonObject.metaData.addProperty("datepicker", {
        name: "dateFormat"
      });
      Survey.JsonObject.metaData.addProperty("datepicker", {
        name: "config",
        default: null
      });
    },
    afterRender: function(question, el) {
      var $el = $(el).is(".widget-datepicker")
        ? $(el)
        : $(el).find(".widget-datepicker");
      var config = question.config || {};
      if (!!question.placeHolder) {
        $el.attr("placeholder", question.placeHolder);
      }
      if (config.dateFormat === undefined) {
        config.dateFormat = !!question.dateFormat
          ? question.dateFormat
          : undefined;
      }
      if (config.option === undefined) {
        config.option = {
          minDate: null,
          maxDate: null
        };
      }
      if (config.onSelect === undefined) {
        config.onSelect = function(dateText) {
          question.value = dateText;
        };
      }
      var pickerWidget = $el.datepicker(config);

      $el.keyup(function(e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
          $.datepicker._clearDate(this);
        }
      });

      question.readOnlyChangedCallback = function() {
        $el.datepicker("option", "disabled", question.isReadOnly);
      };
      question.readOnlyChangedCallback();

      question.valueChangedCallback = function() {
        if (question.value) {
          pickerWidget.datepicker("setDate", question.value);
        } else {
          pickerWidget.datepicker("setDate", null);
        }
      };
      question.valueChangedCallback();
    },
    willUnmount: function(question, el) {
      var $el = $(el).is(".widget-datepicker")
        ? $(el)
        : $(el).find(".widget-datepicker");
      $el.datepicker("destroy");
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
  init(Survey, window.$);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nouislider__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nouislider___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nouislider__);


function init(Survey) {
  var widget = {
    name: "nouislider",
    title: "noUiSlider",
    iconName: "icon-nouislider",
    widgetIsLoaded: function() {
      return typeof __WEBPACK_IMPORTED_MODULE_0_nouislider___default.a != "undefined";
    },
    isFit: function(question) {
      return question.getType() === "nouislider";
    },
    htmlTemplate: "<div></div>",
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass("nouislider", [], null, "empty");
      Survey.JsonObject.metaData.addProperties("nouislider", [
        {
          name: "step:number",
          default: 1
        },
        {
          name: "rangeMin:number",
          default: 0
        },
        {
          name: "rangeMax:number",
          default: 100
        },
        {
          name: "pipsMode",
          default: "positions"
        },
        {
          name: "pipsValues:itemvalues",
          default: [0, 25, 50, 75, 100]
        },
        {
          name: "pipsDensity:number",
          default: 5
        }
      ]);
    },
    afterRender: function(question, el) {
      if (question.isEmpty()) {
        question.value = (question.rangeMin + question.rangeMax) / 2;
      }

      el.style.marginBottom = "50px";
      var slider = __WEBPACK_IMPORTED_MODULE_0_nouislider___default.a.create(el, {
        start: question.value,
        connect: [true, false],
        step: question.step,
        tooltips: true,
        pips: {
          mode: question.pipsMode || "positions",
          values: question.pipsValues.map(function(pVal) {
            return parseInt((pVal.value !== undefined && pVal.value) || pVal);
          }),
          density: question.pipsDensity || 5
        },
        range: {
          min: question.rangeMin,
          max: question.rangeMax
        }
      });
      slider.on("set", function() {
        question.value = slider.get();
      });
      var updateValueHandler = function() {
        slider.set(question.value);
      };
      if (question.isReadOnly) {
        el.setAttribute("disabled", true);
      }
      updateValueHandler();
      question.noUiSlider = slider;
      question.valueChangedCallback = updateValueHandler;
      question.readOnlyChangedCallback = function() {
        if (question.isReadOnly) {
          el.setAttribute("disabled", true);
        } else {
          el.removeAttribute("disabled");
        }
      };
    },
    willUnmount: function(question, el) {
      question.noUiSlider.destroy();
      question.noUiSlider = null;
      question.readOnlyChangedCallback = null;
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
  init(Survey);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function init(Survey, $) {
  $ = $ || window.$;
  var widget = {
    name: "tagbox",
    title: "Tag box",
    iconName: "icon-tagbox",
    widgetIsLoaded: function() {
      return typeof $ == "function" && !!$.fn.select2;
    },
    defaultJSON: {
      choices: ["Item 1", "Item 2", "Item 3"]
    },
    htmlTemplate: "<select multiple='multiple' style='width: 100%;'></select>",
    isFit: function(question) {
      return question.getType() === "tagbox";
    },
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass(
        "tagbox",
        [
          {
            name: "hasOther",
            visible: false
          }
        ],
        null,
        "checkbox"
      );
      Survey.JsonObject.metaData.addProperty("tagbox", {
        name: "select2Config",
        default: null
      });
    },
    afterRender: function(question, el) {
      var settings = question.select2Config;
      var $el = $(el).is("select") ? $(el) : $(el).find("select");
      $el.select2({
        tags: "true",
        disabled: question.isReadOnly,
        theme: "classic"
      });
      var updateValueHandler = function() {
        $el.val(question.value).trigger("change");
      };
      var updateChoices = function() {
        $el.select2().empty();

        if (settings) {
          if (settings.ajax) {
            $el.select2(settings);
          } else {
            settings.data = question.visibleChoices.map(function(choice) {
              return {
                id: choice.value,
                text: choice.text
              };
            });
            $el.select2(settings);
          }
        } else {
          $el.select2({
            data: question.visibleChoices.map(function(choice) {
              return {
                id: choice.value,
                text: choice.text
              };
            })
          });
        }

        updateValueHandler();
      };

      question.readOnlyChangedCallback = function() {
        $el.prop("disabled", question.isReadOnly);
      };

      question.choicesChangedCallback = updateChoices;
      question.valueChangedCallback = updateValueHandler;
      $el.on("select2:select", function(e) {
        question.value = (question.value || []).concat(e.params.data.id);
      });
      $el.on("select2:unselect", function(e) {
        var index = (question.value || []).indexOf(e.params.data.id);
        if (index !== -1) {
          var val = question.value;
          val.splice(index, 1);
          question.value = val;
        }
      });
      updateChoices();
    },
    willUnmount: function(question, el) {
      $(el)
        .find("select")
        .off("select2:select")
        .select2("destroy");
      question.readOnlyChangedCallback = null;
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
  init(Survey, window.$);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_signature_pad__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_signature_pad___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_signature_pad__);


function resizeCanvas(canvas) {
  var context = canvas.getContext("2d");
  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStoreRatio =
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  var ratio = devicePixelRatio / backingStoreRatio;

  var oldWidth = canvas.width;
  var oldHeight = canvas.height;

  canvas.width = oldWidth * ratio;
  canvas.height = oldHeight * ratio;

  canvas.style.width = oldWidth + "px";
  canvas.style.height = oldHeight + "px";

  context.scale(ratio, ratio);
}

function init(Survey) {
  var widget = {
    name: "signaturepad",
    title: "Signature pad",
    iconName: "icon-signaturepad",
    widgetIsLoaded: function() {
      return typeof __WEBPACK_IMPORTED_MODULE_0_signature_pad___default.a != "undefined";
    },
    penColor: "#1ab394",
    isFit: function(question) {
      return question.getType() === "signaturepad";
    },
    htmlTemplate:
      "<div class='sjs_sp_container'><div><canvas></canvas></div><div class='sjs_sp_controls'><button type='button' class='sjs_sp_clear' title='Clear'>✖</button></div></div><style>.sjs_sp_container { position: relative; } .sjs_sp_controls { position: absolute; left: 0; bottom: 0; } .sjs_sp_controls > button { user-select: none; }</style>",
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass("signaturepad", [], null, "empty");
      Survey.JsonObject.metaData.addProperties("signaturepad", [
        {
          name: "allowClear:boolean",
          default: true
        },
        {
          name: "width:number",
          default: 300
        },
        {
          name: "height:number",
          default: 200
        }
      ]);
    },
    afterRender: function(question, el) {
      var rootWidget = this;
      var canvas = el.getElementsByTagName("canvas")[0];
      var signaturePad = new __WEBPACK_IMPORTED_MODULE_0_signature_pad___default.a(canvas);
      if (question.isReadOnly) {
        signaturePad.off();
      }

      question.readOnlyChangedCallback = function() {
        if (question.isReadOnly) {
          signaturePad.off();
          var clearBtn = document.querySelector(".sjs_sp_clear");
          clearBtn && (clearBtn.disabled = true);
        } else {
          signaturePad.on();
          var clearBtn = document.querySelector(".sjs_sp_clear");
          clearBtn && (clearBtn.disabled = false);
        }
      };

      signaturePad.penColor = rootWidget.penColor;
      signaturePad.onEnd = function() {
        var data = signaturePad.toDataURL();
        question.value = data;
      };
      var updateValueHandler = function() {
        var data = question.value;
        canvas.width = question.width;
        canvas.height = question.height;
        resizeCanvas(canvas);
        signaturePad.fromDataURL(
          data || "data:image/gif;base64,R0lGODlhAQABAIAAAP"
        );
      };
      question.valueChangedCallback = updateValueHandler;
      updateValueHandler();
      question.signaturePad = signaturePad;
      var propertyChangedHandler = function(sender, options) {
        if (options.name === "width" || options.name === "height") {
          updateValueHandler();
        }
      };
      question.onPropertyChanged.add(propertyChangedHandler);
      question.signaturePad.propertyChangedHandler = propertyChangedHandler;
      var buttonEl = el.getElementsByTagName("button")[0];
      if (question.allowClear && !question.isReadOnly) {
        buttonEl.onclick = function() {
          question.value = undefined;
        };
      } else {
        buttonEl.parentNode.removeChild(buttonEl);
      }
    },
    willUnmount: function(question, el) {
      if (question.signaturePad) {
        question.onPropertyChanged.remove(
          question.signaturePad.propertyChangedHandler
        );
        question.signaturePad.off();
      }
      question.readOnlyChangedCallback = null;
      question.signaturePad = null;
      question.readOnlyChangedCallback = null;
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
  init(Survey);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sortablejs__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sortablejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sortablejs__);


function init(Survey) {
  var widget = {
    name: "sortablelist",
    title: "Sortable list",
    iconName: "icon-sortablejs",
    widgetIsLoaded: function() {
      return typeof __WEBPACK_IMPORTED_MODULE_0_sortablejs___default.a != "undefined";
    },
    defaultJSON: { choices: ["Item 1", "Item 2", "Item 3"] },
    rootStyle: "width:100%:",
    areaStyle:
      "border: 1px solid #1ab394; width:100%; min-height:50px; margin-top:10px;",
    itemStyle: "background-color:#1ab394;color:#fff;margin:5px;padding:10px;",
    isFit: function(question) {
      return question.getType() === "sortablelist";
    },
    htmlTemplate: "<div></div>",
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass(
        "sortablelist",
        [
          { name: "hasOther", visible: false },
          { name: "storeOthersAsComment", visible: false }
        ],
        null,
        "checkbox"
      );
      Survey.JsonObject.metaData.addProperty("sortablelist", {
        name: "emptyText",
        default: "Move items here."
      });
      Survey.JsonObject.metaData.addProperty("sortablelist", {
        name: "useDefaultTheme",
        default: true
      });
    },
    afterRender: function(question, el) {
      var self = this;

      if (!question.useDefaultTheme) {
        self.rootStyle = "";
        self.itemStyle = "";
        self.areaStyle = "";
      }
      el.style.cssText = self.rootStyle;
      el.className = "sjs-sortablejs-root";
      var source, result;
      var resultEl = document.createElement("div");
      var emptyEl = document.createElement("span");
      var sourceEl = document.createElement("div");

      resultEl.style.cssText = self.areaStyle;
      resultEl.className = "sjs-sortablejs-result";

      emptyEl.innerHTML = question.emptyText;
      resultEl.appendChild(emptyEl);

      sourceEl.style.cssText = self.areaStyle;
      sourceEl.className = "sjs-sortablejs-source";

      el.appendChild(resultEl);
      el.appendChild(sourceEl);
      var hasValueInResults = function(val) {
        var res = question.value;
        if (!Array.isArray(res)) return false;
        for (var i = 0; i < res.length; i++) {
          if (res[i] == val) return true;
        }
        return false;
      };
      var addChoiceToWidget = function(choice, inResults) {
        var srcEl = inResults ? resultEl : sourceEl;
        var newEl = document.createElement("div");
        newEl.innerHTML =
          "<div class='sjs-sortablejs-item' style='" +
          self.itemStyle +
          "'>" +
          choice.text +
          "</div>";
        newEl.dataset["value"] = choice.value;
        srcEl.appendChild(newEl);
      };
      var getChoicesNotInResults = function() {
        var res = [];
        question.activeChoices.forEach(function(choice) {
          if (!hasValueInResults(choice.value)) {
            res.push(choice);
          }
        });
        return res;
      };
      var getChoicesInResults = function() {
        var res = [];
        var val = question.value;
        if (!Array.isArray(val)) return res;
        for (var i = 0; i < val.length; i++) {
          var item = Survey.ItemValue.getItemByValue(
            question.activeChoices,
            val[i]
          );
          if (!!item) {
            res.push(item);
          }
        }
        return res;
      };
      var isUpdatingQuestionValue = false;
      var updateValueHandler = function() {
        if (isUpdatingQuestionValue) return;
        resultEl.innerHTML = "";
        resultEl.appendChild(emptyEl);
        sourceEl.innerHTML = "";
        var notInResults = getChoicesNotInResults();
        var inResults = getChoicesInResults();
        emptyEl.style.display = inResults.length > 0 ? "none" : "";
        inResults.forEach(function(choice) {
          addChoiceToWidget(choice, true);
        });
        notInResults.forEach(function(choice) {
          addChoiceToWidget(choice, false);
        });
      };
      result = question.resultEl = __WEBPACK_IMPORTED_MODULE_0_sortablejs___default.a.create(resultEl, {
        animation: 150,
        disabled: question.isReadOnly,
        group: question.name,
        onSort: function(evt) {
          var result = [];
          if (resultEl.children.length === 1) {
            emptyEl.style.display = "";
          } else {
            emptyEl.style.display = "none";
            for (var i = 0; i < resultEl.children.length; i++) {
              if (typeof resultEl.children[i].dataset.value === "undefined")
                continue;
              result.push(resultEl.children[i].dataset.value);
            }
          }
          isUpdatingQuestionValue = true;
          question.value = result;
          isUpdatingQuestionValue = false;
        }
      });
      source = question.sourceEl = __WEBPACK_IMPORTED_MODULE_0_sortablejs___default.a.create(sourceEl, {
        animation: 150,
        disabled: question.isReadOnly,
        group: question.name
      });
      question.valueChangedCallback = updateValueHandler;
      question.readOnlyChangedCallback = function() {
        if (question.isReadOnly) {
          result.options.disabled = true;
          source.options.disabled = true;
        } else {
          result.options.disabled = false;
          source.options.disabled = false;
        }
      };
      updateValueHandler();
    },
    willUnmount: function(question, el) {
      question.resultEl.destroy();
      question.sourceEl.destroy();
      question.readOnlyChangedCallback = null;
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
  init(Survey);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function init(Survey) {
  var widget = {
    name: "editor",
    title: "Editor",
    iconName: "icon-editor",
    widgetIsLoaded: function() {
      return typeof CKEDITOR != "undefined";
    },
    isFit: function(question) {
      return question.getType() === "editor";
    },
    htmlTemplate:
      "<textarea rows='10' cols='80' style: {width:'100%'}></textarea>",
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass("editor", [], null, "empty");
      Survey.JsonObject.metaData.addProperty("editor", {
        name: "height",
        default: 300
      });
    },
    afterRender: function(question, el) {
      CKEDITOR.editorConfig = function(config) {
        config.language = "es";
        config.height = question.height;
        config.toolbarCanCollapse = true;
      };
      var editor = CKEDITOR.replace(el);
      CKEDITOR.instances.editor1.config.readOnly = question.isReadOnly;

      var isValueChanging = false;
      var updateValueHandler = function() {
        if (isValueChanging) return;
        editor.setData(question.value);
      };
      editor.on("change", function() {
        isValueChanging = true;
        question.value = editor.getData();
        isValueChanging = false;
      });

      question.valueChangedCallback = updateValueHandler;
      question.readOnlyChangedCallback = function() {
        if (question.isReadOnly) {
          editor.setReadOnly(true);
        } else {
          editor.setReadOnly(false);
        }
      };
      updateValueHandler();
    },
    willUnmount: function(question, el) {
      question.readOnlyChangedCallback = null;
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
  init(Survey);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function init(Survey, $) {
  $ = $ || window.$;
  var widget = {
    name: "autocomplete",
    widgetIsLoaded: function() {
      return typeof $ == "function" && !!$.fn.easyAutocomplete;
    },
    isFit: function(question) {
      return question.getType() === "text";
    },
    isDefaultRender: true,
    activatedByChanged: function(activatedBy) {
      if (
        Survey.JsonObject.metaData.findProperty("text", "choices") !== null ||
        Survey.JsonObject.metaData.findProperty("text", "choicesByUrl") !== null
      ) {
        return;
      }
      Survey.JsonObject.metaData.addProperty("text", {
        name: "choices:itemvalues",
        onGetValue: function(obj) {
          return Survey.ItemValue.getData(obj.choices || []);
        },
        onSetValue: function(obj, value) {
          if (!obj.choices) {
            obj.choices = obj.createItemValues("choices");
          }
          obj.choices = value;
        }
      });
      Survey.JsonObject.metaData.addProperty("text", {
        name: "choicesByUrl:restfull",
        className: "ChoicesRestfull",
        onGetValue: function(obj) {
          return obj && obj.choicesByUrl && obj.choicesByUrl.getData();
        },
        onSetValue: function(obj, value) {
          if (!obj.choicesByUrl) {
            obj.choicesByUrl = new Survey.ChoicesRestfull();
          }
          obj.choicesByUrl.setData(value);
        }
      });
    },
    afterRender: function(question, el) {
      var $el = $(el).is("input") ? $(el) : $(el).find("input");
      var options = {
        data: (question.choices || []).map(function(item) {
          return item.getData();
        }),
        adjustWidth: false,
        list: {
          sort: {
            enabled: true
          },
          match: {
            enabled: true
          }
        },
        placeholder: question.placeholder
      };
      if (!!question.choicesByUrl) {
        options.url = function(phrase) {
          return question.choicesByUrl.url;
        };
        options.getValue = question.choicesByUrl.valueName;
        // options.ajaxSettings = {
        //   dataType: "jsonp"
        // };
      }
      $el.easyAutocomplete(options);
    },
    willUnmount: function(question, el) {
      // var $el = $(el).find("input");
      // $el.autocomplete("destroy");
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "type");
}

if (typeof Survey !== "undefined") {
  init(Survey, window.$);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function init(Survey) {
  var widget = {
    settings: {
      supportedTypes: ["radiogroup", "checkbox", "boolean"],
      radiogroup: {
        rootClass: "pretty p-default p-round",
        inputType: "radio",
        states: [{ stateClass: "state p-success", addOn: "" }]
      },
      checkbox: {
        rootClass: "pretty p-default",
        inputType: "checkbox",
        states: [{ stateClass: "state p-success", addOn: "" }]
      },
      boolean: {
        rootClass: "pretty p-icon p-default p-has-indeterminate",
        inputType: "checkbox",
        states: [
          { stateClass: "state p-success", addOn: "" },
          {
            stateClass: "state p-success p-is-indeterminate",
            iconClass: "icon mdi mdi-minus",
            addOn: ""
          }
        ]
      }
    },
    name: "pretty-checkbox",
    activatedBy: "property",
    widgetIsLoaded: function() {
      return true;
    },
    htmlTemplate: "<fieldset></fieldset>",
    isFit: function(question) {
      var isFitByType =
        widget.settings.supportedTypes.indexOf(question.getType()) !== -1;

      if (widget.activatedBy === "property") {
        return question["renderAs"] === "prettycheckbox" && isFitByType;
      } else if (widget.activatedBy === "type") {
        return isFitByType;
      }

      return false;
    },
    activatedByChanged: function(value) {
      if (this.widgetIsLoaded()) {
        widget.activatedBy = value;
        widget.settings.supportedTypes.forEach(function(supportedType) {
          Survey.JsonObject.metaData.removeProperty(supportedType, "renderAs");

          if (value === "property") {
            Survey.JsonObject.metaData.addProperty(supportedType, {
              name: "renderAs",
              default: "standard",
              choices: ["standard", "prettycheckbox"]
            });
          }
        });
      }
    },
    isDefaultRender: false,
    afterRender: function(question, element) {
      var itemInputs = {};
      var questionType = question.getType();
      var options = this.settings[questionType];
      var checkboxType = questionType === "checkbox";
      var radiogroupType = questionType === "radiogroup";
      var booleanType = questionType === "boolean";

      var inChangeHandler = false;
      var changeHandler = function(event) {
        inChangeHandler = true;
        try {
          var target = arguments[0].target;
          var targetValue = target.value;
          var targetChecked = target.checked;

          if (checkboxType) {
            var questionValue = question.value || [];
            var valueIndex = questionValue.indexOf(targetValue);
            if (targetChecked) {
              if (valueIndex === -1) {
                questionValue.push(targetValue);
              }
            } else {
              if (valueIndex !== -1) {
                questionValue.splice(valueIndex, 1);
              }
            }

            question.value = questionValue;
          } else if (radiogroupType) {
            question.value = targetValue;
          } else {
            question.value = targetChecked;
          }
        } finally {
          inChangeHandler = false;
        }
      };

      var itemWidth =
        question.colCount > 0 ? 100 / question.colCount + "%" : "";

      var choices = booleanType
        ? [{ locText: question.locTitle, value: !!question.value }]
        : question.choices;
      choices.forEach(function(choiceItem, index) {
        var input = document.createElement("input");
        input.type = options.inputType;
        input.name = question.name + (checkboxType ? "" + index : "");
        input.onchange = changeHandler;
        input.value = choiceItem.value;

        if (booleanType) {
          input.indeterminate = question.defaultValue === "indeterminate";
        }

        var controlRoot = document.createElement("div");
        controlRoot.className = options.rootClass;
        controlRoot.appendChild(input);

        options.states.forEach(function(state) {
          var stateRoot = document.createElement("div");
          stateRoot.className = state.stateClass;
          if (!!state.iconClass) {
            var icon = document.createElement("i");
            icon.className = state.iconClass;
            stateRoot.appendChild(icon);
          }

          var label = document.createElement("label");
          if (choiceItem.locText.hasHtml) {
            label.innerHTML = choiceItem.locText.html;
          } else {
            label.textContent = choiceItem.locText.text;
          }
          stateRoot.appendChild(label);

          controlRoot.appendChild(stateRoot);
          if (!!state.addOn) {
            stateRoot.insertAdjacentHTML("afterbegin", state.addOn);
          }
        });

        var itemRoot = document.createElement("div");
        itemRoot.className = "sv_cw_pretty_checkbox_" + questionType;
        itemRoot.style.display = "inline-block";
        itemRoot.style.width = itemWidth;
        itemRoot.appendChild(controlRoot);

        element.appendChild(itemRoot);

        itemInputs[choiceItem.value] = input;
      });

      var updateValueHandler = function(newValue) {
        if (!inChangeHandler) {
          var checkedItems = newValue || [];
          if (radiogroupType) {
            checkedItems = [newValue];
          }

          Object.values(itemInputs).forEach(function(inputItem) {
            if (checkedItems.indexOf(inputItem.value) !== -1) {
              inputItem.setAttribute("checked", undefined);
            } else {
              inputItem.removeAttribute("checked");
            }
          });
        }
      };
      var readOnlyHandler = function() {
        Object.values(itemInputs).forEach(function(inputItem) {
          if (question.isReadOnly) {
            inputItem.setAttribute("disabled", true);
          } else {
            inputItem.removeAttribute("disabled");
          }
        });
      };

      question.valueChangedCallback = updateValueHandler;
      question.readOnlyChangedCallback = readOnlyHandler;
      updateValueHandler(question.value);
      readOnlyHandler();
    },
    willUnmount: function(question, el) {
      question.valueChangedCallback = undefined;
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "property");
}

if (typeof Survey !== "undefined") {
  init(Survey);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var Slider = __webpack_require__(17);

function init(Survey) {
  var widget = {
    name: "bootstrapslider",
    title: "Bootstrap Slider",
    iconName: "icon-bootstrap-slider",
    widgetIsLoaded: function() {
      return typeof Slider !== "undefined";
    },
    isFit: function(question) {
      return question.getType() === "bootstrapslider";
    },
    htmlTemplate: "<div></div>",
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass("bootstrapslider", [], null, "empty");
      Survey.JsonObject.metaData.addProperties("bootstrapslider", [
        {
          name: "step:number",
          default: 1
        },
        {
          name: "rangeMin:number",
          default: 0
        },
        {
          name: "rangeMax:number",
          default: 100
        }
      ]);
    },
    afterRender: function(question, el) {
      var inputEl = document.createElement("input");
      inputEl.id = question.id;
      inputEl.type = "text";
      inputEl.setAttribute("data-slider-id", question.name + "_" + question.id);
      inputEl.setAttribute("data-slider-min", question.rangeMin);
      inputEl.setAttribute("data-slider-max", question.rangeMax);
      inputEl.setAttribute("data-slider-step", question.step);
      inputEl.setAttribute(
        "data-slider-value",
        question.value || question.rangeMin
      );
      el.appendChild(inputEl);
      var slider = new Slider(inputEl, {
        id: question.name + "_" + question.id,
        min: question.rangeMin,
        max: question.rangeMax,
        step: question.step,
        enabled: !question.isReadOnly,
        value: question.value || question.rangeMin
      });

      slider.on("change", function(valueObj) {
        question.value = slider.getValue();
      });
      var updateValueHandler = function() {
        slider.setValue(question.value || question.rangeMin);
      };
      question.readOnlyChangedCallback = function() {
        if (question.isReadOnly) {
          slider.disable();
        } else {
          slider.enable();
        }
      };
      question.bootstrapSlider = slider;
      question.valueChangedCallback = updateValueHandler;
    },
    willUnmount: function(question, el) {
      question.bootstrapSlider.destroy();
      question.bootstrapSlider = null;
      question.readOnlyChangedCallback = null;
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
  init(Survey);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_17__;

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_recordrtc__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_recordrtc___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_recordrtc__);


function init(Survey) {
  var widget = {
	
    name: "microphone",
    title: "Microphone",
    iconName: "icon-microphone",
    widgetIsLoaded: function() {
      return typeof __WEBPACK_IMPORTED_MODULE_0_recordrtc___default.a != "undefined";
    },
    isFit: function(question) {
      return question.getType() === "microphone";
    },
    htmlTemplate:
		"<div>"+
		"<button type='button'  title='Record'><i class='fa fa-microphone' aria-hidden='true'></i></button>"+ 
		"&nbsp;<button type='button' title='Save'><i class='fa fa-cloud' aria-hidden='true'></i></button>"+
		"&nbsp;<audio style='"+
		"position:relative; "+
		"top:16px; "+
		"left:10px; "+
		"height:35px;"+
		"-moz-box-shadow: 2px 2px 4px 0px #006773;"+
		"-webkit-box-shadow:  2px 2px 4px 0px #006773;"+
		"box-shadow: 2px 2px 4px 0px #006773;"+
		"' "+
		"controls='true' >"+
		"</audio>"+
		"</div>",
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass("microphone", [], null, "empty");
    },
	
    afterRender: function(question, el) {
      var rootWidget = this;
	  var buttonStartEl = el.getElementsByTagName("button")[0];
	  var buttonStopEl = el.getElementsByTagName("button")[1];
	  var audioEl = el.getElementsByTagName("audio")[0];
	 
//////////  RecordRTC logic	
	  
	  var successCallback = function(stream) {
		var options={
			type: 'audio',
			mimeType: 'audio/webm',
			audioBitsPerSecond: 44100,
			sampleRate: 44100, 
			bufferSize: 16384, 
			numberOfAudioChannels: 1
		};  
		console.log("successCallback");
		question.survey.mystream = stream;
		question.survey.recordRTC = __WEBPACK_IMPORTED_MODULE_0_recordrtc___default()(question.survey.mystream, options);
		if(typeof question.survey.recordRTC != "undefined"){
			console.log("startRecording");
			question.survey.recordRTC.startRecording();
		}
	  };

	  var errorCallback=function() {
		alert('No microphone');
		question.survey.recordRTC=undefined;
		question.survey.mystream=undefined;
	  };

	  var processAudio= function(audioVideoWebMURL) {
		console.log("processAudio");
		var recordedBlob = question.survey.recordRTC.getBlob();
		
		var fileReader = new FileReader();
        fileReader.onload = function(event){
		  var dataUri = event.target.result;
		  console.log("dataUri: " +dataUri);
		  question.value = dataUri;
		  audioEl.src=dataUri;
		  
		  console.log("cleaning");
		  question.survey.recordRTC=undefined;
		  question.survey.mystream=undefined;
        };
        fileReader.readAsDataURL(recordedBlob);
	  };

      var startRecording=function() {
		  
		 // erase previous data 
		 question.value=undefined;
		
       	// if recorder open on another question	- try to stop recording		
		if(typeof question.survey.recordRTC != "undefined"){
			question.survey.recordRTC.stopRecording(doNothingHandler);
			if(typeof question.survey.mystream != "undefined"){
				question.survey.mystream.getAudioTracks().forEach(function(track) {
				track.stop();
				}
				);
			}
		}
			 
		var mediaConstraints = {
		  video: false,
		  audio: true
		};
		
		navigator.mediaDevices
			.getUserMedia(mediaConstraints)
			.then(successCallback.bind(this), errorCallback.bind(this));
     };

	  var stopRecording=function() {
		  console.log("stopRecording");
		  if(typeof question.survey.recordRTC != "undefined"){
			question.survey.recordRTC.stopRecording(processAudio.bind(this));
			if(typeof question.survey.mystream != "undefined"){
				question.survey.mystream.getAudioTracks().forEach(function(track) {
				track.stop();
				}
				);
			}
		  }
	  };
	
//////////////  end RTC logic //////////////////
	  
	  if (!question.isReadOnly) {
        buttonStartEl.onclick = startRecording;
      } else {
        buttonStartEl.parentNode.removeChild(buttonStartEl);
      }
	  
	  if (!question.isReadOnly) {
        buttonStopEl.onclick = stopRecording;
      } else {
        buttonStopEl.parentNode.removeChild(buttonStopEl);
      }
	  
	  
      audioEl.src=question.value
      
      var updateValueHandler = function() {
        
      };
	  
	  var doNothingHandler = function() {
        
      };
	  
      question.valueChangedCallback = updateValueHandler;
      updateValueHandler();
	  
     
    },
    willUnmount: function(question, el) {
      console.log("unmount microphone no record ");
      if(typeof question.survey.recordRTC != "undefined"){
			question.survey.recordRTC.stopRecording(doNothingHandler);
			if(typeof question.survey.mystream != "undefined"){
				question.survey.mystream.getAudioTracks().forEach(function(track) {
				track.stop();
				});
			}
		question.value=undefined;
		question.survey.recordRTC=undefined;
		question.survey.mystream=undefined;
	   }
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
  init(Survey);
}

/* harmony default export */ __webpack_exports__["default"] = (init);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

// Last time updated: 2018-09-12 1:14:20 PM UTC

// ________________
// RecordRTC v5.4.8

// Open-Sourced: https://github.com/muaz-khan/RecordRTC

// --------------------------------------------------
// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// --------------------------------------------------

// ____________
// RecordRTC.js

/**
 * {@link https://github.com/muaz-khan/RecordRTC|RecordRTC} is a WebRTC JavaScript library for audio/video as well as screen activity recording. It supports Chrome, Firefox, Opera, Android, and Microsoft Edge. Platforms: Linux, Mac and Windows. 
 * @summary Record audio, video or screen inside the browser.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef RecordRTC
 * @class
 * @example
 * var recorder = RecordRTC(mediaStream or [arrayOfMediaStream], {
 *     type: 'video', // audio or video or gif or canvas
 *     recorderType: MediaStreamRecorder || CanvasRecorder || StereoAudioRecorder || Etc
 * });
 * recorder.startRecording();
 * @see For further information:
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - Single media-stream object, array of media-streams, html-canvas-element, etc.
 * @param {object} config - {type:"video", recorderType: MediaStreamRecorder, disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, desiredSampRate: 16000, video: HTMLVideoElement, etc.}
 */

function RecordRTC(mediaStream, config) {
    if (!mediaStream) {
        throw 'First parameter is required.';
    }

    config = config || {
        type: 'video'
    };

    config = new RecordRTCConfiguration(mediaStream, config);

    // a reference to user's recordRTC object
    var self = this;

    function startRecording(config2) {
        if (!!config2) {
            // allow users to set options using startRecording method
            // config2 is similar to main "config" object (second parameter over RecordRTC constructor)
            config = new RecordRTCConfiguration(mediaStream, config2);
        }

        if (!config.disableLogs) {
            console.log('started recording ' + config.type + ' stream.');
        }

        if (mediaRecorder) {
            mediaRecorder.clearRecordedData();
            mediaRecorder.record();

            setState('recording');

            if (self.recordingDuration) {
                handleRecordingDuration();
            }
            return self;
        }

        initRecorder(function() {
            if (self.recordingDuration) {
                handleRecordingDuration();
            }
        });

        return self;
    }

    function initRecorder(initCallback) {
        if (initCallback) {
            config.initCallback = function() {
                initCallback();
                initCallback = config.initCallback = null; // recorder.initRecorder should be call-backed once.
            };
        }

        var Recorder = new GetRecorderType(mediaStream, config);

        mediaRecorder = new Recorder(mediaStream, config);
        mediaRecorder.record();

        setState('recording');

        if (!config.disableLogs) {
            console.log('Initialized recorderType:', mediaRecorder.constructor.name, 'for output-type:', config.type);
        }
    }

    function stopRecording(callback) {
        callback = callback || function() {};

        if (!mediaRecorder) {
            warningLog();
            return;
        }

        if (self.state === 'paused') {
            self.resumeRecording();

            setTimeout(function() {
                stopRecording(callback);
            }, 1);
            return;
        }

        if (self.state !== 'recording' && !config.disableLogs) {
            console.warn('Recording state should be: "recording", however current state is: ', self.state);
        }

        if (!config.disableLogs) {
            console.log('Stopped recording ' + config.type + ' stream.');
        }

        if (config.type !== 'gif') {
            mediaRecorder.stop(_callback);
        } else {
            mediaRecorder.stop();
            _callback();
        }

        setState('stopped');

        function _callback(__blob) {
            if (!mediaRecorder) {
                if (typeof callback.call === 'function') {
                    callback.call(self, '');
                } else {
                    callback('');
                }
                return;
            }

            Object.keys(mediaRecorder).forEach(function(key) {
                if (typeof mediaRecorder[key] === 'function') {
                    return;
                }

                self[key] = mediaRecorder[key];
            });

            var blob = mediaRecorder.blob;

            if (!blob) {
                if (__blob) {
                    mediaRecorder.blob = blob = __blob;
                } else {
                    throw 'Recording failed.';
                }
            }

            if (blob && !config.disableLogs) {
                console.log(blob.type, '->', bytesToSize(blob.size));
            }

            if (callback) {
                var url = URL.createObjectURL(blob);

                if (typeof callback.call === 'function') {
                    callback.call(self, url);
                } else {
                    callback(url);
                }
            }

            if (!config.autoWriteToDisk) {
                return;
            }

            getDataURL(function(dataURL) {
                var parameter = {};
                parameter[config.type + 'Blob'] = dataURL;
                DiskStorage.Store(parameter);
            });
        }
    }

    function pauseRecording() {
        if (!mediaRecorder) {
            warningLog();
            return;
        }

        if (self.state !== 'recording') {
            if (!config.disableLogs) {
                console.warn('Unable to pause the recording. Recording state: ', self.state);
            }
            return;
        }

        setState('paused');

        mediaRecorder.pause();

        if (!config.disableLogs) {
            console.log('Paused recording.');
        }
    }

    function resumeRecording() {
        if (!mediaRecorder) {
            warningLog();
            return;
        }

        if (self.state !== 'paused') {
            if (!config.disableLogs) {
                console.warn('Unable to resume the recording. Recording state: ', self.state);
            }
            return;
        }

        setState('recording');

        // not all libs have this method yet
        mediaRecorder.resume();

        if (!config.disableLogs) {
            console.log('Resumed recording.');
        }
    }

    function readFile(_blob) {
        postMessage(new FileReaderSync().readAsDataURL(_blob));
    }

    function getDataURL(callback, _mediaRecorder) {
        if (!callback) {
            throw 'Pass a callback function over getDataURL.';
        }

        var blob = _mediaRecorder ? _mediaRecorder.blob : (mediaRecorder || {}).blob;

        if (!blob) {
            if (!config.disableLogs) {
                console.warn('Blob encoder did not finish its job yet.');
            }

            setTimeout(function() {
                getDataURL(callback, _mediaRecorder);
            }, 1000);
            return;
        }

        if (typeof Worker !== 'undefined' && !navigator.mozGetUserMedia) {
            var webWorker = processInWebWorker(readFile);

            webWorker.onmessage = function(event) {
                callback(event.data);
            };

            webWorker.postMessage(blob);
        } else {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function(event) {
                callback(event.target.result);
            };
        }

        function processInWebWorker(_function) {
            var blob = URL.createObjectURL(new Blob([_function.toString(),
                'this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'
            ], {
                type: 'application/javascript'
            }));

            var worker = new Worker(blob);
            URL.revokeObjectURL(blob);
            return worker;
        }
    }

    function handleRecordingDuration(counter) {
        counter = counter || 0;

        if (self.state === 'paused') {
            setTimeout(function() {
                handleRecordingDuration(counter);
            }, 1000);
            return;
        }

        if (self.state === 'stopped') {
            return;
        }

        if (counter >= self.recordingDuration) {
            stopRecording(self.onRecordingStopped);
            return;
        }

        counter += 1000; // 1-second

        setTimeout(function() {
            handleRecordingDuration(counter);
        }, 1000);
    }

    function setState(state) {
        if (!self) {
            return;
        }

        self.state = state;

        if (typeof self.onStateChanged.call === 'function') {
            self.onStateChanged.call(self, state);
        } else {
            self.onStateChanged(state);
        }
    }

    var WARNING = 'It seems that recorder is destroyed or "startRecording" is not invoked for ' + config.type + ' recorder.';

    function warningLog() {
        if (config.disableLogs === true) {
            return;
        }

        console.warn(WARNING);
    }

    var mediaRecorder;

    var returnObject = {
        /**
         * This method starts the recording.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * var recorder = RecordRTC(mediaStream, {
         *     type: 'video'
         * });
         * recorder.startRecording();
         */
        startRecording: startRecording,

        /**
         * This method stops the recording. It is strongly recommended to get "blob" or "URI" inside the callback to make sure all recorders finished their job.
         * @param {function} callback - Callback to get the recorded blob.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     // use either "this" or "recorder" object; both are identical
         *     video.src = this.toURL();
         *     var blob = this.getBlob();
         * });
         */
        stopRecording: stopRecording,

        /**
         * This method pauses the recording. You can resume recording using "resumeRecording" method.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo Firefox is unable to pause the recording. Fix it.
         * @example
         * recorder.pauseRecording();  // pause the recording
         * recorder.resumeRecording(); // resume again
         */
        pauseRecording: pauseRecording,

        /**
         * This method resumes the recording.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.pauseRecording();  // first of all, pause the recording
         * recorder.resumeRecording(); // now resume it
         */
        resumeRecording: resumeRecording,

        /**
         * This method initializes the recording.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo This method should be deprecated.
         * @example
         * recorder.initRecorder();
         */
        initRecorder: initRecorder,

        /**
         * Ask RecordRTC to auto-stop the recording after 5 minutes.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * var fiveMinutes = 5 * 1000 * 60;
         * recorder.setRecordingDuration(fiveMinutes, function() {
         *    var blob = this.getBlob();
         *    video.src = this.toURL();
         * });
         * 
         * // or otherwise
         * recorder.setRecordingDuration(fiveMinutes).onRecordingStopped(function() {
         *    var blob = this.getBlob();
         *    video.src = this.toURL();
         * });
         */
        setRecordingDuration: function(recordingDuration, callback) {
            if (typeof recordingDuration === 'undefined') {
                throw 'recordingDuration is required.';
            }

            if (typeof recordingDuration !== 'number') {
                throw 'recordingDuration must be a number.';
            }

            self.recordingDuration = recordingDuration;
            self.onRecordingStopped = callback || function() {};

            return {
                onRecordingStopped: function(callback) {
                    self.onRecordingStopped = callback;
                }
            };
        },

        /**
         * This method can be used to clear/reset all the recorded data.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo Figure out the difference between "reset" and "clearRecordedData" methods.
         * @example
         * recorder.clearRecordedData();
         */
        clearRecordedData: function() {
            if (!mediaRecorder) {
                warningLog();
                return;
            }

            mediaRecorder.clearRecordedData();

            if (!config.disableLogs) {
                console.log('Cleared old recorded data.');
            }
        },

        /**
         * Get the recorded blob. Use this method inside the "stopRecording" callback.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     var blob = this.getBlob();
         *
         *     var file = new File([blob], 'filename.webm', {
         *         type: 'video/webm'
         *     });
         *
         *     var formData = new FormData();
         *     formData.append('file', file); // upload "File" object rather than a "Blob"
         *     uploadToServer(formData);
         * });
         * @returns {Blob} Returns recorded data as "Blob" object.
         */
        getBlob: function() {
            if (!mediaRecorder) {
                warningLog();
                return;
            }

            return mediaRecorder.blob;
        },

        /**
         * Get data-URI instead of Blob.
         * @param {function} callback - Callback to get the Data-URI.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     recorder.getDataURL(function(dataURI) {
         *         video.src = dataURI;
         *     });
         * });
         */
        getDataURL: getDataURL,

        /**
         * Get virtual/temporary URL. Usage of this URL is limited to current tab.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     video.src = this.toURL();
         * });
         * @returns {String} Returns a virtual/temporary URL for the recorded "Blob".
         */
        toURL: function() {
            if (!mediaRecorder) {
                warningLog();
                return;
            }

            return URL.createObjectURL(mediaRecorder.blob);
        },

        /**
         * Get internal recording object (i.e. internal module) e.g. MutliStreamRecorder, MediaStreamRecorder, StereoAudioRecorder or WhammyRecorder etc.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * var internal = recorder.getInternalRecorder();
         * if(internal instanceof MultiStreamRecorder) {
         *     internal.addStreams([newAudioStream]);
         *     internal.resetVideoStreams([screenStream]);
         * }
         * @returns {Object} Returns internal recording object.
         */
        getInternalRecorder: function() {
            return mediaRecorder;
        },

        /**
         * Invoke save-as dialog to save the recorded blob into your disk.
         * @param {string} fileName - Set your own file name.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     this.save('file-name');
         *
         *     // or manually:
         *     invokeSaveAsDialog(this.getBlob(), 'filename.webm');
         * });
         */
        save: function(fileName) {
            if (!mediaRecorder) {
                warningLog();
                return;
            }

            invokeSaveAsDialog(mediaRecorder.blob, fileName);
        },

        /**
         * This method gets a blob from indexed-DB storage.
         * @param {function} callback - Callback to get the recorded blob.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.getFromDisk(function(dataURL) {
         *     video.src = dataURL;
         * });
         */
        getFromDisk: function(callback) {
            if (!mediaRecorder) {
                warningLog();
                return;
            }

            RecordRTC.getFromDisk(config.type, callback);
        },

        /**
         * This method appends an array of webp images to the recorded video-blob. It takes an "array" object.
         * @type {Array.<Array>}
         * @param {Array} arrayOfWebPImages - Array of webp images.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo This method should be deprecated.
         * @example
         * var arrayOfWebPImages = [];
         * arrayOfWebPImages.push({
         *     duration: index,
         *     image: 'data:image/webp;base64,...'
         * });
         * recorder.setAdvertisementArray(arrayOfWebPImages);
         */
        setAdvertisementArray: function(arrayOfWebPImages) {
            config.advertisement = [];

            var length = arrayOfWebPImages.length;
            for (var i = 0; i < length; i++) {
                config.advertisement.push({
                    duration: i,
                    image: arrayOfWebPImages[i]
                });
            }
        },

        /**
         * It is equivalent to <code class="str">"recorder.getBlob()"</code> method. Usage of "getBlob" is recommended, though.
         * @property {Blob} blob - Recorded Blob can be accessed using this property.
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     var blob = this.blob;
         *
         *     // below one is recommended
         *     var blob = this.getBlob();
         * });
         */
        blob: null,

        /**
         * This works only with {recorderType:StereoAudioRecorder}. Use this property on "stopRecording" to verify the encoder's sample-rates.
         * @property {number} bufferSize - Buffer-size used to encode the WAV container
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     alert('Recorder used this buffer-size: ' + this.bufferSize);
         * });
         */
        bufferSize: 0,

        /**
         * This works only with {recorderType:StereoAudioRecorder}. Use this property on "stopRecording" to verify the encoder's sample-rates.
         * @property {number} sampleRate - Sample-rates used to encode the WAV container
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     alert('Recorder used these sample-rates: ' + this.sampleRate);
         * });
         */
        sampleRate: 0,

        /**
         * {recorderType:StereoAudioRecorder} returns ArrayBuffer object.
         * @property {ArrayBuffer} buffer - Audio ArrayBuffer, supported only in Chrome.
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     var arrayBuffer = this.buffer;
         *     alert(arrayBuffer.byteLength);
         * });
         */
        buffer: null,

        /**
         * This method resets the recorder. So that you can reuse single recorder instance many times.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.reset();
         * recorder.startRecording();
         */
        reset: function() {
            if (mediaRecorder && typeof mediaRecorder.clearRecordedData === 'function') {
                mediaRecorder.clearRecordedData();
            }
            mediaRecorder = null;
            setState('inactive');
            self.blob = null;
        },

        /**
         * This method is called whenever recorder's state changes. Use this as an "event".
         * @property {String} state - A recorder's state can be: recording, paused, stopped or inactive.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.onStateChanged = function(state) {
         *     console.log('Recorder state: ', state);
         * };
         */
        onStateChanged: function(state) {
            if (!config.disableLogs) {
                console.log('Recorder state changed:', state);
            }
        },

        /**
         * A recorder can have inactive, recording, paused or stopped states.
         * @property {String} state - A recorder's state can be: recording, paused, stopped or inactive.
         * @memberof RecordRTC
         * @static
         * @readonly
         * @example
         * // this looper function will keep you updated about the recorder's states.
         * (function looper() {
         *     document.querySelector('h1').innerHTML = 'Recorder's state is: ' + recorder.state;
         *     if(recorder.state === 'stopped') return; // ignore+stop
         *     setTimeout(looper, 1000); // update after every 3-seconds
         * })();
         * recorder.startRecording();
         */
        state: 'inactive',

        /**
         * Get recorder's readonly state.
         * @method
         * @memberof RecordRTC
         * @example
         * var state = recorder.getState();
         * @returns {String} Returns recording state.
         */
        getState: function() {
            return self.state;
        },

        /**
         * Destroy RecordRTC instance. Clear all recorders and objects.
         * @method
         * @memberof RecordRTC
         * @example
         * recorder.destroy();
         */
        destroy: function() {
            var disableLogsCache = config.disableLogs;

            config = {
                disableLogs: true
            };
            self.reset();
            setState('destroyed');
            returnObject = self = null;

            if (Storage.AudioContextConstructor) {
                Storage.AudioContextConstructor.close();
                Storage.AudioContextConstructor = null;
            }

            config.disableLogs = disableLogsCache;

            if (!config.disableLogs) {
                console.warn('RecordRTC is destroyed.');
            }
        },

        /**
         * RecordRTC version number
         * @property {String} version - Release version number.
         * @memberof RecordRTC
         * @static
         * @readonly
         * @example
         * alert(recorder.version);
         */
        version: '5.4.8'
    };

    if (!this) {
        self = returnObject;
        return returnObject;
    }

    // if someone wants to use RecordRTC with the "new" keyword.
    for (var prop in returnObject) {
        this[prop] = returnObject[prop];
    }

    self = this;

    return returnObject;
}

RecordRTC.version = '5.4.8';

if (true /* && !!module.exports*/ ) {
    module.exports = RecordRTC;
}

if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
        return RecordRTC;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}

RecordRTC.getFromDisk = function(type, callback) {
    if (!callback) {
        throw 'callback is mandatory.';
    }

    console.log('Getting recorded ' + (type === 'all' ? 'blobs' : type + ' blob ') + ' from disk!');
    DiskStorage.Fetch(function(dataURL, _type) {
        if (type !== 'all' && _type === type + 'Blob' && callback) {
            callback(dataURL);
        }

        if (type === 'all' && callback) {
            callback(dataURL, _type.replace('Blob', ''));
        }
    });
};

/**
 * This method can be used to store recorded blobs into IndexedDB storage.
 * @param {object} options - {audio: Blob, video: Blob, gif: Blob}
 * @method
 * @memberof RecordRTC
 * @example
 * RecordRTC.writeToDisk({
 *     audio: audioBlob,
 *     video: videoBlob,
 *     gif  : gifBlob
 * });
 */
RecordRTC.writeToDisk = function(options) {
    console.log('Writing recorded blob(s) to disk!');
    options = options || {};
    if (options.audio && options.video && options.gif) {
        options.audio.getDataURL(function(audioDataURL) {
            options.video.getDataURL(function(videoDataURL) {
                options.gif.getDataURL(function(gifDataURL) {
                    DiskStorage.Store({
                        audioBlob: audioDataURL,
                        videoBlob: videoDataURL,
                        gifBlob: gifDataURL
                    });
                });
            });
        });
    } else if (options.audio && options.video) {
        options.audio.getDataURL(function(audioDataURL) {
            options.video.getDataURL(function(videoDataURL) {
                DiskStorage.Store({
                    audioBlob: audioDataURL,
                    videoBlob: videoDataURL
                });
            });
        });
    } else if (options.audio && options.gif) {
        options.audio.getDataURL(function(audioDataURL) {
            options.gif.getDataURL(function(gifDataURL) {
                DiskStorage.Store({
                    audioBlob: audioDataURL,
                    gifBlob: gifDataURL
                });
            });
        });
    } else if (options.video && options.gif) {
        options.video.getDataURL(function(videoDataURL) {
            options.gif.getDataURL(function(gifDataURL) {
                DiskStorage.Store({
                    videoBlob: videoDataURL,
                    gifBlob: gifDataURL
                });
            });
        });
    } else if (options.audio) {
        options.audio.getDataURL(function(audioDataURL) {
            DiskStorage.Store({
                audioBlob: audioDataURL
            });
        });
    } else if (options.video) {
        options.video.getDataURL(function(videoDataURL) {
            DiskStorage.Store({
                videoBlob: videoDataURL
            });
        });
    } else if (options.gif) {
        options.gif.getDataURL(function(gifDataURL) {
            DiskStorage.Store({
                gifBlob: gifDataURL
            });
        });
    }
};

// __________________________
// RecordRTC-Configuration.js

/**
 * {@link RecordRTCConfiguration} is an inner/private helper for {@link RecordRTC}.
 * @summary It configures the 2nd parameter passed over {@link RecordRTC} and returns a valid "config" object.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef RecordRTCConfiguration
 * @class
 * @example
 * var options = RecordRTCConfiguration(mediaStream, options);
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, getNativeBlob:true, etc.}
 */

function RecordRTCConfiguration(mediaStream, config) {
    if (!config.recorderType && !config.type) {
        if (!!config.audio && !!config.video) {
            config.type = 'video';
        } else if (!!config.audio && !config.video) {
            config.type = 'audio';
        }
    }

    if (config.recorderType && !config.type) {
        if (config.recorderType === WhammyRecorder || config.recorderType === CanvasRecorder) {
            config.type = 'video';
        } else if (config.recorderType === GifRecorder) {
            config.type = 'gif';
        } else if (config.recorderType === StereoAudioRecorder) {
            config.type = 'audio';
        } else if (config.recorderType === MediaStreamRecorder) {
            if (mediaStream.getAudioTracks().length && mediaStream.getVideoTracks().length) {
                config.type = 'video';
            } else if (mediaStream.getAudioTracks().length && !mediaStream.getVideoTracks().length) {
                config.type = 'audio';
            } else if (!mediaStream.getAudioTracks().length && mediaStream.getVideoTracks().length) {
                config.type = 'audio';
            } else {
                // config.type = 'UnKnown';
            }
        }
    }

    if (typeof MediaStreamRecorder !== 'undefined' && typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype) {
        if (!config.mimeType) {
            config.mimeType = 'video/webm';
        }

        if (!config.type) {
            config.type = config.mimeType.split('/')[0];
        }

        if (!config.bitsPerSecond) {
            // config.bitsPerSecond = 128000;
        }
    }

    // consider default type=audio
    if (!config.type) {
        if (config.mimeType) {
            config.type = config.mimeType.split('/')[0];
        }
        if (!config.type) {
            config.type = 'audio';
        }
    }

    return config;
}

// __________________
// GetRecorderType.js

/**
 * {@link GetRecorderType} is an inner/private helper for {@link RecordRTC}.
 * @summary It returns best recorder-type available for your browser.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef GetRecorderType
 * @class
 * @example
 * var RecorderType = GetRecorderType(options);
 * var recorder = new RecorderType(options);
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
 */

function GetRecorderType(mediaStream, config) {
    var recorder;

    // StereoAudioRecorder can work with all three: Edge, Firefox and Chrome
    // todo: detect if it is Edge, then auto use: StereoAudioRecorder
    if (isChrome || isEdge || isOpera) {
        // Media Stream Recording API has not been implemented in chrome yet;
        // That's why using WebAudio API to record stereo audio in WAV format
        recorder = StereoAudioRecorder;
    }

    if (typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype && !isChrome) {
        recorder = MediaStreamRecorder;
    }

    // video recorder (in WebM format)
    if (config.type === 'video' && (isChrome || isOpera)) {
        recorder = WhammyRecorder;
    }

    // video recorder (in Gif format)
    if (config.type === 'gif') {
        recorder = GifRecorder;
    }

    // html2canvas recording!
    if (config.type === 'canvas') {
        recorder = CanvasRecorder;
    }

    if (isMediaRecorderCompatible() && recorder !== CanvasRecorder && recorder !== GifRecorder && typeof MediaRecorder !== 'undefined' && 'requestData' in MediaRecorder.prototype) {
        if ((mediaStream.getVideoTracks && mediaStream.getVideoTracks().length) || (mediaStream.getAudioTracks && mediaStream.getAudioTracks().length)) {
            // audio-only recording
            if (config.type === 'audio') {
                if (typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported('audio/webm')) {
                    recorder = MediaStreamRecorder;
                }
                // else recorder = StereoAudioRecorder;
            } else {
                // video or screen tracks
                if (typeof MediaRecorder.isTypeSupported === 'function' && MediaRecorder.isTypeSupported('video/webm')) {
                    recorder = MediaStreamRecorder;
                }
            }
        }
    }

    if (mediaStream instanceof Array && mediaStream.length) {
        recorder = MultiStreamRecorder;
    }

    if (config.recorderType) {
        recorder = config.recorderType;
    }

    if (!config.disableLogs && !!recorder && !!recorder.name) {
        console.log('Using recorderType:', recorder.name || recorder.constructor.name);
    }

    return recorder;
}

// _____________
// MRecordRTC.js

/**
 * MRecordRTC runs on top of {@link RecordRTC} to bring multiple recordings in a single place, by providing simple API.
 * @summary MRecordRTC stands for "Multiple-RecordRTC".
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef MRecordRTC
 * @class
 * @example
 * var recorder = new MRecordRTC();
 * recorder.addStream(MediaStream);
 * recorder.mediaType = {
 *     audio: true, // or StereoAudioRecorder or MediaStreamRecorder
 *     video: true, // or WhammyRecorder or MediaStreamRecorder
 *     gif: true    // or GifRecorder
 * };
 * // mimeType is optional and should be set only in advance cases.
 * recorder.mimeType = {
 *     audio: 'audio/wav',
 *     video: 'video/webm',
 *     gif:   'image/gif'
 * };
 * recorder.startRecording();
 * @see For further information:
 * @see {@link https://github.com/muaz-khan/RecordRTC/tree/master/MRecordRTC|MRecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @requires {@link RecordRTC}
 */

function MRecordRTC(mediaStream) {

    /**
     * This method attaches MediaStream object to {@link MRecordRTC}.
     * @param {MediaStream} mediaStream - A MediaStream object, either fetched using getUserMedia API, or generated using captureStreamUntilEnded or WebAudio API.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.addStream(MediaStream);
     */
    this.addStream = function(_mediaStream) {
        if (_mediaStream) {
            mediaStream = _mediaStream;
        }
    };

    /**
     * This property can be used to set the recording type e.g. audio, or video, or gif, or canvas.
     * @property {object} mediaType - {audio: true, video: true, gif: true}
     * @memberof MRecordRTC
     * @example
     * var recorder = new MRecordRTC();
     * recorder.mediaType = {
     *     audio: true, // TRUE or StereoAudioRecorder or MediaStreamRecorder
     *     video: true, // TRUE or WhammyRecorder or MediaStreamRecorder
     *     gif  : true  // TRUE or GifRecorder
     * };
     */
    this.mediaType = {
        audio: true,
        video: true
    };

    /**
     * This method starts recording.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.startRecording();
     */
    this.startRecording = function() {
        var mediaType = this.mediaType;
        var recorderType;
        var mimeType = this.mimeType || {
            audio: null,
            video: null,
            gif: null
        };

        if (typeof mediaType.audio !== 'function' && isMediaRecorderCompatible() && mediaStream.getAudioTracks && !mediaStream.getAudioTracks().length) {
            mediaType.audio = false;
        }

        if (typeof mediaType.video !== 'function' && isMediaRecorderCompatible() && mediaStream.getVideoTracks && !mediaStream.getVideoTracks().length) {
            mediaType.video = false;
        }

        if (typeof mediaType.gif !== 'function' && isMediaRecorderCompatible() && mediaStream.getVideoTracks && !mediaStream.getVideoTracks().length) {
            mediaType.gif = false;
        }

        if (!mediaType.audio && !mediaType.video && !mediaType.gif) {
            throw 'MediaStream must have either audio or video tracks.';
        }

        if (!!mediaType.audio) {
            recorderType = null;
            if (typeof mediaType.audio === 'function') {
                recorderType = mediaType.audio;
            }

            this.audioRecorder = new RecordRTC(mediaStream, {
                type: 'audio',
                bufferSize: this.bufferSize,
                sampleRate: this.sampleRate,
                numberOfAudioChannels: this.numberOfAudioChannels || 2,
                disableLogs: this.disableLogs,
                recorderType: recorderType,
                mimeType: mimeType.audio,
                timeSlice: this.timeSlice,
                onTimeStamp: this.onTimeStamp
            });

            if (!mediaType.video) {
                this.audioRecorder.startRecording();
            }
        }

        if (!!mediaType.video) {
            recorderType = null;
            if (typeof mediaType.video === 'function') {
                recorderType = mediaType.video;
            }

            var newStream = mediaStream;

            if (isMediaRecorderCompatible() && !!mediaType.audio && typeof mediaType.audio === 'function') {
                var videoTrack = mediaStream.getVideoTracks()[0];

                if (!!navigator.mozGetUserMedia) {
                    newStream = new MediaStream();
                    newStream.addTrack(videoTrack);

                    if (recorderType && recorderType === WhammyRecorder) {
                        // Firefox does NOT support webp-encoding yet
                        recorderType = MediaStreamRecorder;
                    }
                } else {
                    newStream = new MediaStream([videoTrack]);
                }
            }

            this.videoRecorder = new RecordRTC(newStream, {
                type: 'video',
                video: this.video,
                canvas: this.canvas,
                frameInterval: this.frameInterval || 10,
                disableLogs: this.disableLogs,
                recorderType: recorderType,
                mimeType: mimeType.video,
                timeSlice: this.timeSlice,
                onTimeStamp: this.onTimeStamp
            });

            if (!mediaType.audio) {
                this.videoRecorder.startRecording();
            }
        }

        if (!!mediaType.audio && !!mediaType.video) {
            var self = this;

            // this line prevents StereoAudioRecorder
            // todo: fix it
            if (isMediaRecorderCompatible() /* && !this.audioRecorder */ ) {
                self.audioRecorder = null;
                self.videoRecorder.startRecording();
            } else {
                self.videoRecorder.initRecorder(function() {
                    self.audioRecorder.initRecorder(function() {
                        // Both recorders are ready to record things accurately
                        self.videoRecorder.startRecording();
                        self.audioRecorder.startRecording();
                    });
                });
            }
        }

        if (!!mediaType.gif) {
            recorderType = null;
            if (typeof mediaType.gif === 'function') {
                recorderType = mediaType.gif;
            }
            this.gifRecorder = new RecordRTC(mediaStream, {
                type: 'gif',
                frameRate: this.frameRate || 200,
                quality: this.quality || 10,
                disableLogs: this.disableLogs,
                recorderType: recorderType,
                mimeType: mimeType.gif
            });
            this.gifRecorder.startRecording();
        }
    };

    /**
     * This method stops recording.
     * @param {function} callback - Callback function is invoked when all encoders finished their jobs.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.stopRecording(function(recording){
     *     var audioBlob = recording.audio;
     *     var videoBlob = recording.video;
     *     var gifBlob   = recording.gif;
     * });
     */
    this.stopRecording = function(callback) {
        callback = callback || function() {};

        if (this.audioRecorder) {
            this.audioRecorder.stopRecording(function(blobURL) {
                callback(blobURL, 'audio');
            });
        }

        if (this.videoRecorder) {
            this.videoRecorder.stopRecording(function(blobURL) {
                callback(blobURL, 'video');
            });
        }

        if (this.gifRecorder) {
            this.gifRecorder.stopRecording(function(blobURL) {
                callback(blobURL, 'gif');
            });
        }
    };

    /**
     * This method pauses recording.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.pauseRecording();
     */
    this.pauseRecording = function() {
        if (this.audioRecorder) {
            this.audioRecorder.pauseRecording();
        }

        if (this.videoRecorder) {
            this.videoRecorder.pauseRecording();
        }

        if (this.gifRecorder) {
            this.gifRecorder.pauseRecording();
        }
    };

    /**
     * This method resumes recording.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.resumeRecording();
     */
    this.resumeRecording = function() {
        if (this.audioRecorder) {
            this.audioRecorder.resumeRecording();
        }

        if (this.videoRecorder) {
            this.videoRecorder.resumeRecording();
        }

        if (this.gifRecorder) {
            this.gifRecorder.resumeRecording();
        }
    };

    /**
     * This method can be used to manually get all recorded blobs.
     * @param {function} callback - All recorded blobs are passed back to the "callback" function.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.getBlob(function(recording){
     *     var audioBlob = recording.audio;
     *     var videoBlob = recording.video;
     *     var gifBlob   = recording.gif;
     * });
     * // or
     * var audioBlob = recorder.getBlob().audio;
     * var videoBlob = recorder.getBlob().video;
     */
    this.getBlob = function(callback) {
        var output = {};

        if (this.audioRecorder) {
            output.audio = this.audioRecorder.getBlob();
        }

        if (this.videoRecorder) {
            output.video = this.videoRecorder.getBlob();
        }

        if (this.gifRecorder) {
            output.gif = this.gifRecorder.getBlob();
        }

        if (callback) {
            callback(output);
        }

        return output;
    };

    /**
     * Destroy all recorder instances.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.destroy();
     */
    this.destroy = function() {
        if (this.audioRecorder) {
            this.audioRecorder.destroy();
            this.audioRecorder = null;
        }

        if (this.videoRecorder) {
            this.videoRecorder.destroy();
            this.videoRecorder = null;
        }

        if (this.gifRecorder) {
            this.gifRecorder.destroy();
            this.gifRecorder = null;
        }
    };

    /**
     * This method can be used to manually get all recorded blobs' DataURLs.
     * @param {function} callback - All recorded blobs' DataURLs are passed back to the "callback" function.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.getDataURL(function(recording){
     *     var audioDataURL = recording.audio;
     *     var videoDataURL = recording.video;
     *     var gifDataURL   = recording.gif;
     * });
     */
    this.getDataURL = function(callback) {
        this.getBlob(function(blob) {
            if (blob.audio && blob.video) {
                getDataURL(blob.audio, function(_audioDataURL) {
                    getDataURL(blob.video, function(_videoDataURL) {
                        callback({
                            audio: _audioDataURL,
                            video: _videoDataURL
                        });
                    });
                });
            } else if (blob.audio) {
                getDataURL(blob.audio, function(_audioDataURL) {
                    callback({
                        audio: _audioDataURL
                    });
                });
            } else if (blob.video) {
                getDataURL(blob.video, function(_videoDataURL) {
                    callback({
                        video: _videoDataURL
                    });
                });
            }
        });

        function getDataURL(blob, callback00) {
            if (typeof Worker !== 'undefined') {
                var webWorker = processInWebWorker(function readFile(_blob) {
                    postMessage(new FileReaderSync().readAsDataURL(_blob));
                });

                webWorker.onmessage = function(event) {
                    callback00(event.data);
                };

                webWorker.postMessage(blob);
            } else {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = function(event) {
                    callback00(event.target.result);
                };
            }
        }

        function processInWebWorker(_function) {
            var blob = URL.createObjectURL(new Blob([_function.toString(),
                'this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'
            ], {
                type: 'application/javascript'
            }));

            var worker = new Worker(blob);
            var url;
            if (typeof URL !== 'undefined') {
                url = URL;
            } else if (typeof webkitURL !== 'undefined') {
                url = webkitURL;
            } else {
                throw 'Neither URL nor webkitURL detected.';
            }
            url.revokeObjectURL(blob);
            return worker;
        }
    };

    /**
     * This method can be used to ask {@link MRecordRTC} to write all recorded blobs into IndexedDB storage.
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.writeToDisk();
     */
    this.writeToDisk = function() {
        RecordRTC.writeToDisk({
            audio: this.audioRecorder,
            video: this.videoRecorder,
            gif: this.gifRecorder
        });
    };

    /**
     * This method can be used to invoke a save-as dialog for all recorded blobs.
     * @param {object} args - {audio: 'audio-name', video: 'video-name', gif: 'gif-name'}
     * @method
     * @memberof MRecordRTC
     * @example
     * recorder.save({
     *     audio: 'audio-file-name',
     *     video: 'video-file-name',
     *     gif  : 'gif-file-name'
     * });
     */
    this.save = function(args) {
        args = args || {
            audio: true,
            video: true,
            gif: true
        };

        if (!!args.audio && this.audioRecorder) {
            this.audioRecorder.save(typeof args.audio === 'string' ? args.audio : '');
        }

        if (!!args.video && this.videoRecorder) {
            this.videoRecorder.save(typeof args.video === 'string' ? args.video : '');
        }
        if (!!args.gif && this.gifRecorder) {
            this.gifRecorder.save(typeof args.gif === 'string' ? args.gif : '');
        }
    };
}

/**
 * This method can be used to get all recorded blobs from IndexedDB storage.
 * @param {string} type - 'all' or 'audio' or 'video' or 'gif'
 * @param {function} callback - Callback function to get all stored blobs.
 * @method
 * @memberof MRecordRTC
 * @example
 * MRecordRTC.getFromDisk('all', function(dataURL, type){
 *     if(type === 'audio') { }
 *     if(type === 'video') { }
 *     if(type === 'gif')   { }
 * });
 */
MRecordRTC.getFromDisk = RecordRTC.getFromDisk;

/**
 * This method can be used to store recorded blobs into IndexedDB storage.
 * @param {object} options - {audio: Blob, video: Blob, gif: Blob}
 * @method
 * @memberof MRecordRTC
 * @example
 * MRecordRTC.writeToDisk({
 *     audio: audioBlob,
 *     video: videoBlob,
 *     gif  : gifBlob
 * });
 */
MRecordRTC.writeToDisk = RecordRTC.writeToDisk;

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.MRecordRTC = MRecordRTC;
}

var browserFakeUserAgent = 'Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45';

(function(that) {
    if (!that) {
        return;
    }

    if (typeof window !== 'undefined') {
        return;
    }

    if (typeof global === 'undefined') {
        return;
    }

    global.navigator = {
        userAgent: browserFakeUserAgent,
        getUserMedia: function() {}
    };

    if (!global.console) {
        global.console = {};
    }

    if (typeof global.console.log === 'undefined' || typeof global.console.error === 'undefined') {
        global.console.error = global.console.log = global.console.log || function() {
            console.log(arguments);
        };
    }

    if (typeof document === 'undefined') {
        /*global document:true */
        that.document = {};

        document.createElement = document.captureStream = document.mozCaptureStream = function() {
            var obj = {
                getContext: function() {
                    return obj;
                },
                play: function() {},
                pause: function() {},
                drawImage: function() {},
                toDataURL: function() {
                    return '';
                }
            };
            return obj;
        };

        that.HTMLVideoElement = function() {};
    }

    if (typeof location === 'undefined') {
        /*global location:true */
        that.location = {
            protocol: 'file:',
            href: '',
            hash: ''
        };
    }

    if (typeof screen === 'undefined') {
        /*global screen:true */
        that.screen = {
            width: 0,
            height: 0
        };
    }

    if (typeof URL === 'undefined') {
        /*global screen:true */
        that.URL = {
            createObjectURL: function() {
                return '';
            },
            revokeObjectURL: function() {
                return '';
            }
        };
    }

    /*global window:true */
    that.window = global;
})(typeof global !== 'undefined' ? global : null);

// _____________________________
// Cross-Browser-Declarations.js

// animation-frame used in WebM recording

/*jshint -W079 */
var requestAnimationFrame = window.requestAnimationFrame;
if (typeof requestAnimationFrame === 'undefined') {
    if (typeof webkitRequestAnimationFrame !== 'undefined') {
        /*global requestAnimationFrame:true */
        requestAnimationFrame = webkitRequestAnimationFrame;
    } else if (typeof mozRequestAnimationFrame !== 'undefined') {
        /*global requestAnimationFrame:true */
        requestAnimationFrame = mozRequestAnimationFrame;
    } else if (typeof msRequestAnimationFrame !== 'undefined') {
        /*global requestAnimationFrame:true */
        requestAnimationFrame = msRequestAnimationFrame;
    } else if (typeof requestAnimationFrame === 'undefined') {
        // via: https://gist.github.com/paulirish/1579671
        var lastTime = 0;

        /*global requestAnimationFrame:true */
        requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
}

/*jshint -W079 */
var cancelAnimationFrame = window.cancelAnimationFrame;
if (typeof cancelAnimationFrame === 'undefined') {
    if (typeof webkitCancelAnimationFrame !== 'undefined') {
        /*global cancelAnimationFrame:true */
        cancelAnimationFrame = webkitCancelAnimationFrame;
    } else if (typeof mozCancelAnimationFrame !== 'undefined') {
        /*global cancelAnimationFrame:true */
        cancelAnimationFrame = mozCancelAnimationFrame;
    } else if (typeof msCancelAnimationFrame !== 'undefined') {
        /*global cancelAnimationFrame:true */
        cancelAnimationFrame = msCancelAnimationFrame;
    } else if (typeof cancelAnimationFrame === 'undefined') {
        /*global cancelAnimationFrame:true */
        cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}

// WebAudio API representer
var AudioContext = window.AudioContext;

if (typeof AudioContext === 'undefined') {
    if (typeof webkitAudioContext !== 'undefined') {
        /*global AudioContext:true */
        AudioContext = webkitAudioContext;
    }

    if (typeof mozAudioContext !== 'undefined') {
        /*global AudioContext:true */
        AudioContext = mozAudioContext;
    }
}

/*jshint -W079 */
var URL = window.URL;

if (typeof URL === 'undefined' && typeof webkitURL !== 'undefined') {
    /*global URL:true */
    URL = webkitURL;
}

if (typeof navigator !== 'undefined' && typeof navigator.getUserMedia === 'undefined') { // maybe window.navigator?
    if (typeof navigator.webkitGetUserMedia !== 'undefined') {
        navigator.getUserMedia = navigator.webkitGetUserMedia;
    }

    if (typeof navigator.mozGetUserMedia !== 'undefined') {
        navigator.getUserMedia = navigator.mozGetUserMedia;
    }
}

var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveBlob || !!navigator.msSaveOrOpenBlob);
var isOpera = !!window.opera || navigator.userAgent.indexOf('OPR/') !== -1;
var isSafari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
var isChrome = (!isOpera && !isEdge && !!navigator.webkitGetUserMedia) || isElectron() || isSafari;

var MediaStream = window.MediaStream;

if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
    MediaStream = webkitMediaStream;
}

/*global MediaStream:true */
if (typeof MediaStream !== 'undefined') {
    if (!('getVideoTracks' in MediaStream.prototype)) {
        MediaStream.prototype.getVideoTracks = function() {
            if (!this.getTracks) {
                return [];
            }

            var tracks = [];
            this.getTracks().forEach(function(track) {
                if (track.kind.toString().indexOf('video') !== -1) {
                    tracks.push(track);
                }
            });
            return tracks;
        };

        MediaStream.prototype.getAudioTracks = function() {
            if (!this.getTracks) {
                return [];
            }

            var tracks = [];
            this.getTracks().forEach(function(track) {
                if (track.kind.toString().indexOf('audio') !== -1) {
                    tracks.push(track);
                }
            });
            return tracks;
        };
    }

    // override "stop" method for all browsers
    if (typeof MediaStream.prototype.stop === 'undefined') {
        MediaStream.prototype.stop = function() {
            this.getTracks().forEach(function(track) {
                track.stop();
            });
        };
    }
}

// below function via: http://goo.gl/B3ae8c
/**
 * @param {number} bytes - Pass bytes and get formafted string.
 * @returns {string} - formafted string
 * @example
 * bytesToSize(1024*1024*5) === '5 GB'
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */
function bytesToSize(bytes) {
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
        return '0 Bytes';
    }
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

/**
 * @param {Blob} file - File or Blob object. This parameter is required.
 * @param {string} fileName - Optional file name e.g. "Recorded-Video.webm"
 * @example
 * invokeSaveAsDialog(blob or file, [optional] fileName);
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */
function invokeSaveAsDialog(file, fileName) {
    if (!file) {
        throw 'Blob object is required.';
    }

    if (!file.type) {
        try {
            file.type = 'video/webm';
        } catch (e) {}
    }

    var fileExtension = (file.type || 'video/webm').split('/')[1];

    if (fileName && fileName.indexOf('.') !== -1) {
        var splitted = fileName.split('.');
        fileName = splitted[0];
        fileExtension = splitted[1];
    }

    var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;

    if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
        return navigator.msSaveOrOpenBlob(file, fileFullName);
    } else if (typeof navigator.msSaveBlob !== 'undefined') {
        return navigator.msSaveBlob(file, fileFullName);
    }

    var hyperlink = document.createElement('a');
    hyperlink.href = URL.createObjectURL(file);
    hyperlink.download = fileFullName;

    hyperlink.style = 'display:none;opacity:0;color:transparent;';
    (document.body || document.documentElement).appendChild(hyperlink);

    if (typeof hyperlink.click === 'function') {
        hyperlink.click();
    } else {
        hyperlink.target = '_blank';
        hyperlink.dispatchEvent(new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        }));
    }

    URL.revokeObjectURL(hyperlink.href);
}

/**
 * from: https://github.com/cheton/is-electron/blob/master/index.js
 **/
function isElectron() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}

function setSrcObject(stream, element, ignoreCreateObjectURL) {
    if ('createObjectURL' in URL && !ignoreCreateObjectURL) {
        try {
            element.src = URL.createObjectURL(stream);
        } catch (e) {
            setSrcObject(stream, element, true);
            return;
        }
    } else if ('srcObject' in element) {
        element.srcObject = stream;
    } else if ('mozSrcObject' in element) {
        element.mozSrcObject = stream;
    } else {
        alert('createObjectURL/srcObject both are not supported.');
    }
}

// __________ (used to handle stuff like http://goo.gl/xmE5eg) issue #129
// Storage.js

/**
 * Storage is a standalone object used by {@link RecordRTC} to store reusable objects e.g. "new AudioContext".
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @example
 * Storage.AudioContext === webkitAudioContext
 * @property {webkitAudioContext} AudioContext - Keeps a reference to AudioContext object.
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */

var Storage = {};

if (typeof AudioContext !== 'undefined') {
    Storage.AudioContext = AudioContext;
} else if (typeof webkitAudioContext !== 'undefined') {
    Storage.AudioContext = webkitAudioContext;
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.Storage = Storage;
}

function isMediaRecorderCompatible() {
    var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    var isChrome = (!!window.chrome && !isOpera) || isElectron();
    var isFirefox = typeof window.InstallTrigger !== 'undefined';

    if (isFirefox) {
        return true;
    }

    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    if (isChrome || isOpera) {
        verOffset = nAgt.indexOf('Chrome');
        fullVersion = nAgt.substring(verOffset + 7);
    }

    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(';')) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }

    if ((ix = fullVersion.indexOf(' ')) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }

    majorVersion = parseInt('' + fullVersion, 10);

    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    return majorVersion >= 49;
}

// ______________________
// MediaStreamRecorder.js

/**
 * MediaStreamRecorder is an abstraction layer for {@link https://w3c.github.io/mediacapture-record/MediaRecorder.html|MediaRecorder API}. It is used by {@link RecordRTC} to record MediaStream(s) in both Chrome and Firefox.
 * @summary Runs top over {@link https://w3c.github.io/mediacapture-record/MediaRecorder.html|MediaRecorder API}.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link https://github.com/muaz-khan|Muaz Khan}
 * @typedef MediaStreamRecorder
 * @class
 * @example
 * var config = {
 *     mimeType: 'video/webm', // vp8, vp9, h264, mkv, opus/vorbis
 *     audioBitsPerSecond : 256 * 8 * 1024,
 *     videoBitsPerSecond : 256 * 8 * 1024,
 *     bitsPerSecond: 256 * 8 * 1024,  // if this is provided, skip above two
 *     checkForInactiveTracks: true,
 *     timeSlice: 1000, // concatenate intervals based blobs
 *     ondataavailable: function() {} // get intervals based blobs
 * }
 * var recorder = new MediaStreamRecorder(mediaStream, config);
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 *
 *     // or
 *     var blob = recorder.blob;
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {disableLogs:true, initCallback: function, mimeType: "video/webm", timeSlice: 1000}
 * @throws Will throw an error if first argument "MediaStream" is missing. Also throws error if "MediaRecorder API" are not supported by the browser.
 */

function MediaStreamRecorder(mediaStream, config) {
    var self = this;

    if (typeof mediaStream === 'undefined') {
        throw 'First argument "MediaStream" is required.';
    }

    if (typeof MediaRecorder === 'undefined') {
        throw 'Your browser does not supports Media Recorder API. Please try other modules e.g. WhammyRecorder or StereoAudioRecorder.';
    }

    config = config || {
        // bitsPerSecond: 256 * 8 * 1024,
        mimeType: 'video/webm'
    };

    if (config.type === 'audio') {
        if (mediaStream.getVideoTracks().length && mediaStream.getAudioTracks().length) {
            var stream;
            if (!!navigator.mozGetUserMedia) {
                stream = new MediaStream();
                stream.addTrack(mediaStream.getAudioTracks()[0]);
            } else {
                // webkitMediaStream
                stream = new MediaStream(mediaStream.getAudioTracks());
            }
            mediaStream = stream;
        }

        if (!config.mimeType || config.mimeType.toString().toLowerCase().indexOf('audio') === -1) {
            config.mimeType = isChrome ? 'audio/webm' : 'audio/ogg';
        }

        if (config.mimeType && config.mimeType.toString().toLowerCase() !== 'audio/ogg' && !!navigator.mozGetUserMedia) {
            // forcing better codecs on Firefox (via #166)
            config.mimeType = 'audio/ogg';
        }
    }

    var arrayOfBlobs = [];

    /**
     * This method returns array of blobs. Use only with "timeSlice". Its useful to preview recording anytime, without using the "stop" method.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * var arrayOfBlobs = recorder.getArrayOfBlobs();
     * @returns {Array} Returns array of recorded blobs.
     */
    this.getArrayOfBlobs = function() {
        return arrayOfBlobs;
    };

    /**
     * This method records MediaStream.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.record();
     */
    this.record = function() {
        // set defaults
        self.blob = null;
        self.clearRecordedData();
        self.timestamps = [];
        allStates = [];
        arrayOfBlobs = [];

        var recorderHints = config;

        if (!config.disableLogs) {
            console.log('Passing following config over MediaRecorder API.', recorderHints);
        }

        if (mediaRecorder) {
            // mandatory to make sure Firefox doesn't fails to record streams 3-4 times without reloading the page.
            mediaRecorder = null;
        }

        if (isChrome && !isMediaRecorderCompatible()) {
            // to support video-only recording on stable
            recorderHints = 'video/vp8';
        }

        if (typeof MediaRecorder.isTypeSupported === 'function' && recorderHints.mimeType) {
            if (!MediaRecorder.isTypeSupported(recorderHints.mimeType)) {
                if (!config.disableLogs) {
                    console.warn('MediaRecorder API seems unable to record mimeType:', recorderHints.mimeType);
                }

                recorderHints.mimeType = config.type === 'audio' ? 'audio/webm' : 'video/webm';
            }
        }

        // using MediaRecorder API here
        try {
            mediaRecorder = new MediaRecorder(mediaStream, recorderHints);

            // reset
            config.mimeType = recorderHints.mimeType;
        } catch (e) {
            // chrome-based fallback
            mediaRecorder = new MediaRecorder(mediaStream);
        }

        // old hack?
        if (recorderHints.mimeType && !MediaRecorder.isTypeSupported && 'canRecordMimeType' in mediaRecorder && mediaRecorder.canRecordMimeType(recorderHints.mimeType) === false) {
            if (!config.disableLogs) {
                console.warn('MediaRecorder API seems unable to record mimeType:', recorderHints.mimeType);
            }
        }

        // Dispatching OnDataAvailable Handler
        mediaRecorder.ondataavailable = function(e) {
            if (e.data) {
                allStates.push('ondataavailable: ' + bytesToSize(e.data.size));
            }

            if (typeof config.timeSlice === 'number') {
                if (e.data && e.data.size && e.data.size > 100) {
                    arrayOfBlobs.push(e.data);
                    updateTimeStamp();

                    if (typeof config.ondataavailable === 'function') {
                        // intervals based blobs
                        var blob = config.getNativeBlob ? e.data : new Blob([e.data], {
                            type: getMimeType(recorderHints)
                        });
                        config.ondataavailable(blob);
                    }
                }
                return;
            }

            if (!e.data || !e.data.size || e.data.size < 100 || self.blob) {
                // make sure that stopRecording always getting fired
                // even if there is invalid data
                if (self.recordingCallback) {
                    self.recordingCallback(new Blob([], {
                        type: getMimeType(recorderHints)
                    }));
                    self.recordingCallback = null;
                }
                return;
            }

            self.blob = config.getNativeBlob ? e.data : new Blob([e.data], {
                type: getMimeType(recorderHints)
            });

            if (self.recordingCallback) {
                self.recordingCallback(self.blob);
                self.recordingCallback = null;
            }
        };

        mediaRecorder.onstart = function() {
            allStates.push('started');
        };

        mediaRecorder.onpause = function() {
            allStates.push('paused');
        };

        mediaRecorder.onresume = function() {
            allStates.push('resumed');
        };

        mediaRecorder.onstop = function() {
            allStates.push('stopped');
        };

        mediaRecorder.onerror = function(error) {
            if (!error) {
                return;
            }

            if (!error.name) {
                error.name = 'UnknownError';
            }

            allStates.push('error: ' + error);

            if (!config.disableLogs) {
                // via: https://w3c.github.io/mediacapture-record/MediaRecorder.html#exception-summary
                if (error.name.toString().toLowerCase().indexOf('invalidstate') !== -1) {
                    console.error('The MediaRecorder is not in a state in which the proposed operation is allowed to be executed.', error);
                } else if (error.name.toString().toLowerCase().indexOf('notsupported') !== -1) {
                    console.error('MIME type (', recorderHints.mimeType, ') is not supported.', error);
                } else if (error.name.toString().toLowerCase().indexOf('security') !== -1) {
                    console.error('MediaRecorder security error', error);
                }

                // older code below
                else if (error.name === 'OutOfMemory') {
                    console.error('The UA has exhaused the available memory. User agents SHOULD provide as much additional information as possible in the message attribute.', error);
                } else if (error.name === 'IllegalStreamModification') {
                    console.error('A modification to the stream has occurred that makes it impossible to continue recording. An example would be the addition of a Track while recording is occurring. User agents SHOULD provide as much additional information as possible in the message attribute.', error);
                } else if (error.name === 'OtherRecordingError') {
                    console.error('Used for an fatal error other than those listed above. User agents SHOULD provide as much additional information as possible in the message attribute.', error);
                } else if (error.name === 'GenericError') {
                    console.error('The UA cannot provide the codec or recording option that has been requested.', error);
                } else {
                    console.error('MediaRecorder Error', error);
                }
            }

            (function(looper) {
                if (!self.manuallyStopped && mediaRecorder && mediaRecorder.state === 'inactive') {
                    delete config.timeslice;

                    // 10 minutes, enough?
                    mediaRecorder.start(10 * 60 * 1000);
                    return;
                }

                setTimeout(looper, 1000);
            })();

            if (mediaRecorder.state !== 'inactive' && mediaRecorder.state !== 'stopped') {
                mediaRecorder.stop();
            }
        };

        if (typeof config.timeSlice === 'number') {
            updateTimeStamp();
            mediaRecorder.start(config.timeSlice);
        } else {
            // default is 60 minutes; enough?
            // use config => {timeSlice: 1000} otherwise

            mediaRecorder.start(3.6e+6);
        }

        if (config.initCallback) {
            config.initCallback(); // old code
        }
    };

    /**
     * @property {Array} timestamps - Array of time stamps
     * @memberof MediaStreamRecorder
     * @example
     * console.log(recorder.timestamps);
     */
    this.timestamps = [];

    function updateTimeStamp() {
        self.timestamps.push(new Date().getTime());

        if (typeof config.onTimeStamp === 'function') {
            config.onTimeStamp(self.timestamps[self.timestamps.length - 1], self.timestamps);
        }
    }

    function getMimeType(secondObject) {
        if (mediaRecorder && mediaRecorder.mimeType) {
            return mediaRecorder.mimeType;
        }

        return secondObject.mimeType || 'video/webm';
    }

    /**
     * This method stops recording MediaStream.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function(callback) {
        callback = callback || function() {};

        self.manuallyStopped = true; // used inside the mediaRecorder.onerror

        if (!mediaRecorder) {
            return;
        }

        this.recordingCallback = callback;

        if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
        }

        if (typeof config.timeSlice === 'number') {
            setTimeout(function() {
                self.blob = new Blob(arrayOfBlobs, {
                    type: getMimeType(config)
                });

                self.recordingCallback(self.blob);
            }, 100);
        }
    };

    /**
     * This method pauses the recording process.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function() {
        if (!mediaRecorder) {
            return;
        }

        if (mediaRecorder.state === 'recording') {
            mediaRecorder.pause();
        }
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function() {
        if (!mediaRecorder) {
            return;
        }

        if (mediaRecorder.state === 'paused') {
            mediaRecorder.resume();
        }
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            self.stop(clearRecordedDataCB);
        }

        clearRecordedDataCB();
    };

    function clearRecordedDataCB() {
        arrayOfBlobs = [];
        mediaRecorder = null;
        self.timestamps = [];
    }

    // Reference to "MediaRecorder" object
    var mediaRecorder;

    /**
     * Access to native MediaRecorder API
     * @method
     * @memberof MediaStreamRecorder
     * @instance
     * @example
     * var internal = recorder.getInternalRecorder();
     * internal.ondataavailable = function() {}; // override
     * internal.stream, internal.onpause, internal.onstop, etc.
     * @returns {Object} Returns internal recording object.
     */
    this.getInternalRecorder = function() {
        return mediaRecorder;
    };

    function isMediaStreamActive() {
        if ('active' in mediaStream) {
            if (!mediaStream.active) {
                return false;
            }
        } else if ('ended' in mediaStream) { // old hack
            if (mediaStream.ended) {
                return false;
            }
        }
        return true;
    }

    /**
     * @property {Blob} blob - Recorded data as "Blob" object.
     * @memberof MediaStreamRecorder
     * @example
     * recorder.stop(function() {
     *     var blob = recorder.blob;
     * });
     */
    this.blob = null;


    /**
     * Get MediaRecorder readonly state.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * var state = recorder.getState();
     * @returns {String} Returns recording state.
     */
    this.getState = function() {
        if (!mediaRecorder) {
            return 'inactive';
        }

        return mediaRecorder.state || 'inactive';
    };

    // list of all recording states
    var allStates = [];

    /**
     * Get MediaRecorder all recording states.
     * @method
     * @memberof MediaStreamRecorder
     * @example
     * var state = recorder.getAllStates();
     * @returns {Array} Returns all recording states
     */
    this.getAllStates = function() {
        return allStates;
    };

    // if any Track within the MediaStream is muted or not enabled at any time, 
    // the browser will only record black frames 
    // or silence since that is the content produced by the Track
    // so we need to stopRecording as soon as any single track ends.
    if (typeof config.checkForInactiveTracks === 'undefined') {
        config.checkForInactiveTracks = false; // disable to minimize CPU usage
    }

    var self = this;

    // this method checks if media stream is stopped
    // or if any track is ended.
    (function looper() {
        if (!mediaRecorder || config.checkForInactiveTracks === false) {
            return;
        }

        if (isMediaStreamActive() === false) {
            if (!config.disableLogs) {
                console.log('MediaStream seems stopped.');
            }
            self.stop();
            return;
        }

        setTimeout(looper, 1000); // check every second
    })();

    // for debugging
    this.name = 'MediaStreamRecorder';
    this.toString = function() {
        return this.name;
    };
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.MediaStreamRecorder = MediaStreamRecorder;
}

// source code from: http://typedarray.org/wp-content/projects/WebAudioRecorder/script.js
// https://github.com/mattdiamond/Recorderjs#license-mit
// ______________________
// StereoAudioRecorder.js

/**
 * StereoAudioRecorder is a standalone class used by {@link RecordRTC} to bring "stereo" audio-recording in chrome.
 * @summary JavaScript standalone object for stereo audio recording.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef StereoAudioRecorder
 * @class
 * @example
 * var recorder = new StereoAudioRecorder(MediaStream, {
 *     sampleRate: 44100,
 *     bufferSize: 4096
 * });
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {sampleRate: 44100, bufferSize: 4096, numberOfAudioChannels: 1, etc.}
 */

function StereoAudioRecorder(mediaStream, config) {
    if (!mediaStream.getAudioTracks().length) {
        throw 'Your stream has no audio tracks.';
    }

    config = config || {};

    var self = this;

    // variables
    var leftchannel = [];
    var rightchannel = [];
    var recording = false;
    var recordingLength = 0;
    var jsAudioNode;

    var numberOfAudioChannels = 2;

    /**
     * Set sample rates such as 8K or 16K. Reference: http://stackoverflow.com/a/28977136/552182
     * @property {number} desiredSampRate - Desired Bits per sample * 1000
     * @memberof StereoAudioRecorder
     * @instance
     * @example
     * var recorder = StereoAudioRecorder(mediaStream, {
     *   desiredSampRate: 16 * 1000 // bits-per-sample * 1000
     * });
     */
    var desiredSampRate = config.desiredSampRate;

    // backward compatibility
    if (config.leftChannel === true) {
        numberOfAudioChannels = 1;
    }

    if (config.numberOfAudioChannels === 1) {
        numberOfAudioChannels = 1;
    }

    if (!numberOfAudioChannels || numberOfAudioChannels < 1) {
        numberOfAudioChannels = 2;
    }

    if (!config.disableLogs) {
        console.log('StereoAudioRecorder is set to record number of channels: ', numberOfAudioChannels);
    }

    // if any Track within the MediaStream is muted or not enabled at any time, 
    // the browser will only record black frames 
    // or silence since that is the content produced by the Track
    // so we need to stopRecording as soon as any single track ends.
    if (typeof config.checkForInactiveTracks === 'undefined') {
        config.checkForInactiveTracks = true;
    }

    function isMediaStreamActive() {
        if (config.checkForInactiveTracks === false) {
            // always return "true"
            return true;
        }

        if ('active' in mediaStream) {
            if (!mediaStream.active) {
                return false;
            }
        } else if ('ended' in mediaStream) { // old hack
            if (mediaStream.ended) {
                return false;
            }
        }
        return true;
    }

    /**
     * This method records MediaStream.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.record();
     */
    this.record = function() {
        if (isMediaStreamActive() === false) {
            throw 'Please make sure MediaStream is active.';
        }

        resetVariables();

        isAudioProcessStarted = isPaused = false;
        recording = true;

        if (typeof config.timeSlice !== 'undefined') {
            looper();
        }
    };

    function mergeLeftRightBuffers(config, callback) {
        function mergeAudioBuffers(config, cb) {
            var numberOfAudioChannels = config.numberOfAudioChannels;

            // todo: "slice(0)" --- is it causes loop? Should be removed?
            var leftBuffers = config.leftBuffers.slice(0);
            var rightBuffers = config.rightBuffers.slice(0);
            var sampleRate = config.sampleRate;
            var internalInterleavedLength = config.internalInterleavedLength;
            var desiredSampRate = config.desiredSampRate;

            if (numberOfAudioChannels === 2) {
                leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
                rightBuffers = mergeBuffers(rightBuffers, internalInterleavedLength);

                if (desiredSampRate) {
                    leftBuffers = interpolateArray(leftBuffers, desiredSampRate, sampleRate);
                    rightBuffers = interpolateArray(rightBuffers, desiredSampRate, sampleRate);
                }
            }

            if (numberOfAudioChannels === 1) {
                leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);

                if (desiredSampRate) {
                    leftBuffers = interpolateArray(leftBuffers, desiredSampRate, sampleRate);
                }
            }

            // set sample rate as desired sample rate
            if (desiredSampRate) {
                sampleRate = desiredSampRate;
            }

            // for changing the sampling rate, reference:
            // http://stackoverflow.com/a/28977136/552182
            function interpolateArray(data, newSampleRate, oldSampleRate) {
                var fitCount = Math.round(data.length * (newSampleRate / oldSampleRate));
                var newData = [];
                var springFactor = Number((data.length - 1) / (fitCount - 1));
                newData[0] = data[0];
                for (var i = 1; i < fitCount - 1; i++) {
                    var tmp = i * springFactor;
                    var before = Number(Math.floor(tmp)).toFixed();
                    var after = Number(Math.ceil(tmp)).toFixed();
                    var atPoint = tmp - before;
                    newData[i] = linearInterpolate(data[before], data[after], atPoint);
                }
                newData[fitCount - 1] = data[data.length - 1];
                return newData;
            }

            function linearInterpolate(before, after, atPoint) {
                return before + (after - before) * atPoint;
            }

            function mergeBuffers(channelBuffer, rLength) {
                var result = new Float64Array(rLength);
                var offset = 0;
                var lng = channelBuffer.length;

                for (var i = 0; i < lng; i++) {
                    var buffer = channelBuffer[i];
                    result.set(buffer, offset);
                    offset += buffer.length;
                }

                return result;
            }

            function interleave(leftChannel, rightChannel) {
                var length = leftChannel.length + rightChannel.length;

                var result = new Float64Array(length);

                var inputIndex = 0;

                for (var index = 0; index < length;) {
                    result[index++] = leftChannel[inputIndex];
                    result[index++] = rightChannel[inputIndex];
                    inputIndex++;
                }
                return result;
            }

            function writeUTFBytes(view, offset, string) {
                var lng = string.length;
                for (var i = 0; i < lng; i++) {
                    view.setUint8(offset + i, string.charCodeAt(i));
                }
            }

            // interleave both channels together
            var interleaved;

            if (numberOfAudioChannels === 2) {
                interleaved = interleave(leftBuffers, rightBuffers);
            }

            if (numberOfAudioChannels === 1) {
                interleaved = leftBuffers;
            }

            var interleavedLength = interleaved.length;

            // create wav file
            var resultingBufferLength = 44 + interleavedLength * 2;

            var buffer = new ArrayBuffer(resultingBufferLength);

            var view = new DataView(buffer);

            // RIFF chunk descriptor/identifier 
            writeUTFBytes(view, 0, 'RIFF');

            // RIFF chunk length
            view.setUint32(4, 44 + interleavedLength * 2, true);

            // RIFF type 
            writeUTFBytes(view, 8, 'WAVE');

            // format chunk identifier 
            // FMT sub-chunk
            writeUTFBytes(view, 12, 'fmt ');

            // format chunk length 
            view.setUint32(16, 16, true);

            // sample format (raw)
            view.setUint16(20, 1, true);

            // stereo (2 channels)
            view.setUint16(22, numberOfAudioChannels, true);

            // sample rate 
            view.setUint32(24, sampleRate, true);

            // byte rate (sample rate * block align)
            view.setUint32(28, sampleRate * 2, true);

            // block align (channel count * bytes per sample) 
            view.setUint16(32, numberOfAudioChannels * 2, true);

            // bits per sample 
            view.setUint16(34, 16, true);

            // data sub-chunk
            // data chunk identifier 
            writeUTFBytes(view, 36, 'data');

            // data chunk length 
            view.setUint32(40, interleavedLength * 2, true);

            // write the PCM samples
            var lng = interleavedLength;
            var index = 44;
            var volume = 1;
            for (var i = 0; i < lng; i++) {
                view.setInt16(index, interleaved[i] * (0x7FFF * volume), true);
                index += 2;
            }

            if (cb) {
                return cb({
                    buffer: buffer,
                    view: view
                });
            }

            postMessage({
                buffer: buffer,
                view: view
            });
        }

        if (isEdge || isOpera || isSafari || config.noWorker) {
            mergeAudioBuffers(config, function(data) {
                callback(data.buffer, data.view);
            });
            return;
        }


        var webWorker = processInWebWorker(mergeAudioBuffers);

        webWorker.onmessage = function(event) {
            callback(event.data.buffer, event.data.view);

            // release memory
            URL.revokeObjectURL(webWorker.workerURL);

            // kill webworker (or Chrome will kill your page after ~25 calls)
            webWorker.terminate();
        };

        webWorker.postMessage(config);
    }

    function processInWebWorker(_function) {
        var workerURL = URL.createObjectURL(new Blob([_function.toString(),
            ';this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'
        ], {
            type: 'application/javascript'
        }));

        var worker = new Worker(workerURL);
        worker.workerURL = workerURL;
        return worker;
    }

    /**
     * This method stops recording MediaStream.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function(callback) {
        callback = callback || function() {};

        // stop recording
        recording = false;

        mergeLeftRightBuffers({
            desiredSampRate: desiredSampRate,
            sampleRate: sampleRate,
            numberOfAudioChannels: numberOfAudioChannels,
            internalInterleavedLength: recordingLength,
            leftBuffers: leftchannel,
            rightBuffers: numberOfAudioChannels === 1 ? [] : rightchannel
        }, function(buffer, view) {
            /**
             * @property {Blob} blob - The recorded blob object.
             * @memberof StereoAudioRecorder
             * @example
             * recorder.stop(function(){
             *     var blob = recorder.blob;
             * });
             */
            self.blob = new Blob([view], {
                type: 'audio/wav'
            });

            /**
             * @property {ArrayBuffer} buffer - The recorded buffer object.
             * @memberof StereoAudioRecorder
             * @example
             * recorder.stop(function(){
             *     var buffer = recorder.buffer;
             * });
             */
            self.buffer = new ArrayBuffer(view.buffer.byteLength);

            /**
             * @property {DataView} view - The recorded data-view object.
             * @memberof StereoAudioRecorder
             * @example
             * recorder.stop(function(){
             *     var view = recorder.view;
             * });
             */
            self.view = view;

            self.sampleRate = desiredSampRate || sampleRate;
            self.bufferSize = bufferSize;

            // recorded audio length
            self.length = recordingLength;

            isAudioProcessStarted = false;

            if (callback) {
                callback(self.blob);
            }
        });
    };

    if (!Storage.AudioContextConstructor) {
        Storage.AudioContextConstructor = new Storage.AudioContext();
    }

    var context = Storage.AudioContextConstructor;

    // creates an audio node from the microphone incoming stream
    var audioInput = context.createMediaStreamSource(mediaStream);

    var legalBufferValues = [0, 256, 512, 1024, 2048, 4096, 8192, 16384];

    /**
     * From the spec: This value controls how frequently the audioprocess event is
     * dispatched and how many sample-frames need to be processed each call.
     * Lower values for buffer size will result in a lower (better) latency.
     * Higher values will be necessary to avoid audio breakup and glitches
     * The size of the buffer (in sample-frames) which needs to
     * be processed each time onprocessaudio is called.
     * Legal values are (256, 512, 1024, 2048, 4096, 8192, 16384).
     * @property {number} bufferSize - Buffer-size for how frequently the audioprocess event is dispatched.
     * @memberof StereoAudioRecorder
     * @example
     * recorder = new StereoAudioRecorder(mediaStream, {
     *     bufferSize: 4096
     * });
     */

    // "0" means, let chrome decide the most accurate buffer-size for current platform.
    var bufferSize = typeof config.bufferSize === 'undefined' ? 4096 : config.bufferSize;

    if (legalBufferValues.indexOf(bufferSize) === -1) {
        if (!config.disableLogs) {
            console.warn('Legal values for buffer-size are ' + JSON.stringify(legalBufferValues, null, '\t'));
        }
    }

    if (context.createJavaScriptNode) {
        jsAudioNode = context.createJavaScriptNode(bufferSize, numberOfAudioChannels, numberOfAudioChannels);
    } else if (context.createScriptProcessor) {
        jsAudioNode = context.createScriptProcessor(bufferSize, numberOfAudioChannels, numberOfAudioChannels);
    } else {
        throw 'WebAudio API has no support on this browser.';
    }

    // connect the stream to the script processor
    audioInput.connect(jsAudioNode);

    if (!config.bufferSize) {
        bufferSize = jsAudioNode.bufferSize; // device buffer-size
    }

    /**
     * The sample rate (in sample-frames per second) at which the
     * AudioContext handles audio. It is assumed that all AudioNodes
     * in the context run at this rate. In making this assumption,
     * sample-rate converters or "varispeed" processors are not supported
     * in real-time processing.
     * The sampleRate parameter describes the sample-rate of the
     * linear PCM audio data in the buffer in sample-frames per second.
     * An implementation must support sample-rates in at least
     * the range 22050 to 96000.
     * @property {number} sampleRate - Buffer-size for how frequently the audioprocess event is dispatched.
     * @memberof StereoAudioRecorder
     * @example
     * recorder = new StereoAudioRecorder(mediaStream, {
     *     sampleRate: 44100
     * });
     */
    var sampleRate = typeof config.sampleRate !== 'undefined' ? config.sampleRate : context.sampleRate || 44100;

    if (sampleRate < 22050 || sampleRate > 96000) {
        // Ref: http://stackoverflow.com/a/26303918/552182
        if (!config.disableLogs) {
            console.warn('sample-rate must be under range 22050 and 96000.');
        }
    }

    if (!config.disableLogs) {
        console.log('sample-rate', sampleRate);
        console.log('buffer-size', bufferSize);

        if (config.desiredSampRate) {
            console.log('Desired sample-rate', config.desiredSampRate);
        }
    }

    var isPaused = false;
    /**
     * This method pauses the recording process.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function() {
        isPaused = true;
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function() {
        if (isMediaStreamActive() === false) {
            throw 'Please make sure MediaStream is active.';
        }

        if (!recording) {
            if (!config.disableLogs) {
                console.log('Seems recording has been restarted.');
            }
            this.record();
            return;
        }

        isPaused = false;
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof StereoAudioRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function() {
        config.checkForInactiveTracks = false;

        if (recording) {
            this.stop(clearRecordedDataCB);
        }

        clearRecordedDataCB();
    };

    function resetVariables() {
        leftchannel = [];
        rightchannel = [];
        recordingLength = 0;
        isAudioProcessStarted = false;
        recording = false;
        isPaused = false;
        context = null;

        self.leftchannel = leftchannel;
        self.rightchannel = rightchannel;
        self.numberOfAudioChannels = numberOfAudioChannels;
        self.desiredSampRate = desiredSampRate;
        self.sampleRate = sampleRate;
        self.recordingLength = recordingLength;

        intervalsBasedBuffers = {
            left: [],
            right: [],
            recordingLength: 0
        };
    }

    function clearRecordedDataCB() {
        if (jsAudioNode) {
            jsAudioNode.onaudioprocess = null;
            jsAudioNode.disconnect();
            jsAudioNode = null;
        }

        if (audioInput) {
            audioInput.disconnect();
            audioInput = null;
        }

        resetVariables();
    }

    // for debugging
    this.name = 'StereoAudioRecorder';
    this.toString = function() {
        return this.name;
    };

    var isAudioProcessStarted = false;

    function onAudioProcessDataAvailable(e) {
        if (isPaused) {
            return;
        }

        if (isMediaStreamActive() === false) {
            if (!config.disableLogs) {
                console.log('MediaStream seems stopped.');
            }
            jsAudioNode.disconnect();
            recording = false;
        }

        if (!recording) {
            if (audioInput) {
                audioInput.disconnect();
                audioInput = null;
            }
            return;
        }

        /**
         * This method is called on "onaudioprocess" event's first invocation.
         * @method {function} onAudioProcessStarted
         * @memberof StereoAudioRecorder
         * @example
         * recorder.onAudioProcessStarted: function() { };
         */
        if (!isAudioProcessStarted) {
            isAudioProcessStarted = true;
            if (config.onAudioProcessStarted) {
                config.onAudioProcessStarted();
            }

            if (config.initCallback) {
                config.initCallback();
            }
        }

        var left = e.inputBuffer.getChannelData(0);

        // we clone the samples
        var chLeft = new Float32Array(left);
        leftchannel.push(chLeft);

        if (numberOfAudioChannels === 2) {
            var right = e.inputBuffer.getChannelData(1);
            var chRight = new Float32Array(right);
            rightchannel.push(chRight);
        }

        recordingLength += bufferSize;

        // export raw PCM
        self.recordingLength = recordingLength;

        if (typeof config.timeSlice !== 'undefined') {
            intervalsBasedBuffers.recordingLength += bufferSize;
            intervalsBasedBuffers.left.push(chLeft);

            if (numberOfAudioChannels === 2) {
                intervalsBasedBuffers.right.push(chRight);
            }
        }
    }

    jsAudioNode.onaudioprocess = onAudioProcessDataAvailable;

    // to prevent self audio to be connected with speakers
    jsAudioNode.connect(context.destination);

    // export raw PCM
    this.leftchannel = leftchannel;
    this.rightchannel = rightchannel;
    this.numberOfAudioChannels = numberOfAudioChannels;
    this.desiredSampRate = desiredSampRate;
    this.sampleRate = sampleRate;
    self.recordingLength = recordingLength;

    // helper for intervals based blobs
    var intervalsBasedBuffers = {
        left: [],
        right: [],
        recordingLength: 0
    };

    // this looper is used to support intervals based blobs (via timeSlice+ondataavailable)
    function looper() {
        if (!recording || typeof config.ondataavailable !== 'function' || typeof config.timeSlice === 'undefined') {
            return;
        }

        if (intervalsBasedBuffers.left.length) {
            mergeLeftRightBuffers({
                desiredSampRate: desiredSampRate,
                sampleRate: sampleRate,
                numberOfAudioChannels: numberOfAudioChannels,
                internalInterleavedLength: intervalsBasedBuffers.recordingLength,
                leftBuffers: intervalsBasedBuffers.left,
                rightBuffers: numberOfAudioChannels === 1 ? [] : intervalsBasedBuffers.right
            }, function(buffer, view) {
                var blob = new Blob([view], {
                    type: 'audio/wav'
                });
                config.ondataavailable(blob);

                setTimeout(looper, config.timeSlice);
            });

            intervalsBasedBuffers = {
                left: [],
                right: [],
                recordingLength: 0
            };
        } else {
            setTimeout(looper, config.timeSlice);
        }
    }
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.StereoAudioRecorder = StereoAudioRecorder;
}

// _________________
// CanvasRecorder.js

/**
 * CanvasRecorder is a standalone class used by {@link RecordRTC} to bring HTML5-Canvas recording into video WebM. It uses HTML2Canvas library and runs top over {@link Whammy}.
 * @summary HTML2Canvas recording into video WebM.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef CanvasRecorder
 * @class
 * @example
 * var recorder = new CanvasRecorder(htmlElement, { disableLogs: true, useWhammyRecorder: true });
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {HTMLElement} htmlElement - querySelector/getElementById/getElementsByTagName[0]/etc.
 * @param {object} config - {disableLogs:true, initCallback: function}
 */

function CanvasRecorder(htmlElement, config) {
    if (typeof html2canvas === 'undefined') {
        throw 'Please link: https://cdn.webrtc-experiment.com/screenshot.js';
    }

    config = config || {};
    if (!config.frameInterval) {
        config.frameInterval = 10;
    }

    // via DetectRTC.js
    var isCanvasSupportsStreamCapturing = false;
    ['captureStream', 'mozCaptureStream', 'webkitCaptureStream'].forEach(function(item) {
        if (item in document.createElement('canvas')) {
            isCanvasSupportsStreamCapturing = true;
        }
    });

    var _isChrome = (!!window.webkitRTCPeerConnection || !!window.webkitGetUserMedia) && !!window.chrome;

    var chromeVersion = 50;
    var matchArray = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
    if (_isChrome && matchArray && matchArray[2]) {
        chromeVersion = parseInt(matchArray[2], 10);
    }

    if (_isChrome && chromeVersion < 52) {
        isCanvasSupportsStreamCapturing = false;
    }

    if (config.useWhammyRecorder) {
        isCanvasSupportsStreamCapturing = false;
    }

    var globalCanvas, mediaStreamRecorder;

    if (isCanvasSupportsStreamCapturing) {
        if (!config.disableLogs) {
            console.log('Your browser supports both MediRecorder API and canvas.captureStream!');
        }

        if (htmlElement instanceof HTMLCanvasElement) {
            globalCanvas = htmlElement;
        } else if (htmlElement instanceof CanvasRenderingContext2D) {
            globalCanvas = htmlElement.canvas;
        } else {
            throw 'Please pass either HTMLCanvasElement or CanvasRenderingContext2D.';
        }
    } else if (!!navigator.mozGetUserMedia) {
        if (!config.disableLogs) {
            console.error('Canvas recording is NOT supported in Firefox.');
        }
    }

    var isRecording;

    /**
     * This method records Canvas.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.record();
     */
    this.record = function() {
        isRecording = true;

        if (isCanvasSupportsStreamCapturing && !config.useWhammyRecorder) {
            // CanvasCaptureMediaStream
            var canvasMediaStream;
            if ('captureStream' in globalCanvas) {
                canvasMediaStream = globalCanvas.captureStream(25); // 25 FPS
            } else if ('mozCaptureStream' in globalCanvas) {
                canvasMediaStream = globalCanvas.mozCaptureStream(25);
            } else if ('webkitCaptureStream' in globalCanvas) {
                canvasMediaStream = globalCanvas.webkitCaptureStream(25);
            }

            try {
                var mdStream = new MediaStream();
                mdStream.addTrack(canvasMediaStream.getVideoTracks()[0]);
                canvasMediaStream = mdStream;
            } catch (e) {}

            if (!canvasMediaStream) {
                throw 'captureStream API are NOT available.';
            }

            // Note: Jan 18, 2016 status is that, 
            // Firefox MediaRecorder API can't record CanvasCaptureMediaStream object.
            mediaStreamRecorder = new MediaStreamRecorder(canvasMediaStream, {
                mimeType: 'video/webm'
            });
            mediaStreamRecorder.record();
        } else {
            whammy.frames = [];
            lastTime = new Date().getTime();
            drawCanvasFrame();
        }

        if (config.initCallback) {
            config.initCallback();
        }
    };

    this.getWebPImages = function(callback) {
        if (htmlElement.nodeName.toLowerCase() !== 'canvas') {
            callback();
            return;
        }

        var framesLength = whammy.frames.length;
        whammy.frames.forEach(function(frame, idx) {
            var framesRemaining = framesLength - idx;
            if (!config.disableLogs) {
                console.log(framesRemaining + '/' + framesLength + ' frames remaining');
            }

            if (config.onEncodingCallback) {
                config.onEncodingCallback(framesRemaining, framesLength);
            }

            var webp = frame.image.toDataURL('image/webp', 1);
            whammy.frames[idx].image = webp;
        });

        if (!config.disableLogs) {
            console.log('Generating WebM');
        }

        callback();
    };

    /**
     * This method stops recording Canvas.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function(callback) {
        isRecording = false;

        var that = this;

        if (isCanvasSupportsStreamCapturing && mediaStreamRecorder) {
            mediaStreamRecorder.stop(callback);
            return;
        }

        this.getWebPImages(function() {
            /**
             * @property {Blob} blob - Recorded frames in video/webm blob.
             * @memberof CanvasRecorder
             * @example
             * recorder.stop(function() {
             *     var blob = recorder.blob;
             * });
             */
            whammy.compile(function(blob) {
                if (!config.disableLogs) {
                    console.log('Recording finished!');
                }

                that.blob = blob;

                if (that.blob.forEach) {
                    that.blob = new Blob([], {
                        type: 'video/webm'
                    });
                }

                if (callback) {
                    callback(that.blob);
                }

                whammy.frames = [];
            });
        });
    };

    var isPausedRecording = false;

    /**
     * This method pauses the recording process.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function() {
        isPausedRecording = true;

        if (mediaStreamRecorder instanceof MediaStreamRecorder) {
            mediaStreamRecorder.pause();
            return;
        }
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function() {
        isPausedRecording = false;

        if (mediaStreamRecorder instanceof MediaStreamRecorder) {
            mediaStreamRecorder.resume();
            return;
        }

        if (!isRecording) {
            this.record();
        }
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof CanvasRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function() {
        if (isRecording) {
            this.stop(clearRecordedDataCB);
        }
        clearRecordedDataCB();
    };

    function clearRecordedDataCB() {
        whammy.frames = [];
        isRecording = false;
        isPausedRecording = false;
    }

    // for debugging
    this.name = 'CanvasRecorder';
    this.toString = function() {
        return this.name;
    };

    function cloneCanvas() {
        //create a new canvas
        var newCanvas = document.createElement('canvas');
        var context = newCanvas.getContext('2d');

        //set dimensions
        newCanvas.width = htmlElement.width;
        newCanvas.height = htmlElement.height;

        //apply the old canvas to the new one
        context.drawImage(htmlElement, 0, 0);

        //return the new canvas
        return newCanvas;
    }

    function drawCanvasFrame() {
        if (isPausedRecording) {
            lastTime = new Date().getTime();
            return setTimeout(drawCanvasFrame, 500);
        }

        if (htmlElement.nodeName.toLowerCase() === 'canvas') {
            var duration = new Date().getTime() - lastTime;
            // via #206, by Jack i.e. @Seymourr
            lastTime = new Date().getTime();

            whammy.frames.push({
                image: cloneCanvas(),
                duration: duration
            });

            if (isRecording) {
                setTimeout(drawCanvasFrame, config.frameInterval);
            }
            return;
        }

        html2canvas(htmlElement, {
            grabMouse: typeof config.showMousePointer === 'undefined' || config.showMousePointer,
            onrendered: function(canvas) {
                var duration = new Date().getTime() - lastTime;
                if (!duration) {
                    return setTimeout(drawCanvasFrame, config.frameInterval);
                }

                // via #206, by Jack i.e. @Seymourr
                lastTime = new Date().getTime();

                whammy.frames.push({
                    image: canvas.toDataURL('image/webp', 1),
                    duration: duration
                });

                if (isRecording) {
                    setTimeout(drawCanvasFrame, config.frameInterval);
                }
            }
        });
    }

    var lastTime = new Date().getTime();

    var whammy = new Whammy.Video(100);
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.CanvasRecorder = CanvasRecorder;
}

// _________________
// WhammyRecorder.js

/**
 * WhammyRecorder is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It runs top over {@link Whammy}.
 * @summary Video recording feature in Chrome.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef WhammyRecorder
 * @class
 * @example
 * var recorder = new WhammyRecorder(mediaStream);
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
 * @param {object} config - {disableLogs: true, initCallback: function, video: HTMLVideoElement, etc.}
 */

function WhammyRecorder(mediaStream, config) {

    config = config || {};

    if (!config.frameInterval) {
        config.frameInterval = 10;
    }

    if (!config.disableLogs) {
        console.log('Using frames-interval:', config.frameInterval);
    }

    /**
     * This method records video.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.record();
     */
    this.record = function() {
        if (!config.width) {
            config.width = 320;
        }

        if (!config.height) {
            config.height = 240;
        }

        if (!config.video) {
            config.video = {
                width: config.width,
                height: config.height
            };
        }

        if (!config.canvas) {
            config.canvas = {
                width: config.width,
                height: config.height
            };
        }

        canvas.width = config.canvas.width || 320;
        canvas.height = config.canvas.height || 240;

        context = canvas.getContext('2d');

        // setting defaults
        if (config.video && config.video instanceof HTMLVideoElement) {
            video = config.video.cloneNode();

            if (config.initCallback) {
                config.initCallback();
            }
        } else {
            video = document.createElement('video');

            setSrcObject(mediaStream, video);

            video.onloadedmetadata = function() { // "onloadedmetadata" may NOT work in FF?
                if (config.initCallback) {
                    config.initCallback();
                }
            };

            video.width = config.video.width;
            video.height = config.video.height;
        }

        video.muted = true;
        video.play();

        lastTime = new Date().getTime();
        whammy = new Whammy.Video();

        if (!config.disableLogs) {
            console.log('canvas resolutions', canvas.width, '*', canvas.height);
            console.log('video width/height', video.width || canvas.width, '*', video.height || canvas.height);
        }

        drawFrames(config.frameInterval);
    };

    /**
     * Draw and push frames to Whammy
     * @param {integer} frameInterval - set minimum interval (in milliseconds) between each time we push a frame to Whammy
     */
    function drawFrames(frameInterval) {
        frameInterval = typeof frameInterval !== 'undefined' ? frameInterval : 10;

        var duration = new Date().getTime() - lastTime;
        if (!duration) {
            return setTimeout(drawFrames, frameInterval, frameInterval);
        }

        if (isPausedRecording) {
            lastTime = new Date().getTime();
            return setTimeout(drawFrames, 100);
        }

        // via #206, by Jack i.e. @Seymourr
        lastTime = new Date().getTime();

        if (video.paused) {
            // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
            // Tweak for Android Chrome
            video.play();
        }

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        whammy.frames.push({
            duration: duration,
            image: canvas.toDataURL('image/webp')
        });

        if (!isStopDrawing) {
            setTimeout(drawFrames, frameInterval, frameInterval);
        }
    }

    function asyncLoop(o) {
        var i = -1,
            length = o.length;

        (function loop() {
            i++;
            if (i === length) {
                o.callback();
                return;
            }

            // "setTimeout" added by Jim McLeod
            setTimeout(function() {
                o.functionToLoop(loop, i);
            }, 1);
        })();
    }


    /**
     * remove black frames from the beginning to the specified frame
     * @param {Array} _frames - array of frames to be checked
     * @param {number} _framesToCheck - number of frame until check will be executed (-1 - will drop all frames until frame not matched will be found)
     * @param {number} _pixTolerance - 0 - very strict (only black pixel color) ; 1 - all
     * @param {number} _frameTolerance - 0 - very strict (only black frame color) ; 1 - all
     * @returns {Array} - array of frames
     */
    // pull#293 by @volodalexey
    function dropBlackFrames(_frames, _framesToCheck, _pixTolerance, _frameTolerance, callback) {
        var localCanvas = document.createElement('canvas');
        localCanvas.width = canvas.width;
        localCanvas.height = canvas.height;
        var context2d = localCanvas.getContext('2d');
        var resultFrames = [];

        var checkUntilNotBlack = _framesToCheck === -1;
        var endCheckFrame = (_framesToCheck && _framesToCheck > 0 && _framesToCheck <= _frames.length) ?
            _framesToCheck : _frames.length;
        var sampleColor = {
            r: 0,
            g: 0,
            b: 0
        };
        var maxColorDifference = Math.sqrt(
            Math.pow(255, 2) +
            Math.pow(255, 2) +
            Math.pow(255, 2)
        );
        var pixTolerance = _pixTolerance && _pixTolerance >= 0 && _pixTolerance <= 1 ? _pixTolerance : 0;
        var frameTolerance = _frameTolerance && _frameTolerance >= 0 && _frameTolerance <= 1 ? _frameTolerance : 0;
        var doNotCheckNext = false;

        asyncLoop({
            length: endCheckFrame,
            functionToLoop: function(loop, f) {
                var matchPixCount, endPixCheck, maxPixCount;

                var finishImage = function() {
                    if (!doNotCheckNext && maxPixCount - matchPixCount <= maxPixCount * frameTolerance) {
                        // console.log('removed black frame : ' + f + ' ; frame duration ' + _frames[f].duration);
                    } else {
                        // console.log('frame is passed : ' + f);
                        if (checkUntilNotBlack) {
                            doNotCheckNext = true;
                        }
                        resultFrames.push(_frames[f]);
                    }
                    loop();
                };

                if (!doNotCheckNext) {
                    var image = new Image();
                    image.onload = function() {
                        context2d.drawImage(image, 0, 0, canvas.width, canvas.height);
                        var imageData = context2d.getImageData(0, 0, canvas.width, canvas.height);
                        matchPixCount = 0;
                        endPixCheck = imageData.data.length;
                        maxPixCount = imageData.data.length / 4;

                        for (var pix = 0; pix < endPixCheck; pix += 4) {
                            var currentColor = {
                                r: imageData.data[pix],
                                g: imageData.data[pix + 1],
                                b: imageData.data[pix + 2]
                            };
                            var colorDifference = Math.sqrt(
                                Math.pow(currentColor.r - sampleColor.r, 2) +
                                Math.pow(currentColor.g - sampleColor.g, 2) +
                                Math.pow(currentColor.b - sampleColor.b, 2)
                            );
                            // difference in color it is difference in color vectors (r1,g1,b1) <=> (r2,g2,b2)
                            if (colorDifference <= maxColorDifference * pixTolerance) {
                                matchPixCount++;
                            }
                        }
                        finishImage();
                    };
                    image.src = _frames[f].image;
                } else {
                    finishImage();
                }
            },
            callback: function() {
                resultFrames = resultFrames.concat(_frames.slice(endCheckFrame));

                if (resultFrames.length <= 0) {
                    // at least one last frame should be available for next manipulation
                    // if total duration of all frames will be < 1000 than ffmpeg doesn't work well...
                    resultFrames.push(_frames[_frames.length - 1]);
                }
                callback(resultFrames);
            }
        });
    }

    var isStopDrawing = false;

    /**
     * This method stops recording video.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function(callback) {
        callback = callback || function() {};

        isStopDrawing = true;

        var _this = this;
        // analyse of all frames takes some time!
        setTimeout(function() {
            // e.g. dropBlackFrames(frames, 10, 1, 1) - will cut all 10 frames
            // e.g. dropBlackFrames(frames, 10, 0.5, 0.5) - will analyse 10 frames
            // e.g. dropBlackFrames(frames, 10) === dropBlackFrames(frames, 10, 0, 0) - will analyse 10 frames with strict black color
            dropBlackFrames(whammy.frames, -1, null, null, function(frames) {
                whammy.frames = frames;

                // to display advertisement images!
                if (config.advertisement && config.advertisement.length) {
                    whammy.frames = config.advertisement.concat(whammy.frames);
                }

                /**
                 * @property {Blob} blob - Recorded frames in video/webm blob.
                 * @memberof WhammyRecorder
                 * @example
                 * recorder.stop(function() {
                 *     var blob = recorder.blob;
                 * });
                 */
                whammy.compile(function(blob) {
                    _this.blob = blob;

                    if (_this.blob.forEach) {
                        _this.blob = new Blob([], {
                            type: 'video/webm'
                        });
                    }

                    if (callback) {
                        callback(_this.blob);
                    }
                });
            });
        }, 10);
    };

    var isPausedRecording = false;

    /**
     * This method pauses the recording process.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function() {
        isPausedRecording = true;
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function() {
        isPausedRecording = false;

        if (isStopDrawing) {
            this.record();
        }
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof WhammyRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function() {
        if (!isStopDrawing) {
            this.stop(clearRecordedDataCB);
        }
        clearRecordedDataCB();
    };

    function clearRecordedDataCB() {
        whammy.frames = [];
        isStopDrawing = true;
        isPausedRecording = false;
    }

    // for debugging
    this.name = 'WhammyRecorder';
    this.toString = function() {
        return this.name;
    };

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    var video;
    var lastTime;
    var whammy;
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.WhammyRecorder = WhammyRecorder;
}

// https://github.com/antimatter15/whammy/blob/master/LICENSE
// _________
// Whammy.js

// todo: Firefox now supports webp for webm containers!
// their MediaRecorder implementation works well!
// should we provide an option to record via Whammy.js or MediaRecorder API is a better solution?

/**
 * Whammy is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It is written by {@link https://github.com/antimatter15|antimatter15}
 * @summary A real time javascript webm encoder based on a canvas hack.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef Whammy
 * @class
 * @example
 * var recorder = new Whammy().Video(15);
 * recorder.add(context || canvas || dataURL);
 * var output = recorder.compile();
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */

var Whammy = (function() {
    // a more abstract-ish API

    function WhammyVideo(duration) {
        this.frames = [];
        this.duration = duration || 1;
        this.quality = 0.8;
    }

    /**
     * Pass Canvas or Context or image/webp(string) to {@link Whammy} encoder.
     * @method
     * @memberof Whammy
     * @example
     * recorder = new Whammy().Video(0.8, 100);
     * recorder.add(canvas || context || 'image/webp');
     * @param {string} frame - Canvas || Context || image/webp
     * @param {number} duration - Stick a duration (in milliseconds)
     */
    WhammyVideo.prototype.add = function(frame, duration) {
        if ('canvas' in frame) { //CanvasRenderingContext2D
            frame = frame.canvas;
        }

        if ('toDataURL' in frame) {
            frame = frame.toDataURL('image/webp', this.quality);
        }

        if (!(/^data:image\/webp;base64,/ig).test(frame)) {
            throw 'Input must be formatted properly as a base64 encoded DataURI of type image/webp';
        }
        this.frames.push({
            image: frame,
            duration: duration || this.duration
        });
    };

    function processInWebWorker(_function) {
        var blob = URL.createObjectURL(new Blob([_function.toString(),
            'this.onmessage =  function (eee) {' + _function.name + '(eee.data);}'
        ], {
            type: 'application/javascript'
        }));

        var worker = new Worker(blob);
        URL.revokeObjectURL(blob);
        return worker;
    }

    function whammyInWebWorker(frames) {
        function ArrayToWebM(frames) {
            var info = checkFrames(frames);
            if (!info) {
                return [];
            }

            var clusterMaxDuration = 30000;

            var EBML = [{
                'id': 0x1a45dfa3, // EBML
                'data': [{
                    'data': 1,
                    'id': 0x4286 // EBMLVersion
                }, {
                    'data': 1,
                    'id': 0x42f7 // EBMLReadVersion
                }, {
                    'data': 4,
                    'id': 0x42f2 // EBMLMaxIDLength
                }, {
                    'data': 8,
                    'id': 0x42f3 // EBMLMaxSizeLength
                }, {
                    'data': 'webm',
                    'id': 0x4282 // DocType
                }, {
                    'data': 2,
                    'id': 0x4287 // DocTypeVersion
                }, {
                    'data': 2,
                    'id': 0x4285 // DocTypeReadVersion
                }]
            }, {
                'id': 0x18538067, // Segment
                'data': [{
                    'id': 0x1549a966, // Info
                    'data': [{
                        'data': 1e6, //do things in millisecs (num of nanosecs for duration scale)
                        'id': 0x2ad7b1 // TimecodeScale
                    }, {
                        'data': 'whammy',
                        'id': 0x4d80 // MuxingApp
                    }, {
                        'data': 'whammy',
                        'id': 0x5741 // WritingApp
                    }, {
                        'data': doubleToString(info.duration),
                        'id': 0x4489 // Duration
                    }]
                }, {
                    'id': 0x1654ae6b, // Tracks
                    'data': [{
                        'id': 0xae, // TrackEntry
                        'data': [{
                            'data': 1,
                            'id': 0xd7 // TrackNumber
                        }, {
                            'data': 1,
                            'id': 0x73c5 // TrackUID
                        }, {
                            'data': 0,
                            'id': 0x9c // FlagLacing
                        }, {
                            'data': 'und',
                            'id': 0x22b59c // Language
                        }, {
                            'data': 'V_VP8',
                            'id': 0x86 // CodecID
                        }, {
                            'data': 'VP8',
                            'id': 0x258688 // CodecName
                        }, {
                            'data': 1,
                            'id': 0x83 // TrackType
                        }, {
                            'id': 0xe0, // Video
                            'data': [{
                                'data': info.width,
                                'id': 0xb0 // PixelWidth
                            }, {
                                'data': info.height,
                                'id': 0xba // PixelHeight
                            }]
                        }]
                    }]
                }]
            }];

            //Generate clusters (max duration)
            var frameNumber = 0;
            var clusterTimecode = 0;
            while (frameNumber < frames.length) {

                var clusterFrames = [];
                var clusterDuration = 0;
                do {
                    clusterFrames.push(frames[frameNumber]);
                    clusterDuration += frames[frameNumber].duration;
                    frameNumber++;
                } while (frameNumber < frames.length && clusterDuration < clusterMaxDuration);

                var clusterCounter = 0;
                var cluster = {
                    'id': 0x1f43b675, // Cluster
                    'data': getClusterData(clusterTimecode, clusterCounter, clusterFrames)
                }; //Add cluster to segment
                EBML[1].data.push(cluster);
                clusterTimecode += clusterDuration;
            }

            return generateEBML(EBML);
        }

        function getClusterData(clusterTimecode, clusterCounter, clusterFrames) {
            return [{
                'data': clusterTimecode,
                'id': 0xe7 // Timecode
            }].concat(clusterFrames.map(function(webp) {
                var block = makeSimpleBlock({
                    discardable: 0,
                    frame: webp.data.slice(4),
                    invisible: 0,
                    keyframe: 1,
                    lacing: 0,
                    trackNum: 1,
                    timecode: Math.round(clusterCounter)
                });
                clusterCounter += webp.duration;
                return {
                    data: block,
                    id: 0xa3
                };
            }));
        }

        // sums the lengths of all the frames and gets the duration

        function checkFrames(frames) {
            if (!frames[0]) {
                postMessage({
                    error: 'Something went wrong. Maybe WebP format is not supported in the current browser.'
                });
                return;
            }

            var width = frames[0].width,
                height = frames[0].height,
                duration = frames[0].duration;

            for (var i = 1; i < frames.length; i++) {
                duration += frames[i].duration;
            }
            return {
                duration: duration,
                width: width,
                height: height
            };
        }

        function numToBuffer(num) {
            var parts = [];
            while (num > 0) {
                parts.push(num & 0xff);
                num = num >> 8;
            }
            return new Uint8Array(parts.reverse());
        }

        function strToBuffer(str) {
            return new Uint8Array(str.split('').map(function(e) {
                return e.charCodeAt(0);
            }));
        }

        function bitsToBuffer(bits) {
            var data = [];
            var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
            bits = pad + bits;
            for (var i = 0; i < bits.length; i += 8) {
                data.push(parseInt(bits.substr(i, 8), 2));
            }
            return new Uint8Array(data);
        }

        function generateEBML(json) {
            var ebml = [];
            for (var i = 0; i < json.length; i++) {
                var data = json[i].data;

                if (typeof data === 'object') {
                    data = generateEBML(data);
                }

                if (typeof data === 'number') {
                    data = bitsToBuffer(data.toString(2));
                }

                if (typeof data === 'string') {
                    data = strToBuffer(data);
                }

                var len = data.size || data.byteLength || data.length;
                var zeroes = Math.ceil(Math.ceil(Math.log(len) / Math.log(2)) / 8);
                var sizeToString = len.toString(2);
                var padded = (new Array((zeroes * 7 + 7 + 1) - sizeToString.length)).join('0') + sizeToString;
                var size = (new Array(zeroes)).join('0') + '1' + padded;

                ebml.push(numToBuffer(json[i].id));
                ebml.push(bitsToBuffer(size));
                ebml.push(data);
            }

            return new Blob(ebml, {
                type: 'video/webm'
            });
        }

        function toBinStrOld(bits) {
            var data = '';
            var pad = (bits.length % 8) ? (new Array(1 + 8 - (bits.length % 8))).join('0') : '';
            bits = pad + bits;
            for (var i = 0; i < bits.length; i += 8) {
                data += String.fromCharCode(parseInt(bits.substr(i, 8), 2));
            }
            return data;
        }

        function makeSimpleBlock(data) {
            var flags = 0;

            if (data.keyframe) {
                flags |= 128;
            }

            if (data.invisible) {
                flags |= 8;
            }

            if (data.lacing) {
                flags |= (data.lacing << 1);
            }

            if (data.discardable) {
                flags |= 1;
            }

            if (data.trackNum > 127) {
                throw 'TrackNumber > 127 not supported';
            }

            var out = [data.trackNum | 0x80, data.timecode >> 8, data.timecode & 0xff, flags].map(function(e) {
                return String.fromCharCode(e);
            }).join('') + data.frame;

            return out;
        }

        function parseWebP(riff) {
            var VP8 = riff.RIFF[0].WEBP[0];

            var frameStart = VP8.indexOf('\x9d\x01\x2a'); // A VP8 keyframe starts with the 0x9d012a header
            for (var i = 0, c = []; i < 4; i++) {
                c[i] = VP8.charCodeAt(frameStart + 3 + i);
            }

            var width, height, tmp;

            //the code below is literally copied verbatim from the bitstream spec
            tmp = (c[1] << 8) | c[0];
            width = tmp & 0x3FFF;
            tmp = (c[3] << 8) | c[2];
            height = tmp & 0x3FFF;
            return {
                width: width,
                height: height,
                data: VP8,
                riff: riff
            };
        }

        function getStrLength(string, offset) {
            return parseInt(string.substr(offset + 4, 4).split('').map(function(i) {
                var unpadded = i.charCodeAt(0).toString(2);
                return (new Array(8 - unpadded.length + 1)).join('0') + unpadded;
            }).join(''), 2);
        }

        function parseRIFF(string) {
            var offset = 0;
            var chunks = {};

            while (offset < string.length) {
                var id = string.substr(offset, 4);
                var len = getStrLength(string, offset);
                var data = string.substr(offset + 4 + 4, len);
                offset += 4 + 4 + len;
                chunks[id] = chunks[id] || [];

                if (id === 'RIFF' || id === 'LIST') {
                    chunks[id].push(parseRIFF(data));
                } else {
                    chunks[id].push(data);
                }
            }
            return chunks;
        }

        function doubleToString(num) {
            return [].slice.call(
                new Uint8Array((new Float64Array([num])).buffer), 0).map(function(e) {
                return String.fromCharCode(e);
            }).reverse().join('');
        }

        var webm = new ArrayToWebM(frames.map(function(frame) {
            var webp = parseWebP(parseRIFF(atob(frame.image.slice(23))));
            webp.duration = frame.duration;
            return webp;
        }));

        postMessage(webm);
    }

    /**
     * Encodes frames in WebM container. It uses WebWorkinvoke to invoke 'ArrayToWebM' method.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof Whammy
     * @example
     * recorder = new Whammy().Video(0.8, 100);
     * recorder.compile(function(blob) {
     *    // blob.size - blob.type
     * });
     */
    WhammyVideo.prototype.compile = function(callback) {
        var webWorker = processInWebWorker(whammyInWebWorker);

        webWorker.onmessage = function(event) {
            if (event.data.error) {
                console.error(event.data.error);
                return;
            }
            callback(event.data);
        };

        webWorker.postMessage(this.frames);
    };

    return {
        /**
         * A more abstract-ish API.
         * @method
         * @memberof Whammy
         * @example
         * recorder = new Whammy().Video(0.8, 100);
         * @param {?number} speed - 0.8
         * @param {?number} quality - 100
         */
        Video: WhammyVideo
    };
})();

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.Whammy = Whammy;
}

// ______________ (indexed-db)
// DiskStorage.js

/**
 * DiskStorage is a standalone object used by {@link RecordRTC} to store recorded blobs in IndexedDB storage.
 * @summary Writing blobs into IndexedDB.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @example
 * DiskStorage.Store({
 *     audioBlob: yourAudioBlob,
 *     videoBlob: yourVideoBlob,
 *     gifBlob  : yourGifBlob
 * });
 * DiskStorage.Fetch(function(dataURL, type) {
 *     if(type === 'audioBlob') { }
 *     if(type === 'videoBlob') { }
 *     if(type === 'gifBlob')   { }
 * });
 * // DiskStorage.dataStoreName = 'recordRTC';
 * // DiskStorage.onError = function(error) { };
 * @property {function} init - This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
 * @property {function} Fetch - This method fetches stored blobs from IndexedDB.
 * @property {function} Store - This method stores blobs in IndexedDB.
 * @property {function} onError - This function is invoked for any known/unknown error.
 * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 */


var DiskStorage = {
    /**
     * This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
     * @method
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.init();
     */
    init: function() {
        var self = this;

        if (typeof indexedDB === 'undefined' || typeof indexedDB.open === 'undefined') {
            console.error('IndexedDB API are not available in this browser.');
            return;
        }

        var dbVersion = 1;
        var dbName = this.dbName || location.href.replace(/\/|:|#|%|\.|\[|\]/g, ''),
            db;
        var request = indexedDB.open(dbName, dbVersion);

        function createObjectStore(dataBase) {
            dataBase.createObjectStore(self.dataStoreName);
        }

        function putInDB() {
            var transaction = db.transaction([self.dataStoreName], 'readwrite');

            if (self.videoBlob) {
                transaction.objectStore(self.dataStoreName).put(self.videoBlob, 'videoBlob');
            }

            if (self.gifBlob) {
                transaction.objectStore(self.dataStoreName).put(self.gifBlob, 'gifBlob');
            }

            if (self.audioBlob) {
                transaction.objectStore(self.dataStoreName).put(self.audioBlob, 'audioBlob');
            }

            function getFromStore(portionName) {
                transaction.objectStore(self.dataStoreName).get(portionName).onsuccess = function(event) {
                    if (self.callback) {
                        self.callback(event.target.result, portionName);
                    }
                };
            }

            getFromStore('audioBlob');
            getFromStore('videoBlob');
            getFromStore('gifBlob');
        }

        request.onerror = self.onError;

        request.onsuccess = function() {
            db = request.result;
            db.onerror = self.onError;

            if (db.setVersion) {
                if (db.version !== dbVersion) {
                    var setVersion = db.setVersion(dbVersion);
                    setVersion.onsuccess = function() {
                        createObjectStore(db);
                        putInDB();
                    };
                } else {
                    putInDB();
                }
            } else {
                putInDB();
            }
        };
        request.onupgradeneeded = function(event) {
            createObjectStore(event.target.result);
        };
    },
    /**
     * This method fetches stored blobs from IndexedDB.
     * @method
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.Fetch(function(dataURL, type) {
     *     if(type === 'audioBlob') { }
     *     if(type === 'videoBlob') { }
     *     if(type === 'gifBlob')   { }
     * });
     */
    Fetch: function(callback) {
        this.callback = callback;
        this.init();

        return this;
    },
    /**
     * This method stores blobs in IndexedDB.
     * @method
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.Store({
     *     audioBlob: yourAudioBlob,
     *     videoBlob: yourVideoBlob,
     *     gifBlob  : yourGifBlob
     * });
     */
    Store: function(config) {
        this.audioBlob = config.audioBlob;
        this.videoBlob = config.videoBlob;
        this.gifBlob = config.gifBlob;

        this.init();

        return this;
    },
    /**
     * This function is invoked for any known/unknown error.
     * @method
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.onError = function(error){
     *     alerot( JSON.stringify(error) );
     * };
     */
    onError: function(error) {
        console.error(JSON.stringify(error, null, '\t'));
    },

    /**
     * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
     * @memberof DiskStorage
     * @internal
     * @example
     * DiskStorage.dataStoreName = 'recordRTC';
     */
    dataStoreName: 'recordRTC',
    dbName: null
};

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.DiskStorage = DiskStorage;
}

// ______________
// GifRecorder.js

/**
 * GifRecorder is standalone calss used by {@link RecordRTC} to record video or canvas into animated gif.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef GifRecorder
 * @class
 * @example
 * var recorder = new GifRecorder(mediaStream || canvas || context, { onGifPreview: function, onGifRecordingStarted: function, width: 1280, height: 720, frameRate: 200, quality: 10 });
 * recorder.record();
 * recorder.stop(function(blob) {
 *     img.src = URL.createObjectURL(blob);
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - MediaStream object or HTMLCanvasElement or CanvasRenderingContext2D.
 * @param {object} config - {disableLogs:true, initCallback: function, width: 320, height: 240, frameRate: 200, quality: 10}
 */

function GifRecorder(mediaStream, config) {
    if (typeof GIFEncoder === 'undefined') {
        var script = document.createElement('script');
        script.src = 'https://cdn.webrtc-experiment.com/gif-recorder.js';
        (document.body || document.documentElement).appendChild(script);
    }

    config = config || {};

    var isHTMLObject = mediaStream instanceof CanvasRenderingContext2D || mediaStream instanceof HTMLCanvasElement;

    /**
     * This method records MediaStream.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.record();
     */
    this.record = function() {
        if (typeof GIFEncoder === 'undefined') {
            setTimeout(self.record, 1000);
            return;
        }

        if (!isLoadedMetaData) {
            setTimeout(self.record, 1000);
            return;
        }

        if (!isHTMLObject) {
            if (!config.width) {
                config.width = video.offsetWidth || 320;
            }

            if (!config.height) {
                config.height = video.offsetHeight || 240;
            }

            if (!config.video) {
                config.video = {
                    width: config.width,
                    height: config.height
                };
            }

            if (!config.canvas) {
                config.canvas = {
                    width: config.width,
                    height: config.height
                };
            }

            canvas.width = config.canvas.width || 320;
            canvas.height = config.canvas.height || 240;

            video.width = config.video.width || 320;
            video.height = config.video.height || 240;
        }

        // external library to record as GIF images
        gifEncoder = new GIFEncoder();

        // void setRepeat(int iter) 
        // Sets the number of times the set of GIF frames should be played. 
        // Default is 1; 0 means play indefinitely.
        gifEncoder.setRepeat(0);

        // void setFrameRate(Number fps) 
        // Sets frame rate in frames per second. 
        // Equivalent to setDelay(1000/fps).
        // Using "setDelay" instead of "setFrameRate"
        gifEncoder.setDelay(config.frameRate || 200);

        // void setQuality(int quality) 
        // Sets quality of color quantization (conversion of images to the 
        // maximum 256 colors allowed by the GIF specification). 
        // Lower values (minimum = 1) produce better colors, 
        // but slow processing significantly. 10 is the default, 
        // and produces good color mapping at reasonable speeds. 
        // Values greater than 20 do not yield significant improvements in speed.
        gifEncoder.setQuality(config.quality || 10);

        // Boolean start() 
        // This writes the GIF Header and returns false if it fails.
        gifEncoder.start();

        if (typeof config.onGifRecordingStarted === 'function') {
            config.onGifRecordingStarted();
        }

        startTime = Date.now();

        function drawVideoFrame(time) {
            if (self.clearedRecordedData === true) {
                return;
            }

            if (isPausedRecording) {
                return setTimeout(function() {
                    drawVideoFrame(time);
                }, 100);
            }

            lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

            if (typeof lastFrameTime === undefined) {
                lastFrameTime = time;
            }

            // ~10 fps
            if (time - lastFrameTime < 90) {
                return;
            }

            if (!isHTMLObject && video.paused) {
                // via: https://github.com/muaz-khan/WebRTC-Experiment/pull/316
                // Tweak for Android Chrome
                video.play();
            }

            if (!isHTMLObject) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
            }

            if (config.onGifPreview) {
                config.onGifPreview(canvas.toDataURL('image/png'));
            }

            gifEncoder.addFrame(context);
            lastFrameTime = time;
        }

        lastAnimationFrame = requestAnimationFrame(drawVideoFrame);

        if (config.initCallback) {
            config.initCallback();
        }
    };

    /**
     * This method stops recording MediaStream.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.stop(function(blob) {
     *     img.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function(callback) {
        callback = callback || function() {};

        if (lastAnimationFrame) {
            cancelAnimationFrame(lastAnimationFrame);
        }

        endTime = Date.now();

        /**
         * @property {Blob} blob - The recorded blob object.
         * @memberof GifRecorder
         * @example
         * recorder.stop(function(){
         *     var blob = recorder.blob;
         * });
         */
        this.blob = new Blob([new Uint8Array(gifEncoder.stream().bin)], {
            type: 'image/gif'
        });

        callback(this.blob);

        // bug: find a way to clear old recorded blobs
        gifEncoder.stream().bin = [];
    };

    var isPausedRecording = false;

    /**
     * This method pauses the recording process.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function() {
        isPausedRecording = true;
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function() {
        isPausedRecording = false;
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof GifRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function() {
        self.clearedRecordedData = true;
        clearRecordedDataCB();
    };

    function clearRecordedDataCB() {
        if (gifEncoder) {
            gifEncoder.stream().bin = [];
        }
    }

    // for debugging
    this.name = 'GifRecorder';
    this.toString = function() {
        return this.name;
    };

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    if (isHTMLObject) {
        if (mediaStream instanceof CanvasRenderingContext2D) {
            context = mediaStream;
            canvas = context.canvas;
        } else if (mediaStream instanceof HTMLCanvasElement) {
            context = mediaStream.getContext('2d');
            canvas = mediaStream;
        }
    }

    var isLoadedMetaData = true;

    if (!isHTMLObject) {
        var video = document.createElement('video');
        video.muted = true;
        video.autoplay = true;

        isLoadedMetaData = false;
        video.onloadedmetadata = function() {
            isLoadedMetaData = true;
        };

        setSrcObject(mediaStream, video);

        video.play();
    }

    var lastAnimationFrame = null;
    var startTime, endTime, lastFrameTime;

    var gifEncoder;

    var self = this;
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.GifRecorder = GifRecorder;
}

// Last time updated: 2018-03-02 2:56:28 AM UTC

// ________________________
// MultiStreamsMixer v1.0.5

// Open-Sourced: https://github.com/muaz-khan/MultiStreamsMixer

// --------------------------------------------------
// Muaz Khan     - www.MuazKhan.com
// MIT License   - www.WebRTC-Experiment.com/licence
// --------------------------------------------------

function MultiStreamsMixer(arrayOfMediaStreams) {

    // requires: chrome://flags/#enable-experimental-web-platform-features

    var videos = [];
    var isStopDrawingFrames = false;

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.style = 'opacity:0;position:absolute;z-index:-1;top: -100000000;left:-1000000000; margin-top:-1000000000;margin-left:-1000000000;';
    (document.body || document.documentElement).appendChild(canvas);

    this.disableLogs = false;
    this.frameInterval = 10;

    this.width = 360;
    this.height = 240;

    // use gain node to prevent echo
    this.useGainNode = true;

    var self = this;

    // _____________________________
    // Cross-Browser-Declarations.js

    // WebAudio API representer
    var AudioContext = window.AudioContext;

    if (typeof AudioContext === 'undefined') {
        if (typeof webkitAudioContext !== 'undefined') {
            /*global AudioContext:true */
            AudioContext = webkitAudioContext;
        }

        if (typeof mozAudioContext !== 'undefined') {
            /*global AudioContext:true */
            AudioContext = mozAudioContext;
        }
    }

    /*jshint -W079 */
    var URL = window.URL;

    if (typeof URL === 'undefined' && typeof webkitURL !== 'undefined') {
        /*global URL:true */
        URL = webkitURL;
    }

    if (typeof navigator !== 'undefined' && typeof navigator.getUserMedia === 'undefined') { // maybe window.navigator?
        if (typeof navigator.webkitGetUserMedia !== 'undefined') {
            navigator.getUserMedia = navigator.webkitGetUserMedia;
        }

        if (typeof navigator.mozGetUserMedia !== 'undefined') {
            navigator.getUserMedia = navigator.mozGetUserMedia;
        }
    }

    var MediaStream = window.MediaStream;

    if (typeof MediaStream === 'undefined' && typeof webkitMediaStream !== 'undefined') {
        MediaStream = webkitMediaStream;
    }

    /*global MediaStream:true */
    if (typeof MediaStream !== 'undefined') {
        if (!('getVideoTracks' in MediaStream.prototype)) {
            MediaStream.prototype.getVideoTracks = function() {
                if (!this.getTracks) {
                    return [];
                }

                var tracks = [];
                this.getTracks.forEach(function(track) {
                    if (track.kind.toString().indexOf('video') !== -1) {
                        tracks.push(track);
                    }
                });
                return tracks;
            };

            MediaStream.prototype.getAudioTracks = function() {
                if (!this.getTracks) {
                    return [];
                }

                var tracks = [];
                this.getTracks.forEach(function(track) {
                    if (track.kind.toString().indexOf('audio') !== -1) {
                        tracks.push(track);
                    }
                });
                return tracks;
            };
        }

        // override "stop" method for all browsers
        if (typeof MediaStream.prototype.stop === 'undefined') {
            MediaStream.prototype.stop = function() {
                this.getTracks().forEach(function(track) {
                    track.stop();
                });
            };
        }
    }

    var Storage = {};

    if (typeof AudioContext !== 'undefined') {
        Storage.AudioContext = AudioContext;
    } else if (typeof webkitAudioContext !== 'undefined') {
        Storage.AudioContext = webkitAudioContext;
    }

    function setSrcObject(stream, element, ignoreCreateObjectURL) {
        if ('createObjectURL' in URL && !ignoreCreateObjectURL) {
            try {
                element.src = URL.createObjectURL(stream);
            } catch (e) {
                setSrcObject(stream, element, true);
                return;
            }
        } else if ('srcObject' in element) {
            element.srcObject = stream;
        } else if ('mozSrcObject' in element) {
            element.mozSrcObject = stream;
        } else {
            alert('createObjectURL/srcObject both are not supported.');
        }
    }

    this.startDrawingFrames = function() {
        drawVideosToCanvas();
    };

    function drawVideosToCanvas() {
        if (isStopDrawingFrames) {
            return;
        }

        var videosLength = videos.length;

        var fullcanvas = false;
        var remaining = [];
        videos.forEach(function(video) {
            if (!video.stream) {
                video.stream = {};
            }

            if (video.stream.fullcanvas) {
                fullcanvas = video;
            } else {
                remaining.push(video);
            }
        });

        if (fullcanvas) {
            canvas.width = fullcanvas.stream.width;
            canvas.height = fullcanvas.stream.height;
        } else if (remaining.length) {
            canvas.width = videosLength > 1 ? remaining[0].width * 2 : remaining[0].width;

            var height = 1;
            if (videosLength === 3 || videosLength === 4) {
                height = 2;
            }
            if (videosLength === 5 || videosLength === 6) {
                height = 3;
            }
            if (videosLength === 7 || videosLength === 8) {
                height = 4;
            }
            if (videosLength === 9 || videosLength === 10) {
                height = 5;
            }
            canvas.height = remaining[0].height * height;
        } else {
            canvas.width = self.width || 360;
            canvas.height = self.height || 240;
        }

        if (fullcanvas && fullcanvas instanceof HTMLVideoElement) {
            drawImage(fullcanvas);
        }

        remaining.forEach(function(video, idx) {
            drawImage(video, idx);
        });

        setTimeout(drawVideosToCanvas, self.frameInterval);
    }

    function drawImage(video, idx) {
        if (isStopDrawingFrames) {
            return;
        }

        var x = 0;
        var y = 0;
        var width = video.width;
        var height = video.height;

        if (idx === 1) {
            x = video.width;
        }

        if (idx === 2) {
            y = video.height;
        }

        if (idx === 3) {
            x = video.width;
            y = video.height;
        }

        if (idx === 4) {
            y = video.height * 2;
        }

        if (idx === 5) {
            x = video.width;
            y = video.height * 2;
        }

        if (idx === 6) {
            y = video.height * 3;
        }

        if (idx === 7) {
            x = video.width;
            y = video.height * 3;
        }

        if (typeof video.stream.left !== 'undefined') {
            x = video.stream.left;
        }

        if (typeof video.stream.top !== 'undefined') {
            y = video.stream.top;
        }

        if (typeof video.stream.width !== 'undefined') {
            width = video.stream.width;
        }

        if (typeof video.stream.height !== 'undefined') {
            height = video.stream.height;
        }

        context.drawImage(video, x, y, width, height);

        if (typeof video.stream.onRender === 'function') {
            video.stream.onRender(context, x, y, width, height, idx);
        }
    }

    function getMixedStream() {
        isStopDrawingFrames = false;
        var mixedVideoStream = getMixedVideoStream();

        var mixedAudioStream = getMixedAudioStream();
        if (mixedAudioStream) {
            mixedAudioStream.getAudioTracks().forEach(function(track) {
                mixedVideoStream.addTrack(track);
            });
        }

        var fullcanvas;
        arrayOfMediaStreams.forEach(function(stream) {
            if (stream.fullcanvas) {
                fullcanvas = true;
            }
        });

        return mixedVideoStream;
    }

    function getMixedVideoStream() {
        resetVideoStreams();

        var capturedStream;

        if ('captureStream' in canvas) {
            capturedStream = canvas.captureStream();
        } else if ('mozCaptureStream' in canvas) {
            capturedStream = canvas.mozCaptureStream();
        } else if (!self.disableLogs) {
            console.error('Upgrade to latest Chrome or otherwise enable this flag: chrome://flags/#enable-experimental-web-platform-features');
        }

        var videoStream = new MediaStream();

        capturedStream.getVideoTracks().forEach(function(track) {
            videoStream.addTrack(track);
        });

        canvas.stream = videoStream;

        return videoStream;
    }

    function getMixedAudioStream() {
        // via: @pehrsons
        if (!Storage.AudioContextConstructor) {
            Storage.AudioContextConstructor = new Storage.AudioContext();
        }

        self.audioContext = Storage.AudioContextConstructor;

        self.audioSources = [];

        if (self.useGainNode === true) {
            self.gainNode = self.audioContext.createGain();
            self.gainNode.connect(self.audioContext.destination);
            self.gainNode.gain.value = 0; // don't hear self
        }

        var audioTracksLength = 0;
        arrayOfMediaStreams.forEach(function(stream) {
            if (!stream.getAudioTracks().length) {
                return;
            }

            audioTracksLength++;

            var audioSource = self.audioContext.createMediaStreamSource(stream);

            if (self.useGainNode === true) {
                audioSource.connect(self.gainNode);
            }

            self.audioSources.push(audioSource);
        });

        if (!audioTracksLength) {
            return;
        }

        self.audioDestination = self.audioContext.createMediaStreamDestination();
        self.audioSources.forEach(function(audioSource) {
            audioSource.connect(self.audioDestination);
        });
        return self.audioDestination.stream;
    }

    function getVideo(stream) {
        var video = document.createElement('video');

        setSrcObject(stream, video);

        video.muted = true;
        video.volume = 0;

        video.width = stream.width || self.width || 360;
        video.height = stream.height || self.height || 240;

        video.play();

        return video;
    }

    this.appendStreams = function(streams) {
        if (!streams) {
            throw 'First parameter is required.';
        }

        if (!(streams instanceof Array)) {
            streams = [streams];
        }

        arrayOfMediaStreams.concat(streams);

        streams.forEach(function(stream) {
            if (stream.getVideoTracks().length) {
                var video = getVideo(stream);
                video.stream = stream;
                videos.push(video);
            }

            if (stream.getAudioTracks().length && self.audioContext) {
                var audioSource = self.audioContext.createMediaStreamSource(stream);
                audioSource.connect(self.audioDestination);
                self.audioSources.push(audioSource);
            }
        });
    };

    this.releaseStreams = function() {
        videos = [];
        isStopDrawingFrames = true;

        if (self.gainNode) {
            self.gainNode.disconnect();
            self.gainNode = null;
        }

        if (self.audioSources.length) {
            self.audioSources.forEach(function(source) {
                source.disconnect();
            });
            self.audioSources = [];
        }

        if (self.audioDestination) {
            self.audioDestination.disconnect();
            self.audioDestination = null;
        }

        if (self.audioContext) {
            self.audioContext.close();
        }

        self.audioContext = null;

        context.clearRect(0, 0, canvas.width, canvas.height);

        if (canvas.stream) {
            canvas.stream.stop();
            canvas.stream = null;
        }
    };

    this.resetVideoStreams = function(streams) {
        if (streams && !(streams instanceof Array)) {
            streams = [streams];
        }

        resetVideoStreams(streams);
    };

    function resetVideoStreams(streams) {
        videos = [];
        streams = streams || arrayOfMediaStreams;

        // via: @adrian-ber
        streams.forEach(function(stream) {
            if (!stream.getVideoTracks().length) {
                return;
            }

            var video = getVideo(stream);
            video.stream = stream;
            videos.push(video);
        });
    }

    // for debugging
    this.name = 'MultiStreamsMixer';
    this.toString = function() {
        return this.name;
    };

    this.getMixedStream = getMixedStream;

}

// ______________________
// MultiStreamRecorder.js

/*
 * Video conference recording, using captureStream API along with WebAudio and Canvas2D API.
 */

/**
 * MultiStreamRecorder can record multiple videos in single container.
 * @summary Multi-videos recorder.
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef MultiStreamRecorder
 * @class
 * @example
 * var options = {
 *     mimeType: 'video/webm'
 * }
 * var recorder = new MultiStreamRecorder(ArrayOfMediaStreams, options);
 * recorder.record();
 * recorder.stop(function(blob) {
 *     video.src = URL.createObjectURL(blob);
 *
 *     // or
 *     var blob = recorder.blob;
 * });
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStreams} mediaStreams - Array of MediaStreams.
 * @param {object} config - {disableLogs:true, frameInterval: 1, mimeType: "video/webm"}
 */

function MultiStreamRecorder(arrayOfMediaStreams, options) {
    arrayOfMediaStreams = arrayOfMediaStreams || [];
    var self = this;

    var mixer;
    var mediaRecorder;

    options = options || {
        mimeType: 'video/webm',
        video: {
            width: 360,
            height: 240
        }
    };

    if (!options.frameInterval) {
        options.frameInterval = 10;
    }

    if (!options.video) {
        options.video = {};
    }

    if (!options.video.width) {
        options.video.width = 360;
    }

    if (!options.video.height) {
        options.video.height = 240;
    }

    /**
     * This method records all MediaStreams.
     * @method
     * @memberof MultiStreamRecorder
     * @example
     * recorder.record();
     */
    this.record = function() {
        // github/muaz-khan/MultiStreamsMixer
        mixer = new MultiStreamsMixer(arrayOfMediaStreams);

        if (getVideoTracks().length) {
            mixer.frameInterval = options.frameInterval || 10;
            mixer.width = options.video.width || 360;
            mixer.height = options.video.height || 240;
            mixer.startDrawingFrames();
        }

        if (options.previewStream && typeof options.previewStream === 'function') {
            options.previewStream(mixer.getMixedStream());
        }

        // record using MediaRecorder API
        mediaRecorder = new MediaStreamRecorder(mixer.getMixedStream(), options);
        mediaRecorder.record();
    };

    function getVideoTracks() {
        var tracks = [];
        arrayOfMediaStreams.forEach(function(stream) {
            stream.getVideoTracks().forEach(function(track) {
                tracks.push(track);
            });
        });
        return tracks;
    }

    /**
     * This method stops recording MediaStream.
     * @param {function} callback - Callback function, that is used to pass recorded blob back to the callee.
     * @method
     * @memberof MultiStreamRecorder
     * @example
     * recorder.stop(function(blob) {
     *     video.src = URL.createObjectURL(blob);
     * });
     */
    this.stop = function(callback) {
        if (!mediaRecorder) {
            return;
        }

        mediaRecorder.stop(function(blob) {
            self.blob = blob;

            callback(blob);

            self.clearRecordedData();
        });
    };

    /**
     * This method pauses the recording process.
     * @method
     * @memberof MultiStreamRecorder
     * @example
     * recorder.pause();
     */
    this.pause = function() {
        if (mediaRecorder) {
            mediaRecorder.pause();
        }
    };

    /**
     * This method resumes the recording process.
     * @method
     * @memberof MultiStreamRecorder
     * @example
     * recorder.resume();
     */
    this.resume = function() {
        if (mediaRecorder) {
            mediaRecorder.resume();
        }
    };

    /**
     * This method resets currently recorded data.
     * @method
     * @memberof MultiStreamRecorder
     * @example
     * recorder.clearRecordedData();
     */
    this.clearRecordedData = function() {
        if (mediaRecorder) {
            mediaRecorder.clearRecordedData();
            mediaRecorder = null;
        }

        if (mixer) {
            mixer.releaseStreams();
            mixer = null;
        }
    };

    /**
     * Add extra media-streams to existing recordings.
     * @method
     * @memberof MultiStreamRecorder
     * @param {MediaStreams} mediaStreams - Array of MediaStreams
     * @example
     * recorder.addStreams([newAudioStream, newVideoStream]);
     */
    this.addStreams = function(streams) {
        if (!streams) {
            throw 'First parameter is required.';
        }

        if (!(streams instanceof Array)) {
            streams = [streams];
        }

        arrayOfMediaStreams.concat(streams);

        if (!mediaRecorder || !mixer) {
            return;
        }

        mixer.appendStreams(streams);
    };

    /**
     * Reset videos during live recording. Replace old videos e.g. replace cameras with full-screen.
     * @method
     * @memberof MultiStreamRecorder
     * @param {MediaStreams} mediaStreams - Array of MediaStreams
     * @example
     * recorder.resetVideoStreams([newVideo1, newVideo2]);
     */
    this.resetVideoStreams = function(streams) {
        if (!mixer) {
            return;
        }

        if (streams && !(streams instanceof Array)) {
            streams = [streams];
        }

        mixer.resetVideoStreams(streams);
    };

    // for debugging
    this.name = 'MultiStreamRecorder';
    this.toString = function() {
        return this.name;
    };
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.MultiStreamRecorder = MultiStreamRecorder;
}

// _____________________
// RecordRTC.promises.js

/**
 * RecordRTCPromisesHandler adds promises support in {@link RecordRTC}. Try a {@link https://github.com/muaz-khan/RecordRTC/blob/master/simple-demos/RecordRTCPromisesHandler.html|demo here}
 * @summary Promises for {@link RecordRTC}
 * @license {@link https://github.com/muaz-khan/RecordRTC#license|MIT}
 * @author {@link http://www.MuazKhan.com|Muaz Khan}
 * @typedef RecordRTCPromisesHandler
 * @class
 * @example
 * var recorder = new RecordRTCPromisesHandler(mediaStream, options);
 * recorder.startRecording()
 *         .then(successCB)
 *         .catch(errorCB);
 * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
 * @param {MediaStream} mediaStream - Single media-stream object, array of media-streams, html-canvas-element, etc.
 * @param {object} config - {type:"video", recorderType: MediaStreamRecorder, disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
 * @throws Will throw an error if "new" keyword is not used to initiate "RecordRTCPromisesHandler". Also throws error if first argument "MediaStream" is missing.
 * @requires {@link RecordRTC}
 */

function RecordRTCPromisesHandler(mediaStream, options) {
    if (!this) {
        throw 'Use "new RecordRTCPromisesHandler()"';
    }

    if (typeof mediaStream === 'undefined') {
        throw 'First argument "MediaStream" is required.';
    }

    var self = this;

    /**
     * @property {Blob} blob - Access/reach the native {@link RecordRTC} object.
     * @memberof RecordRTCPromisesHandler
     * @example
     * var internal = recorder.recordRTC.getInternalRecorder();
     * alert(internal instanceof MediaStreamRecorder);
     */
    self.recordRTC = new RecordRTC(mediaStream, options);

    /**
     * This method records MediaStream.
     * @method
     * @memberof RecordRTCPromisesHandler
     * @example
     * recorder.startRecording()
     *         .then(successCB)
     *         .catch(errorCB);
     */
    this.startRecording = function() {
        return new Promise(function(resolve, reject) {
            try {
                self.recordRTC.startRecording();
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * This method stops the recording.
     * @method
     * @memberof RecordRTCPromisesHandler
     * @example
     * recorder.stopRecording().then(function() {
     *     var blob = recorder.getBlob();
     * }).catch(errorCB);
     */
    this.stopRecording = function() {
        return new Promise(function(resolve, reject) {
            try {
                self.recordRTC.stopRecording(function(url) {
                    self.blob = self.recordRTC.getBlob();
                    resolve(url);
                });
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * This method returns data-url for the recorded blob.
     * @method
     * @memberof RecordRTCPromisesHandler
     * @example
     * recorder.stopRecording().then(function() {
     *     recorder.getDataURL().then(function(dataURL) {
     *         window.open(dataURL);
     *     }).catch(errorCB);;
     * }).catch(errorCB);
     */
    this.getDataURL = function(callback) {
        return new Promise(function(resolve, reject) {
            try {
                self.recordRTC.getDataURL(function(dataURL) {
                    resolve(dataURL);
                });
            } catch (e) {
                reject(e);
            }
        });
    };

    /**
     * This method returns the recorded blob.
     * @method
     * @memberof RecordRTCPromisesHandler
     * @example
     * recorder.stopRecording().then(function() {
     *     var blob = recorder.getBlob();
     * }).catch(errorCB);
     */
    this.getBlob = function() {
        return self.recordRTC.getBlob();
    };

    /**
     * @property {Blob} blob - Recorded data as "Blob" object.
     * @memberof RecordRTCPromisesHandler
     * @example
     * recorder.stopRecording().then(function() {
     *     var blob = recorder.getBlob();
     * }).catch(errorCB);
     */
    this.blob = null;
}

if (typeof RecordRTC !== 'undefined') {
    RecordRTC.RecordRTCPromisesHandler = RecordRTCPromisesHandler;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20), __webpack_require__(21)))

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__icheck_js__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "icheck", function() { return __WEBPACK_IMPORTED_MODULE_0__icheck_js__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__select2_js__ = __webpack_require__(1);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "select2", function() { return __WEBPACK_IMPORTED_MODULE_1__select2_js__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__inputmask_js__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "inputmask", function() { return __WEBPACK_IMPORTED_MODULE_2__inputmask_js__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__jquery_bar_rating_js__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "jquerybarrating", function() { return __WEBPACK_IMPORTED_MODULE_3__jquery_bar_rating_js__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__jquery_ui_datepicker_js__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "jqueryuidatepicker", function() { return __WEBPACK_IMPORTED_MODULE_4__jquery_ui_datepicker_js__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nouislider_js__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "nouislider", function() { return __WEBPACK_IMPORTED_MODULE_5__nouislider_js__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__select2_tagbox_js__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "select2tagbox", function() { return __WEBPACK_IMPORTED_MODULE_6__select2_tagbox_js__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__signature_pad_js__ = __webpack_require__(9);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "signaturepad", function() { return __WEBPACK_IMPORTED_MODULE_7__signature_pad_js__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sortablejs_js__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "sortablejs", function() { return __WEBPACK_IMPORTED_MODULE_8__sortablejs_js__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ck_editor_js__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ckeditor", function() { return __WEBPACK_IMPORTED_MODULE_9__ck_editor_js__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__easy_autocomplete_js__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "autocomplete", function() { return __WEBPACK_IMPORTED_MODULE_10__easy_autocomplete_js__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pretty_checkbox_js__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "prettycheckbox", function() { return __WEBPACK_IMPORTED_MODULE_11__pretty_checkbox_js__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__bootstrap_slider_js__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "bootstrapslider", function() { return __WEBPACK_IMPORTED_MODULE_12__bootstrap_slider_js__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__microphone_js__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "microphone", function() { return __WEBPACK_IMPORTED_MODULE_13__microphone_js__["default"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__emotionsratings_js__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__emotionsratings_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__emotionsratings_js__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "emotionsratings", function() { return __WEBPACK_IMPORTED_MODULE_14__emotionsratings_js___default.a; });

















/***/ }),
/* 23 */
/***/ (function(module, exports) {

function init(Survey, $) {
  $ = $ || window.$;

  var widget = {
    name: "emotionsratings",
    title: "Emotions Ratings",
    iconName: "icon-emotionsratings",
    widgetIsLoaded: function() {
      return typeof $ == "function" && !!$.fn.emotionsRating;
    },
    defaultJSON: {
      choices: [1, 2, 3, 4, 5]
    },
    isFit: function(question) {
      return question.getType() === "emotionsratings";
    },
    isDefaultRender: false,
    htmlTemplate: "<div></div>",
    activatedByChanged: function(activatedBy) {
      Survey.JsonObject.metaData.addClass(
        "emotionsratings",
        [
          {
            name: "hasOther",
            visible: false
          },
          {
            name: "otherText",
            visible: false
          },
          {
            name: "optionsCaption",
            visible: false
          },
          {
            name: "otherErrorText",
            visible: false
          },
          {
            name: "storeOthersAsComment",
            visible: false
          },
          {
            name: "renderAs",
            visible: false
          }
        ],
        null,
        "dropdown"
      );
    },
    afterRender: function(question, el) {
      var self = this;
      var emotionsArray = ["angry", "disappointed", "meh", "happy", "inLove"];
      var options = {
        emotionSize: 30,
        bgEmotion: "happy",
        emotions: emotionsArray,
        color: "#FF0066",
        onUpdate: function(value) {
          question.value = value;
        }
      };
      initWidget();

      question.valueChangedCallback = initWidget;
      question.readOnlyChangedCallback = initWidget;

      function initWidget() {
        el.innerHTML = "<div></div>";
        $(el).off();
        options.initialRating = question.value || 0;
        options.disabled = question.isReadOnly;
        $(el)
          .find("div")
          .emotionsRating(options);
      }
    },
    willUnmount: function(question, el) {
      el.innerHTML = null;
      $(el).off();
      question.readOnlyChangedCallback = null;
    }
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
  init(Survey, window.$);
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBkMmM4NjBkM2Q0MTRlZWEwNzNhNiIsIndlYnBhY2s6Ly8vLi9zcmMvaWNoZWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9zZWxlY3QyLmpzIiwid2VicGFjazovLy8uL3NyYy9pbnB1dG1hc2suanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIklucHV0bWFza1wiLFwiY29tbW9uanMyXCI6XCJpbnB1dG1hc2tcIixcImNvbW1vbmpzXCI6XCJpbnB1dG1hc2tcIixcImFtZFwiOlwiaW5wdXRtYXNrXCJ9Iiwid2VicGFjazovLy8uL3NyYy9qcXVlcnktYmFyLXJhdGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanF1ZXJ5LXVpLWRhdGVwaWNrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL25vdWlzbGlkZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIm5vVWlTbGlkZXJcIixcImNvbW1vbmpzMlwiOlwibm91aXNsaWRlclwiLFwiY29tbW9uanNcIjpcIm5vdWlzbGlkZXJcIixcImFtZFwiOlwibm91aXNsaWRlclwifSIsIndlYnBhY2s6Ly8vLi9zcmMvc2VsZWN0Mi10YWdib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NpZ25hdHVyZV9wYWQuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlNpZ25hdHVyZVBhZFwiLFwiY29tbW9uanMyXCI6XCJzaWduYXR1cmVfcGFkXCIsXCJjb21tb25qc1wiOlwic2lnbmF0dXJlX3BhZFwiLFwiYW1kXCI6XCJzaWduYXR1cmVfcGFkXCJ9Iiwid2VicGFjazovLy8uL3NyYy9zb3J0YWJsZWpzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJTb3J0YWJsZVwiLFwiY29tbW9uanMyXCI6XCJzb3J0YWJsZWpzXCIsXCJjb21tb25qc1wiOlwic29ydGFibGVqc1wiLFwiYW1kXCI6XCJzb3J0YWJsZWpzXCJ9Iiwid2VicGFjazovLy8uL3NyYy9jay1lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Vhc3ktYXV0b2NvbXBsZXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9wcmV0dHktY2hlY2tib3guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Jvb3RzdHJhcC1zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlNsaWRlclwiLFwiY29tbW9uanMyXCI6XCJib290c3RyYXAtc2xpZGVyXCIsXCJjb21tb25qc1wiOlwiYm9vdHN0cmFwLXNsaWRlclwiLFwiYW1kXCI6XCJib290c3RyYXAtc2xpZGVyXCJ9Iiwid2VicGFjazovLy8uL3NyYy9taWNyb3Bob25lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yZWNvcmRydGMvUmVjb3JkUlRDLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3VydmV5anMtd2lkZ2V0cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW1vdGlvbnNyYXRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFB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QjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0JBQW9CLFNBQVM7QUFDN0I7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlEQUFpRCxnQkFBZ0IsaUdBQWlHLGFBQWE7QUFDL0s7QUFDQSxhQUFhO0FBQ2IsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCw2Q0FBNkM7QUFDaEc7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFNBQVM7QUFDVCxXQUFXLFlBQVk7QUFDdkIsV0FBVyxPQUFPLFdBQVc7QUFDN0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEIsS0FBSztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELGdCQUFnQix1REFBdUQsYUFBYTtBQUNySTtBQUNBLGFBQWE7QUFDYixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osU0FBUztBQUNULFdBQVcsWUFBWTtBQUN2QixXQUFXLE9BQU8sV0FBVztBQUM3Qjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7OztBQUdBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckIsZUFBZSxPQUFPO0FBQ3RCLGVBQWUsT0FBTywyREFBMkQ7QUFDakYsZUFBZSxPQUFPLDZEQUE2RDtBQUNuRixpQkFBaUIsTUFBTTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5RUFBeUU7QUFDekUscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Q0FBeUMsbUJBQW1CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLEtBQUs7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUMsZ0JBQWdCLHVEQUF1RDtBQUNoSDtBQUNBLGFBQWE7QUFDYixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdEQUF3RCxhQUFhO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLCtDQUErQyxrQ0FBa0M7QUFDakY7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakIsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsbUJBQW1CO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsaUJBQWlCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsaUJBQWlCO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSx5REFBeUQ7QUFDekQsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsUUFBUTtBQUMzQixtQkFBbUIsUUFBUTtBQUMzQjtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLGdCQUFnQjtBQUMvRDtBQUNBLGFBQWE7QUFDYixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLGlDQUFpQztBQUNqQyxpQ0FBaUM7QUFDakMsaUNBQWlDO0FBQ2pDLElBQUk7QUFDSjtBQUNBLDZDQUE2QztBQUM3QyxjQUFjLFNBQVM7QUFDdkIsY0FBYyxTQUFTO0FBQ3ZCLGNBQWMsU0FBUztBQUN2QixjQUFjLFNBQVM7QUFDdkIsY0FBYyxPQUFPO0FBQ3JCLFNBQVM7QUFDVDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckMscUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQyxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0Esa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDRDQUE0QyxnQkFBZ0I7QUFDNUQsYUFBYTtBQUNiLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUsaUhBQWlIO0FBQ3RMO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixTQUFTO0FBQ1QsV0FBVyxZQUFZO0FBQ3ZCLFdBQVcsT0FBTyxXQUFXO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNCQUFzQixLQUFLO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLGtCQUFrQixXQUFXLGdCQUFnQixpQkFBaUIsd0JBQXdCLHdCQUF3QjtBQUM1STs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNEZBQTRGO0FBQzVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixTQUFTO0FBQ1QsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsT0FBTyxXQUFXO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsYUFBYTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzREFBc0QsZ0JBQWdCLFNBQVM7QUFDL0UsMEJBQTBCO0FBQzFCLGFBQWE7QUFDYixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsV0FBVyxZQUFZO0FBQ3ZCLFdBQVcsT0FBTyxXQUFXO0FBQzdCO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGtCQUFrQixLQUFLLGlDQUFpQyxnQkFBZ0I7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsS0FBSztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQ3I5S0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7QUNwQkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7QUN2THRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBZ0Q7QUFDRTtBQUNJO0FBQ2M7QUFDTTtBQUNsQjtBQUNPO0FBQ0Y7QUFDTDtBQUNIO0FBQ1k7QUFDQTtBQUNFO0FBQ1g7QUFDVTs7Ozs7OztBQ2RsRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJzdXJ2ZXlqcy13aWRnZXRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiaW5wdXRtYXNrXCIpLCByZXF1aXJlKFwibm91aXNsaWRlclwiKSwgcmVxdWlyZShcInNpZ25hdHVyZV9wYWRcIiksIHJlcXVpcmUoXCJzb3J0YWJsZWpzXCIpLCByZXF1aXJlKFwiYm9vdHN0cmFwLXNsaWRlclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInN1cnZleWpzLXdpZGdldHNcIiwgW1wiaW5wdXRtYXNrXCIsIFwibm91aXNsaWRlclwiLCBcInNpZ25hdHVyZV9wYWRcIiwgXCJzb3J0YWJsZWpzXCIsIFwiYm9vdHN0cmFwLXNsaWRlclwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJzdXJ2ZXlqcy13aWRnZXRzXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiaW5wdXRtYXNrXCIpLCByZXF1aXJlKFwibm91aXNsaWRlclwiKSwgcmVxdWlyZShcInNpZ25hdHVyZV9wYWRcIiksIHJlcXVpcmUoXCJzb3J0YWJsZWpzXCIpLCByZXF1aXJlKFwiYm9vdHN0cmFwLXNsaWRlclwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wic3VydmV5anMtd2lkZ2V0c1wiXSA9IGZhY3Rvcnkocm9vdFtcIklucHV0bWFza1wiXSwgcm9vdFtcIm5vVWlTbGlkZXJcIl0sIHJvb3RbXCJTaWduYXR1cmVQYWRcIl0sIHJvb3RbXCJTb3J0YWJsZVwiXSwgcm9vdFtcIlNsaWRlclwiXSk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEwX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xN19fKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDIyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkMmM4NjBkM2Q0MTRlZWEwNzNhNiIsImZ1bmN0aW9uIGluaXQoU3VydmV5LCAkKSB7XG4gICQgPSAkIHx8IHdpbmRvdy4kO1xuICB2YXIgd2lkZ2V0ID0ge1xuICAgIGNsYXNzTmFtZTogXCJpcmFkaW9fc3F1YXJlLWJsdWVcIixcbiAgICBuYW1lOiBcImljaGVja1wiLFxuICAgIHdpZGdldElzTG9hZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgJCA9PSBcImZ1bmN0aW9uXCIgJiYgISEkLmZuLmlDaGVjaztcbiAgICB9LFxuICAgIGlzRml0OiBmdW5jdGlvbihxdWVzdGlvbikge1xuICAgICAgdmFyIHQgPSBxdWVzdGlvbi5nZXRUeXBlKCk7XG4gICAgICByZXR1cm4gdCA9PT0gXCJyYWRpb2dyb3VwXCIgfHwgdCA9PT0gXCJjaGVja2JveFwiIHx8IHQgPT09IFwibWF0cml4XCI7XG4gICAgfSxcbiAgICBpc0RlZmF1bHRSZW5kZXI6IHRydWUsXG4gICAgYWZ0ZXJSZW5kZXI6IGZ1bmN0aW9uKHF1ZXN0aW9uLCBlbCkge1xuICAgICAgdmFyIHJvb3RXaWRnZXQgPSB0aGlzO1xuICAgICAgdmFyICRlbCA9ICQoZWwpO1xuICAgICAgJGVsLmZpbmQoXCJpbnB1dFwiKS5kYXRhKHtcbiAgICAgICAgaUNoZWNrOiB1bmRlZmluZWRcbiAgICAgIH0pO1xuXG4gICAgICAkZWwuZmluZChcImlucHV0XCIpLmlDaGVjayh7XG4gICAgICAgIGNoZWNrYm94Q2xhc3M6IHJvb3RXaWRnZXQuY2xhc3NOYW1lLFxuICAgICAgICByYWRpb0NsYXNzOiByb290V2lkZ2V0LmNsYXNzTmFtZVxuICAgICAgfSk7XG4gICAgICB2YXIgc2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChxdWVzdGlvbi5nZXRUeXBlKCkgIT09IFwibWF0cml4XCIpIHtcbiAgICAgICAgICB2YXIgdmFsdWVzID0gcXVlc3Rpb24udmFsdWU7XG4gICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IFt2YWx1ZXNdO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgJGVsLmZpbmQoXCJpbnB1dFt2YWx1ZT1cIiArIHZhbHVlICsgXCJdXCIpLmlDaGVjayhcImNoZWNrXCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHF1ZXN0aW9uLmdlbmVyYXRlZFZpc2libGVSb3dzLmZvckVhY2goZnVuY3Rpb24ocm93LCBpbmRleCwgcm93cykge1xuICAgICAgICAgICAgaWYgKHJvdy52YWx1ZSkge1xuICAgICAgICAgICAgICAkKGVsKVxuICAgICAgICAgICAgICAgIC5maW5kKFxuICAgICAgICAgICAgICAgICAgXCJpbnB1dFtuYW1lPSdcIiArIHJvdy5mdWxsTmFtZSArIFwiJ11bdmFsdWU9J1wiICsgcm93LnZhbHVlICsgXCInXVwiXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5pQ2hlY2soXCJjaGVja1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgICRlbC5maW5kKFwiaW5wdXRcIikub24oXCJpZkNoZWNrZWRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uLmdldFR5cGUoKSA9PT0gXCJtYXRyaXhcIikge1xuICAgICAgICAgIHF1ZXN0aW9uLmdlbmVyYXRlZFZpc2libGVSb3dzLmZvckVhY2goZnVuY3Rpb24ocm93LCBpbmRleCwgcm93cykge1xuICAgICAgICAgICAgaWYgKHJvdy5mdWxsTmFtZSA9PT0gZXZlbnQudGFyZ2V0Lm5hbWUpIHtcbiAgICAgICAgICAgICAgcm93LnZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXN0aW9uLmdldFR5cGUoKSA9PT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgICAgdmFyIG9sZFZhbHVlID0gcXVlc3Rpb24udmFsdWUgfHwgW107XG4gICAgICAgICAgdmFyIGluZGV4ID0gb2xkVmFsdWUuaW5kZXhPZihldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHF1ZXN0aW9uLnZhbHVlID0gb2xkVmFsdWUuY29uY2F0KFtldmVudC50YXJnZXQudmFsdWVdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcXVlc3Rpb24udmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgJGVsLmZpbmQoXCJpbnB1dFwiKS5vbihcImlmVW5jaGVja2VkXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChxdWVzdGlvbi5nZXRUeXBlKCkgPT09IFwiY2hlY2tib3hcIikge1xuICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IHF1ZXN0aW9uLnZhbHVlIHx8IFtdO1xuICAgICAgICAgIHZhciBpbmRleCA9IG9sZFZhbHVlLmluZGV4T2YoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgb2xkVmFsdWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIHF1ZXN0aW9uLnZhbHVlID0gb2xkVmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHF1ZXN0aW9uLnZhbHVlQ2hhbmdlZENhbGxiYWNrID0gc2VsZWN0O1xuICAgICAgc2VsZWN0KCk7XG4gICAgfSxcbiAgICB3aWxsVW5tb3VudDogZnVuY3Rpb24ocXVlc3Rpb24sIGVsKSB7XG4gICAgICB2YXIgJGVsID0gJChlbCk7XG4gICAgICAkZWwuZmluZChcImlucHV0XCIpLmlDaGVjayhcImRlc3Ryb3lcIik7XG4gICAgfVxuICB9O1xuXG4gIFN1cnZleS5DdXN0b21XaWRnZXRDb2xsZWN0aW9uLkluc3RhbmNlLmFkZEN1c3RvbVdpZGdldCh3aWRnZXQsIFwidHlwZVwiKTtcbn1cblxuaWYgKHR5cGVvZiBTdXJ2ZXkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgaW5pdChTdXJ2ZXksIHdpbmRvdy4kKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ljaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMTIiLCJmdW5jdGlvbiBpbml0KFN1cnZleSwgJCkge1xuICAkID0gJCB8fCB3aW5kb3cuJDtcbiAgdmFyIHdpZGdldCA9IHtcbiAgICBhY3RpdmF0ZWRCeTogXCJwcm9wZXJ0eVwiLFxuICAgIG5hbWU6IFwic2VsZWN0MlwiLFxuICAgIGh0bWxUZW1wbGF0ZTogXCI8c2VsZWN0IHN0eWxlPSd3aWR0aDogMTAwJTsnPjwvc2VsZWN0PlwiLFxuICAgIHdpZGdldElzTG9hZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgJCA9PSBcImZ1bmN0aW9uXCIgJiYgISEkLmZuLnNlbGVjdDI7XG4gICAgfSxcbiAgICBpc0ZpdDogZnVuY3Rpb24ocXVlc3Rpb24pIHtcbiAgICAgIGlmICh3aWRnZXQuYWN0aXZhdGVkQnkgPT0gXCJwcm9wZXJ0eVwiKVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHF1ZXN0aW9uW1wicmVuZGVyQXNcIl0gPT09IFwic2VsZWN0MlwiICYmXG4gICAgICAgICAgcXVlc3Rpb24uZ2V0VHlwZSgpID09PSBcImRyb3Bkb3duXCJcbiAgICAgICAgKTtcbiAgICAgIGlmICh3aWRnZXQuYWN0aXZhdGVkQnkgPT0gXCJ0eXBlXCIpXG4gICAgICAgIHJldHVybiB0eXBlb2YgcXVlc3Rpb24uZ2V0VHlwZSgpID09PSBcImRyb3Bkb3duXCI7XG4gICAgICBpZiAod2lkZ2V0LmFjdGl2YXRlZEJ5ID09IFwiY3VzdG9tdHlwZVwiKVxuICAgICAgICByZXR1cm4gcXVlc3Rpb24uZ2V0VHlwZSgpID09PSBcInNlbGVjdDJcIjtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIGFjdGl2YXRlZEJ5Q2hhbmdlZDogZnVuY3Rpb24oYWN0aXZhdGVkQnkpIHtcbiAgICAgIGlmICghdGhpcy53aWRnZXRJc0xvYWRlZCgpKSByZXR1cm47XG4gICAgICB3aWRnZXQuYWN0aXZhdGVkQnkgPSBhY3RpdmF0ZWRCeTtcbiAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLnJlbW92ZVByb3BlcnR5KFwiZHJvcGRvd25cIiwgXCJyZW5kZXJBc1wiKTtcbiAgICAgIGlmIChhY3RpdmF0ZWRCeSA9PSBcInByb3BlcnR5XCIpIHtcbiAgICAgICAgU3VydmV5Lkpzb25PYmplY3QubWV0YURhdGEuYWRkUHJvcGVydHkoXCJkcm9wZG93blwiLCB7XG4gICAgICAgICAgbmFtZTogXCJyZW5kZXJBc1wiLFxuICAgICAgICAgIGRlZmF1bHQ6IFwic3RhbmRhcmRcIixcbiAgICAgICAgICBjaG9pY2VzOiBbXCJzdGFuZGFyZFwiLCBcInNlbGVjdDJcIl1cbiAgICAgICAgfSk7XG4gICAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZFByb3BlcnR5KFwiZHJvcGRvd25cIiwge1xuICAgICAgICAgIG5hbWU6IFwic2VsZWN0MkNvbmZpZ1wiLFxuICAgICAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aXZhdGVkQnkgPT0gXCJjdXN0b210eXBlXCIpIHtcbiAgICAgICAgU3VydmV5Lkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJzZWxlY3QyXCIsIFtdLCBudWxsLCBcImRyb3Bkb3duXCIpO1xuICAgICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRQcm9wZXJ0eShcInNlbGVjdDJcIiwge1xuICAgICAgICAgIG5hbWU6IFwic2VsZWN0MkNvbmZpZ1wiLFxuICAgICAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBhZnRlclJlbmRlcjogZnVuY3Rpb24ocXVlc3Rpb24sIGVsKSB7XG4gICAgICB2YXIgc2V0dGluZ3MgPSBxdWVzdGlvbi5zZWxlY3QyQ29uZmlnO1xuICAgICAgdmFyICRlbCA9ICQoZWwpLmlzKFwic2VsZWN0XCIpID8gJChlbCkgOiAkKGVsKS5maW5kKFwic2VsZWN0XCIpO1xuICAgICAgdmFyIG90aGVyc0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgb3RoZXJzRWwudHlwZSA9IFwidGV4dFwiO1xuICAgICAgb3RoZXJzRWwuc3R5bGUubWFyZ2luVG9wID0gXCIzcHhcIjtcbiAgICAgIG90aGVyc0VsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgIG90aGVyc0VsLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAkZWxcbiAgICAgICAgLnBhcmVudCgpXG4gICAgICAgIC5nZXQoMClcbiAgICAgICAgLmFwcGVuZENoaWxkKG90aGVyc0VsKTtcblxuICAgICAgdmFyIHVwZGF0ZVZhbHVlSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkZWwudmFsKHF1ZXN0aW9uLnZhbHVlKS50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuICAgICAgICBvdGhlcnNFbC5zdHlsZS5kaXNwbGF5ID0gIXF1ZXN0aW9uLmlzT3RoZXJTZWxlY3RlZCA/IFwibm9uZVwiIDogXCJcIjtcbiAgICAgIH07XG4gICAgICB2YXIgdXBkYXRlQ29tbWVudEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgb3RoZXJzRWwudmFsdWUgPSBxdWVzdGlvbi5jb21tZW50ID8gcXVlc3Rpb24uY29tbWVudCA6IFwiXCI7XG4gICAgICB9O1xuICAgICAgdmFyIG90aGVyc0VsQ2hhbmdlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBxdWVzdGlvbi5jb21tZW50ID0gb3RoZXJzRWwudmFsdWU7XG4gICAgICB9O1xuICAgICAgdmFyIHVwZGF0ZUNob2ljZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJGVsLnNlbGVjdDIoKS5lbXB0eSgpO1xuXG4gICAgICAgIGlmIChzZXR0aW5ncykge1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5hamF4KSB7XG4gICAgICAgICAgICAkZWwuc2VsZWN0MihzZXR0aW5ncyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHRpbmdzLmRhdGEgPSBxdWVzdGlvbi52aXNpYmxlQ2hvaWNlcy5tYXAoZnVuY3Rpb24oY2hvaWNlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6IGNob2ljZS52YWx1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBjaG9pY2UudGV4dFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkZWwuc2VsZWN0MihzZXR0aW5ncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRlbC5zZWxlY3QyKHtcbiAgICAgICAgICAgIHRoZW1lOiBcImNsYXNzaWNcIixcbiAgICAgICAgICAgIGRpc2FibGVkOiBxdWVzdGlvbi5pc1JlYWRPbmx5LFxuICAgICAgICAgICAgZGF0YTogcXVlc3Rpb24udmlzaWJsZUNob2ljZXMubWFwKGZ1bmN0aW9uKGNob2ljZSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiBjaG9pY2UudmFsdWUsXG4gICAgICAgICAgICAgICAgdGV4dDogY2hvaWNlLnRleHRcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVWYWx1ZUhhbmRsZXIoKTtcbiAgICAgICAgdXBkYXRlQ29tbWVudEhhbmRsZXIoKTtcbiAgICAgIH07XG5cbiAgICAgIHF1ZXN0aW9uLnJlYWRPbmx5Q2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRlbC5wcm9wKFwiZGlzYWJsZWRcIiwgcXVlc3Rpb24uaXNSZWFkT25seSk7XG4gICAgICB9O1xuXG4gICAgICBxdWVzdGlvbi5jaG9pY2VzQ2hhbmdlZENhbGxiYWNrID0gdXBkYXRlQ2hvaWNlcztcbiAgICAgIHVwZGF0ZUNob2ljZXMoKTtcbiAgICAgICRlbC5vbihcInNlbGVjdDI6c2VsZWN0XCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgcXVlc3Rpb24udmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcbiAgICAgIH0pO1xuICAgICAgJGVsLm9uKFwic2VsZWN0Mjp1bnNlbGVjdGluZ1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHF1ZXN0aW9uLnZhbHVlID0gbnVsbDtcbiAgICAgIH0pO1xuICAgICAgb3RoZXJzRWwub25jaGFuZ2UgPSBvdGhlcnNFbENoYW5nZWQ7XG4gICAgICBxdWVzdGlvbi52YWx1ZUNoYW5nZWRDYWxsYmFjayA9IHVwZGF0ZVZhbHVlSGFuZGxlcjtcbiAgICAgIHF1ZXN0aW9uLmNvbW1lbnRDaGFuZ2VkQ2FsbGJhY2sgPSB1cGRhdGVDb21tZW50SGFuZGxlcjtcbiAgICAgIHVwZGF0ZVZhbHVlSGFuZGxlcigpO1xuICAgICAgdXBkYXRlQ29tbWVudEhhbmRsZXIoKTtcbiAgICB9LFxuICAgIHdpbGxVbm1vdW50OiBmdW5jdGlvbihxdWVzdGlvbiwgZWwpIHtcbiAgICAgICQoZWwpXG4gICAgICAgIC5maW5kKFwic2VsZWN0XCIpXG4gICAgICAgIC5vZmYoXCJzZWxlY3QyOnNlbGVjdFwiKVxuICAgICAgICAuc2VsZWN0MihcImRlc3Ryb3lcIik7XG4gICAgICBxdWVzdGlvbi5yZWFkT25seUNoYW5nZWRDYWxsYmFjayA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIFN1cnZleS5DdXN0b21XaWRnZXRDb2xsZWN0aW9uLkluc3RhbmNlLmFkZEN1c3RvbVdpZGdldCh3aWRnZXQpO1xufVxuXG5pZiAodHlwZW9mIFN1cnZleSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICBpbml0KFN1cnZleSwgd2luZG93LiQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2VsZWN0Mi5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgNyIsImltcG9ydCBJbnB1dG1hc2sgZnJvbSBcImlucHV0bWFza1wiO1xuXG5mdW5jdGlvbiBpbml0KFN1cnZleSkge1xuICB2YXIgd2lkZ2V0ID0ge1xuICAgIG5hbWU6IFwibWFza2VkaXRcIixcbiAgICBudW1lcmljR3JvdXBTZXBhcmF0b3I6IFwiLFwiLFxuICAgIG51bWVyaWNBdXRvR3JvdXA6IHRydWUsXG4gICAgbnVtZXJpY0RpZ2l0czogMixcbiAgICBudW1lcmljRGlnaXRzT3B0aW9uYWw6IGZhbHNlLFxuICAgIG51bWVyaWNQcmVmaXg6IFwiJFwiLFxuICAgIG51bWVyaWNQbGFjZWhvbGRlcjogXCIwXCIsXG4gICAgYXV0b1VubWFzazogdHJ1ZSxcbiAgICB3aWRnZXRJc0xvYWRlZDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIElucHV0bWFzayAhPSBcInVuZGVmaW5lZFwiO1xuICAgIH0sXG4gICAgaXNGaXQ6IGZ1bmN0aW9uKHF1ZXN0aW9uKSB7XG4gICAgICBpZiAocXVlc3Rpb24uZ2V0VHlwZSgpID09IFwibXVsdGlwbGV0ZXh0XCIpIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgcXVlc3Rpb24uZ2V0VHlwZSgpID09IFwidGV4dFwiICYmXG4gICAgICAgIChxdWVzdGlvbi5pbnB1dE1hc2sgIT0gXCJub25lXCIgfHwgcXVlc3Rpb24uaW5wdXRGb3JtYXQpXG4gICAgICApO1xuICAgIH0sXG4gICAgaXNEZWZhdWx0UmVuZGVyOiB0cnVlLFxuICAgIGFjdGl2YXRlZEJ5Q2hhbmdlZDogZnVuY3Rpb24oYWN0aXZhdGVkQnkpIHtcbiAgICAgIGlmIChTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5maW5kUHJvcGVydHkoXCJ0ZXh0XCIsIFwiaW5wdXRNYXNrXCIpKSByZXR1cm47XG4gICAgICB2YXIgcHJvcGVydGllcyA9IFtcbiAgICAgICAgXCJpbnB1dEZvcm1hdFwiLFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJpbnB1dE1hc2tcIixcbiAgICAgICAgICBkZWZhdWx0OiBcIm5vbmVcIixcbiAgICAgICAgICBjaG9pY2VzOiBbXG4gICAgICAgICAgICBcIm5vbmVcIixcbiAgICAgICAgICAgIFwiZGF0ZXRpbWVcIixcbiAgICAgICAgICAgIFwiY3VycmVuY3lcIixcbiAgICAgICAgICAgIFwiZGVjaW1hbFwiLFxuICAgICAgICAgICAgXCJlbWFpbFwiLFxuICAgICAgICAgICAgXCJwaG9uZVwiLFxuICAgICAgICAgICAgXCJpcFwiXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdO1xuICAgICAgU3VydmV5Lkpzb25PYmplY3QubWV0YURhdGEuYWRkUHJvcGVydGllcyhcInRleHRcIiwgcHJvcGVydGllcyk7XG4gICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRQcm9wZXJ0aWVzKFxuICAgICAgICBcIm1hdHJpeGRyb3Bkb3duY29sdW1uXCIsXG4gICAgICAgIHByb3BlcnRpZXNcbiAgICAgICk7XG4gICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRQcm9wZXJ0aWVzKFwibXVsdGlwbGV0ZXh0aXRlbVwiLCBwcm9wZXJ0aWVzKTtcbiAgICB9LFxuICAgIGFwcGx5SW5wdXRNYXNrOiBmdW5jdGlvbihzdXJ2ZXlFbGVtZW50LCBlbCkge1xuICAgICAgdmFyIHJvb3RXaWRnZXQgPSB0aGlzO1xuICAgICAgdmFyIG1hc2sgPVxuICAgICAgICBzdXJ2ZXlFbGVtZW50LmlucHV0TWFzayAhPSBcIm5vbmVcIlxuICAgICAgICAgID8gc3VydmV5RWxlbWVudC5pbnB1dE1hc2tcbiAgICAgICAgICA6IHN1cnZleUVsZW1lbnQuaW5wdXRGb3JtYXQ7XG4gICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgYXV0b1VubWFzazogcm9vdFdpZGdldC5hdXRvVW5tYXNrXG4gICAgICB9O1xuICAgICAgaWYgKHN1cnZleUVsZW1lbnQuaW5wdXRNYXNrICE9IFwibm9uZVwiKVxuICAgICAgICBvcHRpb25zLmlucHV0Rm9ybWF0ID0gc3VydmV5RWxlbWVudC5pbnB1dEZvcm1hdDtcblxuICAgICAgaWYgKFxuICAgICAgICBzdXJ2ZXlFbGVtZW50LmlucHV0TWFzayA9PSBcImN1cnJlbmN5XCIgfHxcbiAgICAgICAgc3VydmV5RWxlbWVudC5pbnB1dE1hc2sgPT0gXCJkZWNpbWFsXCJcbiAgICAgICkge1xuICAgICAgICBvcHRpb25zLmdyb3VwU2VwYXJhdG9yID0gcm9vdFdpZGdldC5udW1lcmljR3JvdXBTZXBhcmF0b3I7XG4gICAgICAgIG9wdGlvbnMuYXV0b0dyb3VwID0gcm9vdFdpZGdldC5udW1lcmljQXV0b0dyb3VwO1xuICAgICAgfVxuICAgICAgaWYgKHN1cnZleUVsZW1lbnQuaW5wdXRNYXNrID09IFwiY3VycmVuY3lcIikge1xuICAgICAgICBvcHRpb25zLmRpZ2l0cyA9IHJvb3RXaWRnZXQubnVtZXJpY0RpZ2l0cztcbiAgICAgICAgb3B0aW9ucy5kaWdpdHNPcHRpb25hbCA9IHJvb3RXaWRnZXQubnVtZXJpY0RpZ2l0c09wdGlvbmFsO1xuICAgICAgICBvcHRpb25zLnByZWZpeCA9IHJvb3RXaWRnZXQubnVtZXJpY1ByZWZpeDtcbiAgICAgICAgb3B0aW9ucy5wbGFjZWhvbGRlciA9IHJvb3RXaWRnZXQubnVtZXJpY1BsYWNlaG9sZGVyO1xuICAgICAgfVxuICAgICAgaWYgKHN1cnZleUVsZW1lbnQuaW5wdXRNYXNrID09IFwiZGF0ZXRpbWVcIikge1xuICAgICAgICBtYXNrID0gc3VydmV5RWxlbWVudC5pbnB1dEZvcm1hdDtcbiAgICAgIH1cblxuICAgICAgSW5wdXRtYXNrKG1hc2ssIG9wdGlvbnMpLm1hc2soZWwpO1xuXG4gICAgICBlbC5vbmlucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHN1cnZleUVsZW1lbnQuY3VzdG9tV2lkZ2V0RGF0YS5pc05lZWRSZW5kZXIgPSB0cnVlO1xuICAgICAgfTtcblxuICAgICAgdmFyIHVwZGF0ZUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZWwudmFsdWUgPVxuICAgICAgICAgIHR5cGVvZiBzdXJ2ZXlFbGVtZW50LnZhbHVlID09PSBcInVuZGVmaW5lZFwiID8gXCJcIiA6IHN1cnZleUVsZW1lbnQudmFsdWU7XG4gICAgICB9O1xuICAgICAgc3VydmV5RWxlbWVudC52YWx1ZUNoYW5nZWRDYWxsYmFjayA9IHVwZGF0ZUhhbmRsZXI7XG4gICAgICB1cGRhdGVIYW5kbGVyKCk7XG4gICAgfSxcbiAgICBhZnRlclJlbmRlcjogZnVuY3Rpb24ocXVlc3Rpb24sIGVsKSB7XG4gICAgICBpZiAocXVlc3Rpb24uZ2V0VHlwZSgpICE9IFwibXVsdGlwbGV0ZXh0XCIpIHtcbiAgICAgICAgdmFyIGlucHV0ID0gZWwucXVlcnlTZWxlY3RvcihcImlucHV0XCIpIHx8IGVsO1xuICAgICAgICB0aGlzLmFwcGx5SW5wdXRNYXNrKHF1ZXN0aW9uLCBpbnB1dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXN0aW9uLml0ZW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGl0ZW0gPSBxdWVzdGlvbi5pdGVtc1tpXTtcbiAgICAgICAgICBpZiAoaXRlbS5pbnB1dE1hc2sgIT0gXCJub25lXCIgfHwgaXRlbS5pbnB1dEZvcm1hdCkge1xuICAgICAgICAgICAgdmFyIGlucHV0ID0gZWwucXVlcnlTZWxlY3RvcihcIiNcIiArIGl0ZW0uaWQpO1xuICAgICAgICAgICAgaWYgKGlucHV0KSB7XG4gICAgICAgICAgICAgIHRoaXMuYXBwbHlJbnB1dE1hc2soaXRlbSwgaW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgd2lsbFVubW91bnQ6IGZ1bmN0aW9uKHF1ZXN0aW9uLCBlbCkge1xuICAgICAgdmFyIGlucHV0ID0gZWwucXVlcnlTZWxlY3RvcihcImlucHV0XCIpIHx8IGVsO1xuICAgICAgaWYgKCEhaW5wdXQgJiYgISFpbnB1dC5pbnB1dG1hc2spIHtcbiAgICAgICAgaW5wdXQuaW5wdXRtYXNrLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBTdXJ2ZXkuQ3VzdG9tV2lkZ2V0Q29sbGVjdGlvbi5JbnN0YW5jZS5hZGRDdXN0b21XaWRnZXQod2lkZ2V0KTtcbn1cblxuaWYgKHR5cGVvZiBTdXJ2ZXkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgaW5pdChTdXJ2ZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvaW5wdXRtYXNrLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCA1IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJJbnB1dG1hc2tcIixcImNvbW1vbmpzMlwiOlwiaW5wdXRtYXNrXCIsXCJjb21tb25qc1wiOlwiaW5wdXRtYXNrXCIsXCJhbWRcIjpcImlucHV0bWFza1wifVxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgNSIsImZ1bmN0aW9uIGluaXQoU3VydmV5LCAkKSB7XG4gICQgPSAkIHx8IHdpbmRvdy4kO1xuICB2YXIgd2lkZ2V0ID0ge1xuICAgIG5hbWU6IFwiYmFycmF0aW5nXCIsXG4gICAgdGl0bGU6IFwiQmFyIHJhdGluZ1wiLFxuICAgIGljb25OYW1lOiBcImljb24tYmFycmF0aW5nXCIsXG4gICAgd2lkZ2V0SXNMb2FkZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiAkID09IFwiZnVuY3Rpb25cIiAmJiAhISQuZm4uYmFycmF0aW5nO1xuICAgIH0sXG4gICAgZGVmYXVsdEpTT046IHsgY2hvaWNlczogWzEsIDIsIDMsIDQsIDVdIH0sXG4gICAgaXNGaXQ6IGZ1bmN0aW9uKHF1ZXN0aW9uKSB7XG4gICAgICByZXR1cm4gcXVlc3Rpb24uZ2V0VHlwZSgpID09PSBcImJhcnJhdGluZ1wiO1xuICAgIH0sXG4gICAgaXNEZWZhdWx0UmVuZGVyOiB0cnVlLFxuICAgIGFjdGl2YXRlZEJ5Q2hhbmdlZDogZnVuY3Rpb24oYWN0aXZhdGVkQnkpIHtcbiAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFxuICAgICAgICBcImJhcnJhdGluZ1wiLFxuICAgICAgICBbXG4gICAgICAgICAgeyBuYW1lOiBcImhhc090aGVyXCIsIHZpc2libGU6IGZhbHNlIH0sXG4gICAgICAgICAgeyBuYW1lOiBcIm90aGVyVGV4dFwiLCB2aXNpYmxlOiBmYWxzZSB9LFxuICAgICAgICAgIHsgbmFtZTogXCJvcHRpb25zQ2FwdGlvblwiLCB2aXNpYmxlOiBmYWxzZSB9LFxuICAgICAgICAgIHsgbmFtZTogXCJvdGhlckVycm9yVGV4dFwiLCB2aXNpYmxlOiBmYWxzZSB9LFxuICAgICAgICAgIHsgbmFtZTogXCJzdG9yZU90aGVyc0FzQ29tbWVudFwiLCB2aXNpYmxlOiBmYWxzZSB9LFxuICAgICAgICAgIHsgbmFtZTogXCJyZW5kZXJBc1wiLCB2aXNpYmxlOiBmYWxzZSB9XG4gICAgICAgIF0sXG4gICAgICAgIG51bGwsXG4gICAgICAgIFwiZHJvcGRvd25cIlxuICAgICAgKTtcbiAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZFByb3BlcnR5KFwiYmFycmF0aW5nXCIsIHtcbiAgICAgICAgbmFtZTogXCJzaG93VmFsdWVzOmJvb2xlYW5cIixcbiAgICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgU3VydmV5Lkpzb25PYmplY3QubWV0YURhdGEuYWRkUHJvcGVydHkoXCJiYXJyYXRpbmdcIiwge1xuICAgICAgICBuYW1lOiBcInJhdGluZ1RoZW1lXCIsXG4gICAgICAgIGRlZmF1bHQ6IFwiY3NzLXN0YXJzXCIsXG4gICAgICAgIGNob2ljZXM6IFtcbiAgICAgICAgICBcImZvbnRhd2Vzb21lLXN0YXJzXCIsXG4gICAgICAgICAgXCJjc3Mtc3RhcnNcIixcbiAgICAgICAgICBcImJhcnMtcGlsbFwiLFxuICAgICAgICAgIFwiYmFycy0xdG8xMFwiLFxuICAgICAgICAgIFwiYmFycy1tb3ZpZVwiLFxuICAgICAgICAgIFwiYmFycy1zcXVhcmVcIixcbiAgICAgICAgICBcImJhcnMtcmV2ZXJzZWRcIixcbiAgICAgICAgICBcImJhcnMtaG9yaXpvbnRhbFwiLFxuICAgICAgICAgIFwiYm9vdHN0cmFwLXN0YXJzXCIsXG4gICAgICAgICAgXCJmb250YXdlc29tZS1zdGFycy1vXCJcbiAgICAgICAgXVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBhZnRlclJlbmRlcjogZnVuY3Rpb24ocXVlc3Rpb24sIGVsKSB7XG4gICAgICB2YXIgJGVsID0gJChlbCkuaXMoXCJzZWxlY3RcIikgPyAkKGVsKSA6ICQoZWwpLmZpbmQoXCJzZWxlY3RcIik7XG4gICAgICAkZWwuYmFycmF0aW5nKFwic2hvd1wiLCB7XG4gICAgICAgIHRoZW1lOiBxdWVzdGlvbi5yYXRpbmdUaGVtZSxcbiAgICAgICAgaW5pdGlhbFJhdGluZzogcXVlc3Rpb24udmFsdWUsXG4gICAgICAgIHNob3dWYWx1ZXM6IHF1ZXN0aW9uLnNob3dWYWx1ZXMsXG4gICAgICAgIHNob3dTZWxlY3RlZFJhdGluZzogZmFsc2UsXG4gICAgICAgIG9uU2VsZWN0OiBmdW5jdGlvbih2YWx1ZSwgdGV4dCkge1xuICAgICAgICAgIHF1ZXN0aW9uLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcXVlc3Rpb24udmFsdWVDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJChlbClcbiAgICAgICAgICAuZmluZChcInNlbGVjdFwiKVxuICAgICAgICAgIC5iYXJyYXRpbmcoXCJzZXRcIiwgcXVlc3Rpb24udmFsdWUpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIHdpbGxVbm1vdW50OiBmdW5jdGlvbihxdWVzdGlvbiwgZWwpIHtcbiAgICAgIHZhciAkZWwgPSAkKGVsKS5maW5kKFwic2VsZWN0XCIpO1xuICAgICAgJGVsLmJhcnJhdGluZyhcImRlc3Ryb3lcIik7XG4gICAgfVxuICB9O1xuXG4gIFN1cnZleS5DdXN0b21XaWRnZXRDb2xsZWN0aW9uLkluc3RhbmNlLmFkZEN1c3RvbVdpZGdldCh3aWRnZXQsIFwiY3VzdG9tdHlwZVwiKTtcbn1cblxuaWYgKHR5cGVvZiBTdXJ2ZXkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgaW5pdChTdXJ2ZXksIHdpbmRvdy4kKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pxdWVyeS1iYXItcmF0aW5nLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxMSIsImZ1bmN0aW9uIGluaXQoU3VydmV5LCAkKSB7XG4gICQgPSAkIHx8IHdpbmRvdy4kO1xuICB2YXIgd2lkZ2V0ID0ge1xuICAgIG5hbWU6IFwiZGF0ZXBpY2tlclwiLFxuICAgIHRpdGxlOiBcIkRhdGUgcGlja2VyXCIsXG4gICAgaWNvbk5hbWU6IFwiaWNvbi1kYXRlcGlja2VyXCIsXG4gICAgd2lkZ2V0SXNMb2FkZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICEhJCAmJiAhISQuZm4uZGF0ZXBpY2tlcjtcbiAgICB9LFxuICAgIGlzRml0OiBmdW5jdGlvbihxdWVzdGlvbikge1xuICAgICAgcmV0dXJuIHF1ZXN0aW9uLmdldFR5cGUoKSA9PT0gXCJkYXRlcGlja2VyXCI7XG4gICAgfSxcbiAgICBodG1sVGVtcGxhdGU6IFwiPGlucHV0IGNsYXNzPSdmb3JtLWNvbnRyb2wgd2lkZ2V0LWRhdGVwaWNrZXInIHR5cGU9J3RleHQnPlwiLFxuICAgIGFjdGl2YXRlZEJ5Q2hhbmdlZDogZnVuY3Rpb24oYWN0aXZhdGVkQnkpIHtcbiAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFxuICAgICAgICBcImRhdGVwaWNrZXJcIixcbiAgICAgICAgW1xuICAgICAgICAgIHsgbmFtZTogXCJpbnB1dFR5cGVcIiwgdmlzaWJsZTogZmFsc2UgfSxcbiAgICAgICAgICB7IG5hbWU6IFwiaW5wdXRGb3JtYXRcIiwgdmlzaWJsZTogZmFsc2UgfSxcbiAgICAgICAgICB7IG5hbWU6IFwiaW5wdXRNYXNrXCIsIHZpc2libGU6IGZhbHNlIH1cbiAgICAgICAgXSxcbiAgICAgICAgbnVsbCxcbiAgICAgICAgXCJ0ZXh0XCJcbiAgICAgICk7XG4gICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRQcm9wZXJ0eShcImRhdGVwaWNrZXJcIiwge1xuICAgICAgICBuYW1lOiBcImRhdGVGb3JtYXRcIlxuICAgICAgfSk7XG4gICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRQcm9wZXJ0eShcImRhdGVwaWNrZXJcIiwge1xuICAgICAgICBuYW1lOiBcImNvbmZpZ1wiLFxuICAgICAgICBkZWZhdWx0OiBudWxsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGFmdGVyUmVuZGVyOiBmdW5jdGlvbihxdWVzdGlvbiwgZWwpIHtcbiAgICAgIHZhciAkZWwgPSAkKGVsKS5pcyhcIi53aWRnZXQtZGF0ZXBpY2tlclwiKVxuICAgICAgICA/ICQoZWwpXG4gICAgICAgIDogJChlbCkuZmluZChcIi53aWRnZXQtZGF0ZXBpY2tlclwiKTtcbiAgICAgIHZhciBjb25maWcgPSBxdWVzdGlvbi5jb25maWcgfHwge307XG4gICAgICBpZiAoISFxdWVzdGlvbi5wbGFjZUhvbGRlcikge1xuICAgICAgICAkZWwuYXR0cihcInBsYWNlaG9sZGVyXCIsIHF1ZXN0aW9uLnBsYWNlSG9sZGVyKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb25maWcuZGF0ZUZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbmZpZy5kYXRlRm9ybWF0ID0gISFxdWVzdGlvbi5kYXRlRm9ybWF0XG4gICAgICAgICAgPyBxdWVzdGlvbi5kYXRlRm9ybWF0XG4gICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLm9wdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbmZpZy5vcHRpb24gPSB7XG4gICAgICAgICAgbWluRGF0ZTogbnVsbCxcbiAgICAgICAgICBtYXhEYXRlOiBudWxsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoY29uZmlnLm9uU2VsZWN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uZmlnLm9uU2VsZWN0ID0gZnVuY3Rpb24oZGF0ZVRleHQpIHtcbiAgICAgICAgICBxdWVzdGlvbi52YWx1ZSA9IGRhdGVUZXh0O1xuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgdmFyIHBpY2tlcldpZGdldCA9ICRlbC5kYXRlcGlja2VyKGNvbmZpZyk7XG5cbiAgICAgICRlbC5rZXl1cChmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT0gOCB8fCBlLmtleUNvZGUgPT0gNDYpIHtcbiAgICAgICAgICAkLmRhdGVwaWNrZXIuX2NsZWFyRGF0ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHF1ZXN0aW9uLnJlYWRPbmx5Q2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRlbC5kYXRlcGlja2VyKFwib3B0aW9uXCIsIFwiZGlzYWJsZWRcIiwgcXVlc3Rpb24uaXNSZWFkT25seSk7XG4gICAgICB9O1xuICAgICAgcXVlc3Rpb24ucmVhZE9ubHlDaGFuZ2VkQ2FsbGJhY2soKTtcblxuICAgICAgcXVlc3Rpb24udmFsdWVDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uLnZhbHVlKSB7XG4gICAgICAgICAgcGlja2VyV2lkZ2V0LmRhdGVwaWNrZXIoXCJzZXREYXRlXCIsIHF1ZXN0aW9uLnZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwaWNrZXJXaWRnZXQuZGF0ZXBpY2tlcihcInNldERhdGVcIiwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBxdWVzdGlvbi52YWx1ZUNoYW5nZWRDYWxsYmFjaygpO1xuICAgIH0sXG4gICAgd2lsbFVubW91bnQ6IGZ1bmN0aW9uKHF1ZXN0aW9uLCBlbCkge1xuICAgICAgdmFyICRlbCA9ICQoZWwpLmlzKFwiLndpZGdldC1kYXRlcGlja2VyXCIpXG4gICAgICAgID8gJChlbClcbiAgICAgICAgOiAkKGVsKS5maW5kKFwiLndpZGdldC1kYXRlcGlja2VyXCIpO1xuICAgICAgJGVsLmRhdGVwaWNrZXIoXCJkZXN0cm95XCIpO1xuICAgIH1cbiAgfTtcblxuICBTdXJ2ZXkuQ3VzdG9tV2lkZ2V0Q29sbGVjdGlvbi5JbnN0YW5jZS5hZGRDdXN0b21XaWRnZXQod2lkZ2V0LCBcImN1c3RvbXR5cGVcIik7XG59XG5cbmlmICh0eXBlb2YgU3VydmV5ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIGluaXQoU3VydmV5LCB3aW5kb3cuJCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcXVlcnktdWktZGF0ZXBpY2tlci5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMTAiLCJpbXBvcnQgbm9VaVNsaWRlciBmcm9tIFwibm91aXNsaWRlclwiO1xuXG5mdW5jdGlvbiBpbml0KFN1cnZleSkge1xuICB2YXIgd2lkZ2V0ID0ge1xuICAgIG5hbWU6IFwibm91aXNsaWRlclwiLFxuICAgIHRpdGxlOiBcIm5vVWlTbGlkZXJcIixcbiAgICBpY29uTmFtZTogXCJpY29uLW5vdWlzbGlkZXJcIixcbiAgICB3aWRnZXRJc0xvYWRlZDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG5vVWlTbGlkZXIgIT0gXCJ1bmRlZmluZWRcIjtcbiAgICB9LFxuICAgIGlzRml0OiBmdW5jdGlvbihxdWVzdGlvbikge1xuICAgICAgcmV0dXJuIHF1ZXN0aW9uLmdldFR5cGUoKSA9PT0gXCJub3Vpc2xpZGVyXCI7XG4gICAgfSxcbiAgICBodG1sVGVtcGxhdGU6IFwiPGRpdj48L2Rpdj5cIixcbiAgICBhY3RpdmF0ZWRCeUNoYW5nZWQ6IGZ1bmN0aW9uKGFjdGl2YXRlZEJ5KSB7XG4gICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcIm5vdWlzbGlkZXJcIiwgW10sIG51bGwsIFwiZW1wdHlcIik7XG4gICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRQcm9wZXJ0aWVzKFwibm91aXNsaWRlclwiLCBbXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcInN0ZXA6bnVtYmVyXCIsXG4gICAgICAgICAgZGVmYXVsdDogMVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJyYW5nZU1pbjpudW1iZXJcIixcbiAgICAgICAgICBkZWZhdWx0OiAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcInJhbmdlTWF4Om51bWJlclwiLFxuICAgICAgICAgIGRlZmF1bHQ6IDEwMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJwaXBzTW9kZVwiLFxuICAgICAgICAgIGRlZmF1bHQ6IFwicG9zaXRpb25zXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwicGlwc1ZhbHVlczppdGVtdmFsdWVzXCIsXG4gICAgICAgICAgZGVmYXVsdDogWzAsIDI1LCA1MCwgNzUsIDEwMF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwicGlwc0RlbnNpdHk6bnVtYmVyXCIsXG4gICAgICAgICAgZGVmYXVsdDogNVxuICAgICAgICB9XG4gICAgICBdKTtcbiAgICB9LFxuICAgIGFmdGVyUmVuZGVyOiBmdW5jdGlvbihxdWVzdGlvbiwgZWwpIHtcbiAgICAgIGlmIChxdWVzdGlvbi5pc0VtcHR5KCkpIHtcbiAgICAgICAgcXVlc3Rpb24udmFsdWUgPSAocXVlc3Rpb24ucmFuZ2VNaW4gKyBxdWVzdGlvbi5yYW5nZU1heCkgLyAyO1xuICAgICAgfVxuXG4gICAgICBlbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBcIjUwcHhcIjtcbiAgICAgIHZhciBzbGlkZXIgPSBub1VpU2xpZGVyLmNyZWF0ZShlbCwge1xuICAgICAgICBzdGFydDogcXVlc3Rpb24udmFsdWUsXG4gICAgICAgIGNvbm5lY3Q6IFt0cnVlLCBmYWxzZV0sXG4gICAgICAgIHN0ZXA6IHF1ZXN0aW9uLnN0ZXAsXG4gICAgICAgIHRvb2x0aXBzOiB0cnVlLFxuICAgICAgICBwaXBzOiB7XG4gICAgICAgICAgbW9kZTogcXVlc3Rpb24ucGlwc01vZGUgfHwgXCJwb3NpdGlvbnNcIixcbiAgICAgICAgICB2YWx1ZXM6IHF1ZXN0aW9uLnBpcHNWYWx1ZXMubWFwKGZ1bmN0aW9uKHBWYWwpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludCgocFZhbC52YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHBWYWwudmFsdWUpIHx8IHBWYWwpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIGRlbnNpdHk6IHF1ZXN0aW9uLnBpcHNEZW5zaXR5IHx8IDVcbiAgICAgICAgfSxcbiAgICAgICAgcmFuZ2U6IHtcbiAgICAgICAgICBtaW46IHF1ZXN0aW9uLnJhbmdlTWluLFxuICAgICAgICAgIG1heDogcXVlc3Rpb24ucmFuZ2VNYXhcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBzbGlkZXIub24oXCJzZXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIHF1ZXN0aW9uLnZhbHVlID0gc2xpZGVyLmdldCgpO1xuICAgICAgfSk7XG4gICAgICB2YXIgdXBkYXRlVmFsdWVIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNsaWRlci5zZXQocXVlc3Rpb24udmFsdWUpO1xuICAgICAgfTtcbiAgICAgIGlmIChxdWVzdGlvbi5pc1JlYWRPbmx5KSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgfVxuICAgICAgdXBkYXRlVmFsdWVIYW5kbGVyKCk7XG4gICAgICBxdWVzdGlvbi5ub1VpU2xpZGVyID0gc2xpZGVyO1xuICAgICAgcXVlc3Rpb24udmFsdWVDaGFuZ2VkQ2FsbGJhY2sgPSB1cGRhdGVWYWx1ZUhhbmRsZXI7XG4gICAgICBxdWVzdGlvbi5yZWFkT25seUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAocXVlc3Rpb24uaXNSZWFkT25seSkge1xuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0sXG4gICAgd2lsbFVubW91bnQ6IGZ1bmN0aW9uKHF1ZXN0aW9uLCBlbCkge1xuICAgICAgcXVlc3Rpb24ubm9VaVNsaWRlci5kZXN0cm95KCk7XG4gICAgICBxdWVzdGlvbi5ub1VpU2xpZGVyID0gbnVsbDtcbiAgICAgIHF1ZXN0aW9uLnJlYWRPbmx5Q2hhbmdlZENhbGxiYWNrID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgU3VydmV5LkN1c3RvbVdpZGdldENvbGxlY3Rpb24uSW5zdGFuY2UuYWRkQ3VzdG9tV2lkZ2V0KHdpZGdldCwgXCJjdXN0b210eXBlXCIpO1xufVxuXG5pZiAodHlwZW9mIFN1cnZleSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICBpbml0KFN1cnZleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9ub3Vpc2xpZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCA0IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJub1VpU2xpZGVyXCIsXCJjb21tb25qczJcIjpcIm5vdWlzbGlkZXJcIixcImNvbW1vbmpzXCI6XCJub3Vpc2xpZGVyXCIsXCJhbWRcIjpcIm5vdWlzbGlkZXJcIn1cbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDQiLCJmdW5jdGlvbiBpbml0KFN1cnZleSwgJCkge1xuICAkID0gJCB8fCB3aW5kb3cuJDtcbiAgdmFyIHdpZGdldCA9IHtcbiAgICBuYW1lOiBcInRhZ2JveFwiLFxuICAgIHRpdGxlOiBcIlRhZyBib3hcIixcbiAgICBpY29uTmFtZTogXCJpY29uLXRhZ2JveFwiLFxuICAgIHdpZGdldElzTG9hZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgJCA9PSBcImZ1bmN0aW9uXCIgJiYgISEkLmZuLnNlbGVjdDI7XG4gICAgfSxcbiAgICBkZWZhdWx0SlNPTjoge1xuICAgICAgY2hvaWNlczogW1wiSXRlbSAxXCIsIFwiSXRlbSAyXCIsIFwiSXRlbSAzXCJdXG4gICAgfSxcbiAgICBodG1sVGVtcGxhdGU6IFwiPHNlbGVjdCBtdWx0aXBsZT0nbXVsdGlwbGUnIHN0eWxlPSd3aWR0aDogMTAwJTsnPjwvc2VsZWN0PlwiLFxuICAgIGlzRml0OiBmdW5jdGlvbihxdWVzdGlvbikge1xuICAgICAgcmV0dXJuIHF1ZXN0aW9uLmdldFR5cGUoKSA9PT0gXCJ0YWdib3hcIjtcbiAgICB9LFxuICAgIGFjdGl2YXRlZEJ5Q2hhbmdlZDogZnVuY3Rpb24oYWN0aXZhdGVkQnkpIHtcbiAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFxuICAgICAgICBcInRhZ2JveFwiLFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJoYXNPdGhlclwiLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG51bGwsXG4gICAgICAgIFwiY2hlY2tib3hcIlxuICAgICAgKTtcbiAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZFByb3BlcnR5KFwidGFnYm94XCIsIHtcbiAgICAgICAgbmFtZTogXCJzZWxlY3QyQ29uZmlnXCIsXG4gICAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgYWZ0ZXJSZW5kZXI6IGZ1bmN0aW9uKHF1ZXN0aW9uLCBlbCkge1xuICAgICAgdmFyIHNldHRpbmdzID0gcXVlc3Rpb24uc2VsZWN0MkNvbmZpZztcbiAgICAgIHZhciAkZWwgPSAkKGVsKS5pcyhcInNlbGVjdFwiKSA/ICQoZWwpIDogJChlbCkuZmluZChcInNlbGVjdFwiKTtcbiAgICAgICRlbC5zZWxlY3QyKHtcbiAgICAgICAgdGFnczogXCJ0cnVlXCIsXG4gICAgICAgIGRpc2FibGVkOiBxdWVzdGlvbi5pc1JlYWRPbmx5LFxuICAgICAgICB0aGVtZTogXCJjbGFzc2ljXCJcbiAgICAgIH0pO1xuICAgICAgdmFyIHVwZGF0ZVZhbHVlSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkZWwudmFsKHF1ZXN0aW9uLnZhbHVlKS50cmlnZ2VyKFwiY2hhbmdlXCIpO1xuICAgICAgfTtcbiAgICAgIHZhciB1cGRhdGVDaG9pY2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRlbC5zZWxlY3QyKCkuZW1wdHkoKTtcblxuICAgICAgICBpZiAoc2V0dGluZ3MpIHtcbiAgICAgICAgICBpZiAoc2V0dGluZ3MuYWpheCkge1xuICAgICAgICAgICAgJGVsLnNlbGVjdDIoc2V0dGluZ3MpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXR0aW5ncy5kYXRhID0gcXVlc3Rpb24udmlzaWJsZUNob2ljZXMubWFwKGZ1bmN0aW9uKGNob2ljZSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiBjaG9pY2UudmFsdWUsXG4gICAgICAgICAgICAgICAgdGV4dDogY2hvaWNlLnRleHRcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGVsLnNlbGVjdDIoc2V0dGluZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZWwuc2VsZWN0Mih7XG4gICAgICAgICAgICBkYXRhOiBxdWVzdGlvbi52aXNpYmxlQ2hvaWNlcy5tYXAoZnVuY3Rpb24oY2hvaWNlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgaWQ6IGNob2ljZS52YWx1ZSxcbiAgICAgICAgICAgICAgICB0ZXh0OiBjaG9pY2UudGV4dFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZVZhbHVlSGFuZGxlcigpO1xuICAgICAgfTtcblxuICAgICAgcXVlc3Rpb24ucmVhZE9ubHlDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJGVsLnByb3AoXCJkaXNhYmxlZFwiLCBxdWVzdGlvbi5pc1JlYWRPbmx5KTtcbiAgICAgIH07XG5cbiAgICAgIHF1ZXN0aW9uLmNob2ljZXNDaGFuZ2VkQ2FsbGJhY2sgPSB1cGRhdGVDaG9pY2VzO1xuICAgICAgcXVlc3Rpb24udmFsdWVDaGFuZ2VkQ2FsbGJhY2sgPSB1cGRhdGVWYWx1ZUhhbmRsZXI7XG4gICAgICAkZWwub24oXCJzZWxlY3QyOnNlbGVjdFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHF1ZXN0aW9uLnZhbHVlID0gKHF1ZXN0aW9uLnZhbHVlIHx8IFtdKS5jb25jYXQoZS5wYXJhbXMuZGF0YS5pZCk7XG4gICAgICB9KTtcbiAgICAgICRlbC5vbihcInNlbGVjdDI6dW5zZWxlY3RcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgaW5kZXggPSAocXVlc3Rpb24udmFsdWUgfHwgW10pLmluZGV4T2YoZS5wYXJhbXMuZGF0YS5pZCk7XG4gICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICB2YXIgdmFsID0gcXVlc3Rpb24udmFsdWU7XG4gICAgICAgICAgdmFsLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgcXVlc3Rpb24udmFsdWUgPSB2YWw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdXBkYXRlQ2hvaWNlcygpO1xuICAgIH0sXG4gICAgd2lsbFVubW91bnQ6IGZ1bmN0aW9uKHF1ZXN0aW9uLCBlbCkge1xuICAgICAgJChlbClcbiAgICAgICAgLmZpbmQoXCJzZWxlY3RcIilcbiAgICAgICAgLm9mZihcInNlbGVjdDI6c2VsZWN0XCIpXG4gICAgICAgIC5zZWxlY3QyKFwiZGVzdHJveVwiKTtcbiAgICAgIHF1ZXN0aW9uLnJlYWRPbmx5Q2hhbmdlZENhbGxiYWNrID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgU3VydmV5LkN1c3RvbVdpZGdldENvbGxlY3Rpb24uSW5zdGFuY2UuYWRkQ3VzdG9tV2lkZ2V0KHdpZGdldCwgXCJjdXN0b210eXBlXCIpO1xufVxuXG5pZiAodHlwZW9mIFN1cnZleSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICBpbml0KFN1cnZleSwgd2luZG93LiQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2VsZWN0Mi10YWdib3guanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDgiLCJpbXBvcnQgU2lnbmF0dXJlUGFkIGZyb20gXCJzaWduYXR1cmVfcGFkXCI7XG5cbmZ1bmN0aW9uIHJlc2l6ZUNhbnZhcyhjYW52YXMpIHtcbiAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICB2YXIgZGV2aWNlUGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gIHZhciBiYWNraW5nU3RvcmVSYXRpbyA9XG4gICAgY29udGV4dC53ZWJraXRCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgY29udGV4dC5tb3pCYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgY29udGV4dC5tc0JhY2tpbmdTdG9yZVBpeGVsUmF0aW8gfHxcbiAgICBjb250ZXh0Lm9CYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgY29udGV4dC5iYWNraW5nU3RvcmVQaXhlbFJhdGlvIHx8XG4gICAgMTtcblxuICB2YXIgcmF0aW8gPSBkZXZpY2VQaXhlbFJhdGlvIC8gYmFja2luZ1N0b3JlUmF0aW87XG5cbiAgdmFyIG9sZFdpZHRoID0gY2FudmFzLndpZHRoO1xuICB2YXIgb2xkSGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcblxuICBjYW52YXMud2lkdGggPSBvbGRXaWR0aCAqIHJhdGlvO1xuICBjYW52YXMuaGVpZ2h0ID0gb2xkSGVpZ2h0ICogcmF0aW87XG5cbiAgY2FudmFzLnN0eWxlLndpZHRoID0gb2xkV2lkdGggKyBcInB4XCI7XG4gIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBvbGRIZWlnaHQgKyBcInB4XCI7XG5cbiAgY29udGV4dC5zY2FsZShyYXRpbywgcmF0aW8pO1xufVxuXG5mdW5jdGlvbiBpbml0KFN1cnZleSkge1xuICB2YXIgd2lkZ2V0ID0ge1xuICAgIG5hbWU6IFwic2lnbmF0dXJlcGFkXCIsXG4gICAgdGl0bGU6IFwiU2lnbmF0dXJlIHBhZFwiLFxuICAgIGljb25OYW1lOiBcImljb24tc2lnbmF0dXJlcGFkXCIsXG4gICAgd2lkZ2V0SXNMb2FkZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBTaWduYXR1cmVQYWQgIT0gXCJ1bmRlZmluZWRcIjtcbiAgICB9LFxuICAgIHBlbkNvbG9yOiBcIiMxYWIzOTRcIixcbiAgICBpc0ZpdDogZnVuY3Rpb24ocXVlc3Rpb24pIHtcbiAgICAgIHJldHVybiBxdWVzdGlvbi5nZXRUeXBlKCkgPT09IFwic2lnbmF0dXJlcGFkXCI7XG4gICAgfSxcbiAgICBodG1sVGVtcGxhdGU6XG4gICAgICBcIjxkaXYgY2xhc3M9J3Nqc19zcF9jb250YWluZXInPjxkaXY+PGNhbnZhcz48L2NhbnZhcz48L2Rpdj48ZGl2IGNsYXNzPSdzanNfc3BfY29udHJvbHMnPjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nc2pzX3NwX2NsZWFyJyB0aXRsZT0nQ2xlYXInPuKcljwvYnV0dG9uPjwvZGl2PjwvZGl2PjxzdHlsZT4uc2pzX3NwX2NvbnRhaW5lciB7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfSAuc2pzX3NwX2NvbnRyb2xzIHsgcG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiAwOyBib3R0b206IDA7IH0gLnNqc19zcF9jb250cm9scyA+IGJ1dHRvbiB7IHVzZXItc2VsZWN0OiBub25lOyB9PC9zdHlsZT5cIixcbiAgICBhY3RpdmF0ZWRCeUNoYW5nZWQ6IGZ1bmN0aW9uKGFjdGl2YXRlZEJ5KSB7XG4gICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcInNpZ25hdHVyZXBhZFwiLCBbXSwgbnVsbCwgXCJlbXB0eVwiKTtcbiAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZFByb3BlcnRpZXMoXCJzaWduYXR1cmVwYWRcIiwgW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJhbGxvd0NsZWFyOmJvb2xlYW5cIixcbiAgICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcIndpZHRoOm51bWJlclwiLFxuICAgICAgICAgIGRlZmF1bHQ6IDMwMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJoZWlnaHQ6bnVtYmVyXCIsXG4gICAgICAgICAgZGVmYXVsdDogMjAwXG4gICAgICAgIH1cbiAgICAgIF0pO1xuICAgIH0sXG4gICAgYWZ0ZXJSZW5kZXI6IGZ1bmN0aW9uKHF1ZXN0aW9uLCBlbCkge1xuICAgICAgdmFyIHJvb3RXaWRnZXQgPSB0aGlzO1xuICAgICAgdmFyIGNhbnZhcyA9IGVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiY2FudmFzXCIpWzBdO1xuICAgICAgdmFyIHNpZ25hdHVyZVBhZCA9IG5ldyBTaWduYXR1cmVQYWQoY2FudmFzKTtcbiAgICAgIGlmIChxdWVzdGlvbi5pc1JlYWRPbmx5KSB7XG4gICAgICAgIHNpZ25hdHVyZVBhZC5vZmYoKTtcbiAgICAgIH1cblxuICAgICAgcXVlc3Rpb24ucmVhZE9ubHlDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uLmlzUmVhZE9ubHkpIHtcbiAgICAgICAgICBzaWduYXR1cmVQYWQub2ZmKCk7XG4gICAgICAgICAgdmFyIGNsZWFyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zanNfc3BfY2xlYXJcIik7XG4gICAgICAgICAgY2xlYXJCdG4gJiYgKGNsZWFyQnRuLmRpc2FibGVkID0gdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2lnbmF0dXJlUGFkLm9uKCk7XG4gICAgICAgICAgdmFyIGNsZWFyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zanNfc3BfY2xlYXJcIik7XG4gICAgICAgICAgY2xlYXJCdG4gJiYgKGNsZWFyQnRuLmRpc2FibGVkID0gZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBzaWduYXR1cmVQYWQucGVuQ29sb3IgPSByb290V2lkZ2V0LnBlbkNvbG9yO1xuICAgICAgc2lnbmF0dXJlUGFkLm9uRW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkYXRhID0gc2lnbmF0dXJlUGFkLnRvRGF0YVVSTCgpO1xuICAgICAgICBxdWVzdGlvbi52YWx1ZSA9IGRhdGE7XG4gICAgICB9O1xuICAgICAgdmFyIHVwZGF0ZVZhbHVlSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHF1ZXN0aW9uLnZhbHVlO1xuICAgICAgICBjYW52YXMud2lkdGggPSBxdWVzdGlvbi53aWR0aDtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHF1ZXN0aW9uLmhlaWdodDtcbiAgICAgICAgcmVzaXplQ2FudmFzKGNhbnZhcyk7XG4gICAgICAgIHNpZ25hdHVyZVBhZC5mcm9tRGF0YVVSTChcbiAgICAgICAgICBkYXRhIHx8IFwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUFBUFwiXG4gICAgICAgICk7XG4gICAgICB9O1xuICAgICAgcXVlc3Rpb24udmFsdWVDaGFuZ2VkQ2FsbGJhY2sgPSB1cGRhdGVWYWx1ZUhhbmRsZXI7XG4gICAgICB1cGRhdGVWYWx1ZUhhbmRsZXIoKTtcbiAgICAgIHF1ZXN0aW9uLnNpZ25hdHVyZVBhZCA9IHNpZ25hdHVyZVBhZDtcbiAgICAgIHZhciBwcm9wZXJ0eUNoYW5nZWRIYW5kbGVyID0gZnVuY3Rpb24oc2VuZGVyLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zLm5hbWUgPT09IFwid2lkdGhcIiB8fCBvcHRpb25zLm5hbWUgPT09IFwiaGVpZ2h0XCIpIHtcbiAgICAgICAgICB1cGRhdGVWYWx1ZUhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHF1ZXN0aW9uLm9uUHJvcGVydHlDaGFuZ2VkLmFkZChwcm9wZXJ0eUNoYW5nZWRIYW5kbGVyKTtcbiAgICAgIHF1ZXN0aW9uLnNpZ25hdHVyZVBhZC5wcm9wZXJ0eUNoYW5nZWRIYW5kbGVyID0gcHJvcGVydHlDaGFuZ2VkSGFuZGxlcjtcbiAgICAgIHZhciBidXR0b25FbCA9IGVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnV0dG9uXCIpWzBdO1xuICAgICAgaWYgKHF1ZXN0aW9uLmFsbG93Q2xlYXIgJiYgIXF1ZXN0aW9uLmlzUmVhZE9ubHkpIHtcbiAgICAgICAgYnV0dG9uRWwub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHF1ZXN0aW9uLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnV0dG9uRWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChidXR0b25FbCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB3aWxsVW5tb3VudDogZnVuY3Rpb24ocXVlc3Rpb24sIGVsKSB7XG4gICAgICBpZiAocXVlc3Rpb24uc2lnbmF0dXJlUGFkKSB7XG4gICAgICAgIHF1ZXN0aW9uLm9uUHJvcGVydHlDaGFuZ2VkLnJlbW92ZShcbiAgICAgICAgICBxdWVzdGlvbi5zaWduYXR1cmVQYWQucHJvcGVydHlDaGFuZ2VkSGFuZGxlclxuICAgICAgICApO1xuICAgICAgICBxdWVzdGlvbi5zaWduYXR1cmVQYWQub2ZmKCk7XG4gICAgICB9XG4gICAgICBxdWVzdGlvbi5yZWFkT25seUNoYW5nZWRDYWxsYmFjayA9IG51bGw7XG4gICAgICBxdWVzdGlvbi5zaWduYXR1cmVQYWQgPSBudWxsO1xuICAgICAgcXVlc3Rpb24ucmVhZE9ubHlDaGFuZ2VkQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICBTdXJ2ZXkuQ3VzdG9tV2lkZ2V0Q29sbGVjdGlvbi5JbnN0YW5jZS5hZGRDdXN0b21XaWRnZXQod2lkZ2V0LCBcImN1c3RvbXR5cGVcIik7XG59XG5cbmlmICh0eXBlb2YgU3VydmV5ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIGluaXQoU3VydmV5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3NpZ25hdHVyZV9wYWQuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDMiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTBfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJTaWduYXR1cmVQYWRcIixcImNvbW1vbmpzMlwiOlwic2lnbmF0dXJlX3BhZFwiLFwiY29tbW9uanNcIjpcInNpZ25hdHVyZV9wYWRcIixcImFtZFwiOlwic2lnbmF0dXJlX3BhZFwifVxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDMiLCJpbXBvcnQgU29ydGFibGUgZnJvbSBcInNvcnRhYmxlanNcIjtcblxuZnVuY3Rpb24gaW5pdChTdXJ2ZXkpIHtcbiAgdmFyIHdpZGdldCA9IHtcbiAgICBuYW1lOiBcInNvcnRhYmxlbGlzdFwiLFxuICAgIHRpdGxlOiBcIlNvcnRhYmxlIGxpc3RcIixcbiAgICBpY29uTmFtZTogXCJpY29uLXNvcnRhYmxlanNcIixcbiAgICB3aWRnZXRJc0xvYWRlZDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIFNvcnRhYmxlICE9IFwidW5kZWZpbmVkXCI7XG4gICAgfSxcbiAgICBkZWZhdWx0SlNPTjogeyBjaG9pY2VzOiBbXCJJdGVtIDFcIiwgXCJJdGVtIDJcIiwgXCJJdGVtIDNcIl0gfSxcbiAgICByb290U3R5bGU6IFwid2lkdGg6MTAwJTpcIixcbiAgICBhcmVhU3R5bGU6XG4gICAgICBcImJvcmRlcjogMXB4IHNvbGlkICMxYWIzOTQ7IHdpZHRoOjEwMCU7IG1pbi1oZWlnaHQ6NTBweDsgbWFyZ2luLXRvcDoxMHB4O1wiLFxuICAgIGl0ZW1TdHlsZTogXCJiYWNrZ3JvdW5kLWNvbG9yOiMxYWIzOTQ7Y29sb3I6I2ZmZjttYXJnaW46NXB4O3BhZGRpbmc6MTBweDtcIixcbiAgICBpc0ZpdDogZnVuY3Rpb24ocXVlc3Rpb24pIHtcbiAgICAgIHJldHVybiBxdWVzdGlvbi5nZXRUeXBlKCkgPT09IFwic29ydGFibGVsaXN0XCI7XG4gICAgfSxcbiAgICBodG1sVGVtcGxhdGU6IFwiPGRpdj48L2Rpdj5cIixcbiAgICBhY3RpdmF0ZWRCeUNoYW5nZWQ6IGZ1bmN0aW9uKGFjdGl2YXRlZEJ5KSB7XG4gICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcbiAgICAgICAgXCJzb3J0YWJsZWxpc3RcIixcbiAgICAgICAgW1xuICAgICAgICAgIHsgbmFtZTogXCJoYXNPdGhlclwiLCB2aXNpYmxlOiBmYWxzZSB9LFxuICAgICAgICAgIHsgbmFtZTogXCJzdG9yZU90aGVyc0FzQ29tbWVudFwiLCB2aXNpYmxlOiBmYWxzZSB9XG4gICAgICAgIF0sXG4gICAgICAgIG51bGwsXG4gICAgICAgIFwiY2hlY2tib3hcIlxuICAgICAgKTtcbiAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZFByb3BlcnR5KFwic29ydGFibGVsaXN0XCIsIHtcbiAgICAgICAgbmFtZTogXCJlbXB0eVRleHRcIixcbiAgICAgICAgZGVmYXVsdDogXCJNb3ZlIGl0ZW1zIGhlcmUuXCJcbiAgICAgIH0pO1xuICAgICAgU3VydmV5Lkpzb25PYmplY3QubWV0YURhdGEuYWRkUHJvcGVydHkoXCJzb3J0YWJsZWxpc3RcIiwge1xuICAgICAgICBuYW1lOiBcInVzZURlZmF1bHRUaGVtZVwiLFxuICAgICAgICBkZWZhdWx0OiB0cnVlXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGFmdGVyUmVuZGVyOiBmdW5jdGlvbihxdWVzdGlvbiwgZWwpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgaWYgKCFxdWVzdGlvbi51c2VEZWZhdWx0VGhlbWUpIHtcbiAgICAgICAgc2VsZi5yb290U3R5bGUgPSBcIlwiO1xuICAgICAgICBzZWxmLml0ZW1TdHlsZSA9IFwiXCI7XG4gICAgICAgIHNlbGYuYXJlYVN0eWxlID0gXCJcIjtcbiAgICAgIH1cbiAgICAgIGVsLnN0eWxlLmNzc1RleHQgPSBzZWxmLnJvb3RTdHlsZTtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IFwic2pzLXNvcnRhYmxlanMtcm9vdFwiO1xuICAgICAgdmFyIHNvdXJjZSwgcmVzdWx0O1xuICAgICAgdmFyIHJlc3VsdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHZhciBlbXB0eUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICB2YXIgc291cmNlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICByZXN1bHRFbC5zdHlsZS5jc3NUZXh0ID0gc2VsZi5hcmVhU3R5bGU7XG4gICAgICByZXN1bHRFbC5jbGFzc05hbWUgPSBcInNqcy1zb3J0YWJsZWpzLXJlc3VsdFwiO1xuXG4gICAgICBlbXB0eUVsLmlubmVySFRNTCA9IHF1ZXN0aW9uLmVtcHR5VGV4dDtcbiAgICAgIHJlc3VsdEVsLmFwcGVuZENoaWxkKGVtcHR5RWwpO1xuXG4gICAgICBzb3VyY2VFbC5zdHlsZS5jc3NUZXh0ID0gc2VsZi5hcmVhU3R5bGU7XG4gICAgICBzb3VyY2VFbC5jbGFzc05hbWUgPSBcInNqcy1zb3J0YWJsZWpzLXNvdXJjZVwiO1xuXG4gICAgICBlbC5hcHBlbmRDaGlsZChyZXN1bHRFbCk7XG4gICAgICBlbC5hcHBlbmRDaGlsZChzb3VyY2VFbCk7XG4gICAgICB2YXIgaGFzVmFsdWVJblJlc3VsdHMgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgdmFyIHJlcyA9IHF1ZXN0aW9uLnZhbHVlO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVzKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChyZXNbaV0gPT0gdmFsKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuICAgICAgdmFyIGFkZENob2ljZVRvV2lkZ2V0ID0gZnVuY3Rpb24oY2hvaWNlLCBpblJlc3VsdHMpIHtcbiAgICAgICAgdmFyIHNyY0VsID0gaW5SZXN1bHRzID8gcmVzdWx0RWwgOiBzb3VyY2VFbDtcbiAgICAgICAgdmFyIG5ld0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbmV3RWwuaW5uZXJIVE1MID1cbiAgICAgICAgICBcIjxkaXYgY2xhc3M9J3Nqcy1zb3J0YWJsZWpzLWl0ZW0nIHN0eWxlPSdcIiArXG4gICAgICAgICAgc2VsZi5pdGVtU3R5bGUgK1xuICAgICAgICAgIFwiJz5cIiArXG4gICAgICAgICAgY2hvaWNlLnRleHQgK1xuICAgICAgICAgIFwiPC9kaXY+XCI7XG4gICAgICAgIG5ld0VsLmRhdGFzZXRbXCJ2YWx1ZVwiXSA9IGNob2ljZS52YWx1ZTtcbiAgICAgICAgc3JjRWwuYXBwZW5kQ2hpbGQobmV3RWwpO1xuICAgICAgfTtcbiAgICAgIHZhciBnZXRDaG9pY2VzTm90SW5SZXN1bHRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgICAgcXVlc3Rpb24uYWN0aXZlQ2hvaWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGNob2ljZSkge1xuICAgICAgICAgIGlmICghaGFzVmFsdWVJblJlc3VsdHMoY2hvaWNlLnZhbHVlKSkge1xuICAgICAgICAgICAgcmVzLnB1c2goY2hvaWNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfTtcbiAgICAgIHZhciBnZXRDaG9pY2VzSW5SZXN1bHRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgICAgdmFyIHZhbCA9IHF1ZXN0aW9uLnZhbHVlO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsKSkgcmV0dXJuIHJlcztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgaXRlbSA9IFN1cnZleS5JdGVtVmFsdWUuZ2V0SXRlbUJ5VmFsdWUoXG4gICAgICAgICAgICBxdWVzdGlvbi5hY3RpdmVDaG9pY2VzLFxuICAgICAgICAgICAgdmFsW2ldXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoISFpdGVtKSB7XG4gICAgICAgICAgICByZXMucHVzaChpdGVtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH07XG4gICAgICB2YXIgaXNVcGRhdGluZ1F1ZXN0aW9uVmFsdWUgPSBmYWxzZTtcbiAgICAgIHZhciB1cGRhdGVWYWx1ZUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzVXBkYXRpbmdRdWVzdGlvblZhbHVlKSByZXR1cm47XG4gICAgICAgIHJlc3VsdEVsLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIHJlc3VsdEVsLmFwcGVuZENoaWxkKGVtcHR5RWwpO1xuICAgICAgICBzb3VyY2VFbC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICB2YXIgbm90SW5SZXN1bHRzID0gZ2V0Q2hvaWNlc05vdEluUmVzdWx0cygpO1xuICAgICAgICB2YXIgaW5SZXN1bHRzID0gZ2V0Q2hvaWNlc0luUmVzdWx0cygpO1xuICAgICAgICBlbXB0eUVsLnN0eWxlLmRpc3BsYXkgPSBpblJlc3VsdHMubGVuZ3RoID4gMCA/IFwibm9uZVwiIDogXCJcIjtcbiAgICAgICAgaW5SZXN1bHRzLmZvckVhY2goZnVuY3Rpb24oY2hvaWNlKSB7XG4gICAgICAgICAgYWRkQ2hvaWNlVG9XaWRnZXQoY2hvaWNlLCB0cnVlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG5vdEluUmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKGNob2ljZSkge1xuICAgICAgICAgIGFkZENob2ljZVRvV2lkZ2V0KGNob2ljZSwgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgICByZXN1bHQgPSBxdWVzdGlvbi5yZXN1bHRFbCA9IFNvcnRhYmxlLmNyZWF0ZShyZXN1bHRFbCwge1xuICAgICAgICBhbmltYXRpb246IDE1MCxcbiAgICAgICAgZGlzYWJsZWQ6IHF1ZXN0aW9uLmlzUmVhZE9ubHksXG4gICAgICAgIGdyb3VwOiBxdWVzdGlvbi5uYW1lLFxuICAgICAgICBvblNvcnQ6IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgICBpZiAocmVzdWx0RWwuY2hpbGRyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBlbXB0eUVsLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbXB0eUVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0RWwuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHRFbC5jaGlsZHJlbltpXS5kYXRhc2V0LnZhbHVlID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICByZXN1bHQucHVzaChyZXN1bHRFbC5jaGlsZHJlbltpXS5kYXRhc2V0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaXNVcGRhdGluZ1F1ZXN0aW9uVmFsdWUgPSB0cnVlO1xuICAgICAgICAgIHF1ZXN0aW9uLnZhbHVlID0gcmVzdWx0O1xuICAgICAgICAgIGlzVXBkYXRpbmdRdWVzdGlvblZhbHVlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgc291cmNlID0gcXVlc3Rpb24uc291cmNlRWwgPSBTb3J0YWJsZS5jcmVhdGUoc291cmNlRWwsIHtcbiAgICAgICAgYW5pbWF0aW9uOiAxNTAsXG4gICAgICAgIGRpc2FibGVkOiBxdWVzdGlvbi5pc1JlYWRPbmx5LFxuICAgICAgICBncm91cDogcXVlc3Rpb24ubmFtZVxuICAgICAgfSk7XG4gICAgICBxdWVzdGlvbi52YWx1ZUNoYW5nZWRDYWxsYmFjayA9IHVwZGF0ZVZhbHVlSGFuZGxlcjtcbiAgICAgIHF1ZXN0aW9uLnJlYWRPbmx5Q2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChxdWVzdGlvbi5pc1JlYWRPbmx5KSB7XG4gICAgICAgICAgcmVzdWx0Lm9wdGlvbnMuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgIHNvdXJjZS5vcHRpb25zLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQub3B0aW9ucy5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgIHNvdXJjZS5vcHRpb25zLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB1cGRhdGVWYWx1ZUhhbmRsZXIoKTtcbiAgICB9LFxuICAgIHdpbGxVbm1vdW50OiBmdW5jdGlvbihxdWVzdGlvbiwgZWwpIHtcbiAgICAgIHF1ZXN0aW9uLnJlc3VsdEVsLmRlc3Ryb3koKTtcbiAgICAgIHF1ZXN0aW9uLnNvdXJjZUVsLmRlc3Ryb3koKTtcbiAgICAgIHF1ZXN0aW9uLnJlYWRPbmx5Q2hhbmdlZENhbGxiYWNrID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgU3VydmV5LkN1c3RvbVdpZGdldENvbGxlY3Rpb24uSW5zdGFuY2UuYWRkQ3VzdG9tV2lkZ2V0KHdpZGdldCwgXCJjdXN0b210eXBlXCIpO1xufVxuXG5pZiAodHlwZW9mIFN1cnZleSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICBpbml0KFN1cnZleSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zb3J0YWJsZWpzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xMl9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIlNvcnRhYmxlXCIsXCJjb21tb25qczJcIjpcInNvcnRhYmxlanNcIixcImNvbW1vbmpzXCI6XCJzb3J0YWJsZWpzXCIsXCJhbWRcIjpcInNvcnRhYmxlanNcIn1cbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIiwiZnVuY3Rpb24gaW5pdChTdXJ2ZXkpIHtcbiAgdmFyIHdpZGdldCA9IHtcbiAgICBuYW1lOiBcImVkaXRvclwiLFxuICAgIHRpdGxlOiBcIkVkaXRvclwiLFxuICAgIGljb25OYW1lOiBcImljb24tZWRpdG9yXCIsXG4gICAgd2lkZ2V0SXNMb2FkZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBDS0VESVRPUiAhPSBcInVuZGVmaW5lZFwiO1xuICAgIH0sXG4gICAgaXNGaXQ6IGZ1bmN0aW9uKHF1ZXN0aW9uKSB7XG4gICAgICByZXR1cm4gcXVlc3Rpb24uZ2V0VHlwZSgpID09PSBcImVkaXRvclwiO1xuICAgIH0sXG4gICAgaHRtbFRlbXBsYXRlOlxuICAgICAgXCI8dGV4dGFyZWEgcm93cz0nMTAnIGNvbHM9JzgwJyBzdHlsZToge3dpZHRoOicxMDAlJ30+PC90ZXh0YXJlYT5cIixcbiAgICBhY3RpdmF0ZWRCeUNoYW5nZWQ6IGZ1bmN0aW9uKGFjdGl2YXRlZEJ5KSB7XG4gICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcImVkaXRvclwiLCBbXSwgbnVsbCwgXCJlbXB0eVwiKTtcbiAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZFByb3BlcnR5KFwiZWRpdG9yXCIsIHtcbiAgICAgICAgbmFtZTogXCJoZWlnaHRcIixcbiAgICAgICAgZGVmYXVsdDogMzAwXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGFmdGVyUmVuZGVyOiBmdW5jdGlvbihxdWVzdGlvbiwgZWwpIHtcbiAgICAgIENLRURJVE9SLmVkaXRvckNvbmZpZyA9IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgICAgICBjb25maWcubGFuZ3VhZ2UgPSBcImVzXCI7XG4gICAgICAgIGNvbmZpZy5oZWlnaHQgPSBxdWVzdGlvbi5oZWlnaHQ7XG4gICAgICAgIGNvbmZpZy50b29sYmFyQ2FuQ29sbGFwc2UgPSB0cnVlO1xuICAgICAgfTtcbiAgICAgIHZhciBlZGl0b3IgPSBDS0VESVRPUi5yZXBsYWNlKGVsKTtcbiAgICAgIENLRURJVE9SLmluc3RhbmNlcy5lZGl0b3IxLmNvbmZpZy5yZWFkT25seSA9IHF1ZXN0aW9uLmlzUmVhZE9ubHk7XG5cbiAgICAgIHZhciBpc1ZhbHVlQ2hhbmdpbmcgPSBmYWxzZTtcbiAgICAgIHZhciB1cGRhdGVWYWx1ZUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzVmFsdWVDaGFuZ2luZykgcmV0dXJuO1xuICAgICAgICBlZGl0b3Iuc2V0RGF0YShxdWVzdGlvbi52YWx1ZSk7XG4gICAgICB9O1xuICAgICAgZWRpdG9yLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpc1ZhbHVlQ2hhbmdpbmcgPSB0cnVlO1xuICAgICAgICBxdWVzdGlvbi52YWx1ZSA9IGVkaXRvci5nZXREYXRhKCk7XG4gICAgICAgIGlzVmFsdWVDaGFuZ2luZyA9IGZhbHNlO1xuICAgICAgfSk7XG5cbiAgICAgIHF1ZXN0aW9uLnZhbHVlQ2hhbmdlZENhbGxiYWNrID0gdXBkYXRlVmFsdWVIYW5kbGVyO1xuICAgICAgcXVlc3Rpb24ucmVhZE9ubHlDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uLmlzUmVhZE9ubHkpIHtcbiAgICAgICAgICBlZGl0b3Iuc2V0UmVhZE9ubHkodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWRpdG9yLnNldFJlYWRPbmx5KGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHVwZGF0ZVZhbHVlSGFuZGxlcigpO1xuICAgIH0sXG4gICAgd2lsbFVubW91bnQ6IGZ1bmN0aW9uKHF1ZXN0aW9uLCBlbCkge1xuICAgICAgcXVlc3Rpb24ucmVhZE9ubHlDaGFuZ2VkQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICBTdXJ2ZXkuQ3VzdG9tV2lkZ2V0Q29sbGVjdGlvbi5JbnN0YW5jZS5hZGRDdXN0b21XaWRnZXQod2lkZ2V0LCBcImN1c3RvbXR5cGVcIik7XG59XG5cbmlmICh0eXBlb2YgU3VydmV5ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIGluaXQoU3VydmV5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NrLWVkaXRvci5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDE0IiwiZnVuY3Rpb24gaW5pdChTdXJ2ZXksICQpIHtcbiAgJCA9ICQgfHwgd2luZG93LiQ7XG4gIHZhciB3aWRnZXQgPSB7XG4gICAgbmFtZTogXCJhdXRvY29tcGxldGVcIixcbiAgICB3aWRnZXRJc0xvYWRlZDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHlwZW9mICQgPT0gXCJmdW5jdGlvblwiICYmICEhJC5mbi5lYXN5QXV0b2NvbXBsZXRlO1xuICAgIH0sXG4gICAgaXNGaXQ6IGZ1bmN0aW9uKHF1ZXN0aW9uKSB7XG4gICAgICByZXR1cm4gcXVlc3Rpb24uZ2V0VHlwZSgpID09PSBcInRleHRcIjtcbiAgICB9LFxuICAgIGlzRGVmYXVsdFJlbmRlcjogdHJ1ZSxcbiAgICBhY3RpdmF0ZWRCeUNoYW5nZWQ6IGZ1bmN0aW9uKGFjdGl2YXRlZEJ5KSB7XG4gICAgICBpZiAoXG4gICAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmZpbmRQcm9wZXJ0eShcInRleHRcIiwgXCJjaG9pY2VzXCIpICE9PSBudWxsIHx8XG4gICAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmZpbmRQcm9wZXJ0eShcInRleHRcIiwgXCJjaG9pY2VzQnlVcmxcIikgIT09IG51bGxcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRQcm9wZXJ0eShcInRleHRcIiwge1xuICAgICAgICBuYW1lOiBcImNob2ljZXM6aXRlbXZhbHVlc1wiLFxuICAgICAgICBvbkdldFZhbHVlOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgICByZXR1cm4gU3VydmV5Lkl0ZW1WYWx1ZS5nZXREYXRhKG9iai5jaG9pY2VzIHx8IFtdKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TZXRWYWx1ZTogZnVuY3Rpb24ob2JqLCB2YWx1ZSkge1xuICAgICAgICAgIGlmICghb2JqLmNob2ljZXMpIHtcbiAgICAgICAgICAgIG9iai5jaG9pY2VzID0gb2JqLmNyZWF0ZUl0ZW1WYWx1ZXMoXCJjaG9pY2VzXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvYmouY2hvaWNlcyA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZFByb3BlcnR5KFwidGV4dFwiLCB7XG4gICAgICAgIG5hbWU6IFwiY2hvaWNlc0J5VXJsOnJlc3RmdWxsXCIsXG4gICAgICAgIGNsYXNzTmFtZTogXCJDaG9pY2VzUmVzdGZ1bGxcIixcbiAgICAgICAgb25HZXRWYWx1ZTogZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgICAgcmV0dXJuIG9iaiAmJiBvYmouY2hvaWNlc0J5VXJsICYmIG9iai5jaG9pY2VzQnlVcmwuZ2V0RGF0YSgpO1xuICAgICAgICB9LFxuICAgICAgICBvblNldFZhbHVlOiBmdW5jdGlvbihvYmosIHZhbHVlKSB7XG4gICAgICAgICAgaWYgKCFvYmouY2hvaWNlc0J5VXJsKSB7XG4gICAgICAgICAgICBvYmouY2hvaWNlc0J5VXJsID0gbmV3IFN1cnZleS5DaG9pY2VzUmVzdGZ1bGwoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb2JqLmNob2ljZXNCeVVybC5zZXREYXRhKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBhZnRlclJlbmRlcjogZnVuY3Rpb24ocXVlc3Rpb24sIGVsKSB7XG4gICAgICB2YXIgJGVsID0gJChlbCkuaXMoXCJpbnB1dFwiKSA/ICQoZWwpIDogJChlbCkuZmluZChcImlucHV0XCIpO1xuICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIGRhdGE6IChxdWVzdGlvbi5jaG9pY2VzIHx8IFtdKS5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHJldHVybiBpdGVtLmdldERhdGEoKTtcbiAgICAgICAgfSksXG4gICAgICAgIGFkanVzdFdpZHRoOiBmYWxzZSxcbiAgICAgICAgbGlzdDoge1xuICAgICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1hdGNoOiB7XG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwbGFjZWhvbGRlcjogcXVlc3Rpb24ucGxhY2Vob2xkZXJcbiAgICAgIH07XG4gICAgICBpZiAoISFxdWVzdGlvbi5jaG9pY2VzQnlVcmwpIHtcbiAgICAgICAgb3B0aW9ucy51cmwgPSBmdW5jdGlvbihwaHJhc2UpIHtcbiAgICAgICAgICByZXR1cm4gcXVlc3Rpb24uY2hvaWNlc0J5VXJsLnVybDtcbiAgICAgICAgfTtcbiAgICAgICAgb3B0aW9ucy5nZXRWYWx1ZSA9IHF1ZXN0aW9uLmNob2ljZXNCeVVybC52YWx1ZU5hbWU7XG4gICAgICAgIC8vIG9wdGlvbnMuYWpheFNldHRpbmdzID0ge1xuICAgICAgICAvLyAgIGRhdGFUeXBlOiBcImpzb25wXCJcbiAgICAgICAgLy8gfTtcbiAgICAgIH1cbiAgICAgICRlbC5lYXN5QXV0b2NvbXBsZXRlKG9wdGlvbnMpO1xuICAgIH0sXG4gICAgd2lsbFVubW91bnQ6IGZ1bmN0aW9uKHF1ZXN0aW9uLCBlbCkge1xuICAgICAgLy8gdmFyICRlbCA9ICQoZWwpLmZpbmQoXCJpbnB1dFwiKTtcbiAgICAgIC8vICRlbC5hdXRvY29tcGxldGUoXCJkZXN0cm95XCIpO1xuICAgIH1cbiAgfTtcblxuICBTdXJ2ZXkuQ3VzdG9tV2lkZ2V0Q29sbGVjdGlvbi5JbnN0YW5jZS5hZGRDdXN0b21XaWRnZXQod2lkZ2V0LCBcInR5cGVcIik7XG59XG5cbmlmICh0eXBlb2YgU3VydmV5ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIGluaXQoU3VydmV5LCB3aW5kb3cuJCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGluaXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9lYXN5LWF1dG9jb21wbGV0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEzIiwiZnVuY3Rpb24gaW5pdChTdXJ2ZXkpIHtcbiAgdmFyIHdpZGdldCA9IHtcbiAgICBzZXR0aW5nczoge1xuICAgICAgc3VwcG9ydGVkVHlwZXM6IFtcInJhZGlvZ3JvdXBcIiwgXCJjaGVja2JveFwiLCBcImJvb2xlYW5cIl0sXG4gICAgICByYWRpb2dyb3VwOiB7XG4gICAgICAgIHJvb3RDbGFzczogXCJwcmV0dHkgcC1kZWZhdWx0IHAtcm91bmRcIixcbiAgICAgICAgaW5wdXRUeXBlOiBcInJhZGlvXCIsXG4gICAgICAgIHN0YXRlczogW3sgc3RhdGVDbGFzczogXCJzdGF0ZSBwLXN1Y2Nlc3NcIiwgYWRkT246IFwiXCIgfV1cbiAgICAgIH0sXG4gICAgICBjaGVja2JveDoge1xuICAgICAgICByb290Q2xhc3M6IFwicHJldHR5IHAtZGVmYXVsdFwiLFxuICAgICAgICBpbnB1dFR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgICAgc3RhdGVzOiBbeyBzdGF0ZUNsYXNzOiBcInN0YXRlIHAtc3VjY2Vzc1wiLCBhZGRPbjogXCJcIiB9XVxuICAgICAgfSxcbiAgICAgIGJvb2xlYW46IHtcbiAgICAgICAgcm9vdENsYXNzOiBcInByZXR0eSBwLWljb24gcC1kZWZhdWx0IHAtaGFzLWluZGV0ZXJtaW5hdGVcIixcbiAgICAgICAgaW5wdXRUeXBlOiBcImNoZWNrYm94XCIsXG4gICAgICAgIHN0YXRlczogW1xuICAgICAgICAgIHsgc3RhdGVDbGFzczogXCJzdGF0ZSBwLXN1Y2Nlc3NcIiwgYWRkT246IFwiXCIgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0ZUNsYXNzOiBcInN0YXRlIHAtc3VjY2VzcyBwLWlzLWluZGV0ZXJtaW5hdGVcIixcbiAgICAgICAgICAgIGljb25DbGFzczogXCJpY29uIG1kaSBtZGktbWludXNcIixcbiAgICAgICAgICAgIGFkZE9uOiBcIlwiXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9XG4gICAgfSxcbiAgICBuYW1lOiBcInByZXR0eS1jaGVja2JveFwiLFxuICAgIGFjdGl2YXRlZEJ5OiBcInByb3BlcnR5XCIsXG4gICAgd2lkZ2V0SXNMb2FkZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBodG1sVGVtcGxhdGU6IFwiPGZpZWxkc2V0PjwvZmllbGRzZXQ+XCIsXG4gICAgaXNGaXQ6IGZ1bmN0aW9uKHF1ZXN0aW9uKSB7XG4gICAgICB2YXIgaXNGaXRCeVR5cGUgPVxuICAgICAgICB3aWRnZXQuc2V0dGluZ3Muc3VwcG9ydGVkVHlwZXMuaW5kZXhPZihxdWVzdGlvbi5nZXRUeXBlKCkpICE9PSAtMTtcblxuICAgICAgaWYgKHdpZGdldC5hY3RpdmF0ZWRCeSA9PT0gXCJwcm9wZXJ0eVwiKSB7XG4gICAgICAgIHJldHVybiBxdWVzdGlvbltcInJlbmRlckFzXCJdID09PSBcInByZXR0eWNoZWNrYm94XCIgJiYgaXNGaXRCeVR5cGU7XG4gICAgICB9IGVsc2UgaWYgKHdpZGdldC5hY3RpdmF0ZWRCeSA9PT0gXCJ0eXBlXCIpIHtcbiAgICAgICAgcmV0dXJuIGlzRml0QnlUeXBlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBhY3RpdmF0ZWRCeUNoYW5nZWQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICBpZiAodGhpcy53aWRnZXRJc0xvYWRlZCgpKSB7XG4gICAgICAgIHdpZGdldC5hY3RpdmF0ZWRCeSA9IHZhbHVlO1xuICAgICAgICB3aWRnZXQuc2V0dGluZ3Muc3VwcG9ydGVkVHlwZXMuZm9yRWFjaChmdW5jdGlvbihzdXBwb3J0ZWRUeXBlKSB7XG4gICAgICAgICAgU3VydmV5Lkpzb25PYmplY3QubWV0YURhdGEucmVtb3ZlUHJvcGVydHkoc3VwcG9ydGVkVHlwZSwgXCJyZW5kZXJBc1wiKTtcblxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gXCJwcm9wZXJ0eVwiKSB7XG4gICAgICAgICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRQcm9wZXJ0eShzdXBwb3J0ZWRUeXBlLCB7XG4gICAgICAgICAgICAgIG5hbWU6IFwicmVuZGVyQXNcIixcbiAgICAgICAgICAgICAgZGVmYXVsdDogXCJzdGFuZGFyZFwiLFxuICAgICAgICAgICAgICBjaG9pY2VzOiBbXCJzdGFuZGFyZFwiLCBcInByZXR0eWNoZWNrYm94XCJdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXNEZWZhdWx0UmVuZGVyOiBmYWxzZSxcbiAgICBhZnRlclJlbmRlcjogZnVuY3Rpb24ocXVlc3Rpb24sIGVsZW1lbnQpIHtcbiAgICAgIHZhciBpdGVtSW5wdXRzID0ge307XG4gICAgICB2YXIgcXVlc3Rpb25UeXBlID0gcXVlc3Rpb24uZ2V0VHlwZSgpO1xuICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLnNldHRpbmdzW3F1ZXN0aW9uVHlwZV07XG4gICAgICB2YXIgY2hlY2tib3hUeXBlID0gcXVlc3Rpb25UeXBlID09PSBcImNoZWNrYm94XCI7XG4gICAgICB2YXIgcmFkaW9ncm91cFR5cGUgPSBxdWVzdGlvblR5cGUgPT09IFwicmFkaW9ncm91cFwiO1xuICAgICAgdmFyIGJvb2xlYW5UeXBlID0gcXVlc3Rpb25UeXBlID09PSBcImJvb2xlYW5cIjtcblxuICAgICAgdmFyIGluQ2hhbmdlSGFuZGxlciA9IGZhbHNlO1xuICAgICAgdmFyIGNoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpbkNoYW5nZUhhbmRsZXIgPSB0cnVlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbMF0udGFyZ2V0O1xuICAgICAgICAgIHZhciB0YXJnZXRWYWx1ZSA9IHRhcmdldC52YWx1ZTtcbiAgICAgICAgICB2YXIgdGFyZ2V0Q2hlY2tlZCA9IHRhcmdldC5jaGVja2VkO1xuXG4gICAgICAgICAgaWYgKGNoZWNrYm94VHlwZSkge1xuICAgICAgICAgICAgdmFyIHF1ZXN0aW9uVmFsdWUgPSBxdWVzdGlvbi52YWx1ZSB8fCBbXTtcbiAgICAgICAgICAgIHZhciB2YWx1ZUluZGV4ID0gcXVlc3Rpb25WYWx1ZS5pbmRleE9mKHRhcmdldFZhbHVlKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXRDaGVja2VkKSB7XG4gICAgICAgICAgICAgIGlmICh2YWx1ZUluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHF1ZXN0aW9uVmFsdWUucHVzaCh0YXJnZXRWYWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmICh2YWx1ZUluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHF1ZXN0aW9uVmFsdWUuc3BsaWNlKHZhbHVlSW5kZXgsIDEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHF1ZXN0aW9uLnZhbHVlID0gcXVlc3Rpb25WYWx1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJhZGlvZ3JvdXBUeXBlKSB7XG4gICAgICAgICAgICBxdWVzdGlvbi52YWx1ZSA9IHRhcmdldFZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBxdWVzdGlvbi52YWx1ZSA9IHRhcmdldENoZWNrZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGluQ2hhbmdlSGFuZGxlciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICB2YXIgaXRlbVdpZHRoID1cbiAgICAgICAgcXVlc3Rpb24uY29sQ291bnQgPiAwID8gMTAwIC8gcXVlc3Rpb24uY29sQ291bnQgKyBcIiVcIiA6IFwiXCI7XG5cbiAgICAgIHZhciBjaG9pY2VzID0gYm9vbGVhblR5cGVcbiAgICAgICAgPyBbeyBsb2NUZXh0OiBxdWVzdGlvbi5sb2NUaXRsZSwgdmFsdWU6ICEhcXVlc3Rpb24udmFsdWUgfV1cbiAgICAgICAgOiBxdWVzdGlvbi5jaG9pY2VzO1xuICAgICAgY2hvaWNlcy5mb3JFYWNoKGZ1bmN0aW9uKGNob2ljZUl0ZW0sIGluZGV4KSB7XG4gICAgICAgIHZhciBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgaW5wdXQudHlwZSA9IG9wdGlvbnMuaW5wdXRUeXBlO1xuICAgICAgICBpbnB1dC5uYW1lID0gcXVlc3Rpb24ubmFtZSArIChjaGVja2JveFR5cGUgPyBcIlwiICsgaW5kZXggOiBcIlwiKTtcbiAgICAgICAgaW5wdXQub25jaGFuZ2UgPSBjaGFuZ2VIYW5kbGVyO1xuICAgICAgICBpbnB1dC52YWx1ZSA9IGNob2ljZUl0ZW0udmFsdWU7XG5cbiAgICAgICAgaWYgKGJvb2xlYW5UeXBlKSB7XG4gICAgICAgICAgaW5wdXQuaW5kZXRlcm1pbmF0ZSA9IHF1ZXN0aW9uLmRlZmF1bHRWYWx1ZSA9PT0gXCJpbmRldGVybWluYXRlXCI7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29udHJvbFJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjb250cm9sUm9vdC5jbGFzc05hbWUgPSBvcHRpb25zLnJvb3RDbGFzcztcbiAgICAgICAgY29udHJvbFJvb3QuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXG4gICAgICAgIG9wdGlvbnMuc3RhdGVzLmZvckVhY2goZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICB2YXIgc3RhdGVSb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICBzdGF0ZVJvb3QuY2xhc3NOYW1lID0gc3RhdGUuc3RhdGVDbGFzcztcbiAgICAgICAgICBpZiAoISFzdGF0ZS5pY29uQ2xhc3MpIHtcbiAgICAgICAgICAgIHZhciBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgICAgICAgICBpY29uLmNsYXNzTmFtZSA9IHN0YXRlLmljb25DbGFzcztcbiAgICAgICAgICAgIHN0YXRlUm9vdC5hcHBlbmRDaGlsZChpY29uKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgICAgaWYgKGNob2ljZUl0ZW0ubG9jVGV4dC5oYXNIdG1sKSB7XG4gICAgICAgICAgICBsYWJlbC5pbm5lckhUTUwgPSBjaG9pY2VJdGVtLmxvY1RleHQuaHRtbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGFiZWwudGV4dENvbnRlbnQgPSBjaG9pY2VJdGVtLmxvY1RleHQudGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhdGVSb290LmFwcGVuZENoaWxkKGxhYmVsKTtcblxuICAgICAgICAgIGNvbnRyb2xSb290LmFwcGVuZENoaWxkKHN0YXRlUm9vdCk7XG4gICAgICAgICAgaWYgKCEhc3RhdGUuYWRkT24pIHtcbiAgICAgICAgICAgIHN0YXRlUm9vdC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmJlZ2luXCIsIHN0YXRlLmFkZE9uKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBpdGVtUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGl0ZW1Sb290LmNsYXNzTmFtZSA9IFwic3ZfY3dfcHJldHR5X2NoZWNrYm94X1wiICsgcXVlc3Rpb25UeXBlO1xuICAgICAgICBpdGVtUm9vdC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmUtYmxvY2tcIjtcbiAgICAgICAgaXRlbVJvb3Quc3R5bGUud2lkdGggPSBpdGVtV2lkdGg7XG4gICAgICAgIGl0ZW1Sb290LmFwcGVuZENoaWxkKGNvbnRyb2xSb290KTtcblxuICAgICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGl0ZW1Sb290KTtcblxuICAgICAgICBpdGVtSW5wdXRzW2Nob2ljZUl0ZW0udmFsdWVdID0gaW5wdXQ7XG4gICAgICB9KTtcblxuICAgICAgdmFyIHVwZGF0ZVZhbHVlSGFuZGxlciA9IGZ1bmN0aW9uKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmICghaW5DaGFuZ2VIYW5kbGVyKSB7XG4gICAgICAgICAgdmFyIGNoZWNrZWRJdGVtcyA9IG5ld1ZhbHVlIHx8IFtdO1xuICAgICAgICAgIGlmIChyYWRpb2dyb3VwVHlwZSkge1xuICAgICAgICAgICAgY2hlY2tlZEl0ZW1zID0gW25ld1ZhbHVlXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBPYmplY3QudmFsdWVzKGl0ZW1JbnB1dHMpLmZvckVhY2goZnVuY3Rpb24oaW5wdXRJdGVtKSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tlZEl0ZW1zLmluZGV4T2YoaW5wdXRJdGVtLnZhbHVlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgaW5wdXRJdGVtLnNldEF0dHJpYnV0ZShcImNoZWNrZWRcIiwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlucHV0SXRlbS5yZW1vdmVBdHRyaWJ1dGUoXCJjaGVja2VkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdmFyIHJlYWRPbmx5SGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBPYmplY3QudmFsdWVzKGl0ZW1JbnB1dHMpLmZvckVhY2goZnVuY3Rpb24oaW5wdXRJdGVtKSB7XG4gICAgICAgICAgaWYgKHF1ZXN0aW9uLmlzUmVhZE9ubHkpIHtcbiAgICAgICAgICAgIGlucHV0SXRlbS5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5wdXRJdGVtLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICBxdWVzdGlvbi52YWx1ZUNoYW5nZWRDYWxsYmFjayA9IHVwZGF0ZVZhbHVlSGFuZGxlcjtcbiAgICAgIHF1ZXN0aW9uLnJlYWRPbmx5Q2hhbmdlZENhbGxiYWNrID0gcmVhZE9ubHlIYW5kbGVyO1xuICAgICAgdXBkYXRlVmFsdWVIYW5kbGVyKHF1ZXN0aW9uLnZhbHVlKTtcbiAgICAgIHJlYWRPbmx5SGFuZGxlcigpO1xuICAgIH0sXG4gICAgd2lsbFVubW91bnQ6IGZ1bmN0aW9uKHF1ZXN0aW9uLCBlbCkge1xuICAgICAgcXVlc3Rpb24udmFsdWVDaGFuZ2VkQ2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9O1xuXG4gIFN1cnZleS5DdXN0b21XaWRnZXRDb2xsZWN0aW9uLkluc3RhbmNlLmFkZEN1c3RvbVdpZGdldCh3aWRnZXQsIFwicHJvcGVydHlcIik7XG59XG5cbmlmICh0eXBlb2YgU3VydmV5ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIGluaXQoU3VydmV5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ByZXR0eS1jaGVja2JveC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDkiLCJ2YXIgU2xpZGVyID0gcmVxdWlyZShcImJvb3RzdHJhcC1zbGlkZXJcIik7XG5cbmZ1bmN0aW9uIGluaXQoU3VydmV5KSB7XG4gIHZhciB3aWRnZXQgPSB7XG4gICAgbmFtZTogXCJib290c3RyYXBzbGlkZXJcIixcbiAgICB0aXRsZTogXCJCb290c3RyYXAgU2xpZGVyXCIsXG4gICAgaWNvbk5hbWU6IFwiaWNvbi1ib290c3RyYXAtc2xpZGVyXCIsXG4gICAgd2lkZ2V0SXNMb2FkZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBTbGlkZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gICAgfSxcbiAgICBpc0ZpdDogZnVuY3Rpb24ocXVlc3Rpb24pIHtcbiAgICAgIHJldHVybiBxdWVzdGlvbi5nZXRUeXBlKCkgPT09IFwiYm9vdHN0cmFwc2xpZGVyXCI7XG4gICAgfSxcbiAgICBodG1sVGVtcGxhdGU6IFwiPGRpdj48L2Rpdj5cIixcbiAgICBhY3RpdmF0ZWRCeUNoYW5nZWQ6IGZ1bmN0aW9uKGFjdGl2YXRlZEJ5KSB7XG4gICAgICBTdXJ2ZXkuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcImJvb3RzdHJhcHNsaWRlclwiLCBbXSwgbnVsbCwgXCJlbXB0eVwiKTtcbiAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZFByb3BlcnRpZXMoXCJib290c3RyYXBzbGlkZXJcIiwgW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJzdGVwOm51bWJlclwiLFxuICAgICAgICAgIGRlZmF1bHQ6IDFcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwicmFuZ2VNaW46bnVtYmVyXCIsXG4gICAgICAgICAgZGVmYXVsdDogMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJyYW5nZU1heDpudW1iZXJcIixcbiAgICAgICAgICBkZWZhdWx0OiAxMDBcbiAgICAgICAgfVxuICAgICAgXSk7XG4gICAgfSxcbiAgICBhZnRlclJlbmRlcjogZnVuY3Rpb24ocXVlc3Rpb24sIGVsKSB7XG4gICAgICB2YXIgaW5wdXRFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgIGlucHV0RWwuaWQgPSBxdWVzdGlvbi5pZDtcbiAgICAgIGlucHV0RWwudHlwZSA9IFwidGV4dFwiO1xuICAgICAgaW5wdXRFbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNsaWRlci1pZFwiLCBxdWVzdGlvbi5uYW1lICsgXCJfXCIgKyBxdWVzdGlvbi5pZCk7XG4gICAgICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcImRhdGEtc2xpZGVyLW1pblwiLCBxdWVzdGlvbi5yYW5nZU1pbik7XG4gICAgICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcImRhdGEtc2xpZGVyLW1heFwiLCBxdWVzdGlvbi5yYW5nZU1heCk7XG4gICAgICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcImRhdGEtc2xpZGVyLXN0ZXBcIiwgcXVlc3Rpb24uc3RlcCk7XG4gICAgICBpbnB1dEVsLnNldEF0dHJpYnV0ZShcbiAgICAgICAgXCJkYXRhLXNsaWRlci12YWx1ZVwiLFxuICAgICAgICBxdWVzdGlvbi52YWx1ZSB8fCBxdWVzdGlvbi5yYW5nZU1pblxuICAgICAgKTtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGlucHV0RWwpO1xuICAgICAgdmFyIHNsaWRlciA9IG5ldyBTbGlkZXIoaW5wdXRFbCwge1xuICAgICAgICBpZDogcXVlc3Rpb24ubmFtZSArIFwiX1wiICsgcXVlc3Rpb24uaWQsXG4gICAgICAgIG1pbjogcXVlc3Rpb24ucmFuZ2VNaW4sXG4gICAgICAgIG1heDogcXVlc3Rpb24ucmFuZ2VNYXgsXG4gICAgICAgIHN0ZXA6IHF1ZXN0aW9uLnN0ZXAsXG4gICAgICAgIGVuYWJsZWQ6ICFxdWVzdGlvbi5pc1JlYWRPbmx5LFxuICAgICAgICB2YWx1ZTogcXVlc3Rpb24udmFsdWUgfHwgcXVlc3Rpb24ucmFuZ2VNaW5cbiAgICAgIH0pO1xuXG4gICAgICBzbGlkZXIub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24odmFsdWVPYmopIHtcbiAgICAgICAgcXVlc3Rpb24udmFsdWUgPSBzbGlkZXIuZ2V0VmFsdWUoKTtcbiAgICAgIH0pO1xuICAgICAgdmFyIHVwZGF0ZVZhbHVlSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzbGlkZXIuc2V0VmFsdWUocXVlc3Rpb24udmFsdWUgfHwgcXVlc3Rpb24ucmFuZ2VNaW4pO1xuICAgICAgfTtcbiAgICAgIHF1ZXN0aW9uLnJlYWRPbmx5Q2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChxdWVzdGlvbi5pc1JlYWRPbmx5KSB7XG4gICAgICAgICAgc2xpZGVyLmRpc2FibGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzbGlkZXIuZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBxdWVzdGlvbi5ib290c3RyYXBTbGlkZXIgPSBzbGlkZXI7XG4gICAgICBxdWVzdGlvbi52YWx1ZUNoYW5nZWRDYWxsYmFjayA9IHVwZGF0ZVZhbHVlSGFuZGxlcjtcbiAgICB9LFxuICAgIHdpbGxVbm1vdW50OiBmdW5jdGlvbihxdWVzdGlvbiwgZWwpIHtcbiAgICAgIHF1ZXN0aW9uLmJvb3RzdHJhcFNsaWRlci5kZXN0cm95KCk7XG4gICAgICBxdWVzdGlvbi5ib290c3RyYXBTbGlkZXIgPSBudWxsO1xuICAgICAgcXVlc3Rpb24ucmVhZE9ubHlDaGFuZ2VkQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICBTdXJ2ZXkuQ3VzdG9tV2lkZ2V0Q29sbGVjdGlvbi5JbnN0YW5jZS5hZGRDdXN0b21XaWRnZXQod2lkZ2V0LCBcImN1c3RvbXR5cGVcIik7XG59XG5cbmlmICh0eXBlb2YgU3VydmV5ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIGluaXQoU3VydmV5KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Jvb3RzdHJhcC1zbGlkZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCA2IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE3X187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiU2xpZGVyXCIsXCJjb21tb25qczJcIjpcImJvb3RzdHJhcC1zbGlkZXJcIixcImNvbW1vbmpzXCI6XCJib290c3RyYXAtc2xpZGVyXCIsXCJhbWRcIjpcImJvb3RzdHJhcC1zbGlkZXJcIn1cbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCA2IiwiaW1wb3J0IFJlY29yZFJUQyBmcm9tIFwicmVjb3JkcnRjXCI7XG5cbmZ1bmN0aW9uIGluaXQoU3VydmV5KSB7XG4gIHZhciB3aWRnZXQgPSB7XG5cdFxuICAgIG5hbWU6IFwibWljcm9waG9uZVwiLFxuICAgIHRpdGxlOiBcIk1pY3JvcGhvbmVcIixcbiAgICBpY29uTmFtZTogXCJpY29uLW1pY3JvcGhvbmVcIixcbiAgICB3aWRnZXRJc0xvYWRlZDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIFJlY29yZFJUQyAhPSBcInVuZGVmaW5lZFwiO1xuICAgIH0sXG4gICAgaXNGaXQ6IGZ1bmN0aW9uKHF1ZXN0aW9uKSB7XG4gICAgICByZXR1cm4gcXVlc3Rpb24uZ2V0VHlwZSgpID09PSBcIm1pY3JvcGhvbmVcIjtcbiAgICB9LFxuICAgIGh0bWxUZW1wbGF0ZTpcblx0XHRcIjxkaXY+XCIrXG5cdFx0XCI8YnV0dG9uIHR5cGU9J2J1dHRvbicgIHRpdGxlPSdSZWNvcmQnPjxpIGNsYXNzPSdmYSBmYS1taWNyb3Bob25lJyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPjwvYnV0dG9uPlwiKyBcblx0XHRcIiZuYnNwOzxidXR0b24gdHlwZT0nYnV0dG9uJyB0aXRsZT0nU2F2ZSc+PGkgY2xhc3M9J2ZhIGZhLWNsb3VkJyBhcmlhLWhpZGRlbj0ndHJ1ZSc+PC9pPjwvYnV0dG9uPlwiK1xuXHRcdFwiJm5ic3A7PGF1ZGlvIHN0eWxlPSdcIitcblx0XHRcInBvc2l0aW9uOnJlbGF0aXZlOyBcIitcblx0XHRcInRvcDoxNnB4OyBcIitcblx0XHRcImxlZnQ6MTBweDsgXCIrXG5cdFx0XCJoZWlnaHQ6MzVweDtcIitcblx0XHRcIi1tb3otYm94LXNoYWRvdzogMnB4IDJweCA0cHggMHB4ICMwMDY3NzM7XCIrXG5cdFx0XCItd2Via2l0LWJveC1zaGFkb3c6ICAycHggMnB4IDRweCAwcHggIzAwNjc3MztcIitcblx0XHRcImJveC1zaGFkb3c6IDJweCAycHggNHB4IDBweCAjMDA2NzczO1wiK1xuXHRcdFwiJyBcIitcblx0XHRcImNvbnRyb2xzPSd0cnVlJyA+XCIrXG5cdFx0XCI8L2F1ZGlvPlwiK1xuXHRcdFwiPC9kaXY+XCIsXG4gICAgYWN0aXZhdGVkQnlDaGFuZ2VkOiBmdW5jdGlvbihhY3RpdmF0ZWRCeSkge1xuICAgICAgU3VydmV5Lkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJtaWNyb3Bob25lXCIsIFtdLCBudWxsLCBcImVtcHR5XCIpO1xuICAgIH0sXG5cdFxuICAgIGFmdGVyUmVuZGVyOiBmdW5jdGlvbihxdWVzdGlvbiwgZWwpIHtcbiAgICAgIHZhciByb290V2lkZ2V0ID0gdGhpcztcblx0ICB2YXIgYnV0dG9uU3RhcnRFbCA9IGVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnV0dG9uXCIpWzBdO1xuXHQgIHZhciBidXR0b25TdG9wRWwgPSBlbC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJ1dHRvblwiKVsxXTtcblx0ICB2YXIgYXVkaW9FbCA9IGVsLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYXVkaW9cIilbMF07XG5cdCBcbi8vLy8vLy8vLy8gIFJlY29yZFJUQyBsb2dpY1x0XG5cdCAgXG5cdCAgdmFyIHN1Y2Nlc3NDYWxsYmFjayA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuXHRcdHZhciBvcHRpb25zPXtcblx0XHRcdHR5cGU6ICdhdWRpbycsXG5cdFx0XHRtaW1lVHlwZTogJ2F1ZGlvL3dlYm0nLFxuXHRcdFx0YXVkaW9CaXRzUGVyU2Vjb25kOiA0NDEwMCxcblx0XHRcdHNhbXBsZVJhdGU6IDQ0MTAwLCBcblx0XHRcdGJ1ZmZlclNpemU6IDE2Mzg0LCBcblx0XHRcdG51bWJlck9mQXVkaW9DaGFubmVsczogMVxuXHRcdH07ICBcblx0XHRjb25zb2xlLmxvZyhcInN1Y2Nlc3NDYWxsYmFja1wiKTtcblx0XHRxdWVzdGlvbi5zdXJ2ZXkubXlzdHJlYW0gPSBzdHJlYW07XG5cdFx0cXVlc3Rpb24uc3VydmV5LnJlY29yZFJUQyA9IFJlY29yZFJUQyhxdWVzdGlvbi5zdXJ2ZXkubXlzdHJlYW0sIG9wdGlvbnMpO1xuXHRcdGlmKHR5cGVvZiBxdWVzdGlvbi5zdXJ2ZXkucmVjb3JkUlRDICE9IFwidW5kZWZpbmVkXCIpe1xuXHRcdFx0Y29uc29sZS5sb2coXCJzdGFydFJlY29yZGluZ1wiKTtcblx0XHRcdHF1ZXN0aW9uLnN1cnZleS5yZWNvcmRSVEMuc3RhcnRSZWNvcmRpbmcoKTtcblx0XHR9XG5cdCAgfTtcblxuXHQgIHZhciBlcnJvckNhbGxiYWNrPWZ1bmN0aW9uKCkge1xuXHRcdGFsZXJ0KCdObyBtaWNyb3Bob25lJyk7XG5cdFx0cXVlc3Rpb24uc3VydmV5LnJlY29yZFJUQz11bmRlZmluZWQ7XG5cdFx0cXVlc3Rpb24uc3VydmV5Lm15c3RyZWFtPXVuZGVmaW5lZDtcblx0ICB9O1xuXG5cdCAgdmFyIHByb2Nlc3NBdWRpbz0gZnVuY3Rpb24oYXVkaW9WaWRlb1dlYk1VUkwpIHtcblx0XHRjb25zb2xlLmxvZyhcInByb2Nlc3NBdWRpb1wiKTtcblx0XHR2YXIgcmVjb3JkZWRCbG9iID0gcXVlc3Rpb24uc3VydmV5LnJlY29yZFJUQy5nZXRCbG9iKCk7XG5cdFx0XG5cdFx0dmFyIGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2ZW50KXtcblx0XHQgIHZhciBkYXRhVXJpID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcblx0XHQgIGNvbnNvbGUubG9nKFwiZGF0YVVyaTogXCIgK2RhdGFVcmkpO1xuXHRcdCAgcXVlc3Rpb24udmFsdWUgPSBkYXRhVXJpO1xuXHRcdCAgYXVkaW9FbC5zcmM9ZGF0YVVyaTtcblx0XHQgIFxuXHRcdCAgY29uc29sZS5sb2coXCJjbGVhbmluZ1wiKTtcblx0XHQgIHF1ZXN0aW9uLnN1cnZleS5yZWNvcmRSVEM9dW5kZWZpbmVkO1xuXHRcdCAgcXVlc3Rpb24uc3VydmV5Lm15c3RyZWFtPXVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKHJlY29yZGVkQmxvYik7XG5cdCAgfTtcblxuICAgICAgdmFyIHN0YXJ0UmVjb3JkaW5nPWZ1bmN0aW9uKCkge1xuXHRcdCAgXG5cdFx0IC8vIGVyYXNlIHByZXZpb3VzIGRhdGEgXG5cdFx0IHF1ZXN0aW9uLnZhbHVlPXVuZGVmaW5lZDtcblx0XHRcbiAgICAgICBcdC8vIGlmIHJlY29yZGVyIG9wZW4gb24gYW5vdGhlciBxdWVzdGlvblx0LSB0cnkgdG8gc3RvcCByZWNvcmRpbmdcdFx0XG5cdFx0aWYodHlwZW9mIHF1ZXN0aW9uLnN1cnZleS5yZWNvcmRSVEMgIT0gXCJ1bmRlZmluZWRcIil7XG5cdFx0XHRxdWVzdGlvbi5zdXJ2ZXkucmVjb3JkUlRDLnN0b3BSZWNvcmRpbmcoZG9Ob3RoaW5nSGFuZGxlcik7XG5cdFx0XHRpZih0eXBlb2YgcXVlc3Rpb24uc3VydmV5Lm15c3RyZWFtICE9IFwidW5kZWZpbmVkXCIpe1xuXHRcdFx0XHRxdWVzdGlvbi5zdXJ2ZXkubXlzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XG5cdFx0XHRcdHRyYWNrLnN0b3AoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRcdCBcblx0XHR2YXIgbWVkaWFDb25zdHJhaW50cyA9IHtcblx0XHQgIHZpZGVvOiBmYWxzZSxcblx0XHQgIGF1ZGlvOiB0cnVlXG5cdFx0fTtcblx0XHRcblx0XHRuYXZpZ2F0b3IubWVkaWFEZXZpY2VzXG5cdFx0XHQuZ2V0VXNlck1lZGlhKG1lZGlhQ29uc3RyYWludHMpXG5cdFx0XHQudGhlbihzdWNjZXNzQ2FsbGJhY2suYmluZCh0aGlzKSwgZXJyb3JDYWxsYmFjay5iaW5kKHRoaXMpKTtcbiAgICAgfTtcblxuXHQgIHZhciBzdG9wUmVjb3JkaW5nPWZ1bmN0aW9uKCkge1xuXHRcdCAgY29uc29sZS5sb2coXCJzdG9wUmVjb3JkaW5nXCIpO1xuXHRcdCAgaWYodHlwZW9mIHF1ZXN0aW9uLnN1cnZleS5yZWNvcmRSVEMgIT0gXCJ1bmRlZmluZWRcIil7XG5cdFx0XHRxdWVzdGlvbi5zdXJ2ZXkucmVjb3JkUlRDLnN0b3BSZWNvcmRpbmcocHJvY2Vzc0F1ZGlvLmJpbmQodGhpcykpO1xuXHRcdFx0aWYodHlwZW9mIHF1ZXN0aW9uLnN1cnZleS5teXN0cmVhbSAhPSBcInVuZGVmaW5lZFwiKXtcblx0XHRcdFx0cXVlc3Rpb24uc3VydmV5Lm15c3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuXHRcdFx0XHR0cmFjay5zdG9wKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHQgIH1cblx0ICB9O1xuXHRcbi8vLy8vLy8vLy8vLy8vICBlbmQgUlRDIGxvZ2ljIC8vLy8vLy8vLy8vLy8vLy8vL1xuXHQgIFxuXHQgIGlmICghcXVlc3Rpb24uaXNSZWFkT25seSkge1xuICAgICAgICBidXR0b25TdGFydEVsLm9uY2xpY2sgPSBzdGFydFJlY29yZGluZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1dHRvblN0YXJ0RWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChidXR0b25TdGFydEVsKTtcbiAgICAgIH1cblx0ICBcblx0ICBpZiAoIXF1ZXN0aW9uLmlzUmVhZE9ubHkpIHtcbiAgICAgICAgYnV0dG9uU3RvcEVsLm9uY2xpY2sgPSBzdG9wUmVjb3JkaW5nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnV0dG9uU3RvcEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYnV0dG9uU3RvcEVsKTtcbiAgICAgIH1cblx0ICBcblx0ICBcbiAgICAgIGF1ZGlvRWwuc3JjPXF1ZXN0aW9uLnZhbHVlXG4gICAgICBcbiAgICAgIHZhciB1cGRhdGVWYWx1ZUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgXG4gICAgICB9O1xuXHQgIFxuXHQgIHZhciBkb05vdGhpbmdIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFxuICAgICAgfTtcblx0ICBcbiAgICAgIHF1ZXN0aW9uLnZhbHVlQ2hhbmdlZENhbGxiYWNrID0gdXBkYXRlVmFsdWVIYW5kbGVyO1xuICAgICAgdXBkYXRlVmFsdWVIYW5kbGVyKCk7XG5cdCAgXG4gICAgIFxuICAgIH0sXG4gICAgd2lsbFVubW91bnQ6IGZ1bmN0aW9uKHF1ZXN0aW9uLCBlbCkge1xuICAgICAgY29uc29sZS5sb2coXCJ1bm1vdW50IG1pY3JvcGhvbmUgbm8gcmVjb3JkIFwiKTtcbiAgICAgIGlmKHR5cGVvZiBxdWVzdGlvbi5zdXJ2ZXkucmVjb3JkUlRDICE9IFwidW5kZWZpbmVkXCIpe1xuXHRcdFx0cXVlc3Rpb24uc3VydmV5LnJlY29yZFJUQy5zdG9wUmVjb3JkaW5nKGRvTm90aGluZ0hhbmRsZXIpO1xuXHRcdFx0aWYodHlwZW9mIHF1ZXN0aW9uLnN1cnZleS5teXN0cmVhbSAhPSBcInVuZGVmaW5lZFwiKXtcblx0XHRcdFx0cXVlc3Rpb24uc3VydmV5Lm15c3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xuXHRcdFx0XHR0cmFjay5zdG9wKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdHF1ZXN0aW9uLnZhbHVlPXVuZGVmaW5lZDtcblx0XHRxdWVzdGlvbi5zdXJ2ZXkucmVjb3JkUlRDPXVuZGVmaW5lZDtcblx0XHRxdWVzdGlvbi5zdXJ2ZXkubXlzdHJlYW09dW5kZWZpbmVkO1xuXHQgICB9XG4gICAgfVxuICB9O1xuXG4gIFN1cnZleS5DdXN0b21XaWRnZXRDb2xsZWN0aW9uLkluc3RhbmNlLmFkZEN1c3RvbVdpZGdldCh3aWRnZXQsIFwiY3VzdG9tdHlwZVwiKTtcbn1cblxuaWYgKHR5cGVvZiBTdXJ2ZXkgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgaW5pdChTdXJ2ZXkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbWljcm9waG9uZS5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XHJcblxyXG4vLyBMYXN0IHRpbWUgdXBkYXRlZDogMjAxOC0wOS0xMiAxOjE0OjIwIFBNIFVUQ1xyXG5cclxuLy8gX19fX19fX19fX19fX19fX1xyXG4vLyBSZWNvcmRSVEMgdjUuNC44XHJcblxyXG4vLyBPcGVuLVNvdXJjZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDXHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBNdWF6IEtoYW4gICAgIC0gd3d3Lk11YXpLaGFuLmNvbVxyXG4vLyBNSVQgTGljZW5zZSAgIC0gd3d3LldlYlJUQy1FeHBlcmltZW50LmNvbS9saWNlbmNlXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLyBfX19fX19fX19fX19cclxuLy8gUmVjb3JkUlRDLmpzXHJcblxyXG4vKipcclxuICoge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDfFJlY29yZFJUQ30gaXMgYSBXZWJSVEMgSmF2YVNjcmlwdCBsaWJyYXJ5IGZvciBhdWRpby92aWRlbyBhcyB3ZWxsIGFzIHNjcmVlbiBhY3Rpdml0eSByZWNvcmRpbmcuIEl0IHN1cHBvcnRzIENocm9tZSwgRmlyZWZveCwgT3BlcmEsIEFuZHJvaWQsIGFuZCBNaWNyb3NvZnQgRWRnZS4gUGxhdGZvcm1zOiBMaW51eCwgTWFjIGFuZCBXaW5kb3dzLiBcclxuICogQHN1bW1hcnkgUmVjb3JkIGF1ZGlvLCB2aWRlbyBvciBzY3JlZW4gaW5zaWRlIHRoZSBicm93c2VyLlxyXG4gKiBAbGljZW5zZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL211YXota2hhbi9SZWNvcmRSVEMjbGljZW5zZXxNSVR9XHJcbiAqIEBhdXRob3Ige0BsaW5rIGh0dHA6Ly93d3cuTXVhektoYW4uY29tfE11YXogS2hhbn1cclxuICogQHR5cGVkZWYgUmVjb3JkUlRDXHJcbiAqIEBjbGFzc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgcmVjb3JkZXIgPSBSZWNvcmRSVEMobWVkaWFTdHJlYW0gb3IgW2FycmF5T2ZNZWRpYVN0cmVhbV0sIHtcclxuICogICAgIHR5cGU6ICd2aWRlbycsIC8vIGF1ZGlvIG9yIHZpZGVvIG9yIGdpZiBvciBjYW52YXNcclxuICogICAgIHJlY29yZGVyVHlwZTogTWVkaWFTdHJlYW1SZWNvcmRlciB8fCBDYW52YXNSZWNvcmRlciB8fCBTdGVyZW9BdWRpb1JlY29yZGVyIHx8IEV0Y1xyXG4gKiB9KTtcclxuICogcmVjb3JkZXIuc3RhcnRSZWNvcmRpbmcoKTtcclxuICogQHNlZSBGb3IgZnVydGhlciBpbmZvcm1hdGlvbjpcclxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL211YXota2hhbi9SZWNvcmRSVEN8UmVjb3JkUlRDIFNvdXJjZSBDb2RlfVxyXG4gKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBtZWRpYVN0cmVhbSAtIFNpbmdsZSBtZWRpYS1zdHJlYW0gb2JqZWN0LCBhcnJheSBvZiBtZWRpYS1zdHJlYW1zLCBodG1sLWNhbnZhcy1lbGVtZW50LCBldGMuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgLSB7dHlwZTpcInZpZGVvXCIsIHJlY29yZGVyVHlwZTogTWVkaWFTdHJlYW1SZWNvcmRlciwgZGlzYWJsZUxvZ3M6IHRydWUsIG51bWJlck9mQXVkaW9DaGFubmVsczogMSwgYnVmZmVyU2l6ZTogMCwgc2FtcGxlUmF0ZTogMCwgZGVzaXJlZFNhbXBSYXRlOiAxNjAwMCwgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIGV0Yy59XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gUmVjb3JkUlRDKG1lZGlhU3RyZWFtLCBjb25maWcpIHtcclxuICAgIGlmICghbWVkaWFTdHJlYW0pIHtcclxuICAgICAgICB0aHJvdyAnRmlyc3QgcGFyYW1ldGVyIGlzIHJlcXVpcmVkLic7XHJcbiAgICB9XHJcblxyXG4gICAgY29uZmlnID0gY29uZmlnIHx8IHtcclxuICAgICAgICB0eXBlOiAndmlkZW8nXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbmZpZyA9IG5ldyBSZWNvcmRSVENDb25maWd1cmF0aW9uKG1lZGlhU3RyZWFtLCBjb25maWcpO1xyXG5cclxuICAgIC8vIGEgcmVmZXJlbmNlIHRvIHVzZXIncyByZWNvcmRSVEMgb2JqZWN0XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgZnVuY3Rpb24gc3RhcnRSZWNvcmRpbmcoY29uZmlnMikge1xyXG4gICAgICAgIGlmICghIWNvbmZpZzIpIHtcclxuICAgICAgICAgICAgLy8gYWxsb3cgdXNlcnMgdG8gc2V0IG9wdGlvbnMgdXNpbmcgc3RhcnRSZWNvcmRpbmcgbWV0aG9kXHJcbiAgICAgICAgICAgIC8vIGNvbmZpZzIgaXMgc2ltaWxhciB0byBtYWluIFwiY29uZmlnXCIgb2JqZWN0IChzZWNvbmQgcGFyYW1ldGVyIG92ZXIgUmVjb3JkUlRDIGNvbnN0cnVjdG9yKVxyXG4gICAgICAgICAgICBjb25maWcgPSBuZXcgUmVjb3JkUlRDQ29uZmlndXJhdGlvbihtZWRpYVN0cmVhbSwgY29uZmlnMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5kaXNhYmxlTG9ncykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc3RhcnRlZCByZWNvcmRpbmcgJyArIGNvbmZpZy50eXBlICsgJyBzdHJlYW0uJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWVkaWFSZWNvcmRlcikge1xyXG4gICAgICAgICAgICBtZWRpYVJlY29yZGVyLmNsZWFyUmVjb3JkZWREYXRhKCk7XHJcbiAgICAgICAgICAgIG1lZGlhUmVjb3JkZXIucmVjb3JkKCk7XHJcblxyXG4gICAgICAgICAgICBzZXRTdGF0ZSgncmVjb3JkaW5nJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZi5yZWNvcmRpbmdEdXJhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlUmVjb3JkaW5nRHVyYXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGluaXRSZWNvcmRlcihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYucmVjb3JkaW5nRHVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVJlY29yZGluZ0R1cmF0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdFJlY29yZGVyKGluaXRDYWxsYmFjaykge1xyXG4gICAgICAgIGlmIChpbml0Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgY29uZmlnLmluaXRDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaW5pdENhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgICAgICBpbml0Q2FsbGJhY2sgPSBjb25maWcuaW5pdENhbGxiYWNrID0gbnVsbDsgLy8gcmVjb3JkZXIuaW5pdFJlY29yZGVyIHNob3VsZCBiZSBjYWxsLWJhY2tlZCBvbmNlLlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIFJlY29yZGVyID0gbmV3IEdldFJlY29yZGVyVHlwZShtZWRpYVN0cmVhbSwgY29uZmlnKTtcclxuXHJcbiAgICAgICAgbWVkaWFSZWNvcmRlciA9IG5ldyBSZWNvcmRlcihtZWRpYVN0cmVhbSwgY29uZmlnKTtcclxuICAgICAgICBtZWRpYVJlY29yZGVyLnJlY29yZCgpO1xyXG5cclxuICAgICAgICBzZXRTdGF0ZSgncmVjb3JkaW5nJyk7XHJcblxyXG4gICAgICAgIGlmICghY29uZmlnLmRpc2FibGVMb2dzKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXplZCByZWNvcmRlclR5cGU6JywgbWVkaWFSZWNvcmRlci5jb25zdHJ1Y3Rvci5uYW1lLCAnZm9yIG91dHB1dC10eXBlOicsIGNvbmZpZy50eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RvcFJlY29yZGluZyhjYWxsYmFjaykge1xyXG4gICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuXHJcbiAgICAgICAgaWYgKCFtZWRpYVJlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIHdhcm5pbmdMb2coKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlbGYuc3RhdGUgPT09ICdwYXVzZWQnKSB7XHJcbiAgICAgICAgICAgIHNlbGYucmVzdW1lUmVjb3JkaW5nKCk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc3RvcFJlY29yZGluZyhjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH0sIDEpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VsZi5zdGF0ZSAhPT0gJ3JlY29yZGluZycgJiYgIWNvbmZpZy5kaXNhYmxlTG9ncykge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ1JlY29yZGluZyBzdGF0ZSBzaG91bGQgYmU6IFwicmVjb3JkaW5nXCIsIGhvd2V2ZXIgY3VycmVudCBzdGF0ZSBpczogJywgc2VsZi5zdGF0ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5kaXNhYmxlTG9ncykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnU3RvcHBlZCByZWNvcmRpbmcgJyArIGNvbmZpZy50eXBlICsgJyBzdHJlYW0uJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY29uZmlnLnR5cGUgIT09ICdnaWYnKSB7XHJcbiAgICAgICAgICAgIG1lZGlhUmVjb3JkZXIuc3RvcChfY2FsbGJhY2spO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1lZGlhUmVjb3JkZXIuc3RvcCgpO1xyXG4gICAgICAgICAgICBfY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXRlKCdzdG9wcGVkJyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9jYWxsYmFjayhfX2Jsb2IpIHtcclxuICAgICAgICAgICAgaWYgKCFtZWRpYVJlY29yZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrLmNhbGwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsICcnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBPYmplY3Qua2V5cyhtZWRpYVJlY29yZGVyKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZWRpYVJlY29yZGVyW2tleV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZltrZXldID0gbWVkaWFSZWNvcmRlcltrZXldO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBibG9iID0gbWVkaWFSZWNvcmRlci5ibG9iO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFibG9iKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX19ibG9iKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVkaWFSZWNvcmRlci5ibG9iID0gYmxvYiA9IF9fYmxvYjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgJ1JlY29yZGluZyBmYWlsZWQuJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGJsb2IgJiYgIWNvbmZpZy5kaXNhYmxlTG9ncykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYmxvYi50eXBlLCAnLT4nLCBieXRlc1RvU2l6ZShibG9iLnNpemUpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNhbGxiYWNrLmNhbGwgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHNlbGYsIHVybCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghY29uZmlnLmF1dG9Xcml0ZVRvRGlzaykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXREYXRhVVJMKGZ1bmN0aW9uKGRhdGFVUkwpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJhbWV0ZXIgPSB7fTtcclxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcltjb25maWcudHlwZSArICdCbG9iJ10gPSBkYXRhVVJMO1xyXG4gICAgICAgICAgICAgICAgRGlza1N0b3JhZ2UuU3RvcmUocGFyYW1ldGVyKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHBhdXNlUmVjb3JkaW5nKCkge1xyXG4gICAgICAgIGlmICghbWVkaWFSZWNvcmRlcikge1xyXG4gICAgICAgICAgICB3YXJuaW5nTG9nKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZWxmLnN0YXRlICE9PSAncmVjb3JkaW5nJykge1xyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZy5kaXNhYmxlTG9ncykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdVbmFibGUgdG8gcGF1c2UgdGhlIHJlY29yZGluZy4gUmVjb3JkaW5nIHN0YXRlOiAnLCBzZWxmLnN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGF0ZSgncGF1c2VkJyk7XHJcblxyXG4gICAgICAgIG1lZGlhUmVjb3JkZXIucGF1c2UoKTtcclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcuZGlzYWJsZUxvZ3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1BhdXNlZCByZWNvcmRpbmcuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc3VtZVJlY29yZGluZygpIHtcclxuICAgICAgICBpZiAoIW1lZGlhUmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgd2FybmluZ0xvZygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2VsZi5zdGF0ZSAhPT0gJ3BhdXNlZCcpIHtcclxuICAgICAgICAgICAgaWYgKCFjb25maWcuZGlzYWJsZUxvZ3MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignVW5hYmxlIHRvIHJlc3VtZSB0aGUgcmVjb3JkaW5nLiBSZWNvcmRpbmcgc3RhdGU6ICcsIHNlbGYuc3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXRlKCdyZWNvcmRpbmcnKTtcclxuXHJcbiAgICAgICAgLy8gbm90IGFsbCBsaWJzIGhhdmUgdGhpcyBtZXRob2QgeWV0XHJcbiAgICAgICAgbWVkaWFSZWNvcmRlci5yZXN1bWUoKTtcclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcuZGlzYWJsZUxvZ3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ1Jlc3VtZWQgcmVjb3JkaW5nLicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWFkRmlsZShfYmxvYikge1xyXG4gICAgICAgIHBvc3RNZXNzYWdlKG5ldyBGaWxlUmVhZGVyU3luYygpLnJlYWRBc0RhdGFVUkwoX2Jsb2IpKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXREYXRhVVJMKGNhbGxiYWNrLCBfbWVkaWFSZWNvcmRlcikge1xyXG4gICAgICAgIGlmICghY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhyb3cgJ1Bhc3MgYSBjYWxsYmFjayBmdW5jdGlvbiBvdmVyIGdldERhdGFVUkwuJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBibG9iID0gX21lZGlhUmVjb3JkZXIgPyBfbWVkaWFSZWNvcmRlci5ibG9iIDogKG1lZGlhUmVjb3JkZXIgfHwge30pLmJsb2I7XHJcblxyXG4gICAgICAgIGlmICghYmxvYikge1xyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZy5kaXNhYmxlTG9ncykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdCbG9iIGVuY29kZXIgZGlkIG5vdCBmaW5pc2ggaXRzIGpvYiB5ZXQuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBnZXREYXRhVVJMKGNhbGxiYWNrLCBfbWVkaWFSZWNvcmRlcik7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIFdvcmtlciAhPT0gJ3VuZGVmaW5lZCcgJiYgIW5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEpIHtcclxuICAgICAgICAgICAgdmFyIHdlYldvcmtlciA9IHByb2Nlc3NJbldlYldvcmtlcihyZWFkRmlsZSk7XHJcblxyXG4gICAgICAgICAgICB3ZWJXb3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGV2ZW50LmRhdGEpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgd2ViV29ya2VyLnBvc3RNZXNzYWdlKGJsb2IpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKTtcclxuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhldmVudC50YXJnZXQucmVzdWx0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHByb2Nlc3NJbldlYldvcmtlcihfZnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIGJsb2IgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtfZnVuY3Rpb24udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICd0aGlzLm9ubWVzc2FnZSA9ICBmdW5jdGlvbiAoZWVlKSB7JyArIF9mdW5jdGlvbi5uYW1lICsgJyhlZWUuZGF0YSk7fSdcclxuICAgICAgICAgICAgXSwge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2FwcGxpY2F0aW9uL2phdmFzY3JpcHQnXHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB3b3JrZXIgPSBuZXcgV29ya2VyKGJsb2IpO1xyXG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGJsb2IpO1xyXG4gICAgICAgICAgICByZXR1cm4gd29ya2VyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVSZWNvcmRpbmdEdXJhdGlvbihjb3VudGVyKSB7XHJcbiAgICAgICAgY291bnRlciA9IGNvdW50ZXIgfHwgMDtcclxuXHJcbiAgICAgICAgaWYgKHNlbGYuc3RhdGUgPT09ICdwYXVzZWQnKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVSZWNvcmRpbmdEdXJhdGlvbihjb3VudGVyKTtcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZWxmLnN0YXRlID09PSAnc3RvcHBlZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNvdW50ZXIgPj0gc2VsZi5yZWNvcmRpbmdEdXJhdGlvbikge1xyXG4gICAgICAgICAgICBzdG9wUmVjb3JkaW5nKHNlbGYub25SZWNvcmRpbmdTdG9wcGVkKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY291bnRlciArPSAxMDAwOyAvLyAxLXNlY29uZFxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBoYW5kbGVSZWNvcmRpbmdEdXJhdGlvbihjb3VudGVyKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xyXG4gICAgICAgIGlmICghc2VsZikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLnN0YXRlID0gc3RhdGU7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZi5vblN0YXRlQ2hhbmdlZC5jYWxsID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHNlbGYub25TdGF0ZUNoYW5nZWQuY2FsbChzZWxmLCBzdGF0ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5vblN0YXRlQ2hhbmdlZChzdGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBXQVJOSU5HID0gJ0l0IHNlZW1zIHRoYXQgcmVjb3JkZXIgaXMgZGVzdHJveWVkIG9yIFwic3RhcnRSZWNvcmRpbmdcIiBpcyBub3QgaW52b2tlZCBmb3IgJyArIGNvbmZpZy50eXBlICsgJyByZWNvcmRlci4nO1xyXG5cclxuICAgIGZ1bmN0aW9uIHdhcm5pbmdMb2coKSB7XHJcbiAgICAgICAgaWYgKGNvbmZpZy5kaXNhYmxlTG9ncyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLndhcm4oV0FSTklORyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG1lZGlhUmVjb3JkZXI7XHJcblxyXG4gICAgdmFyIHJldHVybk9iamVjdCA9IHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIG1ldGhvZCBzdGFydHMgdGhlIHJlY29yZGluZy5cclxuICAgICAgICAgKiBAbWV0aG9kXHJcbiAgICAgICAgICogQG1lbWJlcm9mIFJlY29yZFJUQ1xyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogdmFyIHJlY29yZGVyID0gUmVjb3JkUlRDKG1lZGlhU3RyZWFtLCB7XHJcbiAgICAgICAgICogICAgIHR5cGU6ICd2aWRlbydcclxuICAgICAgICAgKiB9KTtcclxuICAgICAgICAgKiByZWNvcmRlci5zdGFydFJlY29yZGluZygpO1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXJ0UmVjb3JkaW5nOiBzdGFydFJlY29yZGluZyxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBtZXRob2Qgc3RvcHMgdGhlIHJlY29yZGluZy4gSXQgaXMgc3Ryb25nbHkgcmVjb21tZW5kZWQgdG8gZ2V0IFwiYmxvYlwiIG9yIFwiVVJJXCIgaW5zaWRlIHRoZSBjYWxsYmFjayB0byBtYWtlIHN1cmUgYWxsIHJlY29yZGVycyBmaW5pc2hlZCB0aGVpciBqb2IuXHJcbiAgICAgICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBDYWxsYmFjayB0byBnZXQgdGhlIHJlY29yZGVkIGJsb2IuXHJcbiAgICAgICAgICogQG1ldGhvZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBSZWNvcmRSVENcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIHJlY29yZGVyLnN0b3BSZWNvcmRpbmcoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICogICAgIC8vIHVzZSBlaXRoZXIgXCJ0aGlzXCIgb3IgXCJyZWNvcmRlclwiIG9iamVjdDsgYm90aCBhcmUgaWRlbnRpY2FsXHJcbiAgICAgICAgICogICAgIHZpZGVvLnNyYyA9IHRoaXMudG9VUkwoKTtcclxuICAgICAgICAgKiAgICAgdmFyIGJsb2IgPSB0aGlzLmdldEJsb2IoKTtcclxuICAgICAgICAgKiB9KTtcclxuICAgICAgICAgKi9cclxuICAgICAgICBzdG9wUmVjb3JkaW5nOiBzdG9wUmVjb3JkaW5nLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIG1ldGhvZCBwYXVzZXMgdGhlIHJlY29yZGluZy4gWW91IGNhbiByZXN1bWUgcmVjb3JkaW5nIHVzaW5nIFwicmVzdW1lUmVjb3JkaW5nXCIgbWV0aG9kLlxyXG4gICAgICAgICAqIEBtZXRob2RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgUmVjb3JkUlRDXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHRvZG8gRmlyZWZveCBpcyB1bmFibGUgdG8gcGF1c2UgdGhlIHJlY29yZGluZy4gRml4IGl0LlxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogcmVjb3JkZXIucGF1c2VSZWNvcmRpbmcoKTsgIC8vIHBhdXNlIHRoZSByZWNvcmRpbmdcclxuICAgICAgICAgKiByZWNvcmRlci5yZXN1bWVSZWNvcmRpbmcoKTsgLy8gcmVzdW1lIGFnYWluXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgcGF1c2VSZWNvcmRpbmc6IHBhdXNlUmVjb3JkaW5nLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIG1ldGhvZCByZXN1bWVzIHRoZSByZWNvcmRpbmcuXHJcbiAgICAgICAgICogQG1ldGhvZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBSZWNvcmRSVENcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIHJlY29yZGVyLnBhdXNlUmVjb3JkaW5nKCk7ICAvLyBmaXJzdCBvZiBhbGwsIHBhdXNlIHRoZSByZWNvcmRpbmdcclxuICAgICAgICAgKiByZWNvcmRlci5yZXN1bWVSZWNvcmRpbmcoKTsgLy8gbm93IHJlc3VtZSBpdFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlc3VtZVJlY29yZGluZzogcmVzdW1lUmVjb3JkaW5nLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIG1ldGhvZCBpbml0aWFsaXplcyB0aGUgcmVjb3JkaW5nLlxyXG4gICAgICAgICAqIEBtZXRob2RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgUmVjb3JkUlRDXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHRvZG8gVGhpcyBtZXRob2Qgc2hvdWxkIGJlIGRlcHJlY2F0ZWQuXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiByZWNvcmRlci5pbml0UmVjb3JkZXIoKTtcclxuICAgICAgICAgKi9cclxuICAgICAgICBpbml0UmVjb3JkZXI6IGluaXRSZWNvcmRlcixcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQXNrIFJlY29yZFJUQyB0byBhdXRvLXN0b3AgdGhlIHJlY29yZGluZyBhZnRlciA1IG1pbnV0ZXMuXHJcbiAgICAgICAgICogQG1ldGhvZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBSZWNvcmRSVENcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIHZhciBmaXZlTWludXRlcyA9IDUgKiAxMDAwICogNjA7XHJcbiAgICAgICAgICogcmVjb3JkZXIuc2V0UmVjb3JkaW5nRHVyYXRpb24oZml2ZU1pbnV0ZXMsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAqICAgIHZhciBibG9iID0gdGhpcy5nZXRCbG9iKCk7XHJcbiAgICAgICAgICogICAgdmlkZW8uc3JjID0gdGhpcy50b1VSTCgpO1xyXG4gICAgICAgICAqIH0pO1xyXG4gICAgICAgICAqIFxyXG4gICAgICAgICAqIC8vIG9yIG90aGVyd2lzZVxyXG4gICAgICAgICAqIHJlY29yZGVyLnNldFJlY29yZGluZ0R1cmF0aW9uKGZpdmVNaW51dGVzKS5vblJlY29yZGluZ1N0b3BwZWQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICogICAgdmFyIGJsb2IgPSB0aGlzLmdldEJsb2IoKTtcclxuICAgICAgICAgKiAgICB2aWRlby5zcmMgPSB0aGlzLnRvVVJMKCk7XHJcbiAgICAgICAgICogfSk7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2V0UmVjb3JkaW5nRHVyYXRpb246IGZ1bmN0aW9uKHJlY29yZGluZ0R1cmF0aW9uLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlY29yZGluZ0R1cmF0aW9uID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgJ3JlY29yZGluZ0R1cmF0aW9uIGlzIHJlcXVpcmVkLic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVjb3JkaW5nRHVyYXRpb24gIT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyAncmVjb3JkaW5nRHVyYXRpb24gbXVzdCBiZSBhIG51bWJlci4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLnJlY29yZGluZ0R1cmF0aW9uID0gcmVjb3JkaW5nRHVyYXRpb247XHJcbiAgICAgICAgICAgIHNlbGYub25SZWNvcmRpbmdTdG9wcGVkID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBvblJlY29yZGluZ1N0b3BwZWQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vblJlY29yZGluZ1N0b3BwZWQgPSBjYWxsYmFjaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIG1ldGhvZCBjYW4gYmUgdXNlZCB0byBjbGVhci9yZXNldCBhbGwgdGhlIHJlY29yZGVkIGRhdGEuXHJcbiAgICAgICAgICogQG1ldGhvZFxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBSZWNvcmRSVENcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKiBAdG9kbyBGaWd1cmUgb3V0IHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gXCJyZXNldFwiIGFuZCBcImNsZWFyUmVjb3JkZWREYXRhXCIgbWV0aG9kcy5cclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIHJlY29yZGVyLmNsZWFyUmVjb3JkZWREYXRhKCk7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY2xlYXJSZWNvcmRlZERhdGE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIW1lZGlhUmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgICAgIHdhcm5pbmdMb2coKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWVkaWFSZWNvcmRlci5jbGVhclJlY29yZGVkRGF0YSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb25maWcuZGlzYWJsZUxvZ3MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDbGVhcmVkIG9sZCByZWNvcmRlZCBkYXRhLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0IHRoZSByZWNvcmRlZCBibG9iLiBVc2UgdGhpcyBtZXRob2QgaW5zaWRlIHRoZSBcInN0b3BSZWNvcmRpbmdcIiBjYWxsYmFjay5cclxuICAgICAgICAgKiBAbWV0aG9kXHJcbiAgICAgICAgICogQG1lbWJlcm9mIFJlY29yZFJUQ1xyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogcmVjb3JkZXIuc3RvcFJlY29yZGluZyhmdW5jdGlvbigpIHtcclxuICAgICAgICAgKiAgICAgdmFyIGJsb2IgPSB0aGlzLmdldEJsb2IoKTtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICB2YXIgZmlsZSA9IG5ldyBGaWxlKFtibG9iXSwgJ2ZpbGVuYW1lLndlYm0nLCB7XHJcbiAgICAgICAgICogICAgICAgICB0eXBlOiAndmlkZW8vd2VibSdcclxuICAgICAgICAgKiAgICAgfSk7XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgICAgdmFyIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgICogICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUpOyAvLyB1cGxvYWQgXCJGaWxlXCIgb2JqZWN0IHJhdGhlciB0aGFuIGEgXCJCbG9iXCJcclxuICAgICAgICAgKiAgICAgdXBsb2FkVG9TZXJ2ZXIoZm9ybURhdGEpO1xyXG4gICAgICAgICAqIH0pO1xyXG4gICAgICAgICAqIEByZXR1cm5zIHtCbG9ifSBSZXR1cm5zIHJlY29yZGVkIGRhdGEgYXMgXCJCbG9iXCIgb2JqZWN0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldEJsb2I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIW1lZGlhUmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgICAgIHdhcm5pbmdMb2coKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG1lZGlhUmVjb3JkZXIuYmxvYjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgZGF0YS1VUkkgaW5zdGVhZCBvZiBCbG9iLlxyXG4gICAgICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gQ2FsbGJhY2sgdG8gZ2V0IHRoZSBEYXRhLVVSSS5cclxuICAgICAgICAgKiBAbWV0aG9kXHJcbiAgICAgICAgICogQG1lbWJlcm9mIFJlY29yZFJUQ1xyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogcmVjb3JkZXIuc3RvcFJlY29yZGluZyhmdW5jdGlvbigpIHtcclxuICAgICAgICAgKiAgICAgcmVjb3JkZXIuZ2V0RGF0YVVSTChmdW5jdGlvbihkYXRhVVJJKSB7XHJcbiAgICAgICAgICogICAgICAgICB2aWRlby5zcmMgPSBkYXRhVVJJO1xyXG4gICAgICAgICAqICAgICB9KTtcclxuICAgICAgICAgKiB9KTtcclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXREYXRhVVJMOiBnZXREYXRhVVJMLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgdmlydHVhbC90ZW1wb3JhcnkgVVJMLiBVc2FnZSBvZiB0aGlzIFVSTCBpcyBsaW1pdGVkIHRvIGN1cnJlbnQgdGFiLlxyXG4gICAgICAgICAqIEBtZXRob2RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgUmVjb3JkUlRDXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiByZWNvcmRlci5zdG9wUmVjb3JkaW5nKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAqICAgICB2aWRlby5zcmMgPSB0aGlzLnRvVVJMKCk7XHJcbiAgICAgICAgICogfSk7XHJcbiAgICAgICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyBhIHZpcnR1YWwvdGVtcG9yYXJ5IFVSTCBmb3IgdGhlIHJlY29yZGVkIFwiQmxvYlwiLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRvVVJMOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCFtZWRpYVJlY29yZGVyKSB7XHJcbiAgICAgICAgICAgICAgICB3YXJuaW5nTG9nKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKG1lZGlhUmVjb3JkZXIuYmxvYik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0IGludGVybmFsIHJlY29yZGluZyBvYmplY3QgKGkuZS4gaW50ZXJuYWwgbW9kdWxlKSBlLmcuIE11dGxpU3RyZWFtUmVjb3JkZXIsIE1lZGlhU3RyZWFtUmVjb3JkZXIsIFN0ZXJlb0F1ZGlvUmVjb3JkZXIgb3IgV2hhbW15UmVjb3JkZXIgZXRjLlxyXG4gICAgICAgICAqIEBtZXRob2RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgUmVjb3JkUlRDXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiB2YXIgaW50ZXJuYWwgPSByZWNvcmRlci5nZXRJbnRlcm5hbFJlY29yZGVyKCk7XHJcbiAgICAgICAgICogaWYoaW50ZXJuYWwgaW5zdGFuY2VvZiBNdWx0aVN0cmVhbVJlY29yZGVyKSB7XHJcbiAgICAgICAgICogICAgIGludGVybmFsLmFkZFN0cmVhbXMoW25ld0F1ZGlvU3RyZWFtXSk7XHJcbiAgICAgICAgICogICAgIGludGVybmFsLnJlc2V0VmlkZW9TdHJlYW1zKFtzY3JlZW5TdHJlYW1dKTtcclxuICAgICAgICAgKiB9XHJcbiAgICAgICAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBpbnRlcm5hbCByZWNvcmRpbmcgb2JqZWN0LlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldEludGVybmFsUmVjb3JkZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVkaWFSZWNvcmRlcjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbnZva2Ugc2F2ZS1hcyBkaWFsb2cgdG8gc2F2ZSB0aGUgcmVjb3JkZWQgYmxvYiBpbnRvIHlvdXIgZGlzay5cclxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZU5hbWUgLSBTZXQgeW91ciBvd24gZmlsZSBuYW1lLlxyXG4gICAgICAgICAqIEBtZXRob2RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgUmVjb3JkUlRDXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiByZWNvcmRlci5zdG9wUmVjb3JkaW5nKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAqICAgICB0aGlzLnNhdmUoJ2ZpbGUtbmFtZScpO1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAgIC8vIG9yIG1hbnVhbGx5OlxyXG4gICAgICAgICAqICAgICBpbnZva2VTYXZlQXNEaWFsb2codGhpcy5nZXRCbG9iKCksICdmaWxlbmFtZS53ZWJtJyk7XHJcbiAgICAgICAgICogfSk7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2F2ZTogZnVuY3Rpb24oZmlsZU5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCFtZWRpYVJlY29yZGVyKSB7XHJcbiAgICAgICAgICAgICAgICB3YXJuaW5nTG9nKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGludm9rZVNhdmVBc0RpYWxvZyhtZWRpYVJlY29yZGVyLmJsb2IsIGZpbGVOYW1lKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIG1ldGhvZCBnZXRzIGEgYmxvYiBmcm9tIGluZGV4ZWQtREIgc3RvcmFnZS5cclxuICAgICAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIENhbGxiYWNrIHRvIGdldCB0aGUgcmVjb3JkZWQgYmxvYi5cclxuICAgICAgICAgKiBAbWV0aG9kXHJcbiAgICAgICAgICogQG1lbWJlcm9mIFJlY29yZFJUQ1xyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogcmVjb3JkZXIuZ2V0RnJvbURpc2soZnVuY3Rpb24oZGF0YVVSTCkge1xyXG4gICAgICAgICAqICAgICB2aWRlby5zcmMgPSBkYXRhVVJMO1xyXG4gICAgICAgICAqIH0pO1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGdldEZyb21EaXNrOiBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBpZiAoIW1lZGlhUmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgICAgIHdhcm5pbmdMb2coKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgUmVjb3JkUlRDLmdldEZyb21EaXNrKGNvbmZpZy50eXBlLCBjYWxsYmFjayk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBtZXRob2QgYXBwZW5kcyBhbiBhcnJheSBvZiB3ZWJwIGltYWdlcyB0byB0aGUgcmVjb3JkZWQgdmlkZW8tYmxvYi4gSXQgdGFrZXMgYW4gXCJhcnJheVwiIG9iamVjdC5cclxuICAgICAgICAgKiBAdHlwZSB7QXJyYXkuPEFycmF5Pn1cclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheU9mV2ViUEltYWdlcyAtIEFycmF5IG9mIHdlYnAgaW1hZ2VzLlxyXG4gICAgICAgICAqIEBtZXRob2RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgUmVjb3JkUlRDXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHRvZG8gVGhpcyBtZXRob2Qgc2hvdWxkIGJlIGRlcHJlY2F0ZWQuXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiB2YXIgYXJyYXlPZldlYlBJbWFnZXMgPSBbXTtcclxuICAgICAgICAgKiBhcnJheU9mV2ViUEltYWdlcy5wdXNoKHtcclxuICAgICAgICAgKiAgICAgZHVyYXRpb246IGluZGV4LFxyXG4gICAgICAgICAqICAgICBpbWFnZTogJ2RhdGE6aW1hZ2Uvd2VicDtiYXNlNjQsLi4uJ1xyXG4gICAgICAgICAqIH0pO1xyXG4gICAgICAgICAqIHJlY29yZGVyLnNldEFkdmVydGlzZW1lbnRBcnJheShhcnJheU9mV2ViUEltYWdlcyk7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2V0QWR2ZXJ0aXNlbWVudEFycmF5OiBmdW5jdGlvbihhcnJheU9mV2ViUEltYWdlcykge1xyXG4gICAgICAgICAgICBjb25maWcuYWR2ZXJ0aXNlbWVudCA9IFtdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IGFycmF5T2ZXZWJQSW1hZ2VzLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLmFkdmVydGlzZW1lbnQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGksXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IGFycmF5T2ZXZWJQSW1hZ2VzW2ldXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEl0IGlzIGVxdWl2YWxlbnQgdG8gPGNvZGUgY2xhc3M9XCJzdHJcIj5cInJlY29yZGVyLmdldEJsb2IoKVwiPC9jb2RlPiBtZXRob2QuIFVzYWdlIG9mIFwiZ2V0QmxvYlwiIGlzIHJlY29tbWVuZGVkLCB0aG91Z2guXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtCbG9ifSBibG9iIC0gUmVjb3JkZWQgQmxvYiBjYW4gYmUgYWNjZXNzZWQgdXNpbmcgdGhpcyBwcm9wZXJ0eS5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgUmVjb3JkUlRDXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHJlYWRvbmx5XHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiByZWNvcmRlci5zdG9wUmVjb3JkaW5nKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAqICAgICB2YXIgYmxvYiA9IHRoaXMuYmxvYjtcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgICAvLyBiZWxvdyBvbmUgaXMgcmVjb21tZW5kZWRcclxuICAgICAgICAgKiAgICAgdmFyIGJsb2IgPSB0aGlzLmdldEJsb2IoKTtcclxuICAgICAgICAgKiB9KTtcclxuICAgICAgICAgKi9cclxuICAgICAgICBibG9iOiBudWxsLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIHdvcmtzIG9ubHkgd2l0aCB7cmVjb3JkZXJUeXBlOlN0ZXJlb0F1ZGlvUmVjb3JkZXJ9LiBVc2UgdGhpcyBwcm9wZXJ0eSBvbiBcInN0b3BSZWNvcmRpbmdcIiB0byB2ZXJpZnkgdGhlIGVuY29kZXIncyBzYW1wbGUtcmF0ZXMuXHJcbiAgICAgICAgICogQHByb3BlcnR5IHtudW1iZXJ9IGJ1ZmZlclNpemUgLSBCdWZmZXItc2l6ZSB1c2VkIHRvIGVuY29kZSB0aGUgV0FWIGNvbnRhaW5lclxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBSZWNvcmRSVENcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKiBAcmVhZG9ubHlcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIHJlY29yZGVyLnN0b3BSZWNvcmRpbmcoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICogICAgIGFsZXJ0KCdSZWNvcmRlciB1c2VkIHRoaXMgYnVmZmVyLXNpemU6ICcgKyB0aGlzLmJ1ZmZlclNpemUpO1xyXG4gICAgICAgICAqIH0pO1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJ1ZmZlclNpemU6IDAsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoaXMgd29ya3Mgb25seSB3aXRoIHtyZWNvcmRlclR5cGU6U3RlcmVvQXVkaW9SZWNvcmRlcn0uIFVzZSB0aGlzIHByb3BlcnR5IG9uIFwic3RvcFJlY29yZGluZ1wiIHRvIHZlcmlmeSB0aGUgZW5jb2RlcidzIHNhbXBsZS1yYXRlcy5cclxuICAgICAgICAgKiBAcHJvcGVydHkge251bWJlcn0gc2FtcGxlUmF0ZSAtIFNhbXBsZS1yYXRlcyB1c2VkIHRvIGVuY29kZSB0aGUgV0FWIGNvbnRhaW5lclxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBSZWNvcmRSVENcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKiBAcmVhZG9ubHlcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIHJlY29yZGVyLnN0b3BSZWNvcmRpbmcoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICogICAgIGFsZXJ0KCdSZWNvcmRlciB1c2VkIHRoZXNlIHNhbXBsZS1yYXRlczogJyArIHRoaXMuc2FtcGxlUmF0ZSk7XHJcbiAgICAgICAgICogfSk7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgc2FtcGxlUmF0ZTogMCxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICoge3JlY29yZGVyVHlwZTpTdGVyZW9BdWRpb1JlY29yZGVyfSByZXR1cm5zIEFycmF5QnVmZmVyIG9iamVjdC5cclxuICAgICAgICAgKiBAcHJvcGVydHkge0FycmF5QnVmZmVyfSBidWZmZXIgLSBBdWRpbyBBcnJheUJ1ZmZlciwgc3VwcG9ydGVkIG9ubHkgaW4gQ2hyb21lLlxyXG4gICAgICAgICAqIEBtZW1iZXJvZiBSZWNvcmRSVENcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKiBAcmVhZG9ubHlcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIHJlY29yZGVyLnN0b3BSZWNvcmRpbmcoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICogICAgIHZhciBhcnJheUJ1ZmZlciA9IHRoaXMuYnVmZmVyO1xyXG4gICAgICAgICAqICAgICBhbGVydChhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcclxuICAgICAgICAgKiB9KTtcclxuICAgICAgICAgKi9cclxuICAgICAgICBidWZmZXI6IG51bGwsXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoaXMgbWV0aG9kIHJlc2V0cyB0aGUgcmVjb3JkZXIuIFNvIHRoYXQgeW91IGNhbiByZXVzZSBzaW5nbGUgcmVjb3JkZXIgaW5zdGFuY2UgbWFueSB0aW1lcy5cclxuICAgICAgICAgKiBAbWV0aG9kXHJcbiAgICAgICAgICogQG1lbWJlcm9mIFJlY29yZFJUQ1xyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogcmVjb3JkZXIucmVzZXQoKTtcclxuICAgICAgICAgKiByZWNvcmRlci5zdGFydFJlY29yZGluZygpO1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKG1lZGlhUmVjb3JkZXIgJiYgdHlwZW9mIG1lZGlhUmVjb3JkZXIuY2xlYXJSZWNvcmRlZERhdGEgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICAgIG1lZGlhUmVjb3JkZXIuY2xlYXJSZWNvcmRlZERhdGEoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZWRpYVJlY29yZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgc2V0U3RhdGUoJ2luYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHNlbGYuYmxvYiA9IG51bGw7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIHdoZW5ldmVyIHJlY29yZGVyJ3Mgc3RhdGUgY2hhbmdlcy4gVXNlIHRoaXMgYXMgYW4gXCJldmVudFwiLlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBzdGF0ZSAtIEEgcmVjb3JkZXIncyBzdGF0ZSBjYW4gYmU6IHJlY29yZGluZywgcGF1c2VkLCBzdG9wcGVkIG9yIGluYWN0aXZlLlxyXG4gICAgICAgICAqIEBtZXRob2RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgUmVjb3JkUlRDXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiByZWNvcmRlci5vblN0YXRlQ2hhbmdlZCA9IGZ1bmN0aW9uKHN0YXRlKSB7XHJcbiAgICAgICAgICogICAgIGNvbnNvbGUubG9nKCdSZWNvcmRlciBzdGF0ZTogJywgc3RhdGUpO1xyXG4gICAgICAgICAqIH07XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgb25TdGF0ZUNoYW5nZWQ6IGZ1bmN0aW9uKHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmICghY29uZmlnLmRpc2FibGVMb2dzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnUmVjb3JkZXIgc3RhdGUgY2hhbmdlZDonLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIHJlY29yZGVyIGNhbiBoYXZlIGluYWN0aXZlLCByZWNvcmRpbmcsIHBhdXNlZCBvciBzdG9wcGVkIHN0YXRlcy5cclxuICAgICAgICAgKiBAcHJvcGVydHkge1N0cmluZ30gc3RhdGUgLSBBIHJlY29yZGVyJ3Mgc3RhdGUgY2FuIGJlOiByZWNvcmRpbmcsIHBhdXNlZCwgc3RvcHBlZCBvciBpbmFjdGl2ZS5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgUmVjb3JkUlRDXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEByZWFkb25seVxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogLy8gdGhpcyBsb29wZXIgZnVuY3Rpb24gd2lsbCBrZWVwIHlvdSB1cGRhdGVkIGFib3V0IHRoZSByZWNvcmRlcidzIHN0YXRlcy5cclxuICAgICAgICAgKiAoZnVuY3Rpb24gbG9vcGVyKCkge1xyXG4gICAgICAgICAqICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMScpLmlubmVySFRNTCA9ICdSZWNvcmRlcidzIHN0YXRlIGlzOiAnICsgcmVjb3JkZXIuc3RhdGU7XHJcbiAgICAgICAgICogICAgIGlmKHJlY29yZGVyLnN0YXRlID09PSAnc3RvcHBlZCcpIHJldHVybjsgLy8gaWdub3JlK3N0b3BcclxuICAgICAgICAgKiAgICAgc2V0VGltZW91dChsb29wZXIsIDEwMDApOyAvLyB1cGRhdGUgYWZ0ZXIgZXZlcnkgMy1zZWNvbmRzXHJcbiAgICAgICAgICogfSkoKTtcclxuICAgICAgICAgKiByZWNvcmRlci5zdGFydFJlY29yZGluZygpO1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHN0YXRlOiAnaW5hY3RpdmUnLFxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHZXQgcmVjb3JkZXIncyByZWFkb25seSBzdGF0ZS5cclxuICAgICAgICAgKiBAbWV0aG9kXHJcbiAgICAgICAgICogQG1lbWJlcm9mIFJlY29yZFJUQ1xyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogdmFyIHN0YXRlID0gcmVjb3JkZXIuZ2V0U3RhdGUoKTtcclxuICAgICAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBSZXR1cm5zIHJlY29yZGluZyBzdGF0ZS5cclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRTdGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLnN0YXRlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlc3Ryb3kgUmVjb3JkUlRDIGluc3RhbmNlLiBDbGVhciBhbGwgcmVjb3JkZXJzIGFuZCBvYmplY3RzLlxyXG4gICAgICAgICAqIEBtZXRob2RcclxuICAgICAgICAgKiBAbWVtYmVyb2YgUmVjb3JkUlRDXHJcbiAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgKiByZWNvcmRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXNhYmxlTG9nc0NhY2hlID0gY29uZmlnLmRpc2FibGVMb2dzO1xyXG5cclxuICAgICAgICAgICAgY29uZmlnID0ge1xyXG4gICAgICAgICAgICAgICAgZGlzYWJsZUxvZ3M6IHRydWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2VsZi5yZXNldCgpO1xyXG4gICAgICAgICAgICBzZXRTdGF0ZSgnZGVzdHJveWVkJyk7XHJcbiAgICAgICAgICAgIHJldHVybk9iamVjdCA9IHNlbGYgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKFN0b3JhZ2UuQXVkaW9Db250ZXh0Q29uc3RydWN0b3IpIHtcclxuICAgICAgICAgICAgICAgIFN0b3JhZ2UuQXVkaW9Db250ZXh0Q29uc3RydWN0b3IuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIFN0b3JhZ2UuQXVkaW9Db250ZXh0Q29uc3RydWN0b3IgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25maWcuZGlzYWJsZUxvZ3MgPSBkaXNhYmxlTG9nc0NhY2hlO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFjb25maWcuZGlzYWJsZUxvZ3MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignUmVjb3JkUlRDIGlzIGRlc3Ryb3llZC4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlY29yZFJUQyB2ZXJzaW9uIG51bWJlclxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7U3RyaW5nfSB2ZXJzaW9uIC0gUmVsZWFzZSB2ZXJzaW9uIG51bWJlci5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgUmVjb3JkUlRDXHJcbiAgICAgICAgICogQHN0YXRpY1xyXG4gICAgICAgICAqIEByZWFkb25seVxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogYWxlcnQocmVjb3JkZXIudmVyc2lvbik7XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmVyc2lvbjogJzUuNC44J1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIXRoaXMpIHtcclxuICAgICAgICBzZWxmID0gcmV0dXJuT2JqZWN0O1xyXG4gICAgICAgIHJldHVybiByZXR1cm5PYmplY3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgc29tZW9uZSB3YW50cyB0byB1c2UgUmVjb3JkUlRDIHdpdGggdGhlIFwibmV3XCIga2V5d29yZC5cclxuICAgIGZvciAodmFyIHByb3AgaW4gcmV0dXJuT2JqZWN0KSB7XHJcbiAgICAgICAgdGhpc1twcm9wXSA9IHJldHVybk9iamVjdFtwcm9wXTtcclxuICAgIH1cclxuXHJcbiAgICBzZWxmID0gdGhpcztcclxuXHJcbiAgICByZXR1cm4gcmV0dXJuT2JqZWN0O1xyXG59XHJcblxyXG5SZWNvcmRSVEMudmVyc2lvbiA9ICc1LjQuOCc7XHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgLyogJiYgISFtb2R1bGUuZXhwb3J0cyovICkge1xyXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBSZWNvcmRSVEM7XHJcbn1cclxuXHJcbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuICAgIGRlZmluZSgnUmVjb3JkUlRDJywgW10sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBSZWNvcmRSVEM7XHJcbiAgICB9KTtcclxufVxuXHJcblJlY29yZFJUQy5nZXRGcm9tRGlzayA9IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICBpZiAoIWNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhyb3cgJ2NhbGxiYWNrIGlzIG1hbmRhdG9yeS4nO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKCdHZXR0aW5nIHJlY29yZGVkICcgKyAodHlwZSA9PT0gJ2FsbCcgPyAnYmxvYnMnIDogdHlwZSArICcgYmxvYiAnKSArICcgZnJvbSBkaXNrIScpO1xyXG4gICAgRGlza1N0b3JhZ2UuRmV0Y2goZnVuY3Rpb24oZGF0YVVSTCwgX3R5cGUpIHtcclxuICAgICAgICBpZiAodHlwZSAhPT0gJ2FsbCcgJiYgX3R5cGUgPT09IHR5cGUgKyAnQmxvYicgJiYgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YVVSTCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZSA9PT0gJ2FsbCcgJiYgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soZGF0YVVSTCwgX3R5cGUucmVwbGFjZSgnQmxvYicsICcnKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhpcyBtZXRob2QgY2FuIGJlIHVzZWQgdG8gc3RvcmUgcmVjb3JkZWQgYmxvYnMgaW50byBJbmRleGVkREIgc3RvcmFnZS5cclxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSB7YXVkaW86IEJsb2IsIHZpZGVvOiBCbG9iLCBnaWY6IEJsb2J9XHJcbiAqIEBtZXRob2RcclxuICogQG1lbWJlcm9mIFJlY29yZFJUQ1xyXG4gKiBAZXhhbXBsZVxyXG4gKiBSZWNvcmRSVEMud3JpdGVUb0Rpc2soe1xyXG4gKiAgICAgYXVkaW86IGF1ZGlvQmxvYixcclxuICogICAgIHZpZGVvOiB2aWRlb0Jsb2IsXHJcbiAqICAgICBnaWYgIDogZ2lmQmxvYlxyXG4gKiB9KTtcclxuICovXHJcblJlY29yZFJUQy53cml0ZVRvRGlzayA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgIGNvbnNvbGUubG9nKCdXcml0aW5nIHJlY29yZGVkIGJsb2IocykgdG8gZGlzayEnKTtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgaWYgKG9wdGlvbnMuYXVkaW8gJiYgb3B0aW9ucy52aWRlbyAmJiBvcHRpb25zLmdpZikge1xyXG4gICAgICAgIG9wdGlvbnMuYXVkaW8uZ2V0RGF0YVVSTChmdW5jdGlvbihhdWRpb0RhdGFVUkwpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy52aWRlby5nZXREYXRhVVJMKGZ1bmN0aW9uKHZpZGVvRGF0YVVSTCkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5naWYuZ2V0RGF0YVVSTChmdW5jdGlvbihnaWZEYXRhVVJMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRGlza1N0b3JhZ2UuU3RvcmUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdWRpb0Jsb2I6IGF1ZGlvRGF0YVVSTCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9CbG9iOiB2aWRlb0RhdGFVUkwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdpZkJsb2I6IGdpZkRhdGFVUkxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5hdWRpbyAmJiBvcHRpb25zLnZpZGVvKSB7XHJcbiAgICAgICAgb3B0aW9ucy5hdWRpby5nZXREYXRhVVJMKGZ1bmN0aW9uKGF1ZGlvRGF0YVVSTCkge1xyXG4gICAgICAgICAgICBvcHRpb25zLnZpZGVvLmdldERhdGFVUkwoZnVuY3Rpb24odmlkZW9EYXRhVVJMKSB7XHJcbiAgICAgICAgICAgICAgICBEaXNrU3RvcmFnZS5TdG9yZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYXVkaW9CbG9iOiBhdWRpb0RhdGFVUkwsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlkZW9CbG9iOiB2aWRlb0RhdGFVUkxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5hdWRpbyAmJiBvcHRpb25zLmdpZikge1xyXG4gICAgICAgIG9wdGlvbnMuYXVkaW8uZ2V0RGF0YVVSTChmdW5jdGlvbihhdWRpb0RhdGFVUkwpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5naWYuZ2V0RGF0YVVSTChmdW5jdGlvbihnaWZEYXRhVVJMKSB7XHJcbiAgICAgICAgICAgICAgICBEaXNrU3RvcmFnZS5TdG9yZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYXVkaW9CbG9iOiBhdWRpb0RhdGFVUkwsXHJcbiAgICAgICAgICAgICAgICAgICAgZ2lmQmxvYjogZ2lmRGF0YVVSTFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnZpZGVvICYmIG9wdGlvbnMuZ2lmKSB7XHJcbiAgICAgICAgb3B0aW9ucy52aWRlby5nZXREYXRhVVJMKGZ1bmN0aW9uKHZpZGVvRGF0YVVSTCkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmdpZi5nZXREYXRhVVJMKGZ1bmN0aW9uKGdpZkRhdGFVUkwpIHtcclxuICAgICAgICAgICAgICAgIERpc2tTdG9yYWdlLlN0b3JlKHtcclxuICAgICAgICAgICAgICAgICAgICB2aWRlb0Jsb2I6IHZpZGVvRGF0YVVSTCxcclxuICAgICAgICAgICAgICAgICAgICBnaWZCbG9iOiBnaWZEYXRhVVJMXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuYXVkaW8pIHtcclxuICAgICAgICBvcHRpb25zLmF1ZGlvLmdldERhdGFVUkwoZnVuY3Rpb24oYXVkaW9EYXRhVVJMKSB7XHJcbiAgICAgICAgICAgIERpc2tTdG9yYWdlLlN0b3JlKHtcclxuICAgICAgICAgICAgICAgIGF1ZGlvQmxvYjogYXVkaW9EYXRhVVJMXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnZpZGVvKSB7XHJcbiAgICAgICAgb3B0aW9ucy52aWRlby5nZXREYXRhVVJMKGZ1bmN0aW9uKHZpZGVvRGF0YVVSTCkge1xyXG4gICAgICAgICAgICBEaXNrU3RvcmFnZS5TdG9yZSh7XHJcbiAgICAgICAgICAgICAgICB2aWRlb0Jsb2I6IHZpZGVvRGF0YVVSTFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5naWYpIHtcclxuICAgICAgICBvcHRpb25zLmdpZi5nZXREYXRhVVJMKGZ1bmN0aW9uKGdpZkRhdGFVUkwpIHtcclxuICAgICAgICAgICAgRGlza1N0b3JhZ2UuU3RvcmUoe1xyXG4gICAgICAgICAgICAgICAgZ2lmQmxvYjogZ2lmRGF0YVVSTFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcblxyXG4vLyBfX19fX19fX19fX19fX19fX19fX19fX19fX1xyXG4vLyBSZWNvcmRSVEMtQ29uZmlndXJhdGlvbi5qc1xyXG5cclxuLyoqXHJcbiAqIHtAbGluayBSZWNvcmRSVENDb25maWd1cmF0aW9ufSBpcyBhbiBpbm5lci9wcml2YXRlIGhlbHBlciBmb3Ige0BsaW5rIFJlY29yZFJUQ30uXHJcbiAqIEBzdW1tYXJ5IEl0IGNvbmZpZ3VyZXMgdGhlIDJuZCBwYXJhbWV0ZXIgcGFzc2VkIG92ZXIge0BsaW5rIFJlY29yZFJUQ30gYW5kIHJldHVybnMgYSB2YWxpZCBcImNvbmZpZ1wiIG9iamVjdC5cclxuICogQGxpY2Vuc2Uge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDI2xpY2Vuc2V8TUlUfVxyXG4gKiBAYXV0aG9yIHtAbGluayBodHRwOi8vd3d3Lk11YXpLaGFuLmNvbXxNdWF6IEtoYW59XHJcbiAqIEB0eXBlZGVmIFJlY29yZFJUQ0NvbmZpZ3VyYXRpb25cclxuICogQGNsYXNzXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBvcHRpb25zID0gUmVjb3JkUlRDQ29uZmlndXJhdGlvbihtZWRpYVN0cmVhbSwgb3B0aW9ucyk7XHJcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDfFJlY29yZFJUQyBTb3VyY2UgQ29kZX1cclxuICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gbWVkaWFTdHJlYW0gLSBNZWRpYVN0cmVhbSBvYmplY3QgZmV0Y2hlZCB1c2luZyBnZXRVc2VyTWVkaWEgQVBJIG9yIGdlbmVyYXRlZCB1c2luZyBjYXB0dXJlU3RyZWFtVW50aWxFbmRlZCBvciBXZWJBdWRpbyBBUEkuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgLSB7dHlwZTpcInZpZGVvXCIsIGRpc2FibGVMb2dzOiB0cnVlLCBudW1iZXJPZkF1ZGlvQ2hhbm5lbHM6IDEsIGJ1ZmZlclNpemU6IDAsIHNhbXBsZVJhdGU6IDAsIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50LCBnZXROYXRpdmVCbG9iOnRydWUsIGV0Yy59XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gUmVjb3JkUlRDQ29uZmlndXJhdGlvbihtZWRpYVN0cmVhbSwgY29uZmlnKSB7XHJcbiAgICBpZiAoIWNvbmZpZy5yZWNvcmRlclR5cGUgJiYgIWNvbmZpZy50eXBlKSB7XHJcbiAgICAgICAgaWYgKCEhY29uZmlnLmF1ZGlvICYmICEhY29uZmlnLnZpZGVvKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy50eXBlID0gJ3ZpZGVvJztcclxuICAgICAgICB9IGVsc2UgaWYgKCEhY29uZmlnLmF1ZGlvICYmICFjb25maWcudmlkZW8pIHtcclxuICAgICAgICAgICAgY29uZmlnLnR5cGUgPSAnYXVkaW8nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29uZmlnLnJlY29yZGVyVHlwZSAmJiAhY29uZmlnLnR5cGUpIHtcclxuICAgICAgICBpZiAoY29uZmlnLnJlY29yZGVyVHlwZSA9PT0gV2hhbW15UmVjb3JkZXIgfHwgY29uZmlnLnJlY29yZGVyVHlwZSA9PT0gQ2FudmFzUmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgY29uZmlnLnR5cGUgPSAndmlkZW8nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLnJlY29yZGVyVHlwZSA9PT0gR2lmUmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgY29uZmlnLnR5cGUgPSAnZ2lmJztcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbmZpZy5yZWNvcmRlclR5cGUgPT09IFN0ZXJlb0F1ZGlvUmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgY29uZmlnLnR5cGUgPSAnYXVkaW8nO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoY29uZmlnLnJlY29yZGVyVHlwZSA9PT0gTWVkaWFTdHJlYW1SZWNvcmRlcikge1xyXG4gICAgICAgICAgICBpZiAobWVkaWFTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGggJiYgbWVkaWFTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy50eXBlID0gJ3ZpZGVvJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChtZWRpYVN0cmVhbS5nZXRBdWRpb1RyYWNrcygpLmxlbmd0aCAmJiAhbWVkaWFTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy50eXBlID0gJ2F1ZGlvJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghbWVkaWFTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGggJiYgbWVkaWFTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy50eXBlID0gJ2F1ZGlvJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbmZpZy50eXBlID0gJ1VuS25vd24nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgTWVkaWFTdHJlYW1SZWNvcmRlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIE1lZGlhUmVjb3JkZXIgIT09ICd1bmRlZmluZWQnICYmICdyZXF1ZXN0RGF0YScgaW4gTWVkaWFSZWNvcmRlci5wcm90b3R5cGUpIHtcclxuICAgICAgICBpZiAoIWNvbmZpZy5taW1lVHlwZSkge1xyXG4gICAgICAgICAgICBjb25maWcubWltZVR5cGUgPSAndmlkZW8vd2VibSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy50eXBlID0gY29uZmlnLm1pbWVUeXBlLnNwbGl0KCcvJylbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWNvbmZpZy5iaXRzUGVyU2Vjb25kKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbmZpZy5iaXRzUGVyU2Vjb25kID0gMTI4MDAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zaWRlciBkZWZhdWx0IHR5cGU9YXVkaW9cclxuICAgIGlmICghY29uZmlnLnR5cGUpIHtcclxuICAgICAgICBpZiAoY29uZmlnLm1pbWVUeXBlKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy50eXBlID0gY29uZmlnLm1pbWVUeXBlLnNwbGl0KCcvJylbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY29uZmlnLnR5cGUpIHtcclxuICAgICAgICAgICAgY29uZmlnLnR5cGUgPSAnYXVkaW8nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY29uZmlnO1xyXG59XG5cclxuLy8gX19fX19fX19fX19fX19fX19fXHJcbi8vIEdldFJlY29yZGVyVHlwZS5qc1xyXG5cclxuLyoqXHJcbiAqIHtAbGluayBHZXRSZWNvcmRlclR5cGV9IGlzIGFuIGlubmVyL3ByaXZhdGUgaGVscGVyIGZvciB7QGxpbmsgUmVjb3JkUlRDfS5cclxuICogQHN1bW1hcnkgSXQgcmV0dXJucyBiZXN0IHJlY29yZGVyLXR5cGUgYXZhaWxhYmxlIGZvciB5b3VyIGJyb3dzZXIuXHJcbiAqIEBsaWNlbnNlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbXVhei1raGFuL1JlY29yZFJUQyNsaWNlbnNlfE1JVH1cclxuICogQGF1dGhvciB7QGxpbmsgaHR0cDovL3d3dy5NdWF6S2hhbi5jb218TXVheiBLaGFufVxyXG4gKiBAdHlwZWRlZiBHZXRSZWNvcmRlclR5cGVcclxuICogQGNsYXNzXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBSZWNvcmRlclR5cGUgPSBHZXRSZWNvcmRlclR5cGUob3B0aW9ucyk7XHJcbiAqIHZhciByZWNvcmRlciA9IG5ldyBSZWNvcmRlclR5cGUob3B0aW9ucyk7XHJcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDfFJlY29yZFJUQyBTb3VyY2UgQ29kZX1cclxuICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gbWVkaWFTdHJlYW0gLSBNZWRpYVN0cmVhbSBvYmplY3QgZmV0Y2hlZCB1c2luZyBnZXRVc2VyTWVkaWEgQVBJIG9yIGdlbmVyYXRlZCB1c2luZyBjYXB0dXJlU3RyZWFtVW50aWxFbmRlZCBvciBXZWJBdWRpbyBBUEkuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgLSB7dHlwZTpcInZpZGVvXCIsIGRpc2FibGVMb2dzOiB0cnVlLCBudW1iZXJPZkF1ZGlvQ2hhbm5lbHM6IDEsIGJ1ZmZlclNpemU6IDAsIHNhbXBsZVJhdGU6IDAsIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50LCBldGMufVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIEdldFJlY29yZGVyVHlwZShtZWRpYVN0cmVhbSwgY29uZmlnKSB7XHJcbiAgICB2YXIgcmVjb3JkZXI7XHJcblxyXG4gICAgLy8gU3RlcmVvQXVkaW9SZWNvcmRlciBjYW4gd29yayB3aXRoIGFsbCB0aHJlZTogRWRnZSwgRmlyZWZveCBhbmQgQ2hyb21lXHJcbiAgICAvLyB0b2RvOiBkZXRlY3QgaWYgaXQgaXMgRWRnZSwgdGhlbiBhdXRvIHVzZTogU3RlcmVvQXVkaW9SZWNvcmRlclxyXG4gICAgaWYgKGlzQ2hyb21lIHx8IGlzRWRnZSB8fCBpc09wZXJhKSB7XHJcbiAgICAgICAgLy8gTWVkaWEgU3RyZWFtIFJlY29yZGluZyBBUEkgaGFzIG5vdCBiZWVuIGltcGxlbWVudGVkIGluIGNocm9tZSB5ZXQ7XHJcbiAgICAgICAgLy8gVGhhdCdzIHdoeSB1c2luZyBXZWJBdWRpbyBBUEkgdG8gcmVjb3JkIHN0ZXJlbyBhdWRpbyBpbiBXQVYgZm9ybWF0XHJcbiAgICAgICAgcmVjb3JkZXIgPSBTdGVyZW9BdWRpb1JlY29yZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgTWVkaWFSZWNvcmRlciAhPT0gJ3VuZGVmaW5lZCcgJiYgJ3JlcXVlc3REYXRhJyBpbiBNZWRpYVJlY29yZGVyLnByb3RvdHlwZSAmJiAhaXNDaHJvbWUpIHtcclxuICAgICAgICByZWNvcmRlciA9IE1lZGlhU3RyZWFtUmVjb3JkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdmlkZW8gcmVjb3JkZXIgKGluIFdlYk0gZm9ybWF0KVxyXG4gICAgaWYgKGNvbmZpZy50eXBlID09PSAndmlkZW8nICYmIChpc0Nocm9tZSB8fCBpc09wZXJhKSkge1xyXG4gICAgICAgIHJlY29yZGVyID0gV2hhbW15UmVjb3JkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdmlkZW8gcmVjb3JkZXIgKGluIEdpZiBmb3JtYXQpXHJcbiAgICBpZiAoY29uZmlnLnR5cGUgPT09ICdnaWYnKSB7XHJcbiAgICAgICAgcmVjb3JkZXIgPSBHaWZSZWNvcmRlcjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBodG1sMmNhbnZhcyByZWNvcmRpbmchXHJcbiAgICBpZiAoY29uZmlnLnR5cGUgPT09ICdjYW52YXMnKSB7XHJcbiAgICAgICAgcmVjb3JkZXIgPSBDYW52YXNSZWNvcmRlcjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNNZWRpYVJlY29yZGVyQ29tcGF0aWJsZSgpICYmIHJlY29yZGVyICE9PSBDYW52YXNSZWNvcmRlciAmJiByZWNvcmRlciAhPT0gR2lmUmVjb3JkZXIgJiYgdHlwZW9mIE1lZGlhUmVjb3JkZXIgIT09ICd1bmRlZmluZWQnICYmICdyZXF1ZXN0RGF0YScgaW4gTWVkaWFSZWNvcmRlci5wcm90b3R5cGUpIHtcclxuICAgICAgICBpZiAoKG1lZGlhU3RyZWFtLmdldFZpZGVvVHJhY2tzICYmIG1lZGlhU3RyZWFtLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoKSB8fCAobWVkaWFTdHJlYW0uZ2V0QXVkaW9UcmFja3MgJiYgbWVkaWFTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGgpKSB7XHJcbiAgICAgICAgICAgIC8vIGF1ZGlvLW9ubHkgcmVjb3JkaW5nXHJcbiAgICAgICAgICAgIGlmIChjb25maWcudHlwZSA9PT0gJ2F1ZGlvJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBNZWRpYVJlY29yZGVyLmlzVHlwZVN1cHBvcnRlZCA9PT0gJ2Z1bmN0aW9uJyAmJiBNZWRpYVJlY29yZGVyLmlzVHlwZVN1cHBvcnRlZCgnYXVkaW8vd2VibScpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkZXIgPSBNZWRpYVN0cmVhbVJlY29yZGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gZWxzZSByZWNvcmRlciA9IFN0ZXJlb0F1ZGlvUmVjb3JkZXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyB2aWRlbyBvciBzY3JlZW4gdHJhY2tzXHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIE1lZGlhUmVjb3JkZXIuaXNUeXBlU3VwcG9ydGVkID09PSAnZnVuY3Rpb24nICYmIE1lZGlhUmVjb3JkZXIuaXNUeXBlU3VwcG9ydGVkKCd2aWRlby93ZWJtJykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZWNvcmRlciA9IE1lZGlhU3RyZWFtUmVjb3JkZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1lZGlhU3RyZWFtIGluc3RhbmNlb2YgQXJyYXkgJiYgbWVkaWFTdHJlYW0ubGVuZ3RoKSB7XHJcbiAgICAgICAgcmVjb3JkZXIgPSBNdWx0aVN0cmVhbVJlY29yZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjb25maWcucmVjb3JkZXJUeXBlKSB7XHJcbiAgICAgICAgcmVjb3JkZXIgPSBjb25maWcucmVjb3JkZXJUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY29uZmlnLmRpc2FibGVMb2dzICYmICEhcmVjb3JkZXIgJiYgISFyZWNvcmRlci5uYW1lKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1VzaW5nIHJlY29yZGVyVHlwZTonLCByZWNvcmRlci5uYW1lIHx8IHJlY29yZGVyLmNvbnN0cnVjdG9yLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZWNvcmRlcjtcclxufVxuXHJcbi8vIF9fX19fX19fX19fX19cclxuLy8gTVJlY29yZFJUQy5qc1xyXG5cclxuLyoqXHJcbiAqIE1SZWNvcmRSVEMgcnVucyBvbiB0b3Agb2Yge0BsaW5rIFJlY29yZFJUQ30gdG8gYnJpbmcgbXVsdGlwbGUgcmVjb3JkaW5ncyBpbiBhIHNpbmdsZSBwbGFjZSwgYnkgcHJvdmlkaW5nIHNpbXBsZSBBUEkuXHJcbiAqIEBzdW1tYXJ5IE1SZWNvcmRSVEMgc3RhbmRzIGZvciBcIk11bHRpcGxlLVJlY29yZFJUQ1wiLlxyXG4gKiBAbGljZW5zZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL211YXota2hhbi9SZWNvcmRSVEMjbGljZW5zZXxNSVR9XHJcbiAqIEBhdXRob3Ige0BsaW5rIGh0dHA6Ly93d3cuTXVhektoYW4uY29tfE11YXogS2hhbn1cclxuICogQHR5cGVkZWYgTVJlY29yZFJUQ1xyXG4gKiBAY2xhc3NcclxuICogQGV4YW1wbGVcclxuICogdmFyIHJlY29yZGVyID0gbmV3IE1SZWNvcmRSVEMoKTtcclxuICogcmVjb3JkZXIuYWRkU3RyZWFtKE1lZGlhU3RyZWFtKTtcclxuICogcmVjb3JkZXIubWVkaWFUeXBlID0ge1xyXG4gKiAgICAgYXVkaW86IHRydWUsIC8vIG9yIFN0ZXJlb0F1ZGlvUmVjb3JkZXIgb3IgTWVkaWFTdHJlYW1SZWNvcmRlclxyXG4gKiAgICAgdmlkZW86IHRydWUsIC8vIG9yIFdoYW1teVJlY29yZGVyIG9yIE1lZGlhU3RyZWFtUmVjb3JkZXJcclxuICogICAgIGdpZjogdHJ1ZSAgICAvLyBvciBHaWZSZWNvcmRlclxyXG4gKiB9O1xyXG4gKiAvLyBtaW1lVHlwZSBpcyBvcHRpb25hbCBhbmQgc2hvdWxkIGJlIHNldCBvbmx5IGluIGFkdmFuY2UgY2FzZXMuXHJcbiAqIHJlY29yZGVyLm1pbWVUeXBlID0ge1xyXG4gKiAgICAgYXVkaW86ICdhdWRpby93YXYnLFxyXG4gKiAgICAgdmlkZW86ICd2aWRlby93ZWJtJyxcclxuICogICAgIGdpZjogICAnaW1hZ2UvZ2lmJ1xyXG4gKiB9O1xyXG4gKiByZWNvcmRlci5zdGFydFJlY29yZGluZygpO1xyXG4gKiBAc2VlIEZvciBmdXJ0aGVyIGluZm9ybWF0aW9uOlxyXG4gKiBAc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbXVhei1raGFuL1JlY29yZFJUQy90cmVlL21hc3Rlci9NUmVjb3JkUlRDfE1SZWNvcmRSVEMgU291cmNlIENvZGV9XHJcbiAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG1lZGlhU3RyZWFtIC0gTWVkaWFTdHJlYW0gb2JqZWN0IGZldGNoZWQgdXNpbmcgZ2V0VXNlck1lZGlhIEFQSSBvciBnZW5lcmF0ZWQgdXNpbmcgY2FwdHVyZVN0cmVhbVVudGlsRW5kZWQgb3IgV2ViQXVkaW8gQVBJLlxyXG4gKiBAcmVxdWlyZXMge0BsaW5rIFJlY29yZFJUQ31cclxuICovXHJcblxyXG5mdW5jdGlvbiBNUmVjb3JkUlRDKG1lZGlhU3RyZWFtKSB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBhdHRhY2hlcyBNZWRpYVN0cmVhbSBvYmplY3QgdG8ge0BsaW5rIE1SZWNvcmRSVEN9LlxyXG4gICAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gbWVkaWFTdHJlYW0gLSBBIE1lZGlhU3RyZWFtIG9iamVjdCwgZWl0aGVyIGZldGNoZWQgdXNpbmcgZ2V0VXNlck1lZGlhIEFQSSwgb3IgZ2VuZXJhdGVkIHVzaW5nIGNhcHR1cmVTdHJlYW1VbnRpbEVuZGVkIG9yIFdlYkF1ZGlvIEFQSS5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBNUmVjb3JkUlRDXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIuYWRkU3RyZWFtKE1lZGlhU3RyZWFtKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5hZGRTdHJlYW0gPSBmdW5jdGlvbihfbWVkaWFTdHJlYW0pIHtcclxuICAgICAgICBpZiAoX21lZGlhU3RyZWFtKSB7XHJcbiAgICAgICAgICAgIG1lZGlhU3RyZWFtID0gX21lZGlhU3RyZWFtO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIHByb3BlcnR5IGNhbiBiZSB1c2VkIHRvIHNldCB0aGUgcmVjb3JkaW5nIHR5cGUgZS5nLiBhdWRpbywgb3IgdmlkZW8sIG9yIGdpZiwgb3IgY2FudmFzLlxyXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IG1lZGlhVHlwZSAtIHthdWRpbzogdHJ1ZSwgdmlkZW86IHRydWUsIGdpZjogdHJ1ZX1cclxuICAgICAqIEBtZW1iZXJvZiBNUmVjb3JkUlRDXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHJlY29yZGVyID0gbmV3IE1SZWNvcmRSVEMoKTtcclxuICAgICAqIHJlY29yZGVyLm1lZGlhVHlwZSA9IHtcclxuICAgICAqICAgICBhdWRpbzogdHJ1ZSwgLy8gVFJVRSBvciBTdGVyZW9BdWRpb1JlY29yZGVyIG9yIE1lZGlhU3RyZWFtUmVjb3JkZXJcclxuICAgICAqICAgICB2aWRlbzogdHJ1ZSwgLy8gVFJVRSBvciBXaGFtbXlSZWNvcmRlciBvciBNZWRpYVN0cmVhbVJlY29yZGVyXHJcbiAgICAgKiAgICAgZ2lmICA6IHRydWUgIC8vIFRSVUUgb3IgR2lmUmVjb3JkZXJcclxuICAgICAqIH07XHJcbiAgICAgKi9cclxuICAgIHRoaXMubWVkaWFUeXBlID0ge1xyXG4gICAgICAgIGF1ZGlvOiB0cnVlLFxyXG4gICAgICAgIHZpZGVvOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2Qgc3RhcnRzIHJlY29yZGluZy5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBNUmVjb3JkUlRDXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIuc3RhcnRSZWNvcmRpbmcoKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5zdGFydFJlY29yZGluZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBtZWRpYVR5cGUgPSB0aGlzLm1lZGlhVHlwZTtcclxuICAgICAgICB2YXIgcmVjb3JkZXJUeXBlO1xyXG4gICAgICAgIHZhciBtaW1lVHlwZSA9IHRoaXMubWltZVR5cGUgfHwge1xyXG4gICAgICAgICAgICBhdWRpbzogbnVsbCxcclxuICAgICAgICAgICAgdmlkZW86IG51bGwsXHJcbiAgICAgICAgICAgIGdpZjogbnVsbFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgbWVkaWFUeXBlLmF1ZGlvICE9PSAnZnVuY3Rpb24nICYmIGlzTWVkaWFSZWNvcmRlckNvbXBhdGlibGUoKSAmJiBtZWRpYVN0cmVhbS5nZXRBdWRpb1RyYWNrcyAmJiAhbWVkaWFTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbWVkaWFUeXBlLmF1ZGlvID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG1lZGlhVHlwZS52aWRlbyAhPT0gJ2Z1bmN0aW9uJyAmJiBpc01lZGlhUmVjb3JkZXJDb21wYXRpYmxlKCkgJiYgbWVkaWFTdHJlYW0uZ2V0VmlkZW9UcmFja3MgJiYgIW1lZGlhU3RyZWFtLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIG1lZGlhVHlwZS52aWRlbyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBtZWRpYVR5cGUuZ2lmICE9PSAnZnVuY3Rpb24nICYmIGlzTWVkaWFSZWNvcmRlckNvbXBhdGlibGUoKSAmJiBtZWRpYVN0cmVhbS5nZXRWaWRlb1RyYWNrcyAmJiAhbWVkaWFTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbWVkaWFUeXBlLmdpZiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFtZWRpYVR5cGUuYXVkaW8gJiYgIW1lZGlhVHlwZS52aWRlbyAmJiAhbWVkaWFUeXBlLmdpZikge1xyXG4gICAgICAgICAgICB0aHJvdyAnTWVkaWFTdHJlYW0gbXVzdCBoYXZlIGVpdGhlciBhdWRpbyBvciB2aWRlbyB0cmFja3MuJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghIW1lZGlhVHlwZS5hdWRpbykge1xyXG4gICAgICAgICAgICByZWNvcmRlclR5cGUgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG1lZGlhVHlwZS5hdWRpbyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkZXJUeXBlID0gbWVkaWFUeXBlLmF1ZGlvO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvUmVjb3JkZXIgPSBuZXcgUmVjb3JkUlRDKG1lZGlhU3RyZWFtLCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnYXVkaW8nLFxyXG4gICAgICAgICAgICAgICAgYnVmZmVyU2l6ZTogdGhpcy5idWZmZXJTaXplLFxyXG4gICAgICAgICAgICAgICAgc2FtcGxlUmF0ZTogdGhpcy5zYW1wbGVSYXRlLFxyXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZBdWRpb0NoYW5uZWxzOiB0aGlzLm51bWJlck9mQXVkaW9DaGFubmVscyB8fCAyLFxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZUxvZ3M6IHRoaXMuZGlzYWJsZUxvZ3MsXHJcbiAgICAgICAgICAgICAgICByZWNvcmRlclR5cGU6IHJlY29yZGVyVHlwZSxcclxuICAgICAgICAgICAgICAgIG1pbWVUeXBlOiBtaW1lVHlwZS5hdWRpbyxcclxuICAgICAgICAgICAgICAgIHRpbWVTbGljZTogdGhpcy50aW1lU2xpY2UsXHJcbiAgICAgICAgICAgICAgICBvblRpbWVTdGFtcDogdGhpcy5vblRpbWVTdGFtcFxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmICghbWVkaWFUeXBlLnZpZGVvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1ZGlvUmVjb3JkZXIuc3RhcnRSZWNvcmRpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCEhbWVkaWFUeXBlLnZpZGVvKSB7XHJcbiAgICAgICAgICAgIHJlY29yZGVyVHlwZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVkaWFUeXBlLnZpZGVvID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICByZWNvcmRlclR5cGUgPSBtZWRpYVR5cGUudmlkZW87XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBuZXdTdHJlYW0gPSBtZWRpYVN0cmVhbTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc01lZGlhUmVjb3JkZXJDb21wYXRpYmxlKCkgJiYgISFtZWRpYVR5cGUuYXVkaW8gJiYgdHlwZW9mIG1lZGlhVHlwZS5hdWRpbyA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHZpZGVvVHJhY2sgPSBtZWRpYVN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghIW5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdTdHJlYW0gPSBuZXcgTWVkaWFTdHJlYW0oKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdTdHJlYW0uYWRkVHJhY2sodmlkZW9UcmFjayk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmRlclR5cGUgJiYgcmVjb3JkZXJUeXBlID09PSBXaGFtbXlSZWNvcmRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGaXJlZm94IGRvZXMgTk9UIHN1cHBvcnQgd2VicC1lbmNvZGluZyB5ZXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkZXJUeXBlID0gTWVkaWFTdHJlYW1SZWNvcmRlcjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0cmVhbSA9IG5ldyBNZWRpYVN0cmVhbShbdmlkZW9UcmFja10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnZpZGVvUmVjb3JkZXIgPSBuZXcgUmVjb3JkUlRDKG5ld1N0cmVhbSwge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ3ZpZGVvJyxcclxuICAgICAgICAgICAgICAgIHZpZGVvOiB0aGlzLnZpZGVvLFxyXG4gICAgICAgICAgICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcyxcclxuICAgICAgICAgICAgICAgIGZyYW1lSW50ZXJ2YWw6IHRoaXMuZnJhbWVJbnRlcnZhbCB8fCAxMCxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVMb2dzOiB0aGlzLmRpc2FibGVMb2dzLFxyXG4gICAgICAgICAgICAgICAgcmVjb3JkZXJUeXBlOiByZWNvcmRlclR5cGUsXHJcbiAgICAgICAgICAgICAgICBtaW1lVHlwZTogbWltZVR5cGUudmlkZW8sXHJcbiAgICAgICAgICAgICAgICB0aW1lU2xpY2U6IHRoaXMudGltZVNsaWNlLFxyXG4gICAgICAgICAgICAgICAgb25UaW1lU3RhbXA6IHRoaXMub25UaW1lU3RhbXBcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIW1lZGlhVHlwZS5hdWRpbykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb1JlY29yZGVyLnN0YXJ0UmVjb3JkaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghIW1lZGlhVHlwZS5hdWRpbyAmJiAhIW1lZGlhVHlwZS52aWRlbykge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgICAgICAvLyB0aGlzIGxpbmUgcHJldmVudHMgU3RlcmVvQXVkaW9SZWNvcmRlclxyXG4gICAgICAgICAgICAvLyB0b2RvOiBmaXggaXRcclxuICAgICAgICAgICAgaWYgKGlzTWVkaWFSZWNvcmRlckNvbXBhdGlibGUoKSAvKiAmJiAhdGhpcy5hdWRpb1JlY29yZGVyICovICkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5hdWRpb1JlY29yZGVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHNlbGYudmlkZW9SZWNvcmRlci5zdGFydFJlY29yZGluZygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2VsZi52aWRlb1JlY29yZGVyLmluaXRSZWNvcmRlcihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvUmVjb3JkZXIuaW5pdFJlY29yZGVyKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBCb3RoIHJlY29yZGVycyBhcmUgcmVhZHkgdG8gcmVjb3JkIHRoaW5ncyBhY2N1cmF0ZWx5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudmlkZW9SZWNvcmRlci5zdGFydFJlY29yZGluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvUmVjb3JkZXIuc3RhcnRSZWNvcmRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoISFtZWRpYVR5cGUuZ2lmKSB7XHJcbiAgICAgICAgICAgIHJlY29yZGVyVHlwZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWVkaWFUeXBlLmdpZiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgcmVjb3JkZXJUeXBlID0gbWVkaWFUeXBlLmdpZjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmdpZlJlY29yZGVyID0gbmV3IFJlY29yZFJUQyhtZWRpYVN0cmVhbSwge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ2dpZicsXHJcbiAgICAgICAgICAgICAgICBmcmFtZVJhdGU6IHRoaXMuZnJhbWVSYXRlIHx8IDIwMCxcclxuICAgICAgICAgICAgICAgIHF1YWxpdHk6IHRoaXMucXVhbGl0eSB8fCAxMCxcclxuICAgICAgICAgICAgICAgIGRpc2FibGVMb2dzOiB0aGlzLmRpc2FibGVMb2dzLFxyXG4gICAgICAgICAgICAgICAgcmVjb3JkZXJUeXBlOiByZWNvcmRlclR5cGUsXHJcbiAgICAgICAgICAgICAgICBtaW1lVHlwZTogbWltZVR5cGUuZ2lmXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aGlzLmdpZlJlY29yZGVyLnN0YXJ0UmVjb3JkaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHN0b3BzIHJlY29yZGluZy5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gQ2FsbGJhY2sgZnVuY3Rpb24gaXMgaW52b2tlZCB3aGVuIGFsbCBlbmNvZGVycyBmaW5pc2hlZCB0aGVpciBqb2JzLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE1SZWNvcmRSVENcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5zdG9wUmVjb3JkaW5nKGZ1bmN0aW9uKHJlY29yZGluZyl7XHJcbiAgICAgKiAgICAgdmFyIGF1ZGlvQmxvYiA9IHJlY29yZGluZy5hdWRpbztcclxuICAgICAqICAgICB2YXIgdmlkZW9CbG9iID0gcmVjb3JkaW5nLnZpZGVvO1xyXG4gICAgICogICAgIHZhciBnaWZCbG9iICAgPSByZWNvcmRpbmcuZ2lmO1xyXG4gICAgICogfSk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMuc3RvcFJlY29yZGluZyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hdWRpb1JlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9SZWNvcmRlci5zdG9wUmVjb3JkaW5nKGZ1bmN0aW9uKGJsb2JVUkwpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGJsb2JVUkwsICdhdWRpbycpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZpZGVvUmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy52aWRlb1JlY29yZGVyLnN0b3BSZWNvcmRpbmcoZnVuY3Rpb24oYmxvYlVSTCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soYmxvYlVSTCwgJ3ZpZGVvJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2lmUmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5naWZSZWNvcmRlci5zdG9wUmVjb3JkaW5nKGZ1bmN0aW9uKGJsb2JVUkwpIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGJsb2JVUkwsICdnaWYnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHBhdXNlcyByZWNvcmRpbmcuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgTVJlY29yZFJUQ1xyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHJlY29yZGVyLnBhdXNlUmVjb3JkaW5nKCk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMucGF1c2VSZWNvcmRpbmcgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5hdWRpb1JlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9SZWNvcmRlci5wYXVzZVJlY29yZGluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmlkZW9SZWNvcmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvUmVjb3JkZXIucGF1c2VSZWNvcmRpbmcoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmdpZlJlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2lmUmVjb3JkZXIucGF1c2VSZWNvcmRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgcmVzdW1lcyByZWNvcmRpbmcuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgTVJlY29yZFJUQ1xyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHJlY29yZGVyLnJlc3VtZVJlY29yZGluZygpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnJlc3VtZVJlY29yZGluZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmF1ZGlvUmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb1JlY29yZGVyLnJlc3VtZVJlY29yZGluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmlkZW9SZWNvcmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvUmVjb3JkZXIucmVzdW1lUmVjb3JkaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5naWZSZWNvcmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLmdpZlJlY29yZGVyLnJlc3VtZVJlY29yZGluZygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBjYW4gYmUgdXNlZCB0byBtYW51YWxseSBnZXQgYWxsIHJlY29yZGVkIGJsb2JzLlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBBbGwgcmVjb3JkZWQgYmxvYnMgYXJlIHBhc3NlZCBiYWNrIHRvIHRoZSBcImNhbGxiYWNrXCIgZnVuY3Rpb24uXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgTVJlY29yZFJUQ1xyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHJlY29yZGVyLmdldEJsb2IoZnVuY3Rpb24ocmVjb3JkaW5nKXtcclxuICAgICAqICAgICB2YXIgYXVkaW9CbG9iID0gcmVjb3JkaW5nLmF1ZGlvO1xyXG4gICAgICogICAgIHZhciB2aWRlb0Jsb2IgPSByZWNvcmRpbmcudmlkZW87XHJcbiAgICAgKiAgICAgdmFyIGdpZkJsb2IgICA9IHJlY29yZGluZy5naWY7XHJcbiAgICAgKiB9KTtcclxuICAgICAqIC8vIG9yXHJcbiAgICAgKiB2YXIgYXVkaW9CbG9iID0gcmVjb3JkZXIuZ2V0QmxvYigpLmF1ZGlvO1xyXG4gICAgICogdmFyIHZpZGVvQmxvYiA9IHJlY29yZGVyLmdldEJsb2IoKS52aWRlbztcclxuICAgICAqL1xyXG4gICAgdGhpcy5nZXRCbG9iID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgb3V0cHV0ID0ge307XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmF1ZGlvUmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgb3V0cHV0LmF1ZGlvID0gdGhpcy5hdWRpb1JlY29yZGVyLmdldEJsb2IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnZpZGVvUmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgb3V0cHV0LnZpZGVvID0gdGhpcy52aWRlb1JlY29yZGVyLmdldEJsb2IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmdpZlJlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIG91dHB1dC5naWYgPSB0aGlzLmdpZlJlY29yZGVyLmdldEJsb2IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhvdXRwdXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZXN0cm95IGFsbCByZWNvcmRlciBpbnN0YW5jZXMuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgTVJlY29yZFJUQ1xyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHJlY29yZGVyLmRlc3Ryb3koKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYXVkaW9SZWNvcmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvUmVjb3JkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvUmVjb3JkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudmlkZW9SZWNvcmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvUmVjb3JkZXIuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvUmVjb3JkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZ2lmUmVjb3JkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5naWZSZWNvcmRlci5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2lmUmVjb3JkZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBjYW4gYmUgdXNlZCB0byBtYW51YWxseSBnZXQgYWxsIHJlY29yZGVkIGJsb2JzJyBEYXRhVVJMcy5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gQWxsIHJlY29yZGVkIGJsb2JzJyBEYXRhVVJMcyBhcmUgcGFzc2VkIGJhY2sgdG8gdGhlIFwiY2FsbGJhY2tcIiBmdW5jdGlvbi5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBNUmVjb3JkUlRDXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIuZ2V0RGF0YVVSTChmdW5jdGlvbihyZWNvcmRpbmcpe1xyXG4gICAgICogICAgIHZhciBhdWRpb0RhdGFVUkwgPSByZWNvcmRpbmcuYXVkaW87XHJcbiAgICAgKiAgICAgdmFyIHZpZGVvRGF0YVVSTCA9IHJlY29yZGluZy52aWRlbztcclxuICAgICAqICAgICB2YXIgZ2lmRGF0YVVSTCAgID0gcmVjb3JkaW5nLmdpZjtcclxuICAgICAqIH0pO1xyXG4gICAgICovXHJcbiAgICB0aGlzLmdldERhdGFVUkwgPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuZ2V0QmxvYihmdW5jdGlvbihibG9iKSB7XHJcbiAgICAgICAgICAgIGlmIChibG9iLmF1ZGlvICYmIGJsb2IudmlkZW8pIHtcclxuICAgICAgICAgICAgICAgIGdldERhdGFVUkwoYmxvYi5hdWRpbywgZnVuY3Rpb24oX2F1ZGlvRGF0YVVSTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldERhdGFVUkwoYmxvYi52aWRlbywgZnVuY3Rpb24oX3ZpZGVvRGF0YVVSTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdWRpbzogX2F1ZGlvRGF0YVVSTCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvOiBfdmlkZW9EYXRhVVJMXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYmxvYi5hdWRpbykge1xyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YVVSTChibG9iLmF1ZGlvLCBmdW5jdGlvbihfYXVkaW9EYXRhVVJMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdWRpbzogX2F1ZGlvRGF0YVVSTFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYmxvYi52aWRlbykge1xyXG4gICAgICAgICAgICAgICAgZ2V0RGF0YVVSTChibG9iLnZpZGVvLCBmdW5jdGlvbihfdmlkZW9EYXRhVVJMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlbzogX3ZpZGVvRGF0YVVSTFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0RGF0YVVSTChibG9iLCBjYWxsYmFjazAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgV29ya2VyICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdlYldvcmtlciA9IHByb2Nlc3NJbldlYldvcmtlcihmdW5jdGlvbiByZWFkRmlsZShfYmxvYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKG5ldyBGaWxlUmVhZGVyU3luYygpLnJlYWRBc0RhdGFVUkwoX2Jsb2IpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHdlYldvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrMDAoZXZlbnQuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHdlYldvcmtlci5wb3N0TWVzc2FnZShibG9iKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG4gICAgICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XHJcbiAgICAgICAgICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjazAwKGV2ZW50LnRhcmdldC5yZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcHJvY2Vzc0luV2ViV29ya2VyKF9mdW5jdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgYmxvYiA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW19mdW5jdGlvbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgJ3RoaXMub25tZXNzYWdlID0gIGZ1bmN0aW9uIChlZWUpIHsnICsgX2Z1bmN0aW9uLm5hbWUgKyAnKGVlZS5kYXRhKTt9J1xyXG4gICAgICAgICAgICBdLCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnYXBwbGljYXRpb24vamF2YXNjcmlwdCdcclxuICAgICAgICAgICAgfSkpO1xyXG5cclxuICAgICAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXIoYmxvYik7XHJcbiAgICAgICAgICAgIHZhciB1cmw7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgVVJMICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgdXJsID0gVVJMO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB3ZWJraXRVUkwgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICB1cmwgPSB3ZWJraXRVUkw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyAnTmVpdGhlciBVUkwgbm9yIHdlYmtpdFVSTCBkZXRlY3RlZC4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHVybC5yZXZva2VPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgICAgICAgIHJldHVybiB3b3JrZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIHRvIGFzayB7QGxpbmsgTVJlY29yZFJUQ30gdG8gd3JpdGUgYWxsIHJlY29yZGVkIGJsb2JzIGludG8gSW5kZXhlZERCIHN0b3JhZ2UuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgTVJlY29yZFJUQ1xyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHJlY29yZGVyLndyaXRlVG9EaXNrKCk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMud3JpdGVUb0Rpc2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBSZWNvcmRSVEMud3JpdGVUb0Rpc2soe1xyXG4gICAgICAgICAgICBhdWRpbzogdGhpcy5hdWRpb1JlY29yZGVyLFxyXG4gICAgICAgICAgICB2aWRlbzogdGhpcy52aWRlb1JlY29yZGVyLFxyXG4gICAgICAgICAgICBnaWY6IHRoaXMuZ2lmUmVjb3JkZXJcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBjYW4gYmUgdXNlZCB0byBpbnZva2UgYSBzYXZlLWFzIGRpYWxvZyBmb3IgYWxsIHJlY29yZGVkIGJsb2JzLlxyXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGFyZ3MgLSB7YXVkaW86ICdhdWRpby1uYW1lJywgdmlkZW86ICd2aWRlby1uYW1lJywgZ2lmOiAnZ2lmLW5hbWUnfVxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE1SZWNvcmRSVENcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5zYXZlKHtcclxuICAgICAqICAgICBhdWRpbzogJ2F1ZGlvLWZpbGUtbmFtZScsXHJcbiAgICAgKiAgICAgdmlkZW86ICd2aWRlby1maWxlLW5hbWUnLFxyXG4gICAgICogICAgIGdpZiAgOiAnZ2lmLWZpbGUtbmFtZSdcclxuICAgICAqIH0pO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnNhdmUgPSBmdW5jdGlvbihhcmdzKSB7XHJcbiAgICAgICAgYXJncyA9IGFyZ3MgfHwge1xyXG4gICAgICAgICAgICBhdWRpbzogdHJ1ZSxcclxuICAgICAgICAgICAgdmlkZW86IHRydWUsXHJcbiAgICAgICAgICAgIGdpZjogdHJ1ZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICghIWFyZ3MuYXVkaW8gJiYgdGhpcy5hdWRpb1JlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9SZWNvcmRlci5zYXZlKHR5cGVvZiBhcmdzLmF1ZGlvID09PSAnc3RyaW5nJyA/IGFyZ3MuYXVkaW8gOiAnJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoISFhcmdzLnZpZGVvICYmIHRoaXMudmlkZW9SZWNvcmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnZpZGVvUmVjb3JkZXIuc2F2ZSh0eXBlb2YgYXJncy52aWRlbyA9PT0gJ3N0cmluZycgPyBhcmdzLnZpZGVvIDogJycpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoISFhcmdzLmdpZiAmJiB0aGlzLmdpZlJlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2lmUmVjb3JkZXIuc2F2ZSh0eXBlb2YgYXJncy5naWYgPT09ICdzdHJpbmcnID8gYXJncy5naWYgOiAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIHRvIGdldCBhbGwgcmVjb3JkZWQgYmxvYnMgZnJvbSBJbmRleGVkREIgc3RvcmFnZS5cclxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSAnYWxsJyBvciAnYXVkaW8nIG9yICd2aWRlbycgb3IgJ2dpZidcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBDYWxsYmFjayBmdW5jdGlvbiB0byBnZXQgYWxsIHN0b3JlZCBibG9icy5cclxuICogQG1ldGhvZFxyXG4gKiBAbWVtYmVyb2YgTVJlY29yZFJUQ1xyXG4gKiBAZXhhbXBsZVxyXG4gKiBNUmVjb3JkUlRDLmdldEZyb21EaXNrKCdhbGwnLCBmdW5jdGlvbihkYXRhVVJMLCB0eXBlKXtcclxuICogICAgIGlmKHR5cGUgPT09ICdhdWRpbycpIHsgfVxyXG4gKiAgICAgaWYodHlwZSA9PT0gJ3ZpZGVvJykgeyB9XHJcbiAqICAgICBpZih0eXBlID09PSAnZ2lmJykgICB7IH1cclxuICogfSk7XHJcbiAqL1xyXG5NUmVjb3JkUlRDLmdldEZyb21EaXNrID0gUmVjb3JkUlRDLmdldEZyb21EaXNrO1xyXG5cclxuLyoqXHJcbiAqIFRoaXMgbWV0aG9kIGNhbiBiZSB1c2VkIHRvIHN0b3JlIHJlY29yZGVkIGJsb2JzIGludG8gSW5kZXhlZERCIHN0b3JhZ2UuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0ge2F1ZGlvOiBCbG9iLCB2aWRlbzogQmxvYiwgZ2lmOiBCbG9ifVxyXG4gKiBAbWV0aG9kXHJcbiAqIEBtZW1iZXJvZiBNUmVjb3JkUlRDXHJcbiAqIEBleGFtcGxlXHJcbiAqIE1SZWNvcmRSVEMud3JpdGVUb0Rpc2soe1xyXG4gKiAgICAgYXVkaW86IGF1ZGlvQmxvYixcclxuICogICAgIHZpZGVvOiB2aWRlb0Jsb2IsXHJcbiAqICAgICBnaWYgIDogZ2lmQmxvYlxyXG4gKiB9KTtcclxuICovXHJcbk1SZWNvcmRSVEMud3JpdGVUb0Rpc2sgPSBSZWNvcmRSVEMud3JpdGVUb0Rpc2s7XHJcblxyXG5pZiAodHlwZW9mIFJlY29yZFJUQyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIFJlY29yZFJUQy5NUmVjb3JkUlRDID0gTVJlY29yZFJUQztcclxufVxuXHJcbnZhciBicm93c2VyRmFrZVVzZXJBZ2VudCA9ICdGYWtlLzUuMCAoRmFrZU9TKSBBcHBsZVdlYktpdC8xMjMgKEtIVE1MLCBsaWtlIEdlY2tvKSBGYWtlLzEyLjMuNDU2Ny44OSBGYWtlLzEyMy40NSc7XHJcblxyXG4oZnVuY3Rpb24odGhhdCkge1xyXG4gICAgaWYgKCF0aGF0KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZ2xvYmFsLm5hdmlnYXRvciA9IHtcclxuICAgICAgICB1c2VyQWdlbnQ6IGJyb3dzZXJGYWtlVXNlckFnZW50LFxyXG4gICAgICAgIGdldFVzZXJNZWRpYTogZnVuY3Rpb24oKSB7fVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIWdsb2JhbC5jb25zb2xlKSB7XHJcbiAgICAgICAgZ2xvYmFsLmNvbnNvbGUgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGdsb2JhbC5jb25zb2xlLmxvZyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIGdsb2JhbC5jb25zb2xlLmVycm9yID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGdsb2JhbC5jb25zb2xlLmVycm9yID0gZ2xvYmFsLmNvbnNvbGUubG9nID0gZ2xvYmFsLmNvbnNvbGUubG9nIHx8IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcmd1bWVudHMpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvKmdsb2JhbCBkb2N1bWVudDp0cnVlICovXHJcbiAgICAgICAgdGhhdC5kb2N1bWVudCA9IHt9O1xyXG5cclxuICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50ID0gZG9jdW1lbnQuY2FwdHVyZVN0cmVhbSA9IGRvY3VtZW50Lm1vekNhcHR1cmVTdHJlYW0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIGdldENvbnRleHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgcGxheTogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgICAgICAgICAgIHBhdXNlOiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICAgICAgZHJhd0ltYWdlOiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICAgICAgdG9EYXRhVVJMOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhhdC5IVE1MVmlkZW9FbGVtZW50ID0gZnVuY3Rpb24oKSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGxvY2F0aW9uID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIC8qZ2xvYmFsIGxvY2F0aW9uOnRydWUgKi9cclxuICAgICAgICB0aGF0LmxvY2F0aW9uID0ge1xyXG4gICAgICAgICAgICBwcm90b2NvbDogJ2ZpbGU6JyxcclxuICAgICAgICAgICAgaHJlZjogJycsXHJcbiAgICAgICAgICAgIGhhc2g6ICcnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIHNjcmVlbiA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvKmdsb2JhbCBzY3JlZW46dHJ1ZSAqL1xyXG4gICAgICAgIHRoYXQuc2NyZWVuID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIFVSTCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvKmdsb2JhbCBzY3JlZW46dHJ1ZSAqL1xyXG4gICAgICAgIHRoYXQuVVJMID0ge1xyXG4gICAgICAgICAgICBjcmVhdGVPYmplY3RVUkw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZXZva2VPYmplY3RVUkw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKmdsb2JhbCB3aW5kb3c6dHJ1ZSAqL1xyXG4gICAgdGhhdC53aW5kb3cgPSBnbG9iYWw7XHJcbn0pKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDogbnVsbCk7XG5cclxuLy8gX19fX19fX19fX19fX19fX19fX19fX19fX19fX19cclxuLy8gQ3Jvc3MtQnJvd3Nlci1EZWNsYXJhdGlvbnMuanNcclxuXHJcbi8vIGFuaW1hdGlvbi1mcmFtZSB1c2VkIGluIFdlYk0gcmVjb3JkaW5nXHJcblxyXG4vKmpzaGludCAtVzA3OSAqL1xyXG52YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBpZiAodHlwZW9mIHdlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvKmdsb2JhbCByZXF1ZXN0QW5pbWF0aW9uRnJhbWU6dHJ1ZSAqL1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1velJlcXVlc3RBbmltYXRpb25GcmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvKmdsb2JhbCByZXF1ZXN0QW5pbWF0aW9uRnJhbWU6dHJ1ZSAqL1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSA9IG1velJlcXVlc3RBbmltYXRpb25GcmFtZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIC8qZ2xvYmFsIHJlcXVlc3RBbmltYXRpb25GcmFtZTp0cnVlICovXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gbXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgLy8gdmlhOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsaXJpc2gvMTU3OTY3MVxyXG4gICAgICAgIHZhciBsYXN0VGltZSA9IDA7XHJcblxyXG4gICAgICAgIC8qZ2xvYmFsIHJlcXVlc3RBbmltYXRpb25GcmFtZTp0cnVlICovXHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2ssIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xyXG4gICAgICAgICAgICB2YXIgaWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTtcclxuICAgICAgICAgICAgfSwgdGltZVRvQ2FsbCk7XHJcbiAgICAgICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xyXG4gICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuLypqc2hpbnQgLVcwNzkgKi9cclxudmFyIGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lO1xyXG5pZiAodHlwZW9mIGNhbmNlbEFuaW1hdGlvbkZyYW1lID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgaWYgKHR5cGVvZiB3ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvKmdsb2JhbCBjYW5jZWxBbmltYXRpb25GcmFtZTp0cnVlICovXHJcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1vekNhbmNlbEFuaW1hdGlvbkZyYW1lICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIC8qZ2xvYmFsIGNhbmNlbEFuaW1hdGlvbkZyYW1lOnRydWUgKi9cclxuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSA9IG1vekNhbmNlbEFuaW1hdGlvbkZyYW1lO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbXNDYW5jZWxBbmltYXRpb25GcmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAvKmdsb2JhbCBjYW5jZWxBbmltYXRpb25GcmFtZTp0cnVlICovXHJcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBtc0NhbmNlbEFuaW1hdGlvbkZyYW1lO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY2FuY2VsQW5pbWF0aW9uRnJhbWUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgLypnbG9iYWwgY2FuY2VsQW5pbWF0aW9uRnJhbWU6dHJ1ZSAqL1xyXG4gICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBXZWJBdWRpbyBBUEkgcmVwcmVzZW50ZXJcclxudmFyIEF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQ7XHJcblxyXG5pZiAodHlwZW9mIEF1ZGlvQ29udGV4dCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIGlmICh0eXBlb2Ygd2Via2l0QXVkaW9Db250ZXh0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIC8qZ2xvYmFsIEF1ZGlvQ29udGV4dDp0cnVlICovXHJcbiAgICAgICAgQXVkaW9Db250ZXh0ID0gd2Via2l0QXVkaW9Db250ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgbW96QXVkaW9Db250ZXh0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIC8qZ2xvYmFsIEF1ZGlvQ29udGV4dDp0cnVlICovXHJcbiAgICAgICAgQXVkaW9Db250ZXh0ID0gbW96QXVkaW9Db250ZXh0O1xyXG4gICAgfVxyXG59XHJcblxyXG4vKmpzaGludCAtVzA3OSAqL1xyXG52YXIgVVJMID0gd2luZG93LlVSTDtcclxuXHJcbmlmICh0eXBlb2YgVVJMID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2Via2l0VVJMICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgLypnbG9iYWwgVVJMOnRydWUgKi9cclxuICAgIFVSTCA9IHdlYmtpdFVSTDtcclxufVxyXG5cclxuaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID09PSAndW5kZWZpbmVkJykgeyAvLyBtYXliZSB3aW5kb3cubmF2aWdhdG9yP1xyXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYTtcclxuICAgIH1cclxufVxyXG5cclxudmFyIGlzRWRnZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignRWRnZScpICE9PSAtMSAmJiAoISFuYXZpZ2F0b3IubXNTYXZlQmxvYiB8fCAhIW5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKTtcclxudmFyIGlzT3BlcmEgPSAhIXdpbmRvdy5vcGVyYSB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ09QUi8nKSAhPT0gLTE7XHJcbnZhciBpc1NhZmFyaSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdzYWZhcmkvJykgPiAtMTtcclxudmFyIGlzQ2hyb21lID0gKCFpc09wZXJhICYmICFpc0VkZ2UgJiYgISFuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhKSB8fCBpc0VsZWN0cm9uKCkgfHwgaXNTYWZhcmk7XHJcblxyXG52YXIgTWVkaWFTdHJlYW0gPSB3aW5kb3cuTWVkaWFTdHJlYW07XHJcblxyXG5pZiAodHlwZW9mIE1lZGlhU3RyZWFtID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2Via2l0TWVkaWFTdHJlYW0gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBNZWRpYVN0cmVhbSA9IHdlYmtpdE1lZGlhU3RyZWFtO1xyXG59XHJcblxyXG4vKmdsb2JhbCBNZWRpYVN0cmVhbTp0cnVlICovXHJcbmlmICh0eXBlb2YgTWVkaWFTdHJlYW0gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBpZiAoISgnZ2V0VmlkZW9UcmFja3MnIGluIE1lZGlhU3RyZWFtLnByb3RvdHlwZSkpIHtcclxuICAgICAgICBNZWRpYVN0cmVhbS5wcm90b3R5cGUuZ2V0VmlkZW9UcmFja3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFRyYWNrcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdHJhY2tzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VHJhY2tzKCkuZm9yRWFjaChmdW5jdGlvbih0cmFjaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyYWNrLmtpbmQudG9TdHJpbmcoKS5pbmRleE9mKCd2aWRlbycpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYWNrcy5wdXNoKHRyYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cmFja3M7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgTWVkaWFTdHJlYW0ucHJvdG90eXBlLmdldEF1ZGlvVHJhY2tzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5nZXRUcmFja3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHRyYWNrcyA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgICAgICAgIGlmICh0cmFjay5raW5kLnRvU3RyaW5nKCkuaW5kZXhPZignYXVkaW8nKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFja3MucHVzaCh0cmFjayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJhY2tzO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gb3ZlcnJpZGUgXCJzdG9wXCIgbWV0aG9kIGZvciBhbGwgYnJvd3NlcnNcclxuICAgIGlmICh0eXBlb2YgTWVkaWFTdHJlYW0ucHJvdG90eXBlLnN0b3AgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgTWVkaWFTdHJlYW0ucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5nZXRUcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFjay5zdG9wKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGJlbG93IGZ1bmN0aW9uIHZpYTogaHR0cDovL2dvby5nbC9CM2FlOGNcclxuLyoqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBieXRlcyAtIFBhc3MgYnl0ZXMgYW5kIGdldCBmb3JtYWZ0ZWQgc3RyaW5nLlxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtIGZvcm1hZnRlZCBzdHJpbmdcclxuICogQGV4YW1wbGVcclxuICogYnl0ZXNUb1NpemUoMTAyNCoxMDI0KjUpID09PSAnNSBHQidcclxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL211YXota2hhbi9SZWNvcmRSVEN8UmVjb3JkUlRDIFNvdXJjZSBDb2RlfVxyXG4gKi9cclxuZnVuY3Rpb24gYnl0ZXNUb1NpemUoYnl0ZXMpIHtcclxuICAgIHZhciBrID0gMTAwMDtcclxuICAgIHZhciBzaXplcyA9IFsnQnl0ZXMnLCAnS0InLCAnTUInLCAnR0InLCAnVEInXTtcclxuICAgIGlmIChieXRlcyA9PT0gMCkge1xyXG4gICAgICAgIHJldHVybiAnMCBCeXRlcyc7XHJcbiAgICB9XHJcbiAgICB2YXIgaSA9IHBhcnNlSW50KE1hdGguZmxvb3IoTWF0aC5sb2coYnl0ZXMpIC8gTWF0aC5sb2coaykpLCAxMCk7XHJcbiAgICByZXR1cm4gKGJ5dGVzIC8gTWF0aC5wb3coaywgaSkpLnRvUHJlY2lzaW9uKDMpICsgJyAnICsgc2l6ZXNbaV07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAcGFyYW0ge0Jsb2J9IGZpbGUgLSBGaWxlIG9yIEJsb2Igb2JqZWN0LiBUaGlzIHBhcmFtZXRlciBpcyByZXF1aXJlZC5cclxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVOYW1lIC0gT3B0aW9uYWwgZmlsZSBuYW1lIGUuZy4gXCJSZWNvcmRlZC1WaWRlby53ZWJtXCJcclxuICogQGV4YW1wbGVcclxuICogaW52b2tlU2F2ZUFzRGlhbG9nKGJsb2Igb3IgZmlsZSwgW29wdGlvbmFsXSBmaWxlTmFtZSk7XHJcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDfFJlY29yZFJUQyBTb3VyY2UgQ29kZX1cclxuICovXHJcbmZ1bmN0aW9uIGludm9rZVNhdmVBc0RpYWxvZyhmaWxlLCBmaWxlTmFtZSkge1xyXG4gICAgaWYgKCFmaWxlKSB7XHJcbiAgICAgICAgdGhyb3cgJ0Jsb2Igb2JqZWN0IGlzIHJlcXVpcmVkLic7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFmaWxlLnR5cGUpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmaWxlLnR5cGUgPSAndmlkZW8vd2VibSc7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgIH1cclxuXHJcbiAgICB2YXIgZmlsZUV4dGVuc2lvbiA9IChmaWxlLnR5cGUgfHwgJ3ZpZGVvL3dlYm0nKS5zcGxpdCgnLycpWzFdO1xyXG5cclxuICAgIGlmIChmaWxlTmFtZSAmJiBmaWxlTmFtZS5pbmRleE9mKCcuJykgIT09IC0xKSB7XHJcbiAgICAgICAgdmFyIHNwbGl0dGVkID0gZmlsZU5hbWUuc3BsaXQoJy4nKTtcclxuICAgICAgICBmaWxlTmFtZSA9IHNwbGl0dGVkWzBdO1xyXG4gICAgICAgIGZpbGVFeHRlbnNpb24gPSBzcGxpdHRlZFsxXTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgZmlsZUZ1bGxOYW1lID0gKGZpbGVOYW1lIHx8IChNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiA5OTk5OTk5OTk5KSArIDg4ODg4ODg4OCkpICsgJy4nICsgZmlsZUV4dGVuc2lvbjtcclxuXHJcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHJldHVybiBuYXZpZ2F0b3IubXNTYXZlT3JPcGVuQmxvYihmaWxlLCBmaWxlRnVsbE5hbWUpO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbmF2aWdhdG9yLm1zU2F2ZUJsb2IgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tc1NhdmVCbG9iKGZpbGUsIGZpbGVGdWxsTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGh5cGVybGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgIGh5cGVybGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcclxuICAgIGh5cGVybGluay5kb3dubG9hZCA9IGZpbGVGdWxsTmFtZTtcclxuXHJcbiAgICBoeXBlcmxpbmsuc3R5bGUgPSAnZGlzcGxheTpub25lO29wYWNpdHk6MDtjb2xvcjp0cmFuc3BhcmVudDsnO1xyXG4gICAgKGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KS5hcHBlbmRDaGlsZChoeXBlcmxpbmspO1xyXG5cclxuICAgIGlmICh0eXBlb2YgaHlwZXJsaW5rLmNsaWNrID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgaHlwZXJsaW5rLmNsaWNrKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGh5cGVybGluay50YXJnZXQgPSAnX2JsYW5rJztcclxuICAgICAgICBoeXBlcmxpbmsuZGlzcGF0Y2hFdmVudChuZXcgTW91c2VFdmVudCgnY2xpY2snLCB7XHJcbiAgICAgICAgICAgIHZpZXc6IHdpbmRvdyxcclxuICAgICAgICAgICAgYnViYmxlczogdHJ1ZSxcclxuICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGh5cGVybGluay5ocmVmKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIGZyb206IGh0dHBzOi8vZ2l0aHViLmNvbS9jaGV0b24vaXMtZWxlY3Ryb24vYmxvYi9tYXN0ZXIvaW5kZXguanNcclxuICoqL1xyXG5mdW5jdGlvbiBpc0VsZWN0cm9uKCkge1xyXG4gICAgLy8gUmVuZGVyZXIgcHJvY2Vzc1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cucHJvY2VzcyA9PT0gJ29iamVjdCcgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1haW4gcHJvY2Vzc1xyXG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcHJvY2Vzcy52ZXJzaW9ucyA9PT0gJ29iamVjdCcgJiYgISFwcm9jZXNzLnZlcnNpb25zLmVsZWN0cm9uKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGV0ZWN0IHRoZSB1c2VyIGFnZW50IHdoZW4gdGhlIGBub2RlSW50ZWdyYXRpb25gIG9wdGlvbiBpcyBzZXQgdG8gdHJ1ZVxyXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgPT09ICdvYmplY3QnICYmIHR5cGVvZiBuYXZpZ2F0b3IudXNlckFnZW50ID09PSAnc3RyaW5nJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0VsZWN0cm9uJykgPj0gMCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0U3JjT2JqZWN0KHN0cmVhbSwgZWxlbWVudCwgaWdub3JlQ3JlYXRlT2JqZWN0VVJMKSB7XHJcbiAgICBpZiAoJ2NyZWF0ZU9iamVjdFVSTCcgaW4gVVJMICYmICFpZ25vcmVDcmVhdGVPYmplY3RVUkwpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoc3RyZWFtKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHNldFNyY09iamVjdChzdHJlYW0sIGVsZW1lbnQsIHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICgnc3JjT2JqZWN0JyBpbiBlbGVtZW50KSB7XHJcbiAgICAgICAgZWxlbWVudC5zcmNPYmplY3QgPSBzdHJlYW07XHJcbiAgICB9IGVsc2UgaWYgKCdtb3pTcmNPYmplY3QnIGluIGVsZW1lbnQpIHtcclxuICAgICAgICBlbGVtZW50Lm1velNyY09iamVjdCA9IHN0cmVhbTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxlcnQoJ2NyZWF0ZU9iamVjdFVSTC9zcmNPYmplY3QgYm90aCBhcmUgbm90IHN1cHBvcnRlZC4nKTtcclxuICAgIH1cclxufVxuXHJcbi8vIF9fX19fX19fX18gKHVzZWQgdG8gaGFuZGxlIHN0dWZmIGxpa2UgaHR0cDovL2dvby5nbC94bUU1ZWcpIGlzc3VlICMxMjlcclxuLy8gU3RvcmFnZS5qc1xyXG5cclxuLyoqXHJcbiAqIFN0b3JhZ2UgaXMgYSBzdGFuZGFsb25lIG9iamVjdCB1c2VkIGJ5IHtAbGluayBSZWNvcmRSVEN9IHRvIHN0b3JlIHJldXNhYmxlIG9iamVjdHMgZS5nLiBcIm5ldyBBdWRpb0NvbnRleHRcIi5cclxuICogQGxpY2Vuc2Uge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDI2xpY2Vuc2V8TUlUfVxyXG4gKiBAYXV0aG9yIHtAbGluayBodHRwOi8vd3d3Lk11YXpLaGFuLmNvbXxNdWF6IEtoYW59XHJcbiAqIEBleGFtcGxlXHJcbiAqIFN0b3JhZ2UuQXVkaW9Db250ZXh0ID09PSB3ZWJraXRBdWRpb0NvbnRleHRcclxuICogQHByb3BlcnR5IHt3ZWJraXRBdWRpb0NvbnRleHR9IEF1ZGlvQ29udGV4dCAtIEtlZXBzIGEgcmVmZXJlbmNlIHRvIEF1ZGlvQ29udGV4dCBvYmplY3QuXHJcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDfFJlY29yZFJUQyBTb3VyY2UgQ29kZX1cclxuICovXHJcblxyXG52YXIgU3RvcmFnZSA9IHt9O1xyXG5cclxuaWYgKHR5cGVvZiBBdWRpb0NvbnRleHQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBTdG9yYWdlLkF1ZGlvQ29udGV4dCA9IEF1ZGlvQ29udGV4dDtcclxufSBlbHNlIGlmICh0eXBlb2Ygd2Via2l0QXVkaW9Db250ZXh0ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgU3RvcmFnZS5BdWRpb0NvbnRleHQgPSB3ZWJraXRBdWRpb0NvbnRleHQ7XHJcbn1cclxuXHJcbmlmICh0eXBlb2YgUmVjb3JkUlRDICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgUmVjb3JkUlRDLlN0b3JhZ2UgPSBTdG9yYWdlO1xyXG59XG5cclxuZnVuY3Rpb24gaXNNZWRpYVJlY29yZGVyQ29tcGF0aWJsZSgpIHtcclxuICAgIHZhciBpc09wZXJhID0gISF3aW5kb3cub3BlcmEgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCcgT1BSLycpID49IDA7XHJcbiAgICB2YXIgaXNDaHJvbWUgPSAoISF3aW5kb3cuY2hyb21lICYmICFpc09wZXJhKSB8fCBpc0VsZWN0cm9uKCk7XHJcbiAgICB2YXIgaXNGaXJlZm94ID0gdHlwZW9mIHdpbmRvdy5JbnN0YWxsVHJpZ2dlciAhPT0gJ3VuZGVmaW5lZCc7XHJcblxyXG4gICAgaWYgKGlzRmlyZWZveCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBuVmVyID0gbmF2aWdhdG9yLmFwcFZlcnNpb247XHJcbiAgICB2YXIgbkFndCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XHJcbiAgICB2YXIgZnVsbFZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pO1xyXG4gICAgdmFyIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLCAxMCk7XHJcbiAgICB2YXIgbmFtZU9mZnNldCwgdmVyT2Zmc2V0LCBpeDtcclxuXHJcbiAgICBpZiAoaXNDaHJvbWUgfHwgaXNPcGVyYSkge1xyXG4gICAgICAgIHZlck9mZnNldCA9IG5BZ3QuaW5kZXhPZignQ2hyb21lJyk7XHJcbiAgICAgICAgZnVsbFZlcnNpb24gPSBuQWd0LnN1YnN0cmluZyh2ZXJPZmZzZXQgKyA3KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB0cmltIHRoZSBmdWxsVmVyc2lvbiBzdHJpbmcgYXQgc2VtaWNvbG9uL3NwYWNlIGlmIHByZXNlbnRcclxuICAgIGlmICgoaXggPSBmdWxsVmVyc2lvbi5pbmRleE9mKCc7JykpICE9PSAtMSkge1xyXG4gICAgICAgIGZ1bGxWZXJzaW9uID0gZnVsbFZlcnNpb24uc3Vic3RyaW5nKDAsIGl4KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoKGl4ID0gZnVsbFZlcnNpb24uaW5kZXhPZignICcpKSAhPT0gLTEpIHtcclxuICAgICAgICBmdWxsVmVyc2lvbiA9IGZ1bGxWZXJzaW9uLnN1YnN0cmluZygwLCBpeCk7XHJcbiAgICB9XHJcblxyXG4gICAgbWFqb3JWZXJzaW9uID0gcGFyc2VJbnQoJycgKyBmdWxsVmVyc2lvbiwgMTApO1xyXG5cclxuICAgIGlmIChpc05hTihtYWpvclZlcnNpb24pKSB7XHJcbiAgICAgICAgZnVsbFZlcnNpb24gPSAnJyArIHBhcnNlRmxvYXQobmF2aWdhdG9yLmFwcFZlcnNpb24pO1xyXG4gICAgICAgIG1ham9yVmVyc2lvbiA9IHBhcnNlSW50KG5hdmlnYXRvci5hcHBWZXJzaW9uLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1ham9yVmVyc2lvbiA+PSA0OTtcclxufVxuXHJcbi8vIF9fX19fX19fX19fX19fX19fX19fX19cbi8vIE1lZGlhU3RyZWFtUmVjb3JkZXIuanNcblxuLyoqXG4gKiBNZWRpYVN0cmVhbVJlY29yZGVyIGlzIGFuIGFic3RyYWN0aW9uIGxheWVyIGZvciB7QGxpbmsgaHR0cHM6Ly93M2MuZ2l0aHViLmlvL21lZGlhY2FwdHVyZS1yZWNvcmQvTWVkaWFSZWNvcmRlci5odG1sfE1lZGlhUmVjb3JkZXIgQVBJfS4gSXQgaXMgdXNlZCBieSB7QGxpbmsgUmVjb3JkUlRDfSB0byByZWNvcmQgTWVkaWFTdHJlYW0ocykgaW4gYm90aCBDaHJvbWUgYW5kIEZpcmVmb3guXG4gKiBAc3VtbWFyeSBSdW5zIHRvcCBvdmVyIHtAbGluayBodHRwczovL3czYy5naXRodWIuaW8vbWVkaWFjYXB0dXJlLXJlY29yZC9NZWRpYVJlY29yZGVyLmh0bWx8TWVkaWFSZWNvcmRlciBBUEl9LlxuICogQGxpY2Vuc2Uge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDI2xpY2Vuc2V8TUlUfVxuICogQGF1dGhvciB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL211YXota2hhbnxNdWF6IEtoYW59XG4gKiBAdHlwZWRlZiBNZWRpYVN0cmVhbVJlY29yZGVyXG4gKiBAY2xhc3NcbiAqIEBleGFtcGxlXG4gKiB2YXIgY29uZmlnID0ge1xuICogICAgIG1pbWVUeXBlOiAndmlkZW8vd2VibScsIC8vIHZwOCwgdnA5LCBoMjY0LCBta3YsIG9wdXMvdm9yYmlzXG4gKiAgICAgYXVkaW9CaXRzUGVyU2Vjb25kIDogMjU2ICogOCAqIDEwMjQsXG4gKiAgICAgdmlkZW9CaXRzUGVyU2Vjb25kIDogMjU2ICogOCAqIDEwMjQsXG4gKiAgICAgYml0c1BlclNlY29uZDogMjU2ICogOCAqIDEwMjQsICAvLyBpZiB0aGlzIGlzIHByb3ZpZGVkLCBza2lwIGFib3ZlIHR3b1xuICogICAgIGNoZWNrRm9ySW5hY3RpdmVUcmFja3M6IHRydWUsXG4gKiAgICAgdGltZVNsaWNlOiAxMDAwLCAvLyBjb25jYXRlbmF0ZSBpbnRlcnZhbHMgYmFzZWQgYmxvYnNcbiAqICAgICBvbmRhdGFhdmFpbGFibGU6IGZ1bmN0aW9uKCkge30gLy8gZ2V0IGludGVydmFscyBiYXNlZCBibG9ic1xuICogfVxuICogdmFyIHJlY29yZGVyID0gbmV3IE1lZGlhU3RyZWFtUmVjb3JkZXIobWVkaWFTdHJlYW0sIGNvbmZpZyk7XG4gKiByZWNvcmRlci5yZWNvcmQoKTtcbiAqIHJlY29yZGVyLnN0b3AoZnVuY3Rpb24oYmxvYikge1xuICogICAgIHZpZGVvLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gKlxuICogICAgIC8vIG9yXG4gKiAgICAgdmFyIGJsb2IgPSByZWNvcmRlci5ibG9iO1xuICogfSk7XG4gKiBAc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbXVhei1raGFuL1JlY29yZFJUQ3xSZWNvcmRSVEMgU291cmNlIENvZGV9XG4gKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBtZWRpYVN0cmVhbSAtIE1lZGlhU3RyZWFtIG9iamVjdCBmZXRjaGVkIHVzaW5nIGdldFVzZXJNZWRpYSBBUEkgb3IgZ2VuZXJhdGVkIHVzaW5nIGNhcHR1cmVTdHJlYW1VbnRpbEVuZGVkIG9yIFdlYkF1ZGlvIEFQSS5cbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgLSB7ZGlzYWJsZUxvZ3M6dHJ1ZSwgaW5pdENhbGxiYWNrOiBmdW5jdGlvbiwgbWltZVR5cGU6IFwidmlkZW8vd2VibVwiLCB0aW1lU2xpY2U6IDEwMDB9XG4gKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgZmlyc3QgYXJndW1lbnQgXCJNZWRpYVN0cmVhbVwiIGlzIG1pc3NpbmcuIEFsc28gdGhyb3dzIGVycm9yIGlmIFwiTWVkaWFSZWNvcmRlciBBUElcIiBhcmUgbm90IHN1cHBvcnRlZCBieSB0aGUgYnJvd3Nlci5cbiAqL1xuXG5mdW5jdGlvbiBNZWRpYVN0cmVhbVJlY29yZGVyKG1lZGlhU3RyZWFtLCBjb25maWcpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAodHlwZW9mIG1lZGlhU3RyZWFtID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyAnRmlyc3QgYXJndW1lbnQgXCJNZWRpYVN0cmVhbVwiIGlzIHJlcXVpcmVkLic7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBNZWRpYVJlY29yZGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyAnWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnRzIE1lZGlhIFJlY29yZGVyIEFQSS4gUGxlYXNlIHRyeSBvdGhlciBtb2R1bGVzIGUuZy4gV2hhbW15UmVjb3JkZXIgb3IgU3RlcmVvQXVkaW9SZWNvcmRlci4nO1xuICAgIH1cblxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7XG4gICAgICAgIC8vIGJpdHNQZXJTZWNvbmQ6IDI1NiAqIDggKiAxMDI0LFxuICAgICAgICBtaW1lVHlwZTogJ3ZpZGVvL3dlYm0nXG4gICAgfTtcblxuICAgIGlmIChjb25maWcudHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICBpZiAobWVkaWFTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGggJiYgbWVkaWFTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBzdHJlYW07XG4gICAgICAgICAgICBpZiAoISFuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKSB7XG4gICAgICAgICAgICAgICAgc3RyZWFtID0gbmV3IE1lZGlhU3RyZWFtKCk7XG4gICAgICAgICAgICAgICAgc3RyZWFtLmFkZFRyYWNrKG1lZGlhU3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB3ZWJraXRNZWRpYVN0cmVhbVxuICAgICAgICAgICAgICAgIHN0cmVhbSA9IG5ldyBNZWRpYVN0cmVhbShtZWRpYVN0cmVhbS5nZXRBdWRpb1RyYWNrcygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1lZGlhU3RyZWFtID0gc3RyZWFtO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjb25maWcubWltZVR5cGUgfHwgY29uZmlnLm1pbWVUeXBlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdhdWRpbycpID09PSAtMSkge1xuICAgICAgICAgICAgY29uZmlnLm1pbWVUeXBlID0gaXNDaHJvbWUgPyAnYXVkaW8vd2VibScgOiAnYXVkaW8vb2dnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcubWltZVR5cGUgJiYgY29uZmlnLm1pbWVUeXBlLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSAhPT0gJ2F1ZGlvL29nZycgJiYgISFuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKSB7XG4gICAgICAgICAgICAvLyBmb3JjaW5nIGJldHRlciBjb2RlY3Mgb24gRmlyZWZveCAodmlhICMxNjYpXG4gICAgICAgICAgICBjb25maWcubWltZVR5cGUgPSAnYXVkaW8vb2dnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBhcnJheU9mQmxvYnMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHJldHVybnMgYXJyYXkgb2YgYmxvYnMuIFVzZSBvbmx5IHdpdGggXCJ0aW1lU2xpY2VcIi4gSXRzIHVzZWZ1bCB0byBwcmV2aWV3IHJlY29yZGluZyBhbnl0aW1lLCB3aXRob3V0IHVzaW5nIHRoZSBcInN0b3BcIiBtZXRob2QuXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBtZW1iZXJvZiBNZWRpYVN0cmVhbVJlY29yZGVyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgYXJyYXlPZkJsb2JzID0gcmVjb3JkZXIuZ2V0QXJyYXlPZkJsb2JzKCk7XG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFycmF5IG9mIHJlY29yZGVkIGJsb2JzLlxuICAgICAqL1xuICAgIHRoaXMuZ2V0QXJyYXlPZkJsb2JzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBhcnJheU9mQmxvYnM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHJlY29yZHMgTWVkaWFTdHJlYW0uXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBtZW1iZXJvZiBNZWRpYVN0cmVhbVJlY29yZGVyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiByZWNvcmRlci5yZWNvcmQoKTtcbiAgICAgKi9cbiAgICB0aGlzLnJlY29yZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBzZXQgZGVmYXVsdHNcbiAgICAgICAgc2VsZi5ibG9iID0gbnVsbDtcbiAgICAgICAgc2VsZi5jbGVhclJlY29yZGVkRGF0YSgpO1xuICAgICAgICBzZWxmLnRpbWVzdGFtcHMgPSBbXTtcbiAgICAgICAgYWxsU3RhdGVzID0gW107XG4gICAgICAgIGFycmF5T2ZCbG9icyA9IFtdO1xuXG4gICAgICAgIHZhciByZWNvcmRlckhpbnRzID0gY29uZmlnO1xuXG4gICAgICAgIGlmICghY29uZmlnLmRpc2FibGVMb2dzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUGFzc2luZyBmb2xsb3dpbmcgY29uZmlnIG92ZXIgTWVkaWFSZWNvcmRlciBBUEkuJywgcmVjb3JkZXJIaW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWVkaWFSZWNvcmRlcikge1xuICAgICAgICAgICAgLy8gbWFuZGF0b3J5IHRvIG1ha2Ugc3VyZSBGaXJlZm94IGRvZXNuJ3QgZmFpbHMgdG8gcmVjb3JkIHN0cmVhbXMgMy00IHRpbWVzIHdpdGhvdXQgcmVsb2FkaW5nIHRoZSBwYWdlLlxuICAgICAgICAgICAgbWVkaWFSZWNvcmRlciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNDaHJvbWUgJiYgIWlzTWVkaWFSZWNvcmRlckNvbXBhdGlibGUoKSkge1xuICAgICAgICAgICAgLy8gdG8gc3VwcG9ydCB2aWRlby1vbmx5IHJlY29yZGluZyBvbiBzdGFibGVcbiAgICAgICAgICAgIHJlY29yZGVySGludHMgPSAndmlkZW8vdnA4JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgTWVkaWFSZWNvcmRlci5pc1R5cGVTdXBwb3J0ZWQgPT09ICdmdW5jdGlvbicgJiYgcmVjb3JkZXJIaW50cy5taW1lVHlwZSkge1xuICAgICAgICAgICAgaWYgKCFNZWRpYVJlY29yZGVyLmlzVHlwZVN1cHBvcnRlZChyZWNvcmRlckhpbnRzLm1pbWVUeXBlKSkge1xuICAgICAgICAgICAgICAgIGlmICghY29uZmlnLmRpc2FibGVMb2dzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignTWVkaWFSZWNvcmRlciBBUEkgc2VlbXMgdW5hYmxlIHRvIHJlY29yZCBtaW1lVHlwZTonLCByZWNvcmRlckhpbnRzLm1pbWVUeXBlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZWNvcmRlckhpbnRzLm1pbWVUeXBlID0gY29uZmlnLnR5cGUgPT09ICdhdWRpbycgPyAnYXVkaW8vd2VibScgOiAndmlkZW8vd2VibSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB1c2luZyBNZWRpYVJlY29yZGVyIEFQSSBoZXJlXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBtZWRpYVJlY29yZGVyID0gbmV3IE1lZGlhUmVjb3JkZXIobWVkaWFTdHJlYW0sIHJlY29yZGVySGludHMpO1xuXG4gICAgICAgICAgICAvLyByZXNldFxuICAgICAgICAgICAgY29uZmlnLm1pbWVUeXBlID0gcmVjb3JkZXJIaW50cy5taW1lVHlwZTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gY2hyb21lLWJhc2VkIGZhbGxiYWNrXG4gICAgICAgICAgICBtZWRpYVJlY29yZGVyID0gbmV3IE1lZGlhUmVjb3JkZXIobWVkaWFTdHJlYW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gb2xkIGhhY2s/XG4gICAgICAgIGlmIChyZWNvcmRlckhpbnRzLm1pbWVUeXBlICYmICFNZWRpYVJlY29yZGVyLmlzVHlwZVN1cHBvcnRlZCAmJiAnY2FuUmVjb3JkTWltZVR5cGUnIGluIG1lZGlhUmVjb3JkZXIgJiYgbWVkaWFSZWNvcmRlci5jYW5SZWNvcmRNaW1lVHlwZShyZWNvcmRlckhpbnRzLm1pbWVUeXBlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICghY29uZmlnLmRpc2FibGVMb2dzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdNZWRpYVJlY29yZGVyIEFQSSBzZWVtcyB1bmFibGUgdG8gcmVjb3JkIG1pbWVUeXBlOicsIHJlY29yZGVySGludHMubWltZVR5cGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGlzcGF0Y2hpbmcgT25EYXRhQXZhaWxhYmxlIEhhbmRsZXJcbiAgICAgICAgbWVkaWFSZWNvcmRlci5vbmRhdGFhdmFpbGFibGUgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoZS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgYWxsU3RhdGVzLnB1c2goJ29uZGF0YWF2YWlsYWJsZTogJyArIGJ5dGVzVG9TaXplKGUuZGF0YS5zaXplKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnLnRpbWVTbGljZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICBpZiAoZS5kYXRhICYmIGUuZGF0YS5zaXplICYmIGUuZGF0YS5zaXplID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5T2ZCbG9icy5wdXNoKGUuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRpbWVTdGFtcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29uZmlnLm9uZGF0YWF2YWlsYWJsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW50ZXJ2YWxzIGJhc2VkIGJsb2JzXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYmxvYiA9IGNvbmZpZy5nZXROYXRpdmVCbG9iID8gZS5kYXRhIDogbmV3IEJsb2IoW2UuZGF0YV0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBnZXRNaW1lVHlwZShyZWNvcmRlckhpbnRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcub25kYXRhYXZhaWxhYmxlKGJsb2IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFlLmRhdGEgfHwgIWUuZGF0YS5zaXplIHx8IGUuZGF0YS5zaXplIDwgMTAwIHx8IHNlbGYuYmxvYikge1xuICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHN0b3BSZWNvcmRpbmcgYWx3YXlzIGdldHRpbmcgZmlyZWRcbiAgICAgICAgICAgICAgICAvLyBldmVuIGlmIHRoZXJlIGlzIGludmFsaWQgZGF0YVxuICAgICAgICAgICAgICAgIGlmIChzZWxmLnJlY29yZGluZ0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVjb3JkaW5nQ2FsbGJhY2sobmV3IEJsb2IoW10sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGdldE1pbWVUeXBlKHJlY29yZGVySGludHMpXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWNvcmRpbmdDYWxsYmFjayA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2VsZi5ibG9iID0gY29uZmlnLmdldE5hdGl2ZUJsb2IgPyBlLmRhdGEgOiBuZXcgQmxvYihbZS5kYXRhXSwge1xuICAgICAgICAgICAgICAgIHR5cGU6IGdldE1pbWVUeXBlKHJlY29yZGVySGludHMpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHNlbGYucmVjb3JkaW5nQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJlY29yZGluZ0NhbGxiYWNrKHNlbGYuYmxvYik7XG4gICAgICAgICAgICAgICAgc2VsZi5yZWNvcmRpbmdDYWxsYmFjayA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbWVkaWFSZWNvcmRlci5vbnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhbGxTdGF0ZXMucHVzaCgnc3RhcnRlZCcpO1xuICAgICAgICB9O1xuXG4gICAgICAgIG1lZGlhUmVjb3JkZXIub25wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWxsU3RhdGVzLnB1c2goJ3BhdXNlZCcpO1xuICAgICAgICB9O1xuXG4gICAgICAgIG1lZGlhUmVjb3JkZXIub25yZXN1bWUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsbFN0YXRlcy5wdXNoKCdyZXN1bWVkJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgbWVkaWFSZWNvcmRlci5vbnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFsbFN0YXRlcy5wdXNoKCdzdG9wcGVkJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgbWVkaWFSZWNvcmRlci5vbmVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghZXJyb3IubmFtZSkge1xuICAgICAgICAgICAgICAgIGVycm9yLm5hbWUgPSAnVW5rbm93bkVycm9yJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYWxsU3RhdGVzLnB1c2goJ2Vycm9yOiAnICsgZXJyb3IpO1xuXG4gICAgICAgICAgICBpZiAoIWNvbmZpZy5kaXNhYmxlTG9ncykge1xuICAgICAgICAgICAgICAgIC8vIHZpYTogaHR0cHM6Ly93M2MuZ2l0aHViLmlvL21lZGlhY2FwdHVyZS1yZWNvcmQvTWVkaWFSZWNvcmRlci5odG1sI2V4Y2VwdGlvbi1zdW1tYXJ5XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yLm5hbWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2ludmFsaWRzdGF0ZScpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdUaGUgTWVkaWFSZWNvcmRlciBpcyBub3QgaW4gYSBzdGF0ZSBpbiB3aGljaCB0aGUgcHJvcG9zZWQgb3BlcmF0aW9uIGlzIGFsbG93ZWQgdG8gYmUgZXhlY3V0ZWQuJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IubmFtZS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignbm90c3VwcG9ydGVkJykgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ01JTUUgdHlwZSAoJywgcmVjb3JkZXJIaW50cy5taW1lVHlwZSwgJykgaXMgbm90IHN1cHBvcnRlZC4nLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5uYW1lLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdzZWN1cml0eScpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdNZWRpYVJlY29yZGVyIHNlY3VyaXR5IGVycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIG9sZGVyIGNvZGUgYmVsb3dcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChlcnJvci5uYW1lID09PSAnT3V0T2ZNZW1vcnknKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1RoZSBVQSBoYXMgZXhoYXVzZWQgdGhlIGF2YWlsYWJsZSBtZW1vcnkuIFVzZXIgYWdlbnRzIFNIT1VMRCBwcm92aWRlIGFzIG11Y2ggYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBhcyBwb3NzaWJsZSBpbiB0aGUgbWVzc2FnZSBhdHRyaWJ1dGUuJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IubmFtZSA9PT0gJ0lsbGVnYWxTdHJlYW1Nb2RpZmljYXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0EgbW9kaWZpY2F0aW9uIHRvIHRoZSBzdHJlYW0gaGFzIG9jY3VycmVkIHRoYXQgbWFrZXMgaXQgaW1wb3NzaWJsZSB0byBjb250aW51ZSByZWNvcmRpbmcuIEFuIGV4YW1wbGUgd291bGQgYmUgdGhlIGFkZGl0aW9uIG9mIGEgVHJhY2sgd2hpbGUgcmVjb3JkaW5nIGlzIG9jY3VycmluZy4gVXNlciBhZ2VudHMgU0hPVUxEIHByb3ZpZGUgYXMgbXVjaCBhZGRpdGlvbmFsIGluZm9ybWF0aW9uIGFzIHBvc3NpYmxlIGluIHRoZSBtZXNzYWdlIGF0dHJpYnV0ZS4nLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvci5uYW1lID09PSAnT3RoZXJSZWNvcmRpbmdFcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVXNlZCBmb3IgYW4gZmF0YWwgZXJyb3Igb3RoZXIgdGhhbiB0aG9zZSBsaXN0ZWQgYWJvdmUuIFVzZXIgYWdlbnRzIFNIT1VMRCBwcm92aWRlIGFzIG11Y2ggYWRkaXRpb25hbCBpbmZvcm1hdGlvbiBhcyBwb3NzaWJsZSBpbiB0aGUgbWVzc2FnZSBhdHRyaWJ1dGUuJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3IubmFtZSA9PT0gJ0dlbmVyaWNFcnJvcicpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignVGhlIFVBIGNhbm5vdCBwcm92aWRlIHRoZSBjb2RlYyBvciByZWNvcmRpbmcgb3B0aW9uIHRoYXQgaGFzIGJlZW4gcmVxdWVzdGVkLicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdNZWRpYVJlY29yZGVyIEVycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgKGZ1bmN0aW9uKGxvb3Blcikge1xuICAgICAgICAgICAgICAgIGlmICghc2VsZi5tYW51YWxseVN0b3BwZWQgJiYgbWVkaWFSZWNvcmRlciAmJiBtZWRpYVJlY29yZGVyLnN0YXRlID09PSAnaW5hY3RpdmUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25maWcudGltZXNsaWNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIDEwIG1pbnV0ZXMsIGVub3VnaD9cbiAgICAgICAgICAgICAgICAgICAgbWVkaWFSZWNvcmRlci5zdGFydCgxMCAqIDYwICogMTAwMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3BlciwgMTAwMCk7XG4gICAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgICBpZiAobWVkaWFSZWNvcmRlci5zdGF0ZSAhPT0gJ2luYWN0aXZlJyAmJiBtZWRpYVJlY29yZGVyLnN0YXRlICE9PSAnc3RvcHBlZCcpIHtcbiAgICAgICAgICAgICAgICBtZWRpYVJlY29yZGVyLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy50aW1lU2xpY2UgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICB1cGRhdGVUaW1lU3RhbXAoKTtcbiAgICAgICAgICAgIG1lZGlhUmVjb3JkZXIuc3RhcnQoY29uZmlnLnRpbWVTbGljZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkZWZhdWx0IGlzIDYwIG1pbnV0ZXM7IGVub3VnaD9cbiAgICAgICAgICAgIC8vIHVzZSBjb25maWcgPT4ge3RpbWVTbGljZTogMTAwMH0gb3RoZXJ3aXNlXG5cbiAgICAgICAgICAgIG1lZGlhUmVjb3JkZXIuc3RhcnQoMy42ZSs2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb25maWcuaW5pdENhbGxiYWNrKSB7XG4gICAgICAgICAgICBjb25maWcuaW5pdENhbGxiYWNrKCk7IC8vIG9sZCBjb2RlXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtBcnJheX0gdGltZXN0YW1wcyAtIEFycmF5IG9mIHRpbWUgc3RhbXBzXG4gICAgICogQG1lbWJlcm9mIE1lZGlhU3RyZWFtUmVjb3JkZXJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnNvbGUubG9nKHJlY29yZGVyLnRpbWVzdGFtcHMpO1xuICAgICAqL1xuICAgIHRoaXMudGltZXN0YW1wcyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlVGltZVN0YW1wKCkge1xuICAgICAgICBzZWxmLnRpbWVzdGFtcHMucHVzaChuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcub25UaW1lU3RhbXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbmZpZy5vblRpbWVTdGFtcChzZWxmLnRpbWVzdGFtcHNbc2VsZi50aW1lc3RhbXBzLmxlbmd0aCAtIDFdLCBzZWxmLnRpbWVzdGFtcHMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TWltZVR5cGUoc2Vjb25kT2JqZWN0KSB7XG4gICAgICAgIGlmIChtZWRpYVJlY29yZGVyICYmIG1lZGlhUmVjb3JkZXIubWltZVR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiBtZWRpYVJlY29yZGVyLm1pbWVUeXBlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlY29uZE9iamVjdC5taW1lVHlwZSB8fCAndmlkZW8vd2VibSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhpcyBtZXRob2Qgc3RvcHMgcmVjb3JkaW5nIE1lZGlhU3RyZWFtLlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gQ2FsbGJhY2sgZnVuY3Rpb24sIHRoYXQgaXMgdXNlZCB0byBwYXNzIHJlY29yZGVkIGJsb2IgYmFjayB0byB0aGUgY2FsbGVlLlxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAbWVtYmVyb2YgTWVkaWFTdHJlYW1SZWNvcmRlclxuICAgICAqIEBleGFtcGxlXG4gICAgICogcmVjb3JkZXIuc3RvcChmdW5jdGlvbihibG9iKSB7XG4gICAgICogICAgIHZpZGVvLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICogfSk7XG4gICAgICovXG4gICAgdGhpcy5zdG9wID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuXG4gICAgICAgIHNlbGYubWFudWFsbHlTdG9wcGVkID0gdHJ1ZTsgLy8gdXNlZCBpbnNpZGUgdGhlIG1lZGlhUmVjb3JkZXIub25lcnJvclxuXG4gICAgICAgIGlmICghbWVkaWFSZWNvcmRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWNvcmRpbmdDYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgICAgIGlmIChtZWRpYVJlY29yZGVyLnN0YXRlID09PSAncmVjb3JkaW5nJykge1xuICAgICAgICAgICAgbWVkaWFSZWNvcmRlci5zdG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy50aW1lU2xpY2UgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuYmxvYiA9IG5ldyBCbG9iKGFycmF5T2ZCbG9icywge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBnZXRNaW1lVHlwZShjb25maWcpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBzZWxmLnJlY29yZGluZ0NhbGxiYWNrKHNlbGYuYmxvYik7XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHBhdXNlcyB0aGUgcmVjb3JkaW5nIHByb2Nlc3MuXG4gICAgICogQG1ldGhvZFxuICAgICAqIEBtZW1iZXJvZiBNZWRpYVN0cmVhbVJlY29yZGVyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiByZWNvcmRlci5wYXVzZSgpO1xuICAgICAqL1xuICAgIHRoaXMucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFtZWRpYVJlY29yZGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWVkaWFSZWNvcmRlci5zdGF0ZSA9PT0gJ3JlY29yZGluZycpIHtcbiAgICAgICAgICAgIG1lZGlhUmVjb3JkZXIucGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCByZXN1bWVzIHRoZSByZWNvcmRpbmcgcHJvY2Vzcy5cbiAgICAgKiBAbWV0aG9kXG4gICAgICogQG1lbWJlcm9mIE1lZGlhU3RyZWFtUmVjb3JkZXJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHJlY29yZGVyLnJlc3VtZSgpO1xuICAgICAqL1xuICAgIHRoaXMucmVzdW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghbWVkaWFSZWNvcmRlcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1lZGlhUmVjb3JkZXIuc3RhdGUgPT09ICdwYXVzZWQnKSB7XG4gICAgICAgICAgICBtZWRpYVJlY29yZGVyLnJlc3VtZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgbWV0aG9kIHJlc2V0cyBjdXJyZW50bHkgcmVjb3JkZWQgZGF0YS5cbiAgICAgKiBAbWV0aG9kXG4gICAgICogQG1lbWJlcm9mIE1lZGlhU3RyZWFtUmVjb3JkZXJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHJlY29yZGVyLmNsZWFyUmVjb3JkZWREYXRhKCk7XG4gICAgICovXG4gICAgdGhpcy5jbGVhclJlY29yZGVkRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAobWVkaWFSZWNvcmRlciAmJiBtZWRpYVJlY29yZGVyLnN0YXRlID09PSAncmVjb3JkaW5nJykge1xuICAgICAgICAgICAgc2VsZi5zdG9wKGNsZWFyUmVjb3JkZWREYXRhQ0IpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJSZWNvcmRlZERhdGFDQigpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjbGVhclJlY29yZGVkRGF0YUNCKCkge1xuICAgICAgICBhcnJheU9mQmxvYnMgPSBbXTtcbiAgICAgICAgbWVkaWFSZWNvcmRlciA9IG51bGw7XG4gICAgICAgIHNlbGYudGltZXN0YW1wcyA9IFtdO1xuICAgIH1cblxuICAgIC8vIFJlZmVyZW5jZSB0byBcIk1lZGlhUmVjb3JkZXJcIiBvYmplY3RcbiAgICB2YXIgbWVkaWFSZWNvcmRlcjtcblxuICAgIC8qKlxuICAgICAqIEFjY2VzcyB0byBuYXRpdmUgTWVkaWFSZWNvcmRlciBBUElcbiAgICAgKiBAbWV0aG9kXG4gICAgICogQG1lbWJlcm9mIE1lZGlhU3RyZWFtUmVjb3JkZXJcbiAgICAgKiBAaW5zdGFuY2VcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBpbnRlcm5hbCA9IHJlY29yZGVyLmdldEludGVybmFsUmVjb3JkZXIoKTtcbiAgICAgKiBpbnRlcm5hbC5vbmRhdGFhdmFpbGFibGUgPSBmdW5jdGlvbigpIHt9OyAvLyBvdmVycmlkZVxuICAgICAqIGludGVybmFsLnN0cmVhbSwgaW50ZXJuYWwub25wYXVzZSwgaW50ZXJuYWwub25zdG9wLCBldGMuXG4gICAgICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBpbnRlcm5hbCByZWNvcmRpbmcgb2JqZWN0LlxuICAgICAqL1xuICAgIHRoaXMuZ2V0SW50ZXJuYWxSZWNvcmRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbWVkaWFSZWNvcmRlcjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaXNNZWRpYVN0cmVhbUFjdGl2ZSgpIHtcbiAgICAgICAgaWYgKCdhY3RpdmUnIGluIG1lZGlhU3RyZWFtKSB7XG4gICAgICAgICAgICBpZiAoIW1lZGlhU3RyZWFtLmFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgnZW5kZWQnIGluIG1lZGlhU3RyZWFtKSB7IC8vIG9sZCBoYWNrXG4gICAgICAgICAgICBpZiAobWVkaWFTdHJlYW0uZW5kZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHByb3BlcnR5IHtCbG9ifSBibG9iIC0gUmVjb3JkZWQgZGF0YSBhcyBcIkJsb2JcIiBvYmplY3QuXG4gICAgICogQG1lbWJlcm9mIE1lZGlhU3RyZWFtUmVjb3JkZXJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHJlY29yZGVyLnN0b3AoZnVuY3Rpb24oKSB7XG4gICAgICogICAgIHZhciBibG9iID0gcmVjb3JkZXIuYmxvYjtcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICB0aGlzLmJsb2IgPSBudWxsO1xuXG5cbiAgICAvKipcbiAgICAgKiBHZXQgTWVkaWFSZWNvcmRlciByZWFkb25seSBzdGF0ZS5cbiAgICAgKiBAbWV0aG9kXG4gICAgICogQG1lbWJlcm9mIE1lZGlhU3RyZWFtUmVjb3JkZXJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBzdGF0ZSA9IHJlY29yZGVyLmdldFN0YXRlKCk7XG4gICAgICogQHJldHVybnMge1N0cmluZ30gUmV0dXJucyByZWNvcmRpbmcgc3RhdGUuXG4gICAgICovXG4gICAgdGhpcy5nZXRTdGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIW1lZGlhUmVjb3JkZXIpIHtcbiAgICAgICAgICAgIHJldHVybiAnaW5hY3RpdmUnO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1lZGlhUmVjb3JkZXIuc3RhdGUgfHwgJ2luYWN0aXZlJztcbiAgICB9O1xuXG4gICAgLy8gbGlzdCBvZiBhbGwgcmVjb3JkaW5nIHN0YXRlc1xuICAgIHZhciBhbGxTdGF0ZXMgPSBbXTtcblxuICAgIC8qKlxuICAgICAqIEdldCBNZWRpYVJlY29yZGVyIGFsbCByZWNvcmRpbmcgc3RhdGVzLlxuICAgICAqIEBtZXRob2RcbiAgICAgKiBAbWVtYmVyb2YgTWVkaWFTdHJlYW1SZWNvcmRlclxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHN0YXRlID0gcmVjb3JkZXIuZ2V0QWxsU3RhdGVzKCk7XG4gICAgICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFsbCByZWNvcmRpbmcgc3RhdGVzXG4gICAgICovXG4gICAgdGhpcy5nZXRBbGxTdGF0ZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGFsbFN0YXRlcztcbiAgICB9O1xuXG4gICAgLy8gaWYgYW55IFRyYWNrIHdpdGhpbiB0aGUgTWVkaWFTdHJlYW0gaXMgbXV0ZWQgb3Igbm90IGVuYWJsZWQgYXQgYW55IHRpbWUsIFxuICAgIC8vIHRoZSBicm93c2VyIHdpbGwgb25seSByZWNvcmQgYmxhY2sgZnJhbWVzIFxuICAgIC8vIG9yIHNpbGVuY2Ugc2luY2UgdGhhdCBpcyB0aGUgY29udGVudCBwcm9kdWNlZCBieSB0aGUgVHJhY2tcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIHN0b3BSZWNvcmRpbmcgYXMgc29vbiBhcyBhbnkgc2luZ2xlIHRyYWNrIGVuZHMuXG4gICAgaWYgKHR5cGVvZiBjb25maWcuY2hlY2tGb3JJbmFjdGl2ZVRyYWNrcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uZmlnLmNoZWNrRm9ySW5hY3RpdmVUcmFja3MgPSBmYWxzZTsgLy8gZGlzYWJsZSB0byBtaW5pbWl6ZSBDUFUgdXNhZ2VcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyB0aGlzIG1ldGhvZCBjaGVja3MgaWYgbWVkaWEgc3RyZWFtIGlzIHN0b3BwZWRcbiAgICAvLyBvciBpZiBhbnkgdHJhY2sgaXMgZW5kZWQuXG4gICAgKGZ1bmN0aW9uIGxvb3BlcigpIHtcbiAgICAgICAgaWYgKCFtZWRpYVJlY29yZGVyIHx8IGNvbmZpZy5jaGVja0ZvckluYWN0aXZlVHJhY2tzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTWVkaWFTdHJlYW1BY3RpdmUoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICghY29uZmlnLmRpc2FibGVMb2dzKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ01lZGlhU3RyZWFtIHNlZW1zIHN0b3BwZWQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLnN0b3AoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQobG9vcGVyLCAxMDAwKTsgLy8gY2hlY2sgZXZlcnkgc2Vjb25kXG4gICAgfSkoKTtcblxuICAgIC8vIGZvciBkZWJ1Z2dpbmdcbiAgICB0aGlzLm5hbWUgPSAnTWVkaWFTdHJlYW1SZWNvcmRlcic7XG4gICAgdGhpcy50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH07XG59XG5cbmlmICh0eXBlb2YgUmVjb3JkUlRDICE9PSAndW5kZWZpbmVkJykge1xuICAgIFJlY29yZFJUQy5NZWRpYVN0cmVhbVJlY29yZGVyID0gTWVkaWFTdHJlYW1SZWNvcmRlcjtcbn1cblxyXG4vLyBzb3VyY2UgY29kZSBmcm9tOiBodHRwOi8vdHlwZWRhcnJheS5vcmcvd3AtY29udGVudC9wcm9qZWN0cy9XZWJBdWRpb1JlY29yZGVyL3NjcmlwdC5qc1xyXG4vLyBodHRwczovL2dpdGh1Yi5jb20vbWF0dGRpYW1vbmQvUmVjb3JkZXJqcyNsaWNlbnNlLW1pdFxyXG4vLyBfX19fX19fX19fX19fX19fX19fX19fXHJcbi8vIFN0ZXJlb0F1ZGlvUmVjb3JkZXIuanNcclxuXHJcbi8qKlxyXG4gKiBTdGVyZW9BdWRpb1JlY29yZGVyIGlzIGEgc3RhbmRhbG9uZSBjbGFzcyB1c2VkIGJ5IHtAbGluayBSZWNvcmRSVEN9IHRvIGJyaW5nIFwic3RlcmVvXCIgYXVkaW8tcmVjb3JkaW5nIGluIGNocm9tZS5cclxuICogQHN1bW1hcnkgSmF2YVNjcmlwdCBzdGFuZGFsb25lIG9iamVjdCBmb3Igc3RlcmVvIGF1ZGlvIHJlY29yZGluZy5cclxuICogQGxpY2Vuc2Uge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDI2xpY2Vuc2V8TUlUfVxyXG4gKiBAYXV0aG9yIHtAbGluayBodHRwOi8vd3d3Lk11YXpLaGFuLmNvbXxNdWF6IEtoYW59XHJcbiAqIEB0eXBlZGVmIFN0ZXJlb0F1ZGlvUmVjb3JkZXJcclxuICogQGNsYXNzXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciByZWNvcmRlciA9IG5ldyBTdGVyZW9BdWRpb1JlY29yZGVyKE1lZGlhU3RyZWFtLCB7XHJcbiAqICAgICBzYW1wbGVSYXRlOiA0NDEwMCxcclxuICogICAgIGJ1ZmZlclNpemU6IDQwOTZcclxuICogfSk7XHJcbiAqIHJlY29yZGVyLnJlY29yZCgpO1xyXG4gKiByZWNvcmRlci5zdG9wKGZ1bmN0aW9uKGJsb2IpIHtcclxuICogICAgIHZpZGVvLnNyYyA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAqIH0pO1xyXG4gKiBAc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbXVhei1raGFuL1JlY29yZFJUQ3xSZWNvcmRSVEMgU291cmNlIENvZGV9XHJcbiAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG1lZGlhU3RyZWFtIC0gTWVkaWFTdHJlYW0gb2JqZWN0IGZldGNoZWQgdXNpbmcgZ2V0VXNlck1lZGlhIEFQSSBvciBnZW5lcmF0ZWQgdXNpbmcgY2FwdHVyZVN0cmVhbVVudGlsRW5kZWQgb3IgV2ViQXVkaW8gQVBJLlxyXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIC0ge3NhbXBsZVJhdGU6IDQ0MTAwLCBidWZmZXJTaXplOiA0MDk2LCBudW1iZXJPZkF1ZGlvQ2hhbm5lbHM6IDEsIGV0Yy59XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gU3RlcmVvQXVkaW9SZWNvcmRlcihtZWRpYVN0cmVhbSwgY29uZmlnKSB7XHJcbiAgICBpZiAoIW1lZGlhU3RyZWFtLmdldEF1ZGlvVHJhY2tzKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgdGhyb3cgJ1lvdXIgc3RyZWFtIGhhcyBubyBhdWRpbyB0cmFja3MuJztcclxuICAgIH1cclxuXHJcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIC8vIHZhcmlhYmxlc1xyXG4gICAgdmFyIGxlZnRjaGFubmVsID0gW107XHJcbiAgICB2YXIgcmlnaHRjaGFubmVsID0gW107XHJcbiAgICB2YXIgcmVjb3JkaW5nID0gZmFsc2U7XHJcbiAgICB2YXIgcmVjb3JkaW5nTGVuZ3RoID0gMDtcclxuICAgIHZhciBqc0F1ZGlvTm9kZTtcclxuXHJcbiAgICB2YXIgbnVtYmVyT2ZBdWRpb0NoYW5uZWxzID0gMjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBzYW1wbGUgcmF0ZXMgc3VjaCBhcyA4SyBvciAxNksuIFJlZmVyZW5jZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjg5NzcxMzYvNTUyMTgyXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gZGVzaXJlZFNhbXBSYXRlIC0gRGVzaXJlZCBCaXRzIHBlciBzYW1wbGUgKiAxMDAwXHJcbiAgICAgKiBAbWVtYmVyb2YgU3RlcmVvQXVkaW9SZWNvcmRlclxyXG4gICAgICogQGluc3RhbmNlXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogdmFyIHJlY29yZGVyID0gU3RlcmVvQXVkaW9SZWNvcmRlcihtZWRpYVN0cmVhbSwge1xyXG4gICAgICogICBkZXNpcmVkU2FtcFJhdGU6IDE2ICogMTAwMCAvLyBiaXRzLXBlci1zYW1wbGUgKiAxMDAwXHJcbiAgICAgKiB9KTtcclxuICAgICAqL1xyXG4gICAgdmFyIGRlc2lyZWRTYW1wUmF0ZSA9IGNvbmZpZy5kZXNpcmVkU2FtcFJhdGU7XHJcblxyXG4gICAgLy8gYmFja3dhcmQgY29tcGF0aWJpbGl0eVxyXG4gICAgaWYgKGNvbmZpZy5sZWZ0Q2hhbm5lbCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIG51bWJlck9mQXVkaW9DaGFubmVscyA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvbmZpZy5udW1iZXJPZkF1ZGlvQ2hhbm5lbHMgPT09IDEpIHtcclxuICAgICAgICBudW1iZXJPZkF1ZGlvQ2hhbm5lbHMgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbnVtYmVyT2ZBdWRpb0NoYW5uZWxzIHx8IG51bWJlck9mQXVkaW9DaGFubmVscyA8IDEpIHtcclxuICAgICAgICBudW1iZXJPZkF1ZGlvQ2hhbm5lbHMgPSAyO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY29uZmlnLmRpc2FibGVMb2dzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1N0ZXJlb0F1ZGlvUmVjb3JkZXIgaXMgc2V0IHRvIHJlY29yZCBudW1iZXIgb2YgY2hhbm5lbHM6ICcsIG51bWJlck9mQXVkaW9DaGFubmVscyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgYW55IFRyYWNrIHdpdGhpbiB0aGUgTWVkaWFTdHJlYW0gaXMgbXV0ZWQgb3Igbm90IGVuYWJsZWQgYXQgYW55IHRpbWUsIFxyXG4gICAgLy8gdGhlIGJyb3dzZXIgd2lsbCBvbmx5IHJlY29yZCBibGFjayBmcmFtZXMgXHJcbiAgICAvLyBvciBzaWxlbmNlIHNpbmNlIHRoYXQgaXMgdGhlIGNvbnRlbnQgcHJvZHVjZWQgYnkgdGhlIFRyYWNrXHJcbiAgICAvLyBzbyB3ZSBuZWVkIHRvIHN0b3BSZWNvcmRpbmcgYXMgc29vbiBhcyBhbnkgc2luZ2xlIHRyYWNrIGVuZHMuXHJcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5jaGVja0ZvckluYWN0aXZlVHJhY2tzID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGNvbmZpZy5jaGVja0ZvckluYWN0aXZlVHJhY2tzID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc01lZGlhU3RyZWFtQWN0aXZlKCkge1xyXG4gICAgICAgIGlmIChjb25maWcuY2hlY2tGb3JJbmFjdGl2ZVRyYWNrcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgLy8gYWx3YXlzIHJldHVybiBcInRydWVcIlxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgnYWN0aXZlJyBpbiBtZWRpYVN0cmVhbSkge1xyXG4gICAgICAgICAgICBpZiAoIW1lZGlhU3RyZWFtLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICgnZW5kZWQnIGluIG1lZGlhU3RyZWFtKSB7IC8vIG9sZCBoYWNrXHJcbiAgICAgICAgICAgIGlmIChtZWRpYVN0cmVhbS5lbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgcmVjb3JkcyBNZWRpYVN0cmVhbS5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBTdGVyZW9BdWRpb1JlY29yZGVyXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIucmVjb3JkKCk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVjb3JkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKGlzTWVkaWFTdHJlYW1BY3RpdmUoKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgdGhyb3cgJ1BsZWFzZSBtYWtlIHN1cmUgTWVkaWFTdHJlYW0gaXMgYWN0aXZlLic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXNldFZhcmlhYmxlcygpO1xyXG5cclxuICAgICAgICBpc0F1ZGlvUHJvY2Vzc1N0YXJ0ZWQgPSBpc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHJlY29yZGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgY29uZmlnLnRpbWVTbGljZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgbG9vcGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBtZXJnZUxlZnRSaWdodEJ1ZmZlcnMoY29uZmlnLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGZ1bmN0aW9uIG1lcmdlQXVkaW9CdWZmZXJzKGNvbmZpZywgY2IpIHtcclxuICAgICAgICAgICAgdmFyIG51bWJlck9mQXVkaW9DaGFubmVscyA9IGNvbmZpZy5udW1iZXJPZkF1ZGlvQ2hhbm5lbHM7XHJcblxyXG4gICAgICAgICAgICAvLyB0b2RvOiBcInNsaWNlKDApXCIgLS0tIGlzIGl0IGNhdXNlcyBsb29wPyBTaG91bGQgYmUgcmVtb3ZlZD9cclxuICAgICAgICAgICAgdmFyIGxlZnRCdWZmZXJzID0gY29uZmlnLmxlZnRCdWZmZXJzLnNsaWNlKDApO1xyXG4gICAgICAgICAgICB2YXIgcmlnaHRCdWZmZXJzID0gY29uZmlnLnJpZ2h0QnVmZmVycy5zbGljZSgwKTtcclxuICAgICAgICAgICAgdmFyIHNhbXBsZVJhdGUgPSBjb25maWcuc2FtcGxlUmF0ZTtcclxuICAgICAgICAgICAgdmFyIGludGVybmFsSW50ZXJsZWF2ZWRMZW5ndGggPSBjb25maWcuaW50ZXJuYWxJbnRlcmxlYXZlZExlbmd0aDtcclxuICAgICAgICAgICAgdmFyIGRlc2lyZWRTYW1wUmF0ZSA9IGNvbmZpZy5kZXNpcmVkU2FtcFJhdGU7XHJcblxyXG4gICAgICAgICAgICBpZiAobnVtYmVyT2ZBdWRpb0NoYW5uZWxzID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0QnVmZmVycyA9IG1lcmdlQnVmZmVycyhsZWZ0QnVmZmVycywgaW50ZXJuYWxJbnRlcmxlYXZlZExlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICByaWdodEJ1ZmZlcnMgPSBtZXJnZUJ1ZmZlcnMocmlnaHRCdWZmZXJzLCBpbnRlcm5hbEludGVybGVhdmVkTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGVzaXJlZFNhbXBSYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdEJ1ZmZlcnMgPSBpbnRlcnBvbGF0ZUFycmF5KGxlZnRCdWZmZXJzLCBkZXNpcmVkU2FtcFJhdGUsIHNhbXBsZVJhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0QnVmZmVycyA9IGludGVycG9sYXRlQXJyYXkocmlnaHRCdWZmZXJzLCBkZXNpcmVkU2FtcFJhdGUsIHNhbXBsZVJhdGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobnVtYmVyT2ZBdWRpb0NoYW5uZWxzID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZWZ0QnVmZmVycyA9IG1lcmdlQnVmZmVycyhsZWZ0QnVmZmVycywgaW50ZXJuYWxJbnRlcmxlYXZlZExlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGRlc2lyZWRTYW1wUmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlZnRCdWZmZXJzID0gaW50ZXJwb2xhdGVBcnJheShsZWZ0QnVmZmVycywgZGVzaXJlZFNhbXBSYXRlLCBzYW1wbGVSYXRlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gc2V0IHNhbXBsZSByYXRlIGFzIGRlc2lyZWQgc2FtcGxlIHJhdGVcclxuICAgICAgICAgICAgaWYgKGRlc2lyZWRTYW1wUmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgc2FtcGxlUmF0ZSA9IGRlc2lyZWRTYW1wUmF0ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gZm9yIGNoYW5naW5nIHRoZSBzYW1wbGluZyByYXRlLCByZWZlcmVuY2U6XHJcbiAgICAgICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI4OTc3MTM2LzU1MjE4MlxyXG4gICAgICAgICAgICBmdW5jdGlvbiBpbnRlcnBvbGF0ZUFycmF5KGRhdGEsIG5ld1NhbXBsZVJhdGUsIG9sZFNhbXBsZVJhdGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBmaXRDb3VudCA9IE1hdGgucm91bmQoZGF0YS5sZW5ndGggKiAobmV3U2FtcGxlUmF0ZSAvIG9sZFNhbXBsZVJhdGUpKTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdEYXRhID0gW107XHJcbiAgICAgICAgICAgICAgICB2YXIgc3ByaW5nRmFjdG9yID0gTnVtYmVyKChkYXRhLmxlbmd0aCAtIDEpIC8gKGZpdENvdW50IC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgbmV3RGF0YVswXSA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGZpdENvdW50IC0gMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IGkgKiBzcHJpbmdGYWN0b3I7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJlZm9yZSA9IE51bWJlcihNYXRoLmZsb29yKHRtcCkpLnRvRml4ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWZ0ZXIgPSBOdW1iZXIoTWF0aC5jZWlsKHRtcCkpLnRvRml4ZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXRQb2ludCA9IHRtcCAtIGJlZm9yZTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdEYXRhW2ldID0gbGluZWFySW50ZXJwb2xhdGUoZGF0YVtiZWZvcmVdLCBkYXRhW2FmdGVyXSwgYXRQb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuZXdEYXRhW2ZpdENvdW50IC0gMV0gPSBkYXRhW2RhdGEubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3RGF0YTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbGluZWFySW50ZXJwb2xhdGUoYmVmb3JlLCBhZnRlciwgYXRQb2ludCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJlZm9yZSArIChhZnRlciAtIGJlZm9yZSkgKiBhdFBvaW50O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtZXJnZUJ1ZmZlcnMoY2hhbm5lbEJ1ZmZlciwgckxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBGbG9hdDY0QXJyYXkockxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciBsbmcgPSBjaGFubmVsQnVmZmVyLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxuZzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJ1ZmZlciA9IGNoYW5uZWxCdWZmZXJbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnNldChidWZmZXIsIG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ICs9IGJ1ZmZlci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gaW50ZXJsZWF2ZShsZWZ0Q2hhbm5lbCwgcmlnaHRDaGFubmVsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gbGVmdENoYW5uZWwubGVuZ3RoICsgcmlnaHRDaGFubmVsLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IEZsb2F0NjRBcnJheShsZW5ndGgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBpbnB1dEluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpbmRleCsrXSA9IGxlZnRDaGFubmVsW2lucHV0SW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpbmRleCsrXSA9IHJpZ2h0Q2hhbm5lbFtpbnB1dEluZGV4XTtcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dEluZGV4Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB3cml0ZVVURkJ5dGVzKHZpZXcsIG9mZnNldCwgc3RyaW5nKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbG5nID0gc3RyaW5nLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG5nOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCArIGksIHN0cmluZy5jaGFyQ29kZUF0KGkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gaW50ZXJsZWF2ZSBib3RoIGNoYW5uZWxzIHRvZ2V0aGVyXHJcbiAgICAgICAgICAgIHZhciBpbnRlcmxlYXZlZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChudW1iZXJPZkF1ZGlvQ2hhbm5lbHMgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGludGVybGVhdmVkID0gaW50ZXJsZWF2ZShsZWZ0QnVmZmVycywgcmlnaHRCdWZmZXJzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG51bWJlck9mQXVkaW9DaGFubmVscyA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgaW50ZXJsZWF2ZWQgPSBsZWZ0QnVmZmVycztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGludGVybGVhdmVkTGVuZ3RoID0gaW50ZXJsZWF2ZWQubGVuZ3RoO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlIHdhdiBmaWxlXHJcbiAgICAgICAgICAgIHZhciByZXN1bHRpbmdCdWZmZXJMZW5ndGggPSA0NCArIGludGVybGVhdmVkTGVuZ3RoICogMjtcclxuXHJcbiAgICAgICAgICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIocmVzdWx0aW5nQnVmZmVyTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcik7XHJcblxyXG4gICAgICAgICAgICAvLyBSSUZGIGNodW5rIGRlc2NyaXB0b3IvaWRlbnRpZmllciBcclxuICAgICAgICAgICAgd3JpdGVVVEZCeXRlcyh2aWV3LCAwLCAnUklGRicpO1xyXG5cclxuICAgICAgICAgICAgLy8gUklGRiBjaHVuayBsZW5ndGhcclxuICAgICAgICAgICAgdmlldy5zZXRVaW50MzIoNCwgNDQgKyBpbnRlcmxlYXZlZExlbmd0aCAqIDIsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gUklGRiB0eXBlIFxyXG4gICAgICAgICAgICB3cml0ZVVURkJ5dGVzKHZpZXcsIDgsICdXQVZFJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBmb3JtYXQgY2h1bmsgaWRlbnRpZmllciBcclxuICAgICAgICAgICAgLy8gRk1UIHN1Yi1jaHVua1xyXG4gICAgICAgICAgICB3cml0ZVVURkJ5dGVzKHZpZXcsIDEyLCAnZm10ICcpO1xyXG5cclxuICAgICAgICAgICAgLy8gZm9ybWF0IGNodW5rIGxlbmd0aCBcclxuICAgICAgICAgICAgdmlldy5zZXRVaW50MzIoMTYsIDE2LCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNhbXBsZSBmb3JtYXQgKHJhdylcclxuICAgICAgICAgICAgdmlldy5zZXRVaW50MTYoMjAsIDEsIHRydWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gc3RlcmVvICgyIGNoYW5uZWxzKVxyXG4gICAgICAgICAgICB2aWV3LnNldFVpbnQxNigyMiwgbnVtYmVyT2ZBdWRpb0NoYW5uZWxzLCB0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNhbXBsZSByYXRlIFxyXG4gICAgICAgICAgICB2aWV3LnNldFVpbnQzMigyNCwgc2FtcGxlUmF0ZSwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBieXRlIHJhdGUgKHNhbXBsZSByYXRlICogYmxvY2sgYWxpZ24pXHJcbiAgICAgICAgICAgIHZpZXcuc2V0VWludDMyKDI4LCBzYW1wbGVSYXRlICogMiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBibG9jayBhbGlnbiAoY2hhbm5lbCBjb3VudCAqIGJ5dGVzIHBlciBzYW1wbGUpIFxyXG4gICAgICAgICAgICB2aWV3LnNldFVpbnQxNigzMiwgbnVtYmVyT2ZBdWRpb0NoYW5uZWxzICogMiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBiaXRzIHBlciBzYW1wbGUgXHJcbiAgICAgICAgICAgIHZpZXcuc2V0VWludDE2KDM0LCAxNiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBkYXRhIHN1Yi1jaHVua1xyXG4gICAgICAgICAgICAvLyBkYXRhIGNodW5rIGlkZW50aWZpZXIgXHJcbiAgICAgICAgICAgIHdyaXRlVVRGQnl0ZXModmlldywgMzYsICdkYXRhJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBkYXRhIGNodW5rIGxlbmd0aCBcclxuICAgICAgICAgICAgdmlldy5zZXRVaW50MzIoNDAsIGludGVybGVhdmVkTGVuZ3RoICogMiwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyB3cml0ZSB0aGUgUENNIHNhbXBsZXNcclxuICAgICAgICAgICAgdmFyIGxuZyA9IGludGVybGVhdmVkTGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSA0NDtcclxuICAgICAgICAgICAgdmFyIHZvbHVtZSA9IDE7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG5nOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZpZXcuc2V0SW50MTYoaW5kZXgsIGludGVybGVhdmVkW2ldICogKDB4N0ZGRiAqIHZvbHVtZSksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgaW5kZXggKz0gMjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2Ioe1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1ZmZlcjogYnVmZmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIHZpZXc6IHZpZXdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICBidWZmZXI6IGJ1ZmZlcixcclxuICAgICAgICAgICAgICAgIHZpZXc6IHZpZXdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNFZGdlIHx8IGlzT3BlcmEgfHwgaXNTYWZhcmkgfHwgY29uZmlnLm5vV29ya2VyKSB7XHJcbiAgICAgICAgICAgIG1lcmdlQXVkaW9CdWZmZXJzKGNvbmZpZywgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YS5idWZmZXIsIGRhdGEudmlldyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgdmFyIHdlYldvcmtlciA9IHByb2Nlc3NJbldlYldvcmtlcihtZXJnZUF1ZGlvQnVmZmVycyk7XHJcblxyXG4gICAgICAgIHdlYldvcmtlci5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhldmVudC5kYXRhLmJ1ZmZlciwgZXZlbnQuZGF0YS52aWV3KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlbGVhc2UgbWVtb3J5XHJcbiAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwod2ViV29ya2VyLndvcmtlclVSTCk7XHJcblxyXG4gICAgICAgICAgICAvLyBraWxsIHdlYndvcmtlciAob3IgQ2hyb21lIHdpbGwga2lsbCB5b3VyIHBhZ2UgYWZ0ZXIgfjI1IGNhbGxzKVxyXG4gICAgICAgICAgICB3ZWJXb3JrZXIudGVybWluYXRlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2ViV29ya2VyLnBvc3RNZXNzYWdlKGNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJvY2Vzc0luV2ViV29ya2VyKF9mdW5jdGlvbikge1xyXG4gICAgICAgIHZhciB3b3JrZXJVUkwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtfZnVuY3Rpb24udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgJzt0aGlzLm9ubWVzc2FnZSA9ICBmdW5jdGlvbiAoZWVlKSB7JyArIF9mdW5jdGlvbi5uYW1lICsgJyhlZWUuZGF0YSk7fSdcclxuICAgICAgICBdLCB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdhcHBsaWNhdGlvbi9qYXZhc2NyaXB0J1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXIod29ya2VyVVJMKTtcclxuICAgICAgICB3b3JrZXIud29ya2VyVVJMID0gd29ya2VyVVJMO1xyXG4gICAgICAgIHJldHVybiB3b3JrZXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBzdG9wcyByZWNvcmRpbmcgTWVkaWFTdHJlYW0uXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIENhbGxiYWNrIGZ1bmN0aW9uLCB0aGF0IGlzIHVzZWQgdG8gcGFzcyByZWNvcmRlZCBibG9iIGJhY2sgdG8gdGhlIGNhbGxlZS5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBTdGVyZW9BdWRpb1JlY29yZGVyXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIuc3RvcChmdW5jdGlvbihibG9iKSB7XHJcbiAgICAgKiAgICAgdmlkZW8uc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgICAqIH0pO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnN0b3AgPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuXHJcbiAgICAgICAgLy8gc3RvcCByZWNvcmRpbmdcclxuICAgICAgICByZWNvcmRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgbWVyZ2VMZWZ0UmlnaHRCdWZmZXJzKHtcclxuICAgICAgICAgICAgZGVzaXJlZFNhbXBSYXRlOiBkZXNpcmVkU2FtcFJhdGUsXHJcbiAgICAgICAgICAgIHNhbXBsZVJhdGU6IHNhbXBsZVJhdGUsXHJcbiAgICAgICAgICAgIG51bWJlck9mQXVkaW9DaGFubmVsczogbnVtYmVyT2ZBdWRpb0NoYW5uZWxzLFxyXG4gICAgICAgICAgICBpbnRlcm5hbEludGVybGVhdmVkTGVuZ3RoOiByZWNvcmRpbmdMZW5ndGgsXHJcbiAgICAgICAgICAgIGxlZnRCdWZmZXJzOiBsZWZ0Y2hhbm5lbCxcclxuICAgICAgICAgICAgcmlnaHRCdWZmZXJzOiBudW1iZXJPZkF1ZGlvQ2hhbm5lbHMgPT09IDEgPyBbXSA6IHJpZ2h0Y2hhbm5lbFxyXG4gICAgICAgIH0sIGZ1bmN0aW9uKGJ1ZmZlciwgdmlldykge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICogQHByb3BlcnR5IHtCbG9ifSBibG9iIC0gVGhlIHJlY29yZGVkIGJsb2Igb2JqZWN0LlxyXG4gICAgICAgICAgICAgKiBAbWVtYmVyb2YgU3RlcmVvQXVkaW9SZWNvcmRlclxyXG4gICAgICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAgICAgKiByZWNvcmRlci5zdG9wKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAqICAgICB2YXIgYmxvYiA9IHJlY29yZGVyLmJsb2I7XHJcbiAgICAgICAgICAgICAqIH0pO1xyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgc2VsZi5ibG9iID0gbmV3IEJsb2IoW3ZpZXddLCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnYXVkaW8vd2F2J1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkge0FycmF5QnVmZmVyfSBidWZmZXIgLSBUaGUgcmVjb3JkZWQgYnVmZmVyIG9iamVjdC5cclxuICAgICAgICAgICAgICogQG1lbWJlcm9mIFN0ZXJlb0F1ZGlvUmVjb3JkZXJcclxuICAgICAgICAgICAgICogQGV4YW1wbGVcclxuICAgICAgICAgICAgICogcmVjb3JkZXIuc3RvcChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgKiAgICAgdmFyIGJ1ZmZlciA9IHJlY29yZGVyLmJ1ZmZlcjtcclxuICAgICAgICAgICAgICogfSk7XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZWxmLmJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcih2aWV3LmJ1ZmZlci5ieXRlTGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBAcHJvcGVydHkge0RhdGFWaWV3fSB2aWV3IC0gVGhlIHJlY29yZGVkIGRhdGEtdmlldyBvYmplY3QuXHJcbiAgICAgICAgICAgICAqIEBtZW1iZXJvZiBTdGVyZW9BdWRpb1JlY29yZGVyXHJcbiAgICAgICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICAgICAqIHJlY29yZGVyLnN0b3AoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICogICAgIHZhciB2aWV3ID0gcmVjb3JkZXIudmlldztcclxuICAgICAgICAgICAgICogfSk7XHJcbiAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICBzZWxmLnZpZXcgPSB2aWV3O1xyXG5cclxuICAgICAgICAgICAgc2VsZi5zYW1wbGVSYXRlID0gZGVzaXJlZFNhbXBSYXRlIHx8IHNhbXBsZVJhdGU7XHJcbiAgICAgICAgICAgIHNlbGYuYnVmZmVyU2l6ZSA9IGJ1ZmZlclNpemU7XHJcblxyXG4gICAgICAgICAgICAvLyByZWNvcmRlZCBhdWRpbyBsZW5ndGhcclxuICAgICAgICAgICAgc2VsZi5sZW5ndGggPSByZWNvcmRpbmdMZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBpc0F1ZGlvUHJvY2Vzc1N0YXJ0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soc2VsZi5ibG9iKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIVN0b3JhZ2UuQXVkaW9Db250ZXh0Q29uc3RydWN0b3IpIHtcclxuICAgICAgICBTdG9yYWdlLkF1ZGlvQ29udGV4dENvbnN0cnVjdG9yID0gbmV3IFN0b3JhZ2UuQXVkaW9Db250ZXh0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNvbnRleHQgPSBTdG9yYWdlLkF1ZGlvQ29udGV4dENvbnN0cnVjdG9yO1xyXG5cclxuICAgIC8vIGNyZWF0ZXMgYW4gYXVkaW8gbm9kZSBmcm9tIHRoZSBtaWNyb3Bob25lIGluY29taW5nIHN0cmVhbVxyXG4gICAgdmFyIGF1ZGlvSW5wdXQgPSBjb250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKG1lZGlhU3RyZWFtKTtcclxuXHJcbiAgICB2YXIgbGVnYWxCdWZmZXJWYWx1ZXMgPSBbMCwgMjU2LCA1MTIsIDEwMjQsIDIwNDgsIDQwOTYsIDgxOTIsIDE2Mzg0XTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZyb20gdGhlIHNwZWM6IFRoaXMgdmFsdWUgY29udHJvbHMgaG93IGZyZXF1ZW50bHkgdGhlIGF1ZGlvcHJvY2VzcyBldmVudCBpc1xyXG4gICAgICogZGlzcGF0Y2hlZCBhbmQgaG93IG1hbnkgc2FtcGxlLWZyYW1lcyBuZWVkIHRvIGJlIHByb2Nlc3NlZCBlYWNoIGNhbGwuXHJcbiAgICAgKiBMb3dlciB2YWx1ZXMgZm9yIGJ1ZmZlciBzaXplIHdpbGwgcmVzdWx0IGluIGEgbG93ZXIgKGJldHRlcikgbGF0ZW5jeS5cclxuICAgICAqIEhpZ2hlciB2YWx1ZXMgd2lsbCBiZSBuZWNlc3NhcnkgdG8gYXZvaWQgYXVkaW8gYnJlYWt1cCBhbmQgZ2xpdGNoZXNcclxuICAgICAqIFRoZSBzaXplIG9mIHRoZSBidWZmZXIgKGluIHNhbXBsZS1mcmFtZXMpIHdoaWNoIG5lZWRzIHRvXHJcbiAgICAgKiBiZSBwcm9jZXNzZWQgZWFjaCB0aW1lIG9ucHJvY2Vzc2F1ZGlvIGlzIGNhbGxlZC5cclxuICAgICAqIExlZ2FsIHZhbHVlcyBhcmUgKDI1NiwgNTEyLCAxMDI0LCAyMDQ4LCA0MDk2LCA4MTkyLCAxNjM4NCkuXHJcbiAgICAgKiBAcHJvcGVydHkge251bWJlcn0gYnVmZmVyU2l6ZSAtIEJ1ZmZlci1zaXplIGZvciBob3cgZnJlcXVlbnRseSB0aGUgYXVkaW9wcm9jZXNzIGV2ZW50IGlzIGRpc3BhdGNoZWQuXHJcbiAgICAgKiBAbWVtYmVyb2YgU3RlcmVvQXVkaW9SZWNvcmRlclxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHJlY29yZGVyID0gbmV3IFN0ZXJlb0F1ZGlvUmVjb3JkZXIobWVkaWFTdHJlYW0sIHtcclxuICAgICAqICAgICBidWZmZXJTaXplOiA0MDk2XHJcbiAgICAgKiB9KTtcclxuICAgICAqL1xyXG5cclxuICAgIC8vIFwiMFwiIG1lYW5zLCBsZXQgY2hyb21lIGRlY2lkZSB0aGUgbW9zdCBhY2N1cmF0ZSBidWZmZXItc2l6ZSBmb3IgY3VycmVudCBwbGF0Zm9ybS5cclxuICAgIHZhciBidWZmZXJTaXplID0gdHlwZW9mIGNvbmZpZy5idWZmZXJTaXplID09PSAndW5kZWZpbmVkJyA/IDQwOTYgOiBjb25maWcuYnVmZmVyU2l6ZTtcclxuXHJcbiAgICBpZiAobGVnYWxCdWZmZXJWYWx1ZXMuaW5kZXhPZihidWZmZXJTaXplKSA9PT0gLTEpIHtcclxuICAgICAgICBpZiAoIWNvbmZpZy5kaXNhYmxlTG9ncykge1xyXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0xlZ2FsIHZhbHVlcyBmb3IgYnVmZmVyLXNpemUgYXJlICcgKyBKU09OLnN0cmluZ2lmeShsZWdhbEJ1ZmZlclZhbHVlcywgbnVsbCwgJ1xcdCcpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvbnRleHQuY3JlYXRlSmF2YVNjcmlwdE5vZGUpIHtcclxuICAgICAgICBqc0F1ZGlvTm9kZSA9IGNvbnRleHQuY3JlYXRlSmF2YVNjcmlwdE5vZGUoYnVmZmVyU2l6ZSwgbnVtYmVyT2ZBdWRpb0NoYW5uZWxzLCBudW1iZXJPZkF1ZGlvQ2hhbm5lbHMpO1xyXG4gICAgfSBlbHNlIGlmIChjb250ZXh0LmNyZWF0ZVNjcmlwdFByb2Nlc3Nvcikge1xyXG4gICAgICAgIGpzQXVkaW9Ob2RlID0gY29udGV4dC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IoYnVmZmVyU2l6ZSwgbnVtYmVyT2ZBdWRpb0NoYW5uZWxzLCBudW1iZXJPZkF1ZGlvQ2hhbm5lbHMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aHJvdyAnV2ViQXVkaW8gQVBJIGhhcyBubyBzdXBwb3J0IG9uIHRoaXMgYnJvd3Nlci4nO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbm5lY3QgdGhlIHN0cmVhbSB0byB0aGUgc2NyaXB0IHByb2Nlc3NvclxyXG4gICAgYXVkaW9JbnB1dC5jb25uZWN0KGpzQXVkaW9Ob2RlKTtcclxuXHJcbiAgICBpZiAoIWNvbmZpZy5idWZmZXJTaXplKSB7XHJcbiAgICAgICAgYnVmZmVyU2l6ZSA9IGpzQXVkaW9Ob2RlLmJ1ZmZlclNpemU7IC8vIGRldmljZSBidWZmZXItc2l6ZVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHNhbXBsZSByYXRlIChpbiBzYW1wbGUtZnJhbWVzIHBlciBzZWNvbmQpIGF0IHdoaWNoIHRoZVxyXG4gICAgICogQXVkaW9Db250ZXh0IGhhbmRsZXMgYXVkaW8uIEl0IGlzIGFzc3VtZWQgdGhhdCBhbGwgQXVkaW9Ob2Rlc1xyXG4gICAgICogaW4gdGhlIGNvbnRleHQgcnVuIGF0IHRoaXMgcmF0ZS4gSW4gbWFraW5nIHRoaXMgYXNzdW1wdGlvbixcclxuICAgICAqIHNhbXBsZS1yYXRlIGNvbnZlcnRlcnMgb3IgXCJ2YXJpc3BlZWRcIiBwcm9jZXNzb3JzIGFyZSBub3Qgc3VwcG9ydGVkXHJcbiAgICAgKiBpbiByZWFsLXRpbWUgcHJvY2Vzc2luZy5cclxuICAgICAqIFRoZSBzYW1wbGVSYXRlIHBhcmFtZXRlciBkZXNjcmliZXMgdGhlIHNhbXBsZS1yYXRlIG9mIHRoZVxyXG4gICAgICogbGluZWFyIFBDTSBhdWRpbyBkYXRhIGluIHRoZSBidWZmZXIgaW4gc2FtcGxlLWZyYW1lcyBwZXIgc2Vjb25kLlxyXG4gICAgICogQW4gaW1wbGVtZW50YXRpb24gbXVzdCBzdXBwb3J0IHNhbXBsZS1yYXRlcyBpbiBhdCBsZWFzdFxyXG4gICAgICogdGhlIHJhbmdlIDIyMDUwIHRvIDk2MDAwLlxyXG4gICAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNhbXBsZVJhdGUgLSBCdWZmZXItc2l6ZSBmb3IgaG93IGZyZXF1ZW50bHkgdGhlIGF1ZGlvcHJvY2VzcyBldmVudCBpcyBkaXNwYXRjaGVkLlxyXG4gICAgICogQG1lbWJlcm9mIFN0ZXJlb0F1ZGlvUmVjb3JkZXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlciA9IG5ldyBTdGVyZW9BdWRpb1JlY29yZGVyKG1lZGlhU3RyZWFtLCB7XHJcbiAgICAgKiAgICAgc2FtcGxlUmF0ZTogNDQxMDBcclxuICAgICAqIH0pO1xyXG4gICAgICovXHJcbiAgICB2YXIgc2FtcGxlUmF0ZSA9IHR5cGVvZiBjb25maWcuc2FtcGxlUmF0ZSAhPT0gJ3VuZGVmaW5lZCcgPyBjb25maWcuc2FtcGxlUmF0ZSA6IGNvbnRleHQuc2FtcGxlUmF0ZSB8fCA0NDEwMDtcclxuXHJcbiAgICBpZiAoc2FtcGxlUmF0ZSA8IDIyMDUwIHx8IHNhbXBsZVJhdGUgPiA5NjAwMCkge1xyXG4gICAgICAgIC8vIFJlZjogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjYzMDM5MTgvNTUyMTgyXHJcbiAgICAgICAgaWYgKCFjb25maWcuZGlzYWJsZUxvZ3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKCdzYW1wbGUtcmF0ZSBtdXN0IGJlIHVuZGVyIHJhbmdlIDIyMDUwIGFuZCA5NjAwMC4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjb25maWcuZGlzYWJsZUxvZ3MpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnc2FtcGxlLXJhdGUnLCBzYW1wbGVSYXRlKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnYnVmZmVyLXNpemUnLCBidWZmZXJTaXplKTtcclxuXHJcbiAgICAgICAgaWYgKGNvbmZpZy5kZXNpcmVkU2FtcFJhdGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Rlc2lyZWQgc2FtcGxlLXJhdGUnLCBjb25maWcuZGVzaXJlZFNhbXBSYXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHBhdXNlcyB0aGUgcmVjb3JkaW5nIHByb2Nlc3MuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgU3RlcmVvQXVkaW9SZWNvcmRlclxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHJlY29yZGVyLnBhdXNlKCk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMucGF1c2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpc1BhdXNlZCA9IHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgcmVzdW1lcyB0aGUgcmVjb3JkaW5nIHByb2Nlc3MuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgU3RlcmVvQXVkaW9SZWNvcmRlclxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHJlY29yZGVyLnJlc3VtZSgpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnJlc3VtZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChpc01lZGlhU3RyZWFtQWN0aXZlKCkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHRocm93ICdQbGVhc2UgbWFrZSBzdXJlIE1lZGlhU3RyZWFtIGlzIGFjdGl2ZS4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFyZWNvcmRpbmcpIHtcclxuICAgICAgICAgICAgaWYgKCFjb25maWcuZGlzYWJsZUxvZ3MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTZWVtcyByZWNvcmRpbmcgaGFzIGJlZW4gcmVzdGFydGVkLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgcmVzZXRzIGN1cnJlbnRseSByZWNvcmRlZCBkYXRhLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIFN0ZXJlb0F1ZGlvUmVjb3JkZXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5jbGVhclJlY29yZGVkRGF0YSgpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLmNsZWFyUmVjb3JkZWREYXRhID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uZmlnLmNoZWNrRm9ySW5hY3RpdmVUcmFja3MgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKHJlY29yZGluZykge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3AoY2xlYXJSZWNvcmRlZERhdGFDQik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbGVhclJlY29yZGVkRGF0YUNCKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0VmFyaWFibGVzKCkge1xyXG4gICAgICAgIGxlZnRjaGFubmVsID0gW107XHJcbiAgICAgICAgcmlnaHRjaGFubmVsID0gW107XHJcbiAgICAgICAgcmVjb3JkaW5nTGVuZ3RoID0gMDtcclxuICAgICAgICBpc0F1ZGlvUHJvY2Vzc1N0YXJ0ZWQgPSBmYWxzZTtcclxuICAgICAgICByZWNvcmRpbmcgPSBmYWxzZTtcclxuICAgICAgICBpc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnRleHQgPSBudWxsO1xyXG5cclxuICAgICAgICBzZWxmLmxlZnRjaGFubmVsID0gbGVmdGNoYW5uZWw7XHJcbiAgICAgICAgc2VsZi5yaWdodGNoYW5uZWwgPSByaWdodGNoYW5uZWw7XHJcbiAgICAgICAgc2VsZi5udW1iZXJPZkF1ZGlvQ2hhbm5lbHMgPSBudW1iZXJPZkF1ZGlvQ2hhbm5lbHM7XHJcbiAgICAgICAgc2VsZi5kZXNpcmVkU2FtcFJhdGUgPSBkZXNpcmVkU2FtcFJhdGU7XHJcbiAgICAgICAgc2VsZi5zYW1wbGVSYXRlID0gc2FtcGxlUmF0ZTtcclxuICAgICAgICBzZWxmLnJlY29yZGluZ0xlbmd0aCA9IHJlY29yZGluZ0xlbmd0aDtcclxuXHJcbiAgICAgICAgaW50ZXJ2YWxzQmFzZWRCdWZmZXJzID0ge1xyXG4gICAgICAgICAgICBsZWZ0OiBbXSxcclxuICAgICAgICAgICAgcmlnaHQ6IFtdLFxyXG4gICAgICAgICAgICByZWNvcmRpbmdMZW5ndGg6IDBcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyUmVjb3JkZWREYXRhQ0IoKSB7XHJcbiAgICAgICAgaWYgKGpzQXVkaW9Ob2RlKSB7XHJcbiAgICAgICAgICAgIGpzQXVkaW9Ob2RlLm9uYXVkaW9wcm9jZXNzID0gbnVsbDtcclxuICAgICAgICAgICAganNBdWRpb05vZGUuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICBqc0F1ZGlvTm9kZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYXVkaW9JbnB1dCkge1xyXG4gICAgICAgICAgICBhdWRpb0lucHV0LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgYXVkaW9JbnB1dCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXNldFZhcmlhYmxlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZvciBkZWJ1Z2dpbmdcclxuICAgIHRoaXMubmFtZSA9ICdTdGVyZW9BdWRpb1JlY29yZGVyJztcclxuICAgIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgaXNBdWRpb1Byb2Nlc3NTdGFydGVkID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gb25BdWRpb1Byb2Nlc3NEYXRhQXZhaWxhYmxlKGUpIHtcclxuICAgICAgICBpZiAoaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzTWVkaWFTdHJlYW1BY3RpdmUoKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgaWYgKCFjb25maWcuZGlzYWJsZUxvZ3MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdNZWRpYVN0cmVhbSBzZWVtcyBzdG9wcGVkLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGpzQXVkaW9Ob2RlLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICAgICAgcmVjb3JkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXJlY29yZGluZykge1xyXG4gICAgICAgICAgICBpZiAoYXVkaW9JbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgYXVkaW9JbnB1dC5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBhdWRpb0lucHV0ID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgb24gXCJvbmF1ZGlvcHJvY2Vzc1wiIGV2ZW50J3MgZmlyc3QgaW52b2NhdGlvbi5cclxuICAgICAgICAgKiBAbWV0aG9kIHtmdW5jdGlvbn0gb25BdWRpb1Byb2Nlc3NTdGFydGVkXHJcbiAgICAgICAgICogQG1lbWJlcm9mIFN0ZXJlb0F1ZGlvUmVjb3JkZXJcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIHJlY29yZGVyLm9uQXVkaW9Qcm9jZXNzU3RhcnRlZDogZnVuY3Rpb24oKSB7IH07XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKCFpc0F1ZGlvUHJvY2Vzc1N0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgaXNBdWRpb1Byb2Nlc3NTdGFydGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGNvbmZpZy5vbkF1ZGlvUHJvY2Vzc1N0YXJ0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5vbkF1ZGlvUHJvY2Vzc1N0YXJ0ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZy5pbml0Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5pbml0Q2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxlZnQgPSBlLmlucHV0QnVmZmVyLmdldENoYW5uZWxEYXRhKDApO1xyXG5cclxuICAgICAgICAvLyB3ZSBjbG9uZSB0aGUgc2FtcGxlc1xyXG4gICAgICAgIHZhciBjaExlZnQgPSBuZXcgRmxvYXQzMkFycmF5KGxlZnQpO1xyXG4gICAgICAgIGxlZnRjaGFubmVsLnB1c2goY2hMZWZ0KTtcclxuXHJcbiAgICAgICAgaWYgKG51bWJlck9mQXVkaW9DaGFubmVscyA9PT0gMikge1xyXG4gICAgICAgICAgICB2YXIgcmlnaHQgPSBlLmlucHV0QnVmZmVyLmdldENoYW5uZWxEYXRhKDEpO1xyXG4gICAgICAgICAgICB2YXIgY2hSaWdodCA9IG5ldyBGbG9hdDMyQXJyYXkocmlnaHQpO1xyXG4gICAgICAgICAgICByaWdodGNoYW5uZWwucHVzaChjaFJpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlY29yZGluZ0xlbmd0aCArPSBidWZmZXJTaXplO1xyXG5cclxuICAgICAgICAvLyBleHBvcnQgcmF3IFBDTVxyXG4gICAgICAgIHNlbGYucmVjb3JkaW5nTGVuZ3RoID0gcmVjb3JkaW5nTGVuZ3RoO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIGNvbmZpZy50aW1lU2xpY2UgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGludGVydmFsc0Jhc2VkQnVmZmVycy5yZWNvcmRpbmdMZW5ndGggKz0gYnVmZmVyU2l6ZTtcclxuICAgICAgICAgICAgaW50ZXJ2YWxzQmFzZWRCdWZmZXJzLmxlZnQucHVzaChjaExlZnQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG51bWJlck9mQXVkaW9DaGFubmVscyA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgaW50ZXJ2YWxzQmFzZWRCdWZmZXJzLnJpZ2h0LnB1c2goY2hSaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAganNBdWRpb05vZGUub25hdWRpb3Byb2Nlc3MgPSBvbkF1ZGlvUHJvY2Vzc0RhdGFBdmFpbGFibGU7XHJcblxyXG4gICAgLy8gdG8gcHJldmVudCBzZWxmIGF1ZGlvIHRvIGJlIGNvbm5lY3RlZCB3aXRoIHNwZWFrZXJzXHJcbiAgICBqc0F1ZGlvTm9kZS5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xyXG5cclxuICAgIC8vIGV4cG9ydCByYXcgUENNXHJcbiAgICB0aGlzLmxlZnRjaGFubmVsID0gbGVmdGNoYW5uZWw7XHJcbiAgICB0aGlzLnJpZ2h0Y2hhbm5lbCA9IHJpZ2h0Y2hhbm5lbDtcclxuICAgIHRoaXMubnVtYmVyT2ZBdWRpb0NoYW5uZWxzID0gbnVtYmVyT2ZBdWRpb0NoYW5uZWxzO1xyXG4gICAgdGhpcy5kZXNpcmVkU2FtcFJhdGUgPSBkZXNpcmVkU2FtcFJhdGU7XHJcbiAgICB0aGlzLnNhbXBsZVJhdGUgPSBzYW1wbGVSYXRlO1xyXG4gICAgc2VsZi5yZWNvcmRpbmdMZW5ndGggPSByZWNvcmRpbmdMZW5ndGg7XHJcblxyXG4gICAgLy8gaGVscGVyIGZvciBpbnRlcnZhbHMgYmFzZWQgYmxvYnNcclxuICAgIHZhciBpbnRlcnZhbHNCYXNlZEJ1ZmZlcnMgPSB7XHJcbiAgICAgICAgbGVmdDogW10sXHJcbiAgICAgICAgcmlnaHQ6IFtdLFxyXG4gICAgICAgIHJlY29yZGluZ0xlbmd0aDogMFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyB0aGlzIGxvb3BlciBpcyB1c2VkIHRvIHN1cHBvcnQgaW50ZXJ2YWxzIGJhc2VkIGJsb2JzICh2aWEgdGltZVNsaWNlK29uZGF0YWF2YWlsYWJsZSlcclxuICAgIGZ1bmN0aW9uIGxvb3BlcigpIHtcclxuICAgICAgICBpZiAoIXJlY29yZGluZyB8fCB0eXBlb2YgY29uZmlnLm9uZGF0YWF2YWlsYWJsZSAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgY29uZmlnLnRpbWVTbGljZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGludGVydmFsc0Jhc2VkQnVmZmVycy5sZWZ0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBtZXJnZUxlZnRSaWdodEJ1ZmZlcnMoe1xyXG4gICAgICAgICAgICAgICAgZGVzaXJlZFNhbXBSYXRlOiBkZXNpcmVkU2FtcFJhdGUsXHJcbiAgICAgICAgICAgICAgICBzYW1wbGVSYXRlOiBzYW1wbGVSYXRlLFxyXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZBdWRpb0NoYW5uZWxzOiBudW1iZXJPZkF1ZGlvQ2hhbm5lbHMsXHJcbiAgICAgICAgICAgICAgICBpbnRlcm5hbEludGVybGVhdmVkTGVuZ3RoOiBpbnRlcnZhbHNCYXNlZEJ1ZmZlcnMucmVjb3JkaW5nTGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbGVmdEJ1ZmZlcnM6IGludGVydmFsc0Jhc2VkQnVmZmVycy5sZWZ0LFxyXG4gICAgICAgICAgICAgICAgcmlnaHRCdWZmZXJzOiBudW1iZXJPZkF1ZGlvQ2hhbm5lbHMgPT09IDEgPyBbXSA6IGludGVydmFsc0Jhc2VkQnVmZmVycy5yaWdodFxyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihidWZmZXIsIHZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW3ZpZXddLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2F1ZGlvL3dhdidcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLm9uZGF0YWF2YWlsYWJsZShibG9iKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3BlciwgY29uZmlnLnRpbWVTbGljZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaW50ZXJ2YWxzQmFzZWRCdWZmZXJzID0ge1xyXG4gICAgICAgICAgICAgICAgbGVmdDogW10sXHJcbiAgICAgICAgICAgICAgICByaWdodDogW10sXHJcbiAgICAgICAgICAgICAgICByZWNvcmRpbmdMZW5ndGg6IDBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGxvb3BlciwgY29uZmlnLnRpbWVTbGljZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5pZiAodHlwZW9mIFJlY29yZFJUQyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIFJlY29yZFJUQy5TdGVyZW9BdWRpb1JlY29yZGVyID0gU3RlcmVvQXVkaW9SZWNvcmRlcjtcclxufVxuXHJcbi8vIF9fX19fX19fX19fX19fX19fXHJcbi8vIENhbnZhc1JlY29yZGVyLmpzXHJcblxyXG4vKipcclxuICogQ2FudmFzUmVjb3JkZXIgaXMgYSBzdGFuZGFsb25lIGNsYXNzIHVzZWQgYnkge0BsaW5rIFJlY29yZFJUQ30gdG8gYnJpbmcgSFRNTDUtQ2FudmFzIHJlY29yZGluZyBpbnRvIHZpZGVvIFdlYk0uIEl0IHVzZXMgSFRNTDJDYW52YXMgbGlicmFyeSBhbmQgcnVucyB0b3Agb3ZlciB7QGxpbmsgV2hhbW15fS5cclxuICogQHN1bW1hcnkgSFRNTDJDYW52YXMgcmVjb3JkaW5nIGludG8gdmlkZW8gV2ViTS5cclxuICogQGxpY2Vuc2Uge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDI2xpY2Vuc2V8TUlUfVxyXG4gKiBAYXV0aG9yIHtAbGluayBodHRwOi8vd3d3Lk11YXpLaGFuLmNvbXxNdWF6IEtoYW59XHJcbiAqIEB0eXBlZGVmIENhbnZhc1JlY29yZGVyXHJcbiAqIEBjbGFzc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgcmVjb3JkZXIgPSBuZXcgQ2FudmFzUmVjb3JkZXIoaHRtbEVsZW1lbnQsIHsgZGlzYWJsZUxvZ3M6IHRydWUsIHVzZVdoYW1teVJlY29yZGVyOiB0cnVlIH0pO1xyXG4gKiByZWNvcmRlci5yZWNvcmQoKTtcclxuICogcmVjb3JkZXIuc3RvcChmdW5jdGlvbihibG9iKSB7XHJcbiAqICAgICB2aWRlby5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG4gKiB9KTtcclxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL211YXota2hhbi9SZWNvcmRSVEN8UmVjb3JkUlRDIFNvdXJjZSBDb2RlfVxyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBodG1sRWxlbWVudCAtIHF1ZXJ5U2VsZWN0b3IvZ2V0RWxlbWVudEJ5SWQvZ2V0RWxlbWVudHNCeVRhZ05hbWVbMF0vZXRjLlxyXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIC0ge2Rpc2FibGVMb2dzOnRydWUsIGluaXRDYWxsYmFjazogZnVuY3Rpb259XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gQ2FudmFzUmVjb3JkZXIoaHRtbEVsZW1lbnQsIGNvbmZpZykge1xyXG4gICAgaWYgKHR5cGVvZiBodG1sMmNhbnZhcyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB0aHJvdyAnUGxlYXNlIGxpbms6IGh0dHBzOi8vY2RuLndlYnJ0Yy1leHBlcmltZW50LmNvbS9zY3JlZW5zaG90LmpzJztcclxuICAgIH1cclxuXHJcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcbiAgICBpZiAoIWNvbmZpZy5mcmFtZUludGVydmFsKSB7XHJcbiAgICAgICAgY29uZmlnLmZyYW1lSW50ZXJ2YWwgPSAxMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyB2aWEgRGV0ZWN0UlRDLmpzXHJcbiAgICB2YXIgaXNDYW52YXNTdXBwb3J0c1N0cmVhbUNhcHR1cmluZyA9IGZhbHNlO1xyXG4gICAgWydjYXB0dXJlU3RyZWFtJywgJ21vekNhcHR1cmVTdHJlYW0nLCAnd2Via2l0Q2FwdHVyZVN0cmVhbSddLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgIGlmIChpdGVtIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpKSB7XHJcbiAgICAgICAgICAgIGlzQ2FudmFzU3VwcG9ydHNTdHJlYW1DYXB0dXJpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBfaXNDaHJvbWUgPSAoISF3aW5kb3cud2Via2l0UlRDUGVlckNvbm5lY3Rpb24gfHwgISF3aW5kb3cud2Via2l0R2V0VXNlck1lZGlhKSAmJiAhIXdpbmRvdy5jaHJvbWU7XHJcblxyXG4gICAgdmFyIGNocm9tZVZlcnNpb24gPSA1MDtcclxuICAgIHZhciBtYXRjaEFycmF5ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQ2hyb20oZXxpdW0pXFwvKFswLTldKylcXC4vKTtcclxuICAgIGlmIChfaXNDaHJvbWUgJiYgbWF0Y2hBcnJheSAmJiBtYXRjaEFycmF5WzJdKSB7XHJcbiAgICAgICAgY2hyb21lVmVyc2lvbiA9IHBhcnNlSW50KG1hdGNoQXJyYXlbMl0sIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoX2lzQ2hyb21lICYmIGNocm9tZVZlcnNpb24gPCA1Mikge1xyXG4gICAgICAgIGlzQ2FudmFzU3VwcG9ydHNTdHJlYW1DYXB0dXJpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29uZmlnLnVzZVdoYW1teVJlY29yZGVyKSB7XHJcbiAgICAgICAgaXNDYW52YXNTdXBwb3J0c1N0cmVhbUNhcHR1cmluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBnbG9iYWxDYW52YXMsIG1lZGlhU3RyZWFtUmVjb3JkZXI7XHJcblxyXG4gICAgaWYgKGlzQ2FudmFzU3VwcG9ydHNTdHJlYW1DYXB0dXJpbmcpIHtcclxuICAgICAgICBpZiAoIWNvbmZpZy5kaXNhYmxlTG9ncykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnWW91ciBicm93c2VyIHN1cHBvcnRzIGJvdGggTWVkaVJlY29yZGVyIEFQSSBhbmQgY2FudmFzLmNhcHR1cmVTdHJlYW0hJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaHRtbEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xyXG4gICAgICAgICAgICBnbG9iYWxDYW52YXMgPSBodG1sRWxlbWVudDtcclxuICAgICAgICB9IGVsc2UgaWYgKGh0bWxFbGVtZW50IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XHJcbiAgICAgICAgICAgIGdsb2JhbENhbnZhcyA9IGh0bWxFbGVtZW50LmNhbnZhcztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aHJvdyAnUGxlYXNlIHBhc3MgZWl0aGVyIEhUTUxDYW52YXNFbGVtZW50IG9yIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRC4nO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoISFuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhKSB7XHJcbiAgICAgICAgaWYgKCFjb25maWcuZGlzYWJsZUxvZ3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQ2FudmFzIHJlY29yZGluZyBpcyBOT1Qgc3VwcG9ydGVkIGluIEZpcmVmb3guJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBpc1JlY29yZGluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHJlY29yZHMgQ2FudmFzLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIENhbnZhc1JlY29yZGVyXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIucmVjb3JkKCk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVjb3JkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXNSZWNvcmRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoaXNDYW52YXNTdXBwb3J0c1N0cmVhbUNhcHR1cmluZyAmJiAhY29uZmlnLnVzZVdoYW1teVJlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIC8vIENhbnZhc0NhcHR1cmVNZWRpYVN0cmVhbVxyXG4gICAgICAgICAgICB2YXIgY2FudmFzTWVkaWFTdHJlYW07XHJcbiAgICAgICAgICAgIGlmICgnY2FwdHVyZVN0cmVhbScgaW4gZ2xvYmFsQ2FudmFzKSB7XHJcbiAgICAgICAgICAgICAgICBjYW52YXNNZWRpYVN0cmVhbSA9IGdsb2JhbENhbnZhcy5jYXB0dXJlU3RyZWFtKDI1KTsgLy8gMjUgRlBTXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJ21vekNhcHR1cmVTdHJlYW0nIGluIGdsb2JhbENhbnZhcykge1xyXG4gICAgICAgICAgICAgICAgY2FudmFzTWVkaWFTdHJlYW0gPSBnbG9iYWxDYW52YXMubW96Q2FwdHVyZVN0cmVhbSgyNSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJ3dlYmtpdENhcHR1cmVTdHJlYW0nIGluIGdsb2JhbENhbnZhcykge1xyXG4gICAgICAgICAgICAgICAgY2FudmFzTWVkaWFTdHJlYW0gPSBnbG9iYWxDYW52YXMud2Via2l0Q2FwdHVyZVN0cmVhbSgyNSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWRTdHJlYW0gPSBuZXcgTWVkaWFTdHJlYW0oKTtcclxuICAgICAgICAgICAgICAgIG1kU3RyZWFtLmFkZFRyYWNrKGNhbnZhc01lZGlhU3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0pO1xyXG4gICAgICAgICAgICAgICAgY2FudmFzTWVkaWFTdHJlYW0gPSBtZFN0cmVhbTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cclxuXHJcbiAgICAgICAgICAgIGlmICghY2FudmFzTWVkaWFTdHJlYW0pIHtcclxuICAgICAgICAgICAgICAgIHRocm93ICdjYXB0dXJlU3RyZWFtIEFQSSBhcmUgTk9UIGF2YWlsYWJsZS4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBOb3RlOiBKYW4gMTgsIDIwMTYgc3RhdHVzIGlzIHRoYXQsIFxyXG4gICAgICAgICAgICAvLyBGaXJlZm94IE1lZGlhUmVjb3JkZXIgQVBJIGNhbid0IHJlY29yZCBDYW52YXNDYXB0dXJlTWVkaWFTdHJlYW0gb2JqZWN0LlxyXG4gICAgICAgICAgICBtZWRpYVN0cmVhbVJlY29yZGVyID0gbmV3IE1lZGlhU3RyZWFtUmVjb3JkZXIoY2FudmFzTWVkaWFTdHJlYW0sIHtcclxuICAgICAgICAgICAgICAgIG1pbWVUeXBlOiAndmlkZW8vd2VibSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG1lZGlhU3RyZWFtUmVjb3JkZXIucmVjb3JkKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2hhbW15LmZyYW1lcyA9IFtdO1xyXG4gICAgICAgICAgICBsYXN0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgICAgICBkcmF3Q2FudmFzRnJhbWUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjb25maWcuaW5pdENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5pbml0Q2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZ2V0V2ViUEltYWdlcyA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKGh0bWxFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09ICdjYW52YXMnKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBmcmFtZXNMZW5ndGggPSB3aGFtbXkuZnJhbWVzLmxlbmd0aDtcclxuICAgICAgICB3aGFtbXkuZnJhbWVzLmZvckVhY2goZnVuY3Rpb24oZnJhbWUsIGlkeCkge1xyXG4gICAgICAgICAgICB2YXIgZnJhbWVzUmVtYWluaW5nID0gZnJhbWVzTGVuZ3RoIC0gaWR4O1xyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZy5kaXNhYmxlTG9ncykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZnJhbWVzUmVtYWluaW5nICsgJy8nICsgZnJhbWVzTGVuZ3RoICsgJyBmcmFtZXMgcmVtYWluaW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjb25maWcub25FbmNvZGluZ0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWcub25FbmNvZGluZ0NhbGxiYWNrKGZyYW1lc1JlbWFpbmluZywgZnJhbWVzTGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHdlYnAgPSBmcmFtZS5pbWFnZS50b0RhdGFVUkwoJ2ltYWdlL3dlYnAnLCAxKTtcclxuICAgICAgICAgICAgd2hhbW15LmZyYW1lc1tpZHhdLmltYWdlID0gd2VicDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcuZGlzYWJsZUxvZ3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0dlbmVyYXRpbmcgV2ViTScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FsbGJhY2soKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBzdG9wcyByZWNvcmRpbmcgQ2FudmFzLlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBDYWxsYmFjayBmdW5jdGlvbiwgdGhhdCBpcyB1c2VkIHRvIHBhc3MgcmVjb3JkZWQgYmxvYiBiYWNrIHRvIHRoZSBjYWxsZWUuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgQ2FudmFzUmVjb3JkZXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5zdG9wKGZ1bmN0aW9uKGJsb2IpIHtcclxuICAgICAqICAgICB2aWRlby5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG4gICAgICogfSk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMuc3RvcCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaXNSZWNvcmRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoaXNDYW52YXNTdXBwb3J0c1N0cmVhbUNhcHR1cmluZyAmJiBtZWRpYVN0cmVhbVJlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIG1lZGlhU3RyZWFtUmVjb3JkZXIuc3RvcChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0V2ViUEltYWdlcyhmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAqIEBwcm9wZXJ0eSB7QmxvYn0gYmxvYiAtIFJlY29yZGVkIGZyYW1lcyBpbiB2aWRlby93ZWJtIGJsb2IuXHJcbiAgICAgICAgICAgICAqIEBtZW1iZXJvZiBDYW52YXNSZWNvcmRlclxyXG4gICAgICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAgICAgKiByZWNvcmRlci5zdG9wKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgKiAgICAgdmFyIGJsb2IgPSByZWNvcmRlci5ibG9iO1xyXG4gICAgICAgICAgICAgKiB9KTtcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHdoYW1teS5jb21waWxlKGZ1bmN0aW9uKGJsb2IpIHtcclxuICAgICAgICAgICAgICAgIGlmICghY29uZmlnLmRpc2FibGVMb2dzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JlY29yZGluZyBmaW5pc2hlZCEnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB0aGF0LmJsb2IgPSBibG9iO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0aGF0LmJsb2IuZm9yRWFjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYmxvYiA9IG5ldyBCbG9iKFtdLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd2aWRlby93ZWJtJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoYXQuYmxvYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgd2hhbW15LmZyYW1lcyA9IFtdO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGlzUGF1c2VkUmVjb3JkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBwYXVzZXMgdGhlIHJlY29yZGluZyBwcm9jZXNzLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIENhbnZhc1JlY29yZGVyXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIucGF1c2UoKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5wYXVzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlzUGF1c2VkUmVjb3JkaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKG1lZGlhU3RyZWFtUmVjb3JkZXIgaW5zdGFuY2VvZiBNZWRpYVN0cmVhbVJlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIG1lZGlhU3RyZWFtUmVjb3JkZXIucGF1c2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCByZXN1bWVzIHRoZSByZWNvcmRpbmcgcHJvY2Vzcy5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNSZWNvcmRlclxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHJlY29yZGVyLnJlc3VtZSgpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnJlc3VtZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlzUGF1c2VkUmVjb3JkaW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGlmIChtZWRpYVN0cmVhbVJlY29yZGVyIGluc3RhbmNlb2YgTWVkaWFTdHJlYW1SZWNvcmRlcikge1xyXG4gICAgICAgICAgICBtZWRpYVN0cmVhbVJlY29yZGVyLnJlc3VtZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWlzUmVjb3JkaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3JkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHJlc2V0cyBjdXJyZW50bHkgcmVjb3JkZWQgZGF0YS5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBDYW52YXNSZWNvcmRlclxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHJlY29yZGVyLmNsZWFyUmVjb3JkZWREYXRhKCk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMuY2xlYXJSZWNvcmRlZERhdGEgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoaXNSZWNvcmRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5zdG9wKGNsZWFyUmVjb3JkZWREYXRhQ0IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjbGVhclJlY29yZGVkRGF0YUNCKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyUmVjb3JkZWREYXRhQ0IoKSB7XHJcbiAgICAgICAgd2hhbW15LmZyYW1lcyA9IFtdO1xyXG4gICAgICAgIGlzUmVjb3JkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgaXNQYXVzZWRSZWNvcmRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBmb3IgZGVidWdnaW5nXHJcbiAgICB0aGlzLm5hbWUgPSAnQ2FudmFzUmVjb3JkZXInO1xyXG4gICAgdGhpcy50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsb25lQ2FudmFzKCkge1xyXG4gICAgICAgIC8vY3JlYXRlIGEgbmV3IGNhbnZhc1xyXG4gICAgICAgIHZhciBuZXdDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICB2YXIgY29udGV4dCA9IG5ld0NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgICAgICAvL3NldCBkaW1lbnNpb25zXHJcbiAgICAgICAgbmV3Q2FudmFzLndpZHRoID0gaHRtbEVsZW1lbnQud2lkdGg7XHJcbiAgICAgICAgbmV3Q2FudmFzLmhlaWdodCA9IGh0bWxFbGVtZW50LmhlaWdodDtcclxuXHJcbiAgICAgICAgLy9hcHBseSB0aGUgb2xkIGNhbnZhcyB0byB0aGUgbmV3IG9uZVxyXG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGh0bWxFbGVtZW50LCAwLCAwKTtcclxuXHJcbiAgICAgICAgLy9yZXR1cm4gdGhlIG5ldyBjYW52YXNcclxuICAgICAgICByZXR1cm4gbmV3Q2FudmFzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRyYXdDYW52YXNGcmFtZSgpIHtcclxuICAgICAgICBpZiAoaXNQYXVzZWRSZWNvcmRpbmcpIHtcclxuICAgICAgICAgICAgbGFzdFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZHJhd0NhbnZhc0ZyYW1lLCA1MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGh0bWxFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdjYW52YXMnKSB7XHJcbiAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbGFzdFRpbWU7XHJcbiAgICAgICAgICAgIC8vIHZpYSAjMjA2LCBieSBKYWNrIGkuZS4gQFNleW1vdXJyXHJcbiAgICAgICAgICAgIGxhc3RUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgICAgICAgICB3aGFtbXkuZnJhbWVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IGNsb25lQ2FudmFzKCksXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb25cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNSZWNvcmRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZHJhd0NhbnZhc0ZyYW1lLCBjb25maWcuZnJhbWVJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHRtbDJjYW52YXMoaHRtbEVsZW1lbnQsIHtcclxuICAgICAgICAgICAgZ3JhYk1vdXNlOiB0eXBlb2YgY29uZmlnLnNob3dNb3VzZVBvaW50ZXIgPT09ICd1bmRlZmluZWQnIHx8IGNvbmZpZy5zaG93TW91c2VQb2ludGVyLFxyXG4gICAgICAgICAgICBvbnJlbmRlcmVkOiBmdW5jdGlvbihjYW52YXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbGFzdFRpbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZHJhd0NhbnZhc0ZyYW1lLCBjb25maWcuZnJhbWVJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdmlhICMyMDYsIGJ5IEphY2sgaS5lLiBAU2V5bW91cnJcclxuICAgICAgICAgICAgICAgIGxhc3RUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgd2hhbW15LmZyYW1lcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZTogY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2Uvd2VicCcsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGlzUmVjb3JkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChkcmF3Q2FudmFzRnJhbWUsIGNvbmZpZy5mcmFtZUludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBsYXN0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cclxuICAgIHZhciB3aGFtbXkgPSBuZXcgV2hhbW15LlZpZGVvKDEwMCk7XHJcbn1cclxuXHJcbmlmICh0eXBlb2YgUmVjb3JkUlRDICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgUmVjb3JkUlRDLkNhbnZhc1JlY29yZGVyID0gQ2FudmFzUmVjb3JkZXI7XHJcbn1cblxyXG4vLyBfX19fX19fX19fX19fX19fX1xyXG4vLyBXaGFtbXlSZWNvcmRlci5qc1xyXG5cclxuLyoqXHJcbiAqIFdoYW1teVJlY29yZGVyIGlzIGEgc3RhbmRhbG9uZSBjbGFzcyB1c2VkIGJ5IHtAbGluayBSZWNvcmRSVEN9IHRvIGJyaW5nIHZpZGVvIHJlY29yZGluZyBpbiBDaHJvbWUuIEl0IHJ1bnMgdG9wIG92ZXIge0BsaW5rIFdoYW1teX0uXHJcbiAqIEBzdW1tYXJ5IFZpZGVvIHJlY29yZGluZyBmZWF0dXJlIGluIENocm9tZS5cclxuICogQGxpY2Vuc2Uge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDI2xpY2Vuc2V8TUlUfVxyXG4gKiBAYXV0aG9yIHtAbGluayBodHRwOi8vd3d3Lk11YXpLaGFuLmNvbXxNdWF6IEtoYW59XHJcbiAqIEB0eXBlZGVmIFdoYW1teVJlY29yZGVyXHJcbiAqIEBjbGFzc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgcmVjb3JkZXIgPSBuZXcgV2hhbW15UmVjb3JkZXIobWVkaWFTdHJlYW0pO1xyXG4gKiByZWNvcmRlci5yZWNvcmQoKTtcclxuICogcmVjb3JkZXIuc3RvcChmdW5jdGlvbihibG9iKSB7XHJcbiAqICAgICB2aWRlby5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG4gKiB9KTtcclxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL211YXota2hhbi9SZWNvcmRSVEN8UmVjb3JkUlRDIFNvdXJjZSBDb2RlfVxyXG4gKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBtZWRpYVN0cmVhbSAtIE1lZGlhU3RyZWFtIG9iamVjdCBmZXRjaGVkIHVzaW5nIGdldFVzZXJNZWRpYSBBUEkgb3IgZ2VuZXJhdGVkIHVzaW5nIGNhcHR1cmVTdHJlYW1VbnRpbEVuZGVkIG9yIFdlYkF1ZGlvIEFQSS5cclxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyAtIHtkaXNhYmxlTG9nczogdHJ1ZSwgaW5pdENhbGxiYWNrOiBmdW5jdGlvbiwgdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQsIGV0Yy59XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gV2hhbW15UmVjb3JkZXIobWVkaWFTdHJlYW0sIGNvbmZpZykge1xyXG5cclxuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcclxuXHJcbiAgICBpZiAoIWNvbmZpZy5mcmFtZUludGVydmFsKSB7XHJcbiAgICAgICAgY29uZmlnLmZyYW1lSW50ZXJ2YWwgPSAxMDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWNvbmZpZy5kaXNhYmxlTG9ncykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdVc2luZyBmcmFtZXMtaW50ZXJ2YWw6JywgY29uZmlnLmZyYW1lSW50ZXJ2YWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgcmVjb3JkcyB2aWRlby5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBXaGFtbXlSZWNvcmRlclxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHJlY29yZGVyLnJlY29yZCgpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnJlY29yZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICghY29uZmlnLndpZHRoKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy53aWR0aCA9IDMyMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghY29uZmlnLmhlaWdodCkge1xyXG4gICAgICAgICAgICBjb25maWcuaGVpZ2h0ID0gMjQwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcudmlkZW8pIHtcclxuICAgICAgICAgICAgY29uZmlnLnZpZGVvID0ge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IGNvbmZpZy53aWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogY29uZmlnLmhlaWdodFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcuY2FudmFzKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5jYW52YXMgPSB7XHJcbiAgICAgICAgICAgICAgICB3aWR0aDogY29uZmlnLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBjb25maWcuaGVpZ2h0XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjYW52YXMud2lkdGggPSBjb25maWcuY2FudmFzLndpZHRoIHx8IDMyMDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gY29uZmlnLmNhbnZhcy5oZWlnaHQgfHwgMjQwO1xyXG5cclxuICAgICAgICBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgICAgIC8vIHNldHRpbmcgZGVmYXVsdHNcclxuICAgICAgICBpZiAoY29uZmlnLnZpZGVvICYmIGNvbmZpZy52aWRlbyBpbnN0YW5jZW9mIEhUTUxWaWRlb0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgdmlkZW8gPSBjb25maWcudmlkZW8uY2xvbmVOb2RlKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZmlnLmluaXRDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLmluaXRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xyXG5cclxuICAgICAgICAgICAgc2V0U3JjT2JqZWN0KG1lZGlhU3RyZWFtLCB2aWRlbyk7XHJcblxyXG4gICAgICAgICAgICB2aWRlby5vbmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24oKSB7IC8vIFwib25sb2FkZWRtZXRhZGF0YVwiIG1heSBOT1Qgd29yayBpbiBGRj9cclxuICAgICAgICAgICAgICAgIGlmIChjb25maWcuaW5pdENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmluaXRDYWxsYmFjaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmlkZW8ud2lkdGggPSBjb25maWcudmlkZW8ud2lkdGg7XHJcbiAgICAgICAgICAgIHZpZGVvLmhlaWdodCA9IGNvbmZpZy52aWRlby5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2aWRlby5tdXRlZCA9IHRydWU7XHJcbiAgICAgICAgdmlkZW8ucGxheSgpO1xyXG5cclxuICAgICAgICBsYXN0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHdoYW1teSA9IG5ldyBXaGFtbXkuVmlkZW8oKTtcclxuXHJcbiAgICAgICAgaWYgKCFjb25maWcuZGlzYWJsZUxvZ3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbnZhcyByZXNvbHV0aW9ucycsIGNhbnZhcy53aWR0aCwgJyonLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3ZpZGVvIHdpZHRoL2hlaWdodCcsIHZpZGVvLndpZHRoIHx8IGNhbnZhcy53aWR0aCwgJyonLCB2aWRlby5oZWlnaHQgfHwgY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkcmF3RnJhbWVzKGNvbmZpZy5mcmFtZUludGVydmFsKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEcmF3IGFuZCBwdXNoIGZyYW1lcyB0byBXaGFtbXlcclxuICAgICAqIEBwYXJhbSB7aW50ZWdlcn0gZnJhbWVJbnRlcnZhbCAtIHNldCBtaW5pbXVtIGludGVydmFsIChpbiBtaWxsaXNlY29uZHMpIGJldHdlZW4gZWFjaCB0aW1lIHdlIHB1c2ggYSBmcmFtZSB0byBXaGFtbXlcclxuICAgICAqL1xyXG4gICAgZnVuY3Rpb24gZHJhd0ZyYW1lcyhmcmFtZUludGVydmFsKSB7XHJcbiAgICAgICAgZnJhbWVJbnRlcnZhbCA9IHR5cGVvZiBmcmFtZUludGVydmFsICE9PSAndW5kZWZpbmVkJyA/IGZyYW1lSW50ZXJ2YWwgOiAxMDtcclxuXHJcbiAgICAgICAgdmFyIGR1cmF0aW9uID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBsYXN0VGltZTtcclxuICAgICAgICBpZiAoIWR1cmF0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGRyYXdGcmFtZXMsIGZyYW1lSW50ZXJ2YWwsIGZyYW1lSW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlzUGF1c2VkUmVjb3JkaW5nKSB7XHJcbiAgICAgICAgICAgIGxhc3RUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGRyYXdGcmFtZXMsIDEwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB2aWEgIzIwNiwgYnkgSmFjayBpLmUuIEBTZXltb3VyclxyXG4gICAgICAgIGxhc3RUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgLy8gdmlhOiBodHRwczovL2dpdGh1Yi5jb20vbXVhei1raGFuL1dlYlJUQy1FeHBlcmltZW50L3B1bGwvMzE2XHJcbiAgICAgICAgICAgIC8vIFR3ZWFrIGZvciBBbmRyb2lkIENocm9tZVxyXG4gICAgICAgICAgICB2aWRlby5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB3aGFtbXkuZnJhbWVzLnB1c2goe1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogZHVyYXRpb24sXHJcbiAgICAgICAgICAgIGltYWdlOiBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS93ZWJwJylcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKCFpc1N0b3BEcmF3aW5nKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZHJhd0ZyYW1lcywgZnJhbWVJbnRlcnZhbCwgZnJhbWVJbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFzeW5jTG9vcChvKSB7XHJcbiAgICAgICAgdmFyIGkgPSAtMSxcclxuICAgICAgICAgICAgbGVuZ3RoID0gby5sZW5ndGg7XHJcblxyXG4gICAgICAgIChmdW5jdGlvbiBsb29wKCkge1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIGlmIChpID09PSBsZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG8uY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gXCJzZXRUaW1lb3V0XCIgYWRkZWQgYnkgSmltIE1jTGVvZFxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgby5mdW5jdGlvblRvTG9vcChsb29wLCBpKTtcclxuICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmUgYmxhY2sgZnJhbWVzIGZyb20gdGhlIGJlZ2lubmluZyB0byB0aGUgc3BlY2lmaWVkIGZyYW1lXHJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBfZnJhbWVzIC0gYXJyYXkgb2YgZnJhbWVzIHRvIGJlIGNoZWNrZWRcclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBfZnJhbWVzVG9DaGVjayAtIG51bWJlciBvZiBmcmFtZSB1bnRpbCBjaGVjayB3aWxsIGJlIGV4ZWN1dGVkICgtMSAtIHdpbGwgZHJvcCBhbGwgZnJhbWVzIHVudGlsIGZyYW1lIG5vdCBtYXRjaGVkIHdpbGwgYmUgZm91bmQpXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gX3BpeFRvbGVyYW5jZSAtIDAgLSB2ZXJ5IHN0cmljdCAob25seSBibGFjayBwaXhlbCBjb2xvcikgOyAxIC0gYWxsXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gX2ZyYW1lVG9sZXJhbmNlIC0gMCAtIHZlcnkgc3RyaWN0IChvbmx5IGJsYWNrIGZyYW1lIGNvbG9yKSA7IDEgLSBhbGxcclxuICAgICAqIEByZXR1cm5zIHtBcnJheX0gLSBhcnJheSBvZiBmcmFtZXNcclxuICAgICAqL1xyXG4gICAgLy8gcHVsbCMyOTMgYnkgQHZvbG9kYWxleGV5XHJcbiAgICBmdW5jdGlvbiBkcm9wQmxhY2tGcmFtZXMoX2ZyYW1lcywgX2ZyYW1lc1RvQ2hlY2ssIF9waXhUb2xlcmFuY2UsIF9mcmFtZVRvbGVyYW5jZSwgY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgbG9jYWxDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICBsb2NhbENhbnZhcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgICAgICBsb2NhbENhbnZhcy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgICAgIHZhciBjb250ZXh0MmQgPSBsb2NhbENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgIHZhciByZXN1bHRGcmFtZXMgPSBbXTtcclxuXHJcbiAgICAgICAgdmFyIGNoZWNrVW50aWxOb3RCbGFjayA9IF9mcmFtZXNUb0NoZWNrID09PSAtMTtcclxuICAgICAgICB2YXIgZW5kQ2hlY2tGcmFtZSA9IChfZnJhbWVzVG9DaGVjayAmJiBfZnJhbWVzVG9DaGVjayA+IDAgJiYgX2ZyYW1lc1RvQ2hlY2sgPD0gX2ZyYW1lcy5sZW5ndGgpID9cclxuICAgICAgICAgICAgX2ZyYW1lc1RvQ2hlY2sgOiBfZnJhbWVzLmxlbmd0aDtcclxuICAgICAgICB2YXIgc2FtcGxlQ29sb3IgPSB7XHJcbiAgICAgICAgICAgIHI6IDAsXHJcbiAgICAgICAgICAgIGc6IDAsXHJcbiAgICAgICAgICAgIGI6IDBcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBtYXhDb2xvckRpZmZlcmVuY2UgPSBNYXRoLnNxcnQoXHJcbiAgICAgICAgICAgIE1hdGgucG93KDI1NSwgMikgK1xyXG4gICAgICAgICAgICBNYXRoLnBvdygyNTUsIDIpICtcclxuICAgICAgICAgICAgTWF0aC5wb3coMjU1LCAyKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdmFyIHBpeFRvbGVyYW5jZSA9IF9waXhUb2xlcmFuY2UgJiYgX3BpeFRvbGVyYW5jZSA+PSAwICYmIF9waXhUb2xlcmFuY2UgPD0gMSA/IF9waXhUb2xlcmFuY2UgOiAwO1xyXG4gICAgICAgIHZhciBmcmFtZVRvbGVyYW5jZSA9IF9mcmFtZVRvbGVyYW5jZSAmJiBfZnJhbWVUb2xlcmFuY2UgPj0gMCAmJiBfZnJhbWVUb2xlcmFuY2UgPD0gMSA/IF9mcmFtZVRvbGVyYW5jZSA6IDA7XHJcbiAgICAgICAgdmFyIGRvTm90Q2hlY2tOZXh0ID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGFzeW5jTG9vcCh7XHJcbiAgICAgICAgICAgIGxlbmd0aDogZW5kQ2hlY2tGcmFtZSxcclxuICAgICAgICAgICAgZnVuY3Rpb25Ub0xvb3A6IGZ1bmN0aW9uKGxvb3AsIGYpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtYXRjaFBpeENvdW50LCBlbmRQaXhDaGVjaywgbWF4UGl4Q291bnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGZpbmlzaEltYWdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkb05vdENoZWNrTmV4dCAmJiBtYXhQaXhDb3VudCAtIG1hdGNoUGl4Q291bnQgPD0gbWF4UGl4Q291bnQgKiBmcmFtZVRvbGVyYW5jZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncmVtb3ZlZCBibGFjayBmcmFtZSA6ICcgKyBmICsgJyA7IGZyYW1lIGR1cmF0aW9uICcgKyBfZnJhbWVzW2ZdLmR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZnJhbWUgaXMgcGFzc2VkIDogJyArIGYpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tVbnRpbE5vdEJsYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb05vdENoZWNrTmV4dCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0RnJhbWVzLnB1c2goX2ZyYW1lc1tmXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGxvb3AoKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFkb05vdENoZWNrTmV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0MmQuZHJhd0ltYWdlKGltYWdlLCAwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1hZ2VEYXRhID0gY29udGV4dDJkLmdldEltYWdlRGF0YSgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFBpeENvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kUGl4Q2hlY2sgPSBpbWFnZURhdGEuZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFBpeENvdW50ID0gaW1hZ2VEYXRhLmRhdGEubGVuZ3RoIC8gNDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHBpeCA9IDA7IHBpeCA8IGVuZFBpeENoZWNrOyBwaXggKz0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRDb2xvciA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByOiBpbWFnZURhdGEuZGF0YVtwaXhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGc6IGltYWdlRGF0YS5kYXRhW3BpeCArIDFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGI6IGltYWdlRGF0YS5kYXRhW3BpeCArIDJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yRGlmZmVyZW5jZSA9IE1hdGguc3FydChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhjdXJyZW50Q29sb3IuciAtIHNhbXBsZUNvbG9yLnIsIDIpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhjdXJyZW50Q29sb3IuZyAtIHNhbXBsZUNvbG9yLmcsIDIpICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdyhjdXJyZW50Q29sb3IuYiAtIHNhbXBsZUNvbG9yLmIsIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGlmZmVyZW5jZSBpbiBjb2xvciBpdCBpcyBkaWZmZXJlbmNlIGluIGNvbG9yIHZlY3RvcnMgKHIxLGcxLGIxKSA8PT4gKHIyLGcyLGIyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yRGlmZmVyZW5jZSA8PSBtYXhDb2xvckRpZmZlcmVuY2UgKiBwaXhUb2xlcmFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXRjaFBpeENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmluaXNoSW1hZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9IF9mcmFtZXNbZl0uaW1hZ2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpbmlzaEltYWdlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdEZyYW1lcyA9IHJlc3VsdEZyYW1lcy5jb25jYXQoX2ZyYW1lcy5zbGljZShlbmRDaGVja0ZyYW1lKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdEZyYW1lcy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGF0IGxlYXN0IG9uZSBsYXN0IGZyYW1lIHNob3VsZCBiZSBhdmFpbGFibGUgZm9yIG5leHQgbWFuaXB1bGF0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdG90YWwgZHVyYXRpb24gb2YgYWxsIGZyYW1lcyB3aWxsIGJlIDwgMTAwMCB0aGFuIGZmbXBlZyBkb2Vzbid0IHdvcmsgd2VsbC4uLlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdEZyYW1lcy5wdXNoKF9mcmFtZXNbX2ZyYW1lcy5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXN1bHRGcmFtZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGlzU3RvcERyYXdpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHN0b3BzIHJlY29yZGluZyB2aWRlby5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gQ2FsbGJhY2sgZnVuY3Rpb24sIHRoYXQgaXMgdXNlZCB0byBwYXNzIHJlY29yZGVkIGJsb2IgYmFjayB0byB0aGUgY2FsbGVlLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIFdoYW1teVJlY29yZGVyXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIuc3RvcChmdW5jdGlvbihibG9iKSB7XHJcbiAgICAgKiAgICAgdmlkZW8uc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgICAqIH0pO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnN0b3AgPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuXHJcbiAgICAgICAgaXNTdG9wRHJhd2luZyA9IHRydWU7XHJcblxyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy8gYW5hbHlzZSBvZiBhbGwgZnJhbWVzIHRha2VzIHNvbWUgdGltZSFcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBlLmcuIGRyb3BCbGFja0ZyYW1lcyhmcmFtZXMsIDEwLCAxLCAxKSAtIHdpbGwgY3V0IGFsbCAxMCBmcmFtZXNcclxuICAgICAgICAgICAgLy8gZS5nLiBkcm9wQmxhY2tGcmFtZXMoZnJhbWVzLCAxMCwgMC41LCAwLjUpIC0gd2lsbCBhbmFseXNlIDEwIGZyYW1lc1xyXG4gICAgICAgICAgICAvLyBlLmcuIGRyb3BCbGFja0ZyYW1lcyhmcmFtZXMsIDEwKSA9PT0gZHJvcEJsYWNrRnJhbWVzKGZyYW1lcywgMTAsIDAsIDApIC0gd2lsbCBhbmFseXNlIDEwIGZyYW1lcyB3aXRoIHN0cmljdCBibGFjayBjb2xvclxyXG4gICAgICAgICAgICBkcm9wQmxhY2tGcmFtZXMod2hhbW15LmZyYW1lcywgLTEsIG51bGwsIG51bGwsIGZ1bmN0aW9uKGZyYW1lcykge1xyXG4gICAgICAgICAgICAgICAgd2hhbW15LmZyYW1lcyA9IGZyYW1lcztcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0byBkaXNwbGF5IGFkdmVydGlzZW1lbnQgaW1hZ2VzIVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5hZHZlcnRpc2VtZW50ICYmIGNvbmZpZy5hZHZlcnRpc2VtZW50Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdoYW1teS5mcmFtZXMgPSBjb25maWcuYWR2ZXJ0aXNlbWVudC5jb25jYXQod2hhbW15LmZyYW1lcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiBAcHJvcGVydHkge0Jsb2J9IGJsb2IgLSBSZWNvcmRlZCBmcmFtZXMgaW4gdmlkZW8vd2VibSBibG9iLlxyXG4gICAgICAgICAgICAgICAgICogQG1lbWJlcm9mIFdoYW1teVJlY29yZGVyXHJcbiAgICAgICAgICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAgICAgICAgICogcmVjb3JkZXIuc3RvcChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAqICAgICB2YXIgYmxvYiA9IHJlY29yZGVyLmJsb2I7XHJcbiAgICAgICAgICAgICAgICAgKiB9KTtcclxuICAgICAgICAgICAgICAgICAqL1xyXG4gICAgICAgICAgICAgICAgd2hhbW15LmNvbXBpbGUoZnVuY3Rpb24oYmxvYikge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmJsb2IgPSBibG9iO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuYmxvYi5mb3JFYWNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmJsb2IgPSBuZXcgQmxvYihbXSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3ZpZGVvL3dlYm0nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKF90aGlzLmJsb2IpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCAxMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBpc1BhdXNlZFJlY29yZGluZyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgcGF1c2VzIHRoZSByZWNvcmRpbmcgcHJvY2Vzcy5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBXaGFtbXlSZWNvcmRlclxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHJlY29yZGVyLnBhdXNlKCk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMucGF1c2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpc1BhdXNlZFJlY29yZGluZyA9IHRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgcmVzdW1lcyB0aGUgcmVjb3JkaW5nIHByb2Nlc3MuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgV2hhbW15UmVjb3JkZXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5yZXN1bWUoKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXN1bWUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpc1BhdXNlZFJlY29yZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoaXNTdG9wRHJhd2luZykge1xyXG4gICAgICAgICAgICB0aGlzLnJlY29yZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCByZXNldHMgY3VycmVudGx5IHJlY29yZGVkIGRhdGEuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgV2hhbW15UmVjb3JkZXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5jbGVhclJlY29yZGVkRGF0YSgpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLmNsZWFyUmVjb3JkZWREYXRhID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCFpc1N0b3BEcmF3aW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcChjbGVhclJlY29yZGVkRGF0YUNCKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2xlYXJSZWNvcmRlZERhdGFDQigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBjbGVhclJlY29yZGVkRGF0YUNCKCkge1xyXG4gICAgICAgIHdoYW1teS5mcmFtZXMgPSBbXTtcclxuICAgICAgICBpc1N0b3BEcmF3aW5nID0gdHJ1ZTtcclxuICAgICAgICBpc1BhdXNlZFJlY29yZGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZvciBkZWJ1Z2dpbmdcclxuICAgIHRoaXMubmFtZSA9ICdXaGFtbXlSZWNvcmRlcic7XHJcbiAgICB0aGlzLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgIH07XHJcblxyXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICB2YXIgdmlkZW87XHJcbiAgICB2YXIgbGFzdFRpbWU7XHJcbiAgICB2YXIgd2hhbW15O1xyXG59XHJcblxyXG5pZiAodHlwZW9mIFJlY29yZFJUQyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIFJlY29yZFJUQy5XaGFtbXlSZWNvcmRlciA9IFdoYW1teVJlY29yZGVyO1xyXG59XG5cclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGltYXR0ZXIxNS93aGFtbXkvYmxvYi9tYXN0ZXIvTElDRU5TRVxyXG4vLyBfX19fX19fX19cclxuLy8gV2hhbW15LmpzXHJcblxyXG4vLyB0b2RvOiBGaXJlZm94IG5vdyBzdXBwb3J0cyB3ZWJwIGZvciB3ZWJtIGNvbnRhaW5lcnMhXHJcbi8vIHRoZWlyIE1lZGlhUmVjb3JkZXIgaW1wbGVtZW50YXRpb24gd29ya3Mgd2VsbCFcclxuLy8gc2hvdWxkIHdlIHByb3ZpZGUgYW4gb3B0aW9uIHRvIHJlY29yZCB2aWEgV2hhbW15LmpzIG9yIE1lZGlhUmVjb3JkZXIgQVBJIGlzIGEgYmV0dGVyIHNvbHV0aW9uP1xyXG5cclxuLyoqXHJcbiAqIFdoYW1teSBpcyBhIHN0YW5kYWxvbmUgY2xhc3MgdXNlZCBieSB7QGxpbmsgUmVjb3JkUlRDfSB0byBicmluZyB2aWRlbyByZWNvcmRpbmcgaW4gQ2hyb21lLiBJdCBpcyB3cml0dGVuIGJ5IHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vYW50aW1hdHRlcjE1fGFudGltYXR0ZXIxNX1cclxuICogQHN1bW1hcnkgQSByZWFsIHRpbWUgamF2YXNjcmlwdCB3ZWJtIGVuY29kZXIgYmFzZWQgb24gYSBjYW52YXMgaGFjay5cclxuICogQGxpY2Vuc2Uge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDI2xpY2Vuc2V8TUlUfVxyXG4gKiBAYXV0aG9yIHtAbGluayBodHRwOi8vd3d3Lk11YXpLaGFuLmNvbXxNdWF6IEtoYW59XHJcbiAqIEB0eXBlZGVmIFdoYW1teVxyXG4gKiBAY2xhc3NcclxuICogQGV4YW1wbGVcclxuICogdmFyIHJlY29yZGVyID0gbmV3IFdoYW1teSgpLlZpZGVvKDE1KTtcclxuICogcmVjb3JkZXIuYWRkKGNvbnRleHQgfHwgY2FudmFzIHx8IGRhdGFVUkwpO1xyXG4gKiB2YXIgb3V0cHV0ID0gcmVjb3JkZXIuY29tcGlsZSgpO1xyXG4gKiBAc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbXVhei1raGFuL1JlY29yZFJUQ3xSZWNvcmRSVEMgU291cmNlIENvZGV9XHJcbiAqL1xyXG5cclxudmFyIFdoYW1teSA9IChmdW5jdGlvbigpIHtcclxuICAgIC8vIGEgbW9yZSBhYnN0cmFjdC1pc2ggQVBJXHJcblxyXG4gICAgZnVuY3Rpb24gV2hhbW15VmlkZW8oZHVyYXRpb24pIHtcclxuICAgICAgICB0aGlzLmZyYW1lcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbiB8fCAxO1xyXG4gICAgICAgIHRoaXMucXVhbGl0eSA9IDAuODtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhc3MgQ2FudmFzIG9yIENvbnRleHQgb3IgaW1hZ2Uvd2VicChzdHJpbmcpIHRvIHtAbGluayBXaGFtbXl9IGVuY29kZXIuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgV2hhbW15XHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIgPSBuZXcgV2hhbW15KCkuVmlkZW8oMC44LCAxMDApO1xyXG4gICAgICogcmVjb3JkZXIuYWRkKGNhbnZhcyB8fCBjb250ZXh0IHx8ICdpbWFnZS93ZWJwJyk7XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJhbWUgLSBDYW52YXMgfHwgQ29udGV4dCB8fCBpbWFnZS93ZWJwXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZHVyYXRpb24gLSBTdGljayBhIGR1cmF0aW9uIChpbiBtaWxsaXNlY29uZHMpXHJcbiAgICAgKi9cclxuICAgIFdoYW1teVZpZGVvLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihmcmFtZSwgZHVyYXRpb24pIHtcclxuICAgICAgICBpZiAoJ2NhbnZhcycgaW4gZnJhbWUpIHsgLy9DYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcclxuICAgICAgICAgICAgZnJhbWUgPSBmcmFtZS5jYW52YXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoJ3RvRGF0YVVSTCcgaW4gZnJhbWUpIHtcclxuICAgICAgICAgICAgZnJhbWUgPSBmcmFtZS50b0RhdGFVUkwoJ2ltYWdlL3dlYnAnLCB0aGlzLnF1YWxpdHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCEoL15kYXRhOmltYWdlXFwvd2VicDtiYXNlNjQsL2lnKS50ZXN0KGZyYW1lKSkge1xyXG4gICAgICAgICAgICB0aHJvdyAnSW5wdXQgbXVzdCBiZSBmb3JtYXR0ZWQgcHJvcGVybHkgYXMgYSBiYXNlNjQgZW5jb2RlZCBEYXRhVVJJIG9mIHR5cGUgaW1hZ2Uvd2VicCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZnJhbWVzLnB1c2goe1xyXG4gICAgICAgICAgICBpbWFnZTogZnJhbWUsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbiB8fCB0aGlzLmR1cmF0aW9uXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIHByb2Nlc3NJbldlYldvcmtlcihfZnVuY3Rpb24pIHtcclxuICAgICAgICB2YXIgYmxvYiA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW19mdW5jdGlvbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAndGhpcy5vbm1lc3NhZ2UgPSAgZnVuY3Rpb24gKGVlZSkgeycgKyBfZnVuY3Rpb24ubmFtZSArICcoZWVlLmRhdGEpO30nXHJcbiAgICAgICAgXSwge1xyXG4gICAgICAgICAgICB0eXBlOiAnYXBwbGljYXRpb24vamF2YXNjcmlwdCdcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICAgIHZhciB3b3JrZXIgPSBuZXcgV29ya2VyKGJsb2IpO1xyXG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgICAgcmV0dXJuIHdvcmtlcjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB3aGFtbXlJbldlYldvcmtlcihmcmFtZXMpIHtcclxuICAgICAgICBmdW5jdGlvbiBBcnJheVRvV2ViTShmcmFtZXMpIHtcclxuICAgICAgICAgICAgdmFyIGluZm8gPSBjaGVja0ZyYW1lcyhmcmFtZXMpO1xyXG4gICAgICAgICAgICBpZiAoIWluZm8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGNsdXN0ZXJNYXhEdXJhdGlvbiA9IDMwMDAwO1xyXG5cclxuICAgICAgICAgICAgdmFyIEVCTUwgPSBbe1xyXG4gICAgICAgICAgICAgICAgJ2lkJzogMHgxYTQ1ZGZhMywgLy8gRUJNTFxyXG4gICAgICAgICAgICAgICAgJ2RhdGEnOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICdkYXRhJzogMSxcclxuICAgICAgICAgICAgICAgICAgICAnaWQnOiAweDQyODYgLy8gRUJNTFZlcnNpb25cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAnZGF0YSc6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogMHg0MmY3IC8vIEVCTUxSZWFkVmVyc2lvblxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICdkYXRhJzogNCxcclxuICAgICAgICAgICAgICAgICAgICAnaWQnOiAweDQyZjIgLy8gRUJNTE1heElETGVuZ3RoXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiA4LFxyXG4gICAgICAgICAgICAgICAgICAgICdpZCc6IDB4NDJmMyAvLyBFQk1MTWF4U2l6ZUxlbmd0aFxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICdkYXRhJzogJ3dlYm0nLFxyXG4gICAgICAgICAgICAgICAgICAgICdpZCc6IDB4NDI4MiAvLyBEb2NUeXBlXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICdpZCc6IDB4NDI4NyAvLyBEb2NUeXBlVmVyc2lvblxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICdkYXRhJzogMixcclxuICAgICAgICAgICAgICAgICAgICAnaWQnOiAweDQyODUgLy8gRG9jVHlwZVJlYWRWZXJzaW9uXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAnaWQnOiAweDE4NTM4MDY3LCAvLyBTZWdtZW50XHJcbiAgICAgICAgICAgICAgICAnZGF0YSc6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogMHgxNTQ5YTk2NiwgLy8gSW5mb1xyXG4gICAgICAgICAgICAgICAgICAgICdkYXRhJzogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiAxZTYsIC8vZG8gdGhpbmdzIGluIG1pbGxpc2VjcyAobnVtIG9mIG5hbm9zZWNzIGZvciBkdXJhdGlvbiBzY2FsZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogMHgyYWQ3YjEgLy8gVGltZWNvZGVTY2FsZVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiAnd2hhbW15JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogMHg0ZDgwIC8vIE11eGluZ0FwcFxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiAnd2hhbW15JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogMHg1NzQxIC8vIFdyaXRpbmdBcHBcclxuICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJzogZG91YmxlVG9TdHJpbmcoaW5mby5kdXJhdGlvbiksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IDB4NDQ4OSAvLyBEdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogMHgxNjU0YWU2YiwgLy8gVHJhY2tzXHJcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiAweGFlLCAvLyBUcmFja0VudHJ5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJzogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJzogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IDB4ZDcgLy8gVHJhY2tOdW1iZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogMHg3M2M1IC8vIFRyYWNrVUlEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJzogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZCc6IDB4OWMgLy8gRmxhZ0xhY2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YSc6ICd1bmQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogMHgyMmI1OWMgLy8gTGFuZ3VhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiAnVl9WUDgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogMHg4NiAvLyBDb2RlY0lEXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJzogJ1ZQOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiAweDI1ODY4OCAvLyBDb2RlY05hbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogMHg4MyAvLyBUcmFja1R5cGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogMHhlMCwgLy8gVmlkZW9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhJzogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZGF0YSc6IGluZm8ud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2lkJzogMHhiMCAvLyBQaXhlbFdpZHRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEnOiBpbmZvLmhlaWdodCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWQnOiAweGJhIC8vIFBpeGVsSGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XTtcclxuXHJcbiAgICAgICAgICAgIC8vR2VuZXJhdGUgY2x1c3RlcnMgKG1heCBkdXJhdGlvbilcclxuICAgICAgICAgICAgdmFyIGZyYW1lTnVtYmVyID0gMDtcclxuICAgICAgICAgICAgdmFyIGNsdXN0ZXJUaW1lY29kZSA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlIChmcmFtZU51bWJlciA8IGZyYW1lcy5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2x1c3RlckZyYW1lcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsdXN0ZXJEdXJhdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2x1c3RlckZyYW1lcy5wdXNoKGZyYW1lc1tmcmFtZU51bWJlcl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJEdXJhdGlvbiArPSBmcmFtZXNbZnJhbWVOdW1iZXJdLmR1cmF0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIGZyYW1lTnVtYmVyKys7XHJcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChmcmFtZU51bWJlciA8IGZyYW1lcy5sZW5ndGggJiYgY2x1c3RlckR1cmF0aW9uIDwgY2x1c3Rlck1heER1cmF0aW9uKTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgY2x1c3RlckNvdW50ZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsdXN0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogMHgxZjQzYjY3NSwgLy8gQ2x1c3RlclxyXG4gICAgICAgICAgICAgICAgICAgICdkYXRhJzogZ2V0Q2x1c3RlckRhdGEoY2x1c3RlclRpbWVjb2RlLCBjbHVzdGVyQ291bnRlciwgY2x1c3RlckZyYW1lcylcclxuICAgICAgICAgICAgICAgIH07IC8vQWRkIGNsdXN0ZXIgdG8gc2VnbWVudFxyXG4gICAgICAgICAgICAgICAgRUJNTFsxXS5kYXRhLnB1c2goY2x1c3Rlcik7XHJcbiAgICAgICAgICAgICAgICBjbHVzdGVyVGltZWNvZGUgKz0gY2x1c3RlckR1cmF0aW9uO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZ2VuZXJhdGVFQk1MKEVCTUwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0Q2x1c3RlckRhdGEoY2x1c3RlclRpbWVjb2RlLCBjbHVzdGVyQ291bnRlciwgY2x1c3RlckZyYW1lcykge1xyXG4gICAgICAgICAgICByZXR1cm4gW3tcclxuICAgICAgICAgICAgICAgICdkYXRhJzogY2x1c3RlclRpbWVjb2RlLFxyXG4gICAgICAgICAgICAgICAgJ2lkJzogMHhlNyAvLyBUaW1lY29kZVxyXG4gICAgICAgICAgICB9XS5jb25jYXQoY2x1c3RlckZyYW1lcy5tYXAoZnVuY3Rpb24od2VicCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJsb2NrID0gbWFrZVNpbXBsZUJsb2NrKHtcclxuICAgICAgICAgICAgICAgICAgICBkaXNjYXJkYWJsZTogMCxcclxuICAgICAgICAgICAgICAgICAgICBmcmFtZTogd2VicC5kYXRhLnNsaWNlKDQpLFxyXG4gICAgICAgICAgICAgICAgICAgIGludmlzaWJsZTogMCxcclxuICAgICAgICAgICAgICAgICAgICBrZXlmcmFtZTogMSxcclxuICAgICAgICAgICAgICAgICAgICBsYWNpbmc6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgdHJhY2tOdW06IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZWNvZGU6IE1hdGgucm91bmQoY2x1c3RlckNvdW50ZXIpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNsdXN0ZXJDb3VudGVyICs9IHdlYnAuZHVyYXRpb247XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGJsb2NrLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAweGEzXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBzdW1zIHRoZSBsZW5ndGhzIG9mIGFsbCB0aGUgZnJhbWVzIGFuZCBnZXRzIHRoZSBkdXJhdGlvblxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjaGVja0ZyYW1lcyhmcmFtZXMpIHtcclxuICAgICAgICAgICAgaWYgKCFmcmFtZXNbMF0pIHtcclxuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogJ1NvbWV0aGluZyB3ZW50IHdyb25nLiBNYXliZSBXZWJQIGZvcm1hdCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoZSBjdXJyZW50IGJyb3dzZXIuJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IGZyYW1lc1swXS53aWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodCA9IGZyYW1lc1swXS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbiA9IGZyYW1lc1swXS5kdXJhdGlvbjtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgZnJhbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbiArPSBmcmFtZXNbaV0uZHVyYXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXJhdGlvbixcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBudW1Ub0J1ZmZlcihudW0pIHtcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gW107XHJcbiAgICAgICAgICAgIHdoaWxlIChudW0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKG51bSAmIDB4ZmYpO1xyXG4gICAgICAgICAgICAgICAgbnVtID0gbnVtID4+IDg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHBhcnRzLnJldmVyc2UoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzdHJUb0J1ZmZlcihzdHIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHN0ci5zcGxpdCgnJykubWFwKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlLmNoYXJDb2RlQXQoMCk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJpdHNUb0J1ZmZlcihiaXRzKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gW107XHJcbiAgICAgICAgICAgIHZhciBwYWQgPSAoYml0cy5sZW5ndGggJSA4KSA/IChuZXcgQXJyYXkoMSArIDggLSAoYml0cy5sZW5ndGggJSA4KSkpLmpvaW4oJzAnKSA6ICcnO1xyXG4gICAgICAgICAgICBiaXRzID0gcGFkICsgYml0cztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiaXRzLmxlbmd0aDsgaSArPSA4KSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnB1c2gocGFyc2VJbnQoYml0cy5zdWJzdHIoaSwgOCksIDIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZUVCTUwoanNvbikge1xyXG4gICAgICAgICAgICB2YXIgZWJtbCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGpzb24ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0ganNvbltpXS5kYXRhO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gZ2VuZXJhdGVFQk1MKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gYml0c1RvQnVmZmVyKGRhdGEudG9TdHJpbmcoMikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gc3RyVG9CdWZmZXIoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IGRhdGEuc2l6ZSB8fCBkYXRhLmJ5dGVMZW5ndGggfHwgZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB2YXIgemVyb2VzID0gTWF0aC5jZWlsKE1hdGguY2VpbChNYXRoLmxvZyhsZW4pIC8gTWF0aC5sb2coMikpIC8gOCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2l6ZVRvU3RyaW5nID0gbGVuLnRvU3RyaW5nKDIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhZGRlZCA9IChuZXcgQXJyYXkoKHplcm9lcyAqIDcgKyA3ICsgMSkgLSBzaXplVG9TdHJpbmcubGVuZ3RoKSkuam9pbignMCcpICsgc2l6ZVRvU3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNpemUgPSAobmV3IEFycmF5KHplcm9lcykpLmpvaW4oJzAnKSArICcxJyArIHBhZGRlZDtcclxuXHJcbiAgICAgICAgICAgICAgICBlYm1sLnB1c2gobnVtVG9CdWZmZXIoanNvbltpXS5pZCkpO1xyXG4gICAgICAgICAgICAgICAgZWJtbC5wdXNoKGJpdHNUb0J1ZmZlcihzaXplKSk7XHJcbiAgICAgICAgICAgICAgICBlYm1sLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmxvYihlYm1sLCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAndmlkZW8vd2VibSdcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB0b0JpblN0ck9sZChiaXRzKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBwYWQgPSAoYml0cy5sZW5ndGggJSA4KSA/IChuZXcgQXJyYXkoMSArIDggLSAoYml0cy5sZW5ndGggJSA4KSkpLmpvaW4oJzAnKSA6ICcnO1xyXG4gICAgICAgICAgICBiaXRzID0gcGFkICsgYml0cztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBiaXRzLmxlbmd0aDsgaSArPSA4KSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhICs9IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoYml0cy5zdWJzdHIoaSwgOCksIDIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1ha2VTaW1wbGVCbG9jayhkYXRhKSB7XHJcbiAgICAgICAgICAgIHZhciBmbGFncyA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5rZXlmcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgZmxhZ3MgfD0gMTI4O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5pbnZpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIGZsYWdzIHw9IDg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxhY2luZykge1xyXG4gICAgICAgICAgICAgICAgZmxhZ3MgfD0gKGRhdGEubGFjaW5nIDw8IDEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5kaXNjYXJkYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgZmxhZ3MgfD0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEudHJhY2tOdW0gPiAxMjcpIHtcclxuICAgICAgICAgICAgICAgIHRocm93ICdUcmFja051bWJlciA+IDEyNyBub3Qgc3VwcG9ydGVkJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIG91dCA9IFtkYXRhLnRyYWNrTnVtIHwgMHg4MCwgZGF0YS50aW1lY29kZSA+PiA4LCBkYXRhLnRpbWVjb2RlICYgMHhmZiwgZmxhZ3NdLm1hcChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShlKTtcclxuICAgICAgICAgICAgfSkuam9pbignJykgKyBkYXRhLmZyYW1lO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG91dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlV2ViUChyaWZmKSB7XHJcbiAgICAgICAgICAgIHZhciBWUDggPSByaWZmLlJJRkZbMF0uV0VCUFswXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBmcmFtZVN0YXJ0ID0gVlA4LmluZGV4T2YoJ1xceDlkXFx4MDFcXHgyYScpOyAvLyBBIFZQOCBrZXlmcmFtZSBzdGFydHMgd2l0aCB0aGUgMHg5ZDAxMmEgaGVhZGVyXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBjID0gW107IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNbaV0gPSBWUDguY2hhckNvZGVBdChmcmFtZVN0YXJ0ICsgMyArIGkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgd2lkdGgsIGhlaWdodCwgdG1wO1xyXG5cclxuICAgICAgICAgICAgLy90aGUgY29kZSBiZWxvdyBpcyBsaXRlcmFsbHkgY29waWVkIHZlcmJhdGltIGZyb20gdGhlIGJpdHN0cmVhbSBzcGVjXHJcbiAgICAgICAgICAgIHRtcCA9IChjWzFdIDw8IDgpIHwgY1swXTtcclxuICAgICAgICAgICAgd2lkdGggPSB0bXAgJiAweDNGRkY7XHJcbiAgICAgICAgICAgIHRtcCA9IChjWzNdIDw8IDgpIHwgY1syXTtcclxuICAgICAgICAgICAgaGVpZ2h0ID0gdG1wICYgMHgzRkZGO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBWUDgsXHJcbiAgICAgICAgICAgICAgICByaWZmOiByaWZmXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRTdHJMZW5ndGgoc3RyaW5nLCBvZmZzZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHN0cmluZy5zdWJzdHIob2Zmc2V0ICsgNCwgNCkuc3BsaXQoJycpLm1hcChmdW5jdGlvbihpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdW5wYWRkZWQgPSBpLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKG5ldyBBcnJheSg4IC0gdW5wYWRkZWQubGVuZ3RoICsgMSkpLmpvaW4oJzAnKSArIHVucGFkZGVkO1xyXG4gICAgICAgICAgICB9KS5qb2luKCcnKSwgMik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBwYXJzZVJJRkYoc3RyaW5nKSB7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSAwO1xyXG4gICAgICAgICAgICB2YXIgY2h1bmtzID0ge307XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAob2Zmc2V0IDwgc3RyaW5nLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkID0gc3RyaW5nLnN1YnN0cihvZmZzZXQsIDQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IGdldFN0ckxlbmd0aChzdHJpbmcsIG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHN0cmluZy5zdWJzdHIob2Zmc2V0ICsgNCArIDQsIGxlbik7XHJcbiAgICAgICAgICAgICAgICBvZmZzZXQgKz0gNCArIDQgKyBsZW47XHJcbiAgICAgICAgICAgICAgICBjaHVua3NbaWRdID0gY2h1bmtzW2lkXSB8fCBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaWQgPT09ICdSSUZGJyB8fCBpZCA9PT0gJ0xJU1QnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2h1bmtzW2lkXS5wdXNoKHBhcnNlUklGRihkYXRhKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNodW5rc1tpZF0ucHVzaChkYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY2h1bmtzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZG91YmxlVG9TdHJpbmcobnVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXS5zbGljZS5jYWxsKFxyXG4gICAgICAgICAgICAgICAgbmV3IFVpbnQ4QXJyYXkoKG5ldyBGbG9hdDY0QXJyYXkoW251bV0pKS5idWZmZXIpLCAwKS5tYXAoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoZSk7XHJcbiAgICAgICAgICAgIH0pLnJldmVyc2UoKS5qb2luKCcnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB3ZWJtID0gbmV3IEFycmF5VG9XZWJNKGZyYW1lcy5tYXAoZnVuY3Rpb24oZnJhbWUpIHtcclxuICAgICAgICAgICAgdmFyIHdlYnAgPSBwYXJzZVdlYlAocGFyc2VSSUZGKGF0b2IoZnJhbWUuaW1hZ2Uuc2xpY2UoMjMpKSkpO1xyXG4gICAgICAgICAgICB3ZWJwLmR1cmF0aW9uID0gZnJhbWUuZHVyYXRpb247XHJcbiAgICAgICAgICAgIHJldHVybiB3ZWJwO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgcG9zdE1lc3NhZ2Uod2VibSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmNvZGVzIGZyYW1lcyBpbiBXZWJNIGNvbnRhaW5lci4gSXQgdXNlcyBXZWJXb3JraW52b2tlIHRvIGludm9rZSAnQXJyYXlUb1dlYk0nIG1ldGhvZC5cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIC0gQ2FsbGJhY2sgZnVuY3Rpb24sIHRoYXQgaXMgdXNlZCB0byBwYXNzIHJlY29yZGVkIGJsb2IgYmFjayB0byB0aGUgY2FsbGVlLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIFdoYW1teVxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHJlY29yZGVyID0gbmV3IFdoYW1teSgpLlZpZGVvKDAuOCwgMTAwKTtcclxuICAgICAqIHJlY29yZGVyLmNvbXBpbGUoZnVuY3Rpb24oYmxvYikge1xyXG4gICAgICogICAgLy8gYmxvYi5zaXplIC0gYmxvYi50eXBlXHJcbiAgICAgKiB9KTtcclxuICAgICAqL1xyXG4gICAgV2hhbW15VmlkZW8ucHJvdG90eXBlLmNvbXBpbGUgPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciB3ZWJXb3JrZXIgPSBwcm9jZXNzSW5XZWJXb3JrZXIod2hhbW15SW5XZWJXb3JrZXIpO1xyXG5cclxuICAgICAgICB3ZWJXb3JrZXIub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXZlbnQuZGF0YS5lcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FsbGJhY2soZXZlbnQuZGF0YSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgd2ViV29ya2VyLnBvc3RNZXNzYWdlKHRoaXMuZnJhbWVzKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIG1vcmUgYWJzdHJhY3QtaXNoIEFQSS5cclxuICAgICAgICAgKiBAbWV0aG9kXHJcbiAgICAgICAgICogQG1lbWJlcm9mIFdoYW1teVxyXG4gICAgICAgICAqIEBleGFtcGxlXHJcbiAgICAgICAgICogcmVjb3JkZXIgPSBuZXcgV2hhbW15KCkuVmlkZW8oMC44LCAxMDApO1xyXG4gICAgICAgICAqIEBwYXJhbSB7P251bWJlcn0gc3BlZWQgLSAwLjhcclxuICAgICAgICAgKiBAcGFyYW0gez9udW1iZXJ9IHF1YWxpdHkgLSAxMDBcclxuICAgICAgICAgKi9cclxuICAgICAgICBWaWRlbzogV2hhbW15VmlkZW9cclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5pZiAodHlwZW9mIFJlY29yZFJUQyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIFJlY29yZFJUQy5XaGFtbXkgPSBXaGFtbXk7XHJcbn1cblxyXG4vLyBfX19fX19fX19fX19fXyAoaW5kZXhlZC1kYilcclxuLy8gRGlza1N0b3JhZ2UuanNcclxuXHJcbi8qKlxyXG4gKiBEaXNrU3RvcmFnZSBpcyBhIHN0YW5kYWxvbmUgb2JqZWN0IHVzZWQgYnkge0BsaW5rIFJlY29yZFJUQ30gdG8gc3RvcmUgcmVjb3JkZWQgYmxvYnMgaW4gSW5kZXhlZERCIHN0b3JhZ2UuXHJcbiAqIEBzdW1tYXJ5IFdyaXRpbmcgYmxvYnMgaW50byBJbmRleGVkREIuXHJcbiAqIEBsaWNlbnNlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbXVhei1raGFuL1JlY29yZFJUQyNsaWNlbnNlfE1JVH1cclxuICogQGF1dGhvciB7QGxpbmsgaHR0cDovL3d3dy5NdWF6S2hhbi5jb218TXVheiBLaGFufVxyXG4gKiBAZXhhbXBsZVxyXG4gKiBEaXNrU3RvcmFnZS5TdG9yZSh7XHJcbiAqICAgICBhdWRpb0Jsb2I6IHlvdXJBdWRpb0Jsb2IsXHJcbiAqICAgICB2aWRlb0Jsb2I6IHlvdXJWaWRlb0Jsb2IsXHJcbiAqICAgICBnaWZCbG9iICA6IHlvdXJHaWZCbG9iXHJcbiAqIH0pO1xyXG4gKiBEaXNrU3RvcmFnZS5GZXRjaChmdW5jdGlvbihkYXRhVVJMLCB0eXBlKSB7XHJcbiAqICAgICBpZih0eXBlID09PSAnYXVkaW9CbG9iJykgeyB9XHJcbiAqICAgICBpZih0eXBlID09PSAndmlkZW9CbG9iJykgeyB9XHJcbiAqICAgICBpZih0eXBlID09PSAnZ2lmQmxvYicpICAgeyB9XHJcbiAqIH0pO1xyXG4gKiAvLyBEaXNrU3RvcmFnZS5kYXRhU3RvcmVOYW1lID0gJ3JlY29yZFJUQyc7XHJcbiAqIC8vIERpc2tTdG9yYWdlLm9uRXJyb3IgPSBmdW5jdGlvbihlcnJvcikgeyB9O1xyXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBpbml0IC0gVGhpcyBtZXRob2QgbXVzdCBiZSBjYWxsZWQgb25jZSB0byBpbml0aWFsaXplIEluZGV4ZWREQiBPYmplY3RTdG9yZS4gVGhvdWdoLCBpdCBpcyBhdXRvLXVzZWQgaW50ZXJuYWxseS5cclxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gRmV0Y2ggLSBUaGlzIG1ldGhvZCBmZXRjaGVzIHN0b3JlZCBibG9icyBmcm9tIEluZGV4ZWREQi5cclxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gU3RvcmUgLSBUaGlzIG1ldGhvZCBzdG9yZXMgYmxvYnMgaW4gSW5kZXhlZERCLlxyXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBvbkVycm9yIC0gVGhpcyBmdW5jdGlvbiBpcyBpbnZva2VkIGZvciBhbnkga25vd24vdW5rbm93biBlcnJvci5cclxuICogQHByb3BlcnR5IHtzdHJpbmd9IGRhdGFTdG9yZU5hbWUgLSBOYW1lIG9mIHRoZSBPYmplY3RTdG9yZSBjcmVhdGVkIGluIEluZGV4ZWREQiBzdG9yYWdlLlxyXG4gKiBAc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbXVhei1raGFuL1JlY29yZFJUQ3xSZWNvcmRSVEMgU291cmNlIENvZGV9XHJcbiAqL1xyXG5cclxuXHJcbnZhciBEaXNrU3RvcmFnZSA9IHtcclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgbXVzdCBiZSBjYWxsZWQgb25jZSB0byBpbml0aWFsaXplIEluZGV4ZWREQiBPYmplY3RTdG9yZS4gVGhvdWdoLCBpdCBpcyBhdXRvLXVzZWQgaW50ZXJuYWxseS5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBEaXNrU3RvcmFnZVxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogRGlza1N0b3JhZ2UuaW5pdCgpO1xyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgaW5kZXhlZERCID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgaW5kZXhlZERCLm9wZW4gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0luZGV4ZWREQiBBUEkgYXJlIG5vdCBhdmFpbGFibGUgaW4gdGhpcyBicm93c2VyLicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZGJWZXJzaW9uID0gMTtcclxuICAgICAgICB2YXIgZGJOYW1lID0gdGhpcy5kYk5hbWUgfHwgbG9jYXRpb24uaHJlZi5yZXBsYWNlKC9cXC98OnwjfCV8XFwufFxcW3xcXF0vZywgJycpLFxyXG4gICAgICAgICAgICBkYjtcclxuICAgICAgICB2YXIgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKGRiTmFtZSwgZGJWZXJzaW9uKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0U3RvcmUoZGF0YUJhc2UpIHtcclxuICAgICAgICAgICAgZGF0YUJhc2UuY3JlYXRlT2JqZWN0U3RvcmUoc2VsZi5kYXRhU3RvcmVOYW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHB1dEluREIoKSB7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2FjdGlvbiA9IGRiLnRyYW5zYWN0aW9uKFtzZWxmLmRhdGFTdG9yZU5hbWVdLCAncmVhZHdyaXRlJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZi52aWRlb0Jsb2IpIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHNlbGYuZGF0YVN0b3JlTmFtZSkucHV0KHNlbGYudmlkZW9CbG9iLCAndmlkZW9CbG9iJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxmLmdpZkJsb2IpIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHNlbGYuZGF0YVN0b3JlTmFtZSkucHV0KHNlbGYuZ2lmQmxvYiwgJ2dpZkJsb2InKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHNlbGYuYXVkaW9CbG9iKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzZWxmLmRhdGFTdG9yZU5hbWUpLnB1dChzZWxmLmF1ZGlvQmxvYiwgJ2F1ZGlvQmxvYicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRGcm9tU3RvcmUocG9ydGlvbk5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHNlbGYuZGF0YVN0b3JlTmFtZSkuZ2V0KHBvcnRpb25OYW1lKS5vbnN1Y2Nlc3MgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuY2FsbGJhY2soZXZlbnQudGFyZ2V0LnJlc3VsdCwgcG9ydGlvbk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldEZyb21TdG9yZSgnYXVkaW9CbG9iJyk7XHJcbiAgICAgICAgICAgIGdldEZyb21TdG9yZSgndmlkZW9CbG9iJyk7XHJcbiAgICAgICAgICAgIGdldEZyb21TdG9yZSgnZ2lmQmxvYicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gc2VsZi5vbkVycm9yO1xyXG5cclxuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkYiA9IHJlcXVlc3QucmVzdWx0O1xyXG4gICAgICAgICAgICBkYi5vbmVycm9yID0gc2VsZi5vbkVycm9yO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRiLnNldFZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYi52ZXJzaW9uICE9PSBkYlZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2V0VmVyc2lvbiA9IGRiLnNldFZlcnNpb24oZGJWZXJzaW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRWZXJzaW9uLm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVPYmplY3RTdG9yZShkYik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1dEluREIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwdXRJbkRCKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwdXRJbkRCKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlcXVlc3Qub251cGdyYWRlbmVlZGVkID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgY3JlYXRlT2JqZWN0U3RvcmUoZXZlbnQudGFyZ2V0LnJlc3VsdCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIGZldGNoZXMgc3RvcmVkIGJsb2JzIGZyb20gSW5kZXhlZERCLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIERpc2tTdG9yYWdlXHJcbiAgICAgKiBAaW50ZXJuYWxcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBEaXNrU3RvcmFnZS5GZXRjaChmdW5jdGlvbihkYXRhVVJMLCB0eXBlKSB7XHJcbiAgICAgKiAgICAgaWYodHlwZSA9PT0gJ2F1ZGlvQmxvYicpIHsgfVxyXG4gICAgICogICAgIGlmKHR5cGUgPT09ICd2aWRlb0Jsb2InKSB7IH1cclxuICAgICAqICAgICBpZih0eXBlID09PSAnZ2lmQmxvYicpICAgeyB9XHJcbiAgICAgKiB9KTtcclxuICAgICAqL1xyXG4gICAgRmV0Y2g6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHN0b3JlcyBibG9icyBpbiBJbmRleGVkREIuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgRGlza1N0b3JhZ2VcclxuICAgICAqIEBpbnRlcm5hbFxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIERpc2tTdG9yYWdlLlN0b3JlKHtcclxuICAgICAqICAgICBhdWRpb0Jsb2I6IHlvdXJBdWRpb0Jsb2IsXHJcbiAgICAgKiAgICAgdmlkZW9CbG9iOiB5b3VyVmlkZW9CbG9iLFxyXG4gICAgICogICAgIGdpZkJsb2IgIDogeW91ckdpZkJsb2JcclxuICAgICAqIH0pO1xyXG4gICAgICovXHJcbiAgICBTdG9yZTogZnVuY3Rpb24oY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5hdWRpb0Jsb2IgPSBjb25maWcuYXVkaW9CbG9iO1xyXG4gICAgICAgIHRoaXMudmlkZW9CbG9iID0gY29uZmlnLnZpZGVvQmxvYjtcclxuICAgICAgICB0aGlzLmdpZkJsb2IgPSBjb25maWcuZ2lmQmxvYjtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyBpbnZva2VkIGZvciBhbnkga25vd24vdW5rbm93biBlcnJvci5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBEaXNrU3RvcmFnZVxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogRGlza1N0b3JhZ2Uub25FcnJvciA9IGZ1bmN0aW9uKGVycm9yKXtcclxuICAgICAqICAgICBhbGVyb3QoIEpTT04uc3RyaW5naWZ5KGVycm9yKSApO1xyXG4gICAgICogfTtcclxuICAgICAqL1xyXG4gICAgb25FcnJvcjogZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKEpTT04uc3RyaW5naWZ5KGVycm9yLCBudWxsLCAnXFx0JykpO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkYXRhU3RvcmVOYW1lIC0gTmFtZSBvZiB0aGUgT2JqZWN0U3RvcmUgY3JlYXRlZCBpbiBJbmRleGVkREIgc3RvcmFnZS5cclxuICAgICAqIEBtZW1iZXJvZiBEaXNrU3RvcmFnZVxyXG4gICAgICogQGludGVybmFsXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogRGlza1N0b3JhZ2UuZGF0YVN0b3JlTmFtZSA9ICdyZWNvcmRSVEMnO1xyXG4gICAgICovXHJcbiAgICBkYXRhU3RvcmVOYW1lOiAncmVjb3JkUlRDJyxcclxuICAgIGRiTmFtZTogbnVsbFxyXG59O1xyXG5cclxuaWYgKHR5cGVvZiBSZWNvcmRSVEMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBSZWNvcmRSVEMuRGlza1N0b3JhZ2UgPSBEaXNrU3RvcmFnZTtcclxufVxuXHJcbi8vIF9fX19fX19fX19fX19fXHJcbi8vIEdpZlJlY29yZGVyLmpzXHJcblxyXG4vKipcclxuICogR2lmUmVjb3JkZXIgaXMgc3RhbmRhbG9uZSBjYWxzcyB1c2VkIGJ5IHtAbGluayBSZWNvcmRSVEN9IHRvIHJlY29yZCB2aWRlbyBvciBjYW52YXMgaW50byBhbmltYXRlZCBnaWYuXHJcbiAqIEBsaWNlbnNlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbXVhei1raGFuL1JlY29yZFJUQyNsaWNlbnNlfE1JVH1cclxuICogQGF1dGhvciB7QGxpbmsgaHR0cDovL3d3dy5NdWF6S2hhbi5jb218TXVheiBLaGFufVxyXG4gKiBAdHlwZWRlZiBHaWZSZWNvcmRlclxyXG4gKiBAY2xhc3NcclxuICogQGV4YW1wbGVcclxuICogdmFyIHJlY29yZGVyID0gbmV3IEdpZlJlY29yZGVyKG1lZGlhU3RyZWFtIHx8IGNhbnZhcyB8fCBjb250ZXh0LCB7IG9uR2lmUHJldmlldzogZnVuY3Rpb24sIG9uR2lmUmVjb3JkaW5nU3RhcnRlZDogZnVuY3Rpb24sIHdpZHRoOiAxMjgwLCBoZWlnaHQ6IDcyMCwgZnJhbWVSYXRlOiAyMDAsIHF1YWxpdHk6IDEwIH0pO1xyXG4gKiByZWNvcmRlci5yZWNvcmQoKTtcclxuICogcmVjb3JkZXIuc3RvcChmdW5jdGlvbihibG9iKSB7XHJcbiAqICAgICBpbWcuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICogfSk7XHJcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDfFJlY29yZFJUQyBTb3VyY2UgQ29kZX1cclxuICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gbWVkaWFTdHJlYW0gLSBNZWRpYVN0cmVhbSBvYmplY3Qgb3IgSFRNTENhbnZhc0VsZW1lbnQgb3IgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELlxyXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIC0ge2Rpc2FibGVMb2dzOnRydWUsIGluaXRDYWxsYmFjazogZnVuY3Rpb24sIHdpZHRoOiAzMjAsIGhlaWdodDogMjQwLCBmcmFtZVJhdGU6IDIwMCwgcXVhbGl0eTogMTB9XHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gR2lmUmVjb3JkZXIobWVkaWFTdHJlYW0sIGNvbmZpZykge1xyXG4gICAgaWYgKHR5cGVvZiBHSUZFbmNvZGVyID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgICAgICBzY3JpcHQuc3JjID0gJ2h0dHBzOi8vY2RuLndlYnJ0Yy1leHBlcmltZW50LmNvbS9naWYtcmVjb3JkZXIuanMnO1xyXG4gICAgICAgIChkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XHJcblxyXG4gICAgdmFyIGlzSFRNTE9iamVjdCA9IG1lZGlhU3RyZWFtIGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHx8IG1lZGlhU3RyZWFtIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCByZWNvcmRzIE1lZGlhU3RyZWFtLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIEdpZlJlY29yZGVyXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIucmVjb3JkKCk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVjb3JkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBHSUZFbmNvZGVyID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHNlbGYucmVjb3JkLCAxMDAwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFpc0xvYWRlZE1ldGFEYXRhKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoc2VsZi5yZWNvcmQsIDEwMDApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWlzSFRNTE9iamVjdCkge1xyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZy53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLndpZHRoID0gdmlkZW8ub2Zmc2V0V2lkdGggfHwgMzIwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5oZWlnaHQgPSB2aWRlby5vZmZzZXRIZWlnaHQgfHwgMjQwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZy52aWRlbykge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLnZpZGVvID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBjb25maWcud2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBjb25maWcuaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWNvbmZpZy5jYW52YXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5jYW52YXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGNvbmZpZy53aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGNvbmZpZy5oZWlnaHRcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGNvbmZpZy5jYW52YXMud2lkdGggfHwgMzIwO1xyXG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gY29uZmlnLmNhbnZhcy5oZWlnaHQgfHwgMjQwO1xyXG5cclxuICAgICAgICAgICAgdmlkZW8ud2lkdGggPSBjb25maWcudmlkZW8ud2lkdGggfHwgMzIwO1xyXG4gICAgICAgICAgICB2aWRlby5oZWlnaHQgPSBjb25maWcudmlkZW8uaGVpZ2h0IHx8IDI0MDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGV4dGVybmFsIGxpYnJhcnkgdG8gcmVjb3JkIGFzIEdJRiBpbWFnZXNcclxuICAgICAgICBnaWZFbmNvZGVyID0gbmV3IEdJRkVuY29kZXIoKTtcclxuXHJcbiAgICAgICAgLy8gdm9pZCBzZXRSZXBlYXQoaW50IGl0ZXIpIFxyXG4gICAgICAgIC8vIFNldHMgdGhlIG51bWJlciBvZiB0aW1lcyB0aGUgc2V0IG9mIEdJRiBmcmFtZXMgc2hvdWxkIGJlIHBsYXllZC4gXHJcbiAgICAgICAgLy8gRGVmYXVsdCBpcyAxOyAwIG1lYW5zIHBsYXkgaW5kZWZpbml0ZWx5LlxyXG4gICAgICAgIGdpZkVuY29kZXIuc2V0UmVwZWF0KDApO1xyXG5cclxuICAgICAgICAvLyB2b2lkIHNldEZyYW1lUmF0ZShOdW1iZXIgZnBzKSBcclxuICAgICAgICAvLyBTZXRzIGZyYW1lIHJhdGUgaW4gZnJhbWVzIHBlciBzZWNvbmQuIFxyXG4gICAgICAgIC8vIEVxdWl2YWxlbnQgdG8gc2V0RGVsYXkoMTAwMC9mcHMpLlxyXG4gICAgICAgIC8vIFVzaW5nIFwic2V0RGVsYXlcIiBpbnN0ZWFkIG9mIFwic2V0RnJhbWVSYXRlXCJcclxuICAgICAgICBnaWZFbmNvZGVyLnNldERlbGF5KGNvbmZpZy5mcmFtZVJhdGUgfHwgMjAwKTtcclxuXHJcbiAgICAgICAgLy8gdm9pZCBzZXRRdWFsaXR5KGludCBxdWFsaXR5KSBcclxuICAgICAgICAvLyBTZXRzIHF1YWxpdHkgb2YgY29sb3IgcXVhbnRpemF0aW9uIChjb252ZXJzaW9uIG9mIGltYWdlcyB0byB0aGUgXHJcbiAgICAgICAgLy8gbWF4aW11bSAyNTYgY29sb3JzIGFsbG93ZWQgYnkgdGhlIEdJRiBzcGVjaWZpY2F0aW9uKS4gXHJcbiAgICAgICAgLy8gTG93ZXIgdmFsdWVzIChtaW5pbXVtID0gMSkgcHJvZHVjZSBiZXR0ZXIgY29sb3JzLCBcclxuICAgICAgICAvLyBidXQgc2xvdyBwcm9jZXNzaW5nIHNpZ25pZmljYW50bHkuIDEwIGlzIHRoZSBkZWZhdWx0LCBcclxuICAgICAgICAvLyBhbmQgcHJvZHVjZXMgZ29vZCBjb2xvciBtYXBwaW5nIGF0IHJlYXNvbmFibGUgc3BlZWRzLiBcclxuICAgICAgICAvLyBWYWx1ZXMgZ3JlYXRlciB0aGFuIDIwIGRvIG5vdCB5aWVsZCBzaWduaWZpY2FudCBpbXByb3ZlbWVudHMgaW4gc3BlZWQuXHJcbiAgICAgICAgZ2lmRW5jb2Rlci5zZXRRdWFsaXR5KGNvbmZpZy5xdWFsaXR5IHx8IDEwKTtcclxuXHJcbiAgICAgICAgLy8gQm9vbGVhbiBzdGFydCgpIFxyXG4gICAgICAgIC8vIFRoaXMgd3JpdGVzIHRoZSBHSUYgSGVhZGVyIGFuZCByZXR1cm5zIGZhbHNlIGlmIGl0IGZhaWxzLlxyXG4gICAgICAgIGdpZkVuY29kZXIuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBjb25maWcub25HaWZSZWNvcmRpbmdTdGFydGVkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5vbkdpZlJlY29yZGluZ1N0YXJ0ZWQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRyYXdWaWRlb0ZyYW1lKHRpbWUpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuY2xlYXJlZFJlY29yZGVkRGF0YSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNQYXVzZWRSZWNvcmRpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdWaWRlb0ZyYW1lKHRpbWUpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGFzdEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXdWaWRlb0ZyYW1lKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbGFzdEZyYW1lVGltZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBsYXN0RnJhbWVUaW1lID0gdGltZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gfjEwIGZwc1xyXG4gICAgICAgICAgICBpZiAodGltZSAtIGxhc3RGcmFtZVRpbWUgPCA5MCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoIWlzSFRNTE9iamVjdCAmJiB2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIHZpYTogaHR0cHM6Ly9naXRodWIuY29tL211YXota2hhbi9XZWJSVEMtRXhwZXJpbWVudC9wdWxsLzMxNlxyXG4gICAgICAgICAgICAgICAgLy8gVHdlYWsgZm9yIEFuZHJvaWQgQ2hyb21lXHJcbiAgICAgICAgICAgICAgICB2aWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghaXNIVE1MT2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmZpZy5vbkdpZlByZXZpZXcpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5vbkdpZlByZXZpZXcoY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnaWZFbmNvZGVyLmFkZEZyYW1lKGNvbnRleHQpO1xyXG4gICAgICAgICAgICBsYXN0RnJhbWVUaW1lID0gdGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxhc3RBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3VmlkZW9GcmFtZSk7XHJcblxyXG4gICAgICAgIGlmIChjb25maWcuaW5pdENhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5pbml0Q2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2Qgc3RvcHMgcmVjb3JkaW5nIE1lZGlhU3RyZWFtLlxyXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBDYWxsYmFjayBmdW5jdGlvbiwgdGhhdCBpcyB1c2VkIHRvIHBhc3MgcmVjb3JkZWQgYmxvYiBiYWNrIHRvIHRoZSBjYWxsZWUuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgR2lmUmVjb3JkZXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5zdG9wKGZ1bmN0aW9uKGJsb2IpIHtcclxuICAgICAqICAgICBpbWcuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgICAqIH0pO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnN0b3AgPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24oKSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGxhc3RBbmltYXRpb25GcmFtZSkge1xyXG4gICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShsYXN0QW5pbWF0aW9uRnJhbWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZW5kVGltZSA9IERhdGUubm93KCk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwcm9wZXJ0eSB7QmxvYn0gYmxvYiAtIFRoZSByZWNvcmRlZCBibG9iIG9iamVjdC5cclxuICAgICAgICAgKiBAbWVtYmVyb2YgR2lmUmVjb3JkZXJcclxuICAgICAgICAgKiBAZXhhbXBsZVxyXG4gICAgICAgICAqIHJlY29yZGVyLnN0b3AoZnVuY3Rpb24oKXtcclxuICAgICAgICAgKiAgICAgdmFyIGJsb2IgPSByZWNvcmRlci5ibG9iO1xyXG4gICAgICAgICAqIH0pO1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuYmxvYiA9IG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShnaWZFbmNvZGVyLnN0cmVhbSgpLmJpbildLCB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9naWYnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNhbGxiYWNrKHRoaXMuYmxvYik7XHJcblxyXG4gICAgICAgIC8vIGJ1ZzogZmluZCBhIHdheSB0byBjbGVhciBvbGQgcmVjb3JkZWQgYmxvYnNcclxuICAgICAgICBnaWZFbmNvZGVyLnN0cmVhbSgpLmJpbiA9IFtdO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgaXNQYXVzZWRSZWNvcmRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHBhdXNlcyB0aGUgcmVjb3JkaW5nIHByb2Nlc3MuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgR2lmUmVjb3JkZXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5wYXVzZSgpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnBhdXNlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXNQYXVzZWRSZWNvcmRpbmcgPSB0cnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHJlc3VtZXMgdGhlIHJlY29yZGluZyBwcm9jZXNzLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIEdpZlJlY29yZGVyXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIucmVzdW1lKCk7XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVzdW1lID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaXNQYXVzZWRSZWNvcmRpbmcgPSBmYWxzZTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCByZXNldHMgY3VycmVudGx5IHJlY29yZGVkIGRhdGEuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgR2lmUmVjb3JkZXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5jbGVhclJlY29yZGVkRGF0YSgpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLmNsZWFyUmVjb3JkZWREYXRhID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2VsZi5jbGVhcmVkUmVjb3JkZWREYXRhID0gdHJ1ZTtcclxuICAgICAgICBjbGVhclJlY29yZGVkRGF0YUNCKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyUmVjb3JkZWREYXRhQ0IoKSB7XHJcbiAgICAgICAgaWYgKGdpZkVuY29kZXIpIHtcclxuICAgICAgICAgICAgZ2lmRW5jb2Rlci5zdHJlYW0oKS5iaW4gPSBbXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZm9yIGRlYnVnZ2luZ1xyXG4gICAgdGhpcy5uYW1lID0gJ0dpZlJlY29yZGVyJztcclxuICAgIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgIGlmIChpc0hUTUxPYmplY3QpIHtcclxuICAgICAgICBpZiAobWVkaWFTdHJlYW0gaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgICAgICAgICAgY29udGV4dCA9IG1lZGlhU3RyZWFtO1xyXG4gICAgICAgICAgICBjYW52YXMgPSBjb250ZXh0LmNhbnZhcztcclxuICAgICAgICB9IGVsc2UgaWYgKG1lZGlhU3RyZWFtIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgY29udGV4dCA9IG1lZGlhU3RyZWFtLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgICAgIGNhbnZhcyA9IG1lZGlhU3RyZWFtO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgaXNMb2FkZWRNZXRhRGF0YSA9IHRydWU7XHJcblxyXG4gICAgaWYgKCFpc0hUTUxPYmplY3QpIHtcclxuICAgICAgICB2YXIgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xyXG4gICAgICAgIHZpZGVvLm11dGVkID0gdHJ1ZTtcclxuICAgICAgICB2aWRlby5hdXRvcGxheSA9IHRydWU7XHJcblxyXG4gICAgICAgIGlzTG9hZGVkTWV0YURhdGEgPSBmYWxzZTtcclxuICAgICAgICB2aWRlby5vbmxvYWRlZG1ldGFkYXRhID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlzTG9hZGVkTWV0YURhdGEgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHNldFNyY09iamVjdChtZWRpYVN0cmVhbSwgdmlkZW8pO1xyXG5cclxuICAgICAgICB2aWRlby5wbGF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxhc3RBbmltYXRpb25GcmFtZSA9IG51bGw7XHJcbiAgICB2YXIgc3RhcnRUaW1lLCBlbmRUaW1lLCBsYXN0RnJhbWVUaW1lO1xyXG5cclxuICAgIHZhciBnaWZFbmNvZGVyO1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxufVxyXG5cclxuaWYgKHR5cGVvZiBSZWNvcmRSVEMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBSZWNvcmRSVEMuR2lmUmVjb3JkZXIgPSBHaWZSZWNvcmRlcjtcclxufVxuXHJcbi8vIExhc3QgdGltZSB1cGRhdGVkOiAyMDE4LTAzLTAyIDI6NTY6MjggQU0gVVRDXHJcblxyXG4vLyBfX19fX19fX19fX19fX19fX19fX19fX19cclxuLy8gTXVsdGlTdHJlYW1zTWl4ZXIgdjEuMC41XHJcblxyXG4vLyBPcGVuLVNvdXJjZWQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vTXVsdGlTdHJlYW1zTWl4ZXJcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIE11YXogS2hhbiAgICAgLSB3d3cuTXVhektoYW4uY29tXHJcbi8vIE1JVCBMaWNlbnNlICAgLSB3d3cuV2ViUlRDLUV4cGVyaW1lbnQuY29tL2xpY2VuY2VcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmZ1bmN0aW9uIE11bHRpU3RyZWFtc01peGVyKGFycmF5T2ZNZWRpYVN0cmVhbXMpIHtcclxuXHJcbiAgICAvLyByZXF1aXJlczogY2hyb21lOi8vZmxhZ3MvI2VuYWJsZS1leHBlcmltZW50YWwtd2ViLXBsYXRmb3JtLWZlYXR1cmVzXHJcblxyXG4gICAgdmFyIHZpZGVvcyA9IFtdO1xyXG4gICAgdmFyIGlzU3RvcERyYXdpbmdGcmFtZXMgPSBmYWxzZTtcclxuXHJcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgY2FudmFzLnN0eWxlID0gJ29wYWNpdHk6MDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4Oi0xO3RvcDogLTEwMDAwMDAwMDtsZWZ0Oi0xMDAwMDAwMDAwOyBtYXJnaW4tdG9wOi0xMDAwMDAwMDAwO21hcmdpbi1sZWZ0Oi0xMDAwMDAwMDAwOyc7XHJcbiAgICAoZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpLmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcblxyXG4gICAgdGhpcy5kaXNhYmxlTG9ncyA9IGZhbHNlO1xyXG4gICAgdGhpcy5mcmFtZUludGVydmFsID0gMTA7XHJcblxyXG4gICAgdGhpcy53aWR0aCA9IDM2MDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gMjQwO1xyXG5cclxuICAgIC8vIHVzZSBnYWluIG5vZGUgdG8gcHJldmVudCBlY2hvXHJcbiAgICB0aGlzLnVzZUdhaW5Ob2RlID0gdHJ1ZTtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgLy8gX19fX19fX19fX19fX19fX19fX19fX19fX19fX19cclxuICAgIC8vIENyb3NzLUJyb3dzZXItRGVjbGFyYXRpb25zLmpzXHJcblxyXG4gICAgLy8gV2ViQXVkaW8gQVBJIHJlcHJlc2VudGVyXHJcbiAgICB2YXIgQXVkaW9Db250ZXh0ID0gd2luZG93LkF1ZGlvQ29udGV4dDtcclxuXHJcbiAgICBpZiAodHlwZW9mIEF1ZGlvQ29udGV4dCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHdlYmtpdEF1ZGlvQ29udGV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgLypnbG9iYWwgQXVkaW9Db250ZXh0OnRydWUgKi9cclxuICAgICAgICAgICAgQXVkaW9Db250ZXh0ID0gd2Via2l0QXVkaW9Db250ZXh0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBtb3pBdWRpb0NvbnRleHQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIC8qZ2xvYmFsIEF1ZGlvQ29udGV4dDp0cnVlICovXHJcbiAgICAgICAgICAgIEF1ZGlvQ29udGV4dCA9IG1vekF1ZGlvQ29udGV4dDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLypqc2hpbnQgLVcwNzkgKi9cclxuICAgIHZhciBVUkwgPSB3aW5kb3cuVVJMO1xyXG5cclxuICAgIGlmICh0eXBlb2YgVVJMID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2Via2l0VVJMICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIC8qZ2xvYmFsIFVSTDp0cnVlICovXHJcbiAgICAgICAgVVJMID0gd2Via2l0VVJMO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbmF2aWdhdG9yLmdldFVzZXJNZWRpYSA9PT0gJ3VuZGVmaW5lZCcpIHsgLy8gbWF5YmUgd2luZG93Lm5hdmlnYXRvcj9cclxuICAgICAgICBpZiAodHlwZW9mIG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5nZXRVc2VyTWVkaWEgPSBuYXZpZ2F0b3Iud2Via2l0R2V0VXNlck1lZGlhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IubW96R2V0VXNlck1lZGlhICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICBuYXZpZ2F0b3IuZ2V0VXNlck1lZGlhID0gbmF2aWdhdG9yLm1vekdldFVzZXJNZWRpYTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIE1lZGlhU3RyZWFtID0gd2luZG93Lk1lZGlhU3RyZWFtO1xyXG5cclxuICAgIGlmICh0eXBlb2YgTWVkaWFTdHJlYW0gPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3ZWJraXRNZWRpYVN0cmVhbSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBNZWRpYVN0cmVhbSA9IHdlYmtpdE1lZGlhU3RyZWFtO1xyXG4gICAgfVxyXG5cclxuICAgIC8qZ2xvYmFsIE1lZGlhU3RyZWFtOnRydWUgKi9cclxuICAgIGlmICh0eXBlb2YgTWVkaWFTdHJlYW0gIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgaWYgKCEoJ2dldFZpZGVvVHJhY2tzJyBpbiBNZWRpYVN0cmVhbS5wcm90b3R5cGUpKSB7XHJcbiAgICAgICAgICAgIE1lZGlhU3RyZWFtLnByb3RvdHlwZS5nZXRWaWRlb1RyYWNrcyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmdldFRyYWNrcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdHJhY2tzID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRyYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYWNrLmtpbmQudG9TdHJpbmcoKS5pbmRleE9mKCd2aWRlbycpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFja3MucHVzaCh0cmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhY2tzO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgTWVkaWFTdHJlYW0ucHJvdG90eXBlLmdldEF1ZGlvVHJhY2tzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZ2V0VHJhY2tzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHZhciB0cmFja3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0VHJhY2tzLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJhY2sua2luZC50b1N0cmluZygpLmluZGV4T2YoJ2F1ZGlvJykgIT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNrcy5wdXNoKHRyYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFja3M7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBvdmVycmlkZSBcInN0b3BcIiBtZXRob2QgZm9yIGFsbCBicm93c2Vyc1xyXG4gICAgICAgIGlmICh0eXBlb2YgTWVkaWFTdHJlYW0ucHJvdG90eXBlLnN0b3AgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIE1lZGlhU3RyZWFtLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFjay5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIFN0b3JhZ2UgPSB7fTtcclxuXHJcbiAgICBpZiAodHlwZW9mIEF1ZGlvQ29udGV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBTdG9yYWdlLkF1ZGlvQ29udGV4dCA9IEF1ZGlvQ29udGV4dDtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHdlYmtpdEF1ZGlvQ29udGV4dCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBTdG9yYWdlLkF1ZGlvQ29udGV4dCA9IHdlYmtpdEF1ZGlvQ29udGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRTcmNPYmplY3Qoc3RyZWFtLCBlbGVtZW50LCBpZ25vcmVDcmVhdGVPYmplY3RVUkwpIHtcclxuICAgICAgICBpZiAoJ2NyZWF0ZU9iamVjdFVSTCcgaW4gVVJMICYmICFpZ25vcmVDcmVhdGVPYmplY3RVUkwpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRTcmNPYmplY3Qoc3RyZWFtLCBlbGVtZW50LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoJ3NyY09iamVjdCcgaW4gZWxlbWVudCkge1xyXG4gICAgICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcclxuICAgICAgICB9IGVsc2UgaWYgKCdtb3pTcmNPYmplY3QnIGluIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5tb3pTcmNPYmplY3QgPSBzdHJlYW07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWxlcnQoJ2NyZWF0ZU9iamVjdFVSTC9zcmNPYmplY3QgYm90aCBhcmUgbm90IHN1cHBvcnRlZC4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdGFydERyYXdpbmdGcmFtZXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBkcmF3VmlkZW9zVG9DYW52YXMoKTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gZHJhd1ZpZGVvc1RvQ2FudmFzKCkge1xyXG4gICAgICAgIGlmIChpc1N0b3BEcmF3aW5nRnJhbWVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB2aWRlb3NMZW5ndGggPSB2aWRlb3MubGVuZ3RoO1xyXG5cclxuICAgICAgICB2YXIgZnVsbGNhbnZhcyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciByZW1haW5pbmcgPSBbXTtcclxuICAgICAgICB2aWRlb3MuZm9yRWFjaChmdW5jdGlvbih2aWRlbykge1xyXG4gICAgICAgICAgICBpZiAoIXZpZGVvLnN0cmVhbSkge1xyXG4gICAgICAgICAgICAgICAgdmlkZW8uc3RyZWFtID0ge307XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh2aWRlby5zdHJlYW0uZnVsbGNhbnZhcykge1xyXG4gICAgICAgICAgICAgICAgZnVsbGNhbnZhcyA9IHZpZGVvO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVtYWluaW5nLnB1c2godmlkZW8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChmdWxsY2FudmFzKSB7XHJcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGZ1bGxjYW52YXMuc3RyZWFtLndpZHRoO1xyXG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gZnVsbGNhbnZhcy5zdHJlYW0uaGVpZ2h0O1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVtYWluaW5nLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSB2aWRlb3NMZW5ndGggPiAxID8gcmVtYWluaW5nWzBdLndpZHRoICogMiA6IHJlbWFpbmluZ1swXS53aWR0aDtcclxuXHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQgPSAxO1xyXG4gICAgICAgICAgICBpZiAodmlkZW9zTGVuZ3RoID09PSAzIHx8IHZpZGVvc0xlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmlkZW9zTGVuZ3RoID09PSA1IHx8IHZpZGVvc0xlbmd0aCA9PT0gNikge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gMztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmlkZW9zTGVuZ3RoID09PSA3IHx8IHZpZGVvc0xlbmd0aCA9PT0gOCkge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0ID0gNDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodmlkZW9zTGVuZ3RoID09PSA5IHx8IHZpZGVvc0xlbmd0aCA9PT0gMTApIHtcclxuICAgICAgICAgICAgICAgIGhlaWdodCA9IDU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IHJlbWFpbmluZ1swXS5oZWlnaHQgKiBoZWlnaHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gc2VsZi53aWR0aCB8fCAzNjA7XHJcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBzZWxmLmhlaWdodCB8fCAyNDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZnVsbGNhbnZhcyAmJiBmdWxsY2FudmFzIGluc3RhbmNlb2YgSFRNTFZpZGVvRWxlbWVudCkge1xyXG4gICAgICAgICAgICBkcmF3SW1hZ2UoZnVsbGNhbnZhcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZW1haW5pbmcuZm9yRWFjaChmdW5jdGlvbih2aWRlbywgaWR4KSB7XHJcbiAgICAgICAgICAgIGRyYXdJbWFnZSh2aWRlbywgaWR4KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dChkcmF3VmlkZW9zVG9DYW52YXMsIHNlbGYuZnJhbWVJbnRlcnZhbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZHJhd0ltYWdlKHZpZGVvLCBpZHgpIHtcclxuICAgICAgICBpZiAoaXNTdG9wRHJhd2luZ0ZyYW1lcykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgeCA9IDA7XHJcbiAgICAgICAgdmFyIHkgPSAwO1xyXG4gICAgICAgIHZhciB3aWR0aCA9IHZpZGVvLndpZHRoO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSB2aWRlby5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmIChpZHggPT09IDEpIHtcclxuICAgICAgICAgICAgeCA9IHZpZGVvLndpZHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlkeCA9PT0gMikge1xyXG4gICAgICAgICAgICB5ID0gdmlkZW8uaGVpZ2h0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlkeCA9PT0gMykge1xyXG4gICAgICAgICAgICB4ID0gdmlkZW8ud2lkdGg7XHJcbiAgICAgICAgICAgIHkgPSB2aWRlby5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaWR4ID09PSA0KSB7XHJcbiAgICAgICAgICAgIHkgPSB2aWRlby5oZWlnaHQgKiAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlkeCA9PT0gNSkge1xyXG4gICAgICAgICAgICB4ID0gdmlkZW8ud2lkdGg7XHJcbiAgICAgICAgICAgIHkgPSB2aWRlby5oZWlnaHQgKiAyO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGlkeCA9PT0gNikge1xyXG4gICAgICAgICAgICB5ID0gdmlkZW8uaGVpZ2h0ICogMztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpZHggPT09IDcpIHtcclxuICAgICAgICAgICAgeCA9IHZpZGVvLndpZHRoO1xyXG4gICAgICAgICAgICB5ID0gdmlkZW8uaGVpZ2h0ICogMztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdmlkZW8uc3RyZWFtLmxlZnQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHggPSB2aWRlby5zdHJlYW0ubGVmdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdmlkZW8uc3RyZWFtLnRvcCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgeSA9IHZpZGVvLnN0cmVhbS50b3A7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHZpZGVvLnN0cmVhbS53aWR0aCAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgd2lkdGggPSB2aWRlby5zdHJlYW0ud2lkdGg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHZpZGVvLnN0cmVhbS5oZWlnaHQgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IHZpZGVvLnN0cmVhbS5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh2aWRlbywgeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdmlkZW8uc3RyZWFtLm9uUmVuZGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnN0cmVhbS5vblJlbmRlcihjb250ZXh0LCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBpZHgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRNaXhlZFN0cmVhbSgpIHtcclxuICAgICAgICBpc1N0b3BEcmF3aW5nRnJhbWVzID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIG1peGVkVmlkZW9TdHJlYW0gPSBnZXRNaXhlZFZpZGVvU3RyZWFtKCk7XHJcblxyXG4gICAgICAgIHZhciBtaXhlZEF1ZGlvU3RyZWFtID0gZ2V0TWl4ZWRBdWRpb1N0cmVhbSgpO1xyXG4gICAgICAgIGlmIChtaXhlZEF1ZGlvU3RyZWFtKSB7XHJcbiAgICAgICAgICAgIG1peGVkQXVkaW9TdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBtaXhlZFZpZGVvU3RyZWFtLmFkZFRyYWNrKHRyYWNrKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZnVsbGNhbnZhcztcclxuICAgICAgICBhcnJheU9mTWVkaWFTdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIGlmIChzdHJlYW0uZnVsbGNhbnZhcykge1xyXG4gICAgICAgICAgICAgICAgZnVsbGNhbnZhcyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1peGVkVmlkZW9TdHJlYW07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TWl4ZWRWaWRlb1N0cmVhbSgpIHtcclxuICAgICAgICByZXNldFZpZGVvU3RyZWFtcygpO1xyXG5cclxuICAgICAgICB2YXIgY2FwdHVyZWRTdHJlYW07XHJcblxyXG4gICAgICAgIGlmICgnY2FwdHVyZVN0cmVhbScgaW4gY2FudmFzKSB7XHJcbiAgICAgICAgICAgIGNhcHR1cmVkU3RyZWFtID0gY2FudmFzLmNhcHR1cmVTdHJlYW0oKTtcclxuICAgICAgICB9IGVsc2UgaWYgKCdtb3pDYXB0dXJlU3RyZWFtJyBpbiBjYW52YXMpIHtcclxuICAgICAgICAgICAgY2FwdHVyZWRTdHJlYW0gPSBjYW52YXMubW96Q2FwdHVyZVN0cmVhbSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoIXNlbGYuZGlzYWJsZUxvZ3MpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignVXBncmFkZSB0byBsYXRlc3QgQ2hyb21lIG9yIG90aGVyd2lzZSBlbmFibGUgdGhpcyBmbGFnOiBjaHJvbWU6Ly9mbGFncy8jZW5hYmxlLWV4cGVyaW1lbnRhbC13ZWItcGxhdGZvcm0tZmVhdHVyZXMnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciB2aWRlb1N0cmVhbSA9IG5ldyBNZWRpYVN0cmVhbSgpO1xyXG5cclxuICAgICAgICBjYXB0dXJlZFN0cmVhbS5nZXRWaWRlb1RyYWNrcygpLmZvckVhY2goZnVuY3Rpb24odHJhY2spIHtcclxuICAgICAgICAgICAgdmlkZW9TdHJlYW0uYWRkVHJhY2sodHJhY2spO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjYW52YXMuc3RyZWFtID0gdmlkZW9TdHJlYW07XHJcblxyXG4gICAgICAgIHJldHVybiB2aWRlb1N0cmVhbTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRNaXhlZEF1ZGlvU3RyZWFtKCkge1xyXG4gICAgICAgIC8vIHZpYTogQHBlaHJzb25zXHJcbiAgICAgICAgaWYgKCFTdG9yYWdlLkF1ZGlvQ29udGV4dENvbnN0cnVjdG9yKSB7XHJcbiAgICAgICAgICAgIFN0b3JhZ2UuQXVkaW9Db250ZXh0Q29uc3RydWN0b3IgPSBuZXcgU3RvcmFnZS5BdWRpb0NvbnRleHQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuYXVkaW9Db250ZXh0ID0gU3RvcmFnZS5BdWRpb0NvbnRleHRDb25zdHJ1Y3RvcjtcclxuXHJcbiAgICAgICAgc2VsZi5hdWRpb1NvdXJjZXMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGYudXNlR2Fpbk5vZGUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgc2VsZi5nYWluTm9kZSA9IHNlbGYuYXVkaW9Db250ZXh0LmNyZWF0ZUdhaW4oKTtcclxuICAgICAgICAgICAgc2VsZi5nYWluTm9kZS5jb25uZWN0KHNlbGYuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgc2VsZi5nYWluTm9kZS5nYWluLnZhbHVlID0gMDsgLy8gZG9uJ3QgaGVhciBzZWxmXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgYXVkaW9UcmFja3NMZW5ndGggPSAwO1xyXG4gICAgICAgIGFycmF5T2ZNZWRpYVN0cmVhbXMuZm9yRWFjaChmdW5jdGlvbihzdHJlYW0pIHtcclxuICAgICAgICAgICAgaWYgKCFzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXVkaW9UcmFja3NMZW5ndGgrKztcclxuXHJcbiAgICAgICAgICAgIHZhciBhdWRpb1NvdXJjZSA9IHNlbGYuYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2VsZi51c2VHYWluTm9kZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgYXVkaW9Tb3VyY2UuY29ubmVjdChzZWxmLmdhaW5Ob2RlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZi5hdWRpb1NvdXJjZXMucHVzaChhdWRpb1NvdXJjZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICghYXVkaW9UcmFja3NMZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5hdWRpb0Rlc3RpbmF0aW9uID0gc2VsZi5hdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1EZXN0aW5hdGlvbigpO1xyXG4gICAgICAgIHNlbGYuYXVkaW9Tb3VyY2VzLmZvckVhY2goZnVuY3Rpb24oYXVkaW9Tb3VyY2UpIHtcclxuICAgICAgICAgICAgYXVkaW9Tb3VyY2UuY29ubmVjdChzZWxmLmF1ZGlvRGVzdGluYXRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzZWxmLmF1ZGlvRGVzdGluYXRpb24uc3RyZWFtO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFZpZGVvKHN0cmVhbSkge1xyXG4gICAgICAgIHZhciB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcblxyXG4gICAgICAgIHNldFNyY09iamVjdChzdHJlYW0sIHZpZGVvKTtcclxuXHJcbiAgICAgICAgdmlkZW8ubXV0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHZpZGVvLnZvbHVtZSA9IDA7XHJcblxyXG4gICAgICAgIHZpZGVvLndpZHRoID0gc3RyZWFtLndpZHRoIHx8IHNlbGYud2lkdGggfHwgMzYwO1xyXG4gICAgICAgIHZpZGVvLmhlaWdodCA9IHN0cmVhbS5oZWlnaHQgfHwgc2VsZi5oZWlnaHQgfHwgMjQwO1xyXG5cclxuICAgICAgICB2aWRlby5wbGF5KCk7XHJcblxyXG4gICAgICAgIHJldHVybiB2aWRlbztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFwcGVuZFN0cmVhbXMgPSBmdW5jdGlvbihzdHJlYW1zKSB7XHJcbiAgICAgICAgaWYgKCFzdHJlYW1zKSB7XHJcbiAgICAgICAgICAgIHRocm93ICdGaXJzdCBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQuJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghKHN0cmVhbXMgaW5zdGFuY2VvZiBBcnJheSkpIHtcclxuICAgICAgICAgICAgc3RyZWFtcyA9IFtzdHJlYW1zXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFycmF5T2ZNZWRpYVN0cmVhbXMuY29uY2F0KHN0cmVhbXMpO1xyXG5cclxuICAgICAgICBzdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIGlmIChzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHZhciB2aWRlbyA9IGdldFZpZGVvKHN0cmVhbSk7XHJcbiAgICAgICAgICAgICAgICB2aWRlby5zdHJlYW0gPSBzdHJlYW07XHJcbiAgICAgICAgICAgICAgICB2aWRlb3MucHVzaCh2aWRlbyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5sZW5ndGggJiYgc2VsZi5hdWRpb0NvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdWRpb1NvdXJjZSA9IHNlbGYuYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XHJcbiAgICAgICAgICAgICAgICBhdWRpb1NvdXJjZS5jb25uZWN0KHNlbGYuYXVkaW9EZXN0aW5hdGlvbik7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmF1ZGlvU291cmNlcy5wdXNoKGF1ZGlvU291cmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJlbGVhc2VTdHJlYW1zID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmlkZW9zID0gW107XHJcbiAgICAgICAgaXNTdG9wRHJhd2luZ0ZyYW1lcyA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmIChzZWxmLmdhaW5Ob2RlKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZ2Fpbk5vZGUuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICBzZWxmLmdhaW5Ob2RlID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzZWxmLmF1ZGlvU291cmNlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2VsZi5hdWRpb1NvdXJjZXMuZm9yRWFjaChmdW5jdGlvbihzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIHNvdXJjZS5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzZWxmLmF1ZGlvU291cmNlcyA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlbGYuYXVkaW9EZXN0aW5hdGlvbikge1xyXG4gICAgICAgICAgICBzZWxmLmF1ZGlvRGVzdGluYXRpb24uZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICBzZWxmLmF1ZGlvRGVzdGluYXRpb24gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlbGYuYXVkaW9Db250ZXh0KSB7XHJcbiAgICAgICAgICAgIHNlbGYuYXVkaW9Db250ZXh0LmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLmF1ZGlvQ29udGV4dCA9IG51bGw7XHJcblxyXG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblxyXG4gICAgICAgIGlmIChjYW52YXMuc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIGNhbnZhcy5zdHJlYW0uc3RvcCgpO1xyXG4gICAgICAgICAgICBjYW52YXMuc3RyZWFtID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVzZXRWaWRlb1N0cmVhbXMgPSBmdW5jdGlvbihzdHJlYW1zKSB7XHJcbiAgICAgICAgaWYgKHN0cmVhbXMgJiYgIShzdHJlYW1zIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgICAgICAgIHN0cmVhbXMgPSBbc3RyZWFtc107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXNldFZpZGVvU3RyZWFtcyhzdHJlYW1zKTtcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzZXRWaWRlb1N0cmVhbXMoc3RyZWFtcykge1xyXG4gICAgICAgIHZpZGVvcyA9IFtdO1xyXG4gICAgICAgIHN0cmVhbXMgPSBzdHJlYW1zIHx8IGFycmF5T2ZNZWRpYVN0cmVhbXM7XHJcblxyXG4gICAgICAgIC8vIHZpYTogQGFkcmlhbi1iZXJcclxuICAgICAgICBzdHJlYW1zLmZvckVhY2goZnVuY3Rpb24oc3RyZWFtKSB7XHJcbiAgICAgICAgICAgIGlmICghc3RyZWFtLmdldFZpZGVvVHJhY2tzKCkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciB2aWRlbyA9IGdldFZpZGVvKHN0cmVhbSk7XHJcbiAgICAgICAgICAgIHZpZGVvLnN0cmVhbSA9IHN0cmVhbTtcclxuICAgICAgICAgICAgdmlkZW9zLnB1c2godmlkZW8pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGZvciBkZWJ1Z2dpbmdcclxuICAgIHRoaXMubmFtZSA9ICdNdWx0aVN0cmVhbXNNaXhlcic7XHJcbiAgICB0aGlzLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5nZXRNaXhlZFN0cmVhbSA9IGdldE1peGVkU3RyZWFtO1xyXG5cclxufVxuXHJcbi8vIF9fX19fX19fX19fX19fX19fX19fX19cclxuLy8gTXVsdGlTdHJlYW1SZWNvcmRlci5qc1xyXG5cclxuLypcclxuICogVmlkZW8gY29uZmVyZW5jZSByZWNvcmRpbmcsIHVzaW5nIGNhcHR1cmVTdHJlYW0gQVBJIGFsb25nIHdpdGggV2ViQXVkaW8gYW5kIENhbnZhczJEIEFQSS5cclxuICovXHJcblxyXG4vKipcclxuICogTXVsdGlTdHJlYW1SZWNvcmRlciBjYW4gcmVjb3JkIG11bHRpcGxlIHZpZGVvcyBpbiBzaW5nbGUgY29udGFpbmVyLlxyXG4gKiBAc3VtbWFyeSBNdWx0aS12aWRlb3MgcmVjb3JkZXIuXHJcbiAqIEBsaWNlbnNlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbXVhei1raGFuL1JlY29yZFJUQyNsaWNlbnNlfE1JVH1cclxuICogQGF1dGhvciB7QGxpbmsgaHR0cDovL3d3dy5NdWF6S2hhbi5jb218TXVheiBLaGFufVxyXG4gKiBAdHlwZWRlZiBNdWx0aVN0cmVhbVJlY29yZGVyXHJcbiAqIEBjbGFzc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgb3B0aW9ucyA9IHtcclxuICogICAgIG1pbWVUeXBlOiAndmlkZW8vd2VibSdcclxuICogfVxyXG4gKiB2YXIgcmVjb3JkZXIgPSBuZXcgTXVsdGlTdHJlYW1SZWNvcmRlcihBcnJheU9mTWVkaWFTdHJlYW1zLCBvcHRpb25zKTtcclxuICogcmVjb3JkZXIucmVjb3JkKCk7XHJcbiAqIHJlY29yZGVyLnN0b3AoZnVuY3Rpb24oYmxvYikge1xyXG4gKiAgICAgdmlkZW8uc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICpcclxuICogICAgIC8vIG9yXHJcbiAqICAgICB2YXIgYmxvYiA9IHJlY29yZGVyLmJsb2I7XHJcbiAqIH0pO1xyXG4gKiBAc2VlIHtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbXVhei1raGFuL1JlY29yZFJUQ3xSZWNvcmRSVEMgU291cmNlIENvZGV9XHJcbiAqIEBwYXJhbSB7TWVkaWFTdHJlYW1zfSBtZWRpYVN0cmVhbXMgLSBBcnJheSBvZiBNZWRpYVN0cmVhbXMuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgLSB7ZGlzYWJsZUxvZ3M6dHJ1ZSwgZnJhbWVJbnRlcnZhbDogMSwgbWltZVR5cGU6IFwidmlkZW8vd2VibVwifVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIE11bHRpU3RyZWFtUmVjb3JkZXIoYXJyYXlPZk1lZGlhU3RyZWFtcywgb3B0aW9ucykge1xyXG4gICAgYXJyYXlPZk1lZGlhU3RyZWFtcyA9IGFycmF5T2ZNZWRpYVN0cmVhbXMgfHwgW107XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgdmFyIG1peGVyO1xyXG4gICAgdmFyIG1lZGlhUmVjb3JkZXI7XHJcblxyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge1xyXG4gICAgICAgIG1pbWVUeXBlOiAndmlkZW8vd2VibScsXHJcbiAgICAgICAgdmlkZW86IHtcclxuICAgICAgICAgICAgd2lkdGg6IDM2MCxcclxuICAgICAgICAgICAgaGVpZ2h0OiAyNDBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghb3B0aW9ucy5mcmFtZUludGVydmFsKSB7XHJcbiAgICAgICAgb3B0aW9ucy5mcmFtZUludGVydmFsID0gMTA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFvcHRpb25zLnZpZGVvKSB7XHJcbiAgICAgICAgb3B0aW9ucy52aWRlbyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghb3B0aW9ucy52aWRlby53aWR0aCkge1xyXG4gICAgICAgIG9wdGlvbnMudmlkZW8ud2lkdGggPSAzNjA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFvcHRpb25zLnZpZGVvLmhlaWdodCkge1xyXG4gICAgICAgIG9wdGlvbnMudmlkZW8uaGVpZ2h0ID0gMjQwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgcmVjb3JkcyBhbGwgTWVkaWFTdHJlYW1zLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE11bHRpU3RyZWFtUmVjb3JkZXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5yZWNvcmQoKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5yZWNvcmQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBnaXRodWIvbXVhei1raGFuL011bHRpU3RyZWFtc01peGVyXHJcbiAgICAgICAgbWl4ZXIgPSBuZXcgTXVsdGlTdHJlYW1zTWl4ZXIoYXJyYXlPZk1lZGlhU3RyZWFtcyk7XHJcblxyXG4gICAgICAgIGlmIChnZXRWaWRlb1RyYWNrcygpLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBtaXhlci5mcmFtZUludGVydmFsID0gb3B0aW9ucy5mcmFtZUludGVydmFsIHx8IDEwO1xyXG4gICAgICAgICAgICBtaXhlci53aWR0aCA9IG9wdGlvbnMudmlkZW8ud2lkdGggfHwgMzYwO1xyXG4gICAgICAgICAgICBtaXhlci5oZWlnaHQgPSBvcHRpb25zLnZpZGVvLmhlaWdodCB8fCAyNDA7XHJcbiAgICAgICAgICAgIG1peGVyLnN0YXJ0RHJhd2luZ0ZyYW1lcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMucHJldmlld1N0cmVhbSAmJiB0eXBlb2Ygb3B0aW9ucy5wcmV2aWV3U3RyZWFtID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMucHJldmlld1N0cmVhbShtaXhlci5nZXRNaXhlZFN0cmVhbSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlY29yZCB1c2luZyBNZWRpYVJlY29yZGVyIEFQSVxyXG4gICAgICAgIG1lZGlhUmVjb3JkZXIgPSBuZXcgTWVkaWFTdHJlYW1SZWNvcmRlcihtaXhlci5nZXRNaXhlZFN0cmVhbSgpLCBvcHRpb25zKTtcclxuICAgICAgICBtZWRpYVJlY29yZGVyLnJlY29yZCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRWaWRlb1RyYWNrcygpIHtcclxuICAgICAgICB2YXIgdHJhY2tzID0gW107XHJcbiAgICAgICAgYXJyYXlPZk1lZGlhU3RyZWFtcy5mb3JFYWNoKGZ1bmN0aW9uKHN0cmVhbSkge1xyXG4gICAgICAgICAgICBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uKHRyYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFja3MucHVzaCh0cmFjayk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0cmFja3M7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIG1ldGhvZCBzdG9wcyByZWNvcmRpbmcgTWVkaWFTdHJlYW0uXHJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIENhbGxiYWNrIGZ1bmN0aW9uLCB0aGF0IGlzIHVzZWQgdG8gcGFzcyByZWNvcmRlZCBibG9iIGJhY2sgdG8gdGhlIGNhbGxlZS5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBNdWx0aVN0cmVhbVJlY29yZGVyXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIuc3RvcChmdW5jdGlvbihibG9iKSB7XHJcbiAgICAgKiAgICAgdmlkZW8uc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgICAqIH0pO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnN0b3AgPSBmdW5jdGlvbihjYWxsYmFjaykge1xyXG4gICAgICAgIGlmICghbWVkaWFSZWNvcmRlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZWRpYVJlY29yZGVyLnN0b3AoZnVuY3Rpb24oYmxvYikge1xyXG4gICAgICAgICAgICBzZWxmLmJsb2IgPSBibG9iO1xyXG5cclxuICAgICAgICAgICAgY2FsbGJhY2soYmxvYik7XHJcblxyXG4gICAgICAgICAgICBzZWxmLmNsZWFyUmVjb3JkZWREYXRhKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgcGF1c2VzIHRoZSByZWNvcmRpbmcgcHJvY2Vzcy5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBNdWx0aVN0cmVhbVJlY29yZGVyXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIucGF1c2UoKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5wYXVzZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChtZWRpYVJlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIG1lZGlhUmVjb3JkZXIucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgcmVzdW1lcyB0aGUgcmVjb3JkaW5nIHByb2Nlc3MuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgTXVsdGlTdHJlYW1SZWNvcmRlclxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHJlY29yZGVyLnJlc3VtZSgpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnJlc3VtZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChtZWRpYVJlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIG1lZGlhUmVjb3JkZXIucmVzdW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHJlc2V0cyBjdXJyZW50bHkgcmVjb3JkZWQgZGF0YS5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBNdWx0aVN0cmVhbVJlY29yZGVyXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIuY2xlYXJSZWNvcmRlZERhdGEoKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5jbGVhclJlY29yZGVkRGF0YSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmIChtZWRpYVJlY29yZGVyKSB7XHJcbiAgICAgICAgICAgIG1lZGlhUmVjb3JkZXIuY2xlYXJSZWNvcmRlZERhdGEoKTtcclxuICAgICAgICAgICAgbWVkaWFSZWNvcmRlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobWl4ZXIpIHtcclxuICAgICAgICAgICAgbWl4ZXIucmVsZWFzZVN0cmVhbXMoKTtcclxuICAgICAgICAgICAgbWl4ZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgZXh0cmEgbWVkaWEtc3RyZWFtcyB0byBleGlzdGluZyByZWNvcmRpbmdzLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE11bHRpU3RyZWFtUmVjb3JkZXJcclxuICAgICAqIEBwYXJhbSB7TWVkaWFTdHJlYW1zfSBtZWRpYVN0cmVhbXMgLSBBcnJheSBvZiBNZWRpYVN0cmVhbXNcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5hZGRTdHJlYW1zKFtuZXdBdWRpb1N0cmVhbSwgbmV3VmlkZW9TdHJlYW1dKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5hZGRTdHJlYW1zID0gZnVuY3Rpb24oc3RyZWFtcykge1xyXG4gICAgICAgIGlmICghc3RyZWFtcykge1xyXG4gICAgICAgICAgICB0aHJvdyAnRmlyc3QgcGFyYW1ldGVyIGlzIHJlcXVpcmVkLic7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIShzdHJlYW1zIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgICAgICAgIHN0cmVhbXMgPSBbc3RyZWFtc107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhcnJheU9mTWVkaWFTdHJlYW1zLmNvbmNhdChzdHJlYW1zKTtcclxuXHJcbiAgICAgICAgaWYgKCFtZWRpYVJlY29yZGVyIHx8ICFtaXhlcikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtaXhlci5hcHBlbmRTdHJlYW1zKHN0cmVhbXMpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlc2V0IHZpZGVvcyBkdXJpbmcgbGl2ZSByZWNvcmRpbmcuIFJlcGxhY2Ugb2xkIHZpZGVvcyBlLmcuIHJlcGxhY2UgY2FtZXJhcyB3aXRoIGZ1bGwtc2NyZWVuLlxyXG4gICAgICogQG1ldGhvZFxyXG4gICAgICogQG1lbWJlcm9mIE11bHRpU3RyZWFtUmVjb3JkZXJcclxuICAgICAqIEBwYXJhbSB7TWVkaWFTdHJlYW1zfSBtZWRpYVN0cmVhbXMgLSBBcnJheSBvZiBNZWRpYVN0cmVhbXNcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5yZXNldFZpZGVvU3RyZWFtcyhbbmV3VmlkZW8xLCBuZXdWaWRlbzJdKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5yZXNldFZpZGVvU3RyZWFtcyA9IGZ1bmN0aW9uKHN0cmVhbXMpIHtcclxuICAgICAgICBpZiAoIW1peGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzdHJlYW1zICYmICEoc3RyZWFtcyBpbnN0YW5jZW9mIEFycmF5KSkge1xyXG4gICAgICAgICAgICBzdHJlYW1zID0gW3N0cmVhbXNdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWl4ZXIucmVzZXRWaWRlb1N0cmVhbXMoc3RyZWFtcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGZvciBkZWJ1Z2dpbmdcclxuICAgIHRoaXMubmFtZSA9ICdNdWx0aVN0cmVhbVJlY29yZGVyJztcclxuICAgIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgfTtcclxufVxyXG5cclxuaWYgKHR5cGVvZiBSZWNvcmRSVEMgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBSZWNvcmRSVEMuTXVsdGlTdHJlYW1SZWNvcmRlciA9IE11bHRpU3RyZWFtUmVjb3JkZXI7XHJcbn1cblxyXG4vLyBfX19fX19fX19fX19fX19fX19fX19cclxuLy8gUmVjb3JkUlRDLnByb21pc2VzLmpzXHJcblxyXG4vKipcclxuICogUmVjb3JkUlRDUHJvbWlzZXNIYW5kbGVyIGFkZHMgcHJvbWlzZXMgc3VwcG9ydCBpbiB7QGxpbmsgUmVjb3JkUlRDfS4gVHJ5IGEge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDL2Jsb2IvbWFzdGVyL3NpbXBsZS1kZW1vcy9SZWNvcmRSVENQcm9taXNlc0hhbmRsZXIuaHRtbHxkZW1vIGhlcmV9XHJcbiAqIEBzdW1tYXJ5IFByb21pc2VzIGZvciB7QGxpbmsgUmVjb3JkUlRDfVxyXG4gKiBAbGljZW5zZSB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL211YXota2hhbi9SZWNvcmRSVEMjbGljZW5zZXxNSVR9XHJcbiAqIEBhdXRob3Ige0BsaW5rIGh0dHA6Ly93d3cuTXVhektoYW4uY29tfE11YXogS2hhbn1cclxuICogQHR5cGVkZWYgUmVjb3JkUlRDUHJvbWlzZXNIYW5kbGVyXHJcbiAqIEBjbGFzc1xyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgcmVjb3JkZXIgPSBuZXcgUmVjb3JkUlRDUHJvbWlzZXNIYW5kbGVyKG1lZGlhU3RyZWFtLCBvcHRpb25zKTtcclxuICogcmVjb3JkZXIuc3RhcnRSZWNvcmRpbmcoKVxyXG4gKiAgICAgICAgIC50aGVuKHN1Y2Nlc3NDQilcclxuICogICAgICAgICAuY2F0Y2goZXJyb3JDQik7XHJcbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9tdWF6LWtoYW4vUmVjb3JkUlRDfFJlY29yZFJUQyBTb3VyY2UgQ29kZX1cclxuICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gbWVkaWFTdHJlYW0gLSBTaW5nbGUgbWVkaWEtc3RyZWFtIG9iamVjdCwgYXJyYXkgb2YgbWVkaWEtc3RyZWFtcywgaHRtbC1jYW52YXMtZWxlbWVudCwgZXRjLlxyXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIC0ge3R5cGU6XCJ2aWRlb1wiLCByZWNvcmRlclR5cGU6IE1lZGlhU3RyZWFtUmVjb3JkZXIsIGRpc2FibGVMb2dzOiB0cnVlLCBudW1iZXJPZkF1ZGlvQ2hhbm5lbHM6IDEsIGJ1ZmZlclNpemU6IDAsIHNhbXBsZVJhdGU6IDAsIHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50LCBldGMufVxyXG4gKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgXCJuZXdcIiBrZXl3b3JkIGlzIG5vdCB1c2VkIHRvIGluaXRpYXRlIFwiUmVjb3JkUlRDUHJvbWlzZXNIYW5kbGVyXCIuIEFsc28gdGhyb3dzIGVycm9yIGlmIGZpcnN0IGFyZ3VtZW50IFwiTWVkaWFTdHJlYW1cIiBpcyBtaXNzaW5nLlxyXG4gKiBAcmVxdWlyZXMge0BsaW5rIFJlY29yZFJUQ31cclxuICovXHJcblxyXG5mdW5jdGlvbiBSZWNvcmRSVENQcm9taXNlc0hhbmRsZXIobWVkaWFTdHJlYW0sIG9wdGlvbnMpIHtcclxuICAgIGlmICghdGhpcykge1xyXG4gICAgICAgIHRocm93ICdVc2UgXCJuZXcgUmVjb3JkUlRDUHJvbWlzZXNIYW5kbGVyKClcIic7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHR5cGVvZiBtZWRpYVN0cmVhbSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB0aHJvdyAnRmlyc3QgYXJndW1lbnQgXCJNZWRpYVN0cmVhbVwiIGlzIHJlcXVpcmVkLic7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHByb3BlcnR5IHtCbG9ifSBibG9iIC0gQWNjZXNzL3JlYWNoIHRoZSBuYXRpdmUge0BsaW5rIFJlY29yZFJUQ30gb2JqZWN0LlxyXG4gICAgICogQG1lbWJlcm9mIFJlY29yZFJUQ1Byb21pc2VzSGFuZGxlclxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIHZhciBpbnRlcm5hbCA9IHJlY29yZGVyLnJlY29yZFJUQy5nZXRJbnRlcm5hbFJlY29yZGVyKCk7XHJcbiAgICAgKiBhbGVydChpbnRlcm5hbCBpbnN0YW5jZW9mIE1lZGlhU3RyZWFtUmVjb3JkZXIpO1xyXG4gICAgICovXHJcbiAgICBzZWxmLnJlY29yZFJUQyA9IG5ldyBSZWNvcmRSVEMobWVkaWFTdHJlYW0sIG9wdGlvbnMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgcmVjb3JkcyBNZWRpYVN0cmVhbS5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBSZWNvcmRSVENQcm9taXNlc0hhbmRsZXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5zdGFydFJlY29yZGluZygpXHJcbiAgICAgKiAgICAgICAgIC50aGVuKHN1Y2Nlc3NDQilcclxuICAgICAqICAgICAgICAgLmNhdGNoKGVycm9yQ0IpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnN0YXJ0UmVjb3JkaW5nID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5yZWNvcmRSVEMuc3RhcnRSZWNvcmRpbmcoKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2Qgc3RvcHMgdGhlIHJlY29yZGluZy5cclxuICAgICAqIEBtZXRob2RcclxuICAgICAqIEBtZW1iZXJvZiBSZWNvcmRSVENQcm9taXNlc0hhbmRsZXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5zdG9wUmVjb3JkaW5nKCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAqICAgICB2YXIgYmxvYiA9IHJlY29yZGVyLmdldEJsb2IoKTtcclxuICAgICAqIH0pLmNhdGNoKGVycm9yQ0IpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLnN0b3BSZWNvcmRpbmcgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlY29yZFJUQy5zdG9wUmVjb3JkaW5nKGZ1bmN0aW9uKHVybCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuYmxvYiA9IHNlbGYucmVjb3JkUlRDLmdldEJsb2IoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBtZXRob2QgcmV0dXJucyBkYXRhLXVybCBmb3IgdGhlIHJlY29yZGVkIGJsb2IuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgUmVjb3JkUlRDUHJvbWlzZXNIYW5kbGVyXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIuc3RvcFJlY29yZGluZygpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgKiAgICAgcmVjb3JkZXIuZ2V0RGF0YVVSTCgpLnRoZW4oZnVuY3Rpb24oZGF0YVVSTCkge1xyXG4gICAgICogICAgICAgICB3aW5kb3cub3BlbihkYXRhVVJMKTtcclxuICAgICAqICAgICB9KS5jYXRjaChlcnJvckNCKTs7XHJcbiAgICAgKiB9KS5jYXRjaChlcnJvckNCKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5nZXREYXRhVVJMID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJlY29yZFJUQy5nZXREYXRhVVJMKGZ1bmN0aW9uKGRhdGFVUkwpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRhdGFVUkwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIHJlY29yZGVkIGJsb2IuXHJcbiAgICAgKiBAbWV0aG9kXHJcbiAgICAgKiBAbWVtYmVyb2YgUmVjb3JkUlRDUHJvbWlzZXNIYW5kbGVyXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogcmVjb3JkZXIuc3RvcFJlY29yZGluZygpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgKiAgICAgdmFyIGJsb2IgPSByZWNvcmRlci5nZXRCbG9iKCk7XHJcbiAgICAgKiB9KS5jYXRjaChlcnJvckNCKTtcclxuICAgICAqL1xyXG4gICAgdGhpcy5nZXRCbG9iID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHNlbGYucmVjb3JkUlRDLmdldEJsb2IoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAcHJvcGVydHkge0Jsb2J9IGJsb2IgLSBSZWNvcmRlZCBkYXRhIGFzIFwiQmxvYlwiIG9iamVjdC5cclxuICAgICAqIEBtZW1iZXJvZiBSZWNvcmRSVENQcm9taXNlc0hhbmRsZXJcclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiByZWNvcmRlci5zdG9wUmVjb3JkaW5nKCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAqICAgICB2YXIgYmxvYiA9IHJlY29yZGVyLmdldEJsb2IoKTtcclxuICAgICAqIH0pLmNhdGNoKGVycm9yQ0IpO1xyXG4gICAgICovXHJcbiAgICB0aGlzLmJsb2IgPSBudWxsO1xyXG59XHJcblxyXG5pZiAodHlwZW9mIFJlY29yZFJUQyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIFJlY29yZFJUQy5SZWNvcmRSVENQcm9taXNlc0hhbmRsZXIgPSBSZWNvcmRSVENQcm9taXNlc0hhbmRsZXI7XHJcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlY29yZHJ0Yy9SZWNvcmRSVEMuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBpY2hlY2sgfSBmcm9tIFwiLi9pY2hlY2suanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgc2VsZWN0MiB9IGZyb20gXCIuL3NlbGVjdDIuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgaW5wdXRtYXNrIH0gZnJvbSBcIi4vaW5wdXRtYXNrLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGpxdWVyeWJhcnJhdGluZyB9IGZyb20gXCIuL2pxdWVyeS1iYXItcmF0aW5nLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGpxdWVyeXVpZGF0ZXBpY2tlciB9IGZyb20gXCIuL2pxdWVyeS11aS1kYXRlcGlja2VyLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIG5vdWlzbGlkZXIgfSBmcm9tIFwiLi9ub3Vpc2xpZGVyLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHNlbGVjdDJ0YWdib3ggfSBmcm9tIFwiLi9zZWxlY3QyLXRhZ2JveC5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBzaWduYXR1cmVwYWQgfSBmcm9tIFwiLi9zaWduYXR1cmVfcGFkLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHNvcnRhYmxlanMgfSBmcm9tIFwiLi9zb3J0YWJsZWpzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNrZWRpdG9yIH0gZnJvbSBcIi4vY2stZWRpdG9yLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGF1dG9jb21wbGV0ZSB9IGZyb20gXCIuL2Vhc3ktYXV0b2NvbXBsZXRlLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHByZXR0eWNoZWNrYm94IH0gZnJvbSBcIi4vcHJldHR5LWNoZWNrYm94LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGJvb3RzdHJhcHNsaWRlciB9IGZyb20gXCIuL2Jvb3RzdHJhcC1zbGlkZXIuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgbWljcm9waG9uZSB9IGZyb20gXCIuL21pY3JvcGhvbmUuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZW1vdGlvbnNyYXRpbmdzIH0gZnJvbSBcIi4vZW1vdGlvbnNyYXRpbmdzLmpzXCI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdXJ2ZXlqcy13aWRnZXRzLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBpbml0KFN1cnZleSwgJCkge1xuICAkID0gJCB8fCB3aW5kb3cuJDtcblxuICB2YXIgd2lkZ2V0ID0ge1xuICAgIG5hbWU6IFwiZW1vdGlvbnNyYXRpbmdzXCIsXG4gICAgdGl0bGU6IFwiRW1vdGlvbnMgUmF0aW5nc1wiLFxuICAgIGljb25OYW1lOiBcImljb24tZW1vdGlvbnNyYXRpbmdzXCIsXG4gICAgd2lkZ2V0SXNMb2FkZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiAkID09IFwiZnVuY3Rpb25cIiAmJiAhISQuZm4uZW1vdGlvbnNSYXRpbmc7XG4gICAgfSxcbiAgICBkZWZhdWx0SlNPTjoge1xuICAgICAgY2hvaWNlczogWzEsIDIsIDMsIDQsIDVdXG4gICAgfSxcbiAgICBpc0ZpdDogZnVuY3Rpb24ocXVlc3Rpb24pIHtcbiAgICAgIHJldHVybiBxdWVzdGlvbi5nZXRUeXBlKCkgPT09IFwiZW1vdGlvbnNyYXRpbmdzXCI7XG4gICAgfSxcbiAgICBpc0RlZmF1bHRSZW5kZXI6IGZhbHNlLFxuICAgIGh0bWxUZW1wbGF0ZTogXCI8ZGl2PjwvZGl2PlwiLFxuICAgIGFjdGl2YXRlZEJ5Q2hhbmdlZDogZnVuY3Rpb24oYWN0aXZhdGVkQnkpIHtcbiAgICAgIFN1cnZleS5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFxuICAgICAgICBcImVtb3Rpb25zcmF0aW5nc1wiLFxuICAgICAgICBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJoYXNPdGhlclwiLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwib3RoZXJUZXh0XCIsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJvcHRpb25zQ2FwdGlvblwiLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwib3RoZXJFcnJvclRleHRcIixcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcInN0b3JlT3RoZXJzQXNDb21tZW50XCIsXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJyZW5kZXJBc1wiLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIG51bGwsXG4gICAgICAgIFwiZHJvcGRvd25cIlxuICAgICAgKTtcbiAgICB9LFxuICAgIGFmdGVyUmVuZGVyOiBmdW5jdGlvbihxdWVzdGlvbiwgZWwpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBlbW90aW9uc0FycmF5ID0gW1wiYW5ncnlcIiwgXCJkaXNhcHBvaW50ZWRcIiwgXCJtZWhcIiwgXCJoYXBweVwiLCBcImluTG92ZVwiXTtcbiAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICBlbW90aW9uU2l6ZTogMzAsXG4gICAgICAgIGJnRW1vdGlvbjogXCJoYXBweVwiLFxuICAgICAgICBlbW90aW9uczogZW1vdGlvbnNBcnJheSxcbiAgICAgICAgY29sb3I6IFwiI0ZGMDA2NlwiLFxuICAgICAgICBvblVwZGF0ZTogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICBxdWVzdGlvbi52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaW5pdFdpZGdldCgpO1xuXG4gICAgICBxdWVzdGlvbi52YWx1ZUNoYW5nZWRDYWxsYmFjayA9IGluaXRXaWRnZXQ7XG4gICAgICBxdWVzdGlvbi5yZWFkT25seUNoYW5nZWRDYWxsYmFjayA9IGluaXRXaWRnZXQ7XG5cbiAgICAgIGZ1bmN0aW9uIGluaXRXaWRnZXQoKSB7XG4gICAgICAgIGVsLmlubmVySFRNTCA9IFwiPGRpdj48L2Rpdj5cIjtcbiAgICAgICAgJChlbCkub2ZmKCk7XG4gICAgICAgIG9wdGlvbnMuaW5pdGlhbFJhdGluZyA9IHF1ZXN0aW9uLnZhbHVlIHx8IDA7XG4gICAgICAgIG9wdGlvbnMuZGlzYWJsZWQgPSBxdWVzdGlvbi5pc1JlYWRPbmx5O1xuICAgICAgICAkKGVsKVxuICAgICAgICAgIC5maW5kKFwiZGl2XCIpXG4gICAgICAgICAgLmVtb3Rpb25zUmF0aW5nKG9wdGlvbnMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgd2lsbFVubW91bnQ6IGZ1bmN0aW9uKHF1ZXN0aW9uLCBlbCkge1xuICAgICAgZWwuaW5uZXJIVE1MID0gbnVsbDtcbiAgICAgICQoZWwpLm9mZigpO1xuICAgICAgcXVlc3Rpb24ucmVhZE9ubHlDaGFuZ2VkQ2FsbGJhY2sgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICBTdXJ2ZXkuQ3VzdG9tV2lkZ2V0Q29sbGVjdGlvbi5JbnN0YW5jZS5hZGRDdXN0b21XaWRnZXQod2lkZ2V0LCBcImN1c3RvbXR5cGVcIik7XG59XG5cbmlmICh0eXBlb2YgU3VydmV5ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIGluaXQoU3VydmV5LCB3aW5kb3cuJCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9lbW90aW9uc3JhdGluZ3MuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=