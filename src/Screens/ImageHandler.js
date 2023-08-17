import React from 'react';

function ImageHandler({ src, alt, ...props }) {
    return (
        <div>
            <img src={src} alt={alt} {...props} />
        </div>
    );
}

export default ImageHandler;
