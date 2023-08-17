import React from 'react';

function ImageHandler({ src, alt, style, ...props }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh' }}>
            <img src={src} alt={alt} style={style} {...props} />
        </div>
    );
}

export default ImageHandler;
