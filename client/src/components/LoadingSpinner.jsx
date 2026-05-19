const LoadingSpinner = ({ label = "Loading..." }) => (
  <div className="flex min-h-[240px] items-center justify-center">
    <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-civic border-t-transparent" />
      {label}
    </div>
  </div>
);

export default LoadingSpinner;
