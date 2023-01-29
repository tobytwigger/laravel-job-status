const get = (): Config => {
  if(window.JobStatusConfig === undefined) {
    throw new Error('Job status configuratino not found in the window. Have you loaded the package correctly?');
  }
  return window.JobStatusConfig;
};

export default {get}
