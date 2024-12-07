<?php

namespace App\Http\Controllers;

use App\Models\Watchlist;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WatchlistController extends Controller
{
    /**
     * Add a movie to the user's watchlist.
     */
    public function addToWatchlist(Request $request)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json([
                'error' => 'User is not authenticated. Please login to add movies to your watchlist.'
            ], 401); // Unauthorized status
        }

        $request->validate([
            'movie_id' => 'required|exists:movies,id', // Ensure movie exists
        ]);

        try {
            $existingWatchlistItem = Watchlist::where('user_id', $userId)
                ->where('movie_id', $request->movie_id)
                ->first();

            if ($existingWatchlistItem) {
                return response()->json([
                    'message' => 'Movie is already in your watchlist.',
                    'watchlist' => $existingWatchlistItem,
                ]);
            }

            $watchlist = Watchlist::create([
                'user_id' => $userId,
                'movie_id' => $request->movie_id,
            ]);

            return response()->json([
                'message' => 'Movie added to watchlist successfully.',
                'watchlist' => $watchlist,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to add movie to watchlist.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get the movies in the user's watchlist.
     */
    public function getWatchlist()
    {
        try {
            $userId = Auth::id();

            if (!$userId) {
                return response()->json([
                    'error' => 'User is not authenticated.'
                ], 401); // Unauthorized status
            }

            $watchlist = Watchlist::where('user_id', $userId)
                ->with('movie') // Assuming 'movie' is a relationship in the Watchlist model
                ->get();

            if ($watchlist->isEmpty()) {
                return response()->json([
                    'message' => 'Your watchlist is empty.',
                ]);
            }

            return response()->json($watchlist);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to retrieve watchlist.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove a movie from the user's watchlist.
     */
    public function destroy($movieId)
    {
        $movie = Watchlist::find($movieId);

        if ($movie) {
            $movie->delete();
            return response()->json(['message' => 'Movie removed from watchlist'], 200);
        }

        return response()->json(['message' => 'Movie not found'], 404);
    }
}
