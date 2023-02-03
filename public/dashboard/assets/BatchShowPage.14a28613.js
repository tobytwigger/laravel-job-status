import { u as useApi, Q as QBreadcrumbsEl, a as QBreadcrumbs, b as QSeparator } from "./useApi.498595ef.js";
import { c as QItem, Q as QItemSection, b as QItemLabel, d as QList } from "./QItem.efe8ccb9.js";
import { Q as QPage, a as api } from "./api.616de3f3.js";
import { T as TrackedRunListItem } from "./TrackedRunListItem.71ad7e6d.js";
import { d as dayjs } from "./dayjs.min.54da9cde.js";
import { _ as _export_sfc, K as defineComponent, r as ref, c as computed, L as openBlock, M as createBlock, N as withCtx, d as createVNode, R as createBaseVNode, P as createTextVNode, Q as toDisplayString, a0 as unref, S as createElementBlock, U as renderList, F as Fragment } from "./index.2ce80662.js";
import "./use-router-link.d3b03863.js";
import "./render.03bb8eb9.js";
import "./index.aa7156d4.js";
import "./config.83e19d5f.js";
import "./QCircularProgress.3a081134.js";
import "./format.801e7424.js";
import "./QChip.4fb07891.js";
import "./api.9a3f3035.js";
import "./relativeTime.a9f93413.js";
const _hoisted_1 = { class: "row" };
const _hoisted_2 = { class: "col-12 q-py-md" };
const _hoisted_3 = { class: "col-12" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BatchShowPage",
  props: {
    batchId: null
  },
  setup(__props) {
    const props = __props;
    const results = ref(null);
    useApi((after) => {
      api.batchShow(props.batchId).then((response) => results.value = response).finally(after);
    });
    const batchName = computed(() => {
      if (results.value === null) {
        return "Loading";
      }
      if (results.value.name !== null && results.value.name !== "") {
        return results.value.name;
      }
      return "dispatched at " + dayjs(results.value.created_at).format("L LTS");
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
                icon: "list",
                to: "/batch",
                label: "Batches"
              }),
              createVNode(QBreadcrumbsEl, {
                icon: "list",
                to: "/batch/" + props.batchId,
                label: "Batch #" + props.batchId
              }, null, 8, ["to", "label"])
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
                  createVNode(QItem, null, {
                    default: withCtx(() => [
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createVNode(QItemLabel, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(results.value.batch_id), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(QItemLabel, { caption: "" }, {
                            default: withCtx(() => [
                              createTextVNode("Batch ID")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(QItem, null, {
                    default: withCtx(() => [
                      createVNode(QItemSection, null, {
                        default: withCtx(() => [
                          createVNode(QItemLabel, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(batchName)), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(QItemLabel, { caption: "" }, {
                            default: withCtx(() => [
                              createTextVNode("Name")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            createBaseVNode("div", _hoisted_3, [
              createVNode(QList, { class: "rounded-borders q-pa-lg" }, {
                default: withCtx(() => [
                  createVNode(QItemLabel, { header: "" }, {
                    default: withCtx(() => [
                      createTextVNode("Viewing batch '" + toDisplayString(unref(batchName)) + "'", 1)
                    ]),
                    _: 1
                  }),
                  createVNode(QSeparator),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(results.value.runs, (result) => {
                    return openBlock(), createElementBlock("div", {
                      key: result.id
                    }, [
                      createVNode(TrackedRunListItem, { "tracked-run": result }, null, 8, ["tracked-run"]),
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
var BatchShowPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "BatchShowPage.vue"]]);
export { BatchShowPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmF0Y2hTaG93UGFnZS4xNGEyODYxMy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9CYXRjaFNob3dQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJqdXN0aWZ5LWV2ZW5seVwiIHBhZGRpbmcgdi1pZj1cInJlc3VsdHMgIT09IG51bGxcIj5cbiAgICA8cS1icmVhZGNydW1icz5cbiAgICAgIDxxLWJyZWFkY3J1bWJzLWVsIGljb249XCJsaXN0XCIgdG89XCIvYmF0Y2hcIiBsYWJlbD1cIkJhdGNoZXNcIiAvPlxuICAgICAgPHEtYnJlYWRjcnVtYnMtZWxcbiAgICAgICAgaWNvbj1cImxpc3RcIlxuICAgICAgICA6dG89XCInL2JhdGNoLycgKyBwcm9wcy5iYXRjaElkXCJcbiAgICAgICAgOmxhYmVsPVwiJ0JhdGNoICMnICsgcHJvcHMuYmF0Y2hJZFwiXG4gICAgICAvPlxuICAgIDwvcS1icmVhZGNydW1icz5cblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTIgcS1weS1tZFwiPlxuICAgICAgICA8cS1saXN0IGJvcmRlcmVkIHNlcGFyYXRvcj5cbiAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHJlc3VsdHMuYmF0Y2hfaWQgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPkJhdGNoIElEPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgIDwvcS1pdGVtPlxuXG4gICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyBiYXRjaE5hbWUgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPk5hbWU8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgIDwvcS1saXN0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTJcIj5cbiAgICAgICAgPHEtbGlzdCBjbGFzcz1cInJvdW5kZWQtYm9yZGVycyBxLXBhLWxnXCI+XG4gICAgICAgICAgPHEtaXRlbS1sYWJlbCBoZWFkZXI+Vmlld2luZyBiYXRjaCAne3sgYmF0Y2hOYW1lIH19JzwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgIDxxLXNlcGFyYXRvcj48L3Etc2VwYXJhdG9yPlxuXG4gICAgICAgICAgPGRpdiB2LWZvcj1cInJlc3VsdCBpbiByZXN1bHRzLnJ1bnNcIiA6a2V5PVwicmVzdWx0LmlkXCI+XG4gICAgICAgICAgICA8dHJhY2tlZC1ydW4tbGlzdC1pdGVtXG4gICAgICAgICAgICAgIDp0cmFja2VkLXJ1bj1cInJlc3VsdFwiXG4gICAgICAgICAgICA+PC90cmFja2VkLXJ1bi1saXN0LWl0ZW0+XG4gICAgICAgICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWxpc3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9xLXBhZ2U+XG4gIDxxLXBhZ2UgY2xhc3M9XCJpdGVtcy1jZW50ZXIganVzdGlmeS1ldmVubHlcIiB2LWVsc2U+IExvYWRpbmcgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgY29tcHV0ZWQsIHJlZiB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgYXBpIGZyb20gJ3NyYy91dGlscy9jbGllbnQvYXBpJztcbmltcG9ydCB7IEJhdGNoIH0gZnJvbSAnc3JjL3R5cGVzL2FwaSc7XG5pbXBvcnQgVHJhY2tlZEpvYkxpc3RJdGVtIGZyb20gJy4uL2NvbXBvbmVudHMvVHJhY2tlZEpvYkxpc3RJdGVtLnZ1ZSc7XG5pbXBvcnQgeyB1c2VBcGkgfSBmcm9tICcuLi9jb21wb3N0YWJsZXMvdXNlQXBpJztcbmltcG9ydCBCYXRjaExpc3RJdGVtIGZyb20gJ2NvbXBvbmVudHMvQmF0Y2hMaXN0SXRlbS52dWUnO1xuaW1wb3J0IFRyYWNrZWRSdW5MaXN0SXRlbSBmcm9tICdjb21wb25lbnRzL1RyYWNrZWRSdW5MaXN0SXRlbS52dWUnO1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcblxuY29uc3QgcmVzdWx0cyA9IHJlZjxCYXRjaCB8IG51bGw+KG51bGwpO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzPHtcbiAgYmF0Y2hJZDogbnVtYmVyO1xufT4oKTtcblxudXNlQXBpKChhZnRlcikgPT4ge1xuICBhcGlcbiAgICAuYmF0Y2hTaG93KHByb3BzLmJhdGNoSWQpXG4gICAgLnRoZW4oKHJlc3BvbnNlOiBCYXRjaCkgPT4gKHJlc3VsdHMudmFsdWUgPSByZXNwb25zZSkpXG4gICAgLmZpbmFsbHkoYWZ0ZXIpO1xufSk7XG5cbmNvbnN0IGJhdGNoTmFtZSA9IGNvbXB1dGVkKCgpOiBzdHJpbmcgPT4ge1xuICBpZiAocmVzdWx0cy52YWx1ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiAnTG9hZGluZyc7XG4gIH1cbiAgaWYgKHJlc3VsdHMudmFsdWUubmFtZSAhPT0gbnVsbCAmJiByZXN1bHRzLnZhbHVlLm5hbWUgIT09ICcnKSB7XG4gICAgcmV0dXJuIHJlc3VsdHMudmFsdWUubmFtZTtcbiAgfVxuICByZXR1cm4gJ2Rpc3BhdGNoZWQgYXQgJyArIGRheWpzKHJlc3VsdHMudmFsdWUuY3JlYXRlZF9hdCkuZm9ybWF0KCdMIExUUycpO1xufSk7XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMERNLFVBQUEsVUFBVSxJQUFrQixJQUFJO0FBTXRDLFdBQU8sQ0FBQyxVQUFVO0FBQ2hCLFVBQ0csVUFBVSxNQUFNLE9BQU8sRUFDdkIsS0FBSyxDQUFDLGFBQXFCLFFBQVEsUUFBUSxRQUFTLEVBQ3BELFFBQVEsS0FBSztBQUFBLElBQUEsQ0FDakI7QUFFSyxVQUFBLFlBQVksU0FBUyxNQUFjO0FBQ25DLFVBQUEsUUFBUSxVQUFVLE1BQU07QUFDbkIsZUFBQTtBQUFBLE1BQ1Q7QUFDQSxVQUFJLFFBQVEsTUFBTSxTQUFTLFFBQVEsUUFBUSxNQUFNLFNBQVMsSUFBSTtBQUM1RCxlQUFPLFFBQVEsTUFBTTtBQUFBLE1BQ3ZCO0FBQ0EsYUFBTyxtQkFBbUIsTUFBTSxRQUFRLE1BQU0sVUFBVSxFQUFFLE9BQU8sT0FBTztBQUFBLElBQUEsQ0FDekU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
