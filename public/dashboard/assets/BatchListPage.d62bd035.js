import { u as useApi, Q as QBreadcrumbsEl, a as QBreadcrumbs, b as QSeparator } from "./useApi.498595ef.js";
import { Q as QItemSection, b as QItemLabel, c as QItem, d as QList } from "./QItem.efe8ccb9.js";
import { Q as QPage, a as api } from "./api.616de3f3.js";
import { Q as QIcon } from "./use-router-link.d3b03863.js";
import { S as StatusCount } from "./StatusCount.67507670.js";
import { d as dayjs } from "./dayjs.min.54da9cde.js";
import { l as localizedFormat } from "./localizedFormat.518c866f.js";
import { r as relativeTime } from "./relativeTime.a9f93413.js";
import { _ as _export_sfc, K as defineComponent, c as computed, L as openBlock, M as createBlock, N as withCtx, d as createVNode, P as createTextVNode, Q as toDisplayString, a0 as unref, R as createBaseVNode, r as ref, S as createElementBlock, U as renderList, F as Fragment } from "./index.2ce80662.js";
import "./render.03bb8eb9.js";
import "./index.aa7156d4.js";
import "./config.83e19d5f.js";
import "./QAvatar.be6ee61e.js";
import "./QChip.4fb07891.js";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmF0Y2hMaXN0UGFnZS5kNjJiZDAzNS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9jb21wb25lbnRzL0JhdGNoTGlzdEl0ZW0udnVlIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9CYXRjaExpc3RQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWl0ZW0gY2xpY2thYmxlIDp0bz1cInsgcGF0aDogJy9iYXRjaC8nICsgcHJvcHMuYmF0Y2guaWQgfVwiPlxuICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXIgdG9wPlxuICAgICAgPHEtaWNvbiBuYW1lPVwiZ3JvdXBfd29ya1wiIGNvbG9yPVwiYmxhY2tcIiBzaXplPVwiMzRweFwiIC8+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB0b3AgY2xhc3M9XCJjb2wtMiBndC1zbVwiPlxuICAgICAgPHEtaXRlbS1sYWJlbCBjbGFzcz1cInEtbXQtc21cIj57eyB0aW1lQWdvIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB0b3A+XG4gICAgICA8cS1pdGVtLWxhYmVsIGxpbmVzPVwiMVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtd2VpZ2h0LW1lZGl1bVwiPnt7IGJhdGNoTmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgPCEtLSAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWdyZXktOFwiPiAtIHt7IGZpbmlzaGVkQ291bnQgfX0gZmluaXNoZWQuPC9zcGFuPi0tPlxuICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24gbGluZXM9XCI1XCI+XG4gICAgICAgIDxzdGF0dXMtY291bnRcbiAgICAgICAgICA6Y291bnQ9XCJwcm9wcy5iYXRjaC5xdWV1ZWRcIlxuICAgICAgICAgIGxhYmVsPVwiUXVldWVkXCJcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICA+PC9zdGF0dXMtY291bnQ+XG4gICAgICAgIDxzdGF0dXMtY291bnRcbiAgICAgICAgICA6Y291bnQ9XCJwcm9wcy5iYXRjaC5zdGFydGVkXCJcbiAgICAgICAgICBsYWJlbD1cIlJ1bm5pbmdcIlxuICAgICAgICAgIGNvbG9yPVwiaW5mb1wiXG4gICAgICAgID48L3N0YXR1cy1jb3VudD5cbiAgICAgICAgPHN0YXR1cy1jb3VudFxuICAgICAgICAgIDpjb3VudD1cInByb3BzLmJhdGNoLmNhbmNlbGxlZFwiXG4gICAgICAgICAgbGFiZWw9XCJDYW5jZWxsZWRcIlxuICAgICAgICAgIGNvbG9yPVwid2FybmluZ1wiXG4gICAgICAgID48L3N0YXR1cy1jb3VudD5cbiAgICAgICAgPHN0YXR1cy1jb3VudFxuICAgICAgICAgIDpjb3VudD1cInByb3BzLmJhdGNoLmZhaWxlZFwiXG4gICAgICAgICAgbGFiZWw9XCJGYWlsZWRcIlxuICAgICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgICAgICA+PC9zdGF0dXMtY291bnQ+XG4gICAgICAgIDxzdGF0dXMtY291bnRcbiAgICAgICAgICA6Y291bnQ9XCJwcm9wcy5iYXRjaC5zdWNjZWVkZWRcIlxuICAgICAgICAgIGxhYmVsPVwiU3VjY2VlZGVkXCJcbiAgICAgICAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICAgICAgPjwvc3RhdHVzLWNvdW50PlxuICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB0b3Agc2lkZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWdyZXktOCBxLWd1dHRlci14c1wiPlxuICAgICAgICA8cS1pY29uIGNsYXNzPVwiZ3QteHNcIiBzaXplPVwiMTJweFwiIGljb249XCJrZXlib2FyZF9hcnJvd19yaWdodFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICA8L3EtaXRlbT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBjb21wdXRlZCwgZGVmaW5lUHJvcHMgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgSm9iUnVuLCBTdGF0dXMsIEJhdGNoIH0gZnJvbSAnc3JjL3R5cGVzL2FwaSc7XG5pbXBvcnQgU3RhdHVzQ291bnQgZnJvbSAnY29tcG9uZW50cy9TdGF0dXNDb3VudC52dWUnO1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcbmltcG9ydCBsb2NhbGl6ZWRGb3JtYXQgZnJvbSAnZGF5anMvcGx1Z2luL2xvY2FsaXplZEZvcm1hdCc7XG5pbXBvcnQgcmVsYXRpdmVUaW1lIGZyb20gJ2RheWpzL3BsdWdpbi9yZWxhdGl2ZVRpbWUnO1xuXG5kYXlqcy5leHRlbmQocmVsYXRpdmVUaW1lKTtcbmRheWpzLmV4dGVuZChsb2NhbGl6ZWRGb3JtYXQpO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzPHtcbiAgYmF0Y2g6IEJhdGNoO1xufT4oKTtcblxuY29uc3QgdGltZUFnbyA9IGNvbXB1dGVkKCgpID0+IGRheWpzKCkudG8ocHJvcHMuYmF0Y2guY3JlYXRlZF9hdCkpO1xuXG5jb25zdCBiYXRjaE5hbWUgPSBjb21wdXRlZCgoKTogc3RyaW5nID0+IHtcbiAgaWYgKHByb3BzLmJhdGNoLm5hbWUgIT09IG51bGwgJiYgcHJvcHMuYmF0Y2gubmFtZSAhPT0gJycpIHtcbiAgICByZXR1cm4gcHJvcHMuYmF0Y2gubmFtZTtcbiAgfVxuICByZXR1cm4gJ0JhdGNoIGRpc3BhdGNoZWQgYXQgJyArIGRheWpzKHByb3BzLmJhdGNoLmNyZWF0ZWRfYXQpLmZvcm1hdCgnTCBMVFMnKTtcbn0pO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+PC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cImp1c3RpZnktZXZlbmx5XCIgdi1pZj1cInJlc3VsdHMgIT09IG51bGxcIj5cbiAgICA8cS1icmVhZGNydW1icz5cbiAgICAgIDxxLWJyZWFkY3J1bWJzLWVsIGljb249XCJsaXN0XCIgdG89XCIvYmF0Y2hcIiBsYWJlbD1cIkJhdGNoZXNcIiAvPlxuICAgIDwvcS1icmVhZGNydW1icz5cblxuICAgIDxxLWxpc3QgY2xhc3M9XCJyb3VuZGVkLWJvcmRlcnMgcS1wYS1sZ1wiPlxuICAgICAgPHEtaXRlbS1sYWJlbCBoZWFkZXI+QWxsIEJhdGNoZXM8L3EtaXRlbS1sYWJlbD5cblxuICAgICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XG4gICAgICA8ZGl2IHYtZm9yPVwicmVzdWx0IGluIHJlc3VsdHNcIiA6a2V5PVwiZ2V0SGFzaChyZXN1bHQpXCI+XG4gICAgICAgIDxiYXRjaC1saXN0LWl0ZW0gOmJhdGNoPVwicmVzdWx0XCI+PC9iYXRjaC1saXN0LWl0ZW0+XG4gICAgICAgIDxxLXNlcGFyYXRvcj48L3Etc2VwYXJhdG9yPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWxpc3Q+XG4gIDwvcS1wYWdlPlxuICA8cS1wYWdlIGNsYXNzPVwiaXRlbXMtY2VudGVyIGp1c3RpZnktZXZlbmx5XCIgdi1lbHNlPiBMb2FkaW5nIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgYXBpIGZyb20gJ3NyYy91dGlscy9jbGllbnQvYXBpJztcbmltcG9ydCB7IEJhdGNoIH0gZnJvbSAnc3JjL3R5cGVzL2FwaSc7XG5pbXBvcnQgVHJhY2tlZEpvYkxpc3RJdGVtIGZyb20gJy4uL2NvbXBvbmVudHMvVHJhY2tlZEpvYkxpc3RJdGVtLnZ1ZSc7XG5pbXBvcnQgeyB1c2VBcGkgfSBmcm9tICcuLi9jb21wb3N0YWJsZXMvdXNlQXBpJztcbmltcG9ydCBCYXRjaExpc3RJdGVtIGZyb20gJ2NvbXBvbmVudHMvQmF0Y2hMaXN0SXRlbS52dWUnO1xuXG5jb25zdCByZXN1bHRzID0gcmVmPEJhdGNoW10gfCBudWxsPihudWxsKTtcblxudXNlQXBpKChhZnRlcikgPT4ge1xuICBhcGlcbiAgICAuYmF0Y2hMaXN0KClcbiAgICAudGhlbigocmVzcG9uc2U6IEJhdGNoW10pID0+IChyZXN1bHRzLnZhbHVlID0gcmVzcG9uc2UpKVxuICAgIC5maW5hbGx5KGFmdGVyKTtcbn0pO1xuXG5mdW5jdGlvbiBnZXRIYXNoKGJhdGNoOiBCYXRjaCk6IHN0cmluZyB7XG4gIHJldHVybiBiYXRjaC5iYXRjaF9pZDtcbn1cbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNERBLFVBQU0sT0FBTyxZQUFZO0FBQ3pCLFVBQU0sT0FBTyxlQUFlO0FBTXRCLFVBQUEsVUFBVSxTQUFTLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxVQUFVLENBQUM7QUFFM0QsVUFBQSxZQUFZLFNBQVMsTUFBYztBQUN2QyxVQUFJLE1BQU0sTUFBTSxTQUFTLFFBQVEsTUFBTSxNQUFNLFNBQVMsSUFBSTtBQUN4RCxlQUFPLE1BQU0sTUFBTTtBQUFBLE1BQ3JCO0FBQ0EsYUFBTyx5QkFBeUIsTUFBTSxNQUFNLE1BQU0sVUFBVSxFQUFFLE9BQU8sT0FBTztBQUFBLElBQUEsQ0FDN0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ0ssVUFBQSxVQUFVLElBQW9CLElBQUk7QUFFeEMsV0FBTyxDQUFDLFVBQVU7QUFFYixVQUFBLFVBQUEsRUFDQSxLQUFLLENBQUMsYUFBdUIsUUFBUSxRQUFRLFFBQVMsRUFDdEQsUUFBUSxLQUFLO0FBQUEsSUFBQSxDQUNqQjtBQUVELGFBQVMsUUFBUSxPQUFzQjtBQUNyQyxhQUFPLE1BQU07QUFBQSxJQUNmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
