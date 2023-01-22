import { Q as QItemSection, b as QItemLabel, c as QItem, d as QList } from "./QItem.3513138d.js";
import { u as useApi, Q as QSeparator } from "./useApi.274bbd65.js";
import { Q as QPage, a as api } from "./api.bd14957b.js";
import { Q as QIcon } from "./use-router-link.7ba14be3.js";
import { S as Status } from "./api.e4579eee.js";
import { _ as _export_sfc, K as defineComponent, c as computed, L as openBlock, M as createBlock, N as withCtx, d as createVNode, P as createTextVNode, Q as toDisplayString, R as createBaseVNode, a0 as unref, r as ref, S as createElementBlock, U as renderList, F as Fragment } from "./index.8f01a69d.js";
import "./render.ea5ec5c4.js";
import "./index.2cf0d985.js";
import "./config.b6f61684.js";
const _hoisted_1 = { class: "text-weight-medium" };
const _hoisted_2 = { class: "text-grey-8" };
const _hoisted_3 = { class: "text-grey-8 q-gutter-xs" };
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
    computed(
      () => props.trackedJob.runs.filter((jobRun) => jobRun.status === Status.Started).length
    );
    const queuedCount = computed(
      () => props.trackedJob.runs.filter((jobRun) => jobRun.status === Status.Queued).length
    );
    const finishedCount = computed(
      () => props.trackedJob.runs.filter((jobRun) => jobRun.status === Status.Cancelled || jobRun.status === Status.Succeeded).length
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
                    createBaseVNode("span", _hoisted_1, toDisplayString((_a = props.trackedJob.alias) != null ? _a : props.trackedJob.class), 1),
                    createBaseVNode("span", _hoisted_2, " - " + toDisplayString(unref(finishedCount)) + " finished.", 1)
                  ];
                }),
                _: 1
              }),
              createVNode(QItemLabel, {
                caption: "",
                lines: "2"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(failedCount)) + " failed " + toDisplayString(unref(queuedCount)) + " queued ", 1)
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
              createBaseVNode("div", _hoisted_3, [
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
        class: "row items-center justify-evenly"
      }, {
        default: withCtx(() => [
          createVNode(QList, {
            bordered: "",
            class: "rounded-borders",
            style: { "min-width": "85%" }
          }, {
            default: withCtx(() => [
              createVNode(QItemLabel, { header: "" }, {
                default: withCtx(() => [
                  createTextVNode("All Jobs")
                ]),
                _: 1
              }),
              createVNode(QSeparator),
              (openBlock(true), createElementBlock(Fragment, null, renderList(results.value.jobs, (result) => {
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
        class: "row items-center justify-evenly"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iTGlzdFBhZ2UuOGI5ZGI3MDcuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2Rhc2hib2FyZC9zcmMvY29tcG9uZW50cy9UcmFja2VkSm9iTGlzdEl0ZW0udnVlIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9Kb2JMaXN0UGFnZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICA8cS1pdGVtIGNsaWNrYWJsZSA6dG89XCJ7cGF0aDogJy9qb2JzLycgKyBwcm9wcy50cmFja2VkSm9iLmFsaWFzfVwiPlxuICAgIDxxLWl0ZW0tc2VjdGlvbiBhdmF0YXIgdG9wPlxuICAgICAgPHEtaWNvbiBuYW1lPVwiYWNjb3VudF90cmVlXCIgY29sb3I9XCJibGFja1wiIHNpemU9XCIzNHB4XCIgLz5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgPHEtaXRlbS1zZWN0aW9uIHRvcCBjbGFzcz1cImNvbC0yIGd0LXNtXCI+XG4gICAgICA8cS1pdGVtLWxhYmVsIGNsYXNzPVwicS1tdC1zbVwiPnt7IHByb3BzLnRyYWNrZWRKb2IuY2xhc3MgfX08L3EtaXRlbS1sYWJlbD5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuXG4gICAgPHEtaXRlbS1zZWN0aW9uIHRvcD5cbiAgICAgIDxxLWl0ZW0tbGFiZWwgbGluZXM9XCIxXCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dC13ZWlnaHQtbWVkaXVtXCI+e3sgcHJvcHMudHJhY2tlZEpvYi5hbGlhcyA/PyBwcm9wcy50cmFja2VkSm9iLmNsYXNzIH19PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInRleHQtZ3JleS04XCI+IC0ge3sgZmluaXNoZWRDb3VudCB9fSBmaW5pc2hlZC48L3NwYW4+XG4gICAgICA8L3EtaXRlbS1sYWJlbD5cbiAgICAgIDxxLWl0ZW0tbGFiZWwgY2FwdGlvbiBsaW5lcz1cIjJcIj5cbiAgICAgICAge3sgZmFpbGVkQ291bnQgfX0gZmFpbGVkXG4gICAgICAgIHt7IHF1ZXVlZENvdW50IH19IHF1ZXVlZFxuICAgICAgPC9xLWl0ZW0tbGFiZWw+XG4gICAgPC9xLWl0ZW0tc2VjdGlvbj5cblxuICAgIDxxLWl0ZW0tc2VjdGlvbiB0b3Agc2lkZT5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWdyZXktOCBxLWd1dHRlci14c1wiPlxuICAgICAgICA8cS1pY29uIGNsYXNzPVwiZ3QteHNcIiBzaXplPVwiMTJweFwiIGljb249XCJrZXlib2FyZF9hcnJvd19yaWdodFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3EtaXRlbS1zZWN0aW9uPlxuICA8L3EtaXRlbT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQge2NvbXB1dGVkLCBkZWZpbmVQcm9wc30gZnJvbSAndnVlJztcbmltcG9ydCB7VHJhY2tlZEpvYiwgSm9iUnVuLCBTdGF0dXN9IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzPHtcbiAgdHJhY2tlZEpvYjogVHJhY2tlZEpvYlxufT4oKTtcblxuXG4vLyBDb3VudHNcblxuY29uc3QgZmFpbGVkQ291bnQgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy50cmFja2VkSm9iLnJ1bnNcbiAgLmZpbHRlcigoam9iUnVuOiBKb2JSdW4pID0+IGpvYlJ1bi5zdGF0dXMgPT09IFN0YXR1cy5GYWlsZWQpXG4gIC5sZW5ndGhcbik7XG5jb25zdCBydW5uaW5nQ291bnQgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy50cmFja2VkSm9iLnJ1bnNcbiAgLmZpbHRlcigoam9iUnVuOiBKb2JSdW4pID0+IGpvYlJ1bi5zdGF0dXMgPT09IFN0YXR1cy5TdGFydGVkKVxuICAubGVuZ3RoXG4pO1xuY29uc3QgcXVldWVkQ291bnQgPSBjb21wdXRlZCgoKSA9PiBwcm9wcy50cmFja2VkSm9iLnJ1bnNcbiAgLmZpbHRlcigoam9iUnVuOiBKb2JSdW4pID0+IGpvYlJ1bi5zdGF0dXMgPT09IFN0YXR1cy5RdWV1ZWQpXG4gIC5sZW5ndGhcbik7XG5jb25zdCBmaW5pc2hlZENvdW50ID0gY29tcHV0ZWQoKCkgPT4gcHJvcHMudHJhY2tlZEpvYi5ydW5zXG4gIC5maWx0ZXIoKGpvYlJ1bjogSm9iUnVuKSA9PiBqb2JSdW4uc3RhdHVzID09PSBTdGF0dXMuQ2FuY2VsbGVkIHx8IGpvYlJ1bi5zdGF0dXMgPT09IFN0YXR1cy5TdWNjZWVkZWQpXG4gIC5sZW5ndGhcbik7XG5cbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuXG48L3N0eWxlPlxuIiwiPHRlbXBsYXRlPlxuICA8cS1wYWdlIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWV2ZW5seVwiIHYtaWY9XCJyZXN1bHRzICE9PSBudWxsXCI+XG5cbiAgICA8cS1saXN0IGJvcmRlcmVkIGNsYXNzPVwicm91bmRlZC1ib3JkZXJzXCIgc3R5bGU9XCJtaW4td2lkdGg6IDg1JVwiPlxuICAgICAgPHEtaXRlbS1sYWJlbCBoZWFkZXI+QWxsIEpvYnM8L3EtaXRlbS1sYWJlbD5cblxuICAgICAgPHEtc2VwYXJhdG9yPjwvcS1zZXBhcmF0b3I+XG4gICAgICA8ZGl2IHYtZm9yPVwicmVzdWx0IGluIHJlc3VsdHMuam9ic1wiIDprZXk9XCJnZXRIYXNoKHJlc3VsdClcIj5cbiAgICAgICAgPHRyYWNrZWQtam9iLWxpc3QtaXRlbSAgOnRyYWNrZWQtam9iPVwicmVzdWx0XCI+XG4gICAgICAgIDwvdHJhY2tlZC1qb2ItbGlzdC1pdGVtPlxuICAgICAgICA8cS1zZXBhcmF0b3I+PC9xLXNlcGFyYXRvcj5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1saXN0PlxuXG4gIDwvcS1wYWdlPlxuICA8cS1wYWdlIGNsYXNzPVwicm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWV2ZW5seVwiIHYtZWxzZT5cbiAgICBMb2FkaW5nXG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7cmVmfSBmcm9tICd2dWUnO1xuaW1wb3J0IGFwaSBmcm9tICdzcmMvdXRpbHMvY2xpZW50L2FwaSc7XG5pbXBvcnQge1Jlc3VsdHMgYXMgUmVzdWx0c1R5cGV9IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuaW1wb3J0IFRyYWNrZWRKb2JMaXN0SXRlbSBmcm9tIFwiLi4vY29tcG9uZW50cy9UcmFja2VkSm9iTGlzdEl0ZW0udnVlXCI7XG5pbXBvcnQge3VzZUFwaX0gZnJvbSBcIi4uL2NvbXBvc3RhYmxlcy91c2VBcGlcIjtcblxuY29uc3QgcmVzdWx0cyA9IHJlZjxSZXN1bHRzVHlwZXxudWxsPihudWxsKTtcblxudXNlQXBpKChhZnRlcikgPT4ge1xuICBhcGkuam9iTGlzdCgpXG4gICAgLnRoZW4oKHJlc3BvbnNlOiBSZXN1bHRzVHlwZSkgPT4gcmVzdWx0cy52YWx1ZSA9IHJlc3BvbnNlKVxuICAgIC5maW5hbGx5KGFmdGVyKTtcbn0pXG5cbmZ1bmN0aW9uIGdldEhhc2godHJhY2tlZEpvYjogVHJhY2tlZEpvYik6IHN0cmluZyB7XG4gIHJldHVybiB0cmFja2VkSm9iLmNsYXNzO1xufVxuXG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0NBLFVBQU0sY0FBYztBQUFBLE1BQVMsTUFBTSxNQUFNLFdBQVcsS0FDakQsT0FBTyxDQUFDLFdBQW1CLE9BQU8sV0FBVyxPQUFPLE1BQU0sRUFDMUQ7QUFBQSxJQUFBO0FBRWtCO0FBQUEsTUFBUyxNQUFNLE1BQU0sV0FBVyxLQUNsRCxPQUFPLENBQUMsV0FBbUIsT0FBTyxXQUFXLE9BQU8sT0FBTyxFQUMzRDtBQUFBLElBQ0g7QUFDQSxVQUFNLGNBQWM7QUFBQSxNQUFTLE1BQU0sTUFBTSxXQUFXLEtBQ2pELE9BQU8sQ0FBQyxXQUFtQixPQUFPLFdBQVcsT0FBTyxNQUFNLEVBQzFEO0FBQUEsSUFBQTtBQUVILFVBQU0sZ0JBQWdCO0FBQUEsTUFBUyxNQUFNLE1BQU0sV0FBVyxLQUNuRCxPQUFPLENBQUMsV0FBbUIsT0FBTyxXQUFXLE9BQU8sYUFBYSxPQUFPLFdBQVcsT0FBTyxTQUFTLEVBQ25HO0FBQUEsSUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQkcsVUFBQSxVQUFVLElBQXNCLElBQUk7QUFFMUMsV0FBTyxDQUFDLFVBQVU7QUFDWixVQUFBLFFBQUEsRUFDRCxLQUFLLENBQUMsYUFBMEIsUUFBUSxRQUFRLFFBQVEsRUFDeEQsUUFBUSxLQUFLO0FBQUEsSUFBQSxDQUNqQjtBQUVELGFBQVMsUUFBUSxZQUFnQztBQUMvQyxhQUFPLFdBQVc7QUFBQSxJQUNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
