import { S as Status, u as useApi, Q as QBreadcrumbsEl, a as QBreadcrumbs, b as QSeparator } from "./api.81530e8b.js";
import { Q as QItemSection, b as QItemLabel, c as QItem, d as QList } from "./QItem.2946db6a.js";
import { Q as QPage, a as api } from "./api.8f185fbd.js";
import { Q as QIcon, R as Ripple } from "./use-router-link.70d2557d.js";
import { r as relativeTime, Q as QCircularProgress } from "./relativeTime.2bd83cdc.js";
import { Q as QChip } from "./QChip.50f76a38.js";
import { d as dayjs } from "./dayjs.min.54da9cde.js";
import { _ as _export_sfc, K as defineComponent, c as computed, L as openBlock, M as createBlock, N as withCtx, d as createVNode, a0 as unref, O as createCommentVNode, P as createTextVNode, Q as toDisplayString, R as createBaseVNode, r as ref, D as withDirectives, S as createElementBlock, U as renderList, F as Fragment } from "./index.07765cf9.js";
import "./render.34f10d21.js";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iU2hvd1BhZ2UuYzc2ZTQ4ODYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rhc2hib2FyZC9zcmMvY29tcG9uZW50cy9UcmFja2VkUnVuTGlzdEl0ZW0udnVlIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9Kb2JTaG93UGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiXG48dGVtcGxhdGU+XG4gIDxxLWl0ZW0gY2xpY2thYmxlIDp0bz1cIntwYXRoOiAnL3J1bi8nICsgcHJvcHMudHJhY2tlZFJ1bi5pZH1cIj5cbiAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyIHRvcD5cbiAgICAgIDxxLWljb24gbmFtZT1cImhvdXJnbGFzc190b3BcIiBjb2xvcj1cImJsYWNrXCIgc2l6ZT1cIjM0cHhcIiB2LWlmPVwicHJvcHMudHJhY2tlZFJ1bi5zdGF0dXMgPT09IFN0YXR1cy5RdWV1ZWRcIiAvPlxuICAgICAgPHEtY2lyY3VsYXItcHJvZ3Jlc3NcbiAgICAgICAgc2hvdy12YWx1ZVxuICAgICAgICA6dmFsdWU9XCJwcm9wcy50cmFja2VkUnVuLnBlcmNlbnRhZ2VcIlxuICAgICAgICByb3VuZGVkXG4gICAgICAgIHYtZWxzZS1pZj1cInByb3BzLnRyYWNrZWRSdW4uc3RhdHVzID09PSBTdGF0dXMuU3RhcnRlZFwiXG4gICAgICAgIHNpemU9XCIzNHB4XCJcbiAgICAgICAgY2xhc3M9XCJxLW1hLW1kXCJcbiAgICAgIC8+XG4gICAgICA8cS1pY29uIG5hbWU9XCJkb25lXCIgY29sb3I9XCJibGFja1wiIHNpemU9XCIzNHB4XCIgdi1lbHNlLWlmPVwicHJvcHMudHJhY2tlZFJ1bi5zdGF0dXMgPT09IFN0YXR1cy5TdWNjZWVkZWRcIiAvPlxuICAgICAgPHEtaWNvbiBuYW1lPVwiY2xvc2VcIiBjb2xvcj1cImJsYWNrXCIgc2l6ZT1cIjM0cHhcIiB2LWVsc2UtaWY9XCJwcm9wcy50cmFja2VkUnVuLnN0YXR1cyA9PT0gU3RhdHVzLkZhaWxlZFwiIC8+XG4gICAgICA8cS1pY29uIG5hbWU9XCJub3RfaW50ZXJlc3RlZFwiIGNvbG9yPVwiYmxhY2tcIiBzaXplPVwiMzRweFwiIHYtZWxzZS1pZj1cInByb3BzLnRyYWNrZWRSdW4uc3RhdHVzID09PSBTdGF0dXMuQ2FuY2VsbGVkXCIgLz5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgPHEtaXRlbS1zZWN0aW9uIHRvcCBjbGFzcz1cImNvbC0yIGd0LXNtXCI+XG4gICAgICA8cS1pdGVtLWxhYmVsIGNsYXNzPVwicS1tdC1zbVwiPnt7IHRpbWVBZ28gfX08L3EtaXRlbS1sYWJlbD5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgPHEtaXRlbS1zZWN0aW9uIHRvcD5cbiAgICAgIDxxLWl0ZW0tbGFiZWwgbGluZXM9XCIxXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC13ZWlnaHQtbWVkaXVtXCI+e3twcm9wcy50cmFja2VkUnVuLnN0YXR1c319PC9zcGFuPlxuPCEtLSAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWdyZXktOFwiIHYtaWY9XCJTdGF0dXMuRmFpbGVkICYmIHRyeUNvdW50ID4gMFwiPiAtIHt7dHJ5Q291bnR9fSB7e3RyeUNvdW50ID4gMSA/ICdhdHRlbXB0cycgOiAnYXR0ZW1wdCd9fTwvc3Bhbj4tLT5cbiAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPlxuICAgICAgICA8c3Bhbj5cbiAgICAgICAgICA8cS1jaGlwIHYtaWY9XCJwcm9wcy50cmFja2VkUnVuLm1lc3NhZ2VzLmxlbmd0aCA9PT0gMFwiIGRlbnNlIGljb249XCJjaGF0XCI+TWVzc2FnZXM6IHt7cHJvcHMudHJhY2tlZFJ1bi5tZXNzYWdlcy5sZW5ndGh9fTwvcS1jaGlwPlxuICAgICAgICAgIDxxLWNoaXAgdi1lbHNlIGRlbnNlIGNvbG9yPVwiYmx1ZVwiIHRleHQtY29sb3I9XCJ3aGl0ZVwiIGljb249XCJjaGF0XCI+XG4gICAgICAgICAgICBNZXNzYWdlczoge3twcm9wcy50cmFja2VkUnVuLm1lc3NhZ2VzLmxlbmd0aH19XG4gICAgICAgICAgPC9xLWNoaXA+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgPHEtY2hpcCB2LWlmPVwicHJvcHMudHJhY2tlZFJ1bi5zaWduYWxzLmxlbmd0aCA9PT0gMFwiIGRlbnNlIGljb249XCJzZW5zb3JzXCI+U2lnbmFsczoge3twcm9wcy50cmFja2VkUnVuLnNpZ25hbHMubGVuZ3RofX08L3EtY2hpcD5cbiAgICAgICAgICA8cS1jaGlwIHYtZWxzZSBkZW5zZSBjb2xvcj1cInJlZFwiIHRleHQtY29sb3I9XCJ3aGl0ZVwiIGljb249XCJzZW5zb3JzXCI+XG4gICAgICAgICAgICBTaWduYWxzOiB7e3Byb3BzLnRyYWNrZWRSdW4uc2lnbmFscy5sZW5ndGh9fVxuICAgICAgICAgIDwvcS1jaGlwPlxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIDxxLWNoaXAgdi1pZj1cInRyeUNvdW50ID09PSAxXCIgZGVuc2UgaWNvbj1cInJlcGxheVwiPlJldHJpZXM6IHt7dHJ5Q291bnQgLSAxfX08L3EtY2hpcD5cbiAgICAgICAgICA8cS1jaGlwIHYtZWxzZSBkZW5zZSBjb2xvcj1cIm9yYW5nZVwiIHRleHQtY29sb3I9XCJ3aGl0ZVwiIGljb249XCJyZXBsYXlcIj5cbiAgICAgICAgICAgIFJldHJpZXM6IHt7dHJ5Q291bnQgLSAxfX1cbiAgICAgICAgICA8L3EtY2hpcD5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB0b3Agc2lkZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWdyZXktOCBxLWd1dHRlci14c1wiPlxuICAgICAgICA8cS1pY29uIGNsYXNzPVwiZ3QteHNcIiBzaXplPVwiMTJweFwiIGljb249XCJrZXlib2FyZF9hcnJvd19yaWdodFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICA8L3EtaXRlbT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQge2NvbXB1dGVkLCBkZWZpbmVQcm9wc30gZnJvbSAndnVlJztcbmltcG9ydCB7Sm9iUnVuLCBTdGF0dXN9IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuaW1wb3J0IGRheWpzIGZyb20gXCJkYXlqc1wiO1xuaW1wb3J0IHJlbGF0aXZlVGltZSBmcm9tICdkYXlqcy9wbHVnaW4vcmVsYXRpdmVUaW1lJztcblxuZGF5anMuZXh0ZW5kKHJlbGF0aXZlVGltZSk7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8e1xuICB0cmFja2VkUnVuOiBKb2JSdW5cbn0+KCk7XG5cbmNvbnN0IHRpbWVBZ28gPSBjb21wdXRlZCgoKSA9PiBkYXlqcygpLnRvKHByb3BzLnRyYWNrZWRSdW4uY3JlYXRlZF9hdCkpXG5cbmNvbnN0IHRyeUNvdW50ID0gY29tcHV0ZWQoKCkgPT4ge1xuICBsZXQgdHJpZXMgPSAxO1xuICBsZXQgcnVuID0gcHJvcHMudHJhY2tlZFJ1bjtcbiAgd2hpbGUocnVuLnBhcmVudCAhPT0gbnVsbCkge1xuICAgIHJ1biA9IHJ1bi5wYXJlbnRcbiAgICB0cmllcysrO1xuICB9XG4gIHJldHVybiB0cmllcztcbn0pXG5cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1wYWdlIGNsYXNzPVwianVzdGlmeS1ldmVubHlcIiBwYWRkaW5nIHYtaWY9XCJyZXN1bHRzICE9PSBudWxsXCI+XG4gICAgPHEtYnJlYWRjcnVtYnM+XG4gICAgICA8cS1icmVhZGNydW1icy1lbCBpY29uPVwibGlzdFwiIHRvPVwiL2pvYnNcIiBsYWJlbD1cIkpvYnNcIi8+XG4gICAgICA8cS1icmVhZGNydW1icy1lbCA6bGFiZWw9XCJyZXN1bHRzLmFsaWFzXCIgaWNvbj1cInZpZXdfc3RyZWFtXCIgOnRvPVwiJy9qb2JzLycgKyByZXN1bHRzLmFsaWFzXCIgLz5cbiAgICA8L3EtYnJlYWRjcnVtYnM+XG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIHEtcHktbWRcIj5cbiAgICAgICAgPHEtbGlzdCBib3JkZXJlZCBzZXBhcmF0b3I+XG4gICAgICAgICAgPHEtaXRlbSB2LXJpcHBsZT48cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHJlc3VsdHMuYWxpYXMgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5BbGlhczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+PC9xLWl0ZW0+XG4gICAgICAgICAgPHEtaXRlbSB2LXJpcHBsZT48cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHJlc3VsdHMuY2xhc3MgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5DbGFzczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+PC9xLWl0ZW0+XG4gICAgICAgIDwvcS1saXN0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTJcIj5cbiAgICAgICAgPHEtbGlzdCBib3JkZXJlZCBjbGFzcz1cInJvdW5kZWQtYm9yZGVyc1wiIHN0eWxlPVwibWluLXdpZHRoOiA4NSVcIiA+XG4gICAgICAgICAgPHEtaXRlbS1sYWJlbCBoZWFkZXI+UnVuczwvcS1pdGVtLWxhYmVsPlxuXG4gICAgICAgICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XG4gICAgICAgICAgPGRpdiB2LWZvcj1cInJ1biBpbiByZXN1bHRzLnJ1bnNcIiA6a2V5PVwiZ2V0SGFzaChydW4pXCI+XG4gICAgICAgICAgICA8dHJhY2tlZC1ydW4tbGlzdC1pdGVtIDp0cmFja2VkLXJ1bj1cInJ1blwiPlxuICAgICAgICAgICAgPC90cmFja2VkLXJ1bi1saXN0LWl0ZW0+XG4gICAgICAgICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWxpc3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICA8L3EtcGFnZT5cbiAgPHEtcGFnZSBjbGFzcz1cIml0ZW1zLWNlbnRlciBqdXN0aWZ5LWV2ZW5seVwiIHYtZWxzZT5cbiAgICBMb2FkaW5nXG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7cmVmfSBmcm9tICd2dWUnO1xuaW1wb3J0IGFwaSBmcm9tICdzcmMvdXRpbHMvY2xpZW50L2FwaSc7XG5pbXBvcnQge0pvYlJ1biwgVHJhY2tlZEpvYn0gZnJvbSAnc3JjL3R5cGVzL2FwaSc7XG5pbXBvcnQge3VzZUFwaX0gZnJvbSBcIi4uL2NvbXBvc3RhYmxlcy91c2VBcGlcIjtcbmltcG9ydCBUcmFja2VkUnVuTGlzdEl0ZW0gZnJvbSBcImNvbXBvbmVudHMvVHJhY2tlZFJ1bkxpc3RJdGVtLnZ1ZVwiO1xuXG5jb25zdCByZXN1bHRzID0gcmVmPFRyYWNrZWRKb2J8bnVsbD4obnVsbCk7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8e1xuICBhbGlhczogc3RyaW5nXG59PigpO1xuXG51c2VBcGkoKGFmdGVyKSA9PiB7XG4gIGFwaS5qb2JTaG93KHByb3BzLmFsaWFzKVxuICAgIC50aGVuKChyZXNwb25zZTogVHJhY2tlZEpvYikgPT4gcmVzdWx0cy52YWx1ZSA9IHJlc3BvbnNlKVxuICAgIC5maW5hbGx5KGFmdGVyKTtcbn0pXG5cbmZ1bmN0aW9uIGdldEhhc2goam9iUnVuOiBKb2JSdW4pOiBzdHJpbmcge1xuICByZXR1cm4gam9iUnVuLnV1aWQ7XG59XG5cbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStEQSxVQUFNLE9BQU8sWUFBWTtBQU1uQixVQUFBLFVBQVUsU0FBUyxNQUFNLFFBQVEsR0FBRyxNQUFNLFdBQVcsVUFBVSxDQUFDO0FBRWhFLFVBQUEsV0FBVyxTQUFTLE1BQU07QUFDOUIsVUFBSSxRQUFRO0FBQ1osVUFBSSxNQUFNLE1BQU07QUFDVixhQUFBLElBQUksV0FBVyxNQUFNO0FBQ3pCLGNBQU0sSUFBSTtBQUNWO0FBQUEsTUFDRjtBQUNPLGFBQUE7QUFBQSxJQUFBLENBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9CSyxVQUFBLFVBQVUsSUFBcUIsSUFBSTtBQU16QyxXQUFPLENBQUMsVUFBVTtBQUNoQixVQUFJLFFBQVEsTUFBTSxLQUFLLEVBQ3BCLEtBQUssQ0FBQyxhQUF5QixRQUFRLFFBQVEsUUFBUSxFQUN2RCxRQUFRLEtBQUs7QUFBQSxJQUFBLENBQ2pCO0FBRUQsYUFBUyxRQUFRLFFBQXdCO0FBQ3ZDLGFBQU8sT0FBTztBQUFBLElBQ2hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
