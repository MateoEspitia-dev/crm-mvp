<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

// Login Público
Route::post('/login', [AuthController::class, 'login']);

// Rutas Privadas
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/products', [ProductController::class, 'index']);
});
