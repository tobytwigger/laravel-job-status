import { b as useRouterLinkProps, h as useRouterLink, Q as QIcon, d as useAlignProps, f as useAlign, j as getNormalizedVNodes } from "./use-router-link.70d2557d.js";
import { c as createComponent, e as hMergeSlot, h as hSlot } from "./render.34f10d21.js";
import { c as computed, h, g as getCurrentInstance, r as ref, o as onMounted, b as onUnmounted } from "./index.07765cf9.js";
import { u as useDarkProps, a as useDark } from "./QItem.2946db6a.js";
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
function useApi(callApi) {
  const loading = ref(false);
  function triggerApiCall() {
    loading.value = true;
    function after() {
      loading.value = false;
    }
    callApi(after);
  }
  let intervalId;
  onMounted(() => {
    intervalId = setInterval(() => triggerApiCall(), 1e3);
    triggerApiCall();
  });
  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  });
  return {
    loading,
    triggerApiCall
  };
}
var Status = /* @__PURE__ */ ((Status2) => {
  Status2["Queued"] = "queued";
  Status2["Started"] = "started";
  Status2["Cancelled"] = "cancelled";
  Status2["Failed"] = "failed";
  Status2["Succeeded"] = "succeeded";
  return Status2;
})(Status || {});
var MessageType = /* @__PURE__ */ ((MessageType2) => {
  MessageType2["Success"] = "success";
  MessageType2["Error"] = "error";
  MessageType2["Info"] = "info";
  MessageType2["Warning"] = "warning";
  MessageType2["Debug"] = "debug";
  return MessageType2;
})(MessageType || {});
export { MessageType as M, QBreadcrumbsEl as Q, Status as S, QBreadcrumbs as a, QSeparator as b, useApi as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLjgxNTMwZThiLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9icmVhZGNydW1icy9RQnJlYWRjcnVtYnNFbC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL1FCcmVhZGNydW1icy5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NlcGFyYXRvci9RU2VwYXJhdG9yLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9jb21wb3N0YWJsZXMvdXNlQXBpLnRzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy90eXBlcy9hcGkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB1c2VSb3V0ZXJMaW5rLCB7IHVzZVJvdXRlckxpbmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJvdXRlci1saW5rLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJyZWFkY3J1bWJzRWwnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlUm91dGVyTGlua1Byb3BzLFxuXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBpY29uOiBTdHJpbmcsXG5cbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdzcGFuJ1xuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAnY2xpY2snIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IGxpbmtUYWcsIGxpbmtBdHRycywgbGlua0NsYXNzLCBuYXZpZ2F0ZU9uQ2xpY2sgfSA9IHVzZVJvdXRlckxpbmsoKVxuXG4gICAgY29uc3QgZGF0YSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNsYXNzOiAncS1icmVhZGNydW1ic19fZWwgcS1saW5rICdcbiAgICAgICAgICArICdmbGV4IGlubGluZSBpdGVtcy1jZW50ZXIgcmVsYXRpdmUtcG9zaXRpb24gJ1xuICAgICAgICAgICsgKHByb3BzLmRpc2FibGUgIT09IHRydWUgPyAncS1saW5rLS1mb2N1c2FibGUnICsgbGlua0NsYXNzLnZhbHVlIDogJ3EtYnJlYWRjcnVtYnNfX2VsLS1kaXNhYmxlJyksXG4gICAgICAgIC4uLmxpbmtBdHRycy52YWx1ZSxcbiAgICAgICAgb25DbGljazogbmF2aWdhdGVPbkNsaWNrXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGljb25DbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1icmVhZGNydW1ic19fZWwtaWNvbidcbiAgICAgICsgKHByb3BzLmxhYmVsICE9PSB2b2lkIDAgPyAnIHEtYnJlYWRjcnVtYnNfX2VsLWljb24tLXdpdGgtbGFiZWwnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gW11cblxuICAgICAgcHJvcHMuaWNvbiAhPT0gdm9pZCAwICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogaWNvbkNsYXNzLnZhbHVlLFxuICAgICAgICAgIG5hbWU6IHByb3BzLmljb25cbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgcHJvcHMubGFiZWwgIT09IHZvaWQgMCAmJiBjaGlsZC5wdXNoKHByb3BzLmxhYmVsKVxuXG4gICAgICByZXR1cm4gaChcbiAgICAgICAgbGlua1RhZy52YWx1ZSxcbiAgICAgICAgeyAuLi5kYXRhLnZhbHVlIH0sXG4gICAgICAgIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgY2hpbGQpXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VBbGlnbiwgeyB1c2VBbGlnblByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtYWxpZ24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGdldE5vcm1hbGl6ZWRWTm9kZXMgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3ZtLmpzJ1xuXG5jb25zdCBkaXNhYmxlZFZhbHVlcyA9IFsgJycsIHRydWUgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJyZWFkY3J1bWJzJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUFsaWduUHJvcHMsXG5cbiAgICBzZXBhcmF0b3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcvJ1xuICAgIH0sXG4gICAgc2VwYXJhdG9yQ29sb3I6IFN0cmluZyxcblxuICAgIGFjdGl2ZUNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncHJpbWFyeSdcbiAgICB9LFxuXG4gICAgZ3V0dGVyOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnbm9uZScsICd4cycsICdzbScsICdtZCcsICdsZycsICd4bCcgXS5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICdzbSdcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBhbGlnbkNsYXNzID0gdXNlQWxpZ24ocHJvcHMpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBmbGV4IGl0ZW1zLWNlbnRlciAkeyBhbGlnbkNsYXNzLnZhbHVlIH0keyBwcm9wcy5ndXR0ZXIgPT09ICdub25lJyA/ICcnIDogYCBxLWd1dHRlci0keyBwcm9wcy5ndXR0ZXIgfWAgfWBcbiAgICApXG5cbiAgICBjb25zdCBzZXBDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChwcm9wcy5zZXBhcmF0b3JDb2xvciA/IGAgdGV4dC0keyBwcm9wcy5zZXBhcmF0b3JDb2xvciB9YCA6ICcnKSlcbiAgICBjb25zdCBhY3RpdmVDbGFzcyA9IGNvbXB1dGVkKCgpID0+IGAgdGV4dC0keyBwcm9wcy5hY3RpdmVDb2xvciB9YClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCB2bm9kZXMgPSBnZXROb3JtYWxpemVkVk5vZGVzKFxuICAgICAgICBoU2xvdChzbG90cy5kZWZhdWx0KVxuICAgICAgKVxuXG4gICAgICBpZiAodm5vZGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gfVxuXG4gICAgICBsZXQgZWxzID0gMVxuXG4gICAgICBjb25zdFxuICAgICAgICBjaGlsZCA9IFtdLFxuICAgICAgICBsZW4gPSB2bm9kZXMuZmlsdGVyKGMgPT4gYy50eXBlICE9PSB2b2lkIDAgJiYgYy50eXBlLm5hbWUgPT09ICdRQnJlYWRjcnVtYnNFbCcpLmxlbmd0aCxcbiAgICAgICAgc2VwYXJhdG9yID0gc2xvdHMuc2VwYXJhdG9yICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHNsb3RzLnNlcGFyYXRvclxuICAgICAgICAgIDogKCkgPT4gcHJvcHMuc2VwYXJhdG9yXG5cbiAgICAgIHZub2Rlcy5mb3JFYWNoKGNvbXAgPT4ge1xuICAgICAgICBpZiAoY29tcC50eXBlICE9PSB2b2lkIDAgJiYgY29tcC50eXBlLm5hbWUgPT09ICdRQnJlYWRjcnVtYnNFbCcpIHtcbiAgICAgICAgICBjb25zdCBtaWRkbGUgPSBlbHMgPCBsZW5cbiAgICAgICAgICBjb25zdCBkaXNhYmxlZCA9IGNvbXAucHJvcHMgIT09IG51bGwgJiYgZGlzYWJsZWRWYWx1ZXMuaW5jbHVkZXMoY29tcC5wcm9wcy5kaXNhYmxlKVxuICAgICAgICAgIGNvbnN0IGNscyA9IChtaWRkbGUgPT09IHRydWUgPyAnJyA6ICcgcS1icmVhZGNydW1icy0tbGFzdCcpXG4gICAgICAgICAgICArIChkaXNhYmxlZCAhPT0gdHJ1ZSAmJiBtaWRkbGUgPT09IHRydWUgPyBhY3RpdmVDbGFzcy52YWx1ZSA6ICcnKVxuXG4gICAgICAgICAgZWxzKytcblxuICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiBgZmxleCBpdGVtcy1jZW50ZXIkeyBjbHMgfWBcbiAgICAgICAgICAgIH0sIFsgY29tcCBdKVxuICAgICAgICAgIClcblxuICAgICAgICAgIGlmIChtaWRkbGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3EtYnJlYWRjcnVtYnNfX3NlcGFyYXRvcicgKyBzZXBDbGFzcy52YWx1ZVxuICAgICAgICAgICAgICB9LCBzZXBhcmF0b3IoKSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY2hpbGQucHVzaChjb21wKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtYnJlYWRjcnVtYnMnXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgY2hpbGQpXG4gICAgICBdKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuXG5jb25zdCBpbnNldE1hcCA9IHtcbiAgdHJ1ZTogJ2luc2V0JyxcbiAgaXRlbTogJ2l0ZW0taW5zZXQnLFxuICAnaXRlbS10aHVtYm5haWwnOiAnaXRlbS10aHVtYm5haWwtaW5zZXQnXG59XG5cbmV4cG9ydCBjb25zdCBtYXJnaW5zID0ge1xuICB4czogMixcbiAgc206IDQsXG4gIG1kOiA4LFxuICBsZzogMTYsXG4gIHhsOiAyNFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNlcGFyYXRvcicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBzcGFjZWQ6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG4gICAgaW5zZXQ6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG4gICAgdmVydGljYWw6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBzaXplOiBTdHJpbmdcbiAgfSxcblxuICBzZXR1cCAocHJvcHMpIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgID8gJ3ZlcnRpY2FsJ1xuICAgICAgICA6ICdob3Jpem9udGFsJ1xuICAgICkpXG5cbiAgICBjb25zdCBvcmllbnRDbGFzcyA9IGNvbXB1dGVkKCgpID0+IGAgcS1zZXBhcmF0b3ItLSR7IG9yaWVudGF0aW9uLnZhbHVlIH1gKVxuXG4gICAgY29uc3QgaW5zZXRDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmluc2V0ICE9PSBmYWxzZVxuICAgICAgICA/IGAkeyBvcmllbnRDbGFzcy52YWx1ZSB9LSR7IGluc2V0TWFwWyBwcm9wcy5pbnNldCBdIH1gXG4gICAgICAgIDogJydcbiAgICApKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1zZXBhcmF0b3IkeyBvcmllbnRDbGFzcy52YWx1ZSB9JHsgaW5zZXRDbGFzcy52YWx1ZSB9YFxuICAgICAgKyAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zZXBhcmF0b3ItLWRhcmsnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhY2MgPSB7fVxuXG4gICAgICBpZiAocHJvcHMuc2l6ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGFjY1sgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnd2lkdGgnIDogJ2hlaWdodCcgXSA9IHByb3BzLnNpemVcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnNwYWNlZCAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHByb3BzLnNwYWNlZCA9PT0gdHJ1ZVxuICAgICAgICAgID8gYCR7IG1hcmdpbnMubWQgfXB4YFxuICAgICAgICAgIDogcHJvcHMuc3BhY2VkIGluIG1hcmdpbnMgPyBgJHsgbWFyZ2luc1sgcHJvcHMuc3BhY2VkIF0gfXB4YCA6IHByb3BzLnNwYWNlZFxuXG4gICAgICAgIGNvbnN0IGRpciA9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgICAgPyBbICdMZWZ0JywgJ1JpZ2h0JyBdXG4gICAgICAgICAgOiBbICdUb3AnLCAnQm90dG9tJyBdXG5cbiAgICAgICAgYWNjWyBgbWFyZ2luJHsgZGlyWyAwIF0gfWAgXSA9IGFjY1sgYG1hcmdpbiR7IGRpclsgMSBdIH1gIF0gPSBzaXplXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2hyJywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICAnYXJpYS1vcmllbnRhdGlvbic6IG9yaWVudGF0aW9uLnZhbHVlXG4gICAgfSlcbiAgfVxufSlcbiIsImltcG9ydCB7b25Nb3VudGVkLCBvblVubW91bnRlZCwgcmVmfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgVGltZW91dCA9IE5vZGVKUy5UaW1lb3V0O1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlQXBpKGNhbGxBcGk6IChhZnRlcjogKCkgPT4gdm9pZCkgPT4gdm9pZCkge1xuICBjb25zdCBsb2FkaW5nID0gcmVmPGJvb2xlYW4+KGZhbHNlKTtcblxuICBmdW5jdGlvbiB0cmlnZ2VyQXBpQ2FsbCgpIHtcbiAgICBsb2FkaW5nLnZhbHVlID0gdHJ1ZVxuICAgIGZ1bmN0aW9uIGFmdGVyKCk6IHZvaWQge1xuICAgICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBjYWxsQXBpKGFmdGVyKTtcbiAgfVxuXG4gIGxldCBpbnRlcnZhbElkOiBUaW1lb3V0O1xuXG4gIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHRyaWdnZXJBcGlDYWxsKCksIDEwMDApO1xuICAgIHRyaWdnZXJBcGlDYWxsKCk7XG4gIH0pO1xuXG4gIG9uVW5tb3VudGVkKCgpID0+IHtcbiAgICBpZihpbnRlcnZhbElkKSB7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgbG9hZGluZyxcbiAgICB0cmlnZ2VyQXBpQ2FsbFxuICB9XG5cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgUmVzdWx0cyB7XG4gIGpvYnM6IFRyYWNrZWRKb2JbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUcmFja2VkSm9iIHtcbiAgY2xhc3M6IHN0cmluZztcbiAgYWxpYXM6IHN0cmluZztcbiAgcnVuczogSm9iUnVuW107XG4gIGNvdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSm9iUnVuIHtcbiAgYWxpYXM6IHN0cmluZztcbiAgY2xhc3M6IHN0cmluZztcbiAgcGVyY2VudGFnZTogbnVtYmVyO1xuICBzdGF0dXM6IHN0cmluZztcbiAgdXVpZDogc3RyaW5nO1xuICBwYXJlbnQ6IEpvYlJ1bnxudWxsLFxuICBjcmVhdGVkX2F0OiBEYXRlLFxuICBtZXNzYWdlczogSm9iTWVzc2FnZVtdLFxuICBzaWduYWxzOiBKb2JTaWduYWxbXSxcbiAgZXhjZXB0aW9uOiBKb2JFeGNlcHRpb258bnVsbFxuICBzdGF0dXNlczogSm9iU3RhdHVzU3RhdHVzW11cbiAgc3RhcnRlZF9hdDogRGF0ZXxudWxsLFxuICBmaW5pc2hlZF9hdDogRGF0ZXxudWxsLFxuICBpZDogbnVtYmVyLFxuICB0YWdzOiB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSm9iU3RhdHVzU3RhdHVzIHtcbiAgaWQ6IG51bWJlcixcbiAgc3RhdHVzOiBTdGF0dXNcbiAgY3JlYXRlZF9hdDogRGF0ZSxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBKb2JNZXNzYWdlIHtcbiAgaWQ6IG51bWJlcixcbiAgbWVzc2FnZTogc3RyaW5nXG4gIGNyZWF0ZWRfYXQ6IERhdGVcbiAgdHlwZTogTWVzc2FnZVR5cGUsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSm9iRXhjZXB0aW9uIHtcbiAgaWQ6IG51bWJlclxuICBjcmVhdGVkX2F0OiBEYXRlXG4gIHVwZGF0ZWRfYXQ6IERhdGVcbiAgcHJldmlvdXM6IEpvYkV4Y2VwdGlvbnxudWxsXG4gIG1lc3NhZ2U6IHN0cmluZ1xuICBqb2Jfc3RhdHVzX2lkOiBudW1iZXJcbiAgbGluZTogbnVtYmVyXG4gIGZpbGU6IHN0cmluZ1xuICBjb2RlOiBudW1iZXJcbiAgc3RhY2tfdHJhY2U6IFN0YWNrVHJhY2VMaW5lW11cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTdGFja1RyYWNlTGluZSB7XG4gIGZpbGU6IHN0cmluZ1xuICBsaW5lOiBudW1iZXJcbiAgZnVuY3Rpb246IHN0cmluZ1xuICBjbGFzczogc3RyaW5nXG4gIHR5cGU6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEpvYlNpZ25hbCB7XG4gIGlkOiBudW1iZXIsXG4gIHNpZ25hbDogc3RyaW5nLFxuICBjcmVhdGVkX2F0OiBEYXRlLFxuICBoYW5kbGVkX2F0OiBEYXRlLFxuICBjYW5jZWxfam9iOiBib29sZWFuLFxuICBwYXJhbWV0ZXJzOiB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nXG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBEYXNoYm9hcmRSZXNwb25zZSB7XG4gIHRlc3Q6IHN0cmluZztcbn1cblxuZXhwb3J0IGVudW0gU3RhdHVzIHtcbiAgUXVldWVkID0gJ3F1ZXVlZCcsXG4gIFN0YXJ0ZWQgPSAnc3RhcnRlZCcsXG4gIENhbmNlbGxlZCA9ICdjYW5jZWxsZWQnLFxuICBGYWlsZWQgPSAnZmFpbGVkJyxcbiAgU3VjY2VlZGVkID0gJ3N1Y2NlZWRlZCcsXG59XG5cbmV4cG9ydCBlbnVtIE1lc3NhZ2VUeXBlIHtcbiAgU3VjY2VzcyA9ICdzdWNjZXNzJyxcbiAgRXJyb3IgPSAnZXJyb3InLFxuICBJbmZvID0gJ2luZm8nLFxuICBXYXJuaW5nID0gJ3dhcm5pbmcnLFxuICBEZWJ1ZyA9ICdkZWJ1ZycsXG59XG5cbi8vIGV4cG9ydCBpbnRlcmZhY2UgRnVsbFRyYWNrZWRKb2IgZXh0ZW5kcyBU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
