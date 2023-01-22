import { Q as QPage, a as api } from "./api.e5bc72a3.js";
import { _ as _export_sfc, K as defineComponent, L as openBlock, M as createBlock, N as withCtx, J as reactive, P as createTextVNode, Q as toDisplayString, R as createBaseVNode } from "./index.bb057e5d.js";
import "./render.61be68e7.js";
import "./index.aa7156d4.js";
import "./config.b6f61684.js";
const _sfc_main = defineComponent({
  name: "IndexPage",
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
  return openBlock(), createBlock(QPage, { class: "row items-center justify-evenly" }, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFzaGJvYXJkUGFnZS5jNjA3MzRjYy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9EYXNoYm9hcmRQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktZXZlbmx5XCI+XG5cbiAgICBSZXN1bHQ6IHt7YXBpUmVzdWx0fX1cblxuICAgIDxidXR0b24gQGNsaWNrPVwibG9hZEFwaVwiPlxuICAgICAgTG9hZCBBUElcbiAgICA8L2J1dHRvbj5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgZGVmaW5lQ29tcG9uZW50LCByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgYXBpIGZyb20gJ3NyYy91dGlscy9jbGllbnQvYXBpJztcbmltcG9ydCB7RGFzaGJvYXJkUmVzcG9uc2V9IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAnSW5kZXhQYWdlJyxcbiAgc2V0dXAgKCkge1xuICAgIGxldCByZXN1bHRzOiBEYXNoYm9hcmRSZXNwb25zZXxudWxsID0gbnVsbDtcblxuICAgIGZ1bmN0aW9uIGxvYWRBcGkoKSB7XG4gICAgICBhcGkuZGFzaGJvYXJkKClcbiAgICAgICAgLnRoZW4oKHJlc3BvbnNlOiBEYXNoYm9hcmRSZXNwb25zZSApPT4ge1xuICAgICAgICAgIHJlc3VsdHMgPSByZWFjdGl2ZShyZXNwb25zZSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxvYWRBcGksXG4gICAgICByZXN1bHRzXG4gICAgfVxuXG5cbiAgICAvLyBjb25zdCBtZXRhID0gcmVmPE1ldGE+KHtcbiAgICAvLyAgIHRvdGFsQ291bnQ6IDEyMDBcbiAgICAvLyB9KTtcbiAgICAvLyByZXR1cm4geyB0b2RvcywgbWV0YSB9O1xuICB9XG59KTtcbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVCbG9jayIsIl93aXRoQ3R4IiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlRWxlbWVudFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7OztBQWdCQSxNQUFLLFlBQWEsZ0JBQWE7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFDTixRQUFTO0FBQ1AsUUFBSSxVQUFrQztBQUV0QyxhQUFTLFVBQVU7QUFDakIsVUFBSSxVQUFVLEVBQ1gsS0FBSyxDQUFDLGFBQWdDO0FBQ3JDLGtCQUFVLFNBQVMsUUFBUTtBQUFBLE1BQUEsQ0FDNUI7QUFBQSxJQUNMO0FBRU8sV0FBQTtBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsSUFBQTtBQUFBLEVBUUo7QUFDRixDQUFDOztzQkF0Q0NBLFlBT1MsT0FBQSxFQUFBLE9BQUEscUNBUHNDO0FBQUEsSUFBQSxTQUFBQyxRQUFDLE1BRXRDO0FBQUEsTUFBQUMsZ0JBRnNDLGNBRXRDQyxnQkFBRSxLQUFTLFNBQUEsSUFBRSxLQUVyQixDQUFBO0FBQUEsTUFFU0MsZ0JBQUEsVUFBQTtBQUFBLFFBRkEsU0FBSyxPQUFFLE9BQUEsT0FBQSxLQUFBLElBQUEsU0FBQSxLQUFBLFdBQUEsS0FBQSxRQUFBLEdBQUEsSUFBQTtBQUFBLE1BQUEsR0FBUyxZQUV6QjtBQUFBLElBQUEsQ0FBQTtBQUFBOzs7OzsifQ==
