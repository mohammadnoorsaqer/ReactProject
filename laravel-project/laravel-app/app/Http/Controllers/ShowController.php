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
}