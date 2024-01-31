<?php

namespace App\Controllers;

use CodeIgniter\Controller;

class ImageController extends Controller
{
    public function getImageUrl($imageName)
    {
        $imageUrl = base_url("uploads/{$imageName}");
        return $this->response->setJSON(['imageUrl' => $imageUrl]);
    }
}