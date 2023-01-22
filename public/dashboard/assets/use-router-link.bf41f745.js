import { c as computed, h, g as getCurrentInstance } from "./index.805bc4d8.js";
import { c as createComponent, h as hSlot, e as hMergeSlot } from "./render.547f37d1.js";
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
export { QIcon as Q, useSizeProps as a, useRouterLinkProps as b, useSize as c, useRouterLink as d, vmIsDestroyed as e, getNormalizedVNodes as g, useSizeDefaults as u, vmHasRouter as v };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLXJvdXRlci1saW5rLmJmNDFmNzQ1LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2ljb24vUUljb24uanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS92bS5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1yb3V0ZXItbGluay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IHVzZVNpemVEZWZhdWx0cyA9IHtcbiAgeHM6IDE4LFxuICBzbTogMjQsXG4gIG1kOiAzMixcbiAgbGc6IDM4LFxuICB4bDogNDZcbn1cblxuZXhwb3J0IGNvbnN0IHVzZVNpemVQcm9wcyA9IHtcbiAgc2l6ZTogU3RyaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgc2l6ZXMgPSB1c2VTaXplRGVmYXVsdHMpIHtcbiAgLy8gcmV0dXJuIHNpemVTdHlsZVxuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gKFxuICAgIHByb3BzLnNpemUgIT09IHZvaWQgMFxuICAgICAgPyB7IGZvbnRTaXplOiBwcm9wcy5zaXplIGluIHNpemVzID8gYCR7IHNpemVzWyBwcm9wcy5zaXplIF0gfXB4YCA6IHByb3BzLnNpemUgfVxuICAgICAgOiBudWxsXG4gICkpXG59XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90LCBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmNvbnN0IGRlZmF1bHRWaWV3Qm94ID0gJzAgMCAyNCAyNCdcblxuY29uc3Qgc2FtZUZuID0gaSA9PiBpXG5jb25zdCBpb25GbiA9IGkgPT4gYGlvbmljb25zICR7IGkgfWBcblxuY29uc3QgbGliTWFwID0ge1xuICAnbWRpLSc6IGkgPT4gYG1kaSAkeyBpIH1gLFxuICAnaWNvbi0nOiBzYW1lRm4sIC8vIGZvbnRhd2Vzb21lIGVxdWl2XG4gICdidC0nOiBpID0+IGBidCAkeyBpIH1gLFxuICAnZXZhLSc6IGkgPT4gYGV2YSAkeyBpIH1gLFxuICAnaW9uLW1kJzogaW9uRm4sXG4gICdpb24taW9zJzogaW9uRm4sXG4gICdpb24tbG9nbyc6IGlvbkZuLFxuICAnaWNvbmZvbnQgJzogc2FtZUZuLFxuICAndGktJzogaSA9PiBgdGhlbWlmeS1pY29uICR7IGkgfWAsXG4gICdiaS0nOiBpID0+IGBib290c3RyYXAtaWNvbnMgJHsgaSB9YFxufVxuXG5jb25zdCBtYXRNYXAgPSB7XG4gIG9fOiAnLW91dGxpbmVkJyxcbiAgcl86ICctcm91bmQnLFxuICBzXzogJy1zaGFycCdcbn1cblxuY29uc3Qgc3ltTWFwID0ge1xuICBzeW1fb186ICctb3V0bGluZWQnLFxuICBzeW1fcl86ICctcm91bmRlZCcsXG4gIHN5bV9zXzogJy1zaGFycCdcbn1cblxuY29uc3QgbGliUkUgPSBuZXcgUmVnRXhwKCdeKCcgKyBPYmplY3Qua2V5cyhsaWJNYXApLmpvaW4oJ3wnKSArICcpJylcbmNvbnN0IG1hdFJFID0gbmV3IFJlZ0V4cCgnXignICsgT2JqZWN0LmtleXMobWF0TWFwKS5qb2luKCd8JykgKyAnKScpXG5jb25zdCBzeW1SRSA9IG5ldyBSZWdFeHAoJ14oJyArIE9iamVjdC5rZXlzKHN5bU1hcCkuam9pbignfCcpICsgJyknKVxuY29uc3QgbVJFID0gL15bTW1dXFxzP1stK10/XFwuP1xcZC9cbmNvbnN0IGltZ1JFID0gL15pbWc6L1xuY29uc3Qgc3ZnVXNlUkUgPSAvXnN2Z3VzZTovXG5jb25zdCBpb25SRSA9IC9eaW9uLS9cbmNvbnN0IGZhUkUgPSAvXihmYS0oc29saWR8cmVndWxhcnxsaWdodHxicmFuZHN8ZHVvdG9uZXx0aGluKXxbbGZdYVtzcmxiZGtdPykgL1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUljb24nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlU2l6ZVByb3BzLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnaSdcbiAgICB9LFxuXG4gICAgbmFtZTogU3RyaW5nLFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgbGVmdDogQm9vbGVhbixcbiAgICByaWdodDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWljb24nXG4gICAgICArIChwcm9wcy5sZWZ0ID09PSB0cnVlID8gJyBvbi1sZWZ0JyA6ICcnKSAvLyBUT0RPIFF2MzogZHJvcCB0aGlzXG4gICAgICArIChwcm9wcy5yaWdodCA9PT0gdHJ1ZSA/ICcgb24tcmlnaHQnIDogJycpXG4gICAgICArIChwcm9wcy5jb2xvciAhPT0gdm9pZCAwID8gYCB0ZXh0LSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgdHlwZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGxldCBjbHNcbiAgICAgIGxldCBpY29uID0gcHJvcHMubmFtZVxuXG4gICAgICBpZiAoaWNvbiA9PT0gJ25vbmUnIHx8ICFpY29uKSB7XG4gICAgICAgIHJldHVybiB7IG5vbmU6IHRydWUgfVxuICAgICAgfVxuXG4gICAgICBpZiAoJHEuaWNvbk1hcEZuICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9ICRxLmljb25NYXBGbihpY29uKVxuICAgICAgICBpZiAocmVzICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBpZiAocmVzLmljb24gIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgaWNvbiA9IHJlcy5pY29uXG4gICAgICAgICAgICBpZiAoaWNvbiA9PT0gJ25vbmUnIHx8ICFpY29uKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IG5vbmU6IHRydWUgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNsczogcmVzLmNscyxcbiAgICAgICAgICAgICAgY29udGVudDogcmVzLmNvbnRlbnQgIT09IHZvaWQgMFxuICAgICAgICAgICAgICAgID8gcmVzLmNvbnRlbnRcbiAgICAgICAgICAgICAgICA6ICcgJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobVJFLnRlc3QoaWNvbikgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgWyBkZWYsIHZpZXdCb3ggPSBkZWZhdWx0Vmlld0JveCBdID0gaWNvbi5zcGxpdCgnfCcpXG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBzdmc6IHRydWUsXG4gICAgICAgICAgdmlld0JveCxcbiAgICAgICAgICBub2RlczogZGVmLnNwbGl0KCcmJicpLm1hcChwYXRoID0+IHtcbiAgICAgICAgICAgIGNvbnN0IFsgZCwgc3R5bGUsIHRyYW5zZm9ybSBdID0gcGF0aC5zcGxpdCgnQEAnKVxuICAgICAgICAgICAgcmV0dXJuIGgoJ3BhdGgnLCB7IHN0eWxlLCBkLCB0cmFuc2Zvcm0gfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpbWdSRS50ZXN0KGljb24pID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW1nOiB0cnVlLFxuICAgICAgICAgIHNyYzogaWNvbi5zdWJzdHJpbmcoNClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3ZnVXNlUkUudGVzdChpY29uKSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBbIGRlZiwgdmlld0JveCA9IGRlZmF1bHRWaWV3Qm94IF0gPSBpY29uLnNwbGl0KCd8JylcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHN2Z3VzZTogdHJ1ZSxcbiAgICAgICAgICBzcmM6IGRlZi5zdWJzdHJpbmcoNyksXG4gICAgICAgICAgdmlld0JveFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBjb250ZW50ID0gJyAnXG4gICAgICBjb25zdCBtYXRjaGVzID0gaWNvbi5tYXRjaChsaWJSRSlcblxuICAgICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgICAgY2xzID0gbGliTWFwWyBtYXRjaGVzWyAxIF0gXShpY29uKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZmFSRS50ZXN0KGljb24pID09PSB0cnVlKSB7XG4gICAgICAgIGNscyA9IGljb25cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlvblJFLnRlc3QoaWNvbikgPT09IHRydWUpIHtcbiAgICAgICAgY2xzID0gYGlvbmljb25zIGlvbi0keyAkcS5wbGF0Zm9ybS5pcy5pb3MgPT09IHRydWUgPyAnaW9zJyA6ICdtZCcgfSR7IGljb24uc3Vic3RyaW5nKDMpIH1gXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzeW1SRS50ZXN0KGljb24pID09PSB0cnVlKSB7XG4gICAgICAgIC8vIFwibm90cmFuc2xhdGVcIiBjbGFzcyBpcyBmb3IgR29vZ2xlIFRyYW5zbGF0ZVxuICAgICAgICAvLyB0byBhdm9pZCB0YW1wZXJpbmcgd2l0aCBNYXRlcmlhbCBTeW1ib2xzIGxpZ2F0dXJlIGZvbnRcbiAgICAgICAgLy9cbiAgICAgICAgLy8gQ2F1dGlvbjogVG8gYmUgYWJsZSB0byBhZGQgc3VmZml4IHRvIHRoZSBjbGFzcyBuYW1lLFxuICAgICAgICAvLyBrZWVwIHRoZSAnbWF0ZXJpYWwtc3ltYm9scycgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLlxuICAgICAgICBjbHMgPSAnbm90cmFuc2xhdGUgbWF0ZXJpYWwtc3ltYm9scydcblxuICAgICAgICBjb25zdCBtYXRjaGVzID0gaWNvbi5tYXRjaChzeW1SRSlcbiAgICAgICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgICAgICBpY29uID0gaWNvbi5zdWJzdHJpbmcoNilcbiAgICAgICAgICBjbHMgKz0gc3ltTWFwWyBtYXRjaGVzWyAxIF0gXVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGVudCA9IGljb25cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBcIm5vdHJhbnNsYXRlXCIgY2xhc3MgaXMgZm9yIEdvb2dsZSBUcmFuc2xhdGVcbiAgICAgICAgLy8gdG8gYXZvaWQgdGFtcGVyaW5nIHdpdGggTWF0ZXJpYWwgSWNvbnMgbGlnYXR1cmUgZm9udFxuICAgICAgICAvL1xuICAgICAgICAvLyBDYXV0aW9uOiBUbyBiZSBhYmxlIHRvIGFkZCBzdWZmaXggdG8gdGhlIGNsYXNzIG5hbWUsXG4gICAgICAgIC8vIGtlZXAgdGhlICdtYXRlcmlhbC1pY29ucycgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLlxuICAgICAgICBjbHMgPSAnbm90cmFuc2xhdGUgbWF0ZXJpYWwtaWNvbnMnXG5cbiAgICAgICAgY29uc3QgbWF0Y2hlcyA9IGljb24ubWF0Y2gobWF0UkUpXG4gICAgICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICAgICAgaWNvbiA9IGljb24uc3Vic3RyaW5nKDIpXG4gICAgICAgICAgY2xzICs9IG1hdE1hcFsgbWF0Y2hlc1sgMSBdIF1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRlbnQgPSBpY29uXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNscyxcbiAgICAgICAgY29udGVudFxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgZGF0YSA9IHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzaXplU3R5bGUudmFsdWUsXG4gICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgcm9sZTogJ3ByZXNlbnRhdGlvbidcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUudmFsdWUubm9uZSA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaChwcm9wcy50YWcsIGRhdGEsIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS52YWx1ZS5pbWcgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgoJ3NwYW4nLCBkYXRhLCBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFtcbiAgICAgICAgICBoKCdpbWcnLCB7IHNyYzogdHlwZS52YWx1ZS5zcmMgfSlcbiAgICAgICAgXSkpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlLnZhbHVlLnN2ZyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaCgnc3BhbicsIGRhdGEsIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW1xuICAgICAgICAgIGgoJ3N2ZycsIHtcbiAgICAgICAgICAgIHZpZXdCb3g6IHR5cGUudmFsdWUudmlld0JveCB8fCAnMCAwIDI0IDI0J1xuICAgICAgICAgIH0sIHR5cGUudmFsdWUubm9kZXMpXG4gICAgICAgIF0pKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZS52YWx1ZS5zdmd1c2UgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgoJ3NwYW4nLCBkYXRhLCBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIFtcbiAgICAgICAgICBoKCdzdmcnLCB7XG4gICAgICAgICAgICB2aWV3Qm94OiB0eXBlLnZhbHVlLnZpZXdCb3hcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKCd1c2UnLCB7ICd4bGluazpocmVmJzogdHlwZS52YWx1ZS5zcmMgfSlcbiAgICAgICAgICBdKVxuICAgICAgICBdKSlcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUudmFsdWUuY2xzICE9PSB2b2lkIDApIHtcbiAgICAgICAgZGF0YS5jbGFzcyArPSAnICcgKyB0eXBlLnZhbHVlLmNsc1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaChwcm9wcy50YWcsIGRhdGEsIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW1xuICAgICAgICB0eXBlLnZhbHVlLmNvbnRlbnRcbiAgICAgIF0pKVxuICAgIH1cbiAgfVxufSlcbiIsIlxuLy8gY29waWVkIHRvIGRvY3MgdG9vXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFyZW50UHJveHkgKHByb3h5KSB7XG4gIGlmIChPYmplY3QocHJveHkuJHBhcmVudCkgPT09IHByb3h5LiRwYXJlbnQpIHtcbiAgICByZXR1cm4gcHJveHkuJHBhcmVudFxuICB9XG5cbiAgbGV0IHsgcGFyZW50IH0gPSBwcm94eS4kXG5cbiAgd2hpbGUgKE9iamVjdChwYXJlbnQpID09PSBwYXJlbnQpIHtcbiAgICBpZiAoT2JqZWN0KHBhcmVudC5wcm94eSkgPT09IHBhcmVudC5wcm94eSkge1xuICAgICAgcmV0dXJuIHBhcmVudC5wcm94eVxuICAgIH1cblxuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRcbiAgfVxufVxuXG5mdW5jdGlvbiBmaWxsTm9ybWFsaXplZFZOb2RlcyAoY2hpbGRyZW4sIHZub2RlKSB7XG4gIGlmICh0eXBlb2Ygdm5vZGUudHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2bm9kZS5jaGlsZHJlbikgPT09IHRydWUpIHtcbiAgICAgIHZub2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBmaWxsTm9ybWFsaXplZFZOb2RlcyhjaGlsZHJlbiwgY2hpbGQpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICBjaGlsZHJlbi5hZGQodm5vZGUpXG4gIH1cbn1cblxuLy8gdm5vZGVzIGZyb20gcmVuZGVyZWQgaW4gYWR2YW5jZWQgc2xvdHNcbmV4cG9ydCBmdW5jdGlvbiBnZXROb3JtYWxpemVkVk5vZGVzICh2bm9kZXMpIHtcbiAgY29uc3QgY2hpbGRyZW4gPSBuZXcgU2V0KClcblxuICB2bm9kZXMuZm9yRWFjaCh2bm9kZSA9PiB7XG4gICAgZmlsbE5vcm1hbGl6ZWRWTm9kZXMoY2hpbGRyZW4sIHZub2RlKVxuICB9KVxuXG4gIHJldHVybiBBcnJheS5mcm9tKGNoaWxkcmVuKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdm1IYXNSb3V0ZXIgKHZtKSB7XG4gIHJldHVybiB2bS5hcHBDb250ZXh0LmNvbmZpZy5nbG9iYWxQcm9wZXJ0aWVzLiRyb3V0ZXIgIT09IHZvaWQgMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gdm1Jc0Rlc3Ryb3llZCAodm0pIHtcbiAgcmV0dXJuIHZtLmlzVW5tb3VudGVkID09PSB0cnVlIHx8IHZtLmlzRGVhY3RpdmF0ZWQgPT09IHRydWVcbn1cbiIsIi8qXG4gKiBJbnNwaXJlZCBieSBSb3V0ZXJMaW5rIGZyb20gVnVlIFJvdXRlclxuICogIC0tPiBBUEkgc2hvdWxkIG1hdGNoIVxuICovXG5cbmltcG9ydCB7IGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHZtSGFzUm91dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bS5qcydcblxuLy8gR2V0IHRoZSBvcmlnaW5hbCBwYXRoIHZhbHVlIG9mIGEgcmVjb3JkIGJ5IGZvbGxvd2luZyBpdHMgYWxpYXNPZlxuZnVuY3Rpb24gZ2V0T3JpZ2luYWxQYXRoIChyZWNvcmQpIHtcbiAgcmV0dXJuIHJlY29yZFxuICAgID8gKFxuICAgICAgICByZWNvcmQuYWxpYXNPZlxuICAgICAgICAgID8gcmVjb3JkLmFsaWFzT2YucGF0aFxuICAgICAgICAgIDogcmVjb3JkLnBhdGhcbiAgICAgICkgOiAnJ1xufVxuXG5mdW5jdGlvbiBpc1NhbWVSb3V0ZVJlY29yZCAoYSwgYikge1xuICAvLyBzaW5jZSB0aGUgb3JpZ2luYWwgcmVjb3JkIGhhcyBhbiB1bmRlZmluZWQgdmFsdWUgZm9yIGFsaWFzT2ZcbiAgLy8gYnV0IGFsbCBhbGlhc2VzIHBvaW50IHRvIHRoZSBvcmlnaW5hbCByZWNvcmQsIHRoaXMgd2lsbCBhbHdheXMgY29tcGFyZVxuICAvLyB0aGUgb3JpZ2luYWwgcmVjb3JkXG4gIHJldHVybiAoYS5hbGlhc09mIHx8IGEpID09PSAoYi5hbGlhc09mIHx8IGIpXG59XG5cbmZ1bmN0aW9uIGluY2x1ZGVzUGFyYW1zIChvdXRlciwgaW5uZXIpIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gaW5uZXIpIHtcbiAgICBjb25zdFxuICAgICAgaW5uZXJWYWx1ZSA9IGlubmVyWyBrZXkgXSxcbiAgICAgIG91dGVyVmFsdWUgPSBvdXRlclsga2V5IF1cblxuICAgIGlmICh0eXBlb2YgaW5uZXJWYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChpbm5lclZhbHVlICE9PSBvdXRlclZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChcbiAgICAgIEFycmF5LmlzQXJyYXkob3V0ZXJWYWx1ZSkgPT09IGZhbHNlXG4gICAgICB8fCBvdXRlclZhbHVlLmxlbmd0aCAhPT0gaW5uZXJWYWx1ZS5sZW5ndGhcbiAgICAgIHx8IGlubmVyVmFsdWUuc29tZSgodmFsdWUsIGkpID0+IHZhbHVlICE9PSBvdXRlclZhbHVlWyBpIF0pXG4gICAgKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBpc0VxdWl2YWxlbnRBcnJheSAoYSwgYikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShiKSA9PT0gdHJ1ZVxuICAgID8gYS5sZW5ndGggPT09IGIubGVuZ3RoICYmIGEuZXZlcnkoKHZhbHVlLCBpKSA9PiB2YWx1ZSA9PT0gYlsgaSBdKVxuICAgIDogYS5sZW5ndGggPT09IDEgJiYgYVsgMCBdID09PSBiXG59XG5cbmZ1bmN0aW9uIGlzU2FtZVJvdXRlTG9jYXRpb25QYXJhbXNWYWx1ZSAoYSwgYikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheShhKSA9PT0gdHJ1ZVxuICAgID8gaXNFcXVpdmFsZW50QXJyYXkoYSwgYilcbiAgICA6IChcbiAgICAgICAgQXJyYXkuaXNBcnJheShiKSA9PT0gdHJ1ZVxuICAgICAgICAgID8gaXNFcXVpdmFsZW50QXJyYXkoYiwgYSlcbiAgICAgICAgICA6IGEgPT09IGJcbiAgICAgIClcbn1cblxuZnVuY3Rpb24gaXNTYW1lUm91dGVMb2NhdGlvblBhcmFtcyAoYSwgYikge1xuICBpZiAoT2JqZWN0LmtleXMoYSkubGVuZ3RoICE9PSBPYmplY3Qua2V5cyhiKS5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGZvciAoY29uc3Qga2V5IGluIGEpIHtcbiAgICBpZiAoaXNTYW1lUm91dGVMb2NhdGlvblBhcmFtc1ZhbHVlKGFbIGtleSBdLCBiWyBrZXkgXSkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgY29uc3QgdXNlUm91dGVyTGlua1Byb3BzID0ge1xuICAvLyByb3V0ZXItbGlua1xuICB0bzogWyBTdHJpbmcsIE9iamVjdCBdLFxuICByZXBsYWNlOiBCb29sZWFuLFxuICBleGFjdDogQm9vbGVhbixcbiAgYWN0aXZlQ2xhc3M6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ3Etcm91dGVyLWxpbmstLWFjdGl2ZSdcbiAgfSxcbiAgZXhhY3RBY3RpdmVDbGFzczoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBkZWZhdWx0OiAncS1yb3V0ZXItbGluay0tZXhhY3QtYWN0aXZlJ1xuICB9LFxuXG4gIC8vIHJlZ3VsYXIgPGE+IGxpbmtcbiAgaHJlZjogU3RyaW5nLFxuICB0YXJnZXQ6IFN0cmluZyxcblxuICAvLyBzdGF0ZVxuICBkaXNhYmxlOiBCb29sZWFuXG59XG5cbi8vIGV4dGVybmFsIHByb3BzOiB0eXBlLCB0YWdcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgZmFsbGJhY2tUYWcsIHVzZURpc2FibGVGb3JSb3V0ZXJMaW5rUHJvcHMgPSB0cnVlIH0gPSB7fSkge1xuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgcHJvcHMsIHByb3h5LCBlbWl0IH0gPSB2bVxuXG4gIGNvbnN0IGhhc1JvdXRlciA9IHZtSGFzUm91dGVyKHZtKVxuICBjb25zdCBoYXNIcmVmTGluayA9IGNvbXB1dGVkKCgpID0+IHByb3BzLmRpc2FibGUgIT09IHRydWUgJiYgcHJvcHMuaHJlZiAhPT0gdm9pZCAwKVxuXG4gIC8vIGZvciBwZXJmIHJlYXNvbnMsIHdlIHVzZSBtaW5pbXVtIGFtb3VudCBvZiBydW50aW1lIHdvcmtcbiAgY29uc3QgaGFzUm91dGVyTGlua1Byb3BzID0gdXNlRGlzYWJsZUZvclJvdXRlckxpbmtQcm9wcyA9PT0gdHJ1ZVxuICAgID8gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGhhc1JvdXRlciA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMuZGlzYWJsZSAhPT0gdHJ1ZVxuICAgICAgJiYgaGFzSHJlZkxpbmsudmFsdWUgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnRvICE9PSB2b2lkIDAgJiYgcHJvcHMudG8gIT09IG51bGwgJiYgcHJvcHMudG8gIT09ICcnXG4gICAgKVxuICAgIDogY29tcHV0ZWQoKCkgPT5cbiAgICAgIGhhc1JvdXRlciA9PT0gdHJ1ZVxuICAgICAgJiYgaGFzSHJlZkxpbmsudmFsdWUgIT09IHRydWVcbiAgICAgICYmIHByb3BzLnRvICE9PSB2b2lkIDAgJiYgcHJvcHMudG8gIT09IG51bGwgJiYgcHJvcHMudG8gIT09ICcnXG4gICAgKVxuXG4gIGNvbnN0IHJlc29sdmVkTGluayA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBoYXNSb3V0ZXJMaW5rUHJvcHMudmFsdWUgPT09IHRydWVcbiAgICAgID8gZ2V0TGluayhwcm9wcy50bylcbiAgICAgIDogbnVsbFxuICApKVxuXG4gIGNvbnN0IGhhc1JvdXRlckxpbmsgPSBjb21wdXRlZCgoKSA9PiByZXNvbHZlZExpbmsudmFsdWUgIT09IG51bGwpXG4gIGNvbnN0IGhhc0xpbmsgPSBjb21wdXRlZCgoKSA9PiBoYXNIcmVmTGluay52YWx1ZSA9PT0gdHJ1ZSB8fCBoYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKVxuXG4gIGNvbnN0IGxpbmtUYWcgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMudHlwZSA9PT0gJ2EnIHx8IGhhc0xpbmsudmFsdWUgPT09IHRydWVcbiAgICAgID8gJ2EnXG4gICAgICA6IChwcm9wcy50YWcgfHwgZmFsbGJhY2tUYWcgfHwgJ2RpdicpXG4gICkpXG5cbiAgY29uc3QgbGlua0F0dHJzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGhhc0hyZWZMaW5rLnZhbHVlID09PSB0cnVlXG4gICAgICA/IHtcbiAgICAgICAgICBocmVmOiBwcm9wcy5ocmVmLFxuICAgICAgICAgIHRhcmdldDogcHJvcHMudGFyZ2V0XG4gICAgICAgIH1cbiAgICAgIDogKFxuICAgICAgICAgIGhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWVcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGhyZWY6IHJlc29sdmVkTGluay52YWx1ZS5ocmVmLFxuICAgICAgICAgICAgICAgIHRhcmdldDogcHJvcHMudGFyZ2V0XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDoge31cbiAgICAgICAgKVxuICApKVxuXG4gIGNvbnN0IGxpbmtBY3RpdmVJbmRleCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBpZiAoaGFzUm91dGVyTGluay52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGNvbnN0XG4gICAgICB7IG1hdGNoZWQgfSA9IHJlc29sdmVkTGluay52YWx1ZSxcbiAgICAgIHsgbGVuZ3RoIH0gPSBtYXRjaGVkLFxuICAgICAgcm91dGVNYXRjaGVkID0gbWF0Y2hlZFsgbGVuZ3RoIC0gMSBdXG5cbiAgICBpZiAocm91dGVNYXRjaGVkID09PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRNYXRjaGVkID0gcHJveHkuJHJvdXRlLm1hdGNoZWRcblxuICAgIGlmIChjdXJyZW50TWF0Y2hlZC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cblxuICAgIGNvbnN0IGluZGV4ID0gY3VycmVudE1hdGNoZWQuZmluZEluZGV4KFxuICAgICAgaXNTYW1lUm91dGVSZWNvcmQuYmluZChudWxsLCByb3V0ZU1hdGNoZWQpXG4gICAgKVxuXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHJldHVybiBpbmRleFxuICAgIH1cblxuICAgIC8vIHBvc3NpYmxlIHBhcmVudCByZWNvcmRcbiAgICBjb25zdCBwYXJlbnRSZWNvcmRQYXRoID0gZ2V0T3JpZ2luYWxQYXRoKG1hdGNoZWRbIGxlbmd0aCAtIDIgXSlcblxuICAgIHJldHVybiAoXG4gICAgICAvLyB3ZSBhcmUgZGVhbGluZyB3aXRoIG5lc3RlZCByb3V0ZXNcbiAgICAgIGxlbmd0aCA+IDFcbiAgICAgIC8vIGlmIHRoZSBwYXJlbnQgYW5kIG1hdGNoZWQgcm91dGUgaGF2ZSB0aGUgc2FtZSBwYXRoLCB0aGlzIGxpbmsgaXNcbiAgICAgIC8vIHJlZmVycmluZyB0byB0aGUgZW1wdHkgY2hpbGQuIE9yIHdlIGN1cnJlbnRseSBhcmUgb24gYSBkaWZmZXJlbnRcbiAgICAgIC8vIGNoaWxkIG9mIHRoZSBzYW1lIHBhcmVudFxuICAgICAgJiYgZ2V0T3JpZ2luYWxQYXRoKHJvdXRlTWF0Y2hlZCkgPT09IHBhcmVudFJlY29yZFBhdGhcbiAgICAgIC8vIGF2b2lkIGNvbXBhcmluZyB0aGUgY2hpbGQgd2l0aCBpdHMgcGFyZW50XG4gICAgICAmJiBjdXJyZW50TWF0Y2hlZFsgY3VycmVudE1hdGNoZWQubGVuZ3RoIC0gMSBdLnBhdGggIT09IHBhcmVudFJlY29yZFBhdGhcbiAgICAgICAgPyBjdXJyZW50TWF0Y2hlZC5maW5kSW5kZXgoXG4gICAgICAgICAgaXNTYW1lUm91dGVSZWNvcmQuYmluZChudWxsLCBtYXRjaGVkWyBsZW5ndGggLSAyIF0pXG4gICAgICAgIClcbiAgICAgICAgOiBpbmRleFxuICAgIClcbiAgfSlcblxuICBjb25zdCBsaW5rSXNBY3RpdmUgPSBjb21wdXRlZCgoKSA9PlxuICAgIGhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWVcbiAgICAmJiBsaW5rQWN0aXZlSW5kZXgudmFsdWUgIT09IC0xXG4gICAgJiYgaW5jbHVkZXNQYXJhbXMocHJveHkuJHJvdXRlLnBhcmFtcywgcmVzb2x2ZWRMaW5rLnZhbHVlLnBhcmFtcylcbiAgKVxuXG4gIGNvbnN0IGxpbmtJc0V4YWN0QWN0aXZlID0gY29tcHV0ZWQoKCkgPT5cbiAgICBsaW5rSXNBY3RpdmUudmFsdWUgPT09IHRydWVcbiAgICAgICYmIGxpbmtBY3RpdmVJbmRleC52YWx1ZSA9PT0gcHJveHkuJHJvdXRlLm1hdGNoZWQubGVuZ3RoIC0gMVxuICAgICAgJiYgaXNTYW1lUm91dGVMb2NhdGlvblBhcmFtcyhwcm94eS4kcm91dGUucGFyYW1zLCByZXNvbHZlZExpbmsudmFsdWUucGFyYW1zKVxuICApXG5cbiAgY29uc3QgbGlua0NsYXNzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWVcbiAgICAgID8gKFxuICAgICAgICAgIGxpbmtJc0V4YWN0QWN0aXZlLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICA/IGAgJHsgcHJvcHMuZXhhY3RBY3RpdmVDbGFzcyB9ICR7IHByb3BzLmFjdGl2ZUNsYXNzIH1gXG4gICAgICAgICAgICA6IChcbiAgICAgICAgICAgICAgICBwcm9wcy5leGFjdCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgICAgICAgOiAobGlua0lzQWN0aXZlLnZhbHVlID09PSB0cnVlID8gYCAkeyBwcm9wcy5hY3RpdmVDbGFzcyB9YCA6ICcnKVxuICAgICAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIDogJydcbiAgKSlcblxuICBmdW5jdGlvbiBnZXRMaW5rICh0bykge1xuICAgIHRyeSB7IHJldHVybiBwcm94eS4kcm91dGVyLnJlc29sdmUodG8pIH1cbiAgICBjYXRjaCAoXykge31cblxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMgUHJvbWlzZTxSb3V0ZXJFcnJvciB8IGZhbHNlIHwgdW5kZWZpbmVkPlxuICAgKi9cbiAgZnVuY3Rpb24gbmF2aWdhdGVUb1JvdXRlckxpbmsgKFxuICAgIGUsXG4gICAgeyByZXR1cm5Sb3V0ZXJFcnJvciwgdG8gPSBwcm9wcy50bywgcmVwbGFjZSA9IHByb3BzLnJlcGxhY2UgfSA9IHt9XG4gICkge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlKSB7XG4gICAgICAvLyBlbnN1cmUgbmF0aXZlIG5hdmlnYXRpb24gaXMgcHJldmVudGVkIGluIGFsbCBjYXNlcyxcbiAgICAgIC8vIGxpa2Ugd2hlbiB1c2VEaXNhYmxlRm9yUm91dGVyTGlua1Byb3BzID09PSBmYWxzZSAoUVJvdXRlVGFiKVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIC8vIGRvbid0IHJlZGlyZWN0IHdpdGggY29udHJvbCBrZXlzO1xuICAgICAgLy8gc2hvdWxkIG1hdGNoIFJvdXRlckxpbmsgZnJvbSBWdWUgUm91dGVyXG4gICAgICBlLm1ldGFLZXkgfHwgZS5hbHRLZXkgfHwgZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXlcblxuICAgICAgLy8gZG9uJ3QgcmVkaXJlY3Qgb24gcmlnaHQgY2xpY2tcbiAgICAgIHx8IChlLmJ1dHRvbiAhPT0gdm9pZCAwICYmIGUuYnV0dG9uICE9PSAwKVxuXG4gICAgICAvLyBkb24ndCByZWRpcmVjdCBpZiBpdCBzaG91bGQgb3BlbiBpbiBhIG5ldyB3aW5kb3dcbiAgICAgIHx8IHByb3BzLnRhcmdldCA9PT0gJ19ibGFuaydcbiAgICApIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZmFsc2UpXG4gICAgfVxuXG4gICAgLy8gaGluZGVyIHRoZSBuYXRpdmUgbmF2aWdhdGlvblxuICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgLy8gdGhlbigpIGNhbiBhbHNvIHJldHVybiBhIFwic29mdFwiIHJvdXRlciBlcnJvciAoVnVlIFJvdXRlciBiZWhhdmlvcilcbiAgICBjb25zdCBwcm9taXNlID0gcHJveHkuJHJvdXRlclsgcmVwbGFjZSA9PT0gdHJ1ZSA/ICdyZXBsYWNlJyA6ICdwdXNoJyBdKHRvKVxuXG4gICAgcmV0dXJuIHJldHVyblJvdXRlckVycm9yID09PSB0cnVlXG4gICAgICA/IHByb21pc2VcbiAgICAgIC8vIGVsc2UgY2F0Y2hpbmcgaGFyZCBlcnJvcnMgYW5kIGFsc28gXCJzb2Z0XCIgb25lcyAtIHRoZW4oZXJyID0+IC4uLilcbiAgICAgIDogcHJvbWlzZS50aGVuKCgpID0+IHt9KS5jYXRjaCgoKSA9PiB7fSlcbiAgfVxuXG4gIC8vIHdhcm5pbmchIGVuc3VyZSB0aGF0IHRoZSBjb21wb25lbnQgdXNpbmcgaXQgaGFzICdjbGljaycgaW5jbHVkZWQgaW4gaXRzICdlbWl0cycgZGVmaW5pdGlvbiBwcm9wXG4gIGZ1bmN0aW9uIG5hdmlnYXRlT25DbGljayAoZSkge1xuICAgIGlmIChoYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBjb25zdCBnbyA9IG9wdHMgPT4gbmF2aWdhdGVUb1JvdXRlckxpbmsoZSwgb3B0cylcblxuICAgICAgZW1pdCgnY2xpY2snLCBlLCBnbylcbiAgICAgIGUuZGVmYXVsdFByZXZlbnRlZCAhPT0gdHJ1ZSAmJiBnbygpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW1pdCgnY2xpY2snLCBlKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaGFzUm91dGVyTGluayxcbiAgICBoYXNIcmVmTGluayxcbiAgICBoYXNMaW5rLFxuXG4gICAgbGlua1RhZyxcbiAgICByZXNvbHZlZExpbmssXG4gICAgbGlua0lzQWN0aXZlLFxuICAgIGxpbmtJc0V4YWN0QWN0aXZlLFxuICAgIGxpbmtDbGFzcyxcbiAgICBsaW5rQXR0cnMsXG5cbiAgICBnZXRMaW5rLFxuICAgIG5hdmlnYXRlVG9Sb3V0ZXJMaW5rLFxuICAgIG5hdmlnYXRlT25DbGlja1xuICB9XG59XG4iXSwibmFtZXMiOlsibWF0Y2hlcyJdLCJtYXBwaW5ncyI6Ijs7QUFFWSxNQUFDLGtCQUFrQjtBQUFBLEVBQzdCLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFBQSxFQUNKLElBQUk7QUFDTjtBQUVZLE1BQUMsZUFBZTtBQUFBLEVBQzFCLE1BQU07QUFDUjtBQUVlLFNBQUEsUUFBVSxPQUFPLFFBQVEsaUJBQWlCO0FBRXZELFNBQU8sU0FBUyxNQUNkLE1BQU0sU0FBUyxTQUNYLEVBQUUsVUFBVSxNQUFNLFFBQVEsUUFBUSxHQUFJLE1BQU8sTUFBTSxZQUFjLE1BQU0sS0FBTSxJQUM3RSxJQUNMO0FBQ0g7QUNkQSxNQUFNLGlCQUFpQjtBQUV2QixNQUFN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
