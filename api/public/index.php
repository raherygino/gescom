<?php

/**
 * OPUS API — Front Controller
 *
 * Pure PHP REST API (no framework)
 */

// Bootstrap
require __DIR__ . '/../config/bootstrap.php';

use App\Middleware\CorsMiddleware;
use App\Router;
use App\Controllers\AuthController;
use App\Controllers\PersonnelController;
use App\Controllers\UserController;

// --- CORS ---
CorsMiddleware::handle();

// --- Router ---
$router = new Router();

// ========================
// Auth Routes
// ========================
$router->post('/api/auth/login',    [AuthController::class, 'login']);
$router->post('/api/auth/refresh',  [AuthController::class, 'refresh']);
$router->get('/api/auth/me',        [AuthController::class, 'me']);

// ========================
// Personnel Routes
// ========================
$router->get('/api/personnel',              [PersonnelController::class, 'index']);
$router->get('/api/personnel/available',    [PersonnelController::class, 'available']);
$router->get('/api/personnel/{id}',         [PersonnelController::class, 'show']);
$router->post('/api/personnel',             [PersonnelController::class, 'store']);
$router->put('/api/personnel/{id}',         [PersonnelController::class, 'update']);
$router->delete('/api/personnel/{id}',      [PersonnelController::class, 'destroy']);

// ========================
// User Routes
// ========================
$router->get('/api/users',          [UserController::class, 'index']);
$router->get('/api/users/{id}',     [UserController::class, 'show']);
$router->post('/api/users',         [UserController::class, 'store']);
$router->put('/api/users/{id}',     [UserController::class, 'update']);
$router->delete('/api/users/{id}',  [UserController::class, 'destroy']);

// ========================
// Health Check
// ========================
$router->get('/api/health', function () {
    echo json_encode([
        'success' => true,
        'message' => 'OPUS API is running',
        'version' => '1.0.0',
        'time'    => date('c'),
    ]);
});

// --- Dispatch ---
$method = $_SERVER['REQUEST_METHOD'];
$uri    = $_SERVER['REQUEST_URI'];

$router->dispatch($method, $uri);
