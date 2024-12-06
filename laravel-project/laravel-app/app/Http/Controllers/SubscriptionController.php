<?php
namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function store(Request $request)
    {
        // Assumed user_id = 1
        $userId = 1;
    
        // Validate incoming data
        $validated = $request->validate([
            'plan_name' => 'required|string|max:191',
            'price' => 'required|numeric',
            'started_at' => 'required|date',
            'expires_at' => 'required|date',
        ]);
    
        try {
            // Create a new subscription record
            $subscription = Subscription::create([
                'user_id' => $userId,
                'plan_name' => $validated['plan_name'],
                'price' => $validated['price'],
                'started_at' => $validated['started_at'],
                'expires_at' => $validated['expires_at'],
            ]);
    
            return response()->json([
                'message' => 'Subscription successfully created!',
                'subscription' => $subscription
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error creating subscription',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function cancelSubscription(Request $request)
    {
        // Assumed user_id = 1
        $userId = 1;
    
        // Retrieve the user's active subscription
        $subscription = Subscription::where('user_id', $userId)
                                    ->whereNull('canceled_at') // Ensure subscription isn't already canceled
                                    ->first();
    
        if (!$subscription) {
            return response()->json([
                'error' => 'No active subscription found.'
            ], 404);
        }
    
        try {
            // Mark the subscription as canceled
            $subscription->update(['canceled_at' => now()]);
    
            return response()->json([
                'message' => 'Subscription successfully canceled.',
                'subscription' => $subscription
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error canceling subscription',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    
    
}
