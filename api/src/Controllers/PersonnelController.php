<?php

namespace App\Controllers;

use App\Helpers\Response;
use App\Models\Personnel;
use App\Models\User;
use App\Validators\PersonnelValidator;

class PersonnelController
{
    /**
     * GET /api/personnel
     * GET /api/personnel?status=active&search=diop
     */
    public function index(array $params): void
    {
        $filters = [];
        if (isset($_GET['status'])) {
            $filters['status'] = $_GET['status'];
        }
        if (isset($_GET['grade'])) {
            $filters['grade'] = $_GET['grade'];
        }
        if (isset($_GET['search'])) {
            $filters['search'] = $_GET['search'];
        }

        $list = Personnel::getAll($filters);
        Response::success($list);
    }

    /**
     * GET /api/personnel/available
     * Personnel without user accounts (for user creation dropdown)
     */
    public function available(array $params): void
    {
        $list = Personnel::getAvailableForUser();
        Response::success($list);
    }

    /**
     * GET /api/personnel/{id}
     */
    public function show(array $params): void
    {
        $person = Personnel::getById((int) $params['id']);
        if (!$person) {
            Response::notFound('Personnel not found');
        }

        // Include linked user if exists
        // (We don't expose password_hash here since it's in users table)
        Response::success($person);
    }

    /**
     * POST /api/personnel
     */
    public function store(array $params): void
    {
        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $errors = PersonnelValidator::validateCreate($data);
        if (!empty($errors)) {
            Response::error('Validation failed', 422, $errors);
        }

        $id = Personnel::create($data);
        $person = Personnel::getById($id);

        Response::created($person, 'Personnel created successfully');
    }

    /**
     * PUT /api/personnel/{id}
     */
    public function update(array $params): void
    {
        $id = (int) $params['id'];
        $person = Personnel::getById($id);
        if (!$person) {
            Response::notFound('Personnel not found');
        }

        $data = json_decode(file_get_contents('php://input'), true) ?? [];

        $errors = PersonnelValidator::validateCreate($data, $id);
        if (!empty($errors)) {
            Response::error('Validation failed', 422, $errors);
        }

        Personnel::update($id, $data);
        $person = Personnel::getById($id);

        Response::success($person, 'Personnel updated successfully');
    }

    /**
     * DELETE /api/personnel/{id}
     */
    public function destroy(array $params): void
    {
        $id = (int) $params['id'];
        $person = Personnel::getById($id);
        if (!$person) {
            Response::notFound('Personnel not found');
        }

        // Check if linked to a user
        if (User::personnelHasUser($id)) {
            Response::error('Cannot delete personnel linked to a user account. Remove the user account first.', 409);
        }

        Personnel::delete($id);
        Response::success(null, 'Personnel deleted successfully');
    }
}
