import { c as createComponent, h as hSlot } from "./render.547f37d1.js";
import { j as emptyRenderFn, c as computed, h, a as inject, l as layoutKey, G as pageContainerKey, g as getCurrentInstance } from "./index.805bc4d8.js";
import { a as axios } from "./index.2cf0d985.js";
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
var api = { dashboard, jobList, jobShow, runShow };
export { QPage as Q, api as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLjM3ODE3MTMzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlL1FQYWdlLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy91dGlscy9jbGllbnQvcmVxdWVzdEhhbmRsZXIudHMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvc3JjL3V0aWxzL2NsaWVudC91cmxHZW5lcmF0b3IudHMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvc3JjL3V0aWxzL2NsaWVudC9hcGkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBwYWdlQ29udGFpbmVyS2V5LCBsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUGFnZScsXG5cbiAgcHJvcHM6IHtcbiAgICBwYWRkaW5nOiBCb29sZWFuLFxuICAgIHN0eWxlRm46IEZ1bmN0aW9uXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCAkbGF5b3V0ID0gaW5qZWN0KGxheW91dEtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2UgbmVlZHMgdG8gYmUgYSBkZWVwIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCAkcGFnZUNvbnRhaW5lciA9IGluamVjdChwYWdlQ29udGFpbmVyS2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkcGFnZUNvbnRhaW5lciA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2UgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUVBhZ2VDb250YWluZXInKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG9mZnNldFxuICAgICAgICA9ICgkbGF5b3V0LmhlYWRlci5zcGFjZSA9PT0gdHJ1ZSA/ICRsYXlvdXQuaGVhZGVyLnNpemUgOiAwKVxuICAgICAgICArICgkbGF5b3V0LmZvb3Rlci5zcGFjZSA9PT0gdHJ1ZSA/ICRsYXlvdXQuZm9vdGVyLnNpemUgOiAwKVxuXG4gICAgICBpZiAodHlwZW9mIHByb3BzLnN0eWxlRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJGxheW91dC5jb250YWluZXJIZWlnaHQudmFsdWVcbiAgICAgICAgICA6ICRxLnNjcmVlbi5oZWlnaHRcblxuICAgICAgICByZXR1cm4gcHJvcHMuc3R5bGVGbihvZmZzZXQsIGhlaWdodClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWluSGVpZ2h0OiAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyAoJGxheW91dC5jb250YWluZXJIZWlnaHQudmFsdWUgLSBvZmZzZXQpICsgJ3B4J1xuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICAkcS5zY3JlZW4uaGVpZ2h0ID09PSAwXG4gICAgICAgICAgICAgICAgPyAob2Zmc2V0ICE9PSAwID8gYGNhbGMoMTAwdmggLSAkeyBvZmZzZXQgfXB4KWAgOiAnMTAwdmgnKVxuICAgICAgICAgICAgICAgIDogKCRxLnNjcmVlbi5oZWlnaHQgLSBvZmZzZXQpICsgJ3B4J1xuICAgICAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXBhZ2UkeyBwcm9wcy5wYWRkaW5nID09PSB0cnVlID8gJyBxLWxheW91dC1wYWRkaW5nJyA6ICcnIH1gXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ21haW4nLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSAodXJsOiBzdHJpbmcsIGRhdGE6IHtba2V5OiBzdHJpbmddOiBudWxsfHN0cmluZ3xvYmplY3R9ID0ge30pID0+IHtcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCBkYXRhKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldCA9ICh1cmw6IHN0cmluZywgZGF0YToge1trZXk6IHN0cmluZ106IG51bGx8c3RyaW5nfG9iamVjdH0gPSB7fSkgPT4ge1xuICByZXR1cm4gYXhpb3MuZ2V0KHVybCwgZGF0YSk7XG59XG4iLCJpbXBvcnQgQ29uZmlnIGZyb20gXCJzcmMvdXRpbHMvY29uZmlnXCI7XG5cbmNvbnN0IGdlbmVyYXRlVXJsID0gKHBhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRvbWFpbiA9IENvbmZpZy5nZXQoKS5kb21haW4gPz8gJyc7XG4gIGNvbnN0IHByZVBhdGggPSBDb25maWcuZ2V0KCkucGF0aDtcblxuICByZXR1cm4gZG9tYWluICsgKGRvbWFpbi5lbmRzV2l0aCgnLycpID8gJycgOiAnLycpICtcbiAgICBwcmVQYXRoICsgKHByZVBhdGguZW5kc1dpdGgoJy8nKSA/ICcnIDogJy8nKVxuXG4gICAgKyAnYXBpLydcbiAgICArIHBhdGg7XG59XG5cbmV4cG9ydCBjb25zdCBkYXNoYm9hcmQgPSBnZW5lcmF0ZVVybCgnZGFzaGJvYXJkJyk7XG5leHBvcnQgY29uc3Qgam9iTGlzdCA9IGdlbmVyYXRlVXJsKCd0cmFja2VkLWpvYicpO1xuZXhwb3J0IGNvbnN0IGpvYlNob3cgPSAoYWxpYXM6IHN0cmluZykgPT4gZ2VuZXJhdGVVcmwoJ3RyYWNrZWQtam9iLycgKyBhbGlhcyk7XG5leHBvcnQgY29uc3QgcnVuU2hvdyA9IChqb2JTdGF0dXNJZDogc3RyaW5nKSA9PiBnZW5lcmF0ZVVybCgnam9iLXJ1bi8nICsgam9iU3RhdHVzSWQudG9TdHJpbmcoKSk7XG4iLCJpbXBvcnQge2dldH0gZnJvbSAnc3JjL3V0aWxzL2NsaWVudC9yZXF1ZXN0SGFuZGxlcic7XG5pbXBvcnQge0Rhc2hib2FyZFJlc3BvbnNlLCBKb2JSdW4sIFJlc3VsdHMsIFRyYWNrZWRKb2J9IGZyb20gJ3NyYy90eXBlcy9hcGknO1xuaW1wb3J0IHtcbiAgZGFzaGJvYXJkIGFzIGRhc2hib2FyZFVybCxcbiAgam9iTGlzdCBhcyBqb2JMaXN0VXJsLFxuICBqb2JTaG93IGFzIGpvYlNob3dVcmwsXG4gIHJ1blNob3cgYXMgcnVuU2hvd1VybCxcbn0gZnJvbSAnc3JjL3V0aWxzL2NsaWVudC91cmxHZW5lcmF0b3InO1xuXG5jb25zdCBkYXNoYm9hcmQgPSAoKTogUHJvbWlzZTxEYXNoYm9hcmRSZXNwb25zZT4gPT4ge1xuICByZXR1cm4gZ2V0KGRhc2hib2FyZFVybClcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0ZXN0OiAnJ1xuICAgICAgfVxuICAgIH0pO1xufVxuXG5jb25zdCBqb2JMaXN0ID0gKCk6IFByb21pc2U8UmVzdWx0cz4gPT4ge1xuICByZXR1cm4gZ2V0KGpvYkxpc3RVcmwpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEgYXMgUmVzdWx0cztcbiAgICB9KTtcbn1cblxuY29uc3Qgam9iU2hvdyA9IChhbGlhczogc3RyaW5nKTogUHJvbWlzZTxUcmFja2VkSm9iPiA9PiB7XG4gIHJldHVybiBnZXQoam9iU2hvd1VybChhbGlhcykpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEgYXMgVHJhY2tlZEpvYlxuICAgIH0pXG59XG5cbmNvbnN0IHJ1blNob3cgPSAoam9iU3RhdHVzSWQ6IHN0cmluZyk6IFByb21pc2U8Sm9iUnVuPiA9PiB7XG4gIHJldHVybiBnZXQocnVuU2hvd1VybChqb2JTdGF0dXNJZCkpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEgYXMgSm9iUnVuXG4gICAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQge2Rhc2hib2FyZCwgam9iTGlzdCwgam9iU2hvdywgcnVuU2hvd307XG4iXSwibmFtZXMiOlsiZGFzaGJvYXJkIiwiam9iTGlzdCIsImpvYlNob3ciLCJydW5TaG93IiwiZGFzaGJvYXJkVXJsIiwiam9iTGlzdFVybCIsImpvYlNob3dVcmwiLCJydW5TaG93VXJsIl0sIm1hcHBpbmdzIjoiOzs7O0FBTUEsSUFBQSxRQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxJQUNULFNBQVM7QUFBQSxFQUNWO0FBQUEsRUFFRCxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sRUFBRSxPQUFPLEVBQUUsR0FBSSxFQUFBLElBQUssbUJBQW9CO0FBRTlDLFVBQU0sVUFBVSxPQUFPLFdBQVcsYUFBYTtBQUMvQyxRQUFJLFlBQVksZUFBZTtBQUM3QixjQUFRLE1BQU0sMkNBQTJDO0FBQ3pELGFBQU87QUFBQSxJ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
