import { u as useApi, Q as QBreadcrumbsEl, a as QBreadcrumbs, b as QSeparator } from "./useApi.a916b433.js";
import { Q as QItemSection, b as QItemLabel, c as QItem, d as QList } from "./QItem.d2559d90.js";
import { a as api, Q as QPage } from "./api.d8f10d31.js";
import { R as Ripple } from "./use-router-link.b59d0f2d.js";
import { T as TrackedRunListItem } from "./TrackedRunListItem.a048fb66.js";
import { Q as QAvatar } from "./QAvatar.793dfca6.js";
import { _ as _export_sfc, K as defineComponent, L as openBlock, M as createBlock, N as withCtx, d as createVNode, P as createTextVNode, Q as toDisplayString, R as createBaseVNode, r as ref, S as createElementBlock, F as Fragment, U as renderList, O as createCommentVNode, D as withDirectives } from "./index.24d2f870.js";
import "./render.a10da10b.js";
import "./index.aa7156d4.js";
import "./config.b6f61684.js";
import "./QCircularProgress.0f46e564.js";
import "./format.801e7424.js";
import "./QChip.c15cdb8a.js";
import "./api.9a3f3035.js";
import "./dayjs.min.54da9cde.js";
import "./relativeTime.a9f93413.js";
const _hoisted_1$2 = { class: "text-weight-medium" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "JobFailureListItem",
  props: {
    jobFailure: null
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QItem, null, {
        default: withCtx(() => [
          createVNode(QItemSection, {
            avatar: "",
            top: ""
          }, {
            default: withCtx(() => [
              createVNode(QAvatar, {
                color: "primary",
                "text-color": "white"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(props.jobFailure.count), 1)
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
                  createBaseVNode("span", _hoisted_1$2, toDisplayString(props.jobFailure.message), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
var JobFailureListItem = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "JobFailureListItem.vue"]]);
const _hoisted_1$1 = { key: 1 };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "JobFailureReasons",
  props: {
    alias: null
  },
  setup(__props) {
    const props = __props;
    const results = ref(null);
    useApi((after) => {
      api.jobFailureReasons(props.alias).then((response) => results.value = response).finally(after);
    });
    return (_ctx, _cache) => {
      return results.value !== null ? (openBlock(), createBlock(QList, {
        key: 0,
        bordered: "",
        separator: ""
      }, {
        default: withCtx(() => [
          createVNode(QItemLabel, { header: "" }, {
            default: withCtx(() => [
              createTextVNode("Errors")
            ]),
            _: 1
          }),
          results.value.length === 0 ? (openBlock(), createBlock(QItem, { key: 0 }, {
            default: withCtx(() => [
              createVNode(QItemSection, null, {
                default: withCtx(() => [
                  createVNode(QItemLabel, null, {
                    default: withCtx(() => [
                      createTextVNode("Good news; no errors found!")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : (openBlock(), createElementBlock("div", _hoisted_1$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(results.value, (jobFailureReason, index) => {
              return openBlock(), createBlock(QItem, { key: index }, {
                default: withCtx(() => [
                  createVNode(JobFailureListItem, { "job-failure": jobFailureReason }, null, 8, ["job-failure"])
                ]),
                _: 2
              }, 1024);
            }), 128))
          ]))
        ]),
        _: 1
      })) : createCommentVNode("", true);
    };
  }
});
var JobFailureReasons = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "JobFailureReasons.vue"]]);
const _hoisted_1 = { class: "row" };
const _hoisted_2 = { class: "col-12 col-sm-6 q-py-md" };
const _hoisted_3 = { class: "col-12 col-sm-6 q-py-md" };
const _hoisted_4 = { class: "row" };
const _hoisted_5 = { class: "col-12" };
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
              createVNode(JobFailureReasons, {
                alias: props.alias
              }, null, 8, ["alias"])
            ])
          ]),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", _hoisted_5, [
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iU2hvd1BhZ2UuMWQ1ODRhYjUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rhc2hib2FyZC9zcmMvY29tcG9uZW50cy9Kb2JGYWlsdXJlUmVhc29ucy52dWUiLCIuLi8uLi8uLi9kYXNoYm9hcmQvc3JjL3BhZ2VzL0pvYlNob3dQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWxpc3QgYm9yZGVyZWQgc2VwYXJhdG9yIHYtaWY9XCJyZXN1bHRzICE9PSBudWxsXCI+XG4gICAgPHEtaXRlbS1sYWJlbCBoZWFkZXI+RXJyb3JzPC9xLWl0ZW0tbGFiZWw+XG5cbiAgICA8cS1pdGVtIHYtaWY9XCJyZXN1bHRzLmxlbmd0aCA9PT0gMFwiPlxuICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICA8cS1pdGVtLWxhYmVsPkdvb2QgbmV3czsgbm8gZXJyb3JzIGZvdW5kITwvcS1pdGVtLWxhYmVsPlxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICA8L3EtaXRlbT5cblxuICAgIDxkaXYgdi1lbHNlPlxuICAgICAgPHEtaXRlbSB2LWZvcj1cIihqb2JGYWlsdXJlUmVhc29uLCBpbmRleCkgaW4gcmVzdWx0c1wiIDprZXk9XCJpbmRleFwiPlxuICAgICAgICA8am9iLWZhaWx1cmUtbGlzdC1pdGVtIDpqb2ItZmFpbHVyZT1cImpvYkZhaWx1cmVSZWFzb25cIj48L2pvYi1mYWlsdXJlLWxpc3QtaXRlbT5cbiAgICAgIDwvcS1pdGVtPlxuICAgIDwvZGl2PlxuICA8L3EtbGlzdD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQge2NvbXB1dGVkLCBkZWZpbmVQcm9wcywgcmVmfSBmcm9tICd2dWUnO1xuaW1wb3J0IHtKb2JSdW4sIFN0YXR1cywgQmF0Y2gsIFRyYWNrZWRKb2IsIEpvYkZhaWx1cmVSZWFzb259IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuaW1wb3J0IFN0YXR1c0NvdW50IGZyb20gXCJjb21wb25lbnRzL1N0YXR1c0NvdW50LnZ1ZVwiO1xuaW1wb3J0IGRheWpzIGZyb20gXCJkYXlqc1wiO1xuaW1wb3J0IGxvY2FsaXplZEZvcm1hdCBmcm9tICdkYXlqcy9wbHVnaW4vbG9jYWxpemVkRm9ybWF0JztcbmltcG9ydCByZWxhdGl2ZVRpbWUgZnJvbSAnZGF5anMvcGx1Z2luL3JlbGF0aXZlVGltZSc7XG5pbXBvcnQge3VzZUFwaX0gZnJvbSBcInNyYy9jb21wb3N0YWJsZXMvdXNlQXBpXCI7XG5pbXBvcnQgYXBpIGZyb20gXCJzcmMvdXRpbHMvY2xpZW50L2FwaVwiO1xuaW1wb3J0IEpvYkZhaWx1cmVMaXN0SXRlbSBmcm9tIFwiY29tcG9uZW50cy9Kb2JGYWlsdXJlTGlzdEl0ZW0udnVlXCI7XG5cbmNvbnN0IHJlc3VsdHMgPSByZWY8Sm9iRmFpbHVyZVJlYXNvbltdIHwgbnVsbD4obnVsbCk7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8e1xuICBhbGlhczogc3RyaW5nXG59PigpO1xuXG51c2VBcGkoKGFmdGVyKSA9PiB7XG4gIGFwaS5qb2JGYWlsdXJlUmVhc29ucyhwcm9wcy5hbGlhcylcbiAgICAudGhlbigocmVzcG9uc2U6IEpvYkZhaWx1cmVSZWFzb25bXSkgPT4gcmVzdWx0cy52YWx1ZSA9IHJlc3BvbnNlKVxuICAgIC5maW5hbGx5KGFmdGVyKTtcbn0pXG5cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1wYWdlIGNsYXNzPVwianVzdGlmeS1ldmVubHlcIiBwYWRkaW5nIHYtaWY9XCJyZXN1bHRzICE9PSBudWxsXCI+XG4gICAgPHEtYnJlYWRjcnVtYnM+XG4gICAgICA8cS1icmVhZGNydW1icy1lbCBpY29uPVwibGlzdFwiIHRvPVwiL2pvYnNcIiBsYWJlbD1cIkpvYnNcIi8+XG4gICAgICA8cS1icmVhZGNydW1icy1lbCA6bGFiZWw9XCJyZXN1bHRzLmFsaWFzXCIgaWNvbj1cInZpZXdfc3RyZWFtXCIgOnRvPVwiJy9qb2JzLycgKyByZXN1bHRzLmFsaWFzXCIgLz5cbiAgICA8L3EtYnJlYWRjcnVtYnM+XG5cbiAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyIGNvbC1zbS02IHEtcHktbWRcIj5cbiAgICAgICAgPHEtbGlzdCBib3JkZXJlZCBzZXBhcmF0b3I+XG4gICAgICAgICAgPHEtaXRlbSB2LXJpcHBsZT48cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHJlc3VsdHMuYWxpYXMgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5BbGlhczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+PC9xLWl0ZW0+XG4gICAgICAgICAgPHEtaXRlbSB2LXJpcHBsZT48cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHJlc3VsdHMuY2xhc3MgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbj5DbGFzczwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+PC9xLWl0ZW0+XG4gICAgICAgIDwvcS1saXN0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTIgY29sLXNtLTYgcS1weS1tZFwiPlxuICAgICAgICA8am9iLWZhaWx1cmUtcmVhc29ucyA6YWxpYXM9XCJwcm9wcy5hbGlhc1wiPjwvam9iLWZhaWx1cmUtcmVhc29ucz5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sLTEyXCI+XG4gICAgICAgIDxxLWxpc3QgYm9yZGVyZWQgY2xhc3M9XCJyb3VuZGVkLWJvcmRlcnNcIiBzdHlsZT1cIm1pbi13aWR0aDogODUlXCIgPlxuICAgICAgICAgIDxxLWl0ZW0tbGFiZWwgaGVhZGVyPlJ1bnM8L3EtaXRlbS1sYWJlbD5cblxuICAgICAgICAgIDxxLXNlcGFyYXRvcj48L3Etc2VwYXJhdG9yPlxuICAgICAgICAgIDxkaXYgdi1mb3I9XCJydW4gaW4gcmVzdWx0cy5ydW5zXCIgOmtleT1cImdldEhhc2gocnVuKVwiPlxuICAgICAgICAgICAgPHRyYWNrZWQtcnVuLWxpc3QtaXRlbSA6dHJhY2tlZC1ydW49XCJydW5cIj5cbiAgICAgICAgICAgIDwvdHJhY2tlZC1ydW4tbGlzdC1pdGVtPlxuICAgICAgICAgICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1saXN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgPC9xLXBhZ2U+XG4gIDxxLXBhZ2UgY2xhc3M9XCJpdGVtcy1jZW50ZXIganVzdGlmeS1ldmVubHlcIiB2LWVsc2U+XG4gICAgTG9hZGluZ1xuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQge3JlZn0gZnJvbSAndnVlJztcbmltcG9ydCBhcGkgZnJvbSAnc3JjL3V0aWxzL2NsaWVudC9hcGknO1xuaW1wb3J0IHtKb2JSdW4sIFRyYWNrZWRKb2J9IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuaW1wb3J0IHt1c2VBcGl9IGZyb20gXCIuLi9jb21wb3N0YWJsZXMvdXNlQXBpXCI7XG5pbXBvcnQgVHJhY2tlZFJ1bkxpc3RJdGVtIGZyb20gXCJjb21wb25lbnRzL1RyYWNrZWRSdW5MaXN0SXRlbS52dWVcIjtcbmltcG9ydCBKb2JGYWlsdXJlUmVhc29ucyBmcm9tIFwiY29tcG9uZW50cy9Kb2JGYWlsdXJlUmVhc29ucy52dWVcIjtcblxuY29uc3QgcmVzdWx0cyA9IHJlZjxUcmFja2VkSm9ifG51bGw+KG51bGwpO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzPHtcbiAgYWxpYXM6IHN0cmluZ1xufT4oKTtcblxudXNlQXBpKChhZnRlcikgPT4ge1xuICBhcGkuam9iU2hvdyhwcm9wcy5hbGlhcylcbiAgICAudGhlbigocmVzcG9uc2U6IFRyYWNrZWRKb2IpID0+IHJlc3VsdHMudmFsdWUgPSByZXNwb25zZSlcbiAgICAuZmluYWxseShhZnRlcik7XG59KVxuXG5mdW5jdGlvbiBnZXRIYXNoKGpvYlJ1bjogSm9iUnVuKTogc3RyaW5nIHtcbiAgcmV0dXJuIGpvYlJ1bi51dWlkO1xufVxuXG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkJNLFVBQUEsVUFBVSxJQUErQixJQUFJO0FBTW5ELFdBQU8sQ0FBQyxVQUFVO0FBQ2hCLFVBQUksa0JBQWtCLE1BQU0sS0FBSyxFQUM5QixLQUFLLENBQUMsYUFBaUMsUUFBUSxRQUFRLFFBQVEsRUFDL0QsUUFBUSxLQUFLO0FBQUEsSUFBQSxDQUNqQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2lCSyxVQUFBLFVBQVUsSUFBcUIsSUFBSTtBQU16QyxXQUFPLENBQUMsVUFBVTtBQUNoQixVQUFJLFFBQVEsTUFBTSxLQUFLLEVBQ3BCLEtBQUssQ0FBQyxhQUF5QixRQUFRLFFBQVEsUUFBUSxFQUN2RCxRQUFRLEtBQUs7QUFBQSxJQUFBLENBQ2pCO0FBRUQsYUFBUyxRQUFRLFFBQXdCO0FBQ3ZDLGFBQU8sT0FBTztBQUFBLElBQ2hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
