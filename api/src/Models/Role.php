<?php

namespace App\Models;

use App\Database;
use PDO;

class Role
{
    public static function getAll(): array
    {
        $db = Database::getInstance()->getConnection();
        $stmt = $db->query('SELECT * FROM roles ORDER BY name');
        return $stmt->fetchAll();
    }

    public static function getById(int $id): ?array
    {
        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare('SELECT * FROM roles WHERE id = ?');
        $stmt->execute([$id]);
        $role = $stmt->fetch();
        return $role ?: null;
    }

    public static function getByCode(string $code): ?array
    {
        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare('SELECT * FROM roles WHERE code = ?');
        $stmt->execute([$code]);
        $role = $stmt->fetch();
        return $role ?: null;
    }

    public static function create(array $data): int
    {
        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare(
            'INSERT INTO roles (code, name, description) VALUES (?, ?, ?)'
        );
        $stmt->execute([
            $data['code'],
            $data['name'],
            $data['description'] ?? null,
        ]);
        return (int) $db->lastInsertId();
    }

    public static function update(int $id, array $data): bool
    {
        $db = Database::getInstance()->getConnection();
        $fields = [];
        $values = [];

        foreach (['code', 'name', 'description'] as $field) {
            if (isset($data[$field])) {
                $fields[] = "$field = ?";
                $values[] = $data[$field];
            }
        }

        if (empty($fields)) {
            return false;
        }

        $values[] = $id;
        $stmt = $db->prepare(
            'UPDATE roles SET ' . implode(', ', $fields) . ' WHERE id = ?'
        );
        return $stmt->execute($values);
    }

    public static function delete(int $id): bool
    {
        $db = Database::getInstance()->getConnection();
        $stmt = $db->prepare('DELETE FROM roles WHERE id = ?');
        return $stmt->execute([$id]);
    }
}
