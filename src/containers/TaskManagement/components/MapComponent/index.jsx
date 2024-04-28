import React, { useEffect, useState } from "react";

const MapComponent = () => {
  const [savedPolyline, setSavedPolyline] = useState(
    JSON.parse(localStorage.getItem("savedPolyline")) || []
  );

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) {
        // Google Maps API already loaded
        initMap(savedPolyline);
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=drawing&callback=initMap`;
      script.defer = true;
      script.async = true;

      script.onload = initMap;

      document.head.appendChild(script);

      return () => {
        // Cleanup function
        document.head.removeChild(script);
      };
    };

    const initMap = (initialPolyline) => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });

      savedPolyline?.forEach((item) => {
        const polyline = new window.google.maps.Polyline({
          path: item?.coordinates,
          strokeColor: "#b00101",
          editable: true,
        });

        polyline?.setMap(map);

        window.google.maps.event.addListener(
          polyline.getPath(),
          "set_at",
          function (index) {
            handlePolylineEdit(item.id, polyline.getPath());
          }
        );

        window.google.maps.event.addListener(
          polyline.getPath(),
          "insert_at",
          function (index) {
            handlePolylineEdit(item.id, polyline.getPath());
          }
        );
      });

      new window.google.maps.KmlLayer({
        url: "https://googlearchive.github.io/js-v2-samples/ggeoxml/cta.kml",
        map: map,
      });

      const drawingManager = new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google.maps.drawing.OverlayType.POLYLINE,
        drawingControl: true,
        drawingControlOptions: {
          position: window.google.maps.ControlPosition.TOP_CENTER,
          drawingModes: [
            // window.google.maps.drawing.OverlayType.MARKER,
            // window.google.maps.drawing.OverlayType.CIRCLE,
            window.google.maps.drawing.OverlayType.POLYGON,
            window.google.maps.drawing.OverlayType.POLYLINE,
            // window.google.maps.drawing.OverlayType.RECTANGLE,
          ],
        },

        polygonOptions: {
          editable: true,
        },

        polylineOptions: {
          editable: true, // Set the polyline to be editable
          strokeColor: `#b00101`,
        },

        circleOptions: {
          fillColor: "#ffff00",
          fillOpacity: 1,
          strokeWeight: 5,
          clickable: false,
          editable: true,
          zIndex: 1,
        },
      });

      drawingManager.setMap(map);

      window.google.maps.event.addListener(
        drawingManager,
        "polylinecomplete",
        function (polyline) {
          // Save the coordinates of the drawn polyline
          const coordinates = polyline.getPath().getArray();
          const newPolyline = {
            id: Date.now(),
            coordinates: coordinates,
          };
          setSavedPolyline((prevPolylines) => [...prevPolylines, newPolyline]);
        }
      );

      // Function to handle polyline edit
      const handlePolylineEdit = (polylineId, path) => {
        const editedCoordinates = path.getArray();

        setSavedPolyline((prevPolylines) =>
          prevPolylines.map((polyline) =>
            polyline.id === polylineId
              ? { ...polyline, coordinates: editedCoordinates }
              : polyline
          )
        );

        localStorage.setItem("savedPolyline", JSON.stringify(savedPolyline));

        console.log("Polyline edited:", editedCoordinates);
      };
    };

    // Load the Google Maps API script
    loadGoogleMapsScript();
  }, [savedPolyline]);

  useEffect(() => {
    if (savedPolyline?.length > 0) {
      localStorage.setItem("savedPolyline", JSON.stringify(savedPolyline));
    }
  }, [savedPolyline]);

  return <div id="map" style={{ height: "500px", width: "100%" }}></div>;
};

export default MapComponent;
