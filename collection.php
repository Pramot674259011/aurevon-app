<?php
require __DIR__ . '/includes/functions.php';
$page = 'collection';
$pageTitle = 'The collection';
$data = aurevon_read_data();
$pieces = $data['pieces'] ?? [];
require __DIR__ . '/includes/header.php';
?>

<main class="page-section">
    <div class="page-content">
        <h1 class="page-title">The collection</h1>
        <p class="page-intro">Save what catches your eye, then reserve a private viewing to see it in person.</p>

        <div class="collection-grid">
            <?php foreach ($pieces as $piece): ?>
                <article class="piece-card">
                    <div class="piece-image-wrap">
                        <img class="piece-image" src="<?= aurevon_escape($piece['image']) ?>"
                            alt="<?= aurevon_escape($piece['title']) ?>" loading="lazy" />
                        <button type="button" class="favorite-toggle" data-title="<?= aurevon_escape($piece['title']) ?>"
                            aria-label="Save to favorites">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path
                                    d="M12 21s-8.5-4.8-10.5-9.4C.2 8.7 2.4 4 6.6 4c2.1 0 3.4 1 4.4 2.4C12 5 13.3 4 15.4 4 19.6 4 21.8 8.7 22.5 11.6 20.5 16.2 12 21 12 21Z" />
                            </svg>
                        </button>
                    </div>

                    <h3 class="piece-title"><?= aurevon_escape($piece['title']) ?></h3>
                    <p class="piece-artist"><?= aurevon_escape($piece['artist']) ?></p>
                    <p class="piece-price"><?= aurevon_escape($piece['price']) ?></p>
                    <a class="reserve-link" href="reserve.php?piece=<?= urlencode($piece['title']) ?>">Reserve a viewing</a>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</main>

<?php require __DIR__ . '/includes/footer.php'; ?>