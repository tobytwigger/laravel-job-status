import { u as useApi, Q as QBreadcrumbsEl, a as QBreadcrumbs, b as QSeparator } from "./useApi.498595ef.js";
import { Q as QItemSection, b as QItemLabel, c as QItem, d as QList } from "./QItem.efe8ccb9.js";
import { Q as QPage, a as api } from "./api.616de3f3.js";
import { Q as QIcon } from "./use-router-link.d3b03863.js";
import { Q as QCircularProgress } from "./QCircularProgress.3a081134.js";
import { Q as QChip } from "./QChip.4fb07891.js";
import { S as Status } from "./api.9a3f3035.js";
import { d as dayjs } from "./dayjs.min.54da9cde.js";
import { r as relativeTime } from "./relativeTime.a9f93413.js";
import { _ as _export_sfc, K as defineComponent, c as computed, L as openBlock, M as createBlock, N as withCtx, d as createVNode, a0 as unref, O as createCommentVNode, P as createTextVNode, Q as toDisplayString, R as createBaseVNode, r as ref, S as createElementBlock, U as renderList, F as Fragment } from "./index.2ce80662.js";
import "./render.03bb8eb9.js";
import "./index.aa7156d4.js";
import "./config.83e19d5f.js";
import "./format.801e7424.js";
const _hoisted_1$1 = { class: "text-weight-medium" };
const _hoisted_2$1 = { class: "text-grey-8" };
const _hoisted_3 = { class: "text-grey-8 q-gutter-xs" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NoContextTrackedRunListItem",
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
                  createBaseVNode("span", _hoisted_1$1, toDisplayString(props.trackedRun.alias), 1),
                  createBaseVNode("span", _hoisted_2$1, " - " + toDisplayString(props.trackedRun.status), 1)
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
              createBaseVNode("div", _hoisted_3, [
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
var NoContextTrackedRunListItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "NoContextTrackedRunListItem.vue"]]);
const _hoisted_1 = { class: "row" };
const _hoisted_2 = { class: "col-12" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HistoryPage",
  setup(__props) {
    const results = ref(null);
    useApi((after) => {
      api.history().then((response) => results.value = response).finally(after);
    });
    return (_ctx, _cache) => {
      return results.value !== null ? (openBlock(), createBlock(QPage, {
        key: 0,
        class: "justify-evenly",
        padding: ""
      }, {
        default: withCtx(() => [
          createVNode(QBreadcrumbs, null, {
            default: withCtx(() => [
              createVNode(QBreadcrumbsEl, {
                icon: "manage_search",
                to: "/history",
                label: "History"
              })
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
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
                  (openBlock(true), createElementBlock(Fragment, null, renderList(results.value, (run) => {
                    return openBlock(), createElementBlock("div", {
                      key: run.id
                    }, [
                      createVNode(NoContextTrackedRunListItem, { "tracked-run": run }, null, 8, ["tracked-run"]),
                      createVNode(QSeparator)
                    ]);
                  }), 128))
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      })) : (openBlock(), createBlock(QPage, {
        key: 1,
        class: "items-center justify-evenly"
      }, {
        default: withCtx(() => [
          createTextVNode(" Loading ")
        ]),
        _: 1
      }));
    };
  }
});
var HistoryPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "HistoryPage.vue"]]);
export { HistoryPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGlzdG9yeVBhZ2UuOWY0NGM1NWIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rhc2hib2FyZC9zcmMvY29tcG9uZW50cy9Ob0NvbnRleHRUcmFja2VkUnVuTGlzdEl0ZW0udnVlIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9IaXN0b3J5UGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1pdGVtIGNsaWNrYWJsZSA6dG89XCJ7IHBhdGg6ICcvcnVuLycgKyBwcm9wcy50cmFja2VkUnVuLmlkIH1cIj5cbiAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyIHRvcD5cbiAgICAgIDxxLWljb25cbiAgICAgICAgbmFtZT1cImhvdXJnbGFzc190b3BcIlxuICAgICAgICBjb2xvcj1cImJsYWNrXCJcbiAgICAgICAgc2l6ZT1cIjM0cHhcIlxuICAgICAgICB2LWlmPVwicHJvcHMudHJhY2tlZFJ1bi5zdGF0dXMgPT09IFN0YXR1cy5RdWV1ZWRcIlxuICAgICAgLz5cbiAgICAgIDxxLWNpcmN1bGFyLXByb2dyZXNzXG4gICAgICAgIHNob3ctdmFsdWVcbiAgICAgICAgOnZhbHVlPVwicHJvcHMudHJhY2tlZFJ1bi5wZXJjZW50YWdlXCJcbiAgICAgICAgcm91bmRlZFxuICAgICAgICB2LWVsc2UtaWY9XCJwcm9wcy50cmFja2VkUnVuLnN0YXR1cyA9PT0gU3RhdHVzLlN0YXJ0ZWRcIlxuICAgICAgICBzaXplPVwiMzRweFwiXG4gICAgICAgIGNsYXNzPVwicS1tYS1tZFwiXG4gICAgICAvPlxuICAgICAgPHEtaWNvblxuICAgICAgICBuYW1lPVwiZG9uZVwiXG4gICAgICAgIGNvbG9yPVwiYmxhY2tcIlxuICAgICAgICBzaXplPVwiMzRweFwiXG4gICAgICAgIHYtZWxzZS1pZj1cInByb3BzLnRyYWNrZWRSdW4uc3RhdHVzID09PSBTdGF0dXMuU3VjY2VlZGVkXCJcbiAgICAgIC8+XG4gICAgICA8cS1pY29uXG4gICAgICAgIG5hbWU9XCJjbG9zZVwiXG4gICAgICAgIGNvbG9yPVwiYmxhY2tcIlxuICAgICAgICBzaXplPVwiMzRweFwiXG4gICAgICAgIHYtZWxzZS1pZj1cInByb3BzLnRyYWNrZWRSdW4uc3RhdHVzID09PSBTdGF0dXMuRmFpbGVkXCJcbiAgICAgIC8+XG4gICAgICA8cS1pY29uXG4gICAgICAgIG5hbWU9XCJub3RfaW50ZXJlc3RlZFwiXG4gICAgICAgIGNvbG9yPVwiYmxhY2tcIlxuICAgICAgICBzaXplPVwiMzRweFwiXG4gICAgICAgIHYtZWxzZS1pZj1cInByb3BzLnRyYWNrZWRSdW4uc3RhdHVzID09PSBTdGF0dXMuQ2FuY2VsbGVkXCJcbiAgICAgIC8+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB0b3AgY2xhc3M9XCJjb2wtMiBndC1zbVwiPlxuICAgICAgPHEtaXRlbS1sYWJlbCBjbGFzcz1cInEtbXQtc21cIj57eyB0aW1lQWdvIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB0b3A+XG4gICAgICA8cS1pdGVtLWxhYmVsIGxpbmVzPVwiMVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtd2VpZ2h0LW1lZGl1bVwiPnt7IHByb3BzLnRyYWNrZWRSdW4uYWxpYXMgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1ncmV5LThcIj4gLSB7eyBwcm9wcy50cmFja2VkUnVuLnN0YXR1cyB9fTwvc3Bhbj5cbiAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICA8cS1jaGlwXG4gICAgICAgICAgICB2LWlmPVwicHJvcHMudHJhY2tlZFJ1bi5tZXNzYWdlcy5sZW5ndGggPT09IDBcIlxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGljb249XCJjaGF0XCJcbiAgICAgICAgICAgID5NZXNzYWdlczoge3sgcHJvcHMudHJhY2tlZFJ1bi5tZXNzYWdlcy5sZW5ndGggfX08L3EtY2hpcFxuICAgICAgICAgID5cbiAgICAgICAgICA8cS1jaGlwIHYtZWxzZSBkZW5zZSBjb2xvcj1cImJsdWVcIiB0ZXh0LWNvbG9yPVwid2hpdGVcIiBpY29uPVwiY2hhdFwiPlxuICAgICAgICAgICAgTWVzc2FnZXM6IHt7IHByb3BzLnRyYWNrZWRSdW4ubWVzc2FnZXMubGVuZ3RoIH19XG4gICAgICAgICAgPC9xLWNoaXA+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgPHEtY2hpcFxuICAgICAgICAgICAgdi1pZj1cInByb3BzLnRyYWNrZWRSdW4uc2lnbmFscy5sZW5ndGggPT09IDBcIlxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGljb249XCJzZW5zb3JzXCJcbiAgICAgICAgICAgID5TaWduYWxzOiB7eyBwcm9wcy50cmFja2VkUnVuLnNpZ25hbHMubGVuZ3RoIH19PC9xLWNoaXBcbiAgICAgICAgICA+XG4gICAgICAgICAgPHEtY2hpcCB2LWVsc2UgZGVuc2UgY29sb3I9XCJyZWRcIiB0ZXh0LWNvbG9yPVwid2hpdGVcIiBpY29uPVwic2Vuc29yc1wiPlxuICAgICAgICAgICAgU2lnbmFsczoge3sgcHJvcHMudHJhY2tlZFJ1bi5zaWduYWxzLmxlbmd0aCB9fVxuICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIDxxLWNoaXAgdi1pZj1cInRyeUNvdW50ID09PSAxXCIgZGVuc2UgaWNvbj1cInJlcGxheVwiXG4gICAgICAgICAgICA+UmV0cmllczoge3sgdHJ5Q291bnQgLSAxIH19PC9xLWNoaXBcbiAgICAgICAgICA+XG4gICAgICAgICAgPHEtY2hpcCB2LWVsc2UgZGVuc2UgY29sb3I9XCJvcmFuZ2VcIiB0ZXh0LWNvbG9yPVwid2hpdGVcIiBpY29uPVwicmVwbGF5XCI+XG4gICAgICAgICAgICBSZXRyaWVzOiB7eyB0cnlDb3VudCAtIDEgfX1cbiAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB0b3Agc2lkZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWdyZXktOCBxLWd1dHRlci14c1wiPlxuICAgICAgICA8cS1pY29uIGNsYXNzPVwiZ3QteHNcIiBzaXplPVwiMTJweFwiIGljb249XCJrZXlib2FyZF9hcnJvd19yaWdodFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICA8L3EtaXRlbT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBjb21wdXRlZCwgZGVmaW5lUHJvcHMgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgSm9iUnVuLCBTdGF0dXMgfSBmcm9tICdzcmMvdHlwZXMvYXBpJztcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcyc7XG5pbXBvcnQgcmVsYXRpdmVUaW1lIGZyb20gJ2RheWpzL3BsdWdpbi9yZWxhdGl2ZVRpbWUnO1xuXG5kYXlqcy5leHRlbmQocmVsYXRpdmVUaW1lKTtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wczx7XG4gIHRyYWNrZWRSdW46IEpvYlJ1bjtcbn0+KCk7XG5cbmNvbnN0IHRpbWVBZ28gPSBjb21wdXRlZCgoKSA9PiBkYXlqcygpLnRvKHByb3BzLnRyYWNrZWRSdW4uY3JlYXRlZF9hdCkpO1xuXG5jb25zdCB0cnlDb3VudCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgbGV0IHRyaWVzID0gMTtcbiAgbGV0IHJ1biA9IHByb3BzLnRyYWNrZWRSdW47XG4gIHdoaWxlIChydW4ucGFyZW50ICE9PSBudWxsKSB7XG4gICAgcnVuID0gcnVuLnBhcmVudDtcbiAgICB0cmllcysrO1xuICB9XG4gIHJldHVybiB0cmllcztcbn0pO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+PC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cImp1c3RpZnktZXZlbmx5XCIgcGFkZGluZyB2LWlmPVwicmVzdWx0cyAhPT0gbnVsbFwiPlxuICAgIDxxLWJyZWFkY3J1bWJzPlxuICAgICAgPHEtYnJlYWRjcnVtYnMtZWwgaWNvbj1cIm1hbmFnZV9zZWFyY2hcIiB0bz1cIi9oaXN0b3J5XCIgbGFiZWw9XCJIaXN0b3J5XCIgLz5cbiAgICA8L3EtYnJlYWRjcnVtYnM+XG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8IS0tICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiBxLXB5LW1kXCI+LS0+XG4gICAgICA8IS0tICAgICAgICA8cS1saXN0IGJvcmRlcmVkIHNlcGFyYXRvcj4tLT5cbiAgICAgIDwhLS0gICAgICAgICAgPHEtaXRlbSB2LXJpcHBsZT48cS1pdGVtLXNlY3Rpb24+LS0+XG4gICAgICA8IS0tICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyByZXN1bHRzLmFsaWFzIH19PC9xLWl0ZW0tbGFiZWw+LS0+XG4gICAgICA8IS0tICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPkFsaWFzPC9xLWl0ZW0tbGFiZWw+LS0+XG4gICAgICA8IS0tICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+PC9xLWl0ZW0+LS0+XG4gICAgICA8IS0tICAgICAgICAgIDxxLWl0ZW0gdi1yaXBwbGU+PHEtaXRlbS1zZWN0aW9uPi0tPlxuICAgICAgPCEtLSAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgcmVzdWx0cy5jbGFzcyB9fTwvcS1pdGVtLWxhYmVsPi0tPlxuICAgICAgPCEtLSAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5DbGFzczwvcS1pdGVtLWxhYmVsPi0tPlxuICAgICAgPCEtLSAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPjwvcS1pdGVtPi0tPlxuICAgICAgPCEtLSAgICAgICAgPC9xLWxpc3Q+LS0+XG4gICAgICA8IS0tICAgICAgPC9kaXY+LS0+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTJcIj5cbiAgICAgICAgPHEtbGlzdCBib3JkZXJlZCBjbGFzcz1cInJvdW5kZWQtYm9yZGVyc1wiIHN0eWxlPVwibWluLXdpZHRoOiA4NSVcIj5cbiAgICAgICAgICA8cS1pdGVtLWxhYmVsIGhlYWRlcj5SdW5zPC9xLWl0ZW0tbGFiZWw+XG5cbiAgICAgICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cbiAgICAgICAgICA8ZGl2IHYtZm9yPVwicnVuIGluIHJlc3VsdHNcIiA6a2V5PVwicnVuLmlkXCI+XG4gICAgICAgICAgICA8bm8tY29udGV4dC10cmFja2VkLXJ1bi1saXN0LWl0ZW0gOnRyYWNrZWQtcnVuPVwicnVuXCI+XG4gICAgICAgICAgICA8L25vLWNvbnRleHQtdHJhY2tlZC1ydW4tbGlzdC1pdGVtPlxuICAgICAgICAgICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1saXN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvcS1wYWdlPlxuICA8cS1wYWdlIGNsYXNzPVwiaXRlbXMtY2VudGVyIGp1c3RpZnktZXZlbmx5XCIgdi1lbHNlPiBMb2FkaW5nIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgYXBpIGZyb20gJ3NyYy91dGlscy9jbGllbnQvYXBpJztcbmltcG9ydCB7IEpvYlJ1biB9IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuaW1wb3J0IHsgdXNlQXBpIH0gZnJvbSAnLi4vY29tcG9zdGFibGVzL3VzZUFwaSc7XG5pbXBvcnQgTm9Db250ZXh0VHJhY2tlZFJ1bkxpc3RJdGVtIGZyb20gJ2NvbXBvbmVudHMvTm9Db250ZXh0VHJhY2tlZFJ1bkxpc3RJdGVtLnZ1ZSc7XG5cbmNvbnN0IHJlc3VsdHMgPSByZWY8Sm9iUnVuW10gfCBudWxsPihudWxsKTtcblxudXNlQXBpKChhZnRlcikgPT4ge1xuICBhcGlcbiAgICAuaGlzdG9yeSgpXG4gICAgLnRoZW4oKHJlc3BvbnNlOiBKb2JSdW5bXSkgPT4gKHJlc3VsdHMudmFsdWUgPSByZXNwb25zZSkpXG4gICAgLmZpbmFsbHkoYWZ0ZXIpO1xufSk7XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4RkEsVUFBTSxPQUFPLFlBQVk7QUFNbkIsVUFBQSxVQUFVLFNBQVMsTUFBTSxRQUFRLEdBQUcsTUFBTSxXQUFXLFVBQVUsQ0FBQztBQUVoRSxVQUFBLFdBQVcsU0FBUyxNQUFNO0FBQzlCLFVBQUksUUFBUTtBQUNaLFVBQUksTUFBTSxNQUFNO0FBQ1QsYUFBQSxJQUFJLFdBQVcsTUFBTTtBQUMxQixjQUFNLElBQUk7QUFDVjtBQUFBLE1BQ0Y7QUFDTyxhQUFBO0FBQUEsSUFBQSxDQUNSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xFSyxVQUFBLFVBQVUsSUFBcUIsSUFBSTtBQUV6QyxXQUFPLENBQUMsVUFBVTtBQUViLFVBQUEsUUFBQSxFQUNBLEtBQUssQ0FBQyxhQUF3QixRQUFRLFFBQVEsUUFBUyxFQUN2RCxRQUFRLEtBQUs7QUFBQSxJQUFBLENBQ2pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
