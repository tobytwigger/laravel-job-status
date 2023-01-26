import { c as computed, h, r as ref, k as onBeforeUnmount, X as Transition, D as withDirectives, g as getCurrentInstance, q as stopAndPrevent, Y as isKeyCode, z as prevent, A as stop, p as listenOpts } from "./index.07765cf9.js";
import { u as useSizeDefaults, a as useSizeProps, b as useRouterLinkProps, d as useAlignProps, e as useSize, f as useAlign, h as useRouterLink, Q as QIcon, R as Ripple } from "./use-router-link.70d2557d.js";
import { c as createComponent, e as hMergeSlot } from "./render.34f10d21.js";
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
const getBtnDesignAttr = (props) => {
  const design = getBtnDesign(props);
  return design !== void 0 ? { [design]: true } : {};
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
export { QBtn as Q, getBtnDesignAttr as g };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUJ0bi5mODc1Y2RlYS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc3Bpbm5lci91c2Utc3Bpbm5lci5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NwaW5uZXIvUVNwaW5uZXIuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9idG4vdXNlLWJ0bi5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2J0bi9RQnRuLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgdXNlU2l6ZURlZmF1bHRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcblxuZXhwb3J0IGNvbnN0IHVzZVNwaW5uZXJQcm9wcyA9IHtcbiAgc2l6ZToge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAnMWVtJ1xuICB9LFxuICBjb2xvcjogU3RyaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHVzZVNwaW5uZXIgKHByb3BzKSB7XG4gIHJldHVybiB7XG4gICAgY1NpemU6IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnNpemUgaW4gdXNlU2l6ZURlZmF1bHRzXG4gICAgICAgID8gYCR7IHVzZVNpemVEZWZhdWx0c1sgcHJvcHMuc2l6ZSBdIH1weGBcbiAgICAgICAgOiBwcm9wcy5zaXplXG4gICAgKSksXG5cbiAgICBjbGFzc2VzOiBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3Etc3Bpbm5lcicgKyAocHJvcHMuY29sb3IgPyBgIHRleHQtJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICApXG4gIH1cbn1cbiIsImltcG9ydCB7IGggfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VTcGlubmVyLCB7IHVzZVNwaW5uZXJQcm9wcyB9IGZyb20gJy4vdXNlLXNwaW5uZXIuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNwaW5uZXInLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlU3Bpbm5lclByb3BzLFxuXG4gICAgdGhpY2tuZXNzOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiA1XG4gICAgfVxuICB9LFxuXG4gIHNldHVwIChwcm9wcykge1xuICAgIGNvbnN0IHsgY1NpemUsIGNsYXNzZXMgfSA9IHVzZVNwaW5uZXIocHJvcHMpXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnc3ZnJywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUgKyAnIHEtc3Bpbm5lci1tYXQnLFxuICAgICAgd2lkdGg6IGNTaXplLnZhbHVlLFxuICAgICAgaGVpZ2h0OiBjU2l6ZS52YWx1ZSxcbiAgICAgIHZpZXdCb3g6ICcyNSAyNSA1MCA1MCdcbiAgICB9LCBbXG4gICAgICBoKCdjaXJjbGUnLCB7XG4gICAgICAgIGNsYXNzOiAncGF0aCcsXG4gICAgICAgIGN4OiAnNTAnLFxuICAgICAgICBjeTogJzUwJyxcbiAgICAgICAgcjogJzIwJyxcbiAgICAgICAgZmlsbDogJ25vbmUnLFxuICAgICAgICBzdHJva2U6ICdjdXJyZW50Q29sb3InLFxuICAgICAgICAnc3Ryb2tlLXdpZHRoJzogcHJvcHMudGhpY2tuZXNzLFxuICAgICAgICAnc3Ryb2tlLW1pdGVybGltaXQnOiAnMTAnXG4gICAgICB9KVxuICAgIF0pXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUFsaWduLCB7IHVzZUFsaWduUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1hbGlnbi5qcydcbmltcG9ydCB1c2VTaXplLCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNpemUuanMnXG5pbXBvcnQgdXNlUm91dGVyTGluaywgeyB1c2VSb3V0ZXJMaW5rUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1yb3V0ZXItbGluay5qcydcblxuZXhwb3J0IGNvbnN0IGJ0blBhZGRpbmcgPSB7XG4gIG5vbmU6IDAsXG4gIHhzOiA0LFxuICBzbTogOCxcbiAgbWQ6IDE2LFxuICBsZzogMjQsXG4gIHhsOiAzMlxufVxuXG5jb25zdCBkZWZhdWx0U2l6ZXMgPSB7XG4gIHhzOiA4LFxuICBzbTogMTAsXG4gIG1kOiAxNCxcbiAgbGc6IDIwLFxuICB4bDogMjRcbn1cblxuY29uc3QgZm9ybVR5cGVzID0gWyAnYnV0dG9uJywgJ3N1Ym1pdCcsICdyZXNldCcgXVxuY29uc3QgbWVkaWFUeXBlUkUgPSAvW15cXHNdXFwvW15cXHNdL1xuXG5leHBvcnQgY29uc3QgYnRuRGVzaWduT3B0aW9ucyA9IFsgJ2ZsYXQnLCAnb3V0bGluZScsICdwdXNoJywgJ3VuZWxldmF0ZWQnIF1cbmV4cG9ydCBjb25zdCBnZXRCdG5EZXNpZ24gPSAocHJvcHMsIGRlZmF1bHRWYWx1ZSkgPT4ge1xuICBpZiAocHJvcHMuZmxhdCA9PT0gdHJ1ZSkgcmV0dXJuICdmbGF0J1xuICBpZiAocHJvcHMub3V0bGluZSA9PT0gdHJ1ZSkgcmV0dXJuICdvdXRsaW5lJ1xuICBpZiAocHJvcHMucHVzaCA9PT0gdHJ1ZSkgcmV0dXJuICdwdXNoJ1xuICBpZiAocHJvcHMudW5lbGV2YXRlZCA9PT0gdHJ1ZSkgcmV0dXJuICd1bmVsZXZhdGVkJ1xuICByZXR1cm4gZGVmYXVsdFZhbHVlXG59XG5leHBvcnQgY29uc3QgZ2V0QnRuRGVzaWduQXR0ciA9IHByb3BzID0+IHtcbiAgY29uc3QgZGVzaWduID0gZ2V0QnRuRGVzaWduKHByb3BzKVxuICByZXR1cm4gZGVzaWduICE9PSB2b2lkIDBcbiAgICA/IHsgWyBkZXNpZ24gXTogdHJ1ZSB9XG4gICAgOiB7fVxufVxuXG5leHBvcnQgY29uc3QgdXNlQnRuUHJvcHMgPSB7XG4gIC4uLnVzZVNpemVQcm9wcyxcbiAgLi4udXNlUm91dGVyTGlua1Byb3BzLFxuXG4gIHR5cGU6IHtcbiAgICB0eXBlOiBTdHJpbmcsXG4gICAgZGVmYXVsdDogJ2J1dHRvbidcbiAgfSxcblxuICBsYWJlbDogWyBOdW1iZXIsIFN0cmluZyBdLFxuICBpY29uOiBTdHJpbmcsXG4gIGljb25SaWdodDogU3RyaW5nLFxuXG4gIC4uLmJ0bkRlc2lnbk9wdGlvbnMucmVkdWNlKFxuICAgIChhY2MsIHZhbCkgPT4gKGFjY1sgdmFsIF0gPSBCb29sZWFuKSAmJiBhY2MsXG4gICAge31cbiAgKSxcblxuICBzcXVhcmU6IEJvb2xlYW4sXG4gIHJvdW5kOiBCb29sZWFuLFxuICByb3VuZGVkOiBCb29sZWFuLFxuICBnbG9zc3k6IEJvb2xlYW4sXG5cbiAgc2l6ZTogU3RyaW5nLFxuICBmYWI6IEJvb2xlYW4sXG4gIGZhYk1pbmk6IEJvb2xlYW4sXG4gIHBhZGRpbmc6IFN0cmluZyxcblxuICBjb2xvcjogU3RyaW5nLFxuICB0ZXh0Q29sb3I6IFN0cmluZyxcbiAgbm9DYXBzOiBCb29sZWFuLFxuICBub1dyYXA6IEJvb2xlYW4sXG4gIGRlbnNlOiBCb29sZWFuLFxuXG4gIHRhYmluZGV4OiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgcmlwcGxlOiB7XG4gICAgdHlwZTogWyBCb29sZWFuLCBPYmplY3QgXSxcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH0sXG5cbiAgYWxpZ246IHtcbiAgICAuLi51c2VBbGlnblByb3BzLmFsaWduLFxuICAgIGRlZmF1bHQ6ICdjZW50ZXInXG4gIH0sXG4gIHN0YWNrOiBCb29sZWFuLFxuICBzdHJldGNoOiBCb29sZWFuLFxuICBsb2FkaW5nOiB7XG4gICAgdHlwZTogQm9vbGVhbixcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIGRpc2FibGU6IEJvb2xlYW5cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzKSB7XG4gIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMsIGRlZmF1bHRTaXplcylcbiAgY29uc3QgYWxpZ25DbGFzcyA9IHVzZUFsaWduKHByb3BzKVxuICBjb25zdCB7IGhhc1JvdXRlckxpbmssIGhhc0xpbmssIGxpbmtUYWcsIGxpbmtBdHRycywgbmF2aWdhdGVPbkNsaWNrIH0gPSB1c2VSb3V0ZXJMaW5rKHtcbiAgICBmYWxsYmFja1RhZzogJ2J1dHRvbidcbiAgfSlcblxuICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBvYmogPSBwcm9wcy5mYWIgPT09IGZhbHNlICYmIHByb3BzLmZhYk1pbmkgPT09IGZhbHNlXG4gICAgICA/IHNpemVTdHlsZS52YWx1ZVxuICAgICAgOiB7fVxuXG4gICAgcmV0dXJuIHByb3BzLnBhZGRpbmcgIT09IHZvaWQgMFxuICAgICAgPyBPYmplY3QuYXNzaWduKHt9LCBvYmosIHtcbiAgICAgICAgcGFkZGluZzogcHJvcHMucGFkZGluZ1xuICAgICAgICAgIC5zcGxpdCgvXFxzKy8pXG4gICAgICAgICAgLm1hcCh2ID0+ICh2IGluIGJ0blBhZGRpbmcgPyBidG5QYWRkaW5nWyB2IF0gKyAncHgnIDogdikpXG4gICAgICAgICAgLmpvaW4oJyAnKSxcbiAgICAgICAgbWluV2lkdGg6ICcwJyxcbiAgICAgICAgbWluSGVpZ2h0OiAnMCdcbiAgICAgIH0pXG4gICAgICA6IG9ialxuICB9KVxuXG4gIGNvbnN0IGlzUm91bmRlZCA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMucm91bmRlZCA9PT0gdHJ1ZSB8fCBwcm9wcy5mYWIgPT09IHRydWUgfHwgcHJvcHMuZmFiTWluaSA9PT0gdHJ1ZVxuICApXG5cbiAgY29uc3QgaXNBY3Rpb25hYmxlID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIHByb3BzLmxvYWRpbmcgIT09IHRydWVcbiAgKVxuXG4gIGNvbnN0IHRhYkluZGV4ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIGlzQWN0aW9uYWJsZS52YWx1ZSA9PT0gdHJ1ZSA/IHByb3BzLnRhYmluZGV4IHx8IDAgOiAtMVxuICApKVxuXG4gIGNvbnN0IGRlc2lnbiA9IGNvbXB1dGVkKCgpID0+IGdldEJ0bkRlc2lnbihwcm9wcywgJ3N0YW5kYXJkJykpXG5cbiAgY29uc3QgYXR0cmlidXRlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBhY2MgPSB7IHRhYmluZGV4OiB0YWJJbmRleC52YWx1ZSB9XG5cbiAgICBpZiAoaGFzTGluay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgT2JqZWN0LmFzc2lnbihhY2MsIGxpbmtBdHRycy52YWx1ZSlcbiAgICB9XG4gICAgZWxzZSBpZiAoZm9ybVR5cGVzLmluY2x1ZGVzKHByb3BzLnR5cGUpID09PSB0cnVlKSB7XG4gICAgICBhY2MudHlwZSA9IHByb3BzLnR5cGVcbiAgICB9XG5cbiAgICBpZiAobGlua1RhZy52YWx1ZSA9PT0gJ2EnKSB7XG4gICAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICBhY2NbICdhcmlhLWRpc2FibGVkJyBdID0gJ3RydWUnXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChhY2MuaHJlZiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIGFjYy5yb2xlID0gJ2J1dHRvbidcbiAgICAgIH1cblxuICAgICAgaWYgKGhhc1JvdXRlckxpbmsudmFsdWUgIT09IHRydWUgJiYgbWVkaWFUeXBlUkUudGVzdChwcm9wcy50eXBlKSA9PT0gdHJ1ZSkge1xuICAgICAgICBhY2MudHlwZSA9IHByb3BzLnR5cGVcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgYWNjLmRpc2FibGVkID0gJydcbiAgICAgIGFjY1sgJ2FyaWEtZGlzYWJsZWQnIF0gPSAndHJ1ZSdcbiAgICB9XG5cbiAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSAmJiBwcm9wcy5wZXJjZW50YWdlICE9PSB2b2lkIDApIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oYWNjLCB7XG4gICAgICAgIHJvbGU6ICdwcm9ncmVzc2JhcicsXG4gICAgICAgICdhcmlhLXZhbHVlbWluJzogMCxcbiAgICAgICAgJ2FyaWEtdmFsdWVtYXgnOiAxMDAsXG4gICAgICAgICdhcmlhLXZhbHVlbm93JzogcHJvcHMucGVyY2VudGFnZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjXG4gIH0pXG5cbiAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBsZXQgY29sb3JzXG5cbiAgICBpZiAocHJvcHMuY29sb3IgIT09IHZvaWQgMCkge1xuICAgICAgaWYgKHByb3BzLmZsYXQgPT09IHRydWUgfHwgcHJvcHMub3V0bGluZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb2xvcnMgPSBgdGV4dC0keyBwcm9wcy50ZXh0Q29sb3IgfHwgcHJvcHMuY29sb3IgfWBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb2xvcnMgPSBgYmctJHsgcHJvcHMuY29sb3IgfSB0ZXh0LSR7IHByb3BzLnRleHRDb2xvciB8fCAnd2hpdGUnIH1gXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHByb3BzLnRleHRDb2xvcikge1xuICAgICAgY29sb3JzID0gYHRleHQtJHsgcHJvcHMudGV4dENvbG9yIH1gXG4gICAgfVxuXG4gICAgY29uc3Qgc2hhcGUgPSBwcm9wcy5yb3VuZCA9PT0gdHJ1ZVxuICAgICAgPyAncm91bmQnXG4gICAgICA6IGByZWN0YW5nbGUkeyBpc1JvdW5kZWQudmFsdWUgPT09IHRydWUgPyAnIHEtYnRuLS1yb3VuZGVkJyA6IChwcm9wcy5zcXVhcmUgPT09IHRydWUgPyAnIHEtYnRuLS1zcXVhcmUnIDogJycpIH1gXG5cbiAgICByZXR1cm4gYHEtYnRuLS0keyBkZXNpZ24udmFsdWUgfSBxLWJ0bi0tJHsgc2hhcGUgfWBcbiAgICAgICsgKGNvbG9ycyAhPT0gdm9pZCAwID8gJyAnICsgY29sb3JzIDogJycpXG4gICAgICArIChpc0FjdGlvbmFibGUudmFsdWUgPT09IHRydWUgPyAnIHEtYnRuLS1hY3Rpb25hYmxlIHEtZm9jdXNhYmxlIHEtaG92ZXJhYmxlJyA6IChwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJyBkaXNhYmxlZCcgOiAnJykpXG4gICAgICArIChwcm9wcy5mYWIgPT09IHRydWUgPyAnIHEtYnRuLS1mYWInIDogKHByb3BzLmZhYk1pbmkgPT09IHRydWUgPyAnIHEtYnRuLS1mYWItbWluaScgOiAnJykpXG4gICAgICArIChwcm9wcy5ub0NhcHMgPT09IHRydWUgPyAnIHEtYnRuLS1uby11cHBlcmNhc2UnIDogJycpXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS1idG4tLWRlbnNlJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3RyZXRjaCA9PT0gdHJ1ZSA/ICcgbm8tYm9yZGVyLXJhZGl1cyBzZWxmLXN0cmV0Y2gnIDogJycpXG4gICAgICArIChwcm9wcy5nbG9zc3kgPT09IHRydWUgPyAnIGdsb3NzeScgOiAnJylcbiAgICAgICsgKHByb3BzLnNxdWFyZSA/ICcgcS1idG4tLXNxdWFyZScgOiAnJylcbiAgfSlcblxuICBjb25zdCBpbm5lckNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgIGFsaWduQ2xhc3MudmFsdWUgKyAocHJvcHMuc3RhY2sgPT09IHRydWUgPyAnIGNvbHVtbicgOiAnIHJvdycpXG4gICAgKyAocHJvcHMubm9XcmFwID09PSB0cnVlID8gJyBuby13cmFwIHRleHQtbm8td3JhcCcgOiAnJylcbiAgICArIChwcm9wcy5sb2FkaW5nID09PSB0cnVlID8gJyBxLWJ0bl9fY29udGVudC0taGlkZGVuJyA6ICcnKVxuICApXG5cbiAgcmV0dXJuIHtcbiAgICBjbGFzc2VzLFxuICAgIHN0eWxlLFxuICAgIGlubmVyQ2xhc3NlcyxcbiAgICBhdHRyaWJ1dGVzLFxuICAgIGhhc0xpbmssXG4gICAgbGlua1RhZyxcbiAgICBuYXZpZ2F0ZU9uQ2xpY2ssXG4gICAgaXNBY3Rpb25hYmxlXG4gIH1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIFRyYW5zaXRpb24sIG9uQmVmb3JlVW5tb3VudCwgd2l0aERpcmVjdGl2ZXMsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVNwaW5uZXIgZnJvbSAnLi4vc3Bpbm5lci9RU3Bpbm5lci5qcydcblxuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL1JpcHBsZS5qcydcblxuaW1wb3J0IHVzZUJ0biwgeyB1c2VCdG5Qcm9wcyB9IGZyb20gJy4vdXNlLWJ0bi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBzdG9wLCBwcmV2ZW50LCBzdG9wQW5kUHJldmVudCwgbGlzdGVuT3B0cyB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5cbmNvbnN0IHsgcGFzc2l2ZUNhcHR1cmUgfSA9IGxpc3Rlbk9wdHNcblxubGV0XG4gIHRvdWNoVGFyZ2V0ID0gbnVsbCxcbiAga2V5Ym9hcmRUYXJnZXQgPSBudWxsLFxuICBtb3VzZVRhcmdldCA9IG51bGxcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCdG4nLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQnRuUHJvcHMsXG5cbiAgICBwZXJjZW50YWdlOiBOdW1iZXIsXG4gICAgZGFya1BlcmNlbnRhZ2U6IEJvb2xlYW4sXG5cbiAgICBvblRvdWNoc3RhcnQ6IFsgRnVuY3Rpb24sIEFycmF5IF1cbiAgfSxcblxuICBlbWl0czogWyAnY2xpY2snLCAna2V5ZG93bicsICdtb3VzZWRvd24nLCAna2V5dXAnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gICAgY29uc3Qge1xuICAgICAgY2xhc3Nlcywgc3R5bGUsIGlubmVyQ2xhc3NlcyxcbiAgICAgIGF0dHJpYnV0ZXMsXG4gICAgICBoYXNMaW5rLCBsaW5rVGFnLCBuYXZpZ2F0ZU9uQ2xpY2ssXG4gICAgICBpc0FjdGlvbmFibGVcbiAgICB9ID0gdXNlQnRuKHByb3BzKVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGJsdXJUYXJnZXRSZWYgPSByZWYobnVsbClcblxuICAgIGxldCBsb2NhbFRvdWNoVGFyZ2V0RWwgPSBudWxsLCBhdm9pZE1vdXNlUmlwcGxlLCBtb3VzZVRpbWVyID0gbnVsbFxuXG4gICAgY29uc3QgaGFzTGFiZWwgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMubGFiZWwgIT09IHZvaWQgMCAmJiBwcm9wcy5sYWJlbCAhPT0gbnVsbCAmJiBwcm9wcy5sYWJlbCAhPT0gJydcbiAgICApXG5cbiAgICBjb25zdCByaXBwbGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlIHx8IHByb3BzLnJpcHBsZSA9PT0gZmFsc2VcbiAgICAgICAgPyBmYWxzZVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIGtleUNvZGVzOiBoYXNMaW5rLnZhbHVlID09PSB0cnVlID8gWyAxMywgMzIgXSA6IFsgMTMgXSxcbiAgICAgICAgICAgIC4uLihwcm9wcy5yaXBwbGUgPT09IHRydWUgPyB7fSA6IHByb3BzLnJpcHBsZSlcbiAgICAgICAgICB9XG4gICAgKSlcblxuICAgIGNvbnN0IHJpcHBsZVByb3BzID0gY29tcHV0ZWQoKCkgPT4gKHsgY2VudGVyOiBwcm9wcy5yb3VuZCB9KSlcblxuICAgIGNvbnN0IHBlcmNlbnRhZ2VTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHZhbCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgcHJvcHMucGVyY2VudGFnZSkpXG4gICAgICByZXR1cm4gdmFsID4gMFxuICAgICAgICA/IHsgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjZzJywgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgkeyB2YWwgLSAxMDAgfSUpYCB9XG4gICAgICAgIDoge31cbiAgICB9KVxuXG4gICAgY29uc3Qgb25FdmVudHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG9uTW91c2Vkb3duOiBvbkxvYWRpbmdFdnQsXG4gICAgICAgICAgb25Ub3VjaHN0YXJ0OiBvbkxvYWRpbmdFdnQsXG4gICAgICAgICAgb25DbGljazogb25Mb2FkaW5nRXZ0LFxuICAgICAgICAgIG9uS2V5ZG93bjogb25Mb2FkaW5nRXZ0LFxuICAgICAgICAgIG9uS2V5dXA6IG9uTG9hZGluZ0V2dFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0FjdGlvbmFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3QgYWNjID0ge1xuICAgICAgICAgIG9uQ2xpY2ssXG4gICAgICAgICAgb25LZXlkb3duLFxuICAgICAgICAgIG9uTW91c2Vkb3duXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJveHkuJHEucGxhdGZvcm0uaGFzLnRvdWNoID09PSB0cnVlKSB7XG4gICAgICAgICAgY29uc3Qgc3VmZml4ID0gcHJvcHMub25Ub3VjaHN0YXJ0ICE9PSB2b2lkIDBcbiAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgIDogJ1Bhc3NpdmUnXG5cbiAgICAgICAgICBhY2NbIGBvblRvdWNoc3RhcnQkeyBzdWZmaXggfWAgXSA9IG9uVG91Y2hzdGFydFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFjY1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAvLyBuZWVkZWQ7IGVzcGVjaWFsbHkgZm9yIGRpc2FibGVkIDxhPiB0YWdzXG4gICAgICAgIG9uQ2xpY2s6IHN0b3BBbmRQcmV2ZW50XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IG5vZGVQcm9wcyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICByZWY6IHJvb3RSZWYsXG4gICAgICBjbGFzczogJ3EtYnRuIHEtYnRuLWl0ZW0gbm9uLXNlbGVjdGFibGUgbm8tb3V0bGluZSAnICsgY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgIC4uLmF0dHJpYnV0ZXMudmFsdWUsXG4gICAgICAuLi5vbkV2ZW50cy52YWx1ZVxuICAgIH0pKVxuXG4gICAgZnVuY3Rpb24gb25DbGljayAoZSkge1xuICAgICAgLy8gaXMgaXQgYWxyZWFkeSBkZXN0cm95ZWQ/XG4gICAgICBpZiAocm9vdFJlZi52YWx1ZSA9PT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gICAgICBpZiAoZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICAvLyBmb2N1cyBidXR0b24gaWYgaXQgY2FtZSBmcm9tIEVOVEVSIG9uIGZvcm1cbiAgICAgICAgLy8gcHJldmVudCB0aGUgbmV3IHN1Ym1pdCAoYWxyZWFkeSBkb25lKVxuICAgICAgICBpZiAoXG4gICAgICAgICAgcHJvcHMudHlwZSA9PT0gJ3N1Ym1pdCdcbiAgICAgICAgICAmJiBlbCAhPT0gZG9jdW1lbnQuYm9keVxuICAgICAgICAgICYmIHJvb3RSZWYudmFsdWUuY29udGFpbnMoZWwpID09PSBmYWxzZVxuICAgICAgICAgIC8vIHJlcXVpcmVkIGZvciBpT1MgYW5kIGRlc2t0b3AgU2FmYXJpXG4gICAgICAgICAgJiYgZWwuY29udGFpbnMocm9vdFJlZi52YWx1ZSkgPT09IGZhbHNlXG4gICAgICAgICkge1xuICAgICAgICAgIHJvb3RSZWYudmFsdWUuZm9jdXMoKVxuXG4gICAgICAgICAgY29uc3Qgb25DbGlja0NsZWFudXAgPSAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgc3RvcEFuZFByZXZlbnQsIHRydWUpXG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uQ2xpY2tDbGVhbnVwLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgICAgIHJvb3RSZWYudmFsdWUgIT09IG51bGwgJiYgcm9vdFJlZi52YWx1ZS5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgb25DbGlja0NsZWFudXAsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBzdG9wQW5kUHJldmVudCwgdHJ1ZSlcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uQ2xpY2tDbGVhbnVwLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgICByb290UmVmLnZhbHVlLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBvbkNsaWNrQ2xlYW51cCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbmF2aWdhdGVPbkNsaWNrKGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LZXlkb3duIChlKSB7XG4gICAgICAvLyBpcyBpdCBhbHJlYWR5IGRlc3Ryb3llZD9cbiAgICAgIGlmIChyb290UmVmLnZhbHVlID09PSBudWxsKSB7IHJldHVybiB9XG5cbiAgICAgIGVtaXQoJ2tleWRvd24nLCBlKVxuXG4gICAgICBpZiAoaXNLZXlDb2RlKGUsIFsgMTMsIDMyIF0pID09PSB0cnVlICYmIGtleWJvYXJkVGFyZ2V0ICE9PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIGtleWJvYXJkVGFyZ2V0ICE9PSBudWxsICYmIGNsZWFudXAoKVxuXG4gICAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQgIT09IHRydWUpIHtcbiAgICAgICAgICAvLyBmb2N1cyBleHRlcm5hbCBidXR0b24gaWYgdGhlIGZvY3VzIGhlbHBlciB3YXMgZm9jdXNlZCBiZWZvcmVcbiAgICAgICAgICByb290UmVmLnZhbHVlLmZvY3VzKClcblxuICAgICAgICAgIGtleWJvYXJkVGFyZ2V0ID0gcm9vdFJlZi52YWx1ZVxuICAgICAgICAgIHJvb3RSZWYudmFsdWUuY2xhc3NMaXN0LmFkZCgncS1idG4tLWFjdGl2ZScpXG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvblByZXNzRW5kLCB0cnVlKVxuICAgICAgICAgIHJvb3RSZWYudmFsdWUuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIG9uUHJlc3NFbmQsIHBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB9XG5cbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvblRvdWNoc3RhcnQgKGUpIHtcbiAgICAgIC8vIGlzIGl0IGFscmVhZHkgZGVzdHJveWVkP1xuICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHsgcmV0dXJuIH1cblxuICAgICAgZW1pdCgndG91Y2hzdGFydCcsIGUpXG5cbiAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUpIHsgcmV0dXJuIH1cblxuICAgICAgaWYgKHRvdWNoVGFyZ2V0ICE9PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIHRvdWNoVGFyZ2V0ICE9PSBudWxsICYmIGNsZWFudXAoKVxuICAgICAgICB0b3VjaFRhcmdldCA9IHJvb3RSZWYudmFsdWVcblxuICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwgPSBlLnRhcmdldFxuICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgbG9jYWxUb3VjaFRhcmdldEVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgb25QcmVzc0VuZCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG5cbiAgICAgIC8vIGF2b2lkIGR1cGxpY2F0ZWQgbW91c2Vkb3duIGV2ZW50XG4gICAgICAvLyB0cmlnZ2VyaW5nIGFub3RoZXIgZWFybHkgcmlwcGxlXG4gICAgICBhdm9pZE1vdXNlUmlwcGxlID0gdHJ1ZVxuICAgICAgbW91c2VUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQobW91c2VUaW1lcilcbiAgICAgIG1vdXNlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgbW91c2VUaW1lciA9IG51bGxcbiAgICAgICAgYXZvaWRNb3VzZVJpcHBsZSA9IGZhbHNlXG4gICAgICB9LCAyMDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Nb3VzZWRvd24gKGUpIHtcbiAgICAgIC8vIGlzIGl0IGFscmVhZHkgZGVzdHJveWVkP1xuICAgICAgaWYgKHJvb3RSZWYudmFsdWUgPT09IG51bGwpIHsgcmV0dXJuIH1cblxuICAgICAgZS5xU2tpcFJpcHBsZSA9IGF2b2lkTW91c2VSaXBwbGUgPT09IHRydWVcbiAgICAgIGVtaXQoJ21vdXNlZG93bicsIGUpXG5cbiAgICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQgIT09IHRydWUgJiYgbW91c2VUYXJnZXQgIT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgbW91c2VUYXJnZXQgIT09IG51bGwgJiYgY2xlYW51cCgpXG4gICAgICAgIG1vdXNlVGFyZ2V0ID0gcm9vdFJlZi52YWx1ZVxuICAgICAgICByb290UmVmLnZhbHVlLmNsYXNzTGlzdC5hZGQoJ3EtYnRuLS1hY3RpdmUnKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgb25QcmVzc0VuZCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25QcmVzc0VuZCAoZSkge1xuICAgICAgLy8gaXMgaXQgYWxyZWFkeSBkZXN0cm95ZWQ/XG4gICAgICBpZiAocm9vdFJlZi52YWx1ZSA9PT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gICAgICAvLyBuZWVkZWQgZm9yIElFIChiZWNhdXNlIGl0IGVtaXRzIGJsdXIgd2hlbiBmb2N1c2luZyBidXR0b24gZnJvbSBmb2N1cyBoZWxwZXIpXG4gICAgICBpZiAoZSAhPT0gdm9pZCAwICYmIGUudHlwZSA9PT0gJ2JsdXInICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHJvb3RSZWYudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChlICE9PSB2b2lkIDAgJiYgZS50eXBlID09PSAna2V5dXAnKSB7XG4gICAgICAgIGlmIChrZXlib2FyZFRhcmdldCA9PT0gcm9vdFJlZi52YWx1ZSAmJiBpc0tleUNvZGUoZSwgWyAxMywgMzIgXSkgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBmb3IgY2xpY2sgdHJpZ2dlclxuICAgICAgICAgIGNvbnN0IGV2dCA9IG5ldyBNb3VzZUV2ZW50KCdjbGljaycsIGUpXG4gICAgICAgICAgZXZ0LnFLZXlFdmVudCA9IHRydWVcbiAgICAgICAgICBlLmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUgJiYgcHJldmVudChldnQpXG4gICAgICAgICAgZS5jYW5jZWxCdWJibGUgPT09IHRydWUgJiYgc3RvcChldnQpXG4gICAgICAgICAgcm9vdFJlZi52YWx1ZS5kaXNwYXRjaEV2ZW50KGV2dClcblxuICAgICAgICAgIHN0b3BBbmRQcmV2ZW50KGUpXG5cbiAgICAgICAgICAvLyBmb3IgcmlwcGxlXG4gICAgICAgICAgZS5xS2V5RXZlbnQgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBlbWl0KCdrZXl1cCcsIGUpXG4gICAgICB9XG5cbiAgICAgIGNsZWFudXAoKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFudXAgKGRlc3Ryb3lpbmcpIHtcbiAgICAgIGNvbnN0IGJsdXJUYXJnZXQgPSBibHVyVGFyZ2V0UmVmLnZhbHVlXG5cbiAgICAgIGlmIChcbiAgICAgICAgZGVzdHJveWluZyAhPT0gdHJ1ZVxuICAgICAgICAmJiAodG91Y2hUYXJnZXQgPT09IHJvb3RSZWYudmFsdWUgfHwgbW91c2VUYXJnZXQgPT09IHJvb3RSZWYudmFsdWUpXG4gICAgICAgICYmIGJsdXJUYXJnZXQgIT09IG51bGxcbiAgICAgICAgJiYgYmx1clRhcmdldCAhPT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgKSB7XG4gICAgICAgIGJsdXJUYXJnZXQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKVxuICAgICAgICBibHVyVGFyZ2V0LmZvY3VzKClcbiAgICAgIH1cblxuICAgICAgaWYgKHRvdWNoVGFyZ2V0ID09PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIGlmIChsb2NhbFRvdWNoVGFyZ2V0RWwgIT09IG51bGwpIHtcbiAgICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgICBsb2NhbFRvdWNoVGFyZ2V0RWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgfVxuICAgICAgICB0b3VjaFRhcmdldCA9IGxvY2FsVG91Y2hUYXJnZXRFbCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKG1vdXNlVGFyZ2V0ID09PSByb290UmVmLnZhbHVlKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBvblByZXNzRW5kLCBwYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgbW91c2VUYXJnZXQgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmIChrZXlib2FyZFRhcmdldCA9PT0gcm9vdFJlZi52YWx1ZSkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uUHJlc3NFbmQsIHRydWUpXG4gICAgICAgIHJvb3RSZWYudmFsdWUgIT09IG51bGwgJiYgcm9vdFJlZi52YWx1ZS5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgb25QcmVzc0VuZCwgcGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIGtleWJvYXJkVGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuXG4gICAgICByb290UmVmLnZhbHVlICE9PSBudWxsICYmIHJvb3RSZWYudmFsdWUuY2xhc3NMaXN0LnJlbW92ZSgncS1idG4tLWFjdGl2ZScpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Mb2FkaW5nRXZ0IChldnQpIHtcbiAgICAgIHN0b3BBbmRQcmV2ZW50KGV2dClcbiAgICAgIGV2dC5xU2tpcFJpcHBsZSA9IHRydWVcbiAgICB9XG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgY2xlYW51cCh0cnVlKVxuICAgIH0pXG5cbiAgICAvLyBleHBvc2UgcHVibGljIG1ldGhvZHNcbiAgICBPYmplY3QuYXNzaWduKHByb3h5LCB7IGNsaWNrOiBvbkNsaWNrIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgbGV0IGlubmVyID0gW11cblxuICAgICAgcHJvcHMuaWNvbiAhPT0gdm9pZCAwICYmIGlubmVyLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBuYW1lOiBwcm9wcy5pY29uLFxuICAgICAgICAgIGxlZnQ6IHByb3BzLnN0YWNrID09PSBmYWxzZSAmJiBoYXNMYWJlbC52YWx1ZSA9PT0gdHJ1ZSxcbiAgICAgICAgICByb2xlOiAnaW1nJyxcbiAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgaGFzTGFiZWwudmFsdWUgPT09IHRydWUgJiYgaW5uZXIucHVzaChcbiAgICAgICAgaCgnc3BhbicsIHsgY2xhc3M6ICdibG9jaycgfSwgWyBwcm9wcy5sYWJlbCBdKVxuICAgICAgKVxuXG4gICAgICBpbm5lciA9IGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgaW5uZXIpXG5cbiAgICAgIGlmIChwcm9wcy5pY29uUmlnaHQgIT09IHZvaWQgMCAmJiBwcm9wcy5yb3VuZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgaW5uZXIucHVzaChcbiAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICBuYW1lOiBwcm9wcy5pY29uUmlnaHQsXG4gICAgICAgICAgICByaWdodDogcHJvcHMuc3RhY2sgPT09IGZhbHNlICYmIGhhc0xhYmVsLnZhbHVlID09PSB0cnVlLFxuICAgICAgICAgICAgcm9sZTogJ2ltZycsXG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKCdzcGFuJywge1xuICAgICAgICAgIGNsYXNzOiAncS1mb2N1cy1oZWxwZXInLFxuICAgICAgICAgIHJlZjogYmx1clRhcmdldFJlZlxuICAgICAgICB9KVxuICAgICAgXVxuXG4gICAgICBpZiAocHJvcHMubG9hZGluZyA9PT0gdHJ1ZSAmJiBwcm9wcy5wZXJjZW50YWdlICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBoKCdzcGFuJywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWJ0bl9fcHJvZ3Jlc3MgYWJzb2x1dGUtZnVsbCBvdmVyZmxvdy1oaWRkZW4nICsgKHByb3BzLmRhcmtQZXJjZW50YWdlID09PSB0cnVlID8gJyBxLWJ0bl9fcHJvZ3Jlc3MtLWRhcmsnIDogJycpXG4gICAgICAgICAgfSwgW1xuICAgICAgICAgICAgaCgnc3BhbicsIHtcbiAgICAgICAgICAgICAgY2xhc3M6ICdxLWJ0bl9fcHJvZ3Jlc3MtaW5kaWNhdG9yIGZpdCBibG9jaycsXG4gICAgICAgICAgICAgIHN0eWxlOiBwZXJjZW50YWdlU3R5bGUudmFsdWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdzcGFuJywge1xuICAgICAgICAgIGNsYXNzOiAncS1idG5fX2NvbnRlbnQgdGV4dC1jZW50ZXIgY29sIGl0ZW1zLWNlbnRlciBxLWFuY2hvci0tc2tpcCAnICsgaW5uZXJDbGFzc2VzLnZhbHVlXG4gICAgICAgIH0sIGlubmVyKVxuICAgICAgKVxuXG4gICAgICBwcm9wcy5sb2FkaW5nICE9PSBudWxsICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoVHJhbnNpdGlvbiwge1xuICAgICAgICAgIG5hbWU6ICdxLXRyYW5zaXRpb24tLWZhZGUnXG4gICAgICAgIH0sICgpID0+IChcbiAgICAgICAgICBwcm9wcy5sb2FkaW5nID09PSB0cnVlXG4gICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICBoKCdzcGFuJywge1xuICAgICAgICAgICAgICAgICAga2V5OiAnbG9hZGluZycsXG4gICAgICAgICAgICAgICAgICBjbGFzczogJ2Fic29sdXRlLWZ1bGwgZmxleCBmbGV4LWNlbnRlcidcbiAgICAgICAgICAgICAgICB9LCBzbG90cy5sb2FkaW5nICE9PSB2b2lkIDAgPyBzbG90cy5sb2FkaW5nKCkgOiBbIGgoUVNwaW5uZXIpIF0pXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIDogbnVsbFxuICAgICAgICApKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gd2l0aERpcmVjdGl2ZXMoXG4gICAgICAgIGgoXG4gICAgICAgICAgbGlua1RhZy52YWx1ZSxcbiAgICAgICAgICBub2RlUHJvcHMudmFsdWUsXG4gICAgICAgICAgY2hpbGRcbiAgICAgICAgKSxcbiAgICAgICAgWyBbXG4gICAgICAgICAgUmlwcGxlLFxuICAgICAgICAgIHJpcHBsZS52YWx1ZSxcbiAgICAgICAgICB2b2lkIDAsXG4gICAgICAgICAgcmlwcGxlUHJvcHMudmFsdWVcbiAgICAgICAgXSBdXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdPLE1BQU0sa0JBQWtCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLElBQ0osTUFBTSxDQUFFLFFBQVEsTUFBUTtBQUFBLElBQ3hCLFNBQVM7QUFBQSxFQUNWO0FBQUEsRUFDRCxPQUFPO0FBQ1Q7QUFFZSxTQUFTLFdBQVksT0FBTztBQUN6QyxTQUFPO0FBQUEsSUFDTCxPQUFPLFNBQVMsTUFDZCxNQUFNLFFBQVEsa0JBQ1YsR0FBSSxnQkFBaUIsTUFBTSxZQUMzQixNQUFNLElBQ1g7QUFBQSxJQUVELFNBQVM7QUFBQSxNQUFTLE1BQ2hCLGVBQWUsTUFBTSxRQUFRLFNBQVUsTUFBTSxVQUFXO0FBQUEsSUFDekQ7QUFBQSxFQUNGO0FBQ0g7QUNqQkEsSUFBQSxXQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUVILFdBQVc7QUFBQSxNQUNULE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBRUQsTUFBTyxPQUFPO0FBQ1osVUFBTSxFQUFFLE9BQU8sWUFBWSxXQUFXLEtBQUs7QUFFM0MsV0FBTyxNQUFNLEVBQUUsT0FBTztBQUFBLE1BQ3BCLE9B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
