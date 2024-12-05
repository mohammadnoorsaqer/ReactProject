<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'plan_name',
        'price',
        'started_at',
        'expires_at',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

