import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

const ComplaintTable = ({ complaints, isAdmin, onDelete }) => (
  <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-panel">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {["Title", "Category", "Location", "Status", "Priority", "Actions"].map((heading) => (
              <th key={heading} className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {complaints.map((complaint) => (
            <tr key={complaint._id} className="hover:bg-slate-50">
              <td className="max-w-xs px-4 py-3 text-sm font-medium text-ink">{complaint.title}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{complaint.category}</td>
              <td className="px-4 py-3 text-sm text-slate-600">{complaint.location}</td>
              <td className="px-4 py-3">
                <StatusBadge value={complaint.status} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge value={complaint.aiAnalysis?.priority} />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link className="btn-secondary px-2.5" to={`/complaints/${complaint._id}`} title="View details">
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link className="btn-secondary px-2.5" to={`/complaints/${complaint._id}/status`} title="Update status">
                    <Pencil className="h-4 w-4" />
                  </Link>
                  {isAdmin && (
                    <button className="btn-danger px-2.5" onClick={() => onDelete(complaint._id)} title="Delete complaint">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {complaints.length === 0 && (
            <tr>
              <td className="px-4 py-10 text-center text-sm text-slate-500" colSpan="6">
                No complaints found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default ComplaintTable;
