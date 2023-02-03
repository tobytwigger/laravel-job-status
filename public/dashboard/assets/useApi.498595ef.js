import { b as useRouterLinkProps, h as useRouterLink, Q as QIcon, d as useAlignProps, f as useAlign, j as getNormalizedVNodes } from "./use-router-link.d3b03863.js";
import { c as createComponent, e as hMergeSlot, h as hSlot } from "./render.03bb8eb9.js";
import { c as computed, h, g as getCurrentInstance, r as ref, o as onMounted, b as onUnmounted } from "./index.2ce80662.js";
import { u as useDarkProps, a as useDark } from "./QItem.efe8ccb9.js";
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
export { QBreadcrumbsEl as Q, QBreadcrumbs as a, QSeparator as b, useApi as u };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQXBpLjQ5ODU5NWVmLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9icmVhZGNydW1icy9RQnJlYWRjcnVtYnNFbC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL1FCcmVhZGNydW1icy5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NlcGFyYXRvci9RU2VwYXJhdG9yLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9jb21wb3N0YWJsZXMvdXNlQXBpLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgdXNlUm91dGVyTGluaywgeyB1c2VSb3V0ZXJMaW5rUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1yb3V0ZXItbGluay5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCcmVhZGNydW1ic0VsJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVJvdXRlckxpbmtQcm9wcyxcblxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgaWNvbjogU3RyaW5nLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnc3BhbidcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ2NsaWNrJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBsaW5rVGFnLCBsaW5rQXR0cnMsIGxpbmtDbGFzcywgbmF2aWdhdGVPbkNsaWNrIH0gPSB1c2VSb3V0ZXJMaW5rKClcblxuICAgIGNvbnN0IGRhdGEgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjbGFzczogJ3EtYnJlYWRjcnVtYnNfX2VsIHEtbGluayAnXG4gICAgICAgICAgKyAnZmxleCBpbmxpbmUgaXRlbXMtY2VudGVyIHJlbGF0aXZlLXBvc2l0aW9uICdcbiAgICAgICAgICArIChwcm9wcy5kaXNhYmxlICE9PSB0cnVlID8gJ3EtbGluay0tZm9jdXNhYmxlJyArIGxpbmtDbGFzcy52YWx1ZSA6ICdxLWJyZWFkY3J1bWJzX19lbC0tZGlzYWJsZScpLFxuICAgICAgICAuLi5saW5rQXR0cnMudmFsdWUsXG4gICAgICAgIG9uQ2xpY2s6IG5hdmlnYXRlT25DbGlja1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBpY29uQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtYnJlYWRjcnVtYnNfX2VsLWljb24nXG4gICAgICArIChwcm9wcy5sYWJlbCAhPT0gdm9pZCAwID8gJyBxLWJyZWFkY3J1bWJzX19lbC1pY29uLS13aXRoLWxhYmVsJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IFtdXG5cbiAgICAgIHByb3BzLmljb24gIT09IHZvaWQgMCAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6IGljb25DbGFzcy52YWx1ZSxcbiAgICAgICAgICBuYW1lOiBwcm9wcy5pY29uXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIHByb3BzLmxhYmVsICE9PSB2b2lkIDAgJiYgY2hpbGQucHVzaChwcm9wcy5sYWJlbClcblxuICAgICAgcmV0dXJuIGgoXG4gICAgICAgIGxpbmtUYWcudmFsdWUsXG4gICAgICAgIHsgLi4uZGF0YS52YWx1ZSB9LFxuICAgICAgICBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIGNoaWxkKVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlQWxpZ24sIHsgdXNlQWxpZ25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWFsaWduLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBnZXROb3JtYWxpemVkVk5vZGVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bS5qcydcblxuY29uc3QgZGlzYWJsZWRWYWx1ZXMgPSBbICcnLCB0cnVlIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCcmVhZGNydW1icycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VBbGlnblByb3BzLFxuXG4gICAgc2VwYXJhdG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnLydcbiAgICB9LFxuICAgIHNlcGFyYXRvckNvbG9yOiBTdHJpbmcsXG5cbiAgICBhY3RpdmVDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknXG4gICAgfSxcblxuICAgIGd1dHRlcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ25vbmUnLCAneHMnLCAnc20nLCAnbWQnLCAnbGcnLCAneGwnIF0uaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnc20nXG4gICAgfVxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgYWxpZ25DbGFzcyA9IHVzZUFsaWduKHByb3BzKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgZmxleCBpdGVtcy1jZW50ZXIgJHsgYWxpZ25DbGFzcy52YWx1ZSB9JHsgcHJvcHMuZ3V0dGVyID09PSAnbm9uZScgPyAnJyA6IGAgcS1ndXR0ZXItJHsgcHJvcHMuZ3V0dGVyIH1gIH1gXG4gICAgKVxuXG4gICAgY29uc3Qgc2VwQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiAocHJvcHMuc2VwYXJhdG9yQ29sb3IgPyBgIHRleHQtJHsgcHJvcHMuc2VwYXJhdG9yQ29sb3IgfWAgOiAnJykpXG4gICAgY29uc3QgYWN0aXZlQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiBgIHRleHQtJHsgcHJvcHMuYWN0aXZlQ29sb3IgfWApXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3Qgdm5vZGVzID0gZ2V0Tm9ybWFsaXplZFZOb2RlcyhcbiAgICAgICAgaFNsb3Qoc2xvdHMuZGVmYXVsdClcbiAgICAgIClcblxuICAgICAgaWYgKHZub2Rlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIH1cblxuICAgICAgbGV0IGVscyA9IDFcblxuICAgICAgY29uc3RcbiAgICAgICAgY2hpbGQgPSBbXSxcbiAgICAgICAgbGVuID0gdm5vZGVzLmZpbHRlcihjID0+IGMudHlwZSAhPT0gdm9pZCAwICYmIGMudHlwZS5uYW1lID09PSAnUUJyZWFkY3J1bWJzRWwnKS5sZW5ndGgsXG4gICAgICAgIHNlcGFyYXRvciA9IHNsb3RzLnNlcGFyYXRvciAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBzbG90cy5zZXBhcmF0b3JcbiAgICAgICAgICA6ICgpID0+IHByb3BzLnNlcGFyYXRvclxuXG4gICAgICB2bm9kZXMuZm9yRWFjaChjb21wID0+IHtcbiAgICAgICAgaWYgKGNvbXAudHlwZSAhPT0gdm9pZCAwICYmIGNvbXAudHlwZS5uYW1lID09PSAnUUJyZWFkY3J1bWJzRWwnKSB7XG4gICAgICAgICAgY29uc3QgbWlkZGxlID0gZWxzIDwgbGVuXG4gICAgICAgICAgY29uc3QgZGlzYWJsZWQgPSBjb21wLnByb3BzICE9PSBudWxsICYmIGRpc2FibGVkVmFsdWVzLmluY2x1ZGVzKGNvbXAucHJvcHMuZGlzYWJsZSlcbiAgICAgICAgICBjb25zdCBjbHMgPSAobWlkZGxlID09PSB0cnVlID8gJycgOiAnIHEtYnJlYWRjcnVtYnMtLWxhc3QnKVxuICAgICAgICAgICAgKyAoZGlzYWJsZWQgIT09IHRydWUgJiYgbWlkZGxlID09PSB0cnVlID8gYWN0aXZlQ2xhc3MudmFsdWUgOiAnJylcblxuICAgICAgICAgIGVscysrXG5cbiAgICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBjbGFzczogYGZsZXggaXRlbXMtY2VudGVyJHsgY2xzIH1gXG4gICAgICAgICAgICB9LCBbIGNvbXAgXSlcbiAgICAgICAgICApXG5cbiAgICAgICAgICBpZiAobWlkZGxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdxLWJyZWFkY3J1bWJzX19zZXBhcmF0b3InICsgc2VwQ2xhc3MudmFsdWVcbiAgICAgICAgICAgICAgfSwgc2VwYXJhdG9yKCkpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNoaWxkLnB1c2goY29tcClcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWJyZWFkY3J1bWJzJ1xuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGNoaWxkKVxuICAgICAgXSlcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcblxuY29uc3QgaW5zZXRNYXAgPSB7XG4gIHRydWU6ICdpbnNldCcsXG4gIGl0ZW06ICdpdGVtLWluc2V0JyxcbiAgJ2l0ZW0tdGh1bWJuYWlsJzogJ2l0ZW0tdGh1bWJuYWlsLWluc2V0J1xufVxuXG5leHBvcnQgY29uc3QgbWFyZ2lucyA9IHtcbiAgeHM6IDIsXG4gIHNtOiA0LFxuICBtZDogOCxcbiAgbGc6IDE2LFxuICB4bDogMjRcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTZXBhcmF0b3InLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgc3BhY2VkOiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICAgIGluc2V0OiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICAgIHZlcnRpY2FsOiBCb29sZWFuLFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgc2l6ZTogU3RyaW5nXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzKSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHZtLnByb3h5LiRxKVxuXG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICA/ICd2ZXJ0aWNhbCdcbiAgICAgICAgOiAnaG9yaXpvbnRhbCdcbiAgICApKVxuXG4gICAgY29uc3Qgb3JpZW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PiBgIHEtc2VwYXJhdG9yLS0keyBvcmllbnRhdGlvbi52YWx1ZSB9YClcblxuICAgIGNvbnN0IGluc2V0Q2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5pbnNldCAhPT0gZmFsc2VcbiAgICAgICAgPyBgJHsgb3JpZW50Q2xhc3MudmFsdWUgfS0keyBpbnNldE1hcFsgcHJvcHMuaW5zZXQgXSB9YFxuICAgICAgICA6ICcnXG4gICAgKSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtc2VwYXJhdG9yJHsgb3JpZW50Q2xhc3MudmFsdWUgfSR7IGluc2V0Q2xhc3MudmFsdWUgfWBcbiAgICAgICsgKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtc2VwYXJhdG9yLS1kYXJrJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWNjID0ge31cblxuICAgICAgaWYgKHByb3BzLnNpemUgIT09IHZvaWQgMCkge1xuICAgICAgICBhY2NbIHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3dpZHRoJyA6ICdoZWlnaHQnIF0gPSBwcm9wcy5zaXplXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5zcGFjZWQgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSBwcm9wcy5zcGFjZWQgPT09IHRydWVcbiAgICAgICAgICA/IGAkeyBtYXJnaW5zLm1kIH1weGBcbiAgICAgICAgICA6IHByb3BzLnNwYWNlZCBpbiBtYXJnaW5zID8gYCR7IG1hcmdpbnNbIHByb3BzLnNwYWNlZCBdIH1weGAgOiBwcm9wcy5zcGFjZWRcblxuICAgICAgICBjb25zdCBkaXIgPSBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICAgID8gWyAnTGVmdCcsICdSaWdodCcgXVxuICAgICAgICAgIDogWyAnVG9wJywgJ0JvdHRvbScgXVxuXG4gICAgICAgIGFjY1sgYG1hcmdpbiR7IGRpclsgMCBdIH1gIF0gPSBhY2NbIGBtYXJnaW4keyBkaXJbIDEgXSB9YCBdID0gc2l6ZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdocicsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgJ2FyaWEtb3JpZW50YXRpb24nOiBvcmllbnRhdGlvbi52YWx1ZVxuICAgIH0pXG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBvbk1vdW50ZWQsIG9uVW5tb3VudGVkLCByZWYgfSBmcm9tICd2dWUnO1xuaW1wb3J0IFRpbWVvdXQgPSBOb2RlSlMuVGltZW91dDtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUFwaShjYWxsQXBpOiAoYWZ0ZXI6ICgpID0+IHZvaWQpID0+IHZvaWQpIHtcbiAgY29uc3QgbG9hZGluZyA9IHJlZjxib29sZWFuPihmYWxzZSk7XG5cbiAgZnVuY3Rpb24gdHJpZ2dlckFwaUNhbGwoKSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IHRydWU7XG4gICAgZnVuY3Rpb24gYWZ0ZXIoKTogdm9pZCB7XG4gICAgICBsb2FkaW5nLnZhbHVlID0gZmFsc2U7XG4gICAgfVxuICAgIGNhbGxBcGkoYWZ0ZXIpO1xuICB9XG5cbiAgbGV0IGludGVydmFsSWQ6IFRpbWVvdXQ7XG5cbiAgb25Nb3VudGVkKCgpID0+IHtcbiAgICBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4gdHJpZ2dlckFwaUNhbGwoKSwgMTAwMCk7XG4gICAgdHJpZ2dlckFwaUNhbGwoKTtcbiAgfSk7XG5cbiAgb25Vbm1vdW50ZWQoKCkgPT4ge1xuICAgIGlmIChpbnRlcnZhbElkKSB7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHtc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
