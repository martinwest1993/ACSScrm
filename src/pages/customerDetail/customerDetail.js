import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import CustomerHeader from "./customerHeader";
import CustomerPanel from "./customerPanel";
import { Link } from "react-router-dom";
//styles
import "./customerDetail.css";

export default function CustomerDetail() {
  const { id } = useParams();
  const { error, document } = useDocument("customers", id);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">loading...</div>;
  }

  return (
    <div className="customer-detail-grid">
      <div className="header-grid">
        <CustomerHeader customer={document} />
      </div>
      <Link to={`/customerDetail/${id}/notes`} className="panel-1 panel">
        <CustomerPanel title={"Notes"} />
      </Link>
      <Link to={`/customerDetail/${id}/bugLog`} className="panel-2 panel">
        <CustomerPanel title={"Bug Log"} />
      </Link>
      <Link to={`/customerDetail/${id}/complaints`} className="panel-3 panel">
        <CustomerPanel title={"Complaints"} />
      </Link>
      <Link
        to={`/customerDetail/${id}/invoiceHistory`}
        className="panel-4 panel"
      >
        <CustomerPanel title={"Invoices"} />
      </Link>
    </div>
  );
}
