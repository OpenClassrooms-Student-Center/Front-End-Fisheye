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

      const linkElement = article.appendChild((0,_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement)("a", `photographer.html?id=${id}`, "href") // Build AHref
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
function buildElement(balise, value, attribute) {
  // Create balise
  const element = document.createElement(balise); // Set Attribute or TextContened depend of balise

  switch (balise) {
    case "a":
      element.setAttribute(attribute, value);
      break;

    case "img":
      element.setAttribute(attribute, value);
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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n/** Used to load all variables for this project about SCSS **/ /** FONT **/\n/** END FONT **/\n/** COLOR VARIABLES **/\n/** END COLOR VARIABLES **/\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\n/********************** GENERAL **********************/\nhtml,\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: \"DM Sans\", sans-serif;\n  animation: 1s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/********************** END GENERAL **********************/\n/** IMPORT MIXIN **/\n/** IMPORT HEADER STYLES **/\nheader {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 120px;\n}\nheader h1 {\n  color: #901C1C;\n  top: 44px;\n  margin-right: 100px;\n  font-weight: 400;\n  font-size: 36px;\n  line-height: 47px;\n}\nheader .logo,\nheader .logo_photographer {\n  height: 50px;\n}\nheader .logo {\n  margin-left: 115px;\n}\nheader .logo_photographer {\n  margin-left: 100px;\n  margin-top: 10px;\n}\n\n/** IMPORT PHOTOGRAPHERS CARDS **/\n.photographer_card {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  justify-self: center;\n}\n.photographer_card img {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  transition: box-shadow 1s;\n  height: 200px;\n  width: 200px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.photographer_card img:hover {\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.photographer_card h2,\n.photographer_card h3,\n.photographer_card h4,\n.photographer_card h5 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n}\n.photographer_card h2 {\n  margin-top: 20px;\n  color: #D3573C;\n  font-size: 36px;\n}\n.photographer_card h3 {\n  font-size: 13.0010834236px;\n  line-height: 17px;\n  color: #901C1C;\n}\n.photographer_card h4 {\n  margin-top: 2px;\n  font-size: 10px;\n  line-height: 13px;\n  color: #000000;\n}\n.photographer_card h5 {\n  margin-top: 2px;\n  font-size: 9px;\n  line-height: 12px;\n  text-align: center;\n  color: #757575;\n}\n\n@media (max-width: 1100px) {\n  .photographer_card h3 {\n    font-size: 16.9014084507px;\n    margin-top: 10px;\n  }\n  .photographer_card h4 {\n    font-size: 13px;\n    margin-top: 10px;\n  }\n  .photographer_card h5 {\n    font-size: 11.7px;\n    margin-top: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_card h3 {\n    font-size: 19.5016251354px;\n  }\n  .photographer_card h4 {\n    font-size: 15px;\n  }\n  .photographer_card h5 {\n    font-size: 13.5px;\n  }\n  .photographer_card img {\n    width: 230px;\n    height: 230px;\n  }\n}\n/** IMPORT MODAL COMPONENT **/\n.modal_contact {\n  display: none;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  border-radius: 5px;\n  background-color: #DB8876;\n  padding: 35px;\n  margin: auto;\n  width: 50%;\n  transition: width 0.5s ease-in;\n}\n.modal_contact .modal_header {\n  justify-content: space-between;\n  width: 100%;\n  margin-top: -20px;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: baseline;\n}\n.modal_contact .modal_header #closeModal {\n  cursor: pointer;\n  transition: filter 0.5s ease-in;\n}\n.modal_contact .modal_header #closeModal:hover {\n  filter: brightness(0) saturate(100%);\n}\n.modal_contact .modal_header .text_header {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.modal_contact .modal_header h2 {\n  font-size: 63.72px;\n  font-weight: normal;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-align: left;\n}\n.modal_contact form input {\n  font-size: 30px;\n  margin-bottom: 5px;\n  padding: 10px;\n}\n.modal_contact form textarea {\n  margin-top: 15px;\n  font-size: 24px;\n  margin-bottom: 20px;\n  resize: vertical;\n}\n.modal_contact form input,\n.modal_contact form textarea {\n  width: 100%;\n  height: 68px;\n  border: none;\n  border-radius: 5px;\n}\n.modal_contact form label {\n  color: #000000;\n  font-size: 36px;\n}\n.modal_contact form label:last-child {\n  margin-top: 15px;\n}\n.modal_contact .help_blind {\n  display: none;\n}\n\n.hide_content {\n  animation: 0.5s ease-in forwards fade-off;\n}\n@keyframes fade-off {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.5;\n  }\n}\n\n.show_content {\n  animation: 0.5s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0.5;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@media (max-width: 1100px) {\n  .modal_contact {\n    width: 70%;\n  }\n  .modal_contact .modal_header h2 {\n    font-size: 50.4px;\n  }\n  .modal_contact form label {\n    font-size: 32.7272727273px;\n  }\n  .modal_contact form input {\n    font-size: 27.6923076923px;\n  }\n  .modal_contact form textarea {\n    font-size: 22.5px;\n  }\n}\n@media (max-width: 800px) {\n  .modal_contact {\n    width: 90%;\n  }\n  .modal_contact .modal_header h2 {\n    font-size: 43.2px;\n  }\n  .modal_contact form label {\n    font-size: 27.6923076923px;\n  }\n  .modal_contact form input {\n    font-size: 24px;\n  }\n  .modal_contact form textarea {\n    font-size: 20px;\n  }\n}\n.modal_lightbox {\n  display: none;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n.modal_lightbox .content_media {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 700px;\n  width: 600px;\n}\n.modal_lightbox #video_selected,\n.modal_lightbox #picture_selected {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  border-radius: 5px;\n  margin: auto;\n  height: inherit;\n  min-width: 600px;\n  object-fit: cover;\n}\n.modal_lightbox .hide {\n  visibility: hidden;\n}\n.modal_lightbox a {\n  text-decoration: none;\n  font-size: 90px;\n  color: #901C1C;\n  transition: color 0.5s ease-in;\n  padding: 25px;\n}\n.modal_lightbox a:hover {\n  color: #DB8876;\n}\n.modal_lightbox .closeLightbox {\n  filter: brightness(0) saturate(100%) invert(18%) sepia(31%) saturate(4597%) hue-rotate(344deg) brightness(93%) contrast(95%);\n  position: absolute;\n  top: 10px;\n  right: -70px;\n  cursor: pointer;\n  transition: filter 0.5s ease-in;\n}\n.modal_lightbox .closeLightbox:hover {\n  filter: brightness(0) saturate(100%) invert(63%) sepia(43%) saturate(448%) hue-rotate(323deg) brightness(89%) contrast(92%);\n}\n.modal_lightbox h2 {\n  color: #901C1C;\n  font-size: 24px;\n}\n.modal_lightbox .help_blind {\n  display: none;\n}\n\n.hide_content {\n  animation: 0.5s ease-in forwards fade-off;\n}\n@keyframes fade-off {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.5;\n  }\n}\n\n.show_content {\n  animation: 0.5s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0.5;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@media (max-width: 800px) {\n  .modal_lightbox .content_media {\n    height: 700px;\n    width: 500px;\n  }\n  .modal_lightbox .content_media a {\n    display: none;\n    padding: 0px;\n  }\n  .modal_lightbox #video_selected,\n.modal_lightbox #picture_selected {\n    height: inherit;\n    width: 500px;\n  }\n}\n@media (max-width: 1100px) {\n  .modal_lightbox .content_media {\n    height: 700px;\n    width: 500px;\n  }\n  .modal_lightbox #video_selected,\n.modal_lightbox #picture_selected {\n    height: inherit;\n    min-width: 500px;\n  }\n}\n@media (max-width: 800px) {\n  .modal_lightbox .closeLightbox {\n    left: 100%;\n    transform: translate(-50%, -50%);\n  }\n  .modal_lightbox .content_media {\n    height: 500px;\n    width: 300px;\n  }\n  .modal_lightbox #video_selected,\n.modal_lightbox #picture_selected {\n    height: inherit;\n    min-width: 300px;\n  }\n}\n/** IMPORT CONTACT BUTTON COMPONENT **/\n.fisheye_button {\n  font-size: 20px;\n  font-weight: 700;\n  font-family: \"DM Sans\", sans-serif;\n  color: white;\n  padding: 11px;\n  min-width: 170px;\n  min-height: 70px;\n  border: none;\n  background-color: #901C1C;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: color 0.5s ease-in, background-color 0.5s ease-in;\n}\n.fisheye_button:hover {\n  color: #000000;\n  background-color: #DB8876;\n}\n\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\n.photograph_header {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: no-wrap;\n  align-content: fled-end;\n  justify-content: space-between;\n  background-color: #FAFAFA;\n  height: 313px;\n  margin-top: 10px;\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.photograph_header div:nth-child(3) {\n  margin-right: 20px;\n}\n.photograph_header h1,\n.photograph_header h2,\n.photograph_header h3 {\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 400;\n}\n.photograph_header h1 {\n  font-size: 63.72px;\n  margin-bottom: -15px;\n  color: #D3573C;\n}\n.photograph_header h2 {\n  margin-top: 15px;\n  margin-bottom: 20px;\n  font-size: 23.2258064516px;\n  color: #901C1C;\n}\n.photograph_header h3 {\n  font-size: 18px;\n  color: #525252;\n}\n.photograph_header .photograph_about,\n.photograph_header .photograph_button {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n}\n.photograph_header .photograph_button {\n  margin-top: 30px;\n  margin-right: 80px;\n}\n.photograph_header .photograph_about {\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\n@media (max-width: 1100px) {\n  .photograph_header {\n    background-color: white;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n    padding-top: 15px;\n  }\n  .photograph_header h1 {\n    font-size: 41.4px;\n  }\n  .photograph_header h2 {\n    font-size: 20px;\n  }\n  .photograph_header h3 {\n    font-size: 16.3636363636px;\n  }\n  .photograph_button {\n    margin-bottom: 30px;\n  }\n}\n@media (max-width: 800px) {\n  .photograph_header {\n    display: flex;\n    flex-direction: column;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .photograph_header .photograph_button {\n    align-items: inherit;\n    margin-right: 0px;\n    position: absolute;\n    margin-top: 200px;\n  }\n  .photograph_header > .photograph_about {\n    margin-left: 0;\n    align-items: center;\n  }\n  .photograph_header h1,\nh2,\nh3 {\n    text-align: center;\n  }\n  .photograph_header > .photographer_card {\n    display: none;\n  }\n}\n/** IMPORT SELECT FILTER COMPONENT **/\n.select_button {\n  display: flex;\n  align-content: flex-end;\n  align-items: center;\n  justify-content: space-between;\n  text-align: left;\n  padding-left: 20px;\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 18px;\n  background: #901C1C;\n  color: white;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border: none;\n  border-color: none;\n  width: 170px;\n  height: 70px;\n  cursor: pointer;\n}\n\n.select_button::after {\n  transition: transform 0.25s ease-in;\n  content: \">\";\n  transform: rotate(90deg);\n  font-size: 25px;\n  text-align: right;\n  float: right;\n  margin-right: 20px;\n}\n\n.select_filter {\n  position: relative;\n  display: inline-block;\n}\n\n.select_content {\n  display: none;\n  position: absolute;\n  background: #901C1C;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  min-width: 160px;\n  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n}\n.select_content .whiteline {\n  width: 90%;\n  height: 1px;\n  background-color: white;\n  margin-left: 5%;\n}\n.select_content a {\n  transition: all 0.5s ease-in;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-size: 18px;\n  color: white;\n  padding: 20px;\n  width: 170px;\n  height: 60px;\n  text-decoration: none;\n  display: block;\n}\n.select_content a:hover {\n  cursor: pointer;\n  transition: all 0.5s ease-in;\n  color: #000000;\n}\n\n.select_filter:hover .select_content {\n  display: block;\n}\n\n.select_filter:hover .select_button::after {\n  transform: rotate(-90deg);\n  transition: transform 0.25s ease-in;\n}\n\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\n.photographer_statistic {\n  display: flex;\n  flex-direction: row;\n  align-content: flex-start;\n  justify-content: space-around;\n  align-items: baseline;\n  position: fixed;\n  background-color: #DB8876;\n  min-width: 376px;\n  min-height: 89px;\n  bottom: 0;\n  right: 38px;\n  z-index: 2;\n  margin-bottom: -22px;\n  border-radius: 5px;\n}\n.photographer_statistic .total_likes,\n.photographer_statistic .price_rate_daily {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 23.2258064516px;\n  line-height: 31px;\n  color: #000000;\n  padding-top: 18px;\n}\n.photographer_statistic .total_likes:after {\n  padding-left: 5px;\n  content: \"♥\";\n  font-size: 30.8903225806px;\n}\n\n@media (max-width: 700px) {\n  .photographer_statistic {\n    display: none;\n  }\n}\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\n.media_card {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  max-width: 350px;\n}\n.media_card img,\n.media_card video {\n  transition: box-shadow 1s;\n  width: 100%;\n  max-height: 300px;\n  min-height: 300px;\n  object-fit: cover;\n  border-radius: 5px;\n}\n.media_card img:hover,\n.media_card video:hover {\n  transition: box-shadow 1s;\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.media_card .details {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: baseline;\n  margin-top: 5px;\n}\n.media_card h6 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n  font-size: 24px;\n  color: #901C1C;\n}\n.media_card h6:last-child::after {\n  font-size: 30px;\n  padding-left: 10px;\n  content: \"♥\";\n}\n\n@media (max-width: 600px) {\n  .media_card img,\n.media_card {\n    max-width: 100%;\n  }\n}\n/** IMPORT PAGES (other) Styles **/\n.photographer_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 70px;\n  margin-top: 75px;\n  margin-bottom: 75px;\n}\n\n.margin_left_right {\n  margin: 0 100px;\n}\n\n.filter_section {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n  margin-left: 0;\n}\n.filter_section h5:first-child {\n  margin-top: 20px;\n  margin-right: 28px;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-style: normal;\n  font-size: 18px;\n  color: #000000;\n}\n.filter_section .select_filter {\n  margin-top: 10px;\n}\n\n.media_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  row-gap: 30px;\n  column-gap: 95px;\n  margin-top: 20px;\n  margin-bottom: 75px;\n}\n\n.ERROR_404 {\n  margin-top: 5%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  padding: 40px;\n}\n.ERROR_404 h1 {\n  margin-bottom: 5%;\n  text-align: center;\n  font-size: 72px;\n  margin-bottom: 40px;\n}\n.ERROR_404 a {\n  text-decoration: none;\n  color: inherit;\n}\n.ERROR_404 a:hover {\n  color: inherit;\n}\n\n/** IMPORT FOOTER STYLES **/\nfooter {\n  height: 2px;\n  width: 100%;\n  background-color: white;\n  margin-top: 75px;\n}\n\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\n (components Elements got their own Responsive Rules in their Stylesheet) **/\n@media (min-width: 2000px) {\n  .media_section {\n    grid-template-columns: 1fr 1fr 1fr 1fr;\n  }\n}\n@media (max-width: 1100px) {\n  .photographer_section,\n.media_section {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 800px) {\n  header {\n    flex-direction: column;\n    margin-top: 40px;\n    height: 100px;\n  }\n  header .logo_photographer {\n    margin-left: 0;\n  }\n  header .logo,\nheader h1 {\n    margin-left: 20px;\n    margin-right: 20px;\n    font-size: 30px;\n  }\n  .margin_left_right {\n    margin: 0 20px;\n  }\n  .filter_section {\n    justify-content: space-between;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_section {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 600px) {\n  .media_section {\n    grid-template-columns: 1fr;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/main.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_global.scss","webpack://./src/scss/pages/_header.scss","webpack://./src/scss/_mixin.scss","webpack://./src/scss/components/_photographer_cards.scss","webpack://./src/scss/components/modal/_contact.scss","webpack://./src/scss/components/modal/_lightbox.scss","webpack://./src/scss/components/_fisheye_button.scss","webpack://./src/scss/components/_photograph_header.scss","webpack://./src/scss/components/_select_filter.scss","webpack://./src/scss/components/_photographer_statistic.scss","webpack://./src/scss/components/_media_cards.scss","webpack://./src/scss/pages/_pages.scss","webpack://./src/scss/pages/_footer.scss","webpack://./src/scss/_responsive.scss"],"names":[],"mappings":"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","sourcesContent":["/** Used to load all variables for this project about SCSS **/\r\n@import \"_variables.scss\";\r\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\r\n@import \"_global.scss\";\r\n/** IMPORT MIXIN **/\r\n@import \"_mixin.scss\";\r\n/** IMPORT HEADER STYLES **/\r\n@import \"pages/header.scss\";\r\n/** IMPORT PHOTOGRAPHERS CARDS **/\r\n@import \"components/photographer_cards.scss\";\r\n/** IMPORT MODAL COMPONENT **/\r\n@import \"components/modal/_contact.scss\";\r\n@import \"components/modal/_lightbox.scss\";\r\n/** IMPORT CONTACT BUTTON COMPONENT **/\r\n@import \"components/fisheye_button.scss\";\r\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\r\n@import \"components/photograph_header.scss\";\r\n/** IMPORT SELECT FILTER COMPONENT **/\r\n@import \"components/select_filter.scss\";\r\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\r\n@import \"components/photographer_statistic.scss\";\r\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\r\n@import \"components/media_cards.scss\";\r\n/** IMPORT PAGES (other) Styles **/\r\n@import \"pages/pages.scss\";\r\n/** IMPORT FOOTER STYLES **/\r\n@import \"pages/footer.scss\";\r\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\r\n (components Elements got their own Responsive Rules in their Stylesheet) **/\r\n@import \"_responsive.scss\";","/** FONT **/\r\n$font_global: \"DM Sans\", sans-serif;\r\n$font_weight_small: 400;\r\n$font_weight_big: 700;\r\n\r\n$font_size: 36px;\r\n/** END FONT **/\r\n\r\n/** COLOR VARIABLES **/\r\n$default_color: white;\r\n$default_font_color: #000000;\r\n$color_gray: #757575;\r\n$color_primary1: #901C1C;\r\n$color_primary2: #D3573C;\r\n$color_secondary2: #525252;\r\n$color_secondary2_bg: #FAFAFA;\r\n$color_background: #DB8876;\r\n/** END COLOR VARIABLES **/","/********************** GENERAL **********************/\r\nhtml,\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n\r\n}\r\n\r\nbody {\r\n  font-family: $font_global;\r\n  animation: 1s ease-in forwards fade-in;\r\n\r\n  @keyframes fade-in {\r\n    0% {\r\n      opacity: 0;\r\n    }\r\n\r\n    100% {\r\n      opacity: 1.0;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n/********************** END GENERAL **********************/","header {\r\n    @include flex-basic(row, null, null, space-between, center);\r\n    height: 120px;\r\n\r\n\r\n    h1 {\r\n        color: $color_primary1;\r\n        top: 44px;\r\n        margin-right: 100px;\r\n        font-weight: $font_weight_small;\r\n        font-size: $font_size;\r\n        line-height: 47px;\r\n    }\r\n\r\n    .logo,\r\n    .logo_photographer {\r\n        height: 50px;\r\n    }\r\n\r\n    .logo {\r\n        margin-left: 115px;\r\n    }\r\n\r\n    .logo_photographer {\r\n        margin-left: 100px;\r\n        margin-top: 10px;\r\n    }\r\n}","@mixin flex-basic($flex-direction,\r\n  $flex-wrap,\r\n  $align-content,\r\n  $justify-content,\r\n  $align-items) {\r\n  display: flex;\r\n  flex-direction: $flex-direction;\r\n\r\n  @if ($flex-wrap) {\r\n    flex-wrap: $flex-wrap;\r\n  }\r\n\r\n  @if ($align-content) {\r\n    align-content: $align-content;\r\n  }\r\n\r\n  @if ($justify-content) {\r\n    justify-content: $justify-content;\r\n  }\r\n\r\n  @if ($align-items) {\r\n    align-items: $align-items;\r\n  }\r\n}\r\n\r\n// @mixin mask-crossbrowser($value) {\r\n//   -webkit-mask: $value;\r\n//   mask: $value;\r\n// }\r\n\r\n// @mixin margin-left-and-right($value) {\r\n//   margin-left: $value;\r\n//   margin-right: $value;\r\n// }\r\n\r\n@mixin padding-left-and-right($value) {\r\n  padding-left: $value;\r\n  padding-right: $value;\r\n}",".photographer_card {\r\n    @include flex-basic(column, null, null, center, center);\r\n    justify-self: center;\r\n\r\n    img {\r\n        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n        transition: box-shadow 1s;\r\n        height: 200px;\r\n        width: 200px;\r\n        border-radius: 50%;\r\n        object-fit: cover;\r\n\r\n        &:hover {\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n    h2,\r\n    h3,\r\n    h4,\r\n    h5 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 20px;\r\n        color: $color_primary2;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font_size / 2.769);\r\n        line-height: 17px;\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h4 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 3.6);\r\n        line-height: 13px;\r\n        color: $default_font_color;\r\n    }\r\n\r\n    h5 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 4);\r\n        line-height: 12px;\r\n        text-align: center;\r\n        color: $color_gray;\r\n    }\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.5);\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.5);\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.5);\r\n        }\r\n\r\n        img {\r\n            width: 230px;\r\n            height: 230px;\r\n        }\r\n    }\r\n\r\n}",".modal_contact {\r\n    display: none;\r\n    position: fixed;\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n    border-radius: 5px;\r\n    background-color: $color_background;\r\n    padding: 35px;\r\n    margin: auto;\r\n    width: 50%;\r\n    transition: width 0.5s ease-in;\r\n\r\n\r\n    .modal_header {\r\n        justify-content: space-between;\r\n        width: 100%;\r\n        margin-top: -20px;\r\n        margin-bottom: 10px;\r\n        display: flex;\r\n        align-items: baseline;\r\n\r\n        #closeModal {\r\n            // Close Modal Picture\r\n            cursor: pointer;\r\n            transition: filter 0.5s ease-in;\r\n\r\n            &:hover {\r\n                filter: brightness(0) saturate(100%);\r\n            }\r\n        }\r\n\r\n        .text_header {\r\n            display: flex;\r\n            flex-direction: column;\r\n            overflow: hidden;\r\n        }\r\n\r\n        h2 {\r\n            font-size: calc($font_size * 1.77);\r\n            font-weight: normal;\r\n            white-space: nowrap;\r\n            overflow: hidden;\r\n            text-overflow: ellipsis;\r\n            text-align: left;\r\n        }\r\n    }\r\n\r\n    form input {\r\n        font-size: calc($font_size / 1.2);\r\n        margin-bottom: 5px;\r\n        padding: 10px;\r\n    }\r\n\r\n    form textarea {\r\n        margin-top: 15px;\r\n        font-size: calc($font_size /1.5);\r\n        margin-bottom: 20px;\r\n        resize: vertical;\r\n    }\r\n\r\n    form input,\r\n    form textarea {\r\n\r\n        width: 100%;\r\n        height: 68px;\r\n        border: none;\r\n        border-radius: 5px;\r\n\r\n    }\r\n\r\n\r\n    form label {\r\n        color: $default_font_color;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    form label:last-child {\r\n        margin-top: 15px;\r\n    }\r\n\r\n    .help_blind {\r\n        display: none;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n.hide_content {\r\n    animation: 0.5s ease-in forwards fade-off;\r\n\r\n    @keyframes fade-off {\r\n        0% {\r\n            opacity: 1.0;\r\n        }\r\n\r\n        100% {\r\n            opacity: 0.5;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\r\n.show_content {\r\n    animation: 0.5s ease-in forwards fade-in;\r\n\r\n    @keyframes fade-in {\r\n        0% {\r\n            opacity: 0.5;\r\n        }\r\n\r\n        100% {\r\n            opacity: 1.0;\r\n        }\r\n    }\r\n\r\n\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n\r\n    .modal_contact {\r\n        width: 70%;\r\n\r\n        .modal_header {\r\n            h2 {\r\n                font-size: calc($font_size * 1.4);\r\n            }\r\n        }\r\n\r\n        form label {\r\n            font-size: calc($font_size / 1.1);\r\n        }\r\n\r\n        form input {\r\n            font-size: calc($font_size / 1.3);\r\n        }\r\n\r\n        form textarea {\r\n            font-size: calc($font_size / 1.6);\r\n\r\n        }\r\n\r\n    }\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .modal_contact {\r\n        width: 90%;\r\n\r\n\r\n        .modal_header {\r\n            h2 {\r\n                font-size: calc($font_size * 1.2);\r\n            }\r\n        }\r\n\r\n        form label {\r\n            font-size: calc($font_size / 1.3);\r\n        }\r\n\r\n        form input {\r\n            font-size: calc($font_size / 1.5);\r\n        }\r\n\r\n        form textarea {\r\n            font-size: calc($font_size / 1.8);\r\n\r\n        }\r\n    }\r\n}",".modal_lightbox {\r\n    display: none;\r\n    position: fixed;\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n\r\n\r\n    .content_media {\r\n        display: flex;\r\n        justify-content: center;\r\n        align-items: center;\r\n        height: 700px;\r\n        width: 600px;\r\n\r\n    }\r\n\r\n\r\n\r\n    #video_selected,\r\n    #picture_selected {\r\n        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n        border-radius: 5px;\r\n        margin: auto;\r\n\r\n        height: inherit;\r\n        min-width: 600px;\r\n\r\n        object-fit: cover;\r\n    }\r\n\r\n\r\n    .hide {\r\n        visibility: hidden;\r\n    }\r\n\r\n    a {\r\n        text-decoration: none;\r\n        font-size: calc($font_size * 2.5);\r\n        color: $color_primary1;\r\n        transition: color 0.5s ease-in;\r\n        padding: 25px;\r\n\r\n        &:hover {\r\n            color: $color_background;\r\n        }\r\n    }\r\n\r\n    .closeLightbox {\r\n        filter: brightness(0) saturate(100%) invert(18%) sepia(31%) saturate(4597%) hue-rotate(344deg) brightness(93%) contrast(95%);\r\n        // to target color CF: https: //codepen.io/sosuke/pen/Pjoqqp\r\n        position: absolute;\r\n        top: 10px;\r\n        right: -70px;\r\n        cursor: pointer;\r\n        transition: filter 0.5s ease-in;\r\n\r\n        &:hover {\r\n            filter: brightness(0) saturate(100%) invert(63%) sepia(43%) saturate(448%) hue-rotate(323deg) brightness(89%) contrast(92%);\r\n        }\r\n    }\r\n\r\n\r\n    h2 {\r\n        color: $color_primary1;\r\n        font-size: 24px;\r\n    }\r\n\r\n\r\n\r\n    .help_blind {\r\n        display: none;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n.hide_content {\r\n    animation: 0.5s ease-in forwards fade-off;\r\n\r\n    @keyframes fade-off {\r\n        0% {\r\n            opacity: 1.0;\r\n        }\r\n\r\n        100% {\r\n            opacity: 0.5;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\r\n.show_content {\r\n    animation: 0.5s ease-in forwards fade-in;\r\n\r\n    @keyframes fade-in {\r\n        0% {\r\n            opacity: 0.5;\r\n        }\r\n\r\n        100% {\r\n            opacity: 1.0;\r\n        }\r\n    }\r\n\r\n\r\n}\r\n\r\n@media (max-width: 800px) {\r\n\r\n\r\n    .modal_lightbox {\r\n\r\n        .content_media {\r\n            height: 700px;\r\n            width: 500px;\r\n\r\n            a {\r\n                display: none;\r\n                padding: 0px;\r\n            }\r\n        }\r\n\r\n        #video_selected,\r\n        #picture_selected {\r\n            height: inherit;\r\n            width: 500px;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\r\n@media (max-width: 1100px) {\r\n\r\n    .modal_lightbox {\r\n\r\n        .content_media {\r\n            height: 700px;\r\n            width: 500px;\r\n        }\r\n\r\n        #video_selected,\r\n        #picture_selected {\r\n            height: inherit;\r\n            min-width: 500px;\r\n        }\r\n    }\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .modal_lightbox {\r\n        .closeLightbox {\r\n\r\n            left: 100%;\r\n            transform: translate(-50%, -50%);\r\n        }\r\n\r\n        .content_media {\r\n            height: 500px;\r\n            width: 300px;\r\n        }\r\n\r\n        #video_selected,\r\n        #picture_selected {\r\n            height: inherit;\r\n            min-width: 300px;\r\n        }\r\n    }\r\n}",".fisheye_button {\r\n    font-size: calc($font_size / 1.8);\r\n    font-weight: $font_weight_big;\r\n    font-family: $font_global;\r\n    color: $default_color;\r\n    padding: 11px;\r\n    min-width: 170px;\r\n    min-height: 70px;\r\n    border: none;\r\n    background-color: $color_primary1;\r\n    border-radius: 5px;\r\n    cursor: pointer;\r\n    transition: color 0.5s ease-in, background-color 0.5s ease-in;\r\n\r\n    &:hover {\r\n        color: $default_font_color;\r\n        background-color: $color_background;\r\n    }\r\n}",".photograph_header {\r\n    @include flex-basic(row, no-wrap, fled-end, space-between, null);\r\n    background-color: $color_secondary2_bg;\r\n    height: 313px;\r\n    margin-top: 10px;\r\n    @include padding-left-and-right(30px);\r\n\r\n    div:nth-child(3) {\r\n        margin-right: 20px;\r\n    }\r\n\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h1 {\r\n        font-size: calc($font_size * 1.77);\r\n        margin-bottom: -15px;\r\n        color: $color_primary2;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 15px;\r\n        margin-bottom: 20px;\r\n        font-size: calc($font_size / 1.55);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font-size / 2);\r\n        color: $color_secondary2;\r\n    }\r\n\r\n    .photograph_about,\r\n    .photograph_button {\r\n        @include flex-basic(column, null, null, center, flex-start);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-top: 30px;\r\n        margin-right: 80px;\r\n    }\r\n\r\n    .photograph_about {\r\n        margin-left: 20px;\r\n        margin-bottom: 10px;\r\n    }\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n    .photograph_header {\r\n        background-color: $default_color;\r\n        @include flex-basic(column, wrap, fled-end, space-between, center);\r\n        padding-top: 15px;\r\n    }\r\n\r\n    .photograph_header h1 {\r\n        font-size: calc($font_size * 1.15);\r\n    }\r\n\r\n    .photograph_header h2 {\r\n        font-size: calc($font_size / 1.8);\r\n\r\n    }\r\n\r\n    .photograph_header h3 {\r\n        font-size: calc($font-size / 2.2);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-bottom: 30px;\r\n\r\n\r\n    }\r\n\r\n\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .photograph_header {\r\n        @include flex-basic(column, null, fled-end, space-between, center);\r\n\r\n        .photograph_button {\r\n            align-items: inherit;\r\n            margin-right: 0px;\r\n            position: absolute;\r\n            margin-top: 200px;\r\n        }\r\n\r\n    }\r\n\r\n    .photograph_header>.photograph_about {\r\n        margin-left: 0;\r\n        align-items: center;\r\n    }\r\n\r\n    .photograph_header h1,\r\n    h2,\r\n    h3 {\r\n        text-align: center;\r\n    }\r\n\r\n    .photograph_header>.photographer_card {\r\n        display: none;\r\n    }\r\n\r\n\r\n}",".select_button {\r\n    display: flex;\r\n    align-content: flex-end;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n\r\n    text-align: left;\r\n    padding-left: 20px;\r\n    font-family: $font_global;\r\n    font-style: normal;\r\n    font-weight: $font_weight_big;\r\n    font-size: calc($font_size / 2);\r\n    background: $color_primary1;\r\n    color: $default_color;\r\n    border-top-left-radius: 5px;\r\n    border-top-right-radius: 5px;\r\n    border: none;\r\n    border-color: none;\r\n    width: 170px;\r\n    height: 70px;\r\n    cursor: pointer;\r\n}\r\n\r\n.select_button::after {\r\n    transition: transform 0.25s ease-in;\r\n    content: \">\";\r\n    transform: rotate(90deg);\r\n    font-size: calc($font_size / 1.44);\r\n    text-align: right;\r\n    float: right;\r\n    margin-right: 20px;\r\n\r\n}\r\n\r\n.select_filter {\r\n\r\n    position: relative;\r\n    display: inline-block;\r\n}\r\n\r\n\r\n.select_content {\r\n    display: none;\r\n    position: absolute;\r\n    background: $color_primary1;\r\n    border-bottom-left-radius: 5px;\r\n    border-bottom-right-radius: 5px;\r\n    min-width: 160px;\r\n    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\r\n    z-index: 1;\r\n\r\n\r\n    .whiteline {\r\n        width: 90%;\r\n        height: 1px;\r\n        background-color: $default_color;\r\n        margin-left: 5%;\r\n    }\r\n\r\n    a {\r\n        transition: all 0.5s ease-in;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 2);\r\n        color: $default_color;\r\n        padding: 20px;\r\n        width: 170px;\r\n        height: 60px;\r\n        text-decoration: none;\r\n        display: block;\r\n    }\r\n\r\n    a:hover {\r\n        cursor: pointer;\r\n        transition: all 0.5s ease-in;\r\n        color: $default_font_color;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n\r\n.select_filter:hover .select_content {\r\n\r\n    display: block;\r\n}\r\n\r\n.select_filter:hover .select_button::after {\r\n    transform: rotate(-90deg);\r\n    transition: transform 0.25s ease-in;\r\n}",".photographer_statistic {\r\n    @include flex-basic(row, null, flex-start, space-around, baseline);\r\n    position: fixed;\r\n    background-color: $color_background;\r\n    min-width: 376px;\r\n    min-height: 89px;\r\n    bottom: 0;\r\n    right: 38px;\r\n    z-index: 2;\r\n    margin-bottom: -22px;\r\n    border-radius: 5px;\r\n\r\n\r\n\r\n    .total_likes,\r\n    .price_rate_daily {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 1.55);\r\n        line-height: 31px;\r\n        color: $default_font_color;\r\n        padding-top: 18px;\r\n\r\n    }\r\n\r\n    .total_likes:after {\r\n        padding-left: 5px;\r\n        content: \"♥\";\r\n        font-size: calc($font_size / 1.55 * 1.33);\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_statistic {\r\n        display: none;\r\n    }\r\n\r\n}",".media_card {\r\n    @include flex-basic(column, null, null, null, null);\r\n    flex-wrap: wrap;\r\n    max-width: 350px;\r\n\r\n    img,\r\n    video {\r\n        transition: box-shadow 1s;\r\n        width: 100%;\r\n        max-height: 300px;\r\n        min-height: 300px;\r\n        object-fit: cover;\r\n        border-radius: 5px;\r\n\r\n        &:hover {\r\n            transition: box-shadow 1s;\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n\r\n\r\n    .details {\r\n        @include flex-basic(row, null, null, space-between, baseline);\r\n        margin-top: 5px;\r\n    }\r\n\r\n    h6 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n        font-size: calc($font_size / 1.5);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h6:last-child::after {\r\n        font-size: calc($font_size / 1.5 * 1.25);\r\n        padding-left: 10px;\r\n        content: \"♥\";\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_card img,\r\n    .media_card {\r\n        max-width: 100%;\r\n    }\r\n}","//// MAIN PAGE /// \r\n.photographer_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    gap: 70px;\r\n    margin-top: 75px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n///// END MAIN PAGE // \r\n\r\n//////////////// PHOTOGRAPHER PAGE /////// \r\n.margin_left_right {\r\n    margin: 0 100px;\r\n}\r\n\r\n.filter_section {\r\n    @include flex-basic(row, null, null, null, baseline);\r\n    margin-left: 0;\r\n\r\n    h5:first-child {\r\n        margin-top: 20px;\r\n        margin-right: 28px;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-style: normal;\r\n        font-size: calc($font-size / 2);\r\n        color: $default_font_color;\r\n    }\r\n\r\n    .select_filter {\r\n        margin-top: 10px;\r\n    }\r\n}\r\n\r\n.media_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    row-gap: 30px;\r\n    column-gap: 95px;\r\n    margin-top: 20px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n////////////// END PHOTOGRAPHER PAGE ////////\r\n\r\n//////////////// 404 PAGE /////// \r\n.ERROR_404 {\r\n    margin-top: 5%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: space-around;\r\n    padding: 40px;\r\n\r\n    h1 {\r\n        margin-bottom: 5%;\r\n        text-align: center;\r\n        font-size: $font_size * 2;\r\n        margin-bottom: 40px;\r\n    }\r\n\r\n    a {\r\n        text-decoration: none;\r\n        color: inherit;\r\n    }\r\n\r\n    a:hover {\r\n        color: inherit;\r\n    }\r\n}\r\n\r\n////////////// END 404 PAGE ////////","footer {\r\n    height: 2px;\r\n    width: 100%;\r\n    background-color: $default_color;\r\n    margin-top: 75px;\r\n}","@media (min-width: 2000px) {\r\n\r\n    .media_section {\r\n        grid-template-columns: 1fr 1fr 1fr 1fr;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n\r\n    .photographer_section,\r\n    .media_section {\r\n        grid-template-columns: 1fr 1fr;\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 800px) {\r\n\r\n    header {\r\n        flex-direction: column;\r\n        margin-top: 40px;\r\n        height: 100px;\r\n\r\n        .logo_photographer {\r\n            margin-left: 0;\r\n        }\r\n\r\n        .logo,\r\n        h1 {\r\n            margin-left: 20px;\r\n            margin-right: 20px;\r\n            font-size: calc($font_size / 1.20);\r\n        }\r\n    }\r\n\r\n    .margin_left_right {\r\n        margin: 0 20px;\r\n    }\r\n\r\n\r\n    .filter_section {\r\n        justify-content: space-between;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n\r\n    .photographer_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
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

    location.href = '404.html';
  }
}

initMain();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU0sVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLFdBQVcsTUFBTSxPQUFPLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsWUFBWSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxNQUFNLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxLQUFLLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sS0FBSyxNQUFNLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLE1BQU0sT0FBTyxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsWUFBWSxVQUFVLE1BQU0sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLE9BQU8sTUFBTSxXQUFXLE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sTUFBTSxVQUFVLFVBQVUsTUFBTSxPQUFPLFVBQVUsVUFBVSxNQUFNLEtBQUssTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLE9BQU8sVUFBVSxXQUFXLE1BQU0sS0FBSyxNQUFNLEtBQUssVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLFVBQVUsTUFBTSxPQUFPLFVBQVUsV0FBVyxNQUFNLEtBQUssWUFBWSxLQUFLLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsT0FBTyxZQUFZLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxlQUFlLGFBQWEsV0FBVyxXQUFXLGNBQWMsZUFBZSxPQUFPLE1BQU0sV0FBVyxNQUFNLFFBQVEsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLE9BQU8sT0FBTyxXQUFXLGFBQWEsZUFBZSxlQUFlLE9BQU8sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sS0FBSyxZQUFZLFVBQVUsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLFlBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxLQUFLLE1BQU0sS0FBSyxXQUFXLGFBQWEsZUFBZSxlQUFlLGVBQWUsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLFFBQVEsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsUUFBUSxNQUFNLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsUUFBUSxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLFlBQVksWUFBWSxXQUFXLFdBQVcsV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sTUFBTSxXQUFXLFlBQVksYUFBYSxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxTQUFTLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLE9BQU8sYUFBYSxNQUFNLFVBQVUsWUFBWSxhQUFhLGVBQWUsZUFBZSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLFFBQVEsV0FBVyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsV0FBVyxPQUFPLE9BQU8sV0FBVyxVQUFVLFdBQVcsUUFBUSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssYUFBYSxNQUFNLFVBQVUsWUFBWSxXQUFXLFdBQVcsT0FBTyxRQUFRLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sUUFBUSxXQUFXLFVBQVUsV0FBVyxPQUFPLE9BQU8sV0FBVyxhQUFhLGFBQWEsYUFBYSxXQUFXLE9BQU8sT0FBTyxZQUFZLFlBQVksWUFBWSxXQUFXLFdBQVcsUUFBUSxPQUFPLFVBQVUsV0FBVyxVQUFVLFFBQVEsT0FBTyxNQUFNLFVBQVUsT0FBTyxLQUFLLGFBQWEsTUFBTSxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsUUFBUSxPQUFPLFVBQVUsUUFBUSxPQUFPLFVBQVUsWUFBWSxhQUFhLFdBQVcsT0FBTyxPQUFPLFdBQVcsV0FBVyxZQUFZLGFBQWEsWUFBWSxVQUFVLFdB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QjtXQUMzQyxlQUFlO1dBQ2YsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BELDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNHQTtBQUNBO0FBQ0E7O0FBR0EsZUFBZUMsUUFBZixHQUEwQjtFQUN0QjtFQUNBLElBQUk7SUFDQSxNQUFNdkQsYUFBYSxHQUFHLE1BQU1vRCw4REFBZ0IsRUFBNUM7SUFDQXpDLGlFQUFjLENBQUNYLGFBQUQsRUFBZ0IsdUJBQWhCLENBQWQ7SUFDQU0sT0FBTyxDQUFDQyxHQUFSLENBQVksZ0RBQVo7RUFDSCxDQUpELENBSUUsT0FBT2lELENBQVAsRUFBVTtJQUNSbEQsT0FBTyxDQUFDOVEsS0FBUixDQUFjZ1UsQ0FBZCxFQURRLENBRVI7O0lBQ0FoSixRQUFRLENBQUNpSixJQUFULEdBQWdCLFVBQWhCO0VBQ0g7QUFDSjs7QUFFREYsUUFBUSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc2xpY2UuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4tYWNjZXNzb3IuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLWlzLWlvcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2V4cG9ydC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1hcHBseS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1uYW1lLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LW1ldGhvZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9odG1sLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWNhbGxhYmxlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcHVyZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbWFrZS1idWlsdC1pbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9tYXRoLXRydW5jLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3JkaW5hcnktdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1mbGFncy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdGFzay5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90cnktdG8tc3RyaW5nLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VpZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy92OC1wcm90b3R5cGUtZGVmaW5lLWJ1Zy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy92YWxpZGF0ZS1hcmd1bWVudHMtbGVuZ3RoLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dlYWstbWFwLWJhc2ljLWRldGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLmZsYWdzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuY2xlYXItaW1tZWRpYXRlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuaW1tZWRpYXRlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuc2V0LWltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL2RhdGEvZGlzcGxheURhdGEuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9mYWN0b3JpZXMvcGhvdG9ncmFwaGVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2RvbS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2ZldGNoLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3Njc3MvbWFpbi5zY3NzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3Njc3MvbWFpbi5zY3NzP2IzNzkiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvcGFnZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciB0cnlUb1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90cnktdG8tc3RyaW5nJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgQXNzZXJ0OiBJc0NhbGxhYmxlKGFyZ3VtZW50KSBpcyB0cnVlYFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzQ2FsbGFibGUoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93ICRUeXBlRXJyb3IodHJ5VG9TdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyICRTdHJpbmcgPSBTdHJpbmc7XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYEFzc2VydDogVHlwZShhcmd1bWVudCkgaXMgT2JqZWN0YFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzT2JqZWN0KGFyZ3VtZW50KSkgcmV0dXJuIGFyZ3VtZW50O1xuICB0aHJvdyAkVHlwZUVycm9yKCRTdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG59O1xuIiwidmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIGxlbmd0aE9mQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBpbmRleE9mLCBpbmNsdWRlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IGxlbmd0aE9mQXJyYXlMaWtlKE8pO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdW5jdXJyeVRoaXMoW10uc2xpY2UpO1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgdG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyh7fS50b1N0cmluZyk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBzdHJpbmdTbGljZSh0b1N0cmluZyhpdCksIDgsIC0xKTtcbn07XG4iLCJ2YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlLCBleGNlcHRpb25zKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzT3duKHRhcmdldCwga2V5KSAmJiAhKGV4Y2VwdGlvbnMgJiYgaGFzT3duKGV4Y2VwdGlvbnMsIGtleSkpKSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gICAgfVxuICB9XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgbWFrZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbWFrZS1idWlsdC1pbicpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKSB7XG4gIGlmIChkZXNjcmlwdG9yLmdldCkgbWFrZUJ1aWx0SW4oZGVzY3JpcHRvci5nZXQsIG5hbWUsIHsgZ2V0dGVyOiB0cnVlIH0pO1xuICBpZiAoZGVzY3JpcHRvci5zZXQpIG1ha2VCdWlsdEluKGRlc2NyaXB0b3Iuc2V0LCBuYW1lLCB7IHNldHRlcjogdHJ1ZSB9KTtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5LmYodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKTtcbn07XG4iLCJ2YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBtYWtlQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9tYWtlLWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lR2xvYmFsUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuICB2YXIgc2ltcGxlID0gb3B0aW9ucy5lbnVtZXJhYmxlO1xuICB2YXIgbmFtZSA9IG9wdGlvbnMubmFtZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uYW1lIDoga2V5O1xuICBpZiAoaXNDYWxsYWJsZSh2YWx1ZSkpIG1ha2VCdWlsdEluKHZhbHVlLCBuYW1lLCBvcHRpb25zKTtcbiAgaWYgKG9wdGlvbnMuZ2xvYmFsKSB7XG4gICAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gICAgZWxzZSBkZWZpbmVHbG9iYWxQcm9wZXJ0eShrZXksIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFvcHRpb25zLnVuc2FmZSkgZGVsZXRlIE9ba2V5XTtcbiAgICAgIGVsc2UgaWYgKE9ba2V5XSkgc2ltcGxlID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gICAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gICAgZWxzZSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6ICFvcHRpb25zLm5vbkNvbmZpZ3VyYWJsZSxcbiAgICAgIHdyaXRhYmxlOiAhb3B0aW9ucy5ub25Xcml0YWJsZVxuICAgIH0pO1xuICB9IHJldHVybiBPO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBkZWZpbmVQcm9wZXJ0eShnbG9iYWwsIGtleSwgeyB2YWx1ZTogdmFsdWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIERldGVjdCBJRTgncyBpbmNvbXBsZXRlIGRlZmluZVByb3BlcnR5IGltcGxlbWVudGF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAxLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KVsxXSAhPSA3O1xufSk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBFWElTVFMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBFWElTVFMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsInZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAvKD86aXBhZHxpcGhvbmV8aXBvZCkuKmFwcGxld2Via2l0L2kudGVzdCh1c2VyQWdlbnQpO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3NvZihnbG9iYWwucHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignbmF2aWdhdG9yJywgJ3VzZXJBZ2VudCcpIHx8ICcnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBEZW5vID0gZ2xvYmFsLkRlbm87XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnMgfHwgRGVubyAmJiBEZW5vLnZlcnNpb247XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52ODtcbnZhciBtYXRjaCwgdmVyc2lvbjtcblxuaWYgKHY4KSB7XG4gIG1hdGNoID0gdjguc3BsaXQoJy4nKTtcbiAgLy8gaW4gb2xkIENocm9tZSwgdmVyc2lvbnMgb2YgVjggaXNuJ3QgVjggPSBDaHJvbWUgLyAxMFxuICAvLyBidXQgdGhlaXIgY29ycmVjdCB2ZXJzaW9ucyBhcmUgbm90IGludGVyZXN0aW5nIGZvciB1c1xuICB2ZXJzaW9uID0gbWF0Y2hbMF0gPiAwICYmIG1hdGNoWzBdIDwgNCA/IDEgOiArKG1hdGNoWzBdICsgbWF0Y2hbMV0pO1xufVxuXG4vLyBCcm93c2VyRlMgTm9kZUpTIGBwcm9jZXNzYCBwb2x5ZmlsbCBpbmNvcnJlY3RseSBzZXQgYC52OGAgdG8gYDAuMGBcbi8vIHNvIGNoZWNrIGB1c2VyQWdlbnRgIGV2ZW4gaWYgYC52OGAgZXhpc3RzLCBidXQgMFxuaWYgKCF2ZXJzaW9uICYmIHVzZXJBZ2VudCkge1xuICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS8pO1xuICBpZiAoIW1hdGNoIHx8IG1hdGNoWzFdID49IDc0KSB7XG4gICAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0Nocm9tZVxcLyhcXGQrKS8pO1xuICAgIGlmIChtYXRjaCkgdmVyc2lvbiA9ICttYXRjaFsxXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnNpb247XG4iLCIvLyBJRTgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gW1xuICAnY29uc3RydWN0b3InLFxuICAnaGFzT3duUHJvcGVydHknLFxuICAnaXNQcm90b3R5cGVPZicsXG4gICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG4gICd0b0xvY2FsZVN0cmluZycsXG4gICd0b1N0cmluZycsXG4gICd2YWx1ZU9mJ1xuXTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcbnZhciBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcycpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xuXG4vKlxuICBvcHRpb25zLnRhcmdldCAgICAgICAgIC0gbmFtZSBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICBvcHRpb25zLmdsb2JhbCAgICAgICAgIC0gdGFyZ2V0IGlzIHRoZSBnbG9iYWwgb2JqZWN0XG4gIG9wdGlvbnMuc3RhdCAgICAgICAgICAgLSBleHBvcnQgYXMgc3RhdGljIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucHJvdG8gICAgICAgICAgLSBleHBvcnQgYXMgcHJvdG90eXBlIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucmVhbCAgICAgICAgICAgLSByZWFsIHByb3RvdHlwZSBtZXRob2QgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLmZvcmNlZCAgICAgICAgIC0gZXhwb3J0IGV2ZW4gaWYgdGhlIG5hdGl2ZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICBvcHRpb25zLmJpbmQgICAgICAgICAgIC0gYmluZCBtZXRob2RzIHRvIHRoZSB0YXJnZXQsIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy53cmFwICAgICAgICAgICAtIHdyYXAgY29uc3RydWN0b3JzIHRvIHByZXZlbnRpbmcgZ2xvYmFsIHBvbGx1dGlvbiwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLnVuc2FmZSAgICAgICAgIC0gdXNlIHRoZSBzaW1wbGUgYXNzaWdubWVudCBvZiBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGRlbGV0ZSArIGRlZmluZVByb3BlcnR5XG4gIG9wdGlvbnMuc2hhbSAgICAgICAgICAgLSBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gIG9wdGlvbnMuZW51bWVyYWJsZSAgICAgLSBleHBvcnQgYXMgZW51bWVyYWJsZSBwcm9wZXJ0eVxuICBvcHRpb25zLmRvbnRDYWxsR2V0U2V0IC0gcHJldmVudCBjYWxsaW5nIGEgZ2V0dGVyIG9uIHRhcmdldFxuICBvcHRpb25zLm5hbWUgICAgICAgICAgIC0gdGhlIC5uYW1lIG9mIHRoZSBmdW5jdGlvbiBpZiBpdCBkb2VzIG5vdCBtYXRjaCB0aGUga2V5XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XG4gIHZhciBUQVJHRVQgPSBvcHRpb25zLnRhcmdldDtcbiAgdmFyIEdMT0JBTCA9IG9wdGlvbnMuZ2xvYmFsO1xuICB2YXIgU1RBVElDID0gb3B0aW9ucy5zdGF0O1xuICB2YXIgRk9SQ0VELCB0YXJnZXQsIGtleSwgdGFyZ2V0UHJvcGVydHksIHNvdXJjZVByb3BlcnR5LCBkZXNjcmlwdG9yO1xuICBpZiAoR0xPQkFMKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKFNUQVRJQykge1xuICAgIHRhcmdldCA9IGdsb2JhbFtUQVJHRVRdIHx8IGRlZmluZUdsb2JhbFByb3BlcnR5KFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMuZG9udENhbGxHZXRTZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PSB0eXBlb2YgdGFyZ2V0UHJvcGVydHkpIGNvbnRpbnVlO1xuICAgICAgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyhzb3VyY2VQcm9wZXJ0eSwgdGFyZ2V0UHJvcGVydHkpO1xuICAgIH1cbiAgICAvLyBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gICAgaWYgKG9wdGlvbnMuc2hhbSB8fCAodGFyZ2V0UHJvcGVydHkgJiYgdGFyZ2V0UHJvcGVydHkuc2hhbSkpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShzb3VyY2VQcm9wZXJ0eSwgJ3NoYW0nLCB0cnVlKTtcbiAgICB9XG4gICAgZGVmaW5lQnVpbHRJbih0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsInZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgYXBwbHkgPSBGdW5jdGlvblByb3RvdHlwZS5hcHBseTtcbnZhciBjYWxsID0gRnVuY3Rpb25Qcm90b3R5cGUuY2FsbDtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tcmVmbGVjdCAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBSZWZsZWN0ID09ICdvYmplY3QnICYmIFJlZmxlY3QuYXBwbHkgfHwgKE5BVElWRV9CSU5EID8gY2FsbC5iaW5kKGFwcGx5KSA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhbGwuYXBwbHkoYXBwbHksIGFyZ3VtZW50cyk7XG59KTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBiaW5kID0gdW5jdXJyeVRoaXModW5jdXJyeVRoaXMuYmluZCk7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQpIHtcbiAgYUNhbGxhYmxlKGZuKTtcbiAgcmV0dXJuIHRoYXQgPT09IHVuZGVmaW5lZCA/IGZuIDogTkFUSVZFX0JJTkQgPyBiaW5kKGZuLCB0aGF0KSA6IGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tZnVuY3Rpb24tcHJvdG90eXBlLWJpbmQgLS0gc2FmZVxuICB2YXIgdGVzdCA9IChmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pLmJpbmQoKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiB0eXBlb2YgdGVzdCAhPSAnZnVuY3Rpb24nIHx8IHRlc3QuaGFzT3duUHJvcGVydHkoJ3Byb3RvdHlwZScpO1xufSk7XG4iLCJ2YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfQklORCA/IGNhbGwuYmluZChjYWxsKSA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhbGwuYXBwbHkoY2FsbCwgYXJndW1lbnRzKTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciBnZXREZXNjcmlwdG9yID0gREVTQ1JJUFRPUlMgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxudmFyIEVYSVNUUyA9IGhhc093bihGdW5jdGlvblByb3RvdHlwZSwgJ25hbWUnKTtcbi8vIGFkZGl0aW9uYWwgcHJvdGVjdGlvbiBmcm9tIG1pbmlmaWVkIC8gbWFuZ2xlZCAvIGRyb3BwZWQgZnVuY3Rpb24gbmFtZXNcbnZhciBQUk9QRVIgPSBFWElTVFMgJiYgKGZ1bmN0aW9uIHNvbWV0aGluZygpIHsgLyogZW1wdHkgKi8gfSkubmFtZSA9PT0gJ3NvbWV0aGluZyc7XG52YXIgQ09ORklHVVJBQkxFID0gRVhJU1RTICYmICghREVTQ1JJUFRPUlMgfHwgKERFU0NSSVBUT1JTICYmIGdldERlc2NyaXB0b3IoRnVuY3Rpb25Qcm90b3R5cGUsICduYW1lJykuY29uZmlndXJhYmxlKSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBFWElTVFM6IEVYSVNUUyxcbiAgUFJPUEVSOiBQUk9QRVIsXG4gIENPTkZJR1VSQUJMRTogQ09ORklHVVJBQkxFXG59O1xuIiwidmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBiaW5kID0gRnVuY3Rpb25Qcm90b3R5cGUuYmluZDtcbnZhciBjYWxsID0gRnVuY3Rpb25Qcm90b3R5cGUuY2FsbDtcbnZhciB1bmN1cnJ5VGhpcyA9IE5BVElWRV9CSU5EICYmIGJpbmQuYmluZChjYWxsLCBjYWxsKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfQklORCA/IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZm4gJiYgdW5jdXJyeVRoaXMoZm4pO1xufSA6IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZm4gJiYgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjYWxsLmFwcGx5KGZuLCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBpc0NhbGxhYmxlKGFyZ3VtZW50KSA/IGFyZ3VtZW50IDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKSA6IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwidmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG52YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcblxuLy8gYEdldE1ldGhvZGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldG1ldGhvZFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoViwgUCkge1xuICB2YXIgZnVuYyA9IFZbUF07XG4gIHJldHVybiBpc051bGxPclVuZGVmaW5lZChmdW5jKSA/IHVuZGVmaW5lZCA6IGFDYWxsYWJsZShmdW5jKTtcbn07XG4iLCJ2YXIgY2hlY2sgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICYmIGl0Lk1hdGggPT0gTWF0aCAmJiBpdDtcbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG5tb2R1bGUuZXhwb3J0cyA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLWdsb2JhbC10aGlzIC0tIHNhZmVcbiAgY2hlY2sodHlwZW9mIGdsb2JhbFRoaXMgPT0gJ29iamVjdCcgJiYgZ2xvYmFsVGhpcykgfHxcbiAgY2hlY2sodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLWdsb2JhbHMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIGZhbGxiYWNrXG4gIChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KSgpIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHVuY3VycnlUaGlzKHt9Lmhhc093blByb3BlcnR5KTtcblxuLy8gYEhhc093blByb3BlcnR5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaGFzb3ducHJvcGVydHlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1oYXNvd24gLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuaGFzT3duIHx8IGZ1bmN0aW9uIGhhc093bihpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eSh0b09iamVjdChpdCksIGtleSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ2RvY3VtZW50JywgJ2RvY3VtZW50RWxlbWVudCcpO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIFRoYW5rcyB0byBJRTggZm9yIGl0cyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG52YXIgc3BsaXQgPSB1bmN1cnJ5VGhpcygnJy5zcGxpdCk7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuICEkT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCk7XG59KSA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY2xhc3NvZihpdCkgPT0gJ1N0cmluZycgPyBzcGxpdChpdCwgJycpIDogJE9iamVjdChpdCk7XG59IDogJE9iamVjdDtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gdW5jdXJyeVRoaXMoRnVuY3Rpb24udG9TdHJpbmcpO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYGNvcmUtanNAMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAoIWlzQ2FsbGFibGUoc3RvcmUuaW5zcGVjdFNvdXJjZSkpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nKGl0KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZS5pbnNwZWN0U291cmNlO1xuIiwidmFyIE5BVElWRV9XRUFLX01BUCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWFrLW1hcC1iYXNpYy1kZXRlY3Rpb24nKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQgPSAnT2JqZWN0IGFscmVhZHkgaW5pdGlhbGl6ZWQnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCB8fCBzaGFyZWQuc3RhdGUpIHtcbiAgdmFyIHN0b3JlID0gc2hhcmVkLnN0YXRlIHx8IChzaGFyZWQuc3RhdGUgPSBuZXcgV2Vha01hcCgpKTtcbiAgdmFyIHdtZ2V0ID0gdW5jdXJyeVRoaXMoc3RvcmUuZ2V0KTtcbiAgdmFyIHdtaGFzID0gdW5jdXJyeVRoaXMoc3RvcmUuaGFzKTtcbiAgdmFyIHdtc2V0ID0gdW5jdXJyeVRoaXMoc3RvcmUuc2V0KTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGlmICh3bWhhcyhzdG9yZSwgaXQpKSB0aHJvdyBUeXBlRXJyb3IoT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQpO1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIHdtc2V0KHN0b3JlLCBpdCwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtZ2V0KHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcyhzdG9yZSwgaXQpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIFNUQVRFID0gc2hhcmVkS2V5KCdzdGF0ZScpO1xuICBoaWRkZW5LZXlzW1NUQVRFXSA9IHRydWU7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBpZiAoaGFzT3duKGl0LCBTVEFURSkpIHRocm93IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGhhc093bihpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBoYXNPd24oaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwiLy8gYElzQ2FsbGFibGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2NhbGxhYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09ICdmdW5jdGlvbic7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgcmVwbGFjZW1lbnQgPSAvI3xcXC5wcm90b3R5cGVcXC4vO1xuXG52YXIgaXNGb3JjZWQgPSBmdW5jdGlvbiAoZmVhdHVyZSwgZGV0ZWN0aW9uKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGFbbm9ybWFsaXplKGZlYXR1cmUpXTtcbiAgcmV0dXJuIHZhbHVlID09IFBPTFlGSUxMID8gdHJ1ZVxuICAgIDogdmFsdWUgPT0gTkFUSVZFID8gZmFsc2VcbiAgICA6IGlzQ2FsbGFibGUoZGV0ZWN0aW9uKSA/IGZhaWxzKGRldGVjdGlvbilcbiAgICA6ICEhZGV0ZWN0aW9uO1xufTtcblxudmFyIG5vcm1hbGl6ZSA9IGlzRm9yY2VkLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVwbGFjZW1lbnQsICcuJykudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBkYXRhID0gaXNGb3JjZWQuZGF0YSA9IHt9O1xudmFyIE5BVElWRSA9IGlzRm9yY2VkLk5BVElWRSA9ICdOJztcbnZhciBQT0xZRklMTCA9IGlzRm9yY2VkLlBPTFlGSUxMID0gJ1AnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRm9yY2VkO1xuIiwiLy8gd2UgY2FuJ3QgdXNlIGp1c3QgYGl0ID09IG51bGxgIHNpbmNlIG9mIGBkb2N1bWVudC5hbGxgIHNwZWNpYWwgY2FzZVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1Jc0hUTUxEREEtaW50ZXJuYWwtc2xvdC1hZWNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA9PT0gbnVsbCB8fCBpdCA9PT0gdW5kZWZpbmVkO1xufTtcbiIsInZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciBkb2N1bWVudEFsbCA9IHR5cGVvZiBkb2N1bWVudCA9PSAnb2JqZWN0JyAmJiBkb2N1bWVudC5hbGw7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtSXNIVE1MRERBLWludGVybmFsLXNsb3RcbnZhciBTUEVDSUFMX0RPQ1VNRU5UX0FMTCA9IHR5cGVvZiBkb2N1bWVudEFsbCA9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudEFsbCAhPT0gdW5kZWZpbmVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNQRUNJQUxfRE9DVU1FTlRfQUxMID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IGlzQ2FsbGFibGUoaXQpIHx8IGl0ID09PSBkb2N1bWVudEFsbDtcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogaXNDYWxsYWJsZShpdCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcblxubW9kdWxlLmV4cG9ydHMgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgJFN5bWJvbCA9IGdldEJ1aWx0SW4oJ1N5bWJvbCcpO1xuICByZXR1cm4gaXNDYWxsYWJsZSgkU3ltYm9sKSAmJiBpc1Byb3RvdHlwZU9mKCRTeW1ib2wucHJvdG90eXBlLCAkT2JqZWN0KGl0KSk7XG59O1xuIiwidmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xuXG4vLyBgTGVuZ3RoT2ZBcnJheUxpa2VgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1sZW5ndGhvZmFycmF5bGlrZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0b0xlbmd0aChvYmoubGVuZ3RoKTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIENPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLW5hbWUnKS5DT05GSUdVUkFCTEU7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcblxudmFyIGVuZm9yY2VJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5lbmZvcmNlO1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbnZhciBDT05GSUdVUkFCTEVfTEVOR1RIID0gREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgJ2xlbmd0aCcsIHsgdmFsdWU6IDggfSkubGVuZ3RoICE9PSA4O1xufSk7XG5cbnZhciBURU1QTEFURSA9IFN0cmluZyhTdHJpbmcpLnNwbGl0KCdTdHJpbmcnKTtcblxudmFyIG1ha2VCdWlsdEluID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIG5hbWUsIG9wdGlvbnMpIHtcbiAgaWYgKFN0cmluZyhuYW1lKS5zbGljZSgwLCA3KSA9PT0gJ1N5bWJvbCgnKSB7XG4gICAgbmFtZSA9ICdbJyArIFN0cmluZyhuYW1lKS5yZXBsYWNlKC9eU3ltYm9sXFwoKFteKV0qKVxcKS8sICckMScpICsgJ10nO1xuICB9XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZ2V0dGVyKSBuYW1lID0gJ2dldCAnICsgbmFtZTtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zZXR0ZXIpIG5hbWUgPSAnc2V0ICcgKyBuYW1lO1xuICBpZiAoIWhhc093bih2YWx1ZSwgJ25hbWUnKSB8fCAoQ09ORklHVVJBQkxFX0ZVTkNUSU9OX05BTUUgJiYgdmFsdWUubmFtZSAhPT0gbmFtZSkpIHtcbiAgICBpZiAoREVTQ1JJUFRPUlMpIGRlZmluZVByb3BlcnR5KHZhbHVlLCAnbmFtZScsIHsgdmFsdWU6IG5hbWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICBlbHNlIHZhbHVlLm5hbWUgPSBuYW1lO1xuICB9XG4gIGlmIChDT05GSUdVUkFCTEVfTEVOR1RIICYmIG9wdGlvbnMgJiYgaGFzT3duKG9wdGlvbnMsICdhcml0eScpICYmIHZhbHVlLmxlbmd0aCAhPT0gb3B0aW9ucy5hcml0eSkge1xuICAgIGRlZmluZVByb3BlcnR5KHZhbHVlLCAnbGVuZ3RoJywgeyB2YWx1ZTogb3B0aW9ucy5hcml0eSB9KTtcbiAgfVxuICB0cnkge1xuICAgIGlmIChvcHRpb25zICYmIGhhc093bihvcHRpb25zLCAnY29uc3RydWN0b3InKSAmJiBvcHRpb25zLmNvbnN0cnVjdG9yKSB7XG4gICAgICBpZiAoREVTQ1JJUFRPUlMpIGRlZmluZVByb3BlcnR5KHZhbHVlLCAncHJvdG90eXBlJywgeyB3cml0YWJsZTogZmFsc2UgfSk7XG4gICAgLy8gaW4gVjggfiBDaHJvbWUgNTMsIHByb3RvdHlwZXMgb2Ygc29tZSBtZXRob2RzLCBsaWtlIGBBcnJheS5wcm90b3R5cGUudmFsdWVzYCwgYXJlIG5vbi13cml0YWJsZVxuICAgIH0gZWxzZSBpZiAodmFsdWUucHJvdG90eXBlKSB2YWx1ZS5wcm90b3R5cGUgPSB1bmRlZmluZWQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgdmFyIHN0YXRlID0gZW5mb3JjZUludGVybmFsU3RhdGUodmFsdWUpO1xuICBpZiAoIWhhc093bihzdGF0ZSwgJ3NvdXJjZScpKSB7XG4gICAgc3RhdGUuc291cmNlID0gVEVNUExBVEUuam9pbih0eXBlb2YgbmFtZSA9PSAnc3RyaW5nJyA/IG5hbWUgOiAnJyk7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcblxuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0ZW5kLW5hdGl2ZSAtLSByZXF1aXJlZFxuRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gbWFrZUJ1aWx0SW4oZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiBpc0NhbGxhYmxlKHRoaXMpICYmIGdldEludGVybmFsU3RhdGUodGhpcykuc291cmNlIHx8IGluc3BlY3RTb3VyY2UodGhpcyk7XG59LCAndG9TdHJpbmcnKTtcbiIsInZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYE1hdGgudHJ1bmNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1tYXRoLnRydW5jXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1tYXRoLXRydW5jIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gTWF0aC50cnVuYyB8fCBmdW5jdGlvbiB0cnVuYyh4KSB7XG4gIHZhciBuID0gK3g7XG4gIHJldHVybiAobiA+IDAgPyBmbG9vciA6IGNlaWwpKG4pO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdjgtcHJvdG90eXBlLWRlZmluZS1idWcnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b1Byb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleScpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgJGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgRU5VTUVSQUJMRSA9ICdlbnVtZXJhYmxlJztcbnZhciBDT05GSUdVUkFCTEUgPSAnY29uZmlndXJhYmxlJztcbnZhciBXUklUQUJMRSA9ICd3cml0YWJsZSc7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmICh0eXBlb2YgTyA9PT0gJ2Z1bmN0aW9uJyAmJiBQID09PSAncHJvdG90eXBlJyAmJiAndmFsdWUnIGluIEF0dHJpYnV0ZXMgJiYgV1JJVEFCTEUgaW4gQXR0cmlidXRlcyAmJiAhQXR0cmlidXRlc1tXUklUQUJMRV0pIHtcbiAgICB2YXIgY3VycmVudCA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gICAgaWYgKGN1cnJlbnQgJiYgY3VycmVudFtXUklUQUJMRV0pIHtcbiAgICAgIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICAgICAgQXR0cmlidXRlcyA9IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBDT05GSUdVUkFCTEUgaW4gQXR0cmlidXRlcyA/IEF0dHJpYnV0ZXNbQ09ORklHVVJBQkxFXSA6IGN1cnJlbnRbQ09ORklHVVJBQkxFXSxcbiAgICAgICAgZW51bWVyYWJsZTogRU5VTUVSQUJMRSBpbiBBdHRyaWJ1dGVzID8gQXR0cmlidXRlc1tFTlVNRVJBQkxFXSA6IGN1cnJlbnRbRU5VTUVSQUJMRV0sXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG4gIH0gcmV0dXJuICRkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbn0gOiAkZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gJGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93ICRUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5Jyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXNPd24oTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIWNhbGwocHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZiwgTywgUCksIE9bUF0pO1xufTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbnZhciBoaWRkZW5LZXlzID0gZW51bUJ1Z0tleXMuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHluYW1lcyAtLSBzYWZlXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlzeW1ib2xzIC0tIHNhZmVcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdW5jdXJyeVRoaXMoe30uaXNQcm90b3R5cGVPZik7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoW10ucHVzaCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pICFoYXNPd24oaGlkZGVuS2V5cywga2V5KSAmJiBoYXNPd24oTywga2V5KSAmJiBwdXNoKHJlc3VsdCwga2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhc093bihPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5pbmRleE9mKHJlc3VsdCwga2V5KSB8fCBwdXNoKHJlc3VsdCwga2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICEkcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh7IDE6IDIgfSwgMSk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eWlzZW51bWVyYWJsZVxuZXhwb3J0cy5mID0gTkFTSE9STl9CVUcgPyBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIFYpO1xuICByZXR1cm4gISFkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZTtcbn0gOiAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCJ2YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYE9yZGluYXJ5VG9QcmltaXRpdmVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vcmRpbmFyeXRvcHJpbWl0aXZlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCwgcHJlZikge1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKHByZWYgPT09ICdzdHJpbmcnICYmIGlzQ2FsbGFibGUoZm4gPSBpbnB1dC50b1N0cmluZykgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmIChpc0NhbGxhYmxlKGZuID0gaW5wdXQudmFsdWVPZikgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmIChwcmVmICE9PSAnc3RyaW5nJyAmJiBpc0NhbGxhYmxlKGZuID0gaW5wdXQudG9TdHJpbmcpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyAkVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG52YXIgY29uY2F0ID0gdW5jdXJyeVRoaXMoW10uY29uY2F0KTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGNvbmNhdChrZXlzLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1yZWdleHAucHJvdG90eXBlLmZsYWdzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRoYXQgPSBhbk9iamVjdCh0aGlzKTtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAodGhhdC5oYXNJbmRpY2VzKSByZXN1bHQgKz0gJ2QnO1xuICBpZiAodGhhdC5nbG9iYWwpIHJlc3VsdCArPSAnZyc7XG4gIGlmICh0aGF0Lmlnbm9yZUNhc2UpIHJlc3VsdCArPSAnaSc7XG4gIGlmICh0aGF0Lm11bHRpbGluZSkgcmVzdWx0ICs9ICdtJztcbiAgaWYgKHRoYXQuZG90QWxsKSByZXN1bHQgKz0gJ3MnO1xuICBpZiAodGhhdC51bmljb2RlKSByZXN1bHQgKz0gJ3UnO1xuICBpZiAodGhhdC51bmljb2RlU2V0cykgcmVzdWx0ICs9ICd2JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoaXQpKSB0aHJvdyAkVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcblxudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgZGVmaW5lR2xvYmFsUHJvcGVydHkoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJ2YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiAnMy4yNS4wJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE0LTIwMjIgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknLFxuICBsaWNlbnNlOiAnaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvYmxvYi92My4yNS4wL0xJQ0VOU0UnLFxuICBzb3VyY2U6ICdodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcydcbn0pO1xuIiwiLyogZXNsaW50LWRpc2FibGUgZXMteC9uby1zeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5c3ltYm9scyAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xubW9kdWxlLmV4cG9ydHMgPSAhIU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN5bWJvbCA9IFN5bWJvbCgpO1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBgZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzYCBwb2x5ZmlsbCBzeW1ib2xzIGNvbnZlcnRlZCB0byBvYmplY3QgYXJlIG5vdCBTeW1ib2wgaW5zdGFuY2VzXG4gIHJldHVybiAhU3RyaW5nKHN5bWJvbCkgfHwgIShPYmplY3Qoc3ltYm9sKSBpbnN0YW5jZW9mIFN5bWJvbCkgfHxcbiAgICAvLyBDaHJvbWUgMzgtNDAgc3ltYm9scyBhcmUgbm90IGluaGVyaXRlZCBmcm9tIERPTSBjb2xsZWN0aW9ucyBwcm90b3R5cGVzIHRvIGluc3RhbmNlc1xuICAgICFTeW1ib2wuc2hhbSAmJiBWOF9WRVJTSU9OICYmIFY4X1ZFUlNJT04gPCA0MTtcbn0pO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBhcHBseSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1hcHBseScpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2h0bWwnKTtcbnZhciBhcnJheVNsaWNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNsaWNlJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3ZhbGlkYXRlLWFyZ3VtZW50cy1sZW5ndGgnKTtcbnZhciBJU19JT1MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLWlvcycpO1xudmFyIElTX05PREUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUnKTtcblxudmFyIHNldCA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXIgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIEZ1bmN0aW9uID0gZ2xvYmFsLkZ1bmN0aW9uO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIFN0cmluZyA9IGdsb2JhbC5TdHJpbmc7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBsb2NhdGlvbiwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG5cbnRyeSB7XG4gIC8vIERlbm8gdGhyb3dzIGEgUmVmZXJlbmNlRXJyb3Igb24gYGxvY2F0aW9uYCBhY2Nlc3Mgd2l0aG91dCBgLS1sb2NhdGlvbmAgZmxhZ1xuICBsb2NhdGlvbiA9IGdsb2JhbC5sb2NhdGlvbjtcbn0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cblxudmFyIHJ1biA9IGZ1bmN0aW9uIChpZCkge1xuICBpZiAoaGFzT3duKHF1ZXVlLCBpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xuXG52YXIgcnVubmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcnVuKGlkKTtcbiAgfTtcbn07XG5cbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4oZXZlbnQuZGF0YSk7XG59O1xuXG52YXIgcG9zdCA9IGZ1bmN0aW9uIChpZCkge1xuICAvLyBvbGQgZW5naW5lcyBoYXZlIG5vdCBsb2NhdGlvbi5vcmlnaW5cbiAgZ2xvYmFsLnBvc3RNZXNzYWdlKFN0cmluZyhpZCksIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QpO1xufTtcblxuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXQgfHwgIWNsZWFyKSB7XG4gIHNldCA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShoYW5kbGVyKSB7XG4gICAgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCwgMSk7XG4gICAgdmFyIGZuID0gaXNDYWxsYWJsZShoYW5kbGVyKSA/IGhhbmRsZXIgOiBGdW5jdGlvbihoYW5kbGVyKTtcbiAgICB2YXIgYXJncyA9IGFycmF5U2xpY2UoYXJndW1lbnRzLCAxKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgYXBwbHkoZm4sIHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXIgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAoSVNfTk9ERSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKHJ1bm5lcihpZCkpO1xuICAgIH07XG4gIC8vIFNwaGVyZSAoSlMgZ2FtZSBlbmdpbmUpIERpc3BhdGNoIEFQSVxuICB9IGVsc2UgaWYgKERpc3BhdGNoICYmIERpc3BhdGNoLm5vdykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBEaXNwYXRjaC5ub3cocnVubmVyKGlkKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICAvLyBleGNlcHQgaU9TIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzYyNFxuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsICYmICFJU19JT1MpIHtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgcG9ydCA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGJpbmQocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKFxuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmXG4gICAgaXNDYWxsYWJsZShnbG9iYWwucG9zdE1lc3NhZ2UpICYmXG4gICAgIWdsb2JhbC5pbXBvcnRTY3JpcHRzICYmXG4gICAgbG9jYXRpb24gJiYgbG9jYXRpb24ucHJvdG9jb2wgIT09ICdmaWxlOicgJiZcbiAgICAhZmFpbHMocG9zdClcbiAgKSB7XG4gICAgZGVmZXIgPSBwb3N0O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjcmVhdGVFbGVtZW50KCdzY3JpcHQnKSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4oaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KHJ1bm5lcihpZCksIDApO1xuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBjbGVhcjogY2xlYXJcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyT3JJbmZpbml0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5Jyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gSGVscGVyIGZvciBhIHBvcHVsYXIgcmVwZWF0aW5nIGNhc2Ugb2YgdGhlIHNwZWM6XG4vLyBMZXQgaW50ZWdlciBiZSA/IFRvSW50ZWdlcihpbmRleCkuXG4vLyBJZiBpbnRlZ2VyIDwgMCwgbGV0IHJlc3VsdCBiZSBtYXgoKGxlbmd0aCArIGludGVnZXIpLCAwKTsgZWxzZSBsZXQgcmVzdWx0IGJlIG1pbihpbnRlZ2VyLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlck9ySW5maW5pdHkoaW5kZXgpO1xuICByZXR1cm4gaW50ZWdlciA8IDAgPyBtYXgoaW50ZWdlciArIGxlbmd0aCwgMCkgOiBtaW4oaW50ZWdlciwgbGVuZ3RoKTtcbn07XG4iLCIvLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwidmFyIHRydW5jID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21hdGgtdHJ1bmMnKTtcblxuLy8gYFRvSW50ZWdlck9ySW5maW5pdHlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2ludGVnZXJvcmluZmluaXR5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIgbnVtYmVyID0gK2FyZ3VtZW50O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICByZXR1cm4gbnVtYmVyICE9PSBudW1iZXIgfHwgbnVtYmVyID09PSAwID8gMCA6IHRydW5jKG51bWJlcik7XG59O1xuIiwidmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBUb0xlbmd0aGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgPiAwID8gbWluKHRvSW50ZWdlck9ySW5maW5pdHkoYXJndW1lbnQpLCAweDFGRkZGRkZGRkZGRkZGKSA6IDA7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gJE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSk7XG59O1xuIiwidmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXN5bWJvbCcpO1xudmFyIGdldE1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtbWV0aG9kJyk7XG52YXIgb3JkaW5hcnlUb1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vcmRpbmFyeS10by1wcmltaXRpdmUnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG52YXIgVE9fUFJJTUlUSVZFID0gd2VsbEtub3duU3ltYm9sKCd0b1ByaW1pdGl2ZScpO1xuXG4vLyBgVG9QcmltaXRpdmVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b3ByaW1pdGl2ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIHByZWYpIHtcbiAgaWYgKCFpc09iamVjdChpbnB1dCkgfHwgaXNTeW1ib2woaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBleG90aWNUb1ByaW0gPSBnZXRNZXRob2QoaW5wdXQsIFRPX1BSSU1JVElWRSk7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChleG90aWNUb1ByaW0pIHtcbiAgICBpZiAocHJlZiA9PT0gdW5kZWZpbmVkKSBwcmVmID0gJ2RlZmF1bHQnO1xuICAgIHJlc3VsdCA9IGNhbGwoZXhvdGljVG9QcmltLCBpbnB1dCwgcHJlZik7XG4gICAgaWYgKCFpc09iamVjdChyZXN1bHQpIHx8IGlzU3ltYm9sKHJlc3VsdCkpIHJldHVybiByZXN1bHQ7XG4gICAgdGhyb3cgJFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbiAgfVxuICBpZiAocHJlZiA9PT0gdW5kZWZpbmVkKSBwcmVmID0gJ251bWJlcic7XG4gIHJldHVybiBvcmRpbmFyeVRvUHJpbWl0aXZlKGlucHV0LCBwcmVmKTtcbn07XG4iLCJ2YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtc3ltYm9sJyk7XG5cbi8vIGBUb1Byb3BlcnR5S2V5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcm9wZXJ0eWtleVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKGFyZ3VtZW50LCAnc3RyaW5nJyk7XG4gIHJldHVybiBpc1N5bWJvbChrZXkpID8ga2V5IDoga2V5ICsgJyc7XG59O1xuIiwidmFyICRTdHJpbmcgPSBTdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICRTdHJpbmcoYXJndW1lbnQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiAnT2JqZWN0JztcbiAgfVxufTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxudmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcbnZhciB0b1N0cmluZyA9IHVuY3VycnlUaGlzKDEuMC50b1N0cmluZyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnICsgKGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXkpICsgJylfJyArIHRvU3RyaW5nKCsraWQgKyBwb3N0Zml4LCAzNik7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgZXMteC9uby1zeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gICYmICFTeW1ib2wuc2hhbVxuICAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gVjggfiBDaHJvbWUgMzYtXG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMzM0XG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCAncHJvdG90eXBlJywge1xuICAgIHZhbHVlOiA0MixcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSkucHJvdG90eXBlICE9IDQyO1xufSk7XG4iLCJ2YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFzc2VkLCByZXF1aXJlZCkge1xuICBpZiAocGFzc2VkIDwgcmVxdWlyZWQpIHRocm93ICRUeXBlRXJyb3IoJ05vdCBlbm91Z2ggYXJndW1lbnRzJyk7XG4gIHJldHVybiBwYXNzZWQ7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNDYWxsYWJsZShXZWFrTWFwKSAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoU3RyaW5nKFdlYWtNYXApKTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3ltYm9sLWNvbnN0cnVjdG9yLWRldGVjdGlvbicpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciBXZWxsS25vd25TeW1ib2xzU3RvcmUgPSBzaGFyZWQoJ3drcycpO1xudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgc3ltYm9sRm9yID0gU3ltYm9sICYmIFN5bWJvbFsnZm9yJ107XG52YXIgY3JlYXRlV2VsbEtub3duU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBTeW1ib2wgOiBTeW1ib2wgJiYgU3ltYm9sLndpdGhvdXRTZXR0ZXIgfHwgdWlkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGlmICghaGFzT3duKFdlbGxLbm93blN5bWJvbHNTdG9yZSwgbmFtZSkgfHwgIShOQVRJVkVfU1lNQk9MIHx8IHR5cGVvZiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPT0gJ3N0cmluZycpKSB7XG4gICAgdmFyIGRlc2NyaXB0aW9uID0gJ1N5bWJvbC4nICsgbmFtZTtcbiAgICBpZiAoTkFUSVZFX1NZTUJPTCAmJiBoYXNPd24oU3ltYm9sLCBuYW1lKSkge1xuICAgICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gU3ltYm9sW25hbWVdO1xuICAgIH0gZWxzZSBpZiAoVVNFX1NZTUJPTF9BU19VSUQgJiYgc3ltYm9sRm9yKSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBzeW1ib2xGb3IoZGVzY3JpcHRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBjcmVhdGVXZWxsS25vd25TeW1ib2woZGVzY3JpcHRpb24pO1xuICAgIH1cbiAgfSByZXR1cm4gV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVCdWlsdEluQWNjZXNzb3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLWFjY2Vzc29yJyk7XG52YXIgcmVnRXhwRmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gYmFiZWwtbWluaWZ5IGFuZCBDbG9zdXJlIENvbXBpbGVyIHRyYW5zcGlsZXMgUmVnRXhwKCcuJywgJ2QnKSAtPiAvLi9kIGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbnZhciBSZWdFeHAgPSBnbG9iYWwuUmVnRXhwO1xudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG5cbnZhciBGT1JDRUQgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBJTkRJQ0VTX1NVUFBPUlQgPSB0cnVlO1xuICB0cnkge1xuICAgIFJlZ0V4cCgnLicsICdkJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgSU5ESUNFU19TVVBQT1JUID0gZmFsc2U7XG4gIH1cblxuICB2YXIgTyA9IHt9O1xuICAvLyBtb2Rlcm4gVjggYnVnXG4gIHZhciBjYWxscyA9ICcnO1xuICB2YXIgZXhwZWN0ZWQgPSBJTkRJQ0VTX1NVUFBPUlQgPyAnZGdpbXN5JyA6ICdnaW1zeSc7XG5cbiAgdmFyIGFkZEdldHRlciA9IGZ1bmN0aW9uIChrZXksIGNocikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIGtleSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbGxzICs9IGNocjtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gfSk7XG4gIH07XG5cbiAgdmFyIHBhaXJzID0ge1xuICAgIGRvdEFsbDogJ3MnLFxuICAgIGdsb2JhbDogJ2cnLFxuICAgIGlnbm9yZUNhc2U6ICdpJyxcbiAgICBtdWx0aWxpbmU6ICdtJyxcbiAgICBzdGlja3k6ICd5J1xuICB9O1xuXG4gIGlmIChJTkRJQ0VTX1NVUFBPUlQpIHBhaXJzLmhhc0luZGljZXMgPSAnZCc7XG5cbiAgZm9yICh2YXIga2V5IGluIHBhaXJzKSBhZGRHZXR0ZXIoa2V5LCBwYWlyc1trZXldKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbiAgdmFyIHJlc3VsdCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoUmVnRXhwUHJvdG90eXBlLCAnZmxhZ3MnKS5nZXQuY2FsbChPKTtcblxuICByZXR1cm4gcmVzdWx0ICE9PSBleHBlY3RlZCB8fCBjYWxscyAhPT0gZXhwZWN0ZWQ7XG59KTtcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NgIGdldHRlclxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xuaWYgKEZPUkNFRCkgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFJlZ0V4cFByb3RvdHlwZSwgJ2ZsYWdzJywge1xuICBjb25maWd1cmFibGU6IHRydWUsXG4gIGdldDogcmVnRXhwRmxhZ3Ncbn0pO1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNsZWFySW1tZWRpYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Rhc2snKS5jbGVhcjtcblxuLy8gYGNsZWFySW1tZWRpYXRlYCBtZXRob2Rcbi8vIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3NldEltbWVkaWF0ZS8jc2ktY2xlYXJJbW1lZGlhdGVcbiQoeyBnbG9iYWw6IHRydWUsIGJpbmQ6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIGZvcmNlZDogZ2xvYmFsLmNsZWFySW1tZWRpYXRlICE9PSBjbGVhckltbWVkaWF0ZSB9LCB7XG4gIGNsZWFySW1tZWRpYXRlOiBjbGVhckltbWVkaWF0ZVxufSk7XG4iLCIvLyBUT0RPOiBSZW1vdmUgdGhpcyBtb2R1bGUgZnJvbSBgY29yZS1qc0A0YCBzaW5jZSBpdCdzIHNwbGl0IHRvIG1vZHVsZXMgbGlzdGVkIGJlbG93XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5jbGVhci1pbW1lZGlhdGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLnNldC1pbW1lZGlhdGUnKTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRJbW1lZGlhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdGFzaycpLnNldDtcblxuLy8gYHNldEltbWVkaWF0ZWAgbWV0aG9kXG4vLyBodHRwOi8vdzNjLmdpdGh1Yi5pby9zZXRJbW1lZGlhdGUvI3NpLXNldEltbWVkaWF0ZVxuJCh7IGdsb2JhbDogdHJ1ZSwgYmluZDogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgZm9yY2VkOiBnbG9iYWwuc2V0SW1tZWRpYXRlICE9PSBzZXRJbW1lZGlhdGUgfSwge1xuICBzZXRJbW1lZGlhdGU6IHNldEltbWVkaWF0ZVxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJpbXBvcnQgeyBwaG90b2dyYXBoZXJGYWN0b3J5IH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9waG90b2dyYXBoZXJGYWN0b3J5XCI7XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlEYXRhKHBob3RvZ3JhcGhlcnMsIGlkKSB7XHJcbiAgICBsZXQgcGhvdG9ncmFwaGVyU2VsZWN0ZWQgPSBcIlwiO1xyXG5cclxuICAgIHBob3RvZ3JhcGhlcnMuZm9yRWFjaCgocGhvdG9ncmFwaGVyKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwaG90b2dyYXBoZXIuaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgLy8gVGhlbiB3ZSBhcmUgZ29pbmcgdXNlIHRoZSBQaG90b2dyYXBoZXJGYWN0b3J5IHRvIHNldCBET01cclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7IGNvbnNvbGUubG9nKHBob3RvZ3JhcGhlcik7IH1cclxuICAgICAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVyTW9kZWwgPSBwaG90b2dyYXBoZXJGYWN0b3J5KHBob3RvZ3JhcGhlcik7XHJcbiAgICAgICAgICAgIHBob3RvZ3JhcGhlck1vZGVsLnNldFBob3RvZ3JhcGhlckhlYWRlcigpO1xyXG4gICAgICAgICAgICBwaG90b2dyYXBoZXJNb2RlbC5zZXRTdGlja3lCYXJQcmljZSgpO1xyXG5cclxuICAgICAgICAgICAgcGhvdG9ncmFwaGVyU2VsZWN0ZWQgPSBwaG90b2dyYXBoZXJcclxuICAgICAgICAgICAgLy8gRW5kIG9mIFBob3RvZ3JhcGhlckZhY3RvcnkgV29ya1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgcmV0dXJuIChwaG90b2dyYXBoZXJTZWxlY3RlZCk7IC8vIFJldHVybiB0aGUgcGhvdG9ncmFwaGVyU2hvdyBhdCB0aGUgZW5kXHJcblxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzcGxheURhdGFBbGwocGhvdG9ncmFwaGVycywgcXVlcnlTZWxlY3Rvcikge1xyXG5cclxuICAgIHBob3RvZ3JhcGhlcnMuZm9yRWFjaCgocGhvdG9ncmFwaGVyKSA9PiB7XHJcblxyXG4gICAgICAgIC8vIFRoZW4gd2UgYXJlIGdvaW5nIHVzZSB0aGUgUGhvdG9ncmFwaGVyRmFjdG9yeSB0byBnZW5lcmF0ZSBET01cclxuICAgICAgICBjb25zdCBwaG90b2dyYXBoZXJzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnlTZWxlY3Rvcik7XHJcbiAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVyTW9kZWwgPSBwaG90b2dyYXBoZXJGYWN0b3J5KHBob3RvZ3JhcGhlcik7XHJcbiAgICAgICAgY29uc3QgdXNlckNhcmRET00gPSBwaG90b2dyYXBoZXJNb2RlbC5nZXRVc2VyQ2FyZERPTSgpO1xyXG5cclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHsgY29uc29sZS5sb2cocGhvdG9ncmFwaGVyKTsgfVxyXG4gICAgICAgIGlmICh1c2VyQ2FyZERPTSkge1xyXG4gICAgICAgICAgICBwaG90b2dyYXBoZXJzU2VjdGlvbi5hcHBlbmRDaGlsZCh1c2VyQ2FyZERPTSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEVuZCBvZiBQaG90b2dyYXBoZXJGYWN0b3J5IFdvcmtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG59XHJcblxyXG4iLCJcclxuaW1wb3J0IHsgYnVpbGRFbGVtZW50LCBpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudCwgc2V0SW5uZXJIdG1sLCBzZXRBcmlhbExhYmVsIH0gZnJvbSBcIi4uL3V0aWxzL2RvbVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBob3RvZ3JhcGhlckZhY3RvcnkoZGF0YSkge1xyXG4gICAgY29uc3QgeyBuYW1lLCBpZCwgY2l0eSwgY291bnRyeSwgdGFnbGluZSwgcG9ydHJhaXQsIHByaWNlIH0gPSBkYXRhO1xyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgY29uc3QgcGljdHVyZSA9IGBhc3NldHMvaW1hZ2VzLyR7cG9ydHJhaXR9YDtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRVc2VyQ2FyZERPTSgpIHtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIERPTSBvbmx5IGlmIHdlIGdvdCBhIHBpY3R1cmUgYSBpZCBhbmQgYSBuYW1lXHJcbiAgICAgICAgaWYgKG5hbWUgJiYgaWQgJiYgcG9ydHJhaXQpIHtcclxuICAgICAgICAgICAgLy8gQlVJTEQgQSBBUlRJQ0xFIFxyXG4gICAgICAgICAgICBjb25zdCBhcnRpY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIik7XHJcbiAgICAgICAgICAgIGFydGljbGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwaG90b2dyYXBoZXJfY2FyZFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBEeW5hbWlxdWUgTElOSyB3aXRoIFBpY3R1cmVcclxuICAgICAgICAgICAgY29uc3QgbGlua0VsZW1lbnQgPSBhcnRpY2xlLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgYnVpbGRFbGVtZW50KFwiYVwiLCBgcGhvdG9ncmFwaGVyLmh0bWw/aWQ9JHtpZH1gLCBcImhyZWZcIikgLy8gQnVpbGQgQUhyZWZcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgc2V0QXJpYWxMYWJlbChsaW5rRWxlbWVudCwgYExpbmsgdG8gJHtuYW1lfWApOyAvLyBTZXQgQXJpZWxMYWJlbCB0byBBSHJlZlxyXG4gICAgICAgICAgICBpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudChsaW5rRWxlbWVudCwgcGljdHVyZSwgbmFtZSk7XHJcbiAgICAgICAgICAgIC8vIEVORCBDcmVhdGUgRHluYW1pcXVlIExJTksgd2l0aCBQaWN0dXJlXHJcblxyXG4gICAgICAgICAgICBhcnRpY2xlLmFwcGVuZENoaWxkKGJ1aWxkRWxlbWVudChcImgyXCIsIG5hbWUpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaXR5ICYmIGNvdW50cnkpIHtcclxuICAgICAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDNcIiwgYCR7Y2l0eX0sICR7Y291bnRyeX1gKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRhZ2xpbmUpIHtcclxuICAgICAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDRcIiwgdGFnbGluZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcmljZSkge1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoNVwiLCBgJHtwcmljZX3igqwvam91cmApKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUkVUVVJOIEEgQVJUSUNMRSBcclxuICAgICAgICAgICAgcmV0dXJuIGFydGljbGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFBob3RvZ3JhcGhlckhlYWRlcigpIHtcclxuICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDFcIiwgbmFtZSk7XHJcbiAgICAgICAgaWYgKGNpdHkgJiYgY291bnRyeSkge1xyXG4gICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDJcIiwgYCR7Y2l0eX0sICR7Y291bnRyeX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoMlwiLCBcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGgzXCIsIHRhZ2xpbmUpO1xyXG5cclxuICAgICAgICAvKiogV0UgVVNFIGEgZGlmZmVyZW50IG1ldGhvZCB0aGF0IGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KCkgc2luY2UgcGljdHVyZSBpcyBhbHJlYWR5IGluIHRoZSBET00gKi9cclxuICAgICAgICBjb25zdCBpbWdQcm9maWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5waG90b2dyYXBoX2hlYWRlciBpbWdcIik7XHJcbiAgICAgICAgaW1nUHJvZmlsZS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgcGljdHVyZSk7XHJcbiAgICAgICAgaW1nUHJvZmlsZS5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgbmFtZSk7XHJcbiAgICAgICAgLyoqICovXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0U3RpY2t5QmFyUHJpY2UoKSB7XHJcbiAgICAgICAgaWYgKHByaWNlKSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5wcmljZV9yYXRlX2RhaWx5XCIsIGAke3ByaWNlfSDigqwgLyBqb3VyYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIucHJpY2VfcmF0ZV9kYWlseVwiLCBcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgbmFtZSwgcGljdHVyZSwgZ2V0VXNlckNhcmRET00sIHNldFBob3RvZ3JhcGhlckhlYWRlciwgc2V0U3RpY2t5QmFyUHJpY2UgfTtcclxufVxyXG4iLCIvLyBGdW5jdGlvbiBmb3IgYnVpbGQgRE9NXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudChlbGVtZW50LCBwaWN0dXJlLCBhbHQpIHtcclxuICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGA8aW1nIHNyYz1cIiR7cGljdHVyZX1cIiBhbHQ9XCIke2FsdH1cIj5gKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFZpZGVvSW5zaWRlRWxlbWVudChlbGVtZW50LCB2aWRlbywgYXJpYUxhYmVsKSB7XHJcblxyXG4gICAgaWYgKGFyaWFMYWJlbCkge1xyXG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsXHJcbiAgICAgICAgICAgIGA8dmlkZW8gc3JjPVwiJHt2aWRlb31cIiBhcmlhLWxhYmVsPVwiJHthcmlhTGFiZWx9XCI+YCk7XHJcblxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgJzx2aWRlbyBzcmM9XCInICsgdmlkZW8gKyAnXCI+Jyk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0SFRNTEFmdGVyRWxlbWVudChlbGVtZW50LCBodG1sKSB7XHJcbiAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyZW5kXCIsIGh0bWwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRFbGVtZW50KGJhbGlzZSwgdmFsdWUsIGF0dHJpYnV0ZSkge1xyXG4gICAgLy8gQ3JlYXRlIGJhbGlzZVxyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYmFsaXNlKTtcclxuXHJcbiAgICAvLyBTZXQgQXR0cmlidXRlIG9yIFRleHRDb250ZW5lZCBkZXBlbmQgb2YgYmFsaXNlXHJcbiAgICBzd2l0Y2ggKGJhbGlzZSkge1xyXG4gICAgICAgIGNhc2UgXCJhXCI6XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiaW1nXCI6XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBcmlhbExhYmVsKGVsZW1lbnQsIGFyaWFsYWJlbCkge1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGFyaWFsYWJlbCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRJbm5lckh0bWwocXVlcnlTZWxlY3RvciwgdGV4dGUpIHtcclxuICAgIGNvbnN0IHRleHRlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnlTZWxlY3Rvcik7XHJcbiAgICB0ZXh0ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dGU7XHJcbn1cclxuLy8gRW5kIEZ1bmN0aW9uIGZvciBidWlsZCBET00iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hKU09OKHVybCwgdHlwZSkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpOyAvLyBXYWl0IGZvciB0aGUgQXN5bmMgRmVjdGggRnVuY3Rpb25cclxuXHJcbiAgICAvLyBmZXRjaCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGEgcmVzcG9uc2UgcHJvcGVydHkgd2hpY2ggaWYgc2V0IHRvIGZhbHNlIG1lYW5zIHRoYXQgdGhlIGNvbm5lY3Rpb24gaXMgbm90IGdvb2QgYW5kIHNvIHdlIHN0b3AgdGhlIGZ1bmN0aW9uIFxyXG4gICAgaWYgKCFyZXNwb25zZS5vaykgeyB0aHJvdyBuZXcgRXJyb3IoXCJUaHJvd24gZnJvbSBmZXRjaEpTT04oKVwiKTsgfVxyXG5cclxuICAgIGxldCBqc29uUmVzcG9uc2UgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7IC8vIHBhcnNpbmcgSlNPTlxyXG4gICAgcmV0dXJuIGpzb25SZXNwb25zZVt0eXBlXTsgLy8gR2V0IGRhdGEgZnJvbSB0aGUgQXJyYXkgdGhhdCB3ZSB3YW50XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBob3RvZ3JhcGhlcnMoKSB7XHJcbiAgICBjb25zdCB1cmwgPSBcIi4uL2RhdGEvcGhvdG9ncmFwaGVycy5qc29uXCI7IC8vIERhdGEgc291cmNlIC5KU09OXHJcbiAgICBjb25zdCBwaG90b2dyYXBoZXJzID0gYXdhaXQgZmV0Y2hKU09OKHVybCwgXCJwaG90b2dyYXBoZXJzXCIpOyAvLyB1c2UgZmV0Y2hKU09OIGZ1bmN0aW9uIGZyb20gdXRpbHMvZmV0Y2guanNcclxuICAgIHJldHVybiBwaG90b2dyYXBoZXJzOyAvLyBSZXR1cm4gZGF0YSBvZiBQaG90b0dyYXBoZXJzXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRNZWRpYXMoKSB7XHJcbiAgICBjb25zdCB1cmwgPSBcIi4uL2RhdGEvcGhvdG9ncmFwaGVycy5qc29uXCI7IC8vIERhdGEgc291cmNlIC5KU09OXHJcbiAgICBjb25zdCBtZWRpYXMgPSBhd2FpdCBmZXRjaEpTT04odXJsLCBcIm1lZGlhXCIpOyAvLyB1c2UgZmV0Y2hKU09OIGZ1bmN0aW9uIGZyb20gdXRpbHMvZmV0Y2guanNcclxuICAgIHJldHVybiBtZWRpYXM7IC8vIFJldHVybiBkYXRhIG9mIE1lZGlhXHJcbn1cclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAY2hhcnNldCBcXFwiVVRGLThcXFwiO1xcbi8qKiBVc2VkIHRvIGxvYWQgYWxsIHZhcmlhYmxlcyBmb3IgdGhpcyBwcm9qZWN0IGFib3V0IFNDU1MgKiovIC8qKiBGT05UICoqL1xcbi8qKiBFTkQgRk9OVCAqKi9cXG4vKiogQ09MT1IgVkFSSUFCTEVTICoqL1xcbi8qKiBFTkQgQ09MT1IgVkFSSUFCTEVTICoqL1xcbi8qKiBJTVBPUlQgR0xPQkFMIENTUyBGT1IgRk9OVFMgSFRNTCwqIFNFTEVDVE9SICoqL1xcbi8qKioqKioqKioqKioqKioqKioqKioqIEdFTkVSQUwgKioqKioqKioqKioqKioqKioqKioqKi9cXG5odG1sLFxcbioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGFuaW1hdGlvbjogMXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcbn1cXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxufVxcblxcbi8qKioqKioqKioqKioqKioqKioqKioqIEVORCBHRU5FUkFMICoqKioqKioqKioqKioqKioqKioqKiovXFxuLyoqIElNUE9SVCBNSVhJTiAqKi9cXG4vKiogSU1QT1JUIEhFQURFUiBTVFlMRVMgKiovXFxuaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogMTIwcHg7XFxufVxcbmhlYWRlciBoMSB7XFxuICBjb2xvcjogIzkwMUMxQztcXG4gIHRvcDogNDRweDtcXG4gIG1hcmdpbi1yaWdodDogMTAwcHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDQ3cHg7XFxufVxcbmhlYWRlciAubG9nbyxcXG5oZWFkZXIgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXG4gIGhlaWdodDogNTBweDtcXG59XFxuaGVhZGVyIC5sb2dvIHtcXG4gIG1hcmdpbi1sZWZ0OiAxMTVweDtcXG59XFxuaGVhZGVyIC5sb2dvX3Bob3RvZ3JhcGhlciB7XFxuICBtYXJnaW4tbGVmdDogMTAwcHg7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG5cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUlMgQ0FSRFMgKiovXFxuLnBob3RvZ3JhcGhlcl9jYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBpbWcge1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcbiAgaGVpZ2h0OiAyMDBweDtcXG4gIHdpZHRoOiAyMDBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaW1nOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoMixcXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDMsXFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg0LFxcbi5waG90b2dyYXBoZXJfY2FyZCBoNSB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGgyIHtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBjb2xvcjogI0QzNTczQztcXG4gIGZvbnQtc2l6ZTogMzZweDtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGgzIHtcXG4gIGZvbnQtc2l6ZTogMTMuMDAxMDgzNDIzNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDE3cHg7XFxuICBjb2xvcjogIzkwMUMxQztcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg0IHtcXG4gIG1hcmdpbi10b3A6IDJweDtcXG4gIGZvbnQtc2l6ZTogMTBweDtcXG4gIGxpbmUtaGVpZ2h0OiAxM3B4O1xcbiAgY29sb3I6ICMwMDAwMDA7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoNSB7XFxuICBtYXJnaW4tdG9wOiAycHg7XFxuICBmb250LXNpemU6IDlweDtcXG4gIGxpbmUtaGVpZ2h0OiAxMnB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6ICM3NTc1NzU7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoMyB7XFxuICAgIGZvbnQtc2l6ZTogMTYuOTAxNDA4NDUwN3B4O1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGg0IHtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gICAgZm9udC1zaXplOiAxMS43cHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGgzIHtcXG4gICAgZm9udC1zaXplOiAxOS41MDE2MjUxMzU0cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDQge1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDUge1xcbiAgICBmb250LXNpemU6IDEzLjVweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBpbWcge1xcbiAgICB3aWR0aDogMjMwcHg7XFxuICAgIGhlaWdodDogMjMwcHg7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgTU9EQUwgQ09NUE9ORU5UICoqL1xcbi5tb2RhbF9jb250YWN0IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREI4ODc2O1xcbiAgcGFkZGluZzogMzVweDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIHdpZHRoOiA1MCU7XFxuICB0cmFuc2l0aW9uOiB3aWR0aCAwLjVzIGVhc2UtaW47XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIge1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW4tdG9wOiAtMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbn1cXG4ubW9kYWxfY29udGFjdCAubW9kYWxfaGVhZGVyICNjbG9zZU1vZGFsIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRyYW5zaXRpb246IGZpbHRlciAwLjVzIGVhc2UtaW47XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgI2Nsb3NlTW9kYWw6aG92ZXIge1xcbiAgZmlsdGVyOiBicmlnaHRuZXNzKDApIHNhdHVyYXRlKDEwMCUpO1xcbn1cXG4ubW9kYWxfY29udGFjdCAubW9kYWxfaGVhZGVyIC50ZXh0X2hlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgaDIge1xcbiAgZm9udC1zaXplOiA2My43MnB4O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbn1cXG4ubW9kYWxfY29udGFjdCBmb3JtIGlucHV0IHtcXG4gIGZvbnQtc2l6ZTogMzBweDtcXG4gIG1hcmdpbi1ib3R0b206IDVweDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxufVxcbi5tb2RhbF9jb250YWN0IGZvcm0gdGV4dGFyZWEge1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICByZXNpemU6IHZlcnRpY2FsO1xcbn1cXG4ubW9kYWxfY29udGFjdCBmb3JtIGlucHV0LFxcbi5tb2RhbF9jb250YWN0IGZvcm0gdGV4dGFyZWEge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDY4cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcbi5tb2RhbF9jb250YWN0IGZvcm0gbGFiZWwge1xcbiAgY29sb3I6ICMwMDAwMDA7XFxuICBmb250LXNpemU6IDM2cHg7XFxufVxcbi5tb2RhbF9jb250YWN0IGZvcm0gbGFiZWw6bGFzdC1jaGlsZCB7XFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcbn1cXG4ubW9kYWxfY29udGFjdCAuaGVscF9ibGluZCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uaGlkZV9jb250ZW50IHtcXG4gIGFuaW1hdGlvbjogMC41cyBlYXNlLWluIGZvcndhcmRzIGZhZGUtb2ZmO1xcbn1cXG5Aa2V5ZnJhbWVzIGZhZGUtb2ZmIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAwLjU7XFxuICB9XFxufVxcblxcbi5zaG93X2NvbnRlbnQge1xcbiAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXG59XFxuQGtleWZyYW1lcyBmYWRlLWluIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMC41O1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5tb2RhbF9jb250YWN0IHtcXG4gICAgd2lkdGg6IDcwJTtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgaDIge1xcbiAgICBmb250LXNpemU6IDUwLjRweDtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IGZvcm0gbGFiZWwge1xcbiAgICBmb250LXNpemU6IDMyLjcyNzI3MjcyNzNweDtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IGZvcm0gaW5wdXQge1xcbiAgICBmb250LXNpemU6IDI3LjY5MjMwNzY5MjNweDtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IGZvcm0gdGV4dGFyZWEge1xcbiAgICBmb250LXNpemU6IDIyLjVweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxuICAubW9kYWxfY29udGFjdCB7XFxuICAgIHdpZHRoOiA5MCU7XFxuICB9XFxuICAubW9kYWxfY29udGFjdCAubW9kYWxfaGVhZGVyIGgyIHtcXG4gICAgZm9udC1zaXplOiA0My4ycHg7XFxuICB9XFxuICAubW9kYWxfY29udGFjdCBmb3JtIGxhYmVsIHtcXG4gICAgZm9udC1zaXplOiAyNy42OTIzMDc2OTIzcHg7XFxuICB9XFxuICAubW9kYWxfY29udGFjdCBmb3JtIGlucHV0IHtcXG4gICAgZm9udC1zaXplOiAyNHB4O1xcbiAgfVxcbiAgLm1vZGFsX2NvbnRhY3QgZm9ybSB0ZXh0YXJlYSB7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gIH1cXG59XFxuLm1vZGFsX2xpZ2h0Ym94IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbn1cXG4ubW9kYWxfbGlnaHRib3ggLmNvbnRlbnRfbWVkaWEge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogNzAwcHg7XFxuICB3aWR0aDogNjAwcHg7XFxufVxcbi5tb2RhbF9saWdodGJveCAjdmlkZW9fc2VsZWN0ZWQsXFxuLm1vZGFsX2xpZ2h0Ym94ICNwaWN0dXJlX3NlbGVjdGVkIHtcXG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgaGVpZ2h0OiBpbmhlcml0O1xcbiAgbWluLXdpZHRoOiA2MDBweDtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbn1cXG4ubW9kYWxfbGlnaHRib3ggLmhpZGUge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG4ubW9kYWxfbGlnaHRib3ggYSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBmb250LXNpemU6IDkwcHg7XFxuICBjb2xvcjogIzkwMUMxQztcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuNXMgZWFzZS1pbjtcXG4gIHBhZGRpbmc6IDI1cHg7XFxufVxcbi5tb2RhbF9saWdodGJveCBhOmhvdmVyIHtcXG4gIGNvbG9yOiAjREI4ODc2O1xcbn1cXG4ubW9kYWxfbGlnaHRib3ggLmNsb3NlTGlnaHRib3gge1xcbiAgZmlsdGVyOiBicmlnaHRuZXNzKDApIHNhdHVyYXRlKDEwMCUpIGludmVydCgxOCUpIHNlcGlhKDMxJSkgc2F0dXJhdGUoNDU5NyUpIGh1ZS1yb3RhdGUoMzQ0ZGVnKSBicmlnaHRuZXNzKDkzJSkgY29udHJhc3QoOTUlKTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMTBweDtcXG4gIHJpZ2h0OiAtNzBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRyYW5zaXRpb246IGZpbHRlciAwLjVzIGVhc2UtaW47XFxufVxcbi5tb2RhbF9saWdodGJveCAuY2xvc2VMaWdodGJveDpob3ZlciB7XFxuICBmaWx0ZXI6IGJyaWdodG5lc3MoMCkgc2F0dXJhdGUoMTAwJSkgaW52ZXJ0KDYzJSkgc2VwaWEoNDMlKSBzYXR1cmF0ZSg0NDglKSBodWUtcm90YXRlKDMyM2RlZykgYnJpZ2h0bmVzcyg4OSUpIGNvbnRyYXN0KDkyJSk7XFxufVxcbi5tb2RhbF9saWdodGJveCBoMiB7XFxuICBjb2xvcjogIzkwMUMxQztcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG59XFxuLm1vZGFsX2xpZ2h0Ym94IC5oZWxwX2JsaW5kIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5oaWRlX2NvbnRlbnQge1xcbiAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1vZmY7XFxufVxcbkBrZXlmcmFtZXMgZmFkZS1vZmYge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDAuNTtcXG4gIH1cXG59XFxuXFxuLnNob3dfY29udGVudCB7XFxuICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcbn1cXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjU7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxuICAubW9kYWxfbGlnaHRib3ggLmNvbnRlbnRfbWVkaWEge1xcbiAgICBoZWlnaHQ6IDcwMHB4O1xcbiAgICB3aWR0aDogNTAwcHg7XFxuICB9XFxuICAubW9kYWxfbGlnaHRib3ggLmNvbnRlbnRfbWVkaWEgYSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDBweDtcXG4gIH1cXG4gIC5tb2RhbF9saWdodGJveCAjdmlkZW9fc2VsZWN0ZWQsXFxuLm1vZGFsX2xpZ2h0Ym94ICNwaWN0dXJlX3NlbGVjdGVkIHtcXG4gICAgaGVpZ2h0OiBpbmhlcml0O1xcbiAgICB3aWR0aDogNTAwcHg7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5tb2RhbF9saWdodGJveCAuY29udGVudF9tZWRpYSB7XFxuICAgIGhlaWdodDogNzAwcHg7XFxuICAgIHdpZHRoOiA1MDBweDtcXG4gIH1cXG4gIC5tb2RhbF9saWdodGJveCAjdmlkZW9fc2VsZWN0ZWQsXFxuLm1vZGFsX2xpZ2h0Ym94ICNwaWN0dXJlX3NlbGVjdGVkIHtcXG4gICAgaGVpZ2h0OiBpbmhlcml0O1xcbiAgICBtaW4td2lkdGg6IDUwMHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXG4gIC5tb2RhbF9saWdodGJveCAuY2xvc2VMaWdodGJveCB7XFxuICAgIGxlZnQ6IDEwMCU7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgfVxcbiAgLm1vZGFsX2xpZ2h0Ym94IC5jb250ZW50X21lZGlhIHtcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgd2lkdGg6IDMwMHB4O1xcbiAgfVxcbiAgLm1vZGFsX2xpZ2h0Ym94ICN2aWRlb19zZWxlY3RlZCxcXG4ubW9kYWxfbGlnaHRib3ggI3BpY3R1cmVfc2VsZWN0ZWQge1xcbiAgICBoZWlnaHQ6IGluaGVyaXQ7XFxuICAgIG1pbi13aWR0aDogMzAwcHg7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgQ09OVEFDVCBCVVRUT04gQ09NUE9ORU5UICoqL1xcbi5maXNoZXllX2J1dHRvbiB7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDExcHg7XFxuICBtaW4td2lkdGg6IDE3MHB4O1xcbiAgbWluLWhlaWdodDogNzBweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM5MDFDMUM7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBjb2xvciAwLjVzIGVhc2UtaW4sIGJhY2tncm91bmQtY29sb3IgMC41cyBlYXNlLWluO1xcbn1cXG4uZmlzaGV5ZV9idXR0b246aG92ZXIge1xcbiAgY29sb3I6ICMwMDAwMDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREI4ODc2O1xcbn1cXG5cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEggSEVBREVSIENPTVBPTkVOVCAqKi9cXG4ucGhvdG9ncmFwaF9oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBmbGV4LXdyYXA6IG5vLXdyYXA7XFxuICBhbGlnbi1jb250ZW50OiBmbGVkLWVuZDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNGQUZBRkE7XFxuICBoZWlnaHQ6IDMxM3B4O1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG4gIHBhZGRpbmctbGVmdDogMzBweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDMwcHg7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBkaXY6bnRoLWNoaWxkKDMpIHtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgxLFxcbi5waG90b2dyYXBoX2hlYWRlciBoMixcXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxuICBmb250LXNpemU6IDYzLjcycHg7XFxuICBtYXJnaW4tYm90dG9tOiAtMTVweDtcXG4gIGNvbG9yOiAjRDM1NzNDO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDIge1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxuICBmb250LXNpemU6IDIzLjIyNTgwNjQ1MTZweDtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgY29sb3I6ICM1MjUyNTI7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9hYm91dCxcXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2J1dHRvbiB7XFxuICBtYXJnaW4tdG9wOiAzMHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiA4MHB4O1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYWJvdXQge1xcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAucGhvdG9ncmFwaF9oZWFkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICBhbGlnbi1jb250ZW50OiBmbGVkLWVuZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBwYWRkaW5nLXRvcDogMTVweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxuICAgIGZvbnQtc2l6ZTogNDEuNHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgyIHtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXG4gICAgZm9udC1zaXplOiAxNi4zNjM2MzYzNjM2cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9idXR0b24ge1xcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXG4gIC5waG90b2dyYXBoX2hlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGFsaWduLWNvbnRlbnQ6IGZsZWQtZW5kO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gICAgYWxpZ24taXRlbXM6IGluaGVyaXQ7XFxuICAgIG1hcmdpbi1yaWdodDogMHB4O1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIG1hcmdpbi10b3A6IDIwMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyID4gLnBob3RvZ3JhcGhfYWJvdXQge1xcbiAgICBtYXJnaW4tbGVmdDogMDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMSxcXG5oMixcXG5oMyB7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciA+IC5waG90b2dyYXBoZXJfY2FyZCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgU0VMRUNUIEZJTFRFUiBDT01QT05FTlQgKiovXFxuLnNlbGVjdF9idXR0b24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJhY2tncm91bmQ6ICM5MDFDMUM7XFxuICBjb2xvcjogd2hpdGU7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNXB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLWNvbG9yOiBub25lO1xcbiAgd2lkdGg6IDE3MHB4O1xcbiAgaGVpZ2h0OiA3MHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxuICBjb250ZW50OiBcXFwiPlxcXCI7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxuICBmb250LXNpemU6IDI1cHg7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG4gIGZsb2F0OiByaWdodDtcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXG59XFxuXFxuLnNlbGVjdF9maWx0ZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbn1cXG5cXG4uc2VsZWN0X2NvbnRlbnQge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQ6ICM5MDFDMUM7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNXB4O1xcbiAgbWluLXdpZHRoOiAxNjBweDtcXG4gIGJveC1zaGFkb3c6IDBweCAycHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICB6LWluZGV4OiAxO1xcbn1cXG4uc2VsZWN0X2NvbnRlbnQgLndoaXRlbGluZSB7XFxuICB3aWR0aDogOTAlO1xcbiAgaGVpZ2h0OiAxcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIG1hcmdpbi1sZWZ0OiA1JTtcXG59XFxuLnNlbGVjdF9jb250ZW50IGEge1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbjtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIHdpZHRoOiAxNzBweDtcXG4gIGhlaWdodDogNjBweDtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG4uc2VsZWN0X2NvbnRlbnQgYTpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluO1xcbiAgY29sb3I6ICMwMDAwMDA7XFxufVxcblxcbi5zZWxlY3RfZmlsdGVyOmhvdmVyIC5zZWxlY3RfY29udGVudCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXG59XFxuXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgU1RBVElTVElDIENPTVBPTkVOVCAqKi9cXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEQjg4NzY7XFxuICBtaW4td2lkdGg6IDM3NnB4O1xcbiAgbWluLWhlaWdodDogODlweDtcXG4gIGJvdHRvbTogMDtcXG4gIHJpZ2h0OiAzOHB4O1xcbiAgei1pbmRleDogMjtcXG4gIG1hcmdpbi1ib3R0b206IC0yMnB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyAudG90YWxfbGlrZXMsXFxuLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMgLnByaWNlX3JhdGVfZGFpbHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDIzLjIyNTgwNjQ1MTZweDtcXG4gIGxpbmUtaGVpZ2h0OiAzMXB4O1xcbiAgY29sb3I6ICMwMDAwMDA7XFxuICBwYWRkaW5nLXRvcDogMThweDtcXG59XFxuLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMgLnRvdGFsX2xpa2VzOmFmdGVyIHtcXG4gIHBhZGRpbmctbGVmdDogNXB4O1xcbiAgY29udGVudDogXFxcIuKZpVxcXCI7XFxuICBmb250LXNpemU6IDMwLjg5MDMyMjU4MDZweDtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIE1FRElBIENBUkRTIENPTVBPTkVOVCAqKi9cXG4ubWVkaWFfY2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIG1heC13aWR0aDogMzUwcHg7XFxufVxcbi5tZWRpYV9jYXJkIGltZyxcXG4ubWVkaWFfY2FyZCB2aWRlbyB7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXgtaGVpZ2h0OiAzMDBweDtcXG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcbi5tZWRpYV9jYXJkIGltZzpob3ZlcixcXG4ubWVkaWFfY2FyZCB2aWRlbzpob3ZlciB7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuLm1lZGlhX2NhcmQgLmRldGFpbHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICBtYXJnaW4tdG9wOiA1cHg7XFxufVxcbi5tZWRpYV9jYXJkIGg2IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgY29sb3I6ICM5MDFDMUM7XFxufVxcbi5tZWRpYV9jYXJkIGg2Omxhc3QtY2hpbGQ6OmFmdGVyIHtcXG4gIGZvbnQtc2l6ZTogMzBweDtcXG4gIHBhZGRpbmctbGVmdDogMTBweDtcXG4gIGNvbnRlbnQ6IFxcXCLimaVcXFwiO1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIC5tZWRpYV9jYXJkIGltZyxcXG4ubWVkaWFfY2FyZCB7XFxuICAgIG1heC13aWR0aDogMTAwJTtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBQQUdFUyAob3RoZXIpIFN0eWxlcyAqKi9cXG4ucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxuICBnYXA6IDcwcHg7XFxuICBtYXJnaW4tdG9wOiA3NXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNzVweDtcXG59XFxuXFxuLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXG4gIG1hcmdpbjogMCAxMDBweDtcXG59XFxuXFxuLmZpbHRlcl9zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgbWFyZ2luLWxlZnQ6IDA7XFxufVxcbi5maWx0ZXJfc2VjdGlvbiBoNTpmaXJzdC1jaGlsZCB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAyOHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBjb2xvcjogIzAwMDAwMDtcXG59XFxuLmZpbHRlcl9zZWN0aW9uIC5zZWxlY3RfZmlsdGVyIHtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbi5tZWRpYV9zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcbiAgcm93LWdhcDogMzBweDtcXG4gIGNvbHVtbi1nYXA6IDk1cHg7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNzVweDtcXG59XFxuXFxuLkVSUk9SXzQwNCB7XFxuICBtYXJnaW4tdG9wOiA1JTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgcGFkZGluZzogNDBweDtcXG59XFxuLkVSUk9SXzQwNCBoMSB7XFxuICBtYXJnaW4tYm90dG9tOiA1JTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogNzJweDtcXG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XFxufVxcbi5FUlJPUl80MDQgYSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuLkVSUk9SXzQwNCBhOmhvdmVyIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG5cXG4vKiogSU1QT1JUIEZPT1RFUiBTVFlMRVMgKiovXFxuZm9vdGVyIHtcXG4gIGhlaWdodDogMnB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIG1hcmdpbi10b3A6IDc1cHg7XFxufVxcblxcbi8qKiBJTVBPUlQgUkVTUE9OU0lWRSBTVFlMRVMgZm9yIE5vbiBDb21wb25lbnRzIEVsZW1lbnRzXFxuIChjb21wb25lbnRzIEVsZW1lbnRzIGdvdCB0aGVpciBvd24gUmVzcG9uc2l2ZSBSdWxlcyBpbiB0aGVpciBTdHlsZXNoZWV0KSAqKi9cXG5AbWVkaWEgKG1pbi13aWR0aDogMjAwMHB4KSB7XFxuICAubWVkaWFfc2VjdGlvbiB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnIgMWZyO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX3NlY3Rpb24sXFxuLm1lZGlhX3NlY3Rpb24ge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcbiAgaGVhZGVyIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgbWFyZ2luLXRvcDogNDBweDtcXG4gICAgaGVpZ2h0OiAxMDBweDtcXG4gIH1cXG4gIGhlYWRlciAubG9nb19waG90b2dyYXBoZXIge1xcbiAgICBtYXJnaW4tbGVmdDogMDtcXG4gIH1cXG4gIGhlYWRlciAubG9nbyxcXG5oZWFkZXIgaDEge1xcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbiAgICBmb250LXNpemU6IDMwcHg7XFxuICB9XFxuICAubWFyZ2luX2xlZnRfcmlnaHQge1xcbiAgICBtYXJnaW46IDAgMjBweDtcXG4gIH1cXG4gIC5maWx0ZXJfc2VjdGlvbiB7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAubWVkaWFfc2VjdGlvbiB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcbiAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9tYWluLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL192YXJpYWJsZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX2dsb2JhbC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9wYWdlcy9faGVhZGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19taXhpbi5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19waG90b2dyYXBoZXJfY2FyZHMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9tb2RhbC9fY29udGFjdC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL21vZGFsL19saWdodGJveC5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19maXNoZXllX2J1dHRvbi5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19waG90b2dyYXBoX2hlYWRlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19zZWxlY3RfZmlsdGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3Bob3RvZ3JhcGhlcl9zdGF0aXN0aWMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fbWVkaWFfY2FyZHMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvcGFnZXMvX3BhZ2VzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3BhZ2VzL19mb290ZXIuc2Nzc1wiLFwid2Vi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RUFDQSxtQkFBQTtBYmtxQlI7QWEvcEJJO0VBQ0kscUJBQUE7RUFDQSxjQUFBO0FiaXFCUjtBYTlwQkk7RUFDSSxjQUFBO0FiZ3FCUjs7QUEzc0JBLDJCQUFBO0FjekJBO0VBQ0ksV0FBQTtFQUNBLFdBQUE7RUFDQSx1QmJNWTtFYUxaLGdCQUFBO0Fkd3VCSjs7QUFqdEJBOzRFQUFBO0FlM0JBO0VBRUk7SUFDSSxzQ0FBQTtFZmd2Qk47QUFDRjtBZTV1QkE7RUFFSTs7SUFFSSw4QkFBQTtFZjZ1Qk47QUFDRjtBZXh1QkE7RUFFSTtJQUNJLHNCQUFBO0lBQ0EsZ0JBQUE7SUFDQSxhQUFBO0VmeXVCTjtFZXZ1Qk07SUFDSSxjQUFBO0VmeXVCVjtFZXR1Qk07O0lBRUksaUJBQUE7SUFDQSxrQkFBQTtJQUNBLGVBQUE7RWZ3dUJWO0VlcHVCRTtJQUNJLGNBQUE7RWZzdUJOO0VlbHVCRTtJQUNJLDhCQUFBO0Vmb3VCTjtBQUNGO0FlaHVCQTtFQUVJO0lBQ0ksMEJBQUE7RWZpdUJOO0FBQ0Y7QWU3dEJBO0VBRUk7SUFDSSwwQkFBQTtFZjh0Qk47QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiogVXNlZCB0byBsb2FkIGFsbCB2YXJpYWJsZXMgZm9yIHRoaXMgcHJvamVjdCBhYm91dCBTQ1NTICoqL1xcclxcbkBpbXBvcnQgXFxcIl92YXJpYWJsZXMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBHTE9CQUwgQ1NTIEZPUiBGT05UUyBIVE1MLCogU0VMRUNUT1IgKiovXFxyXFxuQGltcG9ydCBcXFwiX2dsb2JhbC5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIE1JWElOICoqL1xcclxcbkBpbXBvcnQgXFxcIl9taXhpbi5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIEhFQURFUiBTVFlMRVMgKiovXFxyXFxuQGltcG9ydCBcXFwicGFnZXMvaGVhZGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSUyBDQVJEUyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3Bob3RvZ3JhcGhlcl9jYXJkcy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIE1PREFMIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL21vZGFsL19jb250YWN0LnNjc3NcXFwiO1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvbW9kYWwvX2xpZ2h0Ym94LnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgQ09OVEFDVCBCVVRUT04gQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvZmlzaGV5ZV9idXR0b24uc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIIEhFQURFUiBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9waG90b2dyYXBoX2hlYWRlci5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFNFTEVDVCBGSUxURVIgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvc2VsZWN0X2ZpbHRlci5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUiBTVEFUSVNUSUMgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvcGhvdG9ncmFwaGVyX3N0YXRpc3RpYy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUiBNRURJQSBDQVJEUyBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9tZWRpYV9jYXJkcy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBBR0VTIChvdGhlcikgU3R5bGVzICoqL1xcclxcbkBpbXBvcnQgXFxcInBhZ2VzL3BhZ2VzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgRk9PVEVSIFNUWUxFUyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJwYWdlcy9mb290ZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBSRVNQT05TSVZFIFNUWUxFUyBmb3IgTm9uIENvbXBvbmVudHMgRWxlbWVudHNcXHJcXG4gKGNvbXBvbmVudHMgRWxlbWVudHMgZ290IHRoZWlyIG93biBSZXNwb25zaXZlIFJ1bGVzIGluIHRoZWlyIFN0eWxlc2hlZXQpICoqL1xcclxcbkBpbXBvcnQgXFxcIl9yZXNwb25zaXZlLnNjc3NcXFwiO1wiLFwiLyoqIEZPTlQgKiovXFxyXFxuJGZvbnRfZ2xvYmFsOiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxyXFxuJGZvbnRfd2VpZ2h0X3NtYWxsOiA0MDA7XFxyXFxuJGZvbnRfd2VpZ2h0X2JpZzogNzAwO1xcclxcblxcclxcbiRmb250X3NpemU6IDM2cHg7XFxyXFxuLyoqIEVORCBGT05UICoqL1xcclxcblxcclxcbi8qKiBDT0xPUiBWQVJJQUJMRVMgKiovXFxyXFxuJGRlZmF1bHRfY29sb3I6IHdoaXRlO1xcclxcbiRkZWZhdWx0X2ZvbnRfY29sb3I6ICMwMDAwMDA7XFxyXFxuJGNvbG9yX2dyYXk6ICM3NTc1NzU7XFxyXFxuJGNvbG9yX3ByaW1hcnkxOiAjOTAxQzFDO1xcclxcbiRjb2xvcl9wcmltYXJ5MjogI0QzNTczQztcXHJcXG4kY29sb3Jfc2Vjb25kYXJ5MjogIzUyNTI1MjtcXHJcXG4kY29sb3Jfc2Vjb25kYXJ5Ml9iZzogI0ZBRkFGQTtcXHJcXG4kY29sb3JfYmFja2dyb3VuZDogI0RCODg3NjtcXHJcXG4vKiogRU5EIENPTE9SIFZBUklBQkxFUyAqKi9cIixcIi8qKioqKioqKioqKioqKioqKioqKioqIEdFTkVSQUwgKioqKioqKioqKioqKioqKioqKioqKi9cXHJcXG5odG1sLFxcclxcbioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gIGFuaW1hdGlvbjogMXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcclxcblxcclxcbiAgQGtleWZyYW1lcyBmYWRlLWluIHtcXHJcXG4gICAgMCUge1xcclxcbiAgICAgIG9wYWNpdHk6IDA7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgMTAwJSB7XFxyXFxuICAgICAgb3BhY2l0eTogMS4wO1xcclxcbiAgICB9XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcblxcclxcbi8qKioqKioqKioqKioqKioqKioqKioqIEVORCBHRU5FUkFMICoqKioqKioqKioqKioqKioqKioqKiovXCIsXCJoZWFkZXIge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbnVsbCwgbnVsbCwgc3BhY2UtYmV0d2VlbiwgY2VudGVyKTtcXHJcXG4gICAgaGVpZ2h0OiAxMjBweDtcXHJcXG5cXHJcXG5cXHJcXG4gICAgaDEge1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgICAgIHRvcDogNDRweDtcXHJcXG4gICAgICAgIG1hcmdpbi1yaWdodDogMTAwcHg7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X3NtYWxsO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDQ3cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmxvZ28sXFxyXFxuICAgIC5sb2dvX3Bob3RvZ3JhcGhlciB7XFxyXFxuICAgICAgICBoZWlnaHQ6IDUwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmxvZ28ge1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDExNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvX3Bob3RvZ3JhcGhlciB7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogMTAwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICB9XFxyXFxufVwiLFwiQG1peGluIGZsZXgtYmFzaWMoJGZsZXgtZGlyZWN0aW9uLFxcclxcbiAgJGZsZXgtd3JhcCxcXHJcXG4gICRhbGlnbi1jb250ZW50LFxcclxcbiAgJGp1c3RpZnktY29udGVudCxcXHJcXG4gICRhbGlnbi1pdGVtcykge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiAkZmxleC1kaXJlY3Rpb247XFxyXFxuXFxyXFxuICBAaWYgKCRmbGV4LXdyYXApIHtcXHJcXG4gICAgZmxleC13cmFwOiAkZmxleC13cmFwO1xcclxcbiAgfVxcclxcblxcclxcbiAgQGlmICgkYWxpZ24tY29udGVudCkge1xcclxcbiAgICBhbGlnbi1jb250ZW50OiAkYWxpZ24tY29udGVudDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIEBpZiAoJGp1c3RpZnktY29udGVudCkge1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5LWNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAaWYgKCRhbGlnbi1pdGVtcykge1xcclxcbiAgICBhbGlnbi1pdGVtczogJGFsaWduLWl0ZW1zO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG4vLyBAbWl4aW4gbWFzay1jcm9zc2Jyb3dzZXIoJHZhbHVlKSB7XFxyXFxuLy8gICAtd2Via2l0LW1hc2s6ICR2YWx1ZTtcXHJcXG4vLyAgIG1hc2s6ICR2YWx1ZTtcXHJcXG4vLyB9XFxyXFxuXFxyXFxuLy8gQG1peGluIG1hcmdpbi1sZWZ0LWFuZC1yaWdodCgkdmFsdWUpIHtcXHJcXG4vLyAgIG1hcmdpbi1sZWZ0OiAkdmFsdWU7XFxyXFxuLy8gICBtYXJnaW4tcmlnaHQ6ICR2YWx1ZTtcXHJcXG4vLyB9XFxyXFxuXFxyXFxuQG1peGluIHBhZGRpbmctbGVmdC1hbmQtcmlnaHQoJHZhbHVlKSB7XFxyXFxuICBwYWRkaW5nLWxlZnQ6ICR2YWx1ZTtcXHJcXG4gIHBhZGRpbmctcmlnaHQ6ICR2YWx1ZTtcXHJcXG59XCIsXCIucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKGNvbHVtbiwgbnVsbCwgbnVsbCwgY2VudGVyLCBjZW50ZXIpO1xcclxcbiAgICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXHJcXG5cXHJcXG4gICAgaW1nIHtcXHJcXG4gICAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbiAgICAgICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxcztcXHJcXG4gICAgICAgIGhlaWdodDogMjAwcHg7XFxyXFxuICAgICAgICB3aWR0aDogMjAwcHg7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcXHJcXG5cXHJcXG4gICAgICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjUwKTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICBoMixcXHJcXG4gICAgaDMsXFxyXFxuICAgIGg0LFxcclxcbiAgICBoNSB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMiB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MjtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMyB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIuNzY5KTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxN3B4O1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoNCB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAycHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDMuNik7XFxyXFxuICAgICAgICBsaW5lLWhlaWdodDogMTNweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGg1IHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDJweDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gNCk7XFxyXFxuICAgICAgICBsaW5lLWhlaWdodDogMTJweDtcXHJcXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfZ3JheTtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoZXJfY2FyZCB7XFxyXFxuICAgICAgICBoMyB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAyLjc2OSAqIDEuMyk7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGg0IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDMuNiAqIDEuMyk7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGg1IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDQgKiAxLjMpO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoZXJfY2FyZCB7XFxyXFxuICAgICAgICBoMyB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAyLjc2OSAqIDEuNSk7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAzLjYgKiAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDUge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gNCAqIDEuNSk7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBpbWcge1xcclxcbiAgICAgICAgICAgIHdpZHRoOiAyMzBweDtcXHJcXG4gICAgICAgICAgICBoZWlnaHQ6IDIzMHB4O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxufVwiLFwiLm1vZGFsX2NvbnRhY3Qge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHRvcDogNTAlO1xcclxcbiAgICBsZWZ0OiA1MCU7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcclxcbiAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfYmFja2dyb3VuZDtcXHJcXG4gICAgcGFkZGluZzogMzVweDtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcbiAgICB3aWR0aDogNTAlO1xcclxcbiAgICB0cmFuc2l0aW9uOiB3aWR0aCAwLjVzIGVhc2UtaW47XFxyXFxuXFxyXFxuXFxyXFxuICAgIC5tb2RhbF9oZWFkZXIge1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAtMjBweDtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxyXFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICAgICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcclxcblxcclxcbiAgICAgICAgI2Nsb3NlTW9kYWwge1xcclxcbiAgICAgICAgICAgIC8vIENsb3NlIE1vZGFsIFBpY3R1cmVcXHJcXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogZmlsdGVyIDAuNXMgZWFzZS1pbjtcXHJcXG5cXHJcXG4gICAgICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBicmlnaHRuZXNzKDApIHNhdHVyYXRlKDEwMCUpO1xcclxcbiAgICAgICAgICAgIH1cXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIC50ZXh0X2hlYWRlciB7XFxyXFxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoMiB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgKiAxLjc3KTtcXHJcXG4gICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xcclxcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxyXFxuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG4gICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXHJcXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGZvcm0gaW5wdXQge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjIpO1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcclxcbiAgICAgICAgcGFkZGluZzogMTBweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIHRleHRhcmVhIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvMS41KTtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxyXFxuICAgICAgICByZXNpemU6IHZlcnRpY2FsO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGZvcm0gaW5wdXQsXFxyXFxuICAgIGZvcm0gdGV4dGFyZWEge1xcclxcblxcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICBoZWlnaHQ6IDY4cHg7XFxyXFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgZm9ybSBsYWJlbCB7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIGxhYmVsOmxhc3QtY2hpbGQge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuaGVscF9ibGluZCB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5oaWRlX2NvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLW9mZjtcXHJcXG5cXHJcXG4gICAgQGtleWZyYW1lcyBmYWRlLW9mZiB7XFxyXFxuICAgICAgICAwJSB7XFxyXFxuICAgICAgICAgICAgb3BhY2l0eTogMS4wO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgMTAwJSB7XFxyXFxuICAgICAgICAgICAgb3BhY2l0eTogMC41O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcblxcclxcblxcclxcbi5zaG93X2NvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcclxcblxcclxcbiAgICBAa2V5ZnJhbWVzIGZhZGUtaW4ge1xcclxcbiAgICAgICAgMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIDEwMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5tb2RhbF9jb250YWN0IHtcXHJcXG4gICAgICAgIHdpZHRoOiA3MCU7XFxyXFxuXFxyXFxuICAgICAgICAubW9kYWxfaGVhZGVyIHtcXHJcXG4gICAgICAgICAgICBoMiB7XFxyXFxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMS40KTtcXHJcXG4gICAgICAgICAgICB9XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBmb3JtIGxhYmVsIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuMSk7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBmb3JtIGlucHV0IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuMyk7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBmb3JtIHRleHRhcmVhIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNik7XFxyXFxuXFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxyXFxuICAgIC5tb2RhbF9jb250YWN0IHtcXHJcXG4gICAgICAgIHdpZHRoOiA5MCU7XFxyXFxuXFxyXFxuXFxyXFxuICAgICAgICAubW9kYWxfaGVhZGVyIHtcXHJcXG4gICAgICAgICAgICBoMiB7XFxyXFxuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMS4yKTtcXHJcXG4gICAgICAgICAgICB9XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBmb3JtIGxhYmVsIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuMyk7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBmb3JtIGlucHV0IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNSk7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBmb3JtIHRleHRhcmVhIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuOCk7XFxyXFxuXFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG59XCIsXCIubW9kYWxfbGlnaHRib3gge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHRvcDogNTAlO1xcclxcbiAgICBsZWZ0OiA1MCU7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcclxcblxcclxcblxcclxcbiAgICAuY29udGVudF9tZWRpYSB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICAgICAgaGVpZ2h0OiA3MDBweDtcXHJcXG4gICAgICAgIHdpZHRoOiA2MDBweDtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcbiAgICAjdmlkZW9fc2VsZWN0ZWQsXFxyXFxuICAgICNwaWN0dXJlX3NlbGVjdGVkIHtcXHJcXG4gICAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xcclxcblxcclxcbiAgICAgICAgaGVpZ2h0OiBpbmhlcml0O1xcclxcbiAgICAgICAgbWluLXdpZHRoOiA2MDBweDtcXHJcXG5cXHJcXG4gICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIC5oaWRlIHtcXHJcXG4gICAgICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhIHtcXHJcXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMi41KTtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjVzIGVhc2UtaW47XFxyXFxuICAgICAgICBwYWRkaW5nOiAyNXB4O1xcclxcblxcclxcbiAgICAgICAgJjpob3ZlciB7XFxyXFxuICAgICAgICAgICAgY29sb3I6ICRjb2xvcl9iYWNrZ3JvdW5kO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5jbG9zZUxpZ2h0Ym94IHtcXHJcXG4gICAgICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwKSBzYXR1cmF0ZSgxMDAlKSBpbnZlcnQoMTglKSBzZXBpYSgzMSUpIHNhdHVyYXRlKDQ1OTclKSBodWUtcm90YXRlKDM0NGRlZykgYnJpZ2h0bmVzcyg5MyUpIGNvbnRyYXN0KDk1JSk7XFxyXFxuICAgICAgICAvLyB0byB0YXJnZXQgY29sb3IgQ0Y6IGh0dHBzOiAvL2NvZGVwZW4uaW8vc29zdWtlL3Blbi9Qam9xcXBcXHJcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICAgIHRvcDogMTBweDtcXHJcXG4gICAgICAgIHJpZ2h0OiAtNzBweDtcXHJcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGZpbHRlciAwLjVzIGVhc2UtaW47XFxyXFxuXFxyXFxuICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMCkgc2F0dXJhdGUoMTAwJSkgaW52ZXJ0KDYzJSkgc2VwaWEoNDMlKSBzYXR1cmF0ZSg0NDglKSBodWUtcm90YXRlKDMyM2RlZykgYnJpZ2h0bmVzcyg4OSUpIGNvbnRyYXN0KDkyJSk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgaDIge1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogMjRweDtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcbiAgICAuaGVscF9ibGluZCB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5oaWRlX2NvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLW9mZjtcXHJcXG5cXHJcXG4gICAgQGtleWZyYW1lcyBmYWRlLW9mZiB7XFxyXFxuICAgICAgICAwJSB7XFxyXFxuICAgICAgICAgICAgb3BhY2l0eTogMS4wO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgMTAwJSB7XFxyXFxuICAgICAgICAgICAgb3BhY2l0eTogMC41O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcblxcclxcblxcclxcbi5zaG93X2NvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcclxcblxcclxcbiAgICBAa2V5ZnJhbWVzIGZhZGUtaW4ge1xcclxcbiAgICAgICAgMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIDEwMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXHJcXG5cXHJcXG5cXHJcXG4gICAgLm1vZGFsX2xpZ2h0Ym94IHtcXHJcXG5cXHJcXG4gICAgICAgIC5jb250ZW50X21lZGlhIHtcXHJcXG4gICAgICAgICAgICBoZWlnaHQ6IDcwMHB4O1xcclxcbiAgICAgICAgICAgIHdpZHRoOiA1MDBweDtcXHJcXG5cXHJcXG4gICAgICAgICAgICBhIHtcXHJcXG4gICAgICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgICAgICAgICAgICAgcGFkZGluZzogMHB4O1xcclxcbiAgICAgICAgICAgIH1cXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgICN2aWRlb19zZWxlY3RlZCxcXHJcXG4gICAgICAgICNwaWN0dXJlX3NlbGVjdGVkIHtcXHJcXG4gICAgICAgICAgICBoZWlnaHQ6IGluaGVyaXQ7XFxyXFxuICAgICAgICAgICAgd2lkdGg6IDUwMHB4O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLm1vZGFsX2xpZ2h0Ym94IHtcXHJcXG5cXHJcXG4gICAgICAgIC5jb250ZW50X21lZGlhIHtcXHJcXG4gICAgICAgICAgICBoZWlnaHQ6IDcwMHB4O1xcclxcbiAgICAgICAgICAgIHdpZHRoOiA1MDBweDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgICN2aWRlb19zZWxlY3RlZCxcXHJcXG4gICAgICAgICNwaWN0dXJlX3NlbGVjdGVkIHtcXHJcXG4gICAgICAgICAgICBoZWlnaHQ6IGluaGVyaXQ7XFxyXFxuICAgICAgICAgICAgbWluLXdpZHRoOiA1MDBweDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXHJcXG4gICAgLm1vZGFsX2xpZ2h0Ym94IHtcXHJcXG4gICAgICAgIC5jbG9zZUxpZ2h0Ym94IHtcXHJcXG5cXHJcXG4gICAgICAgICAgICBsZWZ0OiAxMDAlO1xcclxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgLmNvbnRlbnRfbWVkaWEge1xcclxcbiAgICAgICAgICAgIGhlaWdodDogNTAwcHg7XFxyXFxuICAgICAgICAgICAgd2lkdGg6IDMwMHB4O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgI3ZpZGVvX3NlbGVjdGVkLFxcclxcbiAgICAgICAgI3BpY3R1cmVfc2VsZWN0ZWQge1xcclxcbiAgICAgICAgICAgIGhlaWdodDogaW5oZXJpdDtcXHJcXG4gICAgICAgICAgICBtaW4td2lkdGg6IDMwMHB4O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxufVwiLFwiLmZpc2hleWVfYnV0dG9uIHtcXHJcXG4gICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjgpO1xcclxcbiAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X2JpZztcXHJcXG4gICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICBwYWRkaW5nOiAxMXB4O1xcclxcbiAgICBtaW4td2lkdGg6IDE3MHB4O1xcclxcbiAgICBtaW4taGVpZ2h0OiA3MHB4O1xcclxcbiAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIHRyYW5zaXRpb246IGNvbG9yIDAuNXMgZWFzZS1pbiwgYmFja2dyb3VuZC1jb2xvciAwLjVzIGVhc2UtaW47XFxyXFxuXFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfYmFja2dyb3VuZDtcXHJcXG4gICAgfVxcclxcbn1cIixcIi5waG90b2dyYXBoX2hlYWRlciB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBuby13cmFwLCBmbGVkLWVuZCwgc3BhY2UtYmV0d2VlbiwgbnVsbCk7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9zZWNvbmRhcnkyX2JnO1xcclxcbiAgICBoZWlnaHQ6IDMxM3B4O1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICBAaW5jbHVkZSBwYWRkaW5nLWxlZnQtYW5kLXJpZ2h0KDMwcHgpO1xcclxcblxcclxcbiAgICBkaXY6bnRoLWNoaWxkKDMpIHtcXHJcXG4gICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICBoMSxcXHJcXG4gICAgaDIsXFxyXFxuICAgIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X3NtYWxsO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgxIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMS43Nyk7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAtMTVweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDIge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNTUpO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMyB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnQtc2l6ZSAvIDIpO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9zZWNvbmRhcnkyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2Fib3V0LFxcclxcbiAgICAucGhvdG9ncmFwaF9idXR0b24ge1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIG51bGwsIGNlbnRlciwgZmxleC1zdGFydCk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDMwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDgwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfYWJvdXQge1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXHJcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIHdyYXAsIGZsZWQtZW5kLCBzcGFjZS1iZXR3ZWVuLCBjZW50ZXIpO1xcclxcbiAgICAgICAgcGFkZGluZy10b3A6IDE1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMS4xNSk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgyIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS44KTtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250LXNpemUgLyAyLjIpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcclxcblxcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIge1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIGZsZWQtZW5kLCBzcGFjZS1iZXR3ZWVuLCBjZW50ZXIpO1xcclxcblxcclxcbiAgICAgICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogaW5oZXJpdDtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDBweDtcXHJcXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMjAwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyPi5waG90b2dyYXBoX2Fib3V0IHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xcclxcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIgaDEsXFxyXFxuICAgIGgyLFxcclxcbiAgICBoMyB7XFxyXFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyPi5waG90b2dyYXBoZXJfY2FyZCB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxufVwiLFwiLnNlbGVjdF9idXR0b24ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1jb250ZW50OiBmbGV4LWVuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcblxcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMik7XFxyXFxuICAgIGJhY2tncm91bmQ6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiBub25lO1xcclxcbiAgICB3aWR0aDogMTcwcHg7XFxyXFxuICAgIGhlaWdodDogNzBweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcclxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXHJcXG4gICAgY29udGVudDogXFxcIj5cXFwiO1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxyXFxuICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS40NCk7XFxyXFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcclxcbiAgICBmbG9hdDogcmlnaHQ7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdF9maWx0ZXIge1xcclxcblxcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLnNlbGVjdF9jb250ZW50IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDVweDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDVweDtcXHJcXG4gICAgbWluLXdpZHRoOiAxNjBweDtcXHJcXG4gICAgYm94LXNoYWRvdzogMHB4IDJweCA4cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXHJcXG4gICAgei1pbmRleDogMTtcXHJcXG5cXHJcXG5cXHJcXG4gICAgLndoaXRlbGluZSB7XFxyXFxuICAgICAgICB3aWR0aDogOTAlO1xcclxcbiAgICAgICAgaGVpZ2h0OiAxcHg7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA1JTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhIHtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIpO1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICAgICAgcGFkZGluZzogMjBweDtcXHJcXG4gICAgICAgIHdpZHRoOiAxNzBweDtcXHJcXG4gICAgICAgIGhlaWdodDogNjBweDtcXHJcXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGE6aG92ZXIge1xcclxcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbjtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbi5zZWxlY3RfZmlsdGVyOmhvdmVyIC5zZWxlY3RfY29udGVudCB7XFxyXFxuXFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xcclxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXHJcXG59XCIsXCIucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBudWxsLCBmbGV4LXN0YXJ0LCBzcGFjZS1hcm91bmQsIGJhc2VsaW5lKTtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfYmFja2dyb3VuZDtcXHJcXG4gICAgbWluLXdpZHRoOiAzNzZweDtcXHJcXG4gICAgbWluLWhlaWdodDogODlweDtcXHJcXG4gICAgYm90dG9tOiAwO1xcclxcbiAgICByaWdodDogMzhweDtcXHJcXG4gICAgei1pbmRleDogMjtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogLTIycHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4gICAgLnRvdGFsX2xpa2VzLFxcclxcbiAgICAucHJpY2VfcmF0ZV9kYWlseSB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNTUpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDMxcHg7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgICAgIHBhZGRpbmctdG9wOiAxOHB4O1xcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC50b3RhbF9saWtlczphZnRlciB7XFxyXFxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDVweDtcXHJcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCLimaVcXFwiO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjU1ICogMS4zMyk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoZXJfc3RhdGlzdGljIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XCIsXCIubWVkaWFfY2FyZCB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcXHJcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcclxcbiAgICBtYXgtd2lkdGg6IDM1MHB4O1xcclxcblxcclxcbiAgICBpbWcsXFxyXFxuICAgIHZpZGVvIHtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIG1heC1oZWlnaHQ6IDMwMHB4O1xcclxcbiAgICAgICAgbWluLWhlaWdodDogMzAwcHg7XFxyXFxuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcXHJcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG5cXHJcXG4gICAgICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNTApO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuICAgIC5kZXRhaWxzIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBudWxsLCBudWxsLCBzcGFjZS1iZXR3ZWVuLCBiYXNlbGluZSk7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiA1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDYge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfc21hbGw7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNSk7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGg2Omxhc3QtY2hpbGQ6OmFmdGVyIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41ICogMS4yNSk7XFxyXFxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxyXFxuICAgICAgICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLm1lZGlhX2NhcmQgaW1nLFxcclxcbiAgICAubWVkaWFfY2FyZCB7XFxyXFxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxuICAgIH1cXHJcXG59XCIsXCIvLy8vIE1BSU4gUEFHRSAvLy8gXFxyXFxuLnBob3RvZ3JhcGhlcl9zZWN0aW9uIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXHJcXG4gICAgZ2FwOiA3MHB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiA3NXB4O1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiA3NXB4O1xcclxcbn1cXHJcXG5cXHJcXG4vLy8vLyBFTkQgTUFJTiBQQUdFIC8vIFxcclxcblxcclxcbi8vLy8vLy8vLy8vLy8vLy8gUEhPVE9HUkFQSEVSIFBBR0UgLy8vLy8vLyBcXHJcXG4ubWFyZ2luX2xlZnRfcmlnaHQge1xcclxcbiAgICBtYXJnaW46IDAgMTAwcHg7XFxyXFxufVxcclxcblxcclxcbi5maWx0ZXJfc2VjdGlvbiB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBudWxsLCBudWxsLCBudWxsLCBiYXNlbGluZSk7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcclxcblxcclxcbiAgICBoNTpmaXJzdC1jaGlsZCB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAyOHB4O1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250LXNpemUgLyAyKTtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5zZWxlY3RfZmlsdGVyIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuLm1lZGlhX3NlY3Rpb24ge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcclxcbiAgICByb3ctZ2FwOiAzMHB4O1xcclxcbiAgICBjb2x1bW4tZ2FwOiA5NXB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiA3NXB4O1xcclxcbn1cXHJcXG5cXHJcXG4vLy8vLy8vLy8vLy8vLyBFTkQgUEhPVE9HUkFQSEVSIFBBR0UgLy8vLy8vLy9cXHJcXG5cXHJcXG4vLy8vLy8vLy8vLy8vLy8vIDQwNCBQQUdFIC8vLy8vLy8gXFxyXFxuLkVSUk9SXzQwNCB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDUlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgcGFkZGluZzogNDBweDtcXHJcXG5cXHJcXG4gICAgaDEge1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNSU7XFxyXFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemUgKiAyO1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNDBweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhIHtcXHJcXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gICAgICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGE6aG92ZXIge1xcclxcbiAgICAgICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuLy8vLy8vLy8vLy8vLy8gRU5EIDQwNCBQQUdFIC8vLy8vLy8vXCIsXCJmb290ZXIge1xcclxcbiAgICBoZWlnaHQ6IDJweDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICBtYXJnaW4tdG9wOiA3NXB4O1xcclxcbn1cIixcIkBtZWRpYSAobWluLXdpZHRoOiAyMDAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLm1lZGlhX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmciAxZnI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcclxcblxcclxcbiAgICAucGhvdG9ncmFwaGVyX3NlY3Rpb24sXFxyXFxuICAgIC5tZWRpYV9zZWN0aW9uIHtcXHJcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXHJcXG5cXHJcXG4gICAgaGVhZGVyIHtcXHJcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiA0MHB4O1xcclxcbiAgICAgICAgaGVpZ2h0OiAxMDBweDtcXHJcXG5cXHJcXG4gICAgICAgIC5sb2dvX3Bob3RvZ3JhcGhlciB7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAubG9nbyxcXHJcXG4gICAgICAgIGgxIHtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMjBweDtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjIwKTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubWFyZ2luX2xlZnRfcmlnaHQge1xcclxcbiAgICAgICAgbWFyZ2luOiAwIDIwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgLmZpbHRlcl9zZWN0aW9uIHtcXHJcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9zZWN0aW9uIHtcXHJcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcclxcblxcclxcbiAgICAubWVkaWFfc2VjdGlvbiB7XFxyXFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVszXSEuL21haW4uc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMV0udXNlWzNdIS4vbWFpbi5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiY29yZS1qcy9zdGFibGVcIjtcclxuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XHJcblxyXG5pbXBvcnQgJy4uLy4uL3Njc3MvbWFpbi5zY3NzJztcclxuaW1wb3J0IHsgZ2V0UGhvdG9ncmFwaGVycyB9IGZyb20gJy4uL3V0aWxzL2ZldGNoJztcclxuaW1wb3J0IHsgZGlzcGxheURhdGFBbGwgfSBmcm9tICcuLi9kYXRhL2Rpc3BsYXlEYXRhJztcclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBpbml0TWFpbigpIHtcclxuICAgIC8vIFRyeSB0byBnZXQgZGF0YSBmcm9tIHBob3RvZ3JhcGhlcyBpZiBlcnJvciB0aGVuIHJlZGlyZWN0IHRvIDQwNCBwYWdlXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlcnMgPSBhd2FpdCBnZXRQaG90b2dyYXBoZXJzKCk7XHJcbiAgICAgICAgZGlzcGxheURhdGFBbGwocGhvdG9ncmFwaGVycywgXCIucGhvdG9ncmFwaGVyX3NlY3Rpb25cIik7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJQYWdlIGluaXRpYWxpc2VyIGF2ZWMgc3VjY8OocyBkZXB1aXMgaW5pdE1haW4oKVwiKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIC8vIElmIGl0J3MgYSBmYWlsIHRoZW4gd2UgcmVkaXJlY3QgdG8gNDA0IEVycm9yIFBhZ2Ugc2luY2UgaW5pdE1haW4oKSBpdCdzIHRoZSBtaW5pbWFsIGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJzQwNC5odG1sJztcclxuICAgIH1cclxufVxyXG5cclxuaW5pdE1haW4oKTtcclxuIl0sIm5hbWVzIjpbImlzQ2FsbGFibGUiLCJyZXF1aXJlIiwidHJ5VG9TdHJpbmciLCIkVHlwZUVycm9yIiwiVHlwZUVycm9yIiwibW9kdWxlIiwiZXhwb3J0cyIsImFyZ3VtZW50IiwiaXNPYmplY3QiLCIkU3RyaW5nIiwiU3RyaW5nIiwidG9JbmRleGVkT2JqZWN0IiwidG9BYnNvbHV0ZUluZGV4IiwibGVuZ3RoT2ZBcnJheUxpa2UiLCJjcmVhdGVNZXRob2QiLCJJU19JTkNMVURFUyIsIiR0aGlzIiwiZWwiLCJmcm9tSW5kZXgiLCJPIiwibGVuZ3RoIiwiaW5kZXgiLCJ2YWx1ZSIsImluY2x1ZGVzIiwiaW5kZXhPZiIsInVuY3VycnlUaGlzIiwic2xpY2UiLCJ0b1N0cmluZyIsInN0cmluZ1NsaWNlIiwiaXQiLCJoYXNPd24iLCJvd25LZXlzIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlIiwiZGVmaW5lUHJvcGVydHlNb2R1bGUiLCJ0YXJnZXQiLCJzb3VyY2UiLCJleGNlcHRpb25zIiwia2V5cyIsImRlZmluZVByb3BlcnR5IiwiZiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImkiLCJrZXkiLCJERVNDUklQVE9SUyIsImNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciIsIm9iamVjdCIsImJpdG1hcCIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIm1ha2VCdWlsdEluIiwibmFtZSIsImRlc2NyaXB0b3IiLCJnZXQiLCJnZXR0ZXIiLCJzZXQiLCJzZXR0ZXIiLCJkZWZpbmVHbG9iYWxQcm9wZXJ0eSIsIm9wdGlvbnMiLCJzaW1wbGUiLCJ1bmRlZmluZWQiLCJnbG9iYWwiLCJ1bnNhZmUiLCJlcnJvciIsIm5vbkNvbmZpZ3VyYWJsZSIsIm5vbldyaXRhYmxlIiwiT2JqZWN0IiwiZmFpbHMiLCJkb2N1bWVudCIsIkVYSVNUUyIsImNyZWF0ZUVsZW1lbnQiLCJ1c2VyQWdlbnQiLCJ0ZXN0IiwiY2xhc3NvZiIsInByb2Nlc3MiLCJnZXRCdWlsdEluIiwiRGVubyIsInZlcnNpb25zIiwidmVyc2lvbiIsInY4IiwibWF0Y2giLCJzcGxpdCIsImNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSIsImRlZmluZUJ1aWx0SW4iLCJjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzIiwiaXNGb3JjZWQiLCJUQVJHRVQiLCJHTE9CQUwiLCJTVEFUSUMiLCJzdGF0IiwiRk9SQ0VEIiwidGFyZ2V0UHJvcGVydHkiLCJzb3VyY2VQcm9wZXJ0eSIsInByb3RvdHlwZSIsImRvbnRDYWxsR2V0U2V0IiwiZm9yY2VkIiwic2hhbSIsImV4ZWMiLCJOQVRJVkVfQklORCIsIkZ1bmN0aW9uUHJvdG90eXBlIiwiRnVuY3Rpb24iLCJhcHBseSIsImNhbGwiLCJSZWZsZWN0IiwiYmluZCIsImFyZ3VtZW50cyIsImFDYWxsYWJsZSIsImZuIiwidGhhdCIsImhhc093blByb3BlcnR5IiwiZ2V0RGVzY3JpcHRvciIsIlBST1BFUiIsInNvbWV0aGluZyIsIkNPTkZJR1VSQUJMRSIsImFGdW5jdGlvbiIsIm5hbWVzcGFjZSIsIm1ldGhvZCIsImlzTnVsbE9yVW5kZWZpbmVkIiwiViIsIlAiLCJmdW5jIiwiY2hlY2siLCJNYXRoIiwiZ2xvYmFsVGhpcyIsIndpbmRvdyIsInNlbGYiLCJ0b09iamVjdCIsImEiLCIkT2JqZWN0IiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJzdG9yZSIsImZ1bmN0aW9uVG9TdHJpbmciLCJpbnNwZWN0U291cmNlIiwiTkFUSVZFX1dFQUtfTUFQIiwic2hhcmVkIiwic2hhcmVkS2V5IiwiaGlkZGVuS2V5cyIsIk9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEIiwiV2Vha01hcCIsImhhcyIsImVuZm9yY2UiLCJnZXR0ZXJGb3IiLCJUWVBFIiwic3RhdGUiLCJ0eXBlIiwid21nZXQiLCJ3bWhhcyIsIndtc2V0IiwibWV0YWRhdGEiLCJmYWNhZGUiLCJTVEFURSIsInJlcGxhY2VtZW50IiwiZmVhdHVyZSIsImRldGVjdGlvbiIsImRhdGEiLCJub3JtYWxpemUiLCJQT0xZRklMTCIsIk5BVElWRSIsInN0cmluZyIsInJlcGxhY2UiLCJ0b0xvd2VyQ2FzZSIsImRvY3VtZW50QWxsIiwiYWxsIiwiU1BFQ0lBTF9ET0NVTUVOVF9BTEwiLCJpc1Byb3RvdHlwZU9mIiwiVVNFX1NZTUJPTF9BU19VSUQiLCIkU3ltYm9sIiwidG9MZW5ndGgiLCJvYmoiLCJDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSIsIkludGVybmFsU3RhdGVNb2R1bGUiLCJlbmZvcmNlSW50ZXJuYWxTdGF0ZSIsImdldEludGVybmFsU3RhdGUiLCJDT05GSUdVUkFCTEVfTEVOR1RIIiwiVEVNUExBVEUiLCJhcml0eSIsImNvbnN0cnVjdG9yIiwiam9pbiIsImNlaWwiLCJmbG9vciIsInRydW5jIiwieCIsIm4iLCJJRThfRE9NX0RFRklORSIsIlY4X1BST1RPVFlQRV9ERUZJTkVfQlVHIiwiYW5PYmplY3QiLCJ0b1Byb3BlcnR5S2V5IiwiJGRlZmluZVByb3BlcnR5IiwiJGdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIkVOVU1FUkFCTEUiLCJXUklUQUJMRSIsIkF0dHJpYnV0ZXMiLCJjdXJyZW50IiwicHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUiLCJpbnRlcm5hbE9iamVjdEtleXMiLCJlbnVtQnVnS2V5cyIsImNvbmNhdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJwdXNoIiwibmFtZXMiLCJyZXN1bHQiLCIkcHJvcGVydHlJc0VudW1lcmFibGUiLCJOQVNIT1JOX0JVRyIsImlucHV0IiwicHJlZiIsInZhbCIsInZhbHVlT2YiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlIiwiaGFzSW5kaWNlcyIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJkb3RBbGwiLCJ1bmljb2RlIiwidW5pY29kZVNldHMiLCJzdGlja3kiLCJ1aWQiLCJTSEFSRUQiLCJJU19QVVJFIiwibW9kZSIsImNvcHlyaWdodCIsImxpY2Vuc2UiLCJWOF9WRVJTSU9OIiwic3ltYm9sIiwiU3ltYm9sIiwiaHRtbCIsImFycmF5U2xpY2UiLCJ2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aCIsIklTX0lPUyIsIklTX05PREUiLCJzZXRJbW1lZGlhdGUiLCJjbGVhciIsImNsZWFySW1tZWRpYXRlIiwiRGlzcGF0Y2giLCJNZXNzYWdlQ2hhbm5lbCIsImNvdW50ZXIiLCJxdWV1ZSIsIk9OUkVBRFlTVEFURUNIQU5HRSIsImxvY2F0aW9uIiwiZGVmZXIiLCJjaGFubmVsIiwicG9ydCIsInJ1biIsImlkIiwicnVubmVyIiwibGlzdGVuZXIiLCJldmVudCIsInBvc3QiLCJwb3N0TWVzc2FnZSIsInByb3RvY29sIiwiaG9zdCIsImhhbmRsZXIiLCJhcmdzIiwibmV4dFRpY2siLCJub3ciLCJwb3J0MiIsInBvcnQxIiwib25tZXNzYWdlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImltcG9ydFNjcmlwdHMiLCJhcHBlbmRDaGlsZCIsInJlbW92ZUNoaWxkIiwic2V0VGltZW91dCIsInRvSW50ZWdlck9ySW5maW5pdHkiLCJtYXgiLCJtaW4iLCJpbnRlZ2VyIiwiSW5kZXhlZE9iamVjdCIsInJlcXVpcmVPYmplY3RDb2VyY2libGUiLCJudW1iZXIiLCJpc1N5bWJvbCIsImdldE1ldGhvZCIsIm9yZGluYXJ5VG9QcmltaXRpdmUiLCJ3ZWxsS25vd25TeW1ib2wiLCJUT19QUklNSVRJVkUiLCJleG90aWNUb1ByaW0iLCJ0b1ByaW1pdGl2ZSIsInBvc3RmaXgiLCJyYW5kb20iLCJOQVRJVkVfU1lNQk9MIiwiaXRlcmF0b3IiLCJwYXNzZWQiLCJyZXF1aXJlZCIsIldlbGxLbm93blN5bWJvbHNTdG9yZSIsInN5bWJvbEZvciIsImNyZWF0ZVdlbGxLbm93blN5bWJvbCIsIndpdGhvdXRTZXR0ZXIiLCJkZXNjcmlwdGlvbiIsImRlZmluZUJ1aWx0SW5BY2Nlc3NvciIsInJlZ0V4cEZsYWdzIiwiUmVnRXhwIiwiUmVnRXhwUHJvdG90eXBlIiwiSU5ESUNFU19TVVBQT1JUIiwiY2FsbHMiLCJleHBlY3RlZCIsImFkZEdldHRlciIsImNociIsInBhaXJzIiwiJCIsImNzc1dpdGhNYXBwaW5nVG9TdHJpbmciLCJsaXN0IiwibWFwIiwiaXRlbSIsImNvbnRlbnQiLCJuZWVkTGF5ZXIiLCJtb2R1bGVzIiwibWVkaWEiLCJkZWR1cGUiLCJzdXBwb3J0cyIsImxheWVyIiwiYWxyZWFkeUltcG9ydGVkTW9kdWxlcyIsImsiLCJfayIsImNzc01hcHBpbmciLCJidG9hIiwiYmFzZTY0IiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJKU09OIiwic3RyaW5naWZ5Iiwic291cmNlTWFwcGluZyIsInNvdXJjZVVSTHMiLCJzb3VyY2VzIiwic291cmNlUm9vdCIsInBob3RvZ3JhcGhlckZhY3RvcnkiLCJkaXNwbGF5RGF0YSIsInBob3RvZ3JhcGhlcnMiLCJwaG90b2dyYXBoZXJTZWxlY3RlZCIsImZvckVhY2giLCJwaG90b2dyYXBoZXIiLCJlbnYiLCJOT0RFX0VOViIsImNvbnNvbGUiLCJsb2ciLCJwaG90b2dyYXBoZXJNb2RlbCIsInNldFBob3RvZ3JhcGhlckhlYWRlciIsInNldFN0aWNreUJhclByaWNlIiwiZGlzcGxheURhdGFBbGwiLCJxdWVyeVNlbGVjdG9yIiwicGhvdG9ncmFwaGVyc1NlY3Rpb24iLCJ1c2VyQ2FyZERPTSIsImdldFVzZXJDYXJkRE9NIiwiYnVpbGRFbGVtZW50IiwiaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQiLCJzZXRJbm5lckh0bWwiLCJzZXRBcmlhbExhYmVsIiwiY2l0eSIsImNvdW50cnkiLCJ0YWdsaW5lIiwicG9ydHJhaXQiLCJwcmljZSIsInBpY3R1cmUiLCJhcnRpY2xlIiwic2V0QXR0cmlidXRlIiwibGlua0VsZW1lbnQiLCJpbWdQcm9maWxlIiwiZWxlbWVudCIsImFsdCIsImluc2VydEFkamFjZW50SFRNTCIsImluc2VydFZpZGVvSW5zaWRlRWxlbWVudCIsInZpZGVvIiwiYXJpYUxhYmVsIiwiaW5zZXJ0SFRNTEFmdGVyRWxlbWVudCIsImJhbGlzZSIsImF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiYXJpYWxhYmVsIiwidGV4dGUiLCJ0ZXh0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJmZXRjaEpTT04iLCJ1cmwiLCJyZXNwb25zZSIsImZldGNoIiwib2siLCJFcnJvciIsImpzb25SZXNwb25zZSIsImpzb24iLCJnZXRQaG90b2dyYXBoZXJzIiwiZ2V0TWVkaWFzIiwibWVkaWFzIiwiaW5pdE1haW4iLCJlIiwiaHJlZiJdLCJzb3VyY2VSb290IjoiIn0=