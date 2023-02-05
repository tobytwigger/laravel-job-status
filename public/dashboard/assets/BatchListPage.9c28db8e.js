import { c as client, Q as QBreadcrumbsEl, a as QBreadcrumbs, b as QSeparator } from "./index.203c0d01.js";
import { Q as QItemSection, b as QItemLabel, c as QItem, d as QList } from "./QItem.8ac5cbd8.js";
import { Q as QPage } from "./QPage.e0997bbf.js";
import { Q as QIcon } from "./use-router-link.52590381.js";
import { S as StatusCount } from "./StatusCount.306e4be2.js";
import { d as dayjs } from "./dayjs.min.8673fdcc.js";
import { l as localizedFormat } from "./localizedFormat.800a6e1e.js";
import { r as relativeTime } from "./relativeTime.6a491d53.js";
import { _ as _export_sfc, K as defineComponent, c as computed, L as openBlock, M as createBlock, N as withCtx, d as createVNode, P as createTextVNode, Q as toDisplayString, a0 as unref, R as createBaseVNode, r as ref, k as onBeforeUnmount, S as createElementBlock, U as renderList, F as Fragment } from "./index.9f6f356f.js";
import "./render.060e8dc4.js";
import "./index.b7f28e66.js";
import "./QAvatar.30bd604f.js";
import "./QChip.a459c4af.js";
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
    let listener = client.batches.search().listen().onUpdated((newResults) => results.value = newResults).start();
    onBeforeUnmount(() => {
      listener.stop();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmF0Y2hMaXN0UGFnZS45YzI4ZGI4ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9jb21wb25lbnRzL0JhdGNoTGlzdEl0ZW0udnVlIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9CYXRjaExpc3RQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWl0ZW0gY2xpY2thYmxlIDp0bz1cInsgcGF0aDogJy9iYXRjaC8nICsgcHJvcHMuYmF0Y2guaWQgfVwiPlxuICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXIgdG9wPlxuICAgICAgPHEtaWNvbiBuYW1lPVwiZ3JvdXBfd29ya1wiIGNvbG9yPVwiYmxhY2tcIiBzaXplPVwiMzRweFwiIC8+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB0b3AgY2xhc3M9XCJjb2wtMiBndC1zbVwiPlxuICAgICAgPHEtaXRlbS1sYWJlbCBjbGFzcz1cInEtbXQtc21cIj57eyB0aW1lQWdvIH19PC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB0b3A+XG4gICAgICA8cS1pdGVtLWxhYmVsIGxpbmVzPVwiMVwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtd2VpZ2h0LW1lZGl1bVwiPnt7IGJhdGNoTmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgPCEtLSAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWdyZXktOFwiPiAtIHt7IGZpbmlzaGVkQ291bnQgfX0gZmluaXNoZWQuPC9zcGFuPi0tPlxuICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24gbGluZXM9XCI1XCI+XG4gICAgICAgIDxzdGF0dXMtY291bnRcbiAgICAgICAgICA6Y291bnQ9XCJwcm9wcy5iYXRjaC5xdWV1ZWRcIlxuICAgICAgICAgIGxhYmVsPVwiUXVldWVkXCJcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIlxuICAgICAgICA+PC9zdGF0dXMtY291bnQ+XG4gICAgICAgIDxzdGF0dXMtY291bnRcbiAgICAgICAgICA6Y291bnQ9XCJwcm9wcy5iYXRjaC5zdGFydGVkXCJcbiAgICAgICAgICBsYWJlbD1cIlJ1bm5pbmdcIlxuICAgICAgICAgIGNvbG9yPVwiaW5mb1wiXG4gICAgICAgID48L3N0YXR1cy1jb3VudD5cbiAgICAgICAgPHN0YXR1cy1jb3VudFxuICAgICAgICAgIDpjb3VudD1cInByb3BzLmJhdGNoLmNhbmNlbGxlZFwiXG4gICAgICAgICAgbGFiZWw9XCJDYW5jZWxsZWRcIlxuICAgICAgICAgIGNvbG9yPVwid2FybmluZ1wiXG4gICAgICAgID48L3N0YXR1cy1jb3VudD5cbiAgICAgICAgPHN0YXR1cy1jb3VudFxuICAgICAgICAgIDpjb3VudD1cInByb3BzLmJhdGNoLmZhaWxlZFwiXG4gICAgICAgICAgbGFiZWw9XCJGYWlsZWRcIlxuICAgICAgICAgIGNvbG9yPVwibmVnYXRpdmVcIlxuICAgICAgICA+PC9zdGF0dXMtY291bnQ+XG4gICAgICAgIDxzdGF0dXMtY291bnRcbiAgICAgICAgICA6Y291bnQ9XCJwcm9wcy5iYXRjaC5zdWNjZWVkZWRcIlxuICAgICAgICAgIGxhYmVsPVwiU3VjY2VlZGVkXCJcbiAgICAgICAgICBjb2xvcj1cInBvc2l0aXZlXCJcbiAgICAgICAgPjwvc3RhdHVzLWNvdW50PlxuICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB0b3Agc2lkZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWdyZXktOCBxLWd1dHRlci14c1wiPlxuICAgICAgICA8cS1pY29uIGNsYXNzPVwiZ3QteHNcIiBzaXplPVwiMTJweFwiIGljb249XCJrZXlib2FyZF9hcnJvd19yaWdodFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICA8L3EtaXRlbT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBjb21wdXRlZCwgZGVmaW5lUHJvcHMgfSBmcm9tICd2dWUnO1xuaW1wb3J0IFN0YXR1c0NvdW50IGZyb20gJ2NvbXBvbmVudHMvU3RhdHVzQ291bnQudnVlJztcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcyc7XG5pbXBvcnQgbG9jYWxpemVkRm9ybWF0IGZyb20gJ2RheWpzL3BsdWdpbi9sb2NhbGl6ZWRGb3JtYXQnO1xuaW1wb3J0IHJlbGF0aXZlVGltZSBmcm9tICdkYXlqcy9wbHVnaW4vcmVsYXRpdmVUaW1lJztcbmltcG9ydCB7QmF0Y2h9IGZyb20gXCJzcmMvdHlwZXMvYXBpXCI7XG5cbmRheWpzLmV4dGVuZChyZWxhdGl2ZVRpbWUpO1xuZGF5anMuZXh0ZW5kKGxvY2FsaXplZEZvcm1hdCk7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8e1xuICBiYXRjaDogQmF0Y2g7XG59PigpO1xuXG5jb25zdCB0aW1lQWdvID0gY29tcHV0ZWQoKCkgPT4gZGF5anMoKS50byhwcm9wcy5iYXRjaC5jcmVhdGVkX2F0KSk7XG5cbmNvbnN0IGJhdGNoTmFtZSA9IGNvbXB1dGVkKCgpOiBzdHJpbmcgPT4ge1xuICBpZiAocHJvcHMuYmF0Y2gubmFtZSAhPT0gbnVsbCAmJiBwcm9wcy5iYXRjaC5uYW1lICE9PSAnJykge1xuICAgIHJldHVybiBwcm9wcy5iYXRjaC5uYW1lO1xuICB9XG4gIHJldHVybiAnQmF0Y2ggZGlzcGF0Y2hlZCBhdCAnICsgZGF5anMocHJvcHMuYmF0Y2guY3JlYXRlZF9hdCkuZm9ybWF0KCdMIExUUycpO1xufSk7XG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1wYWdlIGNsYXNzPVwianVzdGlmeS1ldmVubHlcIiB2LWlmPVwicmVzdWx0cyAhPT0gbnVsbFwiPlxuICAgIDxxLWJyZWFkY3J1bWJzPlxuICAgICAgPHEtYnJlYWRjcnVtYnMtZWwgaWNvbj1cImxpc3RcIiB0bz1cIi9iYXRjaFwiIGxhYmVsPVwiQmF0Y2hlc1wiIC8+XG4gICAgPC9xLWJyZWFkY3J1bWJzPlxuXG4gICAgPHEtbGlzdCBjbGFzcz1cInJvdW5kZWQtYm9yZGVycyBxLXBhLWxnXCI+XG4gICAgICA8cS1pdGVtLWxhYmVsIGhlYWRlcj5BbGwgQmF0Y2hlczwvcS1pdGVtLWxhYmVsPlxuXG4gICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cbiAgICAgIDxkaXYgdi1mb3I9XCJyZXN1bHQgaW4gcmVzdWx0c1wiIDprZXk9XCJnZXRIYXNoKHJlc3VsdClcIj5cbiAgICAgICAgPGJhdGNoLWxpc3QtaXRlbSA6YmF0Y2g9XCJyZXN1bHRcIj48L2JhdGNoLWxpc3QtaXRlbT5cbiAgICAgICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtbGlzdD5cbiAgPC9xLXBhZ2U+XG4gIDxxLXBhZ2UgY2xhc3M9XCJpdGVtcy1jZW50ZXIganVzdGlmeS1ldmVubHlcIiB2LWVsc2U+IExvYWRpbmcgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHtvbkJlZm9yZVVubW91bnQsIHJlZn0gZnJvbSAndnVlJztcbmltcG9ydCBhcGkgZnJvbSAnc3JjL3V0aWxzL2NsaWVudC9hcGknO1xuaW1wb3J0IHsgQmF0Y2ggfSBmcm9tICdzcmMvdHlwZXMvYXBpJztcbmltcG9ydCBUcmFja2VkSm9iTGlzdEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9UcmFja2VkSm9iTGlzdEl0ZW0udnVlJztcbmltcG9ydCBCYXRjaExpc3RJdGVtIGZyb20gJ2NvbXBvbmVudHMvQmF0Y2hMaXN0SXRlbS52dWUnO1xuaW1wb3J0IHtjbGllbnR9IGZyb20gXCJsYXJhdmVsLWpvYi1zdGF0dXMtanNcIjtcblxuY29uc3QgcmVzdWx0cyA9IHJlZjxCYXRjaFtdIHwgbnVsbD4obnVsbCk7XG5cbmxldCBsaXN0ZW5lciA9IGNsaWVudC5iYXRjaGVzLnNlYXJjaCgpXG4gIC5saXN0ZW4oKVxuICAub25VcGRhdGVkKG5ld1Jlc3VsdHMgPT4gcmVzdWx0cy52YWx1ZSA9IG5ld1Jlc3VsdHMpXG4gIC5zdGFydCgpO1xuXG5vbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICBsaXN0ZW5lci5zdG9wKCk7XG59KTtcblxuZnVuY3Rpb24gZ2V0SGFzaChiYXRjaDogQmF0Y2gpOiBzdHJpbmcge1xuICByZXR1cm4gYmF0Y2guYmF0Y2hfaWQ7XG59XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNERBLFVBQU0sT0FBTyxZQUFZO0FBQ3pCLFVBQU0sT0FBTyxlQUFlO0FBTXRCLFVBQUEsVUFBVSxTQUFTLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxVQUFVLENBQUM7QUFFM0QsVUFBQSxZQUFZLFNBQVMsTUFBYztBQUN2QyxVQUFJLE1BQU0sTUFBTSxTQUFTLFFBQVEsTUFBTSxNQUFNLFNBQVMsSUFBSTtBQUN4RCxlQUFPLE1BQU0sTUFBTTtBQUFBLE1BQ3JCO0FBQ0EsYUFBTyx5QkFBeUIsTUFBTSxNQUFNLE1BQU0sVUFBVSxFQUFFLE9BQU8sT0FBTztBQUFBLElBQUEsQ0FDN0U7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ0ssVUFBQSxVQUFVLElBQW9CLElBQUk7QUFFeEMsUUFBSSxXQUFXLE9BQU8sUUFBUSxPQUFBLEVBQzNCLE9BQ0EsRUFBQSxVQUFVLENBQWMsZUFBQSxRQUFRLFFBQVEsVUFBVSxFQUNsRCxNQUFNO0FBRVQsb0JBQWdCLE1BQU07QUFDcEIsZUFBUyxLQUFLO0FBQUEsSUFBQSxDQUNmO0FBRUQsYUFBUyxRQUFRLE9BQXNCO0FBQ3JDLGFBQU8sTUFBTTtBQUFBLElBQ2Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
