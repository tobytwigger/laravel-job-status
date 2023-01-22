import { r as ref, I as isRuntimeSsrPreHydration, o as onMounted, k as onBeforeUnmount, u as noop, n as nextTick, h, g as getCurrentInstance, p as listenOpts, a0 as onDeactivated, a1 as Platform } from "./index.bb057e5d.js";
import { c as createComponent } from "./render.61be68e7.js";
import { e as vmIsDestroyed } from "./use-router-link.53b142c1.js";
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
export { QResizeObserver as Q, clearSelection as c, getModifierDirections as g, shouldStart as s, useTimeout as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmY2OTM3MTMyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtY2FuLXJlbmRlci5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3Jlc2l6ZS1vYnNlcnZlci9RUmVzaXplT2JzZXJ2ZXIuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtdGltZW91dC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy91dGlscy9wcml2YXRlL3RvdWNoLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL3V0aWxzL3ByaXZhdGUvc2VsZWN0aW9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZiwgb25Nb3VudGVkIH0gZnJvbSAndnVlJ1xuXG4vLyB1c2luZyBpdCB0byBtYW5hZ2UgU1NSIHJlbmRlcmluZyB3aXRoIGJlc3QgcGVyZm9ybWFuY2VcbmltcG9ydCB7IGlzUnVudGltZVNzclByZUh5ZHJhdGlvbiB9IGZyb20gJy4uLy4uL3BsdWdpbnMvUGxhdGZvcm0uanMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgY2FuUmVuZGVyID0gcmVmKCFpc1J1bnRpbWVTc3JQcmVIeWRyYXRpb24udmFsdWUpXG5cbiAgaWYgKGNhblJlbmRlci52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgY2FuUmVuZGVyLnZhbHVlID0gdHJ1ZVxuICAgIH0pXG4gIH1cblxuICByZXR1cm4gY2FuUmVuZGVyXG59XG4iLCJpbXBvcnQgeyBoLCBvbk1vdW50ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlLCBuZXh0VGljayB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZUNhblJlbmRlciBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1jYW4tcmVuZGVyLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGxpc3Rlbk9wdHMsIG5vb3AgfSBmcm9tICcuLi8uLi91dGlscy9ldmVudC5qcydcblxuY29uc3QgaGFzT2JzZXJ2ZXIgPSB0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnXG5jb25zdCByZXNpemVQcm9wcyA9IGhhc09ic2VydmVyID09PSB0cnVlXG4gID8ge31cbiAgOiB7XG4gICAgICBzdHlsZTogJ2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3JpZ2h0OjA7Ym90dG9tOjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtvdmVyZmxvdzpoaWRkZW47cG9pbnRlci1ldmVudHM6bm9uZTt6LWluZGV4Oi0xOycsXG4gICAgICB1cmw6ICdhYm91dDpibGFuaydcbiAgICB9XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUmVzaXplT2JzZXJ2ZXInLFxuXG4gIHByb3BzOiB7XG4gICAgZGVib3VuY2U6IHtcbiAgICAgIHR5cGU6IFsgU3RyaW5nLCBOdW1iZXIgXSxcbiAgICAgIGRlZmF1bHQ6IDEwMFxuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAncmVzaXplJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBlbWl0IH0pIHtcbiAgICBpZiAoX19RVUFTQVJfU1NSX1NFUlZFUl9fKSB7IHJldHVybiBub29wIH1cblxuICAgIGxldCB0aW1lciA9IG51bGwsIHRhcmdldEVsLCBzaXplID0geyB3aWR0aDogLTEsIGhlaWdodDogLTEgfVxuXG4gICAgZnVuY3Rpb24gdHJpZ2dlciAoaW1tZWRpYXRlbHkpIHtcbiAgICAgIGlmIChpbW1lZGlhdGVseSA9PT0gdHJ1ZSB8fCBwcm9wcy5kZWJvdW5jZSA9PT0gMCB8fCBwcm9wcy5kZWJvdW5jZSA9PT0gJzAnKSB7XG4gICAgICAgIGVtaXRFdmVudCgpXG4gICAgICB9XG4gICAgICBlbHNlIGlmICh0aW1lciA9PT0gbnVsbCkge1xuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoZW1pdEV2ZW50LCBwcm9wcy5kZWJvdW5jZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbWl0RXZlbnQgKCkge1xuICAgICAgaWYgKHRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmICh0YXJnZXRFbCkge1xuICAgICAgICBjb25zdCB7IG9mZnNldFdpZHRoOiB3aWR0aCwgb2Zmc2V0SGVpZ2h0OiBoZWlnaHQgfSA9IHRhcmdldEVsXG5cbiAgICAgICAgaWYgKHdpZHRoICE9PSBzaXplLndpZHRoIHx8IGhlaWdodCAhPT0gc2l6ZS5oZWlnaHQpIHtcbiAgICAgICAgICBzaXplID0geyB3aWR0aCwgaGVpZ2h0IH1cbiAgICAgICAgICBlbWl0KCdyZXNpemUnLCBzaXplKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgeyBwcm94eSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICAgIGlmIChoYXNPYnNlcnZlciA9PT0gdHJ1ZSkge1xuICAgICAgbGV0IG9ic2VydmVyXG5cbiAgICAgIC8vIGluaXRpYWxpemUgYXMgc29vbiBhcyBwb3NzaWJsZVxuICAgICAgY29uc3QgaW5pdCA9IHN0b3AgPT4ge1xuICAgICAgICB0YXJnZXRFbCA9IHByb3h5LiRlbC5wYXJlbnROb2RlXG5cbiAgICAgICAgaWYgKHRhcmdldEVsKSB7XG4gICAgICAgICAgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIodHJpZ2dlcilcbiAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldEVsKVxuICAgICAgICAgIGVtaXRFdmVudCgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoc3RvcCAhPT0gdHJ1ZSkge1xuICAgICAgICAgIG5leHRUaWNrKCgpID0+IHsgaW5pdCh0cnVlKSB9KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIG9uTW91bnRlZCgoKSA9PiB7IGluaXQoKSB9KVxuXG4gICAgICBvbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICAgICAgICB0aW1lciAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQodGltZXIpXG5cbiAgICAgICAgaWYgKG9ic2VydmVyICE9PSB2b2lkIDApIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIuZGlzY29ubmVjdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAodGFyZ2V0RWwpIHsgLy8gRkYgZm9yIEFuZHJvaWRcbiAgICAgICAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZSh0YXJnZXRFbClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAgIHJldHVybiBub29wXG4gICAgfVxuICAgIGVsc2UgeyAvLyBubyBvYnNlcnZlciwgc28gZmFsbGJhY2sgdG8gb2xkIGlmcmFtZSBtZXRob2RcbiAgICAgIGNvbnN0IGNhblJlbmRlciA9IHVzZUNhblJlbmRlcigpXG5cbiAgICAgIGxldCBjdXJEb2NWaWV3XG5cbiAgICAgIGZ1bmN0aW9uIGNsZWFudXAgKCkge1xuICAgICAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgICAgdGltZXIgPSBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3VyRG9jVmlldyAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgLy8gaU9TIGlzIGZ1enp5LCBuZWVkIHRvIGNoZWNrIGl0IGZpcnN0XG4gICAgICAgICAgaWYgKGN1ckRvY1ZpZXcucmVtb3ZlRXZlbnRMaXN0ZW5lciAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgICBjdXJEb2NWaWV3LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRyaWdnZXIsIGxpc3Rlbk9wdHMucGFzc2l2ZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VyRG9jVmlldyA9IHZvaWQgMFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uT2JqTG9hZCAoKSB7XG4gICAgICAgIGNsZWFudXAoKVxuXG4gICAgICAgIGlmICh0YXJnZXRFbCAmJiB0YXJnZXRFbC5jb250ZW50RG9jdW1lbnQpIHtcbiAgICAgICAgICBjdXJEb2NWaWV3ID0gdGFyZ2V0RWwuY29udGVudERvY3VtZW50LmRlZmF1bHRWaWV3XG4gICAgICAgICAgY3VyRG9jVmlldy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0cmlnZ2VyLCBsaXN0ZW5PcHRzLnBhc3NpdmUpXG4gICAgICAgICAgZW1pdEV2ZW50KClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgdGFyZ2V0RWwgPSBwcm94eS4kZWxcbiAgICAgICAgICB0YXJnZXRFbCAmJiBvbk9iakxvYWQoKVxuICAgICAgICB9KVxuICAgICAgfSlcblxuICAgICAgb25CZWZvcmVVbm1vdW50KGNsZWFudXApXG5cbiAgICAgIC8vIGV4cG9zZSBwdWJsaWMgbWV0aG9kXG4gICAgICBwcm94eS50cmlnZ2VyID0gdHJpZ2dlclxuXG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBpZiAoY2FuUmVuZGVyLnZhbHVlID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIGgoJ29iamVjdCcsIHtcbiAgICAgICAgICAgIHN0eWxlOiByZXNpemVQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgIHRhYmluZGV4OiAtMSwgLy8gZml4IGZvciBGaXJlZm94XG4gICAgICAgICAgICB0eXBlOiAndGV4dC9odG1sJyxcbiAgICAgICAgICAgIGRhdGE6IHJlc2l6ZVByb3BzLnVybCxcbiAgICAgICAgICAgICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbiAgICAgICAgICAgIG9uTG9hZDogb25PYmpMb2FkXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IG9uRGVhY3RpdmF0ZWQsIG9uQmVmb3JlVW5tb3VudCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyB2bUlzRGVzdHJveWVkIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bSdcblxuLypcbiAqIFVzYWdlOlxuICogICAgcmVnaXN0ZXJUaW1lb3V0KGZuWywgZGVsYXldKVxuICogICAgcmVtb3ZlVGltZW91dCgpXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICBsZXQgdGltZXIgPSBudWxsXG4gIGNvbnN0IHZtID0gZ2V0Q3VycmVudEluc3RhbmNlKClcblxuICBmdW5jdGlvbiByZW1vdmVUaW1lb3V0ICgpIHtcbiAgICBpZiAodGltZXIgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgIHRpbWVyID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZWQocmVtb3ZlVGltZW91dClcbiAgb25CZWZvcmVVbm1vdW50KHJlbW92ZVRpbWVvdXQpXG5cbiAgcmV0dXJuIHtcbiAgICByZW1vdmVUaW1lb3V0LFxuXG4gICAgcmVnaXN0ZXJUaW1lb3V0IChmbiwgZGVsYXkpIHtcbiAgICAgIHJlbW92ZVRpbWVvdXQodGltZXIpXG5cbiAgICAgIGlmICh2bUlzRGVzdHJveWVkKHZtKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KGZuLCBkZWxheSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImNvbnN0IG1vZGlmaWVyc0FsbCA9IHtcbiAgbGVmdDogdHJ1ZSxcbiAgcmlnaHQ6IHRydWUsXG4gIHVwOiB0cnVlLFxuICBkb3duOiB0cnVlLFxuICBob3Jpem9udGFsOiB0cnVlLFxuICB2ZXJ0aWNhbDogdHJ1ZVxufVxuXG5jb25zdCBkaXJlY3Rpb25MaXN0ID0gT2JqZWN0LmtleXMobW9kaWZpZXJzQWxsKVxuXG5tb2RpZmllcnNBbGwuYWxsID0gdHJ1ZVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9kaWZpZXJEaXJlY3Rpb25zIChtb2QpIHtcbiAgY29uc3QgZGlyID0ge31cblxuICBmb3IgKGNvbnN0IGRpcmVjdGlvbiBvZiBkaXJlY3Rpb25MaXN0KSB7XG4gICAgaWYgKG1vZFsgZGlyZWN0aW9uIF0gPT09IHRydWUpIHtcbiAgICAgIGRpclsgZGlyZWN0aW9uIF0gPSB0cnVlXG4gICAgfVxuICB9XG5cbiAgaWYgKE9iamVjdC5rZXlzKGRpcikubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG1vZGlmaWVyc0FsbFxuICB9XG5cbiAgaWYgKGRpci5ob3Jpem9udGFsID09PSB0cnVlKSB7XG4gICAgZGlyLmxlZnQgPSBkaXIucmlnaHQgPSB0cnVlXG4gIH1cbiAgZWxzZSBpZiAoZGlyLmxlZnQgPT09IHRydWUgJiYgZGlyLnJpZ2h0ID09PSB0cnVlKSB7XG4gICAgZGlyLmhvcml6b250YWwgPSB0cnVlXG4gIH1cblxuICBpZiAoZGlyLnZlcnRpY2FsID09PSB0cnVlKSB7XG4gICAgZGlyLnVwID0gZGlyLmRvd24gPSB0cnVlXG4gIH1cbiAgZWxzZSBpZiAoZGlyLnVwID09PSB0cnVlICYmIGRpci5kb3duID09PSB0cnVlKSB7XG4gICAgZGlyLnZlcnRpY2FsID0gdHJ1ZVxuICB9XG5cbiAgaWYgKGRpci5ob3Jpem9udGFsID09PSB0cnVlICYmIGRpci52ZXJ0aWNhbCA9PT0gdHJ1ZSkge1xuICAgIGRpci5hbGwgPSB0cnVlXG4gIH1cblxuICByZXR1cm4gZGlyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRTdGFydCAoZXZ0LCBjdHgpIHtcbiAgcmV0dXJuIGN0eC5ldmVudCA9PT0gdm9pZCAwXG4gICAgJiYgZXZ0LnRhcmdldCAhPT0gdm9pZCAwXG4gICAgJiYgZXZ0LnRhcmdldC5kcmFnZ2FibGUgIT09IHRydWVcbiAgICAmJiB0eXBlb2YgY3R4LmhhbmRsZXIgPT09ICdmdW5jdGlvbidcbiAgICAmJiBldnQudGFyZ2V0Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgIT09ICdJTlBVVCdcbiAgICAmJiAoZXZ0LnFDbG9uZWRCeSA9PT0gdm9pZCAwIHx8IGV2dC5xQ2xvbmVkQnkuaW5kZXhPZihjdHgudWlkKSA9PT0gLTEpXG59XG4iLCJpbXBvcnQgUGxhdGZvcm0gZnJvbSAnLi4vLi4vcGx1Z2lucy9QbGF0Zm9ybS5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyU2VsZWN0aW9uICgpIHtcbiAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24gIT09IHZvaWQgMCkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKVxuICAgIGlmIChzZWxlY3Rpb24uZW1wdHkgIT09IHZvaWQgMCkge1xuICAgICAgc2VsZWN0aW9uLmVtcHR5KClcbiAgICB9XG4gICAgZWxzZSBpZiAoc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcyAhPT0gdm9pZCAwKSB7XG4gICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKClcbiAgICAgIFBsYXRmb3JtLmlzLm1vYmlsZSAhPT0gdHJ1ZSAmJiBzZWxlY3Rpb24uYWRkUmFuZ2UoZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKSlcbiAgICB9XG4gIH1cbiAgZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uICE9PSB2b2lkIDApIHtcbiAgICBkb2N1bWVudC5zZWxlY3Rpb24uZW1wdHkoKVxuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS2UsU0FBQSxlQUFZO0FBQ3pCLFFBQU0s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
