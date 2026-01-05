<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Product::create(['name' => 'Arroz Cristal 500g', 'sku' => 'CRI-500', 'price' => 2200, 'stock' => 5000]);
        \App\Models\Product::create(['name' => 'Arroz Premium 1kg', 'sku' => 'PRE-1000', 'price' => 4500, 'stock' => 2000]);
    }
}
