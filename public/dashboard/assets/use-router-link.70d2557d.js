import { c as computed, h, g as getCurrentInstance, a0 as unref, Y as isKeyCode, x as addEvt, C as cleanEvt, A as stop, B as position } from "./index.07765cf9.js";
import { c as createComponent, h as hSlot, e as hMergeSlot, b as createDirective } from "./render.34f10d21.js";
const useSizeDefaults = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 38,
  xl: 46
};
const useSizeProps = {
  size: String
};
function useSize(props, sizes = useSizeDefaults) {
  return computed(() => props.size !== void 0 ? { fontSize: props.size in sizes ? `${sizes[props.size]}px` : props.size } : null);
}
const defaultViewBox = "0 0 24 24";
const sameFn = (i) => i;
const ionFn = (i) => `ionicons ${i}`;
const libMap = {
  "mdi-": (i) => `mdi ${i}`,
  "icon-": sameFn,
  "bt-": (i) => `bt ${i}`,
  "eva-": (i) => `eva ${i}`,
  "ion-md": ionFn,
  "ion-ios": ionFn,
  "ion-logo": ionFn,
  "iconfont ": sameFn,
  "ti-": (i) => `themify-icon ${i}`,
  "bi-": (i) => `bootstrap-icons ${i}`
};
const matMap = {
  o_: "-outlined",
  r_: "-round",
  s_: "-sharp"
};
const symMap = {
  sym_o_: "-outlined",
  sym_r_: "-rounded",
  sym_s_: "-sharp"
};
const libRE = new RegExp("^(" + Object.keys(libMap).join("|") + ")");
const matRE = new RegExp("^(" + Object.keys(matMap).join("|") + ")");
const symRE = new RegExp("^(" + Object.keys(symMap).join("|") + ")");
const mRE = /^[Mm]\s?[-+]?\.?\d/;
const imgRE = /^img:/;
const svgUseRE = /^svguse:/;
const ionRE = /^ion-/;
const faRE = /^(fa-(solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
var QIcon = createComponent({
  name: "QIcon",
  props: {
    ...useSizeProps,
    tag: {
      type: String,
      default: "i"
    },
    name: String,
    color: String,
    left: Boolean,
    right: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props);
    const classes = computed(
      () => "q-icon" + (props.left === true ? " on-left" : "") + (props.right === true ? " on-right" : "") + (props.color !== void 0 ? ` text-${props.color}` : "")
    );
    const type = computed(() => {
      let cls;
      let icon = props.name;
      if (icon === "none" || !icon) {
        return { none: true };
      }
      if ($q.iconMapFn !== null) {
        const res = $q.iconMapFn(icon);
        if (res !== void 0) {
          if (res.icon !== void 0) {
            icon = res.icon;
            if (icon === "none" || !icon) {
              return { none: true };
            }
          } else {
            return {
              cls: res.cls,
              content: res.content !== void 0 ? res.content : " "
            };
          }
        }
      }
      if (mRE.test(icon) === true) {
        const [def, viewBox = defaultViewBox] = icon.split("|");
        return {
          svg: true,
          viewBox,
          nodes: def.split("&&").map((path) => {
            const [d, style, transform] = path.split("@@");
            return h("path", { style, d, transform });
          })
        };
      }
      if (imgRE.test(icon) === true) {
        return {
          img: true,
          src: icon.substring(4)
        };
      }
      if (svgUseRE.test(icon) === true) {
        const [def, viewBox = defaultViewBox] = icon.split("|");
        return {
          svguse: true,
          src: def.substring(7),
          viewBox
        };
      }
      let content = " ";
      const matches = icon.match(libRE);
      if (matches !== null) {
        cls = libMap[matches[1]](icon);
      } else if (faRE.test(icon) === true) {
        cls = icon;
      } else if (ionRE.test(icon) === true) {
        cls = `ionicons ion-${$q.platform.is.ios === true ? "ios" : "md"}${icon.substring(3)}`;
      } else if (symRE.test(icon) === true) {
        cls = "notranslate material-symbols";
        const matches2 = icon.match(symRE);
        if (matches2 !== null) {
          icon = icon.substring(6);
          cls += symMap[matches2[1]];
        }
        content = icon;
      } else {
        cls = "notranslate material-icons";
        const matches2 = icon.match(matRE);
        if (matches2 !== null) {
          icon = icon.substring(2);
          cls += matMap[matches2[1]];
        }
        content = icon;
      }
      return {
        cls,
        content
      };
    });
    return () => {
      const data = {
        class: classes.value,
        style: sizeStyle.value,
        "aria-hidden": "true",
        role: "presentation"
      };
      if (type.value.none === true) {
        return h(props.tag, data, hSlot(slots.default));
      }
      if (type.value.img === true) {
        return h("span", data, hMergeSlot(slots.default, [
          h("img", { src: type.value.src })
        ]));
      }
      if (type.value.svg === true) {
        return h("span", data, hMergeSlot(slots.default, [
          h("svg", {
            viewBox: type.value.viewBox || "0 0 24 24"
          }, type.value.nodes)
        ]));
      }
      if (type.value.svguse === true) {
        return h("span", data, hMergeSlot(slots.default, [
          h("svg", {
            viewBox: type.value.viewBox
          }, [
            h("use", { "xlink:href": type.value.src })
          ])
        ]));
      }
      if (type.value.cls !== void 0) {
        data.class += " " + type.value.cls;
      }
      return h(props.tag, data, hMergeSlot(slots.default, [
        type.value.content
      ]));
    };
  }
});
function css(element, css2) {
  const style = element.style;
  for (const prop in css2) {
    style[prop] = css2[prop];
  }
}
function getElement(el) {
  if (el === void 0 || el === null) {
    return void 0;
  }
  if (typeof el === "string") {
    try {
      return document.querySelector(el) || void 0;
    } catch (err) {
      return void 0;
    }
  }
  const target = unref(el);
  if (target) {
    return target.$el || target;
  }
}
function throttle(fn, limit = 250) {
  let wait = false, result;
  return function() {
    if (wait === false) {
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
      result = fn.apply(this, arguments);
    }
    return result;
  };
}
function showRipple(evt, el, ctx, forceCenter) {
  ctx.modifiers.stop === true && stop(evt);
  const color = ctx.modifiers.color;
  let center = ctx.modifiers.center;
  center = center === true || forceCenter === true;
  const node = document.createElement("span"), innerNode = document.createElement("span"), pos = position(evt), { left, top, width, height } = el.getBoundingClientRect(), diameter = Math.sqrt(width * width + height * height), radius = diameter / 2, centerX = `${(width - diameter) / 2}px`, x = center ? centerX : `${pos.left - left - radius}px`, centerY = `${(height - diameter) / 2}px`, y = center ? centerY : `${pos.top - top - radius}px`;
  innerNode.className = "q-ripple__inner";
  css(innerNode, {
    height: `${diameter}px`,
    width: `${diameter}px`,
    transform: `translate3d(${x},${y},0) scale3d(.2,.2,1)`,
    opacity: 0
  });
  node.className = `q-ripple${color ? " text-" + color : ""}`;
  node.setAttribute("dir", "ltr");
  node.appendChild(innerNode);
  el.appendChild(node);
  const abort = () => {
    node.remove();
    clearTimeout(timer);
  };
  ctx.abort.push(abort);
  let timer = setTimeout(() => {
    innerNode.classList.add("q-ripple__inner--enter");
    innerNode.style.transform = `translate3d(${centerX},${centerY},0) scale3d(1,1,1)`;
    innerNode.style.opacity = 0.2;
    timer = setTimeout(() => {
      innerNode.classList.remove("q-ripple__inner--enter");
      innerNode.classList.add("q-ripple__inner--leave");
      innerNode.style.opacity = 0;
      timer = setTimeout(() => {
        node.remove();
        ctx.abort.splice(ctx.abort.indexOf(abort), 1);
      }, 275);
    }, 250);
  }, 50);
}
function updateModifiers(ctx, { modifiers, value, arg }) {
  const cfg = Object.assign({}, ctx.cfg.ripple, modifiers, value);
  ctx.modifiers = {
    early: cfg.early === true,
    stop: cfg.stop === true,
    center: cfg.center === true,
    color: cfg.color || arg,
    keyCodes: [].concat(cfg.keyCodes || 13)
  };
}
var Ripple = createDirective(
  {
    name: "ripple",
    beforeMount(el, binding) {
      const cfg = binding.instance.$.appContext.config.globalProperties.$q.config || {};
      if (cfg.ripple === false) {
        return;
      }
      const ctx = {
        cfg,
        enabled: binding.value !== false,
        modifiers: {},
        abort: [],
        start(evt) {
          if (ctx.enabled === true && evt.qSkipRipple !== true && evt.type === (ctx.modifiers.early === true ? "pointerdown" : "click")) {
            showRipple(evt, el, ctx, evt.qKeyEvent === true);
          }
        },
        keystart: throttle((evt) => {
          if (ctx.enabled === true && evt.qSkipRipple !== true && isKeyCode(evt, ctx.modifiers.keyCodes) === true && evt.type === `key${ctx.modifiers.early === true ? "down" : "up"}`) {
            showRipple(evt, el, ctx, true);
          }
        }, 300)
      };
      updateModifiers(ctx, binding);
      el.__qripple = ctx;
      addEvt(ctx, "main", [
        [el, "pointerdown", "start", "passive"],
        [el, "click", "start", "passive"],
        [el, "keydown", "keystart", "passive"],
        [el, "keyup", "keystart", "passive"]
      ]);
    },
    updated(el, binding) {
      if (binding.oldValue !== binding.value) {
        const ctx = el.__qripple;
        if (ctx !== void 0) {
          ctx.enabled = binding.value !== false;
          if (ctx.enabled === true && Object(binding.value) === binding.value) {
            updateModifiers(ctx, binding);
          }
        }
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qripple;
      if (ctx !== void 0) {
        ctx.abort.forEach((fn) => {
          fn();
        });
        cleanEvt(ctx, "main");
        delete el._qripple;
      }
    }
  }
);
const alignMap = {
  left: "start",
  center: "center",
  right: "end",
  between: "between",
  around: "around",
  evenly: "evenly",
  stretch: "stretch"
};
const alignValues = Object.keys(alignMap);
const useAlignProps = {
  align: {
    type: String,
    validator: (v) => alignValues.includes(v)
  }
};
function useAlign(props) {
  return computed(() => {
    const align = props.align === void 0 ? props.vertical === true ? "stretch" : "left" : props.align;
    return `${props.vertical === true ? "items" : "justify"}-${alignMap[align]}`;
  });
}
function getParentProxy(proxy) {
  if (Object(proxy.$parent) === proxy.$parent) {
    return proxy.$parent;
  }
  let { parent } = proxy.$;
  while (Object(parent) === parent) {
    if (Object(parent.proxy) === parent.proxy) {
      return parent.proxy;
    }
    parent = parent.parent;
  }
}
function fillNormalizedVNodes(children, vnode) {
  if (typeof vnode.type === "symbol") {
    if (Array.isArray(vnode.children) === true) {
      vnode.children.forEach((child) => {
        fillNormalizedVNodes(children, child);
      });
    }
  } else {
    children.add(vnode);
  }
}
function getNormalizedVNodes(vnodes) {
  const children = /* @__PURE__ */ new Set();
  vnodes.forEach((vnode) => {
    fillNormalizedVNodes(children, vnode);
  });
  return Array.from(children);
}
function vmHasRouter(vm) {
  return vm.appContext.config.globalProperties.$router !== void 0;
}
function vmIsDestroyed(vm) {
  return vm.isUnmounted === true || vm.isDeactivated === true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key], outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) {
        return false;
      }
    } else if (Array.isArray(outerValue) === false || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i])) {
      return false;
    }
  }
  return true;
}
function isEquivalentArray(a, b) {
  return Array.isArray(b) === true ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function isSameRouteLocationParamsValue(a, b) {
  return Array.isArray(a) === true ? isEquivalentArray(a, b) : Array.isArray(b) === true ? isEquivalentArray(b, a) : a === b;
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a) {
    if (isSameRouteLocationParamsValue(a[key], b[key]) === false) {
      return false;
    }
  }
  return true;
}
const useRouterLinkProps = {
  to: [String, Object],
  replace: Boolean,
  exact: Boolean,
  activeClass: {
    type: String,
    default: "q-router-link--active"
  },
  exactActiveClass: {
    type: String,
    default: "q-router-link--exact-active"
  },
  href: String,
  target: String,
  disable: Boolean
};
function useRouterLink({ fallbackTag, useDisableForRouterLinkProps = true } = {}) {
  const vm = getCurrentInstance();
  const { props, proxy, emit } = vm;
  const hasRouter = vmHasRouter(vm);
  const hasHrefLink = computed(() => props.disable !== true && props.href !== void 0);
  const hasRouterLinkProps = useDisableForRouterLinkProps === true ? computed(
    () => hasRouter === true && props.disable !== true && hasHrefLink.value !== true && props.to !== void 0 && props.to !== null && props.to !== ""
  ) : computed(
    () => hasRouter === true && hasHrefLink.value !== true && props.to !== void 0 && props.to !== null && props.to !== ""
  );
  const resolvedLink = computed(() => hasRouterLinkProps.value === true ? getLink(props.to) : null);
  const hasRouterLink = computed(() => resolvedLink.value !== null);
  const hasLink = computed(() => hasHrefLink.value === true || hasRouterLink.value === true);
  const linkTag = computed(() => props.type === "a" || hasLink.value === true ? "a" : props.tag || fallbackTag || "div");
  const linkAttrs = computed(() => hasHrefLink.value === true ? {
    href: props.href,
    target: props.target
  } : hasRouterLink.value === true ? {
    href: resolvedLink.value.href,
    target: props.target
  } : {});
  const linkActiveIndex = computed(() => {
    if (hasRouterLink.value === false) {
      return -1;
    }
    const { matched } = resolvedLink.value, { length } = matched, routeMatched = matched[length - 1];
    if (routeMatched === void 0) {
      return -1;
    }
    const currentMatched = proxy.$route.matched;
    if (currentMatched.length === 0) {
      return -1;
    }
    const index = currentMatched.findIndex(
      isSameRouteRecord.bind(null, routeMatched)
    );
    if (index > -1) {
      return index;
    }
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(
      isSameRouteRecord.bind(null, matched[length - 2])
    ) : index;
  });
  const linkIsActive = computed(
    () => hasRouterLink.value === true && linkActiveIndex.value !== -1 && includesParams(proxy.$route.params, resolvedLink.value.params)
  );
  const linkIsExactActive = computed(
    () => linkIsActive.value === true && linkActiveIndex.value === proxy.$route.matched.length - 1 && isSameRouteLocationParams(proxy.$route.params, resolvedLink.value.params)
  );
  const linkClass = computed(() => hasRouterLink.value === true ? linkIsExactActive.value === true ? ` ${props.exactActiveClass} ${props.activeClass}` : props.exact === true ? "" : linkIsActive.value === true ? ` ${props.activeClass}` : "" : "");
  function getLink(to) {
    try {
      return proxy.$router.resolve(to);
    } catch (_) {
    }
    return null;
  }
  function navigateToRouterLink(e, { returnRouterError, to = props.to, replace = props.replace } = {}) {
    if (props.disable === true) {
      e.preventDefault();
      return Promise.resolve(false);
    }
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.button !== void 0 && e.button !== 0 || props.target === "_blank") {
      return Promise.resolve(false);
    }
    e.preventDefault();
    const promise = proxy.$router[replace === true ? "replace" : "push"](to);
    return returnRouterError === true ? promise : promise.then(() => {
    }).catch(() => {
    });
  }
  function navigateOnClick(e) {
    if (hasRouterLink.value === true) {
      const go = (opts) => navigateToRouterLink(e, opts);
      emit("click", e, go);
      e.defaultPrevented !== true && go();
    } else {
      emit("click", e);
    }
  }
  return {
    hasRouterLink,
    hasHrefLink,
    hasLink,
    linkTag,
    resolvedLink,
    linkIsActive,
    linkIsExactActive,
    linkClass,
    linkAttrs,
    getLink,
    navigateToRouterLink,
    navigateOnClick
  };
}
export { QIcon as Q, Ripple as R, useSizeProps as a, useRouterLinkProps as b, css as c, useAlignProps as d, useSize as e, useAlign as f, getElement as g, useRouterLink as h, vmIsDestroyed as i, getNormalizedVNodes as j, getParentProxy as k, useSizeDefaults as u, vmHasRouter as v };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXJvdXRlci1saW5rLjcwZDI1NTdkLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ljb24vUUljb24uanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvZG9tLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3Rocm90dGxlLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2RpcmVjdGl2ZXMvUmlwcGxlLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWFsaWduLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvdm0uanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utcm91dGVyLWxpbmsuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCB1c2VTaXplRGVmYXVsdHMgPSB7XG4gIHhzOiAxOCxcbiAgc206IDI0LFxuICBtZDogMzIsXG4gIGxnOiAzOCxcbiAgeGw6IDQ2XG59XG5cbmV4cG9ydCBjb25zdCB1c2VTaXplUHJvcHMgPSB7XG4gIHNpemU6IFN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocHJvcHMsIHNpemVzID0gdXNlU2l6ZURlZmF1bHRzKSB7XG4gIC8vIHJldHVybiBzaXplU3R5bGVcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy5zaXplICE9PSB2b2lkIDBcbiAgICAgID8geyBmb250U2l6ZTogcHJvcHMuc2l6ZSBpbiBzaXplcyA/IGAkeyBzaXplc1sgcHJvcHMuc2l6ZSBdIH1weGAgOiBwcm9wcy5zaXplIH1cbiAgICAgIDogbnVsbFxuICApKVxufVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZVNpemUsIHsgdXNlU2l6ZVByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCwgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5jb25zdCBkZWZhdWx0Vmlld0JveCA9ICcwIDAgMjQgMjQnXG5cbmNvbnN0IHNhbWVGbiA9IGkgPT4gaVxuY29uc3QgaW9uRm4gPSBpID0+IGBpb25pY29ucyAkeyBpIH1gXG5cbmNvbnN0IGxpYk1hcCA9IHtcbiAgJ21kaS0nOiBpID0+IGBtZGkgJHsgaSB9YCxcbiAgJ2ljb24tJzogc2FtZUZuLCAvLyBmb250YXdlc29tZSBlcXVpdlxuICAnYnQtJzogaSA9PiBgYnQgJHsgaSB9YCxcbiAgJ2V2YS0nOiBpID0+IGBldmEgJHsgaSB9YCxcbiAgJ2lvbi1tZCc6IGlvbkZuLFxuICAnaW9uLWlvcyc6IGlvbkZuLFxuICAnaW9uLWxvZ28nOiBpb25GbixcbiAgJ2ljb25mb250ICc6IHNhbWVGbixcbiAgJ3RpLSc6IGkgPT4gYHRoZW1pZnktaWNvbiAkeyBpIH1gLFxuICAnYmktJzogaSA9PiBgYm9vdHN0cmFwLWljb25zICR7IGkgfWBcbn1cblxuY29uc3QgbWF0TWFwID0ge1xuICBvXzogJy1vdXRsaW5lZCcsXG4gIHJfOiAnLXJvdW5kJyxcbiAgc186ICctc2hhcnAnXG59XG5cbmNvbnN0IHN5bU1hcCA9IHtcbiAgc3ltX29fOiAnLW91dGxpbmVkJyxcbiAgc3ltX3JfOiAnLXJvdW5kZWQnLFxuICBzeW1fc186ICctc2hhcnAnXG59XG5cbmNvbnN0IGxpYlJFID0gbmV3IFJlZ0V4cCgnXignICsgT2JqZWN0LmtleXMobGliTWFwKS5qb2luKCd8JykgKyAnKScpXG5jb25zdCBtYXRSRSA9IG5ldyBSZWdFeHAoJ14oJyArIE9iamVjdC5rZXlzKG1hdE1hcCkuam9pbignfCcpICsgJyknKVxuY29uc3Qgc3ltUkUgPSBuZXcgUmVnRXhwKCdeKCcgKyBPYmplY3Qua2V5cyhzeW1NYXApLmpvaW4oJ3wnKSArICcpJylcbmNvbnN0IG1SRSA9IC9eW01tXVxccz9bLStdP1xcLj9cXGQvXG5jb25zdCBpbWdSRSA9IC9eaW1nOi9cbmNvbnN0IHN2Z1VzZVJFID0gL15zdmd1c2U6L1xuY29uc3QgaW9uUkUgPSAvXmlvbi0vXG5jb25zdCBmYVJFID0gL14oZmEtKHNvbGlkfHJlZ3VsYXJ8bGlnaHR8YnJhbmRzfGR1b3RvbmV8dGhpbil8W2xmXWFbc3JsYmRrXT8pIC9cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FJY29uJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVNpemVQcm9wcyxcblxuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2knXG4gICAgfSxcblxuICAgIG5hbWU6IFN0cmluZyxcbiAgICBjb2xvcjogU3RyaW5nLFxuICAgIGxlZnQ6IEJvb2xlYW4sXG4gICAgcmlnaHQ6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1pY29uJ1xuICAgICAgKyAocHJvcHMubGVmdCA9PT0gdHJ1ZSA/ICcgb24tbGVmdCcgOiAnJykgLy8gVE9ETyBRdjM6IGRyb3AgdGhpc1xuICAgICAgKyAocHJvcHMucmlnaHQgPT09IHRydWUgPyAnIG9uLXJpZ2h0JyA6ICcnKVxuICAgICAgKyAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IHR5cGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBsZXQgY2xzXG4gICAgICBsZXQgaWNvbiA9IHByb3BzLm5hbWVcblxuICAgICAgaWYgKGljb24gPT09ICdub25lJyB8fCAhaWNvbikge1xuICAgICAgICByZXR1cm4geyBub25lOiB0cnVlIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCRxLmljb25NYXBGbiAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCByZXMgPSAkcS5pY29uTWFwRm4oaWNvbilcbiAgICAgICAgaWYgKHJlcyAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgaWYgKHJlcy5pY29uICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGljb24gPSByZXMuaWNvblxuICAgICAgICAgICAgaWYgKGljb24gPT09ICdub25lJyB8fCAhaWNvbikge1xuICAgICAgICAgICAgICByZXR1cm4geyBub25lOiB0cnVlIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjbHM6IHJlcy5jbHMsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5jb250ZW50ICE9PSB2b2lkIDBcbiAgICAgICAgICAgICAgICA/IHJlcy5jb250ZW50XG4gICAgICAgICAgICAgICAgOiAnICdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1SRS50ZXN0KGljb24pID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IFsgZGVmLCB2aWV3Qm94ID0gZGVmYXVsdFZpZXdCb3ggXSA9IGljb24uc3BsaXQoJ3wnKVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3ZnOiB0cnVlLFxuICAgICAgICAgIHZpZXdCb3gsXG4gICAgICAgICAgbm9kZXM6IGRlZi5zcGxpdCgnJiYnKS5tYXAocGF0aCA9PiB7XG4gICAgICAgICAgICBjb25zdCBbIGQsIHN0eWxlLCB0cmFuc2Zvcm0gXSA9IHBhdGguc3BsaXQoJ0BAJylcbiAgICAgICAgICAgIHJldHVybiBoKCdwYXRoJywgeyBzdHlsZSwgZCwgdHJhbnNmb3JtIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaW1nUkUudGVzdChpY29uKSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGltZzogdHJ1ZSxcbiAgICAgICAgICBzcmM6IGljb24uc3Vic3RyaW5nKDQpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN2Z1VzZVJFLnRlc3QoaWNvbikgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgWyBkZWYsIHZpZXdCb3ggPSBkZWZhdWx0Vmlld0JveCBdID0gaWNvbi5zcGxpdCgnfCcpXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdmd1c2U6IHRydWUsXG4gICAgICAgICAgc3JjOiBkZWYuc3Vic3RyaW5nKDcpLFxuICAgICAgICAgIHZpZXdCb3hcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgY29udGVudCA9ICcgJ1xuICAgICAgY29uc3QgbWF0Y2hlcyA9IGljb24ubWF0Y2gobGliUkUpXG5cbiAgICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICAgIGNscyA9IGxpYk1hcFsgbWF0Y2hlc1sgMSBdIF0oaWNvbilcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGZhUkUudGVzdChpY29uKSA9PT0gdHJ1ZSkge1xuICAgICAgICBjbHMgPSBpY29uXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpb25SRS50ZXN0KGljb24pID09PSB0cnVlKSB7XG4gICAgICAgIGNscyA9IGBpb25pY29ucyBpb24tJHsgJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlID8gJ2lvcycgOiAnbWQnIH0keyBpY29uLnN1YnN0cmluZygzKSB9YFxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc3ltUkUudGVzdChpY29uKSA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBcIm5vdHJhbnNsYXRlXCIgY2xhc3MgaXMgZm9yIEdvb2dsZSBUcmFuc2xhdGVcbiAgICAgICAgLy8gdG8gYXZvaWQgdGFtcGVyaW5nIHdpdGggTWF0ZXJpYWwgU3ltYm9scyBsaWdhdHVyZSBmb250XG4gICAgICAgIC8vXG4gICAgICAgIC8vIENhdXRpb246IFRvIGJlIGFibGUgdG8gYWRkIHN1ZmZpeCB0byB0aGUgY2xhc3MgbmFtZSxcbiAgICAgICAgLy8ga2VlcCB0aGUgJ21hdGVyaWFsLXN5bWJvbHMnIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZy5cbiAgICAgICAgY2xzID0gJ25vdHJhbnNsYXRlIG1hdGVyaWFsLXN5bWJvbHMnXG5cbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGljb24ubWF0Y2goc3ltUkUpXG4gICAgICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICAgICAgaWNvbiA9IGljb24uc3Vic3RyaW5nKDYpXG4gICAgICAgICAgY2xzICs9IHN5bU1hcFsgbWF0Y2hlc1sgMSBdIF1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRlbnQgPSBpY29uXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gXCJub3RyYW5zbGF0ZVwiIGNsYXNzIGlzIGZvciBHb29nbGUgVHJhbnNsYXRlXG4gICAgICAgIC8vIHRvIGF2b2lkIHRhbXBlcmluZyB3aXRoIE1hdGVyaWFsIEljb25zIGxpZ2F0dXJlIGZvbnRcbiAgICAgICAgLy9cbiAgICAgICAgLy8gQ2F1dGlvbjogVG8gYmUgYWJsZSB0byBhZGQgc3VmZml4IHRvIHRoZSBjbGFzcyBuYW1lLFxuICAgICAgICAvLyBrZWVwIHRoZSAnbWF0ZXJpYWwtaWNvbnMnIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZy5cbiAgICAgICAgY2xzID0gJ25vdHJhbnNsYXRlIG1hdGVyaWFsLWljb25zJ1xuXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSBpY29uLm1hdGNoKG1hdFJFKVxuICAgICAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgICAgIGljb24gPSBpY29uLnN1YnN0cmluZygyKVxuICAgICAgICAgIGNscyArPSBtYXRNYXBbIG1hdGNoZXNbIDEgXSBdXG4gICAgICAgIH1cblxuICAgICAgICBjb250ZW50ID0gaWNvblxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBjbHMsXG4gICAgICAgIGNvbnRlbnRcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlLFxuICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgIHJvbGU6ICdwcmVzZW50YXRpb24nXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlLnZhbHVlLm5vbmUgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgocHJvcHMudGFnLCBkYXRhLCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUudmFsdWUuaW1nID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBoKCdzcGFuJywgZGF0YSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgICAgaCgnaW1nJywgeyBzcmM6IHR5cGUudmFsdWUuc3JjIH0pXG4gICAgICAgIF0pKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS52YWx1ZS5zdmcgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgoJ3NwYW4nLCBkYXRhLCBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFtcbiAgICAgICAgICBoKCdzdmcnLCB7XG4gICAgICAgICAgICB2aWV3Qm94OiB0eXBlLnZhbHVlLnZpZXdCb3ggfHwgJzAgMCAyNCAyNCdcbiAgICAgICAgICB9LCB0eXBlLnZhbHVlLm5vZGVzKVxuICAgICAgICBdKSlcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUudmFsdWUuc3ZndXNlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBoKCdzcGFuJywgZGF0YSwgaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgICAgaCgnc3ZnJywge1xuICAgICAgICAgICAgdmlld0JveDogdHlwZS52YWx1ZS52aWV3Qm94XG4gICAgICAgICAgfSwgW1xuICAgICAgICAgICAgaCgndXNlJywgeyAneGxpbms6aHJlZic6IHR5cGUudmFsdWUuc3JjIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSkpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlLnZhbHVlLmNscyAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGRhdGEuY2xhc3MgKz0gJyAnICsgdHlwZS52YWx1ZS5jbHNcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGgocHJvcHMudGFnLCBkYXRhLCBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFtcbiAgICAgICAgdHlwZS52YWx1ZS5jb250ZW50XG4gICAgICBdKSlcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyB1bnJlZiB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGZ1bmN0aW9uIG9mZnNldCAoZWwpIHtcbiAgaWYgKGVsID09PSB3aW5kb3cpIHtcbiAgICByZXR1cm4geyB0b3A6IDAsIGxlZnQ6IDAgfVxuICB9XG4gIGNvbnN0IHsgdG9wLCBsZWZ0IH0gPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICByZXR1cm4geyB0b3AsIGxlZnQgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGUgKGVsLCBwcm9wZXJ0eSkge1xuICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZWlnaHQgKGVsKSB7XG4gIHJldHVybiBlbCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICA6IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxufVxuXG5leHBvcnQgZnVuY3Rpb24gd2lkdGggKGVsKSB7XG4gIHJldHVybiBlbCA9PT0gd2luZG93XG4gICAgPyB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIDogZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNzcyAoZWxlbWVudCwgY3NzKSB7XG4gIGNvbnN0IHN0eWxlID0gZWxlbWVudC5zdHlsZVxuXG4gIGZvciAoY29uc3QgcHJvcCBpbiBjc3MpIHtcbiAgICBzdHlsZVsgcHJvcCBdID0gY3NzWyBwcm9wIF1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3NzQmF0Y2ggKGVsZW1lbnRzLCBzdHlsZSkge1xuICBlbGVtZW50cy5mb3JFYWNoKGVsID0+IGNzcyhlbCwgc3R5bGUpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZHkgKGZuKSB7XG4gIGlmICh0eXBlb2YgZm4gIT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9PSAnbG9hZGluZycpIHtcbiAgICByZXR1cm4gZm4oKVxuICB9XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZuLCBmYWxzZSlcbn1cblxuLy8gaW50ZXJuYWxcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbGVtZW50IChlbCkge1xuICBpZiAoZWwgPT09IHZvaWQgMCB8fCBlbCA9PT0gbnVsbCkge1xuICAgIHJldHVybiB2b2lkIDBcbiAgfVxuXG4gIGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKSB8fCB2b2lkIDBcbiAgICB9XG4gICAgY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHZvaWQgMFxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHRhcmdldCA9IHVucmVmKGVsKVxuICBpZiAodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRhcmdldC4kZWwgfHwgdGFyZ2V0XG4gIH1cbn1cblxuLy8gaW50ZXJuYWxcbmV4cG9ydCBmdW5jdGlvbiBjaGlsZEhhc0ZvY3VzIChlbCwgZm9jdXNlZEVsKSB7XG4gIGlmIChlbCA9PT0gdm9pZCAwIHx8IGVsID09PSBudWxsIHx8IGVsLmNvbnRhaW5zKGZvY3VzZWRFbCkgPT09IHRydWUpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgZm9yIChsZXQgbmV4dCA9IGVsLm5leHRFbGVtZW50U2libGluZzsgbmV4dCAhPT0gbnVsbDsgbmV4dCA9IG5leHQubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgaWYgKG5leHQuY29udGFpbnMoZm9jdXNlZEVsKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBvZmZzZXQsXG4gIHN0eWxlLFxuICBoZWlnaHQsXG4gIHdpZHRoLFxuICBjc3MsXG4gIGNzc0JhdGNoLFxuICByZWFkeVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZuLCBsaW1pdCA9IDI1MCkge1xuICBsZXQgd2FpdCA9IGZhbHNlLCByZXN1bHRcblxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICBpZiAod2FpdCA9PT0gZmFsc2UpIHtcbiAgICAgIHdhaXQgPSB0cnVlXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHsgd2FpdCA9IGZhbHNlIH0sIGxpbWl0KVxuICAgICAgcmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuIiwiaW1wb3J0IHsgY3JlYXRlRGlyZWN0aXZlIH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBjc3MgfSBmcm9tICcuLi91dGlscy9kb20uanMnXG5pbXBvcnQgeyBwb3NpdGlvbiwgc3RvcCwgYWRkRXZ0LCBjbGVhbkV2dCB9IGZyb20gJy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5pbXBvcnQgdGhyb3R0bGUgZnJvbSAnLi4vdXRpbHMvdGhyb3R0bGUuanMnXG5pbXBvcnQgZ2V0U1NSUHJvcHMgZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG5mdW5jdGlvbiBzaG93UmlwcGxlIChldnQsIGVsLCBjdHgsIGZvcmNlQ2VudGVyKSB7XG4gIGN0eC5tb2RpZmllcnMuc3RvcCA9PT0gdHJ1ZSAmJiBzdG9wKGV2dClcblxuICBjb25zdCBjb2xvciA9IGN0eC5tb2RpZmllcnMuY29sb3JcbiAgbGV0IGNlbnRlciA9IGN0eC5tb2RpZmllcnMuY2VudGVyXG4gIGNlbnRlciA9IGNlbnRlciA9PT0gdHJ1ZSB8fCBmb3JjZUNlbnRlciA9PT0gdHJ1ZVxuXG4gIGNvbnN0XG4gICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSxcbiAgICBpbm5lck5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyksXG4gICAgcG9zID0gcG9zaXRpb24oZXZ0KSxcbiAgICB7IGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgZGlhbWV0ZXIgPSBNYXRoLnNxcnQod2lkdGggKiB3aWR0aCArIGhlaWdodCAqIGhlaWdodCksXG4gICAgcmFkaXVzID0gZGlhbWV0ZXIgLyAyLFxuICAgIGNlbnRlclggPSBgJHsgKHdpZHRoIC0gZGlhbWV0ZXIpIC8gMiB9cHhgLFxuICAgIHggPSBjZW50ZXIgPyBjZW50ZXJYIDogYCR7IHBvcy5sZWZ0IC0gbGVmdCAtIHJhZGl1cyB9cHhgLFxuICAgIGNlbnRlclkgPSBgJHsgKGhlaWdodCAtIGRpYW1ldGVyKSAvIDIgfXB4YCxcbiAgICB5ID0gY2VudGVyID8gY2VudGVyWSA6IGAkeyBwb3MudG9wIC0gdG9wIC0gcmFkaXVzIH1weGBcblxuICBpbm5lck5vZGUuY2xhc3NOYW1lID0gJ3EtcmlwcGxlX19pbm5lcidcbiAgY3NzKGlubmVyTm9kZSwge1xuICAgIGhlaWdodDogYCR7IGRpYW1ldGVyIH1weGAsXG4gICAgd2lkdGg6IGAkeyBkaWFtZXRlciB9cHhgLFxuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7IHggfSwkeyB5IH0sMCkgc2NhbGUzZCguMiwuMiwxKWAsXG4gICAgb3BhY2l0eTogMFxuICB9KVxuXG4gIG5vZGUuY2xhc3NOYW1lID0gYHEtcmlwcGxlJHsgY29sb3IgPyAnIHRleHQtJyArIGNvbG9yIDogJycgfWBcbiAgbm9kZS5zZXRBdHRyaWJ1dGUoJ2RpcicsICdsdHInKVxuICBub2RlLmFwcGVuZENoaWxkKGlubmVyTm9kZSlcbiAgZWwuYXBwZW5kQ2hpbGQobm9kZSlcblxuICBjb25zdCBhYm9ydCA9ICgpID0+IHtcbiAgICBub2RlLnJlbW92ZSgpXG4gICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICB9XG4gIGN0eC5hYm9ydC5wdXNoKGFib3J0KVxuXG4gIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlubmVyTm9kZS5jbGFzc0xpc3QuYWRkKCdxLXJpcHBsZV9faW5uZXItLWVudGVyJylcbiAgICBpbm5lck5vZGUuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7IGNlbnRlclggfSwkeyBjZW50ZXJZIH0sMCkgc2NhbGUzZCgxLDEsMSlgXG4gICAgaW5uZXJOb2RlLnN0eWxlLm9wYWNpdHkgPSAwLjJcblxuICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpbm5lck5vZGUuY2xhc3NMaXN0LnJlbW92ZSgncS1yaXBwbGVfX2lubmVyLS1lbnRlcicpXG4gICAgICBpbm5lck5vZGUuY2xhc3NMaXN0LmFkZCgncS1yaXBwbGVfX2lubmVyLS1sZWF2ZScpXG4gICAgICBpbm5lck5vZGUuc3R5bGUub3BhY2l0eSA9IDBcblxuICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbm9kZS5yZW1vdmUoKVxuICAgICAgICBjdHguYWJvcnQuc3BsaWNlKGN0eC5hYm9ydC5pbmRleE9mKGFib3J0KSwgMSlcbiAgICAgIH0sIDI3NSlcbiAgICB9LCAyNTApXG4gIH0sIDUwKVxufVxuXG5mdW5jdGlvbiB1cGRhdGVNb2RpZmllcnMgKGN0eCwgeyBtb2RpZmllcnMsIHZhbHVlLCBhcmcgfSkge1xuICBjb25zdCBjZmcgPSBPYmplY3QuYXNzaWduKHt9LCBjdHguY2ZnLnJpcHBsZSwgbW9kaWZpZXJzLCB2YWx1ZSlcbiAgY3R4Lm1vZGlmaWVycyA9IHtcbiAgICBlYXJseTogY2ZnLmVhcmx5ID09PSB0cnVlLFxuICAgIHN0b3A6IGNmZy5zdG9wID09PSB0cnVlLFxuICAgIGNlbnRlcjogY2ZnLmNlbnRlciA9PT0gdHJ1ZSxcbiAgICBjb2xvcjogY2ZnLmNvbG9yIHx8IGFyZyxcbiAgICBrZXlDb2RlczogW10uY29uY2F0KGNmZy5rZXlDb2RlcyB8fCAxMylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEaXJlY3RpdmUoX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8geyBuYW1lOiAncmlwcGxlJywgZ2V0U1NSUHJvcHMgfVxuICA6IHtcbiAgICAgIG5hbWU6ICdyaXBwbGUnLFxuXG4gICAgICBiZWZvcmVNb3VudCAoZWwsIGJpbmRpbmcpIHtcbiAgICAgICAgY29uc3QgY2ZnID0gYmluZGluZy5pbnN0YW5jZS4kLmFwcENvbnRleHQuY29uZmlnLmdsb2JhbFByb3BlcnRpZXMuJHEuY29uZmlnIHx8IHt9XG5cbiAgICAgICAgaWYgKGNmZy5yaXBwbGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgY2ZnLFxuICAgICAgICAgIGVuYWJsZWQ6IGJpbmRpbmcudmFsdWUgIT09IGZhbHNlLFxuICAgICAgICAgIG1vZGlmaWVyczoge30sXG4gICAgICAgICAgYWJvcnQ6IFtdLFxuXG4gICAgICAgICAgc3RhcnQgKGV2dCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZW5hYmxlZCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBldnQucVNraXBSaXBwbGUgIT09IHRydWVcbiAgICAgICAgICAgICAgJiYgZXZ0LnR5cGUgPT09IChjdHgubW9kaWZpZXJzLmVhcmx5ID09PSB0cnVlID8gJ3BvaW50ZXJkb3duJyA6ICdjbGljaycpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgc2hvd1JpcHBsZShldnQsIGVsLCBjdHgsIGV2dC5xS2V5RXZlbnQgPT09IHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIGtleXN0YXJ0OiB0aHJvdHRsZShldnQgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZW5hYmxlZCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBldnQucVNraXBSaXBwbGUgIT09IHRydWVcbiAgICAgICAgICAgICAgJiYgaXNLZXlDb2RlKGV2dCwgY3R4Lm1vZGlmaWVycy5rZXlDb2RlcykgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgZXZ0LnR5cGUgPT09IGBrZXkkeyBjdHgubW9kaWZpZXJzLmVhcmx5ID09PSB0cnVlID8gJ2Rvd24nIDogJ3VwJyB9YFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHNob3dSaXBwbGUoZXZ0LCBlbCwgY3R4LCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDMwMClcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZU1vZGlmaWVycyhjdHgsIGJpbmRpbmcpXG5cbiAgICAgICAgZWwuX19xcmlwcGxlID0gY3R4XG5cbiAgICAgICAgYWRkRXZ0KGN0eCwgJ21haW4nLCBbXG4gICAgICAgICAgWyBlbCwgJ3BvaW50ZXJkb3duJywgJ3N0YXJ0JywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyBlbCwgJ2NsaWNrJywgJ3N0YXJ0JywgJ3Bhc3NpdmUnIF0sXG4gICAgICAgICAgWyBlbCwgJ2tleWRvd24nLCAna2V5c3RhcnQnLCAncGFzc2l2ZScgXSxcbiAgICAgICAgICBbIGVsLCAna2V5dXAnLCAna2V5c3RhcnQnLCAncGFzc2l2ZScgXVxuICAgICAgICBdKVxuICAgICAgfSxcblxuICAgICAgdXBkYXRlZCAoZWwsIGJpbmRpbmcpIHtcbiAgICAgICAgaWYgKGJpbmRpbmcub2xkVmFsdWUgIT09IGJpbmRpbmcudmFsdWUpIHtcbiAgICAgICAgICBjb25zdCBjdHggPSBlbC5fX3FyaXBwbGVcbiAgICAgICAgICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgIGN0eC5lbmFibGVkID0gYmluZGluZy52YWx1ZSAhPT0gZmFsc2VcblxuICAgICAgICAgICAgaWYgKGN0eC5lbmFibGVkID09PSB0cnVlICYmIE9iamVjdChiaW5kaW5nLnZhbHVlKSA9PT0gYmluZGluZy52YWx1ZSkge1xuICAgICAgICAgICAgICB1cGRhdGVNb2RpZmllcnMoY3R4LCBiaW5kaW5nKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgYmVmb3JlVW5tb3VudCAoZWwpIHtcbiAgICAgICAgY29uc3QgY3R4ID0gZWwuX19xcmlwcGxlXG4gICAgICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgICAgIGN0eC5hYm9ydC5mb3JFYWNoKGZuID0+IHsgZm4oKSB9KVxuICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ21haW4nKVxuICAgICAgICAgIGRlbGV0ZSBlbC5fcXJpcHBsZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuKVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmV4cG9ydCBjb25zdCBhbGlnbk1hcCA9IHtcbiAgbGVmdDogJ3N0YXJ0JyxcbiAgY2VudGVyOiAnY2VudGVyJyxcbiAgcmlnaHQ6ICdlbmQnLFxuICBiZXR3ZWVuOiAnYmV0d2VlbicsXG4gIGFyb3VuZDogJ2Fyb3VuZCcsXG4gIGV2ZW5seTogJ2V2ZW5seScsXG4gIHN0cmV0Y2g6ICdzdHJldGNoJ1xufVxuXG5leHBvcnQgY29uc3QgYWxpZ25WYWx1ZXMgPSBPYmplY3Qua2V5cyhhbGlnbk1hcClcblxuZXhwb3J0IGNvbnN0IHVzZUFsaWduUHJvcHMgPSB7XG4gIGFsaWduOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIHZhbGlkYXRvcjogdiA9PiBhbGlnblZhbHVlcy5pbmNsdWRlcyh2KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcykge1xuICAvLyByZXR1cm4gYWxpZ25DbGFzc1xuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGFsaWduID0gcHJvcHMuYWxpZ24gPT09IHZvaWQgMFxuICAgICAgPyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdzdHJldGNoJyA6ICdsZWZ0J1xuICAgICAgOiBwcm9wcy5hbGlnblxuXG4gICAgcmV0dXJuIGAkeyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdpdGVtcycgOiAnanVzdGlmeScgfS0keyBhbGlnbk1hcFsgYWxpZ24gXSB9YFxuICB9KVxufVxuIiwiXG4vLyBjb3BpZWQgdG8gZG9jcyB0b29cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJlbnRQcm94eSAocHJveHkpIHtcbiAgaWYgKE9iamVjdChwcm94eS4kcGFyZW50KSA9PT0gcHJveHkuJHBhcmVudCkge1xuICAgIHJldHVybiBwcm94eS4kcGFyZW50XG4gIH1cblxuICBsZXQgeyBwYXJlbnQgfSA9IHByb3h5LiRcblxuICB3aGlsZSAoT2JqZWN0KHBhcmVudCkgPT09IHBhcmVudCkge1xuICAgIGlmIChPYmplY3QocGFyZW50LnByb3h5KSA9PT0gcGFyZW50LnByb3h5KSB7XG4gICAgICByZXR1cm4gcGFyZW50LnByb3h5XG4gICAgfVxuXG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudFxuICB9XG59XG5cbmZ1bmN0aW9uIGZpbGxOb3JtYWxpemVkVk5vZGVzIChjaGlsZHJlbiwgdm5vZGUpIHtcbiAgaWYgKHR5cGVvZiB2bm9kZS50eXBlID09PSAnc3ltYm9sJykge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZub2RlLmNoaWxkcmVuKSA9PT0gdHJ1ZSkge1xuICAgICAgdm5vZGUuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIGZpbGxOb3JtYWxpemVkVk5vZGVzKGNoaWxkcmVuLCBjaGlsZClcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIGNoaWxkcmVuLmFkZCh2bm9kZSlcbiAgfVxufVxuXG4vLyB2bm9kZXMgZnJvbSByZW5kZXJlZCBpbiBhZHZhbmNlZCBzbG90c1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5vcm1hbGl6ZWRWTm9kZXMgKHZub2Rlcykge1xuICBjb25zdCBjaGlsZHJlbiA9IG5ldyBTZXQoKVxuXG4gIHZub2Rlcy5mb3JFYWNoKHZub2RlID0+IHtcbiAgICBmaWxsTm9ybWFsaXplZFZOb2RlcyhjaGlsZHJlbiwgdm5vZGUpXG4gIH0pXG5cbiAgcmV0dXJuIEFycmF5LmZyb20oY2hpbGRyZW4pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2bUhhc1JvdXRlciAodm0pIHtcbiAgcmV0dXJuIHZtLmFwcENvbnRleHQuY29uZmlnLmdsb2JhbFByb3BlcnRpZXMuJHJvdXRlciAhPT0gdm9pZCAwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2bUlzRGVzdHJveWVkICh2bSkge1xuICByZXR1cm4gdm0uaXNVbm1vdW50ZWQgPT09IHRydWUgfHwgdm0uaXNEZWFjdGl2YXRlZCA9PT0gdHJ1ZVxufVxuIiwiLypcbiAqIEluc3BpcmVkIGJ5IFJvdXRlckxpbmsgZnJvbSBWdWUgUm91dGVyXG4gKiAgLS0+IEFQSSBzaG91bGQgbWF0Y2ghXG4gKi9cblxuaW1wb3J0IHsgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgdm1IYXNSb3V0ZXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3ZtLmpzJ1xuXG4vLyBHZXQgdGhlIG9yaWdpbmFsIHBhdGggdmFsdWUgb2YgYSByZWNvcmQgYnkgZm9sbG93aW5nIGl0cyBhbGlhc09mXG5mdW5jdGlvbiBnZXRPcmlnaW5hbFBhdGggKHJlY29yZCkge1xuICByZXR1cm4gcmVjb3JkXG4gICAgPyAoXG4gICAgICAgIHJlY29yZC5hbGlhc09mXG4gICAgICAgICAgPyByZWNvcmQuYWxpYXNPZi5wYXRoXG4gICAgICAgICAgOiByZWNvcmQucGF0aFxuICAgICAgKSA6ICcnXG59XG5cbmZ1bmN0aW9uIGlzU2FtZVJvdXRlUmVjb3JkIChhLCBiKSB7XG4gIC8vIHNpbmNlIHRoZSBvcmlnaW5hbCByZWNvcmQgaGFzIGFuIHVuZGVmaW5lZCB2YWx1ZSBmb3IgYWxpYXNPZlxuICAvLyBidXQgYWxsIGFsaWFzZXMgcG9pbnQgdG8gdGhlIG9yaWdpbmFsIHJlY29yZCwgdGhpcyB3aWxsIGFsd2F5cyBjb21wYXJlXG4gIC8vIHRoZSBvcmlnaW5hbCByZWNvcmRcbiAgcmV0dXJuIChhLmFsaWFzT2YgfHwgYSkgPT09IChiLmFsaWFzT2YgfHwgYilcbn1cblxuZnVuY3Rpb24gaW5jbHVkZXNQYXJhbXMgKG91dGVyLCBpbm5lcikge1xuICBmb3IgKGNvbnN0IGtleSBpbiBpbm5lcikge1xuICAgIGNvbnN0XG4gICAgICBpbm5lclZhbHVlID0gaW5uZXJbIGtleSBdLFxuICAgICAgb3V0ZXJWYWx1ZSA9IG91dGVyWyBrZXkgXVxuXG4gICAgaWYgKHR5cGVvZiBpbm5lclZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKGlubmVyVmFsdWUgIT09IG91dGVyVmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgQXJyYXkuaXNBcnJheShvdXRlclZhbHVlKSA9PT0gZmFsc2VcbiAgICAgIHx8IG91dGVyVmFsdWUubGVuZ3RoICE9PSBpbm5lclZhbHVlLmxlbmd0aFxuICAgICAgfHwgaW5uZXJWYWx1ZS5zb21lKCh2YWx1ZSwgaSkgPT4gdmFsdWUgIT09IG91dGVyVmFsdWVbIGkgXSlcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGlzRXF1aXZhbGVudEFycmF5IChhLCBiKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGIpID09PSB0cnVlXG4gICAgPyBhLmxlbmd0aCA9PT0gYi5sZW5ndGggJiYgYS5ldmVyeSgodmFsdWUsIGkpID0+IHZhbHVlID09PSBiWyBpIF0pXG4gICAgOiBhLmxlbmd0aCA9PT0gMSAmJiBhWyAwIF0gPT09IGJcbn1cblxuZnVuY3Rpb24gaXNTYW1lUm91dGVMb2NhdGlvblBhcmFtc1ZhbHVlIChhLCBiKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGEpID09PSB0cnVlXG4gICAgPyBpc0VxdWl2YWxlbnRBcnJheShhLCBiKVxuICAgIDogKFxuICAgICAgICBBcnJheS5pc0FycmF5KGIpID09PSB0cnVlXG4gICAgICAgICAgPyBpc0VxdWl2YWxlbnRBcnJheShiLCBhKVxuICAgICAgICAgIDogYSA9PT0gYlxuICAgICAgKVxufVxuXG5mdW5jdGlvbiBpc1NhbWVSb3V0ZUxvY2F0aW9uUGFyYW1zIChhLCBiKSB7XG4gIGlmIChPYmplY3Qua2V5cyhhKS5sZW5ndGggIT09IE9iamVjdC5rZXlzKGIpLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZm9yIChjb25zdCBrZXkgaW4gYSkge1xuICAgIGlmIChpc1NhbWVSb3V0ZUxvY2F0aW9uUGFyYW1zVmFsdWUoYVsga2V5IF0sIGJbIGtleSBdKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBjb25zdCB1c2VSb3V0ZXJMaW5rUHJvcHMgPSB7XG4gIC8vIHJvdXRlci1saW5rXG4gIHRvOiBbIFN0cmluZywgT2JqZWN0IF0sXG4gIHJlcGxhY2U6IEJvb2xlYW4sXG4gIGV4YWN0OiBCb29sZWFuLFxuICBhY3RpdmVDbGFzczoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAncS1yb3V0ZXItbGluay0tYWN0aXZlJ1xuICB9LFxuICBleGFjdEFjdGl2ZUNsYXNzOiB7XG4gICAgdHlwZTogU3RyaW5nLFxuICAgIGRlZmF1bHQ6ICdxLXJvdXRlci1saW5rLS1leGFjdC1hY3RpdmUnXG4gIH0sXG5cbiAgLy8gcmVndWxhciA8YT4gbGlua1xuICBocmVmOiBTdHJpbmcsXG4gIHRhcmdldDogU3RyaW5nLFxuXG4gIC8vIHN0YXRlXG4gIGRpc2FibGU6IEJvb2xlYW5cbn1cblxuLy8gZXh0ZXJuYWwgcHJvcHM6IHR5cGUsIHRhZ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoeyBmYWxsYmFja1RhZywgdXNlRGlzYWJsZUZvclJvdXRlckxpbmtQcm9wcyA9IHRydWUgfSA9IHt9KSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgcHJveHksIGVtaXQgfSA9IHZtXG5cbiAgY29uc3QgaGFzUm91dGVyID0gdm1IYXNSb3V0ZXIodm0pXG4gIGNvbnN0IGhhc0hyZWZMaW5rID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZSAmJiBwcm9wcy5ocmVmICE9PSB2b2lkIDApXG5cbiAgLy8gZm9yIHBlcmYgcmVhc29ucywgd2UgdXNlIG1pbmltdW0gYW1vdW50IG9mIHJ1bnRpbWUgd29ya1xuICBjb25zdCBoYXNSb3V0ZXJMaW5rUHJvcHMgPSB1c2VEaXNhYmxlRm9yUm91dGVyTGlua1Byb3BzID09PSB0cnVlXG4gICAgPyBjb21wdXRlZCgoKSA9PlxuICAgICAgaGFzUm91dGVyID09PSB0cnVlXG4gICAgICAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgICAmJiBoYXNIcmVmTGluay52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMudG8gIT09IHZvaWQgMCAmJiBwcm9wcy50byAhPT0gbnVsbCAmJiBwcm9wcy50byAhPT0gJydcbiAgICApXG4gICAgOiBjb21wdXRlZCgoKSA9PlxuICAgICAgaGFzUm91dGVyID09PSB0cnVlXG4gICAgICAmJiBoYXNIcmVmTGluay52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMudG8gIT09IHZvaWQgMCAmJiBwcm9wcy50byAhPT0gbnVsbCAmJiBwcm9wcy50byAhPT0gJydcbiAgICApXG5cbiAgY29uc3QgcmVzb2x2ZWRMaW5rID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGhhc1JvdXRlckxpbmtQcm9wcy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyBnZXRMaW5rKHByb3BzLnRvKVxuICAgICAgOiBudWxsXG4gICkpXG5cbiAgY29uc3QgaGFzUm91dGVyTGluayA9IGNvbXB1dGVkKCgpID0+IHJlc29sdmVkTGluay52YWx1ZSAhPT0gbnVsbClcbiAgY29uc3QgaGFzTGluayA9IGNvbXB1dGVkKCgpID0+IGhhc0hyZWZMaW5rLnZhbHVlID09PSB0cnVlIHx8IGhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWUpXG5cbiAgY29uc3QgbGlua1RhZyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy50eXBlID09PSAnYScgfHwgaGFzTGluay52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyAnYSdcbiAgICAgIDogKHByb3BzLnRhZyB8fCBmYWxsYmFja1RhZyB8fCAnZGl2JylcbiAgKSlcblxuICBjb25zdCBsaW5rQXR0cnMgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgaGFzSHJlZkxpbmsudmFsdWUgPT09IHRydWVcbiAgICAgID8ge1xuICAgICAgICAgIGhyZWY6IHByb3BzLmhyZWYsXG4gICAgICAgICAgdGFyZ2V0OiBwcm9wcy50YXJnZXRcbiAgICAgICAgfVxuICAgICAgOiAoXG4gICAgICAgICAgaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgaHJlZjogcmVzb2x2ZWRMaW5rLnZhbHVlLmhyZWYsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBwcm9wcy50YXJnZXRcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB7fVxuICAgICAgICApXG4gICkpXG5cbiAgY29uc3QgbGlua0FjdGl2ZUluZGV4ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGlmIChoYXNSb3V0ZXJMaW5rLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuXG4gICAgY29uc3RcbiAgICAgIHsgbWF0Y2hlZCB9ID0gcmVzb2x2ZWRMaW5rLnZhbHVlLFxuICAgICAgeyBsZW5ndGggfSA9IG1hdGNoZWQsXG4gICAgICByb3V0ZU1hdGNoZWQgPSBtYXRjaGVkWyBsZW5ndGggLSAxIF1cblxuICAgIGlmIChyb3V0ZU1hdGNoZWQgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudE1hdGNoZWQgPSBwcm94eS4kcm91dGUubWF0Y2hlZFxuXG4gICAgaWYgKGN1cnJlbnRNYXRjaGVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuXG4gICAgY29uc3QgaW5kZXggPSBjdXJyZW50TWF0Y2hlZC5maW5kSW5kZXgoXG4gICAgICBpc1NhbWVSb3V0ZVJlY29yZC5iaW5kKG51bGwsIHJvdXRlTWF0Y2hlZClcbiAgICApXG5cbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgcmV0dXJuIGluZGV4XG4gICAgfVxuXG4gICAgLy8gcG9zc2libGUgcGFyZW50IHJlY29yZFxuICAgIGNvbnN0IHBhcmVudFJlY29yZFBhdGggPSBnZXRPcmlnaW5hbFBhdGgobWF0Y2hlZFsgbGVuZ3RoIC0gMiBdKVxuXG4gICAgcmV0dXJuIChcbiAgICAgIC8vIHdlIGFyZSBkZWFsaW5nIHdpdGggbmVzdGVkIHJvdXRlc1xuICAgICAgbGVuZ3RoID4gMVxuICAgICAgLy8gaWYgdGhlIHBhcmVudCBhbmQgbWF0Y2hlZCByb3V0ZSBoYXZlIHRoZSBzYW1lIHBhdGgsIHRoaXMgbGluayBpc1xuICAgICAgLy8gcmVmZXJyaW5nIHRvIHRoZSBlbXB0eSBjaGlsZC4gT3Igd2UgY3VycmVudGx5IGFyZSBvbiBhIGRpZmZlcmVudFxuICAgICAgLy8gY2hpbGQgb2YgdGhlIHNhbWUgcGFyZW50XG4gICAgICAmJiBnZXRPcmlnaW5hbFBhdGgocm91dGVNYXRjaGVkKSA9PT0gcGFyZW50UmVjb3JkUGF0aFxuICAgICAgLy8gYXZvaWQgY29tcGFyaW5nIHRoZSBjaGlsZCB3aXRoIGl0cyBwYXJlbnRcbiAgICAgICYmIGN1cnJlbnRNYXRjaGVkWyBjdXJyZW50TWF0Y2hlZC5sZW5ndGggLSAxIF0ucGF0aCAhPT0gcGFyZW50UmVjb3JkUGF0aFxuICAgICAgICA/IGN1cnJlbnRNYXRjaGVkLmZpbmRJbmRleChcbiAgICAgICAgICBpc1NhbWVSb3V0ZVJlY29yZC5iaW5kKG51bGwsIG1hdGNoZWRbIGxlbmd0aCAtIDIgXSlcbiAgICAgICAgKVxuICAgICAgICA6IGluZGV4XG4gICAgKVxuICB9KVxuXG4gIGNvbnN0IGxpbmtJc0FjdGl2ZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZVxuICAgICYmIGxpbmtBY3RpdmVJbmRleC52YWx1ZSAhPT0gLTFcbiAgICAmJiBpbmNsdWRlc1BhcmFtcyhwcm94eS4kcm91dGUucGFyYW1zLCByZXNvbHZlZExpbmsudmFsdWUucGFyYW1zKVxuICApXG5cbiAgY29uc3QgbGlua0lzRXhhY3RBY3RpdmUgPSBjb21wdXRlZCgoKSA9PlxuICAgIGxpbmtJc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgbGlua0FjdGl2ZUluZGV4LnZhbHVlID09PSBwcm94eS4kcm91dGUubWF0Y2hlZC5sZW5ndGggLSAxXG4gICAgICAmJiBpc1NhbWVSb3V0ZUxvY2F0aW9uUGFyYW1zKHByb3h5LiRyb3V0ZS5wYXJhbXMsIHJlc29sdmVkTGluay52YWx1ZS5wYXJhbXMpXG4gIClcblxuICBjb25zdCBsaW5rQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgPyAoXG4gICAgICAgICAgbGlua0lzRXhhY3RBY3RpdmUudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgID8gYCAkeyBwcm9wcy5leGFjdEFjdGl2ZUNsYXNzIH0gJHsgcHJvcHMuYWN0aXZlQ2xhc3MgfWBcbiAgICAgICAgICAgIDogKFxuICAgICAgICAgICAgICAgIHByb3BzLmV4YWN0ID09PSB0cnVlXG4gICAgICAgICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICAgICAgICA6IChsaW5rSXNBY3RpdmUudmFsdWUgPT09IHRydWUgPyBgICR7IHByb3BzLmFjdGl2ZUNsYXNzIH1gIDogJycpXG4gICAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgOiAnJ1xuICApKVxuXG4gIGZ1bmN0aW9uIGdldExpbmsgKHRvKSB7XG4gICAgdHJ5IHsgcmV0dXJuIHByb3h5LiRyb3V0ZXIucmVzb2x2ZSh0bykgfVxuICAgIGNhdGNoIChfKSB7fVxuXG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyBQcm9taXNlPFJvdXRlckVycm9yIHwgZmFsc2UgfCB1bmRlZmluZWQ+XG4gICAqL1xuICBmdW5jdGlvbiBuYXZpZ2F0ZVRvUm91dGVyTGluayAoXG4gICAgZSxcbiAgICB7IHJldHVyblJvdXRlckVycm9yLCB0byA9IHByb3BzLnRvLCByZXBsYWNlID0gcHJvcHMucmVwbGFjZSB9ID0ge31cbiAgKSB7XG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIC8vIGVuc3VyZSBuYXRpdmUgbmF2aWdhdGlvbiBpcyBwcmV2ZW50ZWQgaW4gYWxsIGNhc2VzLFxuICAgICAgLy8gbGlrZSB3aGVuIHVzZURpc2FibGVGb3JSb3V0ZXJMaW5rUHJvcHMgPT09IGZhbHNlIChRUm91dGVUYWIpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpXG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgLy8gZG9uJ3QgcmVkaXJlY3Qgd2l0aCBjb250cm9sIGtleXM7XG4gICAgICAvLyBzaG91bGQgbWF0Y2ggUm91dGVyTGluayBmcm9tIFZ1ZSBSb3V0ZXJcbiAgICAgIGUubWV0YUtleSB8fCBlLmFsdEtleSB8fCBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleVxuXG4gICAgICAvLyBkb24ndCByZWRpcmVjdCBvbiByaWdodCBjbGlja1xuICAgICAgfHwgKGUuYnV0dG9uICE9PSB2b2lkIDAgJiYgZS5idXR0b24gIT09IDApXG5cbiAgICAgIC8vIGRvbid0IHJlZGlyZWN0IGlmIGl0IHNob3VsZCBvcGVuIGluIGEgbmV3IHdpbmRvd1xuICAgICAgfHwgcHJvcHMudGFyZ2V0ID09PSAnX2JsYW5rJ1xuICAgICkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSlcbiAgICB9XG5cbiAgICAvLyBoaW5kZXIgdGhlIG5hdGl2ZSBuYXZpZ2F0aW9uXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAvLyB0aGVuKCkgY2FuIGFsc28gcmV0dXJuIGEgXCJzb2Z0XCIgcm91dGVyIGVycm9yIChWdWUgUm91dGVyIGJlaGF2aW9yKVxuICAgIGNvbnN0IHByb21pc2UgPSBwcm94eS4kcm91dGVyWyByZXBsYWNlID09PSB0cnVlID8gJ3JlcGxhY2UnIDogJ3B1c2gnIF0odG8pXG5cbiAgICByZXR1cm4gcmV0dXJuUm91dGVyRXJyb3IgPT09IHRydWVcbiAgICAgID8gcHJvbWlzZVxuICAgICAgLy8gZWxzZSBjYXRjaGluZyBoYXJkIGVycm9ycyBhbmQgYWxzbyBcInNvZnRcIiBvbmVzIC0gdGhlbihlcnIgPT4gLi4uKVxuICAgICAgOiBwcm9taXNlLnRoZW4oKCkgPT4ge30pLmNhdGNoKCgpID0+IHt9KVxuICB9XG5cbiAgLy8gd2FybmluZyEgZW5zdXJlIHRoYXQgdGhlIGNvbXBvbmVudCB1c2luZyBpdCBoYXMgJ2NsaWNrJyBpbmNsdWRlZCBpbiBpdHMgJ2VtaXRzJyBkZWZpbml0aW9uIHByb3BcbiAgZnVuY3Rpb24gbmF2aWdhdGVPbkNsaWNrIChlKSB7XG4gICAgaWYgKGhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGdvID0gb3B0cyA9PiBuYXZpZ2F0ZVRvUm91dGVyTGluayhlLCBvcHRzKVxuXG4gICAgICBlbWl0KCdjbGljaycsIGUsIGdvKVxuICAgICAgZS5kZWZhdWx0UHJldmVudGVkICE9PSB0cnVlICYmIGdvKClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBoYXNSb3V0ZXJMaW5rLFxuICAgIGhhc0hyZWZMaW5rLFxuICAgIGhhc0xpbmssXG5cbiAgICBsaW5rVGFnLFxuICAgIHJlc29sdmVkTGluayxcbiAgICBsaW5rSXNBY3RpdmUsXG4gICAgbGlua0lzRXhhY3RBY3RpdmUsXG4gICAgbGlua0NsYXNzLFxuICAgIGxpbmtBdHRycyxcblxuICAgIGdldExpbmssXG4gICAgbmF2aWdhdGVUb1JvdXRlckxpbmssXG4gICAgbmF2aWdhdGVPbkNsaWNrXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJtYXRjaGVzIiwiY3NzIl0sIm1hcHBpbmdzIjoiOztBQUVZLE1BQUMsa0JBQWtCO0FBQUEsRUFDN0IsSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUNOO0FBRVksTUFBQyxlQUFlO0FBQUEsRUFDMUIsTUFBTTtBQUNSO0FBRWUsU0FBQSxRQUFVLE9BQU8sUUFBUSxpQkFBaUI7QUFFdkQsU0FBTyxTQUFTLE1BQ2QsTUFBTSxTQUFTLFNBQ1gsRUFBRSxVQUFVLE1BQU0sUUFBUSxRQUFRLEdBQUksTUFBTyxNQUFNLFlBQWMsTUFBTSxLQUFNLElBQzdFLElBQ0w7QUFDSDtBQ2RBLE1BQU0saUJBQWlCO0FBRXZCLE1BQU0sU0FBUyxPQUFLO0FBQ3BCLE1BQU0sUUFBUSxPQUFLLFlBQWE7QUFFaEMsTUFBTSxTQUFTO0FBQUEsRUFDYixRQUFRLE9BQUssT0FBUTtBQUFBLEVBQ3JCLFNBQVM7QUFBQSxFQUNULE9BQU8sT0FBSyxNQUFPO0FBQUEsRUFDbkIsUUFBUSxPQUFLLE9BQVE7QUFBQSxFQUNyQixVQUFVO0FBQUEsRUFDVixXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixhQUFhO0FBQUEsRUFDYixPQUFPLE9BQUssZ0JBQWlCO0FBQUEsRUFDN0IsT0FBTyxPQUFLLG1CQUFvQjtBQUNsQztBQUVBLE1BQU0sU0FBUztBQUFBLEVBQ2IsSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUNOO0FBRUEsTUFBTSxTQUFTO0FBQUEsRUFDYixRQUFRO0FBQUEsRUFDUixRQUFRO0FBQUEsRUFDUixRQUFRO0FBQ1Y7QUFFQSxNQUFNLFFBQVEsSUFBSSxPQUFPLE9BQU8sT0FBTyxLQUFLLE1BQU0sRUFBRSxLQUFLLEdBQUcsSUFBSSxHQUFHO0FBQ25FLE1BQU0sUUFBUSxJQUFJLE9BQU8sT0FBTyxPQUFPLEtBQUssTUFBTSxFQUFFLEtBQUssR0FBRyxJQUFJLEdBQUc7QUFDbkUsTUFBTSxRQUFRLElBQUksT0FBTyxPQUFPLE9BQU8sS0FBSyxNQUFNLEVBQUUsS0FBSyxHQUFHLElBQUksR0FBRztBQUNuRSxNQUFNLE1BQU07QUFDWixNQUFNLFFBQVE7QUFDZCxNQUFNLFdBQVc7QUFDakIsTUFBTSxRQUFRO0FBQ2QsTUFBTSxPQUFPO0FBRWIsSUFBQSxRQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUVILEtBQUs7QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFFRCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUksRUFBQSxJQUFLLG1CQUFvQjtBQUM5QyxVQUFNLFlBQVksUUFBUSxLQUFLO0FBRS9CLFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIsWUFDRyxNQUFNLFNBQVMsT0FBTyxhQUFhLE9BQ25DLE1BQU0sVUFBVSxPQUFPLGNBQWMsT0FDckMsTUFBTSxVQUFVLFNBQVMsU0FBVSxNQUFNLFVBQVc7QUFBQSxJQUN4RDtBQUVELFVBQU0sT0FBTyxTQUFTLE1BQU07QUFDMUIsVUFBSTtBQUNKLFVBQUksT0FBTyxNQUFNO0FBRWpCLFVBQUksU0FBUyxVQUFVLENBQUMsTUFBTTtBQUM1QixlQUFPLEVBQUUsTUFBTSxLQUFNO0FBQUEsTUFDdEI7QUFFRCxVQUFJLEdBQUcsY0FBYyxNQUFNO0FBQ3pCLGNBQU0sTUFBTSxHQUFHLFVBQVUsSUFBSTtBQUM3QixZQUFJLFFBQVEsUUFBUTtBQUNsQixjQUFJLElBQUksU0FBUyxRQUFRO0FBQ3ZCLG1CQUFPLElBQUk7QUFDWCxnQkFBSSxTQUFTLFVBQVUsQ0FBQyxNQUFNO0FBQzVCLHFCQUFPLEVBQUUsTUFBTSxLQUFNO0FBQUEsWUFDdEI7QUFBQSxVQUNGLE9BQ0k7QUFDSCxtQkFBTztBQUFBLGNBQ0wsS0FBSyxJQUFJO0FBQUEsY0FDVCxTQUFTLElBQUksWUFBWSxTQUNyQixJQUFJLFVBQ0o7QUFBQSxZQUNMO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUQsVUFBSSxJQUFJLEtBQUssSUFBSSxNQUFNLE1BQU07QUFDM0IsY0FBTSxDQUFFLEtBQUssVUFBVSxjQUFnQixJQUFHLEtBQUssTUFBTSxHQUFHO0FBRXhELGVBQU87QUFBQSxVQUNMLEtBQUs7QUFBQSxVQUNMO0FBQUEsVUFDQSxPQUFPLElBQUksTUFBTSxJQUFJLEVBQUUsSUFBSSxVQUFRO0FBQ2pDLGtCQUFNLENBQUUsR0FBRyxPQUFPLFNBQVcsSUFBRyxLQUFLLE1BQU0sSUFBSTtBQUMvQyxtQkFBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEdBQUcsVUFBUyxDQUFFO0FBQUEsVUFDcEQsQ0FBVztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUQsVUFBSSxNQUFNLEtBQUssSUFBSSxNQUFNLE1BQU07QUFDN0IsZUFBTztBQUFBLFVBQ0wsS0FBSztBQUFBLFVBQ0wsS0FBSyxLQUFLLFVBQVUsQ0FBQztBQUFBLFFBQ3RCO0FBQUEsTUFDRjtBQUVELFVBQUksU0FBUyxLQUFLLElBQUksTUFBTSxNQUFNO0FBQ2hDLGNBQU0sQ0FBRSxLQUFLLFVBQVUsY0FBZ0IsSUFBRyxLQUFLLE1BQU0sR0FBRztBQUV4RCxlQUFPO0FBQUEsVUFDTCxRQUFRO0FBQUEsVUFDUixLQUFLLElBQUksVUFBVSxDQUFDO0FBQUEsVUFDcEI7QUFBQSxRQUNEO0FBQUEsTUFDRjtBQUVELFVBQUksVUFBVTtBQUNkLFlBQU0sVUFBVSxLQUFLLE1BQU0sS0FBSztBQUVoQyxVQUFJLFlBQVksTUFBTTtBQUNwQixjQUFNLE9BQVEsUUFBUyxJQUFNLElBQUk7QUFBQSxNQUNsQyxXQUNRLEtBQUssS0FBSyxJQUFJLE1BQU0sTUFBTTtBQUNqQyxjQUFNO0FBQUEsTUFDUCxXQUNRLE1BQU0sS0FBSyxJQUFJLE1BQU0sTUFBTTtBQUNsQyxjQUFNLGdCQUFpQixHQUFHLFNBQVMsR0FBRyxRQUFRLE9BQU8sUUFBUSxPQUFTLEtBQUssVUFBVSxDQUFDO0FBQUEsTUFDdkYsV0FDUSxNQUFNLEtBQUssSUFBSSxNQUFNLE1BQU07QUFNbEMsY0FBTTtBQUVOLGNBQU1BLFdBQVUsS0FBSyxNQUFNLEtBQUs7QUFDaEMsWUFBSUEsYUFBWSxNQUFNO0FBQ3BCLGlCQUFPLEtBQUssVUFBVSxDQUFDO0FBQ3ZCLGlCQUFPLE9BQVFBLFNBQVM7QUFBQSxRQUN6QjtBQUVELGtCQUFVO0FBQUEsTUFDWCxPQUNJO0FBTUgsY0FBTTtBQUVOLGNBQU1BLFdBQVUsS0FBSyxNQUFNLEtBQUs7QUFDaEMsWUFBSUEsYUFBWSxNQUFNO0FBQ3BCLGlCQUFPLEtBQUssVUFBVSxDQUFDO0FBQ3ZCLGlCQUFPLE9BQVFBLFNBQVM7QUFBQSxRQUN6QjtBQUVELGtCQUFVO0FBQUEsTUFDWDtBQUVELGFBQU87QUFBQSxRQUNMO0FBQUEsUUFDQTtBQUFBLE1BQ0Q7QUFBQSxJQUNQLENBQUs7QUFFRCxXQUFPLE1BQU07QUFDWCxZQUFNLE9BQU87QUFBQSxRQUNYLE9BQU8sUUFBUTtBQUFBLFFBQ2YsT0FBTyxVQUFVO0FBQUEsUUFDakIsZUFBZTtBQUFBLFFBQ2YsTUFBTTtBQUFBLE1BQ1A7QUFFRCxVQUFJLEtBQUssTUFBTSxTQUFTLE1BQU07QUFDNUIsZUFBTyxFQUFFLE1BQU0sS0FBSyxNQUFNLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBQSxNQUMvQztBQUVELFVBQUksS0FBSyxNQUFNLFFBQVEsTUFBTTtBQUMzQixlQUFPLEVBQUUsUUFBUSxNQUFNLFdBQVcsTUFBTSxTQUFTO0FBQUEsVUFDL0MsRUFBRSxPQUFPLEVBQUUsS0FBSyxLQUFLLE1BQU0sS0FBSztBQUFBLFFBQzFDLENBQVMsQ0FBQztBQUFBLE1BQ0g7QUFFRCxVQUFJLEtBQUssTUFBTSxRQUFRLE1BQU07QUFDM0IsZUFBTyxFQUFFLFFBQVEsTUFBTSxXQUFXLE1BQU0sU0FBUztBQUFBLFVBQy9DLEVBQUUsT0FBTztBQUFBLFlBQ1AsU0FBUyxLQUFLLE1BQU0sV0FBVztBQUFBLFVBQzNDLEdBQWEsS0FBSyxNQUFNLEtBQUs7QUFBQSxRQUM3QixDQUFTLENBQUM7QUFBQSxNQUNIO0FBRUQsVUFBSSxLQUFLLE1BQU0sV0FBVyxNQUFNO0FBQzlCLGVBQU8sRUFBRSxRQUFRLE1BQU0sV0FBVyxNQUFNLFNBQVM7QUFBQSxVQUMvQyxFQUFFLE9BQU87QUFBQSxZQUNQLFNBQVMsS0FBSyxNQUFNO0FBQUEsVUFDaEMsR0FBYTtBQUFBLFlBQ0QsRUFBRSxPQUFPLEVBQUUsY0FBYyxLQUFLLE1BQU0sS0FBSztBQUFBLFVBQ3JELENBQVc7QUFBQSxRQUNYLENBQVMsQ0FBQztBQUFBLE1BQ0g7QUFFRCxVQUFJLEtBQUssTUFBTSxRQUFRLFFBQVE7QUFDN0IsYUFBSyxTQUFTLE1BQU0sS0FBSyxNQUFNO0FBQUEsTUFDaEM7QUFFRCxhQUFPLEVBQUUsTUFBTSxLQUFLLE1BQU0sV0FBVyxNQUFNLFNBQVM7QUFBQSxRQUNsRCxLQUFLLE1BQU07QUFBQSxNQUNuQixDQUFPLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNILENBQUM7QUMxTU0sU0FBUyxJQUFLLFNBQVNDLE1BQUs7QUFDakMsUUFBTSxRQUFRLFFBQVE7QUFFdEIsYUFBVyxRQUFRQSxNQUFLO0FBQ3RCLFVBQU8sUUFBU0EsS0FBSztBQUFBLEVBQ3RCO0FBQ0g7QUFtQk8sU0FBUyxXQUFZLElBQUk7QUFDOUIsTUFBSSxPQUFPLFVBQVUsT0FBTyxNQUFNO0FBQ2hDLFdBQU87QUFBQSxFQUNSO0FBRUQsTUFBSSxPQUFPLE9BQU8sVUFBVTtBQUMxQixRQUFJO0FBQ0YsYUFBTyxTQUFTLGNBQWMsRUFBRSxLQUFLO0FBQUEsSUFDdEMsU0FDTSxLQUFQO0FBQ0UsYUFBTztBQUFBLElBQ1I7QUFBQSxFQUNGO0FBRUQsUUFBTSxTQUFTLE1BQU0sRUFBRTtBQUN2QixNQUFJLFFBQVE7QUFDVixXQUFPLE9BQU8sT0FBTztBQUFBLEVBQ3RCO0FBQ0g7QUNyRWUsU0FBQSxTQUFVLElBQUksUUFBUSxLQUFLO0FBQ3hDLE1BQUksT0FBTyxPQUFPO0FBRWxCLFNBQU8sV0FBeUI7QUFDOUIsUUFBSSxTQUFTLE9BQU87QUFDbEIsYUFBTztBQUNQLGlCQUFXLE1BQU07QUFBRSxlQUFPO0FBQUEsTUFBSyxHQUFJLEtBQUs7QUFDeEMsZUFBUyxHQUFHLE1BQU0sTUFBTSxTQUFTO0FBQUEsSUFDbEM7QUFFRCxXQUFPO0FBQUEsRUFDUjtBQUNIO0FDTEEsU0FBUyxXQUFZLEtBQUssSUFBSSxLQUFLLGFBQWE7QUFDOUMsTUFBSSxVQUFVLFNBQVMsUUFBUSxLQUFLLEdBQUc7QUFFdkMsUUFBTSxRQUFRLElBQUksVUFBVTtBQUM1QixNQUFJLFNBQVMsSUFBSSxVQUFVO0FBQzNCLFdBQVMsV0FBVyxRQUFRLGdCQUFnQjtBQUU1QyxRQUNFLE9BQU8sU0FBUyxjQUFjLE1BQU0sR0FDcEMsWUFBWSxTQUFTLGNBQWMsTUFBTSxHQUN6QyxNQUFNLFNBQVMsR0FBRyxHQUNsQixFQUFFLE1BQU0sS0FBSyxPQUFPLE9BQVEsSUFBRyxHQUFHLHNCQUF1QixHQUN6RCxXQUFXLEtBQUssS0FBSyxRQUFRLFFBQVEsU0FBUyxNQUFNLEdBQ3BELFNBQVMsV0FBVyxHQUNwQixVQUFVLElBQUssUUFBUSxZQUFZLE9BQ25DLElBQUksU0FBUyxVQUFVLEdBQUksSUFBSSxPQUFPLE9BQU8sWUFDN0MsVUFBVSxJQUFLLFNBQVMsWUFBWSxPQUNwQyxJQUFJLFNBQVMsVUFBVSxHQUFJLElBQUksTUFBTSxNQUFNO0FBRTdDLFlBQVUsWUFBWTtBQUN0QixNQUFJLFdBQVc7QUFBQSxJQUNiLFFBQVEsR0FBSTtBQUFBLElBQ1osT0FBTyxHQUFJO0FBQUEsSUFDWCxXQUFXLGVBQWdCLEtBQU87QUFBQSxJQUNsQyxTQUFTO0FBQUEsRUFDYixDQUFHO0FBRUQsT0FBSyxZQUFZLFdBQVksUUFBUSxXQUFXLFFBQVE7QUFDeEQsT0FBSyxhQUFhLE9BQU8sS0FBSztBQUM5QixPQUFLLFlBQVksU0FBUztBQUMxQixLQUFHLFlBQVksSUFBSTtBQUVuQixRQUFNLFFBQVEsTUFBTTtBQUNsQixTQUFLLE9BQVE7QUFDYixpQkFBYSxLQUFLO0FBQUEsRUFDbkI7QUFDRCxNQUFJLE1BQU0sS0FBSyxLQUFLO0FBRXBCLE1BQUksUUFBUSxXQUFXLE1BQU07QUFDM0IsY0FBVSxVQUFVLElBQUksd0JBQXdCO0FBQ2hELGNBQVUsTUFBTSxZQUFZLGVBQWdCLFdBQWE7QUFDekQsY0FBVSxNQUFNLFVBQVU7QUFFMUIsWUFBUSxXQUFXLE1BQU07QUFDdkIsZ0JBQVUsVUFBVSxPQUFPLHdCQUF3QjtBQUNuRCxnQkFBVSxVQUFVLElBQUksd0JBQXdCO0FBQ2hELGdCQUFVLE1BQU0sVUFBVTtBQUUxQixjQUFRLFdBQVcsTUFBTTtBQUN2QixhQUFLLE9BQVE7QUFDYixZQUFJLE1BQU0sT0FBTyxJQUFJLE1BQU0sUUFBUSxLQUFLLEdBQUcsQ0FBQztBQUFBLE1BQzdDLEdBQUUsR0FBRztBQUFBLElBQ1AsR0FBRSxHQUFHO0FBQUEsRUFDUCxHQUFFLEVBQUU7QUFDUDtBQUVBLFNBQVMsZ0JBQWlCLEtBQUssRUFBRSxXQUFXLE9BQU8sSUFBRyxHQUFJO0FBQ3hELFFBQU0sTUFBTSxPQUFPLE9BQU8sQ0FBRSxHQUFFLElBQUksSUFBSSxRQUFRLFdBQVcsS0FBSztBQUM5RCxNQUFJLFlBQVk7QUFBQSxJQUNkLE9BQU8sSUFBSSxVQUFVO0FBQUEsSUFDckIsTUFBTSxJQUFJLFNBQVM7QUFBQSxJQUNuQixRQUFRLElBQUksV0FBVztBQUFBLElBQ3ZCLE9BQU8sSUFBSSxTQUFTO0FBQUEsSUFDcEIsVUFBVSxDQUFBLEVBQUcsT0FBTyxJQUFJLFlBQVksRUFBRTtBQUFBLEVBQ3ZDO0FBQ0g7QUFFQSxJQUFBLFNBQWU7QUFBQSxFQUVYO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFFTixZQUFhLElBQUksU0FBUztBQUN4QixZQUFNLE1BQU0sUUFBUSxTQUFTLEVBQUUsV0FBVyxPQUFPLGlCQUFpQixHQUFHLFVBQVUsQ0FBRTtBQUVqRixVQUFJLElBQUksV0FBVyxPQUFPO0FBQ3hCO0FBQUEsTUFDRDtBQUVELFlBQU0sTUFBTTtBQUFBLFFBQ1Y7QUFBQSxRQUNBLFNBQVMsUUFBUSxVQUFVO0FBQUEsUUFDM0IsV0FBVyxDQUFFO0FBQUEsUUFDYixPQUFPLENBQUU7QUFBQSxRQUVULE1BQU8sS0FBSztBQUNWLGNBQ0UsSUFBSSxZQUFZLFFBQ2IsSUFBSSxnQkFBZ0IsUUFDcEIsSUFBSSxVQUFVLElBQUksVUFBVSxVQUFVLE9BQU8sZ0JBQWdCLFVBQ2hFO0FBQ0EsdUJBQVcsS0FBSyxJQUFJLEtBQUssSUFBSSxjQUFjLElBQUk7QUFBQSxVQUNoRDtBQUFBLFFBQ0Y7QUFBQSxRQUVELFVBQVUsU0FBUyxTQUFPO0FBQ3hCLGNBQ0UsSUFBSSxZQUFZLFFBQ2IsSUFBSSxnQkFBZ0IsUUFDcEIsVUFBVSxLQUFLLElBQUksVUFBVSxRQUFRLE1BQU0sUUFDM0MsSUFBSSxTQUFTLE1BQU8sSUFBSSxVQUFVLFVBQVUsT0FBTyxTQUFTLFFBQy9EO0FBQ0EsdUJBQVcsS0FBSyxJQUFJLEtBQUssSUFBSTtBQUFBLFVBQzlCO0FBQUEsUUFDRixHQUFFLEdBQUc7QUFBQSxNQUNQO0FBRUQsc0JBQWdCLEtBQUssT0FBTztBQUU1QixTQUFHLFlBQVk7QUFFZixhQUFPLEtBQUssUUFBUTtBQUFBLFFBQ2xCLENBQUUsSUFBSSxlQUFlLFNBQVMsU0FBVztBQUFBLFFBQ3pDLENBQUUsSUFBSSxTQUFTLFNBQVMsU0FBVztBQUFBLFFBQ25DLENBQUUsSUFBSSxXQUFXLFlBQVksU0FBVztBQUFBLFFBQ3hDLENBQUUsSUFBSSxTQUFTLFlBQVksU0FBVztBQUFBLE1BQ2hELENBQVM7QUFBQSxJQUNGO0FBQUEsSUFFRCxRQUFTLElBQUksU0FBUztBQUNwQixVQUFJLFFBQVEsYUFBYSxRQUFRLE9BQU87QUFDdEMsY0FBTSxNQUFNLEdBQUc7QUFDZixZQUFJLFFBQVEsUUFBUTtBQUNsQixjQUFJLFVBQVUsUUFBUSxVQUFVO0FBRWhDLGNBQUksSUFBSSxZQUFZLFFBQVEsT0FBTyxRQUFRLEtBQUssTUFBTSxRQUFRLE9BQU87QUFDbkUsNEJBQWdCLEtBQUssT0FBTztBQUFBLFVBQzdCO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFRCxjQUFlLElBQUk7QUFDakIsWUFBTSxNQUFNLEdBQUc7QUFDZixVQUFJLFFBQVEsUUFBUTtBQUNsQixZQUFJLE1BQU0sUUFBUSxRQUFNO0FBQUUsYUFBSTtBQUFBLFFBQUEsQ0FBRTtBQUNoQyxpQkFBUyxLQUFLLE1BQU07QUFDcEIsZUFBTyxHQUFHO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0w7QUNsSk8sTUFBTSxXQUFXO0FBQUEsRUFDdEIsTUFBTTtBQUFBLEVBQ04sUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBQ1QsUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUNYO0FBRU8sTUFBTSxjQUFjLE9BQU8sS0FBSyxRQUFRO0FBRW5DLE1BQUMsZ0JBQWdCO0FBQUEsRUFDM0IsT0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sV0FBVyxPQUFLLFlBQVksU0FBUyxDQUFDO0FBQUEsRUFDdkM7QUFDSDtBQUVlLFNBQVEsU0FBRSxPQUFPO0FBRTlCLFNBQU8sU0FBUyxNQUFNO0FBQ3BCLFVBQU0sUUFBUSxNQUFNLFVBQVUsU0FDMUIsTUFBTSxhQUFhLE9BQU8sWUFBWSxTQUN0QyxNQUFNO0FBRVYsV0FBTyxHQUFJLE1BQU0sYUFBYSxPQUFPLFVBQVUsYUFBZSxTQUFVO0FBQUEsRUFDNUUsQ0FBRztBQUNIO0FDNUJPLFNBQVMsZUFBZ0IsT0FBTztBQUNyQyxNQUFJLE9BQU8sTUFBTSxPQUFPLE1BQU0sTUFBTSxTQUFTO0FBQzNDLFdBQU8sTUFBTTtBQUFBLEVBQ2Q7QUFFRCxNQUFJLEVBQUUsV0FBVyxNQUFNO0FBRXZCLFNBQU8sT0FBTyxNQUFNLE1BQU0sUUFBUTtBQUNoQyxRQUFJLE9BQU8sT0FBTyxLQUFLLE1BQU0sT0FBTyxPQUFPO0FBQ3pDLGFBQU8sT0FBTztBQUFBLElBQ2Y7QUFFRCxhQUFTLE9BQU87QUFBQSxFQUNqQjtBQUNIO0FBRUEsU0FBUyxxQkFBc0IsVUFBVSxPQUFPO0FBQzlDLE1BQUksT0FBTyxNQUFNLFNBQVMsVUFBVTtBQUNsQyxRQUFJLE1BQU0sUUFBUSxNQUFNLFFBQVEsTUFBTSxNQUFNO0FBQzFDLFlBQU0sU0FBUyxRQUFRLFdBQVM7QUFDOUIsNkJBQXFCLFVBQVUsS0FBSztBQUFBLE1BQzVDLENBQU87QUFBQSxJQUNGO0FBQUEsRUFDRixPQUNJO0FBQ0gsYUFBUyxJQUFJLEtBQUs7QUFBQSxFQUNuQjtBQUNIO0FBR08sU0FBUyxvQkFBcUIsUUFBUTtBQUMzQyxRQUFNLFdBQVcsb0JBQUksSUFBSztBQUUxQixTQUFPLFFBQVEsV0FBUztBQUN0Qix5QkFBcUIsVUFBVSxLQUFLO0FBQUEsRUFDeEMsQ0FBRztBQUVELFNBQU8sTUFBTSxLQUFLLFFBQVE7QUFDNUI7QUFFTyxTQUFTLFlBQWEsSUFBSTtBQUMvQixTQUFPLEdBQUcsV0FBVyxPQUFPLGlCQUFpQixZQUFZO0FBQzNEO0FBRU8sU0FBUyxjQUFlLElBQUk7QUFDakMsU0FBTyxHQUFHLGdCQUFnQixRQUFRLEdBQUcsa0JBQWtCO0FBQ3pEO0FDdENBLFNBQVMsZ0JBQWlCLFFBQVE7QUFDaEMsU0FBTyxTQUVELE9BQU8sVUFDSCxPQUFPLFFBQVEsT0FDZixPQUFPLE9BQ1Q7QUFDVjtBQUVBLFNBQVMsa0JBQW1CLEdBQUcsR0FBRztBQUloQyxVQUFRLEVBQUUsV0FBVyxRQUFRLEVBQUUsV0FBVztBQUM1QztBQUVBLFNBQVMsZUFBZ0IsT0FBTyxPQUFPO0FBQ3JDLGFBQVcsT0FBTyxPQUFPO0FBQ3ZCLFVBQ0UsYUFBYSxNQUFPLE1BQ3BCLGFBQWEsTUFBTztBQUV0QixRQUFJLE9BQU8sZUFBZSxVQUFVO0FBQ2xDLFVBQUksZUFBZSxZQUFZO0FBQzdCLGVBQU87QUFBQSxNQUNSO0FBQUEsSUFDRixXQUVDLE1BQU0sUUFBUSxVQUFVLE1BQU0sU0FDM0IsV0FBVyxXQUFXLFdBQVcsVUFDakMsV0FBVyxLQUFLLENBQUMsT0FBTyxNQUFNLFVBQVUsV0FBWSxFQUFHLEdBQzFEO0FBQ0EsYUFBTztBQUFBLElBQ1I7QUFBQSxFQUNGO0FBRUQsU0FBTztBQUNUO0FBRUEsU0FBUyxrQkFBbUIsR0FBRyxHQUFHO0FBQ2hDLFNBQU8sTUFBTSxRQUFRLENBQUMsTUFBTSxPQUN4QixFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLE9BQU8sTUFBTSxVQUFVLEVBQUcsRUFBRyxJQUMvRCxFQUFFLFdBQVcsS0FBSyxFQUFHLE9BQVE7QUFDbkM7QUFFQSxTQUFTLCtCQUFnQyxHQUFHLEdBQUc7QUFDN0MsU0FBTyxNQUFNLFFBQVEsQ0FBQyxNQUFNLE9BQ3hCLGtCQUFrQixHQUFHLENBQUMsSUFFcEIsTUFBTSxRQUFRLENBQUMsTUFBTSxPQUNqQixrQkFBa0IsR0FBRyxDQUFDLElBQ3RCLE1BQU07QUFFbEI7QUFFQSxTQUFTLDBCQUEyQixHQUFHLEdBQUc7QUFDeEMsTUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFLFdBQVcsT0FBTyxLQUFLLENBQUMsRUFBRSxRQUFRO0FBQ25ELFdBQU87QUFBQSxFQUNSO0FBRUQsYUFBVyxPQUFPLEdBQUc7QUFDbkIsUUFBSSwrQkFBK0IsRUFBRyxNQUFPLEVBQUcsSUFBSyxNQUFNLE9BQU87QUFDaEUsYUFBTztBQUFBLElBQ1I7QUFBQSxFQUNGO0FBRUQsU0FBTztBQUNUO0FBRVksTUFBQyxxQkFBcUI7QUFBQSxFQUVoQyxJQUFJLENBQUUsUUFBUSxNQUFRO0FBQUEsRUFDdEIsU0FBUztBQUFBLEVBQ1QsT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLElBQ1gsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1Y7QUFBQSxFQUNELGtCQUFrQjtBQUFBLElBQ2hCLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNWO0FBQUEsRUFHRCxNQUFNO0FBQUEsRUFDTixRQUFRO0FBQUEsRUFHUixTQUFTO0FBQ1g7QUFJZSxTQUFRLGNBQUUsRUFBRSxhQUFhLCtCQUErQixLQUFJLElBQUssQ0FBQSxHQUFJO0FBQ2xGLFFBQU0sS0FBSyxtQkFBb0I7QUFDL0IsUUFBTSxFQUFFLE9BQU8sT0FBTyxLQUFNLElBQUc7QUFFL0IsUUFBTSxZQUFZLFlBQVksRUFBRTtBQUNoQyxRQUFNLGNBQWMsU0FBUyxNQUFNLE1BQU0sWUFBWSxRQUFRLE1BQU0sU0FBUyxNQUFNO0FBR2xGLFFBQU0scUJBQXFCLGlDQUFpQyxPQUN4RDtBQUFBLElBQVMsTUFDVCxjQUFjLFFBQ1gsTUFBTSxZQUFZLFFBQ2xCLFlBQVksVUFBVSxRQUN0QixNQUFNLE9BQU8sVUFBVSxNQUFNLE9BQU8sUUFBUSxNQUFNLE9BQU87QUFBQSxFQUM3RCxJQUNDO0FBQUEsSUFBUyxNQUNULGNBQWMsUUFDWCxZQUFZLFVBQVUsUUFDdEIsTUFBTSxPQUFPLFVBQVUsTUFBTSxPQUFPLFFBQVEsTUFBTSxPQUFPO0FBQUEsRUFDN0Q7QUFFSCxRQUFNLGVBQWUsU0FBUyxNQUM1QixtQkFBbUIsVUFBVSxPQUN6QixRQUFRLE1BQU0sRUFBRSxJQUNoQixJQUNMO0FBRUQsUUFBTSxnQkFBZ0IsU0FBUyxNQUFNLGFBQWEsVUFBVSxJQUFJO0FBQ2hFLFFBQU0sVUFBVSxTQUFTLE1BQU0sWUFBWSxVQUFVLFFBQVEsY0FBYyxVQUFVLElBQUk7QUFFekYsUUFBTSxVQUFVLFNBQVMsTUFDdkIsTUFBTSxTQUFTLE9BQU8sUUFBUSxVQUFVLE9BQ3BDLE1BQ0MsTUFBTSxPQUFPLGVBQWUsS0FDbEM7QUFFRCxRQUFNLFlBQVksU0FBUyxNQUN6QixZQUFZLFVBQVUsT0FDbEI7QUFBQSxJQUNFLE1BQU0sTUFBTTtBQUFBLElBQ1osUUFBUSxNQUFNO0FBQUEsRUFDZixJQUVDLGNBQWMsVUFBVSxPQUNwQjtBQUFBLElBQ0UsTUFBTSxhQUFhLE1BQU07QUFBQSxJQUN6QixRQUFRLE1BQU07QUFBQSxFQUNmLElBQ0QsQ0FBRSxDQUViO0FBRUQsUUFBTSxrQkFBa0IsU0FBUyxNQUFNO0FBQ3JDLFFBQUksY0FBYyxVQUFVLE9BQU87QUFDakMsYUFBTztBQUFBLElBQ1I7QUFFRCxVQUNFLEVBQUUsUUFBTyxJQUFLLGFBQWEsT0FDM0IsRUFBRSxPQUFRLElBQUcsU0FDYixlQUFlLFFBQVMsU0FBUztBQUVuQyxRQUFJLGlCQUFpQixRQUFRO0FBQzNCLGFBQU87QUFBQSxJQUNSO0FBRUQsVUFBTSxpQkFBaUIsTUFBTSxPQUFPO0FBRXBDLFFBQUksZUFBZSxXQUFXLEdBQUc7QUFDL0IsYUFBTztBQUFBLElBQ1I7QUFFRCxVQUFNLFFBQVEsZUFBZTtBQUFBLE1BQzNCLGtCQUFrQixLQUFLLE1BQU0sWUFBWTtBQUFBLElBQzFDO0FBRUQsUUFBSSxRQUFRLElBQUk7QUFDZCxhQUFPO0FBQUEsSUFDUjtBQUdELFVBQU0sbUJBQW1CLGdCQUFnQixRQUFTLFNBQVMsRUFBRztBQUU5RCxXQUVFLFNBQVMsS0FJTixnQkFBZ0IsWUFBWSxNQUFNLG9CQUVsQyxlQUFnQixlQUFlLFNBQVMsR0FBSSxTQUFTLG1CQUNwRCxlQUFlO0FBQUEsTUFDZixrQkFBa0IsS0FBSyxNQUFNLFFBQVMsU0FBUyxFQUFHO0FBQUEsSUFDbkQsSUFDQztBQUFBLEVBRVYsQ0FBRztBQUVELFFBQU0sZUFBZTtBQUFBLElBQVMsTUFDNUIsY0FBYyxVQUFVLFFBQ3JCLGdCQUFnQixVQUFVLE1BQzFCLGVBQWUsTUFBTSxPQUFPLFFBQVEsYUFBYSxNQUFNLE1BQU07QUFBQSxFQUNqRTtBQUVELFFBQU0sb0JBQW9CO0FBQUEsSUFBUyxNQUNqQyxhQUFhLFVBQVUsUUFDbEIsZ0JBQWdCLFVBQVUsTUFBTSxPQUFPLFFBQVEsU0FBUyxLQUN4RCwwQkFBMEIsTUFBTSxPQUFPLFFBQVEsYUFBYSxNQUFNLE1BQU07QUFBQSxFQUM5RTtBQUVELFFBQU0sWUFBWSxTQUFTLE1BQ3pCLGNBQWMsVUFBVSxPQUVsQixrQkFBa0IsVUFBVSxPQUN4QixJQUFLLE1BQU0sb0JBQXNCLE1BQU0sZ0JBRXJDLE1BQU0sVUFBVSxPQUNaLEtBQ0MsYUFBYSxVQUFVLE9BQU8sSUFBSyxNQUFNLGdCQUFpQixLQUd2RSxFQUNMO0FBRUQsV0FBUyxRQUFTLElBQUk7QUFDcEIsUUFBSTtBQUFFLGFBQU8sTUFBTSxRQUFRLFFBQVEsRUFBRTtBQUFBLElBQUcsU0FDakMsR0FBUDtBQUFBLElBQVk7QUFFWixXQUFPO0FBQUEsRUFDUjtBQUtELFdBQVMscUJBQ1AsR0FDQSxFQUFFLG1CQUFtQixLQUFLLE1BQU0sSUFBSSxVQUFVLE1BQU0sUUFBTyxJQUFLLENBQUUsR0FDbEU7QUFDQSxRQUFJLE1BQU0sWUFBWSxNQUFNO0FBRzFCLFFBQUUsZUFBZ0I7QUFDbEIsYUFBTyxRQUFRLFFBQVEsS0FBSztBQUFBLElBQzdCO0FBRUQsUUFHRSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBR3BDLEVBQUUsV0FBVyxVQUFVLEVBQUUsV0FBVyxLQUdyQyxNQUFNLFdBQVcsVUFDcEI7QUFDQSxhQUFPLFFBQVEsUUFBUSxLQUFLO0FBQUEsSUFDN0I7QUFHRCxNQUFFLGVBQWdCO0FBR2xCLFVBQU0sVUFBVSxNQUFNLFFBQVMsWUFBWSxPQUFPLFlBQVksUUFBUyxFQUFFO0FBRXpFLFdBQU8sc0JBQXNCLE9BQ3pCLFVBRUEsUUFBUSxLQUFLLE1BQU07QUFBQSxJQUFBLENBQUUsRUFBRSxNQUFNLE1BQU07QUFBQSxJQUFBLENBQUU7QUFBQSxFQUMxQztBQUdELFdBQVMsZ0JBQWlCLEdBQUc7QUFDM0IsUUFBSSxjQUFjLFVBQVUsTUFBTTtBQUNoQyxZQUFNLEtBQUssVUFBUSxxQkFBcUIsR0FBRyxJQUFJO0FBRS9DLFdBQUssU0FBUyxHQUFHLEVBQUU7QUFDbkIsUUFBRSxxQkFBcUIsUUFBUSxHQUFJO0FBQUEsSUFDcEMsT0FDSTtBQUNILFdBQUssU0FBUyxDQUFDO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBRUQsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBRUE7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBRUE7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Q7QUFDSDs7In0=
