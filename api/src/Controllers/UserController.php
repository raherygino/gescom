<?php

namespace App\Controllers;

use App\Helpers\Response;
use App\Models\User;
use App\Validators\UserValidator;

class UserController
{
    /**
     * GET /api/users
     */
    public function index(array $params): void
    {
        $users = User::getAll();
        Response::success($users);
    }

    /**
     * GET /api/users/{id}
     */
    public function show(array $params): void
    {
        $user = User::getById((int) $params['id']);
        if (!$user) {
            Response::notFound('User not found');
        }
        unset($user['password_hash']);
        Response::success($user);
    }

    /**
     * POST /api/users
     * Body: { personnel_id, username, password, role_id, is_active? }
     *
     * Super Admin selects a Personnel record and creates a User account for them.
     */
    public function store(array $params): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $errors = UserValidator::validateCreate($data);
        if (!empty($errors)) {
            Response::error('Validation failed', 422, $errors);
        }

        $id = User::create($data);
        $user = User::getById($id);
        unset($user['password_hash']);

        Response::created($user, 'User created successfully');
    }

    /**
     * PUT /api/users/{id}
     */
    public function update(array $params): void
    {
        $id = (int) $params['id'];
        $user = User::getById($id);
        if (!$user) {
            Response::notFound('User not found');
        }

        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $errors = UserValidator::validateUpdate($data, $id);
        if (!empty($errors)) {
            Response::error('Validation failed', 422, $errors);
        }

        User::update($id, $data);
        $user = User::getById($id);
        unset($user['password_hash']);

        Response::success($user, 'User updated successfully');
    }

    /**
     * DELETE /api/users/{id}
     */
    public function destroy(array $params): void
    {
        $id = (int) $params['id'];
        $user = User::getById($id);
        if (!$user) {
            Response::notFound('User not found');
        }

        User::delete($id);
        Response::success(null, 'User deleted successfully');
    }
}
