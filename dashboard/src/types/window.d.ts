interface Config {
  version: string
  path: string
  domain: string
}

interface Window {
  JobStatusConfig?: Config;
}
