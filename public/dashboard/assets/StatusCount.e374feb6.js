import { Q as QAvatar } from "./QAvatar.793dfca6.js";
import { Q as QChip } from "./QChip.c15cdb8a.js";
import { _ as _export_sfc, K as defineComponent, L as openBlock, S as createElementBlock, M as createBlock, N as withCtx, d as createVNode, P as createTextVNode, Q as toDisplayString } from "./index.24d2f870.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StatusCount",
  props: {
    count: null,
    label: null,
    color: null
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", null, [
        props.count === 0 ? (openBlock(), createBlock(QChip, {
          key: 0,
          dense: ""
        }, {
          default: withCtx(() => [
            createVNode(QAvatar, {
              color: __props.color,
              "text-color": "white"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(props.count), 1)
              ]),
              _: 1
            }, 8, ["color"]),
            createTextVNode(" " + toDisplayString(props.label), 1)
          ]),
          _: 1
        })) : (openBlock(), createBlock(QChip, {
          key: 1,
          dense: "",
          color: props.color,
          "text-color": "white"
        }, {
          default: withCtx(() => [
            createVNode(QAvatar, {
              color: __props.color,
              "text-color": "white"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(props.count), 1)
              ]),
              _: 1
            }, 8, ["color"]),
            createTextVNode(" " + toDisplayString(props.label), 1)
          ]),
          _: 1
        }, 8, ["color"]))
      ]);
    };
  }
});
var StatusCount = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "StatusCount.vue"]]);
export { StatusCount as S };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdHVzQ291bnQuZTM3NGZlYjYuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
