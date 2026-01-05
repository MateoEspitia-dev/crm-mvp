<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::create([
        'name' => 'Pepe Vendedor',
        'email' => 'pepe@gelvez.com.co', // Este será tu usuario
        'password' => bcrypt('arroz123'), // Esta será tu contraseña
    ]);
    }
}
