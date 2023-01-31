import { b as useRouterLinkProps, h as useRouterLink, Q as QIcon, d as useAlignProps, f as useAlign, j as getNormalizedVNodes } from "./use-router-link.b59d0f2d.js";
import { c as createComponent, e as hMergeSlot, h as hSlot } from "./render.a10da10b.js";
import { c as computed, h, g as getCurrentInstance, r as ref, o as onMounted, b as onUnmounted } from "./index.24d2f870.js";
import { u as useDarkProps, a as useDark } from "./QItem.d2559d90.js";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQXBpLmE5MTZiNDMzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9icmVhZGNydW1icy9RQnJlYWRjcnVtYnNFbC5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2JyZWFkY3J1bWJzL1FCcmVhZGNydW1icy5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL3NlcGFyYXRvci9RU2VwYXJhdG9yLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9jb21wb3N0YWJsZXMvdXNlQXBpLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgUUljb24gZnJvbSAnLi4vaWNvbi9RSWNvbi5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgdXNlUm91dGVyTGluaywgeyB1c2VSb3V0ZXJMaW5rUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1yb3V0ZXItbGluay5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCcmVhZGNydW1ic0VsJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZVJvdXRlckxpbmtQcm9wcyxcblxuICAgIGxhYmVsOiBTdHJpbmcsXG4gICAgaWNvbjogU3RyaW5nLFxuXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnc3BhbidcbiAgICB9XG4gIH0sXG5cbiAgZW1pdHM6IFsgJ2NsaWNrJyBdLFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBsaW5rVGFnLCBsaW5rQXR0cnMsIGxpbmtDbGFzcywgbmF2aWdhdGVPbkNsaWNrIH0gPSB1c2VSb3V0ZXJMaW5rKClcblxuICAgIGNvbnN0IGRhdGEgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjbGFzczogJ3EtYnJlYWRjcnVtYnNfX2VsIHEtbGluayAnXG4gICAgICAgICAgKyAnZmxleCBpbmxpbmUgaXRlbXMtY2VudGVyIHJlbGF0aXZlLXBvc2l0aW9uICdcbiAgICAgICAgICArIChwcm9wcy5kaXNhYmxlICE9PSB0cnVlID8gJ3EtbGluay0tZm9jdXNhYmxlJyArIGxpbmtDbGFzcy52YWx1ZSA6ICdxLWJyZWFkY3J1bWJzX19lbC0tZGlzYWJsZScpLFxuICAgICAgICAuLi5saW5rQXR0cnMudmFsdWUsXG4gICAgICAgIG9uQ2xpY2s6IG5hdmlnYXRlT25DbGlja1xuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBpY29uQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgJ3EtYnJlYWRjcnVtYnNfX2VsLWljb24nXG4gICAgICArIChwcm9wcy5sYWJlbCAhPT0gdm9pZCAwID8gJyBxLWJyZWFkY3J1bWJzX19lbC1pY29uLS13aXRoLWxhYmVsJyA6ICcnKVxuICAgIClcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjb25zdCBjaGlsZCA9IFtdXG5cbiAgICAgIHByb3BzLmljb24gIT09IHZvaWQgMCAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKFFJY29uLCB7XG4gICAgICAgICAgY2xhc3M6IGljb25DbGFzcy52YWx1ZSxcbiAgICAgICAgICBuYW1lOiBwcm9wcy5pY29uXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIHByb3BzLmxhYmVsICE9PSB2b2lkIDAgJiYgY2hpbGQucHVzaChwcm9wcy5sYWJlbClcblxuICAgICAgcmV0dXJuIGgoXG4gICAgICAgIGxpbmtUYWcudmFsdWUsXG4gICAgICAgIHsgLi4uZGF0YS52YWx1ZSB9LFxuICAgICAgICBoTWVyZ2VTbG90KHNsb3RzLmRlZmF1bHQsIGNoaWxkKVxuICAgICAgKVxuICAgIH1cbiAgfVxufSlcbiIsImltcG9ydCB7IGgsIGNvbXB1dGVkIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlQWxpZ24sIHsgdXNlQWxpZ25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLWFsaWduLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBnZXROb3JtYWxpemVkVk5vZGVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS92bS5qcydcblxuY29uc3QgZGlzYWJsZWRWYWx1ZXMgPSBbICcnLCB0cnVlIF1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCcmVhZGNydW1icycsXG5cbiAgcHJvcHM6IHtcbiAgICAuLi51c2VBbGlnblByb3BzLFxuXG4gICAgc2VwYXJhdG9yOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnLydcbiAgICB9LFxuICAgIHNlcGFyYXRvckNvbG9yOiBTdHJpbmcsXG5cbiAgICBhY3RpdmVDb2xvcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ3ByaW1hcnknXG4gICAgfSxcblxuICAgIGd1dHRlcjoge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgdmFsaWRhdG9yOiB2ID0+IFsgJ25vbmUnLCAneHMnLCAnc20nLCAnbWQnLCAnbGcnLCAneGwnIF0uaW5jbHVkZXModiksXG4gICAgICBkZWZhdWx0OiAnc20nXG4gICAgfVxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgYWxpZ25DbGFzcyA9IHVzZUFsaWduKHByb3BzKVxuXG4gICAgY29uc3QgY2xhc3NlcyA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgZmxleCBpdGVtcy1jZW50ZXIgJHsgYWxpZ25DbGFzcy52YWx1ZSB9JHsgcHJvcHMuZ3V0dGVyID09PSAnbm9uZScgPyAnJyA6IGAgcS1ndXR0ZXItJHsgcHJvcHMuZ3V0dGVyIH1gIH1gXG4gICAgKVxuXG4gICAgY29uc3Qgc2VwQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiAocHJvcHMuc2VwYXJhdG9yQ29sb3IgPyBgIHRleHQtJHsgcHJvcHMuc2VwYXJhdG9yQ29sb3IgfWAgOiAnJykpXG4gICAgY29uc3QgYWN0aXZlQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiBgIHRleHQtJHsgcHJvcHMuYWN0aXZlQ29sb3IgfWApXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3Qgdm5vZGVzID0gZ2V0Tm9ybWFsaXplZFZOb2RlcyhcbiAgICAgICAgaFNsb3Qoc2xvdHMuZGVmYXVsdClcbiAgICAgIClcblxuICAgICAgaWYgKHZub2Rlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuIH1cblxuICAgICAgbGV0IGVscyA9IDFcblxuICAgICAgY29uc3RcbiAgICAgICAgY2hpbGQgPSBbXSxcbiAgICAgICAgbGVuID0gdm5vZGVzLmZpbHRlcihjID0+IGMudHlwZSAhPT0gdm9pZCAwICYmIGMudHlwZS5uYW1lID09PSAnUUJyZWFkY3J1bWJzRWwnKS5sZW5ndGgsXG4gICAgICAgIHNlcGFyYXRvciA9IHNsb3RzLnNlcGFyYXRvciAhPT0gdm9pZCAwXG4gICAgICAgICAgPyBzbG90cy5zZXBhcmF0b3JcbiAgICAgICAgICA6ICgpID0+IHByb3BzLnNlcGFyYXRvclxuXG4gICAgICB2bm9kZXMuZm9yRWFjaChjb21wID0+IHtcbiAgICAgICAgaWYgKGNvbXAudHlwZSAhPT0gdm9pZCAwICYmIGNvbXAudHlwZS5uYW1lID09PSAnUUJyZWFkY3J1bWJzRWwnKSB7XG4gICAgICAgICAgY29uc3QgbWlkZGxlID0gZWxzIDwgbGVuXG4gICAgICAgICAgY29uc3QgZGlzYWJsZWQgPSBjb21wLnByb3BzICE9PSBudWxsICYmIGRpc2FibGVkVmFsdWVzLmluY2x1ZGVzKGNvbXAucHJvcHMuZGlzYWJsZSlcbiAgICAgICAgICBjb25zdCBjbHMgPSAobWlkZGxlID09PSB0cnVlID8gJycgOiAnIHEtYnJlYWRjcnVtYnMtLWxhc3QnKVxuICAgICAgICAgICAgKyAoZGlzYWJsZWQgIT09IHRydWUgJiYgbWlkZGxlID09PSB0cnVlID8gYWN0aXZlQ2xhc3MudmFsdWUgOiAnJylcblxuICAgICAgICAgIGVscysrXG5cbiAgICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgICAgICBjbGFzczogYGZsZXggaXRlbXMtY2VudGVyJHsgY2xzIH1gXG4gICAgICAgICAgICB9LCBbIGNvbXAgXSlcbiAgICAgICAgICApXG5cbiAgICAgICAgICBpZiAobWlkZGxlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjaGlsZC5wdXNoKFxuICAgICAgICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgICAgICAgY2xhc3M6ICdxLWJyZWFkY3J1bWJzX19zZXBhcmF0b3InICsgc2VwQ2xhc3MudmFsdWVcbiAgICAgICAgICAgICAgfSwgc2VwYXJhdG9yKCkpXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGNoaWxkLnB1c2goY29tcClcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6ICdxLWJyZWFkY3J1bWJzJ1xuICAgICAgfSwgW1xuICAgICAgICBoKCdkaXYnLCB7IGNsYXNzOiBjbGFzc2VzLnZhbHVlIH0sIGNoaWxkKVxuICAgICAgXSlcbiAgICB9XG4gIH1cbn0pXG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcblxuY29uc3QgaW5zZXRNYXAgPSB7XG4gIHRydWU6ICdpbnNldCcsXG4gIGl0ZW06ICdpdGVtLWluc2V0JyxcbiAgJ2l0ZW0tdGh1bWJuYWlsJzogJ2l0ZW0tdGh1bWJuYWlsLWluc2V0J1xufVxuXG5leHBvcnQgY29uc3QgbWFyZ2lucyA9IHtcbiAgeHM6IDIsXG4gIHNtOiA0LFxuICBtZDogOCxcbiAgbGc6IDE2LFxuICB4bDogMjRcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FTZXBhcmF0b3InLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgc3BhY2VkOiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICAgIGluc2V0OiBbIEJvb2xlYW4sIFN0cmluZyBdLFxuICAgIHZlcnRpY2FsOiBCb29sZWFuLFxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgc2l6ZTogU3RyaW5nXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzKSB7XG4gICAgY29uc3Qgdm0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IGlzRGFyayA9IHVzZURhcmsocHJvcHMsIHZtLnByb3h5LiRxKVxuXG4gICAgY29uc3Qgb3JpZW50YXRpb24gPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICA/ICd2ZXJ0aWNhbCdcbiAgICAgICAgOiAnaG9yaXpvbnRhbCdcbiAgICApKVxuXG4gICAgY29uc3Qgb3JpZW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PiBgIHEtc2VwYXJhdG9yLS0keyBvcmllbnRhdGlvbi52YWx1ZSB9YClcblxuICAgIGNvbnN0IGluc2V0Q2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoXG4gICAgICBwcm9wcy5pbnNldCAhPT0gZmFsc2VcbiAgICAgICAgPyBgJHsgb3JpZW50Q2xhc3MudmFsdWUgfS0keyBpbnNldE1hcFsgcHJvcHMuaW5zZXQgXSB9YFxuICAgICAgICA6ICcnXG4gICAgKSlcblxuICAgIGNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgYHEtc2VwYXJhdG9yJHsgb3JpZW50Q2xhc3MudmFsdWUgfSR7IGluc2V0Q2xhc3MudmFsdWUgfWBcbiAgICAgICsgKHByb3BzLmNvbG9yICE9PSB2b2lkIDAgPyBgIGJnLSR7IHByb3BzLmNvbG9yIH1gIDogJycpXG4gICAgICArIChpc0RhcmsudmFsdWUgPT09IHRydWUgPyAnIHEtc2VwYXJhdG9yLS1kYXJrJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IHN0eWxlID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgY29uc3QgYWNjID0ge31cblxuICAgICAgaWYgKHByb3BzLnNpemUgIT09IHZvaWQgMCkge1xuICAgICAgICBhY2NbIHByb3BzLnZlcnRpY2FsID09PSB0cnVlID8gJ3dpZHRoJyA6ICdoZWlnaHQnIF0gPSBwcm9wcy5zaXplXG4gICAgICB9XG5cbiAgICAgIGlmIChwcm9wcy5zcGFjZWQgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHNpemUgPSBwcm9wcy5zcGFjZWQgPT09IHRydWVcbiAgICAgICAgICA/IGAkeyBtYXJnaW5zLm1kIH1weGBcbiAgICAgICAgICA6IHByb3BzLnNwYWNlZCBpbiBtYXJnaW5zID8gYCR7IG1hcmdpbnNbIHByb3BzLnNwYWNlZCBdIH1weGAgOiBwcm9wcy5zcGFjZWRcblxuICAgICAgICBjb25zdCBkaXIgPSBwcm9wcy52ZXJ0aWNhbCA9PT0gdHJ1ZVxuICAgICAgICAgID8gWyAnTGVmdCcsICdSaWdodCcgXVxuICAgICAgICAgIDogWyAnVG9wJywgJ0JvdHRvbScgXVxuXG4gICAgICAgIGFjY1sgYG1hcmdpbiR7IGRpclsgMCBdIH1gIF0gPSBhY2NbIGBtYXJnaW4keyBkaXJbIDEgXSB9YCBdID0gc2l6ZVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSlcblxuICAgIHJldHVybiAoKSA9PiBoKCdocicsIHtcbiAgICAgIGNsYXNzOiBjbGFzc2VzLnZhbHVlLFxuICAgICAgc3R5bGU6IHN0eWxlLnZhbHVlLFxuICAgICAgJ2FyaWEtb3JpZW50YXRpb24nOiBvcmllbnRhdGlvbi52YWx1ZVxuICAgIH0pXG4gIH1cbn0pXG4iLCJpbXBvcnQge29uTW91bnRlZCwgb25Vbm1vdW50ZWQsIHJlZn0gZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IFRpbWVvdXQgPSBOb2RlSlMuVGltZW91dDtcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUFwaShjYWxsQXBpOiAoYWZ0ZXI6ICgpID0+IHZvaWQpID0+IHZvaWQpIHtcbiAgY29uc3QgbG9hZGluZyA9IHJlZjxib29sZWFuPihmYWxzZSk7XG5cbiAgZnVuY3Rpb24gdHJpZ2dlckFwaUNhbGwoKSB7XG4gICAgbG9hZGluZy52YWx1ZSA9IHRydWVcbiAgICBmdW5jdGlvbiBhZnRlcigpOiB2b2lkIHtcbiAgICAgIGxvYWRpbmcudmFsdWUgPSBmYWxzZTtcbiAgICB9XG4gICAgY2FsbEFwaShhZnRlcik7XG4gIH1cblxuICBsZXQgaW50ZXJ2YWxJZDogVGltZW91dDtcblxuICBvbk1vdW50ZWQoKCkgPT4ge1xuICAgIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB0cmlnZ2VyQXBpQ2FsbCgpLCAxMDAwKTtcbiAgICB0cmlnZ2VyQXBpQ2FsbCgpO1xuICB9KTtcblxuICBvblVubW91bnRlZCgoKSA9PiB7XG4gICAgaWYoaW50ZXJ2YWxJZCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4ge1xuICAg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
