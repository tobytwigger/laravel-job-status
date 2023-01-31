import { u as useApi, Q as QBreadcrumbsEl, a as QBreadcrumbs, b as QSeparator } from "./useApi.a916b433.js";
import { Q as QItemSection, b as QItemLabel, c as QItem, d as QList } from "./QItem.d2559d90.js";
import { Q as QPage, a as api } from "./api.d8f10d31.js";
import { Q as QIcon } from "./use-router-link.b59d0f2d.js";
import { S as Status } from "./api.9a3f3035.js";
import { S as StatusCount } from "./StatusCount.e374feb6.js";
import { _ as _export_sfc, K as defineComponent, c as computed, L as openBlock, M as createBlock, N as withCtx, d as createVNode, P as createTextVNode, Q as toDisplayString, R as createBaseVNode, a0 as unref, r as ref, S as createElementBlock, U as renderList, F as Fragment } from "./index.24d2f870.js";
import "./render.a10da10b.js";
import "./index.aa7156d4.js";
import "./config.b6f61684.js";
import "./QAvatar.793dfca6.js";
import "./QChip.c15cdb8a.js";
const _hoisted_1 = { class: "text-weight-medium" };
const _hoisted_2 = { class: "text-grey-8 q-gutter-xs" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TrackedJobListItem",
  props: {
    trackedJob: null
  },
  setup(__props) {
    const props = __props;
    const failedCount = computed(
      () => props.trackedJob.runs.filter((jobRun) => jobRun.status === Status.Failed).length
    );
    const runningCount = computed(
      () => props.trackedJob.runs.filter((jobRun) => jobRun.status === Status.Started).length
    );
    const queuedCount = computed(
      () => props.trackedJob.runs.filter((jobRun) => jobRun.status === Status.Queued).length
    );
    const cancelledCount = computed(
      () => props.trackedJob.runs.filter((jobRun) => jobRun.status === Status.Cancelled).length
    );
    const succeededCount = computed(
      () => props.trackedJob.runs.filter((jobRun) => jobRun.status === Status.Succeeded).length
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QItem, {
        clickable: "",
        to: { path: "/jobs/" + props.trackedJob.alias }
      }, {
        default: withCtx(() => [
          createVNode(QItemSection, {
            avatar: "",
            top: ""
          }, {
            default: withCtx(() => [
              createVNode(QIcon, {
                name: "account_tree",
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
                  createTextVNode(toDisplayString(props.trackedJob.class), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(QItemSection, { top: "" }, {
            default: withCtx(() => [
              createVNode(QItemLabel, { lines: "1" }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createBaseVNode("span", _hoisted_1, toDisplayString((_a = props.trackedJob.alias) != null ? _a : props.trackedJob.class), 1)
                  ];
                }),
                _: 1
              }),
              createVNode(QItemLabel, {
                caption: "",
                lines: "5"
              }, {
                default: withCtx(() => [
                  createVNode(StatusCount, {
                    count: unref(queuedCount),
                    label: "Queued",
                    color: "primary"
                  }, null, 8, ["count"]),
                  createVNode(StatusCount, {
                    count: unref(runningCount),
                    label: "Running",
                    color: "info"
                  }, null, 8, ["count"]),
                  createVNode(StatusCount, {
                    count: unref(cancelledCount),
                    label: "Cancelled",
                    color: "warning"
                  }, null, 8, ["count"]),
                  createVNode(StatusCount, {
                    count: unref(failedCount),
                    label: "Failed",
                    color: "negative"
                  }, null, 8, ["count"]),
                  createVNode(StatusCount, {
                    count: unref(succeededCount),
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
var TrackedJobListItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "TrackedJobListItem.vue"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "JobListPage",
  setup(__props) {
    const results = ref(null);
    useApi((after) => {
      api.jobList().then((response) => results.value = response).finally(after);
    });
    function getHash(trackedJob) {
      return trackedJob.class;
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
                to: "/jobs",
                label: "Jobs"
              })
            ]),
            _: 1
          }),
          createVNode(QList, { class: "rounded-borders q-pa-lg" }, {
            default: withCtx(() => [
              createVNode(QItemLabel, { header: "" }, {
                default: withCtx(() => [
                  createTextVNode("All Jobs")
                ]),
                _: 1
              }),
              createVNode(QSeparator),
              (openBlock(true), createElementBlock(Fragment, null, renderList(results.value, (result) => {
                return openBlock(), createElementBlock("div", {
                  key: getHash(result)
                }, [
                  createVNode(TrackedJobListItem, { "tracked-job": result }, null, 8, ["tracked-job"]),
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
var JobListPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "JobListPage.vue"]]);
export { JobListPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iTGlzdFBhZ2UuZmNjNWZjMGYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rhc2hib2FyZC9zcmMvY29tcG9uZW50cy9UcmFja2VkSm9iTGlzdEl0ZW0udnVlIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9Kb2JMaXN0UGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1pdGVtIGNsaWNrYWJsZSA6dG89XCJ7cGF0aDogJy9qb2JzLycgKyBwcm9wcy50cmFja2VkSm9iLmFsaWFzfVwiPlxuICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXIgdG9wPlxuICAgICAgPHEtaWNvbiBuYW1lPVwiYWNjb3VudF90cmVlXCIgY29sb3I9XCJibGFja1wiIHNpemU9XCIzNHB4XCIgLz5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgPHEtaXRlbS1zZWN0aW9uIHRvcCBjbGFzcz1cImNvbC0yIGd0LXNtXCI+XG4gICAgICA8cS1pdGVtLWxhYmVsIGNsYXNzPVwicS1tdC1zbVwiPnt7IHByb3BzLnRyYWNrZWRKb2IuY2xhc3MgfX08L3EtaXRlbS1sYWJlbD5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgPHEtaXRlbS1zZWN0aW9uIHRvcD5cbiAgICAgIDxxLWl0ZW0tbGFiZWwgbGluZXM9XCIxXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC13ZWlnaHQtbWVkaXVtXCI+e3sgcHJvcHMudHJhY2tlZEpvYi5hbGlhcyA/PyBwcm9wcy50cmFja2VkSm9iLmNsYXNzIH19PC9zcGFuPlxuPCEtLSAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWdyZXktOFwiPiAtIHt7IGZpbmlzaGVkQ291bnQgfX0gZmluaXNoZWQuPC9zcGFuPi0tPlxuICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24gbGluZXM9XCI1XCI+XG4gICAgICAgIDxzdGF0dXMtY291bnQgOmNvdW50PVwicXVldWVkQ291bnRcIiBsYWJlbD1cIlF1ZXVlZFwiIGNvbG9yPVwicHJpbWFyeVwiPjwvc3RhdHVzLWNvdW50PlxuICAgICAgICA8c3RhdHVzLWNvdW50IDpjb3VudD1cInJ1bm5pbmdDb3VudFwiIGxhYmVsPVwiUnVubmluZ1wiIGNvbG9yPVwiaW5mb1wiPjwvc3RhdHVzLWNvdW50PlxuICAgICAgICA8c3RhdHVzLWNvdW50IDpjb3VudD1cImNhbmNlbGxlZENvdW50XCIgbGFiZWw9XCJDYW5jZWxsZWRcIiBjb2xvcj1cIndhcm5pbmdcIj48L3N0YXR1cy1jb3VudD5cbiAgICAgICAgPHN0YXR1cy1jb3VudCA6Y291bnQ9XCJmYWlsZWRDb3VudFwiIGxhYmVsPVwiRmFpbGVkXCIgY29sb3I9XCJuZWdhdGl2ZVwiPjwvc3RhdHVzLWNvdW50PlxuICAgICAgICA8c3RhdHVzLWNvdW50IDpjb3VudD1cInN1Y2NlZWRlZENvdW50XCIgbGFiZWw9XCJTdWNjZWVkZWRcIiBjb2xvcj1cInBvc2l0aXZlXCI+PC9zdGF0dXMtY291bnQ+XG4gICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgPHEtaXRlbS1zZWN0aW9uIHRvcCBzaWRlPlxuICAgICAgPGRpdiBjbGFzcz1cInRleHQtZ3JleS04IHEtZ3V0dGVyLXhzXCI+XG4gICAgICAgIDxxLWljb24gY2xhc3M9XCJndC14c1wiIHNpemU9XCIxMnB4XCIgaWNvbj1cImtleWJvYXJkX2Fycm93X3JpZ2h0XCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG4gIDwvcS1pdGVtPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7Y29tcHV0ZWQsIGRlZmluZVByb3BzfSBmcm9tICd2dWUnO1xuaW1wb3J0IHtUcmFja2VkSm9iLCBKb2JSdW4sIFN0YXR1c30gZnJvbSAnc3JjL3R5cGVzL2FwaSc7XG5pbXBvcnQgU3RhdHVzQ291bnQgZnJvbSBcImNvbXBvbmVudHMvU3RhdHVzQ291bnQudnVlXCI7XG5cbmNvbnN0IHByb3BzID0gZGVmaW5lUHJvcHM8e1xuICB0cmFja2VkSm9iOiBUcmFja2VkSm9iXG59PigpO1xuXG5cbi8vIENvdW50c1xuXG5jb25zdCBmYWlsZWRDb3VudCA9IGNvbXB1dGVkKCgpOiBudW1iZXIgPT4gcHJvcHMudHJhY2tlZEpvYi5ydW5zXG4gIC5maWx0ZXIoKGpvYlJ1bjogSm9iUnVuKSA9PiBqb2JSdW4uc3RhdHVzID09PSBTdGF0dXMuRmFpbGVkKVxuICAubGVuZ3RoXG4pO1xuY29uc3QgcnVubmluZ0NvdW50ID0gY29tcHV0ZWQoKCk6IG51bWJlciA9PiBwcm9wcy50cmFja2VkSm9iLnJ1bnNcbiAgLmZpbHRlcigoam9iUnVuOiBKb2JSdW4pID0+IGpvYlJ1bi5zdGF0dXMgPT09IFN0YXR1cy5TdGFydGVkKVxuICAubGVuZ3RoXG4pO1xuY29uc3QgcXVldWVkQ291bnQgPSBjb21wdXRlZCgoKTogbnVtYmVyID0+IHByb3BzLnRyYWNrZWRKb2IucnVuc1xuICAuZmlsdGVyKChqb2JSdW46IEpvYlJ1bikgPT4gam9iUnVuLnN0YXR1cyA9PT0gU3RhdHVzLlF1ZXVlZClcbiAgLmxlbmd0aFxuKTtcbmNvbnN0IGNhbmNlbGxlZENvdW50ID0gY29tcHV0ZWQoKCk6IG51bWJlciA9PiBwcm9wcy50cmFja2VkSm9iLnJ1bnNcbiAgLmZpbHRlcigoam9iUnVuOiBKb2JSdW4pID0+IGpvYlJ1bi5zdGF0dXMgPT09IFN0YXR1cy5DYW5jZWxsZWQpXG4gIC5sZW5ndGhcbik7XG5jb25zdCBzdWNjZWVkZWRDb3VudCA9IGNvbXB1dGVkKCgpOiBudW1iZXIgPT4gcHJvcHMudHJhY2tlZEpvYi5ydW5zXG4gIC5maWx0ZXIoKGpvYlJ1bjogSm9iUnVuKSA9PiBqb2JSdW4uc3RhdHVzID09PSBTdGF0dXMuU3VjY2VlZGVkKVxuICAubGVuZ3RoXG4pO1xuXG48L3NjcmlwdD5cblxuPHN0eWxlIHNjb3BlZD5cblxuPC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cImp1c3RpZnktZXZlbmx5XCIgdi1pZj1cInJlc3VsdHMgIT09IG51bGxcIj5cblxuICAgIDxxLWJyZWFkY3J1bWJzPlxuICAgICAgICA8cS1icmVhZGNydW1icy1lbCBpY29uPVwibGlzdFwiIHRvPVwiL2pvYnNcIiBsYWJlbD1cIkpvYnNcIi8+XG4gICAgPC9xLWJyZWFkY3J1bWJzPlxuXG4gICAgPHEtbGlzdCBjbGFzcz1cInJvdW5kZWQtYm9yZGVycyBxLXBhLWxnXCI+XG4gICAgICA8cS1pdGVtLWxhYmVsIGhlYWRlcj5BbGwgSm9iczwvcS1pdGVtLWxhYmVsPlxuXG4gICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cbiAgICAgIDxkaXYgdi1mb3I9XCJyZXN1bHQgaW4gcmVzdWx0c1wiIDprZXk9XCJnZXRIYXNoKHJlc3VsdClcIj5cbiAgICAgICAgPHRyYWNrZWQtam9iLWxpc3QtaXRlbSAgOnRyYWNrZWQtam9iPVwicmVzdWx0XCI+XG4gICAgICAgIDwvdHJhY2tlZC1qb2ItbGlzdC1pdGVtPlxuICAgICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1saXN0PlxuXG4gIDwvcS1wYWdlPlxuICA8cS1wYWdlIGNsYXNzPVwiaXRlbXMtY2VudGVyIGp1c3RpZnktZXZlbmx5XCIgdi1lbHNlPlxuICAgIExvYWRpbmdcbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHtyZWZ9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgYXBpIGZyb20gJ3NyYy91dGlscy9jbGllbnQvYXBpJztcbmltcG9ydCBUcmFja2VkSm9iTGlzdEl0ZW0gZnJvbSBcIi4uL2NvbXBvbmVudHMvVHJhY2tlZEpvYkxpc3RJdGVtLnZ1ZVwiO1xuaW1wb3J0IHt1c2VBcGl9IGZyb20gXCIuLi9jb21wb3N0YWJsZXMvdXNlQXBpXCI7XG5pbXBvcnQge1RyYWNrZWRKb2J9IGZyb20gXCJzcmMvdHlwZXMvYXBpXCI7XG5cbmNvbnN0IHJlc3VsdHMgPSByZWY8VHJhY2tlZEpvYltdfG51bGw+KG51bGwpO1xuXG51c2VBcGkoKGFmdGVyKSA9PiB7XG4gIGFwaS5qb2JMaXN0KClcbiAgICAudGhlbigocmVzcG9uc2U6IFRyYWNrZWRKb2JbXSkgPT4gcmVzdWx0cy52YWx1ZSA9IHJlc3BvbnNlKVxuICAgIC5maW5hbGx5KGFmdGVyKTtcbn0pXG5cbmZ1bmN0aW9uIGdldEhhc2godHJhY2tlZEpvYjogVHJhY2tlZEpvYik6IHN0cmluZyB7XG4gIHJldHVybiB0cmFja2VkSm9iLmNsYXNzO1xufVxuXG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0Q0EsVUFBTSxjQUFjO0FBQUEsTUFBUyxNQUFjLE1BQU0sV0FBVyxLQUN6RCxPQUFPLENBQUMsV0FBbUIsT0FBTyxXQUFXLE9BQU8sTUFBTSxFQUMxRDtBQUFBLElBQUE7QUFFSCxVQUFNLGVBQWU7QUFBQSxNQUFTLE1BQWMsTUFBTSxXQUFXLEtBQzFELE9BQU8sQ0FBQyxXQUFtQixPQUFPLFdBQVcsT0FBTyxPQUFPLEVBQzNEO0FBQUEsSUFBQTtBQUVILFVBQU0sY0FBYztBQUFBLE1BQVMsTUFBYyxNQUFNLFdBQVcsS0FDekQsT0FBTyxDQUFDLFdBQW1CLE9BQU8sV0FBVyxPQUFPLE1BQU0sRUFDMUQ7QUFBQSxJQUFBO0FBRUgsVUFBTSxpQkFBaUI7QUFBQSxNQUFTLE1BQWMsTUFBTSxXQUFXLEtBQzVELE9BQU8sQ0FBQyxXQUFtQixPQUFPLFdBQVcsT0FBTyxTQUFTLEVBQzdEO0FBQUEsSUFBQTtBQUVILFVBQU0saUJBQWlCO0FBQUEsTUFBUyxNQUFjLE1BQU0sV0FBVyxLQUM1RCxPQUFPLENBQUMsV0FBbUIsT0FBTyxXQUFXLE9BQU8sU0FBUyxFQUM3RDtBQUFBLElBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQkcsVUFBQSxVQUFVLElBQXVCLElBQUk7QUFFM0MsV0FBTyxDQUFDLFVBQVU7QUFDWixVQUFBLFFBQUEsRUFDRCxLQUFLLENBQUMsYUFBMkIsUUFBUSxRQUFRLFFBQVEsRUFDekQsUUFBUSxLQUFLO0FBQUEsSUFBQSxDQUNqQjtBQUVELGFBQVMsUUFBUSxZQUFnQztBQUMvQyxhQUFPLFdBQVc7QUFBQSxJQUNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
