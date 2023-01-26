import { c as createComponent, h as hSlot } from "./render.80a4b5ad.js";
import { j as emptyRenderFn, c as computed, h, a as inject, g as getCurrentInstance, l as layoutKey, G as pageContainerKey } from "./index.a2d3f53c.js";
import { a as axios } from "./index.aa7156d4.js";
import { C as Config } from "./config.b6f61684.js";
var QPage = createComponent({
  name: "QPage",
  props: {
    padding: Boolean,
    styleFn: Function
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QPage needs to be a deep child of QLayout");
      return emptyRenderFn;
    }
    const $pageContainer = inject(pageContainerKey, emptyRenderFn);
    if ($pageContainer === emptyRenderFn) {
      console.error("QPage needs to be child of QPageContainer");
      return emptyRenderFn;
    }
    const style = computed(() => {
      const offset = ($layout.header.space === true ? $layout.header.size : 0) + ($layout.footer.space === true ? $layout.footer.size : 0);
      if (typeof props.styleFn === "function") {
        const height = $layout.isContainer.value === true ? $layout.containerHeight.value : $q.screen.height;
        return props.styleFn(offset, height);
      }
      return {
        minHeight: $layout.isContainer.value === true ? $layout.containerHeight.value - offset + "px" : $q.screen.height === 0 ? offset !== 0 ? `calc(100vh - ${offset}px)` : "100vh" : $q.screen.height - offset + "px"
      };
    });
    const classes = computed(
      () => `q-page${props.padding === true ? " q-layout-padding" : ""}`
    );
    return () => h("main", {
      class: classes.value,
      style: style.value
    }, hSlot(slots.default));
  }
});
const get = (url, data = {}) => {
  return axios.get(url, data);
};
const generateUrl = (path) => {
  var _a;
  const domain = (_a = Config.get().domain) != null ? _a : "";
  const prePath = Config.get().path;
  return domain + (domain.endsWith("/") ? "" : "/") + prePath + (prePath.endsWith("/") ? "" : "/") + "api/" + path;
};
const dashboard$1 = generateUrl("dashboard");
const jobList$1 = generateUrl("tracked-job");
const jobShow$1 = (alias) => generateUrl("tracked-job/" + alias);
const runShow$1 = (jobStatusId) => generateUrl("job-run/" + jobStatusId.toString());
const history$1 = generateUrl("history");
const dashboard = () => {
  return get(dashboard$1).then((response) => {
    return {
      test: ""
    };
  });
};
const jobList = () => {
  return get(jobList$1).then((response) => {
    return response.data;
  });
};
const jobShow = (alias) => {
  return get(jobShow$1(alias)).then((response) => {
    return response.data;
  });
};
const runShow = (jobStatusId) => {
  return get(runShow$1(jobStatusId)).then((response) => {
    return response.data;
  });
};
const history = () => {
  return get(history$1).then((response) => {
    return response.data;
  });
};
var api = { dashboard, jobList, jobShow, runShow, history };
export { QPage as Q, api as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmI3MGI4N2M4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlL1FQYWdlLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy91dGlscy9jbGllbnQvcmVxdWVzdEhhbmRsZXIudHMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvc3JjL3V0aWxzL2NsaWVudC91cmxHZW5lcmF0b3IudHMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvc3JjL3V0aWxzL2NsaWVudC9hcGkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBwYWdlQ29udGFpbmVyS2V5LCBsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUGFnZScsXG5cbiAgcHJvcHM6IHtcbiAgICBwYWRkaW5nOiBCb29sZWFuLFxuICAgIHN0eWxlRm46IEZ1bmN0aW9uXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCAkbGF5b3V0ID0gaW5qZWN0KGxheW91dEtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2UgbmVlZHMgdG8gYmUgYSBkZWVwIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCAkcGFnZUNvbnRhaW5lciA9IGluamVjdChwYWdlQ29udGFpbmVyS2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkcGFnZUNvbnRhaW5lciA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2UgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUVBhZ2VDb250YWluZXInKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG9mZnNldFxuICAgICAgICA9ICgkbGF5b3V0LmhlYWRlci5zcGFjZSA9PT0gdHJ1ZSA/ICRsYXlvdXQuaGVhZGVyLnNpemUgOiAwKVxuICAgICAgICArICgkbGF5b3V0LmZvb3Rlci5zcGFjZSA9PT0gdHJ1ZSA/ICRsYXlvdXQuZm9vdGVyLnNpemUgOiAwKVxuXG4gICAgICBpZiAodHlwZW9mIHByb3BzLnN0eWxlRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJGxheW91dC5jb250YWluZXJIZWlnaHQudmFsdWVcbiAgICAgICAgICA6ICRxLnNjcmVlbi5oZWlnaHRcblxuICAgICAgICByZXR1cm4gcHJvcHMuc3R5bGVGbihvZmZzZXQsIGhlaWdodClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWluSGVpZ2h0OiAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyAoJGxheW91dC5jb250YWluZXJIZWlnaHQudmFsdWUgLSBvZmZzZXQpICsgJ3B4J1xuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICAkcS5zY3JlZW4uaGVpZ2h0ID09PSAwXG4gICAgICAgICAgICAgICAgPyAob2Zmc2V0ICE9PSAwID8gYGNhbGMoMTAwdmggLSAkeyBvZmZzZXQgfXB4KWAgOiAnMTAwdmgnKVxuICAgICAgICAgICAgICAgIDogKCRxLnNjcmVlbi5oZWlnaHQgLSBvZmZzZXQpICsgJ3B4J1xuICAgICAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXBhZ2UkeyBwcm9wcy5wYWRkaW5nID09PSB0cnVlID8gJyBxLWxheW91dC1wYWRkaW5nJyA6ICcnIH1gXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ21haW4nLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSAodXJsOiBzdHJpbmcsIGRhdGE6IHtba2V5OiBzdHJpbmddOiBudWxsfHN0cmluZ3xvYmplY3R9ID0ge30pID0+IHtcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCBkYXRhKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldCA9ICh1cmw6IHN0cmluZywgZGF0YToge1trZXk6IHN0cmluZ106IG51bGx8c3RyaW5nfG9iamVjdH0gPSB7fSkgPT4ge1xuICByZXR1cm4gYXhpb3MuZ2V0KHVybCwgZGF0YSk7XG59XG4iLCJpbXBvcnQgQ29uZmlnIGZyb20gXCJzcmMvdXRpbHMvY29uZmlnXCI7XG5cbmNvbnN0IGdlbmVyYXRlVXJsID0gKHBhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRvbWFpbiA9IENvbmZpZy5nZXQoKS5kb21haW4gPz8gJyc7XG4gIGNvbnN0IHByZVBhdGggPSBDb25maWcuZ2V0KCkucGF0aDtcblxuICByZXR1cm4gZG9tYWluICsgKGRvbWFpbi5lbmRzV2l0aCgnLycpID8gJycgOiAnLycpICtcbiAgICBwcmVQYXRoICsgKHByZVBhdGguZW5kc1dpdGgoJy8nKSA/ICcnIDogJy8nKVxuXG4gICAgKyAnYXBpLydcbiAgICArIHBhdGg7XG59XG5cbmV4cG9ydCBjb25zdCBkYXNoYm9hcmQgPSBnZW5lcmF0ZVVybCgnZGFzaGJvYXJkJyk7XG5leHBvcnQgY29uc3Qgam9iTGlzdCA9IGdlbmVyYXRlVXJsKCd0cmFja2VkLWpvYicpO1xuZXhwb3J0IGNvbnN0IGpvYlNob3cgPSAoYWxpYXM6IHN0cmluZykgPT4gZ2VuZXJhdGVVcmwoJ3RyYWNrZWQtam9iLycgKyBhbGlhcyk7XG5leHBvcnQgY29uc3QgcnVuU2hvdyA9IChqb2JTdGF0dXNJZDogbnVtYmVyKSA9PiBnZW5lcmF0ZVVybCgnam9iLXJ1bi8nICsgam9iU3RhdHVzSWQudG9TdHJpbmcoKSk7XG5leHBvcnQgY29uc3QgaGlzdG9yeSA9IGdlbmVyYXRlVXJsKCdoaXN0b3J5Jyk7XG4iLCJpbXBvcnQge2dldH0gZnJvbSAnc3JjL3V0aWxzL2NsaWVudC9yZXF1ZXN0SGFuZGxlcic7XG5pbXBvcnQge0Rhc2hib2FyZFJlc3BvbnNlLCBKb2JSdW4sIFJlc3VsdHMsIFRyYWNrZWRKb2J9IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuaW1wb3J0IHtcbiAgZGFzaGJvYXJkIGFzIGRhc2hib2FyZFVybCxcbiAgam9iTGlzdCBhcyBqb2JMaXN0VXJsLFxuICBqb2JTaG93IGFzIGpvYlNob3dVcmwsXG4gIHJ1blNob3cgYXMgcnVuU2hvd1VybCxcbiAgaGlzdG9yeSBhcyBoaXN0b3J5VXJsLFxufSBmcm9tICdzcmMvdXRpbHMvY2xpZW50L3VybEdlbmVyYXRvcic7XG5cbmNvbnN0IGRhc2hib2FyZCA9ICgpOiBQcm9taXNlPERhc2hib2FyZFJlc3BvbnNlPiA9PiB7XG4gIHJldHVybiBnZXQoZGFzaGJvYXJkVXJsKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRlc3Q6ICcnXG4gICAgICB9XG4gICAgfSk7XG59XG5cbmNvbnN0IGpvYkxpc3QgPSAoKTogUHJvbWlzZTxSZXN1bHRzPiA9PiB7XG4gIHJldHVybiBnZXQoam9iTGlzdFVybClcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YSBhcyBSZXN1bHRzO1xuICAgIH0pO1xufVxuXG5jb25zdCBqb2JTaG93ID0gKGFsaWFzOiBzdHJpbmcpOiBQcm9taXNlPFRyYWNrZWRKb2I+ID0+IHtcbiAgcmV0dXJuIGdldChqb2JTaG93VXJsKGFsaWFzKSlcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YSBhcyBUcmFja2VkSm9iXG4gICAgfSlcbn1cblxuY29uc3QgcnVuU2hvdyA9IChqb2JTdGF0dXNJZDogbnVtYmVyKTogUHJvbWlzZTxKb2JSdW4+ID0+IHtcbiAgcmV0dXJuIGdldChydW5TaG93VXJsKGpvYlN0YXR1c0lkKSlcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YSBhcyBKb2JSdW5cbiAgICB9KVxufVxuXG5jb25zdCBoaXN0b3J5ID0gKCk6IFByb21pc2U8Sm9iUnVuW10+ID0+IHtcbiAgcmV0dXJuIGdldChoaXN0b3J5VXJsKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEgYXMgSm9iUnVuW11cbiAgICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCB7ZGFzaGJvYXJkLCBqb2JMaXN0LCBqb2JTaG93LCBydW5TaG93LCBoaXN0b3J5fTtcbiJdLCJuYW1lcyI6WyJkYXNoYm9hcmQiLCJqb2JMaXN0Iiwiam9iU2hvdyIsInJ1blNob3ciLCJoaXN0b3J5IiwiZGFzaGJvYXJkVXJsIiwiam9iTGlzdFVybCIsImpvYlNob3dVcmwiLCJydW5TaG93VXJsIiwiaGlzdG9yeVVybCJdLCJtYXBwaW5ncyI6Ijs7OztBQU1BLElB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
