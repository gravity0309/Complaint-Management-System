const FormField = ({ label, error, children }) => (
  <label className="block space-y-1.5">
    <span className="label">{label}</span>
    {children}
    {error && <span className="text-xs text-red-600">{error}</span>}
  </label>
);

export default FormField;
