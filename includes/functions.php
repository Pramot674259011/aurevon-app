<?php
function aurevon_data_path(): string
{
    return __DIR__ . '/../data/aurevon.json';
}

function aurevon_default_pieces(): array
{
    return [
        [
            'id' => 1,
            'title' => 'Quiet Tide',
            'artist' => 'M. Sorenson',
            'price' => '$4,200',
            'image' => 'https://picsum.photos/seed/aurevon-tide/600/750',
        ],
        [
            'id' => 2,
            'title' => 'Ash & Ember',
            'artist' => 'R. Okafor',
            'price' => '$6,800',
            'image' => 'https://picsum.photos/seed/aurevon-ember/600/750',
        ],
        [
            'id' => 3,
            'title' => 'Standing Water',
            'artist' => 'L. Vance',
            'price' => '$3,100',
            'image' => 'https://picsum.photos/seed/aurevon-water/600/750',
        ],
        [
            'id' => 4,
            'title' => 'Field Study No. 4',
            'artist' => 'M. Sorenson',
            'price' => '$5,400',
            'image' => 'https://picsum.photos/seed/aurevon-field/600/750',
        ],
        [
            'id' => 5,
            'title' => 'Interior, Late Light',
            'artist' => 'J. Petrov',
            'price' => '$7,900',
            'image' => 'https://picsum.photos/seed/aurevon-interior/600/750',
        ],
        [
            'id' => 6,
            'title' => 'Unmade',
            'artist' => 'R. Okafor',
            'price' => '$2,600',
            'image' => 'https://picsum.photos/seed/aurevon-unmade/600/750',
        ],
    ];
}

function aurevon_init_data(): array
{
    $path = aurevon_data_path();
    $dir = dirname($path);

    if (!is_dir($dir)) {
        mkdir($dir, 0777, true);
    }

    if (!file_exists($path)) {
        $data = [
            'pieces' => aurevon_default_pieces(),
            'reservations' => [],
            'waitlist' => [],
            'inquiries' => [],
        ];
        file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
        return $data;
    }

    $data = json_decode(file_get_contents($path), true);
    if (!is_array($data)) {
        $data = [];
    }

    $data['pieces'] = $data['pieces'] ?? aurevon_default_pieces();
    $data['reservations'] = $data['reservations'] ?? [];
    $data['waitlist'] = $data['waitlist'] ?? [];
    $data['inquiries'] = $data['inquiries'] ?? [];

    if ($data['pieces'] !== aurevon_default_pieces()) {
        // preserve existing data but ensure it stays valid
    }

    file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

    return $data;
}

function aurevon_read_data(): array
{
    return aurevon_init_data();
}

function aurevon_write_data(array $data): void
{
    file_put_contents(aurevon_data_path(), json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

function aurevon_escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
