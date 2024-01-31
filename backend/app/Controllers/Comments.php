<?php

namespace App\Controllers;

use App\Models\CommentModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

class Comments extends ResourceController
{
  use ResponseTrait;

  protected $model;

  public function __construct()
  {
    $this->model = new CommentModel();
  }

  public function index()
  {
    $data = $this->model->findAll();
    return $this->respond($data);
  }

  public function show($id = null)
  {
    // Fetch a specific attraction by ID
    $data = $this->model->find($id);

    if (!$data) {
      return $this->failNotFound('Komentar tidak ditemukan');
    }

    return $this->respond($data);
  }

  public function create()
  {
    // Validation code can be added here
    $data = [
      'comment' => $this->request->getVar('comment'),
      'attraction_id' => $this->request->getVar('attraction_id'),
      'user_id' => $this->request->getVar('user_id'),
    ];
    // Insert the data into the database
    $this->model->save($data);

    // // Respond with a success message
    $response = [
      'status' => 201, // HTTP 201 Created
      'error' => null,
      'messages' => [
        'success' => 'Komentar berhasil dikirim'
      ]
    ];
    return $this->respondCreated($response);
  }

  public function update($id = null)
  {
    // Fetch the contact data by ID
    $data = $this->model->find($id);

    if (!$data) {
      return $this->failNotFound('komentar tidak ditemukan');
    }

    // Get the new data from the request
    $newData = [
      'comment' => $this->request->getVar('comment'),
      'attraction_id' => $this->request->getVar('attraction_id'),
      'user_id' => $this->request->getVar('user_id'),
    ];

    // Update the contact in the database
    $this->model->update($id, $newData);

    // Respond with a success message
    $response = [
      'status' => 200, // HTTP 200 OK
      'error' => null,
      'messages' => [
        'success' => 'Komentar sukses diupdate'
      ]
    ];

    return $this->respond($response);
  }

  public function delete($id = null)
  {
    // Fetch the attraction data by ID
    $data = $this->model->find($id);

    if ($data) {
      // Delete the attraction from the database
      $this->model->delete($id);

      // Respond with a success message
      $response = [
        'status' => 200, // HTTP 200 OK
        'error' => null,
        'messages' => [
          'success' => 'Komentar berhasil dihapus'
        ]
      ];

      return $this->respondDeleted($response);
    } else {
      // Respond with a not found error if attraction is not found
      return $this->failNotFound('Komentar tidak ditemukan');
    }
  }

  public function getCommentsByContentId($contentId)
  {
    // Fetch comments by content id from the database
    $data = $this->model->where('attraction_id', $contentId)->findAll();

    // If no comments are found, return an empty array with a 200 status code
    if (!$data) {
      return $this->respond([]);
    }

    return $this->respond($data);
  }
  public function getCommentCountByContentId($contentId)
  {
    // Fetch the count of comments by content ID from the database
    $count = $this->model->where('attraction_id', $contentId)->countAllResults();

    // Create a response array
    $response = [
      'status' => 200, // HTTP 200 OK
      'error' => null,
      'count' => $count,
    ];

    return $this->respond($response);
  }
}