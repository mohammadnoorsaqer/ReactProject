<?php
use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ShowController;
use App\Http\Controllers\WatchlistController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SubscriptionController;

/*
|---------------------------------------------------------------------------
| API Routes
|---------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/register', [RegisteredUserController::class, 'create']);  // Show registration form
Route::post('/register', [RegisteredUserController::class, 'store']);   // Handle registration form submission
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['api'])->group(function () {
    Route::get('/movies', [MovieController::class, 'index']);
    Route::get('/movies/{id}', [MovieController::class, 'show']);
    Route::get('/shows', [ShowController::class, 'index']);
    Route::get('/shows/{id}', [ShowController::class, 'show']);
    Route::post('subscribe', [SubscriptionController::class, 'store']);

    Route::post('/cancel-subscription', [SubscriptionController::class, 'cancelSubscription']);

    
    // Watchlist routes protected by auth:sanctum middleware
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/watchlist', [WatchlistController::class, 'addToWatchlist']);
        Route::get('/watchlist', [WatchlistController::class, 'getWatchlist']);
    });
});
