import { u as useApi, Q as QBreadcrumbsEl, a as QBreadcrumbs, b as QSeparator } from "./useApi.a916b433.js";
import { c as QItem, Q as QItemSection, b as QItemLabel, d as QList } from "./QItem.d2559d90.js";
import { Q as QPage, a as api } from "./api.d8f10d31.js";
import { T as TrackedRunListItem } from "./TrackedRunListItem.a048fb66.js";
import { d as dayjs } from "./dayjs.min.54da9cde.js";
import { _ as _export_sfc, K as defineComponent, r as ref, c as computed, L as openBlock, M as createBlock, N as withCtx, d as createVNode, R as createBaseVNode, P as createTextVNode, Q as toDisplayString, a0 as unref, S as createElementBlock, U as renderList, F as Fragment } from "./index.24d2f870.js";
import "./use-router-link.b59d0f2d.js";
import "./render.a10da10b.js";
import "./index.aa7156d4.js";
import "./config.b6f61684.js";
import "./QCircularProgress.0f46e564.js";
import "./format.801e7424.js";
import "./QChip.c15cdb8a.js";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmF0Y2hTaG93UGFnZS5kOTg3OWI1Zi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9CYXRjaFNob3dQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJqdXN0aWZ5LWV2ZW5seVwiIHBhZGRpbmcgdi1pZj1cInJlc3VsdHMgIT09IG51bGxcIj5cblxuICAgIDxxLWJyZWFkY3J1bWJzPlxuICAgICAgPHEtYnJlYWRjcnVtYnMtZWwgaWNvbj1cImxpc3RcIiB0bz1cIi9iYXRjaFwiIGxhYmVsPVwiQmF0Y2hlc1wiLz5cbiAgICAgIDxxLWJyZWFkY3J1bWJzLWVsIGljb249XCJsaXN0XCIgOnRvPVwiJy9iYXRjaC8nICsgcHJvcHMuYmF0Y2hJZFwiIDpsYWJlbD1cIidCYXRjaCAjJyArIHByb3BzLmJhdGNoSWRcIi8+XG4gICAgPC9xLWJyZWFkY3J1bWJzPlxuXG4gICAgPGRpdiBjbGFzcz1cInJvd1wiPlxuICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMiBxLXB5LW1kXCI+XG4gICAgICAgIDxxLWxpc3QgYm9yZGVyZWQgc2VwYXJhdG9yPlxuICAgICAgICAgIDxxLWl0ZW0+XG4gICAgICAgICAgICA8cS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgICAgIDxxLWl0ZW0tbGFiZWw+e3sgcmVzdWx0cy5iYXRjaF9pZCB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+QmF0Y2ggSUQ8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWl0ZW0+XG5cbiAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IGJhdGNoTmFtZSB9fTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24+TmFtZTwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICA8L3EtaXRlbT5cbiAgICAgICAgPC9xLWxpc3Q+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzcz1cImNvbC0xMlwiPlxuICAgICAgICA8cS1saXN0IGNsYXNzPVwicm91bmRlZC1ib3JkZXJzIHEtcGEtbGdcIj5cbiAgICAgICAgICA8cS1pdGVtLWxhYmVsIGhlYWRlcj5WaWV3aW5nIGJhdGNoICd7eyBiYXRjaE5hbWUgfX0nPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XG5cbiAgICAgICAgICA8ZGl2IHYtZm9yPVwicmVzdWx0IGluIHJlc3VsdHMucnVuc1wiIDprZXk9XCJyZXN1bHQuaWRcIj5cbiAgICAgICAgICAgIDx0cmFja2VkLXJ1bi1saXN0LWl0ZW0gOnRyYWNrZWQtcnVuPVwicmVzdWx0XCI+PC90cmFja2VkLXJ1bi1saXN0LWl0ZW0+XG4gICAgICAgICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWxpc3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuXG4gIDwvcS1wYWdlPlxuICA8cS1wYWdlIGNsYXNzPVwiaXRlbXMtY2VudGVyIGp1c3RpZnktZXZlbmx5XCIgdi1lbHNlPlxuICAgIExvYWRpbmdcbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHtjb21wdXRlZCwgcmVmfSBmcm9tICd2dWUnO1xuaW1wb3J0IGFwaSBmcm9tICdzcmMvdXRpbHMvY2xpZW50L2FwaSc7XG5pbXBvcnQge0JhdGNofSBmcm9tICdzcmMvdHlwZXMvYXBpJztcbmltcG9ydCBUcmFja2VkSm9iTGlzdEl0ZW0gZnJvbSBcIi4uL2NvbXBvbmVudHMvVHJhY2tlZEpvYkxpc3RJdGVtLnZ1ZVwiO1xuaW1wb3J0IHt1c2VBcGl9IGZyb20gXCIuLi9jb21wb3N0YWJsZXMvdXNlQXBpXCI7XG5pbXBvcnQgQmF0Y2hMaXN0SXRlbSBmcm9tIFwiY29tcG9uZW50cy9CYXRjaExpc3RJdGVtLnZ1ZVwiO1xuaW1wb3J0IFRyYWNrZWRSdW5MaXN0SXRlbSBmcm9tIFwiY29tcG9uZW50cy9UcmFja2VkUnVuTGlzdEl0ZW0udnVlXCI7XG5pbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5cbmNvbnN0IHJlc3VsdHMgPSByZWY8QmF0Y2ggfCBudWxsPihudWxsKTtcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wczx7XG4gIGJhdGNoSWQ6IG51bWJlclxufT4oKTtcblxudXNlQXBpKChhZnRlcikgPT4ge1xuICBhcGkuYmF0Y2hTaG93KHByb3BzLmJhdGNoSWQpXG4gICAgLnRoZW4oKHJlc3BvbnNlOiBCYXRjaCkgPT4gcmVzdWx0cy52YWx1ZSA9IHJlc3BvbnNlKVxuICAgIC5maW5hbGx5KGFmdGVyKTtcbn0pXG5cbmNvbnN0IGJhdGNoTmFtZSA9IGNvbXB1dGVkKCgpOiBzdHJpbmcgPT4ge1xuICBpZiAocmVzdWx0cy52YWx1ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiAnTG9hZGluZydcbiAgfVxuICBpZiAocmVzdWx0cy52YWx1ZS5uYW1lICE9PSBudWxsICYmIHJlc3VsdHMudmFsdWUubmFtZSAhPT0gJycpIHtcbiAgICByZXR1cm4gcmVzdWx0cy52YWx1ZS5uYW1lO1xuICB9XG4gIHJldHVybiAnZGlzcGF0Y2hlZCBhdCAnICsgZGF5anMocmVzdWx0cy52YWx1ZS5jcmVhdGVkX2F0KS5mb3JtYXQoJ0wgTFRTJyk7XG59KVxuXG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeURNLFVBQUEsVUFBVSxJQUFrQixJQUFJO0FBTXRDLFdBQU8sQ0FBQyxVQUFVO0FBQ2hCLFVBQUksVUFBVSxNQUFNLE9BQU8sRUFDeEIsS0FBSyxDQUFDLGFBQW9CLFFBQVEsUUFBUSxRQUFRLEVBQ2xELFFBQVEsS0FBSztBQUFBLElBQUEsQ0FDakI7QUFFSyxVQUFBLFlBQVksU0FBUyxNQUFjO0FBQ25DLFVBQUEsUUFBUSxVQUFVLE1BQU07QUFDbkIsZUFBQTtBQUFBLE1BQ1Q7QUFDQSxVQUFJLFFBQVEsTUFBTSxTQUFTLFFBQVEsUUFBUSxNQUFNLFNBQVMsSUFBSTtBQUM1RCxlQUFPLFFBQVEsTUFBTTtBQUFBLE1BQ3ZCO0FBQ0EsYUFBTyxtQkFBbUIsTUFBTSxRQUFRLE1BQU0sVUFBVSxFQUFFLE9BQU8sT0FBTztBQUFBLElBQUEsQ0FDekU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
