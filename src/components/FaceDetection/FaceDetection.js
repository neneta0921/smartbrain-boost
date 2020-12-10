import React from 'react';
import './FaceDetection.css';

const FaceDetection = ({ box, imageUrl }) => {
  //  const createBoundingBox = () => {
  //    const boundingBoxes = boxArray.map((box) => {
  //      return (
  //        <div
  //          className="bounding-box"
  //          style={{
  //            top: box.topRow,
  //            right: box.rightCol,
  //            bottom: box.bottomRow,
  //            left: box.leftCol,
  //          }}></div>
  //      );
  //    });
  //    return boundingBoxes;
  //  };

  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" alt="result" src={imageUrl} width="500px" height="auto" />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}></div>
      </div>
    </div>
  );
};

export default FaceDetection;
