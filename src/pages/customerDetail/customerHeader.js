export default function CustomerHeader({ customer }) {
  return (
    <div
      className="header-container"
      style={{
        backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.7), 
            rgba(0, 0, 0, 0.7)
          ),url(${customer.logoURL})`,
        backgroundPosition: "center",
        color: "#fff",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2> {customer.name}</h2>
      <div className="header-info-line">
        <h4> Email : {customer.email}</h4>
        <h4> Contact Number : {customer.contactNumber}</h4>
        <h4> Address : {customer.address}</h4>
      </div>
    </div>
  );
}
