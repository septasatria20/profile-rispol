<?php

return [
    'build_path' => env('VITE_BUILD_PATH', 'build'),
    'manifest' => env('VITE_MANIFEST_NAME', 'manifest.json'),
    'hot_file' => env('VITE_HOT_FILE', storage_path('app/vite.hot')),
];
