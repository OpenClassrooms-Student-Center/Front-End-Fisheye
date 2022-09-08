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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n/** Used to load all variables for this project about SCSS **/ /** FONT **/\n/** END FONT **/\n/** COLOR VARIABLES **/\n/** END COLOR VARIABLES **/\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\n/********************** GENERAL **********************/\nhtml,\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: \"DM Sans\", sans-serif;\n  animation: 1s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/********************** END GENERAL **********************/\n/** IMPORT MIXIN **/\n/** IMPORT HEADER STYLES **/\nheader {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 120px;\n}\nheader h1 {\n  color: #901C1C;\n  top: 44px;\n  margin-right: 100px;\n  font-weight: 400;\n  font-size: 36px;\n  line-height: 47px;\n}\nheader .logo,\nheader .logo_photographer {\n  height: 50px;\n}\nheader .logo {\n  margin-left: 115px;\n}\nheader .logo_photographer {\n  margin-left: 100px;\n  margin-top: 10px;\n}\n\n/** IMPORT PHOTOGRAPHERS CARDS **/\n.photographer_card {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  justify-self: center;\n}\n.photographer_card img {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  transition: box-shadow 1s;\n  height: 200px;\n  width: 200px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.photographer_card img:hover {\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.photographer_card h2,\n.photographer_card h3,\n.photographer_card h4,\n.photographer_card h5 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n}\n.photographer_card h2 {\n  margin-top: 20px;\n  color: #D3573C;\n  font-size: 36px;\n}\n.photographer_card h3 {\n  font-size: 13.0010834236px;\n  line-height: 17px;\n  color: #901C1C;\n}\n.photographer_card h4 {\n  margin-top: 2px;\n  font-size: 10px;\n  line-height: 13px;\n  color: #000000;\n}\n.photographer_card h5 {\n  margin-top: 2px;\n  font-size: 9px;\n  line-height: 12px;\n  text-align: center;\n  color: #757575;\n}\n\n@media (max-width: 1100px) {\n  .photographer_card h3 {\n    font-size: 16.9014084507px;\n    margin-top: 10px;\n  }\n  .photographer_card h4 {\n    font-size: 13px;\n    margin-top: 10px;\n  }\n  .photographer_card h5 {\n    font-size: 11.7px;\n    margin-top: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_card h3 {\n    font-size: 19.5016251354px;\n  }\n  .photographer_card h4 {\n    font-size: 15px;\n  }\n  .photographer_card h5 {\n    font-size: 13.5px;\n  }\n  .photographer_card img {\n    width: 230px;\n    height: 230px;\n  }\n}\n/** IMPORT MODAL COMPONENT **/\n.modal_contact {\n  display: none;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  border-radius: 5px;\n  background-color: #DB8876;\n  padding: 35px;\n  margin: auto;\n  width: 47%;\n  transition: width 0.5s ease-in;\n}\n.modal_contact .modal_header {\n  justify-content: space-between;\n  width: 100%;\n  margin-top: -20px;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: baseline;\n}\n.modal_contact .modal_header #closeModal {\n  cursor: pointer;\n}\n.modal_contact .modal_header #closeModal .default_color {\n  fill: white;\n}\n.modal_contact .modal_header #closeModal .color_primary1 {\n  fill: #901C1C;\n}\n.modal_contact .modal_header h2 {\n  font-size: 63.72px;\n  font-weight: normal;\n  text-align: left;\n}\n.modal_contact form input {\n  font-size: 30px;\n  margin-bottom: 5px;\n  padding: 10px;\n}\n.modal_contact form textarea {\n  margin-top: 15px;\n  font-size: 24px;\n  margin-bottom: 20px;\n  resize: vertical;\n}\n.modal_contact form input,\n.modal_contact form textarea {\n  width: 100%;\n  height: 68px;\n  border: none;\n  border-radius: 5px;\n}\n.modal_contact form label {\n  color: #000000;\n  font-size: 36px;\n}\n.modal_contact form label:last-child {\n  margin-top: 15px;\n}\n.modal_contact .help_blind {\n  display: none;\n}\n\n.hide_content {\n  animation: 0.5s ease-in forwards fade-off;\n}\n@keyframes fade-off {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.4;\n  }\n}\n\n.show_content {\n  animation: 0.5s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0.4;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@media (max-width: 1100px) {\n  .modal_contact {\n    width: 65%;\n  }\n  .modal_contact .modal_header h2 {\n    font-size: 54px;\n  }\n}\n@media (max-width: 800px) {\n  .modal_contact {\n    width: 90%;\n  }\n  .modal_contact .modal_header h2 {\n    font-size: 43.2px;\n  }\n  .modal_contact form label {\n    font-size: 27.6923076923px;\n  }\n  .modal_contact form input {\n    font-size: 24px;\n  }\n  .modal_contact form textarea {\n    font-size: 20px;\n  }\n}\n/** IMPORT CONTACT BUTTON COMPONENT **/\n.fisheye_button {\n  font-size: 20px;\n  font-weight: 700;\n  font-family: \"DM Sans\", sans-serif;\n  color: white;\n  padding: 11px;\n  min-width: 170px;\n  min-height: 70px;\n  border: none;\n  background-color: #901C1C;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: color 0.5s ease-in, background-color 0.5s ease-in;\n}\n.fisheye_button:hover {\n  color: #000000;\n  background-color: #DB8876;\n}\n\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\n.photograph_header {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: no-wrap;\n  align-content: fled-end;\n  justify-content: space-between;\n  background-color: #FAFAFA;\n  height: 313px;\n  margin-top: 10px;\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.photograph_header div:nth-child(3) {\n  margin-right: 20px;\n}\n.photograph_header h1,\n.photograph_header h2,\n.photograph_header h3 {\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 400;\n}\n.photograph_header h1 {\n  font-size: 63.72px;\n  margin-bottom: -15px;\n  color: #D3573C;\n}\n.photograph_header h2 {\n  margin-top: 15px;\n  margin-bottom: 20px;\n  font-size: 23.2258064516px;\n  color: #901C1C;\n}\n.photograph_header h3 {\n  font-size: 18px;\n  color: #525252;\n}\n.photograph_header .photograph_about,\n.photograph_header .photograph_button {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n}\n.photograph_header .photograph_button {\n  margin-top: 30px;\n  margin-right: 80px;\n}\n.photograph_header .photograph_about {\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\n@media (max-width: 1100px) {\n  .photograph_header {\n    background-color: white;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n    padding-top: 15px;\n  }\n  .photograph_header h1 {\n    font-size: 41.4px;\n  }\n  .photograph_header h2 {\n    font-size: 20px;\n  }\n  .photograph_header h3 {\n    font-size: 16.3636363636px;\n  }\n  .photograph_button {\n    margin-bottom: 30px;\n  }\n}\n@media (max-width: 800px) {\n  .photograph_header {\n    display: flex;\n    flex-direction: column;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .photograph_header .photograph_button {\n    align-items: inherit;\n    margin-right: 0px;\n    position: absolute;\n    margin-top: 200px;\n  }\n  .photograph_header > .photograph_about {\n    margin-left: 0;\n    align-items: center;\n  }\n  .photograph_header h1,\nh2,\nh3 {\n    text-align: center;\n  }\n  .photograph_header > .photographer_card {\n    display: none;\n  }\n}\n/** IMPORT SELECT FILTER COMPONENT **/\n.select_button {\n  display: flex;\n  align-content: flex-end;\n  align-items: center;\n  justify-content: space-between;\n  text-align: left;\n  padding-left: 20px;\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 18px;\n  background: #901C1C;\n  color: white;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border: none;\n  border-color: none;\n  width: 170px;\n  height: 70px;\n  cursor: pointer;\n}\n\n.select_button::after {\n  transition: transform 0.25s ease-in;\n  content: \">\";\n  transform: rotate(90deg);\n  font-size: 25px;\n  text-align: right;\n  float: right;\n  margin-right: 20px;\n}\n\n.select_filter {\n  position: relative;\n  display: inline-block;\n}\n\n.select_content {\n  display: none;\n  position: absolute;\n  background: #901C1C;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  min-width: 160px;\n  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n}\n.select_content .whiteline {\n  width: 90%;\n  height: 1px;\n  background-color: white;\n  margin-left: 5%;\n}\n.select_content a {\n  transition: all 0.5s ease-in;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-size: 18px;\n  color: white;\n  padding: 20px;\n  width: 170px;\n  height: 60px;\n  text-decoration: none;\n  display: block;\n}\n.select_content a:hover {\n  cursor: pointer;\n  transition: all 0.5s ease-in;\n  color: #000000;\n}\n\n.select_filter:hover .select_content {\n  display: block;\n}\n\n.select_filter:hover .select_button::after {\n  transform: rotate(-90deg);\n  transition: transform 0.25s ease-in;\n}\n\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\n.photographer_statistic {\n  display: flex;\n  flex-direction: row;\n  align-content: flex-start;\n  justify-content: space-around;\n  align-items: baseline;\n  position: fixed;\n  background-color: #DB8876;\n  min-width: 376px;\n  min-height: 89px;\n  bottom: 0;\n  right: 38px;\n  z-index: 2;\n  margin-bottom: -22px;\n  border-radius: 5px;\n}\n.photographer_statistic .total_likes,\n.photographer_statistic .price_rate_daily {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 23.2258064516px;\n  line-height: 31px;\n  color: #000000;\n  padding-top: 18px;\n}\n.photographer_statistic .total_likes:after {\n  padding-left: 5px;\n  content: \"♥\";\n  font-size: 30.8903225806px;\n}\n\n@media (max-width: 700px) {\n  .photographer_statistic {\n    display: none;\n  }\n}\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\n.media_card {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  max-width: 350px;\n}\n.media_card img,\n.media_card video {\n  transition: box-shadow 1s;\n  width: 100%;\n  max-height: 300px;\n  min-height: 300px;\n  object-fit: cover;\n  border-radius: 5px;\n}\n.media_card img:hover,\n.media_card video:hover {\n  transition: box-shadow 1s;\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.media_card .details {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: baseline;\n  margin-top: 5px;\n}\n.media_card h6 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n  font-size: 24px;\n  color: #901C1C;\n}\n.media_card h6:last-child::after {\n  font-size: 30px;\n  padding-left: 10px;\n  content: \"♥\";\n}\n\n@media (max-width: 600px) {\n  .media_card img,\n.media_card {\n    max-width: 100%;\n  }\n}\n/** IMPORT PAGES (other) Styles **/\n.photographer_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 70px;\n  margin-top: 75px;\n  margin-bottom: 75px;\n}\n\n.margin_left_right {\n  margin: 0 100px;\n}\n\n.filter_section {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n  margin-left: 0;\n}\n.filter_section h5:first-child {\n  margin-top: 20px;\n  margin-right: 28px;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-style: normal;\n  font-size: 18px;\n  color: #000000;\n}\n.filter_section .select_filter {\n  margin-top: 10px;\n}\n\n.media_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  row-gap: 30px;\n  column-gap: 95px;\n  margin-top: 20px;\n  margin-bottom: 75px;\n}\n\n.ERROR_404 {\n  margin-top: 5%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  padding: 40px;\n}\n.ERROR_404 h1 {\n  margin-bottom: 5%;\n  text-align: center;\n  font-size: 72px;\n  margin-bottom: 40px;\n}\n.ERROR_404 a {\n  text-decoration: none;\n  color: inherit;\n}\n.ERROR_404 a:hover {\n  color: inherit;\n}\n\n/** IMPORT FOOTER STYLES **/\nfooter {\n  height: 2px;\n  width: 100%;\n  background-color: white;\n  margin-top: 75px;\n}\n\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\n (components Elements got their own Responsive Rules in their Stylesheet) **/\n@media (max-width: 1100px) {\n  .photographer_section,\n.media_section {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 800px) {\n  header {\n    flex-direction: column;\n    margin-top: 40px;\n    height: 100px;\n  }\n  header .logo_photographer {\n    margin-left: 0;\n  }\n  header .logo,\nheader h1 {\n    margin-left: 20px;\n    margin-right: 20px;\n    font-size: 30px;\n  }\n  .margin_left_right {\n    margin: 0 20px;\n  }\n  .filter_section {\n    justify-content: space-between;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_section {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 600px) {\n  .media_section {\n    grid-template-columns: 1fr;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/main.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_global.scss","webpack://./src/scss/pages/_header.scss","webpack://./src/scss/_mixin.scss","webpack://./src/scss/components/_photographer_cards.scss","webpack://./src/scss/components/modal/_contact.scss","webpack://./src/scss/components/_fisheye_button.scss","webpack://./src/scss/components/_photograph_header.scss","webpack://./src/scss/components/_select_filter.scss","webpack://./src/scss/components/_photographer_statistic.scss","webpack://./src/scss/components/_media_cards.scss","webpack://./src/scss/pages/_pages.scss","webpack://./src/scss/pages/_footer.scss","webpack://./src/scss/_responsive.scss"],"names":[],"mappings":"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","sourcesContent":["/** Used to load all variables for this project about SCSS **/\r\n@import \"_variables.scss\";\r\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\r\n@import \"_global.scss\";\r\n/** IMPORT MIXIN **/\r\n@import \"_mixin.scss\";\r\n/** IMPORT HEADER STYLES **/\r\n@import \"pages/header.scss\";\r\n/** IMPORT PHOTOGRAPHERS CARDS **/\r\n@import \"components/photographer_cards.scss\";\r\n/** IMPORT MODAL COMPONENT **/\r\n@import \"components/modal/_contact.scss\";\r\n@import \"components/modal/_lightbox.scss\";\r\n/** IMPORT CONTACT BUTTON COMPONENT **/\r\n@import \"components/fisheye_button.scss\";\r\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\r\n@import \"components/photograph_header.scss\";\r\n/** IMPORT SELECT FILTER COMPONENT **/\r\n@import \"components/select_filter.scss\";\r\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\r\n@import \"components/photographer_statistic.scss\";\r\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\r\n@import \"components/media_cards.scss\";\r\n/** IMPORT PAGES (other) Styles **/\r\n@import \"pages/pages.scss\";\r\n/** IMPORT FOOTER STYLES **/\r\n@import \"pages/footer.scss\";\r\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\r\n (components Elements got their own Responsive Rules in their Stylesheet) **/\r\n@import \"_responsive.scss\";","/** FONT **/\r\n$font_global: \"DM Sans\", sans-serif;\r\n$font_weight_small: 400;\r\n$font_weight_big: 700;\r\n\r\n$font_size: 36px;\r\n/** END FONT **/\r\n\r\n/** COLOR VARIABLES **/\r\n$default_color: white;\r\n$default_font_color: #000000;\r\n$color_gray: #757575;\r\n$color_primary1: #901C1C;\r\n$color_primary2: #D3573C;\r\n$color_secondary2: #525252;\r\n$color_secondary2_bg: #FAFAFA;\r\n$color_background: #DB8876;\r\n/** END COLOR VARIABLES **/","/********************** GENERAL **********************/\r\nhtml,\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n\r\n}\r\n\r\nbody {\r\n  font-family: $font_global;\r\n  animation: 1s ease-in forwards fade-in;\r\n\r\n  @keyframes fade-in {\r\n    0% {\r\n      opacity: 0;\r\n    }\r\n\r\n    100% {\r\n      opacity: 1.0;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n/********************** END GENERAL **********************/","header {\r\n    @include flex-basic(row, null, null, space-between, center);\r\n    height: 120px;\r\n\r\n\r\n    h1 {\r\n        color: $color_primary1;\r\n        top: 44px;\r\n        margin-right: 100px;\r\n        font-weight: $font_weight_small;\r\n        font-size: $font_size;\r\n        line-height: 47px;\r\n    }\r\n\r\n    .logo,\r\n    .logo_photographer {\r\n        height: 50px;\r\n    }\r\n\r\n    .logo {\r\n        margin-left: 115px;\r\n    }\r\n\r\n    .logo_photographer {\r\n        margin-left: 100px;\r\n        margin-top: 10px;\r\n    }\r\n}","@mixin flex-basic($flex-direction,\r\n  $flex-wrap,\r\n  $align-content,\r\n  $justify-content,\r\n  $align-items) {\r\n  display: flex;\r\n  flex-direction: $flex-direction;\r\n\r\n  @if ($flex-wrap) {\r\n    flex-wrap: $flex-wrap;\r\n  }\r\n\r\n  @if ($align-content) {\r\n    align-content: $align-content;\r\n  }\r\n\r\n  @if ($justify-content) {\r\n    justify-content: $justify-content;\r\n  }\r\n\r\n  @if ($align-items) {\r\n    align-items: $align-items;\r\n  }\r\n}\r\n\r\n// @mixin mask-crossbrowser($value) {\r\n//   -webkit-mask: $value;\r\n//   mask: $value;\r\n// }\r\n\r\n// @mixin margin-left-and-right($value) {\r\n//   margin-left: $value;\r\n//   margin-right: $value;\r\n// }\r\n\r\n@mixin padding-left-and-right($value) {\r\n  padding-left: $value;\r\n  padding-right: $value;\r\n}",".photographer_card {\r\n    @include flex-basic(column, null, null, center, center);\r\n    justify-self: center;\r\n\r\n    img {\r\n        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n        transition: box-shadow 1s;\r\n        height: 200px;\r\n        width: 200px;\r\n        border-radius: 50%;\r\n        object-fit: cover;\r\n\r\n        &:hover {\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n    h2,\r\n    h3,\r\n    h4,\r\n    h5 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 20px;\r\n        color: $color_primary2;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font_size / 2.769);\r\n        line-height: 17px;\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h4 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 3.6);\r\n        line-height: 13px;\r\n        color: $default_font_color;\r\n    }\r\n\r\n    h5 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 4);\r\n        line-height: 12px;\r\n        text-align: center;\r\n        color: $color_gray;\r\n    }\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.5);\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.5);\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.5);\r\n        }\r\n\r\n        img {\r\n            width: 230px;\r\n            height: 230px;\r\n        }\r\n    }\r\n\r\n}",".modal_contact {\r\n    display: none;\r\n    position: fixed;\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n    border-radius: 5px;\r\n    background-color: $color_background;\r\n    padding: 35px;\r\n    margin: auto;\r\n    width: 47%;\r\n    transition: width 0.5s ease-in;\r\n\r\n    .modal_header {\r\n        justify-content: space-between;\r\n        width: 100%;\r\n        margin-top: -20px;\r\n        margin-bottom: 10px;\r\n        display: flex;\r\n        align-items: baseline;\r\n\r\n        #closeModal {\r\n            // Close Modal Picture\r\n            cursor: pointer;\r\n\r\n            .default_color {\r\n                fill: $default_color;\r\n            }\r\n\r\n            .color_primary1 {\r\n                fill: $color_primary1;\r\n            }\r\n        }\r\n\r\n\r\n        h2 {\r\n            font-size: calc($font_size * 1.77);\r\n            font-weight: normal;\r\n            text-align:left;\r\n        }\r\n    }\r\n\r\n    form input {\r\n        font-size: calc($font_size / 1.2);\r\n        margin-bottom: 5px;\r\n        padding: 10px;\r\n    }\r\n\r\n    form textarea {\r\n        margin-top: 15px;\r\n        font-size: calc($font_size /1.5);\r\n        margin-bottom: 20px;\r\n        resize: vertical;\r\n    }\r\n\r\n    form input,\r\n    form textarea {\r\n\r\n        width: 100%;\r\n        height: 68px;\r\n        border: none;\r\n        border-radius: 5px;\r\n\r\n    }\r\n\r\n\r\n    form label {\r\n        color: $default_font_color;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    form label:last-child {\r\n        margin-top: 15px;\r\n    }\r\n\r\n    .help_blind {\r\n        display: none;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n.hide_content {\r\n    animation: 0.5s ease-in forwards fade-off;\r\n\r\n    @keyframes fade-off {\r\n        0% {\r\n            opacity: 1.0;\r\n        }\r\n\r\n        100% {\r\n            opacity: 0.4;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\r\n.show_content {\r\n    animation: 0.5s ease-in forwards fade-in;\r\n\r\n    @keyframes fade-in {\r\n        0% {\r\n            opacity: 0.4;\r\n        }\r\n\r\n        100% {\r\n            opacity: 1.0;\r\n        }\r\n    }\r\n\r\n\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n\r\n    .modal_contact {\r\n        width: 65%;\r\n\r\n        .modal_header {\r\n            h2 {\r\n                font-size: calc($font_size * 1.5);\r\n            }\r\n\r\n\r\n        }\r\n\r\n    }\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .modal_contact {\r\n        width: 90%;\r\n\r\n        .modal_header {\r\n            h2 {\r\n                font-size: calc($font_size * 1.2);\r\n            }\r\n        }\r\n\r\n        form label {\r\n            font-size: $font_size / 1.3;\r\n        }\r\n\r\n        form input {\r\n            font-size: calc($font_size / 1.5);\r\n        }\r\n\r\n        form textarea {\r\n            font-size: $font_size / 1.8;\r\n\r\n        }\r\n\r\n\r\n\r\n    }\r\n}",".fisheye_button {\r\n    font-size: calc($font_size / 1.8);\r\n    font-weight: $font_weight_big;\r\n    font-family: $font_global;\r\n    color: $default_color;\r\n    padding: 11px;\r\n    min-width: 170px;\r\n    min-height: 70px;\r\n    border: none;\r\n    background-color: $color_primary1;\r\n    border-radius: 5px;\r\n    cursor: pointer;\r\n    transition: color 0.5s ease-in, background-color 0.5s ease-in;\r\n\r\n    &:hover {\r\n        color: $default_font_color;\r\n        background-color: $color_background;\r\n    }\r\n}",".photograph_header {\r\n    @include flex-basic(row, no-wrap, fled-end, space-between, null);\r\n    background-color: $color_secondary2_bg;\r\n    height: 313px;\r\n    margin-top: 10px;\r\n    @include padding-left-and-right(30px);\r\n\r\n    div:nth-child(3) {\r\n        margin-right: 20px;\r\n    }\r\n\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h1 {\r\n        font-size: calc($font_size * 1.77);\r\n        margin-bottom: -15px;\r\n        color: $color_primary2;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 15px;\r\n        margin-bottom: 20px;\r\n        font-size: calc($font_size / 1.55);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font-size / 2);\r\n        color: $color_secondary2;\r\n    }\r\n\r\n    .photograph_about,\r\n    .photograph_button {\r\n        @include flex-basic(column, null, null, center, flex-start);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-top: 30px;\r\n        margin-right: 80px;\r\n    }\r\n\r\n    .photograph_about {\r\n        margin-left: 20px;\r\n        margin-bottom: 10px;\r\n    }\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n    .photograph_header {\r\n        background-color: $default_color;\r\n        @include flex-basic(column, wrap, fled-end, space-between, center);\r\n        padding-top: 15px;\r\n    }\r\n\r\n    .photograph_header h1 {\r\n        font-size: calc($font_size * 1.15);\r\n    }\r\n\r\n    .photograph_header h2 {\r\n        font-size: calc($font_size / 1.8);\r\n\r\n    }\r\n\r\n    .photograph_header h3 {\r\n        font-size: calc($font-size / 2.2);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-bottom: 30px;\r\n\r\n\r\n    }\r\n\r\n\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .photograph_header {\r\n        @include flex-basic(column, null, fled-end, space-between, center);\r\n\r\n        .photograph_button {\r\n            align-items: inherit;\r\n            margin-right: 0px;\r\n            position: absolute;\r\n            margin-top: 200px;\r\n        }\r\n\r\n    }\r\n\r\n    .photograph_header>.photograph_about {\r\n        margin-left: 0;\r\n        align-items: center;\r\n    }\r\n\r\n    .photograph_header h1,\r\n    h2,\r\n    h3 {\r\n        text-align: center;\r\n    }\r\n\r\n    .photograph_header>.photographer_card {\r\n        display: none;\r\n    }\r\n\r\n\r\n}",".select_button {\r\n    display: flex;\r\n    align-content: flex-end;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n\r\n    text-align: left;\r\n    padding-left: 20px;\r\n    font-family: $font_global;\r\n    font-style: normal;\r\n    font-weight: $font_weight_big;\r\n    font-size: calc($font_size / 2);\r\n    background: $color_primary1;\r\n    color: $default_color;\r\n    border-top-left-radius: 5px;\r\n    border-top-right-radius: 5px;\r\n    border: none;\r\n    border-color: none;\r\n    width: 170px;\r\n    height: 70px;\r\n    cursor: pointer;\r\n}\r\n\r\n.select_button::after {\r\n    transition: transform 0.25s ease-in;\r\n    content: \">\";\r\n    transform: rotate(90deg);\r\n    font-size: calc($font_size / 1.44);\r\n    text-align: right;\r\n    float: right;\r\n    margin-right: 20px;\r\n\r\n}\r\n\r\n.select_filter {\r\n\r\n    position: relative;\r\n    display: inline-block;\r\n}\r\n\r\n\r\n.select_content {\r\n    display: none;\r\n    position: absolute;\r\n    background: $color_primary1;\r\n    border-bottom-left-radius: 5px;\r\n    border-bottom-right-radius: 5px;\r\n    min-width: 160px;\r\n    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\r\n    z-index: 1;\r\n\r\n\r\n    .whiteline {\r\n        width: 90%;\r\n        height: 1px;\r\n        background-color: $default_color;\r\n        margin-left: 5%;\r\n    }\r\n\r\n    a {\r\n        transition: all 0.5s ease-in;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 2);\r\n        color: $default_color;\r\n        padding: 20px;\r\n        width: 170px;\r\n        height: 60px;\r\n        text-decoration: none;\r\n        display: block;\r\n    }\r\n\r\n    a:hover {\r\n        cursor: pointer;\r\n        transition: all 0.5s ease-in;\r\n        color: $default_font_color;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n\r\n.select_filter:hover .select_content {\r\n\r\n    display: block;\r\n}\r\n\r\n.select_filter:hover .select_button::after {\r\n    transform: rotate(-90deg);\r\n    transition: transform 0.25s ease-in;\r\n}",".photographer_statistic {\r\n    @include flex-basic(row, null, flex-start, space-around, baseline);\r\n    position: fixed;\r\n    background-color: $color_background;\r\n    min-width: 376px;\r\n    min-height: 89px;\r\n    bottom: 0;\r\n    right: 38px;\r\n    z-index: 2;\r\n    margin-bottom: -22px;\r\n    border-radius: 5px;\r\n\r\n\r\n\r\n    .total_likes,\r\n    .price_rate_daily {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 1.55);\r\n        line-height: 31px;\r\n        color: $default_font_color;\r\n        padding-top: 18px;\r\n\r\n    }\r\n\r\n    .total_likes:after {\r\n        padding-left: 5px;\r\n        content: \"♥\";\r\n        font-size: calc($font_size / 1.55 * 1.33);\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_statistic {\r\n        display: none;\r\n    }\r\n\r\n}",".media_card {\r\n    @include flex-basic(column, null, null, null, null);\r\n    flex-wrap: wrap;\r\n    max-width: 350px;\r\n\r\n    img,\r\n    video {\r\n        transition: box-shadow 1s;\r\n        width: 100%;\r\n        max-height: 300px;\r\n        min-height: 300px;\r\n        object-fit: cover;\r\n        border-radius: 5px;\r\n\r\n        &:hover {\r\n            transition: box-shadow 1s;\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n\r\n\r\n    .details {\r\n        @include flex-basic(row, null, null, space-between, baseline);\r\n        margin-top: 5px;\r\n    }\r\n\r\n    h6 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n        font-size: calc($font_size / 1.5);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h6:last-child::after {\r\n        font-size: calc($font_size / 1.5 * 1.25);\r\n        padding-left: 10px;\r\n        content: \"♥\";\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_card img,\r\n    .media_card {\r\n        max-width: 100%;\r\n    }\r\n}","//// MAIN PAGE /// \r\n.photographer_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    gap: 70px;\r\n    margin-top: 75px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n///// END MAIN PAGE // \r\n\r\n//////////////// PHOTOGRAPHER PAGE /////// \r\n.margin_left_right {\r\n    margin: 0 100px;\r\n}\r\n\r\n.filter_section {\r\n    @include flex-basic(row, null, null, null, baseline);\r\n    margin-left: 0;\r\n\r\n    h5:first-child {\r\n        margin-top: 20px;\r\n        margin-right: 28px;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-style: normal;\r\n        font-size: calc($font-size / 2);\r\n        color: $default_font_color;\r\n    }\r\n\r\n    .select_filter {\r\n        margin-top: 10px;\r\n    }\r\n}\r\n\r\n.media_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    row-gap: 30px;\r\n    column-gap: 95px;\r\n    margin-top: 20px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n////////////// END PHOTOGRAPHER PAGE ////////\r\n\r\n//////////////// 404 PAGE /////// \r\n.ERROR_404 {\r\n    margin-top: 5%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: space-around;\r\n    padding: 40px;\r\n\r\n    h1 {\r\n        margin-bottom: 5%;\r\n        text-align: center;\r\n        font-size: $font_size * 2;\r\n        margin-bottom: 40px;\r\n    }\r\n\r\n    a {\r\n        text-decoration: none;\r\n        color: inherit;\r\n    }\r\n\r\n    a:hover {\r\n        color: inherit;\r\n    }\r\n}\r\n\r\n////////////// END 404 PAGE ////////","footer {\r\n    height: 2px;\r\n    width: 100%;\r\n    background-color: $default_color;\r\n    margin-top: 75px;\r\n}","@media (max-width: 1100px) {\r\n\r\n    .photographer_section,\r\n    .media_section {\r\n        grid-template-columns: 1fr 1fr;\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 800px) {\r\n\r\n    header {\r\n        flex-direction: column;\r\n        margin-top: 40px;\r\n        height: 100px;\r\n\r\n        .logo_photographer {\r\n            margin-left: 0;\r\n        }\r\n\r\n        .logo,\r\n        h1 {\r\n            margin-left: 20px;\r\n            margin-right: 20px;\r\n            font-size: calc($font_size / 1.20);\r\n        }\r\n    }\r\n\r\n    .margin_left_right {\r\n        margin: 0 20px;\r\n    }\r\n\r\n\r\n    .filter_section {\r\n        justify-content: space-between;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n\r\n    .photographer_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLFdBQVcsTUFBTSxPQUFPLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsWUFBWSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxNQUFNLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxLQUFLLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sS0FBSyxZQUFZLEtBQUssVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxPQUFPLFlBQVksS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGVBQWUsYUFBYSxXQUFXLFdBQVcsY0FBYyxlQUFlLE9BQU8sTUFBTSxXQUFXLE1BQU0sUUFBUSxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsT0FBTyxPQUFPLFdBQVcsYUFBYSxlQUFlLGVBQWUsT0FBTyxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE9BQU8sTUFBTSxLQUFLLFlBQVksVUFBVSxhQUFhLGNBQWMsZUFBZSxlQUFlLGVBQWUsWUFBWSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLEtBQUssTUFBTSxLQUFLLFdBQVcsYUFBYSxlQUFlLGVBQWUsZUFBZSxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sUUFBUSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sS0FBSyxZQUFZLE1BQU0sVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsWUFBWSxZQUFZLFdBQVcsV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxNQUFNLFdBQVcsWUFBWSxhQUFhLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsV0FBVyxXQUFXLFFBQVEsTUFBTSxVQUFVLE9BQU8sTUFBTSxXQUFXLFdBQVcsT0FBTyxZQUFZLE1BQU0sVUFBVSxZQUFZLGFBQWEsZUFBZSxlQUFlLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLE1BQU0sT0FBTyxXQUFXLFlBQVksV0FBVyxZQUFZLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxPQUFPLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLE1BQU0sVUFBVSxZQUFZLFdBQVcsV0FBVyxNQUFNLE9BQU8sV0FBVyxVQUFVLFdBQVcsV0FB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Y29yZS1qcy9pbnRlcm5hbHMvYS1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc2xpY2UuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4tYWNjZXNzb3IuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLWlzLWlvcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2V4cG9ydC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1hcHBseS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1uYW1lLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LW1ldGhvZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9odG1sLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWNhbGxhYmxlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcHVyZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbWFrZS1idWlsdC1pbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9tYXRoLXRydW5jLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3JkaW5hcnktdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1mbGFncy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdGFzay5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90cnktdG8tc3RyaW5nLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VpZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy92OC1wcm90b3R5cGUtZGVmaW5lLWJ1Zy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy92YWxpZGF0ZS1hcmd1bWVudHMtbGVuZ3RoLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dlYWstbWFwLWJhc2ljLWRldGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLmZsYWdzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuY2xlYXItaW1tZWRpYXRlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuaW1tZWRpYXRlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuc2V0LWltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL2RhdGEvZGlzcGxheURhdGEuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9mYWN0b3JpZXMvcGhvdG9ncmFwaGVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2RvbS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2ZldGNoLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3Njc3MvbWFpbi5zY3NzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3Njc3MvbWFpbi5zY3NzP2IzNzkiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvcGFnZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciB0cnlUb1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90cnktdG8tc3RyaW5nJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgQXNzZXJ0OiBJc0NhbGxhYmxlKGFyZ3VtZW50KSBpcyB0cnVlYFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzQ2FsbGFibGUoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93ICRUeXBlRXJyb3IodHJ5VG9TdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyICRTdHJpbmcgPSBTdHJpbmc7XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYEFzc2VydDogVHlwZShhcmd1bWVudCkgaXMgT2JqZWN0YFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzT2JqZWN0KGFyZ3VtZW50KSkgcmV0dXJuIGFyZ3VtZW50O1xuICB0aHJvdyAkVHlwZUVycm9yKCRTdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG59O1xuIiwidmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIGxlbmd0aE9mQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBpbmRleE9mLCBpbmNsdWRlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IGxlbmd0aE9mQXJyYXlMaWtlKE8pO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdW5jdXJyeVRoaXMoW10uc2xpY2UpO1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgdG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyh7fS50b1N0cmluZyk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBzdHJpbmdTbGljZSh0b1N0cmluZyhpdCksIDgsIC0xKTtcbn07XG4iLCJ2YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlLCBleGNlcHRpb25zKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzT3duKHRhcmdldCwga2V5KSAmJiAhKGV4Y2VwdGlvbnMgJiYgaGFzT3duKGV4Y2VwdGlvbnMsIGtleSkpKSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gICAgfVxuICB9XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgbWFrZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbWFrZS1idWlsdC1pbicpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKSB7XG4gIGlmIChkZXNjcmlwdG9yLmdldCkgbWFrZUJ1aWx0SW4oZGVzY3JpcHRvci5nZXQsIG5hbWUsIHsgZ2V0dGVyOiB0cnVlIH0pO1xuICBpZiAoZGVzY3JpcHRvci5zZXQpIG1ha2VCdWlsdEluKGRlc2NyaXB0b3Iuc2V0LCBuYW1lLCB7IHNldHRlcjogdHJ1ZSB9KTtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5LmYodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKTtcbn07XG4iLCJ2YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBtYWtlQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9tYWtlLWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lR2xvYmFsUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuICB2YXIgc2ltcGxlID0gb3B0aW9ucy5lbnVtZXJhYmxlO1xuICB2YXIgbmFtZSA9IG9wdGlvbnMubmFtZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uYW1lIDoga2V5O1xuICBpZiAoaXNDYWxsYWJsZSh2YWx1ZSkpIG1ha2VCdWlsdEluKHZhbHVlLCBuYW1lLCBvcHRpb25zKTtcbiAgaWYgKG9wdGlvbnMuZ2xvYmFsKSB7XG4gICAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gICAgZWxzZSBkZWZpbmVHbG9iYWxQcm9wZXJ0eShrZXksIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFvcHRpb25zLnVuc2FmZSkgZGVsZXRlIE9ba2V5XTtcbiAgICAgIGVsc2UgaWYgKE9ba2V5XSkgc2ltcGxlID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gICAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gICAgZWxzZSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6ICFvcHRpb25zLm5vbkNvbmZpZ3VyYWJsZSxcbiAgICAgIHdyaXRhYmxlOiAhb3B0aW9ucy5ub25Xcml0YWJsZVxuICAgIH0pO1xuICB9IHJldHVybiBPO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBkZWZpbmVQcm9wZXJ0eShnbG9iYWwsIGtleSwgeyB2YWx1ZTogdmFsdWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIERldGVjdCBJRTgncyBpbmNvbXBsZXRlIGRlZmluZVByb3BlcnR5IGltcGxlbWVudGF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAxLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KVsxXSAhPSA3O1xufSk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBFWElTVFMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBFWElTVFMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsInZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAvKD86aXBhZHxpcGhvbmV8aXBvZCkuKmFwcGxld2Via2l0L2kudGVzdCh1c2VyQWdlbnQpO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3NvZihnbG9iYWwucHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignbmF2aWdhdG9yJywgJ3VzZXJBZ2VudCcpIHx8ICcnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBEZW5vID0gZ2xvYmFsLkRlbm87XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnMgfHwgRGVubyAmJiBEZW5vLnZlcnNpb247XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52ODtcbnZhciBtYXRjaCwgdmVyc2lvbjtcblxuaWYgKHY4KSB7XG4gIG1hdGNoID0gdjguc3BsaXQoJy4nKTtcbiAgLy8gaW4gb2xkIENocm9tZSwgdmVyc2lvbnMgb2YgVjggaXNuJ3QgVjggPSBDaHJvbWUgLyAxMFxuICAvLyBidXQgdGhlaXIgY29ycmVjdCB2ZXJzaW9ucyBhcmUgbm90IGludGVyZXN0aW5nIGZvciB1c1xuICB2ZXJzaW9uID0gbWF0Y2hbMF0gPiAwICYmIG1hdGNoWzBdIDwgNCA/IDEgOiArKG1hdGNoWzBdICsgbWF0Y2hbMV0pO1xufVxuXG4vLyBCcm93c2VyRlMgTm9kZUpTIGBwcm9jZXNzYCBwb2x5ZmlsbCBpbmNvcnJlY3RseSBzZXQgYC52OGAgdG8gYDAuMGBcbi8vIHNvIGNoZWNrIGB1c2VyQWdlbnRgIGV2ZW4gaWYgYC52OGAgZXhpc3RzLCBidXQgMFxuaWYgKCF2ZXJzaW9uICYmIHVzZXJBZ2VudCkge1xuICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS8pO1xuICBpZiAoIW1hdGNoIHx8IG1hdGNoWzFdID49IDc0KSB7XG4gICAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0Nocm9tZVxcLyhcXGQrKS8pO1xuICAgIGlmIChtYXRjaCkgdmVyc2lvbiA9ICttYXRjaFsxXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnNpb247XG4iLCIvLyBJRTgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gW1xuICAnY29uc3RydWN0b3InLFxuICAnaGFzT3duUHJvcGVydHknLFxuICAnaXNQcm90b3R5cGVPZicsXG4gICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG4gICd0b0xvY2FsZVN0cmluZycsXG4gICd0b1N0cmluZycsXG4gICd2YWx1ZU9mJ1xuXTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcbnZhciBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcycpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xuXG4vKlxuICBvcHRpb25zLnRhcmdldCAgICAgICAgIC0gbmFtZSBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICBvcHRpb25zLmdsb2JhbCAgICAgICAgIC0gdGFyZ2V0IGlzIHRoZSBnbG9iYWwgb2JqZWN0XG4gIG9wdGlvbnMuc3RhdCAgICAgICAgICAgLSBleHBvcnQgYXMgc3RhdGljIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucHJvdG8gICAgICAgICAgLSBleHBvcnQgYXMgcHJvdG90eXBlIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucmVhbCAgICAgICAgICAgLSByZWFsIHByb3RvdHlwZSBtZXRob2QgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLmZvcmNlZCAgICAgICAgIC0gZXhwb3J0IGV2ZW4gaWYgdGhlIG5hdGl2ZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICBvcHRpb25zLmJpbmQgICAgICAgICAgIC0gYmluZCBtZXRob2RzIHRvIHRoZSB0YXJnZXQsIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy53cmFwICAgICAgICAgICAtIHdyYXAgY29uc3RydWN0b3JzIHRvIHByZXZlbnRpbmcgZ2xvYmFsIHBvbGx1dGlvbiwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLnVuc2FmZSAgICAgICAgIC0gdXNlIHRoZSBzaW1wbGUgYXNzaWdubWVudCBvZiBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGRlbGV0ZSArIGRlZmluZVByb3BlcnR5XG4gIG9wdGlvbnMuc2hhbSAgICAgICAgICAgLSBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gIG9wdGlvbnMuZW51bWVyYWJsZSAgICAgLSBleHBvcnQgYXMgZW51bWVyYWJsZSBwcm9wZXJ0eVxuICBvcHRpb25zLmRvbnRDYWxsR2V0U2V0IC0gcHJldmVudCBjYWxsaW5nIGEgZ2V0dGVyIG9uIHRhcmdldFxuICBvcHRpb25zLm5hbWUgICAgICAgICAgIC0gdGhlIC5uYW1lIG9mIHRoZSBmdW5jdGlvbiBpZiBpdCBkb2VzIG5vdCBtYXRjaCB0aGUga2V5XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XG4gIHZhciBUQVJHRVQgPSBvcHRpb25zLnRhcmdldDtcbiAgdmFyIEdMT0JBTCA9IG9wdGlvbnMuZ2xvYmFsO1xuICB2YXIgU1RBVElDID0gb3B0aW9ucy5zdGF0O1xuICB2YXIgRk9SQ0VELCB0YXJnZXQsIGtleSwgdGFyZ2V0UHJvcGVydHksIHNvdXJjZVByb3BlcnR5LCBkZXNjcmlwdG9yO1xuICBpZiAoR0xPQkFMKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKFNUQVRJQykge1xuICAgIHRhcmdldCA9IGdsb2JhbFtUQVJHRVRdIHx8IGRlZmluZUdsb2JhbFByb3BlcnR5KFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMuZG9udENhbGxHZXRTZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PSB0eXBlb2YgdGFyZ2V0UHJvcGVydHkpIGNvbnRpbnVlO1xuICAgICAgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyhzb3VyY2VQcm9wZXJ0eSwgdGFyZ2V0UHJvcGVydHkpO1xuICAgIH1cbiAgICAvLyBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gICAgaWYgKG9wdGlvbnMuc2hhbSB8fCAodGFyZ2V0UHJvcGVydHkgJiYgdGFyZ2V0UHJvcGVydHkuc2hhbSkpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShzb3VyY2VQcm9wZXJ0eSwgJ3NoYW0nLCB0cnVlKTtcbiAgICB9XG4gICAgZGVmaW5lQnVpbHRJbih0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsInZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgYXBwbHkgPSBGdW5jdGlvblByb3RvdHlwZS5hcHBseTtcbnZhciBjYWxsID0gRnVuY3Rpb25Qcm90b3R5cGUuY2FsbDtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tcmVmbGVjdCAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBSZWZsZWN0ID09ICdvYmplY3QnICYmIFJlZmxlY3QuYXBwbHkgfHwgKE5BVElWRV9CSU5EID8gY2FsbC5iaW5kKGFwcGx5KSA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhbGwuYXBwbHkoYXBwbHksIGFyZ3VtZW50cyk7XG59KTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBiaW5kID0gdW5jdXJyeVRoaXModW5jdXJyeVRoaXMuYmluZCk7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQpIHtcbiAgYUNhbGxhYmxlKGZuKTtcbiAgcmV0dXJuIHRoYXQgPT09IHVuZGVmaW5lZCA/IGZuIDogTkFUSVZFX0JJTkQgPyBiaW5kKGZuLCB0aGF0KSA6IGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tZnVuY3Rpb24tcHJvdG90eXBlLWJpbmQgLS0gc2FmZVxuICB2YXIgdGVzdCA9IChmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pLmJpbmQoKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiB0eXBlb2YgdGVzdCAhPSAnZnVuY3Rpb24nIHx8IHRlc3QuaGFzT3duUHJvcGVydHkoJ3Byb3RvdHlwZScpO1xufSk7XG4iLCJ2YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfQklORCA/IGNhbGwuYmluZChjYWxsKSA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhbGwuYXBwbHkoY2FsbCwgYXJndW1lbnRzKTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciBnZXREZXNjcmlwdG9yID0gREVTQ1JJUFRPUlMgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxudmFyIEVYSVNUUyA9IGhhc093bihGdW5jdGlvblByb3RvdHlwZSwgJ25hbWUnKTtcbi8vIGFkZGl0aW9uYWwgcHJvdGVjdGlvbiBmcm9tIG1pbmlmaWVkIC8gbWFuZ2xlZCAvIGRyb3BwZWQgZnVuY3Rpb24gbmFtZXNcbnZhciBQUk9QRVIgPSBFWElTVFMgJiYgKGZ1bmN0aW9uIHNvbWV0aGluZygpIHsgLyogZW1wdHkgKi8gfSkubmFtZSA9PT0gJ3NvbWV0aGluZyc7XG52YXIgQ09ORklHVVJBQkxFID0gRVhJU1RTICYmICghREVTQ1JJUFRPUlMgfHwgKERFU0NSSVBUT1JTICYmIGdldERlc2NyaXB0b3IoRnVuY3Rpb25Qcm90b3R5cGUsICduYW1lJykuY29uZmlndXJhYmxlKSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBFWElTVFM6IEVYSVNUUyxcbiAgUFJPUEVSOiBQUk9QRVIsXG4gIENPTkZJR1VSQUJMRTogQ09ORklHVVJBQkxFXG59O1xuIiwidmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBiaW5kID0gRnVuY3Rpb25Qcm90b3R5cGUuYmluZDtcbnZhciBjYWxsID0gRnVuY3Rpb25Qcm90b3R5cGUuY2FsbDtcbnZhciB1bmN1cnJ5VGhpcyA9IE5BVElWRV9CSU5EICYmIGJpbmQuYmluZChjYWxsLCBjYWxsKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfQklORCA/IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZm4gJiYgdW5jdXJyeVRoaXMoZm4pO1xufSA6IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZm4gJiYgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjYWxsLmFwcGx5KGZuLCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBpc0NhbGxhYmxlKGFyZ3VtZW50KSA/IGFyZ3VtZW50IDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKSA6IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwidmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG52YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcblxuLy8gYEdldE1ldGhvZGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldG1ldGhvZFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoViwgUCkge1xuICB2YXIgZnVuYyA9IFZbUF07XG4gIHJldHVybiBpc051bGxPclVuZGVmaW5lZChmdW5jKSA/IHVuZGVmaW5lZCA6IGFDYWxsYWJsZShmdW5jKTtcbn07XG4iLCJ2YXIgY2hlY2sgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICYmIGl0Lk1hdGggPT0gTWF0aCAmJiBpdDtcbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG5tb2R1bGUuZXhwb3J0cyA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLWdsb2JhbC10aGlzIC0tIHNhZmVcbiAgY2hlY2sodHlwZW9mIGdsb2JhbFRoaXMgPT0gJ29iamVjdCcgJiYgZ2xvYmFsVGhpcykgfHxcbiAgY2hlY2sodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLWdsb2JhbHMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIGZhbGxiYWNrXG4gIChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KSgpIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHVuY3VycnlUaGlzKHt9Lmhhc093blByb3BlcnR5KTtcblxuLy8gYEhhc093blByb3BlcnR5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaGFzb3ducHJvcGVydHlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1oYXNvd24gLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuaGFzT3duIHx8IGZ1bmN0aW9uIGhhc093bihpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eSh0b09iamVjdChpdCksIGtleSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ2RvY3VtZW50JywgJ2RvY3VtZW50RWxlbWVudCcpO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIFRoYW5rcyB0byBJRTggZm9yIGl0cyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG52YXIgc3BsaXQgPSB1bmN1cnJ5VGhpcygnJy5zcGxpdCk7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuICEkT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCk7XG59KSA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY2xhc3NvZihpdCkgPT0gJ1N0cmluZycgPyBzcGxpdChpdCwgJycpIDogJE9iamVjdChpdCk7XG59IDogJE9iamVjdDtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gdW5jdXJyeVRoaXMoRnVuY3Rpb24udG9TdHJpbmcpO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYGNvcmUtanNAMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAoIWlzQ2FsbGFibGUoc3RvcmUuaW5zcGVjdFNvdXJjZSkpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nKGl0KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZS5pbnNwZWN0U291cmNlO1xuIiwidmFyIE5BVElWRV9XRUFLX01BUCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWFrLW1hcC1iYXNpYy1kZXRlY3Rpb24nKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQgPSAnT2JqZWN0IGFscmVhZHkgaW5pdGlhbGl6ZWQnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCB8fCBzaGFyZWQuc3RhdGUpIHtcbiAgdmFyIHN0b3JlID0gc2hhcmVkLnN0YXRlIHx8IChzaGFyZWQuc3RhdGUgPSBuZXcgV2Vha01hcCgpKTtcbiAgdmFyIHdtZ2V0ID0gdW5jdXJyeVRoaXMoc3RvcmUuZ2V0KTtcbiAgdmFyIHdtaGFzID0gdW5jdXJyeVRoaXMoc3RvcmUuaGFzKTtcbiAgdmFyIHdtc2V0ID0gdW5jdXJyeVRoaXMoc3RvcmUuc2V0KTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGlmICh3bWhhcyhzdG9yZSwgaXQpKSB0aHJvdyBUeXBlRXJyb3IoT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQpO1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIHdtc2V0KHN0b3JlLCBpdCwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtZ2V0KHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcyhzdG9yZSwgaXQpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIFNUQVRFID0gc2hhcmVkS2V5KCdzdGF0ZScpO1xuICBoaWRkZW5LZXlzW1NUQVRFXSA9IHRydWU7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBpZiAoaGFzT3duKGl0LCBTVEFURSkpIHRocm93IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGhhc093bihpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBoYXNPd24oaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwiLy8gYElzQ2FsbGFibGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2NhbGxhYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09ICdmdW5jdGlvbic7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgcmVwbGFjZW1lbnQgPSAvI3xcXC5wcm90b3R5cGVcXC4vO1xuXG52YXIgaXNGb3JjZWQgPSBmdW5jdGlvbiAoZmVhdHVyZSwgZGV0ZWN0aW9uKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGFbbm9ybWFsaXplKGZlYXR1cmUpXTtcbiAgcmV0dXJuIHZhbHVlID09IFBPTFlGSUxMID8gdHJ1ZVxuICAgIDogdmFsdWUgPT0gTkFUSVZFID8gZmFsc2VcbiAgICA6IGlzQ2FsbGFibGUoZGV0ZWN0aW9uKSA/IGZhaWxzKGRldGVjdGlvbilcbiAgICA6ICEhZGV0ZWN0aW9uO1xufTtcblxudmFyIG5vcm1hbGl6ZSA9IGlzRm9yY2VkLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVwbGFjZW1lbnQsICcuJykudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBkYXRhID0gaXNGb3JjZWQuZGF0YSA9IHt9O1xudmFyIE5BVElWRSA9IGlzRm9yY2VkLk5BVElWRSA9ICdOJztcbnZhciBQT0xZRklMTCA9IGlzRm9yY2VkLlBPTFlGSUxMID0gJ1AnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRm9yY2VkO1xuIiwiLy8gd2UgY2FuJ3QgdXNlIGp1c3QgYGl0ID09IG51bGxgIHNpbmNlIG9mIGBkb2N1bWVudC5hbGxgIHNwZWNpYWwgY2FzZVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1Jc0hUTUxEREEtaW50ZXJuYWwtc2xvdC1hZWNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA9PT0gbnVsbCB8fCBpdCA9PT0gdW5kZWZpbmVkO1xufTtcbiIsInZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciBkb2N1bWVudEFsbCA9IHR5cGVvZiBkb2N1bWVudCA9PSAnb2JqZWN0JyAmJiBkb2N1bWVudC5hbGw7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtSXNIVE1MRERBLWludGVybmFsLXNsb3RcbnZhciBTUEVDSUFMX0RPQ1VNRU5UX0FMTCA9IHR5cGVvZiBkb2N1bWVudEFsbCA9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudEFsbCAhPT0gdW5kZWZpbmVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNQRUNJQUxfRE9DVU1FTlRfQUxMID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IGlzQ2FsbGFibGUoaXQpIHx8IGl0ID09PSBkb2N1bWVudEFsbDtcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogaXNDYWxsYWJsZShpdCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcblxubW9kdWxlLmV4cG9ydHMgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgJFN5bWJvbCA9IGdldEJ1aWx0SW4oJ1N5bWJvbCcpO1xuICByZXR1cm4gaXNDYWxsYWJsZSgkU3ltYm9sKSAmJiBpc1Byb3RvdHlwZU9mKCRTeW1ib2wucHJvdG90eXBlLCAkT2JqZWN0KGl0KSk7XG59O1xuIiwidmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xuXG4vLyBgTGVuZ3RoT2ZBcnJheUxpa2VgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1sZW5ndGhvZmFycmF5bGlrZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0b0xlbmd0aChvYmoubGVuZ3RoKTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIENPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLW5hbWUnKS5DT05GSUdVUkFCTEU7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcblxudmFyIGVuZm9yY2VJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5lbmZvcmNlO1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbnZhciBDT05GSUdVUkFCTEVfTEVOR1RIID0gREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgJ2xlbmd0aCcsIHsgdmFsdWU6IDggfSkubGVuZ3RoICE9PSA4O1xufSk7XG5cbnZhciBURU1QTEFURSA9IFN0cmluZyhTdHJpbmcpLnNwbGl0KCdTdHJpbmcnKTtcblxudmFyIG1ha2VCdWlsdEluID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIG5hbWUsIG9wdGlvbnMpIHtcbiAgaWYgKFN0cmluZyhuYW1lKS5zbGljZSgwLCA3KSA9PT0gJ1N5bWJvbCgnKSB7XG4gICAgbmFtZSA9ICdbJyArIFN0cmluZyhuYW1lKS5yZXBsYWNlKC9eU3ltYm9sXFwoKFteKV0qKVxcKS8sICckMScpICsgJ10nO1xuICB9XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZ2V0dGVyKSBuYW1lID0gJ2dldCAnICsgbmFtZTtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zZXR0ZXIpIG5hbWUgPSAnc2V0ICcgKyBuYW1lO1xuICBpZiAoIWhhc093bih2YWx1ZSwgJ25hbWUnKSB8fCAoQ09ORklHVVJBQkxFX0ZVTkNUSU9OX05BTUUgJiYgdmFsdWUubmFtZSAhPT0gbmFtZSkpIHtcbiAgICBpZiAoREVTQ1JJUFRPUlMpIGRlZmluZVByb3BlcnR5KHZhbHVlLCAnbmFtZScsIHsgdmFsdWU6IG5hbWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICBlbHNlIHZhbHVlLm5hbWUgPSBuYW1lO1xuICB9XG4gIGlmIChDT05GSUdVUkFCTEVfTEVOR1RIICYmIG9wdGlvbnMgJiYgaGFzT3duKG9wdGlvbnMsICdhcml0eScpICYmIHZhbHVlLmxlbmd0aCAhPT0gb3B0aW9ucy5hcml0eSkge1xuICAgIGRlZmluZVByb3BlcnR5KHZhbHVlLCAnbGVuZ3RoJywgeyB2YWx1ZTogb3B0aW9ucy5hcml0eSB9KTtcbiAgfVxuICB0cnkge1xuICAgIGlmIChvcHRpb25zICYmIGhhc093bihvcHRpb25zLCAnY29uc3RydWN0b3InKSAmJiBvcHRpb25zLmNvbnN0cnVjdG9yKSB7XG4gICAgICBpZiAoREVTQ1JJUFRPUlMpIGRlZmluZVByb3BlcnR5KHZhbHVlLCAncHJvdG90eXBlJywgeyB3cml0YWJsZTogZmFsc2UgfSk7XG4gICAgLy8gaW4gVjggfiBDaHJvbWUgNTMsIHByb3RvdHlwZXMgb2Ygc29tZSBtZXRob2RzLCBsaWtlIGBBcnJheS5wcm90b3R5cGUudmFsdWVzYCwgYXJlIG5vbi13cml0YWJsZVxuICAgIH0gZWxzZSBpZiAodmFsdWUucHJvdG90eXBlKSB2YWx1ZS5wcm90b3R5cGUgPSB1bmRlZmluZWQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgdmFyIHN0YXRlID0gZW5mb3JjZUludGVybmFsU3RhdGUodmFsdWUpO1xuICBpZiAoIWhhc093bihzdGF0ZSwgJ3NvdXJjZScpKSB7XG4gICAgc3RhdGUuc291cmNlID0gVEVNUExBVEUuam9pbih0eXBlb2YgbmFtZSA9PSAnc3RyaW5nJyA/IG5hbWUgOiAnJyk7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcblxuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0ZW5kLW5hdGl2ZSAtLSByZXF1aXJlZFxuRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gbWFrZUJ1aWx0SW4oZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiBpc0NhbGxhYmxlKHRoaXMpICYmIGdldEludGVybmFsU3RhdGUodGhpcykuc291cmNlIHx8IGluc3BlY3RTb3VyY2UodGhpcyk7XG59LCAndG9TdHJpbmcnKTtcbiIsInZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYE1hdGgudHJ1bmNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1tYXRoLnRydW5jXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1tYXRoLXRydW5jIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gTWF0aC50cnVuYyB8fCBmdW5jdGlvbiB0cnVuYyh4KSB7XG4gIHZhciBuID0gK3g7XG4gIHJldHVybiAobiA+IDAgPyBmbG9vciA6IGNlaWwpKG4pO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdjgtcHJvdG90eXBlLWRlZmluZS1idWcnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b1Byb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleScpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgJGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgRU5VTUVSQUJMRSA9ICdlbnVtZXJhYmxlJztcbnZhciBDT05GSUdVUkFCTEUgPSAnY29uZmlndXJhYmxlJztcbnZhciBXUklUQUJMRSA9ICd3cml0YWJsZSc7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmICh0eXBlb2YgTyA9PT0gJ2Z1bmN0aW9uJyAmJiBQID09PSAncHJvdG90eXBlJyAmJiAndmFsdWUnIGluIEF0dHJpYnV0ZXMgJiYgV1JJVEFCTEUgaW4gQXR0cmlidXRlcyAmJiAhQXR0cmlidXRlc1tXUklUQUJMRV0pIHtcbiAgICB2YXIgY3VycmVudCA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gICAgaWYgKGN1cnJlbnQgJiYgY3VycmVudFtXUklUQUJMRV0pIHtcbiAgICAgIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICAgICAgQXR0cmlidXRlcyA9IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBDT05GSUdVUkFCTEUgaW4gQXR0cmlidXRlcyA/IEF0dHJpYnV0ZXNbQ09ORklHVVJBQkxFXSA6IGN1cnJlbnRbQ09ORklHVVJBQkxFXSxcbiAgICAgICAgZW51bWVyYWJsZTogRU5VTUVSQUJMRSBpbiBBdHRyaWJ1dGVzID8gQXR0cmlidXRlc1tFTlVNRVJBQkxFXSA6IGN1cnJlbnRbRU5VTUVSQUJMRV0sXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG4gIH0gcmV0dXJuICRkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbn0gOiAkZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gJGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93ICRUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5Jyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXNPd24oTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIWNhbGwocHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZiwgTywgUCksIE9bUF0pO1xufTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbnZhciBoaWRkZW5LZXlzID0gZW51bUJ1Z0tleXMuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHluYW1lcyAtLSBzYWZlXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlzeW1ib2xzIC0tIHNhZmVcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdW5jdXJyeVRoaXMoe30uaXNQcm90b3R5cGVPZik7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoW10ucHVzaCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pICFoYXNPd24oaGlkZGVuS2V5cywga2V5KSAmJiBoYXNPd24oTywga2V5KSAmJiBwdXNoKHJlc3VsdCwga2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhc093bihPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5pbmRleE9mKHJlc3VsdCwga2V5KSB8fCBwdXNoKHJlc3VsdCwga2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICEkcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh7IDE6IDIgfSwgMSk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eWlzZW51bWVyYWJsZVxuZXhwb3J0cy5mID0gTkFTSE9STl9CVUcgPyBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIFYpO1xuICByZXR1cm4gISFkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZTtcbn0gOiAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCJ2YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYE9yZGluYXJ5VG9QcmltaXRpdmVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vcmRpbmFyeXRvcHJpbWl0aXZlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCwgcHJlZikge1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKHByZWYgPT09ICdzdHJpbmcnICYmIGlzQ2FsbGFibGUoZm4gPSBpbnB1dC50b1N0cmluZykgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmIChpc0NhbGxhYmxlKGZuID0gaW5wdXQudmFsdWVPZikgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmIChwcmVmICE9PSAnc3RyaW5nJyAmJiBpc0NhbGxhYmxlKGZuID0gaW5wdXQudG9TdHJpbmcpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyAkVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG52YXIgY29uY2F0ID0gdW5jdXJyeVRoaXMoW10uY29uY2F0KTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGNvbmNhdChrZXlzLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1yZWdleHAucHJvdG90eXBlLmZsYWdzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRoYXQgPSBhbk9iamVjdCh0aGlzKTtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAodGhhdC5oYXNJbmRpY2VzKSByZXN1bHQgKz0gJ2QnO1xuICBpZiAodGhhdC5nbG9iYWwpIHJlc3VsdCArPSAnZyc7XG4gIGlmICh0aGF0Lmlnbm9yZUNhc2UpIHJlc3VsdCArPSAnaSc7XG4gIGlmICh0aGF0Lm11bHRpbGluZSkgcmVzdWx0ICs9ICdtJztcbiAgaWYgKHRoYXQuZG90QWxsKSByZXN1bHQgKz0gJ3MnO1xuICBpZiAodGhhdC51bmljb2RlKSByZXN1bHQgKz0gJ3UnO1xuICBpZiAodGhhdC51bmljb2RlU2V0cykgcmVzdWx0ICs9ICd2JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoaXQpKSB0aHJvdyAkVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcblxudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgZGVmaW5lR2xvYmFsUHJvcGVydHkoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJ2YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiAnMy4yNS4wJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE0LTIwMjIgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknLFxuICBsaWNlbnNlOiAnaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvYmxvYi92My4yNS4wL0xJQ0VOU0UnLFxuICBzb3VyY2U6ICdodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcydcbn0pO1xuIiwiLyogZXNsaW50LWRpc2FibGUgZXMteC9uby1zeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5c3ltYm9scyAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xubW9kdWxlLmV4cG9ydHMgPSAhIU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN5bWJvbCA9IFN5bWJvbCgpO1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBgZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzYCBwb2x5ZmlsbCBzeW1ib2xzIGNvbnZlcnRlZCB0byBvYmplY3QgYXJlIG5vdCBTeW1ib2wgaW5zdGFuY2VzXG4gIHJldHVybiAhU3RyaW5nKHN5bWJvbCkgfHwgIShPYmplY3Qoc3ltYm9sKSBpbnN0YW5jZW9mIFN5bWJvbCkgfHxcbiAgICAvLyBDaHJvbWUgMzgtNDAgc3ltYm9scyBhcmUgbm90IGluaGVyaXRlZCBmcm9tIERPTSBjb2xsZWN0aW9ucyBwcm90b3R5cGVzIHRvIGluc3RhbmNlc1xuICAgICFTeW1ib2wuc2hhbSAmJiBWOF9WRVJTSU9OICYmIFY4X1ZFUlNJT04gPCA0MTtcbn0pO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBhcHBseSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1hcHBseScpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2h0bWwnKTtcbnZhciBhcnJheVNsaWNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNsaWNlJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3ZhbGlkYXRlLWFyZ3VtZW50cy1sZW5ndGgnKTtcbnZhciBJU19JT1MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLWlvcycpO1xudmFyIElTX05PREUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUnKTtcblxudmFyIHNldCA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXIgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIEZ1bmN0aW9uID0gZ2xvYmFsLkZ1bmN0aW9uO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIFN0cmluZyA9IGdsb2JhbC5TdHJpbmc7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBsb2NhdGlvbiwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG5cbnRyeSB7XG4gIC8vIERlbm8gdGhyb3dzIGEgUmVmZXJlbmNlRXJyb3Igb24gYGxvY2F0aW9uYCBhY2Nlc3Mgd2l0aG91dCBgLS1sb2NhdGlvbmAgZmxhZ1xuICBsb2NhdGlvbiA9IGdsb2JhbC5sb2NhdGlvbjtcbn0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cblxudmFyIHJ1biA9IGZ1bmN0aW9uIChpZCkge1xuICBpZiAoaGFzT3duKHF1ZXVlLCBpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xuXG52YXIgcnVubmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcnVuKGlkKTtcbiAgfTtcbn07XG5cbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4oZXZlbnQuZGF0YSk7XG59O1xuXG52YXIgcG9zdCA9IGZ1bmN0aW9uIChpZCkge1xuICAvLyBvbGQgZW5naW5lcyBoYXZlIG5vdCBsb2NhdGlvbi5vcmlnaW5cbiAgZ2xvYmFsLnBvc3RNZXNzYWdlKFN0cmluZyhpZCksIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QpO1xufTtcblxuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXQgfHwgIWNsZWFyKSB7XG4gIHNldCA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShoYW5kbGVyKSB7XG4gICAgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCwgMSk7XG4gICAgdmFyIGZuID0gaXNDYWxsYWJsZShoYW5kbGVyKSA/IGhhbmRsZXIgOiBGdW5jdGlvbihoYW5kbGVyKTtcbiAgICB2YXIgYXJncyA9IGFycmF5U2xpY2UoYXJndW1lbnRzLCAxKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgYXBwbHkoZm4sIHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXIgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAoSVNfTk9ERSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKHJ1bm5lcihpZCkpO1xuICAgIH07XG4gIC8vIFNwaGVyZSAoSlMgZ2FtZSBlbmdpbmUpIERpc3BhdGNoIEFQSVxuICB9IGVsc2UgaWYgKERpc3BhdGNoICYmIERpc3BhdGNoLm5vdykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBEaXNwYXRjaC5ub3cocnVubmVyKGlkKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICAvLyBleGNlcHQgaU9TIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzYyNFxuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsICYmICFJU19JT1MpIHtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgcG9ydCA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGJpbmQocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKFxuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmXG4gICAgaXNDYWxsYWJsZShnbG9iYWwucG9zdE1lc3NhZ2UpICYmXG4gICAgIWdsb2JhbC5pbXBvcnRTY3JpcHRzICYmXG4gICAgbG9jYXRpb24gJiYgbG9jYXRpb24ucHJvdG9jb2wgIT09ICdmaWxlOicgJiZcbiAgICAhZmFpbHMocG9zdClcbiAgKSB7XG4gICAgZGVmZXIgPSBwb3N0O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjcmVhdGVFbGVtZW50KCdzY3JpcHQnKSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4oaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KHJ1bm5lcihpZCksIDApO1xuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBjbGVhcjogY2xlYXJcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyT3JJbmZpbml0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5Jyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gSGVscGVyIGZvciBhIHBvcHVsYXIgcmVwZWF0aW5nIGNhc2Ugb2YgdGhlIHNwZWM6XG4vLyBMZXQgaW50ZWdlciBiZSA/IFRvSW50ZWdlcihpbmRleCkuXG4vLyBJZiBpbnRlZ2VyIDwgMCwgbGV0IHJlc3VsdCBiZSBtYXgoKGxlbmd0aCArIGludGVnZXIpLCAwKTsgZWxzZSBsZXQgcmVzdWx0IGJlIG1pbihpbnRlZ2VyLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlck9ySW5maW5pdHkoaW5kZXgpO1xuICByZXR1cm4gaW50ZWdlciA8IDAgPyBtYXgoaW50ZWdlciArIGxlbmd0aCwgMCkgOiBtaW4oaW50ZWdlciwgbGVuZ3RoKTtcbn07XG4iLCIvLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwidmFyIHRydW5jID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21hdGgtdHJ1bmMnKTtcblxuLy8gYFRvSW50ZWdlck9ySW5maW5pdHlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2ludGVnZXJvcmluZmluaXR5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIgbnVtYmVyID0gK2FyZ3VtZW50O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICByZXR1cm4gbnVtYmVyICE9PSBudW1iZXIgfHwgbnVtYmVyID09PSAwID8gMCA6IHRydW5jKG51bWJlcik7XG59O1xuIiwidmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBUb0xlbmd0aGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgPiAwID8gbWluKHRvSW50ZWdlck9ySW5maW5pdHkoYXJndW1lbnQpLCAweDFGRkZGRkZGRkZGRkZGKSA6IDA7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gJE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSk7XG59O1xuIiwidmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXN5bWJvbCcpO1xudmFyIGdldE1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtbWV0aG9kJyk7XG52YXIgb3JkaW5hcnlUb1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vcmRpbmFyeS10by1wcmltaXRpdmUnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG52YXIgVE9fUFJJTUlUSVZFID0gd2VsbEtub3duU3ltYm9sKCd0b1ByaW1pdGl2ZScpO1xuXG4vLyBgVG9QcmltaXRpdmVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b3ByaW1pdGl2ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIHByZWYpIHtcbiAgaWYgKCFpc09iamVjdChpbnB1dCkgfHwgaXNTeW1ib2woaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBleG90aWNUb1ByaW0gPSBnZXRNZXRob2QoaW5wdXQsIFRPX1BSSU1JVElWRSk7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChleG90aWNUb1ByaW0pIHtcbiAgICBpZiAocHJlZiA9PT0gdW5kZWZpbmVkKSBwcmVmID0gJ2RlZmF1bHQnO1xuICAgIHJlc3VsdCA9IGNhbGwoZXhvdGljVG9QcmltLCBpbnB1dCwgcHJlZik7XG4gICAgaWYgKCFpc09iamVjdChyZXN1bHQpIHx8IGlzU3ltYm9sKHJlc3VsdCkpIHJldHVybiByZXN1bHQ7XG4gICAgdGhyb3cgJFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbiAgfVxuICBpZiAocHJlZiA9PT0gdW5kZWZpbmVkKSBwcmVmID0gJ251bWJlcic7XG4gIHJldHVybiBvcmRpbmFyeVRvUHJpbWl0aXZlKGlucHV0LCBwcmVmKTtcbn07XG4iLCJ2YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtc3ltYm9sJyk7XG5cbi8vIGBUb1Byb3BlcnR5S2V5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcm9wZXJ0eWtleVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKGFyZ3VtZW50LCAnc3RyaW5nJyk7XG4gIHJldHVybiBpc1N5bWJvbChrZXkpID8ga2V5IDoga2V5ICsgJyc7XG59O1xuIiwidmFyICRTdHJpbmcgPSBTdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICRTdHJpbmcoYXJndW1lbnQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiAnT2JqZWN0JztcbiAgfVxufTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxudmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcbnZhciB0b1N0cmluZyA9IHVuY3VycnlUaGlzKDEuMC50b1N0cmluZyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnICsgKGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXkpICsgJylfJyArIHRvU3RyaW5nKCsraWQgKyBwb3N0Zml4LCAzNik7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgZXMteC9uby1zeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gICYmICFTeW1ib2wuc2hhbVxuICAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gVjggfiBDaHJvbWUgMzYtXG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMzM0XG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCAncHJvdG90eXBlJywge1xuICAgIHZhbHVlOiA0MixcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSkucHJvdG90eXBlICE9IDQyO1xufSk7XG4iLCJ2YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFzc2VkLCByZXF1aXJlZCkge1xuICBpZiAocGFzc2VkIDwgcmVxdWlyZWQpIHRocm93ICRUeXBlRXJyb3IoJ05vdCBlbm91Z2ggYXJndW1lbnRzJyk7XG4gIHJldHVybiBwYXNzZWQ7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNDYWxsYWJsZShXZWFrTWFwKSAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoU3RyaW5nKFdlYWtNYXApKTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3ltYm9sLWNvbnN0cnVjdG9yLWRldGVjdGlvbicpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciBXZWxsS25vd25TeW1ib2xzU3RvcmUgPSBzaGFyZWQoJ3drcycpO1xudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgc3ltYm9sRm9yID0gU3ltYm9sICYmIFN5bWJvbFsnZm9yJ107XG52YXIgY3JlYXRlV2VsbEtub3duU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBTeW1ib2wgOiBTeW1ib2wgJiYgU3ltYm9sLndpdGhvdXRTZXR0ZXIgfHwgdWlkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGlmICghaGFzT3duKFdlbGxLbm93blN5bWJvbHNTdG9yZSwgbmFtZSkgfHwgIShOQVRJVkVfU1lNQk9MIHx8IHR5cGVvZiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPT0gJ3N0cmluZycpKSB7XG4gICAgdmFyIGRlc2NyaXB0aW9uID0gJ1N5bWJvbC4nICsgbmFtZTtcbiAgICBpZiAoTkFUSVZFX1NZTUJPTCAmJiBoYXNPd24oU3ltYm9sLCBuYW1lKSkge1xuICAgICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gU3ltYm9sW25hbWVdO1xuICAgIH0gZWxzZSBpZiAoVVNFX1NZTUJPTF9BU19VSUQgJiYgc3ltYm9sRm9yKSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBzeW1ib2xGb3IoZGVzY3JpcHRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBjcmVhdGVXZWxsS25vd25TeW1ib2woZGVzY3JpcHRpb24pO1xuICAgIH1cbiAgfSByZXR1cm4gV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVCdWlsdEluQWNjZXNzb3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLWFjY2Vzc29yJyk7XG52YXIgcmVnRXhwRmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gYmFiZWwtbWluaWZ5IGFuZCBDbG9zdXJlIENvbXBpbGVyIHRyYW5zcGlsZXMgUmVnRXhwKCcuJywgJ2QnKSAtPiAvLi9kIGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbnZhciBSZWdFeHAgPSBnbG9iYWwuUmVnRXhwO1xudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG5cbnZhciBGT1JDRUQgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBJTkRJQ0VTX1NVUFBPUlQgPSB0cnVlO1xuICB0cnkge1xuICAgIFJlZ0V4cCgnLicsICdkJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgSU5ESUNFU19TVVBQT1JUID0gZmFsc2U7XG4gIH1cblxuICB2YXIgTyA9IHt9O1xuICAvLyBtb2Rlcm4gVjggYnVnXG4gIHZhciBjYWxscyA9ICcnO1xuICB2YXIgZXhwZWN0ZWQgPSBJTkRJQ0VTX1NVUFBPUlQgPyAnZGdpbXN5JyA6ICdnaW1zeSc7XG5cbiAgdmFyIGFkZEdldHRlciA9IGZ1bmN0aW9uIChrZXksIGNocikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIGtleSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbGxzICs9IGNocjtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gfSk7XG4gIH07XG5cbiAgdmFyIHBhaXJzID0ge1xuICAgIGRvdEFsbDogJ3MnLFxuICAgIGdsb2JhbDogJ2cnLFxuICAgIGlnbm9yZUNhc2U6ICdpJyxcbiAgICBtdWx0aWxpbmU6ICdtJyxcbiAgICBzdGlja3k6ICd5J1xuICB9O1xuXG4gIGlmIChJTkRJQ0VTX1NVUFBPUlQpIHBhaXJzLmhhc0luZGljZXMgPSAnZCc7XG5cbiAgZm9yICh2YXIga2V5IGluIHBhaXJzKSBhZGRHZXR0ZXIoa2V5LCBwYWlyc1trZXldKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbiAgdmFyIHJlc3VsdCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoUmVnRXhwUHJvdG90eXBlLCAnZmxhZ3MnKS5nZXQuY2FsbChPKTtcblxuICByZXR1cm4gcmVzdWx0ICE9PSBleHBlY3RlZCB8fCBjYWxscyAhPT0gZXhwZWN0ZWQ7XG59KTtcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NgIGdldHRlclxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xuaWYgKEZPUkNFRCkgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFJlZ0V4cFByb3RvdHlwZSwgJ2ZsYWdzJywge1xuICBjb25maWd1cmFibGU6IHRydWUsXG4gIGdldDogcmVnRXhwRmxhZ3Ncbn0pO1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNsZWFySW1tZWRpYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Rhc2snKS5jbGVhcjtcblxuLy8gYGNsZWFySW1tZWRpYXRlYCBtZXRob2Rcbi8vIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3NldEltbWVkaWF0ZS8jc2ktY2xlYXJJbW1lZGlhdGVcbiQoeyBnbG9iYWw6IHRydWUsIGJpbmQ6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIGZvcmNlZDogZ2xvYmFsLmNsZWFySW1tZWRpYXRlICE9PSBjbGVhckltbWVkaWF0ZSB9LCB7XG4gIGNsZWFySW1tZWRpYXRlOiBjbGVhckltbWVkaWF0ZVxufSk7XG4iLCIvLyBUT0RPOiBSZW1vdmUgdGhpcyBtb2R1bGUgZnJvbSBgY29yZS1qc0A0YCBzaW5jZSBpdCdzIHNwbGl0IHRvIG1vZHVsZXMgbGlzdGVkIGJlbG93XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5jbGVhci1pbW1lZGlhdGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLnNldC1pbW1lZGlhdGUnKTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRJbW1lZGlhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdGFzaycpLnNldDtcblxuLy8gYHNldEltbWVkaWF0ZWAgbWV0aG9kXG4vLyBodHRwOi8vdzNjLmdpdGh1Yi5pby9zZXRJbW1lZGlhdGUvI3NpLXNldEltbWVkaWF0ZVxuJCh7IGdsb2JhbDogdHJ1ZSwgYmluZDogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgZm9yY2VkOiBnbG9iYWwuc2V0SW1tZWRpYXRlICE9PSBzZXRJbW1lZGlhdGUgfSwge1xuICBzZXRJbW1lZGlhdGU6IHNldEltbWVkaWF0ZVxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJpbXBvcnQgeyBwaG90b2dyYXBoZXJGYWN0b3J5IH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9waG90b2dyYXBoZXJGYWN0b3J5XCI7XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlEYXRhKHBob3RvZ3JhcGhlcnMsIGlkKSB7XHJcbiAgICBsZXQgcGhvdG9ncmFwaGVyU2VsZWN0ZWQgPSBcIlwiO1xyXG4gICAgXHJcbiAgICBwaG90b2dyYXBoZXJzLmZvckVhY2goKHBob3RvZ3JhcGhlcikgPT4ge1xyXG5cclxuICAgICAgICBpZiAocGhvdG9ncmFwaGVyLmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZW4gd2UgYXJlIGdvaW5nIHVzZSB0aGUgUGhvdG9ncmFwaGVyRmFjdG9yeSB0byBzZXQgRE9NXHJcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JykgeyBjb25zb2xlLmxvZyhwaG90b2dyYXBoZXIpOyB9XHJcbiAgICAgICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlck1vZGVsID0gcGhvdG9ncmFwaGVyRmFjdG9yeShwaG90b2dyYXBoZXIpO1xyXG4gICAgICAgICAgICBwaG90b2dyYXBoZXJNb2RlbC5zZXRQaG90b2dyYXBoZXJIZWFkZXIoKTtcclxuICAgICAgICAgICAgcGhvdG9ncmFwaGVyTW9kZWwuc2V0U3RpY2t5QmFyUHJpY2UoKTtcclxuXHJcbiAgICAgICAgICAgIHBob3RvZ3JhcGhlclNlbGVjdGVkID0gcGhvdG9ncmFwaGVyXHJcbiAgICAgICAgICAgIC8vIEVuZCBvZiBQaG90b2dyYXBoZXJGYWN0b3J5IFdvcmtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG4gICAgcmV0dXJuIChwaG90b2dyYXBoZXJTZWxlY3RlZCk7IC8vIFJldHVybiB0aGUgcGhvdG9ncmFwaGVyU2hvdyBhdCB0aGUgZW5kXHJcblxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzcGxheURhdGFBbGwocGhvdG9ncmFwaGVycywgcXVlcnlTZWxlY3Rvcikge1xyXG5cclxuICAgIHBob3RvZ3JhcGhlcnMuZm9yRWFjaCgocGhvdG9ncmFwaGVyKSA9PiB7XHJcblxyXG4gICAgICAgIC8vIFRoZW4gd2UgYXJlIGdvaW5nIHVzZSB0aGUgUGhvdG9ncmFwaGVyRmFjdG9yeSB0byBnZW5lcmF0ZSBET01cclxuICAgICAgICBjb25zdCBwaG90b2dyYXBoZXJzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnlTZWxlY3Rvcik7XHJcbiAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVyTW9kZWwgPSBwaG90b2dyYXBoZXJGYWN0b3J5KHBob3RvZ3JhcGhlcik7XHJcbiAgICAgICAgY29uc3QgdXNlckNhcmRET00gPSBwaG90b2dyYXBoZXJNb2RlbC5nZXRVc2VyQ2FyZERPTSgpO1xyXG5cclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHsgY29uc29sZS5sb2cocGhvdG9ncmFwaGVyKTsgfVxyXG4gICAgICAgIGlmICh1c2VyQ2FyZERPTSkge1xyXG4gICAgICAgICAgICBwaG90b2dyYXBoZXJzU2VjdGlvbi5hcHBlbmRDaGlsZCh1c2VyQ2FyZERPTSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEVuZCBvZiBQaG90b2dyYXBoZXJGYWN0b3J5IFdvcmtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG59XHJcblxyXG4iLCJcclxuaW1wb3J0IHsgYnVpbGRFbGVtZW50LCBpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudCwgc2V0SW5uZXJIdG1sLCBzZXRBcmlhbExhYmVsIH0gZnJvbSBcIi4uL3V0aWxzL2RvbVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBob3RvZ3JhcGhlckZhY3RvcnkoZGF0YSkge1xyXG4gICAgY29uc3QgeyBuYW1lLCBpZCwgY2l0eSwgY291bnRyeSwgdGFnbGluZSwgcG9ydHJhaXQsIHByaWNlIH0gPSBkYXRhO1xyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgY29uc3QgcGljdHVyZSA9IGBhc3NldHMvaW1hZ2VzLyR7cG9ydHJhaXR9YDtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRVc2VyQ2FyZERPTSgpIHtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIERPTSBvbmx5IGlmIHdlIGdvdCBhIHBpY3R1cmUgYSBpZCBhbmQgYSBuYW1lXHJcbiAgICAgICAgaWYgKG5hbWUgJiYgaWQgJiYgcG9ydHJhaXQpIHtcclxuICAgICAgICAgICAgLy8gQlVJTEQgQSBBUlRJQ0xFIFxyXG4gICAgICAgICAgICBjb25zdCBhcnRpY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIik7XHJcbiAgICAgICAgICAgIGFydGljbGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwaG90b2dyYXBoZXJfY2FyZFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBEeW5hbWlxdWUgTElOSyB3aXRoIFBpY3R1cmVcclxuICAgICAgICAgICAgY29uc3QgbGlua0VsZW1lbnQgPSBhcnRpY2xlLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgYnVpbGRFbGVtZW50KFwiYVwiLCBgcGhvdG9ncmFwaGVyLmh0bWw/aWQ9JHtpZH1gKSAvLyBCdWlsZCBBSHJlZlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBzZXRBcmlhbExhYmVsKGxpbmtFbGVtZW50LCBgTGluayB0byAke25hbWV9YCk7IC8vIFNldCBBcmllbExhYmVsIHRvIEFIcmVmXHJcbiAgICAgICAgICAgIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KGxpbmtFbGVtZW50LCBwaWN0dXJlLCBuYW1lKTtcclxuICAgICAgICAgICAgLy8gRU5EIENyZWF0ZSBEeW5hbWlxdWUgTElOSyB3aXRoIFBpY3R1cmVcclxuXHJcbiAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDJcIiwgbmFtZSkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNpdHkgJiYgY291bnRyeSkge1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoM1wiLCBgJHtjaXR5fSwgJHtjb3VudHJ5fWApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGFnbGluZSkge1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoNFwiLCB0YWdsaW5lKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLmFwcGVuZENoaWxkKGJ1aWxkRWxlbWVudChcImg1XCIsIGAke3ByaWNlfeKCrC9qb3VyYCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSRVRVUk4gQSBBUlRJQ0xFIFxyXG4gICAgICAgICAgICByZXR1cm4gYXJ0aWNsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UGhvdG9ncmFwaGVySGVhZGVyKCkge1xyXG4gICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoMVwiLCBuYW1lKTtcclxuICAgICAgICBpZiAoY2l0eSAmJiBjb3VudHJ5KSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoMlwiLCBgJHtjaXR5fSwgJHtjb3VudHJ5fWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGgyXCIsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDNcIiwgdGFnbGluZSk7XHJcblxyXG4gICAgICAgIC8qKiBXRSBVU0UgYSBkaWZmZXJlbnQgbWV0aG9kIHRoYXQgaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQoKSBzaW5jZSBwaWN0dXJlIGlzIGFscmVhZHkgaW4gdGhlIERPTSAqL1xyXG4gICAgICAgIGNvbnN0IGltZ1Byb2ZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGltZ1wiKTtcclxuICAgICAgICBpbWdQcm9maWxlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBwaWN0dXJlKTtcclxuICAgICAgICBpbWdQcm9maWxlLnNldEF0dHJpYnV0ZShcImFsdFwiLCBuYW1lKTtcclxuICAgICAgICAvKiogKi9cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRTdGlja3lCYXJQcmljZSgpIHtcclxuICAgICAgICBpZiAocHJpY2UpIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnByaWNlX3JhdGVfZGFpbHlcIiwgYCR7cHJpY2V9IOKCrCAvIGpvdXJgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5wcmljZV9yYXRlX2RhaWx5XCIsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyBuYW1lLCBwaWN0dXJlLCBnZXRVc2VyQ2FyZERPTSwgc2V0UGhvdG9ncmFwaGVySGVhZGVyLCBzZXRTdGlja3lCYXJQcmljZSB9O1xyXG59XHJcbiIsIi8vIEZ1bmN0aW9uIGZvciBidWlsZCBET01cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KGVsZW1lbnQsIHBpY3R1cmUsIGFsdCkge1xyXG4gICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgYDxpbWcgc3JjPVwiJHtwaWN0dXJlfVwiIGFsdD1cIiR7YWx0fVwiPmApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0VmlkZW9JbnNpZGVFbGVtZW50KGVsZW1lbnQsIHZpZGVvLCBhcmlhTGFiZWwpIHtcclxuXHJcbiAgICBpZiAoYXJpYUxhYmVsKSB7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgXHJcbiAgICAgICAgYDx2aWRlbyBzcmM9XCIke3ZpZGVvfVwiIGFyaWEtbGFiZWw9XCIke2FyaWFMYWJlbH1cIj5gKTtcclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCAnPHZpZGVvIHNyYz1cIicgKyB2aWRlbyArICdcIj4nKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0SFRNTEFmdGVyRWxlbWVudChlbGVtZW50LCBodG1sKSB7XHJcbiAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyZW5kXCIsIGh0bWwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRFbGVtZW50KGJhbGlzZSwgdmFsdWUpIHtcclxuICAgIC8vIENyZWF0ZSBiYWxpc2VcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGJhbGlzZSk7XHJcblxyXG4gICAgLy8gU2V0IEF0dHJpYnV0ZSBvciBUZXh0Q29udGVuZWQgZGVwZW5kIG9mIGJhbGlzZVxyXG4gICAgc3dpdGNoIChiYWxpc2UpIHtcclxuICAgICAgICBjYXNlIFwiYVwiOlxyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiaW1nXCI6XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QXJpYWxMYWJlbChlbGVtZW50LCBhcmlhbGFiZWwpIHtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBhcmlhbGFiZWwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SW5uZXJIdG1sKHF1ZXJ5U2VsZWN0b3IsIHRleHRlKSB7XHJcbiAgICBjb25zdCB0ZXh0ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5U2VsZWN0b3IpO1xyXG4gICAgdGV4dGVFbGVtZW50LmlubmVySFRNTCA9IHRleHRlO1xyXG59XHJcbi8vIEVuZCBGdW5jdGlvbiBmb3IgYnVpbGQgRE9NIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoSlNPTih1cmwsIHR5cGUpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTsgLy8gV2FpdCBmb3IgdGhlIEFzeW5jIEZlY3RoIEZ1bmN0aW9uXHJcblxyXG4gICAgLy8gZmV0Y2ggcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIHJlc3BvbnNlIHByb3BlcnR5IHdoaWNoIGlmIHNldCB0byBmYWxzZSBtZWFucyB0aGF0IHRoZSBjb25uZWN0aW9uIGlzIG5vdCBnb29kIGFuZCBzbyB3ZSBzdG9wIHRoZSBmdW5jdGlvbiBcclxuICAgIGlmICghcmVzcG9uc2Uub2spIHsgdGhyb3cgbmV3IEVycm9yKFwiVGhyb3duIGZyb20gZmV0Y2hKU09OKClcIik7IH1cclxuXHJcbiAgICBsZXQganNvblJlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpOyAvLyBwYXJzaW5nIEpTT05cclxuICAgIHJldHVybiBqc29uUmVzcG9uc2VbdHlwZV07IC8vIEdldCBkYXRhIGZyb20gdGhlIEFycmF5IHRoYXQgd2Ugd2FudFxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQaG90b2dyYXBoZXJzKCkge1xyXG4gICAgY29uc3QgdXJsID0gXCIuLi9kYXRhL3Bob3RvZ3JhcGhlcnMuanNvblwiOyAvLyBEYXRhIHNvdXJjZSAuSlNPTlxyXG4gICAgY29uc3QgcGhvdG9ncmFwaGVycyA9IGF3YWl0IGZldGNoSlNPTih1cmwsIFwicGhvdG9ncmFwaGVyc1wiKTsgLy8gdXNlIGZldGNoSlNPTiBmdW5jdGlvbiBmcm9tIHV0aWxzL2ZldGNoLmpzXHJcbiAgICByZXR1cm4gcGhvdG9ncmFwaGVyczsgLy8gUmV0dXJuIGRhdGEgb2YgUGhvdG9HcmFwaGVyc1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TWVkaWFzKCkge1xyXG4gICAgY29uc3QgdXJsID0gXCIuLi9kYXRhL3Bob3RvZ3JhcGhlcnMuanNvblwiOyAvLyBEYXRhIHNvdXJjZSAuSlNPTlxyXG4gICAgY29uc3QgbWVkaWFzID0gYXdhaXQgZmV0Y2hKU09OKHVybCwgXCJtZWRpYVwiKTsgLy8gdXNlIGZldGNoSlNPTiBmdW5jdGlvbiBmcm9tIHV0aWxzL2ZldGNoLmpzXHJcbiAgICByZXR1cm4gbWVkaWFzOyAvLyBSZXR1cm4gZGF0YSBvZiBNZWRpYVxyXG59XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGNoYXJzZXQgXFxcIlVURi04XFxcIjtcXG4vKiogVXNlZCB0byBsb2FkIGFsbCB2YXJpYWJsZXMgZm9yIHRoaXMgcHJvamVjdCBhYm91dCBTQ1NTICoqLyAvKiogRk9OVCAqKi9cXG4vKiogRU5EIEZPTlQgKiovXFxuLyoqIENPTE9SIFZBUklBQkxFUyAqKi9cXG4vKiogRU5EIENPTE9SIFZBUklBQkxFUyAqKi9cXG4vKiogSU1QT1JUIEdMT0JBTCBDU1MgRk9SIEZPTlRTIEhUTUwsKiBTRUxFQ1RPUiAqKi9cXG4vKioqKioqKioqKioqKioqKioqKioqKiBHRU5FUkFMICoqKioqKioqKioqKioqKioqKioqKiovXFxuaHRtbCxcXG4qIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBhbmltYXRpb246IDFzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXG59XFxuQGtleWZyYW1lcyBmYWRlLWluIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbn1cXG5cXG4vKioqKioqKioqKioqKioqKioqKioqKiBFTkQgR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1xcbi8qKiBJTVBPUlQgTUlYSU4gKiovXFxuLyoqIElNUE9SVCBIRUFERVIgU1RZTEVTICoqL1xcbmhlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDEyMHB4O1xcbn1cXG5oZWFkZXIgaDEge1xcbiAgY29sb3I6ICM5MDFDMUM7XFxuICB0b3A6IDQ0cHg7XFxuICBtYXJnaW4tcmlnaHQ6IDEwMHB4O1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc2l6ZTogMzZweDtcXG4gIGxpbmUtaGVpZ2h0OiA0N3B4O1xcbn1cXG5oZWFkZXIgLmxvZ28sXFxuaGVhZGVyIC5sb2dvX3Bob3RvZ3JhcGhlciB7XFxuICBoZWlnaHQ6IDUwcHg7XFxufVxcbmhlYWRlciAubG9nbyB7XFxuICBtYXJnaW4tbGVmdDogMTE1cHg7XFxufVxcbmhlYWRlciAubG9nb19waG90b2dyYXBoZXIge1xcbiAgbWFyZ2luLWxlZnQ6IDEwMHB4O1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG59XFxuXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVJTIENBUkRTICoqL1xcbi5waG90b2dyYXBoZXJfY2FyZCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaW1nIHtcXG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxcztcXG4gIGhlaWdodDogMjAwcHg7XFxuICB3aWR0aDogMjAwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGltZzpob3ZlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDIsXFxuLnBob3RvZ3JhcGhlcl9jYXJkIGgzLFxcbi5waG90b2dyYXBoZXJfY2FyZCBoNCxcXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDUge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoMiB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbiAgY29sb3I6ICNEMzU3M0M7XFxuICBmb250LXNpemU6IDM2cHg7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoMyB7XFxuICBmb250LXNpemU6IDEzLjAwMTA4MzQyMzZweDtcXG4gIGxpbmUtaGVpZ2h0OiAxN3B4O1xcbiAgY29sb3I6ICM5MDFDMUM7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoNCB7XFxuICBtYXJnaW4tdG9wOiAycHg7XFxuICBmb250LXNpemU6IDEwcHg7XFxuICBsaW5lLWhlaWdodDogMTNweDtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDUge1xcbiAgbWFyZ2luLXRvcDogMnB4O1xcbiAgZm9udC1zaXplOiA5cHg7XFxuICBsaW5lLWhlaWdodDogMTJweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAjNzU3NTc1O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDMge1xcbiAgICBmb250LXNpemU6IDE2LjkwMTQwODQ1MDdweDtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNCB7XFxuICAgIGZvbnQtc2l6ZTogMTNweDtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNSB7XFxuICAgIGZvbnQtc2l6ZTogMTEuN3B4O1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoMyB7XFxuICAgIGZvbnQtc2l6ZTogMTkuNTAxNjI1MTM1NHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGg0IHtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gICAgZm9udC1zaXplOiAxMy41cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaW1nIHtcXG4gICAgd2lkdGg6IDIzMHB4O1xcbiAgICBoZWlnaHQ6IDIzMHB4O1xcbiAgfVxcbn1cXG4vKiogSU1QT1JUIE1PREFMIENPTVBPTkVOVCAqKi9cXG4ubW9kYWxfY29udGFjdCB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0RCODg3NjtcXG4gIHBhZGRpbmc6IDM1cHg7XFxuICBtYXJnaW46IGF1dG87XFxuICB3aWR0aDogNDclO1xcbiAgdHJhbnNpdGlvbjogd2lkdGggMC41cyBlYXNlLWluO1xcbn1cXG4ubW9kYWxfY29udGFjdCAubW9kYWxfaGVhZGVyIHtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luLXRvcDogLTIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG59XFxuLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciAjY2xvc2VNb2RhbCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgI2Nsb3NlTW9kYWwgLmRlZmF1bHRfY29sb3Ige1xcbiAgZmlsbDogd2hpdGU7XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgI2Nsb3NlTW9kYWwgLmNvbG9yX3ByaW1hcnkxIHtcXG4gIGZpbGw6ICM5MDFDMUM7XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgaDIge1xcbiAgZm9udC1zaXplOiA2My43MnB4O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcbi5tb2RhbF9jb250YWN0IGZvcm0gaW5wdXQge1xcbiAgZm9udC1zaXplOiAzMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbiAgcGFkZGluZzogMTBweDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgZm9ybSB0ZXh0YXJlYSB7XFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIHJlc2l6ZTogdmVydGljYWw7XFxufVxcbi5tb2RhbF9jb250YWN0IGZvcm0gaW5wdXQsXFxuLm1vZGFsX2NvbnRhY3QgZm9ybSB0ZXh0YXJlYSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNjhweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgZm9ybSBsYWJlbCB7XFxuICBjb2xvcjogIzAwMDAwMDtcXG4gIGZvbnQtc2l6ZTogMzZweDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgZm9ybSBsYWJlbDpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxufVxcbi5tb2RhbF9jb250YWN0IC5oZWxwX2JsaW5kIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5oaWRlX2NvbnRlbnQge1xcbiAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1vZmY7XFxufVxcbkBrZXlmcmFtZXMgZmFkZS1vZmYge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDAuNDtcXG4gIH1cXG59XFxuXFxuLnNob3dfY29udGVudCB7XFxuICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcbn1cXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjQ7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLm1vZGFsX2NvbnRhY3Qge1xcbiAgICB3aWR0aDogNjUlO1xcbiAgfVxcbiAgLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciBoMiB7XFxuICAgIGZvbnQtc2l6ZTogNTRweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxuICAubW9kYWxfY29udGFjdCB7XFxuICAgIHdpZHRoOiA5MCU7XFxuICB9XFxuICAubW9kYWxfY29udGFjdCAubW9kYWxfaGVhZGVyIGgyIHtcXG4gICAgZm9udC1zaXplOiA0My4ycHg7XFxuICB9XFxuICAubW9kYWxfY29udGFjdCBmb3JtIGxhYmVsIHtcXG4gICAgZm9udC1zaXplOiAyNy42OTIzMDc2OTIzcHg7XFxuICB9XFxuICAubW9kYWxfY29udGFjdCBmb3JtIGlucHV0IHtcXG4gICAgZm9udC1zaXplOiAyNHB4O1xcbiAgfVxcbiAgLm1vZGFsX2NvbnRhY3QgZm9ybSB0ZXh0YXJlYSB7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBDT05UQUNUIEJVVFRPTiBDT01QT05FTlQgKiovXFxuLmZpc2hleWVfYnV0dG9uIHtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMTFweDtcXG4gIG1pbi13aWR0aDogMTcwcHg7XFxuICBtaW4taGVpZ2h0OiA3MHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzkwMUMxQztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuNXMgZWFzZS1pbiwgYmFja2dyb3VuZC1jb2xvciAwLjVzIGVhc2UtaW47XFxufVxcbi5maXNoZXllX2J1dHRvbjpob3ZlciB7XFxuICBjb2xvcjogIzAwMDAwMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEQjg4NzY7XFxufVxcblxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSCBIRUFERVIgQ09NUE9ORU5UICoqL1xcbi5waG90b2dyYXBoX2hlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGZsZXgtd3JhcDogbm8td3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZWQtZW5kO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZBRkFGQTtcXG4gIGhlaWdodDogMzEzcHg7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAzMHB4O1xcbiAgcGFkZGluZy1yaWdodDogMzBweDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGRpdjpudGgtY2hpbGQoMykge1xcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDEsXFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgyLFxcbi5waG90b2dyYXBoX2hlYWRlciBoMyB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgxIHtcXG4gIGZvbnQtc2l6ZTogNjMuNzJweDtcXG4gIG1hcmdpbi1ib3R0b206IC0xNXB4O1xcbiAgY29sb3I6ICNEMzU3M0M7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBoMiB7XFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIGZvbnQtc2l6ZTogMjMuMjI1ODA2NDUxNnB4O1xcbiAgY29sb3I6ICM5MDFDMUM7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBoMyB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBjb2xvcjogIzUyNTI1MjtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2Fib3V0LFxcbi5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9idXR0b24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IDgwcHg7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9hYm91dCB7XFxuICBtYXJnaW4tbGVmdDogMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5waG90b2dyYXBoX2hlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIGFsaWduLWNvbnRlbnQ6IGZsZWQtZW5kO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBhZGRpbmctdG9wOiAxNXB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxIHtcXG4gICAgZm9udC1zaXplOiA0MS40cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgaDIge1xcbiAgICBmb250LXNpemU6IDIwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcbiAgICBmb250LXNpemU6IDE2LjM2MzYzNjM2MzZweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2J1dHRvbiB7XFxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24tY29udGVudDogZmxlZC1lbmQ7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9idXR0b24ge1xcbiAgICBhbGlnbi1pdGVtczogaW5oZXJpdDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwcHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbWFyZ2luLXRvcDogMjAwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgPiAucGhvdG9ncmFwaF9hYm91dCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxLFxcbmgyLFxcbmgzIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyID4gLnBob3RvZ3JhcGhlcl9jYXJkIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBTRUxFQ1QgRklMVEVSIENPTVBPTkVOVCAqKi9cXG4uc2VsZWN0X2J1dHRvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24tY29udGVudDogZmxleC1lbmQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHBhZGRpbmctbGVmdDogMjBweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgYmFja2dyb3VuZDogIzkwMUMxQztcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDVweDtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItY29sb3I6IG5vbmU7XFxuICB3aWR0aDogMTcwcHg7XFxuICBoZWlnaHQ6IDcwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5zZWxlY3RfYnV0dG9uOjphZnRlciB7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXG4gIGNvbnRlbnQ6IFxcXCI+XFxcIjtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG4gIGZvbnQtc2l6ZTogMjVweDtcXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbn1cXG5cXG4uc2VsZWN0X2ZpbHRlciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcblxcbi5zZWxlY3RfY29udGVudCB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYmFja2dyb3VuZDogIzkwMUMxQztcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDVweDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1cHg7XFxuICBtaW4td2lkdGg6IDE2MHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDJweCA4cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIHotaW5kZXg6IDE7XFxufVxcbi5zZWxlY3RfY29udGVudCAud2hpdGVsaW5lIHtcXG4gIHdpZHRoOiA5MCU7XFxuICBoZWlnaHQ6IDFweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgbWFyZ2luLWxlZnQ6IDUlO1xcbn1cXG4uc2VsZWN0X2NvbnRlbnQgYSB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgd2lkdGg6IDE3MHB4O1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5zZWxlY3RfY29udGVudCBhOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxuICBjb2xvcjogIzAwMDAwMDtcXG59XFxuXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9jb250ZW50IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBlYXNlLWluO1xcbn1cXG5cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUiBTVEFUSVNUSUMgQ09NUE9ORU5UICoqL1xcbi5waG90b2dyYXBoZXJfc3RhdGlzdGljIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0RCODg3NjtcXG4gIG1pbi13aWR0aDogMzc2cHg7XFxuICBtaW4taGVpZ2h0OiA4OXB4O1xcbiAgYm90dG9tOiAwO1xcbiAgcmlnaHQ6IDM4cHg7XFxuICB6LWluZGV4OiAyO1xcbiAgbWFyZ2luLWJvdHRvbTogLTIycHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcbi5waG90b2dyYXBoZXJfc3RhdGlzdGljIC50b3RhbF9saWtlcyxcXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyAucHJpY2VfcmF0ZV9kYWlseSB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMjMuMjI1ODA2NDUxNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDMxcHg7XFxuICBjb2xvcjogIzAwMDAwMDtcXG4gIHBhZGRpbmctdG9wOiAxOHB4O1xcbn1cXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyAudG90YWxfbGlrZXM6YWZ0ZXIge1xcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XFxuICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXG4gIGZvbnQtc2l6ZTogMzAuODkwMzIyNTgwNnB4O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfc3RhdGlzdGljIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgTUVESUEgQ0FSRFMgQ09NUE9ORU5UICoqL1xcbi5tZWRpYV9jYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgbWF4LXdpZHRoOiAzNTBweDtcXG59XFxuLm1lZGlhX2NhcmQgaW1nLFxcbi5tZWRpYV9jYXJkIHZpZGVvIHtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1heC1oZWlnaHQ6IDMwMHB4O1xcbiAgbWluLWhlaWdodDogMzAwcHg7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuLm1lZGlhX2NhcmQgaW1nOmhvdmVyLFxcbi5tZWRpYV9jYXJkIHZpZGVvOmhvdmVyIHtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbn1cXG4ubWVkaWFfY2FyZCAuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIG1hcmdpbi10b3A6IDVweDtcXG59XFxuLm1lZGlhX2NhcmQgaDYge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBjb2xvcjogIzkwMUMxQztcXG59XFxuLm1lZGlhX2NhcmQgaDY6bGFzdC1jaGlsZDo6YWZ0ZXIge1xcbiAgZm9udC1zaXplOiAzMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcbiAgY29udGVudDogXFxcIuKZpVxcXCI7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgLm1lZGlhX2NhcmQgaW1nLFxcbi5tZWRpYV9jYXJkIHtcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cXG4vKiogSU1QT1JUIFBBR0VTIChvdGhlcikgU3R5bGVzICoqL1xcbi5waG90b2dyYXBoZXJfc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXG4gIGdhcDogNzBweDtcXG4gIG1hcmdpbi10b3A6IDc1cHg7XFxuICBtYXJnaW4tYm90dG9tOiA3NXB4O1xcbn1cXG5cXG4ubWFyZ2luX2xlZnRfcmlnaHQge1xcbiAgbWFyZ2luOiAwIDEwMHB4O1xcbn1cXG5cXG4uZmlsdGVyX3NlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuLmZpbHRlcl9zZWN0aW9uIGg1OmZpcnN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IDI4cHg7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbn1cXG4uZmlsdGVyX3NlY3Rpb24gLnNlbGVjdF9maWx0ZXIge1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG59XFxuXFxuLm1lZGlhX3NlY3Rpb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxuICByb3ctZ2FwOiAzMHB4O1xcbiAgY29sdW1uLWdhcDogOTVweDtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiA3NXB4O1xcbn1cXG5cXG4uRVJST1JfNDA0IHtcXG4gIG1hcmdpbi10b3A6IDUlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBwYWRkaW5nOiA0MHB4O1xcbn1cXG4uRVJST1JfNDA0IGgxIHtcXG4gIG1hcmdpbi1ib3R0b206IDUlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiA3MnB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcXG59XFxuLkVSUk9SXzQwNCBhIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG4uRVJST1JfNDA0IGE6aG92ZXIge1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcblxcbi8qKiBJTVBPUlQgRk9PVEVSIFNUWUxFUyAqKi9cXG5mb290ZXIge1xcbiAgaGVpZ2h0OiAycHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgbWFyZ2luLXRvcDogNzVweDtcXG59XFxuXFxuLyoqIElNUE9SVCBSRVNQT05TSVZFIFNUWUxFUyBmb3IgTm9uIENvbXBvbmVudHMgRWxlbWVudHNcXG4gKGNvbXBvbmVudHMgRWxlbWVudHMgZ290IHRoZWlyIG93biBSZXNwb25zaXZlIFJ1bGVzIGluIHRoZWlyIFN0eWxlc2hlZXQpICoqL1xcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfc2VjdGlvbixcXG4ubWVkaWFfc2VjdGlvbiB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxuICBoZWFkZXIge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBtYXJnaW4tdG9wOiA0MHB4O1xcbiAgICBoZWlnaHQ6IDEwMHB4O1xcbiAgfVxcbiAgaGVhZGVyIC5sb2dvX3Bob3RvZ3JhcGhlciB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcbiAgfVxcbiAgaGVhZGVyIC5sb2dvLFxcbmhlYWRlciBoMSB7XFxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxuICAgIGZvbnQtc2l6ZTogMzBweDtcXG4gIH1cXG4gIC5tYXJnaW5fbGVmdF9yaWdodCB7XFxuICAgIG1hcmdpbjogMCAyMHB4O1xcbiAgfVxcbiAgLmZpbHRlcl9zZWN0aW9uIHtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfc2VjdGlvbiB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIC5tZWRpYV9zZWN0aW9uIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL21haW4uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX3ZhcmlhYmxlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fZ2xvYmFsLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3BhZ2VzL19oZWFkZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX21peGluLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3Bob3RvZ3JhcGhlcl9jYXJkcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL21vZGFsL19jb250YWN0LnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX2Zpc2hleWVfYnV0dG9uLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3Bob3RvZ3JhcGhfaGVhZGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3NlbGVjdF9maWx0ZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fcGhvdG9ncmFwaGVyX3N0YXRpc3RpYy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19tZWRpYV9jYXJkcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9wYWdlcy9fcGFnZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvcGFnZXMvX2Zvb3Rlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fcmVzcG9uc2l2ZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGdCQUFnQjtBQUFoQiw2REFBQSxFQUFBLFdBQUE7QUNNQSxlQUFBO0FBRUEsc0JBQUE7QUFTQSwwQkFBQTtBRGZBLGtEQUFBO0FFRkEsc0RBQUE7QUFDQTs7RUFFRSxTQUFBO0VBQ0EsVUFBQTtFQUNBLHNCQUFBO0FGT0Y7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O0VOOEdkO0FBQ0Y7QU10R0E7RUFDSTtJQUNJLFVBQUE7RU53R047RU1yR1U7SUFDSSxpQkFBQTtFTnVHZDtFTW5HTTtJQUNJLDBCQUFBO0VOcUdWO0VNbEdNO0lBQ0ksZUFBQTtFTm9HVjtFTWpHTTtJQUNJLGVBQUE7RU5tR1Y7QUFDRjtBQS9PQSxzQ0FBQTtBT2JBO0VBQ0ksZUFBQTtFQUNBLGdCTkNjO0VNQWQsa0NORlU7RU1HVixZTktZO0VNSlosYUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EseUJOR2E7RU1GYixrQkFBQTtFQUNBLGVBQUE7RUFDQSw2REFBQTtBUCtQSjtBTzdQSTtFQUNJLGNOTGE7RU1NYix5QkFBQTtBUCtQUjs7QUFoUUEseUNBQUE7QVFmQTtFSktFLGFBQUE7RUFDQSxtQklMc0I7RUpRcEIsa0JJUnlCO0VKWXpCLHVCSVprQztFSmdCbEMsOEJJaEI0QztFQUM1Qyx5QlBha0I7RU9abEIsYUFBQTtFQUNBLGdCQUFBO0VKZ0NGLGtCSS9Ca0M7RUpnQ2xDLG1CSWhDa0M7QVJ3UnBDO0FRdFJJO0VBQ0ksa0JBQUE7QVJ3UlI7QVFwUkk7OztFQUdJLGtDUGRNO0VPZU4sZ0JQZFk7QURvU3BCO0FRblJJO0VBQ0ksa0JBQUE7RUFDQSxvQkFBQTtFQUNBLGNQVFM7QUQ4UmpCO0FRbFJJO0VBQ0ksZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLDBCQUFBO0VBQ0EsY1BqQlM7QURxU2pCO0FRalJJO0VBQ0ksZUFBQTtFQUNBLGNQcEJXO0FEdVNuQjtBUWhSSTs7RUpoQ0YsYUFBQTtFQUNBLHNCSWlDMEI7RUp0QnhCLHVCSXNCNEM7RUpsQjVDLHVCSWtCb0Q7QVJxUnhEO0FRbFJJO0VBQ0ksZ0JBQUE7RUFDQSxrQkFBQTtBUm9SUjtBUWpSSTtFQUNJLGlCQUFBO0VBQ0EsbUJBQUE7QVJtUlI7O0FROVFBO0VBQ0k7SUFDSSx1QlAvQ1E7SUdKZCxhQUFBO0lBQ0Esc0JJbUQwQjtJSmhEeEIsZUlnRGdDO0lKNUNoQyx1Qkk0Q3NDO0lKeEN0Qyw4Qkl3Q2dEO0lKcENoRCxt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bEJBO0VBRUk7SUFDSSwwQkFBQTtFZDZsQk47QUFDRjtBY3psQkE7RUFFSTtJQUNJLDBCQUFBO0VkMGxCTjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qKiBVc2VkIHRvIGxvYWQgYWxsIHZhcmlhYmxlcyBmb3IgdGhpcyBwcm9qZWN0IGFib3V0IFNDU1MgKiovXFxyXFxuQGltcG9ydCBcXFwiX3ZhcmlhYmxlcy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIEdMT0JBTCBDU1MgRk9SIEZPTlRTIEhUTUwsKiBTRUxFQ1RPUiAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfZ2xvYmFsLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgTUlYSU4gKiovXFxyXFxuQGltcG9ydCBcXFwiX21peGluLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgSEVBREVSIFNUWUxFUyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJwYWdlcy9oZWFkZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVJTIENBUkRTICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvcGhvdG9ncmFwaGVyX2NhcmRzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgTU9EQUwgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvbW9kYWwvX2NvbnRhY3Quc2Nzc1xcXCI7XFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9tb2RhbC9fbGlnaHRib3guc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBDT05UQUNUIEJVVFRPTiBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9maXNoZXllX2J1dHRvbi5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBIT1RPR1JBUEggSEVBREVSIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3Bob3RvZ3JhcGhfaGVhZGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgU0VMRUNUIEZJTFRFUiBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9zZWxlY3RfZmlsdGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIFNUQVRJU1RJQyBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9waG90b2dyYXBoZXJfc3RhdGlzdGljLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIE1FRElBIENBUkRTIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL21lZGlhX2NhcmRzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEFHRVMgKG90aGVyKSBTdHlsZXMgKiovXFxyXFxuQGltcG9ydCBcXFwicGFnZXMvcGFnZXMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBGT09URVIgU1RZTEVTICoqL1xcclxcbkBpbXBvcnQgXFxcInBhZ2VzL2Zvb3Rlci5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFJFU1BPTlNJVkUgU1RZTEVTIGZvciBOb24gQ29tcG9uZW50cyBFbGVtZW50c1xcclxcbiAoY29tcG9uZW50cyBFbGVtZW50cyBnb3QgdGhlaXIgb3duIFJlc3BvbnNpdmUgUnVsZXMgaW4gdGhlaXIgU3R5bGVzaGVldCkgKiovXFxyXFxuQGltcG9ydCBcXFwiX3Jlc3BvbnNpdmUuc2Nzc1xcXCI7XCIsXCIvKiogRk9OVCAqKi9cXHJcXG4kZm9udF9nbG9iYWw6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXHJcXG4kZm9udF93ZWlnaHRfc21hbGw6IDQwMDtcXHJcXG4kZm9udF93ZWlnaHRfYmlnOiA3MDA7XFxyXFxuXFxyXFxuJGZvbnRfc2l6ZTogMzZweDtcXHJcXG4vKiogRU5EIEZPTlQgKiovXFxyXFxuXFxyXFxuLyoqIENPTE9SIFZBUklBQkxFUyAqKi9cXHJcXG4kZGVmYXVsdF9jb2xvcjogd2hpdGU7XFxyXFxuJGRlZmF1bHRfZm9udF9jb2xvcjogIzAwMDAwMDtcXHJcXG4kY29sb3JfZ3JheTogIzc1NzU3NTtcXHJcXG4kY29sb3JfcHJpbWFyeTE6ICM5MDFDMUM7XFxyXFxuJGNvbG9yX3ByaW1hcnkyOiAjRDM1NzNDO1xcclxcbiRjb2xvcl9zZWNvbmRhcnkyOiAjNTI1MjUyO1xcclxcbiRjb2xvcl9zZWNvbmRhcnkyX2JnOiAjRkFGQUZBO1xcclxcbiRjb2xvcl9iYWNrZ3JvdW5kOiAjREI4ODc2O1xcclxcbi8qKiBFTkQgQ09MT1IgVkFSSUFCTEVTICoqL1wiLFwiLyoqKioqKioqKioqKioqKioqKioqKiogR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1xcclxcbmh0bWwsXFxyXFxuKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgYW5pbWF0aW9uOiAxcyBlYXNlLWluIGZvcndhcmRzIGZhZGUtaW47XFxyXFxuXFxyXFxuICBAa2V5ZnJhbWVzIGZhZGUtaW4ge1xcclxcbiAgICAwJSB7XFxyXFxuICAgICAgb3BhY2l0eTogMDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAxMDAlIHtcXHJcXG4gICAgICBvcGFjaXR5OiAxLjA7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLyoqKioqKioqKioqKioqKioqKioqKiogRU5EIEdFTkVSQUwgKioqKioqKioqKioqKioqKioqKioqKi9cIixcImhlYWRlciB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBudWxsLCBudWxsLCBzcGFjZS1iZXR3ZWVuLCBjZW50ZXIpO1xcclxcbiAgICBoZWlnaHQ6IDEyMHB4O1xcclxcblxcclxcblxcclxcbiAgICBoMSB7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICAgICAgdG9wOiA0NHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMDBweDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfc21hbGw7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemU7XFxyXFxuICAgICAgICBsaW5lLWhlaWdodDogNDdweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubG9nbyxcXHJcXG4gICAgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXHJcXG4gICAgICAgIGhlaWdodDogNTBweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubG9nbyB7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogMTE1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMDBweDtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgIH1cXHJcXG59XCIsXCJAbWl4aW4gZmxleC1iYXNpYygkZmxleC1kaXJlY3Rpb24sXFxyXFxuICAkZmxleC13cmFwLFxcclxcbiAgJGFsaWduLWNvbnRlbnQsXFxyXFxuICAkanVzdGlmeS1jb250ZW50LFxcclxcbiAgJGFsaWduLWl0ZW1zKSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246ICRmbGV4LWRpcmVjdGlvbjtcXHJcXG5cXHJcXG4gIEBpZiAoJGZsZXgtd3JhcCkge1xcclxcbiAgICBmbGV4LXdyYXA6ICRmbGV4LXdyYXA7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAaWYgKCRhbGlnbi1jb250ZW50KSB7XFxyXFxuICAgIGFsaWduLWNvbnRlbnQ6ICRhbGlnbi1jb250ZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgQGlmICgkanVzdGlmeS1jb250ZW50KSB7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogJGp1c3RpZnktY29udGVudDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIEBpZiAoJGFsaWduLWl0ZW1zKSB7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiAkYWxpZ24taXRlbXM7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi8vIEBtaXhpbiBtYXNrLWNyb3NzYnJvd3NlcigkdmFsdWUpIHtcXHJcXG4vLyAgIC13ZWJraXQtbWFzazogJHZhbHVlO1xcclxcbi8vICAgbWFzazogJHZhbHVlO1xcclxcbi8vIH1cXHJcXG5cXHJcXG4vLyBAbWl4aW4gbWFyZ2luLWxlZnQtYW5kLXJpZ2h0KCR2YWx1ZSkge1xcclxcbi8vICAgbWFyZ2luLWxlZnQ6ICR2YWx1ZTtcXHJcXG4vLyAgIG1hcmdpbi1yaWdodDogJHZhbHVlO1xcclxcbi8vIH1cXHJcXG5cXHJcXG5AbWl4aW4gcGFkZGluZy1sZWZ0LWFuZC1yaWdodCgkdmFsdWUpIHtcXHJcXG4gIHBhZGRpbmctbGVmdDogJHZhbHVlO1xcclxcbiAgcGFkZGluZy1yaWdodDogJHZhbHVlO1xcclxcbn1cIixcIi5waG90b2dyYXBoZXJfY2FyZCB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBudWxsLCBjZW50ZXIsIGNlbnRlcik7XFxyXFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcclxcblxcclxcbiAgICBpbWcge1xcclxcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcclxcbiAgICAgICAgaGVpZ2h0OiAyMDBweDtcXHJcXG4gICAgICAgIHdpZHRoOiAyMDBweDtcXHJcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcclxcblxcclxcbiAgICAgICAgJjpob3ZlciB7XFxyXFxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNTApO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIGgyLFxcclxcbiAgICBoMyxcXHJcXG4gICAgaDQsXFxyXFxuICAgIGg1IHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X3NtYWxsO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgyIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkyO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMi43NjkpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDE3cHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGg0IHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDJweDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMy42KTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxM3B4O1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDUge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyA0KTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxMnB4O1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9ncmF5O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgICAgIGgzIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIuNzY5ICogMS4zKTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDQge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMy42ICogMS4zKTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDUge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gNCAqIDEuMyk7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgICAgIGgzIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIuNzY5ICogMS41KTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGg0IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDMuNiAqIDEuNSk7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyA0ICogMS41KTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGltZyB7XFxyXFxuICAgICAgICAgICAgd2lkdGg6IDIzMHB4O1xcclxcbiAgICAgICAgICAgIGhlaWdodDogMjMwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XCIsXCIubW9kYWxfY29udGFjdCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiA1MCU7XFxyXFxuICAgIGxlZnQ6IDUwJTtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxyXFxuICAgIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9iYWNrZ3JvdW5kO1xcclxcbiAgICBwYWRkaW5nOiAzNXB4O1xcclxcbiAgICBtYXJnaW46IGF1dG87XFxyXFxuICAgIHdpZHRoOiA0NyU7XFxyXFxuICAgIHRyYW5zaXRpb246IHdpZHRoIDAuNXMgZWFzZS1pbjtcXHJcXG5cXHJcXG4gICAgLm1vZGFsX2hlYWRlciB7XFxyXFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IC0yMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgICAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxyXFxuXFxyXFxuICAgICAgICAjY2xvc2VNb2RhbCB7XFxyXFxuICAgICAgICAgICAgLy8gQ2xvc2UgTW9kYWwgUGljdHVyZVxcclxcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG5cXHJcXG4gICAgICAgICAgICAuZGVmYXVsdF9jb2xvciB7XFxyXFxuICAgICAgICAgICAgICAgIGZpbGw6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICAgICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgICAgICAuY29sb3JfcHJpbWFyeTEge1xcclxcbiAgICAgICAgICAgICAgICBmaWxsOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgICAgICAgICAgfVxcclxcbiAgICAgICAgfVxcclxcblxcclxcblxcclxcbiAgICAgICAgaDIge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMS43Nyk7XFxyXFxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXHJcXG4gICAgICAgICAgICB0ZXh0LWFsaWduOmxlZnQ7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgZm9ybSBpbnB1dCB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuMik7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XFxyXFxuICAgICAgICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGZvcm0gdGV4dGFyZWEge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8xLjUpO1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXHJcXG4gICAgICAgIHJlc2l6ZTogdmVydGljYWw7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgZm9ybSBpbnB1dCxcXHJcXG4gICAgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuXFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIGhlaWdodDogNjhweDtcXHJcXG4gICAgICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICBmb3JtIGxhYmVsIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGZvcm0gbGFiZWw6bGFzdC1jaGlsZCB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5oZWxwX2JsaW5kIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLmhpZGVfY29udGVudCB7XFxyXFxuICAgIGFuaW1hdGlvbjogMC41cyBlYXNlLWluIGZvcndhcmRzIGZhZGUtb2ZmO1xcclxcblxcclxcbiAgICBAa2V5ZnJhbWVzIGZhZGUtb2ZmIHtcXHJcXG4gICAgICAgIDAlIHtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAxLjA7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAxMDAlIHtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjQ7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuLnNob3dfY29udGVudCB7XFxyXFxuICAgIGFuaW1hdGlvbjogMC41cyBlYXNlLWluIGZvcndhcmRzIGZhZGUtaW47XFxyXFxuXFxyXFxuICAgIEBrZXlmcmFtZXMgZmFkZS1pbiB7XFxyXFxuICAgICAgICAwJSB7XFxyXFxuICAgICAgICAgICAgb3BhY2l0eTogMC40O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgMTAwJSB7XFxyXFxuICAgICAgICAgICAgb3BhY2l0eTogMS4wO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLm1vZGFsX2NvbnRhY3Qge1xcclxcbiAgICAgICAgd2lkdGg6IDY1JTtcXHJcXG5cXHJcXG4gICAgICAgIC5tb2RhbF9oZWFkZXIge1xcclxcbiAgICAgICAgICAgIGgyIHtcXHJcXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgKiAxLjUpO1xcclxcbiAgICAgICAgICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXHJcXG4gICAgLm1vZGFsX2NvbnRhY3Qge1xcclxcbiAgICAgICAgd2lkdGg6IDkwJTtcXHJcXG5cXHJcXG4gICAgICAgIC5tb2RhbF9oZWFkZXIge1xcclxcbiAgICAgICAgICAgIGgyIHtcXHJcXG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgKiAxLjIpO1xcclxcbiAgICAgICAgICAgIH1cXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGZvcm0gbGFiZWwge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZSAvIDEuMztcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGZvcm0gaW5wdXQge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41KTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGZvcm0gdGV4dGFyZWEge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZSAvIDEuODtcXHJcXG5cXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4gICAgfVxcclxcbn1cIixcIi5maXNoZXllX2J1dHRvbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS44KTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgcGFkZGluZzogMTFweDtcXHJcXG4gICAgbWluLXdpZHRoOiAxNzBweDtcXHJcXG4gICAgbWluLWhlaWdodDogNzBweDtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjVzIGVhc2UtaW4sIGJhY2tncm91bmQtY29sb3IgMC41cyBlYXNlLWluO1xcclxcblxcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIH1cXHJcXG59XCIsXCIucGhvdG9ncmFwaF9oZWFkZXIge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbm8td3JhcCwgZmxlZC1lbmQsIHNwYWNlLWJldHdlZW4sIG51bGwpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Jfc2Vjb25kYXJ5Ml9iZztcXHJcXG4gICAgaGVpZ2h0OiAzMTNweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgQGluY2x1ZGUgcGFkZGluZy1sZWZ0LWFuZC1yaWdodCgzMHB4KTtcXHJcXG5cXHJcXG4gICAgZGl2Om50aC1jaGlsZCgzKSB7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgaDEsXFxyXFxuICAgIGgyLFxcclxcbiAgICBoMyB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMSB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuNzcpO1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogLTE1cHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgyIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjU1KTtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250LXNpemUgLyAyKTtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3Jfc2Vjb25kYXJ5MjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9hYm91dCxcXHJcXG4gICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBudWxsLCBjZW50ZXIsIGZsZXgtc3RhcnQpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2Fib3V0IHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciB7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCB3cmFwLCBmbGVkLWVuZCwgc3BhY2UtYmV0d2VlbiwgY2VudGVyKTtcXHJcXG4gICAgICAgIHBhZGRpbmctdG9wOiAxNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuMTUpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciBoMiB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuOCk7XFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udC1zaXplIC8gMi4yKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9idXR0b24ge1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcXHJcXG5cXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBmbGVkLWVuZCwgc3BhY2UtYmV0d2VlbiwgY2VudGVyKTtcXHJcXG5cXHJcXG4gICAgICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGluaGVyaXQ7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwcHg7XFxyXFxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDIwMHB4O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlcj4ucGhvdG9ncmFwaF9hYm91dCB7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogMDtcXHJcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxLFxcclxcbiAgICBoMixcXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlcj4ucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbn1cIixcIi5zZWxlY3RfYnV0dG9uIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24tY29udGVudDogZmxleC1lbmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG5cXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcclxcbiAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIpO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xcclxcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNXB4O1xcclxcbiAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogbm9uZTtcXHJcXG4gICAgd2lkdGg6IDE3MHB4O1xcclxcbiAgICBoZWlnaHQ6IDcwcHg7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXHJcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCI+XFxcIjtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcclxcbiAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNDQpO1xcclxcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXHJcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RfZmlsdGVyIHtcXHJcXG5cXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxufVxcclxcblxcclxcblxcclxcbi5zZWxlY3RfY29udGVudCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYmFja2dyb3VuZDogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIG1pbi13aWR0aDogMTYwcHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDBweCAycHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxyXFxuICAgIHotaW5kZXg6IDE7XFxyXFxuXFxyXFxuXFxyXFxuICAgIC53aGl0ZWxpbmUge1xcclxcbiAgICAgICAgd2lkdGg6IDkwJTtcXHJcXG4gICAgICAgIGhlaWdodDogMXB4O1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogNSU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgYSB7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluO1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAyKTtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XFxyXFxuICAgICAgICB3aWR0aDogMTcwcHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDYwcHg7XFxyXFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhOmhvdmVyIHtcXHJcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2NvbnRlbnQge1xcclxcblxcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcXHJcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxyXFxufVwiLFwiLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbnVsbCwgZmxleC1zdGFydCwgc3BhY2UtYXJvdW5kLCBiYXNlbGluZSk7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIG1pbi13aWR0aDogMzc2cHg7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDg5cHg7XFxyXFxuICAgIGJvdHRvbTogMDtcXHJcXG4gICAgcmlnaHQ6IDM4cHg7XFxyXFxuICAgIHotaW5kZXg6IDI7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IC0yMnB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuICAgIC50b3RhbF9saWtlcyxcXHJcXG4gICAgLnByaWNlX3JhdGVfZGFpbHkge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjU1KTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzMXB4O1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgICAgICBwYWRkaW5nLXRvcDogMThweDtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAudG90YWxfbGlrZXM6YWZ0ZXIge1xcclxcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA1cHg7XFxyXFxuICAgICAgICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41NSAqIDEuMzMpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVwiLFwiLm1lZGlhX2NhcmQge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKGNvbHVtbiwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gICAgbWF4LXdpZHRoOiAzNTBweDtcXHJcXG5cXHJcXG4gICAgaW1nLFxcclxcbiAgICB2aWRlbyB7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICBtYXgtaGVpZ2h0OiAzMDBweDtcXHJcXG4gICAgICAgIG1pbi1oZWlnaHQ6IDMwMHB4O1xcclxcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuXFxyXFxuICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcclxcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjUwKTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcblxcclxcbiAgICAuZGV0YWlscyB7XFxyXFxuICAgICAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbnVsbCwgbnVsbCwgc3BhY2UtYmV0d2VlbiwgYmFzZWxpbmUpO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGg2IHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X3NtYWxsO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjUpO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoNjpsYXN0LWNoaWxkOjphZnRlciB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNSAqIDEuMjUpO1xcclxcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcclxcbiAgICAgICAgY29udGVudDogXFxcIuKZpVxcXCI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5tZWRpYV9jYXJkIGltZyxcXHJcXG4gICAgLm1lZGlhX2NhcmQge1xcclxcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgICB9XFxyXFxufVwiLFwiLy8vLyBNQUlOIFBBR0UgLy8vIFxcclxcbi5waG90b2dyYXBoZXJfc2VjdGlvbiB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxyXFxuICAgIGdhcDogNzBweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogNzVweDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogNzVweDtcXHJcXG59XFxyXFxuXFxyXFxuLy8vLy8gRU5EIE1BSU4gUEFHRSAvLyBcXHJcXG5cXHJcXG4vLy8vLy8vLy8vLy8vLy8vIFBIT1RPR1JBUEhFUiBQQUdFIC8vLy8vLy8gXFxyXFxuLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXHJcXG4gICAgbWFyZ2luOiAwIDEwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmlsdGVyX3NlY3Rpb24ge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbnVsbCwgbnVsbCwgbnVsbCwgYmFzZWxpbmUpO1xcclxcbiAgICBtYXJnaW4tbGVmdDogMDtcXHJcXG5cXHJcXG4gICAgaDU6Zmlyc3QtY2hpbGQge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgICAgIG1hcmdpbi1yaWdodDogMjhweDtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X2JpZztcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udC1zaXplIC8gMik7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuc2VsZWN0X2ZpbHRlciB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi5tZWRpYV9zZWN0aW9uIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXHJcXG4gICAgcm93LWdhcDogMzBweDtcXHJcXG4gICAgY29sdW1uLWdhcDogOTVweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogNzVweDtcXHJcXG59XFxyXFxuXFxyXFxuLy8vLy8vLy8vLy8vLy8gRU5EIFBIT1RPR1JBUEhFUiBQQUdFIC8vLy8vLy8vXFxyXFxuXFxyXFxuLy8vLy8vLy8vLy8vLy8vLyA0MDQgUEFHRSAvLy8vLy8vIFxcclxcbi5FUlJPUl80MDQge1xcclxcbiAgICBtYXJnaW4tdG9wOiA1JTtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIHBhZGRpbmc6IDQwcHg7XFxyXFxuXFxyXFxuICAgIGgxIHtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDUlO1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplICogMjtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDQwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgYSB7XFxyXFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICAgICAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhOmhvdmVyIHtcXHJcXG4gICAgICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi8vLy8vLy8vLy8vLy8vIEVORCA0MDQgUEFHRSAvLy8vLy8vL1wiLFwiZm9vdGVyIHtcXHJcXG4gICAgaGVpZ2h0OiAycHg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgbWFyZ2luLXRvcDogNzVweDtcXHJcXG59XCIsXCJAbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoZXJfc2VjdGlvbixcXHJcXG4gICAgLm1lZGlhX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcclxcblxcclxcbiAgICBoZWFkZXIge1xcclxcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDQwcHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDEwMHB4O1xcclxcblxcclxcbiAgICAgICAgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIC5sb2dvLFxcclxcbiAgICAgICAgaDEge1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuMjApO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5tYXJnaW5fbGVmdF9yaWdodCB7XFxyXFxuICAgICAgICBtYXJnaW46IDAgMjBweDtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICAuZmlsdGVyX3NlY3Rpb24ge1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcblxcclxcbiAgICAucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5tZWRpYV9zZWN0aW9uIHtcXHJcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMV0udXNlWzNdIS4vbWFpbi5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbM10hLi9tYWluLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCJjb3JlLWpzL3N0YWJsZVwiO1xyXG5pbXBvcnQgXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIjtcclxuXHJcbmltcG9ydCAnLi4vLi4vc2Nzcy9tYWluLnNjc3MnO1xyXG5pbXBvcnQgeyBnZXRQaG90b2dyYXBoZXJzIH0gZnJvbSAnLi4vdXRpbHMvZmV0Y2gnO1xyXG5pbXBvcnQgeyBkaXNwbGF5RGF0YUFsbCB9IGZyb20gJy4uL2RhdGEvZGlzcGxheURhdGEnO1xyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXRNYWluKCkge1xyXG4gICAgLy8gVHJ5IHRvIGdldCBkYXRhIGZyb20gcGhvdG9ncmFwaGVzIGlmIGVycm9yIHRoZW4gcmVkaXJlY3QgdG8gNDA0IHBhZ2VcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVycyA9IGF3YWl0IGdldFBob3RvZ3JhcGhlcnMoKTtcclxuICAgICAgICBkaXNwbGF5RGF0YUFsbChwaG90b2dyYXBoZXJzLCBcIi5waG90b2dyYXBoZXJfc2VjdGlvblwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBhZ2UgaW5pdGlhbGlzZXIgYXZlYyBzdWNjw6hzIGRlcHVpcyBpbml0TWFpbigpXCIpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgLy8gSWYgaXQncyBhIGZhaWwgdGhlbiB3ZSByZWRpcmVjdCB0byA0MDQgRXJyb3IgUGFnZSBzaW5jZSBpbml0TWFpbigpIGl0J3MgdGhlIG1pbmltYWwgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgIC8vIEF0bSA0MDQgZXJyb3IgcGFnZSBkb2Vzbid0IGV4aXN0cyBtdXN0IGJlIHdyaXRlIGxhdGVyXHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlJlZGlyaWdlciB2ZXJzIGxhIHBhZ2UgNDA0XCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5pbml0TWFpbigpO1xyXG4iXSwibmFtZXMiOlsiaXNDYWxsYWJsZSIsInJlcXVpcmUiLCJ0cnlUb1N0cmluZyIsIiRUeXBlRXJyb3IiLCJUeXBlRXJyb3IiLCJtb2R1bGUiLCJleHBvcnRzIiwiYXJndW1lbnQiLCJpc09iamVjdCIsIiRTdHJpbmciLCJTdHJpbmciLCJ0b0luZGV4ZWRPYmplY3QiLCJ0b0Fic29sdXRlSW5kZXgiLCJsZW5ndGhPZkFycmF5TGlrZSIsImNyZWF0ZU1ldGhvZCIsIklTX0lOQ0xVREVTIiwiJHRoaXMiLCJlbCIsImZyb21JbmRleCIsIk8iLCJsZW5ndGgiLCJpbmRleCIsInZhbHVlIiwiaW5jbHVkZXMiLCJpbmRleE9mIiwidW5jdXJyeVRoaXMiLCJzbGljZSIsInRvU3RyaW5nIiwic3RyaW5nU2xpY2UiLCJpdCIsImhhc093biIsIm93bktleXMiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUiLCJkZWZpbmVQcm9wZXJ0eU1vZHVsZSIsInRhcmdldCIsInNvdXJjZSIsImV4Y2VwdGlvbnMiLCJrZXlzIiwiZGVmaW5lUHJvcGVydHkiLCJmIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiaSIsImtleSIsIkRFU0NSSVBUT1JTIiwiY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yIiwib2JqZWN0IiwiYml0bWFwIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwibWFrZUJ1aWx0SW4iLCJuYW1lIiwiZGVzY3JpcHRvciIsImdldCIsImdldHRlciIsInNldCIsInNldHRlciIsImRlZmluZUdsb2JhbFByb3BlcnR5Iiwib3B0aW9ucyIsInNpbXBsZSIsInVuZGVmaW5lZCIsImdsb2JhbCIsInVuc2FmZSIsImVycm9yIiwibm9uQ29uZmlndXJhYmxlIiwibm9uV3JpdGFibGUiLCJPYmplY3QiLCJmYWlscyIsImRvY3VtZW50IiwiRVhJU1RTIiwiY3JlYXRlRWxlbWVudCIsInVzZXJBZ2VudCIsInRlc3QiLCJjbGFzc29mIiwicHJvY2VzcyIsImdldEJ1aWx0SW4iLCJEZW5vIiwidmVyc2lvbnMiLCJ2ZXJzaW9uIiwidjgiLCJtYXRjaCIsInNwbGl0IiwiY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5IiwiZGVmaW5lQnVpbHRJbiIsImNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMiLCJpc0ZvcmNlZCIsIlRBUkdFVCIsIkdMT0JBTCIsIlNUQVRJQyIsInN0YXQiLCJGT1JDRUQiLCJ0YXJnZXRQcm9wZXJ0eSIsInNvdXJjZVByb3BlcnR5IiwicHJvdG90eXBlIiwiZG9udENhbGxHZXRTZXQiLCJmb3JjZWQiLCJzaGFtIiwiZXhlYyIsIk5BVElWRV9CSU5EIiwiRnVuY3Rpb25Qcm90b3R5cGUiLCJGdW5jdGlvbiIsImFwcGx5IiwiY2FsbCIsIlJlZmxlY3QiLCJiaW5kIiwiYXJndW1lbnRzIiwiYUNhbGxhYmxlIiwiZm4iLCJ0aGF0IiwiaGFzT3duUHJvcGVydHkiLCJnZXREZXNjcmlwdG9yIiwiUFJPUEVSIiwic29tZXRoaW5nIiwiQ09ORklHVVJBQkxFIiwiYUZ1bmN0aW9uIiwibmFtZXNwYWNlIiwibWV0aG9kIiwiaXNOdWxsT3JVbmRlZmluZWQiLCJWIiwiUCIsImZ1bmMiLCJjaGVjayIsIk1hdGgiLCJnbG9iYWxUaGlzIiwid2luZG93Iiwic2VsZiIsInRvT2JqZWN0IiwiYSIsIiRPYmplY3QiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsInN0b3JlIiwiZnVuY3Rpb25Ub1N0cmluZyIsImluc3BlY3RTb3VyY2UiLCJOQVRJVkVfV0VBS19NQVAiLCJzaGFyZWQiLCJzaGFyZWRLZXkiLCJoaWRkZW5LZXlzIiwiT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQiLCJXZWFrTWFwIiwiaGFzIiwiZW5mb3JjZSIsImdldHRlckZvciIsIlRZUEUiLCJzdGF0ZSIsInR5cGUiLCJ3bWdldCIsIndtaGFzIiwid21zZXQiLCJtZXRhZGF0YSIsImZhY2FkZSIsIlNUQVRFIiwicmVwbGFjZW1lbnQiLCJmZWF0dXJlIiwiZGV0ZWN0aW9uIiwiZGF0YSIsIm5vcm1hbGl6ZSIsIlBPTFlGSUxMIiwiTkFUSVZFIiwic3RyaW5nIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwiZG9jdW1lbnRBbGwiLCJhbGwiLCJTUEVDSUFMX0RPQ1VNRU5UX0FMTCIsImlzUHJvdG90eXBlT2YiLCJVU0VfU1lNQk9MX0FTX1VJRCIsIiRTeW1ib2wiLCJ0b0xlbmd0aCIsIm9iaiIsIkNPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FIiwiSW50ZXJuYWxTdGF0ZU1vZHVsZSIsImVuZm9yY2VJbnRlcm5hbFN0YXRlIiwiZ2V0SW50ZXJuYWxTdGF0ZSIsIkNPTkZJR1VSQUJMRV9MRU5HVEgiLCJURU1QTEFURSIsImFyaXR5IiwiY29uc3RydWN0b3IiLCJqb2luIiwiY2VpbCIsImZsb29yIiwidHJ1bmMiLCJ4IiwibiIsIklFOF9ET01fREVGSU5FIiwiVjhfUFJPVE9UWVBFX0RFRklORV9CVUciLCJhbk9iamVjdCIsInRvUHJvcGVydHlLZXkiLCIkZGVmaW5lUHJvcGVydHkiLCIkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiRU5VTUVSQUJMRSIsIldSSVRBQkxFIiwiQXR0cmlidXRlcyIsImN1cnJlbnQiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSIsImludGVybmFsT2JqZWN0S2V5cyIsImVudW1CdWdLZXlzIiwiY29uY2F0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImdldE93blByb3BlcnR5U3ltYm9scyIsInB1c2giLCJuYW1lcyIsInJlc3VsdCIsIiRwcm9wZXJ0eUlzRW51bWVyYWJsZSIsIk5BU0hPUk5fQlVHIiwiaW5wdXQiLCJwcmVmIiwidmFsIiwidmFsdWVPZiIsImdldE93blByb3BlcnR5TmFtZXNNb2R1bGUiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUiLCJoYXNJbmRpY2VzIiwiaWdub3JlQ2FzZSIsIm11bHRpbGluZSIsImRvdEFsbCIsInVuaWNvZGUiLCJ1bmljb2RlU2V0cyIsInN0aWNreSIsInVpZCIsIlNIQVJFRCIsIklTX1BVUkUiLCJtb2RlIiwiY29weXJpZ2h0IiwibGljZW5zZSIsIlY4X1ZFUlNJT04iLCJzeW1ib2wiLCJTeW1ib2wiLCJodG1sIiwiYXJyYXlTbGljZSIsInZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoIiwiSVNfSU9TIiwiSVNfTk9ERSIsInNldEltbWVkaWF0ZSIsImNsZWFyIiwiY2xlYXJJbW1lZGlhdGUiLCJEaXNwYXRjaCIsIk1lc3NhZ2VDaGFubmVsIiwiY291bnRlciIsInF1ZXVlIiwiT05SRUFEWVNUQVRFQ0hBTkdFIiwibG9jYXRpb24iLCJkZWZlciIsImNoYW5uZWwiLCJwb3J0IiwicnVuIiwiaWQiLCJydW5uZXIiLCJsaXN0ZW5lciIsImV2ZW50IiwicG9zdCIsInBvc3RNZXNzYWdlIiwicHJvdG9jb2wiLCJob3N0IiwiaGFuZGxlciIsImFyZ3MiLCJuZXh0VGljayIsIm5vdyIsInBvcnQyIiwicG9ydDEiLCJvbm1lc3NhZ2UiLCJhZGRFdmVudExpc3RlbmVyIiwiaW1wb3J0U2NyaXB0cyIsImFwcGVuZENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJzZXRUaW1lb3V0IiwidG9JbnRlZ2VyT3JJbmZpbml0eSIsIm1heCIsIm1pbiIsImludGVnZXIiLCJJbmRleGVkT2JqZWN0IiwicmVxdWlyZU9iamVjdENvZXJjaWJsZSIsIm51bWJlciIsImlzU3ltYm9sIiwiZ2V0TWV0aG9kIiwib3JkaW5hcnlUb1ByaW1pdGl2ZSIsIndlbGxLbm93blN5bWJvbCIsIlRPX1BSSU1JVElWRSIsImV4b3RpY1RvUHJpbSIsInRvUHJpbWl0aXZlIiwicG9zdGZpeCIsInJhbmRvbSIsIk5BVElWRV9TWU1CT0wiLCJpdGVyYXRvciIsInBhc3NlZCIsInJlcXVpcmVkIiwiV2VsbEtub3duU3ltYm9sc1N0b3JlIiwic3ltYm9sRm9yIiwiY3JlYXRlV2VsbEtub3duU3ltYm9sIiwid2l0aG91dFNldHRlciIsImRlc2NyaXB0aW9uIiwiZGVmaW5lQnVpbHRJbkFjY2Vzc29yIiwicmVnRXhwRmxhZ3MiLCJSZWdFeHAiLCJSZWdFeHBQcm90b3R5cGUiLCJJTkRJQ0VTX1NVUFBPUlQiLCJjYWxscyIsImV4cGVjdGVkIiwiYWRkR2V0dGVyIiwiY2hyIiwicGFpcnMiLCIkIiwiY3NzV2l0aE1hcHBpbmdUb1N0cmluZyIsImxpc3QiLCJtYXAiLCJpdGVtIiwiY29udGVudCIsIm5lZWRMYXllciIsIm1vZHVsZXMiLCJtZWRpYSIsImRlZHVwZSIsInN1cHBvcnRzIiwibGF5ZXIiLCJhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzIiwiayIsIl9rIiwiY3NzTWFwcGluZyIsImJ0b2EiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJzb3VyY2VNYXBwaW5nIiwic291cmNlVVJMcyIsInNvdXJjZXMiLCJzb3VyY2VSb290IiwicGhvdG9ncmFwaGVyRmFjdG9yeSIsImRpc3BsYXlEYXRhIiwicGhvdG9ncmFwaGVycyIsInBob3RvZ3JhcGhlclNlbGVjdGVkIiwiZm9yRWFjaCIsInBob3RvZ3JhcGhlciIsImVudiIsIk5PREVfRU5WIiwiY29uc29sZSIsImxvZyIsInBob3RvZ3JhcGhlck1vZGVsIiwic2V0UGhvdG9ncmFwaGVySGVhZGVyIiwic2V0U3RpY2t5QmFyUHJpY2UiLCJkaXNwbGF5RGF0YUFsbCIsInF1ZXJ5U2VsZWN0b3IiLCJwaG90b2dyYXBoZXJzU2VjdGlvbiIsInVzZXJDYXJkRE9NIiwiZ2V0VXNlckNhcmRET00iLCJidWlsZEVsZW1lbnQiLCJpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudCIsInNldElubmVySHRtbCIsInNldEFyaWFsTGFiZWwiLCJjaXR5IiwiY291bnRyeSIsInRhZ2xpbmUiLCJwb3J0cmFpdCIsInByaWNlIiwicGljdHVyZSIsImFydGljbGUiLCJzZXRBdHRyaWJ1dGUiLCJsaW5rRWxlbWVudCIsImltZ1Byb2ZpbGUiLCJlbGVtZW50IiwiYWx0IiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiaW5zZXJ0VmlkZW9JbnNpZGVFbGVtZW50IiwidmlkZW8iLCJhcmlhTGFiZWwiLCJpbnNlcnRIVE1MQWZ0ZXJFbGVtZW50IiwiYmFsaXNlIiwidGV4dENvbnRlbnQiLCJhcmlhbGFiZWwiLCJ0ZXh0ZSIsInRleHRlRWxlbWVudCIsImlubmVySFRNTCIsImZldGNoSlNPTiIsInVybCIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsIkVycm9yIiwianNvblJlc3BvbnNlIiwianNvbiIsImdldFBob3RvZ3JhcGhlcnMiLCJnZXRNZWRpYXMiLCJtZWRpYXMiLCJpbml0TWFpbiIsImUiXSwic291cmNlUm9vdCI6IiJ9