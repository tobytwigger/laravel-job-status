import { Q as QItemSection, b as QItemLabel, c as QItem, d as QList } from "./QItem.c7d62c54.js";
import { u as useApi, Q as QSeparator } from "./useApi.8998e5ff.js";
import { Q as QPage, a as api } from "./api.e5bc72a3.js";
import { R as Ripple } from "./Ripple.873e38f6.js";
import { a as useSizeProps, c as useSize, Q as QIcon } from "./use-router-link.53b142c1.js";
import { c as createComponent, f as hMergeSlotSafely } from "./render.61be68e7.js";
import { b as between } from "./format.801e7424.js";
import { c as computed, h, g as getCurrentInstance, _ as _export_sfc, K as defineComponent, L as openBlock, M as createBlock, N as withCtx, d as createVNode, Z as unref, O as createCommentVNode, P as createTextVNode, Q as toDisplayString, R as createBaseVNode, S as createElementBlock, r as ref, D as withDirectives, U as renderList, F as Fragment } from "./index.bb057e5d.js";
import { S as Status } from "./api.e4579eee.js";
import { c as commonjsGlobal, d as dayjs } from "./dayjs.min.54da9cde.js";
import "./index.aa7156d4.js";
import "./config.b6f61684.js";
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
const _hoisted_1 = { class: "text-weight-medium" };
const _hoisted_2 = {
  key: 0,
  class: "text-grey-8"
};
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = { class: "text-grey-8 q-gutter-xs" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TrackedRunListItem",
  props: {
    trackedRun: null
  },
  setup(__props) {
    const props = __props;
    dayjs.extend(relativeTime);
    const timeAgo = computed(() => dayjs().to(props.trackedRun.created_at));
    const tryCount = computed(() => {
      let tries = 1;
      let run = props.trackedRun;
      while (run.parent !== null) {
        run = run.parent;
        tries++;
      }
      return tries;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QItem, {
        clickable: "",
        to: { name: "run.show", params: { jobStatusId: props.trackedRun.id } }
      }, {
        default: withCtx(() => [
          createVNode(QItemSection, {
            avatar: "",
            top: ""
          }, {
            default: withCtx(() => [
              props.trackedRun.status === unref(Status).Queued ? (openBlock(), createBlock(QIcon, {
                key: 0,
                name: "hourglass_top",
                color: "black",
                size: "34px"
              })) : props.trackedRun.status === unref(Status).Started ? (openBlock(), createBlock(QCircularProgress, {
                key: 1,
                "show-value": "",
                value: props.trackedRun.percentage,
                rounded: "",
                size: "34px",
                class: "q-ma-md"
              }, null, 8, ["value"])) : props.trackedRun.status === unref(Status).Succeeded ? (openBlock(), createBlock(QIcon, {
                key: 2,
                name: "done",
                color: "black",
                size: "34px"
              })) : props.trackedRun.status === unref(Status).Failed ? (openBlock(), createBlock(QIcon, {
                key: 3,
                name: "close",
                color: "black",
                size: "34px"
              })) : props.trackedRun.status === unref(Status).Cancelled ? (openBlock(), createBlock(QIcon, {
                key: 4,
                name: "not_interested",
                color: "black",
                size: "34px"
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createVNode(QItemSection, {
            top: "",
            class: "col-2 gt-sm"
          }, {
            default: withCtx(() => [
              createVNode(QItemLabel, { class: "q-mt-sm" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(timeAgo)), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QItemSection, { top: "" }, {
            default: withCtx(() => [
              createVNode(QItemLabel, { lines: "1" }, {
                default: withCtx(() => [
                  createBaseVNode("span", _hoisted_1, toDisplayString(props.trackedRun.status), 1),
                  unref(Status).Failed && unref(tryCount) > 0 ? (openBlock(), createElementBlock("span", _hoisted_2, " - " + toDisplayString(unref(tryCount)) + " " + toDisplayString(unref(tryCount) > 1 ? "attempts" : "attempt"), 1)) : createCommentVNode("", true)
                ]),
                _: 1
              }),
              createVNode(QItemLabel, { caption: "" }, {
                default: withCtx(() => [
                  props.trackedRun.messages.length > 0 ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(props.trackedRun.messages.length) + " " + toDisplayString(props.trackedRun.messages.length > 1 ? "messages" : "message") + ". ", 1)) : createCommentVNode("", true),
                  props.trackedRun.signals.length > 0 ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(props.trackedRun.signals.length) + " " + toDisplayString(props.trackedRun.signals.length > 1 ? "signals" : "signal") + ". ", 1)) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QItemSection, {
            top: "",
            side: ""
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_5, [
                createVNode(QIcon, {
                  class: "gt-xs",
                  size: "12px",
                  icon: "keyboard_arrow_right"
                })
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["to"]);
    };
  }
});
var TrackedRunListItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "TrackedRunListItem.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "JobShowPage",
  props: {
    alias: null
  },
  setup(__props) {
    const props = __props;
    const results = ref(null);
    useApi((after) => {
      api.jobShow(props.alias).then((response) => results.value = response).finally(after);
    });
    function getHash(jobRun) {
      return jobRun.uuid;
    }
    return (_ctx, _cache) => {
      return results.value !== null ? (openBlock(), createBlock(QPage, {
        key: 0,
        class: "row items-center justify-evenly"
      }, {
        default: withCtx(() => [
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
              ])
            ]),
            _: 1
          }),
          createVNode(QList, {
            bordered: "",
            class: "rounded-borders",
            style: { "min-width": "85%" }
          }, {
            default: withCtx(() => [
              createVNode(QItemLabel, { header: "" }, {
                default: withCtx(() => [
                  createTextVNode("Runs")
                ]),
                _: 1
              }),
              createVNode(QSeparator),
              (openBlock(true), createElementBlock(Fragment, null, renderList(results.value.runs, (run) => {
                return openBlock(), createElementBlock("div", {
                  key: getHash(run)
                }, [
                  createVNode(TrackedRunListItem, { "tracked-run": run }, null, 8, ["tracked-run"]),
                  createVNode(QSeparator)
                ]);
              }), 128))
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
var JobShowPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "JobShowPage.vue"]]);
export { JobShowPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iU2hvd1BhZ2UuYjgwYzc0NmEuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NpcmN1bGFyLXByb2dyZXNzL3VzZS1jaXJjdWxhci1wcm9ncmVzcy5qcyIsIi4uLy4uLy4uL2Rhc2hib2FyZC9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9jb21wb25lbnRzL2NpcmN1bGFyLXByb2dyZXNzL1FDaXJjdWxhclByb2dyZXNzLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9kYXlqcy9wbHVnaW4vcmVsYXRpdmVUaW1lLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9jb21wb25lbnRzL1RyYWNrZWRSdW5MaXN0SXRlbS52dWUiLCIuLi8uLi8uLi9kYXNoYm9hcmQvc3JjL3BhZ2VzL0pvYlNob3dQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuXG4vLyBhbHNvIHVzZWQgYnkgUUtub2JcbmV4cG9ydCBjb25zdCB1c2VDaXJjdWxhckNvbW1vblByb3BzID0ge1xuICAuLi51c2VTaXplUHJvcHMsXG5cbiAgbWluOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDBcbiAgfSxcbiAgbWF4OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDEwMFxuICB9LFxuXG4gIGNvbG9yOiBTdHJpbmcsXG4gIGNlbnRlckNvbG9yOiBTdHJpbmcsXG4gIHRyYWNrQ29sb3I6IFN0cmluZyxcblxuICBmb250U2l6ZTogU3RyaW5nLFxuICByb3VuZGVkOiBCb29sZWFuLFxuXG4gIC8vIHJhdGlvXG4gIHRoaWNrbmVzczoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICBkZWZhdWx0OiAwLjIsXG4gICAgdmFsaWRhdG9yOiB2ID0+IHYgPj0gMCAmJiB2IDw9IDFcbiAgfSxcblxuICBhbmdsZToge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICBkZWZhdWx0OiAwXG4gIH0sXG5cbiAgc2hvd1ZhbHVlOiBCb29sZWFuLFxuICByZXZlcnNlOiBCb29sZWFuLFxuXG4gIGluc3RhbnRGZWVkYmFjazogQm9vbGVhblxufVxuIiwiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGdldEN1cnJlbnRJbnN0YW5jZSB9IGZyb20gJ3Z1ZSdcblxuaW1wb3J0IHVzZVNpemUgZnJvbSAnLi4vLi4vY29tcG9zYWJsZXMvcHJpdmF0ZS91c2Utc2l6ZS5qcydcbmltcG9ydCB7IHVzZUNpcmN1bGFyQ29tbW9uUHJvcHMgfSBmcm9tICcuL3VzZS1jaXJjdWxhci1wcm9ncmVzcy5qcydcblxuaW1wb3J0IHsgY3JlYXRlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgeyBoTWVyZ2VTbG90U2FmZWx5IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBiZXR3ZWVuIH0gZnJvbSAnLi4vLi4vdXRpbHMvZm9ybWF0LmpzJ1xuXG5jb25zdFxuICByYWRpdXMgPSA1MCxcbiAgZGlhbWV0ZXIgPSAyICogcmFkaXVzLFxuICBjaXJjdW1mZXJlbmNlID0gZGlhbWV0ZXIgKiBNYXRoLlBJLFxuICBzdHJva2VEYXNoQXJyYXkgPSBNYXRoLnJvdW5kKGNpcmN1bWZlcmVuY2UgKiAxMDAwKSAvIDEwMDBcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FDaXJjdWxhclByb2dyZXNzJyxcblxuICBwcm9wczoge1xuICAgIC4uLnVzZUNpcmN1bGFyQ29tbW9uUHJvcHMsXG5cbiAgICB2YWx1ZToge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG5cbiAgICBhbmltYXRpb25TcGVlZDoge1xuICAgICAgdHlwZTogWyBTdHJpbmcsIE51bWJlciBdLFxuICAgICAgZGVmYXVsdDogNjAwXG4gICAgfSxcblxuICAgIGluZGV0ZXJtaW5hdGU6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHsgcHJveHk6IHsgJHEgfSB9ID0gZ2V0Q3VycmVudEluc3RhbmNlKClcbiAgICBjb25zdCBzaXplU3R5bGUgPSB1c2VTaXplKHByb3BzKVxuXG4gICAgY29uc3Qgc3ZnU3R5bGUgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICBjb25zdCBhbmdsZSA9ICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSA/IC0xIDogMSkgKiBwcm9wcy5hbmdsZVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc2Zvcm06IHByb3BzLnJldmVyc2UgIT09ICgkcS5sYW5nLnJ0bCA9PT0gdHJ1ZSlcbiAgICAgICAgICA/IGBzY2FsZTNkKC0xLCAxLCAxKSByb3RhdGUzZCgwLCAwLCAxLCAkeyAtOTAgLSBhbmdsZSB9ZGVnKWBcbiAgICAgICAgICA6IGByb3RhdGUzZCgwLCAwLCAxLCAkeyBhbmdsZSAtIDkwIH1kZWcpYFxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBjaXJjbGVTdHlsZSA9IGNvbXB1dGVkKCgpID0+IChcbiAgICAgIHByb3BzLmluc3RhbnRGZWVkYmFjayAhPT0gdHJ1ZSAmJiBwcm9wcy5pbmRldGVybWluYXRlICE9PSB0cnVlXG4gICAgICAgID8geyB0cmFuc2l0aW9uOiBgc3Ryb2tlLWRhc2hvZmZzZXQgJHsgcHJvcHMuYW5pbWF0aW9uU3BlZWQgfW1zIGVhc2UgMHMsIHN0cm9rZSAkeyBwcm9wcy5hbmltYXRpb25TcGVlZCB9bXMgZWFzZWAgfVxuICAgICAgICA6ICcnXG4gICAgKSlcblxuICAgIGNvbnN0IHZpZXdCb3ggPSBjb21wdXRlZCgoKSA9PiBkaWFtZXRlciAvICgxIC0gcHJvcHMudGhpY2tuZXNzIC8gMikpXG5cbiAgICBjb25zdCB2aWV3Qm94QXR0ciA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBgJHsgdmlld0JveC52YWx1ZSAvIDIgfSAkeyB2aWV3Qm94LnZhbHVlIC8gMiB9ICR7IHZpZXdCb3gudmFsdWUgfSAkeyB2aWV3Qm94LnZhbHVlIH1gXG4gICAgKVxuXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IGNvbXB1dGVkKCgpID0+IGJldHdlZW4ocHJvcHMudmFsdWUsIHByb3BzLm1pbiwgcHJvcHMubWF4KSlcblxuICAgIGNvbnN0IHN0cm9rZURhc2hPZmZzZXQgPSBjb21wdXRlZCgoKSA9PiBjaXJjdW1mZXJlbmNlICogKFxuICAgICAgMSAtIChub3JtYWxpemVkLnZhbHVlIC0gcHJvcHMubWluKSAvIChwcm9wcy5tYXggLSBwcm9wcy5taW4pXG4gICAgKSlcblxuICAgIGNvbnN0IHN0cm9rZVdpZHRoID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMudGhpY2tuZXNzIC8gMiAqIHZpZXdCb3gudmFsdWUpXG5cbiAgICBmdW5jdGlvbiBnZXRDaXJjbGUgKHsgdGhpY2tuZXNzLCBvZmZzZXQsIGNvbG9yLCBjbHMsIHJvdW5kZWQgfSkge1xuICAgICAgcmV0dXJuIGgoJ2NpcmNsZScsIHtcbiAgICAgICAgY2xhc3M6ICdxLWNpcmN1bGFyLXByb2dyZXNzX18nICsgY2xzICsgKGNvbG9yICE9PSB2b2lkIDAgPyBgIHRleHQtJHsgY29sb3IgfWAgOiAnJyksXG4gICAgICAgIHN0eWxlOiBjaXJjbGVTdHlsZS52YWx1ZSxcbiAgICAgICAgZmlsbDogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgc3Ryb2tlOiAnY3VycmVudENvbG9yJyxcbiAgICAgICAgJ3N0cm9rZS13aWR0aCc6IHRoaWNrbmVzcyxcbiAgICAgICAgJ3N0cm9rZS1kYXNoYXJyYXknOiBzdHJva2VEYXNoQXJyYXksXG4gICAgICAgICdzdHJva2UtZGFzaG9mZnNldCc6IG9mZnNldCxcbiAgICAgICAgJ3N0cm9rZS1saW5lY2FwJzogcm91bmRlZCxcbiAgICAgICAgY3g6IHZpZXdCb3gudmFsdWUsXG4gICAgICAgIGN5OiB2aWV3Qm94LnZhbHVlLFxuICAgICAgICByOiByYWRpdXNcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNvbnN0IHN2Z0NoaWxkID0gW11cblxuICAgICAgcHJvcHMuY2VudGVyQ29sb3IgIT09IHZvaWQgMCAmJiBwcm9wcy5jZW50ZXJDb2xvciAhPT0gJ3RyYW5zcGFyZW50JyAmJiBzdmdDaGlsZC5wdXNoKFxuICAgICAgICBoKCdjaXJjbGUnLCB7XG4gICAgICAgICAgY2xhc3M6IGBxLWNpcmN1bGFyLXByb2dyZXNzX19jZW50ZXIgdGV4dC0keyBwcm9wcy5jZW50ZXJDb2xvciB9YCxcbiAgICAgICAgICBmaWxsOiAnY3VycmVudENvbG9yJyxcbiAgICAgICAgICByOiByYWRpdXMgLSBzdHJva2VXaWR0aC52YWx1ZSAvIDIsXG4gICAgICAgICAgY3g6IHZpZXdCb3gudmFsdWUsXG4gICAgICAgICAgY3k6IHZpZXdCb3gudmFsdWVcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgcHJvcHMudHJhY2tDb2xvciAhPT0gdm9pZCAwICYmIHByb3BzLnRyYWNrQ29sb3IgIT09ICd0cmFuc3BhcmVudCcgJiYgc3ZnQ2hpbGQucHVzaChcbiAgICAgICAgZ2V0Q2lyY2xlKHtcbiAgICAgICAgICBjbHM6ICd0cmFjaycsXG4gICAgICAgICAgdGhpY2tuZXNzOiBzdHJva2VXaWR0aC52YWx1ZSxcbiAgICAgICAgICBvZmZzZXQ6IDAsXG4gICAgICAgICAgY29sb3I6IHByb3BzLnRyYWNrQ29sb3JcbiAgICAgICAgfSlcbiAgICAgIClcblxuICAgICAgc3ZnQ2hpbGQucHVzaChcbiAgICAgICAgZ2V0Q2lyY2xlKHtcbiAgICAgICAgICBjbHM6ICdjaXJjbGUnLFxuICAgICAgICAgIHRoaWNrbmVzczogc3Ryb2tlV2lkdGgudmFsdWUsXG4gICAgICAgICAgb2Zmc2V0OiBzdHJva2VEYXNoT2Zmc2V0LnZhbHVlLFxuICAgICAgICAgIGNvbG9yOiBwcm9wcy5jb2xvcixcbiAgICAgICAgICByb3VuZGVkOiBwcm9wcy5yb3VuZGVkID09PSB0cnVlID8gJ3JvdW5kJyA6IHZvaWQgMFxuICAgICAgICB9KVxuICAgICAgKVxuXG4gICAgICBjb25zdCBjaGlsZCA9IFtcbiAgICAgICAgaCgnc3ZnJywge1xuICAgICAgICAgIGNsYXNzOiAncS1jaXJjdWxhci1wcm9ncmVzc19fc3ZnJyxcbiAgICAgICAgICBzdHlsZTogc3ZnU3R5bGUudmFsdWUsXG4gICAgICAgICAgdmlld0JveDogdmlld0JveEF0dHIudmFsdWUsXG4gICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ3RydWUnXG4gICAgICAgIH0sIHN2Z0NoaWxkKVxuICAgICAgXVxuXG4gICAgICBwcm9wcy5zaG93VmFsdWUgPT09IHRydWUgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1jaXJjdWxhci1wcm9ncmVzc19fdGV4dCBhYnNvbHV0ZS1mdWxsIHJvdyBmbGV4LWNlbnRlciBjb250ZW50LWNlbnRlcicsXG4gICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IHByb3BzLmZvbnRTaXplIH1cbiAgICAgICAgfSwgc2xvdHMuZGVmYXVsdCAhPT0gdm9pZCAwID8gc2xvdHMuZGVmYXVsdCgpIDogWyBoKCdkaXYnLCBub3JtYWxpemVkLnZhbHVlKSBdKVxuICAgICAgKVxuXG4gICAgICByZXR1cm4gaCgnZGl2Jywge1xuICAgICAgICBjbGFzczogYHEtY2lyY3VsYXItcHJvZ3Jlc3MgcS1jaXJjdWxhci1wcm9ncmVzcy0tJHsgcHJvcHMuaW5kZXRlcm1pbmF0ZSA9PT0gdHJ1ZSA/ICdpbicgOiAnJyB9ZGV0ZXJtaW5hdGVgLFxuICAgICAgICBzdHlsZTogc2l6ZVN0eWxlLnZhbHVlLFxuICAgICAgICByb2xlOiAncHJvZ3Jlc3NiYXInLFxuICAgICAgICAnYXJpYS12YWx1ZW1pbic6IHByb3BzLm1pbixcbiAgICAgICAgJ2FyaWEtdmFsdWVtYXgnOiBwcm9wcy5tYXgsXG4gICAgICAgICdhcmlhLXZhbHVlbm93JzogcHJvcHMuaW5kZXRlcm1pbmF0ZSA9PT0gdHJ1ZSA/IHZvaWQgMCA6IG5vcm1hbGl6ZWQudmFsdWVcbiAgICAgIH0sIGhNZXJnZVNsb3RTYWZlbHkoc2xvdHMuaW50ZXJuYWwsIGNoaWxkKSkgLy8gXCJpbnRlcm5hbFwiIGlzIHVzZWQgYnkgUUtub2JcbiAgICB9XG4gIH1cbn0pXG4iLCIhZnVuY3Rpb24ocixlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShlKToocj1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOnJ8fHNlbGYpLmRheWpzX3BsdWdpbl9yZWxhdGl2ZVRpbWU9ZSgpfSh0aGlzLChmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3JldHVybiBmdW5jdGlvbihyLGUsdCl7cj1yfHx7fTt2YXIgbj1lLnByb3RvdHlwZSxvPXtmdXR1cmU6XCJpbiAlc1wiLHBhc3Q6XCIlcyBhZ29cIixzOlwiYSBmZXcgc2Vjb25kc1wiLG06XCJhIG1pbnV0ZVwiLG1tOlwiJWQgbWludXRlc1wiLGg6XCJhbiBob3VyXCIsaGg6XCIlZCBob3Vyc1wiLGQ6XCJhIGRheVwiLGRkOlwiJWQgZGF5c1wiLE06XCJhIG1vbnRoXCIsTU06XCIlZCBtb250aHNcIix5OlwiYSB5ZWFyXCIseXk6XCIlZCB5ZWFyc1wifTtmdW5jdGlvbiBpKHIsZSx0LG8pe3JldHVybiBuLmZyb21Ub0Jhc2UocixlLHQsbyl9dC5lbi5yZWxhdGl2ZVRpbWU9byxuLmZyb21Ub0Jhc2U9ZnVuY3Rpb24oZSxuLGksZCx1KXtmb3IodmFyIGYsYSxzLGw9aS4kbG9jYWxlKCkucmVsYXRpdmVUaW1lfHxvLGg9ci50aHJlc2hvbGRzfHxbe2w6XCJzXCIscjo0NCxkOlwic2Vjb25kXCJ9LHtsOlwibVwiLHI6ODl9LHtsOlwibW1cIixyOjQ0LGQ6XCJtaW51dGVcIn0se2w6XCJoXCIscjo4OX0se2w6XCJoaFwiLHI6MjEsZDpcImhvdXJcIn0se2w6XCJkXCIscjozNX0se2w6XCJkZFwiLHI6MjUsZDpcImRheVwifSx7bDpcIk1cIixyOjQ1fSx7bDpcIk1NXCIscjoxMCxkOlwibW9udGhcIn0se2w6XCJ5XCIscjoxN30se2w6XCJ5eVwiLGQ6XCJ5ZWFyXCJ9XSxtPWgubGVuZ3RoLGM9MDtjPG07Yys9MSl7dmFyIHk9aFtjXTt5LmQmJihmPWQ/dChlKS5kaWZmKGkseS5kLCEwKTppLmRpZmYoZSx5LmQsITApKTt2YXIgcD0oci5yb3VuZGluZ3x8TWF0aC5yb3VuZCkoTWF0aC5hYnMoZikpO2lmKHM9Zj4wLHA8PXkucnx8IXkucil7cDw9MSYmYz4wJiYoeT1oW2MtMV0pO3ZhciB2PWxbeS5sXTt1JiYocD11KFwiXCIrcCkpLGE9XCJzdHJpbmdcIj09dHlwZW9mIHY/di5yZXBsYWNlKFwiJWRcIixwKTp2KHAsbix5Lmwscyk7YnJlYWt9fWlmKG4pcmV0dXJuIGE7dmFyIE09cz9sLmZ1dHVyZTpsLnBhc3Q7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgTT9NKGEpOk0ucmVwbGFjZShcIiVzXCIsYSl9LG4udG89ZnVuY3Rpb24ocixlKXtyZXR1cm4gaShyLGUsdGhpcywhMCl9LG4uZnJvbT1mdW5jdGlvbihyLGUpe3JldHVybiBpKHIsZSx0aGlzKX07dmFyIGQ9ZnVuY3Rpb24ocil7cmV0dXJuIHIuJHU/dC51dGMoKTp0KCl9O24udG9Ob3c9ZnVuY3Rpb24ocil7cmV0dXJuIHRoaXMudG8oZCh0aGlzKSxyKX0sbi5mcm9tTm93PWZ1bmN0aW9uKHIpe3JldHVybiB0aGlzLmZyb20oZCh0aGlzKSxyKX19fSkpOyIsIjx0ZW1wbGF0ZT5cbiAgPHEtaXRlbSBjbGlja2FibGUgOnRvPVwie25hbWU6ICdydW4uc2hvdycsIHBhcmFtczoge2pvYlN0YXR1c0lkOiBwcm9wcy50cmFja2VkUnVuLmlkfX1cIj5cbiAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyIHRvcD5cbiAgICAgIDxxLWljb24gbmFtZT1cImhvdXJnbGFzc190b3BcIiBjb2xvcj1cImJsYWNrXCIgc2l6ZT1cIjM0cHhcIiB2LWlmPVwicHJvcHMudHJhY2tlZFJ1bi5zdGF0dXMgPT09IFN0YXR1cy5RdWV1ZWRcIiAvPlxuICAgICAgPHEtY2lyY3VsYXItcHJvZ3Jlc3NcbiAgICAgICAgc2hvdy12YWx1ZVxuICAgICAgICA6dmFsdWU9XCJwcm9wcy50cmFja2VkUnVuLnBlcmNlbnRhZ2VcIlxuICAgICAgICByb3VuZGVkXG4gICAgICAgIHYtZWxzZS1pZj1cInByb3BzLnRyYWNrZWRSdW4uc3RhdHVzID09PSBTdGF0dXMuU3RhcnRlZFwiXG4gICAgICAgIHNpemU9XCIzNHB4XCJcbiAgICAgICAgY2xhc3M9XCJxLW1hLW1kXCJcbiAgICAgIC8+XG4gICAgICA8cS1pY29uIG5hbWU9XCJkb25lXCIgY29sb3I9XCJibGFja1wiIHNpemU9XCIzNHB4XCIgdi1lbHNlLWlmPVwicHJvcHMudHJhY2tlZFJ1bi5zdGF0dXMgPT09IFN0YXR1cy5TdWNjZWVkZWRcIiAvPlxuICAgICAgPHEtaWNvbiBuYW1lPVwiY2xvc2VcIiBjb2xvcj1cImJsYWNrXCIgc2l6ZT1cIjM0cHhcIiB2LWVsc2UtaWY9XCJwcm9wcy50cmFja2VkUnVuLnN0YXR1cyA9PT0gU3RhdHVzLkZhaWxlZFwiIC8+XG4gICAgICA8cS1pY29uIG5hbWU9XCJub3RfaW50ZXJlc3RlZFwiIGNvbG9yPVwiYmxhY2tcIiBzaXplPVwiMzRweFwiIHYtZWxzZS1pZj1cInByb3BzLnRyYWNrZWRSdW4uc3RhdHVzID09PSBTdGF0dXMuQ2FuY2VsbGVkXCIgLz5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgPHEtaXRlbS1zZWN0aW9uIHRvcCBjbGFzcz1cImNvbC0yIGd0LXNtXCI+XG4gICAgICA8cS1pdGVtLWxhYmVsIGNsYXNzPVwicS1tdC1zbVwiPnt7IHRpbWVBZ28gfX08L3EtaXRlbS1sYWJlbD5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgPHEtaXRlbS1zZWN0aW9uIHRvcD5cbiAgICAgIDxxLWl0ZW0tbGFiZWwgbGluZXM9XCIxXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC13ZWlnaHQtbWVkaXVtXCI+e3twcm9wcy50cmFja2VkUnVuLnN0YXR1c319PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZ3JleS04XCIgdi1pZj1cIlN0YXR1cy5GYWlsZWQgJiYgdHJ5Q291bnQgPiAwXCI+IC0ge3t0cnlDb3VudH19IHt7dHJ5Q291bnQgPiAxID8gJ2F0dGVtcHRzJyA6ICdhdHRlbXB0J319PC9zcGFuPlxuICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgIDxzcGFuIHYtaWY9XCJwcm9wcy50cmFja2VkUnVuLm1lc3NhZ2VzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgICB7e3Byb3BzLnRyYWNrZWRSdW4ubWVzc2FnZXMubGVuZ3RoIH19IHt7IHByb3BzLnRyYWNrZWRSdW4ubWVzc2FnZXMubGVuZ3RoID4gMSA/ICdtZXNzYWdlcycgOiAnbWVzc2FnZSd9fS5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3BhbiB2LWlmPVwicHJvcHMudHJhY2tlZFJ1bi5zaWduYWxzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgICB7e3Byb3BzLnRyYWNrZWRSdW4uc2lnbmFscy5sZW5ndGggfX0ge3sgcHJvcHMudHJhY2tlZFJ1bi5zaWduYWxzLmxlbmd0aCA+IDEgPyAnc2lnbmFscycgOiAnc2lnbmFsJ319LlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgPHEtaXRlbS1zZWN0aW9uIHRvcCBzaWRlPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtZ3JleS04IHEtZ3V0dGVyLXhzXCI+XG4gICAgICAgIDxxLWljb24gY2xhc3M9XCJndC14c1wiIHNpemU9XCIxMnB4XCIgaWNvbj1cImtleWJvYXJkX2Fycm93X3JpZ2h0XCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gIDwvcS1pdGVtPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7Y29tcHV0ZWQsIGRlZmluZVByb3BzfSBmcm9tICd2dWUnO1xuaW1wb3J0IHtKb2JSdW4sIFN0YXR1c30gZnJvbSAnc3JjL3R5cGVzL2FwaSc7XG5pbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5pbXBvcnQgcmVsYXRpdmVUaW1lIGZyb20gJ2RheWpzL3BsdWdpbi9yZWxhdGl2ZVRpbWUnO1xuXG5kYXlqcy5leHRlbmQocmVsYXRpdmVUaW1lKTtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wczx7XG4gIHRyYWNrZWRSdW46IEpvYlJ1blxufT4oKTtcblxuY29uc3QgdGltZUFnbyA9IGNvbXB1dGVkKCgpID0+IGRheWpzKCkudG8ocHJvcHMudHJhY2tlZFJ1bi5jcmVhdGVkX2F0KSlcblxuY29uc3QgdHJ5Q291bnQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGxldCB0cmllcyA9IDE7XG4gIGxldCBydW4gPSBwcm9wcy50cmFja2VkUnVuO1xuICB3aGlsZShydW4ucGFyZW50ICE9PSBudWxsKSB7XG4gICAgcnVuID0gcnVuLnBhcmVudFxuICAgIHRyaWVzKys7XG4gIH1cbiAgcmV0dXJuIHRyaWVzO1xufSlcblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktZXZlbmx5XCIgdi1pZj1cInJlc3VsdHMgIT09IG51bGxcIj5cbiAgICA8cS1saXN0IGJvcmRlcmVkIHNlcGFyYXRvcj5cbiAgICAgIDxxLWl0ZW0gY2xpY2thYmxlIHYtcmlwcGxlPjxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgPHEtaXRlbS1sYWJlbD57eyByZXN1bHRzLmFsaWFzIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5BbGlhczwvcS1pdGVtLWxhYmVsPlxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj48L3EtaXRlbT5cbiAgICAgIDxxLWl0ZW0gY2xpY2thYmxlIHYtcmlwcGxlPjxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgPHEtaXRlbS1sYWJlbD57eyByZXN1bHRzLmNsYXNzIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5DbGFzczwvcS1pdGVtLWxhYmVsPlxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj48L3EtaXRlbT5cbiAgICA8L3EtbGlzdD5cblxuICAgIDxxLWxpc3QgYm9yZGVyZWQgY2xhc3M9XCJyb3VuZGVkLWJvcmRlcnNcIiBzdHlsZT1cIm1pbi13aWR0aDogODUlXCIgPlxuICAgICAgPHEtaXRlbS1sYWJlbCBoZWFkZXI+UnVuczwvcS1pdGVtLWxhYmVsPlxuXG4gICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cbiAgICAgIDxkaXYgdi1mb3I9XCJydW4gaW4gcmVzdWx0cy5ydW5zXCIgOmtleT1cImdldEhhc2gocnVuKVwiPlxuICAgICAgICA8dHJhY2tlZC1ydW4tbGlzdC1pdGVtIDp0cmFja2VkLXJ1bj1cInJ1blwiPlxuICAgICAgICA8L3RyYWNrZWQtcnVuLWxpc3QtaXRlbT5cbiAgICAgICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtbGlzdD5cblxuICA8L3EtcGFnZT5cbiAgPHEtcGFnZSBjbGFzcz1cInJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1ldmVubHlcIiB2LWVsc2U+XG4gICAgTG9hZGluZ1xuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQge3JlZn0gZnJvbSAndnVlJztcbmltcG9ydCBhcGkgZnJvbSAnc3JjL3V0aWxzL2NsaWVudC9hcGknO1xuaW1wb3J0IHtKb2JSdW4sIFRyYWNrZWRKb2J9IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuaW1wb3J0IHt1c2VBcGl9IGZyb20gXCIuLi9jb21wb3N0YWJsZXMvdXNlQXBpXCI7XG5pbXBvcnQgVHJhY2tlZFJ1bkxpc3RJdGVtIGZyb20gXCJjb21wb25lbnRzL1RyYWNrZWRSdW5MaXN0SXRlbS52dWVcIjtcblxuY29uc3QgcmVzdWx0cyA9IHJlZjxUcmFja2VkSm9ifG51bGw+KG51bGwpO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzPHtcbiAgYWxpYXM6IHN0cmluZ1xufT4oKTtcblxudXNlQXBpKChhZnRlcikgPT4ge1xuICBhcGkuam9iU2hvdyhwcm9wcy5hbGlhcylcbiAgICAudGhlbigocmVzcG9uc2U6IFRyYWNrZWRKb2IpID0+IHJlc3VsdHMudmFsdWUgPSByZXNwb25zZSlcbiAgICAuZmluYWxseShhZnRlcik7XG59KVxuXG5mdW5jdGlvbiBnZXRIYXNoKGpvYlJ1bjogSm9iUnVuKTogc3RyaW5nIHtcbiAgcmV0dXJuIGpvYlJ1bi51dWlkO1xufVxuXG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6WyJ0aGlzIiwiciIsImUiLCJ0IiwibyIsIm4iLCJpIiwiZCIsImgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdPLE1BQU0seUJBQXlCO0FBQUEsRUFDcEMsR0FBRztBQUFBLEVBRUgsS0FBSztBQUFBLElBQ0gsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1Y7QUFBQSxFQUNELEtBQUs7QUFBQSxJQUNILE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxFQUNWO0FBQUEsRUFFRCxPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixZQUFZO0FBQUEsRUFFWixVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsRUFHVCxXQUFXO0FBQUEsSUFDVCxNQUFNO0FBQUEsSUFDTixTQUFTO0FBQUEsSUFDVCxXQUFXLE9BQUssS0FBSyxLQUFLLEtBQUs7QUFBQSxFQUNoQztBQUFBLEVBRUQsT0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1Y7QUFBQSxFQUVELFdBQVc7QUFBQSxFQUNYLFNBQVM7QUFBQSxFQUVULGlCQUFpQjtBQUNuQjtBQzdCQSxNQUNFLFNBQVMsSUFDVCxXQUFXLElBQUksUUFDZixnQkFBZ0IsV0FBVyxLQUFLLElBQ2hDLGtCQUFrQixLQUFLLE1BQU0sZ0JBQWdCLEdBQUksSUFBSTtBQUV2RCxJQUFBLG9CQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUVILE9BQU87QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxJQUNWO0FBQUEsSUFFRCxnQkFBZ0I7QUFBQSxNQUNkLE1BQU0sQ0FBRSxRQUFRLE1BQVE7QUFBQSxNQUN4QixTQUFTO0FBQUEsSUFDVjtBQUFBLElBRUQsZUFBZTtBQUFBLEVBQ2hCO0FBQUEsRUFFRCxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sRUFBRSxPQUFPLEVBQUUsR0FBSSxFQUFBLElBQUssbUJBQW9CO0FBQzlDLFVBQU0sWUFBWSxRQUFRLEtBQUs7QUFFL0IsVUFBTSxXQUFXLFNBQVMsTUFBTTtBQUM5QixZQUFNLFNBQVMsR0FBRyxLQUFLLFFBQVEsT0FBTyxLQUFLLEtBQUssTUFBTTtBQUV0RCxhQUFPO0FBQUEsUUFDTCxXQUFXLE1BQU0sYUFBYSxHQUFHLEtBQUssUUFBUSxRQUMxQyx1Q0FBd0MsTUFBTSxjQUM5QyxxQkFBc0IsUUFBUTtBQUFBLE1BQ25DO0FBQUEsSUFDUCxDQUFLO0FBRUQsVUFBTSxjQUFjLFNBQVMsTUFDM0IsTUFBTSxvQkFBb0IsUUFBUSxNQUFNLGtCQUFrQixPQUN0RCxFQUFFLFlBQVkscUJBQXNCLE1BQU0sb0NBQXNDLE1BQU0sd0JBQTBCLElBQ2hILEVBQ0w7QUFFRCxVQUFNLFVBQVUsU0FBUyxNQUFNLFlBQVksSUFBSSxNQUFNLFlBQVksRUFBRTtBQUVuRSxVQUFNLGNBQWM7QUFBQSxNQUFTLE1BQzNCLEdBQUksUUFBUSxRQUFRLEtBQU8sUUFBUSxRQUFRLEtBQU8sUUFBUSxTQUFXLFFBQVE7QUFBQSxJQUM5RTtBQUVELFVBQU0sYUFBYSxTQUFTLE1BQU0sUUFBUSxNQUFNLE9BQU8sTUFBTSxLQUFLLE1BQU0sR0FBRyxDQUFDO0FBRTVFLFVBQU0sbUJBQW1CLFNBQVMsTUFBTSxpQkFDdEMsS0FBSyxXQUFXLFFBQVEsTUFBTSxRQUFRLE1BQU0sTUFBTSxNQUFNLEtBQ3pEO0FBRUQsVUFBTSxjQUFjLFNBQVMsTUFBTSxNQUFNLFlBQVksSUFBSSxRQUFRLEtBQUs7QUFFdEUsYUFBUyxVQUFXLEVBQUUsV0FBVyxRQUFRLE9BQU8sS0FBSyxXQUFXO0FBQzlELGFBQU8sRUFBRSxVQUFVO0FBQUEsUUFDakIsT0FBTywwQkFBMEIsT0FBTyxVQUFVLFNBQVMsU0FBVSxVQUFXO0FBQUEsUUFDaEYsT0FBTyxZQUFZO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsZ0JBQWdCO0FBQUEsUUFDaEIsb0JBQW9CO0FBQUEsUUFDcEIscUJBQXFCO0FBQUEsUUFDckIsa0JBQWtCO0FBQUEsUUFDbEIsSUFBSSxRQUFRO0FBQUEsUUFDWixJQUFJLFFBQVE7QUFBQSxRQUNaLEdBQUc7QUFBQSxNQUNYLENBQU87QUFBQSxJQUNGO0FBRUQsV0FBTyxNQUFNO0FBQ1gsWUFBTSxXQUFXLENBQUU7QUFFbkIsWUFBTSxnQkFBZ0IsVUFBVSxNQUFNLGdCQUFnQixpQkFBaUIsU0FBUztBQUFBLFFBQzlFLEVBQUUsVUFBVTtBQUFBLFVBQ1YsT0FBTyxvQ0FBcUMsTUFBTTtBQUFBLFVBQ2xELE1BQU07QUFBQSxVQUNOLEdBQUcsU0FBUyxZQUFZLFFBQVE7QUFBQSxVQUNoQyxJQUFJLFFBQVE7QUFBQSxVQUNaLElBQUksUUFBUTtBQUFBLFFBQ3RCLENBQVM7QUFBQSxNQUNGO0FBRUQsWUFBTSxlQUFlLFVBQVUsTUFBTSxlQUFlLGlCQUFpQixTQUFTO0FBQUEsUUFDNUUsVUFBVTtBQUFBLFVBQ1IsS0FBSztBQUFBLFVBQ0wsV0FBVyxZQUFZO0FBQUEsVUFDdkIsUUFBUTtBQUFBLFVBQ1IsT0FBTyxNQUFNO0FBQUEsUUFDdkIsQ0FBUztBQUFBLE1BQ0Y7QUFFRCxlQUFTO0FBQUEsUUFDUCxVQUFVO0FBQUEsVUFDUixLQUFLO0FBQUEsVUFDTCxXQUFXLFlBQVk7QUFBQSxVQUN2QixRQUFRLGlCQUFpQjtBQUFBLFVBQ3pCLE9BQU8sTUFBTTtBQUFBLFVBQ2IsU0FBUyxNQUFNLFlBQVksT0FBTyxVQUFVO0FBQUEsUUFDdEQsQ0FBUztBQUFBLE1BQ0Y7QUFFRCxZQUFNLFFBQVE7QUFBQSxRQUNaLEVBQUUsT0FBTztBQUFBLFVBQ1AsT0FBTztBQUFBLFVBQ1AsT0FBTyxTQUFTO0FBQUEsVUFDaEIsU0FBUyxZQUFZO0FBQUEsVUFDckIsZUFBZTtBQUFBLFFBQ2hCLEdBQUUsUUFBUTtBQUFBLE1BQ1o7QUFFRCxZQUFNLGNBQWMsUUFBUSxNQUFNO0FBQUEsUUFDaEMsRUFBRSxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxPQUFPLEVBQUUsVUFBVSxNQUFNLFNBQVU7QUFBQSxRQUNwQyxHQUFFLE1BQU0sWUFBWSxTQUFTLE1BQU0sWUFBWSxDQUFFLEVBQUUsT0FBTyxXQUFXLEtBQUssQ0FBQyxDQUFFO0FBQUEsTUFDL0U7QUFFRCxhQUFPLEVBQUUsT0FBTztBQUFBLFFBQ2QsT0FBTyw0Q0FBNkMsTUFBTSxrQkFBa0IsT0FBTyxPQUFPO0FBQUEsUUFDMUYsT0FBTyxVQUFVO0FBQUEsUUFDakIsTUFBTTtBQUFBLFFBQ04saUJBQWlCLE1BQU07QUFBQSxRQUN2QixpQkFBaUIsTUFBTTtBQUFBLFFBQ3ZCLGlCQUFpQixNQUFNLGtCQUFrQixPQUFPLFNBQVMsV0FBVztBQUFBLE1BQ3JFLEdBQUUsaUJBQWlCLE1BQU0sVUFBVSxLQUFLLENBQUM7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFDSCxDQUFDOzs7QUM5SUQsR0FBQyxTQUFTLEdBQUUsR0FBRTtBQUFzRCxXQUFlLFVBQUEsRUFBQztBQUFBLEVBQXNJLEVBQUVBLGdCQUFNLFdBQVU7QUFBYyxXQUFPLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFFLEtBQUcsQ0FBQTtBQUFHLFVBQUksSUFBRSxFQUFFLFdBQVUsSUFBRSxFQUFDLFFBQU8sU0FBUSxNQUFLLFVBQVMsR0FBRSxpQkFBZ0IsR0FBRSxZQUFXLElBQUcsY0FBYSxHQUFFLFdBQVUsSUFBRyxZQUFXLEdBQUUsU0FBUSxJQUFHLFdBQVUsR0FBRSxXQUFVLElBQUcsYUFBWSxHQUFFLFVBQVMsSUFBRyxXQUFVO0FBQUUsZUFBUyxFQUFFQyxJQUFFQyxJQUFFQyxJQUFFQyxJQUFFO0FBQUMsZUFBTyxFQUFFLFdBQVdILElBQUVDLElBQUVDLElBQUVDLEVBQUM7QUFBQSxNQUFDO0FBQUMsUUFBRSxHQUFHLGVBQWEsR0FBRSxFQUFFLGFBQVcsU0FBU0YsSUFBRUcsSUFBRUMsSUFBRUMsSUFBRSxHQUFFO0FBQUMsaUJBQVEsR0FBRSxHQUFFLEdBQUUsSUFBRUQsR0FBRSxRQUFTLEVBQUMsZ0JBQWMsR0FBRUUsS0FBRSxFQUFFLGNBQVksQ0FBQyxFQUFDLEdBQUUsS0FBSSxHQUFFLElBQUcsR0FBRSxTQUFRLEdBQUUsRUFBQyxHQUFFLEtBQUksR0FBRSxHQUFFLEdBQUUsRUFBQyxHQUFFLE1BQUssR0FBRSxJQUFHLEdBQUUsU0FBUSxHQUFFLEVBQUMsR0FBRSxLQUFJLEdBQUUsR0FBRSxHQUFFLEVBQUMsR0FBRSxNQUFLLEdBQUUsSUFBRyxHQUFFLE9BQU0sR0FBRSxFQUFDLEdBQUUsS0FBSSxHQUFFLEdBQUUsR0FBRSxFQUFDLEdBQUUsTUFBSyxHQUFFLElBQUcsR0FBRSxNQUFLLEdBQUUsRUFBQyxHQUFFLEtBQUksR0FBRSxHQUFFLEdBQUUsRUFBQyxHQUFFLE1BQUssR0FBRSxJQUFHLEdBQUUsUUFBTyxHQUFFLEVBQUMsR0FBRSxLQUFJLEdBQUUsR0FBRSxHQUFFLEVBQUMsR0FBRSxNQUFLLEdBQUUsT0FBTSxDQUFDLEdBQUUsSUFBRUEsR0FBRSxRQUFPLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBRyxHQUFFO0FBQUMsY0FBSSxJQUFFQSxHQUFFO0FBQUcsWUFBRSxNQUFJLElBQUVELEtBQUUsRUFBRUwsRUFBQyxFQUFFLEtBQUtJLElBQUUsRUFBRSxHQUFFLElBQUUsSUFBRUEsR0FBRSxLQUFLSixJQUFFLEVBQUUsR0FBRSxJQUFFO0FBQUcsY0FBSSxLQUFHLEVBQUUsWUFBVSxLQUFLLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQztBQUFFLGNBQUcsSUFBRSxJQUFFLEdBQUUsS0FBRyxFQUFFLEtBQUcsQ0FBQyxFQUFFLEdBQUU7QUFBQyxpQkFBRyxLQUFHLElBQUUsTUFBSSxJQUFFTSxHQUFFLElBQUU7QUFBSSxnQkFBSSxJQUFFLEVBQUUsRUFBRTtBQUFHLGtCQUFJLElBQUUsRUFBRSxLQUFHLENBQUMsSUFBRyxJQUFFLFlBQVUsT0FBTyxJQUFFLEVBQUUsUUFBUSxNQUFLLENBQUMsSUFBRSxFQUFFLEdBQUVILElBQUUsRUFBRSxHQUFFLENBQUM7QUFBRTtBQUFBLFVBQUs7QUFBQSxRQUFDO0FBQUMsWUFBR0E7QUFBRSxpQkFBTztBQUFFLFlBQUksSUFBRSxJQUFFLEVBQUUsU0FBTyxFQUFFO0FBQUssZUFBTSxjQUFZLE9BQU8sSUFBRSxFQUFFLENBQUMsSUFBRSxFQUFFLFFBQVEsTUFBSyxDQUFDO0FBQUEsTUFBQyxHQUFFLEVBQUUsS0FBRyxTQUFTSixJQUFFQyxJQUFFO0FBQUMsZUFBTyxFQUFFRCxJQUFFQyxJQUFFLE1BQUssSUFBRTtBQUFBLE1BQUMsR0FBRSxFQUFFLE9BQUssU0FBU0QsSUFBRUMsSUFBRTtBQUFDLGVBQU8sRUFBRUQsSUFBRUMsSUFBRSxJQUFJO0FBQUEsTUFBQztBQUFFLFVBQUksSUFBRSxTQUFTRCxJQUFFO0FBQUMsZUFBT0EsR0FBRSxLQUFHLEVBQUUsSUFBRyxJQUFHLEVBQUM7QUFBQSxNQUFFO0FBQUUsUUFBRSxRQUFNLFNBQVNBLElBQUU7QUFBQyxlQUFPLEtBQUssR0FBRyxFQUFFLElBQUksR0FBRUEsRUFBQztBQUFBLE1BQUMsR0FBRSxFQUFFLFVBQVEsU0FBU0EsSUFBRTtBQUFDLGVBQU8sS0FBSyxLQUFLLEVBQUUsSUFBSSxHQUFFQSxFQUFDO0FBQUEsTUFBQztBQUFBLElBQUM7QUFBQSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNrRDE0QyxVQUFNLE9BQU8sWUFBWTtBQU1uQixVQUFBLFVBQVUsU0FBUyxNQUFNLFFBQVEsR0FBRyxNQUFNLFdBQVcsVUFBVSxDQUFDO0FBRWhFLFVBQUEsV0FBVyxTQUFTLE1BQU07QUFDOUIsVUFBSSxRQUFRO0FBQ1osVUFBSSxNQUFNLE1BQU07QUFDVixhQUFBLElBQUksV0FBVyxNQUFNO0FBQ3pCLGNBQU0sSUFBSTtBQUNWO0FBQUEsTUFDRjtBQUNPLGFBQUE7QUFBQSxJQUFBLENBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCSyxVQUFBLFVBQVUsSUFBcUIsSUFBSTtBQU16QyxXQUFPLENBQUMsVUFBVTtBQUNoQixVQUFJLFFBQVEsTUFBTSxLQUFLLEVBQ3BCLEtBQUssQ0FBQyxhQUF5QixRQUFRLFFBQVEsUUFBUSxFQUN2RCxRQUFRLEtBQUs7QUFBQSxJQUFBLENBQ2pCO0FBRUQsYUFBUyxRQUFRLFFBQXdCO0FBQ3ZDLGFBQU8sT0FBTztBQUFBLElBQ2hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
