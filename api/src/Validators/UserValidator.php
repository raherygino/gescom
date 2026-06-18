<?php

namespace App\Validators;

use App\Models\User;

class UserValidator
{
    public static function validateCreate(array $data): array
    {
        $errors = [];

        if (empty($data['personnel_id'])) {
            $errors['personnel_id'] = 'Personnel is required';
        } elseif (User::personnelHasUser((int) $data['personnel_id'])) {
            $errors['personnel_id'] = 'This personnel already has a user account';
        }

        if (empty($data['username'])) {
            $errors['username'] = 'Username is required';
        } elseif (strlen($data['username']) < 3) {
            $errors['username'] = 'Username must be at least 3 characters';
        } elseif (User::usernameExists($data['username'])) {
            $errors['username'] = 'This username is already taken';
        }

        if (empty($data['password'])) {
            $errors['password'] = 'Password is required';
        } elseif (strlen($data['password']) < 6) {
            $errors['password'] = 'Password must be at least 6 characters';
        }

        if (empty($data['role_id'])) {
            $errors['role_id'] = 'Role is required';
        }

        return $errors;
    }

    public static function validateUpdate(array $data, int $id): array
    {
        $errors = [];

        if (!empty($data['username'])) {
            if (strlen($data['username']) < 3) {
                $errors['username'] = 'Username must be at least 3 characters';
            } elseif (User::usernameExists($data['username'], $id)) {
                $errors['username'] = 'This username is already taken';
            }
        }

        if (!empty($data['password']) && strlen($data['password']) < 6) {
            $errors['password'] = 'Password must be at least 6 characters';
        }

        return $errors;
    }
}
