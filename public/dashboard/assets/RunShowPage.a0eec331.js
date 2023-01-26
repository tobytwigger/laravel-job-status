import { M as MessageType, b as QSeparator, u as useApi, Q as QBreadcrumbsEl, a as QBreadcrumbs } from "./api.81530e8b.js";
import { g as getBtnDesignAttr, Q as QBtn } from "./QBtn.f875cdea.js";
import { c as createComponent, h as hSlot, e as hMergeSlot, b as createDirective, a as hUniqueSlot, d as hDir } from "./render.34f10d21.js";
import { c as computed, h, j as emptyRenderFn, r as ref, k as onBeforeUnmount, o as onMounted, a as inject, D as withDirectives, a2 as tabsKey, q as stopAndPrevent, Y as isKeyCode, a3 as shouldIgnoreKey, g as getCurrentInstance, a4 as isDeepEqual, Z as onDeactivated, n as nextTick, w as watch, a5 as onActivated, E as provide, m as client, u as noop, v as leftClick, x as addEvt, y as preventDraggable, B as position, C as cleanEvt, X as Transition, a6 as KeepAlive, a7 as timelineKey, _ as _export_sfc, K as defineComponent, L as openBlock, S as createElementBlock, F as Fragment, U as renderList, M as createBlock, N as withCtx, Q as toDisplayString, R as createBaseVNode, a0 as unref, P as createTextVNode, O as createCommentVNode, d as createVNode } from "./index.07765cf9.js";
import { u as useTimeout, Q as QResizeObserver, g as getModifierDirections, s as shouldStart, c as clearSelection, a as QBanner } from "./QBanner.d48058d0.js";
import { u as useDarkProps, a as useDark, d as QList, c as QItem, Q as QItemSection, b as QItemLabel } from "./QItem.2946db6a.js";
import { R as Ripple, Q as QIcon, i as vmIsDestroyed, j as getNormalizedVNodes, d as useAlignProps, f as useAlign, k as getParentProxy } from "./use-router-link.70d2557d.js";
import { Q as QPage, a as api } from "./api.8f185fbd.js";
import { c as commonjsGlobal, d as dayjs } from "./dayjs.min.54da9cde.js";
import { Q as QAvatar } from "./QAvatar.59b3e3f1.js";
import "./index.aa7156d4.js";
import "./config.b6f61684.js";
var QBtnGroup = createComponent({
  name: "QBtnGroup",
  props: {
    unelevated: Boolean,
    outline: Boolean,
    flat: Boolean,
    rounded: Boolean,
    square: Boolean,
    push: Boolean,
    stretch: Boolean,
    glossy: Boolean,
    spread: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(() => {
      const cls = ["unelevated", "outline", "flat", "rounded", "square", "push", "stretch", "glossy"].filter((t) => props[t] === true).map((t) => `q-btn-group--${t}`).join(" ");
      return `q-btn-group row no-wrap${cls.length > 0 ? " " + cls : ""}` + (props.spread === true ? " q-btn-group--spread" : " inline");
    });
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const useFormProps = {
  name: String
};
function useFormInject(formAttrs = {}) {
  return (child, action, className) => {
    child[action](
      h("input", {
        class: "hidden" + (className || ""),
        ...formAttrs.value
      })
    );
  };
}
var QBtnToggle = createComponent({
  name: "QBtnToggle",
  props: {
    ...useFormProps,
    modelValue: {
      required: true
    },
    options: {
      type: Array,
      required: true,
      validator: (v) => v.every(
        (opt) => ("label" in opt || "icon" in opt || "slot" in opt) && "value" in opt
      )
    },
    color: String,
    textColor: String,
    toggleColor: {
      type: String,
      default: "primary"
    },
    toggleTextColor: String,
    outline: Boolean,
    flat: Boolean,
    unelevated: Boolean,
    rounded: Boolean,
    push: Boolean,
    glossy: Boolean,
    size: String,
    padding: String,
    noCaps: Boolean,
    noWrap: Boolean,
    dense: Boolean,
    readonly: Boolean,
    disable: Boolean,
    stack: Boolean,
    stretch: Boolean,
    spread: Boolean,
    clearable: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  emits: ["update:modelValue", "clear", "click"],
  setup(props, { slots, emit }) {
    const hasActiveValue = computed(
      () => props.options.find((opt) => opt.value === props.modelValue) !== void 0
    );
    const formAttrs = computed(() => ({
      type: "hidden",
      name: props.name,
      value: props.modelValue
    }));
    const injectFormInput = useFormInject(formAttrs);
    const btnDesignAttr = computed(() => getBtnDesignAttr(props));
    const btnOptionDesign = computed(() => ({
      rounded: props.rounded,
      dense: props.dense,
      ...btnDesignAttr.value
    }));
    const btnOptions = computed(() => props.options.map((item, i) => {
      const { attrs, value, slot, ...opt } = item;
      return {
        slot,
        props: {
          key: i,
          "aria-pressed": value === props.modelValue ? "true" : "false",
          ...attrs,
          ...opt,
          ...btnOptionDesign.value,
          disable: props.disable === true || opt.disable === true,
          color: value === props.modelValue ? mergeOpt(opt, "toggleColor") : mergeOpt(opt, "color"),
          textColor: value === props.modelValue ? mergeOpt(opt, "toggleTextColor") : mergeOpt(opt, "textColor"),
          noCaps: mergeOpt(opt, "noCaps") === true,
          noWrap: mergeOpt(opt, "noWrap") === true,
          size: mergeOpt(opt, "size"),
          padding: mergeOpt(opt, "padding"),
          ripple: mergeOpt(opt, "ripple"),
          stack: mergeOpt(opt, "stack") === true,
          stretch: mergeOpt(opt, "stretch") === true,
          onClick(e) {
            set(value, item, e);
          }
        }
      };
    }));
    function set(value, opt, e) {
      if (props.readonly !== true) {
        if (props.modelValue === value) {
          if (props.clearable === true) {
            emit("update:modelValue", null, null);
            emit("clear");
          }
        } else {
          emit("update:modelValue", value, opt);
        }
        emit("click", e);
      }
    }
    function mergeOpt(opt, key) {
      return opt[key] === void 0 ? props[key] : opt[key];
    }
    function getContent() {
      const child = btnOptions.value.map((opt) => {
        return h(QBtn, opt.props, opt.slot !== void 0 ? slots[opt.slot] : void 0);
      });
      if (props.name !== void 0 && props.disable !== true && hasActiveValue.value === true) {
        injectFormInput(child, "push");
      }
      return hMergeSlot(slots.default, child);
    }
    return () => h(QBtnGroup, {
      class: "q-btn-toggle",
      ...btnDesignAttr.value,
      rounded: props.rounded,
      stretch: props.stretch,
      glossy: props.glossy,
      spread: props.spread
    }, getContent);
  }
});
let buf, bufIdx = 0;
const hexBytes = new Array(256);
for (let i = 0; i < 256; i++) {
  hexBytes[i] = (i + 256).toString(16).substring(1);
}
const randomBytes = (() => {
  const lib = typeof crypto !== "undefined" ? crypto : typeof window !== "undefined" ? window.crypto || window.msCrypto : void 0;
  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes;
    }
    if (lib.getRandomValues !== void 0) {
      return (n) => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes;
      };
    }
  }
  return (n) => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r;
  };
})();
const BUFFER_SIZE = 4096;
function uid() {
  if (buf === void 0 || bufIdx + 16 > BUFFER_SIZE) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }
  const b = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
  b[6] = b[6] & 15 | 64;
  b[8] = b[8] & 63 | 128;
  return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
}
let id = 0;
const useTabEmits = ["click", "keydown"];
const useTabProps = {
  icon: String,
  label: [Number, String],
  alert: [Boolean, String],
  alertIcon: String,
  name: {
    type: [Number, String],
    default: () => `t_${id++}`
  },
  noCaps: Boolean,
  tabindex: [String, Number],
  disable: Boolean,
  contentClass: String,
  ripple: {
    type: [Boolean, Object],
    default: true
  }
};
function useTab(props, slots, emit, routeData) {
  const $tabs = inject(tabsKey, emptyRenderFn);
  if ($tabs === emptyRenderFn) {
    console.error("QTab/QRouteTab component needs to be child of QTabs");
    return emptyRenderFn;
  }
  const { proxy } = getCurrentInstance();
  const blurTargetRef = ref(null);
  const rootRef = ref(null);
  const tabIndicatorRef = ref(null);
  const ripple = computed(() => props.disable === true || props.ripple === false ? false : Object.assign(
    { keyCodes: [13, 32], early: true },
    props.ripple === true ? {} : props.ripple
  ));
  const isActive = computed(() => $tabs.currentModel.value === props.name);
  const classes = computed(
    () => "q-tab relative-position self-stretch flex flex-center text-center" + (isActive.value === true ? " q-tab--active" + ($tabs.tabProps.value.activeClass ? " " + $tabs.tabProps.value.activeClass : "") + ($tabs.tabProps.value.activeColor ? ` text-${$tabs.tabProps.value.activeColor}` : "") + ($tabs.tabProps.value.activeBgColor ? ` bg-${$tabs.tabProps.value.activeBgColor}` : "") : " q-tab--inactive") + (props.icon && props.label && $tabs.tabProps.value.inlineLabel === false ? " q-tab--full" : "") + (props.noCaps === true || $tabs.tabProps.value.noCaps === true ? " q-tab--no-caps" : "") + (props.disable === true ? " disabled" : " q-focusable q-hoverable cursor-pointer") + (routeData !== void 0 ? routeData.linkClass.value : "")
  );
  const innerClass = computed(
    () => "q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable " + ($tabs.tabProps.value.inlineLabel === true ? "row no-wrap q-tab__content--inline" : "column") + (props.contentClass !== void 0 ? ` ${props.contentClass}` : "")
  );
  const tabIndex = computed(() => props.disable === true || $tabs.hasFocus.value === true || isActive.value === false && $tabs.hasActiveTab.value === true ? -1 : props.tabindex || 0);
  function onClick(e, keyboard) {
    if (keyboard !== true && blurTargetRef.value !== null) {
      blurTargetRef.value.focus();
    }
    if (props.disable === true) {
      if (routeData !== void 0 && routeData.hasRouterLink.value === true) {
        stopAndPrevent(e);
      }
      return;
    }
    if (routeData === void 0) {
      $tabs.updateModel({ name: props.name });
      emit("click", e);
      return;
    }
    if (routeData.hasRouterLink.value === true) {
      const go = (opts = {}) => {
        let hardError;
        const reqId = opts.to === void 0 || isDeepEqual(opts.to, props.to) === true ? $tabs.avoidRouteWatcher = uid() : null;
        return routeData.navigateToRouterLink(e, { ...opts, returnRouterError: true }).catch((err) => {
          hardError = err;
        }).then((softError) => {
          if (reqId === $tabs.avoidRouteWatcher) {
            $tabs.avoidRouteWatcher = false;
            if (hardError === void 0 && (softError === void 0 || softError.message.startsWith("Avoided redundant navigation") === true)) {
              $tabs.updateModel({ name: props.name });
            }
          }
          if (opts.returnRouterError === true) {
            return hardError !== void 0 ? Promise.reject(hardError) : softError;
          }
        });
      };
      emit("click", e, go);
      e.defaultPrevented !== true && go();
      return;
    }
    emit("click", e);
  }
  function onKeydown(e) {
    if (isKeyCode(e, [13, 32])) {
      onClick(e, true);
    } else if (shouldIgnoreKey(e) !== true && e.keyCode >= 35 && e.keyCode <= 40 && e.altKey !== true && e.metaKey !== true) {
      $tabs.onKbdNavigate(e.keyCode, proxy.$el) === true && stopAndPrevent(e);
    }
    emit("keydown", e);
  }
  function getContent() {
    const narrow = $tabs.tabProps.value.narrowIndicator, content = [], indicator = h("div", {
      ref: tabIndicatorRef,
      class: [
        "q-tab__indicator",
        $tabs.tabProps.value.indicatorClass
      ]
    });
    props.icon !== void 0 && content.push(
      h(QIcon, {
        class: "q-tab__icon",
        name: props.icon
      })
    );
    props.label !== void 0 && content.push(
      h("div", { class: "q-tab__label" }, props.label)
    );
    props.alert !== false && content.push(
      props.alertIcon !== void 0 ? h(QIcon, {
        class: "q-tab__alert-icon",
        color: props.alert !== true ? props.alert : void 0,
        name: props.alertIcon
      }) : h("div", {
        class: "q-tab__alert" + (props.alert !== true ? ` text-${props.alert}` : "")
      })
    );
    narrow === true && content.push(indicator);
    const node = [
      h("div", { class: "q-focus-helper", tabindex: -1, ref: blurTargetRef }),
      h("div", { class: innerClass.value }, hMergeSlot(slots.default, content))
    ];
    narrow === false && node.push(indicator);
    return node;
  }
  const tabData = {
    name: computed(() => props.name),
    rootRef,
    tabIndicatorRef,
    routeData
  };
  onBeforeUnmount(() => {
    $tabs.unregisterTab(tabData);
  });
  onMounted(() => {
    $tabs.registerTab(tabData);
  });
  function renderTab(tag, customData) {
    const data = {
      ref: rootRef,
      class: classes.value,
      tabindex: tabIndex.value,
      role: "tab",
      "aria-selected": isActive.value === true ? "true" : "false",
      "aria-disabled": props.disable === true ? "true" : void 0,
      onClick,
      onKeydown,
      ...customData
    };
    return withDirectives(
      h(tag, data, getContent()),
      [[Ripple, ripple.value]]
    );
  }
  return { renderTab, $tabs };
}
var QTab = createComponent({
  name: "QTab",
  props: useTabProps,
  emits: useTabEmits,
  setup(props, { slots, emit }) {
    const { renderTab } = useTab(props, slots, emit);
    return () => renderTab("div");
  }
});
function useTick() {
  let tickFn;
  const vm = getCurrentInstance();
  function removeTick() {
    tickFn = void 0;
  }
  onDeactivated(removeTick);
  onBeforeUnmount(removeTick);
  return {
    removeTick,
    registerTick(fn) {
      tickFn = fn;
      nextTick(() => {
        if (tickFn === fn) {
          vmIsDestroyed(vm) === false && tickFn();
          tickFn = void 0;
        }
      });
    }
  };
}
let rtlHasScrollBug = false;
{
  const scroller = document.createElement("div");
  scroller.setAttribute("dir", "rtl");
  Object.assign(scroller.style, {
    width: "1px",
    height: "1px",
    overflow: "auto"
  });
  const spacer = document.createElement("div");
  Object.assign(spacer.style, {
    width: "1000px",
    height: "1px"
  });
  document.body.appendChild(scroller);
  scroller.appendChild(spacer);
  scroller.scrollLeft = -1e3;
  rtlHasScrollBug = scroller.scrollLeft >= 0;
  scroller.remove();
}
function getIndicatorClass(color, top, vertical) {
  const pos = vertical === true ? ["left", "right"] : ["top", "bottom"];
  return `absolute-${top === true ? pos[0] : pos[1]}${color ? ` text-${color}` : ""}`;
}
const alignValues = ["left", "center", "right", "justify"];
var QTabs = createComponent({
  name: "QTabs",
  props: {
    modelValue: [Number, String],
    align: {
      type: String,
      default: "center",
      validator: (v) => alignValues.includes(v)
    },
    breakpoint: {
      type: [String, Number],
      default: 600
    },
    vertical: Boolean,
    shrink: Boolean,
    stretch: Boolean,
    activeClass: String,
    activeColor: String,
    activeBgColor: String,
    indicatorColor: String,
    leftIcon: String,
    rightIcon: String,
    outsideArrows: Boolean,
    mobileArrows: Boolean,
    switchIndicator: Boolean,
    narrowIndicator: Boolean,
    inlineLabel: Boolean,
    noCaps: Boolean,
    dense: Boolean,
    contentClass: String,
    "onUpdate:modelValue": [Function, Array]
  },
  setup(props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const { registerTick: registerScrollTick } = useTick();
    const { registerTick: registerUpdateArrowsTick } = useTick();
    const { registerTick: registerAnimateTick } = useTick();
    const { registerTimeout: registerFocusTimeout, removeTimeout: removeFocusTimeout } = useTimeout();
    const { registerTimeout: registerScrollToTabTimeout, removeTimeout: removeScrollToTabTimeout } = useTimeout();
    const rootRef = ref(null);
    const contentRef = ref(null);
    const currentModel = ref(props.modelValue);
    const scrollable = ref(false);
    const leftArrow = ref(true);
    const rightArrow = ref(false);
    const justify = ref(false);
    const tabDataList = [];
    const tabDataListLen = ref(0);
    const hasFocus = ref(false);
    let animateTimer = null, scrollTimer = null, unwatchRoute;
    const tabProps = computed(() => ({
      activeClass: props.activeClass,
      activeColor: props.activeColor,
      activeBgColor: props.activeBgColor,
      indicatorClass: getIndicatorClass(
        props.indicatorColor,
        props.switchIndicator,
        props.vertical
      ),
      narrowIndicator: props.narrowIndicator,
      inlineLabel: props.inlineLabel,
      noCaps: props.noCaps
    }));
    const hasActiveTab = computed(() => {
      const len = tabDataListLen.value;
      const val = currentModel.value;
      for (let i = 0; i < len; i++) {
        if (tabDataList[i].name.value === val) {
          return true;
        }
      }
      return false;
    });
    const alignClass = computed(() => {
      const align = scrollable.value === true ? "left" : justify.value === true ? "justify" : props.align;
      return `q-tabs__content--align-${align}`;
    });
    const classes = computed(
      () => `q-tabs row no-wrap items-center q-tabs--${scrollable.value === true ? "" : "not-"}scrollable q-tabs--${props.vertical === true ? "vertical" : "horizontal"} q-tabs__arrows--${props.outsideArrows === true ? "outside" : "inside"} q-tabs--mobile-with${props.mobileArrows === true ? "" : "out"}-arrows` + (props.dense === true ? " q-tabs--dense" : "") + (props.shrink === true ? " col-shrink" : "") + (props.stretch === true ? " self-stretch" : "")
    );
    const innerClass = computed(
      () => "q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position " + alignClass.value + (props.contentClass !== void 0 ? ` ${props.contentClass}` : "")
    );
    const domProps = computed(() => props.vertical === true ? { container: "height", content: "offsetHeight", scroll: "scrollHeight" } : { container: "width", content: "offsetWidth", scroll: "scrollWidth" });
    const isRTL = computed(() => props.vertical !== true && $q.lang.rtl === true);
    const rtlPosCorrection = computed(() => rtlHasScrollBug === false && isRTL.value === true);
    watch(isRTL, updateArrows);
    watch(() => props.modelValue, (name) => {
      updateModel({ name, setCurrent: true, skipEmit: true });
    });
    watch(() => props.outsideArrows, recalculateScroll);
    function updateModel({ name, setCurrent, skipEmit }) {
      if (currentModel.value !== name) {
        if (skipEmit !== true && props["onUpdate:modelValue"] !== void 0) {
          emit("update:modelValue", name);
        }
        if (setCurrent === true || props["onUpdate:modelValue"] === void 0) {
          animate(currentModel.value, name);
          currentModel.value = name;
        }
      }
    }
    function recalculateScroll() {
      registerScrollTick(() => {
        updateContainer({
          width: rootRef.value.offsetWidth,
          height: rootRef.value.offsetHeight
        });
      });
    }
    function updateContainer(domSize) {
      if (domProps.value === void 0 || contentRef.value === null) {
        return;
      }
      const size = domSize[domProps.value.container], scrollSize = Math.min(
        contentRef.value[domProps.value.scroll],
        Array.prototype.reduce.call(
          contentRef.value.children,
          (acc, el) => acc + (el[domProps.value.content] || 0),
          0
        )
      ), scroll = size > 0 && scrollSize > size;
      scrollable.value = scroll;
      scroll === true && registerUpdateArrowsTick(updateArrows);
      justify.value = size < parseInt(props.breakpoint, 10);
    }
    function animate(oldName, newName) {
      const oldTab = oldName !== void 0 && oldName !== null && oldName !== "" ? tabDataList.find((tab) => tab.name.value === oldName) : null, newTab = newName !== void 0 && newName !== null && newName !== "" ? tabDataList.find((tab) => tab.name.value === newName) : null;
      if (oldTab && newTab) {
        const oldEl = oldTab.tabIndicatorRef.value, newEl = newTab.tabIndicatorRef.value;
        if (animateTimer !== null) {
          clearTimeout(animateTimer);
          animateTimer = null;
        }
        oldEl.style.transition = "none";
        oldEl.style.transform = "none";
        newEl.style.transition = "none";
        newEl.style.transform = "none";
        const oldPos = oldEl.getBoundingClientRect(), newPos = newEl.getBoundingClientRect();
        newEl.style.transform = props.vertical === true ? `translate3d(0,${oldPos.top - newPos.top}px,0) scale3d(1,${newPos.height ? oldPos.height / newPos.height : 1},1)` : `translate3d(${oldPos.left - newPos.left}px,0,0) scale3d(${newPos.width ? oldPos.width / newPos.width : 1},1,1)`;
        registerAnimateTick(() => {
          animateTimer = setTimeout(() => {
            animateTimer = null;
            newEl.style.transition = "transform .25s cubic-bezier(.4, 0, .2, 1)";
            newEl.style.transform = "none";
          }, 70);
        });
      }
      if (newTab && scrollable.value === true) {
        scrollToTabEl(newTab.rootRef.value);
      }
    }
    function scrollToTabEl(el) {
      const { left, width, top, height } = contentRef.value.getBoundingClientRect(), newPos = el.getBoundingClientRect();
      let offset = props.vertical === true ? newPos.top - top : newPos.left - left;
      if (offset < 0) {
        contentRef.value[props.vertical === true ? "scrollTop" : "scrollLeft"] += Math.floor(offset);
        updateArrows();
        return;
      }
      offset += props.vertical === true ? newPos.height - height : newPos.width - width;
      if (offset > 0) {
        contentRef.value[props.vertical === true ? "scrollTop" : "scrollLeft"] += Math.ceil(offset);
        updateArrows();
      }
    }
    function updateArrows() {
      const content = contentRef.value;
      if (content === null) {
        return;
      }
      const rect = content.getBoundingClientRect(), pos = props.vertical === true ? content.scrollTop : Math.abs(content.scrollLeft);
      if (isRTL.value === true) {
        leftArrow.value = Math.ceil(pos + rect.width) < content.scrollWidth - 1;
        rightArrow.value = pos > 0;
      } else {
        leftArrow.value = pos > 0;
        rightArrow.value = props.vertical === true ? Math.ceil(pos + rect.height) < content.scrollHeight : Math.ceil(pos + rect.width) < content.scrollWidth;
      }
    }
    function animScrollTo(value) {
      scrollTimer !== null && clearInterval(scrollTimer);
      scrollTimer = setInterval(() => {
        if (scrollTowards(value) === true) {
          stopAnimScroll();
        }
      }, 5);
    }
    function scrollToStart() {
      animScrollTo(rtlPosCorrection.value === true ? Number.MAX_SAFE_INTEGER : 0);
    }
    function scrollToEnd() {
      animScrollTo(rtlPosCorrection.value === true ? 0 : Number.MAX_SAFE_INTEGER);
    }
    function stopAnimScroll() {
      if (scrollTimer !== null) {
        clearInterval(scrollTimer);
        scrollTimer = null;
      }
    }
    function onKbdNavigate(keyCode, fromEl) {
      const tabs = Array.prototype.filter.call(
        contentRef.value.children,
        (el) => el === fromEl || el.matches && el.matches(".q-tab.q-focusable") === true
      );
      const len = tabs.length;
      if (len === 0) {
        return;
      }
      if (keyCode === 36) {
        scrollToTabEl(tabs[0]);
        tabs[0].focus();
        return true;
      }
      if (keyCode === 35) {
        scrollToTabEl(tabs[len - 1]);
        tabs[len - 1].focus();
        return true;
      }
      const dirPrev = keyCode === (props.vertical === true ? 38 : 37);
      const dirNext = keyCode === (props.vertical === true ? 40 : 39);
      const dir = dirPrev === true ? -1 : dirNext === true ? 1 : void 0;
      if (dir !== void 0) {
        const rtlDir = isRTL.value === true ? -1 : 1;
        const index = tabs.indexOf(fromEl) + dir * rtlDir;
        if (index >= 0 && index < len) {
          scrollToTabEl(tabs[index]);
          tabs[index].focus({ preventScroll: true });
        }
        return true;
      }
    }
    const posFn = computed(() => rtlPosCorrection.value === true ? { get: (content) => Math.abs(content.scrollLeft), set: (content, pos) => {
      content.scrollLeft = -pos;
    } } : props.vertical === true ? { get: (content) => content.scrollTop, set: (content, pos) => {
      content.scrollTop = pos;
    } } : { get: (content) => content.scrollLeft, set: (content, pos) => {
      content.scrollLeft = pos;
    } });
    function scrollTowards(value) {
      const content = contentRef.value, { get, set } = posFn.value;
      let done = false, pos = get(content);
      const direction = value < pos ? -1 : 1;
      pos += direction * 5;
      if (pos < 0) {
        done = true;
        pos = 0;
      } else if (direction === -1 && pos <= value || direction === 1 && pos >= value) {
        done = true;
        pos = value;
      }
      set(content, pos);
      updateArrows();
      return done;
    }
    function hasQueryIncluded(targetQuery, matchingQuery) {
      for (const key in targetQuery) {
        if (targetQuery[key] !== matchingQuery[key]) {
          return false;
        }
      }
      return true;
    }
    function updateActiveRoute() {
      let name = null, bestScore = { matchedLen: 0, queryDiff: 9999, hrefLen: 0 };
      const list = tabDataList.filter((tab) => tab.routeData !== void 0 && tab.routeData.hasRouterLink.value === true);
      const { hash: currentHash, query: currentQuery } = proxy.$route;
      const currentQueryLen = Object.keys(currentQuery).length;
      for (const tab of list) {
        const exact = tab.routeData.exact.value === true;
        if (tab.routeData[exact === true ? "linkIsExactActive" : "linkIsActive"].value !== true) {
          continue;
        }
        const { hash, query, matched, href } = tab.routeData.resolvedLink.value;
        const queryLen = Object.keys(query).length;
        if (exact === true) {
          if (hash !== currentHash) {
            continue;
          }
          if (queryLen !== currentQueryLen || hasQueryIncluded(currentQuery, query) === false) {
            continue;
          }
          name = tab.name.value;
          break;
        }
        if (hash !== "" && hash !== currentHash) {
          continue;
        }
        if (queryLen !== 0 && hasQueryIncluded(query, currentQuery) === false) {
          continue;
        }
        const newScore = {
          matchedLen: matched.length,
          queryDiff: currentQueryLen - queryLen,
          hrefLen: href.length - hash.length
        };
        if (newScore.matchedLen > bestScore.matchedLen) {
          name = tab.name.value;
          bestScore = newScore;
          continue;
        } else if (newScore.matchedLen !== bestScore.matchedLen) {
          continue;
        }
        if (newScore.queryDiff < bestScore.queryDiff) {
          name = tab.name.value;
          bestScore = newScore;
        } else if (newScore.queryDiff !== bestScore.queryDiff) {
          continue;
        }
        if (newScore.hrefLen > bestScore.hrefLen) {
          name = tab.name.value;
          bestScore = newScore;
        }
      }
      if (name === null && tabDataList.some((tab) => tab.routeData === void 0 && tab.name.value === currentModel.value) === true) {
        return;
      }
      updateModel({ name, setCurrent: true });
    }
    function onFocusin(e) {
      removeFocusTimeout();
      if (hasFocus.value !== true && rootRef.value !== null && e.target && typeof e.target.closest === "function") {
        const tab = e.target.closest(".q-tab");
        if (tab && rootRef.value.contains(tab) === true) {
          hasFocus.value = true;
          scrollable.value === true && scrollToTabEl(tab);
        }
      }
    }
    function onFocusout() {
      registerFocusTimeout(() => {
        hasFocus.value = false;
      }, 30);
    }
    function verifyRouteModel() {
      if ($tabs.avoidRouteWatcher === false) {
        registerScrollToTabTimeout(updateActiveRoute);
      } else {
        removeScrollToTabTimeout();
      }
    }
    function watchRoute() {
      if (unwatchRoute === void 0) {
        const unwatch = watch(() => proxy.$route.fullPath, verifyRouteModel);
        unwatchRoute = () => {
          unwatch();
          unwatchRoute = void 0;
        };
      }
    }
    function registerTab(tabData) {
      tabDataList.push(tabData);
      tabDataListLen.value++;
      recalculateScroll();
      if (tabData.routeData === void 0 || proxy.$route === void 0) {
        registerScrollToTabTimeout(() => {
          if (scrollable.value === true) {
            const value = currentModel.value;
            const newTab = value !== void 0 && value !== null && value !== "" ? tabDataList.find((tab) => tab.name.value === value) : null;
            newTab && scrollToTabEl(newTab.rootRef.value);
          }
        });
      } else {
        watchRoute();
        if (tabData.routeData.hasRouterLink.value === true) {
          verifyRouteModel();
        }
      }
    }
    function unregisterTab(tabData) {
      tabDataList.splice(tabDataList.indexOf(tabData), 1);
      tabDataListLen.value--;
      recalculateScroll();
      if (unwatchRoute !== void 0 && tabData.routeData !== void 0) {
        if (tabDataList.every((tab) => tab.routeData === void 0) === true) {
          unwatchRoute();
        }
        verifyRouteModel();
      }
    }
    const $tabs = {
      currentModel,
      tabProps,
      hasFocus,
      hasActiveTab,
      registerTab,
      unregisterTab,
      verifyRouteModel,
      updateModel,
      onKbdNavigate,
      avoidRouteWatcher: false
    };
    provide(tabsKey, $tabs);
    function cleanup() {
      animateTimer !== null && clearTimeout(animateTimer);
      stopAnimScroll();
      unwatchRoute !== void 0 && unwatchRoute();
    }
    let hadRouteWatcher;
    onBeforeUnmount(cleanup);
    onDeactivated(() => {
      hadRouteWatcher = unwatchRoute !== void 0;
      cleanup();
    });
    onActivated(() => {
      hadRouteWatcher === true && watchRoute();
      recalculateScroll();
    });
    return () => {
      return h("div", {
        ref: rootRef,
        class: classes.value,
        role: "tablist",
        onFocusin,
        onFocusout
      }, [
        h(QResizeObserver, { onResize: updateContainer }),
        h("div", {
          ref: contentRef,
          class: innerClass.value,
          onScroll: updateArrows
        }, hSlot(slots.default)),
        h(QIcon, {
          class: "q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon" + (leftArrow.value === true ? "" : " q-tabs__arrow--faded"),
          name: props.leftIcon || $q.iconSet.tabs[props.vertical === true ? "up" : "left"],
          onMousedownPassive: scrollToStart,
          onTouchstartPassive: scrollToStart,
          onMouseupPassive: stopAnimScroll,
          onMouseleavePassive: stopAnimScroll,
          onTouchendPassive: stopAnimScroll
        }),
        h(QIcon, {
          class: "q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon" + (rightArrow.value === true ? "" : " q-tabs__arrow--faded"),
          name: props.rightIcon || $q.iconSet.tabs[props.vertical === true ? "down" : "right"],
          onMousedownPassive: scrollToEnd,
          onTouchstartPassive: scrollToEnd,
          onMouseupPassive: stopAnimScroll,
          onMouseleavePassive: stopAnimScroll,
          onTouchendPassive: stopAnimScroll
        })
      ]);
    };
  }
});
function parseArg(arg) {
  const data = [0.06, 6, 50];
  if (typeof arg === "string" && arg.length) {
    arg.split(":").forEach((val, index) => {
      const v = parseFloat(val);
      v && (data[index] = v);
    });
  }
  return data;
}
var TouchSwipe = createDirective(
  {
    name: "touch-swipe",
    beforeMount(el, { value, arg, modifiers }) {
      if (modifiers.mouse !== true && client.has.touch !== true) {
        return;
      }
      const mouseCapture = modifiers.mouseCapture === true ? "Capture" : "";
      const ctx = {
        handler: value,
        sensitivity: parseArg(arg),
        direction: getModifierDirections(modifiers),
        noop,
        mouseStart(evt) {
          if (shouldStart(evt, ctx) && leftClick(evt)) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", `notPassive${mouseCapture}`],
              [document, "mouseup", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (shouldStart(evt, ctx)) {
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "notPassiveCapture"],
              [target, "touchcancel", "end", "notPassiveCapture"],
              [target, "touchend", "end", "notPassiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          client.is.firefox === true && preventDraggable(el, true);
          const pos = position(evt);
          ctx.event = {
            x: pos.left,
            y: pos.top,
            time: Date.now(),
            mouse: mouseEvent === true,
            dir: false
          };
        },
        move(evt) {
          if (ctx.event === void 0) {
            return;
          }
          if (ctx.event.dir !== false) {
            stopAndPrevent(evt);
            return;
          }
          const time = Date.now() - ctx.event.time;
          if (time === 0) {
            return;
          }
          const pos = position(evt), distX = pos.left - ctx.event.x, absX = Math.abs(distX), distY = pos.top - ctx.event.y, absY = Math.abs(distY);
          if (ctx.event.mouse !== true) {
            if (absX < ctx.sensitivity[1] && absY < ctx.sensitivity[1]) {
              ctx.end(evt);
              return;
            }
          } else if (absX < ctx.sensitivity[2] && absY < ctx.sensitivity[2]) {
            return;
          }
          const velX = absX / time, velY = absY / time;
          if (ctx.direction.vertical === true && absX < absY && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = distY < 0 ? "up" : "down";
          }
          if (ctx.direction.horizontal === true && absX > absY && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = distX < 0 ? "left" : "right";
          }
          if (ctx.direction.up === true && absX < absY && distY < 0 && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = "up";
          }
          if (ctx.direction.down === true && absX < absY && distY > 0 && absX < 100 && velY > ctx.sensitivity[0]) {
            ctx.event.dir = "down";
          }
          if (ctx.direction.left === true && absX > absY && distX < 0 && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = "left";
          }
          if (ctx.direction.right === true && absX > absY && distX > 0 && absY < 100 && velX > ctx.sensitivity[0]) {
            ctx.event.dir = "right";
          }
          if (ctx.event.dir !== false) {
            stopAndPrevent(evt);
            if (ctx.event.mouse === true) {
              document.body.classList.add("no-pointer-events--children");
              document.body.classList.add("non-selectable");
              clearSelection();
              ctx.styleCleanup = (withDelay) => {
                ctx.styleCleanup = void 0;
                document.body.classList.remove("non-selectable");
                const remove = () => {
                  document.body.classList.remove("no-pointer-events--children");
                };
                if (withDelay === true) {
                  setTimeout(remove, 50);
                } else {
                  remove();
                }
              };
            }
            ctx.handler({
              evt,
              touch: ctx.event.mouse !== true,
              mouse: ctx.event.mouse,
              direction: ctx.event.dir,
              duration: time,
              distance: {
                x: absX,
                y: absY
              }
            });
          } else {
            ctx.end(evt);
          }
        },
        end(evt) {
          if (ctx.event === void 0) {
            return;
          }
          cleanEvt(ctx, "temp");
          client.is.firefox === true && preventDraggable(el, false);
          ctx.styleCleanup !== void 0 && ctx.styleCleanup(true);
          evt !== void 0 && ctx.event.dir !== false && stopAndPrevent(evt);
          ctx.event = void 0;
        }
      };
      el.__qtouchswipe = ctx;
      if (modifiers.mouse === true) {
        const capture = modifiers.mouseCapture === true || modifiers.mousecapture === true ? "Capture" : "";
        addEvt(ctx, "main", [
          [el, "mousedown", "mouseStart", `passive${capture}`]
        ]);
      }
      client.has.touch === true && addEvt(ctx, "main", [
        [el, "touchstart", "touchStart", `passive${modifiers.capture === true ? "Capture" : ""}`],
        [el, "touchmove", "noop", "notPassiveCapture"]
      ]);
    },
    updated(el, bindings) {
      const ctx = el.__qtouchswipe;
      if (ctx !== void 0) {
        if (bindings.oldValue !== bindings.value) {
          typeof bindings.value !== "function" && ctx.end();
          ctx.handler = bindings.value;
        }
        ctx.direction = getModifierDirections(bindings.modifiers);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qtouchswipe;
      if (ctx !== void 0) {
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup !== void 0 && ctx.styleCleanup();
        delete el.__qtouchswipe;
      }
    }
  }
);
function useCache() {
  const cache = /* @__PURE__ */ new Map();
  return {
    getCache: function(key, obj) {
      return cache[key] === void 0 ? cache[key] = obj : cache[key];
    },
    getCacheWithFn: function(key, fn) {
      return cache[key] === void 0 ? cache[key] = fn() : cache[key];
    }
  };
}
const usePanelChildProps = {
  name: { required: true },
  disable: Boolean
};
const PanelWrapper = {
  setup(_, { slots }) {
    return () => h("div", {
      class: "q-panel scroll",
      role: "tabpanel"
    }, hSlot(slots.default));
  }
};
const usePanelProps = {
  modelValue: {
    required: true
  },
  animated: Boolean,
  infinite: Boolean,
  swipeable: Boolean,
  vertical: Boolean,
  transitionPrev: String,
  transitionNext: String,
  transitionDuration: {
    type: [String, Number],
    default: 300
  },
  keepAlive: Boolean,
  keepAliveInclude: [String, Array, RegExp],
  keepAliveExclude: [String, Array, RegExp],
  keepAliveMax: Number
};
const usePanelEmits = ["update:modelValue", "beforeTransition", "transition"];
function usePanel() {
  const { props, emit, proxy } = getCurrentInstance();
  const { getCacheWithFn } = useCache();
  let panels, forcedPanelTransition;
  const panelIndex = ref(null);
  const panelTransition = ref(null);
  function onSwipe(evt) {
    const dir = props.vertical === true ? "up" : "left";
    goToPanelByOffset((proxy.$q.lang.rtl === true ? -1 : 1) * (evt.direction === dir ? 1 : -1));
  }
  const panelDirectives = computed(() => {
    return [[
      TouchSwipe,
      onSwipe,
      void 0,
      {
        horizontal: props.vertical !== true,
        vertical: props.vertical,
        mouse: true
      }
    ]];
  });
  const transitionPrev = computed(
    () => props.transitionPrev || `slide-${props.vertical === true ? "down" : "right"}`
  );
  const transitionNext = computed(
    () => props.transitionNext || `slide-${props.vertical === true ? "up" : "left"}`
  );
  const transitionStyle = computed(
    () => `--q-transition-duration: ${props.transitionDuration}ms`
  );
  const contentKey = computed(() => typeof props.modelValue === "string" || typeof props.modelValue === "number" ? props.modelValue : String(props.modelValue));
  const keepAliveProps = computed(() => ({
    include: props.keepAliveInclude,
    exclude: props.keepAliveExclude,
    max: props.keepAliveMax
  }));
  const needsUniqueKeepAliveWrapper = computed(
    () => props.keepAliveInclude !== void 0 || props.keepAliveExclude !== void 0
  );
  watch(() => props.modelValue, (newVal, oldVal) => {
    const index = isValidPanelName(newVal) === true ? getPanelIndex(newVal) : -1;
    if (forcedPanelTransition !== true) {
      updatePanelTransition(
        index === -1 ? 0 : index < getPanelIndex(oldVal) ? -1 : 1
      );
    }
    if (panelIndex.value !== index) {
      panelIndex.value = index;
      emit("beforeTransition", newVal, oldVal);
      nextTick(() => {
        emit("transition", newVal, oldVal);
      });
    }
  });
  function nextPanel() {
    goToPanelByOffset(1);
  }
  function previousPanel() {
    goToPanelByOffset(-1);
  }
  function goToPanel(name) {
    emit("update:modelValue", name);
  }
  function isValidPanelName(name) {
    return name !== void 0 && name !== null && name !== "";
  }
  function getPanelIndex(name) {
    return panels.findIndex((panel) => {
      return panel.props.name === name && panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function getEnabledPanels() {
    return panels.filter((panel) => {
      return panel.props.disable !== "" && panel.props.disable !== true;
    });
  }
  function updatePanelTransition(direction) {
    const val = direction !== 0 && props.animated === true && panelIndex.value !== -1 ? "q-transition--" + (direction === -1 ? transitionPrev.value : transitionNext.value) : null;
    if (panelTransition.value !== val) {
      panelTransition.value = val;
    }
  }
  function goToPanelByOffset(direction, startIndex = panelIndex.value) {
    let index = startIndex + direction;
    while (index > -1 && index < panels.length) {
      const opt = panels[index];
      if (opt !== void 0 && opt.props.disable !== "" && opt.props.disable !== true) {
        updatePanelTransition(direction);
        forcedPanelTransition = true;
        emit("update:modelValue", opt.props.name);
        setTimeout(() => {
          forcedPanelTransition = false;
        });
        return;
      }
      index += direction;
    }
    if (props.infinite === true && panels.length > 0 && startIndex !== -1 && startIndex !== panels.length) {
      goToPanelByOffset(direction, direction === -1 ? panels.length : -1);
    }
  }
  function updatePanelIndex() {
    const index = getPanelIndex(props.modelValue);
    if (panelIndex.value !== index) {
      panelIndex.value = index;
    }
    return true;
  }
  function getPanelContentChild() {
    const panel = isValidPanelName(props.modelValue) === true && updatePanelIndex() && panels[panelIndex.value];
    return props.keepAlive === true ? [
      h(KeepAlive, keepAliveProps.value, [
        h(
          needsUniqueKeepAliveWrapper.value === true ? getCacheWithFn(contentKey.value, () => ({ ...PanelWrapper, name: contentKey.value })) : PanelWrapper,
          { key: contentKey.value, style: transitionStyle.value },
          () => panel
        )
      ])
    ] : [
      h("div", {
        class: "q-panel scroll",
        style: transitionStyle.value,
        key: contentKey.value,
        role: "tabpanel"
      }, [panel])
    ];
  }
  function getPanelContent() {
    if (panels.length === 0) {
      return;
    }
    return props.animated === true ? [h(Transition, { name: panelTransition.value }, getPanelContentChild)] : getPanelContentChild();
  }
  function updatePanelsList(slots) {
    panels = getNormalizedVNodes(
      hSlot(slots.default, [])
    ).filter(
      (panel) => panel.props !== null && panel.props.slot === void 0 && isValidPanelName(panel.props.name) === true
    );
    return panels.length;
  }
  function getPanels() {
    return panels;
  }
  Object.assign(proxy, {
    next: nextPanel,
    previous: previousPanel,
    goTo: goToPanel
  });
  return {
    panelIndex,
    panelDirectives,
    updatePanelsList,
    updatePanelIndex,
    getPanelContent,
    getEnabledPanels,
    getPanels,
    isValidPanelName,
    keepAliveProps,
    needsUniqueKeepAliveWrapper,
    goToPanelByOffset,
    goToPanel,
    nextPanel,
    previousPanel
  };
}
var QTabPanel = createComponent({
  name: "QTabPanel",
  props: usePanelChildProps,
  setup(_, { slots }) {
    return () => h("div", { class: "q-tab-panel", role: "tabpanel" }, hSlot(slots.default));
  }
});
var QTimelineEntry = createComponent({
  name: "QTimelineEntry",
  props: {
    heading: Boolean,
    tag: {
      type: String,
      default: "h3"
    },
    side: {
      type: String,
      default: "right",
      validator: (v) => ["left", "right"].includes(v)
    },
    icon: String,
    avatar: String,
    color: String,
    title: String,
    subtitle: String,
    body: String
  },
  setup(props, { slots }) {
    const $timeline = inject(timelineKey, emptyRenderFn);
    if ($timeline === emptyRenderFn) {
      console.error("QTimelineEntry needs to be child of QTimeline");
      return emptyRenderFn;
    }
    const classes = computed(
      () => `q-timeline__entry q-timeline__entry--${props.side}` + (props.icon !== void 0 || props.avatar !== void 0 ? " q-timeline__entry--icon" : "")
    );
    const dotClass = computed(
      () => `q-timeline__dot text-${props.color || $timeline.color}`
    );
    const reverse = computed(
      () => $timeline.layout === "comfortable" && $timeline.side === "left"
    );
    return () => {
      const child = hUniqueSlot(slots.default, []);
      if (props.body !== void 0) {
        child.unshift(props.body);
      }
      if (props.heading === true) {
        const content2 = [
          h("div"),
          h("div"),
          h(
            props.tag,
            { class: "q-timeline__heading-title" },
            child
          )
        ];
        return h("div", {
          class: "q-timeline__heading"
        }, reverse.value === true ? content2.reverse() : content2);
      }
      let dot;
      if (props.icon !== void 0) {
        dot = [
          h(QIcon, {
            class: "row items-center justify-center",
            name: props.icon
          })
        ];
      } else if (props.avatar !== void 0) {
        dot = [
          h("img", {
            class: "q-timeline__dot-img",
            src: props.avatar
          })
        ];
      }
      const content = [
        h("div", { class: "q-timeline__subtitle" }, [
          h("span", {}, hSlot(slots.subtitle, [props.subtitle]))
        ]),
        h("div", { class: dotClass.value }, dot),
        h("div", { class: "q-timeline__content" }, [
          h("h6", { class: "q-timeline__title" }, hSlot(slots.title, [props.title]))
        ].concat(child))
      ];
      return h("li", {
        class: classes.value
      }, reverse.value === true ? content.reverse() : content);
    };
  }
});
var QTimeline = createComponent({
  name: "QTimeline",
  props: {
    ...useDarkProps,
    color: {
      type: String,
      default: "primary"
    },
    side: {
      type: String,
      default: "right",
      validator: (v) => ["left", "right"].includes(v)
    },
    layout: {
      type: String,
      default: "dense",
      validator: (v) => ["dense", "comfortable", "loose"].includes(v)
    }
  },
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    provide(timelineKey, props);
    const classes = computed(
      () => `q-timeline q-timeline--${props.layout} q-timeline--${props.layout}--${props.side}` + (isDark.value === true ? " q-timeline--dark" : "")
    );
    return () => h("ul", { class: classes.value }, hSlot(slots.default));
  }
});
var QTabPanels = createComponent({
  name: "QTabPanels",
  props: {
    ...usePanelProps,
    ...useDarkProps
  },
  emits: usePanelEmits,
  setup(props, { slots }) {
    const vm = getCurrentInstance();
    const isDark = useDark(props, vm.proxy.$q);
    const { updatePanelsList, getPanelContent, panelDirectives } = usePanel();
    const classes = computed(
      () => "q-tab-panels q-panel-parent" + (isDark.value === true ? " q-tab-panels--dark q-dark" : "")
    );
    return () => {
      updatePanelsList(slots);
      return hDir(
        "div",
        { class: classes.value },
        getPanelContent(),
        "pan",
        props.swipeable,
        () => panelDirectives.value
      );
    };
  }
});
var QCard = createComponent({
  name: "QCard",
  props: {
    ...useDarkProps,
    tag: {
      type: String,
      default: "div"
    },
    square: Boolean,
    flat: Boolean,
    bordered: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const classes = computed(
      () => "q-card" + (isDark.value === true ? " q-card--dark q-dark" : "") + (props.bordered === true ? " q-card--bordered" : "") + (props.square === true ? " q-card--square no-border-radius" : "") + (props.flat === true ? " q-card--flat no-shadow" : "")
    );
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
  }
});
var localizedFormat$1 = { exports: {} };
(function(module, exports) {
  !function(e, t) {
    module.exports = t();
  }(commonjsGlobal, function() {
    var e = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
    return function(t, o, n) {
      var r = o.prototype, i = r.format;
      n.en.formats = e, r.format = function(t2) {
        void 0 === t2 && (t2 = "YYYY-MM-DDTHH:mm:ssZ");
        var o2 = this.$locale().formats, n2 = function(t3, o3) {
          return t3.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t4, n3, r2) {
            var i2 = r2 && r2.toUpperCase();
            return n3 || o3[r2] || e[r2] || o3[i2].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e2, t5, o4) {
              return t5 || o4.slice(1);
            });
          });
        }(t2, void 0 === o2 ? {} : o2);
        return i.call(this, n2);
      };
    };
  });
})(localizedFormat$1);
var localizedFormat = localizedFormat$1.exports;
var QChatMessage = createComponent({
  name: "QChatMessage",
  props: {
    sent: Boolean,
    label: String,
    bgColor: String,
    textColor: String,
    name: String,
    avatar: String,
    text: Array,
    stamp: String,
    size: String,
    labelHtml: Boolean,
    nameHtml: Boolean,
    textHtml: Boolean,
    stampHtml: Boolean
  },
  setup(props, { slots }) {
    const op = computed(() => props.sent === true ? "sent" : "received");
    const textClass = computed(
      () => `q-message-text-content q-message-text-content--${op.value}` + (props.textColor !== void 0 ? ` text-${props.textColor}` : "")
    );
    const messageClass = computed(
      () => `q-message-text q-message-text--${op.value}` + (props.bgColor !== void 0 ? ` text-${props.bgColor}` : "")
    );
    const containerClass = computed(
      () => "q-message-container row items-end no-wrap" + (props.sent === true ? " reverse" : "")
    );
    const sizeClass = computed(() => props.size !== void 0 ? `col-${props.size}` : "");
    const domProps = computed(() => ({
      msg: props.textHtml === true ? "innerHTML" : "textContent",
      stamp: props.stampHtml === true ? "innerHTML" : "textContent",
      name: props.nameHtml === true ? "innerHTML" : "textContent",
      label: props.labelHtml === true ? "innerHTML" : "textContent"
    }));
    function wrapStamp(node) {
      if (slots.stamp !== void 0) {
        return [node, h("div", { class: "q-message-stamp" }, slots.stamp())];
      }
      if (props.stamp) {
        return [
          node,
          h("div", {
            class: "q-message-stamp",
            [domProps.value.stamp]: props.stamp
          })
        ];
      }
      return [node];
    }
    function getText(contentList, withSlots) {
      const content = withSlots === true ? contentList.length > 1 ? (text) => text : (text) => h("div", [text]) : (text) => h("div", { [domProps.value.msg]: text });
      return contentList.map((msg, index) => h("div", {
        key: index,
        class: messageClass.value
      }, [
        h("div", { class: textClass.value }, wrapStamp(content(msg)))
      ]));
    }
    return () => {
      const container = [];
      if (slots.avatar !== void 0) {
        container.push(slots.avatar());
      } else if (props.avatar !== void 0) {
        container.push(
          h("img", {
            class: `q-message-avatar q-message-avatar--${op.value}`,
            src: props.avatar,
            "aria-hidden": "true"
          })
        );
      }
      const msg = [];
      if (slots.name !== void 0) {
        msg.push(
          h("div", { class: `q-message-name q-message-name--${op.value}` }, slots.name())
        );
      } else if (props.name !== void 0) {
        msg.push(
          h("div", {
            class: `q-message-name q-message-name--${op.value}`,
            [domProps.value.name]: props.name
          })
        );
      }
      if (slots.default !== void 0) {
        msg.push(
          getText(
            getNormalizedVNodes(slots.default()),
            true
          )
        );
      } else if (props.text !== void 0) {
        msg.push(getText(props.text));
      }
      container.push(
        h("div", { class: sizeClass.value }, msg)
      );
      const child = [];
      if (slots.label !== void 0) {
        child.push(
          h("div", { class: "q-message-label" }, slots.label())
        );
      } else if (props.label !== void 0) {
        child.push(
          h("div", {
            class: "q-message-label",
            [domProps.value.label]: props.label
          })
        );
      }
      child.push(
        h("div", { class: containerClass.value }, container)
      );
      return h("div", {
        class: `q-message q-message-${op.value}`
      }, child);
    };
  }
});
var duration$1 = { exports: {} };
(function(module, exports) {
  !function(t, s) {
    module.exports = s();
  }(commonjsGlobal, function() {
    var t, s, n = 1e3, i = 6e4, e = 36e5, r = 864e5, o = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, u = 31536e6, h2 = 2592e6, a = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, d = { years: u, months: h2, days: r, hours: e, minutes: i, seconds: n, milliseconds: 1, weeks: 6048e5 }, c = function(t2) {
      return t2 instanceof p;
    }, f = function(t2, s2, n2) {
      return new p(t2, n2, s2.$l);
    }, m = function(t2) {
      return s.p(t2) + "s";
    }, l = function(t2) {
      return t2 < 0;
    }, $ = function(t2) {
      return l(t2) ? Math.ceil(t2) : Math.floor(t2);
    }, y = function(t2) {
      return Math.abs(t2);
    }, g = function(t2, s2) {
      return t2 ? l(t2) ? { negative: true, format: "" + y(t2) + s2 } : { negative: false, format: "" + t2 + s2 } : { negative: false, format: "" };
    }, p = function() {
      function l2(t2, s2, n2) {
        var i2 = this;
        if (this.$d = {}, this.$l = n2, void 0 === t2 && (this.$ms = 0, this.parseFromMilliseconds()), s2)
          return f(t2 * d[m(s2)], this);
        if ("number" == typeof t2)
          return this.$ms = t2, this.parseFromMilliseconds(), this;
        if ("object" == typeof t2)
          return Object.keys(t2).forEach(function(s3) {
            i2.$d[m(s3)] = t2[s3];
          }), this.calMilliseconds(), this;
        if ("string" == typeof t2) {
          var e2 = t2.match(a);
          if (e2) {
            var r2 = e2.slice(2).map(function(t3) {
              return null != t3 ? Number(t3) : 0;
            });
            return this.$d.years = r2[0], this.$d.months = r2[1], this.$d.weeks = r2[2], this.$d.days = r2[3], this.$d.hours = r2[4], this.$d.minutes = r2[5], this.$d.seconds = r2[6], this.calMilliseconds(), this;
          }
        }
        return this;
      }
      var y2 = l2.prototype;
      return y2.calMilliseconds = function() {
        var t2 = this;
        this.$ms = Object.keys(this.$d).reduce(function(s2, n2) {
          return s2 + (t2.$d[n2] || 0) * d[n2];
        }, 0);
      }, y2.parseFromMilliseconds = function() {
        var t2 = this.$ms;
        this.$d.years = $(t2 / u), t2 %= u, this.$d.months = $(t2 / h2), t2 %= h2, this.$d.days = $(t2 / r), t2 %= r, this.$d.hours = $(t2 / e), t2 %= e, this.$d.minutes = $(t2 / i), t2 %= i, this.$d.seconds = $(t2 / n), t2 %= n, this.$d.milliseconds = t2;
      }, y2.toISOString = function() {
        var t2 = g(this.$d.years, "Y"), s2 = g(this.$d.months, "M"), n2 = +this.$d.days || 0;
        this.$d.weeks && (n2 += 7 * this.$d.weeks);
        var i2 = g(n2, "D"), e2 = g(this.$d.hours, "H"), r2 = g(this.$d.minutes, "M"), o2 = this.$d.seconds || 0;
        this.$d.milliseconds && (o2 += this.$d.milliseconds / 1e3);
        var u2 = g(o2, "S"), h3 = t2.negative || s2.negative || i2.negative || e2.negative || r2.negative || u2.negative, a2 = e2.format || r2.format || u2.format ? "T" : "", d2 = (h3 ? "-" : "") + "P" + t2.format + s2.format + i2.format + a2 + e2.format + r2.format + u2.format;
        return "P" === d2 || "-P" === d2 ? "P0D" : d2;
      }, y2.toJSON = function() {
        return this.toISOString();
      }, y2.format = function(t2) {
        var n2 = t2 || "YYYY-MM-DDTHH:mm:ss", i2 = { Y: this.$d.years, YY: s.s(this.$d.years, 2, "0"), YYYY: s.s(this.$d.years, 4, "0"), M: this.$d.months, MM: s.s(this.$d.months, 2, "0"), D: this.$d.days, DD: s.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: s.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: s.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: s.s(this.$d.seconds, 2, "0"), SSS: s.s(this.$d.milliseconds, 3, "0") };
        return n2.replace(o, function(t3, s2) {
          return s2 || String(i2[t3]);
        });
      }, y2.as = function(t2) {
        return this.$ms / d[m(t2)];
      }, y2.get = function(t2) {
        var s2 = this.$ms, n2 = m(t2);
        return "milliseconds" === n2 ? s2 %= 1e3 : s2 = "weeks" === n2 ? $(s2 / d[n2]) : this.$d[n2], 0 === s2 ? 0 : s2;
      }, y2.add = function(t2, s2, n2) {
        var i2;
        return i2 = s2 ? t2 * d[m(s2)] : c(t2) ? t2.$ms : f(t2, this).$ms, f(this.$ms + i2 * (n2 ? -1 : 1), this);
      }, y2.subtract = function(t2, s2) {
        return this.add(t2, s2, true);
      }, y2.locale = function(t2) {
        var s2 = this.clone();
        return s2.$l = t2, s2;
      }, y2.clone = function() {
        return f(this.$ms, this);
      }, y2.humanize = function(s2) {
        return t().add(this.$ms, "ms").locale(this.$l).fromNow(!s2);
      }, y2.milliseconds = function() {
        return this.get("milliseconds");
      }, y2.asMilliseconds = function() {
        return this.as("milliseconds");
      }, y2.seconds = function() {
        return this.get("seconds");
      }, y2.asSeconds = function() {
        return this.as("seconds");
      }, y2.minutes = function() {
        return this.get("minutes");
      }, y2.asMinutes = function() {
        return this.as("minutes");
      }, y2.hours = function() {
        return this.get("hours");
      }, y2.asHours = function() {
        return this.as("hours");
      }, y2.days = function() {
        return this.get("days");
      }, y2.asDays = function() {
        return this.as("days");
      }, y2.weeks = function() {
        return this.get("weeks");
      }, y2.asWeeks = function() {
        return this.as("weeks");
      }, y2.months = function() {
        return this.get("months");
      }, y2.asMonths = function() {
        return this.as("months");
      }, y2.years = function() {
        return this.get("years");
      }, y2.asYears = function() {
        return this.as("years");
      }, l2;
    }();
    return function(n2, i2, e2) {
      t = e2, s = e2().$utils(), e2.duration = function(t2, s2) {
        var n3 = e2.locale();
        return f(t2, { $l: n3 }, s2);
      }, e2.isDuration = c;
      var r2 = i2.prototype.add, o2 = i2.prototype.subtract;
      i2.prototype.add = function(t2, s2) {
        return c(t2) && (t2 = t2.asMilliseconds()), r2.bind(this)(t2, s2);
      }, i2.prototype.subtract = function(t2, s2) {
        return c(t2) && (t2 = t2.asMilliseconds()), o2.bind(this)(t2, s2);
      };
    };
  });
})(duration$1);
var duration = duration$1.exports;
const _hoisted_1$2 = { key: 0 };
const _hoisted_2$2 = { key: 1 };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "JobRunTimeline",
  props: {
    run: null
  },
  setup(__props) {
    const props = __props;
    dayjs.extend(duration);
    function calculateTimeIntoJob(time) {
      let originalDate = props.run.created_at;
      return dayjs.duration({
        milliseconds: dayjs(time).diff(originalDate, "millisecond")
      });
    }
    function getColourFromMessageType(type) {
      if (type === MessageType.Info) {
        return "info";
      } else if (type === MessageType.Success) {
        return "positive";
      } else if (type === MessageType.Error) {
        return "negative";
      } else if (type === MessageType.Warning) {
        return "warning";
      } else {
        return "accent";
      }
    }
    const entries = computed(() => {
      let rawEntries = [];
      for (let message of props.run.messages) {
        rawEntries.push({
          from_app: false,
          id: "message-" + message.id.toString(),
          text: [message.message],
          time_into_job: calculateTimeIntoJob(message.created_at),
          color: getColourFromMessageType(message.type),
          icon: "chat"
        });
      }
      if (props.run.exception !== null) {
        rawEntries.push({
          from_app: false,
          id: "exception-" + props.run.exception.id.toString(),
          text: ["An exception occurred", props.run.exception.message],
          time_into_job: calculateTimeIntoJob(props.run.exception.created_at),
          color: "negative",
          icon: "error"
        });
      }
      for (let status of props.run.statuses) {
        rawEntries.push({
          from_app: false,
          id: "status-" + status.id.toString(),
          text: [
            "Status changed to " + status.status
          ],
          time_into_job: calculateTimeIntoJob(status.created_at),
          color: null,
          icon: "move_down"
        });
      }
      for (let signal of props.run.signals) {
        rawEntries.push({
          from_app: true,
          id: "signal-dispatched-" + signal.id.toString(),
          text: [
            "Signal " + signal.signal + " sent (#" + signal.id.toString() + ")"
          ].concat(
            Object.keys(signal.parameters).map((key) => {
              return "Passing parameter '" + key + "' with value '" + signal.parameters[key] + "'";
            })
          ),
          time_into_job: calculateTimeIntoJob(signal.created_at),
          color: null,
          icon: "connect_without_contact"
        });
        if (signal.handled_at !== null) {
          rawEntries.push({
            from_app: false,
            id: "signal-handled-" + signal.id.toString(),
            text: [
              "Handled signal " + signal.signal + " (#" + signal.id + ")"
            ].concat(signal.cancel_job ? ["This caused the job to be cancelled."] : []),
            time_into_job: calculateTimeIntoJob(signal.handled_at),
            color: signal.cancel_job ? "warning" : null,
            icon: "connect_without_contact"
          });
        }
      }
      rawEntries.sort((a, b) => {
        return a.time_into_job.asMilliseconds() - b.time_into_job.asMilliseconds();
      });
      return rawEntries;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(entries), (entry) => {
          var _a;
          return openBlock(), createBlock(QChatMessage, {
            text: entry.text,
            sent: entry.from_app,
            "text-color": "white",
            "bg-color": (_a = entry.color) != null ? _a : "primary",
            key: entry.id
          }, {
            name: withCtx(() => [
              entry.from_app ? (openBlock(), createElementBlock("span", _hoisted_1$2, "Your Application")) : (openBlock(), createElementBlock("span", _hoisted_2$2, toDisplayString(__props.run.alias), 1))
            ]),
            stamp: withCtx(() => [
              createBaseVNode("span", null, toDisplayString(Math.round(entry.time_into_job.asSeconds() * 10) / 10) + " seconds", 1)
            ]),
            avatar: withCtx(() => [
              entry.from_app ? (openBlock(), createBlock(QAvatar, {
                key: 0,
                color: "teal",
                class: "q-ma-sm",
                "text-color": "white",
                icon: entry.icon
              }, null, 8, ["icon"])) : (openBlock(), createBlock(QAvatar, {
                key: 1,
                color: "teal",
                class: "q-ma-sm",
                "text-color": "white",
                icon: entry.icon
              }, null, 8, ["icon"]))
            ]),
            _: 2
          }, 1032, ["text", "sent", "bg-color"]);
        }), 128))
      ]);
    };
  }
});
var JobRunTimeline = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "JobRunTimeline.vue"]]);
const space = h("div", { class: "q-space" });
var QSpace = createComponent({
  name: "QSpace",
  setup() {
    return () => space;
  }
});
var QCardActions = createComponent({
  name: "QCardActions",
  props: {
    ...useAlignProps,
    vertical: Boolean
  },
  setup(props, { slots }) {
    const alignClass = useAlign(props);
    const classes = computed(
      () => `q-card__actions ${alignClass.value} q-card__actions--${props.vertical === true ? "vert column" : "horiz row"}`
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
var QCardSection = createComponent({
  name: "QCardSection",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    horizontal: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => `q-card__section q-card__section--${props.horizontal === true ? "horiz row no-wrap" : "vert"}`
    );
    return () => h(props.tag, { class: classes.value }, hSlot(slots.default));
  }
});
const portalProxyList = [];
function getPortalProxy(el) {
  return portalProxyList.find(
    (proxy) => proxy.contentEl !== null && proxy.contentEl.contains(el)
  );
}
function closePortalMenus(proxy, evt) {
  do {
    if (proxy.$options.name === "QMenu") {
      proxy.hide(evt);
      if (proxy.$props.separateClosePopup === true) {
        return getParentProxy(proxy);
      }
    } else if (proxy.__qPortal === true) {
      const parent = getParentProxy(proxy);
      if (parent !== void 0 && parent.$options.name === "QPopupProxy") {
        proxy.hide(evt);
        return parent;
      } else {
        return proxy;
      }
    }
    proxy = getParentProxy(proxy);
  } while (proxy !== void 0 && proxy !== null);
}
function closePortals(proxy, evt, depth) {
  while (depth !== 0 && proxy !== void 0 && proxy !== null) {
    if (proxy.__qPortal === true) {
      depth--;
      if (proxy.$options.name === "QMenu") {
        proxy = closePortalMenus(proxy, evt);
        continue;
      }
      proxy.hide(evt);
    }
    proxy = getParentProxy(proxy);
  }
}
function getDepth(value) {
  if (value === false) {
    return 0;
  }
  if (value === true || value === void 0) {
    return 1;
  }
  const depth = parseInt(value, 10);
  return isNaN(depth) ? 0 : depth;
}
var ClosePopup = createDirective(
  {
    name: "close-popup",
    beforeMount(el, { value }) {
      const ctx = {
        depth: getDepth(value),
        handler(evt) {
          ctx.depth !== 0 && setTimeout(() => {
            const proxy = getPortalProxy(el);
            if (proxy !== void 0) {
              closePortals(proxy, evt, ctx.depth);
            }
          });
        },
        handlerKey(evt) {
          isKeyCode(evt, 13) === true && ctx.handler(evt);
        }
      };
      el.__qclosepopup = ctx;
      el.addEventListener("click", ctx.handler);
      el.addEventListener("keyup", ctx.handlerKey);
    },
    updated(el, { value, oldValue }) {
      if (value !== oldValue) {
        el.__qclosepopup.depth = getDepth(value);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qclosepopup;
      el.removeEventListener("click", ctx.handler);
      el.removeEventListener("keyup", ctx.handlerKey);
      delete el.__qclosepopup;
    }
  }
);
const _hoisted_1$1 = { class: "text-h6" };
const _hoisted_2$1 = { class: "text-subtitle2" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ExceptionView",
  props: {
    exceptions: null
  },
  setup(__props) {
    const props = __props;
    const indexToView = ref();
    onMounted(() => {
      if (props.exceptions.length > 0) {
        indexToView.value = 0;
      }
    });
    const exception = computed(() => {
      if (indexToView.value !== null && indexToView.value !== void 0) {
        return props.exceptions[indexToView.value];
      }
      return null;
    });
    return (_ctx, _cache) => {
      return unref(exception) !== null ? (openBlock(), createBlock(QCard, { key: 0 }, {
        default: withCtx(() => [
          props.exceptions.length > 1 ? (openBlock(), createBlock(QCardActions, { key: 0 }, {
            default: withCtx(() => [
              indexToView.value !== null && indexToView.value !== void 0 && indexToView.value < props.exceptions.length - 1 ? (openBlock(), createBlock(QBtn, {
                key: 0,
                flat: "",
                onClick: _cache[0] || (_cache[0] = ($event) => indexToView.value++)
              }, {
                default: withCtx(() => [
                  createTextVNode("Previous exception ")
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(QSpace),
              indexToView.value !== null && indexToView.value !== void 0 && indexToView.value !== 0 ? (openBlock(), createBlock(QBtn, {
                key: 1,
                flat: "",
                onClick: _cache[1] || (_cache[1] = ($event) => indexToView.value--)
              }, {
                default: withCtx(() => [
                  createTextVNode("Next exception ")
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1$1, toDisplayString(unref(exception).code) + " | " + toDisplayString(unref(exception).message), 1),
              createBaseVNode("div", _hoisted_2$1, toDisplayString(unref(exception).file) + ":" + toDisplayString(unref(exception).line), 1)
            ]),
            _: 1
          }),
          createVNode(QCardSection, { class: "q-pt-none" }, {
            default: withCtx(() => [
              createVNode(QList, null, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(exception).stack_trace, (trace, index) => {
                    return openBlock(), createBlock(QItem, { key: index }, {
                      default: withCtx(() => [
                        createVNode(QItemSection, {
                          side: "",
                          top: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("#" + toDisplayString(index), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(trace.file) + ":" + toDisplayString(trace.line), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(QItemLabel, {
                              caption: "",
                              lines: "2"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(trace.class) + toDisplayString(trace.type) + toDisplayString(trace.function), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128)),
                  createVNode(QSeparator, {
                    spaced: "",
                    inset: ""
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QCardActions, { align: "right" }, {
            default: withCtx(() => [
              withDirectives(createVNode(QBtn, {
                flat: "",
                label: "Close",
                color: "primary"
              }, null, 512), [
                [ClosePopup]
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      })) : (openBlock(), createBlock(QCard, { key: 1 }, {
        default: withCtx(() => [
          createVNode(QCardSection, { class: "q-pt-none" }, {
            default: withCtx(() => [
              createTextVNode(" No exception found ")
            ]),
            _: 1
          }),
          createVNode(QCardActions, { align: "right" }, {
            default: withCtx(() => [
              withDirectives(createVNode(QBtn, {
                flat: "",
                label: "Close",
                color: "primary"
              }, null, 512), [
                [ClosePopup]
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }));
    };
  }
});
var ExceptionView = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "ExceptionView.vue"]]);
const _hoisted_1 = {
  key: 0,
  class: "row"
};
const _hoisted_2 = { class: "col-12 q-py-md" };
const _hoisted_3 = {
  key: 1,
  class: "row"
};
const _hoisted_4 = { class: "col-12" };
const _hoisted_5 = { class: "row q-pa-md" };
const _hoisted_6 = { class: "col-12 text-right" };
const _hoisted_7 = { class: "row" };
const _hoisted_8 = { class: "col-12 q-py-md" };
const _hoisted_9 = { class: "row" };
const _hoisted_10 = { class: "col-12 q-py-md" };
const _hoisted_11 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Messages", -1);
const _hoisted_12 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Signals", -1);
const _hoisted_13 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Statuses", -1);
const _hoisted_14 = /* @__PURE__ */ createBaseVNode("div", null, null, -1);
const _hoisted_15 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Exception", -1);
const _hoisted_16 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RunShowPage",
  props: {
    jobStatusId: null
  },
  setup(__props) {
    const props = __props;
    dayjs.extend(localizedFormat);
    const results = ref(null);
    const tab = ref("timeline");
    const hasUnfinishedCancel = computed(() => {
      var _a;
      if (selectedRun.value === null) {
        return false;
      }
      return ((_a = selectedRun.value) == null ? void 0 : _a.signals.filter((signal) => signal.cancel_job && signal.handled_at === null).length) > 0;
    });
    useApi((after) => {
      api.runShow(props.jobStatusId).then((response) => {
        results.value = response;
      }).finally(after);
    });
    const cancelling = ref(false);
    function cancel() {
      cancelling.value = true;
      api.signal(props.jobStatusId, "cancel", true, {}).finally(() => cancelling.value = false);
    }
    const exceptions = computed(() => {
      var _a;
      let tempException = (_a = selectedRun.value) == null ? void 0 : _a.exception;
      let exs = [];
      while (tempException !== null && tempException !== void 0) {
        exs.push(tempException);
        tempException = tempException.previous;
      }
      return exs;
    });
    const retryId = ref(null);
    const selectedRun = computed(() => {
      var _a;
      let jobRun = results.value;
      while (jobRun !== null && jobRun.id.toString() !== ((_a = retryId.value) == null ? void 0 : _a.toString())) {
        jobRun = jobRun.parent;
      }
      return jobRun;
    });
    const runTime = computed(() => {
      var _a;
      if (selectedRun.value === null || selectedRun.value.started_at === null) {
        return 0;
      }
      if (selectedRun.value.finished_at === null) {
        return getDuration((_a = selectedRun.value) == null ? void 0 : _a.started_at, new Date(), false);
      }
      return getDuration(selectedRun.value.started_at, selectedRun.value.finished_at, true);
    });
    const queueTime = computed(() => {
      var _a, _b;
      if (selectedRun.value === null || selectedRun.value.created_at === null) {
        return 0;
      }
      if (selectedRun.value.started_at === null) {
        return getDuration((_a = selectedRun.value) == null ? void 0 : _a.created_at, new Date(), false);
      }
      return getDuration((_b = selectedRun.value) == null ? void 0 : _b.created_at, selectedRun.value.started_at, true);
    });
    function getDuration(startedAt, finishedAt = null, withDecimals = false) {
      if (finishedAt === null || finishedAt === void 0) {
        finishedAt = new Date();
      }
      return Math.round(dayjs(finishedAt).diff(startedAt, "seconds", withDecimals) * 10) / 10;
    }
    const retryOptions = computed(() => {
      let jobs = [];
      let jobRun = results.value;
      while (jobRun !== null) {
        jobs.push(jobRun);
        jobRun = jobRun.parent;
      }
      return jobs.reverse().map((job, index) => {
        return {
          label: "Run #" + (index + 1).toString(),
          value: job.id.toString()
        };
      });
    });
    function viewRun(runId) {
      retryId.value = runId;
    }
    viewRun(props.jobStatusId);
    return (_ctx, _cache) => {
      return unref(selectedRun) !== null ? (openBlock(), createBlock(QPage, {
        key: 0,
        class: "justify-evenly",
        padding: ""
      }, {
        default: withCtx(() => {
          var _a;
          return [
            createVNode(QBreadcrumbs, null, {
              default: withCtx(() => [
                createVNode(QBreadcrumbsEl, {
                  icon: "list",
                  to: "/jobs",
                  label: "Jobs"
                }),
                createVNode(QBreadcrumbsEl, {
                  label: unref(selectedRun).alias,
                  icon: "view_stream",
                  to: "/jobs/" + unref(selectedRun).alias
                }, null, 8, ["label", "to"]),
                createVNode(QBreadcrumbsEl, {
                  label: "Run #" + unref(selectedRun).id,
                  icon: "visibility",
                  to: "/run/" + unref(selectedRun).id
                }, null, 8, ["label", "to"])
              ]),
              _: 1
            }),
            unref(retryOptions).length > 1 ? (openBlock(), createElementBlock("div", _hoisted_1, [
              createBaseVNode("div", _hoisted_2, [
                createVNode(QBtnToggle, {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => viewRun($event)),
                  "model-value": (_a = unref(selectedRun)) == null ? void 0 : _a.id.toString(),
                  push: "",
                  spread: "",
                  "no-caps": "",
                  rounded: "",
                  unelevated: "",
                  glossy: "",
                  "toggle-color": "primary",
                  options: unref(retryOptions)
                }, null, 8, ["model-value", "options"])
              ])
            ])) : createCommentVNode("", true),
            (unref(selectedRun).status === "started" || unref(selectedRun).status === "queued") && unref(hasUnfinishedCancel) ? (openBlock(), createElementBlock("div", _hoisted_3, [
              createBaseVNode("div", _hoisted_4, [
                createVNode(QBanner, { class: "bg-warning text-black" }, {
                  default: withCtx(() => [
                    createTextVNode(" A cancel signal has been sent to this job, but the job has not yet handled it. ")
                  ]),
                  _: 1
                })
              ])
            ])) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_5, [
              createBaseVNode("div", _hoisted_6, [
                createVNode(QBtnGroup, { rounded: "" }, {
                  default: withCtx(() => [
                    unref(selectedRun).alias !== null ? (openBlock(), createBlock(QBtn, {
                      key: 0,
                      rounded: "",
                      push: "",
                      to: { path: "/jobs/" + unref(selectedRun).alias },
                      "icon-right": "arrow_back",
                      label: "Go to job"
                    }, null, 8, ["to"])) : createCommentVNode("", true),
                    unref(selectedRun).status === "started" || unref(selectedRun).status === "queued" ? (openBlock(), createBlock(QBtn, {
                      key: 1,
                      rounded: "",
                      disable: unref(hasUnfinishedCancel),
                      loading: cancelling.value,
                      push: "",
                      "icon-right": "cancel",
                      label: "Cancel",
                      onClick: cancel
                    }, null, 8, ["disable", "loading"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ])
            ]),
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("div", _hoisted_8, [
                createVNode(QList, {
                  bordered: "",
                  separator: ""
                }, {
                  default: withCtx(() => [
                    createVNode(QItem, null, {
                      default: withCtx(() => [
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(selectedRun).alias), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("Alias")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QItem, null, {
                      default: withCtx(() => [
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(selectedRun).class), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("Class")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QItem, null, {
                      default: withCtx(() => [
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(selectedRun).status), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("Status")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QItem, null, {
                      default: withCtx(() => [
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(selectedRun).uuid), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("Uuid")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QItem, null, {
                      default: withCtx(() => [
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(selectedRun).tags), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("Tags")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QItem, null, {
                      default: withCtx(() => [
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(selectedRun).percentage), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("Percentage")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QItem, null, {
                      default: withCtx(() => [
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            createVNode(QItemLabel, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(selectedRun).created_at), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("Dispatched At")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QItem, null, {
                      default: withCtx(() => [
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            unref(queueTime) === null ? (openBlock(), createBlock(QItemLabel, { key: 0 }, {
                              default: withCtx(() => [
                                createTextVNode("N/A")
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(QItemLabel, { key: 1 }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(queueTime)) + " s", 1)
                              ]),
                              _: 1
                            })),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("Queue time")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(QItem, null, {
                      default: withCtx(() => [
                        createVNode(QItemSection, null, {
                          default: withCtx(() => [
                            unref(runTime) === null ? (openBlock(), createBlock(QItemLabel, { key: 0 }, {
                              default: withCtx(() => [
                                createTextVNode("N/A")
                              ]),
                              _: 1
                            })) : (openBlock(), createBlock(QItemLabel, { key: 1 }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(runTime)) + " s", 1)
                              ]),
                              _: 1
                            })),
                            createVNode(QItemLabel, { caption: "" }, {
                              default: withCtx(() => [
                                createTextVNode("Runtime")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ]),
            createBaseVNode("div", _hoisted_9, [
              createBaseVNode("div", _hoisted_10, [
                createVNode(QCard, null, {
                  default: withCtx(() => [
                    createVNode(QTabs, {
                      modelValue: tab.value,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => tab.value = $event),
                      class: "text-teal"
                    }, {
                      default: withCtx(() => [
                        createVNode(QTab, {
                          name: "timeline",
                          icon: "timeline",
                          label: "Timeline"
                        }),
                        createVNode(QTab, {
                          name: "messages",
                          icon: "mail",
                          label: "Messages"
                        }),
                        createVNode(QTab, {
                          name: "signals",
                          icon: "connect_without_contact",
                          label: "Signals"
                        }),
                        createVNode(QTab, {
                          name: "statuses",
                          icon: "move_down",
                          label: "Status History"
                        }),
                        createVNode(QTab, {
                          name: "exception",
                          icon: "error",
                          label: "Exception"
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"]),
                    createVNode(QSeparator),
                    createVNode(QTabPanels, {
                      modelValue: tab.value,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => tab.value = $event),
                      animated: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(QTabPanel, { name: "timeline" }, {
                          default: withCtx(() => [
                            createVNode(JobRunTimeline, { run: unref(selectedRun) }, null, 8, ["run"])
                          ]),
                          _: 1
                        }),
                        createVNode(QTabPanel, { name: "messages" }, {
                          default: withCtx(() => [
                            _hoisted_11,
                            createVNode(QTimeline, { color: "secondary" }, {
                              default: withCtx(() => [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(selectedRun).messages, (message) => {
                                  return openBlock(), createBlock(QTimelineEntry, {
                                    key: message.id,
                                    title: message.type,
                                    subtitle: unref(dayjs)(message.created_at).format("L LTS")
                                  }, {
                                    default: withCtx(() => [
                                      createBaseVNode("div", null, toDisplayString(message.message), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["title", "subtitle"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(QTabPanel, { name: "signals" }, {
                          default: withCtx(() => [
                            _hoisted_12,
                            createVNode(QTimeline, { color: "secondary" }, {
                              default: withCtx(() => [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(selectedRun).signals, (signal) => {
                                  return openBlock(), createBlock(QTimelineEntry, {
                                    key: signal.id,
                                    title: signal.signal,
                                    subtitle: signal.cancel_job ? "Job stopped" : "Job continued"
                                  }, {
                                    default: withCtx(() => [
                                      createBaseVNode("div", null, [
                                        createVNode(QList, {
                                          bordered: "",
                                          separator: ""
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(QItem, null, {
                                              default: withCtx(() => [
                                                createVNode(QItemSection, null, {
                                                  default: withCtx(() => [
                                                    createVNode(QItemLabel, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(signal.parameters), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(QItemLabel, { caption: "" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Parameters")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(QItem, null, {
                                              default: withCtx(() => [
                                                createVNode(QItemSection, null, {
                                                  default: withCtx(() => [
                                                    createVNode(QItemLabel, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(unref(dayjs)(signal.created_at).format("L LTS")), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(QItemLabel, { caption: "" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Sent at")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(QItem, null, {
                                              default: withCtx(() => [
                                                createVNode(QItemSection, null, {
                                                  default: withCtx(() => [
                                                    createVNode(QItemLabel, null, {
                                                      default: withCtx(() => [
                                                        createTextVNode(toDisplayString(unref(dayjs)(signal.handled_at).format("L LTS")), 1)
                                                      ]),
                                                      _: 2
                                                    }, 1024),
                                                    createVNode(QItemLabel, { caption: "" }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("Handled at")
                                                      ]),
                                                      _: 1
                                                    })
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["title", "subtitle"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(QTabPanel, { name: "statuses" }, {
                          default: withCtx(() => [
                            _hoisted_13,
                            createVNode(QTimeline, { color: "secondary" }, {
                              default: withCtx(() => [
                                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(selectedRun).statuses, (status) => {
                                  return openBlock(), createBlock(QTimelineEntry, {
                                    key: status.id,
                                    title: status.status,
                                    subtitle: unref(dayjs)(status.created_at).format("L LTS")
                                  }, {
                                    default: withCtx(() => [
                                      _hoisted_14
                                    ]),
                                    _: 2
                                  }, 1032, ["title", "subtitle"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(QTabPanel, { name: "exception" }, {
                          default: withCtx(() => [
                            _hoisted_15,
                            !unref(selectedRun).exception ? (openBlock(), createElementBlock("div", _hoisted_16, "No exceptions were detected in this job")) : (openBlock(), createBlock(ExceptionView, {
                              key: 1,
                              exceptions: unref(exceptions)
                            }, null, 8, ["exceptions"]))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["modelValue"])
                  ]),
                  _: 1
                })
              ])
            ])
          ];
        }),
        _: 1
      })) : (openBlock(), createBlock(QPage, {
        key: 1,
        class: "items-center justify-evenly"
      }, {
        default: withCtx(() => [
          createTextVNode(" Loading ")
        ]),
        _: 1
      }));
    };
  }
});
var RunShowPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "RunShowPage.vue"]]);
export { RunShowPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuU2hvd1BhZ2UuYTBlZWMzMzEuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2J0bi1ncm91cC9RQnRuR3JvdXAuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZm9ybS5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2J0bi10b2dnbGUvUUJ0blRvZ2dsZS5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy91aWQuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWJzL3VzZS10YWIuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90YWJzL1FUYWIuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdGljay5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL3J0bC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYnMvUVRhYnMuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvZGlyZWN0aXZlcy9Ub3VjaFN3aXBlLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWNhY2hlLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXBhbmVsLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFiLXBhbmVscy9RVGFiUGFuZWwuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy90aW1lbGluZS9RVGltZWxpbmVFbnRyeS5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RpbWVsaW5lL1FUaW1lbGluZS5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYi1wYW5lbHMvUVRhYlBhbmVscy5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NhcmQvUUNhcmQuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9sb2NhbGl6ZWRGb3JtYXQuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jaGF0L1FDaGF0TWVzc2FnZS5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL2R1cmF0aW9uLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9jb21wb25lbnRzL0pvYlJ1blRpbWVsaW5lLnZ1ZSIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NwYWNlL1FTcGFjZS5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NhcmQvUUNhcmRBY3Rpb25zLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2FyZC9RQ2FyZFNlY3Rpb24uanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS9wb3J0YWwuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvZGlyZWN0aXZlcy9DbG9zZVBvcHVwLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9jb21wb25lbnRzL0V4Y2VwdGlvblZpZXcudnVlIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9SdW5TaG93UGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCdG5Hcm91cCcsXG5cbiAgcHJvcHM6IHtcbiAgICB1bmVsZXZhdGVkOiBCb29sZWFuLFxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgZmxhdDogQm9vbGVhbixcbiAgICByb3VuZGVkOiBCb29sZWFuLFxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICBwdXNoOiBCb29sZWFuLFxuICAgIHN0cmV0Y2g6IEJvb2xlYW4sXG4gICAgZ2xvc3N5OiBCb29sZWFuLFxuICAgIHNwcmVhZDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGNscyA9IFsgJ3VuZWxldmF0ZWQnLCAnb3V0bGluZScsICdmbGF0JywgJ3JvdW5kZWQnLCAnc3F1YXJlJywgJ3B1c2gnLCAnc3RyZXRjaCcsICdnbG9zc3knIF1cbiAgICAgICAgLmZpbHRlcih0ID0+IHByb3BzWyB0IF0gPT09IHRydWUpXG4gICAgICAgIC5tYXAodCA9PiBgcS1idG4tZ3JvdXAtLSR7IHQgfWApLmpvaW4oJyAnKVxuXG4gICAgICByZXR1cm4gYHEtYnRuLWdyb3VwIHJvdyBuby13cmFwJHsgY2xzLmxlbmd0aCA+IDAgPyAnICcgKyBjbHMgOiAnJyB9YFxuICAgICAgICArIChwcm9wcy5zcHJlYWQgPT09IHRydWUgPyAnIHEtYnRuLWdyb3VwLS1zcHJlYWQnIDogJyBpbmxpbmUnKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5leHBvcnQgY29uc3QgdXNlRm9ybVByb3BzID0ge1xuICBuYW1lOiBTdHJpbmdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvcm1BdHRycyAocHJvcHMpIHtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+ICh7XG4gICAgdHlwZTogJ2hpZGRlbicsXG4gICAgbmFtZTogcHJvcHMubmFtZSxcbiAgICB2YWx1ZTogcHJvcHMubW9kZWxWYWx1ZVxuICB9KSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZvcm1JbmplY3QgKGZvcm1BdHRycyA9IHt9KSB7XG4gIHJldHVybiAoY2hpbGQsIGFjdGlvbiwgY2xhc3NOYW1lKSA9PiB7XG4gICAgY2hpbGRbIGFjdGlvbiBdKFxuICAgICAgaCgnaW5wdXQnLCB7XG4gICAgICAgIGNsYXNzOiAnaGlkZGVuJyArIChjbGFzc05hbWUgfHwgJycpLFxuICAgICAgICAuLi5mb3JtQXR0cnMudmFsdWVcbiAgICAgIH0pXG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VGb3JtSW5wdXROYW1lQXR0ciAocHJvcHMpIHtcbiAgcmV0dXJuIGNvbXB1dGVkKCgpID0+IHByb3BzLm5hbWUgfHwgcHJvcHMuZm9yKVxufVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRQnRuIGZyb20gJy4uL2J0bi9RQnRuLmpzJ1xuaW1wb3J0IFFCdG5Hcm91cCBmcm9tICcuLi9idG4tZ3JvdXAvUUJ0bkdyb3VwLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IHVzZUZvcm1JbmplY3QsIHVzZUZvcm1Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWZvcm0uanMnXG5cbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGdldEJ0bkRlc2lnbkF0dHIgfSBmcm9tICcuLi9idG4vdXNlLWJ0bi5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCdG5Ub2dnbGUnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRm9ybVByb3BzLFxuXG4gICAgbW9kZWxWYWx1ZToge1xuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuXG4gICAgb3B0aW9uczoge1xuICAgICAgdHlwZTogQXJyYXksXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiB2LmV2ZXJ5KFxuICAgICAgICBvcHQgPT4gKCdsYWJlbCcgaW4gb3B0IHx8ICdpY29uJyBpbiBvcHQgfHwgJ3Nsb3QnIGluIG9wdCkgJiYgJ3ZhbHVlJyBpbiBvcHRcbiAgICAgIClcbiAgICB9LFxuXG4gICAgLy8gVG8gYXZvaWQgc2VlaW5nIHRoZSBhY3RpdmUgcmFpc2Ugc2hhZG93IHRocm91Z2hcbiAgICAvLyB0aGUgdHJhbnNwYXJlbnQgYnV0dG9uLCBnaXZlIGl0IGEgY29sb3IgKGV2ZW4gd2hpdGUpXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcbiAgICB0b2dnbGVDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknXG4gICAgfSxcbiAgICB0b2dnbGVUZXh0Q29sb3I6IFN0cmluZyxcblxuICAgIG91dGxpbmU6IEJvb2xlYW4sXG4gICAgZmxhdDogQm9vbGVhbixcbiAgICB1bmVsZXZhdGVkOiBCb29sZWFuLFxuICAgIHJvdW5kZWQ6IEJvb2xlYW4sXG4gICAgcHVzaDogQm9vbGVhbixcbiAgICBnbG9zc3k6IEJvb2xlYW4sXG5cbiAgICBzaXplOiBTdHJpbmcsXG4gICAgcGFkZGluZzogU3RyaW5nLFxuXG4gICAgbm9DYXBzOiBCb29sZWFuLFxuICAgIG5vV3JhcDogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICByZWFkb25seTogQm9vbGVhbixcbiAgICBkaXNhYmxlOiBCb29sZWFuLFxuXG4gICAgc3RhY2s6IEJvb2xlYW4sXG4gICAgc3RyZXRjaDogQm9vbGVhbixcblxuICAgIHNwcmVhZDogQm9vbGVhbixcblxuICAgIGNsZWFyYWJsZTogQm9vbGVhbixcblxuICAgIHJpcHBsZToge1xuICAgICAgdHlwZTogWyBCb29sZWFuLCBPYmplY3QgXSxcbiAgICAgIGRlZmF1bHQ6IHRydWVcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ3VwZGF0ZTptb2RlbFZhbHVlJywgJ2NsZWFyJywgJ2NsaWNrJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgaGFzQWN0aXZlVmFsdWUgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3B0aW9ucy5maW5kKG9wdCA9PiBvcHQudmFsdWUgPT09IHByb3BzLm1vZGVsVmFsdWUpICE9PSB2b2lkIDBcbiAgICApXG5cbiAgICBjb25zdCBmb3JtQXR0cnMgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgICAgdmFsdWU6IHByb3BzLm1vZGVsVmFsdWVcbiAgICB9KSlcblxuICAgIGNvbnN0IGluamVjdEZvcm1JbnB1dCA9IHVzZUZvcm1JbmplY3QoZm9ybUF0dHJzKVxuXG4gICAgY29uc3QgYnRuRGVzaWduQXR0ciA9IGNvbXB1dGVkKCgpID0+IGdldEJ0bkRlc2lnbkF0dHIocHJvcHMpKVxuXG4gICAgY29uc3QgYnRuT3B0aW9uRGVzaWduID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIHJvdW5kZWQ6IHByb3BzLnJvdW5kZWQsXG4gICAgICBkZW5zZTogcHJvcHMuZGVuc2UsXG4gICAgICAuLi5idG5EZXNpZ25BdHRyLnZhbHVlXG4gICAgfSkpXG5cbiAgICBjb25zdCBidG5PcHRpb25zID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMub3B0aW9ucy5tYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgIGNvbnN0IHsgYXR0cnMsIHZhbHVlLCBzbG90LCAuLi5vcHQgfSA9IGl0ZW1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc2xvdCxcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICBrZXk6IGksXG5cbiAgICAgICAgICAnYXJpYS1wcmVzc2VkJzogdmFsdWUgPT09IHByb3BzLm1vZGVsVmFsdWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgICAgIC4uLmF0dHJzLFxuICAgICAgICAgIC4uLm9wdCxcbiAgICAgICAgICAuLi5idG5PcHRpb25EZXNpZ24udmFsdWUsXG5cbiAgICAgICAgICBkaXNhYmxlOiBwcm9wcy5kaXNhYmxlID09PSB0cnVlIHx8IG9wdC5kaXNhYmxlID09PSB0cnVlLFxuXG4gICAgICAgICAgLy8gT3B0aW9ucyB0aGF0IGNvbWUgZnJvbSB0aGUgYnV0dG9uIHNwZWNpZmljIG9wdGlvbnMgZmlyc3QsIHRoZW4gZnJvbSBnZW5lcmFsIHByb3BzXG4gICAgICAgICAgY29sb3I6IHZhbHVlID09PSBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICAgICAgICA/IG1lcmdlT3B0KG9wdCwgJ3RvZ2dsZUNvbG9yJylcbiAgICAgICAgICAgIDogbWVyZ2VPcHQob3B0LCAnY29sb3InKSxcbiAgICAgICAgICB0ZXh0Q29sb3I6IHZhbHVlID09PSBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICAgICAgICA/IG1lcmdlT3B0KG9wdCwgJ3RvZ2dsZVRleHRDb2xvcicpXG4gICAgICAgICAgICA6IG1lcmdlT3B0KG9wdCwgJ3RleHRDb2xvcicpLFxuICAgICAgICAgIG5vQ2FwczogbWVyZ2VPcHQob3B0LCAnbm9DYXBzJykgPT09IHRydWUsXG4gICAgICAgICAgbm9XcmFwOiBtZXJnZU9wdChvcHQsICdub1dyYXAnKSA9PT0gdHJ1ZSxcblxuICAgICAgICAgIHNpemU6IG1lcmdlT3B0KG9wdCwgJ3NpemUnKSxcbiAgICAgICAgICBwYWRkaW5nOiBtZXJnZU9wdChvcHQsICdwYWRkaW5nJyksXG4gICAgICAgICAgcmlwcGxlOiBtZXJnZU9wdChvcHQsICdyaXBwbGUnKSxcbiAgICAgICAgICBzdGFjazogbWVyZ2VPcHQob3B0LCAnc3RhY2snKSA9PT0gdHJ1ZSxcbiAgICAgICAgICBzdHJldGNoOiBtZXJnZU9wdChvcHQsICdzdHJldGNoJykgPT09IHRydWUsXG5cbiAgICAgICAgICBvbkNsaWNrIChlKSB7IHNldCh2YWx1ZSwgaXRlbSwgZSkgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkpXG5cbiAgICBmdW5jdGlvbiBzZXQgKHZhbHVlLCBvcHQsIGUpIHtcbiAgICAgIGlmIChwcm9wcy5yZWFkb25seSAhPT0gdHJ1ZSkge1xuICAgICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICBpZiAocHJvcHMuY2xlYXJhYmxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG51bGwsIG51bGwpXG4gICAgICAgICAgICBlbWl0KCdjbGVhcicpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdmFsdWUsIG9wdClcbiAgICAgICAgfVxuXG4gICAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJnZU9wdCAob3B0LCBrZXkpIHtcbiAgICAgIHJldHVybiBvcHRbIGtleSBdID09PSB2b2lkIDAgPyBwcm9wc1sga2V5IF0gOiBvcHRbIGtleSBdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgICBjb25zdCBjaGlsZCA9IGJ0bk9wdGlvbnMudmFsdWUubWFwKG9wdCA9PiB7XG4gICAgICAgIHJldHVybiBoKFFCdG4sIG9wdC5wcm9wcywgb3B0LnNsb3QgIT09IHZvaWQgMCA/IHNsb3RzWyBvcHQuc2xvdCBdIDogdm9pZCAwKVxuICAgICAgfSlcblxuICAgICAgaWYgKHByb3BzLm5hbWUgIT09IHZvaWQgMCAmJiBwcm9wcy5kaXNhYmxlICE9PSB0cnVlICYmIGhhc0FjdGl2ZVZhbHVlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGluamVjdEZvcm1JbnB1dChjaGlsZCwgJ3B1c2gnKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBjaGlsZClcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4gaChRQnRuR3JvdXAsIHtcbiAgICAgIGNsYXNzOiAncS1idG4tdG9nZ2xlJyxcbiAgICAgIC4uLmJ0bkRlc2lnbkF0dHIudmFsdWUsXG4gICAgICByb3VuZGVkOiBwcm9wcy5yb3VuZGVkLFxuICAgICAgc3RyZXRjaDogcHJvcHMuc3RyZXRjaCxcbiAgICAgIGdsb3NzeTogcHJvcHMuZ2xvc3N5LFxuICAgICAgc3ByZWFkOiBwcm9wcy5zcHJlYWRcbiAgICB9LCBnZXRDb250ZW50KVxuICB9XG59KVxuIiwiLyoqXG4gKiBCYXNlZCBvbiB0aGUgd29yayBvZiBodHRwczovL2dpdGh1Yi5jb20vamNob29rL3V1aWQtcmFuZG9tXG4gKi9cblxubGV0XG4gIGJ1ZixcbiAgYnVmSWR4ID0gMFxuY29uc3QgaGV4Qnl0ZXMgPSBuZXcgQXJyYXkoMjU2KVxuXG4vLyBQcmUtY2FsY3VsYXRlIHRvU3RyaW5nKDE2KSBmb3Igc3BlZWRcbmZvciAobGV0IGkgPSAwOyBpIDwgMjU2OyBpKyspIHtcbiAgaGV4Qnl0ZXNbIGkgXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSlcbn1cblxuLy8gVXNlIGJlc3QgYXZhaWxhYmxlIFBSTkdcbmNvbnN0IHJhbmRvbUJ5dGVzID0gKCgpID0+IHtcbiAgLy8gTm9kZSAmIEJyb3dzZXIgc3VwcG9ydFxuICBjb25zdCBsaWIgPSB0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJ1xuICAgID8gY3J5cHRvXG4gICAgOiAoXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgPyB3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0b1xuICAgICAgICAgIDogdm9pZCAwXG4gICAgICApXG5cbiAgaWYgKGxpYiAhPT0gdm9pZCAwKSB7XG4gICAgaWYgKGxpYi5yYW5kb21CeXRlcyAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gbGliLnJhbmRvbUJ5dGVzXG4gICAgfVxuICAgIGlmIChsaWIuZ2V0UmFuZG9tVmFsdWVzICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiBuID0+IHtcbiAgICAgICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShuKVxuICAgICAgICBsaWIuZ2V0UmFuZG9tVmFsdWVzKGJ5dGVzKVxuICAgICAgICByZXR1cm4gYnl0ZXNcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbiA9PiB7XG4gICAgY29uc3QgciA9IFtdXG4gICAgZm9yIChsZXQgaSA9IG47IGkgPiAwOyBpLS0pIHtcbiAgICAgIHIucHVzaChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTYpKVxuICAgIH1cbiAgICByZXR1cm4gclxuICB9XG59KSgpXG5cbi8vIEJ1ZmZlciByYW5kb20gbnVtYmVycyBmb3Igc3BlZWRcbi8vIFJlZHVjZSBtZW1vcnkgdXNhZ2UgYnkgZGVjcmVhc2luZyB0aGlzIG51bWJlciAobWluIDE2KVxuLy8gb3IgaW1wcm92ZSBzcGVlZCBieSBpbmNyZWFzaW5nIHRoaXMgbnVtYmVyICh0cnkgMTYzODQpXG5jb25zdCBCVUZGRVJfU0laRSA9IDQwOTZcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICAvLyBCdWZmZXIgc29tZSByYW5kb20gYnl0ZXMgZm9yIHNwZWVkXG4gIGlmIChidWYgPT09IHZvaWQgMCB8fCAoYnVmSWR4ICsgMTYgPiBCVUZGRVJfU0laRSkpIHtcbiAgICBidWZJZHggPSAwXG4gICAgYnVmID0gcmFuZG9tQnl0ZXMoQlVGRkVSX1NJWkUpXG4gIH1cblxuICBjb25zdCBiID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYnVmLCBidWZJZHgsIChidWZJZHggKz0gMTYpKVxuICBiWyA2IF0gPSAoYlsgNiBdICYgMHgwZikgfCAweDQwXG4gIGJbIDggXSA9IChiWyA4IF0gJiAweDNmKSB8IDB4ODBcblxuICByZXR1cm4gaGV4Qnl0ZXNbIGJbIDAgXSBdICsgaGV4Qnl0ZXNbIGJbIDEgXSBdXG4gICAgKyBoZXhCeXRlc1sgYlsgMiBdIF0gKyBoZXhCeXRlc1sgYlsgMyBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyA0IF0gXSArIGhleEJ5dGVzWyBiWyA1IF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDYgXSBdICsgaGV4Qnl0ZXNbIGJbIDcgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgOCBdIF0gKyBoZXhCeXRlc1sgYlsgOSBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyAxMCBdIF0gKyBoZXhCeXRlc1sgYlsgMTEgXSBdXG4gICAgKyBoZXhCeXRlc1sgYlsgMTIgXSBdICsgaGV4Qnl0ZXNbIGJbIDEzIF0gXVxuICAgICsgaGV4Qnl0ZXNbIGJbIDE0IF0gXSArIGhleEJ5dGVzWyBiWyAxNSBdIF1cbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIGluamVjdCwgb25CZWZvcmVVbm1vdW50LCBvbk1vdW50ZWQsIHdpdGhEaXJlY3RpdmVzLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgUmlwcGxlIGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvUmlwcGxlLmpzJ1xuXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBpc0tleUNvZGUsIHNob3VsZElnbm9yZUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUva2V5LWNvbXBvc2l0aW9uLmpzJ1xuaW1wb3J0IHsgdGFic0tleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcbmltcG9ydCB7IHN0b3BBbmRQcmV2ZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvZXZlbnQuanMnXG5pbXBvcnQgdWlkIGZyb20gJy4uLy4uL3V0aWxzL3VpZC5qcydcbmltcG9ydCB7IGlzRGVlcEVxdWFsIH0gZnJvbSAnLi4vLi4vdXRpbHMvaXMuanMnXG5cbmxldCBpZCA9IDBcblxuZXhwb3J0IGNvbnN0IHVzZVRhYkVtaXRzID0gWyAnY2xpY2snLCAna2V5ZG93bicgXVxuXG5leHBvcnQgY29uc3QgdXNlVGFiUHJvcHMgPSB7XG4gIGljb246IFN0cmluZyxcbiAgbGFiZWw6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICBhbGVydDogWyBCb29sZWFuLCBTdHJpbmcgXSxcbiAgYWxlcnRJY29uOiBTdHJpbmcsXG5cbiAgbmFtZToge1xuICAgIHR5cGU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcbiAgICBkZWZhdWx0OiAoKSA9PiBgdF8keyBpZCsrIH1gXG4gIH0sXG5cbiAgbm9DYXBzOiBCb29sZWFuLFxuXG4gIHRhYmluZGV4OiBbIFN0cmluZywgTnVtYmVyIF0sXG4gIGRpc2FibGU6IEJvb2xlYW4sXG5cbiAgY29udGVudENsYXNzOiBTdHJpbmcsXG5cbiAgcmlwcGxlOiB7XG4gICAgdHlwZTogWyBCb29sZWFuLCBPYmplY3QgXSxcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHByb3BzLCBzbG90cywgZW1pdCwgcm91dGVEYXRhKSB7XG4gIGNvbnN0ICR0YWJzID0gaW5qZWN0KHRhYnNLZXksIGVtcHR5UmVuZGVyRm4pXG4gIGlmICgkdGFicyA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1FUYWIvUVJvdXRlVGFiIGNvbXBvbmVudCBuZWVkcyB0byBiZSBjaGlsZCBvZiBRVGFicycpXG4gICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgfVxuXG4gIGNvbnN0IHsgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgY29uc3QgYmx1clRhcmdldFJlZiA9IHJlZihudWxsKVxuICBjb25zdCByb290UmVmID0gcmVmKG51bGwpXG4gIGNvbnN0IHRhYkluZGljYXRvclJlZiA9IHJlZihudWxsKVxuXG4gIGNvbnN0IHJpcHBsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlIHx8IHByb3BzLnJpcHBsZSA9PT0gZmFsc2VcbiAgICAgID8gZmFsc2VcbiAgICAgIDogT2JqZWN0LmFzc2lnbihcbiAgICAgICAgeyBrZXlDb2RlczogWyAxMywgMzIgXSwgZWFybHk6IHRydWUgfSxcbiAgICAgICAgcHJvcHMucmlwcGxlID09PSB0cnVlID8ge30gOiBwcm9wcy5yaXBwbGVcbiAgICAgIClcbiAgKSlcblxuICBjb25zdCBpc0FjdGl2ZSA9IGNvbXB1dGVkKCgpID0+ICR0YWJzLmN1cnJlbnRNb2RlbC52YWx1ZSA9PT0gcHJvcHMubmFtZSlcblxuICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAncS10YWIgcmVsYXRpdmUtcG9zaXRpb24gc2VsZi1zdHJldGNoIGZsZXggZmxleC1jZW50ZXIgdGV4dC1jZW50ZXInXG4gICAgKyAoXG4gICAgICBpc0FjdGl2ZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IChcbiAgICAgICAgICAgICcgcS10YWItLWFjdGl2ZSdcbiAgICAgICAgICAgICsgKCR0YWJzLnRhYlByb3BzLnZhbHVlLmFjdGl2ZUNsYXNzID8gJyAnICsgJHRhYnMudGFiUHJvcHMudmFsdWUuYWN0aXZlQ2xhc3MgOiAnJylcbiAgICAgICAgICAgICsgKCR0YWJzLnRhYlByb3BzLnZhbHVlLmFjdGl2ZUNvbG9yID8gYCB0ZXh0LSR7ICR0YWJzLnRhYlByb3BzLnZhbHVlLmFjdGl2ZUNvbG9yIH1gIDogJycpXG4gICAgICAgICAgICArICgkdGFicy50YWJQcm9wcy52YWx1ZS5hY3RpdmVCZ0NvbG9yID8gYCBiZy0keyAkdGFicy50YWJQcm9wcy52YWx1ZS5hY3RpdmVCZ0NvbG9yIH1gIDogJycpXG4gICAgICAgICAgKVxuICAgICAgICA6ICcgcS10YWItLWluYWN0aXZlJ1xuICAgIClcbiAgICArIChwcm9wcy5pY29uICYmIHByb3BzLmxhYmVsICYmICR0YWJzLnRhYlByb3BzLnZhbHVlLmlubGluZUxhYmVsID09PSBmYWxzZSA/ICcgcS10YWItLWZ1bGwnIDogJycpXG4gICAgKyAocHJvcHMubm9DYXBzID09PSB0cnVlIHx8ICR0YWJzLnRhYlByb3BzLnZhbHVlLm5vQ2FwcyA9PT0gdHJ1ZSA/ICcgcS10YWItLW5vLWNhcHMnIDogJycpXG4gICAgKyAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICcgZGlzYWJsZWQnIDogJyBxLWZvY3VzYWJsZSBxLWhvdmVyYWJsZSBjdXJzb3ItcG9pbnRlcicpXG4gICAgKyAocm91dGVEYXRhICE9PSB2b2lkIDAgPyByb3V0ZURhdGEubGlua0NsYXNzLnZhbHVlIDogJycpXG4gIClcblxuICBjb25zdCBpbm5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAncS10YWJfX2NvbnRlbnQgc2VsZi1zdHJldGNoIGZsZXgtY2VudGVyIHJlbGF0aXZlLXBvc2l0aW9uIHEtYW5jaG9yLS1za2lwIG5vbi1zZWxlY3RhYmxlICdcbiAgICArICgkdGFicy50YWJQcm9wcy52YWx1ZS5pbmxpbmVMYWJlbCA9PT0gdHJ1ZSA/ICdyb3cgbm8td3JhcCBxLXRhYl9fY29udGVudC0taW5saW5lJyA6ICdjb2x1bW4nKVxuICAgICsgKHByb3BzLmNvbnRlbnRDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBwcm9wcy5jb250ZW50Q2xhc3MgfWAgOiAnJylcbiAgKVxuXG4gIGNvbnN0IHRhYkluZGV4ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgIChcbiAgICAgIHByb3BzLmRpc2FibGUgPT09IHRydWVcbiAgICAgIHx8ICR0YWJzLmhhc0ZvY3VzLnZhbHVlID09PSB0cnVlXG4gICAgICB8fCAoaXNBY3RpdmUudmFsdWUgPT09IGZhbHNlICYmICR0YWJzLmhhc0FjdGl2ZVRhYi52YWx1ZSA9PT0gdHJ1ZSlcbiAgICApXG4gICAgICA/IC0xXG4gICAgICA6IHByb3BzLnRhYmluZGV4IHx8IDBcbiAgKSlcblxuICBmdW5jdGlvbiBvbkNsaWNrIChlLCBrZXlib2FyZCkge1xuICAgIGlmIChrZXlib2FyZCAhPT0gdHJ1ZSAmJiBibHVyVGFyZ2V0UmVmLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBibHVyVGFyZ2V0UmVmLnZhbHVlLmZvY3VzKClcbiAgICB9XG5cbiAgICBpZiAocHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgLy8gd2Ugc2hvdWxkIGhpbmRlciBuYXRpdmUgbmF2aWdhdGlvbiB0aG91Z2hcbiAgICAgIGlmIChyb3V0ZURhdGEgIT09IHZvaWQgMCAmJiByb3V0ZURhdGEuaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBzdG9wQW5kUHJldmVudChlKVxuICAgICAgfVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gZG8gd2UgaGF2ZSBhIFFUYWI/XG4gICAgaWYgKHJvdXRlRGF0YSA9PT0gdm9pZCAwKSB7XG4gICAgICAkdGFicy51cGRhdGVNb2RlbCh7IG5hbWU6IHByb3BzLm5hbWUgfSlcbiAgICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChyb3V0ZURhdGEuaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3QgZ28gPSAob3B0cyA9IHt9KSA9PiB7XG4gICAgICAgIC8vIGlmIHJlcXVpcmluZyB0byBnbyB0byBhbm90aGVyIHJvdXRlLCB0aGVuIHdlXG4gICAgICAgIC8vIGxldCB0aGUgUVRhYnMgcm91dGUgd2F0Y2hlciBkbyBpdHMgam9iLFxuICAgICAgICAvLyBvdGhlcndpc2UgZGlyZWN0bHkgc2VsZWN0IHRoaXNcbiAgICAgICAgbGV0IGhhcmRFcnJvclxuICAgICAgICBjb25zdCByZXFJZCA9IG9wdHMudG8gPT09IHZvaWQgMCB8fCBpc0RlZXBFcXVhbChvcHRzLnRvLCBwcm9wcy50bykgPT09IHRydWVcbiAgICAgICAgICA/ICgkdGFicy5hdm9pZFJvdXRlV2F0Y2hlciA9IHVpZCgpKVxuICAgICAgICAgIDogbnVsbFxuXG4gICAgICAgIHJldHVybiByb3V0ZURhdGEubmF2aWdhdGVUb1JvdXRlckxpbmsoZSwgeyAuLi5vcHRzLCByZXR1cm5Sb3V0ZXJFcnJvcjogdHJ1ZSB9KVxuICAgICAgICAgIC5jYXRjaChlcnIgPT4geyBoYXJkRXJyb3IgPSBlcnIgfSlcbiAgICAgICAgICAudGhlbihzb2Z0RXJyb3IgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcUlkID09PSAkdGFicy5hdm9pZFJvdXRlV2F0Y2hlcikge1xuICAgICAgICAgICAgICAkdGFicy5hdm9pZFJvdXRlV2F0Y2hlciA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgLy8gaWYgd2UgZG9uJ3QgaGF2ZSBhbnkgaGFyZCBlcnJvcnMgb3IgYW55IHNvZnQgZXJyb3JzLCBleGNlcHQgZm9yXG4gICAgICAgICAgICAgIC8vIHdoZW4gbmF2aWdhdGluZyB0byB0aGUgc2FtZSByb3V0ZSAob24gYWxsIG90aGVyIHNvZnQgZXJyb3JzLFxuICAgICAgICAgICAgICAvLyBsaWtlIHdoZW4gbmF2aWdhdGlvbiB3YXMgYWJvcnRlZCBpbiBhIG5hdiBndWFyZCwgd2UgZG9uJ3QgYWN0aXZhdGUgdGhpcyB0YWIpXG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBoYXJkRXJyb3IgPT09IHZvaWQgMCAmJiAoXG4gICAgICAgICAgICAgICAgICBzb2Z0RXJyb3IgPT09IHZvaWQgMFxuICAgICAgICAgICAgICAgICAgfHwgc29mdEVycm9yLm1lc3NhZ2Uuc3RhcnRzV2l0aCgnQXZvaWRlZCByZWR1bmRhbnQgbmF2aWdhdGlvbicpID09PSB0cnVlXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAkdGFicy51cGRhdGVNb2RlbCh7IG5hbWU6IHByb3BzLm5hbWUgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAob3B0cy5yZXR1cm5Sb3V0ZXJFcnJvciA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gaGFyZEVycm9yICE9PSB2b2lkIDAgPyBQcm9taXNlLnJlamVjdChoYXJkRXJyb3IpIDogc29mdEVycm9yXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgZW1pdCgnY2xpY2snLCBlLCBnbylcbiAgICAgIGUuZGVmYXVsdFByZXZlbnRlZCAhPT0gdHJ1ZSAmJiBnbygpXG5cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGVtaXQoJ2NsaWNrJywgZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uS2V5ZG93biAoZSkge1xuICAgIGlmIChpc0tleUNvZGUoZSwgWyAxMywgMzIgXSkpIHtcbiAgICAgIG9uQ2xpY2soZSwgdHJ1ZSlcbiAgICB9XG4gICAgZWxzZSBpZiAoXG4gICAgICBzaG91bGRJZ25vcmVLZXkoZSkgIT09IHRydWVcbiAgICAgICYmIGUua2V5Q29kZSA+PSAzNVxuICAgICAgJiYgZS5rZXlDb2RlIDw9IDQwXG4gICAgICAmJiBlLmFsdEtleSAhPT0gdHJ1ZVxuICAgICAgJiYgZS5tZXRhS2V5ICE9PSB0cnVlXG4gICAgKSB7XG4gICAgICAkdGFicy5vbktiZE5hdmlnYXRlKGUua2V5Q29kZSwgcHJveHkuJGVsKSA9PT0gdHJ1ZSAmJiBzdG9wQW5kUHJldmVudChlKVxuICAgIH1cblxuICAgIGVtaXQoJ2tleWRvd24nLCBlKVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q29udGVudCAoKSB7XG4gICAgY29uc3RcbiAgICAgIG5hcnJvdyA9ICR0YWJzLnRhYlByb3BzLnZhbHVlLm5hcnJvd0luZGljYXRvcixcbiAgICAgIGNvbnRlbnQgPSBbXSxcbiAgICAgIGluZGljYXRvciA9IGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiB0YWJJbmRpY2F0b3JSZWYsXG4gICAgICAgIGNsYXNzOiBbXG4gICAgICAgICAgJ3EtdGFiX19pbmRpY2F0b3InLFxuICAgICAgICAgICR0YWJzLnRhYlByb3BzLnZhbHVlLmluZGljYXRvckNsYXNzXG4gICAgICAgIF1cbiAgICAgIH0pXG5cbiAgICBwcm9wcy5pY29uICE9PSB2b2lkIDAgJiYgY29udGVudC5wdXNoKFxuICAgICAgaChRSWNvbiwge1xuICAgICAgICBjbGFzczogJ3EtdGFiX19pY29uJyxcbiAgICAgICAgbmFtZTogcHJvcHMuaWNvblxuICAgICAgfSlcbiAgICApXG5cbiAgICBwcm9wcy5sYWJlbCAhPT0gdm9pZCAwICYmIGNvbnRlbnQucHVzaChcbiAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRhYl9fbGFiZWwnIH0sIHByb3BzLmxhYmVsKVxuICAgIClcblxuICAgIHByb3BzLmFsZXJ0ICE9PSBmYWxzZSAmJiBjb250ZW50LnB1c2goXG4gICAgICBwcm9wcy5hbGVydEljb24gIT09IHZvaWQgMFxuICAgICAgICA/IGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtdGFiX19hbGVydC1pY29uJyxcbiAgICAgICAgICBjb2xvcjogcHJvcHMuYWxlcnQgIT09IHRydWVcbiAgICAgICAgICAgID8gcHJvcHMuYWxlcnRcbiAgICAgICAgICAgIDogdm9pZCAwLFxuICAgICAgICAgIG5hbWU6IHByb3BzLmFsZXJ0SWNvblxuICAgICAgICB9KVxuICAgICAgICA6IGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtdGFiX19hbGVydCdcbiAgICAgICAgICAgICsgKHByb3BzLmFsZXJ0ICE9PSB0cnVlID8gYCB0ZXh0LSR7IHByb3BzLmFsZXJ0IH1gIDogJycpXG4gICAgICAgIH0pXG4gICAgKVxuXG4gICAgbmFycm93ID09PSB0cnVlICYmIGNvbnRlbnQucHVzaChpbmRpY2F0b3IpXG5cbiAgICBjb25zdCBub2RlID0gW1xuICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtZm9jdXMtaGVscGVyJywgdGFiaW5kZXg6IC0xLCByZWY6IGJsdXJUYXJnZXRSZWYgfSksXG4gICAgICBoKCdkaXYnLCB7IGNsYXNzOiBpbm5lckNsYXNzLnZhbHVlIH0sIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgY29udGVudCkpXG4gICAgXVxuXG4gICAgbmFycm93ID09PSBmYWxzZSAmJiBub2RlLnB1c2goaW5kaWNhdG9yKVxuXG4gICAgcmV0dXJuIG5vZGVcbiAgfVxuXG4gIGNvbnN0IHRhYkRhdGEgPSB7XG4gICAgbmFtZTogY29tcHV0ZWQoKCkgPT4gcHJvcHMubmFtZSksXG4gICAgcm9vdFJlZixcbiAgICB0YWJJbmRpY2F0b3JSZWYsXG4gICAgcm91dGVEYXRhXG4gIH1cblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICR0YWJzLnVucmVnaXN0ZXJUYWIodGFiRGF0YSlcbiAgfSlcblxuICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICR0YWJzLnJlZ2lzdGVyVGFiKHRhYkRhdGEpXG4gIH0pXG5cbiAgZnVuY3Rpb24gcmVuZGVyVGFiICh0YWcsIGN1c3RvbURhdGEpIHtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgcmVmOiByb290UmVmLFxuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICB0YWJpbmRleDogdGFiSW5kZXgudmFsdWUsXG4gICAgICByb2xlOiAndGFiJyxcbiAgICAgICdhcmlhLXNlbGVjdGVkJzogaXNBY3RpdmUudmFsdWUgPT09IHRydWUgPyAndHJ1ZScgOiAnZmFsc2UnLFxuICAgICAgJ2FyaWEtZGlzYWJsZWQnOiBwcm9wcy5kaXNhYmxlID09PSB0cnVlID8gJ3RydWUnIDogdm9pZCAwLFxuICAgICAgb25DbGljayxcbiAgICAgIG9uS2V5ZG93bixcbiAgICAgIC4uLmN1c3RvbURhdGFcbiAgICB9XG5cbiAgICByZXR1cm4gd2l0aERpcmVjdGl2ZXMoXG4gICAgICBoKHRhZywgZGF0YSwgZ2V0Q29udGVudCgpKSxcbiAgICAgIFsgWyBSaXBwbGUsIHJpcHBsZS52YWx1ZSBdIF1cbiAgICApXG4gIH1cblxuICByZXR1cm4geyByZW5kZXJUYWIsICR0YWJzIH1cbn1cbiIsImltcG9ydCB1c2VUYWIsIHsgdXNlVGFiUHJvcHMsIHVzZVRhYkVtaXRzIH0gZnJvbSAnLi91c2UtdGFiLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUYWInLFxuXG4gIHByb3BzOiB1c2VUYWJQcm9wcyxcblxuICBlbWl0czogdXNlVGFiRW1pdHMsXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHJlbmRlclRhYiB9ID0gdXNlVGFiKHByb3BzLCBzbG90cywgZW1pdClcbiAgICByZXR1cm4gKCkgPT4gcmVuZGVyVGFiKCdkaXYnKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgbmV4dFRpY2ssIG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB2bUlzRGVzdHJveWVkIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bSdcblxuLypcbiAqIFVzYWdlOlxuICogICAgcmVnaXN0ZXJUaWNrKGZuKVxuICogICAgcmVtb3ZlVGljaygpXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgdGlja0ZuXG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBmdW5jdGlvbiByZW1vdmVUaWNrICgpIHtcbiAgICB0aWNrRm4gPSB2b2lkIDBcbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZWQocmVtb3ZlVGljaylcbiAgb25CZWZvcmVVbm1vdW50KHJlbW92ZVRpY2spXG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmVUaWNrLFxuXG4gICAgcmVnaXN0ZXJUaWNrIChmbikge1xuICAgICAgdGlja0ZuID0gZm5cblxuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBpZiAodGlja0ZuID09PSBmbikge1xuICAgICAgICAgIC8vIHdlIGFsc28gY2hlY2sgaWYgVk0gaXMgZGVzdHJveWVkLCBzaW5jZSBpZiBpdFxuICAgICAgICAgIC8vIGdvdCB0byB0cmlnZ2VyIG9uZSBuZXh0VGljaygpIHdlIGNhbm5vdCBzdG9wIGl0XG4gICAgICAgICAgdm1Jc0Rlc3Ryb3llZCh2bSkgPT09IGZhbHNlICYmIHRpY2tGbigpXG4gICAgICAgICAgdGlja0ZuID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iLCJsZXQgcnRsSGFzU2Nyb2xsQnVnID0gZmFsc2VcblxuLy8gbW9iaWxlIENocm9tZSB0YWtlcyB0aGUgY3Jvd24gZm9yIHRoaXNcbmlmICghX19RVUFTQVJfU1NSX18pIHtcbiAgY29uc3Qgc2Nyb2xsZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBzY3JvbGxlci5zZXRBdHRyaWJ1dGUoJ2RpcicsICdydGwnKVxuICBPYmplY3QuYXNzaWduKHNjcm9sbGVyLnN0eWxlLCB7XG4gICAgd2lkdGg6ICcxcHgnLFxuICAgIGhlaWdodDogJzFweCcsXG4gICAgb3ZlcmZsb3c6ICdhdXRvJ1xuICB9KVxuXG4gIGNvbnN0IHNwYWNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIE9iamVjdC5hc3NpZ24oc3BhY2VyLnN0eWxlLCB7XG4gICAgd2lkdGg6ICcxMDAwcHgnLFxuICAgIGhlaWdodDogJzFweCdcbiAgfSlcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbGVyKVxuICBzY3JvbGxlci5hcHBlbmRDaGlsZChzcGFjZXIpXG4gIHNjcm9sbGVyLnNjcm9sbExlZnQgPSAtMTAwMFxuXG4gIHJ0bEhhc1Njcm9sbEJ1ZyA9IHNjcm9sbGVyLnNjcm9sbExlZnQgPj0gMFxuXG4gIHNjcm9sbGVyLnJlbW92ZSgpXG59XG5cbmV4cG9ydCB7XG4gIHJ0bEhhc1Njcm9sbEJ1Z1xufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgb25BY3RpdmF0ZWQsIG9uRGVhY3RpdmF0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSwgcHJvdmlkZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5pbXBvcnQgUVJlc2l6ZU9ic2VydmVyIGZyb20gJy4uL3Jlc2l6ZS1vYnNlcnZlci9RUmVzaXplT2JzZXJ2ZXIuanMnXG5cbmltcG9ydCB1c2VUaWNrIGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRpY2suanMnXG5pbXBvcnQgdXNlVGltZW91dCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10aW1lb3V0LmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyB0YWJzS2V5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuaW1wb3J0IHsgcnRsSGFzU2Nyb2xsQnVnIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9ydGwuanMnXG5cbmZ1bmN0aW9uIGdldEluZGljYXRvckNsYXNzIChjb2xvciwgdG9wLCB2ZXJ0aWNhbCkge1xuICBjb25zdCBwb3MgPSB2ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgID8gWyAnbGVmdCcsICdyaWdodCcgXVxuICAgIDogWyAndG9wJywgJ2JvdHRvbScgXVxuXG4gIHJldHVybiBgYWJzb2x1dGUtJHsgdG9wID09PSB0cnVlID8gcG9zWyAwIF0gOiBwb3NbIDEgXSB9JHsgY29sb3IgPyBgIHRleHQtJHsgY29sb3IgfWAgOiAnJyB9YFxufVxuXG5jb25zdCBhbGlnblZhbHVlcyA9IFsgJ2xlZnQnLCAnY2VudGVyJywgJ3JpZ2h0JywgJ2p1c3RpZnknIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUYWJzJyxcblxuICBwcm9wczoge1xuICAgIG1vZGVsVmFsdWU6IFsgTnVtYmVyLCBTdHJpbmcgXSxcblxuICAgIGFsaWduOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnY2VudGVyJyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBhbGlnblZhbHVlcy5pbmNsdWRlcyh2KVxuICAgIH0sXG4gICAgYnJlYWtwb2ludDoge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogNjAwXG4gICAgfSxcblxuICAgIHZlcnRpY2FsOiBCb29sZWFuLFxuICAgIHNocmluazogQm9vbGVhbixcbiAgICBzdHJldGNoOiBCb29sZWFuLFxuXG4gICAgYWN0aXZlQ2xhc3M6IFN0cmluZyxcbiAgICBhY3RpdmVDb2xvcjogU3RyaW5nLFxuICAgIGFjdGl2ZUJnQ29sb3I6IFN0cmluZyxcbiAgICBpbmRpY2F0b3JDb2xvcjogU3RyaW5nLFxuICAgIGxlZnRJY29uOiBTdHJpbmcsXG4gICAgcmlnaHRJY29uOiBTdHJpbmcsXG5cbiAgICBvdXRzaWRlQXJyb3dzOiBCb29sZWFuLFxuICAgIG1vYmlsZUFycm93czogQm9vbGVhbixcblxuICAgIHN3aXRjaEluZGljYXRvcjogQm9vbGVhbixcblxuICAgIG5hcnJvd0luZGljYXRvcjogQm9vbGVhbixcbiAgICBpbmxpbmVMYWJlbDogQm9vbGVhbixcbiAgICBub0NhcHM6IEJvb2xlYW4sXG5cbiAgICBkZW5zZTogQm9vbGVhbixcblxuICAgIGNvbnRlbnRDbGFzczogU3RyaW5nLFxuXG4gICAgJ29uVXBkYXRlOm1vZGVsVmFsdWUnOiBbIEZ1bmN0aW9uLCBBcnJheSBdXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzLCBlbWl0IH0pIHtcbiAgICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHsgJHEgfSA9IHByb3h5XG5cbiAgICBjb25zdCB7IHJlZ2lzdGVyVGljazogcmVnaXN0ZXJTY3JvbGxUaWNrIH0gPSB1c2VUaWNrKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGljazogcmVnaXN0ZXJVcGRhdGVBcnJvd3NUaWNrIH0gPSB1c2VUaWNrKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGljazogcmVnaXN0ZXJBbmltYXRlVGljayB9ID0gdXNlVGljaygpXG5cbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dDogcmVnaXN0ZXJGb2N1c1RpbWVvdXQsIHJlbW92ZVRpbWVvdXQ6IHJlbW92ZUZvY3VzVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQ6IHJlZ2lzdGVyU2Nyb2xsVG9UYWJUaW1lb3V0LCByZW1vdmVUaW1lb3V0OiByZW1vdmVTY3JvbGxUb1RhYlRpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuXG4gICAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICAgIGNvbnN0IGNvbnRlbnRSZWYgPSByZWYobnVsbClcblxuICAgIGNvbnN0IGN1cnJlbnRNb2RlbCA9IHJlZihwcm9wcy5tb2RlbFZhbHVlKVxuICAgIGNvbnN0IHNjcm9sbGFibGUgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgbGVmdEFycm93ID0gcmVmKHRydWUpXG4gICAgY29uc3QgcmlnaHRBcnJvdyA9IHJlZihmYWxzZSlcbiAgICBjb25zdCBqdXN0aWZ5ID0gcmVmKGZhbHNlKVxuXG4gICAgY29uc3QgdGFiRGF0YUxpc3QgPSBbXVxuICAgIGNvbnN0IHRhYkRhdGFMaXN0TGVuID0gcmVmKDApXG4gICAgY29uc3QgaGFzRm9jdXMgPSByZWYoZmFsc2UpXG5cbiAgICBsZXQgYW5pbWF0ZVRpbWVyID0gbnVsbCwgc2Nyb2xsVGltZXIgPSBudWxsLCB1bndhdGNoUm91dGVcblxuICAgIGNvbnN0IHRhYlByb3BzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICAgIGFjdGl2ZUNsYXNzOiBwcm9wcy5hY3RpdmVDbGFzcyxcbiAgICAgIGFjdGl2ZUNvbG9yOiBwcm9wcy5hY3RpdmVDb2xvcixcbiAgICAgIGFjdGl2ZUJnQ29sb3I6IHByb3BzLmFjdGl2ZUJnQ29sb3IsXG4gICAgICBpbmRpY2F0b3JDbGFzczogZ2V0SW5kaWNhdG9yQ2xhc3MoXG4gICAgICAgIHByb3BzLmluZGljYXRvckNvbG9yLFxuICAgICAgICBwcm9wcy5zd2l0Y2hJbmRpY2F0b3IsXG4gICAgICAgIHByb3BzLnZlcnRpY2FsXG4gICAgICApLFxuICAgICAgbmFycm93SW5kaWNhdG9yOiBwcm9wcy5uYXJyb3dJbmRpY2F0b3IsXG4gICAgICBpbmxpbmVMYWJlbDogcHJvcHMuaW5saW5lTGFiZWwsXG4gICAgICBub0NhcHM6IHByb3BzLm5vQ2Fwc1xuICAgIH0pKVxuXG4gICAgY29uc3QgaGFzQWN0aXZlVGFiID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgbGVuID0gdGFiRGF0YUxpc3RMZW4udmFsdWVcbiAgICAgIGNvbnN0IHZhbCA9IGN1cnJlbnRNb2RlbC52YWx1ZVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmICh0YWJEYXRhTGlzdFsgaSBdLm5hbWUudmFsdWUgPT09IHZhbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSlcblxuICAgIGNvbnN0IGFsaWduQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhbGlnbiA9IHNjcm9sbGFibGUudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAnbGVmdCdcbiAgICAgICAgOiAoanVzdGlmeS52YWx1ZSA9PT0gdHJ1ZSA/ICdqdXN0aWZ5JyA6IHByb3BzLmFsaWduKVxuXG4gICAgICByZXR1cm4gYHEtdGFic19fY29udGVudC0tYWxpZ24tJHsgYWxpZ24gfWBcbiAgICB9KVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS10YWJzIHJvdyBuby13cmFwIGl0ZW1zLWNlbnRlcidcbiAgICAgICsgYCBxLXRhYnMtLSR7IHNjcm9sbGFibGUudmFsdWUgPT09IHRydWUgPyAnJyA6ICdub3QtJyB9c2Nyb2xsYWJsZWBcbiAgICAgICsgYCBxLXRhYnMtLSR7IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJyB9YFxuICAgICAgKyBgIHEtdGFic19fYXJyb3dzLS0keyBwcm9wcy5vdXRzaWRlQXJyb3dzID09PSB0cnVlID8gJ291dHNpZGUnIDogJ2luc2lkZScgfWBcbiAgICAgICsgYCBxLXRhYnMtLW1vYmlsZS13aXRoJHsgcHJvcHMubW9iaWxlQXJyb3dzID09PSB0cnVlID8gJycgOiAnb3V0JyB9LWFycm93c2BcbiAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLXRhYnMtLWRlbnNlJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc2hyaW5rID09PSB0cnVlID8gJyBjb2wtc2hyaW5rJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3RyZXRjaCA9PT0gdHJ1ZSA/ICcgc2VsZi1zdHJldGNoJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGlubmVyQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdGFic19fY29udGVudCBzY3JvbGwtLW1vYmlsZSByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXIgc2VsZi1zdHJldGNoIGhpZGUtc2Nyb2xsYmFyIHJlbGF0aXZlLXBvc2l0aW9uICdcbiAgICAgICsgYWxpZ25DbGFzcy52YWx1ZVxuICAgICAgKyAocHJvcHMuY29udGVudENsYXNzICE9PSB2b2lkIDAgPyBgICR7IHByb3BzLmNvbnRlbnRDbGFzcyB9YCA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGRvbVByb3BzID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgPyB7IGNvbnRhaW5lcjogJ2hlaWdodCcsIGNvbnRlbnQ6ICdvZmZzZXRIZWlnaHQnLCBzY3JvbGw6ICdzY3JvbGxIZWlnaHQnIH1cbiAgICAgICAgOiB7IGNvbnRhaW5lcjogJ3dpZHRoJywgY29udGVudDogJ29mZnNldFdpZHRoJywgc2Nyb2xsOiAnc2Nyb2xsV2lkdGgnIH1cbiAgICApKVxuXG4gICAgY29uc3QgaXNSVEwgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy52ZXJ0aWNhbCAhPT0gdHJ1ZSAmJiAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSlcbiAgICBjb25zdCBydGxQb3NDb3JyZWN0aW9uID0gY29tcHV0ZWQoKCkgPT4gcnRsSGFzU2Nyb2xsQnVnID09PSBmYWxzZSAmJiBpc1JUTC52YWx1ZSA9PT0gdHJ1ZSlcblxuICAgIHdhdGNoKGlzUlRMLCB1cGRhdGVBcnJvd3MpXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlLCBuYW1lID0+IHtcbiAgICAgIHVwZGF0ZU1vZGVsKHsgbmFtZSwgc2V0Q3VycmVudDogdHJ1ZSwgc2tpcEVtaXQ6IHRydWUgfSlcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMub3V0c2lkZUFycm93cywgcmVjYWxjdWxhdGVTY3JvbGwpXG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNb2RlbCAoeyBuYW1lLCBzZXRDdXJyZW50LCBza2lwRW1pdCB9KSB7XG4gICAgICBpZiAoY3VycmVudE1vZGVsLnZhbHVlICE9PSBuYW1lKSB7XG4gICAgICAgIGlmIChza2lwRW1pdCAhPT0gdHJ1ZSAmJiBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMCkge1xuICAgICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgbmFtZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBzZXRDdXJyZW50ID09PSB0cnVlXG4gICAgICAgICAgfHwgcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdID09PSB2b2lkIDBcbiAgICAgICAgKSB7XG4gICAgICAgICAgYW5pbWF0ZShjdXJyZW50TW9kZWwudmFsdWUsIG5hbWUpXG4gICAgICAgICAgY3VycmVudE1vZGVsLnZhbHVlID0gbmFtZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjYWxjdWxhdGVTY3JvbGwgKCkge1xuICAgICAgcmVnaXN0ZXJTY3JvbGxUaWNrKCgpID0+IHtcbiAgICAgICAgdXBkYXRlQ29udGFpbmVyKHtcbiAgICAgICAgICB3aWR0aDogcm9vdFJlZi52YWx1ZS5vZmZzZXRXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IHJvb3RSZWYudmFsdWUub2Zmc2V0SGVpZ2h0XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbnRhaW5lciAoZG9tU2l6ZSkge1xuICAgICAgLy8gaXQgY2FuIGJlIGNhbGxlZCBmYXN0ZXIgdGhhbiBjb21wb25lbnQgYmVpbmcgaW5pdGlhbGl6ZWRcbiAgICAgIC8vIHNvIHdlIG5lZWQgdG8gcHJvdGVjdCBhZ2FpbnN0IHRoYXQgY2FzZVxuICAgICAgLy8gKG9uZSBleGFtcGxlIG9mIHN1Y2ggY2FzZSBpcyB0aGUgZG9jcyByZWxlYXNlIG5vdGVzIHBhZ2UpXG4gICAgICBpZiAoZG9tUHJvcHMudmFsdWUgPT09IHZvaWQgMCB8fCBjb250ZW50UmVmLnZhbHVlID09PSBudWxsKSB7IHJldHVybiB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIHNpemUgPSBkb21TaXplWyBkb21Qcm9wcy52YWx1ZS5jb250YWluZXIgXSxcbiAgICAgICAgc2Nyb2xsU2l6ZSA9IE1hdGgubWluKFxuICAgICAgICAgIGNvbnRlbnRSZWYudmFsdWVbIGRvbVByb3BzLnZhbHVlLnNjcm9sbCBdLFxuICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5yZWR1Y2UuY2FsbChcbiAgICAgICAgICAgIGNvbnRlbnRSZWYudmFsdWUuY2hpbGRyZW4sXG4gICAgICAgICAgICAoYWNjLCBlbCkgPT4gYWNjICsgKGVsWyBkb21Qcm9wcy52YWx1ZS5jb250ZW50IF0gfHwgMCksXG4gICAgICAgICAgICAwXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBzY3JvbGwgPSBzaXplID4gMCAmJiBzY3JvbGxTaXplID4gc2l6ZSAvLyB3aGVuIHRoZXJlIGlzIG5vIHRhYiwgaW4gQ2hyb21lLCBzaXplID09PSAwIGFuZCBzY3JvbGxTaXplID09PSAxXG5cbiAgICAgIHNjcm9sbGFibGUudmFsdWUgPSBzY3JvbGxcblxuICAgICAgLy8gQXJyb3dzIG5lZWQgdG8gYmUgdXBkYXRlZCBldmVuIGlmIHRoZSBzY3JvbGwgc3RhdHVzIHdhcyBhbHJlYWR5IHRydWVcbiAgICAgIHNjcm9sbCA9PT0gdHJ1ZSAmJiByZWdpc3RlclVwZGF0ZUFycm93c1RpY2sodXBkYXRlQXJyb3dzKVxuXG4gICAgICBqdXN0aWZ5LnZhbHVlID0gc2l6ZSA8IHBhcnNlSW50KHByb3BzLmJyZWFrcG9pbnQsIDEwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuaW1hdGUgKG9sZE5hbWUsIG5ld05hbWUpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIG9sZFRhYiA9IG9sZE5hbWUgIT09IHZvaWQgMCAmJiBvbGROYW1lICE9PSBudWxsICYmIG9sZE5hbWUgIT09ICcnXG4gICAgICAgICAgPyB0YWJEYXRhTGlzdC5maW5kKHRhYiA9PiB0YWIubmFtZS52YWx1ZSA9PT0gb2xkTmFtZSlcbiAgICAgICAgICA6IG51bGwsXG4gICAgICAgIG5ld1RhYiA9IG5ld05hbWUgIT09IHZvaWQgMCAmJiBuZXdOYW1lICE9PSBudWxsICYmIG5ld05hbWUgIT09ICcnXG4gICAgICAgICAgPyB0YWJEYXRhTGlzdC5maW5kKHRhYiA9PiB0YWIubmFtZS52YWx1ZSA9PT0gbmV3TmFtZSlcbiAgICAgICAgICA6IG51bGxcblxuICAgICAgaWYgKG9sZFRhYiAmJiBuZXdUYWIpIHtcbiAgICAgICAgY29uc3RcbiAgICAgICAgICBvbGRFbCA9IG9sZFRhYi50YWJJbmRpY2F0b3JSZWYudmFsdWUsXG4gICAgICAgICAgbmV3RWwgPSBuZXdUYWIudGFiSW5kaWNhdG9yUmVmLnZhbHVlXG5cbiAgICAgICAgaWYgKGFuaW1hdGVUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChhbmltYXRlVGltZXIpXG4gICAgICAgICAgYW5pbWF0ZVRpbWVyID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgb2xkRWwuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJ1xuICAgICAgICBvbGRFbC5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSdcbiAgICAgICAgbmV3RWwuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJ1xuICAgICAgICBuZXdFbC5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSdcblxuICAgICAgICBjb25zdFxuICAgICAgICAgIG9sZFBvcyA9IG9sZEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIG5ld1BvcyA9IG5ld0VsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgICAgbmV3RWwuc3R5bGUudHJhbnNmb3JtID0gcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgICA/IGB0cmFuc2xhdGUzZCgwLCR7IG9sZFBvcy50b3AgLSBuZXdQb3MudG9wIH1weCwwKSBzY2FsZTNkKDEsJHsgbmV3UG9zLmhlaWdodCA/IG9sZFBvcy5oZWlnaHQgLyBuZXdQb3MuaGVpZ2h0IDogMSB9LDEpYFxuICAgICAgICAgIDogYHRyYW5zbGF0ZTNkKCR7IG9sZFBvcy5sZWZ0IC0gbmV3UG9zLmxlZnQgfXB4LDAsMCkgc2NhbGUzZCgkeyBuZXdQb3Mud2lkdGggPyBvbGRQb3Mud2lkdGggLyBuZXdQb3Mud2lkdGggOiAxIH0sMSwxKWBcblxuICAgICAgICAvLyBhbGxvdyBzY29wZSB1cGRhdGVzIHRvIGtpY2sgaW4gKFFSb3V0ZVRhYiBuZWVkcyBtb3JlIHRpbWUpXG4gICAgICAgIHJlZ2lzdGVyQW5pbWF0ZVRpY2soKCkgPT4ge1xuICAgICAgICAgIGFuaW1hdGVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgYW5pbWF0ZVRpbWVyID0gbnVsbFxuICAgICAgICAgICAgbmV3RWwuc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gLjI1cyBjdWJpYy1iZXppZXIoLjQsIDAsIC4yLCAxKSdcbiAgICAgICAgICAgIG5ld0VsLnN0eWxlLnRyYW5zZm9ybSA9ICdub25lJ1xuICAgICAgICAgIH0sIDcwKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBpZiAobmV3VGFiICYmIHNjcm9sbGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgc2Nyb2xsVG9UYWJFbChuZXdUYWIucm9vdFJlZi52YWx1ZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxUb1RhYkVsIChlbCkge1xuICAgICAgY29uc3RcbiAgICAgICAgeyBsZWZ0LCB3aWR0aCwgdG9wLCBoZWlnaHQgfSA9IGNvbnRlbnRSZWYudmFsdWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIG5ld1BvcyA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgICAgIGxldCBvZmZzZXQgPSBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/IG5ld1Bvcy50b3AgLSB0b3AgOiBuZXdQb3MubGVmdCAtIGxlZnRcblxuICAgICAgaWYgKG9mZnNldCA8IDApIHtcbiAgICAgICAgY29udGVudFJlZi52YWx1ZVsgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnc2Nyb2xsVG9wJyA6ICdzY3JvbGxMZWZ0JyBdICs9IE1hdGguZmxvb3Iob2Zmc2V0KVxuICAgICAgICB1cGRhdGVBcnJvd3MoKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgb2Zmc2V0ICs9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gbmV3UG9zLmhlaWdodCAtIGhlaWdodCA6IG5ld1Bvcy53aWR0aCAtIHdpZHRoXG4gICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICBjb250ZW50UmVmLnZhbHVlWyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdzY3JvbGxUb3AnIDogJ3Njcm9sbExlZnQnIF0gKz0gTWF0aC5jZWlsKG9mZnNldClcbiAgICAgICAgdXBkYXRlQXJyb3dzKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVBcnJvd3MgKCkge1xuICAgICAgY29uc3QgY29udGVudCA9IGNvbnRlbnRSZWYudmFsdWVcbiAgICAgIGlmIChjb250ZW50ID09PSBudWxsKSB7IHJldHVybiB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIHJlY3QgPSBjb250ZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICBwb3MgPSBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/IGNvbnRlbnQuc2Nyb2xsVG9wIDogTWF0aC5hYnMoY29udGVudC5zY3JvbGxMZWZ0KVxuXG4gICAgICBpZiAoaXNSVEwudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgbGVmdEFycm93LnZhbHVlID0gTWF0aC5jZWlsKHBvcyArIHJlY3Qud2lkdGgpIDwgY29udGVudC5zY3JvbGxXaWR0aCAtIDFcbiAgICAgICAgcmlnaHRBcnJvdy52YWx1ZSA9IHBvcyA+IDBcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBsZWZ0QXJyb3cudmFsdWUgPSBwb3MgPiAwXG4gICAgICAgIHJpZ2h0QXJyb3cudmFsdWUgPSBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICAgID8gTWF0aC5jZWlsKHBvcyArIHJlY3QuaGVpZ2h0KSA8IGNvbnRlbnQuc2Nyb2xsSGVpZ2h0XG4gICAgICAgICAgOiBNYXRoLmNlaWwocG9zICsgcmVjdC53aWR0aCkgPCBjb250ZW50LnNjcm9sbFdpZHRoXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5pbVNjcm9sbFRvICh2YWx1ZSkge1xuICAgICAgc2Nyb2xsVGltZXIgIT09IG51bGwgJiYgY2xlYXJJbnRlcnZhbChzY3JvbGxUaW1lcilcbiAgICAgIHNjcm9sbFRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAoc2Nyb2xsVG93YXJkcyh2YWx1ZSkgPT09IHRydWUpIHtcbiAgICAgICAgICBzdG9wQW5pbVNjcm9sbCgpXG4gICAgICAgIH1cbiAgICAgIH0sIDUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2Nyb2xsVG9TdGFydCAoKSB7XG4gICAgICBhbmltU2Nyb2xsVG8ocnRsUG9zQ29ycmVjdGlvbi52YWx1ZSA9PT0gdHJ1ZSA/IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIDogMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxUb0VuZCAoKSB7XG4gICAgICBhbmltU2Nyb2xsVG8ocnRsUG9zQ29ycmVjdGlvbi52YWx1ZSA9PT0gdHJ1ZSA/IDAgOiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdG9wQW5pbVNjcm9sbCAoKSB7XG4gICAgICBpZiAoc2Nyb2xsVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChzY3JvbGxUaW1lcilcbiAgICAgICAgc2Nyb2xsVGltZXIgPSBudWxsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25LYmROYXZpZ2F0ZSAoa2V5Q29kZSwgZnJvbUVsKSB7XG4gICAgICBjb25zdCB0YWJzID0gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKFxuICAgICAgICBjb250ZW50UmVmLnZhbHVlLmNoaWxkcmVuLFxuICAgICAgICBlbCA9PiBlbCA9PT0gZnJvbUVsIHx8IChlbC5tYXRjaGVzICYmIGVsLm1hdGNoZXMoJy5xLXRhYi5xLWZvY3VzYWJsZScpID09PSB0cnVlKVxuICAgICAgKVxuXG4gICAgICBjb25zdCBsZW4gPSB0YWJzLmxlbmd0aFxuICAgICAgaWYgKGxlbiA9PT0gMCkgeyByZXR1cm4gfVxuXG4gICAgICBpZiAoa2V5Q29kZSA9PT0gMzYpIHsgLy8gSG9tZVxuICAgICAgICBzY3JvbGxUb1RhYkVsKHRhYnNbIDAgXSlcbiAgICAgICAgdGFic1sgMCBdLmZvY3VzKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGlmIChrZXlDb2RlID09PSAzNSkgeyAvLyBFbmRcbiAgICAgICAgc2Nyb2xsVG9UYWJFbCh0YWJzWyBsZW4gLSAxIF0pXG4gICAgICAgIHRhYnNbIGxlbiAtIDEgXS5mb2N1cygpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRpclByZXYgPSBrZXlDb2RlID09PSAocHJvcHMudmVydGljYWwgPT09IHRydWUgPyAzOCAvKiBBcnJvd1VwICovIDogMzcgLyogQXJyb3dMZWZ0ICovKVxuICAgICAgY29uc3QgZGlyTmV4dCA9IGtleUNvZGUgPT09IChwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/IDQwIC8qIEFycm93RG93biAqLyA6IDM5IC8qIEFycm93UmlnaHQgKi8pXG5cbiAgICAgIGNvbnN0IGRpciA9IGRpclByZXYgPT09IHRydWUgPyAtMSA6IChkaXJOZXh0ID09PSB0cnVlID8gMSA6IHZvaWQgMClcblxuICAgICAgaWYgKGRpciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGNvbnN0IHJ0bERpciA9IGlzUlRMLnZhbHVlID09PSB0cnVlID8gLTEgOiAxXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGFicy5pbmRleE9mKGZyb21FbCkgKyBkaXIgKiBydGxEaXJcblxuICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IGxlbikge1xuICAgICAgICAgIHNjcm9sbFRvVGFiRWwodGFic1sgaW5kZXggXSlcbiAgICAgICAgICB0YWJzWyBpbmRleCBdLmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBsZXQncyBzcGVlZCB1cCBleGVjdXRpb24gb2YgdGltZS1zZW5zaXRpdmUgc2Nyb2xsVG93YXJkcygpXG4gICAgLy8gd2l0aCBhIGNvbXB1dGVkIHZhcmlhYmxlIGJ5IGRpcmVjdGx5IGFwcGx5aW5nIHRoZSBtaW5pbWFsXG4gICAgLy8gbnVtYmVyIG9mIGluc3RydWN0aW9ucyBvbiBnZXQvc2V0IGZ1bmN0aW9uc1xuICAgIGNvbnN0IHBvc0ZuID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcnRsUG9zQ29ycmVjdGlvbi52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/IHsgZ2V0OiBjb250ZW50ID0+IE1hdGguYWJzKGNvbnRlbnQuc2Nyb2xsTGVmdCksIHNldDogKGNvbnRlbnQsIHBvcykgPT4geyBjb250ZW50LnNjcm9sbExlZnQgPSAtcG9zIH0gfVxuICAgICAgICA6IChcbiAgICAgICAgICAgIHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgICAgICAgID8geyBnZXQ6IGNvbnRlbnQgPT4gY29udGVudC5zY3JvbGxUb3AsIHNldDogKGNvbnRlbnQsIHBvcykgPT4geyBjb250ZW50LnNjcm9sbFRvcCA9IHBvcyB9IH1cbiAgICAgICAgICAgICAgOiB7IGdldDogY29udGVudCA9PiBjb250ZW50LnNjcm9sbExlZnQsIHNldDogKGNvbnRlbnQsIHBvcykgPT4geyBjb250ZW50LnNjcm9sbExlZnQgPSBwb3MgfSB9XG4gICAgICAgICAgKVxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBzY3JvbGxUb3dhcmRzICh2YWx1ZSkge1xuICAgICAgY29uc3RcbiAgICAgICAgY29udGVudCA9IGNvbnRlbnRSZWYudmFsdWUsXG4gICAgICAgIHsgZ2V0LCBzZXQgfSA9IHBvc0ZuLnZhbHVlXG5cbiAgICAgIGxldFxuICAgICAgICBkb25lID0gZmFsc2UsXG4gICAgICAgIHBvcyA9IGdldChjb250ZW50KVxuXG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSB2YWx1ZSA8IHBvcyA/IC0xIDogMVxuXG4gICAgICBwb3MgKz0gZGlyZWN0aW9uICogNVxuXG4gICAgICBpZiAocG9zIDwgMCkge1xuICAgICAgICBkb25lID0gdHJ1ZVxuICAgICAgICBwb3MgPSAwXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChcbiAgICAgICAgKGRpcmVjdGlvbiA9PT0gLTEgJiYgcG9zIDw9IHZhbHVlKVxuICAgICAgICB8fCAoZGlyZWN0aW9uID09PSAxICYmIHBvcyA+PSB2YWx1ZSlcbiAgICAgICkge1xuICAgICAgICBkb25lID0gdHJ1ZVxuICAgICAgICBwb3MgPSB2YWx1ZVxuICAgICAgfVxuXG4gICAgICBzZXQoY29udGVudCwgcG9zKVxuICAgICAgdXBkYXRlQXJyb3dzKClcblxuICAgICAgcmV0dXJuIGRvbmVcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNRdWVyeUluY2x1ZGVkICh0YXJnZXRRdWVyeSwgbWF0Y2hpbmdRdWVyeSkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGFyZ2V0UXVlcnkpIHtcbiAgICAgICAgaWYgKHRhcmdldFF1ZXJ5WyBrZXkgXSAhPT0gbWF0Y2hpbmdRdWVyeVsga2V5IF0pIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIC8vIGRvIG5vdCB1c2UgZGlyZWN0bHk7IHVzZSB2ZXJpZnlSb3V0ZU1vZGVsKCkgaW5zdGVhZFxuICAgIGZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZVJvdXRlICgpIHtcbiAgICAgIGxldCBuYW1lID0gbnVsbCwgYmVzdFNjb3JlID0geyBtYXRjaGVkTGVuOiAwLCBxdWVyeURpZmY6IDk5OTksIGhyZWZMZW46IDAgfVxuXG4gICAgICBjb25zdCBsaXN0ID0gdGFiRGF0YUxpc3QuZmlsdGVyKHRhYiA9PiB0YWIucm91dGVEYXRhICE9PSB2b2lkIDAgJiYgdGFiLnJvdXRlRGF0YS5oYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKVxuICAgICAgY29uc3QgeyBoYXNoOiBjdXJyZW50SGFzaCwgcXVlcnk6IGN1cnJlbnRRdWVyeSB9ID0gcHJveHkuJHJvdXRlXG4gICAgICBjb25zdCBjdXJyZW50UXVlcnlMZW4gPSBPYmplY3Qua2V5cyhjdXJyZW50UXVlcnkpLmxlbmd0aFxuXG4gICAgICAvLyBWdWUgUm91dGVyIGRvZXMgbm90IGtlZXAgYWNjb3VudCBvZiBoYXNoICYgcXVlcnkgd2hlbiBtYXRjaGluZ1xuICAgICAgLy8gc28gd2UncmUgZG9pbmcgdGhpcyBhcyB3ZWxsXG5cbiAgICAgIGZvciAoY29uc3QgdGFiIG9mIGxpc3QpIHtcbiAgICAgICAgY29uc3QgZXhhY3QgPSB0YWIucm91dGVEYXRhLmV4YWN0LnZhbHVlID09PSB0cnVlXG5cbiAgICAgICAgaWYgKHRhYi5yb3V0ZURhdGFbIGV4YWN0ID09PSB0cnVlID8gJ2xpbmtJc0V4YWN0QWN0aXZlJyA6ICdsaW5rSXNBY3RpdmUnIF0udmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgICAvLyBpdCBjYW5ub3QgbWF0Y2ggYW55dGhpbmcgYXMgaXQncyBub3QgYWN0aXZlIG5vciBleGFjdC1hY3RpdmVcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgeyBoYXNoLCBxdWVyeSwgbWF0Y2hlZCwgaHJlZiB9ID0gdGFiLnJvdXRlRGF0YS5yZXNvbHZlZExpbmsudmFsdWVcbiAgICAgICAgY29uc3QgcXVlcnlMZW4gPSBPYmplY3Qua2V5cyhxdWVyeSkubGVuZ3RoXG5cbiAgICAgICAgaWYgKGV4YWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKGhhc2ggIT09IGN1cnJlbnRIYXNoKSB7XG4gICAgICAgICAgICAvLyBpdCdzIHNldCB0byBleGFjdCBidXQgaXQgZG9lc24ndCBtYXRjaGVzIHRoZSBoYXNoXG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHF1ZXJ5TGVuICE9PSBjdXJyZW50UXVlcnlMZW5cbiAgICAgICAgICAgIHx8IGhhc1F1ZXJ5SW5jbHVkZWQoY3VycmVudFF1ZXJ5LCBxdWVyeSkgPT09IGZhbHNlXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBpdCdzIHNldCB0byBleGFjdCBidXQgaXQgZG9lc24ndCBtYXRjaGVzIHRoZSBxdWVyeVxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyB5ZXksIHdlIGZvdW5kIHRoZSBwZXJmZWN0IG1hdGNoIChyb3V0ZSArIGhhc2ggKyBxdWVyeSlcbiAgICAgICAgICBuYW1lID0gdGFiLm5hbWUudmFsdWVcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc2ggIT09ICcnICYmIGhhc2ggIT09IGN1cnJlbnRIYXNoKSB7XG4gICAgICAgICAgLy8gaXQgaGFzIGhhc2ggYW5kIGl0IGRvZXNuJ3QgbWF0Y2hlc1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcXVlcnlMZW4gIT09IDBcbiAgICAgICAgICAmJiBoYXNRdWVyeUluY2x1ZGVkKHF1ZXJ5LCBjdXJyZW50UXVlcnkpID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBpdCBoYXMgcXVlcnkgYW5kIGl0IGRvZXNuJ3QgaW5jbHVkZXMgdGhlIGN1cnJlbnQgb25lXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld1Njb3JlID0ge1xuICAgICAgICAgIG1hdGNoZWRMZW46IG1hdGNoZWQubGVuZ3RoLFxuICAgICAgICAgIHF1ZXJ5RGlmZjogY3VycmVudFF1ZXJ5TGVuIC0gcXVlcnlMZW4sXG4gICAgICAgICAgaHJlZkxlbjogaHJlZi5sZW5ndGggLSBoYXNoLmxlbmd0aFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1Njb3JlLm1hdGNoZWRMZW4gPiBiZXN0U2NvcmUubWF0Y2hlZExlbikge1xuICAgICAgICAgIC8vIGl0IG1hdGNoZXMgbW9yZSByb3V0ZXMgc28gaXQncyBtb3JlIHNwZWNpZmljIHNvIHdlIHNldCBpdCBhcyBjdXJyZW50IGNoYW1waW9uXG4gICAgICAgICAgbmFtZSA9IHRhYi5uYW1lLnZhbHVlXG4gICAgICAgICAgYmVzdFNjb3JlID0gbmV3U2NvcmVcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5ld1Njb3JlLm1hdGNoZWRMZW4gIT09IGJlc3RTY29yZS5tYXRjaGVkTGVuKSB7XG4gICAgICAgICAgLy8gaXQgbWF0Y2hlcyBsZXNzIHJvdXRlcyB0aGFuIHRoZSBjdXJyZW50IGNoYW1waW9uIHNvIHdlIGRpc2NhcmQgaXRcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1Njb3JlLnF1ZXJ5RGlmZiA8IGJlc3RTY29yZS5xdWVyeURpZmYpIHtcbiAgICAgICAgICAvLyBxdWVyeSBpcyBjbG9zZXIgdG8gdGhlIGN1cnJlbnQgb25lIHNvIHdlIHNldCBpdCBhcyBjdXJyZW50IGNoYW1waW9uXG4gICAgICAgICAgbmFtZSA9IHRhYi5uYW1lLnZhbHVlXG4gICAgICAgICAgYmVzdFNjb3JlID0gbmV3U2NvcmVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuZXdTY29yZS5xdWVyeURpZmYgIT09IGJlc3RTY29yZS5xdWVyeURpZmYpIHtcbiAgICAgICAgICAvLyBpdCBtYXRjaGVzIGxlc3Mgcm91dGVzIHRoYW4gdGhlIGN1cnJlbnQgY2hhbXBpb24gc28gd2UgZGlzY2FyZCBpdFxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3U2NvcmUuaHJlZkxlbiA+IGJlc3RTY29yZS5ocmVmTGVuKSB7XG4gICAgICAgICAgLy8gaHJlZiBpcyBsZW5ndGhpZXIgc28gaXQncyBtb3JlIHNwZWNpZmljIHNvIHdlIHNldCBpdCBhcyBjdXJyZW50IGNoYW1waW9uXG4gICAgICAgICAgbmFtZSA9IHRhYi5uYW1lLnZhbHVlXG4gICAgICAgICAgYmVzdFNjb3JlID0gbmV3U2NvcmVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIG5hbWUgPT09IG51bGxcbiAgICAgICAgJiYgdGFiRGF0YUxpc3Quc29tZSh0YWIgPT4gdGFiLnJvdXRlRGF0YSA9PT0gdm9pZCAwICYmIHRhYi5uYW1lLnZhbHVlID09PSBjdXJyZW50TW9kZWwudmFsdWUpID09PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgLy8gd2Ugc2hvdWxkbid0IGludGVyZmVyZSBpZiBub24tcm91dGUgdGFiIGlzIGFjdGl2ZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgdXBkYXRlTW9kZWwoeyBuYW1lLCBzZXRDdXJyZW50OiB0cnVlIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c2luIChlKSB7XG4gICAgICByZW1vdmVGb2N1c1RpbWVvdXQoKVxuXG4gICAgICBpZiAoXG4gICAgICAgIGhhc0ZvY3VzLnZhbHVlICE9PSB0cnVlXG4gICAgICAgICYmIHJvb3RSZWYudmFsdWUgIT09IG51bGxcbiAgICAgICAgJiYgZS50YXJnZXRcbiAgICAgICAgJiYgdHlwZW9mIGUudGFyZ2V0LmNsb3Nlc3QgPT09ICdmdW5jdGlvbidcbiAgICAgICkge1xuICAgICAgICBjb25zdCB0YWIgPSBlLnRhcmdldC5jbG9zZXN0KCcucS10YWInKVxuXG4gICAgICAgIC8vIGlmIHRoZSB0YXJnZXQgaXMgY29udGFpbmVkIGJ5IGEgUVRhYi9RUm91dGVUYWJcbiAgICAgICAgLy8gKGl0IG1pZ2h0IGJlIG90aGVyIGVsZW1lbnRzIGZvY3VzZWQsIGxpa2UgYWRkaXRpb25hbCBRQnRuKVxuICAgICAgICBpZiAodGFiICYmIHJvb3RSZWYudmFsdWUuY29udGFpbnModGFiKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGhhc0ZvY3VzLnZhbHVlID0gdHJ1ZVxuICAgICAgICAgIHNjcm9sbGFibGUudmFsdWUgPT09IHRydWUgJiYgc2Nyb2xsVG9UYWJFbCh0YWIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkZvY3Vzb3V0ICgpIHtcbiAgICAgIHJlZ2lzdGVyRm9jdXNUaW1lb3V0KCgpID0+IHsgaGFzRm9jdXMudmFsdWUgPSBmYWxzZSB9LCAzMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2ZXJpZnlSb3V0ZU1vZGVsICgpIHtcbiAgICAgIGlmICgkdGFicy5hdm9pZFJvdXRlV2F0Y2hlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmVnaXN0ZXJTY3JvbGxUb1RhYlRpbWVvdXQodXBkYXRlQWN0aXZlUm91dGUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgcmVtb3ZlU2Nyb2xsVG9UYWJUaW1lb3V0KClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YXRjaFJvdXRlICgpIHtcbiAgICAgIGlmICh1bndhdGNoUm91dGUgPT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCB1bndhdGNoID0gd2F0Y2goKCkgPT4gcHJveHkuJHJvdXRlLmZ1bGxQYXRoLCB2ZXJpZnlSb3V0ZU1vZGVsKVxuICAgICAgICB1bndhdGNoUm91dGUgPSAoKSA9PiB7XG4gICAgICAgICAgdW53YXRjaCgpXG4gICAgICAgICAgdW53YXRjaFJvdXRlID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdpc3RlclRhYiAodGFiRGF0YSkge1xuICAgICAgdGFiRGF0YUxpc3QucHVzaCh0YWJEYXRhKVxuICAgICAgdGFiRGF0YUxpc3RMZW4udmFsdWUrK1xuXG4gICAgICByZWNhbGN1bGF0ZVNjcm9sbCgpXG5cbiAgICAgIC8vIGlmIGl0J3MgYSBRVGFiIG9yIHdlIGRvbid0IGhhdmUgVnVlIFJvdXRlclxuICAgICAgaWYgKHRhYkRhdGEucm91dGVEYXRhID09PSB2b2lkIDAgfHwgcHJveHkuJHJvdXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgLy8gd2Ugc2hvdWxkIHBvc2l0aW9uIHRvIHRoZSBjdXJyZW50bHkgYWN0aXZlIHRhYiAoaWYgYW55KVxuICAgICAgICByZWdpc3RlclNjcm9sbFRvVGFiVGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHNjcm9sbGFibGUudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY3VycmVudE1vZGVsLnZhbHVlXG4gICAgICAgICAgICBjb25zdCBuZXdUYWIgPSB2YWx1ZSAhPT0gdm9pZCAwICYmIHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSAnJ1xuICAgICAgICAgICAgICA/IHRhYkRhdGFMaXN0LmZpbmQodGFiID0+IHRhYi5uYW1lLnZhbHVlID09PSB2YWx1ZSlcbiAgICAgICAgICAgICAgOiBudWxsXG5cbiAgICAgICAgICAgIG5ld1RhYiAmJiBzY3JvbGxUb1RhYkVsKG5ld1RhYi5yb290UmVmLnZhbHVlKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIC8vIGVsc2UgaWYgaXQncyBhIFFSb3V0ZVRhYiB3aXRoIGEgdmFsaWQgbGlua1xuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIHN0YXJ0IHdhdGNoaW5nIHJvdXRlXG4gICAgICAgIHdhdGNoUm91dGUoKVxuXG4gICAgICAgIGlmICh0YWJEYXRhLnJvdXRlRGF0YS5oYXNSb3V0ZXJMaW5rLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgdmVyaWZ5Um91dGVNb2RlbCgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bnJlZ2lzdGVyVGFiICh0YWJEYXRhKSB7XG4gICAgICB0YWJEYXRhTGlzdC5zcGxpY2UodGFiRGF0YUxpc3QuaW5kZXhPZih0YWJEYXRhKSwgMSlcbiAgICAgIHRhYkRhdGFMaXN0TGVuLnZhbHVlLS1cblxuICAgICAgcmVjYWxjdWxhdGVTY3JvbGwoKVxuXG4gICAgICBpZiAodW53YXRjaFJvdXRlICE9PSB2b2lkIDAgJiYgdGFiRGF0YS5yb3V0ZURhdGEgIT09IHZvaWQgMCkge1xuICAgICAgICAvLyB1bndhdGNoIHJvdXRlIGlmIHdlIGRvbid0IGhhdmUgYW55IFFSb3V0ZVRhYnMgbGVmdFxuICAgICAgICBpZiAodGFiRGF0YUxpc3QuZXZlcnkodGFiID0+IHRhYi5yb3V0ZURhdGEgPT09IHZvaWQgMCkgPT09IHRydWUpIHtcbiAgICAgICAgICB1bndhdGNoUm91dGUoKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlbiB1cGRhdGUgbW9kZWxcbiAgICAgICAgdmVyaWZ5Um91dGVNb2RlbCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgJHRhYnMgPSB7XG4gICAgICBjdXJyZW50TW9kZWwsXG4gICAgICB0YWJQcm9wcyxcbiAgICAgIGhhc0ZvY3VzLFxuICAgICAgaGFzQWN0aXZlVGFiLFxuXG4gICAgICByZWdpc3RlclRhYixcbiAgICAgIHVucmVnaXN0ZXJUYWIsXG5cbiAgICAgIHZlcmlmeVJvdXRlTW9kZWwsXG4gICAgICB1cGRhdGVNb2RlbCxcbiAgICAgIG9uS2JkTmF2aWdhdGUsXG5cbiAgICAgIGF2b2lkUm91dGVXYXRjaGVyOiBmYWxzZSAvLyBmYWxzZSB8IHN0cmluZyAodWlkKVxuICAgIH1cblxuICAgIHByb3ZpZGUodGFic0tleSwgJHRhYnMpXG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICAgIGFuaW1hdGVUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoYW5pbWF0ZVRpbWVyKVxuICAgICAgc3RvcEFuaW1TY3JvbGwoKVxuICAgICAgdW53YXRjaFJvdXRlICE9PSB2b2lkIDAgJiYgdW53YXRjaFJvdXRlKClcbiAgICB9XG5cbiAgICBsZXQgaGFkUm91dGVXYXRjaGVyXG5cbiAgICBvbkJlZm9yZVVubW91bnQoY2xlYW51cClcblxuICAgIG9uRGVhY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgaGFkUm91dGVXYXRjaGVyID0gdW53YXRjaFJvdXRlICE9PSB2b2lkIDBcbiAgICAgIGNsZWFudXAoKVxuICAgIH0pXG5cbiAgICBvbkFjdGl2YXRlZCgoKSA9PiB7XG4gICAgICBoYWRSb3V0ZVdhdGNoZXIgPT09IHRydWUgJiYgd2F0Y2hSb3V0ZSgpXG4gICAgICByZWNhbGN1bGF0ZVNjcm9sbCgpXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICByZWY6IHJvb3RSZWYsXG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgICByb2xlOiAndGFibGlzdCcsXG4gICAgICAgIG9uRm9jdXNpbixcbiAgICAgICAgb25Gb2N1c291dFxuICAgICAgfSwgW1xuICAgICAgICBoKFFSZXNpemVPYnNlcnZlciwgeyBvblJlc2l6ZTogdXBkYXRlQ29udGFpbmVyIH0pLFxuXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICByZWY6IGNvbnRlbnRSZWYsXG4gICAgICAgICAgY2xhc3M6IGlubmVyQ2xhc3MudmFsdWUsXG4gICAgICAgICAgb25TY3JvbGw6IHVwZGF0ZUFycm93c1xuICAgICAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSksXG5cbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS10YWJzX19hcnJvdyBxLXRhYnNfX2Fycm93LS1sZWZ0IGFic29sdXRlIHEtdGFiX19pY29uJ1xuICAgICAgICAgICAgKyAobGVmdEFycm93LnZhbHVlID09PSB0cnVlID8gJycgOiAnIHEtdGFic19fYXJyb3ctLWZhZGVkJyksXG4gICAgICAgICAgbmFtZTogcHJvcHMubGVmdEljb24gfHwgJHEuaWNvblNldC50YWJzWyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd1cCcgOiAnbGVmdCcgXSxcbiAgICAgICAgICBvbk1vdXNlZG93blBhc3NpdmU6IHNjcm9sbFRvU3RhcnQsXG4gICAgICAgICAgb25Ub3VjaHN0YXJ0UGFzc2l2ZTogc2Nyb2xsVG9TdGFydCxcbiAgICAgICAgICBvbk1vdXNldXBQYXNzaXZlOiBzdG9wQW5pbVNjcm9sbCxcbiAgICAgICAgICBvbk1vdXNlbGVhdmVQYXNzaXZlOiBzdG9wQW5pbVNjcm9sbCxcbiAgICAgICAgICBvblRvdWNoZW5kUGFzc2l2ZTogc3RvcEFuaW1TY3JvbGxcbiAgICAgICAgfSksXG5cbiAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgIGNsYXNzOiAncS10YWJzX19hcnJvdyBxLXRhYnNfX2Fycm93LS1yaWdodCBhYnNvbHV0ZSBxLXRhYl9faWNvbidcbiAgICAgICAgICAgICsgKHJpZ2h0QXJyb3cudmFsdWUgPT09IHRydWUgPyAnJyA6ICcgcS10YWJzX19hcnJvdy0tZmFkZWQnKSxcbiAgICAgICAgICBuYW1lOiBwcm9wcy5yaWdodEljb24gfHwgJHEuaWNvblNldC50YWJzWyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICdkb3duJyA6ICdyaWdodCcgXSxcbiAgICAgICAgICBvbk1vdXNlZG93blBhc3NpdmU6IHNjcm9sbFRvRW5kLFxuICAgICAgICAgIG9uVG91Y2hzdGFydFBhc3NpdmU6IHNjcm9sbFRvRW5kLFxuICAgICAgICAgIG9uTW91c2V1cFBhc3NpdmU6IHN0b3BBbmltU2Nyb2xsLFxuICAgICAgICAgIG9uTW91c2VsZWF2ZVBhc3NpdmU6IHN0b3BBbmltU2Nyb2xsLFxuICAgICAgICAgIG9uVG91Y2hlbmRQYXNzaXZlOiBzdG9wQW5pbVNjcm9sbFxuICAgICAgICB9KVxuICAgICAgXSlcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVEaXJlY3RpdmUgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldE1vZGlmaWVyRGlyZWN0aW9ucywgc2hvdWxkU3RhcnQgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL3RvdWNoLmpzJ1xuaW1wb3J0IHsgYWRkRXZ0LCBjbGVhbkV2dCwgcG9zaXRpb24sIGxlZnRDbGljaywgc3RvcEFuZFByZXZlbnQsIHByZXZlbnREcmFnZ2FibGUsIG5vb3AgfSBmcm9tICcuLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9zZWxlY3Rpb24uanMnXG5pbXBvcnQgZ2V0U1NSUHJvcHMgZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG5mdW5jdGlvbiBwYXJzZUFyZyAoYXJnKSB7XG4gIC8vIGRlbHRhIChtaW4gdmVsb2NpdHkgLS0gZGlzdCAvIHRpbWUpXG4gIC8vIG1vYmlsZSBtaW4gZGlzdGFuY2Ugb24gZmlyc3QgbW92ZVxuICAvLyBkZXNrdG9wIG1pbiBkaXN0YW5jZSB1bnRpbCBkZWNpZGluZyBpZiBpdCdzIGEgc3dpcGUgb3Igbm90XG4gIGNvbnN0IGRhdGEgPSBbIDAuMDYsIDYsIDUwIF1cblxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgJiYgYXJnLmxlbmd0aCkge1xuICAgIGFyZy5zcGxpdCgnOicpLmZvckVhY2goKHZhbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHYgPSBwYXJzZUZsb2F0KHZhbClcbiAgICAgIHYgJiYgKGRhdGFbIGluZGV4IF0gPSB2KVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gZGF0YVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEaXJlY3RpdmUoX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8geyBuYW1lOiAndG91Y2gtc3dpcGUnLCBnZXRTU1JQcm9wcyB9XG4gIDoge1xuICAgICAgbmFtZTogJ3RvdWNoLXN3aXBlJyxcblxuICAgICAgYmVmb3JlTW91bnQgKGVsLCB7IHZhbHVlLCBhcmcsIG1vZGlmaWVycyB9KSB7XG4gICAgICAgIC8vIGVhcmx5IHJldHVybiwgd2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZ1xuICAgICAgICBpZiAobW9kaWZpZXJzLm1vdXNlICE9PSB0cnVlICYmIGNsaWVudC5oYXMudG91Y2ggIT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlQ2FwdHVyZSA9IG1vZGlmaWVycy5tb3VzZUNhcHR1cmUgPT09IHRydWUgPyAnQ2FwdHVyZScgOiAnJ1xuXG4gICAgICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgICAgICBoYW5kbGVyOiB2YWx1ZSxcbiAgICAgICAgICBzZW5zaXRpdml0eTogcGFyc2VBcmcoYXJnKSxcbiAgICAgICAgICBkaXJlY3Rpb246IGdldE1vZGlmaWVyRGlyZWN0aW9ucyhtb2RpZmllcnMpLFxuXG4gICAgICAgICAgbm9vcCxcblxuICAgICAgICAgIG1vdXNlU3RhcnQgKGV2dCkge1xuICAgICAgICAgICAgaWYgKHNob3VsZFN0YXJ0KGV2dCwgY3R4KSAmJiBsZWZ0Q2xpY2soZXZ0KSkge1xuICAgICAgICAgICAgICBhZGRFdnQoY3R4LCAndGVtcCcsIFtcbiAgICAgICAgICAgICAgICBbIGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgJ21vdmUnLCBgbm90UGFzc2l2ZSR7IG1vdXNlQ2FwdHVyZSB9YCBdLFxuICAgICAgICAgICAgICAgIFsgZG9jdW1lbnQsICdtb3VzZXVwJywgJ2VuZCcsICdub3RQYXNzaXZlQ2FwdHVyZScgXVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBjdHguc3RhcnQoZXZ0LCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB0b3VjaFN0YXJ0IChldnQpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRTdGFydChldnQsIGN0eCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldFxuICAgICAgICAgICAgICBhZGRFdnQoY3R4LCAndGVtcCcsIFtcbiAgICAgICAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNobW92ZScsICdtb3ZlJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdLFxuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hjYW5jZWwnLCAnZW5kJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdLFxuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hlbmQnLCAnZW5kJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIGN0eC5zdGFydChldnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHN0YXJ0IChldnQsIG1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgIGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlICYmIHByZXZlbnREcmFnZ2FibGUoZWwsIHRydWUpXG5cbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKGV2dClcblxuICAgICAgICAgICAgY3R4LmV2ZW50ID0ge1xuICAgICAgICAgICAgICB4OiBwb3MubGVmdCxcbiAgICAgICAgICAgICAgeTogcG9zLnRvcCxcbiAgICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgbW91c2U6IG1vdXNlRXZlbnQgPT09IHRydWUsXG4gICAgICAgICAgICAgIGRpcjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgbW92ZSAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50ID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQuZGlyICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBzdG9wQW5kUHJldmVudChldnQpXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB0aW1lID0gRGF0ZS5ub3coKSAtIGN0eC5ldmVudC50aW1lXG5cbiAgICAgICAgICAgIGlmICh0aW1lID09PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgICBwb3MgPSBwb3NpdGlvbihldnQpLFxuICAgICAgICAgICAgICBkaXN0WCA9IHBvcy5sZWZ0IC0gY3R4LmV2ZW50LngsXG4gICAgICAgICAgICAgIGFic1ggPSBNYXRoLmFicyhkaXN0WCksXG4gICAgICAgICAgICAgIGRpc3RZID0gcG9zLnRvcCAtIGN0eC5ldmVudC55LFxuICAgICAgICAgICAgICBhYnNZID0gTWF0aC5hYnMoZGlzdFkpXG5cbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQubW91c2UgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgaWYgKGFic1ggPCBjdHguc2Vuc2l0aXZpdHlbIDEgXSAmJiBhYnNZIDwgY3R4LnNlbnNpdGl2aXR5WyAxIF0pIHtcbiAgICAgICAgICAgICAgICBjdHguZW5kKGV2dClcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYWJzWCA8IGN0eC5zZW5zaXRpdml0eVsgMiBdICYmIGFic1kgPCBjdHguc2Vuc2l0aXZpdHlbIDIgXSkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3RcbiAgICAgICAgICAgICAgdmVsWCA9IGFic1ggLyB0aW1lLFxuICAgICAgICAgICAgICB2ZWxZID0gYWJzWSAvIHRpbWVcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGFic1ggPCBhYnNZXG4gICAgICAgICAgICAgICYmIGFic1ggPCAxMDBcbiAgICAgICAgICAgICAgJiYgdmVsWSA+IGN0eC5zZW5zaXRpdml0eVsgMCBdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRpciA9IGRpc3RZIDwgMCA/ICd1cCcgOiAnZG93bidcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLmhvcml6b250YWwgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgYWJzWCA+IGFic1lcbiAgICAgICAgICAgICAgJiYgYWJzWSA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxYID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gZGlzdFggPCAwID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24udXAgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IGFic1lcbiAgICAgICAgICAgICAgJiYgZGlzdFkgPCAwXG4gICAgICAgICAgICAgICYmIGFic1ggPCAxMDBcbiAgICAgICAgICAgICAgJiYgdmVsWSA+IGN0eC5zZW5zaXRpdml0eVsgMCBdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRpciA9ICd1cCdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLmRvd24gPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IGFic1lcbiAgICAgICAgICAgICAgJiYgZGlzdFkgPiAwXG4gICAgICAgICAgICAgICYmIGFic1ggPCAxMDBcbiAgICAgICAgICAgICAgJiYgdmVsWSA+IGN0eC5zZW5zaXRpdml0eVsgMCBdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRpciA9ICdkb3duJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24ubGVmdCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYID4gYWJzWVxuICAgICAgICAgICAgICAmJiBkaXN0WCA8IDBcbiAgICAgICAgICAgICAgJiYgYWJzWSA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxYID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gJ2xlZnQnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi5yaWdodCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYID4gYWJzWVxuICAgICAgICAgICAgICAmJiBkaXN0WCA+IDBcbiAgICAgICAgICAgICAgJiYgYWJzWSA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxYID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gJ3JpZ2h0J1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50LmRpciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgc3RvcEFuZFByZXZlbnQoZXZ0KVxuXG4gICAgICAgICAgICAgIGlmIChjdHguZXZlbnQubW91c2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ25vLXBvaW50ZXItZXZlbnRzLS1jaGlsZHJlbicpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdub24tc2VsZWN0YWJsZScpXG4gICAgICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb24oKVxuXG4gICAgICAgICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cCA9IHdpdGhEZWxheSA9PiB7XG4gICAgICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwID0gdm9pZCAwXG5cbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm9uLXNlbGVjdGFibGUnKVxuXG4gICAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm8tcG9pbnRlci1ldmVudHMtLWNoaWxkcmVuJylcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKHdpdGhEZWxheSA9PT0gdHJ1ZSkgeyBzZXRUaW1lb3V0KHJlbW92ZSwgNTApIH1cbiAgICAgICAgICAgICAgICAgIGVsc2UgeyByZW1vdmUoKSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY3R4LmhhbmRsZXIoe1xuICAgICAgICAgICAgICAgIGV2dCxcbiAgICAgICAgICAgICAgICB0b3VjaDogY3R4LmV2ZW50Lm1vdXNlICE9PSB0cnVlLFxuICAgICAgICAgICAgICAgIG1vdXNlOiBjdHguZXZlbnQubW91c2UsXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBjdHguZXZlbnQuZGlyLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiB0aW1lLFxuICAgICAgICAgICAgICAgIGRpc3RhbmNlOiB7XG4gICAgICAgICAgICAgICAgICB4OiBhYnNYLFxuICAgICAgICAgICAgICAgICAgeTogYWJzWVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjdHguZW5kKGV2dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZW5kIChldnQpIHtcbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2xlYW5FdnQoY3R4LCAndGVtcCcpXG4gICAgICAgICAgICBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZSAmJiBwcmV2ZW50RHJhZ2dhYmxlKGVsLCBmYWxzZSlcbiAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgIT09IHZvaWQgMCAmJiBjdHguc3R5bGVDbGVhbnVwKHRydWUpXG4gICAgICAgICAgICBldnQgIT09IHZvaWQgMCAmJiBjdHguZXZlbnQuZGlyICE9PSBmYWxzZSAmJiBzdG9wQW5kUHJldmVudChldnQpXG5cbiAgICAgICAgICAgIGN0eC5ldmVudCA9IHZvaWQgMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsLl9fcXRvdWNoc3dpcGUgPSBjdHhcblxuICAgICAgICBpZiAobW9kaWZpZXJzLm1vdXNlID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gYWNjb3VudCBmb3IgVU1EIHRvbyB3aGVyZSBtb2RpZmllcnMgd2lsbCBiZSBsb3dlcmNhc2VkIHRvIHdvcmtcbiAgICAgICAgICBjb25zdCBjYXB0dXJlID0gbW9kaWZpZXJzLm1vdXNlQ2FwdHVyZSA9PT0gdHJ1ZSB8fCBtb2RpZmllcnMubW91c2VjYXB0dXJlID09PSB0cnVlXG4gICAgICAgICAgICA/ICdDYXB0dXJlJ1xuICAgICAgICAgICAgOiAnJ1xuXG4gICAgICAgICAgYWRkRXZ0KGN0eCwgJ21haW4nLCBbXG4gICAgICAgICAgICBbIGVsLCAnbW91c2Vkb3duJywgJ21vdXNlU3RhcnQnLCBgcGFzc2l2ZSR7IGNhcHR1cmUgfWAgXVxuICAgICAgICAgIF0pXG4gICAgICAgIH1cblxuICAgICAgICBjbGllbnQuaGFzLnRvdWNoID09PSB0cnVlICYmIGFkZEV2dChjdHgsICdtYWluJywgW1xuICAgICAgICAgIFsgZWwsICd0b3VjaHN0YXJ0JywgJ3RvdWNoU3RhcnQnLCBgcGFzc2l2ZSR7IG1vZGlmaWVycy5jYXB0dXJlID09PSB0cnVlID8gJ0NhcHR1cmUnIDogJycgfWAgXSxcbiAgICAgICAgICBbIGVsLCAndG91Y2htb3ZlJywgJ25vb3AnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0gLy8gY2Fubm90IGJlIHBhc3NpdmUgKGV4OiBpT1Mgc2Nyb2xsKVxuICAgICAgICBdKVxuICAgICAgfSxcblxuICAgICAgdXBkYXRlZCAoZWwsIGJpbmRpbmdzKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXRvdWNoc3dpcGVcblxuICAgICAgICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBpZiAoYmluZGluZ3Mub2xkVmFsdWUgIT09IGJpbmRpbmdzLnZhbHVlKSB7XG4gICAgICAgICAgICB0eXBlb2YgYmluZGluZ3MudmFsdWUgIT09ICdmdW5jdGlvbicgJiYgY3R4LmVuZCgpXG4gICAgICAgICAgICBjdHguaGFuZGxlciA9IGJpbmRpbmdzLnZhbHVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3R4LmRpcmVjdGlvbiA9IGdldE1vZGlmaWVyRGlyZWN0aW9ucyhiaW5kaW5ncy5tb2RpZmllcnMpXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGJlZm9yZVVubW91bnQgKGVsKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXRvdWNoc3dpcGVcblxuICAgICAgICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjbGVhbkV2dChjdHgsICdtYWluJylcbiAgICAgICAgICBjbGVhbkV2dChjdHgsICd0ZW1wJylcblxuICAgICAgICAgIGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlICYmIHByZXZlbnREcmFnZ2FibGUoZWwsIGZhbHNlKVxuICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgIT09IHZvaWQgMCAmJiBjdHguc3R5bGVDbGVhbnVwKClcblxuICAgICAgICAgIGRlbGV0ZSBlbC5fX3F0b3VjaHN3aXBlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4pXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGNhY2hlID0gbmV3IE1hcCgpXG5cbiAgcmV0dXJuIHtcbiAgICBnZXRDYWNoZTogX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gICAgICA/IGZ1bmN0aW9uIChfLCBvYmopIHsgcmV0dXJuIG9iaiB9XG4gICAgICA6IGZ1bmN0aW9uIChrZXksIG9iaikge1xuICAgICAgICByZXR1cm4gY2FjaGVbIGtleSBdID09PSB2b2lkIDBcbiAgICAgICAgICA/IChjYWNoZVsga2V5IF0gPSBvYmopXG4gICAgICAgICAgOiBjYWNoZVsga2V5IF1cbiAgICAgIH0sXG5cbiAgICBnZXRDYWNoZVdpdGhGbjogX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gICAgICA/IGZ1bmN0aW9uIChfLCBmbikgeyByZXR1cm4gZm4oKSB9XG4gICAgICA6IGZ1bmN0aW9uIChrZXksIGZuKSB7XG4gICAgICAgIHJldHVybiBjYWNoZVsga2V5IF0gPT09IHZvaWQgMFxuICAgICAgICAgID8gKGNhY2hlWyBrZXkgXSA9IGZuKCkpXG4gICAgICAgICAgOiBjYWNoZVsga2V5IF1cbiAgICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UsIFRyYW5zaXRpb24sIEtlZXBBbGl2ZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFRvdWNoU3dpcGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9Ub3VjaFN3aXBlLmpzJ1xuXG5pbXBvcnQgdXNlQ2FjaGUgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtY2FjaGUuanMnXG5cbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBnZXROb3JtYWxpemVkVk5vZGVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bS5qcydcblxuZXhwb3J0IGNvbnN0IHVzZVBhbmVsQ2hpbGRQcm9wcyA9IHtcbiAgbmFtZTogeyByZXF1aXJlZDogdHJ1ZSB9LFxuICBkaXNhYmxlOiBCb29sZWFuXG59XG5cbmNvbnN0IFBhbmVsV3JhcHBlciA9IHtcbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogJ3EtcGFuZWwgc2Nyb2xsJyxcbiAgICAgIHJvbGU6ICd0YWJwYW5lbCdcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdXNlUGFuZWxQcm9wcyA9IHtcbiAgbW9kZWxWYWx1ZToge1xuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0sXG5cbiAgYW5pbWF0ZWQ6IEJvb2xlYW4sXG4gIGluZmluaXRlOiBCb29sZWFuLFxuICBzd2lwZWFibGU6IEJvb2xlYW4sXG4gIHZlcnRpY2FsOiBCb29sZWFuLFxuXG4gIHRyYW5zaXRpb25QcmV2OiBTdHJpbmcsXG4gIHRyYW5zaXRpb25OZXh0OiBTdHJpbmcsXG4gIHRyYW5zaXRpb25EdXJhdGlvbjoge1xuICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkZWZhdWx0OiAzMDBcbiAgfSxcblxuICBrZWVwQWxpdmU6IEJvb2xlYW4sXG4gIGtlZXBBbGl2ZUluY2x1ZGU6IFsgU3RyaW5nLCBBcnJheSwgUmVnRXhwIF0sXG4gIGtlZXBBbGl2ZUV4Y2x1ZGU6IFsgU3RyaW5nLCBBcnJheSwgUmVnRXhwIF0sXG4gIGtlZXBBbGl2ZU1heDogTnVtYmVyXG59XG5cbmV4cG9ydCBjb25zdCB1c2VQYW5lbEVtaXRzID0gWyAndXBkYXRlOm1vZGVsVmFsdWUnLCAnYmVmb3JlVHJhbnNpdGlvbicsICd0cmFuc2l0aW9uJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgZ2V0Q2FjaGVXaXRoRm4gfSA9IHVzZUNhY2hlKClcblxuICBsZXQgcGFuZWxzLCBmb3JjZWRQYW5lbFRyYW5zaXRpb25cblxuICBjb25zdCBwYW5lbEluZGV4ID0gcmVmKG51bGwpXG4gIGNvbnN0IHBhbmVsVHJhbnNpdGlvbiA9IHJlZihudWxsKVxuXG4gIGZ1bmN0aW9uIG9uU3dpcGUgKGV2dCkge1xuICAgIGNvbnN0IGRpciA9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3VwJyA6ICdsZWZ0J1xuICAgIGdvVG9QYW5lbEJ5T2Zmc2V0KChwcm94eS4kcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSkgKiAoZXZ0LmRpcmVjdGlvbiA9PT0gZGlyID8gMSA6IC0xKSlcbiAgfVxuXG4gIGNvbnN0IHBhbmVsRGlyZWN0aXZlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAvLyBpZiBwcm9wcy5zd2lwZWFibGVcbiAgICByZXR1cm4gWyBbXG4gICAgICBUb3VjaFN3aXBlLFxuICAgICAgb25Td2lwZSxcbiAgICAgIHZvaWQgMCxcbiAgICAgIHtcbiAgICAgICAgaG9yaXpvbnRhbDogcHJvcHMudmVydGljYWwgIT09IHRydWUsXG4gICAgICAgIHZlcnRpY2FsOiBwcm9wcy52ZXJ0aWNhbCxcbiAgICAgICAgbW91c2U6IHRydWVcbiAgICAgIH1cbiAgICBdIF1cbiAgfSlcblxuICBjb25zdCB0cmFuc2l0aW9uUHJldiA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMudHJhbnNpdGlvblByZXYgfHwgYHNsaWRlLSR7IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ2Rvd24nIDogJ3JpZ2h0JyB9YFxuICApXG5cbiAgY29uc3QgdHJhbnNpdGlvbk5leHQgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLnRyYW5zaXRpb25OZXh0IHx8IGBzbGlkZS0keyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd1cCcgOiAnbGVmdCcgfWBcbiAgKVxuXG4gIGNvbnN0IHRyYW5zaXRpb25TdHlsZSA9IGNvbXB1dGVkKFxuICAgICgpID0+IGAtLXEtdHJhbnNpdGlvbi1kdXJhdGlvbjogJHsgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uIH1tc2BcbiAgKVxuXG4gIGNvbnN0IGNvbnRlbnRLZXkgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwcm9wcy5tb2RlbFZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgPyBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICA6IFN0cmluZyhwcm9wcy5tb2RlbFZhbHVlKVxuICApKVxuXG4gIGNvbnN0IGtlZXBBbGl2ZVByb3BzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICBpbmNsdWRlOiBwcm9wcy5rZWVwQWxpdmVJbmNsdWRlLFxuICAgIGV4Y2x1ZGU6IHByb3BzLmtlZXBBbGl2ZUV4Y2x1ZGUsXG4gICAgbWF4OiBwcm9wcy5rZWVwQWxpdmVNYXhcbiAgfSkpXG5cbiAgY29uc3QgbmVlZHNVbmlxdWVLZWVwQWxpdmVXcmFwcGVyID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5rZWVwQWxpdmVJbmNsdWRlICE9PSB2b2lkIDBcbiAgICB8fCBwcm9wcy5rZWVwQWxpdmVFeGNsdWRlICE9PSB2b2lkIDBcbiAgKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsIChuZXdWYWwsIG9sZFZhbCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gaXNWYWxpZFBhbmVsTmFtZShuZXdWYWwpID09PSB0cnVlXG4gICAgICA/IGdldFBhbmVsSW5kZXgobmV3VmFsKVxuICAgICAgOiAtMVxuXG4gICAgaWYgKGZvcmNlZFBhbmVsVHJhbnNpdGlvbiAhPT0gdHJ1ZSkge1xuICAgICAgdXBkYXRlUGFuZWxUcmFuc2l0aW9uKFxuICAgICAgICBpbmRleCA9PT0gLTEgPyAwIDogKGluZGV4IDwgZ2V0UGFuZWxJbmRleChvbGRWYWwpID8gLTEgOiAxKVxuICAgICAgKVxuICAgIH1cblxuICAgIGlmIChwYW5lbEluZGV4LnZhbHVlICE9PSBpbmRleCkge1xuICAgICAgcGFuZWxJbmRleC52YWx1ZSA9IGluZGV4XG4gICAgICBlbWl0KCdiZWZvcmVUcmFuc2l0aW9uJywgbmV3VmFsLCBvbGRWYWwpXG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGVtaXQoJ3RyYW5zaXRpb24nLCBuZXdWYWwsIG9sZFZhbClcbiAgICAgIH0pXG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIG5leHRQYW5lbCAoKSB7IGdvVG9QYW5lbEJ5T2Zmc2V0KDEpIH1cbiAgZnVuY3Rpb24gcHJldmlvdXNQYW5lbCAoKSB7IGdvVG9QYW5lbEJ5T2Zmc2V0KC0xKSB9XG5cbiAgZnVuY3Rpb24gZ29Ub1BhbmVsIChuYW1lKSB7XG4gICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBuYW1lKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNWYWxpZFBhbmVsTmFtZSAobmFtZSkge1xuICAgIHJldHVybiBuYW1lICE9PSB2b2lkIDAgJiYgbmFtZSAhPT0gbnVsbCAmJiBuYW1lICE9PSAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFuZWxJbmRleCAobmFtZSkge1xuICAgIHJldHVybiBwYW5lbHMuZmluZEluZGV4KHBhbmVsID0+IHtcbiAgICAgIHJldHVybiBwYW5lbC5wcm9wcy5uYW1lID09PSBuYW1lXG4gICAgICAgICYmIHBhbmVsLnByb3BzLmRpc2FibGUgIT09ICcnXG4gICAgICAgICYmIHBhbmVsLnByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RW5hYmxlZFBhbmVscyAoKSB7XG4gICAgcmV0dXJuIHBhbmVscy5maWx0ZXIocGFuZWwgPT4ge1xuICAgICAgcmV0dXJuIHBhbmVsLnByb3BzLmRpc2FibGUgIT09ICcnXG4gICAgICAgICYmIHBhbmVsLnByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUGFuZWxUcmFuc2l0aW9uIChkaXJlY3Rpb24pIHtcbiAgICBjb25zdCB2YWwgPSBkaXJlY3Rpb24gIT09IDAgJiYgcHJvcHMuYW5pbWF0ZWQgPT09IHRydWUgJiYgcGFuZWxJbmRleC52YWx1ZSAhPT0gLTFcbiAgICAgID8gJ3EtdHJhbnNpdGlvbi0tJyArIChkaXJlY3Rpb24gPT09IC0xID8gdHJhbnNpdGlvblByZXYudmFsdWUgOiB0cmFuc2l0aW9uTmV4dC52YWx1ZSlcbiAgICAgIDogbnVsbFxuXG4gICAgaWYgKHBhbmVsVHJhbnNpdGlvbi52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICBwYW5lbFRyYW5zaXRpb24udmFsdWUgPSB2YWxcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnb1RvUGFuZWxCeU9mZnNldCAoZGlyZWN0aW9uLCBzdGFydEluZGV4ID0gcGFuZWxJbmRleC52YWx1ZSkge1xuICAgIGxldCBpbmRleCA9IHN0YXJ0SW5kZXggKyBkaXJlY3Rpb25cblxuICAgIHdoaWxlIChpbmRleCA+IC0xICYmIGluZGV4IDwgcGFuZWxzLmxlbmd0aCkge1xuICAgICAgY29uc3Qgb3B0ID0gcGFuZWxzWyBpbmRleCBdXG5cbiAgICAgIGlmIChcbiAgICAgICAgb3B0ICE9PSB2b2lkIDBcbiAgICAgICAgJiYgb3B0LnByb3BzLmRpc2FibGUgIT09ICcnXG4gICAgICAgICYmIG9wdC5wcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgdXBkYXRlUGFuZWxUcmFuc2l0aW9uKGRpcmVjdGlvbilcbiAgICAgICAgZm9yY2VkUGFuZWxUcmFuc2l0aW9uID0gdHJ1ZVxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG9wdC5wcm9wcy5uYW1lKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBmb3JjZWRQYW5lbFRyYW5zaXRpb24gPSBmYWxzZVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaW5kZXggKz0gZGlyZWN0aW9uXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmluZmluaXRlID09PSB0cnVlICYmIHBhbmVscy5sZW5ndGggPiAwICYmIHN0YXJ0SW5kZXggIT09IC0xICYmIHN0YXJ0SW5kZXggIT09IHBhbmVscy5sZW5ndGgpIHtcbiAgICAgIGdvVG9QYW5lbEJ5T2Zmc2V0KGRpcmVjdGlvbiwgZGlyZWN0aW9uID09PSAtMSA/IHBhbmVscy5sZW5ndGggOiAtMSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQYW5lbEluZGV4ICgpIHtcbiAgICBjb25zdCBpbmRleCA9IGdldFBhbmVsSW5kZXgocHJvcHMubW9kZWxWYWx1ZSlcblxuICAgIGlmIChwYW5lbEluZGV4LnZhbHVlICE9PSBpbmRleCkge1xuICAgICAgcGFuZWxJbmRleC52YWx1ZSA9IGluZGV4XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhbmVsQ29udGVudENoaWxkICgpIHtcbiAgICBjb25zdCBwYW5lbCA9IGlzVmFsaWRQYW5lbE5hbWUocHJvcHMubW9kZWxWYWx1ZSkgPT09IHRydWVcbiAgICAgICYmIHVwZGF0ZVBhbmVsSW5kZXgoKVxuICAgICAgJiYgcGFuZWxzWyBwYW5lbEluZGV4LnZhbHVlIF1cblxuICAgIHJldHVybiBwcm9wcy5rZWVwQWxpdmUgPT09IHRydWVcbiAgICAgID8gW1xuICAgICAgICAgIGgoS2VlcEFsaXZlLCBrZWVwQWxpdmVQcm9wcy52YWx1ZSwgW1xuICAgICAgICAgICAgaChcbiAgICAgICAgICAgICAgbmVlZHNVbmlxdWVLZWVwQWxpdmVXcmFwcGVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgICAgPyBnZXRDYWNoZVdpdGhGbihjb250ZW50S2V5LnZhbHVlLCAoKSA9PiAoeyAuLi5QYW5lbFdyYXBwZXIsIG5hbWU6IGNvbnRlbnRLZXkudmFsdWUgfSkpXG4gICAgICAgICAgICAgICAgOiBQYW5lbFdyYXBwZXIsXG4gICAgICAgICAgICAgIHsga2V5OiBjb250ZW50S2V5LnZhbHVlLCBzdHlsZTogdHJhbnNpdGlvblN0eWxlLnZhbHVlIH0sXG4gICAgICAgICAgICAgICgpID0+IHBhbmVsXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSlcbiAgICAgICAgXVxuICAgICAgOiBbXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLXBhbmVsIHNjcm9sbCcsXG4gICAgICAgICAgICBzdHlsZTogdHJhbnNpdGlvblN0eWxlLnZhbHVlLFxuICAgICAgICAgICAga2V5OiBjb250ZW50S2V5LnZhbHVlLFxuICAgICAgICAgICAgcm9sZTogJ3RhYnBhbmVsJ1xuICAgICAgICAgIH0sIFsgcGFuZWwgXSlcbiAgICAgICAgXVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFuZWxDb250ZW50ICgpIHtcbiAgICBpZiAocGFuZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcmV0dXJuIHByb3BzLmFuaW1hdGVkID09PSB0cnVlXG4gICAgICA/IFsgaChUcmFuc2l0aW9uLCB7IG5hbWU6IHBhbmVsVHJhbnNpdGlvbi52YWx1ZSB9LCBnZXRQYW5lbENvbnRlbnRDaGlsZCkgXVxuICAgICAgOiBnZXRQYW5lbENvbnRlbnRDaGlsZCgpXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQYW5lbHNMaXN0IChzbG90cykge1xuICAgIHBhbmVscyA9IGdldE5vcm1hbGl6ZWRWTm9kZXMoXG4gICAgICBoU2xvdChzbG90cy5kZWZhdWx0LCBbXSlcbiAgICApLmZpbHRlcihcbiAgICAgIHBhbmVsID0+IHBhbmVsLnByb3BzICE9PSBudWxsXG4gICAgICAgICYmIHBhbmVsLnByb3BzLnNsb3QgPT09IHZvaWQgMFxuICAgICAgICAmJiBpc1ZhbGlkUGFuZWxOYW1lKHBhbmVsLnByb3BzLm5hbWUpID09PSB0cnVlXG4gICAgKVxuXG4gICAgcmV0dXJuIHBhbmVscy5sZW5ndGhcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhbmVscyAoKSB7XG4gICAgcmV0dXJuIHBhbmVsc1xuICB9XG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICBuZXh0OiBuZXh0UGFuZWwsXG4gICAgcHJldmlvdXM6IHByZXZpb3VzUGFuZWwsXG4gICAgZ29UbzogZ29Ub1BhbmVsXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBwYW5lbEluZGV4LFxuICAgIHBhbmVsRGlyZWN0aXZlcyxcblxuICAgIHVwZGF0ZVBhbmVsc0xpc3QsXG4gICAgdXBkYXRlUGFuZWxJbmRleCxcblxuICAgIGdldFBhbmVsQ29udGVudCxcbiAgICBnZXRFbmFibGVkUGFuZWxzLFxuICAgIGdldFBhbmVscyxcblxuICAgIGlzVmFsaWRQYW5lbE5hbWUsXG5cbiAgICBrZWVwQWxpdmVQcm9wcyxcbiAgICBuZWVkc1VuaXF1ZUtlZXBBbGl2ZVdyYXBwZXIsXG5cbiAgICBnb1RvUGFuZWxCeU9mZnNldCxcbiAgICBnb1RvUGFuZWwsXG5cbiAgICBuZXh0UGFuZWwsXG4gICAgcHJldmlvdXNQYW5lbFxuICB9XG59XG4iLCJpbXBvcnQgeyBoIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB1c2VQYW5lbENoaWxkUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wYW5lbC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRhYlBhbmVsJyxcblxuICBwcm9wczogdXNlUGFuZWxDaGlsZFByb3BzLFxuXG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogJ3EtdGFiLXBhbmVsJywgcm9sZTogJ3RhYnBhbmVsJyB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBpbmplY3QgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90LCBoVW5pcXVlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgdGltZWxpbmVLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGltZWxpbmVFbnRyeScsXG5cbiAgcHJvcHM6IHtcbiAgICBoZWFkaW5nOiBCb29sZWFuLFxuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2gzJ1xuICAgIH0sXG4gICAgc2lkZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3JpZ2h0JyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBbICdsZWZ0JywgJ3JpZ2h0JyBdLmluY2x1ZGVzKHYpXG4gICAgfSxcblxuICAgIGljb246IFN0cmluZyxcbiAgICBhdmF0YXI6IFN0cmluZyxcblxuICAgIGNvbG9yOiBTdHJpbmcsXG5cbiAgICB0aXRsZTogU3RyaW5nLFxuICAgIHN1YnRpdGxlOiBTdHJpbmcsXG4gICAgYm9keTogU3RyaW5nXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCAkdGltZWxpbmUgPSBpbmplY3QodGltZWxpbmVLZXksIGVtcHR5UmVuZGVyRm4pXG4gICAgaWYgKCR0aW1lbGluZSA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVRpbWVsaW5lRW50cnkgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUVRpbWVsaW5lJylcbiAgICAgIHJldHVybiBlbXB0eVJlbmRlckZuXG4gICAgfVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS10aW1lbGluZV9fZW50cnkgcS10aW1lbGluZV9fZW50cnktLSR7IHByb3BzLnNpZGUgfWBcbiAgICAgICsgKHByb3BzLmljb24gIT09IHZvaWQgMCB8fCBwcm9wcy5hdmF0YXIgIT09IHZvaWQgMCA/ICcgcS10aW1lbGluZV9fZW50cnktLWljb24nIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgZG90Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtdGltZWxpbmVfX2RvdCB0ZXh0LSR7IHByb3BzLmNvbG9yIHx8ICR0aW1lbGluZS5jb2xvciB9YFxuICAgIClcblxuICAgIGNvbnN0IHJldmVyc2UgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJHRpbWVsaW5lLmxheW91dCA9PT0gJ2NvbWZvcnRhYmxlJyAmJiAkdGltZWxpbmUuc2lkZSA9PT0gJ2xlZnQnXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gaFVuaXF1ZVNsb3Qoc2xvdHMuZGVmYXVsdCwgW10pXG5cbiAgICAgIGlmIChwcm9wcy5ib2R5ICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQudW5zaGlmdChwcm9wcy5ib2R5KVxuICAgICAgfVxuXG4gICAgICBpZiAocHJvcHMuaGVhZGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gW1xuICAgICAgICAgIGgoJ2RpdicpLFxuICAgICAgICAgIGgoJ2RpdicpLFxuICAgICAgICAgIGgoXG4gICAgICAgICAgICBwcm9wcy50YWcsXG4gICAgICAgICAgICB7IGNsYXNzOiAncS10aW1lbGluZV9faGVhZGluZy10aXRsZScgfSxcbiAgICAgICAgICAgIGNoaWxkXG4gICAgICAgICAgKVxuICAgICAgICBdXG5cbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtdGltZWxpbmVfX2hlYWRpbmcnXG4gICAgICAgIH0sIHJldmVyc2UudmFsdWUgPT09IHRydWUgPyBjb250ZW50LnJldmVyc2UoKSA6IGNvbnRlbnQpXG4gICAgICB9XG5cbiAgICAgIGxldCBkb3RcblxuICAgICAgaWYgKHByb3BzLmljb24gIT09IHZvaWQgMCkge1xuICAgICAgICBkb3QgPSBbXG4gICAgICAgICAgaChRSWNvbiwge1xuICAgICAgICAgICAgY2xhc3M6ICdyb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyJyxcbiAgICAgICAgICAgIG5hbWU6IHByb3BzLmljb25cbiAgICAgICAgICB9KVxuICAgICAgICBdXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChwcm9wcy5hdmF0YXIgIT09IHZvaWQgMCkge1xuICAgICAgICBkb3QgPSBbXG4gICAgICAgICAgaCgnaW1nJywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLXRpbWVsaW5lX19kb3QtaW1nJyxcbiAgICAgICAgICAgIHNyYzogcHJvcHMuYXZhdGFyXG4gICAgICAgICAgfSlcbiAgICAgICAgXVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb250ZW50ID0gW1xuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10aW1lbGluZV9fc3VidGl0bGUnIH0sIFtcbiAgICAgICAgICBoKCdzcGFuJywge30sIGhTbG90KHNsb3RzLnN1YnRpdGxlLCBbIHByb3BzLnN1YnRpdGxlIF0pKVxuICAgICAgICBdKSxcblxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiBkb3RDbGFzcy52YWx1ZSB9LCBkb3QpLFxuXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRpbWVsaW5lX19jb250ZW50JyB9LCBbXG4gICAgICAgICAgaCgnaDYnLCB7IGNsYXNzOiAncS10aW1lbGluZV9fdGl0bGUnIH0sIGhTbG90KHNsb3RzLnRpdGxlLCBbIHByb3BzLnRpdGxlIF0pKVxuICAgICAgICBdLmNvbmNhdChjaGlsZCkpXG4gICAgICBdXG5cbiAgICAgIHJldHVybiBoKCdsaScsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWVcbiAgICAgIH0sIHJldmVyc2UudmFsdWUgPT09IHRydWUgPyBjb250ZW50LnJldmVyc2UoKSA6IGNvbnRlbnQpXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIHByb3ZpZGUsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgdGltZWxpbmVLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGltZWxpbmUnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgY29sb3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdwcmltYXJ5J1xuICAgIH0sXG4gICAgc2lkZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3JpZ2h0JyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBbICdsZWZ0JywgJ3JpZ2h0JyBdLmluY2x1ZGVzKHYpXG4gICAgfSxcbiAgICBsYXlvdXQ6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdkZW5zZScsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnZGVuc2UnLCAnY29tZm9ydGFibGUnLCAnbG9vc2UnIF0uaW5jbHVkZXModilcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBwcm92aWRlKHRpbWVsaW5lS2V5LCBwcm9wcylcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtdGltZWxpbmUgcS10aW1lbGluZS0tJHsgcHJvcHMubGF5b3V0IH0gcS10aW1lbGluZS0tJHsgcHJvcHMubGF5b3V0IH0tLSR7IHByb3BzLnNpZGUgfWBcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS10aW1lbGluZS0tZGFyaycgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaCgndWwnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcbmltcG9ydCB1c2VQYW5lbCwgeyB1c2VQYW5lbFByb3BzLCB1c2VQYW5lbEVtaXRzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtcGFuZWwuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaERpciB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRhYlBhbmVscycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VQYW5lbFByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wc1xuICB9LFxuXG4gIGVtaXRzOiB1c2VQYW5lbEVtaXRzLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHZtLnByb3h5LiRxKVxuXG4gICAgY29uc3QgeyB1cGRhdGVQYW5lbHNMaXN0LCBnZXRQYW5lbENvbnRlbnQsIHBhbmVsRGlyZWN0aXZlcyB9ID0gdXNlUGFuZWwoKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS10YWItcGFuZWxzIHEtcGFuZWwtcGFyZW50J1xuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXRhYi1wYW5lbHMtLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB1cGRhdGVQYW5lbHNMaXN0KHNsb3RzKVxuXG4gICAgICByZXR1cm4gaERpcihcbiAgICAgICAgJ2RpdicsXG4gICAgICAgIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSxcbiAgICAgICAgZ2V0UGFuZWxDb250ZW50KCksXG4gICAgICAgICdwYW4nLFxuICAgICAgICBwcm9wcy5zd2lwZWFibGUsXG4gICAgICAgICgpID0+IHBhbmVsRGlyZWN0aXZlcy52YWx1ZVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDYXJkJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RpdidcbiAgICB9LFxuXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIGZsYXQ6IEJvb2xlYW4sXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtY2FyZCdcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1jYXJkLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLWNhcmQtLWJvcmRlcmVkJyA6ICcnKVxuICAgICAgKyAocHJvcHMuc3F1YXJlID09PSB0cnVlID8gJyBxLWNhcmQtLXNxdWFyZSBuby1ib3JkZXItcmFkaXVzJyA6ICcnKVxuICAgICAgKyAocHJvcHMuZmxhdCA9PT0gdHJ1ZSA/ICcgcS1jYXJkLS1mbGF0IG5vLXNoYWRvdycgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaChwcm9wcy50YWcsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZSh0KTooZT1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOmV8fHNlbGYpLmRheWpzX3BsdWdpbl9sb2NhbGl6ZWRGb3JtYXQ9dCgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciBlPXtMVFM6XCJoOm1tOnNzIEFcIixMVDpcImg6bW0gQVwiLEw6XCJNTS9ERC9ZWVlZXCIsTEw6XCJNTU1NIEQsIFlZWVlcIixMTEw6XCJNTU1NIEQsIFlZWVkgaDptbSBBXCIsTExMTDpcImRkZGQsIE1NTU0gRCwgWVlZWSBoOm1tIEFcIn07cmV0dXJuIGZ1bmN0aW9uKHQsbyxuKXt2YXIgcj1vLnByb3RvdHlwZSxpPXIuZm9ybWF0O24uZW4uZm9ybWF0cz1lLHIuZm9ybWF0PWZ1bmN0aW9uKHQpe3ZvaWQgMD09PXQmJih0PVwiWVlZWS1NTS1ERFRISDptbTpzc1pcIik7dmFyIG89dGhpcy4kbG9jYWxlKCkuZm9ybWF0cyxuPWZ1bmN0aW9uKHQsbyl7cmV0dXJuIHQucmVwbGFjZSgvKFxcW1teXFxdXStdKXwoTFRTP3xsezEsNH18THsxLDR9KS9nLChmdW5jdGlvbih0LG4scil7dmFyIGk9ciYmci50b1VwcGVyQ2FzZSgpO3JldHVybiBufHxvW3JdfHxlW3JdfHxvW2ldLnJlcGxhY2UoLyhcXFtbXlxcXV0rXSl8KE1NTU18TU18RER8ZGRkZCkvZywoZnVuY3Rpb24oZSx0LG8pe3JldHVybiB0fHxvLnNsaWNlKDEpfSkpfSkpfSh0LHZvaWQgMD09PW8/e306byk7cmV0dXJuIGkuY2FsbCh0aGlzLG4pfX19KSk7IiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgZ2V0Tm9ybWFsaXplZFZOb2RlcyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvdm0uanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQ2hhdE1lc3NhZ2UnLFxuXG4gIHByb3BzOiB7XG4gICAgc2VudDogQm9vbGVhbixcbiAgICBsYWJlbDogU3RyaW5nLFxuICAgIGJnQ29sb3I6IFN0cmluZyxcbiAgICB0ZXh0Q29sb3I6IFN0cmluZyxcbiAgICBuYW1lOiBTdHJpbmcsXG4gICAgYXZhdGFyOiBTdHJpbmcsXG4gICAgdGV4dDogQXJyYXksXG4gICAgc3RhbXA6IFN0cmluZyxcbiAgICBzaXplOiBTdHJpbmcsXG4gICAgbGFiZWxIdG1sOiBCb29sZWFuLFxuICAgIG5hbWVIdG1sOiBCb29sZWFuLFxuICAgIHRleHRIdG1sOiBCb29sZWFuLFxuICAgIHN0YW1wSHRtbDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3Qgb3AgPSBjb21wdXRlZCgoKSA9PiAocHJvcHMuc2VudCA9PT0gdHJ1ZSA/ICdzZW50JyA6ICdyZWNlaXZlZCcpKVxuXG4gICAgY29uc3QgdGV4dENsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLW1lc3NhZ2UtdGV4dC1jb250ZW50IHEtbWVzc2FnZS10ZXh0LWNvbnRlbnQtLSR7IG9wLnZhbHVlIH1gXG4gICAgICArIChwcm9wcy50ZXh0Q29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBwcm9wcy50ZXh0Q29sb3IgfWAgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBtZXNzYWdlQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtbWVzc2FnZS10ZXh0IHEtbWVzc2FnZS10ZXh0LS0keyBvcC52YWx1ZSB9YFxuICAgICAgKyAocHJvcHMuYmdDb2xvciAhPT0gdm9pZCAwID8gYCB0ZXh0LSR7IHByb3BzLmJnQ29sb3IgfWAgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBjb250YWluZXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1tZXNzYWdlLWNvbnRhaW5lciByb3cgaXRlbXMtZW5kIG5vLXdyYXAnXG4gICAgICArIChwcm9wcy5zZW50ID09PSB0cnVlID8gJyByZXZlcnNlJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IHNpemVDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChwcm9wcy5zaXplICE9PSB2b2lkIDAgPyBgY29sLSR7IHByb3BzLnNpemUgfWAgOiAnJykpXG5cbiAgICBjb25zdCBkb21Qcm9wcyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBtc2c6IHByb3BzLnRleHRIdG1sID09PSB0cnVlID8gJ2lubmVySFRNTCcgOiAndGV4dENvbnRlbnQnLFxuICAgICAgc3RhbXA6IHByb3BzLnN0YW1wSHRtbCA9PT0gdHJ1ZSA/ICdpbm5lckhUTUwnIDogJ3RleHRDb250ZW50JyxcbiAgICAgIG5hbWU6IHByb3BzLm5hbWVIdG1sID09PSB0cnVlID8gJ2lubmVySFRNTCcgOiAndGV4dENvbnRlbnQnLFxuICAgICAgbGFiZWw6IHByb3BzLmxhYmVsSHRtbCA9PT0gdHJ1ZSA/ICdpbm5lckhUTUwnIDogJ3RleHRDb250ZW50J1xuICAgIH0pKVxuXG4gICAgZnVuY3Rpb24gd3JhcFN0YW1wIChub2RlKSB7XG4gICAgICBpZiAoc2xvdHMuc3RhbXAgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gWyBub2RlLCBoKCdkaXYnLCB7IGNsYXNzOiAncS1tZXNzYWdlLXN0YW1wJyB9LCBzbG90cy5zdGFtcCgpKSBdXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5zdGFtcCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLW1lc3NhZ2Utc3RhbXAnLFxuICAgICAgICAgICAgWyBkb21Qcm9wcy52YWx1ZS5zdGFtcCBdOiBwcm9wcy5zdGFtcFxuICAgICAgICAgIH0pXG4gICAgICAgIF1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIFsgbm9kZSBdXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VGV4dCAoY29udGVudExpc3QsIHdpdGhTbG90cykge1xuICAgICAgY29uc3QgY29udGVudCA9IHdpdGhTbG90cyA9PT0gdHJ1ZVxuICAgICAgICA/IChjb250ZW50TGlzdC5sZW5ndGggPiAxID8gdGV4dCA9PiB0ZXh0IDogdGV4dCA9PiBoKCdkaXYnLCBbIHRleHQgXSkpXG4gICAgICAgIDogdGV4dCA9PiBoKCdkaXYnLCB7IFsgZG9tUHJvcHMudmFsdWUubXNnIF06IHRleHQgfSlcblxuICAgICAgcmV0dXJuIGNvbnRlbnRMaXN0Lm1hcCgobXNnLCBpbmRleCkgPT4gaCgnZGl2Jywge1xuICAgICAgICBrZXk6IGluZGV4LFxuICAgICAgICBjbGFzczogbWVzc2FnZUNsYXNzLnZhbHVlXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6IHRleHRDbGFzcy52YWx1ZSB9LCB3cmFwU3RhbXAoY29udGVudChtc2cpKSlcbiAgICAgIF0pKVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSBbXVxuXG4gICAgICBpZiAoc2xvdHMuYXZhdGFyICE9PSB2b2lkIDApIHtcbiAgICAgICAgY29udGFpbmVyLnB1c2goc2xvdHMuYXZhdGFyKCkpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChwcm9wcy5hdmF0YXIgIT09IHZvaWQgMCkge1xuICAgICAgICBjb250YWluZXIucHVzaChcbiAgICAgICAgICBoKCdpbWcnLCB7XG4gICAgICAgICAgICBjbGFzczogYHEtbWVzc2FnZS1hdmF0YXIgcS1tZXNzYWdlLWF2YXRhci0tJHsgb3AudmFsdWUgfWAsXG4gICAgICAgICAgICBzcmM6IHByb3BzLmF2YXRhcixcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY29uc3QgbXNnID0gW11cblxuICAgICAgaWYgKHNsb3RzLm5hbWUgIT09IHZvaWQgMCkge1xuICAgICAgICBtc2cucHVzaChcbiAgICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiBgcS1tZXNzYWdlLW5hbWUgcS1tZXNzYWdlLW5hbWUtLSR7IG9wLnZhbHVlIH1gIH0sIHNsb3RzLm5hbWUoKSlcbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAocHJvcHMubmFtZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIG1zZy5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiBgcS1tZXNzYWdlLW5hbWUgcS1tZXNzYWdlLW5hbWUtLSR7IG9wLnZhbHVlIH1gLFxuICAgICAgICAgICAgWyBkb21Qcm9wcy52YWx1ZS5uYW1lIF06IHByb3BzLm5hbWVcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGlmIChzbG90cy5kZWZhdWx0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgbXNnLnB1c2goXG4gICAgICAgICAgZ2V0VGV4dChcbiAgICAgICAgICAgIGdldE5vcm1hbGl6ZWRWTm9kZXMoc2xvdHMuZGVmYXVsdCgpKSxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHByb3BzLnRleHQgIT09IHZvaWQgMCkge1xuICAgICAgICBtc2cucHVzaChnZXRUZXh0KHByb3BzLnRleHQpKVxuICAgICAgfVxuXG4gICAgICBjb250YWluZXIucHVzaChcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogc2l6ZUNsYXNzLnZhbHVlIH0sIG1zZylcbiAgICAgIClcblxuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBpZiAoc2xvdHMubGFiZWwgIT09IHZvaWQgMCkge1xuICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLW1lc3NhZ2UtbGFiZWwnIH0sIHNsb3RzLmxhYmVsKCkpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHByb3BzLmxhYmVsICE9PSB2b2lkIDApIHtcbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtbWVzc2FnZS1sYWJlbCcsXG4gICAgICAgICAgICBbIGRvbVByb3BzLnZhbHVlLmxhYmVsIF06IHByb3BzLmxhYmVsXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfVxuXG4gICAgICBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiBjb250YWluZXJDbGFzcy52YWx1ZSB9LCBjb250YWluZXIpXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBgcS1tZXNzYWdlIHEtbWVzc2FnZS0keyBvcC52YWx1ZSB9YFxuICAgICAgfSwgY2hpbGQpXG4gICAgfVxuICB9XG59KVxuIiwiIWZ1bmN0aW9uKHQscyl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9cygpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUocyk6KHQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczp0fHxzZWxmKS5kYXlqc19wbHVnaW5fZHVyYXRpb249cygpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0LHMsbj0xZTMsaT02ZTQsZT0zNmU1LHI9ODY0ZTUsbz0vXFxbKFteXFxdXSspXXxZezEsNH18TXsxLDR9fER7MSwyfXxkezEsNH18SHsxLDJ9fGh7MSwyfXxhfEF8bXsxLDJ9fHN7MSwyfXxaezEsMn18U1NTL2csdT0zMTUzNmU2LGg9MjU5MmU2LGE9L14oLXxcXCspP1AoPzooWy0rXT9bMC05LC5dKilZKT8oPzooWy0rXT9bMC05LC5dKilNKT8oPzooWy0rXT9bMC05LC5dKilXKT8oPzooWy0rXT9bMC05LC5dKilEKT8oPzpUKD86KFstK10/WzAtOSwuXSopSCk/KD86KFstK10/WzAtOSwuXSopTSk/KD86KFstK10/WzAtOSwuXSopUyk/KT8kLyxkPXt5ZWFyczp1LG1vbnRoczpoLGRheXM6cixob3VyczplLG1pbnV0ZXM6aSxzZWNvbmRzOm4sbWlsbGlzZWNvbmRzOjEsd2Vla3M6NjA0OGU1fSxjPWZ1bmN0aW9uKHQpe3JldHVybiB0IGluc3RhbmNlb2YgcH0sZj1mdW5jdGlvbih0LHMsbil7cmV0dXJuIG5ldyBwKHQsbixzLiRsKX0sbT1mdW5jdGlvbih0KXtyZXR1cm4gcy5wKHQpK1wic1wifSxsPWZ1bmN0aW9uKHQpe3JldHVybiB0PDB9LCQ9ZnVuY3Rpb24odCl7cmV0dXJuIGwodCk/TWF0aC5jZWlsKHQpOk1hdGguZmxvb3IodCl9LHk9ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGguYWJzKHQpfSxnPWZ1bmN0aW9uKHQscyl7cmV0dXJuIHQ/bCh0KT97bmVnYXRpdmU6ITAsZm9ybWF0OlwiXCIreSh0KStzfTp7bmVnYXRpdmU6ITEsZm9ybWF0OlwiXCIrdCtzfTp7bmVnYXRpdmU6ITEsZm9ybWF0OlwiXCJ9fSxwPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gbCh0LHMsbil7dmFyIGk9dGhpcztpZih0aGlzLiRkPXt9LHRoaXMuJGw9bix2b2lkIDA9PT10JiYodGhpcy4kbXM9MCx0aGlzLnBhcnNlRnJvbU1pbGxpc2Vjb25kcygpKSxzKXJldHVybiBmKHQqZFttKHMpXSx0aGlzKTtpZihcIm51bWJlclwiPT10eXBlb2YgdClyZXR1cm4gdGhpcy4kbXM9dCx0aGlzLnBhcnNlRnJvbU1pbGxpc2Vjb25kcygpLHRoaXM7aWYoXCJvYmplY3RcIj09dHlwZW9mIHQpcmV0dXJuIE9iamVjdC5rZXlzKHQpLmZvckVhY2goKGZ1bmN0aW9uKHMpe2kuJGRbbShzKV09dFtzXX0pKSx0aGlzLmNhbE1pbGxpc2Vjb25kcygpLHRoaXM7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQpe3ZhciBlPXQubWF0Y2goYSk7aWYoZSl7dmFyIHI9ZS5zbGljZSgyKS5tYXAoKGZ1bmN0aW9uKHQpe3JldHVybiBudWxsIT10P051bWJlcih0KTowfSkpO3JldHVybiB0aGlzLiRkLnllYXJzPXJbMF0sdGhpcy4kZC5tb250aHM9clsxXSx0aGlzLiRkLndlZWtzPXJbMl0sdGhpcy4kZC5kYXlzPXJbM10sdGhpcy4kZC5ob3Vycz1yWzRdLHRoaXMuJGQubWludXRlcz1yWzVdLHRoaXMuJGQuc2Vjb25kcz1yWzZdLHRoaXMuY2FsTWlsbGlzZWNvbmRzKCksdGhpc319cmV0dXJuIHRoaXN9dmFyIHk9bC5wcm90b3R5cGU7cmV0dXJuIHkuY2FsTWlsbGlzZWNvbmRzPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpczt0aGlzLiRtcz1PYmplY3Qua2V5cyh0aGlzLiRkKS5yZWR1Y2UoKGZ1bmN0aW9uKHMsbil7cmV0dXJuIHMrKHQuJGRbbl18fDApKmRbbl19KSwwKX0seS5wYXJzZUZyb21NaWxsaXNlY29uZHM9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLiRtczt0aGlzLiRkLnllYXJzPSQodC91KSx0JT11LHRoaXMuJGQubW9udGhzPSQodC9oKSx0JT1oLHRoaXMuJGQuZGF5cz0kKHQvciksdCU9cix0aGlzLiRkLmhvdXJzPSQodC9lKSx0JT1lLHRoaXMuJGQubWludXRlcz0kKHQvaSksdCU9aSx0aGlzLiRkLnNlY29uZHM9JCh0L24pLHQlPW4sdGhpcy4kZC5taWxsaXNlY29uZHM9dH0seS50b0lTT1N0cmluZz1mdW5jdGlvbigpe3ZhciB0PWcodGhpcy4kZC55ZWFycyxcIllcIikscz1nKHRoaXMuJGQubW9udGhzLFwiTVwiKSxuPSt0aGlzLiRkLmRheXN8fDA7dGhpcy4kZC53ZWVrcyYmKG4rPTcqdGhpcy4kZC53ZWVrcyk7dmFyIGk9ZyhuLFwiRFwiKSxlPWcodGhpcy4kZC5ob3VycyxcIkhcIikscj1nKHRoaXMuJGQubWludXRlcyxcIk1cIiksbz10aGlzLiRkLnNlY29uZHN8fDA7dGhpcy4kZC5taWxsaXNlY29uZHMmJihvKz10aGlzLiRkLm1pbGxpc2Vjb25kcy8xZTMpO3ZhciB1PWcobyxcIlNcIiksaD10Lm5lZ2F0aXZlfHxzLm5lZ2F0aXZlfHxpLm5lZ2F0aXZlfHxlLm5lZ2F0aXZlfHxyLm5lZ2F0aXZlfHx1Lm5lZ2F0aXZlLGE9ZS5mb3JtYXR8fHIuZm9ybWF0fHx1LmZvcm1hdD9cIlRcIjpcIlwiLGQ9KGg/XCItXCI6XCJcIikrXCJQXCIrdC5mb3JtYXQrcy5mb3JtYXQraS5mb3JtYXQrYStlLmZvcm1hdCtyLmZvcm1hdCt1LmZvcm1hdDtyZXR1cm5cIlBcIj09PWR8fFwiLVBcIj09PWQ/XCJQMERcIjpkfSx5LnRvSlNPTj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnRvSVNPU3RyaW5nKCl9LHkuZm9ybWF0PWZ1bmN0aW9uKHQpe3ZhciBuPXR8fFwiWVlZWS1NTS1ERFRISDptbTpzc1wiLGk9e1k6dGhpcy4kZC55ZWFycyxZWTpzLnModGhpcy4kZC55ZWFycywyLFwiMFwiKSxZWVlZOnMucyh0aGlzLiRkLnllYXJzLDQsXCIwXCIpLE06dGhpcy4kZC5tb250aHMsTU06cy5zKHRoaXMuJGQubW9udGhzLDIsXCIwXCIpLEQ6dGhpcy4kZC5kYXlzLEREOnMucyh0aGlzLiRkLmRheXMsMixcIjBcIiksSDp0aGlzLiRkLmhvdXJzLEhIOnMucyh0aGlzLiRkLmhvdXJzLDIsXCIwXCIpLG06dGhpcy4kZC5taW51dGVzLG1tOnMucyh0aGlzLiRkLm1pbnV0ZXMsMixcIjBcIiksczp0aGlzLiRkLnNlY29uZHMsc3M6cy5zKHRoaXMuJGQuc2Vjb25kcywyLFwiMFwiKSxTU1M6cy5zKHRoaXMuJGQubWlsbGlzZWNvbmRzLDMsXCIwXCIpfTtyZXR1cm4gbi5yZXBsYWNlKG8sKGZ1bmN0aW9uKHQscyl7cmV0dXJuIHN8fFN0cmluZyhpW3RdKX0pKX0seS5hcz1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy4kbXMvZFttKHQpXX0seS5nZXQ9ZnVuY3Rpb24odCl7dmFyIHM9dGhpcy4kbXMsbj1tKHQpO3JldHVyblwibWlsbGlzZWNvbmRzXCI9PT1uP3MlPTFlMzpzPVwid2Vla3NcIj09PW4/JChzL2Rbbl0pOnRoaXMuJGRbbl0sMD09PXM/MDpzfSx5LmFkZD1mdW5jdGlvbih0LHMsbil7dmFyIGk7cmV0dXJuIGk9cz90KmRbbShzKV06Yyh0KT90LiRtczpmKHQsdGhpcykuJG1zLGYodGhpcy4kbXMraSoobj8tMToxKSx0aGlzKX0seS5zdWJ0cmFjdD1mdW5jdGlvbih0LHMpe3JldHVybiB0aGlzLmFkZCh0LHMsITApfSx5LmxvY2FsZT1mdW5jdGlvbih0KXt2YXIgcz10aGlzLmNsb25lKCk7cmV0dXJuIHMuJGw9dCxzfSx5LmNsb25lPWZ1bmN0aW9uKCl7cmV0dXJuIGYodGhpcy4kbXMsdGhpcyl9LHkuaHVtYW5pemU9ZnVuY3Rpb24ocyl7cmV0dXJuIHQoKS5hZGQodGhpcy4kbXMsXCJtc1wiKS5sb2NhbGUodGhpcy4kbCkuZnJvbU5vdyghcyl9LHkubWlsbGlzZWNvbmRzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0KFwibWlsbGlzZWNvbmRzXCIpfSx5LmFzTWlsbGlzZWNvbmRzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYXMoXCJtaWxsaXNlY29uZHNcIil9LHkuc2Vjb25kcz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmdldChcInNlY29uZHNcIil9LHkuYXNTZWNvbmRzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuYXMoXCJzZWNvbmRzXCIpfSx5Lm1pbnV0ZXM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5nZXQoXCJtaW51dGVzXCIpfSx5LmFzTWludXRlcz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmFzKFwibWludXRlc1wiKX0seS5ob3Vycz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmdldChcImhvdXJzXCIpfSx5LmFzSG91cnM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5hcyhcImhvdXJzXCIpfSx5LmRheXM9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5nZXQoXCJkYXlzXCIpfSx5LmFzRGF5cz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmFzKFwiZGF5c1wiKX0seS53ZWVrcz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmdldChcIndlZWtzXCIpfSx5LmFzV2Vla3M9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5hcyhcIndlZWtzXCIpfSx5Lm1vbnRocz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmdldChcIm1vbnRoc1wiKX0seS5hc01vbnRocz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmFzKFwibW9udGhzXCIpfSx5LnllYXJzPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZ2V0KFwieWVhcnNcIil9LHkuYXNZZWFycz1mdW5jdGlvbigpe3JldHVybiB0aGlzLmFzKFwieWVhcnNcIil9LGx9KCk7cmV0dXJuIGZ1bmN0aW9uKG4saSxlKXt0PWUscz1lKCkuJHV0aWxzKCksZS5kdXJhdGlvbj1mdW5jdGlvbih0LHMpe3ZhciBuPWUubG9jYWxlKCk7cmV0dXJuIGYodCx7JGw6bn0scyl9LGUuaXNEdXJhdGlvbj1jO3ZhciByPWkucHJvdG90eXBlLmFkZCxvPWkucHJvdG90eXBlLnN1YnRyYWN0O2kucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0LHMpe3JldHVybiBjKHQpJiYodD10LmFzTWlsbGlzZWNvbmRzKCkpLHIuYmluZCh0aGlzKSh0LHMpfSxpLnByb3RvdHlwZS5zdWJ0cmFjdD1mdW5jdGlvbih0LHMpe3JldHVybiBjKHQpJiYodD10LmFzTWlsbGlzZWNvbmRzKCkpLG8uYmluZCh0aGlzKSh0LHMpfX19KSk7IiwiPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxxLWNoYXQtbWVzc2FnZVxuICAgICAgOnRleHQ9XCJlbnRyeS50ZXh0XCJcbiAgICAgIDpzZW50PVwiZW50cnkuZnJvbV9hcHBcIlxuICAgICAgdGV4dC1jb2xvcj1cIndoaXRlXCJcbiAgICAgIDpiZy1jb2xvcj1cImVudHJ5LmNvbG9yID8/ICdwcmltYXJ5J1wiXG4gICAgICB2LWZvcj1cImVudHJ5IGluIGVudHJpZXNcIlxuICAgICAgOmtleT1cImVudHJ5LmlkXCJcbiAgICA+XG4gICAgICA8dGVtcGxhdGUgdi1zbG90Om5hbWU+XG4gICAgICAgIDxzcGFuIHYtaWY9XCJlbnRyeS5mcm9tX2FwcFwiPllvdXIgQXBwbGljYXRpb248L3NwYW4+XG4gICAgICAgIDxzcGFuIHYtZWxzZT57eyBydW4uYWxpYXMgfX08L3NwYW4+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDpzdGFtcD5cbiAgICAgICAgPHNwYW4+e3sgTWF0aC5yb3VuZChlbnRyeS50aW1lX2ludG9fam9iLmFzU2Vjb25kcygpICogMTApIC8gMTAgfX0gc2Vjb25kczwvc3Bhbj48L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtc2xvdDphdmF0YXI+XG4gICAgICAgIDxxLWF2YXRhciBjb2xvcj1cInRlYWxcIiBjbGFzcz1cInEtbWEtc21cIiB0ZXh0LWNvbG9yPVwid2hpdGVcIiB2LWlmPVwiZW50cnkuZnJvbV9hcHBcIiA6aWNvbj1cImVudHJ5Lmljb25cIj48L3EtYXZhdGFyPlxuICAgICAgICA8cS1hdmF0YXIgY29sb3I9XCJ0ZWFsXCIgY2xhc3M9XCJxLW1hLXNtXCIgdGV4dC1jb2xvcj1cIndoaXRlXCIgdi1lbHNlIDppY29uPVwiZW50cnkuaWNvblwiPjwvcS1hdmF0YXI+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvcS1jaGF0LW1lc3NhZ2U+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7Y29tcHV0ZWQsIGRlZmluZVByb3BzfSBmcm9tICd2dWUnO1xuaW1wb3J0IHtKb2JSdW4sIE1lc3NhZ2VUeXBlLCBKb2JFeGNlcHRpb259IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuaW1wb3J0IGR1cmF0aW9uLCB7RHVyYXRpb259IGZyb20gJ2RheWpzL3BsdWdpbi9kdXJhdGlvbic7XG5pbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5cbmRheWpzLmV4dGVuZChkdXJhdGlvbik7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8e1xuICBydW46IEpvYlJ1blxufT4oKTtcblxuaW50ZXJmYWNlIFRpbWVsaW5lRW50cnkge1xuICBpZDogc3RyaW5nXG4gIHRleHQ6IHN0cmluZ1tdXG4gIGZyb21fYXBwOiBib29sZWFuXG4gIHRpbWVfaW50b19qb2I6IER1cmF0aW9uLFxuICBjb2xvcjogc3RyaW5nIHwgbnVsbCxcbiAgaWNvbjogc3RyaW5nXG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZVRpbWVJbnRvSm9iKHRpbWU6IERhdGUpOiBEdXJhdGlvbiB7XG4gIGxldCBvcmlnaW5hbERhdGUgPSBwcm9wcy5ydW4uY3JlYXRlZF9hdDtcbiAgcmV0dXJuIGRheWpzLmR1cmF0aW9uKHtcbiAgICBtaWxsaXNlY29uZHM6IGRheWpzKHRpbWUpLmRpZmYob3JpZ2luYWxEYXRlLCAnbWlsbGlzZWNvbmQnKVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29sb3VyRnJvbU1lc3NhZ2VUeXBlKHR5cGU6IE1lc3NhZ2VUeXBlKTogc3RyaW5nIHtcbiAgaWYgKHR5cGUgPT09IE1lc3NhZ2VUeXBlLkluZm8pIHtcbiAgICByZXR1cm4gJ2luZm8nO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IE1lc3NhZ2VUeXBlLlN1Y2Nlc3MpIHtcbiAgICByZXR1cm4gJ3Bvc2l0aXZlJztcbiAgfSBlbHNlIGlmICh0eXBlID09PSBNZXNzYWdlVHlwZS5FcnJvcikge1xuICAgIHJldHVybiAnbmVnYXRpdmUnO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09IE1lc3NhZ2VUeXBlLldhcm5pbmcpIHtcbiAgICByZXR1cm4gJ3dhcm5pbmcnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnYWNjZW50JztcbiAgfVxufVxuXG5jb25zdCBlbnRyaWVzID0gY29tcHV0ZWQoKCk6IFRpbWVsaW5lRW50cnlbXSA9PiB7XG4gIGxldCByYXdFbnRyaWVzOiBUaW1lbGluZUVudHJ5W10gPSBbXTtcbiAgZm9yIChsZXQgbWVzc2FnZSBvZiBwcm9wcy5ydW4ubWVzc2FnZXMpIHtcbiAgICByYXdFbnRyaWVzLnB1c2goe1xuICAgICAgZnJvbV9hcHA6IGZhbHNlLFxuICAgICAgaWQ6ICdtZXNzYWdlLScgKyBtZXNzYWdlLmlkLnRvU3RyaW5nKCksXG4gICAgICB0ZXh0OiBbbWVzc2FnZS5tZXNzYWdlXSxcbiAgICAgIHRpbWVfaW50b19qb2I6IGNhbGN1bGF0ZVRpbWVJbnRvSm9iKG1lc3NhZ2UuY3JlYXRlZF9hdCksXG4gICAgICBjb2xvcjogZ2V0Q29sb3VyRnJvbU1lc3NhZ2VUeXBlKG1lc3NhZ2UudHlwZSksXG4gICAgICBpY29uOiAnY2hhdCcsXG4gICAgfSk7XG4gIH1cbiAgaWYocHJvcHMucnVuLmV4Y2VwdGlvbiAhPT0gbnVsbCkge1xuICAgIHJhd0VudHJpZXMucHVzaCh7XG4gICAgICBmcm9tX2FwcDogZmFsc2UsXG4gICAgICBpZDogJ2V4Y2VwdGlvbi0nICsgcHJvcHMucnVuLmV4Y2VwdGlvbi5pZC50b1N0cmluZygpLFxuICAgICAgdGV4dDogWydBbiBleGNlcHRpb24gb2NjdXJyZWQnLCBwcm9wcy5ydW4uZXhjZXB0aW9uLm1lc3NhZ2VdLFxuICAgICAgdGltZV9pbnRvX2pvYjogY2FsY3VsYXRlVGltZUludG9Kb2IocHJvcHMucnVuLmV4Y2VwdGlvbi5jcmVhdGVkX2F0KSxcbiAgICAgIGNvbG9yOiAnbmVnYXRpdmUnLFxuICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICB9KTtcbiAgfVxuICBmb3IgKGxldCBzdGF0dXMgb2YgcHJvcHMucnVuLnN0YXR1c2VzKSB7XG4gICAgcmF3RW50cmllcy5wdXNoKHtcbiAgICAgIGZyb21fYXBwOiBmYWxzZSxcbiAgICAgIGlkOiAnc3RhdHVzLScgKyBzdGF0dXMuaWQudG9TdHJpbmcoKSxcbiAgICAgIHRleHQ6IFtcbiAgICAgICAgJ1N0YXR1cyBjaGFuZ2VkIHRvICcgKyBzdGF0dXMuc3RhdHVzXG4gICAgICBdLFxuICAgICAgdGltZV9pbnRvX2pvYjogY2FsY3VsYXRlVGltZUludG9Kb2Ioc3RhdHVzLmNyZWF0ZWRfYXQpLFxuICAgICAgY29sb3I6IG51bGwsXG4gICAgICBpY29uOiAnbW92ZV9kb3duJ1xuICAgIH0pO1xuICB9XG4gIGZvciAobGV0IHNpZ25hbCBvZiBwcm9wcy5ydW4uc2lnbmFscykge1xuICAgIHJhd0VudHJpZXMucHVzaCh7XG4gICAgICBmcm9tX2FwcDogdHJ1ZSxcbiAgICAgIGlkOiAnc2lnbmFsLWRpc3BhdGNoZWQtJyArIHNpZ25hbC5pZC50b1N0cmluZygpLFxuICAgICAgdGV4dDogW1xuICAgICAgICAnU2lnbmFsICcgKyBzaWduYWwuc2lnbmFsICsgJyBzZW50ICgjJyArIHNpZ25hbC5pZC50b1N0cmluZygpICsgJyknXG4gICAgICBdLmNvbmNhdChcbiAgICAgICAgT2JqZWN0LmtleXMoc2lnbmFsLnBhcmFtZXRlcnMpXG4gICAgICAgICAgLm1hcCgoa2V5KTogc3RyaW5nID0+IHtcbiAgICAgICAgICAgIHJldHVybiAnUGFzc2luZyBwYXJhbWV0ZXIgXFwnJyArIGtleSArICdcXCcgd2l0aCB2YWx1ZSBcXCcnICsgc2lnbmFsLnBhcmFtZXRlcnNba2V5XSArICdcXCcnXG4gICAgICAgICAgfSlcbiAgICAgICksXG4gICAgICB0aW1lX2ludG9fam9iOiBjYWxjdWxhdGVUaW1lSW50b0pvYihzaWduYWwuY3JlYXRlZF9hdCksXG4gICAgICBjb2xvcjogbnVsbCxcbiAgICAgIGljb246ICdjb25uZWN0X3dpdGhvdXRfY29udGFjdCdcbiAgICB9KTtcbiAgICBpZihzaWduYWwuaGFuZGxlZF9hdCAhPT0gbnVsbCkge1xuICAgICAgcmF3RW50cmllcy5wdXNoKHtcbiAgICAgICAgZnJvbV9hcHA6IGZhbHNlLFxuICAgICAgICBpZDogJ3NpZ25hbC1oYW5kbGVkLScgKyBzaWduYWwuaWQudG9TdHJpbmcoKSxcbiAgICAgICAgdGV4dDogW1xuICAgICAgICAgICdIYW5kbGVkIHNpZ25hbCAnICsgc2lnbmFsLnNpZ25hbCArICcgKCMnICsgc2lnbmFsLmlkICsgJyknXG4gICAgICAgIF0uY29uY2F0KHNpZ25hbC5jYW5jZWxfam9iID8gWydUaGlzIGNhdXNlZCB0aGUgam9iIHRvIGJlIGNhbmNlbGxlZC4nXSA6IFtdKSxcbiAgICAgICAgdGltZV9pbnRvX2pvYjogY2FsY3VsYXRlVGltZUludG9Kb2Ioc2lnbmFsLmhhbmRsZWRfYXQpLFxuICAgICAgICBjb2xvcjogc2lnbmFsLmNhbmNlbF9qb2IgPyAnd2FybmluZycgOiBudWxsLFxuICAgICAgICBpY29uOiAnY29ubmVjdF93aXRob3V0X2NvbnRhY3QnXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmF3RW50cmllcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgcmV0dXJuIGEudGltZV9pbnRvX2pvYi5hc01pbGxpc2Vjb25kcygpIC0gYi50aW1lX2ludG9fam9iLmFzTWlsbGlzZWNvbmRzKClcbiAgfSk7XG4gIHJldHVybiByYXdFbnRyaWVzO1xufSk7XG5cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiaW1wb3J0IHsgaCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5cbmNvbnN0IHNwYWNlID0gaCgnZGl2JywgeyBjbGFzczogJ3Etc3BhY2UnIH0pXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRU3BhY2UnLFxuXG4gIHNldHVwICgpIHtcbiAgICByZXR1cm4gKCkgPT4gc3BhY2VcbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlQWxpZ24sIHsgdXNlQWxpZ25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWFsaWduLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQ2FyZEFjdGlvbnMnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQWxpZ25Qcm9wcyxcbiAgICB2ZXJ0aWNhbDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgYWxpZ25DbGFzcyA9IHVzZUFsaWduKHByb3BzKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1jYXJkX19hY3Rpb25zICR7IGFsaWduQ2xhc3MudmFsdWUgfWBcbiAgICAgICsgYCBxLWNhcmRfX2FjdGlvbnMtLSR7IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3ZlcnQgY29sdW1uJyA6ICdob3JpeiByb3cnIH1gXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNhcmRTZWN0aW9uJyxcblxuICBwcm9wczoge1xuICAgIHRhZzoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RpdidcbiAgICB9LFxuXG4gICAgaG9yaXpvbnRhbDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1jYXJkX19zZWN0aW9uJ1xuICAgICAgKyBgIHEtY2FyZF9fc2VjdGlvbi0tJHsgcHJvcHMuaG9yaXpvbnRhbCA9PT0gdHJ1ZSA/ICdob3JpeiByb3cgbm8td3JhcCcgOiAndmVydCcgfWBcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaChwcm9wcy50YWcsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBnZXRQYXJlbnRQcm94eSB9IGZyb20gJy4vdm0uanMnXG5cbmV4cG9ydCBjb25zdCBwb3J0YWxQcm94eUxpc3QgPSBbXVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UG9ydGFsUHJveHkgKGVsKSB7XG4gIHJldHVybiBwb3J0YWxQcm94eUxpc3QuZmluZChwcm94eSA9PlxuICAgIHByb3h5LmNvbnRlbnRFbCAhPT0gbnVsbFxuICAgICYmIHByb3h5LmNvbnRlbnRFbC5jb250YWlucyhlbClcbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VQb3J0YWxNZW51cyAocHJveHksIGV2dCkge1xuICBkbyB7XG4gICAgaWYgKHByb3h5LiRvcHRpb25zLm5hbWUgPT09ICdRTWVudScpIHtcbiAgICAgIHByb3h5LmhpZGUoZXZ0KVxuXG4gICAgICAvLyBpcyB0aGlzIGEgcG9pbnQgb2Ygc2VwYXJhdGlvbj9cbiAgICAgIGlmIChwcm94eS4kcHJvcHMuc2VwYXJhdGVDbG9zZVBvcHVwID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBnZXRQYXJlbnRQcm94eShwcm94eSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocHJveHkuX19xUG9ydGFsID09PSB0cnVlKSB7XG4gICAgICAvLyB0cmVhdCBpdCBhcyBwb2ludCBvZiBzZXBhcmF0aW9uIGlmIHBhcmVudCBpcyBRUG9wdXBQcm94eVxuICAgICAgLy8gKHNvIG1vYmlsZSBtYXRjaGVzIGRlc2t0b3AgYmVoYXZpb3IpXG4gICAgICAvLyBhbmQgaGlkZSBpdCB0b29cbiAgICAgIGNvbnN0IHBhcmVudCA9IGdldFBhcmVudFByb3h5KHByb3h5KVxuXG4gICAgICBpZiAocGFyZW50ICE9PSB2b2lkIDAgJiYgcGFyZW50LiRvcHRpb25zLm5hbWUgPT09ICdRUG9wdXBQcm94eScpIHtcbiAgICAgICAgcHJveHkuaGlkZShldnQpXG4gICAgICAgIHJldHVybiBwYXJlbnRcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJveHlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcm94eSA9IGdldFBhcmVudFByb3h5KHByb3h5KVxuICB9IHdoaWxlIChwcm94eSAhPT0gdm9pZCAwICYmIHByb3h5ICE9PSBudWxsKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VQb3J0YWxzIChwcm94eSwgZXZ0LCBkZXB0aCkge1xuICB3aGlsZSAoZGVwdGggIT09IDAgJiYgcHJveHkgIT09IHZvaWQgMCAmJiBwcm94eSAhPT0gbnVsbCkge1xuICAgIGlmIChwcm94eS5fX3FQb3J0YWwgPT09IHRydWUpIHtcbiAgICAgIGRlcHRoLS1cblxuICAgICAgaWYgKHByb3h5LiRvcHRpb25zLm5hbWUgPT09ICdRTWVudScpIHtcbiAgICAgICAgcHJveHkgPSBjbG9zZVBvcnRhbE1lbnVzKHByb3h5LCBldnQpXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHByb3h5LmhpZGUoZXZ0KVxuICAgIH1cblxuICAgIHByb3h5ID0gZ2V0UGFyZW50UHJveHkocHJveHkpXG4gIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZURpcmVjdGl2ZSB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgY2xvc2VQb3J0YWxzLCBnZXRQb3J0YWxQcm94eSB9IGZyb20gJy4uL3V0aWxzL3ByaXZhdGUvcG9ydGFsLmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlIH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9rZXktY29tcG9zaXRpb24uanMnXG5pbXBvcnQgZ2V0U1NSUHJvcHMgZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG4vKlxuICogZGVwdGhcbiAqICAgPCAwICAtLT4gY2xvc2UgYWxsIGNoYWluXG4gKiAgIDAgICAgLS0+IGRpc2FibGVkXG4gKiAgID4gMCAgLS0+IGNsb3NlIGNoYWluIHVwIHRvIE4gcGFyZW50XG4gKi9cblxuZnVuY3Rpb24gZ2V0RGVwdGggKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh2YWx1ZSA9PT0gdHJ1ZSB8fCB2YWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIGNvbnN0IGRlcHRoID0gcGFyc2VJbnQodmFsdWUsIDEwKVxuICByZXR1cm4gaXNOYU4oZGVwdGgpID8gMCA6IGRlcHRoXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURpcmVjdGl2ZShfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7IG5hbWU6ICdjbG9zZS1wb3B1cCcsIGdldFNTUlByb3BzIH1cbiAgOiB7XG4gICAgICBuYW1lOiAnY2xvc2UtcG9wdXAnLFxuXG4gICAgICBiZWZvcmVNb3VudCAoZWwsIHsgdmFsdWUgfSkge1xuICAgICAgICBjb25zdCBjdHggPSB7XG4gICAgICAgICAgZGVwdGg6IGdldERlcHRoKHZhbHVlKSxcblxuICAgICAgICAgIGhhbmRsZXIgKGV2dCkge1xuICAgICAgICAgICAgLy8gYWxsb3cgQGNsaWNrIHRvIGJlIGVtaXR0ZWRcbiAgICAgICAgICAgIGN0eC5kZXB0aCAhPT0gMCAmJiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcHJveHkgPSBnZXRQb3J0YWxQcm94eShlbClcbiAgICAgICAgICAgICAgaWYgKHByb3h5ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBjbG9zZVBvcnRhbHMocHJveHksIGV2dCwgY3R4LmRlcHRoKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBoYW5kbGVyS2V5IChldnQpIHtcbiAgICAgICAgICAgIGlzS2V5Q29kZShldnQsIDEzKSA9PT0gdHJ1ZSAmJiBjdHguaGFuZGxlcihldnQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuX19xY2xvc2Vwb3B1cCA9IGN0eFxuXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmhhbmRsZXIpXG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmhhbmRsZXJLZXkpXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGVkIChlbCwgeyB2YWx1ZSwgb2xkVmFsdWUgfSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICAgICAgZWwuX19xY2xvc2Vwb3B1cC5kZXB0aCA9IGdldERlcHRoKHZhbHVlKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVVbm1vdW50IChlbCkge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3FjbG9zZXBvcHVwXG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY3R4LmhhbmRsZXIpXG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY3R4LmhhbmRsZXJLZXkpXG4gICAgICAgIGRlbGV0ZSBlbC5fX3FjbG9zZXBvcHVwXG4gICAgICB9XG4gICAgfVxuKVxuIiwiPHRlbXBsYXRlPlxuICA8cS1jYXJkIHYtaWY9XCJleGNlcHRpb24gIT09IG51bGxcIj5cbiAgICA8cS1jYXJkLWFjdGlvbnMgdi1pZj1cInByb3BzLmV4Y2VwdGlvbnMubGVuZ3RoID4gMVwiPlxuICAgICAgPHEtYnRuIGZsYXRcbiAgICAgICAgICAgICB2LWlmPVwiaW5kZXhUb1ZpZXcgIT09IG51bGwgJiYgaW5kZXhUb1ZpZXcgIT09IHVuZGVmaW5lZCAmJiBpbmRleFRvVmlldyA8IChwcm9wcy5leGNlcHRpb25zLmxlbmd0aCAtIDEpXCJcbiAgICAgICAgICAgICBAY2xpY2s9XCJpbmRleFRvVmlldysrXCI+UHJldmlvdXMgZXhjZXB0aW9uXG4gICAgICA8L3EtYnRuPlxuICAgICAgPHEtc3BhY2U+PC9xLXNwYWNlPlxuICAgICAgPHEtYnRuIGZsYXQgdi1pZj1cImluZGV4VG9WaWV3ICE9PSBudWxsICYmIGluZGV4VG9WaWV3ICE9PSB1bmRlZmluZWQgJiYgaW5kZXhUb1ZpZXcgIT09IDBcIlxuICAgICAgICAgICAgIEBjbGljaz1cImluZGV4VG9WaWV3LS1cIj5OZXh0IGV4Y2VwdGlvblxuICAgICAgPC9xLWJ0bj5cbiAgICA8L3EtY2FyZC1hY3Rpb25zPlxuXG4gICAgPHEtY2FyZC1zZWN0aW9uPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj57e2V4Y2VwdGlvbi5jb2RlfX0gfCB7e2V4Y2VwdGlvbi5tZXNzYWdlfX08L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LXN1YnRpdGxlMlwiPnt7IGV4Y2VwdGlvbi5maWxlIH19Ont7IGV4Y2VwdGlvbi5saW5lIH19PC9kaXY+PC9xLWNhcmQtc2VjdGlvbj5cblxuXG4gICAgPHEtY2FyZC1zZWN0aW9uIGNsYXNzPVwicS1wdC1ub25lXCI+XG4gICAgICA8cS1saXN0PlxuICAgICAgICA8cS1pdGVtIHYtZm9yPVwiKHRyYWNlLCBpbmRleCkgaW4gZXhjZXB0aW9uLnN0YWNrX3RyYWNlXCIgOmtleT1cImluZGV4XCI+XG4gICAgICAgICAgPHEtaXRlbS1zZWN0aW9uIHNpZGUgdG9wPlxuICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPiN7eyBpbmRleCB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHRyYWNlLmZpbGUgfX06e3sgdHJhY2UubGluZSB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uIGxpbmVzPVwiMlwiPnt7IHRyYWNlLmNsYXNzIH19e3sgdHJhY2UudHlwZSB9fXt7IHRyYWNlLmZ1bmN0aW9uIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuXG4gICAgICAgIDwvcS1pdGVtPlxuXG4gICAgICAgIDxxLXNlcGFyYXRvciBzcGFjZWQgaW5zZXQvPlxuICAgICAgPC9xLWxpc3Q+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cblxuICAgIDxxLWNhcmQtYWN0aW9ucyBhbGlnbj1cInJpZ2h0XCI+XG4gICAgICA8cS1idG4gZmxhdCBsYWJlbD1cIkNsb3NlXCIgY29sb3I9XCJwcmltYXJ5XCIgdi1jbG9zZS1wb3B1cC8+XG4gICAgPC9xLWNhcmQtYWN0aW9ucz5cbiAgPC9xLWNhcmQ+XG4gIDxxLWNhcmQgdi1lbHNlPlxuICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtcHQtbm9uZVwiPlxuICAgICAgTm8gZXhjZXB0aW9uIGZvdW5kXG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgICA8cS1jYXJkLWFjdGlvbnMgYWxpZ249XCJyaWdodFwiPlxuICAgICAgPHEtYnRuIGZsYXQgbGFiZWw9XCJDbG9zZVwiIGNvbG9yPVwicHJpbWFyeVwiIHYtY2xvc2UtcG9wdXAvPlxuICAgIDwvcS1jYXJkLWFjdGlvbnM+XG4gIDwvcS1jYXJkPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7Y29tcHV0ZWQsIGRlZmluZVByb3BzLCBvbk1vdW50ZWQsIHJlZn0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IHtKb2JFeGNlcHRpb259IGZyb20gXCJzcmMvdHlwZXMvYXBpXCI7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8e1xuICBleGNlcHRpb25zOiBKb2JFeGNlcHRpb25bXVxufT4oKTtcblxuY29uc3QgaW5kZXhUb1ZpZXcgPSByZWY8bnVsbCB8IG51bWJlcj4oKTtcblxub25Nb3VudGVkKCgpID0+IHtcbiAgaWYgKHByb3BzLmV4Y2VwdGlvbnMubGVuZ3RoID4gMCkge1xuICAgIGluZGV4VG9WaWV3LnZhbHVlID0gMDtcbiAgfVxufSlcblxuY29uc3QgZXhjZXB0aW9uID0gY29tcHV0ZWQoKCk6IEpvYkV4Y2VwdGlvbiB8IG51bGwgPT4ge1xuICBpZiAoaW5kZXhUb1ZpZXcudmFsdWUgIT09IG51bGwgJiYgaW5kZXhUb1ZpZXcudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBwcm9wcy5leGNlcHRpb25zW2luZGV4VG9WaWV3LnZhbHVlXVxuICB9XG4gIHJldHVybiBudWxsO1xufSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cImp1c3RpZnktZXZlbmx5XCIgcGFkZGluZyB2LWlmPVwic2VsZWN0ZWRSdW4gIT09IG51bGxcIj5cblxuICAgIDxxLWJyZWFkY3J1bWJzPlxuICAgICAgPHEtYnJlYWRjcnVtYnMtZWwgaWNvbj1cImxpc3RcIiB0bz1cIi9qb2JzXCIgbGFiZWw9XCJKb2JzXCIvPlxuICAgICAgPHEtYnJlYWRjcnVtYnMtZWwgOmxhYmVsPVwic2VsZWN0ZWRSdW4uYWxpYXNcIiBpY29uPVwidmlld19zdHJlYW1cIiA6dG89XCInL2pvYnMvJyArIHNlbGVjdGVkUnVuLmFsaWFzXCIvPlxuICAgICAgPHEtYnJlYWRjcnVtYnMtZWwgOmxhYmVsPVwiJ1J1biAjJyArIHNlbGVjdGVkUnVuLmlkXCIgaWNvbj1cInZpc2liaWxpdHlcIiA6dG89XCInL3J1bi8nICsgc2VsZWN0ZWRSdW4uaWRcIi8+XG4gICAgPC9xLWJyZWFkY3J1bWJzPlxuXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiIHYtaWY9XCJyZXRyeU9wdGlvbnMubGVuZ3RoID4gMVwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiBxLXB5LW1kXCI+XG5cbiAgICAgICAgPHEtYnRuLXRvZ2dsZVxuICAgICAgICAgIEB1cGRhdGU6bW9kZWwtdmFsdWU9XCJ2aWV3UnVuKCRldmVudClcIlxuICAgICAgICAgIDptb2RlbC12YWx1ZT1cInNlbGVjdGVkUnVuPy5pZC50b1N0cmluZygpXCJcbiAgICAgICAgICBwdXNoXG4gICAgICAgICAgc3ByZWFkXG4gICAgICAgICAgbm8tY2Fwc1xuICAgICAgICAgIHJvdW5kZWRcbiAgICAgICAgICB1bmVsZXZhdGVkXG4gICAgICAgICAgZ2xvc3N5XG4gICAgICAgICAgdG9nZ2xlLWNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgICAgOm9wdGlvbnM9XCJyZXRyeU9wdGlvbnNcIlxuICAgICAgICAvPlxuXG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIlxuICAgICAgICAgdi1pZj1cIihzZWxlY3RlZFJ1bi5zdGF0dXMgPT09ICdzdGFydGVkJyB8fCBzZWxlY3RlZFJ1bi5zdGF0dXMgPT09ICdxdWV1ZWQnKSAmJiBoYXNVbmZpbmlzaGVkQ2FuY2VsXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyXCI+XG4gICAgICAgIDxxLWJhbm5lciBjbGFzcz1cImJnLXdhcm5pbmcgdGV4dC1ibGFja1wiPlxuICAgICAgICAgIEEgY2FuY2VsIHNpZ25hbCBoYXMgYmVlbiBzZW50IHRvIHRoaXMgam9iLCBidXQgdGhlIGpvYiBoYXMgbm90IHlldCBoYW5kbGVkIGl0LlxuICAgICAgICA8L3EtYmFubmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInJvdyBxLXBhLW1kXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIHRleHQtcmlnaHRcIj5cbiAgICAgICAgPHEtYnRuLWdyb3VwIHJvdW5kZWQ+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICByb3VuZGVkXG4gICAgICAgICAgICBwdXNoXG4gICAgICAgICAgICB2LWlmPVwic2VsZWN0ZWRSdW4uYWxpYXMgIT09IG51bGxcIlxuICAgICAgICAgICAgOnRvPVwie3BhdGg6ICcvam9icy8nICsgc2VsZWN0ZWRSdW4uYWxpYXN9XCJcbiAgICAgICAgICAgIGljb24tcmlnaHQ9XCJhcnJvd19iYWNrXCJcbiAgICAgICAgICAgIGxhYmVsPVwiR28gdG8gam9iXCIvPlxuXG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICB2LWlmPVwic2VsZWN0ZWRSdW4uc3RhdHVzID09PSAnc3RhcnRlZCcgfHwgc2VsZWN0ZWRSdW4uc3RhdHVzID09PSAncXVldWVkJ1wiXG4gICAgICAgICAgICByb3VuZGVkXG4gICAgICAgICAgICA6ZGlzYWJsZT1cImhhc1VuZmluaXNoZWRDYW5jZWxcIlxuICAgICAgICAgICAgOmxvYWRpbmc9XCJjYW5jZWxsaW5nXCJcbiAgICAgICAgICAgIHB1c2hcbiAgICAgICAgICAgIGljb24tcmlnaHQ9XCJjYW5jZWxcIlxuICAgICAgICAgICAgbGFiZWw9XCJDYW5jZWxcIlxuICAgICAgICAgICAgQGNsaWNrPVwiY2FuY2VsXCIvPlxuICAgICAgICA8L3EtYnRuLWdyb3VwPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIHEtcHktbWRcIj5cbiAgICAgICAgPHEtbGlzdCBib3JkZXJlZCBzZXBhcmF0b3I+XG4gICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyBzZWxlY3RlZFJ1bi5hbGlhcyB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+QWxpYXM8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyBzZWxlY3RlZFJ1bi5jbGFzcyB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+Q2xhc3M8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyBzZWxlY3RlZFJ1bi5zdGF0dXMgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlN0YXR1czwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHNlbGVjdGVkUnVuLnV1aWQgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlV1aWQ8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyBzZWxlY3RlZFJ1bi50YWdzIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5UYWdzPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgc2VsZWN0ZWRSdW4ucGVyY2VudGFnZSB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+UGVyY2VudGFnZTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHNlbGVjdGVkUnVuLmNyZWF0ZWRfYXQgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPkRpc3BhdGNoZWQgQXQ8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCB2LWlmPVwicXVldWVUaW1lID09PSBudWxsXCI+Ti9BPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgdi1lbHNlPnt7IHF1ZXVlVGltZSB9fSBzPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5RdWV1ZSB0aW1lPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgdi1pZj1cInJ1blRpbWUgPT09IG51bGxcIj5OL0E8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCB2LWVsc2U+e3sgcnVuVGltZSB9fSBzPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5SdW50aW1lPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICA8L3EtbGlzdD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiBxLXB5LW1kXCI+XG4gICAgICAgIDxxLWNhcmQ+XG4gICAgICAgICAgPHEtdGFicyB2LW1vZGVsPVwidGFiXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzPVwidGV4dC10ZWFsXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8cS10YWIgbmFtZT1cInRpbWVsaW5lXCIgaWNvbj1cInRpbWVsaW5lXCIgbGFiZWw9XCJUaW1lbGluZVwiLz5cbiAgICAgICAgICAgIDxxLXRhYiBuYW1lPVwibWVzc2FnZXNcIiBpY29uPVwibWFpbFwiIGxhYmVsPVwiTWVzc2FnZXNcIi8+XG4gICAgICAgICAgICA8cS10YWIgbmFtZT1cInNpZ25hbHNcIiBpY29uPVwiY29ubmVjdF93aXRob3V0X2NvbnRhY3RcIiBsYWJlbD1cIlNpZ25hbHNcIi8+XG4gICAgICAgICAgICA8cS10YWIgbmFtZT1cInN0YXR1c2VzXCIgaWNvbj1cIm1vdmVfZG93blwiIGxhYmVsPVwiU3RhdHVzIEhpc3RvcnlcIi8+XG4gICAgICAgICAgICA8cS10YWIgbmFtZT1cImV4Y2VwdGlvblwiIGljb249XCJlcnJvclwiIGxhYmVsPVwiRXhjZXB0aW9uXCIvPlxuICAgICAgICAgIDwvcS10YWJzPlxuXG4gICAgICAgICAgPHEtc2VwYXJhdG9yLz5cblxuICAgICAgICAgIDxxLXRhYi1wYW5lbHMgdi1tb2RlbD1cInRhYlwiIGFuaW1hdGVkPlxuICAgICAgICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJ0aW1lbGluZVwiPlxuICAgICAgICAgICAgICA8am9iLXJ1bi10aW1lbGluZSA6cnVuPVwic2VsZWN0ZWRSdW5cIj48L2pvYi1ydW4tdGltZWxpbmU+XG4gICAgICAgICAgICA8L3EtdGFiLXBhbmVsPlxuXG4gICAgICAgICAgICA8cS10YWItcGFuZWwgbmFtZT1cIm1lc3NhZ2VzXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+TWVzc2FnZXM8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtdGltZWxpbmUgY29sb3I9XCJzZWNvbmRhcnlcIj5cbiAgICAgICAgICAgICAgICA8cS10aW1lbGluZS1lbnRyeVxuICAgICAgICAgICAgICAgICAgdi1mb3I9XCJtZXNzYWdlIGluIHNlbGVjdGVkUnVuLm1lc3NhZ2VzXCJcbiAgICAgICAgICAgICAgICAgIDprZXk9XCJtZXNzYWdlLmlkXCJcbiAgICAgICAgICAgICAgICAgIDp0aXRsZT1cIm1lc3NhZ2UudHlwZVwiXG4gICAgICAgICAgICAgICAgICA6c3VidGl0bGU9XCJkYXlqcyhtZXNzYWdlLmNyZWF0ZWRfYXQpLmZvcm1hdCgnTCBMVFMnKVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAge3sgbWVzc2FnZS5tZXNzYWdlIH19XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3EtdGltZWxpbmUtZW50cnk+XG4gICAgICAgICAgICAgIDwvcS10aW1lbGluZT5cbiAgICAgICAgICAgIDwvcS10YWItcGFuZWw+XG5cbiAgICAgICAgICAgIDxxLXRhYi1wYW5lbCBuYW1lPVwic2lnbmFsc1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlNpZ25hbHM8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtdGltZWxpbmUgY29sb3I9XCJzZWNvbmRhcnlcIj5cbiAgICAgICAgICAgICAgICA8cS10aW1lbGluZS1lbnRyeVxuICAgICAgICAgICAgICAgICAgdi1mb3I9XCJzaWduYWwgaW4gc2VsZWN0ZWRSdW4uc2lnbmFsc1wiXG4gICAgICAgICAgICAgICAgICA6a2V5PVwic2lnbmFsLmlkXCJcbiAgICAgICAgICAgICAgICAgIDp0aXRsZT1cInNpZ25hbC5zaWduYWxcIlxuICAgICAgICAgICAgICAgICAgOnN1YnRpdGxlPVwic2lnbmFsLmNhbmNlbF9qb2IgPyAnSm9iIHN0b3BwZWQnIDogJ0pvYiBjb250aW51ZWQnXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cS1saXN0IGJvcmRlcmVkIHNlcGFyYXRvcj5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHNpZ25hbC5wYXJhbWV0ZXJzIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5QYXJhbWV0ZXJzPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgZGF5anMoc2lnbmFsLmNyZWF0ZWRfYXQpLmZvcm1hdCgnTCBMVFMnKSB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+U2VudCBhdDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IGRheWpzKHNpZ25hbC5oYW5kbGVkX2F0KS5mb3JtYXQoJ0wgTFRTJykgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPkhhbmRsZWQgYXQ8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1saXN0PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9xLXRpbWVsaW5lLWVudHJ5PlxuICAgICAgICAgICAgICA8L3EtdGltZWxpbmU+XG4gICAgICAgICAgICA8L3EtdGFiLXBhbmVsPlxuXG4gICAgICAgICAgICA8cS10YWItcGFuZWwgbmFtZT1cInN0YXR1c2VzXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+U3RhdHVzZXM8L2Rpdj5cbiAgICAgICAgICAgICAgPHEtdGltZWxpbmUgY29sb3I9XCJzZWNvbmRhcnlcIj5cbiAgICAgICAgICAgICAgICA8cS10aW1lbGluZS1lbnRyeVxuICAgICAgICAgICAgICAgICAgdi1mb3I9XCJzdGF0dXMgaW4gc2VsZWN0ZWRSdW4uc3RhdHVzZXNcIlxuICAgICAgICAgICAgICAgICAgOmtleT1cInN0YXR1cy5pZFwiXG4gICAgICAgICAgICAgICAgICA6dGl0bGU9XCJzdGF0dXMuc3RhdHVzXCJcbiAgICAgICAgICAgICAgICAgIDpzdWJ0aXRsZT1cImRheWpzKHN0YXR1cy5jcmVhdGVkX2F0KS5mb3JtYXQoJ0wgTFRTJylcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvcS10aW1lbGluZS1lbnRyeT5cbiAgICAgICAgICAgICAgPC9xLXRpbWVsaW5lPlxuICAgICAgICAgICAgPC9xLXRhYi1wYW5lbD5cblxuICAgICAgICAgICAgPHEtdGFiLXBhbmVsIG5hbWU9XCJleGNlcHRpb25cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5FeGNlcHRpb248L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiB2LWlmPVwiIXNlbGVjdGVkUnVuLmV4Y2VwdGlvblwiPk5vIGV4Y2VwdGlvbnMgd2VyZSBkZXRlY3RlZCBpbiB0aGlzIGpvYjwvZGl2PlxuICAgICAgICAgICAgICA8ZXhjZXB0aW9uLXZpZXcgdi1lbHNlIDpleGNlcHRpb25zPVwiZXhjZXB0aW9uc1wiPjwvZXhjZXB0aW9uLXZpZXc+XG4gICAgICAgICAgICA8L3EtdGFiLXBhbmVsPlxuXG4gICAgICAgICAgPC9xLXRhYi1wYW5lbHM+XG4gICAgICAgIDwvcS1jYXJkPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvcS1wYWdlPlxuICA8cS1wYWdlIGNsYXNzPVwiaXRlbXMtY2VudGVyIGp1c3RpZnktZXZlbmx5XCIgdi1lbHNlPlxuICAgIExvYWRpbmdcbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHtjb21wdXRlZCwgcmVhY3RpdmUsIHJlZn0gZnJvbSAndnVlJztcbmltcG9ydCBhcGkgZnJvbSAnc3JjL3V0aWxzL2NsaWVudC9hcGknO1xuaW1wb3J0IHtKb2JFeGNlcHRpb24sIEpvYlJ1biwgSm9iU2lnbmFsLCBKb2JTdGF0dXNTdGF0dXN9IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuaW1wb3J0IHt1c2VBcGl9IGZyb20gXCIuLi9jb21wb3N0YWJsZXMvdXNlQXBpXCI7XG5pbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5pbXBvcnQgbG9jYWxpemVkRm9ybWF0IGZyb20gJ2RheWpzL3BsdWdpbi9sb2NhbGl6ZWRGb3JtYXQnO1xuaW1wb3J0IEpvYlJ1blRpbWVsaW5lIGZyb20gXCJjb21wb25lbnRzL0pvYlJ1blRpbWVsaW5lLnZ1ZVwiO1xuaW1wb3J0IEV4Y2VwdGlvblZpZXcgZnJvbSBcImNvbXBvbmVudHMvRXhjZXB0aW9uVmlldy52dWVcIjtcblxuZGF5anMuZXh0ZW5kKGxvY2FsaXplZEZvcm1hdCk7XG5cbmNvbnN0IHJlc3VsdHMgPSByZWY8Sm9iUnVuIHwgbnVsbD4obnVsbCk7XG5cbmNvbnN0IHRhYiA9IHJlZjxzdHJpbmc+KCd0aW1lbGluZScpO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzPHtcbiAgam9iU3RhdHVzSWQ6IG51bWJlclxufT4oKTtcblxuY29uc3QgaGFzVW5maW5pc2hlZENhbmNlbCA9IGNvbXB1dGVkKCgpOiBib29sZWFuID0+IHtcbiAgaWYgKHNlbGVjdGVkUnVuLnZhbHVlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBzZWxlY3RlZFJ1bi52YWx1ZT8uc2lnbmFscy5maWx0ZXIoKHNpZ25hbDogSm9iU2lnbmFsKSA9PiBzaWduYWwuY2FuY2VsX2pvYiAmJiBzaWduYWwuaGFuZGxlZF9hdCA9PT0gbnVsbCkubGVuZ3RoID4gMDtcbn0pO1xuXG51c2VBcGkoKGFmdGVyKSA9PiB7XG4gIGFwaS5ydW5TaG93KHByb3BzLmpvYlN0YXR1c0lkKVxuICAgIC50aGVuKChyZXNwb25zZTogSm9iUnVuKSA9PiB7XG4gICAgICByZXN1bHRzLnZhbHVlID0gcmVzcG9uc2U7XG4gICAgfSlcbiAgICAuZmluYWxseShhZnRlcik7XG59KVxuXG5jb25zdCBjYW5jZWxsaW5nID0gcmVmKGZhbHNlKTtcblxuZnVuY3Rpb24gY2FuY2VsKCkge1xuICBjYW5jZWxsaW5nLnZhbHVlID0gdHJ1ZTtcbiAgYXBpLnNpZ25hbChwcm9wcy5qb2JTdGF0dXNJZCwgJ2NhbmNlbCcsIHRydWUsIHt9KVxuICAgIC5maW5hbGx5KCgpID0+IGNhbmNlbGxpbmcudmFsdWUgPSBmYWxzZSk7XG59XG5cbmNvbnN0IGV4Y2VwdGlvbnMgPSBjb21wdXRlZCgoKTogSm9iRXhjZXB0aW9uW10gPT4ge1xuICBsZXQgdGVtcEV4Y2VwdGlvbiA9IHNlbGVjdGVkUnVuLnZhbHVlPy5leGNlcHRpb25cbiAgbGV0IGV4cyA9IFtdXG4gIHdoaWxlICh0ZW1wRXhjZXB0aW9uICE9PSBudWxsICYmIHRlbXBFeGNlcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgIGV4cy5wdXNoKHRlbXBFeGNlcHRpb24pXG4gICAgdGVtcEV4Y2VwdGlvbiA9IHRlbXBFeGNlcHRpb24ucHJldmlvdXNcbiAgfVxuICByZXR1cm4gZXhzO1xufSlcblxuaW50ZXJmYWNlIEJ1dHRvbk9wdGlvbiB7XG4gIGxhYmVsPzogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG5jb25zdCByZXRyeUlkID0gcmVmPG51bWJlciB8IG51bGw+KG51bGwpXG5cbmNvbnN0IHNlbGVjdGVkUnVuID0gY29tcHV0ZWQoKCk6IEpvYlJ1biB8IG51bGwgPT4ge1xuICBsZXQgam9iUnVuOiBKb2JSdW4gfCBudWxsID0gcmVzdWx0cy52YWx1ZTtcbiAgd2hpbGUgKGpvYlJ1biAhPT0gbnVsbCAmJiBqb2JSdW4uaWQudG9TdHJpbmcoKSAhPT0gcmV0cnlJZC52YWx1ZT8udG9TdHJpbmcoKSkge1xuICAgIGpvYlJ1biA9IGpvYlJ1bi5wYXJlbnQ7XG4gIH1cbiAgcmV0dXJuIGpvYlJ1bjtcbn0pXG5cbmNvbnN0IHJ1blRpbWUgPSBjb21wdXRlZCgoKTogbnVtYmVyID0+IHtcbiAgaWYgKHNlbGVjdGVkUnVuLnZhbHVlID09PSBudWxsIHx8IHNlbGVjdGVkUnVuLnZhbHVlLnN0YXJ0ZWRfYXQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuICBpZiAoc2VsZWN0ZWRSdW4udmFsdWUuZmluaXNoZWRfYXQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZ2V0RHVyYXRpb24oc2VsZWN0ZWRSdW4udmFsdWU/LnN0YXJ0ZWRfYXQsIG5ldyBEYXRlKCksIGZhbHNlKTtcbiAgfVxuICByZXR1cm4gZ2V0RHVyYXRpb24oc2VsZWN0ZWRSdW4udmFsdWUuc3RhcnRlZF9hdCwgc2VsZWN0ZWRSdW4udmFsdWUuZmluaXNoZWRfYXQsIHRydWUpXG59KTtcblxuY29uc3QgcXVldWVUaW1lID0gY29tcHV0ZWQoKCk6IG51bWJlciA9PiB7XG4gIGlmIChzZWxlY3RlZFJ1bi52YWx1ZSA9PT0gbnVsbCB8fCBzZWxlY3RlZFJ1bi52YWx1ZS5jcmVhdGVkX2F0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgaWYgKHNlbGVjdGVkUnVuLnZhbHVlLnN0YXJ0ZWRfYXQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZ2V0RHVyYXRpb24oc2VsZWN0ZWRSdW4udmFsdWU/LmNyZWF0ZWRfYXQsIG5ldyBEYXRlKCksIGZhbHNlKTtcbiAgfVxuICByZXR1cm4gZ2V0RHVyYXRpb24oc2VsZWN0ZWRSdW4udmFsdWU/LmNyZWF0ZWRfYXQsIHNlbGVjdGVkUnVuLnZhbHVlLnN0YXJ0ZWRfYXQsIHRydWUpXG59KVxuXG5mdW5jdGlvbiBnZXREdXJhdGlvbihzdGFydGVkQXQ6IERhdGUsIGZpbmlzaGVkQXQ6IERhdGUgfCBudWxsIHwgdW5kZWZpbmVkID0gbnVsbCwgd2l0aERlY2ltYWxzOiBib29sZWFuID0gZmFsc2UpOiBudW1iZXIge1xuICBpZiAoZmluaXNoZWRBdCA9PT0gbnVsbCB8fCBmaW5pc2hlZEF0ID09PSB1bmRlZmluZWQpIHtcbiAgICBmaW5pc2hlZEF0ID0gbmV3IERhdGUoKTtcbiAgfVxuICByZXR1cm4gTWF0aC5yb3VuZChkYXlqcyhmaW5pc2hlZEF0KS5kaWZmKHN0YXJ0ZWRBdCwgJ3NlY29uZHMnLCB3aXRoRGVjaW1hbHMpICogMTApIC8gMTA7XG59XG5cbmNvbnN0IHJldHJ5T3B0aW9ucyA9IGNvbXB1dGVkKCgpOiBCdXR0b25PcHRpb25bXSA9PiB7XG4gIGxldCBqb2JzOiBKb2JSdW5bXSA9IFtdO1xuICBsZXQgam9iUnVuOiBKb2JSdW4gfCBudWxsID0gcmVzdWx0cy52YWx1ZTtcbiAgd2hpbGUgKGpvYlJ1biAhPT0gbnVsbCkge1xuICAgIGpvYnMucHVzaChqb2JSdW4pO1xuICAgIGpvYlJ1biA9IGpvYlJ1bi5wYXJlbnQ7XG4gIH1cbiAgcmV0dXJuIGpvYnMucmV2ZXJzZSgpLm1hcCgoam9iLCBpbmRleCkgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBsYWJlbDogJ1J1biAjJyArIChpbmRleCArIDEpLnRvU3RyaW5nKCksXG4gICAgICB2YWx1ZTogam9iLmlkLnRvU3RyaW5nKClcbiAgICB9XG4gIH0pO1xufSk7XG5cbmZ1bmN0aW9uIHZpZXdSdW4ocnVuSWQ6IG51bWJlcikge1xuICByZXRyeUlkLnZhbHVlID0gcnVuSWQ7XG59XG5cbnZpZXdSdW4ocHJvcHMuam9iU3RhdHVzSWQpO1xuXG5mdW5jdGlvbiBnZXRIYXNoKGpvYlJ1bjogSm9iUnVuKTogc3RyaW5nIHtcbiAgcmV0dXJuIGpvYlJ1bi51dWlkO1xufVxuXG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6WyJjb250ZW50IiwidGhpcyIsInQiLCJvIiwibiIsInIiLCJpIiwiZSIsImgiLCJzIiwibCIsInkiLCJ1IiwiYSIsImQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUtBLElBQUEsWUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxZQUFZO0FBQUEsSUFDWixTQUFTO0FBQUEsSUFDVCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsRUFDVDtBQUFBLEVBRUQsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLFVBQVUsU0FBUyxNQUFNO0FBQzdCLFlBQU0sTUFBTSxDQUFFLGNBQWMsV0FBVyxRQUFRLFdBQVcsVUFBVSxRQUFRLFdBQVcsUUFBVSxFQUM5RixPQUFPLE9BQUssTUFBTyxPQUFRLElBQUksRUFDL0IsSUFBSSxPQUFLLGdCQUFpQixHQUFJLEVBQUUsS0FBSyxHQUFHO0FBRTNDLGFBQU8sMEJBQTJCLElBQUksU0FBUyxJQUFJLE1BQU0sTUFBTSxRQUMxRCxNQUFNLFdBQVcsT0FBTyx5QkFBeUI7QUFBQSxJQUM1RCxDQUFLO0FBRUQsV0FBTyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sUUFBUSxNQUFLLEdBQUksTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUFBLEVBQ3JFO0FBQ0gsQ0FBQztBQzlCTSxNQUFNLGVBQWU7QUFBQSxFQUMxQixNQUFNO0FB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QSxJQUFFLElBQUksRUFBRSxLQUFJLEVBQUUsS0FBSyxNQUFJSSxNQUFHRixLQUFFLEtBQUcsSUFBRyxJQUFJO0FBQUEsTUFBQyxHQUFFTyxHQUFFLFdBQVMsU0FBU1QsSUFBRU8sSUFBRTtBQUFDLGVBQU8sS0FBSyxJQUFJUCxJQUFFTyxJQUFFLElBQUU7QUFBQSxNQUFDLEdBQUVFLEdBQUUsU0FBTyxTQUFTVCxJQUFFO0FBQUMsWUFBSU8sS0FBRSxLQUFLLE1BQU87QUFBQyxlQUFPQSxHQUFFLEtBQUdQLElBQUVPO0FBQUEsTUFBQyxHQUFFRSxHQUFFLFFBQU0sV0FBVTtBQUFDLGVBQU8sRUFBRSxLQUFLLEtBQUksSUFBSTtBQUFBLE1BQUMsR0FBRUEsR0FBRSxXQUFTLFNBQVNGLElBQUU7QUFBQyxlQUFPLElBQUksSUFBSSxLQUFLLEtBQUksSUFBSSxFQUFFLE9BQU8sS0FBSyxFQUFFLEVBQUUsUUFBUSxDQUFDQSxFQUFDO0FBQUEsTUFBQyxHQUFFRSxHQUFFLGVBQWEsV0FBVTtBQUFDLGVBQU8sS0FBSyxJQUFJLGNBQWM7QUFBQSxNQUFDLEdBQUVBLEdBQUUsaUJBQWUsV0FBVTtBQUFDLGVBQU8sS0FBSyxHQUFHLGNBQWM7QUFBQSxNQUFDLEdBQUVBLEdBQUUsVUFBUSxXQUFVO0FBQUMsZUFBTyxLQUFLLElBQUksU0FBUztBQUFBLE1BQUMsR0FBRUEsR0FBRSxZQUFVLFdBQVU7QUFBQyxlQUFPLEtBQUssR0FBRyxTQUFTO0FBQUEsTUFBQyxHQUFFQSxHQUFFLFVBQVEsV0FBVTtBQUFDLGVBQU8sS0FBSyxJQUFJLFNBQVM7QUFBQSxNQUFDLEdBQUVBLEdBQUUsWUFBVSxXQUFVO0FBQUMsZUFBTyxLQUFLLEdBQUcsU0FBUztBQUFBLE1BQUMsR0FBRUEsR0FBRSxRQUFNLFdBQVU7QUFBQyxlQUFPLEtBQUssSUFBSSxPQUFPO0FBQUEsTUFBQyxHQUFFQSxHQUFFLFVBQVEsV0FBVTtBQUFDLGVBQU8sS0FBSyxHQUFHLE9BQU87QUFBQSxNQUFDLEdBQUVBLEdBQUUsT0FBSyxXQUFVO0FBQUMsZUFBTyxLQUFLLElBQUksTUFBTTtBQUFBLE1BQUMsR0FBRUEsR0FBRSxTQUFPLFdBQVU7QUFBQyxlQUFPLEtBQUssR0FBRyxNQUFNO0FBQUEsTUFBQyxHQUFFQSxHQUFFLFFBQU0sV0FBVTtBQUFDLGVBQU8sS0FBSyxJQUFJLE9BQU87QUFBQSxNQUFDLEdBQUVBLEdBQUUsVUFBUSxXQUFVO0FBQUMsZUFBTyxLQUFLLEdBQUcsT0FBTztBQUFBLE1BQUMsR0FBRUEsR0FBRSxTQUFPLFdBQVU7QUFBQyxlQUFPLEtBQUssSUFBSSxRQUFRO0FBQUEsTUFBQyxHQUFFQSxHQUFFLFdBQVMsV0FBVTtBQUFDLGVBQU8sS0FBSyxHQUFHLFFBQVE7QUFBQSxNQUFDLEdBQUVBLEdBQUUsUUFBTSxXQUFVO0FBQUMsZUFBTyxLQUFLLElBQUksT0FBTztBQUFBLE1BQUMsR0FBRUEsR0FBRSxVQUFRLFdBQVU7QUFBQyxlQUFPLEtBQUssR0FBRyxPQUFPO0FBQUEsTUFBQyxHQUFFRDtBQUFBLElBQUMsRUFBQztBQUFHLFdBQU8sU0FBU04sSUFBRUUsSUFBRUMsSUFBRTtBQUFDLFVBQUVBLElBQUUsSUFBRUEsR0FBQyxFQUFHLE9BQVEsR0FBQ0EsR0FBRSxXQUFTLFNBQVNMLElBQUVPLElBQUU7QUFBQyxZQUFJTCxLQUFFRyxHQUFFLE9BQVE7QUFBQyxlQUFPLEVBQUVMLElBQUUsRUFBQyxJQUFHRSxHQUFDLEdBQUVLLEVBQUM7QUFBQSxNQUFDLEdBQUVGLEdBQUUsYUFBVztBQUFFLFVBQUlGLEtBQUVDLEdBQUUsVUFBVSxLQUFJSCxLQUFFRyxHQUFFLFVBQVU7QUFBUyxNQUFBQSxHQUFFLFVBQVUsTUFBSSxTQUFTSixJQUFFTyxJQUFFO0FBQUMsZUFBTyxFQUFFUCxFQUFDLE1BQUlBLEtBQUVBLEdBQUUsZUFBYyxJQUFJRyxHQUFFLEtBQUssSUFBSSxFQUFFSCxJQUFFTyxFQUFDO0FBQUEsTUFBQyxHQUFFSCxHQUFFLFVBQVUsV0FBUyxTQUFTSixJQUFFTyxJQUFFO0FBQUMsZUFBTyxFQUFFUCxFQUFDLE1BQUlBLEtBQUVBLEdBQUUs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TUFDckU7QUFDQSxhQUFPLGFBQVksaUJBQVksVUFBWixtQkFBbUIsWUFBWSxZQUFZLE1BQU0sWUFBWSxJQUFJO0FBQUEsSUFBQSxDQUNyRjtBQUVELGFBQVMsWUFBWSxXQUFpQixhQUFzQyxNQUFNLGVBQXdCLE9BQWU7QUFDbkgsVUFBQSxlQUFlLFFBQVEsZUFBZSxRQUFXO0FBQ25ELHFCQUFhLElBQUk7TUFDbkI7QUFDTyxhQUFBLEtBQUssTUFBTSxNQUFNLFVBQVUsRUFBRSxLQUFLLFdBQVcsV0FBVyxZQUFZLElBQUksRUFBRSxJQUFJO0FBQUEsSUFDdkY7QUFFTSxVQUFBLGVBQWUsU0FBUyxNQUFzQjtBQUNsRCxVQUFJLE9BQWlCLENBQUE7QUFDckIsVUFBSSxTQUF3QixRQUFRO0FBQ3BDLGFBQU8sV0FBVyxNQUFNO0FBQ3RCLGFBQUssS0FBSyxNQUFNO0FBQ2hCLGlCQUFTLE9BQU87QUFBQSxNQUNsQjtBQUNBLGFBQU8sS0FBSyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssVUFBVTtBQUNqQyxlQUFBO0FBQUEsVUFDTCxPQUFPLFdBQVcsUUFBUSxHQUFHLFNBQVM7QUFBQSxVQUN0QyxPQUFPLElBQUksR0FBRyxTQUFTO0FBQUEsUUFBQTtBQUFBLE1BQ3pCLENBQ0Q7QUFBQSxJQUFBLENBQ0Y7QUFFRCxhQUFTLFFBQVEsT0FBZTtBQUM5QixjQUFRLFFBQVE7QUFBQSxJQUNsQjtBQUVBLFlBQVEsTUFBTSxXQUFXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
