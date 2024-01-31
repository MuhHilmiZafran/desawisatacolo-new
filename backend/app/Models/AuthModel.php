<?php

namespace App\Models;

use CodeIgniter\Model;

class AuthModel extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $allowedFields = ['email', 'password', 'role'];

    // Fungsi untuk registrasi user
    public function registerUser($data)
    {
        return $this->insert($data);
    }

    // Fungsi untuk mendapatkan user berdasarkan email
    public function getUserByEmail($email)
    {
        return $this->where('email', $email)->first();
    }
}