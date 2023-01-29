interface Config {
  version: string
  path: string
  domain: string
  assets_in_date: boolean
}

interface Window {
  JobStatusConfig?: Config;
}
