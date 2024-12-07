<?php

namespace App\Http\Controllers;

use App\Models\Watchlist;
use App\Models\Movie;
use App\Models\Show; // Assuming you have a Show model
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WatchlistController extends Controller
{
    /**
     * Add a movie or show to the user's watchlist.
     */
    public function addToWatchlist(Request $request)
    {
        $userId = Auth::id();

        if (!$userId) {
            return response()->json([
                'error' => 'User is not authenticated. Please login to add movies or shows to your watchlist.'
            ], 401); // Unauthorized status
        }

        // Validate the incoming request to ensure either movie_id or show_id is provided
        $request->validate([
            'movie_id' => 'nullable|exists:movies,id', // Ensure movie exists if movie_id is provided
            'show_id' => 'nullable|exists:shows,id',   // Ensure show exists if show_id is provided
        ]);

        try {
            $existingWatchlistItem = null;

            if ($request->has('movie_id')) {
                $existingWatchlistItem = Watchlist::where('user_id', $userId)
                    ->where('movie_id', $request->movie_id)
                    ->first();

                if (!$existingWatchlistItem) {
                    // Add movie to the watchlist
                    $watchlist = Watchlist::create([
                        'user_id' => $userId,
                        'movie_id' => $request->movie_id,
                    ]);
                }
            }

            if ($request->has('show_id')) {
                $existingWatchlistItem = Watchlist::where('user_id', $userId)
                    ->where('show_id', $request->show_id)
                    ->first();

                if (!$existingWatchlistItem) {
                    // Add show to the watchlist
                    $watchlist = Watchlist::create([
                        'user_id' => $userId,
                        'show_id' => $request->show_id,
                    ]);
                }
            }

            if ($existingWatchlistItem) {
                return response()->json([
                    'message' => 'Movie/Show is already in your watchlist.',
                    'watchlist' => $existingWatchlistItem,
                ]);
            }

            return response()->json([
                'message' => 'Movie/Show added to watchlist successfully.',
                'watchlist' => $watchlist,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to add movie/show to watchlist.',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get the movies or shows in the user's watchlist.
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
                ->with('movie', 'show') // Assuming 'movie' and 'show' are relationships in the Watchlist model
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
     * Remove a movie or show from the user's watchlist.
     */
    public function destroy($id)
    {
        $watchlistItem = Watchlist::where('user_id', Auth::id())
            ->where(function($query) use ($id) {
                $query->where('movie_id', $id)
                      ->orWhere('show_id', $id);
            })
            ->first();

        if ($watchlistItem) {
            $watchlistItem->delete();
            return response()->json(['message' => 'Movie/Show removed from watchlist'], 200);
        }

        return response()->json(['message' => 'Movie/Show not found'], 404);
    }
}
