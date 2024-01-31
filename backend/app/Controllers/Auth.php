<?php

namespace App\Controllers;

use CodeIgniter\API\ResponseTrait;
use App\Models\AuthModel;
use App\Controllers\JWT;

class Auth extends BaseController
{
  use ResponseTrait;

  protected $model;

  public function __construct()
  {
    // Instantiate the AttractionModel in the constructor
    $this->model = new AuthModel();
  }

  public function index()
  {
    // Fetch all attractions
    $data = $this->model->findAll();
    return $this->respond($data);
  }

  public function show($id = null)
  {
    // Fetch a specific attraction by ID
    $data = $this->model->find($id);

    if (!$data) {
      return $this->failNotFound('user not found');
    }

    return $this->respond($data);
  }

  public function register()
  {
    $authModel = new AuthModel();

    // // Get the password from the request
    // $passwordInput = $this->request->getPost('password');

    // // Check if the password is a non-empty string
    // if (is_string($passwordInput) && !empty($passwordInput)) {
    //   // Hash the password
    //   $hashedPassword = password_hash($passwordInput, PASSWORD_BCRYPT);
    //   // Now you can use $hashedPassword as needed
    // } else {
    //   // Handle the case where the password is not a valid string
    //   // You might want to log an error or return a response to the user
    //   echo "Invalid password input";
    // }

    $data = [
      'email' => $this->request->getvar('email'),
      'password' => password_hash($this->request->getVar('password'), PASSWORD_BCRYPT),
      'role' => 'user' // Set role user secara default
    ];

    // Validasi unik email sebelum registrasi
    if ($authModel->getUserByEmail($data['email'])) {
      return $this->fail('Email sudah terdaftar.', 400);
    }

    // Registrasi user
    if ($authModel->registerUser($data)) {
      return $this->respondCreated(['message' => 'Registrasi berhasil']);
    } else {
      return $this->fail('Registrasi gagal.', 500);
    }
  }

  public function login()
  {
    $authModel = new AuthModel();

    $email = $this->request->getVar('email');
    $password = $this->request->getVar('password');

    // Ambil data user berdasarkan email
    $user = $authModel->getUserByEmail($email);

    // Validasi email dan password
    if ($user && password_verify($password, $user['password'])) {

      // $token = JWT::encode($payload, $key);

      $data = [
        'id' => $user['id'],
        'email' => $user['email'],
        'role' => $user['role']
        // 'token' => $token // Include the token in the response data
      ];

      return $this->respond(['data' => $data, 'message' => 'Login berhasil']);
    } else {
      return $this->failUnauthorized('Login gagal. Email atau password salah.');
    }
  }

  public function logout()
  {
    // Implementasi logout sesuai kebutuhan
    // ...

    return $this->respond(['message' => 'Logout berhasil']);
  }
}