import { a as useSizeProps, e as useSize } from "./use-router-link.b59d0f2d.js";
import { c as createComponent, f as hMergeSlotSafely } from "./render.a10da10b.js";
import { b as between } from "./format.801e7424.js";
import { c as computed, h, g as getCurrentInstance } from "./index.24d2f870.js";
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
export { QCircularProgress as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUNpcmN1bGFyUHJvZ3Jlc3MuMGY0NmU1NjQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NpcmN1bGFyLXByb2dyZXNzL3VzZS1jaXJjdWxhci1wcm9ncmVzcy5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NpcmN1bGFyLXByb2dyZXNzL1FDaXJjdWxhclByb2dyZXNzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVNpemVQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvc2FibGVzL3ByaXZhdGUvdXNlLXNpemUuanMnXG5cbi8vIGFsc28gdXNlZCBieSBRS25vYlxuZXhwb3J0IGNvbnN0IHVzZUNpcmN1bGFyQ29tbW9uUHJvcHMgPSB7XG4gIC4uLnVzZVNpemVQcm9wcyxcblxuICBtaW46IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgZGVmYXVsdDogMFxuICB9LFxuICBtYXg6IHtcbiAgICB0eXBlOiBOdW1iZXIsXG4gICAgZGVmYXVsdDogMTAwXG4gIH0sXG5cbiAgY29sb3I6IFN0cmluZyxcbiAgY2VudGVyQ29sb3I6IFN0cmluZyxcbiAgdHJhY2tDb2xvcjogU3RyaW5nLFxuXG4gIGZvbnRTaXplOiBTdHJpbmcsXG4gIHJvdW5kZWQ6IEJvb2xlYW4sXG5cbiAgLy8gcmF0aW9cbiAgdGhpY2tuZXNzOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDAuMixcbiAgICB2YWxpZGF0b3I6IHYgPT4gdiA+PSAwICYmIHYgPD0gMVxuICB9LFxuXG4gIGFuZ2xlOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDBcbiAgfSxcblxuICBzaG93VmFsdWU6IEJvb2xlYW4sXG4gIHJldmVyc2U6IEJvb2xlYW4sXG5cbiAgaW5zdGFudEZlZWRiYWNrOiBCb29sZWFuXG59XG4iLCJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgdXNlU2l6ZSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuaW1wb3J0IHsgdXNlQ2lyY3VsYXJDb21tb25Qcm9wcyB9IGZyb20gJy4vdXNlLWNpcmN1bGFyLXByb2dyZXNzLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3RTYWZlbHkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcbmltcG9ydCB7IGJldHdlZW4gfSBmcm9tICcuLi8uLi91dGlscy9mb3JtYXQuanMnXG5cbmNvbnN0XG4gIHJhZGl1cyA9IDUwLFxuICBkaWFtZXRlciA9IDIgKiByYWRpdXMsXG4gIGNpcmN1bWZlcmVuY2UgPSBkaWFtZXRlciAqIE1hdGguUEksXG4gIHN0cm9rZURhc2hBcnJheSA9IE1hdGgucm91bmQoY2lyY3VtZmVyZW5jZSAqIDEwMDApIC8gMTAwMFxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVDb21wb25lbnQoe1xuICBuYW1lOiAnUUNpcmN1bGFyUHJvZ3Jlc3MnLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlQ2lyY3VsYXJDb21tb25Qcm9wcyxcblxuICAgIHZhbHVlOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICBkZWZhdWx0OiAwXG4gICAgfSxcblxuICAgIGFuaW1hdGlvblNwZWVkOiB7XG4gICAgICB0eXBlOiBbIFN0cmluZywgTnVtYmVyIF0sXG4gICAgICBkZWZhdWx0OiA2MDBcbiAgICB9LFxuXG4gICAgaW5kZXRlcm1pbmF0ZTogQm9vbGVhblxuICB9LFxuXG4gIHNldHVwIChwcm9wcywgeyBzbG90cyB9KSB7XG4gICAgY29uc3QgeyBwcm94eTogeyAkcSB9IH0gPSBnZXRDdXJyZW50SW5zdGFuY2UoKVxuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMpXG5cbiAgICBjb25zdCBzdmdTdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gKCRxLmxhbmcucnRsID09PSB0cnVlID8gLTEgOiAxKSAqIHByb3BzLmFuZ2xlXG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zZm9ybTogcHJvcHMucmV2ZXJzZSAhPT0gKCRxLmxhbmcucnRsID09PSB0cnVlKVxuICAgICAgICAgID8gYHNjYWxlM2QoLTEsIDEsIDEpIHJvdGF0ZTNkKDAsIDAsIDEsICR7IC05MCAtIGFuZ2xlIH1kZWcpYFxuICAgICAgICAgIDogYHJvdGF0ZTNkKDAsIDAsIDEsICR7IGFuZ2xlIC0gOTAgfWRlZylgXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IGNpcmNsZVN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuaW5zdGFudEZlZWRiYWNrICE9PSB0cnVlICYmIHByb3BzLmluZGV0ZXJtaW5hdGUgIT09IHRydWVcbiAgICAgICAgPyB7IHRyYW5zaXRpb246IGBzdHJva2UtZGFzaG9mZnNldCAkeyBwcm9wcy5hbmltYXRpb25TcGVlZCB9bXMgZWFzZSAwcywgc3Ryb2tlICR7IHByb3BzLmFuaW1hdGlvblNwZWVkIH1tcyBlYXNlYCB9XG4gICAgICAgIDogJydcbiAgICApKVxuXG4gICAgY29uc3Qgdmlld0JveCA9IGNvbXB1dGVkKCgpID0+IGRpYW1ldGVyIC8gKDEgLSBwcm9wcy50aGlja25lc3MgLyAyKSlcblxuICAgIGNvbnN0IHZpZXdCb3hBdHRyID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGAkeyB2aWV3Qm94LnZhbHVlIC8gMiB9ICR7IHZpZXdCb3gudmFsdWUgLyAyIH0gJHsgdmlld0JveC52YWx1ZSB9ICR7IHZpZXdCb3gudmFsdWUgfWBcbiAgICApXG5cbiAgICBjb25zdCBub3JtYWxpemVkID0gY29tcHV0ZWQoKCkgPT4gYmV0d2Vlbihwcm9wcy52YWx1ZSwgcHJvcHMubWluLCBwcm9wcy5tYXgpKVxuXG4gICAgY29uc3Qgc3Ryb2tlRGFzaE9mZnNldCA9IGNvbXB1dGVkKCgpID0+IGNpcmN1bWZlcmVuY2UgKiAoXG4gICAgICAxIC0gKG5vcm1hbGl6ZWQudmFsdWUgLSBwcm9wcy5taW4pIC8gKHByb3BzLm1heCAtIHByb3BzLm1pbilcbiAgICApKVxuXG4gICAgY29uc3Qgc3Ryb2tlV2lkdGggPSBjb21wdXRlZCgoKSA9PiBwcm9wcy50aGlja25lc3MgLyAyICogdmlld0JveC52YWx1ZSlcblxuICAgIGZ1bmN0aW9uIGdldENpcmNsZSAoeyB0aGlja25lc3MsIG9mZnNldCwgY29sb3IsIGNscywgcm91bmRlZCB9KSB7XG4gICAgICByZXR1cm4gaCgnY2lyY2xlJywge1xuICAgICAgICBjbGFzczogJ3EtY2lyY3VsYXItcHJvZ3Jlc3NfXycgKyBjbHMgKyAoY29sb3IgIT09IHZvaWQgMCA/IGAgdGV4dC0keyBjb2xvciB9YCA6ICcnKSxcbiAgICAgICAgc3R5bGU6IGNpcmNsZVN0eWxlLnZhbHVlLFxuICAgICAgICBmaWxsOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICBzdHJva2U6ICdjdXJyZW50Q29sb3InLFxuICAgICAgICAnc3Ryb2tlLXdpZHRoJzogdGhpY2tuZXNzLFxuICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6IHN0cm9rZURhc2hBcnJheSxcbiAgICAgICAgJ3N0cm9rZS1kYXNob2Zmc2V0Jzogb2Zmc2V0LFxuICAgICAgICAnc3Ryb2tlLWxpbmVjYXAnOiByb3VuZGVkLFxuICAgICAgICBjeDogdmlld0JveC52YWx1ZSxcbiAgICAgICAgY3k6IHZpZXdCb3gudmFsdWUsXG4gICAgICAgIHI6IHJhZGl1c1xuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3Qgc3ZnQ2hpbGQgPSBbXVxuXG4gICAgICBwcm9wcy5jZW50ZXJDb2xvciAhPT0gdm9pZCAwICYmIHByb3BzLmNlbnRlckNvbG9yICE9PSAndHJhbnNwYXJlbnQnICYmIHN2Z0NoaWxkLnB1c2goXG4gICAgICAgIGgoJ2NpcmNsZScsIHtcbiAgICAgICAgICBjbGFzczogYHEtY2lyY3VsYXItcHJvZ3Jlc3NfX2NlbnRlciB0ZXh0LSR7IHByb3BzLmNlbnRlckNvbG9yIH1gLFxuICAgICAgICAgIGZpbGw6ICdjdXJyZW50Q29sb3InLFxuICAgICAgICAgIHI6IHJhZGl1cyAtIHN0cm9rZVdpZHRoLnZhbHVlIC8gMixcbiAgICAgICAgICBjeDogdmlld0JveC52YWx1ZSxcbiAgICAgICAgICBjeTogdmlld0JveC52YWx1ZVxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBwcm9wcy50cmFja0NvbG9yICE9PSB2b2lkIDAgJiYgcHJvcHMudHJhY2tDb2xvciAhPT0gJ3RyYW5zcGFyZW50JyAmJiBzdmdDaGlsZC5wdXNoKFxuICAgICAgICBnZXRDaXJjbGUoe1xuICAgICAgICAgIGNsczogJ3RyYWNrJyxcbiAgICAgICAgICB0aGlja25lc3M6IHN0cm9rZVdpZHRoLnZhbHVlLFxuICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICBjb2xvcjogcHJvcHMudHJhY2tDb2xvclxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBzdmdDaGlsZC5wdXNoKFxuICAgICAgICBnZXRDaXJjbGUoe1xuICAgICAgICAgIGNsczogJ2NpcmNsZScsXG4gICAgICAgICAgdGhpY2tuZXNzOiBzdHJva2VXaWR0aC52YWx1ZSxcbiAgICAgICAgICBvZmZzZXQ6IHN0cm9rZURhc2hPZmZzZXQudmFsdWUsXG4gICAgICAgICAgY29sb3I6IHByb3BzLmNvbG9yLFxuICAgICAgICAgIHJvdW5kZWQ6IHByb3BzLnJvdW5kZWQgPT09IHRydWUgPyAncm91bmQnIDogdm9pZCAwXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGNoaWxkID0gW1xuICAgICAgICBoKCdzdmcnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNpcmN1bGFyLXByb2dyZXNzX19zdmcnLFxuICAgICAgICAgIHN0eWxlOiBzdmdTdHlsZS52YWx1ZSxcbiAgICAgICAgICB2aWV3Qm94OiB2aWV3Qm94QXR0ci52YWx1ZSxcbiAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZSdcbiAgICAgICAgfSwgc3ZnQ2hpbGQpXG4gICAgICBdXG5cbiAgICAgIHByb3BzLnNob3dWYWx1ZSA9PT0gdHJ1ZSAmJiBjaGlsZC5wdXNoKFxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWNpcmN1bGFyLXByb2dyZXNzX190ZXh0IGFic29sdXRlLWZ1bGwgcm93IGZsZXgtY2VudGVyIGNvbnRlbnQtY2VudGVyJyxcbiAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogcHJvcHMuZm9udFNpemUgfVxuICAgICAgICB9LCBzbG90cy5kZWZhdWx0ICE9PSB2b2lkIDAgPyBzbG90cy5kZWZhdWx0KCkgOiBbIGgoJ2RpdicsIG5vcm1hbGl6ZWQudmFsdWUpIF0pXG4gICAgICApXG5cbiAgICAgIHJldHVybiBoKCdkaXYnLCB7XG4gICAgICAgIGNsYXNzOiBgcS1jaXJjdWxhci1wcm9ncmVzcyBxLWNpcmN1bGFyLXByb2dyZXNzLS0keyBwcm9wcy5pbmRldGVybWluYXRlID09PSB0cnVlID8gJ2luJyA6ICcnIH1kZXRlcm1pbmF0ZWAsXG4gICAgICAgIHN0eWxlOiBzaXplU3R5bGUudmFsdWUsXG4gICAgICAgIHJvbGU6ICdwcm9ncmVzc2JhcicsXG4gICAgICAgICdhcmlhLXZhbHVlbWluJzogcHJvcHMubWluLFxuICAgICAgICAnYXJpYS12YWx1ZW1heCc6IHByb3BzLm1heCxcbiAgICAgICAgJ2FyaWEtdmFsdWVub3cnOiBwcm9wcy5pbmRldGVybWluYXRlID09PSB0cnVlID8gdm9pZCAwIDogbm9ybWFsaXplZC52YWx1ZVxuICAgICAgfSwgaE1lcmdlU2xvdFNhZmVseShzbG90cy5pbnRlcm5hbCwgY2hpbGQpKSAvLyBcImludGVybmFsXCIgaXMgdXNlZCBieSBRS25v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
