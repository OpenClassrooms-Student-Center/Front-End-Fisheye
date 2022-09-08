/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/core-js/internals/a-callable.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-callable.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var tryToString = __webpack_require__(/*! ../internals/try-to-string */ "./node_modules/core-js/internals/try-to-string.js");

var $TypeError = TypeError; // `Assert: IsCallable(argument) is true`

module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};

/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var $String = String;
var $TypeError = TypeError; // `Assert: Type(argument) is Object`

module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};

/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

var lengthOfArrayLike = __webpack_require__(/*! ../internals/length-of-array-like */ "./node_modules/core-js/internals/length-of-array-like.js"); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare -- NaN check

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),

/***/ "./node_modules/core-js/internals/array-slice.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/array-slice.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

module.exports = uncurryThis([].slice);

/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};

/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");

var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");

var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ "./node_modules/core-js/internals/define-built-in-accessor.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/define-built-in-accessor.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var makeBuiltIn = __webpack_require__(/*! ../internals/make-built-in */ "./node_modules/core-js/internals/make-built-in.js");

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, {
    getter: true
  });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, {
    setter: true
  });
  return defineProperty.f(target, name, descriptor);
};

/***/ }),

/***/ "./node_modules/core-js/internals/define-built-in.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-built-in.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

var makeBuiltIn = __webpack_require__(/*! ../internals/make-built-in */ "./node_modules/core-js/internals/make-built-in.js");

var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "./node_modules/core-js/internals/define-global-property.js");

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);

  if (options.global) {
    if (simple) O[key] = value;else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];else if (O[key]) simple = true;
    } catch (error) {
      /* empty */
    }

    if (simple) O[key] = value;else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  }

  return O;
};

/***/ }),

/***/ "./node_modules/core-js/internals/define-global-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/define-global-property.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js"); // eslint-disable-next-line es-x/no-object-defineproperty -- safe


var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, {
      value: value,
      configurable: true,
      writable: true
    });
  } catch (error) {
    global[key] = value;
  }

  return value;
};

/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"); // Detect IE8's incomplete defineProperty implementation


module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    }
  })[1] != 7;
});

/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-ios.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-ios.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);

/***/ }),

/***/ "./node_modules/core-js/internals/engine-is-node.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/engine-is-node.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = classof(global.process) == 'process';

/***/ }),

/***/ "./node_modules/core-js/internals/engine-user-agent.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-user-agent.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),

/***/ "./node_modules/core-js/internals/engine-v8-version.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/engine-v8-version.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var userAgent = __webpack_require__(/*! ../internals/engine-user-agent */ "./node_modules/core-js/internals/engine-user-agent.js");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.'); // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us

  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
} // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0


if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;

/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var getOwnPropertyDescriptor = (__webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f);

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var defineBuiltIn = __webpack_require__(/*! ../internals/define-built-in */ "./node_modules/core-js/internals/define-built-in.js");

var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "./node_modules/core-js/internals/define-global-property.js");

var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");

var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");
/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }

    defineBuiltIn(target, key, sourceProperty, options);
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/function-apply.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/function-apply.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call; // eslint-disable-next-line es-x/no-reflect -- safe

module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});

/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-context.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-context.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js");

var bind = uncurryThis(uncurryThis.bind); // optional / simple context binding

module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function
    /* ...args */
  () {
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ "./node_modules/core-js/internals/function-bind-native.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-bind-native.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = function () {
    /* empty */
  }.bind(); // eslint-disable-next-line no-prototype-builtins -- safe


  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

/***/ }),

/***/ "./node_modules/core-js/internals/function-call.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-call.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js");

var call = Function.prototype.call;
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};

/***/ }),

/***/ "./node_modules/core-js/internals/function-name.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/function-name.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");

var FunctionPrototype = Function.prototype; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn(FunctionPrototype, 'name'); // additional protection from minified / mangled / dropped function names

var PROPER = EXISTS && function something() {
  /* empty */
}.name === 'something';

var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable);
module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

/***/ }),

/***/ "./node_modules/core-js/internals/function-uncurry-this.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/function-uncurry-this.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(/*! ../internals/function-bind-native */ "./node_modules/core-js/internals/function-bind-native.js");

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);
module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};

/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};

/***/ }),

/***/ "./node_modules/core-js/internals/get-method.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/get-method.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(/*! ../internals/a-callable */ "./node_modules/core-js/internals/a-callable.js");

var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "./node_modules/core-js/internals/is-null-or-undefined.js"); // `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod


module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};

/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line es-x/no-global-this -- safe
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || // eslint-disable-next-line no-restricted-globals -- safe
check(typeof self == 'object' && self) || check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) || // eslint-disable-next-line no-new-func -- fallback
function () {
  return this;
}() || Function('return this')();

/***/ }),

/***/ "./node_modules/core-js/internals/has-own-property.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/has-own-property.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var hasOwnProperty = uncurryThis({}.hasOwnProperty); // `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};

/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/***/ (function(module) {

module.exports = {};

/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');

/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js"); // Thanks to IE8 for its funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var $Object = Object;
var split = uncurryThis(''.split); // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;

/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

var functionToString = uncurryThis(Function.toString); // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper

if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;

/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/weak-map-basic-detection */ "./node_modules/core-js/internals/weak-map-basic-detection.js");

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");

var shared = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");

var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);

  set = function (it, metadata) {
    if (wmhas(store, it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget(store, it) || {};
  };

  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };

  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

/***/ }),

/***/ "./node_modules/core-js/internals/is-callable.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/is-callable.js ***!
  \*******************************************************/
/***/ (function(module) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};

/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),

/***/ "./node_modules/core-js/internals/is-null-or-undefined.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/is-null-or-undefined.js ***!
  \****************************************************************/
/***/ (function(module) {

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};

/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var documentAll = typeof document == 'object' && document.all; // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot

var SPECIAL_DOCUMENT_ALL = typeof documentAll == 'undefined' && documentAll !== undefined;
module.exports = SPECIAL_DOCUMENT_ALL ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};

/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/***/ (function(module) {

module.exports = false;

/***/ }),

/***/ "./node_modules/core-js/internals/is-symbol.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-symbol.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var isPrototypeOf = __webpack_require__(/*! ../internals/object-is-prototype-of */ "./node_modules/core-js/internals/object-is-prototype-of.js");

var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var $Object = Object;
module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};

/***/ }),

/***/ "./node_modules/core-js/internals/length-of-array-like.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/length-of-array-like.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js"); // `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike


module.exports = function (obj) {
  return toLength(obj.length);
};

/***/ }),

/***/ "./node_modules/core-js/internals/make-built-in.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/make-built-in.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(/*! ../internals/function-name */ "./node_modules/core-js/internals/function-name.js").CONFIGURABLE);

var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get; // eslint-disable-next-line es-x/no-object-defineproperty -- safe

var defineProperty = Object.defineProperty;
var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () {
    /* empty */
  }, 'length', {
    value: 8
  }).length !== 8;
});
var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }

  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;

  if (!hasOwn(value, 'name') || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
    if (DESCRIPTORS) defineProperty(value, 'name', {
      value: name,
      configurable: true
    });else value.name = name;
  }

  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', {
      value: options.arity
    });
  }

  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', {
        writable: false
      }); // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) {
    /* empty */
  }

  var state = enforceInternalState(value);

  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  }

  return value;
}; // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required


Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');

/***/ }),

/***/ "./node_modules/core-js/internals/math-trunc.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/math-trunc.js ***!
  \******************************************************/
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor; // `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe

module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};

/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(/*! ../internals/v8-prototype-define-bug */ "./node_modules/core-js/internals/v8-prototype-define-bug.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");

var $TypeError = TypeError; // eslint-disable-next-line es-x/no-object-defineproperty -- safe

var $defineProperty = Object.defineProperty; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable'; // `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);

  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);

    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }

  return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");

var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");

var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");

var toPropertyKey = __webpack_require__(/*! ../internals/to-property-key */ "./node_modules/core-js/internals/to-property-key.js");

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");

var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js"); // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe


var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");

var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ "./node_modules/core-js/internals/object-is-prototype-of.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-is-prototype-of.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

module.exports = uncurryThis({}.isPrototypeOf);

/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");

var indexOf = (__webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf);

var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key); // Don't enum bug & hidden keys


  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }

  return result;
};

/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var $propertyIsEnumerable = {}.propertyIsEnumerable; // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

/***/ }),

/***/ "./node_modules/core-js/internals/ordinary-to-primitive.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/ordinary-to-primitive.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var $TypeError = TypeError; // `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive

module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");

var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var concat = uncurryThis([].concat); // all object keys, includes non-enumerable and symbols

module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};

/***/ }),

/***/ "./node_modules/core-js/internals/regexp-flags.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/regexp-flags.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"); // `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags


module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};

/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isNullOrUndefined = __webpack_require__(/*! ../internals/is-null-or-undefined */ "./node_modules/core-js/internals/is-null-or-undefined.js");

var $TypeError = TypeError; // `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible

module.exports = function (it) {
  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
  return it;
};

/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");

var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var defineGlobalProperty = __webpack_require__(/*! ../internals/define-global-property */ "./node_modules/core-js/internals/define-global-property.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});
module.exports = store;

/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.25.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.25.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

/***/ }),

/***/ "./node_modules/core-js/internals/symbol-constructor-detection.js":
/*!************************************************************************!*\
  !*** ./node_modules/core-js/internals/symbol-constructor-detection.js ***!
  \************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(/*! ../internals/engine-v8-version */ "./node_modules/core-js/internals/engine-v8-version.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"); // eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing


module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol(); // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances

  return !String(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

/***/ }),

/***/ "./node_modules/core-js/internals/task.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/task.js ***!
  \************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var apply = __webpack_require__(/*! ../internals/function-apply */ "./node_modules/core-js/internals/function-apply.js");

var bind = __webpack_require__(/*! ../internals/function-bind-context */ "./node_modules/core-js/internals/function-bind-context.js");

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");

var arraySlice = __webpack_require__(/*! ../internals/array-slice */ "./node_modules/core-js/internals/array-slice.js");

var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

var validateArgumentsLength = __webpack_require__(/*! ../internals/validate-arguments-length */ "./node_modules/core-js/internals/validate-arguments-length.js");

var IS_IOS = __webpack_require__(/*! ../internals/engine-is-ios */ "./node_modules/core-js/internals/engine-is-ios.js");

var IS_NODE = __webpack_require__(/*! ../internals/engine-is-node */ "./node_modules/core-js/internals/engine-is-node.js");

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) {
  /* empty */
}

var run = function (id) {
  if (hasOwn(queue, id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable(handler) ? handler : Function(handler);
    var args = arraySlice(arguments, 1);

    queue[++counter] = function () {
      apply(fn, undefined, args);
    };

    defer(counter);
    return counter;
  };

  clear = function clearImmediate(id) {
    delete queue[id];
  }; // Node.js 0.8-


  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    }; // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624

  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && isCallable(global.postMessage) && !global.importScripts && location && location.protocol !== 'file:' && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    }; // Rest old browsers

  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};

/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),

/***/ "./node_modules/core-js/internals/to-integer-or-infinity.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer-or-infinity.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trunc = __webpack_require__(/*! ../internals/math-trunc */ "./node_modules/core-js/internals/math-trunc.js"); // `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity


module.exports = function (argument) {
  var number = +argument; // eslint-disable-next-line no-self-compare -- NaN check

  return number !== number || number === 0 ? 0 : trunc(number);
};

/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(/*! ../internals/to-integer-or-infinity */ "./node_modules/core-js/internals/to-integer-or-infinity.js");

var min = Math.min; // `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

var $Object = Object; // `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject

module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};

/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(/*! ../internals/function-call */ "./node_modules/core-js/internals/function-call.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js");

var getMethod = __webpack_require__(/*! ../internals/get-method */ "./node_modules/core-js/internals/get-method.js");

var ordinaryToPrimitive = __webpack_require__(/*! ../internals/ordinary-to-primitive */ "./node_modules/core-js/internals/ordinary-to-primitive.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive'); // `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive

module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;

  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }

  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

/***/ }),

/***/ "./node_modules/core-js/internals/to-property-key.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/to-property-key.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

var isSymbol = __webpack_require__(/*! ../internals/is-symbol */ "./node_modules/core-js/internals/is-symbol.js"); // `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey


module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

/***/ }),

/***/ "./node_modules/core-js/internals/try-to-string.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/try-to-string.js ***!
  \*********************************************************/
/***/ (function(module) {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(/*! ../internals/function-uncurry-this */ "./node_modules/core-js/internals/function-uncurry-this.js");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};

/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "./node_modules/core-js/internals/symbol-constructor-detection.js");

module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == 'symbol';

/***/ }),

/***/ "./node_modules/core-js/internals/v8-prototype-define-bug.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/v8-prototype-define-bug.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"); // V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334


module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () {
    /* empty */
  }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

/***/ }),

/***/ "./node_modules/core-js/internals/validate-arguments-length.js":
/*!*********************************************************************!*\
  !*** ./node_modules/core-js/internals/validate-arguments-length.js ***!
  \*********************************************************************/
/***/ (function(module) {

var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw $TypeError('Not enough arguments');
  return passed;
};

/***/ }),

/***/ "./node_modules/core-js/internals/weak-map-basic-detection.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/weak-map-basic-detection.js ***!
  \********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var isCallable = __webpack_require__(/*! ../internals/is-callable */ "./node_modules/core-js/internals/is-callable.js");

var WeakMap = global.WeakMap;
module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));

/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");

var hasOwn = __webpack_require__(/*! ../internals/has-own-property */ "./node_modules/core-js/internals/has-own-property.js");

var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/symbol-constructor-detection */ "./node_modules/core-js/internals/symbol-constructor-detection.js");

var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;

    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  }

  return WellKnownSymbolsStore[name];
};

/***/ }),

/***/ "./node_modules/core-js/modules/es.regexp.flags.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.regexp.flags.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var defineBuiltInAccessor = __webpack_require__(/*! ../internals/define-built-in-accessor */ "./node_modules/core-js/internals/define-built-in-accessor.js");

var regExpFlags = __webpack_require__(/*! ../internals/regexp-flags */ "./node_modules/core-js/internals/regexp-flags.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"); // babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError


var RegExp = global.RegExp;
var RegExpPrototype = RegExp.prototype;
var FORCED = DESCRIPTORS && fails(function () {
  var INDICES_SUPPORT = true;

  try {
    RegExp('.', 'd');
  } catch (error) {
    INDICES_SUPPORT = false;
  }

  var O = {}; // modern V8 bug

  var calls = '';
  var expected = INDICES_SUPPORT ? 'dgimsy' : 'gimsy';

  var addGetter = function (key, chr) {
    // eslint-disable-next-line es-x/no-object-defineproperty -- safe
    Object.defineProperty(O, key, {
      get: function () {
        calls += chr;
        return true;
      }
    });
  };

  var pairs = {
    dotAll: 's',
    global: 'g',
    ignoreCase: 'i',
    multiline: 'm',
    sticky: 'y'
  };
  if (INDICES_SUPPORT) pairs.hasIndices = 'd';

  for (var key in pairs) addGetter(key, pairs[key]); // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe


  var result = Object.getOwnPropertyDescriptor(RegExpPrototype, 'flags').get.call(O);
  return result !== expected || calls !== expected;
}); // `RegExp.prototype.flags` getter
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags

if (FORCED) defineBuiltInAccessor(RegExpPrototype, 'flags', {
  configurable: true,
  get: regExpFlags
});

/***/ }),

/***/ "./node_modules/core-js/modules/web.clear-immediate.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/web.clear-immediate.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var clearImmediate = (__webpack_require__(/*! ../internals/task */ "./node_modules/core-js/internals/task.js").clear); // `clearImmediate` method
// http://w3c.github.io/setImmediate/#si-clearImmediate


$({
  global: true,
  bind: true,
  enumerable: true,
  forced: global.clearImmediate !== clearImmediate
}, {
  clearImmediate: clearImmediate
});

/***/ }),

/***/ "./node_modules/core-js/modules/web.immediate.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/web.immediate.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
__webpack_require__(/*! ../modules/web.clear-immediate */ "./node_modules/core-js/modules/web.clear-immediate.js");

__webpack_require__(/*! ../modules/web.set-immediate */ "./node_modules/core-js/modules/web.set-immediate.js");

/***/ }),

/***/ "./node_modules/core-js/modules/web.set-immediate.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/web.set-immediate.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var setImmediate = (__webpack_require__(/*! ../internals/task */ "./node_modules/core-js/internals/task.js").set); // `setImmediate` method
// http://w3c.github.io/setImmediate/#si-setImmediate


$({
  global: true,
  bind: true,
  enumerable: true,
  forced: global.setImmediate !== setImmediate
}, {
  setImmediate: setImmediate
});

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {

"use strict";

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/

module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ (function(module) {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/scripts/data/displayData.js":
/*!*****************************************!*\
  !*** ./src/scripts/data/displayData.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayData": function() { return /* binding */ displayData; },
/* harmony export */   "displayDataAll": function() { return /* binding */ displayDataAll; }
/* harmony export */ });
/* harmony import */ var _factories_photographerFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/photographerFactory */ "./src/scripts/factories/photographerFactory.js");

async function displayData(photographers, id) {
  let photographerSelected = "";
  photographers.forEach(photographer => {
    if (photographer.id == id) {
      // Then we are going use the PhotographerFactory to set DOM
      if (true) {
        console.log(photographer);
      }

      const photographerModel = (0,_factories_photographerFactory__WEBPACK_IMPORTED_MODULE_0__.photographerFactory)(photographer);
      photographerModel.setPhotographerHeader();
      photographerModel.setStickyBarPrice();
      photographerSelected = photographer; // End of PhotographerFactory Work
    }
  });
  return photographerSelected; // Return the photographerShow at the end
}
async function displayDataAll(photographers, querySelector) {
  photographers.forEach(photographer => {
    // Then we are going use the PhotographerFactory to generate DOM
    const photographersSection = document.querySelector(querySelector);
    const photographerModel = (0,_factories_photographerFactory__WEBPACK_IMPORTED_MODULE_0__.photographerFactory)(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();

    if (true) {
      console.log(photographer);
    }

    if (userCardDOM) {
      photographersSection.appendChild(userCardDOM);
    } // End of PhotographerFactory Work

  });
}

/***/ }),

/***/ "./src/scripts/factories/photographerFactory.js":
/*!******************************************************!*\
  !*** ./src/scripts/factories/photographerFactory.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "photographerFactory": function() { return /* binding */ photographerFactory; }
/* harmony export */ });
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom */ "./src/scripts/utils/dom.js");

function photographerFactory(data) {
  const {
    name,
    id,
    city,
    country,
    tagline,
    portrait,
    price
  } = data; // console.log(data);

  const picture = `assets/images/${portrait}`;

  function getUserCardDOM() {
    // Create DOM only if we got a picture a id and a name
    if (name && id && portrait) {
      // BUILD A ARTICLE 
      const article = document.createElement("article");
      article.setAttribute("class", "photographer_card"); // Create Dynamique LINK with Picture

      const linkElement = article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("a", `photographer.html?id=${id}`) // Build AHref
      );
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setArialLabel)(linkElement, `Link to ${name}`); // Set ArielLabel to AHref

      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.insertPictureInsideElement)(linkElement, picture, name); // END Create Dynamique LINK with Picture

      article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("h2", name));

      if (city && country) {
        article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("h3", `${city}, ${country}`));
      }

      if (tagline) {
        article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("h4", tagline));
      }

      if (price) {
        article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("h5", `${price}€/jour`));
      } // RETURN A ARTICLE 


      return article;
    } else {
      return false;
    }
  }

  function setPhotographerHeader() {
    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(".photograph_header h1", name);

    if (city && country) {
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(".photograph_header h2", `${city}, ${country}`);
    } else {
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(".photograph_header h2", "");
    }

    (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(".photograph_header h3", tagline);
    /** WE USE a different method that insertPictureInsideElement() since picture is already in the DOM */

    const imgProfile = document.querySelector(".photograph_header img");
    imgProfile.setAttribute("src", picture);
    imgProfile.setAttribute("alt", name);
    /** */
  }

  function setStickyBarPrice() {
    if (price) {
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(".price_rate_daily", `${price} € / jour`);
    } else {
      (0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(".price_rate_daily", "");
    }
  }

  return {
    name,
    picture,
    getUserCardDOM,
    setPhotographerHeader,
    setStickyBarPrice
  };
}

/***/ }),

/***/ "./src/scripts/utils/dom.js":
/*!**********************************!*\
  !*** ./src/scripts/utils/dom.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildElement": function() { return /* binding */ buildElement; },
/* harmony export */   "insertHTMLAfterElement": function() { return /* binding */ insertHTMLAfterElement; },
/* harmony export */   "insertPictureInsideElement": function() { return /* binding */ insertPictureInsideElement; },
/* harmony export */   "insertVideoInsideElement": function() { return /* binding */ insertVideoInsideElement; },
/* harmony export */   "setArialLabel": function() { return /* binding */ setArialLabel; },
/* harmony export */   "setInnerHtml": function() { return /* binding */ setInnerHtml; }
/* harmony export */ });
// Function for build DOM
function insertPictureInsideElement(element, picture, alt) {
  element.insertAdjacentHTML("beforeend", `<img src="${picture}" alt="${alt}">`);
}
function insertVideoInsideElement(element, video, ariaLabel) {
  if (ariaLabel) {
    element.insertAdjacentHTML("beforeend", `<video src="${video}" aria-label="${ariaLabel}">`);
  } else {
    element.insertAdjacentHTML("beforeend", '<video src="' + video + '">');
  }
}
function insertHTMLAfterElement(element, html) {
  element.insertAdjacentHTML("afterend", html);
}
function buildElement(balise, value) {
  // Create balise
  const element = document.createElement(balise); // Set Attribute or TextContened depend of balise

  switch (balise) {
    case "a":
      element.setAttribute("href", value);
      break;

    case "img":
      element.setAttribute("src", value);
      break;

    default:
      element.textContent = value;
  }

  return element;
}
function setArialLabel(element, arialabel) {
  element.setAttribute("aria-label", arialabel);
}
function setInnerHtml(querySelector, texte) {
  const texteElement = document.querySelector(querySelector);
  texteElement.innerHTML = texte;
} // End Function for build DOM

/***/ }),

/***/ "./src/scripts/utils/fetch.js":
/*!************************************!*\
  !*** ./src/scripts/utils/fetch.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchJSON": function() { return /* binding */ fetchJSON; },
/* harmony export */   "getMedias": function() { return /* binding */ getMedias; },
/* harmony export */   "getPhotographers": function() { return /* binding */ getPhotographers; }
/* harmony export */ });
async function fetchJSON(url, type) {
  const response = await fetch(url); // Wait for the Async Fecth Function
  // fetch returns an object with a response property which if set to false means that the connection is not good and so we stop the function 

  if (!response.ok) {
    throw new Error("Thrown from fetchJSON()");
  }

  let jsonResponse = await response.json(); // parsing JSON

  return jsonResponse[type]; // Get data from the Array that we want
}
async function getPhotographers() {
  const url = "../data/photographers.json"; // Data source .JSON

  const photographers = await fetchJSON(url, "photographers"); // use fetchJSON function from utils/fetch.js

  return photographers; // Return data of PhotoGraphers
}
async function getMedias() {
  const url = "../data/photographers.json"; // Data source .JSON

  const medias = await fetchJSON(url, "media"); // use fetchJSON function from utils/fetch.js

  return medias; // Return data of Media
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/main.scss":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/main.scss ***!
  \*******************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n/** Used to load all variables for this project about SCSS **/ /** FONT **/\n/** END FONT **/\n/** COLOR VARIABLES **/\n/** END COLOR VARIABLES **/\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\n/********************** GENERAL **********************/\nhtml,\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: \"DM Sans\", sans-serif;\n  animation: 1s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/********************** END GENERAL **********************/\n/** IMPORT MIXIN **/\n/** IMPORT HEADER STYLES **/\nheader {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 120px;\n}\nheader h1 {\n  color: #901C1C;\n  top: 44px;\n  margin-right: 100px;\n  font-weight: 400;\n  font-size: 36px;\n  line-height: 47px;\n}\nheader .logo,\nheader .logo_photographer {\n  height: 50px;\n}\nheader .logo {\n  margin-left: 115px;\n}\nheader .logo_photographer {\n  margin-left: 100px;\n  margin-top: 10px;\n}\n\n/** IMPORT PHOTOGRAPHERS CARDS **/\n.photographer_card {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  justify-self: center;\n}\n.photographer_card img {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  transition: box-shadow 1s;\n  height: 200px;\n  width: 200px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.photographer_card img:hover {\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.photographer_card h2,\n.photographer_card h3,\n.photographer_card h4,\n.photographer_card h5 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n}\n.photographer_card h2 {\n  margin-top: 20px;\n  color: #D3573C;\n  font-size: 36px;\n}\n.photographer_card h3 {\n  font-size: 13.0010834236px;\n  line-height: 17px;\n  color: #901C1C;\n}\n.photographer_card h4 {\n  margin-top: 2px;\n  font-size: 10px;\n  line-height: 13px;\n  color: #000000;\n}\n.photographer_card h5 {\n  margin-top: 2px;\n  font-size: 9px;\n  line-height: 12px;\n  text-align: center;\n  color: #757575;\n}\n\n@media (max-width: 1100px) {\n  .photographer_card h3 {\n    font-size: 16.9014084507px;\n    margin-top: 10px;\n  }\n  .photographer_card h4 {\n    font-size: 13px;\n    margin-top: 10px;\n  }\n  .photographer_card h5 {\n    font-size: 11.7px;\n    margin-top: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_card h3 {\n    font-size: 19.5016251354px;\n  }\n  .photographer_card h4 {\n    font-size: 15px;\n  }\n  .photographer_card h5 {\n    font-size: 13.5px;\n  }\n  .photographer_card img {\n    width: 230px;\n    height: 230px;\n  }\n}\n/** IMPORT MODAL COMPONENT **/\n.modal_contact {\n  display: none;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  border-radius: 5px;\n  background-color: #DB8876;\n  padding: 35px;\n  margin: auto;\n  width: 47%;\n  transition: width 0.5s ease-in;\n}\n.modal_contact .modal_header {\n  justify-content: space-between;\n  width: 100%;\n  margin-top: -20px;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: baseline;\n}\n.modal_contact .modal_header #closeModal {\n  cursor: pointer;\n}\n.modal_contact .modal_header #closeModal .default_color {\n  fill: white;\n}\n.modal_contact .modal_header #closeModal .color_primary1 {\n  fill: #901C1C;\n}\n.modal_contact .modal_header h2 {\n  font-size: 63.72px;\n  font-weight: normal;\n  text-align: left;\n}\n.modal_contact form input {\n  font-size: 30px;\n  margin-bottom: 5px;\n  padding: 10px;\n}\n.modal_contact form textarea {\n  margin-top: 15px;\n  font-size: 24px;\n  margin-bottom: 20px;\n  resize: vertical;\n}\n.modal_contact form input,\n.modal_contact form textarea {\n  width: 100%;\n  height: 68px;\n  border: none;\n  border-radius: 5px;\n}\n.modal_contact form label {\n  color: #000000;\n  font-size: 36px;\n}\n.modal_contact form label:last-child {\n  margin-top: 15px;\n}\n.modal_contact .help_blind {\n  display: none;\n}\n\n.hide_content {\n  animation: 0.5s ease-in forwards fade-off;\n}\n@keyframes fade-off {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.4;\n  }\n}\n\n.show_content {\n  animation: 0.5s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0.4;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@media (max-width: 1100px) {\n  .modal_contact {\n    width: 65%;\n  }\n  .modal_contact .modal_header h2 {\n    font-size: 54px;\n  }\n}\n@media (max-width: 800px) {\n  .modal_contact {\n    width: 90%;\n  }\n  .modal_contact .modal_header h2 {\n    font-size: 43.2px;\n  }\n  .modal_contact form label {\n    font-size: 27.6923076923px;\n  }\n  .modal_contact form input {\n    font-size: 24px;\n  }\n  .modal_contact form textarea {\n    font-size: 20px;\n  }\n}\n/** IMPORT CONTACT BUTTON COMPONENT **/\n.fisheye_button {\n  font-size: 20px;\n  font-weight: 700;\n  font-family: \"DM Sans\", sans-serif;\n  color: white;\n  padding: 11px;\n  min-width: 170px;\n  min-height: 70px;\n  border: none;\n  background-color: #901C1C;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: color 0.5s ease-in, background-color 0.5s ease-in;\n}\n.fisheye_button:hover {\n  color: #000000;\n  background-color: #DB8876;\n}\n\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\n.photograph_header {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: no-wrap;\n  align-content: fled-end;\n  justify-content: space-between;\n  background-color: #FAFAFA;\n  height: 313px;\n  margin-top: 10px;\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.photograph_header div:nth-child(3) {\n  margin-right: 20px;\n}\n.photograph_header h1,\n.photograph_header h2,\n.photograph_header h3 {\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 400;\n}\n.photograph_header h1 {\n  font-size: 63.72px;\n  margin-bottom: -15px;\n  color: #D3573C;\n}\n.photograph_header h2 {\n  margin-top: 15px;\n  margin-bottom: 20px;\n  font-size: 23.2258064516px;\n  color: #901C1C;\n}\n.photograph_header h3 {\n  font-size: 18px;\n  color: #525252;\n}\n.photograph_header .photograph_about,\n.photograph_header .photograph_button {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n}\n.photograph_header .photograph_button {\n  margin-top: 30px;\n  margin-right: 80px;\n}\n.photograph_header .photograph_about {\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\n@media (max-width: 1100px) {\n  .photograph_header {\n    background-color: white;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n    padding-top: 15px;\n  }\n  .photograph_header h1 {\n    font-size: 41.4px;\n  }\n  .photograph_header h2 {\n    font-size: 20px;\n  }\n  .photograph_header h3 {\n    font-size: 16.3636363636px;\n  }\n  .photograph_button {\n    margin-bottom: 30px;\n  }\n}\n@media (max-width: 800px) {\n  .photograph_header {\n    display: flex;\n    flex-direction: column;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .photograph_header .photograph_button {\n    align-items: inherit;\n    margin-right: 0px;\n    position: absolute;\n    margin-top: 200px;\n  }\n  .photograph_header > .photograph_about {\n    margin-left: 0;\n    align-items: center;\n  }\n  .photograph_header h1,\nh2,\nh3 {\n    text-align: center;\n  }\n  .photograph_header > .photographer_card {\n    display: none;\n  }\n}\n/** IMPORT SELECT FILTER COMPONENT **/\n.select_button {\n  display: flex;\n  align-content: flex-end;\n  align-items: center;\n  justify-content: space-between;\n  text-align: left;\n  padding-left: 20px;\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 18px;\n  background: #901C1C;\n  color: white;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border: none;\n  border-color: none;\n  width: 170px;\n  height: 70px;\n  cursor: pointer;\n}\n\n.select_button::after {\n  transition: transform 0.25s ease-in;\n  content: \">\";\n  transform: rotate(90deg);\n  font-size: 25px;\n  text-align: right;\n  float: right;\n  margin-right: 20px;\n}\n\n.select_filter {\n  position: relative;\n  display: inline-block;\n}\n\n.select_content {\n  display: none;\n  position: absolute;\n  background: #901C1C;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  min-width: 160px;\n  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n}\n.select_content .whiteline {\n  width: 90%;\n  height: 1px;\n  background-color: white;\n  margin-left: 5%;\n}\n.select_content a {\n  transition: all 0.5s ease-in;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-size: 18px;\n  color: white;\n  padding: 20px;\n  width: 170px;\n  height: 60px;\n  text-decoration: none;\n  display: block;\n}\n.select_content a:hover {\n  cursor: pointer;\n  transition: all 0.5s ease-in;\n  color: #000000;\n}\n\n.select_filter:hover .select_content {\n  display: block;\n}\n\n.select_filter:hover .select_button::after {\n  transform: rotate(-90deg);\n  transition: transform 0.25s ease-in;\n}\n\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\n.photographer_statistic {\n  display: flex;\n  flex-direction: row;\n  align-content: flex-start;\n  justify-content: space-around;\n  align-items: baseline;\n  position: fixed;\n  background-color: #DB8876;\n  min-width: 376px;\n  min-height: 89px;\n  bottom: 0;\n  right: 38px;\n  z-index: 2;\n  margin-bottom: -22px;\n  border-radius: 5px;\n}\n.photographer_statistic .total_likes,\n.photographer_statistic .price_rate_daily {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 23.2258064516px;\n  line-height: 31px;\n  color: #000000;\n  padding-top: 18px;\n}\n.photographer_statistic .total_likes:after {\n  padding-left: 5px;\n  content: \"♥\";\n  font-size: 30.8903225806px;\n}\n\n@media (max-width: 700px) {\n  .photographer_statistic {\n    display: none;\n  }\n}\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\n.media_card {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  max-width: 350px;\n}\n.media_card img,\n.media_card video {\n  transition: box-shadow 1s;\n  width: 100%;\n  max-height: 300px;\n  min-height: 300px;\n  object-fit: cover;\n  border-radius: 5px;\n}\n.media_card img:hover,\n.media_card video:hover {\n  transition: box-shadow 1s;\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.media_card .details {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: baseline;\n  margin-top: 5px;\n}\n.media_card h6 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n  font-size: 24px;\n  color: #901C1C;\n}\n.media_card h6:last-child::after {\n  font-size: 30px;\n  padding-left: 10px;\n  content: \"♥\";\n}\n\n@media (max-width: 600px) {\n  .media_card img,\n.media_card {\n    max-width: 100%;\n  }\n}\n/** IMPORT PAGES (other) Styles **/\n.photographer_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 70px;\n  margin-top: 75px;\n  margin-bottom: 75px;\n}\n\n.margin_left_right {\n  margin: 0 100px;\n}\n\n.filter_section {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n  margin-left: 0;\n}\n.filter_section h5:first-child {\n  margin-top: 20px;\n  margin-right: 28px;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-style: normal;\n  font-size: 18px;\n  color: #000000;\n}\n.filter_section .select_filter {\n  margin-top: 10px;\n}\n\n.media_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  row-gap: 30px;\n  column-gap: 95px;\n  margin-top: 20px;\n  margin-bottom: 75px;\n}\n\n.ERROR_404 {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n/** IMPORT FOOTER STYLES **/\nfooter {\n  height: 2px;\n  width: 100%;\n  background-color: white;\n  margin-top: 75px;\n}\n\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\n (components Elements got their own Responsive Rules in their Stylesheet) **/\n@media (max-width: 1100px) {\n  .photographer_section,\n.media_section {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 800px) {\n  header {\n    flex-direction: column;\n    margin-top: 40px;\n    height: 100px;\n  }\n  header .logo_photographer {\n    margin-left: 0;\n  }\n  header .logo,\nheader h1 {\n    margin-left: 20px;\n    margin-right: 20px;\n    font-size: 30px;\n  }\n  .margin_left_right {\n    margin: 0 20px;\n  }\n  .filter_section {\n    justify-content: space-between;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_section {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 600px) {\n  .media_section {\n    grid-template-columns: 1fr;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/main.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_global.scss","webpack://./src/scss/pages/_header.scss","webpack://./src/scss/_mixin.scss","webpack://./src/scss/components/_photographer_cards.scss","webpack://./src/scss/components/modal/_contact.scss","webpack://./src/scss/components/_fisheye_button.scss","webpack://./src/scss/components/_photograph_header.scss","webpack://./src/scss/components/_select_filter.scss","webpack://./src/scss/components/_photographer_statistic.scss","webpack://./src/scss/components/_media_cards.scss","webpack://./src/scss/pages/_pages.scss","webpack://./src/scss/pages/_footer.scss","webpack://./src/scss/_responsive.scss"],"names":[],"mappings":"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","sourcesContent":["/** Used to load all variables for this project about SCSS **/\r\n@import \"_variables.scss\";\r\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\r\n@import \"_global.scss\";\r\n/** IMPORT MIXIN **/\r\n@import \"_mixin.scss\";\r\n/** IMPORT HEADER STYLES **/\r\n@import \"pages/header.scss\";\r\n/** IMPORT PHOTOGRAPHERS CARDS **/\r\n@import \"components/photographer_cards.scss\";\r\n/** IMPORT MODAL COMPONENT **/\r\n@import \"components/modal/_contact.scss\";\r\n@import \"components/modal/_lightbox.scss\";\r\n/** IMPORT CONTACT BUTTON COMPONENT **/\r\n@import \"components/fisheye_button.scss\";\r\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\r\n@import \"components/photograph_header.scss\";\r\n/** IMPORT SELECT FILTER COMPONENT **/\r\n@import \"components/select_filter.scss\";\r\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\r\n@import \"components/photographer_statistic.scss\";\r\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\r\n@import \"components/media_cards.scss\";\r\n/** IMPORT PAGES (other) Styles **/\r\n@import \"pages/pages.scss\";\r\n/** IMPORT FOOTER STYLES **/\r\n@import \"pages/footer.scss\";\r\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\r\n (components Elements got their own Responsive Rules in their Stylesheet) **/\r\n@import \"_responsive.scss\";","/** FONT **/\r\n$font_global: \"DM Sans\", sans-serif;\r\n$font_weight_small: 400;\r\n$font_weight_big: 700;\r\n\r\n$font_size: 36px;\r\n/** END FONT **/\r\n\r\n/** COLOR VARIABLES **/\r\n$default_color: white;\r\n$default_font_color: #000000;\r\n$color_gray: #757575;\r\n$color_primary1: #901C1C;\r\n$color_primary2: #D3573C;\r\n$color_secondary2: #525252;\r\n$color_secondary2_bg: #FAFAFA;\r\n$color_background: #DB8876;\r\n/** END COLOR VARIABLES **/","/********************** GENERAL **********************/\r\nhtml,\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n\r\n}\r\n\r\nbody {\r\n  font-family: $font_global;\r\n  animation: 1s ease-in forwards fade-in;\r\n\r\n  @keyframes fade-in {\r\n    0% {\r\n      opacity: 0;\r\n    }\r\n\r\n    100% {\r\n      opacity: 1.0;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n/********************** END GENERAL **********************/","header {\r\n    @include flex-basic(row, null, null, space-between, center);\r\n    height: 120px;\r\n\r\n\r\n    h1 {\r\n        color: $color_primary1;\r\n        top: 44px;\r\n        margin-right: 100px;\r\n        font-weight: $font_weight_small;\r\n        font-size: $font_size;\r\n        line-height: 47px;\r\n    }\r\n\r\n    .logo,\r\n    .logo_photographer {\r\n        height: 50px;\r\n    }\r\n\r\n    .logo {\r\n        margin-left: 115px;\r\n    }\r\n\r\n    .logo_photographer {\r\n        margin-left: 100px;\r\n        margin-top: 10px;\r\n    }\r\n}","@mixin flex-basic($flex-direction,\r\n  $flex-wrap,\r\n  $align-content,\r\n  $justify-content,\r\n  $align-items) {\r\n  display: flex;\r\n  flex-direction: $flex-direction;\r\n\r\n  @if ($flex-wrap) {\r\n    flex-wrap: $flex-wrap;\r\n  }\r\n\r\n  @if ($align-content) {\r\n    align-content: $align-content;\r\n  }\r\n\r\n  @if ($justify-content) {\r\n    justify-content: $justify-content;\r\n  }\r\n\r\n  @if ($align-items) {\r\n    align-items: $align-items;\r\n  }\r\n}\r\n\r\n// @mixin mask-crossbrowser($value) {\r\n//   -webkit-mask: $value;\r\n//   mask: $value;\r\n// }\r\n\r\n// @mixin margin-left-and-right($value) {\r\n//   margin-left: $value;\r\n//   margin-right: $value;\r\n// }\r\n\r\n@mixin padding-left-and-right($value) {\r\n  padding-left: $value;\r\n  padding-right: $value;\r\n}",".photographer_card {\r\n    @include flex-basic(column, null, null, center, center);\r\n    justify-self: center;\r\n\r\n    img {\r\n        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n        transition: box-shadow 1s;\r\n        height: 200px;\r\n        width: 200px;\r\n        border-radius: 50%;\r\n        object-fit: cover;\r\n\r\n        &:hover {\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n    h2,\r\n    h3,\r\n    h4,\r\n    h5 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 20px;\r\n        color: $color_primary2;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font_size / 2.769);\r\n        line-height: 17px;\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h4 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 3.6);\r\n        line-height: 13px;\r\n        color: $default_font_color;\r\n    }\r\n\r\n    h5 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 4);\r\n        line-height: 12px;\r\n        text-align: center;\r\n        color: $color_gray;\r\n    }\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.5);\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.5);\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.5);\r\n        }\r\n\r\n        img {\r\n            width: 230px;\r\n            height: 230px;\r\n        }\r\n    }\r\n\r\n}",".modal_contact {\r\n    display: none;\r\n    position: fixed;\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n    border-radius: 5px;\r\n    background-color: $color_background;\r\n    padding: 35px;\r\n    margin: auto;\r\n    width: 47%;\r\n    transition: width 0.5s ease-in;\r\n\r\n    .modal_header {\r\n        justify-content: space-between;\r\n        width: 100%;\r\n        margin-top: -20px;\r\n        margin-bottom: 10px;\r\n        display: flex;\r\n        align-items: baseline;\r\n\r\n        #closeModal {\r\n            // Close Modal Picture\r\n            cursor: pointer;\r\n\r\n            .default_color {\r\n                fill: $default_color;\r\n            }\r\n\r\n            .color_primary1 {\r\n                fill: $color_primary1;\r\n            }\r\n        }\r\n\r\n\r\n        h2 {\r\n            font-size: calc($font_size * 1.77);\r\n            font-weight: normal;\r\n            text-align:left;\r\n        }\r\n    }\r\n\r\n    form input {\r\n        font-size: calc($font_size / 1.2);\r\n        margin-bottom: 5px;\r\n        padding: 10px;\r\n    }\r\n\r\n    form textarea {\r\n        margin-top: 15px;\r\n        font-size: calc($font_size /1.5);\r\n        margin-bottom: 20px;\r\n        resize: vertical;\r\n    }\r\n\r\n    form input,\r\n    form textarea {\r\n\r\n        width: 100%;\r\n        height: 68px;\r\n        border: none;\r\n        border-radius: 5px;\r\n\r\n    }\r\n\r\n\r\n    form label {\r\n        color: $default_font_color;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    form label:last-child {\r\n        margin-top: 15px;\r\n    }\r\n\r\n    .help_blind {\r\n        display: none;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n.hide_content {\r\n    animation: 0.5s ease-in forwards fade-off;\r\n\r\n    @keyframes fade-off {\r\n        0% {\r\n            opacity: 1.0;\r\n        }\r\n\r\n        100% {\r\n            opacity: 0.4;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\r\n.show_content {\r\n    animation: 0.5s ease-in forwards fade-in;\r\n\r\n    @keyframes fade-in {\r\n        0% {\r\n            opacity: 0.4;\r\n        }\r\n\r\n        100% {\r\n            opacity: 1.0;\r\n        }\r\n    }\r\n\r\n\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n\r\n    .modal_contact {\r\n        width: 65%;\r\n\r\n        .modal_header {\r\n            h2 {\r\n                font-size: calc($font_size * 1.5);\r\n            }\r\n\r\n\r\n        }\r\n\r\n    }\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .modal_contact {\r\n        width: 90%;\r\n\r\n        .modal_header {\r\n            h2 {\r\n                font-size: calc($font_size * 1.2);\r\n            }\r\n        }\r\n\r\n        form label {\r\n            font-size: $font_size / 1.3;\r\n        }\r\n\r\n        form input {\r\n            font-size: calc($font_size / 1.5);\r\n        }\r\n\r\n        form textarea {\r\n            font-size: $font_size / 1.8;\r\n\r\n        }\r\n\r\n\r\n\r\n    }\r\n}",".fisheye_button {\r\n    font-size: calc($font_size / 1.8);\r\n    font-weight: $font_weight_big;\r\n    font-family: $font_global;\r\n    color: $default_color;\r\n    padding: 11px;\r\n    min-width: 170px;\r\n    min-height: 70px;\r\n    border: none;\r\n    background-color: $color_primary1;\r\n    border-radius: 5px;\r\n    cursor: pointer;\r\n    transition: color 0.5s ease-in, background-color 0.5s ease-in;\r\n\r\n    &:hover {\r\n        color: $default_font_color;\r\n        background-color: $color_background;\r\n    }\r\n}",".photograph_header {\r\n    @include flex-basic(row, no-wrap, fled-end, space-between, null);\r\n    background-color: $color_secondary2_bg;\r\n    height: 313px;\r\n    margin-top: 10px;\r\n    @include padding-left-and-right(30px);\r\n\r\n    div:nth-child(3) {\r\n        margin-right: 20px;\r\n    }\r\n\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h1 {\r\n        font-size: calc($font_size * 1.77);\r\n        margin-bottom: -15px;\r\n        color: $color_primary2;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 15px;\r\n        margin-bottom: 20px;\r\n        font-size: calc($font_size / 1.55);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font-size / 2);\r\n        color: $color_secondary2;\r\n    }\r\n\r\n    .photograph_about,\r\n    .photograph_button {\r\n        @include flex-basic(column, null, null, center, flex-start);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-top: 30px;\r\n        margin-right: 80px;\r\n    }\r\n\r\n    .photograph_about {\r\n        margin-left: 20px;\r\n        margin-bottom: 10px;\r\n    }\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n    .photograph_header {\r\n        background-color: $default_color;\r\n        @include flex-basic(column, wrap, fled-end, space-between, center);\r\n        padding-top: 15px;\r\n    }\r\n\r\n    .photograph_header h1 {\r\n        font-size: calc($font_size * 1.15);\r\n    }\r\n\r\n    .photograph_header h2 {\r\n        font-size: calc($font_size / 1.8);\r\n\r\n    }\r\n\r\n    .photograph_header h3 {\r\n        font-size: calc($font-size / 2.2);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-bottom: 30px;\r\n\r\n\r\n    }\r\n\r\n\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .photograph_header {\r\n        @include flex-basic(column, null, fled-end, space-between, center);\r\n\r\n        .photograph_button {\r\n            align-items: inherit;\r\n            margin-right: 0px;\r\n            position: absolute;\r\n            margin-top: 200px;\r\n        }\r\n\r\n    }\r\n\r\n    .photograph_header>.photograph_about {\r\n        margin-left: 0;\r\n        align-items: center;\r\n    }\r\n\r\n    .photograph_header h1,\r\n    h2,\r\n    h3 {\r\n        text-align: center;\r\n    }\r\n\r\n    .photograph_header>.photographer_card {\r\n        display: none;\r\n    }\r\n\r\n\r\n}",".select_button {\r\n    display: flex;\r\n    align-content: flex-end;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n\r\n    text-align: left;\r\n    padding-left: 20px;\r\n    font-family: $font_global;\r\n    font-style: normal;\r\n    font-weight: $font_weight_big;\r\n    font-size: calc($font_size / 2);\r\n    background: $color_primary1;\r\n    color: $default_color;\r\n    border-top-left-radius: 5px;\r\n    border-top-right-radius: 5px;\r\n    border: none;\r\n    border-color: none;\r\n    width: 170px;\r\n    height: 70px;\r\n    cursor: pointer;\r\n}\r\n\r\n.select_button::after {\r\n    transition: transform 0.25s ease-in;\r\n    content: \">\";\r\n    transform: rotate(90deg);\r\n    font-size: calc($font_size / 1.44);\r\n    text-align: right;\r\n    float: right;\r\n    margin-right: 20px;\r\n\r\n}\r\n\r\n.select_filter {\r\n\r\n    position: relative;\r\n    display: inline-block;\r\n}\r\n\r\n\r\n.select_content {\r\n    display: none;\r\n    position: absolute;\r\n    background: $color_primary1;\r\n    border-bottom-left-radius: 5px;\r\n    border-bottom-right-radius: 5px;\r\n    min-width: 160px;\r\n    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\r\n    z-index: 1;\r\n\r\n\r\n    .whiteline {\r\n        width: 90%;\r\n        height: 1px;\r\n        background-color: $default_color;\r\n        margin-left: 5%;\r\n    }\r\n\r\n    a {\r\n        transition: all 0.5s ease-in;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 2);\r\n        color: $default_color;\r\n        padding: 20px;\r\n        width: 170px;\r\n        height: 60px;\r\n        text-decoration: none;\r\n        display: block;\r\n    }\r\n\r\n    a:hover {\r\n        cursor: pointer;\r\n        transition: all 0.5s ease-in;\r\n        color: $default_font_color;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n\r\n.select_filter:hover .select_content {\r\n\r\n    display: block;\r\n}\r\n\r\n.select_filter:hover .select_button::after {\r\n    transform: rotate(-90deg);\r\n    transition: transform 0.25s ease-in;\r\n}",".photographer_statistic {\r\n    @include flex-basic(row, null, flex-start, space-around, baseline);\r\n    position: fixed;\r\n    background-color: $color_background;\r\n    min-width: 376px;\r\n    min-height: 89px;\r\n    bottom: 0;\r\n    right: 38px;\r\n    z-index: 2;\r\n    margin-bottom: -22px;\r\n    border-radius: 5px;\r\n\r\n\r\n\r\n    .total_likes,\r\n    .price_rate_daily {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 1.55);\r\n        line-height: 31px;\r\n        color: $default_font_color;\r\n        padding-top: 18px;\r\n\r\n    }\r\n\r\n    .total_likes:after {\r\n        padding-left: 5px;\r\n        content: \"♥\";\r\n        font-size: calc($font_size / 1.55 * 1.33);\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_statistic {\r\n        display: none;\r\n    }\r\n\r\n}",".media_card {\r\n    @include flex-basic(column, null, null, null, null);\r\n    flex-wrap: wrap;\r\n    max-width: 350px;\r\n\r\n    img,\r\n    video {\r\n        transition: box-shadow 1s;\r\n        width: 100%;\r\n        max-height: 300px;\r\n        min-height: 300px;\r\n        object-fit: cover;\r\n        border-radius: 5px;\r\n\r\n        &:hover {\r\n            transition: box-shadow 1s;\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n\r\n\r\n    .details {\r\n        @include flex-basic(row, null, null, space-between, baseline);\r\n        margin-top: 5px;\r\n    }\r\n\r\n    h6 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n        font-size: calc($font_size / 1.5);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h6:last-child::after {\r\n        font-size: calc($font_size / 1.5 * 1.25);\r\n        padding-left: 10px;\r\n        content: \"♥\";\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_card img,\r\n    .media_card {\r\n        max-width: 100%;\r\n    }\r\n}","//// MAIN PAGE /// \r\n.photographer_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    gap: 70px;\r\n    margin-top: 75px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n///// END MAIN PAGE // \r\n\r\n//////////////// PHOTOGRAPHER PAGE /////// \r\n.margin_left_right {\r\n    margin: 0 100px;\r\n}\r\n\r\n.filter_section {\r\n    @include flex-basic(row, null, null, null, baseline);\r\n    margin-left: 0;\r\n\r\n    h5:first-child {\r\n        margin-top: 20px;\r\n        margin-right: 28px;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-style: normal;\r\n        font-size: calc($font-size / 2);\r\n        color: $default_font_color;\r\n    }\r\n\r\n    .select_filter {\r\n        margin-top: 10px;\r\n    }\r\n}\r\n\r\n.media_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    row-gap: 30px;\r\n    column-gap: 95px;\r\n    margin-top: 20px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n////////////// END PHOTOGRAPHER PAGE ////////\r\n\r\n//////////////// 404 PAGE /////// \r\n.ERROR_404 {\r\n    position: absolute;\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n}\r\n\r\n////////////// END 404 PAGE ////////","footer {\r\n    height: 2px;\r\n    width: 100%;\r\n    background-color: $default_color;\r\n    margin-top: 75px;\r\n}","@media (max-width: 1100px) {\r\n\r\n    .photographer_section,\r\n    .media_section {\r\n        grid-template-columns: 1fr 1fr;\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 800px) {\r\n\r\n    header {\r\n        flex-direction: column;\r\n        margin-top: 40px;\r\n        height: 100px;\r\n\r\n        .logo_photographer {\r\n            margin-left: 0;\r\n        }\r\n\r\n        .logo,\r\n        h1 {\r\n            margin-left: 20px;\r\n            margin-right: 20px;\r\n            font-size: calc($font_size / 1.20);\r\n        }\r\n    }\r\n\r\n    .margin_left_right {\r\n        margin: 0 20px;\r\n    }\r\n\r\n\r\n    .filter_section {\r\n        justify-content: space-between;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n\r\n    .photographer_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!../../node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js??ruleSet[1].rules[1].use[3]!./src/scss/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module) {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ (function(module) {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ (function(module) {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!************************************!*\
  !*** ./src/scripts/pages/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_regexp_flags_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.flags.js */ "./node_modules/core-js/modules/es.regexp.flags.js");
/* harmony import */ var core_js_modules_es_regexp_flags_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_flags_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_immediate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.immediate.js */ "./node_modules/core-js/modules/web.immediate.js");
/* harmony import */ var core_js_modules_web_immediate_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_immediate_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/fetch */ "./src/scripts/utils/fetch.js");
/* harmony import */ var _data_displayData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../data/displayData */ "./src/scripts/data/displayData.js");






async function initMain() {
  // Try to get data from photographes if error then redirect to 404 page
  try {
    const photographers = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_3__.getPhotographers)();
    (0,_data_displayData__WEBPACK_IMPORTED_MODULE_4__.displayDataAll)(photographers, ".photographer_section");
    console.log("Page initialiser avec succès depuis initMain()");
  } catch (e) {
    console.error(e); // If it's a fail then we redirect to 404 Error Page since initMain() it's the minimal functionality
    // Atm 404 error page doesn't exists must be write later

    console.error("Rediriger vers la page 404");
  }
}

initMain();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxNQUFNLE9BQU8sVUFBVSxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxZQUFZLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLE9BQU8sTUFBTSxXQUFXLE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLEtBQUssTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxLQUFLLFlBQVksS0FBSyxVQUFVLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE9BQU8sWUFBWSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsZUFBZSxhQUFhLFdBQVcsV0FBVyxjQUFjLGVBQWUsT0FBTyxNQUFNLFdBQVcsTUFBTSxRQUFRLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxPQUFPLE9BQU8sV0FBVyxhQUFhLGVBQWUsZUFBZSxPQUFPLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsT0FBTyxNQUFNLEtBQUssWUFBWSxVQUFVLGFBQWEsY0FBYyxlQUFlLGVBQWUsZUFBZSxZQUFZLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sS0FBSyxNQUFNLEtBQUssV0FBVyxhQUFhLGVBQWUsZUFBZSxlQUFlLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxRQUFRLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxLQUFLLFlBQVksTUFBTSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxZQUFZLFlBQVksV0FBVyxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxVQUFVLFlBQVksV0FBVyxNQUFNLE1BQU0sV0FBVyxZQUFZLGFBQWEsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxXQUFXLFdBQVcsUUFBUSxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxPQUFPLFlBQVksTUFBTSxVQUFVLFlBQVksYUFBYSxlQUFlLGVBQWUsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxPQUFPLFdBQVcsWUFBWSxXQUFXLFlBQVksV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLE9BQU8sTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksTUFBTSxVQUFVLFlBQVksV0FBVyxXQUFXLE1BQU0sT0FBTyxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLE9BQU8sV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsYUFBYSxhQUFhLGFBQWEsV0FBVyxNQUFNLE1BQU0sWUFBWSxZQUFZLFlBQVksV0FBVyxX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V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0dBO0FBQ0E7QUFDQTs7QUFHQSxlQUFlQyxRQUFmLEdBQTBCO0VBQ3RCO0VBQ0EsSUFBSTtJQUNBLE1BQU10RCxhQUFhLEdBQUcsTUFBTW1ELDhEQUFnQixFQUE1QztJQUNBeEMsaUVBQWMsQ0FBQ1gsYUFBRCxFQUFnQix1QkFBaEIsQ0FBZDtJQUNBTSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnREFBWjtFQUNILENBSkQsQ0FJRSxPQUFPZ0QsQ0FBUCxFQUFVO0lBQ1JqRCxPQUFPLENBQUM5USxLQUFSLENBQWMrVCxDQUFkLEVBRFEsQ0FFUjtJQUNBOztJQUNBakQsT0FBTyxDQUFDOVEsS0FBUixDQUFjLDRCQUFkO0VBQ0g7QUFDSjs7QUFFRDhULFFBQVEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LXNsaWNlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLWFjY2Vzc29yLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtZ2xvYmFsLXByb3BlcnR5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9leHBvcnQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZmFpbHMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYXBwbHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tbmFtZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaHRtbC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXB1cmUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtc3ltYm9sLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL21ha2UtYnVpbHQtaW4uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbWF0aC10cnVuYy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29yZGluYXJ5LXRvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vd24ta2V5cy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZmxhZ3MuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXguanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tb2JqZWN0LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdHJ5LXRvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdjgtcHJvdG90eXBlLWRlZmluZS1idWcuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdmFsaWRhdGUtYXJndW1lbnRzLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWFrLW1hcC1iYXNpYy1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnJlZ2V4cC5mbGFncy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmNsZWFyLWltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLnNldC1pbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9kYXRhL2Rpc3BsYXlEYXRhLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvZmFjdG9yaWVzL3Bob3RvZ3JhcGhlckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9kb20uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9mZXRjaC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3NzL21haW4uc2NzcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3NzL21haW4uc2Nzcz9iMzc5Iiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgdHJ5VG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdHJ5LXRvLXN0cmluZycpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYEFzc2VydDogSXNDYWxsYWJsZShhcmd1bWVudCkgaXMgdHJ1ZWBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChpc0NhbGxhYmxlKGFyZ3VtZW50KSkgcmV0dXJuIGFyZ3VtZW50O1xuICB0aHJvdyAkVHlwZUVycm9yKHRyeVRvU3RyaW5nKGFyZ3VtZW50KSArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciAkU3RyaW5nID0gU3RyaW5nO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBBc3NlcnQ6IFR5cGUoYXJndW1lbnQpIGlzIE9iamVjdGBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChpc09iamVjdChhcmd1bWVudCkpIHJldHVybiBhcmd1bWVudDtcbiAgdGhyb3cgJFR5cGVFcnJvcigkU3RyaW5nKGFyZ3VtZW50KSArICcgaXMgbm90IGFuIG9iamVjdCcpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcbnZhciBsZW5ndGhPZkFycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9sZW5ndGgtb2YtYXJyYXktbGlrZScpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgaW5kZXhPZiwgaW5jbHVkZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSBsZW5ndGhPZkFycmF5TGlrZShPKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuICBpbmRleE9mOiBjcmVhdGVNZXRob2QoZmFsc2UpXG59O1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVuY3VycnlUaGlzKFtdLnNsaWNlKTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxudmFyIHRvU3RyaW5nID0gdW5jdXJyeVRoaXMoe30udG9TdHJpbmcpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gc3RyaW5nU2xpY2UodG9TdHJpbmcoaXQpLCA4LCAtMSk7XG59O1xuIiwidmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgb3duS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vd24ta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSwgZXhjZXB0aW9ucykge1xuICB2YXIga2V5cyA9IG93bktleXMoc291cmNlKTtcbiAgdmFyIGRlZmluZVByb3BlcnR5ID0gZGVmaW5lUHJvcGVydHlNb2R1bGUuZjtcbiAgdmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoIWhhc093bih0YXJnZXQsIGtleSkgJiYgIShleGNlcHRpb25zICYmIGhhc093bihleGNlcHRpb25zLCBrZXkpKSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICAgIH1cbiAgfVxufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwidmFyIG1ha2VCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21ha2UtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgbmFtZSwgZGVzY3JpcHRvcikge1xuICBpZiAoZGVzY3JpcHRvci5nZXQpIG1ha2VCdWlsdEluKGRlc2NyaXB0b3IuZ2V0LCBuYW1lLCB7IGdldHRlcjogdHJ1ZSB9KTtcbiAgaWYgKGRlc2NyaXB0b3Iuc2V0KSBtYWtlQnVpbHRJbihkZXNjcmlwdG9yLnNldCwgbmFtZSwgeyBzZXR0ZXI6IHRydWUgfSk7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eS5mKHRhcmdldCwgbmFtZSwgZGVzY3JpcHRvcik7XG59O1xuIiwidmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgbWFrZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbWFrZS1idWlsdC1pbicpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcbiAgdmFyIHNpbXBsZSA9IG9wdGlvbnMuZW51bWVyYWJsZTtcbiAgdmFyIG5hbWUgPSBvcHRpb25zLm5hbWUgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubmFtZSA6IGtleTtcbiAgaWYgKGlzQ2FsbGFibGUodmFsdWUpKSBtYWtlQnVpbHRJbih2YWx1ZSwgbmFtZSwgb3B0aW9ucyk7XG4gIGlmIChvcHRpb25zLmdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2UgZGVmaW5lR2xvYmFsUHJvcGVydHkoa2V5LCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghb3B0aW9ucy51bnNhZmUpIGRlbGV0ZSBPW2tleV07XG4gICAgICBlbHNlIGlmIChPW2tleV0pIHNpbXBsZSA9IHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2UgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiAhb3B0aW9ucy5ub25Db25maWd1cmFibGUsXG4gICAgICB3cml0YWJsZTogIW9wdGlvbnMubm9uV3JpdGFibGVcbiAgICB9KTtcbiAgfSByZXR1cm4gTztcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgZGVmaW5lUHJvcGVydHkoZ2xvYmFsLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdsb2JhbFtrZXldID0gdmFsdWU7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBEZXRlY3QgSUU4J3MgaW5jb21wbGV0ZSBkZWZpbmVQcm9wZXJ0eSBpbXBsZW1lbnRhdGlvblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgMSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSlbMV0gIT0gNztcbn0pO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJ2YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gLyg/OmlwYWR8aXBob25lfGlwb2QpLiphcHBsZXdlYmtpdC9pLnRlc3QodXNlckFnZW50KTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzb2YoZ2xvYmFsLnByb2Nlc3MpID09ICdwcm9jZXNzJztcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ25hdmlnYXRvcicsICd1c2VyQWdlbnQnKSB8fCAnJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgRGVubyA9IGdsb2JhbC5EZW5vO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zIHx8IERlbm8gJiYgRGVuby52ZXJzaW9uO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjg7XG52YXIgbWF0Y2gsIHZlcnNpb247XG5cbmlmICh2OCkge1xuICBtYXRjaCA9IHY4LnNwbGl0KCcuJyk7XG4gIC8vIGluIG9sZCBDaHJvbWUsIHZlcnNpb25zIG9mIFY4IGlzbid0IFY4ID0gQ2hyb21lIC8gMTBcbiAgLy8gYnV0IHRoZWlyIGNvcnJlY3QgdmVyc2lvbnMgYXJlIG5vdCBpbnRlcmVzdGluZyBmb3IgdXNcbiAgdmVyc2lvbiA9IG1hdGNoWzBdID4gMCAmJiBtYXRjaFswXSA8IDQgPyAxIDogKyhtYXRjaFswXSArIG1hdGNoWzFdKTtcbn1cblxuLy8gQnJvd3NlckZTIE5vZGVKUyBgcHJvY2Vzc2AgcG9seWZpbGwgaW5jb3JyZWN0bHkgc2V0IGAudjhgIHRvIGAwLjBgXG4vLyBzbyBjaGVjayBgdXNlckFnZW50YCBldmVuIGlmIGAudjhgIGV4aXN0cywgYnV0IDBcbmlmICghdmVyc2lvbiAmJiB1c2VyQWdlbnQpIHtcbiAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykvKTtcbiAgaWYgKCFtYXRjaCB8fCBtYXRjaFsxXSA+PSA3NCkge1xuICAgIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9DaHJvbWVcXC8oXFxkKykvKTtcbiAgICBpZiAobWF0Y2gpIHZlcnNpb24gPSArbWF0Y2hbMV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJzaW9uO1xuIiwiLy8gSUU4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndG9TdHJpbmcnLFxuICAndmFsdWVPZidcbl07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgZGVmaW5lQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVHbG9iYWxQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtZ2xvYmFsLXByb3BlcnR5Jyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgICAgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5kb250Q2FsbEdldFNldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiAgb3B0aW9ucy5uYW1lICAgICAgICAgICAtIHRoZSAubmFtZSBvZiB0aGUgZnVuY3Rpb24gaWYgaXQgZG9lcyBub3QgbWF0Y2ggdGhlIGtleVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNvdXJjZSkge1xuICB2YXIgVEFSR0VUID0gb3B0aW9ucy50YXJnZXQ7XG4gIHZhciBHTE9CQUwgPSBvcHRpb25zLmdsb2JhbDtcbiAgdmFyIFNUQVRJQyA9IG9wdGlvbnMuc3RhdDtcbiAgdmFyIEZPUkNFRCwgdGFyZ2V0LCBrZXksIHRhcmdldFByb3BlcnR5LCBzb3VyY2VQcm9wZXJ0eSwgZGVzY3JpcHRvcjtcbiAgaWYgKEdMT0JBTCkge1xuICAgIHRhcmdldCA9IGdsb2JhbDtcbiAgfSBlbHNlIGlmIChTVEFUSUMpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWxbVEFSR0VUXSB8fCBkZWZpbmVHbG9iYWxQcm9wZXJ0eShUQVJHRVQsIHt9KTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQgPSAoZ2xvYmFsW1RBUkdFVF0gfHwge30pLnByb3RvdHlwZTtcbiAgfVxuICBpZiAodGFyZ2V0KSBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICBzb3VyY2VQcm9wZXJ0eSA9IHNvdXJjZVtrZXldO1xuICAgIGlmIChvcHRpb25zLmRvbnRDYWxsR2V0U2V0KSB7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgICAgIHRhcmdldFByb3BlcnR5ID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIH0gZWxzZSB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuICAgIEZPUkNFRCA9IGlzRm9yY2VkKEdMT0JBTCA/IGtleSA6IFRBUkdFVCArIChTVEFUSUMgPyAnLicgOiAnIycpICsga2V5LCBvcHRpb25zLmZvcmNlZCk7XG4gICAgLy8gY29udGFpbmVkIGluIHRhcmdldFxuICAgIGlmICghRk9SQ0VEICYmIHRhcmdldFByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc291cmNlUHJvcGVydHkgPT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIGRlZmluZUJ1aWx0SW4odGFyZ2V0LCBrZXksIHNvdXJjZVByb3BlcnR5LCBvcHRpb25zKTtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCJ2YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIGFwcGx5ID0gRnVuY3Rpb25Qcm90b3R5cGUuYXBwbHk7XG52YXIgY2FsbCA9IEZ1bmN0aW9uUHJvdG90eXBlLmNhbGw7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLXJlZmxlY3QgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgUmVmbGVjdCA9PSAnb2JqZWN0JyAmJiBSZWZsZWN0LmFwcGx5IHx8IChOQVRJVkVfQklORCA/IGNhbGwuYmluZChhcHBseSkgOiBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYWxsLmFwcGx5KGFwcGx5LCBhcmd1bWVudHMpO1xufSk7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgYUNhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtY2FsbGFibGUnKTtcbnZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgYmluZCA9IHVuY3VycnlUaGlzKHVuY3VycnlUaGlzLmJpbmQpO1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0KSB7XG4gIGFDYWxsYWJsZShmbik7XG4gIHJldHVybiB0aGF0ID09PSB1bmRlZmluZWQgPyBmbiA6IE5BVElWRV9CSU5EID8gYmluZChmbiwgdGhhdCkgOiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLWZ1bmN0aW9uLXByb3RvdHlwZS1iaW5kIC0tIHNhZmVcbiAgdmFyIHRlc3QgPSAoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KS5iaW5kKCk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgLS0gc2FmZVxuICByZXR1cm4gdHlwZW9mIHRlc3QgIT0gJ2Z1bmN0aW9uJyB8fCB0ZXN0Lmhhc093blByb3BlcnR5KCdwcm90b3R5cGUnKTtcbn0pO1xuIiwidmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBjYWxsID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGw7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX0JJTkQgPyBjYWxsLmJpbmQoY2FsbCkgOiBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYWxsLmFwcGx5KGNhbGwsIGFyZ3VtZW50cyk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgZ2V0RGVzY3JpcHRvciA9IERFU0NSSVBUT1JTICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbnZhciBFWElTVFMgPSBoYXNPd24oRnVuY3Rpb25Qcm90b3R5cGUsICduYW1lJyk7XG4vLyBhZGRpdGlvbmFsIHByb3RlY3Rpb24gZnJvbSBtaW5pZmllZCAvIG1hbmdsZWQgLyBkcm9wcGVkIGZ1bmN0aW9uIG5hbWVzXG52YXIgUFJPUEVSID0gRVhJU1RTICYmIChmdW5jdGlvbiBzb21ldGhpbmcoKSB7IC8qIGVtcHR5ICovIH0pLm5hbWUgPT09ICdzb21ldGhpbmcnO1xudmFyIENPTkZJR1VSQUJMRSA9IEVYSVNUUyAmJiAoIURFU0NSSVBUT1JTIHx8IChERVNDUklQVE9SUyAmJiBnZXREZXNjcmlwdG9yKEZ1bmN0aW9uUHJvdG90eXBlLCAnbmFtZScpLmNvbmZpZ3VyYWJsZSkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgRVhJU1RTOiBFWElTVFMsXG4gIFBST1BFUjogUFJPUEVSLFxuICBDT05GSUdVUkFCTEU6IENPTkZJR1VSQUJMRVxufTtcbiIsInZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgYmluZCA9IEZ1bmN0aW9uUHJvdG90eXBlLmJpbmQ7XG52YXIgY2FsbCA9IEZ1bmN0aW9uUHJvdG90eXBlLmNhbGw7XG52YXIgdW5jdXJyeVRoaXMgPSBOQVRJVkVfQklORCAmJiBiaW5kLmJpbmQoY2FsbCwgY2FsbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX0JJTkQgPyBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIGZuICYmIHVuY3VycnlUaGlzKGZuKTtcbn0gOiBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIGZuICYmIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2FsbC5hcHBseShmbiwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIGFGdW5jdGlvbiA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gaXNDYWxsYWJsZShhcmd1bWVudCkgPyBhcmd1bWVudCA6IHVuZGVmaW5lZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgbWV0aG9kKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGFGdW5jdGlvbihnbG9iYWxbbmFtZXNwYWNlXSkgOiBnbG9iYWxbbmFtZXNwYWNlXSAmJiBnbG9iYWxbbmFtZXNwYWNlXVttZXRob2RdO1xufTtcbiIsInZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG5cbi8vIGBHZXRNZXRob2RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXRtZXRob2Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFYsIFApIHtcbiAgdmFyIGZ1bmMgPSBWW1BdO1xuICByZXR1cm4gaXNOdWxsT3JVbmRlZmluZWQoZnVuYykgPyB1bmRlZmluZWQgOiBhQ2FsbGFibGUoZnVuYyk7XG59O1xuIiwidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1nbG9iYWwtdGhpcyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzIC0tIHNhZmVcbiAgY2hlY2sodHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZikgfHxcbiAgY2hlY2sodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuYyAtLSBmYWxsYmFja1xuICAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSkoKSB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSB1bmN1cnJ5VGhpcyh7fS5oYXNPd25Qcm9wZXJ0eSk7XG5cbi8vIGBIYXNPd25Qcm9wZXJ0eWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWhhc293bnByb3BlcnR5XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtaGFzb3duIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0Lmhhc093biB8fCBmdW5jdGlvbiBoYXNPd24oaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkodG9PYmplY3QoaXQpLCBrZXkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdkb2N1bWVudCcsICdkb2N1bWVudEVsZW1lbnQnKTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xuXG4vLyBUaGFua3MgdG8gSUU4IGZvciBpdHMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIURFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0ZUVsZW1lbnQoJ2RpdicpLCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH1cbiAgfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xudmFyIHNwbGl0ID0gdW5jdXJyeVRoaXMoJycuc3BsaXQpO1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHRocm93cyBhbiBlcnJvciBpbiByaGlubywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3JoaW5vL2lzc3Vlcy8zNDZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiAhJE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApO1xufSkgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNsYXNzb2YoaXQpID09ICdTdHJpbmcnID8gc3BsaXQoaXQsICcnKSA6ICRPYmplY3QoaXQpO1xufSA6ICRPYmplY3Q7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IHVuY3VycnlUaGlzKEZ1bmN0aW9uLnRvU3RyaW5nKTtcblxuLy8gdGhpcyBoZWxwZXIgYnJva2VuIGluIGBjb3JlLWpzQDMuNC4xLTMuNC40YCwgc28gd2UgY2FuJ3QgdXNlIGBzaGFyZWRgIGhlbHBlclxuaWYgKCFpc0NhbGxhYmxlKHN0b3JlLmluc3BlY3RTb3VyY2UpKSB7XG4gIHN0b3JlLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25Ub1N0cmluZyhpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsInZhciBOQVRJVkVfV0VBS19NQVAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2Vhay1tYXAtYmFzaWMtZGV0ZWN0aW9uJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEID0gJ09iamVjdCBhbHJlYWR5IGluaXRpYWxpemVkJztcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcbnZhciBzZXQsIGdldCwgaGFzO1xuXG52YXIgZW5mb3JjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaGFzKGl0KSA/IGdldChpdCkgOiBzZXQoaXQsIHt9KTtcbn07XG5cbnZhciBnZXR0ZXJGb3IgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmICghaXNPYmplY3QoaXQpIHx8IChzdGF0ZSA9IGdldChpdCkpLnR5cGUgIT09IFRZUEUpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQnKTtcbiAgICB9IHJldHVybiBzdGF0ZTtcbiAgfTtcbn07XG5cbmlmIChOQVRJVkVfV0VBS19NQVAgfHwgc2hhcmVkLnN0YXRlKSB7XG4gIHZhciBzdG9yZSA9IHNoYXJlZC5zdGF0ZSB8fCAoc2hhcmVkLnN0YXRlID0gbmV3IFdlYWtNYXAoKSk7XG4gIHZhciB3bWdldCA9IHVuY3VycnlUaGlzKHN0b3JlLmdldCk7XG4gIHZhciB3bWhhcyA9IHVuY3VycnlUaGlzKHN0b3JlLmhhcyk7XG4gIHZhciB3bXNldCA9IHVuY3VycnlUaGlzKHN0b3JlLnNldCk7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBpZiAod21oYXMoc3RvcmUsIGl0KSkgdGhyb3cgVHlwZUVycm9yKE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEKTtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICB3bXNldChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldChzdG9yZSwgaXQpIHx8IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21oYXMoc3RvcmUsIGl0KTtcbiAgfTtcbn0gZWxzZSB7XG4gIHZhciBTVEFURSA9IHNoYXJlZEtleSgnc3RhdGUnKTtcbiAgaGlkZGVuS2V5c1tTVEFURV0gPSB0cnVlO1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgaWYgKGhhc093bihpdCwgU1RBVEUpKSB0aHJvdyBUeXBlRXJyb3IoT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQpO1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShpdCwgU1RBVEUsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBoYXNPd24oaXQsIFNUQVRFKSA/IGl0W1NUQVRFXSA6IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gaGFzT3duKGl0LCBTVEFURSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgZ2V0OiBnZXQsXG4gIGhhczogaGFzLFxuICBlbmZvcmNlOiBlbmZvcmNlLFxuICBnZXR0ZXJGb3I6IGdldHRlckZvclxufTtcbiIsIi8vIGBJc0NhbGxhYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaXNjYWxsYWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmd1bWVudCA9PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09IE5BVElWRSA/IGZhbHNlXG4gICAgOiBpc0NhbGxhYmxlKGRldGVjdGlvbikgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcbiIsIi8vIHdlIGNhbid0IHVzZSBqdXN0IGBpdCA9PSBudWxsYCBzaW5jZSBvZiBgZG9jdW1lbnQuYWxsYCBzcGVjaWFsIGNhc2Vcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtSXNIVE1MRERBLWludGVybmFsLXNsb3QtYWVjXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPT09IG51bGwgfHwgaXQgPT09IHVuZGVmaW5lZDtcbn07XG4iLCJ2YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgZG9jdW1lbnRBbGwgPSB0eXBlb2YgZG9jdW1lbnQgPT0gJ29iamVjdCcgJiYgZG9jdW1lbnQuYWxsO1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLUlzSFRNTEREQS1pbnRlcm5hbC1zbG90XG52YXIgU1BFQ0lBTF9ET0NVTUVOVF9BTEwgPSB0eXBlb2YgZG9jdW1lbnRBbGwgPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnRBbGwgIT09IHVuZGVmaW5lZDtcblxubW9kdWxlLmV4cG9ydHMgPSBTUEVDSUFMX0RPQ1VNRU5UX0FMTCA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiBpc0NhbGxhYmxlKGl0KSB8fCBpdCA9PT0gZG9jdW1lbnRBbGw7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IGlzQ2FsbGFibGUoaXQpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG5cbm1vZHVsZS5leHBvcnRzID0gVVNFX1NZTUJPTF9BU19VSUQgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyICRTeW1ib2wgPSBnZXRCdWlsdEluKCdTeW1ib2wnKTtcbiAgcmV0dXJuIGlzQ2FsbGFibGUoJFN5bWJvbCkgJiYgaXNQcm90b3R5cGVPZigkU3ltYm9sLnByb3RvdHlwZSwgJE9iamVjdChpdCkpO1xufTtcbiIsInZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcblxuLy8gYExlbmd0aE9mQXJyYXlMaWtlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbGVuZ3Rob2ZhcnJheWxpa2Vcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdG9MZW5ndGgob2JqLmxlbmd0aCk7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1uYW1lJykuQ09ORklHVVJBQkxFO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBlbmZvcmNlSW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZW5mb3JjZTtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG52YXIgQ09ORklHVVJBQkxFX0xFTkdUSCA9IERFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eShmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0sICdsZW5ndGgnLCB7IHZhbHVlOiA4IH0pLmxlbmd0aCAhPT0gODtcbn0pO1xuXG52YXIgVEVNUExBVEUgPSBTdHJpbmcoU3RyaW5nKS5zcGxpdCgnU3RyaW5nJyk7XG5cbnZhciBtYWtlQnVpbHRJbiA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlLCBuYW1lLCBvcHRpb25zKSB7XG4gIGlmIChTdHJpbmcobmFtZSkuc2xpY2UoMCwgNykgPT09ICdTeW1ib2woJykge1xuICAgIG5hbWUgPSAnWycgKyBTdHJpbmcobmFtZSkucmVwbGFjZSgvXlN5bWJvbFxcKChbXildKilcXCkvLCAnJDEnKSArICddJztcbiAgfVxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmdldHRlcikgbmFtZSA9ICdnZXQgJyArIG5hbWU7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuc2V0dGVyKSBuYW1lID0gJ3NldCAnICsgbmFtZTtcbiAgaWYgKCFoYXNPd24odmFsdWUsICduYW1lJykgfHwgKENPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FICYmIHZhbHVlLm5hbWUgIT09IG5hbWUpKSB7XG4gICAgaWYgKERFU0NSSVBUT1JTKSBkZWZpbmVQcm9wZXJ0eSh2YWx1ZSwgJ25hbWUnLCB7IHZhbHVlOiBuYW1lLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgZWxzZSB2YWx1ZS5uYW1lID0gbmFtZTtcbiAgfVxuICBpZiAoQ09ORklHVVJBQkxFX0xFTkdUSCAmJiBvcHRpb25zICYmIGhhc093bihvcHRpb25zLCAnYXJpdHknKSAmJiB2YWx1ZS5sZW5ndGggIT09IG9wdGlvbnMuYXJpdHkpIHtcbiAgICBkZWZpbmVQcm9wZXJ0eSh2YWx1ZSwgJ2xlbmd0aCcsIHsgdmFsdWU6IG9wdGlvbnMuYXJpdHkgfSk7XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAob3B0aW9ucyAmJiBoYXNPd24ob3B0aW9ucywgJ2NvbnN0cnVjdG9yJykgJiYgb3B0aW9ucy5jb25zdHJ1Y3Rvcikge1xuICAgICAgaWYgKERFU0NSSVBUT1JTKSBkZWZpbmVQcm9wZXJ0eSh2YWx1ZSwgJ3Byb3RvdHlwZScsIHsgd3JpdGFibGU6IGZhbHNlIH0pO1xuICAgIC8vIGluIFY4IH4gQ2hyb21lIDUzLCBwcm90b3R5cGVzIG9mIHNvbWUgbWV0aG9kcywgbGlrZSBgQXJyYXkucHJvdG90eXBlLnZhbHVlc2AsIGFyZSBub24td3JpdGFibGVcbiAgICB9IGVsc2UgaWYgKHZhbHVlLnByb3RvdHlwZSkgdmFsdWUucHJvdG90eXBlID0gdW5kZWZpbmVkO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHZhciBzdGF0ZSA9IGVuZm9yY2VJbnRlcm5hbFN0YXRlKHZhbHVlKTtcbiAgaWYgKCFoYXNPd24oc3RhdGUsICdzb3VyY2UnKSkge1xuICAgIHN0YXRlLnNvdXJjZSA9IFRFTVBMQVRFLmpvaW4odHlwZW9mIG5hbWUgPT0gJ3N0cmluZycgPyBuYW1lIDogJycpO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG5cbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dGVuZC1uYXRpdmUgLS0gcmVxdWlyZWRcbkZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IG1ha2VCdWlsdEluKGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gaXNDYWxsYWJsZSh0aGlzKSAmJiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLnNvdXJjZSB8fCBpbnNwZWN0U291cmNlKHRoaXMpO1xufSwgJ3RvU3RyaW5nJyk7XG4iLCJ2YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5cbi8vIGBNYXRoLnRydW5jYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWF0aC50cnVuY1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tbWF0aC10cnVuYyAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGgudHJ1bmMgfHwgZnVuY3Rpb24gdHJ1bmMoeCkge1xuICB2YXIgbiA9ICt4O1xuICByZXR1cm4gKG4gPiAwID8gZmxvb3IgOiBjZWlsKShuKTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIFY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Y4LXByb3RvdHlwZS1kZWZpbmUtYnVnJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIEVOVU1FUkFCTEUgPSAnZW51bWVyYWJsZSc7XG52YXIgQ09ORklHVVJBQkxFID0gJ2NvbmZpZ3VyYWJsZSc7XG52YXIgV1JJVEFCTEUgPSAnd3JpdGFibGUnO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IFY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID8gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAodHlwZW9mIE8gPT09ICdmdW5jdGlvbicgJiYgUCA9PT0gJ3Byb3RvdHlwZScgJiYgJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzICYmIFdSSVRBQkxFIGluIEF0dHJpYnV0ZXMgJiYgIUF0dHJpYnV0ZXNbV1JJVEFCTEVdKSB7XG4gICAgdmFyIGN1cnJlbnQgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICAgIGlmIChjdXJyZW50ICYmIGN1cnJlbnRbV1JJVEFCTEVdKSB7XG4gICAgICBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgICAgIEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogQ09ORklHVVJBQkxFIGluIEF0dHJpYnV0ZXMgPyBBdHRyaWJ1dGVzW0NPTkZJR1VSQUJMRV0gOiBjdXJyZW50W0NPTkZJR1VSQUJMRV0sXG4gICAgICAgIGVudW1lcmFibGU6IEVOVU1FUkFCTEUgaW4gQXR0cmlidXRlcyA/IEF0dHJpYnV0ZXNbRU5VTUVSQUJMRV0gOiBjdXJyZW50W0VOVU1FUkFCTEVdLFxuICAgICAgICB3cml0YWJsZTogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuICB9IHJldHVybiAkZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG59IDogJGRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuICRkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyAkVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1Byb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzT3duKE8sIFApKSByZXR1cm4gY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKCFjYWxsKHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYsIE8sIFApLCBPW1BdKTtcbn07XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG52YXIgaGlkZGVuS2V5cyA9IGVudW1CdWdLZXlzLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHluYW1lc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5bmFtZXMgLS0gc2FmZVxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5c3ltYm9scyAtLSBzYWZlXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVuY3VycnlUaGlzKHt9LmlzUHJvdG90eXBlT2YpO1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgcHVzaCA9IHVuY3VycnlUaGlzKFtdLnB1c2gpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSAhaGFzT3duKGhpZGRlbktleXMsIGtleSkgJiYgaGFzT3duKE8sIGtleSkgJiYgcHVzaChyZXN1bHQsIGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXNPd24oTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcHVzaChyZXN1bHQsIGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBOYXNob3JuIH4gSkRLOCBidWdcbnZhciBOQVNIT1JOX0JVRyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiAhJHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAxOiAyIH0sIDEpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZWAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUucHJvcGVydHlpc2VudW1lcmFibGVcbmV4cG9ydHMuZiA9IE5BU0hPUk5fQlVHID8gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBWKTtcbiAgcmV0dXJuICEhZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGU7XG59IDogJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwidmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBPcmRpbmFyeVRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb3JkaW5hcnl0b3ByaW1pdGl2ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIHByZWYpIHtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChwcmVmID09PSAnc3RyaW5nJyAmJiBpc0NhbGxhYmxlKGZuID0gaW5wdXQudG9TdHJpbmcpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAoaXNDYWxsYWJsZShmbiA9IGlucHV0LnZhbHVlT2YpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAocHJlZiAhPT0gJ3N0cmluZycgJiYgaXNDYWxsYWJsZShmbiA9IGlucHV0LnRvU3RyaW5nKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgJFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxudmFyIGNvbmNhdCA9IHVuY3VycnlUaGlzKFtdLmNvbmNhdCk7XG5cbi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdvd25LZXlzJykgfHwgZnVuY3Rpb24gb3duS2V5cyhpdCkge1xuICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZihhbk9iamVjdChpdCkpO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBjb25jYXQoa2V5cywgZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSkgOiBrZXlzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NgIGdldHRlciBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKHRoYXQuaGFzSW5kaWNlcykgcmVzdWx0ICs9ICdkJztcbiAgaWYgKHRoYXQuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZiAodGhhdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmICh0aGF0LmRvdEFsbCkgcmVzdWx0ICs9ICdzJztcbiAgaWYgKHRoYXQudW5pY29kZSkgcmVzdWx0ICs9ICd1JztcbiAgaWYgKHRoYXQudW5pY29kZVNldHMpIHJlc3VsdCArPSAndic7XG4gIGlmICh0aGF0LnN0aWNreSkgcmVzdWx0ICs9ICd5JztcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJ2YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGl0KSkgdGhyb3cgJFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBkZWZpbmVHbG9iYWxQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtZ2xvYmFsLXByb3BlcnR5Jyk7XG5cbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IGRlZmluZUdsb2JhbFByb3BlcnR5KFNIQVJFRCwge30pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlO1xuIiwidmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogJzMuMjUuMCcsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxNC0yMDIyIERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJyxcbiAgbGljZW5zZTogJ2h0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2Jsb2IvdjMuMjUuMC9MSUNFTlNFJyxcbiAgc291cmNlOiAnaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMnXG59KTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGVzLXgvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eXN5bWJvbHMgLS0gcmVxdWlyZWQgZm9yIHRlc3Rpbmdcbm1vZHVsZS5leHBvcnRzID0gISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBzeW1ib2wgPSBTeW1ib2woKTtcbiAgLy8gQ2hyb21lIDM4IFN5bWJvbCBoYXMgaW5jb3JyZWN0IHRvU3RyaW5nIGNvbnZlcnNpb25cbiAgLy8gYGdldC1vd24tcHJvcGVydHktc3ltYm9sc2AgcG9seWZpbGwgc3ltYm9scyBjb252ZXJ0ZWQgdG8gb2JqZWN0IGFyZSBub3QgU3ltYm9sIGluc3RhbmNlc1xuICByZXR1cm4gIVN0cmluZyhzeW1ib2wpIHx8ICEoT2JqZWN0KHN5bWJvbCkgaW5zdGFuY2VvZiBTeW1ib2wpIHx8XG4gICAgLy8gQ2hyb21lIDM4LTQwIHN5bWJvbHMgYXJlIG5vdCBpbmhlcml0ZWQgZnJvbSBET00gY29sbGVjdGlvbnMgcHJvdG90eXBlcyB0byBpbnN0YW5jZXNcbiAgICAhU3ltYm9sLnNoYW0gJiYgVjhfVkVSU0lPTiAmJiBWOF9WRVJTSU9OIDwgNDE7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgYXBwbHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYXBwbHknKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9odG1sJyk7XG52YXIgYXJyYXlTbGljZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zbGljZScpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcbnZhciB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy92YWxpZGF0ZS1hcmd1bWVudHMtbGVuZ3RoJyk7XG52YXIgSVNfSU9TID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MnKTtcbnZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG5cbnZhciBzZXQgPSBnbG9iYWwuc2V0SW1tZWRpYXRlO1xudmFyIGNsZWFyID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBEaXNwYXRjaCA9IGdsb2JhbC5EaXNwYXRjaDtcbnZhciBGdW5jdGlvbiA9IGdsb2JhbC5GdW5jdGlvbjtcbnZhciBNZXNzYWdlQ2hhbm5lbCA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbDtcbnZhciBTdHJpbmcgPSBnbG9iYWwuU3RyaW5nO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgbG9jYXRpb24sIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xuXG50cnkge1xuICAvLyBEZW5vIHRocm93cyBhIFJlZmVyZW5jZUVycm9yIG9uIGBsb2NhdGlvbmAgYWNjZXNzIHdpdGhvdXQgYC0tbG9jYXRpb25gIGZsYWdcbiAgbG9jYXRpb24gPSBnbG9iYWwubG9jYXRpb247XG59IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG5cbnZhciBydW4gPSBmdW5jdGlvbiAoaWQpIHtcbiAgaWYgKGhhc093bihxdWV1ZSwgaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcblxudmFyIHJ1bm5lciA9IGZ1bmN0aW9uIChpZCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJ1bihpZCk7XG4gIH07XG59O1xuXG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcnVuKGV2ZW50LmRhdGEpO1xufTtcblxudmFyIHBvc3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgLy8gb2xkIGVuZ2luZXMgaGF2ZSBub3QgbG9jYXRpb24ub3JpZ2luXG4gIGdsb2JhbC5wb3N0TWVzc2FnZShTdHJpbmcoaWQpLCBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyBsb2NhdGlvbi5ob3N0KTtcbn07XG5cbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmICghc2V0IHx8ICFjbGVhcikge1xuICBzZXQgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoaGFuZGxlcikge1xuICAgIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDEpO1xuICAgIHZhciBmbiA9IGlzQ2FsbGFibGUoaGFuZGxlcikgPyBoYW5kbGVyIDogRnVuY3Rpb24oaGFuZGxlcik7XG4gICAgdmFyIGFyZ3MgPSBhcnJheVNsaWNlKGFyZ3VtZW50cywgMSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwcGx5KGZuLCB1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpIHtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYgKElTX05PREUpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhydW5uZXIoaWQpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KHJ1bm5lcihpZCkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgLy8gZXhjZXB0IGlPUyAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82MjRcbiAgfSBlbHNlIGlmIChNZXNzYWdlQ2hhbm5lbCAmJiAhSVNfSU9TKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBiaW5kKHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmIChcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJlxuICAgIGlzQ2FsbGFibGUoZ2xvYmFsLnBvc3RNZXNzYWdlKSAmJlxuICAgICFnbG9iYWwuaW1wb3J0U2NyaXB0cyAmJlxuICAgIGxvY2F0aW9uICYmIGxvY2F0aW9uLnByb3RvY29sICE9PSAnZmlsZTonICYmXG4gICAgIWZhaWxzKHBvc3QpXG4gICkge1xuICAgIGRlZmVyID0gcG9zdDtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmIChPTlJFQURZU1RBVEVDSEFOR0UgaW4gY3JlYXRlRWxlbWVudCgnc2NyaXB0JykpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgc2V0VGltZW91dChydW5uZXIoaWQpLCAwKTtcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgY2xlYXI6IGNsZWFyXG59O1xuIiwidmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIEhlbHBlciBmb3IgYSBwb3B1bGFyIHJlcGVhdGluZyBjYXNlIG9mIHRoZSBzcGVjOlxuLy8gTGV0IGludGVnZXIgYmUgPyBUb0ludGVnZXIoaW5kZXgpLlxuLy8gSWYgaW50ZWdlciA8IDAsIGxldCByZXN1bHQgYmUgbWF4KChsZW5ndGggKyBpbnRlZ2VyKSwgMCk7IGVsc2UgbGV0IHJlc3VsdCBiZSBtaW4oaW50ZWdlciwgbGVuZ3RoKS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgdmFyIGludGVnZXIgPSB0b0ludGVnZXJPckluZmluaXR5KGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwiLy8gdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEluZGV4ZWRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShpdCkpO1xufTtcbiIsInZhciB0cnVuYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9tYXRoLXRydW5jJyk7XG5cbi8vIGBUb0ludGVnZXJPckluZmluaXR5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9pbnRlZ2Vyb3JpbmZpbml0eVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIG51bWJlciA9ICthcmd1bWVudDtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgcmV0dXJuIG51bWJlciAhPT0gbnVtYmVyIHx8IG51bWJlciA9PT0gMCA/IDAgOiB0cnVuYyhudW1iZXIpO1xufTtcbiIsInZhciB0b0ludGVnZXJPckluZmluaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHknKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2xlbmd0aFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGFyZ3VtZW50ID4gMCA/IG1pbih0b0ludGVnZXJPckluZmluaXR5KGFyZ3VtZW50KSwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuICRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudCkpO1xufTtcbiIsInZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcbnZhciBnZXRNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LW1ldGhvZCcpO1xudmFyIG9yZGluYXJ5VG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3JkaW5hcnktdG8tcHJpbWl0aXZlJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xudmFyIFRPX1BSSU1JVElWRSA9IHdlbGxLbm93blN5bWJvbCgndG9QcmltaXRpdmUnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBwcmVmKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpIHx8IGlzU3ltYm9sKGlucHV0KSkgcmV0dXJuIGlucHV0O1xuICB2YXIgZXhvdGljVG9QcmltID0gZ2V0TWV0aG9kKGlucHV0LCBUT19QUklNSVRJVkUpO1xuICB2YXIgcmVzdWx0O1xuICBpZiAoZXhvdGljVG9QcmltKSB7XG4gICAgaWYgKHByZWYgPT09IHVuZGVmaW5lZCkgcHJlZiA9ICdkZWZhdWx0JztcbiAgICByZXN1bHQgPSBjYWxsKGV4b3RpY1RvUHJpbSwgaW5wdXQsIHByZWYpO1xuICAgIGlmICghaXNPYmplY3QocmVzdWx0KSB8fCBpc1N5bWJvbChyZXN1bHQpKSByZXR1cm4gcmVzdWx0O1xuICAgIHRocm93ICRUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG4gIH1cbiAgaWYgKHByZWYgPT09IHVuZGVmaW5lZCkgcHJlZiA9ICdudW1iZXInO1xuICByZXR1cm4gb3JkaW5hcnlUb1ByaW1pdGl2ZShpbnB1dCwgcHJlZik7XG59O1xuIiwidmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXN5bWJvbCcpO1xuXG4vLyBgVG9Qcm9wZXJ0eUtleWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJvcGVydHlrZXlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShhcmd1bWVudCwgJ3N0cmluZycpO1xuICByZXR1cm4gaXNTeW1ib2woa2V5KSA/IGtleSA6IGtleSArICcnO1xufTtcbiIsInZhciAkU3RyaW5nID0gU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB0cnkge1xuICAgIHJldHVybiAkU3RyaW5nKGFyZ3VtZW50KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gJ09iamVjdCc7XG4gIH1cbn07XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbnZhciBpZCA9IDA7XG52YXIgcG9zdGZpeCA9IE1hdGgucmFuZG9tKCk7XG52YXIgdG9TdHJpbmcgPSB1bmN1cnJ5VGhpcygxLjAudG9TdHJpbmcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJyArIChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5KSArICcpXycgKyB0b1N0cmluZygrK2lkICsgcG9zdGZpeCwgMzYpO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGVzLXgvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTFxuICAmJiAhU3ltYm9sLnNoYW1cbiAgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJztcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIFY4IH4gQ2hyb21lIDM2LVxuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzMzNFxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgJ3Byb3RvdHlwZScsIHtcbiAgICB2YWx1ZTogNDIsXG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pLnByb3RvdHlwZSAhPSA0Mjtcbn0pO1xuIiwidmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhc3NlZCwgcmVxdWlyZWQpIHtcbiAgaWYgKHBhc3NlZCA8IHJlcXVpcmVkKSB0aHJvdyAkVHlwZUVycm9yKCdOb3QgZW5vdWdoIGFyZ3VtZW50cycpO1xuICByZXR1cm4gcGFzc2VkO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQ2FsbGFibGUoV2Vha01hcCkgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KFN0cmluZyhXZWFrTWFwKSk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIHN5bWJvbEZvciA9IFN5bWJvbCAmJiBTeW1ib2xbJ2ZvciddO1xudmFyIGNyZWF0ZVdlbGxLbm93blN5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gU3ltYm9sIDogU3ltYm9sICYmIFN5bWJvbC53aXRob3V0U2V0dGVyIHx8IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhc093bihXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpIHx8ICEoTkFUSVZFX1NZTUJPTCB8fCB0eXBlb2YgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID09ICdzdHJpbmcnKSkge1xuICAgIHZhciBkZXNjcmlwdGlvbiA9ICdTeW1ib2wuJyArIG5hbWU7XG4gICAgaWYgKE5BVElWRV9TWU1CT0wgJiYgaGFzT3duKFN5bWJvbCwgbmFtZSkpIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IFN5bWJvbFtuYW1lXTtcbiAgICB9IGVsc2UgaWYgKFVTRV9TWU1CT0xfQVNfVUlEICYmIHN5bWJvbEZvcikge1xuICAgICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gc3ltYm9sRm9yKGRlc2NyaXB0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gY3JlYXRlV2VsbEtub3duU3ltYm9sKGRlc2NyaXB0aW9uKTtcbiAgICB9XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lQnVpbHRJbkFjY2Vzc29yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbi1hY2Nlc3NvcicpO1xudmFyIHJlZ0V4cEZsYWdzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1mbGFncycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIGJhYmVsLW1pbmlmeSBhbmQgQ2xvc3VyZSBDb21waWxlciB0cmFuc3BpbGVzIFJlZ0V4cCgnLicsICdkJykgLT4gLy4vZCBhbmQgaXQgY2F1c2VzIFN5bnRheEVycm9yXG52YXIgUmVnRXhwID0gZ2xvYmFsLlJlZ0V4cDtcbnZhciBSZWdFeHBQcm90b3R5cGUgPSBSZWdFeHAucHJvdG90eXBlO1xuXG52YXIgRk9SQ0VEID0gREVTQ1JJUFRPUlMgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgSU5ESUNFU19TVVBQT1JUID0gdHJ1ZTtcbiAgdHJ5IHtcbiAgICBSZWdFeHAoJy4nLCAnZCcpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIElORElDRVNfU1VQUE9SVCA9IGZhbHNlO1xuICB9XG5cbiAgdmFyIE8gPSB7fTtcbiAgLy8gbW9kZXJuIFY4IGJ1Z1xuICB2YXIgY2FsbHMgPSAnJztcbiAgdmFyIGV4cGVjdGVkID0gSU5ESUNFU19TVVBQT1JUID8gJ2RnaW1zeScgOiAnZ2ltc3knO1xuXG4gIHZhciBhZGRHZXR0ZXIgPSBmdW5jdGlvbiAoa2V5LCBjaHIpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBrZXksIHsgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBjYWxscyArPSBjaHI7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IH0pO1xuICB9O1xuXG4gIHZhciBwYWlycyA9IHtcbiAgICBkb3RBbGw6ICdzJyxcbiAgICBnbG9iYWw6ICdnJyxcbiAgICBpZ25vcmVDYXNlOiAnaScsXG4gICAgbXVsdGlsaW5lOiAnbScsXG4gICAgc3RpY2t5OiAneSdcbiAgfTtcblxuICBpZiAoSU5ESUNFU19TVVBQT1JUKSBwYWlycy5oYXNJbmRpY2VzID0gJ2QnO1xuXG4gIGZvciAodmFyIGtleSBpbiBwYWlycykgYWRkR2V0dGVyKGtleSwgcGFpcnNba2V5XSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG4gIHZhciByZXN1bHQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFJlZ0V4cFByb3RvdHlwZSwgJ2ZsYWdzJykuZ2V0LmNhbGwoTyk7XG5cbiAgcmV0dXJuIHJlc3VsdCAhPT0gZXhwZWN0ZWQgfHwgY2FsbHMgIT09IGV4cGVjdGVkO1xufSk7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLmZsYWdzYCBnZXR0ZXJcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0LXJlZ2V4cC5wcm90b3R5cGUuZmxhZ3NcbmlmIChGT1JDRUQpIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihSZWdFeHBQcm90b3R5cGUsICdmbGFncycsIHtcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBnZXQ6IHJlZ0V4cEZsYWdzXG59KTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjbGVhckltbWVkaWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90YXNrJykuY2xlYXI7XG5cbi8vIGBjbGVhckltbWVkaWF0ZWAgbWV0aG9kXG4vLyBodHRwOi8vdzNjLmdpdGh1Yi5pby9zZXRJbW1lZGlhdGUvI3NpLWNsZWFySW1tZWRpYXRlXG4kKHsgZ2xvYmFsOiB0cnVlLCBiaW5kOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCBmb3JjZWQ6IGdsb2JhbC5jbGVhckltbWVkaWF0ZSAhPT0gY2xlYXJJbW1lZGlhdGUgfSwge1xuICBjbGVhckltbWVkaWF0ZTogY2xlYXJJbW1lZGlhdGVcbn0pO1xuIiwiLy8gVE9ETzogUmVtb3ZlIHRoaXMgbW9kdWxlIGZyb20gYGNvcmUtanNANGAgc2luY2UgaXQncyBzcGxpdCB0byBtb2R1bGVzIGxpc3RlZCBiZWxvd1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuY2xlYXItaW1tZWRpYXRlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5zZXQtaW1tZWRpYXRlJyk7XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2V0SW1tZWRpYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Rhc2snKS5zZXQ7XG5cbi8vIGBzZXRJbW1lZGlhdGVgIG1ldGhvZFxuLy8gaHR0cDovL3czYy5naXRodWIuaW8vc2V0SW1tZWRpYXRlLyNzaS1zZXRJbW1lZGlhdGVcbiQoeyBnbG9iYWw6IHRydWUsIGJpbmQ6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIGZvcmNlZDogZ2xvYmFsLnNldEltbWVkaWF0ZSAhPT0gc2V0SW1tZWRpYXRlIH0sIHtcbiAgc2V0SW1tZWRpYXRlOiBzZXRJbW1lZGlhdGVcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiaW1wb3J0IHsgcGhvdG9ncmFwaGVyRmFjdG9yeSB9IGZyb20gXCIuLi9mYWN0b3JpZXMvcGhvdG9ncmFwaGVyRmFjdG9yeVwiO1xyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXNwbGF5RGF0YShwaG90b2dyYXBoZXJzLCBpZCkge1xyXG4gICAgbGV0IHBob3RvZ3JhcGhlclNlbGVjdGVkID0gXCJcIjtcclxuICAgIFxyXG4gICAgcGhvdG9ncmFwaGVycy5mb3JFYWNoKChwaG90b2dyYXBoZXIpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHBob3RvZ3JhcGhlci5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICAvLyBUaGVuIHdlIGFyZSBnb2luZyB1c2UgdGhlIFBob3RvZ3JhcGhlckZhY3RvcnkgdG8gc2V0IERPTVxyXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHsgY29uc29sZS5sb2cocGhvdG9ncmFwaGVyKTsgfVxyXG4gICAgICAgICAgICBjb25zdCBwaG90b2dyYXBoZXJNb2RlbCA9IHBob3RvZ3JhcGhlckZhY3RvcnkocGhvdG9ncmFwaGVyKTtcclxuICAgICAgICAgICAgcGhvdG9ncmFwaGVyTW9kZWwuc2V0UGhvdG9ncmFwaGVySGVhZGVyKCk7XHJcbiAgICAgICAgICAgIHBob3RvZ3JhcGhlck1vZGVsLnNldFN0aWNreUJhclByaWNlKCk7XHJcblxyXG4gICAgICAgICAgICBwaG90b2dyYXBoZXJTZWxlY3RlZCA9IHBob3RvZ3JhcGhlclxyXG4gICAgICAgICAgICAvLyBFbmQgb2YgUGhvdG9ncmFwaGVyRmFjdG9yeSBXb3JrXHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuICAgIHJldHVybiAocGhvdG9ncmFwaGVyU2VsZWN0ZWQpOyAvLyBSZXR1cm4gdGhlIHBob3RvZ3JhcGhlclNob3cgYXQgdGhlIGVuZFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlEYXRhQWxsKHBob3RvZ3JhcGhlcnMsIHF1ZXJ5U2VsZWN0b3IpIHtcclxuXHJcbiAgICBwaG90b2dyYXBoZXJzLmZvckVhY2goKHBob3RvZ3JhcGhlcikgPT4ge1xyXG5cclxuICAgICAgICAvLyBUaGVuIHdlIGFyZSBnb2luZyB1c2UgdGhlIFBob3RvZ3JhcGhlckZhY3RvcnkgdG8gZ2VuZXJhdGUgRE9NXHJcbiAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVyc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5U2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlck1vZGVsID0gcGhvdG9ncmFwaGVyRmFjdG9yeShwaG90b2dyYXBoZXIpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJDYXJkRE9NID0gcGhvdG9ncmFwaGVyTW9kZWwuZ2V0VXNlckNhcmRET00oKTtcclxuXHJcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7IGNvbnNvbGUubG9nKHBob3RvZ3JhcGhlcik7IH1cclxuICAgICAgICBpZiAodXNlckNhcmRET00pIHtcclxuICAgICAgICAgICAgcGhvdG9ncmFwaGVyc1NlY3Rpb24uYXBwZW5kQ2hpbGQodXNlckNhcmRET00pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBFbmQgb2YgUGhvdG9ncmFwaGVyRmFjdG9yeSBXb3JrXHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxufVxyXG5cclxuIiwiXHJcbmltcG9ydCB7IGJ1aWxkRWxlbWVudCwgaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQsIHNldElubmVySHRtbCwgc2V0QXJpYWxMYWJlbCB9IGZyb20gXCIuLi91dGlscy9kb21cIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwaG90b2dyYXBoZXJGYWN0b3J5KGRhdGEpIHtcclxuICAgIGNvbnN0IHsgbmFtZSwgaWQsIGNpdHksIGNvdW50cnksIHRhZ2xpbmUsIHBvcnRyYWl0LCBwcmljZSB9ID0gZGF0YTtcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIGNvbnN0IHBpY3R1cmUgPSBgYXNzZXRzL2ltYWdlcy8ke3BvcnRyYWl0fWA7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VXNlckNhcmRET00oKSB7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBET00gb25seSBpZiB3ZSBnb3QgYSBwaWN0dXJlIGEgaWQgYW5kIGEgbmFtZVxyXG4gICAgICAgIGlmIChuYW1lICYmIGlkICYmIHBvcnRyYWl0KSB7XHJcbiAgICAgICAgICAgIC8vIEJVSUxEIEEgQVJUSUNMRSBcclxuICAgICAgICAgICAgY29uc3QgYXJ0aWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhcnRpY2xlXCIpO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicGhvdG9ncmFwaGVyX2NhcmRcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgRHluYW1pcXVlIExJTksgd2l0aCBQaWN0dXJlXHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtFbGVtZW50ID0gYXJ0aWNsZS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgIGJ1aWxkRWxlbWVudChcImFcIiwgYHBob3RvZ3JhcGhlci5odG1sP2lkPSR7aWR9YCkgLy8gQnVpbGQgQUhyZWZcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgc2V0QXJpYWxMYWJlbChsaW5rRWxlbWVudCwgYExpbmsgdG8gJHtuYW1lfWApOyAvLyBTZXQgQXJpZWxMYWJlbCB0byBBSHJlZlxyXG4gICAgICAgICAgICBpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudChsaW5rRWxlbWVudCwgcGljdHVyZSwgbmFtZSk7XHJcbiAgICAgICAgICAgIC8vIEVORCBDcmVhdGUgRHluYW1pcXVlIExJTksgd2l0aCBQaWN0dXJlXHJcblxyXG4gICAgICAgICAgICBhcnRpY2xlLmFwcGVuZENoaWxkKGJ1aWxkRWxlbWVudChcImgyXCIsIG5hbWUpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaXR5ICYmIGNvdW50cnkpIHtcclxuICAgICAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDNcIiwgYCR7Y2l0eX0sICR7Y291bnRyeX1gKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhZ2xpbmUpIHtcclxuICAgICAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDRcIiwgdGFnbGluZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcmljZSkge1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoNVwiLCBgJHtwcmljZX3igqwvam91cmApKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUkVUVVJOIEEgQVJUSUNMRSBcclxuICAgICAgICAgICAgcmV0dXJuIGFydGljbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFBob3RvZ3JhcGhlckhlYWRlcigpIHtcclxuICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDFcIiwgbmFtZSk7XHJcbiAgICAgICAgaWYgKGNpdHkgJiYgY291bnRyeSkge1xyXG4gICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDJcIiwgYCR7Y2l0eX0sICR7Y291bnRyeX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoMlwiLCBcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGgzXCIsIHRhZ2xpbmUpO1xyXG5cclxuICAgICAgICAvKiogV0UgVVNFIGEgZGlmZmVyZW50IG1ldGhvZCB0aGF0IGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KCkgc2luY2UgcGljdHVyZSBpcyBhbHJlYWR5IGluIHRoZSBET00gKi9cclxuICAgICAgICBjb25zdCBpbWdQcm9maWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5waG90b2dyYXBoX2hlYWRlciBpbWdcIik7XHJcbiAgICAgICAgaW1nUHJvZmlsZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgcGljdHVyZSk7XHJcbiAgICAgICAgaW1nUHJvZmlsZS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgbmFtZSk7XHJcbiAgICAgICAgLyoqICovXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0U3RpY2t5QmFyUHJpY2UoKSB7XHJcbiAgICAgICAgaWYgKHByaWNlKSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5wcmljZV9yYXRlX2RhaWx5XCIsIGAke3ByaWNlfSDigqwgLyBqb3VyYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIucHJpY2VfcmF0ZV9kYWlseVwiLCBcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgbmFtZSwgcGljdHVyZSwgZ2V0VXNlckNhcmRET00sIHNldFBob3RvZ3JhcGhlckhlYWRlciwgc2V0U3RpY2t5QmFyUHJpY2UgfTtcclxufVxyXG4iLCIvLyBGdW5jdGlvbiBmb3IgYnVpbGQgRE9NXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudChlbGVtZW50LCBwaWN0dXJlLCBhbHQpIHtcclxuICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGA8aW1nIHNyYz1cIiR7cGljdHVyZX1cIiBhbHQ9XCIke2FsdH1cIj5gKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFZpZGVvSW5zaWRlRWxlbWVudChlbGVtZW50LCB2aWRlbywgYXJpYUxhYmVsKSB7XHJcblxyXG4gICAgaWYgKGFyaWFMYWJlbCkge1xyXG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIFxyXG4gICAgICAgIGA8dmlkZW8gc3JjPVwiJHt2aWRlb31cIiBhcmlhLWxhYmVsPVwiJHthcmlhTGFiZWx9XCI+YCk7XHJcblxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgJzx2aWRlbyBzcmM9XCInICsgdmlkZW8gKyAnXCI+Jyk7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEhUTUxBZnRlckVsZW1lbnQoZWxlbWVudCwgaHRtbCkge1xyXG4gICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmVuZFwiLCBodG1sKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRWxlbWVudChiYWxpc2UsIHZhbHVlKSB7XHJcbiAgICAvLyBDcmVhdGUgYmFsaXNlXHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChiYWxpc2UpO1xyXG5cclxuICAgIC8vIFNldCBBdHRyaWJ1dGUgb3IgVGV4dENvbnRlbmVkIGRlcGVuZCBvZiBiYWxpc2VcclxuICAgIHN3aXRjaCAoYmFsaXNlKSB7XHJcbiAgICAgICAgY2FzZSBcImFcIjpcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImltZ1wiOlxyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcInNyY1wiLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFyaWFsTGFiZWwoZWxlbWVudCwgYXJpYWxhYmVsKSB7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgYXJpYWxhYmVsKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldElubmVySHRtbChxdWVyeVNlbGVjdG9yLCB0ZXh0ZSkge1xyXG4gICAgY29uc3QgdGV4dGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeVNlbGVjdG9yKTtcclxuICAgIHRleHRlRWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0ZTtcclxufVxyXG4vLyBFbmQgRnVuY3Rpb24gZm9yIGJ1aWxkIERPTSIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEpTT04odXJsLCB0eXBlKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7IC8vIFdhaXQgZm9yIHRoZSBBc3luYyBGZWN0aCBGdW5jdGlvblxyXG5cclxuICAgIC8vIGZldGNoIHJldHVybnMgYW4gb2JqZWN0IHdpdGggYSByZXNwb25zZSBwcm9wZXJ0eSB3aGljaCBpZiBzZXQgdG8gZmFsc2UgbWVhbnMgdGhhdCB0aGUgY29ubmVjdGlvbiBpcyBub3QgZ29vZCBhbmQgc28gd2Ugc3RvcCB0aGUgZnVuY3Rpb24gXHJcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7IHRocm93IG5ldyBFcnJvcihcIlRocm93biBmcm9tIGZldGNoSlNPTigpXCIpOyB9XHJcblxyXG4gICAgbGV0IGpzb25SZXNwb25zZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTsgLy8gcGFyc2luZyBKU09OXHJcbiAgICByZXR1cm4ganNvblJlc3BvbnNlW3R5cGVdOyAvLyBHZXQgZGF0YSBmcm9tIHRoZSBBcnJheSB0aGF0IHdlIHdhbnRcclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UGhvdG9ncmFwaGVycygpIHtcclxuICAgIGNvbnN0IHVybCA9IFwiLi4vZGF0YS9waG90b2dyYXBoZXJzLmpzb25cIjsgLy8gRGF0YSBzb3VyY2UgLkpTT05cclxuICAgIGNvbnN0IHBob3RvZ3JhcGhlcnMgPSBhd2FpdCBmZXRjaEpTT04odXJsLCBcInBob3RvZ3JhcGhlcnNcIik7IC8vIHVzZSBmZXRjaEpTT04gZnVuY3Rpb24gZnJvbSB1dGlscy9mZXRjaC5qc1xyXG4gICAgcmV0dXJuIHBob3RvZ3JhcGhlcnM7IC8vIFJldHVybiBkYXRhIG9mIFBob3RvR3JhcGhlcnNcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldE1lZGlhcygpIHtcclxuICAgIGNvbnN0IHVybCA9IFwiLi4vZGF0YS9waG90b2dyYXBoZXJzLmpzb25cIjsgLy8gRGF0YSBzb3VyY2UgLkpTT05cclxuICAgIGNvbnN0IG1lZGlhcyA9IGF3YWl0IGZldGNoSlNPTih1cmwsIFwibWVkaWFcIik7IC8vIHVzZSBmZXRjaEpTT04gZnVuY3Rpb24gZnJvbSB1dGlscy9mZXRjaC5qc1xyXG4gICAgcmV0dXJuIG1lZGlhczsgLy8gUmV0dXJuIGRhdGEgb2YgTWVkaWFcclxufVxyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBjaGFyc2V0IFxcXCJVVEYtOFxcXCI7XFxuLyoqIFVzZWQgdG8gbG9hZCBhbGwgdmFyaWFibGVzIGZvciB0aGlzIHByb2plY3QgYWJvdXQgU0NTUyAqKi8gLyoqIEZPTlQgKiovXFxuLyoqIEVORCBGT05UICoqL1xcbi8qKiBDT0xPUiBWQVJJQUJMRVMgKiovXFxuLyoqIEVORCBDT0xPUiBWQVJJQUJMRVMgKiovXFxuLyoqIElNUE9SVCBHTE9CQUwgQ1NTIEZPUiBGT05UUyBIVE1MLCogU0VMRUNUT1IgKiovXFxuLyoqKioqKioqKioqKioqKioqKioqKiogR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1xcbmh0bWwsXFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgYW5pbWF0aW9uOiAxcyBlYXNlLWluIGZvcndhcmRzIGZhZGUtaW47XFxufVxcbkBrZXlmcmFtZXMgZmFkZS1pbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuXFxuLyoqKioqKioqKioqKioqKioqKioqKiogRU5EIEdFTkVSQUwgKioqKioqKioqKioqKioqKioqKioqKi9cXG4vKiogSU1QT1JUIE1JWElOICoqL1xcbi8qKiBJTVBPUlQgSEVBREVSIFNUWUxFUyAqKi9cXG5oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAxMjBweDtcXG59XFxuaGVhZGVyIGgxIHtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbiAgdG9wOiA0NHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxMDBweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDM2cHg7XFxuICBsaW5lLWhlaWdodDogNDdweDtcXG59XFxuaGVhZGVyIC5sb2dvLFxcbmhlYWRlciAubG9nb19waG90b2dyYXBoZXIge1xcbiAgaGVpZ2h0OiA1MHB4O1xcbn1cXG5oZWFkZXIgLmxvZ28ge1xcbiAgbWFyZ2luLWxlZnQ6IDExNXB4O1xcbn1cXG5oZWFkZXIgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXG4gIG1hcmdpbi1sZWZ0OiAxMDBweDtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSUyBDQVJEUyAqKi9cXG4ucGhvdG9ncmFwaGVyX2NhcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGltZyB7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxuICBoZWlnaHQ6IDIwMHB4O1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBpbWc6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGgyLFxcbi5waG90b2dyYXBoZXJfY2FyZCBoMyxcXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDQsXFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDIge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIGNvbG9yOiAjRDM1NzNDO1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDMge1xcbiAgZm9udC1zaXplOiAxMy4wMDEwODM0MjM2cHg7XFxuICBsaW5lLWhlaWdodDogMTdweDtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDQge1xcbiAgbWFyZ2luLXRvcDogMnB4O1xcbiAgZm9udC1zaXplOiAxMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDEzcHg7XFxuICBjb2xvcjogIzAwMDAwMDtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gIG1hcmdpbi10b3A6IDJweDtcXG4gIGZvbnQtc2l6ZTogOXB4O1xcbiAgbGluZS1oZWlnaHQ6IDEycHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzc1NzU3NTtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGgzIHtcXG4gICAgZm9udC1zaXplOiAxNi45MDE0MDg0NTA3cHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDQge1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDUge1xcbiAgICBmb250LXNpemU6IDExLjdweDtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDMge1xcbiAgICBmb250LXNpemU6IDE5LjUwMTYyNTEzNTRweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNCB7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNSB7XFxuICAgIGZvbnQtc2l6ZTogMTMuNXB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGltZyB7XFxuICAgIHdpZHRoOiAyMzBweDtcXG4gICAgaGVpZ2h0OiAyMzBweDtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBNT0RBTCBDT01QT05FTlQgKiovXFxuLm1vZGFsX2NvbnRhY3Qge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEQjg4NzY7XFxuICBwYWRkaW5nOiAzNXB4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgd2lkdGg6IDQ3JTtcXG4gIHRyYW5zaXRpb246IHdpZHRoIDAuNXMgZWFzZS1pbjtcXG59XFxuLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciB7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi10b3A6IC0yMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgI2Nsb3NlTW9kYWwge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG4ubW9kYWxfY29udGFjdCAubW9kYWxfaGVhZGVyICNjbG9zZU1vZGFsIC5kZWZhdWx0X2NvbG9yIHtcXG4gIGZpbGw6IHdoaXRlO1xcbn1cXG4ubW9kYWxfY29udGFjdCAubW9kYWxfaGVhZGVyICNjbG9zZU1vZGFsIC5jb2xvcl9wcmltYXJ5MSB7XFxuICBmaWxsOiAjOTAxQzFDO1xcbn1cXG4ubW9kYWxfY29udGFjdCAubW9kYWxfaGVhZGVyIGgyIHtcXG4gIGZvbnQtc2l6ZTogNjMuNzJweDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG4ubW9kYWxfY29udGFjdCBmb3JtIGlucHV0IHtcXG4gIGZvbnQtc2l6ZTogMzBweDtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcbi5tb2RhbF9jb250YWN0IGZvcm0gdGV4dGFyZWEge1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICByZXNpemU6IHZlcnRpY2FsO1xcbn1cXG4ubW9kYWxfY29udGFjdCBmb3JtIGlucHV0LFxcbi5tb2RhbF9jb250YWN0IGZvcm0gdGV4dGFyZWEge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDY4cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcbi5tb2RhbF9jb250YWN0IGZvcm0gbGFiZWwge1xcbiAgY29sb3I6ICMwMDAwMDA7XFxuICBmb250LXNpemU6IDM2cHg7XFxufVxcbi5tb2RhbF9jb250YWN0IGZvcm0gbGFiZWw6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcbn1cXG4ubW9kYWxfY29udGFjdCAuaGVscF9ibGluZCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uaGlkZV9jb250ZW50IHtcXG4gIGFuaW1hdGlvbjogMC41cyBlYXNlLWluIGZvcndhcmRzIGZhZGUtb2ZmO1xcbn1cXG5Aa2V5ZnJhbWVzIGZhZGUtb2ZmIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAwLjQ7XFxuICB9XFxufVxcblxcbi5zaG93X2NvbnRlbnQge1xcbiAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXG59XFxuQGtleWZyYW1lcyBmYWRlLWluIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMC40O1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5tb2RhbF9jb250YWN0IHtcXG4gICAgd2lkdGg6IDY1JTtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgaDIge1xcbiAgICBmb250LXNpemU6IDU0cHg7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcbiAgLm1vZGFsX2NvbnRhY3Qge1xcbiAgICB3aWR0aDogOTAlO1xcbiAgfVxcbiAgLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciBoMiB7XFxuICAgIGZvbnQtc2l6ZTogNDMuMnB4O1xcbiAgfVxcbiAgLm1vZGFsX2NvbnRhY3QgZm9ybSBsYWJlbCB7XFxuICAgIGZvbnQtc2l6ZTogMjcuNjkyMzA3NjkyM3B4O1xcbiAgfVxcbiAgLm1vZGFsX2NvbnRhY3QgZm9ybSBpbnB1dCB7XFxuICAgIGZvbnQtc2l6ZTogMjRweDtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IGZvcm0gdGV4dGFyZWEge1xcbiAgICBmb250LXNpemU6IDIwcHg7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgQ09OVEFDVCBCVVRUT04gQ09NUE9ORU5UICoqL1xcbi5maXNoZXllX2J1dHRvbiB7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDExcHg7XFxuICBtaW4td2lkdGg6IDE3MHB4O1xcbiAgbWluLWhlaWdodDogNzBweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5MDFDMUM7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBjb2xvciAwLjVzIGVhc2UtaW4sIGJhY2tncm91bmQtY29sb3IgMC41cyBlYXNlLWluO1xcbn1cXG4uZmlzaGV5ZV9idXR0b246aG92ZXIge1xcbiAgY29sb3I6ICMwMDAwMDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREI4ODc2O1xcbn1cXG5cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEggSEVBREVSIENPTVBPTkVOVCAqKi9cXG4ucGhvdG9ncmFwaF9oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBmbGV4LXdyYXA6IG5vLXdyYXA7XFxuICBhbGlnbi1jb250ZW50OiBmbGVkLWVuZDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNGQUZBRkE7XFxuICBoZWlnaHQ6IDMxM3B4O1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIHBhZGRpbmctbGVmdDogMzBweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDMwcHg7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBkaXY6bnRoLWNoaWxkKDMpIHtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgxLFxcbi5waG90b2dyYXBoX2hlYWRlciBoMixcXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxuICBmb250LXNpemU6IDYzLjcycHg7XFxuICBtYXJnaW4tYm90dG9tOiAtMTVweDtcXG4gIGNvbG9yOiAjRDM1NzNDO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDIge1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBmb250LXNpemU6IDIzLjIyNTgwNjQ1MTZweDtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgY29sb3I6ICM1MjUyNTI7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9hYm91dCxcXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2J1dHRvbiB7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiA4MHB4O1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYWJvdXQge1xcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAucGhvdG9ncmFwaF9oZWFkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBhbGlnbi1jb250ZW50OiBmbGVkLWVuZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nLXRvcDogMTVweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxuICAgIGZvbnQtc2l6ZTogNDEuNHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgyIHtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXG4gICAgZm9udC1zaXplOiAxNi4zNjM2MzYzNjM2cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9idXR0b24ge1xcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXG4gIC5waG90b2dyYXBoX2hlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWNvbnRlbnQ6IGZsZWQtZW5kO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gICAgYWxpZ24taXRlbXM6IGluaGVyaXQ7XFxuICAgIG1hcmdpbi1yaWdodDogMHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIG1hcmdpbi10b3A6IDIwMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyID4gLnBob3RvZ3JhcGhfYWJvdXQge1xcbiAgICBtYXJnaW4tbGVmdDogMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMSxcXG5oMixcXG5oMyB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciA+IC5waG90b2dyYXBoZXJfY2FyZCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgU0VMRUNUIEZJTFRFUiBDT01QT05FTlQgKiovXFxuLnNlbGVjdF9idXR0b24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJhY2tncm91bmQ6ICM5MDFDMUM7XFxuICBjb2xvcjogd2hpdGU7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNXB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLWNvbG9yOiBub25lO1xcbiAgd2lkdGg6IDE3MHB4O1xcbiAgaGVpZ2h0OiA3MHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxuICBjb250ZW50OiBcXFwiPlxcXCI7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxuICBmb250LXNpemU6IDI1cHg7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG4gIGZsb2F0OiByaWdodDtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG59XFxuXFxuLnNlbGVjdF9maWx0ZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG5cXG4uc2VsZWN0X2NvbnRlbnQge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQ6ICM5MDFDMUM7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNXB4O1xcbiAgbWluLXdpZHRoOiAxNjBweDtcXG4gIGJveC1zaGFkb3c6IDBweCAycHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICB6LWluZGV4OiAxO1xcbn1cXG4uc2VsZWN0X2NvbnRlbnQgLndoaXRlbGluZSB7XFxuICB3aWR0aDogOTAlO1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIG1hcmdpbi1sZWZ0OiA1JTtcXG59XFxuLnNlbGVjdF9jb250ZW50IGEge1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbjtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIHdpZHRoOiAxNzBweDtcXG4gIGhlaWdodDogNjBweDtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4uc2VsZWN0X2NvbnRlbnQgYTpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluO1xcbiAgY29sb3I6ICMwMDAwMDA7XFxufVxcblxcbi5zZWxlY3RfZmlsdGVyOmhvdmVyIC5zZWxlY3RfY29udGVudCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXG59XFxuXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgU1RBVElTVElDIENPTVBPTkVOVCAqKi9cXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEQjg4NzY7XFxuICBtaW4td2lkdGg6IDM3NnB4O1xcbiAgbWluLWhlaWdodDogODlweDtcXG4gIGJvdHRvbTogMDtcXG4gIHJpZ2h0OiAzOHB4O1xcbiAgei1pbmRleDogMjtcXG4gIG1hcmdpbi1ib3R0b206IC0yMnB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyAudG90YWxfbGlrZXMsXFxuLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMgLnByaWNlX3JhdGVfZGFpbHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDIzLjIyNTgwNjQ1MTZweDtcXG4gIGxpbmUtaGVpZ2h0OiAzMXB4O1xcbiAgY29sb3I6ICMwMDAwMDA7XFxuICBwYWRkaW5nLXRvcDogMThweDtcXG59XFxuLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMgLnRvdGFsX2xpa2VzOmFmdGVyIHtcXG4gIHBhZGRpbmctbGVmdDogNXB4O1xcbiAgY29udGVudDogXFxcIuKZpVxcXCI7XFxuICBmb250LXNpemU6IDMwLjg5MDMyMjU4MDZweDtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIE1FRElBIENBUkRTIENPTVBPTkVOVCAqKi9cXG4ubWVkaWFfY2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIG1heC13aWR0aDogMzUwcHg7XFxufVxcbi5tZWRpYV9jYXJkIGltZyxcXG4ubWVkaWFfY2FyZCB2aWRlbyB7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXgtaGVpZ2h0OiAzMDBweDtcXG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcbi5tZWRpYV9jYXJkIGltZzpob3ZlcixcXG4ubWVkaWFfY2FyZCB2aWRlbzpob3ZlciB7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuLm1lZGlhX2NhcmQgLmRldGFpbHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICBtYXJnaW4tdG9wOiA1cHg7XFxufVxcbi5tZWRpYV9jYXJkIGg2IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgY29sb3I6ICM5MDFDMUM7XFxufVxcbi5tZWRpYV9jYXJkIGg2Omxhc3QtY2hpbGQ6OmFmdGVyIHtcXG4gIGZvbnQtc2l6ZTogMzBweDtcXG4gIHBhZGRpbmctbGVmdDogMTBweDtcXG4gIGNvbnRlbnQ6IFxcXCLimaVcXFwiO1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIC5tZWRpYV9jYXJkIGltZyxcXG4ubWVkaWFfY2FyZCB7XFxuICAgIG1heC13aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBQQUdFUyAob3RoZXIpIFN0eWxlcyAqKi9cXG4ucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxuICBnYXA6IDcwcHg7XFxuICBtYXJnaW4tdG9wOiA3NXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNzVweDtcXG59XFxuXFxuLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXG4gIG1hcmdpbjogMCAxMDBweDtcXG59XFxuXFxuLmZpbHRlcl9zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcbi5maWx0ZXJfc2VjdGlvbiBoNTpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAyOHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBjb2xvcjogIzAwMDAwMDtcXG59XFxuLmZpbHRlcl9zZWN0aW9uIC5zZWxlY3RfZmlsdGVyIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbi5tZWRpYV9zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcbiAgcm93LWdhcDogMzBweDtcXG4gIGNvbHVtbi1nYXA6IDk1cHg7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNzVweDtcXG59XFxuXFxuLkVSUk9SXzQwNCB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbn1cXG5cXG4vKiogSU1QT1JUIEZPT1RFUiBTVFlMRVMgKiovXFxuZm9vdGVyIHtcXG4gIGhlaWdodDogMnB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIG1hcmdpbi10b3A6IDc1cHg7XFxufVxcblxcbi8qKiBJTVBPUlQgUkVTUE9OU0lWRSBTVFlMRVMgZm9yIE5vbiBDb21wb25lbnRzIEVsZW1lbnRzXFxuIChjb21wb25lbnRzIEVsZW1lbnRzIGdvdCB0aGVpciBvd24gUmVzcG9uc2l2ZSBSdWxlcyBpbiB0aGVpciBTdHlsZXNoZWV0KSAqKi9cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX3NlY3Rpb24sXFxuLm1lZGlhX3NlY3Rpb24ge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcbiAgaGVhZGVyIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgbWFyZ2luLXRvcDogNDBweDtcXG4gICAgaGVpZ2h0OiAxMDBweDtcXG4gIH1cXG4gIGhlYWRlciAubG9nb19waG90b2dyYXBoZXIge1xcbiAgICBtYXJnaW4tbGVmdDogMDtcXG4gIH1cXG4gIGhlYWRlciAubG9nbyxcXG5oZWFkZXIgaDEge1xcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbiAgICBmb250LXNpemU6IDMwcHg7XFxuICB9XFxuICAubWFyZ2luX2xlZnRfcmlnaHQge1xcbiAgICBtYXJnaW46IDAgMjBweDtcXG4gIH1cXG4gIC5maWx0ZXJfc2VjdGlvbiB7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAubWVkaWFfc2VjdGlvbiB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcbiAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9tYWluLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL192YXJpYWJsZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX2dsb2JhbC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9wYWdlcy9faGVhZGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19taXhpbi5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19waG90b2dyYXBoZXJfY2FyZHMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9tb2RhbC9fY29udGFjdC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19maXNoZXllX2J1dHRvbi5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19waG90b2dyYXBoX2hlYWRlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19zZWxlY3RfZmlsdGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3Bob3RvZ3JhcGhlcl9zdGF0aXN0aWMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fbWVkaWFfY2FyZHMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvcGFnZXMvX3BhZ2VzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3BhZ2VzL19mb290ZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX3Jlc3BvbnNpdmUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxnQkFBZ0I7QUFBaEIsNkRBQUEsRUFBQSxXQUFBO0FDTUEsZUFBQTtBQUVBLHNCQUFBO0FBU0EsMEJBQUE7QURmQSxrREFBQTtBRUZBLHNEQUFBO0FBQ0E7O0VBRUUsU0FBQTtFQUNBLFVBQUE7RUFDQSxzQkFBQTtBRk9GOztBRUhBO0VBQ0Usa0NEVFk7RUNVWixzQ0FBQTtBRk1GO0FFSkU7RUFDRTtJQUNFLFVBQUE7RUZNSjtFRUhFO0lBQ0UsVUFBQTtFRktKO0FBQ0Y7O0FFQUEsMERBQUE7QUZyQkEsbUJBQUE7QUFFQSwyQkFBQTtBR05BO0VDS0UsYUFBQTtFQUNBLG1CRExzQjtFQ2dCcEIsOEJEaEJxQztFQ29CckMsbUJEcEJvRDtFQUNwRCxhQUFBO0FIa0NKO0FHL0JJO0VBQ0ksY0ZNUztFRUxULFNBQUE7RUFDQSxtQkFBQTtFQUNBLGdCRlBZO0VFUVosZUZMSTtFRU1KLGlCQUFBO0FIaUNSO0FHOUJJOztFQUVJLFlBQUE7QUhnQ1I7QUc3Qkk7RUFDSSxrQkFBQTtBSCtCUjtBRzVCSTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7QUg4QlI7O0FBL0NBLGlDQUFBO0FLUkE7RURLRSxhQUFBO0VBQ0Esc0JDTHNCO0VEZ0JwQix1QkNoQndDO0VEb0J4QyxtQkNwQmdEO0VBQ2hELG9CQUFBO0FMOERKO0FLNURJO0VBQ0ksNENBQUE7RUFDQSx5QkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBTDhEUjtBSzVEUTtFQUNJLGVBQUE7RUFDQSwyQ0FBQTtBTDhEWjtBS3pESTs7OztFQUlJLGtDSnRCTTtFSXVCTixrQkFBQTtFQUNBLGdCSnZCWTtBRGtGcEI7QUt4REk7RUFDSSxnQkFBQTtFQUNBLGNKakJTO0VJa0JULGVKMUJJO0FEb0ZaO0FLdkRJO0VBQ0ksMEJBQUE7RUFDQSxpQkFBQTtFQUNBLGNKekJTO0FEa0ZqQjtBS3RESTtFQUNJLGVBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxjSmxDYTtBRDBGckI7QUtyREk7RUFDSSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjSnpDSztBRGdHYjs7QUtuREE7RUFFUTtJQUNJLDBCQUFBO0lBQ0EsZ0JBQUE7RUxxRFY7RUtsRE07SUFDSSxlQUFBO0lBQ0EsZ0JBQUE7RUxvRFY7RUtqRE07SUFDSSxpQkFBQTtJQUNBLGdCQUFBO0VMbURWO0FBQ0Y7QUs3Q0E7RUFFUTtJQUNJLDBCQUFBO0VMOENWO0VLM0NNO0lBQ0ksZUFBQTtFTDZDVjtFSzFDTTtJQUNJLGlCQUFBO0VMNENWO0VLekNNO0lBQ0ksWUFBQTtJQUNBLGFBQUE7RUwyQ1Y7QUFDRjtBQS9IQSw2QkFBQTtBTVZBO0VBQ0ksYUFBQTtFQUNBLGVBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGdDQUFBO0VBQ0EsNENBQUE7RUFDQSxrQkFBQTtFQUNBLHlCTFFlO0VLUGYsYUFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsOEJBQUE7QU40SUo7QU0xSUk7RUFDSSw4QkFBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0FONElSO0FNMUlRO0VBRUksZUFBQTtBTjJJWjtBTXpJWTtFQUNJLFdMbEJBO0FENkpoQjtBTXhJWTtFQUNJLGFMbkJDO0FENkpqQjtBTXJJUTtFQUNJLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBTnVJWjtBTW5JSTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7QU5xSVI7QU1sSUk7RUFDSSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FOb0lSO0FNaklJOztFQUdJLFdBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FOa0lSO0FNN0hJO0VBQ0ksY0wxRGE7RUsyRGIsZUxoRUk7QUQrTFo7QU01SEk7RUFDSSxnQkFBQTtBTjhIUjtBTTNISTtFQUNJLGFBQUE7QU42SFI7O0FNdEhBO0VBQ0kseUNBQUE7QU55SEo7QU12SEk7RUFDSTtJQUNJLFVBQUE7RU55SFY7RU10SE07SUFDSSxZQUFBO0VOd0hWO0FBQ0Y7O0FNbEhBO0VBQ0ksd0NBQUE7QU5xSEo7QU1uSEk7RUFDSTtJQUNJLFlBQUE7RU5xSFY7RU1sSE07SUFDSSxVQUFBO0VOb0hWO0FBQ0Y7O0FNN0dBO0VBRUk7SUFDSSxVQUFBO0VOK0dOO0VNNUdVO0lBQ0ksZUFBQTtFTjhHZDtBQUNGO0FNdEdBO0VBQ0k7SUFDSSxVQUFBO0VOd0dOO0VNckdVO0lBQ0ksaUJBQUE7RU51R2Q7RU1uR007SUFDSSwwQkFBQTtFTnFHVjtFTWxHTTtJQUNJLGVBQUE7RU5vR1Y7RU1qR007SUFDSSxlQUFBO0VObUdWO0FBQ0Y7QUEvT0Esc0NBQUE7QU9iQTtFQUNJLGVBQUE7RUFDQSxnQk5DYztFTUFkLGtDTkZVO0VNR1YsWU5LWTtFTUpaLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLHlCTkdhO0VNRmIsa0JBQUE7RUFDQSxlQUFBO0VBQ0EsNkRBQUE7QVArUEo7QU83UEk7RUFDSSxjTkxhO0VNTWIseUJBQUE7QVArUFI7O0FBaFFBLHlDQUFBO0FRZkE7RUpLRSxhQUFBO0VBQ0EsbUJJTHNCO0VKUXBCLGtCSVJ5QjtFSll6Qix1Qklaa0M7RUpnQmxDLDhCSWhCNEM7RUFDNUMseUJQYWtCO0VPWmxCLGFBQUE7RUFDQSxnQkFBQTtFSmdDRixrQkkvQmtDO0VKZ0NsQyxtQkloQ2tDO0FSd1JwQztBUXRSSTtFQUNJLGtCQUFBO0FSd1JSO0FRcFJJOzs7RUFHSSxrQ1BkTTtFT2VOLGdCUGRZO0FEb1NwQjtBUW5SSTtFQUNJLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxjUFRTO0FEOFJqQjtBUWxSSTtFQUNJLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQkFBQTtFQUNBLGNQakJTO0FEcVNqQjtBUWpSSTtFQUNJLGVBQUE7RUFDQSxjUHBCVztBRHVTbkI7QVFoUkk7O0VKaENGLGFBQUE7RUFDQSxzQklpQzBCO0VKdEJ4Qix1QklzQjRDO0VKbEI1Qyx1QklrQm9EO0FScVJ4RDtBUWxSSTtFQUNJLGdCQUFBO0VBQ0Esa0JBQUE7QVJvUlI7QVFqUkk7RUFDSSxpQkFBQTtFQUNBLG1CQUFBO0FSbVJSOztBUTlRQTtFQUNJO0lBQ0ksdUJQL0NRO0lHSmQsYUFBQTtJQUNBLHNCSW1EMEI7SUpoRHhCLGVJZ0RnQztJSjVDaEMsdUJJNENzQztJSnhDdEMsOEJJd0NnRDtJSnBDaEQsbUJJb0MrRDtJQUMzRCxpQkFBQTtFUnNSTjtFUW5SRTtJQUNJLGlCQUFBO0VScVJOO0VRbFJFO0lBQ0ksZUFBQTtFUm9STjtFUWhSRTtJQUNJLDBCQUFBO0VSa1JOO0VRL1FFO0lBQ0ksbUJBQUE7RVJpUk47QUFDRjtBUTFRQTtFQUNJO0lKL0VGLGFBQUE7SUFDQSxzQkkrRTBCO0lKeEV4Qix1Qkl3RXNDO0lKcEV0Qyw4QklvRWdEO0lKaEVoRCxtQklnRStEO0VSZ1JqRTtFUTlRTTtJQUNJLG9CQUFBO0lBQ0EsaUJBQUE7SUFDQSxrQkFBQTtJQUNBLGlCQUFBO0VSZ1JWO0VRM1FFO0lBQ0ksY0FBQTtJQUNBLG1CQUFBO0VSNlFOO0VRMVFFOzs7SUFHSSxrQkFBQTtFUjRRTjtFUXpRRTtJQUNJLGFBQUE7RVIyUU47QUFDRjtBQXZXQSxxQ0FBQTtBU2pCQTtFQUNJLGFBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFFQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NSUFU7RVFRVixrQkFBQTtFQUNBLGdCUlBjO0VRUWQsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsWVJKWTtFUUtaLDJCQUFBO0VBQ0EsNEJBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QVQwWEo7O0FTdlhBO0VBQ0ksbUNBQUE7RUFDQSxZQUFBO0VBQ0Esd0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QVQwWEo7O0FTdFhBO0VBRUksa0JBQUE7RUFDQSxxQkFBQTtBVHdYSjs7QVNwWEE7RUFDSSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQlJoQ2E7RVFpQ2IsOEJBQUE7RUFDQSwrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsOENBQUE7RUFDQSxVQUFBO0FUdVhKO0FTcFhJO0VBQ0ksVUFBQTtFQUNBLFdBQUE7RUFDQSx1QlI5Q1E7RVErQ1IsZUFBQTtBVHNYUjtBU25YSTtFQUNJLDRCQUFBO0VBQ0Esa0NSNURNO0VRNkROLGdCUjNEVTtFUTREVixlQUFBO0VBQ0EsWVJ2RFE7RVF3RFIsYUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxjQUFBO0FUcVhSO0FTbFhJO0VBQ0ksZUFBQTtFQUNBLDRCQUFBO0VBQ0EsY1JqRWE7QURxYnJCOztBUzVXQTtFQUVJLGNBQUE7QVQ4V0o7O0FTM1dBO0VBQ0kseUJBQUE7RUFDQSxtQ0FBQTtBVDhXSjs7QUFyYkEsOENBQUE7QVVuQkE7RU5LRSxhQUFBO0VBQ0EsbUJNTHNCO0VOWXBCLHlCTVorQjtFTmdCL0IsNkJNaEIyQztFTm9CM0MscUJNcEJ5RDtFQUN6RCxlQUFBO0VBQ0EseUJUYWU7RVNaZixnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtBVmdkSjtBVTVjSTs7RUFFSSxrQ1RmTTtFU2dCTixrQkFBQTtFQUNBLGdCVGZVO0VTZ0JWLDBCQUFBO0VBQ0EsaUJBQUE7RUFDQSxjVFhhO0VTWWIsaUJBQUE7QVY4Y1I7QVUxY0k7RUFDSSxpQkFBQTtFQUNBLFlBQUE7RUFDQSwwQkFBQTtBVjRjUjs7QVV2Y0E7RUFDSTtJQUNJLGFBQUE7RVYwY047QUFDRjtBQTFkQSxnREFBQTtBV3JCQTtFUEtFLGFBQUE7RUFDQSxzQk9Mc0I7RUFDcEIsZUFBQTtFQUNBLGdCQUFBO0FYbWZKO0FXamZJOztFQUVJLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0FYbWZSO0FXamZROztFQUNJLHlCQUFBO0VBQ0EsZUFBQTtFQUNBLDJDQUFBO0FYb2ZaO0FXN2VJO0VQbkJGLGFBQUE7RUFDQSxtQk9tQjBCO0VQUnhCLDhCT1F5QztFUEp6QyxxQk9Jd0Q7RUFDcEQsZUFBQTtBWGtmUjtBVy9lSTtFQUNJLGtDVjdCTTtFVThCTixrQkFBQTtFQUNBLGdCVjlCWTtFVStCWixlQUFBO0VBQ0EsY1Z0QlM7QUR1Z0JqQjtBVzllSTtFQUNJLGVBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7QVhnZlI7O0FXemVBO0VBRUk7O0lBRUksZUFBQTtFWDJlTjtBQUNGO0FBeGdCQSxrQ0FBQTtBWXRCQTtFQUNJLGFBQUE7RUFDQSxrQ0FBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FaaWlCSjs7QVkzaEJBO0VBQ0ksZUFBQTtBWjhoQko7O0FZM2hCQTtFUlhFLGFBQUE7RUFDQSxtQlFXc0I7RVJJcEIscUJRSjJDO0VBQzNDLGNBQUE7QVpnaUJKO0FZOWhCSTtFQUNJLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQ1h0Qk07RVd1Qk4sZ0JYckJVO0VXc0JWLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGNYakJhO0FEaWpCckI7QVk3aEJJO0VBQ0ksZ0JBQUE7QVoraEJSOztBWTNoQkE7RUFDSSxhQUFBO0VBQ0Esa0NBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FaOGhCSjs7QVl4aEJBO0VBQ0ksa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLGdDQUFBO0FaMmhCSjs7QUFyakJBLDJCQUFBO0FhekJBO0VBQ0ksV0FBQTtFQUNBLFdBQUE7RUFDQSx1QlpNWTtFWUxaLGdCQUFBO0Fia2xCSjs7QUEzakJBOzRFQUFBO0FjM0JBO0VBRUk7O0lBRUksOEJBQUE7RWQwbEJOO0FBQ0Y7QWNybEJBO0VBRUk7SUFDSSxzQkFBQTtJQUNBLGdCQUFBO0lBQ0EsYUFBQTtFZHNsQk47RWNwbEJNO0lBQ0ksY0FBQTtFZHNsQlY7RWNubEJNOztJQUVJLGlCQUFBO0lBQ0Esa0JBQUE7SUFDQSxlQUFBO0VkcWxCVjtFY2psQkU7SUFDSSxjQUFBO0VkbWxCTjtFYy9rQkU7SUFDSSw4QkFBQTtFZGlsQk47QUFDRjtBYzdrQkE7RUFFSTtJQUNJLDBCQUFBO0VkOGtCTjtBQUNGO0FjMWtCQTtFQUVJO0lBQ0ksMEJBQUE7RWQya0JOO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqIFVzZWQgdG8gbG9hZCBhbGwgdmFyaWFibGVzIGZvciB0aGlzIHByb2plY3QgYWJvdXQgU0NTUyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfdmFyaWFibGVzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgR0xPQkFMIENTUyBGT1IgRk9OVFMgSFRNTCwqIFNFTEVDVE9SICoqL1xcclxcbkBpbXBvcnQgXFxcIl9nbG9iYWwuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBNSVhJTiAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfbWl4aW4uc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBIRUFERVIgU1RZTEVTICoqL1xcclxcbkBpbXBvcnQgXFxcInBhZ2VzL2hlYWRlci5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUlMgQ0FSRFMgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9waG90b2dyYXBoZXJfY2FyZHMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBNT0RBTCBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9tb2RhbC9fY29udGFjdC5zY3NzXFxcIjtcXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL21vZGFsL19saWdodGJveC5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIENPTlRBQ1QgQlVUVE9OIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL2Zpc2hleWVfYnV0dG9uLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSCBIRUFERVIgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvcGhvdG9ncmFwaF9oZWFkZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBTRUxFQ1QgRklMVEVSIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3NlbGVjdF9maWx0ZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgU1RBVElTVElDIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3Bob3RvZ3JhcGhlcl9zdGF0aXN0aWMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgTUVESUEgQ0FSRFMgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvbWVkaWFfY2FyZHMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQQUdFUyAob3RoZXIpIFN0eWxlcyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJwYWdlcy9wYWdlcy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIEZPT1RFUiBTVFlMRVMgKiovXFxyXFxuQGltcG9ydCBcXFwicGFnZXMvZm9vdGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUkVTUE9OU0lWRSBTVFlMRVMgZm9yIE5vbiBDb21wb25lbnRzIEVsZW1lbnRzXFxyXFxuIChjb21wb25lbnRzIEVsZW1lbnRzIGdvdCB0aGVpciBvd24gUmVzcG9uc2l2ZSBSdWxlcyBpbiB0aGVpciBTdHlsZXNoZWV0KSAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfcmVzcG9uc2l2ZS5zY3NzXFxcIjtcIixcIi8qKiBGT05UICoqL1xcclxcbiRmb250X2dsb2JhbDogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcclxcbiRmb250X3dlaWdodF9zbWFsbDogNDAwO1xcclxcbiRmb250X3dlaWdodF9iaWc6IDcwMDtcXHJcXG5cXHJcXG4kZm9udF9zaXplOiAzNnB4O1xcclxcbi8qKiBFTkQgRk9OVCAqKi9cXHJcXG5cXHJcXG4vKiogQ09MT1IgVkFSSUFCTEVTICoqL1xcclxcbiRkZWZhdWx0X2NvbG9yOiB3aGl0ZTtcXHJcXG4kZGVmYXVsdF9mb250X2NvbG9yOiAjMDAwMDAwO1xcclxcbiRjb2xvcl9ncmF5OiAjNzU3NTc1O1xcclxcbiRjb2xvcl9wcmltYXJ5MTogIzkwMUMxQztcXHJcXG4kY29sb3JfcHJpbWFyeTI6ICNEMzU3M0M7XFxyXFxuJGNvbG9yX3NlY29uZGFyeTI6ICM1MjUyNTI7XFxyXFxuJGNvbG9yX3NlY29uZGFyeTJfYmc6ICNGQUZBRkE7XFxyXFxuJGNvbG9yX2JhY2tncm91bmQ6ICNEQjg4NzY7XFxyXFxuLyoqIEVORCBDT0xPUiBWQVJJQUJMRVMgKiovXCIsXCIvKioqKioqKioqKioqKioqKioqKioqKiBHRU5FUkFMICoqKioqKioqKioqKioqKioqKioqKiovXFxyXFxuaHRtbCxcXHJcXG4qIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICBhbmltYXRpb246IDFzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXHJcXG5cXHJcXG4gIEBrZXlmcmFtZXMgZmFkZS1pbiB7XFxyXFxuICAgIDAlIHtcXHJcXG4gICAgICBvcGFjaXR5OiAwO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIDEwMCUge1xcclxcbiAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4vKioqKioqKioqKioqKioqKioqKioqKiBFTkQgR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1wiLFwiaGVhZGVyIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIG51bGwsIHNwYWNlLWJldHdlZW4sIGNlbnRlcik7XFxyXFxuICAgIGhlaWdodDogMTIwcHg7XFxyXFxuXFxyXFxuXFxyXFxuICAgIGgxIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgICAgICB0b3A6IDQ0cHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwMHB4O1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiA0N3B4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvLFxcclxcbiAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvIHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMTVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEwMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cIixcIkBtaXhpbiBmbGV4LWJhc2ljKCRmbGV4LWRpcmVjdGlvbixcXHJcXG4gICRmbGV4LXdyYXAsXFxyXFxuICAkYWxpZ24tY29udGVudCxcXHJcXG4gICRqdXN0aWZ5LWNvbnRlbnQsXFxyXFxuICAkYWxpZ24taXRlbXMpIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogJGZsZXgtZGlyZWN0aW9uO1xcclxcblxcclxcbiAgQGlmICgkZmxleC13cmFwKSB7XFxyXFxuICAgIGZsZXgtd3JhcDogJGZsZXgtd3JhcDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIEBpZiAoJGFsaWduLWNvbnRlbnQpIHtcXHJcXG4gICAgYWxpZ24tY29udGVudDogJGFsaWduLWNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAaWYgKCRqdXN0aWZ5LWNvbnRlbnQpIHtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiAkanVzdGlmeS1jb250ZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgQGlmICgkYWxpZ24taXRlbXMpIHtcXHJcXG4gICAgYWxpZ24taXRlbXM6ICRhbGlnbi1pdGVtcztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLy8gQG1peGluIG1hc2stY3Jvc3Nicm93c2VyKCR2YWx1ZSkge1xcclxcbi8vICAgLXdlYmtpdC1tYXNrOiAkdmFsdWU7XFxyXFxuLy8gICBtYXNrOiAkdmFsdWU7XFxyXFxuLy8gfVxcclxcblxcclxcbi8vIEBtaXhpbiBtYXJnaW4tbGVmdC1hbmQtcmlnaHQoJHZhbHVlKSB7XFxyXFxuLy8gICBtYXJnaW4tbGVmdDogJHZhbHVlO1xcclxcbi8vICAgbWFyZ2luLXJpZ2h0OiAkdmFsdWU7XFxyXFxuLy8gfVxcclxcblxcclxcbkBtaXhpbiBwYWRkaW5nLWxlZnQtYW5kLXJpZ2h0KCR2YWx1ZSkge1xcclxcbiAgcGFkZGluZy1sZWZ0OiAkdmFsdWU7XFxyXFxuICBwYWRkaW5nLXJpZ2h0OiAkdmFsdWU7XFxyXFxufVwiLFwiLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIG51bGwsIGNlbnRlciwgY2VudGVyKTtcXHJcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIGltZyB7XFxyXFxuICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICBoZWlnaHQ6IDIwMHB4O1xcclxcbiAgICAgICAgd2lkdGg6IDIwMHB4O1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuXFxyXFxuICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41MCk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgaDIsXFxyXFxuICAgIGgzLFxcclxcbiAgICBoNCxcXHJcXG4gICAgaDUge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfc21hbGw7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDIge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTI7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAyLjc2OSk7XFxyXFxuICAgICAgICBsaW5lLWhlaWdodDogMTdweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDQge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAzLjYpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEzcHg7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoNSB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAycHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDQpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEycHg7XFxyXFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX2dyYXk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgaDMge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMi43NjkgKiAxLjMpO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAzLjYgKiAxLjMpO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyA0ICogMS4zKTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgaDMge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMi43NjkgKiAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDQge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMy42ICogMS41KTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGg1IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDQgKiAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaW1nIHtcXHJcXG4gICAgICAgICAgICB3aWR0aDogMjMwcHg7XFxyXFxuICAgICAgICAgICAgaGVpZ2h0OiAyMzBweDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbn1cIixcIi5tb2RhbF9jb250YWN0IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICB0b3A6IDUwJTtcXHJcXG4gICAgbGVmdDogNTAlO1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXHJcXG4gICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIHBhZGRpbmc6IDM1cHg7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAgd2lkdGg6IDQ3JTtcXHJcXG4gICAgdHJhbnNpdGlvbjogd2lkdGggMC41cyBlYXNlLWluO1xcclxcblxcclxcbiAgICAubW9kYWxfaGVhZGVyIHtcXHJcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogLTIwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbiAgICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXHJcXG5cXHJcXG4gICAgICAgICNjbG9zZU1vZGFsIHtcXHJcXG4gICAgICAgICAgICAvLyBDbG9zZSBNb2RhbCBQaWN0dXJlXFxyXFxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcblxcclxcbiAgICAgICAgICAgIC5kZWZhdWx0X2NvbG9yIHtcXHJcXG4gICAgICAgICAgICAgICAgZmlsbDogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgICAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgICAgIC5jb2xvcl9wcmltYXJ5MSB7XFxyXFxuICAgICAgICAgICAgICAgIGZpbGw6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgICAgICAgICB9XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgICAgICBoMiB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgKiAxLjc3KTtcXHJcXG4gICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xcclxcbiAgICAgICAgICAgIHRleHQtYWxpZ246bGVmdDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIGlucHV0IHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS4yKTtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcXHJcXG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLzEuNSk7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcbiAgICAgICAgcmVzaXplOiB2ZXJ0aWNhbDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIGlucHV0LFxcclxcbiAgICBmb3JtIHRleHRhcmVhIHtcXHJcXG5cXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgaGVpZ2h0OiA2OHB4O1xcclxcbiAgICAgICAgYm9yZGVyOiBub25lO1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIGZvcm0gbGFiZWwge1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgZm9ybSBsYWJlbDpsYXN0LWNoaWxkIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmhlbHBfYmxpbmQge1xcclxcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG4uaGlkZV9jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1vZmY7XFxyXFxuXFxyXFxuICAgIEBrZXlmcmFtZXMgZmFkZS1vZmYge1xcclxcbiAgICAgICAgMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIDEwMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4uc2hvd19jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXHJcXG5cXHJcXG4gICAgQGtleWZyYW1lcyBmYWRlLWluIHtcXHJcXG4gICAgICAgIDAlIHtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjQ7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAxMDAlIHtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAxLjA7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcclxcblxcclxcbiAgICAubW9kYWxfY29udGFjdCB7XFxyXFxuICAgICAgICB3aWR0aDogNjUlO1xcclxcblxcclxcbiAgICAgICAgLm1vZGFsX2hlYWRlciB7XFxyXFxuICAgICAgICAgICAgaDIge1xcclxcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuNSk7XFxyXFxuICAgICAgICAgICAgfVxcclxcblxcclxcblxcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcclxcbiAgICAubW9kYWxfY29udGFjdCB7XFxyXFxuICAgICAgICB3aWR0aDogOTAlO1xcclxcblxcclxcbiAgICAgICAgLm1vZGFsX2hlYWRlciB7XFxyXFxuICAgICAgICAgICAgaDIge1xcclxcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuMik7XFxyXFxuICAgICAgICAgICAgfVxcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSBsYWJlbCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplIC8gMS4zO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSBpbnB1dCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplIC8gMS44O1xcclxcblxcclxcbiAgICAgICAgfVxcclxcblxcclxcblxcclxcblxcclxcbiAgICB9XFxyXFxufVwiLFwiLmZpc2hleWVfYnV0dG9uIHtcXHJcXG4gICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjgpO1xcclxcbiAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X2JpZztcXHJcXG4gICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICBwYWRkaW5nOiAxMXB4O1xcclxcbiAgICBtaW4td2lkdGg6IDE3MHB4O1xcclxcbiAgICBtaW4taGVpZ2h0OiA3MHB4O1xcclxcbiAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIHRyYW5zaXRpb246IGNvbG9yIDAuNXMgZWFzZS1pbiwgYmFja2dyb3VuZC1jb2xvciAwLjVzIGVhc2UtaW47XFxyXFxuXFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfYmFja2dyb3VuZDtcXHJcXG4gICAgfVxcclxcbn1cIixcIi5waG90b2dyYXBoX2hlYWRlciB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBuby13cmFwLCBmbGVkLWVuZCwgc3BhY2UtYmV0d2VlbiwgbnVsbCk7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9zZWNvbmRhcnkyX2JnO1xcclxcbiAgICBoZWlnaHQ6IDMxM3B4O1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICBAaW5jbHVkZSBwYWRkaW5nLWxlZnQtYW5kLXJpZ2h0KDMwcHgpO1xcclxcblxcclxcbiAgICBkaXY6bnRoLWNoaWxkKDMpIHtcXHJcXG4gICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICBoMSxcXHJcXG4gICAgaDIsXFxyXFxuICAgIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X3NtYWxsO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgxIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMS43Nyk7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAtMTVweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDIge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNTUpO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMyB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnQtc2l6ZSAvIDIpO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9zZWNvbmRhcnkyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2Fib3V0LFxcclxcbiAgICAucGhvdG9ncmFwaF9idXR0b24ge1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIG51bGwsIGNlbnRlciwgZmxleC1zdGFydCk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDMwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDgwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfYWJvdXQge1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXHJcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIHdyYXAsIGZsZWQtZW5kLCBzcGFjZS1iZXR3ZWVuLCBjZW50ZXIpO1xcclxcbiAgICAgICAgcGFkZGluZy10b3A6IDE1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMS4xNSk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgyIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS44KTtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250LXNpemUgLyAyLjIpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcclxcblxcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIge1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIGZsZWQtZW5kLCBzcGFjZS1iZXR3ZWVuLCBjZW50ZXIpO1xcclxcblxcclxcbiAgICAgICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogaW5oZXJpdDtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDBweDtcXHJcXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMjAwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyPi5waG90b2dyYXBoX2Fib3V0IHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xcclxcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIgaDEsXFxyXFxuICAgIGgyLFxcclxcbiAgICBoMyB7XFxyXFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyPi5waG90b2dyYXBoZXJfY2FyZCB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxufVwiLFwiLnNlbGVjdF9idXR0b24ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1jb250ZW50OiBmbGV4LWVuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcblxcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMik7XFxyXFxuICAgIGJhY2tncm91bmQ6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiBub25lO1xcclxcbiAgICB3aWR0aDogMTcwcHg7XFxyXFxuICAgIGhlaWdodDogNzBweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcclxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXHJcXG4gICAgY29udGVudDogXFxcIj5cXFwiO1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxyXFxuICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS40NCk7XFxyXFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcclxcbiAgICBmbG9hdDogcmlnaHQ7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdF9maWx0ZXIge1xcclxcblxcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLnNlbGVjdF9jb250ZW50IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDVweDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDVweDtcXHJcXG4gICAgbWluLXdpZHRoOiAxNjBweDtcXHJcXG4gICAgYm94LXNoYWRvdzogMHB4IDJweCA4cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXHJcXG4gICAgei1pbmRleDogMTtcXHJcXG5cXHJcXG5cXHJcXG4gICAgLndoaXRlbGluZSB7XFxyXFxuICAgICAgICB3aWR0aDogOTAlO1xcclxcbiAgICAgICAgaGVpZ2h0OiAxcHg7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA1JTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhIHtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIpO1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICAgICAgcGFkZGluZzogMjBweDtcXHJcXG4gICAgICAgIHdpZHRoOiAxNzBweDtcXHJcXG4gICAgICAgIGhlaWdodDogNjBweDtcXHJcXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGE6aG92ZXIge1xcclxcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbjtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbi5zZWxlY3RfZmlsdGVyOmhvdmVyIC5zZWxlY3RfY29udGVudCB7XFxyXFxuXFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xcclxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXHJcXG59XCIsXCIucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBudWxsLCBmbGV4LXN0YXJ0LCBzcGFjZS1hcm91bmQsIGJhc2VsaW5lKTtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfYmFja2dyb3VuZDtcXHJcXG4gICAgbWluLXdpZHRoOiAzNzZweDtcXHJcXG4gICAgbWluLWhlaWdodDogODlweDtcXHJcXG4gICAgYm90dG9tOiAwO1xcclxcbiAgICByaWdodDogMzhweDtcXHJcXG4gICAgei1pbmRleDogMjtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogLTIycHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4gICAgLnRvdGFsX2xpa2VzLFxcclxcbiAgICAucHJpY2VfcmF0ZV9kYWlseSB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNTUpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDMxcHg7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgICAgIHBhZGRpbmctdG9wOiAxOHB4O1xcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC50b3RhbF9saWtlczphZnRlciB7XFxyXFxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDVweDtcXHJcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCLimaVcXFwiO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjU1ICogMS4zMyk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoZXJfc3RhdGlzdGljIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XCIsXCIubWVkaWFfY2FyZCB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcXHJcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcclxcbiAgICBtYXgtd2lkdGg6IDM1MHB4O1xcclxcblxcclxcbiAgICBpbWcsXFxyXFxuICAgIHZpZGVvIHtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIG1heC1oZWlnaHQ6IDMwMHB4O1xcclxcbiAgICAgICAgbWluLWhlaWdodDogMzAwcHg7XFxyXFxuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcXHJcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG5cXHJcXG4gICAgICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNTApO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuICAgIC5kZXRhaWxzIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBudWxsLCBudWxsLCBzcGFjZS1iZXR3ZWVuLCBiYXNlbGluZSk7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiA1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDYge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfc21hbGw7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNSk7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGg2Omxhc3QtY2hpbGQ6OmFmdGVyIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41ICogMS4yNSk7XFxyXFxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxyXFxuICAgICAgICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLm1lZGlhX2NhcmQgaW1nLFxcclxcbiAgICAubWVkaWFfY2FyZCB7XFxyXFxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxuICAgIH1cXHJcXG59XCIsXCIvLy8vIE1BSU4gUEFHRSAvLy8gXFxyXFxuLnBob3RvZ3JhcGhlcl9zZWN0aW9uIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXHJcXG4gICAgZ2FwOiA3MHB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiA3NXB4O1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiA3NXB4O1xcclxcbn1cXHJcXG5cXHJcXG4vLy8vLyBFTkQgTUFJTiBQQUdFIC8vIFxcclxcblxcclxcbi8vLy8vLy8vLy8vLy8vLy8gUEhPVE9HUkFQSEVSIFBBR0UgLy8vLy8vLyBcXHJcXG4ubWFyZ2luX2xlZnRfcmlnaHQge1xcclxcbiAgICBtYXJnaW46IDAgMTAwcHg7XFxyXFxufVxcclxcblxcclxcbi5maWx0ZXJfc2VjdGlvbiB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBudWxsLCBudWxsLCBudWxsLCBiYXNlbGluZSk7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcclxcblxcclxcbiAgICBoNTpmaXJzdC1jaGlsZCB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAyOHB4O1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250LXNpemUgLyAyKTtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5zZWxlY3RfZmlsdGVyIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuLm1lZGlhX3NlY3Rpb24ge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcclxcbiAgICByb3ctZ2FwOiAzMHB4O1xcclxcbiAgICBjb2x1bW4tZ2FwOiA5NXB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiA3NXB4O1xcclxcbn1cXHJcXG5cXHJcXG4vLy8vLy8vLy8vLy8vLyBFTkQgUEhPVE9HUkFQSEVSIFBBR0UgLy8vLy8vLy9cXHJcXG5cXHJcXG4vLy8vLy8vLy8vLy8vLy8vIDQwNCBQQUdFIC8vLy8vLy8gXFxyXFxuLkVSUk9SXzQwNCB7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgdG9wOiA1MCU7XFxyXFxuICAgIGxlZnQ6IDUwJTtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxyXFxufVxcclxcblxcclxcbi8vLy8vLy8vLy8vLy8vIEVORCA0MDQgUEFHRSAvLy8vLy8vL1wiLFwiZm9vdGVyIHtcXHJcXG4gICAgaGVpZ2h0OiAycHg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgbWFyZ2luLXRvcDogNzVweDtcXHJcXG59XCIsXCJAbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoZXJfc2VjdGlvbixcXHJcXG4gICAgLm1lZGlhX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcclxcblxcclxcbiAgICBoZWFkZXIge1xcclxcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDQwcHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDEwMHB4O1xcclxcblxcclxcbiAgICAgICAgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIC5sb2dvLFxcclxcbiAgICAgICAgaDEge1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuMjApO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5tYXJnaW5fbGVmdF9yaWdodCB7XFxyXFxuICAgICAgICBtYXJnaW46IDAgMjBweDtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICAuZmlsdGVyX3NlY3Rpb24ge1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcblxcclxcbiAgICAucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5tZWRpYV9zZWN0aW9uIHtcXHJcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMV0udXNlWzNdIS4vbWFpbi5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbM10hLi9tYWluLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCJjb3JlLWpzL3N0YWJsZVwiO1xyXG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcclxuXHJcbmltcG9ydCAnLi4vLi4vc2Nzcy9tYWluLnNjc3MnO1xyXG5pbXBvcnQgeyBnZXRQaG90b2dyYXBoZXJzIH0gZnJvbSAnLi4vdXRpbHMvZmV0Y2gnO1xyXG5pbXBvcnQgeyBkaXNwbGF5RGF0YUFsbCB9IGZyb20gJy4uL2RhdGEvZGlzcGxheURhdGEnO1xyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXRNYWluKCkge1xyXG4gICAgLy8gVHJ5IHRvIGdldCBkYXRhIGZyb20gcGhvdG9ncmFwaGVzIGlmIGVycm9yIHRoZW4gcmVkaXJlY3QgdG8gNDA0IHBhZ2VcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVycyA9IGF3YWl0IGdldFBob3RvZ3JhcGhlcnMoKTtcclxuICAgICAgICBkaXNwbGF5RGF0YUFsbChwaG90b2dyYXBoZXJzLCBcIi5waG90b2dyYXBoZXJfc2VjdGlvblwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBhZ2UgaW5pdGlhbGlzZXIgYXZlYyBzdWNjw6hzIGRlcHVpcyBpbml0TWFpbigpXCIpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgLy8gSWYgaXQncyBhIGZhaWwgdGhlbiB3ZSByZWRpcmVjdCB0byA0MDQgRXJyb3IgUGFnZSBzaW5jZSBpbml0TWFpbigpIGl0J3MgdGhlIG1pbmltYWwgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgIC8vIEF0bSA0MDQgZXJyb3IgcGFnZSBkb2Vzbid0IGV4aXN0cyBtdXN0IGJlIHdyaXRlIGxhdGVyXHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlJlZGlyaWdlciB2ZXJzIGxhIHBhZ2UgNDA0XCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5pbml0TWFpbigpO1xyXG4iXSwibmFtZXMiOlsiaXNDYWxsYWJsZSIsInJlcXVpcmUiLCJ0cnlUb1N0cmluZyIsIiRUeXBlRXJyb3IiLCJUeXBlRXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIiwiYXJndW1lbnQiLCJpc09iamVjdCIsIiRTdHJpbmciLCJTdHJpbmciLCJ0b0luZGV4ZWRPYmplY3QiLCJ0b0Fic29sdXRlSW5kZXgiLCJsZW5ndGhPZkFycmF5TGlrZSIsImNyZWF0ZU1ldGhvZCIsIklTX0lOQ0xVREVTIiwiJHRoaXMiLCJlbCIsImZyb21JbmRleCIsIk8iLCJsZW5ndGgiLCJpbmRleCIsInZhbHVlIiwiaW5jbHVkZXMiLCJpbmRleE9mIiwidW5jdXJyeVRoaXMiLCJzbGljZSIsInRvU3RyaW5nIiwic3RyaW5nU2xpY2UiLCJpdCIsImhhc093biIsIm93bktleXMiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUiLCJkZWZpbmVQcm9wZXJ0eU1vZHVsZSIsInRhcmdldCIsInNvdXJjZSIsImV4Y2VwdGlvbnMiLCJrZXlzIiwiZGVmaW5lUHJvcGVydHkiLCJmIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiaSIsImtleSIsIkRFU0NSSVBUT1JTIiwiY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yIiwib2JqZWN0IiwiYml0bWFwIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwibWFrZUJ1aWx0SW4iLCJuYW1lIiwiZGVzY3JpcHRvciIsImdldCIsImdldHRlciIsInNldCIsInNldHRlciIsImRlZmluZUdsb2JhbFByb3BlcnR5Iiwib3B0aW9ucyIsInNpbXBsZSIsInVuZGVmaW5lZCIsImdsb2JhbCIsInVuc2FmZSIsImVycm9yIiwibm9uQ29uZmlndXJhYmxlIiwibm9uV3JpdGFibGUiLCJPYmplY3QiLCJmYWlscyIsImRvY3VtZW50IiwiRVhJU1RTIiwiY3JlYXRlRWxlbWVudCIsInVzZXJBZ2VudCIsInRlc3QiLCJjbGFzc29mIiwicHJvY2VzcyIsImdldEJ1aWx0SW4iLCJEZW5vIiwidmVyc2lvbnMiLCJ2ZXJzaW9uIiwidjgiLCJtYXRjaCIsInNwbGl0IiwiY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5IiwiZGVmaW5lQnVpbHRJbiIsImNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMiLCJpc0ZvcmNlZCIsIlRBUkdFVCIsIkdMT0JBTCIsIlNUQVRJQyIsInN0YXQiLCJGT1JDRUQiLCJ0YXJnZXRQcm9wZXJ0eSIsInNvdXJjZVByb3BlcnR5IiwicHJvdG90eXBlIiwiZG9udENhbGxHZXRTZXQiLCJmb3JjZWQiLCJzaGFtIiwiZXhlYyIsIk5BVElWRV9CSU5EIiwiRnVuY3Rpb25Qcm90b3R5cGUiLCJGdW5jdGlvbiIsImFwcGx5IiwiY2FsbCIsIlJlZmxlY3QiLCJiaW5kIiwiYXJndW1lbnRzIiwiYUNhbGxhYmxlIiwiZm4iLCJ0aGF0IiwiaGFzT3duUHJvcGVydHkiLCJnZXREZXNjcmlwdG9yIiwiUFJPUEVSIiwic29tZXRoaW5nIiwiQ09ORklHVVJBQkxFIiwiYUZ1bmN0aW9uIiwibmFtZXNwYWNlIiwibWV0aG9kIiwiaXNOdWxsT3JVbmRlZmluZWQiLCJWIiwiUCIsImZ1bmMiLCJjaGVjayIsIk1hdGgiLCJnbG9iYWxUaGlzIiwid2luZG93Iiwic2VsZiIsInRvT2JqZWN0IiwiYSIsIiRPYmplY3QiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsInN0b3JlIiwiZnVuY3Rpb25Ub1N0cmluZyIsImluc3BlY3RTb3VyY2UiLCJOQVRJVkVfV0VBS19NQVAiLCJzaGFyZWQiLCJzaGFyZWRLZXkiLCJoaWRkZW5LZXlzIiwiT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQiLCJXZWFrTWFwIiwiaGFzIiwiZW5mb3JjZSIsImdldHRlckZvciIsIlRZUEUiLCJzdGF0ZSIsInR5cGUiLCJ3bWdldCIsIndtaGFzIiwid21zZXQiLCJtZXRhZGF0YSIsImZhY2FkZSIsIlNUQVRFIiwicmVwbGFjZW1lbnQiLCJmZWF0dXJlIiwiZGV0ZWN0aW9uIiwiZGF0YSIsIm5vcm1hbGl6ZSIsIlBPTFlGSUxMIiwiTkFUSVZFIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwiZG9jdW1lbnRBbGwiLCJhbGwiLCJTUEVDSUFMX0RPQ1VNRU5UX0FMTCIsImlzUHJvdG90eXBlT2YiLCJVU0VfU1lNQk9MX0FTX1VJRCIsIiRTeW1ib2wiLCJ0b0xlbmd0aCIsIm9iaiIsIkNPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FIiwiSW50ZXJuYWxTdGF0ZU1vZHVsZSIsImVuZm9yY2VJbnRlcm5hbFN0YXRlIiwiZ2V0SW50ZXJuYWxTdGF0ZSIsIkNPTkZJR1VSQUJMRV9MRU5HVEgiLCJURU1QTEFURSIsImFyaXR5IiwiY29uc3RydWN0b3IiLCJqb2luIiwiY2VpbCIsImZsb29yIiwidHJ1bmMiLCJ4IiwibiIsIklFOF9ET01fREVGSU5FIiwiVjhfUFJPVE9UWVBFX0RFRklORV9CVUciLCJhbk9iamVjdCIsInRvUHJvcGVydHlLZXkiLCIkZGVmaW5lUHJvcGVydHkiLCIkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiRU5VTUVSQUJMRSIsIldSSVRBQkxFIiwiQXR0cmlidXRlcyIsImN1cnJlbnQiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSIsImludGVybmFsT2JqZWN0S2V5cyIsImVudW1CdWdLZXlzIiwiY29uY2F0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImdldE93blByb3BlcnR5U3ltYm9scyIsInB1c2giLCJuYW1lcyIsInJlc3VsdCIsIiRwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIk5BU0hPUk5fQlVHIiwiaW5wdXQiLCJwcmVmIiwidmFsIiwidmFsdWVPZiIsImdldE93blByb3BlcnR5TmFtZXNNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUiLCJoYXNJbmRpY2VzIiwiaWdub3JlQ2FzZSIsIm11bHRpbGluZSIsImRvdEFsbCIsInVuaWNvZGUiLCJ1bmljb2RlU2V0cyIsInN0aWNreSIsInVpZCIsIlNIQVJFRCIsIklTX1BVUkUiLCJtb2RlIiwiY29weXJpZ2h0IiwibGljZW5zZSIsIlY4X1ZFUlNJT04iLCJzeW1ib2wiLCJTeW1ib2wiLCJodG1sIiwiYXJyYXlTbGljZSIsInZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoIiwiSVNfSU9TIiwiSVNfTk9ERSIsInNldEltbWVkaWF0ZSIsImNsZWFyIiwiY2xlYXJJbW1lZGlhdGUiLCJEaXNwYXRjaCIsIk1lc3NhZ2VDaGFubmVsIiwiY291bnRlciIsInF1ZXVlIiwiT05SRUFEWVNUQVRFQ0hBTkdFIiwibG9jYXRpb24iLCJkZWZlciIsImNoYW5uZWwiLCJwb3J0IiwicnVuIiwiaWQiLCJydW5uZXIiLCJsaXN0ZW5lciIsImV2ZW50IiwicG9zdCIsInBvc3RNZXNzYWdlIiwicHJvdG9jb2wiLCJob3N0IiwiaGFuZGxlciIsImFyZ3MiLCJuZXh0VGljayIsIm5vdyIsInBvcnQyIiwicG9ydDEiLCJvbm1lc3NhZ2UiLCJhZGRFdmVudExpc3RlbmVyIiwiaW1wb3J0U2NyaXB0cyIsImFwcGVuZENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJzZXRUaW1lb3V0IiwidG9JbnRlZ2VyT3JJbmZpbml0eSIsIm1heCIsIm1pbiIsImludGVnZXIiLCJJbmRleGVkT2JqZWN0IiwicmVxdWlyZU9iamVjdENvZXJjaWJsZSIsIm51bWJlciIsImlzU3ltYm9sIiwiZ2V0TWV0aG9kIiwib3JkaW5hcnlUb1ByaW1pdGl2ZSIsIndlbGxLbm93blN5bWJvbCIsIlRPX1BSSU1JVElWRSIsImV4b3RpY1RvUHJpbSIsInRvUHJpbWl0aXZlIiwicG9zdGZpeCIsInJhbmRvbSIsIk5BVElWRV9TWU1CT0wiLCJpdGVyYXRvciIsInBhc3NlZCIsInJlcXVpcmVkIiwiV2VsbEtub3duU3ltYm9sc1N0b3JlIiwic3ltYm9sRm9yIiwiY3JlYXRlV2VsbEtub3duU3ltYm9sIiwid2l0aG91dFNldHRlciIsImRlc2NyaXB0aW9uIiwiZGVmaW5lQnVpbHRJbkFjY2Vzc29yIiwicmVnRXhwRmxhZ3MiLCJSZWdFeHAiLCJSZWdFeHBQcm90b3R5cGUiLCJJTkRJQ0VTX1NVUFBPUlQiLCJjYWxscyIsImV4cGVjdGVkIiwiYWRkR2V0dGVyIiwiY2hyIiwicGFpcnMiLCIkIiwiY3NzV2l0aE1hcHBpbmdUb1N0cmluZyIsImxpc3QiLCJtYXAiLCJpdGVtIiwiY29udGVudCIsIm5lZWRMYXllciIsIm1vZHVsZXMiLCJtZWRpYSIsImRlZHVwZSIsInN1cHBvcnRzIiwibGF5ZXIiLCJhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzIiwiayIsIl9rIiwiY3NzTWFwcGluZyIsImJ0b2EiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJzb3VyY2VNYXBwaW5nIiwic291cmNlVVJMcyIsInNvdXJjZXMiLCJzb3VyY2VSb290IiwicGhvdG9ncmFwaGVyRmFjdG9yeSIsImRpc3BsYXlEYXRhIiwicGhvdG9ncmFwaGVycyIsInBob3RvZ3JhcGhlclNlbGVjdGVkIiwiZm9yRWFjaCIsInBob3RvZ3JhcGhlciIsImVudiIsIk5PREVfRU5WIiwiY29uc29sZSIsImxvZyIsInBob3RvZ3JhcGhlck1vZGVsIiwic2V0UGhvdG9ncmFwaGVySGVhZGVyIiwic2V0U3RpY2t5QmFyUHJpY2UiLCJkaXNwbGF5RGF0YUFsbCIsInF1ZXJ5U2VsZWN0b3IiLCJwaG90b2dyYXBoZXJzU2VjdGlvbiIsInVzZXJDYXJkRE9NIiwiZ2V0VXNlckNhcmRET00iLCJidWlsZEVsZW1lbnQiLCJpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudCIsInNldElubmVySHRtbCIsInNldEFyaWFsTGFiZWwiLCJjaXR5IiwiY291bnRyeSIsInRhZ2xpbmUiLCJwb3J0cmFpdCIsInByaWNlIiwicGljdHVyZSIsImFydGljbGUiLCJzZXRBdHRyaWJ1dGUiLCJsaW5rRWxlbWVudCIsImltZ1Byb2ZpbGUiLCJlbGVtZW50IiwiYWx0IiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiaW5zZXJ0VmlkZW9JbnNpZGVFbGVtZW50IiwidmlkZW8iLCJhcmlhTGFiZWwiLCJpbnNlcnRIVE1MQWZ0ZXJFbGVtZW50IiwiYmFsaXNlIiwidGV4dENvbnRlbnQiLCJhcmlhbGFiZWwiLCJ0ZXh0ZSIsInRleHRlRWxlbWVudCIsImlubmVySFRNTCIsImZldGNoSlNPTiIsInVybCIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsIkVycm9yIiwianNvblJlc3BvbnNlIiwianNvbiIsImdldFBob3RvZ3JhcGhlcnMiLCJnZXRNZWRpYXMiLCJtZWRpYXMiLCJpbml0TWFpbiIsImUiXSwic291cmNlUm9vdCI6IiJ9