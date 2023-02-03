import { u as useApi, Q as QBreadcrumbsEl, a as QBreadcrumbs, b as QSeparator } from "./useApi.498595ef.js";
import { Q as QItemSection, b as QItemLabel, c as QItem, d as QList } from "./QItem.efe8ccb9.js";
import { Q as QPage, a as api } from "./api.616de3f3.js";
import { Q as QIcon } from "./use-router-link.d3b03863.js";
import { S as Status } from "./api.9a3f3035.js";
import { S as StatusCount } from "./StatusCount.67507670.js";
import { _ as _export_sfc, K as defineComponent, c as computed, L as openBlock, M as createBlock, N as withCtx, d as createVNode, P as createTextVNode, Q as toDisplayString, R as createBaseVNode, a0 as unref, r as ref, S as createElementBlock, U as renderList, F as Fragment } from "./index.2ce80662.js";
import "./render.03bb8eb9.js";
import "./index.aa7156d4.js";
import "./config.83e19d5f.js";
import "./QAvatar.be6ee61e.js";
import "./QChip.4fb07891.js";
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
      () => props.trackedJob.runs.filter(
        (jobRun) => jobRun.status === Status.Failed
      ).length
    );
    const runningCount = computed(
      () => props.trackedJob.runs.filter(
        (jobRun) => jobRun.status === Status.Started
      ).length
    );
    const queuedCount = computed(
      () => props.trackedJob.runs.filter(
        (jobRun) => jobRun.status === Status.Queued
      ).length
    );
    const cancelledCount = computed(
      () => props.trackedJob.runs.filter(
        (jobRun) => jobRun.status === Status.Cancelled
      ).length
    );
    const succeededCount = computed(
      () => props.trackedJob.runs.filter(
        (jobRun) => jobRun.status === Status.Succeeded
      ).length
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iTGlzdFBhZ2UuMTdhYzc1NjQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rhc2hib2FyZC9zcmMvY29tcG9uZW50cy9UcmFja2VkSm9iTGlzdEl0ZW0udnVlIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9Kb2JMaXN0UGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1pdGVtIGNsaWNrYWJsZSA6dG89XCJ7IHBhdGg6ICcvam9icy8nICsgcHJvcHMudHJhY2tlZEpvYi5hbGlhcyB9XCI+XG4gICAgPHEtaXRlbS1zZWN0aW9uIGF2YXRhciB0b3A+XG4gICAgICA8cS1pY29uIG5hbWU9XCJhY2NvdW50X3RyZWVcIiBjb2xvcj1cImJsYWNrXCIgc2l6ZT1cIjM0cHhcIiAvPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICA8cS1pdGVtLXNlY3Rpb24gdG9wIGNsYXNzPVwiY29sLTIgZ3Qtc21cIj5cbiAgICAgIDxxLWl0ZW0tbGFiZWwgY2xhc3M9XCJxLW10LXNtXCI+e3sgcHJvcHMudHJhY2tlZEpvYi5jbGFzcyB9fTwvcS1pdGVtLWxhYmVsPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICA8cS1pdGVtLXNlY3Rpb24gdG9wPlxuICAgICAgPHEtaXRlbS1sYWJlbCBsaW5lcz1cIjFcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LXdlaWdodC1tZWRpdW1cIj57e1xuICAgICAgICAgIHByb3BzLnRyYWNrZWRKb2IuYWxpYXMgPz8gcHJvcHMudHJhY2tlZEpvYi5jbGFzc1xuICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgPCEtLSAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0LWdyZXktOFwiPiAtIHt7IGZpbmlzaGVkQ291bnQgfX0gZmluaXNoZWQuPC9zcGFuPi0tPlxuICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgICA8cS1pdGVtLWxhYmVsIGNhcHRpb24gbGluZXM9XCI1XCI+XG4gICAgICAgIDxzdGF0dXMtY291bnRcbiAgICAgICAgICA6Y291bnQ9XCJxdWV1ZWRDb3VudFwiXG4gICAgICAgICAgbGFiZWw9XCJRdWV1ZWRcIlxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICAgID48L3N0YXR1cy1jb3VudD5cbiAgICAgICAgPHN0YXR1cy1jb3VudFxuICAgICAgICAgIDpjb3VudD1cInJ1bm5pbmdDb3VudFwiXG4gICAgICAgICAgbGFiZWw9XCJSdW5uaW5nXCJcbiAgICAgICAgICBjb2xvcj1cImluZm9cIlxuICAgICAgICA+PC9zdGF0dXMtY291bnQ+XG4gICAgICAgIDxzdGF0dXMtY291bnRcbiAgICAgICAgICA6Y291bnQ9XCJjYW5jZWxsZWRDb3VudFwiXG4gICAgICAgICAgbGFiZWw9XCJDYW5jZWxsZWRcIlxuICAgICAgICAgIGNvbG9yPVwid2FybmluZ1wiXG4gICAgICAgID48L3N0YXR1cy1jb3VudD5cbiAgICAgICAgPHN0YXR1cy1jb3VudFxuICAgICAgICAgIDpjb3VudD1cImZhaWxlZENvdW50XCJcbiAgICAgICAgICBsYWJlbD1cIkZhaWxlZFwiXG4gICAgICAgICAgY29sb3I9XCJuZWdhdGl2ZVwiXG4gICAgICAgID48L3N0YXR1cy1jb3VudD5cbiAgICAgICAgPHN0YXR1cy1jb3VudFxuICAgICAgICAgIDpjb3VudD1cInN1Y2NlZWRlZENvdW50XCJcbiAgICAgICAgICBsYWJlbD1cIlN1Y2NlZWRlZFwiXG4gICAgICAgICAgY29sb3I9XCJwb3NpdGl2ZVwiXG4gICAgICAgID48L3N0YXR1cy1jb3VudD5cbiAgICAgIDwvcS1pdGVtLWxhYmVsPlxuICAgIDwvcS1pdGVtLXNlY3Rpb24+XG5cbiAgICA8cS1pdGVtLXNlY3Rpb24gdG9wIHNpZGU+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1ncmV5LTggcS1ndXR0ZXIteHNcIj5cbiAgICAgICAgPHEtaWNvbiBjbGFzcz1cImd0LXhzXCIgc2l6ZT1cIjEycHhcIiBpY29uPVwia2V5Ym9hcmRfYXJyb3dfcmlnaHRcIiAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cbiAgPC9xLWl0ZW0+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgY29tcHV0ZWQsIGRlZmluZVByb3BzIH0gZnJvbSAndnVlJztcbmltcG9ydCB7IFRyYWNrZWRKb2IsIEpvYlJ1biwgU3RhdHVzIH0gZnJvbSAnc3JjL3R5cGVzL2FwaSc7XG5pbXBvcnQgU3RhdHVzQ291bnQgZnJvbSAnY29tcG9uZW50cy9TdGF0dXNDb3VudC52dWUnO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzPHtcbiAgdHJhY2tlZEpvYjogVHJhY2tlZEpvYjtcbn0+KCk7XG5cbi8vIENvdW50c1xuXG5jb25zdCBmYWlsZWRDb3VudCA9IGNvbXB1dGVkKFxuICAoKTogbnVtYmVyID0+XG4gICAgcHJvcHMudHJhY2tlZEpvYi5ydW5zLmZpbHRlcihcbiAgICAgIChqb2JSdW46IEpvYlJ1bikgPT4gam9iUnVuLnN0YXR1cyA9PT0gU3RhdHVzLkZhaWxlZFxuICAgICkubGVuZ3RoXG4pO1xuY29uc3QgcnVubmluZ0NvdW50ID0gY29tcHV0ZWQoXG4gICgpOiBudW1iZXIgPT5cbiAgICBwcm9wcy50cmFja2VkSm9iLnJ1bnMuZmlsdGVyKFxuICAgICAgKGpvYlJ1bjogSm9iUnVuKSA9PiBqb2JSdW4uc3RhdHVzID09PSBTdGF0dXMuU3RhcnRlZFxuICAgICkubGVuZ3RoXG4pO1xuY29uc3QgcXVldWVkQ291bnQgPSBjb21wdXRlZChcbiAgKCk6IG51bWJlciA9PlxuICAgIHByb3BzLnRyYWNrZWRKb2IucnVucy5maWx0ZXIoXG4gICAgICAoam9iUnVuOiBKb2JSdW4pID0+IGpvYlJ1bi5zdGF0dXMgPT09IFN0YXR1cy5RdWV1ZWRcbiAgICApLmxlbmd0aFxuKTtcbmNvbnN0IGNhbmNlbGxlZENvdW50ID0gY29tcHV0ZWQoXG4gICgpOiBudW1iZXIgPT5cbiAgICBwcm9wcy50cmFja2VkSm9iLnJ1bnMuZmlsdGVyKFxuICAgICAgKGpvYlJ1bjogSm9iUnVuKSA9PiBqb2JSdW4uc3RhdHVzID09PSBTdGF0dXMuQ2FuY2VsbGVkXG4gICAgKS5sZW5ndGhcbik7XG5jb25zdCBzdWNjZWVkZWRDb3VudCA9IGNvbXB1dGVkKFxuICAoKTogbnVtYmVyID0+XG4gICAgcHJvcHMudHJhY2tlZEpvYi5ydW5zLmZpbHRlcihcbiAgICAgIChqb2JSdW46IEpvYlJ1bikgPT4gam9iUnVuLnN0YXR1cyA9PT0gU3RhdHVzLlN1Y2NlZWRlZFxuICAgICkubGVuZ3RoXG4pO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+PC9zdHlsZT5cbiIsIjx0ZW1wbGF0ZT5cbiAgPHEtcGFnZSBjbGFzcz1cImp1c3RpZnktZXZlbmx5XCIgdi1pZj1cInJlc3VsdHMgIT09IG51bGxcIj5cbiAgICA8cS1icmVhZGNydW1icz5cbiAgICAgIDxxLWJyZWFkY3J1bWJzLWVsIGljb249XCJsaXN0XCIgdG89XCIvam9ic1wiIGxhYmVsPVwiSm9ic1wiIC8+XG4gICAgPC9xLWJyZWFkY3J1bWJzPlxuXG4gICAgPHEtbGlzdCBjbGFzcz1cInJvdW5kZWQtYm9yZGVycyBxLXBhLWxnXCI+XG4gICAgICA8cS1pdGVtLWxhYmVsIGhlYWRlcj5BbGwgSm9iczwvcS1pdGVtLWxhYmVsPlxuXG4gICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cbiAgICAgIDxkaXYgdi1mb3I9XCJyZXN1bHQgaW4gcmVzdWx0c1wiIDprZXk9XCJnZXRIYXNoKHJlc3VsdClcIj5cbiAgICAgICAgPHRyYWNrZWQtam9iLWxpc3QtaXRlbSA6dHJhY2tlZC1qb2I9XCJyZXN1bHRcIj4gPC90cmFja2VkLWpvYi1saXN0LWl0ZW0+XG4gICAgICAgIDxxLXNlcGFyYXRvcj48L3Etc2VwYXJhdG9yPlxuICAgICAgPC9kaXY+XG4gICAgPC9xLWxpc3Q+XG4gIDwvcS1wYWdlPlxuICA8cS1wYWdlIGNsYXNzPVwiaXRlbXMtY2VudGVyIGp1c3RpZnktZXZlbmx5XCIgdi1lbHNlPiBMb2FkaW5nIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHJlZiB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgYXBpIGZyb20gJ3NyYy91dGlscy9jbGllbnQvYXBpJztcbmltcG9ydCBUcmFja2VkSm9iTGlzdEl0ZW0gZnJvbSAnLi4vY29tcG9uZW50cy9UcmFja2VkSm9iTGlzdEl0ZW0udnVlJztcbmltcG9ydCB7IHVzZUFwaSB9IGZyb20gJy4uL2NvbXBvc3RhYmxlcy91c2VBcGknO1xuaW1wb3J0IHsgVHJhY2tlZEpvYiB9IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuXG5jb25zdCByZXN1bHRzID0gcmVmPFRyYWNrZWRKb2JbXSB8IG51bGw+KG51bGwpO1xuXG51c2VBcGkoKGFmdGVyKSA9PiB7XG4gIGFwaVxuICAgIC5qb2JMaXN0KClcbiAgICAudGhlbigocmVzcG9uc2U6IFRyYWNrZWRKb2JbXSkgPT4gKHJlc3VsdHMudmFsdWUgPSByZXNwb25zZSkpXG4gICAgLmZpbmFsbHkoYWZ0ZXIpO1xufSk7XG5cbmZ1bmN0aW9uIGdldEhhc2godHJhY2tlZEpvYjogVHJhY2tlZEpvYik6IHN0cmluZyB7XG4gIHJldHVybiB0cmFja2VkSm9iLmNsYXNzO1xufVxuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUVBLFVBQU0sY0FBYztBQUFBLE1BQ2xCLE1BQ0UsTUFBTSxXQUFXLEtBQUs7QUFBQSxRQUNwQixDQUFDLFdBQW1CLE9BQU8sV0FBVyxPQUFPO0FBQUEsTUFBQSxFQUM3QztBQUFBLElBQUE7QUFFTixVQUFNLGVBQWU7QUFBQSxNQUNuQixNQUNFLE1BQU0sV0FBVyxLQUFLO0FBQUEsUUFDcEIsQ0FBQyxXQUFtQixPQUFPLFdBQVcsT0FBTztBQUFBLE1BQUEsRUFDN0M7QUFBQSxJQUFBO0FBRU4sVUFBTSxjQUFjO0FBQUEsTUFDbEIsTUFDRSxNQUFNLFdBQVcsS0FBSztBQUFBLFFBQ3BCLENBQUMsV0FBbUIsT0FBTyxXQUFXLE9BQU87QUFBQSxNQUFBLEVBQzdDO0FBQUEsSUFBQTtBQUVOLFVBQU0saUJBQWlCO0FBQUEsTUFDckIsTUFDRSxNQUFNLFdBQVcsS0FBSztBQUFBLFFBQ3BCLENBQUMsV0FBbUIsT0FBTyxXQUFXLE9BQU87QUFBQSxNQUFBLEVBQzdDO0FBQUEsSUFBQTtBQUVOLFVBQU0saUJBQWlCO0FBQUEsTUFDckIsTUFDRSxNQUFNLFdBQVcsS0FBSztBQUFBLFFBQ3BCLENBQUMsV0FBbUIsT0FBTyxXQUFXLE9BQU87QUFBQSxNQUFBLEVBQzdDO0FBQUEsSUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25FQSxVQUFBLFVBQVUsSUFBeUIsSUFBSTtBQUU3QyxXQUFPLENBQUMsVUFBVTtBQUViLFVBQUEsUUFBQSxFQUNBLEtBQUssQ0FBQyxhQUE0QixRQUFRLFFBQVEsUUFBUyxFQUMzRCxRQUFRLEtBQUs7QUFBQSxJQUFBLENBQ2pCO0FBRUQsYUFBUyxRQUFRLFlBQWdDO0FBQy9DLGFBQU8sV0FBVztBQUFBLElBQ3BCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
