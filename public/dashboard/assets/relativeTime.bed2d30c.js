import { a as useSizeProps, e as useSize } from "./use-router-link.1dfef31b.js";
import { c as createComponent, f as hMergeSlotSafely } from "./render.80a4b5ad.js";
import { b as between } from "./format.801e7424.js";
import { c as computed, h, g as getCurrentInstance } from "./index.a2d3f53c.js";
import { c as commonjsGlobal } from "./dayjs.min.54da9cde.js";
const useCircularCommonProps = {
  ...useSizeProps,
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  color: String,
  centerColor: String,
  trackColor: String,
  fontSize: String,
  rounded: Boolean,
  thickness: {
    type: Number,
    default: 0.2,
    validator: (v) => v >= 0 && v <= 1
  },
  angle: {
    type: Number,
    default: 0
  },
  showValue: Boolean,
  reverse: Boolean,
  instantFeedback: Boolean
};
const radius = 50, diameter = 2 * radius, circumference = diameter * Math.PI, strokeDashArray = Math.round(circumference * 1e3) / 1e3;
var QCircularProgress = createComponent({
  name: "QCircularProgress",
  props: {
    ...useCircularCommonProps,
    value: {
      type: Number,
      default: 0
    },
    animationSpeed: {
      type: [String, Number],
      default: 600
    },
    indeterminate: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props);
    const svgStyle = computed(() => {
      const angle = ($q.lang.rtl === true ? -1 : 1) * props.angle;
      return {
        transform: props.reverse !== ($q.lang.rtl === true) ? `scale3d(-1, 1, 1) rotate3d(0, 0, 1, ${-90 - angle}deg)` : `rotate3d(0, 0, 1, ${angle - 90}deg)`
      };
    });
    const circleStyle = computed(() => props.instantFeedback !== true && props.indeterminate !== true ? { transition: `stroke-dashoffset ${props.animationSpeed}ms ease 0s, stroke ${props.animationSpeed}ms ease` } : "");
    const viewBox = computed(() => diameter / (1 - props.thickness / 2));
    const viewBoxAttr = computed(
      () => `${viewBox.value / 2} ${viewBox.value / 2} ${viewBox.value} ${viewBox.value}`
    );
    const normalized = computed(() => between(props.value, props.min, props.max));
    const strokeDashOffset = computed(() => circumference * (1 - (normalized.value - props.min) / (props.max - props.min)));
    const strokeWidth = computed(() => props.thickness / 2 * viewBox.value);
    function getCircle({ thickness, offset, color, cls, rounded }) {
      return h("circle", {
        class: "q-circular-progress__" + cls + (color !== void 0 ? ` text-${color}` : ""),
        style: circleStyle.value,
        fill: "transparent",
        stroke: "currentColor",
        "stroke-width": thickness,
        "stroke-dasharray": strokeDashArray,
        "stroke-dashoffset": offset,
        "stroke-linecap": rounded,
        cx: viewBox.value,
        cy: viewBox.value,
        r: radius
      });
    }
    return () => {
      const svgChild = [];
      props.centerColor !== void 0 && props.centerColor !== "transparent" && svgChild.push(
        h("circle", {
          class: `q-circular-progress__center text-${props.centerColor}`,
          fill: "currentColor",
          r: radius - strokeWidth.value / 2,
          cx: viewBox.value,
          cy: viewBox.value
        })
      );
      props.trackColor !== void 0 && props.trackColor !== "transparent" && svgChild.push(
        getCircle({
          cls: "track",
          thickness: strokeWidth.value,
          offset: 0,
          color: props.trackColor
        })
      );
      svgChild.push(
        getCircle({
          cls: "circle",
          thickness: strokeWidth.value,
          offset: strokeDashOffset.value,
          color: props.color,
          rounded: props.rounded === true ? "round" : void 0
        })
      );
      const child = [
        h("svg", {
          class: "q-circular-progress__svg",
          style: svgStyle.value,
          viewBox: viewBoxAttr.value,
          "aria-hidden": "true"
        }, svgChild)
      ];
      props.showValue === true && child.push(
        h("div", {
          class: "q-circular-progress__text absolute-full row flex-center content-center",
          style: { fontSize: props.fontSize }
        }, slots.default !== void 0 ? slots.default() : [h("div", normalized.value)])
      );
      return h("div", {
        class: `q-circular-progress q-circular-progress--${props.indeterminate === true ? "in" : ""}determinate`,
        style: sizeStyle.value,
        role: "progressbar",
        "aria-valuemin": props.min,
        "aria-valuemax": props.max,
        "aria-valuenow": props.indeterminate === true ? void 0 : normalized.value
      }, hMergeSlotSafely(slots.internal, child));
    };
  }
});
var relativeTime$1 = { exports: {} };
(function(module, exports) {
  !function(r, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    return function(r, e, t) {
      r = r || {};
      var n = e.prototype, o = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function i(r2, e2, t2, o2) {
        return n.fromToBase(r2, e2, t2, o2);
      }
      t.en.relativeTime = o, n.fromToBase = function(e2, n2, i2, d2, u) {
        for (var f, a, s, l = i2.$locale().relativeTime || o, h2 = r.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], m = h2.length, c = 0; c < m; c += 1) {
          var y = h2[c];
          y.d && (f = d2 ? t(e2).diff(i2, y.d, true) : i2.diff(e2, y.d, true));
          var p = (r.rounding || Math.round)(Math.abs(f));
          if (s = f > 0, p <= y.r || !y.r) {
            p <= 1 && c > 0 && (y = h2[c - 1]);
            var v = l[y.l];
            u && (p = u("" + p)), a = "string" == typeof v ? v.replace("%d", p) : v(p, n2, y.l, s);
            break;
          }
        }
        if (n2)
          return a;
        var M = s ? l.future : l.past;
        return "function" == typeof M ? M(a) : M.replace("%s", a);
      }, n.to = function(r2, e2) {
        return i(r2, e2, this, true);
      }, n.from = function(r2, e2) {
        return i(r2, e2, this);
      };
      var d = function(r2) {
        return r2.$u ? t.utc() : t();
      };
      n.toNow = function(r2) {
        return this.to(d(this), r2);
      }, n.fromNow = function(r2) {
        return this.from(d(this), r2);
      };
    };
  });
})(relativeTime$1);
var relativeTime = relativeTime$1.exports;
export { QCircularProgress as Q, relativeTime as r };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpdmVUaW1lLmJlZDJkMzBjLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jaXJjdWxhci1wcm9ncmVzcy91c2UtY2lyY3VsYXItcHJvZ3Jlc3MuanMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9jaXJjdWxhci1wcm9ncmVzcy9RQ2lyY3VsYXJQcm9ncmVzcy5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL3JlbGF0aXZlVGltZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuXG4vLyBhbHNvIHVzZWQgYnkgUUtub2JcbmV4cG9ydCBjb25zdCB1c2VDaXJjdWxhckNvbW1vblByb3BzID0ge1xuICAuLi51c2VTaXplUHJvcHMsXG5cbiAgbWluOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDBcbiAgfSxcbiAgbWF4OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDEwMFxuICB9LFxuXG4gIGNvbG9yOiBTdHJpbmcsXG4gIGNlbnRlckNvbG9yOiBTdHJpbmcsXG4gIHRyYWNrQ29sb3I6IFN0cmluZyxcblxuICBmb250U2l6ZTogU3RyaW5nLFxuICByb3VuZGVkOiBCb29sZWFuLFxuXG4gIC8vIHJhdGlvXG4gIHRoaWNrbmVzczoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICBkZWZhdWx0OiAwLjIsXG4gICAgdmFsaWRhdG9yOiB2ID0+IHYgPj0gMCAmJiB2IDw9IDFcbiAgfSxcblxuICBhbmdsZToge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICBkZWZhdWx0OiAwXG4gIH0sXG5cbiAgc2hvd1ZhbHVlOiBCb29sZWFuLFxuICByZXZlcnNlOiBCb29sZWFuLFxuXG4gIGluc3RhbnRGZWVkYmFjazogQm9vbGVhblxufVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZVNpemUgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcbmltcG9ydCB7IHVzZUNpcmN1bGFyQ29tbW9uUHJvcHMgfSBmcm9tICcuL3VzZS1jaXJjdWxhci1wcm9ncmVzcy5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90U2FmZWx5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0LmpzJ1xuXG5jb25zdFxuICByYWRpdXMgPSA1MCxcbiAgZGlhbWV0ZXIgPSAyICogcmFkaXVzLFxuICBjaXJjdW1mZXJlbmNlID0gZGlhbWV0ZXIgKiBNYXRoLlBJLFxuICBzdHJva2VEYXNoQXJyYXkgPSBNYXRoLnJvdW5kKGNpcmN1bWZlcmVuY2UgKiAxMDAwKSAvIDEwMDBcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDaXJjdWxhclByb2dyZXNzJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUNpcmN1bGFyQ29tbW9uUHJvcHMsXG5cbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG5cbiAgICBhbmltYXRpb25TcGVlZDoge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogNjAwXG4gICAgfSxcblxuICAgIGluZGV0ZXJtaW5hdGU6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzKVxuXG4gICAgY29uc3Qgc3ZnU3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhbmdsZSA9ICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSkgKiBwcm9wcy5hbmdsZVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2Zvcm06IHByb3BzLnJldmVyc2UgIT09ICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSlcbiAgICAgICAgICA/IGBzY2FsZTNkKC0xLCAxLCAxKSByb3RhdGUzZCgwLCAwLCAxLCAkeyAtOTAgLSBhbmdsZSB9ZGVnKWBcbiAgICAgICAgICA6IGByb3RhdGUzZCgwLCAwLCAxLCAkeyBhbmdsZSAtIDkwIH1kZWcpYFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBjaXJjbGVTdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmluc3RhbnRGZWVkYmFjayAhPT0gdHJ1ZSAmJiBwcm9wcy5pbmRldGVybWluYXRlICE9PSB0cnVlXG4gICAgICAgID8geyB0cmFuc2l0aW9uOiBgc3Ryb2tlLWRhc2hvZmZzZXQgJHsgcHJvcHMuYW5pbWF0aW9uU3BlZWQgfW1zIGVhc2UgMHMsIHN0cm9rZSAkeyBwcm9wcy5hbmltYXRpb25TcGVlZCB9bXMgZWFzZWAgfVxuICAgICAgICA6ICcnXG4gICAgKSlcblxuICAgIGNvbnN0IHZpZXdCb3ggPSBjb21wdXRlZCgoKSA9PiBkaWFtZXRlciAvICgxIC0gcHJvcHMudGhpY2tuZXNzIC8gMikpXG5cbiAgICBjb25zdCB2aWV3Qm94QXR0ciA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgJHsgdmlld0JveC52YWx1ZSAvIDIgfSAkeyB2aWV3Qm94LnZhbHVlIC8gMiB9ICR7IHZpZXdCb3gudmFsdWUgfSAkeyB2aWV3Qm94LnZhbHVlIH1gXG4gICAgKVxuXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IGNvbXB1dGVkKCgpID0+IGJldHdlZW4ocHJvcHMudmFsdWUsIHByb3BzLm1pbiwgcHJvcHMubWF4KSlcblxuICAgIGNvbnN0IHN0cm9rZURhc2hPZmZzZXQgPSBjb21wdXRlZCgoKSA9PiBjaXJjdW1mZXJlbmNlICogKFxuICAgICAgMSAtIChub3JtYWxpemVkLnZhbHVlIC0gcHJvcHMubWluKSAvIChwcm9wcy5tYXggLSBwcm9wcy5taW4pXG4gICAgKSlcblxuICAgIGNvbnN0IHN0cm9rZVdpZHRoID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMudGhpY2tuZXNzIC8gMiAqIHZpZXdCb3gudmFsdWUpXG5cbiAgICBmdW5jdGlvbiBnZXRDaXJjbGUgKHsgdGhpY2tuZXNzLCBvZmZzZXQsIGNvbG9yLCBjbHMsIHJvdW5kZWQgfSkge1xuICAgICAgcmV0dXJuIGgoJ2NpcmNsZScsIHtcbiAgICAgICAgY2xhc3M6ICdxLWNpcmN1bGFyLXByb2dyZXNzX18nICsgY2xzICsgKGNvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgY29sb3IgfWAgOiAnJyksXG4gICAgICAgIHN0eWxlOiBjaXJjbGVTdHlsZS52YWx1ZSxcbiAgICAgICAgZmlsbDogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgICAgJ3N0cm9rZS13aWR0aCc6IHRoaWNrbmVzcyxcbiAgICAgICAgJ3N0cm9rZS1kYXNoYXJyYXknOiBzdHJva2VEYXNoQXJyYXksXG4gICAgICAgICdzdHJva2UtZGFzaG9mZnNldCc6IG9mZnNldCxcbiAgICAgICAgJ3N0cm9rZS1saW5lY2FwJzogcm91bmRlZCxcbiAgICAgICAgY3g6IHZpZXdCb3gudmFsdWUsXG4gICAgICAgIGN5OiB2aWV3Qm94LnZhbHVlLFxuICAgICAgICByOiByYWRpdXNcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IHN2Z0NoaWxkID0gW11cblxuICAgICAgcHJvcHMuY2VudGVyQ29sb3IgIT09IHZvaWQgMCAmJiBwcm9wcy5jZW50ZXJDb2xvciAhPT0gJ3RyYW5zcGFyZW50JyAmJiBzdmdDaGlsZC5wdXNoKFxuICAgICAgICBoKCdjaXJjbGUnLCB7XG4gICAgICAgICAgY2xhc3M6IGBxLWNpcmN1bGFyLXByb2dyZXNzX19jZW50ZXIgdGV4dC0keyBwcm9wcy5jZW50ZXJDb2xvciB9YCxcbiAgICAgICAgICBmaWxsOiAnY3VycmVudENvbG9yJyxcbiAgICAgICAgICByOiByYWRpdXMgLSBzdHJva2VXaWR0aC52YWx1ZSAvIDIsXG4gICAgICAgICAgY3g6IHZpZXdCb3gudmFsdWUsXG4gICAgICAgICAgY3k6IHZpZXdCb3gudmFsdWVcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgcHJvcHMudHJhY2tDb2xvciAhPT0gdm9pZCAwICYmIHByb3BzLnRyYWNrQ29sb3IgIT09ICd0cmFuc3BhcmVudCcgJiYgc3ZnQ2hpbGQucHVzaChcbiAgICAgICAgZ2V0Q2lyY2xlKHtcbiAgICAgICAgICBjbHM6ICd0cmFjaycsXG4gICAgICAgICAgdGhpY2tuZXNzOiBzdHJva2VXaWR0aC52YWx1ZSxcbiAgICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgICAgY29sb3I6IHByb3BzLnRyYWNrQ29sb3JcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgc3ZnQ2hpbGQucHVzaChcbiAgICAgICAgZ2V0Q2lyY2xlKHtcbiAgICAgICAgICBjbHM6ICdjaXJjbGUnLFxuICAgICAgICAgIHRoaWNrbmVzczogc3Ryb2tlV2lkdGgudmFsdWUsXG4gICAgICAgICAgb2Zmc2V0OiBzdHJva2VEYXNoT2Zmc2V0LnZhbHVlLFxuICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICByb3VuZGVkOiBwcm9wcy5yb3VuZGVkID09PSB0cnVlID8gJ3JvdW5kJyA6IHZvaWQgMFxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgICAgaCgnc3ZnJywge1xuICAgICAgICAgIGNsYXNzOiAncS1jaXJjdWxhci1wcm9ncmVzc19fc3ZnJyxcbiAgICAgICAgICBzdHlsZTogc3ZnU3R5bGUudmFsdWUsXG4gICAgICAgICAgdmlld0JveDogdmlld0JveEF0dHIudmFsdWUsXG4gICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnXG4gICAgICAgIH0sIHN2Z0NoaWxkKVxuICAgICAgXVxuXG4gICAgICBwcm9wcy5zaG93VmFsdWUgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1jaXJjdWxhci1wcm9ncmVzc19fdGV4dCBhYnNvbHV0ZS1mdWxsIHJvdyBmbGV4LWNlbnRlciBjb250ZW50LWNlbnRlcicsXG4gICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IHByb3BzLmZvbnRTaXplIH1cbiAgICAgICAgfSwgc2xvdHMuZGVmYXVsdCAhPT0gdm9pZCAwID8gc2xvdHMuZGVmYXVsdCgpIDogWyBoKCdkaXYnLCBub3JtYWxpemVkLnZhbHVlKSBdKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogYHEtY2lyY3VsYXItcHJvZ3Jlc3MgcS1jaXJjdWxhci1wcm9ncmVzcy0tJHsgcHJvcHMuaW5kZXRlcm1pbmF0ZSA9PT0gdHJ1ZSA/ICdpbicgOiAnJyB9ZGV0ZXJtaW5hdGVgLFxuICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlLFxuICAgICAgICByb2xlOiAncHJvZ3Jlc3NiYXInLFxuICAgICAgICAnYXJpYS12YWx1ZW1pbic6IHByb3BzLm1pbixcbiAgICAgICAgJ2FyaWEtdmFsdWVtYXgnOiBwcm9wcy5tYXgsXG4gICAgICAgICdhcmlhLXZhbHVlbm93JzogcHJvcHMuaW5kZXRlcm1pbmF0ZSA9PT0gdHJ1ZSA/IHZvaWQgMCA6IG5vcm1hbGl6ZWQudmFsdWVcbiAgICAgIH0sIGhNZXJnZVNsb3RTYWZlbHkoc2xvdHMuaW50ZXJuYWwsIGNoaWxkKSkgLy8gXCJpbnRlcm5hbFwiIGlzIHVzZWQgYnkgUUtub2JcbiAgICB9XG4gIH1cbn0pXG4iLCIhZnVuY3Rpb24ocixlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShlKToocj1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOnJ8fHNlbGYpLmRheWpzX3BsdWdpbl9yZWxhdGl2ZVRpbWU9ZSgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3JldHVybiBmdW5jdGlvbihyLGUsdCl7cj1yfHx7fTt2YXIgbj1lLnByb3RvdHlwZSxvPXtmdXR1cmU6XCJpbiAlc1wiLHBhc3Q6XCIlcyBhZ29cIixzOlwiYSBmZXcgc2Vjb25kc1wiLG06XCJhIG1pbnV0ZVwiLG1tOlwiJWQgbWludXRlc1wiLGg6XCJhbiBob3VyXCIsaGg6XCIlZCBob3Vyc1wiLGQ6XCJhIGRheVwiLGRkOlwiJWQgZGF5c1wiLE06XCJhIG1vbnRoXCIsTU06XCIlZCBtb250aHNcIix5OlwiYSB5ZWFyXCIseXk6XCIlZCB5ZWFyc1wifTtmdW5jdGlvbiBpKHIsZSx0LG8pe3JldHVybiBuLmZyb21Ub0Jhc2UocixlLHQsbyl9dC5lbi5yZWxhdGl2ZVRpbWU9byxuLmZyb21Ub0Jhc2U9ZnVuY3Rpb24oZSxuLGksZCx1KXtmb3IodmFyIGYsYSxzLGw9aS4kbG9jYWxlKCkucmVsYXRpdmVUaW1lfHxvLGg9ci50aHJlc2hvbGRzfHxbe2w6XCJzXCIscjo0NCxkOlwic2Vjb25kXCJ9LHtsOlwibVwiLHI6ODl9LHtsOlwibW1cIixyOjQ0LGQ6XCJtaW51dGVcIn0se2w6XCJoXCIscjo4OX0se2w6XCJoaFwiLHI6MjEsZDpcImhvdXJcIn0se2w6XCJkXCIscjozNX0se2w6XCJkZFwiLHI6MjUsZDpcImRheVwifSx7bDpcIk1cIixyOjQ1fSx7bDpcIk1NXCIscjoxMCxkOlwibW9udGhcIn0se2w6XCJ5XCIscjoxN30se2w6XCJ5eVwiLGQ6XCJ5ZWFyXCJ9XSxtPWgubGVuZ3RoLGM9MDtjPG07Yys9MSl7dmFyIHk9aFtjXTt5LmQmJihmPWQ/dChlKS5kaWZmKGkseS5kLCEwKTppLmRpZmYoZSx5LmQsITApKTt2YXIgcD0oci5yb3VuZGluZ3x8TWF0aC5yb3VuZCkoTWF0aC5hYnMoZikpO2lmKHM9Zj4wLHA8PXkucnx8IXkucil7cDw9MSYmYz4wJiYoeT1oW2MtMV0pO3ZhciB2PWxbeS5sXTt1JiYocD11KFwiXCIrcCkpLGE9XCJzdHJpbmdcIj09dHlwZW9mIHY/di5yZXBsYWNlKFwiJWRcIixwKTp2KHAsbix5Lmwscyk7YnJlYWt9fWlmKG4pcmV0dXJuIGE7dmFyIE09cz9sLmZ1dHVyZTpsLnBhc3Q7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgTT9NKGEpOk0ucmVwbGFjZShcIiVzXCIsYSl9LG4udG89ZnVuY3Rpb24ocixlKXtyZXR1cm4gaShyLGUsdGhpcywhMCl9LG4uZnJvbT1mdW5jdGlvbihyLGUpe3JldHVybiBpKHIsZSx0aGlzKX07dmFyIGQ9ZnVuY3Rpb24ocil7cmV0dXJuIHIuJHU/dC51dGMoKTp0KCl9O24udG9Ob3c9ZnVuY3Rpb24ocil7cmV0dXJuIHRoaXMudG8oZCh0aGlzKSxyKX0sbi5mcm9tTm93PWZ1bmN0aW9uKHIpe3JldHVybiB0aGlzLmZyb20oZCh0aGlzKSxyKX19fSkpOyJdLCJuYW1lcyI6WyJ0aGlzIiwiciIsImUiLCJ0IiwibyIsIm4iLCJpIiwiZCIsImgiXSwibWFwcGluZ3MiOiI7Ozs7O0FBR08sTUFBTSx5QkFBeUI7QUFBQSxFQUNwQyxHQUFHO0FBQUEsRUFFSCxLQUFLO0FBQUEsSUFDSCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsRUFDVjtBQUFBLEVBQ0QsS0FBSztBQUFBLElBQ0gsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1Y7QUFBQSxF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
