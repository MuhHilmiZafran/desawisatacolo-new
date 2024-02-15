<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ProductTransactionModel;

class ProductTransaction extends ResourceController
{
  use ResponseTrait;

  protected $model;

  public function __construct()
  {
    // Instantiate the product_transactionModel in the constructor
    $this->model = new ProductTransactionModel();
  }

  public function index()
  {
    // Fetch all product_transactions
    $data = $this->model->findAll();
    return $this->respond($data);
  }

  public function show($id = null)
  {
    // Fetch a specific product_transaction by ID
    $data = $this->model->find($id);

    if (!$data) {
      return $this->failNotFound('product not found');
    }

    return $this->respond($data);
  }

  public function getByUserId($user_id = null)
  {
    // Validate user_id parameter
    if (!$user_id) {
      return $this->failValidationError('User ID is required');
    }

    // Fetch product_transactions by user_id
    $product_transactions = $this->model->where('user_id', $user_id)->findAll();

    if (empty($product_transactions)) {
      return $this->failNotFound('product_transactions not found for the specified user ID');
    }

    return $this->respond($product_transactions);
  }


  public function create()
  {

    // Validation code can be added here

    // Get the uploaded thumbnail

    // Prepare data for insertion
    $data = [
      'id' => $this->request->getVar('orderId'),
      'user_id' => $this->request->getVar('user_id'),
      'product_id' => $this->request->getVar('product_id'),
      'alamat' => $this->request->getVar('alamat'),
      'amount' => $this->request->getVar('amount'),
      'total_price' => $this->request->getVar('total_price'),
      'status' => "Menunggu Pembayaran",

    ];

    // Insert the data into the database
    $this->model->insert($data);

    // Respond with a success message
    $response = [
      'status' => 201, // HTTP 201 Created
      'error' => null,
      'messages' => [
        'success' => 'product_transaction data inserted successfully'
      ]
    ];

    return $this->respondCreated($response);
  }

  public function update($id = null)
  {
    // // Validation rules
    // $validationRules = [
    //     'name' => 'required',
    //     'image' => 'uploaded[image]|max_size[image,1024]|is_image[image]',
    //     'description' => 'required',
    //     'category_id' => 'required|numeric',
    //     'price' => 'required|numeric',
    // ];

    // Validate input data
    // if (!$this->validate($validationRules)) {
    //     // Respond with validation errors
    //     return $this->failValidationError($this->validator->getErrors());
    // }

    // Get the uploaded image
    if ($this->request->getFile('image')) {
      $data = $this->model->find($id);

      $oldimageFilename = $data['image'];

      $imagePath = FCPATH . 'uploads/' . $oldimageFilename;

      // Check if the file exists and delete it
      if (file_exists($imagePath) && is_file($imagePath)) {
        unlink($imagePath);
      }

      $image = $this->request->getFile('image');
      $newName = $image->getRandomName();
      $image->move('./uploads', $newName);

      // Prepare data for updating
      $data = [
        'image' => $newName,
        'status' => "Menunggu Konfirmasi",

      ];
    } else {
      // Prepare data for updating
      $data = [
        'image' => $this->request->getVar('image'),
        'status' => "Menunggu Konfirmasi",
      ];
    }

    // Update the data in the database
    if ($this->model->update($id, $data)) {
      // Respond with a success message
      $response = [
        'status' => 200, // HTTP 200 OK
        'error' => null,
        'messages' => [
          'success' => 'product_transaction data updated successfully'
        ]
      ];

      return $this->respondUpdated($response);
    } else {
      // Respond with an error message if the update fails
      return $this->fail('Failed to update product_transaction data.');
    }
  }

  public function confirmPayment($id = null)
  {
    $data = $this->model->find($id);

    // Fetch the product_transaction data by ID
    $data = [
      'status' => "Terkonfirmasi",
    ];
    if ($this->model->update($id, $data)) {
      // Respond with a success message
      $response = [
        'status' => 200, // HTTP 200 OK
        'error' => null,
        'messages' => [
          'success' => 'product_transaction data updated successfully'
        ]
      ];

      return $this->respondUpdated($response);
    } else {
      // Respond with a not found error if product_transaction is not found
      return $this->failNotFound('product_transaction not found');
    }
  }

  public function sendWaybill($id = null)
  {
    $data = $this->model->find($id);

    // Fetch the product_transaction data by ID
    $data = [
      'no_resi' => $this->request->getVar('no_resi'),
      'status' => "Terkirim",
    ];
    if ($this->model->update($id, $data)) {
      // Respond with a success message
      $response = [
        'status' => 200, // HTTP 200 OK
        'error' => null,
        'messages' => [
          'success' => 'product_transaction data updated successfully'
        ]
      ];


      return $this->respondUpdated($response);
    } else {
      // Respond with a not found error if product_transaction is not found
      return $this->failNotFound('product_transaction not found');
    }
  }

  public function finish($id = null)
  {
    $data = $this->model->find($id);

    // Fetch the product_transaction data by ID
    $data = [
      'status' => "Selesai",
    ];
    if ($this->model->update($id, $data)) {
      // Respond with a success message
      $response = [
        'status' => 200, // HTTP 200 OK
        'error' => null,
        'messages' => [
          'success' => 'product_transaction data updated successfully'
        ]
      ];


      return $this->respondUpdated($response);
    } else {
      // Respond with a not found error if product_transaction is not found
      return $this->failNotFound('product_transaction not found');
    }
  }


  public function cancelPayment($id = null)
  {
    $data = $this->model->find($id);

    // Fetch the product_transaction data by ID
    $data = [
      'status' => "Dibatalkan",
    ];
    if ($this->model->update($id, $data)) {
      // Respond with a success message
      $response = [
        'status' => 200, // HTTP 200 OK
        'error' => null,
        'messages' => [
          'success' => 'product_transaction data updated successfully'
        ]
      ];


      return $this->respondUpdated($response);
    } else {
      // Respond with a not found error if product_transaction is not found
      return $this->failNotFound('product_transaction not found');
    }
  }


  public function delete($id = null)
  {
    // Fetch the product_transaction data by ID
    $data = $this->model->find($id);

    if ($data) {
      // Get the filename of the image
      $imageFilename = $data['image'];

      // Delete the product_transaction from the database
      $this->model->delete($id);

      // Construct the path to the image file
      $imagePath = FCPATH . 'uploads/' . $imageFilename;

      // Check if the file exists and delete it
      if (file_exists($imagePath) && is_file($imagePath)) {
        unlink($imagePath);
      }

      // Respond with a success message
      $response = [
        'status' => 200, // HTTP 200 OK
        'error' => null,
        'messages' => [
          'success' => 'Article data deleted successfully'
        ]
      ];

      return $this->respondDeleted($response);
    } else {
      // Respond with a not found error if product_transaction is not found
      return $this->failNotFound('product_transaction not found');
    }
  }

  public function getPaymentDeadline($id = null)
  {
    // Fetch product_transaction data by ID
    $product_transaction = $this->model->find($id);

    if (!$product_transaction) {
      return $this->failNotFound('product_transaction not found');
    }

    // Calculate payment deadline (contoh: 7 hari dari created_at)
    $createdAt = strtotime($product_transaction['created_at']);
    $deadline = date('Y-m-d H:i:s', $createdAt + (1 * 24 * 60 * 60));

    return $this->respond(['deadline' => $deadline]);
  }

  public function checkPaymentStatus($id = null)
  {
    // Fetch the specific product_transaction
    $product_transaction = $this->model->find($id);

    if (!$product_transaction) {
      return $this->respond(['message' => 'product_transaction not found'], 404);
    }

    $createdAt = strtotime($product_transaction['created_at']);
    $deadline = $createdAt + (1 * 24 * 60 * 60);

    // Check if the deadline has passed and the product_transaction status is 'Menunggu Pembayaran'
    if (time() > $deadline && $product_transaction['status'] == 'Menunggu Pembayaran') {
      // Update status to 'Cancel'
      $this->model->update($product_transaction['id'], ['status' => 'Cancel']);

      return $this->respond(['message' => 'Payment status updated to Cancel']);
    }

    return $this->respond(['message' => 'Payment status checked']);
  }
}