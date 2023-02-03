const get = () => {
  if (window.JobStatusConfig === void 0) {
    throw new Error(
      "Job status configuratino not found in the window. Have you loaded the package correctly?"
    );
  }
  return window.JobStatusConfig;
};
var Config = { get };
export { Config as C };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLjgzZTE5ZDVmLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvc3JjL3V0aWxzL2NvbmZpZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBnZXQgPSAoKTogQ29uZmlnID0+IHtcbiAgaWYgKHdpbmRvdy5Kb2JTdGF0dXNDb25maWcgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdKb2Igc3RhdHVzIGNvbmZpZ3VyYXRpbm8gbm90IGZvdW5kIGluIHRoZSB3aW5kb3cuIEhhdmUgeW91IGxvYWRlZCB0aGUgcGFja2FnZSBjb3JyZWN0bHk/J1xuICAgICk7XG4gIH1cbiAgcmV0dXJuIHdpbmRvdy5Kb2JTdGF0dXNDb25maWc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7IGdldCB9O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sTUFBTSxNQUFjO0FBQ3BCLE1BQUEsT0FBTyxvQkFBb0IsUUFBVztBQUN4QyxVQUFNLElBQUk7QUFBQSxNQUNSO0FBQUEsSUFBQTtBQUFBLEVBRUo7QUFDQSxTQUFPLE9BQU87QUFDaEI7QUFFQSxJQUFlLFNBQUEsRUFBRSxJQUFJOzsifQ==
