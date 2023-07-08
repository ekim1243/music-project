import React, { forwardRef, useState } from "react";

const Slider = forwardRef(
  ({ className, image, heading, h2, spotifyEmbedCode }, ref) => {
    const [isCardVisible, setCardVisible] = useState(false);

    const handleClick = () => {
      setCardVisible(!isCardVisible);
    };

    return (
      <div ref={ref} className={className}>
        <img src={image} alt={heading} onClick={handleClick} />
        {isCardVisible && (
          <div className="card-content">
            <h2>{heading}</h2>
            <h3>{h2}</h3>
            <div dangerouslySetInnerHTML={{ __html: spotifyEmbedCode }} />
          </div>
        )}
      </div>
    );
  }
);

export default Slider;
