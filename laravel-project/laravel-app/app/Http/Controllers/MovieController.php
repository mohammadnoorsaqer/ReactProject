<?php
// app/Http/Controllers/MovieController.php
namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function index()
    {
        // Return all movies
        return response()->json(Movie::all());
    }

    public function show($id)
    {
        // Return a specific movie by id
        $movie = Movie::find($id);
        if ($movie) {
            return response()->json($movie);
        } else {
            return response()->json(['error' => 'Movie not found'], 404);
        }
    }
}
