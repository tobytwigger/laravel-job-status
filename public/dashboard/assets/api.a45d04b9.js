import { b as useRouterLinkProps, h as useRouterLink, Q as QIcon, d as useAlignProps, f as useAlign, j as getNormalizedVNodes } from "./use-router-link.1dfef31b.js";
import { c as createComponent, e as hMergeSlot, h as hSlot } from "./render.80a4b5ad.js";
import { c as computed, h, g as getCurrentInstance, r as ref, o as onMounted, b as onUnmounted } from "./index.a2d3f53c.js";
import { u as useDarkProps, a as useDark } from "./QItem.4932e96c.js";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmE0NWQwNGI5LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9icmVhZGNydW1icy9RQnJlYWRjcnVtYnNFbC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL1FCcmVhZGNydW1icy5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NlcGFyYXRvci9RU2VwYXJhdG9yLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9jb21wb3N0YWJsZXMvdXNlQXBpLnRzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy90eXBlcy9hcGkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB1c2VSb3V0ZXJMaW5rLCB7IHVzZVJvdXRlckxpbmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXJvdXRlci1saW5rLmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJyZWFkY3J1bWJzRWwnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlUm91dGVyTGlua1Byb3BzLFxuXG4gICAgbGFiZWw6IFN0cmluZyxcbiAgICBpY29uOiBTdHJpbmcsXG5cbiAgICB0YWc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICdzcGFuJ1xuICAgIH1cbiAgfSxcblxuICBlbWl0czogWyAnY2xpY2snIF0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IGxpbmtUYWcsIGxpbmtBdHRycywgbGlua0NsYXNzLCBuYXZpZ2F0ZU9uQ2xpY2sgfSA9IHVzZVJvdXRlckxpbmsoKVxuXG4gICAgY29uc3QgZGF0YSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNsYXNzOiAncS1icmVhZGNydW1ic19fZWwgcS1saW5rICdcbiAgICAgICAgICArICdmbGV4IGlubGluZSBpdGVtcy1jZW50ZXIgcmVsYXRpdmUtcG9zaXRpb24gJ1xuICAgICAgICAgICsgKHByb3BzLmRpc2FibGUgIT09IHRydWUgPyAncS1saW5rLS1mb2N1c2FibGUnICsgbGlua0NsYXNzLnZhbHVlIDogJ3EtYnJlYWRjcnVtYnNfX2VsLS1kaXNhYmxlJyksXG4gICAgICAgIC4uLmxpbmtBdHRycy52YWx1ZSxcbiAgICAgICAgb25DbGljazogbmF2aWdhdGVPbkNsaWNrXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGljb25DbGFzcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICAncS1icmVhZGNydW1ic19fZWwtaWNvbidcbiAgICAgICsgKHByb3BzLmxhYmVsICE9PSB2b2lkIDAgPyAnIHEtYnJlYWRjcnVtYnNfX2VsLWljb24tLXdpdGgtbGFiZWwnIDogJycpXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkID0gW11cblxuICAgICAgcHJvcHMuaWNvbiAhPT0gdm9pZCAwICYmIGNoaWxkLnB1c2goXG4gICAgICAgIGgoUUljb24sIHtcbiAgICAgICAgICBjbGFzczogaWNvbkNsYXNzLnZhbHVlLFxuICAgICAgICAgIG5hbWU6IHByb3BzLmljb25cbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgcHJvcHMubGFiZWwgIT09IHZvaWQgMCAmJiBjaGlsZC5wdXNoKHByb3BzLmxhYmVsKVxuXG4gICAgICByZXR1cm4gaChcbiAgICAgICAgbGlua1RhZy52YWx1ZSxcbiAgICAgICAgeyAuLi5kYXRhLnZhbHVlIH0sXG4gICAgICAgIGhNZXJnZVNsb3Qoc2xvdHMuZGVmYXVsdCwgY2hpbGQpXG4gICAgICApXG4gICAgfVxuICB9XG59KVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VBbGlnbiwgeyB1c2VBbGlnblByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2UtYWxpZ24uanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuaW1wb3J0IHsgaFNsb3QgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGdldE5vcm1hbGl6ZWRWTm9kZXMgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3ZtLmpzJ1xuXG5jb25zdCBkaXNhYmxlZFZhbHVlcyA9IFsgJycsIHRydWUgXVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUJyZWFkY3J1bWJzJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUFsaWduUHJvcHMsXG5cbiAgICBzZXBhcmF0b3I6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIGRlZmF1bHQ6ICcvJ1xuICAgIH0sXG4gICAgc2VwYXJhdG9yQ29sb3I6IFN0cmluZyxcblxuICAgIGFjdGl2ZUNvbG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAncHJpbWFyeSdcbiAgICB9LFxuXG4gICAgZ3V0dGVyOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICB2YWxpZGF0b3I6IHYgPT4gWyAnbm9uZScsICd4cycsICdzbScsICdtZCcsICdsZycsICd4bCcgXS5pbmNsdWRlcyh2KSxcbiAgICAgIGRlZmF1bHQ6ICdzbSdcbiAgICB9XG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCBhbGlnbkNsYXNzID0gdXNlQWxpZ24ocHJvcHMpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBmbGV4IGl0ZW1zLWNlbnRlciAkeyBhbGlnbkNsYXNzLnZhbHVlIH0keyBwcm9wcy5ndXR0ZXIgPT09ICdub25lJyA/ICcnIDogYCBxLWd1dHRlci0keyBwcm9wcy5ndXR0ZXIgfWAgfWBcbiAgICApXG5cbiAgICBjb25zdCBzZXBDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChwcm9wcy5zZXBhcmF0b3JDb2xvciA/IGAgdGV4dC0keyBwcm9wcy5zZXBhcmF0b3JDb2xvciB9YCA6ICcnKSlcbiAgICBjb25zdCBhY3RpdmVDbGFzcyA9IGNvbXB1dGVkKCgpID0+IGAgdGV4dC0keyBwcm9wcy5hY3RpdmVDb2xvciB9YClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCB2bm9kZXMgPSBnZXROb3JtYWxpemVkVk5vZGVzKFxuICAgICAgICBoU2xvdChzbG90cy5kZWZhdWx0KVxuICAgICAgKVxuXG4gICAgICBpZiAodm5vZGVzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gfVxuXG4gICAgICBsZXQgZWxzID0gMVxuXG4gICAgICBjb25zdFxuICAgICAgICBjaGlsZCA9IFtdLFxuICAgICAgICBsZW4gPSB2bm9kZXMuZmlsdGVyKGMgPT4gYy50eXBlICE9PSB2b2lkIDAgJiYgYy50eXBlLm5hbWUgPT09ICdRQnJlYWRjcnVtYnNFbCcpLmxlbmd0aCxcbiAgICAgICAgc2VwYXJhdG9yID0gc2xvdHMuc2VwYXJhdG9yICE9PSB2b2lkIDBcbiAgICAgICAgICA/IHNsb3RzLnNlcGFyYXRvclxuICAgICAgICAgIDogKCkgPT4gcHJvcHMuc2VwYXJhdG9yXG5cbiAgICAgIHZub2Rlcy5mb3JFYWNoKGNvbXAgPT4ge1xuICAgICAgICBpZiAoY29tcC50eXBlICE9PSB2b2lkIDAgJiYgY29tcC50eXBlLm5hbWUgPT09ICdRQnJlYWRjcnVtYnNFbCcpIHtcbiAgICAgICAgICBjb25zdCBtaWRkbGUgPSBlbHMgPCBsZW5cbiAgICAgICAgICBjb25zdCBkaXNhYmxlZCA9IGNvbXAucHJvcHMgIT09IG51bGwgJiYgZGlzYWJsZWRWYWx1ZXMuaW5jbHVkZXMoY29tcC5wcm9wcy5kaXNhYmxlKVxuICAgICAgICAgIGNvbnN0IGNscyA9IChtaWRkbGUgPT09IHRydWUgPyAnJyA6ICcgcS1icmVhZGNydW1icy0tbGFzdCcpXG4gICAgICAgICAgICArIChkaXNhYmxlZCAhPT0gdHJ1ZSAmJiBtaWRkbGUgPT09IHRydWUgPyBhY3RpdmVDbGFzcy52YWx1ZSA6ICcnKVxuXG4gICAgICAgICAgZWxzKytcblxuICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgIGNsYXNzOiBgZmxleCBpdGVtcy1jZW50ZXIkeyBjbHMgfWBcbiAgICAgICAgICAgIH0sIFsgY29tcCBdKVxuICAgICAgICAgIClcblxuICAgICAgICAgIGlmIChtaWRkbGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNoaWxkLnB1c2goXG4gICAgICAgICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICAgICAgICBjbGFzczogJ3EtYnJlYWRjcnVtYnNfX3NlcGFyYXRvcicgKyBzZXBDbGFzcy52YWx1ZVxuICAgICAgICAgICAgICB9LCBzZXBhcmF0b3IoKSlcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY2hpbGQucHVzaChjb21wKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogJ3EtYnJlYWRjcnVtYnMnXG4gICAgICB9LCBbXG4gICAgICAgIGgoJ2RpdicsIHsgY2xhc3M6IGNsYXNzZXMudmFsdWUgfSwgY2hpbGQpXG4gICAgICBdKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkLCBnZXRDdXJyZW50SW5zdGFuY2UgfSBmcm9tICd2dWUnXG5cbmltcG9ydCB1c2VEYXJrLCB7IHVzZURhcmtQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWRhcmsuanMnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUvY3JlYXRlLmpzJ1xuXG5jb25zdCBpbnNldE1hcCA9IHtcbiAgdHJ1ZTogJ2luc2V0JyxcbiAgaXRlbTogJ2l0ZW0taW5zZXQnLFxuICAnaXRlbS10aHVtYm5haWwnOiAnaXRlbS10aHVtYm5haWwtaW5zZXQnXG59XG5cbmV4cG9ydCBjb25zdCBtYXJnaW5zID0ge1xuICB4czogMixcbiAgc206IDQsXG4gIG1kOiA4LFxuICBsZzogMTYsXG4gIHhsOiAyNFxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUVNlcGFyYXRvcicsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VEYXJrUHJvcHMsXG5cbiAgICBzcGFjZWQ6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG4gICAgaW5zZXQ6IFsgQm9vbGVhbiwgU3RyaW5nIF0sXG4gICAgdmVydGljYWw6IEJvb2xlYW4sXG4gICAgY29sb3I6IFN0cmluZyxcbiAgICBzaXplOiBTdHJpbmdcbiAgfSxcblxuICBzZXR1cCAocHJvcHMpIHtcbiAgICBjb25zdCB2bSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgdm0ucHJveHkuJHEpXG5cbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgID8gJ3ZlcnRpY2FsJ1xuICAgICAgICA6ICdob3Jpem9udGFsJ1xuICAgICkpXG5cbiAgICBjb25zdCBvcmllbnRDbGFzcyA9IGNvbXB1dGVkKCgpID0+IGAgcS1zZXBhcmF0b3ItLSR7IG9yaWVudGF0aW9uLnZhbHVlIH1gKVxuXG4gICAgY29uc3QgaW5zZXRDbGFzcyA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmluc2V0ICE9PSBmYWxzZVxuICAgICAgICA/IGAkeyBvcmllbnRDbGFzcy52YWx1ZSB9LSR7IGluc2V0TWFwWyBwcm9wcy5pbnNldCBdIH1gXG4gICAgICAgIDogJydcbiAgICApKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgcS1zZXBhcmF0b3IkeyBvcmllbnRDbGFzcy52YWx1ZSB9JHsgaW5zZXRDbGFzcy52YWx1ZSB9YFxuICAgICAgKyAocHJvcHMuY29sb3IgIT09IHZvaWQgMCA/IGAgYmctJHsgcHJvcHMuY29sb3IgfWAgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1zZXBhcmF0b3ItLWRhcmsnIDogJycpXG4gICAgKVxuXG4gICAgY29uc3Qgc3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhY2MgPSB7fVxuXG4gICAgICBpZiAocHJvcHMuc2l6ZSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIGFjY1sgcHJvcHMudmVydGljYWwgPT09IHRydWUgPyAnd2lkdGgnIDogJ2hlaWdodCcgXSA9IHByb3BzLnNpemVcbiAgICAgIH1cblxuICAgICAgaWYgKHByb3BzLnNwYWNlZCAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3Qgc2l6ZSA9IHByb3BzLnNwYWNlZCA9PT0gdHJ1ZVxuICAgICAgICAgID8gYCR7IG1hcmdpbnMubWQgfXB4YFxuICAgICAgICAgIDogcHJvcHMuc3BhY2VkIGluIG1hcmdpbnMgPyBgJHsgbWFyZ2luc1sgcHJvcHMuc3BhY2VkIF0gfXB4YCA6IHByb3BzLnNwYWNlZFxuXG4gICAgICAgIGNvbnN0IGRpciA9IHByb3BzLnZlcnRpY2FsID09PSB0cnVlXG4gICAgICAgICAgPyBbICdMZWZ0JywgJ1JpZ2h0JyBdXG4gICAgICAgICAgOiBbICdUb3AnLCAnQm90dG9tJyBdXG5cbiAgICAgICAgYWNjWyBgbWFyZ2luJHsgZGlyWyAwIF0gfWAgXSA9IGFjY1sgYG1hcmdpbiR7IGRpclsgMSBdIH1gIF0gPSBzaXplXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2NcbiAgICB9KVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ2hyJywge1xuICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICBzdHlsZTogc3R5bGUudmFsdWUsXG4gICAgICAnYXJpYS1vcmllbnRhdGlvbic6IG9yaWVudGF0aW9uLnZhbHVlXG4gICAgfSlcbiAgfVxufSlcbiIsImltcG9ydCB7b25Nb3VudGVkLCBvblVubW91bnRlZCwgcmVmfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgVGltZW91dCA9IE5vZGVKUy5UaW1lb3V0O1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlQXBpKGNhbGxBcGk6IChhZnRlcjogKCkgPT4gdm9pZCkgPT4gdm9pZCkge1xuICBjb25zdCBsb2FkaW5nID0gcmVmPGJvb2xlYW4+KGZhbHNlKTtcblxuICBmdW5jdGlvbiB0cmlnZ2VyQXBpQ2FsbCgpIHtcbiAgICBsb2FkaW5nLnZhbHVlID0gdHJ1ZVxuICAgIGZ1bmN0aW9uIGFmdGVyKCk6IHZvaWQge1xuICAgICAgbG9hZGluZy52YWx1ZSA9IGZhbHNlO1xuICAgIH1cbiAgICBjYWxsQXBpKGFmdGVyKTtcbiAgfVxuXG4gIGxldCBpbnRlcnZhbElkOiBUaW1lb3V0O1xuXG4gIG9uTW91bnRlZCgoKSA9PiB7XG4gICAgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHRyaWdnZXJBcGlDYWxsKCksIDEwMDApO1xuICAgIHRyaWdnZXJBcGlDYWxsKCk7XG4gIH0pO1xuXG4gIG9uVW5tb3VudGVkKCgpID0+IHtcbiAgICBpZihpbnRlcnZhbElkKSB7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiB7XG4gICAgbG9hZGluZyxcbiAgICB0cmlnZ2VyQXBpQ2FsbFxuICB9XG5cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgUmVzdWx0cyB7XG4gIGpvYnM6IFRyYWNrZWRKb2JbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUcmFja2VkSm9iIHtcbiAgY2xhc3M6IHN0cmluZztcbiAgYWxpYXM6IHN0cmluZztcbiAgcnVuczogSm9iUnVuW107XG4gIGNvdW50OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSm9iUnVuIHtcbiAgYWxpYXM6IHN0cmluZztcbiAgY2xhc3M6IHN0cmluZztcbiAgcGVyY2VudGFnZTogbnVtYmVyO1xuICBzdGF0dXM6IHN0cmluZztcbiAgdXVpZDogc3RyaW5nO1xuICBwYXJlbnQ6IEpvYlJ1bnxudWxsLFxuICBjcmVhdGVkX2F0OiBEYXRlLFxuICBtZXNzYWdlczogSm9iTWVzc2FnZVtdLFxuICBzaWduYWxzOiBKb2JTaWduYWxbXSxcbiAgZXhjZXB0aW9uOiBKb2JFeGNlcHRpb258bnVsbFxuICBzdGF0dXNlczogSm9iU3RhdHVzU3RhdHVzW11cbiAgaWQ6IG51bWJlcixcbiAgdGFnczoge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZztcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEpvYlN0YXR1c1N0YXR1cyB7XG4gIGlkOiBudW1iZXIsXG4gIHN0YXR1czogU3RhdHVzXG4gIGNyZWF0ZWRfYXQ6IERhdGUsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSm9iTWVzc2FnZSB7XG4gIGlkOiBudW1iZXIsXG4gIG1lc3NhZ2U6IHN0cmluZ1xuICBjcmVhdGVkX2F0OiBEYXRlXG4gIHR5cGU6IE1lc3NhZ2VUeXBlLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEpvYkV4Y2VwdGlvbiB7XG4gIGlkOiBudW1iZXJcbiAgY3JlYXRlZF9hdDogRGF0ZVxuICB1cGRhdGVkX2F0OiBEYXRlXG4gIHByZXZpb3VzOiBKb2JFeGNlcHRpb258bnVsbFxuICBtZXNzYWdlOiBzdHJpbmdcbiAgam9iX3N0YXR1c19pZDogbnVtYmVyXG4gIGxpbmU6IG51bWJlclxuICBmaWxlOiBzdHJpbmdcbiAgY29kZTogbnVtYmVyXG4gIHN0YWNrX3RyYWNlOiBTdGFja1RyYWNlTGluZVtdXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3RhY2tUcmFjZUxpbmUge1xuICBmaWxlOiBzdHJpbmdcbiAgbGluZTogbnVtYmVyXG4gIGZ1bmN0aW9uOiBzdHJpbmdcbiAgY2xhc3M6IHN0cmluZ1xuICB0eXBlOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBKb2JTaWduYWwge1xuICBpZDogbnVtYmVyLFxuICBzaWduYWw6IHN0cmluZyxcbiAgY3JlYXRlZF9hdDogRGF0ZSxcbiAgaGFuZGxlZF9hdDogRGF0ZSxcbiAgY2FuY2VsX2pvYjogYm9vbGVhbixcbiAgcGFyYW1ldGVyczoge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGFzaGJvYXJkUmVzcG9uc2Uge1xuICB0ZXN0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBlbnVtIFN0YXR1cyB7XG4gIFF1ZXVlZCA9ICdxdWV1ZWQnLFxuICBTdGFydGVkID0gJ3N0YXJ0ZWQnLFxuICBDYW5jZWxsZWQgPSAnY2FuY2VsbGVkJyxcbiAgRmFpbGVkID0gJ2ZhaWxlZCcsXG4gIFN1Y2NlZWRlZCA9ICdzdWNjZWVkZWQnLFxufVxuXG5leHBvcnQgZW51bSBNZXNzYWdlVHlwZSB7XG4gIFN1Y2Nlc3MgPSAnc3VjY2VzcycsXG4gIEVycm9yID0gJ2Vycm9yJyxcbiAgSW5mbyA9ICdpbmZvJyxcbiAgV2FybmluZyA9ICd3YXJuaW5nJyxcbiAgRGVidWcgPSAnZGVidWcnLFxufVxuXG4vLyBleHBvcnQgaW50ZXJmYWNlIEZ1bGxUcmFja2VkSm9iIGV4dGVuZHMgVHJhY2tlZEpvYntcbi8vXG4vLyB9XG4iXSwibmFtZXMiOlsiU3RhdHVzIiwiTWVzc2FnZVR5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
