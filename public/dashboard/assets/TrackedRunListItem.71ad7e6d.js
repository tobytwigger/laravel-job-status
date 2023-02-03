import { Q as QIcon } from "./use-router-link.d3b03863.js";
import { Q as QCircularProgress } from "./QCircularProgress.3a081134.js";
import { Q as QItemSection, b as QItemLabel, c as QItem } from "./QItem.efe8ccb9.js";
import { Q as QChip } from "./QChip.4fb07891.js";
import { S as Status } from "./api.9a3f3035.js";
import { d as dayjs } from "./dayjs.min.54da9cde.js";
import { r as relativeTime } from "./relativeTime.a9f93413.js";
import { _ as _export_sfc, K as defineComponent, c as computed, L as openBlock, M as createBlock, N as withCtx, d as createVNode, a0 as unref, O as createCommentVNode, P as createTextVNode, Q as toDisplayString, R as createBaseVNode } from "./index.2ce80662.js";
const _hoisted_1 = { class: "text-weight-medium" };
const _hoisted_2 = { class: "text-grey-8 q-gutter-xs" };
const _sfc_main = /* @__PURE__ */ defineComponent({
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
        to: { path: "/run/" + props.trackedRun.id }
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
                  createBaseVNode("span", _hoisted_1, toDisplayString(props.trackedRun.status), 1)
                ]),
                _: 1
              }),
              createVNode(QItemLabel, { caption: "" }, {
                default: withCtx(() => [
                  createBaseVNode("span", null, [
                    props.trackedRun.messages.length === 0 ? (openBlock(), createBlock(QChip, {
                      key: 0,
                      dense: "",
                      icon: "chat"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Messages: " + toDisplayString(props.trackedRun.messages.length), 1)
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(QChip, {
                      key: 1,
                      dense: "",
                      color: "blue",
                      "text-color": "white",
                      icon: "chat"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Messages: " + toDisplayString(props.trackedRun.messages.length), 1)
                      ]),
                      _: 1
                    }))
                  ]),
                  createBaseVNode("span", null, [
                    props.trackedRun.signals.length === 0 ? (openBlock(), createBlock(QChip, {
                      key: 0,
                      dense: "",
                      icon: "sensors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Signals: " + toDisplayString(props.trackedRun.signals.length), 1)
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(QChip, {
                      key: 1,
                      dense: "",
                      color: "red",
                      "text-color": "white",
                      icon: "sensors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Signals: " + toDisplayString(props.trackedRun.signals.length), 1)
                      ]),
                      _: 1
                    }))
                  ]),
                  createBaseVNode("span", null, [
                    unref(tryCount) === 1 ? (openBlock(), createBlock(QChip, {
                      key: 0,
                      dense: "",
                      icon: "replay"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Retries: " + toDisplayString(unref(tryCount) - 1), 1)
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(QChip, {
                      key: 1,
                      dense: "",
                      color: "orange",
                      "text-color": "white",
                      icon: "replay"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Retries: " + toDisplayString(unref(tryCount) - 1), 1)
                      ]),
                      _: 1
                    }))
                  ])
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
              createBaseVNode("div", _hoisted_2, [
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
var TrackedRunListItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "TrackedRunListItem.vue"]]);
export { TrackedRunListItem as T };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhY2tlZFJ1bkxpc3RJdGVtLjcxYWQ3ZTZkLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvc3JjL2NvbXBvbmVudHMvVHJhY2tlZFJ1bkxpc3RJdGVtLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWl0ZW0gY2xpY2thYmxlIDp0bz1cInsgcGF0aDogJy9ydW4vJyArIHByb3BzLnRyYWNrZWRSdW4uaWQgfVwiPlxuICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXIgdG9wPlxuICAgICAgPHEtaWNvblxuICAgICAgICBuYW1lPVwiaG91cmdsYXNzX3RvcFwiXG4gICAgICAgIGNvbG9yPVwiYmxhY2tcIlxuICAgICAgICBzaXplPVwiMzRweFwiXG4gICAgICAgIHYtaWY9XCJwcm9wcy50cmFja2VkUnVuLnN0YXR1cyA9PT0gU3RhdHVzLlF1ZXVlZFwiXG4gICAgICAvPlxuICAgICAgPHEtY2lyY3VsYXItcHJvZ3Jlc3NcbiAgICAgICAgc2hvdy12YWx1ZVxuICAgICAgICA6dmFsdWU9XCJwcm9wcy50cmFja2VkUnVuLnBlcmNlbnRhZ2VcIlxuICAgICAgICByb3VuZGVkXG4gICAgICAgIHYtZWxzZS1pZj1cInByb3BzLnRyYWNrZWRSdW4uc3RhdHVzID09PSBTdGF0dXMuU3RhcnRlZFwiXG4gICAgICAgIHNpemU9XCIzNHB4XCJcbiAgICAgICAgY2xhc3M9XCJxLW1hLW1kXCJcbiAgICAgIC8+XG4gICAgICA8cS1pY29uXG4gICAgICAgIG5hbWU9XCJkb25lXCJcbiAgICAgICAgY29sb3I9XCJibGFja1wiXG4gICAgICAgIHNpemU9XCIzNHB4XCJcbiAgICAgICAgdi1lbHNlLWlmPVwicHJvcHMudHJhY2tlZFJ1bi5zdGF0dXMgPT09IFN0YXR1cy5TdWNjZWVkZWRcIlxuICAgICAgLz5cbiAgICAgIDxxLWljb25cbiAgICAgICAgbmFtZT1cImNsb3NlXCJcbiAgICAgICAgY29sb3I9XCJibGFja1wiXG4gICAgICAgIHNpemU9XCIzNHB4XCJcbiAgICAgICAgdi1lbHNlLWlmPVwicHJvcHMudHJhY2tlZFJ1bi5zdGF0dXMgPT09IFN0YXR1cy5GYWlsZWRcIlxuICAgICAgLz5cbiAgICAgIDxxLWljb25cbiAgICAgICAgbmFtZT1cIm5vdF9pbnRlcmVzdGVkXCJcbiAgICAgICAgY29sb3I9XCJibGFja1wiXG4gICAgICAgIHNpemU9XCIzNHB4XCJcbiAgICAgICAgdi1lbHNlLWlmPVwicHJvcHMudHJhY2tlZFJ1bi5zdGF0dXMgPT09IFN0YXR1cy5DYW5jZWxsZWRcIlxuICAgICAgLz5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgPHEtaXRlbS1zZWN0aW9uIHRvcCBjbGFzcz1cImNvbC0yIGd0LXNtXCI+XG4gICAgICA8cS1pdGVtLWxhYmVsIGNsYXNzPVwicS1tdC1zbVwiPnt7IHRpbWVBZ28gfX08L3EtaXRlbS1sYWJlbD5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgPHEtaXRlbS1zZWN0aW9uIHRvcD5cbiAgICAgIDxxLWl0ZW0tbGFiZWwgbGluZXM9XCIxXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC13ZWlnaHQtbWVkaXVtXCI+e3sgcHJvcHMudHJhY2tlZFJ1bi5zdGF0dXMgfX08L3NwYW4+XG4gICAgICAgIDwhLS0gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1ncmV5LThcIiB2LWlmPVwiU3RhdHVzLkZhaWxlZCAmJiB0cnlDb3VudCA+IDBcIj4gLSB7e3RyeUNvdW50fX0ge3t0cnlDb3VudCA+IDEgPyAnYXR0ZW1wdHMnIDogJ2F0dGVtcHQnfX08L3NwYW4+LS0+XG4gICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgPHEtY2hpcFxuICAgICAgICAgICAgdi1pZj1cInByb3BzLnRyYWNrZWRSdW4ubWVzc2FnZXMubGVuZ3RoID09PSAwXCJcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBpY29uPVwiY2hhdFwiXG4gICAgICAgICAgICA+TWVzc2FnZXM6IHt7IHByb3BzLnRyYWNrZWRSdW4ubWVzc2FnZXMubGVuZ3RoIH19PC9xLWNoaXBcbiAgICAgICAgICA+XG4gICAgICAgICAgPHEtY2hpcCB2LWVsc2UgZGVuc2UgY29sb3I9XCJibHVlXCIgdGV4dC1jb2xvcj1cIndoaXRlXCIgaWNvbj1cImNoYXRcIj5cbiAgICAgICAgICAgIE1lc3NhZ2VzOiB7eyBwcm9wcy50cmFja2VkUnVuLm1lc3NhZ2VzLmxlbmd0aCB9fVxuICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIDxxLWNoaXBcbiAgICAgICAgICAgIHYtaWY9XCJwcm9wcy50cmFja2VkUnVuLnNpZ25hbHMubGVuZ3RoID09PSAwXCJcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICBpY29uPVwic2Vuc29yc1wiXG4gICAgICAgICAgICA+U2lnbmFsczoge3sgcHJvcHMudHJhY2tlZFJ1bi5zaWduYWxzLmxlbmd0aCB9fTwvcS1jaGlwXG4gICAgICAgICAgPlxuICAgICAgICAgIDxxLWNoaXAgdi1lbHNlIGRlbnNlIGNvbG9yPVwicmVkXCIgdGV4dC1jb2xvcj1cIndoaXRlXCIgaWNvbj1cInNlbnNvcnNcIj5cbiAgICAgICAgICAgIFNpZ25hbHM6IHt7IHByb3BzLnRyYWNrZWRSdW4uc2lnbmFscy5sZW5ndGggfX1cbiAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICA8cS1jaGlwIHYtaWY9XCJ0cnlDb3VudCA9PT0gMVwiIGRlbnNlIGljb249XCJyZXBsYXlcIlxuICAgICAgICAgICAgPlJldHJpZXM6IHt7IHRyeUNvdW50IC0gMSB9fTwvcS1jaGlwXG4gICAgICAgICAgPlxuICAgICAgICAgIDxxLWNoaXAgdi1lbHNlIGRlbnNlIGNvbG9yPVwib3JhbmdlXCIgdGV4dC1jb2xvcj1cIndoaXRlXCIgaWNvbj1cInJlcGxheVwiPlxuICAgICAgICAgICAgUmV0cmllczoge3sgdHJ5Q291bnQgLSAxIH19XG4gICAgICAgICAgPC9xLWNoaXA+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICA8cS1pdGVtLXNlY3Rpb24gdG9wIHNpZGU+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ncmV5LTggcS1ndXR0ZXIteHNcIj5cbiAgICAgICAgPHEtaWNvbiBjbGFzcz1cImd0LXhzXCIgc2l6ZT1cIjEycHhcIiBpY29uPVwia2V5Ym9hcmRfYXJyb3dfcmlnaHRcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgPC9xLWl0ZW0+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgY29tcHV0ZWQsIGRlZmluZVByb3BzIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IEpvYlJ1biwgU3RhdHVzIH0gZnJvbSAnc3JjL3R5cGVzL2FwaSc7XG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnO1xuaW1wb3J0IHJlbGF0aXZlVGltZSBmcm9tICdkYXlqcy9wbHVnaW4vcmVsYXRpdmVUaW1lJztcblxuZGF5anMuZXh0ZW5kKHJlbGF0aXZlVGltZSk7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8e1xuICB0cmFja2VkUnVuOiBKb2JSdW47XG59PigpO1xuXG5jb25zdCB0aW1lQWdvID0gY29tcHV0ZWQoKCkgPT4gZGF5anMoKS50byhwcm9wcy50cmFja2VkUnVuLmNyZWF0ZWRfYXQpKTtcblxuY29uc3QgdHJ5Q291bnQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGxldCB0cmllcyA9IDE7XG4gIGxldCBydW4gPSBwcm9wcy50cmFja2VkUnVuO1xuICB3aGlsZSAocnVuLnBhcmVudCAhPT0gbnVsbCkge1xuICAgIHJ1biA9IHJ1bi5wYXJlbnQ7XG4gICAgdHJpZXMrKztcbiAgfVxuICByZXR1cm4gdHJpZXM7XG59KTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPjwvc3R5bGU+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4RkEsVUFBTSxPQUFPLFlBQVk7QUFNbkIsVUFBQSxVQUFVLFNBQVMsTUFBTSxRQUFRLEdBQUcsTUFBTSxXQUFXLFVBQVUsQ0FBQztBQUVoRSxVQUFBLFdBQVcsU0FBUyxNQUFNO0FBQzlCLFVBQUksUUFBUTtBQUNaLFVBQUksTUFBTSxNQUFNO0FBQ1QsYUFBQSxJQUFJLFdBQVcsTUFBTTtBQUMxQixjQUFNLElBQUk7QUFDVjtBQUFBLE1BQ0Y7QUFDTyxhQUFBO0FBQUEsSUFBQSxDQUNSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
