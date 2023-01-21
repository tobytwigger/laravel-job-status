import Config from "src/utils/config";

const generateUrl = (path: string): string => {
  const domain = Config.get().domain ?? '';
  const prePath = Config.get().path;

  return domain + (domain.endsWith('/') ? '' : '/') +
    prePath + (prePath.endsWith('/') ? '' : '/')

    + 'api/'
    + path;
}

export const dashboard = generateUrl('dashboard');
export const jobList = generateUrl('job-list');
