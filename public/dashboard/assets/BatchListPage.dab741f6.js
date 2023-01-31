import { u as useApi, Q as QBreadcrumbsEl, a as QBreadcrumbs, b as QSeparator } from "./useApi.a916b433.js";
import { Q as QItemSection, b as QItemLabel, c as QItem, d as QList } from "./QItem.d2559d90.js";
import { Q as QPage, a as api } from "./api.d8f10d31.js";
import { Q as QIcon } from "./use-router-link.b59d0f2d.js";
import { S as StatusCount } from "./StatusCount.e374feb6.js";
import { d as dayjs } from "./dayjs.min.54da9cde.js";
import { l as localizedFormat } from "./localizedFormat.518c866f.js";
import { r as relativeTime } from "./relativeTime.a9f93413.js";
import { _ as _export_sfc, K as defineComponent, c as computed, L as openBlock, M as createBlock, N as withCtx, d as createVNode, P as createTextVNode, Q as toDisplayString, a0 as unref, R as createBaseVNode, r as ref, S as createElementBlock, U as renderList, F as Fragment } from "./index.24d2f870.js";
import "./render.a10da10b.js";
import "./index.aa7156d4.js";
import "./config.b6f61684.js";
import "./QAvatar.793dfca6.js";
import "./QChip.c15cdb8a.js";
const _hoisted_1 = { class: "text-weight-medium" };
const _hoisted_2 = { class: "text-grey-8 q-gutter-xs" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BatchListItem",
  props: {
    batch: null
  },
  setup(__props) {
    const props = __props;
    dayjs.extend(relativeTime);
    dayjs.extend(localizedFormat);
    const timeAgo = computed(() => dayjs().to(props.batch.created_at));
    const batchName = computed(() => {
      if (props.batch.name !== null && props.batch.name !== "") {
        return props.batch.name;
      }
      return "Batch dispatched at " + dayjs(props.batch.created_at).format("L LTS");
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QItem, {
        clickable: "",
        to: { path: "/batch/" + props.batch.id }
      }, {
        default: withCtx(() => [
          createVNode(QItemSection, {
            avatar: "",
            top: ""
          }, {
            default: withCtx(() => [
              createVNode(QIcon, {
                name: "group_work",
                color: "black",
                size: "34px"
              })
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
                  createBaseVNode("span", _hoisted_1, toDisplayString(unref(batchName)), 1)
                ]),
                _: 1
              }),
              createVNode(QItemLabel, {
                caption: "",
                lines: "5"
              }, {
                default: withCtx(() => [
                  createVNode(StatusCount, {
                    count: props.batch.queued,
                    label: "Queued",
                    color: "primary"
                  }, null, 8, ["count"]),
                  createVNode(StatusCount, {
                    count: props.batch.started,
                    label: "Running",
                    color: "info"
                  }, null, 8, ["count"]),
                  createVNode(StatusCount, {
                    count: props.batch.cancelled,
                    label: "Cancelled",
                    color: "warning"
                  }, null, 8, ["count"]),
                  createVNode(StatusCount, {
                    count: props.batch.failed,
                    label: "Failed",
                    color: "negative"
                  }, null, 8, ["count"]),
                  createVNode(StatusCount, {
                    count: props.batch.succeeded,
                    label: "Succeeded",
                    color: "positive"
                  }, null, 8, ["count"])
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
var BatchListItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "BatchListItem.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BatchListPage",
  setup(__props) {
    const results = ref(null);
    useApi((after) => {
      api.batchList().then((response) => results.value = response).finally(after);
    });
    function getHash(batch) {
      return batch.batch_id;
    }
    return (_ctx, _cache) => {
      return results.value !== null ? (openBlock(), createBlock(QPage, {
        key: 0,
        class: "justify-evenly"
      }, {
        default: withCtx(() => [
          createVNode(QBreadcrumbs, null, {
            default: withCtx(() => [
              createVNode(QBreadcrumbsEl, {
                icon: "list",
                to: "/batch",
                label: "Batches"
              })
            ]),
            _: 1
          }),
          createVNode(QList, { class: "rounded-borders q-pa-lg" }, {
            default: withCtx(() => [
              createVNode(QItemLabel, { header: "" }, {
                default: withCtx(() => [
                  createTextVNode("All Batches")
                ]),
                _: 1
              }),
              createVNode(QSeparator),
              (openBlock(true), createElementBlock(Fragment, null, renderList(results.value, (result) => {
                return openBlock(), createElementBlock("div", {
                  key: getHash(result)
                }, [
                  createVNode(BatchListItem, { batch: result }, null, 8, ["batch"]),
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
var BatchListPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "BatchListPage.vue"]]);
export { BatchListPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmF0Y2hMaXN0UGFnZS5kYWI3NDFmNi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9jb21wb25lbnRzL0JhdGNoTGlzdEl0ZW0udnVlIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9CYXRjaExpc3RQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWl0ZW0gY2xpY2thYmxlIDp0bz1cIntwYXRoOiAnL2JhdGNoLycgKyBwcm9wcy5iYXRjaC5pZH1cIj5cbiAgICA8cS1pdGVtLXNlY3Rpb24gYXZhdGFyIHRvcD5cbiAgICAgIDxxLWljb24gbmFtZT1cImdyb3VwX3dvcmtcIiBjb2xvcj1cImJsYWNrXCIgc2l6ZT1cIjM0cHhcIiAvPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICA8cS1pdGVtLXNlY3Rpb24gdG9wIGNsYXNzPVwiY29sLTIgZ3Qtc21cIj5cbiAgICAgIDxxLWl0ZW0tbGFiZWwgY2xhc3M9XCJxLW10LXNtXCI+e3sgdGltZUFnbyB9fTwvcS1pdGVtLWxhYmVsPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICA8cS1pdGVtLXNlY3Rpb24gdG9wPlxuICAgICAgPHEtaXRlbS1sYWJlbCBsaW5lcz1cIjFcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXdlaWdodC1tZWRpdW1cIj57eyBiYXRjaE5hbWUgfX08L3NwYW4+XG48IS0tICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZ3JleS04XCI+IC0ge3sgZmluaXNoZWRDb3VudCB9fSBmaW5pc2hlZC48L3NwYW4+LS0+XG4gICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbiBsaW5lcz1cIjVcIj5cbiAgICAgICAgPHN0YXR1cy1jb3VudCA6Y291bnQ9XCJwcm9wcy5iYXRjaC5xdWV1ZWRcIiBsYWJlbD1cIlF1ZXVlZFwiIGNvbG9yPVwicHJpbWFyeVwiPjwvc3RhdHVzLWNvdW50PlxuICAgICAgICA8c3RhdHVzLWNvdW50IDpjb3VudD1cInByb3BzLmJhdGNoLnN0YXJ0ZWRcIiBsYWJlbD1cIlJ1bm5pbmdcIiBjb2xvcj1cImluZm9cIj48L3N0YXR1cy1jb3VudD5cbiAgICAgICAgPHN0YXR1cy1jb3VudCA6Y291bnQ9XCJwcm9wcy5iYXRjaC5jYW5jZWxsZWRcIiBsYWJlbD1cIkNhbmNlbGxlZFwiIGNvbG9yPVwid2FybmluZ1wiPjwvc3RhdHVzLWNvdW50PlxuICAgICAgICA8c3RhdHVzLWNvdW50IDpjb3VudD1cInByb3BzLmJhdGNoLmZhaWxlZFwiIGxhYmVsPVwiRmFpbGVkXCIgY29sb3I9XCJuZWdhdGl2ZVwiPjwvc3RhdHVzLWNvdW50PlxuICAgICAgICA8c3RhdHVzLWNvdW50IDpjb3VudD1cInByb3BzLmJhdGNoLnN1Y2NlZWRlZFwiIGxhYmVsPVwiU3VjY2VlZGVkXCIgY29sb3I9XCJwb3NpdGl2ZVwiPjwvc3RhdHVzLWNvdW50PlxuICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB0b3Agc2lkZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWdyZXktOCBxLWd1dHRlci14c1wiPlxuICAgICAgICA8cS1pY29uIGNsYXNzPVwiZ3QteHNcIiBzaXplPVwiMTJweFwiIGljb249XCJrZXlib2FyZF9hcnJvd19yaWdodFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICA8L3EtaXRlbT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQge2NvbXB1dGVkLCBkZWZpbmVQcm9wc30gZnJvbSAndnVlJztcbmltcG9ydCB7Sm9iUnVuLCBTdGF0dXMsIEJhdGNofSBmcm9tICdzcmMvdHlwZXMvYXBpJztcbmltcG9ydCBTdGF0dXNDb3VudCBmcm9tIFwiY29tcG9uZW50cy9TdGF0dXNDb3VudC52dWVcIjtcbmltcG9ydCBkYXlqcyBmcm9tIFwiZGF5anNcIjtcbmltcG9ydCBsb2NhbGl6ZWRGb3JtYXQgZnJvbSAnZGF5anMvcGx1Z2luL2xvY2FsaXplZEZvcm1hdCc7XG5pbXBvcnQgcmVsYXRpdmVUaW1lIGZyb20gJ2RheWpzL3BsdWdpbi9yZWxhdGl2ZVRpbWUnO1xuXG5kYXlqcy5leHRlbmQocmVsYXRpdmVUaW1lKTtcbmRheWpzLmV4dGVuZChsb2NhbGl6ZWRGb3JtYXQpXG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8e1xuICBiYXRjaDogQmF0Y2hcbn0+KCk7XG5cbmNvbnN0IHRpbWVBZ28gPSBjb21wdXRlZCgoKSA9PiBkYXlqcygpLnRvKHByb3BzLmJhdGNoLmNyZWF0ZWRfYXQpKVxuXG5jb25zdCBiYXRjaE5hbWUgPSBjb21wdXRlZCgoKTogc3RyaW5nID0+IHtcbiAgaWYocHJvcHMuYmF0Y2gubmFtZSAhPT0gbnVsbCAmJiBwcm9wcy5iYXRjaC5uYW1lICE9PSAnJykge1xuICAgIHJldHVybiBwcm9wcy5iYXRjaC5uYW1lO1xuICB9XG4gIHJldHVybiAnQmF0Y2ggZGlzcGF0Y2hlZCBhdCAnICsgZGF5anMocHJvcHMuYmF0Y2guY3JlYXRlZF9hdCkuZm9ybWF0KCdMIExUUycpO1xufSlcblxuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG5cbjwvc3R5bGU+XG4iLCI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJqdXN0aWZ5LWV2ZW5seVwiIHYtaWY9XCJyZXN1bHRzICE9PSBudWxsXCI+XG5cbiAgICA8cS1icmVhZGNydW1icz5cbiAgICAgICAgPHEtYnJlYWRjcnVtYnMtZWwgaWNvbj1cImxpc3RcIiB0bz1cIi9iYXRjaFwiIGxhYmVsPVwiQmF0Y2hlc1wiLz5cbiAgICA8L3EtYnJlYWRjcnVtYnM+XG5cbiAgICA8cS1saXN0IGNsYXNzPVwicm91bmRlZC1ib3JkZXJzIHEtcGEtbGdcIj5cbiAgICAgIDxxLWl0ZW0tbGFiZWwgaGVhZGVyPkFsbCBCYXRjaGVzPC9xLWl0ZW0tbGFiZWw+XG5cbiAgICAgIDxxLXNlcGFyYXRvcj48L3Etc2VwYXJhdG9yPlxuICAgICAgPGRpdiB2LWZvcj1cInJlc3VsdCBpbiByZXN1bHRzXCIgOmtleT1cImdldEhhc2gocmVzdWx0KVwiPlxuICAgICAgICA8YmF0Y2gtbGlzdC1pdGVtIDpiYXRjaD1cInJlc3VsdFwiPjwvYmF0Y2gtbGlzdC1pdGVtPlxuICAgICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1saXN0PlxuXG4gIDwvcS1wYWdlPlxuICA8cS1wYWdlIGNsYXNzPVwiaXRlbXMtY2VudGVyIGp1c3RpZnktZXZlbmx5XCIgdi1lbHNlPlxuICAgIExvYWRpbmdcbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHtyZWZ9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgYXBpIGZyb20gJ3NyYy91dGlscy9jbGllbnQvYXBpJztcbmltcG9ydCB7QmF0Y2h9IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuaW1wb3J0IFRyYWNrZWRKb2JMaXN0SXRlbSBmcm9tIFwiLi4vY29tcG9uZW50cy9UcmFja2VkSm9iTGlzdEl0ZW0udnVlXCI7XG5pbXBvcnQge3VzZUFwaX0gZnJvbSBcIi4uL2NvbXBvc3RhYmxlcy91c2VBcGlcIjtcbmltcG9ydCBCYXRjaExpc3RJdGVtIGZyb20gXCJjb21wb25lbnRzL0JhdGNoTGlzdEl0ZW0udnVlXCI7XG5cbmNvbnN0IHJlc3VsdHMgPSByZWY8QmF0Y2hbXXxudWxsPihudWxsKTtcblxudXNlQXBpKChhZnRlcikgPT4ge1xuICBhcGkuYmF0Y2hMaXN0KClcbiAgICAudGhlbigocmVzcG9uc2U6IEJhdGNoW10pID0+IHJlc3VsdHMudmFsdWUgPSByZXNwb25zZSlcbiAgICAuZmluYWxseShhZnRlcik7XG59KVxuXG5mdW5jdGlvbiBnZXRIYXNoKGJhdGNoOiBCYXRjaCk6IHN0cmluZyB7XG4gIHJldHVybiBiYXRjaC5iYXRjaF9pZDtcbn1cblxuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3Q0EsVUFBTSxPQUFPLFlBQVk7QUFDekIsVUFBTSxPQUFPLGVBQWU7QUFNdEIsVUFBQSxVQUFVLFNBQVMsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLFVBQVUsQ0FBQztBQUUzRCxVQUFBLFlBQVksU0FBUyxNQUFjO0FBQ3ZDLFVBQUcsTUFBTSxNQUFNLFNBQVMsUUFBUSxNQUFNLE1BQU0sU0FBUyxJQUFJO0FBQ3ZELGVBQU8sTUFBTSxNQUFNO0FBQUEsTUFDckI7QUFDQSxhQUFPLHlCQUF5QixNQUFNLE1BQU0sTUFBTSxVQUFVLEVBQUUsT0FBTyxPQUFPO0FBQUEsSUFBQSxDQUM3RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCSyxVQUFBLFVBQVUsSUFBa0IsSUFBSTtBQUV0QyxXQUFPLENBQUMsVUFBVTtBQUNaLFVBQUEsVUFBQSxFQUNELEtBQUssQ0FBQyxhQUFzQixRQUFRLFFBQVEsUUFBUSxFQUNwRCxRQUFRLEtBQUs7QUFBQSxJQUFBLENBQ2pCO0FBRUQsYUFBUyxRQUFRLE9BQXNCO0FBQ3JDLGFBQU8sTUFBTTtBQUFBLElBQ2Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
