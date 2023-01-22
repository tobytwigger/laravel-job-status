import { Q as QBtn } from "./QBtn.9bd529c3.js";
import { c as createComponent, h as hSlot, e as hMergeSlot, a as hUniqueSlot, b as createDirective, d as hDir } from "./render.f16c1865.js";
import { u as useDarkProps, a as useDark, c as QItem, Q as QItemSection, b as QItemLabel, d as QList } from "./QItem.65aee473.js";
import { c as computed, h, g as getCurrentInstance, j as emptyRenderFn, r as ref, k as onBeforeUnmount, o as onMounted, a as inject, D as withDirectives, a2 as tabsKey, q as stopAndPrevent, Y as isKeyCode, a3 as shouldIgnoreKey, a4 as isDeepEqual, a0 as onDeactivated, n as nextTick, w as watch, a5 as onActivated, E as provide, a6 as timelineKey, m as client, u as noop, v as leftClick, x as addEvt, y as preventDraggable, B as position, C as cleanEvt, X as Transition, a7 as KeepAlive, _ as _export_sfc, K as defineComponent, L as openBlock, M as createBlock, N as withCtx, d as createVNode, P as createTextVNode, O as createCommentVNode, Q as toDisplayString, S as createElementBlock, U as renderList, F as Fragment, R as createBaseVNode, Z as unref } from "./index.6ef0c4c5.js";
import { Q as QIcon, e as vmIsDestroyed, g as getNormalizedVNodes } from "./use-router-link.4ed4ca54.js";
import { R as Ripple } from "./Ripple.6d84203a.js";
import { u as useTimeout, Q as QResizeObserver, g as getModifierDirections, s as shouldStart, c as clearSelection } from "./selection.014ff0f9.js";
import { u as useApi, Q as QSeparator } from "./useApi.bcd835b7.js";
import { Q as QPage, a as api } from "./api.b16a5c9d.js";
import { c as commonjsGlobal, d as dayjs } from "./dayjs.min.54da9cde.js";
import "./index.2cf0d985.js";
import "./config.b6f61684.js";
var QBanner = createComponent({
  name: "QBanner",
  props: {
    ...useDarkProps,
    inlineActions: Boolean,
    dense: Boolean,
    rounded: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const classes = computed(
      () => "q-banner row items-center" + (props.dense === true ? " q-banner--dense" : "") + (isDark.value === true ? " q-banner--dark q-dark" : "") + (props.rounded === true ? " rounded-borders" : "")
    );
    const actionClass = computed(
      () => `q-banner__actions row items-center justify-end col-${props.inlineActions === true ? "auto" : "all"}`
    );
    return () => {
      const child = [
        h("div", {
          class: "q-banner__avatar col-auto row items-center self-start"
        }, hSlot(slots.avatar)),
        h("div", {
          class: "q-banner__content col text-body2"
        }, hSlot(slots.default))
      ];
      const actions = hSlot(slots.action);
      actions !== void 0 && child.push(
        h("div", { class: actionClass.value }, actions)
      );
      return h("div", {
        class: classes.value + (props.inlineActions === false && actions !== void 0 ? " q-banner--top-padding" : ""),
        role: "alert"
      }, child);
    };
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
const _hoisted_1 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Messages", -1);
const _hoisted_2 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Signals", -1);
const _hoisted_3 = /* @__PURE__ */ createBaseVNode("div", { class: "text-h6" }, "Statuses", -1);
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("div", null, null, -1);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RunShowPage",
  props: {
    jobStatusId: null
  },
  setup(__props) {
    const props = __props;
    dayjs.extend(localizedFormat);
    const results = ref(null);
    const tab = ref("messages");
    useApi((after) => {
      api.runShow(props.jobStatusId).then((response) => results.value = response).finally(after);
    });
    return (_ctx, _cache) => {
      return results.value !== null ? (openBlock(), createBlock(QPage, {
        key: 0,
        class: "row items-center justify-evenly"
      }, {
        default: withCtx(() => [
          results.value.parent !== null ? (openBlock(), createBlock(QBanner, {
            key: 0,
            class: "bg-primary text-white"
          }, {
            action: withCtx(() => [
              createVNode(QBtn, {
                flat: "",
                color: "white",
                label: "View parent job",
                to: { name: "run.show", params: { jobStatusId: results.value.parent.id } }
              }, null, 8, ["to"])
            ]),
            default: withCtx(() => [
              createTextVNode(" This job was dispatched by another when it failed. ")
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createVNode(QList, {
            bordered: "",
            separator: ""
          }, {
            default: withCtx(() => [
              withDirectives((openBlock(), createBlock(QItem, { clickable: "" }, {
                default: withCtx(() => [
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      createVNode(QItemLabel, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(results.value.alias), 1)
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
              })), [
                [Ripple]
              ]),
              withDirectives((openBlock(), createBlock(QItem, { clickable: "" }, {
                default: withCtx(() => [
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      createVNode(QItemLabel, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(results.value.class), 1)
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
              })), [
                [Ripple]
              ]),
              withDirectives((openBlock(), createBlock(QItem, { clickable: "" }, {
                default: withCtx(() => [
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      createVNode(QItemLabel, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(results.value.status), 1)
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
              })), [
                [Ripple]
              ]),
              withDirectives((openBlock(), createBlock(QItem, { clickable: "" }, {
                default: withCtx(() => [
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      createVNode(QItemLabel, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(results.value.uuid), 1)
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
              })), [
                [Ripple]
              ]),
              withDirectives((openBlock(), createBlock(QItem, { clickable: "" }, {
                default: withCtx(() => [
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      createVNode(QItemLabel, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(results.value.tags), 1)
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
              })), [
                [Ripple]
              ]),
              withDirectives((openBlock(), createBlock(QItem, { clickable: "" }, {
                default: withCtx(() => [
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      createVNode(QItemLabel, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(results.value.percentage), 1)
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
              })), [
                [Ripple]
              ]),
              withDirectives((openBlock(), createBlock(QItem, { clickable: "" }, {
                default: withCtx(() => [
                  createVNode(QItemSection, null, {
                    default: withCtx(() => [
                      createVNode(QItemLabel, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(results.value.created_at), 1)
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
              })), [
                [Ripple]
              ])
            ]),
            _: 1
          }),
          createVNode(QCard, null, {
            default: withCtx(() => [
              createVNode(QTabs, {
                modelValue: tab.value,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => tab.value = $event),
                class: "text-teal"
              }, {
                default: withCtx(() => [
                  createVNode(QTab, {
                    name: "messages",
                    icon: "mail",
                    label: "Messages"
                  }),
                  createVNode(QTab, {
                    name: "signals",
                    icon: "alarm",
                    label: "Signals"
                  }),
                  createVNode(QTab, {
                    name: "statuses",
                    icon: "movie",
                    label: "Status History"
                  })
                ]),
                _: 1
              }, 8, ["modelValue"]),
              createVNode(QSeparator),
              createVNode(QTabPanels, {
                modelValue: tab.value,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => tab.value = $event),
                animated: ""
              }, {
                default: withCtx(() => [
                  createVNode(QTabPanel, { name: "messages" }, {
                    default: withCtx(() => [
                      _hoisted_1,
                      createVNode(QTimeline, { color: "secondary" }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(results.value.messages, (message) => {
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
                      _hoisted_2,
                      createVNode(QTimeline, { color: "secondary" }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(results.value.signals, (signal) => {
                            return openBlock(), createBlock(QTimelineEntry, {
                              key: signal.id,
                              title: signal.signal,
                              subtitle: signal.cancel_job ? "Job stopped" : "Job continued"
                            }, {
                              default: withCtx(() => [
                                createBaseVNode("div", null, [
                                  createTextVNode(toDisplayString(signal.parameters) + ". ", 1),
                                  createVNode(QList, {
                                    bordered: "",
                                    separator: ""
                                  }, {
                                    default: withCtx(() => [
                                      withDirectives((openBlock(), createBlock(QItem, { clickable: "" }, {
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
                                      }, 1024)), [
                                        [Ripple]
                                      ]),
                                      withDirectives((openBlock(), createBlock(QItem, { clickable: "" }, {
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
                                      }, 1024)), [
                                        [Ripple]
                                      ]),
                                      withDirectives((openBlock(), createBlock(QItem, { clickable: "" }, {
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
                                      }, 1024)), [
                                        [Ripple]
                                      ])
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
                      _hoisted_3,
                      createVNode(QTimeline, { color: "secondary" }, {
                        default: withCtx(() => [
                          (openBlock(true), createElementBlock(Fragment, null, renderList(results.value.statuses, (status) => {
                            return openBlock(), createBlock(QTimelineEntry, {
                              key: status.id,
                              title: status.status,
                              subtitle: unref(dayjs)(status.created_at).format("L LTS")
                            }, {
                              default: withCtx(() => [
                                _hoisted_4
                              ]),
                              _: 2
                            }, 1032, ["title", "subtitle"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue"])
            ]),
            _: 1
          })
        ]),
        _: 1
      })) : (openBlock(), createBlock(QPage, {
        key: 1,
        class: "row items-center justify-evenly"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUnVuU2hvd1BhZ2UuYWY3MjE1ZGEuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2Jhbm5lci9RQmFubmVyLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3VpZC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYnMvdXNlLXRhYi5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYnMvUVRhYi5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10aWNrLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvcnRsLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFicy9RVGFicy5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RpbWVsaW5lL1FUaW1lbGluZUVudHJ5LmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGltZWxpbmUvUVRpbWVsaW5lLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2RpcmVjdGl2ZXMvVG91Y2hTd2lwZS5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1jYWNoZS5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wYW5lbC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3RhYi1wYW5lbHMvUVRhYlBhbmVsLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdGFiLXBhbmVscy9RVGFiUGFuZWxzLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvY2FyZC9RQ2FyZC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL2xvY2FsaXplZEZvcm1hdC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9zcmMvcGFnZXMvUnVuU2hvd1BhZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHVzZURhcmssIHsgdXNlRGFya1Byb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtZGFyay5qcydcblxuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCYW5uZXInLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgaW5saW5lQWN0aW9uczogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICByb3VuZGVkOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWJhbm5lciByb3cgaXRlbXMtY2VudGVyJ1xuICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtYmFubmVyLS1kZW5zZScgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1iYW5uZXItLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgICAgKyAocHJvcHMucm91bmRlZCA9PT0gdHJ1ZSA/ICcgcm91bmRlZC1ib3JkZXJzJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGFjdGlvbkNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWJhbm5lcl9fYWN0aW9ucyByb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktZW5kJ1xuICAgICAgKyBgIGNvbC0keyBwcm9wcy5pbmxpbmVBY3Rpb25zID09PSB0cnVlID8gJ2F1dG8nIDogJ2FsbCcgfWBcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtYmFubmVyX19hdmF0YXIgY29sLWF1dG8gcm93IGl0ZW1zLWNlbnRlciBzZWxmLXN0YXJ0J1xuICAgICAgICB9LCBoU2xvdChzbG90cy5hdmF0YXIpKSxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWJhbm5lcl9fY29udGVudCBjb2wgdGV4dC1ib2R5MidcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICBdXG5cbiAgICAgIGNvbnN0IGFjdGlvbnMgPSBoU2xvdChzbG90cy5hY3Rpb24pXG4gICAgICBhY3Rpb25zICE9PSB2b2lkIDAgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogYWN0aW9uQ2xhc3MudmFsdWUgfSwgYWN0aW9ucylcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWVcbiAgICAgICAgICArIChwcm9wcy5pbmxpbmVBY3Rpb25zID09PSBmYWxzZSAmJiBhY3Rpb25zICE9PSB2b2lkIDAgPyAnIHEtYmFubmVyLS10b3AtcGFkZGluZycgOiAnJyksXG4gICAgICAgIHJvbGU6ICdhbGVydCdcbiAgICAgIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsIi8qKlxuICogQmFzZWQgb24gdGhlIHdvcmsgb2YgaHR0cHM6Ly9naXRodWIuY29tL2pjaG9vay91dWlkLXJhbmRvbVxuICovXG5cbmxldFxuICBidWYsXG4gIGJ1ZklkeCA9IDBcbmNvbnN0IGhleEJ5dGVzID0gbmV3IEFycmF5KDI1NilcblxuLy8gUHJlLWNhbGN1bGF0ZSB0b1N0cmluZygxNikgZm9yIHNwZWVkXG5mb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgaSsrKSB7XG4gIGhleEJ5dGVzWyBpIF0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpXG59XG5cbi8vIFVzZSBiZXN0IGF2YWlsYWJsZSBQUk5HXG5jb25zdCByYW5kb21CeXRlcyA9ICgoKSA9PiB7XG4gIC8vIE5vZGUgJiBCcm93c2VyIHN1cHBvcnRcbiAgY29uc3QgbGliID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCdcbiAgICA/IGNyeXB0b1xuICAgIDogKFxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgID8gd2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG9cbiAgICAgICAgICA6IHZvaWQgMFxuICAgICAgKVxuXG4gIGlmIChsaWIgIT09IHZvaWQgMCkge1xuICAgIGlmIChsaWIucmFuZG9tQnl0ZXMgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIGxpYi5yYW5kb21CeXRlc1xuICAgIH1cbiAgICBpZiAobGliLmdldFJhbmRvbVZhbHVlcyAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gbiA9PiB7XG4gICAgICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkobilcbiAgICAgICAgbGliLmdldFJhbmRvbVZhbHVlcyhieXRlcylcbiAgICAgICAgcmV0dXJuIGJ5dGVzXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG4gPT4ge1xuICAgIGNvbnN0IHIgPSBbXVxuICAgIGZvciAobGV0IGkgPSBuOyBpID4gMDsgaS0tKSB7XG4gICAgICByLnB1c2goTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjU2KSlcbiAgICB9XG4gICAgcmV0dXJuIHJcbiAgfVxufSkoKVxuXG4vLyBCdWZmZXIgcmFuZG9tIG51bWJlcnMgZm9yIHNwZWVkXG4vLyBSZWR1Y2UgbWVtb3J5IHVzYWdlIGJ5IGRlY3JlYXNpbmcgdGhpcyBudW1iZXIgKG1pbiAxNilcbi8vIG9yIGltcHJvdmUgc3BlZWQgYnkgaW5jcmVhc2luZyB0aGlzIG51bWJlciAodHJ5IDE2Mzg0KVxuY29uc3QgQlVGRkVSX1NJWkUgPSA0MDk2XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgLy8gQnVmZmVyIHNvbWUgcmFuZG9tIGJ5dGVzIGZvciBzcGVlZFxuICBpZiAoYnVmID09PSB2b2lkIDAgfHwgKGJ1ZklkeCArIDE2ID4gQlVGRkVSX1NJWkUpKSB7XG4gICAgYnVmSWR4ID0gMFxuICAgIGJ1ZiA9IHJhbmRvbUJ5dGVzKEJVRkZFUl9TSVpFKVxuICB9XG5cbiAgY29uc3QgYiA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGJ1ZiwgYnVmSWR4LCAoYnVmSWR4ICs9IDE2KSlcbiAgYlsgNiBdID0gKGJbIDYgXSAmIDB4MGYpIHwgMHg0MFxuICBiWyA4IF0gPSAoYlsgOCBdICYgMHgzZikgfCAweDgwXG5cbiAgcmV0dXJuIGhleEJ5dGVzWyBiWyAwIF0gXSArIGhleEJ5dGVzWyBiWyAxIF0gXVxuICAgICsgaGV4Qnl0ZXNbIGJbIDIgXSBdICsgaGV4Qnl0ZXNbIGJbIDMgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgNCBdIF0gKyBoZXhCeXRlc1sgYlsgNSBdIF0gKyAnLSdcbiAgICArIGhleEJ5dGVzWyBiWyA2IF0gXSArIGhleEJ5dGVzWyBiWyA3IF0gXSArICctJ1xuICAgICsgaGV4Qnl0ZXNbIGJbIDggXSBdICsgaGV4Qnl0ZXNbIGJbIDkgXSBdICsgJy0nXG4gICAgKyBoZXhCeXRlc1sgYlsgMTAgXSBdICsgaGV4Qnl0ZXNbIGJbIDExIF0gXVxuICAgICsgaGV4Qnl0ZXNbIGJbIDEyIF0gXSArIGhleEJ5dGVzWyBiWyAxMyBdIF1cbiAgICArIGhleEJ5dGVzWyBiWyAxNCBdIF0gKyBoZXhCeXRlc1sgYlsgMTUgXSBdXG59XG4iLCJpbXBvcnQgeyBoLCByZWYsIGNvbXB1dGVkLCBpbmplY3QsIG9uQmVmb3JlVW5tb3VudCwgb25Nb3VudGVkLCB3aXRoRGlyZWN0aXZlcywgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IFJpcHBsZSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL1JpcHBsZS5qcydcblxuaW1wb3J0IHsgaE1lcmdlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgaXNLZXlDb2RlLCBzaG91bGRJZ25vcmVLZXkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2tleS1jb21wb3NpdGlvbi5qcydcbmltcG9ydCB7IHRhYnNLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5pbXBvcnQgeyBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHVpZCBmcm9tICcuLi8uLi91dGlscy91aWQuanMnXG5pbXBvcnQgeyBpc0RlZXBFcXVhbCB9IGZyb20gJy4uLy4uL3V0aWxzL2lzLmpzJ1xuXG5sZXQgaWQgPSAwXG5cbmV4cG9ydCBjb25zdCB1c2VUYWJFbWl0cyA9IFsgJ2NsaWNrJywgJ2tleWRvd24nIF1cblxuZXhwb3J0IGNvbnN0IHVzZVRhYlByb3BzID0ge1xuICBpY29uOiBTdHJpbmcsXG4gIGxhYmVsOiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgYWxlcnQ6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG4gIGFsZXJ0SWNvbjogU3RyaW5nLFxuXG4gIG5hbWU6IHtcbiAgICB0eXBlOiBbIE51bWJlciwgU3RyaW5nIF0sXG4gICAgZGVmYXVsdDogKCkgPT4gYHRfJHsgaWQrKyB9YFxuICB9LFxuXG4gIG5vQ2FwczogQm9vbGVhbixcblxuICB0YWJpbmRleDogWyBTdHJpbmcsIE51bWJlciBdLFxuICBkaXNhYmxlOiBCb29sZWFuLFxuXG4gIGNvbnRlbnRDbGFzczogU3RyaW5nLFxuXG4gIHJpcHBsZToge1xuICAgIHR5cGU6IFsgQm9vbGVhbiwgT2JqZWN0IF0sXG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwcm9wcywgc2xvdHMsIGVtaXQsIHJvdXRlRGF0YSkge1xuICBjb25zdCAkdGFicyA9IGluamVjdCh0YWJzS2V5LCBlbXB0eVJlbmRlckZuKVxuICBpZiAoJHRhYnMgPT09IGVtcHR5UmVuZGVyRm4pIHtcbiAgICBjb25zb2xlLmVycm9yKCdRVGFiL1FSb3V0ZVRhYiBjb21wb25lbnQgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUVRhYnMnKVxuICAgIHJldHVybiBlbXB0eVJlbmRlckZuXG4gIH1cblxuICBjb25zdCB7IHByb3h5IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuXG4gIGNvbnN0IGJsdXJUYXJnZXRSZWYgPSByZWYobnVsbClcbiAgY29uc3Qgcm9vdFJlZiA9IHJlZihudWxsKVxuICBjb25zdCB0YWJJbmRpY2F0b3JSZWYgPSByZWYobnVsbClcblxuICBjb25zdCByaXBwbGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSB8fCBwcm9wcy5yaXBwbGUgPT09IGZhbHNlXG4gICAgICA/IGZhbHNlXG4gICAgICA6IE9iamVjdC5hc3NpZ24oXG4gICAgICAgIHsga2V5Q29kZXM6IFsgMTMsIDMyIF0sIGVhcmx5OiB0cnVlIH0sXG4gICAgICAgIHByb3BzLnJpcHBsZSA9PT0gdHJ1ZSA/IHt9IDogcHJvcHMucmlwcGxlXG4gICAgICApXG4gICkpXG5cbiAgY29uc3QgaXNBY3RpdmUgPSBjb21wdXRlZCgoKSA9PiAkdGFicy5jdXJyZW50TW9kZWwudmFsdWUgPT09IHByb3BzLm5hbWUpXG5cbiAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgJ3EtdGFiIHJlbGF0aXZlLXBvc2l0aW9uIHNlbGYtc3RyZXRjaCBmbGV4IGZsZXgtY2VudGVyIHRleHQtY2VudGVyJ1xuICAgICsgKFxuICAgICAgaXNBY3RpdmUudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyAoXG4gICAgICAgICAgICAnIHEtdGFiLS1hY3RpdmUnXG4gICAgICAgICAgICArICgkdGFicy50YWJQcm9wcy52YWx1ZS5hY3RpdmVDbGFzcyA/ICcgJyArICR0YWJzLnRhYlByb3BzLnZhbHVlLmFjdGl2ZUNsYXNzIDogJycpXG4gICAgICAgICAgICArICgkdGFicy50YWJQcm9wcy52YWx1ZS5hY3RpdmVDb2xvciA/IGAgdGV4dC0keyAkdGFicy50YWJQcm9wcy52YWx1ZS5hY3RpdmVDb2xvciB9YCA6ICcnKVxuICAgICAgICAgICAgKyAoJHRhYnMudGFiUHJvcHMudmFsdWUuYWN0aXZlQmdDb2xvciA/IGAgYmctJHsgJHRhYnMudGFiUHJvcHMudmFsdWUuYWN0aXZlQmdDb2xvciB9YCA6ICcnKVxuICAgICAgICAgIClcbiAgICAgICAgOiAnIHEtdGFiLS1pbmFjdGl2ZSdcbiAgICApXG4gICAgKyAocHJvcHMuaWNvbiAmJiBwcm9wcy5sYWJlbCAmJiAkdGFicy50YWJQcm9wcy52YWx1ZS5pbmxpbmVMYWJlbCA9PT0gZmFsc2UgPyAnIHEtdGFiLS1mdWxsJyA6ICcnKVxuICAgICsgKHByb3BzLm5vQ2FwcyA9PT0gdHJ1ZSB8fCAkdGFicy50YWJQcm9wcy52YWx1ZS5ub0NhcHMgPT09IHRydWUgPyAnIHEtdGFiLS1uby1jYXBzJyA6ICcnKVxuICAgICsgKHByb3BzLmRpc2FibGUgPT09IHRydWUgPyAnIGRpc2FibGVkJyA6ICcgcS1mb2N1c2FibGUgcS1ob3ZlcmFibGUgY3Vyc29yLXBvaW50ZXInKVxuICAgICsgKHJvdXRlRGF0YSAhPT0gdm9pZCAwID8gcm91dGVEYXRhLmxpbmtDbGFzcy52YWx1ZSA6ICcnKVxuICApXG5cbiAgY29uc3QgaW5uZXJDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgJ3EtdGFiX19jb250ZW50IHNlbGYtc3RyZXRjaCBmbGV4LWNlbnRlciByZWxhdGl2ZS1wb3NpdGlvbiBxLWFuY2hvci0tc2tpcCBub24tc2VsZWN0YWJsZSAnXG4gICAgKyAoJHRhYnMudGFiUHJvcHMudmFsdWUuaW5saW5lTGFiZWwgPT09IHRydWUgPyAncm93IG5vLXdyYXAgcS10YWJfX2NvbnRlbnQtLWlubGluZScgOiAnY29sdW1uJylcbiAgICArIChwcm9wcy5jb250ZW50Q2xhc3MgIT09IHZvaWQgMCA/IGAgJHsgcHJvcHMuY29udGVudENsYXNzIH1gIDogJycpXG4gIClcblxuICBjb25zdCB0YWJJbmRleCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAoXG4gICAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlXG4gICAgICB8fCAkdGFicy5oYXNGb2N1cy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgfHwgKGlzQWN0aXZlLnZhbHVlID09PSBmYWxzZSAmJiAkdGFicy5oYXNBY3RpdmVUYWIudmFsdWUgPT09IHRydWUpXG4gICAgKVxuICAgICAgPyAtMVxuICAgICAgOiBwcm9wcy50YWJpbmRleCB8fCAwXG4gICkpXG5cbiAgZnVuY3Rpb24gb25DbGljayAoZSwga2V5Ym9hcmQpIHtcbiAgICBpZiAoa2V5Ym9hcmQgIT09IHRydWUgJiYgYmx1clRhcmdldFJlZi52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgYmx1clRhcmdldFJlZi52YWx1ZS5mb2N1cygpXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmRpc2FibGUgPT09IHRydWUpIHtcbiAgICAgIC8vIHdlIHNob3VsZCBoaW5kZXIgbmF0aXZlIG5hdmlnYXRpb24gdGhvdWdoXG4gICAgICBpZiAocm91dGVEYXRhICE9PSB2b2lkIDAgJiYgcm91dGVEYXRhLmhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgc3RvcEFuZFByZXZlbnQoZSlcbiAgICAgIH1cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIGRvIHdlIGhhdmUgYSBRVGFiP1xuICAgIGlmIChyb3V0ZURhdGEgPT09IHZvaWQgMCkge1xuICAgICAgJHRhYnMudXBkYXRlTW9kZWwoeyBuYW1lOiBwcm9wcy5uYW1lIH0pXG4gICAgICBlbWl0KCdjbGljaycsIGUpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAocm91dGVEYXRhLmhhc1JvdXRlckxpbmsudmFsdWUgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGdvID0gKG9wdHMgPSB7fSkgPT4ge1xuICAgICAgICAvLyBpZiByZXF1aXJpbmcgdG8gZ28gdG8gYW5vdGhlciByb3V0ZSwgdGhlbiB3ZVxuICAgICAgICAvLyBsZXQgdGhlIFFUYWJzIHJvdXRlIHdhdGNoZXIgZG8gaXRzIGpvYixcbiAgICAgICAgLy8gb3RoZXJ3aXNlIGRpcmVjdGx5IHNlbGVjdCB0aGlzXG4gICAgICAgIGxldCBoYXJkRXJyb3JcbiAgICAgICAgY29uc3QgcmVxSWQgPSBvcHRzLnRvID09PSB2b2lkIDAgfHwgaXNEZWVwRXF1YWwob3B0cy50bywgcHJvcHMudG8pID09PSB0cnVlXG4gICAgICAgICAgPyAoJHRhYnMuYXZvaWRSb3V0ZVdhdGNoZXIgPSB1aWQoKSlcbiAgICAgICAgICA6IG51bGxcblxuICAgICAgICByZXR1cm4gcm91dGVEYXRhLm5hdmlnYXRlVG9Sb3V0ZXJMaW5rKGUsIHsgLi4ub3B0cywgcmV0dXJuUm91dGVyRXJyb3I6IHRydWUgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IHsgaGFyZEVycm9yID0gZXJyIH0pXG4gICAgICAgICAgLnRoZW4oc29mdEVycm9yID0+IHtcbiAgICAgICAgICAgIGlmIChyZXFJZCA9PT0gJHRhYnMuYXZvaWRSb3V0ZVdhdGNoZXIpIHtcbiAgICAgICAgICAgICAgJHRhYnMuYXZvaWRSb3V0ZVdhdGNoZXIgPSBmYWxzZVxuXG4gICAgICAgICAgICAgIC8vIGlmIHdlIGRvbid0IGhhdmUgYW55IGhhcmQgZXJyb3JzIG9yIGFueSBzb2Z0IGVycm9ycywgZXhjZXB0IGZvclxuICAgICAgICAgICAgICAvLyB3aGVuIG5hdmlnYXRpbmcgdG8gdGhlIHNhbWUgcm91dGUgKG9uIGFsbCBvdGhlciBzb2Z0IGVycm9ycyxcbiAgICAgICAgICAgICAgLy8gbGlrZSB3aGVuIG5hdmlnYXRpb24gd2FzIGFib3J0ZWQgaW4gYSBuYXYgZ3VhcmQsIHdlIGRvbid0IGFjdGl2YXRlIHRoaXMgdGFiKVxuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaGFyZEVycm9yID09PSB2b2lkIDAgJiYgKFxuICAgICAgICAgICAgICAgICAgc29mdEVycm9yID09PSB2b2lkIDBcbiAgICAgICAgICAgICAgICAgIHx8IHNvZnRFcnJvci5tZXNzYWdlLnN0YXJ0c1dpdGgoJ0F2b2lkZWQgcmVkdW5kYW50IG5hdmlnYXRpb24nKSA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgJHRhYnMudXBkYXRlTW9kZWwoeyBuYW1lOiBwcm9wcy5uYW1lIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMucmV0dXJuUm91dGVyRXJyb3IgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhcmRFcnJvciAhPT0gdm9pZCAwID8gUHJvbWlzZS5yZWplY3QoaGFyZEVycm9yKSA6IHNvZnRFcnJvclxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGVtaXQoJ2NsaWNrJywgZSwgZ28pXG4gICAgICBlLmRlZmF1bHRQcmV2ZW50ZWQgIT09IHRydWUgJiYgZ28oKVxuXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBlbWl0KCdjbGljaycsIGUpXG4gIH1cblxuICBmdW5jdGlvbiBvbktleWRvd24gKGUpIHtcbiAgICBpZiAoaXNLZXlDb2RlKGUsIFsgMTMsIDMyIF0pKSB7XG4gICAgICBvbkNsaWNrKGUsIHRydWUpXG4gICAgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgc2hvdWxkSWdub3JlS2V5KGUpICE9PSB0cnVlXG4gICAgICAmJiBlLmtleUNvZGUgPj0gMzVcbiAgICAgICYmIGUua2V5Q29kZSA8PSA0MFxuICAgICAgJiYgZS5hbHRLZXkgIT09IHRydWVcbiAgICAgICYmIGUubWV0YUtleSAhPT0gdHJ1ZVxuICAgICkge1xuICAgICAgJHRhYnMub25LYmROYXZpZ2F0ZShlLmtleUNvZGUsIHByb3h5LiRlbCkgPT09IHRydWUgJiYgc3RvcEFuZFByZXZlbnQoZSlcbiAgICB9XG5cbiAgICBlbWl0KCdrZXlkb3duJywgZSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENvbnRlbnQgKCkge1xuICAgIGNvbnN0XG4gICAgICBuYXJyb3cgPSAkdGFicy50YWJQcm9wcy52YWx1ZS5uYXJyb3dJbmRpY2F0b3IsXG4gICAgICBjb250ZW50ID0gW10sXG4gICAgICBpbmRpY2F0b3IgPSBoKCdkaXYnLCB7XG4gICAgICAgIHJlZjogdGFiSW5kaWNhdG9yUmVmLFxuICAgICAgICBjbGFzczogW1xuICAgICAgICAgICdxLXRhYl9faW5kaWNhdG9yJyxcbiAgICAgICAgICAkdGFicy50YWJQcm9wcy52YWx1ZS5pbmRpY2F0b3JDbGFzc1xuICAgICAgICBdXG4gICAgICB9KVxuXG4gICAgcHJvcHMuaWNvbiAhPT0gdm9pZCAwICYmIGNvbnRlbnQucHVzaChcbiAgICAgIGgoUUljb24sIHtcbiAgICAgICAgY2xhc3M6ICdxLXRhYl9faWNvbicsXG4gICAgICAgIG5hbWU6IHByb3BzLmljb25cbiAgICAgIH0pXG4gICAgKVxuXG4gICAgcHJvcHMubGFiZWwgIT09IHZvaWQgMCAmJiBjb250ZW50LnB1c2goXG4gICAgICBoKCdkaXYnLCB7IGNsYXNzOiAncS10YWJfX2xhYmVsJyB9LCBwcm9wcy5sYWJlbClcbiAgICApXG5cbiAgICBwcm9wcy5hbGVydCAhPT0gZmFsc2UgJiYgY29udGVudC5wdXNoKFxuICAgICAgcHJvcHMuYWxlcnRJY29uICE9PSB2b2lkIDBcbiAgICAgICAgPyBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXRhYl9fYWxlcnQtaWNvbicsXG4gICAgICAgICAgY29sb3I6IHByb3BzLmFsZXJ0ICE9PSB0cnVlXG4gICAgICAgICAgICA/IHByb3BzLmFsZXJ0XG4gICAgICAgICAgICA6IHZvaWQgMCxcbiAgICAgICAgICBuYW1lOiBwcm9wcy5hbGVydEljb25cbiAgICAgICAgfSlcbiAgICAgICAgOiBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLXRhYl9fYWxlcnQnXG4gICAgICAgICAgICArIChwcm9wcy5hbGVydCAhPT0gdHJ1ZSA/IGAgdGV4dC0keyBwcm9wcy5hbGVydCB9YCA6ICcnKVxuICAgICAgICB9KVxuICAgIClcblxuICAgIG5hcnJvdyA9PT0gdHJ1ZSAmJiBjb250ZW50LnB1c2goaW5kaWNhdG9yKVxuXG4gICAgY29uc3Qgbm9kZSA9IFtcbiAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLWZvY3VzLWhlbHBlcicsIHRhYmluZGV4OiAtMSwgcmVmOiBibHVyVGFyZ2V0UmVmIH0pLFxuICAgICAgaCgnZGl2JywgeyBjbGFzczogaW5uZXJDbGFzcy52YWx1ZSB9LCBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIGNvbnRlbnQpKVxuICAgIF1cblxuICAgIG5hcnJvdyA9PT0gZmFsc2UgJiYgbm9kZS5wdXNoKGluZGljYXRvcilcblxuICAgIHJldHVybiBub2RlXG4gIH1cblxuICBjb25zdCB0YWJEYXRhID0ge1xuICAgIG5hbWU6IGNvbXB1dGVkKCgpID0+IHByb3BzLm5hbWUpLFxuICAgIHJvb3RSZWYsXG4gICAgdGFiSW5kaWNhdG9yUmVmLFxuICAgIHJvdXRlRGF0YVxuICB9XG5cbiAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAkdGFicy51bnJlZ2lzdGVyVGFiKHRhYkRhdGEpXG4gIH0pXG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICAkdGFicy5yZWdpc3RlclRhYih0YWJEYXRhKVxuICB9KVxuXG4gIGZ1bmN0aW9uIHJlbmRlclRhYiAodGFnLCBjdXN0b21EYXRhKSB7XG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIHJlZjogcm9vdFJlZixcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgdGFiaW5kZXg6IHRhYkluZGV4LnZhbHVlLFxuICAgICAgcm9sZTogJ3RhYicsXG4gICAgICAnYXJpYS1zZWxlY3RlZCc6IGlzQWN0aXZlLnZhbHVlID09PSB0cnVlID8gJ3RydWUnIDogJ2ZhbHNlJyxcbiAgICAgICdhcmlhLWRpc2FibGVkJzogcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSA/ICd0cnVlJyA6IHZvaWQgMCxcbiAgICAgIG9uQ2xpY2ssXG4gICAgICBvbktleWRvd24sXG4gICAgICAuLi5jdXN0b21EYXRhXG4gICAgfVxuXG4gICAgcmV0dXJuIHdpdGhEaXJlY3RpdmVzKFxuICAgICAgaCh0YWcsIGRhdGEsIGdldENvbnRlbnQoKSksXG4gICAgICBbIFsgUmlwcGxlLCByaXBwbGUudmFsdWUgXSBdXG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIHsgcmVuZGVyVGFiLCAkdGFicyB9XG59XG4iLCJpbXBvcnQgdXNlVGFiLCB7IHVzZVRhYlByb3BzLCB1c2VUYWJFbWl0cyB9IGZyb20gJy4vdXNlLXRhYi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGFiJyxcblxuICBwcm9wczogdXNlVGFiUHJvcHMsXG5cbiAgZW1pdHM6IHVzZVRhYkVtaXRzLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyByZW5kZXJUYWIgfSA9IHVzZVRhYihwcm9wcywgc2xvdHMsIGVtaXQpXG4gICAgcmV0dXJuICgpID0+IHJlbmRlclRhYignZGl2JylcbiAgfVxufSlcbiIsImltcG9ydCB7IG5leHRUaWNrLCBvbkRlYWN0aXZhdGVkLCBvbkJlZm9yZVVubW91bnQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgdm1Jc0Rlc3Ryb3llZCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvdm0nXG5cbi8qXG4gKiBVc2FnZTpcbiAqICAgIHJlZ2lzdGVyVGljayhmbilcbiAqICAgIHJlbW92ZVRpY2soKVxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IHRpY2tGblxuICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgZnVuY3Rpb24gcmVtb3ZlVGljayAoKSB7XG4gICAgdGlja0ZuID0gdm9pZCAwXG4gIH1cblxuICBvbkRlYWN0aXZhdGVkKHJlbW92ZVRpY2spXG4gIG9uQmVmb3JlVW5tb3VudChyZW1vdmVUaWNrKVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlVGljayxcblxuICAgIHJlZ2lzdGVyVGljayAoZm4pIHtcbiAgICAgIHRpY2tGbiA9IGZuXG5cbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHRpY2tGbiA9PT0gZm4pIHtcbiAgICAgICAgICAvLyB3ZSBhbHNvIGNoZWNrIGlmIFZNIGlzIGRlc3Ryb3llZCwgc2luY2UgaWYgaXRcbiAgICAgICAgICAvLyBnb3QgdG8gdHJpZ2dlciBvbmUgbmV4dFRpY2soKSB3ZSBjYW5ub3Qgc3RvcCBpdFxuICAgICAgICAgIHZtSXNEZXN0cm95ZWQodm0pID09PSBmYWxzZSAmJiB0aWNrRm4oKVxuICAgICAgICAgIHRpY2tGbiA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIiwibGV0IHJ0bEhhc1Njcm9sbEJ1ZyA9IGZhbHNlXG5cbi8vIG1vYmlsZSBDaHJvbWUgdGFrZXMgdGhlIGNyb3duIGZvciB0aGlzXG5pZiAoIV9fUVVBU0FSX1NTUl9fKSB7XG4gIGNvbnN0IHNjcm9sbGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgc2Nyb2xsZXIuc2V0QXR0cmlidXRlKCdkaXInLCAncnRsJylcbiAgT2JqZWN0LmFzc2lnbihzY3JvbGxlci5zdHlsZSwge1xuICAgIHdpZHRoOiAnMXB4JyxcbiAgICBoZWlnaHQ6ICcxcHgnLFxuICAgIG92ZXJmbG93OiAnYXV0bydcbiAgfSlcblxuICBjb25zdCBzcGFjZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBPYmplY3QuYXNzaWduKHNwYWNlci5zdHlsZSwge1xuICAgIHdpZHRoOiAnMTAwMHB4JyxcbiAgICBoZWlnaHQ6ICcxcHgnXG4gIH0pXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxlcilcbiAgc2Nyb2xsZXIuYXBwZW5kQ2hpbGQoc3BhY2VyKVxuICBzY3JvbGxlci5zY3JvbGxMZWZ0ID0gLTEwMDBcblxuICBydGxIYXNTY3JvbGxCdWcgPSBzY3JvbGxlci5zY3JvbGxMZWZ0ID49IDBcblxuICBzY3JvbGxlci5yZW1vdmUoKVxufVxuXG5leHBvcnQge1xuICBydGxIYXNTY3JvbGxCdWdcbn1cbiIsImltcG9ydCB7IGgsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbkJlZm9yZVVubW91bnQsIG9uQWN0aXZhdGVkLCBvbkRlYWN0aXZhdGVkLCBnZXRDdXJyZW50SW5zdGFuY2UsIHByb3ZpZGUgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuaW1wb3J0IFFSZXNpemVPYnNlcnZlciBmcm9tICcuLi9yZXNpemUtb2JzZXJ2ZXIvUVJlc2l6ZU9ic2VydmVyLmpzJ1xuXG5pbXBvcnQgdXNlVGljayBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS10aWNrLmpzJ1xuaW1wb3J0IHVzZVRpbWVvdXQgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdGltZW91dC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgdGFic0tleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcbmltcG9ydCB7IHJ0bEhhc1Njcm9sbEJ1ZyB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcnRsLmpzJ1xuXG5mdW5jdGlvbiBnZXRJbmRpY2F0b3JDbGFzcyAoY29sb3IsIHRvcCwgdmVydGljYWwpIHtcbiAgY29uc3QgcG9zID0gdmVydGljYWwgPT09IHRydWVcbiAgICA/IFsgJ2xlZnQnLCAncmlnaHQnIF1cbiAgICA6IFsgJ3RvcCcsICdib3R0b20nIF1cblxuICByZXR1cm4gYGFic29sdXRlLSR7IHRvcCA9PT0gdHJ1ZSA/IHBvc1sgMCBdIDogcG9zWyAxIF0gfSR7IGNvbG9yID8gYCB0ZXh0LSR7IGNvbG9yIH1gIDogJycgfWBcbn1cblxuY29uc3QgYWxpZ25WYWx1ZXMgPSBbICdsZWZ0JywgJ2NlbnRlcicsICdyaWdodCcsICdqdXN0aWZ5JyBdXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRVGFicycsXG5cbiAgcHJvcHM6IHtcbiAgICBtb2RlbFZhbHVlOiBbIE51bWJlciwgU3RyaW5nIF0sXG5cbiAgICBhbGlnbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2NlbnRlcicsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gYWxpZ25WYWx1ZXMuaW5jbHVkZXModilcbiAgICB9LFxuICAgIGJyZWFrcG9pbnQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDYwMFxuICAgIH0sXG5cbiAgICB2ZXJ0aWNhbDogQm9vbGVhbixcbiAgICBzaHJpbms6IEJvb2xlYW4sXG4gICAgc3RyZXRjaDogQm9vbGVhbixcblxuICAgIGFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gICAgYWN0aXZlQ29sb3I6IFN0cmluZyxcbiAgICBhY3RpdmVCZ0NvbG9yOiBTdHJpbmcsXG4gICAgaW5kaWNhdG9yQ29sb3I6IFN0cmluZyxcbiAgICBsZWZ0SWNvbjogU3RyaW5nLFxuICAgIHJpZ2h0SWNvbjogU3RyaW5nLFxuXG4gICAgb3V0c2lkZUFycm93czogQm9vbGVhbixcbiAgICBtb2JpbGVBcnJvd3M6IEJvb2xlYW4sXG5cbiAgICBzd2l0Y2hJbmRpY2F0b3I6IEJvb2xlYW4sXG5cbiAgICBuYXJyb3dJbmRpY2F0b3I6IEJvb2xlYW4sXG4gICAgaW5saW5lTGFiZWw6IEJvb2xlYW4sXG4gICAgbm9DYXBzOiBCb29sZWFuLFxuXG4gICAgZGVuc2U6IEJvb2xlYW4sXG5cbiAgICBjb250ZW50Q2xhc3M6IFN0cmluZyxcblxuICAgICdvblVwZGF0ZTptb2RlbFZhbHVlJzogWyBGdW5jdGlvbiwgQXJyYXkgXVxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCB9KSB7XG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7ICRxIH0gPSBwcm94eVxuXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2s6IHJlZ2lzdGVyU2Nyb2xsVGljayB9ID0gdXNlVGljaygpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2s6IHJlZ2lzdGVyVXBkYXRlQXJyb3dzVGljayB9ID0gdXNlVGljaygpXG4gICAgY29uc3QgeyByZWdpc3RlclRpY2s6IHJlZ2lzdGVyQW5pbWF0ZVRpY2sgfSA9IHVzZVRpY2soKVxuXG4gICAgY29uc3QgeyByZWdpc3RlclRpbWVvdXQ6IHJlZ2lzdGVyRm9jdXNUaW1lb3V0LCByZW1vdmVUaW1lb3V0OiByZW1vdmVGb2N1c1RpbWVvdXQgfSA9IHVzZVRpbWVvdXQoKVxuICAgIGNvbnN0IHsgcmVnaXN0ZXJUaW1lb3V0OiByZWdpc3RlclNjcm9sbFRvVGFiVGltZW91dCwgcmVtb3ZlVGltZW91dDogcmVtb3ZlU2Nyb2xsVG9UYWJUaW1lb3V0IH0gPSB1c2VUaW1lb3V0KClcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcbiAgICBjb25zdCBjb250ZW50UmVmID0gcmVmKG51bGwpXG5cbiAgICBjb25zdCBjdXJyZW50TW9kZWwgPSByZWYocHJvcHMubW9kZWxWYWx1ZSlcbiAgICBjb25zdCBzY3JvbGxhYmxlID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGxlZnRBcnJvdyA9IHJlZih0cnVlKVxuICAgIGNvbnN0IHJpZ2h0QXJyb3cgPSByZWYoZmFsc2UpXG4gICAgY29uc3QganVzdGlmeSA9IHJlZihmYWxzZSlcblxuICAgIGNvbnN0IHRhYkRhdGFMaXN0ID0gW11cbiAgICBjb25zdCB0YWJEYXRhTGlzdExlbiA9IHJlZigwKVxuICAgIGNvbnN0IGhhc0ZvY3VzID0gcmVmKGZhbHNlKVxuXG4gICAgbGV0IGFuaW1hdGVUaW1lciA9IG51bGwsIHNjcm9sbFRpbWVyID0gbnVsbCwgdW53YXRjaFJvdXRlXG5cbiAgICBjb25zdCB0YWJQcm9wcyA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBhY3RpdmVDbGFzczogcHJvcHMuYWN0aXZlQ2xhc3MsXG4gICAgICBhY3RpdmVDb2xvcjogcHJvcHMuYWN0aXZlQ29sb3IsXG4gICAgICBhY3RpdmVCZ0NvbG9yOiBwcm9wcy5hY3RpdmVCZ0NvbG9yLFxuICAgICAgaW5kaWNhdG9yQ2xhc3M6IGdldEluZGljYXRvckNsYXNzKFxuICAgICAgICBwcm9wcy5pbmRpY2F0b3JDb2xvcixcbiAgICAgICAgcHJvcHMuc3dpdGNoSW5kaWNhdG9yLFxuICAgICAgICBwcm9wcy52ZXJ0aWNhbFxuICAgICAgKSxcbiAgICAgIG5hcnJvd0luZGljYXRvcjogcHJvcHMubmFycm93SW5kaWNhdG9yLFxuICAgICAgaW5saW5lTGFiZWw6IHByb3BzLmlubGluZUxhYmVsLFxuICAgICAgbm9DYXBzOiBwcm9wcy5ub0NhcHNcbiAgICB9KSlcblxuICAgIGNvbnN0IGhhc0FjdGl2ZVRhYiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGxlbiA9IHRhYkRhdGFMaXN0TGVuLnZhbHVlXG4gICAgICBjb25zdCB2YWwgPSBjdXJyZW50TW9kZWwudmFsdWVcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAodGFiRGF0YUxpc3RbIGkgXS5uYW1lLnZhbHVlID09PSB2YWwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0pXG5cbiAgICBjb25zdCBhbGlnbkNsYXNzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWxpZ24gPSBzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gJ2xlZnQnXG4gICAgICAgIDogKGp1c3RpZnkudmFsdWUgPT09IHRydWUgPyAnanVzdGlmeScgOiBwcm9wcy5hbGlnbilcblxuICAgICAgcmV0dXJuIGBxLXRhYnNfX2NvbnRlbnQtLWFsaWduLSR7IGFsaWduIH1gXG4gICAgfSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdGFicyByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICArIGAgcS10YWJzLS0keyBzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlID8gJycgOiAnbm90LScgfXNjcm9sbGFibGVgXG4gICAgICArIGAgcS10YWJzLS0keyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCcgfWBcbiAgICAgICsgYCBxLXRhYnNfX2Fycm93cy0tJHsgcHJvcHMub3V0c2lkZUFycm93cyA9PT0gdHJ1ZSA/ICdvdXRzaWRlJyA6ICdpbnNpZGUnIH1gXG4gICAgICArIGAgcS10YWJzLS1tb2JpbGUtd2l0aCR7IHByb3BzLm1vYmlsZUFycm93cyA9PT0gdHJ1ZSA/ICcnIDogJ291dCcgfS1hcnJvd3NgXG4gICAgICArIChwcm9wcy5kZW5zZSA9PT0gdHJ1ZSA/ICcgcS10YWJzLS1kZW5zZScgOiAnJylcbiAgICAgICsgKHByb3BzLnNocmluayA9PT0gdHJ1ZSA/ICcgY29sLXNocmluaycgOiAnJylcbiAgICAgICsgKHByb3BzLnN0cmV0Y2ggPT09IHRydWUgPyAnIHNlbGYtc3RyZXRjaCcgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBpbm5lckNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLXRhYnNfX2NvbnRlbnQgc2Nyb2xsLS1tb2JpbGUgcm93IG5vLXdyYXAgaXRlbXMtY2VudGVyIHNlbGYtc3RyZXRjaCBoaWRlLXNjcm9sbGJhciByZWxhdGl2ZS1wb3NpdGlvbiAnXG4gICAgICArIGFsaWduQ2xhc3MudmFsdWVcbiAgICAgICsgKHByb3BzLmNvbnRlbnRDbGFzcyAhPT0gdm9pZCAwID8gYCAkeyBwcm9wcy5jb250ZW50Q2xhc3MgfWAgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBkb21Qcm9wcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgID8geyBjb250YWluZXI6ICdoZWlnaHQnLCBjb250ZW50OiAnb2Zmc2V0SGVpZ2h0Jywgc2Nyb2xsOiAnc2Nyb2xsSGVpZ2h0JyB9XG4gICAgICAgIDogeyBjb250YWluZXI6ICd3aWR0aCcsIGNvbnRlbnQ6ICdvZmZzZXRXaWR0aCcsIHNjcm9sbDogJ3Njcm9sbFdpZHRoJyB9XG4gICAgKSlcblxuICAgIGNvbnN0IGlzUlRMID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMudmVydGljYWwgIT09IHRydWUgJiYgJHEubGFuZy5ydGwgPT09IHRydWUpXG4gICAgY29uc3QgcnRsUG9zQ29ycmVjdGlvbiA9IGNvbXB1dGVkKCgpID0+IHJ0bEhhc1Njcm9sbEJ1ZyA9PT0gZmFsc2UgJiYgaXNSVEwudmFsdWUgPT09IHRydWUpXG5cbiAgICB3YXRjaChpc1JUTCwgdXBkYXRlQXJyb3dzKVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgbmFtZSA9PiB7XG4gICAgICB1cGRhdGVNb2RlbCh7IG5hbWUsIHNldEN1cnJlbnQ6IHRydWUsIHNraXBFbWl0OiB0cnVlIH0pXG4gICAgfSlcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm91dHNpZGVBcnJvd3MsIHJlY2FsY3VsYXRlU2Nyb2xsKVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTW9kZWwgKHsgbmFtZSwgc2V0Q3VycmVudCwgc2tpcEVtaXQgfSkge1xuICAgICAgaWYgKGN1cnJlbnRNb2RlbC52YWx1ZSAhPT0gbmFtZSkge1xuICAgICAgICBpZiAoc2tpcEVtaXQgIT09IHRydWUgJiYgcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG5hbWUpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgc2V0Q3VycmVudCA9PT0gdHJ1ZVxuICAgICAgICAgIHx8IHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSA9PT0gdm9pZCAwXG4gICAgICAgICkge1xuICAgICAgICAgIGFuaW1hdGUoY3VycmVudE1vZGVsLnZhbHVlLCBuYW1lKVxuICAgICAgICAgIGN1cnJlbnRNb2RlbC52YWx1ZSA9IG5hbWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlY2FsY3VsYXRlU2Nyb2xsICgpIHtcbiAgICAgIHJlZ2lzdGVyU2Nyb2xsVGljaygoKSA9PiB7XG4gICAgICAgIHVwZGF0ZUNvbnRhaW5lcih7XG4gICAgICAgICAgd2lkdGg6IHJvb3RSZWYudmFsdWUub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiByb290UmVmLnZhbHVlLm9mZnNldEhlaWdodFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDb250YWluZXIgKGRvbVNpemUpIHtcbiAgICAgIC8vIGl0IGNhbiBiZSBjYWxsZWQgZmFzdGVyIHRoYW4gY29tcG9uZW50IGJlaW5nIGluaXRpYWxpemVkXG4gICAgICAvLyBzbyB3ZSBuZWVkIHRvIHByb3RlY3QgYWdhaW5zdCB0aGF0IGNhc2VcbiAgICAgIC8vIChvbmUgZXhhbXBsZSBvZiBzdWNoIGNhc2UgaXMgdGhlIGRvY3MgcmVsZWFzZSBub3RlcyBwYWdlKVxuICAgICAgaWYgKGRvbVByb3BzLnZhbHVlID09PSB2b2lkIDAgfHwgY29udGVudFJlZi52YWx1ZSA9PT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gICAgICBjb25zdFxuICAgICAgICBzaXplID0gZG9tU2l6ZVsgZG9tUHJvcHMudmFsdWUuY29udGFpbmVyIF0sXG4gICAgICAgIHNjcm9sbFNpemUgPSBNYXRoLm1pbihcbiAgICAgICAgICBjb250ZW50UmVmLnZhbHVlWyBkb21Qcm9wcy52YWx1ZS5zY3JvbGwgXSxcbiAgICAgICAgICBBcnJheS5wcm90b3R5cGUucmVkdWNlLmNhbGwoXG4gICAgICAgICAgICBjb250ZW50UmVmLnZhbHVlLmNoaWxkcmVuLFxuICAgICAgICAgICAgKGFjYywgZWwpID0+IGFjYyArIChlbFsgZG9tUHJvcHMudmFsdWUuY29udGVudCBdIHx8IDApLFxuICAgICAgICAgICAgMFxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgICAgc2Nyb2xsID0gc2l6ZSA+IDAgJiYgc2Nyb2xsU2l6ZSA+IHNpemUgLy8gd2hlbiB0aGVyZSBpcyBubyB0YWIsIGluIENocm9tZSwgc2l6ZSA9PT0gMCBhbmQgc2Nyb2xsU2l6ZSA9PT0gMVxuXG4gICAgICBzY3JvbGxhYmxlLnZhbHVlID0gc2Nyb2xsXG5cbiAgICAgIC8vIEFycm93cyBuZWVkIHRvIGJlIHVwZGF0ZWQgZXZlbiBpZiB0aGUgc2Nyb2xsIHN0YXR1cyB3YXMgYWxyZWFkeSB0cnVlXG4gICAgICBzY3JvbGwgPT09IHRydWUgJiYgcmVnaXN0ZXJVcGRhdGVBcnJvd3NUaWNrKHVwZGF0ZUFycm93cylcblxuICAgICAganVzdGlmeS52YWx1ZSA9IHNpemUgPCBwYXJzZUludChwcm9wcy5icmVha3BvaW50LCAxMClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlIChvbGROYW1lLCBuZXdOYW1lKSB7XG4gICAgICBjb25zdFxuICAgICAgICBvbGRUYWIgPSBvbGROYW1lICE9PSB2b2lkIDAgJiYgb2xkTmFtZSAhPT0gbnVsbCAmJiBvbGROYW1lICE9PSAnJ1xuICAgICAgICAgID8gdGFiRGF0YUxpc3QuZmluZCh0YWIgPT4gdGFiLm5hbWUudmFsdWUgPT09IG9sZE5hbWUpXG4gICAgICAgICAgOiBudWxsLFxuICAgICAgICBuZXdUYWIgPSBuZXdOYW1lICE9PSB2b2lkIDAgJiYgbmV3TmFtZSAhPT0gbnVsbCAmJiBuZXdOYW1lICE9PSAnJ1xuICAgICAgICAgID8gdGFiRGF0YUxpc3QuZmluZCh0YWIgPT4gdGFiLm5hbWUudmFsdWUgPT09IG5ld05hbWUpXG4gICAgICAgICAgOiBudWxsXG5cbiAgICAgIGlmIChvbGRUYWIgJiYgbmV3VGFiKSB7XG4gICAgICAgIGNvbnN0XG4gICAgICAgICAgb2xkRWwgPSBvbGRUYWIudGFiSW5kaWNhdG9yUmVmLnZhbHVlLFxuICAgICAgICAgIG5ld0VsID0gbmV3VGFiLnRhYkluZGljYXRvclJlZi52YWx1ZVxuXG4gICAgICAgIGlmIChhbmltYXRlVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQoYW5pbWF0ZVRpbWVyKVxuICAgICAgICAgIGFuaW1hdGVUaW1lciA9IG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIG9sZEVsLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSdcbiAgICAgICAgb2xkRWwuc3R5bGUudHJhbnNmb3JtID0gJ25vbmUnXG4gICAgICAgIG5ld0VsLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSdcbiAgICAgICAgbmV3RWwuc3R5bGUudHJhbnNmb3JtID0gJ25vbmUnXG5cbiAgICAgICAgY29uc3RcbiAgICAgICAgICBvbGRQb3MgPSBvbGRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBuZXdQb3MgPSBuZXdFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgICAgIG5ld0VsLnN0eWxlLnRyYW5zZm9ybSA9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgICAgPyBgdHJhbnNsYXRlM2QoMCwkeyBvbGRQb3MudG9wIC0gbmV3UG9zLnRvcCB9cHgsMCkgc2NhbGUzZCgxLCR7IG5ld1Bvcy5oZWlnaHQgPyBvbGRQb3MuaGVpZ2h0IC8gbmV3UG9zLmhlaWdodCA6IDEgfSwxKWBcbiAgICAgICAgICA6IGB0cmFuc2xhdGUzZCgkeyBvbGRQb3MubGVmdCAtIG5ld1Bvcy5sZWZ0IH1weCwwLDApIHNjYWxlM2QoJHsgbmV3UG9zLndpZHRoID8gb2xkUG9zLndpZHRoIC8gbmV3UG9zLndpZHRoIDogMSB9LDEsMSlgXG5cbiAgICAgICAgLy8gYWxsb3cgc2NvcGUgdXBkYXRlcyB0byBraWNrIGluIChRUm91dGVUYWIgbmVlZHMgbW9yZSB0aW1lKVxuICAgICAgICByZWdpc3RlckFuaW1hdGVUaWNrKCgpID0+IHtcbiAgICAgICAgICBhbmltYXRlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGFuaW1hdGVUaW1lciA9IG51bGxcbiAgICAgICAgICAgIG5ld0VsLnN0eWxlLnRyYW5zaXRpb24gPSAndHJhbnNmb3JtIC4yNXMgY3ViaWMtYmV6aWVyKC40LCAwLCAuMiwgMSknXG4gICAgICAgICAgICBuZXdFbC5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSdcbiAgICAgICAgICB9LCA3MClcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKG5ld1RhYiAmJiBzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHNjcm9sbFRvVGFiRWwobmV3VGFiLnJvb3RSZWYudmFsdWUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2Nyb2xsVG9UYWJFbCAoZWwpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIHsgbGVmdCwgd2lkdGgsIHRvcCwgaGVpZ2h0IH0gPSBjb250ZW50UmVmLnZhbHVlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICBuZXdQb3MgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gICAgICBsZXQgb2Zmc2V0ID0gcHJvcHMudmVydGljYWwgPT09IHRydWUgPyBuZXdQb3MudG9wIC0gdG9wIDogbmV3UG9zLmxlZnQgLSBsZWZ0XG5cbiAgICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICAgIGNvbnRlbnRSZWYudmFsdWVbIHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3Njcm9sbFRvcCcgOiAnc2Nyb2xsTGVmdCcgXSArPSBNYXRoLmZsb29yKG9mZnNldClcbiAgICAgICAgdXBkYXRlQXJyb3dzKClcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIG9mZnNldCArPSBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/IG5ld1Bvcy5oZWlnaHQgLSBoZWlnaHQgOiBuZXdQb3Mud2lkdGggLSB3aWR0aFxuICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgY29udGVudFJlZi52YWx1ZVsgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnc2Nyb2xsVG9wJyA6ICdzY3JvbGxMZWZ0JyBdICs9IE1hdGguY2VpbChvZmZzZXQpXG4gICAgICAgIHVwZGF0ZUFycm93cygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlQXJyb3dzICgpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBjb250ZW50UmVmLnZhbHVlXG4gICAgICBpZiAoY29udGVudCA9PT0gbnVsbCkgeyByZXR1cm4gfVxuXG4gICAgICBjb25zdFxuICAgICAgICByZWN0ID0gY29udGVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgcG9zID0gcHJvcHMudmVydGljYWwgPT09IHRydWUgPyBjb250ZW50LnNjcm9sbFRvcCA6IE1hdGguYWJzKGNvbnRlbnQuc2Nyb2xsTGVmdClcblxuICAgICAgaWYgKGlzUlRMLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIGxlZnRBcnJvdy52YWx1ZSA9IE1hdGguY2VpbChwb3MgKyByZWN0LndpZHRoKSA8IGNvbnRlbnQuc2Nyb2xsV2lkdGggLSAxXG4gICAgICAgIHJpZ2h0QXJyb3cudmFsdWUgPSBwb3MgPiAwXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbGVmdEFycm93LnZhbHVlID0gcG9zID4gMFxuICAgICAgICByaWdodEFycm93LnZhbHVlID0gcHJvcHMudmVydGljYWwgPT09IHRydWVcbiAgICAgICAgICA/IE1hdGguY2VpbChwb3MgKyByZWN0LmhlaWdodCkgPCBjb250ZW50LnNjcm9sbEhlaWdodFxuICAgICAgICAgIDogTWF0aC5jZWlsKHBvcyArIHJlY3Qud2lkdGgpIDwgY29udGVudC5zY3JvbGxXaWR0aFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFuaW1TY3JvbGxUbyAodmFsdWUpIHtcbiAgICAgIHNjcm9sbFRpbWVyICE9PSBudWxsICYmIGNsZWFySW50ZXJ2YWwoc2Nyb2xsVGltZXIpXG4gICAgICBzY3JvbGxUaW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKHNjcm9sbFRvd2FyZHModmFsdWUpID09PSB0cnVlKSB7XG4gICAgICAgICAgc3RvcEFuaW1TY3JvbGwoKVxuICAgICAgICB9XG4gICAgICB9LCA1KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNjcm9sbFRvU3RhcnQgKCkge1xuICAgICAgYW5pbVNjcm9sbFRvKHJ0bFBvc0NvcnJlY3Rpb24udmFsdWUgPT09IHRydWUgPyBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiA6IDApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2Nyb2xsVG9FbmQgKCkge1xuICAgICAgYW5pbVNjcm9sbFRvKHJ0bFBvc0NvcnJlY3Rpb24udmFsdWUgPT09IHRydWUgPyAwIDogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RvcEFuaW1TY3JvbGwgKCkge1xuICAgICAgaWYgKHNjcm9sbFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoc2Nyb2xsVGltZXIpXG4gICAgICAgIHNjcm9sbFRpbWVyID0gbnVsbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uS2JkTmF2aWdhdGUgKGtleUNvZGUsIGZyb21FbCkge1xuICAgICAgY29uc3QgdGFicyA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChcbiAgICAgICAgY29udGVudFJlZi52YWx1ZS5jaGlsZHJlbixcbiAgICAgICAgZWwgPT4gZWwgPT09IGZyb21FbCB8fCAoZWwubWF0Y2hlcyAmJiBlbC5tYXRjaGVzKCcucS10YWIucS1mb2N1c2FibGUnKSA9PT0gdHJ1ZSlcbiAgICAgIClcblxuICAgICAgY29uc3QgbGVuID0gdGFicy5sZW5ndGhcbiAgICAgIGlmIChsZW4gPT09IDApIHsgcmV0dXJuIH1cblxuICAgICAgaWYgKGtleUNvZGUgPT09IDM2KSB7IC8vIEhvbWVcbiAgICAgICAgc2Nyb2xsVG9UYWJFbCh0YWJzWyAwIF0pXG4gICAgICAgIHRhYnNbIDAgXS5mb2N1cygpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBpZiAoa2V5Q29kZSA9PT0gMzUpIHsgLy8gRW5kXG4gICAgICAgIHNjcm9sbFRvVGFiRWwodGFic1sgbGVuIC0gMSBdKVxuICAgICAgICB0YWJzWyBsZW4gLSAxIF0uZm9jdXMoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXJQcmV2ID0ga2V5Q29kZSA9PT0gKHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gMzggLyogQXJyb3dVcCAqLyA6IDM3IC8qIEFycm93TGVmdCAqLylcbiAgICAgIGNvbnN0IGRpck5leHQgPSBrZXlDb2RlID09PSAocHJvcHMudmVydGljYWwgPT09IHRydWUgPyA0MCAvKiBBcnJvd0Rvd24gKi8gOiAzOSAvKiBBcnJvd1JpZ2h0ICovKVxuXG4gICAgICBjb25zdCBkaXIgPSBkaXJQcmV2ID09PSB0cnVlID8gLTEgOiAoZGlyTmV4dCA9PT0gdHJ1ZSA/IDEgOiB2b2lkIDApXG5cbiAgICAgIGlmIChkaXIgIT09IHZvaWQgMCkge1xuICAgICAgICBjb25zdCBydGxEaXIgPSBpc1JUTC52YWx1ZSA9PT0gdHJ1ZSA/IC0xIDogMVxuICAgICAgICBjb25zdCBpbmRleCA9IHRhYnMuaW5kZXhPZihmcm9tRWwpICsgZGlyICogcnRsRGlyXG5cbiAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCBsZW4pIHtcbiAgICAgICAgICBzY3JvbGxUb1RhYkVsKHRhYnNbIGluZGV4IF0pXG4gICAgICAgICAgdGFic1sgaW5kZXggXS5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbGV0J3Mgc3BlZWQgdXAgZXhlY3V0aW9uIG9mIHRpbWUtc2Vuc2l0aXZlIHNjcm9sbFRvd2FyZHMoKVxuICAgIC8vIHdpdGggYSBjb21wdXRlZCB2YXJpYWJsZSBieSBkaXJlY3RseSBhcHBseWluZyB0aGUgbWluaW1hbFxuICAgIC8vIG51bWJlciBvZiBpbnN0cnVjdGlvbnMgb24gZ2V0L3NldCBmdW5jdGlvbnNcbiAgICBjb25zdCBwb3NGbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHJ0bFBvc0NvcnJlY3Rpb24udmFsdWUgPT09IHRydWVcbiAgICAgICAgPyB7IGdldDogY29udGVudCA9PiBNYXRoLmFicyhjb250ZW50LnNjcm9sbExlZnQpLCBzZXQ6IChjb250ZW50LCBwb3MpID0+IHsgY29udGVudC5zY3JvbGxMZWZ0ID0gLXBvcyB9IH1cbiAgICAgICAgOiAoXG4gICAgICAgICAgICBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICA/IHsgZ2V0OiBjb250ZW50ID0+IGNvbnRlbnQuc2Nyb2xsVG9wLCBzZXQ6IChjb250ZW50LCBwb3MpID0+IHsgY29udGVudC5zY3JvbGxUb3AgPSBwb3MgfSB9XG4gICAgICAgICAgICAgIDogeyBnZXQ6IGNvbnRlbnQgPT4gY29udGVudC5zY3JvbGxMZWZ0LCBzZXQ6IChjb250ZW50LCBwb3MpID0+IHsgY29udGVudC5zY3JvbGxMZWZ0ID0gcG9zIH0gfVxuICAgICAgICAgIClcbiAgICApKVxuXG4gICAgZnVuY3Rpb24gc2Nyb2xsVG93YXJkcyAodmFsdWUpIHtcbiAgICAgIGNvbnN0XG4gICAgICAgIGNvbnRlbnQgPSBjb250ZW50UmVmLnZhbHVlLFxuICAgICAgICB7IGdldCwgc2V0IH0gPSBwb3NGbi52YWx1ZVxuXG4gICAgICBsZXRcbiAgICAgICAgZG9uZSA9IGZhbHNlLFxuICAgICAgICBwb3MgPSBnZXQoY29udGVudClcblxuICAgICAgY29uc3QgZGlyZWN0aW9uID0gdmFsdWUgPCBwb3MgPyAtMSA6IDFcblxuICAgICAgcG9zICs9IGRpcmVjdGlvbiAqIDVcblxuICAgICAgaWYgKHBvcyA8IDApIHtcbiAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgcG9zID0gMFxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXG4gICAgICAgIChkaXJlY3Rpb24gPT09IC0xICYmIHBvcyA8PSB2YWx1ZSlcbiAgICAgICAgfHwgKGRpcmVjdGlvbiA9PT0gMSAmJiBwb3MgPj0gdmFsdWUpXG4gICAgICApIHtcbiAgICAgICAgZG9uZSA9IHRydWVcbiAgICAgICAgcG9zID0gdmFsdWVcbiAgICAgIH1cblxuICAgICAgc2V0KGNvbnRlbnQsIHBvcylcbiAgICAgIHVwZGF0ZUFycm93cygpXG5cbiAgICAgIHJldHVybiBkb25lXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzUXVlcnlJbmNsdWRlZCAodGFyZ2V0UXVlcnksIG1hdGNoaW5nUXVlcnkpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIHRhcmdldFF1ZXJ5KSB7XG4gICAgICAgIGlmICh0YXJnZXRRdWVyeVsga2V5IF0gIT09IG1hdGNoaW5nUXVlcnlbIGtleSBdKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICAvLyBkbyBub3QgdXNlIGRpcmVjdGx5OyB1c2UgdmVyaWZ5Um91dGVNb2RlbCgpIGluc3RlYWRcbiAgICBmdW5jdGlvbiB1cGRhdGVBY3RpdmVSb3V0ZSAoKSB7XG4gICAgICBsZXQgbmFtZSA9IG51bGwsIGJlc3RTY29yZSA9IHsgbWF0Y2hlZExlbjogMCwgcXVlcnlEaWZmOiA5OTk5LCBocmVmTGVuOiAwIH1cblxuICAgICAgY29uc3QgbGlzdCA9IHRhYkRhdGFMaXN0LmZpbHRlcih0YWIgPT4gdGFiLnJvdXRlRGF0YSAhPT0gdm9pZCAwICYmIHRhYi5yb3V0ZURhdGEuaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgIGNvbnN0IHsgaGFzaDogY3VycmVudEhhc2gsIHF1ZXJ5OiBjdXJyZW50UXVlcnkgfSA9IHByb3h5LiRyb3V0ZVxuICAgICAgY29uc3QgY3VycmVudFF1ZXJ5TGVuID0gT2JqZWN0LmtleXMoY3VycmVudFF1ZXJ5KS5sZW5ndGhcblxuICAgICAgLy8gVnVlIFJvdXRlciBkb2VzIG5vdCBrZWVwIGFjY291bnQgb2YgaGFzaCAmIHF1ZXJ5IHdoZW4gbWF0Y2hpbmdcbiAgICAgIC8vIHNvIHdlJ3JlIGRvaW5nIHRoaXMgYXMgd2VsbFxuXG4gICAgICBmb3IgKGNvbnN0IHRhYiBvZiBsaXN0KSB7XG4gICAgICAgIGNvbnN0IGV4YWN0ID0gdGFiLnJvdXRlRGF0YS5leGFjdC52YWx1ZSA9PT0gdHJ1ZVxuXG4gICAgICAgIGlmICh0YWIucm91dGVEYXRhWyBleGFjdCA9PT0gdHJ1ZSA/ICdsaW5rSXNFeGFjdEFjdGl2ZScgOiAnbGlua0lzQWN0aXZlJyBdLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgICAgLy8gaXQgY2Fubm90IG1hdGNoIGFueXRoaW5nIGFzIGl0J3Mgbm90IGFjdGl2ZSBub3IgZXhhY3QtYWN0aXZlXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHsgaGFzaCwgcXVlcnksIG1hdGNoZWQsIGhyZWYgfSA9IHRhYi5yb3V0ZURhdGEucmVzb2x2ZWRMaW5rLnZhbHVlXG4gICAgICAgIGNvbnN0IHF1ZXJ5TGVuID0gT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aFxuXG4gICAgICAgIGlmIChleGFjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGlmIChoYXNoICE9PSBjdXJyZW50SGFzaCkge1xuICAgICAgICAgICAgLy8gaXQncyBzZXQgdG8gZXhhY3QgYnV0IGl0IGRvZXNuJ3QgbWF0Y2hlcyB0aGUgaGFzaFxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICBxdWVyeUxlbiAhPT0gY3VycmVudFF1ZXJ5TGVuXG4gICAgICAgICAgICB8fCBoYXNRdWVyeUluY2x1ZGVkKGN1cnJlbnRRdWVyeSwgcXVlcnkpID09PSBmYWxzZVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgLy8gaXQncyBzZXQgdG8gZXhhY3QgYnV0IGl0IGRvZXNuJ3QgbWF0Y2hlcyB0aGUgcXVlcnlcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8geWV5LCB3ZSBmb3VuZCB0aGUgcGVyZmVjdCBtYXRjaCAocm91dGUgKyBoYXNoICsgcXVlcnkpXG4gICAgICAgICAgbmFtZSA9IHRhYi5uYW1lLnZhbHVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNoICE9PSAnJyAmJiBoYXNoICE9PSBjdXJyZW50SGFzaCkge1xuICAgICAgICAgIC8vIGl0IGhhcyBoYXNoIGFuZCBpdCBkb2Vzbid0IG1hdGNoZXNcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHF1ZXJ5TGVuICE9PSAwXG4gICAgICAgICAgJiYgaGFzUXVlcnlJbmNsdWRlZChxdWVyeSwgY3VycmVudFF1ZXJ5KSA9PT0gZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy8gaXQgaGFzIHF1ZXJ5IGFuZCBpdCBkb2Vzbid0IGluY2x1ZGVzIHRoZSBjdXJyZW50IG9uZVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdTY29yZSA9IHtcbiAgICAgICAgICBtYXRjaGVkTGVuOiBtYXRjaGVkLmxlbmd0aCxcbiAgICAgICAgICBxdWVyeURpZmY6IGN1cnJlbnRRdWVyeUxlbiAtIHF1ZXJ5TGVuLFxuICAgICAgICAgIGhyZWZMZW46IGhyZWYubGVuZ3RoIC0gaGFzaC5sZW5ndGhcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdTY29yZS5tYXRjaGVkTGVuID4gYmVzdFNjb3JlLm1hdGNoZWRMZW4pIHtcbiAgICAgICAgICAvLyBpdCBtYXRjaGVzIG1vcmUgcm91dGVzIHNvIGl0J3MgbW9yZSBzcGVjaWZpYyBzbyB3ZSBzZXQgaXQgYXMgY3VycmVudCBjaGFtcGlvblxuICAgICAgICAgIG5hbWUgPSB0YWIubmFtZS52YWx1ZVxuICAgICAgICAgIGJlc3RTY29yZSA9IG5ld1Njb3JlXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuZXdTY29yZS5tYXRjaGVkTGVuICE9PSBiZXN0U2NvcmUubWF0Y2hlZExlbikge1xuICAgICAgICAgIC8vIGl0IG1hdGNoZXMgbGVzcyByb3V0ZXMgdGhhbiB0aGUgY3VycmVudCBjaGFtcGlvbiBzbyB3ZSBkaXNjYXJkIGl0XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdTY29yZS5xdWVyeURpZmYgPCBiZXN0U2NvcmUucXVlcnlEaWZmKSB7XG4gICAgICAgICAgLy8gcXVlcnkgaXMgY2xvc2VyIHRvIHRoZSBjdXJyZW50IG9uZSBzbyB3ZSBzZXQgaXQgYXMgY3VycmVudCBjaGFtcGlvblxuICAgICAgICAgIG5hbWUgPSB0YWIubmFtZS52YWx1ZVxuICAgICAgICAgIGJlc3RTY29yZSA9IG5ld1Njb3JlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmV3U2NvcmUucXVlcnlEaWZmICE9PSBiZXN0U2NvcmUucXVlcnlEaWZmKSB7XG4gICAgICAgICAgLy8gaXQgbWF0Y2hlcyBsZXNzIHJvdXRlcyB0aGFuIHRoZSBjdXJyZW50IGNoYW1waW9uIHNvIHdlIGRpc2NhcmQgaXRcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1Njb3JlLmhyZWZMZW4gPiBiZXN0U2NvcmUuaHJlZkxlbikge1xuICAgICAgICAgIC8vIGhyZWYgaXMgbGVuZ3RoaWVyIHNvIGl0J3MgbW9yZSBzcGVjaWZpYyBzbyB3ZSBzZXQgaXQgYXMgY3VycmVudCBjaGFtcGlvblxuICAgICAgICAgIG5hbWUgPSB0YWIubmFtZS52YWx1ZVxuICAgICAgICAgIGJlc3RTY29yZSA9IG5ld1Njb3JlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICBuYW1lID09PSBudWxsXG4gICAgICAgICYmIHRhYkRhdGFMaXN0LnNvbWUodGFiID0+IHRhYi5yb3V0ZURhdGEgPT09IHZvaWQgMCAmJiB0YWIubmFtZS52YWx1ZSA9PT0gY3VycmVudE1vZGVsLnZhbHVlKSA9PT0gdHJ1ZVxuICAgICAgKSB7XG4gICAgICAgIC8vIHdlIHNob3VsZG4ndCBpbnRlcmZlcmUgaWYgbm9uLXJvdXRlIHRhYiBpcyBhY3RpdmVcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZU1vZGVsKHsgbmFtZSwgc2V0Q3VycmVudDogdHJ1ZSB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uRm9jdXNpbiAoZSkge1xuICAgICAgcmVtb3ZlRm9jdXNUaW1lb3V0KClcblxuICAgICAgaWYgKFxuICAgICAgICBoYXNGb2N1cy52YWx1ZSAhPT0gdHJ1ZVxuICAgICAgICAmJiByb290UmVmLnZhbHVlICE9PSBudWxsXG4gICAgICAgICYmIGUudGFyZ2V0XG4gICAgICAgICYmIHR5cGVvZiBlLnRhcmdldC5jbG9zZXN0ID09PSAnZnVuY3Rpb24nXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgdGFiID0gZS50YXJnZXQuY2xvc2VzdCgnLnEtdGFiJylcblxuICAgICAgICAvLyBpZiB0aGUgdGFyZ2V0IGlzIGNvbnRhaW5lZCBieSBhIFFUYWIvUVJvdXRlVGFiXG4gICAgICAgIC8vIChpdCBtaWdodCBiZSBvdGhlciBlbGVtZW50cyBmb2N1c2VkLCBsaWtlIGFkZGl0aW9uYWwgUUJ0bilcbiAgICAgICAgaWYgKHRhYiAmJiByb290UmVmLnZhbHVlLmNvbnRhaW5zKHRhYikgPT09IHRydWUpIHtcbiAgICAgICAgICBoYXNGb2N1cy52YWx1ZSA9IHRydWVcbiAgICAgICAgICBzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlICYmIHNjcm9sbFRvVGFiRWwodGFiKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c291dCAoKSB7XG4gICAgICByZWdpc3RlckZvY3VzVGltZW91dCgoKSA9PiB7IGhhc0ZvY3VzLnZhbHVlID0gZmFsc2UgfSwgMzApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmVyaWZ5Um91dGVNb2RlbCAoKSB7XG4gICAgICBpZiAoJHRhYnMuYXZvaWRSb3V0ZVdhdGNoZXIgPT09IGZhbHNlKSB7XG4gICAgICAgIHJlZ2lzdGVyU2Nyb2xsVG9UYWJUaW1lb3V0KHVwZGF0ZUFjdGl2ZVJvdXRlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZVNjcm9sbFRvVGFiVGltZW91dCgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2F0Y2hSb3V0ZSAoKSB7XG4gICAgICBpZiAodW53YXRjaFJvdXRlID09PSB2b2lkIDApIHtcbiAgICAgICAgY29uc3QgdW53YXRjaCA9IHdhdGNoKCgpID0+IHByb3h5LiRyb3V0ZS5mdWxsUGF0aCwgdmVyaWZ5Um91dGVNb2RlbClcbiAgICAgICAgdW53YXRjaFJvdXRlID0gKCkgPT4ge1xuICAgICAgICAgIHVud2F0Y2goKVxuICAgICAgICAgIHVud2F0Y2hSb3V0ZSA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVnaXN0ZXJUYWIgKHRhYkRhdGEpIHtcbiAgICAgIHRhYkRhdGFMaXN0LnB1c2godGFiRGF0YSlcbiAgICAgIHRhYkRhdGFMaXN0TGVuLnZhbHVlKytcblxuICAgICAgcmVjYWxjdWxhdGVTY3JvbGwoKVxuXG4gICAgICAvLyBpZiBpdCdzIGEgUVRhYiBvciB3ZSBkb24ndCBoYXZlIFZ1ZSBSb3V0ZXJcbiAgICAgIGlmICh0YWJEYXRhLnJvdXRlRGF0YSA9PT0gdm9pZCAwIHx8IHByb3h5LiRyb3V0ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIC8vIHdlIHNob3VsZCBwb3NpdGlvbiB0byB0aGUgY3VycmVudGx5IGFjdGl2ZSB0YWIgKGlmIGFueSlcbiAgICAgICAgcmVnaXN0ZXJTY3JvbGxUb1RhYlRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmIChzY3JvbGxhYmxlLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnRNb2RlbC52YWx1ZVxuICAgICAgICAgICAgY29uc3QgbmV3VGFiID0gdmFsdWUgIT09IHZvaWQgMCAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gJydcbiAgICAgICAgICAgICAgPyB0YWJEYXRhTGlzdC5maW5kKHRhYiA9PiB0YWIubmFtZS52YWx1ZSA9PT0gdmFsdWUpXG4gICAgICAgICAgICAgIDogbnVsbFxuXG4gICAgICAgICAgICBuZXdUYWIgJiYgc2Nyb2xsVG9UYWJFbChuZXdUYWIucm9vdFJlZi52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICAvLyBlbHNlIGlmIGl0J3MgYSBRUm91dGVUYWIgd2l0aCBhIHZhbGlkIGxpbmtcbiAgICAgIGVsc2Uge1xuICAgICAgICAvLyBzdGFydCB3YXRjaGluZyByb3V0ZVxuICAgICAgICB3YXRjaFJvdXRlKClcblxuICAgICAgICBpZiAodGFiRGF0YS5yb3V0ZURhdGEuaGFzUm91dGVyTGluay52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHZlcmlmeVJvdXRlTW9kZWwoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5yZWdpc3RlclRhYiAodGFiRGF0YSkge1xuICAgICAgdGFiRGF0YUxpc3Quc3BsaWNlKHRhYkRhdGFMaXN0LmluZGV4T2YodGFiRGF0YSksIDEpXG4gICAgICB0YWJEYXRhTGlzdExlbi52YWx1ZS0tXG5cbiAgICAgIHJlY2FsY3VsYXRlU2Nyb2xsKClcblxuICAgICAgaWYgKHVud2F0Y2hSb3V0ZSAhPT0gdm9pZCAwICYmIHRhYkRhdGEucm91dGVEYXRhICE9PSB2b2lkIDApIHtcbiAgICAgICAgLy8gdW53YXRjaCByb3V0ZSBpZiB3ZSBkb24ndCBoYXZlIGFueSBRUm91dGVUYWJzIGxlZnRcbiAgICAgICAgaWYgKHRhYkRhdGFMaXN0LmV2ZXJ5KHRhYiA9PiB0YWIucm91dGVEYXRhID09PSB2b2lkIDApID09PSB0cnVlKSB7XG4gICAgICAgICAgdW53YXRjaFJvdXRlKClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZW4gdXBkYXRlIG1vZGVsXG4gICAgICAgIHZlcmlmeVJvdXRlTW9kZWwoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0ICR0YWJzID0ge1xuICAgICAgY3VycmVudE1vZGVsLFxuICAgICAgdGFiUHJvcHMsXG4gICAgICBoYXNGb2N1cyxcbiAgICAgIGhhc0FjdGl2ZVRhYixcblxuICAgICAgcmVnaXN0ZXJUYWIsXG4gICAgICB1bnJlZ2lzdGVyVGFiLFxuXG4gICAgICB2ZXJpZnlSb3V0ZU1vZGVsLFxuICAgICAgdXBkYXRlTW9kZWwsXG4gICAgICBvbktiZE5hdmlnYXRlLFxuXG4gICAgICBhdm9pZFJvdXRlV2F0Y2hlcjogZmFsc2UgLy8gZmFsc2UgfCBzdHJpbmcgKHVpZClcbiAgICB9XG5cbiAgICBwcm92aWRlKHRhYnNLZXksICR0YWJzKVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgICBhbmltYXRlVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lb3V0KGFuaW1hdGVUaW1lcilcbiAgICAgIHN0b3BBbmltU2Nyb2xsKClcbiAgICAgIHVud2F0Y2hSb3V0ZSAhPT0gdm9pZCAwICYmIHVud2F0Y2hSb3V0ZSgpXG4gICAgfVxuXG4gICAgbGV0IGhhZFJvdXRlV2F0Y2hlclxuXG4gICAgb25CZWZvcmVVbm1vdW50KGNsZWFudXApXG5cbiAgICBvbkRlYWN0aXZhdGVkKCgpID0+IHtcbiAgICAgIGhhZFJvdXRlV2F0Y2hlciA9IHVud2F0Y2hSb3V0ZSAhPT0gdm9pZCAwXG4gICAgICBjbGVhbnVwKClcbiAgICB9KVxuXG4gICAgb25BY3RpdmF0ZWQoKCkgPT4ge1xuICAgICAgaGFkUm91dGVXYXRjaGVyID09PSB0cnVlICYmIHdhdGNoUm91dGUoKVxuICAgICAgcmVjYWxjdWxhdGVTY3JvbGwoKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgcmVmOiByb290UmVmLFxuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgcm9sZTogJ3RhYmxpc3QnLFxuICAgICAgICBvbkZvY3VzaW4sXG4gICAgICAgIG9uRm9jdXNvdXRcbiAgICAgIH0sIFtcbiAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHsgb25SZXNpemU6IHVwZGF0ZUNvbnRhaW5lciB9KSxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgcmVmOiBjb250ZW50UmVmLFxuICAgICAgICAgIGNsYXNzOiBpbm5lckNsYXNzLnZhbHVlLFxuICAgICAgICAgIG9uU2Nyb2xsOiB1cGRhdGVBcnJvd3NcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpLFxuXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtdGFic19fYXJyb3cgcS10YWJzX19hcnJvdy0tbGVmdCBhYnNvbHV0ZSBxLXRhYl9faWNvbidcbiAgICAgICAgICAgICsgKGxlZnRBcnJvdy52YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogJyBxLXRhYnNfX2Fycm93LS1mYWRlZCcpLFxuICAgICAgICAgIG5hbWU6IHByb3BzLmxlZnRJY29uIHx8ICRxLmljb25TZXQudGFic1sgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAndXAnIDogJ2xlZnQnIF0sXG4gICAgICAgICAgb25Nb3VzZWRvd25QYXNzaXZlOiBzY3JvbGxUb1N0YXJ0LFxuICAgICAgICAgIG9uVG91Y2hzdGFydFBhc3NpdmU6IHNjcm9sbFRvU3RhcnQsXG4gICAgICAgICAgb25Nb3VzZXVwUGFzc2l2ZTogc3RvcEFuaW1TY3JvbGwsXG4gICAgICAgICAgb25Nb3VzZWxlYXZlUGFzc2l2ZTogc3RvcEFuaW1TY3JvbGwsXG4gICAgICAgICAgb25Ub3VjaGVuZFBhc3NpdmU6IHN0b3BBbmltU2Nyb2xsXG4gICAgICAgIH0pLFxuXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogJ3EtdGFic19fYXJyb3cgcS10YWJzX19hcnJvdy0tcmlnaHQgYWJzb2x1dGUgcS10YWJfX2ljb24nXG4gICAgICAgICAgICArIChyaWdodEFycm93LnZhbHVlID09PSB0cnVlID8gJycgOiAnIHEtdGFic19fYXJyb3ctLWZhZGVkJyksXG4gICAgICAgICAgbmFtZTogcHJvcHMucmlnaHRJY29uIHx8ICRxLmljb25TZXQudGFic1sgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnZG93bicgOiAncmlnaHQnIF0sXG4gICAgICAgICAgb25Nb3VzZWRvd25QYXNzaXZlOiBzY3JvbGxUb0VuZCxcbiAgICAgICAgICBvblRvdWNoc3RhcnRQYXNzaXZlOiBzY3JvbGxUb0VuZCxcbiAgICAgICAgICBvbk1vdXNldXBQYXNzaXZlOiBzdG9wQW5pbVNjcm9sbCxcbiAgICAgICAgICBvbk1vdXNlbGVhdmVQYXNzaXZlOiBzdG9wQW5pbVNjcm9sbCxcbiAgICAgICAgICBvblRvdWNoZW5kUGFzc2l2ZTogc3RvcEFuaW1TY3JvbGxcbiAgICAgICAgfSlcbiAgICAgIF0pXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGluamVjdCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFFJY29uIGZyb20gJy4uL2ljb24vUUljb24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QsIGhVbmlxdWVTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyB0aW1lbGluZUtleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUaW1lbGluZUVudHJ5JyxcblxuICBwcm9wczoge1xuICAgIGhlYWRpbmc6IEJvb2xlYW4sXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnaDMnXG4gICAgfSxcbiAgICBzaWRlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncmlnaHQnLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2xlZnQnLCAncmlnaHQnIF0uaW5jbHVkZXModilcbiAgICB9LFxuXG4gICAgaWNvbjogU3RyaW5nLFxuICAgIGF2YXRhcjogU3RyaW5nLFxuXG4gICAgY29sb3I6IFN0cmluZyxcblxuICAgIHRpdGxlOiBTdHJpbmcsXG4gICAgc3VidGl0bGU6IFN0cmluZyxcbiAgICBib2R5OiBTdHJpbmdcbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0ICR0aW1lbGluZSA9IGluamVjdCh0aW1lbGluZUtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJHRpbWVsaW5lID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRVGltZWxpbmVFbnRyeSBuZWVkcyB0byBiZSBjaGlsZCBvZiBRVGltZWxpbmUnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXRpbWVsaW5lX19lbnRyeSBxLXRpbWVsaW5lX19lbnRyeS0tJHsgcHJvcHMuc2lkZSB9YFxuICAgICAgKyAocHJvcHMuaWNvbiAhPT0gdm9pZCAwIHx8IHByb3BzLmF2YXRhciAhPT0gdm9pZCAwID8gJyBxLXRpbWVsaW5lX19lbnRyeS0taWNvbicgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBkb3RDbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS10aW1lbGluZV9fZG90IHRleHQtJHsgcHJvcHMuY29sb3IgfHwgJHRpbWVsaW5lLmNvbG9yIH1gXG4gICAgKVxuXG4gICAgY29uc3QgcmV2ZXJzZSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAkdGltZWxpbmUubGF5b3V0ID09PSAnY29tZm9ydGFibGUnICYmICR0aW1lbGluZS5zaWRlID09PSAnbGVmdCdcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBoVW5pcXVlU2xvdChzbG90cy5kZWZhdWx0LCBbXSlcblxuICAgICAgaWYgKHByb3BzLmJvZHkgIT09IHZvaWQgMCkge1xuICAgICAgICBjaGlsZC51bnNoaWZ0KHByb3BzLmJvZHkpXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5oZWFkaW5nID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBbXG4gICAgICAgICAgaCgnZGl2JyksXG4gICAgICAgICAgaCgnZGl2JyksXG4gICAgICAgICAgaChcbiAgICAgICAgICAgIHByb3BzLnRhZyxcbiAgICAgICAgICAgIHsgY2xhc3M6ICdxLXRpbWVsaW5lX19oZWFkaW5nLXRpdGxlJyB9LFxuICAgICAgICAgICAgY2hpbGRcbiAgICAgICAgICApXG4gICAgICAgIF1cblxuICAgICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS10aW1lbGluZV9faGVhZGluZydcbiAgICAgICAgfSwgcmV2ZXJzZS52YWx1ZSA9PT0gdHJ1ZSA/IGNvbnRlbnQucmV2ZXJzZSgpIDogY29udGVudClcbiAgICAgIH1cblxuICAgICAgbGV0IGRvdFxuXG4gICAgICBpZiAocHJvcHMuaWNvbiAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGRvdCA9IFtcbiAgICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgICBjbGFzczogJ3JvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXInLFxuICAgICAgICAgICAgbmFtZTogcHJvcHMuaWNvblxuICAgICAgICAgIH0pXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKHByb3BzLmF2YXRhciAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGRvdCA9IFtcbiAgICAgICAgICBoKCdpbWcnLCB7XG4gICAgICAgICAgICBjbGFzczogJ3EtdGltZWxpbmVfX2RvdC1pbWcnLFxuICAgICAgICAgICAgc3JjOiBwcm9wcy5hdmF0YXJcbiAgICAgICAgICB9KVxuICAgICAgICBdXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBbXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6ICdxLXRpbWVsaW5lX19zdWJ0aXRsZScgfSwgW1xuICAgICAgICAgIGgoJ3NwYW4nLCB7fSwgaFNsb3Qoc2xvdHMuc3VidGl0bGUsIFsgcHJvcHMuc3VidGl0bGUgXSkpXG4gICAgICAgIF0pLFxuXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6IGRvdENsYXNzLnZhbHVlIH0sIGRvdCksXG5cbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogJ3EtdGltZWxpbmVfX2NvbnRlbnQnIH0sIFtcbiAgICAgICAgICBoKCdoNicsIHsgY2xhc3M6ICdxLXRpbWVsaW5lX190aXRsZScgfSwgaFNsb3Qoc2xvdHMudGl0bGUsIFsgcHJvcHMudGl0bGUgXSkpXG4gICAgICAgIF0uY29uY2F0KGNoaWxkKSlcbiAgICAgIF1cblxuICAgICAgcmV0dXJuIGgoJ2xpJywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZVxuICAgICAgfSwgcmV2ZXJzZS52YWx1ZSA9PT0gdHJ1ZSA/IGNvbnRlbnQucmV2ZXJzZSgpIDogY29udGVudClcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgcHJvdmlkZSwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyB0aW1lbGluZUtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUaW1lbGluZScsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBjb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknXG4gICAgfSxcbiAgICBzaWRlOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncmlnaHQnLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2xlZnQnLCAncmlnaHQnIF0uaW5jbHVkZXModilcbiAgICB9LFxuICAgIGxheW91dDoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RlbnNlJyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBbICdkZW5zZScsICdjb21mb3J0YWJsZScsICdsb29zZScgXS5pbmNsdWRlcyh2KVxuICAgIH1cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIHByb3ZpZGUodGltZWxpbmVLZXksIHByb3BzKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS10aW1lbGluZSBxLXRpbWVsaW5lLS0keyBwcm9wcy5sYXlvdXQgfSBxLXRpbWVsaW5lLS0keyBwcm9wcy5sYXlvdXQgfS0tJHsgcHJvcHMuc2lkZSB9YFxuICAgICAgKyAoaXNEYXJrLnZhbHVlID09PSB0cnVlID8gJyBxLXRpbWVsaW5lLS1kYXJrJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiBoKCd1bCcsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVEaXJlY3RpdmUgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldE1vZGlmaWVyRGlyZWN0aW9ucywgc2hvdWxkU3RhcnQgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL3RvdWNoLmpzJ1xuaW1wb3J0IHsgYWRkRXZ0LCBjbGVhbkV2dCwgcG9zaXRpb24sIGxlZnRDbGljaywgc3RvcEFuZFByZXZlbnQsIHByZXZlbnREcmFnZ2FibGUsIG5vb3AgfSBmcm9tICcuLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9zZWxlY3Rpb24uanMnXG5pbXBvcnQgZ2V0U1NSUHJvcHMgZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG5mdW5jdGlvbiBwYXJzZUFyZyAoYXJnKSB7XG4gIC8vIGRlbHRhIChtaW4gdmVsb2NpdHkgLS0gZGlzdCAvIHRpbWUpXG4gIC8vIG1vYmlsZSBtaW4gZGlzdGFuY2Ugb24gZmlyc3QgbW92ZVxuICAvLyBkZXNrdG9wIG1pbiBkaXN0YW5jZSB1bnRpbCBkZWNpZGluZyBpZiBpdCdzIGEgc3dpcGUgb3Igbm90XG4gIGNvbnN0IGRhdGEgPSBbIDAuMDYsIDYsIDUwIF1cblxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgJiYgYXJnLmxlbmd0aCkge1xuICAgIGFyZy5zcGxpdCgnOicpLmZvckVhY2goKHZhbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHYgPSBwYXJzZUZsb2F0KHZhbClcbiAgICAgIHYgJiYgKGRhdGFbIGluZGV4IF0gPSB2KVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gZGF0YVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVEaXJlY3RpdmUoX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8geyBuYW1lOiAndG91Y2gtc3dpcGUnLCBnZXRTU1JQcm9wcyB9XG4gIDoge1xuICAgICAgbmFtZTogJ3RvdWNoLXN3aXBlJyxcblxuICAgICAgYmVmb3JlTW91bnQgKGVsLCB7IHZhbHVlLCBhcmcsIG1vZGlmaWVycyB9KSB7XG4gICAgICAgIC8vIGVhcmx5IHJldHVybiwgd2UgZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZ1xuICAgICAgICBpZiAobW9kaWZpZXJzLm1vdXNlICE9PSB0cnVlICYmIGNsaWVudC5oYXMudG91Y2ggIT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlQ2FwdHVyZSA9IG1vZGlmaWVycy5tb3VzZUNhcHR1cmUgPT09IHRydWUgPyAnQ2FwdHVyZScgOiAnJ1xuXG4gICAgICAgIGNvbnN0IGN0eCA9IHtcbiAgICAgICAgICBoYW5kbGVyOiB2YWx1ZSxcbiAgICAgICAgICBzZW5zaXRpdml0eTogcGFyc2VBcmcoYXJnKSxcbiAgICAgICAgICBkaXJlY3Rpb246IGdldE1vZGlmaWVyRGlyZWN0aW9ucyhtb2RpZmllcnMpLFxuXG4gICAgICAgICAgbm9vcCxcblxuICAgICAgICAgIG1vdXNlU3RhcnQgKGV2dCkge1xuICAgICAgICAgICAgaWYgKHNob3VsZFN0YXJ0KGV2dCwgY3R4KSAmJiBsZWZ0Q2xpY2soZXZ0KSkge1xuICAgICAgICAgICAgICBhZGRFdnQoY3R4LCAndGVtcCcsIFtcbiAgICAgICAgICAgICAgICBbIGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgJ21vdmUnLCBgbm90UGFzc2l2ZSR7IG1vdXNlQ2FwdHVyZSB9YCBdLFxuICAgICAgICAgICAgICAgIFsgZG9jdW1lbnQsICdtb3VzZXVwJywgJ2VuZCcsICdub3RQYXNzaXZlQ2FwdHVyZScgXVxuICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICBjdHguc3RhcnQoZXZ0LCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB0b3VjaFN0YXJ0IChldnQpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRTdGFydChldnQsIGN0eCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldFxuICAgICAgICAgICAgICBhZGRFdnQoY3R4LCAndGVtcCcsIFtcbiAgICAgICAgICAgICAgICBbIHRhcmdldCwgJ3RvdWNobW92ZScsICdtb3ZlJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdLFxuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hjYW5jZWwnLCAnZW5kJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdLFxuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2hlbmQnLCAnZW5kJywgJ25vdFBhc3NpdmVDYXB0dXJlJyBdXG4gICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgIGN0eC5zdGFydChldnQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIHN0YXJ0IChldnQsIG1vdXNlRXZlbnQpIHtcbiAgICAgICAgICAgIGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlICYmIHByZXZlbnREcmFnZ2FibGUoZWwsIHRydWUpXG5cbiAgICAgICAgICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uKGV2dClcblxuICAgICAgICAgICAgY3R4LmV2ZW50ID0ge1xuICAgICAgICAgICAgICB4OiBwb3MubGVmdCxcbiAgICAgICAgICAgICAgeTogcG9zLnRvcCxcbiAgICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgbW91c2U6IG1vdXNlRXZlbnQgPT09IHRydWUsXG4gICAgICAgICAgICAgIGRpcjogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgbW92ZSAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50ID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQuZGlyICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBzdG9wQW5kUHJldmVudChldnQpXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB0aW1lID0gRGF0ZS5ub3coKSAtIGN0eC5ldmVudC50aW1lXG5cbiAgICAgICAgICAgIGlmICh0aW1lID09PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgICBwb3MgPSBwb3NpdGlvbihldnQpLFxuICAgICAgICAgICAgICBkaXN0WCA9IHBvcy5sZWZ0IC0gY3R4LmV2ZW50LngsXG4gICAgICAgICAgICAgIGFic1ggPSBNYXRoLmFicyhkaXN0WCksXG4gICAgICAgICAgICAgIGRpc3RZID0gcG9zLnRvcCAtIGN0eC5ldmVudC55LFxuICAgICAgICAgICAgICBhYnNZID0gTWF0aC5hYnMoZGlzdFkpXG5cbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQubW91c2UgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgaWYgKGFic1ggPCBjdHguc2Vuc2l0aXZpdHlbIDEgXSAmJiBhYnNZIDwgY3R4LnNlbnNpdGl2aXR5WyAxIF0pIHtcbiAgICAgICAgICAgICAgICBjdHguZW5kKGV2dClcbiAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYWJzWCA8IGN0eC5zZW5zaXRpdml0eVsgMiBdICYmIGFic1kgPCBjdHguc2Vuc2l0aXZpdHlbIDIgXSkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3RcbiAgICAgICAgICAgICAgdmVsWCA9IGFic1ggLyB0aW1lLFxuICAgICAgICAgICAgICB2ZWxZID0gYWJzWSAvIHRpbWVcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgICAgICAgICYmIGFic1ggPCBhYnNZXG4gICAgICAgICAgICAgICYmIGFic1ggPCAxMDBcbiAgICAgICAgICAgICAgJiYgdmVsWSA+IGN0eC5zZW5zaXRpdml0eVsgMCBdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRpciA9IGRpc3RZIDwgMCA/ICd1cCcgOiAnZG93bidcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLmhvcml6b250YWwgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgYWJzWCA+IGFic1lcbiAgICAgICAgICAgICAgJiYgYWJzWSA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxYID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gZGlzdFggPCAwID8gJ2xlZnQnIDogJ3JpZ2h0J1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24udXAgPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IGFic1lcbiAgICAgICAgICAgICAgJiYgZGlzdFkgPCAwXG4gICAgICAgICAgICAgICYmIGFic1ggPCAxMDBcbiAgICAgICAgICAgICAgJiYgdmVsWSA+IGN0eC5zZW5zaXRpdml0eVsgMCBdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRpciA9ICd1cCdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjdHguZGlyZWN0aW9uLmRvd24gPT09IHRydWVcbiAgICAgICAgICAgICAgJiYgYWJzWCA8IGFic1lcbiAgICAgICAgICAgICAgJiYgZGlzdFkgPiAwXG4gICAgICAgICAgICAgICYmIGFic1ggPCAxMDBcbiAgICAgICAgICAgICAgJiYgdmVsWSA+IGN0eC5zZW5zaXRpdml0eVsgMCBdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRpciA9ICdkb3duJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24ubGVmdCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYID4gYWJzWVxuICAgICAgICAgICAgICAmJiBkaXN0WCA8IDBcbiAgICAgICAgICAgICAgJiYgYWJzWSA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxYID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gJ2xlZnQnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi5yaWdodCA9PT0gdHJ1ZVxuICAgICAgICAgICAgICAmJiBhYnNYID4gYWJzWVxuICAgICAgICAgICAgICAmJiBkaXN0WCA+IDBcbiAgICAgICAgICAgICAgJiYgYWJzWSA8IDEwMFxuICAgICAgICAgICAgICAmJiB2ZWxYID4gY3R4LnNlbnNpdGl2aXR5WyAwIF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuZGlyID0gJ3JpZ2h0J1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50LmRpciAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgc3RvcEFuZFByZXZlbnQoZXZ0KVxuXG4gICAgICAgICAgICAgIGlmIChjdHguZXZlbnQubW91c2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ25vLXBvaW50ZXItZXZlbnRzLS1jaGlsZHJlbicpXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdub24tc2VsZWN0YWJsZScpXG4gICAgICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb24oKVxuXG4gICAgICAgICAgICAgICAgY3R4LnN0eWxlQ2xlYW51cCA9IHdpdGhEZWxheSA9PiB7XG4gICAgICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwID0gdm9pZCAwXG5cbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm9uLXNlbGVjdGFibGUnKVxuXG4gICAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm8tcG9pbnRlci1ldmVudHMtLWNoaWxkcmVuJylcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKHdpdGhEZWxheSA9PT0gdHJ1ZSkgeyBzZXRUaW1lb3V0KHJlbW92ZSwgNTApIH1cbiAgICAgICAgICAgICAgICAgIGVsc2UgeyByZW1vdmUoKSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY3R4LmhhbmRsZXIoe1xuICAgICAgICAgICAgICAgIGV2dCxcbiAgICAgICAgICAgICAgICB0b3VjaDogY3R4LmV2ZW50Lm1vdXNlICE9PSB0cnVlLFxuICAgICAgICAgICAgICAgIG1vdXNlOiBjdHguZXZlbnQubW91c2UsXG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uOiBjdHguZXZlbnQuZGlyLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiB0aW1lLFxuICAgICAgICAgICAgICAgIGRpc3RhbmNlOiB7XG4gICAgICAgICAgICAgICAgICB4OiBhYnNYLFxuICAgICAgICAgICAgICAgICAgeTogYWJzWVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjdHguZW5kKGV2dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZW5kIChldnQpIHtcbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQgPT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2xlYW5FdnQoY3R4LCAndGVtcCcpXG4gICAgICAgICAgICBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZSAmJiBwcmV2ZW50RHJhZ2dhYmxlKGVsLCBmYWxzZSlcbiAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgIT09IHZvaWQgMCAmJiBjdHguc3R5bGVDbGVhbnVwKHRydWUpXG4gICAgICAgICAgICBldnQgIT09IHZvaWQgMCAmJiBjdHguZXZlbnQuZGlyICE9PSBmYWxzZSAmJiBzdG9wQW5kUHJldmVudChldnQpXG5cbiAgICAgICAgICAgIGN0eC5ldmVudCA9IHZvaWQgMFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsLl9fcXRvdWNoc3dpcGUgPSBjdHhcblxuICAgICAgICBpZiAobW9kaWZpZXJzLm1vdXNlID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gYWNjb3VudCBmb3IgVU1EIHRvbyB3aGVyZSBtb2RpZmllcnMgd2lsbCBiZSBsb3dlcmNhc2VkIHRvIHdvcmtcbiAgICAgICAgICBjb25zdCBjYXB0dXJlID0gbW9kaWZpZXJzLm1vdXNlQ2FwdHVyZSA9PT0gdHJ1ZSB8fCBtb2RpZmllcnMubW91c2VjYXB0dXJlID09PSB0cnVlXG4gICAgICAgICAgICA/ICdDYXB0dXJlJ1xuICAgICAgICAgICAgOiAnJ1xuXG4gICAgICAgICAgYWRkRXZ0KGN0eCwgJ21haW4nLCBbXG4gICAgICAgICAgICBbIGVsLCAnbW91c2Vkb3duJywgJ21vdXNlU3RhcnQnLCBgcGFzc2l2ZSR7IGNhcHR1cmUgfWAgXVxuICAgICAgICAgIF0pXG4gICAgICAgIH1cblxuICAgICAgICBjbGllbnQuaGFzLnRvdWNoID09PSB0cnVlICYmIGFkZEV2dChjdHgsICdtYWluJywgW1xuICAgICAgICAgIFsgZWwsICd0b3VjaHN0YXJ0JywgJ3RvdWNoU3RhcnQnLCBgcGFzc2l2ZSR7IG1vZGlmaWVycy5jYXB0dXJlID09PSB0cnVlID8gJ0NhcHR1cmUnIDogJycgfWAgXSxcbiAgICAgICAgICBbIGVsLCAndG91Y2htb3ZlJywgJ25vb3AnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0gLy8gY2Fubm90IGJlIHBhc3NpdmUgKGV4OiBpT1Mgc2Nyb2xsKVxuICAgICAgICBdKVxuICAgICAgfSxcblxuICAgICAgdXBkYXRlZCAoZWwsIGJpbmRpbmdzKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXRvdWNoc3dpcGVcblxuICAgICAgICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBpZiAoYmluZGluZ3Mub2xkVmFsdWUgIT09IGJpbmRpbmdzLnZhbHVlKSB7XG4gICAgICAgICAgICB0eXBlb2YgYmluZGluZ3MudmFsdWUgIT09ICdmdW5jdGlvbicgJiYgY3R4LmVuZCgpXG4gICAgICAgICAgICBjdHguaGFuZGxlciA9IGJpbmRpbmdzLnZhbHVlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3R4LmRpcmVjdGlvbiA9IGdldE1vZGlmaWVyRGlyZWN0aW9ucyhiaW5kaW5ncy5tb2RpZmllcnMpXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGJlZm9yZVVubW91bnQgKGVsKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXRvdWNoc3dpcGVcblxuICAgICAgICBpZiAoY3R4ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBjbGVhbkV2dChjdHgsICdtYWluJylcbiAgICAgICAgICBjbGVhbkV2dChjdHgsICd0ZW1wJylcblxuICAgICAgICAgIGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlICYmIHByZXZlbnREcmFnZ2FibGUoZWwsIGZhbHNlKVxuICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgIT09IHZvaWQgMCAmJiBjdHguc3R5bGVDbGVhbnVwKClcblxuICAgICAgICAgIGRlbGV0ZSBlbC5fX3F0b3VjaHN3aXBlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4pXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGNhY2hlID0gbmV3IE1hcCgpXG5cbiAgcmV0dXJuIHtcbiAgICBnZXRDYWNoZTogX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gICAgICA/IGZ1bmN0aW9uIChfLCBvYmopIHsgcmV0dXJuIG9iaiB9XG4gICAgICA6IGZ1bmN0aW9uIChrZXksIG9iaikge1xuICAgICAgICByZXR1cm4gY2FjaGVbIGtleSBdID09PSB2b2lkIDBcbiAgICAgICAgICA/IChjYWNoZVsga2V5IF0gPSBvYmopXG4gICAgICAgICAgOiBjYWNoZVsga2V5IF1cbiAgICAgIH0sXG5cbiAgICBnZXRDYWNoZVdpdGhGbjogX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gICAgICA/IGZ1bmN0aW9uIChfLCBmbikgeyByZXR1cm4gZm4oKSB9XG4gICAgICA6IGZ1bmN0aW9uIChrZXksIGZuKSB7XG4gICAgICAgIHJldHVybiBjYWNoZVsga2V5IF0gPT09IHZvaWQgMFxuICAgICAgICAgID8gKGNhY2hlWyBrZXkgXSA9IGZuKCkpXG4gICAgICAgICAgOiBjYWNoZVsga2V5IF1cbiAgICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG5leHRUaWNrLCBnZXRDdXJyZW50SW5zdGFuY2UsIFRyYW5zaXRpb24sIEtlZXBBbGl2ZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IFRvdWNoU3dpcGUgZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9Ub3VjaFN3aXBlLmpzJ1xuXG5pbXBvcnQgdXNlQ2FjaGUgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtY2FjaGUuanMnXG5cbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBnZXROb3JtYWxpemVkVk5vZGVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bS5qcydcblxuZXhwb3J0IGNvbnN0IHVzZVBhbmVsQ2hpbGRQcm9wcyA9IHtcbiAgbmFtZTogeyByZXF1aXJlZDogdHJ1ZSB9LFxuICBkaXNhYmxlOiBCb29sZWFuXG59XG5cbmNvbnN0IFBhbmVsV3JhcHBlciA9IHtcbiAgc2V0dXAgKF8sIHsgc2xvdHMgfSkge1xuICAgIHJldHVybiAoKSA9PiBoKCdkaXYnLCB7XG4gICAgICBjbGFzczogJ3EtcGFuZWwgc2Nyb2xsJyxcbiAgICAgIHJvbGU6ICd0YWJwYW5lbCdcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdXNlUGFuZWxQcm9wcyA9IHtcbiAgbW9kZWxWYWx1ZToge1xuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0sXG5cbiAgYW5pbWF0ZWQ6IEJvb2xlYW4sXG4gIGluZmluaXRlOiBCb29sZWFuLFxuICBzd2lwZWFibGU6IEJvb2xlYW4sXG4gIHZlcnRpY2FsOiBCb29sZWFuLFxuXG4gIHRyYW5zaXRpb25QcmV2OiBTdHJpbmcsXG4gIHRyYW5zaXRpb25OZXh0OiBTdHJpbmcsXG4gIHRyYW5zaXRpb25EdXJhdGlvbjoge1xuICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICBkZWZhdWx0OiAzMDBcbiAgfSxcblxuICBrZWVwQWxpdmU6IEJvb2xlYW4sXG4gIGtlZXBBbGl2ZUluY2x1ZGU6IFsgU3RyaW5nLCBBcnJheSwgUmVnRXhwIF0sXG4gIGtlZXBBbGl2ZUV4Y2x1ZGU6IFsgU3RyaW5nLCBBcnJheSwgUmVnRXhwIF0sXG4gIGtlZXBBbGl2ZU1heDogTnVtYmVyXG59XG5cbmV4cG9ydCBjb25zdCB1c2VQYW5lbEVtaXRzID0gWyAndXBkYXRlOm1vZGVsVmFsdWUnLCAnYmVmb3JlVHJhbnNpdGlvbicsICd0cmFuc2l0aW9uJyBdXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHkgfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gIGNvbnN0IHsgZ2V0Q2FjaGVXaXRoRm4gfSA9IHVzZUNhY2hlKClcblxuICBsZXQgcGFuZWxzLCBmb3JjZWRQYW5lbFRyYW5zaXRpb25cblxuICBjb25zdCBwYW5lbEluZGV4ID0gcmVmKG51bGwpXG4gIGNvbnN0IHBhbmVsVHJhbnNpdGlvbiA9IHJlZihudWxsKVxuXG4gIGZ1bmN0aW9uIG9uU3dpcGUgKGV2dCkge1xuICAgIGNvbnN0IGRpciA9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3VwJyA6ICdsZWZ0J1xuICAgIGdvVG9QYW5lbEJ5T2Zmc2V0KChwcm94eS4kcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSkgKiAoZXZ0LmRpcmVjdGlvbiA9PT0gZGlyID8gMSA6IC0xKSlcbiAgfVxuXG4gIGNvbnN0IHBhbmVsRGlyZWN0aXZlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAvLyBpZiBwcm9wcy5zd2lwZWFibGVcbiAgICByZXR1cm4gWyBbXG4gICAgICBUb3VjaFN3aXBlLFxuICAgICAgb25Td2lwZSxcbiAgICAgIHZvaWQgMCxcbiAgICAgIHtcbiAgICAgICAgaG9yaXpvbnRhbDogcHJvcHMudmVydGljYWwgIT09IHRydWUsXG4gICAgICAgIHZlcnRpY2FsOiBwcm9wcy52ZXJ0aWNhbCxcbiAgICAgICAgbW91c2U6IHRydWVcbiAgICAgIH1cbiAgICBdIF1cbiAgfSlcblxuICBjb25zdCB0cmFuc2l0aW9uUHJldiA9IGNvbXB1dGVkKCgpID0+XG4gICAgcHJvcHMudHJhbnNpdGlvblByZXYgfHwgYHNsaWRlLSR7IHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ2Rvd24nIDogJ3JpZ2h0JyB9YFxuICApXG5cbiAgY29uc3QgdHJhbnNpdGlvbk5leHQgPSBjb21wdXRlZCgoKSA9PlxuICAgIHByb3BzLnRyYW5zaXRpb25OZXh0IHx8IGBzbGlkZS0keyBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZSA/ICd1cCcgOiAnbGVmdCcgfWBcbiAgKVxuXG4gIGNvbnN0IHRyYW5zaXRpb25TdHlsZSA9IGNvbXB1dGVkKFxuICAgICgpID0+IGAtLXEtdHJhbnNpdGlvbi1kdXJhdGlvbjogJHsgcHJvcHMudHJhbnNpdGlvbkR1cmF0aW9uIH1tc2BcbiAgKVxuXG4gIGNvbnN0IGNvbnRlbnRLZXkgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgdHlwZW9mIHByb3BzLm1vZGVsVmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwcm9wcy5tb2RlbFZhbHVlID09PSAnbnVtYmVyJ1xuICAgICAgPyBwcm9wcy5tb2RlbFZhbHVlXG4gICAgICA6IFN0cmluZyhwcm9wcy5tb2RlbFZhbHVlKVxuICApKVxuXG4gIGNvbnN0IGtlZXBBbGl2ZVByb3BzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgICBpbmNsdWRlOiBwcm9wcy5rZWVwQWxpdmVJbmNsdWRlLFxuICAgIGV4Y2x1ZGU6IHByb3BzLmtlZXBBbGl2ZUV4Y2x1ZGUsXG4gICAgbWF4OiBwcm9wcy5rZWVwQWxpdmVNYXhcbiAgfSkpXG5cbiAgY29uc3QgbmVlZHNVbmlxdWVLZWVwQWxpdmVXcmFwcGVyID0gY29tcHV0ZWQoKCkgPT5cbiAgICBwcm9wcy5rZWVwQWxpdmVJbmNsdWRlICE9PSB2b2lkIDBcbiAgICB8fCBwcm9wcy5rZWVwQWxpdmVFeGNsdWRlICE9PSB2b2lkIDBcbiAgKVxuXG4gIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsIChuZXdWYWwsIG9sZFZhbCkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gaXNWYWxpZFBhbmVsTmFtZShuZXdWYWwpID09PSB0cnVlXG4gICAgICA/IGdldFBhbmVsSW5kZXgobmV3VmFsKVxuICAgICAgOiAtMVxuXG4gICAgaWYgKGZvcmNlZFBhbmVsVHJhbnNpdGlvbiAhPT0gdHJ1ZSkge1xuICAgICAgdXBkYXRlUGFuZWxUcmFuc2l0aW9uKFxuICAgICAgICBpbmRleCA9PT0gLTEgPyAwIDogKGluZGV4IDwgZ2V0UGFuZWxJbmRleChvbGRWYWwpID8gLTEgOiAxKVxuICAgICAgKVxuICAgIH1cblxuICAgIGlmIChwYW5lbEluZGV4LnZhbHVlICE9PSBpbmRleCkge1xuICAgICAgcGFuZWxJbmRleC52YWx1ZSA9IGluZGV4XG4gICAgICBlbWl0KCdiZWZvcmVUcmFuc2l0aW9uJywgbmV3VmFsLCBvbGRWYWwpXG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGVtaXQoJ3RyYW5zaXRpb24nLCBuZXdWYWwsIG9sZFZhbClcbiAgICAgIH0pXG4gICAgfVxuICB9KVxuXG4gIGZ1bmN0aW9uIG5leHRQYW5lbCAoKSB7IGdvVG9QYW5lbEJ5T2Zmc2V0KDEpIH1cbiAgZnVuY3Rpb24gcHJldmlvdXNQYW5lbCAoKSB7IGdvVG9QYW5lbEJ5T2Zmc2V0KC0xKSB9XG5cbiAgZnVuY3Rpb24gZ29Ub1BhbmVsIChuYW1lKSB7XG4gICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBuYW1lKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNWYWxpZFBhbmVsTmFtZSAobmFtZSkge1xuICAgIHJldHVybiBuYW1lICE9PSB2b2lkIDAgJiYgbmFtZSAhPT0gbnVsbCAmJiBuYW1lICE9PSAnJ1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFuZWxJbmRleCAobmFtZSkge1xuICAgIHJldHVybiBwYW5lbHMuZmluZEluZGV4KHBhbmVsID0+IHtcbiAgICAgIHJldHVybiBwYW5lbC5wcm9wcy5uYW1lID09PSBuYW1lXG4gICAgICAgICYmIHBhbmVsLnByb3BzLmRpc2FibGUgIT09ICcnXG4gICAgICAgICYmIHBhbmVsLnByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RW5hYmxlZFBhbmVscyAoKSB7XG4gICAgcmV0dXJuIHBhbmVscy5maWx0ZXIocGFuZWwgPT4ge1xuICAgICAgcmV0dXJuIHBhbmVsLnByb3BzLmRpc2FibGUgIT09ICcnXG4gICAgICAgICYmIHBhbmVsLnByb3BzLmRpc2FibGUgIT09IHRydWVcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUGFuZWxUcmFuc2l0aW9uIChkaXJlY3Rpb24pIHtcbiAgICBjb25zdCB2YWwgPSBkaXJlY3Rpb24gIT09IDAgJiYgcHJvcHMuYW5pbWF0ZWQgPT09IHRydWUgJiYgcGFuZWxJbmRleC52YWx1ZSAhPT0gLTFcbiAgICAgID8gJ3EtdHJhbnNpdGlvbi0tJyArIChkaXJlY3Rpb24gPT09IC0xID8gdHJhbnNpdGlvblByZXYudmFsdWUgOiB0cmFuc2l0aW9uTmV4dC52YWx1ZSlcbiAgICAgIDogbnVsbFxuXG4gICAgaWYgKHBhbmVsVHJhbnNpdGlvbi52YWx1ZSAhPT0gdmFsKSB7XG4gICAgICBwYW5lbFRyYW5zaXRpb24udmFsdWUgPSB2YWxcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnb1RvUGFuZWxCeU9mZnNldCAoZGlyZWN0aW9uLCBzdGFydEluZGV4ID0gcGFuZWxJbmRleC52YWx1ZSkge1xuICAgIGxldCBpbmRleCA9IHN0YXJ0SW5kZXggKyBkaXJlY3Rpb25cblxuICAgIHdoaWxlIChpbmRleCA+IC0xICYmIGluZGV4IDwgcGFuZWxzLmxlbmd0aCkge1xuICAgICAgY29uc3Qgb3B0ID0gcGFuZWxzWyBpbmRleCBdXG5cbiAgICAgIGlmIChcbiAgICAgICAgb3B0ICE9PSB2b2lkIDBcbiAgICAgICAgJiYgb3B0LnByb3BzLmRpc2FibGUgIT09ICcnXG4gICAgICAgICYmIG9wdC5wcm9wcy5kaXNhYmxlICE9PSB0cnVlXG4gICAgICApIHtcbiAgICAgICAgdXBkYXRlUGFuZWxUcmFuc2l0aW9uKGRpcmVjdGlvbilcbiAgICAgICAgZm9yY2VkUGFuZWxUcmFuc2l0aW9uID0gdHJ1ZVxuICAgICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIG9wdC5wcm9wcy5uYW1lKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBmb3JjZWRQYW5lbFRyYW5zaXRpb24gPSBmYWxzZVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaW5kZXggKz0gZGlyZWN0aW9uXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLmluZmluaXRlID09PSB0cnVlICYmIHBhbmVscy5sZW5ndGggPiAwICYmIHN0YXJ0SW5kZXggIT09IC0xICYmIHN0YXJ0SW5kZXggIT09IHBhbmVscy5sZW5ndGgpIHtcbiAgICAgIGdvVG9QYW5lbEJ5T2Zmc2V0KGRpcmVjdGlvbiwgZGlyZWN0aW9uID09PSAtMSA/IHBhbmVscy5sZW5ndGggOiAtMSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQYW5lbEluZGV4ICgpIHtcbiAgICBjb25zdCBpbmRleCA9IGdldFBhbmVsSW5kZXgocHJvcHMubW9kZWxWYWx1ZSlcblxuICAgIGlmIChwYW5lbEluZGV4LnZhbHVlICE9PSBpbmRleCkge1xuICAgICAgcGFuZWxJbmRleC52YWx1ZSA9IGluZGV4XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhbmVsQ29udGVudENoaWxkICgpIHtcbiAgICBjb25zdCBwYW5lbCA9IGlzVmFsaWRQYW5lbE5hbWUocHJvcHMubW9kZWxWYWx1ZSkgPT09IHRydWVcbiAgICAgICYmIHVwZGF0ZVBhbmVsSW5kZXgoKVxuICAgICAgJiYgcGFuZWxzWyBwYW5lbEluZGV4LnZhbHVlIF1cblxuICAgIHJldHVybiBwcm9wcy5rZWVwQWxpdmUgPT09IHRydWVcbiAgICAgID8gW1xuICAgICAgICAgIGgoS2VlcEFsaXZlLCBrZWVwQWxpdmVQcm9wcy52YWx1ZSwgW1xuICAgICAgICAgICAgaChcbiAgICAgICAgICAgICAgbmVlZHNVbmlxdWVLZWVwQWxpdmVXcmFwcGVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgICAgICAgPyBnZXRDYWNoZVdpdGhGbihjb250ZW50S2V5LnZhbHVlLCAoKSA9PiAoeyAuLi5QYW5lbFdyYXBwZXIsIG5hbWU6IGNvbnRlbnRLZXkudmFsdWUgfSkpXG4gICAgICAgICAgICAgICAgOiBQYW5lbFdyYXBwZXIsXG4gICAgICAgICAgICAgIHsga2V5OiBjb250ZW50S2V5LnZhbHVlLCBzdHlsZTogdHJhbnNpdGlvblN0eWxlLnZhbHVlIH0sXG4gICAgICAgICAgICAgICgpID0+IHBhbmVsXG4gICAgICAgICAgICApXG4gICAgICAgICAgXSlcbiAgICAgICAgXVxuICAgICAgOiBbXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLXBhbmVsIHNjcm9sbCcsXG4gICAgICAgICAgICBzdHlsZTogdHJhbnNpdGlvblN0eWxlLnZhbHVlLFxuICAgICAgICAgICAga2V5OiBjb250ZW50S2V5LnZhbHVlLFxuICAgICAgICAgICAgcm9sZTogJ3RhYnBhbmVsJ1xuICAgICAgICAgIH0sIFsgcGFuZWwgXSlcbiAgICAgICAgXVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UGFuZWxDb250ZW50ICgpIHtcbiAgICBpZiAocGFuZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgcmV0dXJuIHByb3BzLmFuaW1hdGVkID09PSB0cnVlXG4gICAgICA/IFsgaChUcmFuc2l0aW9uLCB7IG5hbWU6IHBhbmVsVHJhbnNpdGlvbi52YWx1ZSB9LCBnZXRQYW5lbENvbnRlbnRDaGlsZCkgXVxuICAgICAgOiBnZXRQYW5lbENvbnRlbnRDaGlsZCgpXG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQYW5lbHNMaXN0IChzbG90cykge1xuICAgIHBhbmVscyA9IGdldE5vcm1hbGl6ZWRWTm9kZXMoXG4gICAgICBoU2xvdChzbG90cy5kZWZhdWx0LCBbXSlcbiAgICApLmZpbHRlcihcbiAgICAgIHBhbmVsID0+IHBhbmVsLnByb3BzICE9PSBudWxsXG4gICAgICAgICYmIHBhbmVsLnByb3BzLnNsb3QgPT09IHZvaWQgMFxuICAgICAgICAmJiBpc1ZhbGlkUGFuZWxOYW1lKHBhbmVsLnByb3BzLm5hbWUpID09PSB0cnVlXG4gICAgKVxuXG4gICAgcmV0dXJuIHBhbmVscy5sZW5ndGhcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhbmVscyAoKSB7XG4gICAgcmV0dXJuIHBhbmVsc1xuICB9XG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICBuZXh0OiBuZXh0UGFuZWwsXG4gICAgcHJldmlvdXM6IHByZXZpb3VzUGFuZWwsXG4gICAgZ29UbzogZ29Ub1BhbmVsXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBwYW5lbEluZGV4LFxuICAgIHBhbmVsRGlyZWN0aXZlcyxcblxuICAgIHVwZGF0ZVBhbmVsc0xpc3QsXG4gICAgdXBkYXRlUGFuZWxJbmRleCxcblxuICAgIGdldFBhbmVsQ29udGVudCxcbiAgICBnZXRFbmFibGVkUGFuZWxzLFxuICAgIGdldFBhbmVscyxcblxuICAgIGlzVmFsaWRQYW5lbE5hbWUsXG5cbiAgICBrZWVwQWxpdmVQcm9wcyxcbiAgICBuZWVkc1VuaXF1ZUtlZXBBbGl2ZVdyYXBwZXIsXG5cbiAgICBnb1RvUGFuZWxCeU9mZnNldCxcbiAgICBnb1RvUGFuZWwsXG5cbiAgICBuZXh0UGFuZWwsXG4gICAgcHJldmlvdXNQYW5lbFxuICB9XG59XG4iLCJpbXBvcnQgeyBoIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB1c2VQYW5lbENoaWxkUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wYW5lbC5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRhYlBhbmVsJyxcblxuICBwcm9wczogdXNlUGFuZWxDaGlsZFByb3BzLFxuXG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogJ3EtdGFiLXBhbmVsJywgcm9sZTogJ3RhYnBhbmVsJyB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5pbXBvcnQgdXNlUGFuZWwsIHsgdXNlUGFuZWxQcm9wcywgdXNlUGFuZWxFbWl0cyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXBhbmVsLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhEaXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FUYWJQYW5lbHMnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlUGFuZWxQcm9wcyxcbiAgICAuLi51c2VEYXJrUHJvcHNcbiAgfSxcblxuICBlbWl0czogdXNlUGFuZWxFbWl0cyxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCB2bS5wcm94eS4kcSlcblxuICAgIGNvbnN0IHsgdXBkYXRlUGFuZWxzTGlzdCwgZ2V0UGFuZWxDb250ZW50LCBwYW5lbERpcmVjdGl2ZXMgfSA9IHVzZVBhbmVsKClcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdGFiLXBhbmVscyBxLXBhbmVsLXBhcmVudCdcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS10YWItcGFuZWxzLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdXBkYXRlUGFuZWxzTGlzdChzbG90cylcblxuICAgICAgcmV0dXJuIGhEaXIoXG4gICAgICAgICdkaXYnLFxuICAgICAgICB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sXG4gICAgICAgIGdldFBhbmVsQ29udGVudCgpLFxuICAgICAgICAncGFuJyxcbiAgICAgICAgcHJvcHMuc3dpcGVhYmxlLFxuICAgICAgICAoKSA9PiBwYW5lbERpcmVjdGl2ZXMudmFsdWVcbiAgICAgIClcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQ2FyZCcsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdkaXYnXG4gICAgfSxcblxuICAgIHNxdWFyZTogQm9vbGVhbixcbiAgICBmbGF0OiBCb29sZWFuLFxuICAgIGJvcmRlcmVkOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWNhcmQnXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtY2FyZC0tZGFyayBxLWRhcmsnIDogJycpXG4gICAgICArIChwcm9wcy5ib3JkZXJlZCA9PT0gdHJ1ZSA/ICcgcS1jYXJkLS1ib3JkZXJlZCcgOiAnJylcbiAgICAgICsgKHByb3BzLnNxdWFyZSA9PT0gdHJ1ZSA/ICcgcS1jYXJkLS1zcXVhcmUgbm8tYm9yZGVyLXJhZGl1cycgOiAnJylcbiAgICAgICsgKHByb3BzLmZsYXQgPT09IHRydWUgPyAnIHEtY2FyZC0tZmxhdCBuby1zaGFkb3cnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgocHJvcHMudGFnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6KGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczplfHxzZWxmKS5kYXlqc19wbHVnaW5fbG9jYWxpemVkRm9ybWF0PXQoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgZT17TFRTOlwiaDptbTpzcyBBXCIsTFQ6XCJoOm1tIEFcIixMOlwiTU0vREQvWVlZWVwiLExMOlwiTU1NTSBELCBZWVlZXCIsTExMOlwiTU1NTSBELCBZWVlZIGg6bW0gQVwiLExMTEw6XCJkZGRkLCBNTU1NIEQsIFlZWVkgaDptbSBBXCJ9O3JldHVybiBmdW5jdGlvbih0LG8sbil7dmFyIHI9by5wcm90b3R5cGUsaT1yLmZvcm1hdDtuLmVuLmZvcm1hdHM9ZSxyLmZvcm1hdD1mdW5jdGlvbih0KXt2b2lkIDA9PT10JiYodD1cIllZWVktTU0tRERUSEg6bW06c3NaXCIpO3ZhciBvPXRoaXMuJGxvY2FsZSgpLmZvcm1hdHMsbj1mdW5jdGlvbih0LG8pe3JldHVybiB0LnJlcGxhY2UoLyhcXFtbXlxcXV0rXSl8KExUUz98bHsxLDR9fEx7MSw0fSkvZywoZnVuY3Rpb24odCxuLHIpe3ZhciBpPXImJnIudG9VcHBlckNhc2UoKTtyZXR1cm4gbnx8b1tyXXx8ZVtyXXx8b1tpXS5yZXBsYWNlKC8oXFxbW15cXF1dK10pfChNTU1NfE1NfEREfGRkZGQpL2csKGZ1bmN0aW9uKGUsdCxvKXtyZXR1cm4gdHx8by5zbGljZSgxKX0pKX0pKX0odCx2b2lkIDA9PT1vP3t9Om8pO3JldHVybiBpLmNhbGwodGhpcyxuKX19fSkpOyIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1ldmVubHlcIiB2LWlmPVwicmVzdWx0cyAhPT0gbnVsbFwiPlxuICAgIDxxLWJhbm5lciBjbGFzcz1cImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiIHYtaWY9XCJyZXN1bHRzLnBhcmVudCAhPT0gbnVsbFwiPlxuICAgICAgVGhpcyBqb2Igd2FzIGRpc3BhdGNoZWQgYnkgYW5vdGhlciB3aGVuIGl0IGZhaWxlZC5cbiAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YWN0aW9uPlxuICAgICAgICA8cS1idG4gZmxhdCBjb2xvcj1cIndoaXRlXCIgbGFiZWw9XCJWaWV3IHBhcmVudCBqb2JcIlxuICAgICAgICAgICAgICAgOnRvPVwie25hbWU6ICdydW4uc2hvdycsIHBhcmFtczoge2pvYlN0YXR1c0lkOiByZXN1bHRzLnBhcmVudC5pZH19XCIvPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3EtYmFubmVyPlxuXG4gICAgPHEtbGlzdCBib3JkZXJlZCBzZXBhcmF0b3I+XG4gICAgICA8cS1pdGVtIGNsaWNrYWJsZSB2LXJpcHBsZT5cbiAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgcmVzdWx0cy5hbGlhcyB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5BbGlhczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgPC9xLWl0ZW0+XG4gICAgICA8cS1pdGVtIGNsaWNrYWJsZSB2LXJpcHBsZT5cbiAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgcmVzdWx0cy5jbGFzcyB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5DbGFzczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgPC9xLWl0ZW0+XG4gICAgICA8cS1pdGVtIGNsaWNrYWJsZSB2LXJpcHBsZT5cbiAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgcmVzdWx0cy5zdGF0dXMgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+U3RhdHVzPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICA8L3EtaXRlbT5cbiAgICAgIDxxLWl0ZW0gY2xpY2thYmxlIHYtcmlwcGxlPlxuICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyByZXN1bHRzLnV1aWQgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+VXVpZDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgPC9xLWl0ZW0+XG4gICAgICA8cS1pdGVtIGNsaWNrYWJsZSB2LXJpcHBsZT5cbiAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgcmVzdWx0cy50YWdzIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlRhZ3M8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgIDwvcS1pdGVtPlxuICAgICAgPHEtaXRlbSBjbGlja2FibGUgdi1yaXBwbGU+XG4gICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHJlc3VsdHMucGVyY2VudGFnZSB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5QZXJjZW50YWdlPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICA8L3EtaXRlbT5cbiAgICAgIDxxLWl0ZW0gY2xpY2thYmxlIHYtcmlwcGxlPlxuICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyByZXN1bHRzLmNyZWF0ZWRfYXQgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+RGlzcGF0Y2hlZCBBdDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgPC9xLWl0ZW0+XG4gICAgPC9xLWxpc3Q+XG5cbiAgICA8cS1jYXJkPlxuICAgICAgPHEtdGFicyB2LW1vZGVsPVwidGFiXCJcbiAgICAgICAgICAgICAgY2xhc3M9XCJ0ZXh0LXRlYWxcIlxuICAgICAgPlxuICAgICAgICA8cS10YWIgbmFtZT1cIm1lc3NhZ2VzXCIgaWNvbj1cIm1haWxcIiBsYWJlbD1cIk1lc3NhZ2VzXCIvPlxuICAgICAgICA8cS10YWIgbmFtZT1cInNpZ25hbHNcIiBpY29uPVwiYWxhcm1cIiBsYWJlbD1cIlNpZ25hbHNcIi8+XG4gICAgICAgIDxxLXRhYiBuYW1lPVwic3RhdHVzZXNcIiBpY29uPVwibW92aWVcIiBsYWJlbD1cIlN0YXR1cyBIaXN0b3J5XCIvPlxuICAgICAgPC9xLXRhYnM+XG5cbiAgICAgIDxxLXNlcGFyYXRvci8+XG5cbiAgICAgIDxxLXRhYi1wYW5lbHMgdi1tb2RlbD1cInRhYlwiIGFuaW1hdGVkPlxuICAgICAgICA8cS10YWItcGFuZWwgbmFtZT1cIm1lc3NhZ2VzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHQtaDZcIj5NZXNzYWdlczwvZGl2PlxuICAgICAgICAgIDxxLXRpbWVsaW5lIGNvbG9yPVwic2Vjb25kYXJ5XCI+XG4gICAgICAgICAgICA8cS10aW1lbGluZS1lbnRyeVxuICAgICAgICAgICAgICB2LWZvcj1cIm1lc3NhZ2UgaW4gcmVzdWx0cy5tZXNzYWdlc1wiXG4gICAgICAgICAgICAgIDprZXk9XCJtZXNzYWdlLmlkXCJcbiAgICAgICAgICAgICAgOnRpdGxlPVwibWVzc2FnZS50eXBlXCJcbiAgICAgICAgICAgICAgOnN1YnRpdGxlPVwiZGF5anMobWVzc2FnZS5jcmVhdGVkX2F0KS5mb3JtYXQoJ0wgTFRTJylcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHt7bWVzc2FnZS5tZXNzYWdlfX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3EtdGltZWxpbmUtZW50cnk+XG4gICAgICAgICAgPC9xLXRpbWVsaW5lPlxuICAgICAgICA8L3EtdGFiLXBhbmVsPlxuXG4gICAgICAgIDxxLXRhYi1wYW5lbCBuYW1lPVwic2lnbmFsc1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWg2XCI+U2lnbmFsczwvZGl2PlxuICAgICAgICAgIDxxLXRpbWVsaW5lIGNvbG9yPVwic2Vjb25kYXJ5XCI+XG4gICAgICAgICAgICA8cS10aW1lbGluZS1lbnRyeVxuICAgICAgICAgICAgICB2LWZvcj1cInNpZ25hbCBpbiByZXN1bHRzLnNpZ25hbHNcIlxuICAgICAgICAgICAgICA6a2V5PVwic2lnbmFsLmlkXCJcbiAgICAgICAgICAgICAgOnRpdGxlPVwic2lnbmFsLnNpZ25hbFwiXG4gICAgICAgICAgICAgIDpzdWJ0aXRsZT1cInNpZ25hbC5jYW5jZWxfam9iID8gJ0pvYiBzdG9wcGVkJyA6ICdKb2IgY29udGludWVkJ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3tzaWduYWwucGFyYW1ldGVyc319LlxuICAgICAgICAgICAgICAgIDxxLWxpc3QgYm9yZGVyZWQgc2VwYXJhdG9yPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbSBjbGlja2FibGUgdi1yaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHNpZ25hbC5wYXJhbWV0ZXJzIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlBhcmFtZXRlcnM8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvcS1pdGVtPlxuICAgICAgICAgICAgICAgICAgPHEtaXRlbSBjbGlja2FibGUgdi1yaXBwbGU+XG4gICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IGRheWpzKHNpZ25hbC5jcmVhdGVkX2F0KS5mb3JtYXQoJ0wgTFRTJykgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+U2VudCBhdDwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgICAgICAgICAgICA8cS1pdGVtIGNsaWNrYWJsZSB2LXJpcHBsZT5cbiAgICAgICAgICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgZGF5anMoc2lnbmFsLmhhbmRsZWRfYXQpLmZvcm1hdCgnTCBMVFMnKSB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5IYW5kbGVkIGF0PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgICAgICAgICA8L3EtbGlzdD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L3EtdGltZWxpbmUtZW50cnk+XG4gICAgICAgICAgPC9xLXRpbWVsaW5lPlxuICAgICAgICA8L3EtdGFiLXBhbmVsPlxuXG4gICAgICAgIDxxLXRhYi1wYW5lbCBuYW1lPVwic3RhdHVzZXNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNlwiPlN0YXR1c2VzPC9kaXY+XG4gICAgICAgICAgPHEtdGltZWxpbmUgY29sb3I9XCJzZWNvbmRhcnlcIj5cbiAgICAgICAgICAgIDxxLXRpbWVsaW5lLWVudHJ5XG4gICAgICAgICAgICAgIHYtZm9yPVwic3RhdHVzIGluIHJlc3VsdHMuc3RhdHVzZXNcIlxuICAgICAgICAgICAgICA6a2V5PVwic3RhdHVzLmlkXCJcbiAgICAgICAgICAgICAgOnRpdGxlPVwic3RhdHVzLnN0YXR1c1wiXG4gICAgICAgICAgICAgIDpzdWJ0aXRsZT1cImRheWpzKHN0YXR1cy5jcmVhdGVkX2F0KS5mb3JtYXQoJ0wgTFRTJylcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2PlxuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9xLXRpbWVsaW5lLWVudHJ5PlxuICAgICAgICAgIDwvcS10aW1lbGluZT5cbiAgICAgICAgPC9xLXRhYi1wYW5lbD5cbiAgICAgIDwvcS10YWItcGFuZWxzPlxuICAgIDwvcS1jYXJkPlxuICA8L3EtcGFnZT5cbiAgPHEtcGFnZSBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1ldmVubHlcIiB2LWVsc2U+XG4gICAgTG9hZGluZ1xuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQge3JlYWN0aXZlLCByZWZ9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgYXBpIGZyb20gJ3NyYy91dGlscy9jbGllbnQvYXBpJztcbmltcG9ydCB7Sm9iUnVufSBmcm9tICdzcmMvdHlwZXMvYXBpJztcbmltcG9ydCB7dXNlQXBpfSBmcm9tIFwiLi4vY29tcG9zdGFibGVzL3VzZUFwaVwiO1xuaW1wb3J0IFRyYWNrZWRSdW5MaXN0SXRlbSBmcm9tIFwiY29tcG9uZW50cy9UcmFja2VkUnVuTGlzdEl0ZW0udnVlXCI7XG5pbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5pbXBvcnQgbG9jYWxpemVkRm9ybWF0IGZyb20gJ2RheWpzL3BsdWdpbi9sb2NhbGl6ZWRGb3JtYXQnO1xuZGF5anMuZXh0ZW5kKGxvY2FsaXplZEZvcm1hdCk7XG5cbmNvbnN0IHJlc3VsdHMgPSByZWY8Sm9iUnVuIHwgbnVsbD4obnVsbCk7XG5cbmNvbnN0IHRhYiA9IHJlZjxzdHJpbmc+KCdtZXNzYWdlcycpO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzPHtcbiAgam9iU3RhdHVzSWQ6IHN0cmluZ1xufT4oKTtcblxudXNlQXBpKChhZnRlcikgPT4ge1xuICBhcGkucnVuU2hvdyhwcm9wcy5qb2JTdGF0dXNJZClcbiAgICAudGhlbigocmVzcG9uc2U6IEpvYlJ1bikgPT4gcmVzdWx0cy52YWx1ZSA9IHJlc3BvbnNlKVxuICAgIC5maW5hbGx5KGFmdGVyKTtcbn0pXG5cbmZ1bmN0aW9uIGdldEhhc2goam9iUnVuOiBKb2JSdW4pOiBzdHJpbmcge1xuICByZXR1cm4gam9iUnVuLnV1aWQ7XG59XG5cbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbImNvbnRlbnQiLCJ0aGlzIiwidCIsIm8iLCJuIiwiciIsImkiLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFPQSxJQUFBLFVBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBRU4sT0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBRUgsZUFBZTtBQUFBLElBQ2YsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLEVBQ1Y7QUFBQSxFQUVELE1BQU8sT0FBTyxFQUFFLFNBQVM7QUFDdkIsVUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFJLEVBQUEsSUFBSyxtQkFBb0I7QUFDOUMsVUFBTSxTQUFTLFFBQVEsT0FBTyxFQUFFO0FBRWhDLFVBQU0sVUFBVTtBQUFBLE1BQVMsTUFDdkIsK0JBQ0csTUFBTSxVQUFVLE9BQU8scUJBQXFCLE9BQzVDLE9BQU8sVUFBVSxPQUFPLDJCQUEyQixPQUNuRCxNQUFNLFlBQVksT0FBTyxxQkFBcUI7QUFBQSxJQUNsRDtBQUVELFVBQU0sY0FBYztBQUFBLE1BQVMsTUFDM0Isc0RBQ1csTUFBTSxrQkFBa0IsT0FBTyxTQUFTO0FBQUEsSUFDcEQ7QUFFRCxXQUFPLE1BQU07QUFDWCxZQUFNLFFBQVE7QUFBQSxRQUNaLEVBQUUsT0FBTztBQUFBLFVBQ1AsT0FBTztBQUFBLFFBQ2pCLEdBQVcsTUFB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Qzs7O0FDckNELEdBQUMsU0FBUyxHQUFFLEdBQUU7QUFBc0QsV0FBQSxVQUFlO0VBQTBJLEVBQUVDLGdCQUFNLFdBQVU7QUFBYyxRQUFJLElBQUUsRUFBQyxLQUFJLGFBQVksSUFBRyxVQUFTLEdBQUUsY0FBYSxJQUFHLGdCQUFlLEtBQUksdUJBQXNCLE1BQUssNEJBQTJCO0FBQUUsV0FBTyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBSSxJQUFFLEVBQUUsV0FBVSxJQUFFLEVBQUU7QUFBTyxRQUFFLEdBQUcsVUFBUSxHQUFFLEVBQUUsU0FBTyxTQUFTQyxJQUFFO0FBQUMsbUJBQVNBLE9BQUlBLEtBQUU7QUFBd0IsWUFBSUMsS0FBRSxLQUFLLFFBQU8sRUFBRyxTQUFRQyxLQUFFLFNBQVNGLElBQUVDLElBQUU7QUFBQyxpQkFBT0QsR0FBRSxRQUFRLHFDQUFxQyxTQUFTQSxJQUFFRSxJQUFFQyxJQUFFO0FBQUMsZ0JBQUlDLEtBQUVELE1BQUdBLEdBQUU7QUFBYyxtQkFBT0QsTUFBR0QsR0FBRUUsT0FBSSxFQUFFQSxPQUFJRixHQUFFRyxJQUFHLFFBQVEsa0NBQWtDLFNBQVNDLElBQUVMLElBQUVDLElBQUU7QUFBQyxxQkFBT0QsTUFBR0MsR0FBRSxNQUFNLENBQUM7QUFBQSxZQUFDLENBQUM7QUFBQSxVQUFFLENBQUM7QUFBQSxRQUFFLEVBQUVELElBQUUsV0FBU0MsS0FBRSxDQUFFLElBQUNBLEVBQUM7QUFBRSxlQUFPLEVBQUUsS0FBSyxNQUFLQyxFQUFDO0FBQUEsTUFBQztBQUFBLElBQUM7QUFBQSxFQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDc0pweUIsVUFBTSxPQUFPLGVBQWU7QUFFdEIsVUFBQSxVQUFVLElBQW1CLElBQUk7QUFFakMsVUFBQSxNQUFNLElBQVksVUFBVTtBQU1sQyxXQUFPLENBQUMsVUFBVTtBQUNoQixVQUFJLFFBQVEsTUFBTSxXQUFXLEVBQzFCLEtBQUssQ0FBQyxhQUFxQixRQUFRLFFBQVEsUUFBUSxFQUNuRCxRQUFRLEtBQUs7QUFBQSxJQUFBLENBQ2pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
