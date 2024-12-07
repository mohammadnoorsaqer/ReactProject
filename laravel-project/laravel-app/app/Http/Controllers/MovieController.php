<?php
// app/Http/Controllers/MovieController.php
namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function index(Request $request)
    {
        // Get search term from query parameter
        $search = $request->input('search');

        // Filter movies by title (you can add more fields like genre if needed)
        $movies = Movie::when($search, function($query, $search) {
            return $query->where('title', 'like', "%{$search}%");
        })->get();

        return response()->json($movies);
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
