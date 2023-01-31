import { c as createComponent, h as hSlot } from "./render.a10da10b.js";
import { j as emptyRenderFn, c as computed, h, a as inject, g as getCurrentInstance, l as layoutKey, G as pageContainerKey } from "./index.24d2f870.js";
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
const post = (url, data = {}) => {
  return axios.post(url, data);
};
const get = (url, data = {}) => {
  return axios.get(url, data);
};
const generateUrl = (path) => {
  var _a;
  const domain = (_a = Config.get().domain) != null ? _a : "";
  const prePath = Config.get().path;
  return domain + (domain.endsWith("/") ? "" : "/") + prePath + (prePath.endsWith("/") ? "" : "/") + "api/" + path;
};
const dashboard = () => {
  return get(generateUrl("dashboard")).then((response) => {
    return {
      test: ""
    };
  });
};
const jobList = () => {
  return get(generateUrl("tracked-job")).then((response) => {
    return response.data;
  });
};
const jobShow = (alias) => {
  return get(generateUrl("tracked-job/" + alias)).then((response) => {
    return response.data;
  });
};
const runShow = (jobStatusId) => {
  return get(generateUrl("job-run/" + jobStatusId.toString())).then((response) => {
    return response.data;
  });
};
const history = () => {
  return get(generateUrl("history")).then((response) => {
    return response.data;
  });
};
const signal = (jobStatusId, signal2, cancel, parameters) => {
  return post(generateUrl("signal/" + jobStatusId.toString()), {
    signal: signal2,
    cancel_job: cancel ? "1" : "0",
    parameters
  }).then((response) => {
    return;
  });
};
const batchList = () => {
  return get(generateUrl("batch")).then((response) => {
    return response.data;
  });
};
const batchShow = (batchId) => {
  return get(generateUrl("batch/" + batchId.toString())).then((response) => {
    return response.data;
  });
};
const jobFailureReasons = (alias) => {
  return get(generateUrl("tracked-job/" + alias + "/failures")).then((response) => {
    return response.data;
  });
};
var api = { dashboard, jobList, jobShow, runShow, history, signal, batchList, batchShow, jobFailureReasons };
export { QPage as Q, api as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmQ4ZjEwZDMxLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlL1FQYWdlLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy91dGlscy9jbGllbnQvcmVxdWVzdEhhbmRsZXIudHMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvc3JjL3V0aWxzL2NsaWVudC91cmxHZW5lcmF0b3IudHMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvc3JjL3V0aWxzL2NsaWVudC9hcGkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBwYWdlQ29udGFpbmVyS2V5LCBsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUGFnZScsXG5cbiAgcHJvcHM6IHtcbiAgICBwYWRkaW5nOiBCb29sZWFuLFxuICAgIHN0eWxlRm46IEZ1bmN0aW9uXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCAkbGF5b3V0ID0gaW5qZWN0KGxheW91dEtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2UgbmVlZHMgdG8gYmUgYSBkZWVwIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCAkcGFnZUNvbnRhaW5lciA9IGluamVjdChwYWdlQ29udGFpbmVyS2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkcGFnZUNvbnRhaW5lciA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2UgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUVBhZ2VDb250YWluZXInKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG9mZnNldFxuICAgICAgICA9ICgkbGF5b3V0LmhlYWRlci5zcGFjZSA9PT0gdHJ1ZSA/ICRsYXlvdXQuaGVhZGVyLnNpemUgOiAwKVxuICAgICAgICArICgkbGF5b3V0LmZvb3Rlci5zcGFjZSA9PT0gdHJ1ZSA/ICRsYXlvdXQuZm9vdGVyLnNpemUgOiAwKVxuXG4gICAgICBpZiAodHlwZW9mIHByb3BzLnN0eWxlRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJGxheW91dC5jb250YWluZXJIZWlnaHQudmFsdWVcbiAgICAgICAgICA6ICRxLnNjcmVlbi5oZWlnaHRcblxuICAgICAgICByZXR1cm4gcHJvcHMuc3R5bGVGbihvZmZzZXQsIGhlaWdodClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWluSGVpZ2h0OiAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyAoJGxheW91dC5jb250YWluZXJIZWlnaHQudmFsdWUgLSBvZmZzZXQpICsgJ3B4J1xuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICAkcS5zY3JlZW4uaGVpZ2h0ID09PSAwXG4gICAgICAgICAgICAgICAgPyAob2Zmc2V0ICE9PSAwID8gYGNhbGMoMTAwdmggLSAkeyBvZmZzZXQgfXB4KWAgOiAnMTAwdmgnKVxuICAgICAgICAgICAgICAgIDogKCRxLnNjcmVlbi5oZWlnaHQgLSBvZmZzZXQpICsgJ3B4J1xuICAgICAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXBhZ2UkeyBwcm9wcy5wYWRkaW5nID09PSB0cnVlID8gJyBxLWxheW91dC1wYWRkaW5nJyA6ICcnIH1gXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ21haW4nLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSAodXJsOiBzdHJpbmcsIGRhdGE6IHtba2V5OiBzdHJpbmddOiBudWxsfHN0cmluZ3xvYmplY3R9ID0ge30pID0+IHtcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCBkYXRhKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldCA9ICh1cmw6IHN0cmluZywgZGF0YToge1trZXk6IHN0cmluZ106IG51bGx8c3RyaW5nfG9iamVjdH0gPSB7fSkgPT4ge1xuICByZXR1cm4gYXhpb3MuZ2V0KHVybCwgZGF0YSk7XG59XG4iLCJpbXBvcnQgQ29uZmlnIGZyb20gXCJzcmMvdXRpbHMvY29uZmlnXCI7XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVVybCA9IChwYXRoOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkb21haW4gPSBDb25maWcuZ2V0KCkuZG9tYWluID8/ICcnO1xuICBjb25zdCBwcmVQYXRoID0gQ29uZmlnLmdldCgpLnBhdGg7XG5cbiAgcmV0dXJuIGRvbWFpbiArIChkb21haW4uZW5kc1dpdGgoJy8nKSA/ICcnIDogJy8nKSArXG4gICAgcHJlUGF0aCArIChwcmVQYXRoLmVuZHNXaXRoKCcvJykgPyAnJyA6ICcvJylcblxuICAgICsgJ2FwaS8nXG4gICAgKyBwYXRoO1xufVxuXG4iLCJpbXBvcnQge2dldCwgcG9zdH0gZnJvbSAnc3JjL3V0aWxzL2NsaWVudC9yZXF1ZXN0SGFuZGxlcic7XG5pbXBvcnQge0JhdGNoLCBEYXNoYm9hcmRSZXNwb25zZSwgSm9iRmFpbHVyZVJlYXNvbiwgSm9iUnVuLCBUcmFja2VkSm9ifSBmcm9tICdzcmMvdHlwZXMvYXBpJztcbmltcG9ydCB7Z2VuZXJhdGVVcmx9IGZyb20gJ3NyYy91dGlscy9jbGllbnQvdXJsR2VuZXJhdG9yJztcblxuY29uc3QgZGFzaGJvYXJkID0gKCk6IFByb21pc2U8RGFzaGJvYXJkUmVzcG9uc2U+ID0+IHtcbiAgcmV0dXJuIGdldChnZW5lcmF0ZVVybCgnZGFzaGJvYXJkJykpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGVzdDogJydcbiAgICAgIH1cbiAgICB9KTtcbn1cblxuY29uc3Qgam9iTGlzdCA9ICgpOiBQcm9taXNlPFRyYWNrZWRKb2JbXT4gPT4ge1xuICByZXR1cm4gZ2V0KGdlbmVyYXRlVXJsKCd0cmFja2VkLWpvYicpKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhIGFzIFRyYWNrZWRKb2JbXTtcbiAgICB9KTtcbn1cblxuY29uc3Qgam9iU2hvdyA9IChhbGlhczogc3RyaW5nKTogUHJvbWlzZTxUcmFja2VkSm9iPiA9PiB7XG4gIHJldHVybiBnZXQoZ2VuZXJhdGVVcmwoJ3RyYWNrZWQtam9iLycgKyBhbGlhcykpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEgYXMgVHJhY2tlZEpvYlxuICAgIH0pXG59XG5cbmNvbnN0IHJ1blNob3cgPSAoam9iU3RhdHVzSWQ6IG51bWJlcik6IFByb21pc2U8Sm9iUnVuPiA9PiB7XG4gIHJldHVybiBnZXQoZ2VuZXJhdGVVcmwoJ2pvYi1ydW4vJyArIGpvYlN0YXR1c0lkLnRvU3RyaW5nKCkpKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhIGFzIEpvYlJ1blxuICAgIH0pXG59XG5cbmNvbnN0IGhpc3RvcnkgPSAoKTogUHJvbWlzZTxKb2JSdW5bXT4gPT4ge1xuICByZXR1cm4gZ2V0KGdlbmVyYXRlVXJsKCdoaXN0b3J5JykpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YSBhcyBKb2JSdW5bXVxuICAgIH0pXG59XG5cbmNvbnN0IHNpZ25hbCA9IChqb2JTdGF0dXNJZDogbnVtYmVyLCBzaWduYWw6IHN0cmluZywgY2FuY2VsOiBib29sZWFuLCBwYXJhbWV0ZXJzOiB7W2tleTogc3RyaW5nXTogYW55fSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICByZXR1cm4gcG9zdChnZW5lcmF0ZVVybCgnc2lnbmFsLycgKyBqb2JTdGF0dXNJZC50b1N0cmluZygpKSwge1xuICAgIHNpZ25hbDogc2lnbmFsLFxuICAgIGNhbmNlbF9qb2I6IGNhbmNlbCA/ICcxJyA6ICcwJyxcbiAgICBwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzXG4gIH0pXG4gICAgLnRoZW4oKHJlc3BvbnNlKTogdm9pZCA9PiB7XG4gICAgICByZXR1cm47XG4gICAgfSlcbn1cblxuY29uc3QgYmF0Y2hMaXN0ID0gKCk6IFByb21pc2U8QmF0Y2hbXT4gPT4ge1xuICByZXR1cm4gZ2V0KGdlbmVyYXRlVXJsKCdiYXRjaCcpKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhIGFzIEJhdGNoW11cbiAgICB9KVxufVxuXG5jb25zdCBiYXRjaFNob3cgPSAoYmF0Y2hJZDogbnVtYmVyKTogUHJvbWlzZTxCYXRjaD4gPT4ge1xuICByZXR1cm4gZ2V0KGdlbmVyYXRlVXJsKCdiYXRjaC8nICsgYmF0Y2hJZC50b1N0cmluZygpKSlcbiAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YSBhcyBCYXRjaFxuICAgIH0pXG59XG5cbmNvbnN0IGpvYkZhaWx1cmVSZWFzb25zID0gKGFsaWFzOiBzdHJpbmcpOiBQcm9taXNlPEpvYkZhaWx1cmVSZWFzb25bXT4gPT4ge1xuICByZXR1cm4gZ2V0KGdlbmVyYXRlVXJsKCd0cmFja2VkLWpvYi8nICsgYWxpYXMgKyAnL2ZhaWx1cmVzJykpXG4gICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEgYXMgSm9iRmFpbHVyZVJlYXNvbltdXG4gICAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQge2Rhc2hib2FyZCwgam9iTGlzdCwgam9iU2hvdywgcnVuU2hvdywgaGlzdG9yeSwgc2lnbmFsLCBiYXRjaExpc3QsIGJhdGNoU2hvdywgam9iRmFpbHVyZVJlYXNvbnN9O1xuIl0sIm5hbWVzIjpbInNpZ25hbCJdLCJtYXBwaW5ncyI6Ijs7OztBQU1BLElBQUEsUUFBZSxnQkFBZ0I7QUFBQSxFQUM3QixNQUFNO0FBQUEsRUFFTixPQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsSUFDVCxTQUFTO0FBQUEsRUFDVjtBQUFBLEVBRUQsTUFBTyxPQUFPLEVBQUUsU0FBUztBQUN2QixVQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUksRUFBQSxJQUFLLG1CQUFvQjtBQUU5QyxVQUFNLFVBQVUsT0FBTyxXQUFXLGFBQWE7QUFDL0MsUUFBSSxZQUFZLGVBQWU7QUFDN0IsY0FBUSxNQUFNLDJDQUEyQztBQUN6RCxhQUFPO0FBQUEsSUFDUjtBQUVELFVBQU0saUJBQWlCLE9BQU8sa0JBQWtCLGFBQWE7QUFDN0QsUUFBSSxtQkFBbUIsZUFBZTtBQUNwQyxjQUFRLE1BQU0sMkNBQTJDO0FBQ3pELGFBQU87QUFBQSxJQUNSO0FBRUQsVUFBTSxR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
