<?php

namespace App\Controllers;

use App\Helpers\JWT;
use App\Helpers\Response;
use App\Models\User;
use App\Validators\AuthValidator;

class AuthController
{
    /**
     * POST /api/auth/login
     * Body: { username, password }
     */
    public function login(array $params): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        // Validate
        $errors = AuthValidator::validateLogin($data);
        if (!empty($errors)) {
            Response::error('Validation failed', 422, $errors);
        }

        // Find user
        $user = User::getByUsername($data['username']);
        if (!$user) {
            Response::unauthorized('Invalid username or password');
        }

        // Check active
        if (!$user['is_active']) {
            Response::forbidden('Account is deactivated');
        }

        // Verify password
        if (!password_verify($data['password'], $user['password_hash'])) {
            Response::unauthorized('Invalid username or password');
        }

        // Update last login
        User::updateLastLogin($user['id']);

        // Generate tokens
        $config = require __DIR__ . '/../../config/app.php';
        $accessToken = JWT::encode([
            'sub'           => $user['id'],
            'username'      => $user['username'],
            'role_id'       => $user['role_id'],
            'role_code'     => $user['role_code'],
            'personnel_id'  => $user['personnel_id'],
        ]);
        $refreshToken = JWT::encode([
            'sub'  => $user['id'],
            'type' => 'refresh',
        ]);

        // Return user info (without password)
        unset($user['password_hash']);

        Response::success([
            'access_token'  => $accessToken,
            'refresh_token' => $refreshToken,
            'user'          => $user,
        ], 'Login successful');
    }

    /**
     * POST /api/auth/refresh
     * Body: { refresh_token }
     */
    public function refresh(array $params): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        if (empty($data['refresh_token'])) {
            Response::error('Refresh token is required', 422);
        }

        $payload = JWT::decode($data['refresh_token']);
        if (!$payload || !isset($payload['sub'])) {
            Response::unauthorized('Invalid or expired refresh token');
        }

        $user = User::getById($payload['sub']);
        if (!$user || !$user['is_active']) {
            Response::unauthorized('User not found or deactivated');
        }

        $config = require __DIR__ . '/../../config/app.php';
        $accessToken = JWT::encode([
            'sub'           => $user['id'],
            'username'      => $user['username'],
            'role_id'       => $user['role_id'],
            'role_code'     => $user['role_code'],
            'personnel_id'  => $user['personnel_id'],
        ]);

        Response::success([
            'access_token' => $accessToken,
        ], 'Token refreshed');
    }

    /**
     * GET /api/auth/me
     * Requires Authorization: Bearer <token>
     */
    public function me(array $params): void
    {
        $authUser = self::getAuthenticatedUser();
        if (!$authUser) {
            Response::unauthorized();
        }

        $user = User::getById($authUser['sub']);
        if (!$user) {
            Response::notFound('User not found');
        }

        unset($user['password_hash']);
        Response::success($user);
    }

    /**
     * Get authenticated user from JWT in Authorization header
     */
    public static function getAuthenticatedUser(): ?array
    {
        $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
        if (!preg_match('/^Bearer\s+(.+)$/', $header, $matches)) {
            return null;
        }

        $payload = JWT::decode($matches[1]);
        return $payload;
    }
}
