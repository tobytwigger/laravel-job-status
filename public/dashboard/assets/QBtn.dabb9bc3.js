import { c as computed, h, r as ref, k as onBeforeUnmount, X as Transition, D as withDirectives, g as getCurrentInstance, q as stopAndPrevent, p as listenOpts, Y as isKeyCode, z as prevent, A as stop } from "./index.805bc4d8.js";
import { u as useSizeDefaults, a as useSizeProps, b as useRouterLinkProps, c as useSize, d as useRouterLink, Q as QIcon } from "./use-router-link.bf41f745.js";
import { c as createComponent, e as hMergeSlot } from "./render.547f37d1.js";
import { R as Ripple } from "./Ripple.ad03961b.js";
const useSpinnerProps = {
  size: {
    type: [Number, String],
    default: "1em"
  },
  color: String
};
function useSpinner(props) {
  return {
    cSize: computed(() => props.size in useSizeDefaults ? `${useSizeDefaults[props.size]}px` : props.size),
    classes: computed(
      () => "q-spinner" + (props.color ? ` text-${props.color}` : "")
    )
  };
}
var QSpinner = createComponent({
  name: "QSpinner",
  props: {
    ...useSpinnerProps,
    thickness: {
      type: Number,
      default: 5
    }
  },
  setup(props) {
    const { cSize, classes } = useSpinner(props);
    return () => h("svg", {
      class: classes.value + " q-spinner-mat",
      width: cSize.value,
      height: cSize.value,
      viewBox: "25 25 50 50"
    }, [
      h("circle", {
        class: "path",
        cx: "50",
        cy: "50",
        r: "20",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props.thickness,
        "stroke-miterlimit": "10"
      })
    ]);
  }
});
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
const btnPadding = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};
const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
const formTypes = ["button", "submit", "reset"];
const mediaTypeRE = /[^\s]\/[^\s]/;
const btnDesignOptions = ["flat", "outline", "push", "unelevated"];
const getBtnDesign = (props, defaultValue) => {
  if (props.flat === true)
    return "flat";
  if (props.outline === true)
    return "outline";
  if (props.push === true)
    return "push";
  if (props.unelevated === true)
    return "unelevated";
  return defaultValue;
};
const useBtnProps = {
  ...useSizeProps,
  ...useRouterLinkProps,
  type: {
    type: String,
    default: "button"
  },
  label: [Number, String],
  icon: String,
  iconRight: String,
  ...btnDesignOptions.reduce(
    (acc, val) => (acc[val] = Boolean) && acc,
    {}
  ),
  square: Boolean,
  round: Boolean,
  rounded: Boolean,
  glossy: Boolean,
  size: String,
  fab: Boolean,
  fabMini: Boolean,
  padding: String,
  color: String,
  textColor: String,
  noCaps: Boolean,
  noWrap: Boolean,
  dense: Boolean,
  tabindex: [Number, String],
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  align: {
    ...useAlignProps.align,
    default: "center"
  },
  stack: Boolean,
  stretch: Boolean,
  loading: {
    type: Boolean,
    default: null
  },
  disable: Boolean
};
function useBtn(props) {
  const sizeStyle = useSize(props, defaultSizes);
  const alignClass = useAlign(props);
  const { hasRouterLink, hasLink, linkTag, linkAttrs, navigateOnClick } = useRouterLink({
    fallbackTag: "button"
  });
  const style = computed(() => {
    const obj = props.fab === false && props.fabMini === false ? sizeStyle.value : {};
    return props.padding !== void 0 ? Object.assign({}, obj, {
      padding: props.padding.split(/\s+/).map((v) => v in btnPadding ? btnPadding[v] + "px" : v).join(" "),
      minWidth: "0",
      minHeight: "0"
    }) : obj;
  });
  const isRounded = computed(
    () => props.rounded === true || props.fab === true || props.fabMini === true
  );
  const isActionable = computed(
    () => props.disable !== true && props.loading !== true
  );
  const tabIndex = computed(() => isActionable.value === true ? props.tabindex || 0 : -1);
  const design = computed(() => getBtnDesign(props, "standard"));
  const attributes = computed(() => {
    const acc = { tabindex: tabIndex.value };
    if (hasLink.value === true) {
      Object.assign(acc, linkAttrs.value);
    } else if (formTypes.includes(props.type) === true) {
      acc.type = props.type;
    }
    if (linkTag.value === "a") {
      if (props.disable === true) {
        acc["aria-disabled"] = "true";
      } else if (acc.href === void 0) {
        acc.role = "button";
      }
      if (hasRouterLink.value !== true && mediaTypeRE.test(props.type) === true) {
        acc.type = props.type;
      }
    } else if (props.disable === true) {
      acc.disabled = "";
      acc["aria-disabled"] = "true";
    }
    if (props.loading === true && props.percentage !== void 0) {
      Object.assign(acc, {
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": props.percentage
      });
    }
    return acc;
  });
  const classes = computed(() => {
    let colors;
    if (props.color !== void 0) {
      if (props.flat === true || props.outline === true) {
        colors = `text-${props.textColor || props.color}`;
      } else {
        colors = `bg-${props.color} text-${props.textColor || "white"}`;
      }
    } else if (props.textColor) {
      colors = `text-${props.textColor}`;
    }
    const shape = props.round === true ? "round" : `rectangle${isRounded.value === true ? " q-btn--rounded" : props.square === true ? " q-btn--square" : ""}`;
    return `q-btn--${design.value} q-btn--${shape}` + (colors !== void 0 ? " " + colors : "") + (isActionable.value === true ? " q-btn--actionable q-focusable q-hoverable" : props.disable === true ? " disabled" : "") + (props.fab === true ? " q-btn--fab" : props.fabMini === true ? " q-btn--fab-mini" : "") + (props.noCaps === true ? " q-btn--no-uppercase" : "") + (props.dense === true ? " q-btn--dense" : "") + (props.stretch === true ? " no-border-radius self-stretch" : "") + (props.glossy === true ? " glossy" : "") + (props.square ? " q-btn--square" : "");
  });
  const innerClasses = computed(
    () => alignClass.value + (props.stack === true ? " column" : " row") + (props.noWrap === true ? " no-wrap text-no-wrap" : "") + (props.loading === true ? " q-btn__content--hidden" : "")
  );
  return {
    classes,
    style,
    innerClasses,
    attributes,
    hasLink,
    linkTag,
    navigateOnClick,
    isActionable
  };
}
const { passiveCapture } = listenOpts;
let touchTarget = null, keyboardTarget = null, mouseTarget = null;
var QBtn = createComponent({
  name: "QBtn",
  props: {
    ...useBtnProps,
    percentage: Number,
    darkPercentage: Boolean,
    onTouchstart: [Function, Array]
  },
  emits: ["click", "keydown", "mousedown", "keyup"],
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const {
      classes,
      style,
      innerClasses,
      attributes,
      hasLink,
      linkTag,
      navigateOnClick,
      isActionable
    } = useBtn(props);
    const rootRef = ref(null);
    const blurTargetRef = ref(null);
    let localTouchTargetEl = null, avoidMouseRipple, mouseTimer = null;
    const hasLabel = computed(
      () => props.label !== void 0 && props.label !== null && props.label !== ""
    );
    const ripple = computed(() => props.disable === true || props.ripple === false ? false : {
      keyCodes: hasLink.value === true ? [13, 32] : [13],
      ...props.ripple === true ? {} : props.ripple
    });
    const rippleProps = computed(() => ({ center: props.round }));
    const percentageStyle = computed(() => {
      const val = Math.max(0, Math.min(100, props.percentage));
      return val > 0 ? { transition: "transform 0.6s", transform: `translateX(${val - 100}%)` } : {};
    });
    const onEvents = computed(() => {
      if (props.loading === true) {
        return {
          onMousedown: onLoadingEvt,
          onTouchstart: onLoadingEvt,
          onClick: onLoadingEvt,
          onKeydown: onLoadingEvt,
          onKeyup: onLoadingEvt
        };
      }
      if (isActionable.value === true) {
        const acc = {
          onClick,
          onKeydown,
          onMousedown
        };
        if (proxy.$q.platform.has.touch === true) {
          const suffix = props.onTouchstart !== void 0 ? "" : "Passive";
          acc[`onTouchstart${suffix}`] = onTouchstart;
        }
        return acc;
      }
      return {
        onClick: stopAndPrevent
      };
    });
    const nodeProps = computed(() => ({
      ref: rootRef,
      class: "q-btn q-btn-item non-selectable no-outline " + classes.value,
      style: style.value,
      ...attributes.value,
      ...onEvents.value
    }));
    function onClick(e) {
      if (rootRef.value === null) {
        return;
      }
      if (e !== void 0) {
        if (e.defaultPrevented === true) {
          return;
        }
        const el = document.activeElement;
        if (props.type === "submit" && el !== document.body && rootRef.value.contains(el) === false && el.contains(rootRef.value) === false) {
          rootRef.value.focus();
          const onClickCleanup = () => {
            document.removeEventListener("keydown", stopAndPrevent, true);
            document.removeEventListener("keyup", onClickCleanup, passiveCapture);
            rootRef.value !== null && rootRef.value.removeEventListener("blur", onClickCleanup, passiveCapture);
          };
          document.addEventListener("keydown", stopAndPrevent, true);
          document.addEventListener("keyup", onClickCleanup, passiveCapture);
          rootRef.value.addEventListener("blur", onClickCleanup, passiveCapture);
        }
      }
      navigateOnClick(e);
    }
    function onKeydown(e) {
      if (rootRef.value === null) {
        return;
      }
      emit("keydown", e);
      if (isKeyCode(e, [13, 32]) === true && keyboardTarget !== rootRef.value) {
        keyboardTarget !== null && cleanup();
        if (e.defaultPrevented !== true) {
          rootRef.value.focus();
          keyboardTarget = rootRef.value;
          rootRef.value.classList.add("q-btn--active");
          document.addEventListener("keyup", onPressEnd, true);
          rootRef.value.addEventListener("blur", onPressEnd, passiveCapture);
        }
        stopAndPrevent(e);
      }
    }
    function onTouchstart(e) {
      if (rootRef.value === null) {
        return;
      }
      emit("touchstart", e);
      if (e.defaultPrevented === true) {
        return;
      }
      if (touchTarget !== rootRef.value) {
        touchTarget !== null && cleanup();
        touchTarget = rootRef.value;
        localTouchTargetEl = e.target;
        localTouchTargetEl.addEventListener("touchcancel", onPressEnd, passiveCapture);
        localTouchTargetEl.addEventListener("touchend", onPressEnd, passiveCapture);
      }
      avoidMouseRipple = true;
      mouseTimer !== null && clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        mouseTimer = null;
        avoidMouseRipple = false;
      }, 200);
    }
    function onMousedown(e) {
      if (rootRef.value === null) {
        return;
      }
      e.qSkipRipple = avoidMouseRipple === true;
      emit("mousedown", e);
      if (e.defaultPrevented !== true && mouseTarget !== rootRef.value) {
        mouseTarget !== null && cleanup();
        mouseTarget = rootRef.value;
        rootRef.value.classList.add("q-btn--active");
        document.addEventListener("mouseup", onPressEnd, passiveCapture);
      }
    }
    function onPressEnd(e) {
      if (rootRef.value === null) {
        return;
      }
      if (e !== void 0 && e.type === "blur" && document.activeElement === rootRef.value) {
        return;
      }
      if (e !== void 0 && e.type === "keyup") {
        if (keyboardTarget === rootRef.value && isKeyCode(e, [13, 32]) === true) {
          const evt = new MouseEvent("click", e);
          evt.qKeyEvent = true;
          e.defaultPrevented === true && prevent(evt);
          e.cancelBubble === true && stop(evt);
          rootRef.value.dispatchEvent(evt);
          stopAndPrevent(e);
          e.qKeyEvent = true;
        }
        emit("keyup", e);
      }
      cleanup();
    }
    function cleanup(destroying) {
      const blurTarget = blurTargetRef.value;
      if (destroying !== true && (touchTarget === rootRef.value || mouseTarget === rootRef.value) && blurTarget !== null && blurTarget !== document.activeElement) {
        blurTarget.setAttribute("tabindex", -1);
        blurTarget.focus();
      }
      if (touchTarget === rootRef.value) {
        if (localTouchTargetEl !== null) {
          localTouchTargetEl.removeEventListener("touchcancel", onPressEnd, passiveCapture);
          localTouchTargetEl.removeEventListener("touchend", onPressEnd, passiveCapture);
        }
        touchTarget = localTouchTargetEl = null;
      }
      if (mouseTarget === rootRef.value) {
        document.removeEventListener("mouseup", onPressEnd, passiveCapture);
        mouseTarget = null;
      }
      if (keyboardTarget === rootRef.value) {
        document.removeEventListener("keyup", onPressEnd, true);
        rootRef.value !== null && rootRef.value.removeEventListener("blur", onPressEnd, passiveCapture);
        keyboardTarget = null;
      }
      rootRef.value !== null && rootRef.value.classList.remove("q-btn--active");
    }
    function onLoadingEvt(evt) {
      stopAndPrevent(evt);
      evt.qSkipRipple = true;
    }
    onBeforeUnmount(() => {
      cleanup(true);
    });
    Object.assign(proxy, { click: onClick });
    return () => {
      let inner = [];
      props.icon !== void 0 && inner.push(
        h(QIcon, {
          name: props.icon,
          left: props.stack === false && hasLabel.value === true,
          role: "img",
          "aria-hidden": "true"
        })
      );
      hasLabel.value === true && inner.push(
        h("span", { class: "block" }, [props.label])
      );
      inner = hMergeSlot(slots.default, inner);
      if (props.iconRight !== void 0 && props.round === false) {
        inner.push(
          h(QIcon, {
            name: props.iconRight,
            right: props.stack === false && hasLabel.value === true,
            role: "img",
            "aria-hidden": "true"
          })
        );
      }
      const child = [
        h("span", {
          class: "q-focus-helper",
          ref: blurTargetRef
        })
      ];
      if (props.loading === true && props.percentage !== void 0) {
        child.push(
          h("span", {
            class: "q-btn__progress absolute-full overflow-hidden" + (props.darkPercentage === true ? " q-btn__progress--dark" : "")
          }, [
            h("span", {
              class: "q-btn__progress-indicator fit block",
              style: percentageStyle.value
            })
          ])
        );
      }
      child.push(
        h("span", {
          class: "q-btn__content text-center col items-center q-anchor--skip " + innerClasses.value
        }, inner)
      );
      props.loading !== null && child.push(
        h(Transition, {
          name: "q-transition--fade"
        }, () => props.loading === true ? [
          h("span", {
            key: "loading",
            class: "absolute-full flex flex-center"
          }, slots.loading !== void 0 ? slots.loading() : [h(QSpinner)])
        ] : null)
      );
      return withDirectives(
        h(
          linkTag.value,
          nodeProps.value,
          child
        ),
        [[
          Ripple,
          ripple.value,
          void 0,
          rippleProps.value
        ]]
      );
    };
  }
});
export { QBtn as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUJ0bi5kYWJiOWJjMy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc3Bpbm5lci91c2Utc3Bpbm5lci5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvUVNwaW5uZXIuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtYWxpZ24uanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9idG4vdXNlLWJ0bi5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2J0bi9RQnRuLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgdXNlU2l6ZURlZmF1bHRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcblxuZXhwb3J0IGNvbnN0IHVzZVNwaW5uZXJQcm9wcyA9IHtcbiAgc2l6ZToge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAnMWVtJ1xuICB9LFxuICBjb2xvcjogU3RyaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVNwaW5uZXIgKHByb3BzKSB7XG4gIHJldHVybiB7XG4gICAgY1NpemU6IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnNpemUgaW4gdXNlU2l6ZURlZmF1bHRzXG4gICAgICAgID8gYCR7IHVzZVNpemVEZWZhdWx0c1sgcHJvcHMuc2l6ZSBdIH1weGBcbiAgICAgICAgOiBwcm9wcy5zaXplXG4gICAgKSksXG5cbiAgICBjbGFzc2VzOiBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3Etc3Bpbm5lcicgKyAocHJvcHMuY29sb3IgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICApXG4gIH1cbn1cbiIsImltcG9ydCB7IGggfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VTcGlubmVyLCB7IHVzZVNwaW5uZXJQcm9wcyB9IGZyb20gJy4vdXNlLXNwaW5uZXIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNwaW5uZXInLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlU3Bpbm5lclByb3BzLFxuXG4gICAgdGhpY2tuZXNzOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiA1XG4gICAgfVxuICB9LFxuXG4gIHNldHVwIChwcm9wcykge1xuICAgIGNvbnN0IHsgY1NpemUsIGNsYXNzZXMgfSA9IHVzZVNwaW5uZXIocHJvcHMpXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnc3ZnJywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUgKyAnIHEtc3Bpbm5lci1tYXQnLFxuICAgICAgd2lkdGg6IGNTaXplLnZhbHVlLFxuICAgICAgaGVpZ2h0OiBjU2l6ZS52YWx1ZSxcbiAgICAgIHZpZXdCb3g6ICcyNSAyNSA1MCA1MCdcbiAgICB9LCBbXG4gICAgICBoKCdjaXJjbGUnLCB7XG4gICAgICAgIGNsYXNzOiAncGF0aCcsXG4gICAgICAgIGN4OiAnNTAnLFxuICAgICAgICBjeTogJzUwJyxcbiAgICAgICAgcjogJzIwJyxcbiAgICAgICAgZmlsbDogJ25vbmUnLFxuICAgICAgICBzdHJva2U6ICdjdXJyZW50Q29sb3InLFxuICAgICAgICAnc3Ryb2tlLXdpZHRoJzogcHJvcHMudGhpY2tuZXNzLFxuICAgICAgICAnc3Ryb2tlLW1pdGVybGltaXQnOiAnMTAnXG4gICAgICB9KVxuICAgIF0pXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuZXhwb3J0IGNvbnN0IGFsaWduTWFwID0ge1xuICBsZWZ0OiAnc3RhcnQnLFxuICBjZW50ZXI6ICdjZW50ZXInLFxuICByaWdodDogJ2VuZCcsXG4gIGJldHdlZW46ICdiZXR3ZWVuJyxcbiAgYXJvdW5kOiAnYXJvdW5kJyxcbiAgZXZlbmx5OiAnZXZlbmx5JyxcbiAgc3RyZXRjaDogJ3N0cmV0Y2gnXG59XG5cbmV4cG9ydCBjb25zdCBhbGlnblZhbHVlcyA9IE9iamVjdC5rZXlzKGFsaWduTWFwKVxuXG5leHBvcnQgY29uc3QgdXNlQWxpZ25Qcm9wcyA9IHtcbiAgYWxpZ246IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgdmFsaWRhdG9yOiB2ID0+IGFsaWduVmFsdWVzLmluY2x1ZGVzKHYpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzKSB7XG4gIC8vIHJldHVybiBhbGlnbkNsYXNzXG4gIHJldHVybiBjb21wdXRlZCgoKSA9PiB7XG4gICAgY29uc3QgYWxpZ24gPSBwcm9wcy5hbGlnbiA9PT0gdm9pZCAwXG4gICAgICA/IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3N0cmV0Y2gnIDogJ2xlZnQnXG4gICAgICA6IHByb3BzLmFsaWduXG5cbiAgICByZXR1cm4gYCR7IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ2l0ZW1zJyA6ICdqdXN0aWZ5JyB9LSR7IGFsaWduTWFwWyBhbGlnbiBdIH1gXG4gIH0pXG59XG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUFsaWduLCB7IHVzZUFsaWduUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1hbGlnbi5qcydcbmltcG9ydCB1c2VTaXplLCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNpemUuanMnXG5pbXBvcnQgdXNlUm91dGVyTGluaywgeyB1c2VSb3V0ZXJMaW5rUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1yb3V0ZXItbGluay5qcydcblxuZXhwb3J0IGNvbnN0IGJ0blBhZGRpbmcgPSB7XG4gIG5vbmU6IDAsXG4gIHhzOiA0LFxuICBzbTogOCxcbiAgbWQ6IDE2LFxuICBsZzogMjQsXG4gIHhsOiAzMlxufVxuXG5jb25zdCBkZWZhdWx0U2l6ZXMgPSB7XG4gIHhzOiA4LFxuICBzbTogMTAsXG4gIG1kOiAxNCxcbiAgbGc6IDIwLFxuICB4bDogMjRcbn1cblxuY29uc3QgZm9ybVR5cGVzID0gWyAnYnV0dG9uJywgJ3N1Ym1pdCcsICdyZXNldCcgXVxuY29uc3QgbWVkaWFUeXBlUkUgPSAvW15cXHNdXFwvW15cXHNdL1xuXG5leHBvcnQgY29uc3QgYnRuRGVzaWduT3B0aW9ucyA9IFsgJ2ZsYXQnLCAnb3V0bGluZScsICdwdXNoJywgJ3VuZWxldmF0ZWQnIF1cbmV4cG9ydCBjb25zdCBnZXRCdG5EZXNpZ24gPSAocHJvcHMsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICBpZiAocHJvcHMuZmxhdCA9PT0gdHJ1ZSkgcmV0dXJuICdmbGF0J1xuICBpZiAocHJvcHMub3V0bGluZSA9PT0gdHJ1ZSkgcmV0dXJuICdvdXRsaW5lJ1xuICBpZiAocHJvcHMucHVzaCA9PT0gdHJ1ZSkgcmV0dXJuICdwdXNoJ1xuICBpZiAocHJvcHMudW5lbGV2YXRlZCA9PT0gdHJ1ZSkgcmV0dXJuICd1bmVsZXZhdGVkJ1xuICByZXR1cm4gZGVmYXVsdFZhbHVlXG59XG5leHBvcnQgY29uc3QgZ2V0QnRuRGVzaWduQXR0ciA9IHByb3BzID0+IHtcbiAgY29uc3QgZGVzaWduID0gZ2V0QnRuRGVzaWduKHByb3BzKVxuICByZXR1cm4gZGVzaWduICE9PSB2b2lkIDBcbiAgICA/IHsgWyBkZXNpZ24gXTogdHJ1ZSB9XG4gICAgOiB7fVxufVxuXG5leHBvcnQgY29uc3QgdXNlQnRuUHJvcHMgPSB7XG4gIC4uLnVzZVNpemVQcm9wcyxcbiAgLi4udXNlUm91dGVyTGlua1Byb3BzLFxuXG4gIHR5cGU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ2J1dHRvbidcbiAgfSxcblxuICBsYWJlbDogWyBOdW1iZXIsIFN0cmluZyBdLFxuICBpY29uOiBTdHJpbmcsXG4gIGljb25SaWdodDogU3RyaW5nLFxuXG4gIC4uLmJ0bkRlc2lnbk9wdGlvbnMucmVkdWNlKFxuICAgIChhY2MsIHZhbCkgPT4gKGFjY1sgdmFsIF0gPSBCb29sZWFuKSAmJiBhY2MsXG4gICAge31cbiAgKSxcblxuICBzcXVhcmU6IEJvb2xlYW4sXG4gIHJvdW5kOiBCb29sZWFuLFxuICByb3VuZGVkOiBCb29sZWFuLFxuICBnbG9zc3k6IEJvb2xlYW4sXG5cbiAgc2l6ZTogU3RyaW5nLFxuICBmYWI6IEJvb2xlYW4sXG4gIGZhYk1pbmk6IEJvb2xlYW4sXG4gIHBhZGRpbmc6IFN0cmluZyxcblxuICBjb2xvcjogU3RyaW5nLFxuICB0ZXh0Q29sb3I6IFN0cmluZyxcbiAgbm9DYXBzOiBCb29sZWFuLFxuICBub1dyYXA6IEJvb2xlYW4sXG4gIGRlbnNlOiBCb29sZWFuLFxuXG4gIHRhYmluZGV4OiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgcmlwcGxlOiB7XG4gICAgdHlwZTogWyBCb29sZWFuLCBPYmplY3QgXSxcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH0sXG5cbiAgYWxpZ246IHtcbiAgICAuLi51c2VBbGlnblByb3BzLmFsaWduLFxuICAgIGRlZmF1bHQ6ICdjZW50ZXInXG4gIH0sXG4gIHN0YWNrOiBCb29sZWFuLFxuICBzdHJldGNoOiBCb29sZWFuLFxuICBsb2FkaW5nOiB7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIGRpc2FibGU6IEJvb2xlYW5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzKSB7XG4gIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMsIGRlZmF1bHRTaXplcylcbiAgY29uc3QgYWxpZ25DbGFzcyA9IHVzZUFsaWduKHByb3BzKVxuICBjb25zdCB7IGhhc1JvdXRlckxpbmssIGhhc0xpbmssIGxpbmtUYWcsIGxpbmtBdHRycywgbmF2aWdhdGVPbkNsaWNrIH0gPSB1c2VSb3V0ZXJMaW5rKHtcbiAgICBmYWxsYmFja1RhZzogJ2J1dHRvbidcbiAgfSlcblxuICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBvYmogPSBwcm9wcy5mYWIgPT09IGZhbHNlICYmIHByb3BzLmZhYk1pbmkgPT09IGZhbHNlXG4gICAgICA/IHNpemVTdHlsZS52YWx1ZVxuICAgICAgOiB7fVxuXG4gICAgcmV0dXJuIHByb3BzLnBhZGRpbmcgIT09IHZvaWQgMFxuICAgICAgPyBPYmplY3QuYXNzaWduKHt9LCBvYmosIHtcbiAgICAgICAgcGFkZGluZzogcHJvcHMucGFkZGluZ1xuICAgICAgICAgIC5zcGxpdCgvXFxzKy8pXG4gICAgICAgICAgLm1hcCh2ID0+ICh2IGluIGJ0blBhZGRpbmcgPyBidG5QYWRkaW5nWyB2IF0gKyAncHgnIDogdikpXG4gICAgICAgICAgLmpvaW4oJyAnKSxcbiAgICAgICAgbWluV2lkdGg6ICcwJyxcbiAgICAgICAgbWluSGVpZ2h0OiAnMCdcbiAgICAgIH0pXG4gICAgICA6IG9ialxuICB9KVxuXG4gIGNvbnN0IGlzUm91bmRlZCA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMucm91bmRlZCA9PT0gdHJ1ZSB8fCBwcm9wcy5mYWIgPT09IHRydWUgfHwgcHJvcHMuZmFiTWluaSA9PT0gdHJ1ZVxuICApXG5cbiAgY29uc3QgaXNBY3Rpb25hYmxlID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIHByb3BzLmxvYWRpbmcgIT09IHRydWVcbiAgKVxuXG4gIGNvbnN0IHRhYkluZGV4ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGlzQWN0aW9uYWJsZS52YWx1ZSA9PT0gdHJ1ZSA/IHByb3BzLnRhYmluZGV4IHx8IDAgOiAtMVxuICApKVxuXG4gIGNvbnN0IGRlc2lnbiA9IGNvbXB1dGVkKCgpID0+IGdldEJ0bkRlc2lnbihwcm9wcywgJ3N0YW5kYXJkJykpXG5cbiAgY29uc3QgYXR0cmlidXRlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBhY2MgPSB7IHRhYmluZGV4OiB0YWJJbmRleC52YWx1ZSB9XG5cbiAgICBpZiAoaGFzTGluay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgT2JqZWN0LmFzc2lnbihhY2MsIGxpbmtBdHRycy52YWx1ZSlcbiAgICB9XG4gICAgZWxzZSBpZiAoZm9ybVR5cGVzLmluY2x1ZGVzKHByb3BzLnR5cGUpID09PSB0cnVlKSB7XG4gICAgICBhY2MudHlwZSA9IHByb3BzLnR5cGVcbiAgICB9XG5cbiAgICBpZiAobGlua1RhZy52YWx1ZSA9PT0gJ2EnKSB7XG4gICAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBhY2NbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChhY2MuaHJlZiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGFjYy5yb2xlID0gJ2J1dHRvbidcbiAgICAgIH1cblxuICAgICAgaWYgKGhhc1JvdXRlckxpbmsudmFsdWUgIT09IHRydWUgJiYgbWVkaWFUeXBlUkUudGVzdChwcm9wcy50eXBlKSA9PT0gdHJ1ZSkge1xuICAgICAgICBhY2MudHlwZSA9IHByb3BzLnR5cGVcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgYWNjLmRpc2FibGVkID0gJydcbiAgICAgIGFjY1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICB9XG5cbiAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSAmJiBwcm9wcy5wZXJjZW50YWdlICE9PSB2b2lkIDApIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oYWNjLCB7XG4gICAgICAgIHJvbGU6ICdwcm9ncmVzc2JhcicsXG4gICAgICAgICdhcmlhLXZhbHVlbWluJzogMCxcbiAgICAgICAgJ2FyaWEtdmFsdWVtYXgnOiAxMDAsXG4gICAgICAgICdhcmlhLXZhbHVlbm93JzogcHJvcHMucGVyY2VudGFnZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjXG4gIH0pXG5cbiAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBsZXQgY29sb3JzXG5cbiAgICBpZiAocHJvcHMuY29sb3IgIT09IHZvaWQgMCkge1xuICAgICAgaWYgKHByb3BzLmZsYXQgPT09IHRydWUgfHwgcHJvcHMub3V0bGluZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb2xvcnMgPSBgdGV4dC0keyBwcm9wcy50ZXh0Q29sb3IgfHwgcHJvcHMuY29sb3IgfWBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb2xvcnMgPSBgYmctJHsgcHJvcHMuY29sb3IgfSB0ZXh0LSR7IHByb3BzLnRleHRDb2xvciB8fCAnd2hpdGUnIH1gXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLnRleHRDb2xvcikge1xuICAgICAgY29sb3JzID0gYHRleHQtJHsgcHJvcHMudGV4dENvbG9yIH1gXG4gICAgfVxuXG4gICAgY29uc3Qgc2hhcGUgPSBwcm9wcy5yb3VuZCA9PT0gdHJ1ZVxuICAgICAgPyAncm91bmQnXG4gICAgICA6IGByZWN0YW5nbGUkeyBpc1JvdW5kZWQudmFsdWUgPT09IHRydWUgPyAnIHEtYnRuLS1yb3VuZGVkJyA6IChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtYnRuLS1zcXVhcmUnIDogJycpIH1gXG5cbiAgICByZXR1cm4gYHEtYnRuLS0keyBkZXNpZ24udmFsdWUgfSBxLWJ0bi0tJHsgc2hhcGUgfWBcbiAgICAgICsgKGNvbG9ycyAhPT0gdm9pZCAwID8gJyAnICsgY29sb3JzIDogJycpXG4gICAgICArIChpc0FjdGlvbmFibGUudmFsdWUgPT09IHRydWUgPyAnIHEtYnRuLS1hY3Rpb25hYmxlIHEtZm9jdXNhYmxlIHEtaG92ZXJhYmxlJyA6IChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJykpXG4gICAgICArIChwcm9wcy5mYWIgPT09IHRydWUgPyAnIHEtYnRuLS1mYWInIDogKHByb3BzLmZhYk1pbmkgPT09IHRydWUgPyAnIHEtYnRuLS1mYWItbWluaScgOiAnJykpXG4gICAgICArIChwcm9wcy5ub0NhcHMgPT09IHRydWUgPyAnIHEtYnRuLS1uby11cHBlcmNhc2UnIDogJycpXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS1idG4tLWRlbnNlJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3RyZXRjaCA9PT0gdHJ1ZSA/ICcgbm8tYm9yZGVyLXJhZGl1cyBzZWxmLXN0cmV0Y2gnIDogJycpXG4gICAgICArIChwcm9wcy5nbG9zc3kgPT09IHRydWUgPyAnIGdsb3NzeScgOiAnJylcbiAgICAgICsgKHByb3BzLnNxdWFyZSA/ICcgcS1idG4tLXNxdWFyZScgOiAnJylcbiAgfSlcblxuICBjb25zdCBpbm5lckNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGFsaWduQ2xhc3MudmFsdWUgKyAocHJvcHMuc3RhY2sgPT09IHRydWUgPyAnIGNvbHVtbicgOiAnIHJvdycpXG4gICAgKyAocHJvcHMubm9XcmFwID09PSB0cnVlID8gJyBuby13cmFwIHRleHQtbm8td3JhcCcgOiAnJylcbiAgICArIChwcm9wcy5sb2FkaW5nID09PSB0cnVlID8gJyBxLWJ0bl9fY29udGVudC0taGlkZGVuJyA6ICcnKVxuICApXG5cbiAgcmV0dXJuIHtcbiAgICBjbGFzc2VzLFxuICAgIHN0eWxlLFxuICAgIGlubmVyQ2xhc3NlcyxcbiAgICBhdHRyaWJ1dGVzLFxuICAgIGhhc0xpbmssXG4gICAgbGlua1RhZyxcbiAgICBuYXZpZ2F0ZU9uQ2xpY2ssXG4gICAgaXNBY3Rpb25hYmxlXG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIFRyYW5zaXRpb24sIG9uQmVmb3JlVW5tb3VudCwgd2l0aERpcmVjdGl2ZXMsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVNwaW5uZXIgZnJvbSAnLi4vc3Bpbm5lci9RU3Bpbm5lci5qcydcblxuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL1JpcHBsZS5qcydcblxuaW1wb3J0IHVzZUJ0biwgeyB1c2VCdG5Qcm9wcyB9IGZyb20gJy4vdXNlLWJ0bi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBzdG9wLCBwcmV2ZW50LCBzdG9wQW5kUHJldmVudCwgbGlzdGVuT3B0cyB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5cbmNvbnN0IHsgcGFzc2l2ZUNhcHR1cmUgfSA9IGxpc3Rlbk9wdHNcblxubGV0XG4gIHRvdWNoVGFyZ2V0ID0gbnVsbCxcbiAga2V5Ym9hcmRUYXJnZXQgPSBudWxsLFxuICBtb3VzZVRhcmdldCA9IG51bGxcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCdG4nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQnRuUHJvcHMsXG5cbiAgICBwZXJjZW50YWdlOiBOdW1iZXIsXG4gICAgZGFya1BlcmNlbnRhZ2U6IEJvb2xlYW4sXG5cbiAgICBvblRvdWNoc3RhcnQ6IFsgRnVuY3Rpb24sIEFycmF5IF1cbiAgfSxcblxuICBlbWl0czogWyAnY2xpY2snLCAna2V5ZG93bicsICdtb3VzZWRvd24nLCAna2V5dXAnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3Qge1xuICAgICAgY2xhc3Nlcywgc3R5bGUsIGlubmVyQ2xhc3NlcyxcbiAgICAgIGF0dHJpYnV0ZXMsXG4gICAgICBoYXNMaW5rLCBsaW5rVGFnLCBuYXZpZ2F0ZU9uQ2xpY2ssXG4gICAgICBpc0FjdGlvbmFibGVcbiAgICB9ID0gdXNlQnRuKHByb3BzKVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGJsdXJUYXJnZXRSZWYgPSByZWYobnVsbClcblxuICAgIGxldCBsb2NhbFRvdWNoVGFyZ2V0RWwgPSBudWxsLCBhdm9pZE1vdXNlUmlwcGxlLCBtb3VzZVRpbWVyID0gbnVsbFxuXG4gICAgY29uc3QgaGFzTGFiZWwgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMubGFiZWwgIT09IHZvaWQgMCAmJiBwcm9wcy5sYWJlbCAhPT0gbnVsbCAmJiBwcm9wcy5sYWJlbCAhPT0gJydcbiAgICApXG5cbiAgICBjb25zdCByaXBwbGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlIHx8IHByb3BzLnJpcHBsZSA9PT0gZmFsc2VcbiAgICAgICAgPyBmYWxzZVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIGtleUNvZGVzOiBoYXNMaW5rLnZhbHVlID09PSB0cnVlID8gWyAxMywgMzIgXSA6IFsgMTMgXSxcbiAgICAgICAgICAgIC4uLihwcm9wcy5yaXBwbGUgPT09IHRydWUgPyB7fSA6IHByb3BzLnJpcHBsZSlcbiAgICAgICAgICB9XG4gICAgKSlcblxuICAgIGNvbnN0IHJpcHBsZVByb3BzID0gY29tcHV0ZWQoKCkgPT4gKHsgY2VudGVyOiBwcm9wcy5yb3VuZCB9KSlcblxuICAgIGNvbnN0IHBlcmNlbnRhZ2VTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgcHJvcHMucGVyY2VudGFnZSkpXG4gICAgICByZXR1cm4gdmFsID4gMFxuICAgICAgICA/IHsgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjZzJywgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgkeyB2YWwgLSAxMDAgfSUpYCB9XG4gICAgICAgIDoge31cbiAgICB9KVxuXG4gICAgY29uc3Qgb25FdmVudHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9uTW91c2Vkb3duOiBvbkxvYWRpbmdFdnQsXG4gICAgICAgICAgb25Ub3VjaHN0YXJ0OiBvbkxvYWRpbmdFdnQsXG4gICAgICAgICAgb25DbGljazogb25Mb2FkaW5nRXZ0LFxuICAgICAgICAgIG9uS2V5ZG93bjogb25Mb2FkaW5nRXZ0LFxuICAgICAgICAgIG9uS2V5dXA6IG9uTG9hZGluZ0V2dFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0FjdGlvbmFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgYWNjID0ge1xuICAgICAgICAgIG9uQ2xpY2ssXG4gICAgICAgICAgb25LZXlkb3duLFxuICAgICAgICAgIG9uTW91c2Vkb3duXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJveHkuJHEucGxhdGZvcm0uaGFzLnRvdWNoID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3Qgc3VmZml4ID0gcHJvcHMub25Ub3VjaHN0YXJ0ICE9PSB2b2lkIDBcbiAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgIDogJ1Bhc3NpdmUnXG5cbiAgICAgICAgICBhY2NbIGBvblRvdWNoc3RhcnQkeyBzdWZmaXggfWAgXSA9IG9uVG91Y2hzdGFydFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFjY1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAvLyBuZWVkZWQ7IGVzcGVjaWFsbHkgZm9yIGRpc2FibGVkIDxhPiB0YWdzXG4gICAgICAgIG9uQ2xpY2s6IHN0b3BBbmRQcmV2ZW50XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IG5vZGVQcm9wcyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICByZWY6IHJvb3RSZWYsXG4gICAgICBjbGFzczogJ3EtYnRuIHEtYnRuLWl0ZW0gbm9uLXNlbGVjdGFibGUgbm8tb3V0bGluZSAnICsgY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAuLi5vbkV2ZW50cy52YWx1ZVxuICAgIH0pKVxuXG4gICAgZnVuY3Rpb24gb25DbGljayAoZSkge1xuICAgICAgLy8gaXMgaXQgYWxyZWFkeSBkZXN0cm95ZWQ/XG4gICAgICBpZiAocm9vdFJlZi52YWx1ZSA9PT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gICAgICBpZiAoZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICAvLyBmb2N1cyBidXR0b24gaWYgaXQgY2FtZSBmcm9tIEVOVEVSIG9uIGZvcm1cbiAgICAgICAgLy8gcHJldmVudCB0aGUgbmV3IHN1Ym1pdCAoYWxyZWFkeSBkb25lKVxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMudHlwZSA9PT0gJ3N1Ym1pdCdcbiAgICAgICAgICAmJiBlbCAhPT0gZG9jdW1lbnQuYm9keVxuICAgICAgICAgICYmIHJvb3RSZWYudmFsdWUuY29udGFpbnMoZWwpID09PSBmYWxzZVxuICAgICAgICAgIC8vIHJlcXVpcmVkIGZvciBpT1MgYW5kIGRlc2t0b3AgU2FmYXJpXG4gICAgICAgICAgJiYgZWwuY29udGFpbnMocm9vdFJlZi52YWx1ZSkgPT09IGZhbHNlXG4gICAgICAgICkge1xuICAgICAgICAgIHJvb3RSZWYudmFsdWUuZm9jdXMoKVxuXG4gICAgICAgICAgY29uc3Qgb25DbGlja0NsZWFudXAgPSAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc3RvcEFuZFByZXZlbnQsIHRydWUpXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uQ2xpY2tDbGVhbnVwLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgICAgIHJvb3RSZWYudmFsdWUgIT09IG51bGwgJiYgcm9vdFJlZi52YWx1ZS5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgb25DbGlja0NsZWFudXAsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBzdG9wQW5kUHJldmVudCwgdHJ1ZSlcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uQ2xpY2tDbGVhbnVwLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgICByb290UmVmLnZhbHVlLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBvbkNsaWNrQ2xlYW51cCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbmF2aWdhdGVPbkNsaWNrKGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlkb3duIChlKSB7XG4gICAgICAvLyBpcyBpdCBhbHJlYWR5IGRlc3Ryb3llZD9cbiAgICAgIGlmIChyb290UmVmLnZhbHVlID09PSBudWxsKSB7IHJldHVybiB9XG5cbiAgICAgIGVtaXQoJ2tleWRvd24nLCBlKVxuXG4gICAgICBpZiAoaXNLZXlDb2RlKGUsIFsgMTMsIDMyIF0pID09PSB0cnVlICYmIGtleWJvYXJkVGFyZ2V0ICE9PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIGtleWJvYXJkVGFyZ2V0ICE9PSBudWxsICYmIGNsZWFudXAoKVxuXG4gICAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQgIT09IHRydWUpIHtcbiAgICAgICAgICAvLyBmb2N1cyBleHRlcm5hbCBidXR0b24gaWYgdGhlIGZvY3VzIGhlbHBlciB3YXMgZm9jdXNlZCBiZWZvcmVcbiAgICAgICAgICByb290UmVmLnZhbHVlLmZvY3VzKClcblxuICAgICAgICAgIGtleWJvYXJkVGFyZ2V0ID0gcm9vdFJlZi52YWx1ZVxuICAgICAgICAgIHJvb3RSZWYudmFsdWUuY2xhc3NMaXN0LmFkZCgncS1idG4tLWFjdGl2ZScpXG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvblByZXNzRW5kLCB0cnVlKVxuICAgICAgICAgIHJvb3RSZWYudmFsdWUuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB9XG5cbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRvdWNoc3RhcnQgKGUpIHtcbiAgICAgIC8vIGlzIGl0IGFscmVhZHkgZGVzdHJveWVkP1xuICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHsgcmV0dXJuIH1cblxuICAgICAgZW1pdCgndG91Y2hzdGFydCcsIGUpXG5cbiAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUpIHsgcmV0dXJuIH1cblxuICAgICAgaWYgKHRvdWNoVGFyZ2V0ICE9PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIHRvdWNoVGFyZ2V0ICE9PSBudWxsICYmIGNsZWFudXAoKVxuICAgICAgICB0b3VjaFRhcmdldCA9IHJvb3RSZWYudmFsdWVcblxuICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwgPSBlLnRhcmdldFxuICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgbG9jYWxUb3VjaFRhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25QcmVzc0VuZCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG5cbiAgICAgIC8vIGF2b2lkIGR1cGxpY2F0ZWQgbW91c2Vkb3duIGV2ZW50XG4gICAgICAvLyB0cmlnZ2VyaW5nIGFub3RoZXIgZWFybHkgcmlwcGxlXG4gICAgICBhdm9pZE1vdXNlUmlwcGxlID0gdHJ1ZVxuICAgICAgbW91c2VUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQobW91c2VUaW1lcilcbiAgICAgIG1vdXNlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbW91c2VUaW1lciA9IG51bGxcbiAgICAgICAgYXZvaWRNb3VzZVJpcHBsZSA9IGZhbHNlXG4gICAgICB9LCAyMDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZWRvd24gKGUpIHtcbiAgICAgIC8vIGlzIGl0IGFscmVhZHkgZGVzdHJveWVkP1xuICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHsgcmV0dXJuIH1cblxuICAgICAgZS5xU2tpcFJpcHBsZSA9IGF2b2lkTW91c2VSaXBwbGUgPT09IHRydWVcbiAgICAgIGVtaXQoJ21vdXNlZG93bicsIGUpXG5cbiAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQgIT09IHRydWUgJiYgbW91c2VUYXJnZXQgIT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgbW91c2VUYXJnZXQgIT09IG51bGwgJiYgY2xlYW51cCgpXG4gICAgICAgIG1vdXNlVGFyZ2V0ID0gcm9vdFJlZi52YWx1ZVxuICAgICAgICByb290UmVmLnZhbHVlLmNsYXNzTGlzdC5hZGQoJ3EtYnRuLS1hY3RpdmUnKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25QcmVzc0VuZCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QcmVzc0VuZCAoZSkge1xuICAgICAgLy8gaXMgaXQgYWxyZWFkeSBkZXN0cm95ZWQ/XG4gICAgICBpZiAocm9vdFJlZi52YWx1ZSA9PT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gICAgICAvLyBuZWVkZWQgZm9yIElFIChiZWNhdXNlIGl0IGVtaXRzIGJsdXIgd2hlbiBmb2N1c2luZyBidXR0b24gZnJvbSBmb2N1cyBoZWxwZXIpXG4gICAgICBpZiAoZSAhPT0gdm9pZCAwICYmIGUudHlwZSA9PT0gJ2JsdXInICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChlICE9PSB2b2lkIDAgJiYgZS50eXBlID09PSAna2V5dXAnKSB7XG4gICAgICAgIGlmIChrZXlib2FyZFRhcmdldCA9PT0gcm9vdFJlZi52YWx1ZSAmJiBpc0tleUNvZGUoZSwgWyAxMywgMzIgXSkgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBmb3IgY2xpY2sgdHJpZ2dlclxuICAgICAgICAgIGNvbnN0IGV2dCA9IG5ldyBNb3VzZUV2ZW50KCdjbGljaycsIGUpXG4gICAgICAgICAgZXZ0LnFLZXlFdmVudCA9IHRydWVcbiAgICAgICAgICBlLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUgJiYgcHJldmVudChldnQpXG4gICAgICAgICAgZS5jYW5jZWxCdWJibGUgPT09IHRydWUgJiYgc3RvcChldnQpXG4gICAgICAgICAgcm9vdFJlZi52YWx1ZS5kaXNwYXRjaEV2ZW50KGV2dClcblxuICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICAgICAgICAvLyBmb3IgcmlwcGxlXG4gICAgICAgICAgZS5xS2V5RXZlbnQgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0KCdrZXl1cCcsIGUpXG4gICAgICB9XG5cbiAgICAgIGNsZWFudXAoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFudXAgKGRlc3Ryb3lpbmcpIHtcbiAgICAgIGNvbnN0IGJsdXJUYXJnZXQgPSBibHVyVGFyZ2V0UmVmLnZhbHVlXG5cbiAgICAgIGlmIChcbiAgICAgICAgZGVzdHJveWluZyAhPT0gdHJ1ZVxuICAgICAgICAmJiAodG91Y2hUYXJnZXQgPT09IHJvb3RSZWYudmFsdWUgfHwgbW91c2VUYXJnZXQgPT09IHJvb3RSZWYudmFsdWUpXG4gICAgICAgICYmIGJsdXJUYXJnZXQgIT09IG51bGxcbiAgICAgICAgJiYgYmx1clRhcmdldCAhPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgKSB7XG4gICAgICAgIGJsdXJUYXJnZXQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKVxuICAgICAgICBibHVyVGFyZ2V0LmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgaWYgKHRvdWNoVGFyZ2V0ID09PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIGlmIChsb2NhbFRvdWNoVGFyZ2V0RWwgIT09IG51bGwpIHtcbiAgICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgfVxuICAgICAgICB0b3VjaFRhcmdldCA9IGxvY2FsVG91Y2hUYXJnZXRFbCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKG1vdXNlVGFyZ2V0ID09PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgbW91c2VUYXJnZXQgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmIChrZXlib2FyZFRhcmdldCA9PT0gcm9vdFJlZi52YWx1ZSkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uUHJlc3NFbmQsIHRydWUpXG4gICAgICAgIHJvb3RSZWYudmFsdWUgIT09IG51bGwgJiYgcm9vdFJlZi52YWx1ZS5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgb25QcmVzc0VuZCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIGtleWJvYXJkVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuXG4gICAgICByb290UmVmLnZhbHVlICE9PSBudWxsICYmIHJvb3RSZWYudmFsdWUuY2xhc3NMaXN0LnJlbW92ZSgncS1idG4tLWFjdGl2ZScpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Mb2FkaW5nRXZ0IChldnQpIHtcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGV2dClcbiAgICAgIGV2dC5xU2tpcFJpcHBsZSA9IHRydWVcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgY2xlYW51cCh0cnVlKVxuICAgIH0pXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7IGNsaWNrOiBvbkNsaWNrIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgbGV0IGlubmVyID0gW11cblxuICAgICAgcHJvcHMuaWNvbiAhPT0gdm9pZCAwICYmIGlubmVyLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBuYW1lOiBwcm9wcy5pY29uLFxuICAgICAgICAgIGxlZnQ6IHByb3BzLnN0YWNrID09PSBmYWxzZSAmJiBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgICByb2xlOiAnaW1nJyxcbiAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgaGFzTGFiZWwudmFsdWUgPT09IHRydWUgJiYgaW5uZXIucHVzaChcbiAgICAgICAgaCgnc3BhbicsIHsgY2xhc3M6ICdibG9jaycgfSwgWyBwcm9wcy5sYWJlbCBdKVxuICAgICAgKVxuXG4gICAgICBpbm5lciA9IGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgaW5uZXIpXG5cbiAgICAgIGlmIChwcm9wcy5pY29uUmlnaHQgIT09IHZvaWQgMCAmJiBwcm9wcy5yb3VuZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgaW5uZXIucHVzaChcbiAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICBuYW1lOiBwcm9wcy5pY29uUmlnaHQsXG4gICAgICAgICAgICByaWdodDogcHJvcHMuc3RhY2sgPT09IGZhbHNlICYmIGhhc0xhYmVsLnZhbHVlID09PSB0cnVlLFxuICAgICAgICAgICAgcm9sZTogJ2ltZycsXG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKCdzcGFuJywge1xuICAgICAgICAgIGNsYXNzOiAncS1mb2N1cy1oZWxwZXInLFxuICAgICAgICAgIHJlZjogYmx1clRhcmdldFJlZlxuICAgICAgICB9KVxuICAgICAgXVxuXG4gICAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSAmJiBwcm9wcy5wZXJjZW50YWdlICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBoKCdzcGFuJywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWJ0bl9fcHJvZ3Jlc3MgYWJzb2x1dGUtZnVsbCBvdmVyZmxvdy1oaWRkZW4nICsgKHByb3BzLmRhcmtQZXJjZW50YWdlID09PSB0cnVlID8gJyBxLWJ0bl9fcHJvZ3Jlc3MtLWRhcmsnIDogJycpXG4gICAgICAgICAgfSwgW1xuICAgICAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdxLWJ0bl9fcHJvZ3Jlc3MtaW5kaWNhdG9yIGZpdCBibG9jaycsXG4gICAgICAgICAgICAgIHN0eWxlOiBwZXJjZW50YWdlU3R5bGUudmFsdWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdzcGFuJywge1xuICAgICAgICAgIGNsYXNzOiAncS1idG5fX2NvbnRlbnQgdGV4dC1jZW50ZXIgY29sIGl0ZW1zLWNlbnRlciBxLWFuY2hvci0tc2tpcCAnICsgaW5uZXJDbGFzc2VzLnZhbHVlXG4gICAgICAgIH0sIGlubmVyKVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5sb2FkaW5nICE9PSBudWxsICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoVHJhbnNpdGlvbiwge1xuICAgICAgICAgIG5hbWU6ICdxLXRyYW5zaXRpb24tLWZhZGUnXG4gICAgICAgIH0sICgpID0+IChcbiAgICAgICAgICBwcm9wcy5sb2FkaW5nID09PSB0cnVlXG4gICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICBoKCdzcGFuJywge1xuICAgICAgICAgICAgICAgICAga2V5OiAnbG9hZGluZycsXG4gICAgICAgICAgICAgICAgICBjbGFzczogJ2Fic29sdXRlLWZ1bGwgZmxleCBmbGV4LWNlbnRlcidcbiAgICAgICAgICAgICAgICB9LCBzbG90cy5sb2FkaW5nICE9PSB2b2lkIDAgPyBzbG90cy5sb2FkaW5nKCkgOiBbIGgoUVNwaW5uZXIpIF0pXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICApKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgIGgoXG4gICAgICAgICAgbGlua1RhZy52YWx1ZSxcbiAgICAgICAgICBub2RlUHJvcHMudmFsdWUsXG4gICAgICAgICAgY2hpbGRcbiAgICAgICAgKSxcbiAgICAgICAgWyBbXG4gICAgICAgICAgUmlwcGxlLFxuICAgICAgICAgIHJpcHBsZS52YWx1ZSxcbiAgICAgICAgICB2b2lkIDAsXG4gICAgICAgICAgcmlwcGxlUHJvcHMudmFsdWVcbiAgICAgICAgXSBdXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFHTyxNQUFNLGtCQUFrQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxJQUNKLE1BQU0sQ0FBRSxRQUFRLE1BQVE7QUFBQSxJQUN4QixTQUFTO0FBQUEsRUFDVjtBQUFBLEVBQ0QsT0FBTztBQUNUO0FBRWUsU0FBUyxXQUFZLE9BQU87QUFDekMsU0FBTztBQUFBLElBQ0wsT0FBTyxTQUFTLE1BQ2QsTUFBTSxRQUFRLGtCQUNWLEdBQUksZ0JBQWlCLE1BQU0sWUFDM0IsTUFBTSxJQUNYO0FBQUEsSUFFRCxTQUFTO0FBQUEsTUFBUyxNQUNoQixlQUFlLE1BQU0sUUFBUSxTQUFVLE1BQU0sVUFBVztBQUFBLElBQ3pEO0FBQUEsRUFDRjtBQUNIO0FDakJBLElBQUEsV0FBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFFSCxXQUFXO0FBQUEsTUFDVCxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQSxFQUVELE1BQU8sT0FBTztBQUNaLFVBQU0sRUFBRSxPQUFPLFlBQVksV0FBVyxLQUFLO0FBRTNDLFdBQU8sTUFBTSxFQUFFLE9BQU87QUFBQSxNQUNwQixPQUFPLFFBQVEsUUFBUTtBQUFBLE1BQ3ZCLE9BQU8sTUFBTTtBQUFBLE1BQ2IsUUFBUSxNQUFNO0FBQUEsTUFDZCxTQUFTO0FBQUEsSUFDZixHQUFPO0FBQUEsTUFDRCxFQUFFLFVBQVU7QUFBQSxRQUNWLE9BQU87QUFBQSxRQUNQLElBQUk7QUFB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
