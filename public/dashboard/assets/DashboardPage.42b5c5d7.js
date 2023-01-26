import { Q as QPage, a as api } from "./api.b70b87c8.js";
import { _ as _export_sfc, K as defineComponent, L as openBlock, M as createBlock, N as withCtx, J as reactive, P as createTextVNode, Q as toDisplayString, R as createBaseVNode } from "./index.a2d3f53c.js";
import "./render.80a4b5ad.js";
import "./index.aa7156d4.js";
import "./config.b6f61684.js";
const _sfc_main = defineComponent({
  name: "DashboardPage",
  setup() {
    let results = null;
    function loadApi() {
      api.dashboard().then((response) => {
        results = reactive(response);
      });
    }
    return {
      loadApi,
      results
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(QPage, { class: "justify-evenly" }, {
    default: withCtx(() => [
      createTextVNode(" Result: " + toDisplayString(_ctx.apiResult) + " ", 1),
      createBaseVNode("button", {
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.loadApi && _ctx.loadApi(...args))
      }, " Load API ")
    ]),
    _: 1
  });
}
var DashboardPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "DashboardPage.vue"]]);
export { DashboardPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFzaGJvYXJkUGFnZS40MmI1YzVkNy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9EYXNoYm9hcmRQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJqdXN0aWZ5LWV2ZW5seVwiPlxuXG4gICAgUmVzdWx0OiB7e2FwaVJlc3VsdH19XG5cbiAgICA8YnV0dG9uIEBjbGljaz1cImxvYWRBcGlcIj5cbiAgICAgIExvYWQgQVBJXG4gICAgPC9idXR0b24+XG4gIDwvcS1wYWdlPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IGRlZmluZUNvbXBvbmVudCwgcmVhY3RpdmUgfSBmcm9tICd2dWUnO1xuaW1wb3J0IGFwaSBmcm9tICdzcmMvdXRpbHMvY2xpZW50L2FwaSc7XG5pbXBvcnQge0Rhc2hib2FyZFJlc3BvbnNlfSBmcm9tICdzcmMvdHlwZXMvYXBpJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ0Rhc2hib2FyZFBhZ2UnLFxuICBzZXR1cCAoKSB7XG4gICAgbGV0IHJlc3VsdHM6IERhc2hib2FyZFJlc3BvbnNlfG51bGwgPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gbG9hZEFwaSgpIHtcbiAgICAgIGFwaS5kYXNoYm9hcmQoKVxuICAgICAgICAudGhlbigocmVzcG9uc2U6IERhc2hib2FyZFJlc3BvbnNlICk9PiB7XG4gICAgICAgICAgcmVzdWx0cyA9IHJlYWN0aXZlKHJlc3BvbnNlKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbG9hZEFwaSxcbiAgICAgIHJlc3VsdHNcbiAgICB9XG5cblxuICAgIC8vIGNvbnN0IG1ldGEgPSByZWY8TWV0YT4oe1xuICAgIC8vICAgdG90YWxDb3VudDogMTIwMFxuICAgIC8vIH0pO1xuICAgIC8vIHJldHVybiB7IHRvZG9zLCBtZXRhIH07XG4gIH1cbn0pO1xuPC9zY3JpcHQ+XG4iXSwibmFtZXMiOlsiX2NyZWF0ZUJsb2NrIiwiX3dpdGhDdHgiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBZ0JBLE1BQUssWUFBYSxnQkFBYTtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUNOLFFBQVM7QUFDUCxRQUFJLFVBQWtDO0FBRXRDLGFBQVMsVUFBVTtBQUNqQixVQUFJLFVBQVUsRUFDWCxLQUFLLENBQUMsYUFBZ0M7QUFDckMsa0JBQVUsU0FBUyxRQUFRO0FBQUEsTUFBQSxDQUM1QjtBQUFBLElBQ0w7QUFFTyxXQUFBO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxJQUFBO0FBQUEsRUFRSjtBQUNGLENBQUM7O3NCQXRDQ0EsWUFPUyxPQUFBLEVBQUEsT0FBQSxvQkFQcUI7QUFBQSxJQUFBLFNBQUFDLFFBQUMsTUFFckI7QUFBQSxNQUFBQyxnQkFGcUIsY0FFckJDLGdCQUFFLEtBQVMsU0FBQSxJQUFFLEtBRXJCLENBQUE7QUFBQSxNQUVTQyxnQkFBQSxVQUFBO0FBQUEsUUFGQSxTQUFLLE9BQUUsT0FBQSxPQUFBLEtBQUEsSUFBQSxTQUFBLEtBQUEsV0FBQSxLQUFBLFFBQUEsR0FBQSxJQUFBO0FBQUEsTUFBQSxHQUFTLFlBRXpCO0FBQUEsSUFBQSxDQUFBO0FBQUE7Ozs7OyJ9
