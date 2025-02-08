import { useState, useEffect } from "react";

const PhoneNumberForm = () => {
  const [toNumber, setToNumber] = useState("");
  const [toNumber1, setToNumber1] = useState("");

  // Load saved numbers from localStorage on component mount
  useEffect(() => {
    const savedPhone = localStorage.getItem("phone");
    const savedPhone1 = localStorage.getItem("phone1");

    if (savedPhone) setToNumber(savedPhone);
    if (savedPhone1) setToNumber1(savedPhone1);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save both numbers to localStorage
    localStorage.setItem("phone", toNumber);
    localStorage.setItem("phone1", toNumber1);

    alert("Phone numbers saved successfully!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Phone Numbers</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phone1" className="block text-sm font-medium mb-1">
            Primary Phone Number
          </label>
          <input
            id="phone1"
            type="tel"
            placeholder="+919835428707"
            value={toNumber}
            onChange={(e) => setToNumber(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            pattern="^\+?[1-9]\d{1,14}$"
            required
          />
        </div>

        <div>
          <label htmlFor="phone2" className="block text-sm font-medium mb-1">
            Secondary Phone Number
          </label>
          <input
            id="phone2"
            type="tel"
            placeholder="+919835428707"
            value={toNumber1}
            onChange={(e) => setToNumber1(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            pattern="^\+?[1-9]\d{1,14}$"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Numbers
        </button>
      </form>
    </div>
  );
};

export default PhoneNumberForm;
