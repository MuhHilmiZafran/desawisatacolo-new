<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->post('/api/registrasi', 'Auth::register');
$routes->post('/api/login', 'Auth::login');
$routes->get('/api/logout', 'Auth::logout');
$routes->get('/api/user/(:num)', 'Auth::show/$1');

// Atrraction
$routes->get('/api/attractions', 'Attractions::index');
$routes->get('/api/attractions/count', 'Attractions::countAttractions');
$routes->get('/api/attractions/(:num)', 'Attractions::show/$1');
$routes->post('/api/attractions', 'Attractions::create');
$routes->post('/api/attractions/(:num)', 'Attractions::update/$1');
$routes->delete('/api/attractions/(:num)', 'Attractions::delete/$1');
$routes->post('/api/attractions/(:num)/views', 'Attractions::views/$1');


// Article
$routes->get('/api/articles', 'Articles::index');
$routes->get('/api/articles/count', 'Articles::countArticles');
$routes->get('/api/articles/(:num)', 'Articles::show/$1');
$routes->post('/api/articles', 'Articles::create');
$routes->post('/api/articles/(:num)', 'Articles::update/$1');
$routes->delete('/api/articles/(:num)', 'Articles::delete/$1');
$routes->post('/api/articles/(:num)/views', 'Articles::views/$1');

// Product
$routes->get('/api/products', 'Products::index');
$routes->get('/api/products/count', 'Products::countProduct');
$routes->get('/api/products/(:num)', 'Products::show/$1');
$routes->post('/api/products', 'Products::create');
$routes->post('/api/products/(:num)', 'Products::update/$1');
$routes->delete('/api/products/(:num)', 'Products::delete/$1');

// Category
$routes->get('/api/categories', 'Categories::index');
$routes->get('/api/categories/(:num)', 'Categories::show/$1');

// Fasilitas
$routes->get('/api/facilities', 'Facilities::index');
$routes->get('/api/facilities/(:num)', 'Facilities::show/$1');

// Comment
$routes->get('/api/comments', 'Comments::index');
$routes->get('/api/comments/(:num)', 'Comments::show/$1');
$routes->post('/api/comments', 'Comments::create');
$routes->post('/api/comments/(:num)', 'Comments::update/$1');
$routes->delete('/api/comments/(:num)', 'Comments::delete/$1');
$routes->get('/api/attractions/(:num)/comments', 'Comments::getCommentsByContentId/$1');
$routes->get('/api/attractions/(:num)/comments/count', 'Comments::getCommentCountByContentId/$1');

// Comment Article
$routes->get('/api/comments-article', 'CommentsArticle::index');
$routes->get('/api/comments-article/(:num)', 'CommentsArticle::show/$1');
$routes->post('/api/comments-article', 'CommentsArticle::create');
$routes->post('/api/comments-article/(:num)', 'CommentsArticle::update/$1');
$routes->delete('/api/comments-article/(:num)', 'CommentsArticle::delete/$1');
$routes->get('/api/articles/(:num)/comments', 'CommentsArticle::getCommentsByContentId/$1');
$routes->get('/api/articles/(:num)/comments/count', 'CommentsArticle::getCommentCountByContentId/$1');

// Tour Package
$routes->get('/api/tour-packages', 'TourPackages::index');
$routes->get('/api/tour-packages/count', 'TourPackages::countTourPackages');
$routes->get('/api/tour-packages/(:num)', 'TourPackages::show/$1');
$routes->post('/api/tour-packages', 'TourPackages::create');
$routes->post('/api/tour-packages/(:num)', 'TourPackages::update/$1');
// $routes->patch('/api/tour-packages/(:num)', 'TourPackages::update/$1');
$routes->delete('/api/tour-packages/(:num)', 'TourPackages::delete/$1');

// Reservation
$routes->get('/api/reservations', 'Reservations::index');
$routes->get('/api/reservations/(:segment)', 'Reservations::show/$1');
$routes->post('/api/reservations', 'Reservations::create');
$routes->post('/api/reservations/(:segment)', 'Reservations::update/$1');
$routes->get('/api/reservations/user/(:num)', 'Reservations::getByUserId/$1');
// $routes->delete('/api/reservations/(:num)', 'Reservations::delete/$1');
$routes->get('/api/reservations/deadline/(:segment)', 'Reservations::getPaymentDeadline/$1');
$routes->post('/api/reservations/check-status/(:segment)', 'Reservations::checkPaymentStatus/$1');
$routes->post('/api/reservations/(:segment)/confirm', 'Reservations::confirmPayment/$1');
$routes->post('/api/reservations/(:segment)/cancel', 'Reservations::cancelPayment/$1');
$routes->post('/api/reservations/(:segment)/finish', 'Reservations::finish/$1');


//Product Transaction
$routes->get('/api/product-transactions', 'ProductTransaction::index');
$routes->get('/api/product-transactions/(:segment)', 'ProductTransaction::show/$1');
$routes->post('/api/product-transactions', 'ProductTransaction::create');
$routes->post('/api/product-transactions/(:segment)', 'ProductTransaction::update/$1');
$routes->get('/api/product-transactions/user/(:num)', 'ProductTransaction::getByUserId/$1');
$routes->get('/api/product-transactions/deadline/(:segment)', 'ProductTransaction::getPaymentDeadline/$1');
$routes->post('/api/product-transactions/check-status/(:segment)', 'ProductTransaction::checkPaymentStatus/$1');
$routes->post('/api/product-transactions/(:segment)/confirm', 'ProductTransaction::confirmPayment/$1');
$routes->post('/api/product-transactions/(:segment)/cancel', 'ProductTransaction::cancelPayment/$1');
$routes->get('/api/product-transactions/(:segment)/status', 'ProductTransaction::getStatus/$1');
$routes->post('/api/product-transactions/(:segment)/finish', 'ProductTransaction::finish/$1');
$routes->post('/api/product-transactions/(:segment)/send-waybill', 'ProductTransaction::sendWaybill/$1');



// Image
$routes->get('/api/get-image-url/(:segment)', 'ImageController::getImageUrl/$1');

// Raja Ongkir
$routes->post('/api/shipping-rates', 'RajaOngkir::getShippingRates');

// // payment
// $routes->get('/api/payment', 'PaymentController::index');
// $routes->post('/api/payment', 'PaymentController::index');
// $routes->get('/api/payment/(:num)', 'PaymentController::show/$1');
// $routes->post('/api/payment/(:num)', 'PaymentController::update/$1');
// $routes->delete('/api/payment/(:num)', 'PaymentController::delete/$1');
// $routes->get('/api/payment/(:num)/status', 'PaymentController::getStatus/$1');
// $routes->get('/api/payment/deadline', 'PaymentController::getPaymentDeadline');

// // Midtrans
// $routes->get('midtrans/success', 'Midtrans::success');
// $routes->get('midtrans/unfinish', 'Midtrans::unfinish');
// $routes->get('midtrans/error', 'Midtrans::error');
// $routes->post('midtrans/notification', 'Midtrans::notification');