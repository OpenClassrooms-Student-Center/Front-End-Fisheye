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
    const previous_button = document.getElementById("previous_link");
    const next_button = document.getElementById("next_link");
    const picture_selected = document.getElementById("picture_selected");
    const video_selected = document.getElementById("video_selected");

    if (true) {
      console.log("___LIGHTBOX___"); // console.log(modalPage);
      // console.log(link.id); // Event has be fired by this LINK (where Link ID = Media ID)
      // console.log(medias); // Medias that are displayed in order to the main page
    }
    /** GET THE PREVIOUS AND AFTER MEDIA THOUGH THE ARRAY */


    let previousID = 0;
    let nextID = 0;
    let actualID = 0;

    for (let i = 0; i < medias.length; i++) {
      if (medias[i].id == link.id) {
        previousID = medias[i - 1];
        nextID = medias[i + 1];
        actualID = medias[i];
        break;
      }
    }

    if (true) {
      console.log("____ ACTUAL ID_______");
      console.log(actualID);
      console.log("____ PREVIOUS ID_______");
      console.log(previousID);
      console.log("_______ NEXT ID _______");
      console.log(nextID);
    }
    /** END */

    /** SET TITLE FORM */


    setTitleModal(modalPage, "h2", actualID.title);
    /** END */

    /* REMOVE MEDIA */

    if (picture_selected) {
      picture_selected.remove();
    }

    if (video_selected) {
      video_selected.remove();
    }
    /** END */

    /** ADD MEDIA */


    if (actualID.video) {
      const video = `<video
                id="video_selected"
                autoplay
                loop
                muted
            >
                <source src="../../../assets/video/${actualID.video}" type="video/mp4">
            </video>`;
      previous_button.insertAdjacentHTML("afterend", video);
    }

    if (actualID.image) {
      const picture = `../../../assets/images/${actualID.image}`;
      previous_button.insertAdjacentHTML("afterend", `<img id="picture_selected" src="${picture}" alt="Lilac breasted roller">`);
    }
    /** END */

    /** SET ARROW PREVIOUS */

    /** END */

    /** SET ARROW NEXT  */

    /** END */

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
___CSS_LOADER_EXPORT___.push([module.id, "@charset \"UTF-8\";\n/** Used to load all variables for this project about SCSS **/ /** FONT **/\n/** END FONT **/\n/** COLOR VARIABLES **/\n/** END COLOR VARIABLES **/\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\n/********************** GENERAL **********************/\nhtml,\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: \"DM Sans\", sans-serif;\n  animation: 1s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/********************** END GENERAL **********************/\n/** IMPORT MIXIN **/\n/** IMPORT HEADER STYLES **/\nheader {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  height: 120px;\n}\nheader h1 {\n  color: #901C1C;\n  top: 44px;\n  margin-right: 100px;\n  font-weight: 400;\n  font-size: 36px;\n  line-height: 47px;\n}\nheader .logo,\nheader .logo_photographer {\n  height: 50px;\n}\nheader .logo {\n  margin-left: 115px;\n}\nheader .logo_photographer {\n  margin-left: 100px;\n  margin-top: 10px;\n}\n\n/** IMPORT PHOTOGRAPHERS CARDS **/\n.photographer_card {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  justify-self: center;\n}\n.photographer_card img {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  transition: box-shadow 1s;\n  height: 200px;\n  width: 200px;\n  border-radius: 50%;\n  object-fit: cover;\n}\n.photographer_card img:hover {\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.photographer_card h2,\n.photographer_card h3,\n.photographer_card h4,\n.photographer_card h5 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n}\n.photographer_card h2 {\n  margin-top: 20px;\n  color: #D3573C;\n  font-size: 36px;\n}\n.photographer_card h3 {\n  font-size: 13.0010834236px;\n  line-height: 17px;\n  color: #901C1C;\n}\n.photographer_card h4 {\n  margin-top: 2px;\n  font-size: 10px;\n  line-height: 13px;\n  color: #000000;\n}\n.photographer_card h5 {\n  margin-top: 2px;\n  font-size: 9px;\n  line-height: 12px;\n  text-align: center;\n  color: #757575;\n}\n\n@media (max-width: 1100px) {\n  .photographer_card h3 {\n    font-size: 16.9014084507px;\n    margin-top: 10px;\n  }\n  .photographer_card h4 {\n    font-size: 13px;\n    margin-top: 10px;\n  }\n  .photographer_card h5 {\n    font-size: 11.7px;\n    margin-top: 10px;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_card h3 {\n    font-size: 19.5016251354px;\n  }\n  .photographer_card h4 {\n    font-size: 15px;\n  }\n  .photographer_card h5 {\n    font-size: 13.5px;\n  }\n  .photographer_card img {\n    width: 230px;\n    height: 230px;\n  }\n}\n/** IMPORT MODAL COMPONENT **/\n.modal_contact {\n  display: none;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  border-radius: 5px;\n  background-color: #DB8876;\n  padding: 35px;\n  margin: auto;\n  width: 50%;\n  transition: width 0.5s ease-in;\n}\n.modal_contact .modal_header {\n  justify-content: space-between;\n  width: 100%;\n  margin-top: -20px;\n  margin-bottom: 10px;\n  display: flex;\n  align-items: baseline;\n}\n.modal_contact .modal_header #closeModal {\n  cursor: pointer;\n  transition: filter 0.5s ease-in;\n}\n.modal_contact .modal_header #closeModal:hover {\n  filter: brightness(0) saturate(100%);\n}\n.modal_contact .modal_header .text_header {\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n.modal_contact .modal_header h2 {\n  font-size: 63.72px;\n  font-weight: normal;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-align: left;\n}\n.modal_contact form input {\n  font-size: 30px;\n  margin-bottom: 5px;\n  padding: 10px;\n}\n.modal_contact form textarea {\n  margin-top: 15px;\n  font-size: 24px;\n  margin-bottom: 20px;\n  resize: vertical;\n}\n.modal_contact form input,\n.modal_contact form textarea {\n  width: 100%;\n  height: 68px;\n  border: none;\n  border-radius: 5px;\n}\n.modal_contact form label {\n  color: #000000;\n  font-size: 36px;\n}\n.modal_contact form label:last-child {\n  margin-top: 15px;\n}\n.modal_contact .help_blind {\n  display: none;\n}\n\n.hide_content {\n  animation: 0.5s ease-in forwards fade-off;\n}\n@keyframes fade-off {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.4;\n  }\n}\n\n.show_content {\n  animation: 0.5s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0.4;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@media (max-width: 1100px) {\n  .modal_contact {\n    width: 70%;\n  }\n  .modal_contact .modal_header h2 {\n    font-size: 50.4px;\n  }\n  .modal_contact form label {\n    font-size: 32.7272727273px;\n  }\n  .modal_contact form input {\n    font-size: 27.6923076923px;\n  }\n  .modal_contact form textarea {\n    font-size: 22.5px;\n  }\n}\n@media (max-width: 800px) {\n  .modal_contact {\n    width: 90%;\n  }\n  .modal_contact .modal_header h2 {\n    font-size: 43.2px;\n  }\n  .modal_contact form label {\n    font-size: 27.6923076923px;\n  }\n  .modal_contact form input {\n    font-size: 24px;\n  }\n  .modal_contact form textarea {\n    font-size: 20px;\n  }\n}\n.modal_lightbox {\n  display: none;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  transition: width 0.5s ease-in;\n}\n.modal_lightbox .content_media {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 700px;\n  width: 500px;\n}\n.modal_lightbox #video_selected,\n.modal_lightbox #picture_selected {\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\n  border-radius: 5px;\n  margin: auto;\n  height: inherit;\n  min-width: 500px;\n  object-fit: cover;\n}\n.modal_lightbox a {\n  text-decoration: none;\n  font-size: 90px;\n  color: #901C1C;\n  transition: color 0.5s ease-in;\n  padding: 25px;\n}\n.modal_lightbox a:hover {\n  color: #DB8876;\n}\n.modal_lightbox .closeLightbox {\n  filter: brightness(0) saturate(100%) invert(18%) sepia(31%) saturate(4597%) hue-rotate(344deg) brightness(93%) contrast(95%);\n  position: absolute;\n  top: 10px;\n  right: -70px;\n  cursor: pointer;\n  transition: filter 0.5s ease-in;\n}\n.modal_lightbox .closeLightbox:hover {\n  filter: brightness(0) saturate(100%) invert(63%) sepia(43%) saturate(448%) hue-rotate(323deg) brightness(89%) contrast(92%);\n}\n.modal_lightbox h2 {\n  color: #901C1C;\n  font-size: 24px;\n}\n.modal_lightbox .help_blind {\n  display: none;\n}\n\n.hide_content {\n  animation: 0.5s ease-in forwards fade-off;\n}\n@keyframes fade-off {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.4;\n  }\n}\n\n.show_content {\n  animation: 0.5s ease-in forwards fade-in;\n}\n@keyframes fade-in {\n  0% {\n    opacity: 0.4;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n/** IMPORT CONTACT BUTTON COMPONENT **/\n.fisheye_button {\n  font-size: 20px;\n  font-weight: 700;\n  font-family: \"DM Sans\", sans-serif;\n  color: white;\n  padding: 11px;\n  min-width: 170px;\n  min-height: 70px;\n  border: none;\n  background-color: #901C1C;\n  border-radius: 5px;\n  cursor: pointer;\n  transition: color 0.5s ease-in, background-color 0.5s ease-in;\n}\n.fisheye_button:hover {\n  color: #000000;\n  background-color: #DB8876;\n}\n\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\n.photograph_header {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: no-wrap;\n  align-content: fled-end;\n  justify-content: space-between;\n  background-color: #FAFAFA;\n  height: 313px;\n  margin-top: 10px;\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.photograph_header div:nth-child(3) {\n  margin-right: 20px;\n}\n.photograph_header h1,\n.photograph_header h2,\n.photograph_header h3 {\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 400;\n}\n.photograph_header h1 {\n  font-size: 63.72px;\n  margin-bottom: -15px;\n  color: #D3573C;\n}\n.photograph_header h2 {\n  margin-top: 15px;\n  margin-bottom: 20px;\n  font-size: 23.2258064516px;\n  color: #901C1C;\n}\n.photograph_header h3 {\n  font-size: 18px;\n  color: #525252;\n}\n.photograph_header .photograph_about,\n.photograph_header .photograph_button {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: flex-start;\n}\n.photograph_header .photograph_button {\n  margin-top: 30px;\n  margin-right: 80px;\n}\n.photograph_header .photograph_about {\n  margin-left: 20px;\n  margin-bottom: 10px;\n}\n\n@media (max-width: 1100px) {\n  .photograph_header {\n    background-color: white;\n    display: flex;\n    flex-direction: column;\n    flex-wrap: wrap;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n    padding-top: 15px;\n  }\n  .photograph_header h1 {\n    font-size: 41.4px;\n  }\n  .photograph_header h2 {\n    font-size: 20px;\n  }\n  .photograph_header h3 {\n    font-size: 16.3636363636px;\n  }\n  .photograph_button {\n    margin-bottom: 30px;\n  }\n}\n@media (max-width: 800px) {\n  .photograph_header {\n    display: flex;\n    flex-direction: column;\n    align-content: fled-end;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .photograph_header .photograph_button {\n    align-items: inherit;\n    margin-right: 0px;\n    position: absolute;\n    margin-top: 200px;\n  }\n  .photograph_header > .photograph_about {\n    margin-left: 0;\n    align-items: center;\n  }\n  .photograph_header h1,\nh2,\nh3 {\n    text-align: center;\n  }\n  .photograph_header > .photographer_card {\n    display: none;\n  }\n}\n/** IMPORT SELECT FILTER COMPONENT **/\n.select_button {\n  display: flex;\n  align-content: flex-end;\n  align-items: center;\n  justify-content: space-between;\n  text-align: left;\n  padding-left: 20px;\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 18px;\n  background: #901C1C;\n  color: white;\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border: none;\n  border-color: none;\n  width: 170px;\n  height: 70px;\n  cursor: pointer;\n}\n\n.select_button::after {\n  transition: transform 0.25s ease-in;\n  content: \">\";\n  transform: rotate(90deg);\n  font-size: 25px;\n  text-align: right;\n  float: right;\n  margin-right: 20px;\n}\n\n.select_filter {\n  position: relative;\n  display: inline-block;\n}\n\n.select_content {\n  display: none;\n  position: absolute;\n  background: #901C1C;\n  border-bottom-left-radius: 5px;\n  border-bottom-right-radius: 5px;\n  min-width: 160px;\n  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\n  z-index: 1;\n}\n.select_content .whiteline {\n  width: 90%;\n  height: 1px;\n  background-color: white;\n  margin-left: 5%;\n}\n.select_content a {\n  transition: all 0.5s ease-in;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-size: 18px;\n  color: white;\n  padding: 20px;\n  width: 170px;\n  height: 60px;\n  text-decoration: none;\n  display: block;\n}\n.select_content a:hover {\n  cursor: pointer;\n  transition: all 0.5s ease-in;\n  color: #000000;\n}\n\n.select_filter:hover .select_content {\n  display: block;\n}\n\n.select_filter:hover .select_button::after {\n  transform: rotate(-90deg);\n  transition: transform 0.25s ease-in;\n}\n\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\n.photographer_statistic {\n  display: flex;\n  flex-direction: row;\n  align-content: flex-start;\n  justify-content: space-around;\n  align-items: baseline;\n  position: fixed;\n  background-color: #DB8876;\n  min-width: 376px;\n  min-height: 89px;\n  bottom: 0;\n  right: 38px;\n  z-index: 2;\n  margin-bottom: -22px;\n  border-radius: 5px;\n}\n.photographer_statistic .total_likes,\n.photographer_statistic .price_rate_daily {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 700;\n  font-size: 23.2258064516px;\n  line-height: 31px;\n  color: #000000;\n  padding-top: 18px;\n}\n.photographer_statistic .total_likes:after {\n  padding-left: 5px;\n  content: \"♥\";\n  font-size: 30.8903225806px;\n}\n\n@media (max-width: 700px) {\n  .photographer_statistic {\n    display: none;\n  }\n}\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\n.media_card {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  max-width: 350px;\n}\n.media_card img,\n.media_card video {\n  transition: box-shadow 1s;\n  width: 100%;\n  max-height: 300px;\n  min-height: 300px;\n  object-fit: cover;\n  border-radius: 5px;\n}\n.media_card img:hover,\n.media_card video:hover {\n  transition: box-shadow 1s;\n  cursor: pointer;\n  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);\n}\n.media_card .details {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: baseline;\n  margin-top: 5px;\n}\n.media_card h6 {\n  font-family: \"DM Sans\", sans-serif;\n  font-style: normal;\n  font-weight: 400;\n  font-size: 24px;\n  color: #901C1C;\n}\n.media_card h6:last-child::after {\n  font-size: 30px;\n  padding-left: 10px;\n  content: \"♥\";\n}\n\n@media (max-width: 600px) {\n  .media_card img,\n.media_card {\n    max-width: 100%;\n  }\n}\n/** IMPORT PAGES (other) Styles **/\n.photographer_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  gap: 70px;\n  margin-top: 75px;\n  margin-bottom: 75px;\n}\n\n.margin_left_right {\n  margin: 0 100px;\n}\n\n.filter_section {\n  display: flex;\n  flex-direction: row;\n  align-items: baseline;\n  margin-left: 0;\n}\n.filter_section h5:first-child {\n  margin-top: 20px;\n  margin-right: 28px;\n  font-family: \"DM Sans\", sans-serif;\n  font-weight: 700;\n  font-style: normal;\n  font-size: 18px;\n  color: #000000;\n}\n.filter_section .select_filter {\n  margin-top: 10px;\n}\n\n.media_section {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  row-gap: 30px;\n  column-gap: 95px;\n  margin-top: 20px;\n  margin-bottom: 75px;\n}\n\n.ERROR_404 {\n  margin-top: 5%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: space-around;\n  padding: 40px;\n}\n.ERROR_404 h1 {\n  margin-bottom: 5%;\n  text-align: center;\n  font-size: 72px;\n  margin-bottom: 40px;\n}\n.ERROR_404 a {\n  text-decoration: none;\n  color: inherit;\n}\n.ERROR_404 a:hover {\n  color: inherit;\n}\n\n/** IMPORT FOOTER STYLES **/\nfooter {\n  height: 2px;\n  width: 100%;\n  background-color: white;\n  margin-top: 75px;\n}\n\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\n (components Elements got their own Responsive Rules in their Stylesheet) **/\n@media (min-width: 2000px) {\n  .media_section {\n    grid-template-columns: 1fr 1fr 1fr 1fr;\n  }\n}\n@media (max-width: 1100px) {\n  .photographer_section,\n.media_section {\n    grid-template-columns: 1fr 1fr;\n  }\n}\n@media (max-width: 800px) {\n  header {\n    flex-direction: column;\n    margin-top: 40px;\n    height: 100px;\n  }\n  header .logo_photographer {\n    margin-left: 0;\n  }\n  header .logo,\nheader h1 {\n    margin-left: 20px;\n    margin-right: 20px;\n    font-size: 30px;\n  }\n  .margin_left_right {\n    margin: 0 20px;\n  }\n  .filter_section {\n    justify-content: space-between;\n  }\n}\n@media (max-width: 700px) {\n  .photographer_section {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 600px) {\n  .media_section {\n    grid-template-columns: 1fr;\n  }\n}", "",{"version":3,"sources":["webpack://./src/scss/main.scss","webpack://./src/scss/_variables.scss","webpack://./src/scss/_global.scss","webpack://./src/scss/pages/_header.scss","webpack://./src/scss/_mixin.scss","webpack://./src/scss/components/_photographer_cards.scss","webpack://./src/scss/components/modal/_contact.scss","webpack://./src/scss/components/modal/_lightbox.scss","webpack://./src/scss/components/_fisheye_button.scss","webpack://./src/scss/components/_photograph_header.scss","webpack://./src/scss/components/_select_filter.scss","webpack://./src/scss/components/_photographer_statistic.scss","webpack://./src/scss/components/_media_cards.scss","webpack://./src/scss/pages/_pages.scss","webpack://./src/scss/pages/_footer.scss","webpack://./src/scss/_responsive.scss"],"names":[],"mappings":"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","sourcesContent":["/** Used to load all variables for this project about SCSS **/\r\n@import \"_variables.scss\";\r\n/** IMPORT GLOBAL CSS FOR FONTS HTML,* SELECTOR **/\r\n@import \"_global.scss\";\r\n/** IMPORT MIXIN **/\r\n@import \"_mixin.scss\";\r\n/** IMPORT HEADER STYLES **/\r\n@import \"pages/header.scss\";\r\n/** IMPORT PHOTOGRAPHERS CARDS **/\r\n@import \"components/photographer_cards.scss\";\r\n/** IMPORT MODAL COMPONENT **/\r\n@import \"components/modal/_contact.scss\";\r\n@import \"components/modal/_lightbox.scss\";\r\n/** IMPORT CONTACT BUTTON COMPONENT **/\r\n@import \"components/fisheye_button.scss\";\r\n/** IMPORT PHOTOGRAPH HEADER COMPONENT **/\r\n@import \"components/photograph_header.scss\";\r\n/** IMPORT SELECT FILTER COMPONENT **/\r\n@import \"components/select_filter.scss\";\r\n/** IMPORT PHOTOGRAPHER STATISTIC COMPONENT **/\r\n@import \"components/photographer_statistic.scss\";\r\n/** IMPORT PHOTOGRAPHER MEDIA CARDS COMPONENT **/\r\n@import \"components/media_cards.scss\";\r\n/** IMPORT PAGES (other) Styles **/\r\n@import \"pages/pages.scss\";\r\n/** IMPORT FOOTER STYLES **/\r\n@import \"pages/footer.scss\";\r\n/** IMPORT RESPONSIVE STYLES for Non Components Elements\r\n (components Elements got their own Responsive Rules in their Stylesheet) **/\r\n@import \"_responsive.scss\";","/** FONT **/\r\n$font_global: \"DM Sans\", sans-serif;\r\n$font_weight_small: 400;\r\n$font_weight_big: 700;\r\n\r\n$font_size: 36px;\r\n/** END FONT **/\r\n\r\n/** COLOR VARIABLES **/\r\n$default_color: white;\r\n$default_font_color: #000000;\r\n$color_gray: #757575;\r\n$color_primary1: #901C1C;\r\n$color_primary2: #D3573C;\r\n$color_secondary2: #525252;\r\n$color_secondary2_bg: #FAFAFA;\r\n$color_background: #DB8876;\r\n/** END COLOR VARIABLES **/","/********************** GENERAL **********************/\r\nhtml,\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n\r\n}\r\n\r\nbody {\r\n  font-family: $font_global;\r\n  animation: 1s ease-in forwards fade-in;\r\n\r\n  @keyframes fade-in {\r\n    0% {\r\n      opacity: 0;\r\n    }\r\n\r\n    100% {\r\n      opacity: 1.0;\r\n    }\r\n  }\r\n}\r\n\r\n\r\n/********************** END GENERAL **********************/","header {\r\n    @include flex-basic(row, null, null, space-between, center);\r\n    height: 120px;\r\n\r\n\r\n    h1 {\r\n        color: $color_primary1;\r\n        top: 44px;\r\n        margin-right: 100px;\r\n        font-weight: $font_weight_small;\r\n        font-size: $font_size;\r\n        line-height: 47px;\r\n    }\r\n\r\n    .logo,\r\n    .logo_photographer {\r\n        height: 50px;\r\n    }\r\n\r\n    .logo {\r\n        margin-left: 115px;\r\n    }\r\n\r\n    .logo_photographer {\r\n        margin-left: 100px;\r\n        margin-top: 10px;\r\n    }\r\n}","@mixin flex-basic($flex-direction,\r\n  $flex-wrap,\r\n  $align-content,\r\n  $justify-content,\r\n  $align-items) {\r\n  display: flex;\r\n  flex-direction: $flex-direction;\r\n\r\n  @if ($flex-wrap) {\r\n    flex-wrap: $flex-wrap;\r\n  }\r\n\r\n  @if ($align-content) {\r\n    align-content: $align-content;\r\n  }\r\n\r\n  @if ($justify-content) {\r\n    justify-content: $justify-content;\r\n  }\r\n\r\n  @if ($align-items) {\r\n    align-items: $align-items;\r\n  }\r\n}\r\n\r\n// @mixin mask-crossbrowser($value) {\r\n//   -webkit-mask: $value;\r\n//   mask: $value;\r\n// }\r\n\r\n// @mixin margin-left-and-right($value) {\r\n//   margin-left: $value;\r\n//   margin-right: $value;\r\n// }\r\n\r\n@mixin padding-left-and-right($value) {\r\n  padding-left: $value;\r\n  padding-right: $value;\r\n}",".photographer_card {\r\n    @include flex-basic(column, null, null, center, center);\r\n    justify-self: center;\r\n\r\n    img {\r\n        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n        transition: box-shadow 1s;\r\n        height: 200px;\r\n        width: 200px;\r\n        border-radius: 50%;\r\n        object-fit: cover;\r\n\r\n        &:hover {\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n    h2,\r\n    h3,\r\n    h4,\r\n    h5 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 20px;\r\n        color: $color_primary2;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font_size / 2.769);\r\n        line-height: 17px;\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h4 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 3.6);\r\n        line-height: 13px;\r\n        color: $default_font_color;\r\n    }\r\n\r\n    h5 {\r\n        margin-top: 2px;\r\n        font-size: calc($font_size / 4);\r\n        line-height: 12px;\r\n        text-align: center;\r\n        color: $color_gray;\r\n    }\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.3);\r\n            margin-top: 10px;\r\n        }\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_card {\r\n        h3 {\r\n            font-size: calc($font_size / 2.769 * 1.5);\r\n        }\r\n\r\n        h4 {\r\n            font-size: calc($font_size / 3.6 * 1.5);\r\n        }\r\n\r\n        h5 {\r\n            font-size: calc($font_size / 4 * 1.5);\r\n        }\r\n\r\n        img {\r\n            width: 230px;\r\n            height: 230px;\r\n        }\r\n    }\r\n\r\n}",".modal_contact {\r\n    display: none;\r\n    position: fixed;\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n    border-radius: 5px;\r\n    background-color: $color_background;\r\n    padding: 35px;\r\n    margin: auto;\r\n    width: 50%;\r\n    transition: width 0.5s ease-in;\r\n\r\n\r\n    .modal_header {\r\n        justify-content: space-between;\r\n        width: 100%;\r\n        margin-top: -20px;\r\n        margin-bottom: 10px;\r\n        display: flex;\r\n        align-items: baseline;\r\n\r\n        #closeModal {\r\n            // Close Modal Picture\r\n            cursor: pointer;\r\n            transition: filter 0.5s ease-in;\r\n\r\n            &:hover {\r\n                filter: brightness(0) saturate(100%);\r\n            }\r\n        }\r\n\r\n        .text_header {\r\n            display: flex;\r\n            flex-direction: column;\r\n            overflow: hidden;\r\n        }\r\n\r\n        h2 {\r\n            font-size: calc($font_size * 1.77);\r\n            font-weight: normal;\r\n            white-space: nowrap;\r\n            overflow: hidden;\r\n            text-overflow: ellipsis;\r\n            text-align: left;\r\n        }\r\n    }\r\n\r\n    form input {\r\n        font-size: calc($font_size / 1.2);\r\n        margin-bottom: 5px;\r\n        padding: 10px;\r\n    }\r\n\r\n    form textarea {\r\n        margin-top: 15px;\r\n        font-size: calc($font_size /1.5);\r\n        margin-bottom: 20px;\r\n        resize: vertical;\r\n    }\r\n\r\n    form input,\r\n    form textarea {\r\n\r\n        width: 100%;\r\n        height: 68px;\r\n        border: none;\r\n        border-radius: 5px;\r\n\r\n    }\r\n\r\n\r\n    form label {\r\n        color: $default_font_color;\r\n        font-size: $font_size;\r\n    }\r\n\r\n    form label:last-child {\r\n        margin-top: 15px;\r\n    }\r\n\r\n    .help_blind {\r\n        display: none;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n.hide_content {\r\n    animation: 0.5s ease-in forwards fade-off;\r\n\r\n    @keyframes fade-off {\r\n        0% {\r\n            opacity: 1.0;\r\n        }\r\n\r\n        100% {\r\n            opacity: 0.4;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\r\n.show_content {\r\n    animation: 0.5s ease-in forwards fade-in;\r\n\r\n    @keyframes fade-in {\r\n        0% {\r\n            opacity: 0.4;\r\n        }\r\n\r\n        100% {\r\n            opacity: 1.0;\r\n        }\r\n    }\r\n\r\n\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n\r\n    .modal_contact {\r\n        width: 70%;\r\n\r\n        .modal_header {\r\n            h2 {\r\n                font-size: calc($font_size * 1.4);\r\n            }\r\n        }\r\n\r\n        form label {\r\n            font-size: calc($font_size / 1.1);\r\n        }\r\n\r\n        form input {\r\n            font-size: calc($font_size / 1.3);\r\n        }\r\n\r\n        form textarea {\r\n            font-size: calc($font_size / 1.6);\r\n\r\n        }\r\n\r\n    }\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .modal_contact {\r\n        width: 90%;\r\n\r\n\r\n        .modal_header {\r\n            h2 {\r\n                font-size: calc($font_size * 1.2);\r\n            }\r\n        }\r\n\r\n        form label {\r\n            font-size: calc($font_size / 1.3);\r\n        }\r\n\r\n        form input {\r\n            font-size: calc($font_size / 1.5);\r\n        }\r\n\r\n        form textarea {\r\n            font-size: calc($font_size / 1.8);\r\n\r\n        }\r\n    }\r\n}",".modal_lightbox {\r\n    display: none;\r\n    position: fixed;\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n    transition: width 0.5s ease-in;\r\n\r\n\r\n    .content_media {\r\n        display: flex;\r\n        justify-content: center;\r\n        align-items: center;\r\n        height: 700px;\r\n        width: 500px;\r\n    }\r\n\r\n\r\n\r\n    #video_selected,\r\n    #picture_selected {\r\n        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);\r\n        border-radius: 5px;\r\n        margin: auto;\r\n\r\n        height: inherit;\r\n        min-width: 500px;\r\n        object-fit: cover;\r\n    }\r\n\r\n  \r\n\r\n    a {\r\n        text-decoration: none;\r\n        font-size: calc($font_size * 2.5);\r\n        color: $color_primary1;\r\n        transition: color 0.5s ease-in;\r\n        padding: 25px;\r\n\r\n        &:hover {\r\n            color: $color_background;\r\n        }\r\n    }\r\n\r\n    .closeLightbox {\r\n        filter: brightness(0) saturate(100%) invert(18%) sepia(31%) saturate(4597%) hue-rotate(344deg) brightness(93%) contrast(95%);\r\n        // to target color CF: https: //codepen.io/sosuke/pen/Pjoqqp\r\n        position: absolute;\r\n        top: 10px;\r\n        right: -70px;\r\n        cursor: pointer;\r\n        transition: filter 0.5s ease-in;\r\n\r\n        &:hover {\r\n            filter: brightness(0) saturate(100%) invert(63%) sepia(43%) saturate(448%) hue-rotate(323deg) brightness(89%) contrast(92%);\r\n        }\r\n    }\r\n\r\n\r\n    h2 {\r\n        color: $color_primary1;\r\n        font-size: 24px;\r\n    }\r\n\r\n\r\n\r\n    .help_blind {\r\n        display: none;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n.hide_content {\r\n    animation: 0.5s ease-in forwards fade-off;\r\n\r\n    @keyframes fade-off {\r\n        0% {\r\n            opacity: 1.0;\r\n        }\r\n\r\n        100% {\r\n            opacity: 0.4;\r\n        }\r\n    }\r\n}\r\n\r\n\r\n\r\n.show_content {\r\n    animation: 0.5s ease-in forwards fade-in;\r\n\r\n    @keyframes fade-in {\r\n        0% {\r\n            opacity: 0.4;\r\n        }\r\n\r\n        100% {\r\n            opacity: 1.0;\r\n        }\r\n    }\r\n\r\n\r\n}",".fisheye_button {\r\n    font-size: calc($font_size / 1.8);\r\n    font-weight: $font_weight_big;\r\n    font-family: $font_global;\r\n    color: $default_color;\r\n    padding: 11px;\r\n    min-width: 170px;\r\n    min-height: 70px;\r\n    border: none;\r\n    background-color: $color_primary1;\r\n    border-radius: 5px;\r\n    cursor: pointer;\r\n    transition: color 0.5s ease-in, background-color 0.5s ease-in;\r\n\r\n    &:hover {\r\n        color: $default_font_color;\r\n        background-color: $color_background;\r\n    }\r\n}",".photograph_header {\r\n    @include flex-basic(row, no-wrap, fled-end, space-between, null);\r\n    background-color: $color_secondary2_bg;\r\n    height: 313px;\r\n    margin-top: 10px;\r\n    @include padding-left-and-right(30px);\r\n\r\n    div:nth-child(3) {\r\n        margin-right: 20px;\r\n    }\r\n\r\n\r\n    h1,\r\n    h2,\r\n    h3 {\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_small;\r\n    }\r\n\r\n    h1 {\r\n        font-size: calc($font_size * 1.77);\r\n        margin-bottom: -15px;\r\n        color: $color_primary2;\r\n    }\r\n\r\n    h2 {\r\n        margin-top: 15px;\r\n        margin-bottom: 20px;\r\n        font-size: calc($font_size / 1.55);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h3 {\r\n        font-size: calc($font-size / 2);\r\n        color: $color_secondary2;\r\n    }\r\n\r\n    .photograph_about,\r\n    .photograph_button {\r\n        @include flex-basic(column, null, null, center, flex-start);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-top: 30px;\r\n        margin-right: 80px;\r\n    }\r\n\r\n    .photograph_about {\r\n        margin-left: 20px;\r\n        margin-bottom: 10px;\r\n    }\r\n}\r\n\r\n\r\n@media (max-width: 1100px) {\r\n    .photograph_header {\r\n        background-color: $default_color;\r\n        @include flex-basic(column, wrap, fled-end, space-between, center);\r\n        padding-top: 15px;\r\n    }\r\n\r\n    .photograph_header h1 {\r\n        font-size: calc($font_size * 1.15);\r\n    }\r\n\r\n    .photograph_header h2 {\r\n        font-size: calc($font_size / 1.8);\r\n\r\n    }\r\n\r\n    .photograph_header h3 {\r\n        font-size: calc($font-size / 2.2);\r\n    }\r\n\r\n    .photograph_button {\r\n        margin-bottom: 30px;\r\n\r\n\r\n    }\r\n\r\n\r\n}\r\n\r\n@media (max-width: 800px) {\r\n    .photograph_header {\r\n        @include flex-basic(column, null, fled-end, space-between, center);\r\n\r\n        .photograph_button {\r\n            align-items: inherit;\r\n            margin-right: 0px;\r\n            position: absolute;\r\n            margin-top: 200px;\r\n        }\r\n\r\n    }\r\n\r\n    .photograph_header>.photograph_about {\r\n        margin-left: 0;\r\n        align-items: center;\r\n    }\r\n\r\n    .photograph_header h1,\r\n    h2,\r\n    h3 {\r\n        text-align: center;\r\n    }\r\n\r\n    .photograph_header>.photographer_card {\r\n        display: none;\r\n    }\r\n\r\n\r\n}",".select_button {\r\n    display: flex;\r\n    align-content: flex-end;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n\r\n    text-align: left;\r\n    padding-left: 20px;\r\n    font-family: $font_global;\r\n    font-style: normal;\r\n    font-weight: $font_weight_big;\r\n    font-size: calc($font_size / 2);\r\n    background: $color_primary1;\r\n    color: $default_color;\r\n    border-top-left-radius: 5px;\r\n    border-top-right-radius: 5px;\r\n    border: none;\r\n    border-color: none;\r\n    width: 170px;\r\n    height: 70px;\r\n    cursor: pointer;\r\n}\r\n\r\n.select_button::after {\r\n    transition: transform 0.25s ease-in;\r\n    content: \">\";\r\n    transform: rotate(90deg);\r\n    font-size: calc($font_size / 1.44);\r\n    text-align: right;\r\n    float: right;\r\n    margin-right: 20px;\r\n\r\n}\r\n\r\n.select_filter {\r\n\r\n    position: relative;\r\n    display: inline-block;\r\n}\r\n\r\n\r\n.select_content {\r\n    display: none;\r\n    position: absolute;\r\n    background: $color_primary1;\r\n    border-bottom-left-radius: 5px;\r\n    border-bottom-right-radius: 5px;\r\n    min-width: 160px;\r\n    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);\r\n    z-index: 1;\r\n\r\n\r\n    .whiteline {\r\n        width: 90%;\r\n        height: 1px;\r\n        background-color: $default_color;\r\n        margin-left: 5%;\r\n    }\r\n\r\n    a {\r\n        transition: all 0.5s ease-in;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 2);\r\n        color: $default_color;\r\n        padding: 20px;\r\n        width: 170px;\r\n        height: 60px;\r\n        text-decoration: none;\r\n        display: block;\r\n    }\r\n\r\n    a:hover {\r\n        cursor: pointer;\r\n        transition: all 0.5s ease-in;\r\n        color: $default_font_color;\r\n    }\r\n\r\n\r\n\r\n}\r\n\r\n\r\n.select_filter:hover .select_content {\r\n\r\n    display: block;\r\n}\r\n\r\n.select_filter:hover .select_button::after {\r\n    transform: rotate(-90deg);\r\n    transition: transform 0.25s ease-in;\r\n}",".photographer_statistic {\r\n    @include flex-basic(row, null, flex-start, space-around, baseline);\r\n    position: fixed;\r\n    background-color: $color_background;\r\n    min-width: 376px;\r\n    min-height: 89px;\r\n    bottom: 0;\r\n    right: 38px;\r\n    z-index: 2;\r\n    margin-bottom: -22px;\r\n    border-radius: 5px;\r\n\r\n\r\n\r\n    .total_likes,\r\n    .price_rate_daily {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_big;\r\n        font-size: calc($font_size / 1.55);\r\n        line-height: 31px;\r\n        color: $default_font_color;\r\n        padding-top: 18px;\r\n\r\n    }\r\n\r\n    .total_likes:after {\r\n        padding-left: 5px;\r\n        content: \"♥\";\r\n        font-size: calc($font_size / 1.55 * 1.33);\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n    .photographer_statistic {\r\n        display: none;\r\n    }\r\n\r\n}",".media_card {\r\n    @include flex-basic(column, null, null, null, null);\r\n    flex-wrap: wrap;\r\n    max-width: 350px;\r\n\r\n    img,\r\n    video {\r\n        transition: box-shadow 1s;\r\n        width: 100%;\r\n        max-height: 300px;\r\n        min-height: 300px;\r\n        object-fit: cover;\r\n        border-radius: 5px;\r\n\r\n        &:hover {\r\n            transition: box-shadow 1s;\r\n            cursor: pointer;\r\n            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.50);\r\n        }\r\n    }\r\n\r\n\r\n\r\n\r\n    .details {\r\n        @include flex-basic(row, null, null, space-between, baseline);\r\n        margin-top: 5px;\r\n    }\r\n\r\n    h6 {\r\n        font-family: $font_global;\r\n        font-style: normal;\r\n        font-weight: $font_weight_small;\r\n        font-size: calc($font_size / 1.5);\r\n        color: $color_primary1;\r\n    }\r\n\r\n    h6:last-child::after {\r\n        font-size: calc($font_size / 1.5 * 1.25);\r\n        padding-left: 10px;\r\n        content: \"♥\";\r\n    }\r\n\r\n}\r\n\r\n\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_card img,\r\n    .media_card {\r\n        max-width: 100%;\r\n    }\r\n}","//// MAIN PAGE /// \r\n.photographer_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    gap: 70px;\r\n    margin-top: 75px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n///// END MAIN PAGE // \r\n\r\n//////////////// PHOTOGRAPHER PAGE /////// \r\n.margin_left_right {\r\n    margin: 0 100px;\r\n}\r\n\r\n.filter_section {\r\n    @include flex-basic(row, null, null, null, baseline);\r\n    margin-left: 0;\r\n\r\n    h5:first-child {\r\n        margin-top: 20px;\r\n        margin-right: 28px;\r\n        font-family: $font_global;\r\n        font-weight: $font_weight_big;\r\n        font-style: normal;\r\n        font-size: calc($font-size / 2);\r\n        color: $default_font_color;\r\n    }\r\n\r\n    .select_filter {\r\n        margin-top: 10px;\r\n    }\r\n}\r\n\r\n.media_section {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr 1fr;\r\n    row-gap: 30px;\r\n    column-gap: 95px;\r\n    margin-top: 20px;\r\n    margin-bottom: 75px;\r\n}\r\n\r\n////////////// END PHOTOGRAPHER PAGE ////////\r\n\r\n//////////////// 404 PAGE /////// \r\n.ERROR_404 {\r\n    margin-top: 5%;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: space-around;\r\n    padding: 40px;\r\n\r\n    h1 {\r\n        margin-bottom: 5%;\r\n        text-align: center;\r\n        font-size: $font_size * 2;\r\n        margin-bottom: 40px;\r\n    }\r\n\r\n    a {\r\n        text-decoration: none;\r\n        color: inherit;\r\n    }\r\n\r\n    a:hover {\r\n        color: inherit;\r\n    }\r\n}\r\n\r\n////////////// END 404 PAGE ////////","footer {\r\n    height: 2px;\r\n    width: 100%;\r\n    background-color: $default_color;\r\n    margin-top: 75px;\r\n}","@media (min-width: 2000px) {\r\n\r\n    .media_section {\r\n        grid-template-columns: 1fr 1fr 1fr 1fr;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 1100px) {\r\n\r\n    .photographer_section,\r\n    .media_section {\r\n        grid-template-columns: 1fr 1fr;\r\n    }\r\n\r\n}\r\n\r\n\r\n@media (max-width: 800px) {\r\n\r\n    header {\r\n        flex-direction: column;\r\n        margin-top: 40px;\r\n        height: 100px;\r\n\r\n        .logo_photographer {\r\n            margin-left: 0;\r\n        }\r\n\r\n        .logo,\r\n        h1 {\r\n            margin-left: 20px;\r\n            margin-right: 20px;\r\n            font-size: calc($font_size / 1.20);\r\n        }\r\n    }\r\n\r\n    .margin_left_right {\r\n        margin: 0 20px;\r\n    }\r\n\r\n\r\n    .filter_section {\r\n        justify-content: space-between;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 700px) {\r\n\r\n    .photographer_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}\r\n\r\n@media (max-width: 600px) {\r\n\r\n    .media_section {\r\n        grid-template-columns: 1fr;\r\n    }\r\n\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxVQUFVLE1BQU0sTUFBTSxXQUFXLFVBQVUsV0FBVyxXQUFXLE1BQU0sT0FBTyxVQUFVLFVBQVUsVUFBVSxXQUFXLE1BQU0sTUFBTSxXQUFXLFlBQVksTUFBTSxNQUFNLFdBQVcsTUFBTSxNQUFNLFVBQVUsT0FBTyxNQUFNLFdBQVcsTUFBTSxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sTUFBTSxXQUFXLE1BQU0sS0FBSyxNQUFNLEtBQUssVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sVUFBVSxNQUFNLEtBQUssTUFBTSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLE1BQU0sT0FBTyxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxVQUFVLFdBQVcsWUFBWSxVQUFVLE1BQU0sTUFBTSxXQUFXLE9BQU8sTUFBTSxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxVQUFVLE9BQU8sTUFBTSxXQUFXLE1BQU0sTUFBTSxLQUFLLFVBQVUsTUFBTSxNQUFNLFVBQVUsTUFBTSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sS0FBSyxVQUFVLE1BQU0sTUFBTSxVQUFVLE1BQU0sTUFBTSxZQUFZLEtBQUssVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsV0FBVyxVQUFVLFdBQVcsTUFBTSxNQUFNLFVBQVUsV0FBVyxPQUFPLFlBQVksS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGVBQWUsYUFBYSxXQUFXLFdBQVcsY0FBYyxlQUFlLE9BQU8sTUFBTSxXQUFXLE1BQU0sUUFBUSxXQUFXLFdBQVcsT0FBTyxNQUFNLFdBQVcsV0FBVyxVQUFVLE9BQU8sTUFBTSxXQUFXLFdBQVcsV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsT0FBTyxPQUFPLFdBQVcsYUFBYSxlQUFlLGVBQWUsT0FBTyxNQUFNLFdBQVcsV0FBVyxNQUFNLE1BQU0sV0FBVyxXQUFXLE9BQU8sTUFBTSxLQUFLLFlBQVksVUFBVSxhQUFhLGNBQWMsZUFBZSxlQUFlLGVBQWUsWUFBWSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sVUFBVSxNQUFNLE1BQU0sV0FBVyxNQUFNLE1BQU0sV0FBVyxNQUFNLEtBQUssTUFBTSxLQUFLLFdBQVcsYUFBYSxlQUFlLGVBQWUsZUFBZSxPQUFPLE1BQU0sV0FBVyxXQUFXLFdBQVcsV0FBVyxNQUFNLE1BQU0sVUFBVSxXQUFXLE1BQU0sUUFBUSxXQUFXLE1BQU0sTUFBTSxVQUFVLE1BQU0sS0FBSyxZQUFZLE1BQU0sVUFBVSxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLFVBQVUsV0FBVyxVQUFVLFVBQVUsVUFBVSxPQUFPLE1BQU0sV0FBVyxVQUFVLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxPQUFPLE1BQU0sV0FBVyxXQUFXLE9BQU8sTUFBTSxVQUFVLFdBQVcsWUFBWSxZQUFZLFdBQVcsV0FBVyxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsVUFBVSxZQUFZLFdBQVcsTUFBTSxNQUFNLFdBQVcsWUFBWSxhQUFhLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFVBQVUsTUFBTSxNQUFNLFVBQVUsV0FBVyxXQUFXLFNBQVMsTUFBTSxVQUFVLE9BQU8sTUFBTSxXQUFXLFdBQVcsT0FBTyxhQUFhLE1BQU0sVUFBVSxZQUFZLGFBQWEsZUFBZSxlQUFlLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLE9BQU8sUUFBUSxXQUFXLFlBQVksV0FBVyxZQUFZLFdBQVcsVUFBVSxXQUFXLE9BQU8sT0FBTyxXQUFXLFVBQVUsV0FBVyxRQUFRLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxhQUFhLE1BQU0sVUFBVSxZQUFZLFdBQVcsV0FBVyxPQUFPLFFBQVEsV0FBVyxVQUFVLFdBQVcsV0FBVyxXQUFXLFdBQVcsT0FBTyxRQUFRLFdBQVcsVUFBVSxXQUFXLE9BQU8sT0FBTyxXQUFXLGFBQWEsYUFBYSxhQUFhLFdBQVcsT0FBTyxPQUFPLFlBQVksWUFBWSxZQUFZLFdBQVcsV0FBVyxRQUFRLE9BQU8sVUFBVSxXQUFXLFVBQVUsUUFBUSxPQUFPLE1BQU0sVUFBVSxPQUFPLEtBQUssYUFBYSxNQUFNLFVBQVUsV0FBVyxVQUFVLFdBQVcsV0FBVyxRQUFRLE9BQU8sVUFBVSxRQUFRLE9BQU8sVUFBVSxZQUFZLGFBQWEsV0FBVyxPQUFPLE9BQU8sV0FBVyxXQUFXLFlBQVksYUFBYSxZQUFZLFVBQVUsV0FBVyxRQUFRLE9BQU8sV0FBVyxRQUFRLE9BQU8sVUFBVSxXQUFXLFVBQVUsV0FBVyxXQUFXLFdBQVcsUUFBUSxPQUFPLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxVQUFVLE9BQU8sT0FBTyxXQUFXLFdBQVcsVUFBVSxXQUFXLE9BQU8sT0FBTyxXQUFXLFVBQVUsT0FBTyxPQUFPLFVBQVUsUUFBUSxhQUFhLE1BQU0sVUFBVSxVQUFVLFdBQVcsV0FBVyxRQUFRLE9BQU8sTUFBTSxNQUFNLEtBQUssV0FBVyxPQUFPLEtBQUssT0FBTyxNQUFNLFdBQVcsT0FBTyxLQUFLLE9BQU8sS0FBSyxXQUFXLFdBQVcsVUFBVSxPQUFPLE9BQU8sVUFBVSxPQUFPLFFBQVEsV0FBVyxXQUFXLFVBQVUsT0FBTyxPQUFPLFVBQVUsT0FBTyxPQUFPLFdBQVcsT0FBTyxLQUFLLE9BQU8sS0FBSyxXQUFXLE9BQU8sS0FBSyxPQUFPLEtBQUssV0FBVyxPQUFPLHVIQUF1SCxvRkFBb0Ysb0RBQW9ELGtFQUFrRSx5RkFBeUYsaUZBQWlGLGdEQUFnRCwwRkFBMEYsZ0dBQWdHLHdGQUF3RiwwR0FBMEcsaUdBQWlHLHdFQUF3RSxrRUFBa0UsOEtBQThLLHlEQUF5RCw0QkFBNEIsMEJBQTBCLHlCQUF5Qiw2RUFBNkUsaUNBQWlDLHlCQUF5Qiw2QkFBNkIsNkJBQTZCLCtCQUErQixrQ0FBa0MsK0JBQStCLHlHQUF5RyxnQkFBZ0IsaUJBQWlCLDZCQUE2QixTQUFTLGNBQWMsZ0NBQWdDLDZDQUE2Qyw4QkFBOEIsWUFBWSxxQkFBcUIsU0FBUyxrQkFBa0IsdUJBQXVCLFNBQVMsT0FBTyxLQUFLLGtGQUFrRixvRUFBb0Usc0JBQXNCLG9CQUFvQixtQ0FBbUMsc0JBQXNCLGdDQUFnQyw0Q0FBNEMsa0NBQWtDLDhCQUE4QixTQUFTLDhDQUE4Qyx5QkFBeUIsU0FBUyxtQkFBbUIsK0JBQStCLFNBQVMsZ0NBQWdDLCtCQUErQiw2QkFBNkIsU0FBUyxLQUFLLHVIQUF1SCxvQkFBb0Isc0NBQXNDLDRCQUE0Qiw4QkFBOEIsT0FBTyxnQ0FBZ0Msc0NBQXNDLE9BQU8sa0NBQWtDLDBDQUEwQyxPQUFPLDhCQUE4QixrQ0FBa0MsT0FBTyxLQUFLLDZDQUE2Qyw4QkFBOEIsc0JBQXNCLFFBQVEsaURBQWlELDZCQUE2Qiw4QkFBOEIsUUFBUSwrQ0FBK0MsMkJBQTJCLDRCQUE0QixLQUFLLHVCQUF1QixnRUFBZ0UsNkJBQTZCLGlCQUFpQix5REFBeUQsc0NBQXNDLDBCQUEwQix5QkFBeUIsK0JBQStCLDhCQUE4Qix5QkFBeUIsZ0NBQWdDLDZEQUE2RCxhQUFhLFNBQVMscURBQXFELHNDQUFzQywrQkFBK0IsNENBQTRDLFNBQVMsZ0JBQWdCLDZCQUE2QixtQ0FBbUMsa0NBQWtDLFNBQVMsZ0JBQWdCLGdEQUFnRCw4QkFBOEIsbUNBQW1DLFNBQVMsZ0JBQWdCLDRCQUE0Qiw4Q0FBOEMsOEJBQThCLHVDQUF1QyxTQUFTLGdCQUFnQiw0QkFBNEIsNENBQTRDLDhCQUE4QiwrQkFBK0IsK0JBQStCLFNBQVMsS0FBSyxvQ0FBb0MsNEJBQTRCLGdCQUFnQiwwREFBMEQsaUNBQWlDLGFBQWEsb0JBQW9CLHdEQUF3RCxpQ0FBaUMsYUFBYSxvQkFBb0Isc0RBQXNELGlDQUFpQyxhQUFhLFNBQVMsU0FBUyx1Q0FBdUMsNEJBQTRCLGdCQUFnQiwwREFBMEQsYUFBYSxvQkFBb0Isd0RBQXdELGFBQWEsb0JBQW9CLHNEQUFzRCxhQUFhLHFCQUFxQiw2QkFBNkIsOEJBQThCLGFBQWEsU0FBUyxTQUFTLG1CQUFtQixzQkFBc0Isd0JBQXdCLGlCQUFpQixrQkFBa0IseUNBQXlDLHFEQUFxRCwyQkFBMkIsNENBQTRDLHNCQUFzQixxQkFBcUIsbUJBQW1CLHVDQUF1QywrQkFBK0IsMkNBQTJDLHdCQUF3Qiw4QkFBOEIsZ0NBQWdDLDBCQUEwQixrQ0FBa0MsNkJBQTZCLHNFQUFzRSxnREFBZ0QsNkJBQTZCLHlEQUF5RCxpQkFBaUIsYUFBYSw4QkFBOEIsOEJBQThCLHVDQUF1QyxpQ0FBaUMsYUFBYSxvQkFBb0IsbURBQW1ELG9DQUFvQyxvQ0FBb0MsaUNBQWlDLHdDQUF3QyxpQ0FBaUMsYUFBYSxTQUFTLHdCQUF3Qiw4Q0FBOEMsK0JBQStCLDBCQUEwQixTQUFTLDJCQUEyQiw2QkFBNkIsNkNBQTZDLGdDQUFnQyw2QkFBNkIsU0FBUyw4Q0FBOEMsNEJBQTRCLHlCQUF5Qix5QkFBeUIsK0JBQStCLGFBQWEsNEJBQTRCLHVDQUF1QyxrQ0FBa0MsU0FBUyxtQ0FBbUMsNkJBQTZCLFNBQVMseUJBQXlCLDBCQUEwQixTQUFTLGlCQUFpQix1QkFBdUIsa0RBQWtELGlDQUFpQyxnQkFBZ0IsNkJBQTZCLGFBQWEsc0JBQXNCLDZCQUE2QixhQUFhLFNBQVMsS0FBSywrQkFBK0IsaURBQWlELGdDQUFnQyxnQkFBZ0IsNkJBQTZCLGFBQWEsc0JBQXNCLDZCQUE2QixhQUFhLFNBQVMsYUFBYSx3Q0FBd0MsNEJBQTRCLHVCQUF1QiwrQkFBK0Isb0JBQW9CLHNEQUFzRCxpQkFBaUIsYUFBYSw0QkFBNEIsa0RBQWtELGFBQWEsNEJBQTRCLGtEQUFrRCxhQUFhLCtCQUErQixrREFBa0QsaUJBQWlCLGFBQWEsS0FBSyxtQ0FBbUMsd0JBQXdCLHVCQUF1QixtQ0FBbUMsb0JBQW9CLHNEQUFzRCxpQkFBaUIsYUFBYSw0QkFBNEIsa0RBQWtELGFBQWEsNEJBQTRCLGtEQUFrRCxhQUFhLCtCQUErQixrREFBa0QsaUJBQWlCLFNBQVMsS0FBSyxvQkFBb0Isc0JBQXNCLHdCQUF3QixpQkFBaUIsa0JBQWtCLHlDQUF5Qyx1Q0FBdUMsZ0NBQWdDLDBCQUEwQixvQ0FBb0MsZ0NBQWdDLDBCQUEwQix5QkFBeUIsU0FBUywrREFBK0QseURBQXlELCtCQUErQix5QkFBeUIsZ0NBQWdDLDZCQUE2Qiw4QkFBOEIsU0FBUyx5QkFBeUIsa0NBQWtDLDhDQUE4QyxtQ0FBbUMsMkNBQTJDLDBCQUEwQix5QkFBeUIseUNBQXlDLGFBQWEsU0FBUyw0QkFBNEIseUlBQXlJLHVHQUF1RyxzQkFBc0IseUJBQXlCLDRCQUE0Qiw0Q0FBNEMseUJBQXlCLDRJQUE0SSxhQUFhLFNBQVMsb0JBQW9CLG1DQUFtQyw0QkFBNEIsU0FBUyxpQ0FBaUMsMEJBQTBCLFNBQVMsaUJBQWlCLHVCQUF1QixrREFBa0QsaUNBQWlDLGdCQUFnQiw2QkFBNkIsYUFBYSxzQkFBc0IsNkJBQTZCLGFBQWEsU0FBUyxLQUFLLCtCQUErQixpREFBaUQsZ0NBQWdDLGdCQUFnQiw2QkFBNkIsYUFBYSxzQkFBc0IsNkJBQTZCLGFBQWEsU0FBUyxhQUFhLG9CQUFvQiwwQ0FBMEMsc0NBQXNDLGtDQUFrQyw4QkFBOEIsc0JBQXNCLHlCQUF5Qix5QkFBeUIscUJBQXFCLDBDQUEwQywyQkFBMkIsd0JBQXdCLHNFQUFzRSxxQkFBcUIsdUNBQXVDLGdEQUFnRCxTQUFTLEtBQUssdUJBQXVCLHlFQUF5RSwrQ0FBK0Msc0JBQXNCLHlCQUF5Qiw4Q0FBOEMsOEJBQThCLCtCQUErQixTQUFTLDBDQUEwQyxzQ0FBc0MsNENBQTRDLFNBQVMsZ0JBQWdCLCtDQUErQyxpQ0FBaUMsbUNBQW1DLFNBQVMsZ0JBQWdCLDZCQUE2QixnQ0FBZ0MsK0NBQStDLG1DQUFtQyxTQUFTLGdCQUFnQiw0Q0FBNEMscUNBQXFDLFNBQVMsMERBQTBELHdFQUF3RSxTQUFTLGdDQUFnQyw2QkFBNkIsK0JBQStCLFNBQVMsK0JBQStCLDhCQUE4QixnQ0FBZ0MsU0FBUyxLQUFLLHdDQUF3Qyw0QkFBNEIsNkNBQTZDLCtFQUErRSw4QkFBOEIsU0FBUyxtQ0FBbUMsK0NBQStDLFNBQVMsbUNBQW1DLDhDQUE4QyxhQUFhLG1DQUFtQyw4Q0FBOEMsU0FBUyxnQ0FBZ0MsZ0NBQWdDLGlCQUFpQixhQUFhLG1DQUFtQyw0QkFBNEIsK0VBQStFLG9DQUFvQyxxQ0FBcUMsa0NBQWtDLG1DQUFtQyxrQ0FBa0MsYUFBYSxhQUFhLGtEQUFrRCwyQkFBMkIsZ0NBQWdDLFNBQVMseURBQXlELCtCQUErQixTQUFTLG1EQUFtRCwwQkFBMEIsU0FBUyxhQUFhLG1CQUFtQixzQkFBc0IsZ0NBQWdDLDRCQUE0Qix1Q0FBdUMsNkJBQTZCLDJCQUEyQixrQ0FBa0MsMkJBQTJCLHNDQUFzQyx3Q0FBd0Msb0NBQW9DLDhCQUE4QixvQ0FBb0MscUNBQXFDLHFCQUFxQiwyQkFBMkIscUJBQXFCLHFCQUFxQix3QkFBd0IsS0FBSywrQkFBK0IsNENBQTRDLHVCQUF1QixpQ0FBaUMsMkNBQTJDLDBCQUEwQixxQkFBcUIsMkJBQTJCLFNBQVMsd0JBQXdCLCtCQUErQiw4QkFBOEIsS0FBSyw2QkFBNkIsc0JBQXNCLDJCQUEyQixvQ0FBb0MsdUNBQXVDLHdDQUF3Qyx5QkFBeUIsdURBQXVELG1CQUFtQiw0QkFBNEIsdUJBQXVCLHdCQUF3Qiw2Q0FBNkMsNEJBQTRCLFNBQVMsZUFBZSx5Q0FBeUMsc0NBQXNDLDBDQUEwQyw0Q0FBNEMsa0NBQWtDLDBCQUEwQix5QkFBeUIseUJBQXlCLGtDQUFrQywyQkFBMkIsU0FBUyxxQkFBcUIsNEJBQTRCLHlDQUF5Qyx1Q0FBdUMsU0FBUyxpQkFBaUIsa0RBQWtELDJCQUEyQixLQUFLLG9EQUFvRCxrQ0FBa0MsNENBQTRDLEtBQUssNEJBQTRCLDJFQUEyRSx3QkFBd0IsNENBQTRDLHlCQUF5Qix5QkFBeUIsa0JBQWtCLG9CQUFvQixtQkFBbUIsNkJBQTZCLDJCQUEyQiw0REFBNEQsc0NBQXNDLCtCQUErQiwwQ0FBMEMsK0NBQStDLDhCQUE4Qix1Q0FBdUMsOEJBQThCLGFBQWEsZ0NBQWdDLDhCQUE4QiwyQkFBMkIsc0RBQXNELFNBQVMsU0FBUyxtQ0FBbUMsaUNBQWlDLDBCQUEwQixTQUFTLFNBQVMsZ0JBQWdCLDREQUE0RCx3QkFBd0IseUJBQXlCLCtCQUErQixzQ0FBc0Msd0JBQXdCLDhCQUE4Qiw4QkFBOEIsOEJBQThCLCtCQUErQix5QkFBeUIsMENBQTBDLGdDQUFnQyw2REFBNkQsYUFBYSxTQUFTLGtDQUFrQywwRUFBMEUsNEJBQTRCLFNBQVMsZ0JBQWdCLHNDQUFzQywrQkFBK0IsNENBQTRDLDhDQUE4QyxtQ0FBbUMsU0FBUyxrQ0FBa0MscURBQXFELCtCQUErQiwyQkFBMkIsU0FBUyxTQUFTLDJDQUEyQyxpREFBaUQsNEJBQTRCLFNBQVMsS0FBSyxpREFBaUQsc0JBQXNCLDJDQUEyQyxrQkFBa0IseUJBQXlCLDRCQUE0QixLQUFLLDBHQUEwRyx3QkFBd0IsS0FBSyx5QkFBeUIsNkRBQTZELHVCQUF1Qiw0QkFBNEIsNkJBQTZCLCtCQUErQixzQ0FBc0MsMENBQTBDLCtCQUErQiw0Q0FBNEMsdUNBQXVDLFNBQVMsNEJBQTRCLDZCQUE2QixTQUFTLEtBQUssd0JBQXdCLHNCQUFzQiwyQ0FBMkMsc0JBQXNCLHlCQUF5Qix5QkFBeUIsNEJBQTRCLEtBQUssK0dBQStHLHVCQUF1QixzQkFBc0IsK0JBQStCLDRCQUE0QixzQ0FBc0Msc0JBQXNCLGdCQUFnQiw4QkFBOEIsK0JBQStCLHNDQUFzQyxnQ0FBZ0MsU0FBUyxlQUFlLGtDQUFrQywyQkFBMkIsU0FBUyxxQkFBcUIsMkJBQTJCLFNBQVMsS0FBSyx1REFBdUQsb0JBQW9CLG9CQUFvQix5Q0FBeUMseUJBQXlCLEtBQUssK0JBQStCLDRCQUE0QixtREFBbUQsU0FBUyxTQUFTLG9DQUFvQywwREFBMEQsMkNBQTJDLFNBQVMsU0FBUyx1Q0FBdUMsb0JBQW9CLG1DQUFtQyw2QkFBNkIsMEJBQTBCLG9DQUFvQywrQkFBK0IsYUFBYSxzQ0FBc0Msa0NBQWtDLG1DQUFtQyxtREFBbUQsYUFBYSxTQUFTLGdDQUFnQywyQkFBMkIsU0FBUyxpQ0FBaUMsMkNBQTJDLFNBQVMsU0FBUyxtQ0FBbUMsbUNBQW1DLHVDQUF1QyxTQUFTLFNBQVMsbUNBQW1DLDRCQUE0Qix1Q0FBdUMsU0FBUyxTQUFTLG1CQUFtQjtBQUM5bzJDO0FBQ0EsK0RBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ052QyxNQUFrRztBQUNsRyxNQUF3RjtBQUN4RixNQUErRjtBQUMvRixNQUFrSDtBQUNsSCxNQUEyRztBQUMzRyxNQUEyRztBQUMzRyxNQUEyTjtBQUMzTjtBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLDJMQUFPOzs7O0FBSXFLO0FBQzdMLE9BQU8sK0RBQWUsMkxBQU8sSUFBSSxrTUFBYyxHQUFHLGtNQUFjLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ3ZHYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDdENhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ1ZhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDWGE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEO0FBQ2xEOztBQUVBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBOztBQUVBO0FBQ0EsaUZBQWlGO0FBQ2pGOztBQUVBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7O1VDZkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsZUFBZSw0QkFBNEI7V0FDM0MsZUFBZTtXQUNmLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRCw4Q0FBOEM7Ozs7O1dDQTlDO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2EtY2FsbGFibGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LXNsaWNlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluLWFjY2Vzc29yLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1idWlsdC1pbi5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kZWZpbmUtZ2xvYmFsLXByb3BlcnR5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2VuZ2luZS1pcy1pb3MuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLWlzLW5vZGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXVzZXItYWdlbnQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZW51bS1idWcta2V5cy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9leHBvcnQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZmFpbHMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYXBwbHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1jb250ZXh0LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZnVuY3Rpb24tbmFtZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaGlkZGVuLWtleXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaHRtbC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnNwZWN0LXNvdXJjZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1jYWxsYWJsZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtbnVsbC1vci11bmRlZmluZWQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLXB1cmUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtc3ltYm9sLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2xlbmd0aC1vZi1hcnJheS1saWtlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL21ha2UtYnVpbHQtaW4uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvbWF0aC10cnVuYy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LWRlc2NyaXB0b3IuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtaXMtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1rZXlzLWludGVybmFsLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29yZGluYXJ5LXRvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vd24ta2V5cy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWdleHAtZmxhZ3MuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC1rZXkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NoYXJlZC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXguanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci1vci1pbmZpbml0eS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1sZW5ndGguanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tb2JqZWN0LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdHJ5LXRvLXN0cmluZy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdjgtcHJvdG90eXBlLWRlZmluZS1idWcuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdmFsaWRhdGUtYXJndW1lbnRzLWxlbmd0aC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWFrLW1hcC1iYXNpYy1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnJlZ2V4cC5mbGFncy5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmNsZWFyLWltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLmltbWVkaWF0ZS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvd2ViLnNldC1pbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9kYXRhL2Rpc3BsYXlEYXRhLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvZGF0YS9kaXNwbGF5TWVkaWEuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9mYWN0b3JpZXMvbWVkaWFGYWN0b3J5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvZmFjdG9yaWVzL3Bob3RvZ3JhcGhlckZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy9wYWdlcy9waG90b2dyYXBoZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9kb20uanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9zcmMvc2NyaXB0cy91dGlscy9mZXRjaC5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL2dldFVybFBhcmFtZXRlci5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS8uL3NyYy9zY3JpcHRzL3V0aWxzL21vZGFsTWFzdGVyLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvc2VsZWN0RmlsdGVyLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3NjcmlwdHMvdXRpbHMvc29ydEJ5LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3Njc3MvbWFpbi5zY3NzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vc3JjL3Njc3MvbWFpbi5zY3NzP2IzNzkiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9mcm9udC1lbmQtZmlzaGV5ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZnJvbnQtZW5kLWZpc2hleWUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2Zyb250LWVuZC1maXNoZXllL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIHRyeVRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RyeS10by1zdHJpbmcnKTtcblxudmFyICRUeXBlRXJyb3IgPSBUeXBlRXJyb3I7XG5cbi8vIGBBc3NlcnQ6IElzQ2FsbGFibGUoYXJndW1lbnQpIGlzIHRydWVgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoaXNDYWxsYWJsZShhcmd1bWVudCkpIHJldHVybiBhcmd1bWVudDtcbiAgdGhyb3cgJFR5cGVFcnJvcih0cnlUb1N0cmluZyhhcmd1bWVudCkgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG52YXIgJFN0cmluZyA9IFN0cmluZztcbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgQXNzZXJ0OiBUeXBlKGFyZ3VtZW50KSBpcyBPYmplY3RgXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICBpZiAoaXNPYmplY3QoYXJndW1lbnQpKSByZXR1cm4gYXJndW1lbnQ7XG4gIHRocm93ICRUeXBlRXJyb3IoJFN0cmluZyhhcmd1bWVudCkgKyAnIGlzIG5vdCBhbiBvYmplY3QnKTtcbn07XG4iLCJ2YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgbGVuZ3RoT2ZBcnJheUxpa2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbGVuZ3RoLW9mLWFycmF5LWxpa2UnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gbGVuZ3RoT2ZBcnJheUxpa2UoTyk7XG4gICAgdmFyIGluZGV4ID0gdG9BYnNvbHV0ZUluZGV4KGZyb21JbmRleCwgbGVuZ3RoKTtcbiAgICB2YXIgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gICAgICBpZiAodmFsdWUgIT0gdmFsdWUpIHJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I2luZGV4T2YgaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yICg7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspIHtcbiAgICAgIGlmICgoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTykgJiYgT1tpbmRleF0gPT09IGVsKSByZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5pbmNsdWRlc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluZGV4b2ZcbiAgaW5kZXhPZjogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1bmN1cnJ5VGhpcyhbXS5zbGljZSk7XG4iLCJ2YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG5cbnZhciB0b1N0cmluZyA9IHVuY3VycnlUaGlzKHt9LnRvU3RyaW5nKTtcbnZhciBzdHJpbmdTbGljZSA9IHVuY3VycnlUaGlzKCcnLnNsaWNlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHN0cmluZ1NsaWNlKHRvU3RyaW5nKGl0KSwgOCwgLTEpO1xufTtcbiIsInZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIG93bktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3duLWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UsIGV4Y2VwdGlvbnMpIHtcbiAgdmFyIGtleXMgPSBvd25LZXlzKHNvdXJjZSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKCFoYXNPd24odGFyZ2V0LCBrZXkpICYmICEoZXhjZXB0aW9ucyAmJiBoYXNPd24oZXhjZXB0aW9ucywga2V5KSkpIHtcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBrZXkpKTtcbiAgICB9XG4gIH1cbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHJldHVybiBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mKG9iamVjdCwga2V5LCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYml0bWFwLCB2YWx1ZSkge1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGU6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlOiB2YWx1ZVxuICB9O1xufTtcbiIsInZhciBtYWtlQnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9tYWtlLWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpIHtcbiAgaWYgKGRlc2NyaXB0b3IuZ2V0KSBtYWtlQnVpbHRJbihkZXNjcmlwdG9yLmdldCwgbmFtZSwgeyBnZXR0ZXI6IHRydWUgfSk7XG4gIGlmIChkZXNjcmlwdG9yLnNldCkgbWFrZUJ1aWx0SW4oZGVzY3JpcHRvci5zZXQsIG5hbWUsIHsgc2V0dGVyOiB0cnVlIH0pO1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkuZih0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpO1xufTtcbiIsInZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgZGVmaW5lUHJvcGVydHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIG1ha2VCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21ha2UtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVHbG9iYWxQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtZ2xvYmFsLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gIHZhciBzaW1wbGUgPSBvcHRpb25zLmVudW1lcmFibGU7XG4gIHZhciBuYW1lID0gb3B0aW9ucy5uYW1lICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5hbWUgOiBrZXk7XG4gIGlmIChpc0NhbGxhYmxlKHZhbHVlKSkgbWFrZUJ1aWx0SW4odmFsdWUsIG5hbWUsIG9wdGlvbnMpO1xuICBpZiAob3B0aW9ucy5nbG9iYWwpIHtcbiAgICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIGRlZmluZUdsb2JhbFByb3BlcnR5KGtleSwgdmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIW9wdGlvbnMudW5zYWZlKSBkZWxldGUgT1trZXldO1xuICAgICAgZWxzZSBpZiAoT1trZXldKSBzaW1wbGUgPSB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgICBlbHNlIGRlZmluZVByb3BlcnR5TW9kdWxlLmYoTywga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogIW9wdGlvbnMubm9uQ29uZmlndXJhYmxlLFxuICAgICAgd3JpdGFibGU6ICFvcHRpb25zLm5vbldyaXRhYmxlXG4gICAgfSk7XG4gIH0gcmV0dXJuIE87XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICB0cnkge1xuICAgIGRlZmluZVByb3BlcnR5KGdsb2JhbCwga2V5LCB7IHZhbHVlOiB2YWx1ZSwgY29uZmlndXJhYmxlOiB0cnVlLCB3cml0YWJsZTogdHJ1ZSB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gRGV0ZWN0IElFOCdzIGluY29tcGxldGUgZGVmaW5lUHJvcGVydHkgaW1wbGVtZW50YXRpb25cbm1vZHVsZS5leHBvcnRzID0gIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sIDEsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pWzFdICE9IDc7XG59KTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciBkb2N1bWVudCA9IGdsb2JhbC5kb2N1bWVudDtcbi8vIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnIGluIG9sZCBJRVxudmFyIEVYSVNUUyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIEVYSVNUUyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwidmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IC8oPzppcGFkfGlwaG9uZXxpcG9kKS4qYXBwbGV3ZWJraXQvaS50ZXN0KHVzZXJBZ2VudCk7XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzc29mKGdsb2JhbC5wcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG4iLCJ2YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRCdWlsdEluKCduYXZpZ2F0b3InLCAndXNlckFnZW50JykgfHwgJyc7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHVzZXJBZ2VudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtdXNlci1hZ2VudCcpO1xuXG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIERlbm8gPSBnbG9iYWwuRGVubztcbnZhciB2ZXJzaW9ucyA9IHByb2Nlc3MgJiYgcHJvY2Vzcy52ZXJzaW9ucyB8fCBEZW5vICYmIERlbm8udmVyc2lvbjtcbnZhciB2OCA9IHZlcnNpb25zICYmIHZlcnNpb25zLnY4O1xudmFyIG1hdGNoLCB2ZXJzaW9uO1xuXG5pZiAodjgpIHtcbiAgbWF0Y2ggPSB2OC5zcGxpdCgnLicpO1xuICAvLyBpbiBvbGQgQ2hyb21lLCB2ZXJzaW9ucyBvZiBWOCBpc24ndCBWOCA9IENocm9tZSAvIDEwXG4gIC8vIGJ1dCB0aGVpciBjb3JyZWN0IHZlcnNpb25zIGFyZSBub3QgaW50ZXJlc3RpbmcgZm9yIHVzXG4gIHZlcnNpb24gPSBtYXRjaFswXSA+IDAgJiYgbWF0Y2hbMF0gPCA0ID8gMSA6ICsobWF0Y2hbMF0gKyBtYXRjaFsxXSk7XG59XG5cbi8vIEJyb3dzZXJGUyBOb2RlSlMgYHByb2Nlc3NgIHBvbHlmaWxsIGluY29ycmVjdGx5IHNldCBgLnY4YCB0byBgMC4wYFxuLy8gc28gY2hlY2sgYHVzZXJBZ2VudGAgZXZlbiBpZiBgLnY4YCBleGlzdHMsIGJ1dCAwXG5pZiAoIXZlcnNpb24gJiYgdXNlckFnZW50KSB7XG4gIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9FZGdlXFwvKFxcZCspLyk7XG4gIGlmICghbWF0Y2ggfHwgbWF0Y2hbMV0gPj0gNzQpIHtcbiAgICBtYXRjaCA9IHVzZXJBZ2VudC5tYXRjaCgvQ2hyb21lXFwvKFxcZCspLyk7XG4gICAgaWYgKG1hdGNoKSB2ZXJzaW9uID0gK21hdGNoWzFdO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmVyc2lvbjtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGRlZmluZUJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWJ1aWx0LWluJyk7XG52YXIgZGVmaW5lR2xvYmFsUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eScpO1xudmFyIGNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY29weS1jb25zdHJ1Y3Rvci1wcm9wZXJ0aWVzJyk7XG52YXIgaXNGb3JjZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtZm9yY2VkJyk7XG5cbi8qXG4gIG9wdGlvbnMudGFyZ2V0ICAgICAgICAgLSBuYW1lIG9mIHRoZSB0YXJnZXQgb2JqZWN0XG4gIG9wdGlvbnMuZ2xvYmFsICAgICAgICAgLSB0YXJnZXQgaXMgdGhlIGdsb2JhbCBvYmplY3RcbiAgb3B0aW9ucy5zdGF0ICAgICAgICAgICAtIGV4cG9ydCBhcyBzdGF0aWMgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5wcm90byAgICAgICAgICAtIGV4cG9ydCBhcyBwcm90b3R5cGUgbWV0aG9kcyBvZiB0YXJnZXRcbiAgb3B0aW9ucy5yZWFsICAgICAgICAgICAtIHJlYWwgcHJvdG90eXBlIG1ldGhvZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMuZm9yY2VkICAgICAgICAgLSBleHBvcnQgZXZlbiBpZiB0aGUgbmF0aXZlIGZlYXR1cmUgaXMgYXZhaWxhYmxlXG4gIG9wdGlvbnMuYmluZCAgICAgICAgICAgLSBiaW5kIG1ldGhvZHMgdG8gdGhlIHRhcmdldCwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLndyYXAgICAgICAgICAgIC0gd3JhcCBjb25zdHJ1Y3RvcnMgdG8gcHJldmVudGluZyBnbG9iYWwgcG9sbHV0aW9uLCByZXF1aXJlZCBmb3IgdGhlIGBwdXJlYCB2ZXJzaW9uXG4gIG9wdGlvbnMudW5zYWZlICAgICAgICAgLSB1c2UgdGhlIHNpbXBsZSBhc3NpZ25tZW50IG9mIHByb3BlcnR5IGluc3RlYWQgb2YgZGVsZXRlICsgZGVmaW5lUHJvcGVydHlcbiAgb3B0aW9ucy5zaGFtICAgICAgICAgICAtIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgb3B0aW9ucy5lbnVtZXJhYmxlICAgICAtIGV4cG9ydCBhcyBlbnVtZXJhYmxlIHByb3BlcnR5XG4gIG9wdGlvbnMuZG9udENhbGxHZXRTZXQgLSBwcmV2ZW50IGNhbGxpbmcgYSBnZXR0ZXIgb24gdGFyZ2V0XG4gIG9wdGlvbnMubmFtZSAgICAgICAgICAgLSB0aGUgLm5hbWUgb2YgdGhlIGZ1bmN0aW9uIGlmIGl0IGRvZXMgbm90IG1hdGNoIHRoZSBrZXlcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRpb25zLCBzb3VyY2UpIHtcbiAgdmFyIFRBUkdFVCA9IG9wdGlvbnMudGFyZ2V0O1xuICB2YXIgR0xPQkFMID0gb3B0aW9ucy5nbG9iYWw7XG4gIHZhciBTVEFUSUMgPSBvcHRpb25zLnN0YXQ7XG4gIHZhciBGT1JDRUQsIHRhcmdldCwga2V5LCB0YXJnZXRQcm9wZXJ0eSwgc291cmNlUHJvcGVydHksIGRlc2NyaXB0b3I7XG4gIGlmIChHTE9CQUwpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAoU1RBVElDKSB7XG4gICAgdGFyZ2V0ID0gZ2xvYmFsW1RBUkdFVF0gfHwgZGVmaW5lR2xvYmFsUHJvcGVydHkoVEFSR0VULCB7fSk7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0ID0gKGdsb2JhbFtUQVJHRVRdIHx8IHt9KS5wcm90b3R5cGU7XG4gIH1cbiAgaWYgKHRhcmdldCkgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgc291cmNlUHJvcGVydHkgPSBzb3VyY2Vba2V5XTtcbiAgICBpZiAob3B0aW9ucy5kb250Q2FsbEdldFNldCkge1xuICAgICAgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gICAgICB0YXJnZXRQcm9wZXJ0eSA9IGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZTtcbiAgICB9IGVsc2UgdGFyZ2V0UHJvcGVydHkgPSB0YXJnZXRba2V5XTtcbiAgICBGT1JDRUQgPSBpc0ZvcmNlZChHTE9CQUwgPyBrZXkgOiBUQVJHRVQgKyAoU1RBVElDID8gJy4nIDogJyMnKSArIGtleSwgb3B0aW9ucy5mb3JjZWQpO1xuICAgIC8vIGNvbnRhaW5lZCBpbiB0YXJnZXRcbiAgICBpZiAoIUZPUkNFRCAmJiB0YXJnZXRQcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodHlwZW9mIHNvdXJjZVByb3BlcnR5ID09IHR5cGVvZiB0YXJnZXRQcm9wZXJ0eSkgY29udGludWU7XG4gICAgICBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzKHNvdXJjZVByb3BlcnR5LCB0YXJnZXRQcm9wZXJ0eSk7XG4gICAgfVxuICAgIC8vIGFkZCBhIGZsYWcgdG8gbm90IGNvbXBsZXRlbHkgZnVsbCBwb2x5ZmlsbHNcbiAgICBpZiAob3B0aW9ucy5zaGFtIHx8ICh0YXJnZXRQcm9wZXJ0eSAmJiB0YXJnZXRQcm9wZXJ0eS5zaGFtKSkge1xuICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KHNvdXJjZVByb3BlcnR5LCAnc2hhbScsIHRydWUpO1xuICAgIH1cbiAgICBkZWZpbmVCdWlsdEluKHRhcmdldCwga2V5LCBzb3VyY2VQcm9wZXJ0eSwgb3B0aW9ucyk7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwidmFyIE5BVElWRV9CSU5EID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWJpbmQtbmF0aXZlJyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbnZhciBhcHBseSA9IEZ1bmN0aW9uUHJvdG90eXBlLmFwcGx5O1xudmFyIGNhbGwgPSBGdW5jdGlvblByb3RvdHlwZS5jYWxsO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1yZWZsZWN0IC0tIHNhZmVcbm1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFJlZmxlY3QgPT0gJ29iamVjdCcgJiYgUmVmbGVjdC5hcHBseSB8fCAoTkFUSVZFX0JJTkQgPyBjYWxsLmJpbmQoYXBwbHkpIDogZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY2FsbC5hcHBseShhcHBseSwgYXJndW1lbnRzKTtcbn0pO1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGFDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWNhbGxhYmxlJyk7XG52YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIGJpbmQgPSB1bmN1cnJ5VGhpcyh1bmN1cnJ5VGhpcy5iaW5kKTtcblxuLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChmbiwgdGhhdCkge1xuICBhQ2FsbGFibGUoZm4pO1xuICByZXR1cm4gdGhhdCA9PT0gdW5kZWZpbmVkID8gZm4gOiBOQVRJVkVfQklORCA/IGJpbmQoZm4sIHRoYXQpIDogZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1mdW5jdGlvbi1wcm90b3R5cGUtYmluZCAtLSBzYWZlXG4gIHZhciB0ZXN0ID0gKGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSkuYmluZCgpO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zIC0tIHNhZmVcbiAgcmV0dXJuIHR5cGVvZiB0ZXN0ICE9ICdmdW5jdGlvbicgfHwgdGVzdC5oYXNPd25Qcm9wZXJ0eSgncHJvdG90eXBlJyk7XG59KTtcbiIsInZhciBOQVRJVkVfQklORCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLW5hdGl2ZScpO1xuXG52YXIgY2FsbCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9CSU5EID8gY2FsbC5iaW5kKGNhbGwpIDogZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY2FsbC5hcHBseShjYWxsLCBhcmd1bWVudHMpO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGhhc093biA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMtb3duLXByb3BlcnR5Jyk7XG5cbnZhciBGdW5jdGlvblByb3RvdHlwZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyIGdldERlc2NyaXB0b3IgPSBERVNDUklQVE9SUyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG52YXIgRVhJU1RTID0gaGFzT3duKEZ1bmN0aW9uUHJvdG90eXBlLCAnbmFtZScpO1xuLy8gYWRkaXRpb25hbCBwcm90ZWN0aW9uIGZyb20gbWluaWZpZWQgLyBtYW5nbGVkIC8gZHJvcHBlZCBmdW5jdGlvbiBuYW1lc1xudmFyIFBST1BFUiA9IEVYSVNUUyAmJiAoZnVuY3Rpb24gc29tZXRoaW5nKCkgeyAvKiBlbXB0eSAqLyB9KS5uYW1lID09PSAnc29tZXRoaW5nJztcbnZhciBDT05GSUdVUkFCTEUgPSBFWElTVFMgJiYgKCFERVNDUklQVE9SUyB8fCAoREVTQ1JJUFRPUlMgJiYgZ2V0RGVzY3JpcHRvcihGdW5jdGlvblByb3RvdHlwZSwgJ25hbWUnKS5jb25maWd1cmFibGUpKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIEVYSVNUUzogRVhJU1RTLFxuICBQUk9QRVI6IFBST1BFUixcbiAgQ09ORklHVVJBQkxFOiBDT05GSUdVUkFCTEVcbn07XG4iLCJ2YXIgTkFUSVZFX0JJTkQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tYmluZC1uYXRpdmUnKTtcblxudmFyIEZ1bmN0aW9uUHJvdG90eXBlID0gRnVuY3Rpb24ucHJvdG90eXBlO1xudmFyIGJpbmQgPSBGdW5jdGlvblByb3RvdHlwZS5iaW5kO1xudmFyIGNhbGwgPSBGdW5jdGlvblByb3RvdHlwZS5jYWxsO1xudmFyIHVuY3VycnlUaGlzID0gTkFUSVZFX0JJTkQgJiYgYmluZC5iaW5kKGNhbGwsIGNhbGwpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9CSU5EID8gZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmbiAmJiB1bmN1cnJ5VGhpcyhmbik7XG59IDogZnVuY3Rpb24gKGZuKSB7XG4gIHJldHVybiBmbiAmJiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNhbGwuYXBwbHkoZm4sIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciBhRnVuY3Rpb24gPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzQ2FsbGFibGUoYXJndW1lbnQpID8gYXJndW1lbnQgOiB1bmRlZmluZWQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIG1ldGhvZCkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDIgPyBhRnVuY3Rpb24oZ2xvYmFsW25hbWVzcGFjZV0pIDogZ2xvYmFsW25hbWVzcGFjZV0gJiYgZ2xvYmFsW25hbWVzcGFjZV1bbWV0aG9kXTtcbn07XG4iLCJ2YXIgYUNhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtY2FsbGFibGUnKTtcbnZhciBpc051bGxPclVuZGVmaW5lZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1udWxsLW9yLXVuZGVmaW5lZCcpO1xuXG4vLyBgR2V0TWV0aG9kYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0bWV0aG9kXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChWLCBQKSB7XG4gIHZhciBmdW5jID0gVltQXTtcbiAgcmV0dXJuIGlzTnVsbE9yVW5kZWZpbmVkKGZ1bmMpID8gdW5kZWZpbmVkIDogYUNhbGxhYmxlKGZ1bmMpO1xufTtcbiIsInZhciBjaGVjayA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgJiYgaXQuTWF0aCA9PSBNYXRoICYmIGl0O1xufTtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbm1vZHVsZS5leHBvcnRzID1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tZ2xvYmFsLXRoaXMgLS0gc2FmZVxuICBjaGVjayh0eXBlb2YgZ2xvYmFsVGhpcyA9PSAnb2JqZWN0JyAmJiBnbG9iYWxUaGlzKSB8fFxuICBjaGVjayh0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdykgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtZ2xvYmFscyAtLSBzYWZlXG4gIGNoZWNrKHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYpIHx8XG4gIGNoZWNrKHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB8fFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmMgLS0gZmFsbGJhY2tcbiAgKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0pKCkgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcblxudmFyIGhhc093blByb3BlcnR5ID0gdW5jdXJyeVRoaXMoe30uaGFzT3duUHJvcGVydHkpO1xuXG4vLyBgSGFzT3duUHJvcGVydHlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1oYXNvd25wcm9wZXJ0eVxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWhhc293biAtLSBzYWZlXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5oYXNPd24gfHwgZnVuY3Rpb24gaGFzT3duKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5KHRvT2JqZWN0KGl0KSwga2V5KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignZG9jdW1lbnQnLCAnZG9jdW1lbnRFbGVtZW50Jyk7XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmtzIHRvIElFOCBmb3IgaXRzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFERVNDUklQVE9SUyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcbnZhciBzcGxpdCA9IHVuY3VycnlUaGlzKCcnLnNwbGl0KTtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3Ncbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyB0aHJvd3MgYW4gZXJyb3IgaW4gcmhpbm8sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9yaGluby9pc3N1ZXMvMzQ2XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnMgLS0gc2FmZVxuICByZXR1cm4gISRPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0KGl0LCAnJykgOiAkT2JqZWN0KGl0KTtcbn0gOiAkT2JqZWN0O1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxudmFyIGZ1bmN0aW9uVG9TdHJpbmcgPSB1bmN1cnJ5VGhpcyhGdW5jdGlvbi50b1N0cmluZyk7XG5cbi8vIHRoaXMgaGVscGVyIGJyb2tlbiBpbiBgY29yZS1qc0AzLjQuMS0zLjQuNGAsIHNvIHdlIGNhbid0IHVzZSBgc2hhcmVkYCBoZWxwZXJcbmlmICghaXNDYWxsYWJsZShzdG9yZS5pbnNwZWN0U291cmNlKSkge1xuICBzdG9yZS5pbnNwZWN0U291cmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uVG9TdHJpbmcoaXQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlLmluc3BlY3RTb3VyY2U7XG4iLCJ2YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlYWstbWFwLWJhc2ljLWRldGVjdGlvbicpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG52YXIgc2hhcmVkS2V5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1rZXknKTtcbnZhciBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hpZGRlbi1rZXlzJyk7XG5cbnZhciBPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCA9ICdPYmplY3QgYWxyZWFkeSBpbml0aWFsaXplZCc7XG52YXIgVHlwZUVycm9yID0gZ2xvYmFsLlR5cGVFcnJvcjtcbnZhciBXZWFrTWFwID0gZ2xvYmFsLldlYWtNYXA7XG52YXIgc2V0LCBnZXQsIGhhcztcblxudmFyIGVuZm9yY2UgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGhhcyhpdCkgPyBnZXQoaXQpIDogc2V0KGl0LCB7fSk7XG59O1xuXG52YXIgZ2V0dGVyRm9yID0gZnVuY3Rpb24gKFRZUEUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBzdGF0ZTtcbiAgICBpZiAoIWlzT2JqZWN0KGl0KSB8fCAoc3RhdGUgPSBnZXQoaXQpKS50eXBlICE9PSBUWVBFKSB7XG4gICAgICB0aHJvdyBUeXBlRXJyb3IoJ0luY29tcGF0aWJsZSByZWNlaXZlciwgJyArIFRZUEUgKyAnIHJlcXVpcmVkJyk7XG4gICAgfSByZXR1cm4gc3RhdGU7XG4gIH07XG59O1xuXG5pZiAoTkFUSVZFX1dFQUtfTUFQIHx8IHNoYXJlZC5zdGF0ZSkge1xuICB2YXIgc3RvcmUgPSBzaGFyZWQuc3RhdGUgfHwgKHNoYXJlZC5zdGF0ZSA9IG5ldyBXZWFrTWFwKCkpO1xuICB2YXIgd21nZXQgPSB1bmN1cnJ5VGhpcyhzdG9yZS5nZXQpO1xuICB2YXIgd21oYXMgPSB1bmN1cnJ5VGhpcyhzdG9yZS5oYXMpO1xuICB2YXIgd21zZXQgPSB1bmN1cnJ5VGhpcyhzdG9yZS5zZXQpO1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgaWYgKHdtaGFzKHN0b3JlLCBpdCkpIHRocm93IFR5cGVFcnJvcihPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCk7XG4gICAgbWV0YWRhdGEuZmFjYWRlID0gaXQ7XG4gICAgd21zZXQoc3RvcmUsIGl0LCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gd21nZXQoc3RvcmUsIGl0KSB8fCB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIHdtaGFzKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGlmIChoYXNPd24oaXQsIFNUQVRFKSkgdGhyb3cgVHlwZUVycm9yKE9CSkVDVF9BTFJFQURZX0lOSVRJQUxJWkVEKTtcbiAgICBtZXRhZGF0YS5mYWNhZGUgPSBpdDtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoaXQsIFNUQVRFLCBtZXRhZGF0YSk7XG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9O1xuICBnZXQgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gaGFzT3duKGl0LCBTVEFURSkgPyBpdFtTVEFURV0gOiB7fTtcbiAgfTtcbiAgaGFzID0gZnVuY3Rpb24gKGl0KSB7XG4gICAgcmV0dXJuIGhhc093bihpdCwgU1RBVEUpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGdldDogZ2V0LFxuICBoYXM6IGhhcyxcbiAgZW5mb3JjZTogZW5mb3JjZSxcbiAgZ2V0dGVyRm9yOiBnZXR0ZXJGb3Jcbn07XG4iLCIvLyBgSXNDYWxsYWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWlzY2FsbGFibGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiB0eXBlb2YgYXJndW1lbnQgPT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG5cbnZhciByZXBsYWNlbWVudCA9IC8jfFxcLnByb3RvdHlwZVxcLi87XG5cbnZhciBpc0ZvcmNlZCA9IGZ1bmN0aW9uIChmZWF0dXJlLCBkZXRlY3Rpb24pIHtcbiAgdmFyIHZhbHVlID0gZGF0YVtub3JtYWxpemUoZmVhdHVyZSldO1xuICByZXR1cm4gdmFsdWUgPT0gUE9MWUZJTEwgPyB0cnVlXG4gICAgOiB2YWx1ZSA9PSBOQVRJVkUgPyBmYWxzZVxuICAgIDogaXNDYWxsYWJsZShkZXRlY3Rpb24pID8gZmFpbHMoZGV0ZWN0aW9uKVxuICAgIDogISFkZXRlY3Rpb247XG59O1xuXG52YXIgbm9ybWFsaXplID0gaXNGb3JjZWQubm9ybWFsaXplID0gZnVuY3Rpb24gKHN0cmluZykge1xuICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZShyZXBsYWNlbWVudCwgJy4nKS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGRhdGEgPSBpc0ZvcmNlZC5kYXRhID0ge307XG52YXIgTkFUSVZFID0gaXNGb3JjZWQuTkFUSVZFID0gJ04nO1xudmFyIFBPTFlGSUxMID0gaXNGb3JjZWQuUE9MWUZJTEwgPSAnUCc7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGb3JjZWQ7XG4iLCIvLyB3ZSBjYW4ndCB1c2UganVzdCBgaXQgPT0gbnVsbGAgc2luY2Ugb2YgYGRvY3VtZW50LmFsbGAgc3BlY2lhbCBjYXNlXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLUlzSFRNTEREQS1pbnRlcm5hbC1zbG90LWFlY1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID09PSBudWxsIHx8IGl0ID09PSB1bmRlZmluZWQ7XG59O1xuIiwidmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIGRvY3VtZW50QWxsID0gdHlwZW9mIGRvY3VtZW50ID09ICdvYmplY3QnICYmIGRvY3VtZW50LmFsbDtcblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1Jc0hUTUxEREEtaW50ZXJuYWwtc2xvdFxudmFyIFNQRUNJQUxfRE9DVU1FTlRfQUxMID0gdHlwZW9mIGRvY3VtZW50QWxsID09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50QWxsICE9PSB1bmRlZmluZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gU1BFQ0lBTF9ET0NVTUVOVF9BTEwgPyBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogaXNDYWxsYWJsZShpdCkgfHwgaXQgPT09IGRvY3VtZW50QWxsO1xufSA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiBpc0NhbGxhYmxlKGl0KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgaXNDYWxsYWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1jYWxsYWJsZScpO1xudmFyIGlzUHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWlzLXByb3RvdHlwZS1vZicpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciAkT2JqZWN0ID0gT2JqZWN0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVTRV9TWU1CT0xfQVNfVUlEID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24gKGl0KSB7XG4gIHZhciAkU3ltYm9sID0gZ2V0QnVpbHRJbignU3ltYm9sJyk7XG4gIHJldHVybiBpc0NhbGxhYmxlKCRTeW1ib2wpICYmIGlzUHJvdG90eXBlT2YoJFN5bWJvbC5wcm90b3R5cGUsICRPYmplY3QoaXQpKTtcbn07XG4iLCJ2YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG5cbi8vIGBMZW5ndGhPZkFycmF5TGlrZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWxlbmd0aG9mYXJyYXlsaWtlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHRvTGVuZ3RoKG9iai5sZW5ndGgpO1xufTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgQ09ORklHVVJBQkxFX0ZVTkNUSU9OX05BTUUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tbmFtZScpLkNPTkZJR1VSQUJMRTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xuXG52YXIgZW5mb3JjZUludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmVuZm9yY2U7XG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0O1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxudmFyIENPTkZJR1VSQUJMRV9MRU5HVEggPSBERVNDUklQVE9SUyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9LCAnbGVuZ3RoJywgeyB2YWx1ZTogOCB9KS5sZW5ndGggIT09IDg7XG59KTtcblxudmFyIFRFTVBMQVRFID0gU3RyaW5nKFN0cmluZykuc3BsaXQoJ1N0cmluZycpO1xuXG52YXIgbWFrZUJ1aWx0SW4gPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWx1ZSwgbmFtZSwgb3B0aW9ucykge1xuICBpZiAoU3RyaW5nKG5hbWUpLnNsaWNlKDAsIDcpID09PSAnU3ltYm9sKCcpIHtcbiAgICBuYW1lID0gJ1snICsgU3RyaW5nKG5hbWUpLnJlcGxhY2UoL15TeW1ib2xcXCgoW14pXSopXFwpLywgJyQxJykgKyAnXSc7XG4gIH1cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5nZXR0ZXIpIG5hbWUgPSAnZ2V0ICcgKyBuYW1lO1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnNldHRlcikgbmFtZSA9ICdzZXQgJyArIG5hbWU7XG4gIGlmICghaGFzT3duKHZhbHVlLCAnbmFtZScpIHx8IChDT05GSUdVUkFCTEVfRlVOQ1RJT05fTkFNRSAmJiB2YWx1ZS5uYW1lICE9PSBuYW1lKSkge1xuICAgIGlmIChERVNDUklQVE9SUykgZGVmaW5lUHJvcGVydHkodmFsdWUsICduYW1lJywgeyB2YWx1ZTogbmFtZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xuICAgIGVsc2UgdmFsdWUubmFtZSA9IG5hbWU7XG4gIH1cbiAgaWYgKENPTkZJR1VSQUJMRV9MRU5HVEggJiYgb3B0aW9ucyAmJiBoYXNPd24ob3B0aW9ucywgJ2FyaXR5JykgJiYgdmFsdWUubGVuZ3RoICE9PSBvcHRpb25zLmFyaXR5KSB7XG4gICAgZGVmaW5lUHJvcGVydHkodmFsdWUsICdsZW5ndGgnLCB7IHZhbHVlOiBvcHRpb25zLmFyaXR5IH0pO1xuICB9XG4gIHRyeSB7XG4gICAgaWYgKG9wdGlvbnMgJiYgaGFzT3duKG9wdGlvbnMsICdjb25zdHJ1Y3RvcicpICYmIG9wdGlvbnMuY29uc3RydWN0b3IpIHtcbiAgICAgIGlmIChERVNDUklQVE9SUykgZGVmaW5lUHJvcGVydHkodmFsdWUsICdwcm90b3R5cGUnLCB7IHdyaXRhYmxlOiBmYWxzZSB9KTtcbiAgICAvLyBpbiBWOCB+IENocm9tZSA1MywgcHJvdG90eXBlcyBvZiBzb21lIG1ldGhvZHMsIGxpa2UgYEFycmF5LnByb3RvdHlwZS52YWx1ZXNgLCBhcmUgbm9uLXdyaXRhYmxlXG4gICAgfSBlbHNlIGlmICh2YWx1ZS5wcm90b3R5cGUpIHZhbHVlLnByb3RvdHlwZSA9IHVuZGVmaW5lZDtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICB2YXIgc3RhdGUgPSBlbmZvcmNlSW50ZXJuYWxTdGF0ZSh2YWx1ZSk7XG4gIGlmICghaGFzT3duKHN0YXRlLCAnc291cmNlJykpIHtcbiAgICBzdGF0ZS5zb3VyY2UgPSBURU1QTEFURS5qb2luKHR5cGVvZiBuYW1lID09ICdzdHJpbmcnID8gbmFtZSA6ICcnKTtcbiAgfSByZXR1cm4gdmFsdWU7XG59O1xuXG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1leHRlbmQtbmF0aXZlIC0tIHJlcXVpcmVkXG5GdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBtYWtlQnVpbHRJbihmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuIGlzQ2FsbGFibGUodGhpcykgJiYgZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKS5zb3VyY2UgfHwgaW5zcGVjdFNvdXJjZSh0aGlzKTtcbn0sICd0b1N0cmluZycpO1xuIiwidmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgTWF0aC50cnVuY2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW1hdGgudHJ1bmNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW1hdGgtdHJ1bmMgLS0gc2FmZVxubW9kdWxlLmV4cG9ydHMgPSBNYXRoLnRydW5jIHx8IGZ1bmN0aW9uIHRydW5jKHgpIHtcbiAgdmFyIG4gPSAreDtcbiAgcmV0dXJuIChuID4gMCA/IGZsb29yIDogY2VpbCkobik7XG59O1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaWU4LWRvbS1kZWZpbmUnKTtcbnZhciBWOF9QUk9UT1RZUEVfREVGSU5FX0JVRyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy92OC1wcm90b3R5cGUtZGVmaW5lLWJ1ZycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJvcGVydHlLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tcHJvcGVydHkta2V5Jyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbnZhciAkZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlkZXNjcmlwdG9yIC0tIHNhZmVcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbnZhciBFTlVNRVJBQkxFID0gJ2VudW1lcmFibGUnO1xudmFyIENPTkZJR1VSQUJMRSA9ICdjb25maWd1cmFibGUnO1xudmFyIFdSSVRBQkxFID0gJ3dyaXRhYmxlJztcblxuLy8gYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5kZWZpbmVwcm9wZXJ0eVxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBWOF9QUk9UT1RZUEVfREVGSU5FX0JVRyA/IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1Byb3BlcnR5S2V5KFApO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKHR5cGVvZiBPID09PSAnZnVuY3Rpb24nICYmIFAgPT09ICdwcm90b3R5cGUnICYmICd2YWx1ZScgaW4gQXR0cmlidXRlcyAmJiBXUklUQUJMRSBpbiBBdHRyaWJ1dGVzICYmICFBdHRyaWJ1dGVzW1dSSVRBQkxFXSkge1xuICAgIHZhciBjdXJyZW50ID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKTtcbiAgICBpZiAoY3VycmVudCAmJiBjdXJyZW50W1dSSVRBQkxFXSkge1xuICAgICAgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gICAgICBBdHRyaWJ1dGVzID0ge1xuICAgICAgICBjb25maWd1cmFibGU6IENPTkZJR1VSQUJMRSBpbiBBdHRyaWJ1dGVzID8gQXR0cmlidXRlc1tDT05GSUdVUkFCTEVdIDogY3VycmVudFtDT05GSUdVUkFCTEVdLFxuICAgICAgICBlbnVtZXJhYmxlOiBFTlVNRVJBQkxFIGluIEF0dHJpYnV0ZXMgPyBBdHRyaWJ1dGVzW0VOVU1FUkFCTEVdIDogY3VycmVudFtFTlVNRVJBQkxFXSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlXG4gICAgICB9O1xuICAgIH1cbiAgfSByZXR1cm4gJGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpO1xufSA6ICRkZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpIHtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1Byb3BlcnR5S2V5KFApO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiAkZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgJFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGNhbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tY2FsbCcpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9Qcm9wZXJ0eUtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcm9wZXJ0eS1rZXknKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lJyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3JcbmV4cG9ydHMuZiA9IERFU0NSSVBUT1JTID8gJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKSB7XG4gIE8gPSB0b0luZGV4ZWRPYmplY3QoTyk7XG4gIFAgPSB0b1Byb3BlcnR5S2V5KFApO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKGhhc093bihPLCBQKSkgcmV0dXJuIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcighY2FsbChwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZS5mLCBPLCBQKSwgT1tQXSk7XG59O1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5bmFtZXNcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eW5hbWVzIC0tIHNhZmVcbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGhpZGRlbktleXMpO1xufTtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eXN5bWJvbHMgLS0gc2FmZVxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1bmN1cnJ5VGhpcyh7fS5pc1Byb3RvdHlwZU9mKTtcbiIsInZhciB1bmN1cnJ5VGhpcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi11bmN1cnJ5LXRoaXMnKTtcbnZhciBoYXNPd24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzLW93bi1wcm9wZXJ0eScpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaW5jbHVkZXMnKS5pbmRleE9mO1xudmFyIGhpZGRlbktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGlkZGVuLWtleXMnKTtcblxudmFyIHB1c2ggPSB1bmN1cnJ5VGhpcyhbXS5wdXNoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgIWhhc093bihoaWRkZW5LZXlzLCBrZXkpICYmIGhhc093bihPLCBrZXkpICYmIHB1c2gocmVzdWx0LCBrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlIChuYW1lcy5sZW5ndGggPiBpKSBpZiAoaGFzT3duKE8sIGtleSA9IG5hbWVzW2krK10pKSB7XG4gICAgfmluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHB1c2gocmVzdWx0LCBrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWdldG93bnByb3BlcnR5ZGVzY3JpcHRvciAtLSBzYWZlXG52YXIgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gTmFzaG9ybiB+IEpESzggYnVnXG52YXIgTkFTSE9STl9CVUcgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgISRwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHsgMTogMiB9LCAxKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGVgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy1vYmplY3QucHJvdG90eXBlLnByb3BlcnR5aXNlbnVtZXJhYmxlXG5leHBvcnRzLmYgPSBOQVNIT1JOX0JVRyA/IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKFYpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGhpcywgVik7XG4gIHJldHVybiAhIWRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci5lbnVtZXJhYmxlO1xufSA6ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiIsInZhciBjYWxsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWNhbGwnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgT3JkaW5hcnlUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLW9yZGluYXJ5dG9wcmltaXRpdmVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBwcmVmKSB7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAocHJlZiA9PT0gJ3N0cmluZycgJiYgaXNDYWxsYWJsZShmbiA9IGlucHV0LnRvU3RyaW5nKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKGlzQ2FsbGFibGUoZm4gPSBpbnB1dC52YWx1ZU9mKSAmJiAhaXNPYmplY3QodmFsID0gY2FsbChmbiwgaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHByZWYgIT09ICdzdHJpbmcnICYmIGlzQ2FsbGFibGUoZm4gPSBpbnB1dC50b1N0cmluZykgJiYgIWlzT2JqZWN0KHZhbCA9IGNhbGwoZm4sIGlucHV0KSkpIHJldHVybiB2YWw7XG4gIHRocm93ICRUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgdW5jdXJyeVRoaXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZnVuY3Rpb24tdW5jdXJyeS10aGlzJyk7XG52YXIgZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1uYW1lcycpO1xudmFyIGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZ2V0LW93bi1wcm9wZXJ0eS1zeW1ib2xzJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbnZhciBjb25jYXQgPSB1bmN1cnJ5VGhpcyhbXS5jb25jYXQpO1xuXG4vLyBhbGwgb2JqZWN0IGtleXMsIGluY2x1ZGVzIG5vbi1lbnVtZXJhYmxlIGFuZCBzeW1ib2xzXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ1JlZmxlY3QnLCAnb3duS2V5cycpIHx8IGZ1bmN0aW9uIG93bktleXMoaXQpIHtcbiAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlLmYoYW5PYmplY3QoaXQpKTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICByZXR1cm4gZ2V0T3duUHJvcGVydHlTeW1ib2xzID8gY29uY2F0KGtleXMsIGdldE93blByb3BlcnR5U3ltYm9scyhpdCkpIDoga2V5cztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbi8vIGBSZWdFeHAucHJvdG90eXBlLmZsYWdzYCBnZXR0ZXIgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtZ2V0LXJlZ2V4cC5wcm90b3R5cGUuZmxhZ3Ncbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdGhhdCA9IGFuT2JqZWN0KHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gJyc7XG4gIGlmICh0aGF0Lmhhc0luZGljZXMpIHJlc3VsdCArPSAnZCc7XG4gIGlmICh0aGF0Lmdsb2JhbCkgcmVzdWx0ICs9ICdnJztcbiAgaWYgKHRoYXQuaWdub3JlQ2FzZSkgcmVzdWx0ICs9ICdpJztcbiAgaWYgKHRoYXQubXVsdGlsaW5lKSByZXN1bHQgKz0gJ20nO1xuICBpZiAodGhhdC5kb3RBbGwpIHJlc3VsdCArPSAncyc7XG4gIGlmICh0aGF0LnVuaWNvZGUpIHJlc3VsdCArPSAndSc7XG4gIGlmICh0aGF0LnVuaWNvZGVTZXRzKSByZXN1bHQgKz0gJ3YnO1xuICBpZiAodGhhdC5zdGlja3kpIHJlc3VsdCArPSAneSc7XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwidmFyIGlzTnVsbE9yVW5kZWZpbmVkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW51bGwtb3ItdW5kZWZpbmVkJyk7XG5cbnZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG4vLyBgUmVxdWlyZU9iamVjdENvZXJjaWJsZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXJlcXVpcmVvYmplY3Rjb2VyY2libGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpc051bGxPclVuZGVmaW5lZChpdCkpIHRocm93ICRUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbiIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xuXG52YXIga2V5cyA9IHNoYXJlZCgna2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIGtleXNba2V5XSB8fCAoa2V5c1trZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZGVmaW5lR2xvYmFsUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWdsb2JhbC1wcm9wZXJ0eScpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCBkZWZpbmVHbG9iYWxQcm9wZXJ0eShTSEFSRUQsIHt9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBzdG9yZTtcbiIsInZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcbnZhciBzdG9yZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQtc3RvcmUnKTtcblxuKG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB2YWx1ZSAhPT0gdW5kZWZpbmVkID8gdmFsdWUgOiB7fSk7XG59KSgndmVyc2lvbnMnLCBbXSkucHVzaCh7XG4gIHZlcnNpb246ICczLjI1LjAnLFxuICBtb2RlOiBJU19QVVJFID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMTQtMjAyMiBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KScsXG4gIGxpY2Vuc2U6ICdodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9ibG9iL3YzLjI1LjAvTElDRU5TRScsXG4gIHNvdXJjZTogJ2h0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzJ1xufSk7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBlcy14L25vLXN5bWJvbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZW5naW5lLXY4LXZlcnNpb24nKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZ2V0b3ducHJvcGVydHlzeW1ib2xzIC0tIHJlcXVpcmVkIGZvciB0ZXN0aW5nXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgc3ltYm9sID0gU3ltYm9sKCk7XG4gIC8vIENocm9tZSAzOCBTeW1ib2wgaGFzIGluY29ycmVjdCB0b1N0cmluZyBjb252ZXJzaW9uXG4gIC8vIGBnZXQtb3duLXByb3BlcnR5LXN5bWJvbHNgIHBvbHlmaWxsIHN5bWJvbHMgY29udmVydGVkIHRvIG9iamVjdCBhcmUgbm90IFN5bWJvbCBpbnN0YW5jZXNcbiAgcmV0dXJuICFTdHJpbmcoc3ltYm9sKSB8fCAhKE9iamVjdChzeW1ib2wpIGluc3RhbmNlb2YgU3ltYm9sKSB8fFxuICAgIC8vIENocm9tZSAzOC00MCBzeW1ib2xzIGFyZSBub3QgaW5oZXJpdGVkIGZyb20gRE9NIGNvbGxlY3Rpb25zIHByb3RvdHlwZXMgdG8gaW5zdGFuY2VzXG4gICAgIVN5bWJvbC5zaGFtICYmIFY4X1ZFUlNJT04gJiYgVjhfVkVSU0lPTiA8IDQxO1xufSk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGFwcGx5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLWFwcGx5Jyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1iaW5kLWNvbnRleHQnKTtcbnZhciBpc0NhbGxhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWNhbGxhYmxlJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGFycmF5U2xpY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc2xpY2UnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG52YXIgdmFsaWRhdGVBcmd1bWVudHNMZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdmFsaWRhdGUtYXJndW1lbnRzLWxlbmd0aCcpO1xudmFyIElTX0lPUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtaW9zJyk7XG52YXIgSVNfTk9ERSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbmdpbmUtaXMtbm9kZScpO1xuXG52YXIgc2V0ID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhciA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgRnVuY3Rpb24gPSBnbG9iYWwuRnVuY3Rpb247XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgU3RyaW5nID0gZ2xvYmFsLlN0cmluZztcbnZhciBjb3VudGVyID0gMDtcbnZhciBxdWV1ZSA9IHt9O1xudmFyIE9OUkVBRFlTVEFURUNIQU5HRSA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xudmFyIGxvY2F0aW9uLCBkZWZlciwgY2hhbm5lbCwgcG9ydDtcblxudHJ5IHtcbiAgLy8gRGVubyB0aHJvd3MgYSBSZWZlcmVuY2VFcnJvciBvbiBgbG9jYXRpb25gIGFjY2VzcyB3aXRob3V0IGAtLWxvY2F0aW9uYCBmbGFnXG4gIGxvY2F0aW9uID0gZ2xvYmFsLmxvY2F0aW9uO1xufSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuXG52YXIgcnVuID0gZnVuY3Rpb24gKGlkKSB7XG4gIGlmIChoYXNPd24ocXVldWUsIGlkKSkge1xuICAgIHZhciBmbiA9IHF1ZXVlW2lkXTtcbiAgICBkZWxldGUgcXVldWVbaWRdO1xuICAgIGZuKCk7XG4gIH1cbn07XG5cbnZhciBydW5uZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBydW4oaWQpO1xuICB9O1xufTtcblxudmFyIGxpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIHJ1bihldmVudC5kYXRhKTtcbn07XG5cbnZhciBwb3N0ID0gZnVuY3Rpb24gKGlkKSB7XG4gIC8vIG9sZCBlbmdpbmVzIGhhdmUgbm90IGxvY2F0aW9uLm9yaWdpblxuICBnbG9iYWwucG9zdE1lc3NhZ2UoU3RyaW5nKGlkKSwgbG9jYXRpb24ucHJvdG9jb2wgKyAnLy8nICsgbG9jYXRpb24uaG9zdCk7XG59O1xuXG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldCB8fCAhY2xlYXIpIHtcbiAgc2V0ID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGhhbmRsZXIpIHtcbiAgICB2YWxpZGF0ZUFyZ3VtZW50c0xlbmd0aChhcmd1bWVudHMubGVuZ3RoLCAxKTtcbiAgICB2YXIgZm4gPSBpc0NhbGxhYmxlKGhhbmRsZXIpID8gaGFuZGxlciA6IEZ1bmN0aW9uKGhhbmRsZXIpO1xuICAgIHZhciBhcmdzID0gYXJyYXlTbGljZShhcmd1bWVudHMsIDEpO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBhcHBseShmbiwgdW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhciA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChJU19OT0RFKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2socnVubmVyKGlkKSk7XG4gICAgfTtcbiAgLy8gU3BoZXJlIChKUyBnYW1lIGVuZ2luZSkgRGlzcGF0Y2ggQVBJXG4gIH0gZWxzZSBpZiAoRGlzcGF0Y2ggJiYgRGlzcGF0Y2gubm93KSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIERpc3BhdGNoLm5vdyhydW5uZXIoaWQpKTtcbiAgICB9O1xuICAvLyBCcm93c2VycyB3aXRoIE1lc3NhZ2VDaGFubmVsLCBpbmNsdWRlcyBXZWJXb3JrZXJzXG4gIC8vIGV4Y2VwdCBpT1MgLSBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvNjI0XG4gIH0gZWxzZSBpZiAoTWVzc2FnZUNoYW5uZWwgJiYgIUlTX0lPUykge1xuICAgIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICBwb3J0ID0gY2hhbm5lbC5wb3J0MjtcbiAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGxpc3RlbmVyO1xuICAgIGRlZmVyID0gYmluZChwb3J0LnBvc3RNZXNzYWdlLCBwb3J0KTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBwb3N0TWVzc2FnZSwgc2tpcCBXZWJXb3JrZXJzXG4gIC8vIElFOCBoYXMgcG9zdE1lc3NhZ2UsIGJ1dCBpdCdzIHN5bmMgJiB0eXBlb2YgaXRzIHBvc3RNZXNzYWdlIGlzICdvYmplY3QnXG4gIH0gZWxzZSBpZiAoXG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIgJiZcbiAgICBpc0NhbGxhYmxlKGdsb2JhbC5wb3N0TWVzc2FnZSkgJiZcbiAgICAhZ2xvYmFsLmltcG9ydFNjcmlwdHMgJiZcbiAgICBsb2NhdGlvbiAmJiBsb2NhdGlvbi5wcm90b2NvbCAhPT0gJ2ZpbGU6JyAmJlxuICAgICFmYWlscyhwb3N0KVxuICApIHtcbiAgICBkZWZlciA9IHBvc3Q7XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZiAoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bihpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHNldFRpbWVvdXQocnVubmVyKGlkKSwgMCk7XG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGNsZWFyOiBjbGVhclxufTtcbiIsInZhciB0b0ludGVnZXJPckluZmluaXR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXItb3ItaW5maW5pdHknKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xuXG4vLyBIZWxwZXIgZm9yIGEgcG9wdWxhciByZXBlYXRpbmcgY2FzZSBvZiB0aGUgc3BlYzpcbi8vIExldCBpbnRlZ2VyIGJlID8gVG9JbnRlZ2VyKGluZGV4KS5cbi8vIElmIGludGVnZXIgPCAwLCBsZXQgcmVzdWx0IGJlIG1heCgobGVuZ3RoICsgaW50ZWdlciksIDApOyBlbHNlIGxldCByZXN1bHQgYmUgbWluKGludGVnZXIsIGxlbmd0aCkuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIHZhciBpbnRlZ2VyID0gdG9JbnRlZ2VyT3JJbmZpbml0eShpbmRleCk7XG4gIHJldHVybiBpbnRlZ2VyIDwgMCA/IG1heChpbnRlZ2VyICsgbGVuZ3RoLCAwKSA6IG1pbihpbnRlZ2VyLCBsZW5ndGgpO1xufTtcbiIsIi8vIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbmRleGVkLW9iamVjdCcpO1xudmFyIHJlcXVpcmVPYmplY3RDb2VyY2libGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVxdWlyZS1vYmplY3QtY29lcmNpYmxlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBJbmRleGVkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoaXQpKTtcbn07XG4iLCJ2YXIgdHJ1bmMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbWF0aC10cnVuYycpO1xuXG4vLyBgVG9JbnRlZ2VyT3JJbmZpbml0eWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvaW50ZWdlcm9yaW5maW5pdHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHZhciBudW1iZXIgPSArYXJndW1lbnQ7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmUgLS0gTmFOIGNoZWNrXG4gIHJldHVybiBudW1iZXIgIT09IG51bWJlciB8fCBudW1iZXIgPT09IDAgPyAwIDogdHJ1bmMobnVtYmVyKTtcbn07XG4iLCJ2YXIgdG9JbnRlZ2VyT3JJbmZpbml0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyLW9yLWluZmluaXR5Jyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9sZW5ndGhcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBhcmd1bWVudCA+IDAgPyBtaW4odG9JbnRlZ2VyT3JJbmZpbml0eShhcmd1bWVudCksIDB4MUZGRkZGRkZGRkZGRkYpIDogMDsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcblxuLy8gYFRvT2JqZWN0YCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5lcy9lY21hMjYyLyNzZWMtdG9vYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiAkT2JqZWN0KHJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpKTtcbn07XG4iLCJ2YXIgY2FsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mdW5jdGlvbi1jYWxsJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNTeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtc3ltYm9sJyk7XG52YXIgZ2V0TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1tZXRob2QnKTtcbnZhciBvcmRpbmFyeVRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29yZGluYXJ5LXRvLXByaW1pdGl2ZScpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcbnZhciBUT19QUklNSVRJVkUgPSB3ZWxsS25vd25TeW1ib2woJ3RvUHJpbWl0aXZlJyk7XG5cbi8vIGBUb1ByaW1pdGl2ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbnB1dCwgcHJlZikge1xuICBpZiAoIWlzT2JqZWN0KGlucHV0KSB8fCBpc1N5bWJvbChpbnB1dCkpIHJldHVybiBpbnB1dDtcbiAgdmFyIGV4b3RpY1RvUHJpbSA9IGdldE1ldGhvZChpbnB1dCwgVE9fUFJJTUlUSVZFKTtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGV4b3RpY1RvUHJpbSkge1xuICAgIGlmIChwcmVmID09PSB1bmRlZmluZWQpIHByZWYgPSAnZGVmYXVsdCc7XG4gICAgcmVzdWx0ID0gY2FsbChleG90aWNUb1ByaW0sIGlucHV0LCBwcmVmKTtcbiAgICBpZiAoIWlzT2JqZWN0KHJlc3VsdCkgfHwgaXNTeW1ib2wocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcbiAgICB0aHJvdyAkVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xuICB9XG4gIGlmIChwcmVmID09PSB1bmRlZmluZWQpIHByZWYgPSAnbnVtYmVyJztcbiAgcmV0dXJuIG9yZGluYXJ5VG9QcmltaXRpdmUoaW5wdXQsIHByZWYpO1xufTtcbiIsInZhciB0b1ByaW1pdGl2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1wcmltaXRpdmUnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1zeW1ib2wnKTtcblxuLy8gYFRvUHJvcGVydHlLZXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmVzL2VjbWEyNjIvI3NlYy10b3Byb3BlcnR5a2V5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICB2YXIga2V5ID0gdG9QcmltaXRpdmUoYXJndW1lbnQsICdzdHJpbmcnKTtcbiAgcmV0dXJuIGlzU3ltYm9sKGtleSkgPyBrZXkgOiBrZXkgKyAnJztcbn07XG4iLCJ2YXIgJFN0cmluZyA9IFN0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gJFN0cmluZyhhcmd1bWVudCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuICdPYmplY3QnO1xuICB9XG59O1xuIiwidmFyIHVuY3VycnlUaGlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Z1bmN0aW9uLXVuY3VycnktdGhpcycpO1xuXG52YXIgaWQgPSAwO1xudmFyIHBvc3RmaXggPSBNYXRoLnJhbmRvbSgpO1xudmFyIHRvU3RyaW5nID0gdW5jdXJyeVRoaXMoMS4wLnRvU3RyaW5nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyAoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgdG9TdHJpbmcoKytpZCArIHBvc3RmaXgsIDM2KTtcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBlcy14L25vLXN5bWJvbCAtLSByZXF1aXJlZCBmb3IgdGVzdGluZyAqL1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc3ltYm9sLWNvbnN0cnVjdG9yLWRldGVjdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9TWU1CT0xcbiAgJiYgIVN5bWJvbC5zaGFtXG4gICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCc7XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBWOCB+IENocm9tZSAzNi1cbi8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMzMzRcbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgJiYgZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXMteC9uby1vYmplY3QtZGVmaW5lcHJvcGVydHkgLS0gcmVxdWlyZWQgZm9yIHRlc3RpbmdcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0sICdwcm90b3R5cGUnLCB7XG4gICAgdmFsdWU6IDQyLFxuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KS5wcm90b3R5cGUgIT0gNDI7XG59KTtcbiIsInZhciAkVHlwZUVycm9yID0gVHlwZUVycm9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXNzZWQsIHJlcXVpcmVkKSB7XG4gIGlmIChwYXNzZWQgPCByZXF1aXJlZCkgdGhyb3cgJFR5cGVFcnJvcignTm90IGVub3VnaCBhcmd1bWVudHMnKTtcbiAgcmV0dXJuIHBhc3NlZDtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGlzQ2FsbGFibGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtY2FsbGFibGUnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0NhbGxhYmxlKFdlYWtNYXApICYmIC9uYXRpdmUgY29kZS8udGVzdChTdHJpbmcoV2Vha01hcCkpO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzaGFyZWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcy1vd24tcHJvcGVydHknKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG52YXIgTkFUSVZFX1NZTUJPTCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zeW1ib2wtY29uc3RydWN0b3ItZGV0ZWN0aW9uJyk7XG52YXIgVVNFX1NZTUJPTF9BU19VSUQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlLXN5bWJvbC1hcy11aWQnKTtcblxudmFyIFdlbGxLbm93blN5bWJvbHNTdG9yZSA9IHNoYXJlZCgnd2tzJyk7XG52YXIgU3ltYm9sID0gZ2xvYmFsLlN5bWJvbDtcbnZhciBzeW1ib2xGb3IgPSBTeW1ib2wgJiYgU3ltYm9sWydmb3InXTtcbnZhciBjcmVhdGVXZWxsS25vd25TeW1ib2wgPSBVU0VfU1lNQk9MX0FTX1VJRCA/IFN5bWJvbCA6IFN5bWJvbCAmJiBTeW1ib2wud2l0aG91dFNldHRlciB8fCB1aWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFoYXNPd24oV2VsbEtub3duU3ltYm9sc1N0b3JlLCBuYW1lKSB8fCAhKE5BVElWRV9TWU1CT0wgfHwgdHlwZW9mIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9PSAnc3RyaW5nJykpIHtcbiAgICB2YXIgZGVzY3JpcHRpb24gPSAnU3ltYm9sLicgKyBuYW1lO1xuICAgIGlmIChOQVRJVkVfU1lNQk9MICYmIGhhc093bihTeW1ib2wsIG5hbWUpKSB7XG4gICAgICBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBTeW1ib2xbbmFtZV07XG4gICAgfSBlbHNlIGlmIChVU0VfU1lNQk9MX0FTX1VJRCAmJiBzeW1ib2xGb3IpIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IHN5bWJvbEZvcihkZXNjcmlwdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXSA9IGNyZWF0ZVdlbGxLbm93blN5bWJvbChkZXNjcmlwdGlvbik7XG4gICAgfVxuICB9IHJldHVybiBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV07XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZUJ1aWx0SW5BY2Nlc3NvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtYnVpbHQtaW4tYWNjZXNzb3InKTtcbnZhciByZWdFeHBGbGFncyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWdleHAtZmxhZ3MnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG4vLyBiYWJlbC1taW5pZnkgYW5kIENsb3N1cmUgQ29tcGlsZXIgdHJhbnNwaWxlcyBSZWdFeHAoJy4nLCAnZCcpIC0+IC8uL2QgYW5kIGl0IGNhdXNlcyBTeW50YXhFcnJvclxudmFyIFJlZ0V4cCA9IGdsb2JhbC5SZWdFeHA7XG52YXIgUmVnRXhwUHJvdG90eXBlID0gUmVnRXhwLnByb3RvdHlwZTtcblxudmFyIEZPUkNFRCA9IERFU0NSSVBUT1JTICYmIGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdmFyIElORElDRVNfU1VQUE9SVCA9IHRydWU7XG4gIHRyeSB7XG4gICAgUmVnRXhwKCcuJywgJ2QnKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBJTkRJQ0VTX1NVUFBPUlQgPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBPID0ge307XG4gIC8vIG1vZGVybiBWOCBidWdcbiAgdmFyIGNhbGxzID0gJyc7XG4gIHZhciBleHBlY3RlZCA9IElORElDRVNfU1VQUE9SVCA/ICdkZ2ltc3knIDogJ2dpbXN5JztcblxuICB2YXIgYWRkR2V0dGVyID0gZnVuY3Rpb24gKGtleSwgY2hyKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGVzLXgvbm8tb2JqZWN0LWRlZmluZXByb3BlcnR5IC0tIHNhZmVcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywga2V5LCB7IGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbHMgKz0gY2hyO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSB9KTtcbiAgfTtcblxuICB2YXIgcGFpcnMgPSB7XG4gICAgZG90QWxsOiAncycsXG4gICAgZ2xvYmFsOiAnZycsXG4gICAgaWdub3JlQ2FzZTogJ2knLFxuICAgIG11bHRpbGluZTogJ20nLFxuICAgIHN0aWNreTogJ3knXG4gIH07XG5cbiAgaWYgKElORElDRVNfU1VQUE9SVCkgcGFpcnMuaGFzSW5kaWNlcyA9ICdkJztcblxuICBmb3IgKHZhciBrZXkgaW4gcGFpcnMpIGFkZEdldHRlcihrZXksIHBhaXJzW2tleV0pO1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcy14L25vLW9iamVjdC1nZXRvd25wcm9wZXJ0eWRlc2NyaXB0b3IgLS0gc2FmZVxuICB2YXIgcmVzdWx0ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihSZWdFeHBQcm90b3R5cGUsICdmbGFncycpLmdldC5jYWxsKE8pO1xuXG4gIHJldHVybiByZXN1bHQgIT09IGV4cGVjdGVkIHx8IGNhbGxzICE9PSBleHBlY3RlZDtcbn0pO1xuXG4vLyBgUmVnRXhwLnByb3RvdHlwZS5mbGFnc2AgZ2V0dGVyXG4vLyBodHRwczovL3RjMzkuZXMvZWNtYTI2Mi8jc2VjLWdldC1yZWdleHAucHJvdG90eXBlLmZsYWdzXG5pZiAoRk9SQ0VEKSBkZWZpbmVCdWlsdEluQWNjZXNzb3IoUmVnRXhwUHJvdG90eXBlLCAnZmxhZ3MnLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZ2V0OiByZWdFeHBGbGFnc1xufSk7XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgY2xlYXJJbW1lZGlhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdGFzaycpLmNsZWFyO1xuXG4vLyBgY2xlYXJJbW1lZGlhdGVgIG1ldGhvZFxuLy8gaHR0cDovL3czYy5naXRodWIuaW8vc2V0SW1tZWRpYXRlLyNzaS1jbGVhckltbWVkaWF0ZVxuJCh7IGdsb2JhbDogdHJ1ZSwgYmluZDogdHJ1ZSwgZW51bWVyYWJsZTogdHJ1ZSwgZm9yY2VkOiBnbG9iYWwuY2xlYXJJbW1lZGlhdGUgIT09IGNsZWFySW1tZWRpYXRlIH0sIHtcbiAgY2xlYXJJbW1lZGlhdGU6IGNsZWFySW1tZWRpYXRlXG59KTtcbiIsIi8vIFRPRE86IFJlbW92ZSB0aGlzIG1vZHVsZSBmcm9tIGBjb3JlLWpzQDRgIHNpbmNlIGl0J3Mgc3BsaXQgdG8gbW9kdWxlcyBsaXN0ZWQgYmVsb3dcbnJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmNsZWFyLWltbWVkaWF0ZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuc2V0LWltbWVkaWF0ZScpO1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNldEltbWVkaWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90YXNrJykuc2V0O1xuXG4vLyBgc2V0SW1tZWRpYXRlYCBtZXRob2Rcbi8vIGh0dHA6Ly93M2MuZ2l0aHViLmlvL3NldEltbWVkaWF0ZS8jc2ktc2V0SW1tZWRpYXRlXG4kKHsgZ2xvYmFsOiB0cnVlLCBiaW5kOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCBmb3JjZWQ6IGdsb2JhbC5zZXRJbW1lZGlhdGUgIT09IHNldEltbWVkaWF0ZSB9LCB7XG4gIHNldEltbWVkaWF0ZTogc2V0SW1tZWRpYXRlXG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsImltcG9ydCB7IHBob3RvZ3JhcGhlckZhY3RvcnkgfSBmcm9tIFwiLi4vZmFjdG9yaWVzL3Bob3RvZ3JhcGhlckZhY3RvcnlcIjtcclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzcGxheURhdGEocGhvdG9ncmFwaGVycywgaWQpIHtcclxuICAgIGxldCBwaG90b2dyYXBoZXJTZWxlY3RlZCA9IFwiXCI7XHJcblxyXG4gICAgcGhvdG9ncmFwaGVycy5mb3JFYWNoKChwaG90b2dyYXBoZXIpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHBob3RvZ3JhcGhlci5pZCA9PSBpZCkge1xyXG4gICAgICAgICAgICAvLyBUaGVuIHdlIGFyZSBnb2luZyB1c2UgdGhlIFBob3RvZ3JhcGhlckZhY3RvcnkgdG8gc2V0IERPTVxyXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHsgY29uc29sZS5sb2cocGhvdG9ncmFwaGVyKTsgfVxyXG4gICAgICAgICAgICBjb25zdCBwaG90b2dyYXBoZXJNb2RlbCA9IHBob3RvZ3JhcGhlckZhY3RvcnkocGhvdG9ncmFwaGVyKTtcclxuICAgICAgICAgICAgcGhvdG9ncmFwaGVyTW9kZWwuc2V0UGhvdG9ncmFwaGVySGVhZGVyKCk7XHJcbiAgICAgICAgICAgIHBob3RvZ3JhcGhlck1vZGVsLnNldFN0aWNreUJhclByaWNlKCk7XHJcblxyXG4gICAgICAgICAgICBwaG90b2dyYXBoZXJTZWxlY3RlZCA9IHBob3RvZ3JhcGhlclxyXG4gICAgICAgICAgICAvLyBFbmQgb2YgUGhvdG9ncmFwaGVyRmFjdG9yeSBXb3JrXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICByZXR1cm4gKHBob3RvZ3JhcGhlclNlbGVjdGVkKTsgLy8gUmV0dXJuIHRoZSBwaG90b2dyYXBoZXJTaG93IGF0IHRoZSBlbmRcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXNwbGF5RGF0YUFsbChwaG90b2dyYXBoZXJzLCBxdWVyeVNlbGVjdG9yKSB7XHJcblxyXG4gICAgcGhvdG9ncmFwaGVycy5mb3JFYWNoKChwaG90b2dyYXBoZXIpID0+IHtcclxuXHJcbiAgICAgICAgLy8gVGhlbiB3ZSBhcmUgZ29pbmcgdXNlIHRoZSBQaG90b2dyYXBoZXJGYWN0b3J5IHRvIGdlbmVyYXRlIERPTVxyXG4gICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlcnNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeVNlbGVjdG9yKTtcclxuICAgICAgICBjb25zdCBwaG90b2dyYXBoZXJNb2RlbCA9IHBob3RvZ3JhcGhlckZhY3RvcnkocGhvdG9ncmFwaGVyKTtcclxuICAgICAgICBjb25zdCB1c2VyQ2FyZERPTSA9IHBob3RvZ3JhcGhlck1vZGVsLmdldFVzZXJDYXJkRE9NKCk7XHJcblxyXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JykgeyBjb25zb2xlLmxvZyhwaG90b2dyYXBoZXIpOyB9XHJcbiAgICAgICAgaWYgKHVzZXJDYXJkRE9NKSB7XHJcbiAgICAgICAgICAgIHBob3RvZ3JhcGhlcnNTZWN0aW9uLmFwcGVuZENoaWxkKHVzZXJDYXJkRE9NKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRW5kIG9mIFBob3RvZ3JhcGhlckZhY3RvcnkgV29ya1xyXG5cclxuICAgIH0pO1xyXG5cclxuXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IG1lZGlhRmFjdG9yeSB9IGZyb20gXCIuLi9mYWN0b3JpZXMvbWVkaWFGYWN0b3J5XCI7XHJcbmltcG9ydCB7IHNldElubmVySHRtbCB9IGZyb20gXCIuLi91dGlscy9kb21cIjtcclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzcGxheU1lZGlhKG1lZGlhcywgcXVlcnlTZWxlY3RvciwgcGhvdG9ncmFwaGVySWQpIHtcclxuICAgIGxldCB0b3RhbExpa2VzID0gMDtcclxuICAgIGxldCBzZWxlY3RlZE1lZGlhID0gW107XHJcbiAgICBcclxuICAgIG1lZGlhcy5mb3JFYWNoKChtZWRpYSkgPT4ge1xyXG5cclxuICAgICAgICBpZiAocGhvdG9ncmFwaGVySWQgPT0gbWVkaWEucGhvdG9ncmFwaGVySWQpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JykgeyBjb25zb2xlLmxvZyhtZWRpYSk7IH1cclxuICAgICAgICAgICAgc2VsZWN0ZWRNZWRpYS5wdXNoKG1lZGlhKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRoZW4gd2UgYXJlIGdvaW5nIHVzZSB0aGUgTWVkaWFGYWN0b3J5IHRvIGdlbmVyYXRlIERPTVxyXG4gICAgICAgICAgICBjb25zdCBtZWRpYXNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeVNlbGVjdG9yKTtcclxuICAgICAgICAgICAgY29uc3QgbWVkaWFNb2RlbCA9IG1lZGlhRmFjdG9yeShtZWRpYSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lZGlhRE9NID0gbWVkaWFNb2RlbC5nZXRNZWRpYURPTSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1lZGlhRE9NKSB7XHJcbiAgICAgICAgICAgICAgICBtZWRpYXNTZWN0aW9uLmFwcGVuZENoaWxkKG1lZGlhRE9NKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBFbmQgb2YgTWVkaWFGYWN0b3J5IFdvcmtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIG1lZGlhIG9iamVjdCBnb3QgTGlrZXMgcHJvcHJpZXR5IHRoZW5cclxuICAgICAgICAgICAgaWYgKG1lZGlhLmxpa2VzKSB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbExpa2VzICs9IG1lZGlhLmxpa2VzOyAvLyBDb3VudCBhbGwgbGlrZXNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlRoZXJlcyBpcyBubyBsaWtlIGFuZCB0b3RhbExpa2VzLCBsb29rIG1lZGlhRmFjdG9yeSByZXR1cm5lZCBhIG9iamVjdCB3aXRob3V0IGxpa2VzIHByb3ByaWV0eVwiKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIHNldElubmVySHRtbChcIi50b3RhbF9saWtlc1wiLCB0b3RhbExpa2VzKTtcclxuXHJcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHsgY29uc29sZS5sb2coXCJUb3RhbCBMaWtlOiBcIiArIHRvdGFsTGlrZXMpOyB9XHJcblxyXG4gICAgcmV0dXJuIHNlbGVjdGVkTWVkaWE7XHJcbn1cclxuXHJcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tIFwiLi4vdXRpbHMvZG9tXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWVkaWFGYWN0b3J5KGRhdGEpIHtcclxuICAgIGNvbnN0IHsgaWQsIHBob3RvZ3JhcGhlcklkLCB0aXRsZSwgaW1hZ2UsIHZpZGVvLCBsaWtlcyB9ID0gZGF0YTtcclxuXHJcbiAgICBjb25zdCBtb3ZpZSA9IGBhc3NldHMvdmlkZW8vJHt2aWRlb31gO1xyXG4gICAgY29uc3QgcGljdHVyZSA9IGBhc3NldHMvaW1hZ2VzLyR7aW1hZ2V9YDtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRNZWRpYURPTSgpIHtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIERPTSBvbmx5IGlmIHdlIGdvdCBpZHMgYW5kIGEgUGljdHVyZSBvciBhIFZpZGVvXHJcbiAgICAgICAgY29uc3QgaGFzUGhvdG9ncmFwaGVyID0gaWQgJiYgcGhvdG9ncmFwaGVySWQ7XHJcbiAgICAgICAgY29uc3QgaGFzQ29udGVudCA9IGltYWdlIHx8IHZpZGVvXHJcblxyXG4gICAgICAgIGlmIChoYXNQaG90b2dyYXBoZXIgJiYgaGFzQ29udGVudCkge1xyXG4gICAgICAgICAgICAvLyBDUkVBVEUgQSBBUlRJQ0xFXHJcbiAgICAgICAgICAgIGNvbnN0IGFydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm1lZGlhX2NhcmRcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBCdWlsZCBBIEhSRUYgRUxFTUVOVFxyXG4gICAgICAgICAgICBjb25zdCBsaW5rRWxlbWVudCA9IGFydGljbGUuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBkb20uYnVpbGRFbGVtZW50KFwiYVwiLCBgJHtpZH1gLCBcImlkXCIpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGRvbS5zZXRBcmlhbExhYmVsKGxpbmtFbGVtZW50LCBcIkxpbGFjIGJyZWFzdGVkIHJvbGxlciwgY2xvc2V1cCB2aWV3XCIpIC8vIFNldCBBcmllbExhYmVsIHRvIEFIcmVmXHJcblxyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgaW1hZ2Ugb3IgdmlkZW8gZXhpc3RzXHJcbiAgICAgICAgICAgIGlmIChpbWFnZSkge1xyXG4gICAgICAgICAgICAgICAgZG9tLmluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KGxpbmtFbGVtZW50LCBwaWN0dXJlLCB0aXRsZSk7IC8vIEluc2VydCBwaWN0dXJlIHdpdGggQUxUXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHZpZGVvKSB7XHJcbiAgICAgICAgICAgICAgICBkb20uaW5zZXJ0VmlkZW9JbnNpZGVFbGVtZW50KGxpbmtFbGVtZW50LCBtb3ZpZSwgYE1vdmllICR7dmlkZW99YCk7IC8vIEluc2VydCBWaWRlbyB3aXRoIEFyaWVsIExhYmVsXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEdlbmVyYXRlIERldGFpbHMgKHRpdGxlICsgTGlrZXMpXHJcbiAgICAgICAgICAgIGlmICh0aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRpdGxlX2g2ID0gYDxoNj4ke3RpdGxlfTwvaDY+YDtcclxuICAgICAgICAgICAgICAgIGxldCBsaWtlc19oNiA9IGA8aDYgYXJpYS1sYWJlbD0nbGlrZXMnPjA8L2g2PmA7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlrZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaWtlc19oNiA9IGA8aDYgYXJpYS1sYWJlbD0nbGlrZXMnPiR7bGlrZXN9PC9oNj5gO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZG9tLmluc2VydEhUTUxBZnRlckVsZW1lbnQobGlua0VsZW1lbnQsIGA8ZGl2IGNsYXNzPSdkZXRhaWxzJz4ke3RpdGxlX2g2fSR7bGlrZXNfaDZ9PC9kaXY+YCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFJldHVybiBBcnRpY2xlXHJcbiAgICAgICAgICAgIHJldHVybiBhcnRpY2xlO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHsgcGhvdG9ncmFwaGVySWQsIHBpY3R1cmUsIG1vdmllLCBnZXRNZWRpYURPTSB9O1xyXG59XHJcbiIsIlxyXG5pbXBvcnQgeyBidWlsZEVsZW1lbnQsIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50LCBzZXRJbm5lckh0bWwsIHNldEFyaWFsTGFiZWwgfSBmcm9tIFwiLi4vdXRpbHMvZG9tXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcGhvdG9ncmFwaGVyRmFjdG9yeShkYXRhKSB7XHJcbiAgICBjb25zdCB7IG5hbWUsIGlkLCBjaXR5LCBjb3VudHJ5LCB0YWdsaW5lLCBwb3J0cmFpdCwgcHJpY2UgfSA9IGRhdGE7XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICBjb25zdCBwaWN0dXJlID0gYGFzc2V0cy9pbWFnZXMvJHtwb3J0cmFpdH1gO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFVzZXJDYXJkRE9NKCkge1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgRE9NIG9ubHkgaWYgd2UgZ290IGEgcGljdHVyZSBhIGlkIGFuZCBhIG5hbWVcclxuICAgICAgICBpZiAobmFtZSAmJiBpZCAmJiBwb3J0cmFpdCkge1xyXG4gICAgICAgICAgICAvLyBCVUlMRCBBIEFSVElDTEUgXHJcbiAgICAgICAgICAgIGNvbnN0IGFydGljbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKTtcclxuICAgICAgICAgICAgYXJ0aWNsZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBob3RvZ3JhcGhlcl9jYXJkXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIER5bmFtaXF1ZSBMSU5LIHdpdGggUGljdHVyZVxyXG4gICAgICAgICAgICBjb25zdCBsaW5rRWxlbWVudCA9IGFydGljbGUuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICAgICAgICBidWlsZEVsZW1lbnQoXCJhXCIsIGBwaG90b2dyYXBoZXIuaHRtbD9pZD0ke2lkfWAsIFwiaHJlZlwiKSAvLyBCdWlsZCBBSHJlZlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBzZXRBcmlhbExhYmVsKGxpbmtFbGVtZW50LCBgTGluayB0byAke25hbWV9YCk7IC8vIFNldCBBcmllbExhYmVsIHRvIEFIcmVmXHJcbiAgICAgICAgICAgIGluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50KGxpbmtFbGVtZW50LCBwaWN0dXJlLCBuYW1lKTtcclxuICAgICAgICAgICAgLy8gRU5EIENyZWF0ZSBEeW5hbWlxdWUgTElOSyB3aXRoIFBpY3R1cmVcclxuXHJcbiAgICAgICAgICAgIGFydGljbGUuYXBwZW5kQ2hpbGQoYnVpbGRFbGVtZW50KFwiaDJcIiwgbmFtZSkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNpdHkgJiYgY291bnRyeSkge1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoM1wiLCBgJHtjaXR5fSwgJHtjb3VudHJ5fWApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGFnbGluZSkge1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5hcHBlbmRDaGlsZChidWlsZEVsZW1lbnQoXCJoNFwiLCB0YWdsaW5lKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByaWNlKSB7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLmFwcGVuZENoaWxkKGJ1aWxkRWxlbWVudChcImg1XCIsIGAke3ByaWNlfeKCrC9qb3VyYCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBSRVRVUk4gQSBBUlRJQ0xFIFxyXG4gICAgICAgICAgICByZXR1cm4gYXJ0aWNsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0UGhvdG9ncmFwaGVySGVhZGVyKCkge1xyXG4gICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoMVwiLCBuYW1lKTtcclxuICAgICAgICBpZiAoY2l0eSAmJiBjb3VudHJ5KSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5waG90b2dyYXBoX2hlYWRlciBoMlwiLCBgJHtjaXR5fSwgJHtjb3VudHJ5fWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGgyXCIsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRJbm5lckh0bWwoXCIucGhvdG9ncmFwaF9oZWFkZXIgaDNcIiwgdGFnbGluZSk7XHJcblxyXG4gICAgICAgIC8qKiBXRSBVU0UgYSBkaWZmZXJlbnQgbWV0aG9kIHRoYXQgaW5zZXJ0UGljdHVyZUluc2lkZUVsZW1lbnQoKSBzaW5jZSBwaWN0dXJlIGlzIGFscmVhZHkgaW4gdGhlIERPTSAqL1xyXG4gICAgICAgIGNvbnN0IGltZ1Byb2ZpbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBob3RvZ3JhcGhfaGVhZGVyIGltZ1wiKTtcclxuICAgICAgICBpbWdQcm9maWxlLnNldEF0dHJpYnV0ZShcInNyY1wiLCBwaWN0dXJlKTtcclxuICAgICAgICBpbWdQcm9maWxlLnNldEF0dHJpYnV0ZShcImFsdFwiLCBuYW1lKTtcclxuICAgICAgICAvKiogKi9cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRTdGlja3lCYXJQcmljZSgpIHtcclxuICAgICAgICBpZiAocHJpY2UpIHtcclxuICAgICAgICAgICAgc2V0SW5uZXJIdG1sKFwiLnByaWNlX3JhdGVfZGFpbHlcIiwgYCR7cHJpY2V9IOKCrCAvIGpvdXJgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNldElubmVySHRtbChcIi5wcmljZV9yYXRlX2RhaWx5XCIsIFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4geyBuYW1lLCBwaWN0dXJlLCBnZXRVc2VyQ2FyZERPTSwgc2V0UGhvdG9ncmFwaGVySGVhZGVyLCBzZXRTdGlja3lCYXJQcmljZSB9O1xyXG59XHJcbiIsImltcG9ydCBcImNvcmUtanMvc3RhYmxlXCI7XHJcbmltcG9ydCBcInJlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZVwiO1xyXG5cclxuaW1wb3J0ICcuLi8uLi9zY3NzL21haW4uc2Nzcyc7XHJcbmltcG9ydCB7IGdldFBob3RvZ3JhcGhlcnMsIGdldE1lZGlhcyB9IGZyb20gJy4uL3V0aWxzL2ZldGNoJztcclxuaW1wb3J0IHsgZGlzcGxheURhdGEgfSBmcm9tICcuLi9kYXRhL2Rpc3BsYXlEYXRhJztcclxuaW1wb3J0IHsgZGlzcGxheU1lZGlhIH0gZnJvbSAnLi4vZGF0YS9kaXNwbGF5TWVkaWEnO1xyXG5pbXBvcnQgeyBnZXRVcmxQYXJhbWV0ZXIgfSBmcm9tICcuLi91dGlscy9nZXRVcmxQYXJhbWV0ZXInO1xyXG5pbXBvcnQgeyBzb3J0QnlMaWtlcyB9IGZyb20gJy4uL3V0aWxzL3NvcnRCeSc7XHJcbmltcG9ydCB7IHNlbGVjdEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4uL3V0aWxzL3NlbGVjdEZpbHRlcic7XHJcbmltcG9ydCB7IG1vZGFsTWFzdGVyIH0gZnJvbSAnLi4vdXRpbHMvbW9kYWxNYXN0ZXInO1xyXG5cclxuXHJcblxyXG5cclxuYXN5bmMgZnVuY3Rpb24gaW5pdFByb2ZpbGUoaWRVUkwpIHtcclxuICAgIC8vIFRyeSB0byBnZXQgZGF0YSBmcm9tIHBob3RvZ3JhcGhlcnMgaWYgZXJyb3IgdGhlbiByZWRpcmVjdCB0byA0MDQgcGFnZVxyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyBTRVQgUGhvdG9ncmFwaGVyIFByb2ZpbGUgREFUQVxyXG4gICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlcnMgPSBhd2FpdCBnZXRQaG90b2dyYXBoZXJzKCk7XHJcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBwaG90b2dyYXBoZXIgRGlzcGxheVxyXG4gICAgICAgIGNvbnN0IHBob3RvZ3JhcGhlclNlbGVjdGVkID0gYXdhaXQgZGlzcGxheURhdGEocGhvdG9ncmFwaGVycywgaWRVUkwpO1xyXG4gICAgICAgIC8vIEVORCBTRVQgUGhvdG9ncmFwaGVyIFByb2ZpbGUgRGF0YVxyXG5cclxuICAgICAgICBpZiAocGhvdG9ncmFwaGVyU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTZWN0aW9uIHByb2ZpbGUgaW5pdGnDqSBhdmVjIHN1Y2PDqHMgZGVwdWlzIGluaXRQcm9maWxlKClcIik7XHJcbiAgICAgICAgICAgIGluaXRDb250YWN0Rm9ybShwaG90b2dyYXBoZXJTZWxlY3RlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3Igbm8gc2VsZWN0ZWQgcGhvdG9ncmFwaGVyXCIpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJzQwNC5odG1sJztcclxuICAgICAgICB9XHJcblxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgLy8gSWYgaXQncyBhIGZhaWwgdGhlbiB3ZSByZWRpcmVjdCB0byA0MDQgRXJyb3IgUGFnZSBzaW5jZSAgaXQncyB0aGUgbWluaW1hbCBmdW5jdGlvbmFsaXR5XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcImluaXRQcm9maWxlKCkgZmFpbGVkIHJlZGlyZWN0IHRvIDQwNCBwYWdlXCIpO1xyXG4gICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnNDA0Lmh0bWwnO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gaW5pdENvbnRhY3RGb3JtKHBob3RvZ3JhcGhlclNlbGVjdGVkKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhY3RGb3JtTW9kYWwgPSBtb2RhbE1hc3RlcihcImJvZHlcIiwgXCJoZWFkZXJcIiwgXCJtYWluXCIsIFwiY29udGFjdF9tb2RhbFwiKTsgLy8gQ3JlYXRlIGEgTW9kZWwgTWFzdGVyXHJcbiAgICAgICAgY29uc3QgbW9kYWxQYWdlID0gY29udGFjdEZvcm1Nb2RhbC5tb2RhbFBhZ2U7IC8vIEdldCBtb2RlbFBhZ2UgT2JqZWN0XHJcblxyXG4gICAgICAgIGNvbnRhY3RGb3JtTW9kYWwuYWRkQ29udGFjdEZvcm1MaXN0ZW5lcihtb2RhbFBhZ2UpOyAvLyBBZGQgc3BlY2lmaWMgbGlzdGVuZXIgdG8gQ29udGFjdCBGb3JtIE1vZGFsXHJcblxyXG4gICAgICAgIGNvbnN0IHRpdGxlTW9kYWwgPSBwaG90b2dyYXBoZXJTZWxlY3RlZC5uYW1lOyAvLyBCdWlsZCB0aGUgdGl0bGUgTW9kYWxcclxuICAgICAgICBjb250YWN0Rm9ybU1vZGFsLnNldFRpdGxlTW9kYWwobW9kYWxQYWdlLCBcIiNkaWFsb2dUaXRsZVwiLCB0aXRsZU1vZGFsKTsgIC8vIFNldCB0aGUgdGl0bGUgTW9kYWxcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJGb3JtdWxhaXJlIGNvbnRhY3QgaW5pdGnDqSBhdmVjIHN1Y2PDqHMgZGVwdWlzIGluaXRDb250YWN0Rm9ybSgpXCIpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgIC8vIElmIGl0J3MgYSBmYWlsIHRoZW4gd2UgcmVkaXJlY3QgdG8gNDA0IEVycm9yIFBhZ2Ugc2luY2UgIGl0J3MgdGhlIG1pbmltYWwgZnVuY3Rpb25hbGl0eVxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJpbml0Q29udGFjdEZvcm0oKSBmYWlsZWQgcmVkaXJlY3QgdG8gNDA0IHBhZ2VcIik7XHJcbiAgICAgICAgbG9jYXRpb24uaHJlZiA9ICc0MDQuaHRtbCc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGluaXRMaWdodGJveChzZWxlY3RlZE1lZGlhcykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBsaWdodEJveCA9IG1vZGFsTWFzdGVyKFwiYm9keVwiLCBcImhlYWRlclwiLCBcIm1haW5cIiwgXCJsaWdodGJveF9tb2RhbFwiKTsgLy8gQ3JlYXRlIGEgTW9kZWwgTWFzdGVyXHJcbiAgICAgICAgY29uc3QgbW9kYWxQYWdlID0gbGlnaHRCb3gubW9kYWxQYWdlOyAvLyBHZXQgbW9kZWxQYWdlIE9iamVjdFxyXG5cclxuICAgICAgICAvLyBUaGlzIGFkZCBsaXN0ZW5lciBhYm91dCBsaWdodGJveCBtb2RhbCBvbiBhbGwgbGluayB3aXRoIE1lZGlhIERpc3BsYXllZCBhdCBwaG90b2dyYXBoZXIgcGFnZVxyXG4gICAgICAgIGxpZ2h0Qm94LmFkZExpZ2h0Ym94TGlzdGVuZXIobW9kYWxQYWdlLCBcIi5tZWRpYV9zZWN0aW9uIGFcIiwgc2VsZWN0ZWRNZWRpYXMpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIlBvcHVwIExpZ2h0Qm94IGluaXRpw6kgYXZlYyBzdWNjw6hzIGRlcHVpcyBpbml0TGlnaHRCb3goKVwiKVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG5cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0TWVkaWEoaWRVUkwsIHNvcnRCeSkge1xyXG4gICAgLy8gVHJ5IHRvIGdldCBkYXRhICYgYnVpbGQgc2VjdGlvbiBtZWRpYSBpZiBlcnJvciB0aGVuIHJlZGlyZWN0IHRvIDQwNCBwYWdlXHJcbiAgICB0cnkge1xyXG5cclxuICAgICAgICAvLyBCdWlsZCBNZWRpYXMgXHJcbiAgICAgICAgY29uc3QgbWVkaWFzID0gYXdhaXQgZ2V0TWVkaWFzKCk7XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRNZWRpYXMgPSBhd2FpdCBkaXNwbGF5TWVkaWEobWVkaWFzLnNvcnQoc29ydEJ5KSwgXCIubWVkaWFfc2VjdGlvblwiLCBpZFVSTCk7IC8vIFNvcnRCeSBtdXN0IGJlIGEgZnVuY3Rpb24gb2Ygc29ydFxyXG4gICAgICAgIC8vIEVuZCBidWlsZCBNZWRpYXMgXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJTZWN0aW9uIG3DqWRpYSBpbml0acOpIGF2ZWMgc3VjY8OocyBkZXB1aXMgaW5pdE1lZGlhKClcIik7XHJcblxyXG4gICAgICAgIGluaXRMaWdodGJveChzZWxlY3RlZE1lZGlhcyk7ICAvLyBJbml0aWFsaXplIExpZ2h0Qm94IE1vZGFsIHdpdGggc2VsZWN0ZWQgbWVkaWFzXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG5hc3luYyBmdW5jdGlvbiBpbml0TWFpbigpIHtcclxuICAgIC8vIFdlIFdhaXQgZm9yIGdldFVybFBhcmFtZXRlcigpIHRvIGJlIGNvbXBsZXRlIHRoZW4gd2UgcnVuIHRhc2tzIGZvciBnZW5lcmF0ZSBwYWdlXHJcbiAgICBjb25zdCBpZFVSTCA9IGF3YWl0IGdldFVybFBhcmFtZXRlcihcImlkXCIpO1xyXG4gICAgaW5pdFByb2ZpbGUoaWRVUkwpOyAvLyBJbml0IFByb2ZpbGUgc2VjdGlvbiBcclxuICAgIGF3YWl0IGluaXRNZWRpYShpZFVSTCwgc29ydEJ5TGlrZXMpOyAvLyBHZXQgTWVkaWFzICYgSW5pdCBNZWRpYSBTZWN0aW9uIGJ5IExpa2VzIFwiaW1wb3J0IHsgc29ydEJ5TGlrZXMgfSBmcm9tICcuLi91dGlscy9zb3J0QnknO1xyXG4gICAgc2VsZWN0RmlsdGVyQ29tcG9uZW50KGlkVVJMKTsgLy8gSW5pdGlhbGl6ZSBTZWxlY3QgZmlsdGVyIGNvbXBvbmVudCBcclxufVxyXG5cclxuXHJcbmluaXRNYWluKCk7IFxyXG4iLCIvLyBGdW5jdGlvbiBmb3IgYnVpbGQgRE9NXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRQaWN0dXJlSW5zaWRlRWxlbWVudChlbGVtZW50LCBwaWN0dXJlLCBhbHQpIHtcclxuICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGA8aW1nIHNyYz1cIiR7cGljdHVyZX1cIiBhbHQ9XCIke2FsdH1cIj5gKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydFZpZGVvSW5zaWRlRWxlbWVudChlbGVtZW50LCB2aWRlbywgYXJpYUxhYmVsKSB7XHJcblxyXG4gICAgaWYgKGFyaWFMYWJlbCkge1xyXG4gICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsXHJcbiAgICAgICAgICAgIGA8dmlkZW8gc3JjPVwiJHt2aWRlb31cIiBhcmlhLWxhYmVsPVwiJHthcmlhTGFiZWx9XCI+YCk7XHJcblxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgJzx2aWRlbyBzcmM9XCInICsgdmlkZW8gKyAnXCI+Jyk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0SFRNTEFmdGVyRWxlbWVudChlbGVtZW50LCBodG1sKSB7XHJcbiAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTChcImFmdGVyZW5kXCIsIGh0bWwpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRFbGVtZW50KGJhbGlzZSwgdmFsdWUsIGF0dHJpYnV0ZSkge1xyXG4gICAgLy8gQ3JlYXRlIGJhbGlzZVxyXG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYmFsaXNlKTtcclxuXHJcbiAgICAvLyBTZXQgQXR0cmlidXRlIG9yIFRleHRDb250ZW5lZCBkZXBlbmQgb2YgYmFsaXNlXHJcbiAgICBzd2l0Y2ggKGJhbGlzZSkge1xyXG4gICAgICAgIGNhc2UgXCJhXCI6XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFwiaW1nXCI6XHJcbiAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRBcmlhbExhYmVsKGVsZW1lbnQsIGFyaWFsYWJlbCkge1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIGFyaWFsYWJlbCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRJbm5lckh0bWwocXVlcnlTZWxlY3RvciwgdGV4dGUpIHtcclxuICAgIGNvbnN0IHRleHRlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnlTZWxlY3Rvcik7XHJcbiAgICB0ZXh0ZUVsZW1lbnQuaW5uZXJIVE1MID0gdGV4dGU7XHJcbn1cclxuLy8gRW5kIEZ1bmN0aW9uIGZvciBidWlsZCBET00iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hKU09OKHVybCwgdHlwZSkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpOyAvLyBXYWl0IGZvciB0aGUgQXN5bmMgRmVjdGggRnVuY3Rpb25cclxuXHJcbiAgICAvLyBmZXRjaCByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGEgcmVzcG9uc2UgcHJvcGVydHkgd2hpY2ggaWYgc2V0IHRvIGZhbHNlIG1lYW5zIHRoYXQgdGhlIGNvbm5lY3Rpb24gaXMgbm90IGdvb2QgYW5kIHNvIHdlIHN0b3AgdGhlIGZ1bmN0aW9uIFxyXG4gICAgaWYgKCFyZXNwb25zZS5vaykgeyB0aHJvdyBuZXcgRXJyb3IoXCJUaHJvd24gZnJvbSBmZXRjaEpTT04oKVwiKTsgfVxyXG5cclxuICAgIGxldCBqc29uUmVzcG9uc2UgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7IC8vIHBhcnNpbmcgSlNPTlxyXG4gICAgcmV0dXJuIGpzb25SZXNwb25zZVt0eXBlXTsgLy8gR2V0IGRhdGEgZnJvbSB0aGUgQXJyYXkgdGhhdCB3ZSB3YW50XHJcblxyXG59XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFBob3RvZ3JhcGhlcnMoKSB7XHJcbiAgICBjb25zdCB1cmwgPSBcIi4uL2RhdGEvcGhvdG9ncmFwaGVycy5qc29uXCI7IC8vIERhdGEgc291cmNlIC5KU09OXHJcbiAgICBjb25zdCBwaG90b2dyYXBoZXJzID0gYXdhaXQgZmV0Y2hKU09OKHVybCwgXCJwaG90b2dyYXBoZXJzXCIpOyAvLyB1c2UgZmV0Y2hKU09OIGZ1bmN0aW9uIGZyb20gdXRpbHMvZmV0Y2guanNcclxuICAgIHJldHVybiBwaG90b2dyYXBoZXJzOyAvLyBSZXR1cm4gZGF0YSBvZiBQaG90b0dyYXBoZXJzXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRNZWRpYXMoKSB7XHJcbiAgICBjb25zdCB1cmwgPSBcIi4uL2RhdGEvcGhvdG9ncmFwaGVycy5qc29uXCI7IC8vIERhdGEgc291cmNlIC5KU09OXHJcbiAgICBjb25zdCBtZWRpYXMgPSBhd2FpdCBmZXRjaEpTT04odXJsLCBcIm1lZGlhXCIpOyAvLyB1c2UgZmV0Y2hKU09OIGZ1bmN0aW9uIGZyb20gdXRpbHMvZmV0Y2guanNcclxuICAgIHJldHVybiBtZWRpYXM7IC8vIFJldHVybiBkYXRhIG9mIE1lZGlhXHJcbn1cclxuIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVybFBhcmFtZXRlcihwYXJhbWV0ZXIpIHtcclxuICAgIGNvbnN0IGZ1bGxVcmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjsgLy8gR2V0IGZ1bGwgdXJsXHJcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGZ1bGxVcmwpOyAvLyBDcmVhdGUgVVJMIE9iamVjdFxyXG4gICAgY29uc3QgcGFyYW1ldGVyVmFsdWUgPSB1cmwuc2VhcmNoUGFyYW1zLmdldChwYXJhbWV0ZXIpOyAvLyBnZXQgcGFyYW1ldGVyIHZhbHVlXHJcbiAgICByZXR1cm4gcGFyYW1ldGVyVmFsdWU7XHJcbn0iLCJpbXBvcnQgeyBzZXRJbm5lckh0bWwgfSBmcm9tIFwiLi9kb21cIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtb2RhbE1hc3Rlcihib2R5VGFnLCBoZWFkZXJUYWcsIG1haW5UYWcsIG1vZGFsSUQpIHtcclxuXHJcblxyXG4gICAgLyoqIENSRUFURSBUV08gT0JKRUNUIFdJVEggQUxMIFBST1BSSUVUWSBGT1IgTU9ERUxNQVNURVIgTkVFRCAqL1xyXG4gICAgbGV0IGJhY2tncm91bmRQYWdlID0ge1xyXG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIGJhY2tncm91bmQgb2JqZWN0IChiZWhpbmQgbW9kYWwpXHJcbiAgICAgICAgYm9keUhUTUw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYm9keVRhZyksIC8vIFdlIHdhbnQgdGhlIDxib2R5PiBzZWxlY3RlZFxyXG4gICAgICAgIGhlYWRlckhUTUw6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaGVhZGVyVGFnKSwgLy8gV2Ugd2FudCB0aGUgPGhlYWRlcj4gc2VsZWN0ZWRcclxuICAgICAgICBtYWluSFRNTDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihtYWluVGFnKSwgLy8gV2Ugd2FudCB0aGUgPG1haW4+IHNlbGVjdGVkXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1vZGFsUGFnZSA9IHtcclxuICAgICAgICAvLyBUaGlzIGlzIHRoZSBtb2RhbCBPYmplY3QgKGNhbGwgTW9kYWxQYWdlKVxyXG4gICAgICAgIG1vZGFsSFRNTDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobW9kYWxJRCksXHJcbiAgICAgICAgbW9kYWxJRDogbW9kYWxJRCxcclxuICAgICAgICB2aXNpYmxlOiAwLFxyXG4gICAgfVxyXG4gICAgLyoqIEVORCAgKi9cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ29udGFjdEZvcm1MaXN0ZW5lcihtb2RhbFBhZ2UpIHtcclxuICAgICAgICAvLyBUaGlzIGFkZCBsaXN0ZW5lciBhYm91dCBvbmx5IGNvbnRhY3QgZm9ybSBtb2RhbFxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3Blbk1vZGFsXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG9wZW5Nb2RhbChtb2RhbFBhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke21vZGFsUGFnZS5tb2RhbElEfSAjY2xvc2VNb2RhbGApLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTW9kYWwobW9kYWxQYWdlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhY3RfYnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHNlbmRNZXNzYWdlKG1vZGFsUGFnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkTGlnaHRib3hMaXN0ZW5lcihtb2RhbFBhZ2UsIHF1ZXJ5U2VsZWN0b3JSZXF1ZXN0LCBtZWRpYXMpIHtcclxuICAgICAgICAvLyBUaGlzIGFkZCBsaXN0ZW5lciBhYm91dCBsaWdodGJveCBtb2RhbFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnlTZWxlY3RvclJlcXVlc3QpLmZvckVhY2gobGluayA9PlxyXG4gICAgICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkTGlnaHRib3hDb250ZW50KG1vZGFsUGFnZSwgbGluaywgbWVkaWFzKTtcclxuICAgICAgICAgICAgICAgIG9wZW5Nb2RhbChtb2RhbFBhZ2UpO1xyXG4gICAgICAgICAgICB9KSk7XHJcblxyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHttb2RhbFBhZ2UubW9kYWxJRH0gI2Nsb3NlTW9kYWxgKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjbG9zZU1vZGFsKG1vZGFsUGFnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIGxvYWRMaWdodGJveENvbnRlbnQobW9kYWxQYWdlLCBsaW5rLCBtZWRpYXMpIHtcclxuXHJcbiAgICAgICAgY29uc3QgcHJldmlvdXNfYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcmV2aW91c19saW5rXCIpO1xyXG4gICAgICAgIGNvbnN0IG5leHRfYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXh0X2xpbmtcIik7XHJcbiAgICAgICAgY29uc3QgcGljdHVyZV9zZWxlY3RlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGljdHVyZV9zZWxlY3RlZFwiKTtcclxuICAgICAgICBjb25zdCB2aWRlb19zZWxlY3RlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlkZW9fc2VsZWN0ZWRcIik7XHJcblxyXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIl9fX0xJR0hUQk9YX19fXCIpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtb2RhbFBhZ2UpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhsaW5rLmlkKTsgLy8gRXZlbnQgaGFzIGJlIGZpcmVkIGJ5IHRoaXMgTElOSyAod2hlcmUgTGluayBJRCA9IE1lZGlhIElEKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZWRpYXMpOyAvLyBNZWRpYXMgdGhhdCBhcmUgZGlzcGxheWVkIGluIG9yZGVyIHRvIHRoZSBtYWluIHBhZ2VcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAvKiogR0VUIFRIRSBQUkVWSU9VUyBBTkQgQUZURVIgTUVESUEgVEhPVUdIIFRIRSBBUlJBWSAqL1xyXG4gICAgICAgIGxldCBwcmV2aW91c0lEID0gMDtcclxuICAgICAgICBsZXQgbmV4dElEID0gMDtcclxuICAgICAgICBsZXQgYWN0dWFsSUQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVkaWFzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChtZWRpYXNbaV0uaWQgPT0gbGluay5pZCkge1xyXG4gICAgICAgICAgICAgICAgcHJldmlvdXNJRCA9IG1lZGlhc1tpIC0gMV07XHJcbiAgICAgICAgICAgICAgICBuZXh0SUQgPSBtZWRpYXNbaSArIDFdO1xyXG4gICAgICAgICAgICAgICAgYWN0dWFsSUQgPSBtZWRpYXNbaV07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiX19fXyBBQ1RVQUwgSURfX19fX19fXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhY3R1YWxJRCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiX19fXyBQUkVWSU9VUyBJRF9fX19fX19cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByZXZpb3VzSUQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIl9fX19fX18gTkVYVCBJRCBfX19fX19fXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhuZXh0SUQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiogRU5EICovXHJcblxyXG5cclxuICAgICAgICAvKiogU0VUIFRJVExFIEZPUk0gKi9cclxuICAgICAgICBzZXRUaXRsZU1vZGFsKG1vZGFsUGFnZSwgXCJoMlwiLCBhY3R1YWxJRC50aXRsZSk7XHJcbiAgICAgICAgLyoqIEVORCAqL1xyXG5cclxuICAgICAgICAvKiBSRU1PVkUgTUVESUEgKi9cclxuICAgICAgICBpZiAocGljdHVyZV9zZWxlY3RlZCkge1xyXG4gICAgICAgICAgICBwaWN0dXJlX3NlbGVjdGVkLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmlkZW9fc2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgdmlkZW9fc2VsZWN0ZWQucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8qKiBFTkQgKi9cclxuXHJcbiAgICAgICAgLyoqIEFERCBNRURJQSAqL1xyXG4gICAgICAgIGlmIChhY3R1YWxJRC52aWRlbykge1xyXG4gICAgICAgICAgICBjb25zdCB2aWRlbyA9IGA8dmlkZW9cclxuICAgICAgICAgICAgICAgIGlkPVwidmlkZW9fc2VsZWN0ZWRcIlxyXG4gICAgICAgICAgICAgICAgYXV0b3BsYXlcclxuICAgICAgICAgICAgICAgIGxvb3BcclxuICAgICAgICAgICAgICAgIG11dGVkXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxzb3VyY2Ugc3JjPVwiLi4vLi4vLi4vYXNzZXRzL3ZpZGVvLyR7YWN0dWFsSUQudmlkZW99XCIgdHlwZT1cInZpZGVvL21wNFwiPlxyXG4gICAgICAgICAgICA8L3ZpZGVvPmA7XHJcbiAgICAgICAgICAgIHByZXZpb3VzX2J1dHRvbi5pbnNlcnRBZGphY2VudEhUTUwoXCJhZnRlcmVuZFwiLCB2aWRlbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhY3R1YWxJRC5pbWFnZSkge1xyXG4gICAgICAgICAgICBjb25zdCBwaWN0dXJlID0gYC4uLy4uLy4uL2Fzc2V0cy9pbWFnZXMvJHthY3R1YWxJRC5pbWFnZX1gO1xyXG4gICAgICAgICAgICBwcmV2aW91c19idXR0b24uaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJlbmRcIiwgYDxpbWcgaWQ9XCJwaWN0dXJlX3NlbGVjdGVkXCIgc3JjPVwiJHtwaWN0dXJlfVwiIGFsdD1cIkxpbGFjIGJyZWFzdGVkIHJvbGxlclwiPmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvKiogRU5EICovXHJcblxyXG5cclxuICAgICAgICAvKiogU0VUIEFSUk9XIFBSRVZJT1VTICovXHJcblxyXG4gICAgICAgIC8qKiBFTkQgKi9cclxuXHJcblxyXG5cclxuICAgICAgICAvKiogU0VUIEFSUk9XIE5FWFQgICovXHJcblxyXG4gICAgICAgIC8qKiBFTkQgKi9cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRLZXlib2FyZExpc3RlbmVyKG1vZGFsUGFnZSkge1xyXG4gICAgICAgIGlmIChtb2RhbFBhZ2UudmlzaWJsZSA9PT0gMSkgeyAvLyBJZiBtb2RhbFBhZ2UgaXMgdmlzaWJsZSBhdCB0aGUgc2NyZWVuXHJcblxyXG4gICAgICAgICAgICAvLyBUaGlzIGFkZCBsaXN0ZW5lciBmb3IgS2V5Ym9hcmQgYW5kIGNoZWNrIGlmIGEga2V5IGlzIHByZXNzZWRcclxuICAgICAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwobW9kYWxQYWdlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRUaXRsZU1vZGFsKG1vZGFsUGFnZSwgdGFyZ2V0U2VsZWN0b3IsIHRpdGxlTW9kYWwpIHtcclxuICAgICAgICByZXR1cm4gc2V0SW5uZXJIdG1sKGAjJHttb2RhbFBhZ2UubW9kYWxJRH0gJHt0YXJnZXRTZWxlY3Rvcn1gLCB0aXRsZU1vZGFsKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gZWZmZWN0QW5pbWF0aW9uKGhpZGVjbGFzcywgc2hvd2NsYXNzLCBtb2RhbFBhZ2UpIHtcclxuICAgICAgICBpZiAobW9kYWxQYWdlLnZpc2libGUgPT09IDApIHtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFBhZ2UubWFpbkhUTUwuY2xhc3NMaXN0LnJlbW92ZShzaG93Y2xhc3MpO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUGFnZS5oZWFkZXJIVE1MLmNsYXNzTGlzdC5yZW1vdmUoc2hvd2NsYXNzKTtcclxuICAgICAgICAgICAgbW9kYWxQYWdlLm1vZGFsSFRNTC5jbGFzc0xpc3QucmVtb3ZlKGhpZGVjbGFzcyk7XHJcblxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUGFnZS5tYWluSFRNTC5jbGFzc0xpc3QuYWRkKGhpZGVjbGFzcyk7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRQYWdlLmhlYWRlckhUTUwuY2xhc3NMaXN0LmFkZChoaWRlY2xhc3MpO1xyXG4gICAgICAgICAgICBtb2RhbFBhZ2UubW9kYWxIVE1MLmNsYXNzTGlzdC5hZGQoc2hvd2NsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS52aXNpYmxlID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgbW9kYWxQYWdlLm1vZGFsSFRNTC5jbGFzc0xpc3QucmVtb3ZlKHNob3djbGFzcyk7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRQYWdlLm1haW5IVE1MLmNsYXNzTGlzdC5yZW1vdmUoaGlkZWNsYXNzKTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFBhZ2UuaGVhZGVySFRNTC5jbGFzc0xpc3QucmVtb3ZlKGhpZGVjbGFzcyk7XHJcblxyXG4gICAgICAgICAgICBtb2RhbFBhZ2UubW9kYWxIVE1MLmNsYXNzTGlzdC5hZGQoaGlkZWNsYXNzKTtcclxuICAgICAgICAgICAgYmFja2dyb3VuZFBhZ2UubWFpbkhUTUwuY2xhc3NMaXN0LmFkZChzaG93Y2xhc3MpO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUGFnZS5oZWFkZXJIVE1MLmNsYXNzTGlzdC5hZGQoc2hvd2NsYXNzKTtcclxuXHJcbiAgICAgICAgICAgIG1vZGFsUGFnZS52aXNpYmxlID0gMFxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1vZGFsUGFnZTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Nb2RhbChtb2RhbFBhZ2UpIHtcclxuICAgICAgICBlZmZlY3RBbmltYXRpb24oXCJoaWRlX2NvbnRlbnRcIiwgXCJzaG93X2NvbnRlbnRcIiwgbW9kYWxQYWdlKTsgLy8gRWZmZWN0IE1vZGFsIENTU1xyXG4gICAgICAgIG1vZGFsUGFnZS5tb2RhbEhUTUwuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjsgLy8gRGlzcGxheSB0aGUgTW9kYWwgYXQgdGhlIHNjcmVlblxyXG4gICAgICAgIGFkZEtleWJvYXJkTGlzdGVuZXIobW9kYWxQYWdlKTsgLy8gQWRkIEtleWJvYXJkIEV2ZW50c1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke21vZGFsUGFnZS5tb2RhbElEfSAjY2xvc2VNb2RhbGApLmZvY3VzKCk7IC8vIEZvY3VzIHRoZSBDbG9zZSBNb2RhbCBcclxuXHJcbiAgICAgICAgLy8gRGlzYWJsZSBjbGljayBvciBmb2N1cyB3aXRoIGluZXJ0IHRvIHRoZSBCYWNrZ3JvdW5kUGFnZSBcclxuICAgICAgICBiYWNrZ3JvdW5kUGFnZS5oZWFkZXJIVE1MLnNldEF0dHJpYnV0ZShcImluZXJ0XCIsIFwiXCIpO1xyXG4gICAgICAgIGJhY2tncm91bmRQYWdlLm1haW5IVE1MLnNldEF0dHJpYnV0ZShcImluZXJ0XCIsIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwobW9kYWxQYWdlKSB7XHJcbiAgICAgICAgZWZmZWN0QW5pbWF0aW9uKFwiaGlkZV9jb250ZW50XCIsIFwic2hvd19jb250ZW50XCIsIG1vZGFsUGFnZSk7IC8vIEVmZmVjdCBNb2RhbCBDU1NcclxuICAgICAgICBtb2RhbFBhZ2UubW9kYWxIVE1MLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjsgLy8gSGlkZSBhdCB0aGUgc2NyZWVuIG1vZGFsXHJcblxyXG4gICAgICAgIC8vIEFsbG93IGNsaWNrIG9yIGZvY3VzIHdpdGggaW5lcnQgdG8gdGhlIEJhY2tncm91bmRQYWdlIFxyXG4gICAgICAgIGJhY2tncm91bmRQYWdlLm1haW5IVE1MLnJlbW92ZUF0dHJpYnV0ZShcImluZXJ0XCIpO1xyXG4gICAgICAgIGJhY2tncm91bmRQYWdlLmhlYWRlckhUTUwucmVtb3ZlQXR0cmlidXRlKFwiaW5lcnRcIik7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kTWVzc2FnZShtb2RhbFBhZ2UpIHtcclxuICAgICAgICBjb25zdCBhbGxJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAjJHttb2RhbFBhZ2UubW9kYWxJRH0gaW5wdXRgKTtcclxuICAgICAgICBjb25zdCBhbGxUZXh0QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYCMke21vZGFsUGFnZS5tb2RhbElEfSB0ZXh0YXJlYWApO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcIl9fX19TZW5kIE1lc3NhZ2VfX19fX1wiKTtcclxuXHJcbiAgICAgICAgbGV0IGZ1bGxtZXNzYWdlID0gXCJcIjtcclxuXHJcbiAgICAgICAgYWxsSW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xyXG4gICAgICAgICAgICBmdWxsbWVzc2FnZSArPSAnXFxuJyArIGlucHV0LmlkICsgXCI6IFwiICsgaW5wdXQudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGFsbFRleHRBcmVhLmZvckVhY2godGV4dGFyZWEgPT4ge1xyXG4gICAgICAgICAgICBmdWxsbWVzc2FnZSArPSAnXFxuJyArIHRleHRhcmVhLmlkICsgXCI6IFwiICsgdGV4dGFyZWEudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChmdWxsbWVzc2FnZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmdWxsbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGFsZXJ0KGBNZXNzYWdlIEVudm95ZXIgISAke2Z1bGxtZXNzYWdlfWApO1xyXG4gICAgICAgICAgICBjbG9zZU1vZGFsKG1vZGFsUGFnZSk7IC8vIENsb3NlIG1vZGFsIGFmdGVyIG1lc3NhZ2Ugc2VuZFxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlNvbWV0aGluZyB3cm9uZyBtZXNzYWdlIG5vIHNlbmQgYmVjYXVzZSBmdWxsbWVzc2FnZSBpcyBlbXB0eSBvciBkb24ndCBleGlzdHMgZnJvbSBzZW5kTWVzc2FnZSgpXCIpO1xyXG4gICAgICAgICAgICBhbGVydChcIkVycmV1ciBtZXNzYWdlIG5vbiBlbnZveWVyIDooXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBiYWNrZ3JvdW5kUGFnZSwgbW9kYWxQYWdlLFxyXG4gICAgICAgIGFkZENvbnRhY3RGb3JtTGlzdGVuZXIsIGFkZExpZ2h0Ym94TGlzdGVuZXIsIGFkZEtleWJvYXJkTGlzdGVuZXIsXHJcbiAgICAgICAgb3Blbk1vZGFsLCBjbG9zZU1vZGFsLFxyXG4gICAgICAgIHNldFRpdGxlTW9kYWwsXHJcbiAgICAgICAgc2VuZE1lc3NhZ2VcclxuICAgIH1cclxufSIsImltcG9ydCB7IHNvcnRCeUxpa2VzLCBzb3J0QnlEYXRlLCBzb3J0QnlUaXRsZSB9IGZyb20gJy4uL3V0aWxzL3NvcnRCeSc7XHJcbmltcG9ydCAqIGFzIHBob3RvZ3JhcGhlciBmcm9tICcuLi9wYWdlcy9waG90b2dyYXBoZXInO1xyXG5cclxuLyoqIEdFTkVSQVRFIEVWRU5UIEZPUiBTRUxFQ1QgRklMVEVSIENPTVBPTkVOVFMgQU5EIEJFSEFWSU9SICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZWxlY3RGaWx0ZXJDb21wb25lbnQoaWRVUkwpIHtcclxuXHJcbiAgICBjb25zdCBzZWxlY3RGaWx0ZXJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdF9maWx0ZXIgLnNlbGVjdF9idXR0b25cIik7IC8vIEJ1dHRvbiBTZWxlY3RcclxuICAgIGNvbnN0IHNlbGVjdEZpbHRlclNlbGVjdDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbGVjdDFcIik7IC8vIEZpcnN0IFNlbGVjdCAoYnkgZGVmYXVsdCBEYXRlKVxyXG4gICAgY29uc3Qgc2VsZWN0RmlsdGVyU2VsZWN0MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VsZWN0MlwiKTsgLy8gMm5kIFNlbGVjdCAoYnkgZGVmYXVsdCBUaXRyZSlcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlRmlsdGVyQWN0aW9uKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSXRlbSA9IGV2ZW50LnRhcmdldC5pbm5lckhUTUw7IC8vIEdldCBpbm5lckhUTUwgb2Ygc2VsZWN0ZWQgaXRlbVxyXG5cclxuXHJcbiAgICAgICAgc3dpdGNoIChzZWxlY3RlZEl0ZW0pIHtcclxuICAgICAgICAgICAgY2FzZSAnRGF0ZSc6XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJCdXR0b24uaW5uZXJIVE1MID0gXCJEYXRlXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJTZWxlY3QxLmlubmVySFRNTCA9IFwiUG9wdWxhcml0w6lcIjtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlclNlbGVjdDIuaW5uZXJIVE1MID0gXCJUaXRyZVwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZWRpYV9zZWN0aW9uJykuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIC8vIEJ1aWxkIE1lZGlhcyBEYXRhXHJcbiAgICAgICAgICAgICAgICBwaG90b2dyYXBoZXIuaW5pdE1lZGlhKGlkVVJMLCBzb3J0QnlEYXRlKTtcclxuICAgICAgICAgICAgICAgIC8vIEVuZCBidWlsZCBNZWRpYXMgRGF0YVxyXG5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdUaXRyZSc6XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJCdXR0b24uaW5uZXJIVE1MID0gXCJUaXRyZVwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyU2VsZWN0MS5pbm5lckhUTUwgPSBcIkRhdGVcIjtcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlclNlbGVjdDIuaW5uZXJIVE1MID0gXCJQb3B1bGFyaXTDqVwiO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVkaWFfc2VjdGlvbicpLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAvLyBCdWlsZCBNZWRpYXMgRGF0YVxyXG4gICAgICAgICAgICAgICAgcGhvdG9ncmFwaGVyLmluaXRNZWRpYShpZFVSTCwgc29ydEJ5VGl0bGUpO1xyXG4gICAgICAgICAgICAgICAgLy8gRW5kIGJ1aWxkIE1lZGlhcyBEYXRhXHJcblxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1BvcHVsYXJpdMOpJzpcclxuICAgICAgICAgICAgICAgIHNlbGVjdEZpbHRlckJ1dHRvbi5pbm5lckhUTUwgPSBcIlBvcHVsYXJpdMOpXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RGaWx0ZXJTZWxlY3QxLmlubmVySFRNTCA9IFwiRGF0ZVwiO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0RmlsdGVyU2VsZWN0Mi5pbm5lckhUTUwgPSBcIlRpdHJlXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lZGlhX3NlY3Rpb24nKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgLy8gQnVpbGQgTWVkaWFzIERhdGFcclxuICAgICAgICAgICAgICAgIHBob3RvZ3JhcGhlci5pbml0TWVkaWEoaWRVUkwsIHNvcnRCeUxpa2VzKTtcclxuICAgICAgICAgICAgICAgIC8vIEVuZCBidWlsZCBNZWRpYXMgRGF0YVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwic2VsZWN0ZWRJdGVtIG5vdCBmb3VuZCBlcnJvciBhYm91dCBoYW5kbGVGaWx0ZXJBY3Rpb24oKVwiKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBzZWxlY3RGaWx0ZXJTZWxlY3QxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVGaWx0ZXJBY3Rpb24pXHJcbiAgICBzZWxlY3RGaWx0ZXJTZWxlY3QyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVGaWx0ZXJBY3Rpb24pXHJcbn1cclxuLyoqIEVORCBHRU5FUkFURSBFVkVOVCBGT1IgU0VMRUNUIEZJTFRFUiBDT01QT05FVE5TIEFORCBCRUhBVklPUiAqL1xyXG4iLCIvKiogRnVuY3Rpb24gdG8gc29ydCBieSBMaWtlcyxEYXRlcyBvciBUaXRsZSAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc29ydEJ5TGlrZXMoYSwgYikge1xyXG4gICAgaWYgKGEubGlrZXMgPiBiLmxpa2VzKSB7XHJcbiAgICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICBpZiAoYS5saWtlcyA8IGIubGlrZXMpIHtcclxuICAgICAgICByZXR1cm4gMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlEYXRlKGEsIGIpIHtcclxuICAgIGlmIChhLmRhdGUgPiBiLmRhdGUpIHtcclxuICAgICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIGlmIChhLmRhdGUgPCBiLmRhdGUpIHtcclxuICAgICAgICByZXR1cm4gMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIDA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzb3J0QnlUaXRsZShhLCBiKSB7XHJcbiAgICBpZiAoYS50aXRsZSA8IGIudGl0bGUpIHtcclxuICAgICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIGlmIChhLnRpdGxlID4gYi50aXRsZSkge1xyXG4gICAgICAgIHJldHVybiAxXHJcbiAgICB9XHJcbiAgICByZXR1cm4gMDtcclxufVxyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBjaGFyc2V0IFxcXCJVVEYtOFxcXCI7XFxuLyoqIFVzZWQgdG8gbG9hZCBhbGwgdmFyaWFibGVzIGZvciB0aGlzIHByb2plY3QgYWJvdXQgU0NTUyAqKi8gLyoqIEZPTlQgKiovXFxuLyoqIEVORCBGT05UICoqL1xcbi8qKiBDT0xPUiBWQVJJQUJMRVMgKiovXFxuLyoqIEVORCBDT0xPUiBWQVJJQUJMRVMgKiovXFxuLyoqIElNUE9SVCBHTE9CQUwgQ1NTIEZPUiBGT05UUyBIVE1MLCogU0VMRUNUT1IgKiovXFxuLyoqKioqKioqKioqKioqKioqKioqKiogR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1xcbmh0bWwsXFxuKiB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgYW5pbWF0aW9uOiAxcyBlYXNlLWluIGZvcndhcmRzIGZhZGUtaW47XFxufVxcbkBrZXlmcmFtZXMgZmFkZS1pbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuXFxuLyoqKioqKioqKioqKioqKioqKioqKiogRU5EIEdFTkVSQUwgKioqKioqKioqKioqKioqKioqKioqKi9cXG4vKiogSU1QT1JUIE1JWElOICoqL1xcbi8qKiBJTVBPUlQgSEVBREVSIFNUWUxFUyAqKi9cXG5oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiAxMjBweDtcXG59XFxuaGVhZGVyIGgxIHtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbiAgdG9wOiA0NHB4O1xcbiAgbWFyZ2luLXJpZ2h0OiAxMDBweDtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDM2cHg7XFxuICBsaW5lLWhlaWdodDogNDdweDtcXG59XFxuaGVhZGVyIC5sb2dvLFxcbmhlYWRlciAubG9nb19waG90b2dyYXBoZXIge1xcbiAgaGVpZ2h0OiA1MHB4O1xcbn1cXG5oZWFkZXIgLmxvZ28ge1xcbiAgbWFyZ2luLWxlZnQ6IDExNXB4O1xcbn1cXG5oZWFkZXIgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXG4gIG1hcmdpbi1sZWZ0OiAxMDBweDtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSUyBDQVJEUyAqKi9cXG4ucGhvdG9ncmFwaGVyX2NhcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGltZyB7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxuICBoZWlnaHQ6IDIwMHB4O1xcbiAgd2lkdGg6IDIwMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxufVxcbi5waG90b2dyYXBoZXJfY2FyZCBpbWc6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGgyLFxcbi5waG90b2dyYXBoZXJfY2FyZCBoMyxcXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDQsXFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNDAwO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDIge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIGNvbG9yOiAjRDM1NzNDO1xcbiAgZm9udC1zaXplOiAzNnB4O1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDMge1xcbiAgZm9udC1zaXplOiAxMy4wMDEwODM0MjM2cHg7XFxuICBsaW5lLWhlaWdodDogMTdweDtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbn1cXG4ucGhvdG9ncmFwaGVyX2NhcmQgaDQge1xcbiAgbWFyZ2luLXRvcDogMnB4O1xcbiAgZm9udC1zaXplOiAxMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDEzcHg7XFxuICBjb2xvcjogIzAwMDAwMDtcXG59XFxuLnBob3RvZ3JhcGhlcl9jYXJkIGg1IHtcXG4gIG1hcmdpbi10b3A6IDJweDtcXG4gIGZvbnQtc2l6ZTogOXB4O1xcbiAgbGluZS1oZWlnaHQ6IDEycHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBjb2xvcjogIzc1NzU3NTtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGgzIHtcXG4gICAgZm9udC1zaXplOiAxNi45MDE0MDg0NTA3cHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDQge1xcbiAgICBmb250LXNpemU6IDEzcHg7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxuICB9XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDUge1xcbiAgICBmb250LXNpemU6IDExLjdweDtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XFxuICAucGhvdG9ncmFwaGVyX2NhcmQgaDMge1xcbiAgICBmb250LXNpemU6IDE5LjUwMTYyNTEzNTRweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNCB7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoZXJfY2FyZCBoNSB7XFxuICAgIGZvbnQtc2l6ZTogMTMuNXB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhlcl9jYXJkIGltZyB7XFxuICAgIHdpZHRoOiAyMzBweDtcXG4gICAgaGVpZ2h0OiAyMzBweDtcXG4gIH1cXG59XFxuLyoqIElNUE9SVCBNT0RBTCBDT01QT05FTlQgKiovXFxuLm1vZGFsX2NvbnRhY3Qge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNEQjg4NzY7XFxuICBwYWRkaW5nOiAzNXB4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgd2lkdGg6IDUwJTtcXG4gIHRyYW5zaXRpb246IHdpZHRoIDAuNXMgZWFzZS1pbjtcXG59XFxuLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciB7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB3aWR0aDogMTAwJTtcXG4gIG1hcmdpbi10b3A6IC0yMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgI2Nsb3NlTW9kYWwge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdHJhbnNpdGlvbjogZmlsdGVyIDAuNXMgZWFzZS1pbjtcXG59XFxuLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciAjY2xvc2VNb2RhbDpob3ZlciB7XFxuICBmaWx0ZXI6IGJyaWdodG5lc3MoMCkgc2F0dXJhdGUoMTAwJSk7XFxufVxcbi5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgLnRleHRfaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciBoMiB7XFxuICBmb250LXNpemU6IDYzLjcycHg7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gIHRleHQtYWxpZ246IGxlZnQ7XFxufVxcbi5tb2RhbF9jb250YWN0IGZvcm0gaW5wdXQge1xcbiAgZm9udC1zaXplOiAzMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xcbiAgcGFkZGluZzogMTBweDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgZm9ybSB0ZXh0YXJlYSB7XFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG4gIHJlc2l6ZTogdmVydGljYWw7XFxufVxcbi5tb2RhbF9jb250YWN0IGZvcm0gaW5wdXQsXFxuLm1vZGFsX2NvbnRhY3QgZm9ybSB0ZXh0YXJlYSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogNjhweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgZm9ybSBsYWJlbCB7XFxuICBjb2xvcjogIzAwMDAwMDtcXG4gIGZvbnQtc2l6ZTogMzZweDtcXG59XFxuLm1vZGFsX2NvbnRhY3QgZm9ybSBsYWJlbDpsYXN0LWNoaWxkIHtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxufVxcbi5tb2RhbF9jb250YWN0IC5oZWxwX2JsaW5kIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5oaWRlX2NvbnRlbnQge1xcbiAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1vZmY7XFxufVxcbkBrZXlmcmFtZXMgZmFkZS1vZmYge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDAuNDtcXG4gIH1cXG59XFxuXFxuLnNob3dfY29udGVudCB7XFxuICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLWluO1xcbn1cXG5Aa2V5ZnJhbWVzIGZhZGUtaW4ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwLjQ7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gIH1cXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLm1vZGFsX2NvbnRhY3Qge1xcbiAgICB3aWR0aDogNzAlO1xcbiAgfVxcbiAgLm1vZGFsX2NvbnRhY3QgLm1vZGFsX2hlYWRlciBoMiB7XFxuICAgIGZvbnQtc2l6ZTogNTAuNHB4O1xcbiAgfVxcbiAgLm1vZGFsX2NvbnRhY3QgZm9ybSBsYWJlbCB7XFxuICAgIGZvbnQtc2l6ZTogMzIuNzI3MjcyNzI3M3B4O1xcbiAgfVxcbiAgLm1vZGFsX2NvbnRhY3QgZm9ybSBpbnB1dCB7XFxuICAgIGZvbnQtc2l6ZTogMjcuNjkyMzA3NjkyM3B4O1xcbiAgfVxcbiAgLm1vZGFsX2NvbnRhY3QgZm9ybSB0ZXh0YXJlYSB7XFxuICAgIGZvbnQtc2l6ZTogMjIuNXB4O1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXG4gIC5tb2RhbF9jb250YWN0IHtcXG4gICAgd2lkdGg6IDkwJTtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IC5tb2RhbF9oZWFkZXIgaDIge1xcbiAgICBmb250LXNpemU6IDQzLjJweDtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IGZvcm0gbGFiZWwge1xcbiAgICBmb250LXNpemU6IDI3LjY5MjMwNzY5MjNweDtcXG4gIH1cXG4gIC5tb2RhbF9jb250YWN0IGZvcm0gaW5wdXQge1xcbiAgICBmb250LXNpemU6IDI0cHg7XFxuICB9XFxuICAubW9kYWxfY29udGFjdCBmb3JtIHRleHRhcmVhIHtcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcbiAgfVxcbn1cXG4ubW9kYWxfbGlnaHRib3gge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICB0cmFuc2l0aW9uOiB3aWR0aCAwLjVzIGVhc2UtaW47XFxufVxcbi5tb2RhbF9saWdodGJveCAuY29udGVudF9tZWRpYSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiA3MDBweDtcXG4gIHdpZHRoOiA1MDBweDtcXG59XFxuLm1vZGFsX2xpZ2h0Ym94ICN2aWRlb19zZWxlY3RlZCxcXG4ubW9kYWxfbGlnaHRib3ggI3BpY3R1cmVfc2VsZWN0ZWQge1xcbiAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBtYXJnaW46IGF1dG87XFxuICBoZWlnaHQ6IGluaGVyaXQ7XFxuICBtaW4td2lkdGg6IDUwMHB4O1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxufVxcbi5tb2RhbF9saWdodGJveCBhIHtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGZvbnQtc2l6ZTogOTBweDtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbiAgdHJhbnNpdGlvbjogY29sb3IgMC41cyBlYXNlLWluO1xcbiAgcGFkZGluZzogMjVweDtcXG59XFxuLm1vZGFsX2xpZ2h0Ym94IGE6aG92ZXIge1xcbiAgY29sb3I6ICNEQjg4NzY7XFxufVxcbi5tb2RhbF9saWdodGJveCAuY2xvc2VMaWdodGJveCB7XFxuICBmaWx0ZXI6IGJyaWdodG5lc3MoMCkgc2F0dXJhdGUoMTAwJSkgaW52ZXJ0KDE4JSkgc2VwaWEoMzElKSBzYXR1cmF0ZSg0NTk3JSkgaHVlLXJvdGF0ZSgzNDRkZWcpIGJyaWdodG5lc3MoOTMlKSBjb250cmFzdCg5NSUpO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAxMHB4O1xcbiAgcmlnaHQ6IC03MHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdHJhbnNpdGlvbjogZmlsdGVyIDAuNXMgZWFzZS1pbjtcXG59XFxuLm1vZGFsX2xpZ2h0Ym94IC5jbG9zZUxpZ2h0Ym94OmhvdmVyIHtcXG4gIGZpbHRlcjogYnJpZ2h0bmVzcygwKSBzYXR1cmF0ZSgxMDAlKSBpbnZlcnQoNjMlKSBzZXBpYSg0MyUpIHNhdHVyYXRlKDQ0OCUpIGh1ZS1yb3RhdGUoMzIzZGVnKSBicmlnaHRuZXNzKDg5JSkgY29udHJhc3QoOTIlKTtcXG59XFxuLm1vZGFsX2xpZ2h0Ym94IGgyIHtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbn1cXG4ubW9kYWxfbGlnaHRib3ggLmhlbHBfYmxpbmQge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmhpZGVfY29udGVudCB7XFxuICBhbmltYXRpb246IDAuNXMgZWFzZS1pbiBmb3J3YXJkcyBmYWRlLW9mZjtcXG59XFxuQGtleWZyYW1lcyBmYWRlLW9mZiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMC40O1xcbiAgfVxcbn1cXG5cXG4uc2hvd19jb250ZW50IHtcXG4gIGFuaW1hdGlvbjogMC41cyBlYXNlLWluIGZvcndhcmRzIGZhZGUtaW47XFxufVxcbkBrZXlmcmFtZXMgZmFkZS1pbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDAuNDtcXG4gIH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgfVxcbn1cXG5cXG4vKiogSU1QT1JUIENPTlRBQ1QgQlVUVE9OIENPTVBPTkVOVCAqKi9cXG4uZmlzaGV5ZV9idXR0b24ge1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAxMXB4O1xcbiAgbWluLXdpZHRoOiAxNzBweDtcXG4gIG1pbi1oZWlnaHQ6IDcwcHg7XFxuICBib3JkZXI6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTAxQzFDO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdHJhbnNpdGlvbjogY29sb3IgMC41cyBlYXNlLWluLCBiYWNrZ3JvdW5kLWNvbG9yIDAuNXMgZWFzZS1pbjtcXG59XFxuLmZpc2hleWVfYnV0dG9uOmhvdmVyIHtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0RCODg3NjtcXG59XFxuXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIIEhFQURFUiBDT01QT05FTlQgKiovXFxuLnBob3RvZ3JhcGhfaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZmxleC13cmFwOiBuby13cmFwO1xcbiAgYWxpZ24tY29udGVudDogZmxlZC1lbmQ7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkFGQUZBO1xcbiAgaGVpZ2h0OiAzMTNweDtcXG4gIG1hcmdpbi10b3A6IDEwcHg7XFxuICBwYWRkaW5nLWxlZnQ6IDMwcHg7XFxuICBwYWRkaW5nLXJpZ2h0OiAzMHB4O1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgZGl2Om50aC1jaGlsZCgzKSB7XFxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciBoMSxcXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDIsXFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNDAwO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgaDEge1xcbiAgZm9udC1zaXplOiA2My43MnB4O1xcbiAgbWFyZ2luLWJvdHRvbTogLTE1cHg7XFxuICBjb2xvcjogI0QzNTczQztcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgyIHtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcbiAgZm9udC1zaXplOiAyMy4yMjU4MDY0NTE2cHg7XFxuICBjb2xvcjogIzkwMUMxQztcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIGgzIHtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGNvbG9yOiAjNTI1MjUyO1xcbn1cXG4ucGhvdG9ncmFwaF9oZWFkZXIgLnBob3RvZ3JhcGhfYWJvdXQsXFxuLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2J1dHRvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XFxufVxcbi5waG90b2dyYXBoX2hlYWRlciAucGhvdG9ncmFwaF9idXR0b24ge1xcbiAgbWFyZ2luLXRvcDogMzBweDtcXG4gIG1hcmdpbi1yaWdodDogODBweDtcXG59XFxuLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2Fib3V0IHtcXG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgYWxpZ24tY29udGVudDogZmxlZC1lbmQ7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgcGFkZGluZy10b3A6IDE1cHg7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgaDEge1xcbiAgICBmb250LXNpemU6IDQxLjRweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMiB7XFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciBoMyB7XFxuICAgIGZvbnQtc2l6ZTogMTYuMzYzNjM2MzYzNnB4O1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXG4gICAgbWFyZ2luLWJvdHRvbTogMzBweDtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxuICAucGhvdG9ncmFwaF9oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBhbGlnbi1jb250ZW50OiBmbGVkLWVuZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgfVxcbiAgLnBob3RvZ3JhcGhfaGVhZGVyIC5waG90b2dyYXBoX2J1dHRvbiB7XFxuICAgIGFsaWduLWl0ZW1zOiBpbmhlcml0O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDBweDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBtYXJnaW4tdG9wOiAyMDBweDtcXG4gIH1cXG4gIC5waG90b2dyYXBoX2hlYWRlciA+IC5waG90b2dyYXBoX2Fib3V0IHtcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgaDEsXFxuaDIsXFxuaDMge1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB9XFxuICAucGhvdG9ncmFwaF9oZWFkZXIgPiAucGhvdG9ncmFwaGVyX2NhcmQge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbn1cXG4vKiogSU1QT1JUIFNFTEVDVCBGSUxURVIgQ09NUE9ORU5UICoqL1xcbi5zZWxlY3RfYnV0dG9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1jb250ZW50OiBmbGV4LWVuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgcGFkZGluZy1sZWZ0OiAyMHB4O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJETSBTYW5zXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBiYWNrZ3JvdW5kOiAjOTAxQzFDO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNXB4O1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDVweDtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1jb2xvcjogbm9uZTtcXG4gIHdpZHRoOiAxNzBweDtcXG4gIGhlaWdodDogNzBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnNlbGVjdF9idXR0b246OmFmdGVyIHtcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBlYXNlLWluO1xcbiAgY29udGVudDogXFxcIj5cXFwiO1xcbiAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpO1xcbiAgZm9udC1zaXplOiAyNXB4O1xcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICBmbG9hdDogcmlnaHQ7XFxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxufVxcblxcbi5zZWxlY3RfZmlsdGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuXFxuLnNlbGVjdF9jb250ZW50IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBiYWNrZ3JvdW5kOiAjOTAxQzFDO1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNXB4O1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDVweDtcXG4gIG1pbi13aWR0aDogMTYwcHg7XFxuICBib3gtc2hhZG93OiAwcHggMnB4IDhweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgei1pbmRleDogMTtcXG59XFxuLnNlbGVjdF9jb250ZW50IC53aGl0ZWxpbmUge1xcbiAgd2lkdGg6IDkwJTtcXG4gIGhlaWdodDogMXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBtYXJnaW4tbGVmdDogNSU7XFxufVxcbi5zZWxlY3RfY29udGVudCBhIHtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjVzIGVhc2UtaW47XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICB3aWR0aDogMTcwcHg7XFxuICBoZWlnaHQ6IDYwcHg7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICBkaXNwbGF5OiBibG9jaztcXG59XFxuLnNlbGVjdF9jb250ZW50IGE6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbjtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbn1cXG5cXG4uc2VsZWN0X2ZpbHRlcjpob3ZlciAuc2VsZWN0X2NvbnRlbnQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbi5zZWxlY3RfZmlsdGVyOmhvdmVyIC5zZWxlY3RfYnV0dG9uOjphZnRlciB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgtOTBkZWcpO1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMjVzIGVhc2UtaW47XFxufVxcblxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSEVSIFNUQVRJU1RJQyBDT01QT05FTlQgKiovXFxuLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBhbGlnbi1jb250ZW50OiBmbGV4LXN0YXJ0O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjREI4ODc2O1xcbiAgbWluLXdpZHRoOiAzNzZweDtcXG4gIG1pbi1oZWlnaHQ6IDg5cHg7XFxuICBib3R0b206IDA7XFxuICByaWdodDogMzhweDtcXG4gIHotaW5kZXg6IDI7XFxuICBtYXJnaW4tYm90dG9tOiAtMjJweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG59XFxuLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMgLnRvdGFsX2xpa2VzLFxcbi5waG90b2dyYXBoZXJfc3RhdGlzdGljIC5wcmljZV9yYXRlX2RhaWx5IHtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXN0eWxlOiBub3JtYWw7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAyMy4yMjU4MDY0NTE2cHg7XFxuICBsaW5lLWhlaWdodDogMzFweDtcXG4gIGNvbG9yOiAjMDAwMDAwO1xcbiAgcGFkZGluZy10b3A6IDE4cHg7XFxufVxcbi5waG90b2dyYXBoZXJfc3RhdGlzdGljIC50b3RhbF9saWtlczphZnRlciB7XFxuICBwYWRkaW5nLWxlZnQ6IDVweDtcXG4gIGNvbnRlbnQ6IFxcXCLimaVcXFwiO1xcbiAgZm9udC1zaXplOiAzMC44OTAzMjI1ODA2cHg7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgfVxcbn1cXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUiBNRURJQSBDQVJEUyBDT01QT05FTlQgKiovXFxuLm1lZGlhX2NhcmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBtYXgtd2lkdGg6IDM1MHB4O1xcbn1cXG4ubWVkaWFfY2FyZCBpbWcsXFxuLm1lZGlhX2NhcmQgdmlkZW8ge1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxcztcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWF4LWhlaWdodDogMzAwcHg7XFxuICBtaW4taGVpZ2h0OiAzMDBweDtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbn1cXG4ubWVkaWFfY2FyZCBpbWc6aG92ZXIsXFxuLm1lZGlhX2NhcmQgdmlkZW86aG92ZXIge1xcbiAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxcztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxufVxcbi5tZWRpYV9jYXJkIC5kZXRhaWxzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xcbiAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG4ubWVkaWFfY2FyZCBoNiB7XFxuICBmb250LWZhbWlseTogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGNvbG9yOiAjOTAxQzFDO1xcbn1cXG4ubWVkaWFfY2FyZCBoNjpsYXN0LWNoaWxkOjphZnRlciB7XFxuICBmb250LXNpemU6IDMwcHg7XFxuICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxuICBjb250ZW50OiBcXFwi4pmlXFxcIjtcXG59XFxuXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxuICAubWVkaWFfY2FyZCBpbWcsXFxuLm1lZGlhX2NhcmQge1xcbiAgICBtYXgtd2lkdGg6IDEwMCU7XFxuICB9XFxufVxcbi8qKiBJTVBPUlQgUEFHRVMgKG90aGVyKSBTdHlsZXMgKiovXFxuLnBob3RvZ3JhcGhlcl9zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcbiAgZ2FwOiA3MHB4O1xcbiAgbWFyZ2luLXRvcDogNzVweDtcXG4gIG1hcmdpbi1ib3R0b206IDc1cHg7XFxufVxcblxcbi5tYXJnaW5fbGVmdF9yaWdodCB7XFxuICBtYXJnaW46IDAgMTAwcHg7XFxufVxcblxcbi5maWx0ZXJfc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcbn1cXG4uZmlsdGVyX3NlY3Rpb24gaDU6Zmlyc3QtY2hpbGQge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIG1hcmdpbi1yaWdodDogMjhweDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiRE0gU2Fuc1xcXCIsIHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgY29sb3I6ICMwMDAwMDA7XFxufVxcbi5maWx0ZXJfc2VjdGlvbiAuc2VsZWN0X2ZpbHRlciB7XFxuICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG5cXG4ubWVkaWFfc2VjdGlvbiB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyIDFmcjtcXG4gIHJvdy1nYXA6IDMwcHg7XFxuICBjb2x1bW4tZ2FwOiA5NXB4O1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG4gIG1hcmdpbi1ib3R0b206IDc1cHg7XFxufVxcblxcbi5FUlJPUl80MDQge1xcbiAgbWFyZ2luLXRvcDogNSU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIHBhZGRpbmc6IDQwcHg7XFxufVxcbi5FUlJPUl80MDQgaDEge1xcbiAgbWFyZ2luLWJvdHRvbTogNSU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDcycHg7XFxuICBtYXJnaW4tYm90dG9tOiA0MHB4O1xcbn1cXG4uRVJST1JfNDA0IGEge1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgY29sb3I6IGluaGVyaXQ7XFxufVxcbi5FUlJPUl80MDQgYTpob3ZlciB7XFxuICBjb2xvcjogaW5oZXJpdDtcXG59XFxuXFxuLyoqIElNUE9SVCBGT09URVIgU1RZTEVTICoqL1xcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDJweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBtYXJnaW4tdG9wOiA3NXB4O1xcbn1cXG5cXG4vKiogSU1QT1JUIFJFU1BPTlNJVkUgU1RZTEVTIGZvciBOb24gQ29tcG9uZW50cyBFbGVtZW50c1xcbiAoY29tcG9uZW50cyBFbGVtZW50cyBnb3QgdGhlaXIgb3duIFJlc3BvbnNpdmUgUnVsZXMgaW4gdGhlaXIgU3R5bGVzaGVldCkgKiovXFxuQG1lZGlhIChtaW4td2lkdGg6IDIwMDBweCkge1xcbiAgLm1lZGlhX3NlY3Rpb24ge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyIDFmcjtcXG4gIH1cXG59XFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9zZWN0aW9uLFxcbi5tZWRpYV9zZWN0aW9uIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgfVxcbn1cXG5AbWVkaWEgKG1heC13aWR0aDogODAwcHgpIHtcXG4gIGhlYWRlciB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIG1hcmdpbi10b3A6IDQwcHg7XFxuICAgIGhlaWdodDogMTAwcHg7XFxuICB9XFxuICBoZWFkZXIgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxuICB9XFxuICBoZWFkZXIgLmxvZ28sXFxuaGVhZGVyIGgxIHtcXG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcXG4gICAgZm9udC1zaXplOiAzMHB4O1xcbiAgfVxcbiAgLm1hcmdpbl9sZWZ0X3JpZ2h0IHtcXG4gICAgbWFyZ2luOiAwIDIwcHg7XFxuICB9XFxuICAuZmlsdGVyX3NlY3Rpb24ge1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcbiAgLnBob3RvZ3JhcGhlcl9zZWN0aW9uIHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxuICB9XFxufVxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcbiAgLm1lZGlhX3NlY3Rpb24ge1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcXG4gIH1cXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3Njc3MvbWFpbi5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fdmFyaWFibGVzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL19nbG9iYWwuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvcGFnZXMvX2hlYWRlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9fbWl4aW4uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fcGhvdG9ncmFwaGVyX2NhcmRzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvbW9kYWwvX2NvbnRhY3Quc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9tb2RhbC9fbGlnaHRib3guc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fZmlzaGV5ZV9idXR0b24uc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fcGhvdG9ncmFwaF9oZWFkZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fc2VsZWN0X2ZpbHRlci5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19waG90b2dyYXBoZXJfc3RhdGlzdGljLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2NvbXBvbmVudHMvX21lZGlhX2NhcmRzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL3BhZ2VzL19wYWdlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9wYWdlcy9fZm9vdGVyLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9z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QUE7QVA0UFI7O0FPclBBO0VBQ0kseUNBQUE7QVB3UEo7QU90UEk7RUFDSTtJQUNJLFVBQUE7RVB3UFY7RU9yUE07SUFDSSxZQUFBO0VQdVBWO0FBQ0Y7O0FPalBBO0VBQ0ksd0NBQUE7QVBvUEo7QU9sUEk7RUFDSTtJQUNJLFlBQUE7RVBvUFY7RU9qUE07SUFDSSxVQUFBO0VQbVBWO0FBQ0Y7O0FBMVVBLHNDQUFBO0FRYkE7RUFDSSxlQUFBO0VBQ0EsZ0JQQ2M7RU9BZCxrQ1BGVTtFT0dWLFlQS1k7RU9KWixhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSx5QlBHYTtFT0ZiLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLDZEQUFBO0FSMlZKO0FRelZJO0VBQ0ksY1BMYTtFT01iLHlCQUFBO0FSMlZSOztBQTVWQSx5Q0FBQTtBU2ZBO0VMS0UsYUFBQTtFQUNBLG1CS0xzQjtFTFFwQixrQktSeUI7RUxZekIsdUJLWmtDO0VMZ0JsQyw4QktoQjRDO0VBQzVDLHlCUmFrQjtFUVpsQixhQUFBO0VBQ0EsZ0JBQUE7RUxnQ0Ysa0JLL0JrQztFTGdDbEMsbUJLaENrQztBVG9YcEM7QVNsWEk7RUFDSSxrQkFBQTtBVG9YUjtBU2hYSTs7O0VBR0ksa0NSZE07RVFlTixnQlJkWTtBRGdZcEI7QVMvV0k7RUFDSSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsY1JUUztBRDBYakI7QVM5V0k7RUFDSSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMEJBQUE7RUFDQSxjUmpCUztBRGlZakI7QVM3V0k7RUFDSSxlQUFBO0VBQ0EsY1JwQlc7QURtWW5CO0FTNVdJOztFTGhDRixhQUFBO0VBQ0Esc0JLaUMwQjtFTHRCeEIsdUJLc0I0QztFTGxCNUMsdUJLa0JvRDtBVGlYeEQ7QVM5V0k7RUFDSSxnQkFBQTtFQUNBLGtCQUFBO0FUZ1hSO0FTN1dJO0VBQ0ksaUJBQUE7RUFDQSxtQkFBQTtBVCtXUjs7QVMxV0E7RUFDSTtJQUNJLHVCUi9DUTtJR0pkLGFBQUE7SUFDQSxzQkttRDBCO0lMaER4QixlS2dEZ0M7SUw1Q2hD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QUFBO0lBQ0Esa0JBQUE7SUFDQSxlQUFBO0VmNnJCVjtFZXpyQkU7SUFDSSxjQUFBO0VmMnJCTjtFZXZyQkU7SUFDSSw4QkFBQTtFZnlyQk47QUFDRjtBZXJyQkE7RUFFSTtJQUNJLDBCQUFBO0Vmc3JCTjtBQUNGO0FlbHJCQTtFQUVJO0lBQ0ksMEJBQUE7RWZtckJOO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqIFVzZWQgdG8gbG9hZCBhbGwgdmFyaWFibGVzIGZvciB0aGlzIHByb2plY3QgYWJvdXQgU0NTUyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfdmFyaWFibGVzLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgR0xPQkFMIENTUyBGT1IgRk9OVFMgSFRNTCwqIFNFTEVDVE9SICoqL1xcclxcbkBpbXBvcnQgXFxcIl9nbG9iYWwuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBNSVhJTiAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfbWl4aW4uc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBIRUFERVIgU1RZTEVTICoqL1xcclxcbkBpbXBvcnQgXFxcInBhZ2VzL2hlYWRlci5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIFBIT1RPR1JBUEhFUlMgQ0FSRFMgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9waG90b2dyYXBoZXJfY2FyZHMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBNT0RBTCBDT01QT05FTlQgKiovXFxyXFxuQGltcG9ydCBcXFwiY29tcG9uZW50cy9tb2RhbC9fY29udGFjdC5zY3NzXFxcIjtcXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL21vZGFsL19saWdodGJveC5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIENPTlRBQ1QgQlVUVE9OIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL2Zpc2hleWVfYnV0dG9uLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUEhPVE9HUkFQSCBIRUFERVIgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvcGhvdG9ncmFwaF9oZWFkZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBTRUxFQ1QgRklMVEVSIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3NlbGVjdF9maWx0ZXIuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgU1RBVElTVElDIENPTVBPTkVOVCAqKi9cXHJcXG5AaW1wb3J0IFxcXCJjb21wb25lbnRzL3Bob3RvZ3JhcGhlcl9zdGF0aXN0aWMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQSE9UT0dSQVBIRVIgTUVESUEgQ0FSRFMgQ09NUE9ORU5UICoqL1xcclxcbkBpbXBvcnQgXFxcImNvbXBvbmVudHMvbWVkaWFfY2FyZHMuc2Nzc1xcXCI7XFxyXFxuLyoqIElNUE9SVCBQQUdFUyAob3RoZXIpIFN0eWxlcyAqKi9cXHJcXG5AaW1wb3J0IFxcXCJwYWdlcy9wYWdlcy5zY3NzXFxcIjtcXHJcXG4vKiogSU1QT1JUIEZPT1RFUiBTVFlMRVMgKiovXFxyXFxuQGltcG9ydCBcXFwicGFnZXMvZm9vdGVyLnNjc3NcXFwiO1xcclxcbi8qKiBJTVBPUlQgUkVTUE9OU0lWRSBTVFlMRVMgZm9yIE5vbiBDb21wb25lbnRzIEVsZW1lbnRzXFxyXFxuIChjb21wb25lbnRzIEVsZW1lbnRzIGdvdCB0aGVpciBvd24gUmVzcG9uc2l2ZSBSdWxlcyBpbiB0aGVpciBTdHlsZXNoZWV0KSAqKi9cXHJcXG5AaW1wb3J0IFxcXCJfcmVzcG9uc2l2ZS5zY3NzXFxcIjtcIixcIi8qKiBGT05UICoqL1xcclxcbiRmb250X2dsb2JhbDogXFxcIkRNIFNhbnNcXFwiLCBzYW5zLXNlcmlmO1xcclxcbiRmb250X3dlaWdodF9zbWFsbDogNDAwO1xcclxcbiRmb250X3dlaWdodF9iaWc6IDcwMDtcXHJcXG5cXHJcXG4kZm9udF9zaXplOiAzNnB4O1xcclxcbi8qKiBFTkQgRk9OVCAqKi9cXHJcXG5cXHJcXG4vKiogQ09MT1IgVkFSSUFCTEVTICoqL1xcclxcbiRkZWZhdWx0X2NvbG9yOiB3aGl0ZTtcXHJcXG4kZGVmYXVsdF9mb250X2NvbG9yOiAjMDAwMDAwO1xcclxcbiRjb2xvcl9ncmF5OiAjNzU3NTc1O1xcclxcbiRjb2xvcl9wcmltYXJ5MTogIzkwMUMxQztcXHJcXG4kY29sb3JfcHJpbWFyeTI6ICNEMzU3M0M7XFxyXFxuJGNvbG9yX3NlY29uZGFyeTI6ICM1MjUyNTI7XFxyXFxuJGNvbG9yX3NlY29uZGFyeTJfYmc6ICNGQUZBRkE7XFxyXFxuJGNvbG9yX2JhY2tncm91bmQ6ICNEQjg4NzY7XFxyXFxuLyoqIEVORCBDT0xPUiBWQVJJQUJMRVMgKiovXCIsXCIvKioqKioqKioqKioqKioqKioqKioqKiBHRU5FUkFMICoqKioqKioqKioqKioqKioqKioqKiovXFxyXFxuaHRtbCxcXHJcXG4qIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICBhbmltYXRpb246IDFzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXHJcXG5cXHJcXG4gIEBrZXlmcmFtZXMgZmFkZS1pbiB7XFxyXFxuICAgIDAlIHtcXHJcXG4gICAgICBvcGFjaXR5OiAwO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIDEwMCUge1xcclxcbiAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgfVxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4vKioqKioqKioqKioqKioqKioqKioqKiBFTkQgR0VORVJBTCAqKioqKioqKioqKioqKioqKioqKioqL1wiLFwiaGVhZGVyIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIG51bGwsIHNwYWNlLWJldHdlZW4sIGNlbnRlcik7XFxyXFxuICAgIGhlaWdodDogMTIwcHg7XFxyXFxuXFxyXFxuXFxyXFxuICAgIGgxIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgICAgICB0b3A6IDQ0cHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwMHB4O1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZTtcXHJcXG4gICAgICAgIGxpbmUtaGVpZ2h0OiA0N3B4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvLFxcclxcbiAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5sb2dvIHtcXHJcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMTVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAubG9nb19waG90b2dyYXBoZXIge1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDEwMHB4O1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cIixcIkBtaXhpbiBmbGV4LWJhc2ljKCRmbGV4LWRpcmVjdGlvbixcXHJcXG4gICRmbGV4LXdyYXAsXFxyXFxuICAkYWxpZ24tY29udGVudCxcXHJcXG4gICRqdXN0aWZ5LWNvbnRlbnQsXFxyXFxuICAkYWxpZ24taXRlbXMpIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogJGZsZXgtZGlyZWN0aW9uO1xcclxcblxcclxcbiAgQGlmICgkZmxleC13cmFwKSB7XFxyXFxuICAgIGZsZXgtd3JhcDogJGZsZXgtd3JhcDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIEBpZiAoJGFsaWduLWNvbnRlbnQpIHtcXHJcXG4gICAgYWxpZ24tY29udGVudDogJGFsaWduLWNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuXFxyXFxuICBAaWYgKCRqdXN0aWZ5LWNvbnRlbnQpIHtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiAkanVzdGlmeS1jb250ZW50O1xcclxcbiAgfVxcclxcblxcclxcbiAgQGlmICgkYWxpZ24taXRlbXMpIHtcXHJcXG4gICAgYWxpZ24taXRlbXM6ICRhbGlnbi1pdGVtcztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLy8gQG1peGluIG1hc2stY3Jvc3Nicm93c2VyKCR2YWx1ZSkge1xcclxcbi8vICAgLXdlYmtpdC1tYXNrOiAkdmFsdWU7XFxyXFxuLy8gICBtYXNrOiAkdmFsdWU7XFxyXFxuLy8gfVxcclxcblxcclxcbi8vIEBtaXhpbiBtYXJnaW4tbGVmdC1hbmQtcmlnaHQoJHZhbHVlKSB7XFxyXFxuLy8gICBtYXJnaW4tbGVmdDogJHZhbHVlO1xcclxcbi8vICAgbWFyZ2luLXJpZ2h0OiAkdmFsdWU7XFxyXFxuLy8gfVxcclxcblxcclxcbkBtaXhpbiBwYWRkaW5nLWxlZnQtYW5kLXJpZ2h0KCR2YWx1ZSkge1xcclxcbiAgcGFkZGluZy1sZWZ0OiAkdmFsdWU7XFxyXFxuICBwYWRkaW5nLXJpZ2h0OiAkdmFsdWU7XFxyXFxufVwiLFwiLnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIG51bGwsIGNlbnRlciwgY2VudGVyKTtcXHJcXG4gICAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIGltZyB7XFxyXFxuICAgICAgICBib3gtc2hhZG93OiAwcHggNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjI1KTtcXHJcXG4gICAgICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgMXM7XFxyXFxuICAgICAgICBoZWlnaHQ6IDIwMHB4O1xcclxcbiAgICAgICAgd2lkdGg6IDIwMHB4O1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XFxyXFxuXFxyXFxuICAgICAgICAmOmhvdmVyIHtcXHJcXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41MCk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG4gICAgaDIsXFxyXFxuICAgIGgzLFxcclxcbiAgICBoNCxcXHJcXG4gICAgaDUge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfc21hbGw7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDIge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTI7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAyLjc2OSk7XFxyXFxuICAgICAgICBsaW5lLWhlaWdodDogMTdweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDQge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMnB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAzLjYpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEzcHg7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoNSB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAycHg7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDQpO1xcclxcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEycHg7XFxyXFxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX2dyYXk7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgaDMge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMi43NjkgKiAxLjMpO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAzLjYgKiAxLjMpO1xcclxcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICBoNSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyA0ICogMS4zKTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaGVyX2NhcmQge1xcclxcbiAgICAgICAgaDMge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMi43NjkgKiAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDQge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMy42ICogMS41KTtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIGg1IHtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDQgKiAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaW1nIHtcXHJcXG4gICAgICAgICAgICB3aWR0aDogMjMwcHg7XFxyXFxuICAgICAgICAgICAgaGVpZ2h0OiAyMzBweDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbn1cIixcIi5tb2RhbF9jb250YWN0IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICB0b3A6IDUwJTtcXHJcXG4gICAgbGVmdDogNTAlO1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXHJcXG4gICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX2JhY2tncm91bmQ7XFxyXFxuICAgIHBhZGRpbmc6IDM1cHg7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gICAgd2lkdGg6IDUwJTtcXHJcXG4gICAgdHJhbnNpdGlvbjogd2lkdGggMC41cyBlYXNlLWluO1xcclxcblxcclxcblxcclxcbiAgICAubW9kYWxfaGVhZGVyIHtcXHJcXG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogLTIwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xcclxcbiAgICAgICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgICAgIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcXHJcXG5cXHJcXG4gICAgICAgICNjbG9zZU1vZGFsIHtcXHJcXG4gICAgICAgICAgICAvLyBDbG9zZSBNb2RhbCBQaWN0dXJlXFxyXFxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGZpbHRlciAwLjVzIGVhc2UtaW47XFxyXFxuXFxyXFxuICAgICAgICAgICAgJjpob3ZlciB7XFxyXFxuICAgICAgICAgICAgICAgIGZpbHRlcjogYnJpZ2h0bmVzcygwKSBzYXR1cmF0ZSgxMDAlKTtcXHJcXG4gICAgICAgICAgICB9XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAudGV4dF9oZWFkZXIge1xcclxcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgaDIge1xcclxcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplICogMS43Nyk7XFxyXFxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXHJcXG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcclxcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxuICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XFxyXFxuICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIGlucHV0IHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS4yKTtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcXHJcXG4gICAgICAgIHBhZGRpbmc6IDEwcHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLzEuNSk7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xcclxcbiAgICAgICAgcmVzaXplOiB2ZXJ0aWNhbDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBmb3JtIGlucHV0LFxcclxcbiAgICBmb3JtIHRleHRhcmVhIHtcXHJcXG5cXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgaGVpZ2h0OiA2OHB4O1xcclxcbiAgICAgICAgYm9yZGVyOiBub25lO1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIGZvcm0gbGFiZWwge1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgICAgICBmb250LXNpemU6ICRmb250X3NpemU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgZm9ybSBsYWJlbDpsYXN0LWNoaWxkIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDE1cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLmhlbHBfYmxpbmQge1xcclxcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG4uaGlkZV9jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1vZmY7XFxyXFxuXFxyXFxuICAgIEBrZXlmcmFtZXMgZmFkZS1vZmYge1xcclxcbiAgICAgICAgMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIDEwMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4uc2hvd19jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXHJcXG5cXHJcXG4gICAgQGtleWZyYW1lcyBmYWRlLWluIHtcXHJcXG4gICAgICAgIDAlIHtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjQ7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAxMDAlIHtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAxLjA7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcclxcblxcclxcbiAgICAubW9kYWxfY29udGFjdCB7XFxyXFxuICAgICAgICB3aWR0aDogNzAlO1xcclxcblxcclxcbiAgICAgICAgLm1vZGFsX2hlYWRlciB7XFxyXFxuICAgICAgICAgICAgaDIge1xcclxcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuNCk7XFxyXFxuICAgICAgICAgICAgfVxcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSBsYWJlbCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjEpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSBpbnB1dCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjMpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjYpO1xcclxcblxcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICB9XFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcclxcbiAgICAubW9kYWxfY29udGFjdCB7XFxyXFxuICAgICAgICB3aWR0aDogOTAlO1xcclxcblxcclxcblxcclxcbiAgICAgICAgLm1vZGFsX2hlYWRlciB7XFxyXFxuICAgICAgICAgICAgaDIge1xcclxcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDEuMik7XFxyXFxuICAgICAgICAgICAgfVxcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSBsYWJlbCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjMpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSBpbnB1dCB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjUpO1xcclxcbiAgICAgICAgfVxcclxcblxcclxcbiAgICAgICAgZm9ybSB0ZXh0YXJlYSB7XFxyXFxuICAgICAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjgpO1xcclxcblxcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxufVwiLFwiLm1vZGFsX2xpZ2h0Ym94IHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICB0b3A6IDUwJTtcXHJcXG4gICAgbGVmdDogNTAlO1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcXHJcXG4gICAgdHJhbnNpdGlvbjogd2lkdGggMC41cyBlYXNlLWluO1xcclxcblxcclxcblxcclxcbiAgICAuY29udGVudF9tZWRpYSB7XFxyXFxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICAgICAgaGVpZ2h0OiA3MDBweDtcXHJcXG4gICAgICAgIHdpZHRoOiA1MDBweDtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcbiAgICAjdmlkZW9fc2VsZWN0ZWQsXFxyXFxuICAgICNwaWN0dXJlX3NlbGVjdGVkIHtcXHJcXG4gICAgICAgIGJveC1zaGFkb3c6IDBweCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjUpO1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICAgICAgbWFyZ2luOiBhdXRvO1xcclxcblxcclxcbiAgICAgICAgaGVpZ2h0OiBpbmhlcml0O1xcclxcbiAgICAgICAgbWluLXdpZHRoOiA1MDBweDtcXHJcXG4gICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICBcXHJcXG5cXHJcXG4gICAgYSB7XFxyXFxuICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAqIDIuNSk7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICAgICAgdHJhbnNpdGlvbjogY29sb3IgMC41cyBlYXNlLWluO1xcclxcbiAgICAgICAgcGFkZGluZzogMjVweDtcXHJcXG5cXHJcXG4gICAgICAgICY6aG92ZXIge1xcclxcbiAgICAgICAgICAgIGNvbG9yOiAkY29sb3JfYmFja2dyb3VuZDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAuY2xvc2VMaWdodGJveCB7XFxyXFxuICAgICAgICBmaWx0ZXI6IGJyaWdodG5lc3MoMCkgc2F0dXJhdGUoMTAwJSkgaW52ZXJ0KDE4JSkgc2VwaWEoMzElKSBzYXR1cmF0ZSg0NTk3JSkgaHVlLXJvdGF0ZSgzNDRkZWcpIGJyaWdodG5lc3MoOTMlKSBjb250cmFzdCg5NSUpO1xcclxcbiAgICAgICAgLy8gdG8gdGFyZ2V0IGNvbG9yIENGOiBodHRwczogLy9jb2RlcGVuLmlvL3Nvc3VrZS9wZW4vUGpvcXFwXFxyXFxuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgICAgICB0b3A6IDEwcHg7XFxyXFxuICAgICAgICByaWdodDogLTcwcHg7XFxyXFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBmaWx0ZXIgMC41cyBlYXNlLWluO1xcclxcblxcclxcbiAgICAgICAgJjpob3ZlciB7XFxyXFxuICAgICAgICAgICAgZmlsdGVyOiBicmlnaHRuZXNzKDApIHNhdHVyYXRlKDEwMCUpIGludmVydCg2MyUpIHNlcGlhKDQzJSkgc2F0dXJhdGUoNDQ4JSkgaHVlLXJvdGF0ZSgzMjNkZWcpIGJyaWdodG5lc3MoODklKSBjb250cmFzdCg5MiUpO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIGgyIHtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgICAgICBmb250LXNpemU6IDI0cHg7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4gICAgLmhlbHBfYmxpbmQge1xcclxcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcblxcclxcbn1cXHJcXG5cXHJcXG4uaGlkZV9jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1vZmY7XFxyXFxuXFxyXFxuICAgIEBrZXlmcmFtZXMgZmFkZS1vZmYge1xcclxcbiAgICAgICAgMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDEuMDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIDEwMCUge1xcclxcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNDtcXHJcXG4gICAgICAgIH1cXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4uc2hvd19jb250ZW50IHtcXHJcXG4gICAgYW5pbWF0aW9uOiAwLjVzIGVhc2UtaW4gZm9yd2FyZHMgZmFkZS1pbjtcXHJcXG5cXHJcXG4gICAgQGtleWZyYW1lcyBmYWRlLWluIHtcXHJcXG4gICAgICAgIDAlIHtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjQ7XFxyXFxuICAgICAgICB9XFxyXFxuXFxyXFxuICAgICAgICAxMDAlIHtcXHJcXG4gICAgICAgICAgICBvcGFjaXR5OiAxLjA7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG59XCIsXCIuZmlzaGV5ZV9idXR0b24ge1xcclxcbiAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuOCk7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfYmlnO1xcclxcbiAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICBjb2xvcjogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgIHBhZGRpbmc6IDExcHg7XFxyXFxuICAgIG1pbi13aWR0aDogMTcwcHg7XFxyXFxuICAgIG1pbi1oZWlnaHQ6IDcwcHg7XFxyXFxuICAgIGJvcmRlcjogbm9uZTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgdHJhbnNpdGlvbjogY29sb3IgMC41cyBlYXNlLWluLCBiYWNrZ3JvdW5kLWNvbG9yIDAuNXMgZWFzZS1pbjtcXHJcXG5cXHJcXG4gICAgJjpob3ZlciB7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfZm9udF9jb2xvcjtcXHJcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9iYWNrZ3JvdW5kO1xcclxcbiAgICB9XFxyXFxufVwiLFwiLnBob3RvZ3JhcGhfaGVhZGVyIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG5vLXdyYXAsIGZsZWQtZW5kLCBzcGFjZS1iZXR3ZWVuLCBudWxsKTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvbG9yX3NlY29uZGFyeTJfYmc7XFxyXFxuICAgIGhlaWdodDogMzEzcHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxyXFxuICAgIEBpbmNsdWRlIHBhZGRpbmctbGVmdC1hbmQtcmlnaHQoMzBweCk7XFxyXFxuXFxyXFxuICAgIGRpdjpudGgtY2hpbGQoMykge1xcclxcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuXFxyXFxuICAgIGgxLFxcclxcbiAgICBoMixcXHJcXG4gICAgaDMge1xcclxcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiAkZm9udF93ZWlnaHRfc21hbGw7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDEge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgKiAxLjc3KTtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IC0xNXB4O1xcclxcbiAgICAgICAgY29sb3I6ICRjb2xvcl9wcmltYXJ5MjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoMiB7XFxyXFxuICAgICAgICBtYXJnaW4tdG9wOiAxNXB4O1xcclxcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41NSk7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGgzIHtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udC1zaXplIC8gMik7XFxyXFxuICAgICAgICBjb2xvcjogJGNvbG9yX3NlY29uZGFyeTI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfYWJvdXQsXFxyXFxuICAgIC5waG90b2dyYXBoX2J1dHRvbiB7XFxyXFxuICAgICAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKGNvbHVtbiwgbnVsbCwgbnVsbCwgY2VudGVyLCBmbGV4LXN0YXJ0KTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9idXR0b24ge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMzBweDtcXHJcXG4gICAgICAgIG1hcmdpbi1yaWdodDogODBweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9hYm91dCB7XFxyXFxuICAgICAgICBtYXJnaW4tbGVmdDogMjBweDtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XFxyXFxuICAgIH1cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDExMDBweCkge1xcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIge1xcclxcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgICAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKGNvbHVtbiwgd3JhcCwgZmxlZC1lbmQsIHNwYWNlLWJldHdlZW4sIGNlbnRlcik7XFxyXFxuICAgICAgICBwYWRkaW5nLXRvcDogMTVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIgaDEge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgKiAxLjE1KTtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXIgaDIge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjgpO1xcclxcblxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciBoMyB7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnQtc2l6ZSAvIDIuMik7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnBob3RvZ3JhcGhfYnV0dG9uIHtcXHJcXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7XFxyXFxuXFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciB7XFxyXFxuICAgICAgICBAaW5jbHVkZSBmbGV4LWJhc2ljKGNvbHVtbiwgbnVsbCwgZmxlZC1lbmQsIHNwYWNlLWJldHdlZW4sIGNlbnRlcik7XFxyXFxuXFxyXFxuICAgICAgICAucGhvdG9ncmFwaF9idXR0b24ge1xcclxcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBpbmhlcml0O1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMHB4O1xcclxcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAyMDBweDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXI+LnBob3RvZ3JhcGhfYWJvdXQge1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDA7XFxyXFxuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoX2hlYWRlciBoMSxcXHJcXG4gICAgaDIsXFxyXFxuICAgIGgzIHtcXHJcXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICAucGhvdG9ncmFwaF9oZWFkZXI+LnBob3RvZ3JhcGhlcl9jYXJkIHtcXHJcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG59XCIsXCIuc2VsZWN0X2J1dHRvbiB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGFsaWduLWNvbnRlbnQ6IGZsZXgtZW5kO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuXFxyXFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxuICAgIHBhZGRpbmctbGVmdDogMjBweDtcXHJcXG4gICAgZm9udC1mYW1pbHk6ICRmb250X2dsb2JhbDtcXHJcXG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X2JpZztcXHJcXG4gICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAyKTtcXHJcXG4gICAgYmFja2dyb3VuZDogJGNvbG9yX3ByaW1hcnkxO1xcclxcbiAgICBjb2xvcjogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDVweDtcXHJcXG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDVweDtcXHJcXG4gICAgYm9yZGVyOiBub25lO1xcclxcbiAgICBib3JkZXItY29sb3I6IG5vbmU7XFxyXFxuICAgIHdpZHRoOiAxNzBweDtcXHJcXG4gICAgaGVpZ2h0OiA3MHB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RfYnV0dG9uOjphZnRlciB7XFxyXFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBlYXNlLWluO1xcclxcbiAgICBjb250ZW50OiBcXFwiPlxcXCI7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXHJcXG4gICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjQ0KTtcXHJcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxyXFxuICAgIGZsb2F0OiByaWdodDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4uc2VsZWN0X2ZpbHRlciB7XFxyXFxuXFxyXFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG5cXHJcXG4uc2VsZWN0X2NvbnRlbnQge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJhY2tncm91bmQ6ICRjb2xvcl9wcmltYXJ5MTtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNXB4O1xcclxcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNXB4O1xcclxcbiAgICBtaW4td2lkdGg6IDE2MHB4O1xcclxcbiAgICBib3gtc2hhZG93OiAwcHggMnB4IDhweCAwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcclxcbiAgICB6LWluZGV4OiAxO1xcclxcblxcclxcblxcclxcbiAgICAud2hpdGVsaW5lIHtcXHJcXG4gICAgICAgIHdpZHRoOiA5MCU7XFxyXFxuICAgICAgICBoZWlnaHQ6IDFweDtcXHJcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRkZWZhdWx0X2NvbG9yO1xcclxcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDUlO1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGEge1xcclxcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNXMgZWFzZS1pbjtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X2JpZztcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMik7XFxyXFxuICAgICAgICBjb2xvcjogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgICAgICBwYWRkaW5nOiAyMHB4O1xcclxcbiAgICAgICAgd2lkdGg6IDE3MHB4O1xcclxcbiAgICAgICAgaGVpZ2h0OiA2MHB4O1xcclxcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgYTpob3ZlciB7XFxyXFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlLWluO1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuXFxyXFxuLnNlbGVjdF9maWx0ZXI6aG92ZXIgLnNlbGVjdF9jb250ZW50IHtcXHJcXG5cXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi5zZWxlY3RfZmlsdGVyOmhvdmVyIC5zZWxlY3RfYnV0dG9uOjphZnRlciB7XFxyXFxuICAgIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XFxyXFxuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBlYXNlLWluO1xcclxcbn1cIixcIi5waG90b2dyYXBoZXJfc3RhdGlzdGljIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIGZsZXgtc3RhcnQsIHNwYWNlLWFyb3VuZCwgYmFzZWxpbmUpO1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjb2xvcl9iYWNrZ3JvdW5kO1xcclxcbiAgICBtaW4td2lkdGg6IDM3NnB4O1xcclxcbiAgICBtaW4taGVpZ2h0OiA4OXB4O1xcclxcbiAgICBib3R0b206IDA7XFxyXFxuICAgIHJpZ2h0OiAzOHB4O1xcclxcbiAgICB6LWluZGV4OiAyO1xcclxcbiAgICBtYXJnaW4tYm90dG9tOiAtMjJweDtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcblxcclxcblxcclxcblxcclxcbiAgICAudG90YWxfbGlrZXMsXFxyXFxuICAgIC5wcmljZV9yYXRlX2RhaWx5IHtcXHJcXG4gICAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9nbG9iYWw7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXdlaWdodDogJGZvbnRfd2VpZ2h0X2JpZztcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41NSk7XFxyXFxuICAgICAgICBsaW5lLWhlaWdodDogMzFweDtcXHJcXG4gICAgICAgIGNvbG9yOiAkZGVmYXVsdF9mb250X2NvbG9yO1xcclxcbiAgICAgICAgcGFkZGluZy10b3A6IDE4cHg7XFxyXFxuXFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnRvdGFsX2xpa2VzOmFmdGVyIHtcXHJcXG4gICAgICAgIHBhZGRpbmctbGVmdDogNXB4O1xcclxcbiAgICAgICAgY29udGVudDogXFxcIuKZpVxcXCI7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuNTUgKiAxLjMzKTtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcXHJcXG4gICAgLnBob3RvZ3JhcGhlcl9zdGF0aXN0aWMge1xcclxcbiAgICAgICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cIixcIi5tZWRpYV9jYXJkIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhjb2x1bW4sIG51bGwsIG51bGwsIG51bGwsIG51bGwpO1xcclxcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxuICAgIG1heC13aWR0aDogMzUwcHg7XFxyXFxuXFxyXFxuICAgIGltZyxcXHJcXG4gICAgdmlkZW8ge1xcclxcbiAgICAgICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxcztcXHJcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICAgICAgbWF4LWhlaWdodDogMzAwcHg7XFxyXFxuICAgICAgICBtaW4taGVpZ2h0OiAzMDBweDtcXHJcXG4gICAgICAgIG9iamVjdC1maXQ6IGNvdmVyO1xcclxcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcblxcclxcbiAgICAgICAgJjpob3ZlciB7XFxyXFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAxcztcXHJcXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgICAgICAgYm94LXNoYWRvdzogMHB4IDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC41MCk7XFxyXFxuICAgICAgICB9XFxyXFxuICAgIH1cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4gICAgLmRldGFpbHMge1xcclxcbiAgICAgICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIG51bGwsIHNwYWNlLWJldHdlZW4sIGJhc2VsaW5lKTtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDVweDtcXHJcXG4gICAgfVxcclxcblxcclxcbiAgICBoNiB7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC1zdHlsZTogbm9ybWFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9zbWFsbDtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogY2FsYygkZm9udF9zaXplIC8gMS41KTtcXHJcXG4gICAgICAgIGNvbG9yOiAkY29sb3JfcHJpbWFyeTE7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgaDY6bGFzdC1jaGlsZDo6YWZ0ZXIge1xcclxcbiAgICAgICAgZm9udC1zaXplOiBjYWxjKCRmb250X3NpemUgLyAxLjUgKiAxLjI1KTtcXHJcXG4gICAgICAgIHBhZGRpbmctbGVmdDogMTBweDtcXHJcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCLimaVcXFwiO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA2MDBweCkge1xcclxcblxcclxcbiAgICAubWVkaWFfY2FyZCBpbWcsXFxyXFxuICAgIC5tZWRpYV9jYXJkIHtcXHJcXG4gICAgICAgIG1heC13aWR0aDogMTAwJTtcXHJcXG4gICAgfVxcclxcbn1cIixcIi8vLy8gTUFJTiBQQUdFIC8vLyBcXHJcXG4ucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyO1xcclxcbiAgICBnYXA6IDcwcHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDc1cHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDc1cHg7XFxyXFxufVxcclxcblxcclxcbi8vLy8vIEVORCBNQUlOIFBBR0UgLy8gXFxyXFxuXFxyXFxuLy8vLy8vLy8vLy8vLy8vLyBQSE9UT0dSQVBIRVIgUEFHRSAvLy8vLy8vIFxcclxcbi5tYXJnaW5fbGVmdF9yaWdodCB7XFxyXFxuICAgIG1hcmdpbjogMCAxMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZpbHRlcl9zZWN0aW9uIHtcXHJcXG4gICAgQGluY2x1ZGUgZmxleC1iYXNpYyhyb3csIG51bGwsIG51bGwsIG51bGwsIGJhc2VsaW5lKTtcXHJcXG4gICAgbWFyZ2luLWxlZnQ6IDA7XFxyXFxuXFxyXFxuICAgIGg1OmZpcnN0LWNoaWxkIHtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgICAgICBtYXJnaW4tcmlnaHQ6IDI4cHg7XFxyXFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfZ2xvYmFsO1xcclxcbiAgICAgICAgZm9udC13ZWlnaHQ6ICRmb250X3dlaWdodF9iaWc7XFxyXFxuICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XFxyXFxuICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnQtc2l6ZSAvIDIpO1xcclxcbiAgICAgICAgY29sb3I6ICRkZWZhdWx0X2ZvbnRfY29sb3I7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgLnNlbGVjdF9maWx0ZXIge1xcclxcbiAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4ubWVkaWFfc2VjdGlvbiB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmciAxZnI7XFxyXFxuICAgIHJvdy1nYXA6IDMwcHg7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDk1cHg7XFxyXFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxyXFxuICAgIG1hcmdpbi1ib3R0b206IDc1cHg7XFxyXFxufVxcclxcblxcclxcbi8vLy8vLy8vLy8vLy8vIEVORCBQSE9UT0dSQVBIRVIgUEFHRSAvLy8vLy8vL1xcclxcblxcclxcbi8vLy8vLy8vLy8vLy8vLy8gNDA0IFBBR0UgLy8vLy8vLyBcXHJcXG4uRVJST1JfNDA0IHtcXHJcXG4gICAgbWFyZ2luLXRvcDogNSU7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbiAgICBwYWRkaW5nOiA0MHB4O1xcclxcblxcclxcbiAgICBoMSB7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiA1JTtcXHJcXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgICAgIGZvbnQtc2l6ZTogJGZvbnRfc2l6ZSAqIDI7XFxyXFxuICAgICAgICBtYXJnaW4tYm90dG9tOiA0MHB4O1xcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIGEge1xcclxcbiAgICAgICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcclxcbiAgICAgICAgY29sb3I6IGluaGVyaXQ7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG4gICAgYTpob3ZlciB7XFxyXFxuICAgICAgICBjb2xvcjogaW5oZXJpdDtcXHJcXG4gICAgfVxcclxcbn1cXHJcXG5cXHJcXG4vLy8vLy8vLy8vLy8vLyBFTkQgNDA0IFBBR0UgLy8vLy8vLy9cIixcImZvb3RlciB7XFxyXFxuICAgIGhlaWdodDogMnB4O1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGRlZmF1bHRfY29sb3I7XFxyXFxuICAgIG1hcmdpbi10b3A6IDc1cHg7XFxyXFxufVwiLFwiQG1lZGlhIChtaW4td2lkdGg6IDIwMDBweCkge1xcclxcblxcclxcbiAgICAubWVkaWFfc2VjdGlvbiB7XFxyXFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnIgMWZyIDFmcjtcXHJcXG4gICAgfVxcclxcblxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgKG1heC13aWR0aDogMTEwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5waG90b2dyYXBoZXJfc2VjdGlvbixcXHJcXG4gICAgLm1lZGlhX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA4MDBweCkge1xcclxcblxcclxcbiAgICBoZWFkZXIge1xcclxcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgICAgIG1hcmdpbi10b3A6IDQwcHg7XFxyXFxuICAgICAgICBoZWlnaHQ6IDEwMHB4O1xcclxcblxcclxcbiAgICAgICAgLmxvZ29fcGhvdG9ncmFwaGVyIHtcXHJcXG4gICAgICAgICAgICBtYXJnaW4tbGVmdDogMDtcXHJcXG4gICAgICAgIH1cXHJcXG5cXHJcXG4gICAgICAgIC5sb2dvLFxcclxcbiAgICAgICAgaDEge1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gICAgICAgICAgICBmb250LXNpemU6IGNhbGMoJGZvbnRfc2l6ZSAvIDEuMjApO1xcclxcbiAgICAgICAgfVxcclxcbiAgICB9XFxyXFxuXFxyXFxuICAgIC5tYXJnaW5fbGVmdF9yaWdodCB7XFxyXFxuICAgICAgICBtYXJnaW46IDAgMjBweDtcXHJcXG4gICAgfVxcclxcblxcclxcblxcclxcbiAgICAuZmlsdGVyX3NlY3Rpb24ge1xcclxcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVxcclxcblxcclxcbkBtZWRpYSAobWF4LXdpZHRoOiA3MDBweCkge1xcclxcblxcclxcbiAgICAucGhvdG9ncmFwaGVyX3NlY3Rpb24ge1xcclxcbiAgICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XFxyXFxuICAgIH1cXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XFxyXFxuXFxyXFxuICAgIC5tZWRpYV9zZWN0aW9uIHtcXHJcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xcclxcbiAgICB9XFxyXFxuXFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMV0udXNlWzNdIS4vbWFpbi5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbM10hLi9tYWluLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9zY3JpcHRzL3BhZ2VzL3Bob3RvZ3JhcGhlci5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJpc0NhbGxhYmxlIiwicmVxdWlyZSIsInRyeVRvU3RyaW5nIiwiJFR5cGVFcnJvciIsIlR5cGVFcnJvciIsIm1vZHVsZSIsImV4cG9ydHMiLCJhcmd1bWVudCIsImlzT2JqZWN0IiwiJFN0cmluZyIsIlN0cmluZyIsInRvSW5kZXhlZE9iamVjdCIsInRvQWJzb2x1dGVJbmRleCIsImxlbmd0aE9mQXJyYXlMaWtlIiwiY3JlYXRlTWV0aG9kIiwiSVNfSU5DTFVERVMiLCIkdGhpcyIsImVsIiwiZnJvbUluZGV4IiwiTyIsImxlbmd0aCIsImluZGV4IiwidmFsdWUiLCJpbmNsdWRlcyIsImluZGV4T2YiLCJ1bmN1cnJ5VGhpcyIsInNsaWNlIiwidG9TdHJpbmciLCJzdHJpbmdTbGljZSIsIml0IiwiaGFzT3duIiwib3duS2V5cyIsImdldE93blByb3BlcnR5RGVzY3JpcHRvck1vZHVsZSIsImRlZmluZVByb3BlcnR5TW9kdWxlIiwidGFyZ2V0Iiwic291cmNlIiwiZXhjZXB0aW9ucyIsImtleXMiLCJkZWZpbmVQcm9wZXJ0eSIsImYiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJpIiwia2V5IiwiREVTQ1JJUFRPUlMiLCJjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IiLCJvYmplY3QiLCJiaXRtYXAiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJtYWtlQnVpbHRJbiIsIm5hbWUiLCJkZXNjcmlwdG9yIiwiZ2V0IiwiZ2V0dGVyIiwic2V0Iiwic2V0dGVyIiwiZGVmaW5lR2xvYmFsUHJvcGVydHkiLCJvcHRpb25zIiwic2ltcGxlIiwidW5kZWZpbmVkIiwiZ2xvYmFsIiwidW5zYWZlIiwiZXJyb3IiLCJub25Db25maWd1cmFibGUiLCJub25Xcml0YWJsZSIsIk9iamVjdCIsImZhaWxzIiwiZG9jdW1lbnQiLCJFWElTVFMiLCJjcmVhdGVFbGVtZW50IiwidXNlckFnZW50IiwidGVzdCIsImNsYXNzb2YiLCJwcm9jZXNzIiwiZ2V0QnVpbHRJbiIsIkRlbm8iLCJ2ZXJzaW9ucyIsInZlcnNpb24iLCJ2OCIsIm1hdGNoIiwic3BsaXQiLCJjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkiLCJkZWZpbmVCdWlsdEluIiwiY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyIsImlzRm9yY2VkIiwiVEFSR0VUIiwiR0xPQkFMIiwiU1RBVElDIiwic3RhdCIsIkZPUkNFRCIsInRhcmdldFByb3BlcnR5Iiwic291cmNlUHJvcGVydHkiLCJwcm90b3R5cGUiLCJkb250Q2FsbEdldFNldCIsImZvcmNlZCIsInNoYW0iLCJleGVjIiwiTkFUSVZFX0JJTkQiLCJGdW5jdGlvblByb3RvdHlwZSIsIkZ1bmN0aW9uIiwiYXBwbHkiLCJjYWxsIiwiUmVmbGVjdCIsImJpbmQiLCJhcmd1bWVudHMiLCJhQ2FsbGFibGUiLCJmbiIsInRoYXQiLCJoYXNPd25Qcm9wZXJ0eSIsImdldERlc2NyaXB0b3IiLCJQUk9QRVIiLCJzb21ldGhpbmciLCJDT05GSUdVUkFCTEUiLCJhRnVuY3Rpb24iLCJuYW1lc3BhY2UiLCJtZXRob2QiLCJpc051bGxPclVuZGVmaW5lZCIsIlYiLCJQIiwiZnVuYyIsImNoZWNrIiwiTWF0aCIsImdsb2JhbFRoaXMiLCJ3aW5kb3ciLCJzZWxmIiwidG9PYmplY3QiLCJhIiwiJE9iamVjdCIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwic3RvcmUiLCJmdW5jdGlvblRvU3RyaW5nIiwiaW5zcGVjdFNvdXJjZSIsIk5BVElWRV9XRUFLX01BUCIsInNoYXJlZCIsInNoYXJlZEtleSIsImhpZGRlbktleXMiLCJPQkpFQ1RfQUxSRUFEWV9JTklUSUFMSVpFRCIsIldlYWtNYXAiLCJoYXMiLCJlbmZvcmNlIiwiZ2V0dGVyRm9yIiwiVFlQRSIsInN0YXRlIiwidHlwZSIsIndtZ2V0Iiwid21oYXMiLCJ3bXNldCIsIm1ldGFkYXRhIiwiZmFjYWRlIiwiU1RBVEUiLCJyZXBsYWNlbWVudCIsImZlYXR1cmUiLCJkZXRlY3Rpb24iLCJkYXRhIiwibm9ybWFsaXplIiwiUE9MWUZJTEwiLCJOQVRJVkUiLCJzdHJpbmciLCJyZXBsYWNlIiwidG9Mb3dlckNhc2UiLCJkb2N1bWVudEFsbCIsImFsbCIsIlNQRUNJQUxfRE9DVU1FTlRfQUxMIiwiaXNQcm90b3R5cGVPZiIsIlVTRV9TWU1CT0xfQVNfVUlEIiwiJFN5bWJvbCIsInRvTGVuZ3RoIiwib2JqIiwiQ09ORklHVVJBQkxFX0ZVTkNUSU9OX05BTUUiLCJJbnRlcm5hbFN0YXRlTW9kdWxlIiwiZW5mb3JjZUludGVybmFsU3RhdGUiLCJnZXRJbnRlcm5hbFN0YXRlIiwiQ09ORklHVVJBQkxFX0xFTkdUSCIsIlRFTVBMQVRFIiwiYXJpdHkiLCJjb25zdHJ1Y3RvciIsImpvaW4iLCJjZWlsIiwiZmxvb3IiLCJ0cnVuYyIsIngiLCJuIiwiSUU4X0RPTV9ERUZJTkUiLCJWOF9QUk9UT1RZUEVfREVGSU5FX0JVRyIsImFuT2JqZWN0IiwidG9Qcm9wZXJ0eUtleSIsIiRkZWZpbmVQcm9wZXJ0eSIsIiRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJFTlVNRVJBQkxFIiwiV1JJVEFCTEUiLCJBdHRyaWJ1dGVzIiwiY3VycmVudCIsInByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlIiwiaW50ZXJuYWxPYmplY3RLZXlzIiwiZW51bUJ1Z0tleXMiLCJjb25jYXQiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwicHVzaCIsIm5hbWVzIiwicmVzdWx0IiwiJHByb3BlcnR5SXNFbnVtZXJhYmxlIiwiTkFTSE9STl9CVUciLCJpbnB1dCIsInByZWYiLCJ2YWwiLCJ2YWx1ZU9mIiwiZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSIsImdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSIsImhhc0luZGljZXMiLCJpZ25vcmVDYXNlIiwibXVsdGlsaW5lIiwiZG90QWxsIiwidW5pY29kZSIsInVuaWNvZGVTZXRzIiwic3RpY2t5IiwidWlkIiwiU0hBUkVEIiwiSVNfUFVSRSIsIm1vZGUiLCJjb3B5cmlnaHQiLCJsaWNlbnNlIiwiVjhfVkVSU0lPTiIsInN5bWJvbCIsIlN5bWJvbCIsImh0bWwiLCJhcnJheVNsaWNlIiwidmFsaWRhdGVBcmd1bWVudHNMZW5ndGgiLCJJU19JT1MiLCJJU19OT0RFIiwic2V0SW1tZWRpYXRlIiwiY2xlYXIiLCJjbGVhckltbWVkaWF0ZSIsIkRpc3BhdGNoIiwiTWVzc2FnZUNoYW5uZWwiLCJjb3VudGVyIiwicXVldWUiLCJPTlJFQURZU1RBVEVDSEFOR0UiLCJsb2NhdGlvbiIsImRlZmVyIiwiY2hhbm5lbCIsInBvcnQiLCJydW4iLCJpZCIsInJ1bm5lciIsImxpc3RlbmVyIiwiZXZlbnQiLCJwb3N0IiwicG9zdE1lc3NhZ2UiLCJwcm90b2NvbCIsImhvc3QiLCJoYW5kbGVyIiwiYXJncyIsIm5leHRUaWNrIiwibm93IiwicG9ydDIiLCJwb3J0MSIsIm9ubWVzc2FnZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbXBvcnRTY3JpcHRzIiwiYXBwZW5kQ2hpbGQiLCJyZW1vdmVDaGlsZCIsInNldFRpbWVvdXQiLCJ0b0ludGVnZXJPckluZmluaXR5IiwibWF4IiwibWluIiwiaW50ZWdlciIsIkluZGV4ZWRPYmplY3QiLCJyZXF1aXJlT2JqZWN0Q29lcmNpYmxlIiwibnVtYmVyIiwiaXNTeW1ib2wiLCJnZXRNZXRob2QiLCJvcmRpbmFyeVRvUHJpbWl0aXZlIiwid2VsbEtub3duU3ltYm9sIiwiVE9fUFJJTUlUSVZFIiwiZXhvdGljVG9QcmltIiwidG9QcmltaXRpdmUiLCJwb3N0Zml4IiwicmFuZG9tIiwiTkFUSVZFX1NZTUJPTCIsIml0ZXJhdG9yIiwicGFzc2VkIiwicmVxdWlyZWQiLCJXZWxsS25vd25TeW1ib2xzU3RvcmUiLCJzeW1ib2xGb3IiLCJjcmVhdGVXZWxsS25vd25TeW1ib2wiLCJ3aXRob3V0U2V0dGVyIiwiZGVzY3JpcHRpb24iLCJkZWZpbmVCdWlsdEluQWNjZXNzb3IiLCJyZWdFeHBGbGFncyIsIlJlZ0V4cCIsIlJlZ0V4cFByb3RvdHlwZSIsIklORElDRVNfU1VQUE9SVCIsImNhbGxzIiwiZXhwZWN0ZWQiLCJhZGRHZXR0ZXIiLCJjaHIiLCJwYWlycyIsIiQiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwibGlzdCIsIm1hcCIsIml0ZW0iLCJjb250ZW50IiwibmVlZExheWVyIiwibW9kdWxlcyIsIm1lZGlhIiwiZGVkdXBlIiwic3VwcG9ydHMiLCJsYXllciIsImFscmVhZHlJbXBvcnRlZE1vZHVsZXMiLCJrIiwiX2siLCJjc3NNYXBwaW5nIiwiYnRvYSIsImJhc2U2NCIsInVuZXNjYXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiSlNPTiIsInN0cmluZ2lmeSIsInNvdXJjZU1hcHBpbmciLCJzb3VyY2VVUkxzIiwic291cmNlcyIsInNvdXJjZVJvb3QiLCJwaG90b2dyYXBoZXJGYWN0b3J5IiwiZGlzcGxheURhdGEiLCJwaG90b2dyYXBoZXJzIiwicGhvdG9ncmFwaGVyU2VsZWN0ZWQiLCJmb3JFYWNoIiwicGhvdG9ncmFwaGVyIiwiZW52IiwiTk9ERV9FTlYiLCJjb25zb2xlIiwibG9nIiwicGhvdG9ncmFwaGVyTW9kZWwiLCJzZXRQaG90b2dyYXBoZXJIZWFkZXIiLCJzZXRTdGlja3lCYXJQcmljZSIsImRpc3BsYXlEYXRhQWxsIiwicXVlcnlTZWxlY3RvciIsInBob3RvZ3JhcGhlcnNTZWN0aW9uIiwidXNlckNhcmRET00iLCJnZXRVc2VyQ2FyZERPTSIsIm1lZGlhRmFjdG9yeSIsInNldElubmVySHRtbCIsImRpc3BsYXlNZWRpYSIsIm1lZGlhcyIsInBob3RvZ3JhcGhlcklkIiwidG90YWxMaWtlcyIsInNlbGVjdGVkTWVkaWEiLCJtZWRpYXNTZWN0aW9uIiwibWVkaWFNb2RlbCIsIm1lZGlhRE9NIiwiZ2V0TWVkaWFET00iLCJsaWtlcyIsIndhcm4iLCJkb20iLCJ0aXRsZSIsImltYWdlIiwidmlkZW8iLCJtb3ZpZSIsInBpY3R1cmUiLCJoYXNQaG90b2dyYXBoZXIiLCJoYXNDb250ZW50IiwiYXJ0aWNsZSIsInNldEF0dHJpYnV0ZSIsImxpbmtFbGVtZW50IiwiYnVpbGRFbGVtZW50Iiwic2V0QXJpYWxMYWJlbCIsImluc2VydFBpY3R1cmVJbnNpZGVFbGVtZW50IiwiaW5zZXJ0VmlkZW9JbnNpZGVFbGVtZW50IiwidGl0bGVfaDYiLCJsaWtlc19oNiIsImluc2VydEhUTUxBZnRlckVsZW1lbnQiLCJjaXR5IiwiY291bnRyeSIsInRhZ2xpbmUiLCJwb3J0cmFpdCIsInByaWNlIiwiaW1nUHJvZmlsZSIsImdldFBob3RvZ3JhcGhlcnMiLCJnZXRNZWRpYXMiLCJnZXRVcmxQYXJhbWV0ZXIiLCJzb3J0QnlMaWtlcyIsInNlbGVjdEZpbHRlckNvbXBvbmVudCIsIm1vZGFsTWFzdGVyIiwiaW5pdFByb2ZpbGUiLCJpZFVSTCIsImluaXRDb250YWN0Rm9ybSIsImhyZWYiLCJlIiwiY29udGFjdEZvcm1Nb2RhbCIsIm1vZGFsUGFnZSIsImFkZENvbnRhY3RGb3JtTGlzdGVuZXIiLCJ0aXRsZU1vZGFsIiwic2V0VGl0bGVNb2RhbCIsImluaXRMaWdodGJveCIsInNlbGVjdGVkTWVkaWFzIiwibGlnaHRCb3giLCJhZGRMaWdodGJveExpc3RlbmVyIiwiaW5pdE1lZGlhIiwic29ydEJ5Iiwic29ydCIsImluaXRNYWluIiwiZWxlbWVudCIsImFsdCIsImluc2VydEFkamFjZW50SFRNTCIsImFyaWFMYWJlbCIsImJhbGlzZSIsImF0dHJpYnV0ZSIsInRleHRDb250ZW50IiwiYXJpYWxhYmVsIiwidGV4dGUiLCJ0ZXh0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJmZXRjaEpTT04iLCJ1cmwiLCJyZXNwb25zZSIsImZldGNoIiwib2siLCJFcnJvciIsImpzb25SZXNwb25zZSIsImpzb24iLCJwYXJhbWV0ZXIiLCJmdWxsVXJsIiwiVVJMIiwicGFyYW1ldGVyVmFsdWUiLCJzZWFyY2hQYXJhbXMiLCJib2R5VGFnIiwiaGVhZGVyVGFnIiwibWFpblRhZyIsIm1vZGFsSUQiLCJiYWNrZ3JvdW5kUGFnZSIsImJvZHlIVE1MIiwiaGVhZGVySFRNTCIsIm1haW5IVE1MIiwibW9kYWxIVE1MIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2aXNpYmxlIiwib3Blbk1vZGFsIiwiY2xvc2VNb2RhbCIsInByZXZlbnREZWZhdWx0Iiwic2VuZE1lc3NhZ2UiLCJxdWVyeVNlbGVjdG9yUmVxdWVzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsaW5rIiwibG9hZExpZ2h0Ym94Q29udGVudCIsInByZXZpb3VzX2J1dHRvbiIsIm5leHRfYnV0dG9uIiwicGljdHVyZV9zZWxlY3RlZCIsInZpZGVvX3NlbGVjdGVkIiwicHJldmlvdXNJRCIsIm5leHRJRCIsImFjdHVhbElEIiwicmVtb3ZlIiwiYWRkS2V5Ym9hcmRMaXN0ZW5lciIsIm9ua2V5ZG93biIsInRhcmdldFNlbGVjdG9yIiwiZWZmZWN0QW5pbWF0aW9uIiwiaGlkZWNsYXNzIiwic2hvd2NsYXNzIiwiY2xhc3NMaXN0IiwiYWRkIiwic3R5bGUiLCJkaXNwbGF5IiwiZm9jdXMiLCJyZW1vdmVBdHRyaWJ1dGUiLCJhbGxJbnB1dHMiLCJhbGxUZXh0QXJlYSIsImZ1bGxtZXNzYWdlIiwidGV4dGFyZWEiLCJhbGVydCIsInNvcnRCeURhdGUiLCJzb3J0QnlUaXRsZSIsInNlbGVjdEZpbHRlckJ1dHRvbiIsInNlbGVjdEZpbHRlclNlbGVjdDEiLCJzZWxlY3RGaWx0ZXJTZWxlY3QyIiwiaGFuZGxlRmlsdGVyQWN0aW9uIiwic2VsZWN0ZWRJdGVtIiwiYiIsImRhdGUiXSwic291cmNlUm9vdCI6IiJ9