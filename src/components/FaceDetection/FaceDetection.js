import React from 'react';
import './FaceDetection.css';

const FaceDetection = ({ boxes, imageUrl }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        {
          imageUrl &&
          <h4>Detected {boxes.length} person.</h4>
        }
        <img id="inputimage" alt="" src={imageUrl} width="500px" height="auto" />
        {
          boxes.map((box, i) => {
            return <div key={i} className="bounding-box" style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
          })
        }
      </div>
    </div>
  );
};

export default FaceDetection;
