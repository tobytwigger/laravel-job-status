import { c as createComponent, h as hSlot } from "./render.03bb8eb9.js";
import { j as emptyRenderFn, c as computed, h, a as inject, g as getCurrentInstance, l as layoutKey, G as pageContainerKey } from "./index.2ce80662.js";
import { a as axios } from "./index.aa7156d4.js";
import { C as Config } from "./config.83e19d5f.js";
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
  return get(generateUrl("tracked-job/" + encodeURIComponent(alias))).then(
    (response) => {
      return response.data;
    }
  );
};
const runShow = (jobStatusId) => {
  return get(generateUrl("job-run/" + jobStatusId.toString())).then(
    (response) => {
      return response.data;
    }
  );
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
  return get(
    generateUrl("tracked-job/" + encodeURIComponent(alias) + "/failures")
  ).then((response) => {
    return response.data;
  });
};
const retry = (jobStatusId) => {
  return post(generateUrl("job-run/" + jobStatusId.toString() + "/retry")).then(
    (response) => {
      return;
    }
  );
};
var api = {
  dashboard,
  jobList,
  jobShow,
  runShow,
  history,
  signal,
  batchList,
  batchShow,
  jobFailureReasons,
  retry
};
export { QPage as Q, api as a };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLjYxNmRlM2YzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9wYWdlL1FQYWdlLmpzIiwiLi4vLi4vLi4vZGFzaGJvYXJkL3NyYy91dGlscy9jbGllbnQvcmVxdWVzdEhhbmRsZXIudHMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvc3JjL3V0aWxzL2NsaWVudC91cmxHZW5lcmF0b3IudHMiLCIuLi8uLi8uLi9kYXNoYm9hcmQvc3JjL3V0aWxzL2NsaWVudC9hcGkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaCwgY29tcHV0ZWQsIGluamVjdCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL2NyZWF0ZS5qcydcbmltcG9ydCB7IGhTbG90IH0gZnJvbSAnLi4vLi4vdXRpbHMvcHJpdmF0ZS9yZW5kZXIuanMnXG5pbXBvcnQgeyBwYWdlQ29udGFpbmVyS2V5LCBsYXlvdXRLZXksIGVtcHR5UmVuZGVyRm4gfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlL3N5bWJvbHMuanMnXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUNvbXBvbmVudCh7XG4gIG5hbWU6ICdRUGFnZScsXG5cbiAgcHJvcHM6IHtcbiAgICBwYWRkaW5nOiBCb29sZWFuLFxuICAgIHN0eWxlRm46IEZ1bmN0aW9uXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG5cbiAgICBjb25zdCAkbGF5b3V0ID0gaW5qZWN0KGxheW91dEtleSwgZW1wdHlSZW5kZXJGbilcbiAgICBpZiAoJGxheW91dCA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2UgbmVlZHMgdG8gYmUgYSBkZWVwIGNoaWxkIG9mIFFMYXlvdXQnKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCAkcGFnZUNvbnRhaW5lciA9IGluamVjdChwYWdlQ29udGFpbmVyS2V5LCBlbXB0eVJlbmRlckZuKVxuICAgIGlmICgkcGFnZUNvbnRhaW5lciA9PT0gZW1wdHlSZW5kZXJGbikge1xuICAgICAgY29uc29sZS5lcnJvcignUVBhZ2UgbmVlZHMgdG8gYmUgY2hpbGQgb2YgUVBhZ2VDb250YWluZXInKVxuICAgICAgcmV0dXJuIGVtcHR5UmVuZGVyRm5cbiAgICB9XG5cbiAgICBjb25zdCBzdHlsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IG9mZnNldFxuICAgICAgICA9ICgkbGF5b3V0LmhlYWRlci5zcGFjZSA9PT0gdHJ1ZSA/ICRsYXlvdXQuaGVhZGVyLnNpemUgOiAwKVxuICAgICAgICArICgkbGF5b3V0LmZvb3Rlci5zcGFjZSA9PT0gdHJ1ZSA/ICRsYXlvdXQuZm9vdGVyLnNpemUgOiAwKVxuXG4gICAgICBpZiAodHlwZW9mIHByb3BzLnN0eWxlRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gJGxheW91dC5pc0NvbnRhaW5lci52YWx1ZSA9PT0gdHJ1ZVxuICAgICAgICAgID8gJGxheW91dC5jb250YWluZXJIZWlnaHQudmFsdWVcbiAgICAgICAgICA6ICRxLnNjcmVlbi5oZWlnaHRcblxuICAgICAgICByZXR1cm4gcHJvcHMuc3R5bGVGbihvZmZzZXQsIGhlaWdodClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWluSGVpZ2h0OiAkbGF5b3V0LmlzQ29udGFpbmVyLnZhbHVlID09PSB0cnVlXG4gICAgICAgICAgPyAoJGxheW91dC5jb250YWluZXJIZWlnaHQudmFsdWUgLSBvZmZzZXQpICsgJ3B4J1xuICAgICAgICAgIDogKFxuICAgICAgICAgICAgICAkcS5zY3JlZW4uaGVpZ2h0ID09PSAwXG4gICAgICAgICAgICAgICAgPyAob2Zmc2V0ICE9PSAwID8gYGNhbGMoMTAwdmggLSAkeyBvZmZzZXQgfXB4KWAgOiAnMTAwdmgnKVxuICAgICAgICAgICAgICAgIDogKCRxLnNjcmVlbi5oZWlnaHQgLSBvZmZzZXQpICsgJ3B4J1xuICAgICAgICAgICAgKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgIGBxLXBhZ2UkeyBwcm9wcy5wYWRkaW5nID09PSB0cnVlID8gJyBxLWxheW91dC1wYWRkaW5nJyA6ICcnIH1gXG4gICAgKVxuXG4gICAgcmV0dXJuICgpID0+IGgoJ21haW4nLCB7XG4gICAgICBjbGFzczogY2xhc3Nlcy52YWx1ZSxcbiAgICAgIHN0eWxlOiBzdHlsZS52YWx1ZVxuICAgIH0sIGhTbG90KHNsb3RzLmRlZmF1bHQpKVxuICB9XG59KVxuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSAoXG4gIHVybDogc3RyaW5nLFxuICBkYXRhOiB7IFtrZXk6IHN0cmluZ106IG51bGwgfCBzdHJpbmcgfCBvYmplY3QgfSA9IHt9XG4pID0+IHtcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLCBkYXRhKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXQgPSAoXG4gIHVybDogc3RyaW5nLFxuICBkYXRhOiB7IFtrZXk6IHN0cmluZ106IG51bGwgfCBzdHJpbmcgfCBvYmplY3QgfSA9IHt9XG4pID0+IHtcbiAgcmV0dXJuIGF4aW9zLmdldCh1cmwsIGRhdGEpO1xufTtcbiIsImltcG9ydCBDb25maWcgZnJvbSAnc3JjL3V0aWxzL2NvbmZpZyc7XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVVybCA9IChwYXRoOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkb21haW4gPSBDb25maWcuZ2V0KCkuZG9tYWluID8/ICcnO1xuICBjb25zdCBwcmVQYXRoID0gQ29uZmlnLmdldCgpLnBhdGg7XG5cbiAgcmV0dXJuIChcbiAgICBkb21haW4gK1xuICAgIChkb21haW4uZW5kc1dpdGgoJy8nKSA/ICcnIDogJy8nKSArXG4gICAgcHJlUGF0aCArXG4gICAgKHByZVBhdGguZW5kc1dpdGgoJy8nKSA/ICcnIDogJy8nKSArXG4gICAgJ2FwaS8nICtcbiAgICBwYXRoXG4gICk7XG59O1xuIiwiaW1wb3J0IHsgZ2V0LCBwb3N0IH0gZnJvbSAnc3JjL3V0aWxzL2NsaWVudC9yZXF1ZXN0SGFuZGxlcic7XG5pbXBvcnQge1xuICBCYXRjaCxcbiAgRGFzaGJvYXJkUmVzcG9uc2UsXG4gIEpvYkZhaWx1cmVSZWFzb24sXG4gIEpvYlJ1bixcbiAgVHJhY2tlZEpvYixcbn0gZnJvbSAnc3JjL3R5cGVzL2FwaSc7XG5pbXBvcnQgeyBnZW5lcmF0ZVVybCB9IGZyb20gJ3NyYy91dGlscy9jbGllbnQvdXJsR2VuZXJhdG9yJztcblxuY29uc3QgZGFzaGJvYXJkID0gKCk6IFByb21pc2U8RGFzaGJvYXJkUmVzcG9uc2U+ID0+IHtcbiAgcmV0dXJuIGdldChnZW5lcmF0ZVVybCgnZGFzaGJvYXJkJykpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRlc3Q6ICcnLFxuICAgIH07XG4gIH0pO1xufTtcblxuY29uc3Qgam9iTGlzdCA9ICgpOiBQcm9taXNlPFRyYWNrZWRKb2JbXT4gPT4ge1xuICByZXR1cm4gZ2V0KGdlbmVyYXRlVXJsKCd0cmFja2VkLWpvYicpKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhIGFzIFRyYWNrZWRKb2JbXTtcbiAgfSk7XG59O1xuXG5jb25zdCBqb2JTaG93ID0gKGFsaWFzOiBzdHJpbmcpOiBQcm9taXNlPFRyYWNrZWRKb2I+ID0+IHtcbiAgcmV0dXJuIGdldChnZW5lcmF0ZVVybCgndHJhY2tlZC1qb2IvJyArIGVuY29kZVVSSUNvbXBvbmVudChhbGlhcykpKS50aGVuKFxuICAgIChyZXNwb25zZSkgPT4ge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEgYXMgVHJhY2tlZEpvYjtcbiAgICB9XG4gICk7XG59O1xuXG5jb25zdCBydW5TaG93ID0gKGpvYlN0YXR1c0lkOiBudW1iZXIpOiBQcm9taXNlPEpvYlJ1bj4gPT4ge1xuICByZXR1cm4gZ2V0KGdlbmVyYXRlVXJsKCdqb2ItcnVuLycgKyBqb2JTdGF0dXNJZC50b1N0cmluZygpKSkudGhlbihcbiAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhIGFzIEpvYlJ1bjtcbiAgICB9XG4gICk7XG59O1xuXG5jb25zdCBoaXN0b3J5ID0gKCk6IFByb21pc2U8Sm9iUnVuW10+ID0+IHtcbiAgcmV0dXJuIGdldChnZW5lcmF0ZVVybCgnaGlzdG9yeScpKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhIGFzIEpvYlJ1bltdO1xuICB9KTtcbn07XG5cbmNvbnN0IHNpZ25hbCA9IChcbiAgam9iU3RhdHVzSWQ6IG51bWJlcixcbiAgc2lnbmFsOiBzdHJpbmcsXG4gIGNhbmNlbDogYm9vbGVhbixcbiAgcGFyYW1ldGVyczogeyBba2V5OiBzdHJpbmddOiBhbnkgfVxuKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIHJldHVybiBwb3N0KGdlbmVyYXRlVXJsKCdzaWduYWwvJyArIGpvYlN0YXR1c0lkLnRvU3RyaW5nKCkpLCB7XG4gICAgc2lnbmFsOiBzaWduYWwsXG4gICAgY2FuY2VsX2pvYjogY2FuY2VsID8gJzEnIDogJzAnLFxuICAgIHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMsXG4gIH0pLnRoZW4oKHJlc3BvbnNlKTogdm9pZCA9PiB7XG4gICAgcmV0dXJuO1xuICB9KTtcbn07XG5cbmNvbnN0IGJhdGNoTGlzdCA9ICgpOiBQcm9taXNlPEJhdGNoW10+ID0+IHtcbiAgcmV0dXJuIGdldChnZW5lcmF0ZVVybCgnYmF0Y2gnKSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICByZXR1cm4gcmVzcG9uc2UuZGF0YSBhcyBCYXRjaFtdO1xuICB9KTtcbn07XG5cbmNvbnN0IGJhdGNoU2hvdyA9IChiYXRjaElkOiBudW1iZXIpOiBQcm9taXNlPEJhdGNoPiA9PiB7XG4gIHJldHVybiBnZXQoZ2VuZXJhdGVVcmwoJ2JhdGNoLycgKyBiYXRjaElkLnRvU3RyaW5nKCkpKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgIHJldHVybiByZXNwb25zZS5kYXRhIGFzIEJhdGNoO1xuICB9KTtcbn07XG5cbmNvbnN0IGpvYkZhaWx1cmVSZWFzb25zID0gKGFsaWFzOiBzdHJpbmcpOiBQcm9taXNlPEpvYkZhaWx1cmVSZWFzb25bXT4gPT4ge1xuICByZXR1cm4gZ2V0KFxuICAgIGdlbmVyYXRlVXJsKCd0cmFja2VkLWpvYi8nICsgZW5jb2RlVVJJQ29tcG9uZW50KGFsaWFzKSArICcvZmFpbHVyZXMnKVxuICApLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEgYXMgSm9iRmFpbHVyZVJlYXNvbltdO1xuICB9KTtcbn07XG5cbmNvbnN0IHJldHJ5ID0gKGpvYlN0YXR1c0lkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgcmV0dXJuIHBvc3QoZ2VuZXJhdGVVcmwoJ2pvYi1ydW4vJyArIGpvYlN0YXR1c0lkLnRvU3RyaW5nKCkgKyAnL3JldHJ5JykpLnRoZW4oXG4gICAgKHJlc3BvbnNlKSA9PiB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBkYXNoYm9hcmQsXG4gIGpvYkxpc3QsXG4gIGpvYlNob3csXG4gIHJ1blNob3csXG4gIGhpc3RvcnksXG4gIHNpZ25hbCxcbiAgYmF0Y2hMaXN0LFxuICBiYXRjaFNob3csXG4gIGpvYkZhaWx1cmVSZWFzb25zLFxuICByZXRyeSxcbn07XG4iXSwibmFtZXMiOlsic2lnbmFsIl0sIm1hcHBpbmdzIjoiOzs7O0FBTUEsSUFBQSxRQUFlLGdCQUFnQjtBQUFBLEVBQzdC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
