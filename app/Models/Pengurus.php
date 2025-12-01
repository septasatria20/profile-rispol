<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengurus extends Model
{
    use HasFactory;

    protected $table = 'pengurus'; // Specify table name explicitly

    protected $fillable = [
        'name',
        'position',    // Database column name is 'position'
        'nim',
        'prodi',
        'photo',
        'type',
        'order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Accessor to map 'position' to 'role' for frontend consistency
    public function getRoleAttribute()
    {
        return $this->position;
    }
}
