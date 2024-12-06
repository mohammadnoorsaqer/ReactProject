<?php

// app/Http/Controllers/WatchlistController.php
namespace App\Http\Controllers;

use App\Models\Watchlist;
use Illuminate\Http\Request;

class WatchlistController extends Controller
{
    public function addToWatchlist(Request $request)
    {
        // Assuming user ID is fixed as 1 for now
        $user_id = 1; 

        // Add the movie to the user's watchlist
        $watchlist = Watchlist::create([
            'user_id' => $user_id,
            'movie_id' => $request->movie_id
        ]);

        return response()->json($watchlist, 201);
    }

    public function getWatchlist()
    {
        // Assuming user ID is fixed as 1 for now
        $user_id = 1;

        // Get the user's watchlist
        $watchlist = Watchlist::where('user_id', $user_id)->get();

        return response()->json($watchlist);
    }
}

