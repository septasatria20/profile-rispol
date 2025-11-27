<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Berita extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'image',
        'published_at',
    ];

    protected $casts = [
        'published_at' => 'date',
    ];

    // Add accessor to format date without time
    public function getPublishedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d M Y');
    }
}
