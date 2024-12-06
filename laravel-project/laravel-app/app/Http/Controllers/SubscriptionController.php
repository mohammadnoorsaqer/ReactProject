<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    // Fetch all subscriptions
    public function index()
    {
        $subscriptions = Subscription::with('user')->get();
        return response()->json($subscriptions);
    }

    // Fetch a single subscription
    public function show($id)
    {
        $subscription = Subscription::with('user')->find($id);

        if (!$subscription) {
            return response()->json(['message' => 'Subscription not found'], 404);
        }

        return response()->json($subscription);
    }

    // Create a new subscription
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'plan_name' => 'required|string|max:191',
            'price' => 'required|numeric',
            'started_at' => 'required|date',
            'expires_at' => 'required|date|after:started_at',
        ]);

        $subscription = Subscription::create($validated);
        return response()->json($subscription, 201);
    }

    // Update a subscription
    public function update(Request $request, $id)
    {
        $subscription = Subscription::find($id);

        if (!$subscription) {
            return response()->json(['message' => 'Subscription not found'], 404);
        }

        $validated = $request->validate([
            'plan_name' => 'sometimes|string|max:191',
            'price' => 'sometimes|numeric',
            'started_at' => 'sometimes|date',
            'expires_at' => 'sometimes|date|after:started_at',
        ]);

        $subscription->update($validated);
        return response()->json($subscription);
    }
    public function book(Request $request)
    {
        $subscriptionId = $request->subscription_id;
        // Add logic to handle booking (e.g., save to database, associate with user)
        return response()->json(['message' => 'Subscription booked successfully'], 200);
    }
    
    // Delete a subscription
    public function destroy($id)
    {
        $subscription = Subscription::find($id);

        if (!$subscription) {
            return response()->json(['message' => 'Subscription not found'], 404);
        }

        $subscription->delete();
        return response()->json(['message' => 'Subscription deleted']);
    }
    
}
