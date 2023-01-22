import Config from "src/utils/config";
import {ref} from "vue";

export function useConfig() {
  const config = Config.get();

  const version = ref(config.version);
  const domain = ref(config.domain);
  const path = ref(config.path);
  const assets_in_date = ref(config.assets_in_date);

  return {
    version, domain, path, assets_in_date
  };

}
