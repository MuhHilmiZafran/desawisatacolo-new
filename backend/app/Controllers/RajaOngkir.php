<?php
// app/Controllers/RajaOngkirController.php

namespace App\Controllers;

use CodeIgniter\Controller;
use CodeIgniter\HTTP\RequestInterface;

class RajaOngkir extends Controller
{
  public function getShippingRates()
  {
    // You need to obtain your Raja Ongkir API key
    $apiKey = '4e0b3b64e036e92cde80d8b39597adf2';

    // Retrieve user input from the request
    $requestData = [
      "origin"=> "501", // ID of the city where the package is sent from
      "destination"=> "114", // ID of the city where the package is sent to
    ];

    // Make a request to Raja Ongkir API
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, 'https://api.rajaongkir.com/starter/cost');
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, [
      'key' => $apiKey,
      'origin' => $requestData['origin'],
      'destination' => $requestData['destination'],
      'weight' => 1000, // Weight in grams (1 kg in this example)
      'courier' => 'jne', // You can change the courier as needed
    ]);

    $response = json_decode(curl_exec($curl), true);
    curl_close($curl);

    // Send the shipping rates back to the frontend
    return $this->response->setJSON($response);
  }
}