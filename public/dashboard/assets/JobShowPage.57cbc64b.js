import { c as client, Q as QBreadcrumbsEl, a as QBreadcrumbs, b as QSeparator } from "./index.203c0d01.js";
import { Q as QItemSection, b as QItemLabel, c as QItem, d as QList } from "./QItem.8ac5cbd8.js";
import { Q as QPage } from "./QPage.e0997bbf.js";
import { R as Ripple } from "./use-router-link.52590381.js";
import { T as TrackedRunListItem } from "./TrackedRunListItem.2d9fda8b.js";
import { Q as QAvatar } from "./QAvatar.30bd604f.js";
import { _ as _export_sfc, K as defineComponent, L as openBlock, M as createBlock, N as withCtx, d as createVNode, P as createTextVNode, Q as toDisplayString, R as createBaseVNode, r as ref, S as createElementBlock, F as Fragment, U as renderList, O as createCommentVNode, k as onBeforeUnmount, D as withDirectives } from "./index.9f6f356f.js";
import "./render.060e8dc4.js";
import "./index.b7f28e66.js";
import "./QCircularProgress.1dce0d41.js";
import "./format.801e7424.js";
import "./QChip.a459c4af.js";
import "./api.9a3f3035.js";
import "./dayjs.min.8673fdcc.js";
import "./relativeTime.6a491d53.js";
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
    const results = ref(null);
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
    let listener = client.jobs.show(props.alias).listen().onUpdated((newResults) => results.value = newResults).start();
    onBeforeUnmount(() => {
      listener.stop();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iU2hvd1BhZ2UuNTdjYmM2NGIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rhc2hib2FyZC9zcmMvY29tcG9uZW50cy9Kb2JGYWlsdXJlUmVhc29ucy52dWUiLCIuLi8uLi8uLi9kYXNoYm9hcmQvc3JjL3BhZ2VzL0pvYlNob3dQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWxpc3QgYm9yZGVyZWQgc2VwYXJhdG9yIHYtaWY9XCJyZXN1bHRzICE9PSBudWxsXCI+XG4gICAgPHEtaXRlbS1sYWJlbCBoZWFkZXI+RXJyb3JzPC9xLWl0ZW0tbGFiZWw+XG5cbiAgICA8cS1pdGVtIHYtaWY9XCJyZXN1bHRzLmxlbmd0aCA9PT0gMFwiPlxuICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICA8cS1pdGVtLWxhYmVsPkdvb2QgbmV3czsgbm8gZXJyb3JzIGZvdW5kITwvcS1pdGVtLWxhYmVsPlxuICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICA8L3EtaXRlbT5cblxuICAgIDxkaXYgdi1lbHNlPlxuICAgICAgPHEtaXRlbSB2LWZvcj1cIihqb2JGYWlsdXJlUmVhc29uLCBpbmRleCkgaW4gcmVzdWx0c1wiIDprZXk9XCJpbmRleFwiPlxuICAgICAgICA8am9iLWZhaWx1cmUtbGlzdC1pdGVtXG4gICAgICAgICAgOmpvYi1mYWlsdXJlPVwiam9iRmFpbHVyZVJlYXNvblwiXG4gICAgICAgID48L2pvYi1mYWlsdXJlLWxpc3QtaXRlbT5cbiAgICAgIDwvcS1pdGVtPlxuICAgIDwvZGl2PlxuICA8L3EtbGlzdD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBjb21wdXRlZCwgZGVmaW5lUHJvcHMsIHJlZiB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQge1xuICBKb2JSdW4sXG4gIFN0YXR1cyxcbiAgQmF0Y2gsXG4gIFRyYWNrZWRKb2IsXG4gIEpvYkZhaWx1cmVSZWFzb24sXG59IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuaW1wb3J0IFN0YXR1c0NvdW50IGZyb20gJ2NvbXBvbmVudHMvU3RhdHVzQ291bnQudnVlJztcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcyc7XG5pbXBvcnQgbG9jYWxpemVkRm9ybWF0IGZyb20gJ2RheWpzL3BsdWdpbi9sb2NhbGl6ZWRGb3JtYXQnO1xuaW1wb3J0IHJlbGF0aXZlVGltZSBmcm9tICdkYXlqcy9wbHVnaW4vcmVsYXRpdmVUaW1lJztcbmltcG9ydCBKb2JGYWlsdXJlTGlzdEl0ZW0gZnJvbSAnY29tcG9uZW50cy9Kb2JGYWlsdXJlTGlzdEl0ZW0udnVlJztcblxuY29uc3QgcmVzdWx0cyA9IHJlZjxKb2JGYWlsdXJlUmVhc29uW10gfCBudWxsPihudWxsKTtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wczx7XG4gIGFsaWFzOiBzdHJpbmc7XG59PigpO1xuXG4vLyB1c2VBcGkoKGFmdGVyKSA9PiB7XG4vLyAgIGFwaVxuLy8gICAgIC5qb2JGYWlsdXJlUmVhc29ucyhwcm9wcy5hbGlhcylcbi8vICAgICAudGhlbigocmVzcG9uc2U6IEpvYkZhaWx1cmVSZWFzb25bXSkgPT4gKHJlc3VsdHMudmFsdWUgPSByZXNwb25zZSkpXG4vLyAgICAgLmZpbmFsbHkoYWZ0ZXIpO1xuLy8gfSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1wYWdlIGNsYXNzPVwianVzdGlmeS1ldmVubHlcIiBwYWRkaW5nIHYtaWY9XCJyZXN1bHRzICE9PSBudWxsXCI+XG4gICAgPHEtYnJlYWRjcnVtYnM+XG4gICAgICA8cS1icmVhZGNydW1icy1lbCBpY29uPVwibGlzdFwiIHRvPVwiL2pvYnNcIiBsYWJlbD1cIkpvYnNcIiAvPlxuICAgICAgPHEtYnJlYWRjcnVtYnMtZWxcbiAgICAgICAgOmxhYmVsPVwicmVzdWx0cy5hbGlhc1wiXG4gICAgICAgIGljb249XCJ2aWV3X3N0cmVhbVwiXG4gICAgICAgIDp0bz1cIicvam9icy8nICsgcmVzdWx0cy5hbGlhc1wiXG4gICAgICAvPlxuICAgIDwvcS1icmVhZGNydW1icz5cblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTIgY29sLXNtLTYgcS1weS1tZFwiPlxuICAgICAgICA8cS1saXN0IGJvcmRlcmVkIHNlcGFyYXRvcj5cbiAgICAgICAgICA8cS1pdGVtIHYtcmlwcGxlXG4gICAgICAgICAgICA+PHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHJlc3VsdHMuYWxpYXMgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPkFsaWFzPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPjwvcS1pdGVtXG4gICAgICAgICAgPlxuICAgICAgICAgIDxxLWl0ZW0gdi1yaXBwbGVcbiAgICAgICAgICAgID48cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgcmVzdWx0cy5jbGFzcyB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+Q2xhc3M8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+PC9xLWl0ZW1cbiAgICAgICAgICA+XG4gICAgICAgIDwvcS1saXN0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTIgY29sLXNtLTYgcS1weS1tZFwiPlxuICAgICAgICA8am9iLWZhaWx1cmUtcmVhc29ucyA6YWxpYXM9XCJwcm9wcy5hbGlhc1wiPjwvam9iLWZhaWx1cmUtcmVhc29ucz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTJcIj5cbiAgICAgICAgPHEtbGlzdCBib3JkZXJlZCBjbGFzcz1cInJvdW5kZWQtYm9yZGVyc1wiIHN0eWxlPVwibWluLXdpZHRoOiA4NSVcIj5cbiAgICAgICAgICA8cS1pdGVtLWxhYmVsIGhlYWRlcj5SdW5zPC9xLWl0ZW0tbGFiZWw+XG5cbiAgICAgICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cbiAgICAgICAgICA8ZGl2IHYtZm9yPVwicnVuIGluIHJlc3VsdHMucnVuc1wiIDprZXk9XCJnZXRIYXNoKHJ1bilcIj5cbiAgICAgICAgICAgIDx0cmFja2VkLXJ1bi1saXN0LWl0ZW0gOnRyYWNrZWQtcnVuPVwicnVuXCI+IDwvdHJhY2tlZC1ydW4tbGlzdC1pdGVtPlxuICAgICAgICAgICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvcS1saXN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvcS1wYWdlPlxuICA8cS1wYWdlIGNsYXNzPVwiaXRlbXMtY2VudGVyIGp1c3RpZnktZXZlbmx5XCIgdi1lbHNlPiBMb2FkaW5nIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7b25CZWZvcmVVbm1vdW50LCBvbk1vdW50ZWQsIHJlZn0gZnJvbSAndnVlJztcbmltcG9ydCBhcGkgZnJvbSAnc3JjL3V0aWxzL2NsaWVudC9hcGknO1xuaW1wb3J0IHsgSm9iUnVuLCBUcmFja2VkSm9iIH0gZnJvbSAnc3JjL3R5cGVzL2FwaSc7XG5pbXBvcnQgVHJhY2tlZFJ1bkxpc3RJdGVtIGZyb20gJ2NvbXBvbmVudHMvVHJhY2tlZFJ1bkxpc3RJdGVtLnZ1ZSc7XG5pbXBvcnQgSm9iRmFpbHVyZVJlYXNvbnMgZnJvbSAnY29tcG9uZW50cy9Kb2JGYWlsdXJlUmVhc29ucy52dWUnO1xuaW1wb3J0IHtjbGllbnR9IGZyb20gXCJsYXJhdmVsLWpvYi1zdGF0dXMtanNcIjtcblxuY29uc3QgcmVzdWx0cyA9IHJlZjxUcmFja2VkSm9iIHwgbnVsbD4obnVsbCk7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8e1xuICBhbGlhczogc3RyaW5nO1xufT4oKTtcblxubGV0IGxpc3RlbmVyID0gY2xpZW50LmpvYnMuc2hvdyhwcm9wcy5hbGlhcylcbiAgLmxpc3RlbigpXG4gIC5vblVwZGF0ZWQobmV3UmVzdWx0cyA9PiByZXN1bHRzLnZhbHVlID0gbmV3UmVzdWx0cylcbiAgLnN0YXJ0KCk7XG5cbm9uQmVmb3JlVW5tb3VudCgoKSA9PiB7XG4gIGxpc3RlbmVyLnN0b3AoKTtcbn0pO1xuXG5mdW5jdGlvbiBnZXRIYXNoKGpvYlJ1bjogSm9iUnVuKTogc3RyaW5nIHtcbiAgcmV0dXJuIGpvYlJ1bi51dWlkO1xufVxuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQ00sVUFBQSxVQUFVLElBQStCLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN1QjdDLFVBQUEsVUFBVSxJQUF1QixJQUFJO0FBTTNDLFFBQUksV0FBVyxPQUFPLEtBQUssS0FBSyxNQUFNLEtBQUssRUFDeEMsT0FBTyxFQUNQLFVBQVUsQ0FBYyxlQUFBLFFBQVEsUUFBUSxVQUFVLEVBQ2xEO0FBRUgsb0JBQWdCLE1BQU07QUFDcEIsZUFBUyxLQUFLO0FBQUEsSUFBQSxDQUNmO0FBRUQsYUFBUyxRQUFRLFFBQXdCO0FBQ3ZDLGFBQU8sT0FBTztBQUFBLElBQ2hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
