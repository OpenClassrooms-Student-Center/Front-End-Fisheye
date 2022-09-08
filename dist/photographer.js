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

/***/ "./src/scripts/data/displayMedia.js":
/*!******************************************!*\
  !*** ./src/scripts/data/displayMedia.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayMedia": function() { return /* binding */ displayMedia; }
/* harmony export */ });
/* harmony import */ var _factories_mediaFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../factories/mediaFactory */ "./src/scripts/factories/mediaFactory.js");
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/dom */ "./src/scripts/utils/dom.js");


async function displayMedia(medias, querySelector, photographerId) {
  let totalLikes = 0;
  medias.forEach(media => {
    if (photographerId == media.photographerId) {
      if (true) {
        console.log(media);
      } // Then we are going use the MediaFactory to generate DOM


      const mediasSection = document.querySelector(querySelector);
      const mediaModel = (0,_factories_mediaFactory__WEBPACK_IMPORTED_MODULE_0__.mediaFactory)(media);
      const mediaDOM = mediaModel.getMediaDOM();

      if (mediaDOM) {
        mediasSection.appendChild(mediaDOM);
      } // End of MediaFactory Work
      // If media object got Likes propriety then


      if (media.likes) {
        totalLikes += media.likes; // Count all likes

        (0,_utils_dom__WEBPACK_IMPORTED_MODULE_1__.setInnerHtml)(".total_likes", totalLikes);
      } else {
        console.warn("Theres is no like and totalLikes, look mediaFactory returned a object without likes propriety");
      }
    }
  });

  if (true) {
    console.log("Total Like: " + totalLikes);
  }
}

/***/ }),

/***/ "./src/scripts/factories/mediaFactory.js":
/*!***********************************************!*\
  !*** ./src/scripts/factories/mediaFactory.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mediaFactory": function() { return /* binding */ mediaFactory; }
/* harmony export */ });
/* harmony import */ var _utils_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dom */ "./src/scripts/utils/dom.js");

function mediaFactory(data) {
  const {
    id,
    photographerId,
    title,
    image,
    video,
    likes
  } = data;
  const movie = `assets/video/${video}`;
  const picture = `assets/images/${image}`;

  function getMediaDOM() {
    // Create DOM only if we got ids and a Picture or a Video
    const hasPhotographer = id && photographerId;
    const hasContent = image || video;

    if (hasPhotographer && hasContent) {
      // CREATE A ARTICLE
      const article = document.createElement("article");
      article.setAttribute("class", "media_card"); // Build A HREF ELEMENT

      const linkElement = article.appendChild(_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement("a", `photographer.html?id=${id}`));
      _utils_dom__WEBPACK_IMPORTED_MODULE_0__.setArialLabel(linkElement, "Lilac breasted roller, closeup view"); // Set ArielLabel to AHref
      // Check if image or video exists

      if (image) {
        _utils_dom__WEBPACK_IMPORTED_MODULE_0__.insertPictureInsideElement(linkElement, picture, title); // Insert picture with ALT
      } else if (video) {
        _utils_dom__WEBPACK_IMPORTED_MODULE_0__.insertVideoInsideElement(linkElement, movie, `Movie ${video}`); // Insert Video with Ariel Label
      } // Generate Details (title + Likes)


      if (title) {
        let title_h6 = `<h6>${title}</h6>`;
        let likes_h6 = `<h6 aria-label='likes'>0</h6>`;

        if (likes) {
          likes_h6 = `<h6 aria-label='likes'>${likes}</h6>`;
        }

        _utils_dom__WEBPACK_IMPORTED_MODULE_0__.insertHTMLAfterElement(linkElement, `<div class='details'>${title_h6}${likes_h6}</div>`);
      } // Return Article


      return article;
    } else {
      return false;
    }
  }

  return {
    photographerId,
    picture,
    movie,
    getMediaDOM
  };
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

/***/ "./src/scripts/utils/getUrlParameter.js":
/*!**********************************************!*\
  !*** ./src/scripts/utils/getUrlParameter.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUrlParameter": function() { return /* binding */ getUrlParameter; }
/* harmony export */ });
async function getUrlParameter(parameter) {
  const fullUrl = window.location.href; // Get full url

  const url = new URL(fullUrl); // Create URL Object

  const parameterValue = url.searchParams.get(parameter); // get parameter value

  return parameterValue;
}

/***/ }),

/***/ "./src/scripts/utils/modalMaster.js":
/*!******************************************!*\
  !*** ./src/scripts/utils/modalMaster.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "modalMaster": function() { return /* binding */ modalMaster; }
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/scripts/utils/dom.js");

function modalMaster(bodyTag, headerTag, mainTag, modalID) {
  /** CREATE TWO OBJECT WITH ALL PROPRIETY FOR MODELMASTER NEED */
  let backgroundPage = {
    // This is the background object (behind modal)
    bodyHTML: document.querySelector(bodyTag),
    // We want the <body> selected
    headerHTML: document.querySelector(headerTag),
    // We want the <header> selected
    mainHTML: document.querySelector(mainTag) // We want the <main> selected

  };
  let modalPage = {
    // This is the modal Object (call ModalPage)
    modalHTML: document.getElementById(modalID),
    modalID: modalID,
    visible: 0
  };
  /** END  */

  function addContactFormListener(modalPage) {
    // This add listener about only contact form 
    document.getElementById("openModal").addEventListener("click", function () {
      openModal(modalPage);
    });
    document.getElementById("closeModal").addEventListener("click", function () {
      closeModal(modalPage);
    });
    document.getElementById("contact_button").addEventListener("click", function () {
      event.preventDefault();
      sendMessage(modalPage);
    });
  }

  function addKeyboardListener(modalPage) {
    if (modalPage.visible === 1) {
      // If modalPage is visible at the screen
      // This add listener for Keyboard and check if a key is pressed
      document.onkeydown = function (event) {
        if (event.key === "Escape") {
          closeModal(modalPage);
        }
      };
    }
  }

  function setTitleModal(modalPage, tagHTML, titleModal) {
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(`#${modalPage.modalID} ${tagHTML}`, titleModal);
  }

  function effectAnimation(hideclass, showclass, modalPage) {
    if (modalPage.visible === 0) {
      backgroundPage.mainHTML.classList.remove(showclass);
      backgroundPage.headerHTML.classList.remove(showclass);
      modalPage.modalHTML.classList.remove(hideclass);
      backgroundPage.mainHTML.classList.add(hideclass);
      backgroundPage.headerHTML.classList.add(hideclass);
      modalPage.modalHTML.classList.add(showclass);
      modalPage.visible = 1;
    } else {
      modalPage.modalHTML.classList.remove(showclass);
      backgroundPage.mainHTML.classList.remove(hideclass);
      backgroundPage.headerHTML.classList.remove(hideclass);
      modalPage.modalHTML.classList.add(hideclass);
      backgroundPage.mainHTML.classList.add(showclass);
      backgroundPage.headerHTML.classList.add(showclass);
      modalPage.visible = 0;
    }

    return modalPage;
  }

  function openModal(modalPage) {
    effectAnimation("hide_content", "show_content", modalPage); // Effect Modal CSS

    modalPage.modalHTML.style.display = "block"; // Display the Modal at the screen

    addKeyboardListener(modalPage); // Add Keyboard Events

    document.querySelector(`#${modalPage.modalID} #closeModal`).focus(); // Focus the Close Modal 
    // Disable click or focus with inert to the BackgroundPage 

    backgroundPage.headerHTML.setAttribute("inert", "");
    backgroundPage.mainHTML.setAttribute("inert", "");
  }

  function closeModal(modalPage) {
    effectAnimation("hide_content", "show_content", modalPage); // Effect Modal CSS

    modalPage.modalHTML.style.display = "none"; // Hide at the screen modal
    // Allow click or focus with inert to the BackgroundPage 

    backgroundPage.mainHTML.removeAttribute("inert");
    backgroundPage.headerHTML.removeAttribute("inert");
  }

  function sendMessage(modalPage) {
    const allInputs = document.querySelectorAll(`#${modalPage.modalID} input`);
    const allTextArea = document.querySelectorAll(`#${modalPage.modalID} textarea`);
    console.log("____Send Message_____");
    let fullmessage = "";
    allInputs.forEach(input => {
      fullmessage += '\n' + input.id + ": " + input.value;
    });
    allTextArea.forEach(textarea => {
      fullmessage += '\n' + textarea.id + ": " + textarea.value;
    });

    if (fullmessage) {
      console.log(fullmessage);
      alert(`Message Envoyer ! ${fullmessage}`);
      closeModal(modalPage); // Close modal after message send
    } else {
      console.error("Something wrong message no send because fullmessage is empty or don't exists from sendMessage()");
      alert("Erreur message non envoyer :(");
    }
  }

  return {
    backgroundPage,
    modalPage,
    addContactFormListener,
    addKeyboardListener,
    openModal,
    closeModal,
    setTitleModal,
    sendMessage
  };
}

/***/ }),

/***/ "./src/scripts/utils/selectFilter.js":
/*!*******************************************!*\
  !*** ./src/scripts/utils/selectFilter.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selectFilterComponent": function() { return /* binding */ selectFilterComponent; }
/* harmony export */ });
/* harmony import */ var _data_displayMedia__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/displayMedia */ "./src/scripts/data/displayMedia.js");
/* harmony import */ var _utils_sortBy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/sortBy */ "./src/scripts/utils/sortBy.js");


/** GENERATE EVENT FOR SELECT FILTER COMPONENTS AND BEHAVIOR */

function selectFilterComponent(data, idURL) {
  const selectFilterButton = document.querySelector(".select_filter .select_button"); // Button Select

  const selectFilterSelect1 = document.getElementById("select1"); // First Select (by default Date)

  const selectFilterSelect2 = document.getElementById("select2"); // 2nd Select (by default Titre)

  function handleFilterAction(event) {
    const selectedItem = event.target.innerHTML; // Get innerHTML of selected item

    switch (selectedItem) {
      case 'Date':
        selectFilterButton.innerHTML = "Date";
        selectFilterSelect1.innerHTML = "Popularité";
        selectFilterSelect2.innerHTML = "Titre";
        document.querySelector('.media_section').innerHTML = ""; // Build Medias Data

        (0,_data_displayMedia__WEBPACK_IMPORTED_MODULE_0__.displayMedia)(data.sort(_utils_sortBy__WEBPACK_IMPORTED_MODULE_1__.sortByDate), ".media_section", idURL); // End build Medias Data

        break;

      case 'Titre':
        selectFilterButton.innerHTML = "Titre";
        selectFilterSelect1.innerHTML = "Date";
        selectFilterSelect2.innerHTML = "Popularité";
        document.querySelector('.media_section').innerHTML = ""; // Build Medias Data

        (0,_data_displayMedia__WEBPACK_IMPORTED_MODULE_0__.displayMedia)(data.sort(_utils_sortBy__WEBPACK_IMPORTED_MODULE_1__.sortByTitle), ".media_section", idURL); // End build Medias Data

        break;

      case 'Popularité':
        selectFilterButton.innerHTML = "Popularité";
        selectFilterSelect1.innerHTML = "Date";
        selectFilterSelect2.innerHTML = "Titre";
        document.querySelector('.media_section').innerHTML = ""; // Build Medias Data

        (0,_data_displayMedia__WEBPACK_IMPORTED_MODULE_0__.displayMedia)(data.sort(_utils_sortBy__WEBPACK_IMPORTED_MODULE_1__.sortByLikes), ".media_section", idURL); // End build Medias Data

        break;

      default:
        console.error("selectedItem not found error about handleFilterAction()");
    }
  }

  ;
  selectFilterSelect1.addEventListener("click", handleFilterAction);
  selectFilterSelect2.addEventListener("click", handleFilterAction);
}
/** END GENERATE EVENT FOR SELECT FILTER COMPONETNS AND BEHAVIOR */

/***/ }),

/***/ "./src/scripts/utils/sortBy.js":
/*!*************************************!*\
  !*** ./src/scripts/utils/sortBy.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sortByDate": function() { return /* binding */ sortByDate; },
/* harmony export */   "sortByLikes": function() { return /* binding */ sortByLikes; },
/* harmony export */   "sortByTitle": function() { return /* binding */ sortByTitle; }
/* harmony export */ });
/** Function to sort by Likes,Dates or Title */
function sortByLikes(a, b) {
  if (a.likes > b.likes) {
    return -1;
  }

  if (a.likes < b.likes) {
    return 1;
  }

  return 0;
}
function sortByDate(a, b) {
  if (a.date > b.date) {
    return -1;
  }

  if (a.date < b.date) {
    return 1;
  }

  return 0;
}
function sortByTitle(a, b) {
  if (a.title < b.title) {
    return -1;
  }

  if (a.title > b.title) {
    return 1;
  }

  return 0;
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
/*!*******************************************!*\
  !*** ./src/scripts/pages/photographer.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_regexp_flags_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.regexp.flags.js */ "./node_modules/core-js/modules/es.regexp.flags.js");
/* harmony import */ var core_js_modules_es_regexp_flags_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_flags_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_immediate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/web.immediate.js */ "./node_modules/core-js/modules/web.immediate.js");
/* harmony import */ var core_js_modules_web_immediate_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_immediate_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../scss/main.scss */ "./src/scss/main.scss");
/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/fetch */ "./src/scripts/utils/fetch.js");
/* harmony import */ var _data_displayData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../data/displayData */ "./src/scripts/data/displayData.js");
/* harmony import */ var _data_displayMedia__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../data/displayMedia */ "./src/scripts/data/displayMedia.js");
/* harmony import */ var _utils_getUrlParameter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getUrlParameter */ "./src/scripts/utils/getUrlParameter.js");
/* harmony import */ var _utils_sortBy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/sortBy */ "./src/scripts/utils/sortBy.js");
/* harmony import */ var _utils_selectFilter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/selectFilter */ "./src/scripts/utils/selectFilter.js");
/* harmony import */ var _utils_modalMaster__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/modalMaster */ "./src/scripts/utils/modalMaster.js");











async function initProfile(idURL) {
  // Try to get data from photographers if error then redirect to 404 page
  try {
    // SET Photographer Profile DATA
    const photographers = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_3__.getPhotographers)(); // Return the photographer Display

    const photographerSelected = await (0,_data_displayData__WEBPACK_IMPORTED_MODULE_4__.displayData)(photographers, idURL); // END SET Photographer Profile Data

    if (photographerSelected) {
      console.log("Section profile initié avec succès depuis initProfile()");
      initContactForm(photographerSelected);
    } else {
      console.error("Error no selected photographer");
    }
  } catch (e) {
    console.error(e); // If it's a fail then we redirect to 404 Error Page since  it's the minimal functionality
    // Atm 404 error page doesn't exists must be write later

    console.error("initProfile() failed redirect to 404 page");
  }
}

async function initContactForm(photographerSelected) {
  try {
    const contactFormModal = (0,_utils_modalMaster__WEBPACK_IMPORTED_MODULE_9__.modalMaster)("body", "header", "main", "contact_modal"); // Create a Model Master

    const modalPage = contactFormModal.modalPage; // Get modelPage Object

    contactFormModal.addContactFormListener(modalPage); // Add specific listener to Contact Form Modal

    const titleModal = `Contactez-moi ${photographerSelected.name}`; // Build the title Modal

    contactFormModal.setTitleModal(modalPage, "h2", titleModal); // Set the title Modal

    console.log("Formulaire contact initié avec succès depuis initContactForm()");
  } catch (e) {
    console.error(e); // If it's a fail then we redirect to 404 Error Page since  it's the minimal functionality
    // Atm 404 error page doesn't exists must be write later

    console.error("initContactForm() failed redirect to 404 page");
  }
}

async function initMedia(idURL) {
  // Try to get data from media if error then redirect to 404 page
  try {
    // Build Medias Data
    const medias = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_3__.getMedias)();
    (0,_data_displayMedia__WEBPACK_IMPORTED_MODULE_5__.displayMedia)(medias.sort(_utils_sortBy__WEBPACK_IMPORTED_MODULE_7__.sortByLikes), ".media_section", idURL); // Sort by default by likes
    // End build Medias Data
    // Init selectFilter Component and his behavior, need to provide the Data to filter

    (0,_utils_selectFilter__WEBPACK_IMPORTED_MODULE_8__.selectFilterComponent)(medias, idURL);
    console.log("Section média initié avec succès depuis initMain()");
  } catch (e) {
    console.error(e);
  }
}

async function initMain() {
  // We Wait for getUrlParameter() to be complete then we run tasks for generate page
  const idURL = await (0,_utils_getUrlParameter__WEBPACK_IMPORTED_MODULE_6__.getUrlParameter)("id");
  initProfile(idURL);
  initMedia(idURL);
}

initMain();
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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T0FBTyxZQUFZLEtBQUssVUFBVSxZQUFZLGVBQWUsZUFBZSxZQUFZLE1BQU0sTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sU0FBUyxZQUFZLFlBQVksWUFBWSxPQUFPLE1BQU0sV0FBVyxXQUFXLFlBQVksTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLEtBQUssV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxNQUFNLEtBQUssTUFBTSxLQUFLLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxXQUFXLE1BQU0sT0FBTyxVQUFVLFVBQVUsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFlBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsTUFBTSxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sS0FBSyxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLEtBQUssWUFBWSxLQUFLLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsT0FBTyxZQUFZLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxlQUFlLGFBQWEsV0FBVyxXQUFXLGNBQWMsZUFBZSxPQUFPLE1BQU0sV0FBVyxNQUFNLFFBQVEsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLE9BQU8sT0FBTyxXQUFXLGFBQWEsZUFBZSxlQUFlLE9BQU8sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sS0FBSyxZQUFZLFVBQVUsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLFlBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxLQUFLLE1BQU0sS0FBSyxXQUFXLGFBQWEsZUFBZSxlQUFlLGVBQWUsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLFFBQVEsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLFlBQVksWUFBWSxXQUFXLFdBQVcsV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sTUFBTSxXQUFXLFlBQVksYUFBYSxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxRQUFRLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLE9BQU8sWUFBWSxNQUFNLFVBQVUsWUFBWSxhQUFhLGVBQWUsZUFBZSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE9BQU8sV0FBVyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsT0FBTyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLFVBQVUsWUFBWSxXQUFXLFdBQVcsTUFBTSxPQUFPLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sT0FBTyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxhQUFhLGFBQWEsYUFBYSxXQUFXLE1BQU0sTUFBTSxZQUFZLFlBQVksWUFBWSxXQUFXLFdBQVcsUUFBUSxNQUFNLFVBQVUsV0FBVyxVQUFVLE9BQU8sTUFBTSxNQUFNLFVBQVUsTUFBTSxLQUFLLGFBQWEsTUFBTSxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsUUFBUSxPQUFPLFVBQVUsUUFBUSxPQUFPLFVBQVUsWUFBWSxhQUFhLFdBQVcsT0FBTyxPQUFPLFdBQVcsV0FBVyxZQUFZLGFBQWEsWUFBWSxVQUFVLFdBQVcsUUFBUSxPQUFPLFdBQVcsUUFBUSxPQUFPLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFFBQVEsT0FBTyxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsVUFBVSxPQUFPLE9BQU8sV0FBVyxXQUFXLFVBQVUsV0FBVyxPQUFPLE9BQU8sV0FBVyxVQUFVLE9BQU8sT0FBTyxVQUFVLFFBQVEsYUFBYSxNQUFNLFVBQVUsVUFBVSxXQUFXLFdBQVcsUUFBUSxPQUFPLE1BQU0sTUFBTSxNQUFNLFdBQVcsT0FBTyxLQUFLLE9BQU8sS0FBSyxXQUFXLFdBQVcsVUFBVSxPQUFPLE9BQU8sVUFBVSxPQUFPLFFBQVEsV0FBVyxXQUFXLFVBQVUsT0FBTyxPQUFPLFVBQVUsT0FBTyxPQUFPLFdBQVcsT0FBTyxLQUFLLE9BQU8sS0FBSyxXQUFXLE9BQU8sS0FBSyxPQUFPLEtBQUssV0FBVyxPQUFPLHVIQUF1SCxvRkFBb0Ysb0RBQW9ELGtFQUFrRSx5RkFBeUYsaUZBQWlGLGdEQUFnRCwwRkFBMEYsZ0dBQWdHLHdGQUF3RiwwR0FBMEcsaUdBQWlHLHdFQUF3RSxrRUFBa0UsOEtBQThLLHlEQUF5RCw0QkFBNEIsMEJBQTBCLHlCQUF5Qiw2RUFBNkUsaUNBQWlDLHlCQUF5Qiw2QkFBNkIsNkJBQTZCLCtCQUErQixrQ0FBa0MsK0JBQStCLHlHQUF5RyxnQkFBZ0IsaUJBQWlCLDZCQUE2QixTQUFTLGNBQWMsZ0NBQWdDLDZDQUE2Qyw4QkFBOEIsWUFBWSxxQkFBcUIsU0FBUyxrQkFBa0IsdUJBQXVCLFNBQVMsT0FBTyxLQUFLLGtGQUFrRixvRUFBb0Usc0JBQXNCLG9CQUFvQixtQ0FBbUMsc0JBQXNCLGdDQUFnQyw0Q0FBNEMsa0NBQWtDLDhCQUE4QixTQUFTLDhDQUE4Qyx5QkFBeUIsU0FBUyxtQkFBbUIsK0JBQStCLFNBQVMsZ0NBQWdDLCtCQUErQiw2QkFBNkIsU0FBUyxLQUFLLHVIQUF1SCxvQkFBb0Isc0NBQXNDLDRCQUE0Qiw4QkFBOEIsT0FBTyxnQ0FBZ0Msc0NBQXNDLE9BQU8sa0NBQWtDLDBDQUEwQyxPQUFPLDhCQUE4QixrQ0FBa0MsT0FBTyxLQUFLLDZDQUE2Qyw4QkFBOEIsc0JBQXNCLFFBQVEsaURBQWlELDZCQUE2Qiw4QkFBOEIsUUFBUSwrQ0FBK0MsMkJBQTJCLDRCQUE0QixLQUFLLHVCQUF1QixnRUFBZ0UsNkJBQTZCLGlCQUFpQix5REFBeUQsc0NBQXNDLDBCQUEwQix5QkFBeUIsK0JBQStCLDhCQUE4Qix5QkFBeUIsZ0NBQWdDLDZEQUE2RCxhQUFhLFNBQVMscURBQXFELHNDQUFzQywrQkFBK0IsNENBQTRDLFNBQVMsZ0JBQWdCLDZCQUE2QixtQ0FBbUMsa0NBQWtDLFNBQVMsZ0JBQWdCLGdEQUFnRCw4QkFBOEIsbUNBQW1DLFNBQVMsZ0JBQWdCLDRCQUE0Qiw4Q0FBOEMsOEJBQThCLHVDQUF1QyxTQUFTLGdCQUFnQiw0QkFBNEIsNENBQTRDLDhCQUE4QiwrQkFBK0IsK0JBQStCLFNBQVMsS0FBSyxvQ0FBb0MsNEJBQTRCLGdCQUFnQiwwREFBMEQsaUNBQWlDLGFBQWEsb0JBQW9CLHdEQUF3RCxpQ0FBaUMsYUFBYSxvQkFBb0Isc0RBQXNELGlDQUFpQyxhQUFhLFNBQVMsU0FBUyx1Q0FBdUMsNEJBQTRCLGdCQUFnQiwwREFBMEQsYUFBYSxvQkFBb0Isd0RBQXdELGFBQWEsb0JBQW9CLHNEQUFzRCxhQUFhLHFCQUFxQiw2QkFBNkIsOEJBQThCLGFBQWEsU0FBUyxTQUFTLG1CQUFtQixzQkFBc0Isd0JBQXdCLGlCQUFpQixrQkFBa0IseUNBQXlDLHFEQUFxRCwyQkFBMkIsNENBQTRDLHNCQUFzQixxQkFBcUIsbUJBQW1CLHVDQUF1QywyQkFBMkIsMkNBQTJDLHdCQUF3Qiw4QkFBOEIsZ0NBQWdDLDBCQUEwQixrQ0FBa0MsNkJBQTZCLHNFQUFzRSxvQ0FBb0MseUNBQXlDLGlCQUFpQixxQ0FBcUMsMENBQTBDLGlCQUFpQixhQUFhLHdCQUF3QixtREFBbUQsb0NBQW9DLGdDQUFnQyxhQUFhLFNBQVMsd0JBQXdCLDhDQUE4QywrQkFBK0IsMEJBQTBCLFNBQVMsMkJBQTJCLDZCQUE2Qiw2Q0FBNkMsZ0NBQWdDLDZCQUE2QixTQUFTLDhDQUE4Qyw0QkFBNEIseUJBQXlCLHlCQUF5QiwrQkFBK0IsYUFBYSw0QkFBNEIsdUNBQXVDLGtDQUFrQyxTQUFTLG1DQUFtQyw2QkFBNkIsU0FBUyx5QkFBeUIsMEJBQTBCLFNBQVMsaUJBQWlCLHVCQUF1QixrREFBa0QsaUNBQWlDLGdCQUFnQiw2QkFBNkIsYUFBYSxzQkFBc0IsNkJBQTZCLGFBQWEsU0FBUyxLQUFLLCtCQUErQixpREFBaUQsZ0NBQWdDLGdCQUFnQiw2QkFBNkIsYUFBYSxzQkFBc0IsNkJBQTZCLGFBQWEsU0FBUyxhQUFhLHdDQUF3Qyw0QkFBNEIsdUJBQXVCLCtCQUErQixvQkFBb0Isc0RBQXNELGlCQUFpQixxQkFBcUIsYUFBYSxLQUFLLG1DQUFtQyx3QkFBd0IsdUJBQXVCLCtCQUErQixvQkFBb0Isc0RBQXNELGlCQUFpQixhQUFhLDRCQUE0Qiw0Q0FBNEMsYUFBYSw0QkFBNEIsa0RBQWtELGFBQWEsK0JBQStCLDRDQUE0QyxpQkFBaUIscUJBQXFCLEtBQUssb0JBQW9CLDBDQUEwQyxzQ0FBc0Msa0NBQWtDLDhCQUE4QixzQkFBc0IseUJBQXlCLHlCQUF5QixxQkFBcUIsMENBQTBDLDJCQUEyQix3QkFBd0Isc0VBQXNFLHFCQUFxQix1Q0FBdUMsZ0RBQWdELFNBQVMsS0FBSyx1QkFBdUIseUVBQXlFLCtDQUErQyxzQkFBc0IseUJBQXlCLDhDQUE4Qyw4QkFBOEIsK0JBQStCLFNBQVMsMENBQTBDLHNDQUFzQyw0Q0FBNEMsU0FBUyxnQkFBZ0IsK0NBQStDLGlDQUFpQyxtQ0FBbUMsU0FBUyxnQkFBZ0IsNkJBQTZCLGdDQUFnQywrQ0FBK0MsbUNBQW1DLFNBQVMsZ0JBQWdCLDRDQUE0QyxxQ0FBcUMsU0FBUywwREFBMEQsd0VBQXdFLFNBQVMsZ0NBQWdDLDZCQUE2QiwrQkFBK0IsU0FBUywrQkFBK0IsOEJBQThCLGdDQUFnQyxTQUFTLEtBQUssd0NBQXdDLDRCQUE0Qiw2Q0FBNkMsK0VBQStFLDhCQUE4QixTQUFTLG1DQUFtQywrQ0FBK0MsU0FBUyxtQ0FBbUMsOENBQThDLGFBQWEsbUNBQW1DLDhDQUE4QyxTQUFTLGdDQUFnQyxnQ0FBZ0MsaUJBQWlCLGFBQWEsbUNBQW1DLDRCQUE0QiwrRUFBK0Usb0NBQW9DLHFDQUFxQyxrQ0FBa0MsbUNBQW1DLGtDQUFrQyxhQUFhLGFBQWEsa0RBQWtELDJCQUEyQixnQ0FBZ0MsU0FBUyx5REFBeUQsK0JBQStCLFNBQVMsbURBQW1ELDBCQUEwQixTQUFTLGFBQWEsbUJBQW1CLHNCQUFzQixnQ0FBZ0MsNEJBQTRCLHVDQUF1Qyw2QkFBNkIsMkJBQTJCLGtDQUFrQywyQkFBMkIsc0NBQXNDLHdDQUF3QyxvQ0FBb0MsOEJBQThCLG9DQUFvQyxxQ0FBcUMscUJBQXFCLDJCQUEyQixxQkFBcUIscUJBQXFCLHdCQUF3QixLQUFLLCtCQUErQiw0Q0FBNEMsdUJBQXVCLGlDQUFpQywyQ0FBMkMsMEJBQTBCLHFCQUFxQiwyQkFBMkIsU0FBUyx3QkFBd0IsK0JBQStCLDhCQUE4QixLQUFLLDZCQUE2QixzQkFBc0IsMkJBQTJCLG9DQUFvQyx1Q0FBdUMsd0NBQXdDLHlCQUF5Qix1REFBdUQsbUJBQW1CLDRCQUE0Qix1QkFBdUIsd0JBQXdCLDZDQUE2Qyw0QkFBNEIsU0FBUyxlQUFlLHlDQUF5QyxzQ0FBc0MsMENBQTBDLDRDQUE0QyxrQ0FBa0MsMEJBQTBCLHlCQUF5Qix5QkFBeUIsa0NBQWtDLDJCQUEyQixTQUFTLHFCQUFxQiw0QkFBNEIseUNBQXlDLHVDQUF1QyxTQUFTLGlCQUFpQixrREFBa0QsMkJBQTJCLEtBQUssb0RBQW9ELGtDQUFrQyw0Q0FBNEMsS0FBSyw0QkFBNEIsMkVBQTJFLHdCQUF3Qiw0Q0FBNEMseUJBQXlCLHlCQUF5QixrQkFBa0Isb0JBQW9CLG1CQUFtQiw2QkFBNkIsMkJBQTJCLDREQUE0RCxzQ0FBc0MsK0JBQStCLDBDQUEwQywrQ0FBK0MsOEJBQThCLHVDQUF1Qyw4QkFBOEIsYUFBYSxnQ0FBZ0MsOEJBQThCLDJCQUEyQixzREFBc0QsU0FBUyxTQUFTLG1DQUFtQyxpQ0FBaUMsMEJBQTBCLFNBQVMsU0FBUyxnQkFBZ0IsNERBQTRELHdCQUF3Qix5QkFBeUIsK0JBQStCLHNDQUFzQyx3QkFBd0IsOEJBQThCLDhCQUE4Qiw4QkFBOEIsK0JBQStCLHlCQUF5QiwwQ0FBMEMsZ0NBQWdDLDZEQUE2RCxhQUFhLFNBQVMsa0NBQWtDLDBFQUEwRSw0QkFBNEIsU0FBUyxnQkFBZ0Isc0NBQXNDLCtCQUErQiw0Q0FBNEMsOENBQThDLG1DQUFtQyxTQUFTLGtDQUFrQyxxREFBcUQsK0JBQStCLDJCQUEyQixTQUFTLFNBQVMsMkNBQTJDLGlEQUFpRCw0QkFBNEIsU0FBUyxLQUFLLGlEQUFpRCxzQkFBc0IsMkNBQTJDLGtCQUFrQix5QkFBeUIsNEJBQTRCLEtBQUssMEdBQTBHLHdCQUF3QixLQUFLLHlCQUF5Qiw2REFBNkQsdUJBQXVCLDRCQUE0Qiw2QkFBNkIsK0JBQStCLHNDQUFzQywwQ0FBMEMsK0JBQStCLDRDQUE0Qyx1Q0FBdUMsU0FBUyw0QkFBNEIsNkJBQTZCLFNBQVMsS0FBSyx3QkFBd0Isc0JBQXNCLDJDQUEyQyxzQkFBc0IseUJBQXlCLHlCQUF5Qiw0QkFBNEIsS0FBSywrR0FBK0csdUJBQXVCLHNCQUFzQiwrQkFBK0IsNEJBQTRCLHNDQUFzQyxzQkFBc0IsZ0JBQWdCLDhCQUE4QiwrQkFBK0Isc0NBQXNDLGdDQUFnQyxTQUFTLGVBQWUsa0NBQWtDLDJCQUEyQixTQUFTLHFCQUFxQiwyQkFBMkIsU0FBUyxLQUFLLHVEQUF1RCxvQkFBb0Isb0JBQW9CLHlDQUF5Qyx5QkFBeUIsS0FBSywrQkFBK0IsMERBQTBELDJDQUEyQyxTQUFTLFNBQVMsdUNBQXVDLG9CQUFvQixtQ0FBbUMsNkJBQTZCLDBCQUEwQixvQ0FBb0MsK0JBQStCLGFBQWEsc0NBQXNDLGtDQUFrQyxtQ0FBbUMsbURBQW1ELGFBQWEsU0FBUyxnQ0FBZ0MsMkJBQTJCLFNBQVMsaUNBQWlDLDJDQUEyQyxTQUFTLFNBQVMsbUNBQW1DLG1DQUFtQyx1Q0FBdUMsU0FBUyxTQUFTLG1DQUFtQyw0QkFBNEIsdUNBQXVDLFNBQVMsU0FBUyxtQkFBbUI7QUFDcmlyQztBQUNBLCtEQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOdkMsTUFBa0c7QUFDbEcsTUFBd0Y7QUFDeEYsTUFBK0Y7QUFDL0YsTUFBa0g7QUFDbEgsTUFBMkc7QUFDM0csTUFBMkc7QUFDM0csTUFBMk47QUFDM047QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQywyTEFBTzs7OztBQUlxSztBQUM3TCxPQUFPLCtEQUFlLDJMQUFPLElBQUksa01BQWMsR0FBRyxrTUFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsNkJBQTZCO0FBQ2xEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNWYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLGVBQWUsNEJBQTRCO1dBQzNDLGVBQWU7V0FDZixpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQsOENBQThDOzs7OztXQ0E5QztXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLQSxlQUFlc0csV0FBZixDQUEyQlQsS0FBM0IsRUFBa0M7RUFDOUI7RUFDQSxJQUFJO0lBQ0E7SUFDQSxNQUFNMUgsYUFBYSxHQUFHLE1BQU1zRSw4REFBZ0IsRUFBNUMsQ0FGQSxDQUdBOztJQUNBLE1BQU1yRSxvQkFBb0IsR0FBRyxNQUFNRiw4REFBVyxDQUFDQyxhQUFELEVBQWdCMEgsS0FBaEIsQ0FBOUMsQ0FKQSxDQUtBOztJQUVBLElBQUl6SCxvQkFBSixFQUEwQjtNQUN0QkssT0FBTyxDQUFDQyxHQUFSLENBQVkseURBQVo7TUFDQTZILGVBQWUsQ0FBQ25JLG9CQUFELENBQWY7SUFDSCxDQUhELE1BSUs7TUFDREssT0FBTyxDQUFDOVEsS0FBUixDQUFjLGdDQUFkO0lBQ0g7RUFFSixDQWZELENBZUUsT0FBTzZZLENBQVAsRUFBVTtJQUNSL0gsT0FBTyxDQUFDOVEsS0FBUixDQUFjNlksQ0FBZCxFQURRLENBRVI7SUFDQTs7SUFDQS9ILE9BQU8sQ0FBQzlRLEtBQVIsQ0FBYywyQ0FBZDtFQUNIO0FBRUo7O0FBRUQsZUFBZTRZLGVBQWYsQ0FBK0JuSSxvQkFBL0IsRUFBcUQ7RUFDakQsSUFBSTtJQUNBLE1BQU1xSSxnQkFBZ0IsR0FBR3ZELCtEQUFXLENBQUMsTUFBRCxFQUFTLFFBQVQsRUFBbUIsTUFBbkIsRUFBMkIsZUFBM0IsQ0FBcEMsQ0FEQSxDQUNpRjs7SUFDakYsTUFBTVMsU0FBUyxHQUFHOEMsZ0JBQWdCLENBQUM5QyxTQUFuQyxDQUZBLENBRThDOztJQUU5QzhDLGdCQUFnQixDQUFDMUMsc0JBQWpCLENBQXdDSixTQUF4QyxFQUpBLENBSW9EOztJQUVwRCxNQUFNYSxVQUFVLEdBQUksaUJBQWdCcEcsb0JBQW9CLENBQUNyUixJQUFLLEVBQTlELENBTkEsQ0FNaUU7O0lBQ2pFMFosZ0JBQWdCLENBQUNuQyxhQUFqQixDQUErQlgsU0FBL0IsRUFBMEMsSUFBMUMsRUFBZ0RhLFVBQWhELEVBUEEsQ0FPOEQ7O0lBRTlEL0YsT0FBTyxDQUFDQyxHQUFSLENBQVksZ0VBQVo7RUFDSCxDQVZELENBV0EsT0FBTzhILENBQVAsRUFBVTtJQUNOL0gsT0FBTyxDQUFDOVEsS0FBUixDQUFjNlksQ0FBZCxFQURNLENBRU47SUFDQTs7SUFDQS9ILE9BQU8sQ0FBQzlRLEtBQVIsQ0FBYywrQ0FBZDtFQUNIO0FBQ0o7O0FBR0QsZUFBZStZLFNBQWYsQ0FBeUJiLEtBQXpCLEVBQWdDO0VBQzVCO0VBQ0EsSUFBSTtJQUVBO0lBQ0EsTUFBTXZHLE1BQU0sR0FBRyxNQUFNb0QsdURBQVMsRUFBOUI7SUFDQXJELGdFQUFZLENBQUNDLE1BQU0sQ0FBQzZHLElBQVAsQ0FBWVYsc0RBQVosQ0FBRCxFQUEyQixnQkFBM0IsRUFBNkNJLEtBQTdDLENBQVosQ0FKQSxDQUlpRTtJQUNqRTtJQUVBOztJQUNBRCwwRUFBcUIsQ0FBQ3RHLE1BQUQsRUFBU3VHLEtBQVQsQ0FBckI7SUFHQXBILE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG9EQUFaO0VBRUgsQ0FiRCxDQWFFLE9BQU84SCxDQUFQLEVBQVU7SUFDUi9ILE9BQU8sQ0FBQzlRLEtBQVIsQ0FBYzZZLENBQWQ7RUFDSDtBQUVKOztBQUdELGVBQWVHLFFBQWYsR0FBMEI7RUFDdEI7RUFDQSxNQUFNZCxLQUFLLEdBQUcsTUFBTWxELHVFQUFlLENBQUMsSUFBRCxDQUFuQztFQUNBMkQsV0FBVyxDQUFDVCxLQUFELENBQVg7RUFDQWEsU0FBUyxDQUFDYixLQUFELENBQVQ7QUFDSDs7QUFHRGMsUUFBUSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc2xpY2UuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4tYWNjZXNzb3IuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLWlzLWlvcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2V4cG9ydC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1hcHBseS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1uYW1lLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LW1ldGhvZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9odG1sLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWNhbGxhYmxlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcHVyZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbWFrZS1idWlsdC1pbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9tYXRoLXRydW5jLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3JkaW5hcnktdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1mbGFncy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdGFzay5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90cnktdG8tc3RyaW5nLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VpZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy92OC1wcm90b3R5cGUtZGVmaW5lLWJ1Zy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy92YWxpZGF0ZS1hcmd1bWVudHMtbGVuZ3RoLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dlYWstbWFwLWJhc2ljLWRldGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLmZsYWdzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuY2xlYXItaW1tZWRpYXRlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuaW1tZWRpYXRlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuc2V0LWltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL2RhdGEvZGlzcGxheURhdGEuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9kYXRhL2Rpc3BsYXlNZWRpYS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL2ZhY3Rvcmllcy9tZWRpYUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9mYWN0b3JpZXMvcGhvdG9ncmFwaGVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2RvbS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2ZldGNoLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvZ2V0VXJsUGFyYW1ldGVyLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvbW9kYWxNYXN0ZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9zZWxlY3RGaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9zb3J0QnkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2Nzcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2Nzcy9tYWluLnNjc3M/YjM3OSIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9waG90b2dyYXBoZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciB0cnlUb1N0cmluZyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90cnktdG8tc3RyaW5nJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgQXNzZXJ0OiBJc0NhbGxhYmxlKGFyZ3VtZW50KSBpcyB0cnVlYFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzQ2FsbGFibGUoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93ICRUeXBlRXJyb3IodHJ5VG9TdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyICRTdHJpbmcgPSBTdHJpbmc7XG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYEFzc2VydDogVHlwZShhcmd1bWVudCkgaXMgT2JqZWN0YFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgaWYgKGlzT2JqZWN0KGFyZ3VtZW50KSkgcmV0dXJuIGFyZ3VtZW50O1xuICB0aHJvdyAkVHlwZUVycm9yKCRTdHJpbmcoYXJndW1lbnQpICsgJyBpcyBub3QgYW4gb2JqZWN0Jyk7XG59O1xuIiwidmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIGxlbmd0aE9mQXJyYXlMaWtlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyBpbmRleE9mLCBpbmNsdWRlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKElTX0lOQ0xVREVTKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGVsLCBmcm9tSW5kZXgpIHtcbiAgICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdCgkdGhpcyk7XG4gICAgdmFyIGxlbmd0aCA9IGxlbmd0aE9mQXJyYXlMaWtlKE8pO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgIGlmIChJU19JTkNMVURFUyAmJiBlbCAhPSBlbCkgd2hpbGUgKGxlbmd0aCA+IGluZGV4KSB7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICAgICAgaWYgKHZhbHVlICE9IHZhbHVlKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSNpbmRleE9mIGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBpZiAoKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pICYmIE9baW5kZXhdID09PSBlbCkgcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmNsdWRlc1xuICBpbmNsdWRlczogY3JlYXRlTWV0aG9kKHRydWUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmluZGV4T2ZgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdW5jdXJyeVRoaXMoW10uc2xpY2UpO1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgdG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyh7fS50b1N0cmluZyk7XG52YXIgc3RyaW5nU2xpY2UgPSB1bmN1cnJ5VGhpcygnJy5zbGljZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBzdHJpbmdTbGljZSh0b1N0cmluZyhpdCksIDgsIC0xKTtcbn07XG4iLCJ2YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBvd25LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL293bi1rZXlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgc291cmNlLCBleGNlcHRpb25zKSB7XG4gIHZhciBrZXlzID0gb3duS2V5cyhzb3VyY2UpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuICB2YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlLmY7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmICghaGFzT3duKHRhcmdldCwga2V5KSAmJiAhKGV4Y2VwdGlvbnMgJiYgaGFzT3duKGV4Y2VwdGlvbnMsIGtleSkpKSB7XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gICAgfVxuICB9XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTID8gZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHlNb2R1bGUuZihvYmplY3QsIGtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24gKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJpdG1hcCwgdmFsdWUpIHtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZTogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZTogdmFsdWVcbiAgfTtcbn07XG4iLCJ2YXIgbWFrZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbWFrZS1idWlsdC1pbicpO1xudmFyIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKSB7XG4gIGlmIChkZXNjcmlwdG9yLmdldCkgbWFrZUJ1aWx0SW4oZGVzY3JpcHRvci5nZXQsIG5hbWUsIHsgZ2V0dGVyOiB0cnVlIH0pO1xuICBpZiAoZGVzY3JpcHRvci5zZXQpIG1ha2VCdWlsdEluKGRlc2NyaXB0b3Iuc2V0LCBuYW1lLCB7IHNldHRlcjogdHJ1ZSB9KTtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5LmYodGFyZ2V0LCBuYW1lLCBkZXNjcmlwdG9yKTtcbn07XG4iLCJ2YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBtYWtlQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9tYWtlLWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lR2xvYmFsUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuICB2YXIgc2ltcGxlID0gb3B0aW9ucy5lbnVtZXJhYmxlO1xuICB2YXIgbmFtZSA9IG9wdGlvbnMubmFtZSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uYW1lIDoga2V5O1xuICBpZiAoaXNDYWxsYWJsZSh2YWx1ZSkpIG1ha2VCdWlsdEluKHZhbHVlLCBuYW1lLCBvcHRpb25zKTtcbiAgaWYgKG9wdGlvbnMuZ2xvYmFsKSB7XG4gICAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gICAgZWxzZSBkZWZpbmVHbG9iYWxQcm9wZXJ0eShrZXksIHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICB0cnkge1xuICAgICAgaWYgKCFvcHRpb25zLnVuc2FmZSkgZGVsZXRlIE9ba2V5XTtcbiAgICAgIGVsc2UgaWYgKE9ba2V5XSkgc2ltcGxlID0gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gICAgaWYgKHNpbXBsZSkgT1trZXldID0gdmFsdWU7XG4gICAgZWxzZSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKE8sIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6ICFvcHRpb25zLm5vbkNvbmZpZ3VyYWJsZSxcbiAgICAgIHdyaXRhYmxlOiAhb3B0aW9ucy5ub25Xcml0YWJsZVxuICAgIH0pO1xuICB9IHJldHVybiBPO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBkZWZpbmVQcm9wZXJ0eShnbG9iYWwsIGtleSwgeyB2YWx1ZTogdmFsdWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZ2xvYmFsW2tleV0gPSB2YWx1ZTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIERldGVjdCBJRTgncyBpbmNvbXBsZXRlIGRlZmluZVByb3BlcnR5IGltcGxlbWVudGF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAxLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KVsxXSAhPSA3O1xufSk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBFWElTVFMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBFWElTVFMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcbiIsInZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAvKD86aXBhZHxpcGhvbmV8aXBvZCkuKmFwcGxld2Via2l0L2kudGVzdCh1c2VyQWdlbnQpO1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY2xhc3NvZihnbG9iYWwucHJvY2VzcykgPT0gJ3Byb2Nlc3MnO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignbmF2aWdhdG9yJywgJ3VzZXJBZ2VudCcpIHx8ICcnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQnKTtcblxudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBEZW5vID0gZ2xvYmFsLkRlbm87XG52YXIgdmVyc2lvbnMgPSBwcm9jZXNzICYmIHByb2Nlc3MudmVyc2lvbnMgfHwgRGVubyAmJiBEZW5vLnZlcnNpb247XG52YXIgdjggPSB2ZXJzaW9ucyAmJiB2ZXJzaW9ucy52ODtcbnZhciBtYXRjaCwgdmVyc2lvbjtcblxuaWYgKHY4KSB7XG4gIG1hdGNoID0gdjguc3BsaXQoJy4nKTtcbiAgLy8gaW4gb2xkIENocm9tZSwgdmVyc2lvbnMgb2YgVjggaXNuJ3QgVjggPSBDaHJvbWUgLyAxMFxuICAvLyBidXQgdGhlaXIgY29ycmVjdCB2ZXJzaW9ucyBhcmUgbm90IGludGVyZXN0aW5nIGZvciB1c1xuICB2ZXJzaW9uID0gbWF0Y2hbMF0gPiAwICYmIG1hdGNoWzBdIDwgNCA/IDEgOiArKG1hdGNoWzBdICsgbWF0Y2hbMV0pO1xufVxuXG4vLyBCcm93c2VyRlMgTm9kZUpTIGBwcm9jZXNzYCBwb2x5ZmlsbCBpbmNvcnJlY3RseSBzZXQgYC52OGAgdG8gYDAuMGBcbi8vIHNvIGNoZWNrIGB1c2VyQWdlbnRgIGV2ZW4gaWYgYC52OGAgZXhpc3RzLCBidXQgMFxuaWYgKCF2ZXJzaW9uICYmIHVzZXJBZ2VudCkge1xuICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvRWRnZVxcLyhcXGQrKS8pO1xuICBpZiAoIW1hdGNoIHx8IG1hdGNoWzFdID49IDc0KSB7XG4gICAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0Nocm9tZVxcLyhcXGQrKS8pO1xuICAgIGlmIChtYXRjaCkgdmVyc2lvbiA9ICttYXRjaFsxXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnNpb247XG4iLCIvLyBJRTgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gW1xuICAnY29uc3RydWN0b3InLFxuICAnaGFzT3duUHJvcGVydHknLFxuICAnaXNQcm90b3R5cGVPZicsXG4gICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsXG4gICd0b0xvY2FsZVN0cmluZycsXG4gICd0b1N0cmluZycsXG4gICd2YWx1ZU9mJ1xuXTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3InKS5mO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBkZWZpbmVCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbicpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcbnZhciBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcycpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xuXG4vKlxuICBvcHRpb25zLnRhcmdldCAgICAgICAgIC0gbmFtZSBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICBvcHRpb25zLmdsb2JhbCAgICAgICAgIC0gdGFyZ2V0IGlzIHRoZSBnbG9iYWwgb2JqZWN0XG4gIG9wdGlvbnMuc3RhdCAgICAgICAgICAgLSBleHBvcnQgYXMgc3RhdGljIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucHJvdG8gICAgICAgICAgLSBleHBvcnQgYXMgcHJvdG90eXBlIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucmVhbCAgICAgICAgICAgLSByZWFsIHByb3RvdHlwZSBtZXRob2QgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLmZvcmNlZCAgICAgICAgIC0gZXhwb3J0IGV2ZW4gaWYgdGhlIG5hdGl2ZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICBvcHRpb25zLmJpbmQgICAgICAgICAgIC0gYmluZCBtZXRob2RzIHRvIHRoZSB0YXJnZXQsIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy53cmFwICAgICAgICAgICAtIHdyYXAgY29uc3RydWN0b3JzIHRvIHByZXZlbnRpbmcgZ2xvYmFsIHBvbGx1dGlvbiwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLnVuc2FmZSAgICAgICAgIC0gdXNlIHRoZSBzaW1wbGUgYXNzaWdubWVudCBvZiBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGRlbGV0ZSArIGRlZmluZVByb3BlcnR5XG4gIG9wdGlvbnMuc2hhbSAgICAgICAgICAgLSBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gIG9wdGlvbnMuZW51bWVyYWJsZSAgICAgLSBleHBvcnQgYXMgZW51bWVyYWJsZSBwcm9wZXJ0eVxuICBvcHRpb25zLmRvbnRDYWxsR2V0U2V0IC0gcHJldmVudCBjYWxsaW5nIGEgZ2V0dGVyIG9uIHRhcmdldFxuICBvcHRpb25zLm5hbWUgICAgICAgICAgIC0gdGhlIC5uYW1lIG9mIHRoZSBmdW5jdGlvbiBpZiBpdCBkb2VzIG5vdCBtYXRjaCB0aGUga2V5XG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XG4gIHZhciBUQVJHRVQgPSBvcHRpb25zLnRhcmdldDtcbiAgdmFyIEdMT0JBTCA9IG9wdGlvbnMuZ2xvYmFsO1xuICB2YXIgU1RBVElDID0gb3B0aW9ucy5zdGF0O1xuICB2YXIgRk9SQ0VELCB0YXJnZXQsIGtleSwgdGFyZ2V0UHJvcGVydHksIHNvdXJjZVByb3BlcnR5LCBkZXNjcmlwdG9yO1xuICBpZiAoR0xPQkFMKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKFNUQVRJQykge1xuICAgIHRhcmdldCA9IGdsb2JhbFtUQVJHRVRdIHx8IGRlZmluZUdsb2JhbFByb3BlcnR5KFRBUkdFVCwge30pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldCA9IChnbG9iYWxbVEFSR0VUXSB8fCB7fSkucHJvdG90eXBlO1xuICB9XG4gIGlmICh0YXJnZXQpIGZvciAoa2V5IGluIHNvdXJjZSkge1xuICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlW2tleV07XG4gICAgaWYgKG9wdGlvbnMuZG9udENhbGxHZXRTZXQpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpO1xuICAgICAgdGFyZ2V0UHJvcGVydHkgPSBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IudmFsdWU7XG4gICAgfSBlbHNlIHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0W2tleV07XG4gICAgRk9SQ0VEID0gaXNGb3JjZWQoR0xPQkFMID8ga2V5IDogVEFSR0VUICsgKFNUQVRJQyA/ICcuJyA6ICcjJykgKyBrZXksIG9wdGlvbnMuZm9yY2VkKTtcbiAgICAvLyBjb250YWluZWQgaW4gdGFyZ2V0XG4gICAgaWYgKCFGT1JDRUQgJiYgdGFyZ2V0UHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2VQcm9wZXJ0eSA9PSB0eXBlb2YgdGFyZ2V0UHJvcGVydHkpIGNvbnRpbnVlO1xuICAgICAgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyhzb3VyY2VQcm9wZXJ0eSwgdGFyZ2V0UHJvcGVydHkpO1xuICAgIH1cbiAgICAvLyBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gICAgaWYgKG9wdGlvbnMuc2hhbSB8fCAodGFyZ2V0UHJvcGVydHkgJiYgdGFyZ2V0UHJvcGVydHkuc2hhbSkpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShzb3VyY2VQcm9wZXJ0eSwgJ3NoYW0nLCB0cnVlKTtcbiAgICB9XG4gICAgZGVmaW5lQnVpbHRJbih0YXJnZXQsIGtleSwgc291cmNlUHJvcGVydHksIG9wdGlvbnMpO1xuICB9XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsInZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgYXBwbHkgPSBGdW5jdGlvblByb3RvdHlwZS5hcHBseTtcbnZhciBjYWxsID0gRnVuY3Rpb25Qcm90b3R5cGUuY2FsbDtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tcmVmbGVjdCAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBSZWZsZWN0ID09ICdvYmplY3QnICYmIFJlZmxlY3QuYXBwbHkgfHwgKE5BVElWRV9CSU5EID8gY2FsbC5iaW5kKGFwcGx5KSA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhbGwuYXBwbHkoYXBwbHksIGFyZ3VtZW50cyk7XG59KTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBiaW5kID0gdW5jdXJyeVRoaXModW5jdXJyeVRoaXMuYmluZCk7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQpIHtcbiAgYUNhbGxhYmxlKGZuKTtcbiAgcmV0dXJuIHRoYXQgPT09IHVuZGVmaW5lZCA/IGZuIDogTkFUSVZFX0JJTkQgPyBiaW5kKGZuLCB0aGF0KSA6IGZ1bmN0aW9uICgvKiAuLi5hcmdzICovKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tZnVuY3Rpb24tcHJvdG90eXBlLWJpbmQgLS0gc2FmZVxuICB2YXIgdGVzdCA9IChmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pLmJpbmQoKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiB0eXBlb2YgdGVzdCAhPSAnZnVuY3Rpb24nIHx8IHRlc3QuaGFzT3duUHJvcGVydHkoJ3Byb3RvdHlwZScpO1xufSk7XG4iLCJ2YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfQklORCA/IGNhbGwuYmluZChjYWxsKSA6IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNhbGwuYXBwbHkoY2FsbCwgYXJndW1lbnRzKTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciBnZXREZXNjcmlwdG9yID0gREVTQ1JJUFRPUlMgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxudmFyIEVYSVNUUyA9IGhhc093bihGdW5jdGlvblByb3RvdHlwZSwgJ25hbWUnKTtcbi8vIGFkZGl0aW9uYWwgcHJvdGVjdGlvbiBmcm9tIG1pbmlmaWVkIC8gbWFuZ2xlZCAvIGRyb3BwZWQgZnVuY3Rpb24gbmFtZXNcbnZhciBQUk9QRVIgPSBFWElTVFMgJiYgKGZ1bmN0aW9uIHNvbWV0aGluZygpIHsgLyogZW1wdHkgKi8gfSkubmFtZSA9PT0gJ3NvbWV0aGluZyc7XG52YXIgQ09ORklHVVJBQkxFID0gRVhJU1RTICYmICghREVTQ1JJUFRPUlMgfHwgKERFU0NSSVBUT1JTICYmIGdldERlc2NyaXB0b3IoRnVuY3Rpb25Qcm90b3R5cGUsICduYW1lJykuY29uZmlndXJhYmxlKSk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBFWElTVFM6IEVYSVNUUyxcbiAgUFJPUEVSOiBQUk9QRVIsXG4gIENPTkZJR1VSQUJMRTogQ09ORklHVVJBQkxFXG59O1xuIiwidmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBiaW5kID0gRnVuY3Rpb25Qcm90b3R5cGUuYmluZDtcbnZhciBjYWxsID0gRnVuY3Rpb25Qcm90b3R5cGUuY2FsbDtcbnZhciB1bmN1cnJ5VGhpcyA9IE5BVElWRV9CSU5EICYmIGJpbmQuYmluZChjYWxsLCBjYWxsKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfQklORCA/IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZm4gJiYgdW5jdXJyeVRoaXMoZm4pO1xufSA6IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZm4gJiYgZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBjYWxsLmFwcGx5KGZuLCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgYUZ1bmN0aW9uID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBpc0NhbGxhYmxlKGFyZ3VtZW50KSA/IGFyZ3VtZW50IDogdW5kZWZpbmVkO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZXNwYWNlLCBtZXRob2QpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyID8gYUZ1bmN0aW9uKGdsb2JhbFtuYW1lc3BhY2VdKSA6IGdsb2JhbFtuYW1lc3BhY2VdICYmIGdsb2JhbFtuYW1lc3BhY2VdW21ldGhvZF07XG59O1xuIiwidmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG52YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcblxuLy8gYEdldE1ldGhvZGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldG1ldGhvZFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoViwgUCkge1xuICB2YXIgZnVuYyA9IFZbUF07XG4gIHJldHVybiBpc051bGxPclVuZGVmaW5lZChmdW5jKSA/IHVuZGVmaW5lZCA6IGFDYWxsYWJsZShmdW5jKTtcbn07XG4iLCJ2YXIgY2hlY2sgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICYmIGl0Lk1hdGggPT0gTWF0aCAmJiBpdDtcbn07XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG5tb2R1bGUuZXhwb3J0cyA9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLWdsb2JhbC10aGlzIC0tIHNhZmVcbiAgY2hlY2sodHlwZW9mIGdsb2JhbFRoaXMgPT0gJ29iamVjdCcgJiYgZ2xvYmFsVGhpcykgfHxcbiAgY2hlY2sodHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLWdsb2JhbHMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jIC0tIGZhbGxiYWNrXG4gIChmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9KSgpIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IHVuY3VycnlUaGlzKHt9Lmhhc093blByb3BlcnR5KTtcblxuLy8gYEhhc093blByb3BlcnR5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaGFzb3ducHJvcGVydHlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1oYXNvd24gLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuaGFzT3duIHx8IGZ1bmN0aW9uIGhhc093bihpdCwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eSh0b09iamVjdChpdCksIGtleSk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ2RvY3VtZW50JywgJ2RvY3VtZW50RWxlbWVudCcpO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG5cbi8vIFRoYW5rcyB0byBJRTggZm9yIGl0cyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRlRWxlbWVudCgnZGl2JyksICdhJywge1xuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfVxuICB9KS5hICE9IDc7XG59KTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG52YXIgc3BsaXQgPSB1bmN1cnJ5VGhpcygnJy5zcGxpdCk7XG5cbi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG5tb2R1bGUuZXhwb3J0cyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gdGhyb3dzIGFuIGVycm9yIGluIHJoaW5vLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21vemlsbGEvcmhpbm8vaXNzdWVzLzM0NlxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuICEkT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCk7XG59KSA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY2xhc3NvZihpdCkgPT0gJ1N0cmluZycgPyBzcGxpdChpdCwgJycpIDogJE9iamVjdChpdCk7XG59IDogJE9iamVjdDtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbnZhciBmdW5jdGlvblRvU3RyaW5nID0gdW5jdXJyeVRoaXMoRnVuY3Rpb24udG9TdHJpbmcpO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYGNvcmUtanNAMy40LjEtMy40LjRgLCBzbyB3ZSBjYW4ndCB1c2UgYHNoYXJlZGAgaGVscGVyXG5pZiAoIWlzQ2FsbGFibGUoc3RvcmUuaW5zcGVjdFNvdXJjZSkpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nKGl0KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZS5pbnNwZWN0U291cmNlO1xuIiwidmFyIE5BVElWRV9XRUFLX01BUCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWFrLW1hcC1iYXNpYy1kZXRlY3Rpb24nKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQgPSAnT2JqZWN0IGFscmVhZHkgaW5pdGlhbGl6ZWQnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCB8fCBzaGFyZWQuc3RhdGUpIHtcbiAgdmFyIHN0b3JlID0gc2hhcmVkLnN0YXRlIHx8IChzaGFyZWQuc3RhdGUgPSBuZXcgV2Vha01hcCgpKTtcbiAgdmFyIHdtZ2V0ID0gdW5jdXJyeVRoaXMoc3RvcmUuZ2V0KTtcbiAgdmFyIHdtaGFzID0gdW5jdXJyeVRoaXMoc3RvcmUuaGFzKTtcbiAgdmFyIHdtc2V0ID0gdW5jdXJyeVRoaXMoc3RvcmUuc2V0KTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGlmICh3bWhhcyhzdG9yZSwgaXQpKSB0aHJvdyBUeXBlRXJyb3IoT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQpO1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIHdtc2V0KHN0b3JlLCBpdCwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtZ2V0KHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcyhzdG9yZSwgaXQpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIFNUQVRFID0gc2hhcmVkS2V5KCdzdGF0ZScpO1xuICBoaWRkZW5LZXlzW1NUQVRFXSA9IHRydWU7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBpZiAoaGFzT3duKGl0LCBTVEFURSkpIHRocm93IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KGl0LCBTVEFURSwgbWV0YWRhdGEpO1xuICAgIHJldHVybiBtZXRhZGF0YTtcbiAgfTtcbiAgZ2V0ID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGhhc093bihpdCwgU1RBVEUpID8gaXRbU1RBVEVdIDoge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBoYXNPd24oaXQsIFNUQVRFKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBnZXQ6IGdldCxcbiAgaGFzOiBoYXMsXG4gIGVuZm9yY2U6IGVuZm9yY2UsXG4gIGdldHRlckZvcjogZ2V0dGVyRm9yXG59O1xuIiwiLy8gYElzQ2FsbGFibGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1pc2NhbGxhYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gdHlwZW9mIGFyZ3VtZW50ID09ICdmdW5jdGlvbic7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgcmVwbGFjZW1lbnQgPSAvI3xcXC5wcm90b3R5cGVcXC4vO1xuXG52YXIgaXNGb3JjZWQgPSBmdW5jdGlvbiAoZmVhdHVyZSwgZGV0ZWN0aW9uKSB7XG4gIHZhciB2YWx1ZSA9IGRhdGFbbm9ybWFsaXplKGZlYXR1cmUpXTtcbiAgcmV0dXJuIHZhbHVlID09IFBPTFlGSUxMID8gdHJ1ZVxuICAgIDogdmFsdWUgPT0gTkFUSVZFID8gZmFsc2VcbiAgICA6IGlzQ2FsbGFibGUoZGV0ZWN0aW9uKSA/IGZhaWxzKGRldGVjdGlvbilcbiAgICA6ICEhZGV0ZWN0aW9uO1xufTtcblxudmFyIG5vcm1hbGl6ZSA9IGlzRm9yY2VkLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UocmVwbGFjZW1lbnQsICcuJykudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBkYXRhID0gaXNGb3JjZWQuZGF0YSA9IHt9O1xudmFyIE5BVElWRSA9IGlzRm9yY2VkLk5BVElWRSA9ICdOJztcbnZhciBQT0xZRklMTCA9IGlzRm9yY2VkLlBPTFlGSUxMID0gJ1AnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzRm9yY2VkO1xuIiwiLy8gd2UgY2FuJ3QgdXNlIGp1c3QgYGl0ID09IG51bGxgIHNpbmNlIG9mIGBkb2N1bWVudC5hbGxgIHNwZWNpYWwgY2FzZVxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1Jc0hUTUxEREEtaW50ZXJuYWwtc2xvdC1hZWNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCA9PT0gbnVsbCB8fCBpdCA9PT0gdW5kZWZpbmVkO1xufTtcbiIsInZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciBkb2N1bWVudEFsbCA9IHR5cGVvZiBkb2N1bWVudCA9PSAnb2JqZWN0JyAmJiBkb2N1bWVudC5hbGw7XG5cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtSXNIVE1MRERBLWludGVybmFsLXNsb3RcbnZhciBTUEVDSUFMX0RPQ1VNRU5UX0FMTCA9IHR5cGVvZiBkb2N1bWVudEFsbCA9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudEFsbCAhPT0gdW5kZWZpbmVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNQRUNJQUxfRE9DVU1FTlRfQUxMID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IGlzQ2FsbGFibGUoaXQpIHx8IGl0ID09PSBkb2N1bWVudEFsbDtcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogaXNDYWxsYWJsZShpdCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc1Byb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YnKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcblxubW9kdWxlLmV4cG9ydHMgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgJFN5bWJvbCA9IGdldEJ1aWx0SW4oJ1N5bWJvbCcpO1xuICByZXR1cm4gaXNDYWxsYWJsZSgkU3ltYm9sKSAmJiBpc1Byb3RvdHlwZU9mKCRTeW1ib2wucHJvdG90eXBlLCAkT2JqZWN0KGl0KSk7XG59O1xuIiwidmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xuXG4vLyBgTGVuZ3RoT2ZBcnJheUxpa2VgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1sZW5ndGhvZmFycmF5bGlrZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0b0xlbmd0aChvYmoubGVuZ3RoKTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIENPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLW5hbWUnKS5DT05GSUdVUkFCTEU7XG52YXIgaW5zcGVjdFNvdXJjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcblxudmFyIGVuZm9yY2VJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5lbmZvcmNlO1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbnZhciBDT05GSUdVUkFCTEVfTEVOR1RIID0gREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgJ2xlbmd0aCcsIHsgdmFsdWU6IDggfSkubGVuZ3RoICE9PSA4O1xufSk7XG5cbnZhciBURU1QTEFURSA9IFN0cmluZyhTdHJpbmcpLnNwbGl0KCdTdHJpbmcnKTtcblxudmFyIG1ha2VCdWlsdEluID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUsIG5hbWUsIG9wdGlvbnMpIHtcbiAgaWYgKFN0cmluZyhuYW1lKS5zbGljZSgwLCA3KSA9PT0gJ1N5bWJvbCgnKSB7XG4gICAgbmFtZSA9ICdbJyArIFN0cmluZyhuYW1lKS5yZXBsYWNlKC9eU3ltYm9sXFwoKFteKV0qKVxcKS8sICckMScpICsgJ10nO1xuICB9XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZ2V0dGVyKSBuYW1lID0gJ2dldCAnICsgbmFtZTtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zZXR0ZXIpIG5hbWUgPSAnc2V0ICcgKyBuYW1lO1xuICBpZiAoIWhhc093bih2YWx1ZSwgJ25hbWUnKSB8fCAoQ09ORklHVVJBQkxFX0ZVTkNUSU9OX05BTUUgJiYgdmFsdWUubmFtZSAhPT0gbmFtZSkpIHtcbiAgICBpZiAoREVTQ1JJUFRPUlMpIGRlZmluZVByb3BlcnR5KHZhbHVlLCAnbmFtZScsIHsgdmFsdWU6IG5hbWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbiAgICBlbHNlIHZhbHVlLm5hbWUgPSBuYW1lO1xuICB9XG4gIGlmIChDT05GSUdVUkFCTEVfTEVOR1RIICYmIG9wdGlvbnMgJiYgaGFzT3duKG9wdGlvbnMsICdhcml0eScpICYmIHZhbHVlLmxlbmd0aCAhPT0gb3B0aW9ucy5hcml0eSkge1xuICAgIGRlZmluZVByb3BlcnR5KHZhbHVlLCAnbGVuZ3RoJywgeyB2YWx1ZTogb3B0aW9ucy5hcml0eSB9KTtcbiAgfVxuICB0cnkge1xuICAgIGlmIChvcHRpb25zICYmIGhhc093bihvcHRpb25zLCAnY29uc3RydWN0b3InKSAmJiBvcHRpb25zLmNvbnN0cnVjdG9yKSB7XG4gICAgICBpZiAoREVTQ1JJUFRPUlMpIGRlZmluZVByb3BlcnR5KHZhbHVlLCAncHJvdG90eXBlJywgeyB3cml0YWJsZTogZmFsc2UgfSk7XG4gICAgLy8gaW4gVjggfiBDaHJvbWUgNTMsIHByb3RvdHlwZXMgb2Ygc29tZSBtZXRob2RzLCBsaWtlIGBBcnJheS5wcm90b3R5cGUudmFsdWVzYCwgYXJlIG5vbi13cml0YWJsZVxuICAgIH0gZWxzZSBpZiAodmFsdWUucHJvdG90eXBlKSB2YWx1ZS5wcm90b3R5cGUgPSB1bmRlZmluZWQ7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgdmFyIHN0YXRlID0gZW5mb3JjZUludGVybmFsU3RhdGUodmFsdWUpO1xuICBpZiAoIWhhc093bihzdGF0ZSwgJ3NvdXJjZScpKSB7XG4gICAgc3RhdGUuc291cmNlID0gVEVNUExBVEUuam9pbih0eXBlb2YgbmFtZSA9PSAnc3RyaW5nJyA/IG5hbWUgOiAnJyk7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcblxuLy8gYWRkIGZha2UgRnVuY3Rpb24jdG9TdHJpbmcgZm9yIGNvcnJlY3Qgd29yayB3cmFwcGVkIG1ldGhvZHMgLyBjb25zdHJ1Y3RvcnMgd2l0aCBtZXRob2RzIGxpa2UgTG9EYXNoIGlzTmF0aXZlXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0ZW5kLW5hdGl2ZSAtLSByZXF1aXJlZFxuRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gbWFrZUJ1aWx0SW4oZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiBpc0NhbGxhYmxlKHRoaXMpICYmIGdldEludGVybmFsU3RhdGUodGhpcykuc291cmNlIHx8IGluc3BlY3RTb3VyY2UodGhpcyk7XG59LCAndG9TdHJpbmcnKTtcbiIsInZhciBjZWlsID0gTWF0aC5jZWlsO1xudmFyIGZsb29yID0gTWF0aC5mbG9vcjtcblxuLy8gYE1hdGgudHJ1bmNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1tYXRoLnRydW5jXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1tYXRoLXRydW5jIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gTWF0aC50cnVuYyB8fCBmdW5jdGlvbiB0cnVuYyh4KSB7XG4gIHZhciBuID0gK3g7XG4gIHJldHVybiAobiA+IDAgPyBmbG9vciA6IGNlaWwpKG4pO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG52YXIgVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdjgtcHJvdG90eXBlLWRlZmluZS1idWcnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciB0b1Byb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleScpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG52YXIgJGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG52YXIgRU5VTUVSQUJMRSA9ICdlbnVtZXJhYmxlJztcbnZhciBDT05GSUdVUkFCTEUgPSAnY29uZmlndXJhYmxlJztcbnZhciBXUklUQUJMRSA9ICd3cml0YWJsZSc7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZGVmaW5lcHJvcGVydHlcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gVjhfUFJPVE9UWVBFX0RFRklORV9CVUcgPyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmICh0eXBlb2YgTyA9PT0gJ2Z1bmN0aW9uJyAmJiBQID09PSAncHJvdG90eXBlJyAmJiAndmFsdWUnIGluIEF0dHJpYnV0ZXMgJiYgV1JJVEFCTEUgaW4gQXR0cmlidXRlcyAmJiAhQXR0cmlidXRlc1tXUklUQUJMRV0pIHtcbiAgICB2YXIgY3VycmVudCA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gICAgaWYgKGN1cnJlbnQgJiYgY3VycmVudFtXUklUQUJMRV0pIHtcbiAgICAgIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICAgICAgQXR0cmlidXRlcyA9IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBDT05GSUdVUkFCTEUgaW4gQXR0cmlidXRlcyA/IEF0dHJpYnV0ZXNbQ09ORklHVVJBQkxFXSA6IGN1cnJlbnRbQ09ORklHVVJBQkxFXSxcbiAgICAgICAgZW51bWVyYWJsZTogRU5VTUVSQUJMRSBpbiBBdHRyaWJ1dGVzID8gQXR0cmlidXRlc1tFTlVNRVJBQkxFXSA6IGN1cnJlbnRbRU5VTUVSQUJMRV0sXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZVxuICAgICAgfTtcbiAgICB9XG4gIH0gcmV0dXJuICRkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbn0gOiAkZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gJGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmICgnZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpIHRocm93ICRUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5Jyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yXG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9Qcm9wZXJ0eUtleShQKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXNPd24oTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIWNhbGwocHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUuZiwgTywgUCksIE9bUF0pO1xufTtcbiIsInZhciBpbnRlcm5hbE9iamVjdEtleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG5cbnZhciBoaWRkZW5LZXlzID0gZW51bUJ1Z0tleXMuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHluYW1lcyAtLSBzYWZlXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlzeW1ib2xzIC0tIHNhZmVcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gdW5jdXJyeVRoaXMoe30uaXNQcm90b3R5cGVPZik7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbnZhciBwdXNoID0gdW5jdXJyeVRoaXMoW10ucHVzaCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgbmFtZXMpIHtcbiAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3Qob2JqZWN0KTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHZhciBrZXk7XG4gIGZvciAoa2V5IGluIE8pICFoYXNPd24oaGlkZGVuS2V5cywga2V5KSAmJiBoYXNPd24oTywga2V5KSAmJiBwdXNoKHJlc3VsdCwga2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhc093bihPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5pbmRleE9mKHJlc3VsdCwga2V5KSB8fCBwdXNoKHJlc3VsdCwga2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIE5hc2hvcm4gfiBKREs4IGJ1Z1xudmFyIE5BU0hPUk5fQlVHID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmICEkcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh7IDE6IDIgfSwgMSk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eWlzZW51bWVyYWJsZVxuZXhwb3J0cy5mID0gTkFTSE9STl9CVUcgPyBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShWKSB7XG4gIHZhciBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRoaXMsIFYpO1xuICByZXR1cm4gISFkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZTtcbn0gOiAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCJ2YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYE9yZGluYXJ5VG9QcmltaXRpdmVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vcmRpbmFyeXRvcHJpbWl0aXZlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCwgcHJlZikge1xuICB2YXIgZm4sIHZhbDtcbiAgaWYgKHByZWYgPT09ICdzdHJpbmcnICYmIGlzQ2FsbGFibGUoZm4gPSBpbnB1dC50b1N0cmluZykgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmIChpc0NhbGxhYmxlKGZuID0gaW5wdXQudmFsdWVPZikgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmIChwcmVmICE9PSAnc3RyaW5nJyAmJiBpc0NhbGxhYmxlKGZuID0gaW5wdXQudG9TdHJpbmcpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICB0aHJvdyAkVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG52YXIgY29uY2F0ID0gdW5jdXJyeVRoaXMoW10uY29uY2F0KTtcblxuLy8gYWxsIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBub24tZW51bWVyYWJsZSBhbmQgc3ltYm9sc1xubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdSZWZsZWN0JywgJ293bktleXMnKSB8fCBmdW5jdGlvbiBvd25LZXlzKGl0KSB7XG4gIHZhciBrZXlzID0gZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZS5mKGFuT2JqZWN0KGl0KSk7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUuZjtcbiAgcmV0dXJuIGdldE93blByb3BlcnR5U3ltYm9scyA/IGNvbmNhdChrZXlzLCBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpKSA6IGtleXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1yZWdleHAucHJvdG90eXBlLmZsYWdzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRoYXQgPSBhbk9iamVjdCh0aGlzKTtcbiAgdmFyIHJlc3VsdCA9ICcnO1xuICBpZiAodGhhdC5oYXNJbmRpY2VzKSByZXN1bHQgKz0gJ2QnO1xuICBpZiAodGhhdC5nbG9iYWwpIHJlc3VsdCArPSAnZyc7XG4gIGlmICh0aGF0Lmlnbm9yZUNhc2UpIHJlc3VsdCArPSAnaSc7XG4gIGlmICh0aGF0Lm11bHRpbGluZSkgcmVzdWx0ICs9ICdtJztcbiAgaWYgKHRoYXQuZG90QWxsKSByZXN1bHQgKz0gJ3MnO1xuICBpZiAodGhhdC51bmljb2RlKSByZXN1bHQgKz0gJ3UnO1xuICBpZiAodGhhdC51bmljb2RlU2V0cykgcmVzdWx0ICs9ICd2JztcbiAgaWYgKHRoYXQuc3RpY2t5KSByZXN1bHQgKz0gJ3knO1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYFJlcXVpcmVPYmplY3RDb2VyY2libGVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1yZXF1aXJlb2JqZWN0Y29lcmNpYmxlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoaXQpKSB0aHJvdyAkVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcblxudmFyIGtleXMgPSBzaGFyZWQoJ2tleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiBrZXlzW2tleV0gfHwgKGtleXNba2V5XSA9IHVpZChrZXkpKTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcblxudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgZGVmaW5lR2xvYmFsUHJvcGVydHkoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJ2YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiAnMy4yNS4wJyxcbiAgbW9kZTogSVNfUFVSRSA/ICdwdXJlJyA6ICdnbG9iYWwnLFxuICBjb3B5cmlnaHQ6ICfCqSAyMDE0LTIwMjIgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknLFxuICBsaWNlbnNlOiAnaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvYmxvYi92My4yNS4wL0xJQ0VOU0UnLFxuICBzb3VyY2U6ICdodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcydcbn0pO1xuIiwiLyogZXNsaW50LWRpc2FibGUgZXMteC9uby1zeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5c3ltYm9scyAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xubW9kdWxlLmV4cG9ydHMgPSAhIU9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN5bWJvbCA9IFN5bWJvbCgpO1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBgZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzYCBwb2x5ZmlsbCBzeW1ib2xzIGNvbnZlcnRlZCB0byBvYmplY3QgYXJlIG5vdCBTeW1ib2wgaW5zdGFuY2VzXG4gIHJldHVybiAhU3RyaW5nKHN5bWJvbCkgfHwgIShPYmplY3Qoc3ltYm9sKSBpbnN0YW5jZW9mIFN5bWJvbCkgfHxcbiAgICAvLyBDaHJvbWUgMzgtNDAgc3ltYm9scyBhcmUgbm90IGluaGVyaXRlZCBmcm9tIERPTSBjb2xsZWN0aW9ucyBwcm90b3R5cGVzIHRvIGluc3RhbmNlc1xuICAgICFTeW1ib2wuc2hhbSAmJiBWOF9WRVJTSU9OICYmIFY4X1ZFUlNJT04gPCA0MTtcbn0pO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBhcHBseSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1hcHBseScpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0Jyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2h0bWwnKTtcbnZhciBhcnJheVNsaWNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNsaWNlJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3ZhbGlkYXRlLWFyZ3VtZW50cy1sZW5ndGgnKTtcbnZhciBJU19JT1MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLWlvcycpO1xudmFyIElTX05PREUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUnKTtcblxudmFyIHNldCA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXIgPSBnbG9iYWwuY2xlYXJJbW1lZGlhdGU7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIEZ1bmN0aW9uID0gZ2xvYmFsLkZ1bmN0aW9uO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIFN0cmluZyA9IGdsb2JhbC5TdHJpbmc7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBsb2NhdGlvbiwgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG5cbnRyeSB7XG4gIC8vIERlbm8gdGhyb3dzIGEgUmVmZXJlbmNlRXJyb3Igb24gYGxvY2F0aW9uYCBhY2Nlc3Mgd2l0aG91dCBgLS1sb2NhdGlvbmAgZmxhZ1xuICBsb2NhdGlvbiA9IGdsb2JhbC5sb2NhdGlvbjtcbn0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cblxudmFyIHJ1biA9IGZ1bmN0aW9uIChpZCkge1xuICBpZiAoaGFzT3duKHF1ZXVlLCBpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xuXG52YXIgcnVubmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcnVuKGlkKTtcbiAgfTtcbn07XG5cbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4oZXZlbnQuZGF0YSk7XG59O1xuXG52YXIgcG9zdCA9IGZ1bmN0aW9uIChpZCkge1xuICAvLyBvbGQgZW5naW5lcyBoYXZlIG5vdCBsb2NhdGlvbi5vcmlnaW5cbiAgZ2xvYmFsLnBvc3RNZXNzYWdlKFN0cmluZyhpZCksIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QpO1xufTtcblxuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXQgfHwgIWNsZWFyKSB7XG4gIHNldCA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShoYW5kbGVyKSB7XG4gICAgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGgoYXJndW1lbnRzLmxlbmd0aCwgMSk7XG4gICAgdmFyIGZuID0gaXNDYWxsYWJsZShoYW5kbGVyKSA/IGhhbmRsZXIgOiBGdW5jdGlvbihoYW5kbGVyKTtcbiAgICB2YXIgYXJncyA9IGFycmF5U2xpY2UoYXJndW1lbnRzLCAxKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgYXBwbHkoZm4sIHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfTtcbiAgICBkZWZlcihjb3VudGVyKTtcbiAgICByZXR1cm4gY291bnRlcjtcbiAgfTtcbiAgY2xlYXIgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAoSVNfTk9ERSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKHJ1bm5lcihpZCkpO1xuICAgIH07XG4gIC8vIFNwaGVyZSAoSlMgZ2FtZSBlbmdpbmUpIERpc3BhdGNoIEFQSVxuICB9IGVsc2UgaWYgKERpc3BhdGNoICYmIERpc3BhdGNoLm5vdykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBEaXNwYXRjaC5ub3cocnVubmVyKGlkKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICAvLyBleGNlcHQgaU9TIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzYyNFxuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsICYmICFJU19JT1MpIHtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgcG9ydCA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGJpbmQocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKFxuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmXG4gICAgaXNDYWxsYWJsZShnbG9iYWwucG9zdE1lc3NhZ2UpICYmXG4gICAgIWdsb2JhbC5pbXBvcnRTY3JpcHRzICYmXG4gICAgbG9jYXRpb24gJiYgbG9jYXRpb24ucHJvdG9jb2wgIT09ICdmaWxlOicgJiZcbiAgICAhZmFpbHMocG9zdClcbiAgKSB7XG4gICAgZGVmZXIgPSBwb3N0O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjcmVhdGVFbGVtZW50KCdzY3JpcHQnKSkge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBodG1sLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpKVtPTlJFQURZU1RBVEVDSEFOR0VdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICBydW4oaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KHJ1bm5lcihpZCksIDApO1xuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0LFxuICBjbGVhcjogY2xlYXJcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyT3JJbmZpbml0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5Jyk7XG5cbnZhciBtYXggPSBNYXRoLm1heDtcbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gSGVscGVyIGZvciBhIHBvcHVsYXIgcmVwZWF0aW5nIGNhc2Ugb2YgdGhlIHNwZWM6XG4vLyBMZXQgaW50ZWdlciBiZSA/IFRvSW50ZWdlcihpbmRleCkuXG4vLyBJZiBpbnRlZ2VyIDwgMCwgbGV0IHJlc3VsdCBiZSBtYXgoKGxlbmd0aCArIGludGVnZXIpLCAwKTsgZWxzZSBsZXQgcmVzdWx0IGJlIG1pbihpbnRlZ2VyLCBsZW5ndGgpLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5kZXgsIGxlbmd0aCkge1xuICB2YXIgaW50ZWdlciA9IHRvSW50ZWdlck9ySW5maW5pdHkoaW5kZXgpO1xuICByZXR1cm4gaW50ZWdlciA8IDAgPyBtYXgoaW50ZWdlciArIGxlbmd0aCwgMCkgOiBtaW4oaW50ZWdlciwgbGVuZ3RoKTtcbn07XG4iLCIvLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwidmFyIHRydW5jID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21hdGgtdHJ1bmMnKTtcblxuLy8gYFRvSW50ZWdlck9ySW5maW5pdHlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2ludGVnZXJvcmluZmluaXR5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIgbnVtYmVyID0gK2FyZ3VtZW50O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlIC0tIE5hTiBjaGVja1xuICByZXR1cm4gbnVtYmVyICE9PSBudW1iZXIgfHwgbnVtYmVyID09PSAwID8gMCA6IHRydW5jKG51bWJlcik7XG59O1xuIiwidmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBUb0xlbmd0aGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgPiAwID8gbWluKHRvSW50ZWdlck9ySW5maW5pdHkoYXJndW1lbnQpLCAweDFGRkZGRkZGRkZGRkZGKSA6IDA7IC8vIDIgKiogNTMgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCJ2YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG5cbi8vIGBUb09iamVjdGAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvb2JqZWN0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gJE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KSk7XG59O1xuIiwidmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXN5bWJvbCcpO1xudmFyIGdldE1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtbWV0aG9kJyk7XG52YXIgb3JkaW5hcnlUb1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vcmRpbmFyeS10by1wcmltaXRpdmUnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG52YXIgVE9fUFJJTUlUSVZFID0gd2VsbEtub3duU3ltYm9sKCd0b1ByaW1pdGl2ZScpO1xuXG4vLyBgVG9QcmltaXRpdmVgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b3ByaW1pdGl2ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIHByZWYpIHtcbiAgaWYgKCFpc09iamVjdChpbnB1dCkgfHwgaXNTeW1ib2woaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBleG90aWNUb1ByaW0gPSBnZXRNZXRob2QoaW5wdXQsIFRPX1BSSU1JVElWRSk7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChleG90aWNUb1ByaW0pIHtcbiAgICBpZiAocHJlZiA9PT0gdW5kZWZpbmVkKSBwcmVmID0gJ2RlZmF1bHQnO1xuICAgIHJlc3VsdCA9IGNhbGwoZXhvdGljVG9QcmltLCBpbnB1dCwgcHJlZik7XG4gICAgaWYgKCFpc09iamVjdChyZXN1bHQpIHx8IGlzU3ltYm9sKHJlc3VsdCkpIHJldHVybiByZXN1bHQ7XG4gICAgdGhyb3cgJFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbiAgfVxuICBpZiAocHJlZiA9PT0gdW5kZWZpbmVkKSBwcmVmID0gJ251bWJlcic7XG4gIHJldHVybiBvcmRpbmFyeVRvUHJpbWl0aXZlKGlucHV0LCBwcmVmKTtcbn07XG4iLCJ2YXIgdG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlJyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtc3ltYm9sJyk7XG5cbi8vIGBUb1Byb3BlcnR5S2V5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcm9wZXJ0eWtleVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIGtleSA9IHRvUHJpbWl0aXZlKGFyZ3VtZW50LCAnc3RyaW5nJyk7XG4gIHJldHVybiBpc1N5bWJvbChrZXkpID8ga2V5IDoga2V5ICsgJyc7XG59O1xuIiwidmFyICRTdHJpbmcgPSBTdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICRTdHJpbmcoYXJndW1lbnQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiAnT2JqZWN0JztcbiAgfVxufTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxudmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcbnZhciB0b1N0cmluZyA9IHVuY3VycnlUaGlzKDEuMC50b1N0cmluZyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gJ1N5bWJvbCgnICsgKGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXkpICsgJylfJyArIHRvU3RyaW5nKCsraWQgKyBwb3N0Zml4LCAzNik7XG59O1xuIiwiLyogZXNsaW50LWRpc2FibGUgZXMteC9uby1zeW1ib2wgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmcgKi9cbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBOQVRJVkVfU1lNQk9MXG4gICYmICFTeW1ib2wuc2hhbVxuICAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gVjggfiBDaHJvbWUgMzYtXG4vLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMzM0XG5tb2R1bGUuZXhwb3J0cyA9IERFU0NSSVBUT1JTICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCAncHJvdG90eXBlJywge1xuICAgIHZhbHVlOiA0MixcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSkucHJvdG90eXBlICE9IDQyO1xufSk7XG4iLCJ2YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocGFzc2VkLCByZXF1aXJlZCkge1xuICBpZiAocGFzc2VkIDwgcmVxdWlyZWQpIHRocm93ICRUeXBlRXJyb3IoJ05vdCBlbm91Z2ggYXJndW1lbnRzJyk7XG4gIHJldHVybiBwYXNzZWQ7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNDYWxsYWJsZShXZWFrTWFwKSAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoU3RyaW5nKFdlYWtNYXApKTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2hhcmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZCcpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3ltYm9sLWNvbnN0cnVjdG9yLWRldGVjdGlvbicpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciBXZWxsS25vd25TeW1ib2xzU3RvcmUgPSBzaGFyZWQoJ3drcycpO1xudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgc3ltYm9sRm9yID0gU3ltYm9sICYmIFN5bWJvbFsnZm9yJ107XG52YXIgY3JlYXRlV2VsbEtub3duU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBTeW1ib2wgOiBTeW1ib2wgJiYgU3ltYm9sLndpdGhvdXRTZXR0ZXIgfHwgdWlkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGlmICghaGFzT3duKFdlbGxLbm93blN5bWJvbHNTdG9yZSwgbmFtZSkgfHwgIShOQVRJVkVfU1lNQk9MIHx8IHR5cGVvZiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPT0gJ3N0cmluZycpKSB7XG4gICAgdmFyIGRlc2NyaXB0aW9uID0gJ1N5bWJvbC4nICsgbmFtZTtcbiAgICBpZiAoTkFUSVZFX1NZTUJPTCAmJiBoYXNPd24oU3ltYm9sLCBuYW1lKSkge1xuICAgICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gU3ltYm9sW25hbWVdO1xuICAgIH0gZWxzZSBpZiAoVVNFX1NZTUJPTF9BU19VSUQgJiYgc3ltYm9sRm9yKSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBzeW1ib2xGb3IoZGVzY3JpcHRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBjcmVhdGVXZWxsS25vd25TeW1ib2woZGVzY3JpcHRpb24pO1xuICAgIH1cbiAgfSByZXR1cm4gV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVCdWlsdEluQWNjZXNzb3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLWFjY2Vzc29yJyk7XG52YXIgcmVnRXhwRmxhZ3MgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gYmFiZWwtbWluaWZ5IGFuZCBDbG9zdXJlIENvbXBpbGVyIHRyYW5zcGlsZXMgUmVnRXhwKCcuJywgJ2QnKSAtPiAvLi9kIGFuZCBpdCBjYXVzZXMgU3ludGF4RXJyb3JcbnZhciBSZWdFeHAgPSBnbG9iYWwuUmVnRXhwO1xudmFyIFJlZ0V4cFByb3RvdHlwZSA9IFJlZ0V4cC5wcm90b3R5cGU7XG5cbnZhciBGT1JDRUQgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBJTkRJQ0VTX1NVUFBPUlQgPSB0cnVlO1xuICB0cnkge1xuICAgIFJlZ0V4cCgnLicsICdkJyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgSU5ESUNFU19TVVBQT1JUID0gZmFsc2U7XG4gIH1cblxuICB2YXIgTyA9IHt9O1xuICAvLyBtb2Rlcm4gVjggYnVnXG4gIHZhciBjYWxscyA9ICcnO1xuICB2YXIgZXhwZWN0ZWQgPSBJTkRJQ0VTX1NVUFBPUlQgPyAnZGdpbXN5JyA6ICdnaW1zeSc7XG5cbiAgdmFyIGFkZEdldHRlciA9IGZ1bmN0aW9uIChrZXksIGNocikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSBzYWZlXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIGtleSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbGxzICs9IGNocjtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gfSk7XG4gIH07XG5cbiAgdmFyIHBhaXJzID0ge1xuICAgIGRvdEFsbDogJ3MnLFxuICAgIGdsb2JhbDogJ2cnLFxuICAgIGlnbm9yZUNhc2U6ICdpJyxcbiAgICBtdWx0aWxpbmU6ICdtJyxcbiAgICBzdGlja3k6ICd5J1xuICB9O1xuXG4gIGlmIChJTkRJQ0VTX1NVUFBPUlQpIHBhaXJzLmhhc0luZGljZXMgPSAnZCc7XG5cbiAgZm9yICh2YXIga2V5IGluIHBhaXJzKSBhZGRHZXR0ZXIoa2V5LCBwYWlyc1trZXldKTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbiAgdmFyIHJlc3VsdCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoUmVnRXhwUHJvdG90eXBlLCAnZmxhZ3MnKS5nZXQuY2FsbChPKTtcblxuICByZXR1cm4gcmVzdWx0ICE9PSBleHBlY3RlZCB8fCBjYWxscyAhPT0gZXhwZWN0ZWQ7XG59KTtcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NgIGdldHRlclxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xuaWYgKEZPUkNFRCkgZGVmaW5lQnVpbHRJbkFjY2Vzc29yKFJlZ0V4cFByb3RvdHlwZSwgJ2ZsYWdzJywge1xuICBjb25maWd1cmFibGU6IHRydWUsXG4gIGdldDogcmVnRXhwRmxhZ3Ncbn0pO1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNsZWFySW1tZWRpYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Rhc2snKS5jbGVhcjtcblxuLy8gYGNsZWFySW1tZWRpYXRlYCBtZXRob2Rcbi8vIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3NldEltbWVkaWF0ZS8jc2ktY2xlYXJJbW1lZGlhdGVcbiQoeyBnbG9iYWw6IHRydWUsIGJpbmQ6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIGZvcmNlZDogZ2xvYmFsLmNsZWFySW1tZWRpYXRlICE9PSBjbGVhckltbWVkaWF0ZSB9LCB7XG4gIGNsZWFySW1tZWRpYXRlOiBjbGVhckltbWVkaWF0ZVxufSk7XG4iLCIvLyBUT0RPOiBSZW1vdmUgdGhpcyBtb2R1bGUgZnJvbSBgY29yZS1qc0A0YCBzaW5jZSBpdCdzIHNwbGl0IHRvIG1vZHVsZXMgbGlzdGVkIGJlbG93XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5jbGVhci1pbW1lZGlhdGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLnNldC1pbW1lZGlhdGUnKTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRJbW1lZGlhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdGFzaycpLnNldDtcblxuLy8gYHNldEltbWVkaWF0ZWAgbWV0aG9kXG4vLyBodHRwOi8vdzNjLmdpdGh1Yi5pby9zZXRJbW1lZGlhdGUvI3NpLXNldEltbWVkaWF0ZVxuJCh7IGdsb2JhbDogdHJ1ZSwgYmluZDogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgZm9yY2VkOiBnbG9iYWwuc2V0SW1tZWRpYXRlICE9PSBzZXRJbW1lZGlhdGUgfSwge1xuICBzZXRJbW1lZGlhdGU6IHNldEltbWVkaWF0ZVxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJpbXBvcnQgeyBwaG90b2dyYXBoZXJGYWN0b3J5IH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9waG90b2dyYXBoZXJGYWN0b3J5XCI7XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlEYXRhKHBob3RvZ3JhcGhlcnMsIGlkKSB7XHJcbiAgICBsZXQgcGhvdG9ncmFwaGVyU2VsZWN0ZWQgPSBcIlwiO1xyXG4gICAgXHJcbiAgICBwaG90b2dyYXBoZXJzLmZvckVhY2goKHBob3RvZ3JhcGhlcikgPT4ge1xyXG5cclxuICAgICAgICBpZiAocGhvdG9ncmFwaGVyLmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZW4gd2UgYXJlIGdvaW5nIHVzZSB0aGUgUGhvdG9ncmFwaGVyRmFjdG9yeSB0byBzZXQgRE9NXHJcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JykgeyBjb25zb2xlLmxvZyhwaG90b2dyYXBoZXIpOyB9XHJcbiAgICAgICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlck1vZGVsID0gcGhvdG9ncmFwaGVyRmFjdG9yeShwaG90b2dyYXBoZXIpO1xyXG4gICAgICAgICAgICBwaG90b2dyYXBoZXJNb2RlbC5zZXRQaG90b2dyYXBoZXJIZWFkZXIoKTtcclxuICAgICAgICAgICAgcGhvdG9ncmFwaGVyTW9kZWwuc2V0U3RpY2t5QmFyUHJpY2UoKTtcclxuXHJcbiAgICAgICAgICAgIHBob3RvZ3JhcGhlclNlbGVjdGVkID0gcGhvdG9ncmFwaGVyXHJcbiAgICAgICAgICAgIC8vIEVuZCBvZiBQaG90b2dyYXBoZXJGYWN0b3J5IFdvcmtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH0pO1xyXG5cclxuICAgIFxyXG4gICAgcmV0dXJuIChwaG90b2dyYXBoZXJTZWxlY3RlZCk7IC8vIFJldHVybiB0aGUgcGhvdG9ncmFwaGVyU2hvdyBhdCB0aGUgZW5kXHJcblxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzcGxheURhdGFBbGwocGhvdG9ncmFwaGVycywgcXVlcnlTZWxlY3Rvcikge1xyXG5cclxuICAgIHBob3RvZ3JhcGhlcnMuZm9yRWFjaCgocGhvdG9ncmFwaGVyKSA9PiB7XHJcblxyXG4gICAgICAgIC8vIFRoZW4gd2UgYXJlIGdvaW5nIHVzZSB0aGUgUGhvdG9ncmFwaGVyRmFjdG9yeSB0byBnZW5lcmF0ZSBET01cclxuICAgICAgICBjb25zdCBwaG90b2dyYXBoZXJzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnlTZWxlY3Rvcik7XHJcbiAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVyTW9kZWwgPSBwaG90b2dyYXBoZXJGYWN0b3J5KHBob3RvZ3JhcGhlcik7XHJcbiAgICAgICAgY29uc3QgdXNlckNhcmRET00gPSBwaG90b2dyYXBoZXJNb2RlbC5nZXRVc2VyQ2FyZERPTSgpO1xyXG5cclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHsgY29uc29sZS5sb2cocGhvdG9ncmFwaGVyKTsgfVxyXG4gICAgICAgIGlmICh1c2VyQ2FyZERPTSkge1xyXG4gICAgICAgICAgICBwaG90b2dyYXBoZXJzU2VjdGlvbi5hcHBlbmRDaGlsZCh1c2VyQ2FyZERPTSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEVuZCBvZiBQaG90b2dyYXBoZXJGYWN0b3J5IFdvcmtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBtZWRpYUZhY3RvcnkgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL21lZGlhRmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBzZXRJbm5lckh0bWwgfSBmcm9tIFwiLi4vdXRpbHMvZG9tXCI7XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlNZWRpYShtZWRpYXMsIHF1ZXJ5U2VsZWN0b3IsIHBob3RvZ3JhcGhlcklkKSB7XHJcbiAgICBsZXQgdG90YWxMaWtlcyA9IDA7XHJcblxyXG4gICAgbWVkaWFzLmZvckVhY2goKG1lZGlhKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwaG90b2dyYXBoZXJJZCA9PSBtZWRpYS5waG90b2dyYXBoZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7IGNvbnNvbGUubG9nKG1lZGlhKTsgfVxyXG4gICAgICAgICAgICAvLyBUaGVuIHdlIGFyZSBnb2luZyB1c2UgdGhlIE1lZGlhRmFjdG9yeSB0byBnZW5lcmF0ZSBET01cclxuICAgICAgICAgICAgY29uc3QgbWVkaWFzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnlTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lZGlhTW9kZWwgPSBtZWRpYUZhY3RvcnkobWVkaWEpO1xyXG4gICAgICAgICAgICBjb25zdCBtZWRpYURPTSA9IG1lZGlhTW9kZWwuZ2V0TWVkaWFET00oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtZWRpYURPTSkge1xyXG4gICAgICAgICAgICAgICAgbWVkaWFzU2VjdGlvbi5hcHBlbmRDaGlsZChtZWRpYURPTSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRW5kIG9mIE1lZGlhRmFjdG9yeSBXb3JrXHJcblxyXG4gICAgICAgICAgICAvLyBJZiBtZWRpYSBvYmplY3QgZ290IExpa2VzIHByb3ByaWV0eSB0aGVuXHJcbiAgICAgICAgICAgIGlmIChtZWRpYS5saWtlcykge1xyXG4gICAgICAgICAgICAgICAgdG90YWxMaWtlcyArPSBtZWRpYS5saWtlczsgLy8gQ291bnQgYWxsIGxpa2VzXHJcbiAgICAgICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIudG90YWxfbGlrZXNcIiwgdG90YWxMaWtlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJUaGVyZXMgaXMgbm8gbGlrZSBhbmQgdG90YWxMaWtlcywgbG9vayBtZWRpYUZhY3RvcnkgcmV0dXJuZWQgYSBvYmplY3Qgd2l0aG91dCBsaWtlcyBwcm9wcmlldHlcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHsgY29uc29sZS5sb2coXCJUb3RhbCBMaWtlOiBcIiArIHRvdGFsTGlrZXMpOyB9XHJcbn1cclxuXHJcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tIFwiLi4vdXRpbHMvZG9tXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWVkaWFGYWN0b3J5KGRhdGEpIHtcclxuICAgIGNvbnN0IHsgaWQsIHBob3RvZ3JhcGhlcklkLCB0aXRsZSwgaW1hZ2UsIHZpZGVvLCBsaWtlcyB9ID0gZGF0YTtcclxuXHJcbiAgICBjb25zdCBtb3ZpZSA9IGBhc3NldHMvdmlkZW8vJHt2aWRlb31gO1xyXG4gICAgY29uc3QgcGljdHVyZSA9IGBhc3NldHMvaW1hZ2VzLyR7aW1hZ2V9YDtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRNZWRpYURPTSgpIHtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIERPTSBvbmx5IGlmIHdlIGdvdCBpZHMgYW5kIGEgUGljdHVyZSBvciBhIFZpZGVvXHJcbiAgICAgICAgY29uc3QgaGFzUGhvdG9ncmFwaGVyID0gaWQgJiYgcGhvdG9ncmFwaGVySWQ7XHJcbiAgICAgICAgY29uc3QgaGFzQ29udGVudCA9IGltYWdlIHx8IHZpZGVvXHJcblxyXG4gICAgICAgIGlmIChoYXNQaG90b2dyYXBoZXIgJiYgaGFzQ29udGVudCkge1xyXG4gICAgICAgICAgICAvLyBDUkVBVEUgQSBBUlRJQ0xFXHJcbiAgICAgICAgICAgIGNvbnN0IGFydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1lZGlhX2NhcmRcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBCdWlsZCBBIEhSRUYgRUxFTUVOVFxyXG4gICAgICAgICAgICBjb25zdCBsaW5rRWxlbWVudCA9IGFydGljbGUuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBkb20uYnVpbGRFbGVtZW50KFwiYVwiLCBgcGhvdG9ncmFwaGVyLmh0bWw/aWQ9JHtpZH1gKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBkb20uc2V0QXJpYWxMYWJlbChsaW5rRWxlbWVudCwgXCJMaWxhYyBicmVhc3RlZCByb2xsZXIsIGNsb3NldXAgdmlld1wiKSAvLyBTZXQgQXJpZWxMYWJlbCB0byBBSHJlZlxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGltYWdlIG9yIHZpZGVvIGV4aXN0c1xyXG4gICAgICAgICAgICBpZiAoaW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgIGRvbS5pbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudChsaW5rRWxlbWVudCwgcGljdHVyZSwgdGl0bGUpOyAvLyBJbnNlcnQgcGljdHVyZSB3aXRoIEFMVFxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2aWRlbykge1xyXG4gICAgICAgICAgICAgICAgZG9tLmluc2VydFZpZGVvSW5zaWRlRWxlbWVudChsaW5rRWxlbWVudCwgbW92aWUsIGBNb3ZpZSAke3ZpZGVvfWApOyAvLyBJbnNlcnQgVmlkZW8gd2l0aCBBcmllbCBMYWJlbFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSBEZXRhaWxzICh0aXRsZSArIExpa2VzKVxyXG4gICAgICAgICAgICBpZiAodGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aXRsZV9oNiA9IGA8aDY+JHt0aXRsZX08L2g2PmA7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGlrZXNfaDYgPSBgPGg2IGFyaWEtbGFiZWw9J2xpa2VzJz4wPC9oNj5gO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpa2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlrZXNfaDYgPSBgPGg2IGFyaWEtbGFiZWw9J2xpa2VzJz4ke2xpa2VzfTwvaDY+YDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRvbS5pbnNlcnRIVE1MQWZ0ZXJFbGVtZW50KGxpbmtFbGVtZW50LCBgPGRpdiBjbGFzcz0nZGV0YWlscyc+JHt0aXRsZV9oNn0ke2xpa2VzX2g2fTwvZGl2PmApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZXR1cm4gQXJ0aWNsZVxyXG4gICAgICAgICAgICByZXR1cm4gYXJ0aWNsZTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHBob3RvZ3JhcGhlcklkLCBwaWN0dXJlLCBtb3ZpZSwgZ2V0TWVkaWFET00gfTtcclxufVxyXG4iLCJcclxuaW1wb3J0IHsgYnVpbGRFbGVtZW50LCBpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudCwgc2V0SW5uZXJIdG1sLCBzZXRBcmlhbExhYmVsIH0gZnJvbSBcIi4uL3V0aWxzL2RvbVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBob3RvZ3JhcGhlckZhY3RvcnkoZGF0YSkge1xyXG4gICAgY29uc3QgeyBuYW1lLCBpZCwgY2l0eSwgY291bnRyeSwgdGFnbGluZSwgcG9ydHJhaXQsIHByaWNlIH0gPSBkYXRhO1xyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgY29uc3QgcGljdHVyZSA9IGBhc3NldHMvaW1hZ2VzLyR7cG9ydHJhaXR9YDtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRVc2VyQ2FyZERPTSgpIHtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIERPTSBvbmx5IGlmIHdlIGdvdCBhIHBpY3R1cmUgYSBpZCBhbmQgYSBuYW1lXHJcbiAgICAgICAgaWYgKG5hbWUgJiYgaWQgJiYgcG9ydHJhaXQpIHtcclxuICAgICAgICAgICAgLy8gQlVJTEQgQSBBUlRJQ0xFIFxyXG4gICAgICAgICAgICBjb25zdCBhcnRpY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIik7XHJcbiAgICAgICAgICAgIGFydGljbGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwaG90b2dyYXBoZXJfY2FyZFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBEeW5hbWlxdWUgTElOSyB3aXRoIFBpY3R1cmVcclxuICAgICAgICAgICAgY29uc3QgbGlua0VsZW1lbnQgPSBhcnRpY2xlLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgYnVpbGRFbGVtZW50KFwiYVwiLCBgcGhvdG9ncmFwaGVyLmh0bWw/aWQ9JHtpZH1gKSAvLyBCdWlsZCBBSHJlZlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBzZXRBcmlhbExhYmVsKGxpbmtFbGVtZW50LCBgTGluayB0byAke25hbWV9YCk7IC8vIFNldCBBcmllbExhYmVsIHRvIEFIcmVmXHJcbiAgICAgICAgICAgIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KGxpbmtFbGVtZW50LCBwaWN0dXJlLCBuYW1lKTtcclxuICAgICAgICAgICAgLy8gRU5EIENyZWF0ZSBEeW5hbWlxdWUgTElOSyB3aXRoIFBpY3R1cmVcclxuXHJcbiAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDJcIiwgbmFtZSkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNpdHkgJiYgY291bnRyeSkge1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoM1wiLCBgJHtjaXR5fSwgJHtjb3VudHJ5fWApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGFnbGluZSkge1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoNFwiLCB0YWdsaW5lKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLmFwcGVuZENoaWxkKGJ1aWxkRWxlbWVudChcImg1XCIsIGAke3ByaWNlfeKCrC9qb3VyYCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSRVRVUk4gQSBBUlRJQ0xFIFxyXG4gICAgICAgICAgICByZXR1cm4gYXJ0aWNsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UGhvdG9ncmFwaGVySGVhZGVyKCkge1xyXG4gICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoMVwiLCBuYW1lKTtcclxuICAgICAgICBpZiAoY2l0eSAmJiBjb3VudHJ5KSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoMlwiLCBgJHtjaXR5fSwgJHtjb3VudHJ5fWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGgyXCIsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDNcIiwgdGFnbGluZSk7XHJcblxyXG4gICAgICAgIC8qKiBXRSBVU0UgYSBkaWZmZXJlbnQgbWV0aG9kIHRoYXQgaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQoKSBzaW5jZSBwaWN0dXJlIGlzIGFscmVhZHkgaW4gdGhlIERPTSAqL1xyXG4gICAgICAgIGNvbnN0IGltZ1Byb2ZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGltZ1wiKTtcclxuICAgICAgICBpbWdQcm9maWxlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBwaWN0dXJlKTtcclxuICAgICAgICBpbWdQcm9maWxlLnNldEF0dHJpYnV0ZShcImFsdFwiLCBuYW1lKTtcclxuICAgICAgICAvKiogKi9cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRTdGlja3lCYXJQcmljZSgpIHtcclxuICAgICAgICBpZiAocHJpY2UpIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnByaWNlX3JhdGVfZGFpbHlcIiwgYCR7cHJpY2V9IOKCrCAvIGpvdXJgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5wcmljZV9yYXRlX2RhaWx5XCIsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyBuYW1lLCBwaWN0dXJlLCBnZXRVc2VyQ2FyZERPTSwgc2V0UGhvdG9ncmFwaGVySGVhZGVyLCBzZXRTdGlja3lCYXJQcmljZSB9O1xyXG59XHJcbiIsIi8vIEZ1bmN0aW9uIGZvciBidWlsZCBET01cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KGVsZW1lbnQsIHBpY3R1cmUsIGFsdCkge1xyXG4gICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgYDxpbWcgc3JjPVwiJHtwaWN0dXJlfVwiIGFsdD1cIiR7YWx0fVwiPmApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0VmlkZW9JbnNpZGVFbGVtZW50KGVsZW1lbnQsIHZpZGVvLCBhcmlhTGFiZWwpIHtcclxuXHJcbiAgICBpZiAoYXJpYUxhYmVsKSB7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgXHJcbiAgICAgICAgYDx2aWRlbyBzcmM9XCIke3ZpZGVvfVwiIGFyaWEtbGFiZWw9XCIke2FyaWFMYWJlbH1cIj5gKTtcclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCAnPHZpZGVvIHNyYz1cIicgKyB2aWRlbyArICdcIj4nKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0SFRNTEFmdGVyRWxlbWVudChlbGVtZW50LCBodG1sKSB7XHJcbiAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyZW5kXCIsIGh0bWwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRFbGVtZW50KGJhbGlzZSwgdmFsdWUpIHtcclxuICAgIC8vIENyZWF0ZSBiYWxpc2VcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGJhbGlzZSk7XHJcblxyXG4gICAgLy8gU2V0IEF0dHJpYnV0ZSBvciBUZXh0Q29udGVuZWQgZGVwZW5kIG9mIGJhbGlzZVxyXG4gICAgc3dpdGNoIChiYWxpc2UpIHtcclxuICAgICAgICBjYXNlIFwiYVwiOlxyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiaW1nXCI6XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QXJpYWxMYWJlbChlbGVtZW50LCBhcmlhbGFiZWwpIHtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBhcmlhbGFiZWwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SW5uZXJIdG1sKHF1ZXJ5U2VsZWN0b3IsIHRleHRlKSB7XHJcbiAgICBjb25zdCB0ZXh0ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5U2VsZWN0b3IpO1xyXG4gICAgdGV4dGVFbGVtZW50LmlubmVySFRNTCA9IHRleHRlO1xyXG59XHJcbi8vIEVuZCBGdW5jdGlvbiBmb3IgYnVpbGQgRE9NIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoSlNPTih1cmwsIHR5cGUpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTsgLy8gV2FpdCBmb3IgdGhlIEFzeW5jIEZlY3RoIEZ1bmN0aW9uXHJcblxyXG4gICAgLy8gZmV0Y2ggcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIHJlc3BvbnNlIHByb3BlcnR5IHdoaWNoIGlmIHNldCB0byBmYWxzZSBtZWFucyB0aGF0IHRoZSBjb25uZWN0aW9uIGlzIG5vdCBnb29kIGFuZCBzbyB3ZSBzdG9wIHRoZSBmdW5jdGlvbiBcclxuICAgIGlmICghcmVzcG9uc2Uub2spIHsgdGhyb3cgbmV3IEVycm9yKFwiVGhyb3duIGZyb20gZmV0Y2hKU09OKClcIik7IH1cclxuXHJcbiAgICBsZXQganNvblJlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpOyAvLyBwYXJzaW5nIEpTT05cclxuICAgIHJldHVybiBqc29uUmVzcG9uc2VbdHlwZV07IC8vIEdldCBkYXRhIGZyb20gdGhlIEFycmF5IHRoYXQgd2Ugd2FudFxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQaG90b2dyYXBoZXJzKCkge1xyXG4gICAgY29uc3QgdXJsID0gXCIuLi9kYXRhL3Bob3RvZ3JhcGhlcnMuanNvblwiOyAvLyBEYXRhIHNvdXJjZSAuSlNPTlxyXG4gICAgY29uc3QgcGhvdG9ncmFwaGVycyA9IGF3YWl0IGZldGNoSlNPTih1cmwsIFwicGhvdG9ncmFwaGVyc1wiKTsgLy8gdXNlIGZldGNoSlNPTiBmdW5jdGlvbiBmcm9tIHV0aWxzL2ZldGNoLmpzXHJcbiAgICByZXR1cm4gcGhvdG9ncmFwaGVyczsgLy8gUmV0dXJuIGRhdGEgb2YgUGhvdG9HcmFwaGVyc1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TWVkaWFzKCkge1xyXG4gICAgY29uc3QgdXJsID0gXCIuLi9kYXRhL3Bob3RvZ3JhcGhlcnMuanNvblwiOyAvLyBEYXRhIHNvdXJjZSAuSlNPTlxyXG4gICAgY29uc3QgbWVkaWFzID0gYXdhaXQgZmV0Y2hKU09OKHVybCwgXCJtZWRpYVwiKTsgLy8gdXNlIGZldGNoSlNPTiBmdW5jdGlvbiBmcm9tIHV0aWxzL2ZldGNoLmpzXHJcbiAgICByZXR1cm4gbWVkaWFzOyAvLyBSZXR1cm4gZGF0YSBvZiBNZWRpYVxyXG59XHJcbiIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVcmxQYXJhbWV0ZXIocGFyYW1ldGVyKSB7XHJcbiAgICBjb25zdCBmdWxsVXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7IC8vIEdldCBmdWxsIHVybFxyXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChmdWxsVXJsKTsgLy8gQ3JlYXRlIFVSTCBPYmplY3RcclxuICAgIGNvbnN0IHBhcmFtZXRlclZhbHVlID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQocGFyYW1ldGVyKTsgLy8gZ2V0IHBhcmFtZXRlciB2YWx1ZVxyXG4gICAgcmV0dXJuIHBhcmFtZXRlclZhbHVlO1xyXG59IiwiaW1wb3J0IHsgc2V0SW5uZXJIdG1sIH0gZnJvbSAnLi9kb20nO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1vZGFsTWFzdGVyKGJvZHlUYWcsIGhlYWRlclRhZywgbWFpblRhZywgbW9kYWxJRCkge1xyXG5cclxuXHJcbiAgICAvKiogQ1JFQVRFIFRXTyBPQkpFQ1QgV0lUSCBBTEwgUFJPUFJJRVRZIEZPUiBNT0RFTE1BU1RFUiBORUVEICovXHJcbiAgICBsZXQgYmFja2dyb3VuZFBhZ2UgPSB7XHJcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgYmFja2dyb3VuZCBvYmplY3QgKGJlaGluZCBtb2RhbClcclxuICAgICAgICBib2R5SFRNTDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihib2R5VGFnKSwgLy8gV2Ugd2FudCB0aGUgPGJvZHk+IHNlbGVjdGVkXHJcbiAgICAgICAgaGVhZGVySFRNTDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXJUYWcpLCAvLyBXZSB3YW50IHRoZSA8aGVhZGVyPiBzZWxlY3RlZFxyXG4gICAgICAgIG1haW5IVE1MOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5UYWcpLCAvLyBXZSB3YW50IHRoZSA8bWFpbj4gc2VsZWN0ZWRcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbW9kYWxQYWdlID0ge1xyXG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIG1vZGFsIE9iamVjdCAoY2FsbCBNb2RhbFBhZ2UpXHJcbiAgICAgICAgbW9kYWxIVE1MOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElEKSxcclxuICAgICAgICBtb2RhbElEOiBtb2RhbElELFxyXG4gICAgICAgIHZpc2libGU6IDAsXHJcbiAgICB9XHJcbiAgICAvKiogRU5EICAqL1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDb250YWN0Rm9ybUxpc3RlbmVyKG1vZGFsUGFnZSkge1xyXG4gICAgICAgIC8vIFRoaXMgYWRkIGxpc3RlbmVyIGFib3V0IG9ubHkgY29udGFjdCBmb3JtIFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3Blbk1vZGFsXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9wZW5Nb2RhbChtb2RhbFBhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VNb2RhbFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjbG9zZU1vZGFsKG1vZGFsUGFnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWN0X2J1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBzZW5kTWVzc2FnZShtb2RhbFBhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRLZXlib2FyZExpc3RlbmVyKG1vZGFsUGFnZSkge1xyXG4gICAgICAgIGlmIChtb2RhbFBhZ2UudmlzaWJsZSA9PT0gMSkgeyAvLyBJZiBtb2RhbFBhZ2UgaXMgdmlzaWJsZSBhdCB0aGUgc2NyZWVuXHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGFkZCBsaXN0ZW5lciBmb3IgS2V5Ym9hcmQgYW5kIGNoZWNrIGlmIGEga2V5IGlzIHByZXNzZWRcclxuICAgICAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwobW9kYWxQYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRUaXRsZU1vZGFsKG1vZGFsUGFnZSwgdGFnSFRNTCwgdGl0bGVNb2RhbCkge1xyXG4gICAgICAgIHJldHVybiBzZXRJbm5lckh0bWwoYCMke21vZGFsUGFnZS5tb2RhbElEfSAke3RhZ0hUTUx9YCwgdGl0bGVNb2RhbCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgICBmdW5jdGlvbiBlZmZlY3RBbmltYXRpb24oaGlkZWNsYXNzLCBzaG93Y2xhc3MsIG1vZGFsUGFnZSkge1xyXG4gICAgICAgIGlmIChtb2RhbFBhZ2UudmlzaWJsZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUGFnZS5tYWluSFRNTC5jbGFzc0xpc3QucmVtb3ZlKHNob3djbGFzcyk7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRQYWdlLmhlYWRlckhUTUwuY2xhc3NMaXN0LnJlbW92ZShzaG93Y2xhc3MpO1xyXG4gICAgICAgICAgICBtb2RhbFBhZ2UubW9kYWxIVE1MLmNsYXNzTGlzdC5yZW1vdmUoaGlkZWNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRQYWdlLm1haW5IVE1MLmNsYXNzTGlzdC5hZGQoaGlkZWNsYXNzKTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFBhZ2UuaGVhZGVySFRNTC5jbGFzc0xpc3QuYWRkKGhpZGVjbGFzcyk7XHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS5tb2RhbEhUTUwuY2xhc3NMaXN0LmFkZChzaG93Y2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgbW9kYWxQYWdlLnZpc2libGUgPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtb2RhbFBhZ2UubW9kYWxIVE1MLmNsYXNzTGlzdC5yZW1vdmUoc2hvd2NsYXNzKTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFBhZ2UubWFpbkhUTUwuY2xhc3NMaXN0LnJlbW92ZShoaWRlY2xhc3MpO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUGFnZS5oZWFkZXJIVE1MLmNsYXNzTGlzdC5yZW1vdmUoaGlkZWNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS5tb2RhbEhUTUwuY2xhc3NMaXN0LmFkZChoaWRlY2xhc3MpO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUGFnZS5tYWluSFRNTC5jbGFzc0xpc3QuYWRkKHNob3djbGFzcyk7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRQYWdlLmhlYWRlckhUTUwuY2xhc3NMaXN0LmFkZChzaG93Y2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgbW9kYWxQYWdlLnZpc2libGUgPSAwXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbW9kYWxQYWdlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gb3Blbk1vZGFsKG1vZGFsUGFnZSkge1xyXG4gICAgICAgIGVmZmVjdEFuaW1hdGlvbihcImhpZGVfY29udGVudFwiLCBcInNob3dfY29udGVudFwiLCBtb2RhbFBhZ2UpOyAvLyBFZmZlY3QgTW9kYWwgQ1NTXHJcbiAgICAgICAgbW9kYWxQYWdlLm1vZGFsSFRNTC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiOyAvLyBEaXNwbGF5IHRoZSBNb2RhbCBhdCB0aGUgc2NyZWVuXHJcbiAgICAgICAgYWRkS2V5Ym9hcmRMaXN0ZW5lcihtb2RhbFBhZ2UpOyAvLyBBZGQgS2V5Ym9hcmQgRXZlbnRzXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bW9kYWxQYWdlLm1vZGFsSUR9ICNjbG9zZU1vZGFsYCkuZm9jdXMoKTsgLy8gRm9jdXMgdGhlIENsb3NlIE1vZGFsIFxyXG5cclxuICAgICAgICAvLyBEaXNhYmxlIGNsaWNrIG9yIGZvY3VzIHdpdGggaW5lcnQgdG8gdGhlIEJhY2tncm91bmRQYWdlIFxyXG4gICAgICAgIGJhY2tncm91bmRQYWdlLmhlYWRlckhUTUwuc2V0QXR0cmlidXRlKFwiaW5lcnRcIiwgXCJcIik7XHJcbiAgICAgICAgYmFja2dyb3VuZFBhZ2UubWFpbkhUTUwuc2V0QXR0cmlidXRlKFwiaW5lcnRcIiwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbFBhZ2UpIHtcclxuICAgICAgICBlZmZlY3RBbmltYXRpb24oXCJoaWRlX2NvbnRlbnRcIiwgXCJzaG93X2NvbnRlbnRcIiwgbW9kYWxQYWdlKTsgLy8gRWZmZWN0IE1vZGFsIENTU1xyXG4gICAgICAgIG1vZGFsUGFnZS5tb2RhbEhUTUwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiOyAvLyBIaWRlIGF0IHRoZSBzY3JlZW4gbW9kYWxcclxuXHJcbiAgICAgICAgLy8gQWxsb3cgY2xpY2sgb3IgZm9jdXMgd2l0aCBpbmVydCB0byB0aGUgQmFja2dyb3VuZFBhZ2UgXHJcbiAgICAgICAgYmFja2dyb3VuZFBhZ2UubWFpbkhUTUwucmVtb3ZlQXR0cmlidXRlKFwiaW5lcnRcIik7XHJcbiAgICAgICAgYmFja2dyb3VuZFBhZ2UuaGVhZGVySFRNTC5yZW1vdmVBdHRyaWJ1dGUoXCJpbmVydFwiKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKG1vZGFsUGFnZSkge1xyXG4gICAgICAgIGNvbnN0IGFsbElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke21vZGFsUGFnZS5tb2RhbElEfSBpbnB1dGApO1xyXG4gICAgICAgIGNvbnN0IGFsbFRleHRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7bW9kYWxQYWdlLm1vZGFsSUR9IHRleHRhcmVhYCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiX19fX1NlbmQgTWVzc2FnZV9fX19fXCIpO1xyXG5cclxuICAgICAgICBsZXQgZnVsbG1lc3NhZ2UgPSBcIlwiO1xyXG5cclxuICAgICAgICBhbGxJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICAgICAgICAgIGZ1bGxtZXNzYWdlICs9ICdcXG4nICsgaW5wdXQuaWQgKyBcIjogXCIgKyBpbnB1dC52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYWxsVGV4dEFyZWEuZm9yRWFjaCh0ZXh0YXJlYSA9PiB7XHJcbiAgICAgICAgICAgIGZ1bGxtZXNzYWdlICs9ICdcXG4nICsgdGV4dGFyZWEuaWQgKyBcIjogXCIgKyB0ZXh0YXJlYS52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGZ1bGxtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZ1bGxtZXNzYWdlKTtcclxuICAgICAgICAgICAgYWxlcnQoYE1lc3NhZ2UgRW52b3llciAhICR7ZnVsbG1lc3NhZ2V9YCk7XHJcbiAgICAgICAgICAgIGNsb3NlTW9kYWwobW9kYWxQYWdlKTsgLy8gQ2xvc2UgbW9kYWwgYWZ0ZXIgbWVzc2FnZSBzZW5kXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU29tZXRoaW5nIHdyb25nIG1lc3NhZ2Ugbm8gc2VuZCBiZWNhdXNlIGZ1bGxtZXNzYWdlIGlzIGVtcHR5IG9yIGRvbid0IGV4aXN0cyBmcm9tIHNlbmRNZXNzYWdlKClcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyZXVyIG1lc3NhZ2Ugbm9uIGVudm95ZXIgOihcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGJhY2tncm91bmRQYWdlLCBtb2RhbFBhZ2UsXHJcbiAgICAgICAgYWRkQ29udGFjdEZvcm1MaXN0ZW5lciwgYWRkS2V5Ym9hcmRMaXN0ZW5lcixcclxuICAgICAgICBvcGVuTW9kYWwsIGNsb3NlTW9kYWwsXHJcbiAgICAgICAgc2V0VGl0bGVNb2RhbCxcclxuICAgICAgICBzZW5kTWVzc2FnZVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgZGlzcGxheU1lZGlhIH0gZnJvbSAnLi4vZGF0YS9kaXNwbGF5TWVkaWEnO1xyXG5pbXBvcnQgeyBzb3J0QnlMaWtlcywgc29ydEJ5RGF0ZSwgc29ydEJ5VGl0bGUgfSBmcm9tICcuLi91dGlscy9zb3J0QnknO1xyXG5cclxuXHJcbi8qKiBHRU5FUkFURSBFVkVOVCBGT1IgU0VMRUNUIEZJTFRFUiBDT01QT05FTlRTIEFORCBCRUhBVklPUiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0RmlsdGVyQ29tcG9uZW50KGRhdGEsIGlkVVJMKSB7XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0RmlsdGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RfZmlsdGVyIC5zZWxlY3RfYnV0dG9uXCIpOyAvLyBCdXR0b24gU2VsZWN0XHJcbiAgICBjb25zdCBzZWxlY3RGaWx0ZXJTZWxlY3QxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3QxXCIpOyAvLyBGaXJzdCBTZWxlY3QgKGJ5IGRlZmF1bHQgRGF0ZSlcclxuICAgIGNvbnN0IHNlbGVjdEZpbHRlclNlbGVjdDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdDJcIik7IC8vIDJuZCBTZWxlY3QgKGJ5IGRlZmF1bHQgVGl0cmUpXHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUZpbHRlckFjdGlvbihldmVudCkge1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSBldmVudC50YXJnZXQuaW5uZXJIVE1MOyAvLyBHZXQgaW5uZXJIVE1MIG9mIHNlbGVjdGVkIGl0ZW1cclxuXHJcblxyXG4gICAgICAgIHN3aXRjaCAoc2VsZWN0ZWRJdGVtKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0RhdGUnOlxyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyQnV0dG9uLmlubmVySFRNTCA9IFwiRGF0ZVwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyU2VsZWN0MS5pbm5lckhUTUwgPSBcIlBvcHVsYXJpdMOpXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJTZWxlY3QyLmlubmVySFRNTCA9IFwiVGl0cmVcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVkaWFfc2VjdGlvbicpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAvLyBCdWlsZCBNZWRpYXMgRGF0YVxyXG4gICAgICAgICAgICAgICAgZGlzcGxheU1lZGlhKGRhdGEuc29ydChzb3J0QnlEYXRlKSwgXCIubWVkaWFfc2VjdGlvblwiLCBpZFVSTCk7XHJcbiAgICAgICAgICAgICAgICAvLyBFbmQgYnVpbGQgTWVkaWFzIERhdGFcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnVGl0cmUnOlxyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyQnV0dG9uLmlubmVySFRNTCA9IFwiVGl0cmVcIjtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlclNlbGVjdDEuaW5uZXJIVE1MID0gXCJEYXRlXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJTZWxlY3QyLmlubmVySFRNTCA9IFwiUG9wdWxhcml0w6lcIjtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lZGlhX3NlY3Rpb24nKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgLy8gQnVpbGQgTWVkaWFzIERhdGFcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlNZWRpYShkYXRhLnNvcnQoc29ydEJ5VGl0bGUpLCBcIi5tZWRpYV9zZWN0aW9uXCIsIGlkVVJMKTtcclxuICAgICAgICAgICAgICAgIC8vIEVuZCBidWlsZCBNZWRpYXMgRGF0YVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdQb3B1bGFyaXTDqSc6XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJCdXR0b24uaW5uZXJIVE1MID0gXCJQb3B1bGFyaXTDqVwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyU2VsZWN0MS5pbm5lckhUTUwgPSBcIkRhdGVcIjtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlclNlbGVjdDIuaW5uZXJIVE1MID0gXCJUaXRyZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZWRpYV9zZWN0aW9uJykuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vIEJ1aWxkIE1lZGlhcyBEYXRhXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5TWVkaWEoZGF0YS5zb3J0KHNvcnRCeUxpa2VzKSwgXCIubWVkaWFfc2VjdGlvblwiLCBpZFVSTCk7XHJcbiAgICAgICAgICAgICAgICAvLyBFbmQgYnVpbGQgTWVkaWFzIERhdGFcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInNlbGVjdGVkSXRlbSBub3QgZm91bmQgZXJyb3IgYWJvdXQgaGFuZGxlRmlsdGVyQWN0aW9uKClcIik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgc2VsZWN0RmlsdGVyU2VsZWN0MS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlRmlsdGVyQWN0aW9uKVxyXG4gICAgc2VsZWN0RmlsdGVyU2VsZWN0Mi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlRmlsdGVyQWN0aW9uKVxyXG59XHJcbi8qKiBFTkQgR0VORVJBVEUgRVZFTlQgRk9SIFNFTEVDVCBGSUxURVIgQ09NUE9ORVROUyBBTkQgQkVIQVZJT1IgKi9cclxuIiwiLyoqIEZ1bmN0aW9uIHRvIHNvcnQgYnkgTGlrZXMsRGF0ZXMgb3IgVGl0bGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRCeUxpa2VzKGEsIGIpIHtcclxuICAgIGlmIChhLmxpa2VzID4gYi5saWtlcykge1xyXG4gICAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG4gICAgaWYgKGEubGlrZXMgPCBiLmxpa2VzKSB7XHJcbiAgICAgICAgcmV0dXJuIDFcclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc29ydEJ5RGF0ZShhLCBiKSB7XHJcbiAgICBpZiAoYS5kYXRlID4gYi5kYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICBpZiAoYS5kYXRlIDwgYi5kYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIDFcclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc29ydEJ5VGl0bGUoYSwgYikge1xyXG4gICAgaWYgKGEudGl0bGUgPCBiLnRpdGxlKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICBpZiAoYS50aXRsZSA+IGIudGl0bGUpIHtcclxuICAgICAgICByZXR1cm4gMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbn1cclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAY2hhcnNldCBcXFwiVVRGLThcXFwiO1xcbi8qKiBVc2VkIHRvIGxvYWQgYWxsIHZhcmlhYmxlcyBmb3IgdGhpcyBwcm9qZWN0IGFib3V0IFNDU1MgKiovIC8qKiBGT05UICoqL1xcbi8qKiBFTkQgRk9OVCAqKi9cXG4vKiogQ09MT1IgVkFSSUFCTEVTICoqL1xcbi8qKiBFTkQgQ09MT1IgVkFSSUFCTEVTICoqL1xcbi8qKiBJTVBPUlQgR0xPQkFMIENTUyBGT1IgRk9OVFMgSFRNTCwqIFNFTEVDVE9SICoqL1xcbi8qKioqKioqKioqKioqKioqKioqKioqIEdFTkVSQUwgKioqKioqKioqKioqKioqKioqKioqKi9cXG5odG1sLFxcbioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGFuaW1hdGlvbjogMXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcbn1cXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxufVxcblxcbi8qKioqKioqKioqKioqKioqKioqKioqIEVORCBHRU5FUkFMICoqKioqKioqKioqKioqKioqKioqKiovXFxuLyoqIElNUE9SVCBNSVhJTiAqKi9cXG4vKiogSU1QT1JUIEhFQURFUiBTVFlMRVMgKiovXFxuaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogMTIwcHg7XFxufVxcbmhlYWRlciBoMSB7XFxuICBjb2xvcjogIzkwMUMxQztcXG4gIHRvcDogNDRweDtcXG4gIG1hcmdpbi1yaWdodDogMTAwcHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDQ3cHg7XFxufVxcbmhlYWRlciAubG9nbyxcXG5oZWFkZXIgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXG4gIGhlaWdodDogNTBweDtcXG59XFxuaGVhZGVyIC5sb2dvIHtcXG4gIG1hcmdpbi1sZWZ0OiAxMTVweDtcXG59XFxuaGVhZGVyIC5sb2dvX3Bob3RvZ3JhcGhlciB7XFxuICBtYXJnaW4tbGVmdDogMTAwcHg7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG5cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUlMgQ0FSRFMgKiovXFxuLnBob3RvZ3JhcGhlcl9jYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBpbWcge1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcbiAgaGVpZ2h0OiAyMDBweDtcXG4gIHdpZHRoOiAyMDBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaW1nOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoMixcXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDMsXFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg0LFxcbi5waG90b2dyYXBoZXJfY2FyZCBoNSB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGgyIHtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBjb2xvcjogI0QzNTczQztcXG4gIGZvbnQtc2l6ZTogMzZweDtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGgzIHtcXG4gIGZvbnQtc2l6ZTogMTMuMDAxMDgzNDIzNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDE3cHg7XFxuICBjb2xvcjogIzkwMUMxQztcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg0IHtcXG4gIG1hcmdpbi10b3A6IDJweDtcXG4gIGZvbnQtc2l6ZTogMTBweDtcXG4gIGxpbmUtaGVpZ2h0OiAxM3B4O1xcbiAgY29sb3I6ICMwMDAwMDA7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoNSB7XFxuICBtYXJnaW4tdG9wOiAycHg7XFxuICBmb250LXNpemU6IDlweDtcXG4gIGxpbmUtaGVpZ2h0OiAxMnB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6ICM3NTc1NzU7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoMyB7XFxuICAgIGZvbnQtc2l6ZTogMTYuOTAxNDA4NDUwN3B4O1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGg0IHtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gICAgZm9udC1zaXplOiAxMS43cHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGgzIHtcXG4gICAgZm9udC1zaXplOiAxOS41MDE2MjUxMzU0cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDQge1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDUge1xcbiAgICBmb250LXNpemU6IDEzLjVweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBpbWcge1xcbiAgICB3aWR0aDogMjMwcHg7XFxuICAgIGhlaWdodDogMjMwcHg7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgTU9EQUwgQ09NUE9ORU5UICoqL1xcbi5tb2RhbF9jb250YWN0IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREI4ODc2O1xcbiAgcGFkZGluZzogMzVweDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIHdpZHRoOiA0NyU7XFxuICB0cmFuc2l0aW9uOiB3aWR0aCAwLjVzIGVhc2UtaW47XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIge1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW4tdG9wOiAtMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbn1cXG4ubW9kYWxfY29udGFjdCAubW9kYWxfaGVhZGVyICNjbG9zZU1vZGFsIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciAjY2xvc2VNb2RhbCAuZGVmYXVsdF9jb2xvciB7XFxuICBmaWxsOiB3aGl0ZTtcXG59XFxuLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciAjY2xvc2VNb2RhbCAuY29sb3JfcHJpbWFyeTEge1xcbiAgZmlsbDogIzkwMUMxQztcXG59XFxuLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciBoMiB7XFxuICBmb250LXNpemU6IDYzLjcycHg7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgZm9ybSBpbnB1dCB7XFxuICBmb250LXNpemU6IDMwcHg7XFxuICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICBwYWRkaW5nOiAxMHB4O1xcbn1cXG4ubW9kYWxfY29udGFjdCBmb3JtIHRleHRhcmVhIHtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgcmVzaXplOiB2ZXJ0aWNhbDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgZm9ybSBpbnB1dCxcXG4ubW9kYWxfY29udGFjdCBmb3JtIHRleHRhcmVhIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA2OHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG4ubW9kYWxfY29udGFjdCBmb3JtIGxhYmVsIHtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbn1cXG4ubW9kYWxfY29udGFjdCBmb3JtIGxhYmVsOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgLmhlbHBfYmxpbmQge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmhpZGVfY29udGVudCB7XFxuICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLW9mZjtcXG59XFxuQGtleWZyYW1lcyBmYWRlLW9mZiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMC40O1xcbiAgfVxcbn1cXG5cXG4uc2hvd19jb250ZW50IHtcXG4gIGFuaW1hdGlvbjogMC41cyBlYXNlLWluIGZvcndhcmRzIGZhZGUtaW47XFxufVxcbkBrZXlmcmFtZXMgZmFkZS1pbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuNDtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxuICAubW9kYWxfY29udGFjdCB7XFxuICAgIHdpZHRoOiA2NSU7XFxuICB9XFxuICAubW9kYWxfY29udGFjdCAubW9kYWxfaGVhZGVyIGgyIHtcXG4gICAgZm9udC1zaXplOiA1NHB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXG4gIC5tb2RhbF9jb250YWN0IHtcXG4gICAgd2lkdGg6IDkwJTtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgaDIge1xcbiAgICBmb250LXNpemU6IDQzLjJweDtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IGZvcm0gbGFiZWwge1xcbiAgICBmb250LXNpemU6IDI3LjY5MjMwNzY5MjNweDtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IGZvcm0gaW5wdXQge1xcbiAgICBmb250LXNpemU6IDI0cHg7XFxuICB9XFxuICAubW9kYWxfY29udGFjdCBmb3JtIHRleHRhcmVhIHtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgfVxcbn1cXG4vKiogSU1QT1JUIENPTlRBQ1QgQlVUVE9OIENPTVBPTkVOVCAqKi9cXG4uZmlzaGV5ZV9idXR0b24ge1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAxMXB4O1xcbiAgbWluLXdpZHRoOiAxNzBweDtcXG4gIG1pbi1oZWlnaHQ6IDcwcHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTAxQzFDO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdHJhbnNpdGlvbjogY29sb3IgMC41cyBlYXNlLWluLCBiYWNrZ3JvdW5kLWNvbG9yIDAuNXMgZWFzZS1pbjtcXG59XFxuLmZpc2hleWVfYnV0dG9uOmhvdmVyIHtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0RCODg3NjtcXG59XFxuXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIIEhFQURFUiBDT01QT05FTlQgKiovXFxuLnBob3RvZ3JhcGhfaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZmxleC13cmFwOiBuby13cmFwO1xcbiAgYWxpZ24tY29udGVudDogZmxlZC1lbmQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkFGQUZBO1xcbiAgaGVpZ2h0OiAzMTNweDtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBwYWRkaW5nLWxlZnQ6IDMwcHg7XFxuICBwYWRkaW5nLXJpZ2h0OiAzMHB4O1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgZGl2Om50aC1jaGlsZCgzKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBoMSxcXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDIsXFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNDAwO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDEge1xcbiAgZm9udC1zaXplOiA2My43MnB4O1xcbiAgbWFyZ2luLWJvdHRvbTogLTE1cHg7XFxuICBjb2xvcjogI0QzNTczQztcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgyIHtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgZm9udC1zaXplOiAyMy4yMjU4MDY0NTE2cHg7XFxuICBjb2xvcjogIzkwMUMxQztcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGNvbG9yOiAjNTI1MjUyO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYWJvdXQsXFxuLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2J1dHRvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9idXR0b24ge1xcbiAgbWFyZ2luLXRvcDogMzBweDtcXG4gIG1hcmdpbi1yaWdodDogODBweDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2Fib3V0IHtcXG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgYWxpZ24tY29udGVudDogZmxlZC1lbmQ7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcGFkZGluZy10b3A6IDE1cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgaDEge1xcbiAgICBmb250LXNpemU6IDQxLjRweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMiB7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMyB7XFxuICAgIGZvbnQtc2l6ZTogMTYuMzYzNjM2MzYzNnB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxuICAucGhvdG9ncmFwaF9oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1jb250ZW50OiBmbGVkLWVuZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2J1dHRvbiB7XFxuICAgIGFsaWduLWl0ZW1zOiBpbmhlcml0O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDBweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBtYXJnaW4tdG9wOiAyMDBweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciA+IC5waG90b2dyYXBoX2Fib3V0IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgaDEsXFxuaDIsXFxuaDMge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgPiAucGhvdG9ncmFwaGVyX2NhcmQge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbn1cXG4vKiogSU1QT1JUIFNFTEVDVCBGSUxURVIgQ09NUE9ORU5UICoqL1xcbi5zZWxlY3RfYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1jb250ZW50OiBmbGV4LWVuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBiYWNrZ3JvdW5kOiAjOTAxQzFDO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1jb2xvcjogbm9uZTtcXG4gIHdpZHRoOiAxNzBweDtcXG4gIGhlaWdodDogNzBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBlYXNlLWluO1xcbiAgY29udGVudDogXFxcIj5cXFwiO1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbiAgZm9udC1zaXplOiAyNXB4O1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxufVxcblxcbi5zZWxlY3RfZmlsdGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuXFxuLnNlbGVjdF9jb250ZW50IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBiYWNrZ3JvdW5kOiAjOTAxQzFDO1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNXB4O1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDVweDtcXG4gIG1pbi13aWR0aDogMTYwcHg7XFxuICBib3gtc2hhZG93OiAwcHggMnB4IDhweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgei1pbmRleDogMTtcXG59XFxuLnNlbGVjdF9jb250ZW50IC53aGl0ZWxpbmUge1xcbiAgd2lkdGg6IDkwJTtcXG4gIGhlaWdodDogMXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBtYXJnaW4tbGVmdDogNSU7XFxufVxcbi5zZWxlY3RfY29udGVudCBhIHtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICB3aWR0aDogMTcwcHg7XFxuICBoZWlnaHQ6IDYwcHg7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuLnNlbGVjdF9jb250ZW50IGE6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbjtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbn1cXG5cXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2NvbnRlbnQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi5zZWxlY3RfZmlsdGVyOmhvdmVyIC5zZWxlY3RfYnV0dG9uOjphZnRlciB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxufVxcblxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIFNUQVRJU1RJQyBDT01QT05FTlQgKiovXFxuLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREI4ODc2O1xcbiAgbWluLXdpZHRoOiAzNzZweDtcXG4gIG1pbi1oZWlnaHQ6IDg5cHg7XFxuICBib3R0b206IDA7XFxuICByaWdodDogMzhweDtcXG4gIHotaW5kZXg6IDI7XFxuICBtYXJnaW4tYm90dG9tOiAtMjJweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMgLnRvdGFsX2xpa2VzLFxcbi5waG90b2dyYXBoZXJfc3RhdGlzdGljIC5wcmljZV9yYXRlX2RhaWx5IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAyMy4yMjU4MDY0NTE2cHg7XFxuICBsaW5lLWhlaWdodDogMzFweDtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgcGFkZGluZy10b3A6IDE4cHg7XFxufVxcbi5waG90b2dyYXBoZXJfc3RhdGlzdGljIC50b3RhbF9saWtlczphZnRlciB7XFxuICBwYWRkaW5nLWxlZnQ6IDVweDtcXG4gIGNvbnRlbnQ6IFxcXCLimaVcXFwiO1xcbiAgZm9udC1zaXplOiAzMC44OTAzMjI1ODA2cHg7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbn1cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUiBNRURJQSBDQVJEUyBDT01QT05FTlQgKiovXFxuLm1lZGlhX2NhcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBtYXgtd2lkdGg6IDM1MHB4O1xcbn1cXG4ubWVkaWFfY2FyZCBpbWcsXFxuLm1lZGlhX2NhcmQgdmlkZW8ge1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxcztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWF4LWhlaWdodDogMzAwcHg7XFxuICBtaW4taGVpZ2h0OiAzMDBweDtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG4ubWVkaWFfY2FyZCBpbWc6aG92ZXIsXFxuLm1lZGlhX2NhcmQgdmlkZW86aG92ZXIge1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxcztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxufVxcbi5tZWRpYV9jYXJkIC5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG4ubWVkaWFfY2FyZCBoNiB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbn1cXG4ubWVkaWFfY2FyZCBoNjpsYXN0LWNoaWxkOjphZnRlciB7XFxuICBmb250LXNpemU6IDMwcHg7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxuICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAubWVkaWFfY2FyZCBpbWcsXFxuLm1lZGlhX2NhcmQge1xcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgUEFHRVMgKG90aGVyKSBTdHlsZXMgKiovXFxuLnBob3RvZ3JhcGhlcl9zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcbiAgZ2FwOiA3MHB4O1xcbiAgbWFyZ2luLXRvcDogNzVweDtcXG4gIG1hcmdpbi1ib3R0b206IDc1cHg7XFxufVxcblxcbi5tYXJnaW5fbGVmdF9yaWdodCB7XFxuICBtYXJnaW46IDAgMTAwcHg7XFxufVxcblxcbi5maWx0ZXJfc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbn1cXG4uZmlsdGVyX3NlY3Rpb24gaDU6Zmlyc3QtY2hpbGQge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIG1hcmdpbi1yaWdodDogMjhweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgY29sb3I6ICMwMDAwMDA7XFxufVxcbi5maWx0ZXJfc2VjdGlvbiAuc2VsZWN0X2ZpbHRlciB7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG5cXG4ubWVkaWFfc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXG4gIHJvdy1nYXA6IDMwcHg7XFxuICBjb2x1bW4tZ2FwOiA5NXB4O1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDc1cHg7XFxufVxcblxcbi5FUlJPUl80MDQge1xcbiAgbWFyZ2luLXRvcDogNSU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIHBhZGRpbmc6IDQwcHg7XFxufVxcbi5FUlJPUl80MDQgaDEge1xcbiAgbWFyZ2luLWJvdHRvbTogNSU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDcycHg7XFxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xcbn1cXG4uRVJST1JfNDA0IGEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcbi5FUlJPUl80MDQgYTpob3ZlciB7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuXFxuLyoqIElNUE9SVCBGT09URVIgU1RZTEVTICoqL1xcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDJweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBtYXJnaW4tdG9wOiA3NXB4O1xcbn1cXG5cXG4vKiogSU1QT1JUIFJFU1BPTlNJVkUgU1RZTEVTIGZvciBOb24gQ29tcG9uZW50cyBFbGVtZW50c1xcbiAoY29tcG9uZW50cyBFbGVtZW50cyBnb3QgdGhlaXIgb3duIFJlc3BvbnNpdmUgUnVsZXMgaW4gdGhlaXIgU3R5bGVzaGVldCkgKiovXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9zZWN0aW9uLFxcbi5tZWRpYV9zZWN0aW9uIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXG4gIGhlYWRlciB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIG1hcmdpbi10b3A6IDQwcHg7XFxuICAgIGhlaWdodDogMTAwcHg7XFxuICB9XFxuICBoZWFkZXIgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxuICB9XFxuICBoZWFkZXIgLmxvZ28sXFxuaGVhZGVyIGgxIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcXG4gICAgZm9udC1zaXplOiAzMHB4O1xcbiAgfVxcbiAgLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXG4gICAgbWFyZ2luOiAwIDIwcHg7XFxuICB9XFxuICAuZmlsdGVyX3NlY3Rpb24ge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9zZWN0aW9uIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgLm1lZGlhX3NlY3Rpb24ge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIH1cXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3Njc3MvbWFpbi5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fdmFyaWFibGVzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19nbG9iYWwuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvcGFnZXMvX2hlYWRlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fbWl4aW4uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fcGhvdG9ncmFwaGVyX2NhcmRzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvbW9kYWwvX2NvbnRhY3Quc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fZmlzaGV5ZV9idXR0b24uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fcGhvdG9ncmFwaF9oZWFkZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fc2VsZWN0X2ZpbHRlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19waG90b2dyYXBoZXJfc3RhdGlzdGljLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX21lZGlhX2NhcmRzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3BhZ2VzL19wYWdlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9wYWdlcy9fZm9vdGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19yZXNwb25zaXZlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsZ0JBQWdCO0FBQWhCLDZEQUFBLEVBQUEsV0FBQTtBQ01BLGVBQUE7QUFFQSxzQkFBQTtBQVNBLDBCQUFBO0FEZkEsa0RBQUE7QUVGQSxzREFBQTtBQUNB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QTtFQUVJO0lBQ0ksVUFBQTtFTitHTjtFTTVHVTtJQUNJLGVBQUE7RU44R2Q7QUFDRjtBTXRHQTtFQUNJO0lBQ0ksVUFBQTtFTndHTjtFTXJHVTtJQUNJLGlCQUFBO0VOdUdkO0VNbkdNO0lBQ0ksMEJBQUE7RU5xR1Y7RU1sR007SUFDSSxlQUFBO0VOb0dWO0VNakdNO0lBQ0ksZUFBQTtFTm1HVjtBQUNGO0FBL09BLHNDQUFBO0FPYkE7RUFDSSxlQUFBO0VBQ0EsZ0JOQ2M7RU1BZCxrQ05GVTtFTUdWLFlOS1k7RU1KWixhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSx5Qk5HYTtFTUZiLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLDZEQUFBO0FQK1BKO0FPN1BJO0VBQ0ksY05MYTtFTU1iLHlCQUFBO0FQK1BSOztBQWhRQSx5Q0FBQTtBUWZBO0VKS0UsYUFBQTtFQUNBLG1CSUxzQjtFSlFwQixrQklSeUI7RUpZekIsdUJJWmtDO0VKZ0JsQyw4QkloQjRDO0VBQzVDLHlCUGFrQjtFT1psQixhQUFBO0VBQ0EsZ0JBQUE7RUpnQ0Ysa0JJL0JrQztFSmdDbEMsbUJJaENrQztBUndScEM7QVF0Ukk7RUFDSSxrQkFBQTtBUndSUjtBUXBSSTs7O0VBR0ksa0NQZE07RU9lTixnQlBkWTtBRG9TcEI7QVFuUkk7RUFDSSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsY1BUUztBRDhSakI7QVFsUkk7RUFDSSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMEJBQUE7RUFDQSxjUGpCUztBRHFTakI7QVFqUkk7RUFDSSxlQUFBO0VBQ0EsY1BwQlc7QUR1U25CO0FRaFJJOztFSmhDRixhQUFBO0VBQ0Esc0JJaUMwQjtFSnRCeEIsdUJJc0I0QztFSmxCNUMsdUJJa0JvRDtBUnFSeEQ7QVFsUkk7RUFDSSxnQkFBQTtFQUNBLGtCQUFBO0FSb1JSO0FRalJJO0VBQ0ksaUJBQUE7RUFDQSxtQkFBQTtBUm1SUjs7QVE5UUE7RUFDSTtJQUNJLHVCUC9DUTtJR0pkLGFBQUE7SUFDQSxzQkltRDBCO0lKaER4QixlSWdEZ0M7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a21CTjtFYzlsQkU7SUFDSSw4QkFBQTtFZGdtQk47QUFDRjtBYzVsQkE7RUFFSTtJQUNJLDBCQUFBO0VkNmxCTjtBQUNGO0FjemxCQTtFQUVJO0lBQ0ksMEJBQUE7RWQwbEJOO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqIFVzZWQgdG8gbG9hZCBhbGwgdmFyaWFibGVzIGZvciB0aGlzIHByb2plY3QgYWJvdXQgU0NTUyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfdmFyaWFibGVzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgR0xPQkFMIENTUyBGT1IgRk9OVFMgSFRNTCwqIFNFTEVDVE9SICoqL1xcclxcbkBpbXBvcnQgXFxcIl9nbG9iYWwuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBNSVhJTiAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfbWl4aW4uc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBIRUFERVIgU1RZTEVTICoqL1xcclxcbkBpbXBvcnQgXFxcInBhZ2VzL2hlYWRlci5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUlMgQ0FSRFMgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9waG90b2dyYXBoZXJfY2FyZHMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBNT0RBTCBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9tb2RhbC9fY29udGFjdC5zY3NzXFxcIjtcXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL21vZGFsL19saWdodGJveC5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIENPTlRBQ1QgQlVUVE9OIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL2Zpc2hleWVfYnV0dG9uLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSCBIRUFERVIgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvcGhvdG9ncmFwaF9oZWFkZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBTRUxFQ1QgRklMVEVSIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3NlbGVjdF9maWx0ZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgU1RBVElTVElDIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3Bob3RvZ3JhcGhlcl9zdGF0aXN0aWMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgTUVESUEgQ0FSRFMgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvbWVkaWFfY2FyZHMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQQUdFUyAob3RoZXIpIFN0eWxlcyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJwYWdlcy9wYWdlcy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIEZPT1RFUiBTVFlMRVMgKiovXFxyXFxuQGltcG9ydCBcXFwicGFnZXMvZm9vdGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUkVTUE9OU0lWRSBTVFlMRVMgZm9yIE5vbiBDb21wb25lbnRzIEVsZW1lbnRzXFxyXFxuIChjb21wb25lbnRzIEVsZW1lbnRzIGdvdCB0aGVpciBvd24gUmVzcG9uc2l2ZSBSdWxlcyBpbiB0aGVpciBTdHlsZXNoZWV0KSAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfcmVzcG9uc2l2ZS5zY3NzXFxcIjtcIixcIi8qKiBGT05UICoqL1xcclxcbiRmb250X2dsb2JhbDogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcclxcbiRmb250X3dlaWdodF9zbWFsbDogNDAwO1xcclxcbiRmb250X3dlaWdodF9iaWc6IDcwMDtcXHJcXG5cXHJcXG4kZm9udF9zaXplOiAzNnB4O1xcclxcbi8qKiBFTkQgRk9OVCAqKi9cXHJcXG5cXHJcXG4vKiogQ09MT1IgVkFSSUFCTEVTICoqL1xcclxcbiRkZWZhdWx0X2NvbG9yOiB3aGl0ZTtcXHJcXG4kZGVmYXVsdF9mb250X2NvbG9yOiAjMDAwMDAwO1xcclxcbiRjb2xvcl9ncmF5OiAjNzU3NTc1O1xcclxcbiRjb2xvcl9wcmltYXJ5MTogIzkwMUMxQztcXHJcXG4kY29sb3JfcHJpbWFyeTI6ICNEMzU3M0M7XFxyXFxuJGNvbG9yX3NlY29uZGFyeTI6ICM1MjUyNTI7XFxyXFxuJGNvbG9yX3NlY29uZGFyeTJfYmc6ICNGQUZBRkE7XFxyXFxuJGNvbG9yX2JhY2tncm91bmQ6ICNEQjg4NzY7XFxyXFxuLyoqIEVORCBDT0xPUiBWQVJJQUJMRVMgKiovXCIsXCIvKioqKioqKioqKioqKioqKioqKioqKiBHRU5FUkFMICoqKioqKioqKioqKioqKioqKioqKiovXFxyXFxuaHRtbCxcXHJcXG4qIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICBhbmltYXRpb246IDFzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXHJcXG5cXHJcXG4gIEBrZXlmcmFtZXMgZmFkZS1pbiB7XFxyXFxuICAgIDAlIHtcXHJcXG4gICAgICBvcGFjaXR5OiAwO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIDEwMCUge1xcclxcbiAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4vKioqKioqKioqKioqKioqKioqKioqKiBFTkQgR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1wiLFwiaGVhZGVyIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIG51bGwsIHNwYWNlLWJldHdlZW4sIGNlbnRlcik7XFxyXFxuICAgIGhlaWdodDogMTIwcHg7XFxyXFxuXFxyXFxuXFxyXFxuICAgIGgxIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgICAgICB0b3A6IDQ0cHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwMHB4O1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiA0N3B4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvLFxcclxcbiAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvIHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMTVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEwMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cIixcIkBtaXhpbiBmbGV4LWJhc2ljKCRmbGV4LWRpcmVjdGlvbixcXHJcXG4gICRmbGV4LXdyYXAsXFxyXFxuICAkYWxpZ24tY29udGVudCxcXHJcXG4gICRqdXN0aWZ5LWNvbnRlbnQsXFxyXFxuICAkYWxpZ24taXRlbXMpIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogJGZsZXgtZGlyZWN0aW9uO1xcclxcblxcclxcbiAgQGlmICgkZmxleC13cmFwKSB7XFxyXFxuICAgIGZsZXgtd3JhcDogJGZsZXgtd3JhcDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIEBpZiAoJGFsaWduLWNvbnRlbnQpIHtcXHJcXG4gICAgYWxpZ24tY29udGVudDogJGFsaWduLWNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAaWYgKCRqdXN0aWZ5LWNvbnRlbnQpIHtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiAkanVzdGlmeS1jb250ZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgQGlmICgkYWxpZ24taXRlbXMpIHtcXHJcXG4gICAgYWxpZ24taXRlbXM6ICRhbGlnbi1pdGVtcztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLy8gQG1peGluIG1hc2stY3Jvc3Nicm93c2VyKCR2YWx1ZSkge1xcclxcbi8vICAgLXdlYmtpdC1tYXNrOiAkdmFsdWU7XFxyXFxuLy8gICBtYXNrOiAkdmFsdWU7XFxyXFxuLy8gfVxcclxcblxcclxcbi8vIEBtaXhpbiBtYXJnaW4tbGVmdC1hbmQtcmlnaHQoJHZhbHVlKSB7XFxyXFxuLy8gICBtYXJnaW4tbGVmdDogJHZhbHVlO1xcclxcbi8vICAgbWFyZ2luLXJpZ2h0OiAkdmFsdWU7XFxyXFxuLy8gfVxcclxcblxcclxcbkBtaXhpbiBwYWRkaW5nLWxlZnQtYW5kLXJpZ2h0KCR2YWx1ZSkge1xcclxcbiAgcGFkZGluZy1sZWZ0OiAkdmFsdWU7XFxyXFxuICBwYWRkaW5nLXJpZ2h0OiAkdmFsdWU7XFxyXFxufVwiLFwiLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIG51bGwsIGNlbnRlciwgY2VudGVyKTtcXHJcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIGltZyB7XFxyXFxuICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICBoZWlnaHQ6IDIwMHB4O1xcclxcbiAgICAgICAgd2lkdGg6IDIwMHB4O1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuXFxyXFxuICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41MCk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgaDIsXFxyXFxuICAgIGgzLFxcclxcbiAgICBoNCxcXHJcXG4gICAgaDUge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfc21hbGw7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDIge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTI7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAyLjc2OSk7XFxyXFxuICAgICAgICBsaW5lLWhlaWdodDogMTdweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDQge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAzLjYpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEzcHg7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoNSB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAycHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDQpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEycHg7XFxyXFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX2dyYXk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgaDMge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMi43NjkgKiAxLjMpO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAzLjYgKiAxLjMpO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyA0ICogMS4zKTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgaDMge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMi43NjkgKiAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDQge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMy42ICogMS41KTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGg1IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDQgKiAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaW1nIHtcXHJcXG4gICAgICAgICAgICB3aWR0aDogMjMwcHg7XFxyXFxuICAgICAgICAgICAgaGVpZ2h0OiAyMzBweDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbn1cIixcIi5tb2RhbF9jb250YWN0IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICB0b3A6IDUwJTtcXHJcXG4gICAgbGVmdDogNTAlO1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXHJcXG4gICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIHBhZGRpbmc6IDM1cHg7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAgd2lkdGg6IDQ3JTtcXHJcXG4gICAgdHJhbnNpdGlvbjogd2lkdGggMC41cyBlYXNlLWluO1xcclxcblxcclxcbiAgICAubW9kYWxfaGVhZGVyIHtcXHJcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogLTIwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbiAgICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXHJcXG5cXHJcXG4gICAgICAgICNjbG9zZU1vZGFsIHtcXHJcXG4gICAgICAgICAgICAvLyBDbG9zZSBNb2RhbCBQaWN0dXJlXFxyXFxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcblxcclxcbiAgICAgICAgICAgIC5kZWZhdWx0X2NvbG9yIHtcXHJcXG4gICAgICAgICAgICAgICAgZmlsbDogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgICAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgICAgIC5jb2xvcl9wcmltYXJ5MSB7XFxyXFxuICAgICAgICAgICAgICAgIGZpbGw6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgICAgICAgICB9XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgICAgICBoMiB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgKiAxLjc3KTtcXHJcXG4gICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xcclxcbiAgICAgICAgICAgIHRleHQtYWxpZ246bGVmdDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIGlucHV0IHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS4yKTtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcXHJcXG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLzEuNSk7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcbiAgICAgICAgcmVzaXplOiB2ZXJ0aWNhbDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIGlucHV0LFxcclxcbiAgICBmb3JtIHRleHRhcmVhIHtcXHJcXG5cXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgaGVpZ2h0OiA2OHB4O1xcclxcbiAgICAgICAgYm9yZGVyOiBub25lO1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIGZvcm0gbGFiZWwge1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgZm9ybSBsYWJlbDpsYXN0LWNoaWxkIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmhlbHBfYmxpbmQge1xcclxcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG4uaGlkZV9jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1vZmY7XFxyXFxuXFxyXFxuICAgIEBrZXlmcmFtZXMgZmFkZS1vZmYge1xcclxcbiAgICAgICAgMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIDEwMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4uc2hvd19jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXHJcXG5cXHJcXG4gICAgQGtleWZyYW1lcyBmYWRlLWluIHtcXHJcXG4gICAgICAgIDAlIHtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjQ7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAxMDAlIHtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAxLjA7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcclxcblxcclxcbiAgICAubW9kYWxfY29udGFjdCB7XFxyXFxuICAgICAgICB3aWR0aDogNjUlO1xcclxcblxcclxcbiAgICAgICAgLm1vZGFsX2hlYWRlciB7XFxyXFxuICAgICAgICAgICAgaDIge1xcclxcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuNSk7XFxyXFxuICAgICAgICAgICAgfVxcclxcblxcclxcblxcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcclxcbiAgICAubW9kYWxfY29udGFjdCB7XFxyXFxuICAgICAgICB3aWR0aDogOTAlO1xcclxcblxcclxcbiAgICAgICAgLm1vZGFsX2hlYWRlciB7XFxyXFxuICAgICAgICAgICAgaDIge1xcclxcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuMik7XFxyXFxuICAgICAgICAgICAgfVxcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSBsYWJlbCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplIC8gMS4zO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSBpbnB1dCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplIC8gMS44O1xcclxcblxcclxcbiAgICAgICAgfVxcclxcblxcclxcblxcclxcblxcclxcbiAgICB9XFxyXFxufVwiLFwiLmZpc2hleWVfYnV0dG9uIHtcXHJcXG4gICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjgpO1xcclxcbiAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X2JpZztcXHJcXG4gICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICBwYWRkaW5nOiAxMXB4O1xcclxcbiAgICBtaW4td2lkdGg6IDE3MHB4O1xcclxcbiAgICBtaW4taGVpZ2h0OiA3MHB4O1xcclxcbiAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgIHRyYW5zaXRpb246IGNvbG9yIDAuNXMgZWFzZS1pbiwgYmFja2dyb3VuZC1jb2xvciAwLjVzIGVhc2UtaW47XFxyXFxuXFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfYmFja2dyb3VuZDtcXHJcXG4gICAgfVxcclxcbn1cIixcIi5waG90b2dyYXBoX2hlYWRlciB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBuby13cmFwLCBmbGVkLWVuZCwgc3BhY2UtYmV0d2VlbiwgbnVsbCk7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9zZWNvbmRhcnkyX2JnO1xcclxcbiAgICBoZWlnaHQ6IDMxM3B4O1xcclxcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICBAaW5jbHVkZSBwYWRkaW5nLWxlZnQtYW5kLXJpZ2h0KDMwcHgpO1xcclxcblxcclxcbiAgICBkaXY6bnRoLWNoaWxkKDMpIHtcXHJcXG4gICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICBoMSxcXHJcXG4gICAgaDIsXFxyXFxuICAgIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X3NtYWxsO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgxIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMS43Nyk7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAtMTVweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDIge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNTUpO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMyB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnQtc2l6ZSAvIDIpO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9zZWNvbmRhcnkyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2Fib3V0LFxcclxcbiAgICAucGhvdG9ncmFwaF9idXR0b24ge1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIG51bGwsIGNlbnRlciwgZmxleC1zdGFydCk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDMwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDgwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfYWJvdXQge1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXHJcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIHdyYXAsIGZsZWQtZW5kLCBzcGFjZS1iZXR3ZWVuLCBjZW50ZXIpO1xcclxcbiAgICAgICAgcGFkZGluZy10b3A6IDE1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMS4xNSk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgyIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS44KTtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250LXNpemUgLyAyLjIpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xcclxcblxcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIge1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIGZsZWQtZW5kLCBzcGFjZS1iZXR3ZWVuLCBjZW50ZXIpO1xcclxcblxcclxcbiAgICAgICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgICAgICBhbGlnbi1pdGVtczogaW5oZXJpdDtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDBweDtcXHJcXG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMjAwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyPi5waG90b2dyYXBoX2Fib3V0IHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xcclxcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIgaDEsXFxyXFxuICAgIGgyLFxcclxcbiAgICBoMyB7XFxyXFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyPi5waG90b2dyYXBoZXJfY2FyZCB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxufVwiLFwiLnNlbGVjdF9idXR0b24ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1jb250ZW50OiBmbGV4LWVuZDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcblxcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDIwcHg7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMik7XFxyXFxuICAgIGJhY2tncm91bmQ6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiBub25lO1xcclxcbiAgICB3aWR0aDogMTcwcHg7XFxyXFxuICAgIGhlaWdodDogNzBweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcclxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXHJcXG4gICAgY29udGVudDogXFxcIj5cXFwiO1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XFxyXFxuICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS40NCk7XFxyXFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcclxcbiAgICBmbG9hdDogcmlnaHQ7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdF9maWx0ZXIge1xcclxcblxcclxcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLnNlbGVjdF9jb250ZW50IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDVweDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDVweDtcXHJcXG4gICAgbWluLXdpZHRoOiAxNjBweDtcXHJcXG4gICAgYm94LXNoYWRvdzogMHB4IDJweCA4cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXHJcXG4gICAgei1pbmRleDogMTtcXHJcXG5cXHJcXG5cXHJcXG4gICAgLndoaXRlbGluZSB7XFxyXFxuICAgICAgICB3aWR0aDogOTAlO1xcclxcbiAgICAgICAgaGVpZ2h0OiAxcHg7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiA1JTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhIHtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIpO1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICAgICAgcGFkZGluZzogMjBweDtcXHJcXG4gICAgICAgIHdpZHRoOiAxNzBweDtcXHJcXG4gICAgICAgIGhlaWdodDogNjBweDtcXHJcXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGE6aG92ZXIge1xcclxcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbjtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbi5zZWxlY3RfZmlsdGVyOmhvdmVyIC5zZWxlY3RfY29udGVudCB7XFxyXFxuXFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xcclxcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXHJcXG59XCIsXCIucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBudWxsLCBmbGV4LXN0YXJ0LCBzcGFjZS1hcm91bmQsIGJhc2VsaW5lKTtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfYmFja2dyb3VuZDtcXHJcXG4gICAgbWluLXdpZHRoOiAzNzZweDtcXHJcXG4gICAgbWluLWhlaWdodDogODlweDtcXHJcXG4gICAgYm90dG9tOiAwO1xcclxcbiAgICByaWdodDogMzhweDtcXHJcXG4gICAgei1pbmRleDogMjtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogLTIycHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4gICAgLnRvdGFsX2xpa2VzLFxcclxcbiAgICAucHJpY2VfcmF0ZV9kYWlseSB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNTUpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDMxcHg7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgICAgIHBhZGRpbmctdG9wOiAxOHB4O1xcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC50b3RhbF9saWtlczphZnRlciB7XFxyXFxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDVweDtcXHJcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCLimaVcXFwiO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjU1ICogMS4zMyk7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoZXJfc3RhdGlzdGljIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XCIsXCIubWVkaWFfY2FyZCB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBudWxsLCBudWxsLCBudWxsKTtcXHJcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcclxcbiAgICBtYXgtd2lkdGg6IDM1MHB4O1xcclxcblxcclxcbiAgICBpbWcsXFxyXFxuICAgIHZpZGVvIHtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIG1heC1oZWlnaHQ6IDMwMHB4O1xcclxcbiAgICAgICAgbWluLWhlaWdodDogMzAwcHg7XFxyXFxuICAgICAgICBvYmplY3QtZml0OiBjb3ZlcjtcXHJcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG5cXHJcXG4gICAgICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNTApO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuICAgIC5kZXRhaWxzIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBudWxsLCBudWxsLCBzcGFjZS1iZXR3ZWVuLCBiYXNlbGluZSk7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiA1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDYge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfc21hbGw7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNSk7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGg2Omxhc3QtY2hpbGQ6OmFmdGVyIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41ICogMS4yNSk7XFxyXFxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxyXFxuICAgICAgICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLm1lZGlhX2NhcmQgaW1nLFxcclxcbiAgICAubWVkaWFfY2FyZCB7XFxyXFxuICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxuICAgIH1cXHJcXG59XCIsXCIvLy8vIE1BSU4gUEFHRSAvLy8gXFxyXFxuLnBob3RvZ3JhcGhlcl9zZWN0aW9uIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXHJcXG4gICAgZ2FwOiA3MHB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiA3NXB4O1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiA3NXB4O1xcclxcbn1cXHJcXG5cXHJcXG4vLy8vLyBFTkQgTUFJTiBQQUdFIC8vIFxcclxcblxcclxcbi8vLy8vLy8vLy8vLy8vLy8gUEhPVE9HUkFQSEVSIFBBR0UgLy8vLy8vLyBcXHJcXG4ubWFyZ2luX2xlZnRfcmlnaHQge1xcclxcbiAgICBtYXJnaW46IDAgMTAwcHg7XFxyXFxufVxcclxcblxcclxcbi5maWx0ZXJfc2VjdGlvbiB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBudWxsLCBudWxsLCBudWxsLCBiYXNlbGluZSk7XFxyXFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcclxcblxcclxcbiAgICBoNTpmaXJzdC1jaGlsZCB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAyOHB4O1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250LXNpemUgLyAyKTtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5zZWxlY3RfZmlsdGVyIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuLm1lZGlhX3NlY3Rpb24ge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcclxcbiAgICByb3ctZ2FwOiAzMHB4O1xcclxcbiAgICBjb2x1bW4tZ2FwOiA5NXB4O1xcclxcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiA3NXB4O1xcclxcbn1cXHJcXG5cXHJcXG4vLy8vLy8vLy8vLy8vLyBFTkQgUEhPVE9HUkFQSEVSIFBBR0UgLy8vLy8vLy9cXHJcXG5cXHJcXG4vLy8vLy8vLy8vLy8vLy8vIDQwNCBQQUdFIC8vLy8vLy8gXFxyXFxuLkVSUk9SXzQwNCB7XFxyXFxuICAgIG1hcmdpbi10b3A6IDUlO1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXHJcXG4gICAgcGFkZGluZzogNDBweDtcXHJcXG5cXHJcXG4gICAgaDEge1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNSU7XFxyXFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemUgKiAyO1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNDBweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhIHtcXHJcXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gICAgICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGE6aG92ZXIge1xcclxcbiAgICAgICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuLy8vLy8vLy8vLy8vLy8gRU5EIDQwNCBQQUdFIC8vLy8vLy8vXCIsXCJmb290ZXIge1xcclxcbiAgICBoZWlnaHQ6IDJweDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICBtYXJnaW4tdG9wOiA3NXB4O1xcclxcbn1cIixcIkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9zZWN0aW9uLFxcclxcbiAgICAubWVkaWFfc2VjdGlvbiB7XFxyXFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxyXFxuXFxyXFxuICAgIGhlYWRlciB7XFxyXFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogNDBweDtcXHJcXG4gICAgICAgIGhlaWdodDogMTAwcHg7XFxyXFxuXFxyXFxuICAgICAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgLmxvZ28sXFxyXFxuICAgICAgICBoMSB7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS4yMCk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXHJcXG4gICAgICAgIG1hcmdpbjogMCAyMHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIC5maWx0ZXJfc2VjdGlvbiB7XFxyXFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoZXJfc2VjdGlvbiB7XFxyXFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLm1lZGlhX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbM10hLi9tYWluLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVszXSEuL21haW4uc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcImNvcmUtanMvc3RhYmxlXCI7XHJcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xyXG5cclxuaW1wb3J0ICcuLi8uLi9zY3NzL21haW4uc2Nzcyc7XHJcbmltcG9ydCB7IGdldFBob3RvZ3JhcGhlcnMsIGdldE1lZGlhcyB9IGZyb20gJy4uL3V0aWxzL2ZldGNoJztcclxuaW1wb3J0IHsgZGlzcGxheURhdGEgfSBmcm9tICcuLi9kYXRhL2Rpc3BsYXlEYXRhJztcclxuaW1wb3J0IHsgZGlzcGxheU1lZGlhIH0gZnJvbSAnLi4vZGF0YS9kaXNwbGF5TWVkaWEnO1xyXG5pbXBvcnQgeyBnZXRVcmxQYXJhbWV0ZXIgfSBmcm9tICcuLi91dGlscy9nZXRVcmxQYXJhbWV0ZXInO1xyXG5pbXBvcnQgeyBzb3J0QnlMaWtlcyB9IGZyb20gJy4uL3V0aWxzL3NvcnRCeSc7XHJcbmltcG9ydCB7IHNlbGVjdEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4uL3V0aWxzL3NlbGVjdEZpbHRlcic7XHJcbmltcG9ydCB7IG1vZGFsTWFzdGVyIH0gZnJvbSAnLi4vdXRpbHMvbW9kYWxNYXN0ZXInO1xyXG5cclxuXHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gaW5pdFByb2ZpbGUoaWRVUkwpIHtcclxuICAgIC8vIFRyeSB0byBnZXQgZGF0YSBmcm9tIHBob3RvZ3JhcGhlcnMgaWYgZXJyb3IgdGhlbiByZWRpcmVjdCB0byA0MDQgcGFnZVxyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyBTRVQgUGhvdG9ncmFwaGVyIFByb2ZpbGUgREFUQVxyXG4gICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlcnMgPSBhd2FpdCBnZXRQaG90b2dyYXBoZXJzKCk7XHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBwaG90b2dyYXBoZXIgRGlzcGxheVxyXG4gICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlclNlbGVjdGVkID0gYXdhaXQgZGlzcGxheURhdGEocGhvdG9ncmFwaGVycywgaWRVUkwpO1xyXG4gICAgICAgIC8vIEVORCBTRVQgUGhvdG9ncmFwaGVyIFByb2ZpbGUgRGF0YVxyXG5cclxuICAgICAgICBpZiAocGhvdG9ncmFwaGVyU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWN0aW9uIHByb2ZpbGUgaW5pdGnDqSBhdmVjIHN1Y2PDqHMgZGVwdWlzIGluaXRQcm9maWxlKClcIik7XHJcbiAgICAgICAgICAgIGluaXRDb250YWN0Rm9ybShwaG90b2dyYXBoZXJTZWxlY3RlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igbm8gc2VsZWN0ZWQgcGhvdG9ncmFwaGVyXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAvLyBJZiBpdCdzIGEgZmFpbCB0aGVuIHdlIHJlZGlyZWN0IHRvIDQwNCBFcnJvciBQYWdlIHNpbmNlICBpdCdzIHRoZSBtaW5pbWFsIGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICAvLyBBdG0gNDA0IGVycm9yIHBhZ2UgZG9lc24ndCBleGlzdHMgbXVzdCBiZSB3cml0ZSBsYXRlclxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJpbml0UHJvZmlsZSgpIGZhaWxlZCByZWRpcmVjdCB0byA0MDQgcGFnZVwiKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXRDb250YWN0Rm9ybShwaG90b2dyYXBoZXJTZWxlY3RlZCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBjb250YWN0Rm9ybU1vZGFsID0gbW9kYWxNYXN0ZXIoXCJib2R5XCIsIFwiaGVhZGVyXCIsIFwibWFpblwiLCBcImNvbnRhY3RfbW9kYWxcIik7IC8vIENyZWF0ZSBhIE1vZGVsIE1hc3RlclxyXG4gICAgICAgIGNvbnN0IG1vZGFsUGFnZSA9IGNvbnRhY3RGb3JtTW9kYWwubW9kYWxQYWdlOyAvLyBHZXQgbW9kZWxQYWdlIE9iamVjdFxyXG5cclxuICAgICAgICBjb250YWN0Rm9ybU1vZGFsLmFkZENvbnRhY3RGb3JtTGlzdGVuZXIobW9kYWxQYWdlKTsgLy8gQWRkIHNwZWNpZmljIGxpc3RlbmVyIHRvIENvbnRhY3QgRm9ybSBNb2RhbFxyXG5cclxuICAgICAgICBjb25zdCB0aXRsZU1vZGFsID0gYENvbnRhY3Rlei1tb2kgJHtwaG90b2dyYXBoZXJTZWxlY3RlZC5uYW1lfWA7IC8vIEJ1aWxkIHRoZSB0aXRsZSBNb2RhbFxyXG4gICAgICAgIGNvbnRhY3RGb3JtTW9kYWwuc2V0VGl0bGVNb2RhbChtb2RhbFBhZ2UsIFwiaDJcIiwgdGl0bGVNb2RhbCk7ICAvLyBTZXQgdGhlIHRpdGxlIE1vZGFsXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRm9ybXVsYWlyZSBjb250YWN0IGluaXRpw6kgYXZlYyBzdWNjw6hzIGRlcHVpcyBpbml0Q29udGFjdEZvcm0oKVwiKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAvLyBJZiBpdCdzIGEgZmFpbCB0aGVuIHdlIHJlZGlyZWN0IHRvIDQwNCBFcnJvciBQYWdlIHNpbmNlICBpdCdzIHRoZSBtaW5pbWFsIGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICAvLyBBdG0gNDA0IGVycm9yIHBhZ2UgZG9lc24ndCBleGlzdHMgbXVzdCBiZSB3cml0ZSBsYXRlclxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJpbml0Q29udGFjdEZvcm0oKSBmYWlsZWQgcmVkaXJlY3QgdG8gNDA0IHBhZ2VcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBpbml0TWVkaWEoaWRVUkwpIHtcclxuICAgIC8vIFRyeSB0byBnZXQgZGF0YSBmcm9tIG1lZGlhIGlmIGVycm9yIHRoZW4gcmVkaXJlY3QgdG8gNDA0IHBhZ2VcclxuICAgIHRyeSB7XHJcblxyXG4gICAgICAgIC8vIEJ1aWxkIE1lZGlhcyBEYXRhXHJcbiAgICAgICAgY29uc3QgbWVkaWFzID0gYXdhaXQgZ2V0TWVkaWFzKCk7XHJcbiAgICAgICAgZGlzcGxheU1lZGlhKG1lZGlhcy5zb3J0KHNvcnRCeUxpa2VzKSwgXCIubWVkaWFfc2VjdGlvblwiLCBpZFVSTCk7IC8vIFNvcnQgYnkgZGVmYXVsdCBieSBsaWtlc1xyXG4gICAgICAgIC8vIEVuZCBidWlsZCBNZWRpYXMgRGF0YVxyXG5cclxuICAgICAgICAvLyBJbml0IHNlbGVjdEZpbHRlciBDb21wb25lbnQgYW5kIGhpcyBiZWhhdmlvciwgbmVlZCB0byBwcm92aWRlIHRoZSBEYXRhIHRvIGZpbHRlclxyXG4gICAgICAgIHNlbGVjdEZpbHRlckNvbXBvbmVudChtZWRpYXMsIGlkVVJMKTtcclxuXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VjdGlvbiBtw6lkaWEgaW5pdGnDqSBhdmVjIHN1Y2PDqHMgZGVwdWlzIGluaXRNYWluKClcIik7XHJcblxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gaW5pdE1haW4oKSB7XHJcbiAgICAvLyBXZSBXYWl0IGZvciBnZXRVcmxQYXJhbWV0ZXIoKSB0byBiZSBjb21wbGV0ZSB0aGVuIHdlIHJ1biB0YXNrcyBmb3IgZ2VuZXJhdGUgcGFnZVxyXG4gICAgY29uc3QgaWRVUkwgPSBhd2FpdCBnZXRVcmxQYXJhbWV0ZXIoXCJpZFwiKTtcclxuICAgIGluaXRQcm9maWxlKGlkVVJMKTtcclxuICAgIGluaXRNZWRpYShpZFVSTCk7XHJcbn1cclxuXHJcblxyXG5pbml0TWFpbigpOyBcclxuIl0sIm5hbWVzIjpbImlzQ2FsbGFibGUiLCJyZXF1aXJlIiwidHJ5VG9TdHJpbmciLCIkVHlwZUVycm9yIiwiVHlwZUVycm9yIiwibW9kdWxlIiwiZXhwb3J0cyIsImFyZ3VtZW50IiwiaXNPYmplY3QiLCIkU3RyaW5nIiwiU3RyaW5nIiwidG9JbmRleGVkT2JqZWN0IiwidG9BYnNvbHV0ZUluZGV4IiwibGVuZ3RoT2ZBcnJheUxpa2UiLCJjcmVhdGVNZXRob2QiLCJJU19JTkNMVURFUyIsIiR0aGlzIiwiZWwiLCJmcm9tSW5kZXgiLCJPIiwibGVuZ3RoIiwiaW5kZXgiLCJ2YWx1ZSIsImluY2x1ZGVzIiwiaW5kZXhPZiIsInVuY3VycnlUaGlzIiwic2xpY2UiLCJ0b1N0cmluZyIsInN0cmluZ1NsaWNlIiwiaXQiLCJoYXNPd24iLCJvd25LZXlzIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlIiwiZGVmaW5lUHJvcGVydHlNb2R1bGUiLCJ0YXJnZXQiLCJzb3VyY2UiLCJleGNlcHRpb25zIiwia2V5cyIsImRlZmluZVByb3BlcnR5IiwiZiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImkiLCJrZXkiLCJERVNDUklQVE9SUyIsImNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciIsIm9iamVjdCIsImJpdG1hcCIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIm1ha2VCdWlsdEluIiwibmFtZSIsImRlc2NyaXB0b3IiLCJnZXQiLCJnZXR0ZXIiLCJzZXQiLCJzZXR0ZXIiLCJkZWZpbmVHbG9iYWxQcm9wZXJ0eSIsIm9wdGlvbnMiLCJzaW1wbGUiLCJ1bmRlZmluZWQiLCJnbG9iYWwiLCJ1bnNhZmUiLCJlcnJvciIsIm5vbkNvbmZpZ3VyYWJsZSIsIm5vbldyaXRhYmxlIiwiT2JqZWN0IiwiZmFpbHMiLCJkb2N1bWVudCIsIkVYSVNUUyIsImNyZWF0ZUVsZW1lbnQiLCJ1c2VyQWdlbnQiLCJ0ZXN0IiwiY2xhc3NvZiIsInByb2Nlc3MiLCJnZXRCdWlsdEluIiwiRGVubyIsInZlcnNpb25zIiwidmVyc2lvbiIsInY4IiwibWF0Y2giLCJzcGxpdCIsImNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSIsImRlZmluZUJ1aWx0SW4iLCJjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzIiwiaXNGb3JjZWQiLCJUQVJHRVQiLCJHTE9CQUwiLCJTVEFUSUMiLCJzdGF0IiwiRk9SQ0VEIiwidGFyZ2V0UHJvcGVydHkiLCJzb3VyY2VQcm9wZXJ0eSIsInByb3RvdHlwZSIsImRvbnRDYWxsR2V0U2V0IiwiZm9yY2VkIiwic2hhbSIsImV4ZWMiLCJOQVRJVkVfQklORCIsIkZ1bmN0aW9uUHJvdG90eXBlIiwiRnVuY3Rpb24iLCJhcHBseSIsImNhbGwiLCJSZWZsZWN0IiwiYmluZCIsImFyZ3VtZW50cyIsImFDYWxsYWJsZSIsImZuIiwidGhhdCIsImhhc093blByb3BlcnR5IiwiZ2V0RGVzY3JpcHRvciIsIlBST1BFUiIsInNvbWV0aGluZyIsIkNPTkZJR1VSQUJMRSIsImFGdW5jdGlvbiIsIm5hbWVzcGFjZSIsIm1ldGhvZCIsImlzTnVsbE9yVW5kZWZpbmVkIiwiViIsIlAiLCJmdW5jIiwiY2hlY2siLCJNYXRoIiwiZ2xvYmFsVGhpcyIsIndpbmRvdyIsInNlbGYiLCJ0b09iamVjdCIsImEiLCIkT2JqZWN0IiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJzdG9yZSIsImZ1bmN0aW9uVG9TdHJpbmciLCJpbnNwZWN0U291cmNlIiwiTkFUSVZFX1dFQUtfTUFQIiwic2hhcmVkIiwic2hhcmVkS2V5IiwiaGlkZGVuS2V5cyIsIk9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEIiwiV2Vha01hcCIsImhhcyIsImVuZm9yY2UiLCJnZXR0ZXJGb3IiLCJUWVBFIiwic3RhdGUiLCJ0eXBlIiwid21nZXQiLCJ3bWhhcyIsIndtc2V0IiwibWV0YWRhdGEiLCJmYWNhZGUiLCJTVEFURSIsInJlcGxhY2VtZW50IiwiZmVhdHVyZSIsImRldGVjdGlvbiIsImRhdGEiLCJub3JtYWxpemUiLCJQT0xZRklMTCIsIk5BVElWRSIsInN0cmluZyIsInJlcGxhY2UiLCJ0b0xvd2VyQ2FzZSIsImRvY3VtZW50QWxsIiwiYWxsIiwiU1BFQ0lBTF9ET0NVTUVOVF9BTEwiLCJpc1Byb3RvdHlwZU9mIiwiVVNFX1NZTUJPTF9BU19VSUQiLCIkU3ltYm9sIiwidG9MZW5ndGgiLCJvYmoiLCJDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSIsIkludGVybmFsU3RhdGVNb2R1bGUiLCJlbmZvcmNlSW50ZXJuYWxTdGF0ZSIsImdldEludGVybmFsU3RhdGUiLCJDT05GSUdVUkFCTEVfTEVOR1RIIiwiVEVNUExBVEUiLCJhcml0eSIsImNvbnN0cnVjdG9yIiwiam9pbiIsImNlaWwiLCJmbG9vciIsInRydW5jIiwieCIsIm4iLCJJRThfRE9NX0RFRklORSIsIlY4X1BST1RPVFlQRV9ERUZJTkVfQlVHIiwiYW5PYmplY3QiLCJ0b1Byb3BlcnR5S2V5IiwiJGRlZmluZVByb3BlcnR5IiwiJGdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIkVOVU1FUkFCTEUiLCJXUklUQUJMRSIsIkF0dHJpYnV0ZXMiLCJjdXJyZW50IiwicHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUiLCJpbnRlcm5hbE9iamVjdEtleXMiLCJlbnVtQnVnS2V5cyIsImNvbmNhdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJwdXNoIiwibmFtZXMiLCJyZXN1bHQiLCIkcHJvcGVydHlJc0VudW1lcmFibGUiLCJOQVNIT1JOX0JVRyIsImlucHV0IiwicHJlZiIsInZhbCIsInZhbHVlT2YiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlIiwiaGFzSW5kaWNlcyIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJkb3RBbGwiLCJ1bmljb2RlIiwidW5pY29kZVNldHMiLCJzdGlja3kiLCJ1aWQiLCJTSEFSRUQiLCJJU19QVVJFIiwibW9kZSIsImNvcHlyaWdodCIsImxpY2Vuc2UiLCJWOF9WRVJTSU9OIiwic3ltYm9sIiwiU3ltYm9sIiwiaHRtbCIsImFycmF5U2xpY2UiLCJ2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aCIsIklTX0lPUyIsIklTX05PREUiLCJzZXRJbW1lZGlhdGUiLCJjbGVhciIsImNsZWFySW1tZWRpYXRlIiwiRGlzcGF0Y2giLCJNZXNzYWdlQ2hhbm5lbCIsImNvdW50ZXIiLCJxdWV1ZSIsIk9OUkVBRFlTVEFURUNIQU5HRSIsImxvY2F0aW9uIiwiZGVmZXIiLCJjaGFubmVsIiwicG9ydCIsInJ1biIsImlkIiwicnVubmVyIiwibGlzdGVuZXIiLCJldmVudCIsInBvc3QiLCJwb3N0TWVzc2FnZSIsInByb3RvY29sIiwiaG9zdCIsImhhbmRsZXIiLCJhcmdzIiwibmV4dFRpY2siLCJub3ciLCJwb3J0MiIsInBvcnQxIiwib25tZXNzYWdlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImltcG9ydFNjcmlwdHMiLCJhcHBlbmRDaGlsZCIsInJlbW92ZUNoaWxkIiwic2V0VGltZW91dCIsInRvSW50ZWdlck9ySW5maW5pdHkiLCJtYXgiLCJtaW4iLCJpbnRlZ2VyIiwiSW5kZXhlZE9iamVjdCIsInJlcXVpcmVPYmplY3RDb2VyY2libGUiLCJudW1iZXIiLCJpc1N5bWJvbCIsImdldE1ldGhvZCIsIm9yZGluYXJ5VG9QcmltaXRpdmUiLCJ3ZWxsS25vd25TeW1ib2wiLCJUT19QUklNSVRJVkUiLCJleG90aWNUb1ByaW0iLCJ0b1ByaW1pdGl2ZSIsInBvc3RmaXgiLCJyYW5kb20iLCJOQVRJVkVfU1lNQk9MIiwiaXRlcmF0b3IiLCJwYXNzZWQiLCJyZXF1aXJlZCIsIldlbGxLbm93blN5bWJvbHNTdG9yZSIsInN5bWJvbEZvciIsImNyZWF0ZVdlbGxLbm93blN5bWJvbCIsIndpdGhvdXRTZXR0ZXIiLCJkZXNjcmlwdGlvbiIsImRlZmluZUJ1aWx0SW5BY2Nlc3NvciIsInJlZ0V4cEZsYWdzIiwiUmVnRXhwIiwiUmVnRXhwUHJvdG90eXBlIiwiSU5ESUNFU19TVVBQT1JUIiwiY2FsbHMiLCJleHBlY3RlZCIsImFkZEdldHRlciIsImNociIsInBhaXJzIiwiJCIsImNzc1dpdGhNYXBwaW5nVG9TdHJpbmciLCJsaXN0IiwibWFwIiwiaXRlbSIsImNvbnRlbnQiLCJuZWVkTGF5ZXIiLCJtb2R1bGVzIiwibWVkaWEiLCJkZWR1cGUiLCJzdXBwb3J0cyIsImxheWVyIiwiYWxyZWFkeUltcG9ydGVkTW9kdWxlcyIsImsiLCJfayIsImNzc01hcHBpbmciLCJidG9hIiwiYmFzZTY0IiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJKU09OIiwic3RyaW5naWZ5Iiwic291cmNlTWFwcGluZyIsInNvdXJjZVVSTHMiLCJzb3VyY2VzIiwic291cmNlUm9vdCIsInBob3RvZ3JhcGhlckZhY3RvcnkiLCJkaXNwbGF5RGF0YSIsInBob3RvZ3JhcGhlcnMiLCJwaG90b2dyYXBoZXJTZWxlY3RlZCIsImZvckVhY2giLCJwaG90b2dyYXBoZXIiLCJlbnYiLCJOT0RFX0VOViIsImNvbnNvbGUiLCJsb2ciLCJwaG90b2dyYXBoZXJNb2RlbCIsInNldFBob3RvZ3JhcGhlckhlYWRlciIsInNldFN0aWNreUJhclByaWNlIiwiZGlzcGxheURhdGFBbGwiLCJxdWVyeVNlbGVjdG9yIiwicGhvdG9ncmFwaGVyc1NlY3Rpb24iLCJ1c2VyQ2FyZERPTSIsImdldFVzZXJDYXJkRE9NIiwibWVkaWFGYWN0b3J5Iiwic2V0SW5uZXJIdG1sIiwiZGlzcGxheU1lZGlhIiwibWVkaWFzIiwicGhvdG9ncmFwaGVySWQiLCJ0b3RhbExpa2VzIiwibWVkaWFzU2VjdGlvbiIsIm1lZGlhTW9kZWwiLCJtZWRpYURPTSIsImdldE1lZGlhRE9NIiwibGlrZXMiLCJ3YXJuIiwiZG9tIiwidGl0bGUiLCJpbWFnZSIsInZpZGVvIiwibW92aWUiLCJwaWN0dXJlIiwiaGFzUGhvdG9ncmFwaGVyIiwiaGFzQ29udGVudCIsImFydGljbGUiLCJzZXRBdHRyaWJ1dGUiLCJsaW5rRWxlbWVudCIsImJ1aWxkRWxlbWVudCIsInNldEFyaWFsTGFiZWwiLCJpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudCIsImluc2VydFZpZGVvSW5zaWRlRWxlbWVudCIsInRpdGxlX2g2IiwibGlrZXNfaDYiLCJpbnNlcnRIVE1MQWZ0ZXJFbGVtZW50IiwiY2l0eSIsImNvdW50cnkiLCJ0YWdsaW5lIiwicG9ydHJhaXQiLCJwcmljZSIsImltZ1Byb2ZpbGUiLCJlbGVtZW50IiwiYWx0IiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiYXJpYUxhYmVsIiwiYmFsaXNlIiwidGV4dENvbnRlbnQiLCJhcmlhbGFiZWwiLCJ0ZXh0ZSIsInRleHRlRWxlbWVudCIsImlubmVySFRNTCIsImZldGNoSlNPTiIsInVybCIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsIkVycm9yIiwianNvblJlc3BvbnNlIiwianNvbiIsImdldFBob3RvZ3JhcGhlcnMiLCJnZXRNZWRpYXMiLCJnZXRVcmxQYXJhbWV0ZXIiLCJwYXJhbWV0ZXIiLCJmdWxsVXJsIiwiaHJlZiIsIlVSTCIsInBhcmFtZXRlclZhbHVlIiwic2VhcmNoUGFyYW1zIiwibW9kYWxNYXN0ZXIiLCJib2R5VGFnIiwiaGVhZGVyVGFnIiwibWFpblRhZyIsIm1vZGFsSUQiLCJiYWNrZ3JvdW5kUGFnZSIsImJvZHlIVE1MIiwiaGVhZGVySFRNTCIsIm1haW5IVE1MIiwibW9kYWxQYWdlIiwibW9kYWxIVE1MIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2aXNpYmxlIiwiYWRkQ29udGFjdEZvcm1MaXN0ZW5lciIsIm9wZW5Nb2RhbCIsImNsb3NlTW9kYWwiLCJwcmV2ZW50RGVmYXVsdCIsInNlbmRNZXNzYWdlIiwiYWRkS2V5Ym9hcmRMaXN0ZW5lciIsIm9ua2V5ZG93biIsInNldFRpdGxlTW9kYWwiLCJ0YWdIVE1MIiwidGl0bGVNb2RhbCIsImVmZmVjdEFuaW1hdGlvbiIsImhpZGVjbGFzcyIsInNob3djbGFzcyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInN0eWxlIiwiZGlzcGxheSIsImZvY3VzIiwicmVtb3ZlQXR0cmlidXRlIiwiYWxsSW5wdXRzIiwicXVlcnlTZWxlY3RvckFsbCIsImFsbFRleHRBcmVhIiwiZnVsbG1lc3NhZ2UiLCJ0ZXh0YXJlYSIsImFsZXJ0Iiwic29ydEJ5TGlrZXMiLCJzb3J0QnlEYXRlIiwic29ydEJ5VGl0bGUiLCJzZWxlY3RGaWx0ZXJDb21wb25lbnQiLCJpZFVSTCIsInNlbGVjdEZpbHRlckJ1dHRvbiIsInNlbGVjdEZpbHRlclNlbGVjdDEiLCJzZWxlY3RGaWx0ZXJTZWxlY3QyIiwiaGFuZGxlRmlsdGVyQWN0aW9uIiwic2VsZWN0ZWRJdGVtIiwic29ydCIsImIiLCJkYXRlIiwiaW5pdFByb2ZpbGUiLCJpbml0Q29udGFjdEZvcm0iLCJlIiwiY29udGFjdEZvcm1Nb2RhbCIsImluaXRNZWRpYSIsImluaXRNYWluIl0sInNvdXJjZVJvb3QiOiIifQ==