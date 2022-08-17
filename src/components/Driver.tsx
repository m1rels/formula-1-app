import React, {useState, useEffect} from "react";
import LoadingIndicator from "./LoadingIndicator";
import { useParams } from "react-router-dom";

export default function Driver() {
  const { driverId } = useParams();
  const [driverStandings, setDriverStandings] = useState(null);

  useEffect(() => {
    const loadDriver = async () => {
        const options = {};

        if (localStorage.getItem("driverStandings") === null) {

          const url = `http://ergast.com/api/f1/drivers/${driverId}.json`;
          const response = await fetch(url, options);
          const driver = await response.json();
          const result = driver.MRData.DriverTable.Drivers;
          setDriverStandings(result[0]);
          localStorage.setItem("drivers/" + driverId, JSON.stringify(result[0]));
          return;

        } else {

          const saved = localStorage.getItem("drivers/" + driverId);
          if (saved) {
            const initialValue = JSON.parse(saved);
            setDriverStandings(initialValue);
          }

        }

  
      };
    loadDriver();
    

  }, []);

  if (!driverStandings) {
    return <LoadingIndicator />;
  }

    return(
      <React.Fragment>
        <h2>{(driverStandings as any).givenName + " " + (driverStandings as any).familyName}</h2>
        <ul className="nav">
          <li className="nav-item">
            Birth of Date: {(driverStandings as any).dateOfBirth}
          </li>
          <li className="nav-item">
            Nationality: {(driverStandings as any).nationality}
          </li>
          <li className="nav-item">
            More Information:<a href={(driverStandings as any).url}>Wikipedia</a>
          </li>
        </ul>
      </React.Fragment>
    );
}