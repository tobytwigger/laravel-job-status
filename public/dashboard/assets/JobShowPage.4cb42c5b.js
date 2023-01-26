import { S as Status, u as useApi, Q as QBreadcrumbsEl, a as QBreadcrumbs, b as QSeparator } from "./api.a45d04b9.js";
import { Q as QItemSection, b as QItemLabel, c as QItem, d as QList } from "./QItem.4932e96c.js";
import { Q as QPage, a as api } from "./api.b70b87c8.js";
import { Q as QIcon, R as Ripple } from "./use-router-link.1dfef31b.js";
import { r as relativeTime, Q as QCircularProgress } from "./relativeTime.bed2d30c.js";
import { Q as QChip } from "./QChip.ca0bac06.js";
import { d as dayjs } from "./dayjs.min.54da9cde.js";
import { _ as _export_sfc, K as defineComponent, c as computed, L as openBlock, M as createBlock, N as withCtx, d as createVNode, Z as unref, O as createCommentVNode, P as createTextVNode, Q as toDisplayString, R as createBaseVNode, r as ref, D as withDirectives, S as createElementBlock, U as renderList, F as Fragment } from "./index.a2d3f53c.js";
import "./render.80a4b5ad.js";
import "./index.aa7156d4.js";
import "./config.b6f61684.js";
import "./format.801e7424.js";
const _hoisted_1$1 = { class: "text-weight-medium" };
const _hoisted_2$1 = { class: "text-grey-8 q-gutter-xs" };
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
                  createBaseVNode("span", _hoisted_1$1, toDisplayString(props.trackedRun.status), 1)
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
              createBaseVNode("div", _hoisted_2$1, [
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
const _hoisted_1 = { class: "row" };
const _hoisted_2 = { class: "col-12 q-py-md" };
const _hoisted_3 = { class: "col-12" };
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
        class: "justify-evenly",
        padding: ""
      }, {
        default: withCtx(() => [
          createVNode(QBreadcrumbs, null, {
            default: withCtx(() => [
              createVNode(QBreadcrumbsEl, {
                icon: "list",
                to: "/jobs",
                label: "Jobs"
              }),
              createVNode(QBreadcrumbsEl, {
                label: results.value.alias,
                icon: "view_stream",
                to: "/jobs/" + results.value.alias
              }, null, 8, ["label", "to"])
            ]),
            _: 1
          }),
          createBaseVNode("div", _hoisted_1, [
            createBaseVNode("div", _hoisted_2, [
              createVNode(QList, {
                bordered: "",
                separator: ""
              }, {
                default: withCtx(() => [
                  withDirectives((openBlock(), createBlock(QItem, null, {
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
                  withDirectives((openBlock(), createBlock(QItem, null, {
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
              })
            ]),
            createBaseVNode("div", _hoisted_3, [
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
var JobShowPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "JobShowPage.vue"]]);
export { JobShowPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iU2hvd1BhZ2UuNGNiNDJjNWIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rhc2hib2FyZC9zcmMvY29tcG9uZW50cy9UcmFja2VkUnVuTGlzdEl0ZW0udnVlIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9Kb2JTaG93UGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1pdGVtIGNsaWNrYWJsZSA6dG89XCJ7cGF0aDogJy9ydW4vJyArIHByb3BzLnRyYWNrZWRSdW4uaWR9XCI+XG4gICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhciB0b3A+XG4gICAgICA8cS1pY29uIG5hbWU9XCJob3VyZ2xhc3NfdG9wXCIgY29sb3I9XCJibGFja1wiIHNpemU9XCIzNHB4XCIgdi1pZj1cInByb3BzLnRyYWNrZWRSdW4uc3RhdHVzID09PSBTdGF0dXMuUXVldWVkXCIgLz5cbiAgICAgIDxxLWNpcmN1bGFyLXByb2dyZXNzXG4gICAgICAgIHNob3ctdmFsdWVcbiAgICAgICAgOnZhbHVlPVwicHJvcHMudHJhY2tlZFJ1bi5wZXJjZW50YWdlXCJcbiAgICAgICAgcm91bmRlZFxuICAgICAgICB2LWVsc2UtaWY9XCJwcm9wcy50cmFja2VkUnVuLnN0YXR1cyA9PT0gU3RhdHVzLlN0YXJ0ZWRcIlxuICAgICAgICBzaXplPVwiMzRweFwiXG4gICAgICAgIGNsYXNzPVwicS1tYS1tZFwiXG4gICAgICAvPlxuICAgICAgPHEtaWNvbiBuYW1lPVwiZG9uZVwiIGNvbG9yPVwiYmxhY2tcIiBzaXplPVwiMzRweFwiIHYtZWxzZS1pZj1cInByb3BzLnRyYWNrZWRSdW4uc3RhdHVzID09PSBTdGF0dXMuU3VjY2VlZGVkXCIgLz5cbiAgICAgIDxxLWljb24gbmFtZT1cImNsb3NlXCIgY29sb3I9XCJibGFja1wiIHNpemU9XCIzNHB4XCIgdi1lbHNlLWlmPVwicHJvcHMudHJhY2tlZFJ1bi5zdGF0dXMgPT09IFN0YXR1cy5GYWlsZWRcIiAvPlxuICAgICAgPHEtaWNvbiBuYW1lPVwibm90X2ludGVyZXN0ZWRcIiBjb2xvcj1cImJsYWNrXCIgc2l6ZT1cIjM0cHhcIiB2LWVsc2UtaWY9XCJwcm9wcy50cmFja2VkUnVuLnN0YXR1cyA9PT0gU3RhdHVzLkNhbmNlbGxlZFwiIC8+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB0b3AgY2xhc3M9XCJjb2wtMiBndC1zbVwiPlxuICAgICAgPHEtaXRlbS1sYWJlbCBjbGFzcz1cInEtbXQtc21cIj57eyB0aW1lQWdvIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB0b3A+XG4gICAgICA8cS1pdGVtLWxhYmVsIGxpbmVzPVwiMVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtd2VpZ2h0LW1lZGl1bVwiPnt7cHJvcHMudHJhY2tlZFJ1bi5zdGF0dXN9fTwvc3Bhbj5cbjwhLS0gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC1ncmV5LThcIiB2LWlmPVwiU3RhdHVzLkZhaWxlZCAmJiB0cnlDb3VudCA+IDBcIj4gLSB7e3RyeUNvdW50fX0ge3t0cnlDb3VudCA+IDEgPyAnYXR0ZW1wdHMnIDogJ2F0dGVtcHQnfX08L3NwYW4+LS0+XG4gICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgPHEtY2hpcCB2LWlmPVwicHJvcHMudHJhY2tlZFJ1bi5tZXNzYWdlcy5sZW5ndGggPT09IDBcIiBkZW5zZSBpY29uPVwiY2hhdFwiPk1lc3NhZ2VzOiB7e3Byb3BzLnRyYWNrZWRSdW4ubWVzc2FnZXMubGVuZ3RofX08L3EtY2hpcD5cbiAgICAgICAgICA8cS1jaGlwIHYtZWxzZSBkZW5zZSBjb2xvcj1cImJsdWVcIiB0ZXh0LWNvbG9yPVwid2hpdGVcIiBpY29uPVwiY2hhdFwiPlxuICAgICAgICAgICAgTWVzc2FnZXM6IHt7cHJvcHMudHJhY2tlZFJ1bi5tZXNzYWdlcy5sZW5ndGh9fVxuICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIDxxLWNoaXAgdi1pZj1cInByb3BzLnRyYWNrZWRSdW4uc2lnbmFscy5sZW5ndGggPT09IDBcIiBkZW5zZSBpY29uPVwic2Vuc29yc1wiPlNpZ25hbHM6IHt7cHJvcHMudHJhY2tlZFJ1bi5zaWduYWxzLmxlbmd0aH19PC9xLWNoaXA+XG4gICAgICAgICAgPHEtY2hpcCB2LWVsc2UgZGVuc2UgY29sb3I9XCJyZWRcIiB0ZXh0LWNvbG9yPVwid2hpdGVcIiBpY29uPVwic2Vuc29yc1wiPlxuICAgICAgICAgICAgU2lnbmFsczoge3twcm9wcy50cmFja2VkUnVuLnNpZ25hbHMubGVuZ3RofX1cbiAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICA8cS1jaGlwIHYtaWY9XCJ0cnlDb3VudCA9PT0gMVwiIGRlbnNlIGljb249XCJyZXBsYXlcIj5SZXRyaWVzOiB7e3RyeUNvdW50IC0gMX19PC9xLWNoaXA+XG4gICAgICAgICAgPHEtY2hpcCB2LWVsc2UgZGVuc2UgY29sb3I9XCJvcmFuZ2VcIiB0ZXh0LWNvbG9yPVwid2hpdGVcIiBpY29uPVwicmVwbGF5XCI+XG4gICAgICAgICAgICBSZXRyaWVzOiB7e3RyeUNvdW50IC0gMX19XG4gICAgICAgICAgPC9xLWNoaXA+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICA8cS1pdGVtLXNlY3Rpb24gdG9wIHNpZGU+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ncmV5LTggcS1ndXR0ZXIteHNcIj5cbiAgICAgICAgPHEtaWNvbiBjbGFzcz1cImd0LXhzXCIgc2l6ZT1cIjEycHhcIiBpY29uPVwia2V5Ym9hcmRfYXJyb3dfcmlnaHRcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgPC9xLWl0ZW0+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHtjb21wdXRlZCwgZGVmaW5lUHJvcHN9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQge0pvYlJ1biwgU3RhdHVzfSBmcm9tICdzcmMvdHlwZXMvYXBpJztcbmltcG9ydCBkYXlqcyBmcm9tIFwiZGF5anNcIjtcbmltcG9ydCByZWxhdGl2ZVRpbWUgZnJvbSAnZGF5anMvcGx1Z2luL3JlbGF0aXZlVGltZSc7XG5cbmRheWpzLmV4dGVuZChyZWxhdGl2ZVRpbWUpO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzPHtcbiAgdHJhY2tlZFJ1bjogSm9iUnVuXG59PigpO1xuXG5jb25zdCB0aW1lQWdvID0gY29tcHV0ZWQoKCkgPT4gZGF5anMoKS50byhwcm9wcy50cmFja2VkUnVuLmNyZWF0ZWRfYXQpKVxuXG5jb25zdCB0cnlDb3VudCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgbGV0IHRyaWVzID0gMTtcbiAgbGV0IHJ1biA9IHByb3BzLnRyYWNrZWRSdW47XG4gIHdoaWxlKHJ1bi5wYXJlbnQgIT09IG51bGwpIHtcbiAgICBydW4gPSBydW4ucGFyZW50XG4gICAgdHJpZXMrKztcbiAgfVxuICByZXR1cm4gdHJpZXM7XG59KVxuXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cImp1c3RpZnktZXZlbmx5XCIgcGFkZGluZyB2LWlmPVwicmVzdWx0cyAhPT0gbnVsbFwiPlxuICAgIDxxLWJyZWFkY3J1bWJzPlxuICAgICAgPHEtYnJlYWRjcnVtYnMtZWwgaWNvbj1cImxpc3RcIiB0bz1cIi9qb2JzXCIgbGFiZWw9XCJKb2JzXCIvPlxuICAgICAgPHEtYnJlYWRjcnVtYnMtZWwgOmxhYmVsPVwicmVzdWx0cy5hbGlhc1wiIGljb249XCJ2aWV3X3N0cmVhbVwiIDp0bz1cIicvam9icy8nICsgcmVzdWx0cy5hbGlhc1wiIC8+XG4gICAgPC9xLWJyZWFkY3J1bWJzPlxuXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiBxLXB5LW1kXCI+XG4gICAgICAgIDxxLWxpc3QgYm9yZGVyZWQgc2VwYXJhdG9yPlxuICAgICAgICAgIDxxLWl0ZW0gdi1yaXBwbGU+PHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyByZXN1bHRzLmFsaWFzIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+QWxpYXM8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPjwvcS1pdGVtPlxuICAgICAgICAgIDxxLWl0ZW0gdi1yaXBwbGU+PHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyByZXN1bHRzLmNsYXNzIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+Q2xhc3M8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPjwvcS1pdGVtPlxuICAgICAgICA8L3EtbGlzdD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyXCI+XG4gICAgICAgIDxxLWxpc3QgYm9yZGVyZWQgY2xhc3M9XCJyb3VuZGVkLWJvcmRlcnNcIiBzdHlsZT1cIm1pbi13aWR0aDogODUlXCIgPlxuICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgaGVhZGVyPlJ1bnM8L3EtaXRlbS1sYWJlbD5cblxuICAgICAgICAgIDxxLXNlcGFyYXRvcj48L3Etc2VwYXJhdG9yPlxuICAgICAgICAgIDxkaXYgdi1mb3I9XCJydW4gaW4gcmVzdWx0cy5ydW5zXCIgOmtleT1cImdldEhhc2gocnVuKVwiPlxuICAgICAgICAgICAgPHRyYWNrZWQtcnVuLWxpc3QtaXRlbSA6dHJhY2tlZC1ydW49XCJydW5cIj5cbiAgICAgICAgICAgIDwvdHJhY2tlZC1ydW4tbGlzdC1pdGVtPlxuICAgICAgICAgICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1saXN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgPC9xLXBhZ2U+XG4gIDxxLXBhZ2UgY2xhc3M9XCJpdGVtcy1jZW50ZXIganVzdGlmeS1ldmVubHlcIiB2LWVsc2U+XG4gICAgTG9hZGluZ1xuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQge3JlZn0gZnJvbSAndnVlJztcbmltcG9ydCBhcGkgZnJvbSAnc3JjL3V0aWxzL2NsaWVudC9hcGknO1xuaW1wb3J0IHtKb2JSdW4sIFRyYWNrZWRKb2J9IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuaW1wb3J0IHt1c2VBcGl9IGZyb20gXCIuLi9jb21wb3N0YWJsZXMvdXNlQXBpXCI7XG5pbXBvcnQgVHJhY2tlZFJ1bkxpc3RJdGVtIGZyb20gXCJjb21wb25lbnRzL1RyYWNrZWRSdW5MaXN0SXRlbS52dWVcIjtcblxuY29uc3QgcmVzdWx0cyA9IHJlZjxUcmFja2VkSm9ifG51bGw+KG51bGwpO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzPHtcbiAgYWxpYXM6IHN0cmluZ1xufT4oKTtcblxudXNlQXBpKChhZnRlcikgPT4ge1xuICBhcGkuam9iU2hvdyhwcm9wcy5hbGlhcylcbiAgICAudGhlbigocmVzcG9uc2U6IFRyYWNrZWRKb2IpID0+IHJlc3VsdHMudmFsdWUgPSByZXNwb25zZSlcbiAgICAuZmluYWxseShhZnRlcik7XG59KVxuXG5mdW5jdGlvbiBnZXRIYXNoKGpvYlJ1bjogSm9iUnVuKTogc3RyaW5nIHtcbiAgcmV0dXJuIGpvYlJ1bi51dWlkO1xufVxuXG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4REEsVUFBTSxPQUFPLFlBQVk7QUFNbkIsVUFBQSxVQUFVLFNBQVMsTUFBTSxRQUFRLEdBQUcsTUFBTSxXQUFXLFVBQVUsQ0FBQztBQUVoRSxVQUFBLFdBQVcsU0FBUyxNQUFNO0FBQzlCLFVBQUksUUFBUTtBQUNaLFVBQUksTUFBTSxNQUFNO0FBQ1YsYUFBQSxJQUFJLFdBQVcsTUFBTTtBQUN6QixjQUFNLElBQUk7QUFDVjtBQUFBLE1BQ0Y7QUFDTyxhQUFBO0FBQUEsSUFBQSxDQUNSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QkssVUFBQSxVQUFVLElBQXFCLElBQUk7QUFNekMsV0FBTyxDQUFDLFVBQVU7QUFDaEIsVUFBSSxRQUFRLE1BQU0sS0FBSyxFQUNwQixLQUFLLENBQUMsYUFBeUIsUUFBUSxRQUFRLFFBQVEsRUFDdkQsUUFBUSxLQUFLO0FBQUEsSUFBQSxDQUNqQjtBQUVELGFBQVMsUUFBUSxRQUF3QjtBQUN2QyxhQUFPLE9BQU87QUFBQSxJQUNoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
