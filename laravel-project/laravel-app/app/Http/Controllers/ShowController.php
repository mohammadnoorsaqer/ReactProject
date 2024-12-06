<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Show;

class ShowController extends Controller
{
    public function index()
    {
        // Return all shows with required data
        return response()->json(Show::all());
    }
    public function show($id)
    {
        // Return a specific movie by id
        $show = Show::find($id);
        if ($show) {
            return response()->json($show);
        } else {
            return response()->json(['error' => 'Show not found'], 404);
        }
    }
}