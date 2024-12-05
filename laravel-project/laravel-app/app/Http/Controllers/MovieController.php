<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MovieController extends Controller
{
    // Method to get movies from TMDB
    public function getMovies(Request $request)
    {
        $apiKey = env('TMDB_API_KEY');
        $url = "https://api.themoviedb.org/3/discover/movie?api_key=$apiKey&language=en-US"; // Fetch movies only

        $response = Http::withoutVerifying()->get($url); // Disable SSL verification

        // Check if response is successful
        if ($response->successful()) {
            // Return only the movie results
            return response()->json([
                'movies' => $response->json()['results'],
            ]);
        } else {
            return response()->json([
                'error' => 'Failed to fetch data from TMDB API',
            ], 500);
        }
    }

    // Method to get popular TV shows
    public function getPopularTvShows(Request $request)
    {
        $apiKey = env('TMDB_API_KEY');
        $url = "https://api.themoviedb.org/3/tv/popular?api_key=$apiKey&language=en-US"; // Popular TV shows

        $response = Http::withoutVerifying()->get($url);

        // Check if response is successful
        if ($response->successful()) {
            return response()->json([
                'tv_shows' => $response->json()['results'],
            ]);
        } else {
            return response()->json([
                'error' => 'Failed to fetch popular TV shows',
            ], 500);
        }
    }

    // Method to get trending TV shows
    public function getTrendingTvShows(Request $request)
    {
        $apiKey = env('TMDB_API_KEY');
        $url = "https://api.themoviedb.org/3/trending/tv/week?api_key=$apiKey"; // Trending TV shows

        $response = Http::withoutVerifying()->get($url);

        // Check if response is successful
        if ($response->successful()) {
            return response()->json([
                'tv_shows' => $response->json()['results'],
            ]);
        } else {
            return response()->json([
                'error' => 'Failed to fetch trending TV shows',
            ], 500);
        }
    }

    // Method to get Hulu Originals
    public function getHuluOriginals(Request $request)
    {
        $apiKey = env('TMDB_API_KEY');
        $url = "https://api.themoviedb.org/3/discover/tv?api_key=$apiKey&with_networks=453"; // Hulu Originals (Hulu network ID)

        $response = Http::withoutVerifying()->get($url);

        // Check if response is successful
        if ($response->successful()) {
            return response()->json([
                'tv_shows' => $response->json()['results'],
            ]);
        } else {
            return response()->json([
                'error' => 'Failed to fetch Hulu Originals',
            ], 500);
        }
    }
    public function getMoviesByCategory($category)
    {
        $apiKey = env('TMDB_API_KEY');
        $url = "https://api.themoviedb.org/3/movie/{$category}?api_key=$apiKey&language=en-US"; 

        $response = Http::withoutVerifying()->get($url); // Disable SSL verification

        // Check if response is successful
        if ($response->successful()) {
            return response()->json([
                'movies' => $response->json()['results'],
            ]);
        } else {
            return response()->json([
                'error' => 'Failed to fetch data from TMDB API',
            ], 500);
        }
    }

    public function getMovieDetails($movieId)
    {
        $apiKey = env('TMDB_API_KEY');
        
        // Fetch movie details
        $movieUrl = "https://api.themoviedb.org/3/movie/{$movieId}?api_key=$apiKey&language=en-US";
        $movieResponse = Http::withoutVerifying()->get($movieUrl);
    
        // Fetch video (trailer) details
        $videoUrl = "https://api.themoviedb.org/3/movie/{$movieId}/videos?api_key=$apiKey&language=en-US";
        $videoResponse = Http::withoutVerifying()->get($videoUrl);
    
        if ($movieResponse->successful() && $videoResponse->successful()) {
            $movieData = $movieResponse->json();
            $videoData = $videoResponse->json();
    
            // Find YouTube trailer
            $trailer = collect($videoData['results'])
                ->first(function ($video) {
                    return $video['site'] === 'YouTube' && 
                           (stripos($video['type'], 'trailer') !== false || 
                            stripos($video['type'], 'teaser') !== false);
                });
    
            return response()->json([
                'movie' => $movieData,
                'trailer' => $trailer // This could be null if no trailer is found
            ]);
        } else {
            return response()->json([
                'error' => 'Failed to fetch data from TMDB API',
            ], 500);
        }
    }
}
