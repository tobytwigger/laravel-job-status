import { a as useSizeProps, e as useSize, Q as QIcon } from "./use-router-link.70d2557d.js";
import { c as createComponent, f as hMergeSlotSafely } from "./render.34f10d21.js";
import { c as computed, h } from "./index.07765cf9.js";
var QAvatar = createComponent({
  name: "QAvatar",
  props: {
    ...useSizeProps,
    fontSize: String,
    color: String,
    textColor: String,
    icon: String,
    square: Boolean,
    rounded: Boolean
  },
  setup(props, { slots }) {
    const sizeStyle = useSize(props);
    const classes = computed(
      () => "q-avatar" + (props.color ? ` bg-${props.color}` : "") + (props.textColor ? ` text-${props.textColor} q-chip--colored` : "") + (props.square === true ? " q-avatar--square" : props.rounded === true ? " rounded-borders" : "")
    );
    const contentStyle = computed(() => props.fontSize ? { fontSize: props.fontSize } : null);
    return () => {
      const icon = props.icon !== void 0 ? [h(QIcon, { name: props.icon })] : void 0;
      return h("div", {
        class: classes.value,
        style: sizeStyle.value
      }, [
        h("div", {
          class: "q-avatar__content row flex-center overflow-hidden",
          style: contentStyle.value
        }, hMergeSlotSafely(slots.default, icon))
      ]);
    };
  }
});
export { QAvatar as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUF2YXRhci41OWIzZTNmMS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vZGFzaGJvYXJkL25vZGVfbW9kdWxlcy9xdWFzYXIvc3JjL2NvbXBvbmVudHMvYXZhdGFyL1FBdmF0YXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQgfSBmcm9tICd2dWUnXG5cbmltcG9ydCBRSWNvbiBmcm9tICcuLi9pY29uL1FJY29uLmpzJ1xuXG5pbXBvcnQgdXNlU2l6ZSwgeyB1c2VTaXplUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlL3VzZS1zaXplLmpzJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhNZXJnZVNsb3RTYWZlbHkgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FBdmF0YXInLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlU2l6ZVByb3BzLFxuXG4gICAgZm9udFNpemU6IFN0cmluZyxcblxuICAgIGNvbG9yOiBTdHJpbmcsXG4gICAgdGV4dENvbG9yOiBTdHJpbmcsXG5cbiAgICBpY29uOiBTdHJpbmcsXG4gICAgc3F1YXJlOiBCb29sZWFuLFxuICAgIHJvdW5kZWQ6IEJvb2xlYW5cbiAgfSxcblxuICBzZXR1cCAocHJvcHMsIHsgc2xvdHMgfSkge1xuICAgIGNvbnN0IHNpemVTdHlsZSA9IHVzZVNpemUocHJvcHMpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWF2YXRhcidcbiAgICAgICsgKHByb3BzLmNvbG9yID8gYCBiZy0keyBwcm9wcy5jb2xvciB9YCA6ICcnKVxuICAgICAgKyAocHJvcHMudGV4dENvbG9yID8gYCB0ZXh0LSR7IHByb3BzLnRleHRDb2xvciB9IHEtY2hpcC0tY29sb3JlZGAgOiAnJylcbiAgICAgICsgKFxuICAgICAgICBwcm9wcy5zcXVhcmUgPT09IHRydWVcbiAgICAgICAgICA/ICcgcS1hdmF0YXItLXNxdWFyZSdcbiAgICAgICAgICA6IChwcm9wcy5yb3VuZGVkID09PSB0cnVlID8gJyByb3VuZGVkLWJvcmRlcnMnIDogJycpXG4gICAgICApXG4gICAgKVxuXG4gICAgY29uc3QgY29udGVudFN0eWxlID0gY29tcHV0ZWQoKCkgPT4gKFxuICAgICAgcHJvcHMuZm9udFNpemVcbiAgICAgICAgPyB7IGZvbnRTaXplOiBwcm9wcy5mb250U2l6ZSB9XG4gICAgICAgIDogbnVsbFxuICAgICkpXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgaWNvbiA9IHByb3BzLmljb24gIT09IHZvaWQgMFxuICAgICAgICA/IFsgaChRSWNvbiwgeyBuYW1lOiBwcm9wcy5pY29uIH0pIF1cbiAgICAgICAgOiB2b2lkIDBcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWUsXG4gICAgICAgIHN0eWxlOiBzaXplU3R5bGUudmFsdWVcbiAgICAgIH0sIFtcbiAgICAgICAgaCgnZGl2Jywge1xuICAgICAgICAgIGNsYXNzOiAncS1hdmF0YXJfX2NvbnRlbnQgcm93IGZsZXgtY2VudGVyIG92ZXJmbG93LWhpZGRlbicsXG4gICAgICAgICAgc3R5bGU6IGNvbnRlbnRTdHlsZS52YWx1ZVxuICAgICAgICB9LCBoTWVyZ2VTbG90U2FmZWx5KHNsb3RzLmRlZmF1bHQsIGljb24pKVxuICAgICAgXSlcbiAgICB9XG4gIH1cbn0pXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBU0EsSUFBQSxVQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUVILFVBQVU7QUFBQSxJQUVWLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUVYLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFNBQVM7QUFBQSxFQUNWO0FBQUEsRUFFRCxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sWUFBWSxRQUFRLEtBQUs7QUFFL0IsVUFBTSxVQUFVO0FBQUEsTUFBUyxNQUN2QixjQUNHLE1BQU0sUUFBUSxPQUFRLE1BQU0sVUFBVyxPQUN2QyxNQUFNLFlBQVksU0FBVSxNQUFNLDhCQUErQixPQUVsRSxNQUFNLFdBQVcsT0FDYixzQkFDQyxNQUFNLFlBQVksT0FBTyxxQkFBcUI7QUFBQSxJQUV0RDtBQUVELFVBQU0sZUFBZSxTQUFTLE1BQzVCLE1BQU0sV0FDRixFQUFFLFVBQVUsTUFBTSxTQUFVLElBQzVCLElBQ0w7QUFFRCxXQUFPLE1BQU07QUFDWCxZQUFNLE9BQU8sTUFBTSxTQUFTLFNBQ3hCLENBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLEtBQUksQ0FBRSxDQUFHLElBQ2xDO0FBRUosYUFBTyxFQUFFLE9BQU87QUFBQSxRQUNkLE9BQU8sUUFBUTtBQUFBLFFBQ2YsT0FBTyxVQUFVO0FBQUEsTUFDekIsR0FBUztBQUFBLFFBQ0QsRUFBRSxPQUFPO0FBQUEsVUFDUCxPQUFPO0FBQUEsVUFDUCxPQUFPLGFBQWE7QUFBQSxRQUNyQixHQUFFLGlCQUFpQixNQUFNLFNBQVMsSUFBSSxDQUFDO0FBQUEsTUFDaEQsQ0FBTztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0gsQ0FBQzs7In0=
