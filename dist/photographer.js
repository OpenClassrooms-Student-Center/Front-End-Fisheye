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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n/** Used to load all variables for this project about SCSS **/ /** FONT **/\n/** END FONT **/\n/** COLOR VARIABLES **/\n/** END COLOR VARIABLES **/\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\n/********************** GENERAL **********************/\nhtml,\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: \"DM Sans\", sans-serif;\n  animation: 1s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/********************** END GENERAL **********************/\n/** IMPORT MIXIN **/\n/** IMPORT HEADER STYLES **/\nheader {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 120px;\n}\nheader h1 {\n  color: #901C1C;\n  top: 44px;\n  margin-right: 100px;\n  font-weight: 400;\n  font-size: 36px;\n  line-height: 47px;\n}\nheader .logo,\nheader .logo_photographer {\n  height: 50px;\n}\nheader .logo {\n  margin-left: 115px;\n}\nheader .logo_photographer {\n  margin-left: 100px;\n  margin-top: 10px;\n}\n\n/** IMPORT PHOTOGRAPHERS CARDS **/\n.photographer_card {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  justify-self: center;\n}\n.photographer_card img {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  transition: box-shadow 1s;\n  height: 200px;\n  width: 200px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.photographer_card img:hover {\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.photographer_card h2,\n.photographer_card h3,\n.photographer_card h4,\n.photographer_card h5 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n}\n.photographer_card h2 {\n  margin-top: 20px;\n  color: #D3573C;\n  font-size: 36px;\n}\n.photographer_card h3 {\n  font-size: 13.0010834236px;\n  line-height: 17px;\n  color: #901C1C;\n}\n.photographer_card h4 {\n  margin-top: 2px;\n  font-size: 10px;\n  line-height: 13px;\n  color: #000000;\n}\n.photographer_card h5 {\n  margin-top: 2px;\n  font-size: 9px;\n  line-height: 12px;\n  text-align: center;\n  color: #757575;\n}\n\n@media (max-width: 1100px) {\n  .photographer_card h3 {\n    font-size: 16.9014084507px;\n    margin-top: 10px;\n  }\n  .photographer_card h4 {\n    font-size: 13px;\n    margin-top: 10px;\n  }\n  .photographer_card h5 {\n    font-size: 11.7px;\n    margin-top: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_card h3 {\n    font-size: 19.5016251354px;\n  }\n  .photographer_card h4 {\n    font-size: 15px;\n  }\n  .photographer_card h5 {\n    font-size: 13.5px;\n  }\n  .photographer_card img {\n    width: 230px;\n    height: 230px;\n  }\n}\n/** IMPORT MODAL COMPONENT **/\n.modal_contact {\n  display: none;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  border-radius: 5px;\n  background-color: #DB8876;\n  align-items: baseline;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-between;\n  padding: 35px;\n  margin: auto;\n}\n.modal_contact .modal_header {\n  justify-content: space-between;\n  width: 100%;\n  margin-top: -20px;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: baseline;\n}\n.modal_contact .modal_header #closeModal {\n  cursor: pointer;\n}\n.modal_contact .modal_header #closeModal .default_color {\n  fill: white;\n}\n.modal_contact .modal_header #closeModal .color_primary1 {\n  fill: #901C1C;\n}\n.modal_contact .modal_header h2 {\n  font-size: 63.72px;\n  font-weight: normal;\n}\n.modal_contact form input {\n  font-size: 30px;\n  margin-bottom: 5px;\n  padding: 10px;\n}\n.modal_contact form textarea {\n  margin-top: 15px;\n  font-size: 24px;\n  margin-bottom: 20px;\n  resize: vertical;\n}\n.modal_contact form input,\n.modal_contact form textarea {\n  width: 100%;\n  height: 68px;\n  border: none;\n  border-radius: 5px;\n}\n.modal_contact form label {\n  color: #000000;\n  font-size: 36px;\n}\n.modal_contact form label:last-child {\n  margin-top: 15px;\n}\n.modal_contact .help_blind {\n  display: none;\n}\n\n.hide_content {\n  animation: 0.5s ease-in forwards fade-off;\n}\n@keyframes fade-off {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.4;\n  }\n}\n\n.show_content {\n  animation: 0.5s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0.4;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/** IMPORT CONTACT BUTTON COMPONENT **/\n.fisheye_button {\n  font-size: 20px;\n  font-weight: 700;\n  font-family: \"DM Sans\", sans-serif;\n  color: white;\n  padding: 11px;\n  min-width: 170px;\n  min-height: 70px;\n  border: none;\n  background-color: #901C1C;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: color 0.5s ease-in, background-color 0.5s ease-in;\n}\n.fisheye_button:hover {\n  color: #000000;\n  background-color: #DB8876;\n}\n\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\n.photograph_header {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: no-wrap;\n  align-content: fled-end;\n  justify-content: space-between;\n  background-color: #FAFAFA;\n  height: 313px;\n  margin-top: 10px;\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.photograph_header div:nth-child(3) {\n  margin-right: 20px;\n}\n.photograph_header h1,\n.photograph_header h2,\n.photograph_header h3 {\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 400;\n}\n.photograph_header h1 {\n  font-size: 63.72px;\n  margin-bottom: -15px;\n  color: #D3573C;\n}\n.photograph_header h2 {\n  margin-top: 15px;\n  margin-bottom: 20px;\n  font-size: 23.2258064516px;\n  color: #901C1C;\n}\n.photograph_header h3 {\n  font-size: 18px;\n  color: #525252;\n}\n.photograph_header .photograph_about,\n.photograph_header .photograph_button {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n}\n.photograph_header .photograph_button {\n  margin-top: 30px;\n  margin-right: 80px;\n}\n.photograph_header .photograph_about {\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\n@media (max-width: 1100px) {\n  .photograph_header {\n    background-color: white;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n    padding-top: 15px;\n  }\n  .photograph_header h1 {\n    font-size: 41.4px;\n  }\n  .photograph_header h2 {\n    font-size: 20px;\n  }\n  .photograph_header h3 {\n    font-size: 16.3636363636px;\n  }\n  .photograph_button {\n    margin-bottom: 30px;\n  }\n}\n@media (max-width: 800px) {\n  .photograph_header {\n    display: flex;\n    flex-direction: column;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .photograph_header .photograph_button {\n    align-items: inherit;\n    margin-right: 0px;\n    position: absolute;\n    margin-top: 200px;\n  }\n  .photograph_header > .photograph_about {\n    margin-left: 0;\n    align-items: center;\n  }\n  .photograph_header h1,\nh2,\nh3 {\n    text-align: center;\n  }\n  .photograph_header > .photographer_card {\n    display: none;\n  }\n}\n/** IMPORT SELECT FILTER COMPONENT **/\n.select_button {\n  display: flex;\n  align-content: flex-end;\n  align-items: center;\n  justify-content: space-between;\n  text-align: left;\n  padding-left: 20px;\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 18px;\n  background: #901C1C;\n  color: white;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border: none;\n  border-color: none;\n  width: 170px;\n  height: 70px;\n  cursor: pointer;\n}\n\n.select_button::after {\n  transition: transform 0.25s ease-in;\n  content: \">\";\n  transform: rotate(90deg);\n  font-size: 25px;\n  text-align: right;\n  float: right;\n  margin-right: 20px;\n}\n\n.select_filter {\n  position: relative;\n  display: inline-block;\n}\n\n.select_content {\n  display: none;\n  position: absolute;\n  background: #901C1C;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  min-width: 160px;\n  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n}\n.select_content .whiteline {\n  width: 90%;\n  height: 1px;\n  background-color: white;\n  margin-left: 5%;\n}\n.select_content a {\n  transition: all 0.5s ease-in;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-size: 18px;\n  color: white;\n  padding: 20px;\n  width: 170px;\n  height: 60px;\n  text-decoration: none;\n  display: block;\n}\n.select_content a:hover {\n  cursor: pointer;\n  transition: all 0.5s ease-in;\n  color: #000000;\n}\n\n.select_filter:hover .select_content {\n  display: block;\n}\n\n.select_filter:hover .select_button::after {\n  transform: rotate(-90deg);\n  transition: transform 0.25s ease-in;\n}\n\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\n.photographer_statistic {\n  display: flex;\n  flex-direction: row;\n  align-content: flex-start;\n  justify-content: space-around;\n  align-items: baseline;\n  position: fixed;\n  background-color: #DB8876;\n  min-width: 376px;\n  min-height: 89px;\n  bottom: 0;\n  right: 38px;\n  z-index: 2;\n  margin-bottom: -22px;\n  border-radius: 5px;\n}\n.photographer_statistic .total_likes,\n.photographer_statistic .price_rate_daily {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 23.2258064516px;\n  line-height: 31px;\n  color: #000000;\n  padding-top: 18px;\n}\n.photographer_statistic .total_likes:after {\n  padding-left: 5px;\n  content: \"♥\";\n  font-size: 30.8903225806px;\n}\n\n@media (max-width: 700px) {\n  .photographer_statistic {\n    display: none;\n  }\n}\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\n.media_card {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  max-width: 350px;\n}\n.media_card img,\n.media_card video {\n  transition: box-shadow 1s;\n  width: 100%;\n  max-height: 300px;\n  min-height: 300px;\n  object-fit: cover;\n  border-radius: 5px;\n}\n.media_card img:hover,\n.media_card video:hover {\n  transition: box-shadow 1s;\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.media_card .details {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: baseline;\n  margin-top: 5px;\n}\n.media_card h6 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n  font-size: 24px;\n  color: #901C1C;\n}\n.media_card h6:last-child::after {\n  font-size: 30px;\n  padding-left: 10px;\n  content: \"♥\";\n}\n\n@media (max-width: 600px) {\n  .media_card img,\n.media_card {\n    max-width: 100%;\n  }\n}\n/** IMPORT PAGES (other) Styles **/\n.photographer_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 70px;\n  margin-top: 75px;\n  margin-bottom: 75px;\n}\n\n.margin_left_right {\n  margin: 0 100px;\n}\n\n.filter_section {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n  margin-left: 0;\n}\n.filter_section h5:first-child {\n  margin-top: 20px;\n  margin-right: 28px;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-style: normal;\n  font-size: 18px;\n  color: #000000;\n}\n.filter_section .select_filter {\n  margin-top: 10px;\n}\n\n.media_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  row-gap: 30px;\n  column-gap: 95px;\n  margin-top: 20px;\n  margin-bottom: 75px;\n}\n\n/** IMPORT FOOTER STYLES **/\nfooter {\n  height: 2px;\n  width: 100%;\n  background-color: white;\n  margin-top: 75px;\n}\n\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\n (components Elements got their own Responsive Rules in their Stylesheet) **/\n@media (max-width: 1100px) {\n  .photographer_section,\n.media_section {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 800px) {\n  header {\n    flex-direction: column;\n    margin-top: 40px;\n    height: 100px;\n  }\n  header .logo_photographer {\n    margin-left: 0;\n  }\n  header .logo,\nheader h1 {\n    margin-left: 20px;\n    margin-right: 20px;\n    font-size: 30px;\n  }\n  .margin_left_right {\n    margin: 0 20px;\n  }\n  .filter_section {\n    justify-content: space-between;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_section {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 600px) {\n  .media_section {\n    grid-template-columns: 1fr;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/main.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_global.scss","webpack://./src/scss/pages/_header.scss","webpack://./src/scss/_mixin.scss","webpack://./src/scss/components/_photographer_cards.scss","webpack://./src/scss/components/modal/_contact.scss","webpack://./src/scss/components/_fisheye_button.scss","webpack://./src/scss/components/_photograph_header.scss","webpack://./src/scss/components/_select_filter.scss","webpack://./src/scss/components/_photographer_statistic.scss","webpack://./src/scss/components/_media_cards.scss","webpack://./src/scss/pages/_pages.scss","webpack://./src/scss/pages/_footer.scss","webpack://./src/scss/_responsive.scss"],"names":[],"mappings":"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","sourcesContent":["/** Used to load all variables for this project about SCSS **/\r\n@import \"_variables.scss\";\r\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\r\n@import \"_global.scss\";\r\n/** IMPORT MIXIN **/\r\n@import \"_mixin.scss\";\r\n/** IMPORT HEADER STYLES **/\r\n@import \"pages/header.scss\";\r\n/** IMPORT PHOTOGRAPHERS CARDS **/\r\n@import \"components/photographer_cards.scss\";\r\n/** IMPORT MODAL COMPONENT **/\r\n@import \"components/modal/_contact.scss\";\r\n@import \"components/modal/_lightbox.scss\";\r\n/** IMPORT CONTACT BUTTON COMPONENT **/\r\n@import \"components/fisheye_button.scss\";\r\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\r\n@import \"components/photograph_header.scss\";\r\n/** IMPORT SELECT FILTER COMPONENT **/\r\n@import \"components/select_filter.scss\";\r\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\r\n@import \"components/photographer_statistic.scss\";\r\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\r\n@import \"components/media_cards.scss\";\r\n/** IMPORT PAGES (other) Styles **/\r\n@import \"pages/pages.scss\";\r\n/** IMPORT FOOTER STYLES **/\r\n@import \"pages/footer.scss\";\r\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\r\n (components Elements got their own Responsive Rules in their Stylesheet) **/\r\n@import \"_responsive.scss\";","/** FONT **/\r\n$font_global: \"DM Sans\", sans-serif;\r\n$font_weight_small: 400;\r\n$font_weight_big: 700;\r\n\r\n$font_size: 36px;\r\n/** END FONT **/\r\n\r\n/** COLOR VARIABLES **/\r\n$default_color: white;\r\n$default_font_color: #000000;\r\n$color_gray: #757575;\r\n$color_primary1: #901C1C;\r\n$color_primary2: #D3573C;\r\n$color_secondary2: #525252;\r\n$color_secondary2_bg: #FAFAFA;\r\n$color_background: #DB8876;\r\n/** END COLOR VARIABLES **/","/********************** GENERAL **********************/\r\nhtml,\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n\r\n}\r\n\r\nbody {\r\n  font-family: $font_global;\r\n  animation: 1s ease-in forwards fade-in;\r\n\r\n  @keyframes fade-in {\r\n    0% {\r\n      opacity: 0;\r\n    }\r\n\r\n    100% {\r\n      opacity: 1.0;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n/********************** END GENERAL **********************/","header {\r\n    @include flex-basic(row, null, null, space-between, center);\r\n    height: 120px;\r\n\r\n\r\n    h1 {\r\n        color: $color_primary1;\r\n        top: 44px;\r\n        margin-right: 100px;\r\n        font-weight: $font_weight_small;\r\n        font-size: $font_size;\r\n        line-height: 47px;\r\n    }\r\n\r\n    .logo,\r\n    .logo_photographer {\r\n        height: 50px;\r\n    }\r\n\r\n    .logo {\r\n        margin-left: 115px;\r\n    }\r\n\r\n    .logo_photographer {\r\n        margin-left: 100px;\r\n        margin-top: 10px;\r\n    }\r\n}","@mixin flex-basic($flex-direction,\r\n  $flex-wrap,\r\n  $align-content,\r\n  $justify-content,\r\n  $align-items) {\r\n  display: flex;\r\n  flex-direction: $flex-direction;\r\n\r\n  @if ($flex-wrap) {\r\n    flex-wrap: $flex-wrap;\r\n  }\r\n\r\n  @if ($align-content) {\r\n    align-content: $align-content;\r\n  }\r\n\r\n  @if ($justify-content) {\r\n    justify-content: $justify-content;\r\n  }\r\n\r\n  @if ($align-items) {\r\n    align-items: $align-items;\r\n  }\r\n}\r\n\r\n// @mixin mask-crossbrowser($value) {\r\n//   -webkit-mask: $value;\r\n//   mask: $value;\r\n// }\r\n\r\n// @mixin margin-left-and-right($value) {\r\n//   margin-left: $value;\r\n//   margin-right: $value;\r\n// }\r\n\r\n@mixin padding-left-and-right($value) {\r\n  padding-left: $value;\r\n  padding-right: $value;\r\n}",".photographer_card {\r\n    @include flex-basic(column, null, null, center, center);\r\n    justify-self: center;\r\n\r\n    img {\r\n        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n        transition: box-shadow 1s;\r\n        height: 200px;\r\n        width: 200px;\r\n        border-radius: 50%;\r\n        object-fit: cover;\r\n\r\n        &:hover {\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n    h2,\r\n    h3,\r\n    h4,\r\n    h5 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 20px;\r\n        color: $color_primary2;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font_size / 2.769);\r\n        line-height: 17px;\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h4 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 3.6);\r\n        line-height: 13px;\r\n        color: $default_font_color;\r\n    }\r\n\r\n    h5 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 4);\r\n        line-height: 12px;\r\n        text-align: center;\r\n        color: $color_gray;\r\n    }\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.5);\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.5);\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.5);\r\n        }\r\n\r\n        img {\r\n            width: 230px;\r\n            height: 230px;\r\n        }\r\n    }\r\n\r\n}",".modal_contact {\r\n    display: none;\r\n    position: fixed;\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n    border-radius: 5px;\r\n    background-color: $color_background;\r\n    align-items: baseline;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 35px;\r\n    margin: auto;\r\n\r\n\r\n    .modal_header {\r\n        justify-content: space-between;\r\n        width: 100%;\r\n        margin-top: -20px;\r\n        margin-bottom: 10px;\r\n        display: flex;\r\n        align-items: baseline;\r\n\r\n        #closeModal {\r\n            // Close Modal Picture\r\n            cursor: pointer;\r\n\r\n            .default_color {\r\n                fill: $default_color;\r\n            }\r\n\r\n            .color_primary1 {\r\n                fill: $color_primary1;\r\n            }\r\n        }\r\n\r\n\r\n        h2 {\r\n            font-size: calc($font_size * 1.77);\r\n            font-weight: normal;\r\n        }\r\n    }\r\n\r\n    form input {\r\n        font-size: calc($font_size / 1.2);\r\n        margin-bottom: 5px;\r\n        padding: 10px;\r\n    }\r\n\r\n    form textarea {\r\n        margin-top: 15px;\r\n        font-size: calc($font_size /1.5);\r\n        margin-bottom: 20px;\r\n        resize: vertical;\r\n    }\r\n\r\n    form input,\r\n    form textarea {\r\n\r\n        width: 100%;\r\n        height: 68px;\r\n        border: none;\r\n        border-radius: 5px;\r\n\r\n    }\r\n\r\n\r\n    form label {\r\n        color: $default_font_color;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    form label:last-child {\r\n        margin-top: 15px;\r\n    }\r\n\r\n    .help_blind {\r\n        display: none;\r\n    }\r\n}\r\n\r\n\r\n.hide_content {\r\n    animation: 0.5s ease-in forwards fade-off;\r\n\r\n    @keyframes fade-off {\r\n        0% {\r\n            opacity: 1.0;\r\n        }\r\n\r\n        100% {\r\n            opacity: 0.4;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\r\n.show_content {\r\n    animation: 0.5s ease-in forwards fade-in;\r\n\r\n    @keyframes fade-in {\r\n        0% {\r\n            opacity: 0.4;\r\n        }\r\n\r\n        100% {\r\n            opacity: 1.0;\r\n        }\r\n    }\r\n\r\n}",".fisheye_button {\r\n    font-size: calc($font_size / 1.8);\r\n    font-weight: $font_weight_big;\r\n    font-family: $font_global;\r\n    color: $default_color;\r\n    padding: 11px;\r\n    min-width: 170px;\r\n    min-height: 70px;\r\n    border: none;\r\n    background-color: $color_primary1;\r\n    border-radius: 5px;\r\n    cursor: pointer;\r\n    transition: color 0.5s ease-in, background-color 0.5s ease-in;\r\n\r\n    &:hover {\r\n        color: $default_font_color;\r\n        background-color: $color_background;\r\n    }\r\n}",".photograph_header {\r\n    @include flex-basic(row, no-wrap, fled-end, space-between, null);\r\n    background-color: $color_secondary2_bg;\r\n    height: 313px;\r\n    margin-top: 10px;\r\n    @include padding-left-and-right(30px);\r\n\r\n    div:nth-child(3) {\r\n        margin-right: 20px;\r\n    }\r\n\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h1 {\r\n        font-size: calc($font_size * 1.77);\r\n        margin-bottom: -15px;\r\n        color: $color_primary2;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 15px;\r\n        margin-bottom: 20px;\r\n        font-size: calc($font_size / 1.55);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font-size / 2);\r\n        color: $color_secondary2;\r\n    }\r\n\r\n    .photograph_about,\r\n    .photograph_button {\r\n        @include flex-basic(column, null, null, center, flex-start);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-top: 30px;\r\n        margin-right: 80px;\r\n    }\r\n\r\n    .photograph_about {\r\n        margin-left: 20px;\r\n        margin-bottom: 10px;\r\n    }\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n    .photograph_header {\r\n        background-color: $default_color;\r\n        @include flex-basic(column, wrap, fled-end, space-between, center);\r\n        padding-top: 15px;\r\n    }\r\n\r\n    .photograph_header h1 {\r\n        font-size: calc($font_size * 1.15);\r\n    }\r\n\r\n    .photograph_header h2 {\r\n        font-size: calc($font_size / 1.8);\r\n\r\n    }\r\n\r\n    .photograph_header h3 {\r\n        font-size: calc($font-size / 2.2);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-bottom: 30px;\r\n\r\n\r\n    }\r\n\r\n\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .photograph_header {\r\n        @include flex-basic(column, null, fled-end, space-between, center);\r\n\r\n        .photograph_button {\r\n            align-items: inherit;\r\n            margin-right: 0px;\r\n            position: absolute;\r\n            margin-top: 200px;\r\n        }\r\n\r\n    }\r\n\r\n    .photograph_header>.photograph_about {\r\n        margin-left: 0;\r\n        align-items: center;\r\n    }\r\n\r\n    .photograph_header h1,\r\n    h2,\r\n    h3 {\r\n        text-align: center;\r\n    }\r\n\r\n    .photograph_header>.photographer_card {\r\n        display: none;\r\n    }\r\n\r\n\r\n}",".select_button {\r\n    display: flex;\r\n    align-content: flex-end;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n\r\n    text-align: left;\r\n    padding-left: 20px;\r\n    font-family: $font_global;\r\n    font-style: normal;\r\n    font-weight: $font_weight_big;\r\n    font-size: calc($font_size / 2);\r\n    background: $color_primary1;\r\n    color: $default_color;\r\n    border-top-left-radius: 5px;\r\n    border-top-right-radius: 5px;\r\n    border: none;\r\n    border-color: none;\r\n    width: 170px;\r\n    height: 70px;\r\n    cursor: pointer;\r\n}\r\n\r\n.select_button::after {\r\n    transition: transform 0.25s ease-in;\r\n    content: \">\";\r\n    transform: rotate(90deg);\r\n    font-size: calc($font_size / 1.44);\r\n    text-align: right;\r\n    float: right;\r\n    margin-right: 20px;\r\n\r\n}\r\n\r\n.select_filter {\r\n\r\n    position: relative;\r\n    display: inline-block;\r\n}\r\n\r\n\r\n.select_content {\r\n    display: none;\r\n    position: absolute;\r\n    background: $color_primary1;\r\n    border-bottom-left-radius: 5px;\r\n    border-bottom-right-radius: 5px;\r\n    min-width: 160px;\r\n    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\r\n    z-index: 1;\r\n\r\n\r\n    .whiteline {\r\n        width: 90%;\r\n        height: 1px;\r\n        background-color: $default_color;\r\n        margin-left: 5%;\r\n    }\r\n\r\n    a {\r\n        transition: all 0.5s ease-in;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 2);\r\n        color: $default_color;\r\n        padding: 20px;\r\n        width: 170px;\r\n        height: 60px;\r\n        text-decoration: none;\r\n        display: block;\r\n    }\r\n\r\n    a:hover {\r\n        cursor: pointer;\r\n        transition: all 0.5s ease-in;\r\n        color: $default_font_color;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n\r\n.select_filter:hover .select_content {\r\n\r\n    display: block;\r\n}\r\n\r\n.select_filter:hover .select_button::after {\r\n    transform: rotate(-90deg);\r\n    transition: transform 0.25s ease-in;\r\n}",".photographer_statistic {\r\n    @include flex-basic(row, null, flex-start, space-around, baseline);\r\n    position: fixed;\r\n    background-color: $color_background;\r\n    min-width: 376px;\r\n    min-height: 89px;\r\n    bottom: 0;\r\n    right: 38px;\r\n    z-index: 2;\r\n    margin-bottom: -22px;\r\n    border-radius: 5px;\r\n\r\n\r\n\r\n    .total_likes,\r\n    .price_rate_daily {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 1.55);\r\n        line-height: 31px;\r\n        color: $default_font_color;\r\n        padding-top: 18px;\r\n\r\n    }\r\n\r\n    .total_likes:after {\r\n        padding-left: 5px;\r\n        content: \"♥\";\r\n        font-size: calc($font_size / 1.55 * 1.33);\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_statistic {\r\n        display: none;\r\n    }\r\n\r\n}",".media_card {\r\n    @include flex-basic(column, null, null, null, null);\r\n    flex-wrap: wrap;\r\n    max-width: 350px;\r\n\r\n    img,\r\n    video {\r\n        transition: box-shadow 1s;\r\n        width: 100%;\r\n        max-height: 300px;\r\n        min-height: 300px;\r\n        object-fit: cover;\r\n        border-radius: 5px;\r\n\r\n        &:hover {\r\n            transition: box-shadow 1s;\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n\r\n\r\n    .details {\r\n        @include flex-basic(row, null, null, space-between, baseline);\r\n        margin-top: 5px;\r\n    }\r\n\r\n    h6 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n        font-size: calc($font_size / 1.5);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h6:last-child::after {\r\n        font-size: calc($font_size / 1.5 * 1.25);\r\n        padding-left: 10px;\r\n        content: \"♥\";\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_card img,\r\n    .media_card {\r\n        max-width: 100%;\r\n    }\r\n}","//// MAIN PAGE /// \r\n.photographer_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    gap: 70px;\r\n    margin-top: 75px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n///// END MAIN PAGE // \r\n\r\n//////////////// PHOTOGRAPHER PAGE /////// \r\n.margin_left_right {\r\n    margin: 0 100px;\r\n}\r\n\r\n.filter_section {\r\n    @include flex-basic(row, null, null, null, baseline);\r\n    margin-left: 0;\r\n\r\n    h5:first-child {\r\n        margin-top: 20px;\r\n        margin-right: 28px;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-style: normal;\r\n        font-size: calc($font-size / 2);\r\n        color: $default_font_color;\r\n    }\r\n\r\n    .select_filter {\r\n        margin-top: 10px;\r\n    }\r\n}\r\n\r\n.media_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    row-gap: 30px;\r\n    column-gap: 95px;\r\n    margin-top: 20px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n////////////// END PHOTOGRAPHER PAGE ////////\r\n\r\n","footer {\r\n    height: 2px;\r\n    width: 100%;\r\n    background-color: $default_color;\r\n    margin-top: 75px;\r\n}","@media (max-width: 1100px) {\r\n\r\n    .photographer_section,\r\n    .media_section {\r\n        grid-template-columns: 1fr 1fr;\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 800px) {\r\n\r\n    header {\r\n        flex-direction: column;\r\n        margin-top: 40px;\r\n        height: 100px;\r\n\r\n        .logo_photographer {\r\n            margin-left: 0;\r\n        }\r\n\r\n        .logo,\r\n        h1 {\r\n            margin-left: 20px;\r\n            margin-right: 20px;\r\n            font-size: calc($font_size / 1.20);\r\n        }\r\n    }\r\n\r\n    .margin_left_right {\r\n        margin: 0 20px;\r\n    }\r\n\r\n\r\n    .filter_section {\r\n        justify-content: space-between;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n\r\n    .photographer_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
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

    console.log("Section profile initié avec succès depuis initProfile()");
    initContactForm(photographerSelected);
  } catch (e) {
    console.error(e); // If it's a fail then we redirect to 404 Error Page since  it's the minimal functionality
    // Atm 404 error page doesn't exists must be write later

    console.log("Rediriger vers la page 404");
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

    console.log("Rediriger vers la page 404");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TSxNQUFNLFdBQVcsV0FBVyxNQUFNLEtBQUssTUFBTSxLQUFLLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFVBQVUsTUFBTSxNQUFNLFdBQVcsVUFBVSxXQUFXLFdBQVcsTUFBTSxPQUFPLFVBQVUsVUFBVSxVQUFVLFdBQVcsTUFBTSxNQUFNLFdBQVcsWUFBWSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxNQUFNLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sWUFBWSxLQUFLLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsT0FBTyxZQUFZLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxlQUFlLGFBQWEsV0FBVyxXQUFXLGNBQWMsZUFBZSxPQUFPLE1BQU0sV0FBVyxNQUFNLFFBQVEsV0FBVyxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLE9BQU8sT0FBTyxXQUFXLGFBQWEsZUFBZSxlQUFlLE9BQU8sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sS0FBSyxZQUFZLFVBQVUsYUFBYSxjQUFjLGVBQWUsZUFBZSxlQUFlLFlBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxLQUFLLE1BQU0sS0FBSyxXQUFXLGFBQWEsZUFBZSxlQUFlLGVBQWUsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLFFBQVEsV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxVQUFVLFVBQVUsT0FBTyxNQUFNLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLFlBQVksWUFBWSxXQUFXLFdBQVcsV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLFVBQVUsWUFBWSxXQUFXLE1BQU0sTUFBTSxXQUFXLFlBQVksYUFBYSxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxVQUFVLE1BQU0sTUFBTSxVQUFVLFdBQVcsV0FBVyxRQUFRLE1BQU0sVUFBVSxPQUFPLE1BQU0sV0FBVyxXQUFXLE9BQU8sWUFBWSxNQUFNLFVBQVUsWUFBWSxhQUFhLGVBQWUsZUFBZSxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE9BQU8sV0FBVyxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsT0FBTyxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNLFVBQVUsWUFBWSxXQUFXLFdBQVcsTUFBTSxPQUFPLFdBQVcsVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sT0FBTyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxhQUFhLGFBQWEsYUFB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SCxDQVZELENBV0EsT0FBTzhILENBQVAsRUFBVTtJQUNOL0gsT0FBTyxDQUFDOVEsS0FBUixDQUFjNlksQ0FBZCxFQURNLENBRU47SUFDQTs7SUFDQS9ILE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDRCQUFaO0VBQ0g7QUFDSjs7QUFHRCxlQUFlZ0ksU0FBZixDQUF5QmIsS0FBekIsRUFBZ0M7RUFDNUI7RUFDQSxJQUFJO0lBRUE7SUFDQSxNQUFNdkcsTUFBTSxHQUFHLE1BQU1vRCx1REFBUyxFQUE5QjtJQUNBckQsZ0VBQVksQ0FBQ0MsTUFBTSxDQUFDNkcsSUFBUCxDQUFZVixzREFBWixDQUFELEVBQTJCLGdCQUEzQixFQUE2Q0ksS0FBN0MsQ0FBWixDQUpBLENBSWlFO0lBQ2pFO0lBRUE7O0lBQ0FELDBFQUFxQixDQUFDdEcsTUFBRCxFQUFTdUcsS0FBVCxDQUFyQjtJQUdBcEgsT0FBTyxDQUFDQyxHQUFSLENBQVksb0RBQVo7RUFFSCxDQWJELENBYUUsT0FBTzhILENBQVAsRUFBVTtJQUNSL0gsT0FBTyxDQUFDOVEsS0FBUixDQUFjNlksQ0FBZDtFQUNIO0FBRUo7O0FBR0QsZUFBZUcsUUFBZixHQUEwQjtFQUN0QjtFQUNBLE1BQU1kLEtBQUssR0FBRyxNQUFNbEQsdUVBQWUsQ0FBQyxJQUFELENBQW5DO0VBQ0EyRCxXQUFXLENBQUNULEtBQUQsQ0FBWDtFQUNBYSxTQUFTLENBQUNiLEtBQUQsQ0FBVDtBQUNIOztBQUdEYyxRQUFRLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLWNhbGxhYmxlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1zbGljZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLXJhdy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbi1hY2Nlc3Nvci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZXNjcmlwdG9ycy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtaXMtaW9zLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS12OC12ZXJzaW9uLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VudW0tYnVnLWtleXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZXhwb3J0LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZhaWxzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWFwcGx5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1jYWxsLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLW5hbWUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1idWlsdC1pbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtbWV0aG9kLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hpZGRlbi1rZXlzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2h0bWwuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtZm9yY2VkLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1wdXJlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXN5bWJvbC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9sZW5ndGgtb2YtYXJyYXktbGlrZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9tYWtlLWJ1aWx0LWluLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL21hdGgtdHJ1bmMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vcmRpbmFyeS10by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3duLWtleXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVnZXhwLWZsYWdzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQta2V5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1zdG9yZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc3ltYm9sLWNvbnN0cnVjdG9yLWRldGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90YXNrLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tbGVuZ3RoLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RyeS10by1zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdWlkLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3Y4LXByb3RvdHlwZS1kZWZpbmUtYnVnLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3ZhbGlkYXRlLWFyZ3VtZW50cy1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2Vhay1tYXAtYmFzaWMtZGV0ZWN0aW9uLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5yZWdleHAuZmxhZ3MuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5jbGVhci1pbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5pbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5zZXQtaW1tZWRpYXRlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvZGF0YS9kaXNwbGF5RGF0YS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL2RhdGEvZGlzcGxheU1lZGlhLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvZmFjdG9yaWVzL21lZGlhRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL2ZhY3Rvcmllcy9waG90b2dyYXBoZXJGYWN0b3J5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvZG9tLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9nZXRVcmxQYXJhbWV0ZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9tb2RhbE1hc3Rlci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL3NlbGVjdEZpbHRlci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL3NvcnRCeS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3NzL21haW4uc2NzcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3NzL21haW4uc2Nzcz9iMzc5Iiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL3Bob3RvZ3JhcGhlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIHRyeVRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RyeS10by1zdHJpbmcnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBBc3NlcnQ6IElzQ2FsbGFibGUoYXJndW1lbnQpIGlzIHRydWVgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoaXNDYWxsYWJsZShhcmd1bWVudCkpIHJldHVybiBhcmd1bWVudDtcbiAgdGhyb3cgJFR5cGVFcnJvcih0cnlUb1N0cmluZyhhcmd1bWVudCkgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgJFN0cmluZyA9IFN0cmluZztcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgQXNzZXJ0OiBUeXBlKGFyZ3VtZW50KSBpcyBPYmplY3RgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoaXNPYmplY3QoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93ICRUeXBlRXJyb3IoJFN0cmluZyhhcmd1bWVudCkgKyAnIGlzIG5vdCBhbiBvYmplY3QnKTtcbn07XG4iLCJ2YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgbGVuZ3RoT2ZBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gbGVuZ3RoT2ZBcnJheUxpa2UoTyk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgIGlmICgoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykgJiYgT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiAgaW5kZXhPZjogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1bmN1cnJ5VGhpcyhbXS5zbGljZSk7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbnZhciB0b1N0cmluZyA9IHVuY3VycnlUaGlzKHt9LnRvU3RyaW5nKTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHN0cmluZ1NsaWNlKHRvU3RyaW5nKGl0KSwgOCwgLTEpO1xufTtcbiIsInZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIG93bktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3duLWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UsIGV4Y2VwdGlvbnMpIHtcbiAgdmFyIGtleXMgPSBvd25LZXlzKHNvdXJjZSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKCFoYXNPd24odGFyZ2V0LCBrZXkpICYmICEoZXhjZXB0aW9ucyAmJiBoYXNPd24oZXhjZXB0aW9ucywga2V5KSkpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTtcbiAgICB9XG4gIH1cbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciBtYWtlQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9tYWtlLWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgaWYgKGRlc2NyaXB0b3IuZ2V0KSBtYWtlQnVpbHRJbihkZXNjcmlwdG9yLmdldCwgbmFtZSwgeyBnZXR0ZXI6IHRydWUgfSk7XG4gIGlmIChkZXNjcmlwdG9yLnNldCkgbWFrZUJ1aWx0SW4oZGVzY3JpcHRvci5zZXQsIG5hbWUsIHsgc2V0dGVyOiB0cnVlIH0pO1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkuZih0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpO1xufTtcbiIsInZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIG1ha2VCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21ha2UtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVHbG9iYWxQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtZ2xvYmFsLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gIHZhciBzaW1wbGUgPSBvcHRpb25zLmVudW1lcmFibGU7XG4gIHZhciBuYW1lID0gb3B0aW9ucy5uYW1lICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5hbWUgOiBrZXk7XG4gIGlmIChpc0NhbGxhYmxlKHZhbHVlKSkgbWFrZUJ1aWx0SW4odmFsdWUsIG5hbWUsIG9wdGlvbnMpO1xuICBpZiAob3B0aW9ucy5nbG9iYWwpIHtcbiAgICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIGRlZmluZUdsb2JhbFByb3BlcnR5KGtleSwgdmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIW9wdGlvbnMudW5zYWZlKSBkZWxldGUgT1trZXldO1xuICAgICAgZWxzZSBpZiAoT1trZXldKSBzaW1wbGUgPSB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIGRlZmluZVByb3BlcnR5TW9kdWxlLmYoTywga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogIW9wdGlvbnMubm9uQ29uZmlndXJhYmxlLFxuICAgICAgd3JpdGFibGU6ICFvcHRpb25zLm5vbldyaXRhYmxlXG4gICAgfSk7XG4gIH0gcmV0dXJuIE87XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGRlZmluZVByb3BlcnR5KGdsb2JhbCwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gRGV0ZWN0IElFOCdzIGluY29tcGxldGUgZGVmaW5lUHJvcGVydHkgaW1wbGVtZW50YXRpb25cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9IDc7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIEVYSVNUUyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEVYSVNUUyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwidmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IC8oPzppcGFkfGlwaG9uZXxpcG9kKS4qYXBwbGV3ZWJraXQvaS50ZXN0KHVzZXJBZ2VudCk7XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzc29mKGdsb2JhbC5wcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCduYXZpZ2F0b3InLCAndXNlckFnZW50JykgfHwgJyc7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIERlbm8gPSBnbG9iYWwuRGVubztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucyB8fCBEZW5vICYmIERlbm8udmVyc2lvbjtcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4O1xudmFyIG1hdGNoLCB2ZXJzaW9uO1xuXG5pZiAodjgpIHtcbiAgbWF0Y2ggPSB2OC5zcGxpdCgnLicpO1xuICAvLyBpbiBvbGQgQ2hyb21lLCB2ZXJzaW9ucyBvZiBWOCBpc24ndCBWOCA9IENocm9tZSAvIDEwXG4gIC8vIGJ1dCB0aGVpciBjb3JyZWN0IHZlcnNpb25zIGFyZSBub3QgaW50ZXJlc3RpbmcgZm9yIHVzXG4gIHZlcnNpb24gPSBtYXRjaFswXSA+IDAgJiYgbWF0Y2hbMF0gPCA0ID8gMSA6ICsobWF0Y2hbMF0gKyBtYXRjaFsxXSk7XG59XG5cbi8vIEJyb3dzZXJGUyBOb2RlSlMgYHByb2Nlc3NgIHBvbHlmaWxsIGluY29ycmVjdGx5IHNldCBgLnY4YCB0byBgMC4wYFxuLy8gc28gY2hlY2sgYHVzZXJBZ2VudGAgZXZlbiBpZiBgLnY4YCBleGlzdHMsIGJ1dCAwXG5pZiAoIXZlcnNpb24gJiYgdXNlckFnZW50KSB7XG4gIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLyk7XG4gIGlmICghbWF0Y2ggfHwgbWF0Y2hbMV0gPj0gNzQpIHtcbiAgICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgaWYgKG1hdGNoKSB2ZXJzaW9uID0gK21hdGNoWzFdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmVyc2lvbjtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lR2xvYmFsUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eScpO1xudmFyIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG5cbi8qXG4gIG9wdGlvbnMudGFyZ2V0ICAgICAgICAgLSBuYW1lIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gIG9wdGlvbnMuZ2xvYmFsICAgICAgICAgLSB0YXJnZXQgaXMgdGhlIGdsb2JhbCBvYmplY3RcbiAgb3B0aW9ucy5zdGF0ICAgICAgICAgICAtIGV4cG9ydCBhcyBzdGF0aWMgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5wcm90byAgICAgICAgICAtIGV4cG9ydCBhcyBwcm90b3R5cGUgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5yZWFsICAgICAgICAgICAtIHJlYWwgcHJvdG90eXBlIG1ldGhvZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMuZm9yY2VkICAgICAgICAgLSBleHBvcnQgZXZlbiBpZiB0aGUgbmF0aXZlIGZlYXR1cmUgaXMgYXZhaWxhYmxlXG4gIG9wdGlvbnMuYmluZCAgICAgICAgICAgLSBiaW5kIG1ldGhvZHMgdG8gdGhlIHRhcmdldCwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLndyYXAgICAgICAgICAgIC0gd3JhcCBjb25zdHJ1Y3RvcnMgdG8gcHJldmVudGluZyBnbG9iYWwgcG9sbHV0aW9uLCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMudW5zYWZlICAgICAgICAgLSB1c2UgdGhlIHNpbXBsZSBhc3NpZ25tZW50IG9mIHByb3BlcnR5IGluc3RlYWQgb2YgZGVsZXRlICsgZGVmaW5lUHJvcGVydHlcbiAgb3B0aW9ucy5zaGFtICAgICAgICAgICAtIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgb3B0aW9ucy5lbnVtZXJhYmxlICAgICAtIGV4cG9ydCBhcyBlbnVtZXJhYmxlIHByb3BlcnR5XG4gIG9wdGlvbnMuZG9udENhbGxHZXRTZXQgLSBwcmV2ZW50IGNhbGxpbmcgYSBnZXR0ZXIgb24gdGFyZ2V0XG4gIG9wdGlvbnMubmFtZSAgICAgICAgICAgLSB0aGUgLm5hbWUgb2YgdGhlIGZ1bmN0aW9uIGlmIGl0IGRvZXMgbm90IG1hdGNoIHRoZSBrZXlcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgZGVmaW5lR2xvYmFsUHJvcGVydHkoVEFSR0VULCB7fSk7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0ID0gKGdsb2JhbFtUQVJHRVRdIHx8IHt9KS5wcm90b3R5cGU7XG4gIH1cbiAgaWYgKHRhcmdldCkgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgc291cmNlUHJvcGVydHkgPSBzb3VyY2Vba2V5XTtcbiAgICBpZiAob3B0aW9ucy5kb250Q2FsbEdldFNldCkge1xuICAgICAgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gICAgICB0YXJnZXRQcm9wZXJ0eSA9IGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZTtcbiAgICB9IGVsc2UgdGFyZ2V0UHJvcGVydHkgPSB0YXJnZXRba2V5XTtcbiAgICBGT1JDRUQgPSBpc0ZvcmNlZChHTE9CQUwgPyBrZXkgOiBUQVJHRVQgKyAoU1RBVElDID8gJy4nIDogJyMnKSArIGtleSwgb3B0aW9ucy5mb3JjZWQpO1xuICAgIC8vIGNvbnRhaW5lZCBpbiB0YXJnZXRcbiAgICBpZiAoIUZPUkNFRCAmJiB0YXJnZXRQcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodHlwZW9mIHNvdXJjZVByb3BlcnR5ID09IHR5cGVvZiB0YXJnZXRQcm9wZXJ0eSkgY29udGludWU7XG4gICAgICBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzKHNvdXJjZVByb3BlcnR5LCB0YXJnZXRQcm9wZXJ0eSk7XG4gICAgfVxuICAgIC8vIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgICBpZiAob3B0aW9ucy5zaGFtIHx8ICh0YXJnZXRQcm9wZXJ0eSAmJiB0YXJnZXRQcm9wZXJ0eS5zaGFtKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHNvdXJjZVByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cbiAgICBkZWZpbmVCdWlsdEluKHRhcmdldCwga2V5LCBzb3VyY2VQcm9wZXJ0eSwgb3B0aW9ucyk7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBhcHBseSA9IEZ1bmN0aW9uUHJvdG90eXBlLmFwcGx5O1xudmFyIGNhbGwgPSBGdW5jdGlvblByb3RvdHlwZS5jYWxsO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1yZWZsZWN0IC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFJlZmxlY3QgPT0gJ29iamVjdCcgJiYgUmVmbGVjdC5hcHBseSB8fCAoTkFUSVZFX0JJTkQgPyBjYWxsLmJpbmQoYXBwbHkpIDogZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY2FsbC5hcHBseShhcHBseSwgYXJndW1lbnRzKTtcbn0pO1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG52YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIGJpbmQgPSB1bmN1cnJ5VGhpcyh1bmN1cnJ5VGhpcy5iaW5kKTtcblxuLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCkge1xuICBhQ2FsbGFibGUoZm4pO1xuICByZXR1cm4gdGhhdCA9PT0gdW5kZWZpbmVkID8gZm4gOiBOQVRJVkVfQklORCA/IGJpbmQoZm4sIHRoYXQpIDogZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1mdW5jdGlvbi1wcm90b3R5cGUtYmluZCAtLSBzYWZlXG4gIHZhciB0ZXN0ID0gKGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSkuYmluZCgpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuIHR5cGVvZiB0ZXN0ICE9ICdmdW5jdGlvbicgfHwgdGVzdC5oYXNPd25Qcm9wZXJ0eSgncHJvdG90eXBlJyk7XG59KTtcbiIsInZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgY2FsbCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9CSU5EID8gY2FsbC5iaW5kKGNhbGwpIDogZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY2FsbC5hcHBseShjYWxsLCBhcmd1bWVudHMpO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyIGdldERlc2NyaXB0b3IgPSBERVNDUklQVE9SUyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG52YXIgRVhJU1RTID0gaGFzT3duKEZ1bmN0aW9uUHJvdG90eXBlLCAnbmFtZScpO1xuLy8gYWRkaXRpb25hbCBwcm90ZWN0aW9uIGZyb20gbWluaWZpZWQgLyBtYW5nbGVkIC8gZHJvcHBlZCBmdW5jdGlvbiBuYW1lc1xudmFyIFBST1BFUiA9IEVYSVNUUyAmJiAoZnVuY3Rpb24gc29tZXRoaW5nKCkgeyAvKiBlbXB0eSAqLyB9KS5uYW1lID09PSAnc29tZXRoaW5nJztcbnZhciBDT05GSUdVUkFCTEUgPSBFWElTVFMgJiYgKCFERVNDUklQVE9SUyB8fCAoREVTQ1JJUFRPUlMgJiYgZ2V0RGVzY3JpcHRvcihGdW5jdGlvblByb3RvdHlwZSwgJ25hbWUnKS5jb25maWd1cmFibGUpKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEVYSVNUUzogRVhJU1RTLFxuICBQUk9QRVI6IFBST1BFUixcbiAgQ09ORklHVVJBQkxFOiBDT05GSUdVUkFCTEVcbn07XG4iLCJ2YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIGJpbmQgPSBGdW5jdGlvblByb3RvdHlwZS5iaW5kO1xudmFyIGNhbGwgPSBGdW5jdGlvblByb3RvdHlwZS5jYWxsO1xudmFyIHVuY3VycnlUaGlzID0gTkFUSVZFX0JJTkQgJiYgYmluZC5iaW5kKGNhbGwsIGNhbGwpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9CSU5EID8gZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmbiAmJiB1bmN1cnJ5VGhpcyhmbik7XG59IDogZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmbiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNhbGwuYXBwbHkoZm4sIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciBhRnVuY3Rpb24gPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzQ2FsbGFibGUoYXJndW1lbnQpID8gYXJndW1lbnQgOiB1bmRlZmluZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG1ldGhvZCkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBhRnVuY3Rpb24oZ2xvYmFsW25hbWVzcGFjZV0pIDogZ2xvYmFsW25hbWVzcGFjZV0gJiYgZ2xvYmFsW25hbWVzcGFjZV1bbWV0aG9kXTtcbn07XG4iLCJ2YXIgYUNhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtY2FsbGFibGUnKTtcbnZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xuXG4vLyBgR2V0TWV0aG9kYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0bWV0aG9kXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChWLCBQKSB7XG4gIHZhciBmdW5jID0gVltQXTtcbiAgcmV0dXJuIGlzTnVsbE9yVW5kZWZpbmVkKGZ1bmMpID8gdW5kZWZpbmVkIDogYUNhbGxhYmxlKGZ1bmMpO1xufTtcbiIsInZhciBjaGVjayA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgJiYgaXQuTWF0aCA9PSBNYXRoICYmIGl0O1xufTtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbm1vZHVsZS5leHBvcnRzID1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tZ2xvYmFsLXRoaXMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSAnb2JqZWN0JyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdykgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFscyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmMgLS0gZmFsbGJhY2tcbiAgKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pKCkgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcblxudmFyIGhhc093blByb3BlcnR5ID0gdW5jdXJyeVRoaXMoe30uaGFzT3duUHJvcGVydHkpO1xuXG4vLyBgSGFzT3duUHJvcGVydHlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1oYXNvd25wcm9wZXJ0eVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWhhc293biAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5oYXNPd24gfHwgZnVuY3Rpb24gaGFzT3duKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5KHRvT2JqZWN0KGl0KSwga2V5KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignZG9jdW1lbnQnLCAnZG9jdW1lbnRFbGVtZW50Jyk7XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmtzIHRvIElFOCBmb3IgaXRzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFERVNDUklQVE9SUyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcbnZhciBzcGxpdCA9IHVuY3VycnlUaGlzKCcnLnNwbGl0KTtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3Ncbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyB0aHJvd3MgYW4gZXJyb3IgaW4gcmhpbm8sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9yaGluby9pc3N1ZXMvMzQ2XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgLS0gc2FmZVxuICByZXR1cm4gISRPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0KGl0LCAnJykgOiAkT2JqZWN0KGl0KTtcbn0gOiAkT2JqZWN0O1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxudmFyIGZ1bmN0aW9uVG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyhGdW5jdGlvbi50b1N0cmluZyk7XG5cbi8vIHRoaXMgaGVscGVyIGJyb2tlbiBpbiBgY29yZS1qc0AzLjQuMS0zLjQuNGAsIHNvIHdlIGNhbid0IHVzZSBgc2hhcmVkYCBoZWxwZXJcbmlmICghaXNDYWxsYWJsZShzdG9yZS5pbnNwZWN0U291cmNlKSkge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcoaXQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlLmluc3BlY3RTb3VyY2U7XG4iLCJ2YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlYWstbWFwLWJhc2ljLWRldGVjdGlvbicpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbnZhciBPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCA9ICdPYmplY3QgYWxyZWFkeSBpbml0aWFsaXplZCc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG52YXIgc2V0LCBnZXQsIGhhcztcblxudmFyIGVuZm9yY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGhhcyhpdCkgPyBnZXQoaXQpIDogc2V0KGl0LCB7fSk7XG59O1xuXG52YXIgZ2V0dGVyRm9yID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoIWlzT2JqZWN0KGl0KSB8fCAoc3RhdGUgPSBnZXQoaXQpKS50eXBlICE9PSBUWVBFKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkJyk7XG4gICAgfSByZXR1cm4gc3RhdGU7XG4gIH07XG59O1xuXG5pZiAoTkFUSVZFX1dFQUtfTUFQIHx8IHNoYXJlZC5zdGF0ZSkge1xuICB2YXIgc3RvcmUgPSBzaGFyZWQuc3RhdGUgfHwgKHNoYXJlZC5zdGF0ZSA9IG5ldyBXZWFrTWFwKCkpO1xuICB2YXIgd21nZXQgPSB1bmN1cnJ5VGhpcyhzdG9yZS5nZXQpO1xuICB2YXIgd21oYXMgPSB1bmN1cnJ5VGhpcyhzdG9yZS5oYXMpO1xuICB2YXIgd21zZXQgPSB1bmN1cnJ5VGhpcyhzdG9yZS5zZXQpO1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgaWYgKHdtaGFzKHN0b3JlLCBpdCkpIHRocm93IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgd21zZXQoc3RvcmUsIGl0LCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21nZXQoc3RvcmUsIGl0KSB8fCB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtaGFzKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGlmIChoYXNPd24oaXQsIFNUQVRFKSkgdGhyb3cgVHlwZUVycm9yKE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEKTtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoaXQsIFNUQVRFLCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gaGFzT3duKGl0LCBTVEFURSkgPyBpdFtTVEFURV0gOiB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGhhc093bihpdCwgU1RBVEUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGdldDogZ2V0LFxuICBoYXM6IGhhcyxcbiAgZW5mb3JjZTogZW5mb3JjZSxcbiAgZ2V0dGVyRm9yOiBnZXR0ZXJGb3Jcbn07XG4iLCIvLyBgSXNDYWxsYWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzY2FsbGFibGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiB0eXBlb2YgYXJndW1lbnQgPT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogaXNDYWxsYWJsZShkZXRlY3Rpb24pID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCIvLyB3ZSBjYW4ndCB1c2UganVzdCBgaXQgPT0gbnVsbGAgc2luY2Ugb2YgYGRvY3VtZW50LmFsbGAgc3BlY2lhbCBjYXNlXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLUlzSFRNTEREQS1pbnRlcm5hbC1zbG90LWFlY1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID09PSBudWxsIHx8IGl0ID09PSB1bmRlZmluZWQ7XG59O1xuIiwidmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIGRvY3VtZW50QWxsID0gdHlwZW9mIGRvY3VtZW50ID09ICdvYmplY3QnICYmIGRvY3VtZW50LmFsbDtcblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1Jc0hUTUxEREEtaW50ZXJuYWwtc2xvdFxudmFyIFNQRUNJQUxfRE9DVU1FTlRfQUxMID0gdHlwZW9mIGRvY3VtZW50QWxsID09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50QWxsICE9PSB1bmRlZmluZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gU1BFQ0lBTF9ET0NVTUVOVF9BTEwgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogaXNDYWxsYWJsZShpdCkgfHwgaXQgPT09IGRvY3VtZW50QWxsO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiBpc0NhbGxhYmxlKGl0KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzUHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZicpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVTRV9TWU1CT0xfQVNfVUlEID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHZhciAkU3ltYm9sID0gZ2V0QnVpbHRJbignU3ltYm9sJyk7XG4gIHJldHVybiBpc0NhbGxhYmxlKCRTeW1ib2wpICYmIGlzUHJvdG90eXBlT2YoJFN5bWJvbC5wcm90b3R5cGUsICRPYmplY3QoaXQpKTtcbn07XG4iLCJ2YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG5cbi8vIGBMZW5ndGhPZkFycmF5TGlrZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWxlbmd0aG9mYXJyYXlsaWtlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHRvTGVuZ3RoKG9iai5sZW5ndGgpO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgQ09ORklHVVJBQkxFX0ZVTkNUSU9OX05BTUUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tbmFtZScpLkNPTkZJR1VSQUJMRTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xuXG52YXIgZW5mb3JjZUludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmVuZm9yY2U7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxudmFyIENPTkZJR1VSQUJMRV9MRU5HVEggPSBERVNDUklQVE9SUyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCAnbGVuZ3RoJywgeyB2YWx1ZTogOCB9KS5sZW5ndGggIT09IDg7XG59KTtcblxudmFyIFRFTVBMQVRFID0gU3RyaW5nKFN0cmluZykuc3BsaXQoJ1N0cmluZycpO1xuXG52YXIgbWFrZUJ1aWx0SW4gPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSwgb3B0aW9ucykge1xuICBpZiAoU3RyaW5nKG5hbWUpLnNsaWNlKDAsIDcpID09PSAnU3ltYm9sKCcpIHtcbiAgICBuYW1lID0gJ1snICsgU3RyaW5nKG5hbWUpLnJlcGxhY2UoL15TeW1ib2xcXCgoW14pXSopXFwpLywgJyQxJykgKyAnXSc7XG4gIH1cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5nZXR0ZXIpIG5hbWUgPSAnZ2V0ICcgKyBuYW1lO1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnNldHRlcikgbmFtZSA9ICdzZXQgJyArIG5hbWU7XG4gIGlmICghaGFzT3duKHZhbHVlLCAnbmFtZScpIHx8IChDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSAmJiB2YWx1ZS5uYW1lICE9PSBuYW1lKSkge1xuICAgIGlmIChERVNDUklQVE9SUykgZGVmaW5lUHJvcGVydHkodmFsdWUsICduYW1lJywgeyB2YWx1ZTogbmFtZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgIGVsc2UgdmFsdWUubmFtZSA9IG5hbWU7XG4gIH1cbiAgaWYgKENPTkZJR1VSQUJMRV9MRU5HVEggJiYgb3B0aW9ucyAmJiBoYXNPd24ob3B0aW9ucywgJ2FyaXR5JykgJiYgdmFsdWUubGVuZ3RoICE9PSBvcHRpb25zLmFyaXR5KSB7XG4gICAgZGVmaW5lUHJvcGVydHkodmFsdWUsICdsZW5ndGgnLCB7IHZhbHVlOiBvcHRpb25zLmFyaXR5IH0pO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKG9wdGlvbnMgJiYgaGFzT3duKG9wdGlvbnMsICdjb25zdHJ1Y3RvcicpICYmIG9wdGlvbnMuY29uc3RydWN0b3IpIHtcbiAgICAgIGlmIChERVNDUklQVE9SUykgZGVmaW5lUHJvcGVydHkodmFsdWUsICdwcm90b3R5cGUnLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTtcbiAgICAvLyBpbiBWOCB+IENocm9tZSA1MywgcHJvdG90eXBlcyBvZiBzb21lIG1ldGhvZHMsIGxpa2UgYEFycmF5LnByb3RvdHlwZS52YWx1ZXNgLCBhcmUgbm9uLXdyaXRhYmxlXG4gICAgfSBlbHNlIGlmICh2YWx1ZS5wcm90b3R5cGUpIHZhbHVlLnByb3RvdHlwZSA9IHVuZGVmaW5lZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICB2YXIgc3RhdGUgPSBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSk7XG4gIGlmICghaGFzT3duKHN0YXRlLCAnc291cmNlJykpIHtcbiAgICBzdGF0ZS5zb3VyY2UgPSBURU1QTEFURS5qb2luKHR5cGVvZiBuYW1lID09ICdzdHJpbmcnID8gbmFtZSA6ICcnKTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuXG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRlbmQtbmF0aXZlIC0tIHJlcXVpcmVkXG5GdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBtYWtlQnVpbHRJbihmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIGlzQ2FsbGFibGUodGhpcykgJiYgZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5zb3VyY2UgfHwgaW5zcGVjdFNvdXJjZSh0aGlzKTtcbn0sICd0b1N0cmluZycpO1xuIiwidmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgTWF0aC50cnVuY2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW1hdGgudHJ1bmNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW1hdGgtdHJ1bmMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBNYXRoLnRydW5jIHx8IGZ1bmN0aW9uIHRydW5jKHgpIHtcbiAgdmFyIG4gPSAreDtcbiAgcmV0dXJuIChuID4gMCA/IGZsb29yIDogY2VpbCkobik7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcbnZhciBWOF9QUk9UT1RZUEVfREVGSU5FX0JVRyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy92OC1wcm90b3R5cGUtZGVmaW5lLWJ1ZycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5Jyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciAkZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBFTlVNRVJBQkxFID0gJ2VudW1lcmFibGUnO1xudmFyIENPTkZJR1VSQUJMRSA9ICdjb25maWd1cmFibGUnO1xudmFyIFdSSVRBQkxFID0gJ3dyaXRhYmxlJztcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBWOF9QUk9UT1RZUEVfREVGSU5FX0JVRyA/IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1Byb3BlcnR5S2V5KFApO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKHR5cGVvZiBPID09PSAnZnVuY3Rpb24nICYmIFAgPT09ICdwcm90b3R5cGUnICYmICd2YWx1ZScgaW4gQXR0cmlidXRlcyAmJiBXUklUQUJMRSBpbiBBdHRyaWJ1dGVzICYmICFBdHRyaWJ1dGVzW1dSSVRBQkxFXSkge1xuICAgIHZhciBjdXJyZW50ID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgICBpZiAoY3VycmVudCAmJiBjdXJyZW50W1dSSVRBQkxFXSkge1xuICAgICAgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gICAgICBBdHRyaWJ1dGVzID0ge1xuICAgICAgICBjb25maWd1cmFibGU6IENPTkZJR1VSQUJMRSBpbiBBdHRyaWJ1dGVzID8gQXR0cmlidXRlc1tDT05GSUdVUkFCTEVdIDogY3VycmVudFtDT05GSUdVUkFCTEVdLFxuICAgICAgICBlbnVtZXJhYmxlOiBFTlVNRVJBQkxFIGluIEF0dHJpYnV0ZXMgPyBBdHRyaWJ1dGVzW0VOVU1FUkFCTEVdIDogY3VycmVudFtFTlVNRVJBQkxFXSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cbiAgfSByZXR1cm4gJGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xufSA6ICRkZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1Byb3BlcnR5S2V5KFApO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgJFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIFAgPSB0b1Byb3BlcnR5S2V5KFApO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhc093bihPLCBQKSkgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcighY2FsbChwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mLCBPLCBQKSwgT1tQXSk7XG59O1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eW5hbWVzIC0tIHNhZmVcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eXN5bWJvbHMgLS0gc2FmZVxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1bmN1cnJ5VGhpcyh7fS5pc1Byb3RvdHlwZU9mKTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIHB1c2ggPSB1bmN1cnJ5VGhpcyhbXS5wdXNoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhc093bihoaWRkZW5LZXlzLCBrZXkpICYmIGhhc093bihPLCBrZXkpICYmIHB1c2gocmVzdWx0LCBrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzT3duKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHB1c2gocmVzdWx0LCBrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gTmFzaG9ybiB+IEpESzggYnVnXG52YXIgTkFTSE9STl9CVUcgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgISRwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsInZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgT3JkaW5hcnlUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9yZGluYXJ5dG9wcmltaXRpdmVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBwcmVmKSB7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAocHJlZiA9PT0gJ3N0cmluZycgJiYgaXNDYWxsYWJsZShmbiA9IGlucHV0LnRvU3RyaW5nKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKGlzQ2FsbGFibGUoZm4gPSBpbnB1dC52YWx1ZU9mKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHByZWYgIT09ICdzdHJpbmcnICYmIGlzQ2FsbGFibGUoZm4gPSBpbnB1dC50b1N0cmluZykgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIHRocm93ICRUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbnZhciBjb25jYXQgPSB1bmN1cnJ5VGhpcyhbXS5jb25jYXQpO1xuXG4vLyBhbGwgb2JqZWN0IGtleXMsIGluY2x1ZGVzIG5vbi1lbnVtZXJhYmxlIGFuZCBzeW1ib2xzXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ1JlZmxlY3QnLCAnb3duS2V5cycpIHx8IGZ1bmN0aW9uIG93bktleXMoaXQpIHtcbiAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlLmYoYW5PYmplY3QoaXQpKTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICByZXR1cm4gZ2V0T3duUHJvcGVydHlTeW1ib2xzID8gY29uY2F0KGtleXMsIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLmZsYWdzYCBnZXR0ZXIgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0LXJlZ2V4cC5wcm90b3R5cGUuZmxhZ3Ncbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdGhhdCA9IGFuT2JqZWN0KHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIGlmICh0aGF0Lmhhc0luZGljZXMpIHJlc3VsdCArPSAnZCc7XG4gIGlmICh0aGF0Lmdsb2JhbCkgcmVzdWx0ICs9ICdnJztcbiAgaWYgKHRoYXQuaWdub3JlQ2FzZSkgcmVzdWx0ICs9ICdpJztcbiAgaWYgKHRoYXQubXVsdGlsaW5lKSByZXN1bHQgKz0gJ20nO1xuICBpZiAodGhhdC5kb3RBbGwpIHJlc3VsdCArPSAncyc7XG4gIGlmICh0aGF0LnVuaWNvZGUpIHJlc3VsdCArPSAndSc7XG4gIGlmICh0aGF0LnVuaWNvZGVTZXRzKSByZXN1bHQgKz0gJ3YnO1xuICBpZiAodGhhdC5zdGlja3kpIHJlc3VsdCArPSAneSc7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwidmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgUmVxdWlyZU9iamVjdENvZXJjaWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlcXVpcmVvYmplY3Rjb2VyY2libGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpc051bGxPclVuZGVmaW5lZChpdCkpIHRocm93ICRUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xuXG52YXIga2V5cyA9IHNoYXJlZCgna2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGtleXNba2V5XSB8fCAoa2V5c1trZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZGVmaW5lR2xvYmFsUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eScpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCBkZWZpbmVHbG9iYWxQcm9wZXJ0eShTSEFSRUQsIHt9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZTtcbiIsInZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjI1LjAnLFxuICBtb2RlOiBJU19QVVJFID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMTQtMjAyMiBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KScsXG4gIGxpY2Vuc2U6ICdodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9ibG9iL3YzLjI1LjAvTElDRU5TRScsXG4gIHNvdXJjZTogJ2h0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzJ1xufSk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBlcy14L25vLXN5bWJvbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlzeW1ib2xzIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgc3ltYm9sID0gU3ltYm9sKCk7XG4gIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gIC8vIGBnZXQtb3duLXByb3BlcnR5LXN5bWJvbHNgIHBvbHlmaWxsIHN5bWJvbHMgY29udmVydGVkIHRvIG9iamVjdCBhcmUgbm90IFN5bWJvbCBpbnN0YW5jZXNcbiAgcmV0dXJuICFTdHJpbmcoc3ltYm9sKSB8fCAhKE9iamVjdChzeW1ib2wpIGluc3RhbmNlb2YgU3ltYm9sKSB8fFxuICAgIC8vIENocm9tZSAzOC00MCBzeW1ib2xzIGFyZSBub3QgaW5oZXJpdGVkIGZyb20gRE9NIGNvbGxlY3Rpb25zIHByb3RvdHlwZXMgdG8gaW5zdGFuY2VzXG4gICAgIVN5bWJvbC5zaGFtICYmIFY4X1ZFUlNJT04gJiYgVjhfVkVSU0lPTiA8IDQxO1xufSk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGFwcGx5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWFwcGx5Jyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGFycmF5U2xpY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc2xpY2UnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG52YXIgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdmFsaWRhdGUtYXJndW1lbnRzLWxlbmd0aCcpO1xudmFyIElTX0lPUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtaW9zJyk7XG52YXIgSVNfTk9ERSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZScpO1xuXG52YXIgc2V0ID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhciA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgRnVuY3Rpb24gPSBnbG9iYWwuRnVuY3Rpb247XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgU3RyaW5nID0gZ2xvYmFsLlN0cmluZztcbnZhciBjb3VudGVyID0gMDtcbnZhciBxdWV1ZSA9IHt9O1xudmFyIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xudmFyIGxvY2F0aW9uLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcblxudHJ5IHtcbiAgLy8gRGVubyB0aHJvd3MgYSBSZWZlcmVuY2VFcnJvciBvbiBgbG9jYXRpb25gIGFjY2VzcyB3aXRob3V0IGAtLWxvY2F0aW9uYCBmbGFnXG4gIGxvY2F0aW9uID0gZ2xvYmFsLmxvY2F0aW9uO1xufSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuXG52YXIgcnVuID0gZnVuY3Rpb24gKGlkKSB7XG4gIGlmIChoYXNPd24ocXVldWUsIGlkKSkge1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG5cbnZhciBydW5uZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBydW4oaWQpO1xuICB9O1xufTtcblxudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHJ1bihldmVudC5kYXRhKTtcbn07XG5cbnZhciBwb3N0ID0gZnVuY3Rpb24gKGlkKSB7XG4gIC8vIG9sZCBlbmdpbmVzIGhhdmUgbm90IGxvY2F0aW9uLm9yaWdpblxuICBnbG9iYWwucG9zdE1lc3NhZ2UoU3RyaW5nKGlkKSwgbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgbG9jYXRpb24uaG9zdCk7XG59O1xuXG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldCB8fCAhY2xlYXIpIHtcbiAgc2V0ID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGhhbmRsZXIpIHtcbiAgICB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aChhcmd1bWVudHMubGVuZ3RoLCAxKTtcbiAgICB2YXIgZm4gPSBpc0NhbGxhYmxlKGhhbmRsZXIpID8gaGFuZGxlciA6IEZ1bmN0aW9uKGhhbmRsZXIpO1xuICAgIHZhciBhcmdzID0gYXJyYXlTbGljZShhcmd1bWVudHMsIDEpO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBhcHBseShmbiwgdW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhciA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChJU19OT0RFKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2socnVubmVyKGlkKSk7XG4gICAgfTtcbiAgLy8gU3BoZXJlIChKUyBnYW1lIGVuZ2luZSkgRGlzcGF0Y2ggQVBJXG4gIH0gZWxzZSBpZiAoRGlzcGF0Y2ggJiYgRGlzcGF0Y2gubm93KSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIERpc3BhdGNoLm5vdyhydW5uZXIoaWQpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIC8vIGV4Y2VwdCBpT1MgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjI0XG4gIH0gZWxzZSBpZiAoTWVzc2FnZUNoYW5uZWwgJiYgIUlTX0lPUykge1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBwb3J0ID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gYmluZChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0KTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZiAoXG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiZcbiAgICBpc0NhbGxhYmxlKGdsb2JhbC5wb3N0TWVzc2FnZSkgJiZcbiAgICAhZ2xvYmFsLmltcG9ydFNjcmlwdHMgJiZcbiAgICBsb2NhdGlvbiAmJiBsb2NhdGlvbi5wcm90b2NvbCAhPT0gJ2ZpbGU6JyAmJlxuICAgICFmYWlscyhwb3N0KVxuICApIHtcbiAgICBkZWZlciA9IHBvc3Q7XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZiAoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bihpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHNldFRpbWVvdXQocnVubmVyKGlkKSwgMCk7XG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGNsZWFyOiBjbGVhclxufTtcbiIsInZhciB0b0ludGVnZXJPckluZmluaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHknKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyT3JJbmZpbml0eShpbmRleCk7XG4gIHJldHVybiBpbnRlZ2VyIDwgMCA/IG1heChpbnRlZ2VyICsgbGVuZ3RoLCAwKSA6IG1pbihpbnRlZ2VyLCBsZW5ndGgpO1xufTtcbiIsIi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCJ2YXIgdHJ1bmMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbWF0aC10cnVuYycpO1xuXG4vLyBgVG9JbnRlZ2VyT3JJbmZpbml0eWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvaW50ZWdlcm9yaW5maW5pdHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHZhciBudW1iZXIgPSArYXJndW1lbnQ7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gIHJldHVybiBudW1iZXIgIT09IG51bWJlciB8fCBudW1iZXIgPT09IDAgPyAwIDogdHJ1bmMobnVtYmVyKTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyT3JJbmZpbml0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5Jyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBhcmd1bWVudCA+IDAgPyBtaW4odG9JbnRlZ2VyT3JJbmZpbml0eShhcmd1bWVudCksIDB4MUZGRkZGRkZGRkZGRkYpIDogMDsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcblxuLy8gYFRvT2JqZWN0YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9vYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiAkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCJ2YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtc3ltYm9sJyk7XG52YXIgZ2V0TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1tZXRob2QnKTtcbnZhciBvcmRpbmFyeVRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29yZGluYXJ5LXRvLXByaW1pdGl2ZScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbnZhciBUT19QUklNSVRJVkUgPSB3ZWxsS25vd25TeW1ib2woJ3RvUHJpbWl0aXZlJyk7XG5cbi8vIGBUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCwgcHJlZikge1xuICBpZiAoIWlzT2JqZWN0KGlucHV0KSB8fCBpc1N5bWJvbChpbnB1dCkpIHJldHVybiBpbnB1dDtcbiAgdmFyIGV4b3RpY1RvUHJpbSA9IGdldE1ldGhvZChpbnB1dCwgVE9fUFJJTUlUSVZFKTtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGV4b3RpY1RvUHJpbSkge1xuICAgIGlmIChwcmVmID09PSB1bmRlZmluZWQpIHByZWYgPSAnZGVmYXVsdCc7XG4gICAgcmVzdWx0ID0gY2FsbChleG90aWNUb1ByaW0sIGlucHV0LCBwcmVmKTtcbiAgICBpZiAoIWlzT2JqZWN0KHJlc3VsdCkgfHwgaXNTeW1ib2wocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgICB0aHJvdyAkVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xuICB9XG4gIGlmIChwcmVmID09PSB1bmRlZmluZWQpIHByZWYgPSAnbnVtYmVyJztcbiAgcmV0dXJuIG9yZGluYXJ5VG9QcmltaXRpdmUoaW5wdXQsIHByZWYpO1xufTtcbiIsInZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcblxuLy8gYFRvUHJvcGVydHlLZXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b3Byb3BlcnR5a2V5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoYXJndW1lbnQsICdzdHJpbmcnKTtcbiAgcmV0dXJuIGlzU3ltYm9sKGtleSkgPyBrZXkgOiBrZXkgKyAnJztcbn07XG4iLCJ2YXIgJFN0cmluZyA9IFN0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gJFN0cmluZyhhcmd1bWVudCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuICdPYmplY3QnO1xuICB9XG59O1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgaWQgPSAwO1xudmFyIHBvc3RmaXggPSBNYXRoLnJhbmRvbSgpO1xudmFyIHRvU3RyaW5nID0gdW5jdXJyeVRoaXMoMS4wLnRvU3RyaW5nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyAoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgdG9TdHJpbmcoKytpZCArIHBvc3RmaXgsIDM2KTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBlcy14L25vLXN5bWJvbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3ltYm9sLWNvbnN0cnVjdG9yLWRldGVjdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9TWU1CT0xcbiAgJiYgIVN5bWJvbC5zaGFtXG4gICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCc7XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBWOCB+IENocm9tZSAzNi1cbi8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMzMzRcbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0sICdwcm90b3R5cGUnLCB7XG4gICAgdmFsdWU6IDQyLFxuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KS5wcm90b3R5cGUgIT0gNDI7XG59KTtcbiIsInZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXNzZWQsIHJlcXVpcmVkKSB7XG4gIGlmIChwYXNzZWQgPCByZXF1aXJlZCkgdGhyb3cgJFR5cGVFcnJvcignTm90IGVub3VnaCBhcmd1bWVudHMnKTtcbiAgcmV0dXJuIHBhc3NlZDtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0NhbGxhYmxlKFdlYWtNYXApICYmIC9uYXRpdmUgY29kZS8udGVzdChTdHJpbmcoV2Vha01hcCkpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBzeW1ib2xGb3IgPSBTeW1ib2wgJiYgU3ltYm9sWydmb3InXTtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbCA6IFN5bWJvbCAmJiBTeW1ib2wud2l0aG91dFNldHRlciB8fCB1aWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFoYXNPd24oV2VsbEtub3duU3ltYm9sc1N0b3JlLCBuYW1lKSB8fCAhKE5BVElWRV9TWU1CT0wgfHwgdHlwZW9mIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9PSAnc3RyaW5nJykpIHtcbiAgICB2YXIgZGVzY3JpcHRpb24gPSAnU3ltYm9sLicgKyBuYW1lO1xuICAgIGlmIChOQVRJVkVfU1lNQk9MICYmIGhhc093bihTeW1ib2wsIG5hbWUpKSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBTeW1ib2xbbmFtZV07XG4gICAgfSBlbHNlIGlmIChVU0VfU1lNQk9MX0FTX1VJRCAmJiBzeW1ib2xGb3IpIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IHN5bWJvbEZvcihkZXNjcmlwdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IGNyZWF0ZVdlbGxLbm93blN5bWJvbChkZXNjcmlwdGlvbik7XG4gICAgfVxuICB9IHJldHVybiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV07XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZUJ1aWx0SW5BY2Nlc3NvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4tYWNjZXNzb3InKTtcbnZhciByZWdFeHBGbGFncyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZmxhZ3MnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBiYWJlbC1taW5pZnkgYW5kIENsb3N1cmUgQ29tcGlsZXIgdHJhbnNwaWxlcyBSZWdFeHAoJy4nLCAnZCcpIC0+IC8uL2QgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvclxudmFyIFJlZ0V4cCA9IGdsb2JhbC5SZWdFeHA7XG52YXIgUmVnRXhwUHJvdG90eXBlID0gUmVnRXhwLnByb3RvdHlwZTtcblxudmFyIEZPUkNFRCA9IERFU0NSSVBUT1JTICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIElORElDRVNfU1VQUE9SVCA9IHRydWU7XG4gIHRyeSB7XG4gICAgUmVnRXhwKCcuJywgJ2QnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBJTkRJQ0VTX1NVUFBPUlQgPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBPID0ge307XG4gIC8vIG1vZGVybiBWOCBidWdcbiAgdmFyIGNhbGxzID0gJyc7XG4gIHZhciBleHBlY3RlZCA9IElORElDRVNfU1VQUE9SVCA/ICdkZ2ltc3knIDogJ2dpbXN5JztcblxuICB2YXIgYWRkR2V0dGVyID0gZnVuY3Rpb24gKGtleSwgY2hyKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywga2V5LCB7IGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbHMgKz0gY2hyO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSB9KTtcbiAgfTtcblxuICB2YXIgcGFpcnMgPSB7XG4gICAgZG90QWxsOiAncycsXG4gICAgZ2xvYmFsOiAnZycsXG4gICAgaWdub3JlQ2FzZTogJ2knLFxuICAgIG11bHRpbGluZTogJ20nLFxuICAgIHN0aWNreTogJ3knXG4gIH07XG5cbiAgaWYgKElORElDRVNfU1VQUE9SVCkgcGFpcnMuaGFzSW5kaWNlcyA9ICdkJztcblxuICBmb3IgKHZhciBrZXkgaW4gcGFpcnMpIGFkZEdldHRlcihrZXksIHBhaXJzW2tleV0pO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxuICB2YXIgcmVzdWx0ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihSZWdFeHBQcm90b3R5cGUsICdmbGFncycpLmdldC5jYWxsKE8pO1xuXG4gIHJldHVybiByZXN1bHQgIT09IGV4cGVjdGVkIHx8IGNhbGxzICE9PSBleHBlY3RlZDtcbn0pO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1yZWdleHAucHJvdG90eXBlLmZsYWdzXG5pZiAoRk9SQ0VEKSBkZWZpbmVCdWlsdEluQWNjZXNzb3IoUmVnRXhwUHJvdG90eXBlLCAnZmxhZ3MnLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiByZWdFeHBGbGFnc1xufSk7XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY2xlYXJJbW1lZGlhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdGFzaycpLmNsZWFyO1xuXG4vLyBgY2xlYXJJbW1lZGlhdGVgIG1ldGhvZFxuLy8gaHR0cDovL3czYy5naXRodWIuaW8vc2V0SW1tZWRpYXRlLyNzaS1jbGVhckltbWVkaWF0ZVxuJCh7IGdsb2JhbDogdHJ1ZSwgYmluZDogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgZm9yY2VkOiBnbG9iYWwuY2xlYXJJbW1lZGlhdGUgIT09IGNsZWFySW1tZWRpYXRlIH0sIHtcbiAgY2xlYXJJbW1lZGlhdGU6IGNsZWFySW1tZWRpYXRlXG59KTtcbiIsIi8vIFRPRE86IFJlbW92ZSB0aGlzIG1vZHVsZSBmcm9tIGBjb3JlLWpzQDRgIHNpbmNlIGl0J3Mgc3BsaXQgdG8gbW9kdWxlcyBsaXN0ZWQgYmVsb3dcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmNsZWFyLWltbWVkaWF0ZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuc2V0LWltbWVkaWF0ZScpO1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNldEltbWVkaWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90YXNrJykuc2V0O1xuXG4vLyBgc2V0SW1tZWRpYXRlYCBtZXRob2Rcbi8vIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3NldEltbWVkaWF0ZS8jc2ktc2V0SW1tZWRpYXRlXG4kKHsgZ2xvYmFsOiB0cnVlLCBiaW5kOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCBmb3JjZWQ6IGdsb2JhbC5zZXRJbW1lZGlhdGUgIT09IHNldEltbWVkaWF0ZSB9LCB7XG4gIHNldEltbWVkaWF0ZTogc2V0SW1tZWRpYXRlXG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsImltcG9ydCB7IHBob3RvZ3JhcGhlckZhY3RvcnkgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL3Bob3RvZ3JhcGhlckZhY3RvcnlcIjtcclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzcGxheURhdGEocGhvdG9ncmFwaGVycywgaWQpIHtcclxuICAgIGxldCBwaG90b2dyYXBoZXJTZWxlY3RlZCA9IFwiXCI7XHJcbiAgICBcclxuICAgIHBob3RvZ3JhcGhlcnMuZm9yRWFjaCgocGhvdG9ncmFwaGVyKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwaG90b2dyYXBoZXIuaWQgPT0gaWQpIHtcclxuICAgICAgICAgICAgLy8gVGhlbiB3ZSBhcmUgZ29pbmcgdXNlIHRoZSBQaG90b2dyYXBoZXJGYWN0b3J5IHRvIHNldCBET01cclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7IGNvbnNvbGUubG9nKHBob3RvZ3JhcGhlcik7IH1cclxuICAgICAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVyTW9kZWwgPSBwaG90b2dyYXBoZXJGYWN0b3J5KHBob3RvZ3JhcGhlcik7XHJcbiAgICAgICAgICAgIHBob3RvZ3JhcGhlck1vZGVsLnNldFBob3RvZ3JhcGhlckhlYWRlcigpO1xyXG4gICAgICAgICAgICBwaG90b2dyYXBoZXJNb2RlbC5zZXRTdGlja3lCYXJQcmljZSgpO1xyXG5cclxuICAgICAgICAgICAgcGhvdG9ncmFwaGVyU2VsZWN0ZWQgPSBwaG90b2dyYXBoZXJcclxuICAgICAgICAgICAgLy8gRW5kIG9mIFBob3RvZ3JhcGhlckZhY3RvcnkgV29ya1xyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIChwaG90b2dyYXBoZXJTZWxlY3RlZCk7IC8vIFJldHVybiB0aGUgcGhvdG9ncmFwaGVyU2hvdyBhdCB0aGUgZW5kXHJcblxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzcGxheURhdGFBbGwocGhvdG9ncmFwaGVycywgcXVlcnlTZWxlY3Rvcikge1xyXG5cclxuICAgIHBob3RvZ3JhcGhlcnMuZm9yRWFjaCgocGhvdG9ncmFwaGVyKSA9PiB7XHJcblxyXG4gICAgICAgIC8vIFRoZW4gd2UgYXJlIGdvaW5nIHVzZSB0aGUgUGhvdG9ncmFwaGVyRmFjdG9yeSB0byBnZW5lcmF0ZSBET01cclxuICAgICAgICBjb25zdCBwaG90b2dyYXBoZXJzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnlTZWxlY3Rvcik7XHJcbiAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVyTW9kZWwgPSBwaG90b2dyYXBoZXJGYWN0b3J5KHBob3RvZ3JhcGhlcik7XHJcbiAgICAgICAgY29uc3QgdXNlckNhcmRET00gPSBwaG90b2dyYXBoZXJNb2RlbC5nZXRVc2VyQ2FyZERPTSgpO1xyXG5cclxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHsgY29uc29sZS5sb2cocGhvdG9ncmFwaGVyKTsgfVxyXG4gICAgICAgIGlmICh1c2VyQ2FyZERPTSkge1xyXG4gICAgICAgICAgICBwaG90b2dyYXBoZXJzU2VjdGlvbi5hcHBlbmRDaGlsZCh1c2VyQ2FyZERPTSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEVuZCBvZiBQaG90b2dyYXBoZXJGYWN0b3J5IFdvcmtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBtZWRpYUZhY3RvcnkgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL21lZGlhRmFjdG9yeVwiO1xyXG5pbXBvcnQgeyBzZXRJbm5lckh0bWwgfSBmcm9tIFwiLi4vdXRpbHMvZG9tXCI7XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlNZWRpYShtZWRpYXMsIHF1ZXJ5U2VsZWN0b3IsIHBob3RvZ3JhcGhlcklkKSB7XHJcbiAgICBsZXQgdG90YWxMaWtlcyA9IDA7XHJcblxyXG4gICAgbWVkaWFzLmZvckVhY2goKG1lZGlhKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwaG90b2dyYXBoZXJJZCA9PSBtZWRpYS5waG90b2dyYXBoZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7IGNvbnNvbGUubG9nKG1lZGlhKTsgfVxyXG4gICAgICAgICAgICAvLyBUaGVuIHdlIGFyZSBnb2luZyB1c2UgdGhlIE1lZGlhRmFjdG9yeSB0byBnZW5lcmF0ZSBET01cclxuICAgICAgICAgICAgY29uc3QgbWVkaWFzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnlTZWxlY3Rvcik7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lZGlhTW9kZWwgPSBtZWRpYUZhY3RvcnkobWVkaWEpO1xyXG4gICAgICAgICAgICBjb25zdCBtZWRpYURPTSA9IG1lZGlhTW9kZWwuZ2V0TWVkaWFET00oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtZWRpYURPTSkge1xyXG4gICAgICAgICAgICAgICAgbWVkaWFzU2VjdGlvbi5hcHBlbmRDaGlsZChtZWRpYURPTSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gRW5kIG9mIE1lZGlhRmFjdG9yeSBXb3JrXHJcblxyXG4gICAgICAgICAgICAvLyBJZiBtZWRpYSBvYmplY3QgZ290IExpa2VzIHByb3ByaWV0eSB0aGVuXHJcbiAgICAgICAgICAgIGlmIChtZWRpYS5saWtlcykge1xyXG4gICAgICAgICAgICAgICAgdG90YWxMaWtlcyArPSBtZWRpYS5saWtlczsgLy8gQ291bnQgYWxsIGxpa2VzXHJcbiAgICAgICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIudG90YWxfbGlrZXNcIiwgdG90YWxMaWtlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJUaGVyZXMgaXMgbm8gbGlrZSBhbmQgdG90YWxMaWtlcywgbG9vayBtZWRpYUZhY3RvcnkgcmV0dXJuZWQgYSBvYmplY3Qgd2l0aG91dCBsaWtlcyBwcm9wcmlldHlcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHsgY29uc29sZS5sb2coXCJUb3RhbCBMaWtlOiBcIiArIHRvdGFsTGlrZXMpOyB9XHJcbn1cclxuXHJcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tIFwiLi4vdXRpbHMvZG9tXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWVkaWFGYWN0b3J5KGRhdGEpIHtcclxuICAgIGNvbnN0IHsgaWQsIHBob3RvZ3JhcGhlcklkLCB0aXRsZSwgaW1hZ2UsIHZpZGVvLCBsaWtlcyB9ID0gZGF0YTtcclxuXHJcbiAgICBjb25zdCBtb3ZpZSA9IGBhc3NldHMvdmlkZW8vJHt2aWRlb31gO1xyXG4gICAgY29uc3QgcGljdHVyZSA9IGBhc3NldHMvaW1hZ2VzLyR7aW1hZ2V9YDtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRNZWRpYURPTSgpIHtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIERPTSBvbmx5IGlmIHdlIGdvdCBpZHMgYW5kIGEgUGljdHVyZSBvciBhIFZpZGVvXHJcbiAgICAgICAgY29uc3QgaGFzUGhvdG9ncmFwaGVyID0gaWQgJiYgcGhvdG9ncmFwaGVySWQ7XHJcbiAgICAgICAgY29uc3QgaGFzQ29udGVudCA9IGltYWdlIHx8IHZpZGVvXHJcblxyXG4gICAgICAgIGlmIChoYXNQaG90b2dyYXBoZXIgJiYgaGFzQ29udGVudCkge1xyXG4gICAgICAgICAgICAvLyBDUkVBVEUgQSBBUlRJQ0xFXHJcbiAgICAgICAgICAgIGNvbnN0IGFydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1lZGlhX2NhcmRcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBCdWlsZCBBIEhSRUYgRUxFTUVOVFxyXG4gICAgICAgICAgICBjb25zdCBsaW5rRWxlbWVudCA9IGFydGljbGUuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBkb20uYnVpbGRFbGVtZW50KFwiYVwiLCBgcGhvdG9ncmFwaGVyLmh0bWw/aWQ9JHtpZH1gKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBkb20uc2V0QXJpYWxMYWJlbChsaW5rRWxlbWVudCwgXCJMaWxhYyBicmVhc3RlZCByb2xsZXIsIGNsb3NldXAgdmlld1wiKSAvLyBTZXQgQXJpZWxMYWJlbCB0byBBSHJlZlxyXG5cclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGltYWdlIG9yIHZpZGVvIGV4aXN0c1xyXG4gICAgICAgICAgICBpZiAoaW1hZ2UpIHtcclxuICAgICAgICAgICAgICAgIGRvbS5pbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudChsaW5rRWxlbWVudCwgcGljdHVyZSwgdGl0bGUpOyAvLyBJbnNlcnQgcGljdHVyZSB3aXRoIEFMVFxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh2aWRlbykge1xyXG4gICAgICAgICAgICAgICAgZG9tLmluc2VydFZpZGVvSW5zaWRlRWxlbWVudChsaW5rRWxlbWVudCwgbW92aWUsIGBNb3ZpZSAke3ZpZGVvfWApOyAvLyBJbnNlcnQgVmlkZW8gd2l0aCBBcmllbCBMYWJlbFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBHZW5lcmF0ZSBEZXRhaWxzICh0aXRsZSArIExpa2VzKVxyXG4gICAgICAgICAgICBpZiAodGl0bGUpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0aXRsZV9oNiA9IGA8aDY+JHt0aXRsZX08L2g2PmA7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGlrZXNfaDYgPSBgPGg2IGFyaWEtbGFiZWw9J2xpa2VzJz4wPC9oNj5gO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpa2VzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlrZXNfaDYgPSBgPGg2IGFyaWEtbGFiZWw9J2xpa2VzJz4ke2xpa2VzfTwvaDY+YDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRvbS5pbnNlcnRIVE1MQWZ0ZXJFbGVtZW50KGxpbmtFbGVtZW50LCBgPGRpdiBjbGFzcz0nZGV0YWlscyc+JHt0aXRsZV9oNn0ke2xpa2VzX2g2fTwvZGl2PmApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSZXR1cm4gQXJ0aWNsZVxyXG4gICAgICAgICAgICByZXR1cm4gYXJ0aWNsZTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IHBob3RvZ3JhcGhlcklkLCBwaWN0dXJlLCBtb3ZpZSwgZ2V0TWVkaWFET00gfTtcclxufVxyXG4iLCJcclxuaW1wb3J0IHsgYnVpbGRFbGVtZW50LCBpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudCwgc2V0SW5uZXJIdG1sLCBzZXRBcmlhbExhYmVsIH0gZnJvbSBcIi4uL3V0aWxzL2RvbVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBob3RvZ3JhcGhlckZhY3RvcnkoZGF0YSkge1xyXG4gICAgY29uc3QgeyBuYW1lLCBpZCwgY2l0eSwgY291bnRyeSwgdGFnbGluZSwgcG9ydHJhaXQsIHByaWNlIH0gPSBkYXRhO1xyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgY29uc3QgcGljdHVyZSA9IGBhc3NldHMvaW1hZ2VzLyR7cG9ydHJhaXR9YDtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRVc2VyQ2FyZERPTSgpIHtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIERPTSBvbmx5IGlmIHdlIGdvdCBhIHBpY3R1cmUgYSBpZCBhbmQgYSBuYW1lXHJcbiAgICAgICAgaWYgKG5hbWUgJiYgaWQgJiYgcG9ydHJhaXQpIHtcclxuICAgICAgICAgICAgLy8gQlVJTEQgQSBBUlRJQ0xFIFxyXG4gICAgICAgICAgICBjb25zdCBhcnRpY2xlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFydGljbGVcIik7XHJcbiAgICAgICAgICAgIGFydGljbGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwaG90b2dyYXBoZXJfY2FyZFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBEeW5hbWlxdWUgTElOSyB3aXRoIFBpY3R1cmVcclxuICAgICAgICAgICAgY29uc3QgbGlua0VsZW1lbnQgPSBhcnRpY2xlLmFwcGVuZENoaWxkKFxyXG4gICAgICAgICAgICAgICAgYnVpbGRFbGVtZW50KFwiYVwiLCBgcGhvdG9ncmFwaGVyLmh0bWw/aWQ9JHtpZH1gKSAvLyBCdWlsZCBBSHJlZlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBzZXRBcmlhbExhYmVsKGxpbmtFbGVtZW50LCBgTGluayB0byAke25hbWV9YCk7IC8vIFNldCBBcmllbExhYmVsIHRvIEFIcmVmXHJcbiAgICAgICAgICAgIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KGxpbmtFbGVtZW50LCBwaWN0dXJlLCBuYW1lKTtcclxuICAgICAgICAgICAgLy8gRU5EIENyZWF0ZSBEeW5hbWlxdWUgTElOSyB3aXRoIFBpY3R1cmVcclxuXHJcbiAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDJcIiwgbmFtZSkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNpdHkgJiYgY291bnRyeSkge1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoM1wiLCBgJHtjaXR5fSwgJHtjb3VudHJ5fWApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGFnbGluZSkge1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoNFwiLCB0YWdsaW5lKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLmFwcGVuZENoaWxkKGJ1aWxkRWxlbWVudChcImg1XCIsIGAke3ByaWNlfeKCrC9qb3VyYCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSRVRVUk4gQSBBUlRJQ0xFIFxyXG4gICAgICAgICAgICByZXR1cm4gYXJ0aWNsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UGhvdG9ncmFwaGVySGVhZGVyKCkge1xyXG4gICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoMVwiLCBuYW1lKTtcclxuICAgICAgICBpZiAoY2l0eSAmJiBjb3VudHJ5KSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoMlwiLCBgJHtjaXR5fSwgJHtjb3VudHJ5fWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGgyXCIsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDNcIiwgdGFnbGluZSk7XHJcblxyXG4gICAgICAgIC8qKiBXRSBVU0UgYSBkaWZmZXJlbnQgbWV0aG9kIHRoYXQgaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQoKSBzaW5jZSBwaWN0dXJlIGlzIGFscmVhZHkgaW4gdGhlIERPTSAqL1xyXG4gICAgICAgIGNvbnN0IGltZ1Byb2ZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGltZ1wiKTtcclxuICAgICAgICBpbWdQcm9maWxlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBwaWN0dXJlKTtcclxuICAgICAgICBpbWdQcm9maWxlLnNldEF0dHJpYnV0ZShcImFsdFwiLCBuYW1lKTtcclxuICAgICAgICAvKiogKi9cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRTdGlja3lCYXJQcmljZSgpIHtcclxuICAgICAgICBpZiAocHJpY2UpIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnByaWNlX3JhdGVfZGFpbHlcIiwgYCR7cHJpY2V9IOKCrCAvIGpvdXJgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5wcmljZV9yYXRlX2RhaWx5XCIsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyBuYW1lLCBwaWN0dXJlLCBnZXRVc2VyQ2FyZERPTSwgc2V0UGhvdG9ncmFwaGVySGVhZGVyLCBzZXRTdGlja3lCYXJQcmljZSB9O1xyXG59XHJcbiIsIi8vIEZ1bmN0aW9uIGZvciBidWlsZCBET01cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KGVsZW1lbnQsIHBpY3R1cmUsIGFsdCkge1xyXG4gICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgYDxpbWcgc3JjPVwiJHtwaWN0dXJlfVwiIGFsdD1cIiR7YWx0fVwiPmApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0VmlkZW9JbnNpZGVFbGVtZW50KGVsZW1lbnQsIHZpZGVvLCBhcmlhTGFiZWwpIHtcclxuXHJcbiAgICBpZiAoYXJpYUxhYmVsKSB7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgXHJcbiAgICAgICAgYDx2aWRlbyBzcmM9XCIke3ZpZGVvfVwiIGFyaWEtbGFiZWw9XCIke2FyaWFMYWJlbH1cIj5gKTtcclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCAnPHZpZGVvIHNyYz1cIicgKyB2aWRlbyArICdcIj4nKTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0SFRNTEFmdGVyRWxlbWVudChlbGVtZW50LCBodG1sKSB7XHJcbiAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyZW5kXCIsIGh0bWwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRFbGVtZW50KGJhbGlzZSwgdmFsdWUpIHtcclxuICAgIC8vIENyZWF0ZSBiYWxpc2VcclxuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGJhbGlzZSk7XHJcblxyXG4gICAgLy8gU2V0IEF0dHJpYnV0ZSBvciBUZXh0Q29udGVuZWQgZGVwZW5kIG9mIGJhbGlzZVxyXG4gICAgc3dpdGNoIChiYWxpc2UpIHtcclxuICAgICAgICBjYXNlIFwiYVwiOlxyXG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImhyZWZcIiwgdmFsdWUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiaW1nXCI6XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIHZhbHVlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0QXJpYWxMYWJlbChlbGVtZW50LCBhcmlhbGFiZWwpIHtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBhcmlhbGFiZWwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0SW5uZXJIdG1sKHF1ZXJ5U2VsZWN0b3IsIHRleHRlKSB7XHJcbiAgICBjb25zdCB0ZXh0ZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5U2VsZWN0b3IpO1xyXG4gICAgdGV4dGVFbGVtZW50LmlubmVySFRNTCA9IHRleHRlO1xyXG59XHJcbi8vIEVuZCBGdW5jdGlvbiBmb3IgYnVpbGQgRE9NIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZldGNoSlNPTih1cmwsIHR5cGUpIHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTsgLy8gV2FpdCBmb3IgdGhlIEFzeW5jIEZlY3RoIEZ1bmN0aW9uXHJcblxyXG4gICAgLy8gZmV0Y2ggcmV0dXJucyBhbiBvYmplY3Qgd2l0aCBhIHJlc3BvbnNlIHByb3BlcnR5IHdoaWNoIGlmIHNldCB0byBmYWxzZSBtZWFucyB0aGF0IHRoZSBjb25uZWN0aW9uIGlzIG5vdCBnb29kIGFuZCBzbyB3ZSBzdG9wIHRoZSBmdW5jdGlvbiBcclxuICAgIGlmICghcmVzcG9uc2Uub2spIHsgdGhyb3cgbmV3IEVycm9yKFwiVGhyb3duIGZyb20gZmV0Y2hKU09OKClcIik7IH1cclxuXHJcbiAgICBsZXQganNvblJlc3BvbnNlID0gYXdhaXQgcmVzcG9uc2UuanNvbigpOyAvLyBwYXJzaW5nIEpTT05cclxuICAgIHJldHVybiBqc29uUmVzcG9uc2VbdHlwZV07IC8vIEdldCBkYXRhIGZyb20gdGhlIEFycmF5IHRoYXQgd2Ugd2FudFxyXG5cclxufVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRQaG90b2dyYXBoZXJzKCkge1xyXG4gICAgY29uc3QgdXJsID0gXCIuLi9kYXRhL3Bob3RvZ3JhcGhlcnMuanNvblwiOyAvLyBEYXRhIHNvdXJjZSAuSlNPTlxyXG4gICAgY29uc3QgcGhvdG9ncmFwaGVycyA9IGF3YWl0IGZldGNoSlNPTih1cmwsIFwicGhvdG9ncmFwaGVyc1wiKTsgLy8gdXNlIGZldGNoSlNPTiBmdW5jdGlvbiBmcm9tIHV0aWxzL2ZldGNoLmpzXHJcbiAgICByZXR1cm4gcGhvdG9ncmFwaGVyczsgLy8gUmV0dXJuIGRhdGEgb2YgUGhvdG9HcmFwaGVyc1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TWVkaWFzKCkge1xyXG4gICAgY29uc3QgdXJsID0gXCIuLi9kYXRhL3Bob3RvZ3JhcGhlcnMuanNvblwiOyAvLyBEYXRhIHNvdXJjZSAuSlNPTlxyXG4gICAgY29uc3QgbWVkaWFzID0gYXdhaXQgZmV0Y2hKU09OKHVybCwgXCJtZWRpYVwiKTsgLy8gdXNlIGZldGNoSlNPTiBmdW5jdGlvbiBmcm9tIHV0aWxzL2ZldGNoLmpzXHJcbiAgICByZXR1cm4gbWVkaWFzOyAvLyBSZXR1cm4gZGF0YSBvZiBNZWRpYVxyXG59XHJcbiIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVcmxQYXJhbWV0ZXIocGFyYW1ldGVyKSB7XHJcbiAgICBjb25zdCBmdWxsVXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7IC8vIEdldCBmdWxsIHVybFxyXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChmdWxsVXJsKTsgLy8gQ3JlYXRlIFVSTCBPYmplY3RcclxuICAgIGNvbnN0IHBhcmFtZXRlclZhbHVlID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQocGFyYW1ldGVyKTsgLy8gZ2V0IHBhcmFtZXRlciB2YWx1ZVxyXG4gICAgcmV0dXJuIHBhcmFtZXRlclZhbHVlO1xyXG59IiwiaW1wb3J0IHsgc2V0SW5uZXJIdG1sIH0gZnJvbSAnLi9kb20nO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1vZGFsTWFzdGVyKGJvZHlUYWcsIGhlYWRlclRhZywgbWFpblRhZywgbW9kYWxJRCkge1xyXG5cclxuXHJcbiAgICAvKiogQ1JFQVRFIFRXTyBPQkpFQ1QgV0lUSCBBTEwgUFJPUFJJRVRZIEZPUiBNT0RFTE1BU1RFUiBORUVEICovXHJcbiAgICBsZXQgYmFja2dyb3VuZFBhZ2UgPSB7XHJcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgYmFja2dyb3VuZCBvYmplY3QgKGJlaGluZCBtb2RhbClcclxuICAgICAgICBib2R5SFRNTDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihib2R5VGFnKSwgLy8gV2Ugd2FudCB0aGUgPGJvZHk+IHNlbGVjdGVkXHJcbiAgICAgICAgaGVhZGVySFRNTDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihoZWFkZXJUYWcpLCAvLyBXZSB3YW50IHRoZSA8aGVhZGVyPiBzZWxlY3RlZFxyXG4gICAgICAgIG1haW5IVE1MOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG1haW5UYWcpLCAvLyBXZSB3YW50IHRoZSA8bWFpbj4gc2VsZWN0ZWRcclxuICAgIH1cclxuXHJcbiAgICBsZXQgbW9kYWxQYWdlID0ge1xyXG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIG1vZGFsIE9iamVjdCAoY2FsbCBNb2RhbFBhZ2UpXHJcbiAgICAgICAgbW9kYWxIVE1MOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtb2RhbElEKSxcclxuICAgICAgICBtb2RhbElEOiBtb2RhbElELFxyXG4gICAgICAgIHZpc2libGU6IDAsXHJcbiAgICB9XHJcbiAgICAvKiogRU5EICAqL1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDb250YWN0Rm9ybUxpc3RlbmVyKG1vZGFsUGFnZSkge1xyXG4gICAgICAgIC8vIFRoaXMgYWRkIGxpc3RlbmVyIGFib3V0IG9ubHkgY29udGFjdCBmb3JtIFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3Blbk1vZGFsXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9wZW5Nb2RhbChtb2RhbFBhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VNb2RhbFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjbG9zZU1vZGFsKG1vZGFsUGFnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWN0X2J1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBzZW5kTWVzc2FnZShtb2RhbFBhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRLZXlib2FyZExpc3RlbmVyKG1vZGFsUGFnZSkge1xyXG4gICAgICAgIGlmIChtb2RhbFBhZ2UudmlzaWJsZSA9PT0gMSkgeyAvLyBJZiBtb2RhbFBhZ2UgaXMgdmlzaWJsZSBhdCB0aGUgc2NyZWVuXHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGFkZCBsaXN0ZW5lciBmb3IgS2V5Ym9hcmQgYW5kIGNoZWNrIGlmIGEga2V5IGlzIHByZXNzZWRcclxuICAgICAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwobW9kYWxQYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRUaXRsZU1vZGFsKG1vZGFsUGFnZSwgdGFnSFRNTCwgdGl0bGVNb2RhbCkge1xyXG4gICAgICAgIHJldHVybiBzZXRJbm5lckh0bWwoYCMke21vZGFsUGFnZS5tb2RhbElEfSAke3RhZ0hUTUx9YCwgdGl0bGVNb2RhbCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBcclxuXHJcbiAgICBmdW5jdGlvbiBlZmZlY3RBbmltYXRpb24oaGlkZWNsYXNzLCBzaG93Y2xhc3MsIG1vZGFsUGFnZSkge1xyXG4gICAgICAgIGlmIChtb2RhbFBhZ2UudmlzaWJsZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUGFnZS5tYWluSFRNTC5jbGFzc0xpc3QucmVtb3ZlKHNob3djbGFzcyk7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRQYWdlLmhlYWRlckhUTUwuY2xhc3NMaXN0LnJlbW92ZShzaG93Y2xhc3MpO1xyXG4gICAgICAgICAgICBtb2RhbFBhZ2UubW9kYWxIVE1MLmNsYXNzTGlzdC5yZW1vdmUoaGlkZWNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRQYWdlLm1haW5IVE1MLmNsYXNzTGlzdC5hZGQoaGlkZWNsYXNzKTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFBhZ2UuaGVhZGVySFRNTC5jbGFzc0xpc3QuYWRkKGhpZGVjbGFzcyk7XHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS5tb2RhbEhUTUwuY2xhc3NMaXN0LmFkZChzaG93Y2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgbW9kYWxQYWdlLnZpc2libGUgPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBtb2RhbFBhZ2UubW9kYWxIVE1MLmNsYXNzTGlzdC5yZW1vdmUoc2hvd2NsYXNzKTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFBhZ2UubWFpbkhUTUwuY2xhc3NMaXN0LnJlbW92ZShoaWRlY2xhc3MpO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUGFnZS5oZWFkZXJIVE1MLmNsYXNzTGlzdC5yZW1vdmUoaGlkZWNsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS5tb2RhbEhUTUwuY2xhc3NMaXN0LmFkZChoaWRlY2xhc3MpO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUGFnZS5tYWluSFRNTC5jbGFzc0xpc3QuYWRkKHNob3djbGFzcyk7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRQYWdlLmhlYWRlckhUTUwuY2xhc3NMaXN0LmFkZChzaG93Y2xhc3MpO1xyXG5cclxuICAgICAgICAgICAgbW9kYWxQYWdlLnZpc2libGUgPSAwXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbW9kYWxQYWdlO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gb3Blbk1vZGFsKG1vZGFsUGFnZSkge1xyXG4gICAgICAgIGVmZmVjdEFuaW1hdGlvbihcImhpZGVfY29udGVudFwiLCBcInNob3dfY29udGVudFwiLCBtb2RhbFBhZ2UpOyAvLyBFZmZlY3QgTW9kYWwgQ1NTXHJcbiAgICAgICAgbW9kYWxQYWdlLm1vZGFsSFRNTC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiOyAvLyBEaXNwbGF5IHRoZSBNb2RhbCBhdCB0aGUgc2NyZWVuXHJcbiAgICAgICAgYWRkS2V5Ym9hcmRMaXN0ZW5lcihtb2RhbFBhZ2UpOyAvLyBBZGQgS2V5Ym9hcmQgRXZlbnRzXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bW9kYWxQYWdlLm1vZGFsSUR9ICNjbG9zZU1vZGFsYCkuZm9jdXMoKTsgLy8gRm9jdXMgdGhlIENsb3NlIE1vZGFsIFxyXG5cclxuICAgICAgICAvLyBEaXNhYmxlIGNsaWNrIG9yIGZvY3VzIHdpdGggaW5lcnQgdG8gdGhlIEJhY2tncm91bmRQYWdlIFxyXG4gICAgICAgIGJhY2tncm91bmRQYWdlLmhlYWRlckhUTUwuc2V0QXR0cmlidXRlKFwiaW5lcnRcIiwgXCJcIik7XHJcbiAgICAgICAgYmFja2dyb3VuZFBhZ2UubWFpbkhUTUwuc2V0QXR0cmlidXRlKFwiaW5lcnRcIiwgXCJcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbFBhZ2UpIHtcclxuICAgICAgICBlZmZlY3RBbmltYXRpb24oXCJoaWRlX2NvbnRlbnRcIiwgXCJzaG93X2NvbnRlbnRcIiwgbW9kYWxQYWdlKTsgLy8gRWZmZWN0IE1vZGFsIENTU1xyXG4gICAgICAgIG1vZGFsUGFnZS5tb2RhbEhUTUwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiOyAvLyBIaWRlIGF0IHRoZSBzY3JlZW4gbW9kYWxcclxuXHJcbiAgICAgICAgLy8gQWxsb3cgY2xpY2sgb3IgZm9jdXMgd2l0aCBpbmVydCB0byB0aGUgQmFja2dyb3VuZFBhZ2UgXHJcbiAgICAgICAgYmFja2dyb3VuZFBhZ2UubWFpbkhUTUwucmVtb3ZlQXR0cmlidXRlKFwiaW5lcnRcIik7XHJcbiAgICAgICAgYmFja2dyb3VuZFBhZ2UuaGVhZGVySFRNTC5yZW1vdmVBdHRyaWJ1dGUoXCJpbmVydFwiKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKG1vZGFsUGFnZSkge1xyXG4gICAgICAgIGNvbnN0IGFsbElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke21vZGFsUGFnZS5tb2RhbElEfSBpbnB1dGApO1xyXG4gICAgICAgIGNvbnN0IGFsbFRleHRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgIyR7bW9kYWxQYWdlLm1vZGFsSUR9IHRleHRhcmVhYCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiX19fX1NlbmQgTWVzc2FnZV9fX19fXCIpO1xyXG5cclxuICAgICAgICBsZXQgZnVsbG1lc3NhZ2UgPSBcIlwiO1xyXG5cclxuICAgICAgICBhbGxJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiB7XHJcbiAgICAgICAgICAgIGZ1bGxtZXNzYWdlICs9ICdcXG4nICsgaW5wdXQuaWQgKyBcIjogXCIgKyBpbnB1dC52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYWxsVGV4dEFyZWEuZm9yRWFjaCh0ZXh0YXJlYSA9PiB7XHJcbiAgICAgICAgICAgIGZ1bGxtZXNzYWdlICs9ICdcXG4nICsgdGV4dGFyZWEuaWQgKyBcIjogXCIgKyB0ZXh0YXJlYS52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGZ1bGxtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZ1bGxtZXNzYWdlKTtcclxuICAgICAgICAgICAgYWxlcnQoYE1lc3NhZ2UgRW52b3llciAhICR7ZnVsbG1lc3NhZ2V9YCk7XHJcbiAgICAgICAgICAgIGNsb3NlTW9kYWwobW9kYWxQYWdlKTsgLy8gQ2xvc2UgbW9kYWwgYWZ0ZXIgbWVzc2FnZSBzZW5kXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiU29tZXRoaW5nIHdyb25nIG1lc3NhZ2Ugbm8gc2VuZCBiZWNhdXNlIGZ1bGxtZXNzYWdlIGlzIGVtcHR5IG9yIGRvbid0IGV4aXN0cyBmcm9tIHNlbmRNZXNzYWdlKClcIik7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyZXVyIG1lc3NhZ2Ugbm9uIGVudm95ZXIgOihcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGJhY2tncm91bmRQYWdlLCBtb2RhbFBhZ2UsXHJcbiAgICAgICAgYWRkQ29udGFjdEZvcm1MaXN0ZW5lciwgYWRkS2V5Ym9hcmRMaXN0ZW5lcixcclxuICAgICAgICBvcGVuTW9kYWwsIGNsb3NlTW9kYWwsXHJcbiAgICAgICAgc2V0VGl0bGVNb2RhbCxcclxuICAgICAgICBzZW5kTWVzc2FnZVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgZGlzcGxheU1lZGlhIH0gZnJvbSAnLi4vZGF0YS9kaXNwbGF5TWVkaWEnO1xyXG5pbXBvcnQgeyBzb3J0QnlMaWtlcywgc29ydEJ5RGF0ZSwgc29ydEJ5VGl0bGUgfSBmcm9tICcuLi91dGlscy9zb3J0QnknO1xyXG5cclxuXHJcbi8qKiBHRU5FUkFURSBFVkVOVCBGT1IgU0VMRUNUIEZJTFRFUiBDT01QT05FTlRTIEFORCBCRUhBVklPUiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0RmlsdGVyQ29tcG9uZW50KGRhdGEsIGlkVVJMKSB7XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0RmlsdGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWxlY3RfZmlsdGVyIC5zZWxlY3RfYnV0dG9uXCIpOyAvLyBCdXR0b24gU2VsZWN0XHJcbiAgICBjb25zdCBzZWxlY3RGaWx0ZXJTZWxlY3QxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWxlY3QxXCIpOyAvLyBGaXJzdCBTZWxlY3QgKGJ5IGRlZmF1bHQgRGF0ZSlcclxuICAgIGNvbnN0IHNlbGVjdEZpbHRlclNlbGVjdDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdDJcIik7IC8vIDJuZCBTZWxlY3QgKGJ5IGRlZmF1bHQgVGl0cmUpXHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUZpbHRlckFjdGlvbihldmVudCkge1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZEl0ZW0gPSBldmVudC50YXJnZXQuaW5uZXJIVE1MOyAvLyBHZXQgaW5uZXJIVE1MIG9mIHNlbGVjdGVkIGl0ZW1cclxuXHJcblxyXG4gICAgICAgIHN3aXRjaCAoc2VsZWN0ZWRJdGVtKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0RhdGUnOlxyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyQnV0dG9uLmlubmVySFRNTCA9IFwiRGF0ZVwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyU2VsZWN0MS5pbm5lckhUTUwgPSBcIlBvcHVsYXJpdMOpXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJTZWxlY3QyLmlubmVySFRNTCA9IFwiVGl0cmVcIjtcclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVkaWFfc2VjdGlvbicpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAvLyBCdWlsZCBNZWRpYXMgRGF0YVxyXG4gICAgICAgICAgICAgICAgZGlzcGxheU1lZGlhKGRhdGEuc29ydChzb3J0QnlEYXRlKSwgXCIubWVkaWFfc2VjdGlvblwiLCBpZFVSTCk7XHJcbiAgICAgICAgICAgICAgICAvLyBFbmQgYnVpbGQgTWVkaWFzIERhdGFcclxuXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnVGl0cmUnOlxyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyQnV0dG9uLmlubmVySFRNTCA9IFwiVGl0cmVcIjtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlclNlbGVjdDEuaW5uZXJIVE1MID0gXCJEYXRlXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJTZWxlY3QyLmlubmVySFRNTCA9IFwiUG9wdWxhcml0w6lcIjtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lZGlhX3NlY3Rpb24nKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgLy8gQnVpbGQgTWVkaWFzIERhdGFcclxuICAgICAgICAgICAgICAgIGRpc3BsYXlNZWRpYShkYXRhLnNvcnQoc29ydEJ5VGl0bGUpLCBcIi5tZWRpYV9zZWN0aW9uXCIsIGlkVVJMKTtcclxuICAgICAgICAgICAgICAgIC8vIEVuZCBidWlsZCBNZWRpYXMgRGF0YVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdQb3B1bGFyaXTDqSc6XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJCdXR0b24uaW5uZXJIVE1MID0gXCJQb3B1bGFyaXTDqVwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyU2VsZWN0MS5pbm5lckhUTUwgPSBcIkRhdGVcIjtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlclNlbGVjdDIuaW5uZXJIVE1MID0gXCJUaXRyZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZWRpYV9zZWN0aW9uJykuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vIEJ1aWxkIE1lZGlhcyBEYXRhXHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5TWVkaWEoZGF0YS5zb3J0KHNvcnRCeUxpa2VzKSwgXCIubWVkaWFfc2VjdGlvblwiLCBpZFVSTCk7XHJcbiAgICAgICAgICAgICAgICAvLyBFbmQgYnVpbGQgTWVkaWFzIERhdGFcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInNlbGVjdGVkSXRlbSBub3QgZm91bmQgZXJyb3IgYWJvdXQgaGFuZGxlRmlsdGVyQWN0aW9uKClcIik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgc2VsZWN0RmlsdGVyU2VsZWN0MS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlRmlsdGVyQWN0aW9uKVxyXG4gICAgc2VsZWN0RmlsdGVyU2VsZWN0Mi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlRmlsdGVyQWN0aW9uKVxyXG59XHJcbi8qKiBFTkQgR0VORVJBVEUgRVZFTlQgRk9SIFNFTEVDVCBGSUxURVIgQ09NUE9ORVROUyBBTkQgQkVIQVZJT1IgKi9cclxuIiwiLyoqIEZ1bmN0aW9uIHRvIHNvcnQgYnkgTGlrZXMsRGF0ZXMgb3IgVGl0bGUgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRCeUxpa2VzKGEsIGIpIHtcclxuICAgIGlmIChhLmxpa2VzID4gYi5saWtlcykge1xyXG4gICAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG4gICAgaWYgKGEubGlrZXMgPCBiLmxpa2VzKSB7XHJcbiAgICAgICAgcmV0dXJuIDFcclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc29ydEJ5RGF0ZShhLCBiKSB7XHJcbiAgICBpZiAoYS5kYXRlID4gYi5kYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICBpZiAoYS5kYXRlIDwgYi5kYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIDFcclxuICAgIH1cclxuICAgIHJldHVybiAwO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc29ydEJ5VGl0bGUoYSwgYikge1xyXG4gICAgaWYgKGEudGl0bGUgPCBiLnRpdGxlKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICBpZiAoYS50aXRsZSA+IGIudGl0bGUpIHtcclxuICAgICAgICByZXR1cm4gMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbn1cclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAY2hhcnNldCBcXFwiVVRGLThcXFwiO1xcbi8qKiBVc2VkIHRvIGxvYWQgYWxsIHZhcmlhYmxlcyBmb3IgdGhpcyBwcm9qZWN0IGFib3V0IFNDU1MgKiovIC8qKiBGT05UICoqL1xcbi8qKiBFTkQgRk9OVCAqKi9cXG4vKiogQ09MT1IgVkFSSUFCTEVTICoqL1xcbi8qKiBFTkQgQ09MT1IgVkFSSUFCTEVTICoqL1xcbi8qKiBJTVBPUlQgR0xPQkFMIENTUyBGT1IgRk9OVFMgSFRNTCwqIFNFTEVDVE9SICoqL1xcbi8qKioqKioqKioqKioqKioqKioqKioqIEdFTkVSQUwgKioqKioqKioqKioqKioqKioqKioqKi9cXG5odG1sLFxcbioge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGFuaW1hdGlvbjogMXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcbn1cXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxufVxcblxcbi8qKioqKioqKioqKioqKioqKioqKioqIEVORCBHRU5FUkFMICoqKioqKioqKioqKioqKioqKioqKiovXFxuLyoqIElNUE9SVCBNSVhJTiAqKi9cXG4vKiogSU1QT1JUIEhFQURFUiBTVFlMRVMgKiovXFxuaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogMTIwcHg7XFxufVxcbmhlYWRlciBoMSB7XFxuICBjb2xvcjogIzkwMUMxQztcXG4gIHRvcDogNDRweDtcXG4gIG1hcmdpbi1yaWdodDogMTAwcHg7XFxuICBmb250LXdlaWdodDogNDAwO1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDQ3cHg7XFxufVxcbmhlYWRlciAubG9nbyxcXG5oZWFkZXIgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXG4gIGhlaWdodDogNTBweDtcXG59XFxuaGVhZGVyIC5sb2dvIHtcXG4gIG1hcmdpbi1sZWZ0OiAxMTVweDtcXG59XFxuaGVhZGVyIC5sb2dvX3Bob3RvZ3JhcGhlciB7XFxuICBtYXJnaW4tbGVmdDogMTAwcHg7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG5cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUlMgQ0FSRFMgKiovXFxuLnBob3RvZ3JhcGhlcl9jYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBpbWcge1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxuICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcbiAgaGVpZ2h0OiAyMDBweDtcXG4gIHdpZHRoOiAyMDBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaW1nOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoMixcXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDMsXFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg0LFxcbi5waG90b2dyYXBoZXJfY2FyZCBoNSB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGgyIHtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBjb2xvcjogI0QzNTczQztcXG4gIGZvbnQtc2l6ZTogMzZweDtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGgzIHtcXG4gIGZvbnQtc2l6ZTogMTMuMDAxMDgzNDIzNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDE3cHg7XFxuICBjb2xvcjogIzkwMUMxQztcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg0IHtcXG4gIG1hcmdpbi10b3A6IDJweDtcXG4gIGZvbnQtc2l6ZTogMTBweDtcXG4gIGxpbmUtaGVpZ2h0OiAxM3B4O1xcbiAgY29sb3I6ICMwMDAwMDA7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBoNSB7XFxuICBtYXJnaW4tdG9wOiAycHg7XFxuICBmb250LXNpemU6IDlweDtcXG4gIGxpbmUtaGVpZ2h0OiAxMnB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6ICM3NTc1NzU7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoMyB7XFxuICAgIGZvbnQtc2l6ZTogMTYuOTAxNDA4NDUwN3B4O1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGg0IHtcXG4gICAgZm9udC1zaXplOiAxM3B4O1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gICAgZm9udC1zaXplOiAxMS43cHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGgzIHtcXG4gICAgZm9udC1zaXplOiAxOS41MDE2MjUxMzU0cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDQge1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDUge1xcbiAgICBmb250LXNpemU6IDEzLjVweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBpbWcge1xcbiAgICB3aWR0aDogMjMwcHg7XFxuICAgIGhlaWdodDogMjMwcHg7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgTU9EQUwgQ09NUE9ORU5UICoqL1xcbi5tb2RhbF9jb250YWN0IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREI4ODc2O1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBwYWRkaW5nOiAzNXB4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG4ubW9kYWxfY29udGFjdCAubW9kYWxfaGVhZGVyIHtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luLXRvcDogLTIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG59XFxuLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciAjY2xvc2VNb2RhbCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgI2Nsb3NlTW9kYWwgLmRlZmF1bHRfY29sb3Ige1xcbiAgZmlsbDogd2hpdGU7XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgI2Nsb3NlTW9kYWwgLmNvbG9yX3ByaW1hcnkxIHtcXG4gIGZpbGw6ICM5MDFDMUM7XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgaDIge1xcbiAgZm9udC1zaXplOiA2My43MnB4O1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgZm9ybSBpbnB1dCB7XFxuICBmb250LXNpemU6IDMwcHg7XFxuICBtYXJnaW4tYm90dG9tOiA1cHg7XFxuICBwYWRkaW5nOiAxMHB4O1xcbn1cXG4ubW9kYWxfY29udGFjdCBmb3JtIHRleHRhcmVhIHtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgcmVzaXplOiB2ZXJ0aWNhbDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgZm9ybSBpbnB1dCxcXG4ubW9kYWxfY29udGFjdCBmb3JtIHRleHRhcmVhIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA2OHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG4ubW9kYWxfY29udGFjdCBmb3JtIGxhYmVsIHtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbn1cXG4ubW9kYWxfY29udGFjdCBmb3JtIGxhYmVsOmxhc3QtY2hpbGQge1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgLmhlbHBfYmxpbmQge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmhpZGVfY29udGVudCB7XFxuICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLW9mZjtcXG59XFxuQGtleWZyYW1lcyBmYWRlLW9mZiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMC40O1xcbiAgfVxcbn1cXG5cXG4uc2hvd19jb250ZW50IHtcXG4gIGFuaW1hdGlvbjogMC41cyBlYXNlLWluIGZvcndhcmRzIGZhZGUtaW47XFxufVxcbkBrZXlmcmFtZXMgZmFkZS1pbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuNDtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbn1cXG5cXG4vKiogSU1QT1JUIENPTlRBQ1QgQlVUVE9OIENPTVBPTkVOVCAqKi9cXG4uZmlzaGV5ZV9idXR0b24ge1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAxMXB4O1xcbiAgbWluLXdpZHRoOiAxNzBweDtcXG4gIG1pbi1oZWlnaHQ6IDcwcHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTAxQzFDO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdHJhbnNpdGlvbjogY29sb3IgMC41cyBlYXNlLWluLCBiYWNrZ3JvdW5kLWNvbG9yIDAuNXMgZWFzZS1pbjtcXG59XFxuLmZpc2hleWVfYnV0dG9uOmhvdmVyIHtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0RCODg3NjtcXG59XFxuXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIIEhFQURFUiBDT01QT05FTlQgKiovXFxuLnBob3RvZ3JhcGhfaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZmxleC13cmFwOiBuby13cmFwO1xcbiAgYWxpZ24tY29udGVudDogZmxlZC1lbmQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkFGQUZBO1xcbiAgaGVpZ2h0OiAzMTNweDtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBwYWRkaW5nLWxlZnQ6IDMwcHg7XFxuICBwYWRkaW5nLXJpZ2h0OiAzMHB4O1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgZGl2Om50aC1jaGlsZCgzKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBoMSxcXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDIsXFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNDAwO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDEge1xcbiAgZm9udC1zaXplOiA2My43MnB4O1xcbiAgbWFyZ2luLWJvdHRvbTogLTE1cHg7XFxuICBjb2xvcjogI0QzNTczQztcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgyIHtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgZm9udC1zaXplOiAyMy4yMjU4MDY0NTE2cHg7XFxuICBjb2xvcjogIzkwMUMxQztcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGNvbG9yOiAjNTI1MjUyO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYWJvdXQsXFxuLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2J1dHRvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9idXR0b24ge1xcbiAgbWFyZ2luLXRvcDogMzBweDtcXG4gIG1hcmdpbi1yaWdodDogODBweDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2Fib3V0IHtcXG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgYWxpZ24tY29udGVudDogZmxlZC1lbmQ7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcGFkZGluZy10b3A6IDE1cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgaDEge1xcbiAgICBmb250LXNpemU6IDQxLjRweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMiB7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMyB7XFxuICAgIGZvbnQtc2l6ZTogMTYuMzYzNjM2MzYzNnB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxuICAucGhvdG9ncmFwaF9oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1jb250ZW50OiBmbGVkLWVuZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2J1dHRvbiB7XFxuICAgIGFsaWduLWl0ZW1zOiBpbmhlcml0O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDBweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBtYXJnaW4tdG9wOiAyMDBweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciA+IC5waG90b2dyYXBoX2Fib3V0IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgaDEsXFxuaDIsXFxuaDMge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgPiAucGhvdG9ncmFwaGVyX2NhcmQge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbn1cXG4vKiogSU1QT1JUIFNFTEVDVCBGSUxURVIgQ09NUE9ORU5UICoqL1xcbi5zZWxlY3RfYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1jb250ZW50OiBmbGV4LWVuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBiYWNrZ3JvdW5kOiAjOTAxQzFDO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1jb2xvcjogbm9uZTtcXG4gIHdpZHRoOiAxNzBweDtcXG4gIGhlaWdodDogNzBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBlYXNlLWluO1xcbiAgY29udGVudDogXFxcIj5cXFwiO1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbiAgZm9udC1zaXplOiAyNXB4O1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxufVxcblxcbi5zZWxlY3RfZmlsdGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuXFxuLnNlbGVjdF9jb250ZW50IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBiYWNrZ3JvdW5kOiAjOTAxQzFDO1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNXB4O1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDVweDtcXG4gIG1pbi13aWR0aDogMTYwcHg7XFxuICBib3gtc2hhZG93OiAwcHggMnB4IDhweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgei1pbmRleDogMTtcXG59XFxuLnNlbGVjdF9jb250ZW50IC53aGl0ZWxpbmUge1xcbiAgd2lkdGg6IDkwJTtcXG4gIGhlaWdodDogMXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBtYXJnaW4tbGVmdDogNSU7XFxufVxcbi5zZWxlY3RfY29udGVudCBhIHtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICB3aWR0aDogMTcwcHg7XFxuICBoZWlnaHQ6IDYwcHg7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuLnNlbGVjdF9jb250ZW50IGE6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbjtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbn1cXG5cXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2NvbnRlbnQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi5zZWxlY3RfZmlsdGVyOmhvdmVyIC5zZWxlY3RfYnV0dG9uOjphZnRlciB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxufVxcblxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIFNUQVRJU1RJQyBDT01QT05FTlQgKiovXFxuLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREI4ODc2O1xcbiAgbWluLXdpZHRoOiAzNzZweDtcXG4gIG1pbi1oZWlnaHQ6IDg5cHg7XFxuICBib3R0b206IDA7XFxuICByaWdodDogMzhweDtcXG4gIHotaW5kZXg6IDI7XFxuICBtYXJnaW4tYm90dG9tOiAtMjJweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMgLnRvdGFsX2xpa2VzLFxcbi5waG90b2dyYXBoZXJfc3RhdGlzdGljIC5wcmljZV9yYXRlX2RhaWx5IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAyMy4yMjU4MDY0NTE2cHg7XFxuICBsaW5lLWhlaWdodDogMzFweDtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgcGFkZGluZy10b3A6IDE4cHg7XFxufVxcbi5waG90b2dyYXBoZXJfc3RhdGlzdGljIC50b3RhbF9saWtlczphZnRlciB7XFxuICBwYWRkaW5nLWxlZnQ6IDVweDtcXG4gIGNvbnRlbnQ6IFxcXCLimaVcXFwiO1xcbiAgZm9udC1zaXplOiAzMC44OTAzMjI1ODA2cHg7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbn1cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUiBNRURJQSBDQVJEUyBDT01QT05FTlQgKiovXFxuLm1lZGlhX2NhcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBtYXgtd2lkdGg6IDM1MHB4O1xcbn1cXG4ubWVkaWFfY2FyZCBpbWcsXFxuLm1lZGlhX2NhcmQgdmlkZW8ge1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxcztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWF4LWhlaWdodDogMzAwcHg7XFxuICBtaW4taGVpZ2h0OiAzMDBweDtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG4ubWVkaWFfY2FyZCBpbWc6aG92ZXIsXFxuLm1lZGlhX2NhcmQgdmlkZW86aG92ZXIge1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxcztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxufVxcbi5tZWRpYV9jYXJkIC5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG4ubWVkaWFfY2FyZCBoNiB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbn1cXG4ubWVkaWFfY2FyZCBoNjpsYXN0LWNoaWxkOjphZnRlciB7XFxuICBmb250LXNpemU6IDMwcHg7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxuICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAubWVkaWFfY2FyZCBpbWcsXFxuLm1lZGlhX2NhcmQge1xcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgUEFHRVMgKG90aGVyKSBTdHlsZXMgKiovXFxuLnBob3RvZ3JhcGhlcl9zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcbiAgZ2FwOiA3MHB4O1xcbiAgbWFyZ2luLXRvcDogNzVweDtcXG4gIG1hcmdpbi1ib3R0b206IDc1cHg7XFxufVxcblxcbi5tYXJnaW5fbGVmdF9yaWdodCB7XFxuICBtYXJnaW46IDAgMTAwcHg7XFxufVxcblxcbi5maWx0ZXJfc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbn1cXG4uZmlsdGVyX3NlY3Rpb24gaDU6Zmlyc3QtY2hpbGQge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIG1hcmdpbi1yaWdodDogMjhweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgY29sb3I6ICMwMDAwMDA7XFxufVxcbi5maWx0ZXJfc2VjdGlvbiAuc2VsZWN0X2ZpbHRlciB7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG5cXG4ubWVkaWFfc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXG4gIHJvdy1nYXA6IDMwcHg7XFxuICBjb2x1bW4tZ2FwOiA5NXB4O1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDc1cHg7XFxufVxcblxcbi8qKiBJTVBPUlQgRk9PVEVSIFNUWUxFUyAqKi9cXG5mb290ZXIge1xcbiAgaGVpZ2h0OiAycHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgbWFyZ2luLXRvcDogNzVweDtcXG59XFxuXFxuLyoqIElNUE9SVCBSRVNQT05TSVZFIFNUWUxFUyBmb3IgTm9uIENvbXBvbmVudHMgRWxlbWVudHNcXG4gKGNvbXBvbmVudHMgRWxlbWVudHMgZ290IHRoZWlyIG93biBSZXNwb25zaXZlIFJ1bGVzIGluIHRoZWlyIFN0eWxlc2hlZXQpICoqL1xcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfc2VjdGlvbixcXG4ubWVkaWFfc2VjdGlvbiB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxuICBoZWFkZXIge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBtYXJnaW4tdG9wOiA0MHB4O1xcbiAgICBoZWlnaHQ6IDEwMHB4O1xcbiAgfVxcbiAgaGVhZGVyIC5sb2dvX3Bob3RvZ3JhcGhlciB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcbiAgfVxcbiAgaGVhZGVyIC5sb2dvLFxcbmhlYWRlciBoMSB7XFxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxuICAgIGZvbnQtc2l6ZTogMzBweDtcXG4gIH1cXG4gIC5tYXJnaW5fbGVmdF9yaWdodCB7XFxuICAgIG1hcmdpbjogMCAyMHB4O1xcbiAgfVxcbiAgLmZpbHRlcl9zZWN0aW9uIHtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfc2VjdGlvbiB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIC5tZWRpYV9zZWN0aW9uIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL21haW4uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX3ZhcmlhYmxlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fZ2xvYmFsLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3BhZ2VzL19oZWFkZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX21peGluLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3Bob3RvZ3JhcGhlcl9jYXJkcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL21vZGFsL19jb250YWN0LnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX2Zpc2hleWVfYnV0dG9uLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3Bob3RvZ3JhcGhfaGVhZGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3NlbGVjdF9maWx0ZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fcGhvdG9ncmFwaGVyX3N0YXRpc3RpYy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19tZWRpYV9jYXJkcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9wYWdlcy9fcGFnZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvcGFnZXMvX2Zvb3Rlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fcmVzcG9uc2l2ZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGdCQUFnQjtBQUFoQiw2REFBQSxFQUFBLFdBQUE7QUNNQSxlQUFBO0FBRUEsc0JBQUE7QUFTQSwwQkFB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QTtFTnNIVjtFTW5ITTtJQUNJLFVBQUE7RU5xSFY7QUFDRjs7QUF0TkEsc0NBQUE7QU9iQTtFQUNJLGVBQUE7RUFDQSxnQk5DYztFTUFkLGtDTkZVO0VNR1YsWU5LWTtFTUpaLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLHlCTkdhO0VNRmIsa0JBQUE7RUFDQSxlQUFBO0VBQ0EsNkRBQUE7QVB1T0o7QU9yT0k7RUFDSSxjTkxhO0VNTWIseUJBQUE7QVB1T1I7O0FBeE9BLHlDQUFBO0FRZkE7RUpLRSxhQUFBO0VBQ0EsbUJJTHNCO0VKUXBCLGtCSVJ5QjtFSll6Qix1Qklaa0M7RUpnQmxDLDhCSWhCNEM7RUFDNUMseUJQYWtCO0VPWmxCLGFBQUE7RUFDQSxnQkFBQTtFSmdDRixrQkkvQmtDO0VKZ0NsQyxtQkloQ2tDO0FSZ1FwQztBUTlQSTtFQUNJLGtCQUFBO0FSZ1FSO0FRNVBJOzs7RUFHSSxrQ1BkTTtFT2VOLGdCUGRZO0FENFFwQjtBUTNQSTtFQUNJLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxjUFRTO0FEc1FqQjtBUTFQSTtFQUNJLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQkFBQTtFQUNBLGNQakJTO0FENlFqQjtBUXpQSTtFQUNJLGVBQUE7RUFDQSxjUHBCVztBRCtRbkI7QVF4UEk7O0VKaENGLGFBQUE7RUFDQSxzQklpQzBCO0VKdEJ4Qix1QklzQjRDO0VKbEI1Qyx1QklrQm9EO0FSNlB4RDtBUTFQSTtFQUNJLGdCQUFBO0VBQ0Esa0JBQUE7QVI0UFI7QVF6UEk7RUFDSSxpQkFBQTtFQUNBLG1CQUFBO0FSMlBSOztBUXRQQTtFQUNJO0lBQ0ksdUJQL0NRO0lHSmQsYUFBQTtJQUNBLHNCSW1EMEI7SUpoRHhCLGVJZ0RnQztJSjVDaEMsdUJJNENzQztJSnhDdEMsOEJJd0NnRDtJSnBDaEQsbUJJb0MrRDtJQUMzRCxpQkFBQTtFUjhQTjtFUTNQRTtJQUNJLGlCQUFBO0VSNlBOO0VRMVBFO0lBQ0ksZUFBQTtFUjRQTjtFUXhQRTtJQUNJLDBCQUFBO0VSMFBOO0VRdlBF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Z0JBQUE7RUFDQSxtQkFBQTtBWnlnQko7O0FZbmdCQTtFQUNJLGVBQUE7QVpzZ0JKOztBWW5nQkE7RVJYRSxhQUFBO0VBQ0EsbUJRV3NCO0VSSXBCLHFCUUoyQztFQUMzQyxjQUFBO0Fad2dCSjtBWXRnQkk7RUFDSSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NYdEJNO0VXdUJOLGdCWHJCVTtFV3NCVixrQkFBQTtFQUNBLGVBQUE7RUFDQSxjWGpCYTtBRHloQnJCO0FZcmdCSTtFQUNJLGdCQUFBO0FadWdCUjs7QVluZ0JBO0VBQ0ksYUFBQTtFQUNBLGtDQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBWnNnQko7O0FBdGhCQSwyQkFBQTtBYXpCQTtFQUNJLFdBQUE7RUFDQSxXQUFBO0VBQ0EsdUJaTVk7RVlMWixnQkFBQTtBYm1qQko7O0FBNWhCQTs0RUFBQTtBYzNCQTtFQUVJOztJQUVJLDhCQUFBO0VkMmpCTjtBQUNGO0FjdGpCQTtFQUVJO0lBQ0ksc0JBQUE7SUFDQSxnQkFBQTtJQUNBLGFBQUE7RWR1akJOO0VjcmpCTTtJQUNJLGNBQUE7RWR1akJWO0VjcGpCTTs7SUFFSSxpQkFBQTtJQUNBLGtCQUFBO0lBQ0EsZUFBQTtFZHNqQlY7RWNsakJFO0lBQ0ksY0FBQTtFZG9qQk47RWNoakJFO0lBQ0ksOEJBQUE7RWRrakJOO0FBQ0Y7QWM5aUJBO0VBRUk7SUFDSSwwQkFBQTtFZCtpQk47QUFDRjtBYzNpQkE7RUFFSTtJQUNJLDBCQUFBO0VkNGlCTjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qKiBVc2VkIHRvIGxvYWQgYWxsIHZhcmlhYmxlcyBmb3IgdGhpcyBwcm9qZWN0IGFib3V0IFNDU1MgKiovXFxyXFxuQGltcG9ydCBcXFwiX3ZhcmlhYmxlcy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIEdMT0JBTCBDU1MgRk9SIEZPTlRTIEhUTUwsKiBTRUxFQ1RPUiAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfZ2xvYmFsLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgTUlYSU4gKiovXFxyXFxuQGltcG9ydCBcXFwiX21peGluLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgSEVBREVSIFNUWUxFUyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJwYWdlcy9oZWFkZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVJTIENBUkRTICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvcGhvdG9ncmFwaGVyX2NhcmRzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgTU9EQUwgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvbW9kYWwvX2NvbnRhY3Quc2Nzc1xcXCI7XFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9tb2RhbC9fbGlnaHRib3guc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBDT05UQUNUIEJVVFRPTiBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9maXNoZXllX2J1dHRvbi5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBIT1RPR1JBUEggSEVBREVSIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3Bob3RvZ3JhcGhfaGVhZGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgU0VMRUNUIEZJTFRFUiBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9zZWxlY3RfZmlsdGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIFNUQVRJU1RJQyBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9waG90b2dyYXBoZXJfc3RhdGlzdGljLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIE1FRElBIENBUkRTIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL21lZGlhX2NhcmRzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEFHRVMgKG90aGVyKSBTdHlsZXMgKiovXFxyXFxuQGltcG9ydCBcXFwicGFnZXMvcGFnZXMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBGT09URVIgU1RZTEVTICoqL1xcclxcbkBpbXBvcnQgXFxcInBhZ2VzL2Zvb3Rlci5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFJFU1BPTlNJVkUgU1RZTEVTIGZvciBOb24gQ29tcG9uZW50cyBFbGVtZW50c1xcclxcbiAoY29tcG9uZW50cyBFbGVtZW50cyBnb3QgdGhlaXIgb3duIFJlc3BvbnNpdmUgUnVsZXMgaW4gdGhlaXIgU3R5bGVzaGVldCkgKiovXFxyXFxuQGltcG9ydCBcXFwiX3Jlc3BvbnNpdmUuc2Nzc1xcXCI7XCIsXCIvKiogRk9OVCAqKi9cXHJcXG4kZm9udF9nbG9iYWw6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXHJcXG4kZm9udF93ZWlnaHRfc21hbGw6IDQwMDtcXHJcXG4kZm9udF93ZWlnaHRfYmlnOiA3MDA7XFxyXFxuXFxyXFxuJGZvbnRfc2l6ZTogMzZweDtcXHJcXG4vKiogRU5EIEZPTlQgKiovXFxyXFxuXFxyXFxuLyoqIENPTE9SIFZBUklBQkxFUyAqKi9cXHJcXG4kZGVmYXVsdF9jb2xvcjogd2hpdGU7XFxyXFxuJGRlZmF1bHRfZm9udF9jb2xvcjogIzAwMDAwMDtcXHJcXG4kY29sb3JfZ3JheTogIzc1NzU3NTtcXHJcXG4kY29sb3JfcHJpbWFyeTE6ICM5MDFDMUM7XFxyXFxuJGNvbG9yX3ByaW1hcnkyOiAjRDM1NzNDO1xcclxcbiRjb2xvcl9zZWNvbmRhcnkyOiAjNTI1MjUyO1xcclxcbiRjb2xvcl9zZWNvbmRhcnkyX2JnOiAjRkFGQUZBO1xcclxcbiRjb2xvcl9iYWNrZ3JvdW5kOiAjREI4ODc2O1xcclxcbi8qKiBFTkQgQ09MT1IgVkFSSUFCTEVTICoqL1wiLFwiLyoqKioqKioqKioqKioqKioqKioqKiogR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1xcclxcbmh0bWwsXFxyXFxuKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgYW5pbWF0aW9uOiAxcyBlYXNlLWluIGZvcndhcmRzIGZhZGUtaW47XFxyXFxuXFxyXFxuICBAa2V5ZnJhbWVzIGZhZGUtaW4ge1xcclxcbiAgICAwJSB7XFxyXFxuICAgICAgb3BhY2l0eTogMDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAxMDAlIHtcXHJcXG4gICAgICBvcGFjaXR5OiAxLjA7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLyoqKioqKioqKioqKioqKioqKioqKiogRU5EIEdFTkVSQUwgKioqKioqKioqKioqKioqKioqKioqKi9cIixcImhlYWRlciB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMocm93LCBudWxsLCBudWxsLCBzcGFjZS1iZXR3ZWVuLCBjZW50ZXIpO1xcclxcbiAgICBoZWlnaHQ6IDEyMHB4O1xcclxcblxcclxcblxcclxcbiAgICBoMSB7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICAgICAgdG9wOiA0NHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMDBweDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfc21hbGw7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemU7XFxyXFxuICAgICAgICBsaW5lLWhlaWdodDogNDdweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubG9nbyxcXHJcXG4gICAgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXHJcXG4gICAgICAgIGhlaWdodDogNTBweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubG9nbyB7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogMTE1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMDBweDtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgIH1cXHJcXG59XCIsXCJAbWl4aW4gZmxleC1iYXNpYygkZmxleC1kaXJlY3Rpb24sXFxyXFxuICAkZmxleC13cmFwLFxcclxcbiAgJGFsaWduLWNvbnRlbnQsXFxyXFxuICAkanVzdGlmeS1jb250ZW50LFxcclxcbiAgJGFsaWduLWl0ZW1zKSB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246ICRmbGV4LWRpcmVjdGlvbjtcXHJcXG5cXHJcXG4gIEBpZiAoJGZsZXgtd3JhcCkge1xcclxcbiAgICBmbGV4LXdyYXA6ICRmbGV4LXdyYXA7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAaWYgKCRhbGlnbi1jb250ZW50KSB7XFxyXFxuICAgIGFsaWduLWNvbnRlbnQ6ICRhbGlnbi1jb250ZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgQGlmICgkanVzdGlmeS1jb250ZW50KSB7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogJGp1c3RpZnktY29udGVudDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIEBpZiAoJGFsaWduLWl0ZW1zKSB7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiAkYWxpZ24taXRlbXM7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi8vIEBtaXhpbiBtYXNrLWNyb3NzYnJvd3NlcigkdmFsdWUpIHtcXHJcXG4vLyAgIC13ZWJraXQtbWFzazogJHZhbHVlO1xcclxcbi8vICAgbWFzazogJHZhbHVlO1xcclxcbi8vIH1cXHJcXG5cXHJcXG4vLyBAbWl4aW4gbWFyZ2luLWxlZnQtYW5kLXJpZ2h0KCR2YWx1ZSkge1xcclxcbi8vICAgbWFyZ2luLWxlZnQ6ICR2YWx1ZTtcXHJcXG4vLyAgIG1hcmdpbi1yaWdodDogJHZhbHVlO1xcclxcbi8vIH1cXHJcXG5cXHJcXG5AbWl4aW4gcGFkZGluZy1sZWZ0LWFuZC1yaWdodCgkdmFsdWUpIHtcXHJcXG4gIHBhZGRpbmctbGVmdDogJHZhbHVlO1xcclxcbiAgcGFkZGluZy1yaWdodDogJHZhbHVlO1xcclxcbn1cIixcIi5waG90b2dyYXBoZXJfY2FyZCB7XFxyXFxuICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBudWxsLCBjZW50ZXIsIGNlbnRlcik7XFxyXFxuICAgIGp1c3RpZnktc2VsZjogY2VudGVyO1xcclxcblxcclxcbiAgICBpbWcge1xcclxcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcclxcbiAgICAgICAgaGVpZ2h0OiAyMDBweDtcXHJcXG4gICAgICAgIHdpZHRoOiAyMDBweDtcXHJcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcclxcblxcclxcbiAgICAgICAgJjpob3ZlciB7XFxyXFxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNTApO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIGgyLFxcclxcbiAgICBoMyxcXHJcXG4gICAgaDQsXFxyXFxuICAgIGg1IHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X3NtYWxsO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgyIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkyO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMi43NjkpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDE3cHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGg0IHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDJweDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMy42KTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxM3B4O1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDUge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyA0KTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAxMnB4O1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9ncmF5O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgICAgIGgzIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIuNzY5ICogMS4zKTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDQge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMy42ICogMS4zKTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDUge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gNCAqIDEuMyk7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgICAgIGgzIHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIuNzY5ICogMS41KTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGg0IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDMuNiAqIDEuNSk7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyA0ICogMS41KTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGltZyB7XFxyXFxuICAgICAgICAgICAgd2lkdGg6IDIzMHB4O1xcclxcbiAgICAgICAgICAgIGhlaWdodDogMjMwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XCIsXCIubW9kYWxfY29udGFjdCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgdG9wOiA1MCU7XFxyXFxuICAgIGxlZnQ6IDUwJTtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxyXFxuICAgIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9iYWNrZ3JvdW5kO1xcclxcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgcGFkZGluZzogMzVweDtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcblxcclxcblxcclxcbiAgICAubW9kYWxfaGVhZGVyIHtcXHJcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogLTIwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbiAgICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXHJcXG5cXHJcXG4gICAgICAgICNjbG9zZU1vZGFsIHtcXHJcXG4gICAgICAgICAgICAvLyBDbG9zZSBNb2RhbCBQaWN0dXJlXFxyXFxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcblxcclxcbiAgICAgICAgICAgIC5kZWZhdWx0X2NvbG9yIHtcXHJcXG4gICAgICAgICAgICAgICAgZmlsbDogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgICAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgICAgIC5jb2xvcl9wcmltYXJ5MSB7XFxyXFxuICAgICAgICAgICAgICAgIGZpbGw6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgICAgICAgICB9XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgICAgICBoMiB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgKiAxLjc3KTtcXHJcXG4gICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGZvcm0gaW5wdXQge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjIpO1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNXB4O1xcclxcbiAgICAgICAgcGFkZGluZzogMTBweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIHRleHRhcmVhIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvMS41KTtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XFxyXFxuICAgICAgICByZXNpemU6IHZlcnRpY2FsO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGZvcm0gaW5wdXQsXFxyXFxuICAgIGZvcm0gdGV4dGFyZWEge1xcclxcblxcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICBoZWlnaHQ6IDY4cHg7XFxyXFxuICAgICAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgZm9ybSBsYWJlbCB7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIGxhYmVsOmxhc3QtY2hpbGQge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuaGVscF9ibGluZCB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcblxcclxcbi5oaWRlX2NvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLW9mZjtcXHJcXG5cXHJcXG4gICAgQGtleWZyYW1lcyBmYWRlLW9mZiB7XFxyXFxuICAgICAgICAwJSB7XFxyXFxuICAgICAgICAgICAgb3BhY2l0eTogMS4wO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgMTAwJSB7XFxyXFxuICAgICAgICAgICAgb3BhY2l0eTogMC40O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcblxcclxcblxcclxcbi5zaG93X2NvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcclxcblxcclxcbiAgICBAa2V5ZnJhbWVzIGZhZGUtaW4ge1xcclxcbiAgICAgICAgMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIDEwMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbn1cIixcIi5maXNoZXllX2J1dHRvbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS44KTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgcGFkZGluZzogMTFweDtcXHJcXG4gICAgbWluLXdpZHRoOiAxNzBweDtcXHJcXG4gICAgbWluLWhlaWdodDogNzBweDtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjVzIGVhc2UtaW4sIGJhY2tncm91bmQtY29sb3IgMC41cyBlYXNlLWluO1xcclxcblxcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIH1cXHJcXG59XCIsXCIucGhvdG9ncmFwaF9oZWFkZXIge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbm8td3JhcCwgZmxlZC1lbmQsIHNwYWNlLWJldHdlZW4sIG51bGwpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Jfc2Vjb25kYXJ5Ml9iZztcXHJcXG4gICAgaGVpZ2h0OiAzMTNweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgQGluY2x1ZGUgcGFkZGluZy1sZWZ0LWFuZC1yaWdodCgzMHB4KTtcXHJcXG5cXHJcXG4gICAgZGl2Om50aC1jaGlsZCgzKSB7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgaDEsXFxyXFxuICAgIGgyLFxcclxcbiAgICBoMyB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMSB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuNzcpO1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogLTE1cHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgyIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjU1KTtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250LXNpemUgLyAyKTtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3Jfc2Vjb25kYXJ5MjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9hYm91dCxcXHJcXG4gICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBudWxsLCBjZW50ZXIsIGZsZXgtc3RhcnQpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2Fib3V0IHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciB7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCB3cmFwLCBmbGVkLWVuZCwgc3BhY2UtYmV0d2VlbiwgY2VudGVyKTtcXHJcXG4gICAgICAgIHBhZGRpbmctdG9wOiAxNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuMTUpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciBoMiB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuOCk7XFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udC1zaXplIC8gMi4yKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9idXR0b24ge1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcXHJcXG5cXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBmbGVkLWVuZCwgc3BhY2UtYmV0d2VlbiwgY2VudGVyKTtcXHJcXG5cXHJcXG4gICAgICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGluaGVyaXQ7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwcHg7XFxyXFxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDIwMHB4O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlcj4ucGhvdG9ncmFwaF9hYm91dCB7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogMDtcXHJcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxLFxcclxcbiAgICBoMixcXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlcj4ucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbn1cIixcIi5zZWxlY3RfYnV0dG9uIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24tY29udGVudDogZmxleC1lbmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG5cXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcclxcbiAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIpO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xcclxcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNXB4O1xcclxcbiAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogbm9uZTtcXHJcXG4gICAgd2lkdGg6IDE3MHB4O1xcclxcbiAgICBoZWlnaHQ6IDcwcHg7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXHJcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCI+XFxcIjtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcclxcbiAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNDQpO1xcclxcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXHJcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RfZmlsdGVyIHtcXHJcXG5cXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxufVxcclxcblxcclxcblxcclxcbi5zZWxlY3RfY29udGVudCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYmFja2dyb3VuZDogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIG1pbi13aWR0aDogMTYwcHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDBweCAycHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxyXFxuICAgIHotaW5kZXg6IDE7XFxyXFxuXFxyXFxuXFxyXFxuICAgIC53aGl0ZWxpbmUge1xcclxcbiAgICAgICAgd2lkdGg6IDkwJTtcXHJcXG4gICAgICAgIGhlaWdodDogMXB4O1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogNSU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgYSB7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluO1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAyKTtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XFxyXFxuICAgICAgICB3aWR0aDogMTcwcHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDYwcHg7XFxyXFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhOmhvdmVyIHtcXHJcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2NvbnRlbnQge1xcclxcblxcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcXHJcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxyXFxufVwiLFwiLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbnVsbCwgZmxleC1zdGFydCwgc3BhY2UtYXJvdW5kLCBiYXNlbGluZSk7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIG1pbi13aWR0aDogMzc2cHg7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDg5cHg7XFxyXFxuICAgIGJvdHRvbTogMDtcXHJcXG4gICAgcmlnaHQ6IDM4cHg7XFxyXFxuICAgIHotaW5kZXg6IDI7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IC0yMnB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuICAgIC50b3RhbF9saWtlcyxcXHJcXG4gICAgLnByaWNlX3JhdGVfZGFpbHkge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjU1KTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzMXB4O1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgICAgICBwYWRkaW5nLXRvcDogMThweDtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAudG90YWxfbGlrZXM6YWZ0ZXIge1xcclxcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA1cHg7XFxyXFxuICAgICAgICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41NSAqIDEuMzMpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVwiLFwiLm1lZGlhX2NhcmQge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKGNvbHVtbiwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gICAgbWF4LXdpZHRoOiAzNTBweDtcXHJcXG5cXHJcXG4gICAgaW1nLFxcclxcbiAgICB2aWRlbyB7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICBtYXgtaGVpZ2h0OiAzMDBweDtcXHJcXG4gICAgICAgIG1pbi1oZWlnaHQ6IDMwMHB4O1xcclxcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuXFxyXFxuICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcclxcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjUwKTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcblxcclxcbiAgICAuZGV0YWlscyB7XFxyXFxuICAgICAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbnVsbCwgbnVsbCwgc3BhY2UtYmV0d2VlbiwgYmFzZWxpbmUpO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGg2IHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X3NtYWxsO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjUpO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoNjpsYXN0LWNoaWxkOjphZnRlciB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNSAqIDEuMjUpO1xcclxcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcclxcbiAgICAgICAgY29udGVudDogXFxcIuKZpVxcXCI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5tZWRpYV9jYXJkIGltZyxcXHJcXG4gICAgLm1lZGlhX2NhcmQge1xcclxcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgICB9XFxyXFxufVwiLFwiLy8vLyBNQUlOIFBBR0UgLy8vIFxcclxcbi5waG90b2dyYXBoZXJfc2VjdGlvbiB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxyXFxuICAgIGdhcDogNzBweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogNzVweDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogNzVweDtcXHJcXG59XFxyXFxuXFxyXFxuLy8vLy8gRU5EIE1BSU4gUEFHRSAvLyBcXHJcXG5cXHJcXG4vLy8vLy8vLy8vLy8vLy8vIFBIT1RPR1JBUEhFUiBQQUdFIC8vLy8vLy8gXFxyXFxuLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXHJcXG4gICAgbWFyZ2luOiAwIDEwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmlsdGVyX3NlY3Rpb24ge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbnVsbCwgbnVsbCwgbnVsbCwgYmFzZWxpbmUpO1xcclxcbiAgICBtYXJnaW4tbGVmdDogMDtcXHJcXG5cXHJcXG4gICAgaDU6Zmlyc3QtY2hpbGQge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgICAgIG1hcmdpbi1yaWdodDogMjhweDtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X2JpZztcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udC1zaXplIC8gMik7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuc2VsZWN0X2ZpbHRlciB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi5tZWRpYV9zZWN0aW9uIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXHJcXG4gICAgcm93LWdhcDogMzBweDtcXHJcXG4gICAgY29sdW1uLWdhcDogOTVweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogNzVweDtcXHJcXG59XFxyXFxuXFxyXFxuLy8vLy8vLy8vLy8vLy8gRU5EIFBIT1RPR1JBUEhFUiBQQUdFIC8vLy8vLy8vXFxyXFxuXFxyXFxuXCIsXCJmb290ZXIge1xcclxcbiAgICBoZWlnaHQ6IDJweDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICBtYXJnaW4tdG9wOiA3NXB4O1xcclxcbn1cIixcIkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9zZWN0aW9uLFxcclxcbiAgICAubWVkaWFfc2VjdGlvbiB7XFxyXFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxyXFxuXFxyXFxuICAgIGhlYWRlciB7XFxyXFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogNDBweDtcXHJcXG4gICAgICAgIGhlaWdodDogMTAwcHg7XFxyXFxuXFxyXFxuICAgICAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgLmxvZ28sXFxyXFxuICAgICAgICBoMSB7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS4yMCk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXHJcXG4gICAgICAgIG1hcmdpbjogMCAyMHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIC5maWx0ZXJfc2VjdGlvbiB7XFxyXFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoZXJfc2VjdGlvbiB7XFxyXFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLm1lZGlhX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbM10hLi9tYWluLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVszXSEuL21haW4uc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcImNvcmUtanMvc3RhYmxlXCI7XHJcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xyXG5cclxuaW1wb3J0ICcuLi8uLi9zY3NzL21haW4uc2Nzcyc7XHJcbmltcG9ydCB7IGdldFBob3RvZ3JhcGhlcnMsIGdldE1lZGlhcyB9IGZyb20gJy4uL3V0aWxzL2ZldGNoJztcclxuaW1wb3J0IHsgZGlzcGxheURhdGEgfSBmcm9tICcuLi9kYXRhL2Rpc3BsYXlEYXRhJztcclxuaW1wb3J0IHsgZGlzcGxheU1lZGlhIH0gZnJvbSAnLi4vZGF0YS9kaXNwbGF5TWVkaWEnO1xyXG5pbXBvcnQgeyBnZXRVcmxQYXJhbWV0ZXIgfSBmcm9tICcuLi91dGlscy9nZXRVcmxQYXJhbWV0ZXInO1xyXG5pbXBvcnQgeyBzb3J0QnlMaWtlcyB9IGZyb20gJy4uL3V0aWxzL3NvcnRCeSc7XHJcbmltcG9ydCB7IHNlbGVjdEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4uL3V0aWxzL3NlbGVjdEZpbHRlcic7XHJcbmltcG9ydCB7IG1vZGFsTWFzdGVyIH0gZnJvbSAnLi4vdXRpbHMvbW9kYWxNYXN0ZXInO1xyXG5cclxuXHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gaW5pdFByb2ZpbGUoaWRVUkwpIHtcclxuICAgIC8vIFRyeSB0byBnZXQgZGF0YSBmcm9tIHBob3RvZ3JhcGhlcnMgaWYgZXJyb3IgdGhlbiByZWRpcmVjdCB0byA0MDQgcGFnZVxyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyBTRVQgUGhvdG9ncmFwaGVyIFByb2ZpbGUgREFUQVxyXG4gICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlcnMgPSBhd2FpdCBnZXRQaG90b2dyYXBoZXJzKCk7XHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBwaG90b2dyYXBoZXIgRGlzcGxheVxyXG4gICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlclNlbGVjdGVkID0gYXdhaXQgZGlzcGxheURhdGEocGhvdG9ncmFwaGVycywgaWRVUkwpO1xyXG4gICAgICAgIC8vIEVORCBTRVQgUGhvdG9ncmFwaGVyIFByb2ZpbGUgRGF0YVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlY3Rpb24gcHJvZmlsZSBpbml0acOpIGF2ZWMgc3VjY8OocyBkZXB1aXMgaW5pdFByb2ZpbGUoKVwiKTtcclxuICAgICAgICBpbml0Q29udGFjdEZvcm0ocGhvdG9ncmFwaGVyU2VsZWN0ZWQpO1xyXG5cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIC8vIElmIGl0J3MgYSBmYWlsIHRoZW4gd2UgcmVkaXJlY3QgdG8gNDA0IEVycm9yIFBhZ2Ugc2luY2UgIGl0J3MgdGhlIG1pbmltYWwgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgIC8vIEF0bSA0MDQgZXJyb3IgcGFnZSBkb2Vzbid0IGV4aXN0cyBtdXN0IGJlIHdyaXRlIGxhdGVyXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJSZWRpcmlnZXIgdmVycyBsYSBwYWdlIDQwNFwiKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXRDb250YWN0Rm9ybShwaG90b2dyYXBoZXJTZWxlY3RlZCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBjb250YWN0Rm9ybU1vZGFsID0gbW9kYWxNYXN0ZXIoXCJib2R5XCIsIFwiaGVhZGVyXCIsIFwibWFpblwiLCBcImNvbnRhY3RfbW9kYWxcIik7IC8vIENyZWF0ZSBhIE1vZGVsIE1hc3RlclxyXG4gICAgICAgIGNvbnN0IG1vZGFsUGFnZSA9IGNvbnRhY3RGb3JtTW9kYWwubW9kYWxQYWdlOyAvLyBHZXQgbW9kZWxQYWdlIE9iamVjdFxyXG5cclxuICAgICAgICBjb250YWN0Rm9ybU1vZGFsLmFkZENvbnRhY3RGb3JtTGlzdGVuZXIobW9kYWxQYWdlKTsgLy8gQWRkIHNwZWNpZmljIGxpc3RlbmVyIHRvIENvbnRhY3QgRm9ybSBNb2RhbFxyXG5cclxuICAgICAgICBjb25zdCB0aXRsZU1vZGFsID0gYENvbnRhY3Rlei1tb2kgJHtwaG90b2dyYXBoZXJTZWxlY3RlZC5uYW1lfWA7IC8vIEJ1aWxkIHRoZSB0aXRsZSBNb2RhbFxyXG4gICAgICAgIGNvbnRhY3RGb3JtTW9kYWwuc2V0VGl0bGVNb2RhbChtb2RhbFBhZ2UsIFwiaDJcIiwgdGl0bGVNb2RhbCk7ICAvLyBTZXQgdGhlIHRpdGxlIE1vZGFsXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiRm9ybXVsYWlyZSBjb250YWN0IGluaXRpw6kgYXZlYyBzdWNjw6hzIGRlcHVpcyBpbml0Q29udGFjdEZvcm0oKVwiKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAvLyBJZiBpdCdzIGEgZmFpbCB0aGVuIHdlIHJlZGlyZWN0IHRvIDQwNCBFcnJvciBQYWdlIHNpbmNlICBpdCdzIHRoZSBtaW5pbWFsIGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICAvLyBBdG0gNDA0IGVycm9yIHBhZ2UgZG9lc24ndCBleGlzdHMgbXVzdCBiZSB3cml0ZSBsYXRlclxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVkaXJpZ2VyIHZlcnMgbGEgcGFnZSA0MDRcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBpbml0TWVkaWEoaWRVUkwpIHtcclxuICAgIC8vIFRyeSB0byBnZXQgZGF0YSBmcm9tIG1lZGlhIGlmIGVycm9yIHRoZW4gcmVkaXJlY3QgdG8gNDA0IHBhZ2VcclxuICAgIHRyeSB7XHJcblxyXG4gICAgICAgIC8vIEJ1aWxkIE1lZGlhcyBEYXRhXHJcbiAgICAgICAgY29uc3QgbWVkaWFzID0gYXdhaXQgZ2V0TWVkaWFzKCk7XHJcbiAgICAgICAgZGlzcGxheU1lZGlhKG1lZGlhcy5zb3J0KHNvcnRCeUxpa2VzKSwgXCIubWVkaWFfc2VjdGlvblwiLCBpZFVSTCk7IC8vIFNvcnQgYnkgZGVmYXVsdCBieSBsaWtlc1xyXG4gICAgICAgIC8vIEVuZCBidWlsZCBNZWRpYXMgRGF0YVxyXG5cclxuICAgICAgICAvLyBJbml0IHNlbGVjdEZpbHRlciBDb21wb25lbnQgYW5kIGhpcyBiZWhhdmlvciwgbmVlZCB0byBwcm92aWRlIHRoZSBEYXRhIHRvIGZpbHRlclxyXG4gICAgICAgIHNlbGVjdEZpbHRlckNvbXBvbmVudChtZWRpYXMsIGlkVVJMKTtcclxuXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiU2VjdGlvbiBtw6lkaWEgaW5pdGnDqSBhdmVjIHN1Y2PDqHMgZGVwdWlzIGluaXRNYWluKClcIik7XHJcblxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gaW5pdE1haW4oKSB7XHJcbiAgICAvLyBXZSBXYWl0IGZvciBnZXRVcmxQYXJhbWV0ZXIoKSB0byBiZSBjb21wbGV0ZSB0aGVuIHdlIHJ1biB0YXNrcyBmb3IgZ2VuZXJhdGUgcGFnZVxyXG4gICAgY29uc3QgaWRVUkwgPSBhd2FpdCBnZXRVcmxQYXJhbWV0ZXIoXCJpZFwiKTtcclxuICAgIGluaXRQcm9maWxlKGlkVVJMKTtcclxuICAgIGluaXRNZWRpYShpZFVSTCk7XHJcbn1cclxuXHJcblxyXG5pbml0TWFpbigpOyBcclxuIl0sIm5hbWVzIjpbImlzQ2FsbGFibGUiLCJyZXF1aXJlIiwidHJ5VG9TdHJpbmciLCIkVHlwZUVycm9yIiwiVHlwZUVycm9yIiwibW9kdWxlIiwiZXhwb3J0cyIsImFyZ3VtZW50IiwiaXNPYmplY3QiLCIkU3RyaW5nIiwiU3RyaW5nIiwidG9JbmRleGVkT2JqZWN0IiwidG9BYnNvbHV0ZUluZGV4IiwibGVuZ3RoT2ZBcnJheUxpa2UiLCJjcmVhdGVNZXRob2QiLCJJU19JTkNMVURFUyIsIiR0aGlzIiwiZWwiLCJmcm9tSW5kZXgiLCJPIiwibGVuZ3RoIiwiaW5kZXgiLCJ2YWx1ZSIsImluY2x1ZGVzIiwiaW5kZXhPZiIsInVuY3VycnlUaGlzIiwic2xpY2UiLCJ0b1N0cmluZyIsInN0cmluZ1NsaWNlIiwiaXQiLCJoYXNPd24iLCJvd25LZXlzIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlIiwiZGVmaW5lUHJvcGVydHlNb2R1bGUiLCJ0YXJnZXQiLCJzb3VyY2UiLCJleGNlcHRpb25zIiwia2V5cyIsImRlZmluZVByb3BlcnR5IiwiZiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImkiLCJrZXkiLCJERVNDUklQVE9SUyIsImNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciIsIm9iamVjdCIsImJpdG1hcCIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIm1ha2VCdWlsdEluIiwibmFtZSIsImRlc2NyaXB0b3IiLCJnZXQiLCJnZXR0ZXIiLCJzZXQiLCJzZXR0ZXIiLCJkZWZpbmVHbG9iYWxQcm9wZXJ0eSIsIm9wdGlvbnMiLCJzaW1wbGUiLCJ1bmRlZmluZWQiLCJnbG9iYWwiLCJ1bnNhZmUiLCJlcnJvciIsIm5vbkNvbmZpZ3VyYWJsZSIsIm5vbldyaXRhYmxlIiwiT2JqZWN0IiwiZmFpbHMiLCJkb2N1bWVudCIsIkVYSVNUUyIsImNyZWF0ZUVsZW1lbnQiLCJ1c2VyQWdlbnQiLCJ0ZXN0IiwiY2xhc3NvZiIsInByb2Nlc3MiLCJnZXRCdWlsdEluIiwiRGVubyIsInZlcnNpb25zIiwidmVyc2lvbiIsInY4IiwibWF0Y2giLCJzcGxpdCIsImNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSIsImRlZmluZUJ1aWx0SW4iLCJjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzIiwiaXNGb3JjZWQiLCJUQVJHRVQiLCJHTE9CQUwiLCJTVEFUSUMiLCJzdGF0IiwiRk9SQ0VEIiwidGFyZ2V0UHJvcGVydHkiLCJzb3VyY2VQcm9wZXJ0eSIsInByb3RvdHlwZSIsImRvbnRDYWxsR2V0U2V0IiwiZm9yY2VkIiwic2hhbSIsImV4ZWMiLCJOQVRJVkVfQklORCIsIkZ1bmN0aW9uUHJvdG90eXBlIiwiRnVuY3Rpb24iLCJhcHBseSIsImNhbGwiLCJSZWZsZWN0IiwiYmluZCIsImFyZ3VtZW50cyIsImFDYWxsYWJsZSIsImZuIiwidGhhdCIsImhhc093blByb3BlcnR5IiwiZ2V0RGVzY3JpcHRvciIsIlBST1BFUiIsInNvbWV0aGluZyIsIkNPTkZJR1VSQUJMRSIsImFGdW5jdGlvbiIsIm5hbWVzcGFjZSIsIm1ldGhvZCIsImlzTnVsbE9yVW5kZWZpbmVkIiwiViIsIlAiLCJmdW5jIiwiY2hlY2siLCJNYXRoIiwiZ2xvYmFsVGhpcyIsIndpbmRvdyIsInNlbGYiLCJ0b09iamVjdCIsImEiLCIkT2JqZWN0IiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJzdG9yZSIsImZ1bmN0aW9uVG9TdHJpbmciLCJpbnNwZWN0U291cmNlIiwiTkFUSVZFX1dFQUtfTUFQIiwic2hhcmVkIiwic2hhcmVkS2V5IiwiaGlkZGVuS2V5cyIsIk9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEIiwiV2Vha01hcCIsImhhcyIsImVuZm9yY2UiLCJnZXR0ZXJGb3IiLCJUWVBFIiwic3RhdGUiLCJ0eXBlIiwid21nZXQiLCJ3bWhhcyIsIndtc2V0IiwibWV0YWRhdGEiLCJmYWNhZGUiLCJTVEFURSIsInJlcGxhY2VtZW50IiwiZmVhdHVyZSIsImRldGVjdGlvbiIsImRhdGEiLCJub3JtYWxpemUiLCJQT0xZRklMTCIsIk5BVElWRSIsInN0cmluZyIsInJlcGxhY2UiLCJ0b0xvd2VyQ2FzZSIsImRvY3VtZW50QWxsIiwiYWxsIiwiU1BFQ0lBTF9ET0NVTUVOVF9BTEwiLCJpc1Byb3RvdHlwZU9mIiwiVVNFX1NZTUJPTF9BU19VSUQiLCIkU3ltYm9sIiwidG9MZW5ndGgiLCJvYmoiLCJDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSIsIkludGVybmFsU3RhdGVNb2R1bGUiLCJlbmZvcmNlSW50ZXJuYWxTdGF0ZSIsImdldEludGVybmFsU3RhdGUiLCJDT05GSUdVUkFCTEVfTEVOR1RIIiwiVEVNUExBVEUiLCJhcml0eSIsImNvbnN0cnVjdG9yIiwiam9pbiIsImNlaWwiLCJmbG9vciIsInRydW5jIiwieCIsIm4iLCJJRThfRE9NX0RFRklORSIsIlY4X1BST1RPVFlQRV9ERUZJTkVfQlVHIiwiYW5PYmplY3QiLCJ0b1Byb3BlcnR5S2V5IiwiJGRlZmluZVByb3BlcnR5IiwiJGdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIkVOVU1FUkFCTEUiLCJXUklUQUJMRSIsIkF0dHJpYnV0ZXMiLCJjdXJyZW50IiwicHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUiLCJpbnRlcm5hbE9iamVjdEtleXMiLCJlbnVtQnVnS2V5cyIsImNvbmNhdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJwdXNoIiwibmFtZXMiLCJyZXN1bHQiLCIkcHJvcGVydHlJc0VudW1lcmFibGUiLCJOQVNIT1JOX0JVRyIsImlucHV0IiwicHJlZiIsInZhbCIsInZhbHVlT2YiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlIiwiaGFzSW5kaWNlcyIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJkb3RBbGwiLCJ1bmljb2RlIiwidW5pY29kZVNldHMiLCJzdGlja3kiLCJ1aWQiLCJTSEFSRUQiLCJJU19QVVJFIiwibW9kZSIsImNvcHlyaWdodCIsImxpY2Vuc2UiLCJWOF9WRVJTSU9OIiwic3ltYm9sIiwiU3ltYm9sIiwiaHRtbCIsImFycmF5U2xpY2UiLCJ2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aCIsIklTX0lPUyIsIklTX05PREUiLCJzZXRJbW1lZGlhdGUiLCJjbGVhciIsImNsZWFySW1tZWRpYXRlIiwiRGlzcGF0Y2giLCJNZXNzYWdlQ2hhbm5lbCIsImNvdW50ZXIiLCJxdWV1ZSIsIk9OUkVBRFlTVEFURUNIQU5HRSIsImxvY2F0aW9uIiwiZGVmZXIiLCJjaGFubmVsIiwicG9ydCIsInJ1biIsImlkIiwicnVubmVyIiwibGlzdGVuZXIiLCJldmVudCIsInBvc3QiLCJwb3N0TWVzc2FnZSIsInByb3RvY29sIiwiaG9zdCIsImhhbmRsZXIiLCJhcmdzIiwibmV4dFRpY2siLCJub3ciLCJwb3J0MiIsInBvcnQxIiwib25tZXNzYWdlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImltcG9ydFNjcmlwdHMiLCJhcHBlbmRDaGlsZCIsInJlbW92ZUNoaWxkIiwic2V0VGltZW91dCIsInRvSW50ZWdlck9ySW5maW5pdHkiLCJtYXgiLCJtaW4iLCJpbnRlZ2VyIiwiSW5kZXhlZE9iamVjdCIsInJlcXVpcmVPYmplY3RDb2VyY2libGUiLCJudW1iZXIiLCJpc1N5bWJvbCIsImdldE1ldGhvZCIsIm9yZGluYXJ5VG9QcmltaXRpdmUiLCJ3ZWxsS25vd25TeW1ib2wiLCJUT19QUklNSVRJVkUiLCJleG90aWNUb1ByaW0iLCJ0b1ByaW1pdGl2ZSIsInBvc3RmaXgiLCJyYW5kb20iLCJOQVRJVkVfU1lNQk9MIiwiaXRlcmF0b3IiLCJwYXNzZWQiLCJyZXF1aXJlZCIsIldlbGxLbm93blN5bWJvbHNTdG9yZSIsInN5bWJvbEZvciIsImNyZWF0ZVdlbGxLbm93blN5bWJvbCIsIndpdGhvdXRTZXR0ZXIiLCJkZXNjcmlwdGlvbiIsImRlZmluZUJ1aWx0SW5BY2Nlc3NvciIsInJlZ0V4cEZsYWdzIiwiUmVnRXhwIiwiUmVnRXhwUHJvdG90eXBlIiwiSU5ESUNFU19TVVBQT1JUIiwiY2FsbHMiLCJleHBlY3RlZCIsImFkZEdldHRlciIsImNociIsInBhaXJzIiwiJCIsImNzc1dpdGhNYXBwaW5nVG9TdHJpbmciLCJsaXN0IiwibWFwIiwiaXRlbSIsImNvbnRlbnQiLCJuZWVkTGF5ZXIiLCJtb2R1bGVzIiwibWVkaWEiLCJkZWR1cGUiLCJzdXBwb3J0cyIsImxheWVyIiwiYWxyZWFkeUltcG9ydGVkTW9kdWxlcyIsImsiLCJfayIsImNzc01hcHBpbmciLCJidG9hIiwiYmFzZTY0IiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJKU09OIiwic3RyaW5naWZ5Iiwic291cmNlTWFwcGluZyIsInNvdXJjZVVSTHMiLCJzb3VyY2VzIiwic291cmNlUm9vdCIsInBob3RvZ3JhcGhlckZhY3RvcnkiLCJkaXNwbGF5RGF0YSIsInBob3RvZ3JhcGhlcnMiLCJwaG90b2dyYXBoZXJTZWxlY3RlZCIsImZvckVhY2giLCJwaG90b2dyYXBoZXIiLCJlbnYiLCJOT0RFX0VOViIsImNvbnNvbGUiLCJsb2ciLCJwaG90b2dyYXBoZXJNb2RlbCIsInNldFBob3RvZ3JhcGhlckhlYWRlciIsInNldFN0aWNreUJhclByaWNlIiwiZGlzcGxheURhdGFBbGwiLCJxdWVyeVNlbGVjdG9yIiwicGhvdG9ncmFwaGVyc1NlY3Rpb24iLCJ1c2VyQ2FyZERPTSIsImdldFVzZXJDYXJkRE9NIiwibWVkaWFGYWN0b3J5Iiwic2V0SW5uZXJIdG1sIiwiZGlzcGxheU1lZGlhIiwibWVkaWFzIiwicGhvdG9ncmFwaGVySWQiLCJ0b3RhbExpa2VzIiwibWVkaWFzU2VjdGlvbiIsIm1lZGlhTW9kZWwiLCJtZWRpYURPTSIsImdldE1lZGlhRE9NIiwibGlrZXMiLCJ3YXJuIiwiZG9tIiwidGl0bGUiLCJpbWFnZSIsInZpZGVvIiwibW92aWUiLCJwaWN0dXJlIiwiaGFzUGhvdG9ncmFwaGVyIiwiaGFzQ29udGVudCIsImFydGljbGUiLCJzZXRBdHRyaWJ1dGUiLCJsaW5rRWxlbWVudCIsImJ1aWxkRWxlbWVudCIsInNldEFyaWFsTGFiZWwiLCJpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudCIsImluc2VydFZpZGVvSW5zaWRlRWxlbWVudCIsInRpdGxlX2g2IiwibGlrZXNfaDYiLCJpbnNlcnRIVE1MQWZ0ZXJFbGVtZW50IiwiY2l0eSIsImNvdW50cnkiLCJ0YWdsaW5lIiwicG9ydHJhaXQiLCJwcmljZSIsImltZ1Byb2ZpbGUiLCJlbGVtZW50IiwiYWx0IiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiYXJpYUxhYmVsIiwiYmFsaXNlIiwidGV4dENvbnRlbnQiLCJhcmlhbGFiZWwiLCJ0ZXh0ZSIsInRleHRlRWxlbWVudCIsImlubmVySFRNTCIsImZldGNoSlNPTiIsInVybCIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsIkVycm9yIiwianNvblJlc3BvbnNlIiwianNvbiIsImdldFBob3RvZ3JhcGhlcnMiLCJnZXRNZWRpYXMiLCJnZXRVcmxQYXJhbWV0ZXIiLCJwYXJhbWV0ZXIiLCJmdWxsVXJsIiwiaHJlZiIsIlVSTCIsInBhcmFtZXRlclZhbHVlIiwic2VhcmNoUGFyYW1zIiwibW9kYWxNYXN0ZXIiLCJib2R5VGFnIiwiaGVhZGVyVGFnIiwibWFpblRhZyIsIm1vZGFsSUQiLCJiYWNrZ3JvdW5kUGFnZSIsImJvZHlIVE1MIiwiaGVhZGVySFRNTCIsIm1haW5IVE1MIiwibW9kYWxQYWdlIiwibW9kYWxIVE1MIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2aXNpYmxlIiwiYWRkQ29udGFjdEZvcm1MaXN0ZW5lciIsIm9wZW5Nb2RhbCIsImNsb3NlTW9kYWwiLCJwcmV2ZW50RGVmYXVsdCIsInNlbmRNZXNzYWdlIiwiYWRkS2V5Ym9hcmRMaXN0ZW5lciIsIm9ua2V5ZG93biIsInNldFRpdGxlTW9kYWwiLCJ0YWdIVE1MIiwidGl0bGVNb2RhbCIsImVmZmVjdEFuaW1hdGlvbiIsImhpZGVjbGFzcyIsInNob3djbGFzcyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInN0eWxlIiwiZGlzcGxheSIsImZvY3VzIiwicmVtb3ZlQXR0cmlidXRlIiwiYWxsSW5wdXRzIiwicXVlcnlTZWxlY3RvckFsbCIsImFsbFRleHRBcmVhIiwiZnVsbG1lc3NhZ2UiLCJ0ZXh0YXJlYSIsImFsZXJ0Iiwic29ydEJ5TGlrZXMiLCJzb3J0QnlEYXRlIiwic29ydEJ5VGl0bGUiLCJzZWxlY3RGaWx0ZXJDb21wb25lbnQiLCJpZFVSTCIsInNlbGVjdEZpbHRlckJ1dHRvbiIsInNlbGVjdEZpbHRlclNlbGVjdDEiLCJzZWxlY3RGaWx0ZXJTZWxlY3QyIiwiaGFuZGxlRmlsdGVyQWN0aW9uIiwic2VsZWN0ZWRJdGVtIiwic29ydCIsImIiLCJkYXRlIiwiaW5pdFByb2ZpbGUiLCJpbml0Q29udGFjdEZvcm0iLCJlIiwiY29udGFjdEZvcm1Nb2RhbCIsImluaXRNZWRpYSIsImluaXRNYWluIl0sInNvdXJjZVJvb3QiOiIifQ==