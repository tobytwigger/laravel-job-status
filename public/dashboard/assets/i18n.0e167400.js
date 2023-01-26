import { h, e as effectScope, r as ref, c as computed, w as watch, F as Fragment, i as isRef, g as getCurrentInstance, s as setupDevtoolsPlugin, a as inject, o as onMounted, b as onUnmounted, d as createVNode, T as Text, f as boot } from "./index.a2d3f53c.js";
/*!
  * shared v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const inBrowser = typeof window !== "undefined";
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const assign = Object.assign;
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function escapeHtml(rawText) {
  return rawText.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject = (val) => val !== null && typeof val === "object";
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function createEmitter() {
  const events = /* @__PURE__ */ new Map();
  const emitter = {
    events,
    on(event, handler) {
      const handlers = events.get(event);
      const added = handlers && handlers.push(handler);
      if (!added) {
        events.set(event, [handler]);
      }
    },
    off(event, handler) {
      const handlers = events.get(event);
      if (handlers) {
        handlers.splice(handlers.indexOf(handler) >>> 0, 1);
      }
    },
    emit(event, payload) {
      (events.get(event) || []).slice().map((handler) => handler(payload));
      (events.get("*") || []).slice().map((handler) => handler(event, payload));
    }
  };
  return emitter;
}
/*!
  * message-compiler v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const CompileErrorCodes = {
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14,
  __EXTEND_POINT__: 15
};
function createCompileError(code2, loc, options = {}) {
  const { domain, messages: messages2, args } = options;
  const msg = code2;
  const error = new SyntaxError(String(msg));
  error.code = code2;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
/*!
  * devtools-if v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const IntlifyDevToolsHooks = {
  I18nInit: "i18n:init",
  FunctionTranslate: "function:translate"
};
/*!
  * core-base v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const pathStateMachine = [];
pathStateMachine[0] = {
  ["w"]: [0],
  ["i"]: [3, 0],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[1] = {
  ["w"]: [1],
  ["."]: [2],
  ["["]: [4],
  ["o"]: [7]
};
pathStateMachine[2] = {
  ["w"]: [2],
  ["i"]: [3, 0],
  ["0"]: [3, 0]
};
pathStateMachine[3] = {
  ["i"]: [3, 0],
  ["0"]: [3, 0],
  ["w"]: [1, 1],
  ["."]: [2, 1],
  ["["]: [4, 1],
  ["o"]: [7, 1]
};
pathStateMachine[4] = {
  ["'"]: [5, 0],
  ['"']: [6, 0],
  ["["]: [
    4,
    2
  ],
  ["]"]: [1, 3],
  ["o"]: 8,
  ["l"]: [4, 0]
};
pathStateMachine[5] = {
  ["'"]: [4, 0],
  ["o"]: 8,
  ["l"]: [5, 0]
};
pathStateMachine[6] = {
  ['"']: [4, 0],
  ["o"]: 8,
  ["l"]: [6, 0]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code2 = ch.charCodeAt(0);
  switch (code2) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return ch;
    case 95:
    case 36:
    case 45:
      return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[0] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[1] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[2] = () => {
    actions[0]();
    subPathDepth++;
  };
  actions[3] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[0]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[1]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index++;
      newChar = "\\" + nextChar;
      actions[0]();
      return true;
    }
  }
  while (mode !== null) {
    index++;
    c = path[index];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap["l"] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const val = last[hit[i]];
    if (val === void 0) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : values.join("");
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages2) => {
    return messages2[pluralRule(pluralIndex, messages2.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || {};
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key) {
    const msg = isFunction(options.messages) ? options.messages(key) : isObject(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString(arg2)) {
        type2 = arg2 || type2;
      }
    }
    let msg = message(key)(ctx);
    if (type2 === "vnode" && isArray(msg) && modifier) {
      msg = msg[0];
    }
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    ["list"]: list,
    ["named"]: named,
    ["plural"]: plural,
    ["linked"]: linked,
    ["message"]: message,
    ["type"]: type,
    ["interpolate"]: interpolate,
    ["normalize"]: normalize
  };
  return ctx;
}
let devtools = null;
function setDevToolsHook(hook) {
  devtools = hook;
}
function initI18nDevTools(i18n2, version, meta) {
  devtools && devtools.emit(IntlifyDevToolsHooks.I18nInit, {
    timestamp: Date.now(),
    i18n: i18n2,
    version,
    meta
  });
}
const translateDevTools = /* @__PURE__ */ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
function createDevToolsHook(hook) {
  return (payloads) => devtools && devtools.emit(hook, payloads);
}
const CoreWarnCodes = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  __EXTEND_POINT__: 7
};
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray(fallback) ? fallback : isObject(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const VERSION$1 = "9.2.2";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
let _compiler;
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
let _additionalMeta = null;
const setAdditionalMeta = (meta) => {
  _additionalMeta = meta;
};
const getAdditionalMeta = () => _additionalMeta;
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const version = isString(options.version) ? options.version : VERSION$1;
  const locale = isString(options.locale) ? options.locale : DEFAULT_LOCALE;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : locale;
  const messages2 = isPlainObject(options.messages) ? options.messages : { [locale]: {} };
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [locale]: {} };
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : { [locale]: {} };
  const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || {};
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject(options.fallbackContext) ? options.fallbackContext : void 0;
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const internalOptions = options;
  const __datetimeFormatters = isObject(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version,
    cid: _cid,
    locale,
    fallbackLocale,
    messages: messages2,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  {
    initI18nDevTools(context, version, __meta);
  }
  return context;
}
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString(ret) ? ret : key;
  } else {
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
let code$1 = CompileErrorCodes.__EXTEND_POINT__;
const inc$1 = () => ++code$1;
const CoreErrorCodes = {
  INVALID_ARGUMENT: code$1,
  INVALID_DATE_ARGUMENT: inc$1(),
  INVALID_ISO_DATE_ARGUMENT: inc$1(),
  __EXTEND_POINT__: inc$1()
};
function createCoreError(code2) {
  return createCompileError(code2, null, void 0);
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages: messages2 } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : "";
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== "";
  const locale = isString(options.locale) ? options.locale : context.locale;
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages2[locale] || {}
  ];
  let format = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString(format) || isMessageFunction(format))) {
    if (enableDefaultMsg) {
      format = defaultMsgOrKey;
      cacheBaseKey = format;
    }
  }
  if (!resolvedMessage && (!(isString(format) || isMessageFunction(format)) || !isString(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let occurred = false;
  const errorDetector = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format) ? compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, errorDetector) : format;
  if (occurred) {
    return format;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  const ret = postTranslation ? postTranslation(messaged, key) : messaged;
  {
    const payloads = {
      timestamp: Date.now(),
      key: isString(key) ? key : isMessageFunction(format) ? format.key : "",
      locale: targetLocale || (isMessageFunction(format) ? format.locale : ""),
      format: isString(format) ? format : isMessageFunction(format) ? format.source : "",
      message: ret
    };
    payloads.meta = assign({}, context.__meta, getAdditionalMeta() || {});
    translateDevTools(payloads);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
  } else if (isObject(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages: messages2, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales = localeFallbacker(context, fallbackLocale, locale);
  let message = {};
  let targetLocale;
  let format = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    message = messages2[targetLocale] || {};
    if ((format = resolveValue2(message, key)) === null) {
      format = message[key];
    }
    if (isString(format) || isFunction(format))
      break;
    const missingRet = handleMissing(
      context,
      key,
      targetLocale,
      missingWarn,
      type
    );
    if (missingRet !== key) {
      format = missingRet;
    }
  }
  return [format, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, errorDetector) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format)) {
    const msg2 = format;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = () => format;
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  const msg = messageCompiler(format, getCompileOptions(context, targetLocale, cacheBaseKey, format, warnHtmlMessage, errorDetector));
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  const messaged = msg(msgCtx);
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = {};
  if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign(options, arg3);
  }
  return [key, options];
}
function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
  return {
    warnHtmlMessage,
    onError: (err) => {
      errorDetector && errorDetector(err);
      {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key) => {
    let val = resolveValue2(message, key);
    if (val == null && fallbackContext) {
      const [, , message2] = resolveMessageFormat(fallbackContext, key, locale, fallbackLocale, fallbackWarn, missingWarn);
      val = resolveValue2(message2, key);
    }
    if (isString(val)) {
      let occurred = false;
      const errorDetector = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, errorDetector);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString(options.locale) ? options.locale : context.locale;
  const locales = localeFallbacker(
    context,
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format = datetimeFormat[key];
    if (isPlainObject(format))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  let value;
  if (isString(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch (e) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format) {
  const context = ctx;
  for (const key in format) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = isString(options.locale) ? options.locale : context.locale;
  const locales = localeFallbacker(
    context,
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    numberFormat = numberFormats[targetLocale] || {};
    format = numberFormat[key];
    if (isPlainObject(format))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign({}, format, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = {};
  let overrides = {};
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format) {
  const context = ctx;
  for (const key in format) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
/*!
  * vue-devtools v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const VueDevToolsLabels = {
  ["vue-devtools-plugin-vue-i18n"]: "Vue I18n devtools",
  ["vue-i18n-resource-inspector"]: "I18n Resources",
  ["vue-i18n-timeline"]: "Vue I18n"
};
const VueDevToolsPlaceholders = {
  ["vue-i18n-resource-inspector"]: "Search for scopes ..."
};
const VueDevToolsTimelineColors = {
  ["vue-i18n-timeline"]: 16764185
};
/*!
  * vue-i18n v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
const VERSION = "9.2.2";
CoreWarnCodes.__EXTEND_POINT__;
let code = CompileErrorCodes.__EXTEND_POINT__;
const inc = () => ++code;
const I18nErrorCodes = {
  UNEXPECTED_RETURN_TYPE: code,
  INVALID_ARGUMENT: inc(),
  MUST_BE_CALL_SETUP_TOP: inc(),
  NOT_INSLALLED: inc(),
  NOT_AVAILABLE_IN_LEGACY_MODE: inc(),
  REQUIRED_VALUE: inc(),
  INVALID_VALUE: inc(),
  CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: inc(),
  NOT_INSLALLED_WITH_PROVIDE: inc(),
  UNEXPECTED_ERROR: inc(),
  NOT_COMPATIBLE_LEGACY_VUE_I18N: inc(),
  BRIDGE_SUPPORT_VUE_2_ONLY: inc(),
  MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: inc(),
  NOT_AVAILABLE_COMPOSITION_IN_LEGACY: inc(),
  __EXTEND_POINT__: inc()
};
function createI18nError(code2, ...args) {
  return createCompileError(code2, null, void 0);
}
const TransrateVNodeSymbol = /* @__PURE__ */ makeSymbol("__transrateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const EnableEmitter = /* @__PURE__ */ makeSymbol("__enableEmitter");
const DisableEmitter = /* @__PURE__ */ makeSymbol("__disableEmitter");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
makeSymbol("__intlifyMeta");
const InejctWithOption = /* @__PURE__ */ makeSymbol("__injectWithOption");
function handleFlatJson(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      for (let i = 0; i < lastIndex; i++) {
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = {};
        }
        currentObj = currentObj[subKeys[i]];
      }
      currentObj[subKeys[lastIndex]] = obj[key];
      delete obj[key];
      if (isObject(currentObj[subKeys[lastIndex]])) {
        handleFlatJson(currentObj[subKeys[lastIndex]]);
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages: messages2, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages2) ? messages2 : isArray(__i18n) ? {} : { [locale]: {} };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || {};
          deepCopy(resource, ret[locale2]);
        } else {
          deepCopy(resource, ret);
        }
      } else {
        isString(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
  for (const key in src) {
    if (hasOwn(src, key)) {
      if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
        des[key] = src[key];
      } else {
        deepCopy(src[key], des[key]);
      }
    }
  }
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(global2, options, componentOptions) {
  let messages2 = isObject(options.messages) ? options.messages : {};
  if ("__i18nGlobal" in componentOptions) {
    messages2 = getLocaleMessages(global2.locale.value, {
      messages: messages2,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages2);
  if (locales.length) {
    locales.forEach((locale) => {
      global2.mergeLocaleMessage(locale, messages2[locale]);
    });
  }
  {
    if (isObject(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          global2.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return (ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  };
}
const getMetaInfo = () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}, VueI18nLegacy) {
  const { __root } = options;
  const _isGlobal = __root === void 0;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = ref(
    __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = ref(
    __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages2 = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    {
      try {
        setAdditionalMeta(getMetaInfo());
        if (!_isGlobal) {
          _context.fallbackContext = __root ? getFallbackContext() : void 0;
        }
        ret = fn(_context);
      } finally {
        setAdditionalMeta(null);
        if (!_isGlobal) {
          _context.fallbackContext = void 0;
        }
      }
    }
    if (isNumber(ret) && ret === NOT_REOSLVED) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function normalize(values) {
    return values.map((val) => isString(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function transrateVNode(...args) {
    return wrapWithDeps(
      (context) => {
        let ret;
        const _context2 = context;
        try {
          _context2.processor = processor;
          ret = Reflect.apply(translate, null, [_context2, ...args]);
        } finally {
          _context2.processor = null;
        }
        return ret;
      },
      () => parseTranslateArgs(...args),
      "translate",
      (root) => root[TransrateVNodeSymbol](...args),
      (key) => [createTextNode(key)],
      (val) => isArray(val)
    );
  }
  function numberParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(number, null, [context, ...args]),
      () => parseNumberArgs(...args),
      "number format",
      (root) => root[NumberPartsSymbol](...args),
      () => [],
      (val) => isString(val) || isArray(val)
    );
  }
  function datetimeParts(...args) {
    return wrapWithDeps(
      (context) => Reflect.apply(datetime, null, [context, ...args]),
      () => parseDateTimeArgs(...args),
      "datetime format",
      (root) => root[DatetimePartsSymbol](...args),
      () => [],
      (val) => isString(val) || isArray(val)
    );
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    const targetLocale = isString(locale2) ? locale2 : _locale.value;
    const message = getLocaleMessage(targetLocale);
    return _context.messageResolver(message, key) !== null;
  }
  function resolveMessages(key) {
    let messages3 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages3 = messageValue;
        break;
      }
    }
    return messages3;
  }
  function tm(key) {
    const messages3 = resolveMessages(key);
    return messages3 != null ? messages3 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format) {
    _datetimeFormats.value[locale2] = format;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format);
  }
  function mergeDateTimeFormat(locale2, format) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format) {
    _numberFormats.value[locale2] = format;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format);
  }
  function mergeNumberFormat(locale2, format) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format);
  }
  composerID++;
  if (__root && inBrowser) {
    watch(__root.locale, (val) => {
      if (_inheritLocale) {
        _locale.value = val;
        _context.locale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
    watch(__root.fallbackLocale, (val) => {
      if (_inheritLocale) {
        _fallbackLocale.value = val;
        _context.fallbackLocale = val;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    });
  }
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages: messages2,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOption] = options.__injectWithOption;
    composer[TransrateVNodeSymbol] = transrateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return slot = [
        ...slot,
        ...isArray(current.children) ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, {});
  }
}
function getFragmentableTag(tag) {
  return Fragment;
}
const Translation = {
  name: "i18n-t",
  props: assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n2 = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key !== "_");
      const options = {};
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n2[TransrateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign({}, attrs);
      const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
};
function isVNode(target) {
  return isArray(target) && !isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = {};
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString(props.format)) {
      options.key = props.format;
    } else if (isObject(props.format)) {
      if (isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign({}, options2, { [prop]: props.format[prop] }) : options2;
      }, {});
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign({}, attrs);
    const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormat = {
  name: "i18n-n",
  props: assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n2 = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => i18n2[NumberPartsSymbol](...args));
  }
};
const DatetimeFormat = {
  name: "i18n-d",
  props: assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  setup(props, context) {
    const i18n2 = props.i18n || useI18n({ useScope: "parent", __useComponent: true });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => i18n2[DatetimePartsSymbol](...args));
  }
};
function getComposer$2(i18n2, instance) {
  const i18nInternal = i18n2;
  if (i18n2.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n2.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n2.global.__composer;
  }
}
function vTDirective(i18n2) {
  const _process = (binding) => {
    const { instance, modifiers, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$2(i18n2, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    if (inBrowser && i18n2.global === composer) {
      el.__i18nWatcher = watch(composer.locale, () => {
        binding.instance && binding.instance.$forceUpdate();
      });
    }
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (inBrowser && el.__i18nWatcher) {
      el.__i18nWatcher();
      el.__i18nWatcher = void 0;
      delete el.__i18nWatcher;
    }
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n2, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const useI18nComponentName = !!pluginOptions.useI18nComponentName;
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    app.component(!useI18nComponentName ? Translation.name : "i18n", Translation);
    app.component(NumberFormat.name, NumberFormat);
    app.component(DatetimeFormat.name, DatetimeFormat);
  }
  {
    app.directive("t", vTDirective(i18n2));
  }
}
const VUE_I18N_COMPONENT_TYPES = "vue-i18n: composer properties";
let devtoolsApi;
async function enableDevTools(app, i18n2) {
  return new Promise((resolve, reject) => {
    try {
      setupDevtoolsPlugin({
        id: "vue-devtools-plugin-vue-i18n",
        label: VueDevToolsLabels["vue-devtools-plugin-vue-i18n"],
        packageName: "vue-i18n",
        homepage: "https://vue-i18n.intlify.dev",
        logo: "https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png",
        componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
        app
      }, (api) => {
        devtoolsApi = api;
        api.on.visitComponentTree(({ componentInstance, treeNode }) => {
          updateComponentTreeTags(componentInstance, treeNode, i18n2);
        });
        api.on.inspectComponent(({ componentInstance, instanceData }) => {
          if (componentInstance.vnode.el && componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
            if (i18n2.mode === "legacy") {
              if (componentInstance.vnode.el.__VUE_I18N__ !== i18n2.global.__composer) {
                inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
              }
            } else {
              inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
            }
          }
        });
        api.addInspector({
          id: "vue-i18n-resource-inspector",
          label: VueDevToolsLabels["vue-i18n-resource-inspector"],
          icon: "language",
          treeFilterPlaceholder: VueDevToolsPlaceholders["vue-i18n-resource-inspector"]
        });
        api.on.getInspectorTree((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            registerScope(payload, i18n2);
          }
        });
        const roots = /* @__PURE__ */ new Map();
        api.on.getInspectorState(async (payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            api.unhighlightElement();
            inspectScope(payload, i18n2);
            if (payload.nodeId === "global") {
              if (!roots.has(payload.app)) {
                const [root] = await api.getComponentInstances(payload.app);
                roots.set(payload.app, root);
              }
              api.highlightElement(roots.get(payload.app));
            } else {
              const instance = getComponentInstance(payload.nodeId, i18n2);
              instance && api.highlightElement(instance);
            }
          }
        });
        api.on.editInspectorState((payload) => {
          if (payload.app === app && payload.inspectorId === "vue-i18n-resource-inspector") {
            editScope(payload, i18n2);
          }
        });
        api.addTimelineLayer({
          id: "vue-i18n-timeline",
          label: VueDevToolsLabels["vue-i18n-timeline"],
          color: VueDevToolsTimelineColors["vue-i18n-timeline"]
        });
        resolve(true);
      });
    } catch (e) {
      console.error(e);
      reject(false);
    }
  });
}
function getI18nScopeLable(instance) {
  return instance.type.name || instance.type.displayName || instance.type.__file || "Anonymous";
}
function updateComponentTreeTags(instance, treeNode, i18n2) {
  const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  if (instance && instance.vnode.el && instance.vnode.el.__VUE_I18N__) {
    if (instance.vnode.el.__VUE_I18N__ !== global2) {
      const tag = {
        label: `i18n (${getI18nScopeLable(instance)} Scope)`,
        textColor: 0,
        backgroundColor: 16764185
      };
      treeNode.tags.push(tag);
    }
  }
}
function inspectComposer(instanceData, composer) {
  const type = VUE_I18N_COMPONENT_TYPES;
  instanceData.state.push({
    type,
    key: "locale",
    editable: true,
    value: composer.locale.value
  });
  instanceData.state.push({
    type,
    key: "availableLocales",
    editable: false,
    value: composer.availableLocales
  });
  instanceData.state.push({
    type,
    key: "fallbackLocale",
    editable: true,
    value: composer.fallbackLocale.value
  });
  instanceData.state.push({
    type,
    key: "inheritLocale",
    editable: true,
    value: composer.inheritLocale
  });
  instanceData.state.push({
    type,
    key: "messages",
    editable: false,
    value: getLocaleMessageValue(composer.messages.value)
  });
  {
    instanceData.state.push({
      type,
      key: "datetimeFormats",
      editable: false,
      value: composer.datetimeFormats.value
    });
    instanceData.state.push({
      type,
      key: "numberFormats",
      editable: false,
      value: composer.numberFormats.value
    });
  }
}
function getLocaleMessageValue(messages2) {
  const value = {};
  Object.keys(messages2).forEach((key) => {
    const v = messages2[key];
    if (isFunction(v) && "source" in v) {
      value[key] = getMessageFunctionDetails(v);
    } else if (isObject(v)) {
      value[key] = getLocaleMessageValue(v);
    } else {
      value[key] = v;
    }
  });
  return value;
}
const ESC = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};
function escape(s) {
  return s.replace(/[<>"&]/g, escapeChar);
}
function escapeChar(a) {
  return ESC[a] || a;
}
function getMessageFunctionDetails(func) {
  const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
  return {
    _custom: {
      type: "function",
      display: `<span>\u0192</span> ${argString}`
    }
  };
}
function registerScope(payload, i18n2) {
  payload.rootNodes.push({
    id: "global",
    label: "Global Scope"
  });
  const global2 = i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  for (const [keyInstance, instance] of i18n2.__instances) {
    const composer = i18n2.mode === "composition" ? instance : instance.__composer;
    if (global2 === composer) {
      continue;
    }
    payload.rootNodes.push({
      id: composer.id.toString(),
      label: `${getI18nScopeLable(keyInstance)} Scope`
    });
  }
}
function getComponentInstance(nodeId, i18n2) {
  let instance = null;
  if (nodeId !== "global") {
    for (const [component, composer] of i18n2.__instances.entries()) {
      if (composer.id.toString() === nodeId) {
        instance = component;
        break;
      }
    }
  }
  return instance;
}
function getComposer$1(nodeId, i18n2) {
  if (nodeId === "global") {
    return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
  } else {
    const instance = Array.from(i18n2.__instances.values()).find((item) => item.id.toString() === nodeId);
    if (instance) {
      return i18n2.mode === "composition" ? instance : instance.__composer;
    } else {
      return null;
    }
  }
}
function inspectScope(payload, i18n2) {
  const composer = getComposer$1(payload.nodeId, i18n2);
  if (composer) {
    payload.state = makeScopeInspectState(composer);
  }
  return null;
}
function makeScopeInspectState(composer) {
  const state = {};
  const localeType = "Locale related info";
  const localeStates = [
    {
      type: localeType,
      key: "locale",
      editable: true,
      value: composer.locale.value
    },
    {
      type: localeType,
      key: "fallbackLocale",
      editable: true,
      value: composer.fallbackLocale.value
    },
    {
      type: localeType,
      key: "availableLocales",
      editable: false,
      value: composer.availableLocales
    },
    {
      type: localeType,
      key: "inheritLocale",
      editable: true,
      value: composer.inheritLocale
    }
  ];
  state[localeType] = localeStates;
  const localeMessagesType = "Locale messages info";
  const localeMessagesStates = [
    {
      type: localeMessagesType,
      key: "messages",
      editable: false,
      value: getLocaleMessageValue(composer.messages.value)
    }
  ];
  state[localeMessagesType] = localeMessagesStates;
  {
    const datetimeFormatsType = "Datetime formats info";
    const datetimeFormatsStates = [
      {
        type: datetimeFormatsType,
        key: "datetimeFormats",
        editable: false,
        value: composer.datetimeFormats.value
      }
    ];
    state[datetimeFormatsType] = datetimeFormatsStates;
    const numberFormatsType = "Datetime formats info";
    const numberFormatsStates = [
      {
        type: numberFormatsType,
        key: "numberFormats",
        editable: false,
        value: composer.numberFormats.value
      }
    ];
    state[numberFormatsType] = numberFormatsStates;
  }
  return state;
}
function addTimelineEvent(event, payload) {
  if (devtoolsApi) {
    let groupId;
    if (payload && "groupId" in payload) {
      groupId = payload.groupId;
      delete payload.groupId;
    }
    devtoolsApi.addTimelineEvent({
      layerId: "vue-i18n-timeline",
      event: {
        title: event,
        groupId,
        time: Date.now(),
        meta: {},
        data: payload || {},
        logType: event === "compile-error" ? "error" : event === "fallback" || event === "missing" ? "warning" : "default"
      }
    });
  }
}
function editScope(payload, i18n2) {
  const composer = getComposer$1(payload.nodeId, i18n2);
  if (composer) {
    const [field] = payload.path;
    if (field === "locale" && isString(payload.state.value)) {
      composer.locale.value = payload.state.value;
    } else if (field === "fallbackLocale" && (isString(payload.state.value) || isArray(payload.state.value) || isObject(payload.state.value))) {
      composer.fallbackLocale.value = payload.state.value;
    } else if (field === "inheritLocale" && isBoolean(payload.state.value)) {
      composer.inheritLocale = payload.state.value;
    }
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __allowComposition = true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  {
    const i18n2 = {
      get mode() {
        return "composition";
      },
      get allowComposition() {
        return __allowComposition;
      },
      async install(app, ...options2) {
        {
          app.__VUE_I18N__ = i18n2;
        }
        app.__VUE_I18N_SYMBOL__ = symbol;
        app.provide(app.__VUE_I18N_SYMBOL__, i18n2);
        if (__globalInjection) {
          injectGlobalFields(app, i18n2.global);
        }
        {
          apply(app, i18n2, ...options2);
        }
        const unmountApp = app.unmount;
        app.unmount = () => {
          i18n2.dispose();
          unmountApp();
        };
        {
          const ret = await enableDevTools(app, i18n2);
          if (!ret) {
            throw createI18nError(I18nErrorCodes.CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN);
          }
          const emitter = createEmitter();
          {
            const _composer = __global;
            _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
          }
          emitter.on("*", addTimelineEvent);
        }
      },
      get global() {
        return __global;
      },
      dispose() {
        globalScope.stop();
      },
      __instances,
      __getInstance,
      __setInstance,
      __deleteInstance
    };
    return i18n2;
  }
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSLALLED);
  }
  const i18n2 = getI18nInstance(instance);
  const global2 = getGlobalComposer(i18n2);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(global2, options, componentOptions);
    return global2;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n2, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = global2;
    }
    return composer2;
  }
  const i18nInternal = i18n2;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (global2) {
      composerOptions.__root = global2;
    }
    composer = createComposer(composerOptions);
    setupLifeCycle(i18nInternal, instance, composer);
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  {
    const obj = scope.run(() => createComposer(options));
    if (obj == null) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    return [scope, obj];
  }
}
function getI18nInstance(instance) {
  {
    const i18n2 = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
    if (!i18n2) {
      throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSLALLED_WITH_PROVIDE);
    }
    return i18n2;
  }
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n2) {
  return i18n2.mode === "composition" ? i18n2.global : i18n2.global.__composer;
}
function getComposer(i18n2, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = target.parent;
  while (current != null) {
    const i18nInternal = i18n2;
    if (i18n2.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function setupLifeCycle(i18n2, target, composer) {
  let emitter = null;
  {
    onMounted(() => {
      if (target.vnode.el) {
        target.vnode.el.__VUE_I18N__ = composer;
        emitter = createEmitter();
        const _composer = composer;
        _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
        emitter.on("*", addTimelineEvent);
      }
    }, target);
    onUnmounted(() => {
      if (target.vnode.el && target.vnode.el.__VUE_I18N__) {
        emitter && emitter.off("*", addTimelineEvent);
        const _composer = composer;
        _composer[DisableEmitter] && _composer[DisableEmitter]();
        delete target.vnode.el.__VUE_I18N__;
      }
      i18n2.__deleteInstance(target);
    }, target);
  }
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm"];
function injectGlobalFields(app, composer) {
  const i18n2 = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n2, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n2;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
}
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
{
  const target = getGlobalThis();
  target.__INTLIFY__ = true;
  setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
}
var enUS = {
  failed: "Action failed",
  success: "Action was successful"
};
var messages = {
  "en-US": enUS
};
var i18n = boot(({ app }) => {
  const i18n2 = createI18n({
    locale: "en-US",
    legacy: false,
    messages
  });
  app.use(i18n2);
});
export { i18n as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bi4wZTE2NzQwMC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9AaW50bGlmeS9zaGFyZWQvZGlzdC9zaGFyZWQuZXNtLWJ1bmRsZXIuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL0BpbnRsaWZ5L21lc3NhZ2UtY29tcGlsZXIvZGlzdC9tZXNzYWdlLWNvbXBpbGVyLmVzbS1idW5kbGVyLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9AaW50bGlmeS9kZXZ0b29scy1pZi9kaXN0L2RldnRvb2xzLWlmLmVzbS1idW5kbGVyLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9AaW50bGlmeS9jb3JlLWJhc2UvZGlzdC9jb3JlLWJhc2UuZXNtLWJ1bmRsZXIuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL0BpbnRsaWZ5L3Z1ZS1kZXZ0b29scy9kaXN0L3Z1ZS1kZXZ0b29scy5lc20tYnVuZGxlci5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvdnVlLWkxOG4vZGlzdC92dWUtaTE4bi5ydW50aW1lLmVzbS1idW5kbGVyLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9pMThuL2VuLVVTL2luZGV4LnRzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9pMThuL2luZGV4LnRzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9ib290L2kxOG4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gICogc2hhcmVkIHY5LjIuMlxuICAqIChjKSAyMDIyIGthenV5YSBrYXdhZ3VjaGlcbiAgKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gICovXG4vKipcclxuICogT3JpZ2luYWwgVXRpbGl0aWVzXHJcbiAqIHdyaXR0ZW4gYnkga2F6dXlhIGthd2FndWNoaVxyXG4gKi9cclxuY29uc3QgaW5Ccm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XHJcbmxldCBtYXJrO1xyXG5sZXQgbWVhc3VyZTtcclxuaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xyXG4gICAgY29uc3QgcGVyZiA9IGluQnJvd3NlciAmJiB3aW5kb3cucGVyZm9ybWFuY2U7XHJcbiAgICBpZiAocGVyZiAmJlxyXG4gICAgICAgIHBlcmYubWFyayAmJlxyXG4gICAgICAgIHBlcmYubWVhc3VyZSAmJlxyXG4gICAgICAgIHBlcmYuY2xlYXJNYXJrcyAmJlxyXG4gICAgICAgIHBlcmYuY2xlYXJNZWFzdXJlcykge1xyXG4gICAgICAgIG1hcmsgPSAodGFnKSA9PiBwZXJmLm1hcmsodGFnKTtcclxuICAgICAgICBtZWFzdXJlID0gKG5hbWUsIHN0YXJ0VGFnLCBlbmRUYWcpID0+IHtcclxuICAgICAgICAgICAgcGVyZi5tZWFzdXJlKG5hbWUsIHN0YXJ0VGFnLCBlbmRUYWcpO1xyXG4gICAgICAgICAgICBwZXJmLmNsZWFyTWFya3Moc3RhcnRUYWcpO1xyXG4gICAgICAgICAgICBwZXJmLmNsZWFyTWFya3MoZW5kVGFnKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbmNvbnN0IFJFX0FSR1MgPSAvXFx7KFswLTlhLXpBLVpdKylcXH0vZztcclxuLyogZXNsaW50LWRpc2FibGUgKi9cclxuZnVuY3Rpb24gZm9ybWF0KG1lc3NhZ2UsIC4uLmFyZ3MpIHtcclxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiBpc09iamVjdChhcmdzWzBdKSkge1xyXG4gICAgICAgIGFyZ3MgPSBhcmdzWzBdO1xyXG4gICAgfVxyXG4gICAgaWYgKCFhcmdzIHx8ICFhcmdzLmhhc093blByb3BlcnR5KSB7XHJcbiAgICAgICAgYXJncyA9IHt9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lc3NhZ2UucmVwbGFjZShSRV9BUkdTLCAobWF0Y2gsIGlkZW50aWZpZXIpID0+IHtcclxuICAgICAgICByZXR1cm4gYXJncy5oYXNPd25Qcm9wZXJ0eShpZGVudGlmaWVyKSA/IGFyZ3NbaWRlbnRpZmllcl0gOiAnJztcclxuICAgIH0pO1xyXG59XHJcbmNvbnN0IGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gJ3N5bWJvbCc7XHJcbmNvbnN0IG1ha2VTeW1ib2wgPSAobmFtZSkgPT4gaGFzU3ltYm9sID8gU3ltYm9sKG5hbWUpIDogbmFtZTtcclxuY29uc3QgZ2VuZXJhdGVGb3JtYXRDYWNoZUtleSA9IChsb2NhbGUsIGtleSwgc291cmNlKSA9PiBmcmllbmRseUpTT05zdHJpbmdpZnkoeyBsOiBsb2NhbGUsIGs6IGtleSwgczogc291cmNlIH0pO1xyXG5jb25zdCBmcmllbmRseUpTT05zdHJpbmdpZnkgPSAoanNvbikgPT4gSlNPTi5zdHJpbmdpZnkoanNvbilcclxuICAgIC5yZXBsYWNlKC9cXHUyMDI4L2csICdcXFxcdTIwMjgnKVxyXG4gICAgLnJlcGxhY2UoL1xcdTIwMjkvZywgJ1xcXFx1MjAyOScpXHJcbiAgICAucmVwbGFjZSgvXFx1MDAyNy9nLCAnXFxcXHUwMDI3Jyk7XHJcbmNvbnN0IGlzTnVtYmVyID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodmFsKTtcclxuY29uc3QgaXNEYXRlID0gKHZhbCkgPT4gdG9UeXBlU3RyaW5nKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcclxuY29uc3QgaXNSZWdFeHAgPSAodmFsKSA9PiB0b1R5cGVTdHJpbmcodmFsKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XHJcbmNvbnN0IGlzRW1wdHlPYmplY3QgPSAodmFsKSA9PiBpc1BsYWluT2JqZWN0KHZhbCkgJiYgT2JqZWN0LmtleXModmFsKS5sZW5ndGggPT09IDA7XHJcbmZ1bmN0aW9uIHdhcm4obXNnLCBlcnIpIHtcclxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYFtpbnRsaWZ5XSBgICsgbXNnKTtcclxuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihlcnIuc3RhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5jb25zdCBhc3NpZ24gPSBPYmplY3QuYXNzaWduO1xyXG5sZXQgX2dsb2JhbFRoaXM7XHJcbmNvbnN0IGdldEdsb2JhbFRoaXMgPSAoKSA9PiB7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIHJldHVybiAoX2dsb2JhbFRoaXMgfHxcclxuICAgICAgICAoX2dsb2JhbFRoaXMgPVxyXG4gICAgICAgICAgICB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICAgICAgID8gZ2xvYmFsVGhpc1xyXG4gICAgICAgICAgICAgICAgOiB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICAgICAgICAgICA/IHNlbGZcclxuICAgICAgICAgICAgICAgICAgICA6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gd2luZG93XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZ2xvYmFsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHt9KSk7XHJcbn07XHJcbmZ1bmN0aW9uIGVzY2FwZUh0bWwocmF3VGV4dCkge1xyXG4gICAgcmV0dXJuIHJhd1RleHRcclxuICAgICAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXHJcbiAgICAgICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxyXG4gICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7JylcclxuICAgICAgICAucmVwbGFjZSgvJy9nLCAnJmFwb3M7Jyk7XHJcbn1cclxuY29uc3QgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG5mdW5jdGlvbiBoYXNPd24ob2JqLCBrZXkpIHtcclxuICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcclxufVxyXG4vKiBlc2xpbnQtZW5hYmxlICovXHJcbi8qKlxyXG4gKiBVc2VmdWwgVXRpbGl0aWVzIEJ5IEV2YW4geW91XHJcbiAqIE1vZGlmaWVkIGJ5IGthenV5YSBrYXdhZ3VjaGlcclxuICogTUlUIExpY2Vuc2VcclxuICogaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3Z1ZS1uZXh0L2Jsb2IvbWFzdGVyL3BhY2thZ2VzL3NoYXJlZC9zcmMvaW5kZXgudHNcclxuICogaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3Z1ZS1uZXh0L2Jsb2IvbWFzdGVyL3BhY2thZ2VzL3NoYXJlZC9zcmMvY29kZWZyYW1lLnRzXHJcbiAqL1xyXG5jb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcclxuY29uc3QgaXNGdW5jdGlvbiA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbic7XHJcbmNvbnN0IGlzU3RyaW5nID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XHJcbmNvbnN0IGlzQm9vbGVhbiA9ICh2YWwpID0+IHR5cGVvZiB2YWwgPT09ICdib29sZWFuJztcclxuY29uc3QgaXNTeW1ib2wgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSAnc3ltYm9sJztcclxuY29uc3QgaXNPYmplY3QgPSAodmFsKSA9PiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XHJcbmNvbnN0IGlzUHJvbWlzZSA9ICh2YWwpID0+IHtcclxuICAgIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnRoZW4pICYmIGlzRnVuY3Rpb24odmFsLmNhdGNoKTtcclxufTtcclxuY29uc3Qgb2JqZWN0VG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xyXG5jb25zdCB0b1R5cGVTdHJpbmcgPSAodmFsdWUpID0+IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xyXG5jb25zdCBpc1BsYWluT2JqZWN0ID0gKHZhbCkgPT4gdG9UeXBlU3RyaW5nKHZhbCkgPT09ICdbb2JqZWN0IE9iamVjdF0nO1xyXG4vLyBmb3IgY29udmVydGluZyBsaXN0IGFuZCBuYW1lZCB2YWx1ZXMgdG8gZGlzcGxheWVkIHN0cmluZ3MuXHJcbmNvbnN0IHRvRGlzcGxheVN0cmluZyA9ICh2YWwpID0+IHtcclxuICAgIHJldHVybiB2YWwgPT0gbnVsbFxyXG4gICAgICAgID8gJydcclxuICAgICAgICA6IGlzQXJyYXkodmFsKSB8fCAoaXNQbGFpbk9iamVjdCh2YWwpICYmIHZhbC50b1N0cmluZyA9PT0gb2JqZWN0VG9TdHJpbmcpXHJcbiAgICAgICAgICAgID8gSlNPTi5zdHJpbmdpZnkodmFsLCBudWxsLCAyKVxyXG4gICAgICAgICAgICA6IFN0cmluZyh2YWwpO1xyXG59O1xyXG5jb25zdCBSQU5HRSA9IDI7XHJcbmZ1bmN0aW9uIGdlbmVyYXRlQ29kZUZyYW1lKHNvdXJjZSwgc3RhcnQgPSAwLCBlbmQgPSBzb3VyY2UubGVuZ3RoKSB7XHJcbiAgICBjb25zdCBsaW5lcyA9IHNvdXJjZS5zcGxpdCgvXFxyP1xcbi8pO1xyXG4gICAgbGV0IGNvdW50ID0gMDtcclxuICAgIGNvbnN0IHJlcyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGNvdW50ICs9IGxpbmVzW2ldLmxlbmd0aCArIDE7XHJcbiAgICAgICAgaWYgKGNvdW50ID49IHN0YXJ0KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSBpIC0gUkFOR0U7IGogPD0gaSArIFJBTkdFIHx8IGVuZCA+IGNvdW50OyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChqIDwgMCB8fCBqID49IGxpbmVzLmxlbmd0aClcclxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBqICsgMTtcclxuICAgICAgICAgICAgICAgIHJlcy5wdXNoKGAke2xpbmV9JHsnICcucmVwZWF0KDMgLSBTdHJpbmcobGluZSkubGVuZ3RoKX18ICAke2xpbmVzW2pdfWApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGluZUxlbmd0aCA9IGxpbmVzW2pdLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGlmIChqID09PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcHVzaCB1bmRlcmxpbmVcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWQgPSBzdGFydCAtIChjb3VudCAtIGxpbmVMZW5ndGgpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsZW5ndGggPSBNYXRoLm1heCgxLCBlbmQgPiBjb3VudCA/IGxpbmVMZW5ndGggLSBwYWQgOiBlbmQgLSBzdGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goYCAgIHwgIGAgKyAnICcucmVwZWF0KHBhZCkgKyAnXicucmVwZWF0KGxlbmd0aCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaiA+IGkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW5kID4gY291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVuZ3RoID0gTWF0aC5tYXgoTWF0aC5taW4oZW5kIC0gY291bnQsIGxpbmVMZW5ndGgpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goYCAgIHwgIGAgKyAnXicucmVwZWF0KGxlbmd0aCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb3VudCArPSBsaW5lTGVuZ3RoICsgMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzLmpvaW4oJ1xcbicpO1xyXG59XG5cbi8qKlxyXG4gKiBFdmVudCBlbWl0dGVyLCBmb3JrZWQgZnJvbSB0aGUgYmVsb3c6XHJcbiAqIC0gb3JpZ2luYWwgcmVwb3NpdG9yeSB1cmw6IGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZlbG9waXQvbWl0dFxyXG4gKiAtIGNvZGUgdXJsOiBodHRwczovL2dpdGh1Yi5jb20vZGV2ZWxvcGl0L21pdHQvYmxvYi9tYXN0ZXIvc3JjL2luZGV4LnRzXHJcbiAqIC0gYXV0aG9yOiBKYXNvbiBNaWxsZXIgKGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZlbG9waXQpXHJcbiAqIC0gbGljZW5zZTogTUlUXHJcbiAqL1xyXG4vKipcclxuICogQ3JlYXRlIGEgZXZlbnQgZW1pdHRlclxyXG4gKlxyXG4gKiBAcmV0dXJucyBBbiBldmVudCBlbWl0dGVyXHJcbiAqL1xyXG5mdW5jdGlvbiBjcmVhdGVFbWl0dGVyKCkge1xyXG4gICAgY29uc3QgZXZlbnRzID0gbmV3IE1hcCgpO1xyXG4gICAgY29uc3QgZW1pdHRlciA9IHtcclxuICAgICAgICBldmVudHMsXHJcbiAgICAgICAgb24oZXZlbnQsIGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlcnMgPSBldmVudHMuZ2V0KGV2ZW50KTtcclxuICAgICAgICAgICAgY29uc3QgYWRkZWQgPSBoYW5kbGVycyAmJiBoYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xyXG4gICAgICAgICAgICBpZiAoIWFkZGVkKSB7XHJcbiAgICAgICAgICAgICAgICBldmVudHMuc2V0KGV2ZW50LCBbaGFuZGxlcl0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvZmYoZXZlbnQsIGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgY29uc3QgaGFuZGxlcnMgPSBldmVudHMuZ2V0KGV2ZW50KTtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVycy5zcGxpY2UoaGFuZGxlcnMuaW5kZXhPZihoYW5kbGVyKSA+Pj4gMCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVtaXQoZXZlbnQsIHBheWxvYWQpIHtcclxuICAgICAgICAgICAgKGV2ZW50cy5nZXQoZXZlbnQpIHx8IFtdKVxyXG4gICAgICAgICAgICAgICAgLnNsaWNlKClcclxuICAgICAgICAgICAgICAgIC5tYXAoaGFuZGxlciA9PiBoYW5kbGVyKHBheWxvYWQpKTtcclxuICAgICAgICAgICAgKGV2ZW50cy5nZXQoJyonKSB8fCBbXSlcclxuICAgICAgICAgICAgICAgIC5zbGljZSgpXHJcbiAgICAgICAgICAgICAgICAubWFwKGhhbmRsZXIgPT4gaGFuZGxlcihldmVudCwgcGF5bG9hZCkpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZXR1cm4gZW1pdHRlcjtcclxufVxuXG5leHBvcnQgeyBhc3NpZ24sIGNyZWF0ZUVtaXR0ZXIsIGVzY2FwZUh0bWwsIGZvcm1hdCwgZnJpZW5kbHlKU09Oc3RyaW5naWZ5LCBnZW5lcmF0ZUNvZGVGcmFtZSwgZ2VuZXJhdGVGb3JtYXRDYWNoZUtleSwgZ2V0R2xvYmFsVGhpcywgaGFzT3duLCBpbkJyb3dzZXIsIGlzQXJyYXksIGlzQm9vbGVhbiwgaXNEYXRlLCBpc0VtcHR5T2JqZWN0LCBpc0Z1bmN0aW9uLCBpc051bWJlciwgaXNPYmplY3QsIGlzUGxhaW5PYmplY3QsIGlzUHJvbWlzZSwgaXNSZWdFeHAsIGlzU3RyaW5nLCBpc1N5bWJvbCwgbWFrZVN5bWJvbCwgbWFyaywgbWVhc3VyZSwgb2JqZWN0VG9TdHJpbmcsIHRvRGlzcGxheVN0cmluZywgdG9UeXBlU3RyaW5nLCB3YXJuIH07XG4iLCIvKiFcbiAgKiBtZXNzYWdlLWNvbXBpbGVyIHY5LjIuMlxuICAqIChjKSAyMDIyIGthenV5YSBrYXdhZ3VjaGlcbiAgKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gICovXG5pbXBvcnQgeyBmb3JtYXQsIGFzc2lnbiwgaXNTdHJpbmcgfSBmcm9tICdAaW50bGlmeS9zaGFyZWQnO1xuXG5jb25zdCBDb21waWxlRXJyb3JDb2RlcyA9IHtcclxuICAgIC8vIHRva2VuaXplciBlcnJvciBjb2Rlc1xyXG4gICAgRVhQRUNURURfVE9LRU46IDEsXHJcbiAgICBJTlZBTElEX1RPS0VOX0lOX1BMQUNFSE9MREVSOiAyLFxyXG4gICAgVU5URVJNSU5BVEVEX1NJTkdMRV9RVU9URV9JTl9QTEFDRUhPTERFUjogMyxcclxuICAgIFVOS05PV05fRVNDQVBFX1NFUVVFTkNFOiA0LFxyXG4gICAgSU5WQUxJRF9VTklDT0RFX0VTQ0FQRV9TRVFVRU5DRTogNSxcclxuICAgIFVOQkFMQU5DRURfQ0xPU0lOR19CUkFDRTogNixcclxuICAgIFVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFOiA3LFxyXG4gICAgRU1QVFlfUExBQ0VIT0xERVI6IDgsXHJcbiAgICBOT1RfQUxMT1dfTkVTVF9QTEFDRUhPTERFUjogOSxcclxuICAgIElOVkFMSURfTElOS0VEX0ZPUk1BVDogMTAsXHJcbiAgICAvLyBwYXJzZXIgZXJyb3IgY29kZXNcclxuICAgIE1VU1RfSEFWRV9NRVNTQUdFU19JTl9QTFVSQUw6IDExLFxyXG4gICAgVU5FWFBFQ1RFRF9FTVBUWV9MSU5LRURfTU9ESUZJRVI6IDEyLFxyXG4gICAgVU5FWFBFQ1RFRF9FTVBUWV9MSU5LRURfS0VZOiAxMyxcclxuICAgIFVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUzogMTQsXHJcbiAgICAvLyBTcGVjaWFsIHZhbHVlIGZvciBoaWdoZXItb3JkZXIgY29tcGlsZXJzIHRvIHBpY2sgdXAgdGhlIGxhc3QgY29kZVxyXG4gICAgLy8gdG8gYXZvaWQgY29sbGlzaW9uIG9mIGVycm9yIGNvZGVzLiBUaGlzIHNob3VsZCBhbHdheXMgYmUga2VwdCBhcyB0aGUgbGFzdFxyXG4gICAgLy8gaXRlbS5cclxuICAgIF9fRVhURU5EX1BPSU5UX186IDE1XHJcbn07XHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuY29uc3QgZXJyb3JNZXNzYWdlcyA9IHtcclxuICAgIC8vIHRva2VuaXplciBlcnJvciBtZXNzYWdlc1xyXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLkVYUEVDVEVEX1RPS0VOXTogYEV4cGVjdGVkIHRva2VuOiAnezB9J2AsXHJcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuSU5WQUxJRF9UT0tFTl9JTl9QTEFDRUhPTERFUl06IGBJbnZhbGlkIHRva2VuIGluIHBsYWNlaG9sZGVyOiAnezB9J2AsXHJcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuVU5URVJNSU5BVEVEX1NJTkdMRV9RVU9URV9JTl9QTEFDRUhPTERFUl06IGBVbnRlcm1pbmF0ZWQgc2luZ2xlIHF1b3RlIGluIHBsYWNlaG9sZGVyYCxcclxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5VTktOT1dOX0VTQ0FQRV9TRVFVRU5DRV06IGBVbmtub3duIGVzY2FwZSBzZXF1ZW5jZTogXFxcXHswfWAsXHJcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuSU5WQUxJRF9VTklDT0RFX0VTQ0FQRV9TRVFVRU5DRV06IGBJbnZhbGlkIHVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlOiB7MH1gLFxyXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVOQkFMQU5DRURfQ0xPU0lOR19CUkFDRV06IGBVbmJhbGFuY2VkIGNsb3NpbmcgYnJhY2VgLFxyXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFXTogYFVudGVybWluYXRlZCBjbG9zaW5nIGJyYWNlYCxcclxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5FTVBUWV9QTEFDRUhPTERFUl06IGBFbXB0eSBwbGFjZWhvbGRlcmAsXHJcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuTk9UX0FMTE9XX05FU1RfUExBQ0VIT0xERVJdOiBgTm90IGFsbG93ZWQgbmVzdCBwbGFjZWhvbGRlcmAsXHJcbiAgICBbQ29tcGlsZUVycm9yQ29kZXMuSU5WQUxJRF9MSU5LRURfRk9STUFUXTogYEludmFsaWQgbGlua2VkIGZvcm1hdGAsXHJcbiAgICAvLyBwYXJzZXIgZXJyb3IgbWVzc2FnZXNcclxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5NVVNUX0hBVkVfTUVTU0FHRVNfSU5fUExVUkFMXTogYFBsdXJhbCBtdXN0IGhhdmUgbWVzc2FnZXNgLFxyXG4gICAgW0NvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfRU1QVFlfTElOS0VEX01PRElGSUVSXTogYFVuZXhwZWN0ZWQgZW1wdHkgbGlua2VkIG1vZGlmaWVyYCxcclxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VNUFRZX0xJTktFRF9LRVldOiBgVW5leHBlY3RlZCBlbXB0eSBsaW5rZWQga2V5YCxcclxuICAgIFtDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVNdOiBgVW5leHBlY3RlZCBsZXhpY2FsIGFuYWx5c2lzIGluIHRva2VuOiAnezB9J2BcclxufTtcclxuZnVuY3Rpb24gY3JlYXRlQ29tcGlsZUVycm9yKGNvZGUsIGxvYywgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICBjb25zdCB7IGRvbWFpbiwgbWVzc2FnZXMsIGFyZ3MgfSA9IG9wdGlvbnM7XHJcbiAgICBjb25zdCBtc2cgPSAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJylcclxuICAgICAgICA/IGZvcm1hdCgobWVzc2FnZXMgfHwgZXJyb3JNZXNzYWdlcylbY29kZV0gfHwgJycsIC4uLihhcmdzIHx8IFtdKSlcclxuICAgICAgICA6IGNvZGU7XHJcbiAgICBjb25zdCBlcnJvciA9IG5ldyBTeW50YXhFcnJvcihTdHJpbmcobXNnKSk7XHJcbiAgICBlcnJvci5jb2RlID0gY29kZTtcclxuICAgIGlmIChsb2MpIHtcclxuICAgICAgICBlcnJvci5sb2NhdGlvbiA9IGxvYztcclxuICAgIH1cclxuICAgIGVycm9yLmRvbWFpbiA9IGRvbWFpbjtcclxuICAgIHJldHVybiBlcnJvcjtcclxufVxyXG4vKiogQGludGVybmFsICovXHJcbmZ1bmN0aW9uIGRlZmF1bHRPbkVycm9yKGVycm9yKSB7XHJcbiAgICB0aHJvdyBlcnJvcjtcclxufVxuXG5jb25zdCBMb2NhdGlvblN0dWIgPSB7XHJcbiAgICBzdGFydDogeyBsaW5lOiAxLCBjb2x1bW46IDEsIG9mZnNldDogMCB9LFxyXG4gICAgZW5kOiB7IGxpbmU6IDEsIGNvbHVtbjogMSwgb2Zmc2V0OiAwIH1cclxufTtcclxuZnVuY3Rpb24gY3JlYXRlUG9zaXRpb24obGluZSwgY29sdW1uLCBvZmZzZXQpIHtcclxuICAgIHJldHVybiB7IGxpbmUsIGNvbHVtbiwgb2Zmc2V0IH07XHJcbn1cclxuZnVuY3Rpb24gY3JlYXRlTG9jYXRpb24oc3RhcnQsIGVuZCwgc291cmNlKSB7XHJcbiAgICBjb25zdCBsb2MgPSB7IHN0YXJ0LCBlbmQgfTtcclxuICAgIGlmIChzb3VyY2UgIT0gbnVsbCkge1xyXG4gICAgICAgIGxvYy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbG9jO1xyXG59XG5cbmNvbnN0IENIQVJfU1AgPSAnICc7XHJcbmNvbnN0IENIQVJfQ1IgPSAnXFxyJztcclxuY29uc3QgQ0hBUl9MRiA9ICdcXG4nO1xyXG5jb25zdCBDSEFSX0xTID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweDIwMjgpO1xyXG5jb25zdCBDSEFSX1BTID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweDIwMjkpO1xyXG5mdW5jdGlvbiBjcmVhdGVTY2FubmVyKHN0cikge1xyXG4gICAgY29uc3QgX2J1ZiA9IHN0cjtcclxuICAgIGxldCBfaW5kZXggPSAwO1xyXG4gICAgbGV0IF9saW5lID0gMTtcclxuICAgIGxldCBfY29sdW1uID0gMTtcclxuICAgIGxldCBfcGVla09mZnNldCA9IDA7XHJcbiAgICBjb25zdCBpc0NSTEYgPSAoaW5kZXgpID0+IF9idWZbaW5kZXhdID09PSBDSEFSX0NSICYmIF9idWZbaW5kZXggKyAxXSA9PT0gQ0hBUl9MRjtcclxuICAgIGNvbnN0IGlzTEYgPSAoaW5kZXgpID0+IF9idWZbaW5kZXhdID09PSBDSEFSX0xGO1xyXG4gICAgY29uc3QgaXNQUyA9IChpbmRleCkgPT4gX2J1ZltpbmRleF0gPT09IENIQVJfUFM7XHJcbiAgICBjb25zdCBpc0xTID0gKGluZGV4KSA9PiBfYnVmW2luZGV4XSA9PT0gQ0hBUl9MUztcclxuICAgIGNvbnN0IGlzTGluZUVuZCA9IChpbmRleCkgPT4gaXNDUkxGKGluZGV4KSB8fCBpc0xGKGluZGV4KSB8fCBpc1BTKGluZGV4KSB8fCBpc0xTKGluZGV4KTtcclxuICAgIGNvbnN0IGluZGV4ID0gKCkgPT4gX2luZGV4O1xyXG4gICAgY29uc3QgbGluZSA9ICgpID0+IF9saW5lO1xyXG4gICAgY29uc3QgY29sdW1uID0gKCkgPT4gX2NvbHVtbjtcclxuICAgIGNvbnN0IHBlZWtPZmZzZXQgPSAoKSA9PiBfcGVla09mZnNldDtcclxuICAgIGNvbnN0IGNoYXJBdCA9IChvZmZzZXQpID0+IGlzQ1JMRihvZmZzZXQpIHx8IGlzUFMob2Zmc2V0KSB8fCBpc0xTKG9mZnNldCkgPyBDSEFSX0xGIDogX2J1ZltvZmZzZXRdO1xyXG4gICAgY29uc3QgY3VycmVudENoYXIgPSAoKSA9PiBjaGFyQXQoX2luZGV4KTtcclxuICAgIGNvbnN0IGN1cnJlbnRQZWVrID0gKCkgPT4gY2hhckF0KF9pbmRleCArIF9wZWVrT2Zmc2V0KTtcclxuICAgIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICAgICAgX3BlZWtPZmZzZXQgPSAwO1xyXG4gICAgICAgIGlmIChpc0xpbmVFbmQoX2luZGV4KSkge1xyXG4gICAgICAgICAgICBfbGluZSsrO1xyXG4gICAgICAgICAgICBfY29sdW1uID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzQ1JMRihfaW5kZXgpKSB7XHJcbiAgICAgICAgICAgIF9pbmRleCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfaW5kZXgrKztcclxuICAgICAgICBfY29sdW1uKys7XHJcbiAgICAgICAgcmV0dXJuIF9idWZbX2luZGV4XTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBlZWsoKSB7XHJcbiAgICAgICAgaWYgKGlzQ1JMRihfaW5kZXggKyBfcGVla09mZnNldCkpIHtcclxuICAgICAgICAgICAgX3BlZWtPZmZzZXQrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgX3BlZWtPZmZzZXQrKztcclxuICAgICAgICByZXR1cm4gX2J1ZltfaW5kZXggKyBfcGVla09mZnNldF07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZXNldCgpIHtcclxuICAgICAgICBfaW5kZXggPSAwO1xyXG4gICAgICAgIF9saW5lID0gMTtcclxuICAgICAgICBfY29sdW1uID0gMTtcclxuICAgICAgICBfcGVla09mZnNldCA9IDA7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZXNldFBlZWsob2Zmc2V0ID0gMCkge1xyXG4gICAgICAgIF9wZWVrT2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2tpcFRvUGVlaygpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBfaW5kZXggKyBfcGVla09mZnNldDtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5tb2RpZmllZC1sb29wLWNvbmRpdGlvblxyXG4gICAgICAgIHdoaWxlICh0YXJnZXQgIT09IF9pbmRleCkge1xyXG4gICAgICAgICAgICBuZXh0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9wZWVrT2Zmc2V0ID0gMDtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgaW5kZXgsXHJcbiAgICAgICAgbGluZSxcclxuICAgICAgICBjb2x1bW4sXHJcbiAgICAgICAgcGVla09mZnNldCxcclxuICAgICAgICBjaGFyQXQsXHJcbiAgICAgICAgY3VycmVudENoYXIsXHJcbiAgICAgICAgY3VycmVudFBlZWssXHJcbiAgICAgICAgbmV4dCxcclxuICAgICAgICBwZWVrLFxyXG4gICAgICAgIHJlc2V0LFxyXG4gICAgICAgIHJlc2V0UGVlayxcclxuICAgICAgICBza2lwVG9QZWVrXHJcbiAgICB9O1xyXG59XG5cbmNvbnN0IEVPRiA9IHVuZGVmaW5lZDtcclxuY29uc3QgTElURVJBTF9ERUxJTUlURVIgPSBcIidcIjtcclxuY29uc3QgRVJST1JfRE9NQUlOJDEgPSAndG9rZW5pemVyJztcclxuZnVuY3Rpb24gY3JlYXRlVG9rZW5pemVyKHNvdXJjZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICBjb25zdCBsb2NhdGlvbiA9IG9wdGlvbnMubG9jYXRpb24gIT09IGZhbHNlO1xyXG4gICAgY29uc3QgX3NjbnIgPSBjcmVhdGVTY2FubmVyKHNvdXJjZSk7XHJcbiAgICBjb25zdCBjdXJyZW50T2Zmc2V0ID0gKCkgPT4gX3NjbnIuaW5kZXgoKTtcclxuICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9ICgpID0+IGNyZWF0ZVBvc2l0aW9uKF9zY25yLmxpbmUoKSwgX3NjbnIuY29sdW1uKCksIF9zY25yLmluZGV4KCkpO1xyXG4gICAgY29uc3QgX2luaXRMb2MgPSBjdXJyZW50UG9zaXRpb24oKTtcclxuICAgIGNvbnN0IF9pbml0T2Zmc2V0ID0gY3VycmVudE9mZnNldCgpO1xyXG4gICAgY29uc3QgX2NvbnRleHQgPSB7XHJcbiAgICAgICAgY3VycmVudFR5cGU6IDE0IC8qIEVPRiAqLyxcclxuICAgICAgICBvZmZzZXQ6IF9pbml0T2Zmc2V0LFxyXG4gICAgICAgIHN0YXJ0TG9jOiBfaW5pdExvYyxcclxuICAgICAgICBlbmRMb2M6IF9pbml0TG9jLFxyXG4gICAgICAgIGxhc3RUeXBlOiAxNCAvKiBFT0YgKi8sXHJcbiAgICAgICAgbGFzdE9mZnNldDogX2luaXRPZmZzZXQsXHJcbiAgICAgICAgbGFzdFN0YXJ0TG9jOiBfaW5pdExvYyxcclxuICAgICAgICBsYXN0RW5kTG9jOiBfaW5pdExvYyxcclxuICAgICAgICBicmFjZU5lc3Q6IDAsXHJcbiAgICAgICAgaW5MaW5rZWQ6IGZhbHNlLFxyXG4gICAgICAgIHRleHQ6ICcnXHJcbiAgICB9O1xyXG4gICAgY29uc3QgY29udGV4dCA9ICgpID0+IF9jb250ZXh0O1xyXG4gICAgY29uc3QgeyBvbkVycm9yIH0gPSBvcHRpb25zO1xyXG4gICAgZnVuY3Rpb24gZW1pdEVycm9yKGNvZGUsIHBvcywgb2Zmc2V0LCAuLi5hcmdzKSB7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gY29udGV4dCgpO1xyXG4gICAgICAgIHBvcy5jb2x1bW4gKz0gb2Zmc2V0O1xyXG4gICAgICAgIHBvcy5vZmZzZXQgKz0gb2Zmc2V0O1xyXG4gICAgICAgIGlmIChvbkVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvYyA9IGNyZWF0ZUxvY2F0aW9uKGN0eC5zdGFydExvYywgcG9zKTtcclxuICAgICAgICAgICAgY29uc3QgZXJyID0gY3JlYXRlQ29tcGlsZUVycm9yKGNvZGUsIGxvYywge1xyXG4gICAgICAgICAgICAgICAgZG9tYWluOiBFUlJPUl9ET01BSU4kMSxcclxuICAgICAgICAgICAgICAgIGFyZ3NcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIG9uRXJyb3IoZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRUb2tlbihjb250ZXh0LCB0eXBlLCB2YWx1ZSkge1xyXG4gICAgICAgIGNvbnRleHQuZW5kTG9jID0gY3VycmVudFBvc2l0aW9uKCk7XHJcbiAgICAgICAgY29udGV4dC5jdXJyZW50VHlwZSA9IHR5cGU7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSB7IHR5cGUgfTtcclxuICAgICAgICBpZiAobG9jYXRpb24pIHtcclxuICAgICAgICAgICAgdG9rZW4ubG9jID0gY3JlYXRlTG9jYXRpb24oY29udGV4dC5zdGFydExvYywgY29udGV4dC5lbmRMb2MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0b2tlbi52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9XHJcbiAgICBjb25zdCBnZXRFbmRUb2tlbiA9IChjb250ZXh0KSA9PiBnZXRUb2tlbihjb250ZXh0LCAxNCAvKiBFT0YgKi8pO1xyXG4gICAgZnVuY3Rpb24gZWF0KHNjbnIsIGNoKSB7XHJcbiAgICAgICAgaWYgKHNjbnIuY3VycmVudENoYXIoKSA9PT0gY2gpIHtcclxuICAgICAgICAgICAgc2Nuci5uZXh0KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5FWFBFQ1RFRF9UT0tFTiwgY3VycmVudFBvc2l0aW9uKCksIDAsIGNoKTtcclxuICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBlZWtTcGFjZXMoc2Nucikge1xyXG4gICAgICAgIGxldCBidWYgPSAnJztcclxuICAgICAgICB3aGlsZSAoc2Nuci5jdXJyZW50UGVlaygpID09PSBDSEFSX1NQIHx8IHNjbnIuY3VycmVudFBlZWsoKSA9PT0gQ0hBUl9MRikge1xyXG4gICAgICAgICAgICBidWYgKz0gc2Nuci5jdXJyZW50UGVlaygpO1xyXG4gICAgICAgICAgICBzY25yLnBlZWsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJ1ZjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNraXBTcGFjZXMoc2Nucikge1xyXG4gICAgICAgIGNvbnN0IGJ1ZiA9IHBlZWtTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgc2Nuci5za2lwVG9QZWVrKCk7XHJcbiAgICAgICAgcmV0dXJuIGJ1ZjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzSWRlbnRpZmllclN0YXJ0KGNoKSB7XHJcbiAgICAgICAgaWYgKGNoID09PSBFT0YpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjYyA9IGNoLmNoYXJDb2RlQXQoMCk7XHJcbiAgICAgICAgcmV0dXJuICgoY2MgPj0gOTcgJiYgY2MgPD0gMTIyKSB8fCAvLyBhLXpcclxuICAgICAgICAgICAgKGNjID49IDY1ICYmIGNjIDw9IDkwKSB8fCAvLyBBLVpcclxuICAgICAgICAgICAgY2MgPT09IDk1IC8vIF9cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNOdW1iZXJTdGFydChjaCkge1xyXG4gICAgICAgIGlmIChjaCA9PT0gRU9GKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY2MgPSBjaC5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgIHJldHVybiBjYyA+PSA0OCAmJiBjYyA8PSA1NzsgLy8gMC05XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc05hbWVkSWRlbnRpZmllclN0YXJ0KHNjbnIsIGNvbnRleHQpIHtcclxuICAgICAgICBjb25zdCB7IGN1cnJlbnRUeXBlIH0gPSBjb250ZXh0O1xyXG4gICAgICAgIGlmIChjdXJyZW50VHlwZSAhPT0gMiAvKiBCcmFjZUxlZnQgKi8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwZWVrU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGlzSWRlbnRpZmllclN0YXJ0KHNjbnIuY3VycmVudFBlZWsoKSk7XHJcbiAgICAgICAgc2Nuci5yZXNldFBlZWsoKTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNMaXN0SWRlbnRpZmllclN0YXJ0KHNjbnIsIGNvbnRleHQpIHtcclxuICAgICAgICBjb25zdCB7IGN1cnJlbnRUeXBlIH0gPSBjb250ZXh0O1xyXG4gICAgICAgIGlmIChjdXJyZW50VHlwZSAhPT0gMiAvKiBCcmFjZUxlZnQgKi8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwZWVrU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50UGVlaygpID09PSAnLScgPyBzY25yLnBlZWsoKSA6IHNjbnIuY3VycmVudFBlZWsoKTtcclxuICAgICAgICBjb25zdCByZXQgPSBpc051bWJlclN0YXJ0KGNoKTtcclxuICAgICAgICBzY25yLnJlc2V0UGVlaygpO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc0xpdGVyYWxTdGFydChzY25yLCBjb250ZXh0KSB7XHJcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcclxuICAgICAgICBpZiAoY3VycmVudFR5cGUgIT09IDIgLyogQnJhY2VMZWZ0ICovKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGVla1NwYWNlcyhzY25yKTtcclxuICAgICAgICBjb25zdCByZXQgPSBzY25yLmN1cnJlbnRQZWVrKCkgPT09IExJVEVSQUxfREVMSU1JVEVSO1xyXG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzTGlua2VkRG90U3RhcnQoc2NuciwgY29udGV4dCkge1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUeXBlICE9PSA4IC8qIExpbmtlZEFsaWFzICovKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGVla1NwYWNlcyhzY25yKTtcclxuICAgICAgICBjb25zdCByZXQgPSBzY25yLmN1cnJlbnRQZWVrKCkgPT09IFwiLlwiIC8qIExpbmtlZERvdCAqLztcclxuICAgICAgICBzY25yLnJlc2V0UGVlaygpO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc0xpbmtlZE1vZGlmaWVyU3RhcnQoc2NuciwgY29udGV4dCkge1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRUeXBlICE9PSA5IC8qIExpbmtlZERvdCAqLykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBlZWtTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gaXNJZGVudGlmaWVyU3RhcnQoc2Nuci5jdXJyZW50UGVlaygpKTtcclxuICAgICAgICBzY25yLnJlc2V0UGVlaygpO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc0xpbmtlZERlbGltaXRlclN0YXJ0KHNjbnIsIGNvbnRleHQpIHtcclxuICAgICAgICBjb25zdCB7IGN1cnJlbnRUeXBlIH0gPSBjb250ZXh0O1xyXG4gICAgICAgIGlmICghKGN1cnJlbnRUeXBlID09PSA4IC8qIExpbmtlZEFsaWFzICovIHx8XHJcbiAgICAgICAgICAgIGN1cnJlbnRUeXBlID09PSAxMiAvKiBMaW5rZWRNb2RpZmllciAqLykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwZWVrU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHNjbnIuY3VycmVudFBlZWsoKSA9PT0gXCI6XCIgLyogTGlua2VkRGVsaW1pdGVyICovO1xyXG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzTGlua2VkUmVmZXJTdGFydChzY25yLCBjb250ZXh0KSB7XHJcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSB9ID0gY29udGV4dDtcclxuICAgICAgICBpZiAoY3VycmVudFR5cGUgIT09IDEwIC8qIExpbmtlZERlbGltaXRlciAqLykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGZuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjaCA9IHNjbnIuY3VycmVudFBlZWsoKTtcclxuICAgICAgICAgICAgaWYgKGNoID09PSBcIntcIiAvKiBCcmFjZUxlZnQgKi8pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpc0lkZW50aWZpZXJTdGFydChzY25yLnBlZWsoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoY2ggPT09IFwiQFwiIC8qIExpbmtlZEFsaWFzICovIHx8XHJcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCIlXCIgLyogTW9kdWxvICovIHx8XHJcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCJ8XCIgLyogUGlwZSAqLyB8fFxyXG4gICAgICAgICAgICAgICAgY2ggPT09IFwiOlwiIC8qIExpbmtlZERlbGltaXRlciAqLyB8fFxyXG4gICAgICAgICAgICAgICAgY2ggPT09IFwiLlwiIC8qIExpbmtlZERvdCAqLyB8fFxyXG4gICAgICAgICAgICAgICAgY2ggPT09IENIQVJfU1AgfHxcclxuICAgICAgICAgICAgICAgICFjaCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBDSEFSX0xGKSB7XHJcbiAgICAgICAgICAgICAgICBzY25yLnBlZWsoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gb3RoZXIgY2hhcmFjdGVyc1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzSWRlbnRpZmllclN0YXJ0KGNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZm4oKTtcclxuICAgICAgICBzY25yLnJlc2V0UGVlaygpO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc1BsdXJhbFN0YXJ0KHNjbnIpIHtcclxuICAgICAgICBwZWVrU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHNjbnIuY3VycmVudFBlZWsoKSA9PT0gXCJ8XCIgLyogUGlwZSAqLztcclxuICAgICAgICBzY25yLnJlc2V0UGVlaygpO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkZXRlY3RNb2R1bG9TdGFydChzY25yKSB7XHJcbiAgICAgICAgY29uc3Qgc3BhY2VzID0gcGVla1NwYWNlcyhzY25yKTtcclxuICAgICAgICBjb25zdCByZXQgPSBzY25yLmN1cnJlbnRQZWVrKCkgPT09IFwiJVwiIC8qIE1vZHVsbyAqLyAmJlxyXG4gICAgICAgICAgICBzY25yLnBlZWsoKSA9PT0gXCJ7XCIgLyogQnJhY2VMZWZ0ICovO1xyXG4gICAgICAgIHNjbnIucmVzZXRQZWVrKCk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaXNNb2R1bG86IHJldCxcclxuICAgICAgICAgICAgaGFzU3BhY2U6IHNwYWNlcy5sZW5ndGggPiAwXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGlzVGV4dFN0YXJ0KHNjbnIsIHJlc2V0ID0gdHJ1ZSkge1xyXG4gICAgICAgIGNvbnN0IGZuID0gKGhhc1NwYWNlID0gZmFsc2UsIHByZXYgPSAnJywgZGV0ZWN0TW9kdWxvID0gZmFsc2UpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRQZWVrKCk7XHJcbiAgICAgICAgICAgIGlmIChjaCA9PT0gXCJ7XCIgLyogQnJhY2VMZWZ0ICovKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldiA9PT0gXCIlXCIgLyogTW9kdWxvICovID8gZmFsc2UgOiBoYXNTcGFjZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gXCJAXCIgLyogTGlua2VkQWxpYXMgKi8gfHwgIWNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldiA9PT0gXCIlXCIgLyogTW9kdWxvICovID8gdHJ1ZSA6IGhhc1NwYWNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBcIiVcIiAvKiBNb2R1bG8gKi8pIHtcclxuICAgICAgICAgICAgICAgIHNjbnIucGVlaygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKGhhc1NwYWNlLCBcIiVcIiAvKiBNb2R1bG8gKi8sIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBcInxcIiAvKiBQaXBlICovKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJldiA9PT0gXCIlXCIgLyogTW9kdWxvICovIHx8IGRldGVjdE1vZHVsb1xyXG4gICAgICAgICAgICAgICAgICAgID8gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIDogIShwcmV2ID09PSBDSEFSX1NQIHx8IHByZXYgPT09IENIQVJfTEYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBDSEFSX1NQKSB7XHJcbiAgICAgICAgICAgICAgICBzY25yLnBlZWsoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmbih0cnVlLCBDSEFSX1NQLCBkZXRlY3RNb2R1bG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBDSEFSX0xGKSB7XHJcbiAgICAgICAgICAgICAgICBzY25yLnBlZWsoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmbih0cnVlLCBDSEFSX0xGLCBkZXRlY3RNb2R1bG8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGZuKCk7XHJcbiAgICAgICAgcmVzZXQgJiYgc2Nuci5yZXNldFBlZWsoKTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdGFrZUNoYXIoc2NuciwgZm4pIHtcclxuICAgICAgICBjb25zdCBjaCA9IHNjbnIuY3VycmVudENoYXIoKTtcclxuICAgICAgICBpZiAoY2ggPT09IEVPRikge1xyXG4gICAgICAgICAgICByZXR1cm4gRU9GO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZm4oY2gpKSB7XHJcbiAgICAgICAgICAgIHNjbnIubmV4dCgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdGFrZUlkZW50aWZpZXJDaGFyKHNjbnIpIHtcclxuICAgICAgICBjb25zdCBjbG9zdXJlID0gKGNoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNjID0gY2guY2hhckNvZGVBdCgwKTtcclxuICAgICAgICAgICAgcmV0dXJuICgoY2MgPj0gOTcgJiYgY2MgPD0gMTIyKSB8fCAvLyBhLXpcclxuICAgICAgICAgICAgICAgIChjYyA+PSA2NSAmJiBjYyA8PSA5MCkgfHwgLy8gQS1aXHJcbiAgICAgICAgICAgICAgICAoY2MgPj0gNDggJiYgY2MgPD0gNTcpIHx8IC8vIDAtOVxyXG4gICAgICAgICAgICAgICAgY2MgPT09IDk1IHx8IC8vIF9cclxuICAgICAgICAgICAgICAgIGNjID09PSAzNiAvLyAkXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGFrZUNoYXIoc2NuciwgY2xvc3VyZSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0YWtlRGlnaXQoc2Nucikge1xyXG4gICAgICAgIGNvbnN0IGNsb3N1cmUgPSAoY2gpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2MgPSBjaC5jaGFyQ29kZUF0KDApO1xyXG4gICAgICAgICAgICByZXR1cm4gY2MgPj0gNDggJiYgY2MgPD0gNTc7IC8vIDAtOVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHRha2VDaGFyKHNjbnIsIGNsb3N1cmUpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdGFrZUhleERpZ2l0KHNjbnIpIHtcclxuICAgICAgICBjb25zdCBjbG9zdXJlID0gKGNoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNjID0gY2guY2hhckNvZGVBdCgwKTtcclxuICAgICAgICAgICAgcmV0dXJuICgoY2MgPj0gNDggJiYgY2MgPD0gNTcpIHx8IC8vIDAtOVxyXG4gICAgICAgICAgICAgICAgKGNjID49IDY1ICYmIGNjIDw9IDcwKSB8fCAvLyBBLUZcclxuICAgICAgICAgICAgICAgIChjYyA+PSA5NyAmJiBjYyA8PSAxMDIpKTsgLy8gYS1mXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGFrZUNoYXIoc2NuciwgY2xvc3VyZSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXREaWdpdHMoc2Nucikge1xyXG4gICAgICAgIGxldCBjaCA9ICcnO1xyXG4gICAgICAgIGxldCBudW0gPSAnJztcclxuICAgICAgICB3aGlsZSAoKGNoID0gdGFrZURpZ2l0KHNjbnIpKSkge1xyXG4gICAgICAgICAgICBudW0gKz0gY2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZWFkTW9kdWxvKHNjbnIpIHtcclxuICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50Q2hhcigpO1xyXG4gICAgICAgIGlmIChjaCAhPT0gXCIlXCIgLyogTW9kdWxvICovKSB7XHJcbiAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5FWFBFQ1RFRF9UT0tFTiwgY3VycmVudFBvc2l0aW9uKCksIDAsIGNoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2Nuci5uZXh0KCk7XHJcbiAgICAgICAgcmV0dXJuIFwiJVwiIC8qIE1vZHVsbyAqLztcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlYWRUZXh0KHNjbnIpIHtcclxuICAgICAgICBsZXQgYnVmID0gJyc7XHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XHJcbiAgICAgICAgICAgIGlmIChjaCA9PT0gXCJ7XCIgLyogQnJhY2VMZWZ0ICovIHx8XHJcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCJ9XCIgLyogQnJhY2VSaWdodCAqLyB8fFxyXG4gICAgICAgICAgICAgICAgY2ggPT09IFwiQFwiIC8qIExpbmtlZEFsaWFzICovIHx8XHJcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCJ8XCIgLyogUGlwZSAqLyB8fFxyXG4gICAgICAgICAgICAgICAgIWNoKSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gXCIlXCIgLyogTW9kdWxvICovKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNUZXh0U3RhcnQoc2NucikpIHtcclxuICAgICAgICAgICAgICAgICAgICBidWYgKz0gY2g7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjaCA9PT0gQ0hBUl9TUCB8fCBjaCA9PT0gQ0hBUl9MRikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzVGV4dFN0YXJ0KHNjbnIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmICs9IGNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNQbHVyYWxTdGFydChzY25yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnVmICs9IGNoO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnVmICs9IGNoO1xyXG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJ1ZjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlYWROYW1lZElkZW50aWZpZXIoc2Nucikge1xyXG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgbGV0IGNoID0gJyc7XHJcbiAgICAgICAgbGV0IG5hbWUgPSAnJztcclxuICAgICAgICB3aGlsZSAoKGNoID0gdGFrZUlkZW50aWZpZXJDaGFyKHNjbnIpKSkge1xyXG4gICAgICAgICAgICBuYW1lICs9IGNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2Nuci5jdXJyZW50Q2hhcigpID09PSBFT0YpIHtcclxuICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVhZExpc3RJZGVudGlmaWVyKHNjbnIpIHtcclxuICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgIGxldCB2YWx1ZSA9ICcnO1xyXG4gICAgICAgIGlmIChzY25yLmN1cnJlbnRDaGFyKCkgPT09ICctJykge1xyXG4gICAgICAgICAgICBzY25yLm5leHQoKTtcclxuICAgICAgICAgICAgdmFsdWUgKz0gYC0ke2dldERpZ2l0cyhzY25yKX1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFsdWUgKz0gZ2V0RGlnaXRzKHNjbnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2Nuci5jdXJyZW50Q2hhcigpID09PSBFT0YpIHtcclxuICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9DTE9TSU5HX0JSQUNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlYWRMaXRlcmFsKHNjbnIpIHtcclxuICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgIGVhdChzY25yLCBgXFwnYCk7XHJcbiAgICAgICAgbGV0IGNoID0gJyc7XHJcbiAgICAgICAgbGV0IGxpdGVyYWwgPSAnJztcclxuICAgICAgICBjb25zdCBmbiA9ICh4KSA9PiB4ICE9PSBMSVRFUkFMX0RFTElNSVRFUiAmJiB4ICE9PSBDSEFSX0xGO1xyXG4gICAgICAgIHdoaWxlICgoY2ggPSB0YWtlQ2hhcihzY25yLCBmbikpKSB7XHJcbiAgICAgICAgICAgIGlmIChjaCA9PT0gJ1xcXFwnKSB7XHJcbiAgICAgICAgICAgICAgICBsaXRlcmFsICs9IHJlYWRFc2NhcGVTZXF1ZW5jZShzY25yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxpdGVyYWwgKz0gY2g7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHNjbnIuY3VycmVudENoYXIoKTtcclxuICAgICAgICBpZiAoY3VycmVudCA9PT0gQ0hBUl9MRiB8fCBjdXJyZW50ID09PSBFT0YpIHtcclxuICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOVEVSTUlOQVRFRF9TSU5HTEVfUVVPVEVfSU5fUExBQ0VIT0xERVIsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcclxuICAgICAgICAgICAgLy8gVE9ETzogSXMgaXQgY29ycmVjdCByZWFsbHk/XHJcbiAgICAgICAgICAgIGlmIChjdXJyZW50ID09PSBDSEFSX0xGKSB7XHJcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIGVhdChzY25yLCBgXFwnYCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxpdGVyYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVhdChzY25yLCBgXFwnYCk7XHJcbiAgICAgICAgcmV0dXJuIGxpdGVyYWw7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiByZWFkRXNjYXBlU2VxdWVuY2Uoc2Nucikge1xyXG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50Q2hhcigpO1xyXG4gICAgICAgIHN3aXRjaCAoY2gpIHtcclxuICAgICAgICAgICAgY2FzZSAnXFxcXCc6XHJcbiAgICAgICAgICAgIGNhc2UgYFxcJ2A6XHJcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgXFxcXCR7Y2h9YDtcclxuICAgICAgICAgICAgY2FzZSAndSc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFVuaWNvZGVFc2NhcGVTZXF1ZW5jZShzY25yLCBjaCwgNCk7XHJcbiAgICAgICAgICAgIGNhc2UgJ1UnOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRVbmljb2RlRXNjYXBlU2VxdWVuY2Uoc2NuciwgY2gsIDYpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOS05PV05fRVNDQVBFX1NFUVVFTkNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCwgY2gpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlYWRVbmljb2RlRXNjYXBlU2VxdWVuY2Uoc2NuciwgdW5pY29kZSwgZGlnaXRzKSB7XHJcbiAgICAgICAgZWF0KHNjbnIsIHVuaWNvZGUpO1xyXG4gICAgICAgIGxldCBzZXF1ZW5jZSA9ICcnO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlnaXRzOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgY2ggPSB0YWtlSGV4RGlnaXQoc2Nucik7XHJcbiAgICAgICAgICAgIGlmICghY2gpIHtcclxuICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5JTlZBTElEX1VOSUNPREVfRVNDQVBFX1NFUVVFTkNFLCBjdXJyZW50UG9zaXRpb24oKSwgMCwgYFxcXFwke3VuaWNvZGV9JHtzZXF1ZW5jZX0ke3NjbnIuY3VycmVudENoYXIoKX1gKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlcXVlbmNlICs9IGNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYFxcXFwke3VuaWNvZGV9JHtzZXF1ZW5jZX1gO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVhZEludmFsaWRJZGVudGlmaWVyKHNjbnIpIHtcclxuICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgIGxldCBjaCA9ICcnO1xyXG4gICAgICAgIGxldCBpZGVudGlmaWVycyA9ICcnO1xyXG4gICAgICAgIGNvbnN0IGNsb3N1cmUgPSAoY2gpID0+IGNoICE9PSBcIntcIiAvKiBCcmFjZUxlZnQgKi8gJiZcclxuICAgICAgICAgICAgY2ggIT09IFwifVwiIC8qIEJyYWNlUmlnaHQgKi8gJiZcclxuICAgICAgICAgICAgY2ggIT09IENIQVJfU1AgJiZcclxuICAgICAgICAgICAgY2ggIT09IENIQVJfTEY7XHJcbiAgICAgICAgd2hpbGUgKChjaCA9IHRha2VDaGFyKHNjbnIsIGNsb3N1cmUpKSkge1xyXG4gICAgICAgICAgICBpZGVudGlmaWVycyArPSBjaDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlkZW50aWZpZXJzO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVhZExpbmtlZE1vZGlmaWVyKHNjbnIpIHtcclxuICAgICAgICBsZXQgY2ggPSAnJztcclxuICAgICAgICBsZXQgbmFtZSA9ICcnO1xyXG4gICAgICAgIHdoaWxlICgoY2ggPSB0YWtlSWRlbnRpZmllckNoYXIoc2NucikpKSB7XHJcbiAgICAgICAgICAgIG5hbWUgKz0gY2g7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVhZExpbmtlZFJlZmVyKHNjbnIpIHtcclxuICAgICAgICBjb25zdCBmbiA9IChkZXRlY3QgPSBmYWxzZSwgYnVmKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50Q2hhcigpO1xyXG4gICAgICAgICAgICBpZiAoY2ggPT09IFwie1wiIC8qIEJyYWNlTGVmdCAqLyB8fFxyXG4gICAgICAgICAgICAgICAgY2ggPT09IFwiJVwiIC8qIE1vZHVsbyAqLyB8fFxyXG4gICAgICAgICAgICAgICAgY2ggPT09IFwiQFwiIC8qIExpbmtlZEFsaWFzICovIHx8XHJcbiAgICAgICAgICAgICAgICBjaCA9PT0gXCJ8XCIgLyogUGlwZSAqLyB8fFxyXG4gICAgICAgICAgICAgICAgIWNoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBDSEFSX1NQKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGNoID09PSBDSEFSX0xGKSB7XHJcbiAgICAgICAgICAgICAgICBidWYgKz0gY2g7XHJcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmbihkZXRlY3QsIGJ1Zik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidWYgKz0gY2g7XHJcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmbih0cnVlLCBidWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gZm4oZmFsc2UsICcnKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlYWRQbHVyYWwoc2Nucikge1xyXG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgY29uc3QgcGx1cmFsID0gZWF0KHNjbnIsIFwifFwiIC8qIFBpcGUgKi8pO1xyXG4gICAgICAgIHNraXBTcGFjZXMoc2Nucik7XHJcbiAgICAgICAgcmV0dXJuIHBsdXJhbDtcclxuICAgIH1cclxuICAgIC8vIFRPRE86IFdlIG5lZWQgcmVmYWN0b3Jpbmcgb2YgdG9rZW4gcGFyc2luZyAuLi5cclxuICAgIGZ1bmN0aW9uIHJlYWRUb2tlbkluUGxhY2Vob2xkZXIoc2NuciwgY29udGV4dCkge1xyXG4gICAgICAgIGxldCB0b2tlbiA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgY2ggPSBzY25yLmN1cnJlbnRDaGFyKCk7XHJcbiAgICAgICAgc3dpdGNoIChjaCkge1xyXG4gICAgICAgICAgICBjYXNlIFwie1wiIC8qIEJyYWNlTGVmdCAqLzpcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LmJyYWNlTmVzdCA+PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLk5PVF9BTExPV19ORVNUX1BMQUNFSE9MREVSLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgMiAvKiBCcmFjZUxlZnQgKi8sIFwie1wiIC8qIEJyYWNlTGVmdCAqLyk7XHJcbiAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QrKztcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICAgICAgY2FzZSBcIn1cIiAvKiBCcmFjZVJpZ2h0ICovOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuYnJhY2VOZXN0ID4gMCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY3VycmVudFR5cGUgPT09IDIgLyogQnJhY2VMZWZ0ICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLkVNUFRZX1BMQUNFSE9MREVSLCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzY25yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgMyAvKiBCcmFjZVJpZ2h0ICovLCBcIn1cIiAvKiBCcmFjZVJpZ2h0ICovKTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2VOZXN0LS07XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCA+IDAgJiYgc2tpcFNwYWNlcyhzY25yKTtcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZXh0LmluTGlua2VkICYmIGNvbnRleHQuYnJhY2VOZXN0ID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5pbkxpbmtlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgICAgICAgICBjYXNlIFwiQFwiIC8qIExpbmtlZEFsaWFzICovOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuYnJhY2VOZXN0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcihDb21waWxlRXJyb3JDb2Rlcy5VTlRFUk1JTkFURURfQ0xPU0lOR19CUkFDRSwgY3VycmVudFBvc2l0aW9uKCksIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSByZWFkVG9rZW5JbkxpbmtlZChzY25yLCBjb250ZXh0KSB8fCBnZXRFbmRUb2tlbihjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuYnJhY2VOZXN0ID0gMDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGxldCB2YWxpZE5hbWVkSWRlbnRpZmllciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsaWRMaXN0SWRlbnRpZmllciA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBsZXQgdmFsaWRMaXRlcmFsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmIChpc1BsdXJhbFN0YXJ0KHNjbnIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHQuYnJhY2VOZXN0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuVU5URVJNSU5BVEVEX0NMT1NJTkdfQlJBQ0UsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCAxIC8qIFBpcGUgKi8sIHJlYWRQbHVyYWwoc2NucikpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuaW5MaW5rZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5icmFjZU5lc3QgPiAwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKGNvbnRleHQuY3VycmVudFR5cGUgPT09IDUgLyogTmFtZWQgKi8gfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5jdXJyZW50VHlwZSA9PT0gNiAvKiBMaXN0ICovIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuY3VycmVudFR5cGUgPT09IDcgLyogTGl0ZXJhbCAqLykpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuVU5URVJNSU5BVEVEX0NMT1NJTkdfQlJBQ0UsIGN1cnJlbnRQb3NpdGlvbigpLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlYWRUb2tlbihzY25yLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICgodmFsaWROYW1lZElkZW50aWZpZXIgPSBpc05hbWVkSWRlbnRpZmllclN0YXJ0KHNjbnIsIGNvbnRleHQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgNSAvKiBOYW1lZCAqLywgcmVhZE5hbWVkSWRlbnRpZmllcihzY25yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoKHZhbGlkTGlzdElkZW50aWZpZXIgPSBpc0xpc3RJZGVudGlmaWVyU3RhcnQoc2NuciwgY29udGV4dCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCA2IC8qIExpc3QgKi8sIHJlYWRMaXN0SWRlbnRpZmllcihzY25yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoKHZhbGlkTGl0ZXJhbCA9IGlzTGl0ZXJhbFN0YXJ0KHNjbnIsIGNvbnRleHQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gZ2V0VG9rZW4oY29udGV4dCwgNyAvKiBMaXRlcmFsICovLCByZWFkTGl0ZXJhbChzY25yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbGlkTmFtZWRJZGVudGlmaWVyICYmICF2YWxpZExpc3RJZGVudGlmaWVyICYmICF2YWxpZExpdGVyYWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiB3ZSBzaG91bGQgYmUgcmUtZGVzaWduZWQgaW52YWxpZCBjYXNlcywgd2hlbiB3ZSB3aWxsIGV4dGVuZCBtZXNzYWdlIHN5bnRheCBuZWFyIHRoZSBmdXR1cmUgLi4uXHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCAxMyAvKiBJbnZhbGlkUGxhY2UgKi8sIHJlYWRJbnZhbGlkSWRlbnRpZmllcihzY25yKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLklOVkFMSURfVE9LRU5fSU5fUExBQ0VIT0xERVIsIGN1cnJlbnRQb3NpdGlvbigpLCAwLCB0b2tlbi52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfVxyXG4gICAgLy8gVE9ETzogV2UgbmVlZCByZWZhY3RvcmluZyBvZiB0b2tlbiBwYXJzaW5nIC4uLlxyXG4gICAgZnVuY3Rpb24gcmVhZFRva2VuSW5MaW5rZWQoc2NuciwgY29udGV4dCkge1xyXG4gICAgICAgIGNvbnN0IHsgY3VycmVudFR5cGUgfSA9IGNvbnRleHQ7XHJcbiAgICAgICAgbGV0IHRva2VuID0gbnVsbDtcclxuICAgICAgICBjb25zdCBjaCA9IHNjbnIuY3VycmVudENoYXIoKTtcclxuICAgICAgICBpZiAoKGN1cnJlbnRUeXBlID09PSA4IC8qIExpbmtlZEFsaWFzICovIHx8XHJcbiAgICAgICAgICAgIGN1cnJlbnRUeXBlID09PSA5IC8qIExpbmtlZERvdCAqLyB8fFxyXG4gICAgICAgICAgICBjdXJyZW50VHlwZSA9PT0gMTIgLyogTGlua2VkTW9kaWZpZXIgKi8gfHxcclxuICAgICAgICAgICAgY3VycmVudFR5cGUgPT09IDEwIC8qIExpbmtlZERlbGltaXRlciAqLykgJiZcclxuICAgICAgICAgICAgKGNoID09PSBDSEFSX0xGIHx8IGNoID09PSBDSEFSX1NQKSkge1xyXG4gICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuSU5WQUxJRF9MSU5LRURfRk9STUFULCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN3aXRjaCAoY2gpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkBcIiAvKiBMaW5rZWRBbGlhcyAqLzpcclxuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCA4IC8qIExpbmtlZEFsaWFzICovLCBcIkBcIiAvKiBMaW5rZWRBbGlhcyAqLyk7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmluTGlua2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICAgICAgY2FzZSBcIi5cIiAvKiBMaW5rZWREb3QgKi86XHJcbiAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0VG9rZW4oY29udGV4dCwgOSAvKiBMaW5rZWREb3QgKi8sIFwiLlwiIC8qIExpbmtlZERvdCAqLyk7XHJcbiAgICAgICAgICAgIGNhc2UgXCI6XCIgLyogTGlua2VkRGVsaW1pdGVyICovOlxyXG4gICAgICAgICAgICAgICAgc2tpcFNwYWNlcyhzY25yKTtcclxuICAgICAgICAgICAgICAgIHNjbnIubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFRva2VuKGNvbnRleHQsIDEwIC8qIExpbmtlZERlbGltaXRlciAqLywgXCI6XCIgLyogTGlua2VkRGVsaW1pdGVyICovKTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGlmIChpc1BsdXJhbFN0YXJ0KHNjbnIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCAxIC8qIFBpcGUgKi8sIHJlYWRQbHVyYWwoc2NucikpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuaW5MaW5rZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNMaW5rZWREb3RTdGFydChzY25yLCBjb250ZXh0KSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGlzTGlua2VkRGVsaW1pdGVyU3RhcnQoc2NuciwgY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW5JbkxpbmtlZChzY25yLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc0xpbmtlZE1vZGlmaWVyU3RhcnQoc2NuciwgY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRUb2tlbihjb250ZXh0LCAxMiAvKiBMaW5rZWRNb2RpZmllciAqLywgcmVhZExpbmtlZE1vZGlmaWVyKHNjbnIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc0xpbmtlZFJlZmVyU3RhcnQoc2NuciwgY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBza2lwU3BhY2VzKHNjbnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaCA9PT0gXCJ7XCIgLyogQnJhY2VMZWZ0ICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNjYW4gdGhlIHBsYWNlaG9sZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW5JblBsYWNlaG9sZGVyKHNjbnIsIGNvbnRleHQpIHx8IHRva2VuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldFRva2VuKGNvbnRleHQsIDExIC8qIExpbmtlZEtleSAqLywgcmVhZExpbmtlZFJlZmVyKHNjbnIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFR5cGUgPT09IDggLyogTGlua2VkQWxpYXMgKi8pIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IoQ29tcGlsZUVycm9yQ29kZXMuSU5WQUxJRF9MSU5LRURfRk9STUFULCBjdXJyZW50UG9zaXRpb24oKSwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmJyYWNlTmVzdCA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmluTGlua2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFRva2VuKHNjbnIsIGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFRPRE86IFdlIG5lZWQgcmVmYWN0b3Jpbmcgb2YgdG9rZW4gcGFyc2luZyAuLi5cclxuICAgIGZ1bmN0aW9uIHJlYWRUb2tlbihzY25yLCBjb250ZXh0KSB7XHJcbiAgICAgICAgbGV0IHRva2VuID0geyB0eXBlOiAxNCAvKiBFT0YgKi8gfTtcclxuICAgICAgICBpZiAoY29udGV4dC5icmFjZU5lc3QgPiAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW5JblBsYWNlaG9sZGVyKHNjbnIsIGNvbnRleHQpIHx8IGdldEVuZFRva2VuKGNvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29udGV4dC5pbkxpbmtlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVhZFRva2VuSW5MaW5rZWQoc2NuciwgY29udGV4dCkgfHwgZ2V0RW5kVG9rZW4oY29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGNoID0gc2Nuci5jdXJyZW50Q2hhcigpO1xyXG4gICAgICAgIHN3aXRjaCAoY2gpIHtcclxuICAgICAgICAgICAgY2FzZSBcIntcIiAvKiBCcmFjZUxlZnQgKi86XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVhZFRva2VuSW5QbGFjZWhvbGRlcihzY25yLCBjb250ZXh0KSB8fCBnZXRFbmRUb2tlbihjb250ZXh0KTtcclxuICAgICAgICAgICAgY2FzZSBcIn1cIiAvKiBCcmFjZVJpZ2h0ICovOlxyXG4gICAgICAgICAgICAgICAgZW1pdEVycm9yKENvbXBpbGVFcnJvckNvZGVzLlVOQkFMQU5DRURfQ0xPU0lOR19CUkFDRSwgY3VycmVudFBvc2l0aW9uKCksIDApO1xyXG4gICAgICAgICAgICAgICAgc2Nuci5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2V0VG9rZW4oY29udGV4dCwgMyAvKiBCcmFjZVJpZ2h0ICovLCBcIn1cIiAvKiBCcmFjZVJpZ2h0ICovKTtcclxuICAgICAgICAgICAgY2FzZSBcIkBcIiAvKiBMaW5rZWRBbGlhcyAqLzpcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWFkVG9rZW5JbkxpbmtlZChzY25yLCBjb250ZXh0KSB8fCBnZXRFbmRUb2tlbihjb250ZXh0KTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGlmIChpc1BsdXJhbFN0YXJ0KHNjbnIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBnZXRUb2tlbihjb250ZXh0LCAxIC8qIFBpcGUgKi8sIHJlYWRQbHVyYWwoc2NucikpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5icmFjZU5lc3QgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuaW5MaW5rZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlzTW9kdWxvLCBoYXNTcGFjZSB9ID0gZGV0ZWN0TW9kdWxvU3RhcnQoc2Nucik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNNb2R1bG8pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaGFzU3BhY2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBnZXRUb2tlbihjb250ZXh0LCAwIC8qIFRleHQgKi8sIHJlYWRUZXh0KHNjbnIpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGdldFRva2VuKGNvbnRleHQsIDQgLyogTW9kdWxvICovLCByZWFkTW9kdWxvKHNjbnIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChpc1RleHRTdGFydChzY25yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXRUb2tlbihjb250ZXh0LCAwIC8qIFRleHQgKi8sIHJlYWRUZXh0KHNjbnIpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBuZXh0VG9rZW4oKSB7XHJcbiAgICAgICAgY29uc3QgeyBjdXJyZW50VHlwZSwgb2Zmc2V0LCBzdGFydExvYywgZW5kTG9jIH0gPSBfY29udGV4dDtcclxuICAgICAgICBfY29udGV4dC5sYXN0VHlwZSA9IGN1cnJlbnRUeXBlO1xyXG4gICAgICAgIF9jb250ZXh0Lmxhc3RPZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICAgICAgX2NvbnRleHQubGFzdFN0YXJ0TG9jID0gc3RhcnRMb2M7XHJcbiAgICAgICAgX2NvbnRleHQubGFzdEVuZExvYyA9IGVuZExvYztcclxuICAgICAgICBfY29udGV4dC5vZmZzZXQgPSBjdXJyZW50T2Zmc2V0KCk7XHJcbiAgICAgICAgX2NvbnRleHQuc3RhcnRMb2MgPSBjdXJyZW50UG9zaXRpb24oKTtcclxuICAgICAgICBpZiAoX3NjbnIuY3VycmVudENoYXIoKSA9PT0gRU9GKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRUb2tlbihfY29udGV4dCwgMTQgLyogRU9GICovKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlYWRUb2tlbihfc2NuciwgX2NvbnRleHQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0VG9rZW4sXHJcbiAgICAgICAgY3VycmVudE9mZnNldCxcclxuICAgICAgICBjdXJyZW50UG9zaXRpb24sXHJcbiAgICAgICAgY29udGV4dFxyXG4gICAgfTtcclxufVxuXG5jb25zdCBFUlJPUl9ET01BSU4gPSAncGFyc2VyJztcclxuLy8gQmFja3NsYXNoIGJhY2tzbGFzaCwgYmFja3NsYXNoIHF1b3RlLCB1SEhISCwgVUhISEhISC5cclxuY29uc3QgS05PV05fRVNDQVBFUyA9IC8oPzpcXFxcXFxcXHxcXFxcJ3xcXFxcdShbMC05YS1mQS1GXXs0fSl8XFxcXFUoWzAtOWEtZkEtRl17Nn0pKS9nO1xyXG5mdW5jdGlvbiBmcm9tRXNjYXBlU2VxdWVuY2UobWF0Y2gsIGNvZGVQb2ludDQsIGNvZGVQb2ludDYpIHtcclxuICAgIHN3aXRjaCAobWF0Y2gpIHtcclxuICAgICAgICBjYXNlIGBcXFxcXFxcXGA6XHJcbiAgICAgICAgICAgIHJldHVybiBgXFxcXGA7XHJcbiAgICAgICAgY2FzZSBgXFxcXFxcJ2A6XHJcbiAgICAgICAgICAgIHJldHVybiBgXFwnYDtcclxuICAgICAgICBkZWZhdWx0OiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvZGVQb2ludCA9IHBhcnNlSW50KGNvZGVQb2ludDQgfHwgY29kZVBvaW50NiwgMTYpO1xyXG4gICAgICAgICAgICBpZiAoY29kZVBvaW50IDw9IDB4ZDdmZiB8fCBjb2RlUG9pbnQgPj0gMHhlMDAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21Db2RlUG9pbnQoY29kZVBvaW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBpbnZhbGlkIC4uLlxyXG4gICAgICAgICAgICAvLyBSZXBsYWNlIHRoZW0gd2l0aCBVK0ZGRkQgUkVQTEFDRU1FTlQgQ0hBUkFDVEVSLlxyXG4gICAgICAgICAgICByZXR1cm4gJ++/vSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVBhcnNlcihvcHRpb25zID0ge30pIHtcclxuICAgIGNvbnN0IGxvY2F0aW9uID0gb3B0aW9ucy5sb2NhdGlvbiAhPT0gZmFsc2U7XHJcbiAgICBjb25zdCB7IG9uRXJyb3IgfSA9IG9wdGlvbnM7XHJcbiAgICBmdW5jdGlvbiBlbWl0RXJyb3IodG9rZW56ZXIsIGNvZGUsIHN0YXJ0LCBvZmZzZXQsIC4uLmFyZ3MpIHtcclxuICAgICAgICBjb25zdCBlbmQgPSB0b2tlbnplci5jdXJyZW50UG9zaXRpb24oKTtcclxuICAgICAgICBlbmQub2Zmc2V0ICs9IG9mZnNldDtcclxuICAgICAgICBlbmQuY29sdW1uICs9IG9mZnNldDtcclxuICAgICAgICBpZiAob25FcnJvcikge1xyXG4gICAgICAgICAgICBjb25zdCBsb2MgPSBjcmVhdGVMb2NhdGlvbihzdGFydCwgZW5kKTtcclxuICAgICAgICAgICAgY29uc3QgZXJyID0gY3JlYXRlQ29tcGlsZUVycm9yKGNvZGUsIGxvYywge1xyXG4gICAgICAgICAgICAgICAgZG9tYWluOiBFUlJPUl9ET01BSU4sXHJcbiAgICAgICAgICAgICAgICBhcmdzXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBvbkVycm9yKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc3RhcnROb2RlKHR5cGUsIG9mZnNldCwgbG9jKSB7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IHtcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgc3RhcnQ6IG9mZnNldCxcclxuICAgICAgICAgICAgZW5kOiBvZmZzZXRcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChsb2NhdGlvbikge1xyXG4gICAgICAgICAgICBub2RlLmxvYyA9IHsgc3RhcnQ6IGxvYywgZW5kOiBsb2MgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBlbmROb2RlKG5vZGUsIG9mZnNldCwgcG9zLCB0eXBlKSB7XHJcbiAgICAgICAgbm9kZS5lbmQgPSBvZmZzZXQ7XHJcbiAgICAgICAgaWYgKHR5cGUpIHtcclxuICAgICAgICAgICAgbm9kZS50eXBlID0gdHlwZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uICYmIG5vZGUubG9jKSB7XHJcbiAgICAgICAgICAgIG5vZGUubG9jLmVuZCA9IHBvcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwYXJzZVRleHQodG9rZW5pemVyLCB2YWx1ZSkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoMyAvKiBUZXh0ICovLCBjb250ZXh0Lm9mZnNldCwgY29udGV4dC5zdGFydExvYyk7XHJcbiAgICAgICAgbm9kZS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlTGlzdCh0b2tlbml6ZXIsIGluZGV4KSB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XHJcbiAgICAgICAgY29uc3QgeyBsYXN0T2Zmc2V0OiBvZmZzZXQsIGxhc3RTdGFydExvYzogbG9jIH0gPSBjb250ZXh0OyAvLyBnZXQgYnJhY2UgbGVmdCBsb2NcclxuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDUgLyogTGlzdCAqLywgb2Zmc2V0LCBsb2MpO1xyXG4gICAgICAgIG5vZGUuaW5kZXggPSBwYXJzZUludChpbmRleCwgMTApO1xyXG4gICAgICAgIHRva2VuaXplci5uZXh0VG9rZW4oKTsgLy8gc2tpcCBicmFjaCByaWdodFxyXG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlTmFtZWQodG9rZW5pemVyLCBrZXkpIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcclxuICAgICAgICBjb25zdCB7IGxhc3RPZmZzZXQ6IG9mZnNldCwgbGFzdFN0YXJ0TG9jOiBsb2MgfSA9IGNvbnRleHQ7IC8vIGdldCBicmFjZSBsZWZ0IGxvY1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoNCAvKiBOYW1lZCAqLywgb2Zmc2V0LCBsb2MpO1xyXG4gICAgICAgIG5vZGUua2V5ID0ga2V5O1xyXG4gICAgICAgIHRva2VuaXplci5uZXh0VG9rZW4oKTsgLy8gc2tpcCBicmFjaCByaWdodFxyXG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlTGl0ZXJhbCh0b2tlbml6ZXIsIHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XHJcbiAgICAgICAgY29uc3QgeyBsYXN0T2Zmc2V0OiBvZmZzZXQsIGxhc3RTdGFydExvYzogbG9jIH0gPSBjb250ZXh0OyAvLyBnZXQgYnJhY2UgbGVmdCBsb2NcclxuICAgICAgICBjb25zdCBub2RlID0gc3RhcnROb2RlKDkgLyogTGl0ZXJhbCAqLywgb2Zmc2V0LCBsb2MpO1xyXG4gICAgICAgIG5vZGUudmFsdWUgPSB2YWx1ZS5yZXBsYWNlKEtOT1dOX0VTQ0FQRVMsIGZyb21Fc2NhcGVTZXF1ZW5jZSk7XHJcbiAgICAgICAgdG9rZW5pemVyLm5leHRUb2tlbigpOyAvLyBza2lwIGJyYWNoIHJpZ2h0XHJcbiAgICAgICAgZW5kTm9kZShub2RlLCB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpLCB0b2tlbml6ZXIuY3VycmVudFBvc2l0aW9uKCkpO1xyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcGFyc2VMaW5rZWRNb2RpZmllcih0b2tlbml6ZXIpIHtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IHRva2VuaXplci5uZXh0VG9rZW4oKTtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcclxuICAgICAgICBjb25zdCB7IGxhc3RPZmZzZXQ6IG9mZnNldCwgbGFzdFN0YXJ0TG9jOiBsb2MgfSA9IGNvbnRleHQ7IC8vIGdldCBsaW5rZWQgZG90IGxvY1xyXG4gICAgICAgIGNvbnN0IG5vZGUgPSBzdGFydE5vZGUoOCAvKiBMaW5rZWRNb2RpZmllciAqLywgb2Zmc2V0LCBsb2MpO1xyXG4gICAgICAgIGlmICh0b2tlbi50eXBlICE9PSAxMiAvKiBMaW5rZWRNb2RpZmllciAqLykge1xyXG4gICAgICAgICAgICAvLyBlbXB0eSBtb2RpZmllclxyXG4gICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VNUFRZX0xJTktFRF9NT0RJRklFUiwgY29udGV4dC5sYXN0U3RhcnRMb2MsIDApO1xyXG4gICAgICAgICAgICBub2RlLnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIGVuZE5vZGUobm9kZSwgb2Zmc2V0LCBsb2MpO1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgbmV4dENvbnN1bWVUb2tlbjogdG9rZW4sXHJcbiAgICAgICAgICAgICAgICBub2RlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNoZWNrIHRva2VuXHJcbiAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUudmFsdWUgPSB0b2tlbi52YWx1ZSB8fCAnJztcclxuICAgICAgICBlbmROb2RlKG5vZGUsIHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCksIHRva2VuaXplci5jdXJyZW50UG9zaXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbm9kZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwYXJzZUxpbmtlZEtleSh0b2tlbml6ZXIsIHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YXJ0Tm9kZSg3IC8qIExpbmtlZEtleSAqLywgY29udGV4dC5vZmZzZXQsIGNvbnRleHQuc3RhcnRMb2MpO1xyXG4gICAgICAgIG5vZGUudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICBlbmROb2RlKG5vZGUsIHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCksIHRva2VuaXplci5jdXJyZW50UG9zaXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwYXJzZUxpbmtlZCh0b2tlbml6ZXIpIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcclxuICAgICAgICBjb25zdCBsaW5rZWROb2RlID0gc3RhcnROb2RlKDYgLyogTGlua2VkICovLCBjb250ZXh0Lm9mZnNldCwgY29udGV4dC5zdGFydExvYyk7XHJcbiAgICAgICAgbGV0IHRva2VuID0gdG9rZW5pemVyLm5leHRUb2tlbigpO1xyXG4gICAgICAgIGlmICh0b2tlbi50eXBlID09PSA5IC8qIExpbmtlZERvdCAqLykge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUxpbmtlZE1vZGlmaWVyKHRva2VuaXplcik7XHJcbiAgICAgICAgICAgIGxpbmtlZE5vZGUubW9kaWZpZXIgPSBwYXJzZWQubm9kZTtcclxuICAgICAgICAgICAgdG9rZW4gPSBwYXJzZWQubmV4dENvbnN1bWVUb2tlbiB8fCB0b2tlbml6ZXIubmV4dFRva2VuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGFzc2V0IGNoZWNrIHRva2VuXHJcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09IDEwIC8qIExpbmtlZERlbGltaXRlciAqLykge1xyXG4gICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG9rZW4gPSB0b2tlbml6ZXIubmV4dFRva2VuKCk7XHJcbiAgICAgICAgLy8gc2tpcCBicmFjZSBsZWZ0XHJcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IDIgLyogQnJhY2VMZWZ0ICovKSB7XHJcbiAgICAgICAgICAgIHRva2VuID0gdG9rZW5pemVyLm5leHRUb2tlbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAxMSAvKiBMaW5rZWRLZXkgKi86XHJcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGlua2VkTm9kZS5rZXkgPSBwYXJzZUxpbmtlZEtleSh0b2tlbml6ZXIsIHRva2VuLnZhbHVlIHx8ICcnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDUgLyogTmFtZWQgKi86XHJcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGlua2VkTm9kZS5rZXkgPSBwYXJzZU5hbWVkKHRva2VuaXplciwgdG9rZW4udmFsdWUgfHwgJycpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNiAvKiBMaXN0ICovOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxpbmtlZE5vZGUua2V5ID0gcGFyc2VMaXN0KHRva2VuaXplciwgdG9rZW4udmFsdWUgfHwgJycpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgNyAvKiBMaXRlcmFsICovOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxpbmtlZE5vZGUua2V5ID0gcGFyc2VMaXRlcmFsKHRva2VuaXplciwgdG9rZW4udmFsdWUgfHwgJycpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAvLyBlbXB0eSBrZXlcclxuICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfRU1QVFlfTElOS0VEX0tFWSwgY29udGV4dC5sYXN0U3RhcnRMb2MsIDApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dENvbnRleHQgPSB0b2tlbml6ZXIuY29udGV4dCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW1wdHlMaW5rZWRLZXlOb2RlID0gc3RhcnROb2RlKDcgLyogTGlua2VkS2V5ICovLCBuZXh0Q29udGV4dC5vZmZzZXQsIG5leHRDb250ZXh0LnN0YXJ0TG9jKTtcclxuICAgICAgICAgICAgICAgIGVtcHR5TGlua2VkS2V5Tm9kZS52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgZW5kTm9kZShlbXB0eUxpbmtlZEtleU5vZGUsIG5leHRDb250ZXh0Lm9mZnNldCwgbmV4dENvbnRleHQuc3RhcnRMb2MpO1xyXG4gICAgICAgICAgICAgICAgbGlua2VkTm9kZS5rZXkgPSBlbXB0eUxpbmtlZEtleU5vZGU7XHJcbiAgICAgICAgICAgICAgICBlbmROb2RlKGxpbmtlZE5vZGUsIG5leHRDb250ZXh0Lm9mZnNldCwgbmV4dENvbnRleHQuc3RhcnRMb2MpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0Q29uc3VtZVRva2VuOiB0b2tlbixcclxuICAgICAgICAgICAgICAgICAgICBub2RlOiBsaW5rZWROb2RlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbmROb2RlKGxpbmtlZE5vZGUsIHRva2VuaXplci5jdXJyZW50T2Zmc2V0KCksIHRva2VuaXplci5jdXJyZW50UG9zaXRpb24oKSk7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbm9kZTogbGlua2VkTm9kZVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwYXJzZU1lc3NhZ2UodG9rZW5pemVyKSB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRPZmZzZXQgPSBjb250ZXh0LmN1cnJlbnRUeXBlID09PSAxIC8qIFBpcGUgKi9cclxuICAgICAgICAgICAgPyB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpXHJcbiAgICAgICAgICAgIDogY29udGV4dC5vZmZzZXQ7XHJcbiAgICAgICAgY29uc3Qgc3RhcnRMb2MgPSBjb250ZXh0LmN1cnJlbnRUeXBlID09PSAxIC8qIFBpcGUgKi9cclxuICAgICAgICAgICAgPyBjb250ZXh0LmVuZExvY1xyXG4gICAgICAgICAgICA6IGNvbnRleHQuc3RhcnRMb2M7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YXJ0Tm9kZSgyIC8qIE1lc3NhZ2UgKi8sIHN0YXJ0T2Zmc2V0LCBzdGFydExvYyk7XHJcbiAgICAgICAgbm9kZS5pdGVtcyA9IFtdO1xyXG4gICAgICAgIGxldCBuZXh0VG9rZW4gPSBudWxsO1xyXG4gICAgICAgIGRvIHtcclxuICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBuZXh0VG9rZW4gfHwgdG9rZW5pemVyLm5leHRUb2tlbigpO1xyXG4gICAgICAgICAgICBuZXh0VG9rZW4gPSBudWxsO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRva2VuLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMCAvKiBUZXh0ICovOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBub2RlLml0ZW1zLnB1c2gocGFyc2VUZXh0KHRva2VuaXplciwgdG9rZW4udmFsdWUgfHwgJycpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNiAvKiBMaXN0ICovOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLlVORVhQRUNURURfTEVYSUNBTF9BTkFMWVNJUywgY29udGV4dC5sYXN0U3RhcnRMb2MsIDAsIGdldFRva2VuQ2FwdGlvbih0b2tlbikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBub2RlLml0ZW1zLnB1c2gocGFyc2VMaXN0KHRva2VuaXplciwgdG9rZW4udmFsdWUgfHwgJycpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNSAvKiBOYW1lZCAqLzpcclxuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWl0RXJyb3IodG9rZW5pemVyLCBDb21waWxlRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0xFWElDQUxfQU5BTFlTSVMsIGNvbnRleHQubGFzdFN0YXJ0TG9jLCAwLCBnZXRUb2tlbkNhcHRpb24odG9rZW4pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5pdGVtcy5wdXNoKHBhcnNlTmFtZWQodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3IC8qIExpdGVyYWwgKi86XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuaXRlbXMucHVzaChwYXJzZUxpdGVyYWwodG9rZW5pemVyLCB0b2tlbi52YWx1ZSB8fCAnJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA4IC8qIExpbmtlZEFsaWFzICovOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlTGlua2VkKHRva2VuaXplcik7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5pdGVtcy5wdXNoKHBhcnNlZC5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0VG9rZW4gPSBwYXJzZWQubmV4dENvbnN1bWVUb2tlbiB8fCBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSB3aGlsZSAoY29udGV4dC5jdXJyZW50VHlwZSAhPT0gMTQgLyogRU9GICovICYmXHJcbiAgICAgICAgICAgIGNvbnRleHQuY3VycmVudFR5cGUgIT09IDEgLyogUGlwZSAqLyk7XHJcbiAgICAgICAgLy8gYWRqdXN0IG1lc3NhZ2Ugbm9kZSBsb2NcclxuICAgICAgICBjb25zdCBlbmRPZmZzZXQgPSBjb250ZXh0LmN1cnJlbnRUeXBlID09PSAxIC8qIFBpcGUgKi9cclxuICAgICAgICAgICAgPyBjb250ZXh0Lmxhc3RPZmZzZXRcclxuICAgICAgICAgICAgOiB0b2tlbml6ZXIuY3VycmVudE9mZnNldCgpO1xyXG4gICAgICAgIGNvbnN0IGVuZExvYyA9IGNvbnRleHQuY3VycmVudFR5cGUgPT09IDEgLyogUGlwZSAqL1xyXG4gICAgICAgICAgICA/IGNvbnRleHQubGFzdEVuZExvY1xyXG4gICAgICAgICAgICA6IHRva2VuaXplci5jdXJyZW50UG9zaXRpb24oKTtcclxuICAgICAgICBlbmROb2RlKG5vZGUsIGVuZE9mZnNldCwgZW5kTG9jKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlUGx1cmFsKHRva2VuaXplciwgb2Zmc2V0LCBsb2MsIG1zZ05vZGUpIHtcclxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdG9rZW5pemVyLmNvbnRleHQoKTtcclxuICAgICAgICBsZXQgaGFzRW1wdHlNZXNzYWdlID0gbXNnTm9kZS5pdGVtcy5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YXJ0Tm9kZSgxIC8qIFBsdXJhbCAqLywgb2Zmc2V0LCBsb2MpO1xyXG4gICAgICAgIG5vZGUuY2FzZXMgPSBbXTtcclxuICAgICAgICBub2RlLmNhc2VzLnB1c2gobXNnTm9kZSk7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBjb25zdCBtc2cgPSBwYXJzZU1lc3NhZ2UodG9rZW5pemVyKTtcclxuICAgICAgICAgICAgaWYgKCFoYXNFbXB0eU1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIGhhc0VtcHR5TWVzc2FnZSA9IG1zZy5pdGVtcy5sZW5ndGggPT09IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZS5jYXNlcy5wdXNoKG1zZyk7XHJcbiAgICAgICAgfSB3aGlsZSAoY29udGV4dC5jdXJyZW50VHlwZSAhPT0gMTQgLyogRU9GICovKTtcclxuICAgICAgICBpZiAoaGFzRW1wdHlNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGVtaXRFcnJvcih0b2tlbml6ZXIsIENvbXBpbGVFcnJvckNvZGVzLk1VU1RfSEFWRV9NRVNTQUdFU19JTl9QTFVSQUwsIGxvYywgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlUmVzb3VyY2UodG9rZW5pemVyKSB7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XHJcbiAgICAgICAgY29uc3QgeyBvZmZzZXQsIHN0YXJ0TG9jIH0gPSBjb250ZXh0O1xyXG4gICAgICAgIGNvbnN0IG1zZ05vZGUgPSBwYXJzZU1lc3NhZ2UodG9rZW5pemVyKTtcclxuICAgICAgICBpZiAoY29udGV4dC5jdXJyZW50VHlwZSA9PT0gMTQgLyogRU9GICovKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtc2dOb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlUGx1cmFsKHRva2VuaXplciwgb2Zmc2V0LCBzdGFydExvYywgbXNnTm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcGFyc2Uoc291cmNlKSB7XHJcbiAgICAgICAgY29uc3QgdG9rZW5pemVyID0gY3JlYXRlVG9rZW5pemVyKHNvdXJjZSwgYXNzaWduKHt9LCBvcHRpb25zKSk7XHJcbiAgICAgICAgY29uc3QgY29udGV4dCA9IHRva2VuaXplci5jb250ZXh0KCk7XHJcbiAgICAgICAgY29uc3Qgbm9kZSA9IHN0YXJ0Tm9kZSgwIC8qIFJlc291cmNlICovLCBjb250ZXh0Lm9mZnNldCwgY29udGV4dC5zdGFydExvYyk7XHJcbiAgICAgICAgaWYgKGxvY2F0aW9uICYmIG5vZGUubG9jKSB7XHJcbiAgICAgICAgICAgIG5vZGUubG9jLnNvdXJjZSA9IHNvdXJjZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZS5ib2R5ID0gcGFyc2VSZXNvdXJjZSh0b2tlbml6ZXIpO1xyXG4gICAgICAgIC8vIGFzc2VydCB3aGV0aGVyIGFjaGlldmVkIHRvIEVPRlxyXG4gICAgICAgIGlmIChjb250ZXh0LmN1cnJlbnRUeXBlICE9PSAxNCAvKiBFT0YgKi8pIHtcclxuICAgICAgICAgICAgZW1pdEVycm9yKHRva2VuaXplciwgQ29tcGlsZUVycm9yQ29kZXMuVU5FWFBFQ1RFRF9MRVhJQ0FMX0FOQUxZU0lTLCBjb250ZXh0Lmxhc3RTdGFydExvYywgMCwgc291cmNlW2NvbnRleHQub2Zmc2V0XSB8fCAnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVuZE5vZGUobm9kZSwgdG9rZW5pemVyLmN1cnJlbnRPZmZzZXQoKSwgdG9rZW5pemVyLmN1cnJlbnRQb3NpdGlvbigpKTtcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxuICAgIHJldHVybiB7IHBhcnNlIH07XHJcbn1cclxuZnVuY3Rpb24gZ2V0VG9rZW5DYXB0aW9uKHRva2VuKSB7XHJcbiAgICBpZiAodG9rZW4udHlwZSA9PT0gMTQgLyogRU9GICovKSB7XHJcbiAgICAgICAgcmV0dXJuICdFT0YnO1xyXG4gICAgfVxyXG4gICAgY29uc3QgbmFtZSA9ICh0b2tlbi52YWx1ZSB8fCAnJykucmVwbGFjZSgvXFxyP1xcbi9ndSwgJ1xcXFxuJyk7XHJcbiAgICByZXR1cm4gbmFtZS5sZW5ndGggPiAxMCA/IG5hbWUuc2xpY2UoMCwgOSkgKyAn4oCmJyA6IG5hbWU7XHJcbn1cblxuZnVuY3Rpb24gY3JlYXRlVHJhbnNmb3JtZXIoYXN0LCBvcHRpb25zID0ge30gLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4pIHtcclxuICAgIGNvbnN0IF9jb250ZXh0ID0ge1xyXG4gICAgICAgIGFzdCxcclxuICAgICAgICBoZWxwZXJzOiBuZXcgU2V0KClcclxuICAgIH07XHJcbiAgICBjb25zdCBjb250ZXh0ID0gKCkgPT4gX2NvbnRleHQ7XHJcbiAgICBjb25zdCBoZWxwZXIgPSAobmFtZSkgPT4ge1xyXG4gICAgICAgIF9jb250ZXh0LmhlbHBlcnMuYWRkKG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfTtcclxuICAgIHJldHVybiB7IGNvbnRleHQsIGhlbHBlciB9O1xyXG59XHJcbmZ1bmN0aW9uIHRyYXZlcnNlTm9kZXMobm9kZXMsIHRyYW5zZm9ybWVyKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdHJhdmVyc2VOb2RlKG5vZGVzW2ldLCB0cmFuc2Zvcm1lcik7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdHJhdmVyc2VOb2RlKG5vZGUsIHRyYW5zZm9ybWVyKSB7XHJcbiAgICAvLyBUT0RPOiBpZiB3ZSBuZWVkIHByZS1ob29rIG9mIHRyYW5zZm9ybSwgc2hvdWxkIGJlIGltcGxlbWVudGVkIHRvIGhlcmVcclxuICAgIHN3aXRjaCAobm9kZS50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAxIC8qIFBsdXJhbCAqLzpcclxuICAgICAgICAgICAgdHJhdmVyc2VOb2Rlcyhub2RlLmNhc2VzLCB0cmFuc2Zvcm1lcik7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybWVyLmhlbHBlcihcInBsdXJhbFwiIC8qIFBMVVJBTCAqLyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgMiAvKiBNZXNzYWdlICovOlxyXG4gICAgICAgICAgICB0cmF2ZXJzZU5vZGVzKG5vZGUuaXRlbXMsIHRyYW5zZm9ybWVyKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2IC8qIExpbmtlZCAqLzpcclxuICAgICAgICAgICAgY29uc3QgbGlua2VkID0gbm9kZTtcclxuICAgICAgICAgICAgdHJhdmVyc2VOb2RlKGxpbmtlZC5rZXksIHRyYW5zZm9ybWVyKTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtZXIuaGVscGVyKFwibGlua2VkXCIgLyogTElOS0VEICovKTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtZXIuaGVscGVyKFwidHlwZVwiIC8qIFRZUEUgKi8pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDUgLyogTGlzdCAqLzpcclxuICAgICAgICAgICAgdHJhbnNmb3JtZXIuaGVscGVyKFwiaW50ZXJwb2xhdGVcIiAvKiBJTlRFUlBPTEFURSAqLyk7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybWVyLmhlbHBlcihcImxpc3RcIiAvKiBMSVNUICovKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0IC8qIE5hbWVkICovOlxyXG4gICAgICAgICAgICB0cmFuc2Zvcm1lci5oZWxwZXIoXCJpbnRlcnBvbGF0ZVwiIC8qIElOVEVSUE9MQVRFICovKTtcclxuICAgICAgICAgICAgdHJhbnNmb3JtZXIuaGVscGVyKFwibmFtZWRcIiAvKiBOQU1FRCAqLyk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gICAgLy8gVE9ETzogaWYgd2UgbmVlZCBwb3N0LWhvb2sgb2YgdHJhbnNmb3JtLCBzaG91bGQgYmUgaW1wbGVtZW50ZWQgdG8gaGVyZVxyXG59XHJcbi8vIHRyYW5zZm9ybSBBU1RcclxuZnVuY3Rpb24gdHJhbnNmb3JtKGFzdCwgb3B0aW9ucyA9IHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuKSB7XHJcbiAgICBjb25zdCB0cmFuc2Zvcm1lciA9IGNyZWF0ZVRyYW5zZm9ybWVyKGFzdCk7XHJcbiAgICB0cmFuc2Zvcm1lci5oZWxwZXIoXCJub3JtYWxpemVcIiAvKiBOT1JNQUxJWkUgKi8pO1xyXG4gICAgLy8gdHJhdmVyc2VcclxuICAgIGFzdC5ib2R5ICYmIHRyYXZlcnNlTm9kZShhc3QuYm9keSwgdHJhbnNmb3JtZXIpO1xyXG4gICAgLy8gc2V0IG1ldGEgaW5mb3JtYXRpb25cclxuICAgIGNvbnN0IGNvbnRleHQgPSB0cmFuc2Zvcm1lci5jb250ZXh0KCk7XHJcbiAgICBhc3QuaGVscGVycyA9IEFycmF5LmZyb20oY29udGV4dC5oZWxwZXJzKTtcclxufVxuXG5mdW5jdGlvbiBjcmVhdGVDb2RlR2VuZXJhdG9yKGFzdCwgb3B0aW9ucykge1xyXG4gICAgY29uc3QgeyBzb3VyY2VNYXAsIGZpbGVuYW1lLCBicmVha0xpbmVDb2RlLCBuZWVkSW5kZW50OiBfbmVlZEluZGVudCB9ID0gb3B0aW9ucztcclxuICAgIGNvbnN0IF9jb250ZXh0ID0ge1xyXG4gICAgICAgIHNvdXJjZTogYXN0LmxvYy5zb3VyY2UsXHJcbiAgICAgICAgZmlsZW5hbWUsXHJcbiAgICAgICAgY29kZTogJycsXHJcbiAgICAgICAgY29sdW1uOiAxLFxyXG4gICAgICAgIGxpbmU6IDEsXHJcbiAgICAgICAgb2Zmc2V0OiAwLFxyXG4gICAgICAgIG1hcDogdW5kZWZpbmVkLFxyXG4gICAgICAgIGJyZWFrTGluZUNvZGUsXHJcbiAgICAgICAgbmVlZEluZGVudDogX25lZWRJbmRlbnQsXHJcbiAgICAgICAgaW5kZW50TGV2ZWw6IDBcclxuICAgIH07XHJcbiAgICBjb25zdCBjb250ZXh0ID0gKCkgPT4gX2NvbnRleHQ7XHJcbiAgICBmdW5jdGlvbiBwdXNoKGNvZGUsIG5vZGUpIHtcclxuICAgICAgICBfY29udGV4dC5jb2RlICs9IGNvZGU7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBfbmV3bGluZShuLCB3aXRoQnJlYWtMaW5lID0gdHJ1ZSkge1xyXG4gICAgICAgIGNvbnN0IF9icmVha0xpbmVDb2RlID0gd2l0aEJyZWFrTGluZSA/IGJyZWFrTGluZUNvZGUgOiAnJztcclxuICAgICAgICBwdXNoKF9uZWVkSW5kZW50ID8gX2JyZWFrTGluZUNvZGUgKyBgICBgLnJlcGVhdChuKSA6IF9icmVha0xpbmVDb2RlKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGluZGVudCh3aXRoTmV3TGluZSA9IHRydWUpIHtcclxuICAgICAgICBjb25zdCBsZXZlbCA9ICsrX2NvbnRleHQuaW5kZW50TGV2ZWw7XHJcbiAgICAgICAgd2l0aE5ld0xpbmUgJiYgX25ld2xpbmUobGV2ZWwpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZGVpbmRlbnQod2l0aE5ld0xpbmUgPSB0cnVlKSB7XHJcbiAgICAgICAgY29uc3QgbGV2ZWwgPSAtLV9jb250ZXh0LmluZGVudExldmVsO1xyXG4gICAgICAgIHdpdGhOZXdMaW5lICYmIF9uZXdsaW5lKGxldmVsKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG5ld2xpbmUoKSB7XHJcbiAgICAgICAgX25ld2xpbmUoX2NvbnRleHQuaW5kZW50TGV2ZWwpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaGVscGVyID0gKGtleSkgPT4gYF8ke2tleX1gO1xyXG4gICAgY29uc3QgbmVlZEluZGVudCA9ICgpID0+IF9jb250ZXh0Lm5lZWRJbmRlbnQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvbnRleHQsXHJcbiAgICAgICAgcHVzaCxcclxuICAgICAgICBpbmRlbnQsXHJcbiAgICAgICAgZGVpbmRlbnQsXHJcbiAgICAgICAgbmV3bGluZSxcclxuICAgICAgICBoZWxwZXIsXHJcbiAgICAgICAgbmVlZEluZGVudFxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZUxpbmtlZE5vZGUoZ2VuZXJhdG9yLCBub2RlKSB7XHJcbiAgICBjb25zdCB7IGhlbHBlciB9ID0gZ2VuZXJhdG9yO1xyXG4gICAgZ2VuZXJhdG9yLnB1c2goYCR7aGVscGVyKFwibGlua2VkXCIgLyogTElOS0VEICovKX0oYCk7XHJcbiAgICBnZW5lcmF0ZU5vZGUoZ2VuZXJhdG9yLCBub2RlLmtleSk7XHJcbiAgICBpZiAobm9kZS5tb2RpZmllcikge1xyXG4gICAgICAgIGdlbmVyYXRvci5wdXNoKGAsIGApO1xyXG4gICAgICAgIGdlbmVyYXRlTm9kZShnZW5lcmF0b3IsIG5vZGUubW9kaWZpZXIpO1xyXG4gICAgICAgIGdlbmVyYXRvci5wdXNoKGAsIF90eXBlYCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBnZW5lcmF0b3IucHVzaChgLCB1bmRlZmluZWQsIF90eXBlYCk7XHJcbiAgICB9XHJcbiAgICBnZW5lcmF0b3IucHVzaChgKWApO1xyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlTWVzc2FnZU5vZGUoZ2VuZXJhdG9yLCBub2RlKSB7XHJcbiAgICBjb25zdCB7IGhlbHBlciwgbmVlZEluZGVudCB9ID0gZ2VuZXJhdG9yO1xyXG4gICAgZ2VuZXJhdG9yLnB1c2goYCR7aGVscGVyKFwibm9ybWFsaXplXCIgLyogTk9STUFMSVpFICovKX0oW2ApO1xyXG4gICAgZ2VuZXJhdG9yLmluZGVudChuZWVkSW5kZW50KCkpO1xyXG4gICAgY29uc3QgbGVuZ3RoID0gbm9kZS5pdGVtcy5sZW5ndGg7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZ2VuZXJhdGVOb2RlKGdlbmVyYXRvciwgbm9kZS5pdGVtc1tpXSk7XHJcbiAgICAgICAgaWYgKGkgPT09IGxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdlbmVyYXRvci5wdXNoKCcsICcpO1xyXG4gICAgfVxyXG4gICAgZ2VuZXJhdG9yLmRlaW5kZW50KG5lZWRJbmRlbnQoKSk7XHJcbiAgICBnZW5lcmF0b3IucHVzaCgnXSknKTtcclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZVBsdXJhbE5vZGUoZ2VuZXJhdG9yLCBub2RlKSB7XHJcbiAgICBjb25zdCB7IGhlbHBlciwgbmVlZEluZGVudCB9ID0gZ2VuZXJhdG9yO1xyXG4gICAgaWYgKG5vZGUuY2FzZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGdlbmVyYXRvci5wdXNoKGAke2hlbHBlcihcInBsdXJhbFwiIC8qIFBMVVJBTCAqLyl9KFtgKTtcclxuICAgICAgICBnZW5lcmF0b3IuaW5kZW50KG5lZWRJbmRlbnQoKSk7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gbm9kZS5jYXNlcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBnZW5lcmF0ZU5vZGUoZ2VuZXJhdG9yLCBub2RlLmNhc2VzW2ldKTtcclxuICAgICAgICAgICAgaWYgKGkgPT09IGxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdlbmVyYXRvci5wdXNoKCcsICcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnZW5lcmF0b3IuZGVpbmRlbnQobmVlZEluZGVudCgpKTtcclxuICAgICAgICBnZW5lcmF0b3IucHVzaChgXSlgKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZW5lcmF0ZVJlc291cmNlKGdlbmVyYXRvciwgbm9kZSkge1xyXG4gICAgaWYgKG5vZGUuYm9keSkge1xyXG4gICAgICAgIGdlbmVyYXRlTm9kZShnZW5lcmF0b3IsIG5vZGUuYm9keSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBnZW5lcmF0b3IucHVzaCgnbnVsbCcpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGdlbmVyYXRlTm9kZShnZW5lcmF0b3IsIG5vZGUpIHtcclxuICAgIGNvbnN0IHsgaGVscGVyIH0gPSBnZW5lcmF0b3I7XHJcbiAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xyXG4gICAgICAgIGNhc2UgMCAvKiBSZXNvdXJjZSAqLzpcclxuICAgICAgICAgICAgZ2VuZXJhdGVSZXNvdXJjZShnZW5lcmF0b3IsIG5vZGUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDEgLyogUGx1cmFsICovOlxyXG4gICAgICAgICAgICBnZW5lcmF0ZVBsdXJhbE5vZGUoZ2VuZXJhdG9yLCBub2RlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAyIC8qIE1lc3NhZ2UgKi86XHJcbiAgICAgICAgICAgIGdlbmVyYXRlTWVzc2FnZU5vZGUoZ2VuZXJhdG9yLCBub2RlKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA2IC8qIExpbmtlZCAqLzpcclxuICAgICAgICAgICAgZ2VuZXJhdGVMaW5rZWROb2RlKGdlbmVyYXRvciwgbm9kZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgOCAvKiBMaW5rZWRNb2RpZmllciAqLzpcclxuICAgICAgICAgICAgZ2VuZXJhdG9yLnB1c2goSlNPTi5zdHJpbmdpZnkobm9kZS52YWx1ZSksIG5vZGUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDcgLyogTGlua2VkS2V5ICovOlxyXG4gICAgICAgICAgICBnZW5lcmF0b3IucHVzaChKU09OLnN0cmluZ2lmeShub2RlLnZhbHVlKSwgbm9kZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNSAvKiBMaXN0ICovOlxyXG4gICAgICAgICAgICBnZW5lcmF0b3IucHVzaChgJHtoZWxwZXIoXCJpbnRlcnBvbGF0ZVwiIC8qIElOVEVSUE9MQVRFICovKX0oJHtoZWxwZXIoXCJsaXN0XCIgLyogTElTVCAqLyl9KCR7bm9kZS5pbmRleH0pKWAsIG5vZGUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDQgLyogTmFtZWQgKi86XHJcbiAgICAgICAgICAgIGdlbmVyYXRvci5wdXNoKGAke2hlbHBlcihcImludGVycG9sYXRlXCIgLyogSU5URVJQT0xBVEUgKi8pfSgke2hlbHBlcihcIm5hbWVkXCIgLyogTkFNRUQgKi8pfSgke0pTT04uc3RyaW5naWZ5KG5vZGUua2V5KX0pKWAsIG5vZGUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDkgLyogTGl0ZXJhbCAqLzpcclxuICAgICAgICAgICAgZ2VuZXJhdG9yLnB1c2goSlNPTi5zdHJpbmdpZnkobm9kZS52YWx1ZSksIG5vZGUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIDMgLyogVGV4dCAqLzpcclxuICAgICAgICAgICAgZ2VuZXJhdG9yLnB1c2goSlNPTi5zdHJpbmdpZnkobm9kZS52YWx1ZSksIG5vZGUpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuaGFuZGxlZCBjb2RlZ2VuIG5vZGUgdHlwZTogJHtub2RlLnR5cGV9YCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vLyBnZW5lcmF0ZSBjb2RlIGZyb20gQVNUXHJcbmNvbnN0IGdlbmVyYXRlID0gKGFzdCwgb3B0aW9ucyA9IHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuKSA9PiB7XHJcbiAgICBjb25zdCBtb2RlID0gaXNTdHJpbmcob3B0aW9ucy5tb2RlKSA/IG9wdGlvbnMubW9kZSA6ICdub3JtYWwnO1xyXG4gICAgY29uc3QgZmlsZW5hbWUgPSBpc1N0cmluZyhvcHRpb25zLmZpbGVuYW1lKVxyXG4gICAgICAgID8gb3B0aW9ucy5maWxlbmFtZVxyXG4gICAgICAgIDogJ21lc3NhZ2UuaW50bCc7XHJcbiAgICBjb25zdCBzb3VyY2VNYXAgPSAhIW9wdGlvbnMuc291cmNlTWFwO1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBjb25zdCBicmVha0xpbmVDb2RlID0gb3B0aW9ucy5icmVha0xpbmVDb2RlICE9IG51bGxcclxuICAgICAgICA/IG9wdGlvbnMuYnJlYWtMaW5lQ29kZVxyXG4gICAgICAgIDogbW9kZSA9PT0gJ2Fycm93J1xyXG4gICAgICAgICAgICA/ICc7J1xyXG4gICAgICAgICAgICA6ICdcXG4nO1xyXG4gICAgY29uc3QgbmVlZEluZGVudCA9IG9wdGlvbnMubmVlZEluZGVudCA/IG9wdGlvbnMubmVlZEluZGVudCA6IG1vZGUgIT09ICdhcnJvdyc7XHJcbiAgICBjb25zdCBoZWxwZXJzID0gYXN0LmhlbHBlcnMgfHwgW107XHJcbiAgICBjb25zdCBnZW5lcmF0b3IgPSBjcmVhdGVDb2RlR2VuZXJhdG9yKGFzdCwge1xyXG4gICAgICAgIG1vZGUsXHJcbiAgICAgICAgZmlsZW5hbWUsXHJcbiAgICAgICAgc291cmNlTWFwLFxyXG4gICAgICAgIGJyZWFrTGluZUNvZGUsXHJcbiAgICAgICAgbmVlZEluZGVudFxyXG4gICAgfSk7XHJcbiAgICBnZW5lcmF0b3IucHVzaChtb2RlID09PSAnbm9ybWFsJyA/IGBmdW5jdGlvbiBfX21zZ19fIChjdHgpIHtgIDogYChjdHgpID0+IHtgKTtcclxuICAgIGdlbmVyYXRvci5pbmRlbnQobmVlZEluZGVudCk7XHJcbiAgICBpZiAoaGVscGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgZ2VuZXJhdG9yLnB1c2goYGNvbnN0IHsgJHtoZWxwZXJzLm1hcChzID0+IGAke3N9OiBfJHtzfWApLmpvaW4oJywgJyl9IH0gPSBjdHhgKTtcclxuICAgICAgICBnZW5lcmF0b3IubmV3bGluZSgpO1xyXG4gICAgfVxyXG4gICAgZ2VuZXJhdG9yLnB1c2goYHJldHVybiBgKTtcclxuICAgIGdlbmVyYXRlTm9kZShnZW5lcmF0b3IsIGFzdCk7XHJcbiAgICBnZW5lcmF0b3IuZGVpbmRlbnQobmVlZEluZGVudCk7XHJcbiAgICBnZW5lcmF0b3IucHVzaChgfWApO1xyXG4gICAgY29uc3QgeyBjb2RlLCBtYXAgfSA9IGdlbmVyYXRvci5jb250ZXh0KCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGFzdCxcclxuICAgICAgICBjb2RlLFxyXG4gICAgICAgIG1hcDogbWFwID8gbWFwLnRvSlNPTigpIDogdW5kZWZpbmVkIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgfTtcclxufTtcblxuZnVuY3Rpb24gYmFzZUNvbXBpbGUoc291cmNlLCBvcHRpb25zID0ge30pIHtcclxuICAgIGNvbnN0IGFzc2lnbmVkT3B0aW9ucyA9IGFzc2lnbih7fSwgb3B0aW9ucyk7XHJcbiAgICAvLyBwYXJzZSBzb3VyY2UgY29kZXNcclxuICAgIGNvbnN0IHBhcnNlciA9IGNyZWF0ZVBhcnNlcihhc3NpZ25lZE9wdGlvbnMpO1xyXG4gICAgY29uc3QgYXN0ID0gcGFyc2VyLnBhcnNlKHNvdXJjZSk7XHJcbiAgICAvLyB0cmFuc2Zvcm0gQVNUc1xyXG4gICAgdHJhbnNmb3JtKGFzdCwgYXNzaWduZWRPcHRpb25zKTtcclxuICAgIC8vIGdlbmVyYXRlIGphdmFzY3JpcHQgY29kZXNcclxuICAgIHJldHVybiBnZW5lcmF0ZShhc3QsIGFzc2lnbmVkT3B0aW9ucyk7XHJcbn1cblxuZXhwb3J0IHsgQ29tcGlsZUVycm9yQ29kZXMsIEVSUk9SX0RPTUFJTiwgTG9jYXRpb25TdHViLCBiYXNlQ29tcGlsZSwgY3JlYXRlQ29tcGlsZUVycm9yLCBjcmVhdGVMb2NhdGlvbiwgY3JlYXRlUGFyc2VyLCBjcmVhdGVQb3NpdGlvbiwgZGVmYXVsdE9uRXJyb3IsIGVycm9yTWVzc2FnZXMgfTtcbiIsIi8qIVxuICAqIGRldnRvb2xzLWlmIHY5LjIuMlxuICAqIChjKSAyMDIyIGthenV5YSBrYXdhZ3VjaGlcbiAgKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gICovXG5jb25zdCBJbnRsaWZ5RGV2VG9vbHNIb29rcyA9ICB7XHJcbiAgICBJMThuSW5pdDogJ2kxOG46aW5pdCcsXHJcbiAgICBGdW5jdGlvblRyYW5zbGF0ZTogJ2Z1bmN0aW9uOnRyYW5zbGF0ZSdcclxufTtcblxuZXhwb3J0IHsgSW50bGlmeURldlRvb2xzSG9va3MgfTtcbiIsIi8qIVxuICAqIGNvcmUtYmFzZSB2OS4yLjJcbiAgKiAoYykgMjAyMiBrYXp1eWEga2F3YWd1Y2hpXG4gICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICAqL1xuaW1wb3J0IHsgaXNPYmplY3QsIGlzU3RyaW5nLCBpc0Z1bmN0aW9uLCBpc051bWJlciwgaXNQbGFpbk9iamVjdCwgdG9EaXNwbGF5U3RyaW5nLCBpc0FycmF5LCBmb3JtYXQsIGlzQm9vbGVhbiwgYXNzaWduLCBpc1JlZ0V4cCwgd2FybiwgZXNjYXBlSHRtbCwgaW5Ccm93c2VyLCBtYXJrLCBtZWFzdXJlLCBpc0VtcHR5T2JqZWN0LCBnZW5lcmF0ZUNvZGVGcmFtZSwgZ2VuZXJhdGVGb3JtYXRDYWNoZUtleSwgaXNEYXRlLCBnZXRHbG9iYWxUaGlzIH0gZnJvbSAnQGludGxpZnkvc2hhcmVkJztcbmltcG9ydCB7IGRlZmF1bHRPbkVycm9yLCBiYXNlQ29tcGlsZSwgQ29tcGlsZUVycm9yQ29kZXMsIGNyZWF0ZUNvbXBpbGVFcnJvciB9IGZyb20gJ0BpbnRsaWZ5L21lc3NhZ2UtY29tcGlsZXInO1xuZXhwb3J0IHsgQ29tcGlsZUVycm9yQ29kZXMsIGNyZWF0ZUNvbXBpbGVFcnJvciB9IGZyb20gJ0BpbnRsaWZ5L21lc3NhZ2UtY29tcGlsZXInO1xuaW1wb3J0IHsgSW50bGlmeURldlRvb2xzSG9va3MgfSBmcm9tICdAaW50bGlmeS9kZXZ0b29scy1pZic7XG5cbmNvbnN0IHBhdGhTdGF0ZU1hY2hpbmUgPSAgW107XHJcbnBhdGhTdGF0ZU1hY2hpbmVbMCAvKiBCRUZPUkVfUEFUSCAqL10gPSB7XHJcbiAgICBbXCJ3XCIgLyogV09SS1NQQUNFICovXTogWzAgLyogQkVGT1JFX1BBVEggKi9dLFxyXG4gICAgW1wiaVwiIC8qIElERU5UICovXTogWzMgLyogSU5fSURFTlQgKi8sIDAgLyogQVBQRU5EICovXSxcclxuICAgIFtcIltcIiAvKiBMRUZUX0JSQUNLRVQgKi9dOiBbNCAvKiBJTl9TVUJfUEFUSCAqL10sXHJcbiAgICBbXCJvXCIgLyogRU5EX09GX0ZBSUwgKi9dOiBbNyAvKiBBRlRFUl9QQVRIICovXVxyXG59O1xyXG5wYXRoU3RhdGVNYWNoaW5lWzEgLyogSU5fUEFUSCAqL10gPSB7XHJcbiAgICBbXCJ3XCIgLyogV09SS1NQQUNFICovXTogWzEgLyogSU5fUEFUSCAqL10sXHJcbiAgICBbXCIuXCIgLyogRE9UICovXTogWzIgLyogQkVGT1JFX0lERU5UICovXSxcclxuICAgIFtcIltcIiAvKiBMRUZUX0JSQUNLRVQgKi9dOiBbNCAvKiBJTl9TVUJfUEFUSCAqL10sXHJcbiAgICBbXCJvXCIgLyogRU5EX09GX0ZBSUwgKi9dOiBbNyAvKiBBRlRFUl9QQVRIICovXVxyXG59O1xyXG5wYXRoU3RhdGVNYWNoaW5lWzIgLyogQkVGT1JFX0lERU5UICovXSA9IHtcclxuICAgIFtcIndcIiAvKiBXT1JLU1BBQ0UgKi9dOiBbMiAvKiBCRUZPUkVfSURFTlQgKi9dLFxyXG4gICAgW1wiaVwiIC8qIElERU5UICovXTogWzMgLyogSU5fSURFTlQgKi8sIDAgLyogQVBQRU5EICovXSxcclxuICAgIFtcIjBcIiAvKiBaRVJPICovXTogWzMgLyogSU5fSURFTlQgKi8sIDAgLyogQVBQRU5EICovXVxyXG59O1xyXG5wYXRoU3RhdGVNYWNoaW5lWzMgLyogSU5fSURFTlQgKi9dID0ge1xyXG4gICAgW1wiaVwiIC8qIElERU5UICovXTogWzMgLyogSU5fSURFTlQgKi8sIDAgLyogQVBQRU5EICovXSxcclxuICAgIFtcIjBcIiAvKiBaRVJPICovXTogWzMgLyogSU5fSURFTlQgKi8sIDAgLyogQVBQRU5EICovXSxcclxuICAgIFtcIndcIiAvKiBXT1JLU1BBQ0UgKi9dOiBbMSAvKiBJTl9QQVRIICovLCAxIC8qIFBVU0ggKi9dLFxyXG4gICAgW1wiLlwiIC8qIERPVCAqL106IFsyIC8qIEJFRk9SRV9JREVOVCAqLywgMSAvKiBQVVNIICovXSxcclxuICAgIFtcIltcIiAvKiBMRUZUX0JSQUNLRVQgKi9dOiBbNCAvKiBJTl9TVUJfUEFUSCAqLywgMSAvKiBQVVNIICovXSxcclxuICAgIFtcIm9cIiAvKiBFTkRfT0ZfRkFJTCAqL106IFs3IC8qIEFGVEVSX1BBVEggKi8sIDEgLyogUFVTSCAqL11cclxufTtcclxucGF0aFN0YXRlTWFjaGluZVs0IC8qIElOX1NVQl9QQVRIICovXSA9IHtcclxuICAgIFtcIidcIiAvKiBTSU5HTEVfUVVPVEUgKi9dOiBbNSAvKiBJTl9TSU5HTEVfUVVPVEUgKi8sIDAgLyogQVBQRU5EICovXSxcclxuICAgIFtcIlxcXCJcIiAvKiBET1VCTEVfUVVPVEUgKi9dOiBbNiAvKiBJTl9ET1VCTEVfUVVPVEUgKi8sIDAgLyogQVBQRU5EICovXSxcclxuICAgIFtcIltcIiAvKiBMRUZUX0JSQUNLRVQgKi9dOiBbXHJcbiAgICAgICAgNCAvKiBJTl9TVUJfUEFUSCAqLyxcclxuICAgICAgICAyIC8qIElOQ19TVUJfUEFUSF9ERVBUSCAqL1xyXG4gICAgXSxcclxuICAgIFtcIl1cIiAvKiBSSUdIVF9CUkFDS0VUICovXTogWzEgLyogSU5fUEFUSCAqLywgMyAvKiBQVVNIX1NVQl9QQVRIICovXSxcclxuICAgIFtcIm9cIiAvKiBFTkRfT0ZfRkFJTCAqL106IDggLyogRVJST1IgKi8sXHJcbiAgICBbXCJsXCIgLyogRUxTRSAqL106IFs0IC8qIElOX1NVQl9QQVRIICovLCAwIC8qIEFQUEVORCAqL11cclxufTtcclxucGF0aFN0YXRlTWFjaGluZVs1IC8qIElOX1NJTkdMRV9RVU9URSAqL10gPSB7XHJcbiAgICBbXCInXCIgLyogU0lOR0xFX1FVT1RFICovXTogWzQgLyogSU5fU1VCX1BBVEggKi8sIDAgLyogQVBQRU5EICovXSxcclxuICAgIFtcIm9cIiAvKiBFTkRfT0ZfRkFJTCAqL106IDggLyogRVJST1IgKi8sXHJcbiAgICBbXCJsXCIgLyogRUxTRSAqL106IFs1IC8qIElOX1NJTkdMRV9RVU9URSAqLywgMCAvKiBBUFBFTkQgKi9dXHJcbn07XHJcbnBhdGhTdGF0ZU1hY2hpbmVbNiAvKiBJTl9ET1VCTEVfUVVPVEUgKi9dID0ge1xyXG4gICAgW1wiXFxcIlwiIC8qIERPVUJMRV9RVU9URSAqL106IFs0IC8qIElOX1NVQl9QQVRIICovLCAwIC8qIEFQUEVORCAqL10sXHJcbiAgICBbXCJvXCIgLyogRU5EX09GX0ZBSUwgKi9dOiA4IC8qIEVSUk9SICovLFxyXG4gICAgW1wibFwiIC8qIEVMU0UgKi9dOiBbNiAvKiBJTl9ET1VCTEVfUVVPVEUgKi8sIDAgLyogQVBQRU5EICovXVxyXG59O1xyXG4vKipcclxuICogQ2hlY2sgaWYgYW4gZXhwcmVzc2lvbiBpcyBhIGxpdGVyYWwgdmFsdWUuXHJcbiAqL1xyXG5jb25zdCBsaXRlcmFsVmFsdWVSRSA9IC9eXFxzPyg/OnRydWV8ZmFsc2V8LT9bXFxkLl0rfCdbXiddKid8XCJbXlwiXSpcIilcXHM/JC87XHJcbmZ1bmN0aW9uIGlzTGl0ZXJhbChleHApIHtcclxuICAgIHJldHVybiBsaXRlcmFsVmFsdWVSRS50ZXN0KGV4cCk7XHJcbn1cclxuLyoqXHJcbiAqIFN0cmlwIHF1b3RlcyBmcm9tIGEgc3RyaW5nXHJcbiAqL1xyXG5mdW5jdGlvbiBzdHJpcFF1b3RlcyhzdHIpIHtcclxuICAgIGNvbnN0IGEgPSBzdHIuY2hhckNvZGVBdCgwKTtcclxuICAgIGNvbnN0IGIgPSBzdHIuY2hhckNvZGVBdChzdHIubGVuZ3RoIC0gMSk7XHJcbiAgICByZXR1cm4gYSA9PT0gYiAmJiAoYSA9PT0gMHgyMiB8fCBhID09PSAweDI3KSA/IHN0ci5zbGljZSgxLCAtMSkgOiBzdHI7XHJcbn1cclxuLyoqXHJcbiAqIERldGVybWluZSB0aGUgdHlwZSBvZiBhIGNoYXJhY3RlciBpbiBhIGtleXBhdGguXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRQYXRoQ2hhclR5cGUoY2gpIHtcclxuICAgIGlmIChjaCA9PT0gdW5kZWZpbmVkIHx8IGNoID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIFwib1wiIC8qIEVORF9PRl9GQUlMICovO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29kZSA9IGNoLmNoYXJDb2RlQXQoMCk7XHJcbiAgICBzd2l0Y2ggKGNvZGUpIHtcclxuICAgICAgICBjYXNlIDB4NWI6IC8vIFtcclxuICAgICAgICBjYXNlIDB4NWQ6IC8vIF1cclxuICAgICAgICBjYXNlIDB4MmU6IC8vIC5cclxuICAgICAgICBjYXNlIDB4MjI6IC8vIFwiXHJcbiAgICAgICAgY2FzZSAweDI3OiAvLyAnXHJcbiAgICAgICAgICAgIHJldHVybiBjaDtcclxuICAgICAgICBjYXNlIDB4NWY6IC8vIF9cclxuICAgICAgICBjYXNlIDB4MjQ6IC8vICRcclxuICAgICAgICBjYXNlIDB4MmQ6IC8vIC1cclxuICAgICAgICAgICAgcmV0dXJuIFwiaVwiIC8qIElERU5UICovO1xyXG4gICAgICAgIGNhc2UgMHgwOTogLy8gVGFiIChIVClcclxuICAgICAgICBjYXNlIDB4MGE6IC8vIE5ld2xpbmUgKExGKVxyXG4gICAgICAgIGNhc2UgMHgwZDogLy8gUmV0dXJuIChDUilcclxuICAgICAgICBjYXNlIDB4YTA6IC8vIE5vLWJyZWFrIHNwYWNlIChOQlNQKVxyXG4gICAgICAgIGNhc2UgMHhmZWZmOiAvLyBCeXRlIE9yZGVyIE1hcmsgKEJPTSlcclxuICAgICAgICBjYXNlIDB4MjAyODogLy8gTGluZSBTZXBhcmF0b3IgKExTKVxyXG4gICAgICAgIGNhc2UgMHgyMDI5OiAvLyBQYXJhZ3JhcGggU2VwYXJhdG9yIChQUylcclxuICAgICAgICAgICAgcmV0dXJuIFwid1wiIC8qIFdPUktTUEFDRSAqLztcclxuICAgIH1cclxuICAgIHJldHVybiBcImlcIiAvKiBJREVOVCAqLztcclxufVxyXG4vKipcclxuICogRm9ybWF0IGEgc3ViUGF0aCwgcmV0dXJuIGl0cyBwbGFpbiBmb3JtIGlmIGl0IGlzXHJcbiAqIGEgbGl0ZXJhbCBzdHJpbmcgb3IgbnVtYmVyLiBPdGhlcndpc2UgcHJlcGVuZCB0aGVcclxuICogZHluYW1pYyBpbmRpY2F0b3IgKCopLlxyXG4gKi9cclxuZnVuY3Rpb24gZm9ybWF0U3ViUGF0aChwYXRoKSB7XHJcbiAgICBjb25zdCB0cmltbWVkID0gcGF0aC50cmltKCk7XHJcbiAgICAvLyBpbnZhbGlkIGxlYWRpbmcgMFxyXG4gICAgaWYgKHBhdGguY2hhckF0KDApID09PSAnMCcgJiYgaXNOYU4ocGFyc2VJbnQocGF0aCkpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzTGl0ZXJhbCh0cmltbWVkKVxyXG4gICAgICAgID8gc3RyaXBRdW90ZXModHJpbW1lZClcclxuICAgICAgICA6IFwiKlwiIC8qIEFTVEFSSVNLICovICsgdHJpbW1lZDtcclxufVxyXG4vKipcclxuICogUGFyc2UgYSBzdHJpbmcgcGF0aCBpbnRvIGFuIGFycmF5IG9mIHNlZ21lbnRzXHJcbiAqL1xyXG5mdW5jdGlvbiBwYXJzZShwYXRoKSB7XHJcbiAgICBjb25zdCBrZXlzID0gW107XHJcbiAgICBsZXQgaW5kZXggPSAtMTtcclxuICAgIGxldCBtb2RlID0gMCAvKiBCRUZPUkVfUEFUSCAqLztcclxuICAgIGxldCBzdWJQYXRoRGVwdGggPSAwO1xyXG4gICAgbGV0IGM7XHJcbiAgICBsZXQga2V5OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICBsZXQgbmV3Q2hhcjtcclxuICAgIGxldCB0eXBlO1xyXG4gICAgbGV0IHRyYW5zaXRpb247XHJcbiAgICBsZXQgYWN0aW9uO1xyXG4gICAgbGV0IHR5cGVNYXA7XHJcbiAgICBjb25zdCBhY3Rpb25zID0gW107XHJcbiAgICBhY3Rpb25zWzAgLyogQVBQRU5EICovXSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAga2V5ID0gbmV3Q2hhcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGtleSArPSBuZXdDaGFyO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBhY3Rpb25zWzEgLyogUFVTSCAqL10gPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGtleXMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICBrZXkgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGFjdGlvbnNbMiAvKiBJTkNfU1VCX1BBVEhfREVQVEggKi9dID0gKCkgPT4ge1xyXG4gICAgICAgIGFjdGlvbnNbMCAvKiBBUFBFTkQgKi9dKCk7XHJcbiAgICAgICAgc3ViUGF0aERlcHRoKys7XHJcbiAgICB9O1xyXG4gICAgYWN0aW9uc1szIC8qIFBVU0hfU1VCX1BBVEggKi9dID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChzdWJQYXRoRGVwdGggPiAwKSB7XHJcbiAgICAgICAgICAgIHN1YlBhdGhEZXB0aC0tO1xyXG4gICAgICAgICAgICBtb2RlID0gNCAvKiBJTl9TVUJfUEFUSCAqLztcclxuICAgICAgICAgICAgYWN0aW9uc1swIC8qIEFQUEVORCAqL10oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHN1YlBhdGhEZXB0aCA9IDA7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGtleSA9IGZvcm1hdFN1YlBhdGgoa2V5KTtcclxuICAgICAgICAgICAgaWYgKGtleSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbnNbMSAvKiBQVVNIICovXSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGZ1bmN0aW9uIG1heWJlVW5lc2NhcGVRdW90ZSgpIHtcclxuICAgICAgICBjb25zdCBuZXh0Q2hhciA9IHBhdGhbaW5kZXggKyAxXTtcclxuICAgICAgICBpZiAoKG1vZGUgPT09IDUgLyogSU5fU0lOR0xFX1FVT1RFICovICYmXHJcbiAgICAgICAgICAgIG5leHRDaGFyID09PSBcIidcIiAvKiBTSU5HTEVfUVVPVEUgKi8pIHx8XHJcbiAgICAgICAgICAgIChtb2RlID09PSA2IC8qIElOX0RPVUJMRV9RVU9URSAqLyAmJlxyXG4gICAgICAgICAgICAgICAgbmV4dENoYXIgPT09IFwiXFxcIlwiIC8qIERPVUJMRV9RVU9URSAqLykpIHtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgbmV3Q2hhciA9ICdcXFxcJyArIG5leHRDaGFyO1xyXG4gICAgICAgICAgICBhY3Rpb25zWzAgLyogQVBQRU5EICovXSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3aGlsZSAobW9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgYyA9IHBhdGhbaW5kZXhdO1xyXG4gICAgICAgIGlmIChjID09PSAnXFxcXCcgJiYgbWF5YmVVbmVzY2FwZVF1b3RlKCkpIHtcclxuICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHR5cGUgPSBnZXRQYXRoQ2hhclR5cGUoYyk7XHJcbiAgICAgICAgdHlwZU1hcCA9IHBhdGhTdGF0ZU1hY2hpbmVbbW9kZV07XHJcbiAgICAgICAgdHJhbnNpdGlvbiA9IHR5cGVNYXBbdHlwZV0gfHwgdHlwZU1hcFtcImxcIiAvKiBFTFNFICovXSB8fCA4IC8qIEVSUk9SICovO1xyXG4gICAgICAgIC8vIGNoZWNrIHBhcnNlIGVycm9yXHJcbiAgICAgICAgaWYgKHRyYW5zaXRpb24gPT09IDggLyogRVJST1IgKi8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtb2RlID0gdHJhbnNpdGlvblswXTtcclxuICAgICAgICBpZiAodHJhbnNpdGlvblsxXSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGFjdGlvbiA9IGFjdGlvbnNbdHJhbnNpdGlvblsxXV07XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgIG5ld0NoYXIgPSBjO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbigpID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjaGVjayBwYXJzZSBmaW5pc2hcclxuICAgICAgICBpZiAobW9kZSA9PT0gNyAvKiBBRlRFUl9QQVRIICovKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBrZXlzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vLyBwYXRoIHRva2VuIGNhY2hlXHJcbmNvbnN0IGNhY2hlID0gbmV3IE1hcCgpO1xyXG4vKipcclxuICoga2V5LXZhbHVlIG1lc3NhZ2UgcmVzb2x2ZXJcclxuICpcclxuICogQHJlbWFya3NcclxuICogUmVzb2x2ZXMgbWVzc2FnZXMgd2l0aCB0aGUga2V5LXZhbHVlIHN0cnVjdHVyZS4gTm90ZSB0aGF0IG1lc3NhZ2VzIHdpdGggYSBoaWVyYXJjaGljYWwgc3RydWN0dXJlIHN1Y2ggYXMgb2JqZWN0cyBjYW5ub3QgYmUgcmVzb2x2ZWRcclxuICpcclxuICogQHBhcmFtIG9iaiAtIEEgdGFyZ2V0IG9iamVjdCB0byBiZSByZXNvbHZlZCB3aXRoIHBhdGhcclxuICogQHBhcmFtIHBhdGggLSBBIHtAbGluayBQYXRoIHwgcGF0aH0gdG8gcmVzb2x2ZSB0aGUgdmFsdWUgb2YgbWVzc2FnZVxyXG4gKlxyXG4gKiBAcmV0dXJucyBBIHJlc29sdmVkIHtAbGluayBQYXRoVmFsdWUgfCBwYXRoIHZhbHVlfVxyXG4gKlxyXG4gKiBAVnVlSTE4bkdlbmVyYWxcclxuICovXHJcbmZ1bmN0aW9uIHJlc29sdmVXaXRoS2V5VmFsdWUob2JqLCBwYXRoKSB7XHJcbiAgICByZXR1cm4gaXNPYmplY3Qob2JqKSA/IG9ialtwYXRoXSA6IG51bGw7XHJcbn1cclxuLyoqXHJcbiAqIG1lc3NhZ2UgcmVzb2x2ZXJcclxuICpcclxuICogQHJlbWFya3NcclxuICogUmVzb2x2ZXMgbWVzc2FnZXMuIG1lc3NhZ2VzIHdpdGggYSBoaWVyYXJjaGljYWwgc3RydWN0dXJlIHN1Y2ggYXMgb2JqZWN0cyBjYW4gYmUgcmVzb2x2ZWQuIFRoaXMgcmVzb2x2ZXIgaXMgdXNlZCBpbiBWdWVJMThuIGFzIGRlZmF1bHQuXHJcbiAqXHJcbiAqIEBwYXJhbSBvYmogLSBBIHRhcmdldCBvYmplY3QgdG8gYmUgcmVzb2x2ZWQgd2l0aCBwYXRoXHJcbiAqIEBwYXJhbSBwYXRoIC0gQSB7QGxpbmsgUGF0aCB8IHBhdGh9IHRvIHJlc29sdmUgdGhlIHZhbHVlIG9mIG1lc3NhZ2VcclxuICpcclxuICogQHJldHVybnMgQSByZXNvbHZlZCB7QGxpbmsgUGF0aFZhbHVlIHwgcGF0aCB2YWx1ZX1cclxuICpcclxuICogQFZ1ZUkxOG5HZW5lcmFsXHJcbiAqL1xyXG5mdW5jdGlvbiByZXNvbHZlVmFsdWUob2JqLCBwYXRoKSB7XHJcbiAgICAvLyBjaGVjayBvYmplY3RcclxuICAgIGlmICghaXNPYmplY3Qob2JqKSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgLy8gcGFyc2UgcGF0aFxyXG4gICAgbGV0IGhpdCA9IGNhY2hlLmdldChwYXRoKTtcclxuICAgIGlmICghaGl0KSB7XHJcbiAgICAgICAgaGl0ID0gcGFyc2UocGF0aCk7XHJcbiAgICAgICAgaWYgKGhpdCkge1xyXG4gICAgICAgICAgICBjYWNoZS5zZXQocGF0aCwgaGl0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBjaGVjayBoaXRcclxuICAgIGlmICghaGl0KSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICAvLyByZXNvbHZlIHBhdGggdmFsdWVcclxuICAgIGNvbnN0IGxlbiA9IGhpdC5sZW5ndGg7XHJcbiAgICBsZXQgbGFzdCA9IG9iajtcclxuICAgIGxldCBpID0gMDtcclxuICAgIHdoaWxlIChpIDwgbGVuKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gbGFzdFtoaXRbaV1dO1xyXG4gICAgICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGFzdCA9IHZhbDtcclxuICAgICAgICBpKys7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbGFzdDtcclxufVxuXG5jb25zdCBERUZBVUxUX01PRElGSUVSID0gKHN0cikgPT4gc3RyO1xyXG5jb25zdCBERUZBVUxUX01FU1NBR0UgPSAoY3R4KSA9PiAnJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG5jb25zdCBERUZBVUxUX01FU1NBR0VfREFUQV9UWVBFID0gJ3RleHQnO1xyXG5jb25zdCBERUZBVUxUX05PUk1BTElaRSA9ICh2YWx1ZXMpID0+IHZhbHVlcy5sZW5ndGggPT09IDAgPyAnJyA6IHZhbHVlcy5qb2luKCcnKTtcclxuY29uc3QgREVGQVVMVF9JTlRFUlBPTEFURSA9IHRvRGlzcGxheVN0cmluZztcclxuZnVuY3Rpb24gcGx1cmFsRGVmYXVsdChjaG9pY2UsIGNob2ljZXNMZW5ndGgpIHtcclxuICAgIGNob2ljZSA9IE1hdGguYWJzKGNob2ljZSk7XHJcbiAgICBpZiAoY2hvaWNlc0xlbmd0aCA9PT0gMikge1xyXG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgICAgIHJldHVybiBjaG9pY2VcclxuICAgICAgICAgICAgPyBjaG9pY2UgPiAxXHJcbiAgICAgICAgICAgICAgICA/IDFcclxuICAgICAgICAgICAgICAgIDogMFxyXG4gICAgICAgICAgICA6IDE7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2hvaWNlID8gTWF0aC5taW4oY2hvaWNlLCAyKSA6IDA7XHJcbn1cclxuZnVuY3Rpb24gZ2V0UGx1cmFsSW5kZXgob3B0aW9ucykge1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBjb25zdCBpbmRleCA9IGlzTnVtYmVyKG9wdGlvbnMucGx1cmFsSW5kZXgpXHJcbiAgICAgICAgPyBvcHRpb25zLnBsdXJhbEluZGV4XHJcbiAgICAgICAgOiAtMTtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgcmV0dXJuIG9wdGlvbnMubmFtZWQgJiYgKGlzTnVtYmVyKG9wdGlvbnMubmFtZWQuY291bnQpIHx8IGlzTnVtYmVyKG9wdGlvbnMubmFtZWQubikpXHJcbiAgICAgICAgPyBpc051bWJlcihvcHRpb25zLm5hbWVkLmNvdW50KVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMubmFtZWQuY291bnRcclxuICAgICAgICAgICAgOiBpc051bWJlcihvcHRpb25zLm5hbWVkLm4pXHJcbiAgICAgICAgICAgICAgICA/IG9wdGlvbnMubmFtZWQublxyXG4gICAgICAgICAgICAgICAgOiBpbmRleFxyXG4gICAgICAgIDogaW5kZXg7XHJcbn1cclxuZnVuY3Rpb24gbm9ybWFsaXplTmFtZWQocGx1cmFsSW5kZXgsIHByb3BzKSB7XHJcbiAgICBpZiAoIXByb3BzLmNvdW50KSB7XHJcbiAgICAgICAgcHJvcHMuY291bnQgPSBwbHVyYWxJbmRleDtcclxuICAgIH1cclxuICAgIGlmICghcHJvcHMubikge1xyXG4gICAgICAgIHByb3BzLm4gPSBwbHVyYWxJbmRleDtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBjcmVhdGVNZXNzYWdlQ29udGV4dChvcHRpb25zID0ge30pIHtcclxuICAgIGNvbnN0IGxvY2FsZSA9IG9wdGlvbnMubG9jYWxlO1xyXG4gICAgY29uc3QgcGx1cmFsSW5kZXggPSBnZXRQbHVyYWxJbmRleChvcHRpb25zKTtcclxuICAgIGNvbnN0IHBsdXJhbFJ1bGUgPSBpc09iamVjdChvcHRpb25zLnBsdXJhbFJ1bGVzKSAmJlxyXG4gICAgICAgIGlzU3RyaW5nKGxvY2FsZSkgJiZcclxuICAgICAgICBpc0Z1bmN0aW9uKG9wdGlvbnMucGx1cmFsUnVsZXNbbG9jYWxlXSlcclxuICAgICAgICA/IG9wdGlvbnMucGx1cmFsUnVsZXNbbG9jYWxlXVxyXG4gICAgICAgIDogcGx1cmFsRGVmYXVsdDtcclxuICAgIGNvbnN0IG9yZ1BsdXJhbFJ1bGUgPSBpc09iamVjdChvcHRpb25zLnBsdXJhbFJ1bGVzKSAmJlxyXG4gICAgICAgIGlzU3RyaW5nKGxvY2FsZSkgJiZcclxuICAgICAgICBpc0Z1bmN0aW9uKG9wdGlvbnMucGx1cmFsUnVsZXNbbG9jYWxlXSlcclxuICAgICAgICA/IHBsdXJhbERlZmF1bHRcclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHBsdXJhbCA9IChtZXNzYWdlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiBtZXNzYWdlc1twbHVyYWxSdWxlKHBsdXJhbEluZGV4LCBtZXNzYWdlcy5sZW5ndGgsIG9yZ1BsdXJhbFJ1bGUpXTtcclxuICAgIH07XHJcbiAgICBjb25zdCBfbGlzdCA9IG9wdGlvbnMubGlzdCB8fCBbXTtcclxuICAgIGNvbnN0IGxpc3QgPSAoaW5kZXgpID0+IF9saXN0W2luZGV4XTtcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBjb25zdCBfbmFtZWQgPSBvcHRpb25zLm5hbWVkIHx8IHt9O1xyXG4gICAgaXNOdW1iZXIob3B0aW9ucy5wbHVyYWxJbmRleCkgJiYgbm9ybWFsaXplTmFtZWQocGx1cmFsSW5kZXgsIF9uYW1lZCk7XHJcbiAgICBjb25zdCBuYW1lZCA9IChrZXkpID0+IF9uYW1lZFtrZXldO1xyXG4gICAgZnVuY3Rpb24gbWVzc2FnZShrZXkpIHtcclxuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgICAgICBjb25zdCBtc2cgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubWVzc2FnZXMpXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5tZXNzYWdlcyhrZXkpXHJcbiAgICAgICAgICAgIDogaXNPYmplY3Qob3B0aW9ucy5tZXNzYWdlcylcclxuICAgICAgICAgICAgICAgID8gb3B0aW9ucy5tZXNzYWdlc1trZXldXHJcbiAgICAgICAgICAgICAgICA6IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiAhbXNnXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5wYXJlbnRcclxuICAgICAgICAgICAgICAgID8gb3B0aW9ucy5wYXJlbnQubWVzc2FnZShrZXkpIC8vIHJlc29sdmUgZnJvbSBwYXJlbnQgbWVzc2FnZXNcclxuICAgICAgICAgICAgICAgIDogREVGQVVMVF9NRVNTQUdFXHJcbiAgICAgICAgICAgIDogbXNnO1xyXG4gICAgfVxyXG4gICAgY29uc3QgX21vZGlmaWVyID0gKG5hbWUpID0+IG9wdGlvbnMubW9kaWZpZXJzXHJcbiAgICAgICAgPyBvcHRpb25zLm1vZGlmaWVyc1tuYW1lXVxyXG4gICAgICAgIDogREVGQVVMVF9NT0RJRklFUjtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZSA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5wcm9jZXNzb3IpICYmIGlzRnVuY3Rpb24ob3B0aW9ucy5wcm9jZXNzb3Iubm9ybWFsaXplKVxyXG4gICAgICAgID8gb3B0aW9ucy5wcm9jZXNzb3Iubm9ybWFsaXplXHJcbiAgICAgICAgOiBERUZBVUxUX05PUk1BTElaRTtcclxuICAgIGNvbnN0IGludGVycG9sYXRlID0gaXNQbGFpbk9iamVjdChvcHRpb25zLnByb2Nlc3NvcikgJiZcclxuICAgICAgICBpc0Z1bmN0aW9uKG9wdGlvbnMucHJvY2Vzc29yLmludGVycG9sYXRlKVxyXG4gICAgICAgID8gb3B0aW9ucy5wcm9jZXNzb3IuaW50ZXJwb2xhdGVcclxuICAgICAgICA6IERFRkFVTFRfSU5URVJQT0xBVEU7XHJcbiAgICBjb25zdCB0eXBlID0gaXNQbGFpbk9iamVjdChvcHRpb25zLnByb2Nlc3NvcikgJiYgaXNTdHJpbmcob3B0aW9ucy5wcm9jZXNzb3IudHlwZSlcclxuICAgICAgICA/IG9wdGlvbnMucHJvY2Vzc29yLnR5cGVcclxuICAgICAgICA6IERFRkFVTFRfTUVTU0FHRV9EQVRBX1RZUEU7XHJcbiAgICBjb25zdCBsaW5rZWQgPSAoa2V5LCAuLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgW2FyZzEsIGFyZzJdID0gYXJncztcclxuICAgICAgICBsZXQgdHlwZSA9ICd0ZXh0JztcclxuICAgICAgICBsZXQgbW9kaWZpZXIgPSAnJztcclxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGFyZzEpKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RpZmllciA9IGFyZzEubW9kaWZpZXIgfHwgbW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gYXJnMS50eXBlIHx8IHR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaXNTdHJpbmcoYXJnMSkpIHtcclxuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gYXJnMSB8fCBtb2RpZmllcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhcmdzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcoYXJnMSkpIHtcclxuICAgICAgICAgICAgICAgIG1vZGlmaWVyID0gYXJnMSB8fCBtb2RpZmllcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcoYXJnMikpIHtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBhcmcyIHx8IHR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1zZyA9IG1lc3NhZ2Uoa2V5KShjdHgpO1xyXG4gICAgICAgIC8vIFRoZSBtZXNzYWdlIGluIHZub2RlIHJlc29sdmVkIHdpdGggbGlua2VkIGFyZSByZXR1cm5lZCBhcyBhbiBhcnJheSBieSBwcm9jZXNzb3Iubm9tYWxpemVcclxuICAgICAgICBpZiAodHlwZSA9PT0gJ3Zub2RlJyAmJiBpc0FycmF5KG1zZykgJiYgbW9kaWZpZXIpIHtcclxuICAgICAgICAgICAgbXNnID0gbXNnWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW9kaWZpZXIgPyBfbW9kaWZpZXIobW9kaWZpZXIpKG1zZywgdHlwZSkgOiBtc2c7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgY3R4ID0ge1xyXG4gICAgICAgIFtcImxpc3RcIiAvKiBMSVNUICovXTogbGlzdCxcclxuICAgICAgICBbXCJuYW1lZFwiIC8qIE5BTUVEICovXTogbmFtZWQsXHJcbiAgICAgICAgW1wicGx1cmFsXCIgLyogUExVUkFMICovXTogcGx1cmFsLFxyXG4gICAgICAgIFtcImxpbmtlZFwiIC8qIExJTktFRCAqL106IGxpbmtlZCxcclxuICAgICAgICBbXCJtZXNzYWdlXCIgLyogTUVTU0FHRSAqL106IG1lc3NhZ2UsXHJcbiAgICAgICAgW1widHlwZVwiIC8qIFRZUEUgKi9dOiB0eXBlLFxyXG4gICAgICAgIFtcImludGVycG9sYXRlXCIgLyogSU5URVJQT0xBVEUgKi9dOiBpbnRlcnBvbGF0ZSxcclxuICAgICAgICBbXCJub3JtYWxpemVcIiAvKiBOT1JNQUxJWkUgKi9dOiBub3JtYWxpemVcclxuICAgIH07XHJcbiAgICByZXR1cm4gY3R4O1xyXG59XG5cbmxldCBkZXZ0b29scyA9IG51bGw7XHJcbmZ1bmN0aW9uIHNldERldlRvb2xzSG9vayhob29rKSB7XHJcbiAgICBkZXZ0b29scyA9IGhvb2s7XHJcbn1cclxuZnVuY3Rpb24gZ2V0RGV2VG9vbHNIb29rKCkge1xyXG4gICAgcmV0dXJuIGRldnRvb2xzO1xyXG59XHJcbmZ1bmN0aW9uIGluaXRJMThuRGV2VG9vbHMoaTE4biwgdmVyc2lvbiwgbWV0YSkge1xyXG4gICAgLy8gVE9ETzogcXVldWUgaWYgZGV2dG9vbHMgaXMgdW5kZWZpbmVkXHJcbiAgICBkZXZ0b29scyAmJlxyXG4gICAgICAgIGRldnRvb2xzLmVtaXQoSW50bGlmeURldlRvb2xzSG9va3MuSTE4bkluaXQsIHtcclxuICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICBpMThuLFxyXG4gICAgICAgICAgICB2ZXJzaW9uLFxyXG4gICAgICAgICAgICBtZXRhXHJcbiAgICAgICAgfSk7XHJcbn1cclxuY29uc3QgdHJhbnNsYXRlRGV2VG9vbHMgPSAvKiAjX19QVVJFX18qLyBjcmVhdGVEZXZUb29sc0hvb2soSW50bGlmeURldlRvb2xzSG9va3MuRnVuY3Rpb25UcmFuc2xhdGUpO1xyXG5mdW5jdGlvbiBjcmVhdGVEZXZUb29sc0hvb2soaG9vaykge1xyXG4gICAgcmV0dXJuIChwYXlsb2FkcykgPT4gZGV2dG9vbHMgJiYgZGV2dG9vbHMuZW1pdChob29rLCBwYXlsb2Fkcyk7XHJcbn1cblxuY29uc3QgQ29yZVdhcm5Db2RlcyA9IHtcclxuICAgIE5PVF9GT1VORF9LRVk6IDEsXHJcbiAgICBGQUxMQkFDS19UT19UUkFOU0xBVEU6IDIsXHJcbiAgICBDQU5OT1RfRk9STUFUX05VTUJFUjogMyxcclxuICAgIEZBTExCQUNLX1RPX05VTUJFUl9GT1JNQVQ6IDQsXHJcbiAgICBDQU5OT1RfRk9STUFUX0RBVEU6IDUsXHJcbiAgICBGQUxMQkFDS19UT19EQVRFX0ZPUk1BVDogNixcclxuICAgIF9fRVhURU5EX1BPSU5UX186IDdcclxufTtcclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5jb25zdCB3YXJuTWVzc2FnZXMgPSB7XHJcbiAgICBbQ29yZVdhcm5Db2Rlcy5OT1RfRk9VTkRfS0VZXTogYE5vdCBmb3VuZCAne2tleX0nIGtleSBpbiAne2xvY2FsZX0nIGxvY2FsZSBtZXNzYWdlcy5gLFxyXG4gICAgW0NvcmVXYXJuQ29kZXMuRkFMTEJBQ0tfVE9fVFJBTlNMQVRFXTogYEZhbGwgYmFjayB0byB0cmFuc2xhdGUgJ3trZXl9JyBrZXkgd2l0aCAne3RhcmdldH0nIGxvY2FsZS5gLFxyXG4gICAgW0NvcmVXYXJuQ29kZXMuQ0FOTk9UX0ZPUk1BVF9OVU1CRVJdOiBgQ2Fubm90IGZvcm1hdCBhIG51bWJlciB2YWx1ZSBkdWUgdG8gbm90IHN1cHBvcnRlZCBJbnRsLk51bWJlckZvcm1hdC5gLFxyXG4gICAgW0NvcmVXYXJuQ29kZXMuRkFMTEJBQ0tfVE9fTlVNQkVSX0ZPUk1BVF06IGBGYWxsIGJhY2sgdG8gbnVtYmVyIGZvcm1hdCAne2tleX0nIGtleSB3aXRoICd7dGFyZ2V0fScgbG9jYWxlLmAsXHJcbiAgICBbQ29yZVdhcm5Db2Rlcy5DQU5OT1RfRk9STUFUX0RBVEVdOiBgQ2Fubm90IGZvcm1hdCBhIGRhdGUgdmFsdWUgZHVlIHRvIG5vdCBzdXBwb3J0ZWQgSW50bC5EYXRlVGltZUZvcm1hdC5gLFxyXG4gICAgW0NvcmVXYXJuQ29kZXMuRkFMTEJBQ0tfVE9fREFURV9GT1JNQVRdOiBgRmFsbCBiYWNrIHRvIGRhdGV0aW1lIGZvcm1hdCAne2tleX0nIGtleSB3aXRoICd7dGFyZ2V0fScgbG9jYWxlLmBcclxufTtcclxuZnVuY3Rpb24gZ2V0V2Fybk1lc3NhZ2UoY29kZSwgLi4uYXJncykge1xyXG4gICAgcmV0dXJuIGZvcm1hdCh3YXJuTWVzc2FnZXNbY29kZV0sIC4uLmFyZ3MpO1xyXG59XG5cbi8qKlxyXG4gKiBGYWxsYmFjayB3aXRoIHNpbXBsZSBpbXBsZW1lbmF0aW9uXHJcbiAqXHJcbiAqIEByZW1hcmtzXHJcbiAqIEEgZmFsbGJhY2sgbG9jYWxlIGZ1bmN0aW9uIGltcGxlbWVudGVkIHdpdGggYSBzaW1wbGUgZmFsbGJhY2sgYWxnb3JpdGhtLlxyXG4gKlxyXG4gKiBCYXNpY2FsbHksIGl0IHJldHVybnMgdGhlIHZhbHVlIGFzIHNwZWNpZmllZCBpbiB0aGUgYGZhbGxiYWNrTG9jYWxlYCBwcm9wcywgYW5kIGlzIHByb2Nlc3NlZCB3aXRoIHRoZSBmYWxsYmFjayBpbnNpZGUgaW50bGlmeS5cclxuICpcclxuICogQHBhcmFtIGN0eCAtIEEge0BsaW5rIENvcmVDb250ZXh0IHwgY29udGV4dH1cclxuICogQHBhcmFtIGZhbGxiYWNrIC0gQSB7QGxpbmsgRmFsbGJhY2tMb2NhbGUgfCBmYWxsYmFjayBsb2NhbGV9XHJcbiAqIEBwYXJhbSBzdGFydCAtIEEgc3RhcnRpbmcge0BsaW5rIExvY2FsZSB8IGxvY2FsZX1cclxuICpcclxuICogQHJldHVybnMgRmFsbGJhY2sgbG9jYWxlc1xyXG4gKlxyXG4gKiBAVnVlSTE4bkdlbmVyYWxcclxuICovXHJcbmZ1bmN0aW9uIGZhbGxiYWNrV2l0aFNpbXBsZShjdHgsIGZhbGxiYWNrLCBzdGFydCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4pIHtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgcmV0dXJuIFsuLi5uZXcgU2V0KFtcclxuICAgICAgICAgICAgc3RhcnQsXHJcbiAgICAgICAgICAgIC4uLihpc0FycmF5KGZhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgPyBmYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgOiBpc09iamVjdChmYWxsYmFjaylcclxuICAgICAgICAgICAgICAgICAgICA/IE9iamVjdC5rZXlzKGZhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgICAgIDogaXNTdHJpbmcoZmFsbGJhY2spXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gW2ZhbGxiYWNrXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFtzdGFydF0pXHJcbiAgICAgICAgXSldO1xyXG59XHJcbi8qKlxyXG4gKiBGYWxsYmFjayB3aXRoIGxvY2FsZSBjaGFpblxyXG4gKlxyXG4gKiBAcmVtYXJrc1xyXG4gKiBBIGZhbGxiYWNrIGxvY2FsZSBmdW5jdGlvbiBpbXBsZW1lbnRlZCB3aXRoIGEgZmFsbGJhY2sgY2hhaW4gYWxnb3JpdGhtLiBJdCdzIHVzZWQgaW4gVnVlSTE4biBhcyBkZWZhdWx0LlxyXG4gKlxyXG4gKiBAcGFyYW0gY3R4IC0gQSB7QGxpbmsgQ29yZUNvbnRleHQgfCBjb250ZXh0fVxyXG4gKiBAcGFyYW0gZmFsbGJhY2sgLSBBIHtAbGluayBGYWxsYmFja0xvY2FsZSB8IGZhbGxiYWNrIGxvY2FsZX1cclxuICogQHBhcmFtIHN0YXJ0IC0gQSBzdGFydGluZyB7QGxpbmsgTG9jYWxlIHwgbG9jYWxlfVxyXG4gKlxyXG4gKiBAcmV0dXJucyBGYWxsYmFjayBsb2NhbGVzXHJcbiAqXHJcbiAqIEBWdWVJMThuU2VlIFtGYWxsYmFja2luZ10oLi4vZ3VpZGUvZXNzZW50aWFscy9mYWxsYmFjaylcclxuICpcclxuICogQFZ1ZUkxOG5HZW5lcmFsXHJcbiAqL1xyXG5mdW5jdGlvbiBmYWxsYmFja1dpdGhMb2NhbGVDaGFpbihjdHgsIGZhbGxiYWNrLCBzdGFydCkge1xyXG4gICAgY29uc3Qgc3RhcnRMb2NhbGUgPSBpc1N0cmluZyhzdGFydCkgPyBzdGFydCA6IERFRkFVTFRfTE9DQUxFO1xyXG4gICAgY29uc3QgY29udGV4dCA9IGN0eDtcclxuICAgIGlmICghY29udGV4dC5fX2xvY2FsZUNoYWluQ2FjaGUpIHtcclxuICAgICAgICBjb250ZXh0Ll9fbG9jYWxlQ2hhaW5DYWNoZSA9IG5ldyBNYXAoKTtcclxuICAgIH1cclxuICAgIGxldCBjaGFpbiA9IGNvbnRleHQuX19sb2NhbGVDaGFpbkNhY2hlLmdldChzdGFydExvY2FsZSk7XHJcbiAgICBpZiAoIWNoYWluKSB7XHJcbiAgICAgICAgY2hhaW4gPSBbXTtcclxuICAgICAgICAvLyBmaXJzdCBibG9jayBkZWZpbmVkIGJ5IHN0YXJ0XHJcbiAgICAgICAgbGV0IGJsb2NrID0gW3N0YXJ0XTtcclxuICAgICAgICAvLyB3aGlsZSBhbnkgaW50ZXJ2ZW5pbmcgYmxvY2sgZm91bmRcclxuICAgICAgICB3aGlsZSAoaXNBcnJheShibG9jaykpIHtcclxuICAgICAgICAgICAgYmxvY2sgPSBhcHBlbmRCbG9ja1RvQ2hhaW4oY2hhaW4sIGJsb2NrLCBmYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgICAgIC8vIGxhc3QgYmxvY2sgZGVmaW5lZCBieSBkZWZhdWx0XHJcbiAgICAgICAgY29uc3QgZGVmYXVsdHMgPSBpc0FycmF5KGZhbGxiYWNrKSB8fCAhaXNQbGFpbk9iamVjdChmYWxsYmFjaylcclxuICAgICAgICAgICAgPyBmYWxsYmFja1xyXG4gICAgICAgICAgICA6IGZhbGxiYWNrWydkZWZhdWx0J11cclxuICAgICAgICAgICAgICAgID8gZmFsbGJhY2tbJ2RlZmF1bHQnXVxyXG4gICAgICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgICAgIC8vIGNvbnZlcnQgZGVmYXVsdHMgdG8gYXJyYXlcclxuICAgICAgICBibG9jayA9IGlzU3RyaW5nKGRlZmF1bHRzKSA/IFtkZWZhdWx0c10gOiBkZWZhdWx0cztcclxuICAgICAgICBpZiAoaXNBcnJheShibG9jaykpIHtcclxuICAgICAgICAgICAgYXBwZW5kQmxvY2tUb0NoYWluKGNoYWluLCBibG9jaywgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZXh0Ll9fbG9jYWxlQ2hhaW5DYWNoZS5zZXQoc3RhcnRMb2NhbGUsIGNoYWluKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjaGFpbjtcclxufVxyXG5mdW5jdGlvbiBhcHBlbmRCbG9ja1RvQ2hhaW4oY2hhaW4sIGJsb2NrLCBibG9ja3MpIHtcclxuICAgIGxldCBmb2xsb3cgPSB0cnVlO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBibG9jay5sZW5ndGggJiYgaXNCb29sZWFuKGZvbGxvdyk7IGkrKykge1xyXG4gICAgICAgIGNvbnN0IGxvY2FsZSA9IGJsb2NrW2ldO1xyXG4gICAgICAgIGlmIChpc1N0cmluZyhsb2NhbGUpKSB7XHJcbiAgICAgICAgICAgIGZvbGxvdyA9IGFwcGVuZExvY2FsZVRvQ2hhaW4oY2hhaW4sIGJsb2NrW2ldLCBibG9ja3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmb2xsb3c7XHJcbn1cclxuZnVuY3Rpb24gYXBwZW5kTG9jYWxlVG9DaGFpbihjaGFpbiwgbG9jYWxlLCBibG9ja3MpIHtcclxuICAgIGxldCBmb2xsb3c7XHJcbiAgICBjb25zdCB0b2tlbnMgPSBsb2NhbGUuc3BsaXQoJy0nKTtcclxuICAgIGRvIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0b2tlbnMuam9pbignLScpO1xyXG4gICAgICAgIGZvbGxvdyA9IGFwcGVuZEl0ZW1Ub0NoYWluKGNoYWluLCB0YXJnZXQsIGJsb2Nrcyk7XHJcbiAgICAgICAgdG9rZW5zLnNwbGljZSgtMSwgMSk7XHJcbiAgICB9IHdoaWxlICh0b2tlbnMubGVuZ3RoICYmIGZvbGxvdyA9PT0gdHJ1ZSk7XHJcbiAgICByZXR1cm4gZm9sbG93O1xyXG59XHJcbmZ1bmN0aW9uIGFwcGVuZEl0ZW1Ub0NoYWluKGNoYWluLCB0YXJnZXQsIGJsb2Nrcykge1xyXG4gICAgbGV0IGZvbGxvdyA9IGZhbHNlO1xyXG4gICAgaWYgKCFjaGFpbi5pbmNsdWRlcyh0YXJnZXQpKSB7XHJcbiAgICAgICAgZm9sbG93ID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGZvbGxvdyA9IHRhcmdldFt0YXJnZXQubGVuZ3RoIC0gMV0gIT09ICchJztcclxuICAgICAgICAgICAgY29uc3QgbG9jYWxlID0gdGFyZ2V0LnJlcGxhY2UoLyEvZywgJycpO1xyXG4gICAgICAgICAgICBjaGFpbi5wdXNoKGxvY2FsZSk7XHJcbiAgICAgICAgICAgIGlmICgoaXNBcnJheShibG9ja3MpIHx8IGlzUGxhaW5PYmplY3QoYmxvY2tzKSkgJiZcclxuICAgICAgICAgICAgICAgIGJsb2Nrc1tsb2NhbGVdIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgICAgICBmb2xsb3cgPSBibG9ja3NbbG9jYWxlXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmb2xsb3c7XHJcbn1cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xyXG4vKipcclxuICogSW50bGlmeSBjb3JlLWJhc2UgdmVyc2lvblxyXG4gKiBAaW50ZXJuYWxcclxuICovXHJcbmNvbnN0IFZFUlNJT04gPSAnOS4yLjInO1xyXG5jb25zdCBOT1RfUkVPU0xWRUQgPSAtMTtcclxuY29uc3QgREVGQVVMVF9MT0NBTEUgPSAnZW4tVVMnO1xyXG5jb25zdCBNSVNTSU5HX1JFU09MVkVfVkFMVUUgPSAnJztcclxuY29uc3QgY2FwaXRhbGl6ZSA9IChzdHIpID0+IGAke3N0ci5jaGFyQXQoMCkudG9Mb2NhbGVVcHBlckNhc2UoKX0ke3N0ci5zdWJzdHIoMSl9YDtcclxuZnVuY3Rpb24gZ2V0RGVmYXVsdExpbmtlZE1vZGlmaWVycygpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdXBwZXI6ICh2YWwsIHR5cGUpID0+IHtcclxuICAgICAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICAgICAgICAgIHJldHVybiB0eXBlID09PSAndGV4dCcgJiYgaXNTdHJpbmcodmFsKVxyXG4gICAgICAgICAgICAgICAgPyB2YWwudG9VcHBlckNhc2UoKVxyXG4gICAgICAgICAgICAgICAgOiB0eXBlID09PSAndm5vZGUnICYmIGlzT2JqZWN0KHZhbCkgJiYgJ19fdl9pc1ZOb2RlJyBpbiB2YWxcclxuICAgICAgICAgICAgICAgICAgICA/IHZhbC5jaGlsZHJlbi50b1VwcGVyQ2FzZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgOiB2YWw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb3dlcjogKHZhbCwgdHlwZSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGUgPT09ICd0ZXh0JyAmJiBpc1N0cmluZyh2YWwpXHJcbiAgICAgICAgICAgICAgICA/IHZhbC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgICAgICA6IHR5cGUgPT09ICd2bm9kZScgJiYgaXNPYmplY3QodmFsKSAmJiAnX192X2lzVk5vZGUnIGluIHZhbFxyXG4gICAgICAgICAgICAgICAgICAgID8gdmFsLmNoaWxkcmVuLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgICAgICA6IHZhbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNhcGl0YWxpemU6ICh2YWwsIHR5cGUpID0+IHtcclxuICAgICAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICAgICAgICAgIHJldHVybiAodHlwZSA9PT0gJ3RleHQnICYmIGlzU3RyaW5nKHZhbClcclxuICAgICAgICAgICAgICAgID8gY2FwaXRhbGl6ZSh2YWwpXHJcbiAgICAgICAgICAgICAgICA6IHR5cGUgPT09ICd2bm9kZScgJiYgaXNPYmplY3QodmFsKSAmJiAnX192X2lzVk5vZGUnIGluIHZhbFxyXG4gICAgICAgICAgICAgICAgICAgID8gY2FwaXRhbGl6ZSh2YWwuY2hpbGRyZW4pXHJcbiAgICAgICAgICAgICAgICAgICAgOiB2YWwpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxubGV0IF9jb21waWxlcjtcclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlQ29tcGlsZXIoY29tcGlsZXIpIHtcclxuICAgIF9jb21waWxlciA9IGNvbXBpbGVyO1xyXG59XHJcbmxldCBfcmVzb2x2ZXI7XHJcbi8qKlxyXG4gKiBSZWdpc3RlciB0aGUgbWVzc2FnZSByZXNvbHZlclxyXG4gKlxyXG4gKiBAcGFyYW0gcmVzb2x2ZXIgLSBBIHtAbGluayBNZXNzYWdlUmVzb2x2ZXJ9IGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBWdWVJMThuR2VuZXJhbFxyXG4gKi9cclxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlUmVzb2x2ZXIocmVzb2x2ZXIpIHtcclxuICAgIF9yZXNvbHZlciA9IHJlc29sdmVyO1xyXG59XHJcbmxldCBfZmFsbGJhY2tlcjtcclxuLyoqXHJcbiAqIFJlZ2lzdGVyIHRoZSBsb2NhbGUgZmFsbGJhY2tlclxyXG4gKlxyXG4gKiBAcGFyYW0gZmFsbGJhY2tlciAtIEEge0BsaW5rIExvY2FsZUZhbGxiYWNrZXJ9IGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBWdWVJMThuR2VuZXJhbFxyXG4gKi9cclxuZnVuY3Rpb24gcmVnaXN0ZXJMb2NhbGVGYWxsYmFja2VyKGZhbGxiYWNrZXIpIHtcclxuICAgIF9mYWxsYmFja2VyID0gZmFsbGJhY2tlcjtcclxufVxyXG4vLyBBZGRpdGlvbmFsIE1ldGEgZm9yIEludGxpZnkgRGV2VG9vbHNcclxubGV0IF9hZGRpdGlvbmFsTWV0YSA9IG51bGw7XHJcbmNvbnN0IHNldEFkZGl0aW9uYWxNZXRhID0gIChtZXRhKSA9PiB7XHJcbiAgICBfYWRkaXRpb25hbE1ldGEgPSBtZXRhO1xyXG59O1xyXG5jb25zdCBnZXRBZGRpdGlvbmFsTWV0YSA9ICAoKSA9PiBfYWRkaXRpb25hbE1ldGE7XHJcbmxldCBfZmFsbGJhY2tDb250ZXh0ID0gbnVsbDtcclxuY29uc3Qgc2V0RmFsbGJhY2tDb250ZXh0ID0gKGNvbnRleHQpID0+IHtcclxuICAgIF9mYWxsYmFja0NvbnRleHQgPSBjb250ZXh0O1xyXG59O1xyXG5jb25zdCBnZXRGYWxsYmFja0NvbnRleHQgPSAoKSA9PiBfZmFsbGJhY2tDb250ZXh0O1xyXG4vLyBJRCBmb3IgQ29yZUNvbnRleHRcclxubGV0IF9jaWQgPSAwO1xyXG5mdW5jdGlvbiBjcmVhdGVDb3JlQ29udGV4dChvcHRpb25zID0ge30pIHtcclxuICAgIC8vIHNldHVwIG9wdGlvbnNcclxuICAgIGNvbnN0IHZlcnNpb24gPSBpc1N0cmluZyhvcHRpb25zLnZlcnNpb24pID8gb3B0aW9ucy52ZXJzaW9uIDogVkVSU0lPTjtcclxuICAgIGNvbnN0IGxvY2FsZSA9IGlzU3RyaW5nKG9wdGlvbnMubG9jYWxlKSA/IG9wdGlvbnMubG9jYWxlIDogREVGQVVMVF9MT0NBTEU7XHJcbiAgICBjb25zdCBmYWxsYmFja0xvY2FsZSA9IGlzQXJyYXkob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcclxuICAgICAgICBpc1BsYWluT2JqZWN0KG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XHJcbiAgICAgICAgaXNTdHJpbmcob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcclxuICAgICAgICBvcHRpb25zLmZhbGxiYWNrTG9jYWxlID09PSBmYWxzZVxyXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja0xvY2FsZVxyXG4gICAgICAgIDogbG9jYWxlO1xyXG4gICAgY29uc3QgbWVzc2FnZXMgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnMubWVzc2FnZXMpXHJcbiAgICAgICAgPyBvcHRpb25zLm1lc3NhZ2VzXHJcbiAgICAgICAgOiB7IFtsb2NhbGVdOiB7fSB9O1xyXG4gICAgY29uc3QgZGF0ZXRpbWVGb3JtYXRzID0gaXNQbGFpbk9iamVjdChvcHRpb25zLmRhdGV0aW1lRm9ybWF0cylcclxuICAgICAgICAgICAgPyBvcHRpb25zLmRhdGV0aW1lRm9ybWF0c1xyXG4gICAgICAgICAgICA6IHsgW2xvY2FsZV06IHt9IH1cclxuICAgICAgICA7XHJcbiAgICBjb25zdCBudW1iZXJGb3JtYXRzID0gaXNQbGFpbk9iamVjdChvcHRpb25zLm51bWJlckZvcm1hdHMpXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5udW1iZXJGb3JtYXRzXHJcbiAgICAgICAgICAgIDogeyBbbG9jYWxlXToge30gfVxyXG4gICAgICAgIDtcclxuICAgIGNvbnN0IG1vZGlmaWVycyA9IGFzc2lnbih7fSwgb3B0aW9ucy5tb2RpZmllcnMgfHwge30sIGdldERlZmF1bHRMaW5rZWRNb2RpZmllcnMoKSk7XHJcbiAgICBjb25zdCBwbHVyYWxSdWxlcyA9IG9wdGlvbnMucGx1cmFsUnVsZXMgfHwge307XHJcbiAgICBjb25zdCBtaXNzaW5nID0gaXNGdW5jdGlvbihvcHRpb25zLm1pc3NpbmcpID8gb3B0aW9ucy5taXNzaW5nIDogbnVsbDtcclxuICAgIGNvbnN0IG1pc3NpbmdXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMubWlzc2luZ1dhcm4pIHx8IGlzUmVnRXhwKG9wdGlvbnMubWlzc2luZ1dhcm4pXHJcbiAgICAgICAgPyBvcHRpb25zLm1pc3NpbmdXYXJuXHJcbiAgICAgICAgOiB0cnVlO1xyXG4gICAgY29uc3QgZmFsbGJhY2tXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tXYXJuKSB8fCBpc1JlZ0V4cChvcHRpb25zLmZhbGxiYWNrV2FybilcclxuICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tXYXJuXHJcbiAgICAgICAgOiB0cnVlO1xyXG4gICAgY29uc3QgZmFsbGJhY2tGb3JtYXQgPSAhIW9wdGlvbnMuZmFsbGJhY2tGb3JtYXQ7XHJcbiAgICBjb25zdCB1bnJlc29sdmluZyA9ICEhb3B0aW9ucy51bnJlc29sdmluZztcclxuICAgIGNvbnN0IHBvc3RUcmFuc2xhdGlvbiA9IGlzRnVuY3Rpb24ob3B0aW9ucy5wb3N0VHJhbnNsYXRpb24pXHJcbiAgICAgICAgPyBvcHRpb25zLnBvc3RUcmFuc2xhdGlvblxyXG4gICAgICAgIDogbnVsbDtcclxuICAgIGNvbnN0IHByb2Nlc3NvciA9IGlzUGxhaW5PYmplY3Qob3B0aW9ucy5wcm9jZXNzb3IpID8gb3B0aW9ucy5wcm9jZXNzb3IgOiBudWxsO1xyXG4gICAgY29uc3Qgd2Fybkh0bWxNZXNzYWdlID0gaXNCb29sZWFuKG9wdGlvbnMud2Fybkh0bWxNZXNzYWdlKVxyXG4gICAgICAgID8gb3B0aW9ucy53YXJuSHRtbE1lc3NhZ2VcclxuICAgICAgICA6IHRydWU7XHJcbiAgICBjb25zdCBlc2NhcGVQYXJhbWV0ZXIgPSAhIW9wdGlvbnMuZXNjYXBlUGFyYW1ldGVyO1xyXG4gICAgY29uc3QgbWVzc2FnZUNvbXBpbGVyID0gaXNGdW5jdGlvbihvcHRpb25zLm1lc3NhZ2VDb21waWxlcilcclxuICAgICAgICA/IG9wdGlvbnMubWVzc2FnZUNvbXBpbGVyXHJcbiAgICAgICAgOiBfY29tcGlsZXI7XHJcbiAgICBjb25zdCBtZXNzYWdlUmVzb2x2ZXIgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubWVzc2FnZVJlc29sdmVyKVxyXG4gICAgICAgID8gb3B0aW9ucy5tZXNzYWdlUmVzb2x2ZXJcclxuICAgICAgICA6IF9yZXNvbHZlciB8fCByZXNvbHZlV2l0aEtleVZhbHVlO1xyXG4gICAgY29uc3QgbG9jYWxlRmFsbGJhY2tlciA9IGlzRnVuY3Rpb24ob3B0aW9ucy5sb2NhbGVGYWxsYmFja2VyKVxyXG4gICAgICAgID8gb3B0aW9ucy5sb2NhbGVGYWxsYmFja2VyXHJcbiAgICAgICAgOiBfZmFsbGJhY2tlciB8fCBmYWxsYmFja1dpdGhTaW1wbGU7XHJcbiAgICBjb25zdCBmYWxsYmFja0NvbnRleHQgPSBpc09iamVjdChvcHRpb25zLmZhbGxiYWNrQ29udGV4dClcclxuICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tDb250ZXh0XHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICBjb25zdCBvbldhcm4gPSBpc0Z1bmN0aW9uKG9wdGlvbnMub25XYXJuKSA/IG9wdGlvbnMub25XYXJuIDogd2FybjtcclxuICAgIC8vIHNldHVwIGludGVybmFsIG9wdGlvbnNcclxuICAgIGNvbnN0IGludGVybmFsT3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICBjb25zdCBfX2RhdGV0aW1lRm9ybWF0dGVycyA9IGlzT2JqZWN0KGludGVybmFsT3B0aW9ucy5fX2RhdGV0aW1lRm9ybWF0dGVycylcclxuICAgICAgICAgICAgPyBpbnRlcm5hbE9wdGlvbnMuX19kYXRldGltZUZvcm1hdHRlcnNcclxuICAgICAgICAgICAgOiBuZXcgTWFwKClcclxuICAgICAgICA7XHJcbiAgICBjb25zdCBfX251bWJlckZvcm1hdHRlcnMgPSBpc09iamVjdChpbnRlcm5hbE9wdGlvbnMuX19udW1iZXJGb3JtYXR0ZXJzKVxyXG4gICAgICAgICAgICA/IGludGVybmFsT3B0aW9ucy5fX251bWJlckZvcm1hdHRlcnNcclxuICAgICAgICAgICAgOiBuZXcgTWFwKClcclxuICAgICAgICA7XHJcbiAgICBjb25zdCBfX21ldGEgPSBpc09iamVjdChpbnRlcm5hbE9wdGlvbnMuX19tZXRhKSA/IGludGVybmFsT3B0aW9ucy5fX21ldGEgOiB7fTtcclxuICAgIF9jaWQrKztcclxuICAgIGNvbnN0IGNvbnRleHQgPSB7XHJcbiAgICAgICAgdmVyc2lvbixcclxuICAgICAgICBjaWQ6IF9jaWQsXHJcbiAgICAgICAgbG9jYWxlLFxyXG4gICAgICAgIGZhbGxiYWNrTG9jYWxlLFxyXG4gICAgICAgIG1lc3NhZ2VzLFxyXG4gICAgICAgIG1vZGlmaWVycyxcclxuICAgICAgICBwbHVyYWxSdWxlcyxcclxuICAgICAgICBtaXNzaW5nLFxyXG4gICAgICAgIG1pc3NpbmdXYXJuLFxyXG4gICAgICAgIGZhbGxiYWNrV2FybixcclxuICAgICAgICBmYWxsYmFja0Zvcm1hdCxcclxuICAgICAgICB1bnJlc29sdmluZyxcclxuICAgICAgICBwb3N0VHJhbnNsYXRpb24sXHJcbiAgICAgICAgcHJvY2Vzc29yLFxyXG4gICAgICAgIHdhcm5IdG1sTWVzc2FnZSxcclxuICAgICAgICBlc2NhcGVQYXJhbWV0ZXIsXHJcbiAgICAgICAgbWVzc2FnZUNvbXBpbGVyLFxyXG4gICAgICAgIG1lc3NhZ2VSZXNvbHZlcixcclxuICAgICAgICBsb2NhbGVGYWxsYmFja2VyLFxyXG4gICAgICAgIGZhbGxiYWNrQ29udGV4dCxcclxuICAgICAgICBvbldhcm4sXHJcbiAgICAgICAgX19tZXRhXHJcbiAgICB9O1xyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHQuZGF0ZXRpbWVGb3JtYXRzID0gZGF0ZXRpbWVGb3JtYXRzO1xyXG4gICAgICAgIGNvbnRleHQubnVtYmVyRm9ybWF0cyA9IG51bWJlckZvcm1hdHM7XHJcbiAgICAgICAgY29udGV4dC5fX2RhdGV0aW1lRm9ybWF0dGVycyA9IF9fZGF0ZXRpbWVGb3JtYXR0ZXJzO1xyXG4gICAgICAgIGNvbnRleHQuX19udW1iZXJGb3JtYXR0ZXJzID0gX19udW1iZXJGb3JtYXR0ZXJzO1xyXG4gICAgfVxyXG4gICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxyXG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xyXG4gICAgICAgIGNvbnRleHQuX192X2VtaXR0ZXIgPVxyXG4gICAgICAgICAgICBpbnRlcm5hbE9wdGlvbnMuX192X2VtaXR0ZXIgIT0gbnVsbFxyXG4gICAgICAgICAgICAgICAgPyBpbnRlcm5hbE9wdGlvbnMuX192X2VtaXR0ZXJcclxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgLy8gTk9URTogZXhwZXJpbWVudGFsICEhXHJcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18pIHtcclxuICAgICAgICBpbml0STE4bkRldlRvb2xzKGNvbnRleHQsIHZlcnNpb24sIF9fbWV0YSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY29udGV4dDtcclxufVxyXG4vKiogQGludGVybmFsICovXHJcbmZ1bmN0aW9uIGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuKGZhbGxiYWNrLCBrZXkpIHtcclxuICAgIHJldHVybiBmYWxsYmFjayBpbnN0YW5jZW9mIFJlZ0V4cCA/IGZhbGxiYWNrLnRlc3Qoa2V5KSA6IGZhbGxiYWNrO1xyXG59XHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZnVuY3Rpb24gaXNUcmFuc2xhdGVNaXNzaW5nV2FybihtaXNzaW5nLCBrZXkpIHtcclxuICAgIHJldHVybiBtaXNzaW5nIGluc3RhbmNlb2YgUmVnRXhwID8gbWlzc2luZy50ZXN0KGtleSkgOiBtaXNzaW5nO1xyXG59XHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZnVuY3Rpb24gaGFuZGxlTWlzc2luZyhjb250ZXh0LCBrZXksIGxvY2FsZSwgbWlzc2luZ1dhcm4sIHR5cGUpIHtcclxuICAgIGNvbnN0IHsgbWlzc2luZywgb25XYXJuIH0gPSBjb250ZXh0O1xyXG4gICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxyXG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xyXG4gICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjb250ZXh0Ll9fdl9lbWl0dGVyO1xyXG4gICAgICAgIGlmIChlbWl0dGVyKSB7XHJcbiAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcIm1pc3NpbmdcIiAvKiBNSVNTSU5HICovLCB7XHJcbiAgICAgICAgICAgICAgICBsb2NhbGUsXHJcbiAgICAgICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogYCR7dHlwZX06JHtrZXl9YFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAobWlzc2luZyAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IG1pc3NpbmcoY29udGV4dCwgbG9jYWxlLCBrZXksIHR5cGUpO1xyXG4gICAgICAgIHJldHVybiBpc1N0cmluZyhyZXQpID8gcmV0IDoga2V5O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpc1RyYW5zbGF0ZU1pc3NpbmdXYXJuKG1pc3NpbmdXYXJuLCBrZXkpKSB7XHJcbiAgICAgICAgICAgIG9uV2FybihnZXRXYXJuTWVzc2FnZShDb3JlV2FybkNvZGVzLk5PVF9GT1VORF9LRVksIHsga2V5LCBsb2NhbGUgfSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ga2V5O1xyXG4gICAgfVxyXG59XHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZnVuY3Rpb24gdXBkYXRlRmFsbGJhY2tMb2NhbGUoY3R4LCBsb2NhbGUsIGZhbGxiYWNrKSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gY3R4O1xyXG4gICAgY29udGV4dC5fX2xvY2FsZUNoYWluQ2FjaGUgPSBuZXcgTWFwKCk7XHJcbiAgICBjdHgubG9jYWxlRmFsbGJhY2tlcihjdHgsIGZhbGxiYWNrLCBsb2NhbGUpO1xyXG59XHJcbi8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG5jb25zdCBSRV9IVE1MX1RBRyA9IC88XFwvP1tcXHdcXHM9XCIvLic6OyMtXFwvXSs+LztcclxuY29uc3QgV0FSTl9NRVNTQUdFID0gYERldGVjdGVkIEhUTUwgaW4gJ3tzb3VyY2V9JyBtZXNzYWdlLiBSZWNvbW1lbmQgbm90IHVzaW5nIEhUTUwgbWVzc2FnZXMgdG8gYXZvaWQgWFNTLmA7XHJcbmZ1bmN0aW9uIGNoZWNrSHRtbE1lc3NhZ2Uoc291cmNlLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCB3YXJuSHRtbE1lc3NhZ2UgPSBpc0Jvb2xlYW4ob3B0aW9ucy53YXJuSHRtbE1lc3NhZ2UpXHJcbiAgICAgICAgPyBvcHRpb25zLndhcm5IdG1sTWVzc2FnZVxyXG4gICAgICAgIDogdHJ1ZTtcclxuICAgIGlmICh3YXJuSHRtbE1lc3NhZ2UgJiYgUkVfSFRNTF9UQUcudGVzdChzb3VyY2UpKSB7XHJcbiAgICAgICAgd2Fybihmb3JtYXQoV0FSTl9NRVNTQUdFLCB7IHNvdXJjZSB9KSk7XHJcbiAgICB9XHJcbn1cclxuY29uc3QgZGVmYXVsdE9uQ2FjaGVLZXkgPSAoc291cmNlKSA9PiBzb3VyY2U7XHJcbmxldCBjb21waWxlQ2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xyXG5mdW5jdGlvbiBjbGVhckNvbXBpbGVDYWNoZSgpIHtcclxuICAgIGNvbXBpbGVDYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbn1cclxuZnVuY3Rpb24gY29tcGlsZVRvRnVuY3Rpb24oc291cmNlLCBvcHRpb25zID0ge30pIHtcclxuICAgIHtcclxuICAgICAgICAvLyBjaGVjayBIVE1MIG1lc3NhZ2VcclxuICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgY2hlY2tIdG1sTWVzc2FnZShzb3VyY2UsIG9wdGlvbnMpO1xyXG4gICAgICAgIC8vIGNoZWNrIGNhY2hlc1xyXG4gICAgICAgIGNvbnN0IG9uQ2FjaGVLZXkgPSBvcHRpb25zLm9uQ2FjaGVLZXkgfHwgZGVmYXVsdE9uQ2FjaGVLZXk7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gb25DYWNoZUtleShzb3VyY2UpO1xyXG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IGNvbXBpbGVDYWNoZVtrZXldO1xyXG4gICAgICAgIGlmIChjYWNoZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29tcGlsZSBlcnJvciBkZXRlY3RpbmdcclxuICAgICAgICBsZXQgb2NjdXJyZWQgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBvbkVycm9yID0gb3B0aW9ucy5vbkVycm9yIHx8IGRlZmF1bHRPbkVycm9yO1xyXG4gICAgICAgIG9wdGlvbnMub25FcnJvciA9IChlcnIpID0+IHtcclxuICAgICAgICAgICAgb2NjdXJyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBvbkVycm9yKGVycik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICAvLyBjb21waWxlXHJcbiAgICAgICAgY29uc3QgeyBjb2RlIH0gPSBiYXNlQ29tcGlsZShzb3VyY2UsIG9wdGlvbnMpO1xyXG4gICAgICAgIC8vIGV2YWx1YXRlIGZ1bmN0aW9uXHJcbiAgICAgICAgY29uc3QgbXNnID0gbmV3IEZ1bmN0aW9uKGByZXR1cm4gJHtjb2RlfWApKCk7XHJcbiAgICAgICAgLy8gaWYgb2NjdXJyZWQgY29tcGlsZSBlcnJvciwgZG9uJ3QgY2FjaGVcclxuICAgICAgICByZXR1cm4gIW9jY3VycmVkID8gKGNvbXBpbGVDYWNoZVtrZXldID0gbXNnKSA6IG1zZztcclxuICAgIH1cclxufVxuXG5sZXQgY29kZSA9IENvbXBpbGVFcnJvckNvZGVzLl9fRVhURU5EX1BPSU5UX187XHJcbmNvbnN0IGluYyA9ICgpID0+ICsrY29kZTtcclxuY29uc3QgQ29yZUVycm9yQ29kZXMgPSB7XHJcbiAgICBJTlZBTElEX0FSR1VNRU5UOiBjb2RlLFxyXG4gICAgSU5WQUxJRF9EQVRFX0FSR1VNRU5UOiBpbmMoKSxcclxuICAgIElOVkFMSURfSVNPX0RBVEVfQVJHVU1FTlQ6IGluYygpLFxyXG4gICAgX19FWFRFTkRfUE9JTlRfXzogaW5jKCkgLy8gMThcclxufTtcclxuZnVuY3Rpb24gY3JlYXRlQ29yZUVycm9yKGNvZGUpIHtcclxuICAgIHJldHVybiBjcmVhdGVDb21waWxlRXJyb3IoY29kZSwgbnVsbCwgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpID8geyBtZXNzYWdlczogZXJyb3JNZXNzYWdlcyB9IDogdW5kZWZpbmVkKTtcclxufVxyXG4vKiogQGludGVybmFsICovXHJcbmNvbnN0IGVycm9yTWVzc2FnZXMgPSB7XHJcbiAgICBbQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9BUkdVTUVOVF06ICdJbnZhbGlkIGFyZ3VtZW50cycsXHJcbiAgICBbQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9EQVRFX0FSR1VNRU5UXTogJ1RoZSBkYXRlIHByb3ZpZGVkIGlzIGFuIGludmFsaWQgRGF0ZSBvYmplY3QuJyArXHJcbiAgICAgICAgJ01ha2Ugc3VyZSB5b3VyIERhdGUgcmVwcmVzZW50cyBhIHZhbGlkIGRhdGUuJyxcclxuICAgIFtDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0lTT19EQVRFX0FSR1VNRU5UXTogJ1RoZSBhcmd1bWVudCBwcm92aWRlZCBpcyBub3QgYSB2YWxpZCBJU08gZGF0ZSBzdHJpbmcnXHJcbn07XG5cbmNvbnN0IE5PT1BfTUVTU0FHRV9GVU5DVElPTiA9ICgpID0+ICcnO1xyXG5jb25zdCBpc01lc3NhZ2VGdW5jdGlvbiA9ICh2YWwpID0+IGlzRnVuY3Rpb24odmFsKTtcclxuLy8gaW1wbGVtZW50YXRpb24gb2YgYHRyYW5zbGF0ZWAgZnVuY3Rpb25cclxuZnVuY3Rpb24gdHJhbnNsYXRlKGNvbnRleHQsIC4uLmFyZ3MpIHtcclxuICAgIGNvbnN0IHsgZmFsbGJhY2tGb3JtYXQsIHBvc3RUcmFuc2xhdGlvbiwgdW5yZXNvbHZpbmcsIG1lc3NhZ2VDb21waWxlciwgZmFsbGJhY2tMb2NhbGUsIG1lc3NhZ2VzIH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgW2tleSwgb3B0aW9uc10gPSBwYXJzZVRyYW5zbGF0ZUFyZ3MoLi4uYXJncyk7XHJcbiAgICBjb25zdCBtaXNzaW5nV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLm1pc3NpbmdXYXJuKVxyXG4gICAgICAgID8gb3B0aW9ucy5taXNzaW5nV2FyblxyXG4gICAgICAgIDogY29udGV4dC5taXNzaW5nV2FybjtcclxuICAgIGNvbnN0IGZhbGxiYWNrV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLmZhbGxiYWNrV2FybilcclxuICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tXYXJuXHJcbiAgICAgICAgOiBjb250ZXh0LmZhbGxiYWNrV2FybjtcclxuICAgIGNvbnN0IGVzY2FwZVBhcmFtZXRlciA9IGlzQm9vbGVhbihvcHRpb25zLmVzY2FwZVBhcmFtZXRlcilcclxuICAgICAgICA/IG9wdGlvbnMuZXNjYXBlUGFyYW1ldGVyXHJcbiAgICAgICAgOiBjb250ZXh0LmVzY2FwZVBhcmFtZXRlcjtcclxuICAgIGNvbnN0IHJlc29sdmVkTWVzc2FnZSA9ICEhb3B0aW9ucy5yZXNvbHZlZE1lc3NhZ2U7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IGRlZmF1bHRNc2dPcktleSA9IGlzU3RyaW5nKG9wdGlvbnMuZGVmYXVsdCkgfHwgaXNCb29sZWFuKG9wdGlvbnMuZGVmYXVsdCkgLy8gZGVmYXVsdCBieSBmdW5jdGlvbiBvcHRpb25cclxuICAgICAgICA/ICFpc0Jvb2xlYW4ob3B0aW9ucy5kZWZhdWx0KVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMuZGVmYXVsdFxyXG4gICAgICAgICAgICA6ICghbWVzc2FnZUNvbXBpbGVyID8gKCkgPT4ga2V5IDoga2V5KVxyXG4gICAgICAgIDogZmFsbGJhY2tGb3JtYXQgLy8gZGVmYXVsdCBieSBgZmFsbGJhY2tGb3JtYXRgIG9wdGlvblxyXG4gICAgICAgICAgICA/ICghbWVzc2FnZUNvbXBpbGVyID8gKCkgPT4ga2V5IDoga2V5KVxyXG4gICAgICAgICAgICA6ICcnO1xyXG4gICAgY29uc3QgZW5hYmxlRGVmYXVsdE1zZyA9IGZhbGxiYWNrRm9ybWF0IHx8IGRlZmF1bHRNc2dPcktleSAhPT0gJyc7XHJcbiAgICBjb25zdCBsb2NhbGUgPSBpc1N0cmluZyhvcHRpb25zLmxvY2FsZSkgPyBvcHRpb25zLmxvY2FsZSA6IGNvbnRleHQubG9jYWxlO1xyXG4gICAgLy8gZXNjYXBlIHBhcmFtc1xyXG4gICAgZXNjYXBlUGFyYW1ldGVyICYmIGVzY2FwZVBhcmFtcyhvcHRpb25zKTtcclxuICAgIC8vIHJlc29sdmUgbWVzc2FnZSBmb3JtYXRcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItY29uc3RcclxuICAgIGxldCBbZm9ybWF0U2NvcGUsIHRhcmdldExvY2FsZSwgbWVzc2FnZV0gPSAhcmVzb2x2ZWRNZXNzYWdlXHJcbiAgICAgICAgPyByZXNvbHZlTWVzc2FnZUZvcm1hdChjb250ZXh0LCBrZXksIGxvY2FsZSwgZmFsbGJhY2tMb2NhbGUsIGZhbGxiYWNrV2FybiwgbWlzc2luZ1dhcm4pXHJcbiAgICAgICAgOiBbXHJcbiAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgbG9jYWxlLFxyXG4gICAgICAgICAgICBtZXNzYWdlc1tsb2NhbGVdIHx8IHt9XHJcbiAgICAgICAgXTtcclxuICAgIC8vIE5PVEU6XHJcbiAgICAvLyAgRml4IHRvIHdvcmsgYXJvdW5kIGBzc3JUcmFuc2Zyb21gIGJ1ZyBpbiBWaXRlLlxyXG4gICAgLy8gIGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS9pc3N1ZXMvNDMwNlxyXG4gICAgLy8gIFRvIGdldCBhcm91bmQgdGhpcywgdXNlIHRlbXBvcmFyeSB2YXJpYWJsZXMuXHJcbiAgICAvLyAgaHR0cHM6Ly9naXRodWIuY29tL251eHQvZnJhbWV3b3JrL2lzc3Vlcy8xNDYxI2lzc3VlY29tbWVudC05NTQ2MDYyNDNcclxuICAgIGxldCBmb3JtYXQgPSBmb3JtYXRTY29wZTtcclxuICAgIC8vIGlmIHlvdSB1c2UgZGVmYXVsdCBtZXNzYWdlLCBzZXQgaXQgYXMgbWVzc2FnZSBmb3JtYXQhXHJcbiAgICBsZXQgY2FjaGVCYXNlS2V5ID0ga2V5O1xyXG4gICAgaWYgKCFyZXNvbHZlZE1lc3NhZ2UgJiZcclxuICAgICAgICAhKGlzU3RyaW5nKGZvcm1hdCkgfHwgaXNNZXNzYWdlRnVuY3Rpb24oZm9ybWF0KSkpIHtcclxuICAgICAgICBpZiAoZW5hYmxlRGVmYXVsdE1zZykge1xyXG4gICAgICAgICAgICBmb3JtYXQgPSBkZWZhdWx0TXNnT3JLZXk7XHJcbiAgICAgICAgICAgIGNhY2hlQmFzZUtleSA9IGZvcm1hdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBjaGVja2luZyBtZXNzYWdlIGZvcm1hdCBhbmQgdGFyZ2V0IGxvY2FsZVxyXG4gICAgaWYgKCFyZXNvbHZlZE1lc3NhZ2UgJiZcclxuICAgICAgICAoIShpc1N0cmluZyhmb3JtYXQpIHx8IGlzTWVzc2FnZUZ1bmN0aW9uKGZvcm1hdCkpIHx8XHJcbiAgICAgICAgICAgICFpc1N0cmluZyh0YXJnZXRMb2NhbGUpKSkge1xyXG4gICAgICAgIHJldHVybiB1bnJlc29sdmluZyA/IE5PVF9SRU9TTFZFRCA6IGtleTtcclxuICAgIH1cclxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgaXNTdHJpbmcoZm9ybWF0KSAmJiBjb250ZXh0Lm1lc3NhZ2VDb21waWxlciA9PSBudWxsKSB7XHJcbiAgICAgICAgd2FybihgVGhlIG1lc3NhZ2UgZm9ybWF0IGNvbXBpbGF0aW9uIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBidWlsZC4gYCArXHJcbiAgICAgICAgICAgIGBCZWNhdXNlIG1lc3NhZ2UgY29tcGlsZXIgaXNuJ3QgaW5jbHVkZWQuIGAgK1xyXG4gICAgICAgICAgICBgWW91IG5lZWQgdG8gcHJlLWNvbXBpbGF0aW9uIGFsbCBtZXNzYWdlIGZvcm1hdC4gYCArXHJcbiAgICAgICAgICAgIGBTbyB0cmFuc2xhdGUgZnVuY3Rpb24gcmV0dXJuICcke2tleX0nLmApO1xyXG4gICAgICAgIHJldHVybiBrZXk7XHJcbiAgICB9XHJcbiAgICAvLyBzZXR1cCBjb21waWxlIGVycm9yIGRldGVjdGluZ1xyXG4gICAgbGV0IG9jY3VycmVkID0gZmFsc2U7XHJcbiAgICBjb25zdCBlcnJvckRldGVjdG9yID0gKCkgPT4ge1xyXG4gICAgICAgIG9jY3VycmVkID0gdHJ1ZTtcclxuICAgIH07XHJcbiAgICAvLyBjb21waWxlIG1lc3NhZ2UgZm9ybWF0XHJcbiAgICBjb25zdCBtc2cgPSAhaXNNZXNzYWdlRnVuY3Rpb24oZm9ybWF0KVxyXG4gICAgICAgID8gY29tcGlsZU1lc3NhZ2VGb3JtYXQoY29udGV4dCwga2V5LCB0YXJnZXRMb2NhbGUsIGZvcm1hdCwgY2FjaGVCYXNlS2V5LCBlcnJvckRldGVjdG9yKVxyXG4gICAgICAgIDogZm9ybWF0O1xyXG4gICAgLy8gaWYgb2NjdXJyZWQgY29tcGlsZSBlcnJvciwgcmV0dXJuIHRoZSBtZXNzYWdlIGZvcm1hdFxyXG4gICAgaWYgKG9jY3VycmVkKSB7XHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdDtcclxuICAgIH1cclxuICAgIC8vIGV2YWx1YXRlIG1lc3NhZ2Ugd2l0aCBjb250ZXh0XHJcbiAgICBjb25zdCBjdHhPcHRpb25zID0gZ2V0TWVzc2FnZUNvbnRleHRPcHRpb25zKGNvbnRleHQsIHRhcmdldExvY2FsZSwgbWVzc2FnZSwgb3B0aW9ucyk7XHJcbiAgICBjb25zdCBtc2dDb250ZXh0ID0gY3JlYXRlTWVzc2FnZUNvbnRleHQoY3R4T3B0aW9ucyk7XHJcbiAgICBjb25zdCBtZXNzYWdlZCA9IGV2YWx1YXRlTWVzc2FnZShjb250ZXh0LCBtc2csIG1zZ0NvbnRleHQpO1xyXG4gICAgLy8gaWYgdXNlIHBvc3QgdHJhbnNsYXRpb24gb3B0aW9uLCBwcm9jZWVkIGl0IHdpdGggaGFuZGxlclxyXG4gICAgY29uc3QgcmV0ID0gcG9zdFRyYW5zbGF0aW9uXHJcbiAgICAgICAgPyBwb3N0VHJhbnNsYXRpb24obWVzc2FnZWQsIGtleSlcclxuICAgICAgICA6IG1lc3NhZ2VkO1xyXG4gICAgLy8gTk9URTogZXhwZXJpbWVudGFsICEhXHJcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18pIHtcclxuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgICAgICBjb25zdCBwYXlsb2FkcyA9IHtcclxuICAgICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgICBrZXk6IGlzU3RyaW5nKGtleSlcclxuICAgICAgICAgICAgICAgID8ga2V5XHJcbiAgICAgICAgICAgICAgICA6IGlzTWVzc2FnZUZ1bmN0aW9uKGZvcm1hdClcclxuICAgICAgICAgICAgICAgICAgICA/IGZvcm1hdC5rZXlcclxuICAgICAgICAgICAgICAgICAgICA6ICcnLFxyXG4gICAgICAgICAgICBsb2NhbGU6IHRhcmdldExvY2FsZSB8fCAoaXNNZXNzYWdlRnVuY3Rpb24oZm9ybWF0KVxyXG4gICAgICAgICAgICAgICAgPyBmb3JtYXQubG9jYWxlXHJcbiAgICAgICAgICAgICAgICA6ICcnKSxcclxuICAgICAgICAgICAgZm9ybWF0OiBpc1N0cmluZyhmb3JtYXQpXHJcbiAgICAgICAgICAgICAgICA/IGZvcm1hdFxyXG4gICAgICAgICAgICAgICAgOiBpc01lc3NhZ2VGdW5jdGlvbihmb3JtYXQpXHJcbiAgICAgICAgICAgICAgICAgICAgPyBmb3JtYXQuc291cmNlXHJcbiAgICAgICAgICAgICAgICAgICAgOiAnJyxcclxuICAgICAgICAgICAgbWVzc2FnZTogcmV0XHJcbiAgICAgICAgfTtcclxuICAgICAgICBwYXlsb2Fkcy5tZXRhID0gYXNzaWduKHt9LCBjb250ZXh0Ll9fbWV0YSwgZ2V0QWRkaXRpb25hbE1ldGEoKSB8fCB7fSk7XHJcbiAgICAgICAgdHJhbnNsYXRlRGV2VG9vbHMocGF5bG9hZHMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldDtcclxufVxyXG5mdW5jdGlvbiBlc2NhcGVQYXJhbXMob3B0aW9ucykge1xyXG4gICAgaWYgKGlzQXJyYXkob3B0aW9ucy5saXN0KSkge1xyXG4gICAgICAgIG9wdGlvbnMubGlzdCA9IG9wdGlvbnMubGlzdC5tYXAoaXRlbSA9PiBpc1N0cmluZyhpdGVtKSA/IGVzY2FwZUh0bWwoaXRlbSkgOiBpdGVtKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzT2JqZWN0KG9wdGlvbnMubmFtZWQpKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXMob3B0aW9ucy5uYW1lZCkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcob3B0aW9ucy5uYW1lZFtrZXldKSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5uYW1lZFtrZXldID0gZXNjYXBlSHRtbChvcHRpb25zLm5hbWVkW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcmVzb2x2ZU1lc3NhZ2VGb3JtYXQoY29udGV4dCwga2V5LCBsb2NhbGUsIGZhbGxiYWNrTG9jYWxlLCBmYWxsYmFja1dhcm4sIG1pc3NpbmdXYXJuKSB7XHJcbiAgICBjb25zdCB7IG1lc3NhZ2VzLCBvbldhcm4sIG1lc3NhZ2VSZXNvbHZlcjogcmVzb2x2ZVZhbHVlLCBsb2NhbGVGYWxsYmFja2VyIH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgbG9jYWxlcyA9IGxvY2FsZUZhbGxiYWNrZXIoY29udGV4dCwgZmFsbGJhY2tMb2NhbGUsIGxvY2FsZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgbGV0IG1lc3NhZ2UgPSB7fTtcclxuICAgIGxldCB0YXJnZXRMb2NhbGU7XHJcbiAgICBsZXQgZm9ybWF0ID0gbnVsbDtcclxuICAgIGxldCBmcm9tID0gbG9jYWxlO1xyXG4gICAgbGV0IHRvID0gbnVsbDtcclxuICAgIGNvbnN0IHR5cGUgPSAndHJhbnNsYXRlJztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9jYWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRhcmdldExvY2FsZSA9IHRvID0gbG9jYWxlc1tpXTtcclxuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmXHJcbiAgICAgICAgICAgIGxvY2FsZSAhPT0gdGFyZ2V0TG9jYWxlICYmXHJcbiAgICAgICAgICAgIGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuKGZhbGxiYWNrV2Fybiwga2V5KSkge1xyXG4gICAgICAgICAgICBvbldhcm4oZ2V0V2Fybk1lc3NhZ2UoQ29yZVdhcm5Db2Rlcy5GQUxMQkFDS19UT19UUkFOU0xBVEUsIHtcclxuICAgICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0TG9jYWxlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxyXG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgbG9jYWxlICE9PSB0YXJnZXRMb2NhbGUpIHtcclxuICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IGNvbnRleHQuX192X2VtaXR0ZXI7XHJcbiAgICAgICAgICAgIGlmIChlbWl0dGVyKSB7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoXCJmYWxsYmFja1wiIC8qIEZBTEJBQ0sgKi8sIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICAgICAgICBmcm9tLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGAke3R5cGV9OiR7a2V5fWBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1lc3NhZ2UgPVxyXG4gICAgICAgICAgICBtZXNzYWdlc1t0YXJnZXRMb2NhbGVdIHx8IHt9O1xyXG4gICAgICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcclxuICAgICAgICBsZXQgc3RhcnQgPSBudWxsO1xyXG4gICAgICAgIGxldCBzdGFydFRhZztcclxuICAgICAgICBsZXQgZW5kVGFnO1xyXG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgaW5Ccm93c2VyKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgICAgICBzdGFydFRhZyA9ICdpbnRsaWZ5LW1lc3NhZ2UtcmVzb2x2ZS1zdGFydCc7XHJcbiAgICAgICAgICAgIGVuZFRhZyA9ICdpbnRsaWZ5LW1lc3NhZ2UtcmVzb2x2ZS1lbmQnO1xyXG4gICAgICAgICAgICBtYXJrICYmIG1hcmsoc3RhcnRUYWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKGZvcm1hdCA9IHJlc29sdmVWYWx1ZShtZXNzYWdlLCBrZXkpKSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAvLyBpZiBudWxsLCByZXNvbHZlIHdpdGggb2JqZWN0IGtleSBwYXRoXHJcbiAgICAgICAgICAgIGZvcm1hdCA9IG1lc3NhZ2Vba2V5XTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcclxuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGluQnJvd3Nlcikge1xyXG4gICAgICAgICAgICBjb25zdCBlbmQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjb250ZXh0Ll9fdl9lbWl0dGVyO1xyXG4gICAgICAgICAgICBpZiAoZW1pdHRlciAmJiBzdGFydCAmJiBmb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcIm1lc3NhZ2UtcmVzb2x2ZVwiIC8qIE1FU1NBR0VfUkVTT0xWRSAqLywge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwibWVzc2FnZS1yZXNvbHZlXCIgLyogTUVTU0FHRV9SRVNPTFZFICovLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBmb3JtYXQsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZTogZW5kIC0gc3RhcnQsXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogYCR7dHlwZX06JHtrZXl9YFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHN0YXJ0VGFnICYmIGVuZFRhZyAmJiBtYXJrICYmIG1lYXN1cmUpIHtcclxuICAgICAgICAgICAgICAgIG1hcmsoZW5kVGFnKTtcclxuICAgICAgICAgICAgICAgIG1lYXN1cmUoJ2ludGxpZnkgbWVzc2FnZSByZXNvbHZlJywgc3RhcnRUYWcsIGVuZFRhZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKGZvcm1hdCkgfHwgaXNGdW5jdGlvbihmb3JtYXQpKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjb25zdCBtaXNzaW5nUmV0ID0gaGFuZGxlTWlzc2luZyhjb250ZXh0LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICBrZXksIHRhcmdldExvY2FsZSwgbWlzc2luZ1dhcm4sIHR5cGUpO1xyXG4gICAgICAgIGlmIChtaXNzaW5nUmV0ICE9PSBrZXkpIHtcclxuICAgICAgICAgICAgZm9ybWF0ID0gbWlzc2luZ1JldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnJvbSA9IHRvO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtmb3JtYXQsIHRhcmdldExvY2FsZSwgbWVzc2FnZV07XHJcbn1cclxuZnVuY3Rpb24gY29tcGlsZU1lc3NhZ2VGb3JtYXQoY29udGV4dCwga2V5LCB0YXJnZXRMb2NhbGUsIGZvcm1hdCwgY2FjaGVCYXNlS2V5LCBlcnJvckRldGVjdG9yKSB7XHJcbiAgICBjb25zdCB7IG1lc3NhZ2VDb21waWxlciwgd2Fybkh0bWxNZXNzYWdlIH0gPSBjb250ZXh0O1xyXG4gICAgaWYgKGlzTWVzc2FnZUZ1bmN0aW9uKGZvcm1hdCkpIHtcclxuICAgICAgICBjb25zdCBtc2cgPSBmb3JtYXQ7XHJcbiAgICAgICAgbXNnLmxvY2FsZSA9IG1zZy5sb2NhbGUgfHwgdGFyZ2V0TG9jYWxlO1xyXG4gICAgICAgIG1zZy5rZXkgPSBtc2cua2V5IHx8IGtleTtcclxuICAgICAgICByZXR1cm4gbXNnO1xyXG4gICAgfVxyXG4gICAgaWYgKG1lc3NhZ2VDb21waWxlciA9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgbXNnID0gKCgpID0+IGZvcm1hdCk7XHJcbiAgICAgICAgbXNnLmxvY2FsZSA9IHRhcmdldExvY2FsZTtcclxuICAgICAgICBtc2cua2V5ID0ga2V5O1xyXG4gICAgICAgIHJldHVybiBtc2c7XHJcbiAgICB9XHJcbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XHJcbiAgICBsZXQgc3RhcnQgPSBudWxsO1xyXG4gICAgbGV0IHN0YXJ0VGFnO1xyXG4gICAgbGV0IGVuZFRhZztcclxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgaW5Ccm93c2VyKSB7XHJcbiAgICAgICAgc3RhcnQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgc3RhcnRUYWcgPSAnaW50bGlmeS1tZXNzYWdlLWNvbXBpbGF0aW9uLXN0YXJ0JztcclxuICAgICAgICBlbmRUYWcgPSAnaW50bGlmeS1tZXNzYWdlLWNvbXBpbGF0aW9uLWVuZCc7XHJcbiAgICAgICAgbWFyayAmJiBtYXJrKHN0YXJ0VGFnKTtcclxuICAgIH1cclxuICAgIGNvbnN0IG1zZyA9IG1lc3NhZ2VDb21waWxlcihmb3JtYXQsIGdldENvbXBpbGVPcHRpb25zKGNvbnRleHQsIHRhcmdldExvY2FsZSwgY2FjaGVCYXNlS2V5LCBmb3JtYXQsIHdhcm5IdG1sTWVzc2FnZSwgZXJyb3JEZXRlY3RvcikpO1xyXG4gICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxyXG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpbkJyb3dzZXIpIHtcclxuICAgICAgICBjb25zdCBlbmQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgY29uc3QgZW1pdHRlciA9IGNvbnRleHQuX192X2VtaXR0ZXI7XHJcbiAgICAgICAgaWYgKGVtaXR0ZXIgJiYgc3RhcnQpIHtcclxuICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwibWVzc2FnZS1jb21waWxhdGlvblwiIC8qIE1FU1NBR0VfQ09NUElMQVRJT04gKi8sIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwibWVzc2FnZS1jb21waWxhdGlvblwiIC8qIE1FU1NBR0VfQ09NUElMQVRJT04gKi8sXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBmb3JtYXQsXHJcbiAgICAgICAgICAgICAgICB0aW1lOiBlbmQgLSBzdGFydCxcclxuICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGAkeyd0cmFuc2xhdGUnfToke2tleX1gXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhcnRUYWcgJiYgZW5kVGFnICYmIG1hcmsgJiYgbWVhc3VyZSkge1xyXG4gICAgICAgICAgICBtYXJrKGVuZFRhZyk7XHJcbiAgICAgICAgICAgIG1lYXN1cmUoJ2ludGxpZnkgbWVzc2FnZSBjb21waWxhdGlvbicsIHN0YXJ0VGFnLCBlbmRUYWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG1zZy5sb2NhbGUgPSB0YXJnZXRMb2NhbGU7XHJcbiAgICBtc2cua2V5ID0ga2V5O1xyXG4gICAgbXNnLnNvdXJjZSA9IGZvcm1hdDtcclxuICAgIHJldHVybiBtc2c7XHJcbn1cclxuZnVuY3Rpb24gZXZhbHVhdGVNZXNzYWdlKGNvbnRleHQsIG1zZywgbXNnQ3R4KSB7XHJcbiAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XHJcbiAgICBsZXQgc3RhcnQgPSBudWxsO1xyXG4gICAgbGV0IHN0YXJ0VGFnO1xyXG4gICAgbGV0IGVuZFRhZztcclxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgaW5Ccm93c2VyKSB7XHJcbiAgICAgICAgc3RhcnQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgc3RhcnRUYWcgPSAnaW50bGlmeS1tZXNzYWdlLWV2YWx1YXRpb24tc3RhcnQnO1xyXG4gICAgICAgIGVuZFRhZyA9ICdpbnRsaWZ5LW1lc3NhZ2UtZXZhbHVhdGlvbi1lbmQnO1xyXG4gICAgICAgIG1hcmsgJiYgbWFyayhzdGFydFRhZyk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXNzYWdlZCA9IG1zZyhtc2dDdHgpO1xyXG4gICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxyXG4gICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBpbkJyb3dzZXIpIHtcclxuICAgICAgICBjb25zdCBlbmQgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgY29uc3QgZW1pdHRlciA9IGNvbnRleHQuX192X2VtaXR0ZXI7XHJcbiAgICAgICAgaWYgKGVtaXR0ZXIgJiYgc3RhcnQpIHtcclxuICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwibWVzc2FnZS1ldmFsdWF0aW9uXCIgLyogTUVTU0FHRV9FVkFMVUFUSU9OICovLCB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2UtZXZhbHVhdGlvblwiIC8qIE1FU1NBR0VfRVZBTFVBVElPTiAqLyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBtZXNzYWdlZCxcclxuICAgICAgICAgICAgICAgIHRpbWU6IGVuZCAtIHN0YXJ0LFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogYCR7J3RyYW5zbGF0ZSd9OiR7bXNnLmtleX1gXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc3RhcnRUYWcgJiYgZW5kVGFnICYmIG1hcmsgJiYgbWVhc3VyZSkge1xyXG4gICAgICAgICAgICBtYXJrKGVuZFRhZyk7XHJcbiAgICAgICAgICAgIG1lYXN1cmUoJ2ludGxpZnkgbWVzc2FnZSBldmFsdWF0aW9uJywgc3RhcnRUYWcsIGVuZFRhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1lc3NhZ2VkO1xyXG59XHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuZnVuY3Rpb24gcGFyc2VUcmFuc2xhdGVBcmdzKC4uLmFyZ3MpIHtcclxuICAgIGNvbnN0IFthcmcxLCBhcmcyLCBhcmczXSA9IGFyZ3M7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge307XHJcbiAgICBpZiAoIWlzU3RyaW5nKGFyZzEpICYmICFpc051bWJlcihhcmcxKSAmJiAhaXNNZXNzYWdlRnVuY3Rpb24oYXJnMSkpIHtcclxuICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9BUkdVTUVOVCk7XHJcbiAgICB9XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IGtleSA9IGlzTnVtYmVyKGFyZzEpXHJcbiAgICAgICAgPyBTdHJpbmcoYXJnMSlcclxuICAgICAgICA6IGlzTWVzc2FnZUZ1bmN0aW9uKGFyZzEpXHJcbiAgICAgICAgICAgID8gYXJnMVxyXG4gICAgICAgICAgICA6IGFyZzE7XHJcbiAgICBpZiAoaXNOdW1iZXIoYXJnMikpIHtcclxuICAgICAgICBvcHRpb25zLnBsdXJhbCA9IGFyZzI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1N0cmluZyhhcmcyKSkge1xyXG4gICAgICAgIG9wdGlvbnMuZGVmYXVsdCA9IGFyZzI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzIpICYmICFpc0VtcHR5T2JqZWN0KGFyZzIpKSB7XHJcbiAgICAgICAgb3B0aW9ucy5uYW1lZCA9IGFyZzI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc0FycmF5KGFyZzIpKSB7XHJcbiAgICAgICAgb3B0aW9ucy5saXN0ID0gYXJnMjtcclxuICAgIH1cclxuICAgIGlmIChpc051bWJlcihhcmczKSkge1xyXG4gICAgICAgIG9wdGlvbnMucGx1cmFsID0gYXJnMztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzU3RyaW5nKGFyZzMpKSB7XHJcbiAgICAgICAgb3B0aW9ucy5kZWZhdWx0ID0gYXJnMztcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMykpIHtcclxuICAgICAgICBhc3NpZ24ob3B0aW9ucywgYXJnMyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW2tleSwgb3B0aW9uc107XHJcbn1cclxuZnVuY3Rpb24gZ2V0Q29tcGlsZU9wdGlvbnMoY29udGV4dCwgbG9jYWxlLCBrZXksIHNvdXJjZSwgd2Fybkh0bWxNZXNzYWdlLCBlcnJvckRldGVjdG9yKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHdhcm5IdG1sTWVzc2FnZSxcclxuICAgICAgICBvbkVycm9yOiAoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgIGVycm9yRGV0ZWN0b3IgJiYgZXJyb3JEZXRlY3RvcihlcnIpO1xyXG4gICAgICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gYE1lc3NhZ2UgY29tcGlsYXRpb24gZXJyb3I6ICR7ZXJyLm1lc3NhZ2V9YDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvZGVGcmFtZSA9IGVyci5sb2NhdGlvbiAmJlxyXG4gICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlQ29kZUZyYW1lKHNvdXJjZSwgZXJyLmxvY2F0aW9uLnN0YXJ0Lm9mZnNldCwgZXJyLmxvY2F0aW9uLmVuZC5vZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IGNvbnRleHQuX192X2VtaXR0ZXI7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW1pdHRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGVtaXR0ZXIuZW1pdChcImNvbXBpbGUtZXJyb3JcIiAvKiBDT01QSUxFX0VSUk9SICovLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHNvdXJjZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZXJyLmxvY2F0aW9uICYmIGVyci5sb2NhdGlvbi5zdGFydC5vZmZzZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogZXJyLmxvY2F0aW9uICYmIGVyci5sb2NhdGlvbi5lbmQub2Zmc2V0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiBgJHsndHJhbnNsYXRlJ306JHtrZXl9YFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihjb2RlRnJhbWUgPyBgJHttZXNzYWdlfVxcbiR7Y29kZUZyYW1lfWAgOiBtZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGVycjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25DYWNoZUtleTogKHNvdXJjZSkgPT4gZ2VuZXJhdGVGb3JtYXRDYWNoZUtleShsb2NhbGUsIGtleSwgc291cmNlKVxyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBnZXRNZXNzYWdlQ29udGV4dE9wdGlvbnMoY29udGV4dCwgbG9jYWxlLCBtZXNzYWdlLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCB7IG1vZGlmaWVycywgcGx1cmFsUnVsZXMsIG1lc3NhZ2VSZXNvbHZlcjogcmVzb2x2ZVZhbHVlLCBmYWxsYmFja0xvY2FsZSwgZmFsbGJhY2tXYXJuLCBtaXNzaW5nV2FybiwgZmFsbGJhY2tDb250ZXh0IH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgcmVzb2x2ZU1lc3NhZ2UgPSAoa2V5KSA9PiB7XHJcbiAgICAgICAgbGV0IHZhbCA9IHJlc29sdmVWYWx1ZShtZXNzYWdlLCBrZXkpO1xyXG4gICAgICAgIC8vIGZhbGxiYWNrIHRvIHJvb3QgY29udGV4dFxyXG4gICAgICAgIGlmICh2YWwgPT0gbnVsbCAmJiBmYWxsYmFja0NvbnRleHQpIHtcclxuICAgICAgICAgICAgY29uc3QgWywgLCBtZXNzYWdlXSA9IHJlc29sdmVNZXNzYWdlRm9ybWF0KGZhbGxiYWNrQ29udGV4dCwga2V5LCBsb2NhbGUsIGZhbGxiYWNrTG9jYWxlLCBmYWxsYmFja1dhcm4sIG1pc3NpbmdXYXJuKTtcclxuICAgICAgICAgICAgdmFsID0gcmVzb2x2ZVZhbHVlKG1lc3NhZ2UsIGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc1N0cmluZyh2YWwpKSB7XHJcbiAgICAgICAgICAgIGxldCBvY2N1cnJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvckRldGVjdG9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgb2NjdXJyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCBtc2cgPSBjb21waWxlTWVzc2FnZUZvcm1hdChjb250ZXh0LCBrZXksIGxvY2FsZSwgdmFsLCBrZXksIGVycm9yRGV0ZWN0b3IpO1xyXG4gICAgICAgICAgICByZXR1cm4gIW9jY3VycmVkXHJcbiAgICAgICAgICAgICAgICA/IG1zZ1xyXG4gICAgICAgICAgICAgICAgOiBOT09QX01FU1NBR0VfRlVOQ1RJT047XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlzTWVzc2FnZUZ1bmN0aW9uKHZhbCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IHNob3VsZCBiZSBpbXBsZW1lbnRlZCB3YXJuaW5nIG1lc3NhZ2VcclxuICAgICAgICAgICAgcmV0dXJuIE5PT1BfTUVTU0FHRV9GVU5DVElPTjtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3QgY3R4T3B0aW9ucyA9IHtcclxuICAgICAgICBsb2NhbGUsXHJcbiAgICAgICAgbW9kaWZpZXJzLFxyXG4gICAgICAgIHBsdXJhbFJ1bGVzLFxyXG4gICAgICAgIG1lc3NhZ2VzOiByZXNvbHZlTWVzc2FnZVxyXG4gICAgfTtcclxuICAgIGlmIChjb250ZXh0LnByb2Nlc3Nvcikge1xyXG4gICAgICAgIGN0eE9wdGlvbnMucHJvY2Vzc29yID0gY29udGV4dC5wcm9jZXNzb3I7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucy5saXN0KSB7XHJcbiAgICAgICAgY3R4T3B0aW9ucy5saXN0ID0gb3B0aW9ucy5saXN0O1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMubmFtZWQpIHtcclxuICAgICAgICBjdHhPcHRpb25zLm5hbWVkID0gb3B0aW9ucy5uYW1lZDtcclxuICAgIH1cclxuICAgIGlmIChpc051bWJlcihvcHRpb25zLnBsdXJhbCkpIHtcclxuICAgICAgICBjdHhPcHRpb25zLnBsdXJhbEluZGV4ID0gb3B0aW9ucy5wbHVyYWw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY3R4T3B0aW9ucztcclxufVxuXG5jb25zdCBpbnRsRGVmaW5lZCA9IHR5cGVvZiBJbnRsICE9PSAndW5kZWZpbmVkJztcclxuY29uc3QgQXZhaWxhYmlsaXRpZXMgPSB7XHJcbiAgICBkYXRlVGltZUZvcm1hdDogaW50bERlZmluZWQgJiYgdHlwZW9mIEludGwuRGF0ZVRpbWVGb3JtYXQgIT09ICd1bmRlZmluZWQnLFxyXG4gICAgbnVtYmVyRm9ybWF0OiBpbnRsRGVmaW5lZCAmJiB0eXBlb2YgSW50bC5OdW1iZXJGb3JtYXQgIT09ICd1bmRlZmluZWQnXHJcbn07XG5cbi8vIGltcGxlbWVudGF0aW9uIG9mIGBkYXRldGltZWAgZnVuY3Rpb25cclxuZnVuY3Rpb24gZGF0ZXRpbWUoY29udGV4dCwgLi4uYXJncykge1xyXG4gICAgY29uc3QgeyBkYXRldGltZUZvcm1hdHMsIHVucmVzb2x2aW5nLCBmYWxsYmFja0xvY2FsZSwgb25XYXJuLCBsb2NhbGVGYWxsYmFja2VyIH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgeyBfX2RhdGV0aW1lRm9ybWF0dGVycyB9ID0gY29udGV4dDtcclxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgIUF2YWlsYWJpbGl0aWVzLmRhdGVUaW1lRm9ybWF0KSB7XHJcbiAgICAgICAgb25XYXJuKGdldFdhcm5NZXNzYWdlKENvcmVXYXJuQ29kZXMuQ0FOTk9UX0ZPUk1BVF9EQVRFKSk7XHJcbiAgICAgICAgcmV0dXJuIE1JU1NJTkdfUkVTT0xWRV9WQUxVRTtcclxuICAgIH1cclxuICAgIGNvbnN0IFtrZXksIHZhbHVlLCBvcHRpb25zLCBvdmVycmlkZXNdID0gcGFyc2VEYXRlVGltZUFyZ3MoLi4uYXJncyk7XHJcbiAgICBjb25zdCBtaXNzaW5nV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLm1pc3NpbmdXYXJuKVxyXG4gICAgICAgID8gb3B0aW9ucy5taXNzaW5nV2FyblxyXG4gICAgICAgIDogY29udGV4dC5taXNzaW5nV2FybjtcclxuICAgIGNvbnN0IGZhbGxiYWNrV2FybiA9IGlzQm9vbGVhbihvcHRpb25zLmZhbGxiYWNrV2FybilcclxuICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tXYXJuXHJcbiAgICAgICAgOiBjb250ZXh0LmZhbGxiYWNrV2FybjtcclxuICAgIGNvbnN0IHBhcnQgPSAhIW9wdGlvbnMucGFydDtcclxuICAgIGNvbnN0IGxvY2FsZSA9IGlzU3RyaW5nKG9wdGlvbnMubG9jYWxlKSA/IG9wdGlvbnMubG9jYWxlIDogY29udGV4dC5sb2NhbGU7XHJcbiAgICBjb25zdCBsb2NhbGVzID0gbG9jYWxlRmFsbGJhY2tlcihjb250ZXh0LCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIGZhbGxiYWNrTG9jYWxlLCBsb2NhbGUpO1xyXG4gICAgaWYgKCFpc1N0cmluZyhrZXkpIHx8IGtleSA9PT0gJycpIHtcclxuICAgICAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBvdmVycmlkZXMpLmZvcm1hdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICAvLyByZXNvbHZlIGZvcm1hdFxyXG4gICAgbGV0IGRhdGV0aW1lRm9ybWF0ID0ge307XHJcbiAgICBsZXQgdGFyZ2V0TG9jYWxlO1xyXG4gICAgbGV0IGZvcm1hdCA9IG51bGw7XHJcbiAgICBsZXQgZnJvbSA9IGxvY2FsZTtcclxuICAgIGxldCB0byA9IG51bGw7XHJcbiAgICBjb25zdCB0eXBlID0gJ2RhdGV0aW1lIGZvcm1hdCc7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvY2FsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0YXJnZXRMb2NhbGUgPSB0byA9IGxvY2FsZXNbaV07XHJcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJlxyXG4gICAgICAgICAgICBsb2NhbGUgIT09IHRhcmdldExvY2FsZSAmJlxyXG4gICAgICAgICAgICBpc1RyYW5zbGF0ZUZhbGxiYWNrV2FybihmYWxsYmFja1dhcm4sIGtleSkpIHtcclxuICAgICAgICAgICAgb25XYXJuKGdldFdhcm5NZXNzYWdlKENvcmVXYXJuQ29kZXMuRkFMTEJBQ0tfVE9fREFURV9GT1JNQVQsIHtcclxuICAgICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0TG9jYWxlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxyXG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgbG9jYWxlICE9PSB0YXJnZXRMb2NhbGUpIHtcclxuICAgICAgICAgICAgY29uc3QgZW1pdHRlciA9IGNvbnRleHQuX192X2VtaXR0ZXI7XHJcbiAgICAgICAgICAgIGlmIChlbWl0dGVyKSB7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoXCJmYWxsYmFja1wiIC8qIEZBTEJBQ0sgKi8sIHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICAgICAgICBmcm9tLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvLFxyXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGAke3R5cGV9OiR7a2V5fWBcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGV0aW1lRm9ybWF0ID1cclxuICAgICAgICAgICAgZGF0ZXRpbWVGb3JtYXRzW3RhcmdldExvY2FsZV0gfHwge307XHJcbiAgICAgICAgZm9ybWF0ID0gZGF0ZXRpbWVGb3JtYXRba2V5XTtcclxuICAgICAgICBpZiAoaXNQbGFpbk9iamVjdChmb3JtYXQpKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBoYW5kbGVNaXNzaW5nKGNvbnRleHQsIGtleSwgdGFyZ2V0TG9jYWxlLCBtaXNzaW5nV2FybiwgdHlwZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIGZyb20gPSB0bztcclxuICAgIH1cclxuICAgIC8vIGNoZWNraW5nIGZvcm1hdCBhbmQgdGFyZ2V0IGxvY2FsZVxyXG4gICAgaWYgKCFpc1BsYWluT2JqZWN0KGZvcm1hdCkgfHwgIWlzU3RyaW5nKHRhcmdldExvY2FsZSkpIHtcclxuICAgICAgICByZXR1cm4gdW5yZXNvbHZpbmcgPyBOT1RfUkVPU0xWRUQgOiBrZXk7XHJcbiAgICB9XHJcbiAgICBsZXQgaWQgPSBgJHt0YXJnZXRMb2NhbGV9X18ke2tleX1gO1xyXG4gICAgaWYgKCFpc0VtcHR5T2JqZWN0KG92ZXJyaWRlcykpIHtcclxuICAgICAgICBpZCA9IGAke2lkfV9fJHtKU09OLnN0cmluZ2lmeShvdmVycmlkZXMpfWA7XHJcbiAgICB9XHJcbiAgICBsZXQgZm9ybWF0dGVyID0gX19kYXRldGltZUZvcm1hdHRlcnMuZ2V0KGlkKTtcclxuICAgIGlmICghZm9ybWF0dGVyKSB7XHJcbiAgICAgICAgZm9ybWF0dGVyID0gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQodGFyZ2V0TG9jYWxlLCBhc3NpZ24oe30sIGZvcm1hdCwgb3ZlcnJpZGVzKSk7XHJcbiAgICAgICAgX19kYXRldGltZUZvcm1hdHRlcnMuc2V0KGlkLCBmb3JtYXR0ZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICFwYXJ0ID8gZm9ybWF0dGVyLmZvcm1hdCh2YWx1ZSkgOiBmb3JtYXR0ZXIuZm9ybWF0VG9QYXJ0cyh2YWx1ZSk7XHJcbn1cclxuLyoqIEBpbnRlcm5hbCAqL1xyXG5jb25zdCBEQVRFVElNRV9GT1JNQVRfT1BUSU9OU19LRVlTID0gW1xyXG4gICAgJ2xvY2FsZU1hdGNoZXInLFxyXG4gICAgJ3dlZWtkYXknLFxyXG4gICAgJ2VyYScsXHJcbiAgICAneWVhcicsXHJcbiAgICAnbW9udGgnLFxyXG4gICAgJ2RheScsXHJcbiAgICAnaG91cicsXHJcbiAgICAnbWludXRlJyxcclxuICAgICdzZWNvbmQnLFxyXG4gICAgJ3RpbWVab25lTmFtZScsXHJcbiAgICAnZm9ybWF0TWF0Y2hlcicsXHJcbiAgICAnaG91cjEyJyxcclxuICAgICd0aW1lWm9uZScsXHJcbiAgICAnZGF0ZVN0eWxlJyxcclxuICAgICd0aW1lU3R5bGUnLFxyXG4gICAgJ2NhbGVuZGFyJyxcclxuICAgICdkYXlQZXJpb2QnLFxyXG4gICAgJ251bWJlcmluZ1N5c3RlbScsXHJcbiAgICAnaG91ckN5Y2xlJyxcclxuICAgICdmcmFjdGlvbmFsU2Vjb25kRGlnaXRzJ1xyXG5dO1xyXG4vKiogQGludGVybmFsICovXHJcbmZ1bmN0aW9uIHBhcnNlRGF0ZVRpbWVBcmdzKC4uLmFyZ3MpIHtcclxuICAgIGNvbnN0IFthcmcxLCBhcmcyLCBhcmczLCBhcmc0XSA9IGFyZ3M7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge307XHJcbiAgICBsZXQgb3ZlcnJpZGVzID0ge307XHJcbiAgICBsZXQgdmFsdWU7XHJcbiAgICBpZiAoaXNTdHJpbmcoYXJnMSkpIHtcclxuICAgICAgICAvLyBPbmx5IGFsbG93IElTTyBzdHJpbmdzIC0gb3RoZXIgZGF0ZSBmb3JtYXRzIGFyZSBvZnRlbiBzdXBwb3J0ZWQsXHJcbiAgICAgICAgLy8gYnV0IG1heSBjYXVzZSBkaWZmZXJlbnQgcmVzdWx0cyBpbiBkaWZmZXJlbnQgYnJvd3NlcnMuXHJcbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGFyZzEubWF0Y2goLyhcXGR7NH0tXFxkezJ9LVxcZHsyfSkoVHxcXHMpPyguKikvKTtcclxuICAgICAgICBpZiAoIW1hdGNoZXMpIHtcclxuICAgICAgICAgICAgdGhyb3cgY3JlYXRlQ29yZUVycm9yKENvcmVFcnJvckNvZGVzLklOVkFMSURfSVNPX0RBVEVfQVJHVU1FTlQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTb21lIGJyb3dzZXJzIGNhbiBub3QgcGFyc2UgdGhlIGlzbyBkYXRldGltZSBzZXBhcmF0ZWQgYnkgc3BhY2UsXHJcbiAgICAgICAgLy8gdGhpcyBpcyBhIGNvbXByb21pc2Ugc29sdXRpb24gYnkgcmVwbGFjZSB0aGUgJ1QnLycgJyB3aXRoICdUJ1xyXG4gICAgICAgIGNvbnN0IGRhdGVUaW1lID0gbWF0Y2hlc1szXVxyXG4gICAgICAgICAgICA/IG1hdGNoZXNbM10udHJpbSgpLnN0YXJ0c1dpdGgoJ1QnKVxyXG4gICAgICAgICAgICAgICAgPyBgJHttYXRjaGVzWzFdLnRyaW0oKX0ke21hdGNoZXNbM10udHJpbSgpfWBcclxuICAgICAgICAgICAgICAgIDogYCR7bWF0Y2hlc1sxXS50cmltKCl9VCR7bWF0Y2hlc1szXS50cmltKCl9YFxyXG4gICAgICAgICAgICA6IG1hdGNoZXNbMV0udHJpbSgpO1xyXG4gICAgICAgIHZhbHVlID0gbmV3IERhdGUoZGF0ZVRpbWUpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBmYWlsIGlmIHRoZSBkYXRlIGlzIG5vdCB2YWxpZFxyXG4gICAgICAgICAgICB2YWx1ZS50b0lTT1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9JU09fREFURV9BUkdVTUVOVCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNEYXRlKGFyZzEpKSB7XHJcbiAgICAgICAgaWYgKGlzTmFOKGFyZzEuZ2V0VGltZSgpKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9EQVRFX0FSR1VNRU5UKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFsdWUgPSBhcmcxO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNOdW1iZXIoYXJnMSkpIHtcclxuICAgICAgICB2YWx1ZSA9IGFyZzE7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aHJvdyBjcmVhdGVDb3JlRXJyb3IoQ29yZUVycm9yQ29kZXMuSU5WQUxJRF9BUkdVTUVOVCk7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNTdHJpbmcoYXJnMikpIHtcclxuICAgICAgICBvcHRpb25zLmtleSA9IGFyZzI7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzIpKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoYXJnMikuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoREFURVRJTUVfRk9STUFUX09QVElPTlNfS0VZUy5pbmNsdWRlcyhrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBvdmVycmlkZXNba2V5XSA9IGFyZzJba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IGFyZzJba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzU3RyaW5nKGFyZzMpKSB7XHJcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBhcmczO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmczKSkge1xyXG4gICAgICAgIG92ZXJyaWRlcyA9IGFyZzM7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNQbGFpbk9iamVjdChhcmc0KSkge1xyXG4gICAgICAgIG92ZXJyaWRlcyA9IGFyZzQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW29wdGlvbnMua2V5IHx8ICcnLCB2YWx1ZSwgb3B0aW9ucywgb3ZlcnJpZGVzXTtcclxufVxyXG4vKiogQGludGVybmFsICovXHJcbmZ1bmN0aW9uIGNsZWFyRGF0ZVRpbWVGb3JtYXQoY3R4LCBsb2NhbGUsIGZvcm1hdCkge1xyXG4gICAgY29uc3QgY29udGV4dCA9IGN0eDtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIGZvcm1hdCkge1xyXG4gICAgICAgIGNvbnN0IGlkID0gYCR7bG9jYWxlfV9fJHtrZXl9YDtcclxuICAgICAgICBpZiAoIWNvbnRleHQuX19kYXRldGltZUZvcm1hdHRlcnMuaGFzKGlkKSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29udGV4dC5fX2RhdGV0aW1lRm9ybWF0dGVycy5kZWxldGUoaWQpO1xyXG4gICAgfVxyXG59XG5cbi8vIGltcGxlbWVudGF0aW9uIG9mIGBudW1iZXJgIGZ1bmN0aW9uXHJcbmZ1bmN0aW9uIG51bWJlcihjb250ZXh0LCAuLi5hcmdzKSB7XHJcbiAgICBjb25zdCB7IG51bWJlckZvcm1hdHMsIHVucmVzb2x2aW5nLCBmYWxsYmFja0xvY2FsZSwgb25XYXJuLCBsb2NhbGVGYWxsYmFja2VyIH0gPSBjb250ZXh0O1xyXG4gICAgY29uc3QgeyBfX251bWJlckZvcm1hdHRlcnMgfSA9IGNvbnRleHQ7XHJcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmICFBdmFpbGFiaWxpdGllcy5udW1iZXJGb3JtYXQpIHtcclxuICAgICAgICBvbldhcm4oZ2V0V2Fybk1lc3NhZ2UoQ29yZVdhcm5Db2Rlcy5DQU5OT1RfRk9STUFUX05VTUJFUikpO1xyXG4gICAgICAgIHJldHVybiBNSVNTSU5HX1JFU09MVkVfVkFMVUU7XHJcbiAgICB9XHJcbiAgICBjb25zdCBba2V5LCB2YWx1ZSwgb3B0aW9ucywgb3ZlcnJpZGVzXSA9IHBhcnNlTnVtYmVyQXJncyguLi5hcmdzKTtcclxuICAgIGNvbnN0IG1pc3NpbmdXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMubWlzc2luZ1dhcm4pXHJcbiAgICAgICAgPyBvcHRpb25zLm1pc3NpbmdXYXJuXHJcbiAgICAgICAgOiBjb250ZXh0Lm1pc3NpbmdXYXJuO1xyXG4gICAgY29uc3QgZmFsbGJhY2tXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tXYXJuKVxyXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1dhcm5cclxuICAgICAgICA6IGNvbnRleHQuZmFsbGJhY2tXYXJuO1xyXG4gICAgY29uc3QgcGFydCA9ICEhb3B0aW9ucy5wYXJ0O1xyXG4gICAgY29uc3QgbG9jYWxlID0gaXNTdHJpbmcob3B0aW9ucy5sb2NhbGUpID8gb3B0aW9ucy5sb2NhbGUgOiBjb250ZXh0LmxvY2FsZTtcclxuICAgIGNvbnN0IGxvY2FsZXMgPSBsb2NhbGVGYWxsYmFja2VyKGNvbnRleHQsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgZmFsbGJhY2tMb2NhbGUsIGxvY2FsZSk7XHJcbiAgICBpZiAoIWlzU3RyaW5nKGtleSkgfHwga2V5ID09PSAnJykge1xyXG4gICAgICAgIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQobG9jYWxlLCBvdmVycmlkZXMpLmZvcm1hdCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICAvLyByZXNvbHZlIGZvcm1hdFxyXG4gICAgbGV0IG51bWJlckZvcm1hdCA9IHt9O1xyXG4gICAgbGV0IHRhcmdldExvY2FsZTtcclxuICAgIGxldCBmb3JtYXQgPSBudWxsO1xyXG4gICAgbGV0IGZyb20gPSBsb2NhbGU7XHJcbiAgICBsZXQgdG8gPSBudWxsO1xyXG4gICAgY29uc3QgdHlwZSA9ICdudW1iZXIgZm9ybWF0JztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9jYWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRhcmdldExvY2FsZSA9IHRvID0gbG9jYWxlc1tpXTtcclxuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmXHJcbiAgICAgICAgICAgIGxvY2FsZSAhPT0gdGFyZ2V0TG9jYWxlICYmXHJcbiAgICAgICAgICAgIGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuKGZhbGxiYWNrV2Fybiwga2V5KSkge1xyXG4gICAgICAgICAgICBvbldhcm4oZ2V0V2Fybk1lc3NhZ2UoQ29yZVdhcm5Db2Rlcy5GQUxMQkFDS19UT19OVU1CRVJfRk9STUFULCB7XHJcbiAgICAgICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldExvY2FsZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcclxuICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGxvY2FsZSAhPT0gdGFyZ2V0TG9jYWxlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVtaXR0ZXIgPSBjb250ZXh0Ll9fdl9lbWl0dGVyO1xyXG4gICAgICAgICAgICBpZiAoZW1pdHRlcikge1xyXG4gICAgICAgICAgICAgICAgZW1pdHRlci5lbWl0KFwiZmFsbGJhY2tcIiAvKiBGQUxCQUNLICovLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBrZXksXHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbSxcclxuICAgICAgICAgICAgICAgICAgICB0byxcclxuICAgICAgICAgICAgICAgICAgICBncm91cElkOiBgJHt0eXBlfToke2tleX1gXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBudW1iZXJGb3JtYXQgPVxyXG4gICAgICAgICAgICBudW1iZXJGb3JtYXRzW3RhcmdldExvY2FsZV0gfHwge307XHJcbiAgICAgICAgZm9ybWF0ID0gbnVtYmVyRm9ybWF0W2tleV07XHJcbiAgICAgICAgaWYgKGlzUGxhaW5PYmplY3QoZm9ybWF0KSlcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgaGFuZGxlTWlzc2luZyhjb250ZXh0LCBrZXksIHRhcmdldExvY2FsZSwgbWlzc2luZ1dhcm4sIHR5cGUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICBmcm9tID0gdG87XHJcbiAgICB9XHJcbiAgICAvLyBjaGVja2luZyBmb3JtYXQgYW5kIHRhcmdldCBsb2NhbGVcclxuICAgIGlmICghaXNQbGFpbk9iamVjdChmb3JtYXQpIHx8ICFpc1N0cmluZyh0YXJnZXRMb2NhbGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHVucmVzb2x2aW5nID8gTk9UX1JFT1NMVkVEIDoga2V5O1xyXG4gICAgfVxyXG4gICAgbGV0IGlkID0gYCR7dGFyZ2V0TG9jYWxlfV9fJHtrZXl9YDtcclxuICAgIGlmICghaXNFbXB0eU9iamVjdChvdmVycmlkZXMpKSB7XHJcbiAgICAgICAgaWQgPSBgJHtpZH1fXyR7SlNPTi5zdHJpbmdpZnkob3ZlcnJpZGVzKX1gO1xyXG4gICAgfVxyXG4gICAgbGV0IGZvcm1hdHRlciA9IF9fbnVtYmVyRm9ybWF0dGVycy5nZXQoaWQpO1xyXG4gICAgaWYgKCFmb3JtYXR0ZXIpIHtcclxuICAgICAgICBmb3JtYXR0ZXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQodGFyZ2V0TG9jYWxlLCBhc3NpZ24oe30sIGZvcm1hdCwgb3ZlcnJpZGVzKSk7XHJcbiAgICAgICAgX19udW1iZXJGb3JtYXR0ZXJzLnNldChpZCwgZm9ybWF0dGVyKTtcclxuICAgIH1cclxuICAgIHJldHVybiAhcGFydCA/IGZvcm1hdHRlci5mb3JtYXQodmFsdWUpIDogZm9ybWF0dGVyLmZvcm1hdFRvUGFydHModmFsdWUpO1xyXG59XHJcbi8qKiBAaW50ZXJuYWwgKi9cclxuY29uc3QgTlVNQkVSX0ZPUk1BVF9PUFRJT05TX0tFWVMgPSBbXHJcbiAgICAnbG9jYWxlTWF0Y2hlcicsXHJcbiAgICAnc3R5bGUnLFxyXG4gICAgJ2N1cnJlbmN5JyxcclxuICAgICdjdXJyZW5jeURpc3BsYXknLFxyXG4gICAgJ2N1cnJlbmN5U2lnbicsXHJcbiAgICAndXNlR3JvdXBpbmcnLFxyXG4gICAgJ21pbmltdW1JbnRlZ2VyRGlnaXRzJyxcclxuICAgICdtaW5pbXVtRnJhY3Rpb25EaWdpdHMnLFxyXG4gICAgJ21heGltdW1GcmFjdGlvbkRpZ2l0cycsXHJcbiAgICAnbWluaW11bVNpZ25pZmljYW50RGlnaXRzJyxcclxuICAgICdtYXhpbXVtU2lnbmlmaWNhbnREaWdpdHMnLFxyXG4gICAgJ2NvbXBhY3REaXNwbGF5JyxcclxuICAgICdub3RhdGlvbicsXHJcbiAgICAnc2lnbkRpc3BsYXknLFxyXG4gICAgJ3VuaXQnLFxyXG4gICAgJ3VuaXREaXNwbGF5JyxcclxuICAgICdyb3VuZGluZ01vZGUnLFxyXG4gICAgJ3JvdW5kaW5nUHJpb3JpdHknLFxyXG4gICAgJ3JvdW5kaW5nSW5jcmVtZW50JyxcclxuICAgICd0cmFpbGluZ1plcm9EaXNwbGF5J1xyXG5dO1xyXG4vKiogQGludGVybmFsICovXHJcbmZ1bmN0aW9uIHBhcnNlTnVtYmVyQXJncyguLi5hcmdzKSB7XHJcbiAgICBjb25zdCBbYXJnMSwgYXJnMiwgYXJnMywgYXJnNF0gPSBhcmdzO1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHt9O1xyXG4gICAgbGV0IG92ZXJyaWRlcyA9IHt9O1xyXG4gICAgaWYgKCFpc051bWJlcihhcmcxKSkge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZUNvcmVFcnJvcihDb3JlRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UKTtcclxuICAgIH1cclxuICAgIGNvbnN0IHZhbHVlID0gYXJnMTtcclxuICAgIGlmIChpc1N0cmluZyhhcmcyKSkge1xyXG4gICAgICAgIG9wdGlvbnMua2V5ID0gYXJnMjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMikpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyhhcmcyKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChOVU1CRVJfRk9STUFUX09QVElPTlNfS0VZUy5pbmNsdWRlcyhrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBvdmVycmlkZXNba2V5XSA9IGFyZzJba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnNba2V5XSA9IGFyZzJba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzU3RyaW5nKGFyZzMpKSB7XHJcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBhcmczO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmczKSkge1xyXG4gICAgICAgIG92ZXJyaWRlcyA9IGFyZzM7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNQbGFpbk9iamVjdChhcmc0KSkge1xyXG4gICAgICAgIG92ZXJyaWRlcyA9IGFyZzQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW29wdGlvbnMua2V5IHx8ICcnLCB2YWx1ZSwgb3B0aW9ucywgb3ZlcnJpZGVzXTtcclxufVxyXG4vKiogQGludGVybmFsICovXHJcbmZ1bmN0aW9uIGNsZWFyTnVtYmVyRm9ybWF0KGN0eCwgbG9jYWxlLCBmb3JtYXQpIHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSBjdHg7XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBmb3JtYXQpIHtcclxuICAgICAgICBjb25zdCBpZCA9IGAke2xvY2FsZX1fXyR7a2V5fWA7XHJcbiAgICAgICAgaWYgKCFjb250ZXh0Ll9fbnVtYmVyRm9ybWF0dGVycy5oYXMoaWQpKSB7XHJcbiAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb250ZXh0Ll9fbnVtYmVyRm9ybWF0dGVycy5kZWxldGUoaWQpO1xyXG4gICAgfVxyXG59XG5cbi8vIFRPRE86IHdlIGNvdWxkIG5vdCBleHBvcnRzIGZvciBOb2RlIG5hdGl2ZSBFUyBNb3VkbGVzIHlldC4uLlxyXG57XHJcbiAgICBpZiAodHlwZW9mIF9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18gIT09ICdib29sZWFuJykge1xyXG4gICAgICAgIGdldEdsb2JhbFRoaXMoKS5fX0lOVExJRllfUFJPRF9ERVZUT09MU19fID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cblxuZXhwb3J0IHsgQ29yZUVycm9yQ29kZXMsIENvcmVXYXJuQ29kZXMsIERBVEVUSU1FX0ZPUk1BVF9PUFRJT05TX0tFWVMsIERFRkFVTFRfTE9DQUxFLCBERUZBVUxUX01FU1NBR0VfREFUQV9UWVBFLCBNSVNTSU5HX1JFU09MVkVfVkFMVUUsIE5PVF9SRU9TTFZFRCwgTlVNQkVSX0ZPUk1BVF9PUFRJT05TX0tFWVMsIFZFUlNJT04sIGNsZWFyQ29tcGlsZUNhY2hlLCBjbGVhckRhdGVUaW1lRm9ybWF0LCBjbGVhck51bWJlckZvcm1hdCwgY29tcGlsZVRvRnVuY3Rpb24sIGNyZWF0ZUNvcmVDb250ZXh0LCBjcmVhdGVDb3JlRXJyb3IsIGNyZWF0ZU1lc3NhZ2VDb250ZXh0LCBkYXRldGltZSwgZmFsbGJhY2tXaXRoTG9jYWxlQ2hhaW4sIGZhbGxiYWNrV2l0aFNpbXBsZSwgZ2V0QWRkaXRpb25hbE1ldGEsIGdldERldlRvb2xzSG9vaywgZ2V0RmFsbGJhY2tDb250ZXh0LCBnZXRXYXJuTWVzc2FnZSwgaGFuZGxlTWlzc2luZywgaW5pdEkxOG5EZXZUb29scywgaXNNZXNzYWdlRnVuY3Rpb24sIGlzVHJhbnNsYXRlRmFsbGJhY2tXYXJuLCBpc1RyYW5zbGF0ZU1pc3NpbmdXYXJuLCBudW1iZXIsIHBhcnNlLCBwYXJzZURhdGVUaW1lQXJncywgcGFyc2VOdW1iZXJBcmdzLCBwYXJzZVRyYW5zbGF0ZUFyZ3MsIHJlZ2lzdGVyTG9jYWxlRmFsbGJhY2tlciwgcmVnaXN0ZXJNZXNzYWdlQ29tcGlsZXIsIHJlZ2lzdGVyTWVzc2FnZVJlc29sdmVyLCByZXNvbHZlVmFsdWUsIHJlc29sdmVXaXRoS2V5VmFsdWUsIHNldEFkZGl0aW9uYWxNZXRhLCBzZXREZXZUb29sc0hvb2ssIHNldEZhbGxiYWNrQ29udGV4dCwgdHJhbnNsYXRlLCB0cmFuc2xhdGVEZXZUb29scywgdXBkYXRlRmFsbGJhY2tMb2NhbGUgfTtcbiIsIi8qIVxuICAqIHZ1ZS1kZXZ0b29scyB2OS4yLjJcbiAgKiAoYykgMjAyMiBrYXp1eWEga2F3YWd1Y2hpXG4gICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICAqL1xuY29uc3QgVnVlRGV2VG9vbHNMYWJlbHMgPSB7XHJcbiAgICBbXCJ2dWUtZGV2dG9vbHMtcGx1Z2luLXZ1ZS1pMThuXCIgLyogUExVR0lOICovXTogJ1Z1ZSBJMThuIGRldnRvb2xzJyxcclxuICAgIFtcInZ1ZS1pMThuLXJlc291cmNlLWluc3BlY3RvclwiIC8qIENVU1RPTV9JTlNQRUNUT1IgKi9dOiAnSTE4biBSZXNvdXJjZXMnLFxyXG4gICAgW1widnVlLWkxOG4tdGltZWxpbmVcIiAvKiBUSU1FTElORSAqL106ICdWdWUgSTE4bidcclxufTtcclxuY29uc3QgVnVlRGV2VG9vbHNQbGFjZWhvbGRlcnMgPSB7XHJcbiAgICBbXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBDVVNUT01fSU5TUEVDVE9SICovXTogJ1NlYXJjaCBmb3Igc2NvcGVzIC4uLidcclxufTtcclxuY29uc3QgVnVlRGV2VG9vbHNUaW1lbGluZUNvbG9ycyA9IHtcclxuICAgIFtcInZ1ZS1pMThuLXRpbWVsaW5lXCIgLyogVElNRUxJTkUgKi9dOiAweGZmY2QxOVxyXG59O1xuXG5leHBvcnQgeyBWdWVEZXZUb29sc0xhYmVscywgVnVlRGV2VG9vbHNQbGFjZWhvbGRlcnMsIFZ1ZURldlRvb2xzVGltZWxpbmVDb2xvcnMgfTtcbiIsIi8qIVxuICAqIHZ1ZS1pMThuIHY5LjIuMlxuICAqIChjKSAyMDIyIGthenV5YSBrYXdhZ3VjaGlcbiAgKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gICovXG5pbXBvcnQgeyBnZXRHbG9iYWxUaGlzLCBmb3JtYXQsIG1ha2VTeW1ib2wsIGlzUGxhaW5PYmplY3QsIGlzQXJyYXksIGlzU3RyaW5nLCBoYXNPd24sIGlzT2JqZWN0LCBpc0Jvb2xlYW4sIGlzUmVnRXhwLCBpc0Z1bmN0aW9uLCBpbkJyb3dzZXIsIGFzc2lnbiwgaXNOdW1iZXIsIHdhcm4sIGNyZWF0ZUVtaXR0ZXIsIGlzRW1wdHlPYmplY3QgfSBmcm9tICdAaW50bGlmeS9zaGFyZWQnO1xuaW1wb3J0IHsgQ29yZVdhcm5Db2RlcywgQ29tcGlsZUVycm9yQ29kZXMsIGNyZWF0ZUNvbXBpbGVFcnJvciwgREVGQVVMVF9MT0NBTEUsIHVwZGF0ZUZhbGxiYWNrTG9jYWxlLCBzZXRGYWxsYmFja0NvbnRleHQsIGNyZWF0ZUNvcmVDb250ZXh0LCBjbGVhckRhdGVUaW1lRm9ybWF0LCBjbGVhck51bWJlckZvcm1hdCwgc2V0QWRkaXRpb25hbE1ldGEsIGdldEZhbGxiYWNrQ29udGV4dCwgTk9UX1JFT1NMVkVELCBpc1RyYW5zbGF0ZUZhbGxiYWNrV2FybiwgaXNUcmFuc2xhdGVNaXNzaW5nV2FybiwgcGFyc2VUcmFuc2xhdGVBcmdzLCB0cmFuc2xhdGUsIE1JU1NJTkdfUkVTT0xWRV9WQUxVRSwgcGFyc2VEYXRlVGltZUFyZ3MsIGRhdGV0aW1lLCBwYXJzZU51bWJlckFyZ3MsIG51bWJlciwgZmFsbGJhY2tXaXRoTG9jYWxlQ2hhaW4sIE5VTUJFUl9GT1JNQVRfT1BUSU9OU19LRVlTLCBEQVRFVElNRV9GT1JNQVRfT1BUSU9OU19LRVlTLCByZWdpc3Rlck1lc3NhZ2VSZXNvbHZlciwgcmVzb2x2ZVZhbHVlLCByZWdpc3RlckxvY2FsZUZhbGxiYWNrZXIsIHNldERldlRvb2xzSG9vayB9IGZyb20gJ0BpbnRsaWZ5L2NvcmUtYmFzZSc7XG5pbXBvcnQgeyBjcmVhdGVWTm9kZSwgVGV4dCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIGdldEN1cnJlbnRJbnN0YW5jZSwgRnJhZ21lbnQsIGgsIGVmZmVjdFNjb3BlLCBpbmplY3QsIG9uTW91bnRlZCwgb25Vbm1vdW50ZWQsIHNoYWxsb3dSZWYsIG9uQmVmb3JlTW91bnQsIGlzUmVmIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IHNldHVwRGV2dG9vbHNQbHVnaW4gfSBmcm9tICdAdnVlL2RldnRvb2xzLWFwaSc7XG5pbXBvcnQgeyBWdWVEZXZUb29sc0xhYmVscywgVnVlRGV2VG9vbHNQbGFjZWhvbGRlcnMsIFZ1ZURldlRvb2xzVGltZWxpbmVDb2xvcnMgfSBmcm9tICdAaW50bGlmeS92dWUtZGV2dG9vbHMnO1xuXG4vKipcclxuICogVnVlIEkxOG4gVmVyc2lvblxyXG4gKlxyXG4gKiBAcmVtYXJrc1xyXG4gKiBTZW12ZXIgZm9ybWF0LiBTYW1lIGZvcm1hdCBhcyB0aGUgcGFja2FnZS5qc29uIGB2ZXJzaW9uYCBmaWVsZC5cclxuICpcclxuICogQFZ1ZUkxOG5HZW5lcmFsXHJcbiAqL1xyXG5jb25zdCBWRVJTSU9OID0gJzkuMi4yJztcclxuLyoqXHJcbiAqIFRoaXMgaXMgb25seSBjYWxsZWQgaW4gZXNtLWJ1bmRsZXIgYnVpbGRzLlxyXG4gKiBpc3RhbmJ1bC1pZ25vcmUtbmV4dFxyXG4gKi9cclxuZnVuY3Rpb24gaW5pdEZlYXR1cmVGbGFncygpIHtcclxuICAgIGxldCBuZWVkV2FybiA9IGZhbHNlO1xyXG4gICAgaWYgKHR5cGVvZiBfX1ZVRV9JMThOX0ZVTExfSU5TVEFMTF9fICE9PSAnYm9vbGVhbicpIHtcclxuICAgICAgICBuZWVkV2FybiA9IHRydWU7XHJcbiAgICAgICAgZ2V0R2xvYmFsVGhpcygpLl9fVlVFX0kxOE5fRlVMTF9JTlNUQUxMX18gPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBfX1ZVRV9JMThOX0xFR0FDWV9BUElfXyAhPT0gJ2Jvb2xlYW4nKSB7XHJcbiAgICAgICAgbmVlZFdhcm4gPSB0cnVlO1xyXG4gICAgICAgIGdldEdsb2JhbFRoaXMoKS5fX1ZVRV9JMThOX0xFR0FDWV9BUElfXyA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIF9fSU5UTElGWV9QUk9EX0RFVlRPT0xTX18gIT09ICdib29sZWFuJykge1xyXG4gICAgICAgIGdldEdsb2JhbFRoaXMoKS5fX0lOVExJRllfUFJPRF9ERVZUT09MU19fID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIG5lZWRXYXJuKSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGBZb3UgYXJlIHJ1bm5pbmcgdGhlIGVzbS1idW5kbGVyIGJ1aWxkIG9mIHZ1ZS1pMThuLiBJdCBpcyByZWNvbW1lbmRlZCB0byBgICtcclxuICAgICAgICAgICAgYGNvbmZpZ3VyZSB5b3VyIGJ1bmRsZXIgdG8gZXhwbGljaXRseSByZXBsYWNlIGZlYXR1cmUgZmxhZyBnbG9iYWxzIGAgK1xyXG4gICAgICAgICAgICBgd2l0aCBib29sZWFuIGxpdGVyYWxzIHRvIGdldCBwcm9wZXIgdHJlZS1zaGFraW5nIGluIHRoZSBmaW5hbCBidW5kbGUuYCk7XHJcbiAgICB9XHJcbn1cblxubGV0IGNvZGUkMSA9IENvcmVXYXJuQ29kZXMuX19FWFRFTkRfUE9JTlRfXztcclxuY29uc3QgaW5jJDEgPSAoKSA9PiArK2NvZGUkMTtcclxuY29uc3QgSTE4bldhcm5Db2RlcyA9IHtcclxuICAgIEZBTExCQUNLX1RPX1JPT1Q6IGNvZGUkMSxcclxuICAgIE5PVF9TVVBQT1JURURfUFJFU0VSVkU6IGluYyQxKCksXHJcbiAgICBOT1RfU1VQUE9SVEVEX0ZPUk1BVFRFUjogaW5jJDEoKSxcclxuICAgIE5PVF9TVVBQT1JURURfUFJFU0VSVkVfRElSRUNUSVZFOiBpbmMkMSgpLFxyXG4gICAgTk9UX1NVUFBPUlRFRF9HRVRfQ0hPSUNFX0lOREVYOiBpbmMkMSgpLFxyXG4gICAgQ09NUE9ORU5UX05BTUVfTEVHQUNZX0NPTVBBVElCTEU6IGluYyQxKCksXHJcbiAgICBOT1RfRk9VTkRfUEFSRU5UX1NDT1BFOiBpbmMkMSgpIC8vIDEzXHJcbn07XHJcbmNvbnN0IHdhcm5NZXNzYWdlcyA9IHtcclxuICAgIFtJMThuV2FybkNvZGVzLkZBTExCQUNLX1RPX1JPT1RdOiBgRmFsbCBiYWNrIHRvIHt0eXBlfSAne2tleX0nIHdpdGggcm9vdCBsb2NhbGUuYCxcclxuICAgIFtJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfUFJFU0VSVkVdOiBgTm90IHN1cHBvcnRlZCAncHJlc2VydmUnLmAsXHJcbiAgICBbSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX0ZPUk1BVFRFUl06IGBOb3Qgc3VwcG9ydGVkICdmb3JtYXR0ZXInLmAsXHJcbiAgICBbSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX1BSRVNFUlZFX0RJUkVDVElWRV06IGBOb3Qgc3VwcG9ydGVkICdwcmVzZXJ2ZURpcmVjdGl2ZUNvbnRlbnQnLmAsXHJcbiAgICBbSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX0dFVF9DSE9JQ0VfSU5ERVhdOiBgTm90IHN1cHBvcnRlZCAnZ2V0Q2hvaWNlSW5kZXgnLmAsXHJcbiAgICBbSTE4bldhcm5Db2Rlcy5DT01QT05FTlRfTkFNRV9MRUdBQ1lfQ09NUEFUSUJMRV06IGBDb21wb25lbnQgbmFtZSBsZWdhY3kgY29tcGF0aWJsZTogJ3tuYW1lfScgLT4gJ2kxOG4nYCxcclxuICAgIFtJMThuV2FybkNvZGVzLk5PVF9GT1VORF9QQVJFTlRfU0NPUEVdOiBgTm90IGZvdW5kIHBhcmVudCBzY29wZS4gdXNlIHRoZSBnbG9iYWwgc2NvcGUuYFxyXG59O1xyXG5mdW5jdGlvbiBnZXRXYXJuTWVzc2FnZShjb2RlLCAuLi5hcmdzKSB7XHJcbiAgICByZXR1cm4gZm9ybWF0KHdhcm5NZXNzYWdlc1tjb2RlXSwgLi4uYXJncyk7XHJcbn1cblxubGV0IGNvZGUgPSBDb21waWxlRXJyb3JDb2Rlcy5fX0VYVEVORF9QT0lOVF9fO1xyXG5jb25zdCBpbmMgPSAoKSA9PiArK2NvZGU7XHJcbmNvbnN0IEkxOG5FcnJvckNvZGVzID0ge1xyXG4gICAgLy8gY29tcG9zZXIgbW9kdWxlIGVycm9yc1xyXG4gICAgVU5FWFBFQ1RFRF9SRVRVUk5fVFlQRTogY29kZSxcclxuICAgIC8vIGxlZ2FjeSBtb2R1bGUgZXJyb3JzXHJcbiAgICBJTlZBTElEX0FSR1VNRU5UOiBpbmMoKSxcclxuICAgIC8vIGkxOG4gbW9kdWxlIGVycm9yc1xyXG4gICAgTVVTVF9CRV9DQUxMX1NFVFVQX1RPUDogaW5jKCksXHJcbiAgICBOT1RfSU5TTEFMTEVEOiBpbmMoKSxcclxuICAgIE5PVF9BVkFJTEFCTEVfSU5fTEVHQUNZX01PREU6IGluYygpLFxyXG4gICAgLy8gZGlyZWN0aXZlIG1vZHVsZSBlcnJvcnNcclxuICAgIFJFUVVJUkVEX1ZBTFVFOiBpbmMoKSxcclxuICAgIElOVkFMSURfVkFMVUU6IGluYygpLFxyXG4gICAgLy8gdnVlLWRldnRvb2xzIGVycm9yc1xyXG4gICAgQ0FOTk9UX1NFVFVQX1ZVRV9ERVZUT09MU19QTFVHSU46IGluYygpLFxyXG4gICAgTk9UX0lOU0xBTExFRF9XSVRIX1BST1ZJREU6IGluYygpLFxyXG4gICAgLy8gdW5leHBlY3RlZCBlcnJvclxyXG4gICAgVU5FWFBFQ1RFRF9FUlJPUjogaW5jKCksXHJcbiAgICAvLyBub3QgY29tcGF0aWJsZSBsZWdhY3kgdnVlLWkxOG4gY29uc3RydWN0b3JcclxuICAgIE5PVF9DT01QQVRJQkxFX0xFR0FDWV9WVUVfSTE4TjogaW5jKCksXHJcbiAgICAvLyBicmlkZ2Ugc3VwcG9ydCB2dWUgMi54IG9ubHlcclxuICAgIEJSSURHRV9TVVBQT1JUX1ZVRV8yX09OTFk6IGluYygpLFxyXG4gICAgLy8gbmVlZCB0byBkZWZpbmUgYGkxOG5gIG9wdGlvbiBpbiBgYWxsb3dDb21wb3NpdGlvbjogdHJ1ZWAgYW5kIGB1c2VTY29wZTogJ2xvY2FsJyBhdCBgdXNlSTE4bmBgXHJcbiAgICBNVVNUX0RFRklORV9JMThOX09QVElPTl9JTl9BTExPV19DT01QT1NJVElPTjogaW5jKCksXHJcbiAgICAvLyBOb3QgYXZhaWxhYmxlIENvbXBvc3Rpb24gQVBJIGluIExlZ2FjeSBBUEkgbW9kZS4gUGxlYXNlIG1ha2Ugc3VyZSB0aGF0IHRoZSBsZWdhY3kgQVBJIG1vZGUgaXMgd29ya2luZyBwcm9wZXJseVxyXG4gICAgTk9UX0FWQUlMQUJMRV9DT01QT1NJVElPTl9JTl9MRUdBQ1k6IGluYygpLFxyXG4gICAgLy8gZm9yIGVuaGFuY2VtZW50XHJcbiAgICBfX0VYVEVORF9QT0lOVF9fOiBpbmMoKSAvLyAyOVxyXG59O1xyXG5mdW5jdGlvbiBjcmVhdGVJMThuRXJyb3IoY29kZSwgLi4uYXJncykge1xyXG4gICAgcmV0dXJuIGNyZWF0ZUNvbXBpbGVFcnJvcihjb2RlLCBudWxsLCAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgPyB7IG1lc3NhZ2VzOiBlcnJvck1lc3NhZ2VzLCBhcmdzIH0gOiB1bmRlZmluZWQpO1xyXG59XHJcbmNvbnN0IGVycm9yTWVzc2FnZXMgPSB7XHJcbiAgICBbSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9SRVRVUk5fVFlQRV06ICdVbmV4cGVjdGVkIHJldHVybiB0eXBlIGluIGNvbXBvc2VyJyxcclxuICAgIFtJMThuRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UXTogJ0ludmFsaWQgYXJndW1lbnQnLFxyXG4gICAgW0kxOG5FcnJvckNvZGVzLk1VU1RfQkVfQ0FMTF9TRVRVUF9UT1BdOiAnTXVzdCBiZSBjYWxsZWQgYXQgdGhlIHRvcCBvZiBhIGBzZXR1cGAgZnVuY3Rpb24nLFxyXG4gICAgW0kxOG5FcnJvckNvZGVzLk5PVF9JTlNMQUxMRURdOiAnTmVlZCB0byBpbnN0YWxsIHdpdGggYGFwcC51c2VgIGZ1bmN0aW9uJyxcclxuICAgIFtJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VSUk9SXTogJ1VuZXhwZWN0ZWQgZXJyb3InLFxyXG4gICAgW0kxOG5FcnJvckNvZGVzLk5PVF9BVkFJTEFCTEVfSU5fTEVHQUNZX01PREVdOiAnTm90IGF2YWlsYWJsZSBpbiBsZWdhY3kgbW9kZScsXHJcbiAgICBbSTE4bkVycm9yQ29kZXMuUkVRVUlSRURfVkFMVUVdOiBgUmVxdWlyZWQgaW4gdmFsdWU6IHswfWAsXHJcbiAgICBbSTE4bkVycm9yQ29kZXMuSU5WQUxJRF9WQUxVRV06IGBJbnZhbGlkIHZhbHVlYCxcclxuICAgIFtJMThuRXJyb3JDb2Rlcy5DQU5OT1RfU0VUVVBfVlVFX0RFVlRPT0xTX1BMVUdJTl06IGBDYW5ub3Qgc2V0dXAgdnVlLWRldnRvb2xzIHBsdWdpbmAsXHJcbiAgICBbSTE4bkVycm9yQ29kZXMuTk9UX0lOU0xBTExFRF9XSVRIX1BST1ZJREVdOiAnTmVlZCB0byBpbnN0YWxsIHdpdGggYHByb3ZpZGVgIGZ1bmN0aW9uJyxcclxuICAgIFtJMThuRXJyb3JDb2Rlcy5OT1RfQ09NUEFUSUJMRV9MRUdBQ1lfVlVFX0kxOE5dOiAnTm90IGNvbXBhdGlibGUgbGVnYWN5IFZ1ZUkxOG4uJyxcclxuICAgIFtJMThuRXJyb3JDb2Rlcy5CUklER0VfU1VQUE9SVF9WVUVfMl9PTkxZXTogJ3Z1ZS1pMThuLWJyaWRnZSBzdXBwb3J0IFZ1ZSAyLnggb25seScsXHJcbiAgICBbSTE4bkVycm9yQ29kZXMuTVVTVF9ERUZJTkVfSTE4Tl9PUFRJT05fSU5fQUxMT1dfQ09NUE9TSVRJT05dOiAnTXVzdCBkZWZpbmUg4oCYaTE4buKAmSBvcHRpb24gb3IgY3VzdG9tIGJsb2NrIGluIENvbXBvc2l0aW9uIEFQSSB3aXRoIHVzaW5nIGxvY2FsIHNjb3BlIGluIExlZ2FjeSBBUEkgbW9kZScsXHJcbiAgICBbSTE4bkVycm9yQ29kZXMuTk9UX0FWQUlMQUJMRV9DT01QT1NJVElPTl9JTl9MRUdBQ1ldOiAnTm90IGF2YWlsYWJsZSBDb21wb3N0aW9uIEFQSSBpbiBMZWdhY3kgQVBJIG1vZGUuIFBsZWFzZSBtYWtlIHN1cmUgdGhhdCB0aGUgbGVnYWN5IEFQSSBtb2RlIGlzIHdvcmtpbmcgcHJvcGVybHknXHJcbn07XG5cbmNvbnN0IFRyYW5zcmF0ZVZOb2RlU3ltYm9sID0gXHJcbi8qICNfX1BVUkVfXyovIG1ha2VTeW1ib2woJ19fdHJhbnNyYXRlVk5vZGUnKTtcclxuY29uc3QgRGF0ZXRpbWVQYXJ0c1N5bWJvbCA9IC8qICNfX1BVUkVfXyovIG1ha2VTeW1ib2woJ19fZGF0ZXRpbWVQYXJ0cycpO1xyXG5jb25zdCBOdW1iZXJQYXJ0c1N5bWJvbCA9IC8qICNfX1BVUkVfXyovIG1ha2VTeW1ib2woJ19fbnVtYmVyUGFydHMnKTtcclxuY29uc3QgRW5hYmxlRW1pdHRlciA9IC8qICNfX1BVUkVfXyovIG1ha2VTeW1ib2woJ19fZW5hYmxlRW1pdHRlcicpO1xyXG5jb25zdCBEaXNhYmxlRW1pdHRlciA9IC8qICNfX1BVUkVfXyovIG1ha2VTeW1ib2woJ19fZGlzYWJsZUVtaXR0ZXInKTtcclxuY29uc3QgU2V0UGx1cmFsUnVsZXNTeW1ib2wgPSBtYWtlU3ltYm9sKCdfX3NldFBsdXJhbFJ1bGVzJyk7XHJcbm1ha2VTeW1ib2woJ19faW50bGlmeU1ldGEnKTtcclxuY29uc3QgSW5lamN0V2l0aE9wdGlvbiA9IC8qICNfX1BVUkVfXyovIG1ha2VTeW1ib2woJ19faW5qZWN0V2l0aE9wdGlvbicpO1xyXG5jb25zdCBfX1ZVRV9JMThOX0JSSURHRV9fID0gICdfX1ZVRV9JMThOX0JSSURHRV9fJztcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xyXG4vKipcclxuICogVHJhbnNmb3JtIGZsYXQganNvbiBpbiBvYmogdG8gbm9ybWFsIGpzb24gaW4gb2JqXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVGbGF0SnNvbihvYmopIHtcclxuICAgIC8vIGNoZWNrIG9ialxyXG4gICAgaWYgKCFpc09iamVjdChvYmopKSB7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xyXG4gICAgICAgIC8vIGNoZWNrIGtleVxyXG4gICAgICAgIGlmICghaGFzT3duKG9iaiwga2V5KSkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaGFuZGxlIGZvciBub3JtYWwganNvblxyXG4gICAgICAgIGlmICgha2V5LmluY2x1ZGVzKCcuJykpIHtcclxuICAgICAgICAgICAgLy8gcmVjdXJzaXZlIHByb2Nlc3MgdmFsdWUgaWYgdmFsdWUgaXMgYWxzbyBhIG9iamVjdFxyXG4gICAgICAgICAgICBpZiAoaXNPYmplY3Qob2JqW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVGbGF0SnNvbihvYmpba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gaGFuZGxlIGZvciBmbGF0IGpzb24sIHRyYW5zZm9ybSB0byBub3JtYWwganNvblxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBnbyB0byB0aGUgbGFzdCBvYmplY3RcclxuICAgICAgICAgICAgY29uc3Qgc3ViS2V5cyA9IGtleS5zcGxpdCgnLicpO1xyXG4gICAgICAgICAgICBjb25zdCBsYXN0SW5kZXggPSBzdWJLZXlzLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgICAgIGxldCBjdXJyZW50T2JqID0gb2JqO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhc3RJbmRleDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIShzdWJLZXlzW2ldIGluIGN1cnJlbnRPYmopKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE9ialtzdWJLZXlzW2ldXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY3VycmVudE9iaiA9IGN1cnJlbnRPYmpbc3ViS2V5c1tpXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdXBkYXRlIGxhc3Qgb2JqZWN0IHZhbHVlLCBkZWxldGUgb2xkIHByb3BlcnR5XHJcbiAgICAgICAgICAgIGN1cnJlbnRPYmpbc3ViS2V5c1tsYXN0SW5kZXhdXSA9IG9ialtrZXldO1xyXG4gICAgICAgICAgICBkZWxldGUgb2JqW2tleV07XHJcbiAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZSBwcm9jZXNzIHZhbHVlIGlmIHZhbHVlIGlzIGFsc28gYSBvYmplY3RcclxuICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGN1cnJlbnRPYmpbc3ViS2V5c1tsYXN0SW5kZXhdXSkpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUZsYXRKc29uKGN1cnJlbnRPYmpbc3ViS2V5c1tsYXN0SW5kZXhdXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqO1xyXG59XHJcbmZ1bmN0aW9uIGdldExvY2FsZU1lc3NhZ2VzKGxvY2FsZSwgb3B0aW9ucykge1xyXG4gICAgY29uc3QgeyBtZXNzYWdlcywgX19pMThuLCBtZXNzYWdlUmVzb2x2ZXIsIGZsYXRKc29uIH0gPSBvcHRpb25zO1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBjb25zdCByZXQgPSBpc1BsYWluT2JqZWN0KG1lc3NhZ2VzKVxyXG4gICAgICAgID8gbWVzc2FnZXNcclxuICAgICAgICA6IGlzQXJyYXkoX19pMThuKVxyXG4gICAgICAgICAgICA/IHt9XHJcbiAgICAgICAgICAgIDogeyBbbG9jYWxlXToge30gfTtcclxuICAgIC8vIG1lcmdlIGxvY2FsZSBtZXNzYWdlcyBvZiBpMThuIGN1c3RvbSBibG9ja1xyXG4gICAgaWYgKGlzQXJyYXkoX19pMThuKSkge1xyXG4gICAgICAgIF9faTE4bi5mb3JFYWNoKGN1c3RvbSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgnbG9jYWxlJyBpbiBjdXN0b20gJiYgJ3Jlc291cmNlJyBpbiBjdXN0b20pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgbG9jYWxlLCByZXNvdXJjZSB9ID0gY3VzdG9tO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldFtsb2NhbGVdID0gcmV0W2xvY2FsZV0gfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgZGVlcENvcHkocmVzb3VyY2UsIHJldFtsb2NhbGVdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZXBDb3B5KHJlc291cmNlLCByZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaXNTdHJpbmcoY3VzdG9tKSAmJiBkZWVwQ29weShKU09OLnBhcnNlKGN1c3RvbSksIHJldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIGhhbmRsZSBtZXNzYWdlcyBmb3IgZmxhdCBqc29uXHJcbiAgICBpZiAobWVzc2FnZVJlc29sdmVyID09IG51bGwgJiYgZmxhdEpzb24pIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiByZXQpIHtcclxuICAgICAgICAgICAgaWYgKGhhc093bihyZXQsIGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUZsYXRKc29uKHJldFtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXQ7XHJcbn1cclxuY29uc3QgaXNOb3RPYmplY3RPcklzQXJyYXkgPSAodmFsKSA9PiAhaXNPYmplY3QodmFsKSB8fCBpc0FycmF5KHZhbCk7XHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbmZ1bmN0aW9uIGRlZXBDb3B5KHNyYywgZGVzKSB7XHJcbiAgICAvLyBzcmMgYW5kIGRlcyBzaG91bGQgYm90aCBiZSBvYmplY3RzLCBhbmQgbm9uIG9mIHRoZW4gY2FuIGJlIGEgYXJyYXlcclxuICAgIGlmIChpc05vdE9iamVjdE9ySXNBcnJheShzcmMpIHx8IGlzTm90T2JqZWN0T3JJc0FycmF5KGRlcykpIHtcclxuICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuSU5WQUxJRF9WQUxVRSk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzcmMpIHtcclxuICAgICAgICBpZiAoaGFzT3duKHNyYywga2V5KSkge1xyXG4gICAgICAgICAgICBpZiAoaXNOb3RPYmplY3RPcklzQXJyYXkoc3JjW2tleV0pIHx8IGlzTm90T2JqZWN0T3JJc0FycmF5KGRlc1trZXldKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVwbGFjZSB3aXRoIHNyY1trZXldIHdoZW46XHJcbiAgICAgICAgICAgICAgICAvLyBzcmNba2V5XSBvciBkZXNba2V5XSBpcyBub3QgYSBvYmplY3QsIG9yXHJcbiAgICAgICAgICAgICAgICAvLyBzcmNba2V5XSBvciBkZXNba2V5XSBpcyBhIGFycmF5XHJcbiAgICAgICAgICAgICAgICBkZXNba2V5XSA9IHNyY1trZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gc3JjW2tleV0gYW5kIGRlc1trZXldIGFyZSBib3RoIG9iamVjdCwgbWVyZ2UgdGhlbVxyXG4gICAgICAgICAgICAgICAgZGVlcENvcHkoc3JjW2tleV0sIGRlc1trZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG5mdW5jdGlvbiBnZXRDb21wb25lbnRPcHRpb25zKGluc3RhbmNlKSB7XHJcbiAgICByZXR1cm4gaW5zdGFuY2UudHlwZSA7XHJcbn1cclxuZnVuY3Rpb24gYWRqdXN0STE4blJlc291cmNlcyhnbG9iYWwsIG9wdGlvbnMsIGNvbXBvbmVudE9wdGlvbnMgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbikge1xyXG4gICAgbGV0IG1lc3NhZ2VzID0gaXNPYmplY3Qob3B0aW9ucy5tZXNzYWdlcykgPyBvcHRpb25zLm1lc3NhZ2VzIDoge307XHJcbiAgICBpZiAoJ19faTE4bkdsb2JhbCcgaW4gY29tcG9uZW50T3B0aW9ucykge1xyXG4gICAgICAgIG1lc3NhZ2VzID0gZ2V0TG9jYWxlTWVzc2FnZXMoZ2xvYmFsLmxvY2FsZS52YWx1ZSwge1xyXG4gICAgICAgICAgICBtZXNzYWdlcyxcclxuICAgICAgICAgICAgX19pMThuOiBjb21wb25lbnRPcHRpb25zLl9faTE4bkdsb2JhbFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gbWVyZ2UgbG9jYWxlIG1lc3NhZ2VzXHJcbiAgICBjb25zdCBsb2NhbGVzID0gT2JqZWN0LmtleXMobWVzc2FnZXMpO1xyXG4gICAgaWYgKGxvY2FsZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgbG9jYWxlcy5mb3JFYWNoKGxvY2FsZSA9PiB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5tZXJnZUxvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlc1tsb2NhbGVdKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHtcclxuICAgICAgICAvLyBtZXJnZSBkYXRldGltZSBmb3JtYXRzXHJcbiAgICAgICAgaWYgKGlzT2JqZWN0KG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzKSkge1xyXG4gICAgICAgICAgICBjb25zdCBsb2NhbGVzID0gT2JqZWN0LmtleXMob3B0aW9ucy5kYXRldGltZUZvcm1hdHMpO1xyXG4gICAgICAgICAgICBpZiAobG9jYWxlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGxvY2FsZXMuZm9yRWFjaChsb2NhbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC5tZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgb3B0aW9ucy5kYXRldGltZUZvcm1hdHNbbG9jYWxlXSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBtZXJnZSBudW1iZXIgZm9ybWF0c1xyXG4gICAgICAgIGlmIChpc09iamVjdChvcHRpb25zLm51bWJlckZvcm1hdHMpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsZXMgPSBPYmplY3Qua2V5cyhvcHRpb25zLm51bWJlckZvcm1hdHMpO1xyXG4gICAgICAgICAgICBpZiAobG9jYWxlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGxvY2FsZXMuZm9yRWFjaChsb2NhbGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC5tZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIG9wdGlvbnMubnVtYmVyRm9ybWF0c1tsb2NhbGVdKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZVRleHROb2RlKGtleSkge1xyXG4gICAgcmV0dXJuIGNyZWF0ZVZOb2RlKFRleHQsIG51bGwsIGtleSwgMClcclxuICAgICAgICA7XHJcbn1cclxuLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cclxuLy8gZXh0ZW5kIFZOb2RlIGludGVyZmFjZVxyXG5jb25zdCBERVZUT09MU19NRVRBID0gJ19fSU5UTElGWV9NRVRBX18nO1xyXG5sZXQgY29tcG9zZXJJRCA9IDA7XHJcbmZ1bmN0aW9uIGRlZmluZUNvcmVNaXNzaW5nSGFuZGxlcihtaXNzaW5nKSB7XHJcbiAgICByZXR1cm4gKChjdHgsIGxvY2FsZSwga2V5LCB0eXBlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIG1pc3NpbmcobG9jYWxlLCBrZXksIGdldEN1cnJlbnRJbnN0YW5jZSgpIHx8IHVuZGVmaW5lZCwgdHlwZSk7XHJcbiAgICB9KTtcclxufVxyXG4vLyBmb3IgSW50bGlmeSBEZXZUb29sc1xyXG5jb25zdCBnZXRNZXRhSW5mbyA9ICAoKSA9PiB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xyXG4gICAgbGV0IG1ldGEgPSBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIHJldHVybiBpbnN0YW5jZSAmJiAobWV0YSA9IGdldENvbXBvbmVudE9wdGlvbnMoaW5zdGFuY2UpW0RFVlRPT0xTX01FVEFdKVxyXG4gICAgICAgID8geyBbREVWVE9PTFNfTUVUQV06IG1ldGEgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICA6IG51bGw7XHJcbn07XHJcbi8qKlxyXG4gKiBDcmVhdGUgY29tcG9zZXIgaW50ZXJmYWNlIGZhY3RvcnlcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG5mdW5jdGlvbiBjcmVhdGVDb21wb3NlcihvcHRpb25zID0ge30sIFZ1ZUkxOG5MZWdhY3kpIHtcclxuICAgIGNvbnN0IHsgX19yb290IH0gPSBvcHRpb25zO1xyXG4gICAgY29uc3QgX2lzR2xvYmFsID0gX19yb290ID09PSB1bmRlZmluZWQ7XHJcbiAgICBsZXQgX2luaGVyaXRMb2NhbGUgPSBpc0Jvb2xlYW4ob3B0aW9ucy5pbmhlcml0TG9jYWxlKVxyXG4gICAgICAgID8gb3B0aW9ucy5pbmhlcml0TG9jYWxlXHJcbiAgICAgICAgOiB0cnVlO1xyXG4gICAgY29uc3QgX2xvY2FsZSA9IHJlZihcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgX19yb290ICYmIF9pbmhlcml0TG9jYWxlXHJcbiAgICAgICAgPyBfX3Jvb3QubG9jYWxlLnZhbHVlXHJcbiAgICAgICAgOiBpc1N0cmluZyhvcHRpb25zLmxvY2FsZSlcclxuICAgICAgICAgICAgPyBvcHRpb25zLmxvY2FsZVxyXG4gICAgICAgICAgICA6IERFRkFVTFRfTE9DQUxFKTtcclxuICAgIGNvbnN0IF9mYWxsYmFja0xvY2FsZSA9IHJlZihcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgX19yb290ICYmIF9pbmhlcml0TG9jYWxlXHJcbiAgICAgICAgPyBfX3Jvb3QuZmFsbGJhY2tMb2NhbGUudmFsdWVcclxuICAgICAgICA6IGlzU3RyaW5nKG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XHJcbiAgICAgICAgICAgIGlzQXJyYXkob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcclxuICAgICAgICAgICAgaXNQbGFpbk9iamVjdChvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxyXG4gICAgICAgICAgICBvcHRpb25zLmZhbGxiYWNrTG9jYWxlID09PSBmYWxzZVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tMb2NhbGVcclxuICAgICAgICAgICAgOiBfbG9jYWxlLnZhbHVlKTtcclxuICAgIGNvbnN0IF9tZXNzYWdlcyA9IHJlZihnZXRMb2NhbGVNZXNzYWdlcyhfbG9jYWxlLnZhbHVlLCBvcHRpb25zKSk7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IF9kYXRldGltZUZvcm1hdHMgPSByZWYoaXNQbGFpbk9iamVjdChvcHRpb25zLmRhdGV0aW1lRm9ybWF0cylcclxuICAgICAgICAgICAgPyBvcHRpb25zLmRhdGV0aW1lRm9ybWF0c1xyXG4gICAgICAgICAgICA6IHsgW19sb2NhbGUudmFsdWVdOiB7fSB9KVxyXG4gICAgICAgIDtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgY29uc3QgX251bWJlckZvcm1hdHMgPSByZWYoaXNQbGFpbk9iamVjdChvcHRpb25zLm51bWJlckZvcm1hdHMpXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5udW1iZXJGb3JtYXRzXHJcbiAgICAgICAgICAgIDogeyBbX2xvY2FsZS52YWx1ZV06IHt9IH0pXHJcbiAgICAgICAgO1xyXG4gICAgLy8gd2FybmluZyBzdXBwcmVzcyBvcHRpb25zXHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGxldCBfbWlzc2luZ1dhcm4gPSBfX3Jvb3RcclxuICAgICAgICA/IF9fcm9vdC5taXNzaW5nV2FyblxyXG4gICAgICAgIDogaXNCb29sZWFuKG9wdGlvbnMubWlzc2luZ1dhcm4pIHx8IGlzUmVnRXhwKG9wdGlvbnMubWlzc2luZ1dhcm4pXHJcbiAgICAgICAgICAgID8gb3B0aW9ucy5taXNzaW5nV2FyblxyXG4gICAgICAgICAgICA6IHRydWU7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGxldCBfZmFsbGJhY2tXYXJuID0gX19yb290XHJcbiAgICAgICAgPyBfX3Jvb3QuZmFsbGJhY2tXYXJuXHJcbiAgICAgICAgOiBpc0Jvb2xlYW4ob3B0aW9ucy5mYWxsYmFja1dhcm4pIHx8IGlzUmVnRXhwKG9wdGlvbnMuZmFsbGJhY2tXYXJuKVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tXYXJuXHJcbiAgICAgICAgICAgIDogdHJ1ZTtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgbGV0IF9mYWxsYmFja1Jvb3QgPSBfX3Jvb3RcclxuICAgICAgICA/IF9fcm9vdC5mYWxsYmFja1Jvb3RcclxuICAgICAgICA6IGlzQm9vbGVhbihvcHRpb25zLmZhbGxiYWNrUm9vdClcclxuICAgICAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrUm9vdFxyXG4gICAgICAgICAgICA6IHRydWU7XHJcbiAgICAvLyBjb25maWd1cmUgZmFsbCBiYWNrIHRvIHJvb3RcclxuICAgIGxldCBfZmFsbGJhY2tGb3JtYXQgPSAhIW9wdGlvbnMuZmFsbGJhY2tGb3JtYXQ7XHJcbiAgICAvLyBydW50aW1lIG1pc3NpbmdcclxuICAgIGxldCBfbWlzc2luZyA9IGlzRnVuY3Rpb24ob3B0aW9ucy5taXNzaW5nKSA/IG9wdGlvbnMubWlzc2luZyA6IG51bGw7XHJcbiAgICBsZXQgX3J1bnRpbWVNaXNzaW5nID0gaXNGdW5jdGlvbihvcHRpb25zLm1pc3NpbmcpXHJcbiAgICAgICAgPyBkZWZpbmVDb3JlTWlzc2luZ0hhbmRsZXIob3B0aW9ucy5taXNzaW5nKVxyXG4gICAgICAgIDogbnVsbDtcclxuICAgIC8vIHBvc3RUcmFuc2xhdGlvbiBoYW5kbGVyXHJcbiAgICBsZXQgX3Bvc3RUcmFuc2xhdGlvbiA9IGlzRnVuY3Rpb24ob3B0aW9ucy5wb3N0VHJhbnNsYXRpb24pXHJcbiAgICAgICAgPyBvcHRpb25zLnBvc3RUcmFuc2xhdGlvblxyXG4gICAgICAgIDogbnVsbDtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgbGV0IF93YXJuSHRtbE1lc3NhZ2UgPSBfX3Jvb3RcclxuICAgICAgICA/IF9fcm9vdC53YXJuSHRtbE1lc3NhZ2VcclxuICAgICAgICA6IGlzQm9vbGVhbihvcHRpb25zLndhcm5IdG1sTWVzc2FnZSlcclxuICAgICAgICAgICAgPyBvcHRpb25zLndhcm5IdG1sTWVzc2FnZVxyXG4gICAgICAgICAgICA6IHRydWU7XHJcbiAgICBsZXQgX2VzY2FwZVBhcmFtZXRlciA9ICEhb3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXI7XHJcbiAgICAvLyBjdXN0b20gbGlua2VkIG1vZGlmaWVyc1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBjb25zdCBfbW9kaWZpZXJzID0gX19yb290XHJcbiAgICAgICAgPyBfX3Jvb3QubW9kaWZpZXJzXHJcbiAgICAgICAgOiBpc1BsYWluT2JqZWN0KG9wdGlvbnMubW9kaWZpZXJzKVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMubW9kaWZpZXJzXHJcbiAgICAgICAgICAgIDoge307XHJcbiAgICAvLyBwbHVyYWxSdWxlc1xyXG4gICAgbGV0IF9wbHVyYWxSdWxlcyA9IG9wdGlvbnMucGx1cmFsUnVsZXMgfHwgKF9fcm9vdCAmJiBfX3Jvb3QucGx1cmFsUnVsZXMpO1xyXG4gICAgLy8gcnVudGltZSBjb250ZXh0XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWNvbnN0XHJcbiAgICBsZXQgX2NvbnRleHQ7XHJcbiAgICBjb25zdCBnZXRDb3JlQ29udGV4dCA9ICgpID0+IHtcclxuICAgICAgICBfaXNHbG9iYWwgJiYgc2V0RmFsbGJhY2tDb250ZXh0KG51bGwpO1xyXG4gICAgICAgIGNvbnN0IGN0eE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHZlcnNpb246IFZFUlNJT04sXHJcbiAgICAgICAgICAgIGxvY2FsZTogX2xvY2FsZS52YWx1ZSxcclxuICAgICAgICAgICAgZmFsbGJhY2tMb2NhbGU6IF9mYWxsYmFja0xvY2FsZS52YWx1ZSxcclxuICAgICAgICAgICAgbWVzc2FnZXM6IF9tZXNzYWdlcy52YWx1ZSxcclxuICAgICAgICAgICAgbW9kaWZpZXJzOiBfbW9kaWZpZXJzLFxyXG4gICAgICAgICAgICBwbHVyYWxSdWxlczogX3BsdXJhbFJ1bGVzLFxyXG4gICAgICAgICAgICBtaXNzaW5nOiBfcnVudGltZU1pc3NpbmcgPT09IG51bGwgPyB1bmRlZmluZWQgOiBfcnVudGltZU1pc3NpbmcsXHJcbiAgICAgICAgICAgIG1pc3NpbmdXYXJuOiBfbWlzc2luZ1dhcm4sXHJcbiAgICAgICAgICAgIGZhbGxiYWNrV2FybjogX2ZhbGxiYWNrV2FybixcclxuICAgICAgICAgICAgZmFsbGJhY2tGb3JtYXQ6IF9mYWxsYmFja0Zvcm1hdCxcclxuICAgICAgICAgICAgdW5yZXNvbHZpbmc6IHRydWUsXHJcbiAgICAgICAgICAgIHBvc3RUcmFuc2xhdGlvbjogX3Bvc3RUcmFuc2xhdGlvbiA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IF9wb3N0VHJhbnNsYXRpb24sXHJcbiAgICAgICAgICAgIHdhcm5IdG1sTWVzc2FnZTogX3dhcm5IdG1sTWVzc2FnZSxcclxuICAgICAgICAgICAgZXNjYXBlUGFyYW1ldGVyOiBfZXNjYXBlUGFyYW1ldGVyLFxyXG4gICAgICAgICAgICBtZXNzYWdlUmVzb2x2ZXI6IG9wdGlvbnMubWVzc2FnZVJlc29sdmVyLFxyXG4gICAgICAgICAgICBfX21ldGE6IHsgZnJhbWV3b3JrOiAndnVlJyB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN0eE9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzID0gX2RhdGV0aW1lRm9ybWF0cy52YWx1ZTtcclxuICAgICAgICAgICAgY3R4T3B0aW9ucy5udW1iZXJGb3JtYXRzID0gX251bWJlckZvcm1hdHMudmFsdWU7XHJcbiAgICAgICAgICAgIGN0eE9wdGlvbnMuX19kYXRldGltZUZvcm1hdHRlcnMgPSBpc1BsYWluT2JqZWN0KF9jb250ZXh0KVxyXG4gICAgICAgICAgICAgICAgPyBfY29udGV4dC5fX2RhdGV0aW1lRm9ybWF0dGVyc1xyXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGN0eE9wdGlvbnMuX19udW1iZXJGb3JtYXR0ZXJzID0gaXNQbGFpbk9iamVjdChfY29udGV4dClcclxuICAgICAgICAgICAgICAgID8gX2NvbnRleHQuX19udW1iZXJGb3JtYXR0ZXJzXHJcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSkge1xyXG4gICAgICAgICAgICBjdHhPcHRpb25zLl9fdl9lbWl0dGVyID0gaXNQbGFpbk9iamVjdChfY29udGV4dClcclxuICAgICAgICAgICAgICAgID8gX2NvbnRleHQuX192X2VtaXR0ZXJcclxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjdHggPSBjcmVhdGVDb3JlQ29udGV4dChjdHhPcHRpb25zKTtcclxuICAgICAgICBfaXNHbG9iYWwgJiYgc2V0RmFsbGJhY2tDb250ZXh0KGN0eCk7XHJcbiAgICAgICAgcmV0dXJuIGN0eDtcclxuICAgIH07XHJcbiAgICBfY29udGV4dCA9IGdldENvcmVDb250ZXh0KCk7XHJcbiAgICB1cGRhdGVGYWxsYmFja0xvY2FsZShfY29udGV4dCwgX2xvY2FsZS52YWx1ZSwgX2ZhbGxiYWNrTG9jYWxlLnZhbHVlKTtcclxuICAgIC8vIHRyYWNrIHJlYWN0aXZpdHlcclxuICAgIGZ1bmN0aW9uIHRyYWNrUmVhY3Rpdml0eVZhbHVlcygpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgX2xvY2FsZS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIF9mYWxsYmFja0xvY2FsZS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIF9tZXNzYWdlcy52YWx1ZSxcclxuICAgICAgICAgICAgICAgIF9kYXRldGltZUZvcm1hdHMudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBfbnVtYmVyRm9ybWF0cy52YWx1ZVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIDtcclxuICAgIH1cclxuICAgIC8vIGxvY2FsZVxyXG4gICAgY29uc3QgbG9jYWxlID0gY29tcHV0ZWQoe1xyXG4gICAgICAgIGdldDogKCkgPT4gX2xvY2FsZS52YWx1ZSxcclxuICAgICAgICBzZXQ6IHZhbCA9PiB7XHJcbiAgICAgICAgICAgIF9sb2NhbGUudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIF9jb250ZXh0LmxvY2FsZSA9IF9sb2NhbGUudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBmYWxsYmFja0xvY2FsZVxyXG4gICAgY29uc3QgZmFsbGJhY2tMb2NhbGUgPSBjb21wdXRlZCh7XHJcbiAgICAgICAgZ2V0OiAoKSA9PiBfZmFsbGJhY2tMb2NhbGUudmFsdWUsXHJcbiAgICAgICAgc2V0OiB2YWwgPT4ge1xyXG4gICAgICAgICAgICBfZmFsbGJhY2tMb2NhbGUudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIF9jb250ZXh0LmZhbGxiYWNrTG9jYWxlID0gX2ZhbGxiYWNrTG9jYWxlLnZhbHVlO1xyXG4gICAgICAgICAgICB1cGRhdGVGYWxsYmFja0xvY2FsZShfY29udGV4dCwgX2xvY2FsZS52YWx1ZSwgdmFsKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIG1lc3NhZ2VzXHJcbiAgICBjb25zdCBtZXNzYWdlcyA9IGNvbXB1dGVkKCgpID0+IF9tZXNzYWdlcy52YWx1ZSk7XHJcbiAgICAvLyBkYXRldGltZUZvcm1hdHNcclxuICAgIGNvbnN0IGRhdGV0aW1lRm9ybWF0cyA9IC8qICNfX1BVUkVfXyovIGNvbXB1dGVkKCgpID0+IF9kYXRldGltZUZvcm1hdHMudmFsdWUpO1xyXG4gICAgLy8gbnVtYmVyRm9ybWF0c1xyXG4gICAgY29uc3QgbnVtYmVyRm9ybWF0cyA9IC8qICNfX1BVUkVfXyovIGNvbXB1dGVkKCgpID0+IF9udW1iZXJGb3JtYXRzLnZhbHVlKTtcclxuICAgIC8vIGdldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXJcclxuICAgIGZ1bmN0aW9uIGdldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzRnVuY3Rpb24oX3Bvc3RUcmFuc2xhdGlvbikgPyBfcG9zdFRyYW5zbGF0aW9uIDogbnVsbDtcclxuICAgIH1cclxuICAgIC8vIHNldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXJcclxuICAgIGZ1bmN0aW9uIHNldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIoaGFuZGxlcikge1xyXG4gICAgICAgIF9wb3N0VHJhbnNsYXRpb24gPSBoYW5kbGVyO1xyXG4gICAgICAgIF9jb250ZXh0LnBvc3RUcmFuc2xhdGlvbiA9IGhhbmRsZXI7XHJcbiAgICB9XHJcbiAgICAvLyBnZXRNaXNzaW5nSGFuZGxlclxyXG4gICAgZnVuY3Rpb24gZ2V0TWlzc2luZ0hhbmRsZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9taXNzaW5nO1xyXG4gICAgfVxyXG4gICAgLy8gc2V0TWlzc2luZ0hhbmRsZXJcclxuICAgIGZ1bmN0aW9uIHNldE1pc3NpbmdIYW5kbGVyKGhhbmRsZXIpIHtcclxuICAgICAgICBpZiAoaGFuZGxlciAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBfcnVudGltZU1pc3NpbmcgPSBkZWZpbmVDb3JlTWlzc2luZ0hhbmRsZXIoaGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9taXNzaW5nID0gaGFuZGxlcjtcclxuICAgICAgICBfY29udGV4dC5taXNzaW5nID0gX3J1bnRpbWVNaXNzaW5nO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaXNSZXNvbHZlZFRyYW5zbGF0ZU1lc3NhZ2UodHlwZSwgYXJnIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGUgIT09ICd0cmFuc2xhdGUnIHx8ICFhcmcucmVzb2x2ZWRNZXNzYWdlO1xyXG4gICAgfVxyXG4gICAgY29uc3Qgd3JhcFdpdGhEZXBzID0gKGZuLCBhcmd1bWVudFBhcnNlciwgd2FyblR5cGUsIGZhbGxiYWNrU3VjY2VzcywgZmFsbGJhY2tGYWlsLCBzdWNjZXNzQ29uZGl0aW9uKSA9PiB7XHJcbiAgICAgICAgdHJhY2tSZWFjdGl2aXR5VmFsdWVzKCk7IC8vIHRyYWNrIHJlYWN0aXZlIGRlcGVuZGVuY3lcclxuICAgICAgICAvLyBOT1RFOiBleHBlcmltZW50YWwgISFcclxuICAgICAgICBsZXQgcmV0O1xyXG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgc2V0QWRkaXRpb25hbE1ldGEoZ2V0TWV0YUluZm8oKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9pc0dsb2JhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9jb250ZXh0LmZhbGxiYWNrQ29udGV4dCA9IF9fcm9vdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGdldEZhbGxiYWNrQ29udGV4dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0ID0gZm4oX2NvbnRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgc2V0QWRkaXRpb25hbE1ldGEobnVsbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIV9pc0dsb2JhbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF9jb250ZXh0LmZhbGxiYWNrQ29udGV4dCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0ID0gZm4oX2NvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNOdW1iZXIocmV0KSAmJiByZXQgPT09IE5PVF9SRU9TTFZFRCkge1xyXG4gICAgICAgICAgICBjb25zdCBba2V5LCBhcmcyXSA9IGFyZ3VtZW50UGFyc2VyKCk7XHJcbiAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiZcclxuICAgICAgICAgICAgICAgIF9fcm9vdCAmJlxyXG4gICAgICAgICAgICAgICAgaXNTdHJpbmcoa2V5KSAmJlxyXG4gICAgICAgICAgICAgICAgaXNSZXNvbHZlZFRyYW5zbGF0ZU1lc3NhZ2Uod2FyblR5cGUsIGFyZzIpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoX2ZhbGxiYWNrUm9vdCAmJlxyXG4gICAgICAgICAgICAgICAgICAgIChpc1RyYW5zbGF0ZUZhbGxiYWNrV2FybihfZmFsbGJhY2tXYXJuLCBrZXkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVHJhbnNsYXRlTWlzc2luZ1dhcm4oX21pc3NpbmdXYXJuLCBrZXkpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5GQUxMQkFDS19UT19ST09ULCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogd2FyblR5cGVcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgdnVlLWRldnRvb2xzIHRpbWVsaW5lIGV2ZW50XHJcbiAgICAgICAgICAgICAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBfX3ZfZW1pdHRlcjogZW1pdHRlciB9ID0gX2NvbnRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVtaXR0ZXIgJiYgX2ZhbGxiYWNrUm9vdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLmVtaXQoXCJmYWxsYmFja1wiIC8qIEZBTEJBQ0sgKi8sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHdhcm5UeXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86ICdnbG9iYWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogYCR7d2FyblR5cGV9OiR7a2V5fWBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBfX3Jvb3QgJiYgX2ZhbGxiYWNrUm9vdFxyXG4gICAgICAgICAgICAgICAgPyBmYWxsYmFja1N1Y2Nlc3MoX19yb290KVxyXG4gICAgICAgICAgICAgICAgOiBmYWxsYmFja0ZhaWwoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoc3VjY2Vzc0NvbmRpdGlvbihyZXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xyXG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9SRVRVUk5fVFlQRSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vIHRcclxuICAgIGZ1bmN0aW9uIHQoLi4uYXJncykge1xyXG4gICAgICAgIHJldHVybiB3cmFwV2l0aERlcHMoY29udGV4dCA9PiBSZWZsZWN0LmFwcGx5KHRyYW5zbGF0ZSwgbnVsbCwgW2NvbnRleHQsIC4uLmFyZ3NdKSwgKCkgPT4gcGFyc2VUcmFuc2xhdGVBcmdzKC4uLmFyZ3MpLCAndHJhbnNsYXRlJywgcm9vdCA9PiBSZWZsZWN0LmFwcGx5KHJvb3QudCwgcm9vdCwgWy4uLmFyZ3NdKSwga2V5ID0+IGtleSwgdmFsID0+IGlzU3RyaW5nKHZhbCkpO1xyXG4gICAgfVxyXG4gICAgLy8gcnRcclxuICAgIGZ1bmN0aW9uIHJ0KC4uLmFyZ3MpIHtcclxuICAgICAgICBjb25zdCBbYXJnMSwgYXJnMiwgYXJnM10gPSBhcmdzO1xyXG4gICAgICAgIGlmIChhcmczICYmICFpc09iamVjdChhcmczKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuSU5WQUxJRF9BUkdVTUVOVCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0KC4uLlthcmcxLCBhcmcyLCBhc3NpZ24oeyByZXNvbHZlZE1lc3NhZ2U6IHRydWUgfSwgYXJnMyB8fCB7fSldKTtcclxuICAgIH1cclxuICAgIC8vIGRcclxuICAgIGZ1bmN0aW9uIGQoLi4uYXJncykge1xyXG4gICAgICAgIHJldHVybiB3cmFwV2l0aERlcHMoY29udGV4dCA9PiBSZWZsZWN0LmFwcGx5KGRhdGV0aW1lLCBudWxsLCBbY29udGV4dCwgLi4uYXJnc10pLCAoKSA9PiBwYXJzZURhdGVUaW1lQXJncyguLi5hcmdzKSwgJ2RhdGV0aW1lIGZvcm1hdCcsIHJvb3QgPT4gUmVmbGVjdC5hcHBseShyb290LmQsIHJvb3QsIFsuLi5hcmdzXSksICgpID0+IE1JU1NJTkdfUkVTT0xWRV9WQUxVRSwgdmFsID0+IGlzU3RyaW5nKHZhbCkpO1xyXG4gICAgfVxyXG4gICAgLy8gblxyXG4gICAgZnVuY3Rpb24gbiguLi5hcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IFJlZmxlY3QuYXBwbHkobnVtYmVyLCBudWxsLCBbY29udGV4dCwgLi4uYXJnc10pLCAoKSA9PiBwYXJzZU51bWJlckFyZ3MoLi4uYXJncyksICdudW1iZXIgZm9ybWF0Jywgcm9vdCA9PiBSZWZsZWN0LmFwcGx5KHJvb3Qubiwgcm9vdCwgWy4uLmFyZ3NdKSwgKCkgPT4gTUlTU0lOR19SRVNPTFZFX1ZBTFVFLCB2YWwgPT4gaXNTdHJpbmcodmFsKSk7XHJcbiAgICB9XHJcbiAgICAvLyBmb3IgY3VzdG9tIHByb2Nlc3NvclxyXG4gICAgZnVuY3Rpb24gbm9ybWFsaXplKHZhbHVlcykge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZXMubWFwKHZhbCA9PiBpc1N0cmluZyh2YWwpIHx8IGlzTnVtYmVyKHZhbCkgfHwgaXNCb29sZWFuKHZhbClcclxuICAgICAgICAgICAgPyBjcmVhdGVUZXh0Tm9kZShTdHJpbmcodmFsKSlcclxuICAgICAgICAgICAgOiB2YWwpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaW50ZXJwb2xhdGUgPSAodmFsKSA9PiB2YWw7XHJcbiAgICBjb25zdCBwcm9jZXNzb3IgPSB7XHJcbiAgICAgICAgbm9ybWFsaXplLFxyXG4gICAgICAgIGludGVycG9sYXRlLFxyXG4gICAgICAgIHR5cGU6ICd2bm9kZSdcclxuICAgIH07XHJcbiAgICAvLyB0cmFuc3JhdGVWTm9kZSwgdXNpbmcgZm9yIGBpMThuLXRgIGNvbXBvbmVudFxyXG4gICAgZnVuY3Rpb24gdHJhbnNyYXRlVk5vZGUoLi4uYXJncykge1xyXG4gICAgICAgIHJldHVybiB3cmFwV2l0aERlcHMoY29udGV4dCA9PiB7XHJcbiAgICAgICAgICAgIGxldCByZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IF9jb250ZXh0ID0gY29udGV4dDtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIF9jb250ZXh0LnByb2Nlc3NvciA9IHByb2Nlc3NvcjtcclxuICAgICAgICAgICAgICAgIHJldCA9IFJlZmxlY3QuYXBwbHkodHJhbnNsYXRlLCBudWxsLCBbX2NvbnRleHQsIC4uLmFyZ3NdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaW5hbGx5IHtcclxuICAgICAgICAgICAgICAgIF9jb250ZXh0LnByb2Nlc3NvciA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9LCAoKSA9PiBwYXJzZVRyYW5zbGF0ZUFyZ3MoLi4uYXJncyksICd0cmFuc2xhdGUnLCBcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIHJvb3QgPT4gcm9vdFtUcmFuc3JhdGVWTm9kZVN5bWJvbF0oLi4uYXJncyksIGtleSA9PiBbY3JlYXRlVGV4dE5vZGUoa2V5KV0sIHZhbCA9PiBpc0FycmF5KHZhbCkpO1xyXG4gICAgfVxyXG4gICAgLy8gbnVtYmVyUGFydHMsIHVzaW5nIGZvciBgaTE4bi1uYCBjb21wb25lbnRcclxuICAgIGZ1bmN0aW9uIG51bWJlclBhcnRzKC4uLmFyZ3MpIHtcclxuICAgICAgICByZXR1cm4gd3JhcFdpdGhEZXBzKGNvbnRleHQgPT4gUmVmbGVjdC5hcHBseShudW1iZXIsIG51bGwsIFtjb250ZXh0LCAuLi5hcmdzXSksICgpID0+IHBhcnNlTnVtYmVyQXJncyguLi5hcmdzKSwgJ251bWJlciBmb3JtYXQnLCBcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIHJvb3QgPT4gcm9vdFtOdW1iZXJQYXJ0c1N5bWJvbF0oLi4uYXJncyksICgpID0+IFtdLCB2YWwgPT4gaXNTdHJpbmcodmFsKSB8fCBpc0FycmF5KHZhbCkpO1xyXG4gICAgfVxyXG4gICAgLy8gZGF0ZXRpbWVQYXJ0cywgdXNpbmcgZm9yIGBpMThuLWRgIGNvbXBvbmVudFxyXG4gICAgZnVuY3Rpb24gZGF0ZXRpbWVQYXJ0cyguLi5hcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIHdyYXBXaXRoRGVwcyhjb250ZXh0ID0+IFJlZmxlY3QuYXBwbHkoZGF0ZXRpbWUsIG51bGwsIFtjb250ZXh0LCAuLi5hcmdzXSksICgpID0+IHBhcnNlRGF0ZVRpbWVBcmdzKC4uLmFyZ3MpLCAnZGF0ZXRpbWUgZm9ybWF0JywgXHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICByb290ID0+IHJvb3RbRGF0ZXRpbWVQYXJ0c1N5bWJvbF0oLi4uYXJncyksICgpID0+IFtdLCB2YWwgPT4gaXNTdHJpbmcodmFsKSB8fCBpc0FycmF5KHZhbCkpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2V0UGx1cmFsUnVsZXMocnVsZXMpIHtcclxuICAgICAgICBfcGx1cmFsUnVsZXMgPSBydWxlcztcclxuICAgICAgICBfY29udGV4dC5wbHVyYWxSdWxlcyA9IF9wbHVyYWxSdWxlcztcclxuICAgIH1cclxuICAgIC8vIHRlXHJcbiAgICBmdW5jdGlvbiB0ZShrZXksIGxvY2FsZSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldExvY2FsZSA9IGlzU3RyaW5nKGxvY2FsZSkgPyBsb2NhbGUgOiBfbG9jYWxlLnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBnZXRMb2NhbGVNZXNzYWdlKHRhcmdldExvY2FsZSk7XHJcbiAgICAgICAgcmV0dXJuIF9jb250ZXh0Lm1lc3NhZ2VSZXNvbHZlcihtZXNzYWdlLCBrZXkpICE9PSBudWxsO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVzb2x2ZU1lc3NhZ2VzKGtleSkge1xyXG4gICAgICAgIGxldCBtZXNzYWdlcyA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgbG9jYWxlcyA9IGZhbGxiYWNrV2l0aExvY2FsZUNoYWluKF9jb250ZXh0LCBfZmFsbGJhY2tMb2NhbGUudmFsdWUsIF9sb2NhbGUudmFsdWUpO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9jYWxlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXRMb2NhbGVNZXNzYWdlcyA9IF9tZXNzYWdlcy52YWx1ZVtsb2NhbGVzW2ldXSB8fCB7fTtcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZVZhbHVlID0gX2NvbnRleHQubWVzc2FnZVJlc29sdmVyKHRhcmdldExvY2FsZU1lc3NhZ2VzLCBrZXkpO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZVZhbHVlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzID0gbWVzc2FnZVZhbHVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VzO1xyXG4gICAgfVxyXG4gICAgLy8gdG1cclxuICAgIGZ1bmN0aW9uIHRtKGtleSkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzID0gcmVzb2x2ZU1lc3NhZ2VzKGtleSk7XHJcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICAgICAgcmV0dXJuIG1lc3NhZ2VzICE9IG51bGxcclxuICAgICAgICAgICAgPyBtZXNzYWdlc1xyXG4gICAgICAgICAgICA6IF9fcm9vdFxyXG4gICAgICAgICAgICAgICAgPyBfX3Jvb3QudG0oa2V5KSB8fCB7fVxyXG4gICAgICAgICAgICAgICAgOiB7fTtcclxuICAgIH1cclxuICAgIC8vIGdldExvY2FsZU1lc3NhZ2VcclxuICAgIGZ1bmN0aW9uIGdldExvY2FsZU1lc3NhZ2UobG9jYWxlKSB7XHJcbiAgICAgICAgcmV0dXJuIChfbWVzc2FnZXMudmFsdWVbbG9jYWxlXSB8fCB7fSk7XHJcbiAgICB9XHJcbiAgICAvLyBzZXRMb2NhbGVNZXNzYWdlXHJcbiAgICBmdW5jdGlvbiBzZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSkge1xyXG4gICAgICAgIF9tZXNzYWdlcy52YWx1ZVtsb2NhbGVdID0gbWVzc2FnZTtcclxuICAgICAgICBfY29udGV4dC5tZXNzYWdlcyA9IF9tZXNzYWdlcy52YWx1ZTtcclxuICAgIH1cclxuICAgIC8vIG1lcmdlTG9jYWxlTWVzc2FnZVxyXG4gICAgZnVuY3Rpb24gbWVyZ2VMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSkge1xyXG4gICAgICAgIF9tZXNzYWdlcy52YWx1ZVtsb2NhbGVdID0gX21lc3NhZ2VzLnZhbHVlW2xvY2FsZV0gfHwge307XHJcbiAgICAgICAgZGVlcENvcHkobWVzc2FnZSwgX21lc3NhZ2VzLnZhbHVlW2xvY2FsZV0pO1xyXG4gICAgICAgIF9jb250ZXh0Lm1lc3NhZ2VzID0gX21lc3NhZ2VzLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy8gZ2V0RGF0ZVRpbWVGb3JtYXRcclxuICAgIGZ1bmN0aW9uIGdldERhdGVUaW1lRm9ybWF0KGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlW2xvY2FsZV0gfHwge307XHJcbiAgICB9XHJcbiAgICAvLyBzZXREYXRlVGltZUZvcm1hdFxyXG4gICAgZnVuY3Rpb24gc2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcclxuICAgICAgICBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlW2xvY2FsZV0gPSBmb3JtYXQ7XHJcbiAgICAgICAgX2NvbnRleHQuZGF0ZXRpbWVGb3JtYXRzID0gX2RhdGV0aW1lRm9ybWF0cy52YWx1ZTtcclxuICAgICAgICBjbGVhckRhdGVUaW1lRm9ybWF0KF9jb250ZXh0LCBsb2NhbGUsIGZvcm1hdCk7XHJcbiAgICB9XHJcbiAgICAvLyBtZXJnZURhdGVUaW1lRm9ybWF0XHJcbiAgICBmdW5jdGlvbiBtZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XHJcbiAgICAgICAgX2RhdGV0aW1lRm9ybWF0cy52YWx1ZVtsb2NhbGVdID0gYXNzaWduKF9kYXRldGltZUZvcm1hdHMudmFsdWVbbG9jYWxlXSB8fCB7fSwgZm9ybWF0KTtcclxuICAgICAgICBfY29udGV4dC5kYXRldGltZUZvcm1hdHMgPSBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlO1xyXG4gICAgICAgIGNsZWFyRGF0ZVRpbWVGb3JtYXQoX2NvbnRleHQsIGxvY2FsZSwgZm9ybWF0KTtcclxuICAgIH1cclxuICAgIC8vIGdldE51bWJlckZvcm1hdFxyXG4gICAgZnVuY3Rpb24gZ2V0TnVtYmVyRm9ybWF0KGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBfbnVtYmVyRm9ybWF0cy52YWx1ZVtsb2NhbGVdIHx8IHt9O1xyXG4gICAgfVxyXG4gICAgLy8gc2V0TnVtYmVyRm9ybWF0XHJcbiAgICBmdW5jdGlvbiBzZXROdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcclxuICAgICAgICBfbnVtYmVyRm9ybWF0cy52YWx1ZVtsb2NhbGVdID0gZm9ybWF0O1xyXG4gICAgICAgIF9jb250ZXh0Lm51bWJlckZvcm1hdHMgPSBfbnVtYmVyRm9ybWF0cy52YWx1ZTtcclxuICAgICAgICBjbGVhck51bWJlckZvcm1hdChfY29udGV4dCwgbG9jYWxlLCBmb3JtYXQpO1xyXG4gICAgfVxyXG4gICAgLy8gbWVyZ2VOdW1iZXJGb3JtYXRcclxuICAgIGZ1bmN0aW9uIG1lcmdlTnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XHJcbiAgICAgICAgX251bWJlckZvcm1hdHMudmFsdWVbbG9jYWxlXSA9IGFzc2lnbihfbnVtYmVyRm9ybWF0cy52YWx1ZVtsb2NhbGVdIHx8IHt9LCBmb3JtYXQpO1xyXG4gICAgICAgIF9jb250ZXh0Lm51bWJlckZvcm1hdHMgPSBfbnVtYmVyRm9ybWF0cy52YWx1ZTtcclxuICAgICAgICBjbGVhck51bWJlckZvcm1hdChfY29udGV4dCwgbG9jYWxlLCBmb3JtYXQpO1xyXG4gICAgfVxyXG4gICAgLy8gZm9yIGRlYnVnXHJcbiAgICBjb21wb3NlcklEKys7XHJcbiAgICAvLyB3YXRjaCByb290IGxvY2FsZSAmIGZhbGxiYWNrTG9jYWxlXHJcbiAgICBpZiAoX19yb290ICYmIGluQnJvd3Nlcikge1xyXG4gICAgICAgIHdhdGNoKF9fcm9vdC5sb2NhbGUsICh2YWwpID0+IHtcclxuICAgICAgICAgICAgaWYgKF9pbmhlcml0TG9jYWxlKSB7XHJcbiAgICAgICAgICAgICAgICBfbG9jYWxlLnZhbHVlID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgX2NvbnRleHQubG9jYWxlID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlRmFsbGJhY2tMb2NhbGUoX2NvbnRleHQsIF9sb2NhbGUudmFsdWUsIF9mYWxsYmFja0xvY2FsZS52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB3YXRjaChfX3Jvb3QuZmFsbGJhY2tMb2NhbGUsICh2YWwpID0+IHtcclxuICAgICAgICAgICAgaWYgKF9pbmhlcml0TG9jYWxlKSB7XHJcbiAgICAgICAgICAgICAgICBfZmFsbGJhY2tMb2NhbGUudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgICAgICBfY29udGV4dC5mYWxsYmFja0xvY2FsZSA9IHZhbDtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUZhbGxiYWNrTG9jYWxlKF9jb250ZXh0LCBfbG9jYWxlLnZhbHVlLCBfZmFsbGJhY2tMb2NhbGUudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBkZWZpbmUgYmFzaWMgY29tcG9zaXRpb24gQVBJIVxyXG4gICAgY29uc3QgY29tcG9zZXIgPSB7XHJcbiAgICAgICAgaWQ6IGNvbXBvc2VySUQsXHJcbiAgICAgICAgbG9jYWxlLFxyXG4gICAgICAgIGZhbGxiYWNrTG9jYWxlLFxyXG4gICAgICAgIGdldCBpbmhlcml0TG9jYWxlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX2luaGVyaXRMb2NhbGU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQgaW5oZXJpdExvY2FsZSh2YWwpIHtcclxuICAgICAgICAgICAgX2luaGVyaXRMb2NhbGUgPSB2YWw7XHJcbiAgICAgICAgICAgIGlmICh2YWwgJiYgX19yb290KSB7XHJcbiAgICAgICAgICAgICAgICBfbG9jYWxlLnZhbHVlID0gX19yb290LmxvY2FsZS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIF9mYWxsYmFja0xvY2FsZS52YWx1ZSA9IF9fcm9vdC5mYWxsYmFja0xvY2FsZS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZUZhbGxiYWNrTG9jYWxlKF9jb250ZXh0LCBfbG9jYWxlLnZhbHVlLCBfZmFsbGJhY2tMb2NhbGUudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgYXZhaWxhYmxlTG9jYWxlcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKF9tZXNzYWdlcy52YWx1ZSkuc29ydCgpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWVzc2FnZXMsXHJcbiAgICAgICAgZ2V0IG1vZGlmaWVycygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9tb2RpZmllcnM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgcGx1cmFsUnVsZXMoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfcGx1cmFsUnVsZXMgfHwge307XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgaXNHbG9iYWwoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfaXNHbG9iYWw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgbWlzc2luZ1dhcm4oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfbWlzc2luZ1dhcm47XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQgbWlzc2luZ1dhcm4odmFsKSB7XHJcbiAgICAgICAgICAgIF9taXNzaW5nV2FybiA9IHZhbDtcclxuICAgICAgICAgICAgX2NvbnRleHQubWlzc2luZ1dhcm4gPSBfbWlzc2luZ1dhcm47XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgZmFsbGJhY2tXYXJuKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX2ZhbGxiYWNrV2FybjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCBmYWxsYmFja1dhcm4odmFsKSB7XHJcbiAgICAgICAgICAgIF9mYWxsYmFja1dhcm4gPSB2YWw7XHJcbiAgICAgICAgICAgIF9jb250ZXh0LmZhbGxiYWNrV2FybiA9IF9mYWxsYmFja1dhcm47XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgZmFsbGJhY2tSb290KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX2ZhbGxiYWNrUm9vdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCBmYWxsYmFja1Jvb3QodmFsKSB7XHJcbiAgICAgICAgICAgIF9mYWxsYmFja1Jvb3QgPSB2YWw7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgZmFsbGJhY2tGb3JtYXQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfZmFsbGJhY2tGb3JtYXQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQgZmFsbGJhY2tGb3JtYXQodmFsKSB7XHJcbiAgICAgICAgICAgIF9mYWxsYmFja0Zvcm1hdCA9IHZhbDtcclxuICAgICAgICAgICAgX2NvbnRleHQuZmFsbGJhY2tGb3JtYXQgPSBfZmFsbGJhY2tGb3JtYXQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgd2Fybkh0bWxNZXNzYWdlKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX3dhcm5IdG1sTWVzc2FnZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCB3YXJuSHRtbE1lc3NhZ2UodmFsKSB7XHJcbiAgICAgICAgICAgIF93YXJuSHRtbE1lc3NhZ2UgPSB2YWw7XHJcbiAgICAgICAgICAgIF9jb250ZXh0Lndhcm5IdG1sTWVzc2FnZSA9IHZhbDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBlc2NhcGVQYXJhbWV0ZXIoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfZXNjYXBlUGFyYW1ldGVyO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0IGVzY2FwZVBhcmFtZXRlcih2YWwpIHtcclxuICAgICAgICAgICAgX2VzY2FwZVBhcmFtZXRlciA9IHZhbDtcclxuICAgICAgICAgICAgX2NvbnRleHQuZXNjYXBlUGFyYW1ldGVyID0gdmFsO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdCxcclxuICAgICAgICBnZXRMb2NhbGVNZXNzYWdlLFxyXG4gICAgICAgIHNldExvY2FsZU1lc3NhZ2UsXHJcbiAgICAgICAgbWVyZ2VMb2NhbGVNZXNzYWdlLFxyXG4gICAgICAgIGdldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIsXHJcbiAgICAgICAgc2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcixcclxuICAgICAgICBnZXRNaXNzaW5nSGFuZGxlcixcclxuICAgICAgICBzZXRNaXNzaW5nSGFuZGxlcixcclxuICAgICAgICBbU2V0UGx1cmFsUnVsZXNTeW1ib2xdOiBzZXRQbHVyYWxSdWxlc1xyXG4gICAgfTtcclxuICAgIHtcclxuICAgICAgICBjb21wb3Nlci5kYXRldGltZUZvcm1hdHMgPSBkYXRldGltZUZvcm1hdHM7XHJcbiAgICAgICAgY29tcG9zZXIubnVtYmVyRm9ybWF0cyA9IG51bWJlckZvcm1hdHM7XHJcbiAgICAgICAgY29tcG9zZXIucnQgPSBydDtcclxuICAgICAgICBjb21wb3Nlci50ZSA9IHRlO1xyXG4gICAgICAgIGNvbXBvc2VyLnRtID0gdG07XHJcbiAgICAgICAgY29tcG9zZXIuZCA9IGQ7XHJcbiAgICAgICAgY29tcG9zZXIubiA9IG47XHJcbiAgICAgICAgY29tcG9zZXIuZ2V0RGF0ZVRpbWVGb3JtYXQgPSBnZXREYXRlVGltZUZvcm1hdDtcclxuICAgICAgICBjb21wb3Nlci5zZXREYXRlVGltZUZvcm1hdCA9IHNldERhdGVUaW1lRm9ybWF0O1xyXG4gICAgICAgIGNvbXBvc2VyLm1lcmdlRGF0ZVRpbWVGb3JtYXQgPSBtZXJnZURhdGVUaW1lRm9ybWF0O1xyXG4gICAgICAgIGNvbXBvc2VyLmdldE51bWJlckZvcm1hdCA9IGdldE51bWJlckZvcm1hdDtcclxuICAgICAgICBjb21wb3Nlci5zZXROdW1iZXJGb3JtYXQgPSBzZXROdW1iZXJGb3JtYXQ7XHJcbiAgICAgICAgY29tcG9zZXIubWVyZ2VOdW1iZXJGb3JtYXQgPSBtZXJnZU51bWJlckZvcm1hdDtcclxuICAgICAgICBjb21wb3NlcltJbmVqY3RXaXRoT3B0aW9uXSA9IG9wdGlvbnMuX19pbmplY3RXaXRoT3B0aW9uO1xyXG4gICAgICAgIGNvbXBvc2VyW1RyYW5zcmF0ZVZOb2RlU3ltYm9sXSA9IHRyYW5zcmF0ZVZOb2RlO1xyXG4gICAgICAgIGNvbXBvc2VyW0RhdGV0aW1lUGFydHNTeW1ib2xdID0gZGF0ZXRpbWVQYXJ0cztcclxuICAgICAgICBjb21wb3NlcltOdW1iZXJQYXJ0c1N5bWJvbF0gPSBudW1iZXJQYXJ0cztcclxuICAgIH1cclxuICAgIC8vIGZvciB2dWUtZGV2dG9vbHMgdGltZWxpbmUgZXZlbnRcclxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcclxuICAgICAgICBjb21wb3NlcltFbmFibGVFbWl0dGVyXSA9IChlbWl0dGVyKSA9PiB7XHJcbiAgICAgICAgICAgIF9jb250ZXh0Ll9fdl9lbWl0dGVyID0gZW1pdHRlcjtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbXBvc2VyW0Rpc2FibGVFbWl0dGVyXSA9ICgpID0+IHtcclxuICAgICAgICAgICAgX2NvbnRleHQuX192X2VtaXR0ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb21wb3NlcjtcclxufVxyXG4vKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xyXG4vKipcclxuICogQ29udmVydCB0byBJMThuIENvbXBvc2VyIE9wdGlvbnMgZnJvbSBWdWVJMThuIE9wdGlvbnNcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG5mdW5jdGlvbiBjb252ZXJ0Q29tcG9zZXJPcHRpb25zKG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGxvY2FsZSA9IGlzU3RyaW5nKG9wdGlvbnMubG9jYWxlKSA/IG9wdGlvbnMubG9jYWxlIDogREVGQVVMVF9MT0NBTEU7XHJcbiAgICBjb25zdCBmYWxsYmFja0xvY2FsZSA9IGlzU3RyaW5nKG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XHJcbiAgICAgICAgaXNBcnJheShvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxyXG4gICAgICAgIGlzUGxhaW5PYmplY3Qob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcclxuICAgICAgICBvcHRpb25zLmZhbGxiYWNrTG9jYWxlID09PSBmYWxzZVxyXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja0xvY2FsZVxyXG4gICAgICAgIDogbG9jYWxlO1xyXG4gICAgY29uc3QgbWlzc2luZyA9IGlzRnVuY3Rpb24ob3B0aW9ucy5taXNzaW5nKSA/IG9wdGlvbnMubWlzc2luZyA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IG1pc3NpbmdXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMuc2lsZW50VHJhbnNsYXRpb25XYXJuKSB8fFxyXG4gICAgICAgIGlzUmVnRXhwKG9wdGlvbnMuc2lsZW50VHJhbnNsYXRpb25XYXJuKVxyXG4gICAgICAgID8gIW9wdGlvbnMuc2lsZW50VHJhbnNsYXRpb25XYXJuXHJcbiAgICAgICAgOiB0cnVlO1xyXG4gICAgY29uc3QgZmFsbGJhY2tXYXJuID0gaXNCb29sZWFuKG9wdGlvbnMuc2lsZW50RmFsbGJhY2tXYXJuKSB8fFxyXG4gICAgICAgIGlzUmVnRXhwKG9wdGlvbnMuc2lsZW50RmFsbGJhY2tXYXJuKVxyXG4gICAgICAgID8gIW9wdGlvbnMuc2lsZW50RmFsbGJhY2tXYXJuXHJcbiAgICAgICAgOiB0cnVlO1xyXG4gICAgY29uc3QgZmFsbGJhY2tSb290ID0gaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tSb290KVxyXG4gICAgICAgID8gb3B0aW9ucy5mYWxsYmFja1Jvb3RcclxuICAgICAgICA6IHRydWU7XHJcbiAgICBjb25zdCBmYWxsYmFja0Zvcm1hdCA9ICEhb3B0aW9ucy5mb3JtYXRGYWxsYmFja01lc3NhZ2VzO1xyXG4gICAgY29uc3QgbW9kaWZpZXJzID0gaXNQbGFpbk9iamVjdChvcHRpb25zLm1vZGlmaWVycykgPyBvcHRpb25zLm1vZGlmaWVycyA6IHt9O1xyXG4gICAgY29uc3QgcGx1cmFsaXphdGlvblJ1bGVzID0gb3B0aW9ucy5wbHVyYWxpemF0aW9uUnVsZXM7XHJcbiAgICBjb25zdCBwb3N0VHJhbnNsYXRpb24gPSBpc0Z1bmN0aW9uKG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uKVxyXG4gICAgICAgID8gb3B0aW9ucy5wb3N0VHJhbnNsYXRpb25cclxuICAgICAgICA6IHVuZGVmaW5lZDtcclxuICAgIGNvbnN0IHdhcm5IdG1sTWVzc2FnZSA9IGlzU3RyaW5nKG9wdGlvbnMud2Fybkh0bWxJbk1lc3NhZ2UpXHJcbiAgICAgICAgPyBvcHRpb25zLndhcm5IdG1sSW5NZXNzYWdlICE9PSAnb2ZmJ1xyXG4gICAgICAgIDogdHJ1ZTtcclxuICAgIGNvbnN0IGVzY2FwZVBhcmFtZXRlciA9ICEhb3B0aW9ucy5lc2NhcGVQYXJhbWV0ZXJIdG1sO1xyXG4gICAgY29uc3QgaW5oZXJpdExvY2FsZSA9IGlzQm9vbGVhbihvcHRpb25zLnN5bmMpID8gb3B0aW9ucy5zeW5jIDogdHJ1ZTtcclxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgb3B0aW9ucy5mb3JtYXR0ZXIpIHtcclxuICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9GT1JNQVRURVIpKTtcclxuICAgIH1cclxuICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgb3B0aW9ucy5wcmVzZXJ2ZURpcmVjdGl2ZUNvbnRlbnQpIHtcclxuICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9QUkVTRVJWRV9ESVJFQ1RJVkUpKTtcclxuICAgIH1cclxuICAgIGxldCBtZXNzYWdlcyA9IG9wdGlvbnMubWVzc2FnZXM7XHJcbiAgICBpZiAoaXNQbGFpbk9iamVjdChvcHRpb25zLnNoYXJlZE1lc3NhZ2VzKSkge1xyXG4gICAgICAgIGNvbnN0IHNoYXJlZE1lc3NhZ2VzID0gb3B0aW9ucy5zaGFyZWRNZXNzYWdlcztcclxuICAgICAgICBjb25zdCBsb2NhbGVzID0gT2JqZWN0LmtleXMoc2hhcmVkTWVzc2FnZXMpO1xyXG4gICAgICAgIG1lc3NhZ2VzID0gbG9jYWxlcy5yZWR1Y2UoKG1lc3NhZ2VzLCBsb2NhbGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IG1lc3NhZ2VzW2xvY2FsZV0gfHwgKG1lc3NhZ2VzW2xvY2FsZV0gPSB7fSk7XHJcbiAgICAgICAgICAgIGFzc2lnbihtZXNzYWdlLCBzaGFyZWRNZXNzYWdlc1tsb2NhbGVdKTtcclxuICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2VzO1xyXG4gICAgICAgIH0sIChtZXNzYWdlcyB8fCB7fSkpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyBfX2kxOG4sIF9fcm9vdCwgX19pbmplY3RXaXRoT3B0aW9uIH0gPSBvcHRpb25zO1xyXG4gICAgY29uc3QgZGF0ZXRpbWVGb3JtYXRzID0gb3B0aW9ucy5kYXRldGltZUZvcm1hdHM7XHJcbiAgICBjb25zdCBudW1iZXJGb3JtYXRzID0gb3B0aW9ucy5udW1iZXJGb3JtYXRzO1xyXG4gICAgY29uc3QgZmxhdEpzb24gPSBvcHRpb25zLmZsYXRKc29uO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBsb2NhbGUsXHJcbiAgICAgICAgZmFsbGJhY2tMb2NhbGUsXHJcbiAgICAgICAgbWVzc2FnZXMsXHJcbiAgICAgICAgZmxhdEpzb24sXHJcbiAgICAgICAgZGF0ZXRpbWVGb3JtYXRzLFxyXG4gICAgICAgIG51bWJlckZvcm1hdHMsXHJcbiAgICAgICAgbWlzc2luZyxcclxuICAgICAgICBtaXNzaW5nV2FybixcclxuICAgICAgICBmYWxsYmFja1dhcm4sXHJcbiAgICAgICAgZmFsbGJhY2tSb290LFxyXG4gICAgICAgIGZhbGxiYWNrRm9ybWF0LFxyXG4gICAgICAgIG1vZGlmaWVycyxcclxuICAgICAgICBwbHVyYWxSdWxlczogcGx1cmFsaXphdGlvblJ1bGVzLFxyXG4gICAgICAgIHBvc3RUcmFuc2xhdGlvbixcclxuICAgICAgICB3YXJuSHRtbE1lc3NhZ2UsXHJcbiAgICAgICAgZXNjYXBlUGFyYW1ldGVyLFxyXG4gICAgICAgIG1lc3NhZ2VSZXNvbHZlcjogb3B0aW9ucy5tZXNzYWdlUmVzb2x2ZXIsXHJcbiAgICAgICAgaW5oZXJpdExvY2FsZSxcclxuICAgICAgICBfX2kxOG4sXHJcbiAgICAgICAgX19yb290LFxyXG4gICAgICAgIF9faW5qZWN0V2l0aE9wdGlvblxyXG4gICAgfTtcclxufVxyXG4vKipcclxuICogY3JlYXRlIFZ1ZUkxOG4gaW50ZXJmYWNlIGZhY3RvcnlcclxuICpcclxuICogQGludGVybmFsXHJcbiAqL1xyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG5mdW5jdGlvbiBjcmVhdGVWdWVJMThuKG9wdGlvbnMgPSB7fSwgVnVlSTE4bkxlZ2FjeSkge1xyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGNvbXBvc2VyID0gY3JlYXRlQ29tcG9zZXIoY29udmVydENvbXBvc2VyT3B0aW9ucyhvcHRpb25zKSk7XHJcbiAgICAgICAgLy8gZGVmaW5lcyBWdWVJMThuXHJcbiAgICAgICAgY29uc3QgdnVlSTE4biA9IHtcclxuICAgICAgICAgICAgLy8gaWRcclxuICAgICAgICAgICAgaWQ6IGNvbXBvc2VyLmlkLFxyXG4gICAgICAgICAgICAvLyBsb2NhbGVcclxuICAgICAgICAgICAgZ2V0IGxvY2FsZSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5sb2NhbGUudmFsdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCBsb2NhbGUodmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5sb2NhbGUudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGZhbGxiYWNrTG9jYWxlXHJcbiAgICAgICAgICAgIGdldCBmYWxsYmFja0xvY2FsZSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5mYWxsYmFja0xvY2FsZS52YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IGZhbGxiYWNrTG9jYWxlKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tMb2NhbGUudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIG1lc3NhZ2VzXHJcbiAgICAgICAgICAgIGdldCBtZXNzYWdlcygpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5tZXNzYWdlcy52YWx1ZTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gZGF0ZXRpbWVGb3JtYXRzXHJcbiAgICAgICAgICAgIGdldCBkYXRldGltZUZvcm1hdHMoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZGF0ZXRpbWVGb3JtYXRzLnZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBudW1iZXJGb3JtYXRzXHJcbiAgICAgICAgICAgIGdldCBudW1iZXJGb3JtYXRzKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLm51bWJlckZvcm1hdHMudmFsdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGF2YWlsYWJsZUxvY2FsZXNcclxuICAgICAgICAgICAgZ2V0IGF2YWlsYWJsZUxvY2FsZXMoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuYXZhaWxhYmxlTG9jYWxlcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gZm9ybWF0dGVyXHJcbiAgICAgICAgICAgIGdldCBmb3JtYXR0ZXIoKSB7XHJcbiAgICAgICAgICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfRk9STUFUVEVSKSk7XHJcbiAgICAgICAgICAgICAgICAvLyBkdW1teVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICBpbnRlcnBvbGF0ZSgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCBmb3JtYXR0ZXIodmFsKSB7XHJcbiAgICAgICAgICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiYgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfRk9STUFUVEVSKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIG1pc3NpbmdcclxuICAgICAgICAgICAgZ2V0IG1pc3NpbmcoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIuZ2V0TWlzc2luZ0hhbmRsZXIoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IG1pc3NpbmcoaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgY29tcG9zZXIuc2V0TWlzc2luZ0hhbmRsZXIoaGFuZGxlcik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIHNpbGVudFRyYW5zbGF0aW9uV2FyblxyXG4gICAgICAgICAgICBnZXQgc2lsZW50VHJhbnNsYXRpb25XYXJuKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzQm9vbGVhbihjb21wb3Nlci5taXNzaW5nV2FybilcclxuICAgICAgICAgICAgICAgICAgICA/ICFjb21wb3Nlci5taXNzaW5nV2FyblxyXG4gICAgICAgICAgICAgICAgICAgIDogY29tcG9zZXIubWlzc2luZ1dhcm47XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCBzaWxlbnRUcmFuc2xhdGlvbldhcm4odmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5taXNzaW5nV2FybiA9IGlzQm9vbGVhbih2YWwpID8gIXZhbCA6IHZhbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gc2lsZW50RmFsbGJhY2tXYXJuXHJcbiAgICAgICAgICAgIGdldCBzaWxlbnRGYWxsYmFja1dhcm4oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNCb29sZWFuKGNvbXBvc2VyLmZhbGxiYWNrV2FybilcclxuICAgICAgICAgICAgICAgICAgICA/ICFjb21wb3Nlci5mYWxsYmFja1dhcm5cclxuICAgICAgICAgICAgICAgICAgICA6IGNvbXBvc2VyLmZhbGxiYWNrV2FybjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IHNpbGVudEZhbGxiYWNrV2Fybih2YWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrV2FybiA9IGlzQm9vbGVhbih2YWwpID8gIXZhbCA6IHZhbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gbW9kaWZpZXJzXHJcbiAgICAgICAgICAgIGdldCBtb2RpZmllcnMoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIubW9kaWZpZXJzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBmb3JtYXRGYWxsYmFja01lc3NhZ2VzXHJcbiAgICAgICAgICAgIGdldCBmb3JtYXRGYWxsYmFja01lc3NhZ2VzKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmZhbGxiYWNrRm9ybWF0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgZm9ybWF0RmFsbGJhY2tNZXNzYWdlcyh2YWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrRm9ybWF0ID0gdmFsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBwb3N0VHJhbnNsYXRpb25cclxuICAgICAgICAgICAgZ2V0IHBvc3RUcmFuc2xhdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5nZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCBwb3N0VHJhbnNsYXRpb24oaGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgY29tcG9zZXIuc2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcihoYW5kbGVyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gc3luY1xyXG4gICAgICAgICAgICBnZXQgc3luYygpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5pbmhlcml0TG9jYWxlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQgc3luYyh2YWwpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvc2VyLmluaGVyaXRMb2NhbGUgPSB2YWw7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIHdhcm5Jbkh0bWxNZXNzYWdlXHJcbiAgICAgICAgICAgIGdldCB3YXJuSHRtbEluTWVzc2FnZSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci53YXJuSHRtbE1lc3NhZ2UgPyAnd2FybicgOiAnb2ZmJztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0IHdhcm5IdG1sSW5NZXNzYWdlKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9zZXIud2Fybkh0bWxNZXNzYWdlID0gdmFsICE9PSAnb2ZmJztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gZXNjYXBlUGFyYW1ldGVySHRtbFxyXG4gICAgICAgICAgICBnZXQgZXNjYXBlUGFyYW1ldGVySHRtbCgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5lc2NhcGVQYXJhbWV0ZXI7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCBlc2NhcGVQYXJhbWV0ZXJIdG1sKHZhbCkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9zZXIuZXNjYXBlUGFyYW1ldGVyID0gdmFsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBwcmVzZXJ2ZURpcmVjdGl2ZUNvbnRlbnRcclxuICAgICAgICAgICAgZ2V0IHByZXNlcnZlRGlyZWN0aXZlQ29udGVudCgpIHtcclxuICAgICAgICAgICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX1BSRVNFUlZFX0RJUkVDVElWRSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldCBwcmVzZXJ2ZURpcmVjdGl2ZUNvbnRlbnQodmFsKSB7XHJcbiAgICAgICAgICAgICAgICAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgJiZcclxuICAgICAgICAgICAgICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuTk9UX1NVUFBPUlRFRF9QUkVTRVJWRV9ESVJFQ1RJVkUpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gcGx1cmFsaXphdGlvblJ1bGVzXHJcbiAgICAgICAgICAgIGdldCBwbHVyYWxpemF0aW9uUnVsZXMoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZXIucGx1cmFsUnVsZXMgfHwge307XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGZvciBpbnRlcm5hbFxyXG4gICAgICAgICAgICBfX2NvbXBvc2VyOiBjb21wb3NlcixcclxuICAgICAgICAgICAgLy8gdFxyXG4gICAgICAgICAgICB0KC4uLmFyZ3MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFthcmcxLCBhcmcyLCBhcmczXSA9IGFyZ3M7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge307XHJcbiAgICAgICAgICAgICAgICBsZXQgbGlzdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZWQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1N0cmluZyhhcmcxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5JTlZBTElEX0FSR1VNRU5UKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGFyZzE7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTdHJpbmcoYXJnMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IGFyZzI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0FycmF5KGFyZzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IGFyZzI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZWQgPSBhcmcyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkoYXJnMykpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0ID0gYXJnMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3QoYXJnMykpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lZCA9IGFyZzM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyByZXR1cm4gY29tcG9zZXIudChrZXksIChsaXN0IHx8IG5hbWVkIHx8IHt9KSBhcyBhbnksIG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5hcHBseShjb21wb3Nlci50LCBjb21wb3NlciwgW1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgICAgICAgICAobGlzdCB8fCBuYW1lZCB8fCB7fSksXHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJ0KC4uLmFyZ3MpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmFwcGx5KGNvbXBvc2VyLnJ0LCBjb21wb3NlciwgWy4uLmFyZ3NdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gdGNcclxuICAgICAgICAgICAgdGMoLi4uYXJncykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW2FyZzEsIGFyZzIsIGFyZzNdID0gYXJncztcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IHBsdXJhbDogMSB9O1xyXG4gICAgICAgICAgICAgICAgbGV0IGxpc3QgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWVkID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmICghaXNTdHJpbmcoYXJnMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuSU5WQUxJRF9BUkdVTUVOVCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBhcmcxO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU3RyaW5nKGFyZzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBhcmcyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNOdW1iZXIoYXJnMikpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnBsdXJhbCA9IGFyZzI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc0FycmF5KGFyZzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdCA9IGFyZzI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KGFyZzIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZWQgPSBhcmcyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzU3RyaW5nKGFyZzMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBhcmczO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNBcnJheShhcmczKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3QgPSBhcmczO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChhcmczKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVkID0gYXJnMztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHJldHVybiBjb21wb3Nlci50KGtleSwgKGxpc3QgfHwgbmFtZWQgfHwge30pIGFzIGFueSwgb3B0aW9ucylcclxuICAgICAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmFwcGx5KGNvbXBvc2VyLnQsIGNvbXBvc2VyLCBbXHJcbiAgICAgICAgICAgICAgICAgICAga2V5LFxyXG4gICAgICAgICAgICAgICAgICAgIChsaXN0IHx8IG5hbWVkIHx8IHt9KSxcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zXHJcbiAgICAgICAgICAgICAgICBdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gdGVcclxuICAgICAgICAgICAgdGUoa2V5LCBsb2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci50ZShrZXksIGxvY2FsZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIHRtXHJcbiAgICAgICAgICAgIHRtKGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLnRtKGtleSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGdldExvY2FsZU1lc3NhZ2VcclxuICAgICAgICAgICAgZ2V0TG9jYWxlTWVzc2FnZShsb2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5nZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIHNldExvY2FsZU1lc3NhZ2VcclxuICAgICAgICAgICAgc2V0TG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvc2VyLnNldExvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gbWVyZ2VMb2NhbGVNZXNzYWdlXHJcbiAgICAgICAgICAgIG1lcmdlTG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvc2VyLm1lcmdlTG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBkXHJcbiAgICAgICAgICAgIGQoLi4uYXJncykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlZmxlY3QuYXBwbHkoY29tcG9zZXIuZCwgY29tcG9zZXIsIFsuLi5hcmdzXSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGdldERhdGVUaW1lRm9ybWF0XHJcbiAgICAgICAgICAgIGdldERhdGVUaW1lRm9ybWF0KGxvY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmdldERhdGVUaW1lRm9ybWF0KGxvY2FsZSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIHNldERhdGVUaW1lRm9ybWF0XHJcbiAgICAgICAgICAgIHNldERhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgICBjb21wb3Nlci5zZXREYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIG1lcmdlRGF0ZVRpbWVGb3JtYXRcclxuICAgICAgICAgICAgbWVyZ2VEYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9zZXIubWVyZ2VEYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIG5cclxuICAgICAgICAgICAgbiguLi5hcmdzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5hcHBseShjb21wb3Nlci5uLCBjb21wb3NlciwgWy4uLmFyZ3NdKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gZ2V0TnVtYmVyRm9ybWF0XHJcbiAgICAgICAgICAgIGdldE51bWJlckZvcm1hdChsb2NhbGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21wb3Nlci5nZXROdW1iZXJGb3JtYXQobG9jYWxlKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gc2V0TnVtYmVyRm9ybWF0XHJcbiAgICAgICAgICAgIHNldE51bWJlckZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xyXG4gICAgICAgICAgICAgICAgY29tcG9zZXIuc2V0TnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gbWVyZ2VOdW1iZXJGb3JtYXRcclxuICAgICAgICAgICAgbWVyZ2VOdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbXBvc2VyLm1lcmdlTnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gZ2V0Q2hvaWNlSW5kZXhcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgICAgICAgICBnZXRDaG9pY2VJbmRleChjaG9pY2UsIGNob2ljZXNMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfU1VQUE9SVEVEX0dFVF9DSE9JQ0VfSU5ERVgpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8gZm9yIGludGVybmFsXHJcbiAgICAgICAgICAgIF9fb25Db21wb25lbnRJbnN0YW5jZUNyZWF0ZWQodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IGNvbXBvbmVudEluc3RhbmNlQ3JlYXRlZExpc3RlbmVyIH0gPSBvcHRpb25zO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudEluc3RhbmNlQ3JlYXRlZExpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2VDcmVhdGVkTGlzdGVuZXIodGFyZ2V0LCB2dWVJMThuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgLy8gZm9yIHZ1ZS1kZXZ0b29scyB0aW1lbGluZSBldmVudFxyXG4gICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcclxuICAgICAgICAgICAgdnVlSTE4bi5fX2VuYWJsZUVtaXR0ZXIgPSAoZW1pdHRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgX19jb21wb3NlciA9IGNvbXBvc2VyO1xyXG4gICAgICAgICAgICAgICAgX19jb21wb3NlcltFbmFibGVFbWl0dGVyXSAmJiBfX2NvbXBvc2VyW0VuYWJsZUVtaXR0ZXJdKGVtaXR0ZXIpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2dWVJMThuLl9fZGlzYWJsZUVtaXR0ZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBfX2NvbXBvc2VyID0gY29tcG9zZXI7XHJcbiAgICAgICAgICAgICAgICBfX2NvbXBvc2VyW0Rpc2FibGVFbWl0dGVyXSAmJiBfX2NvbXBvc2VyW0Rpc2FibGVFbWl0dGVyXSgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdnVlSTE4bjtcclxuICAgIH1cclxufVxyXG4vKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cblxuY29uc3QgYmFzZUZvcm1hdFByb3BzID0ge1xyXG4gICAgdGFnOiB7XHJcbiAgICAgICAgdHlwZTogW1N0cmluZywgT2JqZWN0XVxyXG4gICAgfSxcclxuICAgIGxvY2FsZToge1xyXG4gICAgICAgIHR5cGU6IFN0cmluZ1xyXG4gICAgfSxcclxuICAgIHNjb3BlOiB7XHJcbiAgICAgICAgdHlwZTogU3RyaW5nLFxyXG4gICAgICAgIC8vIE5PVEU6IGF2b2lkIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvcnVzaHN0YWNrL2lzc3Vlcy8xMDUwXHJcbiAgICAgICAgdmFsaWRhdG9yOiAodmFsIC8qIENvbXBvbmV0STE4blNjb3BlICovKSA9PiB2YWwgPT09ICdwYXJlbnQnIHx8IHZhbCA9PT0gJ2dsb2JhbCcsXHJcbiAgICAgICAgZGVmYXVsdDogJ3BhcmVudCcgLyogQ29tcG9uZXRJMThuU2NvcGUgKi9cclxuICAgIH0sXHJcbiAgICBpMThuOiB7XHJcbiAgICAgICAgdHlwZTogT2JqZWN0XHJcbiAgICB9XHJcbn07XG5cbmZ1bmN0aW9uIGdldEludGVycG9sYXRlQXJnKFxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG57IHNsb3RzIH0sIC8vIFNldHVwQ29udGV4dCxcclxua2V5cykge1xyXG4gICAgaWYgKGtleXMubGVuZ3RoID09PSAxICYmIGtleXNbMF0gPT09ICdkZWZhdWx0Jykge1xyXG4gICAgICAgIC8vIGRlZmF1bHQgc2xvdCB3aXRoIGxpc3RcclxuICAgICAgICBjb25zdCByZXQgPSBzbG90cy5kZWZhdWx0ID8gc2xvdHMuZGVmYXVsdCgpIDogW107XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICByZXR1cm4gcmV0LnJlZHVjZSgoc2xvdCwgY3VycmVudCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gKHNsb3QgPSBbXHJcbiAgICAgICAgICAgICAgICAuLi5zbG90LFxyXG4gICAgICAgICAgICAgICAgLi4uKGlzQXJyYXkoY3VycmVudC5jaGlsZHJlbikgPyBjdXJyZW50LmNoaWxkcmVuIDogW2N1cnJlbnRdKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9LCBbXSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAvLyBuYW1lZCBzbG90c1xyXG4gICAgICAgIHJldHVybiBrZXlzLnJlZHVjZSgoYXJnLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2xvdCA9IHNsb3RzW2tleV07XHJcbiAgICAgICAgICAgIGlmIChzbG90KSB7XHJcbiAgICAgICAgICAgICAgICBhcmdba2V5XSA9IHNsb3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXJnO1xyXG4gICAgICAgIH0sIHt9KTtcclxuICAgIH1cclxufVxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG5mdW5jdGlvbiBnZXRGcmFnbWVudGFibGVUYWcodGFnKSB7XHJcbiAgICByZXR1cm4gRnJhZ21lbnQgO1xyXG59XG5cbi8qKlxyXG4gKiBUcmFuc2xhdGlvbiBDb21wb25lbnRcclxuICpcclxuICogQHJlbWFya3NcclxuICogU2VlIHRoZSBmb2xsb3dpbmcgaXRlbXMgZm9yIHByb3BlcnR5IGFib3V0IGRldGFpbHNcclxuICpcclxuICogQFZ1ZUkxOG5TZWUgW1RyYW5zbGF0aW9uUHJvcHNdKGNvbXBvbmVudCN0cmFuc2xhdGlvbnByb3BzKVxyXG4gKiBAVnVlSTE4blNlZSBbQmFzZUZvcm1hdFByb3BzXShjb21wb25lbnQjYmFzZWZvcm1hdHByb3BzKVxyXG4gKiBAVnVlSTE4blNlZSBbQ29tcG9uZW50IEludGVycG9sYXRpb25dKC4uL2d1aWRlL2FkdmFuY2VkL2NvbXBvbmVudClcclxuICpcclxuICogQGV4YW1wbGVcclxuICogYGBgaHRtbFxyXG4gKiA8ZGl2IGlkPVwiYXBwXCI+XHJcbiAqICAgPCEtLSAuLi4gLS0+XHJcbiAqICAgPGkxOG4gcGF0aD1cInRlcm1cIiB0YWc9XCJsYWJlbFwiIGZvcj1cInRvc1wiPlxyXG4gKiAgICAgPGEgOmhyZWY9XCJ1cmxcIiB0YXJnZXQ9XCJfYmxhbmtcIj57eyAkdCgndG9zJykgfX08L2E+XHJcbiAqICAgPC9pMThuPlxyXG4gKiAgIDwhLS0gLi4uIC0tPlxyXG4gKiA8L2Rpdj5cclxuICogYGBgXHJcbiAqIGBgYGpzXHJcbiAqIGltcG9ydCB7IGNyZWF0ZUFwcCB9IGZyb20gJ3Z1ZSdcclxuICogaW1wb3J0IHsgY3JlYXRlSTE4biB9IGZyb20gJ3Z1ZS1pMThuJ1xyXG4gKlxyXG4gKiBjb25zdCBtZXNzYWdlcyA9IHtcclxuICogICBlbjoge1xyXG4gKiAgICAgdG9zOiAnVGVybSBvZiBTZXJ2aWNlJyxcclxuICogICAgIHRlcm06ICdJIGFjY2VwdCB4eHggezB9LidcclxuICogICB9LFxyXG4gKiAgIGphOiB7XHJcbiAqICAgICB0b3M6ICfliKnnlKjopo/ntIQnLFxyXG4gKiAgICAgdGVybTogJ+engeOBryB4eHgg44GuezB944Gr5ZCM5oSP44GX44G+44GZ44CCJ1xyXG4gKiAgIH1cclxuICogfVxyXG4gKlxyXG4gKiBjb25zdCBpMThuID0gY3JlYXRlSTE4bih7XHJcbiAqICAgbG9jYWxlOiAnZW4nLFxyXG4gKiAgIG1lc3NhZ2VzXHJcbiAqIH0pXHJcbiAqXHJcbiAqIGNvbnN0IGFwcCA9IGNyZWF0ZUFwcCh7XHJcbiAqICAgZGF0YToge1xyXG4gKiAgICAgdXJsOiAnL3Rlcm0nXHJcbiAqICAgfVxyXG4gKiB9KS51c2UoaTE4bikubW91bnQoJyNhcHAnKVxyXG4gKiBgYGBcclxuICpcclxuICogQFZ1ZUkxOG5Db21wb25lbnRcclxuICovXHJcbmNvbnN0IFRyYW5zbGF0aW9uID0gIC8qIGRlZmluZUNvbXBvbmVudCAqLyB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG4gICAgbmFtZTogJ2kxOG4tdCcsXHJcbiAgICBwcm9wczogYXNzaWduKHtcclxuICAgICAgICBrZXlwYXRoOiB7XHJcbiAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsdXJhbDoge1xyXG4gICAgICAgICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICB2YWxpZGF0b3I6ICh2YWwpID0+IGlzTnVtYmVyKHZhbCkgfHwgIWlzTmFOKHZhbClcclxuICAgICAgICB9XHJcbiAgICB9LCBiYXNlRm9ybWF0UHJvcHMpLFxyXG4gICAgLyogZXNsaW50LWVuYWJsZSAqL1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIHNldHVwKHByb3BzLCBjb250ZXh0KSB7XHJcbiAgICAgICAgY29uc3QgeyBzbG90cywgYXR0cnMgfSA9IGNvbnRleHQ7XHJcbiAgICAgICAgLy8gTk9URTogYXZvaWQgaHR0cHM6Ly9naXRodWIuY29tL21pY3Jvc29mdC9ydXNoc3RhY2svaXNzdWVzLzEwNTBcclxuICAgICAgICBjb25zdCBpMThuID0gcHJvcHMuaTE4biB8fFxyXG4gICAgICAgICAgICB1c2VJMThuKHtcclxuICAgICAgICAgICAgICAgIHVzZVNjb3BlOiBwcm9wcy5zY29wZSxcclxuICAgICAgICAgICAgICAgIF9fdXNlQ29tcG9uZW50OiB0cnVlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzbG90cykuZmlsdGVyKGtleSA9PiBrZXkgIT09ICdfJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7fTtcclxuICAgICAgICAgICAgaWYgKHByb3BzLmxvY2FsZSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBwcm9wcy5sb2NhbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByb3BzLnBsdXJhbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnBsdXJhbCA9IGlzU3RyaW5nKHByb3BzLnBsdXJhbCkgPyArcHJvcHMucGx1cmFsIDogcHJvcHMucGx1cmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGFyZyA9IGdldEludGVycG9sYXRlQXJnKGNvbnRleHQsIGtleXMpO1xyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGkxOG5bVHJhbnNyYXRlVk5vZGVTeW1ib2xdKHByb3BzLmtleXBhdGgsIGFyZywgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFzc2lnbmVkQXR0cnMgPSBhc3NpZ24oe30sIGF0dHJzKTtcclxuICAgICAgICAgICAgY29uc3QgdGFnID0gaXNTdHJpbmcocHJvcHMudGFnKSB8fCBpc09iamVjdChwcm9wcy50YWcpXHJcbiAgICAgICAgICAgICAgICA/IHByb3BzLnRhZ1xyXG4gICAgICAgICAgICAgICAgOiBnZXRGcmFnbWVudGFibGVUYWcoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGgodGFnLCBhc3NpZ25lZEF0dHJzLCBjaGlsZHJlbik7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcblxuZnVuY3Rpb24gaXNWTm9kZSh0YXJnZXQpIHtcclxuICAgIHJldHVybiBpc0FycmF5KHRhcmdldCkgJiYgIWlzU3RyaW5nKHRhcmdldFswXSk7XHJcbn1cclxuZnVuY3Rpb24gcmVuZGVyRm9ybWF0dGVyKHByb3BzLCBjb250ZXh0LCBzbG90S2V5cywgcGFydEZvcm1hdHRlcikge1xyXG4gICAgY29uc3QgeyBzbG90cywgYXR0cnMgfSA9IGNvbnRleHQ7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IHBhcnQ6IHRydWUgfTtcclxuICAgICAgICBsZXQgb3ZlcnJpZGVzID0ge307XHJcbiAgICAgICAgaWYgKHByb3BzLmxvY2FsZSkge1xyXG4gICAgICAgICAgICBvcHRpb25zLmxvY2FsZSA9IHByb3BzLmxvY2FsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzU3RyaW5nKHByb3BzLmZvcm1hdCkpIHtcclxuICAgICAgICAgICAgb3B0aW9ucy5rZXkgPSBwcm9wcy5mb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlzT2JqZWN0KHByb3BzLmZvcm1hdCkpIHtcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgaWYgKGlzU3RyaW5nKHByb3BzLmZvcm1hdC5rZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5rZXkgPSBwcm9wcy5mb3JtYXQua2V5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEZpbHRlciBvdXQgbnVtYmVyIGZvcm1hdCBvcHRpb25zIG9ubHlcclxuICAgICAgICAgICAgb3ZlcnJpZGVzID0gT2JqZWN0LmtleXMocHJvcHMuZm9ybWF0KS5yZWR1Y2UoKG9wdGlvbnMsIHByb3ApID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzbG90S2V5cy5pbmNsdWRlcyhwcm9wKVxyXG4gICAgICAgICAgICAgICAgICAgID8gYXNzaWduKHt9LCBvcHRpb25zLCB7IFtwcm9wXTogcHJvcHMuZm9ybWF0W3Byb3BdIH0pIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICAgICAgICAgIDogb3B0aW9ucztcclxuICAgICAgICAgICAgfSwge30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBwYXJ0cyA9IHBhcnRGb3JtYXR0ZXIoLi4uW3Byb3BzLnZhbHVlLCBvcHRpb25zLCBvdmVycmlkZXNdKTtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSBbb3B0aW9ucy5rZXldO1xyXG4gICAgICAgIGlmIChpc0FycmF5KHBhcnRzKSkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IHBhcnRzLm1hcCgocGFydCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNsb3QgPSBzbG90c1twYXJ0LnR5cGVdO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHNsb3RcclxuICAgICAgICAgICAgICAgICAgICA/IHNsb3QoeyBbcGFydC50eXBlXTogcGFydC52YWx1ZSwgaW5kZXgsIHBhcnRzIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgOiBbcGFydC52YWx1ZV07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNWTm9kZShub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGVbMF0ua2V5ID0gYCR7cGFydC50eXBlfS0ke2luZGV4fWA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGlzU3RyaW5nKHBhcnRzKSkge1xyXG4gICAgICAgICAgICBjaGlsZHJlbiA9IFtwYXJ0c107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGFzc2lnbmVkQXR0cnMgPSBhc3NpZ24oe30sIGF0dHJzKTtcclxuICAgICAgICBjb25zdCB0YWcgPSBpc1N0cmluZyhwcm9wcy50YWcpIHx8IGlzT2JqZWN0KHByb3BzLnRhZylcclxuICAgICAgICAgICAgPyBwcm9wcy50YWdcclxuICAgICAgICAgICAgOiBnZXRGcmFnbWVudGFibGVUYWcoKTtcclxuICAgICAgICByZXR1cm4gaCh0YWcsIGFzc2lnbmVkQXR0cnMsIGNoaWxkcmVuKTtcclxuICAgIH07XHJcbn1cblxuLyoqXHJcbiAqIE51bWJlciBGb3JtYXQgQ29tcG9uZW50XHJcbiAqXHJcbiAqIEByZW1hcmtzXHJcbiAqIFNlZSB0aGUgZm9sbG93aW5nIGl0ZW1zIGZvciBwcm9wZXJ0eSBhYm91dCBkZXRhaWxzXHJcbiAqXHJcbiAqIEBWdWVJMThuU2VlIFtGb3JtYXR0YWJsZVByb3BzXShjb21wb25lbnQjZm9ybWF0dGFibGVwcm9wcylcclxuICogQFZ1ZUkxOG5TZWUgW0Jhc2VGb3JtYXRQcm9wc10oY29tcG9uZW50I2Jhc2Vmb3JtYXRwcm9wcylcclxuICogQFZ1ZUkxOG5TZWUgW0N1c3RvbSBGb3JtYXR0aW5nXSguLi9ndWlkZS9lc3NlbnRpYWxzL251bWJlciNjdXN0b20tZm9ybWF0dGluZylcclxuICpcclxuICogQFZ1ZUkxOG5EYW5nZXJcclxuICogTm90IHN1cHBvcnRlZCBJRSwgZHVlIHRvIG5vIHN1cHBvcnQgYEludGwuTnVtYmVyRm9ybWF0I2Zvcm1hdFRvUGFydHNgIGluIFtJRV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvSW50bC9OdW1iZXJGb3JtYXQvZm9ybWF0VG9QYXJ0cylcclxuICpcclxuICogSWYgeW91IHdhbnQgdG8gdXNlIGl0LCB5b3UgbmVlZCB0byB1c2UgW3BvbHlmaWxsXShodHRwczovL2dpdGh1Yi5jb20vZm9ybWF0anMvZm9ybWF0anMvdHJlZS9tYWluL3BhY2thZ2VzL2ludGwtbnVtYmVyZm9ybWF0KVxyXG4gKlxyXG4gKiBAVnVlSTE4bkNvbXBvbmVudFxyXG4gKi9cclxuY29uc3QgTnVtYmVyRm9ybWF0ID0gIC8qIGRlZmluZUNvbXBvbmVudCAqLyB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSAqL1xyXG4gICAgbmFtZTogJ2kxOG4tbicsXHJcbiAgICBwcm9wczogYXNzaWduKHtcclxuICAgICAgICB2YWx1ZToge1xyXG4gICAgICAgICAgICB0eXBlOiBOdW1iZXIsXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb3JtYXQ6IHtcclxuICAgICAgICAgICAgdHlwZTogW1N0cmluZywgT2JqZWN0XVxyXG4gICAgICAgIH1cclxuICAgIH0sIGJhc2VGb3JtYXRQcm9wcyksXHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgc2V0dXAocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBjb25zdCBpMThuID0gcHJvcHMuaTE4biB8fFxyXG4gICAgICAgICAgICB1c2VJMThuKHsgdXNlU2NvcGU6ICdwYXJlbnQnLCBfX3VzZUNvbXBvbmVudDogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm4gcmVuZGVyRm9ybWF0dGVyKHByb3BzLCBjb250ZXh0LCBOVU1CRVJfRk9STUFUX09QVElPTlNfS0VZUywgKC4uLmFyZ3MpID0+IFxyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgaTE4bltOdW1iZXJQYXJ0c1N5bWJvbF0oLi4uYXJncykpO1xyXG4gICAgfVxyXG59O1xuXG4vKipcclxuICogRGF0ZXRpbWUgRm9ybWF0IENvbXBvbmVudFxyXG4gKlxyXG4gKiBAcmVtYXJrc1xyXG4gKiBTZWUgdGhlIGZvbGxvd2luZyBpdGVtcyBmb3IgcHJvcGVydHkgYWJvdXQgZGV0YWlsc1xyXG4gKlxyXG4gKiBAVnVlSTE4blNlZSBbRm9ybWF0dGFibGVQcm9wc10oY29tcG9uZW50I2Zvcm1hdHRhYmxlcHJvcHMpXHJcbiAqIEBWdWVJMThuU2VlIFtCYXNlRm9ybWF0UHJvcHNdKGNvbXBvbmVudCNiYXNlZm9ybWF0cHJvcHMpXHJcbiAqIEBWdWVJMThuU2VlIFtDdXN0b20gRm9ybWF0dGluZ10oLi4vZ3VpZGUvZXNzZW50aWFscy9kYXRldGltZSNjdXN0b20tZm9ybWF0dGluZylcclxuICpcclxuICogQFZ1ZUkxOG5EYW5nZXJcclxuICogTm90IHN1cHBvcnRlZCBJRSwgZHVlIHRvIG5vIHN1cHBvcnQgYEludGwuRGF0ZVRpbWVGb3JtYXQjZm9ybWF0VG9QYXJ0c2AgaW4gW0lFXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9JbnRsL0RhdGVUaW1lRm9ybWF0L2Zvcm1hdFRvUGFydHMpXHJcbiAqXHJcbiAqIElmIHlvdSB3YW50IHRvIHVzZSBpdCwgeW91IG5lZWQgdG8gdXNlIFtwb2x5ZmlsbF0oaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1hdGpzL2Zvcm1hdGpzL3RyZWUvbWFpbi9wYWNrYWdlcy9pbnRsLWRhdGV0aW1lZm9ybWF0KVxyXG4gKlxyXG4gKiBAVnVlSTE4bkNvbXBvbmVudFxyXG4gKi9cclxuY29uc3QgRGF0ZXRpbWVGb3JtYXQgPSAgLypkZWZpbmVDb21wb25lbnQgKi8ge1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cclxuICAgIG5hbWU6ICdpMThuLWQnLFxyXG4gICAgcHJvcHM6IGFzc2lnbih7XHJcbiAgICAgICAgdmFsdWU6IHtcclxuICAgICAgICAgICAgdHlwZTogW051bWJlciwgRGF0ZV0sXHJcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmb3JtYXQ6IHtcclxuICAgICAgICAgICAgdHlwZTogW1N0cmluZywgT2JqZWN0XVxyXG4gICAgICAgIH1cclxuICAgIH0sIGJhc2VGb3JtYXRQcm9wcyksXHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlICovXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgc2V0dXAocHJvcHMsIGNvbnRleHQpIHtcclxuICAgICAgICBjb25zdCBpMThuID0gcHJvcHMuaTE4biB8fFxyXG4gICAgICAgICAgICB1c2VJMThuKHsgdXNlU2NvcGU6ICdwYXJlbnQnLCBfX3VzZUNvbXBvbmVudDogdHJ1ZSB9KTtcclxuICAgICAgICByZXR1cm4gcmVuZGVyRm9ybWF0dGVyKHByb3BzLCBjb250ZXh0LCBEQVRFVElNRV9GT1JNQVRfT1BUSU9OU19LRVlTLCAoLi4uYXJncykgPT4gXHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICBpMThuW0RhdGV0aW1lUGFydHNTeW1ib2xdKC4uLmFyZ3MpKTtcclxuICAgIH1cclxufTtcblxuZnVuY3Rpb24gZ2V0Q29tcG9zZXIkMihpMThuLCBpbnN0YW5jZSkge1xyXG4gICAgY29uc3QgaTE4bkludGVybmFsID0gaTE4bjtcclxuICAgIGlmIChpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gKGkxOG5JbnRlcm5hbC5fX2dldEluc3RhbmNlKGluc3RhbmNlKSB8fCBpMThuLmdsb2JhbCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBjb25zdCB2dWVJMThuID0gaTE4bkludGVybmFsLl9fZ2V0SW5zdGFuY2UoaW5zdGFuY2UpO1xyXG4gICAgICAgIHJldHVybiB2dWVJMThuICE9IG51bGxcclxuICAgICAgICAgICAgPyB2dWVJMThuLl9fY29tcG9zZXJcclxuICAgICAgICAgICAgOiBpMThuLmdsb2JhbC5fX2NvbXBvc2VyO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHZURGlyZWN0aXZlKGkxOG4pIHtcclxuICAgIGNvbnN0IF9wcm9jZXNzID0gKGJpbmRpbmcpID0+IHtcclxuICAgICAgICBjb25zdCB7IGluc3RhbmNlLCBtb2RpZmllcnMsIHZhbHVlIH0gPSBiaW5kaW5nO1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghaW5zdGFuY2UgfHwgIWluc3RhbmNlLiQpIHtcclxuICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBjb21wb3NlciA9IGdldENvbXBvc2VyJDIoaTE4biwgaW5zdGFuY2UuJCk7XHJcbiAgICAgICAgaWYgKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSAmJiBtb2RpZmllcnMucHJlc2VydmUpIHtcclxuICAgICAgICAgICAgd2FybihnZXRXYXJuTWVzc2FnZShJMThuV2FybkNvZGVzLk5PVF9TVVBQT1JURURfUFJFU0VSVkUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcGFyc2VkVmFsdWUgPSBwYXJzZVZhbHVlKHZhbHVlKTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBSZWZsZWN0LmFwcGx5KGNvbXBvc2VyLnQsIGNvbXBvc2VyLCBbLi4ubWFrZVBhcmFtcyhwYXJzZWRWYWx1ZSldKSxcclxuICAgICAgICAgICAgY29tcG9zZXJcclxuICAgICAgICBdO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IHJlZ2lzdGVyID0gKGVsLCBiaW5kaW5nKSA9PiB7XHJcbiAgICAgICAgY29uc3QgW3RleHRDb250ZW50LCBjb21wb3Nlcl0gPSBfcHJvY2VzcyhiaW5kaW5nKTtcclxuICAgICAgICBpZiAoaW5Ccm93c2VyICYmIGkxOG4uZ2xvYmFsID09PSBjb21wb3Nlcikge1xyXG4gICAgICAgICAgICAvLyBnbG9iYWwgc2NvcGUgb25seVxyXG4gICAgICAgICAgICBlbC5fX2kxOG5XYXRjaGVyID0gd2F0Y2goY29tcG9zZXIubG9jYWxlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBiaW5kaW5nLmluc3RhbmNlICYmIGJpbmRpbmcuaW5zdGFuY2UuJGZvcmNlVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbC5fX2NvbXBvc2VyID0gY29tcG9zZXI7XHJcbiAgICAgICAgZWwudGV4dENvbnRlbnQgPSB0ZXh0Q29udGVudDtcclxuICAgIH07XHJcbiAgICBjb25zdCB1bnJlZ2lzdGVyID0gKGVsKSA9PiB7XHJcbiAgICAgICAgaWYgKGluQnJvd3NlciAmJiBlbC5fX2kxOG5XYXRjaGVyKSB7XHJcbiAgICAgICAgICAgIGVsLl9faTE4bldhdGNoZXIoKTtcclxuICAgICAgICAgICAgZWwuX19pMThuV2F0Y2hlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgZGVsZXRlIGVsLl9faTE4bldhdGNoZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlbC5fX2NvbXBvc2VyKSB7XHJcbiAgICAgICAgICAgIGVsLl9fY29tcG9zZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBlbC5fX2NvbXBvc2VyO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBjb25zdCB1cGRhdGUgPSAoZWwsIHsgdmFsdWUgfSkgPT4ge1xyXG4gICAgICAgIGlmIChlbC5fX2NvbXBvc2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvc2VyID0gZWwuX19jb21wb3NlcjtcclxuICAgICAgICAgICAgY29uc3QgcGFyc2VkVmFsdWUgPSBwYXJzZVZhbHVlKHZhbHVlKTtcclxuICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSBSZWZsZWN0LmFwcGx5KGNvbXBvc2VyLnQsIGNvbXBvc2VyLCBbXHJcbiAgICAgICAgICAgICAgICAuLi5tYWtlUGFyYW1zKHBhcnNlZFZhbHVlKVxyXG4gICAgICAgICAgICBdKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3QgZ2V0U1NSUHJvcHMgPSAoYmluZGluZykgPT4ge1xyXG4gICAgICAgIGNvbnN0IFt0ZXh0Q29udGVudF0gPSBfcHJvY2VzcyhiaW5kaW5nKTtcclxuICAgICAgICByZXR1cm4geyB0ZXh0Q29udGVudCB9O1xyXG4gICAgfTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgY3JlYXRlZDogcmVnaXN0ZXIsXHJcbiAgICAgICAgdW5tb3VudGVkOiB1bnJlZ2lzdGVyLFxyXG4gICAgICAgIGJlZm9yZVVwZGF0ZTogdXBkYXRlLFxyXG4gICAgICAgIGdldFNTUlByb3BzXHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIHBhcnNlVmFsdWUodmFsdWUpIHtcclxuICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcclxuICAgICAgICByZXR1cm4geyBwYXRoOiB2YWx1ZSB9O1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdCh2YWx1ZSkpIHtcclxuICAgICAgICBpZiAoISgncGF0aCcgaW4gdmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5SRVFVSVJFRF9WQUxVRSwgJ3BhdGgnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLklOVkFMSURfVkFMVUUpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIG1ha2VQYXJhbXModmFsdWUpIHtcclxuICAgIGNvbnN0IHsgcGF0aCwgbG9jYWxlLCBhcmdzLCBjaG9pY2UsIHBsdXJhbCB9ID0gdmFsdWU7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge307XHJcbiAgICBjb25zdCBuYW1lZCA9IGFyZ3MgfHwge307XHJcbiAgICBpZiAoaXNTdHJpbmcobG9jYWxlKSkge1xyXG4gICAgICAgIG9wdGlvbnMubG9jYWxlID0gbG9jYWxlO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzTnVtYmVyKGNob2ljZSkpIHtcclxuICAgICAgICBvcHRpb25zLnBsdXJhbCA9IGNob2ljZTtcclxuICAgIH1cclxuICAgIGlmIChpc051bWJlcihwbHVyYWwpKSB7XHJcbiAgICAgICAgb3B0aW9ucy5wbHVyYWwgPSBwbHVyYWw7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW3BhdGgsIG5hbWVkLCBvcHRpb25zXTtcclxufVxuXG5mdW5jdGlvbiBhcHBseShhcHAsIGkxOG4sIC4uLm9wdGlvbnMpIHtcclxuICAgIGNvbnN0IHBsdWdpbk9wdGlvbnMgPSBpc1BsYWluT2JqZWN0KG9wdGlvbnNbMF0pXHJcbiAgICAgICAgPyBvcHRpb25zWzBdXHJcbiAgICAgICAgOiB7fTtcclxuICAgIGNvbnN0IHVzZUkxOG5Db21wb25lbnROYW1lID0gISFwbHVnaW5PcHRpb25zLnVzZUkxOG5Db21wb25lbnROYW1lO1xyXG4gICAgY29uc3QgZ2xvYmFsSW5zdGFsbCA9IGlzQm9vbGVhbihwbHVnaW5PcHRpb25zLmdsb2JhbEluc3RhbGwpXHJcbiAgICAgICAgPyBwbHVnaW5PcHRpb25zLmdsb2JhbEluc3RhbGxcclxuICAgICAgICA6IHRydWU7XHJcbiAgICBpZiAoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpICYmIGdsb2JhbEluc3RhbGwgJiYgdXNlSTE4bkNvbXBvbmVudE5hbWUpIHtcclxuICAgICAgICB3YXJuKGdldFdhcm5NZXNzYWdlKEkxOG5XYXJuQ29kZXMuQ09NUE9ORU5UX05BTUVfTEVHQUNZX0NPTVBBVElCTEUsIHtcclxuICAgICAgICAgICAgbmFtZTogVHJhbnNsYXRpb24ubmFtZVxyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuICAgIGlmIChnbG9iYWxJbnN0YWxsKSB7XHJcbiAgICAgICAgLy8gaW5zdGFsbCBjb21wb25lbnRzXHJcbiAgICAgICAgYXBwLmNvbXBvbmVudCghdXNlSTE4bkNvbXBvbmVudE5hbWUgPyBUcmFuc2xhdGlvbi5uYW1lIDogJ2kxOG4nLCBUcmFuc2xhdGlvbik7XHJcbiAgICAgICAgYXBwLmNvbXBvbmVudChOdW1iZXJGb3JtYXQubmFtZSwgTnVtYmVyRm9ybWF0KTtcclxuICAgICAgICBhcHAuY29tcG9uZW50KERhdGV0aW1lRm9ybWF0Lm5hbWUsIERhdGV0aW1lRm9ybWF0KTtcclxuICAgIH1cclxuICAgIC8vIGluc3RhbGwgZGlyZWN0aXZlXHJcbiAgICB7XHJcbiAgICAgICAgYXBwLmRpcmVjdGl2ZSgndCcsIHZURGlyZWN0aXZlKGkxOG4pKTtcclxuICAgIH1cclxufVxuXG5jb25zdCBWVUVfSTE4Tl9DT01QT05FTlRfVFlQRVMgPSAndnVlLWkxOG46IGNvbXBvc2VyIHByb3BlcnRpZXMnO1xyXG5sZXQgZGV2dG9vbHNBcGk7XHJcbmFzeW5jIGZ1bmN0aW9uIGVuYWJsZURldlRvb2xzKGFwcCwgaTE4bikge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBzZXR1cERldnRvb2xzUGx1Z2luKHtcclxuICAgICAgICAgICAgICAgIGlkOiBcInZ1ZS1kZXZ0b29scy1wbHVnaW4tdnVlLWkxOG5cIiAvKiBQTFVHSU4gKi8sXHJcbiAgICAgICAgICAgICAgICBsYWJlbDogVnVlRGV2VG9vbHNMYWJlbHNbXCJ2dWUtZGV2dG9vbHMtcGx1Z2luLXZ1ZS1pMThuXCIgLyogUExVR0lOICovXSxcclxuICAgICAgICAgICAgICAgIHBhY2thZ2VOYW1lOiAndnVlLWkxOG4nLFxyXG4gICAgICAgICAgICAgICAgaG9tZXBhZ2U6ICdodHRwczovL3Z1ZS1pMThuLmludGxpZnkuZGV2JyxcclxuICAgICAgICAgICAgICAgIGxvZ286ICdodHRwczovL3Z1ZS1pMThuLmludGxpZnkuZGV2L3Z1ZS1pMThuLWRldnRvb2xzLWxvZ28ucG5nJyxcclxuICAgICAgICAgICAgICAgIGNvbXBvbmVudFN0YXRlVHlwZXM6IFtWVUVfSTE4Tl9DT01QT05FTlRfVFlQRVNdLFxyXG4gICAgICAgICAgICAgICAgYXBwOiBhcHAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgIH0sIGFwaSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkZXZ0b29sc0FwaSA9IGFwaTtcclxuICAgICAgICAgICAgICAgIGFwaS5vbi52aXNpdENvbXBvbmVudFRyZWUoKHsgY29tcG9uZW50SW5zdGFuY2UsIHRyZWVOb2RlIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb21wb25lbnRUcmVlVGFncyhjb21wb25lbnRJbnN0YW5jZSwgdHJlZU5vZGUsIGkxOG4pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBhcGkub24uaW5zcGVjdENvbXBvbmVudCgoeyBjb21wb25lbnRJbnN0YW5jZSwgaW5zdGFuY2VEYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29tcG9uZW50SW5zdGFuY2Uudm5vZGUuZWwgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50SW5zdGFuY2Uudm5vZGUuZWwuX19WVUVfSTE4Tl9fICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3RhbmNlRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaTE4bi5tb2RlID09PSAnbGVnYWN5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlIGdsb2JhbCBzY29wZSBvbiBsZWdhY3kgbW9kZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBvbmVudEluc3RhbmNlLnZub2RlLmVsLl9fVlVFX0kxOE5fXyAhPT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpMThuLmdsb2JhbC5fX2NvbXBvc2VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zcGVjdENvbXBvc2VyKGluc3RhbmNlRGF0YSwgY29tcG9uZW50SW5zdGFuY2Uudm5vZGUuZWwuX19WVUVfSTE4Tl9fKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluc3BlY3RDb21wb3NlcihpbnN0YW5jZURhdGEsIGNvbXBvbmVudEluc3RhbmNlLnZub2RlLmVsLl9fVlVFX0kxOE5fXyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGFwaS5hZGRJbnNwZWN0b3Ioe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcInZ1ZS1pMThuLXJlc291cmNlLWluc3BlY3RvclwiIC8qIENVU1RPTV9JTlNQRUNUT1IgKi8sXHJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IFZ1ZURldlRvb2xzTGFiZWxzW1widnVlLWkxOG4tcmVzb3VyY2UtaW5zcGVjdG9yXCIgLyogQ1VTVE9NX0lOU1BFQ1RPUiAqL10sXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ2xhbmd1YWdlJyxcclxuICAgICAgICAgICAgICAgICAgICB0cmVlRmlsdGVyUGxhY2Vob2xkZXI6IFZ1ZURldlRvb2xzUGxhY2Vob2xkZXJzW1widnVlLWkxOG4tcmVzb3VyY2UtaW5zcGVjdG9yXCIgLyogQ1VTVE9NX0lOU1BFQ1RPUiAqL11cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYXBpLm9uLmdldEluc3BlY3RvclRyZWUocGF5bG9hZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuYXBwID09PSBhcHAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5pbnNwZWN0b3JJZCA9PT0gXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBDVVNUT01fSU5TUEVDVE9SICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyU2NvcGUocGF5bG9hZCwgaTE4bik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb290cyA9IG5ldyBNYXAoKTtcclxuICAgICAgICAgICAgICAgIGFwaS5vbi5nZXRJbnNwZWN0b3JTdGF0ZShhc3luYyAocGF5bG9hZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkLmFwcCA9PT0gYXBwICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheWxvYWQuaW5zcGVjdG9ySWQgPT09IFwidnVlLWkxOG4tcmVzb3VyY2UtaW5zcGVjdG9yXCIgLyogQ1VTVE9NX0lOU1BFQ1RPUiAqLykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcGkudW5oaWdobGlnaHRFbGVtZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc3BlY3RTY29wZShwYXlsb2FkLCBpMThuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQubm9kZUlkID09PSAnZ2xvYmFsJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyb290cy5oYXMocGF5bG9hZC5hcHApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3Jvb3RdID0gYXdhaXQgYXBpLmdldENvbXBvbmVudEluc3RhbmNlcyhwYXlsb2FkLmFwcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9vdHMuc2V0KHBheWxvYWQuYXBwLCByb290KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwaS5oaWdobGlnaHRFbGVtZW50KHJvb3RzLmdldChwYXlsb2FkLmFwcCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBnZXRDb21wb25lbnRJbnN0YW5jZShwYXlsb2FkLm5vZGVJZCwgaTE4bik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZSAmJiBhcGkuaGlnaGxpZ2h0RWxlbWVudChpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGFwaS5vbi5lZGl0SW5zcGVjdG9yU3RhdGUocGF5bG9hZCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBheWxvYWQuYXBwID09PSBhcHAgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZC5pbnNwZWN0b3JJZCA9PT0gXCJ2dWUtaTE4bi1yZXNvdXJjZS1pbnNwZWN0b3JcIiAvKiBDVVNUT01fSU5TUEVDVE9SICovKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRTY29wZShwYXlsb2FkLCBpMThuKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGFwaS5hZGRUaW1lbGluZUxheWVyKHtcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJ2dWUtaTE4bi10aW1lbGluZVwiIC8qIFRJTUVMSU5FICovLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhYmVsOiBWdWVEZXZUb29sc0xhYmVsc1tcInZ1ZS1pMThuLXRpbWVsaW5lXCIgLyogVElNRUxJTkUgKi9dLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiBWdWVEZXZUb29sc1RpbWVsaW5lQ29sb3JzW1widnVlLWkxOG4tdGltZWxpbmVcIiAvKiBUSU1FTElORSAqL11cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgICAgIHJlamVjdChmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuZnVuY3Rpb24gZ2V0STE4blNjb3BlTGFibGUoaW5zdGFuY2UpIHtcclxuICAgIHJldHVybiAoaW5zdGFuY2UudHlwZS5uYW1lIHx8XHJcbiAgICAgICAgaW5zdGFuY2UudHlwZS5kaXNwbGF5TmFtZSB8fFxyXG4gICAgICAgIGluc3RhbmNlLnR5cGUuX19maWxlIHx8XHJcbiAgICAgICAgJ0Fub255bW91cycpO1xyXG59XHJcbmZ1bmN0aW9uIHVwZGF0ZUNvbXBvbmVudFRyZWVUYWdzKGluc3RhbmNlLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxudHJlZU5vZGUsIGkxOG4pIHtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgY29uc3QgZ2xvYmFsID0gaTE4bi5tb2RlID09PSAnY29tcG9zaXRpb24nXHJcbiAgICAgICAgPyBpMThuLmdsb2JhbFxyXG4gICAgICAgIDogaTE4bi5nbG9iYWwuX19jb21wb3NlcjtcclxuICAgIGlmIChpbnN0YW5jZSAmJiBpbnN0YW5jZS52bm9kZS5lbCAmJiBpbnN0YW5jZS52bm9kZS5lbC5fX1ZVRV9JMThOX18pIHtcclxuICAgICAgICAvLyBhZGQgY3VzdG9tIHRhZ3MgbG9jYWwgc2NvcGUgb25seVxyXG4gICAgICAgIGlmIChpbnN0YW5jZS52bm9kZS5lbC5fX1ZVRV9JMThOX18gIT09IGdsb2JhbCkge1xyXG4gICAgICAgICAgICBjb25zdCB0YWcgPSB7XHJcbiAgICAgICAgICAgICAgICBsYWJlbDogYGkxOG4gKCR7Z2V0STE4blNjb3BlTGFibGUoaW5zdGFuY2UpfSBTY29wZSlgLFxyXG4gICAgICAgICAgICAgICAgdGV4dENvbG9yOiAweDAwMDAwMCxcclxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogMHhmZmNkMTlcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdHJlZU5vZGUudGFncy5wdXNoKHRhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGluc3BlY3RDb21wb3NlcihpbnN0YW5jZURhdGEsIGNvbXBvc2VyKSB7XHJcbiAgICBjb25zdCB0eXBlID0gVlVFX0kxOE5fQ09NUE9ORU5UX1RZUEVTO1xyXG4gICAgaW5zdGFuY2VEYXRhLnN0YXRlLnB1c2goe1xyXG4gICAgICAgIHR5cGUsXHJcbiAgICAgICAga2V5OiAnbG9jYWxlJyxcclxuICAgICAgICBlZGl0YWJsZTogdHJ1ZSxcclxuICAgICAgICB2YWx1ZTogY29tcG9zZXIubG9jYWxlLnZhbHVlXHJcbiAgICB9KTtcclxuICAgIGluc3RhbmNlRGF0YS5zdGF0ZS5wdXNoKHtcclxuICAgICAgICB0eXBlLFxyXG4gICAgICAgIGtleTogJ2F2YWlsYWJsZUxvY2FsZXMnLFxyXG4gICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICB2YWx1ZTogY29tcG9zZXIuYXZhaWxhYmxlTG9jYWxlc1xyXG4gICAgfSk7XHJcbiAgICBpbnN0YW5jZURhdGEuc3RhdGUucHVzaCh7XHJcbiAgICAgICAgdHlwZSxcclxuICAgICAgICBrZXk6ICdmYWxsYmFja0xvY2FsZScsXHJcbiAgICAgICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgdmFsdWU6IGNvbXBvc2VyLmZhbGxiYWNrTG9jYWxlLnZhbHVlXHJcbiAgICB9KTtcclxuICAgIGluc3RhbmNlRGF0YS5zdGF0ZS5wdXNoKHtcclxuICAgICAgICB0eXBlLFxyXG4gICAgICAgIGtleTogJ2luaGVyaXRMb2NhbGUnLFxyXG4gICAgICAgIGVkaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgIHZhbHVlOiBjb21wb3Nlci5pbmhlcml0TG9jYWxlXHJcbiAgICB9KTtcclxuICAgIGluc3RhbmNlRGF0YS5zdGF0ZS5wdXNoKHtcclxuICAgICAgICB0eXBlLFxyXG4gICAgICAgIGtleTogJ21lc3NhZ2VzJyxcclxuICAgICAgICBlZGl0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgdmFsdWU6IGdldExvY2FsZU1lc3NhZ2VWYWx1ZShjb21wb3Nlci5tZXNzYWdlcy52YWx1ZSlcclxuICAgIH0pO1xyXG4gICAge1xyXG4gICAgICAgIGluc3RhbmNlRGF0YS5zdGF0ZS5wdXNoKHtcclxuICAgICAgICAgICAgdHlwZSxcclxuICAgICAgICAgICAga2V5OiAnZGF0ZXRpbWVGb3JtYXRzJyxcclxuICAgICAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIuZGF0ZXRpbWVGb3JtYXRzLnZhbHVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaW5zdGFuY2VEYXRhLnN0YXRlLnB1c2goe1xyXG4gICAgICAgICAgICB0eXBlLFxyXG4gICAgICAgICAgICBrZXk6ICdudW1iZXJGb3JtYXRzJyxcclxuICAgICAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIubnVtYmVyRm9ybWF0cy52YWx1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbmZ1bmN0aW9uIGdldExvY2FsZU1lc3NhZ2VWYWx1ZShtZXNzYWdlcykge1xyXG4gICAgY29uc3QgdmFsdWUgPSB7fTtcclxuICAgIE9iamVjdC5rZXlzKG1lc3NhZ2VzKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICBjb25zdCB2ID0gbWVzc2FnZXNba2V5XTtcclxuICAgICAgICBpZiAoaXNGdW5jdGlvbih2KSAmJiAnc291cmNlJyBpbiB2KSB7XHJcbiAgICAgICAgICAgIHZhbHVlW2tleV0gPSBnZXRNZXNzYWdlRnVuY3Rpb25EZXRhaWxzKHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpc09iamVjdCh2KSkge1xyXG4gICAgICAgICAgICB2YWx1ZVtrZXldID0gZ2V0TG9jYWxlTWVzc2FnZVZhbHVlKHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdmFsdWVba2V5XSA9IHY7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuY29uc3QgRVNDID0ge1xyXG4gICAgJzwnOiAnJmx0OycsXHJcbiAgICAnPic6ICcmZ3Q7JyxcclxuICAgICdcIic6ICcmcXVvdDsnLFxyXG4gICAgJyYnOiAnJmFtcDsnXHJcbn07XHJcbmZ1bmN0aW9uIGVzY2FwZShzKSB7XHJcbiAgICByZXR1cm4gcy5yZXBsYWNlKC9bPD5cIiZdL2csIGVzY2FwZUNoYXIpO1xyXG59XHJcbmZ1bmN0aW9uIGVzY2FwZUNoYXIoYSkge1xyXG4gICAgcmV0dXJuIEVTQ1thXSB8fCBhO1xyXG59XHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbmZ1bmN0aW9uIGdldE1lc3NhZ2VGdW5jdGlvbkRldGFpbHMoZnVuYykge1xyXG4gICAgY29uc3QgYXJnU3RyaW5nID0gZnVuYy5zb3VyY2UgPyBgKFwiJHtlc2NhcGUoZnVuYy5zb3VyY2UpfVwiKWAgOiBgKD8pYDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgX2N1c3RvbToge1xyXG4gICAgICAgICAgICB0eXBlOiAnZnVuY3Rpb24nLFxyXG4gICAgICAgICAgICBkaXNwbGF5OiBgPHNwYW4+xpI8L3NwYW4+ICR7YXJnU3RyaW5nfWBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIHJlZ2lzdGVyU2NvcGUocGF5bG9hZCwgaTE4bikge1xyXG4gICAgcGF5bG9hZC5yb290Tm9kZXMucHVzaCh7XHJcbiAgICAgICAgaWQ6ICdnbG9iYWwnLFxyXG4gICAgICAgIGxhYmVsOiAnR2xvYmFsIFNjb3BlJ1xyXG4gICAgfSk7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IGdsb2JhbCA9IGkxOG4ubW9kZSA9PT0gJ2NvbXBvc2l0aW9uJ1xyXG4gICAgICAgID8gaTE4bi5nbG9iYWxcclxuICAgICAgICA6IGkxOG4uZ2xvYmFsLl9fY29tcG9zZXI7XHJcbiAgICBmb3IgKGNvbnN0IFtrZXlJbnN0YW5jZSwgaW5zdGFuY2VdIG9mIGkxOG4uX19pbnN0YW5jZXMpIHtcclxuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgICAgICBjb25zdCBjb21wb3NlciA9IGkxOG4ubW9kZSA9PT0gJ2NvbXBvc2l0aW9uJ1xyXG4gICAgICAgICAgICA/IGluc3RhbmNlXHJcbiAgICAgICAgICAgIDogaW5zdGFuY2UuX19jb21wb3NlcjtcclxuICAgICAgICBpZiAoZ2xvYmFsID09PSBjb21wb3Nlcikge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGF5bG9hZC5yb290Tm9kZXMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBjb21wb3Nlci5pZC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBsYWJlbDogYCR7Z2V0STE4blNjb3BlTGFibGUoa2V5SW5zdGFuY2UpfSBTY29wZWBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXRDb21wb25lbnRJbnN0YW5jZShub2RlSWQsIGkxOG4pIHtcclxuICAgIGxldCBpbnN0YW5jZSA9IG51bGw7XHJcbiAgICBpZiAobm9kZUlkICE9PSAnZ2xvYmFsJykge1xyXG4gICAgICAgIGZvciAoY29uc3QgW2NvbXBvbmVudCwgY29tcG9zZXJdIG9mIGkxOG4uX19pbnN0YW5jZXMuZW50cmllcygpKSB7XHJcbiAgICAgICAgICAgIGlmIChjb21wb3Nlci5pZC50b1N0cmluZygpID09PSBub2RlSWQpIHtcclxuICAgICAgICAgICAgICAgIGluc3RhbmNlID0gY29tcG9uZW50O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5zdGFuY2U7XHJcbn1cclxuZnVuY3Rpb24gZ2V0Q29tcG9zZXIkMShub2RlSWQsIGkxOG4pIHtcclxuICAgIGlmIChub2RlSWQgPT09ICdnbG9iYWwnKSB7XHJcbiAgICAgICAgcmV0dXJuIGkxOG4ubW9kZSA9PT0gJ2NvbXBvc2l0aW9uJ1xyXG4gICAgICAgICAgICA/IGkxOG4uZ2xvYmFsXHJcbiAgICAgICAgICAgIDogaTE4bi5nbG9iYWwuX19jb21wb3NlcjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gQXJyYXkuZnJvbShpMThuLl9faW5zdGFuY2VzLnZhbHVlcygpKS5maW5kKGl0ZW0gPT4gaXRlbS5pZC50b1N0cmluZygpID09PSBub2RlSWQpO1xyXG4gICAgICAgIGlmIChpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gaTE4bi5tb2RlID09PSAnY29tcG9zaXRpb24nXHJcbiAgICAgICAgICAgICAgICA/IGluc3RhbmNlXHJcbiAgICAgICAgICAgICAgICA6IGluc3RhbmNlLl9fY29tcG9zZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaW5zcGVjdFNjb3BlKHBheWxvYWQsIGkxOG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuKSB7XHJcbiAgICBjb25zdCBjb21wb3NlciA9IGdldENvbXBvc2VyJDEocGF5bG9hZC5ub2RlSWQsIGkxOG4pO1xyXG4gICAgaWYgKGNvbXBvc2VyKSB7XHJcbiAgICAgICAgLy8gVE9ETzpcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIHBheWxvYWQuc3RhdGUgPSBtYWtlU2NvcGVJbnNwZWN0U3RhdGUoY29tcG9zZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuZnVuY3Rpb24gbWFrZVNjb3BlSW5zcGVjdFN0YXRlKGNvbXBvc2VyKSB7XHJcbiAgICBjb25zdCBzdGF0ZSA9IHt9O1xyXG4gICAgY29uc3QgbG9jYWxlVHlwZSA9ICdMb2NhbGUgcmVsYXRlZCBpbmZvJztcclxuICAgIGNvbnN0IGxvY2FsZVN0YXRlcyA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6IGxvY2FsZVR5cGUsXHJcbiAgICAgICAgICAgIGtleTogJ2xvY2FsZScsXHJcbiAgICAgICAgICAgIGVkaXRhYmxlOiB0cnVlLFxyXG4gICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIubG9jYWxlLnZhbHVlXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHR5cGU6IGxvY2FsZVR5cGUsXHJcbiAgICAgICAgICAgIGtleTogJ2ZhbGxiYWNrTG9jYWxlJyxcclxuICAgICAgICAgICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5mYWxsYmFja0xvY2FsZS52YWx1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiBsb2NhbGVUeXBlLFxyXG4gICAgICAgICAgICBrZXk6ICdhdmFpbGFibGVMb2NhbGVzJyxcclxuICAgICAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIuYXZhaWxhYmxlTG9jYWxlc1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0eXBlOiBsb2NhbGVUeXBlLFxyXG4gICAgICAgICAgICBrZXk6ICdpbmhlcml0TG9jYWxlJyxcclxuICAgICAgICAgICAgZWRpdGFibGU6IHRydWUsXHJcbiAgICAgICAgICAgIHZhbHVlOiBjb21wb3Nlci5pbmhlcml0TG9jYWxlXHJcbiAgICAgICAgfVxyXG4gICAgXTtcclxuICAgIHN0YXRlW2xvY2FsZVR5cGVdID0gbG9jYWxlU3RhdGVzO1xyXG4gICAgY29uc3QgbG9jYWxlTWVzc2FnZXNUeXBlID0gJ0xvY2FsZSBtZXNzYWdlcyBpbmZvJztcclxuICAgIGNvbnN0IGxvY2FsZU1lc3NhZ2VzU3RhdGVzID0gW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdHlwZTogbG9jYWxlTWVzc2FnZXNUeXBlLFxyXG4gICAgICAgICAgICBrZXk6ICdtZXNzYWdlcycsXHJcbiAgICAgICAgICAgIGVkaXRhYmxlOiBmYWxzZSxcclxuICAgICAgICAgICAgdmFsdWU6IGdldExvY2FsZU1lc3NhZ2VWYWx1ZShjb21wb3Nlci5tZXNzYWdlcy52YWx1ZSlcclxuICAgICAgICB9XHJcbiAgICBdO1xyXG4gICAgc3RhdGVbbG9jYWxlTWVzc2FnZXNUeXBlXSA9IGxvY2FsZU1lc3NhZ2VzU3RhdGVzO1xyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGRhdGV0aW1lRm9ybWF0c1R5cGUgPSAnRGF0ZXRpbWUgZm9ybWF0cyBpbmZvJztcclxuICAgICAgICBjb25zdCBkYXRldGltZUZvcm1hdHNTdGF0ZXMgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGRhdGV0aW1lRm9ybWF0c1R5cGUsXHJcbiAgICAgICAgICAgICAgICBrZXk6ICdkYXRldGltZUZvcm1hdHMnLFxyXG4gICAgICAgICAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IGNvbXBvc2VyLmRhdGV0aW1lRm9ybWF0cy52YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICBzdGF0ZVtkYXRldGltZUZvcm1hdHNUeXBlXSA9IGRhdGV0aW1lRm9ybWF0c1N0YXRlcztcclxuICAgICAgICBjb25zdCBudW1iZXJGb3JtYXRzVHlwZSA9ICdEYXRldGltZSBmb3JtYXRzIGluZm8nO1xyXG4gICAgICAgIGNvbnN0IG51bWJlckZvcm1hdHNTdGF0ZXMgPSBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IG51bWJlckZvcm1hdHNUeXBlLFxyXG4gICAgICAgICAgICAgICAga2V5OiAnbnVtYmVyRm9ybWF0cycsXHJcbiAgICAgICAgICAgICAgICBlZGl0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogY29tcG9zZXIubnVtYmVyRm9ybWF0cy52YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXTtcclxuICAgICAgICBzdGF0ZVtudW1iZXJGb3JtYXRzVHlwZV0gPSBudW1iZXJGb3JtYXRzU3RhdGVzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG59XHJcbmZ1bmN0aW9uIGFkZFRpbWVsaW5lRXZlbnQoZXZlbnQsIHBheWxvYWQpIHtcclxuICAgIGlmIChkZXZ0b29sc0FwaSkge1xyXG4gICAgICAgIGxldCBncm91cElkO1xyXG4gICAgICAgIGlmIChwYXlsb2FkICYmICdncm91cElkJyBpbiBwYXlsb2FkKSB7XHJcbiAgICAgICAgICAgIGdyb3VwSWQgPSBwYXlsb2FkLmdyb3VwSWQ7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBwYXlsb2FkLmdyb3VwSWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRldnRvb2xzQXBpLmFkZFRpbWVsaW5lRXZlbnQoe1xyXG4gICAgICAgICAgICBsYXllcklkOiBcInZ1ZS1pMThuLXRpbWVsaW5lXCIgLyogVElNRUxJTkUgKi8sXHJcbiAgICAgICAgICAgIGV2ZW50OiB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogZXZlbnQsXHJcbiAgICAgICAgICAgICAgICBncm91cElkLFxyXG4gICAgICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgICAgIG1ldGE6IHt9LFxyXG4gICAgICAgICAgICAgICAgZGF0YTogcGF5bG9hZCB8fCB7fSxcclxuICAgICAgICAgICAgICAgIGxvZ1R5cGU6IGV2ZW50ID09PSBcImNvbXBpbGUtZXJyb3JcIiAvKiBDT01QSUxFX0VSUk9SICovXHJcbiAgICAgICAgICAgICAgICAgICAgPyAnZXJyb3InXHJcbiAgICAgICAgICAgICAgICAgICAgOiBldmVudCA9PT0gXCJmYWxsYmFja1wiIC8qIEZBTEJBQ0sgKi8gfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQgPT09IFwibWlzc2luZ1wiIC8qIE1JU1NJTkcgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnd2FybmluZydcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnZGVmYXVsdCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGVkaXRTY29wZShwYXlsb2FkLCBpMThuKSB7XHJcbiAgICBjb25zdCBjb21wb3NlciA9IGdldENvbXBvc2VyJDEocGF5bG9hZC5ub2RlSWQsIGkxOG4pO1xyXG4gICAgaWYgKGNvbXBvc2VyKSB7XHJcbiAgICAgICAgY29uc3QgW2ZpZWxkXSA9IHBheWxvYWQucGF0aDtcclxuICAgICAgICBpZiAoZmllbGQgPT09ICdsb2NhbGUnICYmIGlzU3RyaW5nKHBheWxvYWQuc3RhdGUudmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGNvbXBvc2VyLmxvY2FsZS52YWx1ZSA9IHBheWxvYWQuc3RhdGUudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZpZWxkID09PSAnZmFsbGJhY2tMb2NhbGUnICYmXHJcbiAgICAgICAgICAgIChpc1N0cmluZyhwYXlsb2FkLnN0YXRlLnZhbHVlKSB8fFxyXG4gICAgICAgICAgICAgICAgaXNBcnJheShwYXlsb2FkLnN0YXRlLnZhbHVlKSB8fFxyXG4gICAgICAgICAgICAgICAgaXNPYmplY3QocGF5bG9hZC5zdGF0ZS52YWx1ZSkpKSB7XHJcbiAgICAgICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrTG9jYWxlLnZhbHVlID0gcGF5bG9hZC5zdGF0ZS52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZmllbGQgPT09ICdpbmhlcml0TG9jYWxlJyAmJiBpc0Jvb2xlYW4ocGF5bG9hZC5zdGF0ZS52YWx1ZSkpIHtcclxuICAgICAgICAgICAgY29tcG9zZXIuaW5oZXJpdExvY2FsZSA9IHBheWxvYWQuc3RhdGUudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cbi8qKlxyXG4gKiBTdXBwb3J0cyBjb21wYXRpYmlsaXR5IGZvciBsZWdhY3kgdnVlLWkxOG4gQVBJc1xyXG4gKiBUaGlzIG1peGluIGlzIHVzZWQgd2hlbiB3ZSB1c2UgdnVlLWkxOG5AdjkueCBvciBsYXRlclxyXG4gKi9cclxuZnVuY3Rpb24gZGVmaW5lTWl4aW4odnVlaTE4biwgY29tcG9zZXIsIGkxOG4pIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgYmVmb3JlQ3JlYXRlKCkge1xyXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cclxuICAgICAgICAgICAgaWYgKCFpbnN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLiRvcHRpb25zO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5pMThuKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zSTE4biA9IG9wdGlvbnMuaTE4bjtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLl9faTE4bikge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNJMThuLl9faTE4biA9IG9wdGlvbnMuX19pMThuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgb3B0aW9uc0kxOG4uX19yb290ID0gY29tcG9zZXI7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcyA9PT0gdGhpcy4kcm9vdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGkxOG4gPSBtZXJnZVRvUm9vdCh2dWVpMThuLCBvcHRpb25zSTE4bik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zSTE4bi5fX2luamVjdFdpdGhPcHRpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJGkxOG4gPSBjcmVhdGVWdWVJMThuKG9wdGlvbnNJMThuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvcHRpb25zLl9faTE4bikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMgPT09IHRoaXMuJHJvb3QpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRpMThuID0gbWVyZ2VUb1Jvb3QodnVlaTE4biwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRpMThuID0gY3JlYXRlVnVlSTE4bih7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9faTE4bjogb3B0aW9ucy5fX2kxOG4sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF9faW5qZWN0V2l0aE9wdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgX19yb290OiBjb21wb3NlclxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0IGdsb2JhbFxyXG4gICAgICAgICAgICAgICAgdGhpcy4kaTE4biA9IHZ1ZWkxOG47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuX19pMThuR2xvYmFsKSB7XHJcbiAgICAgICAgICAgICAgICBhZGp1c3RJMThuUmVzb3VyY2VzKGNvbXBvc2VyLCBvcHRpb25zLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2dWVpMThuLl9fb25Db21wb25lbnRJbnN0YW5jZUNyZWF0ZWQodGhpcy4kaTE4bik7XHJcbiAgICAgICAgICAgIGkxOG4uX19zZXRJbnN0YW5jZShpbnN0YW5jZSwgdGhpcy4kaTE4bik7XHJcbiAgICAgICAgICAgIC8vIGRlZmluZXMgdnVlLWkxOG4gbGVnYWN5IEFQSXNcclxuICAgICAgICAgICAgdGhpcy4kdCA9ICguLi5hcmdzKSA9PiB0aGlzLiRpMThuLnQoLi4uYXJncyk7XHJcbiAgICAgICAgICAgIHRoaXMuJHJ0ID0gKC4uLmFyZ3MpID0+IHRoaXMuJGkxOG4ucnQoLi4uYXJncyk7XHJcbiAgICAgICAgICAgIHRoaXMuJHRjID0gKC4uLmFyZ3MpID0+IHRoaXMuJGkxOG4udGMoLi4uYXJncyk7XHJcbiAgICAgICAgICAgIHRoaXMuJHRlID0gKGtleSwgbG9jYWxlKSA9PiB0aGlzLiRpMThuLnRlKGtleSwgbG9jYWxlKTtcclxuICAgICAgICAgICAgdGhpcy4kZCA9ICguLi5hcmdzKSA9PiB0aGlzLiRpMThuLmQoLi4uYXJncyk7XHJcbiAgICAgICAgICAgIHRoaXMuJG4gPSAoLi4uYXJncykgPT4gdGhpcy4kaTE4bi5uKC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICB0aGlzLiR0bSA9IChrZXkpID0+IHRoaXMuJGkxOG4udG0oa2V5KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdW50ZWQoKSB7XHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgICBpZiAoKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pICYmXHJcbiAgICAgICAgICAgICAgICAhZmFsc2UgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuJGVsICYmXHJcbiAgICAgICAgICAgICAgICB0aGlzLiRpMThuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRlbC5fX1ZVRV9JMThOX18gPSB0aGlzLiRpMThuLl9fY29tcG9zZXI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gKHRoaXMuX192X2VtaXR0ZXIgPVxyXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZUVtaXR0ZXIoKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBfdnVlSTE4biA9IHRoaXMuJGkxOG47XHJcbiAgICAgICAgICAgICAgICBfdnVlSTE4bi5fX2VuYWJsZUVtaXR0ZXIgJiYgX3Z1ZUkxOG4uX19lbmFibGVFbWl0dGVyKGVtaXR0ZXIpO1xyXG4gICAgICAgICAgICAgICAgZW1pdHRlci5vbignKicsIGFkZFRpbWVsaW5lRXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB1bm1vdW50ZWQoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gZ2V0Q3VycmVudEluc3RhbmNlKCk7XHJcbiAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgICAgICBpZiAoIWluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FUlJPUik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXHJcbiAgICAgICAgICAgIGlmICgoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykgJiZcclxuICAgICAgICAgICAgICAgICFmYWxzZSAmJlxyXG4gICAgICAgICAgICAgICAgdGhpcy4kZWwgJiZcclxuICAgICAgICAgICAgICAgIHRoaXMuJGVsLl9fVlVFX0kxOE5fXykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX192X2VtaXR0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdl9lbWl0dGVyLm9mZignKicsIGFkZFRpbWVsaW5lRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9fdl9lbWl0dGVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJGkxOG4pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBfdnVlSTE4biA9IHRoaXMuJGkxOG47XHJcbiAgICAgICAgICAgICAgICAgICAgX3Z1ZUkxOG4uX19kaXNhYmxlRW1pdHRlciAmJiBfdnVlSTE4bi5fX2Rpc2FibGVFbWl0dGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuJGVsLl9fVlVFX0kxOE5fXztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kdDtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJHJ0O1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kdGM7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiR0ZTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJGQ7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiRuO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kdG07XHJcbiAgICAgICAgICAgIGkxOG4uX19kZWxldGVJbnN0YW5jZShpbnN0YW5jZSk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiRpMThuO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gbWVyZ2VUb1Jvb3Qocm9vdCwgb3B0aW9ucykge1xyXG4gICAgcm9vdC5sb2NhbGUgPSBvcHRpb25zLmxvY2FsZSB8fCByb290LmxvY2FsZTtcclxuICAgIHJvb3QuZmFsbGJhY2tMb2NhbGUgPSBvcHRpb25zLmZhbGxiYWNrTG9jYWxlIHx8IHJvb3QuZmFsbGJhY2tMb2NhbGU7XHJcbiAgICByb290Lm1pc3NpbmcgPSBvcHRpb25zLm1pc3NpbmcgfHwgcm9vdC5taXNzaW5nO1xyXG4gICAgcm9vdC5zaWxlbnRUcmFuc2xhdGlvbldhcm4gPVxyXG4gICAgICAgIG9wdGlvbnMuc2lsZW50VHJhbnNsYXRpb25XYXJuIHx8IHJvb3Quc2lsZW50RmFsbGJhY2tXYXJuO1xyXG4gICAgcm9vdC5zaWxlbnRGYWxsYmFja1dhcm4gPVxyXG4gICAgICAgIG9wdGlvbnMuc2lsZW50RmFsbGJhY2tXYXJuIHx8IHJvb3Quc2lsZW50RmFsbGJhY2tXYXJuO1xyXG4gICAgcm9vdC5mb3JtYXRGYWxsYmFja01lc3NhZ2VzID1cclxuICAgICAgICBvcHRpb25zLmZvcm1hdEZhbGxiYWNrTWVzc2FnZXMgfHwgcm9vdC5mb3JtYXRGYWxsYmFja01lc3NhZ2VzO1xyXG4gICAgcm9vdC5wb3N0VHJhbnNsYXRpb24gPSBvcHRpb25zLnBvc3RUcmFuc2xhdGlvbiB8fCByb290LnBvc3RUcmFuc2xhdGlvbjtcclxuICAgIHJvb3Qud2Fybkh0bWxJbk1lc3NhZ2UgPSBvcHRpb25zLndhcm5IdG1sSW5NZXNzYWdlIHx8IHJvb3Qud2Fybkh0bWxJbk1lc3NhZ2U7XHJcbiAgICByb290LmVzY2FwZVBhcmFtZXRlckh0bWwgPVxyXG4gICAgICAgIG9wdGlvbnMuZXNjYXBlUGFyYW1ldGVySHRtbCB8fCByb290LmVzY2FwZVBhcmFtZXRlckh0bWw7XHJcbiAgICByb290LnN5bmMgPSBvcHRpb25zLnN5bmMgfHwgcm9vdC5zeW5jO1xyXG4gICAgcm9vdC5fX2NvbXBvc2VyW1NldFBsdXJhbFJ1bGVzU3ltYm9sXShvcHRpb25zLnBsdXJhbGl6YXRpb25SdWxlcyB8fCByb290LnBsdXJhbGl6YXRpb25SdWxlcyk7XHJcbiAgICBjb25zdCBtZXNzYWdlcyA9IGdldExvY2FsZU1lc3NhZ2VzKHJvb3QubG9jYWxlLCB7XHJcbiAgICAgICAgbWVzc2FnZXM6IG9wdGlvbnMubWVzc2FnZXMsXHJcbiAgICAgICAgX19pMThuOiBvcHRpb25zLl9faTE4blxyXG4gICAgfSk7XHJcbiAgICBPYmplY3Qua2V5cyhtZXNzYWdlcykuZm9yRWFjaChsb2NhbGUgPT4gcm9vdC5tZXJnZUxvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlc1tsb2NhbGVdKSk7XHJcbiAgICBpZiAob3B0aW9ucy5kYXRldGltZUZvcm1hdHMpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25zLmRhdGV0aW1lRm9ybWF0cykuZm9yRWFjaChsb2NhbGUgPT4gcm9vdC5tZXJnZURhdGVUaW1lRm9ybWF0KGxvY2FsZSwgb3B0aW9ucy5kYXRldGltZUZvcm1hdHNbbG9jYWxlXSkpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdGlvbnMubnVtYmVyRm9ybWF0cykge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbnMubnVtYmVyRm9ybWF0cykuZm9yRWFjaChsb2NhbGUgPT4gcm9vdC5tZXJnZU51bWJlckZvcm1hdChsb2NhbGUsIG9wdGlvbnMubnVtYmVyRm9ybWF0c1tsb2NhbGVdKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcm9vdDtcclxufVxuXG4vKipcclxuICogSW5qZWN0aW9uIGtleSBmb3Ige0BsaW5rIHVzZUkxOG59XHJcbiAqXHJcbiAqIEByZW1hcmtzXHJcbiAqIFRoZSBnbG9iYWwgaW5qZWN0aW9uIGtleSBmb3IgSTE4biBpbnN0YW5jZXMgd2l0aCBgdXNlSTE4bmAuIHRoaXMgaW5qZWN0aW9uIGtleSBpcyB1c2VkIGluIFdlYiBDb21wb25lbnRzLlxyXG4gKiBTcGVjaWZ5IHRoZSBpMThuIGluc3RhbmNlIGNyZWF0ZWQgYnkge0BsaW5rIGNyZWF0ZUkxOG59IHRvZ2V0aGVyIHdpdGggYHByb3ZpZGVgIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAVnVlSTE4bkdlbmVyYWxcclxuICovXHJcbmNvbnN0IEkxOG5JbmplY3Rpb25LZXkgPSBcclxuLyogI19fUFVSRV9fKi8gbWFrZVN5bWJvbCgnZ2xvYmFsLXZ1ZS1pMThuJyk7XHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbmZ1bmN0aW9uIGNyZWF0ZUkxOG4ob3B0aW9ucyA9IHt9LCBWdWVJMThuTGVnYWN5KSB7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IF9fbGVnYWN5TW9kZSA9IF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICYmIGlzQm9vbGVhbihvcHRpb25zLmxlZ2FjeSlcclxuICAgICAgICAgICAgPyBvcHRpb25zLmxlZ2FjeVxyXG4gICAgICAgICAgICA6IF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fO1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBjb25zdCBfX2dsb2JhbEluamVjdGlvbiA9IGlzQm9vbGVhbihvcHRpb25zLmdsb2JhbEluamVjdGlvbilcclxuICAgICAgICA/IG9wdGlvbnMuZ2xvYmFsSW5qZWN0aW9uXHJcbiAgICAgICAgOiB0cnVlO1xyXG4gICAgLy8gcHJldHRpZXItaWdub3JlXHJcbiAgICBjb25zdCBfX2FsbG93Q29tcG9zaXRpb24gPSBfX1ZVRV9JMThOX0xFR0FDWV9BUElfXyAmJiBfX2xlZ2FjeU1vZGVcclxuICAgICAgICAgICAgPyAhIW9wdGlvbnMuYWxsb3dDb21wb3NpdGlvblxyXG4gICAgICAgICAgICA6IHRydWU7XHJcbiAgICBjb25zdCBfX2luc3RhbmNlcyA9IG5ldyBNYXAoKTtcclxuICAgIGNvbnN0IFtnbG9iYWxTY29wZSwgX19nbG9iYWxdID0gY3JlYXRlR2xvYmFsKG9wdGlvbnMsIF9fbGVnYWN5TW9kZSk7XHJcbiAgICBjb25zdCBzeW1ib2wgPSBtYWtlU3ltYm9sKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSA/ICd2dWUtaTE4bicgOiAnJyk7XHJcbiAgICBmdW5jdGlvbiBfX2dldEluc3RhbmNlKGNvbXBvbmVudCkge1xyXG4gICAgICAgIHJldHVybiBfX2luc3RhbmNlcy5nZXQoY29tcG9uZW50KSB8fCBudWxsO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gX19zZXRJbnN0YW5jZShjb21wb25lbnQsIGluc3RhbmNlKSB7XHJcbiAgICAgICAgX19pbnN0YW5jZXMuc2V0KGNvbXBvbmVudCwgaW5zdGFuY2UpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gX19kZWxldGVJbnN0YW5jZShjb21wb25lbnQpIHtcclxuICAgICAgICBfX2luc3RhbmNlcy5kZWxldGUoY29tcG9uZW50KTtcclxuICAgIH1cclxuICAgIHtcclxuICAgICAgICBjb25zdCBpMThuID0ge1xyXG4gICAgICAgICAgICAvLyBtb2RlXHJcbiAgICAgICAgICAgIGdldCBtb2RlKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fVlVFX0kxOE5fTEVHQUNZX0FQSV9fICYmIF9fbGVnYWN5TW9kZVxyXG4gICAgICAgICAgICAgICAgICAgID8gJ2xlZ2FjeSdcclxuICAgICAgICAgICAgICAgICAgICA6ICdjb21wb3NpdGlvbic7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGFsbG93Q29tcG9zaXRpb25cclxuICAgICAgICAgICAgZ2V0IGFsbG93Q29tcG9zaXRpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX19hbGxvd0NvbXBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBpbnN0YWxsIHBsdWdpblxyXG4gICAgICAgICAgICBhc3luYyBpbnN0YWxsKGFwcCwgLi4ub3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19WVUVfUFJPRF9ERVZUT09MU19fKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICFmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5fX1ZVRV9JMThOX18gPSBpMThuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gc2V0dXAgZ2xvYmFsIHByb3ZpZGVyXHJcbiAgICAgICAgICAgICAgICBhcHAuX19WVUVfSTE4Tl9TWU1CT0xfXyA9IHN5bWJvbDtcclxuICAgICAgICAgICAgICAgIGFwcC5wcm92aWRlKGFwcC5fX1ZVRV9JMThOX1NZTUJPTF9fLCBpMThuKTtcclxuICAgICAgICAgICAgICAgIC8vIGdsb2JhbCBtZXRob2QgYW5kIHByb3BlcnRpZXMgaW5qZWN0aW9uIGZvciBDb21wb3NpdGlvbiBBUElcclxuICAgICAgICAgICAgICAgIGlmICghX19sZWdhY3lNb2RlICYmIF9fZ2xvYmFsSW5qZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5qZWN0R2xvYmFsRmllbGRzKGFwcCwgaTE4bi5nbG9iYWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gaW5zdGFsbCBidWlsdC1pbiBjb21wb25lbnRzIGFuZCBkaXJlY3RpdmVcclxuICAgICAgICAgICAgICAgIGlmIChfX1ZVRV9JMThOX0ZVTExfSU5TVEFMTF9fKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwbHkoYXBwLCBpMThuLCAuLi5vcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHNldHVwIG1peGluIGZvciBMZWdhY3kgQVBJXHJcbiAgICAgICAgICAgICAgICBpZiAoX19WVUVfSTE4Tl9MRUdBQ1lfQVBJX18gJiYgX19sZWdhY3lNb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXBwLm1peGluKGRlZmluZU1peGluKF9fZ2xvYmFsLCBfX2dsb2JhbC5fX2NvbXBvc2VyLCBpMThuKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyByZWxlYXNlIGdsb2JhbCBzY29wZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgdW5tb3VudEFwcCA9IGFwcC51bm1vdW50O1xyXG4gICAgICAgICAgICAgICAgYXBwLnVubW91bnQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaTE4bi5kaXNwb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5tb3VudEFwcCgpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIC8vIHNldHVwIHZ1ZS1kZXZ0b29scyBwbHVnaW5cclxuICAgICAgICAgICAgICAgIGlmICgoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykgJiYgIWZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmV0ID0gYXdhaXQgZW5hYmxlRGV2VG9vbHMoYXBwLCBpMThuKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuQ0FOTk9UX1NFVFVQX1ZVRV9ERVZUT09MU19QTFVHSU4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbWl0dGVyID0gY3JlYXRlRW1pdHRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChfX2xlZ2FjeU1vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgX3Z1ZUkxOG4gPSBfX2dsb2JhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3Z1ZUkxOG4uX19lbmFibGVFbWl0dGVyICYmIF92dWVJMThuLl9fZW5hYmxlRW1pdHRlcihlbWl0dGVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IF9jb21wb3NlciA9IF9fZ2xvYmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfY29tcG9zZXJbRW5hYmxlRW1pdHRlcl0gJiYgX2NvbXBvc2VyW0VuYWJsZUVtaXR0ZXJdKGVtaXR0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbWl0dGVyLm9uKCcqJywgYWRkVGltZWxpbmVFdmVudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8vIGdsb2JhbCBhY2Nlc3NvclxyXG4gICAgICAgICAgICBnZXQgZ2xvYmFsKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fZ2xvYmFsO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkaXNwb3NlKCkge1xyXG4gICAgICAgICAgICAgICAgZ2xvYmFsU2NvcGUuc3RvcCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAvLyBAaW50ZXJuYWxcclxuICAgICAgICAgICAgX19pbnN0YW5jZXMsXHJcbiAgICAgICAgICAgIC8vIEBpbnRlcm5hbFxyXG4gICAgICAgICAgICBfX2dldEluc3RhbmNlLFxyXG4gICAgICAgICAgICAvLyBAaW50ZXJuYWxcclxuICAgICAgICAgICAgX19zZXRJbnN0YW5jZSxcclxuICAgICAgICAgICAgLy8gQGludGVybmFsXHJcbiAgICAgICAgICAgIF9fZGVsZXRlSW5zdGFuY2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBpMThuO1xyXG4gICAgfVxyXG59XHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbmZ1bmN0aW9uIHVzZUkxOG4ob3B0aW9ucyA9IHt9KSB7XHJcbiAgICBjb25zdCBpbnN0YW5jZSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpO1xyXG4gICAgaWYgKGluc3RhbmNlID09IG51bGwpIHtcclxuICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuTVVTVF9CRV9DQUxMX1NFVFVQX1RPUCk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWluc3RhbmNlLmlzQ0UgJiZcclxuICAgICAgICBpbnN0YW5jZS5hcHBDb250ZXh0LmFwcCAhPSBudWxsICYmXHJcbiAgICAgICAgIWluc3RhbmNlLmFwcENvbnRleHQuYXBwLl9fVlVFX0kxOE5fU1lNQk9MX18pIHtcclxuICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuTk9UX0lOU0xBTExFRCk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBpMThuID0gZ2V0STE4bkluc3RhbmNlKGluc3RhbmNlKTtcclxuICAgIGNvbnN0IGdsb2JhbCA9IGdldEdsb2JhbENvbXBvc2VyKGkxOG4pO1xyXG4gICAgY29uc3QgY29tcG9uZW50T3B0aW9ucyA9IGdldENvbXBvbmVudE9wdGlvbnMoaW5zdGFuY2UpO1xyXG4gICAgY29uc3Qgc2NvcGUgPSBnZXRTY29wZShvcHRpb25zLCBjb21wb25lbnRPcHRpb25zKTtcclxuICAgIGlmIChfX1ZVRV9JMThOX0xFR0FDWV9BUElfXykge1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgaWYgKGkxOG4ubW9kZSA9PT0gJ2xlZ2FjeScgJiYgIW9wdGlvbnMuX191c2VDb21wb25lbnQpIHtcclxuICAgICAgICAgICAgaWYgKCFpMThuLmFsbG93Q29tcG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5OT1RfQVZBSUxBQkxFX0lOX0xFR0FDWV9NT0RFKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdXNlSTE4bkZvckxlZ2FjeShpbnN0YW5jZSwgc2NvcGUsIGdsb2JhbCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHNjb3BlID09PSAnZ2xvYmFsJykge1xyXG4gICAgICAgIGFkanVzdEkxOG5SZXNvdXJjZXMoZ2xvYmFsLCBvcHRpb25zLCBjb21wb25lbnRPcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gZ2xvYmFsO1xyXG4gICAgfVxyXG4gICAgaWYgKHNjb3BlID09PSAncGFyZW50Jykge1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgbGV0IGNvbXBvc2VyID0gZ2V0Q29tcG9zZXIoaTE4biwgaW5zdGFuY2UsIG9wdGlvbnMuX191c2VDb21wb25lbnQpO1xyXG4gICAgICAgIGlmIChjb21wb3NlciA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIHtcclxuICAgICAgICAgICAgICAgIHdhcm4oZ2V0V2Fybk1lc3NhZ2UoSTE4bldhcm5Db2Rlcy5OT1RfRk9VTkRfUEFSRU5UX1NDT1BFKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29tcG9zZXIgPSBnbG9iYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb21wb3NlcjtcclxuICAgIH1cclxuICAgIGNvbnN0IGkxOG5JbnRlcm5hbCA9IGkxOG47XHJcbiAgICBsZXQgY29tcG9zZXIgPSBpMThuSW50ZXJuYWwuX19nZXRJbnN0YW5jZShpbnN0YW5jZSk7XHJcbiAgICBpZiAoY29tcG9zZXIgPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IGNvbXBvc2VyT3B0aW9ucyA9IGFzc2lnbih7fSwgb3B0aW9ucyk7XHJcbiAgICAgICAgaWYgKCdfX2kxOG4nIGluIGNvbXBvbmVudE9wdGlvbnMpIHtcclxuICAgICAgICAgICAgY29tcG9zZXJPcHRpb25zLl9faTE4biA9IGNvbXBvbmVudE9wdGlvbnMuX19pMThuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ2xvYmFsKSB7XHJcbiAgICAgICAgICAgIGNvbXBvc2VyT3B0aW9ucy5fX3Jvb3QgPSBnbG9iYWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbXBvc2VyID0gY3JlYXRlQ29tcG9zZXIoY29tcG9zZXJPcHRpb25zKTtcclxuICAgICAgICBzZXR1cExpZmVDeWNsZShpMThuSW50ZXJuYWwsIGluc3RhbmNlLCBjb21wb3Nlcik7XHJcbiAgICAgICAgaTE4bkludGVybmFsLl9fc2V0SW5zdGFuY2UoaW5zdGFuY2UsIGNvbXBvc2VyKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb21wb3NlcjtcclxufVxyXG4vKipcclxuICogQ2FzdCB0byBWdWVJMThuIGxlZ2FjeSBjb21wYXRpYmxlIHR5cGVcclxuICpcclxuICogQHJlbWFya3NcclxuICogVGhpcyBBUEkgaXMgcHJvdmlkZWQgb25seSB3aXRoIFt2dWUtaTE4bi1icmlkZ2VdKGh0dHBzOi8vdnVlLWkxOG4uaW50bGlmeS5kZXYvZ3VpZGUvbWlncmF0aW9uL3dheXMuaHRtbCN3aGF0LWlzLXZ1ZS1pMThuLWJyaWRnZSkuXHJcbiAqXHJcbiAqIFRoZSBwdXJwb3NlIG9mIHRoaXMgZnVuY3Rpb24gaXMgdG8gY29udmVydCBhbiB7QGxpbmsgSTE4bn0gaW5zdGFuY2UgY3JlYXRlZCB3aXRoIHtAbGluayBjcmVhdGVJMThuIHwgY3JlYXRlSTE4bihsZWdhY3k6IHRydWUpfSBpbnRvIGEgYHZ1ZS1pMThuQHY4LnhgIGNvbXBhdGlibGUgaW5zdGFuY2Ugb2YgYG5ldyBWdWVJMThuYCBpbiBhIFR5cGVTY3JpcHQgZW52aXJvbm1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSBpMThuIC0gQW4gaW5zdGFuY2Ugb2Yge0BsaW5rIEkxOG59XHJcbiAqIEByZXR1cm5zIEEgaTE4biBpbnN0YW5jZSB3aGljaCBpcyBjYXN0ZWQgdG8ge0BsaW5rIFZ1ZUkxOG59IHR5cGVcclxuICpcclxuICogQFZ1ZUkxOG5UaXBcclxuICogOm5ldzogcHJvdmlkZWQgYnkgKip2dWUtaTE4bi1icmlkZ2Ugb25seSoqXHJcbiAqXHJcbiAqIEBWdWVJMThuR2VuZXJhbFxyXG4gKi9cclxuY29uc3QgY2FzdFRvVnVlSTE4biA9ICAoaTE4blxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4pID0+IHtcclxuICAgIGlmICghKF9fVlVFX0kxOE5fQlJJREdFX18gaW4gaTE4bikpIHtcclxuICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuTk9UX0NPTVBBVElCTEVfTEVHQUNZX1ZVRV9JMThOKTtcclxuICAgIH1cclxuICAgIHJldHVybiBpMThuO1xyXG59O1xyXG5mdW5jdGlvbiBjcmVhdGVHbG9iYWwob3B0aW9ucywgbGVnYWN5TW9kZSwgVnVlSTE4bkxlZ2FjeSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuKSB7XHJcbiAgICBjb25zdCBzY29wZSA9IGVmZmVjdFNjb3BlKCk7XHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgb2JqID0gX19WVUVfSTE4Tl9MRUdBQ1lfQVBJX18gJiYgbGVnYWN5TW9kZVxyXG4gICAgICAgICAgICA/IHNjb3BlLnJ1bigoKSA9PiBjcmVhdGVWdWVJMThuKG9wdGlvbnMpKVxyXG4gICAgICAgICAgICA6IHNjb3BlLnJ1bigoKSA9PiBjcmVhdGVDb21wb3NlcihvcHRpb25zKSk7XHJcbiAgICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRocm93IGNyZWF0ZUkxOG5FcnJvcihJMThuRXJyb3JDb2Rlcy5VTkVYUEVDVEVEX0VSUk9SKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtzY29wZSwgb2JqXTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXRJMThuSW5zdGFuY2UoaW5zdGFuY2UpIHtcclxuICAgIHtcclxuICAgICAgICBjb25zdCBpMThuID0gaW5qZWN0KCFpbnN0YW5jZS5pc0NFXHJcbiAgICAgICAgICAgID8gaW5zdGFuY2UuYXBwQ29udGV4dC5hcHAuX19WVUVfSTE4Tl9TWU1CT0xfX1xyXG4gICAgICAgICAgICA6IEkxOG5JbmplY3Rpb25LZXkpO1xyXG4gICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xyXG4gICAgICAgIGlmICghaTE4bikge1xyXG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoIWluc3RhbmNlLmlzQ0VcclxuICAgICAgICAgICAgICAgID8gSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FUlJPUlxyXG4gICAgICAgICAgICAgICAgOiBJMThuRXJyb3JDb2Rlcy5OT1RfSU5TTEFMTEVEX1dJVEhfUFJPVklERSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpMThuO1xyXG4gICAgfVxyXG59XHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbmZ1bmN0aW9uIGdldFNjb3BlKG9wdGlvbnMsIGNvbXBvbmVudE9wdGlvbnMpIHtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgcmV0dXJuIGlzRW1wdHlPYmplY3Qob3B0aW9ucylcclxuICAgICAgICA/ICgnX19pMThuJyBpbiBjb21wb25lbnRPcHRpb25zKVxyXG4gICAgICAgICAgICA/ICdsb2NhbCdcclxuICAgICAgICAgICAgOiAnZ2xvYmFsJ1xyXG4gICAgICAgIDogIW9wdGlvbnMudXNlU2NvcGVcclxuICAgICAgICAgICAgPyAnbG9jYWwnXHJcbiAgICAgICAgICAgIDogb3B0aW9ucy51c2VTY29wZTtcclxufVxyXG5mdW5jdGlvbiBnZXRHbG9iYWxDb21wb3NlcihpMThuKSB7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIHJldHVybiBpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbidcclxuICAgICAgICAgICAgPyBpMThuLmdsb2JhbFxyXG4gICAgICAgICAgICA6IGkxOG4uZ2xvYmFsLl9fY29tcG9zZXJcclxuICAgICAgICA7XHJcbn1cclxuZnVuY3Rpb24gZ2V0Q29tcG9zZXIoaTE4biwgdGFyZ2V0LCB1c2VDb21wb25lbnQgPSBmYWxzZSkge1xyXG4gICAgbGV0IGNvbXBvc2VyID0gbnVsbDtcclxuICAgIGNvbnN0IHJvb3QgPSB0YXJnZXQucm9vdDtcclxuICAgIGxldCBjdXJyZW50ID0gdGFyZ2V0LnBhcmVudDtcclxuICAgIHdoaWxlIChjdXJyZW50ICE9IG51bGwpIHtcclxuICAgICAgICBjb25zdCBpMThuSW50ZXJuYWwgPSBpMThuO1xyXG4gICAgICAgIGlmIChpMThuLm1vZGUgPT09ICdjb21wb3NpdGlvbicpIHtcclxuICAgICAgICAgICAgY29tcG9zZXIgPSBpMThuSW50ZXJuYWwuX19nZXRJbnN0YW5jZShjdXJyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChfX1ZVRV9JMThOX0xFR0FDWV9BUElfXykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdnVlSTE4biA9IGkxOG5JbnRlcm5hbC5fX2dldEluc3RhbmNlKGN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZ1ZUkxOG4gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvc2VyID0gdnVlSTE4blxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuX19jb21wb3NlcjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlQ29tcG9uZW50ICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBvc2VyICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFjb21wb3NlcltJbmVqY3RXaXRoT3B0aW9uXSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcG9zZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY29tcG9zZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJvb3QgPT09IGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcclxuICAgIH1cclxuICAgIHJldHVybiBjb21wb3NlcjtcclxufVxyXG5mdW5jdGlvbiBzZXR1cExpZmVDeWNsZShpMThuLCB0YXJnZXQsIGNvbXBvc2VyKSB7XHJcbiAgICBsZXQgZW1pdHRlciA9IG51bGw7XHJcbiAgICB7XHJcbiAgICAgICAgb25Nb3VudGVkKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gaW5qZWN0IGNvbXBvc2VyIGluc3RhbmNlIHRvIERPTSBmb3IgaW50bGlmeS1kZXZ0b29sc1xyXG4gICAgICAgICAgICBpZiAoKChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB8fCBfX1ZVRV9QUk9EX0RFVlRPT0xTX18pICYmXHJcbiAgICAgICAgICAgICAgICAhZmFsc2UgJiZcclxuICAgICAgICAgICAgICAgIHRhcmdldC52bm9kZS5lbCkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZub2RlLmVsLl9fVlVFX0kxOE5fXyA9IGNvbXBvc2VyO1xyXG4gICAgICAgICAgICAgICAgZW1pdHRlciA9IGNyZWF0ZUVtaXR0ZXIoKTtcclxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgICAgICBjb25zdCBfY29tcG9zZXIgPSBjb21wb3NlcjtcclxuICAgICAgICAgICAgICAgIF9jb21wb3NlcltFbmFibGVFbWl0dGVyXSAmJiBfY29tcG9zZXJbRW5hYmxlRW1pdHRlcl0oZW1pdHRlcik7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyLm9uKCcqJywgYWRkVGltZWxpbmVFdmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCB0YXJnZXQpO1xyXG4gICAgICAgIG9uVW5tb3VudGVkKCgpID0+IHtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIGNvbXBvc2VyIGluc3RhbmNlIGZyb20gRE9NIGZvciBpbnRsaWZ5LWRldnRvb2xzXHJcbiAgICAgICAgICAgIGlmICgoKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHx8IF9fVlVFX1BST0RfREVWVE9PTFNfXykgJiZcclxuICAgICAgICAgICAgICAgICFmYWxzZSAmJlxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LnZub2RlLmVsICYmXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQudm5vZGUuZWwuX19WVUVfSTE4Tl9fKSB7XHJcbiAgICAgICAgICAgICAgICBlbWl0dGVyICYmIGVtaXR0ZXIub2ZmKCcqJywgYWRkVGltZWxpbmVFdmVudCk7XHJcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICAgICAgY29uc3QgX2NvbXBvc2VyID0gY29tcG9zZXI7XHJcbiAgICAgICAgICAgICAgICBfY29tcG9zZXJbRGlzYWJsZUVtaXR0ZXJdICYmIF9jb21wb3NlcltEaXNhYmxlRW1pdHRlcl0oKTtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0YXJnZXQudm5vZGUuZWwuX19WVUVfSTE4Tl9fO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGkxOG4uX19kZWxldGVJbnN0YW5jZSh0YXJnZXQpO1xyXG4gICAgICAgIH0sIHRhcmdldCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdXNlSTE4bkZvckxlZ2FjeShpbnN0YW5jZSwgc2NvcGUsIHJvb3QsIG9wdGlvbnMgPSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuKSB7XHJcbiAgICBjb25zdCBpc0xvY2FsZSA9IHNjb3BlID09PSAnbG9jYWwnO1xyXG4gICAgY29uc3QgX2NvbXBvc2VyID0gc2hhbGxvd1JlZihudWxsKTtcclxuICAgIGlmIChpc0xvY2FsZSAmJlxyXG4gICAgICAgIGluc3RhbmNlLnByb3h5ICYmXHJcbiAgICAgICAgIShpbnN0YW5jZS5wcm94eS4kb3B0aW9ucy5pMThuIHx8IGluc3RhbmNlLnByb3h5LiRvcHRpb25zLl9faTE4bikpIHtcclxuICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuTVVTVF9ERUZJTkVfSTE4Tl9PUFRJT05fSU5fQUxMT1dfQ09NUE9TSVRJT04pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgX2luaGVyaXRMb2NhbGUgPSBpc0Jvb2xlYW4ob3B0aW9ucy5pbmhlcml0TG9jYWxlKVxyXG4gICAgICAgID8gb3B0aW9ucy5pbmhlcml0TG9jYWxlXHJcbiAgICAgICAgOiB0cnVlO1xyXG4gICAgY29uc3QgX2xvY2FsZSA9IHJlZihcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgaXNMb2NhbGUgJiYgX2luaGVyaXRMb2NhbGVcclxuICAgICAgICA/IHJvb3QubG9jYWxlLnZhbHVlXHJcbiAgICAgICAgOiBpc1N0cmluZyhvcHRpb25zLmxvY2FsZSlcclxuICAgICAgICAgICAgPyBvcHRpb25zLmxvY2FsZVxyXG4gICAgICAgICAgICA6IERFRkFVTFRfTE9DQUxFKTtcclxuICAgIGNvbnN0IF9mYWxsYmFja0xvY2FsZSA9IHJlZihcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgaXNMb2NhbGUgJiYgX2luaGVyaXRMb2NhbGVcclxuICAgICAgICA/IHJvb3QuZmFsbGJhY2tMb2NhbGUudmFsdWVcclxuICAgICAgICA6IGlzU3RyaW5nKG9wdGlvbnMuZmFsbGJhY2tMb2NhbGUpIHx8XHJcbiAgICAgICAgICAgIGlzQXJyYXkob3B0aW9ucy5mYWxsYmFja0xvY2FsZSkgfHxcclxuICAgICAgICAgICAgaXNQbGFpbk9iamVjdChvcHRpb25zLmZhbGxiYWNrTG9jYWxlKSB8fFxyXG4gICAgICAgICAgICBvcHRpb25zLmZhbGxiYWNrTG9jYWxlID09PSBmYWxzZVxyXG4gICAgICAgICAgICA/IG9wdGlvbnMuZmFsbGJhY2tMb2NhbGVcclxuICAgICAgICAgICAgOiBfbG9jYWxlLnZhbHVlKTtcclxuICAgIGNvbnN0IF9tZXNzYWdlcyA9IHJlZihnZXRMb2NhbGVNZXNzYWdlcyhfbG9jYWxlLnZhbHVlLCBvcHRpb25zKSk7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IF9kYXRldGltZUZvcm1hdHMgPSByZWYoaXNQbGFpbk9iamVjdChvcHRpb25zLmRhdGV0aW1lRm9ybWF0cylcclxuICAgICAgICA/IG9wdGlvbnMuZGF0ZXRpbWVGb3JtYXRzXHJcbiAgICAgICAgOiB7IFtfbG9jYWxlLnZhbHVlXToge30gfSk7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IF9udW1iZXJGb3JtYXRzID0gcmVmKGlzUGxhaW5PYmplY3Qob3B0aW9ucy5udW1iZXJGb3JtYXRzKVxyXG4gICAgICAgID8gb3B0aW9ucy5udW1iZXJGb3JtYXRzXHJcbiAgICAgICAgOiB7IFtfbG9jYWxlLnZhbHVlXToge30gfSk7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IF9taXNzaW5nV2FybiA9IGlzTG9jYWxlXHJcbiAgICAgICAgPyByb290Lm1pc3NpbmdXYXJuXHJcbiAgICAgICAgOiBpc0Jvb2xlYW4ob3B0aW9ucy5taXNzaW5nV2FybikgfHwgaXNSZWdFeHAob3B0aW9ucy5taXNzaW5nV2FybilcclxuICAgICAgICAgICAgPyBvcHRpb25zLm1pc3NpbmdXYXJuXHJcbiAgICAgICAgICAgIDogdHJ1ZTtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgY29uc3QgX2ZhbGxiYWNrV2FybiA9IGlzTG9jYWxlXHJcbiAgICAgICAgPyByb290LmZhbGxiYWNrV2FyblxyXG4gICAgICAgIDogaXNCb29sZWFuKG9wdGlvbnMuZmFsbGJhY2tXYXJuKSB8fCBpc1JlZ0V4cChvcHRpb25zLmZhbGxiYWNrV2FybilcclxuICAgICAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrV2FyblxyXG4gICAgICAgICAgICA6IHRydWU7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IF9mYWxsYmFja1Jvb3QgPSBpc0xvY2FsZVxyXG4gICAgICAgID8gcm9vdC5mYWxsYmFja1Jvb3RcclxuICAgICAgICA6IGlzQm9vbGVhbihvcHRpb25zLmZhbGxiYWNrUm9vdClcclxuICAgICAgICAgICAgPyBvcHRpb25zLmZhbGxiYWNrUm9vdFxyXG4gICAgICAgICAgICA6IHRydWU7XHJcbiAgICAvLyBjb25maWd1cmUgZmFsbCBiYWNrIHRvIHJvb3RcclxuICAgIGNvbnN0IF9mYWxsYmFja0Zvcm1hdCA9ICEhb3B0aW9ucy5mYWxsYmFja0Zvcm1hdDtcclxuICAgIC8vIHJ1bnRpbWUgbWlzc2luZ1xyXG4gICAgY29uc3QgX21pc3NpbmcgPSBpc0Z1bmN0aW9uKG9wdGlvbnMubWlzc2luZykgPyBvcHRpb25zLm1pc3NpbmcgOiBudWxsO1xyXG4gICAgLy8gcG9zdFRyYW5zbGF0aW9uIGhhbmRsZXJcclxuICAgIGNvbnN0IF9wb3N0VHJhbnNsYXRpb24gPSBpc0Z1bmN0aW9uKG9wdGlvbnMucG9zdFRyYW5zbGF0aW9uKVxyXG4gICAgICAgID8gb3B0aW9ucy5wb3N0VHJhbnNsYXRpb25cclxuICAgICAgICA6IG51bGw7XHJcbiAgICAvLyBwcmV0dGllci1pZ25vcmVcclxuICAgIGNvbnN0IF93YXJuSHRtbE1lc3NhZ2UgPSBpc0xvY2FsZVxyXG4gICAgICAgID8gcm9vdC53YXJuSHRtbE1lc3NhZ2VcclxuICAgICAgICA6IGlzQm9vbGVhbihvcHRpb25zLndhcm5IdG1sTWVzc2FnZSlcclxuICAgICAgICAgICAgPyBvcHRpb25zLndhcm5IdG1sTWVzc2FnZVxyXG4gICAgICAgICAgICA6IHRydWU7XHJcbiAgICBjb25zdCBfZXNjYXBlUGFyYW1ldGVyID0gISFvcHRpb25zLmVzY2FwZVBhcmFtZXRlcjtcclxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxyXG4gICAgY29uc3QgX21vZGlmaWVycyA9IGlzTG9jYWxlXHJcbiAgICAgICAgPyByb290Lm1vZGlmaWVyc1xyXG4gICAgICAgIDogaXNQbGFpbk9iamVjdChvcHRpb25zLm1vZGlmaWVycylcclxuICAgICAgICAgICAgPyBvcHRpb25zLm1vZGlmaWVyc1xyXG4gICAgICAgICAgICA6IHt9O1xyXG4gICAgLy8gcGx1cmFsUnVsZXNcclxuICAgIGNvbnN0IF9wbHVyYWxSdWxlcyA9IG9wdGlvbnMucGx1cmFsUnVsZXMgfHwgKGlzTG9jYWxlICYmIHJvb3QucGx1cmFsUnVsZXMpO1xyXG4gICAgLy8gdHJhY2sgcmVhY3Rpdml0eVxyXG4gICAgZnVuY3Rpb24gdHJhY2tSZWFjdGl2aXR5VmFsdWVzKCkge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIF9sb2NhbGUudmFsdWUsXHJcbiAgICAgICAgICAgIF9mYWxsYmFja0xvY2FsZS52YWx1ZSxcclxuICAgICAgICAgICAgX21lc3NhZ2VzLnZhbHVlLFxyXG4gICAgICAgICAgICBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlLFxyXG4gICAgICAgICAgICBfbnVtYmVyRm9ybWF0cy52YWx1ZVxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcbiAgICAvLyBsb2NhbGVcclxuICAgIGNvbnN0IGxvY2FsZSA9IGNvbXB1dGVkKHtcclxuICAgICAgICBnZXQ6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5sb2NhbGUudmFsdWUgOiBfbG9jYWxlLnZhbHVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiB2YWwgPT4ge1xyXG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUubG9jYWxlLnZhbHVlID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9sb2NhbGUudmFsdWUgPSB2YWw7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBmYWxsYmFja0xvY2FsZVxyXG4gICAgY29uc3QgZmFsbGJhY2tMb2NhbGUgPSBjb21wdXRlZCh7XHJcbiAgICAgICAgZ2V0OiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWVcclxuICAgICAgICAgICAgICAgID8gX2NvbXBvc2VyLnZhbHVlLmZhbGxiYWNrTG9jYWxlLnZhbHVlXHJcbiAgICAgICAgICAgICAgICA6IF9mYWxsYmFja0xvY2FsZS52YWx1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldDogdmFsID0+IHtcclxuICAgICAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLmZhbGxiYWNrTG9jYWxlLnZhbHVlID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9mYWxsYmFja0xvY2FsZS52YWx1ZSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIG1lc3NhZ2VzXHJcbiAgICBjb25zdCBtZXNzYWdlcyA9IGNvbXB1dGVkKCgpID0+IHtcclxuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUubWVzc2FnZXMudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgICAgICByZXR1cm4gX21lc3NhZ2VzLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgY29uc3QgZGF0ZXRpbWVGb3JtYXRzID0gY29tcHV0ZWQoKCkgPT4gX2RhdGV0aW1lRm9ybWF0cy52YWx1ZSk7XHJcbiAgICBjb25zdCBudW1iZXJGb3JtYXRzID0gY29tcHV0ZWQoKCkgPT4gX251bWJlckZvcm1hdHMudmFsdWUpO1xyXG4gICAgZnVuY3Rpb24gZ2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcigpIHtcclxuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXHJcbiAgICAgICAgICAgID8gX2NvbXBvc2VyLnZhbHVlLmdldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIoKVxyXG4gICAgICAgICAgICA6IF9wb3N0VHJhbnNsYXRpb247XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyKGhhbmRsZXIpIHtcclxuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5zZXRQb3N0VHJhbnNsYXRpb25IYW5kbGVyKGhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldE1pc3NpbmdIYW5kbGVyKCkge1xyXG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuZ2V0TWlzc2luZ0hhbmRsZXIoKSA6IF9taXNzaW5nO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2V0TWlzc2luZ0hhbmRsZXIoaGFuZGxlcikge1xyXG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLnNldE1pc3NpbmdIYW5kbGVyKGhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHdhcnBXaXRoRGVwcyhmbikge1xyXG4gICAgICAgIHRyYWNrUmVhY3Rpdml0eVZhbHVlcygpO1xyXG4gICAgICAgIHJldHVybiBmbigpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdCguLi5hcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxyXG4gICAgICAgICAgICA/IHdhcnBXaXRoRGVwcygoKSA9PiBSZWZsZWN0LmFwcGx5KF9jb21wb3Nlci52YWx1ZS50LCBudWxsLCBbLi4uYXJnc10pKVxyXG4gICAgICAgICAgICA6IHdhcnBXaXRoRGVwcygoKSA9PiAnJyk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBydCguLi5hcmdzKSB7XHJcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxyXG4gICAgICAgICAgICA/IFJlZmxlY3QuYXBwbHkoX2NvbXBvc2VyLnZhbHVlLnJ0LCBudWxsLCBbLi4uYXJnc10pXHJcbiAgICAgICAgICAgIDogJyc7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkKC4uLmFyZ3MpIHtcclxuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlXHJcbiAgICAgICAgICAgID8gd2FycFdpdGhEZXBzKCgpID0+IFJlZmxlY3QuYXBwbHkoX2NvbXBvc2VyLnZhbHVlLmQsIG51bGwsIFsuLi5hcmdzXSkpXHJcbiAgICAgICAgICAgIDogd2FycFdpdGhEZXBzKCgpID0+ICcnKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG4oLi4uYXJncykge1xyXG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWVcclxuICAgICAgICAgICAgPyB3YXJwV2l0aERlcHMoKCkgPT4gUmVmbGVjdC5hcHBseShfY29tcG9zZXIudmFsdWUubiwgbnVsbCwgWy4uLmFyZ3NdKSlcclxuICAgICAgICAgICAgOiB3YXJwV2l0aERlcHMoKCkgPT4gJycpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdG0oa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS50bShrZXkpIDoge307XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0ZShrZXksIGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUudGUoa2V5LCBsb2NhbGUpIDogZmFsc2U7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuZ2V0TG9jYWxlTWVzc2FnZShsb2NhbGUpIDoge307XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXRMb2NhbGVNZXNzYWdlKGxvY2FsZSwgbWVzc2FnZSkge1xyXG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLnNldExvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKTtcclxuICAgICAgICAgICAgX21lc3NhZ2VzLnZhbHVlW2xvY2FsZV0gPSBtZXNzYWdlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG1lcmdlTG9jYWxlTWVzc2FnZShsb2NhbGUsIG1lc3NhZ2UpIHtcclxuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5tZXJnZUxvY2FsZU1lc3NhZ2UobG9jYWxlLCBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBnZXREYXRlVGltZUZvcm1hdChsb2NhbGUpIHtcclxuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmdldERhdGVUaW1lRm9ybWF0KGxvY2FsZSkgOiB7fTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldERhdGVUaW1lRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XHJcbiAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xyXG4gICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuc2V0RGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpO1xyXG4gICAgICAgICAgICBfZGF0ZXRpbWVGb3JtYXRzLnZhbHVlW2xvY2FsZV0gPSBmb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbWVyZ2VEYXRlVGltZUZvcm1hdChsb2NhbGUsIGZvcm1hdCkge1xyXG4gICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLm1lcmdlRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCBmb3JtYXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGdldE51bWJlckZvcm1hdChsb2NhbGUpIHtcclxuICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmdldE51bWJlckZvcm1hdChsb2NhbGUpIDoge307XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZXROdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpIHtcclxuICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5zZXROdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpO1xyXG4gICAgICAgICAgICBfbnVtYmVyRm9ybWF0cy52YWx1ZVtsb2NhbGVdID0gZm9ybWF0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG1lcmdlTnVtYmVyRm9ybWF0KGxvY2FsZSwgZm9ybWF0KSB7XHJcbiAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xyXG4gICAgICAgICAgICBfY29tcG9zZXIudmFsdWUubWVyZ2VOdW1iZXJGb3JtYXQobG9jYWxlLCBmb3JtYXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0IHdyYXBwZXIgPSB7XHJcbiAgICAgICAgZ2V0IGlkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmlkIDogLTE7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2NhbGUsXHJcbiAgICAgICAgZmFsbGJhY2tMb2NhbGUsXHJcbiAgICAgICAgbWVzc2FnZXMsXHJcbiAgICAgICAgZGF0ZXRpbWVGb3JtYXRzLFxyXG4gICAgICAgIG51bWJlckZvcm1hdHMsXHJcbiAgICAgICAgZ2V0IGluaGVyaXRMb2NhbGUoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuaW5oZXJpdExvY2FsZSA6IF9pbmhlcml0TG9jYWxlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0IGluaGVyaXRMb2NhbGUodmFsKSB7XHJcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5pbmhlcml0TG9jYWxlID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgYXZhaWxhYmxlTG9jYWxlcygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxyXG4gICAgICAgICAgICAgICAgPyBfY29tcG9zZXIudmFsdWUuYXZhaWxhYmxlTG9jYWxlc1xyXG4gICAgICAgICAgICAgICAgOiBPYmplY3Qua2V5cyhfbWVzc2FnZXMudmFsdWUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0IG1vZGlmaWVycygpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUubW9kaWZpZXJzIDogX21vZGlmaWVycyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQgcGx1cmFsUnVsZXMoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLnBsdXJhbFJ1bGVzIDogX3BsdXJhbFJ1bGVzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBpc0dsb2JhbCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5pc0dsb2JhbCA6IGZhbHNlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0IG1pc3NpbmdXYXJuKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLm1pc3NpbmdXYXJuIDogX21pc3NpbmdXYXJuO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0IG1pc3NpbmdXYXJuKHZhbCkge1xyXG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUubWlzc2luZ1dhcm4gPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCBmYWxsYmFja1dhcm4oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWUgPyBfY29tcG9zZXIudmFsdWUuZmFsbGJhY2tXYXJuIDogX2ZhbGxiYWNrV2FybjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCBmYWxsYmFja1dhcm4odmFsKSB7XHJcbiAgICAgICAgICAgIGlmIChfY29tcG9zZXIudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIF9jb21wb3Nlci52YWx1ZS5taXNzaW5nV2FybiA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0IGZhbGxiYWNrUm9vdCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZSA/IF9jb21wb3Nlci52YWx1ZS5mYWxsYmFja1Jvb3QgOiBfZmFsbGJhY2tSb290O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0IGZhbGxiYWNrUm9vdCh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLmZhbGxiYWNrUm9vdCA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0IGZhbGxiYWNrRm9ybWF0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbXBvc2VyLnZhbHVlID8gX2NvbXBvc2VyLnZhbHVlLmZhbGxiYWNrRm9ybWF0IDogX2ZhbGxiYWNrRm9ybWF0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0IGZhbGxiYWNrRm9ybWF0KHZhbCkge1xyXG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuZmFsbGJhY2tGb3JtYXQgPSB2YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCB3YXJuSHRtbE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29tcG9zZXIudmFsdWVcclxuICAgICAgICAgICAgICAgID8gX2NvbXBvc2VyLnZhbHVlLndhcm5IdG1sTWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgOiBfd2Fybkh0bWxNZXNzYWdlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0IHdhcm5IdG1sTWVzc2FnZSh2YWwpIHtcclxuICAgICAgICAgICAgaWYgKF9jb21wb3Nlci52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgX2NvbXBvc2VyLnZhbHVlLndhcm5IdG1sTWVzc2FnZSA9IHZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0IGVzY2FwZVBhcmFtZXRlcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb21wb3Nlci52YWx1ZVxyXG4gICAgICAgICAgICAgICAgPyBfY29tcG9zZXIudmFsdWUuZXNjYXBlUGFyYW1ldGVyXHJcbiAgICAgICAgICAgICAgICA6IF9lc2NhcGVQYXJhbWV0ZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQgZXNjYXBlUGFyYW1ldGVyKHZhbCkge1xyXG4gICAgICAgICAgICBpZiAoX2NvbXBvc2VyLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBfY29tcG9zZXIudmFsdWUuZXNjYXBlUGFyYW1ldGVyID0gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0LFxyXG4gICAgICAgIGdldFBvc3RUcmFuc2xhdGlvbkhhbmRsZXIsXHJcbiAgICAgICAgc2V0UG9zdFRyYW5zbGF0aW9uSGFuZGxlcixcclxuICAgICAgICBnZXRNaXNzaW5nSGFuZGxlcixcclxuICAgICAgICBzZXRNaXNzaW5nSGFuZGxlcixcclxuICAgICAgICBydCxcclxuICAgICAgICBkLFxyXG4gICAgICAgIG4sXHJcbiAgICAgICAgdG0sXHJcbiAgICAgICAgdGUsXHJcbiAgICAgICAgZ2V0TG9jYWxlTWVzc2FnZSxcclxuICAgICAgICBzZXRMb2NhbGVNZXNzYWdlLFxyXG4gICAgICAgIG1lcmdlTG9jYWxlTWVzc2FnZSxcclxuICAgICAgICBnZXREYXRlVGltZUZvcm1hdCxcclxuICAgICAgICBzZXREYXRlVGltZUZvcm1hdCxcclxuICAgICAgICBtZXJnZURhdGVUaW1lRm9ybWF0LFxyXG4gICAgICAgIGdldE51bWJlckZvcm1hdCxcclxuICAgICAgICBzZXROdW1iZXJGb3JtYXQsXHJcbiAgICAgICAgbWVyZ2VOdW1iZXJGb3JtYXRcclxuICAgIH07XHJcbiAgICBmdW5jdGlvbiBzeW5jKGNvbXBvc2VyKSB7XHJcbiAgICAgICAgY29tcG9zZXIubG9jYWxlLnZhbHVlID0gX2xvY2FsZS52YWx1ZTtcclxuICAgICAgICBjb21wb3Nlci5mYWxsYmFja0xvY2FsZS52YWx1ZSA9IF9mYWxsYmFja0xvY2FsZS52YWx1ZTtcclxuICAgICAgICBPYmplY3Qua2V5cyhfbWVzc2FnZXMudmFsdWUpLmZvckVhY2gobG9jYWxlID0+IHtcclxuICAgICAgICAgICAgY29tcG9zZXIubWVyZ2VMb2NhbGVNZXNzYWdlKGxvY2FsZSwgX21lc3NhZ2VzLnZhbHVlW2xvY2FsZV0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIE9iamVjdC5rZXlzKF9kYXRldGltZUZvcm1hdHMudmFsdWUpLmZvckVhY2gobG9jYWxlID0+IHtcclxuICAgICAgICAgICAgY29tcG9zZXIubWVyZ2VEYXRlVGltZUZvcm1hdChsb2NhbGUsIF9kYXRldGltZUZvcm1hdHMudmFsdWVbbG9jYWxlXSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgT2JqZWN0LmtleXMoX251bWJlckZvcm1hdHMudmFsdWUpLmZvckVhY2gobG9jYWxlID0+IHtcclxuICAgICAgICAgICAgY29tcG9zZXIubWVyZ2VOdW1iZXJGb3JtYXQobG9jYWxlLCBfbnVtYmVyRm9ybWF0cy52YWx1ZVtsb2NhbGVdKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb21wb3Nlci5lc2NhcGVQYXJhbWV0ZXIgPSBfZXNjYXBlUGFyYW1ldGVyO1xyXG4gICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrRm9ybWF0ID0gX2ZhbGxiYWNrRm9ybWF0O1xyXG4gICAgICAgIGNvbXBvc2VyLmZhbGxiYWNrUm9vdCA9IF9mYWxsYmFja1Jvb3Q7XHJcbiAgICAgICAgY29tcG9zZXIuZmFsbGJhY2tXYXJuID0gX2ZhbGxiYWNrV2FybjtcclxuICAgICAgICBjb21wb3Nlci5taXNzaW5nV2FybiA9IF9taXNzaW5nV2FybjtcclxuICAgICAgICBjb21wb3Nlci53YXJuSHRtbE1lc3NhZ2UgPSBfd2Fybkh0bWxNZXNzYWdlO1xyXG4gICAgfVxyXG4gICAgb25CZWZvcmVNb3VudCgoKSA9PiB7XHJcbiAgICAgICAgaWYgKGluc3RhbmNlLnByb3h5ID09IG51bGwgfHwgaW5zdGFuY2UucHJveHkuJGkxOG4gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuTk9UX0FWQUlMQUJMRV9DT01QT1NJVElPTl9JTl9MRUdBQ1kpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIGNvbnN0IGNvbXBvc2VyID0gKF9jb21wb3Nlci52YWx1ZSA9IGluc3RhbmNlLnByb3h5LiRpMThuXHJcbiAgICAgICAgICAgIC5fX2NvbXBvc2VyKTtcclxuICAgICAgICBpZiAoc2NvcGUgPT09ICdnbG9iYWwnKSB7XHJcbiAgICAgICAgICAgIF9sb2NhbGUudmFsdWUgPSBjb21wb3Nlci5sb2NhbGUudmFsdWU7XHJcbiAgICAgICAgICAgIF9mYWxsYmFja0xvY2FsZS52YWx1ZSA9IGNvbXBvc2VyLmZhbGxiYWNrTG9jYWxlLnZhbHVlO1xyXG4gICAgICAgICAgICBfbWVzc2FnZXMudmFsdWUgPSBjb21wb3Nlci5tZXNzYWdlcy52YWx1ZTtcclxuICAgICAgICAgICAgX2RhdGV0aW1lRm9ybWF0cy52YWx1ZSA9IGNvbXBvc2VyLmRhdGV0aW1lRm9ybWF0cy52YWx1ZTtcclxuICAgICAgICAgICAgX251bWJlckZvcm1hdHMudmFsdWUgPSBjb21wb3Nlci5udW1iZXJGb3JtYXRzLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpc0xvY2FsZSkge1xyXG4gICAgICAgICAgICBzeW5jKGNvbXBvc2VyKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB3cmFwcGVyO1xyXG59XHJcbmNvbnN0IGdsb2JhbEV4cG9ydFByb3BzID0gW1xyXG4gICAgJ2xvY2FsZScsXHJcbiAgICAnZmFsbGJhY2tMb2NhbGUnLFxyXG4gICAgJ2F2YWlsYWJsZUxvY2FsZXMnXHJcbl07XHJcbmNvbnN0IGdsb2JhbEV4cG9ydE1ldGhvZHMgPSBbJ3QnLCAncnQnLCAnZCcsICduJywgJ3RtJ10gO1xyXG5mdW5jdGlvbiBpbmplY3RHbG9iYWxGaWVsZHMoYXBwLCBjb21wb3Nlcikge1xyXG4gICAgY29uc3QgaTE4biA9IE9iamVjdC5jcmVhdGUobnVsbCk7XHJcbiAgICBnbG9iYWxFeHBvcnRQcm9wcy5mb3JFYWNoKHByb3AgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbXBvc2VyLCBwcm9wKTtcclxuICAgICAgICBpZiAoIWRlc2MpIHtcclxuICAgICAgICAgICAgdGhyb3cgY3JlYXRlSTE4bkVycm9yKEkxOG5FcnJvckNvZGVzLlVORVhQRUNURURfRVJST1IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCB3cmFwID0gaXNSZWYoZGVzYy52YWx1ZSkgLy8gY2hlY2sgY29tcHV0ZWQgcHJvcHNcclxuICAgICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlc2MudmFsdWUudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgICAgICAgICAgIHNldCh2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZXNjLnZhbHVlLnZhbHVlID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDoge1xyXG4gICAgICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkZXNjLmdldCAmJiBkZXNjLmdldCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpMThuLCBwcm9wLCB3cmFwKTtcclxuICAgIH0pO1xyXG4gICAgYXBwLmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRpMThuID0gaTE4bjtcclxuICAgIGdsb2JhbEV4cG9ydE1ldGhvZHMuZm9yRWFjaChtZXRob2QgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbXBvc2VyLCBtZXRob2QpO1xyXG4gICAgICAgIGlmICghZGVzYyB8fCAhZGVzYy52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBjcmVhdGVJMThuRXJyb3IoSTE4bkVycm9yQ29kZXMuVU5FWFBFQ1RFRF9FUlJPUik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhcHAuY29uZmlnLmdsb2JhbFByb3BlcnRpZXMsIGAkJHttZXRob2R9YCwgZGVzYyk7XHJcbiAgICB9KTtcclxufVxuXG4vLyByZWdpc3RlciBtZXNzYWdlIHJlc29sdmVyIGF0IHZ1ZS1pMThuXHJcbnJlZ2lzdGVyTWVzc2FnZVJlc29sdmVyKHJlc29sdmVWYWx1ZSk7XHJcbi8vIHJlZ2lzdGVyIGZhbGxiYWNrIGxvY2FsZSBhdCB2dWUtaTE4blxyXG5yZWdpc3RlckxvY2FsZUZhbGxiYWNrZXIoZmFsbGJhY2tXaXRoTG9jYWxlQ2hhaW4pO1xyXG57XHJcbiAgICBpbml0RmVhdHVyZUZsYWdzKCk7XHJcbn1cclxuLy8gTk9URTogZXhwZXJpbWVudGFsICEhXHJcbmlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgfHwgX19JTlRMSUZZX1BST0RfREVWVE9PTFNfXykge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZ2V0R2xvYmFsVGhpcygpO1xyXG4gICAgdGFyZ2V0Ll9fSU5UTElGWV9fID0gdHJ1ZTtcclxuICAgIHNldERldlRvb2xzSG9vayh0YXJnZXQuX19JTlRMSUZZX0RFVlRPT0xTX0dMT0JBTF9IT09LX18pO1xyXG59XHJcbmlmICgocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykpIDtcblxuZXhwb3J0IHsgRGF0ZXRpbWVGb3JtYXQsIEkxOG5JbmplY3Rpb25LZXksIE51bWJlckZvcm1hdCwgVHJhbnNsYXRpb24sIFZFUlNJT04sIGNhc3RUb1Z1ZUkxOG4sIGNyZWF0ZUkxOG4sIHVzZUkxOG4sIHZURGlyZWN0aXZlIH07XG4iLCIvLyBUaGlzIGlzIGp1c3QgYW4gZXhhbXBsZSxcbi8vIHNvIHlvdSBjYW4gc2FmZWx5IGRlbGV0ZSBhbGwgZGVmYXVsdCBwcm9wcyBiZWxvd1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZhaWxlZDogJ0FjdGlvbiBmYWlsZWQnLFxuICBzdWNjZXNzOiAnQWN0aW9uIHdhcyBzdWNjZXNzZnVsJ1xufTtcbiIsImltcG9ydCBlblVTIGZyb20gJy4vZW4tVVMnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICdlbi1VUyc6IGVuVVNcbn07XG4iLCJpbXBvcnQgeyBib290IH0gZnJvbSAncXVhc2FyL3dyYXBwZXJzJztcbmltcG9ydCB7IGNyZWF0ZUkxOG4gfSBmcm9tICd2dWUtaTE4bic7XG5cbmltcG9ydCBtZXNzYWdlcyBmcm9tICdzcmMvaTE4bic7XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VMYW5ndWFnZXMgPSBrZXlvZiB0eXBlb2YgbWVzc2FnZXM7XG4vLyBUeXBlLWRlZmluZSAnZW4tVVMnIGFzIHRoZSBtYXN0ZXIgc2NoZW1hIGZvciB0aGUgcmVzb3VyY2VcbmV4cG9ydCB0eXBlIE1lc3NhZ2VTY2hlbWEgPSB0eXBlb2YgbWVzc2FnZXNbJ2VuLVVTJ107XG5cbi8vIFNlZSBodHRwczovL3Z1ZS1pMThuLmludGxpZnkuZGV2L2d1aWRlL2FkdmFuY2VkL3R5cGVzY3JpcHQuaHRtbCNnbG9iYWwtcmVzb3VyY2Utc2NoZW1hLXR5cGUtZGVmaW5pdGlvblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWludGVyZmFjZSAqL1xuZGVjbGFyZSBtb2R1bGUgJ3Z1ZS1pMThuJyB7XG4gIC8vIGRlZmluZSB0aGUgbG9jYWxlIG1lc3NhZ2VzIHNjaGVtYVxuICBleHBvcnQgaW50ZXJmYWNlIERlZmluZUxvY2FsZU1lc3NhZ2UgZXh0ZW5kcyBNZXNzYWdlU2NoZW1hIHt9XG5cbiAgLy8gZGVmaW5lIHRoZSBkYXRldGltZSBmb3JtYXQgc2NoZW1hXG4gIGV4cG9ydCBpbnRlcmZhY2UgRGVmaW5lRGF0ZVRpbWVGb3JtYXQge31cblxuICAvLyBkZWZpbmUgdGhlIG51bWJlciBmb3JtYXQgc2NoZW1hXG4gIGV4cG9ydCBpbnRlcmZhY2UgRGVmaW5lTnVtYmVyRm9ybWF0IHt9XG59XG4vKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1pbnRlcmZhY2UgKi9cblxuZXhwb3J0IGRlZmF1bHQgYm9vdCgoeyBhcHAgfSkgPT4ge1xuICBjb25zdCBpMThuID0gY3JlYXRlSTE4bih7XG4gICAgbG9jYWxlOiAnZW4tVVMnLFxuICAgIGxlZ2FjeTogZmFsc2UsXG4gICAgbWVzc2FnZXMsXG4gIH0pO1xuXG4gIC8vIFNldCBpMThuIGluc3RhbmNlIG9uIGFwcFxuICBhcHAudXNlKGkxOG4pO1xufSk7XG4iXSwibmFtZXMiOlsiY29kZSIsIm1lc3NhZ2VzIiwidHlwZSIsImkxOG4iLCJWRVJTSU9OIiwiaW5jIiwicmVzb2x2ZVZhbHVlIiwibXNnIiwic291cmNlIiwibWVzc2FnZSIsImxvY2FsZSIsImdsb2JhbCIsImxvY2FsZXMiLCJfY29udGV4dCIsIm9wdGlvbnMiLCJjb21wb3NlciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQSxNQUFNLFlBQVksT0FBTyxXQUFXO0FBK0JwQyxNQUFNLFlBQVksT0FBTyxXQUFXLGNBQWMsT0FBTyxPQUFPLGdCQUFnQjtBQUNoRixNQUFNLGFBQWEsQ0FBQyxTQUFTLFlBQVksT0FBTyxJQUFJLElBQUk7QUFDeEQsTUFBTSx5QkFBeUIsQ0FBQyxRQUFRLEtBQUssV0FBVyxzQkFBc0IsRUFBRSxHQUFHLFFBQVEsR0FBRyxLQUFLLEdBQUcsT0FBUSxDQUFBO0FBQzlHLE1BQU0sd0JBQXdCLENBQUMsU0FBUyxLQUFL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
