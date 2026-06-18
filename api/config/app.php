<?php

return [
    'name'       => 'OPUS API',
    'version'    => '1.0.0',
    'debug'      => getenv('APP_DEBUG') ?: false,
    'jwt_secret' => getenv('JWT_SECRET') ?: 'opus-secret-key-change-in-production',
    'jwt_ttl'    => 900,        // 15 minutes (access token)
    'jwt_refresh_ttl' => 86400, // 24 hours (refresh token)
    'cors' => [
        'allowed_origins' => ['*'],
        'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        'allowed_headers' => ['Content-Type', 'Authorization'],
    ],
    'upload_dir' => __DIR__ . '/../uploads',
];
