import { c as client, Q as QBreadcrumbsEl, a as QBreadcrumbs, b as QSeparator } from "./index.203c0d01.js";
import { c as QItem, Q as QItemSection, b as QItemLabel, d as QList } from "./QItem.8ac5cbd8.js";
import { Q as QPage } from "./QPage.e0997bbf.js";
import { T as TrackedRunListItem } from "./TrackedRunListItem.2d9fda8b.js";
import { d as dayjs } from "./dayjs.min.8673fdcc.js";
import { _ as _export_sfc, K as defineComponent, r as ref, k as onBeforeUnmount, c as computed, L as openBlock, M as createBlock, N as withCtx, d as createVNode, R as createBaseVNode, P as createTextVNode, Q as toDisplayString, a0 as unref, S as createElementBlock, U as renderList, F as Fragment } from "./index.9f6f356f.js";
import "./use-router-link.52590381.js";
import "./render.060e8dc4.js";
import "./index.b7f28e66.js";
import "./QCircularProgress.1dce0d41.js";
import "./format.801e7424.js";
import "./QChip.a459c4af.js";
import "./api.9a3f3035.js";
import "./relativeTime.6a491d53.js";
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
    let listener = client.batches.show(props.batchId).listen().onUpdated((newResults) => results.value = newResults).start();
    onBeforeUnmount(() => {
      listener.stop();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmF0Y2hTaG93UGFnZS40OGYxYWZhMC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9CYXRjaFNob3dQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJqdXN0aWZ5LWV2ZW5seVwiIHBhZGRpbmcgdi1pZj1cInJlc3VsdHMgIT09IG51bGxcIj5cbiAgICA8cS1icmVhZGNydW1icz5cbiAgICAgIDxxLWJyZWFkY3J1bWJzLWVsIGljb249XCJsaXN0XCIgdG89XCIvYmF0Y2hcIiBsYWJlbD1cIkJhdGNoZXNcIiAvPlxuICAgICAgPHEtYnJlYWRjcnVtYnMtZWxcbiAgICAgICAgaWNvbj1cImxpc3RcIlxuICAgICAgICA6dG89XCInL2JhdGNoLycgKyBwcm9wcy5iYXRjaElkXCJcbiAgICAgICAgOmxhYmVsPVwiJ0JhdGNoICMnICsgcHJvcHMuYmF0Y2hJZFwiXG4gICAgICAvPlxuICAgIDwvcS1icmVhZGNydW1icz5cblxuICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTIgcS1weS1tZFwiPlxuICAgICAgICA8cS1saXN0IGJvcmRlcmVkIHNlcGFyYXRvcj5cbiAgICAgICAgICA8cS1pdGVtPlxuICAgICAgICAgICAgPHEtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgICAgICA8cS1pdGVtLWxhYmVsPnt7IHJlc3VsdHMuYmF0Y2hfaWQgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPkJhdGNoIElEPC9xLWl0ZW0tbGFiZWw+XG4gICAgICAgICAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICAgICAgICAgIDwvcS1pdGVtPlxuXG4gICAgICAgICAgPHEtaXRlbT5cbiAgICAgICAgICAgIDxxLWl0ZW0tc2VjdGlvbj5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbD57eyBiYXRjaE5hbWUgfX08L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgICAgPHEtaXRlbS1sYWJlbCBjYXB0aW9uPk5hbWU8L3EtaXRlbS1sYWJlbD5cbiAgICAgICAgICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gICAgICAgICAgPC9xLWl0ZW0+XG4gICAgICAgIDwvcS1saXN0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wtMTJcIj5cbiAgICAgICAgPHEtbGlzdCBjbGFzcz1cInJvdW5kZWQtYm9yZGVycyBxLXBhLWxnXCI+XG4gICAgICAgICAgPHEtaXRlbS1sYWJlbCBoZWFkZXI+Vmlld2luZyBiYXRjaCAne3sgYmF0Y2hOYW1lIH19JzwvcS1pdGVtLWxhYmVsPlxuICAgICAgICAgIDxxLXNlcGFyYXRvcj48L3Etc2VwYXJhdG9yPlxuXG4gICAgICAgICAgPGRpdiB2LWZvcj1cInJlc3VsdCBpbiByZXN1bHRzLnJ1bnNcIiA6a2V5PVwicmVzdWx0LmlkXCI+XG4gICAgICAgICAgICA8dHJhY2tlZC1ydW4tbGlzdC1pdGVtXG4gICAgICAgICAgICAgIDp0cmFja2VkLXJ1bj1cInJlc3VsdFwiXG4gICAgICAgICAgICA+PC90cmFja2VkLXJ1bi1saXN0LWl0ZW0+XG4gICAgICAgICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9xLWxpc3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9xLXBhZ2U+XG4gIDxxLXBhZ2UgY2xhc3M9XCJpdGVtcy1jZW50ZXIganVzdGlmeS1ldmVubHlcIiB2LWVsc2U+IExvYWRpbmcgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHtjb21wdXRlZCwgb25CZWZvcmVVbm1vdW50LCByZWZ9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgYXBpIGZyb20gJ3NyYy91dGlscy9jbGllbnQvYXBpJztcbmltcG9ydCB7IEJhdGNoIH0gZnJvbSAnc3JjL3R5cGVzL2FwaSc7XG5pbXBvcnQgVHJhY2tlZEpvYkxpc3RJdGVtIGZyb20gJy4uL2NvbXBvbmVudHMvVHJhY2tlZEpvYkxpc3RJdGVtLnZ1ZSc7XG5pbXBvcnQgQmF0Y2hMaXN0SXRlbSBmcm9tICdjb21wb25lbnRzL0JhdGNoTGlzdEl0ZW0udnVlJztcbmltcG9ydCBUcmFja2VkUnVuTGlzdEl0ZW0gZnJvbSAnY29tcG9uZW50cy9UcmFja2VkUnVuTGlzdEl0ZW0udnVlJztcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcyc7XG5pbXBvcnQge2NsaWVudH0gZnJvbSBcImxhcmF2ZWwtam9iLXN0YXR1cy1qc1wiO1xuXG5jb25zdCByZXN1bHRzID0gcmVmPEJhdGNoIHwgbnVsbD4obnVsbCk7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8e1xuICBiYXRjaElkOiBudW1iZXI7XG59PigpO1xuXG5sZXQgbGlzdGVuZXIgPSBjbGllbnQuYmF0Y2hlcy5zaG93KHByb3BzLmJhdGNoSWQpXG4gIC5saXN0ZW4oKVxuICAub25VcGRhdGVkKG5ld1Jlc3VsdHMgPT4gcmVzdWx0cy52YWx1ZSA9IG5ld1Jlc3VsdHMpXG4gIC5zdGFydCgpO1xuXG5vbkJlZm9yZVVubW91bnQoKCkgPT4ge1xuICBsaXN0ZW5lci5zdG9wKCk7XG59KTtcblxuY29uc3QgYmF0Y2hOYW1lID0gY29tcHV0ZWQoKCk6IHN0cmluZyA9PiB7XG4gIGlmIChyZXN1bHRzLnZhbHVlID09PSBudWxsKSB7XG4gICAgcmV0dXJuICdMb2FkaW5nJztcbiAgfVxuICBpZiAocmVzdWx0cy52YWx1ZS5uYW1lICE9PSBudWxsICYmIHJlc3VsdHMudmFsdWUubmFtZSAhPT0gJycpIHtcbiAgICByZXR1cm4gcmVzdWx0cy52YWx1ZS5uYW1lO1xuICB9XG4gIHJldHVybiAnZGlzcGF0Y2hlZCBhdCAnICsgZGF5anMocmVzdWx0cy52YWx1ZS5jcmVhdGVkX2F0KS5mb3JtYXQoJ0wgTFRTJyk7XG59KTtcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBETSxVQUFBLFVBQVUsSUFBa0IsSUFBSTtBQU10QyxRQUFJLFdBQVcsT0FBTyxRQUFRLEtBQUssTUFBTSxPQUFPLEVBQzdDLE9BQU8sRUFDUCxVQUFVLENBQWMsZUFBQSxRQUFRLFFBQVEsVUFBVSxFQUNsRDtBQUVILG9CQUFnQixNQUFNO0FBQ3BCLGVBQVMsS0FBSztBQUFBLElBQUEsQ0FDZjtBQUVLLFVBQUEsWUFBWSxTQUFTLE1BQWM7QUFDbkMsVUFBQSxRQUFRLFVBQVUsTUFBTTtBQUNuQixlQUFBO0FBQUEsTUFDVDtBQUNBLFVBQUksUUFBUSxNQUFNLFNBQVMsUUFBUSxRQUFRLE1BQU0sU0FBUyxJQUFJO0FBQzVELGVBQU8sUUFBUSxNQUFNO0FBQUEsTUFDdkI7QUFDQSxhQUFPLG1CQUFtQixNQUFNLFFBQVEsTUFBTSxVQUFVLEVBQUUsT0FBTyxPQUFPO0FBQUEsSUFBQSxDQUN6RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
