import { useFormik } from "formik";
import cityJson from "./cities.json";
import { useState } from "react";

function Cities({ getCapital }) {
  const [city] = useState(cityJson);

  const { handleChange, values } = useFormik({
    initialValues: {
      cityName: "",
    },
  });

  const sendCapital = () => {
    getCapital(values.cityName);
  };

  sendCapital();

  return (
    <form>
      <select onChange={handleChange} name="cityName" className="selection">
        {city.map(
          (item) => (
            (<option key={item.id} value={item.name} selected={item.id === 6}>{item.name}</option>)
          )
        )}
      </select>
    </form>
  );
}

export default Cities;
