<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Show;

class ShowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Show::create([
            'title' => 'Stranger Things',
            'description' => 'A young girl with extraordinary powers helps a group of friends find a missing child in a supernatural mystery.',
            'release_date' => 2016,
            'is_popular' => true, 
            'image_url' => 'images/stranger-things.jpg',
            'video_url' => 'https://www.youtube.com/embed/mnd7sFt5c3A',

        ]);

        Show::create([
            'title' => 'Breaking Bad',
            'description' => 'A high school chemistry teacher turned methamphetamine producer partners with a former student to create and sell high-quality meth.',
            'release_date' => 2008,
            'is_popular' => true,
            'image_url' => 'images/breaking-bad.jpg',
            'video_url' => 'https://www.youtube.com/embed/HhesaQXLuRY',

        ]);

        Show::create([
            'title' => 'The Crown',
            'description' => 'A drama series about the reign of Queen Elizabeth II of the United Kingdom, exploring her relationships with her family, country, and advisors.',
            'release_date' => 2016,
            'is_popular' => true, 
            'image_url' => 'images/the-crown.jfif',
            'video_url' => 'https://www.youtube.com/embed/JWtnJjn6ng0',

        ]);

        Show::create([
            'title' => 'Black Mirror',
            'description' => 'An anthology series that explores a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.',
            'release_date' => 2011,
            'is_popular' => false,
            'image_url' => 'images/black-mirror.jpg',
            'video_url' => 'https://www.youtube.com/embed/-qIlCo9yqpY',

        ]);
        Show::create([
            'title' => 'From',
            'description' => 'Unravel the mystery of a city in middle U.S.A. that imprisons everyone who enters. As the residents struggle to maintain a sense of normality and seek a way out, they must also survive the threats of the surrounding forest.',
            'release_date' => 2022,
            'is_popular' => false,
            'image_url' => 'images/from.jfif',
            'video_url' => 'https://www.youtube.com/embed/pDHqAj4eJcM',

        ]);
        Show::create([
            'title' => 'Manifest',
            'description' => 'When a commercial airliner suddenly reappears after being missing for five years, those aboard must reintegrate into society.',
            'release_date' => 2018,
            'is_popular' => true,
            'image_url' => 'images/manifest.jpg',
            'video_url' => 'https://www.youtube.com/embed/I1hNAIzkQWY',

        ]);

    }
}
