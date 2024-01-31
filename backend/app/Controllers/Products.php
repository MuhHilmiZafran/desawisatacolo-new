<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ProductModel;

class Products extends ResourceController
{
    use ResponseTrait;

    protected $model;

    public function __construct()
    {
        // Instantiate the AttractionModel in the constructor
        $this->model = new ProductModel();
    }

    public function index()
    {
        // Fetch all Product
        $data = $this->model->findAll();
        return $this->respond($data);
    }

    public function countProduct()
    {
        // Count the total number of Product
        $totalProduct = $this->model->countAll();

        // Respond with the count
        $response = [
            'status' => 200, // HTTP 200 OK
            'error' => null,
            'data' => [
                'total_product' => $totalProduct,
            ],
            'messages' => [
                'success' => 'Attraction count retrieved successfully'
            ]
        ];

        return $this->respond($response);
    }

    public function show($id = null)
    {
        // Fetch a specific attraction by ID
        $data = $this->model->find($id);

        if (!$data) {
            return $this->failNotFound('Article not found');
        }

        return $this->respond($data);
    }

    public function create()
    {

        // Validation code can be added here

        // Get the uploaded thumbnail
        $image = $this->request->getFile('image');

        if ($image->isValid() && !$image->hasMoved()) {
            // Generate a random name and move the image to the uploads directory
            $newName = $image->getRandomName();
            $image->move('./uploads', $newName);

            // Prepare data for insertion
            $data = [
                'name' => $this->request->getVar('name'),
                'image' => $newName,
                'description' => $this->request->getVar('description'),
                'price' => $this->request->getVar('price'),
                'amount' => $this->request->getVar('amount'),

            ];

            // Insert the data into the database
            $this->model->save($data);

            // Respond with a success message
            $response = [
                'status' => 201, // HTTP 201 Created
                'error' => null,
                'messages' => [
                    'success' => 'Article data inserted successfully'
                ]
            ];

            return $this->respondCreated($response);
        } else {
            // Respond with a validation error if image is not valid
            return $this->failValidationError($image->getErrorString());
        }
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
                'name' => $this->request->getVar('name'),
                'image' => $newName,
                'description' => $this->request->getVar('description'),
                'price' => $this->request->getVar('price'),
                'amount' => $this->request->getVar('amount'),
            ];
        } else {
            // Prepare data for updating
            $data = [
                'name' => $this->request->getVar('name'),
                'image' => $this->request->getVar('image'),
                'description' => $this->request->getVar('description'),
                'price' => $this->request->getVar('price'),
                'amount' => $this->request->getVar('amount'),
            ];
        }

        // Update the data in the database
        if ($this->model->update($id, $data)) {
            // Respond with a success message
            $response = [
                'status' => 200, // HTTP 200 OK
                'error' => null,
                'messages' => [
                    'success' => 'Attraction data updated successfully'
                ]
            ];

            return $this->respondUpdated($response);
        } else {
            // Respond with an error message if the update fails
            return $this->fail('Failed to update attraction data.');
        }
    }

    // public function update($id = null)
    // {
    //     // // Validation rules
    //     // $validationRules = [
    //     //     'name' => 'required',
    //     //     'image' => 'uploaded[image]|max_size[image,1024]|is_image[image]',
    //     //     'description' => 'required',
    //     //     'category_id' => 'required|numeric',
    //     //     'price' => 'required|numeric',
    //     // ];

    //     // Validate input data
    //     // if (!$this->validate($validationRules)) {
    //     //     // Respond with validation errors
    //     //     return $this->failValidationError($this->validator->getErrors());
    //     // }

    //     // Get the uploaded image
    //     $image = $this->request->getFile('image');

    //     // Check if a file has been uploaded
    //     if ($image->isValid() && !$image->hasMoved()) {
    //         // Generate a random name and move the image to the uploads directory
    //         $newName = $image->getRandomName();
    //         $image->move('./uploads', $newName);

    //         // Prepare data for updating
    //         $data = [
    //             'name' => $this->request->getVar('name'),
    //             'image' => $newName,
    //             'description' => $this->request->getVar('description'),
    //             'price' => $this->request->getVar('price'),
    //             'amount' => $this->request->getVar('amount'),
    //         ];

    //         // Update the data in the database
    //         if ($this->model->update($id, $data)) {
    //             // Respond with a success message
    //             $response = [
    //                 'status' => 200, // HTTP 200 OK
    //                 'error' => null,
    //                 'messages' => [
    //                     'success' => 'Article data updated successfully'
    //                 ]
    //             ];

    //             return $this->respondUpdated($response);
    //         } else {
    //             // Respond with an error message if the update fails
    //             return $this->fail('Failed to update attraction data.');
    //         }
    //     } else {
    //         // Respond with a validation error if image is not valid
    //         return $this->failValidationError($image->getErrorString());
    //     }
    // }



    public function delete($id = null)
    {
        // Fetch the attraction data by ID
        $data = $this->model->find($id);

        if ($data) {
            // Get the filename of the image
            $imageFilename = $data['image'];

            // Delete the attraction from the database
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
            // Respond with a not found error if attraction is not found
            return $this->failNotFound('Attraction not found');
        }
    }
}