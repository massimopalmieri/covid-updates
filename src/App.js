import React, { useEffect, useState } from "react";
import "./styles.css";
import { overwrite, getCode } from "country-list";
import ReactCountryFlag from "react-country-flag";

overwrite([
  { code: "US", name: "USA" },
  { code: "IR", name: "Iran" },
  { code: "GB", name: "UK" },
  { code: "KR", name: "S.-Korea" },
  { code: "RS", name: "Russia" }
]);

export default function App() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    fetch("https://covid-193.p.rapidapi.com/statistics", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": "PUBCquwgABZ9rH1N9=yrhEGktLH7Whrp"
      }
    })
      .then(response => response.json())
      .then(response => setResponse(response))
      .catch(err => {
        console.log(err);
      });
  }, []);
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>country</th>
            <th>cases</th>
            <th>deaths</th>
            <th>recovered</th>
          </tr>
        </thead>
        <tbody>
          {response &&
            response.response
              .filter(item => !["World", "All"].includes(item.country))
              .sort((a, b) => b.cases.total - a.cases.total)
              .map(item => (
                <tr key={item.country}>
                  <td>
                    {getCode(item.country) && (
                      <ReactCountryFlag countryCode={getCode(item.country)} />
                    )}
                    {item.country}
                  </td>
                  <td>{item.cases.total}</td>
                  <td>{item.cases.recovered}</td>
                  <td>{item.deaths.total}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
