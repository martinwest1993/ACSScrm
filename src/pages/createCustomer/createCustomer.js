import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { projectStorage } from "../../firebase/config";

// styles
import "./createCustomer.css";

export default function CreateCustomer() {
  const navigate = useNavigate();
  const { addDocument, response } = useFirestore("customers");

  //form field values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoError, setLogoError] = useState(null);
  const [address, setAddress] = useState("");
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    let imgUrl;

    //upload customer logo
    if (logo) {
      const uploadPath = `logos/${name}/${logo.name}`;
      const img = await projectStorage.ref(uploadPath).put(logo);
      imgUrl = await img.ref.getDownloadURL();
    }

    const customer = {
      name,
      email,
      contactNumber,
      logoURL: imgUrl ? imgUrl : "",
      customerBugs: [],
      address,
      complaints: [],
      invoiceHistory: [],
      notes: [],
    };
    console.log(customer);
    await addDocument(customer);

    if (!response.error) {
      navigate("/customers");
    }
  };

  const handleFileChange = (e) => {
    setLogo(null);
    let selected = e.target.files[0];
    console.log(selected);

    if (!selected) {
      setLogoError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setLogoError("Selected file must be an image");
      return;
    }
    if (selected.size > 150000) {
      setLogoError("Image file size must be less than 150kb");
      return;
    }

    setLogoError(null);
    setLogo(selected);
    console.log("Logo updated");
  };
  return (
    <div className="create-form">
      <h2 className="page-title"> Add A New Customer</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Company Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Contact Email:</span>
          <textarea
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></textarea>
        </label>
        <label>
          <span>Contact Number:</span>
          <input
            required
            type="tel"
            onChange={(e) => setContactNumber(e.target.value)}
            value={contactNumber}
          />
        </label>
        <label>
          <span>Company Address:</span>
          <input
            required
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          />
        </label>
        <label>
          <span>Add company Logo:</span>
          <input type="file" onChange={handleFileChange} />
          {logoError && <div className="error">{logoError}</div>}
        </label>
        <button className="btn">Add Customer</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
