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
  let selectedMedia = [];
  medias.forEach(media => {
    if (photographerId == media.photographerId) {
      if (true) {
        console.log(media);
      }

      selectedMedia.push(media); // Then we are going use the MediaFactory to generate DOM

      const mediasSection = document.querySelector(querySelector);
      const mediaModel = (0,_factories_mediaFactory__WEBPACK_IMPORTED_MODULE_0__.mediaFactory)(media);
      const mediaDOM = mediaModel.getMediaDOM();

      if (mediaDOM) {
        mediasSection.appendChild(mediaDOM);
      } // End of MediaFactory Work
      // If media object got Likes propriety then


      if (media.likes) {
        totalLikes += media.likes; // Count all likes
      } else {
        console.warn("Theres is no like and totalLikes, look mediaFactory returned a object without likes propriety");
      }
    }
  });
  (0,_utils_dom__WEBPACK_IMPORTED_MODULE_1__.setInnerHtml)(".total_likes", totalLikes);

  if (true) {
    console.log("Total Like: " + totalLikes);
  }

  return selectedMedia;
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

      const linkElement = article.appendChild(_utils_dom__WEBPACK_IMPORTED_MODULE_0__.buildElement("a", `${id}`, "id"));
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

/***/ "./src/scripts/pages/photographer.js":
/*!*******************************************!*\
  !*** ./src/scripts/pages/photographer.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initMedia": function() { return /* binding */ initMedia; }
/* harmony export */ });
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
      location.href = '404.html';
    }
  } catch (e) {
    console.error(e); // If it's a fail then we redirect to 404 Error Page since  it's the minimal functionality

    console.error("initProfile() failed redirect to 404 page");
    location.href = '404.html';
  }
}

async function initContactForm(photographerSelected) {
  try {
    const contactFormModal = (0,_utils_modalMaster__WEBPACK_IMPORTED_MODULE_9__.modalMaster)("body", "header", "main", "contact_modal"); // Create a Model Master

    const modalPage = contactFormModal.modalPage; // Get modelPage Object

    contactFormModal.addContactFormListener(modalPage); // Add specific listener to Contact Form Modal

    const titleModal = photographerSelected.name; // Build the title Modal

    contactFormModal.setTitleModal(modalPage, "#dialogTitle", titleModal); // Set the title Modal

    console.log("Formulaire contact initié avec succès depuis initContactForm()");
  } catch (e) {
    console.error(e); // If it's a fail then we redirect to 404 Error Page since  it's the minimal functionality

    console.error("initContactForm() failed redirect to 404 page");
    location.href = '404.html';
  }
}

async function initLightbox(selectedMedias) {
  try {
    const lightBox = (0,_utils_modalMaster__WEBPACK_IMPORTED_MODULE_9__.modalMaster)("body", "header", "main", "lightbox_modal"); // Create a Model Master

    const modalPage = lightBox.modalPage; // Get modelPage Object
    // This add listener about lightbox modal on all link with Media Displayed at photographer page

    lightBox.addLightboxListener(modalPage, ".media_section a", selectedMedias);
    console.log("Popup LightBox initié avec succès depuis initLightBox()");
  } catch (e) {
    console.error(e);
  }
}

async function initMedia(idURL, sortBy) {
  // Try to get data & build section media if error then redirect to 404 page
  try {
    // Build Medias 
    const medias = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_3__.getMedias)();
    const selectedMedias = await (0,_data_displayMedia__WEBPACK_IMPORTED_MODULE_5__.displayMedia)(medias.sort(sortBy), ".media_section", idURL); // SortBy must be a function of sort
    // End build Medias 

    console.log("Section média initié avec succès depuis initMedia()");
    initLightbox(selectedMedias); // Initialize LightBox Modal with selected medias
  } catch (e) {
    console.error(e);
  }
}

async function initMain() {
  // We Wait for getUrlParameter() to be complete then we run tasks for generate page
  const idURL = await (0,_utils_getUrlParameter__WEBPACK_IMPORTED_MODULE_6__.getUrlParameter)("id");
  initProfile(idURL); // Init Profile section 

  await initMedia(idURL, _utils_sortBy__WEBPACK_IMPORTED_MODULE_7__.sortByLikes); // Get Medias & Init Media Section by Likes "import { sortByLikes } from '../utils/sortBy';

  (0,_utils_selectFilter__WEBPACK_IMPORTED_MODULE_8__.selectFilterComponent)(idURL); // Initialize Select filter component 
}

initMain();

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
    // This add listener about only contact form modal
    document.getElementById("openModal").addEventListener("click", function () {
      openModal(modalPage);
    });
    document.querySelector(`#${modalPage.modalID} #closeModal`).addEventListener("click", function () {
      closeModal(modalPage);
    });
    document.getElementById("contact_button").addEventListener("click", function () {
      event.preventDefault();
      sendMessage(modalPage);
    });
  }

  function addLightboxListener(modalPage, querySelectorRequest, medias) {
    // This add listener about lightbox modal
    document.querySelectorAll(querySelectorRequest).forEach(link => link.addEventListener("click", function () {
      loadLightboxContent(modalPage, link, medias);
      openModal(modalPage);
    }));
    document.querySelector(`#${modalPage.modalID} #closeModal`).addEventListener("click", function () {
      closeModal(modalPage);
    });
  }

  function loadLightboxContent(modalPage, link, medias) {
    if (true) {
      console.log("___LIGHTBOX___");
      console.log(modalPage);
      console.log(link.id); // Event has be fired by this LINK (where Link ID = Media ID)

      console.log(medias); // Medias that are displayed in order to the main page
    }

    medias.forEach(media => {
      console.log(media);
      console.log("____"); // Do the stuff about Set the Page into LightBox and left & right arrow. then done 
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

  function setTitleModal(modalPage, targetSelector, titleModal) {
    return (0,_dom__WEBPACK_IMPORTED_MODULE_0__.setInnerHtml)(`#${modalPage.modalID} ${targetSelector}`, titleModal);
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
    addLightboxListener,
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
/* harmony import */ var _utils_sortBy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/sortBy */ "./src/scripts/utils/sortBy.js");
/* harmony import */ var _pages_photographer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/photographer */ "./src/scripts/pages/photographer.js");


/** GENERATE EVENT FOR SELECT FILTER COMPONENTS AND BEHAVIOR */

function selectFilterComponent(idURL) {
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

        _pages_photographer__WEBPACK_IMPORTED_MODULE_1__.initMedia(idURL, _utils_sortBy__WEBPACK_IMPORTED_MODULE_0__.sortByDate); // End build Medias Data

        break;

      case 'Titre':
        selectFilterButton.innerHTML = "Titre";
        selectFilterSelect1.innerHTML = "Date";
        selectFilterSelect2.innerHTML = "Popularité";
        document.querySelector('.media_section').innerHTML = ""; // Build Medias Data

        _pages_photographer__WEBPACK_IMPORTED_MODULE_1__.initMedia(idURL, _utils_sortBy__WEBPACK_IMPORTED_MODULE_0__.sortByTitle); // End build Medias Data

        break;

      case 'Popularité':
        selectFilterButton.innerHTML = "Popularité";
        selectFilterSelect1.innerHTML = "Date";
        selectFilterSelect2.innerHTML = "Titre";
        document.querySelector('.media_section').innerHTML = ""; // Build Medias Data

        _pages_photographer__WEBPACK_IMPORTED_MODULE_1__.initMedia(idURL, _utils_sortBy__WEBPACK_IMPORTED_MODULE_0__.sortByLikes); // End build Medias Data

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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n/** Used to load all variables for this project about SCSS **/ /** FONT **/\n/** END FONT **/\n/** COLOR VARIABLES **/\n/** END COLOR VARIABLES **/\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\n/********************** GENERAL **********************/\nhtml,\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: \"DM Sans\", sans-serif;\n  animation: 1s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/********************** END GENERAL **********************/\n/** IMPORT MIXIN **/\n/** IMPORT HEADER STYLES **/\nheader {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 120px;\n}\nheader h1 {\n  color: #901C1C;\n  top: 44px;\n  margin-right: 100px;\n  font-weight: 400;\n  font-size: 36px;\n  line-height: 47px;\n}\nheader .logo,\nheader .logo_photographer {\n  height: 50px;\n}\nheader .logo {\n  margin-left: 115px;\n}\nheader .logo_photographer {\n  margin-left: 100px;\n  margin-top: 10px;\n}\n\n/** IMPORT PHOTOGRAPHERS CARDS **/\n.photographer_card {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  justify-self: center;\n}\n.photographer_card img {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  transition: box-shadow 1s;\n  height: 200px;\n  width: 200px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.photographer_card img:hover {\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.photographer_card h2,\n.photographer_card h3,\n.photographer_card h4,\n.photographer_card h5 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n}\n.photographer_card h2 {\n  margin-top: 20px;\n  color: #D3573C;\n  font-size: 36px;\n}\n.photographer_card h3 {\n  font-size: 13.0010834236px;\n  line-height: 17px;\n  color: #901C1C;\n}\n.photographer_card h4 {\n  margin-top: 2px;\n  font-size: 10px;\n  line-height: 13px;\n  color: #000000;\n}\n.photographer_card h5 {\n  margin-top: 2px;\n  font-size: 9px;\n  line-height: 12px;\n  text-align: center;\n  color: #757575;\n}\n\n@media (max-width: 1100px) {\n  .photographer_card h3 {\n    font-size: 16.9014084507px;\n    margin-top: 10px;\n  }\n  .photographer_card h4 {\n    font-size: 13px;\n    margin-top: 10px;\n  }\n  .photographer_card h5 {\n    font-size: 11.7px;\n    margin-top: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_card h3 {\n    font-size: 19.5016251354px;\n  }\n  .photographer_card h4 {\n    font-size: 15px;\n  }\n  .photographer_card h5 {\n    font-size: 13.5px;\n  }\n  .photographer_card img {\n    width: 230px;\n    height: 230px;\n  }\n}\n/** IMPORT MODAL COMPONENT **/\n.modal_contact {\n  display: none;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  border-radius: 5px;\n  background-color: #DB8876;\n  padding: 35px;\n  margin: auto;\n  width: 50%;\n  transition: width 0.5s ease-in;\n}\n.modal_contact .modal_header {\n  justify-content: space-between;\n  width: 100%;\n  margin-top: -20px;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: baseline;\n}\n.modal_contact .modal_header #closeModal {\n  cursor: pointer;\n  transition: filter 0.5s ease-in;\n}\n.modal_contact .modal_header #closeModal:hover {\n  filter: brightness(0) saturate(100%);\n}\n.modal_contact .modal_header .text_header {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.modal_contact .modal_header h2 {\n  font-size: 63.72px;\n  font-weight: normal;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-align: left;\n}\n.modal_contact form input {\n  font-size: 30px;\n  margin-bottom: 5px;\n  padding: 10px;\n}\n.modal_contact form textarea {\n  margin-top: 15px;\n  font-size: 24px;\n  margin-bottom: 20px;\n  resize: vertical;\n}\n.modal_contact form input,\n.modal_contact form textarea {\n  width: 100%;\n  height: 68px;\n  border: none;\n  border-radius: 5px;\n}\n.modal_contact form label {\n  color: #000000;\n  font-size: 36px;\n}\n.modal_contact form label:last-child {\n  margin-top: 15px;\n}\n.modal_contact .help_blind {\n  display: none;\n}\n\n.hide_content {\n  animation: 0.5s ease-in forwards fade-off;\n}\n@keyframes fade-off {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.4;\n  }\n}\n\n.show_content {\n  animation: 0.5s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0.4;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@media (max-width: 1100px) {\n  .modal_contact {\n    width: 70%;\n  }\n  .modal_contact .modal_header h2 {\n    font-size: 50.4px;\n  }\n  .modal_contact form label {\n    font-size: 32.7272727273px;\n  }\n  .modal_contact form input {\n    font-size: 27.6923076923px;\n  }\n  .modal_contact form textarea {\n    font-size: 22.5px;\n  }\n}\n@media (max-width: 800px) {\n  .modal_contact {\n    width: 90%;\n  }\n  .modal_contact .modal_header h2 {\n    font-size: 43.2px;\n  }\n  .modal_contact form label {\n    font-size: 27.6923076923px;\n  }\n  .modal_contact form input {\n    font-size: 24px;\n  }\n  .modal_contact form textarea {\n    font-size: 20px;\n  }\n}\n.modal_lightbox {\n  display: none;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  transition: width 0.5s ease-in;\n}\n.modal_lightbox .content_media {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.modal_lightbox #video_selected,\n.modal_lightbox #picture_selected {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  border-radius: 5px;\n  width: 100%;\n  margin: auto;\n}\n.modal_lightbox a {\n  text-decoration: none;\n  font-size: 90px;\n  color: #901C1C;\n  transition: color 0.5s ease-in;\n  padding: 25px;\n}\n.modal_lightbox a:hover {\n  color: #DB8876;\n}\n.modal_lightbox .closeLightbox {\n  filter: brightness(0) saturate(100%) invert(18%) sepia(31%) saturate(4597%) hue-rotate(344deg) brightness(93%) contrast(95%);\n  position: absolute;\n  top: 10px;\n  right: -70px;\n  cursor: pointer;\n  transition: filter 0.5s ease-in;\n}\n.modal_lightbox .closeLightbox:hover {\n  filter: brightness(0) saturate(100%) invert(63%) sepia(43%) saturate(448%) hue-rotate(323deg) brightness(89%) contrast(92%);\n}\n.modal_lightbox h2 {\n  color: #901C1C;\n  font-size: 24px;\n}\n.modal_lightbox .help_blind {\n  display: none;\n}\n\n.hide_content {\n  animation: 0.5s ease-in forwards fade-off;\n}\n@keyframes fade-off {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.4;\n  }\n}\n\n.show_content {\n  animation: 0.5s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0.4;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/** IMPORT CONTACT BUTTON COMPONENT **/\n.fisheye_button {\n  font-size: 20px;\n  font-weight: 700;\n  font-family: \"DM Sans\", sans-serif;\n  color: white;\n  padding: 11px;\n  min-width: 170px;\n  min-height: 70px;\n  border: none;\n  background-color: #901C1C;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: color 0.5s ease-in, background-color 0.5s ease-in;\n}\n.fisheye_button:hover {\n  color: #000000;\n  background-color: #DB8876;\n}\n\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\n.photograph_header {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: no-wrap;\n  align-content: fled-end;\n  justify-content: space-between;\n  background-color: #FAFAFA;\n  height: 313px;\n  margin-top: 10px;\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.photograph_header div:nth-child(3) {\n  margin-right: 20px;\n}\n.photograph_header h1,\n.photograph_header h2,\n.photograph_header h3 {\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 400;\n}\n.photograph_header h1 {\n  font-size: 63.72px;\n  margin-bottom: -15px;\n  color: #D3573C;\n}\n.photograph_header h2 {\n  margin-top: 15px;\n  margin-bottom: 20px;\n  font-size: 23.2258064516px;\n  color: #901C1C;\n}\n.photograph_header h3 {\n  font-size: 18px;\n  color: #525252;\n}\n.photograph_header .photograph_about,\n.photograph_header .photograph_button {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n}\n.photograph_header .photograph_button {\n  margin-top: 30px;\n  margin-right: 80px;\n}\n.photograph_header .photograph_about {\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\n@media (max-width: 1100px) {\n  .photograph_header {\n    background-color: white;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n    padding-top: 15px;\n  }\n  .photograph_header h1 {\n    font-size: 41.4px;\n  }\n  .photograph_header h2 {\n    font-size: 20px;\n  }\n  .photograph_header h3 {\n    font-size: 16.3636363636px;\n  }\n  .photograph_button {\n    margin-bottom: 30px;\n  }\n}\n@media (max-width: 800px) {\n  .photograph_header {\n    display: flex;\n    flex-direction: column;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .photograph_header .photograph_button {\n    align-items: inherit;\n    margin-right: 0px;\n    position: absolute;\n    margin-top: 200px;\n  }\n  .photograph_header > .photograph_about {\n    margin-left: 0;\n    align-items: center;\n  }\n  .photograph_header h1,\nh2,\nh3 {\n    text-align: center;\n  }\n  .photograph_header > .photographer_card {\n    display: none;\n  }\n}\n/** IMPORT SELECT FILTER COMPONENT **/\n.select_button {\n  display: flex;\n  align-content: flex-end;\n  align-items: center;\n  justify-content: space-between;\n  text-align: left;\n  padding-left: 20px;\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 18px;\n  background: #901C1C;\n  color: white;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border: none;\n  border-color: none;\n  width: 170px;\n  height: 70px;\n  cursor: pointer;\n}\n\n.select_button::after {\n  transition: transform 0.25s ease-in;\n  content: \">\";\n  transform: rotate(90deg);\n  font-size: 25px;\n  text-align: right;\n  float: right;\n  margin-right: 20px;\n}\n\n.select_filter {\n  position: relative;\n  display: inline-block;\n}\n\n.select_content {\n  display: none;\n  position: absolute;\n  background: #901C1C;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  min-width: 160px;\n  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n}\n.select_content .whiteline {\n  width: 90%;\n  height: 1px;\n  background-color: white;\n  margin-left: 5%;\n}\n.select_content a {\n  transition: all 0.5s ease-in;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-size: 18px;\n  color: white;\n  padding: 20px;\n  width: 170px;\n  height: 60px;\n  text-decoration: none;\n  display: block;\n}\n.select_content a:hover {\n  cursor: pointer;\n  transition: all 0.5s ease-in;\n  color: #000000;\n}\n\n.select_filter:hover .select_content {\n  display: block;\n}\n\n.select_filter:hover .select_button::after {\n  transform: rotate(-90deg);\n  transition: transform 0.25s ease-in;\n}\n\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\n.photographer_statistic {\n  display: flex;\n  flex-direction: row;\n  align-content: flex-start;\n  justify-content: space-around;\n  align-items: baseline;\n  position: fixed;\n  background-color: #DB8876;\n  min-width: 376px;\n  min-height: 89px;\n  bottom: 0;\n  right: 38px;\n  z-index: 2;\n  margin-bottom: -22px;\n  border-radius: 5px;\n}\n.photographer_statistic .total_likes,\n.photographer_statistic .price_rate_daily {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 23.2258064516px;\n  line-height: 31px;\n  color: #000000;\n  padding-top: 18px;\n}\n.photographer_statistic .total_likes:after {\n  padding-left: 5px;\n  content: \"♥\";\n  font-size: 30.8903225806px;\n}\n\n@media (max-width: 700px) {\n  .photographer_statistic {\n    display: none;\n  }\n}\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\n.media_card {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  max-width: 350px;\n}\n.media_card img,\n.media_card video {\n  transition: box-shadow 1s;\n  width: 100%;\n  max-height: 300px;\n  min-height: 300px;\n  object-fit: cover;\n  border-radius: 5px;\n}\n.media_card img:hover,\n.media_card video:hover {\n  transition: box-shadow 1s;\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.media_card .details {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: baseline;\n  margin-top: 5px;\n}\n.media_card h6 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n  font-size: 24px;\n  color: #901C1C;\n}\n.media_card h6:last-child::after {\n  font-size: 30px;\n  padding-left: 10px;\n  content: \"♥\";\n}\n\n@media (max-width: 600px) {\n  .media_card img,\n.media_card {\n    max-width: 100%;\n  }\n}\n/** IMPORT PAGES (other) Styles **/\n.photographer_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 70px;\n  margin-top: 75px;\n  margin-bottom: 75px;\n}\n\n.margin_left_right {\n  margin: 0 100px;\n}\n\n.filter_section {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n  margin-left: 0;\n}\n.filter_section h5:first-child {\n  margin-top: 20px;\n  margin-right: 28px;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-style: normal;\n  font-size: 18px;\n  color: #000000;\n}\n.filter_section .select_filter {\n  margin-top: 10px;\n}\n\n.media_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  row-gap: 30px;\n  column-gap: 95px;\n  margin-top: 20px;\n  margin-bottom: 75px;\n}\n\n.ERROR_404 {\n  margin-top: 5%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  padding: 40px;\n}\n.ERROR_404 h1 {\n  margin-bottom: 5%;\n  text-align: center;\n  font-size: 72px;\n  margin-bottom: 40px;\n}\n.ERROR_404 a {\n  text-decoration: none;\n  color: inherit;\n}\n.ERROR_404 a:hover {\n  color: inherit;\n}\n\n/** IMPORT FOOTER STYLES **/\nfooter {\n  height: 2px;\n  width: 100%;\n  background-color: white;\n  margin-top: 75px;\n}\n\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\n (components Elements got their own Responsive Rules in their Stylesheet) **/\n@media (min-width: 2000px) {\n  .media_section {\n    grid-template-columns: 1fr 1fr 1fr 1fr;\n  }\n}\n@media (max-width: 1100px) {\n  .photographer_section,\n.media_section {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 800px) {\n  header {\n    flex-direction: column;\n    margin-top: 40px;\n    height: 100px;\n  }\n  header .logo_photographer {\n    margin-left: 0;\n  }\n  header .logo,\nheader h1 {\n    margin-left: 20px;\n    margin-right: 20px;\n    font-size: 30px;\n  }\n  .margin_left_right {\n    margin: 0 20px;\n  }\n  .filter_section {\n    justify-content: space-between;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_section {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 600px) {\n  .media_section {\n    grid-template-columns: 1fr;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/main.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_global.scss","webpack://./src/scss/pages/_header.scss","webpack://./src/scss/_mixin.scss","webpack://./src/scss/components/_photographer_cards.scss","webpack://./src/scss/components/modal/_contact.scss","webpack://./src/scss/components/modal/_lightbox.scss","webpack://./src/scss/components/_fisheye_button.scss","webpack://./src/scss/components/_photograph_header.scss","webpack://./src/scss/components/_select_filter.scss","webpack://./src/scss/components/_photographer_statistic.scss","webpack://./src/scss/components/_media_cards.scss","webpack://./src/scss/pages/_pages.scss","webpack://./src/scss/pages/_footer.scss","webpack://./src/scss/_responsive.scss"],"names":[],"mappings":"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","sourcesContent":["/** Used to load all variables for this project about SCSS **/\r\n@import \"_variables.scss\";\r\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\r\n@import \"_global.scss\";\r\n/** IMPORT MIXIN **/\r\n@import \"_mixin.scss\";\r\n/** IMPORT HEADER STYLES **/\r\n@import \"pages/header.scss\";\r\n/** IMPORT PHOTOGRAPHERS CARDS **/\r\n@import \"components/photographer_cards.scss\";\r\n/** IMPORT MODAL COMPONENT **/\r\n@import \"components/modal/_contact.scss\";\r\n@import \"components/modal/_lightbox.scss\";\r\n/** IMPORT CONTACT BUTTON COMPONENT **/\r\n@import \"components/fisheye_button.scss\";\r\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\r\n@import \"components/photograph_header.scss\";\r\n/** IMPORT SELECT FILTER COMPONENT **/\r\n@import \"components/select_filter.scss\";\r\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\r\n@import \"components/photographer_statistic.scss\";\r\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\r\n@import \"components/media_cards.scss\";\r\n/** IMPORT PAGES (other) Styles **/\r\n@import \"pages/pages.scss\";\r\n/** IMPORT FOOTER STYLES **/\r\n@import \"pages/footer.scss\";\r\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\r\n (components Elements got their own Responsive Rules in their Stylesheet) **/\r\n@import \"_responsive.scss\";","/** FONT **/\r\n$font_global: \"DM Sans\", sans-serif;\r\n$font_weight_small: 400;\r\n$font_weight_big: 700;\r\n\r\n$font_size: 36px;\r\n/** END FONT **/\r\n\r\n/** COLOR VARIABLES **/\r\n$default_color: white;\r\n$default_font_color: #000000;\r\n$color_gray: #757575;\r\n$color_primary1: #901C1C;\r\n$color_primary2: #D3573C;\r\n$color_secondary2: #525252;\r\n$color_secondary2_bg: #FAFAFA;\r\n$color_background: #DB8876;\r\n/** END COLOR VARIABLES **/","/********************** GENERAL **********************/\r\nhtml,\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n\r\n}\r\n\r\nbody {\r\n  font-family: $font_global;\r\n  animation: 1s ease-in forwards fade-in;\r\n\r\n  @keyframes fade-in {\r\n    0% {\r\n      opacity: 0;\r\n    }\r\n\r\n    100% {\r\n      opacity: 1.0;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n/********************** END GENERAL **********************/","header {\r\n    @include flex-basic(row, null, null, space-between, center);\r\n    height: 120px;\r\n\r\n\r\n    h1 {\r\n        color: $color_primary1;\r\n        top: 44px;\r\n        margin-right: 100px;\r\n        font-weight: $font_weight_small;\r\n        font-size: $font_size;\r\n        line-height: 47px;\r\n    }\r\n\r\n    .logo,\r\n    .logo_photographer {\r\n        height: 50px;\r\n    }\r\n\r\n    .logo {\r\n        margin-left: 115px;\r\n    }\r\n\r\n    .logo_photographer {\r\n        margin-left: 100px;\r\n        margin-top: 10px;\r\n    }\r\n}","@mixin flex-basic($flex-direction,\r\n  $flex-wrap,\r\n  $align-content,\r\n  $justify-content,\r\n  $align-items) {\r\n  display: flex;\r\n  flex-direction: $flex-direction;\r\n\r\n  @if ($flex-wrap) {\r\n    flex-wrap: $flex-wrap;\r\n  }\r\n\r\n  @if ($align-content) {\r\n    align-content: $align-content;\r\n  }\r\n\r\n  @if ($justify-content) {\r\n    justify-content: $justify-content;\r\n  }\r\n\r\n  @if ($align-items) {\r\n    align-items: $align-items;\r\n  }\r\n}\r\n\r\n// @mixin mask-crossbrowser($value) {\r\n//   -webkit-mask: $value;\r\n//   mask: $value;\r\n// }\r\n\r\n// @mixin margin-left-and-right($value) {\r\n//   margin-left: $value;\r\n//   margin-right: $value;\r\n// }\r\n\r\n@mixin padding-left-and-right($value) {\r\n  padding-left: $value;\r\n  padding-right: $value;\r\n}",".photographer_card {\r\n    @include flex-basic(column, null, null, center, center);\r\n    justify-self: center;\r\n\r\n    img {\r\n        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n        transition: box-shadow 1s;\r\n        height: 200px;\r\n        width: 200px;\r\n        border-radius: 50%;\r\n        object-fit: cover;\r\n\r\n        &:hover {\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n    h2,\r\n    h3,\r\n    h4,\r\n    h5 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 20px;\r\n        color: $color_primary2;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font_size / 2.769);\r\n        line-height: 17px;\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h4 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 3.6);\r\n        line-height: 13px;\r\n        color: $default_font_color;\r\n    }\r\n\r\n    h5 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 4);\r\n        line-height: 12px;\r\n        text-align: center;\r\n        color: $color_gray;\r\n    }\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.5);\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.5);\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.5);\r\n        }\r\n\r\n        img {\r\n            width: 230px;\r\n            height: 230px;\r\n        }\r\n    }\r\n\r\n}",".modal_contact {\r\n    display: none;\r\n    position: fixed;\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n    border-radius: 5px;\r\n    background-color: $color_background;\r\n    padding: 35px;\r\n    margin: auto;\r\n    width: 50%;\r\n    transition: width 0.5s ease-in;\r\n\r\n\r\n    .modal_header {\r\n        justify-content: space-between;\r\n        width: 100%;\r\n        margin-top: -20px;\r\n        margin-bottom: 10px;\r\n        display: flex;\r\n        align-items: baseline;\r\n\r\n        #closeModal {\r\n            // Close Modal Picture\r\n            cursor: pointer;\r\n            transition: filter 0.5s ease-in;\r\n\r\n            &:hover {\r\n                filter: brightness(0) saturate(100%);\r\n            }\r\n        }\r\n\r\n        .text_header {\r\n            display: flex;\r\n            flex-direction: column;\r\n            overflow: hidden;\r\n        }\r\n\r\n        h2 {\r\n            font-size: calc($font_size * 1.77);\r\n            font-weight: normal;\r\n            white-space: nowrap;\r\n            overflow: hidden;\r\n            text-overflow: ellipsis;\r\n            text-align: left;\r\n        }\r\n    }\r\n\r\n    form input {\r\n        font-size: calc($font_size / 1.2);\r\n        margin-bottom: 5px;\r\n        padding: 10px;\r\n    }\r\n\r\n    form textarea {\r\n        margin-top: 15px;\r\n        font-size: calc($font_size /1.5);\r\n        margin-bottom: 20px;\r\n        resize: vertical;\r\n    }\r\n\r\n    form input,\r\n    form textarea {\r\n\r\n        width: 100%;\r\n        height: 68px;\r\n        border: none;\r\n        border-radius: 5px;\r\n\r\n    }\r\n\r\n\r\n    form label {\r\n        color: $default_font_color;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    form label:last-child {\r\n        margin-top: 15px;\r\n    }\r\n\r\n    .help_blind {\r\n        display: none;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n.hide_content {\r\n    animation: 0.5s ease-in forwards fade-off;\r\n\r\n    @keyframes fade-off {\r\n        0% {\r\n            opacity: 1.0;\r\n        }\r\n\r\n        100% {\r\n            opacity: 0.4;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\r\n.show_content {\r\n    animation: 0.5s ease-in forwards fade-in;\r\n\r\n    @keyframes fade-in {\r\n        0% {\r\n            opacity: 0.4;\r\n        }\r\n\r\n        100% {\r\n            opacity: 1.0;\r\n        }\r\n    }\r\n\r\n\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n\r\n    .modal_contact {\r\n        width: 70%;\r\n\r\n        .modal_header {\r\n            h2 {\r\n                font-size: calc($font_size * 1.4);\r\n            }\r\n        }\r\n\r\n        form label {\r\n            font-size: calc($font_size / 1.1);\r\n        }\r\n\r\n        form input {\r\n            font-size: calc($font_size / 1.3);\r\n        }\r\n\r\n        form textarea {\r\n            font-size: calc($font_size / 1.6);\r\n\r\n        }\r\n\r\n    }\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .modal_contact {\r\n        width: 90%;\r\n\r\n\r\n        .modal_header {\r\n            h2 {\r\n                font-size: calc($font_size * 1.2);\r\n            }\r\n        }\r\n\r\n        form label {\r\n            font-size: calc($font_size / 1.3);\r\n        }\r\n\r\n        form input {\r\n            font-size: calc($font_size / 1.5);\r\n        }\r\n\r\n        form textarea {\r\n            font-size: calc($font_size / 1.8);\r\n\r\n        }\r\n    }\r\n}",".modal_lightbox {\r\n    display: none;\r\n    position: fixed;\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    transition: width 0.5s ease-in;\r\n\r\n\r\n    .content_media {\r\n        display: flex;\r\n        justify-content: center;\r\n        align-items: center;\r\n    }\r\n\r\n    #video_selected,\r\n    #picture_selected {\r\n        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n        border-radius: 5px;\r\n        width: 100%;\r\n        margin: auto;\r\n\r\n    }\r\n\r\n    a {\r\n        text-decoration: none;\r\n        font-size: calc($font_size * 2.5);\r\n        color: $color_primary1;\r\n        transition: color 0.5s ease-in;\r\n        padding: 25px;\r\n\r\n        &:hover {\r\n            color: $color_background;\r\n        }\r\n    }\r\n\r\n    .closeLightbox {\r\n        filter: brightness(0) saturate(100%) invert(18%) sepia(31%) saturate(4597%) hue-rotate(344deg) brightness(93%) contrast(95%);\r\n        // to target color CF: https: //codepen.io/sosuke/pen/Pjoqqp\r\n        position: absolute;\r\n        top: 10px;\r\n        right: -70px;\r\n        cursor: pointer;\r\n        transition: filter 0.5s ease-in;\r\n\r\n        &:hover {\r\n            filter: brightness(0) saturate(100%) invert(63%) sepia(43%) saturate(448%) hue-rotate(323deg) brightness(89%) contrast(92%);\r\n        }\r\n    }\r\n\r\n\r\n    h2 {\r\n        color: $color_primary1;\r\n        font-size: 24px;\r\n    }\r\n\r\n\r\n\r\n    .help_blind {\r\n        display: none;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n.hide_content {\r\n    animation: 0.5s ease-in forwards fade-off;\r\n\r\n    @keyframes fade-off {\r\n        0% {\r\n            opacity: 1.0;\r\n        }\r\n\r\n        100% {\r\n            opacity: 0.4;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\r\n.show_content {\r\n    animation: 0.5s ease-in forwards fade-in;\r\n\r\n    @keyframes fade-in {\r\n        0% {\r\n            opacity: 0.4;\r\n        }\r\n\r\n        100% {\r\n            opacity: 1.0;\r\n        }\r\n    }\r\n\r\n\r\n}",".fisheye_button {\r\n    font-size: calc($font_size / 1.8);\r\n    font-weight: $font_weight_big;\r\n    font-family: $font_global;\r\n    color: $default_color;\r\n    padding: 11px;\r\n    min-width: 170px;\r\n    min-height: 70px;\r\n    border: none;\r\n    background-color: $color_primary1;\r\n    border-radius: 5px;\r\n    cursor: pointer;\r\n    transition: color 0.5s ease-in, background-color 0.5s ease-in;\r\n\r\n    &:hover {\r\n        color: $default_font_color;\r\n        background-color: $color_background;\r\n    }\r\n}",".photograph_header {\r\n    @include flex-basic(row, no-wrap, fled-end, space-between, null);\r\n    background-color: $color_secondary2_bg;\r\n    height: 313px;\r\n    margin-top: 10px;\r\n    @include padding-left-and-right(30px);\r\n\r\n    div:nth-child(3) {\r\n        margin-right: 20px;\r\n    }\r\n\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h1 {\r\n        font-size: calc($font_size * 1.77);\r\n        margin-bottom: -15px;\r\n        color: $color_primary2;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 15px;\r\n        margin-bottom: 20px;\r\n        font-size: calc($font_size / 1.55);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font-size / 2);\r\n        color: $color_secondary2;\r\n    }\r\n\r\n    .photograph_about,\r\n    .photograph_button {\r\n        @include flex-basic(column, null, null, center, flex-start);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-top: 30px;\r\n        margin-right: 80px;\r\n    }\r\n\r\n    .photograph_about {\r\n        margin-left: 20px;\r\n        margin-bottom: 10px;\r\n    }\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n    .photograph_header {\r\n        background-color: $default_color;\r\n        @include flex-basic(column, wrap, fled-end, space-between, center);\r\n        padding-top: 15px;\r\n    }\r\n\r\n    .photograph_header h1 {\r\n        font-size: calc($font_size * 1.15);\r\n    }\r\n\r\n    .photograph_header h2 {\r\n        font-size: calc($font_size / 1.8);\r\n\r\n    }\r\n\r\n    .photograph_header h3 {\r\n        font-size: calc($font-size / 2.2);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-bottom: 30px;\r\n\r\n\r\n    }\r\n\r\n\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .photograph_header {\r\n        @include flex-basic(column, null, fled-end, space-between, center);\r\n\r\n        .photograph_button {\r\n            align-items: inherit;\r\n            margin-right: 0px;\r\n            position: absolute;\r\n            margin-top: 200px;\r\n        }\r\n\r\n    }\r\n\r\n    .photograph_header>.photograph_about {\r\n        margin-left: 0;\r\n        align-items: center;\r\n    }\r\n\r\n    .photograph_header h1,\r\n    h2,\r\n    h3 {\r\n        text-align: center;\r\n    }\r\n\r\n    .photograph_header>.photographer_card {\r\n        display: none;\r\n    }\r\n\r\n\r\n}",".select_button {\r\n    display: flex;\r\n    align-content: flex-end;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n\r\n    text-align: left;\r\n    padding-left: 20px;\r\n    font-family: $font_global;\r\n    font-style: normal;\r\n    font-weight: $font_weight_big;\r\n    font-size: calc($font_size / 2);\r\n    background: $color_primary1;\r\n    color: $default_color;\r\n    border-top-left-radius: 5px;\r\n    border-top-right-radius: 5px;\r\n    border: none;\r\n    border-color: none;\r\n    width: 170px;\r\n    height: 70px;\r\n    cursor: pointer;\r\n}\r\n\r\n.select_button::after {\r\n    transition: transform 0.25s ease-in;\r\n    content: \">\";\r\n    transform: rotate(90deg);\r\n    font-size: calc($font_size / 1.44);\r\n    text-align: right;\r\n    float: right;\r\n    margin-right: 20px;\r\n\r\n}\r\n\r\n.select_filter {\r\n\r\n    position: relative;\r\n    display: inline-block;\r\n}\r\n\r\n\r\n.select_content {\r\n    display: none;\r\n    position: absolute;\r\n    background: $color_primary1;\r\n    border-bottom-left-radius: 5px;\r\n    border-bottom-right-radius: 5px;\r\n    min-width: 160px;\r\n    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\r\n    z-index: 1;\r\n\r\n\r\n    .whiteline {\r\n        width: 90%;\r\n        height: 1px;\r\n        background-color: $default_color;\r\n        margin-left: 5%;\r\n    }\r\n\r\n    a {\r\n        transition: all 0.5s ease-in;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 2);\r\n        color: $default_color;\r\n        padding: 20px;\r\n        width: 170px;\r\n        height: 60px;\r\n        text-decoration: none;\r\n        display: block;\r\n    }\r\n\r\n    a:hover {\r\n        cursor: pointer;\r\n        transition: all 0.5s ease-in;\r\n        color: $default_font_color;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n\r\n.select_filter:hover .select_content {\r\n\r\n    display: block;\r\n}\r\n\r\n.select_filter:hover .select_button::after {\r\n    transform: rotate(-90deg);\r\n    transition: transform 0.25s ease-in;\r\n}",".photographer_statistic {\r\n    @include flex-basic(row, null, flex-start, space-around, baseline);\r\n    position: fixed;\r\n    background-color: $color_background;\r\n    min-width: 376px;\r\n    min-height: 89px;\r\n    bottom: 0;\r\n    right: 38px;\r\n    z-index: 2;\r\n    margin-bottom: -22px;\r\n    border-radius: 5px;\r\n\r\n\r\n\r\n    .total_likes,\r\n    .price_rate_daily {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 1.55);\r\n        line-height: 31px;\r\n        color: $default_font_color;\r\n        padding-top: 18px;\r\n\r\n    }\r\n\r\n    .total_likes:after {\r\n        padding-left: 5px;\r\n        content: \"♥\";\r\n        font-size: calc($font_size / 1.55 * 1.33);\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_statistic {\r\n        display: none;\r\n    }\r\n\r\n}",".media_card {\r\n    @include flex-basic(column, null, null, null, null);\r\n    flex-wrap: wrap;\r\n    max-width: 350px;\r\n\r\n    img,\r\n    video {\r\n        transition: box-shadow 1s;\r\n        width: 100%;\r\n        max-height: 300px;\r\n        min-height: 300px;\r\n        object-fit: cover;\r\n        border-radius: 5px;\r\n\r\n        &:hover {\r\n            transition: box-shadow 1s;\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n\r\n\r\n    .details {\r\n        @include flex-basic(row, null, null, space-between, baseline);\r\n        margin-top: 5px;\r\n    }\r\n\r\n    h6 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n        font-size: calc($font_size / 1.5);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h6:last-child::after {\r\n        font-size: calc($font_size / 1.5 * 1.25);\r\n        padding-left: 10px;\r\n        content: \"♥\";\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_card img,\r\n    .media_card {\r\n        max-width: 100%;\r\n    }\r\n}","//// MAIN PAGE /// \r\n.photographer_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    gap: 70px;\r\n    margin-top: 75px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n///// END MAIN PAGE // \r\n\r\n//////////////// PHOTOGRAPHER PAGE /////// \r\n.margin_left_right {\r\n    margin: 0 100px;\r\n}\r\n\r\n.filter_section {\r\n    @include flex-basic(row, null, null, null, baseline);\r\n    margin-left: 0;\r\n\r\n    h5:first-child {\r\n        margin-top: 20px;\r\n        margin-right: 28px;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-style: normal;\r\n        font-size: calc($font-size / 2);\r\n        color: $default_font_color;\r\n    }\r\n\r\n    .select_filter {\r\n        margin-top: 10px;\r\n    }\r\n}\r\n\r\n.media_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    row-gap: 30px;\r\n    column-gap: 95px;\r\n    margin-top: 20px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n////////////// END PHOTOGRAPHER PAGE ////////\r\n\r\n//////////////// 404 PAGE /////// \r\n.ERROR_404 {\r\n    margin-top: 5%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: space-around;\r\n    padding: 40px;\r\n\r\n    h1 {\r\n        margin-bottom: 5%;\r\n        text-align: center;\r\n        font-size: $font_size * 2;\r\n        margin-bottom: 40px;\r\n    }\r\n\r\n    a {\r\n        text-decoration: none;\r\n        color: inherit;\r\n    }\r\n\r\n    a:hover {\r\n        color: inherit;\r\n    }\r\n}\r\n\r\n////////////// END 404 PAGE ////////","footer {\r\n    height: 2px;\r\n    width: 100%;\r\n    background-color: $default_color;\r\n    margin-top: 75px;\r\n}","@media (min-width: 2000px) {\r\n\r\n    .media_section {\r\n        grid-template-columns: 1fr 1fr 1fr 1fr;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n\r\n    .photographer_section,\r\n    .media_section {\r\n        grid-template-columns: 1fr 1fr;\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 800px) {\r\n\r\n    header {\r\n        flex-direction: column;\r\n        margin-top: 40px;\r\n        height: 100px;\r\n\r\n        .logo_photographer {\r\n            margin-left: 0;\r\n        }\r\n\r\n        .logo,\r\n        h1 {\r\n            margin-left: 20px;\r\n            margin-right: 20px;\r\n            font-size: calc($font_size / 1.20);\r\n        }\r\n    }\r\n\r\n    .margin_left_right {\r\n        margin: 0 20px;\r\n    }\r\n\r\n\r\n    .filter_section {\r\n        justify-content: space-between;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n\r\n    .photographer_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/pages/photographer.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VyxNQUFNLE9BQU8sVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE9BQU8sWUFBWSxLQUFLLFVBQVUsWUFBWSxlQUFlLGVBQWUsWUFBWSxNQUFNLE1BQU0sV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLFNBQVMsWUFBWSxZQUFZLFlBQVksT0FBTyxNQUFNLFdBQVcsV0FBVyxZQUFZLE1BQU0sTUFBTSxXQUFXLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxPQUFPLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxLQUFLLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsTUFBTSxLQUFLLE1BQU0sS0FBSyxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxPQUFPLE1BQU0sVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsVUFBVSxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsV0FBVyxNQUFNLE9BQU8sVUFBVSxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxZQUFZLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLE9BQU8sTUFBTSxXQUFXLE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLEtBQUssTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxLQUFLLE1BQU0sVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxXQUFXLE1BQU0sT0FBTyxXQUFXLFdBQVcsVUFBVSxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsVUFBVSxZQUFZLFVBQVUsTUFBTSxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsTUFBTSxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLFlBQVksS0FBSyxVQUFVLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE9BQU8sWUFBWSxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsZUFBZSxhQUFhLFdBQVcsV0FBVyxjQUFjLGVBQWUsT0FBTyxNQUFNLFdBQVcsTUFBTSxRQUFRLFdBQVcsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxPQUFPLE9BQU8sV0FBVyxhQUFhLGVBQWUsZUFBZSxPQUFPLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxXQUFXLFdBQVcsT0FBTyxNQUFNLEtBQUssWUFBWSxVQUFVLGFBQWEsY0FBYyxlQUFlLGVBQWUsZUFBZSxZQUFZLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sS0FBSyxNQUFNLEtBQUssV0FBVyxhQUFhLGVBQWUsZUFBZSxlQUFlLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLFdBQVcsTUFBTSxRQUFRLFdBQVcsTUFBTSxNQUFNLFVBQVUsTUFBTSxLQUFLLFlBQVksTUFBTSxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLFdBQVcsVUFBVSxXQUFXLFVBQVUsVUFBVSxVQUFVLE9BQU8sTUFBTSxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsT0FBTyxNQUFNLFVBQVUsV0FBVyxZQUFZLFlBQVksV0FBVyxXQUFXLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxVQUFVLFlBQVksV0FBVyxNQUFNLE1BQU0sV0FBVyxZQUFZLGFBQWEsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsVUFBVSxNQUFNLE1BQU0sVUFBVSxXQUFXLFdBQVcsU0FBUyxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsV0FBVyxPQUFPLGFBQWEsTUFBTSxVQUFVLFlBQVksYUFBYSxlQUFlLGVBQWUsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsT0FBTyxRQUFRLFdBQVcsWUFBWSxXQUFXLFlBQVksV0FBVyxVQUFVLFdBQVcsT0FBTyxPQUFPLFdBQVcsVUFBVSxXQUFXLFFBQVEsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLGFBQWEsTUFBTSxVQUFVLFlBQVksV0FBVyxXQUFXLE9BQU8sUUFBUSxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsV0FBVyxPQUFPLFFBQVEsV0FBVyxVQUFVLFdBQVcsT0FBTyxPQUFPLFdBQVcsYUFBYSxhQUFhLGFBQWEsV0FBVyxPQUFPLE9BQU8sWUFB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O1dBQ0EsR0FBRztXQUNIO1dBQ0E7V0FDQSxDQUFDOzs7OztXQ1BELDhDQUE4Qzs7Ozs7V0NBOUM7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7OztVRUFBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYS1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktc2xpY2UuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY2xhc3NvZi1yYXcuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4tYWNjZXNzb3IuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLWlzLWlvcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2V4cG9ydC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mYWlscy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1hcHBseS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi1uYW1lLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nZXQtYnVpbHQtaW4uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LW1ldGhvZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oaWRkZW4ta2V5cy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9odG1sLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWNhbGxhYmxlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWZvcmNlZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtcHVyZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbWFrZS1idWlsdC1pbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9tYXRoLXRydW5jLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1pcy1wcm90b3R5cGUtb2YuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb3JkaW5hcnktdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL293bi1rZXlzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZ2V4cC1mbGFncy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQtc3RvcmUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdGFzay5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90cnktdG8tc3RyaW5nLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VpZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy92OC1wcm90b3R5cGUtZGVmaW5lLWJ1Zy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy92YWxpZGF0ZS1hcmd1bWVudHMtbGVuZ3RoLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3dlYWstbWFwLWJhc2ljLWRldGVjdGlvbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMucmVnZXhwLmZsYWdzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuY2xlYXItaW1tZWRpYXRlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuaW1tZWRpYXRlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy93ZWIuc2V0LWltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL2RhdGEvZGlzcGxheURhdGEuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9kYXRhL2Rpc3BsYXlNZWRpYS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL2ZhY3Rvcmllcy9tZWRpYUZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9mYWN0b3JpZXMvcGhvdG9ncmFwaGVyRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3BhZ2VzL3Bob3RvZ3JhcGhlci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2RvbS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2ZldGNoLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvZ2V0VXJsUGFyYW1ldGVyLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvbW9kYWxNYXN0ZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9zZWxlY3RGaWx0ZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9zb3J0QnkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2Nzcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2Nzcy9tYWluLnNjc3M/YjM3OSIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgdHJ5VG9TdHJpbmcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdHJ5LXRvLXN0cmluZycpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxuLy8gYEFzc2VydDogSXNDYWxsYWJsZShhcmd1bWVudCkgaXMgdHJ1ZWBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChpc0NhbGxhYmxlKGFyZ3VtZW50KSkgcmV0dXJuIGFyZ3VtZW50O1xuICB0aHJvdyAkVHlwZUVycm9yKHRyeVRvU3RyaW5nKGFyZ3VtZW50KSArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciAkU3RyaW5nID0gU3RyaW5nO1xudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBBc3NlcnQ6IFR5cGUoYXJndW1lbnQpIGlzIE9iamVjdGBcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIGlmIChpc09iamVjdChhcmd1bWVudCkpIHJldHVybiBhcmd1bWVudDtcbiAgdGhyb3cgJFR5cGVFcnJvcigkU3RyaW5nKGFyZ3VtZW50KSArICcgaXMgbm90IGFuIG9iamVjdCcpO1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcbnZhciBsZW5ndGhPZkFycmF5TGlrZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9sZW5ndGgtb2YtYXJyYXktbGlrZScpO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnsgaW5kZXhPZiwgaW5jbHVkZXMgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChJU19JTkNMVURFUykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBlbCwgZnJvbUluZGV4KSB7XG4gICAgdmFyIE8gPSB0b0luZGV4ZWRPYmplY3QoJHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSBsZW5ndGhPZkFycmF5TGlrZShPKTtcbiAgICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpO1xuICAgIHZhciB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgICBpZiAoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpIHdoaWxlIChsZW5ndGggPiBpbmRleCkge1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5jbHVkZXNcbiAgaW5jbHVkZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmRleE9mYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuICBpbmRleE9mOiBjcmVhdGVNZXRob2QoZmFsc2UpXG59O1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVuY3VycnlUaGlzKFtdLnNsaWNlKTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxudmFyIHRvU3RyaW5nID0gdW5jdXJyeVRoaXMoe30udG9TdHJpbmcpO1xudmFyIHN0cmluZ1NsaWNlID0gdW5jdXJyeVRoaXMoJycuc2xpY2UpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gc3RyaW5nU2xpY2UodG9TdHJpbmcoaXQpLCA4LCAtMSk7XG59O1xuIiwidmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgb3duS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vd24ta2V5cycpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSwgZXhjZXB0aW9ucykge1xuICB2YXIga2V5cyA9IG93bktleXMoc291cmNlKTtcbiAgdmFyIGRlZmluZVByb3BlcnR5ID0gZGVmaW5lUHJvcGVydHlNb2R1bGUuZjtcbiAgdmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZS5mO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICBpZiAoIWhhc093bih0YXJnZXQsIGtleSkgJiYgIShleGNlcHRpb25zICYmIGhhc093bihleGNlcHRpb25zLCBrZXkpKSkge1xuICAgICAgZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleSkpO1xuICAgIH1cbiAgfVxufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwidmFyIG1ha2VCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21ha2UtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHRhcmdldCwgbmFtZSwgZGVzY3JpcHRvcikge1xuICBpZiAoZGVzY3JpcHRvci5nZXQpIG1ha2VCdWlsdEluKGRlc2NyaXB0b3IuZ2V0LCBuYW1lLCB7IGdldHRlcjogdHJ1ZSB9KTtcbiAgaWYgKGRlc2NyaXB0b3Iuc2V0KSBtYWtlQnVpbHRJbihkZXNjcmlwdG9yLnNldCwgbmFtZSwgeyBzZXR0ZXI6IHRydWUgfSk7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eS5mKHRhcmdldCwgbmFtZSwgZGVzY3JpcHRvcik7XG59O1xuIiwidmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgbWFrZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbWFrZS1idWlsdC1pbicpO1xudmFyIGRlZmluZUdsb2JhbFByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1nbG9iYWwtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcbiAgdmFyIHNpbXBsZSA9IG9wdGlvbnMuZW51bWVyYWJsZTtcbiAgdmFyIG5hbWUgPSBvcHRpb25zLm5hbWUgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubmFtZSA6IGtleTtcbiAgaWYgKGlzQ2FsbGFibGUodmFsdWUpKSBtYWtlQnVpbHRJbih2YWx1ZSwgbmFtZSwgb3B0aW9ucyk7XG4gIGlmIChvcHRpb25zLmdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2UgZGVmaW5lR2xvYmFsUHJvcGVydHkoa2V5LCB2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghb3B0aW9ucy51bnNhZmUpIGRlbGV0ZSBPW2tleV07XG4gICAgICBlbHNlIGlmIChPW2tleV0pIHNpbXBsZSA9IHRydWU7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2UgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiAhb3B0aW9ucy5ub25Db25maWd1cmFibGUsXG4gICAgICB3cml0YWJsZTogIW9wdGlvbnMubm9uV3JpdGFibGVcbiAgICB9KTtcbiAgfSByZXR1cm4gTztcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHRyeSB7XG4gICAgZGVmaW5lUHJvcGVydHkoZ2xvYmFsLCBrZXksIHsgdmFsdWU6IHZhbHVlLCBjb25maWd1cmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGdsb2JhbFtrZXldID0gdmFsdWU7XG4gIH0gcmV0dXJuIHZhbHVlO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBEZXRlY3QgSUU4J3MgaW5jb21wbGV0ZSBkZWZpbmVQcm9wZXJ0eSBpbXBsZW1lbnRhdGlvblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgMSwgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSlbMV0gIT0gNztcbn0pO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCJ2YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gLyg/OmlwYWR8aXBob25lfGlwb2QpLiphcHBsZXdlYmtpdC9pLnRlc3QodXNlckFnZW50KTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzb2YoZ2xvYmFsLnByb2Nlc3MpID09ICdwcm9jZXNzJztcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ25hdmlnYXRvcicsICd1c2VyQWdlbnQnKSB8fCAnJztcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgdXNlckFnZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS11c2VyLWFnZW50Jyk7XG5cbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgRGVubyA9IGdsb2JhbC5EZW5vO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zIHx8IERlbm8gJiYgRGVuby52ZXJzaW9uO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjg7XG52YXIgbWF0Y2gsIHZlcnNpb247XG5cbmlmICh2OCkge1xuICBtYXRjaCA9IHY4LnNwbGl0KCcuJyk7XG4gIC8vIGluIG9sZCBDaHJvbWUsIHZlcnNpb25zIG9mIFY4IGlzbid0IFY4ID0gQ2hyb21lIC8gMTBcbiAgLy8gYnV0IHRoZWlyIGNvcnJlY3QgdmVyc2lvbnMgYXJlIG5vdCBpbnRlcmVzdGluZyBmb3IgdXNcbiAgdmVyc2lvbiA9IG1hdGNoWzBdID4gMCAmJiBtYXRjaFswXSA8IDQgPyAxIDogKyhtYXRjaFswXSArIG1hdGNoWzFdKTtcbn1cblxuLy8gQnJvd3NlckZTIE5vZGVKUyBgcHJvY2Vzc2AgcG9seWZpbGwgaW5jb3JyZWN0bHkgc2V0IGAudjhgIHRvIGAwLjBgXG4vLyBzbyBjaGVjayBgdXNlckFnZW50YCBldmVuIGlmIGAudjhgIGV4aXN0cywgYnV0IDBcbmlmICghdmVyc2lvbiAmJiB1c2VyQWdlbnQpIHtcbiAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykvKTtcbiAgaWYgKCFtYXRjaCB8fCBtYXRjaFsxXSA+PSA3NCkge1xuICAgIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9DaHJvbWVcXC8oXFxkKykvKTtcbiAgICBpZiAobWF0Y2gpIHZlcnNpb24gPSArbWF0Y2hbMV07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2ZXJzaW9uO1xuIiwiLy8gSUU4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IFtcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2hhc093blByb3BlcnR5JyxcbiAgJ2lzUHJvdG90eXBlT2YnLFxuICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAndG9Mb2NhbGVTdHJpbmcnLFxuICAndG9TdHJpbmcnLFxuICAndmFsdWVPZidcbl07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1kZXNjcmlwdG9yJykuZjtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgZGVmaW5lQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVHbG9iYWxQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtZ2xvYmFsLXByb3BlcnR5Jyk7XG52YXIgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcblxuLypcbiAgb3B0aW9ucy50YXJnZXQgICAgICAgICAtIG5hbWUgb2YgdGhlIHRhcmdldCBvYmplY3RcbiAgb3B0aW9ucy5nbG9iYWwgICAgICAgICAtIHRhcmdldCBpcyB0aGUgZ2xvYmFsIG9iamVjdFxuICBvcHRpb25zLnN0YXQgICAgICAgICAgIC0gZXhwb3J0IGFzIHN0YXRpYyBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnByb3RvICAgICAgICAgIC0gZXhwb3J0IGFzIHByb3RvdHlwZSBtZXRob2RzIG9mIHRhcmdldFxuICBvcHRpb25zLnJlYWwgICAgICAgICAgIC0gcmVhbCBwcm90b3R5cGUgbWV0aG9kIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy5mb3JjZWQgICAgICAgICAtIGV4cG9ydCBldmVuIGlmIHRoZSBuYXRpdmUgZmVhdHVyZSBpcyBhdmFpbGFibGVcbiAgb3B0aW9ucy5iaW5kICAgICAgICAgICAtIGJpbmQgbWV0aG9kcyB0byB0aGUgdGFyZ2V0LCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMud3JhcCAgICAgICAgICAgLSB3cmFwIGNvbnN0cnVjdG9ycyB0byBwcmV2ZW50aW5nIGdsb2JhbCBwb2xsdXRpb24sIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy51bnNhZmUgICAgICAgICAtIHVzZSB0aGUgc2ltcGxlIGFzc2lnbm1lbnQgb2YgcHJvcGVydHkgaW5zdGVhZCBvZiBkZWxldGUgKyBkZWZpbmVQcm9wZXJ0eVxuICBvcHRpb25zLnNoYW0gICAgICAgICAgIC0gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICBvcHRpb25zLmVudW1lcmFibGUgICAgIC0gZXhwb3J0IGFzIGVudW1lcmFibGUgcHJvcGVydHlcbiAgb3B0aW9ucy5kb250Q2FsbEdldFNldCAtIHByZXZlbnQgY2FsbGluZyBhIGdldHRlciBvbiB0YXJnZXRcbiAgb3B0aW9ucy5uYW1lICAgICAgICAgICAtIHRoZSAubmFtZSBvZiB0aGUgZnVuY3Rpb24gaWYgaXQgZG9lcyBub3QgbWF0Y2ggdGhlIGtleVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNvdXJjZSkge1xuICB2YXIgVEFSR0VUID0gb3B0aW9ucy50YXJnZXQ7XG4gIHZhciBHTE9CQUwgPSBvcHRpb25zLmdsb2JhbDtcbiAgdmFyIFNUQVRJQyA9IG9wdGlvbnMuc3RhdDtcbiAgdmFyIEZPUkNFRCwgdGFyZ2V0LCBrZXksIHRhcmdldFByb3BlcnR5LCBzb3VyY2VQcm9wZXJ0eSwgZGVzY3JpcHRvcjtcbiAgaWYgKEdMT0JBTCkge1xuICAgIHRhcmdldCA9IGdsb2JhbDtcbiAgfSBlbHNlIGlmIChTVEFUSUMpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWxbVEFSR0VUXSB8fCBkZWZpbmVHbG9iYWxQcm9wZXJ0eShUQVJHRVQsIHt9KTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQgPSAoZ2xvYmFsW1RBUkdFVF0gfHwge30pLnByb3RvdHlwZTtcbiAgfVxuICBpZiAodGFyZ2V0KSBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICBzb3VyY2VQcm9wZXJ0eSA9IHNvdXJjZVtrZXldO1xuICAgIGlmIChvcHRpb25zLmRvbnRDYWxsR2V0U2V0KSB7XG4gICAgICBkZXNjcmlwdG9yID0gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KTtcbiAgICAgIHRhcmdldFByb3BlcnR5ID0gZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLnZhbHVlO1xuICAgIH0gZWxzZSB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldFtrZXldO1xuICAgIEZPUkNFRCA9IGlzRm9yY2VkKEdMT0JBTCA/IGtleSA6IFRBUkdFVCArIChTVEFUSUMgPyAnLicgOiAnIycpICsga2V5LCBvcHRpb25zLmZvcmNlZCk7XG4gICAgLy8gY29udGFpbmVkIGluIHRhcmdldFxuICAgIGlmICghRk9SQ0VEICYmIHRhcmdldFByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc291cmNlUHJvcGVydHkgPT0gdHlwZW9mIHRhcmdldFByb3BlcnR5KSBjb250aW51ZTtcbiAgICAgIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMoc291cmNlUHJvcGVydHksIHRhcmdldFByb3BlcnR5KTtcbiAgICB9XG4gICAgLy8gYWRkIGEgZmxhZyB0byBub3QgY29tcGxldGVseSBmdWxsIHBvbHlmaWxsc1xuICAgIGlmIChvcHRpb25zLnNoYW0gfHwgKHRhcmdldFByb3BlcnR5ICYmIHRhcmdldFByb3BlcnR5LnNoYW0pKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoc291cmNlUHJvcGVydHksICdzaGFtJywgdHJ1ZSk7XG4gICAgfVxuICAgIGRlZmluZUJ1aWx0SW4odGFyZ2V0LCBrZXksIHNvdXJjZVByb3BlcnR5LCBvcHRpb25zKTtcbiAgfVxufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG4iLCJ2YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIGFwcGx5ID0gRnVuY3Rpb25Qcm90b3R5cGUuYXBwbHk7XG52YXIgY2FsbCA9IEZ1bmN0aW9uUHJvdG90eXBlLmNhbGw7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLXJlZmxlY3QgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgUmVmbGVjdCA9PSAnb2JqZWN0JyAmJiBSZWZsZWN0LmFwcGx5IHx8IChOQVRJVkVfQklORCA/IGNhbGwuYmluZChhcHBseSkgOiBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYWxsLmFwcGx5KGFwcGx5LCBhcmd1bWVudHMpO1xufSk7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgYUNhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtY2FsbGFibGUnKTtcbnZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgYmluZCA9IHVuY3VycnlUaGlzKHVuY3VycnlUaGlzLmJpbmQpO1xuXG4vLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0KSB7XG4gIGFDYWxsYWJsZShmbik7XG4gIHJldHVybiB0aGF0ID09PSB1bmRlZmluZWQgPyBmbiA6IE5BVElWRV9CSU5EID8gYmluZChmbiwgdGhhdCkgOiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLWZ1bmN0aW9uLXByb3RvdHlwZS1iaW5kIC0tIHNhZmVcbiAgdmFyIHRlc3QgPSAoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KS5iaW5kKCk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgLS0gc2FmZVxuICByZXR1cm4gdHlwZW9mIHRlc3QgIT0gJ2Z1bmN0aW9uJyB8fCB0ZXN0Lmhhc093blByb3BlcnR5KCdwcm90b3R5cGUnKTtcbn0pO1xuIiwidmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBjYWxsID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGw7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX0JJTkQgPyBjYWxsLmJpbmQoY2FsbCkgOiBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjYWxsLmFwcGx5KGNhbGwsIGFyZ3VtZW50cyk7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgZ2V0RGVzY3JpcHRvciA9IERFU0NSSVBUT1JTICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbnZhciBFWElTVFMgPSBoYXNPd24oRnVuY3Rpb25Qcm90b3R5cGUsICduYW1lJyk7XG4vLyBhZGRpdGlvbmFsIHByb3RlY3Rpb24gZnJvbSBtaW5pZmllZCAvIG1hbmdsZWQgLyBkcm9wcGVkIGZ1bmN0aW9uIG5hbWVzXG52YXIgUFJPUEVSID0gRVhJU1RTICYmIChmdW5jdGlvbiBzb21ldGhpbmcoKSB7IC8qIGVtcHR5ICovIH0pLm5hbWUgPT09ICdzb21ldGhpbmcnO1xudmFyIENPTkZJR1VSQUJMRSA9IEVYSVNUUyAmJiAoIURFU0NSSVBUT1JTIHx8IChERVNDUklQVE9SUyAmJiBnZXREZXNjcmlwdG9yKEZ1bmN0aW9uUHJvdG90eXBlLCAnbmFtZScpLmNvbmZpZ3VyYWJsZSkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgRVhJU1RTOiBFWElTVFMsXG4gIFBST1BFUjogUFJPUEVSLFxuICBDT05GSUdVUkFCTEU6IENPTkZJR1VSQUJMRVxufTtcbiIsInZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgRnVuY3Rpb25Qcm90b3R5cGUgPSBGdW5jdGlvbi5wcm90b3R5cGU7XG52YXIgYmluZCA9IEZ1bmN0aW9uUHJvdG90eXBlLmJpbmQ7XG52YXIgY2FsbCA9IEZ1bmN0aW9uUHJvdG90eXBlLmNhbGw7XG52YXIgdW5jdXJyeVRoaXMgPSBOQVRJVkVfQklORCAmJiBiaW5kLmJpbmQoY2FsbCwgY2FsbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX0JJTkQgPyBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIGZuICYmIHVuY3VycnlUaGlzKGZuKTtcbn0gOiBmdW5jdGlvbiAoZm4pIHtcbiAgcmV0dXJuIGZuICYmIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gY2FsbC5hcHBseShmbiwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIGFGdW5jdGlvbiA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gaXNDYWxsYWJsZShhcmd1bWVudCkgPyBhcmd1bWVudCA6IHVuZGVmaW5lZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgbWV0aG9kKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGFGdW5jdGlvbihnbG9iYWxbbmFtZXNwYWNlXSkgOiBnbG9iYWxbbmFtZXNwYWNlXSAmJiBnbG9iYWxbbmFtZXNwYWNlXVttZXRob2RdO1xufTtcbiIsInZhciBhQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1jYWxsYWJsZScpO1xudmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG5cbi8vIGBHZXRNZXRob2RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXRtZXRob2Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFYsIFApIHtcbiAgdmFyIGZ1bmMgPSBWW1BdO1xuICByZXR1cm4gaXNOdWxsT3JVbmRlZmluZWQoZnVuYykgPyB1bmRlZmluZWQgOiBhQ2FsbGFibGUoZnVuYyk7XG59O1xuIiwidmFyIGNoZWNrID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpdCAmJiBpdC5NYXRoID09IE1hdGggJiYgaXQ7XG59O1xuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxubW9kdWxlLmV4cG9ydHMgPVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1nbG9iYWwtdGhpcyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1nbG9iYWxzIC0tIHNhZmVcbiAgY2hlY2sodHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZikgfHxcbiAgY2hlY2sodHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwpIHx8XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuYyAtLSBmYWxsYmFja1xuICAoZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSkoKSB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xuXG52YXIgaGFzT3duUHJvcGVydHkgPSB1bmN1cnJ5VGhpcyh7fS5oYXNPd25Qcm9wZXJ0eSk7XG5cbi8vIGBIYXNPd25Qcm9wZXJ0eWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWhhc293bnByb3BlcnR5XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtaGFzb3duIC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0Lmhhc093biB8fCBmdW5jdGlvbiBoYXNPd24oaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkodG9PYmplY3QoaXQpLCBrZXkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge307XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCdkb2N1bWVudCcsICdkb2N1bWVudEVsZW1lbnQnKTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xuXG4vLyBUaGFua3MgdG8gSUU4IGZvciBpdHMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIURFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0ZUVsZW1lbnQoJ2RpdicpLCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH1cbiAgfSkuYSAhPSA3O1xufSk7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xudmFyIHNwbGl0ID0gdW5jdXJyeVRoaXMoJycuc3BsaXQpO1xuXG4vLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xubW9kdWxlLmV4cG9ydHMgPSBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIHRocm93cyBhbiBlcnJvciBpbiByaGlubywgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb3ppbGxhL3JoaW5vL2lzc3Vlcy8zNDZcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGlucyAtLSBzYWZlXG4gIHJldHVybiAhJE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApO1xufSkgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGNsYXNzb2YoaXQpID09ICdTdHJpbmcnID8gc3BsaXQoaXQsICcnKSA6ICRPYmplY3QoaXQpO1xufSA6ICRPYmplY3Q7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IHVuY3VycnlUaGlzKEZ1bmN0aW9uLnRvU3RyaW5nKTtcblxuLy8gdGhpcyBoZWxwZXIgYnJva2VuIGluIGBjb3JlLWpzQDMuNC4xLTMuNC40YCwgc28gd2UgY2FuJ3QgdXNlIGBzaGFyZWRgIGhlbHBlclxuaWYgKCFpc0NhbGxhYmxlKHN0b3JlLmluc3BlY3RTb3VyY2UpKSB7XG4gIHN0b3JlLmluc3BlY3RTb3VyY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb25Ub1N0cmluZyhpdCk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmUuaW5zcGVjdFNvdXJjZTtcbiIsInZhciBOQVRJVkVfV0VBS19NQVAgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2Vhay1tYXAtYmFzaWMtZGV0ZWN0aW9uJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEID0gJ09iamVjdCBhbHJlYWR5IGluaXRpYWxpemVkJztcbnZhciBUeXBlRXJyb3IgPSBnbG9iYWwuVHlwZUVycm9yO1xudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcbnZhciBzZXQsIGdldCwgaGFzO1xuXG52YXIgZW5mb3JjZSA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaGFzKGl0KSA/IGdldChpdCkgOiBzZXQoaXQsIHt9KTtcbn07XG5cbnZhciBnZXR0ZXJGb3IgPSBmdW5jdGlvbiAoVFlQRSkge1xuICByZXR1cm4gZnVuY3Rpb24gKGl0KSB7XG4gICAgdmFyIHN0YXRlO1xuICAgIGlmICghaXNPYmplY3QoaXQpIHx8IChzdGF0ZSA9IGdldChpdCkpLnR5cGUgIT09IFRZUEUpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignSW5jb21wYXRpYmxlIHJlY2VpdmVyLCAnICsgVFlQRSArICcgcmVxdWlyZWQnKTtcbiAgICB9IHJldHVybiBzdGF0ZTtcbiAgfTtcbn07XG5cbmlmIChOQVRJVkVfV0VBS19NQVAgfHwgc2hhcmVkLnN0YXRlKSB7XG4gIHZhciBzdG9yZSA9IHNoYXJlZC5zdGF0ZSB8fCAoc2hhcmVkLnN0YXRlID0gbmV3IFdlYWtNYXAoKSk7XG4gIHZhciB3bWdldCA9IHVuY3VycnlUaGlzKHN0b3JlLmdldCk7XG4gIHZhciB3bWhhcyA9IHVuY3VycnlUaGlzKHN0b3JlLmhhcyk7XG4gIHZhciB3bXNldCA9IHVuY3VycnlUaGlzKHN0b3JlLnNldCk7XG4gIHNldCA9IGZ1bmN0aW9uIChpdCwgbWV0YWRhdGEpIHtcbiAgICBpZiAod21oYXMoc3RvcmUsIGl0KSkgdGhyb3cgVHlwZUVycm9yKE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEKTtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICB3bXNldChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldChzdG9yZSwgaXQpIHx8IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21oYXMoc3RvcmUsIGl0KTtcbiAgfTtcbn0gZWxzZSB7XG4gIHZhciBTVEFURSA9IHNoYXJlZEtleSgnc3RhdGUnKTtcbiAgaGlkZGVuS2V5c1tTVEFURV0gPSB0cnVlO1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgaWYgKGhhc093bihpdCwgU1RBVEUpKSB0aHJvdyBUeXBlRXJyb3IoT0JKRUNUX0FMUkVBRFlfSU5JVElBTElaRUQpO1xuICAgIG1ldGFkYXRhLmZhY2FkZSA9IGl0O1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShpdCwgU1RBVEUsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBoYXNPd24oaXQsIFNUQVRFKSA/IGl0W1NUQVRFXSA6IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gaGFzT3duKGl0LCBTVEFURSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgZ2V0OiBnZXQsXG4gIGhhczogaGFzLFxuICBlbmZvcmNlOiBlbmZvcmNlLFxuICBnZXR0ZXJGb3I6IGdldHRlckZvclxufTtcbiIsIi8vIGBJc0NhbGxhYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtaXNjYWxsYWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmd1bWVudCA9PSAnZnVuY3Rpb24nO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09IE5BVElWRSA/IGZhbHNlXG4gICAgOiBpc0NhbGxhYmxlKGRldGVjdGlvbikgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcbiIsIi8vIHdlIGNhbid0IHVzZSBqdXN0IGBpdCA9PSBudWxsYCBzaW5jZSBvZiBgZG9jdW1lbnQuYWxsYCBzcGVjaWFsIGNhc2Vcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtSXNIVE1MRERBLWludGVybmFsLXNsb3QtYWVjXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgPT09IG51bGwgfHwgaXQgPT09IHVuZGVmaW5lZDtcbn07XG4iLCJ2YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgZG9jdW1lbnRBbGwgPSB0eXBlb2YgZG9jdW1lbnQgPT0gJ29iamVjdCcgJiYgZG9jdW1lbnQuYWxsO1xuXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLUlzSFRNTEREQS1pbnRlcm5hbC1zbG90XG52YXIgU1BFQ0lBTF9ET0NVTUVOVF9BTEwgPSB0eXBlb2YgZG9jdW1lbnRBbGwgPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnRBbGwgIT09IHVuZGVmaW5lZDtcblxubW9kdWxlLmV4cG9ydHMgPSBTUEVDSUFMX0RPQ1VNRU5UX0FMTCA/IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiBpc0NhbGxhYmxlKGl0KSB8fCBpdCA9PT0gZG9jdW1lbnRBbGw7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IGlzQ2FsbGFibGUoaXQpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyICRPYmplY3QgPSBPYmplY3Q7XG5cbm1vZHVsZS5leHBvcnRzID0gVVNFX1NZTUJPTF9BU19VSUQgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyICRTeW1ib2wgPSBnZXRCdWlsdEluKCdTeW1ib2wnKTtcbiAgcmV0dXJuIGlzQ2FsbGFibGUoJFN5bWJvbCkgJiYgaXNQcm90b3R5cGVPZigkU3ltYm9sLnByb3RvdHlwZSwgJE9iamVjdChpdCkpO1xufTtcbiIsInZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcblxuLy8gYExlbmd0aE9mQXJyYXlMaWtlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbGVuZ3Rob2ZhcnJheWxpa2Vcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdG9MZW5ndGgob2JqLmxlbmd0aCk7XG59O1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1uYW1lJykuQ09ORklHVVJBQkxFO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBlbmZvcmNlSW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZW5mb3JjZTtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXQ7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxudmFyIGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG52YXIgQ09ORklHVVJBQkxFX0xFTkdUSCA9IERFU0NSSVBUT1JTICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eShmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0sICdsZW5ndGgnLCB7IHZhbHVlOiA4IH0pLmxlbmd0aCAhPT0gODtcbn0pO1xuXG52YXIgVEVNUExBVEUgPSBTdHJpbmcoU3RyaW5nKS5zcGxpdCgnU3RyaW5nJyk7XG5cbnZhciBtYWtlQnVpbHRJbiA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHZhbHVlLCBuYW1lLCBvcHRpb25zKSB7XG4gIGlmIChTdHJpbmcobmFtZSkuc2xpY2UoMCwgNykgPT09ICdTeW1ib2woJykge1xuICAgIG5hbWUgPSAnWycgKyBTdHJpbmcobmFtZSkucmVwbGFjZSgvXlN5bWJvbFxcKChbXildKilcXCkvLCAnJDEnKSArICddJztcbiAgfVxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmdldHRlcikgbmFtZSA9ICdnZXQgJyArIG5hbWU7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuc2V0dGVyKSBuYW1lID0gJ3NldCAnICsgbmFtZTtcbiAgaWYgKCFoYXNPd24odmFsdWUsICduYW1lJykgfHwgKENPTkZJR1VSQUJMRV9GVU5DVElPTl9OQU1FICYmIHZhbHVlLm5hbWUgIT09IG5hbWUpKSB7XG4gICAgaWYgKERFU0NSSVBUT1JTKSBkZWZpbmVQcm9wZXJ0eSh2YWx1ZSwgJ25hbWUnLCB7IHZhbHVlOiBuYW1lLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG4gICAgZWxzZSB2YWx1ZS5uYW1lID0gbmFtZTtcbiAgfVxuICBpZiAoQ09ORklHVVJBQkxFX0xFTkdUSCAmJiBvcHRpb25zICYmIGhhc093bihvcHRpb25zLCAnYXJpdHknKSAmJiB2YWx1ZS5sZW5ndGggIT09IG9wdGlvbnMuYXJpdHkpIHtcbiAgICBkZWZpbmVQcm9wZXJ0eSh2YWx1ZSwgJ2xlbmd0aCcsIHsgdmFsdWU6IG9wdGlvbnMuYXJpdHkgfSk7XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAob3B0aW9ucyAmJiBoYXNPd24ob3B0aW9ucywgJ2NvbnN0cnVjdG9yJykgJiYgb3B0aW9ucy5jb25zdHJ1Y3Rvcikge1xuICAgICAgaWYgKERFU0NSSVBUT1JTKSBkZWZpbmVQcm9wZXJ0eSh2YWx1ZSwgJ3Byb3RvdHlwZScsIHsgd3JpdGFibGU6IGZhbHNlIH0pO1xuICAgIC8vIGluIFY4IH4gQ2hyb21lIDUzLCBwcm90b3R5cGVzIG9mIHNvbWUgbWV0aG9kcywgbGlrZSBgQXJyYXkucHJvdG90eXBlLnZhbHVlc2AsIGFyZSBub24td3JpdGFibGVcbiAgICB9IGVsc2UgaWYgKHZhbHVlLnByb3RvdHlwZSkgdmFsdWUucHJvdG90eXBlID0gdW5kZWZpbmVkO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHZhciBzdGF0ZSA9IGVuZm9yY2VJbnRlcm5hbFN0YXRlKHZhbHVlKTtcbiAgaWYgKCFoYXNPd24oc3RhdGUsICdzb3VyY2UnKSkge1xuICAgIHN0YXRlLnNvdXJjZSA9IFRFTVBMQVRFLmpvaW4odHlwZW9mIG5hbWUgPT0gJ3N0cmluZycgPyBuYW1lIDogJycpO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG5cbi8vIGFkZCBmYWtlIEZ1bmN0aW9uI3RvU3RyaW5nIGZvciBjb3JyZWN0IHdvcmsgd3JhcHBlZCBtZXRob2RzIC8gY29uc3RydWN0b3JzIHdpdGggbWV0aG9kcyBsaWtlIExvRGFzaCBpc05hdGl2ZVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWV4dGVuZC1uYXRpdmUgLS0gcmVxdWlyZWRcbkZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZyA9IG1ha2VCdWlsdEluKGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gaXNDYWxsYWJsZSh0aGlzKSAmJiBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpLnNvdXJjZSB8fCBpbnNwZWN0U291cmNlKHRoaXMpO1xufSwgJ3RvU3RyaW5nJyk7XG4iLCJ2YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5cbi8vIGBNYXRoLnRydW5jYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtbWF0aC50cnVuY1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tbWF0aC10cnVuYyAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE1hdGgudHJ1bmMgfHwgZnVuY3Rpb24gdHJ1bmMoeCkge1xuICB2YXIgbiA9ICt4O1xuICByZXR1cm4gKG4gPiAwID8gZmxvb3IgOiBjZWlsKShuKTtcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIFY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Y4LXByb3RvdHlwZS1kZWZpbmUtYnVnJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xudmFyIEVOVU1FUkFCTEUgPSAnZW51bWVyYWJsZSc7XG52YXIgQ09ORklHVVJBQkxFID0gJ2NvbmZpZ3VyYWJsZSc7XG52YXIgV1JJVEFCTEUgPSAnd3JpdGFibGUnO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnR5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IFY4X1BST1RPVFlQRV9ERUZJTkVfQlVHID8gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAodHlwZW9mIE8gPT09ICdmdW5jdGlvbicgJiYgUCA9PT0gJ3Byb3RvdHlwZScgJiYgJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzICYmIFdSSVRBQkxFIGluIEF0dHJpYnV0ZXMgJiYgIUF0dHJpYnV0ZXNbV1JJVEFCTEVdKSB7XG4gICAgdmFyIGN1cnJlbnQgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICAgIGlmIChjdXJyZW50ICYmIGN1cnJlbnRbV1JJVEFCTEVdKSB7XG4gICAgICBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgICAgIEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogQ09ORklHVVJBQkxFIGluIEF0dHJpYnV0ZXMgPyBBdHRyaWJ1dGVzW0NPTkZJR1VSQUJMRV0gOiBjdXJyZW50W0NPTkZJR1VSQUJMRV0sXG4gICAgICAgIGVudW1lcmFibGU6IEVOVU1FUkFCTEUgaW4gQXR0cmlidXRlcyA/IEF0dHJpYnV0ZXNbRU5VTUVSQUJMRV0gOiBjdXJyZW50W0VOVU1FUkFCTEVdLFxuICAgICAgICB3cml0YWJsZTogZmFsc2VcbiAgICAgIH07XG4gICAgfVxuICB9IHJldHVybiAkZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG59IDogJGRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuICRkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyAkVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCcpO1xuICBpZiAoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKSBPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgcHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LXByb3BlcnR5LWlzLWVudW1lcmFibGUnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b1Byb3BlcnR5S2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByb3BlcnR5LWtleScpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbi8vIGBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApIHtcbiAgTyA9IHRvSW5kZXhlZE9iamVjdChPKTtcbiAgUCA9IHRvUHJvcGVydHlLZXkoUCk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoaGFzT3duKE8sIFApKSByZXR1cm4gY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKCFjYWxsKHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYsIE8sIFApLCBPW1BdKTtcbn07XG4iLCJ2YXIgaW50ZXJuYWxPYmplY3RLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW51bS1idWcta2V5cycpO1xuXG52YXIgaGlkZGVuS2V5cyA9IGVudW1CdWdLZXlzLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QuZ2V0b3ducHJvcGVydHluYW1lc1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5bmFtZXMgLS0gc2FmZVxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKSB7XG4gIHJldHVybiBpbnRlcm5hbE9iamVjdEtleXMoTywgaGlkZGVuS2V5cyk7XG59O1xuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5c3ltYm9scyAtLSBzYWZlXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHVuY3VycnlUaGlzKHt9LmlzUHJvdG90eXBlT2YpO1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgcHVzaCA9IHVuY3VycnlUaGlzKFtdLnB1c2gpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSAhaGFzT3duKGhpZGRlbktleXMsIGtleSkgJiYgaGFzT3duKE8sIGtleSkgJiYgcHVzaChyZXN1bHQsIGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUgKG5hbWVzLmxlbmd0aCA+IGkpIGlmIChoYXNPd24oTywga2V5ID0gbmFtZXNbaSsrXSkpIHtcbiAgICB+aW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcHVzaChyZXN1bHQsIGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBOYXNob3JuIH4gSkRLOCBidWdcbnZhciBOQVNIT1JOX0JVRyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiAhJHByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoeyAxOiAyIH0sIDEpO1xuXG4vLyBgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZWAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUucHJvcGVydHlpc2VudW1lcmFibGVcbmV4cG9ydHMuZiA9IE5BU0hPUk5fQlVHID8gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBWKTtcbiAgcmV0dXJuICEhZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGU7XG59IDogJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuIiwidmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBPcmRpbmFyeVRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb3JkaW5hcnl0b3ByaW1pdGl2ZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaW5wdXQsIHByZWYpIHtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmIChwcmVmID09PSAnc3RyaW5nJyAmJiBpc0NhbGxhYmxlKGZuID0gaW5wdXQudG9TdHJpbmcpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAoaXNDYWxsYWJsZShmbiA9IGlucHV0LnZhbHVlT2YpICYmICFpc09iamVjdCh2YWwgPSBjYWxsKGZuLCBpbnB1dCkpKSByZXR1cm4gdmFsO1xuICBpZiAocHJlZiAhPT0gJ3N0cmluZycgJiYgaXNDYWxsYWJsZShmbiA9IGlucHV0LnRvU3RyaW5nKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgJFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LW5hbWVzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMnKTtcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxudmFyIGNvbmNhdCA9IHVuY3VycnlUaGlzKFtdLmNvbmNhdCk7XG5cbi8vIGFsbCBvYmplY3Qga2V5cywgaW5jbHVkZXMgbm9uLWVudW1lcmFibGUgYW5kIHN5bWJvbHNcbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignUmVmbGVjdCcsICdvd25LZXlzJykgfHwgZnVuY3Rpb24gb3duS2V5cyhpdCkge1xuICB2YXIga2V5cyA9IGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUuZihhbk9iamVjdChpdCkpO1xuICB2YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlLmY7XG4gIHJldHVybiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBjb25jYXQoa2V5cywgZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSkgOiBrZXlzO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcblxuLy8gYFJlZ0V4cC5wcm90b3R5cGUuZmxhZ3NgIGdldHRlciBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1nZXQtcmVnZXhwLnByb3RvdHlwZS5mbGFnc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciB0aGF0ID0gYW5PYmplY3QodGhpcyk7XG4gIHZhciByZXN1bHQgPSAnJztcbiAgaWYgKHRoYXQuaGFzSW5kaWNlcykgcmVzdWx0ICs9ICdkJztcbiAgaWYgKHRoYXQuZ2xvYmFsKSByZXN1bHQgKz0gJ2cnO1xuICBpZiAodGhhdC5pZ25vcmVDYXNlKSByZXN1bHQgKz0gJ2knO1xuICBpZiAodGhhdC5tdWx0aWxpbmUpIHJlc3VsdCArPSAnbSc7XG4gIGlmICh0aGF0LmRvdEFsbCkgcmVzdWx0ICs9ICdzJztcbiAgaWYgKHRoYXQudW5pY29kZSkgcmVzdWx0ICs9ICd1JztcbiAgaWYgKHRoYXQudW5pY29kZVNldHMpIHJlc3VsdCArPSAndic7XG4gIGlmICh0aGF0LnN0aWNreSkgcmVzdWx0ICs9ICd5JztcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCJ2YXIgaXNOdWxsT3JVbmRlZmluZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtcmVxdWlyZW9iamVjdGNvZXJjaWJsZVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGl0KSkgdGhyb3cgJFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBkZWZpbmVHbG9iYWxQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtZ2xvYmFsLXByb3BlcnR5Jyk7XG5cbnZhciBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJztcbnZhciBzdG9yZSA9IGdsb2JhbFtTSEFSRURdIHx8IGRlZmluZUdsb2JhbFByb3BlcnR5KFNIQVJFRCwge30pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlO1xuIiwidmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogJzMuMjUuMCcsXG4gIG1vZGU6IElTX1BVUkUgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxNC0yMDIyIERlbmlzIFB1c2hrYXJldiAoemxvaXJvY2sucnUpJyxcbiAgbGljZW5zZTogJ2h0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2Jsb2IvdjMuMjUuMC9MSUNFTlNFJyxcbiAgc291cmNlOiAnaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMnXG59KTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGVzLXgvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdjgtdmVyc2lvbicpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eXN5bWJvbHMgLS0gcmVxdWlyZWQgZm9yIHRlc3Rpbmdcbm1vZHVsZS5leHBvcnRzID0gISFPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICYmICFmYWlscyhmdW5jdGlvbiAoKSB7XG4gIHZhciBzeW1ib2wgPSBTeW1ib2woKTtcbiAgLy8gQ2hyb21lIDM4IFN5bWJvbCBoYXMgaW5jb3JyZWN0IHRvU3RyaW5nIGNvbnZlcnNpb25cbiAgLy8gYGdldC1vd24tcHJvcGVydHktc3ltYm9sc2AgcG9seWZpbGwgc3ltYm9scyBjb252ZXJ0ZWQgdG8gb2JqZWN0IGFyZSBub3QgU3ltYm9sIGluc3RhbmNlc1xuICByZXR1cm4gIVN0cmluZyhzeW1ib2wpIHx8ICEoT2JqZWN0KHN5bWJvbCkgaW5zdGFuY2VvZiBTeW1ib2wpIHx8XG4gICAgLy8gQ2hyb21lIDM4LTQwIHN5bWJvbHMgYXJlIG5vdCBpbmhlcml0ZWQgZnJvbSBET00gY29sbGVjdGlvbnMgcHJvdG90eXBlcyB0byBpbnN0YW5jZXNcbiAgICAhU3ltYm9sLnNoYW0gJiYgVjhfVkVSU0lPTiAmJiBWOF9WRVJTSU9OIDwgNDE7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgYXBwbHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYXBwbHknKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtY29udGV4dCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgaHRtbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9odG1sJyk7XG52YXIgYXJyYXlTbGljZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zbGljZScpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcbnZhciB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy92YWxpZGF0ZS1hcmd1bWVudHMtbGVuZ3RoJyk7XG52YXIgSVNfSU9TID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MnKTtcbnZhciBJU19OT0RFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VuZ2luZS1pcy1ub2RlJyk7XG5cbnZhciBzZXQgPSBnbG9iYWwuc2V0SW1tZWRpYXRlO1xudmFyIGNsZWFyID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIHByb2Nlc3MgPSBnbG9iYWwucHJvY2VzcztcbnZhciBEaXNwYXRjaCA9IGdsb2JhbC5EaXNwYXRjaDtcbnZhciBGdW5jdGlvbiA9IGdsb2JhbC5GdW5jdGlvbjtcbnZhciBNZXNzYWdlQ2hhbm5lbCA9IGdsb2JhbC5NZXNzYWdlQ2hhbm5lbDtcbnZhciBTdHJpbmcgPSBnbG9iYWwuU3RyaW5nO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgbG9jYXRpb24sIGRlZmVyLCBjaGFubmVsLCBwb3J0O1xuXG50cnkge1xuICAvLyBEZW5vIHRocm93cyBhIFJlZmVyZW5jZUVycm9yIG9uIGBsb2NhdGlvbmAgYWNjZXNzIHdpdGhvdXQgYC0tbG9jYXRpb25gIGZsYWdcbiAgbG9jYXRpb24gPSBnbG9iYWwubG9jYXRpb247XG59IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG5cbnZhciBydW4gPSBmdW5jdGlvbiAoaWQpIHtcbiAgaWYgKGhhc093bihxdWV1ZSwgaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcblxudmFyIHJ1bm5lciA9IGZ1bmN0aW9uIChpZCkge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJ1bihpZCk7XG4gIH07XG59O1xuXG52YXIgbGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgcnVuKGV2ZW50LmRhdGEpO1xufTtcblxudmFyIHBvc3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgLy8gb2xkIGVuZ2luZXMgaGF2ZSBub3QgbG9jYXRpb24ub3JpZ2luXG4gIGdsb2JhbC5wb3N0TWVzc2FnZShTdHJpbmcoaWQpLCBsb2NhdGlvbi5wcm90b2NvbCArICcvLycgKyBsb2NhdGlvbi5ob3N0KTtcbn07XG5cbi8vIE5vZGUuanMgMC45KyAmIElFMTArIGhhcyBzZXRJbW1lZGlhdGUsIG90aGVyd2lzZTpcbmlmICghc2V0IHx8ICFjbGVhcikge1xuICBzZXQgPSBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoaGFuZGxlcikge1xuICAgIHZhbGlkYXRlQXJndW1lbnRzTGVuZ3RoKGFyZ3VtZW50cy5sZW5ndGgsIDEpO1xuICAgIHZhciBmbiA9IGlzQ2FsbGFibGUoaGFuZGxlcikgPyBoYW5kbGVyIDogRnVuY3Rpb24oaGFuZGxlcik7XG4gICAgdmFyIGFyZ3MgPSBhcnJheVNsaWNlKGFyZ3VtZW50cywgMSk7XG4gICAgcXVldWVbKytjb3VudGVyXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGFwcGx5KGZuLCB1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH07XG4gICAgZGVmZXIoY291bnRlcik7XG4gICAgcmV0dXJuIGNvdW50ZXI7XG4gIH07XG4gIGNsZWFyID0gZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaWQpIHtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICB9O1xuICAvLyBOb2RlLmpzIDAuOC1cbiAgaWYgKElTX05PREUpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhydW5uZXIoaWQpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KHJ1bm5lcihpZCkpO1xuICAgIH07XG4gIC8vIEJyb3dzZXJzIHdpdGggTWVzc2FnZUNoYW5uZWwsIGluY2x1ZGVzIFdlYldvcmtlcnNcbiAgLy8gZXhjZXB0IGlPUyAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82MjRcbiAgfSBlbHNlIGlmIChNZXNzYWdlQ2hhbm5lbCAmJiAhSVNfSU9TKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBiaW5kKHBvcnQucG9zdE1lc3NhZ2UsIHBvcnQpO1xuICAvLyBCcm93c2VycyB3aXRoIHBvc3RNZXNzYWdlLCBza2lwIFdlYldvcmtlcnNcbiAgLy8gSUU4IGhhcyBwb3N0TWVzc2FnZSwgYnV0IGl0J3Mgc3luYyAmIHR5cGVvZiBpdHMgcG9zdE1lc3NhZ2UgaXMgJ29iamVjdCdcbiAgfSBlbHNlIGlmIChcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lciAmJlxuICAgIGlzQ2FsbGFibGUoZ2xvYmFsLnBvc3RNZXNzYWdlKSAmJlxuICAgICFnbG9iYWwuaW1wb3J0U2NyaXB0cyAmJlxuICAgIGxvY2F0aW9uICYmIGxvY2F0aW9uLnByb3RvY29sICE9PSAnZmlsZTonICYmXG4gICAgIWZhaWxzKHBvc3QpXG4gICkge1xuICAgIGRlZmVyID0gcG9zdDtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGxpc3RlbmVyLCBmYWxzZSk7XG4gIC8vIElFOC1cbiAgfSBlbHNlIGlmIChPTlJFQURZU1RBVEVDSEFOR0UgaW4gY3JlYXRlRWxlbWVudCgnc2NyaXB0JykpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgaHRtbC5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuKGlkKTtcbiAgICAgIH07XG4gICAgfTtcbiAgLy8gUmVzdCBvbGQgYnJvd3NlcnNcbiAgfSBlbHNlIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgc2V0VGltZW91dChydW5uZXIoaWQpLCAwKTtcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgY2xlYXI6IGNsZWFyXG59O1xuIiwidmFyIHRvSW50ZWdlck9ySW5maW5pdHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eScpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIEhlbHBlciBmb3IgYSBwb3B1bGFyIHJlcGVhdGluZyBjYXNlIG9mIHRoZSBzcGVjOlxuLy8gTGV0IGludGVnZXIgYmUgPyBUb0ludGVnZXIoaW5kZXgpLlxuLy8gSWYgaW50ZWdlciA8IDAsIGxldCByZXN1bHQgYmUgbWF4KChsZW5ndGggKyBpbnRlZ2VyKSwgMCk7IGVsc2UgbGV0IHJlc3VsdCBiZSBtaW4oaW50ZWdlciwgbGVuZ3RoKS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgdmFyIGludGVnZXIgPSB0b0ludGVnZXJPckluZmluaXR5KGluZGV4KTtcbiAgcmV0dXJuIGludGVnZXIgPCAwID8gbWF4KGludGVnZXIgKyBsZW5ndGgsIDApIDogbWluKGludGVnZXIsIGxlbmd0aCk7XG59O1xuIiwiLy8gdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEluZGV4ZWRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShpdCkpO1xufTtcbiIsInZhciB0cnVuYyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9tYXRoLXRydW5jJyk7XG5cbi8vIGBUb0ludGVnZXJPckluZmluaXR5YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9pbnRlZ2Vyb3JpbmZpbml0eVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdmFyIG51bWJlciA9ICthcmd1bWVudDtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlbGYtY29tcGFyZSAtLSBOYU4gY2hlY2tcbiAgcmV0dXJuIG51bWJlciAhPT0gbnVtYmVyIHx8IG51bWJlciA9PT0gMCA/IDAgOiB0cnVuYyhudW1iZXIpO1xufTtcbiIsInZhciB0b0ludGVnZXJPckluZmluaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHknKTtcblxudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBgVG9MZW5ndGhgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b2xlbmd0aFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGFyZ3VtZW50ID4gMCA/IG1pbih0b0ludGVnZXJPckluZmluaXR5KGFyZ3VtZW50KSwgMHgxRkZGRkZGRkZGRkZGRikgOiAwOyAvLyAyICoqIDUzIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59O1xuIiwidmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b29iamVjdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuICRPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudCkpO1xufTtcbiIsInZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcbnZhciBnZXRNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LW1ldGhvZCcpO1xudmFyIG9yZGluYXJ5VG9QcmltaXRpdmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3JkaW5hcnktdG8tcHJpbWl0aXZlJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xudmFyIFRPX1BSSU1JVElWRSA9IHdlbGxLbm93blN5bWJvbCgndG9QcmltaXRpdmUnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9wcmltaXRpdmVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBwcmVmKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpIHx8IGlzU3ltYm9sKGlucHV0KSkgcmV0dXJuIGlucHV0O1xuICB2YXIgZXhvdGljVG9QcmltID0gZ2V0TWV0aG9kKGlucHV0LCBUT19QUklNSVRJVkUpO1xuICB2YXIgcmVzdWx0O1xuICBpZiAoZXhvdGljVG9QcmltKSB7XG4gICAgaWYgKHByZWYgPT09IHVuZGVmaW5lZCkgcHJlZiA9ICdkZWZhdWx0JztcbiAgICByZXN1bHQgPSBjYWxsKGV4b3RpY1RvUHJpbSwgaW5wdXQsIHByZWYpO1xuICAgIGlmICghaXNPYmplY3QocmVzdWx0KSB8fCBpc1N5bWJvbChyZXN1bHQpKSByZXR1cm4gcmVzdWx0O1xuICAgIHRocm93ICRUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG4gIH1cbiAgaWYgKHByZWYgPT09IHVuZGVmaW5lZCkgcHJlZiA9ICdudW1iZXInO1xuICByZXR1cm4gb3JkaW5hcnlUb1ByaW1pdGl2ZShpbnB1dCwgcHJlZik7XG59O1xuIiwidmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGlzU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXN5bWJvbCcpO1xuXG4vLyBgVG9Qcm9wZXJ0eUtleWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJvcGVydHlrZXlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHZhciBrZXkgPSB0b1ByaW1pdGl2ZShhcmd1bWVudCwgJ3N0cmluZycpO1xuICByZXR1cm4gaXNTeW1ib2woa2V5KSA/IGtleSA6IGtleSArICcnO1xufTtcbiIsInZhciAkU3RyaW5nID0gU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB0cnkge1xuICAgIHJldHVybiAkU3RyaW5nKGFyZ3VtZW50KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gJ09iamVjdCc7XG4gIH1cbn07XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbnZhciBpZCA9IDA7XG52YXIgcG9zdGZpeCA9IE1hdGgucmFuZG9tKCk7XG52YXIgdG9TdHJpbmcgPSB1bmN1cnJ5VGhpcygxLjAudG9TdHJpbmcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuICdTeW1ib2woJyArIChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5KSArICcpXycgKyB0b1N0cmluZygrK2lkICsgcG9zdGZpeCwgMzYpO1xufTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIGVzLXgvbm8tc3ltYm9sIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nICovXG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTkFUSVZFX1NZTUJPTFxuICAmJiAhU3ltYm9sLnNoYW1cbiAgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJztcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIFY4IH4gQ2hyb21lIDM2LVxuLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzMzNFxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1kZWZpbmVwcm9wZXJ0eSAtLSByZXF1aXJlZCBmb3IgdGVzdGluZ1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgJ3Byb3RvdHlwZScsIHtcbiAgICB2YWx1ZTogNDIsXG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pLnByb3RvdHlwZSAhPSA0Mjtcbn0pO1xuIiwidmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHBhc3NlZCwgcmVxdWlyZWQpIHtcbiAgaWYgKHBhc3NlZCA8IHJlcXVpcmVkKSB0aHJvdyAkVHlwZUVycm9yKCdOb3QgZW5vdWdoIGFyZ3VtZW50cycpO1xuICByZXR1cm4gcGFzc2VkO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQ2FsbGFibGUoV2Vha01hcCkgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KFN0cmluZyhXZWFrTWFwKSk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIHVpZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91aWQnKTtcbnZhciBOQVRJVkVfU1lNQk9MID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3N5bWJvbC1jb25zdHJ1Y3Rvci1kZXRlY3Rpb24nKTtcbnZhciBVU0VfU1lNQk9MX0FTX1VJRCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy91c2Utc3ltYm9sLWFzLXVpZCcpO1xuXG52YXIgV2VsbEtub3duU3ltYm9sc1N0b3JlID0gc2hhcmVkKCd3a3MnKTtcbnZhciBTeW1ib2wgPSBnbG9iYWwuU3ltYm9sO1xudmFyIHN5bWJvbEZvciA9IFN5bWJvbCAmJiBTeW1ib2xbJ2ZvciddO1xudmFyIGNyZWF0ZVdlbGxLbm93blN5bWJvbCA9IFVTRV9TWU1CT0xfQVNfVUlEID8gU3ltYm9sIDogU3ltYm9sICYmIFN5bWJvbC53aXRob3V0U2V0dGVyIHx8IHVpZDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAoIWhhc093bihXZWxsS25vd25TeW1ib2xzU3RvcmUsIG5hbWUpIHx8ICEoTkFUSVZFX1NZTUJPTCB8fCB0eXBlb2YgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID09ICdzdHJpbmcnKSkge1xuICAgIHZhciBkZXNjcmlwdGlvbiA9ICdTeW1ib2wuJyArIG5hbWU7XG4gICAgaWYgKE5BVElWRV9TWU1CT0wgJiYgaGFzT3duKFN5bWJvbCwgbmFtZSkpIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IFN5bWJvbFtuYW1lXTtcbiAgICB9IGVsc2UgaWYgKFVTRV9TWU1CT0xfQVNfVUlEICYmIHN5bWJvbEZvcikge1xuICAgICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gc3ltYm9sRm9yKGRlc2NyaXB0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgV2VsbEtub3duU3ltYm9sc1N0b3JlW25hbWVdID0gY3JlYXRlV2VsbEtub3duU3ltYm9sKGRlc2NyaXB0aW9uKTtcbiAgICB9XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZGVmaW5lQnVpbHRJbkFjY2Vzc29yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbi1hY2Nlc3NvcicpO1xudmFyIHJlZ0V4cEZsYWdzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZ2V4cC1mbGFncycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG5cbi8vIGJhYmVsLW1pbmlmeSBhbmQgQ2xvc3VyZSBDb21waWxlciB0cmFuc3BpbGVzIFJlZ0V4cCgnLicsICdkJykgLT4gLy4vZCBhbmQgaXQgY2F1c2VzIFN5bnRheEVycm9yXG52YXIgUmVnRXhwID0gZ2xvYmFsLlJlZ0V4cDtcbnZhciBSZWdFeHBQcm90b3R5cGUgPSBSZWdFeHAucHJvdG90eXBlO1xuXG52YXIgRk9SQ0VEID0gREVTQ1JJUFRPUlMgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgSU5ESUNFU19TVVBQT1JUID0gdHJ1ZTtcbiAgdHJ5IHtcbiAgICBSZWdFeHAoJy4nLCAnZCcpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIElORElDRVNfU1VQUE9SVCA9IGZhbHNlO1xuICB9XG5cbiAgdmFyIE8gPSB7fTtcbiAgLy8gbW9kZXJuIFY4IGJ1Z1xuICB2YXIgY2FsbHMgPSAnJztcbiAgdmFyIGV4cGVjdGVkID0gSU5ESUNFU19TVVBQT1JUID8gJ2RnaW1zeScgOiAnZ2ltc3knO1xuXG4gIHZhciBhZGRHZXR0ZXIgPSBmdW5jdGlvbiAoa2V5LCBjaHIpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gc2FmZVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBrZXksIHsgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBjYWxscyArPSBjaHI7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IH0pO1xuICB9O1xuXG4gIHZhciBwYWlycyA9IHtcbiAgICBkb3RBbGw6ICdzJyxcbiAgICBnbG9iYWw6ICdnJyxcbiAgICBpZ25vcmVDYXNlOiAnaScsXG4gICAgbXVsdGlsaW5lOiAnbScsXG4gICAgc3RpY2t5OiAneSdcbiAgfTtcblxuICBpZiAoSU5ESUNFU19TVVBQT1JUKSBwYWlycy5oYXNJbmRpY2VzID0gJ2QnO1xuXG4gIGZvciAodmFyIGtleSBpbiBwYWlycykgYWRkR2V0dGVyKGtleSwgcGFpcnNba2V5XSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG4gIHZhciByZXN1bHQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFJlZ0V4cFByb3RvdHlwZSwgJ2ZsYWdzJykuZ2V0LmNhbGwoTyk7XG5cbiAgcmV0dXJuIHJlc3VsdCAhPT0gZXhwZWN0ZWQgfHwgY2FsbHMgIT09IGV4cGVjdGVkO1xufSk7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLmZsYWdzYCBnZXR0ZXJcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0LXJlZ2V4cC5wcm90b3R5cGUuZmxhZ3NcbmlmIChGT1JDRUQpIGRlZmluZUJ1aWx0SW5BY2Nlc3NvcihSZWdFeHBQcm90b3R5cGUsICdmbGFncycsIHtcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBnZXQ6IHJlZ0V4cEZsYWdzXG59KTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjbGVhckltbWVkaWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90YXNrJykuY2xlYXI7XG5cbi8vIGBjbGVhckltbWVkaWF0ZWAgbWV0aG9kXG4vLyBodHRwOi8vdzNjLmdpdGh1Yi5pby9zZXRJbW1lZGlhdGUvI3NpLWNsZWFySW1tZWRpYXRlXG4kKHsgZ2xvYmFsOiB0cnVlLCBiaW5kOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCBmb3JjZWQ6IGdsb2JhbC5jbGVhckltbWVkaWF0ZSAhPT0gY2xlYXJJbW1lZGlhdGUgfSwge1xuICBjbGVhckltbWVkaWF0ZTogY2xlYXJJbW1lZGlhdGVcbn0pO1xuIiwiLy8gVE9ETzogUmVtb3ZlIHRoaXMgbW9kdWxlIGZyb20gYGNvcmUtanNANGAgc2luY2UgaXQncyBzcGxpdCB0byBtb2R1bGVzIGxpc3RlZCBiZWxvd1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuY2xlYXItaW1tZWRpYXRlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5zZXQtaW1tZWRpYXRlJyk7XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgc2V0SW1tZWRpYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Rhc2snKS5zZXQ7XG5cbi8vIGBzZXRJbW1lZGlhdGVgIG1ldGhvZFxuLy8gaHR0cDovL3czYy5naXRodWIuaW8vc2V0SW1tZWRpYXRlLyNzaS1zZXRJbW1lZGlhdGVcbiQoeyBnbG9iYWw6IHRydWUsIGJpbmQ6IHRydWUsIGVudW1lcmFibGU6IHRydWUsIGZvcmNlZDogZ2xvYmFsLnNldEltbWVkaWF0ZSAhPT0gc2V0SW1tZWRpYXRlIH0sIHtcbiAgc2V0SW1tZWRpYXRlOiBzZXRJbW1lZGlhdGVcbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiaW1wb3J0IHsgcGhvdG9ncmFwaGVyRmFjdG9yeSB9IGZyb20gXCIuLi9mYWN0b3JpZXMvcGhvdG9ncmFwaGVyRmFjdG9yeVwiO1xyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXNwbGF5RGF0YShwaG90b2dyYXBoZXJzLCBpZCkge1xyXG4gICAgbGV0IHBob3RvZ3JhcGhlclNlbGVjdGVkID0gXCJcIjtcclxuXHJcbiAgICBwaG90b2dyYXBoZXJzLmZvckVhY2goKHBob3RvZ3JhcGhlcikgPT4ge1xyXG5cclxuICAgICAgICBpZiAocGhvdG9ncmFwaGVyLmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgIC8vIFRoZW4gd2UgYXJlIGdvaW5nIHVzZSB0aGUgUGhvdG9ncmFwaGVyRmFjdG9yeSB0byBzZXQgRE9NXHJcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JykgeyBjb25zb2xlLmxvZyhwaG90b2dyYXBoZXIpOyB9XHJcbiAgICAgICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlck1vZGVsID0gcGhvdG9ncmFwaGVyRmFjdG9yeShwaG90b2dyYXBoZXIpO1xyXG4gICAgICAgICAgICBwaG90b2dyYXBoZXJNb2RlbC5zZXRQaG90b2dyYXBoZXJIZWFkZXIoKTtcclxuICAgICAgICAgICAgcGhvdG9ncmFwaGVyTW9kZWwuc2V0U3RpY2t5QmFyUHJpY2UoKTtcclxuXHJcbiAgICAgICAgICAgIHBob3RvZ3JhcGhlclNlbGVjdGVkID0gcGhvdG9ncmFwaGVyXHJcbiAgICAgICAgICAgIC8vIEVuZCBvZiBQaG90b2dyYXBoZXJGYWN0b3J5IFdvcmtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIHJldHVybiAocGhvdG9ncmFwaGVyU2VsZWN0ZWQpOyAvLyBSZXR1cm4gdGhlIHBob3RvZ3JhcGhlclNob3cgYXQgdGhlIGVuZFxyXG5cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRpc3BsYXlEYXRhQWxsKHBob3RvZ3JhcGhlcnMsIHF1ZXJ5U2VsZWN0b3IpIHtcclxuXHJcbiAgICBwaG90b2dyYXBoZXJzLmZvckVhY2goKHBob3RvZ3JhcGhlcikgPT4ge1xyXG5cclxuICAgICAgICAvLyBUaGVuIHdlIGFyZSBnb2luZyB1c2UgdGhlIFBob3RvZ3JhcGhlckZhY3RvcnkgdG8gZ2VuZXJhdGUgRE9NXHJcbiAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVyc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5U2VsZWN0b3IpO1xyXG4gICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlck1vZGVsID0gcGhvdG9ncmFwaGVyRmFjdG9yeShwaG90b2dyYXBoZXIpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJDYXJkRE9NID0gcGhvdG9ncmFwaGVyTW9kZWwuZ2V0VXNlckNhcmRET00oKTtcclxuXHJcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7IGNvbnNvbGUubG9nKHBob3RvZ3JhcGhlcik7IH1cclxuICAgICAgICBpZiAodXNlckNhcmRET00pIHtcclxuICAgICAgICAgICAgcGhvdG9ncmFwaGVyc1NlY3Rpb24uYXBwZW5kQ2hpbGQodXNlckNhcmRET00pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBFbmQgb2YgUGhvdG9ncmFwaGVyRmFjdG9yeSBXb3JrXHJcblxyXG4gICAgfSk7XHJcblxyXG5cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgbWVkaWFGYWN0b3J5IH0gZnJvbSBcIi4uL2ZhY3Rvcmllcy9tZWRpYUZhY3RvcnlcIjtcclxuaW1wb3J0IHsgc2V0SW5uZXJIdG1sIH0gZnJvbSBcIi4uL3V0aWxzL2RvbVwiO1xyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXNwbGF5TWVkaWEobWVkaWFzLCBxdWVyeVNlbGVjdG9yLCBwaG90b2dyYXBoZXJJZCkge1xyXG4gICAgbGV0IHRvdGFsTGlrZXMgPSAwO1xyXG4gICAgbGV0IHNlbGVjdGVkTWVkaWEgPSBbXTtcclxuICAgIFxyXG4gICAgbWVkaWFzLmZvckVhY2goKG1lZGlhKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwaG90b2dyYXBoZXJJZCA9PSBtZWRpYS5waG90b2dyYXBoZXJJZCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7IGNvbnNvbGUubG9nKG1lZGlhKTsgfVxyXG4gICAgICAgICAgICBzZWxlY3RlZE1lZGlhLnB1c2gobWVkaWEpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhlbiB3ZSBhcmUgZ29pbmcgdXNlIHRoZSBNZWRpYUZhY3RvcnkgdG8gZ2VuZXJhdGUgRE9NXHJcbiAgICAgICAgICAgIGNvbnN0IG1lZGlhc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5U2VsZWN0b3IpO1xyXG4gICAgICAgICAgICBjb25zdCBtZWRpYU1vZGVsID0gbWVkaWFGYWN0b3J5KG1lZGlhKTtcclxuICAgICAgICAgICAgY29uc3QgbWVkaWFET00gPSBtZWRpYU1vZGVsLmdldE1lZGlhRE9NKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWVkaWFET00pIHtcclxuICAgICAgICAgICAgICAgIG1lZGlhc1NlY3Rpb24uYXBwZW5kQ2hpbGQobWVkaWFET00pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEVuZCBvZiBNZWRpYUZhY3RvcnkgV29ya1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgbWVkaWEgb2JqZWN0IGdvdCBMaWtlcyBwcm9wcmlldHkgdGhlblxyXG4gICAgICAgICAgICBpZiAobWVkaWEubGlrZXMpIHtcclxuICAgICAgICAgICAgICAgIHRvdGFsTGlrZXMgKz0gbWVkaWEubGlrZXM7IC8vIENvdW50IGFsbCBsaWtlc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiVGhlcmVzIGlzIG5vIGxpa2UgYW5kIHRvdGFsTGlrZXMsIGxvb2sgbWVkaWFGYWN0b3J5IHJldHVybmVkIGEgb2JqZWN0IHdpdGhvdXQgbGlrZXMgcHJvcHJpZXR5XCIpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgc2V0SW5uZXJIdG1sKFwiLnRvdGFsX2xpa2VzXCIsIHRvdGFsTGlrZXMpO1xyXG5cclxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JykgeyBjb25zb2xlLmxvZyhcIlRvdGFsIExpa2U6IFwiICsgdG90YWxMaWtlcyk7IH1cclxuXHJcbiAgICByZXR1cm4gc2VsZWN0ZWRNZWRpYTtcclxufVxyXG5cclxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gXCIuLi91dGlscy9kb21cIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtZWRpYUZhY3RvcnkoZGF0YSkge1xyXG4gICAgY29uc3QgeyBpZCwgcGhvdG9ncmFwaGVySWQsIHRpdGxlLCBpbWFnZSwgdmlkZW8sIGxpa2VzIH0gPSBkYXRhO1xyXG5cclxuICAgIGNvbnN0IG1vdmllID0gYGFzc2V0cy92aWRlby8ke3ZpZGVvfWA7XHJcbiAgICBjb25zdCBwaWN0dXJlID0gYGFzc2V0cy9pbWFnZXMvJHtpbWFnZX1gO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldE1lZGlhRE9NKCkge1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgRE9NIG9ubHkgaWYgd2UgZ290IGlkcyBhbmQgYSBQaWN0dXJlIG9yIGEgVmlkZW9cclxuICAgICAgICBjb25zdCBoYXNQaG90b2dyYXBoZXIgPSBpZCAmJiBwaG90b2dyYXBoZXJJZDtcclxuICAgICAgICBjb25zdCBoYXNDb250ZW50ID0gaW1hZ2UgfHwgdmlkZW9cclxuXHJcbiAgICAgICAgaWYgKGhhc1Bob3RvZ3JhcGhlciAmJiBoYXNDb250ZW50KSB7XHJcbiAgICAgICAgICAgIC8vIENSRUFURSBBIEFSVElDTEVcclxuICAgICAgICAgICAgY29uc3QgYXJ0aWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhcnRpY2xlXCIpO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibWVkaWFfY2FyZFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIEJ1aWxkIEEgSFJFRiBFTEVNRU5UXHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtFbGVtZW50ID0gYXJ0aWNsZS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgIGRvbS5idWlsZEVsZW1lbnQoXCJhXCIsIGAke2lkfWAsIFwiaWRcIilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgZG9tLnNldEFyaWFsTGFiZWwobGlua0VsZW1lbnQsIFwiTGlsYWMgYnJlYXN0ZWQgcm9sbGVyLCBjbG9zZXVwIHZpZXdcIikgLy8gU2V0IEFyaWVsTGFiZWwgdG8gQUhyZWZcclxuXHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBpbWFnZSBvciB2aWRlbyBleGlzdHNcclxuICAgICAgICAgICAgaWYgKGltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBkb20uaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQobGlua0VsZW1lbnQsIHBpY3R1cmUsIHRpdGxlKTsgLy8gSW5zZXJ0IHBpY3R1cmUgd2l0aCBBTFRcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodmlkZW8pIHtcclxuICAgICAgICAgICAgICAgIGRvbS5pbnNlcnRWaWRlb0luc2lkZUVsZW1lbnQobGlua0VsZW1lbnQsIG1vdmllLCBgTW92aWUgJHt2aWRlb31gKTsgLy8gSW5zZXJ0IFZpZGVvIHdpdGggQXJpZWwgTGFiZWxcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gR2VuZXJhdGUgRGV0YWlscyAodGl0bGUgKyBMaWtlcylcclxuICAgICAgICAgICAgaWYgKHRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGl0bGVfaDYgPSBgPGg2PiR7dGl0bGV9PC9oNj5gO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpa2VzX2g2ID0gYDxoNiBhcmlhLWxhYmVsPSdsaWtlcyc+MDwvaDY+YDtcclxuICAgICAgICAgICAgICAgIGlmIChsaWtlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpa2VzX2g2ID0gYDxoNiBhcmlhLWxhYmVsPSdsaWtlcyc+JHtsaWtlc308L2g2PmA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkb20uaW5zZXJ0SFRNTEFmdGVyRWxlbWVudChsaW5rRWxlbWVudCwgYDxkaXYgY2xhc3M9J2RldGFpbHMnPiR7dGl0bGVfaDZ9JHtsaWtlc19oNn08L2Rpdj5gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gUmV0dXJuIEFydGljbGVcclxuICAgICAgICAgICAgcmV0dXJuIGFydGljbGU7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyBwaG90b2dyYXBoZXJJZCwgcGljdHVyZSwgbW92aWUsIGdldE1lZGlhRE9NIH07XHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IGJ1aWxkRWxlbWVudCwgaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQsIHNldElubmVySHRtbCwgc2V0QXJpYWxMYWJlbCB9IGZyb20gXCIuLi91dGlscy9kb21cIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBwaG90b2dyYXBoZXJGYWN0b3J5KGRhdGEpIHtcclxuICAgIGNvbnN0IHsgbmFtZSwgaWQsIGNpdHksIGNvdW50cnksIHRhZ2xpbmUsIHBvcnRyYWl0LCBwcmljZSB9ID0gZGF0YTtcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIGNvbnN0IHBpY3R1cmUgPSBgYXNzZXRzL2ltYWdlcy8ke3BvcnRyYWl0fWA7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VXNlckNhcmRET00oKSB7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBET00gb25seSBpZiB3ZSBnb3QgYSBwaWN0dXJlIGEgaWQgYW5kIGEgbmFtZVxyXG4gICAgICAgIGlmIChuYW1lICYmIGlkICYmIHBvcnRyYWl0KSB7XHJcbiAgICAgICAgICAgIC8vIEJVSUxEIEEgQVJUSUNMRSBcclxuICAgICAgICAgICAgY29uc3QgYXJ0aWNsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhcnRpY2xlXCIpO1xyXG4gICAgICAgICAgICBhcnRpY2xlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicGhvdG9ncmFwaGVyX2NhcmRcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgRHluYW1pcXVlIExJTksgd2l0aCBQaWN0dXJlXHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmtFbGVtZW50ID0gYXJ0aWNsZS5hcHBlbmRDaGlsZChcclxuICAgICAgICAgICAgICAgIGJ1aWxkRWxlbWVudChcImFcIiwgYHBob3RvZ3JhcGhlci5odG1sP2lkPSR7aWR9YCwgXCJocmVmXCIpIC8vIEJ1aWxkIEFIcmVmXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHNldEFyaWFsTGFiZWwobGlua0VsZW1lbnQsIGBMaW5rIHRvICR7bmFtZX1gKTsgLy8gU2V0IEFyaWVsTGFiZWwgdG8gQUhyZWZcclxuICAgICAgICAgICAgaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQobGlua0VsZW1lbnQsIHBpY3R1cmUsIG5hbWUpO1xyXG4gICAgICAgICAgICAvLyBFTkQgQ3JlYXRlIER5bmFtaXF1ZSBMSU5LIHdpdGggUGljdHVyZVxyXG5cclxuICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoMlwiLCBuYW1lKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2l0eSAmJiBjb3VudHJ5KSB7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLmFwcGVuZENoaWxkKGJ1aWxkRWxlbWVudChcImgzXCIsIGAke2NpdHl9LCAke2NvdW50cnl9YCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0YWdsaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLmFwcGVuZENoaWxkKGJ1aWxkRWxlbWVudChcImg0XCIsIHRhZ2xpbmUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJpY2UpIHtcclxuICAgICAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDVcIiwgYCR7cHJpY2V94oKsL2pvdXJgKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJFVFVSTiBBIEFSVElDTEUgXHJcbiAgICAgICAgICAgIHJldHVybiBhcnRpY2xlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRQaG90b2dyYXBoZXJIZWFkZXIoKSB7XHJcbiAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGgxXCIsIG5hbWUpO1xyXG4gICAgICAgIGlmIChjaXR5ICYmIGNvdW50cnkpIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGgyXCIsIGAke2NpdHl9LCAke2NvdW50cnl9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDJcIiwgXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoM1wiLCB0YWdsaW5lKTtcclxuXHJcbiAgICAgICAgLyoqIFdFIFVTRSBhIGRpZmZlcmVudCBtZXRob2QgdGhhdCBpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudCgpIHNpbmNlIHBpY3R1cmUgaXMgYWxyZWFkeSBpbiB0aGUgRE9NICovXHJcbiAgICAgICAgY29uc3QgaW1nUHJvZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGhvdG9ncmFwaF9oZWFkZXIgaW1nXCIpO1xyXG4gICAgICAgIGltZ1Byb2ZpbGUuc2V0QXR0cmlidXRlKFwic3JjXCIsIHBpY3R1cmUpO1xyXG4gICAgICAgIGltZ1Byb2ZpbGUuc2V0QXR0cmlidXRlKFwiYWx0XCIsIG5hbWUpO1xyXG4gICAgICAgIC8qKiAqL1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldFN0aWNreUJhclByaWNlKCkge1xyXG4gICAgICAgIGlmIChwcmljZSkge1xyXG4gICAgICAgICAgICBzZXRJbm5lckh0bWwoXCIucHJpY2VfcmF0ZV9kYWlseVwiLCBgJHtwcmljZX0g4oKsIC8gam91cmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnByaWNlX3JhdGVfZGFpbHlcIiwgXCJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7IG5hbWUsIHBpY3R1cmUsIGdldFVzZXJDYXJkRE9NLCBzZXRQaG90b2dyYXBoZXJIZWFkZXIsIHNldFN0aWNreUJhclByaWNlIH07XHJcbn1cclxuIiwiaW1wb3J0IFwiY29yZS1qcy9zdGFibGVcIjtcclxuaW1wb3J0IFwicmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lXCI7XHJcblxyXG5pbXBvcnQgJy4uLy4uL3Njc3MvbWFpbi5zY3NzJztcclxuaW1wb3J0IHsgZ2V0UGhvdG9ncmFwaGVycywgZ2V0TWVkaWFzIH0gZnJvbSAnLi4vdXRpbHMvZmV0Y2gnO1xyXG5pbXBvcnQgeyBkaXNwbGF5RGF0YSB9IGZyb20gJy4uL2RhdGEvZGlzcGxheURhdGEnO1xyXG5pbXBvcnQgeyBkaXNwbGF5TWVkaWEgfSBmcm9tICcuLi9kYXRhL2Rpc3BsYXlNZWRpYSc7XHJcbmltcG9ydCB7IGdldFVybFBhcmFtZXRlciB9IGZyb20gJy4uL3V0aWxzL2dldFVybFBhcmFtZXRlcic7XHJcbmltcG9ydCB7IHNvcnRCeUxpa2VzIH0gZnJvbSAnLi4vdXRpbHMvc29ydEJ5JztcclxuaW1wb3J0IHsgc2VsZWN0RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vdXRpbHMvc2VsZWN0RmlsdGVyJztcclxuaW1wb3J0IHsgbW9kYWxNYXN0ZXIgfSBmcm9tICcuLi91dGlscy9tb2RhbE1hc3Rlcic7XHJcblxyXG5cclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBpbml0UHJvZmlsZShpZFVSTCkge1xyXG4gICAgLy8gVHJ5IHRvIGdldCBkYXRhIGZyb20gcGhvdG9ncmFwaGVycyBpZiBlcnJvciB0aGVuIHJlZGlyZWN0IHRvIDQwNCBwYWdlXHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIFNFVCBQaG90b2dyYXBoZXIgUHJvZmlsZSBEQVRBXHJcbiAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVycyA9IGF3YWl0IGdldFBob3RvZ3JhcGhlcnMoKTtcclxuICAgICAgICAvLyBSZXR1cm4gdGhlIHBob3RvZ3JhcGhlciBEaXNwbGF5XHJcbiAgICAgICAgY29uc3QgcGhvdG9ncmFwaGVyU2VsZWN0ZWQgPSBhd2FpdCBkaXNwbGF5RGF0YShwaG90b2dyYXBoZXJzLCBpZFVSTCk7XHJcbiAgICAgICAgLy8gRU5EIFNFVCBQaG90b2dyYXBoZXIgUHJvZmlsZSBEYXRhXHJcblxyXG4gICAgICAgIGlmIChwaG90b2dyYXBoZXJTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlY3Rpb24gcHJvZmlsZSBpbml0acOpIGF2ZWMgc3VjY8OocyBkZXB1aXMgaW5pdFByb2ZpbGUoKVwiKTtcclxuICAgICAgICAgICAgaW5pdENvbnRhY3RGb3JtKHBob3RvZ3JhcGhlclNlbGVjdGVkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBubyBzZWxlY3RlZCBwaG90b2dyYXBoZXJcIik7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnNDA0Lmh0bWwnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgICAgICAvLyBJZiBpdCdzIGEgZmFpbCB0aGVuIHdlIHJlZGlyZWN0IHRvIDQwNCBFcnJvciBQYWdlIHNpbmNlICBpdCdzIHRoZSBtaW5pbWFsIGZ1bmN0aW9uYWxpdHlcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiaW5pdFByb2ZpbGUoKSBmYWlsZWQgcmVkaXJlY3QgdG8gNDA0IHBhZ2VcIik7XHJcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICc0MDQuaHRtbCc7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBpbml0Q29udGFjdEZvcm0ocGhvdG9ncmFwaGVyU2VsZWN0ZWQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgY29udGFjdEZvcm1Nb2RhbCA9IG1vZGFsTWFzdGVyKFwiYm9keVwiLCBcImhlYWRlclwiLCBcIm1haW5cIiwgXCJjb250YWN0X21vZGFsXCIpOyAvLyBDcmVhdGUgYSBNb2RlbCBNYXN0ZXJcclxuICAgICAgICBjb25zdCBtb2RhbFBhZ2UgPSBjb250YWN0Rm9ybU1vZGFsLm1vZGFsUGFnZTsgLy8gR2V0IG1vZGVsUGFnZSBPYmplY3RcclxuXHJcbiAgICAgICAgY29udGFjdEZvcm1Nb2RhbC5hZGRDb250YWN0Rm9ybUxpc3RlbmVyKG1vZGFsUGFnZSk7IC8vIEFkZCBzcGVjaWZpYyBsaXN0ZW5lciB0byBDb250YWN0IEZvcm0gTW9kYWxcclxuXHJcbiAgICAgICAgY29uc3QgdGl0bGVNb2RhbCA9IHBob3RvZ3JhcGhlclNlbGVjdGVkLm5hbWU7IC8vIEJ1aWxkIHRoZSB0aXRsZSBNb2RhbFxyXG4gICAgICAgIGNvbnRhY3RGb3JtTW9kYWwuc2V0VGl0bGVNb2RhbChtb2RhbFBhZ2UsIFwiI2RpYWxvZ1RpdGxlXCIsIHRpdGxlTW9kYWwpOyAgLy8gU2V0IHRoZSB0aXRsZSBNb2RhbFxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZvcm11bGFpcmUgY29udGFjdCBpbml0acOpIGF2ZWMgc3VjY8OocyBkZXB1aXMgaW5pdENvbnRhY3RGb3JtKClcIik7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgLy8gSWYgaXQncyBhIGZhaWwgdGhlbiB3ZSByZWRpcmVjdCB0byA0MDQgRXJyb3IgUGFnZSBzaW5jZSAgaXQncyB0aGUgbWluaW1hbCBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImluaXRDb250YWN0Rm9ybSgpIGZhaWxlZCByZWRpcmVjdCB0byA0MDQgcGFnZVwiKTtcclxuICAgICAgICBsb2NhdGlvbi5ocmVmID0gJzQwNC5odG1sJztcclxuICAgIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gaW5pdExpZ2h0Ym94KHNlbGVjdGVkTWVkaWFzKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGxpZ2h0Qm94ID0gbW9kYWxNYXN0ZXIoXCJib2R5XCIsIFwiaGVhZGVyXCIsIFwibWFpblwiLCBcImxpZ2h0Ym94X21vZGFsXCIpOyAvLyBDcmVhdGUgYSBNb2RlbCBNYXN0ZXJcclxuICAgICAgICBjb25zdCBtb2RhbFBhZ2UgPSBsaWdodEJveC5tb2RhbFBhZ2U7IC8vIEdldCBtb2RlbFBhZ2UgT2JqZWN0XHJcblxyXG4gICAgICAgIC8vIFRoaXMgYWRkIGxpc3RlbmVyIGFib3V0IGxpZ2h0Ym94IG1vZGFsIG9uIGFsbCBsaW5rIHdpdGggTWVkaWEgRGlzcGxheWVkIGF0IHBob3RvZ3JhcGhlciBwYWdlXHJcbiAgICAgICAgbGlnaHRCb3guYWRkTGlnaHRib3hMaXN0ZW5lcihtb2RhbFBhZ2UsIFwiLm1lZGlhX3NlY3Rpb24gYVwiLCBzZWxlY3RlZE1lZGlhcyk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUG9wdXAgTGlnaHRCb3ggaW5pdGnDqSBhdmVjIHN1Y2PDqHMgZGVwdWlzIGluaXRMaWdodEJveCgpXCIpXHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcblxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRNZWRpYShpZFVSTCwgc29ydEJ5KSB7XHJcbiAgICAvLyBUcnkgdG8gZ2V0IGRhdGEgJiBidWlsZCBzZWN0aW9uIG1lZGlhIGlmIGVycm9yIHRoZW4gcmVkaXJlY3QgdG8gNDA0IHBhZ2VcclxuICAgIHRyeSB7XHJcblxyXG4gICAgICAgIC8vIEJ1aWxkIE1lZGlhcyBcclxuICAgICAgICBjb25zdCBtZWRpYXMgPSBhd2FpdCBnZXRNZWRpYXMoKTtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZE1lZGlhcyA9IGF3YWl0IGRpc3BsYXlNZWRpYShtZWRpYXMuc29ydChzb3J0QnkpLCBcIi5tZWRpYV9zZWN0aW9uXCIsIGlkVVJMKTsgLy8gU29ydEJ5IG11c3QgYmUgYSBmdW5jdGlvbiBvZiBzb3J0XHJcbiAgICAgICAgLy8gRW5kIGJ1aWxkIE1lZGlhcyBcclxuICAgICAgICBjb25zb2xlLmxvZyhcIlNlY3Rpb24gbcOpZGlhIGluaXRpw6kgYXZlYyBzdWNjw6hzIGRlcHVpcyBpbml0TWVkaWEoKVwiKTtcclxuXHJcbiAgICAgICAgaW5pdExpZ2h0Ym94KHNlbGVjdGVkTWVkaWFzKTsgIC8vIEluaXRpYWxpemUgTGlnaHRCb3ggTW9kYWwgd2l0aCBzZWxlY3RlZCBtZWRpYXNcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXRNYWluKCkge1xyXG4gICAgLy8gV2UgV2FpdCBmb3IgZ2V0VXJsUGFyYW1ldGVyKCkgdG8gYmUgY29tcGxldGUgdGhlbiB3ZSBydW4gdGFza3MgZm9yIGdlbmVyYXRlIHBhZ2VcclxuICAgIGNvbnN0IGlkVVJMID0gYXdhaXQgZ2V0VXJsUGFyYW1ldGVyKFwiaWRcIik7XHJcbiAgICBpbml0UHJvZmlsZShpZFVSTCk7IC8vIEluaXQgUHJvZmlsZSBzZWN0aW9uIFxyXG4gICAgYXdhaXQgaW5pdE1lZGlhKGlkVVJMLCBzb3J0QnlMaWtlcyk7IC8vIEdldCBNZWRpYXMgJiBJbml0IE1lZGlhIFNlY3Rpb24gYnkgTGlrZXMgXCJpbXBvcnQgeyBzb3J0QnlMaWtlcyB9IGZyb20gJy4uL3V0aWxzL3NvcnRCeSc7XHJcbiAgICBzZWxlY3RGaWx0ZXJDb21wb25lbnQoaWRVUkwpOyAvLyBJbml0aWFsaXplIFNlbGVjdCBmaWx0ZXIgY29tcG9uZW50IFxyXG59XHJcblxyXG5cclxuaW5pdE1haW4oKTsgXHJcbiIsIi8vIEZ1bmN0aW9uIGZvciBidWlsZCBET01cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KGVsZW1lbnQsIHBpY3R1cmUsIGFsdCkge1xyXG4gICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgYDxpbWcgc3JjPVwiJHtwaWN0dXJlfVwiIGFsdD1cIiR7YWx0fVwiPmApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0VmlkZW9JbnNpZGVFbGVtZW50KGVsZW1lbnQsIHZpZGVvLCBhcmlhTGFiZWwpIHtcclxuXHJcbiAgICBpZiAoYXJpYUxhYmVsKSB7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIixcclxuICAgICAgICAgICAgYDx2aWRlbyBzcmM9XCIke3ZpZGVvfVwiIGFyaWEtbGFiZWw9XCIke2FyaWFMYWJlbH1cIj5gKTtcclxuXHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCAnPHZpZGVvIHNyYz1cIicgKyB2aWRlbyArICdcIj4nKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRIVE1MQWZ0ZXJFbGVtZW50KGVsZW1lbnQsIGh0bWwpIHtcclxuICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJlbmRcIiwgaHRtbCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBidWlsZEVsZW1lbnQoYmFsaXNlLCB2YWx1ZSwgYXR0cmlidXRlKSB7XHJcbiAgICAvLyBDcmVhdGUgYmFsaXNlXHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChiYWxpc2UpO1xyXG5cclxuICAgIC8vIFNldCBBdHRyaWJ1dGUgb3IgVGV4dENvbnRlbmVkIGRlcGVuZCBvZiBiYWxpc2VcclxuICAgIHN3aXRjaCAoYmFsaXNlKSB7XHJcbiAgICAgICAgY2FzZSBcImFcIjpcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJpbWdcIjpcclxuICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFyaWFsTGFiZWwoZWxlbWVudCwgYXJpYWxhYmVsKSB7XHJcbiAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgYXJpYWxhYmVsKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldElubmVySHRtbChxdWVyeVNlbGVjdG9yLCB0ZXh0ZSkge1xyXG4gICAgY29uc3QgdGV4dGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeVNlbGVjdG9yKTtcclxuICAgIHRleHRlRWxlbWVudC5pbm5lckhUTUwgPSB0ZXh0ZTtcclxufVxyXG4vLyBFbmQgRnVuY3Rpb24gZm9yIGJ1aWxkIERPTSIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBmZXRjaEpTT04odXJsLCB0eXBlKSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7IC8vIFdhaXQgZm9yIHRoZSBBc3luYyBGZWN0aCBGdW5jdGlvblxyXG5cclxuICAgIC8vIGZldGNoIHJldHVybnMgYW4gb2JqZWN0IHdpdGggYSByZXNwb25zZSBwcm9wZXJ0eSB3aGljaCBpZiBzZXQgdG8gZmFsc2UgbWVhbnMgdGhhdCB0aGUgY29ubmVjdGlvbiBpcyBub3QgZ29vZCBhbmQgc28gd2Ugc3RvcCB0aGUgZnVuY3Rpb24gXHJcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7IHRocm93IG5ldyBFcnJvcihcIlRocm93biBmcm9tIGZldGNoSlNPTigpXCIpOyB9XHJcblxyXG4gICAgbGV0IGpzb25SZXNwb25zZSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTsgLy8gcGFyc2luZyBKU09OXHJcbiAgICByZXR1cm4ganNvblJlc3BvbnNlW3R5cGVdOyAvLyBHZXQgZGF0YSBmcm9tIHRoZSBBcnJheSB0aGF0IHdlIHdhbnRcclxuXHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UGhvdG9ncmFwaGVycygpIHtcclxuICAgIGNvbnN0IHVybCA9IFwiLi4vZGF0YS9waG90b2dyYXBoZXJzLmpzb25cIjsgLy8gRGF0YSBzb3VyY2UgLkpTT05cclxuICAgIGNvbnN0IHBob3RvZ3JhcGhlcnMgPSBhd2FpdCBmZXRjaEpTT04odXJsLCBcInBob3RvZ3JhcGhlcnNcIik7IC8vIHVzZSBmZXRjaEpTT04gZnVuY3Rpb24gZnJvbSB1dGlscy9mZXRjaC5qc1xyXG4gICAgcmV0dXJuIHBob3RvZ3JhcGhlcnM7IC8vIFJldHVybiBkYXRhIG9mIFBob3RvR3JhcGhlcnNcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldE1lZGlhcygpIHtcclxuICAgIGNvbnN0IHVybCA9IFwiLi4vZGF0YS9waG90b2dyYXBoZXJzLmpzb25cIjsgLy8gRGF0YSBzb3VyY2UgLkpTT05cclxuICAgIGNvbnN0IG1lZGlhcyA9IGF3YWl0IGZldGNoSlNPTih1cmwsIFwibWVkaWFcIik7IC8vIHVzZSBmZXRjaEpTT04gZnVuY3Rpb24gZnJvbSB1dGlscy9mZXRjaC5qc1xyXG4gICAgcmV0dXJuIG1lZGlhczsgLy8gUmV0dXJuIGRhdGEgb2YgTWVkaWFcclxufVxyXG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXJsUGFyYW1ldGVyKHBhcmFtZXRlcikge1xyXG4gICAgY29uc3QgZnVsbFVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmOyAvLyBHZXQgZnVsbCB1cmxcclxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZnVsbFVybCk7IC8vIENyZWF0ZSBVUkwgT2JqZWN0XHJcbiAgICBjb25zdCBwYXJhbWV0ZXJWYWx1ZSA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KHBhcmFtZXRlcik7IC8vIGdldCBwYXJhbWV0ZXIgdmFsdWVcclxuICAgIHJldHVybiBwYXJhbWV0ZXJWYWx1ZTtcclxufSIsImltcG9ydCB7IHNldElubmVySHRtbCB9IGZyb20gJy4vZG9tJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb2RhbE1hc3Rlcihib2R5VGFnLCBoZWFkZXJUYWcsIG1haW5UYWcsIG1vZGFsSUQpIHtcclxuXHJcblxyXG4gICAgLyoqIENSRUFURSBUV08gT0JKRUNUIFdJVEggQUxMIFBST1BSSUVUWSBGT1IgTU9ERUxNQVNURVIgTkVFRCAqL1xyXG4gICAgbGV0IGJhY2tncm91bmRQYWdlID0ge1xyXG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIGJhY2tncm91bmQgb2JqZWN0IChiZWhpbmQgbW9kYWwpXHJcbiAgICAgICAgYm9keUhUTUw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYm9keVRhZyksIC8vIFdlIHdhbnQgdGhlIDxib2R5PiBzZWxlY3RlZFxyXG4gICAgICAgIGhlYWRlckhUTUw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGVhZGVyVGFnKSwgLy8gV2Ugd2FudCB0aGUgPGhlYWRlcj4gc2VsZWN0ZWRcclxuICAgICAgICBtYWluSFRNTDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluVGFnKSwgLy8gV2Ugd2FudCB0aGUgPG1haW4+IHNlbGVjdGVkXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1vZGFsUGFnZSA9IHtcclxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBtb2RhbCBPYmplY3QgKGNhbGwgTW9kYWxQYWdlKVxyXG4gICAgICAgIG1vZGFsSFRNTDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW9kYWxJRCksXHJcbiAgICAgICAgbW9kYWxJRDogbW9kYWxJRCxcclxuICAgICAgICB2aXNpYmxlOiAwLFxyXG4gICAgfVxyXG4gICAgLyoqIEVORCAgKi9cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ29udGFjdEZvcm1MaXN0ZW5lcihtb2RhbFBhZ2UpIHtcclxuICAgICAgICAvLyBUaGlzIGFkZCBsaXN0ZW5lciBhYm91dCBvbmx5IGNvbnRhY3QgZm9ybSBtb2RhbFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3Blbk1vZGFsXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9wZW5Nb2RhbChtb2RhbFBhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke21vZGFsUGFnZS5tb2RhbElEfSAjY2xvc2VNb2RhbGApLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTW9kYWwobW9kYWxQYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhY3RfYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlKG1vZGFsUGFnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkTGlnaHRib3hMaXN0ZW5lcihtb2RhbFBhZ2UsIHF1ZXJ5U2VsZWN0b3JSZXF1ZXN0LCBtZWRpYXMpIHtcclxuICAgICAgICAvLyBUaGlzIGFkZCBsaXN0ZW5lciBhYm91dCBsaWdodGJveCBtb2RhbFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnlTZWxlY3RvclJlcXVlc3QpLmZvckVhY2gobGluayA9PlxyXG4gICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkTGlnaHRib3hDb250ZW50KG1vZGFsUGFnZSwgbGluaywgbWVkaWFzKTtcclxuICAgICAgICAgICAgICAgIG9wZW5Nb2RhbChtb2RhbFBhZ2UpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHttb2RhbFBhZ2UubW9kYWxJRH0gI2Nsb3NlTW9kYWxgKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjbG9zZU1vZGFsKG1vZGFsUGFnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZExpZ2h0Ym94Q29udGVudChtb2RhbFBhZ2UsIGxpbmssIG1lZGlhcykge1xyXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIl9fX0xJR0hUQk9YX19fXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtb2RhbFBhZ2UpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsaW5rLmlkKTsgLy8gRXZlbnQgaGFzIGJlIGZpcmVkIGJ5IHRoaXMgTElOSyAod2hlcmUgTGluayBJRCA9IE1lZGlhIElEKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZWRpYXMpOyAvLyBNZWRpYXMgdGhhdCBhcmUgZGlzcGxheWVkIGluIG9yZGVyIHRvIHRoZSBtYWluIHBhZ2VcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1lZGlhcy5mb3JFYWNoKG1lZGlhID0+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lZGlhKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJfX19fXCIpO1xyXG4gICAgICAgICAgICAvLyBEbyB0aGUgc3R1ZmYgYWJvdXQgU2V0IHRoZSBQYWdlIGludG8gTGlnaHRCb3ggYW5kIGxlZnQgJiByaWdodCBhcnJvdy4gdGhlbiBkb25lIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRLZXlib2FyZExpc3RlbmVyKG1vZGFsUGFnZSkge1xyXG4gICAgICAgIGlmIChtb2RhbFBhZ2UudmlzaWJsZSA9PT0gMSkgeyAvLyBJZiBtb2RhbFBhZ2UgaXMgdmlzaWJsZSBhdCB0aGUgc2NyZWVuXHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGFkZCBsaXN0ZW5lciBmb3IgS2V5Ym9hcmQgYW5kIGNoZWNrIGlmIGEga2V5IGlzIHByZXNzZWRcclxuICAgICAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwobW9kYWxQYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRUaXRsZU1vZGFsKG1vZGFsUGFnZSwgdGFyZ2V0U2VsZWN0b3IsIHRpdGxlTW9kYWwpIHtcclxuICAgICAgICByZXR1cm4gc2V0SW5uZXJIdG1sKGAjJHttb2RhbFBhZ2UubW9kYWxJRH0gJHt0YXJnZXRTZWxlY3Rvcn1gLCB0aXRsZU1vZGFsKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gZWZmZWN0QW5pbWF0aW9uKGhpZGVjbGFzcywgc2hvd2NsYXNzLCBtb2RhbFBhZ2UpIHtcclxuICAgICAgICBpZiAobW9kYWxQYWdlLnZpc2libGUgPT09IDApIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFBhZ2UubWFpbkhUTUwuY2xhc3NMaXN0LnJlbW92ZShzaG93Y2xhc3MpO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUGFnZS5oZWFkZXJIVE1MLmNsYXNzTGlzdC5yZW1vdmUoc2hvd2NsYXNzKTtcclxuICAgICAgICAgICAgbW9kYWxQYWdlLm1vZGFsSFRNTC5jbGFzc0xpc3QucmVtb3ZlKGhpZGVjbGFzcyk7XHJcblxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUGFnZS5tYWluSFRNTC5jbGFzc0xpc3QuYWRkKGhpZGVjbGFzcyk7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRQYWdlLmhlYWRlckhUTUwuY2xhc3NMaXN0LmFkZChoaWRlY2xhc3MpO1xyXG4gICAgICAgICAgICBtb2RhbFBhZ2UubW9kYWxIVE1MLmNsYXNzTGlzdC5hZGQoc2hvd2NsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS52aXNpYmxlID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbW9kYWxQYWdlLm1vZGFsSFRNTC5jbGFzc0xpc3QucmVtb3ZlKHNob3djbGFzcyk7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRQYWdlLm1haW5IVE1MLmNsYXNzTGlzdC5yZW1vdmUoaGlkZWNsYXNzKTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFBhZ2UuaGVhZGVySFRNTC5jbGFzc0xpc3QucmVtb3ZlKGhpZGVjbGFzcyk7XHJcblxyXG4gICAgICAgICAgICBtb2RhbFBhZ2UubW9kYWxIVE1MLmNsYXNzTGlzdC5hZGQoaGlkZWNsYXNzKTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFBhZ2UubWFpbkhUTUwuY2xhc3NMaXN0LmFkZChzaG93Y2xhc3MpO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUGFnZS5oZWFkZXJIVE1MLmNsYXNzTGlzdC5hZGQoc2hvd2NsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS52aXNpYmxlID0gMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1vZGFsUGFnZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Nb2RhbChtb2RhbFBhZ2UpIHtcclxuICAgICAgICBlZmZlY3RBbmltYXRpb24oXCJoaWRlX2NvbnRlbnRcIiwgXCJzaG93X2NvbnRlbnRcIiwgbW9kYWxQYWdlKTsgLy8gRWZmZWN0IE1vZGFsIENTU1xyXG4gICAgICAgIG1vZGFsUGFnZS5tb2RhbEhUTUwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjsgLy8gRGlzcGxheSB0aGUgTW9kYWwgYXQgdGhlIHNjcmVlblxyXG4gICAgICAgIGFkZEtleWJvYXJkTGlzdGVuZXIobW9kYWxQYWdlKTsgLy8gQWRkIEtleWJvYXJkIEV2ZW50c1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke21vZGFsUGFnZS5tb2RhbElEfSAjY2xvc2VNb2RhbGApLmZvY3VzKCk7IC8vIEZvY3VzIHRoZSBDbG9zZSBNb2RhbCBcclxuXHJcbiAgICAgICAgLy8gRGlzYWJsZSBjbGljayBvciBmb2N1cyB3aXRoIGluZXJ0IHRvIHRoZSBCYWNrZ3JvdW5kUGFnZSBcclxuICAgICAgICBiYWNrZ3JvdW5kUGFnZS5oZWFkZXJIVE1MLnNldEF0dHJpYnV0ZShcImluZXJ0XCIsIFwiXCIpO1xyXG4gICAgICAgIGJhY2tncm91bmRQYWdlLm1haW5IVE1MLnNldEF0dHJpYnV0ZShcImluZXJ0XCIsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwobW9kYWxQYWdlKSB7XHJcbiAgICAgICAgZWZmZWN0QW5pbWF0aW9uKFwiaGlkZV9jb250ZW50XCIsIFwic2hvd19jb250ZW50XCIsIG1vZGFsUGFnZSk7IC8vIEVmZmVjdCBNb2RhbCBDU1NcclxuICAgICAgICBtb2RhbFBhZ2UubW9kYWxIVE1MLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjsgLy8gSGlkZSBhdCB0aGUgc2NyZWVuIG1vZGFsXHJcblxyXG4gICAgICAgIC8vIEFsbG93IGNsaWNrIG9yIGZvY3VzIHdpdGggaW5lcnQgdG8gdGhlIEJhY2tncm91bmRQYWdlIFxyXG4gICAgICAgIGJhY2tncm91bmRQYWdlLm1haW5IVE1MLnJlbW92ZUF0dHJpYnV0ZShcImluZXJ0XCIpO1xyXG4gICAgICAgIGJhY2tncm91bmRQYWdlLmhlYWRlckhUTUwucmVtb3ZlQXR0cmlidXRlKFwiaW5lcnRcIik7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kTWVzc2FnZShtb2RhbFBhZ2UpIHtcclxuICAgICAgICBjb25zdCBhbGxJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHttb2RhbFBhZ2UubW9kYWxJRH0gaW5wdXRgKTtcclxuICAgICAgICBjb25zdCBhbGxUZXh0QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke21vZGFsUGFnZS5tb2RhbElEfSB0ZXh0YXJlYWApO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIl9fX19TZW5kIE1lc3NhZ2VfX19fX1wiKTtcclxuXHJcbiAgICAgICAgbGV0IGZ1bGxtZXNzYWdlID0gXCJcIjtcclxuXHJcbiAgICAgICAgYWxsSW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xyXG4gICAgICAgICAgICBmdWxsbWVzc2FnZSArPSAnXFxuJyArIGlucHV0LmlkICsgXCI6IFwiICsgaW5wdXQudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGFsbFRleHRBcmVhLmZvckVhY2godGV4dGFyZWEgPT4ge1xyXG4gICAgICAgICAgICBmdWxsbWVzc2FnZSArPSAnXFxuJyArIHRleHRhcmVhLmlkICsgXCI6IFwiICsgdGV4dGFyZWEudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChmdWxsbWVzc2FnZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmdWxsbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBNZXNzYWdlIEVudm95ZXIgISAke2Z1bGxtZXNzYWdlfWApO1xyXG4gICAgICAgICAgICBjbG9zZU1vZGFsKG1vZGFsUGFnZSk7IC8vIENsb3NlIG1vZGFsIGFmdGVyIG1lc3NhZ2Ugc2VuZFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNvbWV0aGluZyB3cm9uZyBtZXNzYWdlIG5vIHNlbmQgYmVjYXVzZSBmdWxsbWVzc2FnZSBpcyBlbXB0eSBvciBkb24ndCBleGlzdHMgZnJvbSBzZW5kTWVzc2FnZSgpXCIpO1xyXG4gICAgICAgICAgICBhbGVydChcIkVycmV1ciBtZXNzYWdlIG5vbiBlbnZveWVyIDooXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBiYWNrZ3JvdW5kUGFnZSwgbW9kYWxQYWdlLFxyXG4gICAgICAgIGFkZENvbnRhY3RGb3JtTGlzdGVuZXIsIGFkZExpZ2h0Ym94TGlzdGVuZXIsIGFkZEtleWJvYXJkTGlzdGVuZXIsXHJcbiAgICAgICAgb3Blbk1vZGFsLCBjbG9zZU1vZGFsLFxyXG4gICAgICAgIHNldFRpdGxlTW9kYWwsXHJcbiAgICAgICAgc2VuZE1lc3NhZ2VcclxuICAgIH1cclxufSIsImltcG9ydCB7IHNvcnRCeUxpa2VzLCBzb3J0QnlEYXRlLCBzb3J0QnlUaXRsZSB9IGZyb20gJy4uL3V0aWxzL3NvcnRCeSc7XHJcbmltcG9ydCAqIGFzIHBob3RvZ3JhcGhlciBmcm9tICcuLi9wYWdlcy9waG90b2dyYXBoZXInO1xyXG5cclxuLyoqIEdFTkVSQVRFIEVWRU5UIEZPUiBTRUxFQ1QgRklMVEVSIENPTVBPTkVOVFMgQU5EIEJFSEFWSU9SICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RGaWx0ZXJDb21wb25lbnQoaWRVUkwpIHtcclxuXHJcbiAgICBjb25zdCBzZWxlY3RGaWx0ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdF9maWx0ZXIgLnNlbGVjdF9idXR0b25cIik7IC8vIEJ1dHRvbiBTZWxlY3RcclxuICAgIGNvbnN0IHNlbGVjdEZpbHRlclNlbGVjdDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdDFcIik7IC8vIEZpcnN0IFNlbGVjdCAoYnkgZGVmYXVsdCBEYXRlKVxyXG4gICAgY29uc3Qgc2VsZWN0RmlsdGVyU2VsZWN0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0MlwiKTsgLy8gMm5kIFNlbGVjdCAoYnkgZGVmYXVsdCBUaXRyZSlcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlRmlsdGVyQWN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IGV2ZW50LnRhcmdldC5pbm5lckhUTUw7IC8vIEdldCBpbm5lckhUTUwgb2Ygc2VsZWN0ZWQgaXRlbVxyXG5cclxuXHJcbiAgICAgICAgc3dpdGNoIChzZWxlY3RlZEl0ZW0pIHtcclxuICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJCdXR0b24uaW5uZXJIVE1MID0gXCJEYXRlXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJTZWxlY3QxLmlubmVySFRNTCA9IFwiUG9wdWxhcml0w6lcIjtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlclNlbGVjdDIuaW5uZXJIVE1MID0gXCJUaXRyZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZWRpYV9zZWN0aW9uJykuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vIEJ1aWxkIE1lZGlhcyBEYXRhXHJcbiAgICAgICAgICAgICAgICBwaG90b2dyYXBoZXIuaW5pdE1lZGlhKGlkVVJMLCBzb3J0QnlEYXRlKTtcclxuICAgICAgICAgICAgICAgIC8vIEVuZCBidWlsZCBNZWRpYXMgRGF0YVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdUaXRyZSc6XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJCdXR0b24uaW5uZXJIVE1MID0gXCJUaXRyZVwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyU2VsZWN0MS5pbm5lckhUTUwgPSBcIkRhdGVcIjtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlclNlbGVjdDIuaW5uZXJIVE1MID0gXCJQb3B1bGFyaXTDqVwiO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVkaWFfc2VjdGlvbicpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAvLyBCdWlsZCBNZWRpYXMgRGF0YVxyXG4gICAgICAgICAgICAgICAgcGhvdG9ncmFwaGVyLmluaXRNZWRpYShpZFVSTCwgc29ydEJ5VGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgLy8gRW5kIGJ1aWxkIE1lZGlhcyBEYXRhXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1BvcHVsYXJpdMOpJzpcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlckJ1dHRvbi5pbm5lckhUTUwgPSBcIlBvcHVsYXJpdMOpXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJTZWxlY3QxLmlubmVySFRNTCA9IFwiRGF0ZVwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyU2VsZWN0Mi5pbm5lckhUTUwgPSBcIlRpdHJlXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lZGlhX3NlY3Rpb24nKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgLy8gQnVpbGQgTWVkaWFzIERhdGFcclxuICAgICAgICAgICAgICAgIHBob3RvZ3JhcGhlci5pbml0TWVkaWEoaWRVUkwsIHNvcnRCeUxpa2VzKTtcclxuICAgICAgICAgICAgICAgIC8vIEVuZCBidWlsZCBNZWRpYXMgRGF0YVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic2VsZWN0ZWRJdGVtIG5vdCBmb3VuZCBlcnJvciBhYm91dCBoYW5kbGVGaWx0ZXJBY3Rpb24oKVwiKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBzZWxlY3RGaWx0ZXJTZWxlY3QxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVGaWx0ZXJBY3Rpb24pXHJcbiAgICBzZWxlY3RGaWx0ZXJTZWxlY3QyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVGaWx0ZXJBY3Rpb24pXHJcbn1cclxuLyoqIEVORCBHRU5FUkFURSBFVkVOVCBGT1IgU0VMRUNUIEZJTFRFUiBDT01QT05FVE5TIEFORCBCRUhBVklPUiAqL1xyXG4iLCIvKiogRnVuY3Rpb24gdG8gc29ydCBieSBMaWtlcyxEYXRlcyBvciBUaXRsZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc29ydEJ5TGlrZXMoYSwgYikge1xyXG4gICAgaWYgKGEubGlrZXMgPiBiLmxpa2VzKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICBpZiAoYS5saWtlcyA8IGIubGlrZXMpIHtcclxuICAgICAgICByZXR1cm4gMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlEYXRlKGEsIGIpIHtcclxuICAgIGlmIChhLmRhdGUgPiBiLmRhdGUpIHtcclxuICAgICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIGlmIChhLmRhdGUgPCBiLmRhdGUpIHtcclxuICAgICAgICByZXR1cm4gMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlUaXRsZShhLCBiKSB7XHJcbiAgICBpZiAoYS50aXRsZSA8IGIudGl0bGUpIHtcclxuICAgICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIGlmIChhLnRpdGxlID4gYi50aXRsZSkge1xyXG4gICAgICAgIHJldHVybiAxXHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxufVxyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBjaGFyc2V0IFxcXCJVVEYtOFxcXCI7XFxuLyoqIFVzZWQgdG8gbG9hZCBhbGwgdmFyaWFibGVzIGZvciB0aGlzIHByb2plY3QgYWJvdXQgU0NTUyAqKi8gLyoqIEZPTlQgKiovXFxuLyoqIEVORCBGT05UICoqL1xcbi8qKiBDT0xPUiBWQVJJQUJMRVMgKiovXFxuLyoqIEVORCBDT0xPUiBWQVJJQUJMRVMgKiovXFxuLyoqIElNUE9SVCBHTE9CQUwgQ1NTIEZPUiBGT05UUyBIVE1MLCogU0VMRUNUT1IgKiovXFxuLyoqKioqKioqKioqKioqKioqKioqKiogR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1xcbmh0bWwsXFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgYW5pbWF0aW9uOiAxcyBlYXNlLWluIGZvcndhcmRzIGZhZGUtaW47XFxufVxcbkBrZXlmcmFtZXMgZmFkZS1pbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuXFxuLyoqKioqKioqKioqKioqKioqKioqKiogRU5EIEdFTkVSQUwgKioqKioqKioqKioqKioqKioqKioqKi9cXG4vKiogSU1QT1JUIE1JWElOICoqL1xcbi8qKiBJTVBPUlQgSEVBREVSIFNUWUxFUyAqKi9cXG5oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAxMjBweDtcXG59XFxuaGVhZGVyIGgxIHtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbiAgdG9wOiA0NHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxMDBweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDM2cHg7XFxuICBsaW5lLWhlaWdodDogNDdweDtcXG59XFxuaGVhZGVyIC5sb2dvLFxcbmhlYWRlciAubG9nb19waG90b2dyYXBoZXIge1xcbiAgaGVpZ2h0OiA1MHB4O1xcbn1cXG5oZWFkZXIgLmxvZ28ge1xcbiAgbWFyZ2luLWxlZnQ6IDExNXB4O1xcbn1cXG5oZWFkZXIgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXG4gIG1hcmdpbi1sZWZ0OiAxMDBweDtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSUyBDQVJEUyAqKi9cXG4ucGhvdG9ncmFwaGVyX2NhcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGltZyB7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxuICBoZWlnaHQ6IDIwMHB4O1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBpbWc6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGgyLFxcbi5waG90b2dyYXBoZXJfY2FyZCBoMyxcXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDQsXFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDIge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIGNvbG9yOiAjRDM1NzNDO1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDMge1xcbiAgZm9udC1zaXplOiAxMy4wMDEwODM0MjM2cHg7XFxuICBsaW5lLWhlaWdodDogMTdweDtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDQge1xcbiAgbWFyZ2luLXRvcDogMnB4O1xcbiAgZm9udC1zaXplOiAxMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDEzcHg7XFxuICBjb2xvcjogIzAwMDAwMDtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gIG1hcmdpbi10b3A6IDJweDtcXG4gIGZvbnQtc2l6ZTogOXB4O1xcbiAgbGluZS1oZWlnaHQ6IDEycHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzc1NzU3NTtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGgzIHtcXG4gICAgZm9udC1zaXplOiAxNi45MDE0MDg0NTA3cHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDQge1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDUge1xcbiAgICBmb250LXNpemU6IDExLjdweDtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDMge1xcbiAgICBmb250LXNpemU6IDE5LjUwMTYyNTEzNTRweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNCB7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNSB7XFxuICAgIGZvbnQtc2l6ZTogMTMuNXB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGltZyB7XFxuICAgIHdpZHRoOiAyMzBweDtcXG4gICAgaGVpZ2h0OiAyMzBweDtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBNT0RBTCBDT01QT05FTlQgKiovXFxuLm1vZGFsX2NvbnRhY3Qge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEQjg4NzY7XFxuICBwYWRkaW5nOiAzNXB4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgd2lkdGg6IDUwJTtcXG4gIHRyYW5zaXRpb246IHdpZHRoIDAuNXMgZWFzZS1pbjtcXG59XFxuLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciB7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi10b3A6IC0yMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgI2Nsb3NlTW9kYWwge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdHJhbnNpdGlvbjogZmlsdGVyIDAuNXMgZWFzZS1pbjtcXG59XFxuLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciAjY2xvc2VNb2RhbDpob3ZlciB7XFxuICBmaWx0ZXI6IGJyaWdodG5lc3MoMCkgc2F0dXJhdGUoMTAwJSk7XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgLnRleHRfaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciBoMiB7XFxuICBmb250LXNpemU6IDYzLjcycHg7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcbi5tb2RhbF9jb250YWN0IGZvcm0gaW5wdXQge1xcbiAgZm9udC1zaXplOiAzMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbiAgcGFkZGluZzogMTBweDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgZm9ybSB0ZXh0YXJlYSB7XFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIHJlc2l6ZTogdmVydGljYWw7XFxufVxcbi5tb2RhbF9jb250YWN0IGZvcm0gaW5wdXQsXFxuLm1vZGFsX2NvbnRhY3QgZm9ybSB0ZXh0YXJlYSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNjhweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgZm9ybSBsYWJlbCB7XFxuICBjb2xvcjogIzAwMDAwMDtcXG4gIGZvbnQtc2l6ZTogMzZweDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgZm9ybSBsYWJlbDpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxufVxcbi5tb2RhbF9jb250YWN0IC5oZWxwX2JsaW5kIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5oaWRlX2NvbnRlbnQge1xcbiAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1vZmY7XFxufVxcbkBrZXlmcmFtZXMgZmFkZS1vZmYge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDAuNDtcXG4gIH1cXG59XFxuXFxuLnNob3dfY29udGVudCB7XFxuICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcbn1cXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjQ7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLm1vZGFsX2NvbnRhY3Qge1xcbiAgICB3aWR0aDogNzAlO1xcbiAgfVxcbiAgLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciBoMiB7XFxuICAgIGZvbnQtc2l6ZTogNTAuNHB4O1xcbiAgfVxcbiAgLm1vZGFsX2NvbnRhY3QgZm9ybSBsYWJlbCB7XFxuICAgIGZvbnQtc2l6ZTogMzIuNzI3MjcyNzI3M3B4O1xcbiAgfVxcbiAgLm1vZGFsX2NvbnRhY3QgZm9ybSBpbnB1dCB7XFxuICAgIGZvbnQtc2l6ZTogMjcuNjkyMzA3NjkyM3B4O1xcbiAgfVxcbiAgLm1vZGFsX2NvbnRhY3QgZm9ybSB0ZXh0YXJlYSB7XFxuICAgIGZvbnQtc2l6ZTogMjIuNXB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXG4gIC5tb2RhbF9jb250YWN0IHtcXG4gICAgd2lkdGg6IDkwJTtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgaDIge1xcbiAgICBmb250LXNpemU6IDQzLjJweDtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IGZvcm0gbGFiZWwge1xcbiAgICBmb250LXNpemU6IDI3LjY5MjMwNzY5MjNweDtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IGZvcm0gaW5wdXQge1xcbiAgICBmb250LXNpemU6IDI0cHg7XFxuICB9XFxuICAubW9kYWxfY29udGFjdCBmb3JtIHRleHRhcmVhIHtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgfVxcbn1cXG4ubW9kYWxfbGlnaHRib3gge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICB0cmFuc2l0aW9uOiB3aWR0aCAwLjVzIGVhc2UtaW47XFxufVxcbi5tb2RhbF9saWdodGJveCAuY29udGVudF9tZWRpYSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4ubW9kYWxfbGlnaHRib3ggI3ZpZGVvX3NlbGVjdGVkLFxcbi5tb2RhbF9saWdodGJveCAjcGljdHVyZV9zZWxlY3RlZCB7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG4ubW9kYWxfbGlnaHRib3ggYSB7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBmb250LXNpemU6IDkwcHg7XFxuICBjb2xvcjogIzkwMUMxQztcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuNXMgZWFzZS1pbjtcXG4gIHBhZGRpbmc6IDI1cHg7XFxufVxcbi5tb2RhbF9saWdodGJveCBhOmhvdmVyIHtcXG4gIGNvbG9yOiAjREI4ODc2O1xcbn1cXG4ubW9kYWxfbGlnaHRib3ggLmNsb3NlTGlnaHRib3gge1xcbiAgZmlsdGVyOiBicmlnaHRuZXNzKDApIHNhdHVyYXRlKDEwMCUpIGludmVydCgxOCUpIHNlcGlhKDMxJSkgc2F0dXJhdGUoNDU5NyUpIGh1ZS1yb3RhdGUoMzQ0ZGVnKSBicmlnaHRuZXNzKDkzJSkgY29udHJhc3QoOTUlKTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMTBweDtcXG4gIHJpZ2h0OiAtNzBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRyYW5zaXRpb246IGZpbHRlciAwLjVzIGVhc2UtaW47XFxufVxcbi5tb2RhbF9saWdodGJveCAuY2xvc2VMaWdodGJveDpob3ZlciB7XFxuICBmaWx0ZXI6IGJyaWdodG5lc3MoMCkgc2F0dXJhdGUoMTAwJSkgaW52ZXJ0KDYzJSkgc2VwaWEoNDMlKSBzYXR1cmF0ZSg0NDglKSBodWUtcm90YXRlKDMyM2RlZykgYnJpZ2h0bmVzcyg4OSUpIGNvbnRyYXN0KDkyJSk7XFxufVxcbi5tb2RhbF9saWdodGJveCBoMiB7XFxuICBjb2xvcjogIzkwMUMxQztcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG59XFxuLm1vZGFsX2xpZ2h0Ym94IC5oZWxwX2JsaW5kIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5oaWRlX2NvbnRlbnQge1xcbiAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1vZmY7XFxufVxcbkBrZXlmcmFtZXMgZmFkZS1vZmYge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDAuNDtcXG4gIH1cXG59XFxuXFxuLnNob3dfY29udGVudCB7XFxuICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcbn1cXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjQ7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuXFxuLyoqIElNUE9SVCBDT05UQUNUIEJVVFRPTiBDT01QT05FTlQgKiovXFxuLmZpc2hleWVfYnV0dG9uIHtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMTFweDtcXG4gIG1pbi13aWR0aDogMTcwcHg7XFxuICBtaW4taGVpZ2h0OiA3MHB4O1xcbiAgYm9yZGVyOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzkwMUMxQztcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuNXMgZWFzZS1pbiwgYmFja2dyb3VuZC1jb2xvciAwLjVzIGVhc2UtaW47XFxufVxcbi5maXNoZXllX2J1dHRvbjpob3ZlciB7XFxuICBjb2xvcjogIzAwMDAwMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEQjg4NzY7XFxufVxcblxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSCBIRUFERVIgQ09NUE9ORU5UICoqL1xcbi5waG90b2dyYXBoX2hlYWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGZsZXgtd3JhcDogbm8td3JhcDtcXG4gIGFsaWduLWNvbnRlbnQ6IGZsZWQtZW5kO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZBRkFGQTtcXG4gIGhlaWdodDogMzEzcHg7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAzMHB4O1xcbiAgcGFkZGluZy1yaWdodDogMzBweDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGRpdjpudGgtY2hpbGQoMykge1xcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDEsXFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgyLFxcbi5waG90b2dyYXBoX2hlYWRlciBoMyB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgxIHtcXG4gIGZvbnQtc2l6ZTogNjMuNzJweDtcXG4gIG1hcmdpbi1ib3R0b206IC0xNXB4O1xcbiAgY29sb3I6ICNEMzU3M0M7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBoMiB7XFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIGZvbnQtc2l6ZTogMjMuMjI1ODA2NDUxNnB4O1xcbiAgY29sb3I6ICM5MDFDMUM7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBoMyB7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBjb2xvcjogIzUyNTI1MjtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2Fib3V0LFxcbi5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9idXR0b24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gIG1hcmdpbi10b3A6IDMwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IDgwcHg7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9hYm91dCB7XFxuICBtYXJnaW4tbGVmdDogMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5waG90b2dyYXBoX2hlYWRlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIGFsaWduLWNvbnRlbnQ6IGZsZWQtZW5kO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHBhZGRpbmctdG9wOiAxNXB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxIHtcXG4gICAgZm9udC1zaXplOiA0MS40cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgaDIge1xcbiAgICBmb250LXNpemU6IDIwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgaDMge1xcbiAgICBmb250LXNpemU6IDE2LjM2MzYzNjM2MzZweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2J1dHRvbiB7XFxuICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgYWxpZ24tY29udGVudDogZmxlZC1lbmQ7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9idXR0b24ge1xcbiAgICBhbGlnbi1pdGVtczogaW5oZXJpdDtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwcHg7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgbWFyZ2luLXRvcDogMjAwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgPiAucGhvdG9ncmFwaF9hYm91dCB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxLFxcbmgyLFxcbmgzIHtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyID4gLnBob3RvZ3JhcGhlcl9jYXJkIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBTRUxFQ1QgRklMVEVSIENPTVBPTkVOVCAqKi9cXG4uc2VsZWN0X2J1dHRvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24tY29udGVudDogZmxleC1lbmQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgdGV4dC1hbGlnbjogbGVmdDtcXG4gIHBhZGRpbmctbGVmdDogMjBweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgYmFja2dyb3VuZDogIzkwMUMxQztcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDVweDtcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItY29sb3I6IG5vbmU7XFxuICB3aWR0aDogMTcwcHg7XFxuICBoZWlnaHQ6IDcwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5zZWxlY3RfYnV0dG9uOjphZnRlciB7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yNXMgZWFzZS1pbjtcXG4gIGNvbnRlbnQ6IFxcXCI+XFxcIjtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG4gIGZvbnQtc2l6ZTogMjVweDtcXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgZmxvYXQ6IHJpZ2h0O1xcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcbn1cXG5cXG4uc2VsZWN0X2ZpbHRlciB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxufVxcblxcbi5zZWxlY3RfY29udGVudCB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYmFja2dyb3VuZDogIzkwMUMxQztcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDVweDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1cHg7XFxuICBtaW4td2lkdGg6IDE2MHB4O1xcbiAgYm94LXNoYWRvdzogMHB4IDJweCA4cHggMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIHotaW5kZXg6IDE7XFxufVxcbi5zZWxlY3RfY29udGVudCAud2hpdGVsaW5lIHtcXG4gIHdpZHRoOiA5MCU7XFxuICBoZWlnaHQ6IDFweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgbWFyZ2luLWxlZnQ6IDUlO1xcbn1cXG4uc2VsZWN0X2NvbnRlbnQgYSB7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgd2lkdGg6IDE3MHB4O1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcbi5zZWxlY3RfY29udGVudCBhOmhvdmVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxuICBjb2xvcjogIzAwMDAwMDtcXG59XFxuXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9jb250ZW50IHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbn1cXG5cXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2J1dHRvbjo6YWZ0ZXIge1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBlYXNlLWluO1xcbn1cXG5cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUiBTVEFUSVNUSUMgQ09NUE9ORU5UICoqL1xcbi5waG90b2dyYXBoZXJfc3RhdGlzdGljIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgYWxpZ24tY29udGVudDogZmxleC1zdGFydDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0RCODg3NjtcXG4gIG1pbi13aWR0aDogMzc2cHg7XFxuICBtaW4taGVpZ2h0OiA4OXB4O1xcbiAgYm90dG9tOiAwO1xcbiAgcmlnaHQ6IDM4cHg7XFxuICB6LWluZGV4OiAyO1xcbiAgbWFyZ2luLWJvdHRvbTogLTIycHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxufVxcbi5waG90b2dyYXBoZXJfc3RhdGlzdGljIC50b3RhbF9saWtlcyxcXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyAucHJpY2VfcmF0ZV9kYWlseSB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMjMuMjI1ODA2NDUxNnB4O1xcbiAgbGluZS1oZWlnaHQ6IDMxcHg7XFxuICBjb2xvcjogIzAwMDAwMDtcXG4gIHBhZGRpbmctdG9wOiAxOHB4O1xcbn1cXG4ucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyAudG90YWxfbGlrZXM6YWZ0ZXIge1xcbiAgcGFkZGluZy1sZWZ0OiA1cHg7XFxuICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXG4gIGZvbnQtc2l6ZTogMzAuODkwMzIyNTgwNnB4O1xcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfc3RhdGlzdGljIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgTUVESUEgQ0FSRFMgQ09NUE9ORU5UICoqL1xcbi5tZWRpYV9jYXJkIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgbWF4LXdpZHRoOiAzNTBweDtcXG59XFxuLm1lZGlhX2NhcmQgaW1nLFxcbi5tZWRpYV9jYXJkIHZpZGVvIHtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxuICB3aWR0aDogMTAwJTtcXG4gIG1heC1oZWlnaHQ6IDMwMHB4O1xcbiAgbWluLWhlaWdodDogMzAwcHg7XFxuICBvYmplY3QtZml0OiBjb3ZlcjtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuLm1lZGlhX2NhcmQgaW1nOmhvdmVyLFxcbi5tZWRpYV9jYXJkIHZpZGVvOmhvdmVyIHtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbn1cXG4ubWVkaWFfY2FyZCAuZGV0YWlscyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIG1hcmdpbi10b3A6IDVweDtcXG59XFxuLm1lZGlhX2NhcmQgaDYge1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBjb2xvcjogIzkwMUMxQztcXG59XFxuLm1lZGlhX2NhcmQgaDY6bGFzdC1jaGlsZDo6YWZ0ZXIge1xcbiAgZm9udC1zaXplOiAzMHB4O1xcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcbiAgY29udGVudDogXFxcIuKZpVxcXCI7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgLm1lZGlhX2NhcmQgaW1nLFxcbi5tZWRpYV9jYXJkIHtcXG4gICAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgfVxcbn1cXG4vKiogSU1QT1JUIFBBR0VTIChvdGhlcikgU3R5bGVzICoqL1xcbi5waG90b2dyYXBoZXJfc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXG4gIGdhcDogNzBweDtcXG4gIG1hcmdpbi10b3A6IDc1cHg7XFxuICBtYXJnaW4tYm90dG9tOiA3NXB4O1xcbn1cXG5cXG4ubWFyZ2luX2xlZnRfcmlnaHQge1xcbiAgbWFyZ2luOiAwIDEwMHB4O1xcbn1cXG5cXG4uZmlsdGVyX3NlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICBtYXJnaW4tbGVmdDogMDtcXG59XFxuLmZpbHRlcl9zZWN0aW9uIGg1OmZpcnN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBtYXJnaW4tcmlnaHQ6IDI4cHg7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbn1cXG4uZmlsdGVyX3NlY3Rpb24gLnNlbGVjdF9maWx0ZXIge1xcbiAgbWFyZ2luLXRvcDogMTBweDtcXG59XFxuXFxuLm1lZGlhX3NlY3Rpb24ge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxuICByb3ctZ2FwOiAzMHB4O1xcbiAgY29sdW1uLWdhcDogOTVweDtcXG4gIG1hcmdpbi10b3A6IDIwcHg7XFxuICBtYXJnaW4tYm90dG9tOiA3NXB4O1xcbn1cXG5cXG4uRVJST1JfNDA0IHtcXG4gIG1hcmdpbi10b3A6IDUlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBwYWRkaW5nOiA0MHB4O1xcbn1cXG4uRVJST1JfNDA0IGgxIHtcXG4gIG1hcmdpbi1ib3R0b206IDUlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiA3MnB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNDBweDtcXG59XFxuLkVSUk9SXzQwNCBhIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbn1cXG4uRVJST1JfNDA0IGE6aG92ZXIge1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcblxcbi8qKiBJTVBPUlQgRk9PVEVSIFNUWUxFUyAqKi9cXG5mb290ZXIge1xcbiAgaGVpZ2h0OiAycHg7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgbWFyZ2luLXRvcDogNzVweDtcXG59XFxuXFxuLyoqIElNUE9SVCBSRVNQT05TSVZFIFNUWUxFUyBmb3IgTm9uIENvbXBvbmVudHMgRWxlbWVudHNcXG4gKGNvbXBvbmVudHMgRWxlbWVudHMgZ290IHRoZWlyIG93biBSZXNwb25zaXZlIFJ1bGVzIGluIHRoZWlyIFN0eWxlc2hlZXQpICoqL1xcbkBtZWRpYSAobWluLXdpZHRoOiAyMDAwcHgpIHtcXG4gIC5tZWRpYV9zZWN0aW9uIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmciAxZnI7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfc2VjdGlvbixcXG4ubWVkaWFfc2VjdGlvbiB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxuICBoZWFkZXIge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBtYXJnaW4tdG9wOiA0MHB4O1xcbiAgICBoZWlnaHQ6IDEwMHB4O1xcbiAgfVxcbiAgaGVhZGVyIC5sb2dvX3Bob3RvZ3JhcGhlciB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwO1xcbiAgfVxcbiAgaGVhZGVyIC5sb2dvLFxcbmhlYWRlciBoMSB7XFxuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxuICAgIGZvbnQtc2l6ZTogMzBweDtcXG4gIH1cXG4gIC5tYXJnaW5fbGVmdF9yaWdodCB7XFxuICAgIG1hcmdpbjogMCAyMHB4O1xcbiAgfVxcbiAgLmZpbHRlcl9zZWN0aW9uIHtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXG4gIC5waG90b2dyYXBoZXJfc2VjdGlvbiB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIC5tZWRpYV9zZWN0aW9uIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxuICB9XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL21haW4uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX3ZhcmlhYmxlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fZ2xvYmFsLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3BhZ2VzL19oZWFkZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvX21peGluLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3Bob3RvZ3JhcGhlcl9jYXJkcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL21vZGFsL19jb250YWN0LnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvbW9kYWwvX2xpZ2h0Ym94LnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX2Zpc2hleWVfYnV0dG9uLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3Bob3RvZ3JhcGhfaGVhZGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX3NlbGVjdF9maWx0ZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fcGhvdG9ncmFwaGVyX3N0YXRpc3RpYy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19tZWRpYV9jYXJkcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9wYWdlcy9fcGFnZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvcGFnZXMvX2Zvb3Rlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fcmVzcG9uc2l2ZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGdCQUFnQjtBQUFoQiw2REFBQSxFQUFBLFdBQUE7QUNNQSxlQUFBO0FBRUEsc0JBQUE7QUFTQSwwQkFBQTtBRGZBLGtEQUFBO0FFRkEsc0RBQUE7QUFDQTs7RUFFRSxTQUFBO0VBQ0EsVUFBQTtFQUNBLHNCQUFBO0FGT0Y7O0FFSEE7RUFDRSxrQ0RUWTtFQ1VaLHNDQUFBO0FGTUY7QUVKRTtFQUNFO0lBQ0UsVUFBQTtFRk1KO0VFSEU7SUFDRSxVQUFBO0VGS0o7QUFDRjs7QUVBQSwwREFBQTtBRnJCQSxtQkFBQTtBQUVBLDJCQUFBO0FHTkE7RUNLRSxhQUFBO0VBQ0EsbUJETHNCO0VDZ0JwQiw4QkRoQnFDO0VDb0JyQyxtQkRwQm9EO0VBQ3BELGFBQUE7QUhrQ0o7QUcvQkk7RUFDSSxjRk1TO0VFTFQsU0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JGUFk7RUVRWixlRkxJO0VFTUosaUJBQUE7QUhpQ1I7QUc5Qkk7O0VBRUksWUFBQTtBSGdDUjtBRzdCSTtFQUNJLGtCQUFBO0FIK0JSO0FHNUJJO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtBSDhCUjs7QUEvQ0EsaUNBQUE7QUtSQTtFREtFLGFBQUE7RUFDQSxzQkNMc0I7RURnQnBCLHVCQ2hCd0M7RURvQnhDLG1CQ3BCZ0Q7RUFDaEQsb0JBQUE7QUw4REo7QUs1REk7RUFDSSw0Q0FBQTtFQUNBLHlCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FMOERSO0FLNURRO0VBQ0ksZUFBQTtFQUNBLDJDQUFBO0FMOERaO0FLekRJOzs7O0VBSUksa0NKdEJNO0VJdUJOLGtCQUFBO0VBQ0EsZ0JKdkJZO0FEa0ZwQjtBS3hESTtFQUNJLGdCQUFBO0VBQ0EsY0pqQlM7RUlrQlQsZUoxQkk7QURvRlo7QUt2REk7RUFDSSwwQkFBQTtFQUNB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TzlQSTtFQUNJLGFBQUE7QVBnUVI7O0FPelBBO0VBQ0kseUNBQUE7QVA0UEo7QU8xUEk7RUFDSTtJQUNJLFVBQUE7RVA0UFY7RU96UE07SUFDSSxZQUFBO0VQMlBWO0FBQ0Y7O0FPclBBO0VBQ0ksd0NBQUE7QVB3UEo7QU90UEk7RUFDSTtJQUNJLFlBQUE7RVB3UFY7RU9yUE07SUFDSSxVQUFBO0VQdVBWO0FBQ0Y7O0FBdFVBLHNDQUFBO0FRYkE7RUFDSSxlQUFBO0VBQ0EsZ0JQQ2M7RU9BZCxrQ1BGVTtFT0dWLFlQS1k7RU9KWixhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSx5QlBHYTtFT0ZiLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLDZEQUFBO0FSdVZKO0FRclZJO0VBQ0ksY1BMYTtFT01iLHlCQUFBO0FSdVZSOztBQXhWQSx5Q0FBQTtBU2ZBO0VMS0UsYUFBQTtFQUNBLG1CS0xzQjtFTFFwQixrQktSeUI7RUxZekIsdUJLWmtDO0VMZ0JsQyw4QktoQjRDO0VBQzVDLHlCUmFrQjtFUVpsQixhQUFBO0VBQ0EsZ0JBQUE7RUxnQ0Ysa0JLL0JrQztFTGdDbEMsbUJLaENrQztBVGdYcEM7QVM5V0k7RUFDSSxrQkFBQTtBVGdYUjtBUzVXSTs7O0VBR0ksa0NSZE07RVFlTixnQlJkWTtBRDRYcEI7QVMzV0k7RUFDSSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsY1JUUztBRHNYakI7QVMxV0k7RUFDSSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMEJBQUE7RUFDQSxjUmpCUztBRDZYakI7QVN6V0k7RUFDSSxlQUFBO0VBQ0EsY1JwQlc7QUQrWG5CO0FTeFdJOztFTGhDRixhQUFBO0VBQ0Esc0JLaUMwQjtFTHRCeEIsdUJLc0I0QztFTGxCNUMsdUJLa0JvRDtBVDZXeEQ7QVMxV0k7RUFDSSxnQkFBQTtFQUNBLGtCQUFBO0FUNFdSO0FTeldJO0VBQ0ksaUJBQUE7RUFDQSxtQkFBQTtBVDJXUjs7QVN0V0E7RUFDSTtJQUNJLHVCUi9DUTtJR0pkLGFBQUE7SUFDQSxzQkttRDBCO0lMaER4Qixl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ckJNOztJQUVJLGlCQUFBO0lBQ0Esa0JBQUE7SUFDQSxlQUFBO0VmeXJCVjtFZXJyQkU7SUFDSSxjQUFBO0VmdXJCTjtFZW5yQkU7SUFDSSw4QkFBQTtFZnFyQk47QUFDRjtBZWpyQkE7RUFFSTtJQUNJLDBCQUFBO0Vma3JCTjtBQUNGO0FlOXFCQTtFQUVJO0lBQ0ksMEJBQUE7RWYrcUJOO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqIFVzZWQgdG8gbG9hZCBhbGwgdmFyaWFibGVzIGZvciB0aGlzIHByb2plY3QgYWJvdXQgU0NTUyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfdmFyaWFibGVzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgR0xPQkFMIENTUyBGT1IgRk9OVFMgSFRNTCwqIFNFTEVDVE9SICoqL1xcclxcbkBpbXBvcnQgXFxcIl9nbG9iYWwuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBNSVhJTiAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfbWl4aW4uc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBIRUFERVIgU1RZTEVTICoqL1xcclxcbkBpbXBvcnQgXFxcInBhZ2VzL2hlYWRlci5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUlMgQ0FSRFMgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9waG90b2dyYXBoZXJfY2FyZHMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBNT0RBTCBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9tb2RhbC9fY29udGFjdC5zY3NzXFxcIjtcXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL21vZGFsL19saWdodGJveC5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIENPTlRBQ1QgQlVUVE9OIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL2Zpc2hleWVfYnV0dG9uLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSCBIRUFERVIgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvcGhvdG9ncmFwaF9oZWFkZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBTRUxFQ1QgRklMVEVSIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3NlbGVjdF9maWx0ZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgU1RBVElTVElDIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3Bob3RvZ3JhcGhlcl9zdGF0aXN0aWMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgTUVESUEgQ0FSRFMgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvbWVkaWFfY2FyZHMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQQUdFUyAob3RoZXIpIFN0eWxlcyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJwYWdlcy9wYWdlcy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIEZPT1RFUiBTVFlMRVMgKiovXFxyXFxuQGltcG9ydCBcXFwicGFnZXMvZm9vdGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUkVTUE9OU0lWRSBTVFlMRVMgZm9yIE5vbiBDb21wb25lbnRzIEVsZW1lbnRzXFxyXFxuIChjb21wb25lbnRzIEVsZW1lbnRzIGdvdCB0aGVpciBvd24gUmVzcG9uc2l2ZSBSdWxlcyBpbiB0aGVpciBTdHlsZXNoZWV0KSAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfcmVzcG9uc2l2ZS5zY3NzXFxcIjtcIixcIi8qKiBGT05UICoqL1xcclxcbiRmb250X2dsb2JhbDogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcclxcbiRmb250X3dlaWdodF9zbWFsbDogNDAwO1xcclxcbiRmb250X3dlaWdodF9iaWc6IDcwMDtcXHJcXG5cXHJcXG4kZm9udF9zaXplOiAzNnB4O1xcclxcbi8qKiBFTkQgRk9OVCAqKi9cXHJcXG5cXHJcXG4vKiogQ09MT1IgVkFSSUFCTEVTICoqL1xcclxcbiRkZWZhdWx0X2NvbG9yOiB3aGl0ZTtcXHJcXG4kZGVmYXVsdF9mb250X2NvbG9yOiAjMDAwMDAwO1xcclxcbiRjb2xvcl9ncmF5OiAjNzU3NTc1O1xcclxcbiRjb2xvcl9wcmltYXJ5MTogIzkwMUMxQztcXHJcXG4kY29sb3JfcHJpbWFyeTI6ICNEMzU3M0M7XFxyXFxuJGNvbG9yX3NlY29uZGFyeTI6ICM1MjUyNTI7XFxyXFxuJGNvbG9yX3NlY29uZGFyeTJfYmc6ICNGQUZBRkE7XFxyXFxuJGNvbG9yX2JhY2tncm91bmQ6ICNEQjg4NzY7XFxyXFxuLyoqIEVORCBDT0xPUiBWQVJJQUJMRVMgKiovXCIsXCIvKioqKioqKioqKioqKioqKioqKioqKiBHRU5FUkFMICoqKioqKioqKioqKioqKioqKioqKiovXFxyXFxuaHRtbCxcXHJcXG4qIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICBhbmltYXRpb246IDFzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXHJcXG5cXHJcXG4gIEBrZXlmcmFtZXMgZmFkZS1pbiB7XFxyXFxuICAgIDAlIHtcXHJcXG4gICAgICBvcGFjaXR5OiAwO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIDEwMCUge1xcclxcbiAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4vKioqKioqKioqKioqKioqKioqKioqKiBFTkQgR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1wiLFwiaGVhZGVyIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIG51bGwsIHNwYWNlLWJldHdlZW4sIGNlbnRlcik7XFxyXFxuICAgIGhlaWdodDogMTIwcHg7XFxyXFxuXFxyXFxuXFxyXFxuICAgIGgxIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgICAgICB0b3A6IDQ0cHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwMHB4O1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiA0N3B4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvLFxcclxcbiAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvIHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMTVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEwMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cIixcIkBtaXhpbiBmbGV4LWJhc2ljKCRmbGV4LWRpcmVjdGlvbixcXHJcXG4gICRmbGV4LXdyYXAsXFxyXFxuICAkYWxpZ24tY29udGVudCxcXHJcXG4gICRqdXN0aWZ5LWNvbnRlbnQsXFxyXFxuICAkYWxpZ24taXRlbXMpIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogJGZsZXgtZGlyZWN0aW9uO1xcclxcblxcclxcbiAgQGlmICgkZmxleC13cmFwKSB7XFxyXFxuICAgIGZsZXgtd3JhcDogJGZsZXgtd3JhcDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIEBpZiAoJGFsaWduLWNvbnRlbnQpIHtcXHJcXG4gICAgYWxpZ24tY29udGVudDogJGFsaWduLWNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAaWYgKCRqdXN0aWZ5LWNvbnRlbnQpIHtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiAkanVzdGlmeS1jb250ZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgQGlmICgkYWxpZ24taXRlbXMpIHtcXHJcXG4gICAgYWxpZ24taXRlbXM6ICRhbGlnbi1pdGVtcztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLy8gQG1peGluIG1hc2stY3Jvc3Nicm93c2VyKCR2YWx1ZSkge1xcclxcbi8vICAgLXdlYmtpdC1tYXNrOiAkdmFsdWU7XFxyXFxuLy8gICBtYXNrOiAkdmFsdWU7XFxyXFxuLy8gfVxcclxcblxcclxcbi8vIEBtaXhpbiBtYXJnaW4tbGVmdC1hbmQtcmlnaHQoJHZhbHVlKSB7XFxyXFxuLy8gICBtYXJnaW4tbGVmdDogJHZhbHVlO1xcclxcbi8vICAgbWFyZ2luLXJpZ2h0OiAkdmFsdWU7XFxyXFxuLy8gfVxcclxcblxcclxcbkBtaXhpbiBwYWRkaW5nLWxlZnQtYW5kLXJpZ2h0KCR2YWx1ZSkge1xcclxcbiAgcGFkZGluZy1sZWZ0OiAkdmFsdWU7XFxyXFxuICBwYWRkaW5nLXJpZ2h0OiAkdmFsdWU7XFxyXFxufVwiLFwiLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIG51bGwsIGNlbnRlciwgY2VudGVyKTtcXHJcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIGltZyB7XFxyXFxuICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICBoZWlnaHQ6IDIwMHB4O1xcclxcbiAgICAgICAgd2lkdGg6IDIwMHB4O1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuXFxyXFxuICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41MCk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgaDIsXFxyXFxuICAgIGgzLFxcclxcbiAgICBoNCxcXHJcXG4gICAgaDUge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfc21hbGw7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDIge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTI7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAyLjc2OSk7XFxyXFxuICAgICAgICBsaW5lLWhlaWdodDogMTdweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDQge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAzLjYpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEzcHg7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoNSB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAycHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDQpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEycHg7XFxyXFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX2dyYXk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgaDMge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMi43NjkgKiAxLjMpO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAzLjYgKiAxLjMpO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyA0ICogMS4zKTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgaDMge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMi43NjkgKiAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDQge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMy42ICogMS41KTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGg1IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDQgKiAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaW1nIHtcXHJcXG4gICAgICAgICAgICB3aWR0aDogMjMwcHg7XFxyXFxuICAgICAgICAgICAgaGVpZ2h0OiAyMzBweDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbn1cIixcIi5tb2RhbF9jb250YWN0IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICB0b3A6IDUwJTtcXHJcXG4gICAgbGVmdDogNTAlO1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXHJcXG4gICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIHBhZGRpbmc6IDM1cHg7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAgd2lkdGg6IDUwJTtcXHJcXG4gICAgdHJhbnNpdGlvbjogd2lkdGggMC41cyBlYXNlLWluO1xcclxcblxcclxcblxcclxcbiAgICAubW9kYWxfaGVhZGVyIHtcXHJcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogLTIwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbiAgICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXHJcXG5cXHJcXG4gICAgICAgICNjbG9zZU1vZGFsIHtcXHJcXG4gICAgICAgICAgICAvLyBDbG9zZSBNb2RhbCBQaWN0dXJlXFxyXFxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGZpbHRlciAwLjVzIGVhc2UtaW47XFxyXFxuXFxyXFxuICAgICAgICAgICAgJjpob3ZlciB7XFxyXFxuICAgICAgICAgICAgICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwKSBzYXR1cmF0ZSgxMDAlKTtcXHJcXG4gICAgICAgICAgICB9XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAudGV4dF9oZWFkZXIge1xcclxcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDIge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMS43Nyk7XFxyXFxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXHJcXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcclxcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxyXFxuICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIGlucHV0IHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS4yKTtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcXHJcXG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLzEuNSk7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcbiAgICAgICAgcmVzaXplOiB2ZXJ0aWNhbDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIGlucHV0LFxcclxcbiAgICBmb3JtIHRleHRhcmVhIHtcXHJcXG5cXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgaGVpZ2h0OiA2OHB4O1xcclxcbiAgICAgICAgYm9yZGVyOiBub25lO1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIGZvcm0gbGFiZWwge1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgZm9ybSBsYWJlbDpsYXN0LWNoaWxkIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmhlbHBfYmxpbmQge1xcclxcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG4uaGlkZV9jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1vZmY7XFxyXFxuXFxyXFxuICAgIEBrZXlmcmFtZXMgZmFkZS1vZmYge1xcclxcbiAgICAgICAgMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIDEwMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4uc2hvd19jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXHJcXG5cXHJcXG4gICAgQGtleWZyYW1lcyBmYWRlLWluIHtcXHJcXG4gICAgICAgIDAlIHtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjQ7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAxMDAlIHtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAxLjA7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcclxcblxcclxcbiAgICAubW9kYWxfY29udGFjdCB7XFxyXFxuICAgICAgICB3aWR0aDogNzAlO1xcclxcblxcclxcbiAgICAgICAgLm1vZGFsX2hlYWRlciB7XFxyXFxuICAgICAgICAgICAgaDIge1xcclxcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuNCk7XFxyXFxuICAgICAgICAgICAgfVxcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSBsYWJlbCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjEpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSBpbnB1dCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjMpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjYpO1xcclxcblxcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcclxcbiAgICAubW9kYWxfY29udGFjdCB7XFxyXFxuICAgICAgICB3aWR0aDogOTAlO1xcclxcblxcclxcblxcclxcbiAgICAgICAgLm1vZGFsX2hlYWRlciB7XFxyXFxuICAgICAgICAgICAgaDIge1xcclxcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuMik7XFxyXFxuICAgICAgICAgICAgfVxcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSBsYWJlbCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjMpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSBpbnB1dCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjgpO1xcclxcblxcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxufVwiLFwiLm1vZGFsX2xpZ2h0Ym94IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICB0b3A6IDUwJTtcXHJcXG4gICAgbGVmdDogNTAlO1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXHJcXG4gICAgdHJhbnNpdGlvbjogd2lkdGggMC41cyBlYXNlLWluO1xcclxcblxcclxcblxcclxcbiAgICAuY29udGVudF9tZWRpYSB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgICN2aWRlb19zZWxlY3RlZCxcXHJcXG4gICAgI3BpY3R1cmVfc2VsZWN0ZWQge1xcclxcbiAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgICAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgICAgIG1hcmdpbjogYXV0bztcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhIHtcXHJcXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMi41KTtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjVzIGVhc2UtaW47XFxyXFxuICAgICAgICBwYWRkaW5nOiAyNXB4O1xcclxcblxcclxcbiAgICAgICAgJjpob3ZlciB7XFxyXFxuICAgICAgICAgICAgY29sb3I6ICRjb2xvcl9iYWNrZ3JvdW5kO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5jbG9zZUxpZ2h0Ym94IHtcXHJcXG4gICAgICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwKSBzYXR1cmF0ZSgxMDAlKSBpbnZlcnQoMTglKSBzZXBpYSgzMSUpIHNhdHVyYXRlKDQ1OTclKSBodWUtcm90YXRlKDM0NGRlZykgYnJpZ2h0bmVzcyg5MyUpIGNvbnRyYXN0KDk1JSk7XFxyXFxuICAgICAgICAvLyB0byB0YXJnZXQgY29sb3IgQ0Y6IGh0dHBzOiAvL2NvZGVwZW4uaW8vc29zdWtlL3Blbi9Qam9xcXBcXHJcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICAgIHRvcDogMTBweDtcXHJcXG4gICAgICAgIHJpZ2h0OiAtNzBweDtcXHJcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGZpbHRlciAwLjVzIGVhc2UtaW47XFxyXFxuXFxyXFxuICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMCkgc2F0dXJhdGUoMTAwJSkgaW52ZXJ0KDYzJSkgc2VwaWEoNDMlKSBzYXR1cmF0ZSg0NDglKSBodWUtcm90YXRlKDMyM2RlZykgYnJpZ2h0bmVzcyg4OSUpIGNvbnRyYXN0KDkyJSk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgaDIge1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogMjRweDtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcbiAgICAuaGVscF9ibGluZCB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5oaWRlX2NvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLW9mZjtcXHJcXG5cXHJcXG4gICAgQGtleWZyYW1lcyBmYWRlLW9mZiB7XFxyXFxuICAgICAgICAwJSB7XFxyXFxuICAgICAgICAgICAgb3BhY2l0eTogMS4wO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgMTAwJSB7XFxyXFxuICAgICAgICAgICAgb3BhY2l0eTogMC40O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcblxcclxcblxcclxcbi5zaG93X2NvbnRlbnQge1xcclxcbiAgICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcclxcblxcclxcbiAgICBAa2V5ZnJhbWVzIGZhZGUtaW4ge1xcclxcbiAgICAgICAgMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIDEwMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbn1cIixcIi5maXNoZXllX2J1dHRvbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS44KTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgcGFkZGluZzogMTFweDtcXHJcXG4gICAgbWluLXdpZHRoOiAxNzBweDtcXHJcXG4gICAgbWluLWhlaWdodDogNzBweDtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjVzIGVhc2UtaW4sIGJhY2tncm91bmQtY29sb3IgMC41cyBlYXNlLWluO1xcclxcblxcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIH1cXHJcXG59XCIsXCIucGhvdG9ncmFwaF9oZWFkZXIge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbm8td3JhcCwgZmxlZC1lbmQsIHNwYWNlLWJldHdlZW4sIG51bGwpO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29sb3Jfc2Vjb25kYXJ5Ml9iZztcXHJcXG4gICAgaGVpZ2h0OiAzMTNweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgQGluY2x1ZGUgcGFkZGluZy1sZWZ0LWFuZC1yaWdodCgzMHB4KTtcXHJcXG5cXHJcXG4gICAgZGl2Om50aC1jaGlsZCgzKSB7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgaDEsXFxyXFxuICAgIGgyLFxcclxcbiAgICBoMyB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMSB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuNzcpO1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogLTE1cHg7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgyIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjU1KTtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250LXNpemUgLyAyKTtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3Jfc2Vjb25kYXJ5MjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9hYm91dCxcXHJcXG4gICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBudWxsLCBjZW50ZXIsIGZsZXgtc3RhcnQpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAzMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2Fib3V0IHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciB7XFxyXFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCB3cmFwLCBmbGVkLWVuZCwgc3BhY2UtYmV0d2VlbiwgY2VudGVyKTtcXHJcXG4gICAgICAgIHBhZGRpbmctdG9wOiAxNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciBoMSB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuMTUpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciBoMiB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuOCk7XFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udC1zaXplIC8gMi4yKTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9idXR0b24ge1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDtcXHJcXG5cXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXHJcXG4gICAgICAgIEBpbmNsdWRlIGZsZXgtYmFzaWMoY29sdW1uLCBudWxsLCBmbGVkLWVuZCwgc3BhY2UtYmV0d2VlbiwgY2VudGVyKTtcXHJcXG5cXHJcXG4gICAgICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGluaGVyaXQ7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwcHg7XFxyXFxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDIwMHB4O1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlcj4ucGhvdG9ncmFwaF9hYm91dCB7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogMDtcXHJcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfaGVhZGVyIGgxLFxcclxcbiAgICBoMixcXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlcj4ucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbn1cIixcIi5zZWxlY3RfYnV0dG9uIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24tY29udGVudDogZmxleC1lbmQ7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG5cXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcclxcbiAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDIpO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xcclxcbiAgICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNXB4O1xcclxcbiAgICBib3JkZXI6IG5vbmU7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogbm9uZTtcXHJcXG4gICAgd2lkdGg6IDE3MHB4O1xcclxcbiAgICBoZWlnaHQ6IDcwcHg7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXHJcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxyXFxuICAgIGNvbnRlbnQ6IFxcXCI+XFxcIjtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcclxcbiAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNDQpO1xcclxcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXHJcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RfZmlsdGVyIHtcXHJcXG5cXHJcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxufVxcclxcblxcclxcblxcclxcbi5zZWxlY3RfY29udGVudCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYmFja2dyb3VuZDogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1cHg7XFxyXFxuICAgIG1pbi13aWR0aDogMTYwcHg7XFxyXFxuICAgIGJveC1zaGFkb3c6IDBweCAycHggOHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxyXFxuICAgIHotaW5kZXg6IDE7XFxyXFxuXFxyXFxuXFxyXFxuICAgIC53aGl0ZWxpbmUge1xcclxcbiAgICAgICAgd2lkdGg6IDkwJTtcXHJcXG4gICAgICAgIGhlaWdodDogMXB4O1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogNSU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgYSB7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluO1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAyKTtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgICAgIHBhZGRpbmc6IDIwcHg7XFxyXFxuICAgICAgICB3aWR0aDogMTcwcHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDYwcHg7XFxyXFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhOmhvdmVyIHtcXHJcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2NvbnRlbnQge1xcclxcblxcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXHJcXG4gICAgdHJhbnNmb3JtOiByb3RhdGUoLTkwZGVnKTtcXHJcXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxyXFxufVwiLFwiLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbnVsbCwgZmxleC1zdGFydCwgc3BhY2UtYXJvdW5kLCBiYXNlbGluZSk7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIG1pbi13aWR0aDogMzc2cHg7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDg5cHg7XFxyXFxuICAgIGJvdHRvbTogMDtcXHJcXG4gICAgcmlnaHQ6IDM4cHg7XFxyXFxuICAgIHotaW5kZXg6IDI7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IC0yMnB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuICAgIC50b3RhbF9saWtlcyxcXHJcXG4gICAgLnByaWNlX3JhdGVfZGFpbHkge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjU1KTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzMXB4O1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgICAgICBwYWRkaW5nLXRvcDogMThweDtcXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAudG90YWxfbGlrZXM6YWZ0ZXIge1xcclxcbiAgICAgICAgcGFkZGluZy1sZWZ0OiA1cHg7XFxyXFxuICAgICAgICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41NSAqIDEuMzMpO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX3N0YXRpc3RpYyB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVwiLFwiLm1lZGlhX2NhcmQge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKGNvbHVtbiwgbnVsbCwgbnVsbCwgbnVsbCwgbnVsbCk7XFxyXFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXHJcXG4gICAgbWF4LXdpZHRoOiAzNTBweDtcXHJcXG5cXHJcXG4gICAgaW1nLFxcclxcbiAgICB2aWRlbyB7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcclxcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgICAgICBtYXgtaGVpZ2h0OiAzMDBweDtcXHJcXG4gICAgICAgIG1pbi1oZWlnaHQ6IDMwMHB4O1xcclxcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuXFxyXFxuICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiBib3gtc2hhZG93IDFzO1xcclxcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjUwKTtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcblxcclxcbiAgICAuZGV0YWlscyB7XFxyXFxuICAgICAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbnVsbCwgbnVsbCwgc3BhY2UtYmV0d2VlbiwgYmFzZWxpbmUpO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogNXB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGg2IHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X3NtYWxsO1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjUpO1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoNjpsYXN0LWNoaWxkOjphZnRlciB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNSAqIDEuMjUpO1xcclxcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xcclxcbiAgICAgICAgY29udGVudDogXFxcIuKZpVxcXCI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5tZWRpYV9jYXJkIGltZyxcXHJcXG4gICAgLm1lZGlhX2NhcmQge1xcclxcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgICB9XFxyXFxufVwiLFwiLy8vLyBNQUlOIFBBR0UgLy8vIFxcclxcbi5waG90b2dyYXBoZXJfc2VjdGlvbiB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxyXFxuICAgIGdhcDogNzBweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogNzVweDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogNzVweDtcXHJcXG59XFxyXFxuXFxyXFxuLy8vLy8gRU5EIE1BSU4gUEFHRSAvLyBcXHJcXG5cXHJcXG4vLy8vLy8vLy8vLy8vLy8vIFBIT1RPR1JBUEhFUiBQQUdFIC8vLy8vLy8gXFxyXFxuLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXHJcXG4gICAgbWFyZ2luOiAwIDEwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZmlsdGVyX3NlY3Rpb24ge1xcclxcbiAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKHJvdywgbnVsbCwgbnVsbCwgbnVsbCwgYmFzZWxpbmUpO1xcclxcbiAgICBtYXJnaW4tbGVmdDogMDtcXHJcXG5cXHJcXG4gICAgaDU6Zmlyc3QtY2hpbGQge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgICAgIG1hcmdpbi1yaWdodDogMjhweDtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X2JpZztcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udC1zaXplIC8gMik7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuc2VsZWN0X2ZpbHRlciB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi5tZWRpYV9zZWN0aW9uIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXHJcXG4gICAgcm93LWdhcDogMzBweDtcXHJcXG4gICAgY29sdW1uLWdhcDogOTVweDtcXHJcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgbWFyZ2luLWJvdHRvbTogNzVweDtcXHJcXG59XFxyXFxuXFxyXFxuLy8vLy8vLy8vLy8vLy8gRU5EIFBIT1RPR1JBUEhFUiBQQUdFIC8vLy8vLy8vXFxyXFxuXFxyXFxuLy8vLy8vLy8vLy8vLy8vLyA0MDQgUEFHRSAvLy8vLy8vIFxcclxcbi5FUlJPUl80MDQge1xcclxcbiAgICBtYXJnaW4tdG9wOiA1JTtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxyXFxuICAgIHBhZGRpbmc6IDQwcHg7XFxyXFxuXFxyXFxuICAgIGgxIHtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDUlO1xcclxcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICAgICAgZm9udC1zaXplOiAkZm9udF9zaXplICogMjtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDQwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgYSB7XFxyXFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICAgICAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBhOmhvdmVyIHtcXHJcXG4gICAgICAgIGNvbG9yOiBpbmhlcml0O1xcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbi8vLy8vLy8vLy8vLy8vIEVORCA0MDQgUEFHRSAvLy8vLy8vL1wiLFwiZm9vdGVyIHtcXHJcXG4gICAgaGVpZ2h0OiAycHg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGVmYXVsdF9jb2xvcjtcXHJcXG4gICAgbWFyZ2luLXRvcDogNzVweDtcXHJcXG59XCIsXCJAbWVkaWEgKG1pbi13aWR0aDogMjAwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5tZWRpYV9zZWN0aW9uIHtcXHJcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnIgMWZyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiAxMTAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9zZWN0aW9uLFxcclxcbiAgICAubWVkaWFfc2VjdGlvbiB7XFxyXFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxyXFxuXFxyXFxuICAgIGhlYWRlciB7XFxyXFxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogNDBweDtcXHJcXG4gICAgICAgIGhlaWdodDogMTAwcHg7XFxyXFxuXFxyXFxuICAgICAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgLmxvZ28sXFxyXFxuICAgICAgICBoMSB7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxyXFxuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS4yMCk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXHJcXG4gICAgICAgIG1hcmdpbjogMCAyMHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIC5maWx0ZXJfc2VjdGlvbiB7XFxyXFxuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoZXJfc2VjdGlvbiB7XFxyXFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXHJcXG5cXHJcXG4gICAgLm1lZGlhX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbM10hLi9tYWluLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVszXSEuL21haW4uc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL3NjcmlwdHMvcGFnZXMvcGhvdG9ncmFwaGVyLmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbImlzQ2FsbGFibGUiLCJyZXF1aXJlIiwidHJ5VG9TdHJpbmciLCIkVHlwZUVycm9yIiwiVHlwZUVycm9yIiwibW9kdWxlIiwiZXhwb3J0cyIsImFyZ3VtZW50IiwiaXNPYmplY3QiLCIkU3RyaW5nIiwiU3RyaW5nIiwidG9JbmRleGVkT2JqZWN0IiwidG9BYnNvbHV0ZUluZGV4IiwibGVuZ3RoT2ZBcnJheUxpa2UiLCJjcmVhdGVNZXRob2QiLCJJU19JTkNMVURFUyIsIiR0aGlzIiwiZWwiLCJmcm9tSW5kZXgiLCJPIiwibGVuZ3RoIiwiaW5kZXgiLCJ2YWx1ZSIsImluY2x1ZGVzIiwiaW5kZXhPZiIsInVuY3VycnlUaGlzIiwic2xpY2UiLCJ0b1N0cmluZyIsInN0cmluZ1NsaWNlIiwiaXQiLCJoYXNPd24iLCJvd25LZXlzIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlIiwiZGVmaW5lUHJvcGVydHlNb2R1bGUiLCJ0YXJnZXQiLCJzb3VyY2UiLCJleGNlcHRpb25zIiwia2V5cyIsImRlZmluZVByb3BlcnR5IiwiZiIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImkiLCJrZXkiLCJERVNDUklQVE9SUyIsImNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciIsIm9iamVjdCIsImJpdG1hcCIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIm1ha2VCdWlsdEluIiwibmFtZSIsImRlc2NyaXB0b3IiLCJnZXQiLCJnZXR0ZXIiLCJzZXQiLCJzZXR0ZXIiLCJkZWZpbmVHbG9iYWxQcm9wZXJ0eSIsIm9wdGlvbnMiLCJzaW1wbGUiLCJ1bmRlZmluZWQiLCJnbG9iYWwiLCJ1bnNhZmUiLCJlcnJvciIsIm5vbkNvbmZpZ3VyYWJsZSIsIm5vbldyaXRhYmxlIiwiT2JqZWN0IiwiZmFpbHMiLCJkb2N1bWVudCIsIkVYSVNUUyIsImNyZWF0ZUVsZW1lbnQiLCJ1c2VyQWdlbnQiLCJ0ZXN0IiwiY2xhc3NvZiIsInByb2Nlc3MiLCJnZXRCdWlsdEluIiwiRGVubyIsInZlcnNpb25zIiwidmVyc2lvbiIsInY4IiwibWF0Y2giLCJzcGxpdCIsImNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSIsImRlZmluZUJ1aWx0SW4iLCJjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzIiwiaXNGb3JjZWQiLCJUQVJHRVQiLCJHTE9CQUwiLCJTVEFUSUMiLCJzdGF0IiwiRk9SQ0VEIiwidGFyZ2V0UHJvcGVydHkiLCJzb3VyY2VQcm9wZXJ0eSIsInByb3RvdHlwZSIsImRvbnRDYWxsR2V0U2V0IiwiZm9yY2VkIiwic2hhbSIsImV4ZWMiLCJOQVRJVkVfQklORCIsIkZ1bmN0aW9uUHJvdG90eXBlIiwiRnVuY3Rpb24iLCJhcHBseSIsImNhbGwiLCJSZWZsZWN0IiwiYmluZCIsImFyZ3VtZW50cyIsImFDYWxsYWJsZSIsImZuIiwidGhhdCIsImhhc093blByb3BlcnR5IiwiZ2V0RGVzY3JpcHRvciIsIlBST1BFUiIsInNvbWV0aGluZyIsIkNPTkZJR1VSQUJMRSIsImFGdW5jdGlvbiIsIm5hbWVzcGFjZSIsIm1ldGhvZCIsImlzTnVsbE9yVW5kZWZpbmVkIiwiViIsIlAiLCJmdW5jIiwiY2hlY2siLCJNYXRoIiwiZ2xvYmFsVGhpcyIsIndpbmRvdyIsInNlbGYiLCJ0b09iamVjdCIsImEiLCIkT2JqZWN0IiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJzdG9yZSIsImZ1bmN0aW9uVG9TdHJpbmciLCJpbnNwZWN0U291cmNlIiwiTkFUSVZFX1dFQUtfTUFQIiwic2hhcmVkIiwic2hhcmVkS2V5IiwiaGlkZGVuS2V5cyIsIk9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEIiwiV2Vha01hcCIsImhhcyIsImVuZm9yY2UiLCJnZXR0ZXJGb3IiLCJUWVBFIiwic3RhdGUiLCJ0eXBlIiwid21nZXQiLCJ3bWhhcyIsIndtc2V0IiwibWV0YWRhdGEiLCJmYWNhZGUiLCJTVEFURSIsInJlcGxhY2VtZW50IiwiZmVhdHVyZSIsImRldGVjdGlvbiIsImRhdGEiLCJub3JtYWxpemUiLCJQT0xZRklMTCIsIk5BVElWRSIsInN0cmluZyIsInJlcGxhY2UiLCJ0b0xvd2VyQ2FzZSIsImRvY3VtZW50QWxsIiwiYWxsIiwiU1BFQ0lBTF9ET0NVTUVOVF9BTEwiLCJpc1Byb3RvdHlwZU9mIiwiVVNFX1NZTUJPTF9BU19VSUQiLCIkU3ltYm9sIiwidG9MZW5ndGgiLCJvYmoiLCJDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSIsIkludGVybmFsU3RhdGVNb2R1bGUiLCJlbmZvcmNlSW50ZXJuYWxTdGF0ZSIsImdldEludGVybmFsU3RhdGUiLCJDT05GSUdVUkFCTEVfTEVOR1RIIiwiVEVNUExBVEUiLCJhcml0eSIsImNvbnN0cnVjdG9yIiwiam9pbiIsImNlaWwiLCJmbG9vciIsInRydW5jIiwieCIsIm4iLCJJRThfRE9NX0RFRklORSIsIlY4X1BST1RPVFlQRV9ERUZJTkVfQlVHIiwiYW5PYmplY3QiLCJ0b1Byb3BlcnR5S2V5IiwiJGRlZmluZVByb3BlcnR5IiwiJGdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIkVOVU1FUkFCTEUiLCJXUklUQUJMRSIsIkF0dHJpYnV0ZXMiLCJjdXJyZW50IiwicHJvcGVydHlJc0VudW1lcmFibGVNb2R1bGUiLCJpbnRlcm5hbE9iamVjdEtleXMiLCJlbnVtQnVnS2V5cyIsImNvbmNhdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJwdXNoIiwibmFtZXMiLCJyZXN1bHQiLCIkcHJvcGVydHlJc0VudW1lcmFibGUiLCJOQVNIT1JOX0JVRyIsImlucHV0IiwicHJlZiIsInZhbCIsInZhbHVlT2YiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzTW9kdWxlIiwiaGFzSW5kaWNlcyIsImlnbm9yZUNhc2UiLCJtdWx0aWxpbmUiLCJkb3RBbGwiLCJ1bmljb2RlIiwidW5pY29kZVNldHMiLCJzdGlja3kiLCJ1aWQiLCJTSEFSRUQiLCJJU19QVVJFIiwibW9kZSIsImNvcHlyaWdodCIsImxpY2Vuc2UiLCJWOF9WRVJTSU9OIiwic3ltYm9sIiwiU3ltYm9sIiwiaHRtbCIsImFycmF5U2xpY2UiLCJ2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aCIsIklTX0lPUyIsIklTX05PREUiLCJzZXRJbW1lZGlhdGUiLCJjbGVhciIsImNsZWFySW1tZWRpYXRlIiwiRGlzcGF0Y2giLCJNZXNzYWdlQ2hhbm5lbCIsImNvdW50ZXIiLCJxdWV1ZSIsIk9OUkVBRFlTVEFURUNIQU5HRSIsImxvY2F0aW9uIiwiZGVmZXIiLCJjaGFubmVsIiwicG9ydCIsInJ1biIsImlkIiwicnVubmVyIiwibGlzdGVuZXIiLCJldmVudCIsInBvc3QiLCJwb3N0TWVzc2FnZSIsInByb3RvY29sIiwiaG9zdCIsImhhbmRsZXIiLCJhcmdzIiwibmV4dFRpY2siLCJub3ciLCJwb3J0MiIsInBvcnQxIiwib25tZXNzYWdlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImltcG9ydFNjcmlwdHMiLCJhcHBlbmRDaGlsZCIsInJlbW92ZUNoaWxkIiwic2V0VGltZW91dCIsInRvSW50ZWdlck9ySW5maW5pdHkiLCJtYXgiLCJtaW4iLCJpbnRlZ2VyIiwiSW5kZXhlZE9iamVjdCIsInJlcXVpcmVPYmplY3RDb2VyY2libGUiLCJudW1iZXIiLCJpc1N5bWJvbCIsImdldE1ldGhvZCIsIm9yZGluYXJ5VG9QcmltaXRpdmUiLCJ3ZWxsS25vd25TeW1ib2wiLCJUT19QUklNSVRJVkUiLCJleG90aWNUb1ByaW0iLCJ0b1ByaW1pdGl2ZSIsInBvc3RmaXgiLCJyYW5kb20iLCJOQVRJVkVfU1lNQk9MIiwiaXRlcmF0b3IiLCJwYXNzZWQiLCJyZXF1aXJlZCIsIldlbGxLbm93blN5bWJvbHNTdG9yZSIsInN5bWJvbEZvciIsImNyZWF0ZVdlbGxLbm93blN5bWJvbCIsIndpdGhvdXRTZXR0ZXIiLCJkZXNjcmlwdGlvbiIsImRlZmluZUJ1aWx0SW5BY2Nlc3NvciIsInJlZ0V4cEZsYWdzIiwiUmVnRXhwIiwiUmVnRXhwUHJvdG90eXBlIiwiSU5ESUNFU19TVVBQT1JUIiwiY2FsbHMiLCJleHBlY3RlZCIsImFkZEdldHRlciIsImNociIsInBhaXJzIiwiJCIsImNzc1dpdGhNYXBwaW5nVG9TdHJpbmciLCJsaXN0IiwibWFwIiwiaXRlbSIsImNvbnRlbnQiLCJuZWVkTGF5ZXIiLCJtb2R1bGVzIiwibWVkaWEiLCJkZWR1cGUiLCJzdXBwb3J0cyIsImxheWVyIiwiYWxyZWFkeUltcG9ydGVkTW9kdWxlcyIsImsiLCJfayIsImNzc01hcHBpbmciLCJidG9hIiwiYmFzZTY0IiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJKU09OIiwic3RyaW5naWZ5Iiwic291cmNlTWFwcGluZyIsInNvdXJjZVVSTHMiLCJzb3VyY2VzIiwic291cmNlUm9vdCIsInBob3RvZ3JhcGhlckZhY3RvcnkiLCJkaXNwbGF5RGF0YSIsInBob3RvZ3JhcGhlcnMiLCJwaG90b2dyYXBoZXJTZWxlY3RlZCIsImZvckVhY2giLCJwaG90b2dyYXBoZXIiLCJlbnYiLCJOT0RFX0VOViIsImNvbnNvbGUiLCJsb2ciLCJwaG90b2dyYXBoZXJNb2RlbCIsInNldFBob3RvZ3JhcGhlckhlYWRlciIsInNldFN0aWNreUJhclByaWNlIiwiZGlzcGxheURhdGFBbGwiLCJxdWVyeVNlbGVjdG9yIiwicGhvdG9ncmFwaGVyc1NlY3Rpb24iLCJ1c2VyQ2FyZERPTSIsImdldFVzZXJDYXJkRE9NIiwibWVkaWFGYWN0b3J5Iiwic2V0SW5uZXJIdG1sIiwiZGlzcGxheU1lZGlhIiwibWVkaWFzIiwicGhvdG9ncmFwaGVySWQiLCJ0b3RhbExpa2VzIiwic2VsZWN0ZWRNZWRpYSIsIm1lZGlhc1NlY3Rpb24iLCJtZWRpYU1vZGVsIiwibWVkaWFET00iLCJnZXRNZWRpYURPTSIsImxpa2VzIiwid2FybiIsImRvbSIsInRpdGxlIiwiaW1hZ2UiLCJ2aWRlbyIsIm1vdmllIiwicGljdHVyZSIsImhhc1Bob3RvZ3JhcGhlciIsImhhc0NvbnRlbnQiLCJhcnRpY2xlIiwic2V0QXR0cmlidXRlIiwibGlua0VsZW1lbnQiLCJidWlsZEVsZW1lbnQiLCJzZXRBcmlhbExhYmVsIiwiaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQiLCJpbnNlcnRWaWRlb0luc2lkZUVsZW1lbnQiLCJ0aXRsZV9oNiIsImxpa2VzX2g2IiwiaW5zZXJ0SFRNTEFmdGVyRWxlbWVudCIsImNpdHkiLCJjb3VudHJ5IiwidGFnbGluZSIsInBvcnRyYWl0IiwicHJpY2UiLCJpbWdQcm9maWxlIiwiZ2V0UGhvdG9ncmFwaGVycyIsImdldE1lZGlhcyIsImdldFVybFBhcmFtZXRlciIsInNvcnRCeUxpa2VzIiwic2VsZWN0RmlsdGVyQ29tcG9uZW50IiwibW9kYWxNYXN0ZXIiLCJpbml0UHJvZmlsZSIsImlkVVJMIiwiaW5pdENvbnRhY3RGb3JtIiwiaHJlZiIsImUiLCJjb250YWN0Rm9ybU1vZGFsIiwibW9kYWxQYWdlIiwiYWRkQ29udGFjdEZvcm1MaXN0ZW5lciIsInRpdGxlTW9kYWwiLCJzZXRUaXRsZU1vZGFsIiwiaW5pdExpZ2h0Ym94Iiwic2VsZWN0ZWRNZWRpYXMiLCJsaWdodEJveCIsImFkZExpZ2h0Ym94TGlzdGVuZXIiLCJpbml0TWVkaWEiLCJzb3J0QnkiLCJzb3J0IiwiaW5pdE1haW4iLCJlbGVtZW50IiwiYWx0IiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiYXJpYUxhYmVsIiwiYmFsaXNlIiwiYXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJhcmlhbGFiZWwiLCJ0ZXh0ZSIsInRleHRlRWxlbWVudCIsImlubmVySFRNTCIsImZldGNoSlNPTiIsInVybCIsInJlc3BvbnNlIiwiZmV0Y2giLCJvayIsIkVycm9yIiwianNvblJlc3BvbnNlIiwianNvbiIsInBhcmFtZXRlciIsImZ1bGxVcmwiLCJVUkwiLCJwYXJhbWV0ZXJWYWx1ZSIsInNlYXJjaFBhcmFtcyIsImJvZHlUYWciLCJoZWFkZXJUYWciLCJtYWluVGFnIiwibW9kYWxJRCIsImJhY2tncm91bmRQYWdlIiwiYm9keUhUTUwiLCJoZWFkZXJIVE1MIiwibWFpbkhUTUwiLCJtb2RhbEhUTUwiLCJnZXRFbGVtZW50QnlJZCIsInZpc2libGUiLCJvcGVuTW9kYWwiLCJjbG9zZU1vZGFsIiwicHJldmVudERlZmF1bHQiLCJzZW5kTWVzc2FnZSIsInF1ZXJ5U2VsZWN0b3JSZXF1ZXN0IiwicXVlcnlTZWxlY3RvckFsbCIsImxpbmsiLCJsb2FkTGlnaHRib3hDb250ZW50IiwiYWRkS2V5Ym9hcmRMaXN0ZW5lciIsIm9ua2V5ZG93biIsInRhcmdldFNlbGVjdG9yIiwiZWZmZWN0QW5pbWF0aW9uIiwiaGlkZWNsYXNzIiwic2hvd2NsYXNzIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwic3R5bGUiLCJkaXNwbGF5IiwiZm9jdXMiLCJyZW1vdmVBdHRyaWJ1dGUiLCJhbGxJbnB1dHMiLCJhbGxUZXh0QXJlYSIsImZ1bGxtZXNzYWdlIiwidGV4dGFyZWEiLCJhbGVydCIsInNvcnRCeURhdGUiLCJzb3J0QnlUaXRsZSIsInNlbGVjdEZpbHRlckJ1dHRvbiIsInNlbGVjdEZpbHRlclNlbGVjdDEiLCJzZWxlY3RGaWx0ZXJTZWxlY3QyIiwiaGFuZGxlRmlsdGVyQWN0aW9uIiwic2VsZWN0ZWRJdGVtIiwiYiIsImRhdGUiXSwic291cmNlUm9vdCI6IiJ9