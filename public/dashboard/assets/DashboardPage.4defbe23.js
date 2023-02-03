import { Q as QPage, a as api } from "./api.616de3f3.js";
import { _ as _export_sfc, K as defineComponent, L as openBlock, M as createBlock, N as withCtx, J as reactive, P as createTextVNode, Q as toDisplayString, R as createBaseVNode } from "./index.2ce80662.js";
import "./render.03bb8eb9.js";
import "./index.aa7156d4.js";
import "./config.83e19d5f.js";
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
      }, "Load API")
    ]),
    _: 1
  });
}
var DashboardPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "DashboardPage.vue"]]);
export { DashboardPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFzaGJvYXJkUGFnZS40ZGVmYmUyMy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9EYXNoYm9hcmRQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJqdXN0aWZ5LWV2ZW5seVwiPlxuICAgIFJlc3VsdDoge3sgYXBpUmVzdWx0IH19XG5cbiAgICA8YnV0dG9uIEBjbGljaz1cImxvYWRBcGlcIj5Mb2FkIEFQSTwvYnV0dG9uPlxuICA8L3EtcGFnZT5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBkZWZpbmVDb21wb25lbnQsIHJlYWN0aXZlIH0gZnJvbSAndnVlJztcbmltcG9ydCBhcGkgZnJvbSAnc3JjL3V0aWxzL2NsaWVudC9hcGknO1xuaW1wb3J0IHsgRGFzaGJvYXJkUmVzcG9uc2UgfSBmcm9tICdzcmMvdHlwZXMvYXBpJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29tcG9uZW50KHtcbiAgbmFtZTogJ0Rhc2hib2FyZFBhZ2UnLFxuICBzZXR1cCgpIHtcbiAgICBsZXQgcmVzdWx0czogRGFzaGJvYXJkUmVzcG9uc2UgfCBudWxsID0gbnVsbDtcblxuICAgIGZ1bmN0aW9uIGxvYWRBcGkoKSB7XG4gICAgICBhcGkuZGFzaGJvYXJkKCkudGhlbigocmVzcG9uc2U6IERhc2hib2FyZFJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHJlc3VsdHMgPSByZWFjdGl2ZShyZXNwb25zZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgbG9hZEFwaSxcbiAgICAgIHJlc3VsdHMsXG4gICAgfTtcblxuICAgIC8vIGNvbnN0IG1ldGEgPSByZWY8TWV0YT4oe1xuICAgIC8vICAgdG90YWxDb3VudDogMTIwMFxuICAgIC8vIH0pO1xuICAgIC8vIHJldHVybiB7IHRvZG9zLCBtZXRhIH07XG4gIH0sXG59KTtcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVCbG9jayIsIl93aXRoQ3R4IiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlRWxlbWVudFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7OztBQWFBLE1BQUssWUFBYSxnQkFBYTtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUNOLFFBQVE7QUFDTixRQUFJLFVBQW9DO0FBRXhDLGFBQVMsVUFBVTtBQUNqQixVQUFJLFVBQVUsRUFBRSxLQUFLLENBQUMsYUFBZ0M7QUFDcEQsa0JBQVUsU0FBUyxRQUFRO0FBQUEsTUFBQSxDQUM1QjtBQUFBLElBQ0g7QUFFTyxXQUFBO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxJQUFBO0FBQUEsRUFPSjtBQUNGLENBQUM7O3NCQWpDQ0EsWUFJUyxPQUFBLEVBQUEsT0FBQSxvQkFKcUI7QUFBQSxJQUFBLFNBQUFDLFFBQUMsTUFDckI7QUFBQSxNQUFBQyxnQkFEcUIsY0FDckJDLGdCQUFHLEtBQVMsU0FBQSxJQUFHLEtBRXZCLENBQUE7QUFBQSxNQUEwQ0MsZ0JBQUEsVUFBQTtBQUFBLFFBQWpDLFNBQUssT0FBRSxPQUFBLE9BQUEsS0FBQSxJQUFBLFNBQUEsS0FBQSxXQUFBLEtBQUEsUUFBQSxHQUFBLElBQUE7QUFBQSxNQUFBLEdBQVMsVUFBUTtBQUFBLElBQUEsQ0FBQTtBQUFBOzs7OzsifQ==
