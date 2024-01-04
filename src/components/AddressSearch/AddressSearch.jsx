// Styles
import './address-search.scss';

// Dependencies
import { useRef, useState, useEffect } from 'react';

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const SearchLocationInput = ({ setSelectedLocation, setSelectedAddress }) => {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      {
        // types: ["(cities)"],
        componentRestrictions: { country: "ca" },
      }
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();
    console.log(addressObject)

    const query = addressObject.formatted_address;
    let querySplitFiltered = addressObject.formatted_address.split(',').filter((str) => str !== ' Canada');
    for (const str of querySplitFiltered) {
      str.trimStart()
    }

    let queryFormatted = querySplitFiltered.join(',')


    updateQuery(queryFormatted);
    setSelectedAddress(queryFormatted);
    console.log({ query });

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };

    console.log({ latLng });
    setSelectedLocation(latLng);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="address-search">
      <input
        ref={autoCompleteRef}
        className="form-control address-search__input"
        onChange={(event) => setQuery(event.target.value)}
        placeholder="add location"
        value={query}
      />
    </div>
  );
};

export default SearchLocationInput;