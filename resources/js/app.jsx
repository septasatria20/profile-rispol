import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const rawAppName = import.meta.env.VITE_APP_NAME || import.meta.env.APP_NAME || 'RISPOL';
let appName = rawAppName;
// Remove any accidental "Laravel" suffix or occurrences and collapse separators
appName = appName.replace(/laravel/ig, '').replace(/[\-|–—|\/\\]+/g, ' ').trim();
if (!appName) appName = 'RISPOL';

createInertiaApp({
    title: (title) => {
        if (!title) return appName;

        const normalizedTitle = title.toLowerCase();
        const normalizedAppName = appName.toLowerCase();

        if (normalizedTitle.includes(normalizedAppName)) {
            return title;
        }

        return `${title} - ${appName}`;
    },
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
