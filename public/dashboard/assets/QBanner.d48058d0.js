import { r as ref, I as isRuntimeSsrPreHydration, o as onMounted, k as onBeforeUnmount, u as noop, n as nextTick, h, g as getCurrentInstance, p as listenOpts, Z as onDeactivated, $ as Platform, c as computed } from "./index.07765cf9.js";
import { c as createComponent, h as hSlot } from "./render.34f10d21.js";
import { i as vmIsDestroyed } from "./use-router-link.70d2557d.js";
import { u as useDarkProps, a as useDark } from "./QItem.2946db6a.js";
function useCanRender() {
  const canRender = ref(!isRuntimeSsrPreHydration.value);
  if (canRender.value === false) {
    onMounted(() => {
      canRender.value = true;
    });
  }
  return canRender;
}
const hasObserver = typeof ResizeObserver !== "undefined";
const resizeProps = hasObserver === true ? {} : {
  style: "display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",
  url: "about:blank"
};
var QResizeObserver = createComponent({
  name: "QResizeObserver",
  props: {
    debounce: {
      type: [String, Number],
      default: 100
    }
  },
  emits: ["resize"],
  setup(props, { emit }) {
    let timer = null, targetEl, size = { width: -1, height: -1 };
    function trigger(immediately) {
      if (immediately === true || props.debounce === 0 || props.debounce === "0") {
        emitEvent();
      } else if (timer === null) {
        timer = setTimeout(emitEvent, props.debounce);
      }
    }
    function emitEvent() {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
      if (targetEl) {
        const { offsetWidth: width, offsetHeight: height } = targetEl;
        if (width !== size.width || height !== size.height) {
          size = { width, height };
          emit("resize", size);
        }
      }
    }
    const { proxy } = getCurrentInstance();
    if (hasObserver === true) {
      let observer;
      const init = (stop) => {
        targetEl = proxy.$el.parentNode;
        if (targetEl) {
          observer = new ResizeObserver(trigger);
          observer.observe(targetEl);
          emitEvent();
        } else if (stop !== true) {
          nextTick(() => {
            init(true);
          });
        }
      };
      onMounted(() => {
        init();
      });
      onBeforeUnmount(() => {
        timer !== null && clearTimeout(timer);
        if (observer !== void 0) {
          if (observer.disconnect !== void 0) {
            observer.disconnect();
          } else if (targetEl) {
            observer.unobserve(targetEl);
          }
        }
      });
      return noop;
    } else {
      let cleanup = function() {
        if (timer !== null) {
          clearTimeout(timer);
          timer = null;
        }
        if (curDocView !== void 0) {
          if (curDocView.removeEventListener !== void 0) {
            curDocView.removeEventListener("resize", trigger, listenOpts.passive);
          }
          curDocView = void 0;
        }
      }, onObjLoad = function() {
        cleanup();
        if (targetEl && targetEl.contentDocument) {
          curDocView = targetEl.contentDocument.defaultView;
          curDocView.addEventListener("resize", trigger, listenOpts.passive);
          emitEvent();
        }
      };
      const canRender = useCanRender();
      let curDocView;
      onMounted(() => {
        nextTick(() => {
          targetEl = proxy.$el;
          targetEl && onObjLoad();
        });
      });
      onBeforeUnmount(cleanup);
      proxy.trigger = trigger;
      return () => {
        if (canRender.value === true) {
          return h("object", {
            style: resizeProps.style,
            tabindex: -1,
            type: "text/html",
            data: resizeProps.url,
            "aria-hidden": "true",
            onLoad: onObjLoad
          });
        }
      };
    }
  }
});
function useTimeout() {
  let timer = null;
  const vm = getCurrentInstance();
  function removeTimeout() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }
  onDeactivated(removeTimeout);
  onBeforeUnmount(removeTimeout);
  return {
    removeTimeout,
    registerTimeout(fn, delay) {
      removeTimeout();
      if (vmIsDestroyed(vm) === false) {
        timer = setTimeout(fn, delay);
      }
    }
  };
}
const modifiersAll = {
  left: true,
  right: true,
  up: true,
  down: true,
  horizontal: true,
  vertical: true
};
const directionList = Object.keys(modifiersAll);
modifiersAll.all = true;
function getModifierDirections(mod) {
  const dir = {};
  for (const direction of directionList) {
    if (mod[direction] === true) {
      dir[direction] = true;
    }
  }
  if (Object.keys(dir).length === 0) {
    return modifiersAll;
  }
  if (dir.horizontal === true) {
    dir.left = dir.right = true;
  } else if (dir.left === true && dir.right === true) {
    dir.horizontal = true;
  }
  if (dir.vertical === true) {
    dir.up = dir.down = true;
  } else if (dir.up === true && dir.down === true) {
    dir.vertical = true;
  }
  if (dir.horizontal === true && dir.vertical === true) {
    dir.all = true;
  }
  return dir;
}
function shouldStart(evt, ctx) {
  return ctx.event === void 0 && evt.target !== void 0 && evt.target.draggable !== true && typeof ctx.handler === "function" && evt.target.nodeName.toUpperCase() !== "INPUT" && (evt.qClonedBy === void 0 || evt.qClonedBy.indexOf(ctx.uid) === -1);
}
function clearSelection() {
  if (window.getSelection !== void 0) {
    const selection = window.getSelection();
    if (selection.empty !== void 0) {
      selection.empty();
    } else if (selection.removeAllRanges !== void 0) {
      selection.removeAllRanges();
      Platform.is.mobile !== true && selection.addRange(document.createRange());
    }
  } else if (document.selection !== void 0) {
    document.selection.empty();
  }
}
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
export { QResizeObserver as Q, QBanner as a, clearSelection as c, getModifierDirections as g, shouldStart as s, useTimeout as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUJhbm5lci5kNDgwNThkMC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWNhbi1yZW5kZXIuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9yZXNpemUtb2JzZXJ2ZXIvUVJlc2l6ZU9ic2VydmVyLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXRpbWVvdXQuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvdXRpbHMvcHJpdmF0ZS90b3VjaC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL3NlbGVjdGlvbi5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2Jhbm5lci9RQmFubmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG4vLyB1c2luZyBpdCB0byBtYW5hZ2UgU1NSIHJlbmRlcmluZyB3aXRoIGJlc3QgcGVyZm9ybWFuY2VcbmltcG9ydCB7IGlzUnVudGltZVNzclByZUh5ZHJhdGlvbiB9IGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgY2FuUmVuZGVyID0gcmVmKCFpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUpXG5cbiAgaWYgKGNhblJlbmRlci52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgY2FuUmVuZGVyLnZhbHVlID0gdHJ1ZVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gY2FuUmVuZGVyXG59XG4iLCJpbXBvcnQgeyBoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlLCBuZXh0VGljayB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUNhblJlbmRlciBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1jYW4tcmVuZGVyLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGxpc3Rlbk9wdHMsIG5vb3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcblxuY29uc3QgaGFzT2JzZXJ2ZXIgPSB0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnXG5jb25zdCByZXNpemVQcm9wcyA9IGhhc09ic2VydmVyID09PSB0cnVlXG4gID8ge31cbiAgOiB7XG4gICAgICBzdHlsZTogJ2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47cG9pbnRlci1ldmVudHM6bm9uZTt6LWluZGV4Oi0xOycsXG4gICAgICB1cmw6ICdhYm91dDpibGFuaydcbiAgICB9XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUmVzaXplT2JzZXJ2ZXInLFxuXG4gIHByb3BzOiB7XG4gICAgZGVib3VuY2U6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDEwMFxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAncmVzaXplJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBlbWl0IH0pIHtcbiAgICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fKSB7IHJldHVybiBub29wIH1cblxuICAgIGxldCB0aW1lciA9IG51bGwsIHRhcmdldEVsLCBzaXplID0geyB3aWR0aDogLTEsIGhlaWdodDogLTEgfVxuXG4gICAgZnVuY3Rpb24gdHJpZ2dlciAoaW1tZWRpYXRlbHkpIHtcbiAgICAgIGlmIChpbW1lZGlhdGVseSA9PT0gdHJ1ZSB8fCBwcm9wcy5kZWJvdW5jZSA9PT0gMCB8fCBwcm9wcy5kZWJvdW5jZSA9PT0gJzAnKSB7XG4gICAgICAgIGVtaXRFdmVudCgpXG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aW1lciA9PT0gbnVsbCkge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZW1pdEV2ZW50LCBwcm9wcy5kZWJvdW5jZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbWl0RXZlbnQgKCkge1xuICAgICAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXRFbCkge1xuICAgICAgICBjb25zdCB7IG9mZnNldFdpZHRoOiB3aWR0aCwgb2Zmc2V0SGVpZ2h0OiBoZWlnaHQgfSA9IHRhcmdldEVsXG5cbiAgICAgICAgaWYgKHdpZHRoICE9PSBzaXplLndpZHRoIHx8IGhlaWdodCAhPT0gc2l6ZS5oZWlnaHQpIHtcbiAgICAgICAgICBzaXplID0geyB3aWR0aCwgaGVpZ2h0IH1cbiAgICAgICAgICBlbWl0KCdyZXNpemUnLCBzaXplKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGlmIChoYXNPYnNlcnZlciA9PT0gdHJ1ZSkge1xuICAgICAgbGV0IG9ic2VydmVyXG5cbiAgICAgIC8vIGluaXRpYWxpemUgYXMgc29vbiBhcyBwb3NzaWJsZVxuICAgICAgY29uc3QgaW5pdCA9IHN0b3AgPT4ge1xuICAgICAgICB0YXJnZXRFbCA9IHByb3h5LiRlbC5wYXJlbnROb2RlXG5cbiAgICAgICAgaWYgKHRhcmdldEVsKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIodHJpZ2dlcilcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldEVsKVxuICAgICAgICAgIGVtaXRFdmVudCgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RvcCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIG5leHRUaWNrKCgpID0+IHsgaW5pdCh0cnVlKSB9KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uTW91bnRlZCgoKSA9PiB7IGluaXQoKSB9KVxuXG4gICAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgICB0aW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQodGltZXIpXG5cbiAgICAgICAgaWYgKG9ic2VydmVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIuZGlzY29ubmVjdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAodGFyZ2V0RWwpIHsgLy8gRkYgZm9yIEFuZHJvaWRcbiAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZSh0YXJnZXRFbClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBub29wXG4gICAgfVxuICAgIGVsc2UgeyAvLyBubyBvYnNlcnZlciwgc28gZmFsbGJhY2sgdG8gb2xkIGlmcmFtZSBtZXRob2RcbiAgICAgIGNvbnN0IGNhblJlbmRlciA9IHVzZUNhblJlbmRlcigpXG5cbiAgICAgIGxldCBjdXJEb2NWaWV3XG5cbiAgICAgIGZ1bmN0aW9uIGNsZWFudXAgKCkge1xuICAgICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VyRG9jVmlldyAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgLy8gaU9TIGlzIGZ1enp5LCBuZWVkIHRvIGNoZWNrIGl0IGZpcnN0XG4gICAgICAgICAgaWYgKGN1ckRvY1ZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBjdXJEb2NWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRyaWdnZXIsIGxpc3Rlbk9wdHMucGFzc2l2ZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VyRG9jVmlldyA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uT2JqTG9hZCAoKSB7XG4gICAgICAgIGNsZWFudXAoKVxuXG4gICAgICAgIGlmICh0YXJnZXRFbCAmJiB0YXJnZXRFbC5jb250ZW50RG9jdW1lbnQpIHtcbiAgICAgICAgICBjdXJEb2NWaWV3ID0gdGFyZ2V0RWwuY29udGVudERvY3VtZW50LmRlZmF1bHRWaWV3XG4gICAgICAgICAgY3VyRG9jVmlldy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0cmlnZ2VyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgICAgICAgZW1pdEV2ZW50KClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgdGFyZ2V0RWwgPSBwcm94eS4kZWxcbiAgICAgICAgICB0YXJnZXRFbCAmJiBvbk9iakxvYWQoKVxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgICAgb25CZWZvcmVVbm1vdW50KGNsZWFudXApXG5cbiAgICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kXG4gICAgICBwcm94eS50cmlnZ2VyID0gdHJpZ2dlclxuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoY2FuUmVuZGVyLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIGgoJ29iamVjdCcsIHtcbiAgICAgICAgICAgIHN0eWxlOiByZXNpemVQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgIHRhYmluZGV4OiAtMSwgLy8gZml4IGZvciBGaXJlZm94XG4gICAgICAgICAgICB0eXBlOiAndGV4dC9odG1sJyxcbiAgICAgICAgICAgIGRhdGE6IHJlc2l6ZVByb3BzLnVybCxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgICAgIG9uTG9hZDogb25PYmpMb2FkXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB2bUlzRGVzdHJveWVkIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bSdcblxuLypcbiAqIFVzYWdlOlxuICogICAgcmVnaXN0ZXJUaW1lb3V0KGZuWywgZGVsYXldKVxuICogICAgcmVtb3ZlVGltZW91dCgpXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgdGltZXIgPSBudWxsXG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBmdW5jdGlvbiByZW1vdmVUaW1lb3V0ICgpIHtcbiAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgIHRpbWVyID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZWQocmVtb3ZlVGltZW91dClcbiAgb25CZWZvcmVVbm1vdW50KHJlbW92ZVRpbWVvdXQpXG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmVUaW1lb3V0LFxuXG4gICAgcmVnaXN0ZXJUaW1lb3V0IChmbiwgZGVsYXkpIHtcbiAgICAgIHJlbW92ZVRpbWVvdXQodGltZXIpXG5cbiAgICAgIGlmICh2bUlzRGVzdHJveWVkKHZtKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZuLCBkZWxheSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImNvbnN0IG1vZGlmaWVyc0FsbCA9IHtcbiAgbGVmdDogdHJ1ZSxcbiAgcmlnaHQ6IHRydWUsXG4gIHVwOiB0cnVlLFxuICBkb3duOiB0cnVlLFxuICBob3Jpem9udGFsOiB0cnVlLFxuICB2ZXJ0aWNhbDogdHJ1ZVxufVxuXG5jb25zdCBkaXJlY3Rpb25MaXN0ID0gT2JqZWN0LmtleXMobW9kaWZpZXJzQWxsKVxuXG5tb2RpZmllcnNBbGwuYWxsID0gdHJ1ZVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9kaWZpZXJEaXJlY3Rpb25zIChtb2QpIHtcbiAgY29uc3QgZGlyID0ge31cblxuICBmb3IgKGNvbnN0IGRpcmVjdGlvbiBvZiBkaXJlY3Rpb25MaXN0KSB7XG4gICAgaWYgKG1vZFsgZGlyZWN0aW9uIF0gPT09IHRydWUpIHtcbiAgICAgIGRpclsgZGlyZWN0aW9uIF0gPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgaWYgKE9iamVjdC5rZXlzKGRpcikubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG1vZGlmaWVyc0FsbFxuICB9XG5cbiAgaWYgKGRpci5ob3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgZGlyLmxlZnQgPSBkaXIucmlnaHQgPSB0cnVlXG4gIH1cbiAgZWxzZSBpZiAoZGlyLmxlZnQgPT09IHRydWUgJiYgZGlyLnJpZ2h0ID09PSB0cnVlKSB7XG4gICAgZGlyLmhvcml6b250YWwgPSB0cnVlXG4gIH1cblxuICBpZiAoZGlyLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgZGlyLnVwID0gZGlyLmRvd24gPSB0cnVlXG4gIH1cbiAgZWxzZSBpZiAoZGlyLnVwID09PSB0cnVlICYmIGRpci5kb3duID09PSB0cnVlKSB7XG4gICAgZGlyLnZlcnRpY2FsID0gdHJ1ZVxuICB9XG5cbiAgaWYgKGRpci5ob3Jpem9udGFsID09PSB0cnVlICYmIGRpci52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgIGRpci5hbGwgPSB0cnVlXG4gIH1cblxuICByZXR1cm4gZGlyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRTdGFydCAoZXZ0LCBjdHgpIHtcbiAgcmV0dXJuIGN0eC5ldmVudCA9PT0gdm9pZCAwXG4gICAgJiYgZXZ0LnRhcmdldCAhPT0gdm9pZCAwXG4gICAgJiYgZXZ0LnRhcmdldC5kcmFnZ2FibGUgIT09IHRydWVcbiAgICAmJiB0eXBlb2YgY3R4LmhhbmRsZXIgPT09ICdmdW5jdGlvbidcbiAgICAmJiBldnQudGFyZ2V0Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgIT09ICdJTlBVVCdcbiAgICAmJiAoZXZ0LnFDbG9uZWRCeSA9PT0gdm9pZCAwIHx8IGV2dC5xQ2xvbmVkQnkuaW5kZXhPZihjdHgudWlkKSA9PT0gLTEpXG59XG4iLCJpbXBvcnQgUGxhdGZvcm0gZnJvbSAnLi4vLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyU2VsZWN0aW9uICgpIHtcbiAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24gIT09IHZvaWQgMCkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKVxuICAgIGlmIChzZWxlY3Rpb24uZW1wdHkgIT09IHZvaWQgMCkge1xuICAgICAgc2VsZWN0aW9uLmVtcHR5KClcbiAgICB9XG4gICAgZWxzZSBpZiAoc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcyAhPT0gdm9pZCAwKSB7XG4gICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgIFBsYXRmb3JtLmlzLm1vYmlsZSAhPT0gdHJ1ZSAmJiBzZWxlY3Rpb24uYWRkUmFuZ2UoZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKSlcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uICE9PSB2b2lkIDApIHtcbiAgICBkb2N1bWVudC5zZWxlY3Rpb24uZW1wdHkoKVxuICB9XG59XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5cbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRQmFubmVyJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZURhcmtQcm9wcyxcblxuICAgIGlubGluZUFjdGlvbnM6IEJvb2xlYW4sXG4gICAgZGVuc2U6IEJvb2xlYW4sXG4gICAgcm91bmRlZDogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsICRxKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1iYW5uZXIgcm93IGl0ZW1zLWNlbnRlcidcbiAgICAgICsgKHByb3BzLmRlbnNlID09PSB0cnVlID8gJyBxLWJhbm5lci0tZGVuc2UnIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtYmFubmVyLS1kYXJrIHEtZGFyaycgOiAnJylcbiAgICAgICsgKHByb3BzLnJvdW5kZWQgPT09IHRydWUgPyAnIHJvdW5kZWQtYm9yZGVycycgOiAnJylcbiAgICApXG5cbiAgICBjb25zdCBhY3Rpb25DbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1iYW5uZXJfX2FjdGlvbnMgcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZCdcbiAgICAgICsgYCBjb2wtJHsgcHJvcHMuaW5saW5lQWN0aW9ucyA9PT0gdHJ1ZSA/ICdhdXRvJyA6ICdhbGwnIH1gXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWJhbm5lcl9fYXZhdGFyIGNvbC1hdXRvIHJvdyBpdGVtcy1jZW50ZXIgc2VsZi1zdGFydCdcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHMuYXZhdGFyKSksXG5cbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1iYW5uZXJfX2NvbnRlbnQgY29sIHRleHQtYm9keTInXG4gICAgICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICAgICAgXVxuXG4gICAgICBjb25zdCBhY3Rpb25zID0gaFNsb3Qoc2xvdHMuYWN0aW9uKVxuICAgICAgYWN0aW9ucyAhPT0gdm9pZCAwICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6IGFjdGlvbkNsYXNzLnZhbHVlIH0sIGFjdGlvbnMpXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlXG4gICAgICAgICAgKyAocHJvcHMuaW5saW5lQWN0aW9ucyA9PT0gZmFsc2UgJiYgYWN0aW9ucyAhPT0gdm9pZCAwID8gJyBxLWJhbm5lci0tdG9wLXBhZGRpbmcnIDogJycpLFxuICAgICAgICByb2xlOiAnYWxlcnQnXG4gICAgICB9LCBjaGlsZClcbiAgICB9XG4gIH1cbn0pXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUtlLFNBQUEsZUFBWTtBQUN6QixRQUFNLFlBQVksSUFBSSxDQUFDLHlCQUF5QixLQUFLO0FBRXJELE1BQUksVUFBVSxVQUFVLE9BQU87QUFDN0IsY0FBVSxNQUFNO0FBQ2QsZ0JBQVUs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
