import Config from 'src/utils/config';

export const generateUrl = (path: string): string => {
  const domain = Config.get().domain ?? '';
  const prePath = Config.get().path;

  return (
    domain +
    (domain.endsWith('/') ? '' : '/') +
    prePath +
    (prePath.endsWith('/') ? '' : '/') +
    'api/' +
    path
  );
};
