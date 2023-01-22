import { Q as QPage, a as api } from "./api.9105a2c5.js";
import { _ as _export_sfc, K as defineComponent, L as openBlock, M as createBlock, N as withCtx, J as reactive, P as createTextVNode, Q as toDisplayString, R as createBaseVNode } from "./index.ea2510cc.js";
import "./render.5d8846c3.js";
import "./index.2cf0d985.js";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGFzaGJvYXJkUGFnZS40YTk4ZTIxMS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy9wYWdlcy9EYXNoYm9hcmRQYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLXBhZ2UgY2xhc3M9XCJyb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktZXZlbmx5XCI+XG5cbiAgICBSZXN1bHQ6IHt7YXBpUmVzdWx0fX1cblxuICAgIDxidXR0b24gQGNsaWNrPVwibG9hZEFwaVwiPlxuICAgICAgTG9hZCBBUElcbiAgICA8L2J1dHRvbj5cbiAgPC9xLXBhZ2U+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgZGVmaW5lQ29tcG9uZW50LCByZWFjdGl2ZSB9IGZyb20gJ3Z1ZSc7XG5pbXBvcnQgYXBpIGZyb20gJ3NyYy91dGlscy9jbGllbnQvYXBpJztcbmltcG9ydCB7RGFzaGJvYXJkUmVzcG9uc2V9IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb21wb25lbnQoe1xuICBuYW1lOiAnRGFzaGJvYXJkUGFnZScsXG4gIHNldHVwICgpIHtcbiAgICBsZXQgcmVzdWx0czogRGFzaGJvYXJkUmVzcG9uc2V8bnVsbCA9IG51bGw7XG5cbiAgICBmdW5jdGlvbiBsb2FkQXBpKCkge1xuICAgICAgYXBpLmRhc2hib2FyZCgpXG4gICAgICAgIC50aGVuKChyZXNwb25zZTogRGFzaGJvYXJkUmVzcG9uc2UgKT0+IHtcbiAgICAgICAgICByZXN1bHRzID0gcmVhY3RpdmUocmVzcG9uc2UpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBsb2FkQXBpLFxuICAgICAgcmVzdWx0c1xuICAgIH1cblxuXG4gICAgLy8gY29uc3QgbWV0YSA9IHJlZjxNZXRhPih7XG4gICAgLy8gICB0b3RhbENvdW50OiAxMjAwXG4gICAgLy8gfSk7XG4gICAgLy8gcmV0dXJuIHsgdG9kb3MsIG1ldGEgfTtcbiAgfVxufSk7XG48L3NjcmlwdD5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlQmxvY2siLCJfd2l0aEN0eCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFnQkEsTUFBSyxZQUFhLGdCQUFhO0FBQUEsRUFDN0IsTUFBTTtBQUFBLEVBQ04sUUFBUztBQUNQLFFBQUksVUFBa0M7QUFFdEMsYUFBUyxVQUFVO0FBQ2pCLFVBQUksVUFBVSxFQUNYLEtBQUssQ0FBQyxhQUFnQztBQUNyQyxrQkFBVSxTQUFTLFFBQVE7QUFBQSxNQUFBLENBQzVCO0FBQUEsSUFDTDtBQUVPLFdBQUE7QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLElBQUE7QUFBQSxFQVFKO0FBQ0YsQ0FBQzs7c0JBdENDQSxZQU9TLE9BQUEsRUFBQSxPQUFBLHFDQVBzQztBQUFBLElBQUEsU0FBQUMsUUFBQyxNQUV0QztBQUFBLE1BQUFDLGdCQUZzQyxjQUV0Q0MsZ0JBQUUsS0FBUyxTQUFBLElBQUUsS0FFckIsQ0FBQTtBQUFBLE1BRVNDLGdCQUFBLFVBQUE7QUFBQSxRQUZBLFNBQUssT0FBRSxPQUFBLE9BQUEsS0FBQSxJQUFBLFNBQUEsS0FBQSxXQUFBLEtBQUEsUUFBQSxHQUFBLElBQUE7QUFBQSxNQUFBLEdBQVMsWUFFekI7QUFBQSxJQUFBLENBQUE7QUFBQTs7Ozs7In0=
