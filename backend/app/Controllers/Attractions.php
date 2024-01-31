<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\AttractionModel;

class Attractions extends ResourceController
{
    use ResponseTrait;

    protected $model;

    public function __construct()
    {
        // Instantiate the AttractionModel in the constructor
        $this->model = new AttractionModel();
    }

    public function index()
    {
        // Fetch all attractions
        $data = $this->model->findAll();
        return $this->respond($data);
    }

    public function countAttractions()
    {
        // Count the total number of attractions
        $totalAttractions = $this->model->countAll();

        // Respond with the count
        $response = [
            'status' => 200, // HTTP 200 OK
            'error' => null,
            'data' => [
                'total_attractions' => $totalAttractions,
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
            return $this->failNotFound('Attraction not found');
        }



        return $this->respond($data);
    }

    public function views($id = null)
    {
        // Fetch a specific attraction by ID
        $data = $this->model->find($id);

        if (!$data) {
            return $this->failNotFound('Attraction not found');
        }

        // Increment view count
        $this->model->update($id, ['views' => $data['views'] + 1]);

        return $this->respond($data);
    }


    public function create()
    {

        // Validation code can be added here

        // Get the uploaded thumbnail
        $thumbnail = $this->request->getFile('thumbnail');

        if ($thumbnail->isValid() && !$thumbnail->hasMoved()) {
            // Generate a random name and move the thumbnail to the uploads directory
            $newName = $thumbnail->getRandomName();
            $thumbnail->move('./uploads', $newName);

            // Prepare data for insertion
            $data = [
                'name' => $this->request->getVar('name'),
                'thumbnail' => $newName,
                'description' => $this->request->getVar('description'),
                'category_id' => $this->request->getVar('category_id'),
                'facilities' => $this->request->getVar('facilities'),
                'price' => $this->request->getVar('price'),
                'latitude' => $this->request->getVar('latitude'),
                'longitude' => $this->request->getVar('longitude'),
                'views' => 0,
            ];

            // Insert the data into the database
            $this->model->save($data);

            // Respond with a success message
            $response = [
                'status' => 201, // HTTP 201 Created
                'error' => null,
                'messages' => [
                    'success' => 'Attraction data inserted successfully'
                ]
            ];

            return $this->respondCreated($response);
        } else {
            // Respond with a validation error if thumbnail is not valid
            return $this->failValidationError($thumbnail->getErrorString());
        }
    }

    public function update($id = null)
    {
        // // Validation rules
        // $validationRules = [
        //     'name' => 'required',
        //     'thumbnail' => 'uploaded[thumbnail]|max_size[thumbnail,1024]|is_image[thumbnail]',
        //     'description' => 'required',
        //     'category_id' => 'required|numeric',
        //     'price' => 'required|numeric',
        // ];

        // Validate input data
        // if (!$this->validate($validationRules)) {
        //     // Respond with validation errors
        //     return $this->failValidationError($this->validator->getErrors());
        // }

        // Get the uploaded thumbnail
        if ($this->request->getFile('thumbnail')) {
            $data = $this->model->find($id);

            $oldThumbnailFilename = $data['thumbnail'];

            $thumbnailPath = FCPATH . 'uploads/' . $oldThumbnailFilename;

            // Check if the file exists and delete it
            if (file_exists($thumbnailPath) && is_file($thumbnailPath)) {
                unlink($thumbnailPath);
            }

            $thumbnail = $this->request->getFile('thumbnail');
            $newName = $thumbnail->getRandomName();
            $thumbnail->move('./uploads', $newName);

            // Prepare data for updating
            $data = [
                'name' => $this->request->getVar('name'),
                'thumbnail' => $newName,
                'description' => $this->request->getVar('description'),
                'category_id' => $this->request->getVar('category_id'),
                'facilities' => $this->request->getVar('facilities'),
                'price' => $this->request->getVar('price'),
                'latitude' => $this->request->getVar('latitude'),
                'longitude' => $this->request->getVar('longitude'),
            ];
        } else {
            // Prepare data for updating
            $data = [
                'name' => $this->request->getVar('name'),
                'thumbnail' => $this->request->getVar('thumbnail'),
                'description' => $this->request->getVar('description'),
                'facilities' => $this->request->getVar('facilities'),
                'category_id' => $this->request->getVar('category_id'),
                'price' => $this->request->getVar('price'),
                'latitude' => $this->request->getVar('latitude'),
                'longitude' => $this->request->getVar('longitude'),
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



    public function delete($id = null)
    {
        // Fetch the attraction data by ID
        $data = $this->model->find($id);

        if ($data) {
            // Get the filename of the thumbnail
            $thumbnailFilename = $data['thumbnail'];

            // Delete the attraction from the database
            $this->model->delete($id);

            // Construct the path to the thumbnail file
            $thumbnailPath = FCPATH . 'uploads/' . $thumbnailFilename;

            // Check if the file exists and delete it
            if (file_exists($thumbnailPath) && is_file($thumbnailPath)) {
                unlink($thumbnailPath);
            }

            // Respond with a success message
            $response = [
                'status' => 200, // HTTP 200 OK
                'error' => null,
                'messages' => [
                    'success' => 'Attraction data deleted successfully'
                ]
            ];

            return $this->respondDeleted($response);
        } else {
            // Respond with a not found error if attraction is not found
            return $this->failNotFound('Attraction not found');
        }
    }
}