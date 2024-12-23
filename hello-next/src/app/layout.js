import React from 'react';

import './styles.css';

function RootLayout({children}) {
    const timestamp = new Date().toLocaleString();

    return (
        <html lang="en">
        <body>
        {children}

        <footer>
            <p>Generated at {timestamp}</p>
        </footer>
        </body>
        </html>
    );
}

export default RootLayout;
