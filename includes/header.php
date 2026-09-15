<?php
$page = $page ?? 'home';
$pageTitle = $pageTitle ?? 'Aurevon';
$links = [
    ['label' => 'Home', 'path' => 'index.php'],
    ['label' => 'Story', 'path' => 'story.php'],
    ['label' => 'Collection', 'path' => 'collection.php'],
    ['label' => 'Reserve', 'path' => 'reserve.php'],
    ['label' => 'Inquire', 'path' => 'inquire.php'],
];
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= aurevon_escape($pageTitle) ?> | Aurevon</title>
    <meta name="description" content="Aurevon private gallery collection and viewing experience." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="assets/css/styles.css" />
</head>

<body class="theme-dark">
    <header class="site-header" id="site-header">
        <div class="nav-shell">
            <a href="index.php" class="brand-link">Aurevon</a>

            <button type="button" class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">
                <span class="menu-label">Navigate</span>
            </button>

            <div class="nav-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                    stroke-linejoin="round">
                    <path
                        d="M12 2c1.7 2.8 2.8 5.4 3.2 7.8C16.1 12 17.5 13.4 20 15.8c-2.5 1.2-4.4 2.8-5.7 4.7-1.3-2-3.2-3.5-5.7-4.7 2.5-2.4 3.9-3.8 4.8-5.2.4-2.4 1.5-5 3.6-7.8Z" />
                </svg>
            </div>
        </div>
    </header>

    <div class="site-overlay" id="site-overlay">
        <nav class="overlay-nav" aria-label="Main navigation">
            <?php foreach ($links as $link): ?>
                <a href="<?= $link['path'] ?>"
                    class="overlay-link <?= $page === strtolower(str_replace('.php', '', $link['path'])) ? 'active' : '' ?>">
                    <?= aurevon_escape($link['label']) ?>
                </a>
            <?php endforeach; ?>
        </nav>
    </div>