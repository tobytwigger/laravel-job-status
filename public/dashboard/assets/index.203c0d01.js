import { b as useRouterLinkProps, h as useRouterLink, Q as QIcon, d as useAlignProps, f as useAlign, j as getNormalizedVNodes } from "./use-router-link.52590381.js";
import { c as createComponent, e as hMergeSlot, h as hSlot } from "./render.060e8dc4.js";
import { c as computed, h, g as getCurrentInstance } from "./index.9f6f356f.js";
import { u as useDarkProps, a as useDark } from "./QItem.8ac5cbd8.js";
import { b as axios } from "./index.b7f28e66.js";
var QBreadcrumbsEl = createComponent({
  name: "QBreadcrumbsEl",
  props: {
    ...useRouterLinkProps,
    label: String,
    icon: String,
    tag: {
      type: String,
      default: "span"
    }
  },
  emits: ["click"],
  setup(props, { slots }) {
    const { linkTag, linkAttrs, linkClass, navigateOnClick } = useRouterLink();
    const data = computed(() => {
      return {
        class: "q-breadcrumbs__el q-link flex inline items-center relative-position " + (props.disable !== true ? "q-link--focusable" + linkClass.value : "q-breadcrumbs__el--disable"),
        ...linkAttrs.value,
        onClick: navigateOnClick
      };
    });
    const iconClass = computed(
      () => "q-breadcrumbs__el-icon" + (props.label !== void 0 ? " q-breadcrumbs__el-icon--with-label" : "")
    );
    return () => {
      const child = [];
      props.icon !== void 0 && child.push(
        h(QIcon, {
          class: iconClass.value,
          name: props.icon
        })
      );
      props.label !== void 0 && child.push(props.label);
      return h(
        linkTag.value,
        { ...data.value },
        hMergeSlot(slots.default, child)
      );
    };
  }
});
const disabledValues = ["", true];
var QBreadcrumbs = createComponent({
  name: "QBreadcrumbs",
  props: {
    ...useAlignProps,
    separator: {
      type: String,
      default: "/"
    },
    separatorColor: String,
    activeColor: {
      type: String,
      default: "primary"
    },
    gutter: {
      type: String,
      validator: (v) => ["none", "xs", "sm", "md", "lg", "xl"].includes(v),
      default: "sm"
    }
  },
  setup(props, { slots }) {
    const alignClass = useAlign(props);
    const classes = computed(
      () => `flex items-center ${alignClass.value}${props.gutter === "none" ? "" : ` q-gutter-${props.gutter}`}`
    );
    const sepClass = computed(() => props.separatorColor ? ` text-${props.separatorColor}` : "");
    const activeClass = computed(() => ` text-${props.activeColor}`);
    return () => {
      const vnodes = getNormalizedVNodes(
        hSlot(slots.default)
      );
      if (vnodes.length === 0) {
        return;
      }
      let els = 1;
      const child = [], len = vnodes.filter((c) => c.type !== void 0 && c.type.name === "QBreadcrumbsEl").length, separator = slots.separator !== void 0 ? slots.separator : () => props.separator;
      vnodes.forEach((comp) => {
        if (comp.type !== void 0 && comp.type.name === "QBreadcrumbsEl") {
          const middle = els < len;
          const disabled = comp.props !== null && disabledValues.includes(comp.props.disable);
          const cls = (middle === true ? "" : " q-breadcrumbs--last") + (disabled !== true && middle === true ? activeClass.value : "");
          els++;
          child.push(
            h("div", {
              class: `flex items-center${cls}`
            }, [comp])
          );
          if (middle === true) {
            child.push(
              h("div", {
                class: "q-breadcrumbs__separator" + sepClass.value
              }, separator())
            );
          }
        } else {
          child.push(comp);
        }
      });
      return h("div", {
        class: "q-breadcrumbs"
      }, [
        h("div", { class: classes.value }, child)
      ]);
    };
  }
});
const insetMap = {
  true: "inset",
  item: "item-inset",
  "item-thumbnail": "item-thumbnail-inset"
};
const margins = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24
};
var QSeparator = createComponent({
  name: "QSeparator",
  props: {
    ...useDarkProps,
    spaced: [Boolean, String],
    inset: [Boolean, String],
    vertical: Boolean,
    color: String,
    size: String
  },
  setup(props) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const orientation = computed(() => props.vertical === true ? "vertical" : "horizontal");
    const orientClass = computed(() => ` q-separator--${orientation.value}`);
    const insetClass = computed(() => props.inset !== false ? `${orientClass.value}-${insetMap[props.inset]}` : "");
    const classes = computed(
      () => `q-separator${orientClass.value}${insetClass.value}` + (props.color !== void 0 ? ` bg-${props.color}` : "") + (isDark.value === true ? " q-separator--dark" : "")
    );
    const style = computed(() => {
      const acc = {};
      if (props.size !== void 0) {
        acc[props.vertical === true ? "width" : "height"] = props.size;
      }
      if (props.spaced !== false) {
        const size = props.spaced === true ? `${margins.md}px` : props.spaced in margins ? `${margins[props.spaced]}px` : props.spaced;
        const dir = props.vertical === true ? ["Left", "Right"] : ["Top", "Bottom"];
        acc[`margin${dir[0]}`] = acc[`margin${dir[1]}`] = size;
      }
      return acc;
    });
    return () => h("hr", {
      class: classes.value,
      style: style.value,
      "aria-orientation": orientation.value
    });
  }
});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var dist = {};
var JobSearch$1 = {};
var RequestFactory$1 = {};
var ClientFactory = {};
var config = {};
Object.defineProperty(config, "__esModule", { value: true });
config.baseUrl = config.hasSetting = config.allSettings = void 0;
var allSettings = function() {
  var config2 = window.JobStatusConfig || {};
  if (isSettingConfig(config2)) {
    return config2;
  } else {
    throw new Error("Have you forgotten to share the config with the frontend?");
  }
};
config.allSettings = allSettings;
function isSettingConfig(config2) {
  return config2.baseUrl !== void 0;
}
var hasSetting = function(key) {
  return allSettings().hasOwnProperty(key);
};
config.hasSetting = hasSetting;
var baseUrl = function() {
  return allSettings().baseUrl;
};
config.baseUrl = baseUrl;
Object.defineProperty(ClientFactory, "__esModule", { value: true });
var axios_1 = axios;
var config_1 = config;
function handle(request) {
  var config2 = {
    url: request.url,
    method: request.method,
    baseURL: (0, config_1.baseUrl)()
  };
  var data = request.data;
  if (Object.keys(data).length > 0) {
    config2.data = data;
  }
  return axios_1.default.request(config2);
}
ClientFactory.default = handle;
var Notifier$1 = {};
var HandlerManager = {};
var poll = {};
var Listener$1 = {};
Object.defineProperty(Listener$1, "__esModule", { value: true });
var Listener = function() {
  function Listener2(listenerId, stopListening) {
    this._listenerId = listenerId;
    this._stopListening = stopListening;
  }
  Listener2.prototype.stop = function() {
    this._stopListening(this._listenerId);
  };
  return Listener2;
}();
Listener$1.default = Listener;
Object.defineProperty(poll, "__esModule", { value: true });
var ClientFactory_1$1 = ClientFactory;
var Listener_1 = Listener$1;
var Poll = function() {
  function Poll2() {
    this._ids = [];
    this.loading = [];
  }
  Poll2.prototype.handle = function(request, handler) {
    var _this = this;
    var listenerId = setInterval(function() {
      _this.handleRun(request, handler);
    }, 2e3).toString();
    this._ids.push(listenerId);
    this.handleRun(request, handler);
    return new Listener_1.default(listenerId, function(listenerId2) {
      _this.stopHandling(listenerId2);
    });
  };
  Poll2.prototype.stopHandling = function(handleId) {
    clearInterval(handleId);
  };
  Poll2.prototype.handleRun = function(request, handler) {
    var isFirstLoad = !this.loading.includes(handler.id);
    if (isFirstLoad) {
      this.loading.push(handler.id);
      handler.triggerStartingInitialLoad();
    }
    handler.triggerStartingUpdate();
    (0, ClientFactory_1$1.default)(request).then(function(response) {
      handler.triggerUpdated(response.data);
    }).catch(function(error) {
      handler.triggerErrored(error);
    }).finally(function() {
      handler.triggerFinishingUpdate();
      if (isFirstLoad) {
        handler.triggerFinishingInitialLoad();
      }
    });
  };
  return Poll2;
}();
poll.default = Poll;
Object.defineProperty(HandlerManager, "__esModule", { value: true });
HandlerManager.resolveHandler = void 0;
var poll_1 = poll;
function resolveHandler(request) {
  return new poll_1.default();
}
HandlerManager.resolveHandler = resolveHandler;
var commonjsBrowser = {};
var v1$1 = {};
var rng$1 = {};
Object.defineProperty(rng$1, "__esModule", {
  value: true
});
rng$1.default = rng;
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
var stringify$1 = {};
var validate$1 = {};
var regex = {};
Object.defineProperty(regex, "__esModule", {
  value: true
});
regex.default = void 0;
var _default$c = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
regex.default = _default$c;
Object.defineProperty(validate$1, "__esModule", {
  value: true
});
validate$1.default = void 0;
var _regex = _interopRequireDefault$8(regex);
function _interopRequireDefault$8(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function validate(uuid) {
  return typeof uuid === "string" && _regex.default.test(uuid);
}
var _default$b = validate;
validate$1.default = _default$b;
Object.defineProperty(stringify$1, "__esModule", {
  value: true
});
stringify$1.default = void 0;
stringify$1.unsafeStringify = unsafeStringify;
var _validate$2 = _interopRequireDefault$7(validate$1);
function _interopRequireDefault$7(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset);
  if (!(0, _validate$2.default)(uuid)) {
    throw TypeError("Stringified UUID is invalid");
  }
  return uuid;
}
var _default$a = stringify;
stringify$1.default = _default$a;
Object.defineProperty(v1$1, "__esModule", {
  value: true
});
v1$1.default = void 0;
var _rng$1 = _interopRequireDefault$6(rng$1);
var _stringify$2 = stringify$1;
function _interopRequireDefault$6(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
let _nodeId;
let _clockseq;
let _lastMSecs = 0;
let _lastNSecs = 0;
function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng$1.default)();
    if (node == null) {
      node = _nodeId = [seedBytes[0] | 1, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }
    if (clockseq == null) {
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
    }
  }
  let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
  let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
  if (dt < 0 && options.clockseq === void 0) {
    clockseq = clockseq + 1 & 16383;
  }
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
    nsecs = 0;
  }
  if (nsecs >= 1e4) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }
  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;
  msecs += 122192928e5;
  const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
  b[i++] = tl >>> 24 & 255;
  b[i++] = tl >>> 16 & 255;
  b[i++] = tl >>> 8 & 255;
  b[i++] = tl & 255;
  const tmh = msecs / 4294967296 * 1e4 & 268435455;
  b[i++] = tmh >>> 8 & 255;
  b[i++] = tmh & 255;
  b[i++] = tmh >>> 24 & 15 | 16;
  b[i++] = tmh >>> 16 & 255;
  b[i++] = clockseq >>> 8 | 128;
  b[i++] = clockseq & 255;
  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }
  return buf || (0, _stringify$2.unsafeStringify)(b);
}
var _default$9 = v1;
v1$1.default = _default$9;
var v3$1 = {};
var v35$1 = {};
var parse$1 = {};
Object.defineProperty(parse$1, "__esModule", {
  value: true
});
parse$1.default = void 0;
var _validate$1 = _interopRequireDefault$5(validate$1);
function _interopRequireDefault$5(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function parse(uuid) {
  if (!(0, _validate$1.default)(uuid)) {
    throw TypeError("Invalid UUID");
  }
  let v;
  const arr = new Uint8Array(16);
  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 255;
  arr[2] = v >>> 8 & 255;
  arr[3] = v & 255;
  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 255;
  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 255;
  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 255;
  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
  arr[11] = v / 4294967296 & 255;
  arr[12] = v >>> 24 & 255;
  arr[13] = v >>> 16 & 255;
  arr[14] = v >>> 8 & 255;
  arr[15] = v & 255;
  return arr;
}
var _default$8 = parse;
parse$1.default = _default$8;
Object.defineProperty(v35$1, "__esModule", {
  value: true
});
v35$1.URL = v35$1.DNS = void 0;
v35$1.default = v35;
var _stringify$1 = stringify$1;
var _parse = _interopRequireDefault$4(parse$1);
function _interopRequireDefault$4(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function stringToBytes(str) {
  str = unescape(encodeURIComponent(str));
  const bytes = [];
  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
const DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
v35$1.DNS = DNS;
const URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
v35$1.URL = URL;
function v35(name, version2, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    var _namespace;
    if (typeof value === "string") {
      value = stringToBytes(value);
    }
    if (typeof namespace === "string") {
      namespace = (0, _parse.default)(namespace);
    }
    if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) {
      throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }
    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 15 | version2;
    bytes[8] = bytes[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }
      return buf;
    }
    return (0, _stringify$1.unsafeStringify)(bytes);
  }
  try {
    generateUUID.name = name;
  } catch (err) {
  }
  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
var md5$1 = {};
Object.defineProperty(md5$1, "__esModule", {
  value: true
});
md5$1.default = void 0;
function md5(bytes) {
  if (typeof bytes === "string") {
    const msg = unescape(encodeURIComponent(bytes));
    bytes = new Uint8Array(msg.length);
    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }
  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = "0123456789abcdef";
  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 255;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 15) + hexTab.charAt(x & 15), 16);
    output.push(hex);
  }
  return output;
}
function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
function wordsToMd5(x, len) {
  x[len >> 5] |= 128 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;
  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }
  return [a, b, c, d];
}
function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }
  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));
  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 255) << i % 32;
  }
  return output;
}
function safeAdd(x, y) {
  const lsw = (x & 65535) + (y & 65535);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 65535;
}
function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
var _default$7 = md5;
md5$1.default = _default$7;
Object.defineProperty(v3$1, "__esModule", {
  value: true
});
v3$1.default = void 0;
var _v$1 = _interopRequireDefault$3(v35$1);
var _md = _interopRequireDefault$3(md5$1);
function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const v3 = (0, _v$1.default)("v3", 48, _md.default);
var _default$6 = v3;
v3$1.default = _default$6;
var v4$1 = {};
var native = {};
Object.defineProperty(native, "__esModule", {
  value: true
});
native.default = void 0;
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var _default$5 = {
  randomUUID
};
native.default = _default$5;
Object.defineProperty(v4$1, "__esModule", {
  value: true
});
v4$1.default = void 0;
var _native = _interopRequireDefault$2(native);
var _rng = _interopRequireDefault$2(rng$1);
var _stringify = stringify$1;
function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function v4(options, buf, offset) {
  if (_native.default.randomUUID && !buf && !options) {
    return _native.default.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || _rng.default)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return (0, _stringify.unsafeStringify)(rnds);
}
var _default$4 = v4;
v4$1.default = _default$4;
var v5$1 = {};
var sha1$1 = {};
Object.defineProperty(sha1$1, "__esModule", {
  value: true
});
sha1$1.default = void 0;
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;
    case 1:
      return x ^ y ^ z;
    case 2:
      return x & y ^ x & z ^ y & z;
    case 3:
      return x ^ y ^ z;
  }
}
function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}
function sha1(bytes) {
  const K = [1518500249, 1859775393, 2400959708, 3395469782];
  const H = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
  if (typeof bytes === "string") {
    const msg = unescape(encodeURIComponent(bytes));
    bytes = [];
    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    bytes = Array.prototype.slice.call(bytes);
  }
  bytes.push(128);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);
  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);
    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }
    M[i] = arr;
  }
  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 4294967295;
  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);
    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }
    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }
    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];
    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }
    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }
  return [H[0] >> 24 & 255, H[0] >> 16 & 255, H[0] >> 8 & 255, H[0] & 255, H[1] >> 24 & 255, H[1] >> 16 & 255, H[1] >> 8 & 255, H[1] & 255, H[2] >> 24 & 255, H[2] >> 16 & 255, H[2] >> 8 & 255, H[2] & 255, H[3] >> 24 & 255, H[3] >> 16 & 255, H[3] >> 8 & 255, H[3] & 255, H[4] >> 24 & 255, H[4] >> 16 & 255, H[4] >> 8 & 255, H[4] & 255];
}
var _default$3 = sha1;
sha1$1.default = _default$3;
Object.defineProperty(v5$1, "__esModule", {
  value: true
});
v5$1.default = void 0;
var _v = _interopRequireDefault$1(v35$1);
var _sha = _interopRequireDefault$1(sha1$1);
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
const v5 = (0, _v.default)("v5", 80, _sha.default);
var _default$2 = v5;
v5$1.default = _default$2;
var nil = {};
Object.defineProperty(nil, "__esModule", {
  value: true
});
nil.default = void 0;
var _default$1 = "00000000-0000-0000-0000-000000000000";
nil.default = _default$1;
var version$1 = {};
Object.defineProperty(version$1, "__esModule", {
  value: true
});
version$1.default = void 0;
var _validate = _interopRequireDefault(validate$1);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError("Invalid UUID");
  }
  return parseInt(uuid.slice(14, 15), 16);
}
var _default = version;
version$1.default = _default;
(function(exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "NIL", {
    enumerable: true,
    get: function get() {
      return _nil.default;
    }
  });
  Object.defineProperty(exports, "parse", {
    enumerable: true,
    get: function get() {
      return _parse2.default;
    }
  });
  Object.defineProperty(exports, "stringify", {
    enumerable: true,
    get: function get() {
      return _stringify2.default;
    }
  });
  Object.defineProperty(exports, "v1", {
    enumerable: true,
    get: function get() {
      return _v2.default;
    }
  });
  Object.defineProperty(exports, "v3", {
    enumerable: true,
    get: function get() {
      return _v22.default;
    }
  });
  Object.defineProperty(exports, "v4", {
    enumerable: true,
    get: function get() {
      return _v3.default;
    }
  });
  Object.defineProperty(exports, "v5", {
    enumerable: true,
    get: function get() {
      return _v4.default;
    }
  });
  Object.defineProperty(exports, "validate", {
    enumerable: true,
    get: function get() {
      return _validate2.default;
    }
  });
  Object.defineProperty(exports, "version", {
    enumerable: true,
    get: function get() {
      return _version.default;
    }
  });
  var _v2 = _interopRequireDefault2(v1$1);
  var _v22 = _interopRequireDefault2(v3$1);
  var _v3 = _interopRequireDefault2(v4$1);
  var _v4 = _interopRequireDefault2(v5$1);
  var _nil = _interopRequireDefault2(nil);
  var _version = _interopRequireDefault2(version$1);
  var _validate2 = _interopRequireDefault2(validate$1);
  var _stringify2 = _interopRequireDefault2(stringify$1);
  var _parse2 = _interopRequireDefault2(parse$1);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
})(commonjsBrowser);
Object.defineProperty(Notifier$1, "__esModule", { value: true });
var HandlerManager_1 = HandlerManager;
var uuid_1 = commonjsBrowser;
var Notifier = function() {
  function Notifier2(request) {
    this._onStartingInitialLoad = [];
    this._onFinishingInitialLoad = [];
    this._onStartingUpdate = [];
    this._onFinishingUpdate = [];
    this._onUpdated = [];
    this._onErrored = [];
    this._request = request;
    this.id = (0, uuid_1.v4)();
  }
  Notifier2.prototype.onStartingInitialLoad = function(handler) {
    this._onStartingInitialLoad.push(handler);
    return this;
  };
  Notifier2.prototype.triggerStartingInitialLoad = function() {
    for (var _i = 0, _a = this._onStartingInitialLoad; _i < _a.length; _i++) {
      var callback = _a[_i];
      callback();
    }
  };
  Notifier2.prototype.onFinishingInitialLoad = function(handler) {
    this._onFinishingInitialLoad.push(handler);
    return this;
  };
  Notifier2.prototype.triggerFinishingInitialLoad = function() {
    for (var _i = 0, _a = this._onFinishingInitialLoad; _i < _a.length; _i++) {
      var callback = _a[_i];
      callback();
    }
  };
  Notifier2.prototype.onStartingUpdate = function(handler) {
    this._onStartingUpdate.push(handler);
    return this;
  };
  Notifier2.prototype.triggerStartingUpdate = function() {
    for (var _i = 0, _a = this._onStartingUpdate; _i < _a.length; _i++) {
      var callback = _a[_i];
      callback();
    }
  };
  Notifier2.prototype.onFinishingUpdate = function(handler) {
    this._onFinishingUpdate.push(handler);
    return this;
  };
  Notifier2.prototype.triggerFinishingUpdate = function() {
    for (var _i = 0, _a = this._onFinishingUpdate; _i < _a.length; _i++) {
      var callback = _a[_i];
      callback();
    }
  };
  Notifier2.prototype.onUpdated = function(handler) {
    this._onUpdated.push(handler);
    return this;
  };
  Notifier2.prototype.triggerUpdated = function(newResults) {
    for (var _i = 0, _a = this._onUpdated; _i < _a.length; _i++) {
      var callback = _a[_i];
      callback(newResults);
    }
  };
  Notifier2.prototype.onErrored = function(handler) {
    this._onErrored.push(handler);
    return this;
  };
  Notifier2.prototype.triggerErrored = function(error) {
    for (var _i = 0, _a = this._onErrored; _i < _a.length; _i++) {
      var callback = _a[_i];
      callback(error);
    }
  };
  Notifier2.prototype.start = function() {
    var handler = (0, HandlerManager_1.resolveHandler)(this._request);
    return handler.handle(this._request, this);
  };
  return Notifier2;
}();
Notifier$1.default = Notifier;
Object.defineProperty(RequestFactory$1, "__esModule", { value: true });
var ClientFactory_1 = ClientFactory;
var Notifier_1 = Notifier$1;
var RequestFactory = function() {
  function RequestFactory2() {
  }
  RequestFactory2.prototype.listen = function() {
    return new Notifier_1.default(this.create());
  };
  RequestFactory2.prototype.send = function() {
    return (0, ClientFactory_1.default)(this.create());
  };
  return RequestFactory2;
}();
RequestFactory$1.default = RequestFactory;
var Request$1 = {};
Object.defineProperty(Request$1, "__esModule", { value: true });
var Request = function() {
  function Request2(url, method) {
    this._data = {};
    this._url = url;
    this._method = method;
  }
  Object.defineProperty(Request2.prototype, "url", {
    get: function() {
      return this._url;
    },
    set: function(value) {
      this._url = value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Request2.prototype, "method", {
    get: function() {
      return this._method;
    },
    set: function(value) {
      this._method = value;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Request2.prototype, "data", {
    get: function() {
      return this._data;
    },
    set: function(value) {
      this._data = value;
    },
    enumerable: false,
    configurable: true
  });
  return Request2;
}();
Request$1.default = Request;
var __extends$8 = commonjsGlobal && commonjsGlobal.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(JobSearch$1, "__esModule", { value: true });
var RequestFactory_1$7 = RequestFactory$1;
var Request_1$7 = Request$1;
var JobSearch = function(_super) {
  __extends$8(JobSearch2, _super);
  function JobSearch2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  JobSearch2.prototype.create = function() {
    return new Request_1$7.default("/jobs", "GET");
  };
  return JobSearch2;
}(RequestFactory_1$7.default);
JobSearch$1.default = JobSearch;
var JobShow$1 = {};
var __extends$7 = commonjsGlobal && commonjsGlobal.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(JobShow$1, "__esModule", { value: true });
var RequestFactory_1$6 = RequestFactory$1;
var Request_1$6 = Request$1;
var JobShow = function(_super) {
  __extends$7(JobShow2, _super);
  function JobShow2(alias) {
    var _this = _super.call(this) || this;
    _this.alias = alias;
    return _this;
  }
  JobShow2.prototype.create = function() {
    return new Request_1$6.default("/jobs/" + this.alias, "GET");
  };
  return JobShow2;
}(RequestFactory_1$6.default);
JobShow$1.default = JobShow;
var BatchSearch$1 = {};
var __extends$6 = commonjsGlobal && commonjsGlobal.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(BatchSearch$1, "__esModule", { value: true });
var RequestFactory_1$5 = RequestFactory$1;
var Request_1$5 = Request$1;
var BatchSearch = function(_super) {
  __extends$6(BatchSearch2, _super);
  function BatchSearch2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  BatchSearch2.prototype.create = function() {
    return new Request_1$5.default("/batches", "GET");
  };
  return BatchSearch2;
}(RequestFactory_1$5.default);
BatchSearch$1.default = BatchSearch;
var BatchShow$1 = {};
var __extends$5 = commonjsGlobal && commonjsGlobal.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(BatchShow$1, "__esModule", { value: true });
var RequestFactory_1$4 = RequestFactory$1;
var Request_1$4 = Request$1;
var BatchShow = function(_super) {
  __extends$5(BatchShow2, _super);
  function BatchShow2(batchId) {
    var _this = _super.call(this) || this;
    _this.batchId = batchId;
    return _this;
  }
  BatchShow2.prototype.create = function() {
    return new Request_1$4.default("/batches/" + this.batchId.toString(), "GET");
  };
  return BatchShow2;
}(RequestFactory_1$4.default);
BatchShow$1.default = BatchShow;
var RunSearch$1 = {};
var __extends$4 = commonjsGlobal && commonjsGlobal.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(RunSearch$1, "__esModule", { value: true });
var RequestFactory_1$3 = RequestFactory$1;
var Request_1$3 = Request$1;
var RunSearch = function(_super) {
  __extends$4(RunSearch2, _super);
  function RunSearch2() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  RunSearch2.prototype.create = function() {
    return new Request_1$3.default("/runs", "GET");
  };
  return RunSearch2;
}(RequestFactory_1$3.default);
RunSearch$1.default = RunSearch;
var RunRetry$1 = {};
var __extends$3 = commonjsGlobal && commonjsGlobal.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(RunRetry$1, "__esModule", { value: true });
var RequestFactory_1$2 = RequestFactory$1;
var Request_1$2 = Request$1;
var RunRetry = function(_super) {
  __extends$3(RunRetry2, _super);
  function RunRetry2(runId) {
    var _this = _super.call(this) || this;
    _this.runId = runId;
    return _this;
  }
  RunRetry2.prototype.create = function() {
    return new Request_1$2.default("/runs/" + this.runId.toString() + "/retry", "POST");
  };
  return RunRetry2;
}(RequestFactory_1$2.default);
RunRetry$1.default = RunRetry;
var RunSignal$1 = {};
var __extends$2 = commonjsGlobal && commonjsGlobal.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(RunSignal$1, "__esModule", { value: true });
var RequestFactory_1$1 = RequestFactory$1;
var Request_1$1 = Request$1;
var RunSignal = function(_super) {
  __extends$2(RunSignal2, _super);
  function RunSignal2(runId, signal) {
    var _this = _super.call(this) || this;
    _this.runId = runId;
    _this.signal = signal;
    _this._shouldCancelJob = false;
    return _this;
  }
  RunSignal2.prototype.create = function() {
    var request = new Request_1$1.default("/runs/" + this.runId.toString() + "/signal", "POST");
    request.data = {
      signal: this.signal,
      cancel_job: this._shouldCancelJob
    };
    return request;
  };
  RunSignal2.prototype.shouldCancelJob = function() {
    this._shouldCancelJob = true;
    return this;
  };
  return RunSignal2;
}(RequestFactory_1$1.default);
RunSignal$1.default = RunSignal;
var RunShow$1 = {};
var __extends$1 = commonjsGlobal && commonjsGlobal.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(RunShow$1, "__esModule", { value: true });
var RequestFactory_1 = RequestFactory$1;
var Request_1 = Request$1;
var RunShow = function(_super) {
  __extends$1(RunShow2, _super);
  function RunShow2(runId) {
    var _this = _super.call(this) || this;
    _this.runId = runId;
    return _this;
  }
  RunShow2.prototype.create = function() {
    return new Request_1.default("/runs/" + this.runId.toString(), "GET");
  };
  return RunShow2;
}(RequestFactory_1.default);
RunShow$1.default = RunShow;
var RunCancel$1 = {};
var __extends = commonjsGlobal && commonjsGlobal.__extends || function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(RunCancel$1, "__esModule", { value: true });
var RunSignal_1$1 = RunSignal$1;
var RunCancel = function(_super) {
  __extends(RunCancel2, _super);
  function RunCancel2(runId) {
    var _this = _super.call(this, runId, "cancel") || this;
    _super.prototype.shouldCancelJob.call(_this);
    return _this;
  }
  return RunCancel2;
}(RunSignal_1$1.default);
RunCancel$1.default = RunCancel;
Object.defineProperty(dist, "__esModule", { value: true });
var client = dist.client = void 0;
var JobSearch_1 = JobSearch$1;
var JobShow_1 = JobShow$1;
var BatchSearch_1 = BatchSearch$1;
var BatchShow_1 = BatchShow$1;
var RunSearch_1 = RunSearch$1;
var RunRetry_1 = RunRetry$1;
var RunSignal_1 = RunSignal$1;
var RunShow_1 = RunShow$1;
var RunCancel_1 = RunCancel$1;
client = dist.client = {
  jobs: {
    search: function() {
      return new JobSearch_1.default();
    },
    show: function(alias) {
      return new JobShow_1.default(alias);
    }
  },
  batches: {
    search: function() {
      return new BatchSearch_1.default();
    },
    show: function(batchId) {
      return new BatchShow_1.default(batchId);
    }
  },
  runs: {
    search: function() {
      return new RunSearch_1.default();
    },
    show: function(runId) {
      return new RunShow_1.default(runId);
    },
    signal: function(runId, signal) {
      return new RunSignal_1.default(runId, signal);
    },
    retry: function(runId) {
      return new RunRetry_1.default(runId);
    },
    cancel: function(runId) {
      return new RunCancel_1.default(runId);
    }
  }
};
export { QBreadcrumbsEl as Q, QBreadcrumbs as a, QSeparator as b, client as c, commonjsGlobal as d };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMjAzYzBkMDEuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL1FCcmVhZGNydW1ic0VsLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvYnJlYWRjcnVtYnMvUUJyZWFkY3J1bWJzLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc2VwYXJhdG9yL1FTZXBhcmF0b3IuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL2xhcmF2ZWwtam9iLXN0YXR1cy1qcy9kaXN0L2NvbmZpZy9jb25maWcuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL2xhcmF2ZWwtam9iLXN0YXR1cy1qcy9kaXN0L2NsaWVudC9DbGllbnRGYWN0b3J5LmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9sYXJhdmVsLWpvYi1zdGF0dXMtanMvZGlzdC9saXN0ZW5lci9MaXN0ZW5lci5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvbGFyYXZlbC1qb2Itc3RhdHVzLWpzL2Rpc3QvbGlzdGVuZXIvcG9sbC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvbGFyYXZlbC1qb2Itc3RhdHVzLWpzL2Rpc3QvbGlzdGVuZXIvSGFuZGxlck1hbmFnZXIuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3JuZy5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvcmVnZXguanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3ZhbGlkYXRlLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9zdHJpbmdpZnkuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3YxLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9wYXJzZS5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvdjM1LmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9tZDUuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3YzLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9uYXRpdmUuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9jb21tb25qcy1icm93c2VyL3Y0LmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9zaGExLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92NS5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2NvbW1vbmpzLWJyb3dzZXIvbmlsLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci92ZXJzaW9uLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvY29tbW9uanMtYnJvd3Nlci9pbmRleC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvbGFyYXZlbC1qb2Itc3RhdHVzLWpzL2Rpc3QvbGlzdGVuZXIvTm90aWZpZXIuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL2xhcmF2ZWwtam9iLXN0YXR1cy1qcy9kaXN0L2ludGVyZmFjZXMvUmVxdWVzdEZhY3RvcnkuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL2xhcmF2ZWwtam9iLXN0YXR1cy1qcy9kaXN0L2NsaWVudC9SZXF1ZXN0LmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9sYXJhdmVsLWpvYi1zdGF0dXMtanMvZGlzdC9yZXF1ZXN0cy9qb2JzL0pvYlNlYXJjaC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvbGFyYXZlbC1qb2Itc3RhdHVzLWpzL2Rpc3QvcmVxdWVzdHMvam9icy9Kb2JTaG93LmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9sYXJhdmVsLWpvYi1zdGF0dXMtanMvZGlzdC9yZXF1ZXN0cy9iYXRjaGVzL0JhdGNoU2VhcmNoLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9sYXJhdmVsLWpvYi1zdGF0dXMtanMvZGlzdC9yZXF1ZXN0cy9iYXRjaGVzL0JhdGNoU2hvdy5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvbGFyYXZlbC1qb2Itc3RhdHVzLWpzL2Rpc3QvcmVxdWVzdHMvcnVucy9SdW5TZWFyY2guanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL2xhcmF2ZWwtam9iLXN0YXR1cy1qcy9kaXN0L3JlcXVlc3RzL3J1bnMvUnVuUmV0cnkuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL2xhcmF2ZWwtam9iLXN0YXR1cy1qcy9kaXN0L3JlcXVlc3RzL3J1bnMvUnVuU2lnbmFsLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9sYXJhdmVsLWpvYi1zdGF0dXMtanMvZGlzdC9yZXF1ZXN0cy9ydW5zL1J1blNob3cuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL2xhcmF2ZWwtam9iLXN0YXR1cy1qcy9kaXN0L3JlcXVlc3RzL3J1bnMvUnVuQ2FuY2VsLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9sYXJhdmVsLWpvYi1zdGF0dXMtanMvZGlzdC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHVzZVJvdXRlckxpbmssIHsgdXNlUm91dGVyTGlua1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utcm91dGVyLWxpbmsuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQnJlYWRjcnVtYnNFbCcsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VSb3V0ZXJMaW5rUHJvcHMsXG5cbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGljb246IFN0cmluZyxcblxuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3NwYW4nXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdjbGljaycgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgbGlua1RhZywgbGlua0F0dHJzLCBsaW5rQ2xhc3MsIG5hdmlnYXRlT25DbGljayB9ID0gdXNlUm91dGVyTGluaygpXG5cbiAgICBjb25zdCBkYXRhID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2xhc3M6ICdxLWJyZWFkY3J1bWJzX19lbCBxLWxpbmsgJ1xuICAgICAgICAgICsgJ2ZsZXggaW5saW5lIGl0ZW1zLWNlbnRlciByZWxhdGl2ZS1wb3NpdGlvbiAnXG4gICAgICAgICAgKyAocHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSA/ICdxLWxpbmstLWZvY3VzYWJsZScgKyBsaW5rQ2xhc3MudmFsdWUgOiAncS1icmVhZGNydW1ic19fZWwtLWRpc2FibGUnKSxcbiAgICAgICAgLi4ubGlua0F0dHJzLnZhbHVlLFxuICAgICAgICBvbkNsaWNrOiBuYXZpZ2F0ZU9uQ2xpY2tcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgaWNvbkNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWJyZWFkY3J1bWJzX19lbC1pY29uJ1xuICAgICAgKyAocHJvcHMubGFiZWwgIT09IHZvaWQgMCA/ICcgcS1icmVhZGNydW1ic19fZWwtaWNvbi0td2l0aC1sYWJlbCcgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBwcm9wcy5pY29uICE9PSB2b2lkIDAgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiBpY29uQ2xhc3MudmFsdWUsXG4gICAgICAgICAgbmFtZTogcHJvcHMuaWNvblxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5sYWJlbCAhPT0gdm9pZCAwICYmIGNoaWxkLnB1c2gocHJvcHMubGFiZWwpXG5cbiAgICAgIHJldHVybiBoKFxuICAgICAgICBsaW5rVGFnLnZhbHVlLFxuICAgICAgICB7IC4uLmRhdGEudmFsdWUgfSxcbiAgICAgICAgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBjaGlsZClcbiAgICAgIClcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUFsaWduLCB7IHVzZUFsaWduUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1hbGlnbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgZ2V0Tm9ybWFsaXplZFZOb2RlcyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvdm0uanMnXG5cbmNvbnN0IGRpc2FibGVkVmFsdWVzID0gWyAnJywgdHJ1ZSBdXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQnJlYWRjcnVtYnMnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQWxpZ25Qcm9wcyxcblxuICAgIHNlcGFyYXRvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJy8nXG4gICAgfSxcbiAgICBzZXBhcmF0b3JDb2xvcjogU3RyaW5nLFxuXG4gICAgYWN0aXZlQ29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdwcmltYXJ5J1xuICAgIH0sXG5cbiAgICBndXR0ZXI6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBbICdub25lJywgJ3hzJywgJ3NtJywgJ21kJywgJ2xnJywgJ3hsJyBdLmluY2x1ZGVzKHYpLFxuICAgICAgZGVmYXVsdDogJ3NtJ1xuICAgIH1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGFsaWduQ2xhc3MgPSB1c2VBbGlnbihwcm9wcylcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYGZsZXggaXRlbXMtY2VudGVyICR7IGFsaWduQ2xhc3MudmFsdWUgfSR7IHByb3BzLmd1dHRlciA9PT0gJ25vbmUnID8gJycgOiBgIHEtZ3V0dGVyLSR7IHByb3BzLmd1dHRlciB9YCB9YFxuICAgIClcblxuICAgIGNvbnN0IHNlcENsYXNzID0gY29tcHV0ZWQoKCkgPT4gKHByb3BzLnNlcGFyYXRvckNvbG9yID8gYCB0ZXh0LSR7IHByb3BzLnNlcGFyYXRvckNvbG9yIH1gIDogJycpKVxuICAgIGNvbnN0IGFjdGl2ZUNsYXNzID0gY29tcHV0ZWQoKCkgPT4gYCB0ZXh0LSR7IHByb3BzLmFjdGl2ZUNvbG9yIH1gKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IHZub2RlcyA9IGdldE5vcm1hbGl6ZWRWTm9kZXMoXG4gICAgICAgIGhTbG90KHNsb3RzLmRlZmF1bHQpXG4gICAgICApXG5cbiAgICAgIGlmICh2bm9kZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiB9XG5cbiAgICAgIGxldCBlbHMgPSAxXG5cbiAgICAgIGNvbnN0XG4gICAgICAgIGNoaWxkID0gW10sXG4gICAgICAgIGxlbiA9IHZub2Rlcy5maWx0ZXIoYyA9PiBjLnR5cGUgIT09IHZvaWQgMCAmJiBjLnR5cGUubmFtZSA9PT0gJ1FCcmVhZGNydW1ic0VsJykubGVuZ3RoLFxuICAgICAgICBzZXBhcmF0b3IgPSBzbG90cy5zZXBhcmF0b3IgIT09IHZvaWQgMFxuICAgICAgICAgID8gc2xvdHMuc2VwYXJhdG9yXG4gICAgICAgICAgOiAoKSA9PiBwcm9wcy5zZXBhcmF0b3JcblxuICAgICAgdm5vZGVzLmZvckVhY2goY29tcCA9PiB7XG4gICAgICAgIGlmIChjb21wLnR5cGUgIT09IHZvaWQgMCAmJiBjb21wLnR5cGUubmFtZSA9PT0gJ1FCcmVhZGNydW1ic0VsJykge1xuICAgICAgICAgIGNvbnN0IG1pZGRsZSA9IGVscyA8IGxlblxuICAgICAgICAgIGNvbnN0IGRpc2FibGVkID0gY29tcC5wcm9wcyAhPT0gbnVsbCAmJiBkaXNhYmxlZFZhbHVlcy5pbmNsdWRlcyhjb21wLnByb3BzLmRpc2FibGUpXG4gICAgICAgICAgY29uc3QgY2xzID0gKG1pZGRsZSA9PT0gdHJ1ZSA/ICcnIDogJyBxLWJyZWFkY3J1bWJzLS1sYXN0JylcbiAgICAgICAgICAgICsgKGRpc2FibGVkICE9PSB0cnVlICYmIG1pZGRsZSA9PT0gdHJ1ZSA/IGFjdGl2ZUNsYXNzLnZhbHVlIDogJycpXG5cbiAgICAgICAgICBlbHMrK1xuXG4gICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6IGBmbGV4IGl0ZW1zLWNlbnRlciR7IGNscyB9YFxuICAgICAgICAgICAgfSwgWyBjb21wIF0pXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgaWYgKG1pZGRsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICAgIGNsYXNzOiAncS1icmVhZGNydW1ic19fc2VwYXJhdG9yJyArIHNlcENsYXNzLnZhbHVlXG4gICAgICAgICAgICAgIH0sIHNlcGFyYXRvcigpKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjaGlsZC5wdXNoKGNvbXApXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiAncS1icmVhZGNydW1icydcbiAgICAgIH0sIFtcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBjaGlsZClcbiAgICAgIF0pXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5cbmNvbnN0IGluc2V0TWFwID0ge1xuICB0cnVlOiAnaW5zZXQnLFxuICBpdGVtOiAnaXRlbS1pbnNldCcsXG4gICdpdGVtLXRodW1ibmFpbCc6ICdpdGVtLXRodW1ibmFpbC1pbnNldCdcbn1cblxuZXhwb3J0IGNvbnN0IG1hcmdpbnMgPSB7XG4gIHhzOiAyLFxuICBzbTogNCxcbiAgbWQ6IDgsXG4gIGxnOiAxNixcbiAgeGw6IDI0XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU2VwYXJhdG9yJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIHNwYWNlZDogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgICBpbnNldDogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgICB2ZXJ0aWNhbDogQm9vbGVhbixcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIHNpemU6IFN0cmluZ1xuICB9LFxuXG4gIHNldHVwIChwcm9wcykge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IG9yaWVudGF0aW9uID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgPyAndmVydGljYWwnXG4gICAgICAgIDogJ2hvcml6b250YWwnXG4gICAgKSlcblxuICAgIGNvbnN0IG9yaWVudENsYXNzID0gY29tcHV0ZWQoKCkgPT4gYCBxLXNlcGFyYXRvci0tJHsgb3JpZW50YXRpb24udmFsdWUgfWApXG5cbiAgICBjb25zdCBpbnNldENsYXNzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuaW5zZXQgIT09IGZhbHNlXG4gICAgICAgID8gYCR7IG9yaWVudENsYXNzLnZhbHVlIH0tJHsgaW5zZXRNYXBbIHByb3BzLmluc2V0IF0gfWBcbiAgICAgICAgOiAnJ1xuICAgICkpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXNlcGFyYXRvciR7IG9yaWVudENsYXNzLnZhbHVlIH0keyBpbnNldENsYXNzLnZhbHVlIH1gXG4gICAgICArIChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYCBiZy0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXNlcGFyYXRvci0tZGFyaycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjYyA9IHt9XG5cbiAgICAgIGlmIChwcm9wcy5zaXplICE9PSB2b2lkIDApIHtcbiAgICAgICAgYWNjWyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd3aWR0aCcgOiAnaGVpZ2h0JyBdID0gcHJvcHMuc2l6ZVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuc3BhY2VkICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBzaXplID0gcHJvcHMuc3BhY2VkID09PSB0cnVlXG4gICAgICAgICAgPyBgJHsgbWFyZ2lucy5tZCB9cHhgXG4gICAgICAgICAgOiBwcm9wcy5zcGFjZWQgaW4gbWFyZ2lucyA/IGAkeyBtYXJnaW5zWyBwcm9wcy5zcGFjZWQgXSB9cHhgIDogcHJvcHMuc3BhY2VkXG5cbiAgICAgICAgY29uc3QgZGlyID0gcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgICA/IFsgJ0xlZnQnLCAnUmlnaHQnIF1cbiAgICAgICAgICA6IFsgJ1RvcCcsICdCb3R0b20nIF1cblxuICAgICAgICBhY2NbIGBtYXJnaW4keyBkaXJbIDAgXSB9YCBdID0gYWNjWyBgbWFyZ2luJHsgZGlyWyAxIF0gfWAgXSA9IHNpemVcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjY1xuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnaHInLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICdhcmlhLW9yaWVudGF0aW9uJzogb3JpZW50YXRpb24udmFsdWVcbiAgICB9KVxuICB9XG59KVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmJhc2VVcmwgPSBleHBvcnRzLmhhc1NldHRpbmcgPSBleHBvcnRzLmFsbFNldHRpbmdzID0gdm9pZCAwO1xudmFyIGFsbFNldHRpbmdzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjb25maWcgPSB3aW5kb3cuSm9iU3RhdHVzQ29uZmlnIHx8IHt9O1xuICAgIGlmIChpc1NldHRpbmdDb25maWcoY29uZmlnKSkge1xuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdIYXZlIHlvdSBmb3Jnb3R0ZW4gdG8gc2hhcmUgdGhlIGNvbmZpZyB3aXRoIHRoZSBmcm9udGVuZD8nKTtcbiAgICB9XG59O1xuZXhwb3J0cy5hbGxTZXR0aW5ncyA9IGFsbFNldHRpbmdzO1xuZnVuY3Rpb24gaXNTZXR0aW5nQ29uZmlnKGNvbmZpZykge1xuICAgIHJldHVybiBjb25maWcuYmFzZVVybCAhPT0gdW5kZWZpbmVkO1xufVxudmFyIGhhc1NldHRpbmcgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIGFsbFNldHRpbmdzKCkuaGFzT3duUHJvcGVydHkoa2V5KTtcbn07XG5leHBvcnRzLmhhc1NldHRpbmcgPSBoYXNTZXR0aW5nO1xudmFyIGJhc2VVcmwgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFsbFNldHRpbmdzKCkuYmFzZVVybDtcbn07XG5leHBvcnRzLmJhc2VVcmwgPSBiYXNlVXJsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29uZmlnLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGF4aW9zXzEgPSByZXF1aXJlKFwiYXhpb3NcIik7XG52YXIgY29uZmlnXzEgPSByZXF1aXJlKFwiLi4vY29uZmlnL2NvbmZpZ1wiKTtcbmZ1bmN0aW9uIGhhbmRsZShyZXF1ZXN0KSB7XG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgdXJsOiByZXF1ZXN0LnVybCxcbiAgICAgICAgbWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcbiAgICAgICAgYmFzZVVSTDogKDAsIGNvbmZpZ18xLmJhc2VVcmwpKCksXG4gICAgfTtcbiAgICB2YXIgZGF0YSA9IHJlcXVlc3QuZGF0YTtcbiAgICBpZiAoT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25maWcuZGF0YSA9IGRhdGE7XG4gICAgfVxuICAgIHJldHVybiBheGlvc18xLmRlZmF1bHQucmVxdWVzdChjb25maWcpO1xufVxuZXhwb3J0cy5kZWZhdWx0ID0gaGFuZGxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q2xpZW50RmFjdG9yeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBMaXN0ZW5lciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTGlzdGVuZXIobGlzdGVuZXJJZCwgc3RvcExpc3RlbmluZykge1xuICAgICAgICB0aGlzLl9saXN0ZW5lcklkID0gbGlzdGVuZXJJZDtcbiAgICAgICAgdGhpcy5fc3RvcExpc3RlbmluZyA9IHN0b3BMaXN0ZW5pbmc7XG4gICAgfVxuICAgIExpc3RlbmVyLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9zdG9wTGlzdGVuaW5nKHRoaXMuX2xpc3RlbmVySWQpO1xuICAgIH07XG4gICAgcmV0dXJuIExpc3RlbmVyO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IExpc3RlbmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGlzdGVuZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQ2xpZW50RmFjdG9yeV8xID0gcmVxdWlyZShcIi4uL2NsaWVudC9DbGllbnRGYWN0b3J5XCIpO1xudmFyIExpc3RlbmVyXzEgPSByZXF1aXJlKFwiLi4vbGlzdGVuZXIvTGlzdGVuZXJcIik7XG52YXIgUG9sbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUG9sbCgpIHtcbiAgICAgICAgdGhpcy5faWRzID0gW107XG4gICAgICAgIHRoaXMubG9hZGluZyA9IFtdO1xuICAgIH1cbiAgICBQb2xsLnByb3RvdHlwZS5oYW5kbGUgPSBmdW5jdGlvbiAocmVxdWVzdCwgaGFuZGxlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgbGlzdGVuZXJJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmhhbmRsZVJ1bihyZXF1ZXN0LCBoYW5kbGVyKTtcbiAgICAgICAgfSwgMjAwMCkudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5faWRzLnB1c2gobGlzdGVuZXJJZCk7XG4gICAgICAgIHRoaXMuaGFuZGxlUnVuKHJlcXVlc3QsIGhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gbmV3IExpc3RlbmVyXzEuZGVmYXVsdChsaXN0ZW5lcklkLCBmdW5jdGlvbiAobGlzdGVuZXJJZCkge1xuICAgICAgICAgICAgX3RoaXMuc3RvcEhhbmRsaW5nKGxpc3RlbmVySWQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFBvbGwucHJvdG90eXBlLnN0b3BIYW5kbGluZyA9IGZ1bmN0aW9uIChoYW5kbGVJZCkge1xuICAgICAgICBjbGVhckludGVydmFsKGhhbmRsZUlkKTtcbiAgICB9O1xuICAgIFBvbGwucHJvdG90eXBlLmhhbmRsZVJ1biA9IGZ1bmN0aW9uIChyZXF1ZXN0LCBoYW5kbGVyKSB7XG4gICAgICAgIHZhciBpc0ZpcnN0TG9hZCA9ICF0aGlzLmxvYWRpbmcuaW5jbHVkZXMoaGFuZGxlci5pZCk7XG4gICAgICAgIGlmIChpc0ZpcnN0TG9hZCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkaW5nLnB1c2goaGFuZGxlci5pZCk7XG4gICAgICAgICAgICBoYW5kbGVyLnRyaWdnZXJTdGFydGluZ0luaXRpYWxMb2FkKCk7XG4gICAgICAgIH1cbiAgICAgICAgaGFuZGxlci50cmlnZ2VyU3RhcnRpbmdVcGRhdGUoKTtcbiAgICAgICAgKDAsIENsaWVudEZhY3RvcnlfMS5kZWZhdWx0KShyZXF1ZXN0KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBoYW5kbGVyLnRyaWdnZXJVcGRhdGVkKHJlc3BvbnNlLmRhdGEpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgaGFuZGxlci50cmlnZ2VyRXJyb3JlZChlcnJvcik7XG4gICAgICAgIH0pLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaGFuZGxlci50cmlnZ2VyRmluaXNoaW5nVXBkYXRlKCk7XG4gICAgICAgICAgICBpZiAoaXNGaXJzdExvYWQpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLnRyaWdnZXJGaW5pc2hpbmdJbml0aWFsTG9hZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBQb2xsO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFBvbGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wb2xsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yZXNvbHZlSGFuZGxlciA9IHZvaWQgMDtcbnZhciBwb2xsXzEgPSByZXF1aXJlKFwiLi4vbGlzdGVuZXIvcG9sbFwiKTtcbmZ1bmN0aW9uIHJlc29sdmVIYW5kbGVyKHJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IHBvbGxfMS5kZWZhdWx0KCk7XG59XG5leHBvcnRzLnJlc29sdmVIYW5kbGVyID0gcmVzb2x2ZUhhbmRsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1IYW5kbGVyTWFuYWdlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHJuZztcbi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxubGV0IGdldFJhbmRvbVZhbHVlcztcbmNvbnN0IHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpO1xuXG5mdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi5cbiAgICBnZXRSYW5kb21WYWx1ZXMgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMuYmluZChjcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfZGVmYXVsdCA9IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG52YXIgX3JlZ2V4ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9yZWdleC5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBfcmVnZXguZGVmYXVsdC50ZXN0KHV1aWQpO1xufVxuXG52YXIgX2RlZmF1bHQgPSB2YWxpZGF0ZTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuZXhwb3J0cy51bnNhZmVTdHJpbmdpZnkgPSB1bnNhZmVTdHJpbmdpZnk7XG5cbnZhciBfdmFsaWRhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5jb25zdCBieXRlVG9IZXggPSBbXTtcblxuZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc2xpY2UoMSkpO1xufVxuXG5mdW5jdGlvbiB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICByZXR1cm4gKGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgM11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDVdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA3XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDhdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxM11dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAxNV1dKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyLCBvZmZzZXQgPSAwKSB7XG4gIGNvbnN0IHV1aWQgPSB1bnNhZmVTdHJpbmdpZnkoYXJyLCBvZmZzZXQpOyAvLyBDb25zaXN0ZW5jeSBjaGVjayBmb3IgdmFsaWQgVVVJRC4gIElmIHRoaXMgdGhyb3dzLCBpdCdzIGxpa2VseSBkdWUgdG8gb25lXG4gIC8vIG9mIHRoZSBmb2xsb3dpbmc6XG4gIC8vIC0gT25lIG9yIG1vcmUgaW5wdXQgYXJyYXkgdmFsdWVzIGRvbid0IG1hcCB0byBhIGhleCBvY3RldCAobGVhZGluZyB0b1xuICAvLyBcInVuZGVmaW5lZFwiIGluIHRoZSB1dWlkKVxuICAvLyAtIEludmFsaWQgaW5wdXQgdmFsdWVzIGZvciB0aGUgUkZDIGB2ZXJzaW9uYCBvciBgdmFyaWFudGAgZmllbGRzXG5cbiAgaWYgKCEoMCwgX3ZhbGlkYXRlLmRlZmF1bHQpKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG52YXIgX2RlZmF1bHQgPSBzdHJpbmdpZnk7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9ybmcgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3JuZy5qc1wiKSk7XG5cbnZhciBfc3RyaW5naWZ5ID0gcmVxdWlyZShcIi4vc3RyaW5naWZ5LmpzXCIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5sZXQgX25vZGVJZDtcblxubGV0IF9jbG9ja3NlcTsgLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG5cblxubGV0IF9sYXN0TVNlY3MgPSAwO1xubGV0IF9sYXN0TlNlY3MgPSAwOyAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkIGZvciBBUEkgZGV0YWlsc1xuXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBsZXQgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgY29uc3QgYiA9IGJ1ZiB8fCBuZXcgQXJyYXkoMTYpO1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGV0IG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgbGV0IGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTsgLy8gbm9kZSBhbmQgY2xvY2tzZXEgbmVlZCB0byBiZSBpbml0aWFsaXplZCB0byByYW5kb20gdmFsdWVzIGlmIHRoZXkncmUgbm90XG4gIC8vIHNwZWNpZmllZC4gIFdlIGRvIHRoaXMgbGF6aWx5IHRvIG1pbmltaXplIGlzc3VlcyByZWxhdGVkIHRvIGluc3VmZmljaWVudFxuICAvLyBzeXN0ZW0gZW50cm9weS4gIFNlZSAjMTg5XG5cbiAgaWYgKG5vZGUgPT0gbnVsbCB8fCBjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgY29uc3Qgc2VlZEJ5dGVzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IF9ybmcuZGVmYXVsdCkoKTtcblxuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIC8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxuICAgICAgbm9kZSA9IF9ub2RlSWQgPSBbc2VlZEJ5dGVzWzBdIHwgMHgwMSwgc2VlZEJ5dGVzWzFdLCBzZWVkQnl0ZXNbMl0sIHNlZWRCeXRlc1szXSwgc2VlZEJ5dGVzWzRdLCBzZWVkQnl0ZXNbNV1dO1xuICAgIH1cblxuICAgIGlmIChjbG9ja3NlcSA9PSBudWxsKSB7XG4gICAgICAvLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxuICAgICAgY2xvY2tzZXEgPSBfY2xvY2tzZXEgPSAoc2VlZEJ5dGVzWzZdIDw8IDggfCBzZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuICAgIH1cbiAgfSAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cblxuXG4gIGxldCBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBEYXRlLm5vdygpOyAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG5cbiAgbGV0IG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxOyAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG5cbiAgY29uc3QgZHQgPSBtc2VjcyAtIF9sYXN0TVNlY3MgKyAobnNlY3MgLSBfbGFzdE5TZWNzKSAvIDEwMDAwOyAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG5cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfSAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG5cblxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfSAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG5cblxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1dWlkLnYxKCk6IENhbid0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlY1wiKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTsgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG5cbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7IC8vIGB0aW1lX2xvd2BcblxuICBjb25zdCB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7IC8vIGB0aW1lX21pZGBcblxuICBjb25zdCB0bWggPSBtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDAgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7IC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG5cbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmOyAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcblxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7IC8vIGBjbG9ja19zZXFfbG93YFxuXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjsgLy8gYG5vZGVgXG5cbiAgZm9yIChsZXQgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmIHx8ICgwLCBfc3RyaW5naWZ5LnVuc2FmZVN0cmluZ2lmeSkoYik7XG59XG5cbnZhciBfZGVmYXVsdCA9IHYxO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfdmFsaWRhdGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZhbGlkYXRlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gcGFyc2UodXVpZCkge1xuICBpZiAoISgwLCBfdmFsaWRhdGUuZGVmYXVsdCkodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ0ludmFsaWQgVVVJRCcpO1xuICB9XG5cbiAgbGV0IHY7XG4gIGNvbnN0IGFyciA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gUGFyc2UgIyMjIyMjIyMtLi4uLi0uLi4uLS4uLi4tLi4uLi4uLi4uLi4uXG5cbiAgYXJyWzBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDAsIDgpLCAxNikpID4+PiAyNDtcbiAgYXJyWzFdID0gdiA+Pj4gMTYgJiAweGZmO1xuICBhcnJbMl0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzNdID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLSMjIyMtLi4uLi0uLi4uLS4uLi4uLi4uLi4uLlxuXG4gIGFycls0XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSg5LCAxMyksIDE2KSkgPj4+IDg7XG4gIGFycls1XSA9IHYgJiAweGZmOyAvLyBQYXJzZSAuLi4uLi4uLi0uLi4uLSMjIyMtLi4uLi0uLi4uLi4uLi4uLi5cblxuICBhcnJbNl0gPSAodiA9IHBhcnNlSW50KHV1aWQuc2xpY2UoMTQsIDE4KSwgMTYpKSA+Pj4gODtcbiAgYXJyWzddID0gdiAmIDB4ZmY7IC8vIFBhcnNlIC4uLi4uLi4uLS4uLi4tLi4uLi0jIyMjLS4uLi4uLi4uLi4uLlxuXG4gIGFycls4XSA9ICh2ID0gcGFyc2VJbnQodXVpZC5zbGljZSgxOSwgMjMpLCAxNikpID4+PiA4O1xuICBhcnJbOV0gPSB2ICYgMHhmZjsgLy8gUGFyc2UgLi4uLi4uLi4tLi4uLi0uLi4uLS4uLi4tIyMjIyMjIyMjIyMjXG4gIC8vIChVc2UgXCIvXCIgdG8gYXZvaWQgMzItYml0IHRydW5jYXRpb24gd2hlbiBiaXQtc2hpZnRpbmcgaGlnaC1vcmRlciBieXRlcylcblxuICBhcnJbMTBdID0gKHYgPSBwYXJzZUludCh1dWlkLnNsaWNlKDI0LCAzNiksIDE2KSkgLyAweDEwMDAwMDAwMDAwICYgMHhmZjtcbiAgYXJyWzExXSA9IHYgLyAweDEwMDAwMDAwMCAmIDB4ZmY7XG4gIGFyclsxMl0gPSB2ID4+PiAyNCAmIDB4ZmY7XG4gIGFyclsxM10gPSB2ID4+PiAxNiAmIDB4ZmY7XG4gIGFyclsxNF0gPSB2ID4+PiA4ICYgMHhmZjtcbiAgYXJyWzE1XSA9IHYgJiAweGZmO1xuICByZXR1cm4gYXJyO1xufVxuXG52YXIgX2RlZmF1bHQgPSBwYXJzZTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5VUkwgPSBleHBvcnRzLkROUyA9IHZvaWQgMDtcbmV4cG9ydHMuZGVmYXVsdCA9IHYzNTtcblxudmFyIF9zdHJpbmdpZnkgPSByZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIik7XG5cbnZhciBfcGFyc2UgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3BhcnNlLmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gc3RyaW5nVG9CeXRlcyhzdHIpIHtcbiAgc3RyID0gdW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KHN0cikpOyAvLyBVVEY4IGVzY2FwZVxuXG4gIGNvbnN0IGJ5dGVzID0gW107XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBieXRlcy5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKTtcbiAgfVxuXG4gIHJldHVybiBieXRlcztcbn1cblxuY29uc3QgRE5TID0gJzZiYTdiODEwLTlkYWQtMTFkMS04MGI0LTAwYzA0ZmQ0MzBjOCc7XG5leHBvcnRzLkROUyA9IEROUztcbmNvbnN0IFVSTCA9ICc2YmE3YjgxMS05ZGFkLTExZDEtODBiNC0wMGMwNGZkNDMwYzgnO1xuZXhwb3J0cy5VUkwgPSBVUkw7XG5cbmZ1bmN0aW9uIHYzNShuYW1lLCB2ZXJzaW9uLCBoYXNoZnVuYykge1xuICBmdW5jdGlvbiBnZW5lcmF0ZVVVSUQodmFsdWUsIG5hbWVzcGFjZSwgYnVmLCBvZmZzZXQpIHtcbiAgICB2YXIgX25hbWVzcGFjZTtcblxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IHN0cmluZ1RvQnl0ZXModmFsdWUpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlID09PSAnc3RyaW5nJykge1xuICAgICAgbmFtZXNwYWNlID0gKDAsIF9wYXJzZS5kZWZhdWx0KShuYW1lc3BhY2UpO1xuICAgIH1cblxuICAgIGlmICgoKF9uYW1lc3BhY2UgPSBuYW1lc3BhY2UpID09PSBudWxsIHx8IF9uYW1lc3BhY2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9uYW1lc3BhY2UubGVuZ3RoKSAhPT0gMTYpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcignTmFtZXNwYWNlIG11c3QgYmUgYXJyYXktbGlrZSAoMTYgaXRlcmFibGUgaW50ZWdlciB2YWx1ZXMsIDAtMjU1KScpO1xuICAgIH0gLy8gQ29tcHV0ZSBoYXNoIG9mIG5hbWVzcGFjZSBhbmQgdmFsdWUsIFBlciA0LjNcbiAgICAvLyBGdXR1cmU6IFVzZSBzcHJlYWQgc3ludGF4IHdoZW4gc3VwcG9ydGVkIG9uIGFsbCBwbGF0Zm9ybXMsIGUuZy4gYGJ5dGVzID1cbiAgICAvLyBoYXNoZnVuYyhbLi4ubmFtZXNwYWNlLCAuLi4gdmFsdWVdKWBcblxuXG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoMTYgKyB2YWx1ZS5sZW5ndGgpO1xuICAgIGJ5dGVzLnNldChuYW1lc3BhY2UpO1xuICAgIGJ5dGVzLnNldCh2YWx1ZSwgbmFtZXNwYWNlLmxlbmd0aCk7XG4gICAgYnl0ZXMgPSBoYXNoZnVuYyhieXRlcyk7XG4gICAgYnl0ZXNbNl0gPSBieXRlc1s2XSAmIDB4MGYgfCB2ZXJzaW9uO1xuICAgIGJ5dGVzWzhdID0gYnl0ZXNbOF0gJiAweDNmIHwgMHg4MDtcblxuICAgIGlmIChidWYpIHtcbiAgICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgICAgYnVmW29mZnNldCArIGldID0gYnl0ZXNbaV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgcmV0dXJuICgwLCBfc3RyaW5naWZ5LnVuc2FmZVN0cmluZ2lmeSkoYnl0ZXMpO1xuICB9IC8vIEZ1bmN0aW9uI25hbWUgaXMgbm90IHNldHRhYmxlIG9uIHNvbWUgcGxhdGZvcm1zICgjMjcwKVxuXG5cbiAgdHJ5IHtcbiAgICBnZW5lcmF0ZVVVSUQubmFtZSA9IG5hbWU7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lbXB0eVxuICB9IGNhdGNoIChlcnIpIHt9IC8vIEZvciBDb21tb25KUyBkZWZhdWx0IGV4cG9ydCBzdXBwb3J0XG5cblxuICBnZW5lcmF0ZVVVSUQuRE5TID0gRE5TO1xuICBnZW5lcmF0ZVVVSUQuVVJMID0gVVJMO1xuICByZXR1cm4gZ2VuZXJhdGVVVUlEO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG4vKlxuICogQnJvd3Nlci1jb21wYXRpYmxlIEphdmFTY3JpcHQgTUQ1XG4gKlxuICogTW9kaWZpY2F0aW9uIG9mIEphdmFTY3JpcHQgTUQ1XG4gKiBodHRwczovL2dpdGh1Yi5jb20vYmx1ZWltcC9KYXZhU2NyaXB0LU1ENVxuICpcbiAqIENvcHlyaWdodCAyMDExLCBTZWJhc3RpYW4gVHNjaGFuXG4gKiBodHRwczovL2JsdWVpbXAubmV0XG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqXG4gKiBCYXNlZCBvblxuICogQSBKYXZhU2NyaXB0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBSU0EgRGF0YSBTZWN1cml0eSwgSW5jLiBNRDUgTWVzc2FnZVxuICogRGlnZXN0IEFsZ29yaXRobSwgYXMgZGVmaW5lZCBpbiBSRkMgMTMyMS5cbiAqIFZlcnNpb24gMi4yIENvcHlyaWdodCAoQykgUGF1bCBKb2huc3RvbiAxOTk5IC0gMjAwOVxuICogT3RoZXIgY29udHJpYnV0b3JzOiBHcmVnIEhvbHQsIEFuZHJldyBLZXBlcnQsIFlkbmFyLCBMb3N0aW5ldFxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBMaWNlbnNlXG4gKiBTZWUgaHR0cDovL3BhamhvbWUub3JnLnVrL2NyeXB0L21kNSBmb3IgbW9yZSBpbmZvLlxuICovXG5mdW5jdGlvbiBtZDUoYnl0ZXMpIHtcbiAgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBtc2cgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYnl0ZXMpKTsgLy8gVVRGOCBlc2NhcGVcblxuICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobXNnLmxlbmd0aCk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXNbaV0gPSBtc2cuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWQ1VG9IZXhFbmNvZGVkQXJyYXkod29yZHNUb01kNShieXRlc1RvV29yZHMoYnl0ZXMpLCBieXRlcy5sZW5ndGggKiA4KSk7XG59XG4vKlxuICogQ29udmVydCBhbiBhcnJheSBvZiBsaXR0bGUtZW5kaWFuIHdvcmRzIHRvIGFuIGFycmF5IG9mIGJ5dGVzXG4gKi9cblxuXG5mdW5jdGlvbiBtZDVUb0hleEVuY29kZWRBcnJheShpbnB1dCkge1xuICBjb25zdCBvdXRwdXQgPSBbXTtcbiAgY29uc3QgbGVuZ3RoMzIgPSBpbnB1dC5sZW5ndGggKiAzMjtcbiAgY29uc3QgaGV4VGFiID0gJzAxMjM0NTY3ODlhYmNkZWYnO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoMzI7IGkgKz0gOCkge1xuICAgIGNvbnN0IHggPSBpbnB1dFtpID4+IDVdID4+PiBpICUgMzIgJiAweGZmO1xuICAgIGNvbnN0IGhleCA9IHBhcnNlSW50KGhleFRhYi5jaGFyQXQoeCA+Pj4gNCAmIDB4MGYpICsgaGV4VGFiLmNoYXJBdCh4ICYgMHgwZiksIDE2KTtcbiAgICBvdXRwdXQucHVzaChoZXgpO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dDtcbn1cbi8qKlxuICogQ2FsY3VsYXRlIG91dHB1dCBsZW5ndGggd2l0aCBwYWRkaW5nIGFuZCBiaXQgbGVuZ3RoXG4gKi9cblxuXG5mdW5jdGlvbiBnZXRPdXRwdXRMZW5ndGgoaW5wdXRMZW5ndGg4KSB7XG4gIHJldHVybiAoaW5wdXRMZW5ndGg4ICsgNjQgPj4+IDkgPDwgNCkgKyAxNCArIDE7XG59XG4vKlxuICogQ2FsY3VsYXRlIHRoZSBNRDUgb2YgYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3JkcywgYW5kIGEgYml0IGxlbmd0aC5cbiAqL1xuXG5cbmZ1bmN0aW9uIHdvcmRzVG9NZDUoeCwgbGVuKSB7XG4gIC8qIGFwcGVuZCBwYWRkaW5nICovXG4gIHhbbGVuID4+IDVdIHw9IDB4ODAgPDwgbGVuICUgMzI7XG4gIHhbZ2V0T3V0cHV0TGVuZ3RoKGxlbikgLSAxXSA9IGxlbjtcbiAgbGV0IGEgPSAxNzMyNTg0MTkzO1xuICBsZXQgYiA9IC0yNzE3MzM4Nzk7XG4gIGxldCBjID0gLTE3MzI1ODQxOTQ7XG4gIGxldCBkID0gMjcxNzMzODc4O1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICBjb25zdCBvbGRhID0gYTtcbiAgICBjb25zdCBvbGRiID0gYjtcbiAgICBjb25zdCBvbGRjID0gYztcbiAgICBjb25zdCBvbGRkID0gZDtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpXSwgNywgLTY4MDg3NjkzNik7XG4gICAgZCA9IG1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDFdLCAxMiwgLTM4OTU2NDU4Nik7XG4gICAgYyA9IG1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNywgNjA2MTA1ODE5KTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgM10sIDIyLCAtMTA0NDUyNTMzMCk7XG4gICAgYSA9IG1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA3LCAtMTc2NDE4ODk3KTtcbiAgICBkID0gbWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgNV0sIDEyLCAxMjAwMDgwNDI2KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDddLCAyMiwgLTQ1NzA1OTgzKTtcbiAgICBhID0gbWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgOF0sIDcsIDE3NzAwMzU0MTYpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcbiAgICBjID0gbWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNywgLTQyMDYzKTtcbiAgICBiID0gbWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xuICAgIGEgPSBtZDVmZihhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDcsIDE4MDQ2MDM2ODIpO1xuICAgIGQgPSBtZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpO1xuICAgIGMgPSBtZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XG4gICAgYiA9IG1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsIDEyMzY1MzUzMjkpO1xuICAgIGEgPSBtZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNSwgLTE2NTc5NjUxMCk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDZdLCA5LCAtMTA2OTUwMTYzMik7XG4gICAgYyA9IG1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTQsIDY0MzcxNzcxMyk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaV0sIDIwLCAtMzczODk3MzAyKTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgNV0sIDUsIC03MDE1NTg2OTEpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxMF0sIDksIDM4MDE2MDgzKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNCwgLTY2MDQ3ODMzNSk7XG4gICAgYiA9IG1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDRdLCAyMCwgLTQwNTUzNzg0OCk7XG4gICAgYSA9IG1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDldLCA1LCA1Njg0NDY0MzgpO1xuICAgIGQgPSBtZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAxNF0sIDksIC0xMDE5ODAzNjkwKTtcbiAgICBjID0gbWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgM10sIDE0LCAtMTg3MzYzOTYxKTtcbiAgICBiID0gbWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgOF0sIDIwLCAxMTYzNTMxNTAxKTtcbiAgICBhID0gbWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMTNdLCA1LCAtMTQ0NDY4MTQ2Nyk7XG4gICAgZCA9IG1kNWdnKGQsIGEsIGIsIGMsIHhbaSArIDJdLCA5LCAtNTE0MDM3ODQpO1xuICAgIGMgPSBtZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTQsIDE3MzUzMjg0NzMpO1xuICAgIGIgPSBtZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyAxMl0sIDIwLCAtMTkyNjYwNzczNCk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA0LCAtMzc4NTU4KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpICsgOF0sIDExLCAtMjAyMjU3NDQ2Myk7XG4gICAgYyA9IG1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDExXSwgMTYsIDE4MzkwMzA1NjIpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxNF0sIDIzLCAtMzUzMDk1NTYpO1xuICAgIGEgPSBtZDVoaChhLCBiLCBjLCBkLCB4W2kgKyAxXSwgNCwgLTE1MzA5OTIwNjApO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA0XSwgMTEsIDEyNzI4OTMzNTMpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyA3XSwgMTYsIC0xNTU0OTc2MzIpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAxMF0sIDIzLCAtMTA5NDczMDY0MCk7XG4gICAgYSA9IG1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNCwgNjgxMjc5MTc0KTtcbiAgICBkID0gbWQ1aGgoZCwgYSwgYiwgYywgeFtpXSwgMTEsIC0zNTg1MzcyMjIpO1xuICAgIGMgPSBtZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAzXSwgMTYsIC03MjI1MjE5NzkpO1xuICAgIGIgPSBtZDVoaChiLCBjLCBkLCBhLCB4W2kgKyA2XSwgMjMsIDc2MDI5MTg5KTtcbiAgICBhID0gbWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgOV0sIDQsIC02NDAzNjQ0ODcpO1xuICAgIGQgPSBtZDVoaChkLCBhLCBiLCBjLCB4W2kgKyAxMl0sIDExLCAtNDIxODE1ODM1KTtcbiAgICBjID0gbWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTVdLCAxNiwgNTMwNzQyNTIwKTtcbiAgICBiID0gbWQ1aGgoYiwgYywgZCwgYSwgeFtpICsgMl0sIDIzLCAtOTk1MzM4NjUxKTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpXSwgNiwgLTE5ODYzMDg0NCk7XG4gICAgZCA9IG1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDddLCAxMCwgMTEyNjg5MTQxNSk7XG4gICAgYyA9IG1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgNV0sIDIxLCAtNTc0MzQwNTUpO1xuICAgIGEgPSBtZDVpaShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDYsIDE3MDA0ODU1NzEpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcbiAgICBjID0gbWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpO1xuICAgIGIgPSBtZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcbiAgICBhID0gbWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgOF0sIDYsIDE4NzMzMTMzNTkpO1xuICAgIGQgPSBtZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxNV0sIDEwLCAtMzA2MTE3NDQpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcbiAgICBiID0gbWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgMTMwOTE1MTY0OSk7XG4gICAgYSA9IG1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA2LCAtMTQ1NTIzMDcwKTtcbiAgICBkID0gbWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xuICAgIGMgPSBtZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTUsIDcxODc4NzI1OSk7XG4gICAgYiA9IG1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDldLCAyMSwgLTM0MzQ4NTU1MSk7XG4gICAgYSA9IHNhZmVBZGQoYSwgb2xkYSk7XG4gICAgYiA9IHNhZmVBZGQoYiwgb2xkYik7XG4gICAgYyA9IHNhZmVBZGQoYywgb2xkYyk7XG4gICAgZCA9IHNhZmVBZGQoZCwgb2xkZCk7XG4gIH1cblxuICByZXR1cm4gW2EsIGIsIGMsIGRdO1xufVxuLypcbiAqIENvbnZlcnQgYW4gYXJyYXkgYnl0ZXMgdG8gYW4gYXJyYXkgb2YgbGl0dGxlLWVuZGlhbiB3b3Jkc1xuICogQ2hhcmFjdGVycyA+MjU1IGhhdmUgdGhlaXIgaGlnaC1ieXRlIHNpbGVudGx5IGlnbm9yZWQuXG4gKi9cblxuXG5mdW5jdGlvbiBieXRlc1RvV29yZHMoaW5wdXQpIHtcbiAgaWYgKGlucHV0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IGxlbmd0aDggPSBpbnB1dC5sZW5ndGggKiA4O1xuICBjb25zdCBvdXRwdXQgPSBuZXcgVWludDMyQXJyYXkoZ2V0T3V0cHV0TGVuZ3RoKGxlbmd0aDgpKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDg7IGkgKz0gOCkge1xuICAgIG91dHB1dFtpID4+IDVdIHw9IChpbnB1dFtpIC8gOF0gJiAweGZmKSA8PCBpICUgMzI7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuLypcbiAqIEFkZCBpbnRlZ2Vycywgd3JhcHBpbmcgYXQgMl4zMi4gVGhpcyB1c2VzIDE2LWJpdCBvcGVyYXRpb25zIGludGVybmFsbHlcbiAqIHRvIHdvcmsgYXJvdW5kIGJ1Z3MgaW4gc29tZSBKUyBpbnRlcnByZXRlcnMuXG4gKi9cblxuXG5mdW5jdGlvbiBzYWZlQWRkKHgsIHkpIHtcbiAgY29uc3QgbHN3ID0gKHggJiAweGZmZmYpICsgKHkgJiAweGZmZmYpO1xuICBjb25zdCBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcbiAgcmV0dXJuIG1zdyA8PCAxNiB8IGxzdyAmIDB4ZmZmZjtcbn1cbi8qXG4gKiBCaXR3aXNlIHJvdGF0ZSBhIDMyLWJpdCBudW1iZXIgdG8gdGhlIGxlZnQuXG4gKi9cblxuXG5mdW5jdGlvbiBiaXRSb3RhdGVMZWZ0KG51bSwgY250KSB7XG4gIHJldHVybiBudW0gPDwgY250IHwgbnVtID4+PiAzMiAtIGNudDtcbn1cbi8qXG4gKiBUaGVzZSBmdW5jdGlvbnMgaW1wbGVtZW50IHRoZSBmb3VyIGJhc2ljIG9wZXJhdGlvbnMgdGhlIGFsZ29yaXRobSB1c2VzLlxuICovXG5cblxuZnVuY3Rpb24gbWQ1Y21uKHEsIGEsIGIsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIHNhZmVBZGQoYml0Um90YXRlTGVmdChzYWZlQWRkKHNhZmVBZGQoYSwgcSksIHNhZmVBZGQoeCwgdCkpLCBzKSwgYik7XG59XG5cbmZ1bmN0aW9uIG1kNWZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgYyB8IH5iICYgZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWdnKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiICYgZCB8IGMgJiB+ZCwgYSwgYiwgeCwgcywgdCk7XG59XG5cbmZ1bmN0aW9uIG1kNWhoKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcbiAgcmV0dXJuIG1kNWNtbihiIF4gYyBeIGQsIGEsIGIsIHgsIHMsIHQpO1xufVxuXG5mdW5jdGlvbiBtZDVpaShhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XG4gIHJldHVybiBtZDVjbW4oYyBeIChiIHwgfmQpLCBhLCBiLCB4LCBzLCB0KTtcbn1cblxudmFyIF9kZWZhdWx0ID0gbWQ1O1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG5cbnZhciBfdiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjM1LmpzXCIpKTtcblxudmFyIF9tZCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vbWQ1LmpzXCIpKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuY29uc3QgdjMgPSAoMCwgX3YuZGVmYXVsdCkoJ3YzJywgMHgzMCwgX21kLmRlZmF1bHQpO1xudmFyIF9kZWZhdWx0ID0gdjM7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbmNvbnN0IHJhbmRvbVVVSUQgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiBjcnlwdG8ucmFuZG9tVVVJRCAmJiBjcnlwdG8ucmFuZG9tVVVJRC5iaW5kKGNyeXB0byk7XG52YXIgX2RlZmF1bHQgPSB7XG4gIHJhbmRvbVVVSURcbn07XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF9uYXRpdmUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL25hdGl2ZS5qc1wiKSk7XG5cbnZhciBfcm5nID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9ybmcuanNcIikpO1xuXG52YXIgX3N0cmluZ2lmeSA9IHJlcXVpcmUoXCIuL3N0cmluZ2lmeS5qc1wiKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgaWYgKF9uYXRpdmUuZGVmYXVsdC5yYW5kb21VVUlEICYmICFidWYgJiYgIW9wdGlvbnMpIHtcbiAgICByZXR1cm4gX25hdGl2ZS5kZWZhdWx0LnJhbmRvbVVVSUQoKTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGNvbnN0IHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgX3JuZy5kZWZhdWx0KSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cblxuICBybmRzWzZdID0gcm5kc1s2XSAmIDB4MGYgfCAweDQwO1xuICBybmRzWzhdID0gcm5kc1s4XSAmIDB4M2YgfCAweDgwOyAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcblxuICBpZiAoYnVmKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyArK2kpIHtcbiAgICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHJuZHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1ZjtcbiAgfVxuXG4gIHJldHVybiAoMCwgX3N0cmluZ2lmeS51bnNhZmVTdHJpbmdpZnkpKHJuZHMpO1xufVxuXG52YXIgX2RlZmF1bHQgPSB2NDtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xuXG4vLyBBZGFwdGVkIGZyb20gQ2hyaXMgVmVuZXNzJyBTSEExIGNvZGUgYXRcbi8vIGh0dHA6Ly93d3cubW92YWJsZS10eXBlLmNvLnVrL3NjcmlwdHMvc2hhMS5odG1sXG5mdW5jdGlvbiBmKHMsIHgsIHksIHopIHtcbiAgc3dpdGNoIChzKSB7XG4gICAgY2FzZSAwOlxuICAgICAgcmV0dXJuIHggJiB5IF4gfnggJiB6O1xuXG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIHggXiB5IF4gejtcblxuICAgIGNhc2UgMjpcbiAgICAgIHJldHVybiB4ICYgeSBeIHggJiB6IF4geSAmIHo7XG5cbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4geCBeIHkgXiB6O1xuICB9XG59XG5cbmZ1bmN0aW9uIFJPVEwoeCwgbikge1xuICByZXR1cm4geCA8PCBuIHwgeCA+Pj4gMzIgLSBuO1xufVxuXG5mdW5jdGlvbiBzaGExKGJ5dGVzKSB7XG4gIGNvbnN0IEsgPSBbMHg1YTgyNzk5OSwgMHg2ZWQ5ZWJhMSwgMHg4ZjFiYmNkYywgMHhjYTYyYzFkNl07XG4gIGNvbnN0IEggPSBbMHg2NzQ1MjMwMSwgMHhlZmNkYWI4OSwgMHg5OGJhZGNmZSwgMHgxMDMyNTQ3NiwgMHhjM2QyZTFmMF07XG5cbiAgaWYgKHR5cGVvZiBieXRlcyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBtc2cgPSB1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYnl0ZXMpKTsgLy8gVVRGOCBlc2NhcGVcblxuICAgIGJ5dGVzID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1zZy5sZW5ndGg7ICsraSkge1xuICAgICAgYnl0ZXMucHVzaChtc2cuY2hhckNvZGVBdChpKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGJ5dGVzKSkge1xuICAgIC8vIENvbnZlcnQgQXJyYXktbGlrZSB0byBBcnJheVxuICAgIGJ5dGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnl0ZXMpO1xuICB9XG5cbiAgYnl0ZXMucHVzaCgweDgwKTtcbiAgY29uc3QgbCA9IGJ5dGVzLmxlbmd0aCAvIDQgKyAyO1xuICBjb25zdCBOID0gTWF0aC5jZWlsKGwgLyAxNik7XG4gIGNvbnN0IE0gPSBuZXcgQXJyYXkoTik7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBOOyArK2kpIHtcbiAgICBjb25zdCBhcnIgPSBuZXcgVWludDMyQXJyYXkoMTYpO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICBhcnJbal0gPSBieXRlc1tpICogNjQgKyBqICogNF0gPDwgMjQgfCBieXRlc1tpICogNjQgKyBqICogNCArIDFdIDw8IDE2IHwgYnl0ZXNbaSAqIDY0ICsgaiAqIDQgKyAyXSA8PCA4IHwgYnl0ZXNbaSAqIDY0ICsgaiAqIDQgKyAzXTtcbiAgICB9XG5cbiAgICBNW2ldID0gYXJyO1xuICB9XG5cbiAgTVtOIC0gMV1bMTRdID0gKGJ5dGVzLmxlbmd0aCAtIDEpICogOCAvIE1hdGgucG93KDIsIDMyKTtcbiAgTVtOIC0gMV1bMTRdID0gTWF0aC5mbG9vcihNW04gLSAxXVsxNF0pO1xuICBNW04gLSAxXVsxNV0gPSAoYnl0ZXMubGVuZ3RoIC0gMSkgKiA4ICYgMHhmZmZmZmZmZjtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IE47ICsraSkge1xuICAgIGNvbnN0IFcgPSBuZXcgVWludDMyQXJyYXkoODApO1xuXG4gICAgZm9yIChsZXQgdCA9IDA7IHQgPCAxNjsgKyt0KSB7XG4gICAgICBXW3RdID0gTVtpXVt0XTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCB0ID0gMTY7IHQgPCA4MDsgKyt0KSB7XG4gICAgICBXW3RdID0gUk9UTChXW3QgLSAzXSBeIFdbdCAtIDhdIF4gV1t0IC0gMTRdIF4gV1t0IC0gMTZdLCAxKTtcbiAgICB9XG5cbiAgICBsZXQgYSA9IEhbMF07XG4gICAgbGV0IGIgPSBIWzFdO1xuICAgIGxldCBjID0gSFsyXTtcbiAgICBsZXQgZCA9IEhbM107XG4gICAgbGV0IGUgPSBIWzRdO1xuXG4gICAgZm9yIChsZXQgdCA9IDA7IHQgPCA4MDsgKyt0KSB7XG4gICAgICBjb25zdCBzID0gTWF0aC5mbG9vcih0IC8gMjApO1xuICAgICAgY29uc3QgVCA9IFJPVEwoYSwgNSkgKyBmKHMsIGIsIGMsIGQpICsgZSArIEtbc10gKyBXW3RdID4+PiAwO1xuICAgICAgZSA9IGQ7XG4gICAgICBkID0gYztcbiAgICAgIGMgPSBST1RMKGIsIDMwKSA+Pj4gMDtcbiAgICAgIGIgPSBhO1xuICAgICAgYSA9IFQ7XG4gICAgfVxuXG4gICAgSFswXSA9IEhbMF0gKyBhID4+PiAwO1xuICAgIEhbMV0gPSBIWzFdICsgYiA+Pj4gMDtcbiAgICBIWzJdID0gSFsyXSArIGMgPj4+IDA7XG4gICAgSFszXSA9IEhbM10gKyBkID4+PiAwO1xuICAgIEhbNF0gPSBIWzRdICsgZSA+Pj4gMDtcbiAgfVxuXG4gIHJldHVybiBbSFswXSA+PiAyNCAmIDB4ZmYsIEhbMF0gPj4gMTYgJiAweGZmLCBIWzBdID4+IDggJiAweGZmLCBIWzBdICYgMHhmZiwgSFsxXSA+PiAyNCAmIDB4ZmYsIEhbMV0gPj4gMTYgJiAweGZmLCBIWzFdID4+IDggJiAweGZmLCBIWzFdICYgMHhmZiwgSFsyXSA+PiAyNCAmIDB4ZmYsIEhbMl0gPj4gMTYgJiAweGZmLCBIWzJdID4+IDggJiAweGZmLCBIWzJdICYgMHhmZiwgSFszXSA+PiAyNCAmIDB4ZmYsIEhbM10gPj4gMTYgJiAweGZmLCBIWzNdID4+IDggJiAweGZmLCBIWzNdICYgMHhmZiwgSFs0XSA+PiAyNCAmIDB4ZmYsIEhbNF0gPj4gMTYgJiAweGZmLCBIWzRdID4+IDggJiAweGZmLCBIWzRdICYgMHhmZl07XG59XG5cbnZhciBfZGVmYXVsdCA9IHNoYTE7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF92ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92MzUuanNcIikpO1xuXG52YXIgX3NoYSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vc2hhMS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmNvbnN0IHY1ID0gKDAsIF92LmRlZmF1bHQpKCd2NScsIDB4NTAsIF9zaGEuZGVmYXVsdCk7XG52YXIgX2RlZmF1bHQgPSB2NTtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9kZWZhdWx0ID0gJzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCc7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcblxudmFyIF92YWxpZGF0ZSA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdmFsaWRhdGUuanNcIikpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiB2ZXJzaW9uKHV1aWQpIHtcbiAgaWYgKCEoMCwgX3ZhbGlkYXRlLmRlZmF1bHQpKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdJbnZhbGlkIFVVSUQnKTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZUludCh1dWlkLnNsaWNlKDE0LCAxNSksIDE2KTtcbn1cblxudmFyIF9kZWZhdWx0ID0gdmVyc2lvbjtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTklMXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF9uaWwuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwYXJzZVwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfcGFyc2UuZGVmYXVsdDtcbiAgfVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzdHJpbmdpZnlcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5kZWZhdWx0O1xuICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInYxXCIsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgcmV0dXJuIF92LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjNcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YyLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjRcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3YzLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidjVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3Y0LmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidmFsaWRhdGVcIiwge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICByZXR1cm4gX3ZhbGlkYXRlLmRlZmF1bHQ7XG4gIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidmVyc2lvblwiLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgIHJldHVybiBfdmVyc2lvbi5kZWZhdWx0O1xuICB9XG59KTtcblxudmFyIF92ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92MS5qc1wiKSk7XG5cbnZhciBfdjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3YzLmpzXCIpKTtcblxudmFyIF92MyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vdjQuanNcIikpO1xuXG52YXIgX3Y0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92NS5qc1wiKSk7XG5cbnZhciBfbmlsID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9uaWwuanNcIikpO1xuXG52YXIgX3ZlcnNpb24gPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3ZlcnNpb24uanNcIikpO1xuXG52YXIgX3ZhbGlkYXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi92YWxpZGF0ZS5qc1wiKSk7XG5cbnZhciBfc3RyaW5naWZ5ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9zdHJpbmdpZnkuanNcIikpO1xuXG52YXIgX3BhcnNlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi9wYXJzZS5qc1wiKSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgSGFuZGxlck1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuLi9saXN0ZW5lci9IYW5kbGVyTWFuYWdlclwiKTtcbnZhciB1dWlkXzEgPSByZXF1aXJlKFwidXVpZFwiKTtcbnZhciBOb3RpZmllciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTm90aWZpZXIocmVxdWVzdCkge1xuICAgICAgICB0aGlzLl9vblN0YXJ0aW5nSW5pdGlhbExvYWQgPSBbXTtcbiAgICAgICAgdGhpcy5fb25GaW5pc2hpbmdJbml0aWFsTG9hZCA9IFtdO1xuICAgICAgICB0aGlzLl9vblN0YXJ0aW5nVXBkYXRlID0gW107XG4gICAgICAgIHRoaXMuX29uRmluaXNoaW5nVXBkYXRlID0gW107XG4gICAgICAgIHRoaXMuX29uVXBkYXRlZCA9IFtdO1xuICAgICAgICB0aGlzLl9vbkVycm9yZWQgPSBbXTtcbiAgICAgICAgdGhpcy5fcmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgICAgIHRoaXMuaWQgPSAoMCwgdXVpZF8xLnY0KSgpO1xuICAgIH1cbiAgICBOb3RpZmllci5wcm90b3R5cGUub25TdGFydGluZ0luaXRpYWxMb2FkID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5fb25TdGFydGluZ0luaXRpYWxMb2FkLnB1c2goaGFuZGxlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm90aWZpZXIucHJvdG90eXBlLnRyaWdnZXJTdGFydGluZ0luaXRpYWxMb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fb25TdGFydGluZ0luaXRpYWxMb2FkOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gX2FbX2ldO1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTm90aWZpZXIucHJvdG90eXBlLm9uRmluaXNoaW5nSW5pdGlhbExvYWQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICB0aGlzLl9vbkZpbmlzaGluZ0luaXRpYWxMb2FkLnB1c2goaGFuZGxlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm90aWZpZXIucHJvdG90eXBlLnRyaWdnZXJGaW5pc2hpbmdJbml0aWFsTG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX29uRmluaXNoaW5nSW5pdGlhbExvYWQ7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2FsbGJhY2sgPSBfYVtfaV07XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBOb3RpZmllci5wcm90b3R5cGUub25TdGFydGluZ1VwZGF0ZSA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX29uU3RhcnRpbmdVcGRhdGUucHVzaChoYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb3RpZmllci5wcm90b3R5cGUudHJpZ2dlclN0YXJ0aW5nVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fb25TdGFydGluZ1VwZGF0ZTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IF9hW19pXTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vdGlmaWVyLnByb3RvdHlwZS5vbkZpbmlzaGluZ1VwZGF0ZSA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHRoaXMuX29uRmluaXNoaW5nVXBkYXRlLnB1c2goaGFuZGxlcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgTm90aWZpZXIucHJvdG90eXBlLnRyaWdnZXJGaW5pc2hpbmdVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLl9vbkZpbmlzaGluZ1VwZGF0ZTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IF9hW19pXTtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vdGlmaWVyLnByb3RvdHlwZS5vblVwZGF0ZWQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICB0aGlzLl9vblVwZGF0ZWQucHVzaChoYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb3RpZmllci5wcm90b3R5cGUudHJpZ2dlclVwZGF0ZWQgPSBmdW5jdGlvbiAobmV3UmVzdWx0cykge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5fb25VcGRhdGVkOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGNhbGxiYWNrID0gX2FbX2ldO1xuICAgICAgICAgICAgY2FsbGJhY2sobmV3UmVzdWx0cyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE5vdGlmaWVyLnByb3RvdHlwZS5vbkVycm9yZWQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICB0aGlzLl9vbkVycm9yZWQucHVzaChoYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBOb3RpZmllci5wcm90b3R5cGUudHJpZ2dlckVycm9yZWQgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuX29uRXJyb3JlZDsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBjYWxsYmFjayA9IF9hW19pXTtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTm90aWZpZXIucHJvdG90eXBlLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaGFuZGxlciA9ICgwLCBIYW5kbGVyTWFuYWdlcl8xLnJlc29sdmVIYW5kbGVyKSh0aGlzLl9yZXF1ZXN0KTtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIuaGFuZGxlKHRoaXMuX3JlcXVlc3QsIHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIE5vdGlmaWVyO1xufSgpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IE5vdGlmaWVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Tm90aWZpZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQ2xpZW50RmFjdG9yeV8xID0gcmVxdWlyZShcIi4uL2NsaWVudC9DbGllbnRGYWN0b3J5XCIpO1xudmFyIE5vdGlmaWVyXzEgPSByZXF1aXJlKFwiLi4vbGlzdGVuZXIvTm90aWZpZXJcIik7XG52YXIgUmVxdWVzdEZhY3RvcnkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlcXVlc3RGYWN0b3J5KCkge1xuICAgIH1cbiAgICBSZXF1ZXN0RmFjdG9yeS5wcm90b3R5cGUubGlzdGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IE5vdGlmaWVyXzEuZGVmYXVsdCh0aGlzLmNyZWF0ZSgpKTtcbiAgICB9O1xuICAgIFJlcXVlc3RGYWN0b3J5LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKDAsIENsaWVudEZhY3RvcnlfMS5kZWZhdWx0KSh0aGlzLmNyZWF0ZSgpKTtcbiAgICB9O1xuICAgIHJldHVybiBSZXF1ZXN0RmFjdG9yeTtcbn0oKSk7XG5leHBvcnRzLmRlZmF1bHQgPSBSZXF1ZXN0RmFjdG9yeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlcXVlc3RGYWN0b3J5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFJlcXVlc3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlcXVlc3QodXJsLCBtZXRob2QpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgICAgICB0aGlzLl91cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuX21ldGhvZCA9IG1ldGhvZDtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlcXVlc3QucHJvdG90eXBlLCBcInVybFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3VybCA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlcXVlc3QucHJvdG90eXBlLCBcIm1ldGhvZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21ldGhvZDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX21ldGhvZCA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlcXVlc3QucHJvdG90eXBlLCBcImRhdGFcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fZGF0YSA9IHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIFJlcXVlc3Q7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gUmVxdWVzdDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlcXVlc3QuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFJlcXVlc3RGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi4vLi4vaW50ZXJmYWNlcy9SZXF1ZXN0RmFjdG9yeVwiKTtcbnZhciBSZXF1ZXN0XzEgPSByZXF1aXJlKFwiLi4vLi4vY2xpZW50L1JlcXVlc3RcIik7XG52YXIgSm9iU2VhcmNoID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoSm9iU2VhcmNoLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEpvYlNlYXJjaCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBKb2JTZWFyY2gucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0XzEuZGVmYXVsdChcIi9qb2JzXCIsIFwiR0VUXCIpO1xuICAgIH07XG4gICAgcmV0dXJuIEpvYlNlYXJjaDtcbn0oUmVxdWVzdEZhY3RvcnlfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBKb2JTZWFyY2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Kb2JTZWFyY2guanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFJlcXVlc3RGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi4vLi4vaW50ZXJmYWNlcy9SZXF1ZXN0RmFjdG9yeVwiKTtcbnZhciBSZXF1ZXN0XzEgPSByZXF1aXJlKFwiLi4vLi4vY2xpZW50L1JlcXVlc3RcIik7XG52YXIgSm9iU2hvdyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEpvYlNob3csIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSm9iU2hvdyhhbGlhcykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5hbGlhcyA9IGFsaWFzO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEpvYlNob3cucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0XzEuZGVmYXVsdChcIi9qb2JzL1wiICsgdGhpcy5hbGlhcywgXCJHRVRcIik7XG4gICAgfTtcbiAgICByZXR1cm4gSm9iU2hvdztcbn0oUmVxdWVzdEZhY3RvcnlfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBKb2JTaG93O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Sm9iU2hvdy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2xhc3MgZXh0ZW5kcyB2YWx1ZSBcIiArIFN0cmluZyhiKSArIFwiIGlzIG5vdCBhIGNvbnN0cnVjdG9yIG9yIG51bGxcIik7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUmVxdWVzdEZhY3RvcnlfMSA9IHJlcXVpcmUoXCIuLi8uLi9pbnRlcmZhY2VzL1JlcXVlc3RGYWN0b3J5XCIpO1xudmFyIFJlcXVlc3RfMSA9IHJlcXVpcmUoXCIuLi8uLi9jbGllbnQvUmVxdWVzdFwiKTtcbnZhciBCYXRjaFNlYXJjaCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJhdGNoU2VhcmNoLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJhdGNoU2VhcmNoKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIEJhdGNoU2VhcmNoLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVxdWVzdF8xLmRlZmF1bHQoXCIvYmF0Y2hlc1wiLCBcIkdFVFwiKTtcbiAgICB9O1xuICAgIHJldHVybiBCYXRjaFNlYXJjaDtcbn0oUmVxdWVzdEZhY3RvcnlfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBCYXRjaFNlYXJjaDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJhdGNoU2VhcmNoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBSZXF1ZXN0RmFjdG9yeV8xID0gcmVxdWlyZShcIi4uLy4uL2ludGVyZmFjZXMvUmVxdWVzdEZhY3RvcnlcIik7XG52YXIgUmVxdWVzdF8xID0gcmVxdWlyZShcIi4uLy4uL2NsaWVudC9SZXF1ZXN0XCIpO1xudmFyIEJhdGNoU2hvdyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJhdGNoU2hvdywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCYXRjaFNob3coYmF0Y2hJZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5iYXRjaElkID0gYmF0Y2hJZDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBCYXRjaFNob3cucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0XzEuZGVmYXVsdChcIi9iYXRjaGVzL1wiICsgdGhpcy5iYXRjaElkLnRvU3RyaW5nKCksIFwiR0VUXCIpO1xuICAgIH07XG4gICAgcmV0dXJuIEJhdGNoU2hvdztcbn0oUmVxdWVzdEZhY3RvcnlfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBCYXRjaFNob3c7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1CYXRjaFNob3cuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFJlcXVlc3RGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi4vLi4vaW50ZXJmYWNlcy9SZXF1ZXN0RmFjdG9yeVwiKTtcbnZhciBSZXF1ZXN0XzEgPSByZXF1aXJlKFwiLi4vLi4vY2xpZW50L1JlcXVlc3RcIik7XG52YXIgUnVuU2VhcmNoID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUnVuU2VhcmNoLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJ1blNlYXJjaCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBSdW5TZWFyY2gucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0XzEuZGVmYXVsdChcIi9ydW5zXCIsIFwiR0VUXCIpO1xuICAgIH07XG4gICAgcmV0dXJuIFJ1blNlYXJjaDtcbn0oUmVxdWVzdEZhY3RvcnlfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBSdW5TZWFyY2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SdW5TZWFyY2guanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFJlcXVlc3RGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi4vLi4vaW50ZXJmYWNlcy9SZXF1ZXN0RmFjdG9yeVwiKTtcbnZhciBSZXF1ZXN0XzEgPSByZXF1aXJlKFwiLi4vLi4vY2xpZW50L1JlcXVlc3RcIik7XG52YXIgUnVuUmV0cnkgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSdW5SZXRyeSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSdW5SZXRyeShydW5JZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5ydW5JZCA9IHJ1bklkO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJ1blJldHJ5LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVxdWVzdF8xLmRlZmF1bHQoXCIvcnVucy9cIiArIHRoaXMucnVuSWQudG9TdHJpbmcoKSArIFwiL3JldHJ5XCIsIFwiUE9TVFwiKTtcbiAgICB9O1xuICAgIHJldHVybiBSdW5SZXRyeTtcbn0oUmVxdWVzdEZhY3RvcnlfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBSdW5SZXRyeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJ1blJldHJ5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBSZXF1ZXN0RmFjdG9yeV8xID0gcmVxdWlyZShcIi4uLy4uL2ludGVyZmFjZXMvUmVxdWVzdEZhY3RvcnlcIik7XG52YXIgUmVxdWVzdF8xID0gcmVxdWlyZShcIi4uLy4uL2NsaWVudC9SZXF1ZXN0XCIpO1xudmFyIFJ1blNpZ25hbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJ1blNpZ25hbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSdW5TaWduYWwocnVuSWQsIHNpZ25hbCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5ydW5JZCA9IHJ1bklkO1xuICAgICAgICBfdGhpcy5zaWduYWwgPSBzaWduYWw7XG4gICAgICAgIF90aGlzLl9zaG91bGRDYW5jZWxKb2IgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBSdW5TaWduYWwucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuZXcgUmVxdWVzdF8xLmRlZmF1bHQoXCIvcnVucy9cIiArIHRoaXMucnVuSWQudG9TdHJpbmcoKSArIFwiL3NpZ25hbFwiLCBcIlBPU1RcIik7XG4gICAgICAgIHJlcXVlc3QuZGF0YSA9IHtcbiAgICAgICAgICAgIHNpZ25hbDogdGhpcy5zaWduYWwsXG4gICAgICAgICAgICBjYW5jZWxfam9iOiB0aGlzLl9zaG91bGRDYW5jZWxKb2IsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgIH07XG4gICAgUnVuU2lnbmFsLnByb3RvdHlwZS5zaG91bGRDYW5jZWxKb2IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3Nob3VsZENhbmNlbEpvYiA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIFJ1blNpZ25hbDtcbn0oUmVxdWVzdEZhY3RvcnlfMS5kZWZhdWx0KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBSdW5TaWduYWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SdW5TaWduYWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFJlcXVlc3RGYWN0b3J5XzEgPSByZXF1aXJlKFwiLi4vLi4vaW50ZXJmYWNlcy9SZXF1ZXN0RmFjdG9yeVwiKTtcbnZhciBSZXF1ZXN0XzEgPSByZXF1aXJlKFwiLi4vLi4vY2xpZW50L1JlcXVlc3RcIik7XG52YXIgUnVuU2hvdyA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJ1blNob3csIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUnVuU2hvdyhydW5JZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5ydW5JZCA9IHJ1bklkO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJ1blNob3cucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0XzEuZGVmYXVsdChcIi9ydW5zL1wiICsgdGhpcy5ydW5JZC50b1N0cmluZygpLCBcIkdFVFwiKTtcbiAgICB9O1xuICAgIHJldHVybiBSdW5TaG93O1xufShSZXF1ZXN0RmFjdG9yeV8xLmRlZmF1bHQpKTtcbmV4cG9ydHMuZGVmYXVsdCA9IFJ1blNob3c7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SdW5TaG93LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBSdW5TaWduYWxfMSA9IHJlcXVpcmUoXCIuLi8uLi9yZXF1ZXN0cy9ydW5zL1J1blNpZ25hbFwiKTtcbnZhciBSdW5DYW5jZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSdW5DYW5jZWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUnVuQ2FuY2VsKHJ1bklkKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHJ1bklkLCAnY2FuY2VsJykgfHwgdGhpcztcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5zaG91bGRDYW5jZWxKb2IuY2FsbChfdGhpcyk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIFJ1bkNhbmNlbDtcbn0oUnVuU2lnbmFsXzEuZGVmYXVsdCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gUnVuQ2FuY2VsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UnVuQ2FuY2VsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5jbGllbnQgPSB2b2lkIDA7XG52YXIgSm9iU2VhcmNoXzEgPSByZXF1aXJlKFwiLi9yZXF1ZXN0cy9qb2JzL0pvYlNlYXJjaFwiKTtcbnZhciBKb2JTaG93XzEgPSByZXF1aXJlKFwiLi9yZXF1ZXN0cy9qb2JzL0pvYlNob3dcIik7XG52YXIgQmF0Y2hTZWFyY2hfMSA9IHJlcXVpcmUoXCIuL3JlcXVlc3RzL2JhdGNoZXMvQmF0Y2hTZWFyY2hcIik7XG52YXIgQmF0Y2hTaG93XzEgPSByZXF1aXJlKFwiLi9yZXF1ZXN0cy9iYXRjaGVzL0JhdGNoU2hvd1wiKTtcbnZhciBSdW5TZWFyY2hfMSA9IHJlcXVpcmUoXCIuL3JlcXVlc3RzL3J1bnMvUnVuU2VhcmNoXCIpO1xudmFyIFJ1blJldHJ5XzEgPSByZXF1aXJlKFwiLi9yZXF1ZXN0cy9ydW5zL1J1blJldHJ5XCIpO1xudmFyIFJ1blNpZ25hbF8xID0gcmVxdWlyZShcIi4vcmVxdWVzdHMvcnVucy9SdW5TaWduYWxcIik7XG52YXIgUnVuU2hvd18xID0gcmVxdWlyZShcIi4vcmVxdWVzdHMvcnVucy9SdW5TaG93XCIpO1xudmFyIFJ1bkNhbmNlbF8xID0gcmVxdWlyZShcIi4vcmVxdWVzdHMvcnVucy9SdW5DYW5jZWxcIik7XG5leHBvcnRzLmNsaWVudCA9IHtcbiAgICBqb2JzOiB7XG4gICAgICAgIHNlYXJjaDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEpvYlNlYXJjaF8xLmRlZmF1bHQoKTsgfSxcbiAgICAgICAgc2hvdzogZnVuY3Rpb24gKGFsaWFzKSB7IHJldHVybiBuZXcgSm9iU2hvd18xLmRlZmF1bHQoYWxpYXMpOyB9XG4gICAgfSxcbiAgICBiYXRjaGVzOiB7XG4gICAgICAgIHNlYXJjaDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEJhdGNoU2VhcmNoXzEuZGVmYXVsdCgpOyB9LFxuICAgICAgICBzaG93OiBmdW5jdGlvbiAoYmF0Y2hJZCkgeyByZXR1cm4gbmV3IEJhdGNoU2hvd18xLmRlZmF1bHQoYmF0Y2hJZCk7IH1cbiAgICB9LFxuICAgIHJ1bnM6IHtcbiAgICAgICAgc2VhcmNoOiBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUnVuU2VhcmNoXzEuZGVmYXVsdCgpOyB9LFxuICAgICAgICBzaG93OiBmdW5jdGlvbiAocnVuSWQpIHsgcmV0dXJuIG5ldyBSdW5TaG93XzEuZGVmYXVsdChydW5JZCk7IH0sXG4gICAgICAgIHNpZ25hbDogZnVuY3Rpb24gKHJ1bklkLCBzaWduYWwpIHsgcmV0dXJuIG5ldyBSdW5TaWduYWxfMS5kZWZhdWx0KHJ1bklkLCBzaWduYWwpOyB9LFxuICAgICAgICByZXRyeTogZnVuY3Rpb24gKHJ1bklkKSB7IHJldHVybiBuZXcgUnVuUmV0cnlfMS5kZWZhdWx0KHJ1bklkKTsgfSxcbiAgICAgICAgY2FuY2VsOiBmdW5jdGlvbiAocnVuSWQpIHsgcmV0dXJuIG5ldyBSdW5DYW5jZWxfMS5kZWZhdWx0KHJ1bklkKTsgfVxuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwibmFtZXMiOlsiY29uZmlnIiwicmVxdWlyZSQkMCIsInJlcXVpcmUkJDEiLCJMaXN0ZW5lcl8xIiwiTGlzdGVuZXIiLCJDbGllbnRGYWN0b3J5XzEiLCJQb2xsIiwibGlzdGVuZXJJZCIsInJuZ18xIiwiX2RlZmF1bHQiLCJ2YWxpZGF0ZV8xIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInN0cmluZ2lmeV8xIiwiX3ZhbGlkYXRlIiwidjFfMSIsIl9ybmciLCJfc3RyaW5naWZ5IiwicGFyc2VfMSIsInYzNV8xIiwidmVyc2lvbiIsIm1kNV8xIiwidjNfMSIsIl92IiwidjRfMSIsInJlcXVpcmUkJDIiLCJzaGExXzEiLCJ2NV8xIiwidmVyc2lvbl8xIiwiX3BhcnNlIiwiX3YyIiwicmVxdWlyZSQkMyIsInJlcXVpcmUkJDQiLCJyZXF1aXJlJCQ1IiwicmVxdWlyZSQkNiIsInJlcXVpcmUkJDciLCJyZXF1aXJlJCQ4IiwiTm90aWZpZXJfMSIsIk5vdGlmaWVyIiwiUmVxdWVzdEZhY3RvcnlfMSIsIlJlcXVlc3RGYWN0b3J5IiwiUmVxdWVzdF8xIiwiUmVxdWVzdCIsIl9fZXh0ZW5kcyIsInRoaXMiLCJkIiwiYiIsIkpvYlNlYXJjaF8xIiwiSm9iU2VhcmNoIiwiSm9iU2hvd18xIiwiSm9iU2hvdyIsIkJhdGNoU2VhcmNoXzEiLCJCYXRjaFNlYXJjaCIsIkJhdGNoU2hvd18xIiwiQmF0Y2hTaG93IiwiUnVuU2VhcmNoXzEiLCJSdW5TZWFyY2giLCJSdW5SZXRyeV8xIiwiUnVuUmV0cnkiLCJSdW5TaWduYWxfMSIsIlJ1blNpZ25hbCIsIlJ1blNob3dfMSIsIlJ1blNob3ciLCJSdW5DYW5jZWxfMSIsIlJ1bkNhbmNlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFRQSxJQUFBLGlCQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUVILE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxJQUVOLEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBRUQsT0FBTyxDQUFFLE9BQVM7QUFBQSxFQUVsQixNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sRUFBRSxTQUFTLFdBQVcsV0FBVyxnQkFBZSxJQUFLLGNBQWU7QUFFMUUsVUFBTSxPQUFPLFNBQVMsTUFBTTtBQUMxQixhQUFPO0FBQUEsUUFDTCxPQUFPLDBFQUVGLE1BQU0sWUFBWSxPQUFPLHNCQUFzQixVQUFVLFFBQVE7QUFBQSxRQUN0RSxHQUFHLFVBQVU7QUFBQSxRQUNiLFNBQVM7QUFBQSxNQUNWO0FBQUEsSUFDUCxDQUFLO0FBRUQsVUFBTSxZQUFZO0FBQUEsTUFBUyxNQUN6Qiw0QkFDRyxNQUFNLFVBQVUsU0FBUyx3Q0FBd0M7QUFBQSxJQUNyRTtBQUVELFdBQU8sTUFBTTtBQUNYLFlBQU0sUUFBUSxD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VTtBQUM3QyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJLFVBQVU7QUFDOUMsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSSxXQUFXO0FBQy9DLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUksU0FBUztBQUM3QyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHLFVBQVU7QUFDN0MsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSSxXQUFXO0FBQy9DLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLElBQUksTUFBTTtBQUMzQyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJLFdBQVc7QUFDaEQsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssR0FBRyxVQUFVO0FBQzlDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLElBQUksU0FBUztBQUM5QyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJLFdBQVc7QUFDaEQsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSSxVQUFVO0FBQy9DLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUcsVUFBVTtBQUM3QyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHLFdBQVc7QUFDOUMsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSSxTQUFTO0FBQzlDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLFVBQVU7QUFDMUMsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksR0FBRyxVQUFVO0FBQzdDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLEdBQUcsUUFBUTtBQUM1QyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJLFVBQVU7QUFDL0MsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSSxVQUFVO0FBQzlDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUcsU0FBUztBQUM1QyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxHQUFHLFdBQVc7QUFDL0MsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSSxVQUFVO0FBQzlDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUksVUFBVTtBQUM5QyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxHQUFHLFdBQVc7QUFDL0MsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksR0FBRyxTQUFTO0FBQzVDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUksVUFBVTtBQUM5QyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJLFdBQVc7QUFDaEQsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksR0FBRyxPQUFPO0FBQzFDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUksV0FBVztBQUMvQyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJLFVBQVU7QUFDL0MsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSSxTQUFTO0FBQzlDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUcsV0FBVztBQUM5QyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJLFVBQVU7QUFDOUMsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSSxVQUFVO0FBQzlDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLElBQUksV0FBVztBQUNoRCxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxHQUFHLFNBQVM7QUFDN0MsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksVUFBVTtBQUMxQyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJLFVBQVU7QUFDOUMsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSSxRQUFRO0FBQzVDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLEdBQUcsVUFBVTtBQUM3QyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJLFVBQVU7QUFDL0MsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSSxTQUFTO0FBQzlDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUksVUFBVTtBQUM5QyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksR0FBRyxVQUFVO0FBQ3pDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUksVUFBVTtBQUM5QyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJLFdBQVc7QUFDaEQsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSSxTQUFTO0FBQzdDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLEdBQUcsVUFBVTtBQUM5QyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJLFdBQVc7QUFDL0MsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSSxRQUFRO0FBQzdDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUksV0FBVztBQUMvQyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHLFVBQVU7QUFDN0MsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLEtBQUssSUFBSSxTQUFTO0FBQzlDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxJQUFJLElBQUksV0FBVztBQUMvQyxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksS0FBSyxJQUFJLFVBQVU7QUFDL0MsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksR0FBRyxVQUFVO0FBQzdDLFFBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsSUFBSSxLQUFLLElBQUksV0FBVztBQUNoRCxRQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLElBQUksSUFBSSxJQUFJLFNBQVM7QUFDN0MsUUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLElBQUksSUFBSSxVQUFVO0FBQzlDLFFBQUksUUFB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
