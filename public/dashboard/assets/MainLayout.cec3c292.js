import { Q as QBtn } from "./QBtn.9bd529c3.js";
import { c as createComponent, h as hSlot, a as hUniqueSlot, b as createDirective, d as hDir, e as hMergeSlot } from "./render.f16c1865.js";
import { c as computed, h, j as emptyRenderFn, r as ref, w as watch, k as onBeforeUnmount, a as inject, l as layoutKey, g as getCurrentInstance, H as History, o as onMounted, n as nextTick, m as client, p as listenOpts, q as stopAndPrevent, t as getEventPath, u as noop, v as leftClick, x as addEvt, y as preventDraggable, z as prevent, A as stop, B as position, C as cleanEvt, D as withDirectives, E as provide, G as pageContainerKey, I as isRuntimeSsrPreHydration, J as reactive, b as onUnmounted, K as defineComponent, _ as _export_sfc, L as openBlock, M as createBlock, N as withCtx, d as createVNode, O as createCommentVNode, P as createTextVNode, Q as toDisplayString, R as createBaseVNode, S as createElementBlock, U as renderList, F as Fragment, V as resolveComponent, W as mergeProps } from "./index.6ef0c4c5.js";
import { Q as QResizeObserver, g as getModifierDirections, s as shouldStart, c as clearSelection, u as useTimeout } from "./selection.014ff0f9.js";
import { u as useDarkProps, a as useDark, Q as QItemSection, b as QItemLabel, c as QItem, d as QList } from "./QItem.65aee473.js";
import { v as vmHasRouter, Q as QIcon } from "./use-router-link.4ed4ca54.js";
import { c as css, g as getElement } from "./Ripple.6d84203a.js";
import { b as between } from "./format.801e7424.js";
import { C as Config } from "./config.b6f61684.js";
var QToolbarTitle = createComponent({
  name: "QToolbarTitle",
  props: {
    shrink: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => "q-toolbar__title ellipsis" + (props.shrink === true ? " col-shrink" : "")
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
var QToolbar = createComponent({
  name: "QToolbar",
  props: {
    inset: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => "q-toolbar row no-wrap items-center" + (props.inset === true ? " q-toolbar--inset" : "")
    );
    return () => h("div", { class: classes.value, role: "toolbar" }, hSlot(slots.default));
  }
});
var QHeader = createComponent({
  name: "QHeader",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    revealOffset: {
      type: Number,
      default: 250
    },
    bordered: Boolean,
    elevated: Boolean,
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  emits: ["reveal", "focusin"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QHeader needs to be child of QLayout");
      return emptyRenderFn;
    }
    const size2 = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);
    const fixed = computed(
      () => props.reveal === true || $layout.view.value.indexOf("H") > -1 || $q.platform.is.ios && $layout.isContainer.value === true
    );
    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0;
      }
      if (fixed.value === true) {
        return revealed.value === true ? size2.value : 0;
      }
      const offset2 = size2.value - $layout.scroll.value.position;
      return offset2 > 0 ? offset2 : 0;
    });
    const hidden = computed(
      () => props.modelValue !== true || fixed.value === true && revealed.value !== true
    );
    const revealOnFocus = computed(
      () => props.modelValue === true && hidden.value === true && props.reveal === true
    );
    const classes = computed(
      () => "q-header q-layout__section--marginal " + (fixed.value === true ? "fixed" : "absolute") + "-top" + (props.bordered === true ? " q-header--bordered" : "") + (hidden.value === true ? " q-header--hidden" : "") + (props.modelValue !== true ? " q-layout--prevent-focus" : "")
    );
    const style = computed(() => {
      const view = $layout.rows.value.top, css2 = {};
      if (view[0] === "l" && $layout.left.space === true) {
        css2[$q.lang.rtl === true ? "right" : "left"] = `${$layout.left.size}px`;
      }
      if (view[2] === "r" && $layout.right.space === true) {
        css2[$q.lang.rtl === true ? "left" : "right"] = `${$layout.right.size}px`;
      }
      return css2;
    });
    function updateLayout(prop, val) {
      $layout.update("header", prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function onResize({ height }) {
      updateLocal(size2, height);
      updateLayout("size", height);
    }
    function onFocusin(evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }
      emit("focusin", evt);
    }
    watch(() => props.modelValue, (val) => {
      updateLayout("space", val);
      updateLocal(revealed, true);
      $layout.animate();
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(() => props.reveal, (val) => {
      val === false && updateLocal(revealed, props.modelValue);
    });
    watch(revealed, (val) => {
      $layout.animate();
      emit("reveal", val);
    });
    watch($layout.scroll, (scroll) => {
      props.reveal === true && updateLocal(
        revealed,
        scroll.direction === "up" || scroll.position <= props.revealOffset || scroll.position - scroll.inflectionPoint < 100
      );
    });
    const instance = {};
    $layout.instances.header = instance;
    props.modelValue === true && updateLayout("size", size2.value);
    updateLayout("space", props.modelValue);
    updateLayout("offset", offset.value);
    onBeforeUnmount(() => {
      if ($layout.instances.header === instance) {
        $layout.instances.header = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = hUniqueSlot(slots.default, []);
      props.elevated === true && child.push(
        h("div", {
          class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
        })
      );
      child.push(
        h(QResizeObserver, {
          debounce: 0,
          onResize
        })
      );
      return h("header", {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child);
    };
  }
});
function useHistory(showing, hide, hideOnRouteChange) {
  let historyEntry;
  function removeFromHistory() {
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
  }
  onBeforeUnmount(() => {
    showing.value === true && removeFromHistory();
  });
  return {
    removeFromHistory,
    addToHistory() {
      historyEntry = {
        condition: () => hideOnRouteChange.value === true,
        handler: hide
      };
      History.add(historyEntry);
    }
  };
}
const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
};
const useModelToggleEmits = [
  "beforeShow",
  "show",
  "beforeHide",
  "hide"
];
function useModelToggle({
  showing,
  canShow,
  hideOnRouteChange,
  handleShow,
  handleHide,
  processOnMount
}) {
  const vm = getCurrentInstance();
  const { props, emit, proxy } = vm;
  let payload;
  function toggle(evt) {
    if (showing.value === true) {
      hide(evt);
    } else {
      show(evt);
    }
  }
  function show(evt) {
    if (props.disable === true || evt !== void 0 && evt.qAnchorHandled === true || canShow !== void 0 && canShow(evt) !== true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", true);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processShow(evt);
    }
  }
  function processShow(evt) {
    if (showing.value === true) {
      return;
    }
    showing.value = true;
    emit("beforeShow", evt);
    if (handleShow !== void 0) {
      handleShow(evt);
    } else {
      emit("show", evt);
    }
  }
  function hide(evt) {
    if (props.disable === true) {
      return;
    }
    const listener = props["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit("update:modelValue", false);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props.modelValue === null || listener === false || false) {
      processHide(evt);
    }
  }
  function processHide(evt) {
    if (showing.value === false) {
      return;
    }
    showing.value = false;
    emit("beforeHide", evt);
    if (handleHide !== void 0) {
      handleHide(evt);
    } else {
      emit("hide", evt);
    }
  }
  function processModelChange(val) {
    if (props.disable === true && val === true) {
      if (props["onUpdate:modelValue"] !== void 0) {
        emit("update:modelValue", false);
      }
    } else if (val === true !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }
  watch(() => props.modelValue, processModelChange);
  if (hideOnRouteChange !== void 0 && vmHasRouter(vm) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) {
        hide();
      }
    });
  }
  processOnMount === true && onMounted(() => {
    processModelChange(props.modelValue);
  });
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);
  return publicMethods;
}
const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement];
function getScrollTarget(el, targetEl) {
  let target = getElement(targetEl);
  if (target === void 0) {
    if (el === void 0 || el === null) {
      return window;
    }
    target = el.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(target) ? window : target;
}
function getVerticalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : scrollTarget.scrollTop;
}
function getHorizontalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : scrollTarget.scrollLeft;
}
let size;
function getScrollbarWidth() {
  if (size !== void 0) {
    return size;
  }
  const inner = document.createElement("p"), outer = document.createElement("div");
  css(inner, {
    width: "100%",
    height: "200px"
  });
  css(outer, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  });
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  size = w1 - w2;
  return size;
}
function hasScrollbar(el, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  return onY ? el.scrollHeight > el.clientHeight && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-y"])) : el.scrollWidth > el.clientWidth && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-x"]));
}
let registered = 0, scrollPositionX, scrollPositionY, maxScrollTop, vpPendingUpdate = false, bodyLeft, bodyTop, href, closeTimer = null;
function onWheel(e) {
  if (shouldPreventScroll(e)) {
    stopAndPrevent(e);
  }
}
function shouldPreventScroll(e) {
  if (e.target === document.body || e.target.classList.contains("q-layout__backdrop")) {
    return true;
  }
  const path = getEventPath(e), shift = e.shiftKey && !e.deltaX, scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY), delta = shift || scrollY ? e.deltaY : e.deltaX;
  for (let index = 0; index < path.length; index++) {
    const el = path[index];
    if (hasScrollbar(el, scrollY)) {
      return scrollY ? delta < 0 && el.scrollTop === 0 ? true : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight : delta < 0 && el.scrollLeft === 0 ? true : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth;
    }
  }
  return true;
}
function onAppleScroll(e) {
  if (e.target === document) {
    document.scrollingElement.scrollTop = document.scrollingElement.scrollTop;
  }
}
function onAppleResize(evt) {
  if (vpPendingUpdate === true) {
    return;
  }
  vpPendingUpdate = true;
  requestAnimationFrame(() => {
    vpPendingUpdate = false;
    const { height } = evt.target, { clientHeight, scrollTop } = document.scrollingElement;
    if (maxScrollTop === void 0 || height !== window.innerHeight) {
      maxScrollTop = clientHeight - height;
      document.scrollingElement.scrollTop = scrollTop;
    }
    if (scrollTop > maxScrollTop) {
      document.scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8);
    }
  });
}
function apply(action) {
  const body = document.body, hasViewport = window.visualViewport !== void 0;
  if (action === "add") {
    const { overflowY, overflowX } = window.getComputedStyle(body);
    scrollPositionX = getHorizontalScrollPosition(window);
    scrollPositionY = getVerticalScrollPosition(window);
    bodyLeft = body.style.left;
    bodyTop = body.style.top;
    href = window.location.href;
    body.style.left = `-${scrollPositionX}px`;
    body.style.top = `-${scrollPositionY}px`;
    if (overflowX !== "hidden" && (overflowX === "scroll" || body.scrollWidth > window.innerWidth)) {
      body.classList.add("q-body--force-scrollbar-x");
    }
    if (overflowY !== "hidden" && (overflowY === "scroll" || body.scrollHeight > window.innerHeight)) {
      body.classList.add("q-body--force-scrollbar-y");
    }
    body.classList.add("q-body--prevent-scroll");
    document.qScrollPrevented = true;
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.scrollTo(0, 0);
        window.visualViewport.addEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.addEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
        window.scrollTo(0, 0);
      } else {
        window.addEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
  }
  if (client.is.desktop === true && client.is.mac === true) {
    window[`${action}EventListener`]("wheel", onWheel, listenOpts.notPassive);
  }
  if (action === "remove") {
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.visualViewport.removeEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.removeEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
      } else {
        window.removeEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
    body.classList.remove("q-body--prevent-scroll");
    body.classList.remove("q-body--force-scrollbar-x");
    body.classList.remove("q-body--force-scrollbar-y");
    document.qScrollPrevented = false;
    body.style.left = bodyLeft;
    body.style.top = bodyTop;
    if (window.location.href === href) {
      window.scrollTo(scrollPositionX, scrollPositionY);
    }
    maxScrollTop = void 0;
  }
}
function preventScroll(state) {
  let action = "add";
  if (state === true) {
    registered++;
    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
      return;
    }
    if (registered > 1) {
      return;
    }
  } else {
    if (registered === 0) {
      return;
    }
    registered--;
    if (registered > 0) {
      return;
    }
    action = "remove";
    if (client.is.ios === true && client.is.nativeMobile === true) {
      closeTimer !== null && clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        apply(action);
        closeTimer = null;
      }, 100);
      return;
    }
  }
  apply(action);
}
function usePreventScroll() {
  let currentState;
  return {
    preventBodyScroll(state) {
      if (state !== currentState && (currentState !== void 0 || state === true)) {
        currentState = state;
        preventScroll(state);
      }
    }
  };
}
function getChanges(evt, ctx, isFinal) {
  const pos = position(evt);
  let dir, distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y, absX = Math.abs(distX), absY = Math.abs(distY);
  const direction = ctx.direction;
  if (direction.horizontal === true && direction.vertical !== true) {
    dir = distX < 0 ? "left" : "right";
  } else if (direction.horizontal !== true && direction.vertical === true) {
    dir = distY < 0 ? "up" : "down";
  } else if (direction.up === true && distY < 0) {
    dir = "up";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.down === true && distY > 0) {
    dir = "down";
    if (absX > absY) {
      if (direction.left === true && distX < 0) {
        dir = "left";
      } else if (direction.right === true && distX > 0) {
        dir = "right";
      }
    }
  } else if (direction.left === true && distX < 0) {
    dir = "left";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  } else if (direction.right === true && distX > 0) {
    dir = "right";
    if (absX < absY) {
      if (direction.up === true && distY < 0) {
        dir = "up";
      } else if (direction.down === true && distY > 0) {
        dir = "down";
      }
    }
  }
  let synthetic = false;
  if (dir === void 0 && isFinal === false) {
    if (ctx.event.isFirst === true || ctx.event.lastDir === void 0) {
      return {};
    }
    dir = ctx.event.lastDir;
    synthetic = true;
    if (dir === "left" || dir === "right") {
      pos.left -= distX;
      absX = 0;
      distX = 0;
    } else {
      pos.top -= distY;
      absY = 0;
      distY = 0;
    }
  }
  return {
    synthetic,
    payload: {
      evt,
      touch: ctx.event.mouse !== true,
      mouse: ctx.event.mouse === true,
      position: pos,
      direction: dir,
      isFirst: ctx.event.isFirst,
      isFinal: isFinal === true,
      duration: Date.now() - ctx.event.time,
      distance: {
        x: absX,
        y: absY
      },
      offset: {
        x: distX,
        y: distY
      },
      delta: {
        x: pos.left - ctx.event.lastX,
        y: pos.top - ctx.event.lastY
      }
    }
  };
}
let uid = 0;
var TouchPan = createDirective(
  {
    name: "touch-pan",
    beforeMount(el, { value: value2, modifiers }) {
      if (modifiers.mouse !== true && client.has.touch !== true) {
        return;
      }
      function handleEvent(evt, mouseEvent) {
        if (modifiers.mouse === true && mouseEvent === true) {
          stopAndPrevent(evt);
        } else {
          modifiers.stop === true && stop(evt);
          modifiers.prevent === true && prevent(evt);
        }
      }
      const ctx = {
        uid: "qvtp_" + uid++,
        handler: value2,
        modifiers,
        direction: getModifierDirections(modifiers),
        noop,
        mouseStart(evt) {
          if (shouldStart(evt, ctx) && leftClick(evt)) {
            addEvt(ctx, "temp", [
              [document, "mousemove", "move", "notPassiveCapture"],
              [document, "mouseup", "end", "passiveCapture"]
            ]);
            ctx.start(evt, true);
          }
        },
        touchStart(evt) {
          if (shouldStart(evt, ctx)) {
            const target = evt.target;
            addEvt(ctx, "temp", [
              [target, "touchmove", "move", "notPassiveCapture"],
              [target, "touchcancel", "end", "passiveCapture"],
              [target, "touchend", "end", "passiveCapture"]
            ]);
            ctx.start(evt);
          }
        },
        start(evt, mouseEvent) {
          client.is.firefox === true && preventDraggable(el, true);
          ctx.lastEvt = evt;
          if (mouseEvent === true || modifiers.stop === true) {
            if (ctx.direction.all !== true && (mouseEvent !== true || ctx.modifiers.mouseAllDir !== true && ctx.modifiers.mousealldir !== true)) {
              const clone = evt.type.indexOf("mouse") > -1 ? new MouseEvent(evt.type, evt) : new TouchEvent(evt.type, evt);
              evt.defaultPrevented === true && prevent(clone);
              evt.cancelBubble === true && stop(clone);
              Object.assign(clone, {
                qKeyEvent: evt.qKeyEvent,
                qClickOutside: evt.qClickOutside,
                qAnchorHandled: evt.qAnchorHandled,
                qClonedBy: evt.qClonedBy === void 0 ? [ctx.uid] : evt.qClonedBy.concat(ctx.uid)
              });
              ctx.initialEvent = {
                target: evt.target,
                event: clone
              };
            }
            stop(evt);
          }
          const { left, top } = position(evt);
          ctx.event = {
            x: left,
            y: top,
            time: Date.now(),
            mouse: mouseEvent === true,
            detected: false,
            isFirst: true,
            isFinal: false,
            lastX: left,
            lastY: top
          };
        },
        move(evt) {
          if (ctx.event === void 0) {
            return;
          }
          const pos = position(evt), distX = pos.left - ctx.event.x, distY = pos.top - ctx.event.y;
          if (distX === 0 && distY === 0) {
            return;
          }
          ctx.lastEvt = evt;
          const isMouseEvt = ctx.event.mouse === true;
          const start = () => {
            handleEvent(evt, isMouseEvt);
            let cursor;
            if (modifiers.preserveCursor !== true && modifiers.preservecursor !== true) {
              cursor = document.documentElement.style.cursor || "";
              document.documentElement.style.cursor = "grabbing";
            }
            isMouseEvt === true && document.body.classList.add("no-pointer-events--children");
            document.body.classList.add("non-selectable");
            clearSelection();
            ctx.styleCleanup = (withDelayedFn) => {
              ctx.styleCleanup = void 0;
              if (cursor !== void 0) {
                document.documentElement.style.cursor = cursor;
              }
              document.body.classList.remove("non-selectable");
              if (isMouseEvt === true) {
                const remove = () => {
                  document.body.classList.remove("no-pointer-events--children");
                };
                if (withDelayedFn !== void 0) {
                  setTimeout(() => {
                    remove();
                    withDelayedFn();
                  }, 50);
                } else {
                  remove();
                }
              } else if (withDelayedFn !== void 0) {
                withDelayedFn();
              }
            };
          };
          if (ctx.event.detected === true) {
            ctx.event.isFirst !== true && handleEvent(evt, ctx.event.mouse);
            const { payload, synthetic } = getChanges(evt, ctx, false);
            if (payload !== void 0) {
              if (ctx.handler(payload) === false) {
                ctx.end(evt);
              } else {
                if (ctx.styleCleanup === void 0 && ctx.event.isFirst === true) {
                  start();
                }
                ctx.event.lastX = payload.position.left;
                ctx.event.lastY = payload.position.top;
                ctx.event.lastDir = synthetic === true ? void 0 : payload.direction;
                ctx.event.isFirst = false;
              }
            }
            return;
          }
          if (ctx.direction.all === true || isMouseEvt === true && (ctx.modifiers.mouseAllDir === true || ctx.modifiers.mousealldir === true)) {
            start();
            ctx.event.detected = true;
            ctx.move(evt);
            return;
          }
          const absX = Math.abs(distX), absY = Math.abs(distY);
          if (absX !== absY) {
            if (ctx.direction.horizontal === true && absX > absY || ctx.direction.vertical === true && absX < absY || ctx.direction.up === true && absX < absY && distY < 0 || ctx.direction.down === true && absX < absY && distY > 0 || ctx.direction.left === true && absX > absY && distX < 0 || ctx.direction.right === true && absX > absY && distX > 0) {
              ctx.event.detected = true;
              ctx.move(evt);
            } else {
              ctx.end(evt, true);
            }
          }
        },
        end(evt, abort) {
          if (ctx.event === void 0) {
            return;
          }
          cleanEvt(ctx, "temp");
          client.is.firefox === true && preventDraggable(el, false);
          if (abort === true) {
            ctx.styleCleanup !== void 0 && ctx.styleCleanup();
            if (ctx.event.detected !== true && ctx.initialEvent !== void 0) {
              ctx.initialEvent.target.dispatchEvent(ctx.initialEvent.event);
            }
          } else if (ctx.event.detected === true) {
            ctx.event.isFirst === true && ctx.handler(getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx).payload);
            const { payload } = getChanges(evt === void 0 ? ctx.lastEvt : evt, ctx, true);
            const fn = () => {
              ctx.handler(payload);
            };
            if (ctx.styleCleanup !== void 0) {
              ctx.styleCleanup(fn);
            } else {
              fn();
            }
          }
          ctx.event = void 0;
          ctx.initialEvent = void 0;
          ctx.lastEvt = void 0;
        }
      };
      el.__qtouchpan = ctx;
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
      const ctx = el.__qtouchpan;
      if (ctx !== void 0) {
        if (bindings.oldValue !== bindings.value) {
          typeof value !== "function" && ctx.end();
          ctx.handler = bindings.value;
        }
        ctx.direction = getModifierDirections(bindings.modifiers);
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qtouchpan;
      if (ctx !== void 0) {
        ctx.event !== void 0 && ctx.end();
        cleanEvt(ctx, "main");
        cleanEvt(ctx, "temp");
        client.is.firefox === true && preventDraggable(el, false);
        ctx.styleCleanup !== void 0 && ctx.styleCleanup();
        delete el.__qtouchpan;
      }
    }
  }
);
const duration = 150;
var QDrawer = createComponent({
  name: "QDrawer",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useDarkProps,
    side: {
      type: String,
      default: "left",
      validator: (v) => ["left", "right"].includes(v)
    },
    width: {
      type: Number,
      default: 300
    },
    mini: Boolean,
    miniToOverlay: Boolean,
    miniWidth: {
      type: Number,
      default: 57
    },
    breakpoint: {
      type: Number,
      default: 1023
    },
    showIfAbove: Boolean,
    behavior: {
      type: String,
      validator: (v) => ["default", "desktop", "mobile"].includes(v),
      default: "default"
    },
    bordered: Boolean,
    elevated: Boolean,
    overlay: Boolean,
    persistent: Boolean,
    noSwipeOpen: Boolean,
    noSwipeClose: Boolean,
    noSwipeBackdrop: Boolean
  },
  emits: [
    ...useModelToggleEmits,
    "onLayout",
    "miniState"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const isDark = useDark(props, $q);
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout, removeTimeout } = useTimeout();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QDrawer needs to be child of QLayout");
      return emptyRenderFn;
    }
    let lastDesktopState, timerMini = null, layoutTotalWidthWatcher;
    const belowBreakpoint = ref(
      props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint
    );
    const isMini = computed(
      () => props.mini === true && belowBreakpoint.value !== true
    );
    const size2 = computed(() => isMini.value === true ? props.miniWidth : props.width);
    const showing = ref(
      props.showIfAbove === true && belowBreakpoint.value === false ? true : props.modelValue === true
    );
    const hideOnRouteChange = computed(
      () => props.persistent !== true && (belowBreakpoint.value === true || onScreenOverlay.value === true)
    );
    function handleShow(evt, noEvent) {
      addToHistory();
      evt !== false && $layout.animate();
      applyPosition(0);
      if (belowBreakpoint.value === true) {
        const otherInstance = $layout.instances[otherSide.value];
        if (otherInstance !== void 0 && otherInstance.belowBreakpoint === true) {
          otherInstance.hide(false);
        }
        applyBackdrop(1);
        $layout.isContainer.value !== true && preventBodyScroll(true);
      } else {
        applyBackdrop(0);
        evt !== false && setScrollable(false);
      }
      registerTimeout(() => {
        evt !== false && setScrollable(true);
        noEvent !== true && emit("show", evt);
      }, duration);
    }
    function handleHide(evt, noEvent) {
      removeFromHistory();
      evt !== false && $layout.animate();
      applyBackdrop(0);
      applyPosition(stateDirection.value * size2.value);
      cleanup();
      if (noEvent !== true) {
        registerTimeout(() => {
          emit("hide", evt);
        }, duration);
      } else {
        removeTimeout();
      }
    }
    const { show, hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const instance = {
      belowBreakpoint,
      hide
    };
    const rightSide = computed(() => props.side === "right");
    const stateDirection = computed(
      () => ($q.lang.rtl === true ? -1 : 1) * (rightSide.value === true ? 1 : -1)
    );
    const flagBackdropBg = ref(0);
    const flagPanning = ref(false);
    const flagMiniAnimate = ref(false);
    const flagContentPosition = ref(
      size2.value * stateDirection.value
    );
    const otherSide = computed(() => rightSide.value === true ? "left" : "right");
    const offset = computed(() => showing.value === true && belowBreakpoint.value === false && props.overlay === false ? props.miniToOverlay === true ? props.miniWidth : size2.value : 0);
    const fixed = computed(
      () => props.overlay === true || props.miniToOverlay === true || $layout.view.value.indexOf(rightSide.value ? "R" : "L") > -1 || $q.platform.is.ios === true && $layout.isContainer.value === true
    );
    const onLayout = computed(
      () => props.overlay === false && showing.value === true && belowBreakpoint.value === false
    );
    const onScreenOverlay = computed(
      () => props.overlay === true && showing.value === true && belowBreakpoint.value === false
    );
    const backdropClass = computed(
      () => "fullscreen q-drawer__backdrop" + (showing.value === false && flagPanning.value === false ? " hidden" : "")
    );
    const backdropStyle = computed(() => ({
      backgroundColor: `rgba(0,0,0,${flagBackdropBg.value * 0.4})`
    }));
    const headerSlot = computed(() => rightSide.value === true ? $layout.rows.value.top[2] === "r" : $layout.rows.value.top[0] === "l");
    const footerSlot = computed(() => rightSide.value === true ? $layout.rows.value.bottom[2] === "r" : $layout.rows.value.bottom[0] === "l");
    const aboveStyle = computed(() => {
      const css2 = {};
      if ($layout.header.space === true && headerSlot.value === false) {
        if (fixed.value === true) {
          css2.top = `${$layout.header.offset}px`;
        } else if ($layout.header.space === true) {
          css2.top = `${$layout.header.size}px`;
        }
      }
      if ($layout.footer.space === true && footerSlot.value === false) {
        if (fixed.value === true) {
          css2.bottom = `${$layout.footer.offset}px`;
        } else if ($layout.footer.space === true) {
          css2.bottom = `${$layout.footer.size}px`;
        }
      }
      return css2;
    });
    const style = computed(() => {
      const style2 = {
        width: `${size2.value}px`,
        transform: `translateX(${flagContentPosition.value}px)`
      };
      return belowBreakpoint.value === true ? style2 : Object.assign(style2, aboveStyle.value);
    });
    const contentClass = computed(
      () => "q-drawer__content fit " + ($layout.isContainer.value !== true ? "scroll" : "overflow-auto")
    );
    const classes = computed(
      () => `q-drawer q-drawer--${props.side}` + (flagMiniAnimate.value === true ? " q-drawer--mini-animate" : "") + (props.bordered === true ? " q-drawer--bordered" : "") + (isDark.value === true ? " q-drawer--dark q-dark" : "") + (flagPanning.value === true ? " no-transition" : showing.value === true ? "" : " q-layout--prevent-focus") + (belowBreakpoint.value === true ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${isMini.value === true ? "mini" : "standard"}` + (fixed.value === true || onLayout.value !== true ? " fixed" : "") + (props.overlay === true || props.miniToOverlay === true ? " q-drawer--on-top" : "") + (headerSlot.value === true ? " q-drawer--top-padding" : ""))
    );
    const openDirective = computed(() => {
      const dir = $q.lang.rtl === true ? props.side : otherSide.value;
      return [[
        TouchPan,
        onOpenPan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const contentCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const backdropCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true,
          mouseAllDir: true
        }
      ]];
    });
    function updateBelowBreakpoint() {
      updateLocal(belowBreakpoint, props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint);
    }
    watch(belowBreakpoint, (val) => {
      if (val === true) {
        lastDesktopState = showing.value;
        showing.value === true && hide(false);
      } else if (props.overlay === false && props.behavior !== "mobile" && lastDesktopState !== false) {
        if (showing.value === true) {
          applyPosition(0);
          applyBackdrop(0);
          cleanup();
        } else {
          show(false);
        }
      }
    });
    watch(() => props.side, (newSide, oldSide) => {
      if ($layout.instances[oldSide] === instance) {
        $layout.instances[oldSide] = void 0;
        $layout[oldSide].space = false;
        $layout[oldSide].offset = 0;
      }
      $layout.instances[newSide] = instance;
      $layout[newSide].size = size2.value;
      $layout[newSide].space = onLayout.value;
      $layout[newSide].offset = offset.value;
    });
    watch($layout.totalWidth, () => {
      if ($layout.isContainer.value === true || document.qScrollPrevented !== true) {
        updateBelowBreakpoint();
      }
    });
    watch(
      () => props.behavior + props.breakpoint,
      updateBelowBreakpoint
    );
    watch($layout.isContainer, (val) => {
      showing.value === true && preventBodyScroll(val !== true);
      val === true && updateBelowBreakpoint();
    });
    watch($layout.scrollbarWidth, () => {
      applyPosition(showing.value === true ? 0 : void 0);
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(onLayout, (val) => {
      emit("onLayout", val);
      updateLayout("space", val);
    });
    watch(rightSide, () => {
      applyPosition();
    });
    watch(size2, (val) => {
      applyPosition();
      updateSizeOnLayout(props.miniToOverlay, val);
    });
    watch(() => props.miniToOverlay, (val) => {
      updateSizeOnLayout(val, size2.value);
    });
    watch(() => $q.lang.rtl, () => {
      applyPosition();
    });
    watch(() => props.mini, () => {
      if (props.modelValue === true) {
        animateMini();
        $layout.animate();
      }
    });
    watch(isMini, (val) => {
      emit("miniState", val);
    });
    function applyPosition(position2) {
      if (position2 === void 0) {
        nextTick(() => {
          position2 = showing.value === true ? 0 : size2.value;
          applyPosition(stateDirection.value * position2);
        });
      } else {
        if ($layout.isContainer.value === true && rightSide.value === true && (belowBreakpoint.value === true || Math.abs(position2) === size2.value)) {
          position2 += stateDirection.value * $layout.scrollbarWidth.value;
        }
        flagContentPosition.value = position2;
      }
    }
    function applyBackdrop(x) {
      flagBackdropBg.value = x;
    }
    function setScrollable(v) {
      const action = v === true ? "remove" : $layout.isContainer.value !== true ? "add" : "";
      action !== "" && document.body.classList[action]("q-body--drawer-toggle");
    }
    function animateMini() {
      timerMini !== null && clearTimeout(timerMini);
      if (vm.proxy && vm.proxy.$el) {
        vm.proxy.$el.classList.add("q-drawer--mini-animate");
      }
      flagMiniAnimate.value = true;
      timerMini = setTimeout(() => {
        timerMini = null;
        flagMiniAnimate.value = false;
        if (vm && vm.proxy && vm.proxy.$el) {
          vm.proxy.$el.classList.remove("q-drawer--mini-animate");
        }
      }, 150);
    }
    function onOpenPan(evt) {
      if (showing.value !== false) {
        return;
      }
      const width = size2.value, position2 = between(evt.distance.x, 0, width);
      if (evt.isFinal === true) {
        const opened = position2 >= Math.min(75, width);
        if (opened === true) {
          show();
        } else {
          $layout.animate();
          applyBackdrop(0);
          applyPosition(stateDirection.value * width);
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(
        ($q.lang.rtl === true ? rightSide.value !== true : rightSide.value) ? Math.max(width - position2, 0) : Math.min(0, position2 - width)
      );
      applyBackdrop(
        between(position2 / width, 0, 1)
      );
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function onClosePan(evt) {
      if (showing.value !== true) {
        return;
      }
      const width = size2.value, dir = evt.direction === props.side, position2 = ($q.lang.rtl === true ? dir !== true : dir) ? between(evt.distance.x, 0, width) : 0;
      if (evt.isFinal === true) {
        const opened = Math.abs(position2) < Math.min(75, width);
        if (opened === true) {
          $layout.animate();
          applyBackdrop(1);
          applyPosition(0);
        } else {
          hide();
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(stateDirection.value * position2);
      applyBackdrop(between(1 - position2 / width, 0, 1));
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function cleanup() {
      preventBodyScroll(false);
      setScrollable(true);
    }
    function updateLayout(prop, val) {
      $layout.update(props.side, prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function updateSizeOnLayout(miniToOverlay, size3) {
      updateLayout("size", miniToOverlay === true ? props.miniWidth : size3);
    }
    $layout.instances[props.side] = instance;
    updateSizeOnLayout(props.miniToOverlay, size2.value);
    updateLayout("space", onLayout.value);
    updateLayout("offset", offset.value);
    if (props.showIfAbove === true && props.modelValue !== true && showing.value === true && props["onUpdate:modelValue"] !== void 0) {
      emit("update:modelValue", true);
    }
    onMounted(() => {
      emit("onLayout", onLayout.value);
      emit("miniState", isMini.value);
      lastDesktopState = props.showIfAbove === true;
      const fn = () => {
        const action = showing.value === true ? handleShow : handleHide;
        action(false, true);
      };
      if ($layout.totalWidth.value !== 0) {
        nextTick(fn);
        return;
      }
      layoutTotalWidthWatcher = watch($layout.totalWidth, () => {
        layoutTotalWidthWatcher();
        layoutTotalWidthWatcher = void 0;
        if (showing.value === false && props.showIfAbove === true && belowBreakpoint.value === false) {
          show(false);
        } else {
          fn();
        }
      });
    });
    onBeforeUnmount(() => {
      layoutTotalWidthWatcher !== void 0 && layoutTotalWidthWatcher();
      if (timerMini !== null) {
        clearTimeout(timerMini);
        timerMini = null;
      }
      showing.value === true && cleanup();
      if ($layout.instances[props.side] === instance) {
        $layout.instances[props.side] = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = [];
      if (belowBreakpoint.value === true) {
        props.noSwipeOpen === false && child.push(
          withDirectives(
            h("div", {
              key: "open",
              class: `q-drawer__opener fixed-${props.side}`,
              "aria-hidden": "true"
            }),
            openDirective.value
          )
        );
        child.push(
          hDir(
            "div",
            {
              ref: "backdrop",
              class: backdropClass.value,
              style: backdropStyle.value,
              "aria-hidden": "true",
              onClick: hide
            },
            void 0,
            "backdrop",
            props.noSwipeBackdrop !== true && showing.value === true,
            () => backdropCloseDirective.value
          )
        );
      }
      const mini = isMini.value === true && slots.mini !== void 0;
      const content = [
        h(
          "div",
          {
            ...attrs,
            key: "" + mini,
            class: [
              contentClass.value,
              attrs.class
            ]
          },
          mini === true ? slots.mini() : hSlot(slots.default)
        )
      ];
      if (props.elevated === true && showing.value === true) {
        content.push(
          h("div", {
            class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
          })
        );
      }
      child.push(
        hDir(
          "aside",
          { ref: "content", class: classes.value, style: style.value },
          content,
          "contentclose",
          props.noSwipeClose !== true && belowBreakpoint.value === true,
          () => contentCloseDirective.value
        )
      );
      return h("div", { class: "q-drawer-container" }, child);
    };
  }
});
var QPageContainer = createComponent({
  name: "QPageContainer",
  setup(_, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QPageContainer needs to be child of QLayout");
      return emptyRenderFn;
    }
    provide(pageContainerKey, true);
    const style = computed(() => {
      const css2 = {};
      if ($layout.header.space === true) {
        css2.paddingTop = `${$layout.header.size}px`;
      }
      if ($layout.right.space === true) {
        css2[`padding${$q.lang.rtl === true ? "Left" : "Right"}`] = `${$layout.right.size}px`;
      }
      if ($layout.footer.space === true) {
        css2.paddingBottom = `${$layout.footer.size}px`;
      }
      if ($layout.left.space === true) {
        css2[`padding${$q.lang.rtl === true ? "Right" : "Left"}`] = `${$layout.left.size}px`;
      }
      return css2;
    });
    return () => h("div", {
      class: "q-page-container",
      style: style.value
    }, hSlot(slots.default));
  }
});
const { passive } = listenOpts;
const axisValues = ["both", "horizontal", "vertical"];
var QScrollObserver = createComponent({
  name: "QScrollObserver",
  props: {
    axis: {
      type: String,
      validator: (v) => axisValues.includes(v),
      default: "vertical"
    },
    debounce: [String, Number],
    scrollTarget: {
      default: void 0
    }
  },
  emits: ["scroll"],
  setup(props, { emit }) {
    const scroll = {
      position: {
        top: 0,
        left: 0
      },
      direction: "down",
      directionChanged: false,
      delta: {
        top: 0,
        left: 0
      },
      inflectionPoint: {
        top: 0,
        left: 0
      }
    };
    let clearTimer = null, localScrollTarget, parentEl;
    watch(() => props.scrollTarget, () => {
      unconfigureScrollTarget();
      configureScrollTarget();
    });
    function emitEvent() {
      clearTimer !== null && clearTimer();
      const top = Math.max(0, getVerticalScrollPosition(localScrollTarget));
      const left = getHorizontalScrollPosition(localScrollTarget);
      const delta = {
        top: top - scroll.position.top,
        left: left - scroll.position.left
      };
      if (props.axis === "vertical" && delta.top === 0 || props.axis === "horizontal" && delta.left === 0) {
        return;
      }
      const curDir = Math.abs(delta.top) >= Math.abs(delta.left) ? delta.top < 0 ? "up" : "down" : delta.left < 0 ? "left" : "right";
      scroll.position = { top, left };
      scroll.directionChanged = scroll.direction !== curDir;
      scroll.delta = delta;
      if (scroll.directionChanged === true) {
        scroll.direction = curDir;
        scroll.inflectionPoint = scroll.position;
      }
      emit("scroll", { ...scroll });
    }
    function configureScrollTarget() {
      localScrollTarget = getScrollTarget(parentEl, props.scrollTarget);
      localScrollTarget.addEventListener("scroll", trigger, passive);
      trigger(true);
    }
    function unconfigureScrollTarget() {
      if (localScrollTarget !== void 0) {
        localScrollTarget.removeEventListener("scroll", trigger, passive);
        localScrollTarget = void 0;
      }
    }
    function trigger(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (clearTimer === null) {
        const [timer, fn] = props.debounce ? [setTimeout(emitEvent, props.debounce), clearTimeout] : [requestAnimationFrame(emitEvent), cancelAnimationFrame];
        clearTimer = () => {
          fn(timer);
          clearTimer = null;
        };
      }
    }
    const { proxy } = getCurrentInstance();
    watch(() => proxy.$q.lang.rtl, emitEvent);
    onMounted(() => {
      parentEl = proxy.$el.parentNode;
      configureScrollTarget();
    });
    onBeforeUnmount(() => {
      clearTimer !== null && clearTimer();
      unconfigureScrollTarget();
    });
    Object.assign(proxy, {
      trigger,
      getPosition: () => scroll
    });
    return noop;
  }
});
var QLayout = createComponent({
  name: "QLayout",
  props: {
    container: Boolean,
    view: {
      type: String,
      default: "hhh lpr fff",
      validator: (v) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase())
    },
    onScroll: Function,
    onScrollHeight: Function,
    onResize: Function
  },
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const rootRef = ref(null);
    const height = ref($q.screen.height);
    const width = ref(props.container === true ? 0 : $q.screen.width);
    const scroll = ref({ position: 0, direction: "down", inflectionPoint: 0 });
    const containerHeight = ref(0);
    const scrollbarWidth = ref(isRuntimeSsrPreHydration.value === true ? 0 : getScrollbarWidth());
    const classes = computed(
      () => "q-layout q-layout--" + (props.container === true ? "containerized" : "standard")
    );
    const style = computed(() => props.container === false ? { minHeight: $q.screen.height + "px" } : null);
    const targetStyle = computed(() => scrollbarWidth.value !== 0 ? { [$q.lang.rtl === true ? "left" : "right"]: `${scrollbarWidth.value}px` } : null);
    const targetChildStyle = computed(() => scrollbarWidth.value !== 0 ? {
      [$q.lang.rtl === true ? "right" : "left"]: 0,
      [$q.lang.rtl === true ? "left" : "right"]: `-${scrollbarWidth.value}px`,
      width: `calc(100% + ${scrollbarWidth.value}px)`
    } : null);
    function onPageScroll(data) {
      if (props.container === true || document.qScrollPrevented !== true) {
        const info = {
          position: data.position.top,
          direction: data.direction,
          directionChanged: data.directionChanged,
          inflectionPoint: data.inflectionPoint.top,
          delta: data.delta.top
        };
        scroll.value = info;
        props.onScroll !== void 0 && emit("scroll", info);
      }
    }
    function onPageResize(data) {
      const { height: newHeight, width: newWidth } = data;
      let resized = false;
      if (height.value !== newHeight) {
        resized = true;
        height.value = newHeight;
        props.onScrollHeight !== void 0 && emit("scrollHeight", newHeight);
        updateScrollbarWidth();
      }
      if (width.value !== newWidth) {
        resized = true;
        width.value = newWidth;
      }
      if (resized === true && props.onResize !== void 0) {
        emit("resize", data);
      }
    }
    function onContainerResize({ height: height2 }) {
      if (containerHeight.value !== height2) {
        containerHeight.value = height2;
        updateScrollbarWidth();
      }
    }
    function updateScrollbarWidth() {
      if (props.container === true) {
        const width2 = height.value > containerHeight.value ? getScrollbarWidth() : 0;
        if (scrollbarWidth.value !== width2) {
          scrollbarWidth.value = width2;
        }
      }
    }
    let animateTimer = null;
    const $layout = {
      instances: {},
      view: computed(() => props.view),
      isContainer: computed(() => props.container),
      rootRef,
      height,
      containerHeight,
      scrollbarWidth,
      totalWidth: computed(() => width.value + scrollbarWidth.value),
      rows: computed(() => {
        const rows = props.view.toLowerCase().split(" ");
        return {
          top: rows[0].split(""),
          middle: rows[1].split(""),
          bottom: rows[2].split("")
        };
      }),
      header: reactive({ size: 0, offset: 0, space: false }),
      right: reactive({ size: 300, offset: 0, space: false }),
      footer: reactive({ size: 0, offset: 0, space: false }),
      left: reactive({ size: 300, offset: 0, space: false }),
      scroll,
      animate() {
        if (animateTimer !== null) {
          clearTimeout(animateTimer);
        } else {
          document.body.classList.add("q-body--layout-animate");
        }
        animateTimer = setTimeout(() => {
          animateTimer = null;
          document.body.classList.remove("q-body--layout-animate");
        }, 155);
      },
      update(part, prop, val) {
        $layout[part][prop] = val;
      }
    };
    provide(layoutKey, $layout);
    if (getScrollbarWidth() > 0) {
      let restoreScrollbar = function() {
        timer = null;
        el.classList.remove("hide-scrollbar");
      }, hideScrollbar = function() {
        if (timer === null) {
          if (el.scrollHeight > $q.screen.height) {
            return;
          }
          el.classList.add("hide-scrollbar");
        } else {
          clearTimeout(timer);
        }
        timer = setTimeout(restoreScrollbar, 300);
      }, updateScrollEvent = function(action) {
        if (timer !== null && action === "remove") {
          clearTimeout(timer);
          restoreScrollbar();
        }
        window[`${action}EventListener`]("resize", hideScrollbar);
      };
      let timer = null;
      const el = document.body;
      watch(
        () => props.container !== true ? "add" : "remove",
        updateScrollEvent
      );
      props.container !== true && updateScrollEvent("add");
      onUnmounted(() => {
        updateScrollEvent("remove");
      });
    }
    return () => {
      const content = hMergeSlot(slots.default, [
        h(QScrollObserver, { onScroll: onPageScroll }),
        h(QResizeObserver, { onResize: onPageResize })
      ]);
      const layout = h("div", {
        class: classes.value,
        style: style.value,
        ref: props.container === true ? void 0 : rootRef,
        tabindex: -1
      }, content);
      if (props.container === true) {
        return h("div", {
          class: "q-layout-container overflow-hidden",
          ref: rootRef
        }, [
          h(QResizeObserver, { onResize: onContainerResize }),
          h("div", {
            class: "absolute-full",
            style: targetStyle.value
          }, [
            h("div", {
              class: "scroll",
              style: targetChildStyle.value
            }, [layout])
          ])
        ]);
      }
      return layout;
    };
  }
});
const _sfc_main$1 = defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: "#"
    },
    route: {
      default: null
    },
    icon: {
      type: String,
      default: ""
    }
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QItem, {
    clickable: "",
    tag: "a",
    to: _ctx.route
  }, {
    default: withCtx(() => [
      _ctx.icon ? (openBlock(), createBlock(QItemSection, {
        key: 0,
        avatar: ""
      }, {
        default: withCtx(() => [
          createVNode(QIcon, { name: _ctx.icon }, null, 8, ["name"])
        ]),
        _: 1
      })) : createCommentVNode("", true),
      createVNode(QItemSection, null, {
        default: withCtx(() => [
          createVNode(QItemLabel, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ]),
            _: 1
          }),
          createVNode(QItemLabel, { caption: "" }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.caption), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["to"]);
}
var EssentialLink = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "EssentialLink.vue"]]);
function useConfig() {
  const config = Config.get();
  const version = ref(config.version);
  const domain = ref(config.domain);
  const path = ref(config.path);
  return {
    version,
    domain,
    path
  };
}
const linksList = [
  {
    title: "Dashboard",
    caption: "Job dashboard.",
    icon: "school",
    route: { name: "dashboard" }
  },
  {
    title: "Jobs",
    caption: "All tracked jobs.",
    icon: "school",
    route: { name: "jobs.index" }
  }
];
const _sfc_main = defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink
  },
  setup() {
    const leftDrawerOpen = ref(false);
    return {
      version: useConfig().version,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
});
const _hoisted_1 = {
  href: "https://github.com/tobytwigger/laravel-job-status",
  style: { "color": "white", "text-decoration": "none" }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_EssentialLink = resolveComponent("EssentialLink");
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(QLayout, { view: "hHh lpR fFf" }, {
    default: withCtx(() => [
      createVNode(QHeader, { elevated: "" }, {
        default: withCtx(() => [
          createVNode(QToolbar, null, {
            default: withCtx(() => [
              createVNode(QBtn, {
                flat: "",
                dense: "",
                round: "",
                icon: "menu",
                "aria-label": "Menu",
                onClick: _ctx.toggleLeftDrawer
              }, null, 8, ["onClick"]),
              createVNode(QToolbarTitle, null, {
                default: withCtx(() => [
                  createTextVNode(" Job Tracker ")
                ]),
                _: 1
              }),
              createBaseVNode("div", null, [
                createBaseVNode("a", _hoisted_1, " Version " + toDisplayString(_ctx.version), 1)
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }),
      createVNode(QDrawer, {
        modelValue: _ctx.leftDrawerOpen,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.leftDrawerOpen = $event),
        "show-if-above": "",
        bordered: ""
      }, {
        default: withCtx(() => [
          createVNode(QList, null, {
            default: withCtx(() => [
              createVNode(QItemLabel, { header: "" }, {
                default: withCtx(() => [
                  createTextVNode(" Essential Links ")
                ]),
                _: 1
              }),
              (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.essentialLinks, (link) => {
                return openBlock(), createBlock(_component_EssentialLink, mergeProps({
                  key: link.title
                }, link), null, 16);
              }), 128))
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]),
      createVNode(QPageContainer, null, {
        default: withCtx(() => [
          createVNode(_component_router_view)
        ]),
        _: 1
      })
    ]),
    _: 1
  });
}
var MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "MainLayout.vue"]]);
export { MainLayout as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFpbkxheW91dC5jZWMzYzI5Mi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdG9vbGJhci9RVG9vbGJhclRpdGxlLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvdG9vbGJhci9RVG9vbGJhci5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2hlYWRlci9RSGVhZGVyLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWhpc3RvcnkuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtbW9kZWwtdG9nZ2xlLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3Njcm9sbC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcmV2ZW50LXNjcm9sbC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wcmV2ZW50LXNjcm9sbC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9kaXJlY3RpdmVzL1RvdWNoUGFuLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvZHJhd2VyL1FEcmF3ZXIuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlL1FQYWdlQ29udGFpbmVyLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvc2Nyb2xsLW9ic2VydmVyL1FTY3JvbGxPYnNlcnZlci5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2xheW91dC9RTGF5b3V0LmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9jb21wb25lbnRzL0Vzc2VudGlhbExpbmsudnVlIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9jb21wb3N0YWJsZXMvY29uZmlndXJhdGlvbi50cyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9zcmMvbGF5b3V0cy9NYWluTGF5b3V0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRvb2xiYXJUaXRsZScsXG5cbiAgcHJvcHM6IHtcbiAgICBzaHJpbms6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdG9vbGJhcl9fdGl0bGUgZWxsaXBzaXMnXG4gICAgICArIChwcm9wcy5zaHJpbmsgPT09IHRydWUgPyAnIGNvbC1zaHJpbmsnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVRvb2xiYXInLFxuXG4gIHByb3BzOiB7XG4gICAgaW5zZXQ6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtdG9vbGJhciByb3cgbm8td3JhcCBpdGVtcy1jZW50ZXInXG4gICAgICArIChwcm9wcy5pbnNldCA9PT0gdHJ1ZSA/ICcgcS10b29sYmFyLS1pbnNldCcgOiAnJylcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4gaCgnZGl2JywgeyBjbGFzczogY2xhc3Nlcy52YWx1ZSwgcm9sZTogJ3Rvb2xiYXInIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgcmVmLCBjb21wdXRlZCwgd2F0Y2gsIG9uQmVmb3JlVW5tb3VudCwgaW5qZWN0LCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRUmVzaXplT2JzZXJ2ZXIgZnJvbSAnLi4vcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoVW5pcXVlU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgbGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUhlYWRlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBtb2RlbFZhbHVlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH0sXG4gICAgcmV2ZWFsOiBCb29sZWFuLFxuICAgIHJldmVhbE9mZnNldDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMjUwXG4gICAgfSxcbiAgICBib3JkZXJlZDogQm9vbGVhbixcbiAgICBlbGV2YXRlZDogQm9vbGVhbixcblxuICAgIGhlaWdodEhpbnQ6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDUwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdyZXZlYWwnLCAnZm9jdXNpbicgXSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0ICRsYXlvdXQgPSBpbmplY3QobGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkbGF5b3V0ID09PSBlbXB0eVJlbmRlckZuKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdRSGVhZGVyIG5lZWRzIHRvIGJlIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCBzaXplID0gcmVmKHBhcnNlSW50KHByb3BzLmhlaWdodEhpbnQsIDEwKSlcbiAgICBjb25zdCByZXZlYWxlZCA9IHJlZih0cnVlKVxuXG4gICAgY29uc3QgZml4ZWQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMucmV2ZWFsID09PSB0cnVlXG4gICAgICB8fCAkbGF5b3V0LnZpZXcudmFsdWUuaW5kZXhPZignSCcpID4gLTFcbiAgICAgIHx8ICgkcS5wbGF0Zm9ybS5pcy5pb3MgJiYgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZSlcbiAgICApXG5cbiAgICBjb25zdCBvZmZzZXQgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gMFxuICAgICAgfVxuICAgICAgaWYgKGZpeGVkLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiByZXZlYWxlZC52YWx1ZSA9PT0gdHJ1ZSA/IHNpemUudmFsdWUgOiAwXG4gICAgICB9XG4gICAgICBjb25zdCBvZmZzZXQgPSBzaXplLnZhbHVlIC0gJGxheW91dC5zY3JvbGwudmFsdWUucG9zaXRpb25cbiAgICAgIHJldHVybiBvZmZzZXQgPiAwID8gb2Zmc2V0IDogMFxuICAgIH0pXG5cbiAgICBjb25zdCBoaWRkZW4gPSBjb21wdXRlZCgoKSA9PiBwcm9wcy5tb2RlbFZhbHVlICE9PSB0cnVlXG4gICAgICB8fCAoZml4ZWQudmFsdWUgPT09IHRydWUgJiYgcmV2ZWFsZWQudmFsdWUgIT09IHRydWUpXG4gICAgKVxuXG4gICAgY29uc3QgcmV2ZWFsT25Gb2N1cyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIGhpZGRlbi52YWx1ZSA9PT0gdHJ1ZSAmJiBwcm9wcy5yZXZlYWwgPT09IHRydWVcbiAgICApXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWhlYWRlciBxLWxheW91dF9fc2VjdGlvbi0tbWFyZ2luYWwgJ1xuICAgICAgKyAoZml4ZWQudmFsdWUgPT09IHRydWUgPyAnZml4ZWQnIDogJ2Fic29sdXRlJykgKyAnLXRvcCdcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLWhlYWRlci0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChoaWRkZW4udmFsdWUgPT09IHRydWUgPyAnIHEtaGVhZGVyLS1oaWRkZW4nIDogJycpXG4gICAgICArIChwcm9wcy5tb2RlbFZhbHVlICE9PSB0cnVlID8gJyBxLWxheW91dC0tcHJldmVudC1mb2N1cycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0XG4gICAgICAgIHZpZXcgPSAkbGF5b3V0LnJvd3MudmFsdWUudG9wLFxuICAgICAgICBjc3MgPSB7fVxuXG4gICAgICBpZiAodmlld1sgMCBdID09PSAnbCcgJiYgJGxheW91dC5sZWZ0LnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzc1sgJHEubGFuZy5ydGwgPT09IHRydWUgPyAncmlnaHQnIDogJ2xlZnQnIF0gPSBgJHsgJGxheW91dC5sZWZ0LnNpemUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKHZpZXdbIDIgXSA9PT0gJ3InICYmICRsYXlvdXQucmlnaHQuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcgXSA9IGAkeyAkbGF5b3V0LnJpZ2h0LnNpemUgfXB4YFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3NzXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxheW91dCAocHJvcCwgdmFsKSB7XG4gICAgICAkbGF5b3V0LnVwZGF0ZSgnaGVhZGVyJywgcHJvcCwgdmFsKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsIChwcm9wLCB2YWwpIHtcbiAgICAgIGlmIChwcm9wLnZhbHVlICE9PSB2YWwpIHtcbiAgICAgICAgcHJvcC52YWx1ZSA9IHZhbFxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUmVzaXplICh7IGhlaWdodCB9KSB7XG4gICAgICB1cGRhdGVMb2NhbChzaXplLCBoZWlnaHQpXG4gICAgICB1cGRhdGVMYXlvdXQoJ3NpemUnLCBoZWlnaHQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Gb2N1c2luIChldnQpIHtcbiAgICAgIGlmIChyZXZlYWxPbkZvY3VzLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHVwZGF0ZUxvY2FsKHJldmVhbGVkLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBlbWl0KCdmb2N1c2luJywgZXZ0KVxuICAgIH1cblxuICAgIHdhdGNoKCgpID0+IHByb3BzLm1vZGVsVmFsdWUsIHZhbCA9PiB7XG4gICAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgdmFsKVxuICAgICAgdXBkYXRlTG9jYWwocmV2ZWFsZWQsIHRydWUpXG4gICAgICAkbGF5b3V0LmFuaW1hdGUoKVxuICAgIH0pXG5cbiAgICB3YXRjaChvZmZzZXQsIHZhbCA9PiB7XG4gICAgICB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIHZhbClcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMucmV2ZWFsLCB2YWwgPT4ge1xuICAgICAgdmFsID09PSBmYWxzZSAmJiB1cGRhdGVMb2NhbChyZXZlYWxlZCwgcHJvcHMubW9kZWxWYWx1ZSlcbiAgICB9KVxuXG4gICAgd2F0Y2gocmV2ZWFsZWQsIHZhbCA9PiB7XG4gICAgICAkbGF5b3V0LmFuaW1hdGUoKVxuICAgICAgZW1pdCgncmV2ZWFsJywgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaCgkbGF5b3V0LnNjcm9sbCwgc2Nyb2xsID0+IHtcbiAgICAgIHByb3BzLnJldmVhbCA9PT0gdHJ1ZSAmJiB1cGRhdGVMb2NhbChyZXZlYWxlZCxcbiAgICAgICAgc2Nyb2xsLmRpcmVjdGlvbiA9PT0gJ3VwJ1xuICAgICAgICB8fCBzY3JvbGwucG9zaXRpb24gPD0gcHJvcHMucmV2ZWFsT2Zmc2V0XG4gICAgICAgIHx8IHNjcm9sbC5wb3NpdGlvbiAtIHNjcm9sbC5pbmZsZWN0aW9uUG9pbnQgPCAxMDBcbiAgICAgIClcbiAgICB9KVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSB7fVxuXG4gICAgJGxheW91dC5pbnN0YW5jZXMuaGVhZGVyID0gaW5zdGFuY2VcbiAgICBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlICYmIHVwZGF0ZUxheW91dCgnc2l6ZScsIHNpemUudmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIHByb3BzLm1vZGVsVmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCBvZmZzZXQudmFsdWUpXG5cbiAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgaWYgKCRsYXlvdXQuaW5zdGFuY2VzLmhlYWRlciA9PT0gaW5zdGFuY2UpIHtcbiAgICAgICAgJGxheW91dC5pbnN0YW5jZXMuaGVhZGVyID0gdm9pZCAwXG4gICAgICAgIHVwZGF0ZUxheW91dCgnc2l6ZScsIDApXG4gICAgICAgIHVwZGF0ZUxheW91dCgnb2Zmc2V0JywgMClcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIGZhbHNlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBoVW5pcXVlU2xvdChzbG90cy5kZWZhdWx0LCBbXSlcblxuICAgICAgcHJvcHMuZWxldmF0ZWQgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1sYXlvdXRfX3NoYWRvdyBhYnNvbHV0ZS1mdWxsIG92ZXJmbG93LWhpZGRlbiBuby1wb2ludGVyLWV2ZW50cydcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHtcbiAgICAgICAgICBkZWJvdW5jZTogMCxcbiAgICAgICAgICBvblJlc2l6ZVxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnaGVhZGVyJywge1xuICAgICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgICBvbkZvY3VzaW5cbiAgICAgIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IG9uQmVmb3JlVW5tb3VudCB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IEhpc3RvcnkgZnJvbSAnLi4vLi4vaGlzdG9yeS5qcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHNob3dpbmcsIGhpZGUsIGhpZGVPblJvdXRlQ2hhbmdlKSB7XG4gIGxldCBoaXN0b3J5RW50cnlcblxuICBmdW5jdGlvbiByZW1vdmVGcm9tSGlzdG9yeSAoKSB7XG4gICAgaWYgKGhpc3RvcnlFbnRyeSAhPT0gdm9pZCAwKSB7XG4gICAgICBIaXN0b3J5LnJlbW92ZShoaXN0b3J5RW50cnkpXG4gICAgICBoaXN0b3J5RW50cnkgPSB2b2lkIDBcbiAgICB9XG4gIH1cblxuICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgcmVtb3ZlRnJvbUhpc3RvcnkoKVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgcmVtb3ZlRnJvbUhpc3RvcnksXG5cbiAgICBhZGRUb0hpc3RvcnkgKCkge1xuICAgICAgaGlzdG9yeUVudHJ5ID0ge1xuICAgICAgICBjb25kaXRpb246ICgpID0+IGhpZGVPblJvdXRlQ2hhbmdlLnZhbHVlID09PSB0cnVlLFxuICAgICAgICBoYW5kbGVyOiBoaWRlXG4gICAgICB9XG5cbiAgICAgIEhpc3RvcnkuYWRkKGhpc3RvcnlFbnRyeSlcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IHdhdGNoLCBuZXh0VGljaywgb25Nb3VudGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IHZtSGFzUm91dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bS5qcydcblxuZXhwb3J0IGNvbnN0IHVzZU1vZGVsVG9nZ2xlUHJvcHMgPSB7XG4gIG1vZGVsVmFsdWU6IHtcbiAgICB0eXBlOiBCb29sZWFuLFxuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcblxuICAnb25VcGRhdGU6bW9kZWxWYWx1ZSc6IFsgRnVuY3Rpb24sIEFycmF5IF1cbn1cblxuZXhwb3J0IGNvbnN0IHVzZU1vZGVsVG9nZ2xlRW1pdHMgPSBbXG4gICdiZWZvcmVTaG93JywgJ3Nob3cnLCAnYmVmb3JlSGlkZScsICdoaWRlJ1xuXVxuXG4vLyBoYW5kbGVTaG93L2hhbmRsZUhpZGUgLT4gcmVtb3ZlVGljaygpLCBzZWxmICgmIGVtaXQgc2hvdylcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHtcbiAgc2hvd2luZyxcbiAgY2FuU2hvdywgLy8gb3B0aW9uYWxcbiAgaGlkZU9uUm91dGVDaGFuZ2UsIC8vIG9wdGlvbmFsXG4gIGhhbmRsZVNob3csIC8vIG9wdGlvbmFsXG4gIGhhbmRsZUhpZGUsIC8vIG9wdGlvbmFsXG4gIHByb2Nlc3NPbk1vdW50IC8vIG9wdGlvbmFsXG59KSB7XG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgY29uc3QgeyBwcm9wcywgZW1pdCwgcHJveHkgfSA9IHZtXG5cbiAgbGV0IHBheWxvYWRcblxuICBmdW5jdGlvbiB0b2dnbGUgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICBoaWRlKGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzaG93KGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzaG93IChldnQpIHtcbiAgICBpZiAoXG4gICAgICBwcm9wcy5kaXNhYmxlID09PSB0cnVlXG4gICAgICB8fCAoZXZ0ICE9PSB2b2lkIDAgJiYgZXZ0LnFBbmNob3JIYW5kbGVkID09PSB0cnVlKVxuICAgICAgfHwgKGNhblNob3cgIT09IHZvaWQgMCAmJiBjYW5TaG93KGV2dCkgIT09IHRydWUpXG4gICAgKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBsaXN0ZW5lciA9IHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwXG5cbiAgICBpZiAobGlzdGVuZXIgPT09IHRydWUgJiYgX19RVUFTQVJfU1NSX1NFUlZFUl9fICE9PSB0cnVlKSB7XG4gICAgICBlbWl0KCd1cGRhdGU6bW9kZWxWYWx1ZScsIHRydWUpXG4gICAgICBwYXlsb2FkID0gZXZ0XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGlmIChwYXlsb2FkID09PSBldnQpIHtcbiAgICAgICAgICBwYXlsb2FkID0gdm9pZCAwXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYgKHByb3BzLm1vZGVsVmFsdWUgPT09IG51bGwgfHwgbGlzdGVuZXIgPT09IGZhbHNlIHx8IF9fUVVBU0FSX1NTUl9TRVJWRVJfXykge1xuICAgICAgcHJvY2Vzc1Nob3coZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NTaG93IChldnQpIHtcbiAgICBpZiAoc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2hvd2luZy52YWx1ZSA9IHRydWVcblxuICAgIGVtaXQoJ2JlZm9yZVNob3cnLCBldnQpXG5cbiAgICBpZiAoaGFuZGxlU2hvdyAhPT0gdm9pZCAwKSB7XG4gICAgICBoYW5kbGVTaG93KGV2dClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBlbWl0KCdzaG93JywgZXZ0KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhpZGUgKGV2dCkge1xuICAgIGlmIChfX1FVQVNBUl9TU1JfU0VSVkVSX18gfHwgcHJvcHMuZGlzYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgbGlzdGVuZXIgPSBwcm9wc1sgJ29uVXBkYXRlOm1vZGVsVmFsdWUnIF0gIT09IHZvaWQgMFxuXG4gICAgaWYgKGxpc3RlbmVyID09PSB0cnVlICYmIF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSkge1xuICAgICAgZW1pdCgndXBkYXRlOm1vZGVsVmFsdWUnLCBmYWxzZSlcbiAgICAgIHBheWxvYWQgPSBldnRcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKHBheWxvYWQgPT09IGV2dCkge1xuICAgICAgICAgIHBheWxvYWQgPSB2b2lkIDBcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gbnVsbCB8fCBsaXN0ZW5lciA9PT0gZmFsc2UgfHwgX19RVUFTQVJfU1NSX1NFUlZFUl9fKSB7XG4gICAgICBwcm9jZXNzSGlkZShldnQpXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc0hpZGUgKGV2dCkge1xuICAgIGlmIChzaG93aW5nLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2hvd2luZy52YWx1ZSA9IGZhbHNlXG5cbiAgICBlbWl0KCdiZWZvcmVIaWRlJywgZXZ0KVxuXG4gICAgaWYgKGhhbmRsZUhpZGUgIT09IHZvaWQgMCkge1xuICAgICAgaGFuZGxlSGlkZShldnQpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZW1pdCgnaGlkZScsIGV2dClcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzTW9kZWxDaGFuZ2UgKHZhbCkge1xuICAgIGlmIChwcm9wcy5kaXNhYmxlID09PSB0cnVlICYmIHZhbCA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb3BzWyAnb25VcGRhdGU6bW9kZWxWYWx1ZScgXSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgZmFsc2UpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKCh2YWwgPT09IHRydWUpICE9PSBzaG93aW5nLnZhbHVlKSB7XG4gICAgICBjb25zdCBmbiA9IHZhbCA9PT0gdHJ1ZSA/IHByb2Nlc3NTaG93IDogcHJvY2Vzc0hpZGVcbiAgICAgIGZuKHBheWxvYWQpXG4gICAgfVxuICB9XG5cbiAgd2F0Y2goKCkgPT4gcHJvcHMubW9kZWxWYWx1ZSwgcHJvY2Vzc01vZGVsQ2hhbmdlKVxuXG4gIGlmIChoaWRlT25Sb3V0ZUNoYW5nZSAhPT0gdm9pZCAwICYmIHZtSGFzUm91dGVyKHZtKSA9PT0gdHJ1ZSkge1xuICAgIHdhdGNoKCgpID0+IHByb3h5LiRyb3V0ZS5mdWxsUGF0aCwgKCkgPT4ge1xuICAgICAgaWYgKGhpZGVPblJvdXRlQ2hhbmdlLnZhbHVlID09PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgaGlkZSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByb2Nlc3NPbk1vdW50ID09PSB0cnVlICYmIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgcHJvY2Vzc01vZGVsQ2hhbmdlKHByb3BzLm1vZGVsVmFsdWUpXG4gIH0pXG5cbiAgLy8gZXhwb3NlIHB1YmxpYyBtZXRob2RzXG4gIGNvbnN0IHB1YmxpY01ldGhvZHMgPSB7IHNob3csIGhpZGUsIHRvZ2dsZSB9XG4gIE9iamVjdC5hc3NpZ24ocHJveHksIHB1YmxpY01ldGhvZHMpXG5cbiAgcmV0dXJuIHB1YmxpY01ldGhvZHNcbn1cbiIsImltcG9ydCB7IGNzcywgZ2V0RWxlbWVudCB9IGZyb20gJy4vZG9tLmpzJ1xuXG5jb25zdCBzY3JvbGxUYXJnZXRzID0gX19RVUFTQVJfU1NSX1NFUlZFUl9fXG4gID8gW11cbiAgOiBbIG51bGwsIGRvY3VtZW50LCBkb2N1bWVudC5ib2R5LCBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgXVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsVGFyZ2V0IChlbCwgdGFyZ2V0RWwpIHtcbiAgbGV0IHRhcmdldCA9IGdldEVsZW1lbnQodGFyZ2V0RWwpXG5cbiAgaWYgKHRhcmdldCA9PT0gdm9pZCAwKSB7XG4gICAgaWYgKGVsID09PSB2b2lkIDAgfHwgZWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB3aW5kb3dcbiAgICB9XG5cbiAgICB0YXJnZXQgPSBlbC5jbG9zZXN0KCcuc2Nyb2xsLC5zY3JvbGwteSwub3ZlcmZsb3ctYXV0bycpXG4gIH1cblxuICByZXR1cm4gc2Nyb2xsVGFyZ2V0cy5pbmNsdWRlcyh0YXJnZXQpXG4gICAgPyB3aW5kb3dcbiAgICA6IHRhcmdldFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsSGVpZ2h0IChlbCkge1xuICByZXR1cm4gKGVsID09PSB3aW5kb3cgPyBkb2N1bWVudC5ib2R5IDogZWwpLnNjcm9sbEhlaWdodFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsV2lkdGggKGVsKSB7XG4gIHJldHVybiAoZWwgPT09IHdpbmRvdyA/IGRvY3VtZW50LmJvZHkgOiBlbCkuc2Nyb2xsV2lkdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24gKHNjcm9sbFRhcmdldCkge1xuICByZXR1cm4gc2Nyb2xsVGFyZ2V0ID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5wYWdlWU9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwXG4gICAgOiBzY3JvbGxUYXJnZXQuc2Nyb2xsVG9wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24gKHNjcm9sbFRhcmdldCkge1xuICByZXR1cm4gc2Nyb2xsVGFyZ2V0ID09PSB3aW5kb3dcbiAgICA/IHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMFxuICAgIDogc2Nyb2xsVGFyZ2V0LnNjcm9sbExlZnRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFuaW1WZXJ0aWNhbFNjcm9sbFRvIChlbCwgdG8sIGR1cmF0aW9uID0gMCAvKiAsIHByZXZUaW1lICovKSB7XG4gIGNvbnN0IHByZXZUaW1lID0gYXJndW1lbnRzWyAzIF0gPT09IHZvaWQgMCA/IHBlcmZvcm1hbmNlLm5vdygpIDogYXJndW1lbnRzWyAzIF1cbiAgY29uc3QgcG9zID0gZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbihlbClcblxuICBpZiAoZHVyYXRpb24gPD0gMCkge1xuICAgIGlmIChwb3MgIT09IHRvKSB7XG4gICAgICBzZXRTY3JvbGwoZWwsIHRvKVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShub3dUaW1lID0+IHtcbiAgICBjb25zdCBmcmFtZVRpbWUgPSBub3dUaW1lIC0gcHJldlRpbWVcbiAgICBjb25zdCBuZXdQb3MgPSBwb3MgKyAodG8gLSBwb3MpIC8gTWF0aC5tYXgoZnJhbWVUaW1lLCBkdXJhdGlvbikgKiBmcmFtZVRpbWVcbiAgICBzZXRTY3JvbGwoZWwsIG5ld1BvcylcbiAgICBpZiAobmV3UG9zICE9PSB0bykge1xuICAgICAgYW5pbVZlcnRpY2FsU2Nyb2xsVG8oZWwsIHRvLCBkdXJhdGlvbiAtIGZyYW1lVGltZSwgbm93VGltZSlcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbmltSG9yaXpvbnRhbFNjcm9sbFRvIChlbCwgdG8sIGR1cmF0aW9uID0gMCAvKiAsIHByZXZUaW1lICovKSB7XG4gIGNvbnN0IHByZXZUaW1lID0gYXJndW1lbnRzWyAzIF0gPT09IHZvaWQgMCA/IHBlcmZvcm1hbmNlLm5vdygpIDogYXJndW1lbnRzWyAzIF1cbiAgY29uc3QgcG9zID0gZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uKGVsKVxuXG4gIGlmIChkdXJhdGlvbiA8PSAwKSB7XG4gICAgaWYgKHBvcyAhPT0gdG8pIHtcbiAgICAgIHNldEhvcml6b250YWxTY3JvbGwoZWwsIHRvKVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShub3dUaW1lID0+IHtcbiAgICBjb25zdCBmcmFtZVRpbWUgPSBub3dUaW1lIC0gcHJldlRpbWVcbiAgICBjb25zdCBuZXdQb3MgPSBwb3MgKyAodG8gLSBwb3MpIC8gTWF0aC5tYXgoZnJhbWVUaW1lLCBkdXJhdGlvbikgKiBmcmFtZVRpbWVcbiAgICBzZXRIb3Jpem9udGFsU2Nyb2xsKGVsLCBuZXdQb3MpXG4gICAgaWYgKG5ld1BvcyAhPT0gdG8pIHtcbiAgICAgIGFuaW1Ib3Jpem9udGFsU2Nyb2xsVG8oZWwsIHRvLCBkdXJhdGlvbiAtIGZyYW1lVGltZSwgbm93VGltZSlcbiAgICB9XG4gIH0pXG59XG5cbmZ1bmN0aW9uIHNldFNjcm9sbCAoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQpIHtcbiAgaWYgKHNjcm9sbFRhcmdldCA9PT0gd2luZG93KSB7XG4gICAgd2luZG93LnNjcm9sbFRvKHdpbmRvdy5wYWdlWE9mZnNldCB8fCB3aW5kb3cuc2Nyb2xsWCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMCwgb2Zmc2V0KVxuICAgIHJldHVyblxuICB9XG4gIHNjcm9sbFRhcmdldC5zY3JvbGxUb3AgPSBvZmZzZXRcbn1cblxuZnVuY3Rpb24gc2V0SG9yaXpvbnRhbFNjcm9sbCAoc2Nyb2xsVGFyZ2V0LCBvZmZzZXQpIHtcbiAgaWYgKHNjcm9sbFRhcmdldCA9PT0gd2luZG93KSB7XG4gICAgd2luZG93LnNjcm9sbFRvKG9mZnNldCwgd2luZG93LnBhZ2VZT2Zmc2V0IHx8IHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wIHx8IDApXG4gICAgcmV0dXJuXG4gIH1cbiAgc2Nyb2xsVGFyZ2V0LnNjcm9sbExlZnQgPSBvZmZzZXRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24gKHNjcm9sbFRhcmdldCwgb2Zmc2V0LCBkdXJhdGlvbikge1xuICBpZiAoZHVyYXRpb24pIHtcbiAgICBhbmltVmVydGljYWxTY3JvbGxUbyhzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pXG4gICAgcmV0dXJuXG4gIH1cbiAgc2V0U2Nyb2xsKHNjcm9sbFRhcmdldCwgb2Zmc2V0KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIChzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pIHtcbiAgaWYgKGR1cmF0aW9uKSB7XG4gICAgYW5pbUhvcml6b250YWxTY3JvbGxUbyhzY3JvbGxUYXJnZXQsIG9mZnNldCwgZHVyYXRpb24pXG4gICAgcmV0dXJuXG4gIH1cbiAgc2V0SG9yaXpvbnRhbFNjcm9sbChzY3JvbGxUYXJnZXQsIG9mZnNldClcbn1cblxubGV0IHNpemVcbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxiYXJXaWR0aCAoKSB7XG4gIGlmIChzaXplICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gc2l6ZVxuICB9XG5cbiAgY29uc3RcbiAgICBpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKSxcbiAgICBvdXRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgY3NzKGlubmVyLCB7XG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICcyMDBweCdcbiAgfSlcbiAgY3NzKG91dGVyLCB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnMHB4JyxcbiAgICBsZWZ0OiAnMHB4JyxcbiAgICB2aXNpYmlsaXR5OiAnaGlkZGVuJyxcbiAgICB3aWR0aDogJzIwMHB4JyxcbiAgICBoZWlnaHQ6ICcxNTBweCcsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nXG4gIH0pXG5cbiAgb3V0ZXIuYXBwZW5kQ2hpbGQoaW5uZXIpXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdXRlcilcblxuICBjb25zdCB3MSA9IGlubmVyLm9mZnNldFdpZHRoXG4gIG91dGVyLnN0eWxlLm92ZXJmbG93ID0gJ3Njcm9sbCdcbiAgbGV0IHcyID0gaW5uZXIub2Zmc2V0V2lkdGhcblxuICBpZiAodzEgPT09IHcyKSB7XG4gICAgdzIgPSBvdXRlci5jbGllbnRXaWR0aFxuICB9XG5cbiAgb3V0ZXIucmVtb3ZlKClcbiAgc2l6ZSA9IHcxIC0gdzJcblxuICByZXR1cm4gc2l6ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzU2Nyb2xsYmFyIChlbCwgb25ZID0gdHJ1ZSkge1xuICBpZiAoIWVsIHx8IGVsLm5vZGVUeXBlICE9PSBOb2RlLkVMRU1FTlRfTk9ERSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIG9uWVxuICAgID8gKFxuICAgICAgICBlbC5zY3JvbGxIZWlnaHQgPiBlbC5jbGllbnRIZWlnaHQgJiYgKFxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5jb250YWlucygnc2Nyb2xsJylcbiAgICAgICAgICB8fCBlbC5jbGFzc0xpc3QuY29udGFpbnMoJ292ZXJmbG93LWF1dG8nKVxuICAgICAgICAgIHx8IFsgJ2F1dG8nLCAnc2Nyb2xsJyBdLmluY2x1ZGVzKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKVsgJ292ZXJmbG93LXknIF0pXG4gICAgICAgIClcbiAgICAgIClcbiAgICA6IChcbiAgICAgICAgZWwuc2Nyb2xsV2lkdGggPiBlbC5jbGllbnRXaWR0aCAmJiAoXG4gICAgICAgICAgZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzY3JvbGwnKVxuICAgICAgICAgIHx8IGVsLmNsYXNzTGlzdC5jb250YWlucygnb3ZlcmZsb3ctYXV0bycpXG4gICAgICAgICAgfHwgWyAnYXV0bycsICdzY3JvbGwnIF0uaW5jbHVkZXMod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpWyAnb3ZlcmZsb3cteCcgXSlcbiAgICAgICAgKVxuICAgICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldFNjcm9sbFRhcmdldCxcblxuICBnZXRTY3JvbGxIZWlnaHQsXG4gIGdldFNjcm9sbFdpZHRoLFxuXG4gIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24sXG4gIGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbixcblxuICBhbmltVmVydGljYWxTY3JvbGxUbyxcbiAgYW5pbUhvcml6b250YWxTY3JvbGxUbyxcblxuICBzZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLFxuICBzZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24sXG5cbiAgZ2V0U2Nyb2xsYmFyV2lkdGgsXG4gIGhhc1Njcm9sbGJhclxufVxuIiwiaW1wb3J0IHsgZ2V0RXZlbnRQYXRoLCBsaXN0ZW5PcHRzLCBzdG9wQW5kUHJldmVudCB9IGZyb20gJy4uL3V0aWxzL2V2ZW50LmpzJ1xuaW1wb3J0IHsgaGFzU2Nyb2xsYmFyLCBnZXRWZXJ0aWNhbFNjcm9sbFBvc2l0aW9uLCBnZXRIb3Jpem9udGFsU2Nyb2xsUG9zaXRpb24gfSBmcm9tICcuLi91dGlscy9zY3JvbGwuanMnXG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5sZXRcbiAgcmVnaXN0ZXJlZCA9IDAsXG4gIHNjcm9sbFBvc2l0aW9uWCxcbiAgc2Nyb2xsUG9zaXRpb25ZLFxuICBtYXhTY3JvbGxUb3AsXG4gIHZwUGVuZGluZ1VwZGF0ZSA9IGZhbHNlLFxuICBib2R5TGVmdCxcbiAgYm9keVRvcCxcbiAgaHJlZixcbiAgY2xvc2VUaW1lciA9IG51bGxcblxuZnVuY3Rpb24gb25XaGVlbCAoZSkge1xuICBpZiAoc2hvdWxkUHJldmVudFNjcm9sbChlKSkge1xuICAgIHN0b3BBbmRQcmV2ZW50KGUpXG4gIH1cbn1cblxuZnVuY3Rpb24gc2hvdWxkUHJldmVudFNjcm9sbCAoZSkge1xuICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50LmJvZHkgfHwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdxLWxheW91dF9fYmFja2Ryb3AnKSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBjb25zdFxuICAgIHBhdGggPSBnZXRFdmVudFBhdGgoZSksXG4gICAgc2hpZnQgPSBlLnNoaWZ0S2V5ICYmICFlLmRlbHRhWCxcbiAgICBzY3JvbGxZID0gIXNoaWZ0ICYmIE1hdGguYWJzKGUuZGVsdGFYKSA8PSBNYXRoLmFicyhlLmRlbHRhWSksXG4gICAgZGVsdGEgPSBzaGlmdCB8fCBzY3JvbGxZID8gZS5kZWx0YVkgOiBlLmRlbHRhWFxuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBwYXRoLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGVsID0gcGF0aFsgaW5kZXggXVxuXG4gICAgaWYgKGhhc1Njcm9sbGJhcihlbCwgc2Nyb2xsWSkpIHtcbiAgICAgIHJldHVybiBzY3JvbGxZXG4gICAgICAgID8gKFxuICAgICAgICAgICAgZGVsdGEgPCAwICYmIGVsLnNjcm9sbFRvcCA9PT0gMFxuICAgICAgICAgICAgICA/IHRydWVcbiAgICAgICAgICAgICAgOiBkZWx0YSA+IDAgJiYgZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50SGVpZ2h0ID09PSBlbC5zY3JvbGxIZWlnaHRcbiAgICAgICAgICApXG4gICAgICAgIDogKFxuICAgICAgICAgICAgZGVsdGEgPCAwICYmIGVsLnNjcm9sbExlZnQgPT09IDBcbiAgICAgICAgICAgICAgPyB0cnVlXG4gICAgICAgICAgICAgIDogZGVsdGEgPiAwICYmIGVsLnNjcm9sbExlZnQgKyBlbC5jbGllbnRXaWR0aCA9PT0gZWwuc2Nyb2xsV2lkdGhcbiAgICAgICAgICApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gb25BcHBsZVNjcm9sbCAoZSkge1xuICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50KSB7XG4gICAgLy8gcmVxdWlyZWQsIG90aGVyd2lzZSBpT1MgYmxvY2tzIGZ1cnRoZXIgc2Nyb2xsaW5nXG4gICAgLy8gdW50aWwgdGhlIG1vYmlsZSBzY3JvbGxiYXIgZGlzc2FwcGVhcnNcbiAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgfVxufVxuXG5mdW5jdGlvbiBvbkFwcGxlUmVzaXplIChldnQpIHtcbiAgaWYgKHZwUGVuZGluZ1VwZGF0ZSA9PT0gdHJ1ZSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdnBQZW5kaW5nVXBkYXRlID0gdHJ1ZVxuXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgdnBQZW5kaW5nVXBkYXRlID0gZmFsc2VcblxuICAgIGNvbnN0XG4gICAgICB7IGhlaWdodCB9ID0gZXZ0LnRhcmdldCxcbiAgICAgIHsgY2xpZW50SGVpZ2h0LCBzY3JvbGxUb3AgfSA9IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnRcblxuICAgIGlmIChtYXhTY3JvbGxUb3AgPT09IHZvaWQgMCB8fCBoZWlnaHQgIT09IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgbWF4U2Nyb2xsVG9wID0gY2xpZW50SGVpZ2h0IC0gaGVpZ2h0XG4gICAgICBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcFxuICAgIH1cblxuICAgIGlmIChzY3JvbGxUb3AgPiBtYXhTY3JvbGxUb3ApIHtcbiAgICAgIGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQuc2Nyb2xsVG9wIC09IE1hdGguY2VpbCgoc2Nyb2xsVG9wIC0gbWF4U2Nyb2xsVG9wKSAvIDgpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBhcHBseSAoYWN0aW9uKSB7XG4gIGNvbnN0XG4gICAgYm9keSA9IGRvY3VtZW50LmJvZHksXG4gICAgaGFzVmlld3BvcnQgPSB3aW5kb3cudmlzdWFsVmlld3BvcnQgIT09IHZvaWQgMFxuXG4gIGlmIChhY3Rpb24gPT09ICdhZGQnKSB7XG4gICAgY29uc3QgeyBvdmVyZmxvd1ksIG92ZXJmbG93WCB9ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoYm9keSlcblxuICAgIHNjcm9sbFBvc2l0aW9uWCA9IGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbih3aW5kb3cpXG4gICAgc2Nyb2xsUG9zaXRpb25ZID0gZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbih3aW5kb3cpXG4gICAgYm9keUxlZnQgPSBib2R5LnN0eWxlLmxlZnRcbiAgICBib2R5VG9wID0gYm9keS5zdHlsZS50b3BcblxuICAgIGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuXG4gICAgYm9keS5zdHlsZS5sZWZ0ID0gYC0keyBzY3JvbGxQb3NpdGlvblggfXB4YFxuICAgIGJvZHkuc3R5bGUudG9wID0gYC0keyBzY3JvbGxQb3NpdGlvblkgfXB4YFxuXG4gICAgaWYgKG92ZXJmbG93WCAhPT0gJ2hpZGRlbicgJiYgKG92ZXJmbG93WCA9PT0gJ3Njcm9sbCcgfHwgYm9keS5zY3JvbGxXaWR0aCA+IHdpbmRvdy5pbm5lcldpZHRoKSkge1xuICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWZvcmNlLXNjcm9sbGJhci14JylcbiAgICB9XG4gICAgaWYgKG92ZXJmbG93WSAhPT0gJ2hpZGRlbicgJiYgKG92ZXJmbG93WSA9PT0gJ3Njcm9sbCcgfHwgYm9keS5zY3JvbGxIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpKSB7XG4gICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ3EtYm9keS0tZm9yY2Utc2Nyb2xsYmFyLXknKVxuICAgIH1cblxuICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgncS1ib2R5LS1wcmV2ZW50LXNjcm9sbCcpXG4gICAgZG9jdW1lbnQucVNjcm9sbFByZXZlbnRlZCA9IHRydWVcblxuICAgIGlmIChjbGllbnQuaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICBpZiAoaGFzVmlld3BvcnQgPT09IHRydWUpIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgICAgIHdpbmRvdy52aXN1YWxWaWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvbkFwcGxlUmVzaXplLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgICB3aW5kb3cudmlzdWFsVmlld3BvcnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25BcHBsZVJlc2l6ZSwgbGlzdGVuT3B0cy5wYXNzaXZlQ2FwdHVyZSlcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uQXBwbGVTY3JvbGwsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGNsaWVudC5pcy5kZXNrdG9wID09PSB0cnVlICYmIGNsaWVudC5pcy5tYWMgPT09IHRydWUpIHtcbiAgICAvLyByZWYuIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL3dlYi91cGRhdGVzLzIwMTcvMDEvc2Nyb2xsaW5nLWludGVydmVudGlvblxuICAgIHdpbmRvd1sgYCR7IGFjdGlvbiB9RXZlbnRMaXN0ZW5lcmAgXSgnd2hlZWwnLCBvbldoZWVsLCBsaXN0ZW5PcHRzLm5vdFBhc3NpdmUpXG4gIH1cblxuICBpZiAoYWN0aW9uID09PSAncmVtb3ZlJykge1xuICAgIGlmIChjbGllbnQuaXMuaW9zID09PSB0cnVlKSB7XG4gICAgICBpZiAoaGFzVmlld3BvcnQgPT09IHRydWUpIHtcbiAgICAgICAgd2luZG93LnZpc3VhbFZpZXdwb3J0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIG9uQXBwbGVSZXNpemUsIGxpc3Rlbk9wdHMucGFzc2l2ZUNhcHR1cmUpXG4gICAgICAgIHdpbmRvdy52aXN1YWxWaWV3cG9ydC5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvbkFwcGxlUmVzaXplLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvbkFwcGxlU2Nyb2xsLCBsaXN0ZW5PcHRzLnBhc3NpdmVDYXB0dXJlKVxuICAgICAgfVxuICAgIH1cblxuICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncS1ib2R5LS1wcmV2ZW50LXNjcm9sbCcpXG4gICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdxLWJvZHktLWZvcmNlLXNjcm9sbGJhci14JylcbiAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tZm9yY2Utc2Nyb2xsYmFyLXknKVxuXG4gICAgZG9jdW1lbnQucVNjcm9sbFByZXZlbnRlZCA9IGZhbHNlXG5cbiAgICBib2R5LnN0eWxlLmxlZnQgPSBib2R5TGVmdFxuICAgIGJvZHkuc3R5bGUudG9wID0gYm9keVRvcFxuXG4gICAgLy8gc2Nyb2xsIGJhY2sgb25seSBpZiByb3V0ZSBoYXMgbm90IGNoYW5nZWRcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhyZWYgPT09IGhyZWYpIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyhzY3JvbGxQb3NpdGlvblgsIHNjcm9sbFBvc2l0aW9uWSlcbiAgICB9XG5cbiAgICBtYXhTY3JvbGxUb3AgPSB2b2lkIDBcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgbGV0IGFjdGlvbiA9ICdhZGQnXG5cbiAgaWYgKHN0YXRlID09PSB0cnVlKSB7XG4gICAgcmVnaXN0ZXJlZCsrXG5cbiAgICBpZiAoY2xvc2VUaW1lciAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KGNsb3NlVGltZXIpXG4gICAgICBjbG9zZVRpbWVyID0gbnVsbFxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHJlZ2lzdGVyZWQgPiAxKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKHJlZ2lzdGVyZWQgPT09IDApIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHJlZ2lzdGVyZWQtLVxuXG4gICAgaWYgKHJlZ2lzdGVyZWQgPiAwKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBhY3Rpb24gPSAncmVtb3ZlJ1xuXG4gICAgaWYgKGNsaWVudC5pcy5pb3MgPT09IHRydWUgJiYgY2xpZW50LmlzLm5hdGl2ZU1vYmlsZSA9PT0gdHJ1ZSkge1xuICAgICAgY2xvc2VUaW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQoY2xvc2VUaW1lcilcbiAgICAgIGNsb3NlVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgYXBwbHkoYWN0aW9uKVxuICAgICAgICBjbG9zZVRpbWVyID0gbnVsbFxuICAgICAgfSwgMTAwKVxuICAgICAgcmV0dXJuXG4gICAgfVxuICB9XG5cbiAgYXBwbHkoYWN0aW9uKVxufVxuIiwiaW1wb3J0IHByZXZlbnRTY3JvbGwgZnJvbSAnLi4vLi4vdXRpbHMvcHJldmVudC1zY3JvbGwuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgbGV0IGN1cnJlbnRTdGF0ZVxuXG4gIHJldHVybiB7XG4gICAgcHJldmVudEJvZHlTY3JvbGwgKHN0YXRlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHN0YXRlICE9PSBjdXJyZW50U3RhdGVcbiAgICAgICAgJiYgKGN1cnJlbnRTdGF0ZSAhPT0gdm9pZCAwIHx8IHN0YXRlID09PSB0cnVlKVxuICAgICAgKSB7XG4gICAgICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlXG4gICAgICAgIHByZXZlbnRTY3JvbGwoc3RhdGUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi9wbHVnaW5zL1BsYXRmb3JtLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVEaXJlY3RpdmUgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldE1vZGlmaWVyRGlyZWN0aW9ucywgc2hvdWxkU3RhcnQgfSBmcm9tICcuLi91dGlscy9wcml2YXRlL3RvdWNoLmpzJ1xuaW1wb3J0IHsgYWRkRXZ0LCBjbGVhbkV2dCwgcG9zaXRpb24sIGxlZnRDbGljaywgcHJldmVudCwgc3RvcCwgc3RvcEFuZFByZXZlbnQsIHByZXZlbnREcmFnZ2FibGUsIG5vb3AgfSBmcm9tICcuLi91dGlscy9ldmVudC5qcydcbmltcG9ydCB7IGNsZWFyU2VsZWN0aW9uIH0gZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9zZWxlY3Rpb24uanMnXG5pbXBvcnQgZ2V0U1NSUHJvcHMgZnJvbSAnLi4vdXRpbHMvcHJpdmF0ZS9ub29wLXNzci1kaXJlY3RpdmUtdHJhbnNmb3JtLmpzJ1xuXG5mdW5jdGlvbiBnZXRDaGFuZ2VzIChldnQsIGN0eCwgaXNGaW5hbCkge1xuICBjb25zdCBwb3MgPSBwb3NpdGlvbihldnQpXG4gIGxldFxuICAgIGRpcixcbiAgICBkaXN0WCA9IHBvcy5sZWZ0IC0gY3R4LmV2ZW50LngsXG4gICAgZGlzdFkgPSBwb3MudG9wIC0gY3R4LmV2ZW50LnksXG4gICAgYWJzWCA9IE1hdGguYWJzKGRpc3RYKSxcbiAgICBhYnNZID0gTWF0aC5hYnMoZGlzdFkpXG5cbiAgY29uc3QgZGlyZWN0aW9uID0gY3R4LmRpcmVjdGlvblxuXG4gIGlmIChkaXJlY3Rpb24uaG9yaXpvbnRhbCA9PT0gdHJ1ZSAmJiBkaXJlY3Rpb24udmVydGljYWwgIT09IHRydWUpIHtcbiAgICBkaXIgPSBkaXN0WCA8IDAgPyAnbGVmdCcgOiAncmlnaHQnXG4gIH1cbiAgZWxzZSBpZiAoZGlyZWN0aW9uLmhvcml6b250YWwgIT09IHRydWUgJiYgZGlyZWN0aW9uLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgZGlyID0gZGlzdFkgPCAwID8gJ3VwJyA6ICdkb3duJ1xuICB9XG4gIGVsc2UgaWYgKGRpcmVjdGlvbi51cCA9PT0gdHJ1ZSAmJiBkaXN0WSA8IDApIHtcbiAgICBkaXIgPSAndXAnXG4gICAgaWYgKGFic1ggPiBhYnNZKSB7XG4gICAgICBpZiAoZGlyZWN0aW9uLmxlZnQgPT09IHRydWUgJiYgZGlzdFggPCAwKSB7XG4gICAgICAgIGRpciA9ICdsZWZ0J1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uLnJpZ2h0ID09PSB0cnVlICYmIGRpc3RYID4gMCkge1xuICAgICAgICBkaXIgPSAncmlnaHQnXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGVsc2UgaWYgKGRpcmVjdGlvbi5kb3duID09PSB0cnVlICYmIGRpc3RZID4gMCkge1xuICAgIGRpciA9ICdkb3duJ1xuICAgIGlmIChhYnNYID4gYWJzWSkge1xuICAgICAgaWYgKGRpcmVjdGlvbi5sZWZ0ID09PSB0cnVlICYmIGRpc3RYIDwgMCkge1xuICAgICAgICBkaXIgPSAnbGVmdCdcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbi5yaWdodCA9PT0gdHJ1ZSAmJiBkaXN0WCA+IDApIHtcbiAgICAgICAgZGlyID0gJ3JpZ2h0J1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBlbHNlIGlmIChkaXJlY3Rpb24ubGVmdCA9PT0gdHJ1ZSAmJiBkaXN0WCA8IDApIHtcbiAgICBkaXIgPSAnbGVmdCdcbiAgICBpZiAoYWJzWCA8IGFic1kpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24udXAgPT09IHRydWUgJiYgZGlzdFkgPCAwKSB7XG4gICAgICAgIGRpciA9ICd1cCdcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbi5kb3duID09PSB0cnVlICYmIGRpc3RZID4gMCkge1xuICAgICAgICBkaXIgPSAnZG93bidcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoZGlyZWN0aW9uLnJpZ2h0ID09PSB0cnVlICYmIGRpc3RYID4gMCkge1xuICAgIGRpciA9ICdyaWdodCdcbiAgICBpZiAoYWJzWCA8IGFic1kpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24udXAgPT09IHRydWUgJiYgZGlzdFkgPCAwKSB7XG4gICAgICAgIGRpciA9ICd1cCdcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGRpcmVjdGlvbi5kb3duID09PSB0cnVlICYmIGRpc3RZID4gMCkge1xuICAgICAgICBkaXIgPSAnZG93bidcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBsZXQgc3ludGhldGljID0gZmFsc2VcblxuICBpZiAoZGlyID09PSB2b2lkIDAgJiYgaXNGaW5hbCA9PT0gZmFsc2UpIHtcbiAgICBpZiAoY3R4LmV2ZW50LmlzRmlyc3QgPT09IHRydWUgfHwgY3R4LmV2ZW50Lmxhc3REaXIgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIHt9XG4gICAgfVxuXG4gICAgZGlyID0gY3R4LmV2ZW50Lmxhc3REaXJcbiAgICBzeW50aGV0aWMgPSB0cnVlXG5cbiAgICBpZiAoZGlyID09PSAnbGVmdCcgfHwgZGlyID09PSAncmlnaHQnKSB7XG4gICAgICBwb3MubGVmdCAtPSBkaXN0WFxuICAgICAgYWJzWCA9IDBcbiAgICAgIGRpc3RYID0gMFxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHBvcy50b3AgLT0gZGlzdFlcbiAgICAgIGFic1kgPSAwXG4gICAgICBkaXN0WSA9IDBcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN5bnRoZXRpYyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBldnQsXG4gICAgICB0b3VjaDogY3R4LmV2ZW50Lm1vdXNlICE9PSB0cnVlLFxuICAgICAgbW91c2U6IGN0eC5ldmVudC5tb3VzZSA9PT0gdHJ1ZSxcbiAgICAgIHBvc2l0aW9uOiBwb3MsXG4gICAgICBkaXJlY3Rpb246IGRpcixcbiAgICAgIGlzRmlyc3Q6IGN0eC5ldmVudC5pc0ZpcnN0LFxuICAgICAgaXNGaW5hbDogaXNGaW5hbCA9PT0gdHJ1ZSxcbiAgICAgIGR1cmF0aW9uOiBEYXRlLm5vdygpIC0gY3R4LmV2ZW50LnRpbWUsXG4gICAgICBkaXN0YW5jZToge1xuICAgICAgICB4OiBhYnNYLFxuICAgICAgICB5OiBhYnNZXG4gICAgICB9LFxuICAgICAgb2Zmc2V0OiB7XG4gICAgICAgIHg6IGRpc3RYLFxuICAgICAgICB5OiBkaXN0WVxuICAgICAgfSxcbiAgICAgIGRlbHRhOiB7XG4gICAgICAgIHg6IHBvcy5sZWZ0IC0gY3R4LmV2ZW50Lmxhc3RYLFxuICAgICAgICB5OiBwb3MudG9wIC0gY3R4LmV2ZW50Lmxhc3RZXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmxldCB1aWQgPSAwXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZURpcmVjdGl2ZShfX1FVQVNBUl9TU1JfU0VSVkVSX19cbiAgPyB7IG5hbWU6ICd0b3VjaC1wYW4nLCBnZXRTU1JQcm9wcyB9XG4gIDoge1xuICAgICAgbmFtZTogJ3RvdWNoLXBhbicsXG5cbiAgICAgIGJlZm9yZU1vdW50IChlbCwgeyB2YWx1ZSwgbW9kaWZpZXJzIH0pIHtcbiAgICAgICAgLy8gZWFybHkgcmV0dXJuLCB3ZSBkb24ndCBuZWVkIHRvIGRvIGFueXRoaW5nXG4gICAgICAgIGlmIChtb2RpZmllcnMubW91c2UgIT09IHRydWUgJiYgY2xpZW50Lmhhcy50b3VjaCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlRXZlbnQgKGV2dCwgbW91c2VFdmVudCkge1xuICAgICAgICAgIGlmIChtb2RpZmllcnMubW91c2UgPT09IHRydWUgJiYgbW91c2VFdmVudCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc3RvcEFuZFByZXZlbnQoZXZ0KVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1vZGlmaWVycy5zdG9wID09PSB0cnVlICYmIHN0b3AoZXZ0KVxuICAgICAgICAgICAgbW9kaWZpZXJzLnByZXZlbnQgPT09IHRydWUgJiYgcHJldmVudChldnQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3R4ID0ge1xuICAgICAgICAgIHVpZDogJ3F2dHBfJyArICh1aWQrKyksXG4gICAgICAgICAgaGFuZGxlcjogdmFsdWUsXG4gICAgICAgICAgbW9kaWZpZXJzLFxuICAgICAgICAgIGRpcmVjdGlvbjogZ2V0TW9kaWZpZXJEaXJlY3Rpb25zKG1vZGlmaWVycyksXG5cbiAgICAgICAgICBub29wLFxuXG4gICAgICAgICAgbW91c2VTdGFydCAoZXZ0KSB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkU3RhcnQoZXZ0LCBjdHgpICYmIGxlZnRDbGljayhldnQpKSB7XG4gICAgICAgICAgICAgIGFkZEV2dChjdHgsICd0ZW1wJywgW1xuICAgICAgICAgICAgICAgIFsgZG9jdW1lbnQsICdtb3VzZW1vdmUnLCAnbW92ZScsICdub3RQYXNzaXZlQ2FwdHVyZScgXSxcbiAgICAgICAgICAgICAgICBbIGRvY3VtZW50LCAnbW91c2V1cCcsICdlbmQnLCAncGFzc2l2ZUNhcHR1cmUnIF1cbiAgICAgICAgICAgICAgXSlcblxuICAgICAgICAgICAgICBjdHguc3RhcnQoZXZ0LCB0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICB0b3VjaFN0YXJ0IChldnQpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRTdGFydChldnQsIGN0eCkpIHtcbiAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldFxuXG4gICAgICAgICAgICAgIGFkZEV2dChjdHgsICd0ZW1wJywgW1xuICAgICAgICAgICAgICAgIFsgdGFyZ2V0LCAndG91Y2htb3ZlJywgJ21vdmUnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0sXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGNhbmNlbCcsICdlbmQnLCAncGFzc2l2ZUNhcHR1cmUnIF0sXG4gICAgICAgICAgICAgICAgWyB0YXJnZXQsICd0b3VjaGVuZCcsICdlbmQnLCAncGFzc2l2ZUNhcHR1cmUnIF1cbiAgICAgICAgICAgICAgXSlcblxuICAgICAgICAgICAgICBjdHguc3RhcnQoZXZ0KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBzdGFydCAoZXZ0LCBtb3VzZUV2ZW50KSB7XG4gICAgICAgICAgICBjbGllbnQuaXMuZmlyZWZveCA9PT0gdHJ1ZSAmJiBwcmV2ZW50RHJhZ2dhYmxlKGVsLCB0cnVlKVxuICAgICAgICAgICAgY3R4Lmxhc3RFdnQgPSBldnRcblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICogU3RvcCBwcm9wYWdhdGlvbiBzbyBwb3NzaWJsZSB1cHBlciB2LXRvdWNoLXBhbiBkb24ndCBjYXRjaCB0aGlzIGFzIHdlbGw7XG4gICAgICAgICAgICAqIElmIHdlJ3JlIG5vdCB0aGUgdGFyZ2V0IChiYXNlZCBvbiBtb2RpZmllcnMpLCB3ZSdsbCByZS1lbWl0IHRoZSBldmVudCBsYXRlclxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGlmIChtb3VzZUV2ZW50ID09PSB0cnVlIHx8IG1vZGlmaWVycy5zdG9wID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICogYXJlIHdlIGRpcmVjdGx5IHN3aXRjaGluZyB0byBkZXRlY3RlZCBzdGF0ZT9cbiAgICAgICAgICAgICAgKiBjbG9uZSBldmVudCBvbmx5IG90aGVyd2lzZVxuICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgY3R4LmRpcmVjdGlvbi5hbGwgIT09IHRydWVcbiAgICAgICAgICAgICAgICAvLyBhY2NvdW50IGZvciBVTUQgdG9vIHdoZXJlIG1vZGlmaWVycyB3aWxsIGJlIGxvd2VyY2FzZWQgdG8gd29ya1xuICAgICAgICAgICAgICAgICYmIChtb3VzZUV2ZW50ICE9PSB0cnVlIHx8IChjdHgubW9kaWZpZXJzLm1vdXNlQWxsRGlyICE9PSB0cnVlICYmIGN0eC5tb2RpZmllcnMubW91c2VhbGxkaXIgIT09IHRydWUpKVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbG9uZSA9IGV2dC50eXBlLmluZGV4T2YoJ21vdXNlJykgPiAtMVxuICAgICAgICAgICAgICAgICAgPyBuZXcgTW91c2VFdmVudChldnQudHlwZSwgZXZ0KVxuICAgICAgICAgICAgICAgICAgOiBuZXcgVG91Y2hFdmVudChldnQudHlwZSwgZXZ0KVxuXG4gICAgICAgICAgICAgICAgZXZ0LmRlZmF1bHRQcmV2ZW50ZWQgPT09IHRydWUgJiYgcHJldmVudChjbG9uZSlcbiAgICAgICAgICAgICAgICBldnQuY2FuY2VsQnViYmxlID09PSB0cnVlICYmIHN0b3AoY2xvbmUpXG5cbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKGNsb25lLCB7XG4gICAgICAgICAgICAgICAgICBxS2V5RXZlbnQ6IGV2dC5xS2V5RXZlbnQsXG4gICAgICAgICAgICAgICAgICBxQ2xpY2tPdXRzaWRlOiBldnQucUNsaWNrT3V0c2lkZSxcbiAgICAgICAgICAgICAgICAgIHFBbmNob3JIYW5kbGVkOiBldnQucUFuY2hvckhhbmRsZWQsXG4gICAgICAgICAgICAgICAgICBxQ2xvbmVkQnk6IGV2dC5xQ2xvbmVkQnkgPT09IHZvaWQgMFxuICAgICAgICAgICAgICAgICAgICA/IFsgY3R4LnVpZCBdXG4gICAgICAgICAgICAgICAgICAgIDogZXZ0LnFDbG9uZWRCeS5jb25jYXQoY3R4LnVpZClcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgY3R4LmluaXRpYWxFdmVudCA9IHtcbiAgICAgICAgICAgICAgICAgIHRhcmdldDogZXZ0LnRhcmdldCxcbiAgICAgICAgICAgICAgICAgIGV2ZW50OiBjbG9uZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHN0b3AoZXZ0KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB7IGxlZnQsIHRvcCB9ID0gcG9zaXRpb24oZXZ0KVxuXG4gICAgICAgICAgICBjdHguZXZlbnQgPSB7XG4gICAgICAgICAgICAgIHg6IGxlZnQsXG4gICAgICAgICAgICAgIHk6IHRvcCxcbiAgICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgbW91c2U6IG1vdXNlRXZlbnQgPT09IHRydWUsXG4gICAgICAgICAgICAgIGRldGVjdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgaXNGaXJzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgaXNGaW5hbDogZmFsc2UsXG4gICAgICAgICAgICAgIGxhc3RYOiBsZWZ0LFxuICAgICAgICAgICAgICBsYXN0WTogdG9wXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcblxuICAgICAgICAgIG1vdmUgKGV2dCkge1xuICAgICAgICAgICAgaWYgKGN0eC5ldmVudCA9PT0gdm9pZCAwKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgICBwb3MgPSBwb3NpdGlvbihldnQpLFxuICAgICAgICAgICAgICBkaXN0WCA9IHBvcy5sZWZ0IC0gY3R4LmV2ZW50LngsXG4gICAgICAgICAgICAgIGRpc3RZID0gcG9zLnRvcCAtIGN0eC5ldmVudC55XG5cbiAgICAgICAgICAgIC8vIHByZXZlbnQgYnVnZ3kgYnJvd3NlciBiZWhhdmlvciAobGlrZSBCbGluay1iYXNlZCBlbmdpbmUgb25lcyBvbiBXaW5kb3dzKVxuICAgICAgICAgICAgLy8gd2hlcmUgdGhlIG1vdXNlbW92ZSBldmVudCBvY2N1cnMgZXZlbiBpZiB0aGVyZSdzIG5vIG1vdmVtZW50IGFmdGVyIG1vdXNlZG93blxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTYxNDY0XG4gICAgICAgICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD03MjEzNDFcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9xdWFzYXJmcmFtZXdvcmsvcXVhc2FyL2lzc3Vlcy8xMDcyMVxuICAgICAgICAgICAgaWYgKGRpc3RYID09PSAwICYmIGRpc3RZID09PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdHgubGFzdEV2dCA9IGV2dFxuXG4gICAgICAgICAgICBjb25zdCBpc01vdXNlRXZ0ID0gY3R4LmV2ZW50Lm1vdXNlID09PSB0cnVlXG4gICAgICAgICAgICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgaGFuZGxlRXZlbnQoZXZ0LCBpc01vdXNlRXZ0KVxuXG4gICAgICAgICAgICAgIGxldCBjdXJzb3JcbiAgICAgICAgICAgICAgaWYgKG1vZGlmaWVycy5wcmVzZXJ2ZUN1cnNvciAhPT0gdHJ1ZSAmJiBtb2RpZmllcnMucHJlc2VydmVjdXJzb3IgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjdXJzb3IgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuY3Vyc29yIHx8ICcnXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLmN1cnNvciA9ICdncmFiYmluZydcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlzTW91c2VFdnQgPT09IHRydWUgJiYgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCduby1wb2ludGVyLWV2ZW50cy0tY2hpbGRyZW4nKVxuICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ25vbi1zZWxlY3RhYmxlJylcbiAgICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb24oKVxuXG4gICAgICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgPSB3aXRoRGVsYXllZEZuID0+IHtcbiAgICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwID0gdm9pZCAwXG5cbiAgICAgICAgICAgICAgICBpZiAoY3Vyc29yICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5jdXJzb3IgPSBjdXJzb3JcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ25vbi1zZWxlY3RhYmxlJylcblxuICAgICAgICAgICAgICAgIGlmIChpc01vdXNlRXZ0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm8tcG9pbnRlci1ldmVudHMtLWNoaWxkcmVuJylcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYgKHdpdGhEZWxheWVkRm4gIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgICAgIHdpdGhEZWxheWVkRm4oKVxuICAgICAgICAgICAgICAgICAgICB9LCA1MClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGVsc2UgeyByZW1vdmUoKSB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHdpdGhEZWxheWVkRm4gIT09IHZvaWQgMCkge1xuICAgICAgICAgICAgICAgICAgd2l0aERlbGF5ZWRGbigpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdHguZXZlbnQuZGV0ZWN0ZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmlzRmlyc3QgIT09IHRydWUgJiYgaGFuZGxlRXZlbnQoZXZ0LCBjdHguZXZlbnQubW91c2UpXG5cbiAgICAgICAgICAgICAgY29uc3QgeyBwYXlsb2FkLCBzeW50aGV0aWMgfSA9IGdldENoYW5nZXMoZXZ0LCBjdHgsIGZhbHNlKVxuXG4gICAgICAgICAgICAgIGlmIChwYXlsb2FkICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBpZiAoY3R4LmhhbmRsZXIocGF5bG9hZCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICBjdHguZW5kKGV2dClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICBpZiAoY3R4LnN0eWxlQ2xlYW51cCA9PT0gdm9pZCAwICYmIGN0eC5ldmVudC5pc0ZpcnN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0KClcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgY3R4LmV2ZW50Lmxhc3RYID0gcGF5bG9hZC5wb3NpdGlvbi5sZWZ0XG4gICAgICAgICAgICAgICAgICBjdHguZXZlbnQubGFzdFkgPSBwYXlsb2FkLnBvc2l0aW9uLnRvcFxuICAgICAgICAgICAgICAgICAgY3R4LmV2ZW50Lmxhc3REaXIgPSBzeW50aGV0aWMgPT09IHRydWUgPyB2b2lkIDAgOiBwYXlsb2FkLmRpcmVjdGlvblxuICAgICAgICAgICAgICAgICAgY3R4LmV2ZW50LmlzRmlyc3QgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGN0eC5kaXJlY3Rpb24uYWxsID09PSB0cnVlXG4gICAgICAgICAgICAgIC8vIGFjY291bnQgZm9yIFVNRCB0b28gd2hlcmUgbW9kaWZpZXJzIHdpbGwgYmUgbG93ZXJjYXNlZCB0byB3b3JrXG4gICAgICAgICAgICAgIHx8IChpc01vdXNlRXZ0ID09PSB0cnVlICYmIChjdHgubW9kaWZpZXJzLm1vdXNlQWxsRGlyID09PSB0cnVlIHx8IGN0eC5tb2RpZmllcnMubW91c2VhbGxkaXIgPT09IHRydWUpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHN0YXJ0KClcbiAgICAgICAgICAgICAgY3R4LmV2ZW50LmRldGVjdGVkID0gdHJ1ZVxuICAgICAgICAgICAgICBjdHgubW92ZShldnQpXG4gICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdFxuICAgICAgICAgICAgICBhYnNYID0gTWF0aC5hYnMoZGlzdFgpLFxuICAgICAgICAgICAgICBhYnNZID0gTWF0aC5hYnMoZGlzdFkpXG5cbiAgICAgICAgICAgIGlmIChhYnNYICE9PSBhYnNZKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAoY3R4LmRpcmVjdGlvbi5ob3Jpem9udGFsID09PSB0cnVlICYmIGFic1ggPiBhYnNZKVxuICAgICAgICAgICAgICAgIHx8IChjdHguZGlyZWN0aW9uLnZlcnRpY2FsID09PSB0cnVlICYmIGFic1ggPCBhYnNZKVxuICAgICAgICAgICAgICAgIHx8IChjdHguZGlyZWN0aW9uLnVwID09PSB0cnVlICYmIGFic1ggPCBhYnNZICYmIGRpc3RZIDwgMClcbiAgICAgICAgICAgICAgICB8fCAoY3R4LmRpcmVjdGlvbi5kb3duID09PSB0cnVlICYmIGFic1ggPCBhYnNZICYmIGRpc3RZID4gMClcbiAgICAgICAgICAgICAgICB8fCAoY3R4LmRpcmVjdGlvbi5sZWZ0ID09PSB0cnVlICYmIGFic1ggPiBhYnNZICYmIGRpc3RYIDwgMClcbiAgICAgICAgICAgICAgICB8fCAoY3R4LmRpcmVjdGlvbi5yaWdodCA9PT0gdHJ1ZSAmJiBhYnNYID4gYWJzWSAmJiBkaXN0WCA+IDApXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGN0eC5ldmVudC5kZXRlY3RlZCA9IHRydWVcbiAgICAgICAgICAgICAgICBjdHgubW92ZShldnQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3R4LmVuZChldnQsIHRydWUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuXG4gICAgICAgICAgZW5kIChldnQsIGFib3J0KSB7XG4gICAgICAgICAgICBpZiAoY3R4LmV2ZW50ID09PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsZWFuRXZ0KGN0eCwgJ3RlbXAnKVxuICAgICAgICAgICAgY2xpZW50LmlzLmZpcmVmb3ggPT09IHRydWUgJiYgcHJldmVudERyYWdnYWJsZShlbCwgZmFsc2UpXG5cbiAgICAgICAgICAgIGlmIChhYm9ydCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwICE9PSB2b2lkIDAgJiYgY3R4LnN0eWxlQ2xlYW51cCgpXG5cbiAgICAgICAgICAgICAgaWYgKGN0eC5ldmVudC5kZXRlY3RlZCAhPT0gdHJ1ZSAmJiBjdHguaW5pdGlhbEV2ZW50ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBjdHguaW5pdGlhbEV2ZW50LnRhcmdldC5kaXNwYXRjaEV2ZW50KGN0eC5pbml0aWFsRXZlbnQuZXZlbnQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGN0eC5ldmVudC5kZXRlY3RlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICBjdHguZXZlbnQuaXNGaXJzdCA9PT0gdHJ1ZSAmJiBjdHguaGFuZGxlcihnZXRDaGFuZ2VzKGV2dCA9PT0gdm9pZCAwID8gY3R4Lmxhc3RFdnQgOiBldnQsIGN0eCkucGF5bG9hZClcblxuICAgICAgICAgICAgICBjb25zdCB7IHBheWxvYWQgfSA9IGdldENoYW5nZXMoZXZ0ID09PSB2b2lkIDAgPyBjdHgubGFzdEV2dCA6IGV2dCwgY3R4LCB0cnVlKVxuICAgICAgICAgICAgICBjb25zdCBmbiA9ICgpID0+IHsgY3R4LmhhbmRsZXIocGF5bG9hZCkgfVxuXG4gICAgICAgICAgICAgIGlmIChjdHguc3R5bGVDbGVhbnVwICE9PSB2b2lkIDApIHtcbiAgICAgICAgICAgICAgICBjdHguc3R5bGVDbGVhbnVwKGZuKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZuKClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdHguZXZlbnQgPSB2b2lkIDBcbiAgICAgICAgICAgIGN0eC5pbml0aWFsRXZlbnQgPSB2b2lkIDBcbiAgICAgICAgICAgIGN0eC5sYXN0RXZ0ID0gdm9pZCAwXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWwuX19xdG91Y2hwYW4gPSBjdHhcblxuICAgICAgICBpZiAobW9kaWZpZXJzLm1vdXNlID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gYWNjb3VudCBmb3IgVU1EIHRvbyB3aGVyZSBtb2RpZmllcnMgd2lsbCBiZSBsb3dlcmNhc2VkIHRvIHdvcmtcbiAgICAgICAgICBjb25zdCBjYXB0dXJlID0gbW9kaWZpZXJzLm1vdXNlQ2FwdHVyZSA9PT0gdHJ1ZSB8fCBtb2RpZmllcnMubW91c2VjYXB0dXJlID09PSB0cnVlXG4gICAgICAgICAgICA/ICdDYXB0dXJlJ1xuICAgICAgICAgICAgOiAnJ1xuXG4gICAgICAgICAgYWRkRXZ0KGN0eCwgJ21haW4nLCBbXG4gICAgICAgICAgICBbIGVsLCAnbW91c2Vkb3duJywgJ21vdXNlU3RhcnQnLCBgcGFzc2l2ZSR7IGNhcHR1cmUgfWAgXVxuICAgICAgICAgIF0pXG4gICAgICAgIH1cblxuICAgICAgICBjbGllbnQuaGFzLnRvdWNoID09PSB0cnVlICYmIGFkZEV2dChjdHgsICdtYWluJywgW1xuICAgICAgICAgIFsgZWwsICd0b3VjaHN0YXJ0JywgJ3RvdWNoU3RhcnQnLCBgcGFzc2l2ZSR7IG1vZGlmaWVycy5jYXB0dXJlID09PSB0cnVlID8gJ0NhcHR1cmUnIDogJycgfWAgXSxcbiAgICAgICAgICBbIGVsLCAndG91Y2htb3ZlJywgJ25vb3AnLCAnbm90UGFzc2l2ZUNhcHR1cmUnIF0gLy8gY2Fubm90IGJlIHBhc3NpdmUgKGV4OiBpT1Mgc2Nyb2xsKVxuICAgICAgICBdKVxuICAgICAgfSxcblxuICAgICAgdXBkYXRlZCAoZWwsIGJpbmRpbmdzKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IGVsLl9fcXRvdWNocGFuXG5cbiAgICAgICAgaWYgKGN0eCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgaWYgKGJpbmRpbmdzLm9sZFZhbHVlICE9PSBiaW5kaW5ncy52YWx1ZSkge1xuICAgICAgICAgICAgdHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nICYmIGN0eC5lbmQoKVxuICAgICAgICAgICAgY3R4LmhhbmRsZXIgPSBiaW5kaW5ncy52YWx1ZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGN0eC5kaXJlY3Rpb24gPSBnZXRNb2RpZmllckRpcmVjdGlvbnMoYmluZGluZ3MubW9kaWZpZXJzKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBiZWZvcmVVbm1vdW50IChlbCkge1xuICAgICAgICBjb25zdCBjdHggPSBlbC5fX3F0b3VjaHBhblxuXG4gICAgICAgIGlmIChjdHggIT09IHZvaWQgMCkge1xuICAgICAgICAgIC8vIGVtaXQgdGhlIGVuZCBldmVudCB3aGVuIHRoZSBkaXJlY3RpdmUgaXMgZGVzdHJveWVkIHdoaWxlIGFjdGl2ZVxuICAgICAgICAgIC8vIHRoaXMgaXMgb25seSBuZWVkZWQgaW4gVG91Y2hQYW4gYmVjYXVzZSB0aGUgcmVzdCBvZiB0aGUgdG91Y2ggZGlyZWN0aXZlcyBkbyBub3QgZW1pdCBhbiBlbmQgZXZlbnRcbiAgICAgICAgICAvLyB0aGUgY29uZGl0aW9uIGlzIGFsc28gY2hlY2tlZCBpbiB0aGUgc3RhcnQgb2YgZnVuY3Rpb24gYnV0IHdlIGF2b2lkIHRoZSBjYWxsXG4gICAgICAgICAgY3R4LmV2ZW50ICE9PSB2b2lkIDAgJiYgY3R4LmVuZCgpXG5cbiAgICAgICAgICBjbGVhbkV2dChjdHgsICdtYWluJylcbiAgICAgICAgICBjbGVhbkV2dChjdHgsICd0ZW1wJylcblxuICAgICAgICAgIGNsaWVudC5pcy5maXJlZm94ID09PSB0cnVlICYmIHByZXZlbnREcmFnZ2FibGUoZWwsIGZhbHNlKVxuICAgICAgICAgIGN0eC5zdHlsZUNsZWFudXAgIT09IHZvaWQgMCAmJiBjdHguc3R5bGVDbGVhbnVwKClcblxuICAgICAgICAgIGRlbGV0ZSBlbC5fX3F0b3VjaHBhblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuKVxuIiwiaW1wb3J0IHsgaCwgd2l0aERpcmVjdGl2ZXMsIHJlZiwgY29tcHV0ZWQsIHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgbmV4dFRpY2ssIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlSGlzdG9yeSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1oaXN0b3J5LmpzJ1xuaW1wb3J0IHVzZU1vZGVsVG9nZ2xlLCB7IHVzZU1vZGVsVG9nZ2xlUHJvcHMsIHVzZU1vZGVsVG9nZ2xlRW1pdHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1tb2RlbC10b2dnbGUuanMnXG5pbXBvcnQgdXNlUHJldmVudFNjcm9sbCBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1wcmV2ZW50LXNjcm9sbC5qcydcbmltcG9ydCB1c2VUaW1lb3V0IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRpbWVvdXQuanMnXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgVG91Y2hQYW4gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9Ub3VjaFBhbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0LmpzJ1xuaW1wb3J0IHsgaFNsb3QsIGhEaXIgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGxheW91dEtleSwgZW1wdHlSZW5kZXJGbiB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuY29uc3QgZHVyYXRpb24gPSAxNTBcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FEcmF3ZXInLFxuXG4gIGluaGVyaXRBdHRyczogZmFsc2UsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VNb2RlbFRvZ2dsZVByb3BzLFxuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIHNpZGU6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdsZWZ0JyxcbiAgICAgIHZhbGlkYXRvcjogdiA9PiBbICdsZWZ0JywgJ3JpZ2h0JyBdLmluY2x1ZGVzKHYpXG4gICAgfSxcblxuICAgIHdpZHRoOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAzMDBcbiAgICB9LFxuXG4gICAgbWluaTogQm9vbGVhbixcbiAgICBtaW5pVG9PdmVybGF5OiBCb29sZWFuLFxuICAgIG1pbmlXaWR0aDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogNTdcbiAgICB9LFxuXG4gICAgYnJlYWtwb2ludDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMTAyM1xuICAgIH0sXG4gICAgc2hvd0lmQWJvdmU6IEJvb2xlYW4sXG5cbiAgICBiZWhhdmlvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ2RlZmF1bHQnLCAnZGVza3RvcCcsICdtb2JpbGUnIF0uaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnZGVmYXVsdCdcbiAgICB9LFxuXG4gICAgYm9yZGVyZWQ6IEJvb2xlYW4sXG4gICAgZWxldmF0ZWQ6IEJvb2xlYW4sXG5cbiAgICBvdmVybGF5OiBCb29sZWFuLFxuICAgIHBlcnNpc3RlbnQ6IEJvb2xlYW4sXG4gICAgbm9Td2lwZU9wZW46IEJvb2xlYW4sXG4gICAgbm9Td2lwZUNsb3NlOiBCb29sZWFuLFxuICAgIG5vU3dpcGVCYWNrZHJvcDogQm9vbGVhblxuICB9LFxuXG4gIGVtaXRzOiBbXG4gICAgLi4udXNlTW9kZWxUb2dnbGVFbWl0cyxcbiAgICAnb25MYXlvdXQnLCAnbWluaVN0YXRlJ1xuICBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cywgZW1pdCwgYXR0cnMgfSkge1xuICAgIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IHZtXG5cbiAgICBjb25zdCBpc0RhcmsgPSB1c2VEYXJrKHByb3BzLCAkcSlcbiAgICBjb25zdCB7IHByZXZlbnRCb2R5U2Nyb2xsIH0gPSB1c2VQcmV2ZW50U2Nyb2xsKClcbiAgICBjb25zdCB7IHJlZ2lzdGVyVGltZW91dCwgcmVtb3ZlVGltZW91dCB9ID0gdXNlVGltZW91dCgpXG5cbiAgICBjb25zdCAkbGF5b3V0ID0gaW5qZWN0KGxheW91dEtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUURyYXdlciBuZWVkcyB0byBiZSBjaGlsZCBvZiBRTGF5b3V0JylcbiAgICAgIHJldHVybiBlbXB0eVJlbmRlckZuXG4gICAgfVxuXG4gICAgbGV0IGxhc3REZXNrdG9wU3RhdGUsIHRpbWVyTWluaSA9IG51bGwsIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyXG5cbiAgICBjb25zdCBiZWxvd0JyZWFrcG9pbnQgPSByZWYoXG4gICAgICBwcm9wcy5iZWhhdmlvciA9PT0gJ21vYmlsZSdcbiAgICAgIHx8IChwcm9wcy5iZWhhdmlvciAhPT0gJ2Rlc2t0b3AnICYmICRsYXlvdXQudG90YWxXaWR0aC52YWx1ZSA8PSBwcm9wcy5icmVha3BvaW50KVxuICAgIClcblxuICAgIGNvbnN0IGlzTWluaSA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBwcm9wcy5taW5pID09PSB0cnVlICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSAhPT0gdHJ1ZVxuICAgIClcblxuICAgIGNvbnN0IHNpemUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBpc01pbmkudmFsdWUgPT09IHRydWVcbiAgICAgICAgPyBwcm9wcy5taW5pV2lkdGhcbiAgICAgICAgOiBwcm9wcy53aWR0aFxuICAgICkpXG5cbiAgICBjb25zdCBzaG93aW5nID0gcmVmKFxuICAgICAgcHJvcHMuc2hvd0lmQWJvdmUgPT09IHRydWUgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSBmYWxzZVxuICAgICAgICA/IHRydWVcbiAgICAgICAgOiBwcm9wcy5tb2RlbFZhbHVlID09PSB0cnVlXG4gICAgKVxuXG4gICAgY29uc3QgaGlkZU9uUm91dGVDaGFuZ2UgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMucGVyc2lzdGVudCAhPT0gdHJ1ZVxuICAgICAgJiYgKGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZSB8fCBvblNjcmVlbk92ZXJsYXkudmFsdWUgPT09IHRydWUpXG4gICAgKVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlU2hvdyAoZXZ0LCBub0V2ZW50KSB7XG4gICAgICBhZGRUb0hpc3RvcnkoKVxuXG4gICAgICBldnQgIT09IGZhbHNlICYmICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICBhcHBseVBvc2l0aW9uKDApXG5cbiAgICAgIGlmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgb3RoZXJJbnN0YW5jZSA9ICRsYXlvdXQuaW5zdGFuY2VzWyBvdGhlclNpZGUudmFsdWUgXVxuICAgICAgICBpZiAob3RoZXJJbnN0YW5jZSAhPT0gdm9pZCAwICYmIG90aGVySW5zdGFuY2UuYmVsb3dCcmVha3BvaW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgb3RoZXJJbnN0YW5jZS5oaWRlKGZhbHNlKVxuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlCYWNrZHJvcCgxKVxuICAgICAgICAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlICE9PSB0cnVlICYmIHByZXZlbnRCb2R5U2Nyb2xsKHRydWUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgYXBwbHlCYWNrZHJvcCgwKVxuICAgICAgICBldnQgIT09IGZhbHNlICYmIHNldFNjcm9sbGFibGUoZmFsc2UpXG4gICAgICB9XG5cbiAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7XG4gICAgICAgIGV2dCAhPT0gZmFsc2UgJiYgc2V0U2Nyb2xsYWJsZSh0cnVlKVxuICAgICAgICBub0V2ZW50ICE9PSB0cnVlICYmIGVtaXQoJ3Nob3cnLCBldnQpXG4gICAgICB9LCBkdXJhdGlvbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVIaWRlIChldnQsIG5vRXZlbnQpIHtcbiAgICAgIHJlbW92ZUZyb21IaXN0b3J5KClcblxuICAgICAgZXZ0ICE9PSBmYWxzZSAmJiAkbGF5b3V0LmFuaW1hdGUoKVxuXG4gICAgICBhcHBseUJhY2tkcm9wKDApXG4gICAgICBhcHBseVBvc2l0aW9uKHN0YXRlRGlyZWN0aW9uLnZhbHVlICogc2l6ZS52YWx1ZSlcblxuICAgICAgY2xlYW51cCgpXG5cbiAgICAgIGlmIChub0V2ZW50ICE9PSB0cnVlKSB7XG4gICAgICAgIHJlZ2lzdGVyVGltZW91dCgoKSA9PiB7IGVtaXQoJ2hpZGUnLCBldnQpIH0sIGR1cmF0aW9uKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZVRpbWVvdXQoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHsgc2hvdywgaGlkZSB9ID0gdXNlTW9kZWxUb2dnbGUoe1xuICAgICAgc2hvd2luZyxcbiAgICAgIGhpZGVPblJvdXRlQ2hhbmdlLFxuICAgICAgaGFuZGxlU2hvdyxcbiAgICAgIGhhbmRsZUhpZGVcbiAgICB9KVxuXG4gICAgY29uc3QgeyBhZGRUb0hpc3RvcnksIHJlbW92ZUZyb21IaXN0b3J5IH0gPSB1c2VIaXN0b3J5KHNob3dpbmcsIGhpZGUsIGhpZGVPblJvdXRlQ2hhbmdlKVxuXG4gICAgY29uc3QgaW5zdGFuY2UgPSB7XG4gICAgICBiZWxvd0JyZWFrcG9pbnQsXG4gICAgICBoaWRlXG4gICAgfVxuXG4gICAgY29uc3QgcmlnaHRTaWRlID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMuc2lkZSA9PT0gJ3JpZ2h0JylcblxuICAgIGNvbnN0IHN0YXRlRGlyZWN0aW9uID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSkgKiAocmlnaHRTaWRlLnZhbHVlID09PSB0cnVlID8gMSA6IC0xKVxuICAgIClcblxuICAgIGNvbnN0IGZsYWdCYWNrZHJvcEJnID0gcmVmKDApXG4gICAgY29uc3QgZmxhZ1Bhbm5pbmcgPSByZWYoZmFsc2UpXG4gICAgY29uc3QgZmxhZ01pbmlBbmltYXRlID0gcmVmKGZhbHNlKVxuICAgIGNvbnN0IGZsYWdDb250ZW50UG9zaXRpb24gPSByZWYoIC8vIHN0YXJ0aW5nIHdpdGggXCJoaWRkZW5cIiBmb3IgU1NSXG4gICAgICBzaXplLnZhbHVlICogc3RhdGVEaXJlY3Rpb24udmFsdWVcbiAgICApXG5cbiAgICBjb25zdCBvdGhlclNpZGUgPSBjb21wdXRlZCgoKSA9PiAocmlnaHRTaWRlLnZhbHVlID09PSB0cnVlID8gJ2xlZnQnIDogJ3JpZ2h0JykpXG4gICAgY29uc3Qgb2Zmc2V0ID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlICYmIHByb3BzLm92ZXJsYXkgPT09IGZhbHNlXG4gICAgICAgID8gKHByb3BzLm1pbmlUb092ZXJsYXkgPT09IHRydWUgPyBwcm9wcy5taW5pV2lkdGggOiBzaXplLnZhbHVlKVxuICAgICAgICA6IDBcbiAgICApKVxuXG4gICAgY29uc3QgZml4ZWQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3ZlcmxheSA9PT0gdHJ1ZVxuICAgICAgfHwgcHJvcHMubWluaVRvT3ZlcmxheSA9PT0gdHJ1ZVxuICAgICAgfHwgJGxheW91dC52aWV3LnZhbHVlLmluZGV4T2YocmlnaHRTaWRlLnZhbHVlID8gJ1InIDogJ0wnKSA+IC0xXG4gICAgICB8fCAoJHEucGxhdGZvcm0uaXMuaW9zID09PSB0cnVlICYmICRsYXlvdXQuaXNDb250YWluZXIudmFsdWUgPT09IHRydWUpXG4gICAgKVxuXG4gICAgY29uc3Qgb25MYXlvdXQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3ZlcmxheSA9PT0gZmFsc2VcbiAgICAgICYmIHNob3dpbmcudmFsdWUgPT09IHRydWVcbiAgICAgICYmIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gZmFsc2VcbiAgICApXG5cbiAgICBjb25zdCBvblNjcmVlbk92ZXJsYXkgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgcHJvcHMub3ZlcmxheSA9PT0gdHJ1ZVxuICAgICAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSBmYWxzZVxuICAgIClcblxuICAgIGNvbnN0IGJhY2tkcm9wQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ2Z1bGxzY3JlZW4gcS1kcmF3ZXJfX2JhY2tkcm9wJ1xuICAgICAgKyAoc2hvd2luZy52YWx1ZSA9PT0gZmFsc2UgJiYgZmxhZ1Bhbm5pbmcudmFsdWUgPT09IGZhbHNlID8gJyBoaWRkZW4nIDogJycpXG4gICAgKVxuXG4gICAgY29uc3QgYmFja2Ryb3BTdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGByZ2JhKDAsMCwwLCR7IGZsYWdCYWNrZHJvcEJnLnZhbHVlICogMC40IH0pYFxuICAgIH0pKVxuXG4gICAgY29uc3QgaGVhZGVyU2xvdCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICRsYXlvdXQucm93cy52YWx1ZS50b3BbIDIgXSA9PT0gJ3InXG4gICAgICAgIDogJGxheW91dC5yb3dzLnZhbHVlLnRvcFsgMCBdID09PSAnbCdcbiAgICApKVxuXG4gICAgY29uc3QgZm9vdGVyU2xvdCA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICA/ICRsYXlvdXQucm93cy52YWx1ZS5ib3R0b21bIDIgXSA9PT0gJ3InXG4gICAgICAgIDogJGxheW91dC5yb3dzLnZhbHVlLmJvdHRvbVsgMCBdID09PSAnbCdcbiAgICApKVxuXG4gICAgY29uc3QgYWJvdmVTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGNzcyA9IHt9XG5cbiAgICAgIGlmICgkbGF5b3V0LmhlYWRlci5zcGFjZSA9PT0gdHJ1ZSAmJiBoZWFkZXJTbG90LnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZml4ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MudG9wID0gYCR7ICRsYXlvdXQuaGVhZGVyLm9mZnNldCB9cHhgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoJGxheW91dC5oZWFkZXIuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MudG9wID0gYCR7ICRsYXlvdXQuaGVhZGVyLnNpemUgfXB4YFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgkbGF5b3V0LmZvb3Rlci5zcGFjZSA9PT0gdHJ1ZSAmJiBmb290ZXJTbG90LnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICBpZiAoZml4ZWQudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MuYm90dG9tID0gYCR7ICRsYXlvdXQuZm9vdGVyLm9mZnNldCB9cHhgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoJGxheW91dC5mb290ZXIuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgICBjc3MuYm90dG9tID0gYCR7ICRsYXlvdXQuZm9vdGVyLnNpemUgfXB4YFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjc3NcbiAgICB9KVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBzdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IGAkeyBzaXplLnZhbHVlIH1weGAsXG4gICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHsgZmxhZ0NvbnRlbnRQb3NpdGlvbi52YWx1ZSB9cHgpYFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlXG4gICAgICAgID8gc3R5bGVcbiAgICAgICAgOiBPYmplY3QuYXNzaWduKHN0eWxlLCBhYm92ZVN0eWxlLnZhbHVlKVxuICAgIH0pXG5cbiAgICBjb25zdCBjb250ZW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtZHJhd2VyX19jb250ZW50IGZpdCAnXG4gICAgICArICgkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlICE9PSB0cnVlID8gJ3Njcm9sbCcgOiAnb3ZlcmZsb3ctYXV0bycpXG4gICAgKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1kcmF3ZXIgcS1kcmF3ZXItLSR7IHByb3BzLnNpZGUgfWBcbiAgICAgICsgKGZsYWdNaW5pQW5pbWF0ZS52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1kcmF3ZXItLW1pbmktYW5pbWF0ZScgOiAnJylcbiAgICAgICsgKHByb3BzLmJvcmRlcmVkID09PSB0cnVlID8gJyBxLWRyYXdlci0tYm9yZGVyZWQnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtZHJhd2VyLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICAgICsgKFxuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBuby10cmFuc2l0aW9uJ1xuICAgICAgICAgIDogKHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAnJyA6ICcgcS1sYXlvdXQtLXByZXZlbnQtZm9jdXMnKVxuICAgICAgKVxuICAgICAgKyAoXG4gICAgICAgIGJlbG93QnJlYWtwb2ludC52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJyBmaXhlZCBxLWRyYXdlci0tb24tdG9wIHEtZHJhd2VyLS1tb2JpbGUgcS1kcmF3ZXItLXRvcC1wYWRkaW5nJ1xuICAgICAgICAgIDogYCBxLWRyYXdlci0tJHsgaXNNaW5pLnZhbHVlID09PSB0cnVlID8gJ21pbmknIDogJ3N0YW5kYXJkJyB9YFxuICAgICAgICAgICsgKGZpeGVkLnZhbHVlID09PSB0cnVlIHx8IG9uTGF5b3V0LnZhbHVlICE9PSB0cnVlID8gJyBmaXhlZCcgOiAnJylcbiAgICAgICAgICArIChwcm9wcy5vdmVybGF5ID09PSB0cnVlIHx8IHByb3BzLm1pbmlUb092ZXJsYXkgPT09IHRydWUgPyAnIHEtZHJhd2VyLS1vbi10b3AnIDogJycpXG4gICAgICAgICAgKyAoaGVhZGVyU2xvdC52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1kcmF3ZXItLXRvcC1wYWRkaW5nJyA6ICcnKVxuICAgICAgKVxuICAgIClcblxuICAgIGNvbnN0IG9wZW5EaXJlY3RpdmUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAvLyBpZiBwcm9wcy5ub1N3aXBlT3BlbiAhPT0gdHJ1ZVxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyBwcm9wcy5zaWRlIDogb3RoZXJTaWRlLnZhbHVlXG5cbiAgICAgIHJldHVybiBbIFtcbiAgICAgICAgVG91Y2hQYW4sXG4gICAgICAgIG9uT3BlblBhbixcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICB7XG4gICAgICAgICAgWyBkaXIgXTogdHJ1ZSxcbiAgICAgICAgICBtb3VzZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdIF1cbiAgICB9KVxuXG4gICAgY29uc3QgY29udGVudENsb3NlRGlyZWN0aXZlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgLy8gaWYgYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlICYmIHByb3BzLm5vU3dpcGVDbG9zZSAhPT0gdHJ1ZVxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyBvdGhlclNpZGUudmFsdWUgOiBwcm9wcy5zaWRlXG5cbiAgICAgIHJldHVybiBbIFtcbiAgICAgICAgVG91Y2hQYW4sXG4gICAgICAgIG9uQ2xvc2VQYW4sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAge1xuICAgICAgICAgIFsgZGlyIF06IHRydWUsXG4gICAgICAgICAgbW91c2U6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSBdXG4gICAgfSlcblxuICAgIGNvbnN0IGJhY2tkcm9wQ2xvc2VEaXJlY3RpdmUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAvLyBpZiBzaG93aW5nLnZhbHVlID09PSB0cnVlICYmIHByb3BzLm5vU3dpcGVCYWNrZHJvcCAhPT0gdHJ1ZVxuICAgICAgY29uc3QgZGlyID0gJHEubGFuZy5ydGwgPT09IHRydWUgPyBvdGhlclNpZGUudmFsdWUgOiBwcm9wcy5zaWRlXG5cbiAgICAgIHJldHVybiBbIFtcbiAgICAgICAgVG91Y2hQYW4sXG4gICAgICAgIG9uQ2xvc2VQYW4sXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAge1xuICAgICAgICAgIFsgZGlyIF06IHRydWUsXG4gICAgICAgICAgbW91c2U6IHRydWUsXG4gICAgICAgICAgbW91c2VBbGxEaXI6IHRydWVcbiAgICAgICAgfVxuICAgICAgXSBdXG4gICAgfSlcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUJlbG93QnJlYWtwb2ludCAoKSB7XG4gICAgICB1cGRhdGVMb2NhbChiZWxvd0JyZWFrcG9pbnQsIChcbiAgICAgICAgcHJvcHMuYmVoYXZpb3IgPT09ICdtb2JpbGUnXG4gICAgICAgIHx8IChwcm9wcy5iZWhhdmlvciAhPT0gJ2Rlc2t0b3AnICYmICRsYXlvdXQudG90YWxXaWR0aC52YWx1ZSA8PSBwcm9wcy5icmVha3BvaW50KVxuICAgICAgKSlcbiAgICB9XG5cbiAgICB3YXRjaChiZWxvd0JyZWFrcG9pbnQsIHZhbCA9PiB7XG4gICAgICBpZiAodmFsID09PSB0cnVlKSB7IC8vIGZyb20gbGcgdG8geHNcbiAgICAgICAgbGFzdERlc2t0b3BTdGF0ZSA9IHNob3dpbmcudmFsdWVcbiAgICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBoaWRlKGZhbHNlKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoXG4gICAgICAgIHByb3BzLm92ZXJsYXkgPT09IGZhbHNlXG4gICAgICAgICYmIHByb3BzLmJlaGF2aW9yICE9PSAnbW9iaWxlJ1xuICAgICAgICAmJiBsYXN0RGVza3RvcFN0YXRlICE9PSBmYWxzZVxuICAgICAgKSB7IC8vIGZyb20geHMgdG8gbGdcbiAgICAgICAgaWYgKHNob3dpbmcudmFsdWUgPT09IHRydWUpIHtcbiAgICAgICAgICBhcHBseVBvc2l0aW9uKDApXG4gICAgICAgICAgYXBwbHlCYWNrZHJvcCgwKVxuICAgICAgICAgIGNsZWFudXAoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNob3coZmFsc2UpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gcHJvcHMuc2lkZSwgKG5ld1NpZGUsIG9sZFNpZGUpID0+IHtcbiAgICAgIGlmICgkbGF5b3V0Lmluc3RhbmNlc1sgb2xkU2lkZSBdID09PSBpbnN0YW5jZSkge1xuICAgICAgICAkbGF5b3V0Lmluc3RhbmNlc1sgb2xkU2lkZSBdID0gdm9pZCAwXG4gICAgICAgICRsYXlvdXRbIG9sZFNpZGUgXS5zcGFjZSA9IGZhbHNlXG4gICAgICAgICRsYXlvdXRbIG9sZFNpZGUgXS5vZmZzZXQgPSAwXG4gICAgICB9XG5cbiAgICAgICRsYXlvdXQuaW5zdGFuY2VzWyBuZXdTaWRlIF0gPSBpbnN0YW5jZVxuICAgICAgJGxheW91dFsgbmV3U2lkZSBdLnNpemUgPSBzaXplLnZhbHVlXG4gICAgICAkbGF5b3V0WyBuZXdTaWRlIF0uc3BhY2UgPSBvbkxheW91dC52YWx1ZVxuICAgICAgJGxheW91dFsgbmV3U2lkZSBdLm9mZnNldCA9IG9mZnNldC52YWx1ZVxuICAgIH0pXG5cbiAgICB3YXRjaCgkbGF5b3V0LnRvdGFsV2lkdGgsICgpID0+IHtcbiAgICAgIGlmICgkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlIHx8IGRvY3VtZW50LnFTY3JvbGxQcmV2ZW50ZWQgIT09IHRydWUpIHtcbiAgICAgICAgdXBkYXRlQmVsb3dCcmVha3BvaW50KClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgd2F0Y2goXG4gICAgICAoKSA9PiBwcm9wcy5iZWhhdmlvciArIHByb3BzLmJyZWFrcG9pbnQsXG4gICAgICB1cGRhdGVCZWxvd0JyZWFrcG9pbnRcbiAgICApXG5cbiAgICB3YXRjaCgkbGF5b3V0LmlzQ29udGFpbmVyLCB2YWwgPT4ge1xuICAgICAgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSAmJiBwcmV2ZW50Qm9keVNjcm9sbCh2YWwgIT09IHRydWUpXG4gICAgICB2YWwgPT09IHRydWUgJiYgdXBkYXRlQmVsb3dCcmVha3BvaW50KClcbiAgICB9KVxuXG4gICAgd2F0Y2goJGxheW91dC5zY3JvbGxiYXJXaWR0aCwgKCkgPT4ge1xuICAgICAgYXBwbHlQb3NpdGlvbihzaG93aW5nLnZhbHVlID09PSB0cnVlID8gMCA6IHZvaWQgMClcbiAgICB9KVxuXG4gICAgd2F0Y2gob2Zmc2V0LCB2YWwgPT4geyB1cGRhdGVMYXlvdXQoJ29mZnNldCcsIHZhbCkgfSlcblxuICAgIHdhdGNoKG9uTGF5b3V0LCB2YWwgPT4ge1xuICAgICAgZW1pdCgnb25MYXlvdXQnLCB2YWwpXG4gICAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaChyaWdodFNpZGUsICgpID0+IHsgYXBwbHlQb3NpdGlvbigpIH0pXG5cbiAgICB3YXRjaChzaXplLCB2YWwgPT4ge1xuICAgICAgYXBwbHlQb3NpdGlvbigpXG4gICAgICB1cGRhdGVTaXplT25MYXlvdXQocHJvcHMubWluaVRvT3ZlcmxheSwgdmFsKVxuICAgIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5taW5pVG9PdmVybGF5LCB2YWwgPT4ge1xuICAgICAgdXBkYXRlU2l6ZU9uTGF5b3V0KHZhbCwgc2l6ZS52YWx1ZSlcbiAgICB9KVxuXG4gICAgd2F0Y2goKCkgPT4gJHEubGFuZy5ydGwsICgpID0+IHsgYXBwbHlQb3NpdGlvbigpIH0pXG5cbiAgICB3YXRjaCgoKSA9PiBwcm9wcy5taW5pLCAoKSA9PiB7XG4gICAgICBpZiAocHJvcHMubW9kZWxWYWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBhbmltYXRlTWluaSgpXG4gICAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHdhdGNoKGlzTWluaSwgdmFsID0+IHsgZW1pdCgnbWluaVN0YXRlJywgdmFsKSB9KVxuXG4gICAgZnVuY3Rpb24gYXBwbHlQb3NpdGlvbiAocG9zaXRpb24pIHtcbiAgICAgIGlmIChwb3NpdGlvbiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBwb3NpdGlvbiA9IHNob3dpbmcudmFsdWUgPT09IHRydWUgPyAwIDogc2l6ZS52YWx1ZVxuICAgICAgICAgIGFwcGx5UG9zaXRpb24oc3RhdGVEaXJlY3Rpb24udmFsdWUgKiBwb3NpdGlvbilcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICYmIHJpZ2h0U2lkZS52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgICYmIChiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUgfHwgTWF0aC5hYnMocG9zaXRpb24pID09PSBzaXplLnZhbHVlKVxuICAgICAgICApIHtcbiAgICAgICAgICBwb3NpdGlvbiArPSBzdGF0ZURpcmVjdGlvbi52YWx1ZSAqICRsYXlvdXQuc2Nyb2xsYmFyV2lkdGgudmFsdWVcbiAgICAgICAgfVxuXG4gICAgICAgIGZsYWdDb250ZW50UG9zaXRpb24udmFsdWUgPSBwb3NpdGlvblxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5QmFja2Ryb3AgKHgpIHtcbiAgICAgIGZsYWdCYWNrZHJvcEJnLnZhbHVlID0geFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFNjcm9sbGFibGUgKHYpIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHYgPT09IHRydWVcbiAgICAgICAgPyAncmVtb3ZlJ1xuICAgICAgICA6ICgkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlICE9PSB0cnVlID8gJ2FkZCcgOiAnJylcblxuICAgICAgYWN0aW9uICE9PSAnJyAmJiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdFsgYWN0aW9uIF0oJ3EtYm9keS0tZHJhd2VyLXRvZ2dsZScpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYW5pbWF0ZU1pbmkgKCkge1xuICAgICAgdGltZXJNaW5pICE9PSBudWxsICYmIGNsZWFyVGltZW91dCh0aW1lck1pbmkpXG5cbiAgICAgIGlmICh2bS5wcm94eSAmJiB2bS5wcm94eS4kZWwpIHtcbiAgICAgICAgLy8gbmVlZCB0byBzcGVlZCBpdCB1cCBhbmQgYXBwbHkgaXQgaW1tZWRpYXRlbHksXG4gICAgICAgIC8vIGV2ZW4gZmFzdGVyIHRoYW4gVnVlJ3MgbmV4dFRpY2shXG4gICAgICAgIHZtLnByb3h5LiRlbC5jbGFzc0xpc3QuYWRkKCdxLWRyYXdlci0tbWluaS1hbmltYXRlJylcbiAgICAgIH1cblxuICAgICAgZmxhZ01pbmlBbmltYXRlLnZhbHVlID0gdHJ1ZVxuICAgICAgdGltZXJNaW5pID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRpbWVyTWluaSA9IG51bGxcbiAgICAgICAgZmxhZ01pbmlBbmltYXRlLnZhbHVlID0gZmFsc2VcbiAgICAgICAgaWYgKHZtICYmIHZtLnByb3h5ICYmIHZtLnByb3h5LiRlbCkge1xuICAgICAgICAgIHZtLnByb3h5LiRlbC5jbGFzc0xpc3QucmVtb3ZlKCdxLWRyYXdlci0tbWluaS1hbmltYXRlJylcbiAgICAgICAgfVxuICAgICAgfSwgMTUwKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uT3BlblBhbiAoZXZ0KSB7XG4gICAgICBpZiAoc2hvd2luZy52YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgLy8gc29tZSBicm93c2VycyBtaWdodCBjYXB0dXJlIGFuZCB0cmlnZ2VyIHRoaXNcbiAgICAgICAgLy8gZXZlbiBpZiBEcmF3ZXIgaGFzIGp1c3QgYmVlbiBvcGVuZWQgKGJ1dCBhbmltYXRpb24gaXMgc3RpbGwgcGVuZGluZylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0XG4gICAgICAgIHdpZHRoID0gc2l6ZS52YWx1ZSxcbiAgICAgICAgcG9zaXRpb24gPSBiZXR3ZWVuKGV2dC5kaXN0YW5jZS54LCAwLCB3aWR0aClcblxuICAgICAgaWYgKGV2dC5pc0ZpbmFsID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG9wZW5lZCA9IHBvc2l0aW9uID49IE1hdGgubWluKDc1LCB3aWR0aClcblxuICAgICAgICBpZiAob3BlbmVkID09PSB0cnVlKSB7XG4gICAgICAgICAgc2hvdygpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgJGxheW91dC5hbmltYXRlKClcbiAgICAgICAgICBhcHBseUJhY2tkcm9wKDApXG4gICAgICAgICAgYXBwbHlQb3NpdGlvbihzdGF0ZURpcmVjdGlvbi52YWx1ZSAqIHdpZHRoKVxuICAgICAgICB9XG5cbiAgICAgICAgZmxhZ1Bhbm5pbmcudmFsdWUgPSBmYWxzZVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgYXBwbHlQb3NpdGlvbihcbiAgICAgICAgKCRxLmxhbmcucnRsID09PSB0cnVlID8gcmlnaHRTaWRlLnZhbHVlICE9PSB0cnVlIDogcmlnaHRTaWRlLnZhbHVlKVxuICAgICAgICAgID8gTWF0aC5tYXgod2lkdGggLSBwb3NpdGlvbiwgMClcbiAgICAgICAgICA6IE1hdGgubWluKDAsIHBvc2l0aW9uIC0gd2lkdGgpXG4gICAgICApXG4gICAgICBhcHBseUJhY2tkcm9wKFxuICAgICAgICBiZXR3ZWVuKHBvc2l0aW9uIC8gd2lkdGgsIDAsIDEpXG4gICAgICApXG5cbiAgICAgIGlmIChldnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsb3NlUGFuIChldnQpIHtcbiAgICAgIGlmIChzaG93aW5nLnZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgIC8vIHNvbWUgYnJvd3NlcnMgbWlnaHQgY2FwdHVyZSBhbmQgdHJpZ2dlciB0aGlzXG4gICAgICAgIC8vIGV2ZW4gaWYgRHJhd2VyIGhhcyBqdXN0IGJlZW4gY2xvc2VkIChidXQgYW5pbWF0aW9uIGlzIHN0aWxsIHBlbmRpbmcpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdFxuICAgICAgICB3aWR0aCA9IHNpemUudmFsdWUsXG4gICAgICAgIGRpciA9IGV2dC5kaXJlY3Rpb24gPT09IHByb3BzLnNpZGUsXG4gICAgICAgIHBvc2l0aW9uID0gKCRxLmxhbmcucnRsID09PSB0cnVlID8gZGlyICE9PSB0cnVlIDogZGlyKVxuICAgICAgICAgID8gYmV0d2VlbihldnQuZGlzdGFuY2UueCwgMCwgd2lkdGgpXG4gICAgICAgICAgOiAwXG5cbiAgICAgIGlmIChldnQuaXNGaW5hbCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBvcGVuZWQgPSBNYXRoLmFicyhwb3NpdGlvbikgPCBNYXRoLm1pbig3NSwgd2lkdGgpXG5cbiAgICAgICAgaWYgKG9wZW5lZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICRsYXlvdXQuYW5pbWF0ZSgpXG4gICAgICAgICAgYXBwbHlCYWNrZHJvcCgxKVxuICAgICAgICAgIGFwcGx5UG9zaXRpb24oMClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBoaWRlKClcbiAgICAgICAgfVxuXG4gICAgICAgIGZsYWdQYW5uaW5nLnZhbHVlID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGFwcGx5UG9zaXRpb24oc3RhdGVEaXJlY3Rpb24udmFsdWUgKiBwb3NpdGlvbilcbiAgICAgIGFwcGx5QmFja2Ryb3AoYmV0d2VlbigxIC0gcG9zaXRpb24gLyB3aWR0aCwgMCwgMSkpXG5cbiAgICAgIGlmIChldnQuaXNGaXJzdCA9PT0gdHJ1ZSkge1xuICAgICAgICBmbGFnUGFubmluZy52YWx1ZSA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICAgIHByZXZlbnRCb2R5U2Nyb2xsKGZhbHNlKVxuICAgICAgc2V0U2Nyb2xsYWJsZSh0cnVlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxheW91dCAocHJvcCwgdmFsKSB7XG4gICAgICAkbGF5b3V0LnVwZGF0ZShwcm9wcy5zaWRlLCBwcm9wLCB2YWwpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWwgKHByb3AsIHZhbCkge1xuICAgICAgaWYgKHByb3AudmFsdWUgIT09IHZhbCkge1xuICAgICAgICBwcm9wLnZhbHVlID0gdmFsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2l6ZU9uTGF5b3V0IChtaW5pVG9PdmVybGF5LCBzaXplKSB7XG4gICAgICB1cGRhdGVMYXlvdXQoJ3NpemUnLCBtaW5pVG9PdmVybGF5ID09PSB0cnVlID8gcHJvcHMubWluaVdpZHRoIDogc2l6ZSlcbiAgICB9XG5cbiAgICAkbGF5b3V0Lmluc3RhbmNlc1sgcHJvcHMuc2lkZSBdID0gaW5zdGFuY2VcbiAgICB1cGRhdGVTaXplT25MYXlvdXQocHJvcHMubWluaVRvT3ZlcmxheSwgc2l6ZS52YWx1ZSlcbiAgICB1cGRhdGVMYXlvdXQoJ3NwYWNlJywgb25MYXlvdXQudmFsdWUpXG4gICAgdXBkYXRlTGF5b3V0KCdvZmZzZXQnLCBvZmZzZXQudmFsdWUpXG5cbiAgICBpZiAoXG4gICAgICBwcm9wcy5zaG93SWZBYm92ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHMubW9kZWxWYWx1ZSAhPT0gdHJ1ZVxuICAgICAgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgJiYgcHJvcHNbICdvblVwZGF0ZTptb2RlbFZhbHVlJyBdICE9PSB2b2lkIDBcbiAgICApIHtcbiAgICAgIGVtaXQoJ3VwZGF0ZTptb2RlbFZhbHVlJywgdHJ1ZSlcbiAgICB9XG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgZW1pdCgnb25MYXlvdXQnLCBvbkxheW91dC52YWx1ZSlcbiAgICAgIGVtaXQoJ21pbmlTdGF0ZScsIGlzTWluaS52YWx1ZSlcblxuICAgICAgbGFzdERlc2t0b3BTdGF0ZSA9IHByb3BzLnNob3dJZkFib3ZlID09PSB0cnVlXG5cbiAgICAgIGNvbnN0IGZuID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBzaG93aW5nLnZhbHVlID09PSB0cnVlID8gaGFuZGxlU2hvdyA6IGhhbmRsZUhpZGVcbiAgICAgICAgYWN0aW9uKGZhbHNlLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBpZiAoJGxheW91dC50b3RhbFdpZHRoLnZhbHVlICE9PSAwKSB7XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB0aGF0IGFsbCBjb21wdXRlZCBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIGhhdmUgYmVlbiB1cGRhdGVkIGJlZm9yZSBjYWxsaW5nIGhhbmRsZVNob3cvaGFuZGxlSGlkZSgpXG4gICAgICAgIG5leHRUaWNrKGZuKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXIgPSB3YXRjaCgkbGF5b3V0LnRvdGFsV2lkdGgsICgpID0+IHtcbiAgICAgICAgbGF5b3V0VG90YWxXaWR0aFdhdGNoZXIoKVxuICAgICAgICBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlciA9IHZvaWQgMFxuXG4gICAgICAgIGlmIChzaG93aW5nLnZhbHVlID09PSBmYWxzZSAmJiBwcm9wcy5zaG93SWZBYm92ZSA9PT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc2hvdyhmYWxzZSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBmbigpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIG9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gICAgICBsYXlvdXRUb3RhbFdpZHRoV2F0Y2hlciAhPT0gdm9pZCAwICYmIGxheW91dFRvdGFsV2lkdGhXYXRjaGVyKClcblxuICAgICAgaWYgKHRpbWVyTWluaSAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZXJNaW5pKVxuICAgICAgICB0aW1lck1pbmkgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIHNob3dpbmcudmFsdWUgPT09IHRydWUgJiYgY2xlYW51cCgpXG5cbiAgICAgIGlmICgkbGF5b3V0Lmluc3RhbmNlc1sgcHJvcHMuc2lkZSBdID09PSBpbnN0YW5jZSkge1xuICAgICAgICAkbGF5b3V0Lmluc3RhbmNlc1sgcHJvcHMuc2lkZSBdID0gdm9pZCAwXG4gICAgICAgIHVwZGF0ZUxheW91dCgnc2l6ZScsIDApXG4gICAgICAgIHVwZGF0ZUxheW91dCgnb2Zmc2V0JywgMClcbiAgICAgICAgdXBkYXRlTGF5b3V0KCdzcGFjZScsIGZhbHNlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXVxuXG4gICAgICBpZiAoYmVsb3dCcmVha3BvaW50LnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgIHByb3BzLm5vU3dpcGVPcGVuID09PSBmYWxzZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICAgIHdpdGhEaXJlY3RpdmVzKFxuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBrZXk6ICdvcGVuJyxcbiAgICAgICAgICAgICAgY2xhc3M6IGBxLWRyYXdlcl9fb3BlbmVyIGZpeGVkLSR7IHByb3BzLnNpZGUgfWAsXG4gICAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJ1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBvcGVuRGlyZWN0aXZlLnZhbHVlXG4gICAgICAgICAgKVxuICAgICAgICApXG5cbiAgICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgICBoRGlyKFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJlZjogJ2JhY2tkcm9wJyxcbiAgICAgICAgICAgICAgY2xhc3M6IGJhY2tkcm9wQ2xhc3MudmFsdWUsXG4gICAgICAgICAgICAgIHN0eWxlOiBiYWNrZHJvcFN0eWxlLnZhbHVlLFxuICAgICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICAgIG9uQ2xpY2s6IGhpZGVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2b2lkIDAsXG4gICAgICAgICAgICAnYmFja2Ryb3AnLFxuICAgICAgICAgICAgcHJvcHMubm9Td2lwZUJhY2tkcm9wICE9PSB0cnVlICYmIHNob3dpbmcudmFsdWUgPT09IHRydWUsXG4gICAgICAgICAgICAoKSA9PiBiYWNrZHJvcENsb3NlRGlyZWN0aXZlLnZhbHVlXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1pbmkgPSBpc01pbmkudmFsdWUgPT09IHRydWUgJiYgc2xvdHMubWluaSAhPT0gdm9pZCAwXG4gICAgICBjb25zdCBjb250ZW50ID0gW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgLi4uYXR0cnMsXG4gICAgICAgICAga2V5OiAnJyArIG1pbmksIC8vIHJlcXVpcmVkIG90aGVyd2lzZSBWdWUgd2lsbCBub3QgZGlmZiBjb3JyZWN0bHlcbiAgICAgICAgICBjbGFzczogW1xuICAgICAgICAgICAgY29udGVudENsYXNzLnZhbHVlLFxuICAgICAgICAgICAgYXR0cnMuY2xhc3NcbiAgICAgICAgICBdXG4gICAgICAgIH0sIG1pbmkgPT09IHRydWVcbiAgICAgICAgICA/IHNsb3RzLm1pbmkoKVxuICAgICAgICAgIDogaFNsb3Qoc2xvdHMuZGVmYXVsdClcbiAgICAgICAgKVxuICAgICAgXVxuXG4gICAgICBpZiAocHJvcHMuZWxldmF0ZWQgPT09IHRydWUgJiYgc2hvd2luZy52YWx1ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb250ZW50LnB1c2goXG4gICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgY2xhc3M6ICdxLWxheW91dF9fc2hhZG93IGFic29sdXRlLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIG5vLXBvaW50ZXItZXZlbnRzJ1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgY2hpbGQucHVzaChcbiAgICAgICAgaERpcihcbiAgICAgICAgICAnYXNpZGUnLFxuICAgICAgICAgIHsgcmVmOiAnY29udGVudCcsIGNsYXNzOiBjbGFzc2VzLnZhbHVlLCBzdHlsZTogc3R5bGUudmFsdWUgfSxcbiAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgICdjb250ZW50Y2xvc2UnLFxuICAgICAgICAgIHByb3BzLm5vU3dpcGVDbG9zZSAhPT0gdHJ1ZSAmJiBiZWxvd0JyZWFrcG9pbnQudmFsdWUgPT09IHRydWUsXG4gICAgICAgICAgKCkgPT4gY29udGVudENsb3NlRGlyZWN0aXZlLnZhbHVlXG4gICAgICAgIClcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHsgY2xhc3M6ICdxLWRyYXdlci1jb250YWluZXInIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBwcm92aWRlLCBpbmplY3QsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvcmVuZGVyLmpzJ1xuaW1wb3J0IHsgcGFnZUNvbnRhaW5lcktleSwgbGF5b3V0S2V5LCBlbXB0eVJlbmRlckZuIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9zeW1ib2xzLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVBhZ2VDb250YWluZXInLFxuXG4gIHNldHVwIChfLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCAkbGF5b3V0ID0gaW5qZWN0KGxheW91dEtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2VDb250YWluZXIgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUUxheW91dCcpXG4gICAgICByZXR1cm4gZW1wdHlSZW5kZXJGblxuICAgIH1cblxuICAgIHByb3ZpZGUocGFnZUNvbnRhaW5lcktleSwgdHJ1ZSlcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgY3NzID0ge31cblxuICAgICAgaWYgKCRsYXlvdXQuaGVhZGVyLnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzcy5wYWRkaW5nVG9wID0gYCR7ICRsYXlvdXQuaGVhZGVyLnNpemUgfXB4YFxuICAgICAgfVxuICAgICAgaWYgKCRsYXlvdXQucmlnaHQuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzWyBgcGFkZGluZyR7ICRxLmxhbmcucnRsID09PSB0cnVlID8gJ0xlZnQnIDogJ1JpZ2h0JyB9YCBdID0gYCR7ICRsYXlvdXQucmlnaHQuc2l6ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAoJGxheW91dC5mb290ZXIuc3BhY2UgPT09IHRydWUpIHtcbiAgICAgICAgY3NzLnBhZGRpbmdCb3R0b20gPSBgJHsgJGxheW91dC5mb290ZXIuc2l6ZSB9cHhgXG4gICAgICB9XG4gICAgICBpZiAoJGxheW91dC5sZWZ0LnNwYWNlID09PSB0cnVlKSB7XG4gICAgICAgIGNzc1sgYHBhZGRpbmckeyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdSaWdodCcgOiAnTGVmdCcgfWAgXSA9IGAkeyAkbGF5b3V0LmxlZnQuc2l6ZSB9cHhgXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjc3NcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2RpdicsIHtcbiAgICAgIGNsYXNzOiAncS1wYWdlLWNvbnRhaW5lcicsXG4gICAgICBzdHlsZTogc3R5bGUudmFsdWVcbiAgICB9LCBoU2xvdChzbG90cy5kZWZhdWx0KSlcbiAgfVxufSlcbiIsImltcG9ydCB7IHdhdGNoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGdldFNjcm9sbFRhcmdldCwgZ2V0VmVydGljYWxTY3JvbGxQb3NpdGlvbiwgZ2V0SG9yaXpvbnRhbFNjcm9sbFBvc2l0aW9uIH0gZnJvbSAnLi4vLi4vdXRpbHMvc2Nyb2xsLmpzJ1xuaW1wb3J0IHsgbGlzdGVuT3B0cywgbm9vcCB9IGZyb20gJy4uLy4uL3V0aWxzL2V2ZW50LmpzJ1xuXG5jb25zdCB7IHBhc3NpdmUgfSA9IGxpc3Rlbk9wdHNcbmNvbnN0IGF4aXNWYWx1ZXMgPSBbICdib3RoJywgJ2hvcml6b250YWwnLCAndmVydGljYWwnIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTY3JvbGxPYnNlcnZlcicsXG5cbiAgcHJvcHM6IHtcbiAgICBheGlzOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gYXhpc1ZhbHVlcy5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICd2ZXJ0aWNhbCdcbiAgICB9LFxuXG4gICAgZGVib3VuY2U6IFsgU3RyaW5nLCBOdW1iZXIgXSxcblxuICAgIHNjcm9sbFRhcmdldDoge1xuICAgICAgZGVmYXVsdDogdm9pZCAwXG4gICAgfVxuICB9LFxuXG4gIGVtaXRzOiBbICdzY3JvbGwnIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IGVtaXQgfSkge1xuICAgIGNvbnN0IHNjcm9sbCA9IHtcbiAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgbGVmdDogMFxuICAgICAgfSxcblxuICAgICAgZGlyZWN0aW9uOiAnZG93bicsXG4gICAgICBkaXJlY3Rpb25DaGFuZ2VkOiBmYWxzZSxcblxuICAgICAgZGVsdGE6IHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwXG4gICAgICB9LFxuXG4gICAgICBpbmZsZWN0aW9uUG9pbnQ6IHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGNsZWFyVGltZXIgPSBudWxsLCBsb2NhbFNjcm9sbFRhcmdldCwgcGFyZW50RWxcblxuICAgIHdhdGNoKCgpID0+IHByb3BzLnNjcm9sbFRhcmdldCwgKCkgPT4ge1xuICAgICAgdW5jb25maWd1cmVTY3JvbGxUYXJnZXQoKVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gZW1pdEV2ZW50ICgpIHtcbiAgICAgIGNsZWFyVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lcigpXG5cbiAgICAgIGNvbnN0IHRvcCA9IE1hdGgubWF4KDAsIGdldFZlcnRpY2FsU2Nyb2xsUG9zaXRpb24obG9jYWxTY3JvbGxUYXJnZXQpKVxuICAgICAgY29uc3QgbGVmdCA9IGdldEhvcml6b250YWxTY3JvbGxQb3NpdGlvbihsb2NhbFNjcm9sbFRhcmdldClcblxuICAgICAgY29uc3QgZGVsdGEgPSB7XG4gICAgICAgIHRvcDogdG9wIC0gc2Nyb2xsLnBvc2l0aW9uLnRvcCxcbiAgICAgICAgbGVmdDogbGVmdCAtIHNjcm9sbC5wb3NpdGlvbi5sZWZ0XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgKHByb3BzLmF4aXMgPT09ICd2ZXJ0aWNhbCcgJiYgZGVsdGEudG9wID09PSAwKVxuICAgICAgICB8fCAocHJvcHMuYXhpcyA9PT0gJ2hvcml6b250YWwnICYmIGRlbHRhLmxlZnQgPT09IDApXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGN1ckRpciA9IE1hdGguYWJzKGRlbHRhLnRvcCkgPj0gTWF0aC5hYnMoZGVsdGEubGVmdClcbiAgICAgICAgPyAoZGVsdGEudG9wIDwgMCA/ICd1cCcgOiAnZG93bicpXG4gICAgICAgIDogKGRlbHRhLmxlZnQgPCAwID8gJ2xlZnQnIDogJ3JpZ2h0JylcblxuICAgICAgc2Nyb2xsLnBvc2l0aW9uID0geyB0b3AsIGxlZnQgfVxuICAgICAgc2Nyb2xsLmRpcmVjdGlvbkNoYW5nZWQgPSBzY3JvbGwuZGlyZWN0aW9uICE9PSBjdXJEaXJcbiAgICAgIHNjcm9sbC5kZWx0YSA9IGRlbHRhXG5cbiAgICAgIGlmIChzY3JvbGwuZGlyZWN0aW9uQ2hhbmdlZCA9PT0gdHJ1ZSkge1xuICAgICAgICBzY3JvbGwuZGlyZWN0aW9uID0gY3VyRGlyXG4gICAgICAgIHNjcm9sbC5pbmZsZWN0aW9uUG9pbnQgPSBzY3JvbGwucG9zaXRpb25cbiAgICAgIH1cblxuICAgICAgZW1pdCgnc2Nyb2xsJywgeyAuLi5zY3JvbGwgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgbG9jYWxTY3JvbGxUYXJnZXQgPSBnZXRTY3JvbGxUYXJnZXQocGFyZW50RWwsIHByb3BzLnNjcm9sbFRhcmdldClcbiAgICAgIGxvY2FsU2Nyb2xsVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRyaWdnZXIsIHBhc3NpdmUpXG4gICAgICB0cmlnZ2VyKHRydWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5jb25maWd1cmVTY3JvbGxUYXJnZXQgKCkge1xuICAgICAgaWYgKGxvY2FsU2Nyb2xsVGFyZ2V0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdHJpZ2dlciwgcGFzc2l2ZSlcbiAgICAgICAgbG9jYWxTY3JvbGxUYXJnZXQgPSB2b2lkIDBcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmlnZ2VyIChpbW1lZGlhdGVseSkge1xuICAgICAgaWYgKGltbWVkaWF0ZWx5ID09PSB0cnVlIHx8IHByb3BzLmRlYm91bmNlID09PSAwIHx8IHByb3BzLmRlYm91bmNlID09PSAnMCcpIHtcbiAgICAgICAgZW1pdEV2ZW50KClcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGNsZWFyVGltZXIgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgWyB0aW1lciwgZm4gXSA9IHByb3BzLmRlYm91bmNlXG4gICAgICAgICAgPyBbIHNldFRpbWVvdXQoZW1pdEV2ZW50LCBwcm9wcy5kZWJvdW5jZSksIGNsZWFyVGltZW91dCBdXG4gICAgICAgICAgOiBbIHJlcXVlc3RBbmltYXRpb25GcmFtZShlbWl0RXZlbnQpLCBjYW5jZWxBbmltYXRpb25GcmFtZSBdXG5cbiAgICAgICAgY2xlYXJUaW1lciA9ICgpID0+IHtcbiAgICAgICAgICBmbih0aW1lcilcbiAgICAgICAgICBjbGVhclRpbWVyID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIHdhdGNoKCgpID0+IHByb3h5LiRxLmxhbmcucnRsLCBlbWl0RXZlbnQpXG5cbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgcGFyZW50RWwgPSBwcm94eS4kZWwucGFyZW50Tm9kZVxuICAgICAgY29uZmlndXJlU2Nyb2xsVGFyZ2V0KClcbiAgICB9KVxuXG4gICAgb25CZWZvcmVVbm1vdW50KCgpID0+IHtcbiAgICAgIGNsZWFyVGltZXIgIT09IG51bGwgJiYgY2xlYXJUaW1lcigpXG4gICAgICB1bmNvbmZpZ3VyZVNjcm9sbFRhcmdldCgpXG4gICAgfSlcblxuICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kc1xuICAgIE9iamVjdC5hc3NpZ24ocHJveHksIHtcbiAgICAgIHRyaWdnZXIsXG4gICAgICBnZXRQb3NpdGlvbjogKCkgPT4gc2Nyb2xsXG4gICAgfSlcblxuICAgIHJldHVybiBub29wXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCByZWYsIHJlYWN0aXZlLCBjb21wdXRlZCwgd2F0Y2gsIHByb3ZpZGUsIG9uVW5tb3VudGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB7IGlzUnVudGltZVNzclByZUh5ZHJhdGlvbiB9IGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmltcG9ydCBRU2Nyb2xsT2JzZXJ2ZXIgZnJvbSAnLi4vc2Nyb2xsLW9ic2VydmVyL1FTY3JvbGxPYnNlcnZlci5qcydcbmltcG9ydCBRUmVzaXplT2JzZXJ2ZXIgZnJvbSAnLi4vcmVzaXplLW9ic2VydmVyL1FSZXNpemVPYnNlcnZlci5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBnZXRTY3JvbGxiYXJXaWR0aCB9IGZyb20gJy4uLy4uL3V0aWxzL3Njcm9sbC5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGxheW91dEtleSB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvc3ltYm9scy5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FMYXlvdXQnLFxuXG4gIHByb3BzOiB7XG4gICAgY29udGFpbmVyOiBCb29sZWFuLFxuICAgIHZpZXc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdoaGggbHByIGZmZicsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gL14oaHxsKWgoaHxyKSBscHIgKGZ8bClmKGZ8cikkLy50ZXN0KHYudG9Mb3dlckNhc2UoKSlcbiAgICB9LFxuXG4gICAgb25TY3JvbGw6IEZ1bmN0aW9uLFxuICAgIG9uU2Nyb2xsSGVpZ2h0OiBGdW5jdGlvbixcbiAgICBvblJlc2l6ZTogRnVuY3Rpb25cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMsIGVtaXQgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGNvbnN0IHJvb3RSZWYgPSByZWYobnVsbClcblxuICAgIC8vIHBhZ2UgcmVsYXRlZFxuICAgIGNvbnN0IGhlaWdodCA9IHJlZigkcS5zY3JlZW4uaGVpZ2h0KVxuICAgIGNvbnN0IHdpZHRoID0gcmVmKHByb3BzLmNvbnRhaW5lciA9PT0gdHJ1ZSA/IDAgOiAkcS5zY3JlZW4ud2lkdGgpXG4gICAgY29uc3Qgc2Nyb2xsID0gcmVmKHsgcG9zaXRpb246IDAsIGRpcmVjdGlvbjogJ2Rvd24nLCBpbmZsZWN0aW9uUG9pbnQ6IDAgfSlcblxuICAgIC8vIGNvbnRhaW5lciBvbmx5IHByb3BcbiAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSByZWYoMClcbiAgICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IHJlZihpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUgPT09IHRydWUgPyAwIDogZ2V0U2Nyb2xsYmFyV2lkdGgoKSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtbGF5b3V0IHEtbGF5b3V0LS0nXG4gICAgICArIChwcm9wcy5jb250YWluZXIgPT09IHRydWUgPyAnY29udGFpbmVyaXplZCcgOiAnc3RhbmRhcmQnKVxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuY29udGFpbmVyID09PSBmYWxzZVxuICAgICAgICA/IHsgbWluSGVpZ2h0OiAkcS5zY3JlZW4uaGVpZ2h0ICsgJ3B4JyB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICAvLyB1c2VkIGJ5IGNvbnRhaW5lciBvbmx5XG4gICAgY29uc3QgdGFyZ2V0U3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBzY3JvbGxiYXJXaWR0aC52YWx1ZSAhPT0gMFxuICAgICAgICA/IHsgWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdsZWZ0JyA6ICdyaWdodCcgXTogYCR7IHNjcm9sbGJhcldpZHRoLnZhbHVlIH1weGAgfVxuICAgICAgICA6IG51bGxcbiAgICApKVxuXG4gICAgY29uc3QgdGFyZ2V0Q2hpbGRTdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHNjcm9sbGJhcldpZHRoLnZhbHVlICE9PSAwXG4gICAgICAgID8ge1xuICAgICAgICAgICAgWyAkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/ICdyaWdodCcgOiAnbGVmdCcgXTogMCxcbiAgICAgICAgICAgIFsgJHEubGFuZy5ydGwgPT09IHRydWUgPyAnbGVmdCcgOiAncmlnaHQnIF06IGAtJHsgc2Nyb2xsYmFyV2lkdGgudmFsdWUgfXB4YCxcbiAgICAgICAgICAgIHdpZHRoOiBgY2FsYygxMDAlICsgJHsgc2Nyb2xsYmFyV2lkdGgudmFsdWUgfXB4KWBcbiAgICAgICAgICB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICBmdW5jdGlvbiBvblBhZ2VTY3JvbGwgKGRhdGEpIHtcbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUgfHwgZG9jdW1lbnQucVNjcm9sbFByZXZlbnRlZCAhPT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICAgIHBvc2l0aW9uOiBkYXRhLnBvc2l0aW9uLnRvcCxcbiAgICAgICAgICBkaXJlY3Rpb246IGRhdGEuZGlyZWN0aW9uLFxuICAgICAgICAgIGRpcmVjdGlvbkNoYW5nZWQ6IGRhdGEuZGlyZWN0aW9uQ2hhbmdlZCxcbiAgICAgICAgICBpbmZsZWN0aW9uUG9pbnQ6IGRhdGEuaW5mbGVjdGlvblBvaW50LnRvcCxcbiAgICAgICAgICBkZWx0YTogZGF0YS5kZWx0YS50b3BcbiAgICAgICAgfVxuXG4gICAgICAgIHNjcm9sbC52YWx1ZSA9IGluZm9cbiAgICAgICAgcHJvcHMub25TY3JvbGwgIT09IHZvaWQgMCAmJiBlbWl0KCdzY3JvbGwnLCBpbmZvKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9uUGFnZVJlc2l6ZSAoZGF0YSkge1xuICAgICAgY29uc3QgeyBoZWlnaHQ6IG5ld0hlaWdodCwgd2lkdGg6IG5ld1dpZHRoIH0gPSBkYXRhXG4gICAgICBsZXQgcmVzaXplZCA9IGZhbHNlXG5cbiAgICAgIGlmIChoZWlnaHQudmFsdWUgIT09IG5ld0hlaWdodCkge1xuICAgICAgICByZXNpemVkID0gdHJ1ZVxuICAgICAgICBoZWlnaHQudmFsdWUgPSBuZXdIZWlnaHRcbiAgICAgICAgcHJvcHMub25TY3JvbGxIZWlnaHQgIT09IHZvaWQgMCAmJiBlbWl0KCdzY3JvbGxIZWlnaHQnLCBuZXdIZWlnaHQpXG4gICAgICAgIHVwZGF0ZVNjcm9sbGJhcldpZHRoKClcbiAgICAgIH1cbiAgICAgIGlmICh3aWR0aC52YWx1ZSAhPT0gbmV3V2lkdGgpIHtcbiAgICAgICAgcmVzaXplZCA9IHRydWVcbiAgICAgICAgd2lkdGgudmFsdWUgPSBuZXdXaWR0aFxuICAgICAgfVxuXG4gICAgICBpZiAocmVzaXplZCA9PT0gdHJ1ZSAmJiBwcm9wcy5vblJlc2l6ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGVtaXQoJ3Jlc2l6ZScsIGRhdGEpXG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Db250YWluZXJSZXNpemUgKHsgaGVpZ2h0IH0pIHtcbiAgICAgIGlmIChjb250YWluZXJIZWlnaHQudmFsdWUgIT09IGhlaWdodCkge1xuICAgICAgICBjb250YWluZXJIZWlnaHQudmFsdWUgPSBoZWlnaHRcbiAgICAgICAgdXBkYXRlU2Nyb2xsYmFyV2lkdGgoKVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbGJhcldpZHRoICgpIHtcbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUpIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBoZWlnaHQudmFsdWUgPiBjb250YWluZXJIZWlnaHQudmFsdWVcbiAgICAgICAgICA/IGdldFNjcm9sbGJhcldpZHRoKClcbiAgICAgICAgICA6IDBcblxuICAgICAgICBpZiAoc2Nyb2xsYmFyV2lkdGgudmFsdWUgIT09IHdpZHRoKSB7XG4gICAgICAgICAgc2Nyb2xsYmFyV2lkdGgudmFsdWUgPSB3aWR0aFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGFuaW1hdGVUaW1lciA9IG51bGxcblxuICAgIGNvbnN0ICRsYXlvdXQgPSB7XG4gICAgICBpbnN0YW5jZXM6IHt9LFxuICAgICAgdmlldzogY29tcHV0ZWQoKCkgPT4gcHJvcHMudmlldyksXG4gICAgICBpc0NvbnRhaW5lcjogY29tcHV0ZWQoKCkgPT4gcHJvcHMuY29udGFpbmVyKSxcblxuICAgICAgcm9vdFJlZixcblxuICAgICAgaGVpZ2h0LFxuICAgICAgY29udGFpbmVySGVpZ2h0LFxuICAgICAgc2Nyb2xsYmFyV2lkdGgsXG4gICAgICB0b3RhbFdpZHRoOiBjb21wdXRlZCgoKSA9PiB3aWR0aC52YWx1ZSArIHNjcm9sbGJhcldpZHRoLnZhbHVlKSxcblxuICAgICAgcm93czogY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgICBjb25zdCByb3dzID0gcHJvcHMudmlldy50b0xvd2VyQ2FzZSgpLnNwbGl0KCcgJylcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0b3A6IHJvd3NbIDAgXS5zcGxpdCgnJyksXG4gICAgICAgICAgbWlkZGxlOiByb3dzWyAxIF0uc3BsaXQoJycpLFxuICAgICAgICAgIGJvdHRvbTogcm93c1sgMiBdLnNwbGl0KCcnKVxuICAgICAgICB9XG4gICAgICB9KSxcblxuICAgICAgaGVhZGVyOiByZWFjdGl2ZSh7IHNpemU6IDAsIG9mZnNldDogMCwgc3BhY2U6IGZhbHNlIH0pLFxuICAgICAgcmlnaHQ6IHJlYWN0aXZlKHsgc2l6ZTogMzAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcbiAgICAgIGZvb3RlcjogcmVhY3RpdmUoeyBzaXplOiAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcbiAgICAgIGxlZnQ6IHJlYWN0aXZlKHsgc2l6ZTogMzAwLCBvZmZzZXQ6IDAsIHNwYWNlOiBmYWxzZSB9KSxcblxuICAgICAgc2Nyb2xsLFxuXG4gICAgICBhbmltYXRlICgpIHtcbiAgICAgICAgaWYgKGFuaW1hdGVUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChhbmltYXRlVGltZXIpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdxLWJvZHktLWxheW91dC1hbmltYXRlJylcbiAgICAgICAgfVxuXG4gICAgICAgIGFuaW1hdGVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGFuaW1hdGVUaW1lciA9IG51bGxcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3EtYm9keS0tbGF5b3V0LWFuaW1hdGUnKVxuICAgICAgICB9LCAxNTUpXG4gICAgICB9LFxuXG4gICAgICB1cGRhdGUgKHBhcnQsIHByb3AsIHZhbCkge1xuICAgICAgICAkbGF5b3V0WyBwYXJ0IF1bIHByb3AgXSA9IHZhbFxuICAgICAgfVxuICAgIH1cblxuICAgIHByb3ZpZGUobGF5b3V0S2V5LCAkbGF5b3V0KVxuXG4gICAgLy8gcHJldmVudCBzY3JvbGxiYXIgZmxpY2tlciB3aGlsZSByZXNpemluZyB3aW5kb3cgaGVpZ2h0XG4gICAgLy8gaWYgbm8gcGFnZSBzY3JvbGxiYXIgaXMgYWxyZWFkeSBwcmVzZW50XG4gICAgaWYgKF9fUVVBU0FSX1NTUl9TRVJWRVJfXyAhPT0gdHJ1ZSAmJiBnZXRTY3JvbGxiYXJXaWR0aCgpID4gMCkge1xuICAgICAgbGV0IHRpbWVyID0gbnVsbFxuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5ib2R5XG5cbiAgICAgIGZ1bmN0aW9uIHJlc3RvcmVTY3JvbGxiYXIgKCkge1xuICAgICAgICB0aW1lciA9IG51bGxcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1zY3JvbGxiYXInKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBoaWRlU2Nyb2xsYmFyICgpIHtcbiAgICAgICAgaWYgKHRpbWVyID09PSBudWxsKSB7XG4gICAgICAgICAgLy8gaWYgaXQgaGFzIG5vIHNjcm9sbGJhciB0aGVuIHRoZXJlJ3Mgbm90aGluZyB0byBkb1xuXG4gICAgICAgICAgaWYgKGVsLnNjcm9sbEhlaWdodCA+ICRxLnNjcmVlbi5oZWlnaHQpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hpZGUtc2Nyb2xsYmFyJylcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIH1cblxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQocmVzdG9yZVNjcm9sbGJhciwgMzAwKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVTY3JvbGxFdmVudCAoYWN0aW9uKSB7XG4gICAgICAgIGlmICh0aW1lciAhPT0gbnVsbCAmJiBhY3Rpb24gPT09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgICAgIHJlc3RvcmVTY3JvbGxiYXIoKVxuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93WyBgJHsgYWN0aW9uIH1FdmVudExpc3RlbmVyYCBdKCdyZXNpemUnLCBoaWRlU2Nyb2xsYmFyKVxuICAgICAgfVxuXG4gICAgICB3YXRjaChcbiAgICAgICAgKCkgPT4gKHByb3BzLmNvbnRhaW5lciAhPT0gdHJ1ZSA/ICdhZGQnIDogJ3JlbW92ZScpLFxuICAgICAgICB1cGRhdGVTY3JvbGxFdmVudFxuICAgICAgKVxuXG4gICAgICBwcm9wcy5jb250YWluZXIgIT09IHRydWUgJiYgdXBkYXRlU2Nyb2xsRXZlbnQoJ2FkZCcpXG5cbiAgICAgIG9uVW5tb3VudGVkKCgpID0+IHtcbiAgICAgICAgdXBkYXRlU2Nyb2xsRXZlbnQoJ3JlbW92ZScpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gaE1lcmdlU2xvdChzbG90cy5kZWZhdWx0LCBbXG4gICAgICAgIGgoUVNjcm9sbE9ic2VydmVyLCB7IG9uU2Nyb2xsOiBvblBhZ2VTY3JvbGwgfSksXG4gICAgICAgIGgoUVJlc2l6ZU9ic2VydmVyLCB7IG9uUmVzaXplOiBvblBhZ2VSZXNpemUgfSlcbiAgICAgIF0pXG5cbiAgICAgIGNvbnN0IGxheW91dCA9IGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZSxcbiAgICAgICAgcmVmOiBwcm9wcy5jb250YWluZXIgPT09IHRydWUgPyB2b2lkIDAgOiByb290UmVmLFxuICAgICAgICB0YWJpbmRleDogLTFcbiAgICAgIH0sIGNvbnRlbnQpXG5cbiAgICAgIGlmIChwcm9wcy5jb250YWluZXIgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtbGF5b3V0LWNvbnRhaW5lciBvdmVyZmxvdy1oaWRkZW4nLFxuICAgICAgICAgIHJlZjogcm9vdFJlZlxuICAgICAgICB9LCBbXG4gICAgICAgICAgaChRUmVzaXplT2JzZXJ2ZXIsIHsgb25SZXNpemU6IG9uQ29udGFpbmVyUmVzaXplIH0pLFxuICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgIGNsYXNzOiAnYWJzb2x1dGUtZnVsbCcsXG4gICAgICAgICAgICBzdHlsZTogdGFyZ2V0U3R5bGUudmFsdWVcbiAgICAgICAgICB9LCBbXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiAnc2Nyb2xsJyxcbiAgICAgICAgICAgICAgc3R5bGU6IHRhcmdldENoaWxkU3R5bGUudmFsdWVcbiAgICAgICAgICAgIH0sIFsgbGF5b3V0IF0pXG4gICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGxheW91dFxuICAgIH1cbiAgfVxufSlcbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtaXRlbVxuICAgIGNsaWNrYWJsZVxuICAgIHRhZz1cImFcIlxuICAgIDp0bz1cInJvdXRlXCJcbiAgPlxuICAgIDxxLWl0ZW0tc2VjdGlvblxuICAgICAgdi1pZj1cImljb25cIlxuICAgICAgYXZhdGFyXG4gICAgPlxuICAgICAgPHEtaWNvbiA6bmFtZT1cImljb25cIiAvPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICA8cS1pdGVtLWxhYmVsPnt7IHRpdGxlIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+e3sgY2FwdGlvbiB9fTwvcS1pdGVtLWxhYmVsPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gIDwvcS1pdGVtPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IGRlZmluZUNvbXBvbmVudCB9IGZyb20gJ3Z1ZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdFc3NlbnRpYWxMaW5rJyxcbiAgcHJvcHM6IHtcbiAgICB0aXRsZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuXG4gICAgY2FwdGlvbjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJydcbiAgICB9LFxuXG4gICAgbGluazoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJyMnXG4gICAgfSxcblxuICAgIHJvdXRlOiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcblxuICAgIGljb246IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcnXG4gICAgfVxuICB9XG59KTtcbjwvc2NyaXB0PlxuIiwiaW1wb3J0IENvbmZpZyBmcm9tIFwic3JjL3V0aWxzL2NvbmZpZ1wiO1xuaW1wb3J0IHtyZWZ9IGZyb20gXCJ2dWVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUNvbmZpZygpIHtcbiAgY29uc3QgY29uZmlnID0gQ29uZmlnLmdldCgpO1xuXG4gIGNvbnN0IHZlcnNpb24gPSByZWYoY29uZmlnLnZlcnNpb24pO1xuICBjb25zdCBkb21haW4gPSByZWYoY29uZmlnLmRvbWFpbik7XG4gIGNvbnN0IHBhdGggPSByZWYoY29uZmlnLnBhdGgpO1xuXG4gIHJldHVybiB7XG4gICAgdmVyc2lvbiwgZG9tYWluLCBwYXRoXG4gIH07XG5cbn1cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtbGF5b3V0IHZpZXc9XCJoSGggbHBSIGZGZlwiPlxuICAgIDxxLWhlYWRlciBlbGV2YXRlZD5cbiAgICAgIDxxLXRvb2xiYXI+XG4gICAgICAgIDxxLWJ0blxuICAgICAgICAgIGZsYXRcbiAgICAgICAgICBkZW5zZVxuICAgICAgICAgIHJvdW5kXG4gICAgICAgICAgaWNvbj1cIm1lbnVcIlxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJNZW51XCJcbiAgICAgICAgICBAY2xpY2s9XCJ0b2dnbGVMZWZ0RHJhd2VyXCJcbiAgICAgICAgLz5cblxuICAgICAgICA8cS10b29sYmFyLXRpdGxlPlxuICAgICAgICAgIEpvYiBUcmFja2VyXG4gICAgICAgIDwvcS10b29sYmFyLXRpdGxlPlxuXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS90b2J5dHdpZ2dlci9sYXJhdmVsLWpvYi1zdGF0dXNcIiBzdHlsZT1cImNvbG9yOiB3aGl0ZTsgdGV4dC1kZWNvcmF0aW9uOiBub25lO1wiPlxuICAgICAgICAgICAgVmVyc2lvbiB7eyB2ZXJzaW9uIH19XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvcS10b29sYmFyPlxuICAgIDwvcS1oZWFkZXI+XG5cbiAgICA8cS1kcmF3ZXJcbiAgICAgIHYtbW9kZWw9XCJsZWZ0RHJhd2VyT3BlblwiXG4gICAgICBzaG93LWlmLWFib3ZlXG4gICAgICBib3JkZXJlZFxuICAgID5cbiAgICAgIDxxLWxpc3Q+XG4gICAgICAgIDxxLWl0ZW0tbGFiZWxcbiAgICAgICAgICBoZWFkZXJcbiAgICAgICAgPlxuICAgICAgICAgIEVzc2VudGlhbCBMaW5rc1xuICAgICAgICA8L3EtaXRlbS1sYWJlbD5cblxuICAgICAgICA8RXNzZW50aWFsTGlua1xuICAgICAgICAgIHYtZm9yPVwibGluayBpbiBlc3NlbnRpYWxMaW5rc1wiXG4gICAgICAgICAgOmtleT1cImxpbmsudGl0bGVcIlxuICAgICAgICAgIHYtYmluZD1cImxpbmtcIlxuICAgICAgICAvPlxuICAgICAgPC9xLWxpc3Q+XG4gICAgPC9xLWRyYXdlcj5cblxuICAgIDxxLXBhZ2UtY29udGFpbmVyPlxuICAgICAgPHJvdXRlci12aWV3Lz5cbiAgICA8L3EtcGFnZS1jb250YWluZXI+XG4gIDwvcS1sYXlvdXQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHtkZWZpbmVDb21wb25lbnQsIHJlZn0gZnJvbSAndnVlJztcbmltcG9ydCBFc3NlbnRpYWxMaW5rIGZyb20gJ2NvbXBvbmVudHMvRXNzZW50aWFsTGluay52dWUnO1xuaW1wb3J0IHt1c2VDb25maWd9IGZyb20gJ3NyYy9jb21wb3N0YWJsZXMvY29uZmlndXJhdGlvbic7XG5cbmNvbnN0IGxpbmtzTGlzdCA9IFtcbiAge1xuICAgIHRpdGxlOiAnRGFzaGJvYXJkJyxcbiAgICBjYXB0aW9uOiAnSm9iIGRhc2hib2FyZC4nLFxuICAgIGljb246ICdzY2hvb2wnLFxuICAgIHJvdXRlOiB7bmFtZTogJ2Rhc2hib2FyZCd9XG4gIH0sXG4gIHtcbiAgICB0aXRsZTogJ0pvYnMnLFxuICAgIGNhcHRpb246ICdBbGwgdHJhY2tlZCBqb2JzLicsXG4gICAgaWNvbjogJ3NjaG9vbCcsXG4gICAgcm91dGU6IHtuYW1lOiAnam9icy5pbmRleCd9XG4gIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAnTWFpbkxheW91dCcsXG5cbiAgY29tcG9uZW50czoge1xuICAgIEVzc2VudGlhbExpbmtcbiAgfSxcblxuICBzZXR1cCgpIHtcbiAgICBjb25zdCBsZWZ0RHJhd2VyT3BlbiA9IHJlZihmYWxzZSlcblxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHZlcnNpb246IHVzZUNvbmZpZygpLnZlcnNpb24sXG4gICAgICBlc3NlbnRpYWxMaW5rczogbGlua3NMaXN0LFxuICAgICAgbGVmdERyYXdlck9wZW4sXG4gICAgICB0b2dnbGVMZWZ0RHJhd2VyKCkge1xuICAgICAgICBsZWZ0RHJhd2VyT3Blbi52YWx1ZSA9ICFsZWZ0RHJhd2VyT3Blbi52YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6WyJzaXplIiwib2Zmc2V0IiwiY3NzIiwidmFsdWUiLCJzdHlsZSIsInBvc2l0aW9uIiwiaGVpZ2h0Iiwid2lkdGgiLCJfc2ZjX21haW4iLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlVk5vZGUiLCJfd2l0aEN0eCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl9vcGVuQmxvY2siLCJfbWVyZ2VQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsSUFBQSxnQkFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVDtBQUFBLEVBRUQsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLCtCQUNHLE1BQU0sV0FBVyxPQUFPLGdCQUFnQjtBQUFBLElBQzVDO0FBRUQsV0FBTyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sUUFBUSxNQUFLLEdBQUksTUFBTSxNQUFNLE9BQU8sQ0FBQztBQUFBLEVBQ3JFO0FBQ0gsQ0FBQztBQ2ZELElBQUEsV0FBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsRUFDUjtBQUFBLEVBRUQsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLHdDQUNHLE1BQU0sVUFBVSxPQUFPLHNCQUFzQjtBQUFBLElBQ2pEO0FBRUQsV0FBTyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sUUFBUSxPQUFPLE1BQU0sVUFBUyxHQUFJLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBQSxFQUN0RjtBQUNILENBQUM7QUNaRCxJQUFBLFVBQWUsZ0JBQWdCO0FBQUEsRUFDN0IsTUFBTTtBQUFB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
