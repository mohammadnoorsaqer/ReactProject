<?php
// app/Http/Controllers/PremiumMoviesController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PremiumMovie;

class PremiumMoviesController extends Controller
{
    public function index(Request $request)
    {
        // Check if the user has an active Premium subscription
        $user = $request->user();
        $subscription = $user->subscriptions()
            ->where('plan_name', 'Premium')
            ->whereNull('canceled_at')
            ->first();

        if (!$subscription) {
            return response()->json(['error' => 'Access denied. Premium subscription required.'], 403);
        }

        $movies = PremiumMovie::all();
        return response()->json($movies);
    }
    public function show($id, Request $request)
    {
        // Check if the user has an active Premium subscription
        $user = $request->user();
        $subscription = $user->subscriptions()
            ->where('plan_name', 'Premium')
            ->whereNull('canceled_at')
            ->first();

        if (!$subscription) {
            return response()->json(['error' => 'Access denied. Premium subscription required.'], 403);
        }

        // Retrieve the movie by its ID
        $movie = PremiumMovie::find($id);

        // Check if the movie exists
        if (!$movie) {
            return response()->json(['error' => 'Movie not found.'], 404);
        }

        return response()->json($movie);
    }
}
