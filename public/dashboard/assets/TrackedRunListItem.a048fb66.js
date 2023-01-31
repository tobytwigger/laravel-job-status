import { Q as QIcon } from "./use-router-link.b59d0f2d.js";
import { Q as QCircularProgress } from "./QCircularProgress.0f46e564.js";
import { Q as QItemSection, b as QItemLabel, c as QItem } from "./QItem.d2559d90.js";
import { Q as QChip } from "./QChip.c15cdb8a.js";
import { S as Status } from "./api.9a3f3035.js";
import { d as dayjs } from "./dayjs.min.54da9cde.js";
import { r as relativeTime } from "./relativeTime.a9f93413.js";
import { _ as _export_sfc, K as defineComponent, c as computed, L as openBlock, M as createBlock, N as withCtx, d as createVNode, a0 as unref, O as createCommentVNode, P as createTextVNode, Q as toDisplayString, R as createBaseVNode } from "./index.24d2f870.js";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhY2tlZFJ1bkxpc3RJdGVtLmEwNDhmYjY2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvc3JjL2NvbXBvbmVudHMvVHJhY2tlZFJ1bkxpc3RJdGVtLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJcbjx0ZW1wbGF0ZT5cbiAgPHEtaXRlbSBjbGlja2FibGUgOnRvPVwie3BhdGg6ICcvcnVuLycgKyBwcm9wcy50cmFja2VkUnVuLmlkfVwiPlxuICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXIgdG9wPlxuICAgICAgPHEtaWNvbiBuYW1lPVwiaG91cmdsYXNzX3RvcFwiIGNvbG9yPVwiYmxhY2tcIiBzaXplPVwiMzRweFwiIHYtaWY9XCJwcm9wcy50cmFja2VkUnVuLnN0YXR1cyA9PT0gU3RhdHVzLlF1ZXVlZFwiIC8+XG4gICAgICA8cS1jaXJjdWxhci1wcm9ncmVzc1xuICAgICAgICBzaG93LXZhbHVlXG4gICAgICAgIDp2YWx1ZT1cInByb3BzLnRyYWNrZWRSdW4ucGVyY2VudGFnZVwiXG4gICAgICAgIHJvdW5kZWRcbiAgICAgICAgdi1lbHNlLWlmPVwicHJvcHMudHJhY2tlZFJ1bi5zdGF0dXMgPT09IFN0YXR1cy5TdGFydGVkXCJcbiAgICAgICAgc2l6ZT1cIjM0cHhcIlxuICAgICAgICBjbGFzcz1cInEtbWEtbWRcIlxuICAgICAgLz5cbiAgICAgIDxxLWljb24gbmFtZT1cImRvbmVcIiBjb2xvcj1cImJsYWNrXCIgc2l6ZT1cIjM0cHhcIiB2LWVsc2UtaWY9XCJwcm9wcy50cmFja2VkUnVuLnN0YXR1cyA9PT0gU3RhdHVzLlN1Y2NlZWRlZFwiIC8+XG4gICAgICA8cS1pY29uIG5hbWU9XCJjbG9zZVwiIGNvbG9yPVwiYmxhY2tcIiBzaXplPVwiMzRweFwiIHYtZWxzZS1pZj1cInByb3BzLnRyYWNrZWRSdW4uc3RhdHVzID09PSBTdGF0dXMuRmFpbGVkXCIgLz5cbiAgICAgIDxxLWljb24gbmFtZT1cIm5vdF9pbnRlcmVzdGVkXCIgY29sb3I9XCJibGFja1wiIHNpemU9XCIzNHB4XCIgdi1lbHNlLWlmPVwicHJvcHMudHJhY2tlZFJ1bi5zdGF0dXMgPT09IFN0YXR1cy5DYW5jZWxsZWRcIiAvPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICA8cS1pdGVtLXNlY3Rpb24gdG9wIGNsYXNzPVwiY29sLTIgZ3Qtc21cIj5cbiAgICAgIDxxLWl0ZW0tbGFiZWwgY2xhc3M9XCJxLW10LXNtXCI+e3sgdGltZUFnbyB9fTwvcS1pdGVtLWxhYmVsPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICA8cS1pdGVtLXNlY3Rpb24gdG9wPlxuICAgICAgPHEtaXRlbS1sYWJlbCBsaW5lcz1cIjFcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXdlaWdodC1tZWRpdW1cIj57e3Byb3BzLnRyYWNrZWRSdW4uc3RhdHVzfX08L3NwYW4+XG48IS0tICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZ3JleS04XCIgdi1pZj1cIlN0YXR1cy5GYWlsZWQgJiYgdHJ5Q291bnQgPiAwXCI+IC0ge3t0cnlDb3VudH19IHt7dHJ5Q291bnQgPiAxID8gJ2F0dGVtcHRzJyA6ICdhdHRlbXB0J319PC9zcGFuPi0tPlxuICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIDxxLWNoaXAgdi1pZj1cInByb3BzLnRyYWNrZWRSdW4ubWVzc2FnZXMubGVuZ3RoID09PSAwXCIgZGVuc2UgaWNvbj1cImNoYXRcIj5NZXNzYWdlczoge3twcm9wcy50cmFja2VkUnVuLm1lc3NhZ2VzLmxlbmd0aH19PC9xLWNoaXA+XG4gICAgICAgICAgPHEtY2hpcCB2LWVsc2UgZGVuc2UgY29sb3I9XCJibHVlXCIgdGV4dC1jb2xvcj1cIndoaXRlXCIgaWNvbj1cImNoYXRcIj5cbiAgICAgICAgICAgIE1lc3NhZ2VzOiB7e3Byb3BzLnRyYWNrZWRSdW4ubWVzc2FnZXMubGVuZ3RofX1cbiAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICA8cS1jaGlwIHYtaWY9XCJwcm9wcy50cmFja2VkUnVuLnNpZ25hbHMubGVuZ3RoID09PSAwXCIgZGVuc2UgaWNvbj1cInNlbnNvcnNcIj5TaWduYWxzOiB7e3Byb3BzLnRyYWNrZWRSdW4uc2lnbmFscy5sZW5ndGh9fTwvcS1jaGlwPlxuICAgICAgICAgIDxxLWNoaXAgdi1lbHNlIGRlbnNlIGNvbG9yPVwicmVkXCIgdGV4dC1jb2xvcj1cIndoaXRlXCIgaWNvbj1cInNlbnNvcnNcIj5cbiAgICAgICAgICAgIFNpZ25hbHM6IHt7cHJvcHMudHJhY2tlZFJ1bi5zaWduYWxzLmxlbmd0aH19XG4gICAgICAgICAgPC9xLWNoaXA+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgPHEtY2hpcCB2LWlmPVwidHJ5Q291bnQgPT09IDFcIiBkZW5zZSBpY29uPVwicmVwbGF5XCI+UmV0cmllczoge3t0cnlDb3VudCAtIDF9fTwvcS1jaGlwPlxuICAgICAgICAgIDxxLWNoaXAgdi1lbHNlIGRlbnNlIGNvbG9yPVwib3JhbmdlXCIgdGV4dC1jb2xvcj1cIndoaXRlXCIgaWNvbj1cInJlcGxheVwiPlxuICAgICAgICAgICAgUmV0cmllczoge3t0cnlDb3VudCAtIDF9fVxuICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgPHEtaXRlbS1zZWN0aW9uIHRvcCBzaWRlPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtZ3JleS04IHEtZ3V0dGVyLXhzXCI+XG4gICAgICAgIDxxLWljb24gY2xhc3M9XCJndC14c1wiIHNpemU9XCIxMnB4XCIgaWNvbj1cImtleWJvYXJkX2Fycm93X3JpZ2h0XCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gIDwvcS1pdGVtPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7Y29tcHV0ZWQsIGRlZmluZVByb3BzfSBmcm9tICd2dWUnO1xuaW1wb3J0IHtKb2JSdW4sIFN0YXR1c30gZnJvbSAnc3JjL3R5cGVzL2FwaSc7XG5pbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5pbXBvcnQgcmVsYXRpdmVUaW1lIGZyb20gJ2RheWpzL3BsdWdpbi9yZWxhdGl2ZVRpbWUnO1xuXG5kYXlqcy5leHRlbmQocmVsYXRpdmVUaW1lKTtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wczx7XG4gIHRyYWNrZWRSdW46IEpvYlJ1blxufT4oKTtcblxuY29uc3QgdGltZUFnbyA9IGNvbXB1dGVkKCgpID0+IGRheWpzKCkudG8ocHJvcHMudHJhY2tlZFJ1bi5jcmVhdGVkX2F0KSlcblxuY29uc3QgdHJ5Q291bnQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGxldCB0cmllcyA9IDE7XG4gIGxldCBydW4gPSBwcm9wcy50cmFja2VkUnVuO1xuICB3aGlsZShydW4ucGFyZW50ICE9PSBudWxsKSB7XG4gICAgcnVuID0gcnVuLnBhcmVudFxuICAgIHRyaWVzKys7XG4gIH1cbiAgcmV0dXJuIHRyaWVzO1xufSlcblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErREEsVUFBTSxPQUFPLFlBQVk7QUFNbkIsVUFBQSxVQUFVLFNBQVMsTUFBTSxRQUFRLEdBQUcsTUFBTSxXQUFXLFVBQVUsQ0FBQztBQUVoRSxVQUFBLFdBQVcsU0FBUyxNQUFNO0FBQzlCLFVBQUksUUFBUTtBQUNaLFVBQUksTUFBTSxNQUFNO0FBQ1YsYUFBQSxJQUFJLFdBQVcsTUFBTTtBQUN6QixjQUFNLElBQUk7QUFDVjtBQUFBLE1BQ0Y7QUFDTyxhQUFBO0FBQUEsSUFBQSxDQUNSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
