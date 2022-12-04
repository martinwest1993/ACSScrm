export default function CustomerHeader({ customer }) {
  return (
    <div className="header-container">
      <h2> {customer.name}</h2>
      <div className="header-info-line">
        <h4> Email : {customer.email}</h4>
        <h4> Contact Number : {customer.contactNumber}</h4>
        <h4> Address : {customer.address}</h4>
      </div>
    </div>
  );
}
