const get = (): Config => {
  if (window.JobStatusDashboardConfig === undefined) {
    throw new Error(
      'Job status configuration not found in the window. Have you loaded the package correctly?'
    );
  }
  return window.JobStatusDashboardConfig;
};

export default { get };
