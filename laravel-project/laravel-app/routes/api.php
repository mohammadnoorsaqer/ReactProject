<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['api'])->group(function () {
Route::get('movies', [MovieController::class, 'getMovies']);
Route::get('popular-tv', [MovieController::class, 'getPopularTvShows']);
Route::get('trending-tv', [MovieController::class, 'getTrendingTvShows']);
Route::get('hulu-originals', [MovieController::class, 'getHuluOriginals']);
Route::get('movies/category/{category}', [MovieController::class, 'getMoviesByCategory']);
Route::get('movies/{movieId}', [MovieController::class, 'getMovieDetails']);
Route::get('tv-show/{id}', [MovieController::class, 'getTvShowDetails']);

});

